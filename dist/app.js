function aw(o, d) {
  for (var m = 0; m < d.length; m++) {
    const g = d[m];
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
var gE = { exports: {} }, Av = {}, yE = { exports: {} }, bf = { exports: {} };
bf.exports;
(function(o, d) {
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
    var m = "18.3.1", g = Symbol.for("react.element"), y = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), T = Symbol.for("react.context"), L = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), ue = Symbol.for("react.offscreen"), te = Symbol.iterator, me = "@@iterator";
    function K(f) {
      if (f === null || typeof f != "object")
        return null;
      var b = te && f[te] || f[me];
      return typeof b == "function" ? b : null;
    }
    var I = {
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
    }, Y = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, X = {}, ye = null;
    function ie(f) {
      ye = f;
    }
    X.setExtraStackFrame = function(f) {
      ye = f;
    }, X.getCurrentStack = null, X.getStackAddendum = function() {
      var f = "";
      ye && (f += ye);
      var b = X.getCurrentStack;
      return b && (f += b() || ""), f;
    };
    var Z = !1, U = !1, ve = !1, ce = !1, Ae = !1, Ue = {
      ReactCurrentDispatcher: I,
      ReactCurrentBatchConfig: G,
      ReactCurrentOwner: Y
    };
    Ue.ReactDebugCurrentFrame = X, Ue.ReactCurrentActQueue = F;
    function _e(f) {
      {
        for (var b = arguments.length, A = new Array(b > 1 ? b - 1 : 0), z = 1; z < b; z++)
          A[z - 1] = arguments[z];
        Je("warn", f, A);
      }
    }
    function ge(f) {
      {
        for (var b = arguments.length, A = new Array(b > 1 ? b - 1 : 0), z = 1; z < b; z++)
          A[z - 1] = arguments[z];
        Je("error", f, A);
      }
    }
    function Je(f, b, A) {
      {
        var z = Ue.ReactDebugCurrentFrame, J = z.getStackAddendum();
        J !== "" && (b += "%s", A = A.concat([J]));
        var Re = A.map(function(pe) {
          return String(pe);
        });
        Re.unshift("Warning: " + b), Function.prototype.apply.call(console[f], console, Re);
      }
    }
    var pn = {};
    function Qt(f, b) {
      {
        var A = f.constructor, z = A && (A.displayName || A.name) || "ReactClass", J = z + "." + b;
        if (pn[J])
          return;
        ge("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", b, z), pn[J] = !0;
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
      enqueueForceUpdate: function(f, b, A) {
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
      enqueueReplaceState: function(f, b, A, z) {
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
      enqueueSetState: function(f, b, A, z) {
        Qt(f, "setState");
      }
    }, Ct = Object.assign, In = {};
    Object.freeze(In);
    function Xt(f, b, A) {
      this.props = f, this.context = b, this.refs = In, this.updater = A || xn;
    }
    Xt.prototype.isReactComponent = {}, Xt.prototype.setState = function(f, b) {
      if (typeof f != "object" && typeof f != "function" && f != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, f, b, "setState");
    }, Xt.prototype.forceUpdate = function(f) {
      this.updater.enqueueForceUpdate(this, f, "forceUpdate");
    };
    {
      var ha = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, na = function(f, b) {
        Object.defineProperty(Xt.prototype, f, {
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
    function Zt(f, b, A) {
      this.props = f, this.context = b, this.refs = In, this.updater = A || xn;
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
        var b = typeof Symbol == "function" && Symbol.toStringTag, A = b && f[Symbol.toStringTag] || f.constructor.name || "Object";
        return A;
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
        return ge("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Rn(f)), Yt(f);
    }
    function rr(f, b, A) {
      var z = f.displayName;
      if (z)
        return z;
      var J = b.displayName || b.name || "";
      return J !== "" ? A + "(" + J + ")" : A;
    }
    function ga(f) {
      return f.displayName || "Context";
    }
    function Un(f) {
      if (f == null)
        return null;
      if (typeof f.tag == "number" && ge("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof f == "function")
        return f.displayName || f.name || null;
      if (typeof f == "string")
        return f;
      switch (f) {
        case E:
          return "Fragment";
        case y:
          return "Portal";
        case M:
          return "Profiler";
        case c:
          return "StrictMode";
        case D:
          return "Suspense";
        case _:
          return "SuspenseList";
      }
      if (typeof f == "object")
        switch (f.$$typeof) {
          case T:
            var b = f;
            return ga(b) + ".Consumer";
          case R:
            var A = f;
            return ga(A._context) + ".Provider";
          case L:
            return rr(f, f.render, "ForwardRef");
          case k:
            var z = f.displayName || null;
            return z !== null ? z : Un(f.type) || "Memo";
          case B: {
            var J = f, Re = J._payload, pe = J._init;
            try {
              return Un(pe(Re));
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
    function Mr(f, b) {
      var A = function() {
        Cn || (Cn = !0, ge("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      A.isReactWarning = !0, Object.defineProperty(f, "key", {
        get: A,
        configurable: !0
      });
    }
    function ir(f, b) {
      var A = function() {
        Ha || (Ha = !0, ge("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      A.isReactWarning = !0, Object.defineProperty(f, "ref", {
        get: A,
        configurable: !0
      });
    }
    function ne(f) {
      if (typeof f.ref == "string" && Y.current && f.__self && Y.current.stateNode !== f.__self) {
        var b = Un(Y.current.type);
        Ot[b] || (ge('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', b, f.ref), Ot[b] = !0);
      }
    }
    var be = function(f, b, A, z, J, Re, pe) {
      var Oe = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: f,
        key: b,
        ref: A,
        props: pe,
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
        value: J
      }), Object.freeze && (Object.freeze(Oe.props), Object.freeze(Oe)), Oe;
    };
    function Fe(f, b, A) {
      var z, J = {}, Re = null, pe = null, Oe = null, $e = null;
      if (b != null) {
        Dn(b) && (pe = b.ref, ne(b)), Fn(b) && (aa(b.key), Re = "" + b.key), Oe = b.__self === void 0 ? null : b.__self, $e = b.__source === void 0 ? null : b.__source;
        for (z in b)
          mn.call(b, z) && !nn.hasOwnProperty(z) && (J[z] = b[z]);
      }
      var tt = arguments.length - 2;
      if (tt === 1)
        J.children = A;
      else if (tt > 1) {
        for (var ot = Array(tt), ut = 0; ut < tt; ut++)
          ot[ut] = arguments[ut + 2];
        Object.freeze && Object.freeze(ot), J.children = ot;
      }
      if (f && f.defaultProps) {
        var He = f.defaultProps;
        for (z in He)
          J[z] === void 0 && (J[z] = He[z]);
      }
      if (Re || pe) {
        var vt = typeof f == "function" ? f.displayName || f.name || "Unknown" : f;
        Re && Mr(J, vt), pe && ir(J, vt);
      }
      return be(f, Re, pe, Oe, $e, Y.current, J);
    }
    function et(f, b) {
      var A = be(f.type, b, f.ref, f._self, f._source, f._owner, f.props);
      return A;
    }
    function ct(f, b, A) {
      if (f == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + f + ".");
      var z, J = Ct({}, f.props), Re = f.key, pe = f.ref, Oe = f._self, $e = f._source, tt = f._owner;
      if (b != null) {
        Dn(b) && (pe = b.ref, tt = Y.current), Fn(b) && (aa(b.key), Re = "" + b.key);
        var ot;
        f.type && f.type.defaultProps && (ot = f.type.defaultProps);
        for (z in b)
          mn.call(b, z) && !nn.hasOwnProperty(z) && (b[z] === void 0 && ot !== void 0 ? J[z] = ot[z] : J[z] = b[z]);
      }
      var ut = arguments.length - 2;
      if (ut === 1)
        J.children = A;
      else if (ut > 1) {
        for (var He = Array(ut), vt = 0; vt < ut; vt++)
          He[vt] = arguments[vt + 2];
        J.children = He;
      }
      return be(f.type, Re, pe, Oe, $e, tt, J);
    }
    function gt(f) {
      return typeof f == "object" && f !== null && f.$$typeof === g;
    }
    var yt = ".", vn = ":";
    function Nt(f) {
      var b = /[=:]/g, A = {
        "=": "=0",
        ":": "=2"
      }, z = f.replace(b, function(J) {
        return A[J];
      });
      return "$" + z;
    }
    var it = !1, Et = /\/+/g;
    function ya(f) {
      return f.replace(Et, "$&/");
    }
    function ba(f, b) {
      return typeof f == "object" && f !== null && f.key != null ? (aa(f.key), Nt("" + f.key)) : b.toString(36);
    }
    function ra(f, b, A, z, J) {
      var Re = typeof f;
      (Re === "undefined" || Re === "boolean") && (f = null);
      var pe = !1;
      if (f === null)
        pe = !0;
      else
        switch (Re) {
          case "string":
          case "number":
            pe = !0;
            break;
          case "object":
            switch (f.$$typeof) {
              case g:
              case y:
                pe = !0;
            }
        }
      if (pe) {
        var Oe = f, $e = J(Oe), tt = z === "" ? yt + ba(Oe, 0) : z;
        if (Bt($e)) {
          var ot = "";
          tt != null && (ot = ya(tt) + "/"), ra($e, b, ot, "", function(_f) {
            return _f;
          });
        } else $e != null && (gt($e) && ($e.key && (!Oe || Oe.key !== $e.key) && aa($e.key), $e = et(
          $e,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          A + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          ($e.key && (!Oe || Oe.key !== $e.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            ya("" + $e.key) + "/"
          ) : "") + tt
        )), b.push($e));
        return 1;
      }
      var ut, He, vt = 0, Tt = z === "" ? yt : z + vn;
      if (Bt(f))
        for (var Ei = 0; Ei < f.length; Ei++)
          ut = f[Ei], He = Tt + ba(ut, Ei), vt += ra(ut, b, A, He, J);
      else {
        var Eo = K(f);
        if (typeof Eo == "function") {
          var sr = f;
          Eo === sr.entries && (it || _e("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), it = !0);
          for (var So = Eo.call(sr), xo, wf = 0; !(xo = So.next()).done; )
            ut = xo.value, He = Tt + ba(ut, wf++), vt += ra(ut, b, A, He, J);
        } else if (Re === "object") {
          var hs = String(f);
          throw new Error("Objects are not valid as a React child (found: " + (hs === "[object Object]" ? "object with keys {" + Object.keys(f).join(", ") + "}" : hs) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return vt;
    }
    function lr(f, b, A) {
      if (f == null)
        return f;
      var z = [], J = 0;
      return ra(f, z, "", "", function(Re) {
        return b.call(A, Re, J++);
      }), z;
    }
    function io(f) {
      var b = 0;
      return lr(f, function() {
        b++;
      }), b;
    }
    function fi(f, b, A) {
      lr(f, function() {
        b.apply(this, arguments);
      }, A);
    }
    function Ji(f) {
      return lr(f, function(b) {
        return b;
      }) || [];
    }
    function Zi(f) {
      if (!gt(f))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return f;
    }
    function di(f) {
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
        $$typeof: R,
        _context: b
      };
      var A = !1, z = !1, J = !1;
      {
        var Re = {
          $$typeof: T,
          _context: b
        };
        Object.defineProperties(Re, {
          Provider: {
            get: function() {
              return z || (z = !0, ge("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), b.Provider;
            },
            set: function(pe) {
              b.Provider = pe;
            }
          },
          _currentValue: {
            get: function() {
              return b._currentValue;
            },
            set: function(pe) {
              b._currentValue = pe;
            }
          },
          _currentValue2: {
            get: function() {
              return b._currentValue2;
            },
            set: function(pe) {
              b._currentValue2 = pe;
            }
          },
          _threadCount: {
            get: function() {
              return b._threadCount;
            },
            set: function(pe) {
              b._threadCount = pe;
            }
          },
          Consumer: {
            get: function() {
              return A || (A = !0, ge("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), b.Consumer;
            }
          },
          displayName: {
            get: function() {
              return b.displayName;
            },
            set: function(pe) {
              J || (_e("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", pe), J = !0);
            }
          }
        }), b.Consumer = Re;
      }
      return b._currentRenderer = null, b._currentRenderer2 = null, b;
    }
    var Na = -1, ia = 0, qn = 1, Pa = 2;
    function pi(f) {
      if (f._status === Na) {
        var b = f._result, A = b();
        if (A.then(function(Re) {
          if (f._status === ia || f._status === Na) {
            var pe = f;
            pe._status = qn, pe._result = Re;
          }
        }, function(Re) {
          if (f._status === ia || f._status === Na) {
            var pe = f;
            pe._status = Pa, pe._result = Re;
          }
        }), f._status === Na) {
          var z = f;
          z._status = ia, z._result = A;
        }
      }
      if (f._status === qn) {
        var J = f._result;
        return J === void 0 && ge(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, J), "default" in J || ge(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, J), J.default;
      } else
        throw f._result;
    }
    function N(f) {
      var b = {
        // We use these fields to store the result.
        _status: Na,
        _result: f
      }, A = {
        $$typeof: B,
        _payload: b,
        _init: pi
      };
      {
        var z, J;
        Object.defineProperties(A, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return z;
            },
            set: function(Re) {
              ge("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), z = Re, Object.defineProperty(A, "defaultProps", {
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
              ge("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), J = Re, Object.defineProperty(A, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return A;
    }
    function W(f) {
      f != null && f.$$typeof === k ? ge("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof f != "function" ? ge("forwardRef requires a render function but was given %s.", f === null ? "null" : typeof f) : f.length !== 0 && f.length !== 2 && ge("forwardRef render functions accept exactly two parameters: props and ref. %s", f.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), f != null && (f.defaultProps != null || f.propTypes != null) && ge("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var b = {
        $$typeof: L,
        render: f
      };
      {
        var A;
        Object.defineProperty(b, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return A;
          },
          set: function(z) {
            A = z, !f.name && !f.displayName && (f.displayName = z);
          }
        });
      }
      return b;
    }
    var ae;
    ae = Symbol.for("react.module.reference");
    function Ne(f) {
      return !!(typeof f == "string" || typeof f == "function" || f === E || f === M || Ae || f === c || f === D || f === _ || ce || f === ue || Z || U || ve || typeof f == "object" && f !== null && (f.$$typeof === B || f.$$typeof === k || f.$$typeof === R || f.$$typeof === T || f.$$typeof === L || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      f.$$typeof === ae || f.getModuleId !== void 0));
    }
    function Be(f, b) {
      Ne(f) || ge("memo: The first argument must be a component. Instead received: %s", f === null ? "null" : typeof f);
      var A = {
        $$typeof: k,
        type: f,
        compare: b === void 0 ? null : b
      };
      {
        var z;
        Object.defineProperty(A, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return z;
          },
          set: function(J) {
            z = J, !f.name && !f.displayName && (f.displayName = J);
          }
        });
      }
      return A;
    }
    function Te() {
      var f = I.current;
      return f === null && ge(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), f;
    }
    function Ve(f) {
      var b = Te();
      if (f._context !== void 0) {
        var A = f._context;
        A.Consumer === f ? ge("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : A.Provider === f && ge("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return b.useContext(f);
    }
    function Se(f) {
      var b = Te();
      return b.useState(f);
    }
    function Lt(f, b, A) {
      var z = Te();
      return z.useReducer(f, b, A);
    }
    function ft(f) {
      var b = Te();
      return b.useRef(f);
    }
    function dt(f, b) {
      var A = Te();
      return A.useEffect(f, b);
    }
    function hn(f, b) {
      var A = Te();
      return A.useInsertionEffect(f, b);
    }
    function Ba(f, b) {
      var A = Te();
      return A.useLayoutEffect(f, b);
    }
    function Ea(f, b) {
      var A = Te();
      return A.useCallback(f, b);
    }
    function Mt(f, b) {
      var A = Te();
      return A.useMemo(f, b);
    }
    function mi(f, b, A) {
      var z = Te();
      return z.useImperativeHandle(f, b, A);
    }
    function Sa(f, b) {
      {
        var A = Te();
        return A.useDebugValue(f, b);
      }
    }
    function ze() {
      var f = Te();
      return f.useTransition();
    }
    function vi(f) {
      var b = Te();
      return b.useDeferredValue(f);
    }
    function is() {
      var f = Te();
      return f.useId();
    }
    function ls(f, b, A) {
      var z = Te();
      return z.useSyncExternalStore(f, b, A);
    }
    var Ar = 0, lo, oo, uo, so, co, os, us;
    function el() {
    }
    el.__reactDisabledLog = !0;
    function fo() {
      {
        if (Ar === 0) {
          lo = console.log, oo = console.info, uo = console.warn, so = console.error, co = console.group, os = console.groupCollapsed, us = console.groupEnd;
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
        Ar++;
      }
    }
    function $a() {
      {
        if (Ar--, Ar === 0) {
          var f = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ct({}, f, {
              value: lo
            }),
            info: Ct({}, f, {
              value: oo
            }),
            warn: Ct({}, f, {
              value: uo
            }),
            error: Ct({}, f, {
              value: so
            }),
            group: Ct({}, f, {
              value: co
            }),
            groupCollapsed: Ct({}, f, {
              value: os
            }),
            groupEnd: Ct({}, f, {
              value: us
            })
          });
        }
        Ar < 0 && ge("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var hi = Ue.ReactCurrentDispatcher, Vr;
    function tl(f, b, A) {
      {
        if (Vr === void 0)
          try {
            throw Error();
          } catch (J) {
            var z = J.stack.trim().match(/\n( *(at )?)/);
            Vr = z && z[1] || "";
          }
        return `
` + Vr + f;
      }
    }
    var gi = !1, nl;
    {
      var po = typeof WeakMap == "function" ? WeakMap : Map;
      nl = new po();
    }
    function ss(f, b) {
      if (!f || gi)
        return "";
      {
        var A = nl.get(f);
        if (A !== void 0)
          return A;
      }
      var z;
      gi = !0;
      var J = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Re;
      Re = hi.current, hi.current = null, fo();
      try {
        if (b) {
          var pe = function() {
            throw Error();
          };
          if (Object.defineProperty(pe.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(pe, []);
            } catch (Tt) {
              z = Tt;
            }
            Reflect.construct(f, [], pe);
          } else {
            try {
              pe.call();
            } catch (Tt) {
              z = Tt;
            }
            f.call(pe.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Tt) {
            z = Tt;
          }
          f();
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
                    var ut = `
` + Oe[tt].replace(" at new ", " at ");
                    return f.displayName && ut.includes("<anonymous>") && (ut = ut.replace("<anonymous>", f.displayName)), typeof f == "function" && nl.set(f, ut), ut;
                  }
                while (tt >= 1 && ot >= 0);
              break;
            }
        }
      } finally {
        gi = !1, hi.current = Re, $a(), Error.prepareStackTrace = J;
      }
      var He = f ? f.displayName || f.name : "", vt = He ? tl(He) : "";
      return typeof f == "function" && nl.set(f, vt), vt;
    }
    function mo(f, b, A) {
      return ss(f, !1);
    }
    function Rf(f) {
      var b = f.prototype;
      return !!(b && b.isReactComponent);
    }
    function yi(f, b, A) {
      if (f == null)
        return "";
      if (typeof f == "function")
        return ss(f, Rf(f));
      if (typeof f == "string")
        return tl(f);
      switch (f) {
        case D:
          return tl("Suspense");
        case _:
          return tl("SuspenseList");
      }
      if (typeof f == "object")
        switch (f.$$typeof) {
          case L:
            return mo(f.render);
          case k:
            return yi(f.type, b, A);
          case B: {
            var z = f, J = z._payload, Re = z._init;
            try {
              return yi(Re(J), b, A);
            } catch {
            }
          }
        }
      return "";
    }
    var cs = {}, vo = Ue.ReactDebugCurrentFrame;
    function Ke(f) {
      if (f) {
        var b = f._owner, A = yi(f.type, f._source, b ? b.type : null);
        vo.setExtraStackFrame(A);
      } else
        vo.setExtraStackFrame(null);
    }
    function Cf(f, b, A, z, J) {
      {
        var Re = Function.call.bind(mn);
        for (var pe in f)
          if (Re(f, pe)) {
            var Oe = void 0;
            try {
              if (typeof f[pe] != "function") {
                var $e = Error((z || "React class") + ": " + A + " type `" + pe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof f[pe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $e.name = "Invariant Violation", $e;
              }
              Oe = f[pe](b, pe, z, A, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (tt) {
              Oe = tt;
            }
            Oe && !(Oe instanceof Error) && (Ke(J), ge("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", z || "React class", A, pe, typeof Oe), Ke(null)), Oe instanceof Error && !(Oe.message in cs) && (cs[Oe.message] = !0, Ke(J), ge("Failed %s type: %s", A, Oe.message), Ke(null));
          }
      }
    }
    function or(f) {
      if (f) {
        var b = f._owner, A = yi(f.type, f._source, b ? b.type : null);
        ie(A);
      } else
        ie(null);
    }
    var Me;
    Me = !1;
    function ho() {
      if (Y.current) {
        var f = Un(Y.current.type);
        if (f)
          return `

Check the render method of \`` + f + "`.";
      }
      return "";
    }
    function Tn(f) {
      if (f !== void 0) {
        var b = f.fileName.replace(/^.*[\\\/]/, ""), A = f.lineNumber;
        return `

Check your code at ` + b + ":" + A + ".";
      }
      return "";
    }
    function bi(f) {
      return f != null ? Tn(f.__source) : "";
    }
    var kr = {};
    function Df(f) {
      var b = ho();
      if (!b) {
        var A = typeof f == "string" ? f : f.displayName || f.name;
        A && (b = `

Check the top-level render call using <` + A + ">.");
      }
      return b;
    }
    function It(f, b) {
      if (!(!f._store || f._store.validated || f.key != null)) {
        f._store.validated = !0;
        var A = Df(b);
        if (!kr[A]) {
          kr[A] = !0;
          var z = "";
          f && f._owner && f._owner !== Y.current && (z = " It was passed a child from " + Un(f._owner.type) + "."), or(f), ge('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', A, z), or(null);
        }
      }
    }
    function mt(f, b) {
      if (typeof f == "object") {
        if (Bt(f))
          for (var A = 0; A < f.length; A++) {
            var z = f[A];
            gt(z) && It(z, b);
          }
        else if (gt(f))
          f._store && (f._store.validated = !0);
        else if (f) {
          var J = K(f);
          if (typeof J == "function" && J !== f.entries)
            for (var Re = J.call(f), pe; !(pe = Re.next()).done; )
              gt(pe.value) && It(pe.value, b);
        }
      }
    }
    function fs(f) {
      {
        var b = f.type;
        if (b == null || typeof b == "string")
          return;
        var A;
        if (typeof b == "function")
          A = b.propTypes;
        else if (typeof b == "object" && (b.$$typeof === L || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        b.$$typeof === k))
          A = b.propTypes;
        else
          return;
        if (A) {
          var z = Un(b);
          Cf(A, f.props, "prop", z, f);
        } else if (b.PropTypes !== void 0 && !Me) {
          Me = !0;
          var J = Un(b);
          ge("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", J || "Unknown");
        }
        typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && ge("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function la(f) {
      {
        for (var b = Object.keys(f.props), A = 0; A < b.length; A++) {
          var z = b[A];
          if (z !== "children" && z !== "key") {
            or(f), ge("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", z), or(null);
            break;
          }
        }
        f.ref !== null && (or(f), ge("Invalid attribute `ref` supplied to `React.Fragment`."), or(null));
      }
    }
    function jn(f, b, A) {
      var z = Ne(f);
      if (!z) {
        var J = "";
        (f === void 0 || typeof f == "object" && f !== null && Object.keys(f).length === 0) && (J += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Re = bi(b);
        Re ? J += Re : J += ho();
        var pe;
        f === null ? pe = "null" : Bt(f) ? pe = "array" : f !== void 0 && f.$$typeof === g ? (pe = "<" + (Un(f.type) || "Unknown") + " />", J = " Did you accidentally export a JSX literal instead of a component?") : pe = typeof f, ge("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", pe, J);
      }
      var Oe = Fe.apply(this, arguments);
      if (Oe == null)
        return Oe;
      if (z)
        for (var $e = 2; $e < arguments.length; $e++)
          mt(arguments[$e], f);
      return f === E ? la(Oe) : fs(Oe), Oe;
    }
    var xa = !1;
    function Tf(f) {
      var b = jn.bind(null, f);
      return b.type = f, xa || (xa = !0, _e("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(b, "type", {
        enumerable: !1,
        get: function() {
          return _e("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: f
          }), f;
        }
      }), b;
    }
    function go(f, b, A) {
      for (var z = ct.apply(this, arguments), J = 2; J < arguments.length; J++)
        mt(arguments[J], z.type);
      return fs(z), z;
    }
    function ds(f, b) {
      var A = G.transition;
      G.transition = {};
      var z = G.transition;
      G.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        f();
      } finally {
        if (G.transition = A, A === null && z._updatedFibers) {
          var J = z._updatedFibers.size;
          J > 10 && _e("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), z._updatedFibers.clear();
        }
      }
    }
    var yo = !1, al = null;
    function jf(f) {
      if (al === null)
        try {
          var b = ("require" + Math.random()).slice(0, 7), A = o && o[b];
          al = A.call(o, "timers").setImmediate;
        } catch {
          al = function(J) {
            yo === !1 && (yo = !0, typeof MessageChannel > "u" && ge("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var Re = new MessageChannel();
            Re.port1.onmessage = J, Re.port2.postMessage(void 0);
          };
        }
      return al(f);
    }
    var Ur = 0, Ni = !1;
    function bo(f) {
      {
        var b = Ur;
        Ur++, F.current === null && (F.current = []);
        var A = F.isBatchingLegacy, z;
        try {
          if (F.isBatchingLegacy = !0, z = f(), !A && F.didScheduleLegacyUpdate) {
            var J = F.current;
            J !== null && (F.didScheduleLegacyUpdate = !1, ll(J));
          }
        } catch (He) {
          throw ur(b), He;
        } finally {
          F.isBatchingLegacy = A;
        }
        if (z !== null && typeof z == "object" && typeof z.then == "function") {
          var Re = z, pe = !1, Oe = {
            then: function(He, vt) {
              pe = !0, Re.then(function(Tt) {
                ur(b), Ur === 0 ? rl(Tt, He, vt) : He(Tt);
              }, function(Tt) {
                ur(b), vt(Tt);
              });
            }
          };
          return !Ni && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            pe || (Ni = !0, ge("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Oe;
        } else {
          var $e = z;
          if (ur(b), Ur === 0) {
            var tt = F.current;
            tt !== null && (ll(tt), F.current = null);
            var ot = {
              then: function(He, vt) {
                F.current === null ? (F.current = [], rl($e, He, vt)) : He($e);
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
    function ur(f) {
      f !== Ur - 1 && ge("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ur = f;
    }
    function rl(f, b, A) {
      {
        var z = F.current;
        if (z !== null)
          try {
            ll(z), jf(function() {
              z.length === 0 ? (F.current = null, b(f)) : rl(f, b, A);
            });
          } catch (J) {
            A(J);
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
            var A = f[b];
            do
              A = A(!0);
            while (A !== null);
          }
          f.length = 0;
        } catch (z) {
          throw f = f.slice(b + 1), z;
        } finally {
          il = !1;
        }
      }
    }
    var ps = jn, ms = go, No = Tf, vs = {
      map: lr,
      forEach: fi,
      count: io,
      toArray: Ji,
      only: Zi
    };
    d.Children = vs, d.Component = Xt, d.Fragment = E, d.Profiler = M, d.PureComponent = Zt, d.StrictMode = c, d.Suspense = D, d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ue, d.act = bo, d.cloneElement = ms, d.createContext = di, d.createElement = ps, d.createFactory = No, d.createRef = tn, d.forwardRef = W, d.isValidElement = gt, d.lazy = N, d.memo = Be, d.startTransition = ds, d.unstable_act = bo, d.useCallback = Ea, d.useContext = Ve, d.useDebugValue = Sa, d.useDeferredValue = vi, d.useEffect = dt, d.useId = is, d.useImperativeHandle = mi, d.useInsertionEffect = hn, d.useLayoutEffect = Ba, d.useMemo = Mt, d.useReducer = Lt, d.useRef = ft, d.useState = Se, d.useSyncExternalStore = ls, d.useTransition = ze, d.version = m, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(bf, bf.exports);
var iw = bf.exports;
yE.exports = iw;
var C = yE.exports;
const lw = /* @__PURE__ */ rw(C), ow = /* @__PURE__ */ aw({
  __proto__: null,
  default: lw
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
  var o = C, d = Symbol.for("react.element"), m = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), E = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), M = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), L = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), k = Symbol.for("react.offscreen"), B = Symbol.iterator, ue = "@@iterator";
  function te(N) {
    if (N === null || typeof N != "object")
      return null;
    var W = B && N[B] || N[ue];
    return typeof W == "function" ? W : null;
  }
  var me = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function K(N) {
    {
      for (var W = arguments.length, ae = new Array(W > 1 ? W - 1 : 0), Ne = 1; Ne < W; Ne++)
        ae[Ne - 1] = arguments[Ne];
      I("error", N, ae);
    }
  }
  function I(N, W, ae) {
    {
      var Ne = me.ReactDebugCurrentFrame, Be = Ne.getStackAddendum();
      Be !== "" && (W += "%s", ae = ae.concat([Be]));
      var Te = ae.map(function(Ve) {
        return String(Ve);
      });
      Te.unshift("Warning: " + W), Function.prototype.apply.call(console[N], console, Te);
    }
  }
  var G = !1, F = !1, Y = !1, X = !1, ye = !1, ie;
  ie = Symbol.for("react.module.reference");
  function Z(N) {
    return !!(typeof N == "string" || typeof N == "function" || N === g || N === E || ye || N === y || N === T || N === L || X || N === k || G || F || Y || typeof N == "object" && N !== null && (N.$$typeof === _ || N.$$typeof === D || N.$$typeof === c || N.$$typeof === M || N.$$typeof === R || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    N.$$typeof === ie || N.getModuleId !== void 0));
  }
  function U(N, W, ae) {
    var Ne = N.displayName;
    if (Ne)
      return Ne;
    var Be = W.displayName || W.name || "";
    return Be !== "" ? ae + "(" + Be + ")" : ae;
  }
  function ve(N) {
    return N.displayName || "Context";
  }
  function ce(N) {
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
      case L:
        return "SuspenseList";
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case M:
          var W = N;
          return ve(W) + ".Consumer";
        case c:
          var ae = N;
          return ve(ae._context) + ".Provider";
        case R:
          return U(N, N.render, "ForwardRef");
        case D:
          var Ne = N.displayName || null;
          return Ne !== null ? Ne : ce(N.type) || "Memo";
        case _: {
          var Be = N, Te = Be._payload, Ve = Be._init;
          try {
            return ce(Ve(Te));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var Ae = Object.assign, Ue = 0, _e, ge, Je, pn, Qt, xn, Ct;
  function In() {
  }
  In.__reactDisabledLog = !0;
  function Xt() {
    {
      if (Ue === 0) {
        _e = console.log, ge = console.info, Je = console.warn, pn = console.error, Qt = console.group, xn = console.groupCollapsed, Ct = console.groupEnd;
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
          log: Ae({}, N, {
            value: _e
          }),
          info: Ae({}, N, {
            value: ge
          }),
          warn: Ae({}, N, {
            value: Je
          }),
          error: Ae({}, N, {
            value: pn
          }),
          group: Ae({}, N, {
            value: Qt
          }),
          groupCollapsed: Ae({}, N, {
            value: xn
          }),
          groupEnd: Ae({}, N, {
            value: Ct
          })
        });
      }
      Ue < 0 && K("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var na = me.ReactCurrentDispatcher, Dt;
  function Jt(N, W, ae) {
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
  function kn(N, W) {
    if (!N || Zt)
      return "";
    {
      var ae = en.get(N);
      if (ae !== void 0)
        return ae;
    }
    var Ne;
    Zt = !0;
    var Be = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var Te;
    Te = na.current, na.current = null, Xt();
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
`), Lt = Ne.stack.split(`
`), ft = Se.length - 1, dt = Lt.length - 1; ft >= 1 && dt >= 0 && Se[ft] !== Lt[dt]; )
          dt--;
        for (; ft >= 1 && dt >= 0; ft--, dt--)
          if (Se[ft] !== Lt[dt]) {
            if (ft !== 1 || dt !== 1)
              do
                if (ft--, dt--, dt < 0 || Se[ft] !== Lt[dt]) {
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
  function Bt(N, W, ae) {
    return kn(N, !1);
  }
  function Rn(N) {
    var W = N.prototype;
    return !!(W && W.isReactComponent);
  }
  function $t(N, W, ae) {
    if (N == null)
      return "";
    if (typeof N == "function")
      return kn(N, Rn(N));
    if (typeof N == "string")
      return Jt(N);
    switch (N) {
      case T:
        return Jt("Suspense");
      case L:
        return Jt("SuspenseList");
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case R:
          return Bt(N.render);
        case D:
          return $t(N.type, W, ae);
        case _: {
          var Ne = N, Be = Ne._payload, Te = Ne._init;
          try {
            return $t(Te(Be), W, ae);
          } catch {
          }
        }
      }
    return "";
  }
  var Yt = Object.prototype.hasOwnProperty, aa = {}, rr = me.ReactDebugCurrentFrame;
  function ga(N) {
    if (N) {
      var W = N._owner, ae = $t(N.type, N._source, W ? W.type : null);
      rr.setExtraStackFrame(ae);
    } else
      rr.setExtraStackFrame(null);
  }
  function Un(N, W, ae, Ne, Be) {
    {
      var Te = Function.call.bind(Yt);
      for (var Ve in N)
        if (Te(N, Ve)) {
          var Se = void 0;
          try {
            if (typeof N[Ve] != "function") {
              var Lt = Error((Ne || "React class") + ": " + ae + " type `" + Ve + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof N[Ve] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw Lt.name = "Invariant Violation", Lt;
            }
            Se = N[Ve](W, Ve, Ne, ae, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (ft) {
            Se = ft;
          }
          Se && !(Se instanceof Error) && (ga(Be), K("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Ne || "React class", ae, Ve, typeof Se), ga(null)), Se instanceof Error && !(Se.message in aa) && (aa[Se.message] = !0, ga(Be), K("Failed %s type: %s", ae, Se.message), ga(null));
        }
    }
  }
  var mn = Array.isArray;
  function nn(N) {
    return mn(N);
  }
  function Cn(N) {
    {
      var W = typeof Symbol == "function" && Symbol.toStringTag, ae = W && N[Symbol.toStringTag] || N.constructor.name || "Object";
      return ae;
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
  var Fn = me.ReactCurrentOwner, Mr = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, ir, ne, be;
  be = {};
  function Fe(N) {
    if (Yt.call(N, "ref")) {
      var W = Object.getOwnPropertyDescriptor(N, "ref").get;
      if (W && W.isReactWarning)
        return !1;
    }
    return N.ref !== void 0;
  }
  function et(N) {
    if (Yt.call(N, "key")) {
      var W = Object.getOwnPropertyDescriptor(N, "key").get;
      if (W && W.isReactWarning)
        return !1;
    }
    return N.key !== void 0;
  }
  function ct(N, W) {
    if (typeof N.ref == "string" && Fn.current && W && Fn.current.stateNode !== W) {
      var ae = ce(Fn.current.type);
      be[ae] || (K('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ce(Fn.current.type), N.ref), be[ae] = !0);
    }
  }
  function gt(N, W) {
    {
      var ae = function() {
        ir || (ir = !0, K("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", W));
      };
      ae.isReactWarning = !0, Object.defineProperty(N, "key", {
        get: ae,
        configurable: !0
      });
    }
  }
  function yt(N, W) {
    {
      var ae = function() {
        ne || (ne = !0, K("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", W));
      };
      ae.isReactWarning = !0, Object.defineProperty(N, "ref", {
        get: ae,
        configurable: !0
      });
    }
  }
  var vn = function(N, W, ae, Ne, Be, Te, Ve) {
    var Se = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: d,
      // Built-in properties that belong on the element
      type: N,
      key: W,
      ref: ae,
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
  function Nt(N, W, ae, Ne, Be) {
    {
      var Te, Ve = {}, Se = null, Lt = null;
      ae !== void 0 && (Dn(ae), Se = "" + ae), et(W) && (Dn(W.key), Se = "" + W.key), Fe(W) && (Lt = W.ref, ct(W, Be));
      for (Te in W)
        Yt.call(W, Te) && !Mr.hasOwnProperty(Te) && (Ve[Te] = W[Te]);
      if (N && N.defaultProps) {
        var ft = N.defaultProps;
        for (Te in ft)
          Ve[Te] === void 0 && (Ve[Te] = ft[Te]);
      }
      if (Se || Lt) {
        var dt = typeof N == "function" ? N.displayName || N.name || "Unknown" : N;
        Se && gt(Ve, dt), Lt && yt(Ve, dt);
      }
      return vn(N, Se, Lt, Be, Ne, Fn.current, Ve);
    }
  }
  var it = me.ReactCurrentOwner, Et = me.ReactDebugCurrentFrame;
  function ya(N) {
    if (N) {
      var W = N._owner, ae = $t(N.type, N._source, W ? W.type : null);
      Et.setExtraStackFrame(ae);
    } else
      Et.setExtraStackFrame(null);
  }
  var ba;
  ba = !1;
  function ra(N) {
    return typeof N == "object" && N !== null && N.$$typeof === d;
  }
  function lr() {
    {
      if (it.current) {
        var N = ce(it.current.type);
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
        var W = N.fileName.replace(/^.*[\\\/]/, ""), ae = N.lineNumber;
        return `

Check your code at ` + W + ":" + ae + ".";
      }
      return "";
    }
  }
  var fi = {};
  function Ji(N) {
    {
      var W = lr();
      if (!W) {
        var ae = typeof N == "string" ? N : N.displayName || N.name;
        ae && (W = `

Check the top-level render call using <` + ae + ">.");
      }
      return W;
    }
  }
  function Zi(N, W) {
    {
      if (!N._store || N._store.validated || N.key != null)
        return;
      N._store.validated = !0;
      var ae = Ji(W);
      if (fi[ae])
        return;
      fi[ae] = !0;
      var Ne = "";
      N && N._owner && N._owner !== it.current && (Ne = " It was passed a child from " + ce(N._owner.type) + "."), ya(N), K('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ae, Ne), ya(null);
    }
  }
  function di(N, W) {
    {
      if (typeof N != "object")
        return;
      if (nn(N))
        for (var ae = 0; ae < N.length; ae++) {
          var Ne = N[ae];
          ra(Ne) && Zi(Ne, W);
        }
      else if (ra(N))
        N._store && (N._store.validated = !0);
      else if (N) {
        var Be = te(N);
        if (typeof Be == "function" && Be !== N.entries)
          for (var Te = Be.call(N), Ve; !(Ve = Te.next()).done; )
            ra(Ve.value) && Zi(Ve.value, W);
      }
    }
  }
  function Na(N) {
    {
      var W = N.type;
      if (W == null || typeof W == "string")
        return;
      var ae;
      if (typeof W == "function")
        ae = W.propTypes;
      else if (typeof W == "object" && (W.$$typeof === R || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      W.$$typeof === D))
        ae = W.propTypes;
      else
        return;
      if (ae) {
        var Ne = ce(W);
        Un(ae, N.props, "prop", Ne, N);
      } else if (W.PropTypes !== void 0 && !ba) {
        ba = !0;
        var Be = ce(W);
        K("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Be || "Unknown");
      }
      typeof W.getDefaultProps == "function" && !W.getDefaultProps.isReactClassApproved && K("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function ia(N) {
    {
      for (var W = Object.keys(N.props), ae = 0; ae < W.length; ae++) {
        var Ne = W[ae];
        if (Ne !== "children" && Ne !== "key") {
          ya(N), K("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Ne), ya(null);
          break;
        }
      }
      N.ref !== null && (ya(N), K("Invalid attribute `ref` supplied to `React.Fragment`."), ya(null));
    }
  }
  var qn = {};
  function Pa(N, W, ae, Ne, Be, Te) {
    {
      var Ve = Z(N);
      if (!Ve) {
        var Se = "";
        (N === void 0 || typeof N == "object" && N !== null && Object.keys(N).length === 0) && (Se += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Lt = io(Be);
        Lt ? Se += Lt : Se += lr();
        var ft;
        N === null ? ft = "null" : nn(N) ? ft = "array" : N !== void 0 && N.$$typeof === d ? (ft = "<" + (ce(N.type) || "Unknown") + " />", Se = " Did you accidentally export a JSX literal instead of a component?") : ft = typeof N, K("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ft, Se);
      }
      var dt = Nt(N, W, ae, Be, Te);
      if (dt == null)
        return dt;
      if (Ve) {
        var hn = W.children;
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
      if (Yt.call(W, "key")) {
        var Ea = ce(N), Mt = Object.keys(W).filter(function(ze) {
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
  Av.Fragment = g, Av.jsxDEV = pi;
})();
gE.exports = Av;
var p = gE.exports, bE = { exports: {} }, ta = {}, NE = { exports: {} }, EE = {};
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
    var d = !1, m = 5;
    function g(ne, be) {
      var Fe = ne.length;
      ne.push(be), c(ne, be, Fe);
    }
    function y(ne) {
      return ne.length === 0 ? null : ne[0];
    }
    function E(ne) {
      if (ne.length === 0)
        return null;
      var be = ne[0], Fe = ne.pop();
      return Fe !== be && (ne[0] = Fe, M(ne, Fe, 0)), be;
    }
    function c(ne, be, Fe) {
      for (var et = Fe; et > 0; ) {
        var ct = et - 1 >>> 1, gt = ne[ct];
        if (R(gt, be) > 0)
          ne[ct] = be, ne[et] = gt, et = ct;
        else
          return;
      }
    }
    function M(ne, be, Fe) {
      for (var et = Fe, ct = ne.length, gt = ct >>> 1; et < gt; ) {
        var yt = (et + 1) * 2 - 1, vn = ne[yt], Nt = yt + 1, it = ne[Nt];
        if (R(vn, be) < 0)
          Nt < ct && R(it, vn) < 0 ? (ne[et] = it, ne[Nt] = be, et = Nt) : (ne[et] = vn, ne[yt] = be, et = yt);
        else if (Nt < ct && R(it, be) < 0)
          ne[et] = it, ne[Nt] = be, et = Nt;
        else
          return;
      }
    }
    function R(ne, be) {
      var Fe = ne.sortIndex - be.sortIndex;
      return Fe !== 0 ? Fe : ne.id - be.id;
    }
    var T = 1, L = 2, D = 3, _ = 4, k = 5;
    function B(ne, be) {
    }
    var ue = typeof performance == "object" && typeof performance.now == "function";
    if (ue) {
      var te = performance;
      o.unstable_now = function() {
        return te.now();
      };
    } else {
      var me = Date, K = me.now();
      o.unstable_now = function() {
        return me.now() - K;
      };
    }
    var I = 1073741823, G = -1, F = 250, Y = 5e3, X = 1e4, ye = I, ie = [], Z = [], U = 1, ve = null, ce = D, Ae = !1, Ue = !1, _e = !1, ge = typeof setTimeout == "function" ? setTimeout : null, Je = typeof clearTimeout == "function" ? clearTimeout : null, pn = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Qt(ne) {
      for (var be = y(Z); be !== null; ) {
        if (be.callback === null)
          E(Z);
        else if (be.startTime <= ne)
          E(Z), be.sortIndex = be.expirationTime, g(ie, be);
        else
          return;
        be = y(Z);
      }
    }
    function xn(ne) {
      if (_e = !1, Qt(ne), !Ue)
        if (y(ie) !== null)
          Ue = !0, Ot(Ct);
        else {
          var be = y(Z);
          be !== null && Dn(xn, be.startTime - ne);
        }
    }
    function Ct(ne, be) {
      Ue = !1, _e && (_e = !1, Fn()), Ae = !0;
      var Fe = ce;
      try {
        var et;
        if (!d) return In(ne, be);
      } finally {
        ve = null, ce = Fe, Ae = !1;
      }
    }
    function In(ne, be) {
      var Fe = be;
      for (Qt(Fe), ve = y(ie); ve !== null && !(ve.expirationTime > Fe && (!ne || rr())); ) {
        var et = ve.callback;
        if (typeof et == "function") {
          ve.callback = null, ce = ve.priorityLevel;
          var ct = ve.expirationTime <= Fe, gt = et(ct);
          Fe = o.unstable_now(), typeof gt == "function" ? ve.callback = gt : ve === y(ie) && E(ie), Qt(Fe);
        } else
          E(ie);
        ve = y(ie);
      }
      if (ve !== null)
        return !0;
      var yt = y(Z);
      return yt !== null && Dn(xn, yt.startTime - Fe), !1;
    }
    function Xt(ne, be) {
      switch (ne) {
        case T:
        case L:
        case D:
        case _:
        case k:
          break;
        default:
          ne = D;
      }
      var Fe = ce;
      ce = ne;
      try {
        return be();
      } finally {
        ce = Fe;
      }
    }
    function ha(ne) {
      var be;
      switch (ce) {
        case T:
        case L:
        case D:
          be = D;
          break;
        default:
          be = ce;
          break;
      }
      var Fe = ce;
      ce = be;
      try {
        return ne();
      } finally {
        ce = Fe;
      }
    }
    function na(ne) {
      var be = ce;
      return function() {
        var Fe = ce;
        ce = be;
        try {
          return ne.apply(this, arguments);
        } finally {
          ce = Fe;
        }
      };
    }
    function Dt(ne, be, Fe) {
      var et = o.unstable_now(), ct;
      if (typeof Fe == "object" && Fe !== null) {
        var gt = Fe.delay;
        typeof gt == "number" && gt > 0 ? ct = et + gt : ct = et;
      } else
        ct = et;
      var yt;
      switch (ne) {
        case T:
          yt = G;
          break;
        case L:
          yt = F;
          break;
        case k:
          yt = ye;
          break;
        case _:
          yt = X;
          break;
        case D:
        default:
          yt = Y;
          break;
      }
      var vn = ct + yt, Nt = {
        id: U++,
        callback: be,
        priorityLevel: ne,
        startTime: ct,
        expirationTime: vn,
        sortIndex: -1
      };
      return ct > et ? (Nt.sortIndex = ct, g(Z, Nt), y(ie) === null && Nt === y(Z) && (_e ? Fn() : _e = !0, Dn(xn, ct - et))) : (Nt.sortIndex = vn, g(ie, Nt), !Ue && !Ae && (Ue = !0, Ot(Ct))), Nt;
    }
    function Jt() {
    }
    function Zt() {
      !Ue && !Ae && (Ue = !0, Ot(Ct));
    }
    function en() {
      return y(ie);
    }
    function tn(ne) {
      ne.callback = null;
    }
    function kn() {
      return ce;
    }
    var Bt = !1, Rn = null, $t = -1, Yt = m, aa = -1;
    function rr() {
      var ne = o.unstable_now() - aa;
      return !(ne < Yt);
    }
    function ga() {
    }
    function Un(ne) {
      if (ne < 0 || ne > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      ne > 0 ? Yt = Math.floor(1e3 / ne) : Yt = m;
    }
    var mn = function() {
      if (Rn !== null) {
        var ne = o.unstable_now();
        aa = ne;
        var be = !0, Fe = !0;
        try {
          Fe = Rn(be, ne);
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
        ge(mn, 0);
      };
    function Ot(ne) {
      Rn = ne, Bt || (Bt = !0, nn());
    }
    function Dn(ne, be) {
      $t = ge(function() {
        ne(o.unstable_now());
      }, be);
    }
    function Fn() {
      Je($t), $t = -1;
    }
    var Mr = ga, ir = null;
    o.unstable_IdlePriority = k, o.unstable_ImmediatePriority = T, o.unstable_LowPriority = _, o.unstable_NormalPriority = D, o.unstable_Profiling = ir, o.unstable_UserBlockingPriority = L, o.unstable_cancelCallback = tn, o.unstable_continueExecution = Zt, o.unstable_forceFrameRate = Un, o.unstable_getCurrentPriorityLevel = kn, o.unstable_getFirstCallbackNode = en, o.unstable_next = ha, o.unstable_pauseExecution = Jt, o.unstable_requestPaint = Mr, o.unstable_runWithPriority = Xt, o.unstable_scheduleCallback = Dt, o.unstable_shouldYield = rr, o.unstable_wrapCallback = na, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(EE);
NE.exports = EE;
var uw = NE.exports;
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
  var o = C, d = uw, m = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
  function y(e) {
    g = e;
  }
  function E(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      M("warn", e, n);
    }
  }
  function c(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      M("error", e, n);
    }
  }
  function M(e, t, n) {
    {
      var a = m.ReactDebugCurrentFrame, r = a.getStackAddendum();
      r !== "" && (t += "%s", n = n.concat([r]));
      var i = n.map(function(l) {
        return String(l);
      });
      i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
    }
  }
  var R = 0, T = 1, L = 2, D = 3, _ = 4, k = 5, B = 6, ue = 7, te = 8, me = 9, K = 10, I = 11, G = 12, F = 13, Y = 14, X = 15, ye = 16, ie = 17, Z = 18, U = 19, ve = 21, ce = 22, Ae = 23, Ue = 24, _e = 25, ge = !0, Je = !1, pn = !1, Qt = !1, xn = !1, Ct = !0, In = !0, Xt = !0, ha = !0, na = /* @__PURE__ */ new Set(), Dt = {}, Jt = {};
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
  function rr(e, t) {
    if (Rn(e))
      return c("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Bt(e)), $t(e);
  }
  function ga(e, t) {
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
  var nn = 0, Cn = 1, Ha = 2, Ot = 3, Dn = 4, Fn = 5, Mr = 6, ir = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ne = ir + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", be = new RegExp("^[" + ir + "][" + ne + "]*$"), Fe = {}, et = {};
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
    !fi && io.test(e) && (fi = !0, c("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
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
        var x = r.type, S;
        x === Ot || x === Dn && n === !0 ? S = "" : (Yt(n, v), S = "" + n, r.sanitizeURL && Ji(S.toString())), h ? e.setAttributeNS(h, v, S) : e.setAttribute(v, S);
      }
    }
  }
  var ia = Symbol.for("react.element"), qn = Symbol.for("react.portal"), Pa = Symbol.for("react.fragment"), pi = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), W = Symbol.for("react.provider"), ae = Symbol.for("react.context"), Ne = Symbol.for("react.forward_ref"), Be = Symbol.for("react.suspense"), Te = Symbol.for("react.suspense_list"), Ve = Symbol.for("react.memo"), Se = Symbol.for("react.lazy"), Lt = Symbol.for("react.scope"), ft = Symbol.for("react.debug_trace_mode"), dt = Symbol.for("react.offscreen"), hn = Symbol.for("react.legacy_hidden"), Ba = Symbol.for("react.cache"), Ea = Symbol.for("react.tracing_marker"), Mt = Symbol.iterator, mi = "@@iterator";
  function Sa(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = Mt && e[Mt] || e[mi];
    return typeof t == "function" ? t : null;
  }
  var ze = Object.assign, vi = 0, is, ls, Ar, lo, oo, uo, so;
  function co() {
  }
  co.__reactDisabledLog = !0;
  function os() {
    {
      if (vi === 0) {
        is = console.log, ls = console.info, Ar = console.warn, lo = console.error, oo = console.group, uo = console.groupCollapsed, so = console.groupEnd;
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
  function us() {
    {
      if (vi--, vi === 0) {
        var e = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: ze({}, e, {
            value: is
          }),
          info: ze({}, e, {
            value: ls
          }),
          warn: ze({}, e, {
            value: Ar
          }),
          error: ze({}, e, {
            value: lo
          }),
          group: ze({}, e, {
            value: oo
          }),
          groupCollapsed: ze({}, e, {
            value: uo
          }),
          groupEnd: ze({}, e, {
            value: so
          })
        });
      }
      vi < 0 && c("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
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
    i = el.current, el.current = null, os();
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
`), v = u.length - 1, h = s.length - 1; v >= 1 && h >= 0 && u[v] !== s[h]; )
          h--;
        for (; v >= 1 && h >= 0; v--, h--)
          if (u[v] !== s[h]) {
            if (v !== 1 || h !== 1)
              do
                if (v--, h--, h < 0 || u[v] !== s[h]) {
                  var x = `
` + u[v].replace(" at new ", " at ");
                  return e.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", e.displayName)), typeof e == "function" && Vr.set(e, x), x;
                }
              while (v >= 1 && h >= 0);
            break;
          }
      }
    } finally {
      hi = !1, el.current = i, us(), Error.prepareStackTrace = r;
    }
    var S = e ? e.displayName || e.name : "", O = S ? $a(S) : "";
    return typeof e == "function" && Vr.set(e, O), O;
  }
  function nl(e, t, n) {
    return gi(e, !0);
  }
  function po(e, t, n) {
    return gi(e, !1);
  }
  function ss(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function mo(e, t, n) {
    if (e == null)
      return "";
    if (typeof e == "function")
      return gi(e, ss(e));
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
      case k:
        return $a(e.type);
      case ye:
        return $a("Lazy");
      case F:
        return $a("Suspense");
      case U:
        return $a("SuspenseList");
      case R:
      case L:
      case X:
        return po(e.type);
      case I:
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
  function cs(e, t, n) {
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
    if (typeof e.tag == "number" && c("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
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
        case ae:
          var t = e;
          return vo(t) + ".Consumer";
        case W:
          var n = e;
          return vo(n._context) + ".Provider";
        case Ne:
          return cs(e, e.render, "ForwardRef");
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
      case me:
        var a = n;
        return or(a) + ".Consumer";
      case K:
        var r = n;
        return or(r._context) + ".Provider";
      case Z:
        return "DehydratedFragment";
      case I:
        return Cf(n, n.render, "ForwardRef");
      case ue:
        return "Fragment";
      case k:
        return n;
      case _:
        return "Portal";
      case D:
        return "Root";
      case B:
        return "Text";
      case ye:
        return Ke(n);
      case te:
        return n === pi ? "StrictMode" : "Mode";
      case ce:
        return "Offscreen";
      case G:
        return "Profiler";
      case ve:
        return "Scope";
      case F:
        return "Suspense";
      case U:
        return "SuspenseList";
      case _e:
        return "TracingMarker";
      case T:
      case R:
      case ie:
      case L:
      case Y:
      case X:
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
  function fs() {
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
    Tf[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || c("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || c("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
  }
  function ds(e) {
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
    return e && (ds(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
  }
  function Ur(e) {
    var t = ds(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
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
  function ur(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var rl = !1, il = !1, ll = !1, ps = !1;
  function ms(e) {
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
  function vs(e, t) {
    go("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !il && (c("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component", t.type), il = !0), t.value !== void 0 && t.defaultValue !== void 0 && !rl && (c("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component", t.type), rl = !0);
    var n = e, a = t.defaultValue == null ? "" : t.defaultValue;
    n._wrapperState = {
      initialChecked: t.checked != null ? t.checked : t.defaultChecked,
      initialValue: xa(t.value != null ? t.value : a),
      controlled: ms(t)
    };
  }
  function f(e, t) {
    var n = e, a = t.checked;
    a != null && Na(n, "checked", a, !1);
  }
  function b(e, t) {
    var n = e;
    {
      var a = ms(t);
      !n._wrapperState.controlled && a && !ps && (c("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ps = !0), n._wrapperState.controlled && !a && !ll && (c("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ll = !0);
    }
    f(e, t);
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
  function z(e, t) {
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
          var u = tc(l);
          if (!u)
            throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
          bo(l), b(l, u);
        }
      }
    }
  }
  function Re(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || ur(e.ownerDocument) !== e) && (n == null ? e.defaultValue = jn(e._wrapperState.initialValue) : e.defaultValue !== jn(n) && (e.defaultValue = jn(n)));
  }
  var pe = !1, Oe = !1, $e = !1;
  function tt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? o.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Oe || (Oe = !0, c("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && ($e || ($e = !0, c("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !pe && (c("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), pe = !0);
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
          e.multiple && !a ? c("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Tt()) : !e.multiple && a && c("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Tt());
        }
      }
    }
  }
  function sr(e, t, n, a) {
    var r = e.options;
    if (t) {
      for (var i = n, l = {}, u = 0; u < i.length; u++)
        l["$" + i[u]] = !0;
      for (var s = 0; s < r.length; s++) {
        var v = l.hasOwnProperty("$" + r[s].value);
        r[s].selected !== v && (r[s].selected = v), v && a && (r[s].defaultSelected = !0);
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
    }, t.value !== void 0 && t.defaultValue !== void 0 && !vt && (c("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), vt = !0);
  }
  function wf(e, t) {
    var n = e;
    n.multiple = !!t.multiple;
    var a = t.value;
    a != null ? sr(n, !!t.multiple, a, !1) : t.defaultValue != null && sr(n, !!t.multiple, t.defaultValue, !0);
  }
  function hs(e, t) {
    var n = e, a = n._wrapperState.wasMultiple;
    n._wrapperState.wasMultiple = !!t.multiple;
    var r = t.value;
    r != null ? sr(n, !!t.multiple, r, !1) : a !== !!t.multiple && (t.defaultValue != null ? sr(n, !!t.multiple, t.defaultValue, !0) : sr(n, !!t.multiple, t.multiple ? [] : "", !1));
  }
  function _f(e, t) {
    var n = e, a = t.value;
    a != null && sr(n, !!t.multiple, a, !1);
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
    go("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Wv && (c("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component"), Wv = !0);
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
  var cr = "http://www.w3.org/1999/xhtml", IE = "http://www.w3.org/1998/Math/MathML", Lf = "http://www.w3.org/2000/svg";
  function Mf(e) {
    switch (e) {
      case "svg":
        return Lf;
      case "math":
        return IE;
      default:
        return cr;
    }
  }
  function Af(e, t) {
    return e == null || e === cr ? Mf(t) : e === Lf && t === "foreignObject" ? cr : e;
  }
  var qE = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, gs, Jv = qE(function(e, t) {
    if (e.namespaceURI === Lf && !("innerHTML" in e)) {
      gs = gs || document.createElement("div"), gs.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = gs.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), zn = 1, fr = 3, jt = 8, dr = 9, Vf = 11, ys = function(e, t) {
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
      ol.hasOwnProperty(e) && ol[e] || (ol[e] = !0, c(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        nS(e.replace(eS, "ms-"))
      ));
    }, rS = function(e) {
      ol.hasOwnProperty(e) && ol[e] || (ol[e] = !0, c("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, iS = function(e, t) {
      Uf.hasOwnProperty(t) && Uf[t] || (Uf[t] = !0, c(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(eh, "")));
    }, lS = function(e, t) {
      th || (th = !0, c("`NaN` is an invalid value for the `%s` css style property.", e));
    }, oS = function(e, t) {
      nh || (nh = !0, c("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Zv = function(e, t) {
      e.indexOf("-") > -1 ? aS(e) : ZE.test(e) ? rS(e) : eh.test(t) && iS(e, t), typeof t == "number" && (isNaN(t) ? lS(e, t) : isFinite(t) || oS(e, t));
    };
  }
  var uS = Zv;
  function sS(e) {
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
        r || uS(a, t[a]);
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
        var l = n[i], u = a[i];
        if (u && l !== u) {
          var s = l + "," + u;
          if (r[s])
            continue;
          r[s] = !0, c("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", cS(e[l]) ? "Removing" : "Updating", l, u);
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
      if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && c("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
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
  var bs = {
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
  }, ul = {}, vS = new RegExp("^(aria)-[" + ne + "]*$"), hS = new RegExp("^(aria)[A-Z][" + ne + "]*$");
  function gS(e, t) {
    {
      if (kn.call(ul, t) && ul[t])
        return !0;
      if (hS.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = ih.hasOwnProperty(n) ? n : null;
        if (a == null)
          return c("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ul[t] = !0, !0;
        if (t !== a)
          return c("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), ul[t] = !0, !0;
      }
      if (vS.test(t)) {
        var r = t.toLowerCase(), i = ih.hasOwnProperty(r) ? r : null;
        if (i == null)
          return ul[t] = !0, !1;
        if (t !== i)
          return c("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), ul[t] = !0, !0;
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
      n.length === 1 ? c("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && c("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
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
      t != null && t.value === null && !lh && (lh = !0, e === "select" && t.multiple ? c("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : c("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var oh = function() {
  };
  {
    var wn = {}, uh = /^on./, ES = /^on[^A-Z]/, SS = new RegExp("^(aria)-[" + ne + "]*$"), xS = new RegExp("^(aria)[A-Z][" + ne + "]*$");
    oh = function(e, t, n, a) {
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
        if (uh.test(t))
          return c("Unknown event handler property `%s`. It will be ignored.", t), wn[t] = !0, !0;
      } else if (uh.test(t))
        return ES.test(t) && c("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), wn[t] = !0, !0;
      if (SS.test(t) || xS.test(t))
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
      if (bs.hasOwnProperty(r)) {
        var h = bs[r];
        if (h !== t)
          return c("Invalid DOM property `%s`. Did you mean `%s`?", t, h), wn[t] = !0, !0;
      } else if (!v && t !== r)
        return c("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), wn[t] = !0, !0;
      return typeof n == "boolean" && yt(t, n, s, !1) ? (n ? c('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : c('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), wn[t] = !0, !0) : v ? !0 : yt(t, n, s, !1) ? (wn[t] = !0, !1) : ((n === "false" || n === "true") && s !== null && s.type === Ot && (c("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), wn[t] = !0), !0);
    };
  }
  var RS = function(e, t, n) {
    {
      var a = [];
      for (var r in t) {
        var i = oh(e, r, t[r], n);
        i || a.push(r);
      }
      var l = a.map(function(u) {
        return "`" + u + "`";
      }).join(", ");
      a.length === 1 ? c("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e) : a.length > 1 && c("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e);
    }
  };
  function CS(e, t, n) {
    Si(e, t) || RS(e, t, n);
  }
  var sh = 1, zf = 2, Co = 4, DS = sh | zf | Co, Do = null;
  function TS(e) {
    Do !== null && c("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Do = e;
  }
  function jS() {
    Do === null && c("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Do = null;
  }
  function wS(e) {
    return e === Do;
  }
  function Hf(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === fr ? t.parentNode : t;
  }
  var Pf = null, sl = null, cl = null;
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
    sl ? cl ? cl.push(e) : cl = [e] : sl = e;
  }
  function OS() {
    return sl !== null || cl !== null;
  }
  function dh() {
    if (sl) {
      var e = sl, t = cl;
      if (sl = null, cl = null, ch(e), t)
        for (var n = 0; n < t.length; n++)
          ch(t[n]);
    }
  }
  var ph = function(e, t) {
    return e(t);
  }, mh = function() {
  }, Bf = !1;
  function LS() {
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
      Bf = !1, LS();
    }
  }
  function MS(e, t, n) {
    ph = e, mh = n;
  }
  function AS(e) {
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
        return !!(n.disabled && AS(t));
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
  function hh(e, t, n, a, r, i, l, u, s) {
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
    gh = function(t, n, a, r, i, l, u, s, v) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var h = document.createEvent("Event"), x = !1, S = !0, O = window.event, V = Object.getOwnPropertyDescriptor(window, "event");
      function H() {
        Yf.removeEventListener(P, Ee, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = O);
      }
      var re = Array.prototype.slice.call(arguments, 3);
      function Ee() {
        x = !0, H(), n.apply(a, re), S = !1;
      }
      var he, qe = !1, Pe = !1;
      function j(w) {
        if (he = w.error, qe = !0, he === null && w.colno === 0 && w.lineno === 0 && (Pe = !0), w.defaultPrevented && he != null && typeof he == "object")
          try {
            he._suppressLogging = !0;
          } catch {
          }
      }
      var P = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", j), Yf.addEventListener(P, Ee, !1), h.initEvent(P, !1, !1), Yf.dispatchEvent(h), V && Object.defineProperty(window, "event", V), x && S && (qe ? Pe && (he = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : he = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(he)), window.removeEventListener("error", j), !x)
        return H(), hh.apply(this, arguments);
    };
  }
  var kS = gh, fl = !1, Ns = null, Es = !1, If = null, US = {
    onError: function(e) {
      fl = !0, Ns = e;
    }
  };
  function qf(e, t, n, a, r, i, l, u, s) {
    fl = !1, Ns = null, kS.apply(US, arguments);
  }
  function FS(e, t, n, a, r, i, l, u, s) {
    if (qf.apply(this, arguments), fl) {
      var v = Gf();
      Es || (Es = !0, If = v);
    }
  }
  function zS() {
    if (Es) {
      var e = If;
      throw Es = !1, If = null, e;
    }
  }
  function HS() {
    return fl;
  }
  function Gf() {
    if (fl) {
      var e = Ns;
      return fl = !1, Ns = null, e;
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
  ), Ss = (
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
        a._warnedAboutRefsInRender || c("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Me(n) || "A component"), a._warnedAboutRefsInRender = !0;
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
            return Sh(i), e;
          if (s === r)
            return Sh(i), t;
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
    if (a.tag !== D)
      throw new Error("Unable to find node on an unmounted component.");
    return a.stateNode.current === a ? e : t;
  }
  function Rh(e) {
    var t = xh(e);
    return t !== null ? Ch(t) : null;
  }
  function Ch(e) {
    if (e.tag === k || e.tag === B)
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
    if (e.tag === k || e.tag === B)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== _) {
        var n = Dh(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Th = d.unstable_scheduleCallback, WS = d.unstable_cancelCallback, KS = d.unstable_shouldYield, QS = d.unstable_requestPaint, qt = d.unstable_now, XS = d.unstable_getCurrentPriorityLevel, xs = d.unstable_ImmediatePriority, td = d.unstable_UserBlockingPriority, ji = d.unstable_NormalPriority, JS = d.unstable_LowPriority, nd = d.unstable_IdlePriority, ZS = d.unstable_yieldValue, ex = d.unstable_setDisableYieldValue, hl = null, gn = null, oe = null, Ya = !1, Ra = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function tx(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return c("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      In && (e = ze({}, e, {
        getLaneLabelMap: ox,
        injectProfilingHooks: lx
      })), hl = t.inject(e), gn = t;
    } catch (n) {
      c("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function nx(e, t) {
    if (gn && typeof gn.onScheduleFiberRoot == "function")
      try {
        gn.onScheduleFiberRoot(hl, e, t);
      } catch (n) {
        Ya || (Ya = !0, c("React instrumentation encountered an error: %s", n));
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
              a = xs;
              break;
            case gr:
              a = td;
              break;
            case yr:
              a = ji;
              break;
            case _s:
              a = nd;
              break;
            default:
              a = ji;
              break;
          }
          gn.onCommitFiberRoot(hl, e, a, n);
        }
      } catch (r) {
        Ya || (Ya = !0, c("React instrumentation encountered an error: %s", r));
      }
  }
  function rx(e) {
    if (gn && typeof gn.onPostCommitFiberRoot == "function")
      try {
        gn.onPostCommitFiberRoot(hl, e);
      } catch (t) {
        Ya || (Ya = !0, c("React instrumentation encountered an error: %s", t));
      }
  }
  function ix(e) {
    if (gn && typeof gn.onCommitFiberUnmount == "function")
      try {
        gn.onCommitFiberUnmount(hl, e);
      } catch (t) {
        Ya || (Ya = !0, c("React instrumentation encountered an error: %s", t));
      }
  }
  function Gt(e) {
    if (typeof ZS == "function" && (ex(e), y(e)), gn && typeof gn.setStrictMode == "function")
      try {
        gn.setStrictMode(hl, e);
      } catch (t) {
        Ya || (Ya = !0, c("React instrumentation encountered an error: %s", t));
      }
  }
  function lx(e) {
    oe = e;
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
  function ux(e) {
    oe !== null && typeof oe.markCommitStarted == "function" && oe.markCommitStarted(e);
  }
  function jh() {
    oe !== null && typeof oe.markCommitStopped == "function" && oe.markCommitStopped();
  }
  function Oo(e) {
    oe !== null && typeof oe.markComponentRenderStarted == "function" && oe.markComponentRenderStarted(e);
  }
  function gl() {
    oe !== null && typeof oe.markComponentRenderStopped == "function" && oe.markComponentRenderStopped();
  }
  function sx(e) {
    oe !== null && typeof oe.markComponentPassiveEffectMountStarted == "function" && oe.markComponentPassiveEffectMountStarted(e);
  }
  function cx() {
    oe !== null && typeof oe.markComponentPassiveEffectMountStopped == "function" && oe.markComponentPassiveEffectMountStopped();
  }
  function fx(e) {
    oe !== null && typeof oe.markComponentPassiveEffectUnmountStarted == "function" && oe.markComponentPassiveEffectUnmountStarted(e);
  }
  function dx() {
    oe !== null && typeof oe.markComponentPassiveEffectUnmountStopped == "function" && oe.markComponentPassiveEffectUnmountStopped();
  }
  function px(e) {
    oe !== null && typeof oe.markComponentLayoutEffectMountStarted == "function" && oe.markComponentLayoutEffectMountStarted(e);
  }
  function mx() {
    oe !== null && typeof oe.markComponentLayoutEffectMountStopped == "function" && oe.markComponentLayoutEffectMountStopped();
  }
  function wh(e) {
    oe !== null && typeof oe.markComponentLayoutEffectUnmountStarted == "function" && oe.markComponentLayoutEffectUnmountStarted(e);
  }
  function _h() {
    oe !== null && typeof oe.markComponentLayoutEffectUnmountStopped == "function" && oe.markComponentLayoutEffectUnmountStopped();
  }
  function vx(e, t, n) {
    oe !== null && typeof oe.markComponentErrored == "function" && oe.markComponentErrored(e, t, n);
  }
  function hx(e, t, n) {
    oe !== null && typeof oe.markComponentSuspended == "function" && oe.markComponentSuspended(e, t, n);
  }
  function gx(e) {
    oe !== null && typeof oe.markLayoutEffectsStarted == "function" && oe.markLayoutEffectsStarted(e);
  }
  function yx() {
    oe !== null && typeof oe.markLayoutEffectsStopped == "function" && oe.markLayoutEffectsStopped();
  }
  function bx(e) {
    oe !== null && typeof oe.markPassiveEffectsStarted == "function" && oe.markPassiveEffectsStarted(e);
  }
  function Nx() {
    oe !== null && typeof oe.markPassiveEffectsStopped == "function" && oe.markPassiveEffectsStopped();
  }
  function Oh(e) {
    oe !== null && typeof oe.markRenderStarted == "function" && oe.markRenderStarted(e);
  }
  function Ex() {
    oe !== null && typeof oe.markRenderYielded == "function" && oe.markRenderYielded();
  }
  function Lh() {
    oe !== null && typeof oe.markRenderStopped == "function" && oe.markRenderStopped();
  }
  function Sx(e) {
    oe !== null && typeof oe.markRenderScheduled == "function" && oe.markRenderScheduled(e);
  }
  function xx(e, t) {
    oe !== null && typeof oe.markForceUpdateScheduled == "function" && oe.markForceUpdateScheduled(e, t);
  }
  function ad(e, t) {
    oe !== null && typeof oe.markStateUpdateScheduled == "function" && oe.markStateUpdateScheduled(e, t);
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
  var rd = 31, q = (
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
  ), Lo = (
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
  ), ud = (
    /*                        */
    1024
  ), sd = (
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
  ), Rs = (
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
  ), Ah = Nl, Ao = (
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
      if (e & Lo)
        return "TransitionHydration";
      if (e & bl)
        return "Transition";
      if (e & Rs)
        return "Retry";
      if (e & Ao)
        return "SelectiveHydration";
      if (e & Vo)
        return "IdleHydration";
      if (e & _i)
        return "Idle";
      if (e & Gn)
        return "Offscreen";
    }
  }
  var st = -1, Cs = Mo, Ds = Nl;
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
      case Lo:
        return Lo;
      case Mo:
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
      case yd:
      case bd:
        return e & bl;
      case Nl:
      case Nd:
      case Ed:
      case Sd:
      case xd:
        return e & Rs;
      case Ao:
        return Ao;
      case Vo:
        return Vo;
      case _i:
        return _i;
      case Gn:
        return Gn;
      default:
        return c("Should have found matching lanes. This is a bug in React."), e;
    }
  }
  function Ts(e, t) {
    var n = e.pendingLanes;
    if (n === q)
      return q;
    var a = q, r = e.suspendedLanes, i = e.pingedLanes, l = n & Vh;
    if (l !== q) {
      var u = l & ~r;
      if (u !== q)
        a = ko(u);
      else {
        var s = l & i;
        s !== q && (a = ko(s));
      }
    } else {
      var v = n & ~r;
      v !== q ? a = ko(v) : i !== q && (a = ko(i));
    }
    if (a === q)
      return q;
    if (t !== q && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === q) {
      var h = Oi(a), x = Oi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        h >= x || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        h === qa && (x & bl) !== q
      )
        return t;
    }
    (a & hr) !== q && (a |= n & qa);
    var S = e.entangledLanes;
    if (S !== q)
      for (var O = e.entanglements, V = a & S; V > 0; ) {
        var H = Li(V), re = 1 << H;
        a |= O[H], V &= ~re;
      }
    return a;
  }
  function jx(e, t) {
    for (var n = e.eventTimes, a = st; t > 0; ) {
      var r = Li(t), i = 1 << r, l = n[r];
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
      case Lo:
      case Mo:
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
      case yd:
      case bd:
        return t + 5e3;
      case Nl:
      case Nd:
      case Ed:
      case Sd:
      case xd:
        return st;
      case Ao:
      case Vo:
      case _i:
      case Gn:
        return st;
      default:
        return c("Should have found matching lanes. This is a bug in React."), st;
    }
  }
  function _x(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Li(l), s = 1 << u, v = i[u];
      v === st ? ((s & a) === q || (s & r) !== q) && (i[u] = wx(s, t)) : v <= t && (e.expiredLanes |= s), l &= ~s;
    }
  }
  function Ox(e) {
    return ko(e.pendingLanes);
  }
  function Rd(e) {
    var t = e.pendingLanes & ~Gn;
    return t !== q ? t : t & Gn ? Gn : q;
  }
  function Lx(e) {
    return (e & je) !== q;
  }
  function Cd(e) {
    return (e & Vh) !== q;
  }
  function kh(e) {
    return (e & Rs) === e;
  }
  function Mx(e) {
    var t = je | hr | qa;
    return (e & t) === q;
  }
  function Ax(e) {
    return (e & bl) === e;
  }
  function js(e, t) {
    var n = yl | hr | wi | qa;
    return (t & n) !== q;
  }
  function Vx(e, t) {
    return (t & e.expiredLanes) !== q;
  }
  function Uh(e) {
    return (e & bl) !== q;
  }
  function Fh() {
    var e = Cs;
    return Cs <<= 1, (Cs & bl) === q && (Cs = Mo), e;
  }
  function kx() {
    var e = Ds;
    return Ds <<= 1, (Ds & Rs) === q && (Ds = Nl), e;
  }
  function Oi(e) {
    return e & -e;
  }
  function Uo(e) {
    return Oi(e);
  }
  function Li(e) {
    return 31 - Mh(e);
  }
  function Dd(e) {
    return Li(e);
  }
  function Wn(e, t) {
    return (e & t) !== q;
  }
  function El(e, t) {
    return (e & t) === t;
  }
  function ke(e, t) {
    return e | t;
  }
  function ws(e, t) {
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
    e.pendingLanes |= t, t !== _i && (e.suspendedLanes = q, e.pingedLanes = q);
    var a = e.eventTimes, r = Dd(t);
    a[r] = n;
  }
  function Fx(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = Li(a), i = 1 << r;
      n[r] = st, a &= ~i;
    }
  }
  function Hh(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function zx(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = q, e.pingedLanes = q, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Li(l), s = 1 << u;
      a[u] = q, r[u] = st, i[u] = st, l &= ~s;
    }
  }
  function jd(e, t) {
    for (var n = e.entangledLanes |= t, a = e.entanglements, r = n; r; ) {
      var i = Li(r), l = 1 << i;
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
      case yd:
      case bd:
      case Nl:
      case Nd:
      case Ed:
      case Sd:
      case xd:
        a = Lo;
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
        l.size > 0 && (l.forEach(function(u) {
          var s = u.alternate;
          (s === null || !a.has(s)) && a.add(u);
        }), l.clear()), t &= ~i;
      }
  }
  function $h(e, t) {
    return null;
  }
  var Kn = je, gr = hr, yr = qa, _s = _i, zo = Wt;
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
    return wd(Kn, t) ? wd(gr, t) ? Cd(t) ? yr : _s : gr : Kn;
  }
  function Os(e) {
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
  var Od = !1, Ls = [], Hr = null, Pr = null, Br = null, Ho = /* @__PURE__ */ new Map(), Po = /* @__PURE__ */ new Map(), $r = [], Qx = [
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
        var u = qr(t);
        u !== null && _d(u);
      }
      return l;
    }
    e.eventSystemFlags |= a;
    var s = e.targetContainers;
    return r !== null && s.indexOf(r) === -1 && s.push(r), e;
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
        var u = r;
        return Br = Bo(Br, e, t, n, a, u), !0;
      }
      case "pointerover": {
        var s = r, v = s.pointerId;
        return Ho.set(v, Bo(Ho.get(v) || null, e, t, n, a, s)), !0;
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
          if (Os(i)) {
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
  function Ms(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = Ad(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
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
    Ms(e) && n.delete(t);
  }
  function tR() {
    Od = !1, Hr !== null && Ms(Hr) && (Hr = null), Pr !== null && Ms(Pr) && (Pr = null), Br !== null && Ms(Br) && (Br = null), Ho.forEach(Xh), Po.forEach(Xh);
  }
  function $o(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Od || (Od = !0, d.unstable_scheduleCallback(d.unstable_NormalPriority, tR)));
  }
  function Yo(e) {
    if (Ls.length > 0) {
      $o(Ls[0], e);
      for (var t = 1; t < Ls.length; t++) {
        var n = Ls[t];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    Hr !== null && $o(Hr, e), Pr !== null && $o(Pr, e), Br !== null && $o(Br, e);
    var a = function(u) {
      return $o(u, e);
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
  var Sl = m.ReactCurrentBatchConfig, Ld = !0;
  function Jh(e) {
    Ld = !!e;
  }
  function nR() {
    return Ld;
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
    Ld && lR(e, t, n, a);
  }
  function lR(e, t, n, a) {
    var r = Ad(e, t, n, a);
    if (r === null) {
      Wd(e, t, a, As, n), Kh(e, a);
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
        var l = Ad(e, t, n, a);
        if (l === null && Wd(e, t, a, As, n), l === r)
          break;
        r = l;
      }
      r !== null && a.stopPropagation();
      return;
    }
    Wd(e, t, a, null, n);
  }
  var As = null;
  function Ad(e, t, n, a) {
    As = null;
    var r = Hf(a), i = Vi(r);
    if (i !== null) {
      var l = Ti(i);
      if (l === null)
        i = null;
      else {
        var u = l.tag;
        if (u === F) {
          var s = Nh(l);
          if (s !== null)
            return s;
          i = null;
        } else if (u === D) {
          var v = l.stateNode;
          if (Os(v))
            return Eh(l);
          i = null;
        } else l !== i && (i = null);
      }
    }
    return As = i, null;
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
          case xs:
            return Kn;
          case td:
            return gr;
          case ji:
          case JS:
            return yr;
          case nd:
            return _s;
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
  function uR(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function sR(e, t, n, a) {
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
    var u = a > 1 ? 1 - a : void 0;
    return qo = r.slice(e, u), qo;
  }
  function tg() {
    return "value" in Io ? Io.value : Io.textContent;
  }
  function Vs(e) {
    var t, n = e.keyCode;
    return "charCode" in e ? (t = e.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
  }
  function ks() {
    return !0;
  }
  function ng() {
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
      return v ? this.isDefaultPrevented = ks : this.isDefaultPrevented = ng, this.isPropagationStopped = ng, this;
    }
    return ze(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = ks);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = ks);
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
      isPersistent: ks
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
  var Us = ze({}, Go, {
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
  }), ag = Qn(Us), vR = ze({}, Us, {
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
      var n = Vs(e);
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
      return e.type === "keypress" ? Vs(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Vs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), _R = Qn(wR), OR = ze({}, Us, {
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
  }), ig = Qn(OR), LR = ze({}, Go, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Hd
  }), MR = Qn(LR), AR = ze({}, xl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), VR = Qn(AR), kR = ze({}, Us, {
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
  var zR = tn && "TextEvent" in window && !Ko, og = tn && (!Pd || Ko && Ko > 8 && Ko <= 11), ug = 32, sg = String.fromCharCode(ug);
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
    var u = Bs(n, i);
    if (u.length > 0) {
      var s = new rg(i, t, null, a, r);
      if (e.push({
        event: s,
        listeners: u
      }), l)
        s.data = l;
      else {
        var v = dg(a);
        v !== null && (s.data = v);
      }
    }
  }
  function IR(e, t) {
    switch (e) {
      case "compositionend":
        return dg(t);
      case "keypress":
        var n = t.which;
        return n !== ug ? null : (cg = !0, sg);
      case "textInput":
        var a = t.data;
        return a === sg && cg ? null : a;
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
    var l = Bs(n, "onBeforeInput");
    if (l.length > 0) {
      var u = new xR("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: u,
        listeners: l
      }), u.data = i;
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
    var r = Bs(t, "onChange");
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
  function Fs(e) {
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
    e.propertyName === "value" && Fs(Xo) && ZR(e);
  }
  function a0(e, t, n) {
    e === "focusin" ? (gg(), n0(t, n)) : e === "focusout" && gg();
  }
  function r0(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Fs(Xo);
  }
  function i0(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function l0(e, t) {
    if (e === "click")
      return Fs(t);
  }
  function o0(e, t) {
    if (e === "input" || e === "change")
      return Fs(t);
  }
  function u0(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || Re(e, "number", e.value);
  }
  function s0(e, t, n, a, r, i, l) {
    var u = n ? _l(n) : window, s, v;
    if (JR(u) ? s = t0 : mg(u) ? hg ? s = o0 : (s = r0, v = a0) : i0(u) && (s = l0), s) {
      var h = s(t, n);
      if (h) {
        vg(e, h, a, r);
        return;
      }
    }
    v && v(t, u, n), t === "focusout" && u0(u);
  }
  function c0() {
    en("onMouseEnter", ["mouseout", "mouseover"]), en("onMouseLeave", ["mouseout", "mouseover"]), en("onPointerEnter", ["pointerout", "pointerover"]), en("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function f0(e, t, n, a, r, i, l) {
    var u = t === "mouseover" || t === "pointerover", s = t === "mouseout" || t === "pointerout";
    if (u && !wS(a)) {
      var v = a.relatedTarget || a.fromElement;
      if (v && (Vi(v) || du(v)))
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
        var V = a.relatedTarget || a.toElement;
        if (S = n, O = V ? Vi(V) : null, O !== null) {
          var H = Ti(O);
          (O !== H || O.tag !== k && O.tag !== B) && (O = null);
        }
      } else
        S = null, O = n;
      if (S !== O) {
        var re = ag, Ee = "onMouseLeave", he = "onMouseEnter", qe = "mouse";
        (t === "pointerout" || t === "pointerover") && (re = ig, Ee = "onPointerLeave", he = "onPointerEnter", qe = "pointer");
        var Pe = S == null ? h : _l(S), j = O == null ? h : _l(O), P = new re(Ee, qe + "leave", S, a, r);
        P.target = Pe, P.relatedTarget = j;
        var w = null, Q = Vi(r);
        if (Q === n) {
          var fe = new re(he, qe + "enter", O, a, r);
          fe.target = j, fe.relatedTarget = Pe, w = fe;
        }
        V0(e, P, w, S, O);
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
    var r = a.anchorNode, i = a.anchorOffset, l = a.focusNode, u = a.focusOffset;
    try {
      r.nodeType, l.nodeType;
    } catch {
      return null;
    }
    return v0(e, r, i, l, u);
  }
  function v0(e, t, n, a, r) {
    var i = 0, l = -1, u = -1, s = 0, v = 0, h = e, x = null;
    e: for (; ; ) {
      for (var S = null; h === t && (n === 0 || h.nodeType === fr) && (l = i + n), h === a && (r === 0 || h.nodeType === fr) && (u = i + r), h.nodeType === fr && (i += h.nodeValue.length), (S = h.firstChild) !== null; )
        x = h, h = S;
      for (; ; ) {
        if (h === e)
          break e;
        if (x === t && ++s === n && (l = i), x === a && ++v === r && (u = i), (S = h.nextSibling) !== null)
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
  function h0(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, l = Math.min(t.start, i), u = t.end === void 0 ? l : Math.min(t.end, i);
      if (!r.extend && l > u) {
        var s = u;
        u = l, l = s;
      }
      var v = Ng(e, l), h = Ng(e, u);
      if (v && h) {
        if (r.rangeCount === 1 && r.anchorNode === v.node && r.anchorOffset === v.offset && r.focusNode === h.node && r.focusOffset === h.offset)
          return;
        var x = n.createRange();
        x.setStart(v.node, v.offset), r.removeAllRanges(), l > u ? (r.addRange(x), r.extend(h.node, h.offset)) : (x.setEnd(h.node, h.offset), r.addRange(x));
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
    for (var e = window, t = ur(); t instanceof e.HTMLIFrameElement; ) {
      if (y0(t))
        e = t.contentWindow;
      else
        return t;
      t = ur(e.document);
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
        var u = r[l];
        u.element.scrollLeft = u.left, u.element.scrollTop = u.top;
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
    if (!(Yd || Cl == null || Cl !== ur(a))) {
      var r = C0(Cl);
      if (!Zo || !Jo(Zo, r)) {
        Zo = r;
        var i = Bs($d, "onSelect");
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
    var u = n ? _l(n) : window;
    switch (t) {
      case "focusin":
        (mg(u) || u.contentEditable === "true") && (Cl = u, $d = n, Zo = null);
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
  function zs(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Dl = {
    animationend: zs("Animation", "AnimationEnd"),
    animationiteration: zs("Animation", "AnimationIteration"),
    animationstart: zs("Animation", "AnimationStart"),
    transitionend: zs("Transition", "TransitionEnd")
  }, Id = {}, Cg = {};
  tn && (Cg = document.createElement("div").style, "AnimationEvent" in window || (delete Dl.animationend.animation, delete Dl.animationiteration.animation, delete Dl.animationstart.animation), "TransitionEvent" in window || delete Dl.transitionend.transition);
  function Hs(e) {
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
  var Dg = Hs("animationend"), Tg = Hs("animationiteration"), jg = Hs("animationstart"), wg = Hs("transitionend"), _g = /* @__PURE__ */ new Map(), Og = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
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
    var u = _g.get(t);
    if (u !== void 0) {
      var s = kd, v = t;
      switch (t) {
        case "keypress":
          if (Vs(a) === 0)
            return;
        case "keydown":
        case "keyup":
          s = _R;
          break;
        case "focusin":
          v = "focus", s = zd;
          break;
        case "focusout":
          v = "blur", s = zd;
          break;
        case "beforeblur":
        case "afterblur":
          s = zd;
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
          s = ag;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          s = hR;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          s = MR;
          break;
        case Dg:
        case Tg:
        case jg:
          s = bR;
          break;
        case wg:
          s = VR;
          break;
        case "scroll":
          s = pR;
          break;
        case "wheel":
          s = UR;
          break;
        case "copy":
        case "cut":
        case "paste":
          s = ER;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          s = ig;
          break;
      }
      var h = (i & Co) !== 0;
      {
        var x = !h && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", S = M0(n, u, a.type, h, x);
        if (S.length > 0) {
          var O = new s(u, v, null, a, r);
          e.push({
            event: O,
            listeners: S
          });
        }
      }
    }
  }
  j0(), c0(), XR(), R0(), HR();
  function _0(e, t, n, a, r, i, l) {
    w0(e, t, n, a, r, i);
    var u = (i & DS) === 0;
    u && (f0(e, t, n, a, r), s0(e, t, n, a, r), T0(e, t, n, a, r), WR(e, t, n, a, r));
  }
  var eu = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], qd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(eu));
  function Lg(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, FS(a, t, void 0, e), e.currentTarget = null;
  }
  function O0(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, u = i.currentTarget, s = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        Lg(e, s, u), a = l;
      }
    else
      for (var v = 0; v < t.length; v++) {
        var h = t[v], x = h.instance, S = h.currentTarget, O = h.listener;
        if (x !== a && e.isPropagationStopped())
          return;
        Lg(e, O, S), a = x;
      }
  }
  function Mg(e, t) {
    for (var n = (t & Co) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      O0(i, l, n);
    }
    zS();
  }
  function L0(e, t, n, a, r) {
    var i = Hf(n), l = [];
    _0(l, e, a, n, i, t), Mg(l, t);
  }
  function pt(e, t) {
    qd.has(e) || c('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = uD(t), r = k0(e);
    a.has(r) || (Ag(t, e, zf, n), a.add(r));
  }
  function Gd(e, t, n) {
    qd.has(e) && !t && c('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= Co), Ag(n, e, a, t);
  }
  var Ps = "_reactListening" + Math.random().toString(36).slice(2);
  function tu(e) {
    if (!e[Ps]) {
      e[Ps] = !0, na.forEach(function(n) {
        n !== "selectionchange" && (qd.has(n) || Gd(n, !1, e), Gd(n, !0, e));
      });
      var t = e.nodeType === dr ? e : e.ownerDocument;
      t !== null && (t[Ps] || (t[Ps] = !0, Gd("selectionchange", !1, t)));
    }
  }
  function Ag(e, t, n, a, r) {
    var i = aR(e, t, n), l = void 0;
    $f && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? sR(e, t, i, l) : uR(e, t, i) : l !== void 0 ? cR(e, t, i, l) : oR(e, t, i);
  }
  function Vg(e, t) {
    return e === t || e.nodeType === jt && e.parentNode === t;
  }
  function Wd(e, t, n, a, r) {
    var i = a;
    if (!(t & sh) && !(t & zf)) {
      var l = r;
      if (a !== null) {
        var u = a;
        e: for (; ; ) {
          if (u === null)
            return;
          var s = u.tag;
          if (s === D || s === _) {
            var v = u.stateNode.containerInfo;
            if (Vg(v, l))
              break;
            if (s === _)
              for (var h = u.return; h !== null; ) {
                var x = h.tag;
                if (x === D || x === _) {
                  var S = h.stateNode.containerInfo;
                  if (Vg(S, l))
                    return;
                }
                h = h.return;
              }
            for (; v !== null; ) {
              var O = Vi(v);
              if (O === null)
                return;
              var V = O.tag;
              if (V === k || V === B) {
                u = i = O;
                continue e;
              }
              v = v.parentNode;
            }
          }
          u = u.return;
        }
      }
    }
    vh(function() {
      return L0(e, t, n, i);
    });
  }
  function nu(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function M0(e, t, n, a, r, i) {
    for (var l = t !== null ? t + "Capture" : null, u = a ? l : t, s = [], v = e, h = null; v !== null; ) {
      var x = v, S = x.stateNode, O = x.tag;
      if (O === k && S !== null && (h = S, u !== null)) {
        var V = To(v, u);
        V != null && s.push(nu(v, V, h));
      }
      if (r)
        break;
      v = v.return;
    }
    return s;
  }
  function Bs(e, t) {
    for (var n = t + "Capture", a = [], r = e; r !== null; ) {
      var i = r, l = i.stateNode, u = i.tag;
      if (u === k && l !== null) {
        var s = l, v = To(r, n);
        v != null && a.unshift(nu(r, v, s));
        var h = To(r, t);
        h != null && a.push(nu(r, h, s));
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
  function A0(e, t) {
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
  function kg(e, t, n, a, r) {
    for (var i = t._reactName, l = [], u = n; u !== null && u !== a; ) {
      var s = u, v = s.alternate, h = s.stateNode, x = s.tag;
      if (v !== null && v === a)
        break;
      if (x === k && h !== null) {
        var S = h;
        if (r) {
          var O = To(u, i);
          O != null && l.unshift(nu(u, O, S));
        } else if (!r) {
          var V = To(u, i);
          V != null && l.push(nu(u, V, S));
        }
      }
      u = u.return;
    }
    l.length !== 0 && e.push({
      event: t,
      listeners: l
    });
  }
  function V0(e, t, n, a, r) {
    var i = a && r ? A0(a, r) : null;
    a !== null && kg(e, t, a, i, !1), r !== null && n !== null && kg(e, n, r, i, !0);
  }
  function k0(e, t) {
    return e + "__bubble";
  }
  var Hn = !1, au = "dangerouslySetInnerHTML", $s = "suppressContentEditableWarning", Ir = "suppressHydrationWarning", Ug = "autoFocus", Mi = "children", Ai = "style", Ys = "__html", Kd, Is, ru, Fg, qs, zg, Hg;
  Kd = {
    // There are working polyfills for <dialog>. Let people use it.
    dialog: !0,
    // Electron ships a custom <webview> tag to display external web content in
    // an isolated frame and process.
    // This tag is not present in non Electron environments such as JSDom which
    // is often used for testing purposes.
    // @see https://electronjs.org/docs/api/webview-tag
    webview: !0
  }, Is = function(e, t) {
    bS(e, t), NS(e, t), CS(e, t, {
      registrationNameDependencies: Dt,
      possibleRegistrationNames: Jt
    });
  }, zg = tn && !document.documentMode, ru = function(e, t, n) {
    if (!Hn) {
      var a = Gs(n), r = Gs(t);
      r !== a && (Hn = !0, c("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Fg = function(e) {
    if (!Hn) {
      Hn = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), c("Extra attributes from the server: %s", t);
    }
  }, qs = function(e, t) {
    t === !1 ? c("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : c("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, Hg = function(e, t) {
    var n = e.namespaceURI === cr ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return n.innerHTML = t, n.innerHTML;
  };
  var U0 = /\r\n?/g, F0 = /\u0000|\uFFFD/g;
  function Gs(e) {
    Un(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(U0, `
`).replace(F0, "");
  }
  function Ws(e, t, n, a) {
    var r = Gs(t), i = Gs(e);
    if (i !== r && (a && (Hn || (Hn = !0, c('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && ge))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Pg(e) {
    return e.nodeType === dr ? e : e.ownerDocument;
  }
  function z0() {
  }
  function Ks(e) {
    e.onclick = z0;
  }
  function H0(e, t, n, a, r) {
    for (var i in a)
      if (a.hasOwnProperty(i)) {
        var l = a[i];
        if (i === Ai)
          l && Object.freeze(l), ah(t, l);
        else if (i === au) {
          var u = l ? l[Ys] : void 0;
          u != null && Jv(t, u);
        } else if (i === Mi)
          if (typeof l == "string") {
            var s = e !== "textarea" || l !== "";
            s && ys(t, l);
          } else typeof l == "number" && ys(t, "" + l);
        else i === $s || i === Ir || i === Ug || (Dt.hasOwnProperty(i) ? l != null && (typeof l != "function" && qs(i, l), i === "onScroll" && pt("scroll", t)) : l != null && Na(t, i, l, r));
      }
  }
  function P0(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Ai ? ah(e, l) : i === au ? Jv(e, l) : i === Mi ? ys(e, l) : Na(e, i, l, a);
    }
  }
  function B0(e, t, n, a) {
    var r, i = Pg(n), l, u = a;
    if (u === cr && (u = Mf(e)), u === cr) {
      if (r = Si(e, t), !r && e !== e.toLowerCase() && c("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
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
    return u === cr && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !kn.call(Kd, e) && (Kd[e] = !0, c("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function $0(e, t) {
    return Pg(t).createTextNode(e);
  }
  function Y0(e, t, n, a) {
    var r = Si(t, n);
    Is(t, n);
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
        for (var l = 0; l < eu.length; l++)
          pt(eu[l], e);
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
        vs(e, n), i = No(e, n), pt("invalid", e);
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
        Ni(e), A(e, n, !1);
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
        typeof i.onClick == "function" && Ks(e);
        break;
    }
  }
  function I0(e, t, n, a, r) {
    Is(t, a);
    var i = null, l, u;
    switch (t) {
      case "input":
        l = No(e, n), u = No(e, a), i = [];
        break;
      case "select":
        l = So(e, n), u = So(e, a), i = [];
        break;
      case "textarea":
        l = Of(e, n), u = Of(e, a), i = [];
        break;
      default:
        l = n, u = a, typeof l.onClick != "function" && typeof u.onClick == "function" && Ks(e);
        break;
    }
    Ff(t, u);
    var s, v, h = null;
    for (s in l)
      if (!(u.hasOwnProperty(s) || !l.hasOwnProperty(s) || l[s] == null))
        if (s === Ai) {
          var x = l[s];
          for (v in x)
            x.hasOwnProperty(v) && (h || (h = {}), h[v] = "");
        } else s === au || s === Mi || s === $s || s === Ir || s === Ug || (Dt.hasOwnProperty(s) ? i || (i = []) : (i = i || []).push(s, null));
    for (s in u) {
      var S = u[s], O = l != null ? l[s] : void 0;
      if (!(!u.hasOwnProperty(s) || S === O || S == null && O == null))
        if (s === Ai)
          if (S && Object.freeze(S), O) {
            for (v in O)
              O.hasOwnProperty(v) && (!S || !S.hasOwnProperty(v)) && (h || (h = {}), h[v] = "");
            for (v in S)
              S.hasOwnProperty(v) && O[v] !== S[v] && (h || (h = {}), h[v] = S[v]);
          } else
            h || (i || (i = []), i.push(s, h)), h = S;
        else if (s === au) {
          var V = S ? S[Ys] : void 0, H = O ? O[Ys] : void 0;
          V != null && H !== V && (i = i || []).push(s, V);
        } else s === Mi ? (typeof S == "string" || typeof S == "number") && (i = i || []).push(s, "" + S) : s === $s || s === Ir || (Dt.hasOwnProperty(s) ? (S != null && (typeof S != "function" && qs(s, S), s === "onScroll" && pt("scroll", e)), !i && O !== S && (i = [])) : (i = i || []).push(s, S));
    }
    return h && (fS(h, u[Ai]), (i = i || []).push(Ai, h)), i;
  }
  function q0(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && f(e, r);
    var i = Si(n, a), l = Si(n, r);
    switch (P0(e, t, i, l), n) {
      case "input":
        b(e, r);
        break;
      case "textarea":
        Qv(e, r);
        break;
      case "select":
        hs(e, r);
        break;
    }
  }
  function G0(e) {
    {
      var t = e.toLowerCase();
      return bs.hasOwnProperty(t) && bs[t] || null;
    }
  }
  function W0(e, t, n, a, r, i, l) {
    var u, s;
    switch (u = Si(t, n), Is(t, n), t) {
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
        for (var v = 0; v < eu.length; v++)
          pt(eu[v], e);
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
        vs(e, n), pt("invalid", e);
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
    for (var V in n)
      if (n.hasOwnProperty(V)) {
        var H = n[V];
        if (V === Mi)
          typeof H == "string" ? e.textContent !== H && (n[Ir] !== !0 && Ws(e.textContent, H, i, l), O = [Mi, H]) : typeof H == "number" && e.textContent !== "" + H && (n[Ir] !== !0 && Ws(e.textContent, H, i, l), O = [Mi, "" + H]);
        else if (Dt.hasOwnProperty(V))
          H != null && (typeof H != "function" && qs(V, H), V === "onScroll" && pt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof u == "boolean") {
          var re = void 0, Ee = Nt(V);
          if (n[Ir] !== !0) {
            if (!(V === $s || V === Ir || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            V === "value" || V === "checked" || V === "selected")) {
              if (V === au) {
                var he = e.innerHTML, qe = H ? H[Ys] : void 0;
                if (qe != null) {
                  var Pe = Hg(e, qe);
                  Pe !== he && ru(V, he, Pe);
                }
              } else if (V === Ai) {
                if (s.delete(V), zg) {
                  var j = sS(H);
                  re = e.getAttribute("style"), j !== re && ru(V, re, j);
                }
              } else if (u && !xn)
                s.delete(V.toLowerCase()), re = di(e, V, H), H !== re && ru(V, re, H);
              else if (!gt(V, Ee, u) && !vn(V, H, Ee, u)) {
                var P = !1;
                if (Ee !== null)
                  s.delete(Ee.attributeName), re = Zi(e, V, H, Ee);
                else {
                  var w = a;
                  if (w === cr && (w = Mf(t)), w === cr)
                    s.delete(V.toLowerCase());
                  else {
                    var Q = G0(V);
                    Q !== null && Q !== V && (P = !0, s.delete(Q)), s.delete(V);
                  }
                  re = di(e, V, H);
                }
                var fe = xn;
                !fe && H !== re && !P && ru(V, re, H);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    s.size > 0 && n[Ir] !== !0 && Fg(s), t) {
      case "input":
        Ni(e), A(e, n, !0);
        break;
      case "textarea":
        Ni(e), Xv(e);
        break;
      case "select":
      case "option":
        break;
      default:
        typeof n.onClick == "function" && Ks(e);
        break;
    }
    return O;
  }
  function K0(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function Qd(e, t) {
    {
      if (Hn)
        return;
      Hn = !0, c("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function Xd(e, t) {
    {
      if (Hn)
        return;
      Hn = !0, c('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function Jd(e, t, n) {
    {
      if (Hn)
        return;
      Hn = !0, c("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Zd(e, t) {
    {
      if (t === "" || Hn)
        return;
      Hn = !0, c('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
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
  var iu = function() {
  }, lu = function() {
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
    lu = function(e, t) {
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
    iu = function(e, t, n) {
      n = n || $g;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && c("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = eC(e, r) ? null : a, l = i ? null : tC(e, n), u = i || l;
      if (u) {
        var s = u.tag, v = !!i + "|" + e + "|" + s;
        if (!Yg[v]) {
          Yg[v] = !0;
          var h = e, x = "";
          if (e === "#text" ? /\S/.test(t) ? h = "Text nodes" : (h = "Whitespace text nodes", x = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : h = "<" + e + ">", i) {
            var S = "";
            s === "table" && e === "tr" && (S += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), c("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", h, s, x, S);
          } else
            c("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", h, s);
        }
      }
    };
  }
  var Qs = "suppressHydrationWarning", Xs = "$", Js = "/$", ou = "$?", uu = "$!", nC = "style", ep = null, tp = null;
  function aC(e) {
    var t, n, a = e.nodeType;
    switch (a) {
      case dr:
      case Vf: {
        t = a === dr ? "#document" : "#fragment";
        var r = e.documentElement;
        n = r ? r.namespaceURI : Af(null, "");
        break;
      }
      default: {
        var i = a === jt ? e.parentNode : e, l = i.namespaceURI || null;
        t = i.tagName, n = Af(l, t);
        break;
      }
    }
    {
      var u = t.toLowerCase(), s = lu(null, u);
      return {
        namespace: n,
        ancestorInfo: s
      };
    }
  }
  function rC(e, t, n) {
    {
      var a = e, r = Af(a.namespace, t), i = lu(a.ancestorInfo, t);
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
      if (iu(e, null, l.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var u = "" + t.children, s = lu(l.ancestorInfo, e);
        iu(null, u, s);
      }
      i = l.namespace;
    }
    var v = B0(e, t, n, i);
    return fu(r, v), sp(v, t), v;
  }
  function uC(e, t) {
    e.appendChild(t);
  }
  function sC(e, t, n, a, r) {
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
        var u = "" + a.children, s = lu(l.ancestorInfo, t);
        iu(null, u, s);
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
      iu(null, e, r.ancestorInfo);
    }
    var i = $0(e, t);
    return fu(a, i), i;
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
    q0(e, t, n, a, r), sp(e, r);
  }
  function qg(e) {
    ys(e, "");
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
    a == null && n.onclick === null && Ks(n);
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
        if (i === Js)
          if (a === 0) {
            e.removeChild(r), Yo(t);
            return;
          } else
            a--;
        else (i === Xs || i === ou || i === uu) && a++;
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
  function LC(e, t) {
    return t === "" || e.nodeType !== fr ? null : e;
  }
  function MC(e) {
    return e.nodeType !== jt ? null : e;
  }
  function Gg(e) {
    return e.data === ou;
  }
  function lp(e) {
    return e.data === uu;
  }
  function AC(e) {
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
  function Zs(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === zn || t === fr)
        break;
      if (t === jt) {
        var n = e.data;
        if (n === Xs || n === uu || n === ou)
          break;
        if (n === Js)
          return null;
      }
    }
    return e;
  }
  function su(e) {
    return Zs(e.nextSibling);
  }
  function kC(e) {
    return Zs(e.firstChild);
  }
  function UC(e) {
    return Zs(e.firstChild);
  }
  function FC(e) {
    return Zs(e.nextSibling);
  }
  function zC(e, t, n, a, r, i, l) {
    fu(i, e), sp(e, n);
    var u;
    {
      var s = r;
      u = s.namespace;
    }
    var v = (i.mode & Ye) !== xe;
    return W0(e, t, n, u, a, v, l);
  }
  function HC(e, t, n, a) {
    return fu(n, e), n.mode & Ye, K0(e, t);
  }
  function PC(e, t) {
    fu(t, e);
  }
  function BC(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === jt) {
        var a = t.data;
        if (a === Js) {
          if (n === 0)
            return su(t);
          n--;
        } else (a === Xs || a === uu || a === ou) && n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Wg(e) {
    for (var t = e.previousSibling, n = 0; t; ) {
      if (t.nodeType === jt) {
        var a = t.data;
        if (a === Xs || a === uu || a === ou) {
          if (n === 0)
            return t;
          n--;
        } else a === Js && n++;
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
    Ws(t.nodeValue, n, a, r);
  }
  function GC(e, t, n, a, r, i) {
    if (t[Qs] !== !0) {
      var l = !0;
      Ws(a.nodeValue, r, i, l);
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
    (r || t[Qs] !== !0) && (a.nodeType === zn ? Qd(n, a) : a.nodeType === jt || Xd(n, a));
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
    (i || t[Qs] !== !0) && Jd(n, a);
  }
  function nD(e, t, n, a, r) {
    (r || t[Qs] !== !0) && Zd(n, a);
  }
  function aD(e) {
    c("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function rD(e) {
    tu(e);
  }
  var jl = Math.random().toString(36).slice(2), wl = "__reactFiber$" + jl, op = "__reactProps$" + jl, cu = "__reactContainer$" + jl, up = "__reactEvents$" + jl, iD = "__reactListeners$" + jl, lD = "__reactHandles$" + jl;
  function oD(e) {
    delete e[wl], delete e[op], delete e[up], delete e[iD], delete e[lD];
  }
  function fu(e, t) {
    t[wl] = e;
  }
  function ec(e, t) {
    t[cu] = e;
  }
  function Kg(e) {
    e[cu] = null;
  }
  function du(e) {
    return !!e[cu];
  }
  function Vi(e) {
    var t = e[wl];
    if (t)
      return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[cu] || n[wl], t) {
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
    var t = e[wl] || e[cu];
    return t && (t.tag === k || t.tag === B || t.tag === F || t.tag === D) ? t : null;
  }
  function _l(e) {
    if (e.tag === k || e.tag === B)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function tc(e) {
    return e[op] || null;
  }
  function sp(e, t) {
    e[op] = t;
  }
  function uD(e) {
    var t = e[up];
    return t === void 0 && (t = e[up] = /* @__PURE__ */ new Set()), t;
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
          u && !(u instanceof Error) && (nc(r), c("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, l, typeof u), nc(null)), u instanceof Error && !(u.message in Qg) && (Qg[u.message] = !0, nc(r), c("Failed %s type: %s", n, u.message), nc(null));
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
      c("Unexpected pop.");
      return;
    }
    t !== ac[br] && c("Unexpected Fiber popped."), e.current = cp[br], cp[br] = null, ac[br] = null, br--;
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
        var u = Me(e) || "Unknown";
        Da(a, i, "context", u);
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
          fp[i] || (fp[i] = !0, c("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var u in l)
        if (!(u in r))
          throw new Error((Me(e) || "Unknown") + '.getChildContext(): key "' + u + '" is not defined in childContextTypes.');
      {
        var s = Me(e) || "Unknown";
        Da(r, l, "child context", s);
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
  function sD(e) {
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
        throw Er !== null && (Er = Er.slice(e + 1)), Th(xs, Kr), i;
      } finally {
        Kt(t), vp = !1;
      }
    }
    return null;
  }
  var Ml = [], Al = 0, uc = null, sc = 0, oa = [], ua = 0, ki = null, Sr = 1, xr = "";
  function fD(e) {
    return Fi(), (e.flags & bh) !== Ce;
  }
  function dD(e) {
    return Fi(), sc;
  }
  function pD() {
    var e = xr, t = Sr, n = t & ~mD(t);
    return n.toString(32) + e;
  }
  function Ui(e, t) {
    Fi(), Ml[Al++] = sc, Ml[Al++] = uc, uc = e, sc = t;
  }
  function ry(e, t, n) {
    Fi(), oa[ua++] = Sr, oa[ua++] = xr, oa[ua++] = ki, ki = e;
    var a = Sr, r = xr, i = cc(a) - 1, l = a & ~(1 << i), u = n + 1, s = cc(t) + i;
    if (s > 30) {
      var v = i - i % 5, h = (1 << v) - 1, x = (l & h).toString(32), S = l >> v, O = i - v, V = cc(t) + O, H = u << O, re = H | S, Ee = x + r;
      Sr = 1 << V | re, xr = Ee;
    } else {
      var he = u << i, qe = he | l, Pe = r;
      Sr = 1 << s | qe, xr = Pe;
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
    for (; e === uc; )
      uc = Ml[--Al], Ml[Al] = null, sc = Ml[--Al], Ml[Al] = null;
    for (; e === ki; )
      ki = oa[--ua], oa[ua] = null, xr = oa[--ua], oa[ua] = null, Sr = oa[--ua], oa[ua] = null;
  }
  function vD() {
    return Fi(), ki !== null ? {
      id: Sr,
      overflow: xr
    } : null;
  }
  function hD(e, t) {
    Fi(), oa[ua++] = Sr, oa[ua++] = xr, oa[ua++] = ki, Sr = t.id, xr = t.overflow, ki = e;
  }
  function Fi() {
    rn() || c("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var an = null, sa = null, Ta = !1, zi = !1, Qr = null;
  function gD() {
    Ta && c("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function iy() {
    zi = !0;
  }
  function yD() {
    return zi;
  }
  function bD(e) {
    var t = e.stateNode.containerInfo;
    return sa = UC(t), an = e, Ta = !0, Qr = null, zi = !1, !0;
  }
  function ND(e, t, n) {
    return sa = FC(t), an = e, Ta = !0, Qr = null, zi = !1, n !== null && hD(e, n), !0;
  }
  function ly(e, t) {
    switch (e.tag) {
      case D: {
        WC(e.stateNode.containerInfo, t);
        break;
      }
      case k: {
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
            case k:
              var a = t.type;
              t.pendingProps, XC(n, a);
              break;
            case B:
              var r = t.pendingProps;
              JC(n, r);
              break;
          }
          break;
        }
        case k: {
          var i = e.type, l = e.memoizedProps, u = e.stateNode;
          switch (t.tag) {
            case k: {
              var s = t.type, v = t.pendingProps, h = (e.mode & Ye) !== xe;
              tD(
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
            case B: {
              var x = t.pendingProps, S = (e.mode & Ye) !== xe;
              nD(
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
        case F: {
          var O = e.memoizedState, V = O.dehydrated;
          if (V !== null) switch (t.tag) {
            case k:
              var H = t.type;
              t.pendingProps, ZC(V, H);
              break;
            case B:
              var re = t.pendingProps;
              eD(V, re);
              break;
          }
          break;
        }
        default:
          return;
      }
    }
  }
  function uy(e, t) {
    t.flags = t.flags & ~mr | wt, yp(e, t);
  }
  function sy(e, t) {
    switch (e.tag) {
      case k: {
        var n = e.type;
        e.pendingProps;
        var a = OC(t, n);
        return a !== null ? (e.stateNode = a, an = e, sa = kC(a), !0) : !1;
      }
      case B: {
        var r = e.pendingProps, i = LC(t, r);
        return i !== null ? (e.stateNode = i, an = e, sa = null, !0) : !1;
      }
      case F: {
        var l = MC(t);
        if (l !== null) {
          var u = {
            dehydrated: l,
            treeContext: vD(),
            retryLane: Gn
          };
          e.memoizedState = u;
          var s = C1(l);
          return s.return = e, e.child = s, an = e, sa = null, !0;
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
      var t = sa;
      if (!t) {
        bp(e) && (yp(an, e), Np()), uy(an, e), Ta = !1, an = e;
        return;
      }
      var n = t;
      if (!sy(e, t)) {
        bp(e) && (yp(an, e), Np()), t = su(n);
        var a = an;
        if (!t || !sy(e, t)) {
          uy(an, e), Ta = !1, an = e;
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
          case k: {
            var u = r.type, s = r.memoizedProps, v = r.stateNode, h = (r.mode & Ye) !== xe;
            GC(
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
    for (var t = e.return; t !== null && t.tag !== k && t.tag !== D && t.tag !== F; )
      t = t.return;
    an = t;
  }
  function fc(e) {
    if (e !== an)
      return !1;
    if (!Ta)
      return cy(e), Ta = !0, !1;
    if (e.tag !== D && (e.tag !== k || IC(e.type) && !np(e.type, e.memoizedProps))) {
      var t = sa;
      if (t)
        if (bp(e))
          fy(e), Np();
        else
          for (; t; )
            oy(e, t), t = su(t);
    }
    return cy(e), e.tag === F ? sa = RD(e) : sa = an ? su(e.stateNode) : null, !0;
  }
  function CD() {
    return Ta && sa !== null;
  }
  function fy(e) {
    for (var t = sa; t; )
      ly(e, t), t = su(t);
  }
  function Vl() {
    an = null, sa = null, Ta = !1, zi = !1;
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
    }, pu = [], mu = [], vu = [], hu = [], gu = [], yu = [], Pi = /* @__PURE__ */ new Set();
    ja.recordUnsafeLifecycleWarnings = function(e, t) {
      Pi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && pu.push(e), e.mode & St && typeof t.UNSAFE_componentWillMount == "function" && mu.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && vu.push(e), e.mode & St && typeof t.UNSAFE_componentWillReceiveProps == "function" && hu.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && gu.push(e), e.mode & St && typeof t.UNSAFE_componentWillUpdate == "function" && yu.push(e));
    }, ja.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      pu.length > 0 && (pu.forEach(function(S) {
        e.add(Me(S) || "Component"), Pi.add(S.type);
      }), pu = []);
      var t = /* @__PURE__ */ new Set();
      mu.length > 0 && (mu.forEach(function(S) {
        t.add(Me(S) || "Component"), Pi.add(S.type);
      }), mu = []);
      var n = /* @__PURE__ */ new Set();
      vu.length > 0 && (vu.forEach(function(S) {
        n.add(Me(S) || "Component"), Pi.add(S.type);
      }), vu = []);
      var a = /* @__PURE__ */ new Set();
      hu.length > 0 && (hu.forEach(function(S) {
        a.add(Me(S) || "Component"), Pi.add(S.type);
      }), hu = []);
      var r = /* @__PURE__ */ new Set();
      gu.length > 0 && (gu.forEach(function(S) {
        r.add(Me(S) || "Component"), Pi.add(S.type);
      }), gu = []);
      var i = /* @__PURE__ */ new Set();
      if (yu.length > 0 && (yu.forEach(function(S) {
        i.add(Me(S) || "Component"), Pi.add(S.type);
      }), yu = []), t.size > 0) {
        var l = Hi(t);
        c(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, l);
      }
      if (a.size > 0) {
        var u = Hi(a);
        c(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, u);
      }
      if (i.size > 0) {
        var s = Hi(i);
        c(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, s);
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
        c("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
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
            mt(n), c(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r);
          } finally {
            It();
          }
        }
      });
    }, ja.discardPendingWarnings = function() {
      pu = [], mu = [], vu = [], hu = [], gu = [], yu = [], dc = /* @__PURE__ */ new Map();
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
      Dp[n] || (Dp[n] = !0, c('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function _D(e) {
    return e.prototype && e.prototype.isReactComponent;
  }
  function bu(e, t, n) {
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
        Cp[r] || (c('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, a), Cp[r] = !0);
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
        rr(a, "ref");
        var v = "" + a;
        if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === v)
          return t.ref;
        var h = function(x) {
          var S = s.refs;
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
      Tp[t] = !0, c("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
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
      for (var w = /* @__PURE__ */ new Map(), Q = P; Q !== null; )
        Q.key !== null ? w.set(Q.key, Q) : w.set(Q.index, Q), Q = Q.sibling;
      return w;
    }
    function r(j, P) {
      var w = Qi(j, P);
      return w.index = 0, w.sibling = null, w;
    }
    function i(j, P, w) {
      if (j.index = w, !e)
        return j.flags |= bh, P;
      var Q = j.alternate;
      if (Q !== null) {
        var fe = Q.index;
        return fe < P ? (j.flags |= wt, P) : fe;
      } else
        return j.flags |= wt, P;
    }
    function l(j) {
      return e && j.alternate === null && (j.flags |= wt), j;
    }
    function u(j, P, w, Q) {
      if (P === null || P.tag !== B) {
        var fe = Sv(w, j.mode, Q);
        return fe.return = j, fe;
      } else {
        var le = r(P, w);
        return le.return = j, le;
      }
    }
    function s(j, P, w, Q) {
      var fe = w.type;
      if (fe === Pa)
        return h(j, P, w.props.children, Q, w.key);
      if (P !== null && (P.elementType === fe || // Keep this check inline so it only runs on the false path:
      EN(P, w) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof fe == "object" && fe !== null && fe.$$typeof === Se && vy(fe) === P.type)) {
        var le = r(P, w.props);
        return le.ref = bu(j, P, w), le.return = j, le._debugSource = w._source, le._debugOwner = w._owner, le;
      }
      var De = Ev(w, j.mode, Q);
      return De.ref = bu(j, P, w), De.return = j, De;
    }
    function v(j, P, w, Q) {
      if (P === null || P.tag !== _ || P.stateNode.containerInfo !== w.containerInfo || P.stateNode.implementation !== w.implementation) {
        var fe = xv(w, j.mode, Q);
        return fe.return = j, fe;
      } else {
        var le = r(P, w.children || []);
        return le.return = j, le;
      }
    }
    function h(j, P, w, Q, fe) {
      if (P === null || P.tag !== ue) {
        var le = oi(w, j.mode, Q, fe);
        return le.return = j, le;
      } else {
        var De = r(P, w);
        return De.return = j, De;
      }
    }
    function x(j, P, w) {
      if (typeof P == "string" && P !== "" || typeof P == "number") {
        var Q = Sv("" + P, j.mode, w);
        return Q.return = j, Q;
      }
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case ia: {
            var fe = Ev(P, j.mode, w);
            return fe.ref = bu(j, null, P), fe.return = j, fe;
          }
          case qn: {
            var le = xv(P, j.mode, w);
            return le.return = j, le;
          }
          case Se: {
            var De = P._payload, Le = P._init;
            return x(j, Le(De), w);
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
    function S(j, P, w, Q) {
      var fe = P !== null ? P.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number")
        return fe !== null ? null : u(j, P, "" + w, Q);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case ia:
            return w.key === fe ? s(j, P, w, Q) : null;
          case qn:
            return w.key === fe ? v(j, P, w, Q) : null;
          case Se: {
            var le = w._payload, De = w._init;
            return S(j, P, De(le), Q);
          }
        }
        if (He(w) || Sa(w))
          return fe !== null ? null : h(j, P, w, Q, null);
        pc(j, w);
      }
      return typeof w == "function" && mc(j), null;
    }
    function O(j, P, w, Q, fe) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number") {
        var le = j.get(w) || null;
        return u(P, le, "" + Q, fe);
      }
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case ia: {
            var De = j.get(Q.key === null ? w : Q.key) || null;
            return s(P, De, Q, fe);
          }
          case qn: {
            var Le = j.get(Q.key === null ? w : Q.key) || null;
            return v(P, Le, Q, fe);
          }
          case Se:
            var rt = Q._payload, Ge = Q._init;
            return O(j, P, w, Ge(rt), fe);
        }
        if (He(Q) || Sa(Q)) {
          var Rt = j.get(w) || null;
          return h(P, Rt, Q, fe, null);
        }
        pc(P, Q);
      }
      return typeof Q == "function" && mc(P), null;
    }
    function V(j, P, w) {
      {
        if (typeof j != "object" || j === null)
          return P;
        switch (j.$$typeof) {
          case ia:
          case qn:
            my(j, w);
            var Q = j.key;
            if (typeof Q != "string")
              break;
            if (P === null) {
              P = /* @__PURE__ */ new Set(), P.add(Q);
              break;
            }
            if (!P.has(Q)) {
              P.add(Q);
              break;
            }
            c("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", Q);
            break;
          case Se:
            var fe = j._payload, le = j._init;
            V(le(fe), P, w);
            break;
        }
      }
      return P;
    }
    function H(j, P, w, Q) {
      for (var fe = null, le = 0; le < w.length; le++) {
        var De = w[le];
        fe = V(De, fe, j);
      }
      for (var Le = null, rt = null, Ge = P, Rt = 0, We = 0, xt = null; Ge !== null && We < w.length; We++) {
        Ge.index > We ? (xt = Ge, Ge = null) : xt = Ge.sibling;
        var En = S(j, Ge, w[We], Q);
        if (En === null) {
          Ge === null && (Ge = xt);
          break;
        }
        e && Ge && En.alternate === null && t(j, Ge), Rt = i(En, Rt, We), rt === null ? Le = En : rt.sibling = En, rt = En, Ge = xt;
      }
      if (We === w.length) {
        if (n(j, Ge), rn()) {
          var dn = We;
          Ui(j, dn);
        }
        return Le;
      }
      if (Ge === null) {
        for (; We < w.length; We++) {
          var ea = x(j, w[We], Q);
          ea !== null && (Rt = i(ea, Rt, We), rt === null ? Le = ea : rt.sibling = ea, rt = ea);
        }
        if (rn()) {
          var An = We;
          Ui(j, An);
        }
        return Le;
      }
      for (var Vn = a(j, Ge); We < w.length; We++) {
        var Sn = O(Vn, j, We, w[We], Q);
        Sn !== null && (e && Sn.alternate !== null && Vn.delete(Sn.key === null ? We : Sn.key), Rt = i(Sn, Rt, We), rt === null ? Le = Sn : rt.sibling = Sn, rt = Sn);
      }
      if (e && Vn.forEach(function(eo) {
        return t(j, eo);
      }), rn()) {
        var _r = We;
        Ui(j, _r);
      }
      return Le;
    }
    function re(j, P, w, Q) {
      var fe = Sa(w);
      if (typeof fe != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        w[Symbol.toStringTag] === "Generator" && (Rp || c("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Rp = !0), w.entries === fe && (xp || c("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), xp = !0);
        var le = fe.call(w);
        if (le)
          for (var De = null, Le = le.next(); !Le.done; Le = le.next()) {
            var rt = Le.value;
            De = V(rt, De, j);
          }
      }
      var Ge = fe.call(w);
      if (Ge == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Rt = null, We = null, xt = P, En = 0, dn = 0, ea = null, An = Ge.next(); xt !== null && !An.done; dn++, An = Ge.next()) {
        xt.index > dn ? (ea = xt, xt = null) : ea = xt.sibling;
        var Vn = S(j, xt, An.value, Q);
        if (Vn === null) {
          xt === null && (xt = ea);
          break;
        }
        e && xt && Vn.alternate === null && t(j, xt), En = i(Vn, En, dn), We === null ? Rt = Vn : We.sibling = Vn, We = Vn, xt = ea;
      }
      if (An.done) {
        if (n(j, xt), rn()) {
          var Sn = dn;
          Ui(j, Sn);
        }
        return Rt;
      }
      if (xt === null) {
        for (; !An.done; dn++, An = Ge.next()) {
          var _r = x(j, An.value, Q);
          _r !== null && (En = i(_r, En, dn), We === null ? Rt = _r : We.sibling = _r, We = _r);
        }
        if (rn()) {
          var eo = dn;
          Ui(j, eo);
        }
        return Rt;
      }
      for (var Xu = a(j, xt); !An.done; dn++, An = Ge.next()) {
        var nr = O(Xu, j, dn, An.value, Q);
        nr !== null && (e && nr.alternate !== null && Xu.delete(nr.key === null ? dn : nr.key), En = i(nr, En, dn), We === null ? Rt = nr : We.sibling = nr, We = nr);
      }
      if (e && Xu.forEach(function(nw) {
        return t(j, nw);
      }), rn()) {
        var tw = dn;
        Ui(j, tw);
      }
      return Rt;
    }
    function Ee(j, P, w, Q) {
      if (P !== null && P.tag === B) {
        n(j, P.sibling);
        var fe = r(P, w);
        return fe.return = j, fe;
      }
      n(j, P);
      var le = Sv(w, j.mode, Q);
      return le.return = j, le;
    }
    function he(j, P, w, Q) {
      for (var fe = w.key, le = P; le !== null; ) {
        if (le.key === fe) {
          var De = w.type;
          if (De === Pa) {
            if (le.tag === ue) {
              n(j, le.sibling);
              var Le = r(le, w.props.children);
              return Le.return = j, Le._debugSource = w._source, Le._debugOwner = w._owner, Le;
            }
          } else if (le.elementType === De || // Keep this check inline so it only runs on the false path:
          EN(le, w) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof De == "object" && De !== null && De.$$typeof === Se && vy(De) === le.type) {
            n(j, le.sibling);
            var rt = r(le, w.props);
            return rt.ref = bu(j, le, w), rt.return = j, rt._debugSource = w._source, rt._debugOwner = w._owner, rt;
          }
          n(j, le);
          break;
        } else
          t(j, le);
        le = le.sibling;
      }
      if (w.type === Pa) {
        var Ge = oi(w.props.children, j.mode, Q, w.key);
        return Ge.return = j, Ge;
      } else {
        var Rt = Ev(w, j.mode, Q);
        return Rt.ref = bu(j, P, w), Rt.return = j, Rt;
      }
    }
    function qe(j, P, w, Q) {
      for (var fe = w.key, le = P; le !== null; ) {
        if (le.key === fe)
          if (le.tag === _ && le.stateNode.containerInfo === w.containerInfo && le.stateNode.implementation === w.implementation) {
            n(j, le.sibling);
            var De = r(le, w.children || []);
            return De.return = j, De;
          } else {
            n(j, le);
            break;
          }
        else
          t(j, le);
        le = le.sibling;
      }
      var Le = xv(w, j.mode, Q);
      return Le.return = j, Le;
    }
    function Pe(j, P, w, Q) {
      var fe = typeof w == "object" && w !== null && w.type === Pa && w.key === null;
      if (fe && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case ia:
            return l(he(j, P, w, Q));
          case qn:
            return l(qe(j, P, w, Q));
          case Se:
            var le = w._payload, De = w._init;
            return Pe(j, P, De(le), Q);
        }
        if (He(w))
          return H(j, P, w, Q);
        if (Sa(w))
          return re(j, P, w, Q);
        pc(j, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" ? l(Ee(j, P, "" + w, Q)) : (typeof w == "function" && mc(j), n(j, P));
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
  function LD(e, t) {
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
    bn(jp, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== wp && c("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = wp;
  }
  function Op(e, t) {
    var n = jp.current;
    yn(jp, t), e._currentValue = n;
  }
  function Lp(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (El(a.childLanes, t) ? r !== null && !El(r.childLanes, t) && (r.childLanes = ke(r.childLanes, t)) : (a.childLanes = ke(a.childLanes, t), r !== null && (r.childLanes = ke(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && c("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function MD(e, t, n) {
    AD(e, t, n);
  }
  function AD(e, t, n) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = void 0, i = a.dependencies;
      if (i !== null) {
        r = a.child;
        for (var l = i.firstContext; l !== null; ) {
          if (l.context === t) {
            if (a.tag === T) {
              var u = Uo(n), s = Rr(st, u);
              s.tag = bc;
              var v = a.updateQueue;
              if (v !== null) {
                var h = v.shared, x = h.pending;
                x === null ? s.next = s : (s.next = x.next, x.next = s), h.pending = s;
              }
            }
            a.lanes = ke(a.lanes, n);
            var S = a.alternate;
            S !== null && (S.lanes = ke(S.lanes, n)), Lp(a.return, n, e), i.lanes = ke(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === K)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === Z) {
        var O = a.return;
        if (O === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        O.lanes = ke(O.lanes, n);
        var V = O.alternate;
        V !== null && (V.lanes = ke(V.lanes, n)), Lp(O, n, e), r = a.sibling;
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
      a !== null && (Wn(n.lanes, t) && Au(), n.firstContext = null);
    }
  }
  function _t(e) {
    hc && c("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
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
          lanes: q,
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
  var Sy = 0, xy = 1, bc = 2, Ap = 3, Nc = !1, Vp, Ec;
  Vp = !1, Ec = null;
  function kp(e) {
    var t = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        interleaved: null,
        lanes: q
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
    if (Ec === r && !Vp && (c("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Vp = !0), kj()) {
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
  function zD(e, t, n, a, r, i) {
    switch (n.tag) {
      case xy: {
        var l = n.payload;
        if (typeof l == "function") {
          yy();
          var u = l.call(i, a, r);
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
          return u;
        }
        return l;
      }
      case Ap:
        e.flags = e.flags & ~_n | Xe;
      case Sy: {
        var s = n.payload, v;
        if (typeof s == "function") {
          yy(), v = s.call(i, a, r);
          {
            if (e.mode & St) {
              Gt(!0);
              try {
                s.call(i, a, r);
              } finally {
                Gt(!1);
              }
            }
            by();
          }
        } else
          v = s;
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
    var i = r.firstBaseUpdate, l = r.lastBaseUpdate, u = r.shared.pending;
    if (u !== null) {
      r.shared.pending = null;
      var s = u, v = s.next;
      s.next = null, l === null ? i = v : l.next = v, l = s;
      var h = e.alternate;
      if (h !== null) {
        var x = h.updateQueue, S = x.lastBaseUpdate;
        S !== l && (S === null ? x.firstBaseUpdate = v : S.next = v, x.lastBaseUpdate = s);
      }
    }
    if (i !== null) {
      var O = r.baseState, V = q, H = null, re = null, Ee = null, he = i;
      do {
        var qe = he.lane, Pe = he.eventTime;
        if (El(a, qe)) {
          if (Ee !== null) {
            var P = {
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
            Ee = Ee.next = P;
          }
          O = zD(e, r, he, O, t, n);
          var w = he.callback;
          if (w !== null && // If the update was already committed, we should not queue its
          // callback again.
          he.lane !== Wt) {
            e.flags |= yh;
            var Q = r.effects;
            Q === null ? r.effects = [he] : Q.push(he);
          }
        } else {
          var j = {
            eventTime: Pe,
            lane: qe,
            tag: he.tag,
            payload: he.payload,
            callback: he.callback,
            next: null
          };
          Ee === null ? (re = Ee = j, H = O) : Ee = Ee.next = j, V = ke(V, qe);
        }
        if (he = he.next, he === null) {
          if (u = r.shared.pending, u === null)
            break;
          var fe = u, le = fe.next;
          fe.next = null, he = le, r.lastBaseUpdate = fe, r.shared.pending = null;
        }
      } while (!0);
      Ee === null && (H = O), r.baseState = H, r.firstBaseUpdate = re, r.lastBaseUpdate = Ee;
      var De = r.shared.interleaved;
      if (De !== null) {
        var Le = De;
        do
          V = ke(V, Le.lane), Le = Le.next;
        while (Le !== De);
      } else i === null && (r.shared.lanes = q);
      qu(V), e.lanes = V, e.memoizedState = O;
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
  var Nu = {}, Jr = Gr(Nu), Eu = Gr(Nu), Cc = Gr(Nu);
  function Dc(e) {
    if (e === Nu)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function Ty() {
    var e = Dc(Cc.current);
    return e;
  }
  function Fp(e, t) {
    bn(Cc, t, e), bn(Eu, e, e), bn(Jr, Nu, e);
    var n = aC(t);
    yn(Jr, e), bn(Jr, n, e);
  }
  function zl(e) {
    yn(Jr, e), yn(Eu, e), yn(Cc, e);
  }
  function zp() {
    var e = Dc(Jr.current);
    return e;
  }
  function jy(e) {
    Dc(Cc.current);
    var t = Dc(Jr.current), n = rC(t, e.type);
    t !== n && (bn(Eu, e, e), bn(Jr, n, e));
  }
  function Hp(e) {
    Eu.current === e && (yn(Jr, e), yn(Eu, e));
  }
  var PD = 0, wy = 1, _y = 1, Su = 2, wa = Gr(PD);
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
  var se = m.ReactCurrentDispatcher, xu = m.ReactCurrentBatchConfig, Ip, Bl;
  Ip = /* @__PURE__ */ new Set();
  var $i = q, at = null, kt = null, Ut = null, jc = !1, Ru = !1, Cu = 0, ID = 0, qD = 25, $ = null, ca = null, ei = -1, qp = !1;
  function Ze() {
    {
      var e = $;
      ca === null ? ca = [e] : ca.push(e);
    }
  }
  function ee() {
    {
      var e = $;
      ca !== null && (ei++, ca[ei] !== e && GD(e));
    }
  }
  function $l(e) {
    e != null && !He(e) && c("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", $, typeof e);
  }
  function GD(e) {
    {
      var t = Me(at);
      if (!Ip.has(t) && (Ip.add(t), ca !== null)) {
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
  function Gp(e, t) {
    if (qp)
      return !1;
    if (t === null)
      return c("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", $), !1;
    e.length !== t.length && c(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, $, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Xn(e[n], t[n]))
        return !1;
    return !0;
  }
  function Yl(e, t, n, a, r, i) {
    $i = i, at = t, ca = e !== null ? e._debugHookTypes : null, ei = -1, qp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = q, e !== null && e.memoizedState !== null ? se.current = Jy : ca !== null ? se.current = Xy : se.current = Qy;
    var l = n(a, r);
    if (Ru) {
      var u = 0;
      do {
        if (Ru = !1, Cu = 0, u >= qD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        u += 1, qp = !1, kt = null, Ut = null, t.updateQueue = null, ei = -1, se.current = Zy, l = n(a, r);
      } while (Ru);
    }
    se.current = Pc, t._debugHookTypes = ca;
    var s = kt !== null && kt.next !== null;
    if ($i = q, at = null, kt = null, Ut = null, $ = null, ca = null, ei = -1, e !== null && (e.flags & vr) !== (t.flags & vr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Ye) !== xe && c("Internal React error: Expected static flag was missing. Please notify the React team."), jc = !1, s)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function Il() {
    var e = Cu !== 0;
    return Cu = 0, e;
  }
  function Oy(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Ia) !== xe ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = ws(e.lanes, n);
  }
  function Ly() {
    if (se.current = Pc, jc) {
      for (var e = at.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      jc = !1;
    }
    $i = q, at = null, kt = null, Ut = null, ca = null, ei = -1, $ = null, Iy = !1, Ru = !1, Cu = 0;
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
      lanes: q,
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
    var i = kt, l = i.baseQueue, u = r.pending;
    if (u !== null) {
      if (l !== null) {
        var s = l.next, v = u.next;
        l.next = v, u.next = s;
      }
      i.baseQueue !== l && c("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), i.baseQueue = l = u, r.pending = null;
    }
    if (l !== null) {
      var h = l.next, x = i.baseState, S = null, O = null, V = null, H = h;
      do {
        var re = H.lane;
        if (El($i, re)) {
          if (V !== null) {
            var he = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Wt,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            };
            V = V.next = he;
          }
          if (H.hasEagerState)
            x = H.eagerState;
          else {
            var qe = H.action;
            x = e(x, qe);
          }
        } else {
          var Ee = {
            lane: re,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null
          };
          V === null ? (O = V = Ee, S = x) : V = V.next = Ee, at.lanes = ke(at.lanes, re), qu(re);
        }
        H = H.next;
      } while (H !== null && H !== h);
      V === null ? S = x : V.next = O, Xn(x, a.memoizedState) || Au(), a.memoizedState = x, a.baseState = S, a.baseQueue = V, r.lastRenderedState = x;
    }
    var Pe = r.interleaved;
    if (Pe !== null) {
      var j = Pe;
      do {
        var P = j.lane;
        at.lanes = ke(at.lanes, P), qu(P), j = j.next;
      } while (j !== Pe);
    } else l === null && (r.lanes = q);
    var w = r.dispatch;
    return [a.memoizedState, w];
  }
  function Xp(e, t, n) {
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
      Xn(u, a.memoizedState) || Au(), a.memoizedState = u, a.baseQueue === null && (a.baseState = u), r.lastRenderedState = u;
    }
    return [u, i];
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
      i = n(), Bl || i !== n() && (c("The result of getServerSnapshot should be cached to avoid an infinite loop"), Bl = !0);
    } else {
      if (i = t(), !Bl) {
        var u = t();
        Xn(i, u) || (c("The result of getSnapshot should be cached to avoid an infinite loop"), Bl = !0);
      }
      var s = of();
      if (s === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      js(s, $i) || Ay(a, t, i);
    }
    r.memoizedState = i;
    var v = {
      value: i,
      getSnapshot: t
    };
    return r.queue = v, Mc(ky.bind(null, a, v, e), [e]), a.flags |= Fr, Du(At | ln, Vy.bind(null, a, v, i, t), void 0, null), i;
  }
  function wc(e, t, n) {
    var a = at, r = fa(), i = t();
    if (!Bl) {
      var l = t();
      Xn(i, l) || (c("The result of getSnapshot should be cached to avoid an infinite loop"), Bl = !0);
    }
    var u = r.memoizedState, s = !Xn(u, i);
    s && (r.memoizedState = i, Au());
    var v = r.queue;
    if (ju(ky.bind(null, a, v, e), [e]), v.getSnapshot !== t || s || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    Ut !== null && Ut.memoizedState.tag & At) {
      a.flags |= Fr, Du(At | ln, Vy.bind(null, a, v, i, t), void 0, null);
      var h = of();
      if (h === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      js(h, $i) || Ay(a, t, i);
    }
    return i;
  }
  function Ay(e, t, n) {
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
    t !== null && Pt(t, e, je, st);
  }
  function _c(e) {
    var t = Qa();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: q,
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
  function Du(e, t, n, a) {
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
        var u = l.next;
        l.next = r, r.next = u, i.lastEffect = r;
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
  function Tu(e, t, n, a) {
    var r = Qa(), i = a === void 0 ? null : a;
    at.flags |= e, r.memoizedState = Du(At | t, n, void 0, i);
  }
  function Lc(e, t, n, a) {
    var r = fa(), i = a === void 0 ? null : a, l = void 0;
    if (kt !== null) {
      var u = kt.memoizedState;
      if (l = u.destroy, i !== null) {
        var s = u.deps;
        if (Gp(i, s)) {
          r.memoizedState = Du(t, n, l, i);
          return;
        }
      }
    }
    at.flags |= e, r.memoizedState = Du(At | t, n, l, i);
  }
  function Mc(e, t) {
    return (at.mode & Ia) !== xe ? Tu(Jf | Fr | Xf, ln, e, t) : Tu(Fr | Xf, ln, e, t);
  }
  function ju(e, t) {
    return Lc(Fr, ln, e, t);
  }
  function nm(e, t) {
    return Tu(Qe, Ka, e, t);
  }
  function Ac(e, t) {
    return Lc(Qe, Ka, e, t);
  }
  function am(e, t) {
    var n = Qe;
    return n |= Di, (at.mode & Ia) !== xe && (n |= zr), Tu(n, Vt, e, t);
  }
  function Vc(e, t) {
    return Lc(Qe, Vt, e, t);
  }
  function zy(e, t) {
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
  function rm(e, t, n) {
    typeof t != "function" && c("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null, r = Qe;
    return r |= Di, (at.mode & Ia) !== xe && (r |= zr), Tu(r, Vt, zy.bind(null, t, e), a);
  }
  function kc(e, t, n) {
    typeof t != "function" && c("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return Lc(Qe, Vt, zy.bind(null, t, e), a);
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
        at.lanes = ke(at.lanes, r), qu(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Au()), e.memoizedState = n, n;
  }
  function KD(e, t, n) {
    var a = Ca();
    Kt(Bx(a, gr)), e(!0);
    var r = xu.transition;
    xu.transition = {};
    var i = xu.transition;
    xu.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (Kt(a), xu.transition = r, r === null && i._updatedFibers) {
        var l = i._updatedFibers.size;
        l > 10 && E("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function um() {
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
  function sm() {
    var e = Qa(), t = of(), n = t.identifierPrefix, a;
    if (rn()) {
      var r = pD();
      a = ":" + n + "R" + r;
      var i = Cu++;
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
    typeof arguments[3] == "function" && c("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
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
    typeof arguments[3] == "function" && c("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
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
      if (e.lanes === q && (i === null || i.lanes === q)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var u;
          u = se.current, se.current = _a;
          try {
            var s = t.lastRenderedState, v = l(s, n);
            if (r.hasEagerState = !0, r.eagerState = v, Xn(v, s)) {
              kD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            se.current = u;
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
    Ru = jc = !0;
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
      c("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, we = function() {
      c("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
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
        var n = se.current;
        se.current = Xa;
        try {
          return lm(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", Ze();
        var a = se.current;
        se.current = Xa;
        try {
          return Kp(e, t, n);
        } finally {
          se.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", Ze(), tm(e);
      },
      useState: function(e) {
        $ = "useState", Ze();
        var t = se.current;
        se.current = Xa;
        try {
          return _c(e);
        } finally {
          se.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", Ze(), void 0;
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", Ze(), om(e);
      },
      useTransition: function() {
        return $ = "useTransition", Ze(), um();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", Ze(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", Ze(), Jp(e, t, n);
      },
      useId: function() {
        return $ = "useId", Ze(), sm();
      },
      unstable_isNewReconciler: Je
    }, Xy = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", ee(), im(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", ee(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", ee(), Mc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", ee(), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", ee(), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", ee(), am(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", ee();
        var n = se.current;
        se.current = Xa;
        try {
          return lm(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", ee();
        var a = se.current;
        se.current = Xa;
        try {
          return Kp(e, t, n);
        } finally {
          se.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", ee(), tm(e);
      },
      useState: function(e) {
        $ = "useState", ee();
        var t = se.current;
        se.current = Xa;
        try {
          return _c(e);
        } finally {
          se.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", ee(), void 0;
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", ee(), om(e);
      },
      useTransition: function() {
        return $ = "useTransition", ee(), um();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", ee(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", ee(), Jp(e, t, n);
      },
      useId: function() {
        return $ = "useId", ee(), sm();
      },
      unstable_isNewReconciler: Je
    }, Jy = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", ee(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", ee(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", ee(), ju(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", ee(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", ee(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", ee(), Vc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", ee();
        var n = se.current;
        se.current = _a;
        try {
          return zc(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", ee();
        var a = se.current;
        se.current = _a;
        try {
          return Qp(e, t, n);
        } finally {
          se.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", ee(), Oc();
      },
      useState: function(e) {
        $ = "useState", ee();
        var t = se.current;
        se.current = _a;
        try {
          return Zp(e);
        } finally {
          se.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", ee(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", ee(), Hy(e);
      },
      useTransition: function() {
        return $ = "useTransition", ee(), $y();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", ee(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", ee(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", ee(), Hc();
      },
      unstable_isNewReconciler: Je
    }, Zy = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", ee(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", ee(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", ee(), ju(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", ee(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", ee(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", ee(), Vc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", ee();
        var n = se.current;
        se.current = Bc;
        try {
          return zc(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", ee();
        var a = se.current;
        se.current = Bc;
        try {
          return Xp(e, t, n);
        } finally {
          se.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", ee(), Oc();
      },
      useState: function(e) {
        $ = "useState", ee();
        var t = se.current;
        se.current = Bc;
        try {
          return em(e);
        } finally {
          se.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", ee(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", ee(), Py(e);
      },
      useTransition: function() {
        return $ = "useTransition", ee(), Yy();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", ee(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", ee(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", ee(), Hc();
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
        var n = se.current;
        se.current = Xa;
        try {
          return lm(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", we(), Ze();
        var a = se.current;
        se.current = Xa;
        try {
          return Kp(e, t, n);
        } finally {
          se.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", we(), Ze(), tm(e);
      },
      useState: function(e) {
        $ = "useState", we(), Ze();
        var t = se.current;
        se.current = Xa;
        try {
          return _c(e);
        } finally {
          se.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", we(), Ze(), void 0;
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", we(), Ze(), om(e);
      },
      useTransition: function() {
        return $ = "useTransition", we(), Ze(), um();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", we(), Ze(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", we(), Ze(), Jp(e, t, n);
      },
      useId: function() {
        return $ = "useId", we(), Ze(), sm();
      },
      unstable_isNewReconciler: Je
    }, _a = {
      readContext: function(e) {
        return cm(), _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", we(), ee(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", we(), ee(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", we(), ee(), ju(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", we(), ee(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", we(), ee(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", we(), ee(), Vc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", we(), ee();
        var n = se.current;
        se.current = _a;
        try {
          return zc(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", we(), ee();
        var a = se.current;
        se.current = _a;
        try {
          return Qp(e, t, n);
        } finally {
          se.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", we(), ee(), Oc();
      },
      useState: function(e) {
        $ = "useState", we(), ee();
        var t = se.current;
        se.current = _a;
        try {
          return Zp(e);
        } finally {
          se.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", we(), ee(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", we(), ee(), Hy(e);
      },
      useTransition: function() {
        return $ = "useTransition", we(), ee(), $y();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", we(), ee(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", we(), ee(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", we(), ee(), Hc();
      },
      unstable_isNewReconciler: Je
    }, Bc = {
      readContext: function(e) {
        return cm(), _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", we(), ee(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", we(), ee(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", we(), ee(), ju(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", we(), ee(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", we(), ee(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", we(), ee(), Vc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", we(), ee();
        var n = se.current;
        se.current = _a;
        try {
          return zc(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", we(), ee();
        var a = se.current;
        se.current = _a;
        try {
          return Xp(e, t, n);
        } finally {
          se.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", we(), ee(), Oc();
      },
      useState: function(e) {
        $ = "useState", we(), ee();
        var t = se.current;
        se.current = _a;
        try {
          return em(e);
        } finally {
          se.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", we(), ee(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", we(), ee(), Py(e);
      },
      useTransition: function() {
        return $ = "useTransition", we(), ee(), Yy();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", we(), ee(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", we(), ee(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", we(), ee(), Hc();
      },
      unstable_isNewReconciler: Je
    };
  }
  var ti = d.unstable_now, eb = 0, $c = -1, wu = -1, Yc = -1, fm = !1, Ic = !1;
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
    wu = ti(), e.actualStartTime < 0 && (e.actualStartTime = ti());
  }
  function rb(e) {
    wu = -1;
  }
  function qc(e, t) {
    if (wu >= 0) {
      var n = ti() - wu;
      e.actualDuration += n, t && (e.selfBaseDuration = n), wu = -1;
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
  var hm = {}, gm, ym, bm, Nm, Em, ib, Gc, Sm, xm, Rm, _u;
  {
    gm = /* @__PURE__ */ new Set(), ym = /* @__PURE__ */ new Set(), bm = /* @__PURE__ */ new Set(), Nm = /* @__PURE__ */ new Set(), Sm = /* @__PURE__ */ new Set(), Em = /* @__PURE__ */ new Set(), xm = /* @__PURE__ */ new Set(), Rm = /* @__PURE__ */ new Set(), _u = /* @__PURE__ */ new Set();
    var lb = /* @__PURE__ */ new Set();
    Gc = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        lb.has(n) || (lb.add(n), c("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, ib = function(e, t) {
      if (t === void 0) {
        var n = Ke(e) || "Component";
        Em.has(n) || (Em.add(n), c("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", n));
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
    if (e.memoizedState = l, e.lanes === q) {
      var u = e.updateQueue;
      u.baseState = l;
    }
  }
  var Dm = {
    isMounted: qS,
    enqueueSetState: function(e, t, n) {
      var a = dl(e), r = Mn(), i = ii(a), l = Rr(r, i);
      l.payload = t, n != null && (Gc(n, "setState"), l.callback = n);
      var u = Xr(a, l, i);
      u !== null && (Pt(u, a, i, r), Sc(u, a, i)), ad(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = dl(e), r = Mn(), i = ii(a), l = Rr(r, i);
      l.tag = xy, l.payload = t, n != null && (Gc(n, "replaceState"), l.callback = n);
      var u = Xr(a, l, i);
      u !== null && (Pt(u, a, i, r), Sc(u, a, i)), ad(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = dl(e), a = Mn(), r = ii(n), i = Rr(a, r);
      i.tag = bc, t != null && (Gc(t, "forceUpdate"), i.callback = t);
      var l = Xr(n, i, r);
      l !== null && (Pt(l, n, r, a), Sc(l, n, r)), xx(n, r);
    }
  };
  function ob(e, t, n, a, r, i, l) {
    var u = e.stateNode;
    if (typeof u.shouldComponentUpdate == "function") {
      var s = u.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & St) {
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
    return t.prototype && t.prototype.isPureReactComponent ? !Jo(n, a) || !Jo(r, i) : !0;
  }
  function nT(e, t, n) {
    var a = e.stateNode;
    {
      var r = Ke(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? c("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : c("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && c("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && c("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && c("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && c("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !_u.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & St) === xe && (_u.add(t), c(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !_u.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & St) === xe && (_u.add(t), c(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && c("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !xm.has(t) && (xm.add(t), c("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && c("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && c("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Ke(t) || "A pure component"), typeof a.componentDidUnmount == "function" && c("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && c("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && c("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && c("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && c("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && c("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !bm.has(t) && (bm.add(t), c("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Ke(t))), typeof a.getDerivedStateFromProps == "function" && c("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && c("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && c("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var u = a.state;
      u && (typeof u != "object" || He(u)) && c("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && c("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function ub(e, t) {
    t.updater = Dm, e.stateNode = t, BS(t, e), t._reactInternalInstance = hm;
  }
  function sb(e, t, n) {
    var a = !1, r = Jn, i = Jn, l = t.contextType;
    if ("contextType" in t) {
      var u = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === ae && l._context === void 0
      );
      if (!u && !Rm.has(t)) {
        Rm.add(t);
        var s = "";
        l === void 0 ? s = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? s = " However, it is set to a " + typeof l + "." : l.$$typeof === W ? s = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? s = " Did you accidentally pass the Context.Consumer instead?" : s = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", c("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Ke(t) || "Component", s);
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
    if (e.mode & St) {
      Gt(!0);
      try {
        h = new t(n, i);
      } finally {
        Gt(!1);
      }
    }
    var x = e.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null;
    ub(e, h);
    {
      if (typeof t.getDerivedStateFromProps == "function" && x === null) {
        var S = Ke(t) || "Component";
        ym.has(S) || (ym.add(S), c("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", S, h.state === null ? "null" : "undefined", S));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function") {
        var O = null, V = null, H = null;
        if (typeof h.componentWillMount == "function" && h.componentWillMount.__suppressDeprecationWarning !== !0 ? O = "componentWillMount" : typeof h.UNSAFE_componentWillMount == "function" && (O = "UNSAFE_componentWillMount"), typeof h.componentWillReceiveProps == "function" && h.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? V = "componentWillReceiveProps" : typeof h.UNSAFE_componentWillReceiveProps == "function" && (V = "UNSAFE_componentWillReceiveProps"), typeof h.componentWillUpdate == "function" && h.componentWillUpdate.__suppressDeprecationWarning !== !0 ? H = "componentWillUpdate" : typeof h.UNSAFE_componentWillUpdate == "function" && (H = "UNSAFE_componentWillUpdate"), O !== null || V !== null || H !== null) {
          var re = Ke(t) || "Component", Ee = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          Nm.has(re) || (Nm.add(re), c(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, re, Ee, O !== null ? `
  ` + O : "", V !== null ? `
  ` + V : "", H !== null ? `
  ` + H : ""));
        }
      }
    }
    return a && Jg(e, r, i), h;
  }
  function aT(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (c("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Me(e) || "Component"), Dm.enqueueReplaceState(t, t.state, null));
  }
  function cb(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = Me(e) || "Component";
        gm.has(i) || (gm.add(i), c("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
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
      r.context = Ll(e, l);
    }
    {
      if (r.state === n) {
        var u = Ke(t) || "Component";
        Sm.has(u) || (Sm.add(u), c("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", u));
      }
      e.mode & St && ja.recordLegacyContextWarning(e, r), ja.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var s = t.getDerivedStateFromProps;
    if (typeof s == "function" && (Cm(e, t, s, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (aT(e, r), xc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var v = Qe;
      v |= Di, (e.mode & Ia) !== xe && (v |= zr), e.flags |= v;
    }
  }
  function rT(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, u = t.contextType, s = Jn;
    if (typeof u == "object" && u !== null)
      s = _t(u);
    else {
      var v = Ol(e, t, !0);
      s = Ll(e, v);
    }
    var h = t.getDerivedStateFromProps, x = typeof h == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !x && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== s) && cb(e, r, n, s), Cy();
    var S = e.memoizedState, O = r.state = S;
    if (xc(e, n, r, a), O = e.memoizedState, i === n && S === O && !rc() && !Rc()) {
      if (typeof r.componentDidMount == "function") {
        var V = Qe;
        V |= Di, (e.mode & Ia) !== xe && (V |= zr), e.flags |= V;
      }
      return !1;
    }
    typeof h == "function" && (Cm(e, t, h, n), O = e.memoizedState);
    var H = Rc() || ob(e, t, i, n, S, O, s);
    if (H) {
      if (!x && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var re = Qe;
        re |= Di, (e.mode & Ia) !== xe && (re |= zr), e.flags |= re;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var Ee = Qe;
        Ee |= Di, (e.mode & Ia) !== xe && (Ee |= zr), e.flags |= Ee;
      }
      e.memoizedProps = n, e.memoizedState = O;
    }
    return r.props = n, r.state = O, r.context = s, H;
  }
  function iT(e, t, n, a, r) {
    var i = t.stateNode;
    Ry(e, t);
    var l = t.memoizedProps, u = t.type === t.elementType ? l : Oa(t.type, l);
    i.props = u;
    var s = t.pendingProps, v = i.context, h = n.contextType, x = Jn;
    if (typeof h == "object" && h !== null)
      x = _t(h);
    else {
      var S = Ol(t, n, !0);
      x = Ll(t, S);
    }
    var O = n.getDerivedStateFromProps, V = typeof O == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !V && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== s || v !== x) && cb(t, i, a, x), Cy();
    var H = t.memoizedState, re = i.state = H;
    if (xc(t, a, i, r), re = t.memoizedState, l === s && H === re && !rc() && !Rc() && !pn)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= Qe), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= ml), !1;
    typeof O == "function" && (Cm(t, n, O, a), re = t.memoizedState);
    var Ee = Rc() || ob(t, n, u, a, H, re, x) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    pn;
    return Ee ? (!V && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, re, x), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, re, x)), typeof i.componentDidUpdate == "function" && (t.flags |= Qe), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= ml)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= Qe), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= ml), t.memoizedProps = a, t.memoizedState = re), i.props = a, i.state = re, i.context = x, Ee;
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
      var u = r ? Me(r) : null, s = u ? "The above error occurred in the <" + u + "> component:" : "The above error occurred in one of your React components:", v;
      if (e.tag === D)
        v = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var h = Me(e) || "Anonymous";
        v = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + h + ".");
      }
      var x = s + `
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
    var a = Rr(st, n);
    a.tag = Ap, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Zj(r), wm(e, t);
    }, a;
  }
  function _m(e, t, n) {
    var a = Rr(st, n);
    a.tag = Ap;
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
      var s = t.value, v = t.stack;
      this.componentDidCatch(s, {
        componentStack: v !== null ? v : ""
      }), typeof r != "function" && (Wn(e.lanes, je) || c("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Me(e) || "Unknown"));
    }), a;
  }
  function db(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new oT(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = e1.bind(null, e, t, n);
      Ra && Gu(e, n), t.then(i, i);
    }
  }
  function uT(e, t, n, a) {
    var r = e.updateQueue;
    if (r === null) {
      var i = /* @__PURE__ */ new Set();
      i.add(n), e.updateQueue = i;
    } else
      r.add(n);
  }
  function sT(e, t) {
    var n = e.tag;
    if ((e.mode & Ye) === xe && (n === R || n === I || n === X)) {
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
            n.tag = ie;
          else {
            var l = Rr(st, je);
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
    if (n.flags |= Ss, Ra && Gu(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      sT(n), rn() && n.mode & Ye && iy();
      var l = pb(t);
      if (l !== null) {
        l.flags &= ~pr, mb(l, t, n, e, r), l.mode & Ye && db(e, i, r), uT(l, e, i);
        return;
      } else {
        if (!Lx(r)) {
          db(e, i, r), sv();
          return;
        }
        var u = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = u;
      }
    } else if (rn() && n.mode & Ye) {
      iy();
      var s = pb(t);
      if (s !== null) {
        (s.flags & _n) === Ce && (s.flags |= pr), mb(s, t, n, e, r), Sp(Yi(a, n));
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
          var O = a, V = v.type, H = v.stateNode;
          if ((v.flags & Xe) === Ce && (typeof V.getDerivedStateFromError == "function" || H !== null && typeof H.componentDidCatch == "function" && !pN(H))) {
            v.flags |= _n;
            var re = Uo(r);
            v.lanes = ke(v.lanes, re);
            var Ee = _m(v, O, re);
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
  var Ou = m.ReactCurrentOwner, La = !1, Om, Lu, Lm, Mm, Am, Ii, Vm, Wc, Mu;
  Om = {}, Lu = {}, Lm = {}, Mm = {}, Am = {}, Ii = !1, Vm = {}, Wc = {}, Mu = {};
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
    var l = n.render, u = t.ref, s, v;
    Fl(t, r), Oo(t);
    {
      if (Ou.current = t, la(!0), s = Yl(e, t, l, a, u, r), v = Il(), t.mode & St) {
        Gt(!0);
        try {
          s = Yl(e, t, l, a, u, r), v = Il();
        } finally {
          Gt(!1);
        }
      }
      la(!1);
    }
    return gl(), e !== null && !La ? (Oy(e, t, r), Cr(e, t, r)) : (rn() && v && hp(t), t.flags |= pl, On(e, t, s, r), t.child);
  }
  function hb(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (g1(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Zl(i), t.tag = X, t.type = l, Fm(t, i), gb(e, t, l, a, r);
      }
      {
        var u = i.propTypes;
        if (u && Da(
          u,
          a,
          // Resolved props
          "prop",
          Ke(i)
        ), n.defaultProps !== void 0) {
          var s = Ke(i) || "Unknown";
          Mu[s] || (c("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", s), Mu[s] = !0);
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
    var S = e.child, O = Ym(e, r);
    if (!O) {
      var V = S.memoizedProps, H = n.compare;
      if (H = H !== null ? H : Jo, H(V, a) && e.ref === t.ref)
        return Cr(e, t, r);
    }
    t.flags |= pl;
    var re = Qi(S, a);
    return re.ref = t.ref, re.return = t, t.child = re, re;
  }
  function gb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === Se) {
        var l = i, u = l._payload, s = l._init;
        try {
          i = s(u);
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
        if (La = !1, t.pendingProps = a = h, Ym(e, r))
          (e.flags & Kf) !== Ce && (La = !0);
        else return t.lanes = e.lanes, Cr(e, t, r);
    }
    return km(e, t, n, a, r);
  }
  function yb(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Qt)
      if ((t.mode & Ye) === xe) {
        var l = {
          baseLanes: q,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, uf(t, n);
      } else if (Wn(n, Gn)) {
        var x = {
          baseLanes: q,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = x;
        var S = i !== null ? i.baseLanes : n;
        uf(t, S);
      } else {
        var u = null, s;
        if (i !== null) {
          var v = i.baseLanes;
          s = ke(v, n);
        } else
          s = n;
        t.lanes = t.childLanes = Gn;
        var h = {
          baseLanes: s,
          cachePool: u,
          transitions: null
        };
        return t.memoizedState = h, t.updateQueue = null, uf(t, s), null;
      }
    else {
      var O;
      i !== null ? (O = ke(i.baseLanes, n), t.memoizedState = null) : O = n, uf(t, O);
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
      var u = Ol(t, n, !0);
      l = Ll(t, u);
    }
    var s, v;
    Fl(t, r), Oo(t);
    {
      if (Ou.current = t, la(!0), s = Yl(e, t, n, a, l, r), v = Il(), t.mode & St) {
        Gt(!0);
        try {
          s = Yl(e, t, n, a, l, r), v = Il();
        } finally {
          Gt(!1);
        }
      }
      la(!1);
    }
    return gl(), e !== null && !La ? (Oy(e, t, r), Cr(e, t, r)) : (rn() && v && hp(t), t.flags |= pl, On(e, t, s, r), t.child);
  }
  function Nb(e, t, n, a, r) {
    {
      switch (L1(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, u = new l(t.memoizedProps, i.context), s = u.state;
          i.updater.enqueueSetState(i, s, null);
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
    var O;
    Wa(n) ? (O = !0, lc(t)) : O = !1, Fl(t, r);
    var V = t.stateNode, H;
    V === null ? (Qc(e, t), sb(t, n, a), Tm(t, n, a, r), H = !0) : e === null ? H = rT(t, n, a, r) : H = iT(e, t, n, a, r);
    var re = Um(e, t, n, H, O, r);
    {
      var Ee = t.stateNode;
      H && Ee.props !== a && (Ii || c("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Me(t) || "a component"), Ii = !0);
    }
    return re;
  }
  function Um(e, t, n, a, r, i) {
    bb(e, t);
    var l = (t.flags & Xe) !== Ce;
    if (!a && !l)
      return r && ty(t, n, !1), Cr(e, t, i);
    var u = t.stateNode;
    Ou.current = t;
    var s;
    if (l && typeof n.getDerivedStateFromError != "function")
      s = null, rb();
    else {
      Oo(t);
      {
        if (la(!0), s = u.render(), t.mode & St) {
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
    return t.flags |= pl, e !== null && l ? dT(e, t, s, i) : On(e, t, s, i), t.memoizedState = u.state, r && ty(t, n, !0), t.child;
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
    var u = l.element;
    if (r.isDehydrated) {
      var s = {
        element: u,
        isDehydrated: !1,
        cache: l.cache,
        pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
        transitions: l.transitions
      }, v = t.updateQueue;
      if (v.baseState = s, t.memoizedState = s, t.flags & pr) {
        var h = Yi(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return Sb(e, t, u, n, h);
      } else if (u !== i) {
        var x = Yi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return Sb(e, t, u, n, x);
      } else {
        bD(t);
        var S = gy(t, null, u, n);
        t.child = S;
        for (var O = S; O; )
          O.flags = O.flags & ~wt | mr, O = O.sibling;
      }
    } else {
      if (Vl(), u === i)
        return Cr(e, t, n);
      On(e, t, u, n);
    }
    return t.child;
  }
  function Sb(e, t, n, a, r) {
    return Vl(), Sp(r), t.flags |= pr, On(e, t, n, a), t.child;
  }
  function gT(e, t, n) {
    jy(t), e === null && Ep(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, u = np(a, r);
    return u ? l = null : i !== null && np(a, i) && (t.flags |= wo), bb(e, t), On(e, t, l, n), t.child;
  }
  function yT(e, t) {
    return e === null && Ep(t), null;
  }
  function bT(e, t, n, a) {
    Qc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, u = i._init, s = u(l);
    t.type = s;
    var v = t.tag = y1(s), h = Oa(s, r), x;
    switch (v) {
      case R:
        return Fm(t, s), t.type = s = Zl(s), x = km(null, t, s, h, a), x;
      case T:
        return t.type = s = mv(s), x = Nb(null, t, s, h, a), x;
      case I:
        return t.type = s = vv(s), x = vb(null, t, s, h, a), x;
      case Y: {
        if (t.type !== t.elementType) {
          var S = s.propTypes;
          S && Da(
            S,
            h,
            // Resolved for outer only
            "prop",
            Ke(s)
          );
        }
        return x = hb(
          null,
          t,
          s,
          Oa(s.type, h),
          // The inner type can have defaults too
          a
        ), x;
      }
    }
    var O = "";
    throw s !== null && typeof s == "object" && s.$$typeof === Se && (O = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + s + ". " + ("Lazy element type must resolve to a class or function." + O));
  }
  function NT(e, t, n, a, r) {
    Qc(e, t), t.tag = T;
    var i;
    return Wa(n) ? (i = !0, lc(t)) : i = !1, Fl(t, r), sb(t, n, a), Tm(t, n, a, r), Um(null, t, n, !0, i, r);
  }
  function ET(e, t, n, a) {
    Qc(e, t);
    var r = t.pendingProps, i;
    {
      var l = Ol(t, n, !1);
      i = Ll(t, l);
    }
    Fl(t, a);
    var u, s;
    Oo(t);
    {
      if (n.prototype && typeof n.prototype.render == "function") {
        var v = Ke(n) || "Unknown";
        Om[v] || (c("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", v, v), Om[v] = !0);
      }
      t.mode & St && ja.recordLegacyContextWarning(t, null), la(!0), Ou.current = t, u = Yl(null, t, n, r, i, a), s = Il(), la(!1);
    }
    if (gl(), t.flags |= pl, typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0) {
      var h = Ke(n) || "Unknown";
      Lu[h] || (c("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", h, h, h), Lu[h] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0
    ) {
      {
        var x = Ke(n) || "Unknown";
        Lu[x] || (c("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", x, x, x), Lu[x] = !0);
      }
      t.tag = T, t.memoizedState = null, t.updateQueue = null;
      var S = !1;
      return Wa(n) ? (S = !0, lc(t)) : S = !1, t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, kp(t), ub(t, u), Tm(t, n, r, a), Um(null, t, n, !0, S, a);
    } else {
      if (t.tag = R, t.mode & St) {
        Gt(!0);
        try {
          u = Yl(null, t, n, r, i, a), s = Il();
        } finally {
          Gt(!1);
        }
      }
      return rn() && s && hp(t), On(null, t, u, a), Fm(t, n), t.child;
    }
  }
  function Fm(e, t) {
    {
      if (t && t.childContextTypes && c("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var n = "", a = kr();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), Am[r] || (Am[r] = !0, c("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = Ke(t) || "Unknown";
        Mu[l] || (c("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), Mu[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var u = Ke(t) || "Unknown";
        Mm[u] || (c("%s: Function components do not support getDerivedStateFromProps.", u), Mm[u] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var s = Ke(t) || "Unknown";
        Lm[s] || (c("%s: Function components do not support contextType.", s), Lm[s] = !0);
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
    return Pp(e, Su);
  }
  function RT(e, t) {
    return ws(e.childLanes, t);
  }
  function xb(e, t, n) {
    var a = t.pendingProps;
    M1(t) && (t.flags |= Xe);
    var r = wa.current, i = !1, l = (t.flags & Xe) !== Ce;
    if (l || xT(r, e) ? (i = !0, t.flags &= ~Xe) : (e === null || e.memoizedState !== null) && (r = BD(r, _y)), r = Hl(r), Zr(t, r), e === null) {
      Ep(t);
      var u = t.memoizedState;
      if (u !== null) {
        var s = u.dehydrated;
        if (s !== null)
          return wT(t, s);
      }
      var v = a.children, h = a.fallback;
      if (i) {
        var x = CT(t, v, h, n), S = t.child;
        return S.memoizedState = Hm(n), t.memoizedState = zm, x;
      } else
        return Pm(t, v);
    } else {
      var O = e.memoizedState;
      if (O !== null) {
        var V = O.dehydrated;
        if (V !== null)
          return _T(e, t, l, a, V, O, n);
      }
      if (i) {
        var H = a.fallback, re = a.children, Ee = TT(e, t, re, H, n), he = t.child, qe = e.child.memoizedState;
        return he.memoizedState = qe === null ? Hm(n) : ST(qe, n), he.childLanes = RT(e, n), t.memoizedState = zm, Ee;
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
    }, u, s;
    return (r & Ye) === xe && i !== null ? (u = i, u.childLanes = q, u.pendingProps = l, e.mode & nt && (u.actualDuration = 0, u.actualStartTime = -1, u.selfBaseDuration = 0, u.treeBaseDuration = 0), s = oi(n, r, a, null)) : (u = Bm(l, r), s = oi(n, r, a, null)), u.return = e, s.return = e, u.sibling = s, e.child = u, s;
  }
  function Bm(e, t, n) {
    return RN(e, t, q, null);
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
      var u = t.deletions;
      u === null ? (t.deletions = [i], t.flags |= xi) : u.push(i);
    }
    return t.child = l, l;
  }
  function TT(e, t, n, a, r) {
    var i = t.mode, l = e.child, u = l.sibling, s = {
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
      v = h, v.childLanes = q, v.pendingProps = s, t.mode & nt && (v.actualDuration = 0, v.actualStartTime = -1, v.selfBaseDuration = l.selfBaseDuration, v.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      v = Rb(l, s), v.subtreeFlags = l.subtreeFlags & vr;
    var x;
    return u !== null ? x = Qi(u, a) : (x = oi(a, i, r, null), x.flags |= wt), x.return = t, v.return = t, v.sibling = x, t.child = v, x;
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
    }, u = Bm(l, i), s = oi(a, i, r, null);
    return s.flags |= wt, u.return = t, s.return = t, u.sibling = s, t.child = u, (t.mode & Ye) !== xe && kl(t, e.child, null, r), s;
  }
  function wT(e, t, n) {
    return (e.mode & Ye) === xe ? (c("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = je) : lp(t) ? e.lanes = wi : e.lanes = Gn, null;
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
        var P = a.children, w = a.fallback, Q = jT(e, t, P, w, l), fe = t.child;
        return fe.memoizedState = Hm(l), t.memoizedState = zm, Q;
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
        var u, s, v;
        {
          var h = AC(r);
          u = h.digest, s = h.message, v = h.stack;
        }
        var x;
        s ? x = new Error(s) : x = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var S = jm(x, u, v);
        return Kc(e, t, l, S);
      }
      var O = Wn(l, e.childLanes);
      if (La || O) {
        var V = of();
        if (V !== null) {
          var H = Hx(V, l);
          if (H !== Wt && H !== i.retryLane) {
            i.retryLane = H;
            var re = st;
            Pn(e, H), Pt(V, e, H, re);
          }
        }
        sv();
        var Ee = jm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Kc(e, t, l, Ee);
      } else if (Gg(r)) {
        t.flags |= Xe, t.child = e.child;
        var he = t1.bind(null, e);
        return VC(r, he), null;
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
    a !== null && (a.lanes = ke(a.lanes, t)), Lp(e.return, t, n);
  }
  function OT(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === F) {
        var r = a.memoizedState;
        r !== null && Cb(a, n, e);
      } else if (a.tag === U)
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
  function LT(e) {
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
  function AT(e, t) {
    e !== void 0 && !Wc[e] && (e !== "collapsed" && e !== "hidden" ? (Wc[e] = !0, c('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Wc[e] = !0, c('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function Db(e, t) {
    {
      var n = He(e), a = !n && typeof Sa(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return c("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
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
          c('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
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
    MT(r), AT(i, r), VT(l, r), On(e, t, l, n);
    var u = wa.current, s = Pp(u, Su);
    if (s)
      u = Bp(u, Su), t.flags |= Xe;
    else {
      var v = e !== null && (e.flags & Xe) !== Ce;
      v && OT(t, t.child, n), u = Hl(u);
    }
    if (Zr(t, u), (t.mode & Ye) === xe)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var h = LT(t.child), x;
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
          var S = null, O = t.child;
          for (t.child = null; O !== null; ) {
            var V = O.alternate;
            if (V !== null && Tc(V) === null) {
              t.child = O;
              break;
            }
            var H = O.sibling;
            O.sibling = S, S = O, O = H;
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
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, u = i.value;
    {
      "value" in i || jb || (jb = !0, c("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var s = t.type.propTypes;
      s && Da(s, i, "prop", "Context.Provider");
    }
    if (Ny(t, r, u), l !== null) {
      var v = l.value;
      if (Xn(v, u)) {
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
    a._context === void 0 ? a !== a.Consumer && (wb || (wb = !0, c("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && c("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Fl(t, n);
    var l = _t(a);
    Oo(t);
    var u;
    return Ou.current = t, la(!0), u = i(l), la(!1), gl(), t.flags |= pl, On(e, t, u, n), t.child;
  }
  function Au() {
    La = !0;
  }
  function Qc(e, t) {
    (t.mode & Ye) === xe && e !== null && (e.alternate = null, t.alternate = null, t.flags |= wt);
  }
  function Cr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), rb(), qu(t.lanes), Wn(n, t.childLanes) ? (OD(e, t), t.child) : null;
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
      case k:
        jy(t);
        break;
      case T: {
        var a = t.type;
        Wa(a) && lc(t);
        break;
      }
      case _:
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
            var u = t.stateNode;
            u.effectDuration = 0, u.passiveEffectDuration = 0;
          }
        }
        break;
      case F: {
        var s = t.memoizedState;
        if (s !== null) {
          if (s.dehydrated !== null)
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
      case U: {
        var S = (e.flags & Xe) !== Ce, O = Wn(n, t.childLanes);
        if (S) {
          if (O)
            return Tb(e, t, n);
          t.flags |= Xe;
        }
        var V = t.memoizedState;
        if (V !== null && (V.rendering = null, V.tail = null, V.lastEffect = null), Zr(t, wa.current), O)
          break;
        return null;
      }
      case ce:
      case Ae:
        return t.lanes = q, yb(e, t, n);
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
        La = !0;
      else {
        var i = Ym(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & Xe) === Ce)
          return La = !1, HT(e, t, n);
        (e.flags & Kf) !== Ce ? La = !0 : La = !1;
      }
    } else if (La = !1, rn() && fD(t)) {
      var l = t.index, u = dD();
      ry(t, u, l);
    }
    switch (t.lanes = q, t.tag) {
      case L:
        return ET(e, t, t.type, n);
      case ye: {
        var s = t.elementType;
        return bT(e, t, s, n);
      }
      case R: {
        var v = t.type, h = t.pendingProps, x = t.elementType === v ? h : Oa(v, h);
        return km(e, t, v, x, n);
      }
      case T: {
        var S = t.type, O = t.pendingProps, V = t.elementType === S ? O : Oa(S, O);
        return Nb(e, t, S, V, n);
      }
      case D:
        return hT(e, t, n);
      case k:
        return gT(e, t, n);
      case B:
        return yT(e, t);
      case F:
        return xb(e, t, n);
      case _:
        return kT(e, t, n);
      case I: {
        var H = t.type, re = t.pendingProps, Ee = t.elementType === H ? re : Oa(H, re);
        return vb(e, t, H, Ee, n);
      }
      case ue:
        return pT(e, t, n);
      case te:
        return mT(e, t, n);
      case G:
        return vT(e, t, n);
      case K:
        return UT(e, t, n);
      case me:
        return FT(e, t, n);
      case Y: {
        var he = t.type, qe = t.pendingProps, Pe = Oa(he, qe);
        if (t.type !== t.elementType) {
          var j = he.propTypes;
          j && Da(
            j,
            Pe,
            // Resolved for outer only
            "prop",
            Ke(he)
          );
        }
        return Pe = Oa(he.type, Pe), hb(e, t, he, Pe, n);
      }
      case X:
        return gb(e, t, t.type, t.pendingProps, n);
      case ie: {
        var P = t.type, w = t.pendingProps, Q = t.elementType === P ? w : Oa(P, w);
        return NT(e, t, P, Q, n);
      }
      case U:
        return Tb(e, t, n);
      case ve:
        break;
      case ce:
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
  var Lb, Im, Mb, Ab;
  Lb = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === k || r.tag === B)
        uC(e, r.stateNode);
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
  }, Im = function(e, t) {
  }, Mb = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, u = zp(), s = cC(l, n, i, a, r, u);
      t.updateQueue = s, s && ql(t);
    }
  }, Ab = function(e, t, n, a) {
    n !== a && ql(t);
  };
  function Vu(e, t) {
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
    var t = e.alternate !== null && e.alternate.child === e.child, n = q, a = Ce;
    if (t) {
      if ((e.mode & nt) !== xe) {
        for (var s = e.selfBaseDuration, v = e.child; v !== null; )
          n = ke(n, ke(v.lanes, v.childLanes)), a |= v.subtreeFlags & vr, a |= v.flags & vr, s += v.treeBaseDuration, v = v.sibling;
        e.treeBaseDuration = s;
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
        for (var u = e.child; u !== null; )
          n = ke(n, ke(u.lanes, u.childLanes)), a |= u.subtreeFlags, a |= u.flags, u.return = e, u = u.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function PT(e, t, n) {
    if (CD() && (t.mode & Ye) !== xe && (t.flags & Xe) === Ce)
      return fy(t), Vl(), t.flags |= pr | Ss | _n, !1;
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
            var u = t.child;
            u !== null && (t.treeBaseDuration -= u.treeBaseDuration);
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
      case L:
      case ye:
      case X:
      case R:
      case I:
      case ue:
      case te:
      case G:
      case me:
      case Y:
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
            var u = e.memoizedState;
            // Check if this is a client root
            (!u.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & pr) !== Ce) && (t.flags |= ml, dy());
          }
        }
        return Im(e, t), on(t), null;
      }
      case k: {
        Hp(t);
        var s = Ty(), v = t.type;
        if (e !== null && t.stateNode != null)
          Mb(e, t, v, a, s), e.ref !== t.ref && Ob(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return on(t), null;
          }
          var h = zp(), x = fc(t);
          if (x)
            ED(t, s, h) && ql(t);
          else {
            var S = oC(v, a, s, h, t);
            Lb(S, t, !1, !1), t.stateNode = S, sC(S, v, a, s) && ql(t);
          }
          t.ref !== null && Ob(t);
        }
        return on(t), null;
      }
      case B: {
        var O = a;
        if (e && t.stateNode != null) {
          var V = e.memoizedProps;
          Ab(e, t, V, O);
        } else {
          if (typeof O != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var H = Ty(), re = zp(), Ee = fc(t);
          Ee ? SD(t) && ql(t) : t.stateNode = fC(O, H, re, t);
        }
        return on(t), null;
      }
      case F: {
        Pl(t);
        var he = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var qe = PT(e, t, he);
          if (!qe)
            return t.flags & _n ? t : null;
        }
        if ((t.flags & Xe) !== Ce)
          return t.lanes = n, (t.mode & nt) !== xe && vm(t), t;
        var Pe = he !== null, j = e !== null && e.memoizedState !== null;
        if (Pe !== j && Pe) {
          var P = t.child;
          if (P.flags |= Ci, (t.mode & Ye) !== xe) {
            var w = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            w || Pp(wa.current, _y) ? Bj() : sv();
          }
        }
        var Q = t.updateQueue;
        if (Q !== null && (t.flags |= Qe), on(t), (t.mode & nt) !== xe && Pe) {
          var fe = t.child;
          fe !== null && (t.treeBaseDuration -= fe.treeBaseDuration);
        }
        return null;
      }
      case _:
        return zl(t), Im(e, t), e === null && rD(t.stateNode.containerInfo), on(t), null;
      case K:
        var le = t.type._context;
        return Op(le, t), on(t), null;
      case ie: {
        var De = t.type;
        return Wa(De) && ic(t), on(t), null;
      }
      case U: {
        Pl(t);
        var Le = t.memoizedState;
        if (Le === null)
          return on(t), null;
        var rt = (t.flags & Xe) !== Ce, Ge = Le.rendering;
        if (Ge === null)
          if (rt)
            Vu(Le, !1);
          else {
            var Rt = Yj() && (e === null || (e.flags & Xe) === Ce);
            if (!Rt)
              for (var We = t.child; We !== null; ) {
                var xt = Tc(We);
                if (xt !== null) {
                  rt = !0, t.flags |= Xe, Vu(Le, !1);
                  var En = xt.updateQueue;
                  return En !== null && (t.updateQueue = En, t.flags |= Qe), t.subtreeFlags = Ce, LD(t, n), Zr(t, Bp(wa.current, Su)), t.child;
                }
                We = We.sibling;
              }
            Le.tail !== null && qt() > nN() && (t.flags |= Xe, rt = !0, Vu(Le, !1), t.lanes = Ah);
          }
        else {
          if (!rt) {
            var dn = Tc(Ge);
            if (dn !== null) {
              t.flags |= Xe, rt = !0;
              var ea = dn.updateQueue;
              if (ea !== null && (t.updateQueue = ea, t.flags |= Qe), Vu(Le, !0), Le.tail === null && Le.tailMode === "hidden" && !Ge.alternate && !rn())
                return on(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            qt() * 2 - Le.renderingStartTime > nN() && n !== Gn && (t.flags |= Xe, rt = !0, Vu(Le, !1), t.lanes = Ah);
          }
          if (Le.isBackwards)
            Ge.sibling = t.child, t.child = Ge;
          else {
            var An = Le.last;
            An !== null ? An.sibling = Ge : t.child = Ge, Le.last = Ge;
          }
        }
        if (Le.tail !== null) {
          var Vn = Le.tail;
          Le.rendering = Vn, Le.tail = Vn.sibling, Le.renderingStartTime = qt(), Vn.sibling = null;
          var Sn = wa.current;
          return rt ? Sn = Bp(Sn, Su) : Sn = Hl(Sn), Zr(t, Sn), Vn;
        }
        return on(t), null;
      }
      case ve:
        break;
      case ce:
      case Ae: {
        uv(t);
        var _r = t.memoizedState, eo = _r !== null;
        if (e !== null) {
          var Xu = e.memoizedState, nr = Xu !== null;
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
      case k:
        return Hp(t), null;
      case F: {
        Pl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Vl();
        }
        var u = t.flags;
        return u & _n ? (t.flags = u & ~_n | Xe, (t.mode & nt) !== xe && vm(t), t) : null;
      }
      case U:
        return Pl(t), null;
      case _:
        return zl(t), null;
      case K:
        var s = t.type._context;
        return Op(s, t), null;
      case ce:
      case Ae:
        return uv(t), null;
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
      case k: {
        Hp(t);
        break;
      }
      case _:
        zl(t);
        break;
      case F:
        Pl(t);
        break;
      case U:
        Pl(t);
        break;
      case K:
        var r = t.type._context;
        Op(r, t);
        break;
      case ce:
      case Ae:
        uv(t);
        break;
    }
  }
  var Ub = null;
  Ub = /* @__PURE__ */ new Set();
  var Xc = !1, un = !1, $T = typeof WeakSet == "function" ? WeakSet : Set, de = null, Gl = null, Wl = null;
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
        typeof a == "function" && c("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Me(e));
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
    iC(e.containerInfo), de = t, WT();
    var n = Hb;
    return Hb = !1, n;
  }
  function WT() {
    for (; de !== null; ) {
      var e = de, t = e.child;
      (e.subtreeFlags & Zf) !== Ce && t !== null ? (t.return = e, de = t) : KT();
    }
  }
  function KT() {
    for (; de !== null; ) {
      var e = de;
      mt(e);
      try {
        QT(e);
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
  function QT(e) {
    var t = e.alternate, n = e.flags;
    if ((n & ml) !== Ce) {
      switch (mt(e), e.tag) {
        case R:
        case I:
        case X:
          break;
        case T: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !Ii && (i.props !== e.memoizedProps && c("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(e) || "instance"), i.state !== e.memoizedState && c("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : Oa(e.type, a), r);
            {
              var u = Ub;
              l === void 0 && !u.has(e.type) && (u.add(e.type), c("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Me(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case D: {
          {
            var s = e.stateNode;
            _C(s.containerInfo);
          }
          break;
        }
        case k:
        case B:
        case _:
        case ie:
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
          var u = l.destroy;
          l.destroy = void 0, u !== void 0 && ((e & ln) !== Bn ? fx(t) : (e & Vt) !== Bn && wh(t), (e & Ka) !== Bn && Wu(!0), Jc(t, n, u), (e & Ka) !== Bn && Wu(!1), (e & ln) !== Bn ? dx() : (e & Vt) !== Bn && _h());
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
          (e & ln) !== Bn ? sx(t) : (e & Vt) !== Bn && px(t);
          var l = i.create;
          (e & Ka) !== Bn && Wu(!0), i.destroy = l(), (e & Ka) !== Bn && Wu(!1), (e & ln) !== Bn ? cx() : (e & Vt) !== Bn && mx();
          {
            var u = i.destroy;
            if (u !== void 0 && typeof u != "function") {
              var s = void 0;
              (i.tag & Vt) !== Ce ? s = "useLayoutEffect" : (i.tag & Ka) !== Ce ? s = "useInsertionEffect" : s = "useEffect";
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
  function XT(e, t) {
    if ((t.flags & Qe) !== Ce)
      switch (t.tag) {
        case G: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = nb(), u = t.alternate === null ? "mount" : "update";
          tb() && (u = "nested-update"), typeof i == "function" && i(r, u, n, l);
          var s = t.return;
          e: for (; s !== null; ) {
            switch (s.tag) {
              case D:
                var v = s.stateNode;
                v.passiveEffectDuration += n;
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
  function JT(e, t, n, a) {
    if ((n.flags & _o) !== Ce)
      switch (n.tag) {
        case R:
        case I:
        case X: {
          if (!un)
            if (n.mode & nt)
              try {
                Za(), ni(Vt | At, n);
              } finally {
                Ja(n);
              }
            else
              ni(Vt | At, n);
          break;
        }
        case T: {
          var r = n.stateNode;
          if (n.flags & Qe && !un)
            if (t === null)
              if (n.type === n.elementType && !Ii && (r.props !== n.memoizedProps && c("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(n) || "instance"), r.state !== n.memoizedState && c("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(n) || "instance")), n.mode & nt)
                try {
                  Za(), r.componentDidMount();
                } finally {
                  Ja(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : Oa(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !Ii && (r.props !== n.memoizedProps && c("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(n) || "instance"), r.state !== n.memoizedState && c("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(n) || "instance")), n.mode & nt)
                try {
                  Za(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Ja(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var u = n.updateQueue;
          u !== null && (n.type === n.elementType && !Ii && (r.props !== n.memoizedProps && c("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(n) || "instance"), r.state !== n.memoizedState && c("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(n) || "instance")), Dy(n, u, r));
          break;
        }
        case D: {
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
            Dy(n, s, v);
          }
          break;
        }
        case k: {
          var h = n.stateNode;
          if (t === null && n.flags & Qe) {
            var x = n.type, S = n.memoizedProps;
            hC(h, x, S);
          }
          break;
        }
        case B:
          break;
        case _:
          break;
        case G: {
          {
            var O = n.memoizedProps, V = O.onCommit, H = O.onRender, re = n.stateNode.effectDuration, Ee = nb(), he = t === null ? "mount" : "update";
            tb() && (he = "nested-update"), typeof H == "function" && H(n.memoizedProps.id, he, n.actualDuration, n.treeBaseDuration, n.actualStartTime, Ee);
            {
              typeof V == "function" && V(n.memoizedProps.id, he, re, Ee), Kj(n);
              var qe = n.return;
              e: for (; qe !== null; ) {
                switch (qe.tag) {
                  case D:
                    var Pe = qe.stateNode;
                    Pe.effectDuration += re;
                    break e;
                  case G:
                    var j = qe.stateNode;
                    j.effectDuration += re;
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
        case U:
        case ie:
        case ve:
        case ce:
        case Ae:
        case _e:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    un || n.flags & Ri && Pb(n);
  }
  function ZT(e) {
    switch (e.tag) {
      case R:
      case I:
      case X: {
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
      case k: {
        zb(e, e.return);
        break;
      }
    }
  }
  function ej(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === k) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? DC(r) : jC(a.stateNode, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
        }
      } else if (a.tag === B) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? TC(i) : wC(i, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
      } else if (!((a.tag === ce || a.tag === Ae) && a.memoizedState !== null && a !== e)) {
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
            Za(), r = t(a);
          } finally {
            Ja(e);
          }
        else
          r = t(a);
        typeof r == "function" && c("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Me(e));
      } else
        t.hasOwnProperty("current") || c("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Me(e)), t.current = a;
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
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === k) {
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
    return e.tag === k || e.tag === D || e.tag === _;
  }
  function Yb(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || $b(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== k && t.tag !== B && t.tag !== Z; ) {
        if (t.flags & wt || t.child === null || t.tag === _)
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
      case k: {
        var n = t.stateNode;
        t.flags & wo && (qg(n), t.flags &= ~wo);
        var a = Yb(e);
        Wm(e, a, n);
        break;
      }
      case D:
      case _: {
        var r = t.stateNode.containerInfo, i = Yb(e);
        Gm(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Gm(e, t, n) {
    var a = e.tag, r = a === k || a === B;
    if (r) {
      var i = e.stateNode;
      t ? SC(n, i, t) : NC(n, i);
    } else if (a !== _) {
      var l = e.child;
      if (l !== null) {
        Gm(l, t, n);
        for (var u = l.sibling; u !== null; )
          Gm(u, t, n), u = u.sibling;
      }
    }
  }
  function Wm(e, t, n) {
    var a = e.tag, r = a === k || a === B;
    if (r) {
      var i = e.stateNode;
      t ? EC(n, i, t) : bC(n, i);
    } else if (a !== _) {
      var l = e.child;
      if (l !== null) {
        Wm(l, t, n);
        for (var u = l.sibling; u !== null; )
          Wm(u, t, n), u = u.sibling;
      }
    }
  }
  var sn = null, Aa = !1;
  function rj(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case k: {
            sn = a.stateNode, Aa = !1;
            break e;
          }
          case D: {
            sn = a.stateNode.containerInfo, Aa = !0;
            break e;
          }
          case _: {
            sn = a.stateNode.containerInfo, Aa = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (sn === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      Ib(e, t, n), sn = null, Aa = !1;
    }
    tj(n);
  }
  function ai(e, t, n) {
    for (var a = n.child; a !== null; )
      Ib(e, t, a), a = a.sibling;
  }
  function Ib(e, t, n) {
    switch (ix(n), n.tag) {
      case k:
        un || Kl(n, t);
      case B: {
        {
          var a = sn, r = Aa;
          sn = null, ai(e, t, n), sn = a, Aa = r, sn !== null && (Aa ? RC(sn, n.stateNode) : xC(sn, n.stateNode));
        }
        return;
      }
      case Z: {
        sn !== null && (Aa ? CC(sn, n.stateNode) : ip(sn, n.stateNode));
        return;
      }
      case _: {
        {
          var i = sn, l = Aa;
          sn = n.stateNode.containerInfo, Aa = !0, ai(e, t, n), sn = i, Aa = l;
        }
        return;
      }
      case R:
      case I:
      case Y:
      case X: {
        if (!un) {
          var u = n.updateQueue;
          if (u !== null) {
            var s = u.lastEffect;
            if (s !== null) {
              var v = s.next, h = v;
              do {
                var x = h, S = x.destroy, O = x.tag;
                S !== void 0 && ((O & Ka) !== Bn ? Jc(n, t, S) : (O & Vt) !== Bn && (wh(n), n.mode & nt ? (Za(), Jc(n, t, S), Ja(n)) : Jc(n, t, S), _h())), h = h.next;
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
          var V = n.stateNode;
          typeof V.componentWillUnmount == "function" && qm(n, t, V);
        }
        ai(e, t, n);
        return;
      }
      case ve: {
        ai(e, t, n);
        return;
      }
      case ce: {
        if (
          // TODO: Remove this dead flag
          n.mode & Ye
        ) {
          var H = un;
          un = H || n.memoizedState !== null, ai(e, t, n), un = H;
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
              Gu(Wl, Gl);
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
        } catch (s) {
          lt(i, t, s);
        }
      }
    var l = fs();
    if (t.subtreeFlags & ed)
      for (var u = t.child; u !== null; )
        mt(u), Gb(u, e), u = u.sibling;
    mt(l);
  }
  function Gb(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case R:
      case I:
      case Y:
      case X: {
        if (Va(t, e), er(e), r & Qe) {
          try {
            Ma(Ka | At, e, e.return), ni(Ka | At, e);
          } catch (De) {
            lt(e, e.return, De);
          }
          if (e.mode & nt) {
            try {
              Za(), Ma(Vt | At, e, e.return);
            } catch (De) {
              lt(e, e.return, De);
            }
            Ja(e);
          } else
            try {
              Ma(Vt | At, e, e.return);
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
      case k: {
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
              var u = e.memoizedProps, s = a !== null ? a.memoizedProps : u, v = e.type, h = e.updateQueue;
              if (e.updateQueue = null, h !== null)
                try {
                  gC(l, h, v, s, u, e);
                } catch (De) {
                  lt(e, e.return, De);
                }
            }
          }
        }
        return;
      }
      case B: {
        if (Va(t, e), er(e), r & Qe) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var x = e.stateNode, S = e.memoizedProps, O = a !== null ? a.memoizedProps : S;
          try {
            yC(x, O, S);
          } catch (De) {
            lt(e, e.return, De);
          }
        }
        return;
      }
      case D: {
        if (Va(t, e), er(e), r & Qe && a !== null) {
          var V = a.memoizedState;
          if (V.isDehydrated)
            try {
              $C(t.containerInfo);
            } catch (De) {
              lt(e, e.return, De);
            }
        }
        return;
      }
      case _: {
        Va(t, e), er(e);
        return;
      }
      case F: {
        Va(t, e), er(e);
        var H = e.child;
        if (H.flags & Ci) {
          var re = H.stateNode, Ee = H.memoizedState, he = Ee !== null;
          if (re.isHidden = he, he) {
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
      case ce: {
        var Pe = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Ye
        ) {
          var j = un;
          un = j || Pe, Va(t, e), un = j;
        } else
          Va(t, e);
        if (er(e), r & Ci) {
          var P = e.stateNode, w = e.memoizedState, Q = w !== null, fe = e;
          if (P.isHidden = Q, Q && !Pe && (fe.mode & Ye) !== xe) {
            de = fe;
            for (var le = fe.child; le !== null; )
              de = le, sj(le), le = le.sibling;
          }
          ej(fe, Q);
        }
        return;
      }
      case U: {
        Va(t, e), er(e), r & Qe && qb(e);
        return;
      }
      case ve:
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
  function uj(e, t, n) {
    Gl = n, Wl = t, de = e, Wb(e, t, n), Gl = null, Wl = null;
  }
  function Wb(e, t, n) {
    for (var a = (e.mode & Ye) !== xe; de !== null; ) {
      var r = de, i = r.child;
      if (r.tag === ce && a) {
        var l = r.memoizedState !== null, u = l || Xc;
        if (u) {
          Km(e, t, n);
          continue;
        } else {
          var s = r.alternate, v = s !== null && s.memoizedState !== null, h = v || un, x = Xc, S = un;
          Xc = u, un = h, un && !S && (de = r, cj(r));
          for (var O = i; O !== null; )
            de = O, Wb(
              O,
              // New root; bubble back up to here and stop.
              t,
              n
            ), O = O.sibling;
          de = r, Xc = x, un = S, Km(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & _o) !== Ce && i !== null ? (i.return = r, de = i) : Km(e, t, n);
    }
  }
  function Km(e, t, n) {
    for (; de !== null; ) {
      var a = de;
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
  function sj(e) {
    for (; de !== null; ) {
      var t = de, n = t.child;
      switch (t.tag) {
        case R:
        case I:
        case Y:
        case X: {
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
        case k: {
          Kl(t, t.return);
          break;
        }
        case ce: {
          var r = t.memoizedState !== null;
          if (r) {
            Kb(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, de = n) : Kb(e);
    }
  }
  function Kb(e) {
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
  function cj(e) {
    for (; de !== null; ) {
      var t = de, n = t.child;
      if (t.tag === ce) {
        var a = t.memoizedState !== null;
        if (a) {
          Qb(e);
          continue;
        }
      }
      n !== null ? (n.return = t, de = n) : Qb(e);
    }
  }
  function Qb(e) {
    for (; de !== null; ) {
      var t = de;
      mt(t);
      try {
        ZT(t);
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
  function fj(e, t, n, a) {
    de = t, dj(t, e, n, a);
  }
  function dj(e, t, n, a) {
    for (; de !== null; ) {
      var r = de, i = r.child;
      (r.subtreeFlags & vl) !== Ce && i !== null ? (i.return = r, de = i) : pj(e, t, n, a);
    }
  }
  function pj(e, t, n, a) {
    for (; de !== null; ) {
      var r = de;
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
  function mj(e, t, n, a) {
    switch (t.tag) {
      case R:
      case I:
      case X: {
        if (t.mode & nt) {
          mm();
          try {
            ni(ln | At, t);
          } finally {
            pm(t);
          }
        } else
          ni(ln | At, t);
        break;
      }
    }
  }
  function vj(e) {
    de = e, hj();
  }
  function hj() {
    for (; de !== null; ) {
      var e = de, t = e.child;
      if ((de.flags & xi) !== Ce) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            de = r, bj(r, e);
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
      (e.subtreeFlags & vl) !== Ce && t !== null ? (t.return = e, de = t) : gj();
    }
  }
  function gj() {
    for (; de !== null; ) {
      var e = de;
      (e.flags & Fr) !== Ce && (mt(e), yj(e), It());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, de = t;
        return;
      }
      de = e.return;
    }
  }
  function yj(e) {
    switch (e.tag) {
      case R:
      case I:
      case X: {
        e.mode & nt ? (mm(), Ma(ln | At, e, e.return), pm(e)) : Ma(ln | At, e, e.return);
        break;
      }
    }
  }
  function bj(e, t) {
    for (; de !== null; ) {
      var n = de;
      mt(n), Ej(n, t), It();
      var a = n.child;
      a !== null ? (a.return = n, de = a) : Nj(e);
    }
  }
  function Nj(e) {
    for (; de !== null; ) {
      var t = de, n = t.sibling, a = t.return;
      if (Bb(t), t === e) {
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
  function Ej(e, t) {
    switch (e.tag) {
      case R:
      case I:
      case X: {
        e.mode & nt ? (mm(), Ma(ln, e, t), pm(e)) : Ma(ln, e, t);
        break;
      }
    }
  }
  function Sj(e) {
    switch (e.tag) {
      case R:
      case I:
      case X: {
        try {
          ni(Vt | At, e);
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
      case I:
      case X: {
        try {
          ni(ln | At, e);
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
      case I:
      case X: {
        try {
          Ma(Vt | At, e, e.return);
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
      case I:
      case X:
        try {
          Ma(ln | At, e, e.return);
        } catch (t) {
          lt(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var ku = Symbol.for;
    ku("selector.component"), ku("selector.has_pseudo_class"), ku("selector.role"), ku("selector.test_id"), ku("selector.text");
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
      return !e && jj.current !== null && c("The current testing environment is not configured to support act(...)"), e;
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
  ), Dr = 0, Uu = 1, qi = 2, Zc = 3, Fu = 4, Zb = 5, Jm = 6, Ie = Ft, Ln = null, bt = null, zt = q, tr = q, Zm = Gr(q), Ht = Dr, zu = null, ef = q, Hu = q, tf = q, Pu = null, $n = null, ev = 0, eN = 500, tN = 1 / 0, Oj = 500, Tr = null;
  function Bu() {
    tN = qt() + Oj;
  }
  function nN() {
    return tN;
  }
  var nf = !1, tv = null, Ql = null, Gi = !1, ri = null, $u = q, nv = [], av = null, Lj = 50, Yu = 0, rv = null, iv = !1, af = !1, Mj = 50, Xl = 0, rf = null, Iu = st, lf = q, aN = !1;
  function of() {
    return Ln;
  }
  function Mn() {
    return (Ie & (fn | da)) !== Ft ? qt() : (Iu !== st || (Iu = qt()), Iu);
  }
  function ii(e) {
    var t = e.mode;
    if ((t & Ye) === xe)
      return je;
    if ((Ie & fn) !== Ft && zt !== q)
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
  function Aj(e) {
    var t = e.mode;
    return (t & Ye) === xe ? je : kx();
  }
  function Pt(e, t, n, a) {
    r1(), aN && c("useInsertionEffect must not schedule updates."), iv && (af = !0), Fo(e, n, a), (Ie & fn) !== q && e === Ln ? o1(t) : (Ra && Ph(e, t, n), u1(t), e === Ln && ((Ie & fn) === Ft && (Hu = ke(Hu, n)), Ht === Fu && li(e, zt)), Yn(e, a), n === je && Ie === Ft && (t.mode & Ye) === xe && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !ka.isBatchingLegacy && (Bu(), ay()));
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
    var a = Ts(e, e === Ln ? zt : q);
    if (a === q) {
      n !== null && bN(n), e.callbackNode = null, e.callbackPriority = Wt;
      return;
    }
    var r = Oi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(ka.current !== null && n !== dv)) {
      n == null && i !== je && c("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && bN(n);
    var l;
    if (r === je)
      e.tag === Wr ? (ka.isBatchingLegacy !== null && (ka.didScheduleLegacyUpdate = !0), cD(lN.bind(null, e))) : ny(lN.bind(null, e)), ka.current !== null ? ka.current.push(Kr) : mC(function() {
        (Ie & (fn | da)) === Ft && Kr();
      }), l = null;
    else {
      var u;
      switch (Yh(a)) {
        case Kn:
          u = xs;
          break;
        case gr:
          u = td;
          break;
        case yr:
          u = ji;
          break;
        case _s:
          u = nd;
          break;
        default:
          u = ji;
          break;
      }
      l = pv(u, rN.bind(null, e));
    }
    e.callbackPriority = r, e.callbackNode = l;
  }
  function rN(e, t) {
    if (eT(), Iu = st, lf = q, (Ie & (fn | da)) !== Ft)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = wr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Ts(e, e === Ln ? zt : q);
    if (r === q)
      return null;
    var i = !js(e, r) && !Vx(e, r) && !t, l = i ? qj(e, r) : sf(e, r);
    if (l !== Dr) {
      if (l === qi) {
        var u = Rd(e);
        u !== q && (r = u, l = lv(e, u));
      }
      if (l === Uu) {
        var s = zu;
        throw Wi(e, q), li(e, r), Yn(e, qt()), s;
      }
      if (l === Jm)
        li(e, r);
      else {
        var v = !js(e, r), h = e.current.alternate;
        if (v && !Fj(h)) {
          if (l = sf(e, r), l === qi) {
            var x = Rd(e);
            x !== q && (r = x, l = lv(e, x));
          }
          if (l === Uu) {
            var S = zu;
            throw Wi(e, q), li(e, r), Yn(e, qt()), S;
          }
        }
        e.finishedWork = h, e.finishedLanes = r, Uj(e, l, r);
      }
    }
    return Yn(e, qt()), e.callbackNode === n ? rN.bind(null, e) : null;
  }
  function lv(e, t) {
    var n = Pu;
    if (Os(e)) {
      var a = Wi(e, t);
      a.flags |= pr, aD(e.containerInfo);
    }
    var r = sf(e, t);
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
      case Uu:
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
            var r = Ts(e, q);
            if (r !== q)
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
      case Fu: {
        if (li(e, n), Ax(n))
          break;
        if (!NN()) {
          var l = jx(e, n), u = l, s = qt() - u, v = a1(s) - s;
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
      if (t.subtreeFlags & Wf && s !== null) {
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
    t = ws(t, tf), t = ws(t, Hu), Fx(e, t);
  }
  function lN(e) {
    if (tT(), (Ie & (fn | da)) !== Ft)
      throw new Error("Should not already be working.");
    wr();
    var t = Ts(e, q);
    if (!Wn(t, je))
      return Yn(e, qt()), null;
    var n = sf(e, t);
    if (e.tag !== Wr && n === qi) {
      var a = Rd(e);
      a !== q && (t = a, n = lv(e, a));
    }
    if (n === Uu) {
      var r = zu;
      throw Wi(e, q), li(e, t), Yn(e, qt()), r;
    }
    if (n === Jm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Ki(e, $n, Tr), Yn(e, qt()), null;
  }
  function zj(e, t) {
    t !== q && (jd(e, ke(t, je)), Yn(e, qt()), (Ie & (fn | da)) === Ft && (Bu(), Kr()));
  }
  function ov(e, t) {
    var n = Ie;
    Ie |= Jb;
    try {
      return e(t);
    } finally {
      Ie = n, Ie === Ft && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !ka.isBatchingLegacy && (Bu(), ay());
    }
  }
  function Hj(e, t, n, a, r) {
    var i = Ca(), l = cn.transition;
    try {
      return cn.transition = null, Kt(Kn), e(t, n, a, r);
    } finally {
      Kt(i), cn.transition = l, Ie === Ft && Bu();
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
  function uf(e, t) {
    bn(Zm, tr, e), tr = ke(tr, t);
  }
  function uv(e) {
    tr = Zm.current, yn(Zm, e);
  }
  function Wi(e, t) {
    e.finishedWork = null, e.finishedLanes = q;
    var n = e.timeoutHandle;
    if (n !== rp && (e.timeoutHandle = rp, pC(n)), bt !== null)
      for (var a = bt.return; a !== null; ) {
        var r = a.alternate;
        kb(r, a), a = a.return;
      }
    Ln = e;
    var i = Qi(e.current, null);
    return bt = i, zt = tr = t, Ht = Dr, zu = null, ef = q, Hu = q, tf = q, Pu = null, $n = null, VD(), ja.discardPendingWarnings(), i;
  }
  function uN(e, t) {
    do {
      var n = bt;
      try {
        if (gc(), Ly(), It(), Xm.current = null, n === null || n.return === null) {
          Ht = Uu, zu = t, bt = null;
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
  function sN() {
    var e = Qm.current;
    return Qm.current = Pc, e === null ? Pc : e;
  }
  function cN(e) {
    Qm.current = e;
  }
  function Pj() {
    ev = qt();
  }
  function qu(e) {
    ef = ke(e, ef);
  }
  function Bj() {
    Ht === Dr && (Ht = Zc);
  }
  function sv() {
    (Ht === Dr || Ht === Zc || Ht === qi) && (Ht = Fu), Ln !== null && (Cd(ef) || Cd(Hu)) && li(Ln, zt);
  }
  function $j(e) {
    Ht !== Fu && (Ht = qi), Pu === null ? Pu = [e] : Pu.push(e);
  }
  function Yj() {
    return Ht === Dr;
  }
  function sf(e, t) {
    var n = Ie;
    Ie |= fn;
    var a = sN();
    if (Ln !== e || zt !== t) {
      if (Ra) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gu(e, zt), r.clear()), Bh(e, t);
      }
      Tr = $h(), Wi(e, t);
    }
    Oh(t);
    do
      try {
        Ij();
        break;
      } catch (i) {
        uN(e, i);
      }
    while (!0);
    if (gc(), Ie = n, cN(a), bt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Lh(), Ln = null, zt = q, Ht;
  }
  function Ij() {
    for (; bt !== null; )
      fN(bt);
  }
  function qj(e, t) {
    var n = Ie;
    Ie |= fn;
    var a = sN();
    if (Ln !== e || zt !== t) {
      if (Ra) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gu(e, zt), r.clear()), Bh(e, t);
      }
      Tr = $h(), Bu(), Wi(e, t);
    }
    Oh(t);
    do
      try {
        Gj();
        break;
      } catch (i) {
        uN(e, i);
      }
    while (!0);
    return gc(), cN(a), Ie = n, bt !== null ? (Ex(), Dr) : (Lh(), Ln = null, zt = q, Ht);
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
      if ((t.flags & Ss) === Ce) {
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
          for (var l = t.actualDuration, u = t.child; u !== null; )
            l += u.actualDuration, u = u.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= Ss, a.subtreeFlags = Ce, a.deletions = null;
        else {
          Ht = Jm, bt = null;
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
    if (ux(i), r === null)
      return jh(), null;
    if (i === q && c("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = q, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = Wt;
    var l = ke(r.lanes, r.childLanes);
    zx(e, l), e === Ln && (Ln = null, bt = null, zt = q), ((r.subtreeFlags & vl) !== Ce || (r.flags & vl) !== Ce) && (Gi || (Gi = !0, av = n, pv(ji, function() {
      return wr(), null;
    })));
    var u = (r.subtreeFlags & (Zf | ed | _o | vl)) !== Ce, s = (r.flags & (Zf | ed | _o | vl)) !== Ce;
    if (u || s) {
      var v = cn.transition;
      cn.transition = null;
      var h = Ca();
      Kt(Kn);
      var x = Ie;
      Ie |= da, Xm.current = null, GT(e, r), ab(), oj(e, r, i), lC(e.containerInfo), e.current = r, gx(i), uj(r, e, i), yx(), QS(), Ie = x, Kt(h), cn.transition = v;
    } else
      e.current = r, ab();
    var S = Gi;
    if (Gi ? (Gi = !1, ri = e, $u = i) : (Xl = 0, rf = null), l = e.pendingLanes, l === q && (Ql = null), S || hN(e.current, !1), ax(r.stateNode, a), Ra && e.memoizedUpdaters.clear(), Tj(), Yn(e, qt()), t !== null)
      for (var O = e.onRecoverableError, V = 0; V < t.length; V++) {
        var H = t[V], re = H.stack, Ee = H.digest;
        O(H.value, {
          componentStack: re,
          digest: Ee
        });
      }
    if (nf) {
      nf = !1;
      var he = tv;
      throw tv = null, he;
    }
    return Wn($u, je) && e.tag !== Wr && wr(), l = e.pendingLanes, Wn(l, je) ? (ZD(), e === rv ? Yu++ : (Yu = 0, rv = e)) : Yu = 0, Kr(), jh(), null;
  }
  function wr() {
    if (ri !== null) {
      var e = Yh($u), t = $x(yr, e), n = cn.transition, a = Ca();
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
    var t = ri, n = $u;
    if (ri = null, $u = q, (Ie & (fn | da)) !== Ft)
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
      var u = t.current.stateNode;
      u.effectDuration = 0, u.passiveEffectDuration = 0;
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
    if (YT(n), Wu(!1), e.tag === D) {
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
          var l = Yi(n, e), u = _m(a, l, je), s = Xr(a, u, je), v = Mn();
          s !== null && (Fo(s, je, v), Yn(s, v));
          return;
        }
      }
      a = a.return;
    }
    c(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function e1(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = Mn();
    Hh(e, n), s1(e), Ln === e && El(zt, n) && (Ht === Fu || Ht === Zc && kh(zt) && qt() - ev < eN ? Wi(e, q) : tf = ke(tf, n)), Yn(e, r);
  }
  function vN(e, t) {
    t === Wt && (t = Aj(e));
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
      case U:
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
    if (Yu > Lj)
      throw Yu = 0, rv = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Xl > Mj && (Xl = 0, rf = null, c("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
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
      if (t !== L && t !== D && t !== T && t !== R && t !== I && t !== Y && t !== X)
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
        mt(e), c("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
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
        if (gc(), Ly(), kb(e, t), CN(t, a), t.mode & nt && dm(t), qf(null, _b, null, e, t, n), HS()) {
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
        case I:
        case X: {
          var t = bt && Me(bt) || "Unknown", n = t;
          if (!fv.has(n)) {
            fv.add(n);
            var a = Me(e) || "Unknown";
            c("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", a, t, t);
          }
          break;
        }
        case T: {
          yN || (c("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), yN = !0);
          break;
        }
      }
  }
  function Gu(e, t) {
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
  function u1(e) {
    {
      if (e.mode & Ye) {
        if (!Xb())
          return;
      } else if (!wj() || Ie !== Ft || e.tag !== R && e.tag !== I && e.tag !== X)
        return;
      if (ka.current === null) {
        var t = Tn;
        try {
          mt(e), c(`An update to %s inside a test was not wrapped in act(...).

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
  function s1(e) {
    e.tag !== Wr && Xb() && ka.current === null && c(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
  }
  function Wu(e) {
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
        case R: {
          (typeof a == "function" || i === Se) && (r = !0);
          break;
        }
        case I: {
          (i === Ne || i === Se) && (r = !0);
          break;
        }
        case Y:
        case X: {
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
        Ku(t, e, null, null);
      });
    }
  };
  function hv(e, t, n) {
    {
      var a = e.alternate, r = e.child, i = e.sibling, l = e.tag, u = e.type, s = null;
      switch (l) {
        case R:
        case X:
        case T:
          s = u;
          break;
        case I:
          s = u.render;
          break;
      }
      if (pa === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var v = !1, h = !1;
      if (s !== null) {
        var x = pa(s);
        x !== void 0 && (n.has(x) ? h = !0 : t.has(x) && (l === T ? h = !0 : v = !0));
      }
      if (Jl !== null && (Jl.has(e) || a !== null && Jl.has(a)) && (h = !0), h && (e._debugNeedsRemount = !0), h || v) {
        var S = Pn(e, je);
        S !== null && Pt(S, e, je, st);
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
      var a = e.child, r = e.sibling, i = e.tag, l = e.type, u = null;
      switch (i) {
        case R:
        case X:
        case T:
          u = l;
          break;
        case I:
          u = l.render;
          break;
      }
      var s = !1;
      u !== null && t.has(u) && (s = !0), s ? m1(e, n) : a !== null && gv(a, t, n), r !== null && gv(r, t, n);
    }
  }
  function m1(e, t) {
    {
      var n = v1(e, t);
      if (n)
        return;
      for (var a = e; ; ) {
        switch (a.tag) {
          case k:
            t.add(a.stateNode);
            return;
          case _:
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
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Ce, this.subtreeFlags = Ce, this.deletions = null, this.lanes = q, this.childLanes = q, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !yv && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
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
      if (t === Ne)
        return I;
      if (t === Ve)
        return Y;
    }
    return L;
  }
  function Qi(e, t) {
    var n = e.alternate;
    n === null ? (n = Zn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Ce, n.subtreeFlags = Ce, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & vr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case L:
      case R:
      case X:
        n.type = Zl(e.type);
        break;
      case T:
        n.type = mv(e.type);
        break;
      case I:
        n.type = vv(e.type);
        break;
    }
    return n;
  }
  function b1(e, t) {
    e.flags &= vr | wt;
    var n = e.alternate;
    if (n === null)
      e.childLanes = q, e.lanes = t, e.child = null, e.subtreeFlags = Ce, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
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
    var l = L, u = e;
    if (typeof e == "function")
      bv(e) ? (l = T, u = mv(u)) : u = Zl(u);
    else if (typeof e == "string")
      l = k;
    else
      e: switch (e) {
        case Pa:
          return oi(n.children, r, i, t);
        case pi:
          l = te, r |= St, (r & Ye) !== xe && (r |= Ia);
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
        case Lt:
        case Ba:
        case Ea:
        case ft:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case W:
                l = K;
                break e;
              case ae:
                l = me;
                break e;
              case Ne:
                l = I, u = vv(u);
                break e;
              case Ve:
                l = Y;
                break e;
              case Se:
                l = ye, u = null;
                break e;
            }
          var s = "";
          {
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var v = a ? Me(a) : null;
            v && (s += `

Check the render method of \`` + v + "`.");
          }
          throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + s));
        }
      }
    var h = Zn(l, n, t, r);
    return h.elementType = e, h.type = u, h.lanes = i, h._debugOwner = a, h;
  }
  function Ev(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, u = Nv(r, i, l, a, t, n);
    return u._debugSource = e._source, u._debugOwner = e._owner, u;
  }
  function oi(e, t, n, a) {
    var r = Zn(ue, e, a, t);
    return r.lanes = n, r;
  }
  function E1(e, t, n, a) {
    typeof e.id != "string" && c('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
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
    var r = Zn(U, e, a, t);
    return r.elementType = Te, r.lanes = n, r;
  }
  function RN(e, t, n, a) {
    var r = Zn(ce, e, a, t);
    r.elementType = dt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function Sv(e, t, n) {
    var a = Zn(B, e, null, t);
    return a.lanes = n, a;
  }
  function R1() {
    var e = Zn(k, null, null, xe);
    return e.elementType = "DELETED", e;
  }
  function C1(e) {
    var t = Zn(Z, null, null, xe);
    return t.stateNode = e, t;
  }
  function xv(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Zn(_, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function CN(e, t) {
    return e === null && (e = Zn(L, null, null, xe)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function D1(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = rp, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Wt, this.eventTimes = Td(q), this.expirationTimes = Td(st), this.pendingLanes = q, this.suspendedLanes = q, this.pingedLanes = q, this.expiredLanes = q, this.mutableReadLanes = q, this.finishedLanes = q, this.entangledLanes = q, this.entanglements = Td(q), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
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
  function DN(e, t, n, a, r, i, l, u, s, v) {
    var h = new D1(e, t, n, u, s), x = N1(t, i);
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
    var t = dl(e), n = sD(t);
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
            mt(r), n.mode & St ? c("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : c("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            l ? mt(l) : It();
          }
        }
      }
      return r.stateNode;
    }
  }
  function jN(e, t, n, a, r, i, l, u) {
    var s = !1, v = null;
    return DN(e, t, s, v, n, a, r, i, l);
  }
  function wN(e, t, n, a, r, i, l, u, s, v) {
    var h = !0, x = DN(n, a, h, e, r, i, l, u, s);
    x.context = TN(null);
    var S = x.current, O = Mn(), V = ii(S), H = Rr(O, V);
    return H.callback = t ?? null, Xr(S, H, V), Vj(x, V, O), x;
  }
  function Ku(e, t, n, a) {
    nx(t, e);
    var r = t.current, i = Mn(), l = ii(r);
    Sx(l);
    var u = TN(n);
    t.context === null ? t.context = u : t.pendingContext = u, bi && Tn !== null && !Cv && (Cv = !0, c(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Me(Tn) || "Unknown"));
    var s = Rr(i, l);
    s.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && c("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), s.callback = a);
    var v = Xr(r, s, l);
    return v !== null && (Pt(v, r, l, i), Sc(v, r, l)), l;
  }
  function df(e) {
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
  function w1(e) {
    switch (e.tag) {
      case D: {
        var t = e.stateNode;
        if (Os(t)) {
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
      var t = Ao, n = Pn(e, t);
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
  var LN = function(e) {
    return null;
  };
  function L1(e) {
    return LN(e);
  }
  var MN = function(e) {
    return !1;
  };
  function M1(e) {
    return MN(e);
  }
  var AN = null, VN = null, kN = null, UN = null, FN = null, zN = null, HN = null, PN = null, BN = null;
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
    AN = function(e, t, n, a) {
      var r = jv(e, t);
      if (r !== null) {
        var i = WN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ze({}, e.memoizedProps);
        var l = Pn(e, je);
        l !== null && Pt(l, e, je, st);
      }
    }, VN = function(e, t, n) {
      var a = jv(e, t);
      if (a !== null) {
        var r = YN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = ze({}, e.memoizedProps);
        var i = Pn(e, je);
        i !== null && Pt(i, e, je, st);
      }
    }, kN = function(e, t, n, a) {
      var r = jv(e, t);
      if (r !== null) {
        var i = qN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ze({}, e.memoizedProps);
        var l = Pn(e, je);
        l !== null && Pt(l, e, je, st);
      }
    }, UN = function(e, t, n) {
      e.pendingProps = WN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Pn(e, je);
      a !== null && Pt(a, e, je, st);
    }, FN = function(e, t) {
      e.pendingProps = YN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Pn(e, je);
      n !== null && Pt(n, e, je, st);
    }, zN = function(e, t, n) {
      e.pendingProps = qN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Pn(e, je);
      a !== null && Pt(a, e, je, st);
    }, HN = function(e) {
      var t = Pn(e, je);
      t !== null && Pt(t, e, je, st);
    }, PN = function(e) {
      LN = e;
    }, BN = function(e) {
      MN = e;
    };
  }
  function A1(e) {
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
      overrideHookState: AN,
      overrideHookStateDeletePath: VN,
      overrideHookStateRenamePath: kN,
      overrideProps: UN,
      overridePropsDeletePath: FN,
      overridePropsRenamePath: zN,
      setErrorHandler: PN,
      setSuspenseHandler: BN,
      scheduleUpdate: HN,
      currentDispatcherRef: n,
      findHostInstanceByFiber: A1,
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
      typeof arguments[1] == "function" ? c("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : mf(arguments[1]) ? c("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && c("You passed a second argument to root.render(...) but it only accepts one argument.");
      var n = t.containerInfo;
      if (n.nodeType !== jt) {
        var a = ON(t.current);
        a && a.parentNode !== n && c("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
      }
    }
    Ku(e, t, null, null);
  }, pf.prototype.unmount = wv.prototype.unmount = function() {
    typeof arguments[0] == "function" && c("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      oN() && c("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), jr(function() {
        Ku(null, e, null, null);
      }), Kg(t);
    }
  };
  function F1(e, t) {
    if (!mf(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    QN(e);
    var n = !1, a = !1, r = "", i = KN;
    t != null && (t.hydrate ? E("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ia && c(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = jN(e, oc, null, n, a, r, i);
    ec(l.current, e);
    var u = e.nodeType === jt ? e.parentNode : e;
    return tu(u), new wv(l);
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
    QN(e), t === void 0 && c("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, u = "", s = KN;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError));
    var v = wN(t, null, e, oc, a, i, l, u, s);
    if (ec(v.current, e), tu(e), r)
      for (var h = 0; h < r.length; h++) {
        var x = r[h];
        YD(v, x);
      }
    return new pf(v);
  }
  function mf(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === dr || e.nodeType === Vf));
  }
  function Qu(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === dr || e.nodeType === Vf || e.nodeType === jt && e.nodeValue === " react-mount-point-unstable "));
  }
  function QN(e) {
    e.nodeType === zn && e.tagName && e.tagName.toUpperCase() === "BODY" && c("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), du(e) && (e._reactRootContainer ? c("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : c("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var P1 = m.ReactCurrentOwner, XN;
  XN = function(e) {
    if (e._reactRootContainer && e.nodeType !== jt) {
      var t = ON(e._reactRootContainer.current);
      t && t.parentNode !== e && c("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = _v(e), r = !!(a && qr(a));
    r && !n && c("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === zn && e.tagName && e.tagName.toUpperCase() === "BODY" && c("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
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
      var u = e.nodeType === jt ? e.parentNode : e;
      return tu(u), jr(), l;
    } else {
      for (var s; s = e.lastChild; )
        e.removeChild(s);
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
      return tu(x), jr(function() {
        Ku(t, h, n, a);
      }), h;
    }
  }
  function $1(e, t) {
    e !== null && typeof e != "function" && c("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function vf(e, t, n, a, r) {
    XN(n), $1(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = B1(n, t, e, r, a);
    else {
      if (l = i, typeof r == "function") {
        var u = r;
        r = function() {
          var s = df(l);
          u.call(s);
        };
      }
      Ku(t, l, e, r);
    }
    return df(l);
  }
  var ZN = !1;
  function Y1(e) {
    {
      ZN || (ZN = !0, c("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = P1.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || c("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ke(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === zn ? e : j1(e, "findDOMNode");
  }
  function I1(e, t, n) {
    if (c("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = du(t) && t._reactRootContainer === void 0;
      a && c("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return vf(null, e, t, !0, n);
  }
  function q1(e, t, n) {
    if (c("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = du(t) && t._reactRootContainer === void 0;
      a && c("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return vf(null, e, t, !1, n);
  }
  function G1(e, t, n, a) {
    if (c("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qu(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !PS(e))
      throw new Error("parentComponent must be a valid React Component");
    return vf(e, t, n, !1, a);
  }
  var eE = !1;
  function W1(e) {
    if (eE || (eE = !0, c("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Qu(e))
      throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
    {
      var t = du(e) && e._reactRootContainer === void 0;
      t && c("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
    }
    if (e._reactRootContainer) {
      {
        var n = _v(e), a = n && !qr(n);
        a && c("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
      }
      return jr(function() {
        vf(null, null, e, !1, function() {
          e._reactRootContainer = null, Kg(e);
        });
      }), !0;
    } else {
      {
        var r = _v(e), i = !!(r && qr(r)), l = e.nodeType === zn && Qu(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && c("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  Yx(w1), qx(_1), Gx(O1), Wx(Ca), Kx(Px), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && c("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), _S(Q0), MS(ov, Hj, jr);
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
    return Ov.usingClientEntryPoint || c('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), F1(e, t);
  }
  function J1(e, t, n) {
    return Ov.usingClientEntryPoint || c('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), H1(e, t, n);
  }
  function Z1(e) {
    return oN() && c("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), jr(e);
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
var sw = bE.exports, SE, nE = sw;
{
  var aE = nE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  SE = function(o, d) {
    aE.usingClientEntryPoint = !0;
    try {
      return nE.createRoot(o, d);
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
function Ju() {
  return Ju = Object.assign ? Object.assign.bind() : function(o) {
    for (var d = 1; d < arguments.length; d++) {
      var m = arguments[d];
      for (var g in m)
        Object.prototype.hasOwnProperty.call(m, g) && (o[g] = m[g]);
    }
    return o;
  }, Ju.apply(this, arguments);
}
var ui;
(function(o) {
  o.Pop = "POP", o.Push = "PUSH", o.Replace = "REPLACE";
})(ui || (ui = {}));
const rE = "popstate";
function cw(o) {
  o === void 0 && (o = {});
  function d(g, y) {
    let {
      pathname: E,
      search: c,
      hash: M
    } = g.location;
    return Vv(
      "",
      {
        pathname: E,
        search: c,
        hash: M
      },
      // state defaults to `null` because `window.history.state` does
      y.state && y.state.usr || null,
      y.state && y.state.key || "default"
    );
  }
  function m(g, y) {
    return typeof y == "string" ? y : Zu(y);
  }
  return dw(d, m, null, o);
}
function ht(o, d) {
  if (o === !1 || o === null || typeof o > "u")
    throw new Error(d);
}
function Ua(o, d) {
  if (!o) {
    typeof console < "u" && console.warn(d);
    try {
      throw new Error(d);
    } catch {
    }
  }
}
function fw() {
  return Math.random().toString(36).substr(2, 8);
}
function iE(o, d) {
  return {
    usr: o.state,
    key: o.key,
    idx: d
  };
}
function Vv(o, d, m, g) {
  return m === void 0 && (m = null), Ju({
    pathname: typeof o == "string" ? o : o.pathname,
    search: "",
    hash: ""
  }, typeof d == "string" ? ao(d) : d, {
    state: m,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: d && d.key || g || fw()
  });
}
function Zu(o) {
  let {
    pathname: d = "/",
    search: m = "",
    hash: g = ""
  } = o;
  return m && m !== "?" && (d += m.charAt(0) === "?" ? m : "?" + m), g && g !== "#" && (d += g.charAt(0) === "#" ? g : "#" + g), d;
}
function ao(o) {
  let d = {};
  if (o) {
    let m = o.indexOf("#");
    m >= 0 && (d.hash = o.substr(m), o = o.substr(0, m));
    let g = o.indexOf("?");
    g >= 0 && (d.search = o.substr(g), o = o.substr(0, g)), o && (d.pathname = o);
  }
  return d;
}
function dw(o, d, m, g) {
  g === void 0 && (g = {});
  let {
    window: y = document.defaultView,
    v5Compat: E = !1
  } = g, c = y.history, M = ui.Pop, R = null, T = L();
  T == null && (T = 0, c.replaceState(Ju({}, c.state, {
    idx: T
  }), ""));
  function L() {
    return (c.state || {
      idx: null
    }).idx;
  }
  function D() {
    M = ui.Pop;
    let te = L(), me = te == null ? null : te - T;
    T = te, R && R({
      action: M,
      location: ue.location,
      delta: me
    });
  }
  function _(te, me) {
    M = ui.Push;
    let K = Vv(ue.location, te, me);
    T = L() + 1;
    let I = iE(K, T), G = ue.createHref(K);
    try {
      c.pushState(I, "", G);
    } catch (F) {
      if (F instanceof DOMException && F.name === "DataCloneError")
        throw F;
      y.location.assign(G);
    }
    E && R && R({
      action: M,
      location: ue.location,
      delta: 1
    });
  }
  function k(te, me) {
    M = ui.Replace;
    let K = Vv(ue.location, te, me);
    T = L();
    let I = iE(K, T), G = ue.createHref(K);
    c.replaceState(I, "", G), E && R && R({
      action: M,
      location: ue.location,
      delta: 0
    });
  }
  function B(te) {
    let me = y.location.origin !== "null" ? y.location.origin : y.location.href, K = typeof te == "string" ? te : Zu(te);
    return K = K.replace(/ $/, "%20"), ht(me, "No window.location.(origin|href) available to create URL for href: " + K), new URL(K, me);
  }
  let ue = {
    get action() {
      return M;
    },
    get location() {
      return o(y, c);
    },
    listen(te) {
      if (R)
        throw new Error("A history only accepts one active listener");
      return y.addEventListener(rE, D), R = te, () => {
        y.removeEventListener(rE, D), R = null;
      };
    },
    createHref(te) {
      return d(y, te);
    },
    createURL: B,
    encodeLocation(te) {
      let me = B(te);
      return {
        pathname: me.pathname,
        search: me.search,
        hash: me.hash
      };
    },
    push: _,
    replace: k,
    go(te) {
      return c.go(te);
    }
  };
  return ue;
}
var lE;
(function(o) {
  o.data = "data", o.deferred = "deferred", o.redirect = "redirect", o.error = "error";
})(lE || (lE = {}));
function pw(o, d, m) {
  return m === void 0 && (m = "/"), mw(o, d, m);
}
function mw(o, d, m, g) {
  let y = typeof d == "string" ? ao(d) : d, E = ci(y.pathname || "/", m);
  if (E == null)
    return null;
  let c = xE(o);
  vw(c);
  let M = null;
  for (let R = 0; M == null && R < c.length; ++R) {
    let T = Dw(E);
    M = Rw(c[R], T);
  }
  return M;
}
function xE(o, d, m, g) {
  d === void 0 && (d = []), m === void 0 && (m = []), g === void 0 && (g = "");
  let y = (E, c, M) => {
    let R = {
      relativePath: M === void 0 ? E.path || "" : M,
      caseSensitive: E.caseSensitive === !0,
      childrenIndex: c,
      route: E
    };
    R.relativePath.startsWith("/") && (ht(R.relativePath.startsWith(g), 'Absolute route path "' + R.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), R.relativePath = R.relativePath.slice(g.length));
    let T = Lr([g, R.relativePath]), L = m.concat(R);
    E.children && E.children.length > 0 && (ht(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      E.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + T + '".')
    ), xE(E.children, d, L, T)), !(E.path == null && !E.index) && d.push({
      path: T,
      score: Sw(T, E.index),
      routesMeta: L
    });
  };
  return o.forEach((E, c) => {
    var M;
    if (E.path === "" || !((M = E.path) != null && M.includes("?")))
      y(E, c);
    else
      for (let R of RE(E.path))
        y(E, c, R);
  }), d;
}
function RE(o) {
  let d = o.split("/");
  if (d.length === 0) return [];
  let [m, ...g] = d, y = m.endsWith("?"), E = m.replace(/\?$/, "");
  if (g.length === 0)
    return y ? [E, ""] : [E];
  let c = RE(g.join("/")), M = [];
  return M.push(...c.map((R) => R === "" ? E : [E, R].join("/"))), y && M.push(...c), M.map((R) => o.startsWith("/") && R === "" ? "/" : R);
}
function vw(o) {
  o.sort((d, m) => d.score !== m.score ? m.score - d.score : xw(d.routesMeta.map((g) => g.childrenIndex), m.routesMeta.map((g) => g.childrenIndex)));
}
const hw = /^:[\w-]+$/, gw = 3, yw = 2, bw = 1, Nw = 10, Ew = -2, oE = (o) => o === "*";
function Sw(o, d) {
  let m = o.split("/"), g = m.length;
  return m.some(oE) && (g += Ew), d && (g += yw), m.filter((y) => !oE(y)).reduce((y, E) => y + (hw.test(E) ? gw : E === "" ? bw : Nw), g);
}
function xw(o, d) {
  return o.length === d.length && o.slice(0, -1).every((g, y) => g === d[y]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    o[o.length - 1] - d[d.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function Rw(o, d, m) {
  let {
    routesMeta: g
  } = o, y = {}, E = "/", c = [];
  for (let M = 0; M < g.length; ++M) {
    let R = g[M], T = M === g.length - 1, L = E === "/" ? d : d.slice(E.length) || "/", D = kv({
      path: R.relativePath,
      caseSensitive: R.caseSensitive,
      end: T
    }, L), _ = R.route;
    if (!D)
      return null;
    Object.assign(y, D.params), c.push({
      // TODO: Can this as be avoided?
      params: y,
      pathname: Lr([E, D.pathname]),
      pathnameBase: _w(Lr([E, D.pathnameBase])),
      route: _
    }), D.pathnameBase !== "/" && (E = Lr([E, D.pathnameBase]));
  }
  return c;
}
function kv(o, d) {
  typeof o == "string" && (o = {
    path: o,
    caseSensitive: !1,
    end: !0
  });
  let [m, g] = Cw(o.path, o.caseSensitive, o.end), y = d.match(m);
  if (!y) return null;
  let E = y[0], c = E.replace(/(.)\/+$/, "$1"), M = y.slice(1);
  return {
    params: g.reduce((T, L, D) => {
      let {
        paramName: _,
        isOptional: k
      } = L;
      if (_ === "*") {
        let ue = M[D] || "";
        c = E.slice(0, E.length - ue.length).replace(/(.)\/+$/, "$1");
      }
      const B = M[D];
      return k && !B ? T[_] = void 0 : T[_] = (B || "").replace(/%2F/g, "/"), T;
    }, {}),
    pathname: E,
    pathnameBase: c,
    pattern: o
  };
}
function Cw(o, d, m) {
  d === void 0 && (d = !1), m === void 0 && (m = !0), Ua(o === "*" || !o.endsWith("*") || o.endsWith("/*"), 'Route path "' + o + '" will be treated as if it were ' + ('"' + o.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + o.replace(/\*$/, "/*") + '".'));
  let g = [], y = "^" + o.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (c, M, R) => (g.push({
    paramName: M,
    isOptional: R != null
  }), R ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return o.endsWith("*") ? (g.push({
    paramName: "*"
  }), y += o === "*" || o === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : m ? y += "\\/*$" : o !== "" && o !== "/" && (y += "(?:(?=\\/|$))"), [new RegExp(y, d ? void 0 : "i"), g];
}
function Dw(o) {
  try {
    return o.split("/").map((d) => decodeURIComponent(d).replace(/\//g, "%2F")).join("/");
  } catch (d) {
    return Ua(!1, 'The URL path "' + o + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + d + ").")), o;
  }
}
function ci(o, d) {
  if (d === "/") return o;
  if (!o.toLowerCase().startsWith(d.toLowerCase()))
    return null;
  let m = d.endsWith("/") ? d.length - 1 : d.length, g = o.charAt(m);
  return g && g !== "/" ? null : o.slice(m) || "/";
}
function Tw(o, d) {
  d === void 0 && (d = "/");
  let {
    pathname: m,
    search: g = "",
    hash: y = ""
  } = typeof o == "string" ? ao(o) : o;
  return {
    pathname: m ? m.startsWith("/") ? m : jw(m, d) : d,
    search: Ow(g),
    hash: Lw(y)
  };
}
function jw(o, d) {
  let m = d.replace(/\/+$/, "").split("/");
  return o.split("/").forEach((y) => {
    y === ".." ? m.length > 1 && m.pop() : y !== "." && m.push(y);
  }), m.length > 1 ? m.join("/") : "/";
}
function Lv(o, d, m, g) {
  return "Cannot include a '" + o + "' character in a manually specified " + ("`to." + d + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + m + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function ww(o) {
  return o.filter((d, m) => m === 0 || d.route.path && d.route.path.length > 0);
}
function Hv(o, d) {
  let m = ww(o);
  return d ? m.map((g, y) => y === m.length - 1 ? g.pathname : g.pathnameBase) : m.map((g) => g.pathnameBase);
}
function Pv(o, d, m, g) {
  g === void 0 && (g = !1);
  let y;
  typeof o == "string" ? y = ao(o) : (y = Ju({}, o), ht(!y.pathname || !y.pathname.includes("?"), Lv("?", "pathname", "search", y)), ht(!y.pathname || !y.pathname.includes("#"), Lv("#", "pathname", "hash", y)), ht(!y.search || !y.search.includes("#"), Lv("#", "search", "hash", y)));
  let E = o === "" || y.pathname === "", c = E ? "/" : y.pathname, M;
  if (c == null)
    M = m;
  else {
    let D = d.length - 1;
    if (!g && c.startsWith("..")) {
      let _ = c.split("/");
      for (; _[0] === ".."; )
        _.shift(), D -= 1;
      y.pathname = _.join("/");
    }
    M = D >= 0 ? d[D] : "/";
  }
  let R = Tw(y, M), T = c && c !== "/" && c.endsWith("/"), L = (E || c === ".") && m.endsWith("/");
  return !R.pathname.endsWith("/") && (T || L) && (R.pathname += "/"), R;
}
const Lr = (o) => o.join("/").replace(/\/\/+/g, "/"), _w = (o) => o.replace(/\/+$/, "").replace(/^\/*/, "/"), Ow = (o) => !o || o === "?" ? "" : o.startsWith("?") ? o : "?" + o, Lw = (o) => !o || o === "#" ? "" : o.startsWith("#") ? o : "#" + o;
function Mw(o) {
  return o != null && typeof o.status == "number" && typeof o.statusText == "string" && typeof o.internal == "boolean" && "data" in o;
}
const CE = ["post", "put", "patch", "delete"];
new Set(CE);
const Aw = ["get", ...CE];
new Set(Aw);
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
function es() {
  return es = Object.assign ? Object.assign.bind() : function(o) {
    for (var d = 1; d < arguments.length; d++) {
      var m = arguments[d];
      for (var g in m)
        Object.prototype.hasOwnProperty.call(m, g) && (o[g] = m[g]);
    }
    return o;
  }, es.apply(this, arguments);
}
const ns = /* @__PURE__ */ C.createContext(null);
ns.displayName = "DataRouter";
const Bv = /* @__PURE__ */ C.createContext(null);
Bv.displayName = "DataRouterState";
const Vw = /* @__PURE__ */ C.createContext(null);
Vw.displayName = "Await";
const va = /* @__PURE__ */ C.createContext(null);
va.displayName = "Navigation";
const as = /* @__PURE__ */ C.createContext(null);
as.displayName = "Location";
const za = /* @__PURE__ */ C.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
za.displayName = "Route";
const $v = /* @__PURE__ */ C.createContext(null);
$v.displayName = "RouteError";
function kw(o, d) {
  let {
    relative: m
  } = d === void 0 ? {} : d;
  ro() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename: g,
    navigator: y
  } = C.useContext(va), {
    hash: E,
    pathname: c,
    search: M
  } = rs(o, {
    relative: m
  }), R = c;
  return g !== "/" && (R = c === "/" ? g : Lr([g, c])), y.createHref({
    pathname: R,
    search: M,
    hash: E
  });
}
function ro() {
  return C.useContext(as) != null;
}
function Xi() {
  return ro() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), C.useContext(as).location;
}
const DE = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function TE(o) {
  C.useContext(va).static || C.useLayoutEffect(o);
}
function Yv() {
  let {
    isDataRoute: o
  } = C.useContext(za);
  return o ? Xw() : Uw();
}
function Uw() {
  ro() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let o = C.useContext(ns), {
    basename: d,
    future: m,
    navigator: g
  } = C.useContext(va), {
    matches: y
  } = C.useContext(za), {
    pathname: E
  } = Xi(), c = JSON.stringify(Hv(y, m.v7_relativeSplatPath)), M = C.useRef(!1);
  return TE(() => {
    M.current = !0;
  }), C.useCallback(function(T, L) {
    if (L === void 0 && (L = {}), Ua(M.current, DE), !M.current) return;
    if (typeof T == "number") {
      g.go(T);
      return;
    }
    let D = Pv(T, JSON.parse(c), E, L.relative === "path");
    o == null && d !== "/" && (D.pathname = D.pathname === "/" ? d : Lr([d, D.pathname])), (L.replace ? g.replace : g.push)(D, L.state, L);
  }, [d, g, c, E, o]);
}
function Fw() {
  let {
    matches: o
  } = C.useContext(za), d = o[o.length - 1];
  return d ? d.params : {};
}
function rs(o, d) {
  let {
    relative: m
  } = d === void 0 ? {} : d, {
    future: g
  } = C.useContext(va), {
    matches: y
  } = C.useContext(za), {
    pathname: E
  } = Xi(), c = JSON.stringify(Hv(y, g.v7_relativeSplatPath));
  return C.useMemo(() => Pv(o, JSON.parse(c), E, m === "path"), [o, c, E, m]);
}
function zw(o, d) {
  return Hw(o, d);
}
function Hw(o, d, m, g) {
  ro() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: y
  } = C.useContext(va), {
    matches: E
  } = C.useContext(za), c = E[E.length - 1], M = c ? c.params : {}, R = c ? c.pathname : "/", T = c ? c.pathnameBase : "/", L = c && c.route;
  {
    let K = L && L.path || "";
    wE(R, !L || K.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + R + '" (under <Route path="' + K + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + K + '"> to <Route ') + ('path="' + (K === "/" ? "*" : K + "/*") + '">.'));
  }
  let D = Xi(), _;
  if (d) {
    var k;
    let K = typeof d == "string" ? ao(d) : d;
    T === "/" || (k = K.pathname) != null && k.startsWith(T) || ht(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + T + '" ') + ('but pathname "' + K.pathname + '" was given in the `location` prop.')), _ = K;
  } else
    _ = D;
  let B = _.pathname || "/", ue = B;
  if (T !== "/") {
    let K = T.replace(/^\//, "").split("/");
    ue = "/" + B.replace(/^\//, "").split("/").slice(K.length).join("/");
  }
  let te = pw(o, {
    pathname: ue
  });
  Ua(L || te != null, 'No routes matched location "' + _.pathname + _.search + _.hash + '" '), Ua(te == null || te[te.length - 1].route.element !== void 0 || te[te.length - 1].route.Component !== void 0 || te[te.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + _.pathname + _.search + _.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let me = Iw(te && te.map((K) => Object.assign({}, K, {
    params: Object.assign({}, M, K.params),
    pathname: Lr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(K.pathname).pathname : K.pathname
    ]),
    pathnameBase: K.pathnameBase === "/" ? T : Lr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(K.pathnameBase).pathname : K.pathnameBase
    ])
  })), E, m, g);
  return d && me ? /* @__PURE__ */ C.createElement(as.Provider, {
    value: {
      location: es({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, _),
      navigationType: ui.Pop
    }
  }, me) : me;
}
function Pw() {
  let o = Qw(), d = Mw(o) ? o.status + " " + o.statusText : o instanceof Error ? o.message : JSON.stringify(o), m = o instanceof Error ? o.stack : null, g = "rgba(200,200,200, 0.5)", y = {
    padding: "0.5rem",
    backgroundColor: g
  }, E = {
    padding: "2px 4px",
    backgroundColor: g
  }, c = null;
  return console.error("Error handled by React Router default ErrorBoundary:", o), c = /* @__PURE__ */ C.createElement(C.Fragment, null, /* @__PURE__ */ C.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ C.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ C.createElement("code", {
    style: E
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ C.createElement("code", {
    style: E
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ C.createElement(C.Fragment, null, /* @__PURE__ */ C.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ C.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, d), m ? /* @__PURE__ */ C.createElement("pre", {
    style: y
  }, m) : null, c);
}
const Bw = /* @__PURE__ */ C.createElement(Pw, null);
class $w extends C.Component {
  constructor(d) {
    super(d), this.state = {
      location: d.location,
      revalidation: d.revalidation,
      error: d.error
    };
  }
  static getDerivedStateFromError(d) {
    return {
      error: d
    };
  }
  static getDerivedStateFromProps(d, m) {
    return m.location !== d.location || m.revalidation !== "idle" && d.revalidation === "idle" ? {
      error: d.error,
      location: d.location,
      revalidation: d.revalidation
    } : {
      error: d.error !== void 0 ? d.error : m.error,
      location: m.location,
      revalidation: d.revalidation || m.revalidation
    };
  }
  componentDidCatch(d, m) {
    console.error("React Router caught the following error during render", d, m);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ C.createElement(za.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ C.createElement($v.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function Yw(o) {
  let {
    routeContext: d,
    match: m,
    children: g
  } = o, y = C.useContext(ns);
  return y && y.static && y.staticContext && (m.route.errorElement || m.route.ErrorBoundary) && (y.staticContext._deepestRenderedBoundaryId = m.route.id), /* @__PURE__ */ C.createElement(za.Provider, {
    value: d
  }, g);
}
function Iw(o, d, m, g) {
  var y;
  if (d === void 0 && (d = []), m === void 0 && (m = null), g === void 0 && (g = null), o == null) {
    var E;
    if (!m)
      return null;
    if (m.errors)
      o = m.matches;
    else if ((E = g) != null && E.v7_partialHydration && d.length === 0 && !m.initialized && m.matches.length > 0)
      o = m.matches;
    else
      return null;
  }
  let c = o, M = (y = m) == null ? void 0 : y.errors;
  if (M != null) {
    let L = c.findIndex((D) => D.route.id && (M == null ? void 0 : M[D.route.id]) !== void 0);
    L >= 0 || ht(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(M).join(",")), c = c.slice(0, Math.min(c.length, L + 1));
  }
  let R = !1, T = -1;
  if (m && g && g.v7_partialHydration)
    for (let L = 0; L < c.length; L++) {
      let D = c[L];
      if ((D.route.HydrateFallback || D.route.hydrateFallbackElement) && (T = L), D.route.id) {
        let {
          loaderData: _,
          errors: k
        } = m, B = D.route.loader && _[D.route.id] === void 0 && (!k || k[D.route.id] === void 0);
        if (D.route.lazy || B) {
          R = !0, T >= 0 ? c = c.slice(0, T + 1) : c = [c[0]];
          break;
        }
      }
    }
  return c.reduceRight((L, D, _) => {
    let k, B = !1, ue = null, te = null;
    m && (k = M && D.route.id ? M[D.route.id] : void 0, ue = D.route.errorElement || Bw, R && (T < 0 && _ === 0 ? (wE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), B = !0, te = null) : T === _ && (B = !0, te = D.route.hydrateFallbackElement || null)));
    let me = d.concat(c.slice(0, _ + 1)), K = () => {
      let I;
      return k ? I = ue : B ? I = te : D.route.Component ? I = /* @__PURE__ */ C.createElement(D.route.Component, null) : D.route.element ? I = D.route.element : I = L, /* @__PURE__ */ C.createElement(Yw, {
        match: D,
        routeContext: {
          outlet: L,
          matches: me,
          isDataRoute: m != null
        },
        children: I
      });
    };
    return m && (D.route.ErrorBoundary || D.route.errorElement || _ === 0) ? /* @__PURE__ */ C.createElement($w, {
      location: m.location,
      revalidation: m.revalidation,
      component: ue,
      error: k,
      children: K(),
      routeContext: {
        outlet: null,
        matches: me,
        isDataRoute: !0
      }
    }) : K();
  }, null);
}
var jE = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o;
}(jE || {}), ts = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseLoaderData = "useLoaderData", o.UseActionData = "useActionData", o.UseRouteError = "useRouteError", o.UseNavigation = "useNavigation", o.UseRouteLoaderData = "useRouteLoaderData", o.UseMatches = "useMatches", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o.UseRouteId = "useRouteId", o;
}(ts || {});
function Iv(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function qw(o) {
  let d = C.useContext(ns);
  return d || ht(!1, Iv(o)), d;
}
function Gw(o) {
  let d = C.useContext(Bv);
  return d || ht(!1, Iv(o)), d;
}
function Ww(o) {
  let d = C.useContext(za);
  return d || ht(!1, Iv(o)), d;
}
function qv(o) {
  let d = Ww(o), m = d.matches[d.matches.length - 1];
  return m.route.id || ht(!1, o + ' can only be used on routes that contain a unique "id"'), m.route.id;
}
function Kw() {
  return qv(ts.UseRouteId);
}
function Qw() {
  var o;
  let d = C.useContext($v), m = Gw(ts.UseRouteError), g = qv(ts.UseRouteError);
  return d !== void 0 ? d : (o = m.errors) == null ? void 0 : o[g];
}
function Xw() {
  let {
    router: o
  } = qw(jE.UseNavigateStable), d = qv(ts.UseNavigateStable), m = C.useRef(!1);
  return TE(() => {
    m.current = !0;
  }), C.useCallback(function(y, E) {
    E === void 0 && (E = {}), Ua(m.current, DE), m.current && (typeof y == "number" ? o.navigate(y) : o.navigate(y, es({
      fromRouteId: d
    }, E)));
  }, [o, d]);
}
const uE = {};
function wE(o, d, m) {
  !d && !uE[o] && (uE[o] = !0, Ua(!1, m));
}
const sE = {};
function Jw(o, d) {
  sE[d] || (sE[d] = !0, console.warn(d));
}
const cE = (o, d, m) => Jw(o, "⚠️ React Router Future Flag Warning: " + d + ". " + ("You can use the `" + o + "` future flag to opt-in early. ") + ("For more information, see " + m + "."));
function Zw(o, d) {
  (o == null ? void 0 : o.v7_startTransition) === void 0 && cE("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (o == null ? void 0 : o.v7_relativeSplatPath) === void 0 && cE("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function e_(o) {
  let {
    to: d,
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
    static: c
  } = C.useContext(va);
  Ua(!c, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: M
  } = C.useContext(za), {
    pathname: R
  } = Xi(), T = Yv(), L = Pv(d, Hv(M, E.v7_relativeSplatPath), R, y === "path"), D = JSON.stringify(L);
  return C.useEffect(() => T(JSON.parse(D), {
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
    basename: d = "/",
    children: m = null,
    location: g,
    navigationType: y = ui.Pop,
    navigator: E,
    static: c = !1,
    future: M
  } = o;
  ro() && ht(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let R = d.replace(/^\/*/, "/"), T = C.useMemo(() => ({
    basename: R,
    navigator: E,
    static: c,
    future: es({
      v7_relativeSplatPath: !1
    }, M)
  }), [R, M, E, c]);
  typeof g == "string" && (g = ao(g));
  let {
    pathname: L = "/",
    search: D = "",
    hash: _ = "",
    state: k = null,
    key: B = "default"
  } = g, ue = C.useMemo(() => {
    let te = ci(L, R);
    return te == null ? null : {
      location: {
        pathname: te,
        search: D,
        hash: _,
        state: k,
        key: B
      },
      navigationType: y
    };
  }, [R, L, D, _, k, B, y]);
  return Ua(ue != null, '<Router basename="' + R + '"> is not able to match the URL ' + ('"' + L + D + _ + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), ue == null ? null : /* @__PURE__ */ C.createElement(va.Provider, {
    value: T
  }, /* @__PURE__ */ C.createElement(as.Provider, {
    children: m,
    value: ue
  }));
}
function n_(o) {
  let {
    children: d,
    location: m
  } = o;
  return zw(Uv(d), m);
}
new Promise(() => {
});
function Uv(o, d) {
  d === void 0 && (d = []);
  let m = [];
  return C.Children.forEach(o, (g, y) => {
    if (!/* @__PURE__ */ C.isValidElement(g))
      return;
    let E = [...d, y];
    if (g.type === C.Fragment) {
      m.push.apply(m, Uv(g.props.children, E));
      return;
    }
    g.type !== ar && ht(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || ht(!1, "An index route cannot have child routes.");
    let c = {
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
    g.props.children && (c.children = Uv(g.props.children, E)), m.push(c);
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
    for (var d = 1; d < arguments.length; d++) {
      var m = arguments[d];
      for (var g in m)
        Object.prototype.hasOwnProperty.call(m, g) && (o[g] = m[g]);
    }
    return o;
  }, no.apply(this, arguments);
}
function Gv(o, d) {
  if (o == null) return {};
  var m = {}, g = Object.keys(o), y, E;
  for (E = 0; E < g.length; E++)
    y = g[E], !(d.indexOf(y) >= 0) && (m[y] = o[y]);
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
function o_(o, d) {
  return o.button === 0 && // Ignore everything but left clicks
  (!d || d === "_self") && // Let browser handle "target=_blank" etc.
  !l_(o);
}
let hf = null;
function u_() {
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
const s_ = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Mv(o) {
  return o != null && !s_.has(o) ? (Ua(!1, '"' + o + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + yf + '"')), null) : o;
}
function c_(o, d) {
  let m, g, y, E, c;
  if (r_(o)) {
    let M = o.getAttribute("action");
    g = M ? ci(M, d) : null, m = o.getAttribute("method") || gf, y = Mv(o.getAttribute("enctype")) || yf, E = new FormData(o);
  } else if (a_(o) || i_(o) && (o.type === "submit" || o.type === "image")) {
    let M = o.form;
    if (M == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let R = o.getAttribute("formaction") || M.getAttribute("action");
    if (g = R ? ci(R, d) : null, m = o.getAttribute("formmethod") || M.getAttribute("method") || gf, y = Mv(o.getAttribute("formenctype")) || Mv(M.getAttribute("enctype")) || yf, E = new FormData(M, o), !u_()) {
      let {
        name: T,
        type: L,
        value: D
      } = o;
      if (L === "image") {
        let _ = T ? T + "." : "";
        E.append(_ + "x", "0"), E.append(_ + "y", "0");
      } else T && E.append(T, D);
    }
  } else {
    if (xf(o))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    m = gf, g = null, y = yf, c = o;
  }
  return E && y === "text/plain" && (c = E, E = void 0), {
    action: g,
    method: m.toLowerCase(),
    encType: y,
    formData: E,
    body: c
  };
}
const f_ = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], d_ = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], p_ = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], m_ = "6";
try {
  window.__reactRouterVersion = m_;
} catch {
}
const _E = /* @__PURE__ */ C.createContext({
  isTransitioning: !1
});
_E.displayName = "ViewTransition";
const v_ = /* @__PURE__ */ C.createContext(/* @__PURE__ */ new Map());
v_.displayName = "Fetchers";
const h_ = "startTransition", fE = ow[h_];
function g_(o) {
  let {
    basename: d,
    children: m,
    future: g,
    window: y
  } = o, E = C.useRef();
  E.current == null && (E.current = cw({
    window: y,
    v5Compat: !0
  }));
  let c = E.current, [M, R] = C.useState({
    action: c.action,
    location: c.location
  }), {
    v7_startTransition: T
  } = g || {}, L = C.useCallback((D) => {
    T && fE ? fE(() => R(D)) : R(D);
  }, [R, T]);
  return C.useLayoutEffect(() => c.listen(L), [c, L]), C.useEffect(() => Zw(g), [g]), /* @__PURE__ */ C.createElement(t_, {
    basename: d,
    children: m,
    location: M.location,
    navigationType: M.action,
    navigator: c,
    future: g
  });
}
const y_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", b_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, to = /* @__PURE__ */ C.forwardRef(function(d, m) {
  let {
    onClick: g,
    relative: y,
    reloadDocument: E,
    replace: c,
    state: M,
    target: R,
    to: T,
    preventScrollReset: L,
    viewTransition: D
  } = d, _ = Gv(d, f_), {
    basename: k
  } = C.useContext(va), B, ue = !1;
  if (typeof T == "string" && b_.test(T) && (B = T, y_))
    try {
      let I = new URL(window.location.href), G = T.startsWith("//") ? new URL(I.protocol + T) : new URL(T), F = ci(G.pathname, k);
      G.origin === I.origin && F != null ? T = F + G.search + G.hash : ue = !0;
    } catch {
      Ua(!1, '<Link to="' + T + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let te = kw(T, {
    relative: y
  }), me = x_(T, {
    replace: c,
    state: M,
    target: R,
    preventScrollReset: L,
    relative: y,
    viewTransition: D
  });
  function K(I) {
    g && g(I), I.defaultPrevented || me(I);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ C.createElement("a", no({}, _, {
      href: B || te,
      onClick: ue || E ? g : K,
      ref: m,
      target: R
    }))
  );
});
to.displayName = "Link";
const N_ = /* @__PURE__ */ C.forwardRef(function(d, m) {
  let {
    "aria-current": g = "page",
    caseSensitive: y = !1,
    className: E = "",
    end: c = !1,
    style: M,
    to: R,
    viewTransition: T,
    children: L
  } = d, D = Gv(d, d_), _ = rs(R, {
    relative: D.relative
  }), k = Xi(), B = C.useContext(Bv), {
    navigator: ue,
    basename: te
  } = C.useContext(va), me = B != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  w_(_) && T === !0, K = ue.encodeLocation ? ue.encodeLocation(_).pathname : _.pathname, I = k.pathname, G = B && B.navigation && B.navigation.location ? B.navigation.location.pathname : null;
  y || (I = I.toLowerCase(), G = G ? G.toLowerCase() : null, K = K.toLowerCase()), G && te && (G = ci(G, te) || G);
  const F = K !== "/" && K.endsWith("/") ? K.length - 1 : K.length;
  let Y = I === K || !c && I.startsWith(K) && I.charAt(F) === "/", X = G != null && (G === K || !c && G.startsWith(K) && G.charAt(K.length) === "/"), ye = {
    isActive: Y,
    isPending: X,
    isTransitioning: me
  }, ie = Y ? g : void 0, Z;
  typeof E == "function" ? Z = E(ye) : Z = [E, Y ? "active" : null, X ? "pending" : null, me ? "transitioning" : null].filter(Boolean).join(" ");
  let U = typeof M == "function" ? M(ye) : M;
  return /* @__PURE__ */ C.createElement(to, no({}, D, {
    "aria-current": ie,
    className: Z,
    ref: m,
    style: U,
    to: R,
    viewTransition: T
  }), typeof L == "function" ? L(ye) : L);
});
N_.displayName = "NavLink";
const E_ = /* @__PURE__ */ C.forwardRef((o, d) => {
  let {
    fetcherKey: m,
    navigate: g,
    reloadDocument: y,
    replace: E,
    state: c,
    method: M = gf,
    action: R,
    onSubmit: T,
    relative: L,
    preventScrollReset: D,
    viewTransition: _
  } = o, k = Gv(o, p_), B = T_(), ue = j_(R, {
    relative: L
  }), te = M.toLowerCase() === "get" ? "get" : "post", me = (K) => {
    if (T && T(K), K.defaultPrevented) return;
    K.preventDefault();
    let I = K.nativeEvent.submitter, G = (I == null ? void 0 : I.getAttribute("formmethod")) || M;
    B(I || K.currentTarget, {
      fetcherKey: m,
      method: G,
      navigate: g,
      replace: E,
      state: c,
      relative: L,
      preventScrollReset: D,
      viewTransition: _
    });
  };
  return /* @__PURE__ */ C.createElement("form", no({
    ref: d,
    method: te,
    action: ue,
    onSubmit: y ? T : me
  }, k));
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
  let d = C.useContext(ns);
  return d || ht(!1, S_(o)), d;
}
function x_(o, d) {
  let {
    target: m,
    replace: g,
    state: y,
    preventScrollReset: E,
    relative: c,
    viewTransition: M
  } = d === void 0 ? {} : d, R = Yv(), T = Xi(), L = rs(o, {
    relative: c
  });
  return C.useCallback((D) => {
    if (o_(D, m)) {
      D.preventDefault();
      let _ = g !== void 0 ? g : Zu(T) === Zu(L);
      R(o, {
        replace: _,
        state: y,
        preventScrollReset: E,
        relative: c,
        viewTransition: M
      });
    }
  }, [T, R, L, g, y, m, o, E, c, M]);
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
    basename: d
  } = C.useContext(va), m = Kw();
  return C.useCallback(function(g, y) {
    y === void 0 && (y = {}), R_();
    let {
      action: E,
      method: c,
      encType: M,
      formData: R,
      body: T
    } = c_(g, d);
    if (y.navigate === !1) {
      let L = y.fetcherKey || D_();
      o.fetch(L, m, y.action || E, {
        preventScrollReset: y.preventScrollReset,
        formData: R,
        body: T,
        formMethod: y.method || c,
        formEncType: y.encType || M,
        flushSync: y.flushSync
      });
    } else
      o.navigate(y.action || E, {
        preventScrollReset: y.preventScrollReset,
        formData: R,
        body: T,
        formMethod: y.method || c,
        formEncType: y.encType || M,
        replace: y.replace,
        state: y.state,
        fromRouteId: m,
        flushSync: y.flushSync,
        viewTransition: y.viewTransition
      });
  }, [o, d, m]);
}
function j_(o, d) {
  let {
    relative: m
  } = d === void 0 ? {} : d, {
    basename: g
  } = C.useContext(va), y = C.useContext(za);
  y || ht(!1, "useFormAction must be used inside a RouteContext");
  let [E] = y.matches.slice(-1), c = no({}, rs(o || ".", {
    relative: m
  })), M = Xi();
  if (o == null) {
    c.search = M.search;
    let R = new URLSearchParams(c.search), T = R.getAll("index");
    if (T.some((D) => D === "")) {
      R.delete("index"), T.filter((_) => _).forEach((_) => R.append("index", _));
      let D = R.toString();
      c.search = D ? "?" + D : "";
    }
  }
  return (!o || o === ".") && E.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (c.pathname = c.pathname === "/" ? g : Lr([g, c.pathname])), Zu(c);
}
function w_(o, d) {
  d === void 0 && (d = {});
  let m = C.useContext(_E);
  m == null && ht(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = OE(Nf.useViewTransitionState), y = rs(o, {
    relative: d.relative
  });
  if (!m.isTransitioning)
    return !1;
  let E = ci(m.currentLocation.pathname, g) || m.currentLocation.pathname, c = ci(m.nextLocation.pathname, g) || m.nextLocation.pathname;
  return kv(y.pathname, c) != null || kv(y.pathname, E) != null;
}
function __() {
  const [o, d] = C.useState(null), [m, g] = C.useState(""), [y, E] = C.useState(""), [c, M] = C.useState(!0), [R, T] = C.useState(""), [L, D] = C.useState(""), [_, k] = C.useState(!1), [B, ue] = C.useState(!1);
  C.useEffect(() => {
    const I = typeof window < "u" ? window : void 0, G = I && I.__FIREBASE__ ? I.__FIREBASE__ : null;
    d({
      apiKey: G && G.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: G && G.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: G && G.projectId || void 0 || "fresh-basket-a8933",
      appId: G && G.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: G && G.messagingSenderId || void 0 || "163656027399",
      measurementId: G && G.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function te(I) {
    const G = (I == null ? void 0 : I.code) || "", F = (I == null ? void 0 : I.message) || "";
    return G.includes("invalid-email") ? "Please enter a valid email address." : G.includes("user-not-found") ? "No account found with that email." : G.includes("wrong-password") || G.includes("invalid-credential") || F.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : G.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : G.includes("network-request-failed") ? "Network error. Check your connection and try again." : F || "Something went wrong.";
  }
  async function me(I) {
    I.preventDefault(), T(""), D(""), k(!0);
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const G = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), F = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: Y, setPersistence: X, browserLocalPersistence: ye, browserSessionPersistence: ie, signInWithEmailAndPassword: Z } = F, U = Y();
      await X(U, c ? ye : ie);
      const ce = await (await Z(U, m.trim(), y)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: ce }) })).ok) throw new Error("Session creation failed");
      D("Signed in successfully."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (G) {
      T(te(G));
    } finally {
      k(!1);
    }
  }
  async function K() {
    T(""), D("");
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const I = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: G, sendPasswordResetEmail: F } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Y = G();
      await F(Y, m.trim()), D("If an account exists for that email, a reset link has been sent.");
    } catch (I) {
      T(te(I));
    }
  }
  return /* @__PURE__ */ p.jsxDEV("section", { className: "auth-layout", children: [
    /* @__PURE__ */ p.jsxDEV("div", { className: "auth-hero", children: [
      /* @__PURE__ */ p.jsxDEV("img", { className: "hero-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=96", alt: "FreshBasket logo" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ p.jsxDEV("h2", { className: "hero-heading", children: "Welcome back" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ p.jsxDEV("p", { className: "hero-sub", children: "Sign in to manage orders, riders and deliveries." }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ p.jsxDEV("ul", { className: "hero-points", children: [
        /* @__PURE__ */ p.jsxDEV("li", { children: "Secure account access" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 76,
          columnNumber: 37
        }, this),
        /* @__PURE__ */ p.jsxDEV("li", { children: "Real-time dashboards" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 76,
          columnNumber: 67
        }, this),
        /* @__PURE__ */ p.jsxDEV("li", { children: "Faster operations" }, void 0, !1, {
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
    /* @__PURE__ */ p.jsxDEV("div", { className: "auth-panel auth-panel-card", children: [
      /* @__PURE__ */ p.jsxDEV("h2", { className: "auth-title", children: "Sign in to FreshBasket" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      R && /* @__PURE__ */ p.jsxDEV("div", { className: "auth-error", children: R }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 81,
        columnNumber: 19
      }, this),
      L && /* @__PURE__ */ p.jsxDEV("div", { className: "auth-success", children: L }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 82,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ p.jsxDEV("form", { className: "auth-form", onSubmit: me, children: [
        /* @__PURE__ */ p.jsxDEV("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ p.jsxDEV("input", { className: "auth-input", type: "email", value: m, onChange: (I) => g(I.target.value), required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 85,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 84,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ p.jsxDEV("label", { className: "auth-label", children: [
          "Password",
          /* @__PURE__ */ p.jsxDEV("span", { className: "password-field", children: [
            /* @__PURE__ */ p.jsxDEV("input", { className: "auth-input", type: B ? "text" : "password", value: y, onChange: (I) => E(I.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ p.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": B ? "Hide password" : "Show password", onClick: () => ue((I) => !I), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ p.jsxDEV("div", { className: "auth-actions", children: [
          /* @__PURE__ */ p.jsxDEV("label", { className: "remember", children: [
            /* @__PURE__ */ p.jsxDEV("input", { type: "checkbox", checked: c, onChange: (I) => M(I.target.checked) }, void 0, !1, {
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
          /* @__PURE__ */ p.jsxDEV("button", { className: "link-button", type: "button", onClick: K, children: "Forgot password?" }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 95,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 93,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ p.jsxDEV("button", { className: "auth-button auth-button-wide", disabled: _, type: "submit", children: _ ? "Signing in…" : "Sign in" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 97,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ p.jsxDEV("p", { className: "auth-alt", children: [
        "No account? ",
        /* @__PURE__ */ p.jsxDEV("a", { href: "/auth/register", children: "Register" }, void 0, !1, {
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
  const [o, d] = C.useState(null), [m, g] = C.useState(""), [y, E] = C.useState(""), [c, M] = C.useState(""), [R, T] = C.useState(""), [L, D] = C.useState(""), [_, k] = C.useState(""), [B, ue] = C.useState(""), [te, me] = C.useState(!1), [K, I] = C.useState(!1), [G, F] = C.useState(!1), [Y, X] = C.useState(!1);
  C.useEffect(() => {
    const Z = typeof window < "u" ? window : void 0, U = Z && Z.__FIREBASE__ ? Z.__FIREBASE__ : null;
    d({
      apiKey: U && U.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: U && U.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: U && U.projectId || void 0 || "fresh-basket-a8933",
      appId: U && U.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: U && U.messagingSenderId || void 0 || "163656027399",
      measurementId: U && U.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function ye(Z) {
    const U = (Z == null ? void 0 : Z.code) || "";
    return U.includes("email-already-in-use") ? "An account with this email already exists." : U.includes("weak-password") ? "Password should be at least 6 characters." : U.includes("invalid-email") ? "Please enter a valid email address." : U.includes("network-request-failed") ? "Network error. Check your connection and try again." : (Z == null ? void 0 : Z.message) || "Something went wrong.";
  }
  async function ie(Z) {
    Z.preventDefault(), k(""), ue(""), me(!0);
    try {
      const U = String(m).trim(), ve = String(y).trim(), ce = ve.replace(/\D+/g, ""), Ae = { fn: !U, cn: !ve };
      if (F(Ae.fn), X(Ae.cn || ce.length < 7), Ae.fn || Ae.cn) {
        k("Please fill in required fields");
        return;
      }
      if (ce.length < 7) {
        k("Please enter a valid mobile number");
        return;
      }
      if (R !== L) throw new Error("Passwords do not match");
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const Ue = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: _e, createUserWithEmailAndPassword: ge } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Je = _e(), Qt = await (await ge(Je, c.trim(), R)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Qt, profile: { fullName: U, contactNumber: ve } }) })).ok) throw new Error("Session creation failed");
      ue("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (U) {
      k(ye(U));
    } finally {
      me(!1);
    }
  }
  return /* @__PURE__ */ p.jsxDEV("section", { className: "auth-panel", style: { maxWidth: 520, margin: "40px auto" }, children: [
    /* @__PURE__ */ p.jsxDEV("h2", { className: "auth-title", children: "Register" }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 67,
      columnNumber: 7
    }, this),
    _ && /* @__PURE__ */ p.jsxDEV("div", { className: "auth-error", children: _ }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 68,
      columnNumber: 17
    }, this),
    B && /* @__PURE__ */ p.jsxDEV("div", { className: "auth-success", children: B }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 69,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ p.jsxDEV("form", { className: "auth-form", onSubmit: ie, children: [
      /* @__PURE__ */ p.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ p.jsxDEV("input", { className: "auth-input" + (G && !String(m).trim() ? " input-error" : ""), value: m, onChange: (Z) => {
          g(Z.target.value), G && F(!String(Z.target.value).trim());
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
      /* @__PURE__ */ p.jsxDEV("label", { className: "auth-label", children: [
        "Contact number",
        /* @__PURE__ */ p.jsxDEV("input", { className: "auth-input" + (Y ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: y, onChange: (Z) => {
          if (E(Z.target.value), Y) {
            const U = String(Z.target.value).trim().replace(/\D+/g, "");
            X(!(U.length >= 7));
          }
        }, onBlur: () => {
          const Z = String(y).trim().replace(/\D+/g, "");
          X(!(Z.length >= 7));
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
      /* @__PURE__ */ p.jsxDEV("label", { className: "auth-label", children: [
        "Email",
        /* @__PURE__ */ p.jsxDEV("input", { className: "auth-input", type: "email", value: c, onChange: (Z) => M(Z.target.value), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 77,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ p.jsxDEV("label", { className: "auth-label", children: [
        "Password",
        /* @__PURE__ */ p.jsxDEV("span", { className: "password-field", children: [
          /* @__PURE__ */ p.jsxDEV("input", { className: "auth-input", type: K ? "text" : "password", value: R, onChange: (Z) => T(Z.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ p.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": K ? "Hide password" : "Show password", onClick: () => I((Z) => !Z), children: "👁️" }, void 0, !1, {
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
      /* @__PURE__ */ p.jsxDEV("label", { className: "auth-label", children: [
        "Confirm Password",
        /* @__PURE__ */ p.jsxDEV("input", { className: "auth-input", type: "password", value: L, onChange: (Z) => D(Z.target.value), minLength: 6, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 87,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ p.jsxDEV("button", { className: "auth-button", disabled: te, type: "submit", children: te ? "Creating account…" : "Create account" }, void 0, !1, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 89,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ p.jsxDEV("p", { className: "auth-alt", children: [
      "Have an account? ",
      /* @__PURE__ */ p.jsxDEV("a", { href: "/auth/login", children: "Login" }, void 0, !1, {
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
function L_() {
  const [o, d] = C.useState([]);
  return C.useEffect(() => {
    const m = Array.isArray(window.__pendingToasts) ? window.__pendingToasts.slice() : [];
    if (m.length) {
      const g = m.map((y) => ({
        id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
        message: String(y.message || ""),
        type: y.opts && y.opts.type || "success",
        ttl: y.opts && typeof y.opts.ttl == "number" ? y.opts.ttl : 4e3
      }));
      d((y) => [...g, ...y]);
      try {
        delete window.__pendingToasts;
      } catch {
        window.__pendingToasts = [];
      }
    }
    return window.showToast = function(g, y = {}) {
      const E = String(Date.now()) + Math.random().toString(36).slice(2, 8), c = { id: E, message: String(g || ""), type: y.type || "success", ttl: typeof y.ttl == "number" ? y.ttl : 4e3 };
      return d((M) => [c, ...M]), E;
    }, window.hideToast = function(g) {
      d((y) => y.filter((E) => E.id !== g));
    }, () => {
      try {
        window && typeof window.showToast == "function" && delete window.showToast, window && typeof window.hideToast == "function" && delete window.hideToast;
      } catch {
      }
    };
  }, []), C.useEffect(() => {
    if (!o.length) return;
    const m = o.map((g) => setTimeout(() => {
      d((y) => y.filter((E) => E.id !== g.id));
    }, g.ttl));
    return () => {
      m.forEach(clearTimeout);
    };
  }, [o]), o.length ? /* @__PURE__ */ p.jsxDEV("div", { className: "toaster-container", "aria-live": "polite", "aria-atomic": "true", children: o.map((m) => /* @__PURE__ */ p.jsxDEV("div", { className: `toast ${m.type === "success" ? "toast-success" : "toast-info"}`, role: "status", children: [
    /* @__PURE__ */ p.jsxDEV("div", { className: "toast-message", children: m.message }, void 0, !1, {
      fileName: "/app/code/client/components/Toaster.jsx",
      lineNumber: 46,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ p.jsxDEV("button", { className: "toast-close", onClick: () => d((g) => g.filter((y) => y.id !== m.id)), "aria-label": "Dismiss", children: "✕" }, void 0, !1, {
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
  C.useEffect(() => {
    typeof window > "u" || (window.__pendingToasts = window.__pendingToasts || [], typeof window.showToast != "function" && (window.showToast = function(m, g) {
      return window.__pendingToasts.push({ message: m, opts: g || {} }), null;
    }), typeof window.hideToast != "function" && (window.hideToast = function(m) {
      try {
        window.__pendingToasts && (window.__pendingToasts = window.__pendingToasts.filter((g) => g.id !== m));
      } catch {
      }
    }));
  }, []);
  const d = Yv();
  return C.useEffect(() => {
    const m = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), y = document.getElementById("profileBtn"), E = document.getElementById("profileMenu");
    function c(D, _, k) {
      D && (D.classList.toggle("hidden", !k), D.setAttribute("aria-hidden", k ? "false" : "true"), _ && _.setAttribute("aria-expanded", k ? "true" : "false"));
    }
    function M() {
      c(g, m, !1), c(E, y, !1);
    }
    function R(D) {
      const _ = (k) => k && (k === D.target || k.contains(D.target));
      !_(g) && !_(m) && !_(E) && !_(y) && M();
    }
    function T(D) {
      D.key === "Escape" && M();
    }
    function L(D) {
      D && D.querySelectorAll(".dropdown-item").forEach((_) => {
        _.addEventListener("click", () => M());
      });
    }
    return m && g && (m.addEventListener("click", (D) => {
      D.stopPropagation(), c(E, y, !1), c(g, m, g.classList.contains("hidden"));
    }), L(g)), y && E && (y.addEventListener("click", (D) => {
      D.stopPropagation(), c(g, m, !1), c(E, y, E.classList.contains("hidden"));
    }), L(E)), document.addEventListener("click", R), document.addEventListener("keydown", T), () => {
      document.removeEventListener("click", R), document.removeEventListener("keydown", T);
    };
  }, []), /* @__PURE__ */ p.jsxDEV(p.Fragment, { children: [
    /* @__PURE__ */ p.jsxDEV("header", { className: "site-header", children: [
      /* @__PURE__ */ p.jsxDEV("h1", { className: "site-title", children: /* @__PURE__ */ p.jsxDEV("span", { className: "brand", children: [
        /* @__PURE__ */ p.jsxDEV("img", { className: "brand-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=64", alt: "FreshBasket logo" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 75,
          columnNumber: 60
        }, this),
        /* @__PURE__ */ p.jsxDEV("span", { className: "brand-name", children: "FreshBasket" }, void 0, !1, {
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
      /* @__PURE__ */ p.jsxDEV("nav", { className: "site-nav", children: [
        /* @__PURE__ */ p.jsxDEV(to, { to: "/dashboard", onClick: (m) => {
          m.preventDefault(), d("/dashboard");
        }, children: "Dashboard" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 77,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ p.jsxDEV(to, { to: "/orders", onClick: (m) => {
          m.preventDefault(), d("/orders");
        }, children: "Orders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ p.jsxDEV(to, { to: "/riders", onClick: (m) => {
          m.preventDefault(), d("/riders");
        }, children: "Riders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 79,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ p.jsxDEV("span", { className: "site-nav-spacer" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 80,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ p.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ p.jsxDEV("button", { id: "notifBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "notifMenu", "aria-label": "Notifications", title: "Notifications", children: /* @__PURE__ */ p.jsxDEV("svg", { className: "bell-icon", width: "29", height: "29", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: [
            /* @__PURE__ */ p.jsxDEV("defs", { children: /* @__PURE__ */ p.jsxDEV("linearGradient", { id: "bellGold", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ p.jsxDEV("stop", { offset: "0%", stopColor: "#C08B3E" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 86,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ p.jsxDEV("stop", { offset: "50%", stopColor: "#D4AF37" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 87,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ p.jsxDEV("stop", { offset: "100%", stopColor: "#FFD700" }, void 0, !1, {
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
            /* @__PURE__ */ p.jsxDEV("path", { fill: "url(#bellGold)", d: "M12 22a2 2 0 0 0 1.995-1.85L14 20h-4a2 2 0 0 0 1.85 1.995L12 22Zm8-5h-1a1 1 0 0 1-.707-.293l-.147-.147A3.99 3.99 0 0 1 17 14.172V11a5 5 0 1 0-10 0v3.172a3.99 3.99 0 0 1-1.146 2.388l-.147.147A1 1 0 0 1 5 17H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2Z" }, void 0, !1, {
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
          /* @__PURE__ */ p.jsxDEV("div", { id: "notifMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "notifBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ p.jsxDEV("div", { className: "dropdown-header", children: "Notifications" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 95,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ p.jsxDEV("div", { className: "dropdown-item", children: "No new notifications" }, void 0, !1, {
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
        /* @__PURE__ */ p.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ p.jsxDEV("button", { id: "profileBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "profileMenu", title: "Profile", children: /* @__PURE__ */ p.jsxDEV("svg", { className: "avatar", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ p.jsxDEV("circle", { cx: "12", cy: "7.5", r: "3.5", stroke: "currentColor", strokeWidth: "1.5" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 102,
              columnNumber: 129
            }, this),
            /* @__PURE__ */ p.jsxDEV("path", { d: "M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }, void 0, !1, {
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
          /* @__PURE__ */ p.jsxDEV("div", { id: "profileMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "profileBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ p.jsxDEV("div", { className: "dropdown-header", children: "Signed in" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 105,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ p.jsxDEV(to, { className: "dropdown-item", to: "/settings", onClick: (m) => {
              m.preventDefault(), d("/settings");
            }, children: "Settings" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 106,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ p.jsxDEV("form", { method: "POST", action: "/auth/logout", children: /* @__PURE__ */ p.jsxDEV("button", { className: "dropdown-item", type: "submit", children: "Logout" }, void 0, !1, {
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
    /* @__PURE__ */ p.jsxDEV("main", { className: "content", children: o }, void 0, !1, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 113,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ p.jsxDEV("footer", { className: "site-footer", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " FreshBasket"
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 114,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ p.jsxDEV(L_, {}, void 0, !1, {
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
function M_({ onClose: o, onCreated: d }) {
  const [m, g] = C.useState(""), [y, E] = C.useState(""), [c, M] = C.useState(""), [R, T] = C.useState(""), [L, D] = C.useState(!1), [_, k] = C.useState(""), [B, ue] = C.useState(""), [te, me] = C.useState(!1), [K, I] = C.useState(!1), [G, F] = C.useState(!1), [Y, X] = C.useState(!1);
  async function ye() {
    k(""), ue(""), X(!0);
    const ie = String(m).trim(), Z = String(y), U = String(c).trim(), ve = String(R).trim(), ce = ve.replace(/\D+/g, ""), Ae = { fn: !U, cn: !ve, pw: !Z };
    if (me(Ae.fn), I(Ae.cn || ce.length < 7), F(Ae.pw), Ae.fn || Ae.cn || Ae.pw) {
      k("Full name, mobile and password are required");
      return;
    }
    if (ce.length < 7) {
      k("Please enter a valid mobile number"), I(!0);
      return;
    }
    if (ie && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ie)) {
      k("Please enter a valid email");
      return;
    }
    if (Z.length < 6) {
      F(!0), k("Password must be at least 6 characters");
      return;
    }
    D(!0);
    try {
      const Ue = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: ie, password: Z, fullName: U, contactNumber: ve })
      }), _e = await Ue.json().catch(() => null);
      if (!Ue.ok) {
        const ge = String(_e && (_e.error || _e.message) || ""), Je = ge.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(ge) || /MISSING\s*EMAIL\/PASSWORD/i.test(ge))
          k("Full name, mobile and password are required"), me(!U), I(!ve || ce.length < 7), F(!Z);
        else if (Je.includes("EMAIL_EXISTS"))
          k("An account with this email already exists. Use a different email or leave email blank.");
        else if (Je.includes("INVALID_EMAIL"))
          k("Please enter a valid email");
        else if (Je.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(ge))
          F(!0), k("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER/i.test(ge))
          I(!0), k("Please enter a valid mobile number");
        else if (/FIREBASE NOT CONFIGURED/i.test(ge))
          k("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(ge || "Failed to create rider");
        return;
      }
      ue("Rider created successfully"), d && d(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (Ue) {
      const _e = String((Ue == null ? void 0 : Ue.message) || "");
      /Missing\s*(fullName\/contactNumber|email\/password)/i.test(_e) ? k("Full name, mobile and password are required") : /EMAIL_EXISTS/i.test(_e) ? k("An account with this email already exists. Use a different email or leave email blank.") : /INVALID_EMAIL/i.test(_e) ? k("Please enter a valid email") : /WEAK_PASSWORD/i.test(_e) || /AT LEAST 6 CHARACTERS/i.test(_e) ? (F(!0), k("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER/i.test(_e) ? (I(!0), k("Please enter a valid mobile number")) : k(_e || "Failed to create rider");
    } finally {
      D(!1);
    }
  }
  return /* @__PURE__ */ p.jsxDEV("div", { className: "create-rider-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ p.jsxDEV("div", { className: "create-rider-modal", children: [
    /* @__PURE__ */ p.jsxDEV("header", { className: "create-rider-header", children: [
      /* @__PURE__ */ p.jsxDEV("h3", { className: "create-rider-title", children: "Create Rider" }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 93,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ p.jsxDEV("button", { className: "create-rider-close", onClick: o, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 94,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreateRiderModal.jsx",
      lineNumber: 92,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ p.jsxDEV("div", { className: "create-rider-body", children: [
      B && /* @__PURE__ */ p.jsxDEV("div", { className: "auth-success", children: B }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 97,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ p.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ p.jsxDEV("input", { className: "field-input" + (Y && !String(c).trim() ? " input-error" : ""), value: c, onChange: (ie) => {
          M(ie.target.value), Y && me(!String(ie.target.value).trim());
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
      /* @__PURE__ */ p.jsxDEV("label", { className: "field-label", children: [
        "Email",
        /* @__PURE__ */ p.jsxDEV("input", { className: "field-input", type: "email", value: m, onChange: (ie) => {
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
      /* @__PURE__ */ p.jsxDEV("label", { className: "field-label", children: [
        "Password",
        /* @__PURE__ */ p.jsxDEV("input", { className: "field-input" + (Y && !String(y) ? " input-error" : ""), type: "password", value: y, onChange: (ie) => {
          E(ie.target.value), Y && F(!String(ie.target.value));
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
      /* @__PURE__ */ p.jsxDEV("label", { className: "field-label", children: [
        "Contact number",
        /* @__PURE__ */ p.jsxDEV("input", { className: "field-input" + (Y && String(R).trim().replace(/\D+/g, "").length < 7 ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: R, onChange: (ie) => {
          if (T(ie.target.value), Y) {
            const Z = String(ie.target.value).trim().replace(/\D+/g, "");
            I(!(Z.length >= 7));
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
      _ && /* @__PURE__ */ p.jsxDEV("div", { className: "auth-error", children: _ }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 110,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ p.jsxDEV("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ p.jsxDEV("button", { className: "btn-secondary", onClick: o, disabled: L, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 112,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ p.jsxDEV("button", { className: "btn-primary", onClick: ye, disabled: L, children: L ? "Creating…" : "Create" }, void 0, !1, {
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
function LE() {
  if (typeof window > "u" || !window.localStorage)
    return { ...ma };
  try {
    const o = window.localStorage.getItem(Ef);
    if (!o)
      return { ...ma };
    const d = JSON.parse(o), m = Number(d == null ? void 0 : d.baseFare), g = Number(d == null ? void 0 : d.farePerKm);
    return {
      baseFare: Number.isFinite(m) ? m : ma.baseFare,
      farePerKm: Number.isFinite(g) ? g : ma.farePerKm
    };
  } catch {
    return { ...ma };
  }
}
const ME = "riderPerformancePct";
function AE() {
  if (typeof window > "u") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}
function VE() {
  const o = AE();
  if (!o) return {};
  try {
    const d = o.getItem(ME);
    if (!d) return {};
    const m = JSON.parse(d);
    if (m && typeof m == "object" && !Array.isArray(m))
      return m;
  } catch {
  }
  return {};
}
function A_(o) {
  if (o == null) return;
  const d = VE(), m = String(o);
  return d[m];
}
function V_(o) {
  if (!o || typeof o != "object") return;
  const d = AE();
  if (!d) return;
  const m = Object.entries(o);
  if (m.length === 0) return;
  const g = VE();
  let y = !1;
  const E = { ...g };
  for (const [c, M] of m) {
    const R = String(c);
    let T;
    if (typeof M == "number")
      T = M;
    else if (typeof M == "string")
      T = Number(M);
    else
      continue;
    Number.isFinite(T) && E[R] !== T && (E[R] = T, y = !0);
  }
  if (y)
    try {
      d.setItem(ME, JSON.stringify(E));
    } catch {
    }
}
function k_(o) {
  if (!o) return null;
  if (o instanceof Date)
    return Number.isFinite(o.getTime()) ? o : null;
  if (typeof o == "string") {
    const d = Date.parse(o);
    return Number.isFinite(d) ? new Date(d) : null;
  }
  if (typeof o == "number") {
    const d = new Date(o);
    return Number.isFinite(d.getTime()) ? d : null;
  }
  if (typeof o == "object") {
    if (typeof o.toDate == "function")
      try {
        const d = o.toDate();
        if (d instanceof Date && Number.isFinite(d.getTime())) return d;
      } catch {
      }
    if (typeof o.seconds == "number") {
      const d = o.seconds * 1e3 + (typeof o.nanoseconds == "number" ? Math.floor(o.nanoseconds / 1e6) : 0), m = new Date(d);
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
  for (const d of F_) {
    const m = o[d], g = k_(m);
    if (g) return U_(g);
  }
  return "";
}
function H_(o, d) {
  if (!Array.isArray(o) || !d) return 0;
  let m = 0;
  for (const g of o)
    z_(g) === d && (m += 1);
  return m;
}
function P_() {
  const [o, d] = C.useState([]), [m, g] = C.useState(""), [y, E] = C.useState(!0), [c, M] = C.useState(""), [R, T] = C.useState(1), [L, D] = C.useState(20), [_, k] = C.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [B, ue] = C.useState(!1), [te, me] = C.useState(ma);
  C.useEffect(() => {
    function Y() {
      me(LE());
    }
    Y();
    function X(ye) {
      ye.key === Ef && Y();
    }
    return typeof window < "u" && (window.addEventListener("storage", X), window.addEventListener("fare-settings-changed", Y)), () => {
      typeof window < "u" && (window.removeEventListener("storage", X), window.removeEventListener("fare-settings-changed", Y));
    };
  }, []), C.useEffect(() => {
    let Y = !0;
    return (async () => {
      var X, ye, ie, Z;
      E(!0), M("");
      try {
        const U = new URLSearchParams();
        m && U.set("q", m), U.set("page", String(R)), U.set("limit", String(L));
        const ve = await fetch(`/api/riders?${U.toString()}`, { credentials: "include" });
        if (ve.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ve.ok) throw new Error("Failed to load riders");
        const ce = await ve.json();
        Y && (d(Array.isArray(ce.riders) ? ce.riders : []), k({ total: ((X = ce.meta) == null ? void 0 : X.total) || 0, page: ((ye = ce.meta) == null ? void 0 : ye.page) || 1, limit: ((ie = ce.meta) == null ? void 0 : ie.limit) || L, pages: ((Z = ce.meta) == null ? void 0 : Z.pages) || 1 }));
      } catch (U) {
        Y && M(U.message || "Failed to load riders");
      } finally {
        Y && E(!1);
      }
    })(), () => {
      Y = !1;
    };
  }, [m, R, L]);
  const K = C.useMemo(() => o.filter((Y) => !(m && !String(Y.name || "").toLowerCase().includes(m.toLowerCase().trim()))), [o, m]), I = C.useMemo(() => {
    const Y = Number(te.farePerKm);
    return Number.isFinite(Y) ? Y : ma.farePerKm;
  }, [te]), G = C.useMemo(() => {
    const Y = Number(te.baseFare);
    return Number.isFinite(Y) ? Y : ma.baseFare;
  }, [te]);
  C.useEffect(() => {
    if (!Array.isArray(o) || o.length === 0) return;
    const Y = {};
    for (const X of o) {
      if (!X || X.id === void 0 || X.id === null) continue;
      const ye = Number(X.performancePct);
      Number.isFinite(ye) && (Y[X.id] = Math.round(ye));
    }
    Object.keys(Y).length !== 0 && V_(Y);
  }, [o]);
  const F = C.useMemo(() => {
    const Y = /* @__PURE__ */ new Date(), X = [], ye = [];
    for (let ie = 2; ie >= 0; ie--) {
      const Z = new Date(Y.getFullYear(), Y.getMonth() - ie, 1), U = `${Z.getFullYear()}-${String(Z.getMonth() + 1).padStart(2, "0")}`, ve = Z.toLocaleString(void 0, { month: "short", year: "numeric" });
      X.push(U), ye.push(ve);
    }
    return { keys: X, labels: ye };
  }, []);
  return /* @__PURE__ */ p.jsxDEV(Or, { children: /* @__PURE__ */ p.jsxDEV("section", { className: "rider-management", children: [
    /* @__PURE__ */ p.jsxDEV("header", { className: "rc-header riders-header", children: [
      /* @__PURE__ */ p.jsxDEV("div", { className: "riders-header-left", children: [
        /* @__PURE__ */ p.jsxDEV("h2", { className: "rc-title", children: "Rider Management" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 171,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ p.jsxDEV("p", { className: "rc-subtitle", children: "View and manage riders based on performance." }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 172,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 170,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ p.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ p.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => ue(!0), children: "Create Rider" }, void 0, !1, {
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
    /* @__PURE__ */ p.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ p.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ p.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 181,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ p.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: m, onChange: (Y) => {
          g(Y.target.value), T(1);
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
      /* @__PURE__ */ p.jsxDEV("div", { className: "rc-filters" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 184,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ p.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: L, onChange: (Y) => {
        D(parseInt(Y.target.value, 10)), T(1);
      }, children: [10, 20, 50, 100].map((Y) => /* @__PURE__ */ p.jsxDEV("option", { value: Y, children: [
        Y,
        "/page"
      ] }, Y, !0, {
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
    /* @__PURE__ */ p.jsxDEV("div", { className: "rc-table-wrapper", children: [
      B && /* @__PURE__ */ p.jsxDEV(M_, { onClose: () => ue(!1), onCreated: () => {
        window.location.reload();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 192,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ p.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ p.jsxDEV("thead", { children: /* @__PURE__ */ p.jsxDEV("tr", { children: [
          /* @__PURE__ */ p.jsxDEV("th", { className: "col-name", children: "Rider Name" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 197,
            columnNumber: 17
          }, this),
          F.labels.map((Y, X) => /* @__PURE__ */ p.jsxDEV("th", { className: "col-month", children: Y }, F.keys[X], !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 199,
            columnNumber: 19
          }, this)),
          /* @__PURE__ */ p.jsxDEV("th", { className: "col-earnings", children: (() => {
            const Y = F.keys[F.keys.length - 2], X = String(Y).split("-"), ye = parseInt(X[0], 10), ie = parseInt(X[1], 10);
            return `Earnings (${new Date(Number.isFinite(ye) ? ye : (/* @__PURE__ */ new Date()).getFullYear(), Number.isFinite(ie) ? ie - 1 : (/* @__PURE__ */ new Date()).getMonth() - 1, 1).toLocaleString(void 0, { month: "short" })}, Rs)`;
          })() }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 201,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ p.jsxDEV("th", { className: "col-perf", children: "Performance" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 202,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ p.jsxDEV("th", { className: "col-total", children: "Total" }, void 0, !1, {
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
        /* @__PURE__ */ p.jsxDEV("tbody", { children: [
          y && /* @__PURE__ */ p.jsxDEV("tr", { children: /* @__PURE__ */ p.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 208,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 208,
            columnNumber: 17
          }, this),
          !y && c && /* @__PURE__ */ p.jsxDEV("tr", { children: /* @__PURE__ */ p.jsxDEV("td", { colSpan: 7, className: "auth-error", children: c }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 211,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 211,
            columnNumber: 17
          }, this),
          !y && !c && K.map((Y) => /* @__PURE__ */ p.jsxDEV("tr", { "data-rider-id": Y.id, "data-status": Y.status, "data-last-days": Y.lastActiveDays, children: [
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ p.jsxDEV("a", { className: "rider-name-link", href: `/riders/${Y.id}`, children: Y.name }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 215,
              columnNumber: 47
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 215,
              columnNumber: 19
            }, this),
            F.keys.map((X) => {
              var ye;
              return /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-month", children: [
                Number(((ye = Y.monthlyCounts) == null ? void 0 : ye[X]) || 0).toFixed(2),
                " km"
              ] }, X, !0, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 217,
                columnNumber: 21
              }, this);
            }),
            (() => {
              var ve, ce;
              const X = F.keys[F.keys.length - 2], ye = Number(((ve = Y.monthlyCounts) == null ? void 0 : ve[X]) || 0), ie = Array.isArray(Y.orders) ? Y.orders : [], Z = Number(((ce = Y.monthlyRideCounts) == null ? void 0 : ce[X]) ?? H_(ie, X) ?? 0), U = ye * I + Z * G;
              return /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-earnings", children: Number.isFinite(U) ? `${U.toFixed(2)} Rs.` : "0 Rs." }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 225,
                columnNumber: 29
              }, this);
            })(),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-performance", children: Number.isFinite(Number(Y.performancePct)) ? `${Math.round(Number(Y.performancePct))}%` : "0%" }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 227,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-total", children: [
              Number(Y.totalKm || 0).toFixed(2),
              " km"
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 228,
              columnNumber: 19
            }, this)
          ] }, Y.id, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 214,
            columnNumber: 17
          }, this)),
          !y && !c && K.length === 0 && /* @__PURE__ */ p.jsxDEV("tr", { children: /* @__PURE__ */ p.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No riders found." }, void 0, !1, {
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
    /* @__PURE__ */ p.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ p.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ p.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page <= 1 || y, onClick: () => T((Y) => Math.max(1, Y - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 240,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ p.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        _.page,
        " of ",
        _.pages,
        " • ",
        _.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 241,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ p.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page >= _.pages || y, onClick: () => T((Y) => Math.min(_.pages, Y + 1)), children: "Next" }, void 0, !1, {
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
function si(o) {
  if (o == null) return null;
  if (o instanceof Date) return o;
  if (typeof (o == null ? void 0 : o.toDate) == "function")
    try {
      const d = o.toDate();
      if (d instanceof Date && !Number.isNaN(d.getTime())) return d;
    } catch {
      return null;
    }
  if (Fa(o) && o.seconds !== void 0) {
    const d = Number(o.seconds);
    if (Number.isFinite(d)) {
      const m = d * 1e3;
      return new Date(m);
    }
  }
  if (typeof o == "number") {
    if (!Number.isFinite(o)) return null;
    if (o > 1e12) return new Date(o);
    if (o > 1e9) return new Date(o * 1e3);
  }
  if (typeof o == "string") {
    const d = o.trim();
    if (!d) return null;
    let m = d;
    const g = m.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})\.(\d+)(.*)$/);
    g && g[2].length > 3 && (m = `${g[1]}.${g[2].slice(0, 3)}${g[3]}`);
    const y = Date.parse(m);
    if (Number.isFinite(y)) return new Date(y);
  }
  if (Fa(o)) {
    if (o.at) return si(o.at);
    if (o.value && o.value !== o) return si(o.value);
    if (o.expectedAt) return si(o.expectedAt);
  }
  return null;
}
function Sf(o) {
  if (o == null || o === "") return null;
  if (typeof o == "number")
    return Number.isFinite(o) ? o : null;
  if (o instanceof Date) return null;
  if (typeof o == "string") {
    const d = o.trim();
    if (!d) return null;
    if (Fv.test(d)) return parseFloat(d.replace(Fv, "$1"));
    if (pE.test(d)) return parseFloat(d.replace(pE, "$1")) / 60;
    const m = Number(d);
    return Number.isFinite(m) ? m : null;
  }
  if (Fa(o)) {
    if (Number.isFinite(o.minutes)) return Number(o.minutes);
    if (Number.isFinite(o.expectedMinutes)) return Number(o.expectedMinutes);
    if (Number.isFinite(o.seconds)) return Number(o.seconds) / 60;
    if (o.duration !== void 0 && o.duration !== o) {
      const d = Sf(o.duration);
      if (d !== null) return d;
    }
    if (o.value !== void 0 && o.value !== o) {
      const d = Sf(o.value);
      if (d !== null) return d;
    }
  }
  return null;
}
function B_(o) {
  var m, g, y, E, c, M;
  if (!Fa(o)) return null;
  const d = [
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
    (c = o.orders) == null ? void 0 : c.actualDuration,
    (M = o.orders) == null ? void 0 : M.actualDurationMinutes
  ];
  for (const R of d) {
    const T = Sf(R);
    if (T !== null) return T;
  }
  return null;
}
function $_(o) {
  var m, g, y, E;
  if (!Fa(o)) return null;
  const d = [
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
  for (const c of d)
    if (c != null) return c;
  return null;
}
function kE(o) {
  var m, g, y, E, c, M;
  if (!Fa(o)) return null;
  const d = [
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
    (c = o.orders) == null ? void 0 : c.started_at,
    (M = o.orders) == null ? void 0 : M.startedAt
  ];
  for (const R of d)
    if (R != null) return R;
  return null;
}
function Y_(o) {
  if (!Fa(o)) return null;
  const d = kE(o);
  return d ?? null;
}
function UE(o) {
  if (!Fa(o)) return null;
  const d = B_(o);
  if (Number.isFinite(d)) return d;
  const m = si($_(o)), g = si(kE(o));
  if (m instanceof Date && g instanceof Date) {
    const y = m.getTime() - g.getTime();
    if (y >= 0)
      return Math.round(y / 6e4);
  }
  return null;
}
function FE(o) {
  const d = si(o);
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) return "-";
  try {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
  const d = si(o);
  if (d instanceof Date && !Number.isNaN(d.getTime()))
    try {
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
  var g, y, E, c, M, R, T, L;
  if (!Fa(o)) return null;
  const d = [
    o.expected_delivery_time,
    o.expectedDeliveryTime,
    (g = o.order) == null ? void 0 : g.expected_delivery_time,
    (y = o.order) == null ? void 0 : y.expectedDeliveryTime,
    (E = o.orders) == null ? void 0 : E.expected_delivery_time,
    (c = o.orders) == null ? void 0 : c.expectedDeliveryTime,
    (M = o.delivery) == null ? void 0 : M.expected_delivery_time,
    (R = o.delivery) == null ? void 0 : R.expectedDeliveryTime,
    (T = o.expected_delivery) == null ? void 0 : T.time,
    (L = o.expected_delivery) == null ? void 0 : L.minutes,
    o.expected_time,
    o.expectedTime,
    o.expectedMinutes
  ];
  for (const D of d)
    if (D != null && !(typeof D == "string" && !D.trim()))
      return D;
  const m = o.delivery_events || o.deliveryEvents || o.events || null;
  if (Array.isArray(m))
    for (let D = m.length - 1; D >= 0; D -= 1) {
      const _ = m[D];
      if (!_) continue;
      const k = typeof _.type == "string" ? _.type.toLowerCase().trim() : "";
      if (!(k !== "eta" && k !== "expected")) {
        if (_.expectedMinutes !== void 0 && _.expectedMinutes !== null) return { minutes: _.expectedMinutes };
        if (_.minutes !== void 0 && _.minutes !== null) return { minutes: _.minutes };
        if (_.expectedAt) return _.expectedAt;
      }
    }
  return null;
}
function PE(o) {
  const d = Sf(o);
  if (d === null || !Number.isFinite(d)) return "-";
  const m = Math.round(d);
  if (m < 60) return `${m} min`;
  const g = Math.floor(m / 60), y = m % 60;
  return `${g}h ${y}m`;
}
function I_() {
  var k;
  const { id: o } = Fw(), [d, m] = C.useState(null), [g, y] = C.useState(!0), [E, c] = C.useState(""), [M, R] = C.useState(null);
  if (C.useEffect(() => {
    const B = A_(o);
    if (typeof B == "number" && Number.isFinite(B))
      R(B);
    else if (typeof B == "string") {
      const ue = Number(B);
      Number.isFinite(ue) ? R(ue) : R(null);
    } else
      R(null);
  }, [o]), C.useEffect(() => {
    let B = !0;
    return (async () => {
      y(!0), c("");
      try {
        const ue = await fetch(`/api/riders/${o}`, { credentials: "include" });
        if (ue.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ue.ok) throw new Error("Failed to load rider");
        const te = await ue.json();
        B && m(te);
      } catch (ue) {
        B && c(ue.message || "Failed to load rider");
      } finally {
        B && y(!1);
      }
    })(), () => {
      B = !1;
    };
  }, [o]), g)
    return /* @__PURE__ */ p.jsxDEV(Or, { children: /* @__PURE__ */ p.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ p.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
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
    return /* @__PURE__ */ p.jsxDEV(Or, { children: /* @__PURE__ */ p.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ p.jsxDEV("div", { className: "auth-error", children: E }, void 0, !1, {
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
  if (!d)
    return /* @__PURE__ */ p.jsxDEV(Or, { children: /* @__PURE__ */ p.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ p.jsxDEV("div", { className: "section-note", children: "Not found" }, void 0, !1, {
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
  const { rider: T, metrics: L, history: D } = d, _ = M ?? (Number.isFinite(Number(L == null ? void 0 : L.onTimeRate)) ? Math.round(Number(L.onTimeRate)) : 0);
  return /* @__PURE__ */ p.jsxDEV(Or, { children: /* @__PURE__ */ p.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ p.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ p.jsxDEV("h2", { className: "rc-title", children: "Rider Profile" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 63,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ p.jsxDEV("p", { className: "rc-subtitle", children: "View detailed performance metrics for individual riders." }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 64,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 62,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ p.jsxDEV("div", { className: "rc-table-wrapper rp-card", children: /* @__PURE__ */ p.jsxDEV("div", { className: "rp-details", children: [
      /* @__PURE__ */ p.jsxDEV("img", { src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2Ff54e0df2f0fb4bff9c894340e2efe67a?format=webp&width=72", alt: "avatar", className: "rp-avatar" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 69,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ p.jsxDEV("div", { children: [
        /* @__PURE__ */ p.jsxDEV("h3", { className: "rp-name", children: T.name }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 71,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ p.jsxDEV("div", { className: "section-note", children: [
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
    /* @__PURE__ */ p.jsxDEV("div", { className: "rc-toolbar rp-stats", children: /* @__PURE__ */ p.jsxDEV("div", { className: "rc-filters rp-stats-wrap", children: [
      /* @__PURE__ */ p.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Total Deliveries ",
        /* @__PURE__ */ p.jsxDEV("strong", { children: Array.isArray(T.orders) ? T.orders.length : 0 }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 79,
          columnNumber: 70
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 79,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ p.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "On-Time Rate ",
        /* @__PURE__ */ p.jsxDEV("strong", { children: [
          _,
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
      /* @__PURE__ */ p.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Total KM Traveled ",
        /* @__PURE__ */ p.jsxDEV("strong", { children: [
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
    /* @__PURE__ */ p.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ p.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ p.jsxDEV("thead", { children: /* @__PURE__ */ p.jsxDEV("tr", { children: [
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-name order-heading", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 89,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-km date-heading", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-start-time start-heading", children: "Start" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 91,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-expected expected-heading", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 92,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-actual actual-heading", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 93,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-comm distance-heading", children: "Distance (KM)" }, void 0, !1, {
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
      /* @__PURE__ */ p.jsxDEV("tbody", { children: [
        (d.riderOrders || []).map((B, ue) => {
          const te = B.name || B.orderId, me = si(B.created_at), K = me instanceof Date && !Number.isNaN(me.getTime()) ? me.toISOString().slice(0, 10) : "-", I = FE(B.deliveryStartTime), G = HE(B), F = zE(G), Y = UE(B), X = PE(Y), ye = Number(B.distance_km), ie = Number.isFinite(ye) ? `${ye.toFixed(2)} km` : typeof B.distance_km == "string" && B.distance_km.trim() ? B.distance_km : "-";
          return /* @__PURE__ */ p.jsxDEV("tr", { children: [
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-name order-cell", children: te }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 113,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-km date-cell", children: K }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 114,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-start-time start-cell", children: I }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 115,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-expected expected-cell", children: F }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 116,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: X }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 117,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-commission distance-cell", children: ie }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 118,
              columnNumber: 21
            }, this)
          ] }, B.orderId || ue, !0, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 112,
            columnNumber: 19
          }, this);
        }),
        !((k = d.riderOrders) != null && k.length) && (D || []).map((B, ue) => /* @__PURE__ */ p.jsxDEV("tr", { children: [
          /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-name order-cell", children: B.date }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 124,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-km date-cell", children: B.deliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 125,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-start-time start-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 126,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-expected expected-cell", children: B.avgTime ? `${B.avgTime} min` : "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 127,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 128,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-commission distance-cell", children: Number.isFinite(Number(B.distanceKm)) ? `${Number(B.distanceKm).toFixed(2)} km` : B.distanceKm || "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 129,
            columnNumber: 19
          }, this)
        ] }, `h-${ue}`, !0, {
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
function BE({ orderId: o, onClose: d, onAssigned: m }) {
  const [g, y] = C.useState([]), [E, c] = C.useState(!0), [M, R] = C.useState(""), [T, L] = C.useState(null);
  C.useEffect(() => {
    let _ = !0;
    return (async () => {
      c(!0), R("");
      try {
        const k = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (k.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!k.ok) throw new Error("Failed to load riders");
        const B = await k.json();
        _ && y(Array.isArray(B.riders) ? B.riders : B.riders || []);
      } catch (k) {
        _ && R(k.message || "Failed to load riders");
      } finally {
        _ && c(!1);
      }
    })(), () => {
      _ = !1;
    };
  }, []);
  async function D(_) {
    if (!(!o || !_)) {
      L(_);
      try {
        const k = await fetch(`/api/orders/${encodeURIComponent(o)}/assign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riderId: _ })
        });
        if (k.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const B = await k.json().catch(() => null);
        if (!k.ok) throw new Error(B && B.error ? B.error : "Assign failed");
        m && m({ orderId: o, riderId: _ }), d();
      } catch (k) {
        alert(k.message || "Failed to assign rider");
      } finally {
        L(null);
      }
    }
  }
  return /* @__PURE__ */ p.jsxDEV("div", { className: "assign-modal-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ p.jsxDEV("div", { className: "assign-modal", children: [
    /* @__PURE__ */ p.jsxDEV("header", { className: "assign-modal-header", children: [
      /* @__PURE__ */ p.jsxDEV("h3", { className: "assign-modal-title", children: "Assign Rider" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 48,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ p.jsxDEV("button", { className: "assign-modal-close", onClick: d, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 49,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 47,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ p.jsxDEV("div", { className: "assign-modal-body", children: [
      E && /* @__PURE__ */ p.jsxDEV("div", { className: "section-note", children: "Loading riders…" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 52,
        columnNumber: 23
      }, this),
      M && /* @__PURE__ */ p.jsxDEV("div", { className: "auth-error", children: M }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 53,
        columnNumber: 21
      }, this),
      !E && !M && /* @__PURE__ */ p.jsxDEV("table", { className: "assign-table", children: [
        /* @__PURE__ */ p.jsxDEV("thead", { children: /* @__PURE__ */ p.jsxDEV("tr", { children: [
          /* @__PURE__ */ p.jsxDEV("th", { children: "Name" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 57,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ p.jsxDEV("th", { children: "Last Active (days)" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 57,
            columnNumber: 34
          }, this),
          /* @__PURE__ */ p.jsxDEV("th", { children: "Action" }, void 0, !1, {
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
        /* @__PURE__ */ p.jsxDEV("tbody", { children: [
          g.map((_) => /* @__PURE__ */ p.jsxDEV("tr", { children: [
            /* @__PURE__ */ p.jsxDEV("td", { children: _.name }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 62,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { children: _.lastActiveDays ?? "-" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 63,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { children: /* @__PURE__ */ p.jsxDEV("button", { className: "btn-assign", onClick: () => D(_.id), disabled: T && T !== _.id, children: T === _.id ? "Assigning…" : "Assign" }, void 0, !1, {
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
          g.length === 0 && /* @__PURE__ */ p.jsxDEV("tr", { children: /* @__PURE__ */ p.jsxDEV("td", { colSpan: 3, className: "section-note", children: "No riders found." }, void 0, !1, {
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
function zv(o) {
  if (typeof o != "string") return "";
  const d = o.toLowerCase().trim().replace(/[\s-]+/g, "_");
  return d === "in_transit" ? "in_progress" : d;
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
  const [o, d] = C.useState([]), [m, g] = C.useState(""), [y, E] = C.useState("all"), [c, M] = C.useState(1), [R, T] = C.useState(20), [L, D] = C.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [_, k] = C.useState(!0), [B, ue] = C.useState(""), [te, me] = C.useState(""), [K, I] = C.useState(!0), [G, F] = C.useState(!1), [Y, X] = C.useState(null);
  C.useEffect(() => {
    let U = !0;
    return (async () => {
      var ve, ce, Ae, Ue;
      k(!0), ue(""), me("");
      try {
        const _e = new URLSearchParams();
        if (m && _e.set("q", m), y && y !== "all") {
          const pn = vE[y] || y;
          _e.set("status", zv(pn));
        }
        _e.set("page", String(c)), _e.set("limit", String(R));
        const ge = await fetch(`/api/orders?${_e.toString()}`, { credentials: "include" });
        if (ge.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ge.ok) throw new Error("Failed to load orders");
        const Je = await ge.json();
        U && (d(Array.isArray(Je.orders) ? Je.orders : []), me(Je.shopifyError || ""), I(!!Je.shopifyConfigured), D({ total: ((ve = Je.meta) == null ? void 0 : ve.total) || 0, page: ((ce = Je.meta) == null ? void 0 : ce.page) || 1, limit: ((Ae = Je.meta) == null ? void 0 : Ae.limit) || R, pages: ((Ue = Je.meta) == null ? void 0 : Ue.pages) || 1 }));
      } catch (_e) {
        U && ue(_e.message || "Failed to load orders");
      } finally {
        U && k(!1);
      }
    })(), () => {
      U = !1;
    };
  }, [m, y, c, R]), C.useMemo(() => o, [o]);
  const ye = C.useMemo(() => {
    if (!Array.isArray(o)) return [];
    if (y === "all") return o.slice();
    const U = zv(vE[y] || y);
    return o.filter((ve) => mE(ve) === U);
  }, [o, y]);
  function ie() {
    X(null), F(!1);
  }
  function Z(U) {
    try {
      const { orderId: ve } = U || {};
      if (!ve) return;
      const ce = String(ve).replace(/^#+/, "");
      M(1);
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${ve}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  return /* @__PURE__ */ p.jsxDEV(Or, { children: /* @__PURE__ */ p.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ p.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ p.jsxDEV("h2", { className: "rc-title", children: "Order Management" }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 103,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ p.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 104,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 102,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ p.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ p.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ p.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 109,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ p.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: m, onChange: (U) => {
          g(U.target.value), M(1);
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
      /* @__PURE__ */ p.jsxDEV("div", { className: "rc-filters", children: [
        q_.map(({ key: U, label: ve }) => /* @__PURE__ */ p.jsxDEV("button", { className: `rc-select rc-chip${y === U ? " active" : ""}`, onClick: () => {
          E(U), M(1);
        }, "data-filter": U, children: ve }, U, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 114,
          columnNumber: 15
        }, this)),
        /* @__PURE__ */ p.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: R, onChange: (U) => {
          T(parseInt(U.target.value, 10)), M(1);
        }, children: [10, 20, 50, 100].map((U) => /* @__PURE__ */ p.jsxDEV("option", { value: U, children: [
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
    !K && /* @__PURE__ */ p.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 125,
      columnNumber: 11
    }, this),
    te && /* @__PURE__ */ p.jsxDEV("div", { className: "auth-error", children: te }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 127,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ p.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ p.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ p.jsxDEV("thead", { children: /* @__PURE__ */ p.jsxDEV("tr", { children: [
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-name order-id-heading", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 133,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-km customer-heading", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 134,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-perf address-heading", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 135,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-rider rider-heading", children: "Rider" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 136,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-start-time start-heading", children: "Start" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 137,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-expected expected-heading", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 138,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-actual actual-heading", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 139,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-status status-heading", children: "Status" }, void 0, !1, {
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
      /* @__PURE__ */ p.jsxDEV("tbody", { children: [
        _ && /* @__PURE__ */ p.jsxDEV("tr", { children: /* @__PURE__ */ p.jsxDEV("td", { colSpan: 8, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 145,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 145,
          columnNumber: 17
        }, this),
        !_ && B && /* @__PURE__ */ p.jsxDEV("tr", { children: /* @__PURE__ */ p.jsxDEV("td", { colSpan: 8, className: "auth-error", children: B }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 148,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 148,
          columnNumber: 17
        }, this),
        !_ && !B && ye.map((U, ve) => {
          var Dt;
          const ce = $E(U), Ae = mE(U), Ue = U.full_name || (U.customer && U.customer.full_name ? U.customer.full_name : "");
          let _e = "-";
          typeof U.shipping_address == "string" && String(U.shipping_address).trim() ? _e = String(U.shipping_address).trim() : U.shipping_address && typeof U.shipping_address == "object" ? _e = [U.shipping_address.address1 || "", U.shipping_address.city || "", U.shipping_address.province || "", U.shipping_address.country || ""].map((Jt) => String(Jt || "").trim()).filter(Boolean).join(", ") || "-" : typeof U.billing_address == "string" && String(U.billing_address).trim() ? _e = String(U.billing_address).trim() : U.billing_address && typeof U.billing_address == "object" && (_e = [U.billing_address.address1 || "", U.billing_address.city || "", U.billing_address.province || "", U.billing_address.country || ""].map((Jt) => String(Jt || "").trim()).filter(Boolean).join(", ") || "-");
          const ge = U.name || U.order_number || U.id, pn = (ge != null ? String(ge).replace(/^#+/, "").trim() : "") || "-", Qt = Y_(U), xn = FE(Qt), Ct = HE(U), In = zE(Ct), Xt = UE(U), ha = PE(Xt), na = U.rider ? String(U.rider) : (Dt = U.assignment) != null && Dt.riderId ? String(U.assignment.riderId) : "Unassigned";
          return /* @__PURE__ */ p.jsxDEV("tr", { "data-status": Ae, children: [
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-name order-id-cell", children: pn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 179,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-km customer-cell", children: Ue || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 180,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-perf address-cell", children: _e }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 181,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-rider rider-cell", children: na }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 182,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-start-time start-cell", children: xn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 183,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-expected expected-cell", children: In }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 184,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: ha }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 185,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-status status-cell", children: /* @__PURE__ */ p.jsxDEV("span", { className: `status-chip status-${Ae}`, children: ce }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 186,
              columnNumber: 63
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 186,
              columnNumber: 21
            }, this)
          ] }, ge || ve, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 178,
            columnNumber: 19
          }, this);
        }),
        !_ && !B && ye.length === 0 && /* @__PURE__ */ p.jsxDEV("tr", { children: /* @__PURE__ */ p.jsxDEV("td", { colSpan: 8, className: "section-note", children: "No orders to display." }, void 0, !1, {
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
    /* @__PURE__ */ p.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: [
      G && Y && /* @__PURE__ */ p.jsxDEV(BE, { orderId: Y, onClose: ie, onAssigned: Z }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 198,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ p.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ p.jsxDEV("button", { className: "rc-select rc-chip", disabled: L.page <= 1 || _, onClick: () => M((U) => Math.max(1, U - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 202,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ p.jsxDEV("span", { className: "section-note", children: [
          "Page ",
          L.page,
          " of ",
          L.pages,
          " • ",
          L.total,
          " total"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 203,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ p.jsxDEV("button", { className: "rc-select rc-chip", disabled: L.page >= L.pages || _, onClick: () => M((U) => Math.min(L.pages, U + 1)), children: "Next" }, void 0, !1, {
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
  const [o, d] = C.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [m, g] = C.useState([]), [y, E] = C.useState(!1), [c, M] = C.useState(!0), [R, T] = C.useState("");
  return C.useEffect(() => {
    let L = !0;
    return (async () => {
      M(!0), T("");
      try {
        const D = await fetch("/api/reports", { credentials: "include" });
        if (D.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!D.ok) throw new Error("Failed to load reports");
        const _ = await D.json();
        L && (d(_.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), g(Array.isArray(_.deliveries) ? _.deliveries : []));
      } catch (D) {
        L && T(D.message || "Failed to load reports");
      } finally {
        L && M(!1);
      }
    })(), () => {
      L = !1;
    };
  }, []), /* @__PURE__ */ p.jsxDEV(Or, { children: /* @__PURE__ */ p.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ p.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ p.jsxDEV("h2", { className: "rc-title", children: "Reporting & Analytics" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 34,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ p.jsxDEV("p", { className: "rc-subtitle", children: "Gain insights into your delivery operations with detailed reports and visualizations." }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 35,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 33,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ p.jsxDEV("div", { className: "rc-toolbar", children: /* @__PURE__ */ p.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ p.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "overview", children: "Overview" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 40,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ p.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "performance", children: "Performance" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 41,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ p.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "custom", children: "Custom Reports" }, void 0, !1, {
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
    /* @__PURE__ */ p.jsxDEV("div", { id: "tab-overview", children: [
      /* @__PURE__ */ p.jsxDEV("div", { className: "rc-table-wrapper reports-overview", children: [
        /* @__PURE__ */ p.jsxDEV("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ p.jsxDEV("div", { className: "section-title reports-stat-title", children: "Total Deliveries" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 49,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ p.jsxDEV("div", { className: "reports-stat-value", children: o.totalDeliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 50,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 48,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ p.jsxDEV("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ p.jsxDEV("div", { className: "section-title reports-stat-title", children: "Average Delivery Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 53,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ p.jsxDEV("div", { className: "reports-stat-value", children: [
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
      /* @__PURE__ */ p.jsxDEV("div", { className: "rc-toolbar reports-toolbar-center", children: [
        /* @__PURE__ */ p.jsxDEV("div", { className: "section-title reports-stat-title", children: "Delivery Data" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 59,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ p.jsxDEV("label", { className: "rc-select rc-chip toggle-data-label", children: [
          /* @__PURE__ */ p.jsxDEV("input", { type: "checkbox", checked: y, onChange: (L) => E(L.target.checked) }, void 0, !1, {
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
      y && /* @__PURE__ */ p.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ p.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ p.jsxDEV("thead", { children: /* @__PURE__ */ p.jsxDEV("tr", { children: [
          /* @__PURE__ */ p.jsxDEV("th", { className: "col-name", children: "Order Number" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 70,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ p.jsxDEV("th", { className: "col-km", children: "Rider Assigned" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 71,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ p.jsxDEV("th", { className: "col-perf", children: "Expected Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 72,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ p.jsxDEV("th", { className: "col-perf", children: "Actual Delivery Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 73,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ p.jsxDEV("th", { className: "col-perf", children: "Distance Traveled" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 74,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ p.jsxDEV("th", { className: "col-comm", children: "Status" }, void 0, !1, {
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
        /* @__PURE__ */ p.jsxDEV("tbody", { children: [
          !c && !R && m.map((L, D) => /* @__PURE__ */ p.jsxDEV("tr", { children: [
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              L.orderNumber || L.orderId
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 81,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-km", children: L.riderId || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 82,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-perf", children: L.expectedMinutes != null ? `${L.expectedMinutes} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 83,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-perf", children: L.durationMins != null ? `${L.durationMins} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 84,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-perf", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 85,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-commission", children: L.status || "new" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 86,
              columnNumber: 23
            }, this)
          ] }, L.orderId || D, !0, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 80,
            columnNumber: 21
          }, this)),
          !c && !R && m.length === 0 && /* @__PURE__ */ p.jsxDEV("tr", { children: /* @__PURE__ */ p.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No data." }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 90,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 90,
            columnNumber: 21
          }, this),
          c && /* @__PURE__ */ p.jsxDEV("tr", { children: /* @__PURE__ */ p.jsxDEV("td", { colSpan: 6, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 93,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 93,
            columnNumber: 21
          }, this),
          R && /* @__PURE__ */ p.jsxDEV("tr", { children: /* @__PURE__ */ p.jsxDEV("td", { colSpan: 6, className: "auth-error", children: R }, void 0, !1, {
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
  const [o, d] = C.useState([]), [m, g] = C.useState(!0), [y, E] = C.useState(""), [c, M] = C.useState(1), [R, T] = C.useState(25), [L, D] = C.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  C.useEffect(() => {
    let G = !0;
    return (async () => {
      var F, Y, X, ye;
      g(!0), E("");
      try {
        const ie = new URLSearchParams();
        ie.set("limit", String(R)), ie.set("page", String(c));
        const Z = await fetch(`/api/orders?${ie.toString()}`, { credentials: "include" });
        if (Z.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Z.ok) throw new Error("Failed to load orders");
        const U = await Z.json();
        G && (d(Array.isArray(U.orders) ? U.orders : []), D({ total: ((F = U.meta) == null ? void 0 : F.total) || 0, page: ((Y = U.meta) == null ? void 0 : Y.page) || c, limit: ((X = U.meta) == null ? void 0 : X.limit) || R, pages: ((ye = U.meta) == null ? void 0 : ye.pages) || 1 }));
      } catch (ie) {
        G && E(ie.message || "Failed to load orders");
      } finally {
        G && g(!1);
      }
    })(), () => {
      G = !1;
    };
  }, [c]);
  function _(G) {
    return !G || typeof G != "object" ? "new" : typeof G.current_status == "string" && String(G.current_status).trim() ? String(G.current_status).toLowerCase().trim() : "new";
  }
  const [k, B] = C.useState(!1), [ue, te] = C.useState(null);
  function me(G) {
    te(G), B(!0);
  }
  function K() {
    te(null), B(!1);
  }
  function I(G) {
    try {
      const { orderId: F } = G || {};
      if (!F) return;
      const Y = String(F).replace(/^#+/, "");
      d((X) => X.filter((ye, ie) => {
        const Z = String(ye.id || ye.name || ye.order_number || ie).replace(/^#+/, "");
        return String(Z) !== String(Y);
      })), D((X) => ({ ...X || {}, total: Math.max(0, ((X == null ? void 0 : X.total) || 0) - 1) }));
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${F}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  return /* @__PURE__ */ p.jsxDEV(Or, { children: /* @__PURE__ */ p.jsxDEV("section", { className: "dashboard-orders", children: [
    /* @__PURE__ */ p.jsxDEV("header", { className: "rc-header dashboard-header", children: [
      /* @__PURE__ */ p.jsxDEV("div", { className: "dashboard-header-left", children: [
        /* @__PURE__ */ p.jsxDEV("h2", { className: "rc-title", children: "Recent Orders" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 70,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ p.jsxDEV("p", { className: "rc-subtitle", children: "Latest orders synced from Shopify." }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 71,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 69,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ p.jsxDEV("div", { className: "dashboard-header-right", children: [
        /* @__PURE__ */ p.jsxDEV("div", { className: "stat-card", children: [
          /* @__PURE__ */ p.jsxDEV("div", { className: "stat-value", children: m ? "…" : L.total || o.length }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 75,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ p.jsxDEV("div", { className: "stat-label", children: "Orders" }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 76,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 74,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ p.jsxDEV("button", { className: "btn-primary", onClick: () => window.location.reload(), children: "Refresh" }, void 0, !1, {
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
    /* @__PURE__ */ p.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ p.jsxDEV("table", { className: "rc-table dashboard-table", children: [
      /* @__PURE__ */ p.jsxDEV("thead", { children: /* @__PURE__ */ p.jsxDEV("tr", { children: [
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-order", children: "Order #" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 86,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-customer", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 87,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-address", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 88,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-status", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 89,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-date", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-time", children: "Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 91,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ p.jsxDEV("th", { className: "col-action", children: "Action" }, void 0, !1, {
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
      /* @__PURE__ */ p.jsxDEV("tbody", { children: [
        m && /* @__PURE__ */ p.jsxDEV("tr", { children: /* @__PURE__ */ p.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 96,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 96,
          columnNumber: 28
        }, this),
        !m && y && /* @__PURE__ */ p.jsxDEV("tr", { children: /* @__PURE__ */ p.jsxDEV("td", { colSpan: 7, className: "auth-error", children: y }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 97,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 97,
          columnNumber: 28
        }, this),
        !m && !y && (Array.isArray(o) ? o.filter((F) => _(F) === "new") : []).map((F, Y) => {
          const X = _(F), ye = F.full_name || (F.customer && F.customer.full_name ? F.customer.full_name : "");
          let ie = "-";
          typeof F.shipping_address == "string" && String(F.shipping_address).trim() ? ie = String(F.shipping_address).trim() : F.shipping_address && typeof F.shipping_address == "object" ? ie = [F.shipping_address.address1 || "", F.shipping_address.city || "", F.shipping_address.province || "", F.shipping_address.country || ""].map((Ue) => String(Ue || "").trim()).filter(Boolean).join(", ") || "-" : typeof F.billing_address == "string" && String(F.billing_address).trim() ? ie = String(F.billing_address).trim() : F.billing_address && typeof F.billing_address == "object" && (ie = [F.billing_address.address1 || "", F.billing_address.city || "", F.billing_address.province || "", F.billing_address.country || ""].map((Ue) => String(Ue || "").trim()).filter(Boolean).join(", ") || "-");
          const Z = F.name || F.order_number || F.id || Y, U = String(F.id || F.name || F.order_number || Y).replace(/^#+/, ""), ve = F.created_at ? new Date(F.created_at) : null, ce = ve ? ve.toLocaleDateString() : "-", Ae = ve ? ve.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ p.jsxDEV("tr", { "data-status": X, children: [
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-order", children: Z }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 122,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-customer", children: ye || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 123,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-address", children: ie }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 124,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ p.jsxDEV("span", { className: `status-chip status-${X}`, children: X.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 125,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 125,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-date", children: ce }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 126,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-time", children: Ae }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 127,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ p.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ p.jsxDEV("button", { className: "order-action btn-manage", onClick: () => me(String(F.id || F.name || F.order_number || Y)), children: "Assign" }, void 0, !1, {
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
        !m && !y && o.length === 0 && /* @__PURE__ */ p.jsxDEV("tr", { children: /* @__PURE__ */ p.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
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
    /* @__PURE__ */ p.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ p.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ p.jsxDEV("button", { className: "rc-select rc-chip", disabled: L.page <= 1 || m, onClick: () => M((G) => Math.max(1, G - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 140,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ p.jsxDEV("span", { className: "section-note", children: [
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
      /* @__PURE__ */ p.jsxDEV("button", { className: "rc-select rc-chip", disabled: L.page >= L.pages || m, onClick: () => M((G) => Math.min(L.pages, G + 1)), children: "Next" }, void 0, !1, {
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
    k && ue && /* @__PURE__ */ p.jsxDEV(BE, { orderId: ue, onClose: K, onAssigned: I }, void 0, !1, {
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
  const [o, d] = C.useState(ma.baseFare), [m, g] = C.useState(ma.farePerKm), [y, E] = C.useState(!1);
  C.useEffect(() => {
    const R = LE();
    d(R.baseFare), g(R.farePerKm);
  }, []);
  function c() {
    E(!0);
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
      E(!1);
    }
  }
  function M() {
    d(ma.baseFare), g(ma.farePerKm);
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
  return /* @__PURE__ */ p.jsxDEV(Or, { children: /* @__PURE__ */ p.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ p.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ p.jsxDEV("h2", { className: "rc-title", children: "Settings" }, void 0, !1, {
        fileName: "/app/code/client/pages/Settings.jsx",
        lineNumber: 43,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ p.jsxDEV("p", { className: "rc-subtitle", children: "Manage fares for earnings calculations." }, void 0, !1, {
        fileName: "/app/code/client/pages/Settings.jsx",
        lineNumber: 44,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Settings.jsx",
      lineNumber: 42,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ p.jsxDEV("div", { className: "fare-settings-card", children: [
      /* @__PURE__ */ p.jsxDEV("div", { className: "fare-fields", children: [
        /* @__PURE__ */ p.jsxDEV("label", { className: "fare-field", children: [
          /* @__PURE__ */ p.jsxDEV("span", { className: "fare-field-label", children: "Base Fare" }, void 0, !1, {
            fileName: "/app/code/client/pages/Settings.jsx",
            lineNumber: 50,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ p.jsxDEV(
            "input",
            {
              type: "number",
              className: "fare-field-input",
              value: Number.isFinite(o) ? String(o) : "",
              min: "0",
              step: "0.01",
              onChange: (R) => d(R.target.value === "" ? 0 : Number(R.target.value)),
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
        /* @__PURE__ */ p.jsxDEV("label", { className: "fare-field", children: [
          /* @__PURE__ */ p.jsxDEV("span", { className: "fare-field-label", children: "Fare per Km" }, void 0, !1, {
            fileName: "/app/code/client/pages/Settings.jsx",
            lineNumber: 62,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ p.jsxDEV(
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
      /* @__PURE__ */ p.jsxDEV("div", { className: "fare-actions", children: [
        /* @__PURE__ */ p.jsxDEV("button", { className: "btn-primary", onClick: c, disabled: y, children: "Save" }, void 0, !1, {
          fileName: "/app/code/client/pages/Settings.jsx",
          lineNumber: 75,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ p.jsxDEV("button", { className: "btn-secondary", onClick: M, disabled: y, children: "Reset" }, void 0, !1, {
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
  return /* @__PURE__ */ p.jsxDEV(g_, { children: /* @__PURE__ */ p.jsxDEV(n_, { children: [
    /* @__PURE__ */ p.jsxDEV(ar, { path: "/auth/login", element: /* @__PURE__ */ p.jsxDEV(__, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ p.jsxDEV(ar, { path: "/auth/register", element: /* @__PURE__ */ p.jsxDEV(O_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ p.jsxDEV(ar, { path: "/riders", element: /* @__PURE__ */ p.jsxDEV(P_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ p.jsxDEV(ar, { path: "/riders/:id", element: /* @__PURE__ */ p.jsxDEV(I_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ p.jsxDEV(ar, { path: "/orders", element: /* @__PURE__ */ p.jsxDEV(G_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ p.jsxDEV(ar, { path: "/reports", element: /* @__PURE__ */ p.jsxDEV(W_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 41
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ p.jsxDEV(ar, { path: "/dashboard", element: /* @__PURE__ */ p.jsxDEV(K_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ p.jsxDEV(ar, { path: "/settings", element: /* @__PURE__ */ p.jsxDEV(Q_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 23,
      columnNumber: 42
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 23,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ p.jsxDEV(ar, { path: "*", element: /* @__PURE__ */ p.jsxDEV(e_, { to: "/auth/login", replace: !0 }, void 0, !1, {
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
  SE(o).render(/* @__PURE__ */ p.jsxDEV(X_, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", hE) : hE();
