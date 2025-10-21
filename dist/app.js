function aw(o, d) {
  for (var m = 0; m < d.length; m++) {
    const g = d[m];
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
var gE = { exports: {} }, Ah = {}, yE = { exports: {} }, bf = { exports: {} };
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
    var m = "18.3.1", g = Symbol.for("react.element"), y = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), T = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), L = Symbol.for("react.suspense_list"), U = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), se = Symbol.for("react.offscreen"), ie = Symbol.iterator, oe = "@@iterator";
    function W(p) {
      if (p === null || typeof p != "object")
        return null;
      var b = ie && p[ie] || p[oe];
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
    }, le = {
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
    }, H = {}, ye = null;
    function ee(p) {
      ye = p;
    }
    H.setExtraStackFrame = function(p) {
      ye = p;
    }, H.getCurrentStack = null, H.getStackAddendum = function() {
      var p = "";
      ye && (p += ye);
      var b = H.getCurrentStack;
      return b && (p += b() || ""), p;
    };
    var Q = !1, re = !1, je = !1, Y = !1, k = !1, Z = {
      ReactCurrentDispatcher: $,
      ReactCurrentBatchConfig: G,
      ReactCurrentOwner: I
    };
    Z.ReactDebugCurrentFrame = H, Z.ReactCurrentActQueue = le;
    function pe(p) {
      {
        for (var b = arguments.length, V = new Array(b > 1 ? b - 1 : 0), F = 1; F < b; F++)
          V[F - 1] = arguments[F];
        _e("warn", p, V);
      }
    }
    function te(p) {
      {
        for (var b = arguments.length, V = new Array(b > 1 ? b - 1 : 0), F = 1; F < b; F++)
          V[F - 1] = arguments[F];
        _e("error", p, V);
      }
    }
    function _e(p, b, V) {
      {
        var F = Z.ReactDebugCurrentFrame, ae = F.getStackAddendum();
        ae !== "" && (b += "%s", V = V.concat([ae]));
        var Te = V.map(function(Ne) {
          return String(Ne);
        });
        Te.unshift("Warning: " + b), Function.prototype.apply.call(console[p], console, Te);
      }
    }
    var Qe = {};
    function ne(p, b) {
      {
        var V = p.constructor, F = V && (V.displayName || V.name) || "ReactClass", ae = F + "." + b;
        if (Qe[ae])
          return;
        te("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", b, F), Qe[ae] = !0;
      }
    }
    var Me = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function(p) {
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
      enqueueForceUpdate: function(p, b, V) {
        ne(p, "forceUpdate");
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
      enqueueReplaceState: function(p, b, V, F) {
        ne(p, "replaceState");
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
      enqueueSetState: function(p, b, V, F) {
        ne(p, "setState");
      }
    }, ut = Object.assign, zt = {};
    Object.freeze(zt);
    function Mt(p, b, V) {
      this.props = p, this.context = b, this.refs = zt, this.updater = V || Me;
    }
    Mt.prototype.isReactComponent = {}, Mt.prototype.setState = function(p, b) {
      if (typeof p != "object" && typeof p != "function" && p != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, p, b, "setState");
    }, Mt.prototype.forceUpdate = function(p) {
      this.updater.enqueueForceUpdate(this, p, "forceUpdate");
    };
    {
      var xt = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, Pt = function(p, b) {
        Object.defineProperty(Mt.prototype, p, {
          get: function() {
            pe("%s(...) is deprecated in plain JavaScript React classes. %s", b[0], b[1]);
          }
        });
      };
      for (var st in xt)
        xt.hasOwnProperty(st) && Pt(st, xt[st]);
    }
    function on() {
    }
    on.prototype = Mt.prototype;
    function Ht(p, b, V) {
      this.props = p, this.context = b, this.refs = zt, this.updater = V || Me;
    }
    var Bt = Ht.prototype = new on();
    Bt.constructor = Ht, ut(Bt, Mt.prototype), Bt.isPureReactComponent = !0;
    function $t() {
      var p = {
        current: null
      };
      return Object.seal(p), p;
    }
    var bn = Array.isArray;
    function Vt(p) {
      return bn(p);
    }
    function sn(p) {
      {
        var b = typeof Symbol == "function" && Symbol.toStringTag, V = b && p[Symbol.toStringTag] || p.constructor.name || "Object";
        return V;
      }
    }
    function At(p) {
      try {
        return _t(p), !1;
      } catch {
        return !0;
      }
    }
    function _t(p) {
      return "" + p;
    }
    function wn(p) {
      if (At(p))
        return te("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", sn(p)), _t(p);
    }
    function la(p, b, V) {
      var F = p.displayName;
      if (F)
        return F;
      var ae = b.displayName || b.name || "";
      return ae !== "" ? V + "(" + ae + ")" : V;
    }
    function _n(p) {
      return p.displayName || "Context";
    }
    function Bn(p) {
      if (p == null)
        return null;
      if (typeof p.tag == "number" && te("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof p == "function")
        return p.displayName || p.name || null;
      if (typeof p == "string")
        return p;
      switch (p) {
        case S:
          return "Fragment";
        case y:
          return "Portal";
        case _:
          return "Profiler";
        case f:
          return "StrictMode";
        case E:
          return "Suspense";
        case L:
          return "SuspenseList";
      }
      if (typeof p == "object")
        switch (p.$$typeof) {
          case T:
            var b = p;
            return _n(b) + ".Consumer";
          case R:
            var V = p;
            return _n(V._context) + ".Provider";
          case O:
            return la(p, p.render, "ForwardRef");
          case U:
            var F = p.displayName || null;
            return F !== null ? F : Bn(p.type) || "Memo";
          case B: {
            var ae = p, Te = ae._payload, Ne = ae._init;
            try {
              return Bn(Ne(Te));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Nn = Object.prototype.hasOwnProperty, un = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, On, Ha, It;
    It = {};
    function Mn(p) {
      if (Nn.call(p, "ref")) {
        var b = Object.getOwnPropertyDescriptor(p, "ref").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return p.ref !== void 0;
    }
    function $n(p) {
      if (Nn.call(p, "key")) {
        var b = Object.getOwnPropertyDescriptor(p, "key").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return p.key !== void 0;
    }
    function Vr(p, b) {
      var V = function() {
        On || (On = !0, te("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      V.isReactWarning = !0, Object.defineProperty(p, "key", {
        get: V,
        configurable: !0
      });
    }
    function ir(p, b) {
      var V = function() {
        Ha || (Ha = !0, te("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      V.isReactWarning = !0, Object.defineProperty(p, "ref", {
        get: V,
        configurable: !0
      });
    }
    function ce(p) {
      if (typeof p.ref == "string" && I.current && p.__self && I.current.stateNode !== p.__self) {
        var b = Bn(I.current.type);
        It[b] || (te('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', b, p.ref), It[b] = !0);
      }
    }
    var xe = function(p, b, V, F, ae, Te, Ne) {
      var ke = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: p,
        key: b,
        ref: V,
        props: Ne,
        // Record the component responsible for creating this element.
        _owner: Te
      };
      return ke._store = {}, Object.defineProperty(ke._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(ke, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: F
      }), Object.defineProperty(ke, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ae
      }), Object.freeze && (Object.freeze(ke.props), Object.freeze(ke)), ke;
    };
    function He(p, b, V) {
      var F, ae = {}, Te = null, Ne = null, ke = null, qe = null;
      if (b != null) {
        Mn(b) && (Ne = b.ref, ce(b)), $n(b) && (wn(b.key), Te = "" + b.key), ke = b.__self === void 0 ? null : b.__self, qe = b.__source === void 0 ? null : b.__source;
        for (F in b)
          Nn.call(b, F) && !un.hasOwnProperty(F) && (ae[F] = b[F]);
      }
      var rt = arguments.length - 2;
      if (rt === 1)
        ae.children = V;
      else if (rt > 1) {
        for (var dt = Array(rt), pt = 0; pt < rt; pt++)
          dt[pt] = arguments[pt + 2];
        Object.freeze && Object.freeze(dt), ae.children = dt;
      }
      if (p && p.defaultProps) {
        var $e = p.defaultProps;
        for (F in $e)
          ae[F] === void 0 && (ae[F] = $e[F]);
      }
      if (Te || Ne) {
        var Nt = typeof p == "function" ? p.displayName || p.name || "Unknown" : p;
        Te && Vr(ae, Nt), Ne && ir(ae, Nt);
      }
      return xe(p, Te, Ne, ke, qe, I.current, ae);
    }
    function at(p, b) {
      var V = xe(p.type, b, p.ref, p._self, p._source, p._owner, p.props);
      return V;
    }
    function ht(p, b, V) {
      if (p == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + p + ".");
      var F, ae = ut({}, p.props), Te = p.key, Ne = p.ref, ke = p._self, qe = p._source, rt = p._owner;
      if (b != null) {
        Mn(b) && (Ne = b.ref, rt = I.current), $n(b) && (wn(b.key), Te = "" + b.key);
        var dt;
        p.type && p.type.defaultProps && (dt = p.type.defaultProps);
        for (F in b)
          Nn.call(b, F) && !un.hasOwnProperty(F) && (b[F] === void 0 && dt !== void 0 ? ae[F] = dt[F] : ae[F] = b[F]);
      }
      var pt = arguments.length - 2;
      if (pt === 1)
        ae.children = V;
      else if (pt > 1) {
        for (var $e = Array(pt), Nt = 0; Nt < pt; Nt++)
          $e[Nt] = arguments[Nt + 2];
        ae.children = $e;
      }
      return xe(p.type, Te, Ne, ke, qe, rt, ae);
    }
    function St(p) {
      return typeof p == "object" && p !== null && p.$$typeof === g;
    }
    var Rt = ".", En = ":";
    function Dt(p) {
      var b = /[=:]/g, V = {
        "=": "=0",
        ":": "=2"
      }, F = p.replace(b, function(ae) {
        return V[ae];
      });
      return "$" + F;
    }
    var ct = !1, Tt = /\/+/g;
    function ba(p) {
      return p.replace(Tt, "$&/");
    }
    function Na(p, b) {
      return typeof p == "object" && p !== null && p.key != null ? (wn(p.key), Dt("" + p.key)) : b.toString(36);
    }
    function oa(p, b, V, F, ae) {
      var Te = typeof p;
      (Te === "undefined" || Te === "boolean") && (p = null);
      var Ne = !1;
      if (p === null)
        Ne = !0;
      else
        switch (Te) {
          case "string":
          case "number":
            Ne = !0;
            break;
          case "object":
            switch (p.$$typeof) {
              case g:
              case y:
                Ne = !0;
            }
        }
      if (Ne) {
        var ke = p, qe = ae(ke), rt = F === "" ? Rt + Na(ke, 0) : F;
        if (Vt(qe)) {
          var dt = "";
          rt != null && (dt = ba(rt) + "/"), oa(qe, b, dt, "", function(_f) {
            return _f;
          });
        } else qe != null && (St(qe) && (qe.key && (!ke || ke.key !== qe.key) && wn(qe.key), qe = at(
          qe,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          V + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          (qe.key && (!ke || ke.key !== qe.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            ba("" + qe.key) + "/"
          ) : "") + rt
        )), b.push(qe));
        return 1;
      }
      var pt, $e, Nt = 0, Lt = F === "" ? Rt : F + En;
      if (Vt(p))
        for (var Ei = 0; Ei < p.length; Ei++)
          pt = p[Ei], $e = Lt + Na(pt, Ei), Nt += oa(pt, b, V, $e, ae);
      else {
        var Eo = W(p);
        if (typeof Eo == "function") {
          var ur = p;
          Eo === ur.entries && (ct || pe("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), ct = !0);
          for (var xo = Eo.call(ur), So, wf = 0; !(So = xo.next()).done; )
            pt = So.value, $e = Lt + Na(pt, wf++), Nt += oa(pt, b, V, $e, ae);
        } else if (Te === "object") {
          var vu = String(p);
          throw new Error("Objects are not valid as a React child (found: " + (vu === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : vu) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return Nt;
    }
    function lr(p, b, V) {
      if (p == null)
        return p;
      var F = [], ae = 0;
      return oa(p, F, "", "", function(Te) {
        return b.call(V, Te, ae++);
      }), F;
    }
    function io(p) {
      var b = 0;
      return lr(p, function() {
        b++;
      }), b;
    }
    function fi(p, b, V) {
      lr(p, function() {
        b.apply(this, arguments);
      }, V);
    }
    function Ji(p) {
      return lr(p, function(b) {
        return b;
      }) || [];
    }
    function Zi(p) {
      if (!St(p))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return p;
    }
    function di(p) {
      var b = {
        $$typeof: T,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: p,
        _currentValue2: p,
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
      var V = !1, F = !1, ae = !1;
      {
        var Te = {
          $$typeof: T,
          _context: b
        };
        Object.defineProperties(Te, {
          Provider: {
            get: function() {
              return F || (F = !0, te("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), b.Provider;
            },
            set: function(Ne) {
              b.Provider = Ne;
            }
          },
          _currentValue: {
            get: function() {
              return b._currentValue;
            },
            set: function(Ne) {
              b._currentValue = Ne;
            }
          },
          _currentValue2: {
            get: function() {
              return b._currentValue2;
            },
            set: function(Ne) {
              b._currentValue2 = Ne;
            }
          },
          _threadCount: {
            get: function() {
              return b._threadCount;
            },
            set: function(Ne) {
              b._threadCount = Ne;
            }
          },
          Consumer: {
            get: function() {
              return V || (V = !0, te("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), b.Consumer;
            }
          },
          displayName: {
            get: function() {
              return b.displayName;
            },
            set: function(Ne) {
              ae || (pe("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", Ne), ae = !0);
            }
          }
        }), b.Consumer = Te;
      }
      return b._currentRenderer = null, b._currentRenderer2 = null, b;
    }
    var Ea = -1, sa = 0, Qn = 1, Ba = 2;
    function pi(p) {
      if (p._status === Ea) {
        var b = p._result, V = b();
        if (V.then(function(Te) {
          if (p._status === sa || p._status === Ea) {
            var Ne = p;
            Ne._status = Qn, Ne._result = Te;
          }
        }, function(Te) {
          if (p._status === sa || p._status === Ea) {
            var Ne = p;
            Ne._status = Ba, Ne._result = Te;
          }
        }), p._status === Ea) {
          var F = p;
          F._status = sa, F._result = V;
        }
      }
      if (p._status === Qn) {
        var ae = p._result;
        return ae === void 0 && te(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, ae), "default" in ae || te(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, ae), ae.default;
      } else
        throw p._result;
    }
    function x(p) {
      var b = {
        // We use these fields to store the result.
        _status: Ea,
        _result: p
      }, V = {
        $$typeof: B,
        _payload: b,
        _init: pi
      };
      {
        var F, ae;
        Object.defineProperties(V, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return F;
            },
            set: function(Te) {
              te("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), F = Te, Object.defineProperty(V, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return ae;
            },
            set: function(Te) {
              te("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), ae = Te, Object.defineProperty(V, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return V;
    }
    function X(p) {
      p != null && p.$$typeof === U ? te("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof p != "function" ? te("forwardRef requires a render function but was given %s.", p === null ? "null" : typeof p) : p.length !== 0 && p.length !== 2 && te("forwardRef render functions accept exactly two parameters: props and ref. %s", p.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), p != null && (p.defaultProps != null || p.propTypes != null) && te("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var b = {
        $$typeof: O,
        render: p
      };
      {
        var V;
        Object.defineProperty(b, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return V;
          },
          set: function(F) {
            V = F, !p.name && !p.displayName && (p.displayName = F);
          }
        });
      }
      return b;
    }
    var fe;
    fe = Symbol.for("react.module.reference");
    function Se(p) {
      return !!(typeof p == "string" || typeof p == "function" || p === S || p === _ || k || p === f || p === E || p === L || Y || p === se || Q || re || je || typeof p == "object" && p !== null && (p.$$typeof === B || p.$$typeof === U || p.$$typeof === R || p.$$typeof === T || p.$$typeof === O || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      p.$$typeof === fe || p.getModuleId !== void 0));
    }
    function Ye(p, b) {
      Se(p) || te("memo: The first argument must be a component. Instead received: %s", p === null ? "null" : typeof p);
      var V = {
        $$typeof: U,
        type: p,
        compare: b === void 0 ? null : b
      };
      {
        var F;
        Object.defineProperty(V, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return F;
          },
          set: function(ae) {
            F = ae, !p.name && !p.displayName && (p.displayName = ae);
          }
        });
      }
      return V;
    }
    function Ve() {
      var p = $.current;
      return p === null && te(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), p;
    }
    function ze(p) {
      var b = Ve();
      if (p._context !== void 0) {
        var V = p._context;
        V.Consumer === p ? te("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : V.Provider === p && te("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return b.useContext(p);
    }
    function Ce(p) {
      var b = Ve();
      return b.useState(p);
    }
    function Yt(p, b, V) {
      var F = Ve();
      return F.useReducer(p, b, V);
    }
    function vt(p) {
      var b = Ve();
      return b.useRef(p);
    }
    function gt(p, b) {
      var V = Ve();
      return V.useEffect(p, b);
    }
    function xn(p, b) {
      var V = Ve();
      return V.useInsertionEffect(p, b);
    }
    function $a(p, b) {
      var V = Ve();
      return V.useLayoutEffect(p, b);
    }
    function xa(p, b) {
      var V = Ve();
      return V.useCallback(p, b);
    }
    function qt(p, b) {
      var V = Ve();
      return V.useMemo(p, b);
    }
    function mi(p, b, V) {
      var F = Ve();
      return F.useImperativeHandle(p, b, V);
    }
    function Sa(p, b) {
      {
        var V = Ve();
        return V.useDebugValue(p, b);
      }
    }
    function Be() {
      var p = Ve();
      return p.useTransition();
    }
    function hi(p) {
      var b = Ve();
      return b.useDeferredValue(p);
    }
    function iu() {
      var p = Ve();
      return p.useId();
    }
    function lu(p, b, V) {
      var F = Ve();
      return F.useSyncExternalStore(p, b, V);
    }
    var Ar = 0, lo, oo, so, uo, co, ou, su;
    function el() {
    }
    el.__reactDisabledLog = !0;
    function fo() {
      {
        if (Ar === 0) {
          lo = console.log, oo = console.info, so = console.warn, uo = console.error, co = console.group, ou = console.groupCollapsed, su = console.groupEnd;
          var p = {
            configurable: !0,
            enumerable: !0,
            value: el,
            writable: !0
          };
          Object.defineProperties(console, {
            info: p,
            log: p,
            warn: p,
            error: p,
            group: p,
            groupCollapsed: p,
            groupEnd: p
          });
        }
        Ar++;
      }
    }
    function Ia() {
      {
        if (Ar--, Ar === 0) {
          var p = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ut({}, p, {
              value: lo
            }),
            info: ut({}, p, {
              value: oo
            }),
            warn: ut({}, p, {
              value: so
            }),
            error: ut({}, p, {
              value: uo
            }),
            group: ut({}, p, {
              value: co
            }),
            groupCollapsed: ut({}, p, {
              value: ou
            }),
            groupEnd: ut({}, p, {
              value: su
            })
          });
        }
        Ar < 0 && te("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var vi = Z.ReactCurrentDispatcher, Lr;
    function tl(p, b, V) {
      {
        if (Lr === void 0)
          try {
            throw Error();
          } catch (ae) {
            var F = ae.stack.trim().match(/\n( *(at )?)/);
            Lr = F && F[1] || "";
          }
        return `
` + Lr + p;
      }
    }
    var gi = !1, nl;
    {
      var po = typeof WeakMap == "function" ? WeakMap : Map;
      nl = new po();
    }
    function uu(p, b) {
      if (!p || gi)
        return "";
      {
        var V = nl.get(p);
        if (V !== void 0)
          return V;
      }
      var F;
      gi = !0;
      var ae = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Te;
      Te = vi.current, vi.current = null, fo();
      try {
        if (b) {
          var Ne = function() {
            throw Error();
          };
          if (Object.defineProperty(Ne.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(Ne, []);
            } catch (Lt) {
              F = Lt;
            }
            Reflect.construct(p, [], Ne);
          } else {
            try {
              Ne.call();
            } catch (Lt) {
              F = Lt;
            }
            p.call(Ne.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Lt) {
            F = Lt;
          }
          p();
        }
      } catch (Lt) {
        if (Lt && F && typeof Lt.stack == "string") {
          for (var ke = Lt.stack.split(`
`), qe = F.stack.split(`
`), rt = ke.length - 1, dt = qe.length - 1; rt >= 1 && dt >= 0 && ke[rt] !== qe[dt]; )
            dt--;
          for (; rt >= 1 && dt >= 0; rt--, dt--)
            if (ke[rt] !== qe[dt]) {
              if (rt !== 1 || dt !== 1)
                do
                  if (rt--, dt--, dt < 0 || ke[rt] !== qe[dt]) {
                    var pt = `
` + ke[rt].replace(" at new ", " at ");
                    return p.displayName && pt.includes("<anonymous>") && (pt = pt.replace("<anonymous>", p.displayName)), typeof p == "function" && nl.set(p, pt), pt;
                  }
                while (rt >= 1 && dt >= 0);
              break;
            }
        }
      } finally {
        gi = !1, vi.current = Te, Ia(), Error.prepareStackTrace = ae;
      }
      var $e = p ? p.displayName || p.name : "", Nt = $e ? tl($e) : "";
      return typeof p == "function" && nl.set(p, Nt), Nt;
    }
    function mo(p, b, V) {
      return uu(p, !1);
    }
    function Rf(p) {
      var b = p.prototype;
      return !!(b && b.isReactComponent);
    }
    function yi(p, b, V) {
      if (p == null)
        return "";
      if (typeof p == "function")
        return uu(p, Rf(p));
      if (typeof p == "string")
        return tl(p);
      switch (p) {
        case E:
          return tl("Suspense");
        case L:
          return tl("SuspenseList");
      }
      if (typeof p == "object")
        switch (p.$$typeof) {
          case O:
            return mo(p.render);
          case U:
            return yi(p.type, b, V);
          case B: {
            var F = p, ae = F._payload, Te = F._init;
            try {
              return yi(Te(ae), b, V);
            } catch {
            }
          }
        }
      return "";
    }
    var cu = {}, ho = Z.ReactDebugCurrentFrame;
    function Ze(p) {
      if (p) {
        var b = p._owner, V = yi(p.type, p._source, b ? b.type : null);
        ho.setExtraStackFrame(V);
      } else
        ho.setExtraStackFrame(null);
    }
    function Cf(p, b, V, F, ae) {
      {
        var Te = Function.call.bind(Nn);
        for (var Ne in p)
          if (Te(p, Ne)) {
            var ke = void 0;
            try {
              if (typeof p[Ne] != "function") {
                var qe = Error((F || "React class") + ": " + V + " type `" + Ne + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof p[Ne] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw qe.name = "Invariant Violation", qe;
              }
              ke = p[Ne](b, Ne, F, V, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (rt) {
              ke = rt;
            }
            ke && !(ke instanceof Error) && (Ze(ae), te("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", F || "React class", V, Ne, typeof ke), Ze(null)), ke instanceof Error && !(ke.message in cu) && (cu[ke.message] = !0, Ze(ae), te("Failed %s type: %s", V, ke.message), Ze(null));
          }
      }
    }
    function or(p) {
      if (p) {
        var b = p._owner, V = yi(p.type, p._source, b ? b.type : null);
        ee(V);
      } else
        ee(null);
    }
    var Fe;
    Fe = !1;
    function vo() {
      if (I.current) {
        var p = Bn(I.current.type);
        if (p)
          return `

Check the render method of \`` + p + "`.";
      }
      return "";
    }
    function Vn(p) {
      if (p !== void 0) {
        var b = p.fileName.replace(/^.*[\\\/]/, ""), V = p.lineNumber;
        return `

Check your code at ` + b + ":" + V + ".";
      }
      return "";
    }
    function bi(p) {
      return p != null ? Vn(p.__source) : "";
    }
    var kr = {};
    function Df(p) {
      var b = vo();
      if (!b) {
        var V = typeof p == "string" ? p : p.displayName || p.name;
        V && (b = `

Check the top-level render call using <` + V + ">.");
      }
      return b;
    }
    function tn(p, b) {
      if (!(!p._store || p._store.validated || p.key != null)) {
        p._store.validated = !0;
        var V = Df(b);
        if (!kr[V]) {
          kr[V] = !0;
          var F = "";
          p && p._owner && p._owner !== I.current && (F = " It was passed a child from " + Bn(p._owner.type) + "."), or(p), te('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', V, F), or(null);
        }
      }
    }
    function bt(p, b) {
      if (typeof p == "object") {
        if (Vt(p))
          for (var V = 0; V < p.length; V++) {
            var F = p[V];
            St(F) && tn(F, b);
          }
        else if (St(p))
          p._store && (p._store.validated = !0);
        else if (p) {
          var ae = W(p);
          if (typeof ae == "function" && ae !== p.entries)
            for (var Te = ae.call(p), Ne; !(Ne = Te.next()).done; )
              St(Ne.value) && tn(Ne.value, b);
        }
      }
    }
    function fu(p) {
      {
        var b = p.type;
        if (b == null || typeof b == "string")
          return;
        var V;
        if (typeof b == "function")
          V = b.propTypes;
        else if (typeof b == "object" && (b.$$typeof === O || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        b.$$typeof === U))
          V = b.propTypes;
        else
          return;
        if (V) {
          var F = Bn(b);
          Cf(V, p.props, "prop", F, p);
        } else if (b.PropTypes !== void 0 && !Fe) {
          Fe = !0;
          var ae = Bn(b);
          te("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ae || "Unknown");
        }
        typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && te("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ua(p) {
      {
        for (var b = Object.keys(p.props), V = 0; V < b.length; V++) {
          var F = b[V];
          if (F !== "children" && F !== "key") {
            or(p), te("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", F), or(null);
            break;
          }
        }
        p.ref !== null && (or(p), te("Invalid attribute `ref` supplied to `React.Fragment`."), or(null));
      }
    }
    function An(p, b, V) {
      var F = Se(p);
      if (!F) {
        var ae = "";
        (p === void 0 || typeof p == "object" && p !== null && Object.keys(p).length === 0) && (ae += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Te = bi(b);
        Te ? ae += Te : ae += vo();
        var Ne;
        p === null ? Ne = "null" : Vt(p) ? Ne = "array" : p !== void 0 && p.$$typeof === g ? (Ne = "<" + (Bn(p.type) || "Unknown") + " />", ae = " Did you accidentally export a JSX literal instead of a component?") : Ne = typeof p, te("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Ne, ae);
      }
      var ke = He.apply(this, arguments);
      if (ke == null)
        return ke;
      if (F)
        for (var qe = 2; qe < arguments.length; qe++)
          bt(arguments[qe], p);
      return p === S ? ua(ke) : fu(ke), ke;
    }
    var Ra = !1;
    function Tf(p) {
      var b = An.bind(null, p);
      return b.type = p, Ra || (Ra = !0, pe("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(b, "type", {
        enumerable: !1,
        get: function() {
          return pe("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: p
          }), p;
        }
      }), b;
    }
    function go(p, b, V) {
      for (var F = ht.apply(this, arguments), ae = 2; ae < arguments.length; ae++)
        bt(arguments[ae], F.type);
      return fu(F), F;
    }
    function du(p, b) {
      var V = G.transition;
      G.transition = {};
      var F = G.transition;
      G.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        p();
      } finally {
        if (G.transition = V, V === null && F._updatedFibers) {
          var ae = F._updatedFibers.size;
          ae > 10 && pe("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), F._updatedFibers.clear();
        }
      }
    }
    var yo = !1, al = null;
    function jf(p) {
      if (al === null)
        try {
          var b = ("require" + Math.random()).slice(0, 7), V = o && o[b];
          al = V.call(o, "timers").setImmediate;
        } catch {
          al = function(ae) {
            yo === !1 && (yo = !0, typeof MessageChannel > "u" && te("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var Te = new MessageChannel();
            Te.port1.onmessage = ae, Te.port2.postMessage(void 0);
          };
        }
      return al(p);
    }
    var Ur = 0, Ni = !1;
    function bo(p) {
      {
        var b = Ur;
        Ur++, le.current === null && (le.current = []);
        var V = le.isBatchingLegacy, F;
        try {
          if (le.isBatchingLegacy = !0, F = p(), !V && le.didScheduleLegacyUpdate) {
            var ae = le.current;
            ae !== null && (le.didScheduleLegacyUpdate = !1, ll(ae));
          }
        } catch ($e) {
          throw sr(b), $e;
        } finally {
          le.isBatchingLegacy = V;
        }
        if (F !== null && typeof F == "object" && typeof F.then == "function") {
          var Te = F, Ne = !1, ke = {
            then: function($e, Nt) {
              Ne = !0, Te.then(function(Lt) {
                sr(b), Ur === 0 ? rl(Lt, $e, Nt) : $e(Lt);
              }, function(Lt) {
                sr(b), Nt(Lt);
              });
            }
          };
          return !Ni && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            Ne || (Ni = !0, te("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), ke;
        } else {
          var qe = F;
          if (sr(b), Ur === 0) {
            var rt = le.current;
            rt !== null && (ll(rt), le.current = null);
            var dt = {
              then: function($e, Nt) {
                le.current === null ? (le.current = [], rl(qe, $e, Nt)) : $e(qe);
              }
            };
            return dt;
          } else {
            var pt = {
              then: function($e, Nt) {
                $e(qe);
              }
            };
            return pt;
          }
        }
      }
    }
    function sr(p) {
      p !== Ur - 1 && te("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ur = p;
    }
    function rl(p, b, V) {
      {
        var F = le.current;
        if (F !== null)
          try {
            ll(F), jf(function() {
              F.length === 0 ? (le.current = null, b(p)) : rl(p, b, V);
            });
          } catch (ae) {
            V(ae);
          }
        else
          b(p);
      }
    }
    var il = !1;
    function ll(p) {
      if (!il) {
        il = !0;
        var b = 0;
        try {
          for (; b < p.length; b++) {
            var V = p[b];
            do
              V = V(!0);
            while (V !== null);
          }
          p.length = 0;
        } catch (F) {
          throw p = p.slice(b + 1), F;
        } finally {
          il = !1;
        }
      }
    }
    var pu = An, mu = go, No = Tf, hu = {
      map: lr,
      forEach: fi,
      count: io,
      toArray: Ji,
      only: Zi
    };
    d.Children = hu, d.Component = Mt, d.Fragment = S, d.Profiler = _, d.PureComponent = Ht, d.StrictMode = f, d.Suspense = E, d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Z, d.act = bo, d.cloneElement = mu, d.createContext = di, d.createElement = pu, d.createFactory = No, d.createRef = $t, d.forwardRef = X, d.isValidElement = St, d.lazy = x, d.memo = Ye, d.startTransition = du, d.unstable_act = bo, d.useCallback = xa, d.useContext = ze, d.useDebugValue = Sa, d.useDeferredValue = hi, d.useEffect = gt, d.useId = iu, d.useImperativeHandle = mi, d.useInsertionEffect = xn, d.useLayoutEffect = $a, d.useMemo = qt, d.useReducer = Yt, d.useRef = vt, d.useState = Ce, d.useSyncExternalStore = lu, d.useTransition = Be, d.version = m, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(bf, bf.exports);
var iw = bf.exports;
yE.exports = iw;
var N = yE.exports;
const lw = /* @__PURE__ */ rw(N), ow = /* @__PURE__ */ aw({
  __proto__: null,
  default: lw
}, [N]);
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
  var o = N, d = Symbol.for("react.element"), m = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), _ = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), O = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), U = Symbol.for("react.offscreen"), B = Symbol.iterator, se = "@@iterator";
  function ie(x) {
    if (x === null || typeof x != "object")
      return null;
    var X = B && x[B] || x[se];
    return typeof X == "function" ? X : null;
  }
  var oe = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function W(x) {
    {
      for (var X = arguments.length, fe = new Array(X > 1 ? X - 1 : 0), Se = 1; Se < X; Se++)
        fe[Se - 1] = arguments[Se];
      $("error", x, fe);
    }
  }
  function $(x, X, fe) {
    {
      var Se = oe.ReactDebugCurrentFrame, Ye = Se.getStackAddendum();
      Ye !== "" && (X += "%s", fe = fe.concat([Ye]));
      var Ve = fe.map(function(ze) {
        return String(ze);
      });
      Ve.unshift("Warning: " + X), Function.prototype.apply.call(console[x], console, Ve);
    }
  }
  var G = !1, le = !1, I = !1, H = !1, ye = !1, ee;
  ee = Symbol.for("react.module.reference");
  function Q(x) {
    return !!(typeof x == "string" || typeof x == "function" || x === g || x === S || ye || x === y || x === T || x === O || H || x === U || G || le || I || typeof x == "object" && x !== null && (x.$$typeof === L || x.$$typeof === E || x.$$typeof === f || x.$$typeof === _ || x.$$typeof === R || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    x.$$typeof === ee || x.getModuleId !== void 0));
  }
  function re(x, X, fe) {
    var Se = x.displayName;
    if (Se)
      return Se;
    var Ye = X.displayName || X.name || "";
    return Ye !== "" ? fe + "(" + Ye + ")" : fe;
  }
  function je(x) {
    return x.displayName || "Context";
  }
  function Y(x) {
    if (x == null)
      return null;
    if (typeof x.tag == "number" && W("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof x == "function")
      return x.displayName || x.name || null;
    if (typeof x == "string")
      return x;
    switch (x) {
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
    if (typeof x == "object")
      switch (x.$$typeof) {
        case _:
          var X = x;
          return je(X) + ".Consumer";
        case f:
          var fe = x;
          return je(fe._context) + ".Provider";
        case R:
          return re(x, x.render, "ForwardRef");
        case E:
          var Se = x.displayName || null;
          return Se !== null ? Se : Y(x.type) || "Memo";
        case L: {
          var Ye = x, Ve = Ye._payload, ze = Ye._init;
          try {
            return Y(ze(Ve));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var k = Object.assign, Z = 0, pe, te, _e, Qe, ne, Me, ut;
  function zt() {
  }
  zt.__reactDisabledLog = !0;
  function Mt() {
    {
      if (Z === 0) {
        pe = console.log, te = console.info, _e = console.warn, Qe = console.error, ne = console.group, Me = console.groupCollapsed, ut = console.groupEnd;
        var x = {
          configurable: !0,
          enumerable: !0,
          value: zt,
          writable: !0
        };
        Object.defineProperties(console, {
          info: x,
          log: x,
          warn: x,
          error: x,
          group: x,
          groupCollapsed: x,
          groupEnd: x
        });
      }
      Z++;
    }
  }
  function xt() {
    {
      if (Z--, Z === 0) {
        var x = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: k({}, x, {
            value: pe
          }),
          info: k({}, x, {
            value: te
          }),
          warn: k({}, x, {
            value: _e
          }),
          error: k({}, x, {
            value: Qe
          }),
          group: k({}, x, {
            value: ne
          }),
          groupCollapsed: k({}, x, {
            value: Me
          }),
          groupEnd: k({}, x, {
            value: ut
          })
        });
      }
      Z < 0 && W("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var Pt = oe.ReactCurrentDispatcher, st;
  function on(x, X, fe) {
    {
      if (st === void 0)
        try {
          throw Error();
        } catch (Ye) {
          var Se = Ye.stack.trim().match(/\n( *(at )?)/);
          st = Se && Se[1] || "";
        }
      return `
` + st + x;
    }
  }
  var Ht = !1, Bt;
  {
    var $t = typeof WeakMap == "function" ? WeakMap : Map;
    Bt = new $t();
  }
  function bn(x, X) {
    if (!x || Ht)
      return "";
    {
      var fe = Bt.get(x);
      if (fe !== void 0)
        return fe;
    }
    var Se;
    Ht = !0;
    var Ye = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var Ve;
    Ve = Pt.current, Pt.current = null, Mt();
    try {
      if (X) {
        var ze = function() {
          throw Error();
        };
        if (Object.defineProperty(ze.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(ze, []);
          } catch (qt) {
            Se = qt;
          }
          Reflect.construct(x, [], ze);
        } else {
          try {
            ze.call();
          } catch (qt) {
            Se = qt;
          }
          x.call(ze.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (qt) {
          Se = qt;
        }
        x();
      }
    } catch (qt) {
      if (qt && Se && typeof qt.stack == "string") {
        for (var Ce = qt.stack.split(`
`), Yt = Se.stack.split(`
`), vt = Ce.length - 1, gt = Yt.length - 1; vt >= 1 && gt >= 0 && Ce[vt] !== Yt[gt]; )
          gt--;
        for (; vt >= 1 && gt >= 0; vt--, gt--)
          if (Ce[vt] !== Yt[gt]) {
            if (vt !== 1 || gt !== 1)
              do
                if (vt--, gt--, gt < 0 || Ce[vt] !== Yt[gt]) {
                  var xn = `
` + Ce[vt].replace(" at new ", " at ");
                  return x.displayName && xn.includes("<anonymous>") && (xn = xn.replace("<anonymous>", x.displayName)), typeof x == "function" && Bt.set(x, xn), xn;
                }
              while (vt >= 1 && gt >= 0);
            break;
          }
      }
    } finally {
      Ht = !1, Pt.current = Ve, xt(), Error.prepareStackTrace = Ye;
    }
    var $a = x ? x.displayName || x.name : "", xa = $a ? on($a) : "";
    return typeof x == "function" && Bt.set(x, xa), xa;
  }
  function Vt(x, X, fe) {
    return bn(x, !1);
  }
  function sn(x) {
    var X = x.prototype;
    return !!(X && X.isReactComponent);
  }
  function At(x, X, fe) {
    if (x == null)
      return "";
    if (typeof x == "function")
      return bn(x, sn(x));
    if (typeof x == "string")
      return on(x);
    switch (x) {
      case T:
        return on("Suspense");
      case O:
        return on("SuspenseList");
    }
    if (typeof x == "object")
      switch (x.$$typeof) {
        case R:
          return Vt(x.render);
        case E:
          return At(x.type, X, fe);
        case L: {
          var Se = x, Ye = Se._payload, Ve = Se._init;
          try {
            return At(Ve(Ye), X, fe);
          } catch {
          }
        }
      }
    return "";
  }
  var _t = Object.prototype.hasOwnProperty, wn = {}, la = oe.ReactDebugCurrentFrame;
  function _n(x) {
    if (x) {
      var X = x._owner, fe = At(x.type, x._source, X ? X.type : null);
      la.setExtraStackFrame(fe);
    } else
      la.setExtraStackFrame(null);
  }
  function Bn(x, X, fe, Se, Ye) {
    {
      var Ve = Function.call.bind(_t);
      for (var ze in x)
        if (Ve(x, ze)) {
          var Ce = void 0;
          try {
            if (typeof x[ze] != "function") {
              var Yt = Error((Se || "React class") + ": " + fe + " type `" + ze + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof x[ze] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw Yt.name = "Invariant Violation", Yt;
            }
            Ce = x[ze](X, ze, Se, fe, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (vt) {
            Ce = vt;
          }
          Ce && !(Ce instanceof Error) && (_n(Ye), W("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Se || "React class", fe, ze, typeof Ce), _n(null)), Ce instanceof Error && !(Ce.message in wn) && (wn[Ce.message] = !0, _n(Ye), W("Failed %s type: %s", fe, Ce.message), _n(null));
        }
    }
  }
  var Nn = Array.isArray;
  function un(x) {
    return Nn(x);
  }
  function On(x) {
    {
      var X = typeof Symbol == "function" && Symbol.toStringTag, fe = X && x[Symbol.toStringTag] || x.constructor.name || "Object";
      return fe;
    }
  }
  function Ha(x) {
    try {
      return It(x), !1;
    } catch {
      return !0;
    }
  }
  function It(x) {
    return "" + x;
  }
  function Mn(x) {
    if (Ha(x))
      return W("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", On(x)), It(x);
  }
  var $n = oe.ReactCurrentOwner, Vr = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, ir, ce, xe;
  xe = {};
  function He(x) {
    if (_t.call(x, "ref")) {
      var X = Object.getOwnPropertyDescriptor(x, "ref").get;
      if (X && X.isReactWarning)
        return !1;
    }
    return x.ref !== void 0;
  }
  function at(x) {
    if (_t.call(x, "key")) {
      var X = Object.getOwnPropertyDescriptor(x, "key").get;
      if (X && X.isReactWarning)
        return !1;
    }
    return x.key !== void 0;
  }
  function ht(x, X) {
    if (typeof x.ref == "string" && $n.current && X && $n.current.stateNode !== X) {
      var fe = Y($n.current.type);
      xe[fe] || (W('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Y($n.current.type), x.ref), xe[fe] = !0);
    }
  }
  function St(x, X) {
    {
      var fe = function() {
        ir || (ir = !0, W("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", X));
      };
      fe.isReactWarning = !0, Object.defineProperty(x, "key", {
        get: fe,
        configurable: !0
      });
    }
  }
  function Rt(x, X) {
    {
      var fe = function() {
        ce || (ce = !0, W("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", X));
      };
      fe.isReactWarning = !0, Object.defineProperty(x, "ref", {
        get: fe,
        configurable: !0
      });
    }
  }
  var En = function(x, X, fe, Se, Ye, Ve, ze) {
    var Ce = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: d,
      // Built-in properties that belong on the element
      type: x,
      key: X,
      ref: fe,
      props: ze,
      // Record the component responsible for creating this element.
      _owner: Ve
    };
    return Ce._store = {}, Object.defineProperty(Ce._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(Ce, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Se
    }), Object.defineProperty(Ce, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Ye
    }), Object.freeze && (Object.freeze(Ce.props), Object.freeze(Ce)), Ce;
  };
  function Dt(x, X, fe, Se, Ye) {
    {
      var Ve, ze = {}, Ce = null, Yt = null;
      fe !== void 0 && (Mn(fe), Ce = "" + fe), at(X) && (Mn(X.key), Ce = "" + X.key), He(X) && (Yt = X.ref, ht(X, Ye));
      for (Ve in X)
        _t.call(X, Ve) && !Vr.hasOwnProperty(Ve) && (ze[Ve] = X[Ve]);
      if (x && x.defaultProps) {
        var vt = x.defaultProps;
        for (Ve in vt)
          ze[Ve] === void 0 && (ze[Ve] = vt[Ve]);
      }
      if (Ce || Yt) {
        var gt = typeof x == "function" ? x.displayName || x.name || "Unknown" : x;
        Ce && St(ze, gt), Yt && Rt(ze, gt);
      }
      return En(x, Ce, Yt, Ye, Se, $n.current, ze);
    }
  }
  var ct = oe.ReactCurrentOwner, Tt = oe.ReactDebugCurrentFrame;
  function ba(x) {
    if (x) {
      var X = x._owner, fe = At(x.type, x._source, X ? X.type : null);
      Tt.setExtraStackFrame(fe);
    } else
      Tt.setExtraStackFrame(null);
  }
  var Na;
  Na = !1;
  function oa(x) {
    return typeof x == "object" && x !== null && x.$$typeof === d;
  }
  function lr() {
    {
      if (ct.current) {
        var x = Y(ct.current.type);
        if (x)
          return `

Check the render method of \`` + x + "`.";
      }
      return "";
    }
  }
  function io(x) {
    {
      if (x !== void 0) {
        var X = x.fileName.replace(/^.*[\\\/]/, ""), fe = x.lineNumber;
        return `

Check your code at ` + X + ":" + fe + ".";
      }
      return "";
    }
  }
  var fi = {};
  function Ji(x) {
    {
      var X = lr();
      if (!X) {
        var fe = typeof x == "string" ? x : x.displayName || x.name;
        fe && (X = `

Check the top-level render call using <` + fe + ">.");
      }
      return X;
    }
  }
  function Zi(x, X) {
    {
      if (!x._store || x._store.validated || x.key != null)
        return;
      x._store.validated = !0;
      var fe = Ji(X);
      if (fi[fe])
        return;
      fi[fe] = !0;
      var Se = "";
      x && x._owner && x._owner !== ct.current && (Se = " It was passed a child from " + Y(x._owner.type) + "."), ba(x), W('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', fe, Se), ba(null);
    }
  }
  function di(x, X) {
    {
      if (typeof x != "object")
        return;
      if (un(x))
        for (var fe = 0; fe < x.length; fe++) {
          var Se = x[fe];
          oa(Se) && Zi(Se, X);
        }
      else if (oa(x))
        x._store && (x._store.validated = !0);
      else if (x) {
        var Ye = ie(x);
        if (typeof Ye == "function" && Ye !== x.entries)
          for (var Ve = Ye.call(x), ze; !(ze = Ve.next()).done; )
            oa(ze.value) && Zi(ze.value, X);
      }
    }
  }
  function Ea(x) {
    {
      var X = x.type;
      if (X == null || typeof X == "string")
        return;
      var fe;
      if (typeof X == "function")
        fe = X.propTypes;
      else if (typeof X == "object" && (X.$$typeof === R || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      X.$$typeof === E))
        fe = X.propTypes;
      else
        return;
      if (fe) {
        var Se = Y(X);
        Bn(fe, x.props, "prop", Se, x);
      } else if (X.PropTypes !== void 0 && !Na) {
        Na = !0;
        var Ye = Y(X);
        W("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ye || "Unknown");
      }
      typeof X.getDefaultProps == "function" && !X.getDefaultProps.isReactClassApproved && W("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function sa(x) {
    {
      for (var X = Object.keys(x.props), fe = 0; fe < X.length; fe++) {
        var Se = X[fe];
        if (Se !== "children" && Se !== "key") {
          ba(x), W("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Se), ba(null);
          break;
        }
      }
      x.ref !== null && (ba(x), W("Invalid attribute `ref` supplied to `React.Fragment`."), ba(null));
    }
  }
  var Qn = {};
  function Ba(x, X, fe, Se, Ye, Ve) {
    {
      var ze = Q(x);
      if (!ze) {
        var Ce = "";
        (x === void 0 || typeof x == "object" && x !== null && Object.keys(x).length === 0) && (Ce += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Yt = io(Ye);
        Yt ? Ce += Yt : Ce += lr();
        var vt;
        x === null ? vt = "null" : un(x) ? vt = "array" : x !== void 0 && x.$$typeof === d ? (vt = "<" + (Y(x.type) || "Unknown") + " />", Ce = " Did you accidentally export a JSX literal instead of a component?") : vt = typeof x, W("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", vt, Ce);
      }
      var gt = Dt(x, X, fe, Ye, Ve);
      if (gt == null)
        return gt;
      if (ze) {
        var xn = X.children;
        if (xn !== void 0)
          if (Se)
            if (un(xn)) {
              for (var $a = 0; $a < xn.length; $a++)
                di(xn[$a], x);
              Object.freeze && Object.freeze(xn);
            } else
              W("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            di(xn, x);
      }
      if (_t.call(X, "key")) {
        var xa = Y(x), qt = Object.keys(X).filter(function(Be) {
          return Be !== "key";
        }), mi = qt.length > 0 ? "{key: someKey, " + qt.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!Qn[xa + mi]) {
          var Sa = qt.length > 0 ? "{" + qt.join(": ..., ") + ": ...}" : "{}";
          W(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, mi, xa, Sa, xa), Qn[xa + mi] = !0;
        }
      }
      return x === g ? sa(gt) : Ea(gt), gt;
    }
  }
  var pi = Ba;
  Ah.Fragment = g, Ah.jsxDEV = pi;
})();
gE.exports = Ah;
var u = gE.exports, bE = { exports: {} }, ia = {}, NE = { exports: {} }, EE = {};
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
    function g(ce, xe) {
      var He = ce.length;
      ce.push(xe), f(ce, xe, He);
    }
    function y(ce) {
      return ce.length === 0 ? null : ce[0];
    }
    function S(ce) {
      if (ce.length === 0)
        return null;
      var xe = ce[0], He = ce.pop();
      return He !== xe && (ce[0] = He, _(ce, He, 0)), xe;
    }
    function f(ce, xe, He) {
      for (var at = He; at > 0; ) {
        var ht = at - 1 >>> 1, St = ce[ht];
        if (R(St, xe) > 0)
          ce[ht] = xe, ce[at] = St, at = ht;
        else
          return;
      }
    }
    function _(ce, xe, He) {
      for (var at = He, ht = ce.length, St = ht >>> 1; at < St; ) {
        var Rt = (at + 1) * 2 - 1, En = ce[Rt], Dt = Rt + 1, ct = ce[Dt];
        if (R(En, xe) < 0)
          Dt < ht && R(ct, En) < 0 ? (ce[at] = ct, ce[Dt] = xe, at = Dt) : (ce[at] = En, ce[Rt] = xe, at = Rt);
        else if (Dt < ht && R(ct, xe) < 0)
          ce[at] = ct, ce[Dt] = xe, at = Dt;
        else
          return;
      }
    }
    function R(ce, xe) {
      var He = ce.sortIndex - xe.sortIndex;
      return He !== 0 ? He : ce.id - xe.id;
    }
    var T = 1, O = 2, E = 3, L = 4, U = 5;
    function B(ce, xe) {
    }
    var se = typeof performance == "object" && typeof performance.now == "function";
    if (se) {
      var ie = performance;
      o.unstable_now = function() {
        return ie.now();
      };
    } else {
      var oe = Date, W = oe.now();
      o.unstable_now = function() {
        return oe.now() - W;
      };
    }
    var $ = 1073741823, G = -1, le = 250, I = 5e3, H = 1e4, ye = $, ee = [], Q = [], re = 1, je = null, Y = E, k = !1, Z = !1, pe = !1, te = typeof setTimeout == "function" ? setTimeout : null, _e = typeof clearTimeout == "function" ? clearTimeout : null, Qe = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function ne(ce) {
      for (var xe = y(Q); xe !== null; ) {
        if (xe.callback === null)
          S(Q);
        else if (xe.startTime <= ce)
          S(Q), xe.sortIndex = xe.expirationTime, g(ee, xe);
        else
          return;
        xe = y(Q);
      }
    }
    function Me(ce) {
      if (pe = !1, ne(ce), !Z)
        if (y(ee) !== null)
          Z = !0, It(ut);
        else {
          var xe = y(Q);
          xe !== null && Mn(Me, xe.startTime - ce);
        }
    }
    function ut(ce, xe) {
      Z = !1, pe && (pe = !1, $n()), k = !0;
      var He = Y;
      try {
        var at;
        if (!d) return zt(ce, xe);
      } finally {
        je = null, Y = He, k = !1;
      }
    }
    function zt(ce, xe) {
      var He = xe;
      for (ne(He), je = y(ee); je !== null && !(je.expirationTime > He && (!ce || la())); ) {
        var at = je.callback;
        if (typeof at == "function") {
          je.callback = null, Y = je.priorityLevel;
          var ht = je.expirationTime <= He, St = at(ht);
          He = o.unstable_now(), typeof St == "function" ? je.callback = St : je === y(ee) && S(ee), ne(He);
        } else
          S(ee);
        je = y(ee);
      }
      if (je !== null)
        return !0;
      var Rt = y(Q);
      return Rt !== null && Mn(Me, Rt.startTime - He), !1;
    }
    function Mt(ce, xe) {
      switch (ce) {
        case T:
        case O:
        case E:
        case L:
        case U:
          break;
        default:
          ce = E;
      }
      var He = Y;
      Y = ce;
      try {
        return xe();
      } finally {
        Y = He;
      }
    }
    function xt(ce) {
      var xe;
      switch (Y) {
        case T:
        case O:
        case E:
          xe = E;
          break;
        default:
          xe = Y;
          break;
      }
      var He = Y;
      Y = xe;
      try {
        return ce();
      } finally {
        Y = He;
      }
    }
    function Pt(ce) {
      var xe = Y;
      return function() {
        var He = Y;
        Y = xe;
        try {
          return ce.apply(this, arguments);
        } finally {
          Y = He;
        }
      };
    }
    function st(ce, xe, He) {
      var at = o.unstable_now(), ht;
      if (typeof He == "object" && He !== null) {
        var St = He.delay;
        typeof St == "number" && St > 0 ? ht = at + St : ht = at;
      } else
        ht = at;
      var Rt;
      switch (ce) {
        case T:
          Rt = G;
          break;
        case O:
          Rt = le;
          break;
        case U:
          Rt = ye;
          break;
        case L:
          Rt = H;
          break;
        case E:
        default:
          Rt = I;
          break;
      }
      var En = ht + Rt, Dt = {
        id: re++,
        callback: xe,
        priorityLevel: ce,
        startTime: ht,
        expirationTime: En,
        sortIndex: -1
      };
      return ht > at ? (Dt.sortIndex = ht, g(Q, Dt), y(ee) === null && Dt === y(Q) && (pe ? $n() : pe = !0, Mn(Me, ht - at))) : (Dt.sortIndex = En, g(ee, Dt), !Z && !k && (Z = !0, It(ut))), Dt;
    }
    function on() {
    }
    function Ht() {
      !Z && !k && (Z = !0, It(ut));
    }
    function Bt() {
      return y(ee);
    }
    function $t(ce) {
      ce.callback = null;
    }
    function bn() {
      return Y;
    }
    var Vt = !1, sn = null, At = -1, _t = m, wn = -1;
    function la() {
      var ce = o.unstable_now() - wn;
      return !(ce < _t);
    }
    function _n() {
    }
    function Bn(ce) {
      if (ce < 0 || ce > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      ce > 0 ? _t = Math.floor(1e3 / ce) : _t = m;
    }
    var Nn = function() {
      if (sn !== null) {
        var ce = o.unstable_now();
        wn = ce;
        var xe = !0, He = !0;
        try {
          He = sn(xe, ce);
        } finally {
          He ? un() : (Vt = !1, sn = null);
        }
      } else
        Vt = !1;
    }, un;
    if (typeof Qe == "function")
      un = function() {
        Qe(Nn);
      };
    else if (typeof MessageChannel < "u") {
      var On = new MessageChannel(), Ha = On.port2;
      On.port1.onmessage = Nn, un = function() {
        Ha.postMessage(null);
      };
    } else
      un = function() {
        te(Nn, 0);
      };
    function It(ce) {
      sn = ce, Vt || (Vt = !0, un());
    }
    function Mn(ce, xe) {
      At = te(function() {
        ce(o.unstable_now());
      }, xe);
    }
    function $n() {
      _e(At), At = -1;
    }
    var Vr = _n, ir = null;
    o.unstable_IdlePriority = U, o.unstable_ImmediatePriority = T, o.unstable_LowPriority = L, o.unstable_NormalPriority = E, o.unstable_Profiling = ir, o.unstable_UserBlockingPriority = O, o.unstable_cancelCallback = $t, o.unstable_continueExecution = Ht, o.unstable_forceFrameRate = Bn, o.unstable_getCurrentPriorityLevel = bn, o.unstable_getFirstCallbackNode = Bt, o.unstable_next = xt, o.unstable_pauseExecution = on, o.unstable_requestPaint = Vr, o.unstable_runWithPriority = Mt, o.unstable_scheduleCallback = st, o.unstable_shouldYield = la, o.unstable_wrapCallback = Pt, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
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
  var o = N, d = sw, m = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
  function y(e) {
    g = e;
  }
  function S(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      _("warn", e, n);
    }
  }
  function f(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      _("error", e, n);
    }
  }
  function _(e, t, n) {
    {
      var a = m.ReactDebugCurrentFrame, r = a.getStackAddendum();
      r !== "" && (t += "%s", n = n.concat([r]));
      var i = n.map(function(l) {
        return String(l);
      });
      i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
    }
  }
  var R = 0, T = 1, O = 2, E = 3, L = 4, U = 5, B = 6, se = 7, ie = 8, oe = 9, W = 10, $ = 11, G = 12, le = 13, I = 14, H = 15, ye = 16, ee = 17, Q = 18, re = 19, je = 21, Y = 22, k = 23, Z = 24, pe = 25, te = !0, _e = !1, Qe = !1, ne = !1, Me = !1, ut = !0, zt = !0, Mt = !0, xt = !0, Pt = /* @__PURE__ */ new Set(), st = {}, on = {};
  function Ht(e, t) {
    Bt(e, t), Bt(e + "Capture", t);
  }
  function Bt(e, t) {
    st[e] && f("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), st[e] = t;
    {
      var n = e.toLowerCase();
      on[n] = e, e === "onDoubleClick" && (on.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      Pt.add(t[a]);
  }
  var $t = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", bn = Object.prototype.hasOwnProperty;
  function Vt(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function sn(e) {
    try {
      return At(e), !1;
    } catch {
      return !0;
    }
  }
  function At(e) {
    return "" + e;
  }
  function _t(e, t) {
    if (sn(e))
      return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Vt(e)), At(e);
  }
  function wn(e) {
    if (sn(e))
      return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Vt(e)), At(e);
  }
  function la(e, t) {
    if (sn(e))
      return f("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Vt(e)), At(e);
  }
  function _n(e, t) {
    if (sn(e))
      return f("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Vt(e)), At(e);
  }
  function Bn(e) {
    if (sn(e))
      return f("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Vt(e)), At(e);
  }
  function Nn(e) {
    if (sn(e))
      return f("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Vt(e)), At(e);
  }
  var un = 0, On = 1, Ha = 2, It = 3, Mn = 4, $n = 5, Vr = 6, ir = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ce = ir + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", xe = new RegExp("^[" + ir + "][" + ce + "]*$"), He = {}, at = {};
  function ht(e) {
    return bn.call(at, e) ? !0 : bn.call(He, e) ? !1 : xe.test(e) ? (at[e] = !0, !0) : (He[e] = !0, f("Invalid attribute name: `%s`", e), !1);
  }
  function St(e, t, n) {
    return t !== null ? t.type === un : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function Rt(e, t, n, a) {
    if (n !== null && n.type === un)
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
  function En(e, t, n, a) {
    if (t === null || typeof t > "u" || Rt(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case It:
          return !t;
        case Mn:
          return t === !1;
        case $n:
          return isNaN(t);
        case Vr:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function Dt(e) {
    return Tt.hasOwnProperty(e) ? Tt[e] : null;
  }
  function ct(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === Ha || t === It || t === Mn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var Tt = {}, ba = [
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
  ba.forEach(function(e) {
    Tt[e] = new ct(
      e,
      un,
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
    Tt[t] = new ct(
      t,
      On,
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
    Tt[e] = new ct(
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
    Tt[e] = new ct(
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
    Tt[e] = new ct(
      e,
      It,
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
    Tt[e] = new ct(
      e,
      It,
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
    Tt[e] = new ct(
      e,
      Mn,
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
    Tt[e] = new ct(
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
    Tt[e] = new ct(
      e,
      $n,
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
  var Na = /[\-\:]([a-z])/g, oa = function(e) {
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
    var t = e.replace(Na, oa);
    Tt[t] = new ct(
      t,
      On,
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
    var t = e.replace(Na, oa);
    Tt[t] = new ct(
      t,
      On,
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
    var t = e.replace(Na, oa);
    Tt[t] = new ct(
      t,
      On,
      !1,
      // mustUseProperty
      e,
      "http://www.w3.org/XML/1998/namespace",
      !1,
      // sanitizeURL
      !1
    );
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    Tt[e] = new ct(
      e,
      On,
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
  Tt[lr] = new ct(
    "xlinkHref",
    On,
    !1,
    // mustUseProperty
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    // sanitizeURL
    !1
  ), ["src", "href", "action", "formAction"].forEach(function(e) {
    Tt[e] = new ct(
      e,
      On,
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
      _t(n, t), a.sanitizeURL && Ji("" + n);
      var i = a.attributeName, l = null;
      if (a.type === Mn) {
        if (e.hasAttribute(i)) {
          var s = e.getAttribute(i);
          return s === "" ? !0 : En(t, n, a, !1) ? s : s === "" + n ? n : s;
        }
      } else if (e.hasAttribute(i)) {
        if (En(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === It)
          return n;
        l = e.getAttribute(i);
      }
      return En(t, n, a, !1) ? l === null ? n : l : l === "" + n ? n : l;
    }
  }
  function di(e, t, n, a) {
    {
      if (!ht(t))
        return;
      if (!e.hasAttribute(t))
        return n === void 0 ? void 0 : null;
      var r = e.getAttribute(t);
      return _t(n, t), r === "" + n ? n : r;
    }
  }
  function Ea(e, t, n, a) {
    var r = Dt(t);
    if (!St(t, r, a)) {
      if (En(t, n, r, a) && (n = null), a || r === null) {
        if (ht(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : (_t(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var l = r.mustUseProperty;
      if (l) {
        var s = r.propertyName;
        if (n === null) {
          var c = r.type;
          e[s] = c === It ? !1 : "";
        } else
          e[s] = n;
        return;
      }
      var h = r.attributeName, v = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(h);
      else {
        var D = r.type, C;
        D === It || D === Mn && n === !0 ? C = "" : (_t(n, h), C = "" + n, r.sanitizeURL && Ji(C.toString())), v ? e.setAttributeNS(v, h, C) : e.setAttribute(h, C);
      }
    }
  }
  var sa = Symbol.for("react.element"), Qn = Symbol.for("react.portal"), Ba = Symbol.for("react.fragment"), pi = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), X = Symbol.for("react.provider"), fe = Symbol.for("react.context"), Se = Symbol.for("react.forward_ref"), Ye = Symbol.for("react.suspense"), Ve = Symbol.for("react.suspense_list"), ze = Symbol.for("react.memo"), Ce = Symbol.for("react.lazy"), Yt = Symbol.for("react.scope"), vt = Symbol.for("react.debug_trace_mode"), gt = Symbol.for("react.offscreen"), xn = Symbol.for("react.legacy_hidden"), $a = Symbol.for("react.cache"), xa = Symbol.for("react.tracing_marker"), qt = Symbol.iterator, mi = "@@iterator";
  function Sa(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = qt && e[qt] || e[mi];
    return typeof t == "function" ? t : null;
  }
  var Be = Object.assign, hi = 0, iu, lu, Ar, lo, oo, so, uo;
  function co() {
  }
  co.__reactDisabledLog = !0;
  function ou() {
    {
      if (hi === 0) {
        iu = console.log, lu = console.info, Ar = console.warn, lo = console.error, oo = console.group, so = console.groupCollapsed, uo = console.groupEnd;
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
      hi++;
    }
  }
  function su() {
    {
      if (hi--, hi === 0) {
        var e = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: Be({}, e, {
            value: iu
          }),
          info: Be({}, e, {
            value: lu
          }),
          warn: Be({}, e, {
            value: Ar
          }),
          error: Be({}, e, {
            value: lo
          }),
          group: Be({}, e, {
            value: oo
          }),
          groupCollapsed: Be({}, e, {
            value: so
          }),
          groupEnd: Be({}, e, {
            value: uo
          })
        });
      }
      hi < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var el = m.ReactCurrentDispatcher, fo;
  function Ia(e, t, n) {
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
  var vi = !1, Lr;
  {
    var tl = typeof WeakMap == "function" ? WeakMap : Map;
    Lr = new tl();
  }
  function gi(e, t) {
    if (!e || vi)
      return "";
    {
      var n = Lr.get(e);
      if (n !== void 0)
        return n;
    }
    var a;
    vi = !0;
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
        for (var s = A.stack.split(`
`), c = a.stack.split(`
`), h = s.length - 1, v = c.length - 1; h >= 1 && v >= 0 && s[h] !== c[v]; )
          v--;
        for (; h >= 1 && v >= 0; h--, v--)
          if (s[h] !== c[v]) {
            if (h !== 1 || v !== 1)
              do
                if (h--, v--, v < 0 || s[h] !== c[v]) {
                  var D = `
` + s[h].replace(" at new ", " at ");
                  return e.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", e.displayName)), typeof e == "function" && Lr.set(e, D), D;
                }
              while (h >= 1 && v >= 0);
            break;
          }
      }
    } finally {
      vi = !1, el.current = i, su(), Error.prepareStackTrace = r;
    }
    var C = e ? e.displayName || e.name : "", M = C ? Ia(C) : "";
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
      return Ia(e);
    switch (e) {
      case Ye:
        return Ia("Suspense");
      case Ve:
        return Ia("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Se:
          return po(e.render);
        case ze:
          return mo(e.type, t, n);
        case Ce: {
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
        return Ia(e.type);
      case ye:
        return Ia("Lazy");
      case le:
        return Ia("Suspense");
      case re:
        return Ia("SuspenseList");
      case R:
      case O:
      case H:
        return po(e.type);
      case $:
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
  function ho(e) {
    return e.displayName || "Context";
  }
  function Ze(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case Ba:
        return "Fragment";
      case Qn:
        return "Portal";
      case x:
        return "Profiler";
      case pi:
        return "StrictMode";
      case Ye:
        return "Suspense";
      case Ve:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case fe:
          var t = e;
          return ho(t) + ".Consumer";
        case X:
          var n = e;
          return ho(n._context) + ".Provider";
        case Se:
          return cu(e, e.render, "ForwardRef");
        case ze:
          var a = e.displayName || null;
          return a !== null ? a : Ze(e.type) || "Memo";
        case Ce: {
          var r = e, i = r._payload, l = r._init;
          try {
            return Ze(l(i));
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
  function Fe(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case Z:
        return "Cache";
      case oe:
        var a = n;
        return or(a) + ".Consumer";
      case W:
        var r = n;
        return or(r._context) + ".Provider";
      case Q:
        return "DehydratedFragment";
      case $:
        return Cf(n, n.render, "ForwardRef");
      case se:
        return "Fragment";
      case U:
        return n;
      case L:
        return "Portal";
      case E:
        return "Root";
      case B:
        return "Text";
      case ye:
        return Ze(n);
      case ie:
        return n === pi ? "StrictMode" : "Mode";
      case Y:
        return "Offscreen";
      case G:
        return "Profiler";
      case je:
        return "Scope";
      case le:
        return "Suspense";
      case re:
        return "SuspenseList";
      case pe:
        return "TracingMarker";
      case T:
      case R:
      case ee:
      case O:
      case I:
      case H:
        if (typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        break;
    }
    return null;
  }
  var vo = m.ReactDebugCurrentFrame, Vn = null, bi = !1;
  function kr() {
    {
      if (Vn === null)
        return null;
      var e = Vn._debugOwner;
      if (e !== null && typeof e < "u")
        return Fe(e);
    }
    return null;
  }
  function Df() {
    return Vn === null ? "" : yi(Vn);
  }
  function tn() {
    vo.getCurrentStack = null, Vn = null, bi = !1;
  }
  function bt(e) {
    vo.getCurrentStack = e === null ? null : Df, Vn = e, bi = !1;
  }
  function fu() {
    return Vn;
  }
  function ua(e) {
    bi = e;
  }
  function An(e) {
    return "" + e;
  }
  function Ra(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return Nn(e), e;
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
    Nn(e[t]);
    var a = "" + e[t];
    if (!(e.hasOwnProperty(t) || typeof n > "u" || typeof n.get != "function" || typeof n.set != "function")) {
      var r = n.get, i = n.set;
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(s) {
          Nn(s), a = "" + s, i.call(this, s);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      });
      var l = {
        getValue: function() {
          return a;
        },
        setValue: function(s) {
          Nn(s), a = "" + s;
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
    var n = e, a = t.checked, r = Be({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? n._wrapperState.initialChecked
    });
    return r;
  }
  function hu(e, t) {
    go("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !il && (f("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component", t.type), il = !0), t.value !== void 0 && t.defaultValue !== void 0 && !rl && (f("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component", t.type), rl = !0);
    var n = e, a = t.defaultValue == null ? "" : t.defaultValue;
    n._wrapperState = {
      initialChecked: t.checked != null ? t.checked : t.defaultChecked,
      initialValue: Ra(t.value != null ? t.value : a),
      controlled: mu(t)
    };
  }
  function p(e, t) {
    var n = e, a = t.checked;
    a != null && Ea(n, "checked", a, !1);
  }
  function b(e, t) {
    var n = e;
    {
      var a = mu(t);
      !n._wrapperState.controlled && a && !pu && (f("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), pu = !0), n._wrapperState.controlled && !a && !ll && (f("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ll = !0);
    }
    p(e, t);
    var r = Ra(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = An(r)) : n.value !== An(r) && (n.value = An(r));
    else if (i === "submit" || i === "reset") {
      n.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Te(n, t.type, r) : t.hasOwnProperty("defaultValue") && Te(n, t.type, Ra(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
  }
  function V(e, t, n) {
    var a = e;
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type, i = r === "submit" || r === "reset";
      if (i && (t.value === void 0 || t.value === null))
        return;
      var l = An(a._wrapperState.initialValue);
      n || l !== a.value && (a.value = l), a.defaultValue = l;
    }
    var s = a.name;
    s !== "" && (a.name = ""), a.defaultChecked = !a.defaultChecked, a.defaultChecked = !!a._wrapperState.initialChecked, s !== "" && (a.name = s);
  }
  function F(e, t) {
    var n = e;
    b(n, t), ae(n, t);
  }
  function ae(e, t) {
    var n = t.name;
    if (t.type === "radio" && n != null) {
      for (var a = e; a.parentNode; )
        a = a.parentNode;
      _t(n, "name");
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
  function Te(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || sr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = An(e._wrapperState.initialValue) : e.defaultValue !== An(n) && (e.defaultValue = An(n)));
  }
  var Ne = !1, ke = !1, qe = !1;
  function rt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? o.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || ke || (ke = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (qe || (qe = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Ne && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Ne = !0);
  }
  function dt(e, t) {
    t.value != null && e.setAttribute("value", An(Ra(t.value)));
  }
  var pt = Array.isArray;
  function $e(e) {
    return pt(e);
  }
  var Nt;
  Nt = !1;
  function Lt() {
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
          var a = $e(e[n]);
          e.multiple && !a ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Lt()) : !e.multiple && a && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Lt());
        }
      }
    }
  }
  function ur(e, t, n, a) {
    var r = e.options;
    if (t) {
      for (var i = n, l = {}, s = 0; s < i.length; s++)
        l["$" + i[s]] = !0;
      for (var c = 0; c < r.length; c++) {
        var h = l.hasOwnProperty("$" + r[c].value);
        r[c].selected !== h && (r[c].selected = h), h && a && (r[c].defaultSelected = !0);
      }
    } else {
      for (var v = An(Ra(n)), D = null, C = 0; C < r.length; C++) {
        if (r[C].value === v) {
          r[C].selected = !0, a && (r[C].defaultSelected = !0);
          return;
        }
        D === null && !r[C].disabled && (D = r[C]);
      }
      D !== null && (D.selected = !0);
    }
  }
  function xo(e, t) {
    return Be({}, t, {
      value: void 0
    });
  }
  function So(e, t) {
    var n = e;
    Eo(t), n._wrapperState = {
      wasMultiple: !!t.multiple
    }, t.value !== void 0 && t.defaultValue !== void 0 && !Nt && (f("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Nt = !0);
  }
  function wf(e, t) {
    var n = e;
    n.multiple = !!t.multiple;
    var a = t.value;
    a != null ? ur(n, !!t.multiple, a, !1) : t.defaultValue != null && ur(n, !!t.multiple, t.defaultValue, !0);
  }
  function vu(e, t) {
    var n = e, a = n._wrapperState.wasMultiple;
    n._wrapperState.wasMultiple = !!t.multiple;
    var r = t.value;
    r != null ? ur(n, !!t.multiple, r, !1) : a !== !!t.multiple && (t.defaultValue != null ? ur(n, !!t.multiple, t.defaultValue, !0) : ur(n, !!t.multiple, t.multiple ? [] : "", !1));
  }
  function _f(e, t) {
    var n = e, a = t.value;
    a != null && ur(n, !!t.multiple, a, !1);
  }
  var Wh = !1;
  function Of(e, t) {
    var n = e;
    if (t.dangerouslySetInnerHTML != null)
      throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
    var a = Be({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: An(n._wrapperState.initialValue)
    });
    return a;
  }
  function Kh(e, t) {
    var n = e;
    go("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Wh && (f("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component"), Wh = !0);
    var a = t.value;
    if (a == null) {
      var r = t.children, i = t.defaultValue;
      if (r != null) {
        f("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
        {
          if (i != null)
            throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if ($e(r)) {
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
      initialValue: Ra(a)
    };
  }
  function Qh(e, t) {
    var n = e, a = Ra(t.value), r = Ra(t.defaultValue);
    if (a != null) {
      var i = An(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = An(r));
  }
  function Xh(e, t) {
    var n = e, a = n.textContent;
    a === n._wrapperState.initialValue && a !== "" && a !== null && (n.value = a);
  }
  function IE(e, t) {
    Qh(e, t);
  }
  var cr = "http://www.w3.org/1999/xhtml", YE = "http://www.w3.org/1998/Math/MathML", Mf = "http://www.w3.org/2000/svg";
  function Vf(e) {
    switch (e) {
      case "svg":
        return Mf;
      case "math":
        return YE;
      default:
        return cr;
    }
  }
  function Af(e, t) {
    return e == null || e === cr ? Vf(t) : e === Mf && t === "foreignObject" ? cr : e;
  }
  var qE = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, gu, Jh = qE(function(e, t) {
    if (e.namespaceURI === Mf && !("innerHTML" in e)) {
      gu = gu || document.createElement("div"), gu.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = gu.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), In = 1, fr = 3, kt = 8, dr = 9, Lf = 11, yu = function(e, t) {
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
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(Ro.hasOwnProperty(e) && Ro[e]) ? t + "px" : (_n(t, e), ("" + t).trim());
  }
  var QE = /([A-Z])/g, XE = /^ms-/;
  function JE(e) {
    return e.replace(QE, "-$1").toLowerCase().replace(XE, "-ms-");
  }
  var Zh = function() {
  };
  {
    var ZE = /^(?:webkit|moz|o)[A-Z]/, ex = /^-ms-/, tx = /-(.)/g, ev = /;\s*$/, ol = {}, Uf = {}, tv = !1, nv = !1, nx = function(e) {
      return e.replace(tx, function(t, n) {
        return n.toUpperCase();
      });
    }, ax = function(e) {
      ol.hasOwnProperty(e) && ol[e] || (ol[e] = !0, f(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        nx(e.replace(ex, "ms-"))
      ));
    }, rx = function(e) {
      ol.hasOwnProperty(e) && ol[e] || (ol[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, ix = function(e, t) {
      Uf.hasOwnProperty(t) && Uf[t] || (Uf[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(ev, "")));
    }, lx = function(e, t) {
      tv || (tv = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
    }, ox = function(e, t) {
      nv || (nv = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Zh = function(e, t) {
      e.indexOf("-") > -1 ? ax(e) : ZE.test(e) ? rx(e) : ev.test(t) && ix(e, t), typeof t == "number" && (isNaN(t) ? lx(e, t) : isFinite(t) || ox(e, t));
    };
  }
  var sx = Zh;
  function ux(e) {
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
  function av(e, t) {
    var n = e.style;
    for (var a in t)
      if (t.hasOwnProperty(a)) {
        var r = a.indexOf("--") === 0;
        r || sx(a, t[a]);
        var i = kf(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function cx(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function rv(e) {
    var t = {};
    for (var n in e)
      for (var a = GE[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function fx(e, t) {
    {
      if (!t)
        return;
      var n = rv(e), a = rv(t), r = {};
      for (var i in n) {
        var l = n[i], s = a[i];
        if (s && l !== s) {
          var c = l + "," + s;
          if (r[c])
            continue;
          r[c] = !0, f("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", cx(e[l]) ? "Removing" : "Updating", l, s);
        }
      }
    }
  }
  var dx = {
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
  }, px = Be({
    menuitem: !0
  }, dx), mx = "__html";
  function Ff(e, t) {
    if (t) {
      if (px[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(mx in t.dangerouslySetInnerHTML))
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
  }, iv = {
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
  }, sl = {}, hx = new RegExp("^(aria)-[" + ce + "]*$"), vx = new RegExp("^(aria)[A-Z][" + ce + "]*$");
  function gx(e, t) {
    {
      if (bn.call(sl, t) && sl[t])
        return !0;
      if (vx.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = iv.hasOwnProperty(n) ? n : null;
        if (a == null)
          return f("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), sl[t] = !0, !0;
        if (t !== a)
          return f("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), sl[t] = !0, !0;
      }
      if (hx.test(t)) {
        var r = t.toLowerCase(), i = iv.hasOwnProperty(r) ? r : null;
        if (i == null)
          return sl[t] = !0, !1;
        if (t !== i)
          return f("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), sl[t] = !0, !0;
      }
    }
    return !0;
  }
  function yx(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = gx(e, a);
        r || n.push(a);
      }
      var i = n.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      n.length === 1 ? f("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && f("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function bx(e, t) {
    xi(e, t) || yx(e, t);
  }
  var lv = !1;
  function Nx(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !lv && (lv = !0, e === "select" && t.multiple ? f("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : f("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var ov = function() {
  };
  {
    var Ln = {}, sv = /^on./, Ex = /^on[^A-Z]/, xx = new RegExp("^(aria)-[" + ce + "]*$"), Sx = new RegExp("^(aria)[A-Z][" + ce + "]*$");
    ov = function(e, t, n, a) {
      if (bn.call(Ln, t) && Ln[t])
        return !0;
      var r = t.toLowerCase();
      if (r === "onfocusin" || r === "onfocusout")
        return f("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Ln[t] = !0, !0;
      if (a != null) {
        var i = a.registrationNameDependencies, l = a.possibleRegistrationNames;
        if (i.hasOwnProperty(t))
          return !0;
        var s = l.hasOwnProperty(r) ? l[r] : null;
        if (s != null)
          return f("Invalid event handler property `%s`. Did you mean `%s`?", t, s), Ln[t] = !0, !0;
        if (sv.test(t))
          return f("Unknown event handler property `%s`. It will be ignored.", t), Ln[t] = !0, !0;
      } else if (sv.test(t))
        return Ex.test(t) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Ln[t] = !0, !0;
      if (xx.test(t) || Sx.test(t))
        return !0;
      if (r === "innerhtml")
        return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Ln[t] = !0, !0;
      if (r === "aria")
        return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Ln[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Ln[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Ln[t] = !0, !0;
      var c = Dt(t), h = c !== null && c.type === un;
      if (bu.hasOwnProperty(r)) {
        var v = bu[r];
        if (v !== t)
          return f("Invalid DOM property `%s`. Did you mean `%s`?", t, v), Ln[t] = !0, !0;
      } else if (!h && t !== r)
        return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), Ln[t] = !0, !0;
      return typeof n == "boolean" && Rt(t, n, c, !1) ? (n ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), Ln[t] = !0, !0) : h ? !0 : Rt(t, n, c, !1) ? (Ln[t] = !0, !1) : ((n === "false" || n === "true") && c !== null && c.type === It && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), Ln[t] = !0), !0);
    };
  }
  var Rx = function(e, t, n) {
    {
      var a = [];
      for (var r in t) {
        var i = ov(e, r, t[r], n);
        i || a.push(r);
      }
      var l = a.map(function(s) {
        return "`" + s + "`";
      }).join(", ");
      a.length === 1 ? f("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e) : a.length > 1 && f("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e);
    }
  };
  function Cx(e, t, n) {
    xi(e, t) || Rx(e, t, n);
  }
  var uv = 1, zf = 2, Co = 4, Dx = uv | zf | Co, Do = null;
  function Tx(e) {
    Do !== null && f("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Do = e;
  }
  function jx() {
    Do === null && f("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Do = null;
  }
  function wx(e) {
    return e === Do;
  }
  function Pf(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === fr ? t.parentNode : t;
  }
  var Hf = null, ul = null, cl = null;
  function cv(e) {
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
  function _x(e) {
    Hf = e;
  }
  function fv(e) {
    ul ? cl ? cl.push(e) : cl = [e] : ul = e;
  }
  function Ox() {
    return ul !== null || cl !== null;
  }
  function dv() {
    if (ul) {
      var e = ul, t = cl;
      if (ul = null, cl = null, cv(e), t)
        for (var n = 0; n < t.length; n++)
          cv(t[n]);
    }
  }
  var pv = function(e, t) {
    return e(t);
  }, mv = function() {
  }, Bf = !1;
  function Mx() {
    var e = Ox();
    e && (mv(), dv());
  }
  function hv(e, t, n) {
    if (Bf)
      return e(t, n);
    Bf = !0;
    try {
      return pv(e, t, n);
    } finally {
      Bf = !1, Mx();
    }
  }
  function Vx(e, t, n) {
    pv = e, mv = n;
  }
  function Ax(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function Lx(e, t, n) {
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
        return !!(n.disabled && Ax(t));
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
    if (Lx(t, e.type, a))
      return null;
    if (r && typeof r != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
    return r;
  }
  var $f = !1;
  if ($t)
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
  function vv(e, t, n, a, r, i, l, s, c) {
    var h = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, h);
    } catch (v) {
      this.onError(v);
    }
  }
  var gv = vv;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var If = document.createElement("react");
    gv = function(t, n, a, r, i, l, s, c, h) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var v = document.createEvent("Event"), D = !1, C = !0, M = window.event, A = Object.getOwnPropertyDescriptor(window, "event");
      function z() {
        If.removeEventListener(P, Re, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = M);
      }
      var de = Array.prototype.slice.call(arguments, 3);
      function Re() {
        D = !0, z(), n.apply(a, de), C = !1;
      }
      var Ee, Ke = !1, Ie = !1;
      function j(w) {
        if (Ee = w.error, Ke = !0, Ee === null && w.colno === 0 && w.lineno === 0 && (Ie = !0), w.defaultPrevented && Ee != null && typeof Ee == "object")
          try {
            Ee._suppressLogging = !0;
          } catch {
          }
      }
      var P = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", j), If.addEventListener(P, Re, !1), v.initEvent(P, !1, !1), If.dispatchEvent(v), A && Object.defineProperty(window, "event", A), D && C && (Ke ? Ie && (Ee = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Ee = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Ee)), window.removeEventListener("error", j), !D)
        return z(), vv.apply(this, arguments);
    };
  }
  var kx = gv, fl = !1, Nu = null, Eu = !1, Yf = null, Ux = {
    onError: function(e) {
      fl = !0, Nu = e;
    }
  };
  function qf(e, t, n, a, r, i, l, s, c) {
    fl = !1, Nu = null, kx.apply(Ux, arguments);
  }
  function Fx(e, t, n, a, r, i, l, s, c) {
    if (qf.apply(this, arguments), fl) {
      var h = Gf();
      Eu || (Eu = !0, Yf = h);
    }
  }
  function zx() {
    if (Eu) {
      var e = Yf;
      throw Eu = !1, Yf = null, e;
    }
  }
  function Px() {
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
  function Hx(e) {
    return e._reactInternals !== void 0;
  }
  function Bx(e, t) {
    e._reactInternals = t;
  }
  var we = (
    /*                      */
    0
  ), pl = (
    /*                */
    1
  ), Ut = (
    /*                    */
    2
  ), et = (
    /*                       */
    4
  ), Si = (
    /*                */
    16
  ), wo = (
    /*                 */
    32
  ), yv = (
    /*                     */
    64
  ), tt = (
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
  ), $x = (
    /*               */
    32767
  ), xu = (
    /*                   */
    32768
  ), kn = (
    /*                */
    65536
  ), Kf = (
    /* */
    131072
  ), bv = (
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
    et | ml | 0
  ), ed = Ut | et | Si | wo | Ri | mr | Ci, _o = et | yv | Ri | Ci, hl = Fr | Si, hr = Di | Xf | Qf, Ix = m.ReactCurrentOwner;
  function Ti(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (Ut | mr)) !== we && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === E ? n : null;
  }
  function Nv(e) {
    if (e.tag === le) {
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
  function Ev(e) {
    return e.tag === E ? e.stateNode.containerInfo : null;
  }
  function Yx(e) {
    return Ti(e) === e;
  }
  function qx(e) {
    {
      var t = Ix.current;
      if (t !== null && t.tag === T) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || f("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Fe(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = dl(e);
    return r ? Ti(r) === r : !1;
  }
  function xv(e) {
    if (Ti(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function Sv(e) {
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
        for (var c = i.child; c; ) {
          if (c === a)
            return xv(i), e;
          if (c === r)
            return xv(i), t;
          c = c.sibling;
        }
        throw new Error("Unable to find node on an unmounted component.");
      }
      if (a.return !== r.return)
        a = i, r = l;
      else {
        for (var h = !1, v = i.child; v; ) {
          if (v === a) {
            h = !0, a = i, r = l;
            break;
          }
          if (v === r) {
            h = !0, r = i, a = l;
            break;
          }
          v = v.sibling;
        }
        if (!h) {
          for (v = l.child; v; ) {
            if (v === a) {
              h = !0, a = l, r = i;
              break;
            }
            if (v === r) {
              h = !0, r = l, a = i;
              break;
            }
            v = v.sibling;
          }
          if (!h)
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
  function Rv(e) {
    var t = Sv(e);
    return t !== null ? Cv(t) : null;
  }
  function Cv(e) {
    if (e.tag === U || e.tag === B)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = Cv(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function Gx(e) {
    var t = Sv(e);
    return t !== null ? Dv(t) : null;
  }
  function Dv(e) {
    if (e.tag === U || e.tag === B)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== L) {
        var n = Dv(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Tv = d.unstable_scheduleCallback, Wx = d.unstable_cancelCallback, Kx = d.unstable_shouldYield, Qx = d.unstable_requestPaint, nn = d.unstable_now, Xx = d.unstable_getCurrentPriorityLevel, Su = d.unstable_ImmediatePriority, td = d.unstable_UserBlockingPriority, ji = d.unstable_NormalPriority, Jx = d.unstable_LowPriority, nd = d.unstable_IdlePriority, Zx = d.unstable_yieldValue, eS = d.unstable_setDisableYieldValue, vl = null, Sn = null, he = null, Ya = !1, Ca = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function tS(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      zt && (e = Be({}, e, {
        getLaneLabelMap: oS,
        injectProfilingHooks: lS
      })), vl = t.inject(e), Sn = t;
    } catch (n) {
      f("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function nS(e, t) {
    if (Sn && typeof Sn.onScheduleFiberRoot == "function")
      try {
        Sn.onScheduleFiberRoot(vl, e, t);
      } catch (n) {
        Ya || (Ya = !0, f("React instrumentation encountered an error: %s", n));
      }
  }
  function aS(e, t) {
    if (Sn && typeof Sn.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & tt) === tt;
        if (Mt) {
          var a;
          switch (t) {
            case Zn:
              a = Su;
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
          Sn.onCommitFiberRoot(vl, e, a, n);
        }
      } catch (r) {
        Ya || (Ya = !0, f("React instrumentation encountered an error: %s", r));
      }
  }
  function rS(e) {
    if (Sn && typeof Sn.onPostCommitFiberRoot == "function")
      try {
        Sn.onPostCommitFiberRoot(vl, e);
      } catch (t) {
        Ya || (Ya = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function iS(e) {
    if (Sn && typeof Sn.onCommitFiberUnmount == "function")
      try {
        Sn.onCommitFiberUnmount(vl, e);
      } catch (t) {
        Ya || (Ya = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function an(e) {
    if (typeof Zx == "function" && (eS(e), y(e)), Sn && typeof Sn.setStrictMode == "function")
      try {
        Sn.setStrictMode(vl, e);
      } catch (t) {
        Ya || (Ya = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function lS(e) {
    he = e;
  }
  function oS() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < rd; n++) {
        var a = TS(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function sS(e) {
    he !== null && typeof he.markCommitStarted == "function" && he.markCommitStarted(e);
  }
  function jv() {
    he !== null && typeof he.markCommitStopped == "function" && he.markCommitStopped();
  }
  function Oo(e) {
    he !== null && typeof he.markComponentRenderStarted == "function" && he.markComponentRenderStarted(e);
  }
  function gl() {
    he !== null && typeof he.markComponentRenderStopped == "function" && he.markComponentRenderStopped();
  }
  function uS(e) {
    he !== null && typeof he.markComponentPassiveEffectMountStarted == "function" && he.markComponentPassiveEffectMountStarted(e);
  }
  function cS() {
    he !== null && typeof he.markComponentPassiveEffectMountStopped == "function" && he.markComponentPassiveEffectMountStopped();
  }
  function fS(e) {
    he !== null && typeof he.markComponentPassiveEffectUnmountStarted == "function" && he.markComponentPassiveEffectUnmountStarted(e);
  }
  function dS() {
    he !== null && typeof he.markComponentPassiveEffectUnmountStopped == "function" && he.markComponentPassiveEffectUnmountStopped();
  }
  function pS(e) {
    he !== null && typeof he.markComponentLayoutEffectMountStarted == "function" && he.markComponentLayoutEffectMountStarted(e);
  }
  function mS() {
    he !== null && typeof he.markComponentLayoutEffectMountStopped == "function" && he.markComponentLayoutEffectMountStopped();
  }
  function wv(e) {
    he !== null && typeof he.markComponentLayoutEffectUnmountStarted == "function" && he.markComponentLayoutEffectUnmountStarted(e);
  }
  function _v() {
    he !== null && typeof he.markComponentLayoutEffectUnmountStopped == "function" && he.markComponentLayoutEffectUnmountStopped();
  }
  function hS(e, t, n) {
    he !== null && typeof he.markComponentErrored == "function" && he.markComponentErrored(e, t, n);
  }
  function vS(e, t, n) {
    he !== null && typeof he.markComponentSuspended == "function" && he.markComponentSuspended(e, t, n);
  }
  function gS(e) {
    he !== null && typeof he.markLayoutEffectsStarted == "function" && he.markLayoutEffectsStarted(e);
  }
  function yS() {
    he !== null && typeof he.markLayoutEffectsStopped == "function" && he.markLayoutEffectsStopped();
  }
  function bS(e) {
    he !== null && typeof he.markPassiveEffectsStarted == "function" && he.markPassiveEffectsStarted(e);
  }
  function NS() {
    he !== null && typeof he.markPassiveEffectsStopped == "function" && he.markPassiveEffectsStopped();
  }
  function Ov(e) {
    he !== null && typeof he.markRenderStarted == "function" && he.markRenderStarted(e);
  }
  function ES() {
    he !== null && typeof he.markRenderYielded == "function" && he.markRenderYielded();
  }
  function Mv() {
    he !== null && typeof he.markRenderStopped == "function" && he.markRenderStopped();
  }
  function xS(e) {
    he !== null && typeof he.markRenderScheduled == "function" && he.markRenderScheduled(e);
  }
  function SS(e, t) {
    he !== null && typeof he.markForceUpdateScheduled == "function" && he.markForceUpdateScheduled(e, t);
  }
  function ad(e, t) {
    he !== null && typeof he.markStateUpdateScheduled == "function" && he.markStateUpdateScheduled(e, t);
  }
  var De = (
    /*                         */
    0
  ), Ge = (
    /*                 */
    1
  ), it = (
    /*                    */
    2
  ), jt = (
    /*               */
    8
  ), qa = (
    /*              */
    16
  ), Vv = Math.clz32 ? Math.clz32 : DS, RS = Math.log, CS = Math.LN2;
  function DS(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (RS(t) / CS | 0) | 0;
  }
  var rd = 31, K = (
    /*                        */
    0
  ), rn = (
    /*                          */
    0
  ), Ae = (
    /*                        */
    1
  ), yl = (
    /*    */
    2
  ), vr = (
    /*             */
    4
  ), wi = (
    /*            */
    8
  ), Ga = (
    /*                     */
    16
  ), Mo = (
    /*                */
    32
  ), bl = (
    /*                       */
    4194240
  ), Vo = (
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
  ), hd = (
    /*                       */
    131072
  ), vd = (
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
  ), xd = (
    /*                             */
    33554432
  ), Sd = (
    /*                             */
    67108864
  ), Av = Nl, Ao = (
    /*          */
    134217728
  ), Lv = (
    /*                          */
    268435455
  ), Lo = (
    /*               */
    268435456
  ), _i = (
    /*                        */
    536870912
  ), Xn = (
    /*                   */
    1073741824
  );
  function TS(e) {
    {
      if (e & Ae)
        return "Sync";
      if (e & yl)
        return "InputContinuousHydration";
      if (e & vr)
        return "InputContinuous";
      if (e & wi)
        return "DefaultHydration";
      if (e & Ga)
        return "Default";
      if (e & Mo)
        return "TransitionHydration";
      if (e & bl)
        return "Transition";
      if (e & Ru)
        return "Retry";
      if (e & Ao)
        return "SelectiveHydration";
      if (e & Lo)
        return "IdleHydration";
      if (e & _i)
        return "Idle";
      if (e & Xn)
        return "Offscreen";
    }
  }
  var mt = -1, Cu = Vo, Du = Nl;
  function ko(e) {
    switch (Oi(e)) {
      case Ae:
        return Ae;
      case yl:
        return yl;
      case vr:
        return vr;
      case wi:
        return wi;
      case Ga:
        return Ga;
      case Mo:
        return Mo;
      case Vo:
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
      case hd:
      case vd:
      case gd:
      case yd:
      case bd:
        return e & bl;
      case Nl:
      case Nd:
      case Ed:
      case xd:
      case Sd:
        return e & Ru;
      case Ao:
        return Ao;
      case Lo:
        return Lo;
      case _i:
        return _i;
      case Xn:
        return Xn;
      default:
        return f("Should have found matching lanes. This is a bug in React."), e;
    }
  }
  function Tu(e, t) {
    var n = e.pendingLanes;
    if (n === K)
      return K;
    var a = K, r = e.suspendedLanes, i = e.pingedLanes, l = n & Lv;
    if (l !== K) {
      var s = l & ~r;
      if (s !== K)
        a = ko(s);
      else {
        var c = l & i;
        c !== K && (a = ko(c));
      }
    } else {
      var h = n & ~r;
      h !== K ? a = ko(h) : i !== K && (a = ko(i));
    }
    if (a === K)
      return K;
    if (t !== K && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === K) {
      var v = Oi(a), D = Oi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        v >= D || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        v === Ga && (D & bl) !== K
      )
        return t;
    }
    (a & vr) !== K && (a |= n & Ga);
    var C = e.entangledLanes;
    if (C !== K)
      for (var M = e.entanglements, A = a & C; A > 0; ) {
        var z = Mi(A), de = 1 << z;
        a |= M[z], A &= ~de;
      }
    return a;
  }
  function jS(e, t) {
    for (var n = e.eventTimes, a = mt; t > 0; ) {
      var r = Mi(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function wS(e, t) {
    switch (e) {
      case Ae:
      case yl:
      case vr:
        return t + 250;
      case wi:
      case Ga:
      case Mo:
      case Vo:
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
      case hd:
      case vd:
      case gd:
      case yd:
      case bd:
        return t + 5e3;
      case Nl:
      case Nd:
      case Ed:
      case xd:
      case Sd:
        return mt;
      case Ao:
      case Lo:
      case _i:
      case Xn:
        return mt;
      default:
        return f("Should have found matching lanes. This is a bug in React."), mt;
    }
  }
  function _S(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var s = Mi(l), c = 1 << s, h = i[s];
      h === mt ? ((c & a) === K || (c & r) !== K) && (i[s] = wS(c, t)) : h <= t && (e.expiredLanes |= c), l &= ~c;
    }
  }
  function OS(e) {
    return ko(e.pendingLanes);
  }
  function Rd(e) {
    var t = e.pendingLanes & ~Xn;
    return t !== K ? t : t & Xn ? Xn : K;
  }
  function MS(e) {
    return (e & Ae) !== K;
  }
  function Cd(e) {
    return (e & Lv) !== K;
  }
  function kv(e) {
    return (e & Ru) === e;
  }
  function VS(e) {
    var t = Ae | vr | Ga;
    return (e & t) === K;
  }
  function AS(e) {
    return (e & bl) === e;
  }
  function ju(e, t) {
    var n = yl | vr | wi | Ga;
    return (t & n) !== K;
  }
  function LS(e, t) {
    return (t & e.expiredLanes) !== K;
  }
  function Uv(e) {
    return (e & bl) !== K;
  }
  function Fv() {
    var e = Cu;
    return Cu <<= 1, (Cu & bl) === K && (Cu = Vo), e;
  }
  function kS() {
    var e = Du;
    return Du <<= 1, (Du & Ru) === K && (Du = Nl), e;
  }
  function Oi(e) {
    return e & -e;
  }
  function Uo(e) {
    return Oi(e);
  }
  function Mi(e) {
    return 31 - Vv(e);
  }
  function Dd(e) {
    return Mi(e);
  }
  function Jn(e, t) {
    return (e & t) !== K;
  }
  function El(e, t) {
    return (e & t) === t;
  }
  function Pe(e, t) {
    return e | t;
  }
  function wu(e, t) {
    return e & ~t;
  }
  function zv(e, t) {
    return e & t;
  }
  function eO(e) {
    return e;
  }
  function US(e, t) {
    return e !== rn && e < t ? e : t;
  }
  function Td(e) {
    for (var t = [], n = 0; n < rd; n++)
      t.push(e);
    return t;
  }
  function Fo(e, t, n) {
    e.pendingLanes |= t, t !== _i && (e.suspendedLanes = K, e.pingedLanes = K);
    var a = e.eventTimes, r = Dd(t);
    a[r] = n;
  }
  function FS(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = Mi(a), i = 1 << r;
      n[r] = mt, a &= ~i;
    }
  }
  function Pv(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function zS(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = K, e.pingedLanes = K, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var s = Mi(l), c = 1 << s;
      a[s] = K, r[s] = mt, i[s] = mt, l &= ~c;
    }
  }
  function jd(e, t) {
    for (var n = e.entangledLanes |= t, a = e.entanglements, r = n; r; ) {
      var i = Mi(r), l = 1 << i;
      // Is this one of the newly entangled lanes?
      l & t | // Is this lane transitively entangled with the newly entangled lanes?
      a[i] & t && (a[i] |= t), r &= ~l;
    }
  }
  function PS(e, t) {
    var n = Oi(t), a;
    switch (n) {
      case vr:
        a = yl;
        break;
      case Ga:
        a = wi;
        break;
      case Vo:
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
      case hd:
      case vd:
      case gd:
      case yd:
      case bd:
      case Nl:
      case Nd:
      case Ed:
      case xd:
      case Sd:
        a = Mo;
        break;
      case _i:
        a = Lo;
        break;
      default:
        a = rn;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== rn ? rn : a;
  }
  function Hv(e, t, n) {
    if (Ca)
      for (var a = e.pendingUpdatersLaneMap; n > 0; ) {
        var r = Dd(n), i = 1 << r, l = a[r];
        l.add(t), n &= ~i;
      }
  }
  function Bv(e, t) {
    if (Ca)
      for (var n = e.pendingUpdatersLaneMap, a = e.memoizedUpdaters; t > 0; ) {
        var r = Dd(t), i = 1 << r, l = n[r];
        l.size > 0 && (l.forEach(function(s) {
          var c = s.alternate;
          (c === null || !a.has(c)) && a.add(s);
        }), l.clear()), t &= ~i;
      }
  }
  function $v(e, t) {
    return null;
  }
  var Zn = Ae, gr = vr, yr = Ga, _u = _i, zo = rn;
  function Da() {
    return zo;
  }
  function ln(e) {
    zo = e;
  }
  function HS(e, t) {
    var n = zo;
    try {
      return zo = e, t();
    } finally {
      zo = n;
    }
  }
  function BS(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function $S(e, t) {
    return e > t ? e : t;
  }
  function wd(e, t) {
    return e !== 0 && e < t;
  }
  function Iv(e) {
    var t = Oi(e);
    return wd(Zn, t) ? wd(gr, t) ? Cd(t) ? yr : _u : gr : Zn;
  }
  function Ou(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var Yv;
  function IS(e) {
    Yv = e;
  }
  function YS(e) {
    Yv(e);
  }
  var _d;
  function qS(e) {
    _d = e;
  }
  var qv;
  function GS(e) {
    qv = e;
  }
  var Gv;
  function WS(e) {
    Gv = e;
  }
  var Wv;
  function KS(e) {
    Wv = e;
  }
  var Od = !1, Mu = [], Pr = null, Hr = null, Br = null, Po = /* @__PURE__ */ new Map(), Ho = /* @__PURE__ */ new Map(), $r = [], QS = [
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
  function XS(e) {
    return QS.indexOf(e) > -1;
  }
  function JS(e, t, n, a, r) {
    return {
      blockedOn: e,
      domEventName: t,
      eventSystemFlags: n,
      nativeEvent: r,
      targetContainers: [a]
    };
  }
  function Kv(e, t) {
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
      var l = JS(t, n, a, r, i);
      if (t !== null) {
        var s = qr(t);
        s !== null && _d(s);
      }
      return l;
    }
    e.eventSystemFlags |= a;
    var c = e.targetContainers;
    return r !== null && c.indexOf(r) === -1 && c.push(r), e;
  }
  function ZS(e, t, n, a, r) {
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
        var c = r, h = c.pointerId;
        return Po.set(h, Bo(Po.get(h) || null, e, t, n, a, c)), !0;
      }
      case "gotpointercapture": {
        var v = r, D = v.pointerId;
        return Ho.set(D, Bo(Ho.get(D) || null, e, t, n, a, v)), !0;
      }
    }
    return !1;
  }
  function Qv(e) {
    var t = Li(e.target);
    if (t !== null) {
      var n = Ti(t);
      if (n !== null) {
        var a = n.tag;
        if (a === le) {
          var r = Nv(n);
          if (r !== null) {
            e.blockedOn = r, Wv(e.priority, function() {
              qv(n);
            });
            return;
          }
        } else if (a === E) {
          var i = n.stateNode;
          if (Ou(i)) {
            e.blockedOn = Ev(n);
            return;
          }
        }
      }
    }
    e.blockedOn = null;
  }
  function e0(e) {
    for (var t = Gv(), n = {
      blockedOn: null,
      target: e,
      priority: t
    }, a = 0; a < $r.length && wd(t, $r[a].priority); a++)
      ;
    $r.splice(a, 0, n), a === 0 && Qv(n);
  }
  function Vu(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = Ad(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
      if (a === null) {
        var r = e.nativeEvent, i = new r.constructor(r.type, r);
        Tx(i), r.target.dispatchEvent(i), jx();
      } else {
        var l = qr(a);
        return l !== null && _d(l), e.blockedOn = a, !1;
      }
      t.shift();
    }
    return !0;
  }
  function Xv(e, t, n) {
    Vu(e) && n.delete(t);
  }
  function t0() {
    Od = !1, Pr !== null && Vu(Pr) && (Pr = null), Hr !== null && Vu(Hr) && (Hr = null), Br !== null && Vu(Br) && (Br = null), Po.forEach(Xv), Ho.forEach(Xv);
  }
  function $o(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Od || (Od = !0, d.unstable_scheduleCallback(d.unstable_NormalPriority, t0)));
  }
  function Io(e) {
    if (Mu.length > 0) {
      $o(Mu[0], e);
      for (var t = 1; t < Mu.length; t++) {
        var n = Mu[t];
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
      Qv(l), l.blockedOn === null && $r.shift();
    }
  }
  var xl = m.ReactCurrentBatchConfig, Md = !0;
  function Jv(e) {
    Md = !!e;
  }
  function n0() {
    return Md;
  }
  function a0(e, t, n) {
    var a = Zv(t), r;
    switch (a) {
      case Zn:
        r = r0;
        break;
      case gr:
        r = i0;
        break;
      case yr:
      default:
        r = Vd;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function r0(e, t, n, a) {
    var r = Da(), i = xl.transition;
    xl.transition = null;
    try {
      ln(Zn), Vd(e, t, n, a);
    } finally {
      ln(r), xl.transition = i;
    }
  }
  function i0(e, t, n, a) {
    var r = Da(), i = xl.transition;
    xl.transition = null;
    try {
      ln(gr), Vd(e, t, n, a);
    } finally {
      ln(r), xl.transition = i;
    }
  }
  function Vd(e, t, n, a) {
    Md && l0(e, t, n, a);
  }
  function l0(e, t, n, a) {
    var r = Ad(e, t, n, a);
    if (r === null) {
      Wd(e, t, a, Au, n), Kv(e, a);
      return;
    }
    if (ZS(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if (Kv(e, a), t & Co && XS(e)) {
      for (; r !== null; ) {
        var i = qr(r);
        i !== null && YS(i);
        var l = Ad(e, t, n, a);
        if (l === null && Wd(e, t, a, Au, n), l === r)
          break;
        r = l;
      }
      r !== null && a.stopPropagation();
      return;
    }
    Wd(e, t, a, null, n);
  }
  var Au = null;
  function Ad(e, t, n, a) {
    Au = null;
    var r = Pf(a), i = Li(r);
    if (i !== null) {
      var l = Ti(i);
      if (l === null)
        i = null;
      else {
        var s = l.tag;
        if (s === le) {
          var c = Nv(l);
          if (c !== null)
            return c;
          i = null;
        } else if (s === E) {
          var h = l.stateNode;
          if (Ou(h))
            return Ev(l);
          i = null;
        } else l !== i && (i = null);
      }
    }
    return Au = i, null;
  }
  function Zv(e) {
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
        return Zn;
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
        var t = Xx();
        switch (t) {
          case Su:
            return Zn;
          case td:
            return gr;
          case ji:
          case Jx:
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
  function ea(e) {
    function t(n, a, r, i, l) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = i, this.target = l, this.currentTarget = null;
      for (var s in e)
        if (e.hasOwnProperty(s)) {
          var c = e[s];
          c ? this[s] = c(i) : this[s] = i[s];
        }
      var h = i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1;
      return h ? this.isDefaultPrevented = ku : this.isDefaultPrevented = ng, this.isPropagationStopped = ng, this;
    }
    return Be(t.prototype, {
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
  var Sl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, kd = ea(Sl), Go = Be({}, Sl, {
    view: 0,
    detail: 0
  }), p0 = ea(Go), Ud, Fd, Wo;
  function m0(e) {
    e !== Wo && (Wo && e.type === "mousemove" ? (Ud = e.screenX - Wo.screenX, Fd = e.screenY - Wo.screenY) : (Ud = 0, Fd = 0), Wo = e);
  }
  var Uu = Be({}, Go, {
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
  }), ag = ea(Uu), h0 = Be({}, Uu, {
    dataTransfer: 0
  }), v0 = ea(h0), g0 = Be({}, Go, {
    relatedTarget: 0
  }), zd = ea(g0), y0 = Be({}, Sl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), b0 = ea(y0), N0 = Be({}, Sl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), E0 = ea(N0), x0 = Be({}, Sl, {
    data: 0
  }), rg = ea(x0), S0 = rg, R0 = {
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
  var w0 = Be({}, Go, {
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
  }), _0 = ea(w0), O0 = Be({}, Uu, {
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
  }), ig = ea(O0), M0 = Be({}, Go, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Pd
  }), V0 = ea(M0), A0 = Be({}, Sl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), L0 = ea(A0), k0 = Be({}, Uu, {
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
  }), U0 = ea(k0), F0 = [9, 13, 27, 32], lg = 229, Hd = $t && "CompositionEvent" in window, Ko = null;
  $t && "documentMode" in document && (Ko = document.documentMode);
  var z0 = $t && "TextEvent" in window && !Ko, og = $t && (!Hd || Ko && Ko > 8 && Ko <= 11), sg = 32, ug = String.fromCharCode(sg);
  function P0() {
    Ht("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Ht("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Ht("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Ht("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
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
      var c = new rg(i, t, null, a, r);
      if (e.push({
        event: c,
        listeners: s
      }), l)
        c.data = l;
      else {
        var h = dg(a);
        h !== null && (c.data = h);
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
      var s = new S0("onBeforeInput", "beforeinput", null, a, r);
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
    if (!$t)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function X0() {
    Ht("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function hg(e, t, n, a) {
    fv(a);
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
    hg(t, Xo, e, Pf(e)), hv(eR, t);
  }
  function eR(e) {
    Vg(e, 0);
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
  var vg = !1;
  $t && (vg = Q0("input") && (!document.documentMode || document.documentMode > 9));
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
    !t || !t.controlled || e.type !== "number" || Te(e, "number", e.value);
  }
  function uR(e, t, n, a, r, i, l) {
    var s = n ? _l(n) : window, c, h;
    if (J0(s) ? c = tR : mg(s) ? vg ? c = oR : (c = rR, h = aR) : iR(s) && (c = lR), c) {
      var v = c(t, n);
      if (v) {
        hg(e, v, a, r);
        return;
      }
    }
    h && h(t, s, n), t === "focusout" && sR(s);
  }
  function cR() {
    Bt("onMouseEnter", ["mouseout", "mouseover"]), Bt("onMouseLeave", ["mouseout", "mouseover"]), Bt("onPointerEnter", ["pointerout", "pointerover"]), Bt("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function fR(e, t, n, a, r, i, l) {
    var s = t === "mouseover" || t === "pointerover", c = t === "mouseout" || t === "pointerout";
    if (s && !wx(a)) {
      var h = a.relatedTarget || a.fromElement;
      if (h && (Li(h) || ds(h)))
        return;
    }
    if (!(!c && !s)) {
      var v;
      if (r.window === r)
        v = r;
      else {
        var D = r.ownerDocument;
        D ? v = D.defaultView || D.parentWindow : v = window;
      }
      var C, M;
      if (c) {
        var A = a.relatedTarget || a.toElement;
        if (C = n, M = A ? Li(A) : null, M !== null) {
          var z = Ti(M);
          (M !== z || M.tag !== U && M.tag !== B) && (M = null);
        }
      } else
        C = null, M = n;
      if (C !== M) {
        var de = ag, Re = "onMouseLeave", Ee = "onMouseEnter", Ke = "mouse";
        (t === "pointerout" || t === "pointerover") && (de = ig, Re = "onPointerLeave", Ee = "onPointerEnter", Ke = "pointer");
        var Ie = C == null ? v : _l(C), j = M == null ? v : _l(M), P = new de(Re, Ke + "leave", C, a, r);
        P.target = Ie, P.relatedTarget = j;
        var w = null, J = Li(r);
        if (J === n) {
          var ge = new de(Ee, Ke + "enter", M, a, r);
          ge.target = j, ge.relatedTarget = Ie, w = ge;
        }
        LR(e, P, w, C, M);
      }
    }
  }
  function dR(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var ta = typeof Object.is == "function" ? Object.is : dR;
  function Jo(e, t) {
    if (ta(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length)
      return !1;
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      if (!bn.call(t, i) || !ta(e[i], t[i]))
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
    return hR(e, r, i, l, s);
  }
  function hR(e, t, n, a, r) {
    var i = 0, l = -1, s = -1, c = 0, h = 0, v = e, D = null;
    e: for (; ; ) {
      for (var C = null; v === t && (n === 0 || v.nodeType === fr) && (l = i + n), v === a && (r === 0 || v.nodeType === fr) && (s = i + r), v.nodeType === fr && (i += v.nodeValue.length), (C = v.firstChild) !== null; )
        D = v, v = C;
      for (; ; ) {
        if (v === e)
          break e;
        if (D === t && ++c === n && (l = i), D === a && ++h === r && (s = i), (C = v.nextSibling) !== null)
          break;
        v = D, D = v.parentNode;
      }
      v = C;
    }
    return l === -1 || s === -1 ? null : {
      start: l,
      end: s
    };
  }
  function vR(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, l = Math.min(t.start, i), s = t.end === void 0 ? l : Math.min(t.end, i);
      if (!r.extend && l > s) {
        var c = s;
        s = l, l = c;
      }
      var h = Ng(e, l), v = Ng(e, s);
      if (h && v) {
        if (r.rangeCount === 1 && r.anchorNode === h.node && r.anchorOffset === h.offset && r.focusNode === v.node && r.focusOffset === v.offset)
          return;
        var D = n.createRange();
        D.setStart(h.node, h.offset), r.removeAllRanges(), l > s ? (r.addRange(D), r.extend(v.node, v.offset)) : (D.setEnd(v.node, v.offset), r.addRange(D));
      }
    }
  }
  function Eg(e) {
    return e && e.nodeType === fr;
  }
  function xg(e, t) {
    return !e || !t ? !1 : e === t ? !0 : Eg(e) ? !1 : Eg(t) ? xg(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function gR(e) {
    return e && e.ownerDocument && xg(e.ownerDocument.documentElement, e);
  }
  function yR(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function Sg() {
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
    var e = Sg();
    return {
      focusedElem: e,
      selectionRange: Bd(e) ? ER(e) : null
    };
  }
  function NR(e) {
    var t = Sg(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && gR(n)) {
      a !== null && Bd(n) && xR(n, a);
      for (var r = [], i = n; i = i.parentNode; )
        i.nodeType === In && r.push({
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
  function xR(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : vR(e, t);
  }
  var SR = $t && "documentMode" in document && document.documentMode <= 11;
  function RR() {
    Ht("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
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
        if (SR)
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
  $t && (Cg = document.createElement("div").style, "AnimationEvent" in window || (delete Dl.animationend.animation, delete Dl.animationiteration.animation, delete Dl.animationstart.animation), "TransitionEvent" in window || delete Dl.transitionend.transition);
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
    _g.set(e, t), Ht(t, [e]);
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
      var c = kd, h = t;
      switch (t) {
        case "keypress":
          if (Lu(a) === 0)
            return;
        case "keydown":
        case "keyup":
          c = _0;
          break;
        case "focusin":
          h = "focus", c = zd;
          break;
        case "focusout":
          h = "blur", c = zd;
          break;
        case "beforeblur":
        case "afterblur":
          c = zd;
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
          c = ag;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          c = v0;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          c = V0;
          break;
        case Dg:
        case Tg:
        case jg:
          c = b0;
          break;
        case wg:
          c = L0;
          break;
        case "scroll":
          c = p0;
          break;
        case "wheel":
          c = U0;
          break;
        case "copy":
        case "cut":
        case "paste":
          c = E0;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          c = ig;
          break;
      }
      var v = (i & Co) !== 0;
      {
        var D = !v && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", C = VR(n, s, a.type, v, D);
        if (C.length > 0) {
          var M = new c(s, h, null, a, r);
          e.push({
            event: M,
            listeners: C
          });
        }
      }
    }
  }
  jR(), cR(), X0(), RR(), P0();
  function _R(e, t, n, a, r, i, l) {
    wR(e, t, n, a, r, i);
    var s = (i & Dx) === 0;
    s && (fR(e, t, n, a, r), uR(e, t, n, a, r), TR(e, t, n, a, r), W0(e, t, n, a, r));
  }
  var es = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], qd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(es));
  function Mg(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, Fx(a, t, void 0, e), e.currentTarget = null;
  }
  function OR(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, s = i.currentTarget, c = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        Mg(e, c, s), a = l;
      }
    else
      for (var h = 0; h < t.length; h++) {
        var v = t[h], D = v.instance, C = v.currentTarget, M = v.listener;
        if (D !== a && e.isPropagationStopped())
          return;
        Mg(e, M, C), a = D;
      }
  }
  function Vg(e, t) {
    for (var n = (t & Co) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      OR(i, l, n);
    }
    zx();
  }
  function MR(e, t, n, a, r) {
    var i = Pf(n), l = [];
    _R(l, e, a, n, i, t), Vg(l, t);
  }
  function yt(e, t) {
    qd.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = sD(t), r = kR(e);
    a.has(r) || (Ag(t, e, zf, n), a.add(r));
  }
  function Gd(e, t, n) {
    qd.has(e) && !t && f('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= Co), Ag(n, e, a, t);
  }
  var Hu = "_reactListening" + Math.random().toString(36).slice(2);
  function ts(e) {
    if (!e[Hu]) {
      e[Hu] = !0, Pt.forEach(function(n) {
        n !== "selectionchange" && (qd.has(n) || Gd(n, !1, e), Gd(n, !0, e));
      });
      var t = e.nodeType === dr ? e : e.ownerDocument;
      t !== null && (t[Hu] || (t[Hu] = !0, Gd("selectionchange", !1, t)));
    }
  }
  function Ag(e, t, n, a, r) {
    var i = a0(e, t, n), l = void 0;
    $f && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? u0(e, t, i, l) : s0(e, t, i) : l !== void 0 ? c0(e, t, i, l) : o0(e, t, i);
  }
  function Lg(e, t) {
    return e === t || e.nodeType === kt && e.parentNode === t;
  }
  function Wd(e, t, n, a, r) {
    var i = a;
    if (!(t & uv) && !(t & zf)) {
      var l = r;
      if (a !== null) {
        var s = a;
        e: for (; ; ) {
          if (s === null)
            return;
          var c = s.tag;
          if (c === E || c === L) {
            var h = s.stateNode.containerInfo;
            if (Lg(h, l))
              break;
            if (c === L)
              for (var v = s.return; v !== null; ) {
                var D = v.tag;
                if (D === E || D === L) {
                  var C = v.stateNode.containerInfo;
                  if (Lg(C, l))
                    return;
                }
                v = v.return;
              }
            for (; h !== null; ) {
              var M = Li(h);
              if (M === null)
                return;
              var A = M.tag;
              if (A === U || A === B) {
                s = i = M;
                continue e;
              }
              h = h.parentNode;
            }
          }
          s = s.return;
        }
      }
    }
    hv(function() {
      return MR(e, t, n, i);
    });
  }
  function ns(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function VR(e, t, n, a, r, i) {
    for (var l = t !== null ? t + "Capture" : null, s = a ? l : t, c = [], h = e, v = null; h !== null; ) {
      var D = h, C = D.stateNode, M = D.tag;
      if (M === U && C !== null && (v = C, s !== null)) {
        var A = To(h, s);
        A != null && c.push(ns(h, A, v));
      }
      if (r)
        break;
      h = h.return;
    }
    return c;
  }
  function Bu(e, t) {
    for (var n = t + "Capture", a = [], r = e; r !== null; ) {
      var i = r, l = i.stateNode, s = i.tag;
      if (s === U && l !== null) {
        var c = l, h = To(r, n);
        h != null && a.unshift(ns(r, h, c));
        var v = To(r, t);
        v != null && a.push(ns(r, v, c));
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
  function AR(e, t) {
    for (var n = e, a = t, r = 0, i = n; i; i = Tl(i))
      r++;
    for (var l = 0, s = a; s; s = Tl(s))
      l++;
    for (; r - l > 0; )
      n = Tl(n), r--;
    for (; l - r > 0; )
      a = Tl(a), l--;
    for (var c = r; c--; ) {
      if (n === a || a !== null && n === a.alternate)
        return n;
      n = Tl(n), a = Tl(a);
    }
    return null;
  }
  function kg(e, t, n, a, r) {
    for (var i = t._reactName, l = [], s = n; s !== null && s !== a; ) {
      var c = s, h = c.alternate, v = c.stateNode, D = c.tag;
      if (h !== null && h === a)
        break;
      if (D === U && v !== null) {
        var C = v;
        if (r) {
          var M = To(s, i);
          M != null && l.unshift(ns(s, M, C));
        } else if (!r) {
          var A = To(s, i);
          A != null && l.push(ns(s, A, C));
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
    var i = a && r ? AR(a, r) : null;
    a !== null && kg(e, t, a, i, !1), r !== null && n !== null && kg(e, n, r, i, !0);
  }
  function kR(e, t) {
    return e + "__bubble";
  }
  var Yn = !1, as = "dangerouslySetInnerHTML", $u = "suppressContentEditableWarning", Yr = "suppressHydrationWarning", Ug = "autoFocus", Vi = "children", Ai = "style", Iu = "__html", Kd, Yu, rs, Fg, qu, zg, Pg;
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
    bx(e, t), Nx(e, t), Cx(e, t, {
      registrationNameDependencies: st,
      possibleRegistrationNames: on
    });
  }, zg = $t && !document.documentMode, rs = function(e, t, n) {
    if (!Yn) {
      var a = Gu(n), r = Gu(t);
      r !== a && (Yn = !0, f("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Fg = function(e) {
    if (!Yn) {
      Yn = !0;
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
    Bn(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(UR, `
`).replace(FR, "");
  }
  function Wu(e, t, n, a) {
    var r = Gu(t), i = Gu(e);
    if (i !== r && (a && (Yn || (Yn = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && te))
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
        if (i === Ai)
          l && Object.freeze(l), av(t, l);
        else if (i === as) {
          var s = l ? l[Iu] : void 0;
          s != null && Jh(t, s);
        } else if (i === Vi)
          if (typeof l == "string") {
            var c = e !== "textarea" || l !== "";
            c && yu(t, l);
          } else typeof l == "number" && yu(t, "" + l);
        else i === $u || i === Yr || i === Ug || (st.hasOwnProperty(i) ? l != null && (typeof l != "function" && qu(i, l), i === "onScroll" && yt("scroll", t)) : l != null && Ea(t, i, l, r));
      }
  }
  function HR(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Ai ? av(e, l) : i === as ? Jh(e, l) : i === Vi ? yu(e, l) : Ea(e, i, l, a);
    }
  }
  function BR(e, t, n, a) {
    var r, i = Hg(n), l, s = a;
    if (s === cr && (s = Vf(e)), s === cr) {
      if (r = xi(e, t), !r && e !== e.toLowerCase() && f("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
        var c = i.createElement("div");
        c.innerHTML = "<script><\/script>";
        var h = c.firstChild;
        l = c.removeChild(h);
      } else if (typeof t.is == "string")
        l = i.createElement(e, {
          is: t.is
        });
      else if (l = i.createElement(e), e === "select") {
        var v = l;
        t.multiple ? v.multiple = !0 : t.size && (v.size = t.size);
      }
    } else
      l = i.createElementNS(s, e);
    return s === cr && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !bn.call(Kd, e) && (Kd[e] = !0, f("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function $R(e, t) {
    return Hg(t).createTextNode(e);
  }
  function IR(e, t, n, a) {
    var r = xi(t, n);
    Yu(t, n);
    var i;
    switch (t) {
      case "dialog":
        yt("cancel", e), yt("close", e), i = n;
        break;
      case "iframe":
      case "object":
      case "embed":
        yt("load", e), i = n;
        break;
      case "video":
      case "audio":
        for (var l = 0; l < es.length; l++)
          yt(es[l], e);
        i = n;
        break;
      case "source":
        yt("error", e), i = n;
        break;
      case "img":
      case "image":
      case "link":
        yt("error", e), yt("load", e), i = n;
        break;
      case "details":
        yt("toggle", e), i = n;
        break;
      case "input":
        hu(e, n), i = No(e, n), yt("invalid", e);
        break;
      case "option":
        rt(e, n), i = n;
        break;
      case "select":
        So(e, n), i = xo(e, n), yt("invalid", e);
        break;
      case "textarea":
        Kh(e, n), i = Of(e, n), yt("invalid", e);
        break;
      default:
        i = n;
    }
    switch (Ff(t, i), PR(t, e, a, i, r), t) {
      case "input":
        Ni(e), V(e, n, !1);
        break;
      case "textarea":
        Ni(e), Xh(e);
        break;
      case "option":
        dt(e, n);
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
        l = xo(e, n), s = xo(e, a), i = [];
        break;
      case "textarea":
        l = Of(e, n), s = Of(e, a), i = [];
        break;
      default:
        l = n, s = a, typeof l.onClick != "function" && typeof s.onClick == "function" && Ku(e);
        break;
    }
    Ff(t, s);
    var c, h, v = null;
    for (c in l)
      if (!(s.hasOwnProperty(c) || !l.hasOwnProperty(c) || l[c] == null))
        if (c === Ai) {
          var D = l[c];
          for (h in D)
            D.hasOwnProperty(h) && (v || (v = {}), v[h] = "");
        } else c === as || c === Vi || c === $u || c === Yr || c === Ug || (st.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in s) {
      var C = s[c], M = l != null ? l[c] : void 0;
      if (!(!s.hasOwnProperty(c) || C === M || C == null && M == null))
        if (c === Ai)
          if (C && Object.freeze(C), M) {
            for (h in M)
              M.hasOwnProperty(h) && (!C || !C.hasOwnProperty(h)) && (v || (v = {}), v[h] = "");
            for (h in C)
              C.hasOwnProperty(h) && M[h] !== C[h] && (v || (v = {}), v[h] = C[h]);
          } else
            v || (i || (i = []), i.push(c, v)), v = C;
        else if (c === as) {
          var A = C ? C[Iu] : void 0, z = M ? M[Iu] : void 0;
          A != null && z !== A && (i = i || []).push(c, A);
        } else c === Vi ? (typeof C == "string" || typeof C == "number") && (i = i || []).push(c, "" + C) : c === $u || c === Yr || (st.hasOwnProperty(c) ? (C != null && (typeof C != "function" && qu(c, C), c === "onScroll" && yt("scroll", e)), !i && M !== C && (i = [])) : (i = i || []).push(c, C));
    }
    return v && (fx(v, s[Ai]), (i = i || []).push(Ai, v)), i;
  }
  function qR(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && p(e, r);
    var i = xi(n, a), l = xi(n, r);
    switch (HR(e, t, i, l), n) {
      case "input":
        b(e, r);
        break;
      case "textarea":
        Qh(e, r);
        break;
      case "select":
        vu(e, r);
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
    var s, c;
    switch (s = xi(t, n), Yu(t, n), t) {
      case "dialog":
        yt("cancel", e), yt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        yt("load", e);
        break;
      case "video":
      case "audio":
        for (var h = 0; h < es.length; h++)
          yt(es[h], e);
        break;
      case "source":
        yt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        yt("error", e), yt("load", e);
        break;
      case "details":
        yt("toggle", e);
        break;
      case "input":
        hu(e, n), yt("invalid", e);
        break;
      case "option":
        rt(e, n);
        break;
      case "select":
        So(e, n), yt("invalid", e);
        break;
      case "textarea":
        Kh(e, n), yt("invalid", e);
        break;
    }
    Ff(t, n);
    {
      c = /* @__PURE__ */ new Set();
      for (var v = e.attributes, D = 0; D < v.length; D++) {
        var C = v[D].name.toLowerCase();
        switch (C) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            c.add(v[D].name);
        }
      }
    }
    var M = null;
    for (var A in n)
      if (n.hasOwnProperty(A)) {
        var z = n[A];
        if (A === Vi)
          typeof z == "string" ? e.textContent !== z && (n[Yr] !== !0 && Wu(e.textContent, z, i, l), M = [Vi, z]) : typeof z == "number" && e.textContent !== "" + z && (n[Yr] !== !0 && Wu(e.textContent, z, i, l), M = [Vi, "" + z]);
        else if (st.hasOwnProperty(A))
          z != null && (typeof z != "function" && qu(A, z), A === "onScroll" && yt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof s == "boolean") {
          var de = void 0, Re = Dt(A);
          if (n[Yr] !== !0) {
            if (!(A === $u || A === Yr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            A === "value" || A === "checked" || A === "selected")) {
              if (A === as) {
                var Ee = e.innerHTML, Ke = z ? z[Iu] : void 0;
                if (Ke != null) {
                  var Ie = Pg(e, Ke);
                  Ie !== Ee && rs(A, Ee, Ie);
                }
              } else if (A === Ai) {
                if (c.delete(A), zg) {
                  var j = ux(z);
                  de = e.getAttribute("style"), j !== de && rs(A, de, j);
                }
              } else if (s && !Me)
                c.delete(A.toLowerCase()), de = di(e, A, z), z !== de && rs(A, de, z);
              else if (!St(A, Re, s) && !En(A, z, Re, s)) {
                var P = !1;
                if (Re !== null)
                  c.delete(Re.attributeName), de = Zi(e, A, z, Re);
                else {
                  var w = a;
                  if (w === cr && (w = Vf(t)), w === cr)
                    c.delete(A.toLowerCase());
                  else {
                    var J = GR(A);
                    J !== null && J !== A && (P = !0, c.delete(J)), c.delete(A);
                  }
                  de = di(e, A, z);
                }
                var ge = Me;
                !ge && z !== de && !P && rs(A, de, z);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    c.size > 0 && n[Yr] !== !0 && Fg(c), t) {
      case "input":
        Ni(e), V(e, n, !0);
        break;
      case "textarea":
        Ni(e), Xh(e);
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
      if (Yn)
        return;
      Yn = !0, f("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function Xd(e, t) {
    {
      if (Yn)
        return;
      Yn = !0, f('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function Jd(e, t, n) {
    {
      if (Yn)
        return;
      Yn = !0, f("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Zd(e, t) {
    {
      if (t === "" || Yn)
        return;
      Yn = !0, f('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function QR(e, t, n) {
    switch (t) {
      case "input":
        F(e, n);
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
      var n = Be({}, e || $g), a = {
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
        var c = s.tag, h = !!i + "|" + e + "|" + c;
        if (!Ig[h]) {
          Ig[h] = !0;
          var v = e, D = "";
          if (e === "#text" ? /\S/.test(t) ? v = "Text nodes" : (v = "Whitespace text nodes", D = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : v = "<" + e + ">", i) {
            var C = "";
            c === "table" && e === "tr" && (C += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), f("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", v, c, D, C);
          } else
            f("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", v, c);
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
        n = r ? r.namespaceURI : Af(null, "");
        break;
      }
      default: {
        var i = a === kt ? e.parentNode : e, l = i.namespaceURI || null;
        t = i.tagName, n = Af(l, t);
        break;
      }
    }
    {
      var s = t.toLowerCase(), c = ls(null, s);
      return {
        namespace: n,
        ancestorInfo: c
      };
    }
  }
  function rC(e, t, n) {
    {
      var a = e, r = Af(a.namespace, t), i = ls(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function tO(e) {
    return e;
  }
  function iC(e) {
    ep = n0(), tp = bR();
    var t = null;
    return Jv(!1), t;
  }
  function lC(e) {
    NR(tp), Jv(ep), ep = null, tp = null;
  }
  function oC(e, t, n, a, r) {
    var i;
    {
      var l = a;
      if (is(e, null, l.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var s = "" + t.children, c = ls(l.ancestorInfo, e);
        is(null, s, c);
      }
      i = l.namespace;
    }
    var h = BR(e, t, n, i);
    return fs(r, h), up(h, t), h;
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
        var s = "" + a.children, c = ls(l.ancestorInfo, t);
        is(null, s, c);
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
    return e === void 0 ? yr : Zv(e.type);
  }
  var ap = typeof setTimeout == "function" ? setTimeout : void 0, pC = typeof clearTimeout == "function" ? clearTimeout : void 0, rp = -1, Yg = typeof Promise == "function" ? Promise : void 0, mC = typeof queueMicrotask == "function" ? queueMicrotask : typeof Yg < "u" ? function(e) {
    return Yg.resolve(null).then(e).catch(hC);
  } : ap;
  function hC(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function vC(e, t, n, a) {
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
    e.nodeType === kt ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && Ku(n);
  }
  function EC(e, t, n) {
    e.insertBefore(t, n);
  }
  function xC(e, t, n) {
    e.nodeType === kt ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function SC(e, t) {
    e.removeChild(t);
  }
  function RC(e, t) {
    e.nodeType === kt ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function ip(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === kt) {
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
    e.nodeType === kt ? ip(e.parentNode, t) : e.nodeType === In && ip(e, t), Io(e);
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
    e.nodeType === In ? e.textContent = "" : e.nodeType === dr && e.documentElement && e.removeChild(e.documentElement);
  }
  function OC(e, t, n) {
    return e.nodeType !== In || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function MC(e, t) {
    return t === "" || e.nodeType !== fr ? null : e;
  }
  function VC(e) {
    return e.nodeType !== kt ? null : e;
  }
  function Gg(e) {
    return e.data === os;
  }
  function lp(e) {
    return e.data === ss;
  }
  function AC(e) {
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
      if (t === In || t === fr)
        break;
      if (t === kt) {
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
      var c = r;
      s = c.namespace;
    }
    var h = (i.mode & Ge) !== De;
    return WR(e, t, n, s, a, h, l);
  }
  function PC(e, t, n, a) {
    return fs(n, e), n.mode & Ge, KR(e, t);
  }
  function HC(e, t) {
    fs(t, e);
  }
  function BC(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === kt) {
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
      if (t.nodeType === kt) {
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
    t.nodeType === In ? Qd(e, t) : t.nodeType === kt || Xd(e, t);
  }
  function KC(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === In ? Qd(n, t) : t.nodeType === kt || Xd(n, t));
    }
  }
  function QC(e, t, n, a, r) {
    (r || t[Qu] !== !0) && (a.nodeType === In ? Qd(n, a) : a.nodeType === kt || Xd(n, a));
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
    return t && (t.tag === U || t.tag === B || t.tag === le || t.tag === E) ? t : null;
  }
  function _l(e) {
    if (e.tag === U || e.tag === B)
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
  function Ta(e, t, n, a, r) {
    {
      var i = Function.call.bind(bn);
      for (var l in e)
        if (i(e, l)) {
          var s = void 0;
          try {
            if (typeof e[l] != "function") {
              var c = Error((a || "React class") + ": " + n + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw c.name = "Invariant Violation", c;
            }
            s = e[l](t, l, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (h) {
            s = h;
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
  function Rn(e, t) {
    if (br < 0) {
      f("Unexpected pop.");
      return;
    }
    t !== ac[br] && f("Unexpected Fiber popped."), e.current = cp[br], cp[br] = null, ac[br] = null, br--;
  }
  function Cn(e, t, n) {
    br++, cp[br] = e.current, ac[br] = n, e.current = t;
  }
  var fp;
  fp = {};
  var na = {};
  Object.freeze(na);
  var Nr = Gr(na), Wa = Gr(!1), dp = na;
  function Ol(e, t, n) {
    return n && Ka(t) ? dp : Nr.current;
  }
  function Jg(e, t, n) {
    {
      var a = e.stateNode;
      a.__reactInternalMemoizedUnmaskedChildContext = t, a.__reactInternalMemoizedMaskedChildContext = n;
    }
  }
  function Ml(e, t) {
    {
      var n = e.type, a = n.contextTypes;
      if (!a)
        return na;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {};
      for (var l in a)
        i[l] = t[l];
      {
        var s = Fe(e) || "Unknown";
        Ta(a, i, "context", s);
      }
      return r && Jg(e, t, i), i;
    }
  }
  function rc() {
    return Wa.current;
  }
  function Ka(e) {
    {
      var t = e.childContextTypes;
      return t != null;
    }
  }
  function ic(e) {
    Rn(Wa, e), Rn(Nr, e);
  }
  function pp(e) {
    Rn(Wa, e), Rn(Nr, e);
  }
  function Zg(e, t, n) {
    {
      if (Nr.current !== na)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      Cn(Nr, t, e), Cn(Wa, n, e);
    }
  }
  function ey(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = Fe(e) || "Unknown";
          fp[i] || (fp[i] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var s in l)
        if (!(s in r))
          throw new Error((Fe(e) || "Unknown") + '.getChildContext(): key "' + s + '" is not defined in childContextTypes.');
      {
        var c = Fe(e) || "Unknown";
        Ta(r, l, "child context", c);
      }
      return Be({}, n, l);
    }
  }
  function lc(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || na;
      return dp = Nr.current, Cn(Nr, n, e), Cn(Wa, Wa.current, e), !0;
    }
  }
  function ty(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = ey(e, t, dp);
        a.__reactInternalMemoizedMergedChildContext = r, Rn(Wa, e), Rn(Nr, e), Cn(Nr, r, e), Cn(Wa, n, e);
      } else
        Rn(Wa, e), Cn(Wa, n, e);
    }
  }
  function uD(e) {
    {
      if (!Yx(e) || e.tag !== T)
        throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
      var t = e;
      do {
        switch (t.tag) {
          case E:
            return t.stateNode.context;
          case T: {
            var n = t.type;
            if (Ka(n))
              return t.stateNode.__reactInternalMemoizedMergedChildContext;
            break;
          }
        }
        t = t.return;
      } while (t !== null);
      throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  var Wr = 0, oc = 1, Er = null, mp = !1, hp = !1;
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
    if (!hp && Er !== null) {
      hp = !0;
      var e = 0, t = Da();
      try {
        var n = !0, a = Er;
        for (ln(Zn); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        Er = null, mp = !1;
      } catch (i) {
        throw Er !== null && (Er = Er.slice(e + 1)), Tv(Su, Kr), i;
      } finally {
        ln(t), hp = !1;
      }
    }
    return null;
  }
  var Vl = [], Al = 0, sc = null, uc = 0, ca = [], fa = 0, ki = null, xr = 1, Sr = "";
  function fD(e) {
    return Fi(), (e.flags & bv) !== we;
  }
  function dD(e) {
    return Fi(), uc;
  }
  function pD() {
    var e = Sr, t = xr, n = t & ~mD(t);
    return n.toString(32) + e;
  }
  function Ui(e, t) {
    Fi(), Vl[Al++] = uc, Vl[Al++] = sc, sc = e, uc = t;
  }
  function ry(e, t, n) {
    Fi(), ca[fa++] = xr, ca[fa++] = Sr, ca[fa++] = ki, ki = e;
    var a = xr, r = Sr, i = cc(a) - 1, l = a & ~(1 << i), s = n + 1, c = cc(t) + i;
    if (c > 30) {
      var h = i - i % 5, v = (1 << h) - 1, D = (l & v).toString(32), C = l >> h, M = i - h, A = cc(t) + M, z = s << M, de = z | C, Re = D + r;
      xr = 1 << A | de, Sr = Re;
    } else {
      var Ee = s << i, Ke = Ee | l, Ie = r;
      xr = 1 << c | Ke, Sr = Ie;
    }
  }
  function vp(e) {
    Fi();
    var t = e.return;
    if (t !== null) {
      var n = 1, a = 0;
      Ui(e, n), ry(e, n, a);
    }
  }
  function cc(e) {
    return 32 - Vv(e);
  }
  function mD(e) {
    return 1 << cc(e) - 1;
  }
  function gp(e) {
    for (; e === sc; )
      sc = Vl[--Al], Vl[Al] = null, uc = Vl[--Al], Vl[Al] = null;
    for (; e === ki; )
      ki = ca[--fa], ca[fa] = null, Sr = ca[--fa], ca[fa] = null, xr = ca[--fa], ca[fa] = null;
  }
  function hD() {
    return Fi(), ki !== null ? {
      id: xr,
      overflow: Sr
    } : null;
  }
  function vD(e, t) {
    Fi(), ca[fa++] = xr, ca[fa++] = Sr, ca[fa++] = ki, xr = t.id, Sr = t.overflow, ki = e;
  }
  function Fi() {
    fn() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var cn = null, da = null, ja = !1, zi = !1, Qr = null;
  function gD() {
    ja && f("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function iy() {
    zi = !0;
  }
  function yD() {
    return zi;
  }
  function bD(e) {
    var t = e.stateNode.containerInfo;
    return da = UC(t), cn = e, ja = !0, Qr = null, zi = !1, !0;
  }
  function ND(e, t, n) {
    return da = FC(t), cn = e, ja = !0, Qr = null, zi = !1, n !== null && vD(e, n), !0;
  }
  function ly(e, t) {
    switch (e.tag) {
      case E: {
        WC(e.stateNode.containerInfo, t);
        break;
      }
      case U: {
        var n = (e.mode & Ge) !== De;
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
      case le: {
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
    a === null ? (e.deletions = [n], e.flags |= Si) : a.push(n);
  }
  function yp(e, t) {
    {
      if (zi)
        return;
      switch (e.tag) {
        case E: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case U:
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
        case U: {
          var i = e.type, l = e.memoizedProps, s = e.stateNode;
          switch (t.tag) {
            case U: {
              var c = t.type, h = t.pendingProps, v = (e.mode & Ge) !== De;
              tD(
                i,
                l,
                s,
                c,
                h,
                // TODO: Delete this argument when we remove the legacy root API.
                v
              );
              break;
            }
            case B: {
              var D = t.pendingProps, C = (e.mode & Ge) !== De;
              nD(
                i,
                l,
                s,
                D,
                // TODO: Delete this argument when we remove the legacy root API.
                C
              );
              break;
            }
          }
          break;
        }
        case le: {
          var M = e.memoizedState, A = M.dehydrated;
          if (A !== null) switch (t.tag) {
            case U:
              var z = t.type;
              t.pendingProps, ZC(A, z);
              break;
            case B:
              var de = t.pendingProps;
              eD(A, de);
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
    t.flags = t.flags & ~mr | Ut, yp(e, t);
  }
  function uy(e, t) {
    switch (e.tag) {
      case U: {
        var n = e.type;
        e.pendingProps;
        var a = OC(t, n);
        return a !== null ? (e.stateNode = a, cn = e, da = kC(a), !0) : !1;
      }
      case B: {
        var r = e.pendingProps, i = MC(t, r);
        return i !== null ? (e.stateNode = i, cn = e, da = null, !0) : !1;
      }
      case le: {
        var l = VC(t);
        if (l !== null) {
          var s = {
            dehydrated: l,
            treeContext: hD(),
            retryLane: Xn
          };
          e.memoizedState = s;
          var c = C1(l);
          return c.return = e, e.child = c, cn = e, da = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function bp(e) {
    return (e.mode & Ge) !== De && (e.flags & tt) === we;
  }
  function Np(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function Ep(e) {
    if (ja) {
      var t = da;
      if (!t) {
        bp(e) && (yp(cn, e), Np()), sy(cn, e), ja = !1, cn = e;
        return;
      }
      var n = t;
      if (!uy(e, t)) {
        bp(e) && (yp(cn, e), Np()), t = us(n);
        var a = cn;
        if (!t || !uy(e, t)) {
          sy(cn, e), ja = !1, cn = e;
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
  function xD(e) {
    var t = e.stateNode, n = e.memoizedProps, a = PC(t, n, e);
    if (a) {
      var r = cn;
      if (r !== null)
        switch (r.tag) {
          case E: {
            var i = r.stateNode.containerInfo, l = (r.mode & Ge) !== De;
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
            var s = r.type, c = r.memoizedProps, h = r.stateNode, v = (r.mode & Ge) !== De;
            GC(
              s,
              c,
              h,
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
  function SD(e) {
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
    for (var t = e.return; t !== null && t.tag !== U && t.tag !== E && t.tag !== le; )
      t = t.return;
    cn = t;
  }
  function fc(e) {
    if (e !== cn)
      return !1;
    if (!ja)
      return cy(e), ja = !0, !1;
    if (e.tag !== E && (e.tag !== U || YC(e.type) && !np(e.type, e.memoizedProps))) {
      var t = da;
      if (t)
        if (bp(e))
          fy(e), Np();
        else
          for (; t; )
            oy(e, t), t = us(t);
    }
    return cy(e), e.tag === le ? da = RD(e) : da = cn ? us(e.stateNode) : null, !0;
  }
  function CD() {
    return ja && da !== null;
  }
  function fy(e) {
    for (var t = da; t; )
      ly(e, t), t = us(t);
  }
  function Ll() {
    cn = null, da = null, ja = !1, zi = !1;
  }
  function dy() {
    Qr !== null && (iN(Qr), Qr = null);
  }
  function fn() {
    return ja;
  }
  function xp(e) {
    Qr === null ? Qr = [e] : Qr.push(e);
  }
  var DD = m.ReactCurrentBatchConfig, TD = null;
  function jD() {
    return DD.transition;
  }
  var wa = {
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
        n.mode & jt && (t = n), n = n.return;
      return t;
    }, Pi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, ps = [], ms = [], hs = [], vs = [], gs = [], ys = [], Hi = /* @__PURE__ */ new Set();
    wa.recordUnsafeLifecycleWarnings = function(e, t) {
      Hi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && ps.push(e), e.mode & jt && typeof t.UNSAFE_componentWillMount == "function" && ms.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && hs.push(e), e.mode & jt && typeof t.UNSAFE_componentWillReceiveProps == "function" && vs.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && gs.push(e), e.mode & jt && typeof t.UNSAFE_componentWillUpdate == "function" && ys.push(e));
    }, wa.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      ps.length > 0 && (ps.forEach(function(C) {
        e.add(Fe(C) || "Component"), Hi.add(C.type);
      }), ps = []);
      var t = /* @__PURE__ */ new Set();
      ms.length > 0 && (ms.forEach(function(C) {
        t.add(Fe(C) || "Component"), Hi.add(C.type);
      }), ms = []);
      var n = /* @__PURE__ */ new Set();
      hs.length > 0 && (hs.forEach(function(C) {
        n.add(Fe(C) || "Component"), Hi.add(C.type);
      }), hs = []);
      var a = /* @__PURE__ */ new Set();
      vs.length > 0 && (vs.forEach(function(C) {
        a.add(Fe(C) || "Component"), Hi.add(C.type);
      }), vs = []);
      var r = /* @__PURE__ */ new Set();
      gs.length > 0 && (gs.forEach(function(C) {
        r.add(Fe(C) || "Component"), Hi.add(C.type);
      }), gs = []);
      var i = /* @__PURE__ */ new Set();
      if (ys.length > 0 && (ys.forEach(function(C) {
        i.add(Fe(C) || "Component"), Hi.add(C.type);
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
        var c = Pi(i);
        f(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, c);
      }
      if (e.size > 0) {
        var h = Pi(e);
        S(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, h);
      }
      if (n.size > 0) {
        var v = Pi(n);
        S(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, v);
      }
      if (r.size > 0) {
        var D = Pi(r);
        S(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, D);
      }
    };
    var dc = /* @__PURE__ */ new Map(), py = /* @__PURE__ */ new Set();
    wa.recordLegacyContextWarning = function(e, t) {
      var n = wD(e);
      if (n === null) {
        f("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!py.has(e.type)) {
        var a = dc.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], dc.set(n, a)), a.push(e));
      }
    }, wa.flushLegacyContextWarning = function() {
      dc.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add(Fe(i) || "Component"), py.add(i.type);
          });
          var r = Pi(a);
          try {
            bt(n), f(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r);
          } finally {
            tn();
          }
        }
      });
    }, wa.discardPendingWarnings = function() {
      ps = [], ms = [], hs = [], vs = [], gs = [], ys = [], dc = /* @__PURE__ */ new Map();
    };
  }
  var Sp, Rp, Cp, Dp, Tp, my = function(e, t) {
  };
  Sp = !1, Rp = !1, Cp = {}, Dp = {}, Tp = {}, my = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = Fe(t) || "Component";
      Dp[n] || (Dp[n] = !0, f('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function _D(e) {
    return e.prototype && e.prototype.isReactComponent;
  }
  function bs(e, t, n) {
    var a = n.ref;
    if (a !== null && typeof a != "function" && typeof a != "object") {
      if ((e.mode & jt || ut) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(n._owner && n._self && n._owner.stateNode !== n._self) && // Will already throw with "Function components cannot have string refs"
      !(n._owner && n._owner.tag !== T) && // Will already warn with "Function components cannot be given refs"
      !(typeof n.type == "function" && !_D(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = Fe(e) || "Component";
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
        var c = l;
        la(a, "ref");
        var h = "" + a;
        if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === h)
          return t.ref;
        var v = function(D) {
          var C = c.refs;
          D === null ? delete C[h] : C[h] = D;
        };
        return v._stringRef = h, v;
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
      var t = Fe(e) || "Component";
      if (Tp[t])
        return;
      Tp[t] = !0, f("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function hy(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function vy(e) {
    function t(j, P) {
      if (e) {
        var w = j.deletions;
        w === null ? (j.deletions = [P], j.flags |= Si) : w.push(P);
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
      for (var w = /* @__PURE__ */ new Map(), J = P; J !== null; )
        J.key !== null ? w.set(J.key, J) : w.set(J.index, J), J = J.sibling;
      return w;
    }
    function r(j, P) {
      var w = Qi(j, P);
      return w.index = 0, w.sibling = null, w;
    }
    function i(j, P, w) {
      if (j.index = w, !e)
        return j.flags |= bv, P;
      var J = j.alternate;
      if (J !== null) {
        var ge = J.index;
        return ge < P ? (j.flags |= Ut, P) : ge;
      } else
        return j.flags |= Ut, P;
    }
    function l(j) {
      return e && j.alternate === null && (j.flags |= Ut), j;
    }
    function s(j, P, w, J) {
      if (P === null || P.tag !== B) {
        var ge = xh(w, j.mode, J);
        return ge.return = j, ge;
      } else {
        var me = r(P, w);
        return me.return = j, me;
      }
    }
    function c(j, P, w, J) {
      var ge = w.type;
      if (ge === Ba)
        return v(j, P, w.props.children, J, w.key);
      if (P !== null && (P.elementType === ge || // Keep this check inline so it only runs on the false path:
      EN(P, w) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof ge == "object" && ge !== null && ge.$$typeof === Ce && hy(ge) === P.type)) {
        var me = r(P, w.props);
        return me.ref = bs(j, P, w), me.return = j, me._debugSource = w._source, me._debugOwner = w._owner, me;
      }
      var Oe = Eh(w, j.mode, J);
      return Oe.ref = bs(j, P, w), Oe.return = j, Oe;
    }
    function h(j, P, w, J) {
      if (P === null || P.tag !== L || P.stateNode.containerInfo !== w.containerInfo || P.stateNode.implementation !== w.implementation) {
        var ge = Sh(w, j.mode, J);
        return ge.return = j, ge;
      } else {
        var me = r(P, w.children || []);
        return me.return = j, me;
      }
    }
    function v(j, P, w, J, ge) {
      if (P === null || P.tag !== se) {
        var me = oi(w, j.mode, J, ge);
        return me.return = j, me;
      } else {
        var Oe = r(P, w);
        return Oe.return = j, Oe;
      }
    }
    function D(j, P, w) {
      if (typeof P == "string" && P !== "" || typeof P == "number") {
        var J = xh("" + P, j.mode, w);
        return J.return = j, J;
      }
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case sa: {
            var ge = Eh(P, j.mode, w);
            return ge.ref = bs(j, null, P), ge.return = j, ge;
          }
          case Qn: {
            var me = Sh(P, j.mode, w);
            return me.return = j, me;
          }
          case Ce: {
            var Oe = P._payload, Ue = P._init;
            return D(j, Ue(Oe), w);
          }
        }
        if ($e(P) || Sa(P)) {
          var ot = oi(P, j.mode, w, null);
          return ot.return = j, ot;
        }
        pc(j, P);
      }
      return typeof P == "function" && mc(j), null;
    }
    function C(j, P, w, J) {
      var ge = P !== null ? P.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number")
        return ge !== null ? null : s(j, P, "" + w, J);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case sa:
            return w.key === ge ? c(j, P, w, J) : null;
          case Qn:
            return w.key === ge ? h(j, P, w, J) : null;
          case Ce: {
            var me = w._payload, Oe = w._init;
            return C(j, P, Oe(me), J);
          }
        }
        if ($e(w) || Sa(w))
          return ge !== null ? null : v(j, P, w, J, null);
        pc(j, w);
      }
      return typeof w == "function" && mc(j), null;
    }
    function M(j, P, w, J, ge) {
      if (typeof J == "string" && J !== "" || typeof J == "number") {
        var me = j.get(w) || null;
        return s(P, me, "" + J, ge);
      }
      if (typeof J == "object" && J !== null) {
        switch (J.$$typeof) {
          case sa: {
            var Oe = j.get(J.key === null ? w : J.key) || null;
            return c(P, Oe, J, ge);
          }
          case Qn: {
            var Ue = j.get(J.key === null ? w : J.key) || null;
            return h(P, Ue, J, ge);
          }
          case Ce:
            var ot = J._payload, Xe = J._init;
            return M(j, P, w, Xe(ot), ge);
        }
        if ($e(J) || Sa(J)) {
          var Ot = j.get(w) || null;
          return v(P, Ot, J, ge, null);
        }
        pc(P, J);
      }
      return typeof J == "function" && mc(P), null;
    }
    function A(j, P, w) {
      {
        if (typeof j != "object" || j === null)
          return P;
        switch (j.$$typeof) {
          case sa:
          case Qn:
            my(j, w);
            var J = j.key;
            if (typeof J != "string")
              break;
            if (P === null) {
              P = /* @__PURE__ */ new Set(), P.add(J);
              break;
            }
            if (!P.has(J)) {
              P.add(J);
              break;
            }
            f("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", J);
            break;
          case Ce:
            var ge = j._payload, me = j._init;
            A(me(ge), P, w);
            break;
        }
      }
      return P;
    }
    function z(j, P, w, J) {
      for (var ge = null, me = 0; me < w.length; me++) {
        var Oe = w[me];
        ge = A(Oe, ge, j);
      }
      for (var Ue = null, ot = null, Xe = P, Ot = 0, Je = 0, wt = null; Xe !== null && Je < w.length; Je++) {
        Xe.index > Je ? (wt = Xe, Xe = null) : wt = Xe.sibling;
        var Tn = C(j, Xe, w[Je], J);
        if (Tn === null) {
          Xe === null && (Xe = wt);
          break;
        }
        e && Xe && Tn.alternate === null && t(j, Xe), Ot = i(Tn, Ot, Je), ot === null ? Ue = Tn : ot.sibling = Tn, ot = Tn, Xe = wt;
      }
      if (Je === w.length) {
        if (n(j, Xe), fn()) {
          var yn = Je;
          Ui(j, yn);
        }
        return Ue;
      }
      if (Xe === null) {
        for (; Je < w.length; Je++) {
          var ra = D(j, w[Je], J);
          ra !== null && (Ot = i(ra, Ot, Je), ot === null ? Ue = ra : ot.sibling = ra, ot = ra);
        }
        if (fn()) {
          var Pn = Je;
          Ui(j, Pn);
        }
        return Ue;
      }
      for (var Hn = a(j, Xe); Je < w.length; Je++) {
        var jn = M(Hn, j, Je, w[Je], J);
        jn !== null && (e && jn.alternate !== null && Hn.delete(jn.key === null ? Je : jn.key), Ot = i(jn, Ot, Je), ot === null ? Ue = jn : ot.sibling = jn, ot = jn);
      }
      if (e && Hn.forEach(function(eo) {
        return t(j, eo);
      }), fn()) {
        var _r = Je;
        Ui(j, _r);
      }
      return Ue;
    }
    function de(j, P, w, J) {
      var ge = Sa(w);
      if (typeof ge != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        w[Symbol.toStringTag] === "Generator" && (Rp || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Rp = !0), w.entries === ge && (Sp || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Sp = !0);
        var me = ge.call(w);
        if (me)
          for (var Oe = null, Ue = me.next(); !Ue.done; Ue = me.next()) {
            var ot = Ue.value;
            Oe = A(ot, Oe, j);
          }
      }
      var Xe = ge.call(w);
      if (Xe == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Ot = null, Je = null, wt = P, Tn = 0, yn = 0, ra = null, Pn = Xe.next(); wt !== null && !Pn.done; yn++, Pn = Xe.next()) {
        wt.index > yn ? (ra = wt, wt = null) : ra = wt.sibling;
        var Hn = C(j, wt, Pn.value, J);
        if (Hn === null) {
          wt === null && (wt = ra);
          break;
        }
        e && wt && Hn.alternate === null && t(j, wt), Tn = i(Hn, Tn, yn), Je === null ? Ot = Hn : Je.sibling = Hn, Je = Hn, wt = ra;
      }
      if (Pn.done) {
        if (n(j, wt), fn()) {
          var jn = yn;
          Ui(j, jn);
        }
        return Ot;
      }
      if (wt === null) {
        for (; !Pn.done; yn++, Pn = Xe.next()) {
          var _r = D(j, Pn.value, J);
          _r !== null && (Tn = i(_r, Tn, yn), Je === null ? Ot = _r : Je.sibling = _r, Je = _r);
        }
        if (fn()) {
          var eo = yn;
          Ui(j, eo);
        }
        return Ot;
      }
      for (var Xs = a(j, wt); !Pn.done; yn++, Pn = Xe.next()) {
        var ar = M(Xs, j, yn, Pn.value, J);
        ar !== null && (e && ar.alternate !== null && Xs.delete(ar.key === null ? yn : ar.key), Tn = i(ar, Tn, yn), Je === null ? Ot = ar : Je.sibling = ar, Je = ar);
      }
      if (e && Xs.forEach(function(nw) {
        return t(j, nw);
      }), fn()) {
        var tw = yn;
        Ui(j, tw);
      }
      return Ot;
    }
    function Re(j, P, w, J) {
      if (P !== null && P.tag === B) {
        n(j, P.sibling);
        var ge = r(P, w);
        return ge.return = j, ge;
      }
      n(j, P);
      var me = xh(w, j.mode, J);
      return me.return = j, me;
    }
    function Ee(j, P, w, J) {
      for (var ge = w.key, me = P; me !== null; ) {
        if (me.key === ge) {
          var Oe = w.type;
          if (Oe === Ba) {
            if (me.tag === se) {
              n(j, me.sibling);
              var Ue = r(me, w.props.children);
              return Ue.return = j, Ue._debugSource = w._source, Ue._debugOwner = w._owner, Ue;
            }
          } else if (me.elementType === Oe || // Keep this check inline so it only runs on the false path:
          EN(me, w) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof Oe == "object" && Oe !== null && Oe.$$typeof === Ce && hy(Oe) === me.type) {
            n(j, me.sibling);
            var ot = r(me, w.props);
            return ot.ref = bs(j, me, w), ot.return = j, ot._debugSource = w._source, ot._debugOwner = w._owner, ot;
          }
          n(j, me);
          break;
        } else
          t(j, me);
        me = me.sibling;
      }
      if (w.type === Ba) {
        var Xe = oi(w.props.children, j.mode, J, w.key);
        return Xe.return = j, Xe;
      } else {
        var Ot = Eh(w, j.mode, J);
        return Ot.ref = bs(j, P, w), Ot.return = j, Ot;
      }
    }
    function Ke(j, P, w, J) {
      for (var ge = w.key, me = P; me !== null; ) {
        if (me.key === ge)
          if (me.tag === L && me.stateNode.containerInfo === w.containerInfo && me.stateNode.implementation === w.implementation) {
            n(j, me.sibling);
            var Oe = r(me, w.children || []);
            return Oe.return = j, Oe;
          } else {
            n(j, me);
            break;
          }
        else
          t(j, me);
        me = me.sibling;
      }
      var Ue = Sh(w, j.mode, J);
      return Ue.return = j, Ue;
    }
    function Ie(j, P, w, J) {
      var ge = typeof w == "object" && w !== null && w.type === Ba && w.key === null;
      if (ge && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case sa:
            return l(Ee(j, P, w, J));
          case Qn:
            return l(Ke(j, P, w, J));
          case Ce:
            var me = w._payload, Oe = w._init;
            return Ie(j, P, Oe(me), J);
        }
        if ($e(w))
          return z(j, P, w, J);
        if (Sa(w))
          return de(j, P, w, J);
        pc(j, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" ? l(Re(j, P, "" + w, J)) : (typeof w == "function" && mc(j), n(j, P));
    }
    return Ie;
  }
  var kl = vy(!0), gy = vy(!1);
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
  function MD(e, t) {
    for (var n = e.child; n !== null; )
      b1(n, t), n = n.sibling;
  }
  var jp = Gr(null), wp;
  wp = {};
  var hc = null, Ul = null, _p = null, vc = !1;
  function gc() {
    hc = null, Ul = null, _p = null, vc = !1;
  }
  function yy() {
    vc = !0;
  }
  function by() {
    vc = !1;
  }
  function Ny(e, t, n) {
    Cn(jp, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== wp && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = wp;
  }
  function Op(e, t) {
    var n = jp.current;
    Rn(jp, t), e._currentValue = n;
  }
  function Mp(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (El(a.childLanes, t) ? r !== null && !El(r.childLanes, t) && (r.childLanes = Pe(r.childLanes, t)) : (a.childLanes = Pe(a.childLanes, t), r !== null && (r.childLanes = Pe(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && f("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function VD(e, t, n) {
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
              var s = Uo(n), c = Rr(mt, s);
              c.tag = bc;
              var h = a.updateQueue;
              if (h !== null) {
                var v = h.shared, D = v.pending;
                D === null ? c.next = c : (c.next = D.next, D.next = c), v.pending = c;
              }
            }
            a.lanes = Pe(a.lanes, n);
            var C = a.alternate;
            C !== null && (C.lanes = Pe(C.lanes, n)), Mp(a.return, n, e), i.lanes = Pe(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === W)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === Q) {
        var M = a.return;
        if (M === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        M.lanes = Pe(M.lanes, n);
        var A = M.alternate;
        A !== null && (A.lanes = Pe(A.lanes, n)), Mp(M, n, e), r = a.sibling;
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
    hc = e, Ul = null, _p = null;
    var n = e.dependencies;
    if (n !== null) {
      var a = n.firstContext;
      a !== null && (Jn(n.lanes, t) && As(), n.firstContext = null);
    }
  }
  function Ft(e) {
    vc && f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    var t = e._currentValue;
    if (_p !== e) {
      var n = {
        context: e,
        memoizedValue: t,
        next: null
      };
      if (Ul === null) {
        if (hc === null)
          throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        Ul = n, hc.dependencies = {
          lanes: K,
          firstContext: n
        };
      } else
        Ul = Ul.next = n;
    }
    return t;
  }
  var Bi = null;
  function Vp(e) {
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
    return r === null ? (n.next = n, Vp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, yc(e, a);
  }
  function kD(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, Vp(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function UD(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Vp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, yc(e, a);
  }
  function qn(e, t) {
    return yc(e, t);
  }
  var FD = yc;
  function yc(e, t) {
    e.lanes = Pe(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Pe(n.lanes, t)), n === null && (e.flags & (Ut | mr)) !== we && gN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Pe(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Pe(n.childLanes, t) : (r.flags & (Ut | mr)) !== we && gN(e), a = r, r = r.return;
    if (a.tag === E) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var xy = 0, Sy = 1, bc = 2, Ap = 3, Nc = !1, Lp, Ec;
  Lp = !1, Ec = null;
  function kp(e) {
    var t = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        interleaved: null,
        lanes: K
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
    if (Ec === r && !Lp && (f("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Lp = !0), kj()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, FD(e, n);
    } else
      return UD(e, r, t, n);
  }
  function xc(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (Uv(n)) {
        var i = r.lanes;
        i = zv(i, e.pendingLanes);
        var l = Pe(i, n);
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
          var c = s;
          do {
            var h = {
              eventTime: c.eventTime,
              lane: c.lane,
              tag: c.tag,
              payload: c.payload,
              callback: c.callback,
              next: null
            };
            l === null ? i = l = h : (l.next = h, l = h), c = c.next;
          } while (c !== null);
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
  function zD(e, t, n, a, r, i) {
    switch (n.tag) {
      case Sy: {
        var l = n.payload;
        if (typeof l == "function") {
          yy();
          var s = l.call(i, a, r);
          {
            if (e.mode & jt) {
              an(!0);
              try {
                l.call(i, a, r);
              } finally {
                an(!1);
              }
            }
            by();
          }
          return s;
        }
        return l;
      }
      case Ap:
        e.flags = e.flags & ~kn | tt;
      case xy: {
        var c = n.payload, h;
        if (typeof c == "function") {
          yy(), h = c.call(i, a, r);
          {
            if (e.mode & jt) {
              an(!0);
              try {
                c.call(i, a, r);
              } finally {
                an(!1);
              }
            }
            by();
          }
        } else
          h = c;
        return h == null ? a : Be({}, a, h);
      }
      case bc:
        return Nc = !0, a;
    }
    return a;
  }
  function Sc(e, t, n, a) {
    var r = e.updateQueue;
    Nc = !1, Ec = r.shared;
    var i = r.firstBaseUpdate, l = r.lastBaseUpdate, s = r.shared.pending;
    if (s !== null) {
      r.shared.pending = null;
      var c = s, h = c.next;
      c.next = null, l === null ? i = h : l.next = h, l = c;
      var v = e.alternate;
      if (v !== null) {
        var D = v.updateQueue, C = D.lastBaseUpdate;
        C !== l && (C === null ? D.firstBaseUpdate = h : C.next = h, D.lastBaseUpdate = c);
      }
    }
    if (i !== null) {
      var M = r.baseState, A = K, z = null, de = null, Re = null, Ee = i;
      do {
        var Ke = Ee.lane, Ie = Ee.eventTime;
        if (El(a, Ke)) {
          if (Re !== null) {
            var P = {
              eventTime: Ie,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: rn,
              tag: Ee.tag,
              payload: Ee.payload,
              callback: Ee.callback,
              next: null
            };
            Re = Re.next = P;
          }
          M = zD(e, r, Ee, M, t, n);
          var w = Ee.callback;
          if (w !== null && // If the update was already committed, we should not queue its
          // callback again.
          Ee.lane !== rn) {
            e.flags |= yv;
            var J = r.effects;
            J === null ? r.effects = [Ee] : J.push(Ee);
          }
        } else {
          var j = {
            eventTime: Ie,
            lane: Ke,
            tag: Ee.tag,
            payload: Ee.payload,
            callback: Ee.callback,
            next: null
          };
          Re === null ? (de = Re = j, z = M) : Re = Re.next = j, A = Pe(A, Ke);
        }
        if (Ee = Ee.next, Ee === null) {
          if (s = r.shared.pending, s === null)
            break;
          var ge = s, me = ge.next;
          ge.next = null, Ee = me, r.lastBaseUpdate = ge, r.shared.pending = null;
        }
      } while (!0);
      Re === null && (z = M), r.baseState = z, r.firstBaseUpdate = de, r.lastBaseUpdate = Re;
      var Oe = r.shared.interleaved;
      if (Oe !== null) {
        var Ue = Oe;
        do
          A = Pe(A, Ue.lane), Ue = Ue.next;
        while (Ue !== Oe);
      } else i === null && (r.shared.lanes = K);
      qs(A), e.lanes = A, e.memoizedState = M;
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
    Cn(Cc, t, e), Cn(Es, e, e), Cn(Jr, Ns, e);
    var n = aC(t);
    Rn(Jr, e), Cn(Jr, n, e);
  }
  function zl(e) {
    Rn(Jr, e), Rn(Es, e), Rn(Cc, e);
  }
  function zp() {
    var e = Dc(Jr.current);
    return e;
  }
  function jy(e) {
    Dc(Cc.current);
    var t = Dc(Jr.current), n = rC(t, e.type);
    t !== n && (Cn(Es, e, e), Cn(Jr, n, e));
  }
  function Pp(e) {
    Es.current === e && (Rn(Jr, e), Rn(Es, e));
  }
  var HD = 0, wy = 1, _y = 1, xs = 2, _a = Gr(HD);
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
    Cn(_a, t, e);
  }
  function Hl(e) {
    Rn(_a, e);
  }
  function $D(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function Tc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === le) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || Gg(a) || lp(a))
            return t;
        }
      } else if (t.tag === re && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & tt) !== we;
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
  var Gn = (
    /*   */
    0
  ), Gt = (
    /* */
    1
  ), Qa = (
    /*  */
    2
  ), Wt = (
    /*    */
    4
  ), dn = (
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
  var ve = m.ReactCurrentDispatcher, Ss = m.ReactCurrentBatchConfig, Yp, Bl;
  Yp = /* @__PURE__ */ new Set();
  var $i = K, lt = null, Kt = null, Qt = null, jc = !1, Rs = !1, Cs = 0, YD = 0, qD = 25, q = null, pa = null, ei = -1, qp = !1;
  function nt() {
    {
      var e = q;
      pa === null ? pa = [e] : pa.push(e);
    }
  }
  function ue() {
    {
      var e = q;
      pa !== null && (ei++, pa[ei] !== e && GD(e));
    }
  }
  function $l(e) {
    e != null && !$e(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", q, typeof e);
  }
  function GD(e) {
    {
      var t = Fe(lt);
      if (!Yp.has(t) && (Yp.add(t), pa !== null)) {
        for (var n = "", a = 30, r = 0; r <= ei; r++) {
          for (var i = pa[r], l = r === ei ? e : i, s = r + 1 + ". " + i; s.length < a; )
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
  function Dn() {
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
      return f("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", q), !1;
    e.length !== t.length && f(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, q, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!ta(e[n], t[n]))
        return !1;
    return !0;
  }
  function Il(e, t, n, a, r, i) {
    $i = i, lt = t, pa = e !== null ? e._debugHookTypes : null, ei = -1, qp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = K, e !== null && e.memoizedState !== null ? ve.current = Jy : pa !== null ? ve.current = Xy : ve.current = Qy;
    var l = n(a, r);
    if (Rs) {
      var s = 0;
      do {
        if (Rs = !1, Cs = 0, s >= qD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        s += 1, qp = !1, Kt = null, Qt = null, t.updateQueue = null, ei = -1, ve.current = Zy, l = n(a, r);
      } while (Rs);
    }
    ve.current = Hc, t._debugHookTypes = pa;
    var c = Kt !== null && Kt.next !== null;
    if ($i = K, lt = null, Kt = null, Qt = null, q = null, pa = null, ei = -1, e !== null && (e.flags & hr) !== (t.flags & hr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Ge) !== De && f("Internal React error: Expected static flag was missing. Please notify the React team."), jc = !1, c)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function Yl() {
    var e = Cs !== 0;
    return Cs = 0, e;
  }
  function Oy(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & qa) !== De ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = wu(e.lanes, n);
  }
  function My() {
    if (ve.current = Hc, jc) {
      for (var e = lt.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      jc = !1;
    }
    $i = K, lt = null, Kt = null, Qt = null, pa = null, ei = -1, q = null, Yy = !1, Rs = !1, Cs = 0;
  }
  function Xa() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Qt === null ? lt.memoizedState = Qt = e : Qt = Qt.next = e, Qt;
  }
  function ma() {
    var e;
    if (Kt === null) {
      var t = lt.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = Kt.next;
    var n;
    if (Qt === null ? n = lt.memoizedState : n = Qt.next, n !== null)
      Qt = n, n = Qt.next, Kt = e;
    else {
      if (e === null)
        throw new Error("Rendered more hooks than during the previous render.");
      Kt = e;
      var a = {
        memoizedState: Kt.memoizedState,
        baseState: Kt.baseState,
        baseQueue: Kt.baseQueue,
        queue: Kt.queue,
        next: null
      };
      Qt === null ? lt.memoizedState = Qt = a : Qt = Qt.next = a;
    }
    return Qt;
  }
  function Vy() {
    return {
      lastEffect: null,
      stores: null
    };
  }
  function Wp(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Kp(e, t, n) {
    var a = Xa(), r;
    n !== void 0 ? r = n(t) : r = t, a.memoizedState = a.baseState = r;
    var i = {
      pending: null,
      interleaved: null,
      lanes: K,
      dispatch: null,
      lastRenderedReducer: e,
      lastRenderedState: r
    };
    a.queue = i;
    var l = i.dispatch = XD.bind(null, lt, i);
    return [a.memoizedState, l];
  }
  function Qp(e, t, n) {
    var a = ma(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = Kt, l = i.baseQueue, s = r.pending;
    if (s !== null) {
      if (l !== null) {
        var c = l.next, h = s.next;
        l.next = h, s.next = c;
      }
      i.baseQueue !== l && f("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), i.baseQueue = l = s, r.pending = null;
    }
    if (l !== null) {
      var v = l.next, D = i.baseState, C = null, M = null, A = null, z = v;
      do {
        var de = z.lane;
        if (El($i, de)) {
          if (A !== null) {
            var Ee = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: rn,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            };
            A = A.next = Ee;
          }
          if (z.hasEagerState)
            D = z.eagerState;
          else {
            var Ke = z.action;
            D = e(D, Ke);
          }
        } else {
          var Re = {
            lane: de,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          };
          A === null ? (M = A = Re, C = D) : A = A.next = Re, lt.lanes = Pe(lt.lanes, de), qs(de);
        }
        z = z.next;
      } while (z !== null && z !== v);
      A === null ? C = D : A.next = M, ta(D, a.memoizedState) || As(), a.memoizedState = D, a.baseState = C, a.baseQueue = A, r.lastRenderedState = D;
    }
    var Ie = r.interleaved;
    if (Ie !== null) {
      var j = Ie;
      do {
        var P = j.lane;
        lt.lanes = Pe(lt.lanes, P), qs(P), j = j.next;
      } while (j !== Ie);
    } else l === null && (r.lanes = K);
    var w = r.dispatch;
    return [a.memoizedState, w];
  }
  function Xp(e, t, n) {
    var a = ma(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = r.dispatch, l = r.pending, s = a.memoizedState;
    if (l !== null) {
      r.pending = null;
      var c = l.next, h = c;
      do {
        var v = h.action;
        s = e(s, v), h = h.next;
      } while (h !== c);
      ta(s, a.memoizedState) || As(), a.memoizedState = s, a.baseQueue === null && (a.baseState = s), r.lastRenderedState = s;
    }
    return [s, i];
  }
  function nO(e, t, n) {
  }
  function aO(e, t, n) {
  }
  function Jp(e, t, n) {
    var a = lt, r = Xa(), i, l = fn();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), Bl || i !== n() && (f("The result of getServerSnapshot should be cached to avoid an infinite loop"), Bl = !0);
    } else {
      if (i = t(), !Bl) {
        var s = t();
        ta(i, s) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Bl = !0);
      }
      var c = of();
      if (c === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      ju(c, $i) || Ay(a, t, i);
    }
    r.memoizedState = i;
    var h = {
      value: i,
      getSnapshot: t
    };
    return r.queue = h, Vc(ky.bind(null, a, h, e), [e]), a.flags |= Fr, Ds(Gt | dn, Ly.bind(null, a, h, i, t), void 0, null), i;
  }
  function wc(e, t, n) {
    var a = lt, r = ma(), i = t();
    if (!Bl) {
      var l = t();
      ta(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Bl = !0);
    }
    var s = r.memoizedState, c = !ta(s, i);
    c && (r.memoizedState = i, As());
    var h = r.queue;
    if (js(ky.bind(null, a, h, e), [e]), h.getSnapshot !== t || c || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    Qt !== null && Qt.memoizedState.tag & Gt) {
      a.flags |= Fr, Ds(Gt | dn, Ly.bind(null, a, h, i, t), void 0, null);
      var v = of();
      if (v === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      ju(v, $i) || Ay(a, t, i);
    }
    return i;
  }
  function Ay(e, t, n) {
    e.flags |= Wf;
    var a = {
      getSnapshot: t,
      value: n
    }, r = lt.updateQueue;
    if (r === null)
      r = Vy(), lt.updateQueue = r, r.stores = [a];
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
      return !ta(n, a);
    } catch {
      return !0;
    }
  }
  function Fy(e) {
    var t = qn(e, Ae);
    t !== null && en(t, e, Ae, mt);
  }
  function _c(e) {
    var t = Xa();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: K,
      dispatch: null,
      lastRenderedReducer: Wp,
      lastRenderedState: e
    };
    t.queue = n;
    var a = n.dispatch = JD.bind(null, lt, n);
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
    }, i = lt.updateQueue;
    if (i === null)
      i = Vy(), lt.updateQueue = i, i.lastEffect = r.next = r;
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
    var t = Xa();
    {
      var n = {
        current: e
      };
      return t.memoizedState = n, n;
    }
  }
  function Oc(e) {
    var t = ma();
    return t.memoizedState;
  }
  function Ts(e, t, n, a) {
    var r = Xa(), i = a === void 0 ? null : a;
    lt.flags |= e, r.memoizedState = Ds(Gt | t, n, void 0, i);
  }
  function Mc(e, t, n, a) {
    var r = ma(), i = a === void 0 ? null : a, l = void 0;
    if (Kt !== null) {
      var s = Kt.memoizedState;
      if (l = s.destroy, i !== null) {
        var c = s.deps;
        if (Gp(i, c)) {
          r.memoizedState = Ds(t, n, l, i);
          return;
        }
      }
    }
    lt.flags |= e, r.memoizedState = Ds(Gt | t, n, l, i);
  }
  function Vc(e, t) {
    return (lt.mode & qa) !== De ? Ts(Jf | Fr | Xf, dn, e, t) : Ts(Fr | Xf, dn, e, t);
  }
  function js(e, t) {
    return Mc(Fr, dn, e, t);
  }
  function nm(e, t) {
    return Ts(et, Qa, e, t);
  }
  function Ac(e, t) {
    return Mc(et, Qa, e, t);
  }
  function am(e, t) {
    var n = et;
    return n |= Di, (lt.mode & qa) !== De && (n |= zr), Ts(n, Wt, e, t);
  }
  function Lc(e, t) {
    return Mc(et, Wt, e, t);
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
    var a = n != null ? n.concat([e]) : null, r = et;
    return r |= Di, (lt.mode & qa) !== De && (r |= zr), Ts(r, Wt, zy.bind(null, t, e), a);
  }
  function kc(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return Mc(et, Wt, zy.bind(null, t, e), a);
  }
  function WD(e, t) {
  }
  var Uc = WD;
  function im(e, t) {
    var n = Xa(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function Fc(e, t) {
    var n = ma(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Gp(a, i))
        return r[0];
    }
    return n.memoizedState = [e, a], e;
  }
  function lm(e, t) {
    var n = Xa(), a = t === void 0 ? null : t, r = e();
    return n.memoizedState = [r, a], r;
  }
  function zc(e, t) {
    var n = ma(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Gp(a, i))
        return r[0];
    }
    var l = e();
    return n.memoizedState = [l, a], l;
  }
  function om(e) {
    var t = Xa();
    return t.memoizedState = e, e;
  }
  function Py(e) {
    var t = ma(), n = Kt, a = n.memoizedState;
    return By(t, a, e);
  }
  function Hy(e) {
    var t = ma();
    if (Kt === null)
      return t.memoizedState = e, e;
    var n = Kt.memoizedState;
    return By(t, n, e);
  }
  function By(e, t, n) {
    var a = !VS($i);
    if (a) {
      if (!ta(n, t)) {
        var r = Fv();
        lt.lanes = Pe(lt.lanes, r), qs(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, As()), e.memoizedState = n, n;
  }
  function KD(e, t, n) {
    var a = Da();
    ln(BS(a, gr)), e(!0);
    var r = Ss.transition;
    Ss.transition = {};
    var i = Ss.transition;
    Ss.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (ln(a), Ss.transition = r, r === null && i._updatedFibers) {
        var l = i._updatedFibers.size;
        l > 10 && S("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function sm() {
    var e = _c(!1), t = e[0], n = e[1], a = KD.bind(null, n), r = Xa();
    return r.memoizedState = a, [t, a];
  }
  function $y() {
    var e = Zp(), t = e[0], n = ma(), a = n.memoizedState;
    return [t, a];
  }
  function Iy() {
    var e = em(), t = e[0], n = ma(), a = n.memoizedState;
    return [t, a];
  }
  var Yy = !1;
  function QD() {
    return Yy;
  }
  function um() {
    var e = Xa(), t = of(), n = t.identifierPrefix, a;
    if (fn()) {
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
    var e = ma(), t = e.memoizedState;
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
        var l = zn();
        en(i, e, a, l), Wy(i, t, a);
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
      if (e.lanes === K && (i === null || i.lanes === K)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var s;
          s = ve.current, ve.current = Oa;
          try {
            var c = t.lastRenderedState, h = l(c, n);
            if (r.hasEagerState = !0, r.eagerState = h, ta(h, c)) {
              kD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            ve.current = s;
          }
        }
      }
      var v = Ey(e, t, r, a);
      if (v !== null) {
        var D = zn();
        en(v, e, a, D), Wy(v, t, a);
      }
    }
    Ky(e, a);
  }
  function qy(e) {
    var t = e.alternate;
    return e === lt || t !== null && t === lt;
  }
  function Gy(e, t) {
    Rs = jc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Wy(e, t, n) {
    if (Uv(n)) {
      var a = t.lanes;
      a = zv(a, e.pendingLanes);
      var r = Pe(a, n);
      t.lanes = r, jd(e, r);
    }
  }
  function Ky(e, t, n) {
    ad(e, t);
  }
  var Hc = {
    readContext: Ft,
    useCallback: Dn,
    useContext: Dn,
    useEffect: Dn,
    useImperativeHandle: Dn,
    useInsertionEffect: Dn,
    useLayoutEffect: Dn,
    useMemo: Dn,
    useReducer: Dn,
    useRef: Dn,
    useState: Dn,
    useDebugValue: Dn,
    useDeferredValue: Dn,
    useTransition: Dn,
    useMutableSource: Dn,
    useSyncExternalStore: Dn,
    useId: Dn,
    unstable_isNewReconciler: _e
  }, Qy = null, Xy = null, Jy = null, Zy = null, Ja = null, Oa = null, Bc = null;
  {
    var cm = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, Le = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Qy = {
      readContext: function(e) {
        return Ft(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", nt(), $l(t), im(e, t);
      },
      useContext: function(e) {
        return q = "useContext", nt(), Ft(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", nt(), $l(t), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return q = "useImperativeHandle", nt(), $l(n), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", nt(), $l(t), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", nt(), $l(t), am(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", nt(), $l(t);
        var n = ve.current;
        ve.current = Ja;
        try {
          return lm(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        q = "useReducer", nt();
        var a = ve.current;
        ve.current = Ja;
        try {
          return Kp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return q = "useRef", nt(), tm(e);
      },
      useState: function(e) {
        q = "useState", nt();
        var t = ve.current;
        ve.current = Ja;
        try {
          return _c(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return q = "useDebugValue", nt(), void 0;
      },
      useDeferredValue: function(e) {
        return q = "useDeferredValue", nt(), om(e);
      },
      useTransition: function() {
        return q = "useTransition", nt(), sm();
      },
      useMutableSource: function(e, t, n) {
        return q = "useMutableSource", nt(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return q = "useSyncExternalStore", nt(), Jp(e, t, n);
      },
      useId: function() {
        return q = "useId", nt(), um();
      },
      unstable_isNewReconciler: _e
    }, Xy = {
      readContext: function(e) {
        return Ft(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", ue(), im(e, t);
      },
      useContext: function(e) {
        return q = "useContext", ue(), Ft(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", ue(), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return q = "useImperativeHandle", ue(), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", ue(), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", ue(), am(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", ue();
        var n = ve.current;
        ve.current = Ja;
        try {
          return lm(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        q = "useReducer", ue();
        var a = ve.current;
        ve.current = Ja;
        try {
          return Kp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return q = "useRef", ue(), tm(e);
      },
      useState: function(e) {
        q = "useState", ue();
        var t = ve.current;
        ve.current = Ja;
        try {
          return _c(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return q = "useDebugValue", ue(), void 0;
      },
      useDeferredValue: function(e) {
        return q = "useDeferredValue", ue(), om(e);
      },
      useTransition: function() {
        return q = "useTransition", ue(), sm();
      },
      useMutableSource: function(e, t, n) {
        return q = "useMutableSource", ue(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return q = "useSyncExternalStore", ue(), Jp(e, t, n);
      },
      useId: function() {
        return q = "useId", ue(), um();
      },
      unstable_isNewReconciler: _e
    }, Jy = {
      readContext: function(e) {
        return Ft(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", ue(), Fc(e, t);
      },
      useContext: function(e) {
        return q = "useContext", ue(), Ft(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", ue(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return q = "useImperativeHandle", ue(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", ue(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", ue(), Lc(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", ue();
        var n = ve.current;
        ve.current = Oa;
        try {
          return zc(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        q = "useReducer", ue();
        var a = ve.current;
        ve.current = Oa;
        try {
          return Qp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return q = "useRef", ue(), Oc();
      },
      useState: function(e) {
        q = "useState", ue();
        var t = ve.current;
        ve.current = Oa;
        try {
          return Zp(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return q = "useDebugValue", ue(), Uc();
      },
      useDeferredValue: function(e) {
        return q = "useDeferredValue", ue(), Py(e);
      },
      useTransition: function() {
        return q = "useTransition", ue(), $y();
      },
      useMutableSource: function(e, t, n) {
        return q = "useMutableSource", ue(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return q = "useSyncExternalStore", ue(), wc(e, t);
      },
      useId: function() {
        return q = "useId", ue(), Pc();
      },
      unstable_isNewReconciler: _e
    }, Zy = {
      readContext: function(e) {
        return Ft(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", ue(), Fc(e, t);
      },
      useContext: function(e) {
        return q = "useContext", ue(), Ft(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", ue(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return q = "useImperativeHandle", ue(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", ue(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", ue(), Lc(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", ue();
        var n = ve.current;
        ve.current = Bc;
        try {
          return zc(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        q = "useReducer", ue();
        var a = ve.current;
        ve.current = Bc;
        try {
          return Xp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return q = "useRef", ue(), Oc();
      },
      useState: function(e) {
        q = "useState", ue();
        var t = ve.current;
        ve.current = Bc;
        try {
          return em(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return q = "useDebugValue", ue(), Uc();
      },
      useDeferredValue: function(e) {
        return q = "useDeferredValue", ue(), Hy(e);
      },
      useTransition: function() {
        return q = "useTransition", ue(), Iy();
      },
      useMutableSource: function(e, t, n) {
        return q = "useMutableSource", ue(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return q = "useSyncExternalStore", ue(), wc(e, t);
      },
      useId: function() {
        return q = "useId", ue(), Pc();
      },
      unstable_isNewReconciler: _e
    }, Ja = {
      readContext: function(e) {
        return cm(), Ft(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", Le(), nt(), im(e, t);
      },
      useContext: function(e) {
        return q = "useContext", Le(), nt(), Ft(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", Le(), nt(), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return q = "useImperativeHandle", Le(), nt(), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", Le(), nt(), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", Le(), nt(), am(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", Le(), nt();
        var n = ve.current;
        ve.current = Ja;
        try {
          return lm(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        q = "useReducer", Le(), nt();
        var a = ve.current;
        ve.current = Ja;
        try {
          return Kp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return q = "useRef", Le(), nt(), tm(e);
      },
      useState: function(e) {
        q = "useState", Le(), nt();
        var t = ve.current;
        ve.current = Ja;
        try {
          return _c(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return q = "useDebugValue", Le(), nt(), void 0;
      },
      useDeferredValue: function(e) {
        return q = "useDeferredValue", Le(), nt(), om(e);
      },
      useTransition: function() {
        return q = "useTransition", Le(), nt(), sm();
      },
      useMutableSource: function(e, t, n) {
        return q = "useMutableSource", Le(), nt(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return q = "useSyncExternalStore", Le(), nt(), Jp(e, t, n);
      },
      useId: function() {
        return q = "useId", Le(), nt(), um();
      },
      unstable_isNewReconciler: _e
    }, Oa = {
      readContext: function(e) {
        return cm(), Ft(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", Le(), ue(), Fc(e, t);
      },
      useContext: function(e) {
        return q = "useContext", Le(), ue(), Ft(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", Le(), ue(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return q = "useImperativeHandle", Le(), ue(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", Le(), ue(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", Le(), ue(), Lc(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", Le(), ue();
        var n = ve.current;
        ve.current = Oa;
        try {
          return zc(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        q = "useReducer", Le(), ue();
        var a = ve.current;
        ve.current = Oa;
        try {
          return Qp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return q = "useRef", Le(), ue(), Oc();
      },
      useState: function(e) {
        q = "useState", Le(), ue();
        var t = ve.current;
        ve.current = Oa;
        try {
          return Zp(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return q = "useDebugValue", Le(), ue(), Uc();
      },
      useDeferredValue: function(e) {
        return q = "useDeferredValue", Le(), ue(), Py(e);
      },
      useTransition: function() {
        return q = "useTransition", Le(), ue(), $y();
      },
      useMutableSource: function(e, t, n) {
        return q = "useMutableSource", Le(), ue(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return q = "useSyncExternalStore", Le(), ue(), wc(e, t);
      },
      useId: function() {
        return q = "useId", Le(), ue(), Pc();
      },
      unstable_isNewReconciler: _e
    }, Bc = {
      readContext: function(e) {
        return cm(), Ft(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", Le(), ue(), Fc(e, t);
      },
      useContext: function(e) {
        return q = "useContext", Le(), ue(), Ft(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", Le(), ue(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return q = "useImperativeHandle", Le(), ue(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", Le(), ue(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", Le(), ue(), Lc(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", Le(), ue();
        var n = ve.current;
        ve.current = Oa;
        try {
          return zc(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        q = "useReducer", Le(), ue();
        var a = ve.current;
        ve.current = Oa;
        try {
          return Xp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return q = "useRef", Le(), ue(), Oc();
      },
      useState: function(e) {
        q = "useState", Le(), ue();
        var t = ve.current;
        ve.current = Oa;
        try {
          return em(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return q = "useDebugValue", Le(), ue(), Uc();
      },
      useDeferredValue: function(e) {
        return q = "useDeferredValue", Le(), ue(), Hy(e);
      },
      useTransition: function() {
        return q = "useTransition", Le(), ue(), Iy();
      },
      useMutableSource: function(e, t, n) {
        return q = "useMutableSource", Le(), ue(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return q = "useSyncExternalStore", Le(), ue(), wc(e, t);
      },
      useId: function() {
        return q = "useId", Le(), ue(), Pc();
      },
      unstable_isNewReconciler: _e
    };
  }
  var ti = d.unstable_now, eb = 0, $c = -1, ws = -1, Ic = -1, fm = !1, Yc = !1;
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
  function Za(e) {
    if ($c >= 0) {
      var t = ti() - $c;
      $c = -1;
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
  function pm(e) {
    if (Ic >= 0) {
      var t = ti() - Ic;
      Ic = -1;
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
  function er() {
    $c = ti();
  }
  function mm() {
    Ic = ti();
  }
  function hm(e) {
    for (var t = e.child; t; )
      e.actualDuration += t.actualDuration, t = t.sibling;
  }
  function Ma(e, t) {
    if (e && e.defaultProps) {
      var n = Be({}, t), a = e.defaultProps;
      for (var r in a)
        n[r] === void 0 && (n[r] = a[r]);
      return n;
    }
    return t;
  }
  var vm = {}, gm, ym, bm, Nm, Em, ib, Gc, xm, Sm, Rm, _s;
  {
    gm = /* @__PURE__ */ new Set(), ym = /* @__PURE__ */ new Set(), bm = /* @__PURE__ */ new Set(), Nm = /* @__PURE__ */ new Set(), xm = /* @__PURE__ */ new Set(), Em = /* @__PURE__ */ new Set(), Sm = /* @__PURE__ */ new Set(), Rm = /* @__PURE__ */ new Set(), _s = /* @__PURE__ */ new Set();
    var lb = /* @__PURE__ */ new Set();
    Gc = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        lb.has(n) || (lb.add(n), f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, ib = function(e, t) {
      if (t === void 0) {
        var n = Ze(e) || "Component";
        Em.has(n) || (Em.add(n), f("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", n));
      }
    }, Object.defineProperty(vm, "_processChildContext", {
      enumerable: !1,
      value: function() {
        throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
      }
    }), Object.freeze(vm);
  }
  function Cm(e, t, n, a) {
    var r = e.memoizedState, i = n(a, r);
    {
      if (e.mode & jt) {
        an(!0);
        try {
          i = n(a, r);
        } finally {
          an(!1);
        }
      }
      ib(t, i);
    }
    var l = i == null ? r : Be({}, r, i);
    if (e.memoizedState = l, e.lanes === K) {
      var s = e.updateQueue;
      s.baseState = l;
    }
  }
  var Dm = {
    isMounted: qx,
    enqueueSetState: function(e, t, n) {
      var a = dl(e), r = zn(), i = ii(a), l = Rr(r, i);
      l.payload = t, n != null && (Gc(n, "setState"), l.callback = n);
      var s = Xr(a, l, i);
      s !== null && (en(s, a, i, r), xc(s, a, i)), ad(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = dl(e), r = zn(), i = ii(a), l = Rr(r, i);
      l.tag = Sy, l.payload = t, n != null && (Gc(n, "replaceState"), l.callback = n);
      var s = Xr(a, l, i);
      s !== null && (en(s, a, i, r), xc(s, a, i)), ad(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = dl(e), a = zn(), r = ii(n), i = Rr(a, r);
      i.tag = bc, t != null && (Gc(t, "forceUpdate"), i.callback = t);
      var l = Xr(n, i, r);
      l !== null && (en(l, n, r, a), xc(l, n, r)), SS(n, r);
    }
  };
  function ob(e, t, n, a, r, i, l) {
    var s = e.stateNode;
    if (typeof s.shouldComponentUpdate == "function") {
      var c = s.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & jt) {
          an(!0);
          try {
            c = s.shouldComponentUpdate(a, i, l);
          } finally {
            an(!1);
          }
        }
        c === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Ze(t) || "Component");
      }
      return c;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Jo(n, a) || !Jo(r, i) : !0;
  }
  function nT(e, t, n) {
    var a = e.stateNode;
    {
      var r = Ze(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & jt) === De && (_s.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & jt) === De && (_s.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !Sm.has(t) && (Sm.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Ze(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !bm.has(t) && (bm.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Ze(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var s = a.state;
      s && (typeof s != "object" || $e(s)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function sb(e, t) {
    t.updater = Dm, e.stateNode = t, Bx(t, e), t._reactInternalInstance = vm;
  }
  function ub(e, t, n) {
    var a = !1, r = na, i = na, l = t.contextType;
    if ("contextType" in t) {
      var s = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === fe && l._context === void 0
      );
      if (!s && !Rm.has(t)) {
        Rm.add(t);
        var c = "";
        l === void 0 ? c = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? c = " However, it is set to a " + typeof l + "." : l.$$typeof === X ? c = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? c = " Did you accidentally pass the Context.Consumer instead?" : c = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Ze(t) || "Component", c);
      }
    }
    if (typeof l == "object" && l !== null)
      i = Ft(l);
    else {
      r = Ol(e, t, !0);
      var h = t.contextTypes;
      a = h != null, i = a ? Ml(e, r) : na;
    }
    var v = new t(n, i);
    if (e.mode & jt) {
      an(!0);
      try {
        v = new t(n, i);
      } finally {
        an(!1);
      }
    }
    var D = e.memoizedState = v.state !== null && v.state !== void 0 ? v.state : null;
    sb(e, v);
    {
      if (typeof t.getDerivedStateFromProps == "function" && D === null) {
        var C = Ze(t) || "Component";
        ym.has(C) || (ym.add(C), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", C, v.state === null ? "null" : "undefined", C));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof v.getSnapshotBeforeUpdate == "function") {
        var M = null, A = null, z = null;
        if (typeof v.componentWillMount == "function" && v.componentWillMount.__suppressDeprecationWarning !== !0 ? M = "componentWillMount" : typeof v.UNSAFE_componentWillMount == "function" && (M = "UNSAFE_componentWillMount"), typeof v.componentWillReceiveProps == "function" && v.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? A = "componentWillReceiveProps" : typeof v.UNSAFE_componentWillReceiveProps == "function" && (A = "UNSAFE_componentWillReceiveProps"), typeof v.componentWillUpdate == "function" && v.componentWillUpdate.__suppressDeprecationWarning !== !0 ? z = "componentWillUpdate" : typeof v.UNSAFE_componentWillUpdate == "function" && (z = "UNSAFE_componentWillUpdate"), M !== null || A !== null || z !== null) {
          var de = Ze(t) || "Component", Re = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          Nm.has(de) || (Nm.add(de), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, de, Re, M !== null ? `
  ` + M : "", A !== null ? `
  ` + A : "", z !== null ? `
  ` + z : ""));
        }
      }
    }
    return a && Jg(e, r, i), v;
  }
  function aT(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Fe(e) || "Component"), Dm.enqueueReplaceState(t, t.state, null));
  }
  function cb(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = Fe(e) || "Component";
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
      r.context = Ft(i);
    else {
      var l = Ol(e, t, !0);
      r.context = Ml(e, l);
    }
    {
      if (r.state === n) {
        var s = Ze(t) || "Component";
        xm.has(s) || (xm.add(s), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", s));
      }
      e.mode & jt && wa.recordLegacyContextWarning(e, r), wa.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var c = t.getDerivedStateFromProps;
    if (typeof c == "function" && (Cm(e, t, c, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (aT(e, r), Sc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var h = et;
      h |= Di, (e.mode & qa) !== De && (h |= zr), e.flags |= h;
    }
  }
  function rT(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, s = t.contextType, c = na;
    if (typeof s == "object" && s !== null)
      c = Ft(s);
    else {
      var h = Ol(e, t, !0);
      c = Ml(e, h);
    }
    var v = t.getDerivedStateFromProps, D = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !D && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== c) && cb(e, r, n, c), Cy();
    var C = e.memoizedState, M = r.state = C;
    if (Sc(e, n, r, a), M = e.memoizedState, i === n && C === M && !rc() && !Rc()) {
      if (typeof r.componentDidMount == "function") {
        var A = et;
        A |= Di, (e.mode & qa) !== De && (A |= zr), e.flags |= A;
      }
      return !1;
    }
    typeof v == "function" && (Cm(e, t, v, n), M = e.memoizedState);
    var z = Rc() || ob(e, t, i, n, C, M, c);
    if (z) {
      if (!D && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var de = et;
        de |= Di, (e.mode & qa) !== De && (de |= zr), e.flags |= de;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var Re = et;
        Re |= Di, (e.mode & qa) !== De && (Re |= zr), e.flags |= Re;
      }
      e.memoizedProps = n, e.memoizedState = M;
    }
    return r.props = n, r.state = M, r.context = c, z;
  }
  function iT(e, t, n, a, r) {
    var i = t.stateNode;
    Ry(e, t);
    var l = t.memoizedProps, s = t.type === t.elementType ? l : Ma(t.type, l);
    i.props = s;
    var c = t.pendingProps, h = i.context, v = n.contextType, D = na;
    if (typeof v == "object" && v !== null)
      D = Ft(v);
    else {
      var C = Ol(t, n, !0);
      D = Ml(t, C);
    }
    var M = n.getDerivedStateFromProps, A = typeof M == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !A && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== c || h !== D) && cb(t, i, a, D), Cy();
    var z = t.memoizedState, de = i.state = z;
    if (Sc(t, a, i, r), de = t.memoizedState, l === c && z === de && !rc() && !Rc() && !Qe)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= et), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= ml), !1;
    typeof M == "function" && (Cm(t, n, M, a), de = t.memoizedState);
    var Re = Rc() || ob(t, n, s, a, z, de, D) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    Qe;
    return Re ? (!A && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, de, D), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, de, D)), typeof i.componentDidUpdate == "function" && (t.flags |= et), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= ml)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= et), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= ml), t.memoizedProps = a, t.memoizedState = de), i.props = a, i.state = de, i.context = D, Re;
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
      var s = r ? Fe(r) : null, c = s ? "The above error occurred in the <" + s + "> component:" : "The above error occurred in one of your React components:", h;
      if (e.tag === E)
        h = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var v = Fe(e) || "Anonymous";
        h = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + v + ".");
      }
      var D = c + `
` + l + `

` + ("" + h);
      console.error(D);
    } catch (C) {
      setTimeout(function() {
        throw C;
      });
    }
  }
  var oT = typeof WeakMap == "function" ? WeakMap : Map;
  function fb(e, t, n) {
    var a = Rr(mt, n);
    a.tag = Ap, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Zj(r), wm(e, t);
    }, a;
  }
  function _m(e, t, n) {
    var a = Rr(mt, n);
    a.tag = Ap;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      a.payload = function() {
        return r(i);
      }, a.callback = function() {
        xN(e), wm(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (a.callback = function() {
      xN(e), wm(e, t), typeof r != "function" && Xj(this);
      var c = t.value, h = t.stack;
      this.componentDidCatch(c, {
        componentStack: h !== null ? h : ""
      }), typeof r != "function" && (Jn(e.lanes, Ae) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Fe(e) || "Unknown"));
    }), a;
  }
  function db(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new oT(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = e1.bind(null, e, t, n);
      Ca && Gs(e, n), t.then(i, i);
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
    if ((e.mode & Ge) === De && (n === R || n === $ || n === H)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function pb(e) {
    var t = e;
    do {
      if (t.tag === le && $D(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function mb(e, t, n, a, r) {
    if ((e.mode & Ge) === De) {
      if (e === t)
        e.flags |= kn;
      else {
        if (e.flags |= tt, n.flags |= Kf, n.flags &= -52805, n.tag === T) {
          var i = n.alternate;
          if (i === null)
            n.tag = ee;
          else {
            var l = Rr(mt, Ae);
            l.tag = bc, Xr(n, l, Ae);
          }
        }
        n.lanes = Pe(n.lanes, Ae);
      }
      return e;
    }
    return e.flags |= kn, e.lanes = r, e;
  }
  function cT(e, t, n, a, r) {
    if (n.flags |= xu, Ca && Gs(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      uT(n), fn() && n.mode & Ge && iy();
      var l = pb(t);
      if (l !== null) {
        l.flags &= ~pr, mb(l, t, n, e, r), l.mode & Ge && db(e, i, r), sT(l, e, i);
        return;
      } else {
        if (!MS(r)) {
          db(e, i, r), uh();
          return;
        }
        var s = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = s;
      }
    } else if (fn() && n.mode & Ge) {
      iy();
      var c = pb(t);
      if (c !== null) {
        (c.flags & kn) === we && (c.flags |= pr), mb(c, t, n, e, r), xp(Ii(a, n));
        return;
      }
    }
    a = Ii(a, n), $j(a);
    var h = t;
    do {
      switch (h.tag) {
        case E: {
          var v = a;
          h.flags |= kn;
          var D = Uo(r);
          h.lanes = Pe(h.lanes, D);
          var C = fb(h, v, D);
          Up(h, C);
          return;
        }
        case T:
          var M = a, A = h.type, z = h.stateNode;
          if ((h.flags & tt) === we && (typeof A.getDerivedStateFromError == "function" || z !== null && typeof z.componentDidCatch == "function" && !pN(z))) {
            h.flags |= kn;
            var de = Uo(r);
            h.lanes = Pe(h.lanes, de);
            var Re = _m(h, M, de);
            Up(h, Re);
            return;
          }
          break;
      }
      h = h.return;
    } while (h !== null);
  }
  function fT() {
    return null;
  }
  var Os = m.ReactCurrentOwner, Va = !1, Om, Ms, Mm, Vm, Am, Yi, Lm, Wc, Vs;
  Om = {}, Ms = {}, Mm = {}, Vm = {}, Am = {}, Yi = !1, Lm = {}, Wc = {}, Vs = {};
  function Un(e, t, n, a) {
    e === null ? t.child = gy(t, null, n, a) : t.child = kl(t, e.child, n, a);
  }
  function dT(e, t, n, a) {
    t.child = kl(t, e.child, null, a), t.child = kl(t, null, n, a);
  }
  function hb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Ta(
        i,
        a,
        // Resolved props
        "prop",
        Ze(n)
      );
    }
    var l = n.render, s = t.ref, c, h;
    Fl(t, r), Oo(t);
    {
      if (Os.current = t, ua(!0), c = Il(e, t, l, a, s, r), h = Yl(), t.mode & jt) {
        an(!0);
        try {
          c = Il(e, t, l, a, s, r), h = Yl();
        } finally {
          an(!1);
        }
      }
      ua(!1);
    }
    return gl(), e !== null && !Va ? (Oy(e, t, r), Cr(e, t, r)) : (fn() && h && vp(t), t.flags |= pl, Un(e, t, c, r), t.child);
  }
  function vb(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (g1(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Zl(i), t.tag = H, t.type = l, Fm(t, i), gb(e, t, l, a, r);
      }
      {
        var s = i.propTypes;
        if (s && Ta(
          s,
          a,
          // Resolved props
          "prop",
          Ze(i)
        ), n.defaultProps !== void 0) {
          var c = Ze(i) || "Unknown";
          Vs[c] || (f("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", c), Vs[c] = !0);
        }
      }
      var h = Nh(n.type, null, a, t, t.mode, r);
      return h.ref = t.ref, h.return = t, t.child = h, h;
    }
    {
      var v = n.type, D = v.propTypes;
      D && Ta(
        D,
        a,
        // Resolved props
        "prop",
        Ze(v)
      );
    }
    var C = e.child, M = Im(e, r);
    if (!M) {
      var A = C.memoizedProps, z = n.compare;
      if (z = z !== null ? z : Jo, z(A, a) && e.ref === t.ref)
        return Cr(e, t, r);
    }
    t.flags |= pl;
    var de = Qi(C, a);
    return de.ref = t.ref, de.return = t, t.child = de, de;
  }
  function gb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === Ce) {
        var l = i, s = l._payload, c = l._init;
        try {
          i = c(s);
        } catch {
          i = null;
        }
        var h = i && i.propTypes;
        h && Ta(
          h,
          a,
          // Resolved (SimpleMemoComponent has no defaultProps)
          "prop",
          Ze(i)
        );
      }
    }
    if (e !== null) {
      var v = e.memoizedProps;
      if (Jo(v, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (Va = !1, t.pendingProps = a = v, Im(e, r))
          (e.flags & Kf) !== we && (Va = !0);
        else return t.lanes = e.lanes, Cr(e, t, r);
    }
    return km(e, t, n, a, r);
  }
  function yb(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || ne)
      if ((t.mode & Ge) === De) {
        var l = {
          baseLanes: K,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, sf(t, n);
      } else if (Jn(n, Xn)) {
        var D = {
          baseLanes: K,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = D;
        var C = i !== null ? i.baseLanes : n;
        sf(t, C);
      } else {
        var s = null, c;
        if (i !== null) {
          var h = i.baseLanes;
          c = Pe(h, n);
        } else
          c = n;
        t.lanes = t.childLanes = Xn;
        var v = {
          baseLanes: c,
          cachePool: s,
          transitions: null
        };
        return t.memoizedState = v, t.updateQueue = null, sf(t, c), null;
      }
    else {
      var M;
      i !== null ? (M = Pe(i.baseLanes, n), t.memoizedState = null) : M = n, sf(t, M);
    }
    return Un(e, t, r, n), t.child;
  }
  function pT(e, t, n) {
    var a = t.pendingProps;
    return Un(e, t, a, n), t.child;
  }
  function mT(e, t, n) {
    var a = t.pendingProps.children;
    return Un(e, t, a, n), t.child;
  }
  function hT(e, t, n) {
    {
      t.flags |= et;
      {
        var a = t.stateNode;
        a.effectDuration = 0, a.passiveEffectDuration = 0;
      }
    }
    var r = t.pendingProps, i = r.children;
    return Un(e, t, i, n), t.child;
  }
  function bb(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= Ri, t.flags |= Qf);
  }
  function km(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Ta(
        i,
        a,
        // Resolved props
        "prop",
        Ze(n)
      );
    }
    var l;
    {
      var s = Ol(t, n, !0);
      l = Ml(t, s);
    }
    var c, h;
    Fl(t, r), Oo(t);
    {
      if (Os.current = t, ua(!0), c = Il(e, t, n, a, l, r), h = Yl(), t.mode & jt) {
        an(!0);
        try {
          c = Il(e, t, n, a, l, r), h = Yl();
        } finally {
          an(!1);
        }
      }
      ua(!1);
    }
    return gl(), e !== null && !Va ? (Oy(e, t, r), Cr(e, t, r)) : (fn() && h && vp(t), t.flags |= pl, Un(e, t, c, r), t.child);
  }
  function Nb(e, t, n, a, r) {
    {
      switch (M1(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, s = new l(t.memoizedProps, i.context), c = s.state;
          i.updater.enqueueSetState(i, c, null);
          break;
        }
        case !0: {
          t.flags |= tt, t.flags |= kn;
          var h = new Error("Simulated error coming from DevTools"), v = Uo(r);
          t.lanes = Pe(t.lanes, v);
          var D = _m(t, Ii(h, t), v);
          Up(t, D);
          break;
        }
      }
      if (t.type !== t.elementType) {
        var C = n.propTypes;
        C && Ta(
          C,
          a,
          // Resolved props
          "prop",
          Ze(n)
        );
      }
    }
    var M;
    Ka(n) ? (M = !0, lc(t)) : M = !1, Fl(t, r);
    var A = t.stateNode, z;
    A === null ? (Qc(e, t), ub(t, n, a), Tm(t, n, a, r), z = !0) : e === null ? z = rT(t, n, a, r) : z = iT(e, t, n, a, r);
    var de = Um(e, t, n, z, M, r);
    {
      var Re = t.stateNode;
      z && Re.props !== a && (Yi || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Fe(t) || "a component"), Yi = !0);
    }
    return de;
  }
  function Um(e, t, n, a, r, i) {
    bb(e, t);
    var l = (t.flags & tt) !== we;
    if (!a && !l)
      return r && ty(t, n, !1), Cr(e, t, i);
    var s = t.stateNode;
    Os.current = t;
    var c;
    if (l && typeof n.getDerivedStateFromError != "function")
      c = null, rb();
    else {
      Oo(t);
      {
        if (ua(!0), c = s.render(), t.mode & jt) {
          an(!0);
          try {
            s.render();
          } finally {
            an(!1);
          }
        }
        ua(!1);
      }
      gl();
    }
    return t.flags |= pl, e !== null && l ? dT(e, t, c, i) : Un(e, t, c, i), t.memoizedState = s.state, r && ty(t, n, !0), t.child;
  }
  function Eb(e) {
    var t = e.stateNode;
    t.pendingContext ? Zg(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Zg(e, t.context, !1), Fp(e, t.containerInfo);
  }
  function vT(e, t, n) {
    if (Eb(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    Ry(e, t), Sc(t, a, null, n);
    var l = t.memoizedState;
    t.stateNode;
    var s = l.element;
    if (r.isDehydrated) {
      var c = {
        element: s,
        isDehydrated: !1,
        cache: l.cache,
        pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
        transitions: l.transitions
      }, h = t.updateQueue;
      if (h.baseState = c, t.memoizedState = c, t.flags & pr) {
        var v = Ii(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return xb(e, t, s, n, v);
      } else if (s !== i) {
        var D = Ii(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return xb(e, t, s, n, D);
      } else {
        bD(t);
        var C = gy(t, null, s, n);
        t.child = C;
        for (var M = C; M; )
          M.flags = M.flags & ~Ut | mr, M = M.sibling;
      }
    } else {
      if (Ll(), s === i)
        return Cr(e, t, n);
      Un(e, t, s, n);
    }
    return t.child;
  }
  function xb(e, t, n, a, r) {
    return Ll(), xp(r), t.flags |= pr, Un(e, t, n, a), t.child;
  }
  function gT(e, t, n) {
    jy(t), e === null && Ep(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, s = np(a, r);
    return s ? l = null : i !== null && np(a, i) && (t.flags |= wo), bb(e, t), Un(e, t, l, n), t.child;
  }
  function yT(e, t) {
    return e === null && Ep(t), null;
  }
  function bT(e, t, n, a) {
    Qc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, s = i._init, c = s(l);
    t.type = c;
    var h = t.tag = y1(c), v = Ma(c, r), D;
    switch (h) {
      case R:
        return Fm(t, c), t.type = c = Zl(c), D = km(null, t, c, v, a), D;
      case T:
        return t.type = c = mh(c), D = Nb(null, t, c, v, a), D;
      case $:
        return t.type = c = hh(c), D = hb(null, t, c, v, a), D;
      case I: {
        if (t.type !== t.elementType) {
          var C = c.propTypes;
          C && Ta(
            C,
            v,
            // Resolved for outer only
            "prop",
            Ze(c)
          );
        }
        return D = vb(
          null,
          t,
          c,
          Ma(c.type, v),
          // The inner type can have defaults too
          a
        ), D;
      }
    }
    var M = "";
    throw c !== null && typeof c == "object" && c.$$typeof === Ce && (M = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + c + ". " + ("Lazy element type must resolve to a class or function." + M));
  }
  function NT(e, t, n, a, r) {
    Qc(e, t), t.tag = T;
    var i;
    return Ka(n) ? (i = !0, lc(t)) : i = !1, Fl(t, r), ub(t, n, a), Tm(t, n, a, r), Um(null, t, n, !0, i, r);
  }
  function ET(e, t, n, a) {
    Qc(e, t);
    var r = t.pendingProps, i;
    {
      var l = Ol(t, n, !1);
      i = Ml(t, l);
    }
    Fl(t, a);
    var s, c;
    Oo(t);
    {
      if (n.prototype && typeof n.prototype.render == "function") {
        var h = Ze(n) || "Unknown";
        Om[h] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", h, h), Om[h] = !0);
      }
      t.mode & jt && wa.recordLegacyContextWarning(t, null), ua(!0), Os.current = t, s = Il(null, t, n, r, i, a), c = Yl(), ua(!1);
    }
    if (gl(), t.flags |= pl, typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0) {
      var v = Ze(n) || "Unknown";
      Ms[v] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", v, v, v), Ms[v] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0
    ) {
      {
        var D = Ze(n) || "Unknown";
        Ms[D] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", D, D, D), Ms[D] = !0);
      }
      t.tag = T, t.memoizedState = null, t.updateQueue = null;
      var C = !1;
      return Ka(n) ? (C = !0, lc(t)) : C = !1, t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, kp(t), sb(t, s), Tm(t, n, r, a), Um(null, t, n, !0, C, a);
    } else {
      if (t.tag = R, t.mode & jt) {
        an(!0);
        try {
          s = Il(null, t, n, r, i, a), c = Yl();
        } finally {
          an(!1);
        }
      }
      return fn() && c && vp(t), Un(null, t, s, a), Fm(t, n), t.child;
    }
  }
  function Fm(e, t) {
    {
      if (t && t.childContextTypes && f("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var n = "", a = kr();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), Am[r] || (Am[r] = !0, f("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = Ze(t) || "Unknown";
        Vs[l] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), Vs[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var s = Ze(t) || "Unknown";
        Vm[s] || (f("%s: Function components do not support getDerivedStateFromProps.", s), Vm[s] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var c = Ze(t) || "Unknown";
        Mm[c] || (f("%s: Function components do not support contextType.", c), Mm[c] = !0);
      }
    }
  }
  var zm = {
    dehydrated: null,
    treeContext: null,
    retryLane: rn
  };
  function Pm(e) {
    return {
      baseLanes: e,
      cachePool: fT(),
      transitions: null
    };
  }
  function xT(e, t) {
    var n = null;
    return {
      baseLanes: Pe(e.baseLanes, t),
      cachePool: n,
      transitions: e.transitions
    };
  }
  function ST(e, t, n, a) {
    if (t !== null) {
      var r = t.memoizedState;
      if (r === null)
        return !1;
    }
    return Hp(e, xs);
  }
  function RT(e, t) {
    return wu(e.childLanes, t);
  }
  function Sb(e, t, n) {
    var a = t.pendingProps;
    V1(t) && (t.flags |= tt);
    var r = _a.current, i = !1, l = (t.flags & tt) !== we;
    if (l || ST(r, e) ? (i = !0, t.flags &= ~tt) : (e === null || e.memoizedState !== null) && (r = BD(r, _y)), r = Pl(r), Zr(t, r), e === null) {
      Ep(t);
      var s = t.memoizedState;
      if (s !== null) {
        var c = s.dehydrated;
        if (c !== null)
          return wT(t, c);
      }
      var h = a.children, v = a.fallback;
      if (i) {
        var D = CT(t, h, v, n), C = t.child;
        return C.memoizedState = Pm(n), t.memoizedState = zm, D;
      } else
        return Hm(t, h);
    } else {
      var M = e.memoizedState;
      if (M !== null) {
        var A = M.dehydrated;
        if (A !== null)
          return _T(e, t, l, a, A, M, n);
      }
      if (i) {
        var z = a.fallback, de = a.children, Re = TT(e, t, de, z, n), Ee = t.child, Ke = e.child.memoizedState;
        return Ee.memoizedState = Ke === null ? Pm(n) : xT(Ke, n), Ee.childLanes = RT(e, n), t.memoizedState = zm, Re;
      } else {
        var Ie = a.children, j = DT(e, t, Ie, n);
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
    }, s, c;
    return (r & Ge) === De && i !== null ? (s = i, s.childLanes = K, s.pendingProps = l, e.mode & it && (s.actualDuration = 0, s.actualStartTime = -1, s.selfBaseDuration = 0, s.treeBaseDuration = 0), c = oi(n, r, a, null)) : (s = Bm(l, r), c = oi(n, r, a, null)), s.return = e, c.return = e, s.sibling = c, e.child = s, c;
  }
  function Bm(e, t, n) {
    return RN(e, t, K, null);
  }
  function Rb(e, t) {
    return Qi(e, t);
  }
  function DT(e, t, n, a) {
    var r = e.child, i = r.sibling, l = Rb(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & Ge) === De && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
      var s = t.deletions;
      s === null ? (t.deletions = [i], t.flags |= Si) : s.push(i);
    }
    return t.child = l, l;
  }
  function TT(e, t, n, a, r) {
    var i = t.mode, l = e.child, s = l.sibling, c = {
      mode: "hidden",
      children: n
    }, h;
    if (
      // In legacy mode, we commit the primary tree as if it successfully
      // completed, even though it's in an inconsistent state.
      (i & Ge) === De && // Make sure we're on the second pass, i.e. the primary child fragment was
      // already cloned. In legacy mode, the only case where this isn't true is
      // when DevTools forces us to display a fallback; we skip the first render
      // pass entirely and go straight to rendering the fallback. (In Concurrent
      // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
      // only codepath.)
      t.child !== l
    ) {
      var v = t.child;
      h = v, h.childLanes = K, h.pendingProps = c, t.mode & it && (h.actualDuration = 0, h.actualStartTime = -1, h.selfBaseDuration = l.selfBaseDuration, h.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      h = Rb(l, c), h.subtreeFlags = l.subtreeFlags & hr;
    var D;
    return s !== null ? D = Qi(s, a) : (D = oi(a, i, r, null), D.flags |= Ut), D.return = t, h.return = t, h.sibling = D, t.child = h, D;
  }
  function Kc(e, t, n, a) {
    a !== null && xp(a), kl(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = Hm(t, i);
    return l.flags |= Ut, t.memoizedState = null, l;
  }
  function jT(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, s = Bm(l, i), c = oi(a, i, r, null);
    return c.flags |= Ut, s.return = t, c.return = t, s.sibling = c, t.child = s, (t.mode & Ge) !== De && kl(t, e.child, null, r), c;
  }
  function wT(e, t, n) {
    return (e.mode & Ge) === De ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ae) : lp(t) ? e.lanes = wi : e.lanes = Xn, null;
  }
  function _T(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & pr) {
        t.flags &= ~pr;
        var j = jm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return Kc(e, t, l, j);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= tt, null;
        var P = a.children, w = a.fallback, J = jT(e, t, P, w, l), ge = t.child;
        return ge.memoizedState = Pm(l), t.memoizedState = zm, J;
      }
    else {
      if (gD(), (t.mode & Ge) === De)
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
        var s, c, h;
        {
          var v = AC(r);
          s = v.digest, c = v.message, h = v.stack;
        }
        var D;
        c ? D = new Error(c) : D = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var C = jm(D, s, h);
        return Kc(e, t, l, C);
      }
      var M = Jn(l, e.childLanes);
      if (Va || M) {
        var A = of();
        if (A !== null) {
          var z = PS(A, l);
          if (z !== rn && z !== i.retryLane) {
            i.retryLane = z;
            var de = mt;
            qn(e, z), en(A, e, z, de);
          }
        }
        uh();
        var Re = jm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Kc(e, t, l, Re);
      } else if (Gg(r)) {
        t.flags |= tt, t.child = e.child;
        var Ee = t1.bind(null, e);
        return LC(r, Ee), null;
      } else {
        ND(t, r, i.treeContext);
        var Ke = a.children, Ie = Hm(t, Ke);
        return Ie.flags |= mr, Ie;
      }
    }
  }
  function Cb(e, t, n) {
    e.lanes = Pe(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Pe(a.lanes, t)), Mp(e.return, t, n);
  }
  function OT(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === le) {
        var r = a.memoizedState;
        r !== null && Cb(a, n, e);
      } else if (a.tag === re)
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
  function MT(e) {
    for (var t = e, n = null; t !== null; ) {
      var a = t.alternate;
      a !== null && Tc(a) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function VT(e) {
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
  function AT(e, t) {
    e !== void 0 && !Wc[e] && (e !== "collapsed" && e !== "hidden" ? (Wc[e] = !0, f('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Wc[e] = !0, f('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function Db(e, t) {
    {
      var n = $e(e), a = !n && typeof Sa(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function LT(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if ($e(e)) {
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
    VT(r), AT(i, r), LT(l, r), Un(e, t, l, n);
    var s = _a.current, c = Hp(s, xs);
    if (c)
      s = Bp(s, xs), t.flags |= tt;
    else {
      var h = e !== null && (e.flags & tt) !== we;
      h && OT(t, t.child, n), s = Pl(s);
    }
    if (Zr(t, s), (t.mode & Ge) === De)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var v = MT(t.child), D;
          v === null ? (D = t.child, t.child = null) : (D = v.sibling, v.sibling = null), $m(
            t,
            !1,
            // isBackwards
            D,
            v,
            i
          );
          break;
        }
        case "backwards": {
          var C = null, M = t.child;
          for (t.child = null; M !== null; ) {
            var A = M.alternate;
            if (A !== null && Tc(A) === null) {
              t.child = M;
              break;
            }
            var z = M.sibling;
            M.sibling = C, C = M, M = z;
          }
          $m(
            t,
            !0,
            // isBackwards
            C,
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
    return e === null ? t.child = kl(t, null, a, n) : Un(e, t, a, n), t.child;
  }
  var jb = !1;
  function UT(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, s = i.value;
    {
      "value" in i || jb || (jb = !0, f("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var c = t.type.propTypes;
      c && Ta(c, i, "prop", "Context.Provider");
    }
    if (Ny(t, r, s), l !== null) {
      var h = l.value;
      if (ta(h, s)) {
        if (l.children === i.children && !rc())
          return Cr(e, t, n);
      } else
        VD(t, r, n);
    }
    var v = i.children;
    return Un(e, t, v, n), t.child;
  }
  var wb = !1;
  function FT(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (wb || (wb = !0, f("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && f("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Fl(t, n);
    var l = Ft(a);
    Oo(t);
    var s;
    return Os.current = t, ua(!0), s = i(l), ua(!1), gl(), t.flags |= pl, Un(e, t, s, n), t.child;
  }
  function As() {
    Va = !0;
  }
  function Qc(e, t) {
    (t.mode & Ge) === De && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Ut);
  }
  function Cr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), rb(), qs(t.lanes), Jn(n, t.childLanes) ? (OD(e, t), t.child) : null;
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
      return i === null ? (a.deletions = [e], a.flags |= Si) : i.push(e), n.flags |= Ut, n;
    }
  }
  function Im(e, t) {
    var n = e.lanes;
    return !!Jn(n, t);
  }
  function PT(e, t, n) {
    switch (t.tag) {
      case E:
        Eb(t), t.stateNode, Ll();
        break;
      case U:
        jy(t);
        break;
      case T: {
        var a = t.type;
        Ka(a) && lc(t);
        break;
      }
      case L:
        Fp(t, t.stateNode.containerInfo);
        break;
      case W: {
        var r = t.memoizedProps.value, i = t.type._context;
        Ny(t, i, r);
        break;
      }
      case G:
        {
          var l = Jn(n, t.childLanes);
          l && (t.flags |= et);
          {
            var s = t.stateNode;
            s.effectDuration = 0, s.passiveEffectDuration = 0;
          }
        }
        break;
      case le: {
        var c = t.memoizedState;
        if (c !== null) {
          if (c.dehydrated !== null)
            return Zr(t, Pl(_a.current)), t.flags |= tt, null;
          var h = t.child, v = h.childLanes;
          if (Jn(n, v))
            return Sb(e, t, n);
          Zr(t, Pl(_a.current));
          var D = Cr(e, t, n);
          return D !== null ? D.sibling : null;
        } else
          Zr(t, Pl(_a.current));
        break;
      }
      case re: {
        var C = (e.flags & tt) !== we, M = Jn(n, t.childLanes);
        if (C) {
          if (M)
            return Tb(e, t, n);
          t.flags |= tt;
        }
        var A = t.memoizedState;
        if (A !== null && (A.rendering = null, A.tail = null, A.lastEffect = null), Zr(t, _a.current), M)
          break;
        return null;
      }
      case Y:
      case k:
        return t.lanes = K, yb(e, t, n);
    }
    return Cr(e, t, n);
  }
  function _b(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return zT(e, t, Nh(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || rc() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        Va = !0;
      else {
        var i = Im(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & tt) === we)
          return Va = !1, PT(e, t, n);
        (e.flags & Kf) !== we ? Va = !0 : Va = !1;
      }
    } else if (Va = !1, fn() && fD(t)) {
      var l = t.index, s = dD();
      ry(t, s, l);
    }
    switch (t.lanes = K, t.tag) {
      case O:
        return ET(e, t, t.type, n);
      case ye: {
        var c = t.elementType;
        return bT(e, t, c, n);
      }
      case R: {
        var h = t.type, v = t.pendingProps, D = t.elementType === h ? v : Ma(h, v);
        return km(e, t, h, D, n);
      }
      case T: {
        var C = t.type, M = t.pendingProps, A = t.elementType === C ? M : Ma(C, M);
        return Nb(e, t, C, A, n);
      }
      case E:
        return vT(e, t, n);
      case U:
        return gT(e, t, n);
      case B:
        return yT(e, t);
      case le:
        return Sb(e, t, n);
      case L:
        return kT(e, t, n);
      case $: {
        var z = t.type, de = t.pendingProps, Re = t.elementType === z ? de : Ma(z, de);
        return hb(e, t, z, Re, n);
      }
      case se:
        return pT(e, t, n);
      case ie:
        return mT(e, t, n);
      case G:
        return hT(e, t, n);
      case W:
        return UT(e, t, n);
      case oe:
        return FT(e, t, n);
      case I: {
        var Ee = t.type, Ke = t.pendingProps, Ie = Ma(Ee, Ke);
        if (t.type !== t.elementType) {
          var j = Ee.propTypes;
          j && Ta(
            j,
            Ie,
            // Resolved for outer only
            "prop",
            Ze(Ee)
          );
        }
        return Ie = Ma(Ee.type, Ie), vb(e, t, Ee, Ie, n);
      }
      case H:
        return gb(e, t, t.type, t.pendingProps, n);
      case ee: {
        var P = t.type, w = t.pendingProps, J = t.elementType === P ? w : Ma(P, w);
        return NT(e, t, P, J, n);
      }
      case re:
        return Tb(e, t, n);
      case je:
        break;
      case Y:
        return yb(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function ql(e) {
    e.flags |= et;
  }
  function Ob(e) {
    e.flags |= Ri, e.flags |= Qf;
  }
  var Mb, Ym, Vb, Ab;
  Mb = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === U || r.tag === B)
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
  }, Vb = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, s = zp(), c = cC(l, n, i, a, r, s);
      t.updateQueue = c, c && ql(t);
    }
  }, Ab = function(e, t, n, a) {
    n !== a && ql(t);
  };
  function Ls(e, t) {
    if (!fn())
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
  function pn(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = K, a = we;
    if (t) {
      if ((e.mode & it) !== De) {
        for (var c = e.selfBaseDuration, h = e.child; h !== null; )
          n = Pe(n, Pe(h.lanes, h.childLanes)), a |= h.subtreeFlags & hr, a |= h.flags & hr, c += h.treeBaseDuration, h = h.sibling;
        e.treeBaseDuration = c;
      } else
        for (var v = e.child; v !== null; )
          n = Pe(n, Pe(v.lanes, v.childLanes)), a |= v.subtreeFlags & hr, a |= v.flags & hr, v.return = e, v = v.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & it) !== De) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, l = e.child; l !== null; )
          n = Pe(n, Pe(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, r += l.actualDuration, i += l.treeBaseDuration, l = l.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var s = e.child; s !== null; )
          n = Pe(n, Pe(s.lanes, s.childLanes)), a |= s.subtreeFlags, a |= s.flags, s.return = e, s = s.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function HT(e, t, n) {
    if (CD() && (t.mode & Ge) !== De && (t.flags & tt) === we)
      return fy(t), Ll(), t.flags |= pr | xu | kn, !1;
    var a = fc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (SD(t), pn(t), (t.mode & it) !== De) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Ll(), (t.flags & tt) === we && (t.memoizedState = null), t.flags |= et, pn(t), (t.mode & it) !== De) {
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
      case ye:
      case H:
      case R:
      case $:
      case se:
      case ie:
      case G:
      case oe:
      case I:
        return pn(t), null;
      case T: {
        var r = t.type;
        return Ka(r) && ic(t), pn(t), null;
      }
      case E: {
        var i = t.stateNode;
        if (zl(t), pp(t), Ip(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = fc(t);
          if (l)
            ql(t);
          else if (e !== null) {
            var s = e.memoizedState;
            // Check if this is a client root
            (!s.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & pr) !== we) && (t.flags |= ml, dy());
          }
        }
        return Ym(e, t), pn(t), null;
      }
      case U: {
        Pp(t);
        var c = Ty(), h = t.type;
        if (e !== null && t.stateNode != null)
          Vb(e, t, h, a, c), e.ref !== t.ref && Ob(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return pn(t), null;
          }
          var v = zp(), D = fc(t);
          if (D)
            ED(t, c, v) && ql(t);
          else {
            var C = oC(h, a, c, v, t);
            Mb(C, t, !1, !1), t.stateNode = C, uC(C, h, a, c) && ql(t);
          }
          t.ref !== null && Ob(t);
        }
        return pn(t), null;
      }
      case B: {
        var M = a;
        if (e && t.stateNode != null) {
          var A = e.memoizedProps;
          Ab(e, t, A, M);
        } else {
          if (typeof M != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var z = Ty(), de = zp(), Re = fc(t);
          Re ? xD(t) && ql(t) : t.stateNode = fC(M, z, de, t);
        }
        return pn(t), null;
      }
      case le: {
        Hl(t);
        var Ee = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var Ke = HT(e, t, Ee);
          if (!Ke)
            return t.flags & kn ? t : null;
        }
        if ((t.flags & tt) !== we)
          return t.lanes = n, (t.mode & it) !== De && hm(t), t;
        var Ie = Ee !== null, j = e !== null && e.memoizedState !== null;
        if (Ie !== j && Ie) {
          var P = t.child;
          if (P.flags |= Ci, (t.mode & Ge) !== De) {
            var w = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            w || Hp(_a.current, _y) ? Bj() : uh();
          }
        }
        var J = t.updateQueue;
        if (J !== null && (t.flags |= et), pn(t), (t.mode & it) !== De && Ie) {
          var ge = t.child;
          ge !== null && (t.treeBaseDuration -= ge.treeBaseDuration);
        }
        return null;
      }
      case L:
        return zl(t), Ym(e, t), e === null && rD(t.stateNode.containerInfo), pn(t), null;
      case W:
        var me = t.type._context;
        return Op(me, t), pn(t), null;
      case ee: {
        var Oe = t.type;
        return Ka(Oe) && ic(t), pn(t), null;
      }
      case re: {
        Hl(t);
        var Ue = t.memoizedState;
        if (Ue === null)
          return pn(t), null;
        var ot = (t.flags & tt) !== we, Xe = Ue.rendering;
        if (Xe === null)
          if (ot)
            Ls(Ue, !1);
          else {
            var Ot = Ij() && (e === null || (e.flags & tt) === we);
            if (!Ot)
              for (var Je = t.child; Je !== null; ) {
                var wt = Tc(Je);
                if (wt !== null) {
                  ot = !0, t.flags |= tt, Ls(Ue, !1);
                  var Tn = wt.updateQueue;
                  return Tn !== null && (t.updateQueue = Tn, t.flags |= et), t.subtreeFlags = we, MD(t, n), Zr(t, Bp(_a.current, xs)), t.child;
                }
                Je = Je.sibling;
              }
            Ue.tail !== null && nn() > nN() && (t.flags |= tt, ot = !0, Ls(Ue, !1), t.lanes = Av);
          }
        else {
          if (!ot) {
            var yn = Tc(Xe);
            if (yn !== null) {
              t.flags |= tt, ot = !0;
              var ra = yn.updateQueue;
              if (ra !== null && (t.updateQueue = ra, t.flags |= et), Ls(Ue, !0), Ue.tail === null && Ue.tailMode === "hidden" && !Xe.alternate && !fn())
                return pn(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            nn() * 2 - Ue.renderingStartTime > nN() && n !== Xn && (t.flags |= tt, ot = !0, Ls(Ue, !1), t.lanes = Av);
          }
          if (Ue.isBackwards)
            Xe.sibling = t.child, t.child = Xe;
          else {
            var Pn = Ue.last;
            Pn !== null ? Pn.sibling = Xe : t.child = Xe, Ue.last = Xe;
          }
        }
        if (Ue.tail !== null) {
          var Hn = Ue.tail;
          Ue.rendering = Hn, Ue.tail = Hn.sibling, Ue.renderingStartTime = nn(), Hn.sibling = null;
          var jn = _a.current;
          return ot ? jn = Bp(jn, xs) : jn = Pl(jn), Zr(t, jn), Hn;
        }
        return pn(t), null;
      }
      case je:
        break;
      case Y:
      case k: {
        sh(t);
        var _r = t.memoizedState, eo = _r !== null;
        if (e !== null) {
          var Xs = e.memoizedState, ar = Xs !== null;
          ar !== eo && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !ne && (t.flags |= Ci);
        }
        return !eo || (t.mode & Ge) === De ? pn(t) : Jn(nr, Xn) && (pn(t), t.subtreeFlags & (Ut | et) && (t.flags |= Ci)), null;
      }
      case Z:
        return null;
      case pe:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function BT(e, t, n) {
    switch (gp(t), t.tag) {
      case T: {
        var a = t.type;
        Ka(a) && ic(t);
        var r = t.flags;
        return r & kn ? (t.flags = r & ~kn | tt, (t.mode & it) !== De && hm(t), t) : null;
      }
      case E: {
        t.stateNode, zl(t), pp(t), Ip();
        var i = t.flags;
        return (i & kn) !== we && (i & tt) === we ? (t.flags = i & ~kn | tt, t) : null;
      }
      case U:
        return Pp(t), null;
      case le: {
        Hl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Ll();
        }
        var s = t.flags;
        return s & kn ? (t.flags = s & ~kn | tt, (t.mode & it) !== De && hm(t), t) : null;
      }
      case re:
        return Hl(t), null;
      case L:
        return zl(t), null;
      case W:
        var c = t.type._context;
        return Op(c, t), null;
      case Y:
      case k:
        return sh(t), null;
      case Z:
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
      case E: {
        t.stateNode, zl(t), pp(t), Ip();
        break;
      }
      case U: {
        Pp(t);
        break;
      }
      case L:
        zl(t);
        break;
      case le:
        Hl(t);
        break;
      case re:
        Hl(t);
        break;
      case W:
        var r = t.type._context;
        Op(r, t);
        break;
      case Y:
      case k:
        sh(t);
        break;
    }
  }
  var Ub = null;
  Ub = /* @__PURE__ */ new Set();
  var Xc = !1, mn = !1, $T = typeof WeakSet == "function" ? WeakSet : Set, be = null, Gl = null, Wl = null;
  function IT(e) {
    qf(null, function() {
      throw e;
    }), Gf();
  }
  var YT = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & it)
      try {
        er(), t.componentWillUnmount();
      } finally {
        Za(e);
      }
    else
      t.componentWillUnmount();
  };
  function Fb(e, t) {
    try {
      ni(Wt, e);
    } catch (n) {
      ft(e, t, n);
    }
  }
  function qm(e, t, n) {
    try {
      YT(e, n);
    } catch (a) {
      ft(e, t, a);
    }
  }
  function qT(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      ft(e, t, a);
    }
  }
  function zb(e, t) {
    try {
      Hb(e);
    } catch (n) {
      ft(e, t, n);
    }
  }
  function Kl(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function") {
        var a;
        try {
          if (Mt && xt && e.mode & it)
            try {
              er(), a = n(null);
            } finally {
              Za(e);
            }
          else
            a = n(null);
        } catch (r) {
          ft(e, t, r);
        }
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Fe(e));
      } else
        n.current = null;
  }
  function Jc(e, t, n) {
    try {
      n();
    } catch (a) {
      ft(e, t, a);
    }
  }
  var Pb = !1;
  function GT(e, t) {
    iC(e.containerInfo), be = t, WT();
    var n = Pb;
    return Pb = !1, n;
  }
  function WT() {
    for (; be !== null; ) {
      var e = be, t = e.child;
      (e.subtreeFlags & Zf) !== we && t !== null ? (t.return = e, be = t) : KT();
    }
  }
  function KT() {
    for (; be !== null; ) {
      var e = be;
      bt(e);
      try {
        QT(e);
      } catch (n) {
        ft(e, e.return, n);
      }
      tn();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, be = t;
        return;
      }
      be = e.return;
    }
  }
  function QT(e) {
    var t = e.alternate, n = e.flags;
    if ((n & ml) !== we) {
      switch (bt(e), e.tag) {
        case R:
        case $:
        case H:
          break;
        case T: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !Yi && (i.props !== e.memoizedProps && f("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Fe(e) || "instance"), i.state !== e.memoizedState && f("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Fe(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : Ma(e.type, a), r);
            {
              var s = Ub;
              l === void 0 && !s.has(e.type) && (s.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Fe(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case E: {
          {
            var c = e.stateNode;
            _C(c.containerInfo);
          }
          break;
        }
        case U:
        case B:
        case L:
        case ee:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      tn();
    }
  }
  function Aa(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, l = i;
      do {
        if ((l.tag & e) === e) {
          var s = l.destroy;
          l.destroy = void 0, s !== void 0 && ((e & dn) !== Gn ? fS(t) : (e & Wt) !== Gn && wv(t), (e & Qa) !== Gn && Ws(!0), Jc(t, n, s), (e & Qa) !== Gn && Ws(!1), (e & dn) !== Gn ? dS() : (e & Wt) !== Gn && _v());
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
          (e & dn) !== Gn ? uS(t) : (e & Wt) !== Gn && pS(t);
          var l = i.create;
          (e & Qa) !== Gn && Ws(!0), i.destroy = l(), (e & Qa) !== Gn && Ws(!1), (e & dn) !== Gn ? cS() : (e & Wt) !== Gn && mS();
          {
            var s = i.destroy;
            if (s !== void 0 && typeof s != "function") {
              var c = void 0;
              (i.tag & Wt) !== we ? c = "useLayoutEffect" : (i.tag & Qa) !== we ? c = "useInsertionEffect" : c = "useEffect";
              var h = void 0;
              s === null ? h = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof s.then == "function" ? h = `

It looks like you wrote ` + c + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + c + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : h = " You returned: " + s, f("%s must not return anything besides a function, which is used for clean-up.%s", c, h);
            }
          }
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function XT(e, t) {
    if ((t.flags & et) !== we)
      switch (t.tag) {
        case G: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = nb(), s = t.alternate === null ? "mount" : "update";
          tb() && (s = "nested-update"), typeof i == "function" && i(r, s, n, l);
          var c = t.return;
          e: for (; c !== null; ) {
            switch (c.tag) {
              case E:
                var h = c.stateNode;
                h.passiveEffectDuration += n;
                break e;
              case G:
                var v = c.stateNode;
                v.passiveEffectDuration += n;
                break e;
            }
            c = c.return;
          }
          break;
        }
      }
  }
  function JT(e, t, n, a) {
    if ((n.flags & _o) !== we)
      switch (n.tag) {
        case R:
        case $:
        case H: {
          if (!mn)
            if (n.mode & it)
              try {
                er(), ni(Wt | Gt, n);
              } finally {
                Za(n);
              }
            else
              ni(Wt | Gt, n);
          break;
        }
        case T: {
          var r = n.stateNode;
          if (n.flags & et && !mn)
            if (t === null)
              if (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Fe(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Fe(n) || "instance")), n.mode & it)
                try {
                  er(), r.componentDidMount();
                } finally {
                  Za(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : Ma(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Fe(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Fe(n) || "instance")), n.mode & it)
                try {
                  er(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Za(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var s = n.updateQueue;
          s !== null && (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Fe(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Fe(n) || "instance")), Dy(n, s, r));
          break;
        }
        case E: {
          var c = n.updateQueue;
          if (c !== null) {
            var h = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case U:
                  h = n.child.stateNode;
                  break;
                case T:
                  h = n.child.stateNode;
                  break;
              }
            Dy(n, c, h);
          }
          break;
        }
        case U: {
          var v = n.stateNode;
          if (t === null && n.flags & et) {
            var D = n.type, C = n.memoizedProps;
            vC(v, D, C);
          }
          break;
        }
        case B:
          break;
        case L:
          break;
        case G: {
          {
            var M = n.memoizedProps, A = M.onCommit, z = M.onRender, de = n.stateNode.effectDuration, Re = nb(), Ee = t === null ? "mount" : "update";
            tb() && (Ee = "nested-update"), typeof z == "function" && z(n.memoizedProps.id, Ee, n.actualDuration, n.treeBaseDuration, n.actualStartTime, Re);
            {
              typeof A == "function" && A(n.memoizedProps.id, Ee, de, Re), Kj(n);
              var Ke = n.return;
              e: for (; Ke !== null; ) {
                switch (Ke.tag) {
                  case E:
                    var Ie = Ke.stateNode;
                    Ie.effectDuration += de;
                    break e;
                  case G:
                    var j = Ke.stateNode;
                    j.effectDuration += de;
                    break e;
                }
                Ke = Ke.return;
              }
            }
          }
          break;
        }
        case le: {
          lj(e, n);
          break;
        }
        case re:
        case ee:
        case je:
        case Y:
        case k:
        case pe:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    mn || n.flags & Ri && Hb(n);
  }
  function ZT(e) {
    switch (e.tag) {
      case R:
      case $:
      case H: {
        if (e.mode & it)
          try {
            er(), Fb(e, e.return);
          } finally {
            Za(e);
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
            ft(e, e.return, l);
          }
        }
      } else if (a.tag === B) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? TC(i) : wC(i, a.memoizedProps);
          } catch (l) {
            ft(e, e.return, l);
          }
      } else if (!((a.tag === Y || a.tag === k) && a.memoizedState !== null && a !== e)) {
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
        case U:
          a = n;
          break;
        default:
          a = n;
      }
      if (typeof t == "function") {
        var r;
        if (e.mode & it)
          try {
            er(), r = t(a);
          } finally {
            Za(e);
          }
        else
          r = t(a);
        typeof r == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Fe(e));
      } else
        t.hasOwnProperty("current") || f("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Fe(e)), t.current = a;
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
    return e.tag === U || e.tag === E || e.tag === L;
  }
  function Ib(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || $b(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== U && t.tag !== B && t.tag !== Q; ) {
        if (t.flags & Ut || t.child === null || t.tag === L)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & Ut))
        return t.stateNode;
    }
  }
  function aj(e) {
    var t = nj(e);
    switch (t.tag) {
      case U: {
        var n = t.stateNode;
        t.flags & wo && (qg(n), t.flags &= ~wo);
        var a = Ib(e);
        Wm(e, a, n);
        break;
      }
      case E:
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
    var a = e.tag, r = a === U || a === B;
    if (r) {
      var i = e.stateNode;
      t ? xC(n, i, t) : NC(n, i);
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
    var a = e.tag, r = a === U || a === B;
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
  var hn = null, La = !1;
  function rj(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case U: {
            hn = a.stateNode, La = !1;
            break e;
          }
          case E: {
            hn = a.stateNode.containerInfo, La = !0;
            break e;
          }
          case L: {
            hn = a.stateNode.containerInfo, La = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (hn === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      Yb(e, t, n), hn = null, La = !1;
    }
    tj(n);
  }
  function ai(e, t, n) {
    for (var a = n.child; a !== null; )
      Yb(e, t, a), a = a.sibling;
  }
  function Yb(e, t, n) {
    switch (iS(n), n.tag) {
      case U:
        mn || Kl(n, t);
      case B: {
        {
          var a = hn, r = La;
          hn = null, ai(e, t, n), hn = a, La = r, hn !== null && (La ? RC(hn, n.stateNode) : SC(hn, n.stateNode));
        }
        return;
      }
      case Q: {
        hn !== null && (La ? CC(hn, n.stateNode) : ip(hn, n.stateNode));
        return;
      }
      case L: {
        {
          var i = hn, l = La;
          hn = n.stateNode.containerInfo, La = !0, ai(e, t, n), hn = i, La = l;
        }
        return;
      }
      case R:
      case $:
      case I:
      case H: {
        if (!mn) {
          var s = n.updateQueue;
          if (s !== null) {
            var c = s.lastEffect;
            if (c !== null) {
              var h = c.next, v = h;
              do {
                var D = v, C = D.destroy, M = D.tag;
                C !== void 0 && ((M & Qa) !== Gn ? Jc(n, t, C) : (M & Wt) !== Gn && (wv(n), n.mode & it ? (er(), Jc(n, t, C), Za(n)) : Jc(n, t, C), _v())), v = v.next;
              } while (v !== h);
            }
          }
        }
        ai(e, t, n);
        return;
      }
      case T: {
        if (!mn) {
          Kl(n, t);
          var A = n.stateNode;
          typeof A.componentWillUnmount == "function" && qm(n, t, A);
        }
        ai(e, t, n);
        return;
      }
      case je: {
        ai(e, t, n);
        return;
      }
      case Y: {
        if (
          // TODO: Remove this dead flag
          n.mode & Ge
        ) {
          var z = mn;
          mn = z || n.memoizedState !== null, ai(e, t, n), mn = z;
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
          if (n.add(a), Ca)
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
    Gl = n, Wl = e, bt(t), Gb(t, e), bt(t), Gl = null, Wl = null;
  }
  function ka(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          rj(e, t, i);
        } catch (c) {
          ft(i, t, c);
        }
      }
    var l = fu();
    if (t.subtreeFlags & ed)
      for (var s = t.child; s !== null; )
        bt(s), Gb(s, e), s = s.sibling;
    bt(l);
  }
  function Gb(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case R:
      case $:
      case I:
      case H: {
        if (ka(t, e), tr(e), r & et) {
          try {
            Aa(Qa | Gt, e, e.return), ni(Qa | Gt, e);
          } catch (Oe) {
            ft(e, e.return, Oe);
          }
          if (e.mode & it) {
            try {
              er(), Aa(Wt | Gt, e, e.return);
            } catch (Oe) {
              ft(e, e.return, Oe);
            }
            Za(e);
          } else
            try {
              Aa(Wt | Gt, e, e.return);
            } catch (Oe) {
              ft(e, e.return, Oe);
            }
        }
        return;
      }
      case T: {
        ka(t, e), tr(e), r & Ri && a !== null && Kl(a, a.return);
        return;
      }
      case U: {
        ka(t, e), tr(e), r & Ri && a !== null && Kl(a, a.return);
        {
          if (e.flags & wo) {
            var i = e.stateNode;
            try {
              qg(i);
            } catch (Oe) {
              ft(e, e.return, Oe);
            }
          }
          if (r & et) {
            var l = e.stateNode;
            if (l != null) {
              var s = e.memoizedProps, c = a !== null ? a.memoizedProps : s, h = e.type, v = e.updateQueue;
              if (e.updateQueue = null, v !== null)
                try {
                  gC(l, v, h, c, s, e);
                } catch (Oe) {
                  ft(e, e.return, Oe);
                }
            }
          }
        }
        return;
      }
      case B: {
        if (ka(t, e), tr(e), r & et) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var D = e.stateNode, C = e.memoizedProps, M = a !== null ? a.memoizedProps : C;
          try {
            yC(D, M, C);
          } catch (Oe) {
            ft(e, e.return, Oe);
          }
        }
        return;
      }
      case E: {
        if (ka(t, e), tr(e), r & et && a !== null) {
          var A = a.memoizedState;
          if (A.isDehydrated)
            try {
              $C(t.containerInfo);
            } catch (Oe) {
              ft(e, e.return, Oe);
            }
        }
        return;
      }
      case L: {
        ka(t, e), tr(e);
        return;
      }
      case le: {
        ka(t, e), tr(e);
        var z = e.child;
        if (z.flags & Ci) {
          var de = z.stateNode, Re = z.memoizedState, Ee = Re !== null;
          if (de.isHidden = Ee, Ee) {
            var Ke = z.alternate !== null && z.alternate.memoizedState !== null;
            Ke || Hj();
          }
        }
        if (r & et) {
          try {
            ij(e);
          } catch (Oe) {
            ft(e, e.return, Oe);
          }
          qb(e);
        }
        return;
      }
      case Y: {
        var Ie = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Ge
        ) {
          var j = mn;
          mn = j || Ie, ka(t, e), mn = j;
        } else
          ka(t, e);
        if (tr(e), r & Ci) {
          var P = e.stateNode, w = e.memoizedState, J = w !== null, ge = e;
          if (P.isHidden = J, J && !Ie && (ge.mode & Ge) !== De) {
            be = ge;
            for (var me = ge.child; me !== null; )
              be = me, uj(me), me = me.sibling;
          }
          ej(ge, J);
        }
        return;
      }
      case re: {
        ka(t, e), tr(e), r & et && qb(e);
        return;
      }
      case je:
        return;
      default: {
        ka(t, e), tr(e);
        return;
      }
    }
  }
  function tr(e) {
    var t = e.flags;
    if (t & Ut) {
      try {
        aj(e);
      } catch (n) {
        ft(e, e.return, n);
      }
      e.flags &= ~Ut;
    }
    t & mr && (e.flags &= ~mr);
  }
  function sj(e, t, n) {
    Gl = n, Wl = t, be = e, Wb(e, t, n), Gl = null, Wl = null;
  }
  function Wb(e, t, n) {
    for (var a = (e.mode & Ge) !== De; be !== null; ) {
      var r = be, i = r.child;
      if (r.tag === Y && a) {
        var l = r.memoizedState !== null, s = l || Xc;
        if (s) {
          Km(e, t, n);
          continue;
        } else {
          var c = r.alternate, h = c !== null && c.memoizedState !== null, v = h || mn, D = Xc, C = mn;
          Xc = s, mn = v, mn && !C && (be = r, cj(r));
          for (var M = i; M !== null; )
            be = M, Wb(
              M,
              // New root; bubble back up to here and stop.
              t,
              n
            ), M = M.sibling;
          be = r, Xc = D, mn = C, Km(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & _o) !== we && i !== null ? (i.return = r, be = i) : Km(e, t, n);
    }
  }
  function Km(e, t, n) {
    for (; be !== null; ) {
      var a = be;
      if ((a.flags & _o) !== we) {
        var r = a.alternate;
        bt(a);
        try {
          JT(t, r, a, n);
        } catch (l) {
          ft(a, a.return, l);
        }
        tn();
      }
      if (a === e) {
        be = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, be = i;
        return;
      }
      be = a.return;
    }
  }
  function uj(e) {
    for (; be !== null; ) {
      var t = be, n = t.child;
      switch (t.tag) {
        case R:
        case $:
        case I:
        case H: {
          if (t.mode & it)
            try {
              er(), Aa(Wt, t, t.return);
            } finally {
              Za(t);
            }
          else
            Aa(Wt, t, t.return);
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
        case Y: {
          var r = t.memoizedState !== null;
          if (r) {
            Kb(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, be = n) : Kb(e);
    }
  }
  function Kb(e) {
    for (; be !== null; ) {
      var t = be;
      if (t === e) {
        be = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, be = n;
        return;
      }
      be = t.return;
    }
  }
  function cj(e) {
    for (; be !== null; ) {
      var t = be, n = t.child;
      if (t.tag === Y) {
        var a = t.memoizedState !== null;
        if (a) {
          Qb(e);
          continue;
        }
      }
      n !== null ? (n.return = t, be = n) : Qb(e);
    }
  }
  function Qb(e) {
    for (; be !== null; ) {
      var t = be;
      bt(t);
      try {
        ZT(t);
      } catch (a) {
        ft(t, t.return, a);
      }
      if (tn(), t === e) {
        be = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, be = n;
        return;
      }
      be = t.return;
    }
  }
  function fj(e, t, n, a) {
    be = t, dj(t, e, n, a);
  }
  function dj(e, t, n, a) {
    for (; be !== null; ) {
      var r = be, i = r.child;
      (r.subtreeFlags & hl) !== we && i !== null ? (i.return = r, be = i) : pj(e, t, n, a);
    }
  }
  function pj(e, t, n, a) {
    for (; be !== null; ) {
      var r = be;
      if ((r.flags & Fr) !== we) {
        bt(r);
        try {
          mj(t, r, n, a);
        } catch (l) {
          ft(r, r.return, l);
        }
        tn();
      }
      if (r === e) {
        be = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, be = i;
        return;
      }
      be = r.return;
    }
  }
  function mj(e, t, n, a) {
    switch (t.tag) {
      case R:
      case $:
      case H: {
        if (t.mode & it) {
          mm();
          try {
            ni(dn | Gt, t);
          } finally {
            pm(t);
          }
        } else
          ni(dn | Gt, t);
        break;
      }
    }
  }
  function hj(e) {
    be = e, vj();
  }
  function vj() {
    for (; be !== null; ) {
      var e = be, t = e.child;
      if ((be.flags & Si) !== we) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            be = r, bj(r, e);
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
          be = e;
        }
      }
      (e.subtreeFlags & hl) !== we && t !== null ? (t.return = e, be = t) : gj();
    }
  }
  function gj() {
    for (; be !== null; ) {
      var e = be;
      (e.flags & Fr) !== we && (bt(e), yj(e), tn());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, be = t;
        return;
      }
      be = e.return;
    }
  }
  function yj(e) {
    switch (e.tag) {
      case R:
      case $:
      case H: {
        e.mode & it ? (mm(), Aa(dn | Gt, e, e.return), pm(e)) : Aa(dn | Gt, e, e.return);
        break;
      }
    }
  }
  function bj(e, t) {
    for (; be !== null; ) {
      var n = be;
      bt(n), Ej(n, t), tn();
      var a = n.child;
      a !== null ? (a.return = n, be = a) : Nj(e);
    }
  }
  function Nj(e) {
    for (; be !== null; ) {
      var t = be, n = t.sibling, a = t.return;
      if (Bb(t), t === e) {
        be = null;
        return;
      }
      if (n !== null) {
        n.return = a, be = n;
        return;
      }
      be = a;
    }
  }
  function Ej(e, t) {
    switch (e.tag) {
      case R:
      case $:
      case H: {
        e.mode & it ? (mm(), Aa(dn, e, t), pm(e)) : Aa(dn, e, t);
        break;
      }
    }
  }
  function xj(e) {
    switch (e.tag) {
      case R:
      case $:
      case H: {
        try {
          ni(Wt | Gt, e);
        } catch (n) {
          ft(e, e.return, n);
        }
        break;
      }
      case T: {
        var t = e.stateNode;
        try {
          t.componentDidMount();
        } catch (n) {
          ft(e, e.return, n);
        }
        break;
      }
    }
  }
  function Sj(e) {
    switch (e.tag) {
      case R:
      case $:
      case H: {
        try {
          ni(dn | Gt, e);
        } catch (t) {
          ft(e, e.return, t);
        }
        break;
      }
    }
  }
  function Rj(e) {
    switch (e.tag) {
      case R:
      case $:
      case H: {
        try {
          Aa(Wt | Gt, e, e.return);
        } catch (n) {
          ft(e, e.return, n);
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
      case $:
      case H:
        try {
          Aa(dn | Gt, e, e.return);
        } catch (t) {
          ft(e, e.return, t);
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
  var _j = Math.ceil, Qm = m.ReactCurrentDispatcher, Xm = m.ReactCurrentOwner, vn = m.ReactCurrentBatchConfig, Ua = m.ReactCurrentActQueue, Xt = (
    /*             */
    0
  ), Jb = (
    /*               */
    1
  ), gn = (
    /*                */
    2
  ), ha = (
    /*                */
    4
  ), Dr = 0, Us = 1, qi = 2, Zc = 3, Fs = 4, Zb = 5, Jm = 6, We = Xt, Fn = null, Ct = null, Jt = K, nr = K, Zm = Gr(K), Zt = Dr, zs = null, ef = K, Ps = K, tf = K, Hs = null, Wn = null, eh = 0, eN = 500, tN = 1 / 0, Oj = 500, Tr = null;
  function Bs() {
    tN = nn() + Oj;
  }
  function nN() {
    return tN;
  }
  var nf = !1, th = null, Ql = null, Gi = !1, ri = null, $s = K, nh = [], ah = null, Mj = 50, Is = 0, rh = null, ih = !1, af = !1, Vj = 50, Xl = 0, rf = null, Ys = mt, lf = K, aN = !1;
  function of() {
    return Fn;
  }
  function zn() {
    return (We & (gn | ha)) !== Xt ? nn() : (Ys !== mt || (Ys = nn()), Ys);
  }
  function ii(e) {
    var t = e.mode;
    if ((t & Ge) === De)
      return Ae;
    if ((We & gn) !== Xt && Jt !== K)
      return Uo(Jt);
    var n = jD() !== TD;
    if (n) {
      if (vn.transition !== null) {
        var a = vn.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return lf === rn && (lf = Fv()), lf;
    }
    var r = Da();
    if (r !== rn)
      return r;
    var i = dC();
    return i;
  }
  function Aj(e) {
    var t = e.mode;
    return (t & Ge) === De ? Ae : kS();
  }
  function en(e, t, n, a) {
    r1(), aN && f("useInsertionEffect must not schedule updates."), ih && (af = !0), Fo(e, n, a), (We & gn) !== K && e === Fn ? o1(t) : (Ca && Hv(e, t, n), s1(t), e === Fn && ((We & gn) === Xt && (Ps = Pe(Ps, n)), Zt === Fs && li(e, Jt)), Kn(e, a), n === Ae && We === Xt && (t.mode & Ge) === De && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Ua.isBatchingLegacy && (Bs(), ay()));
  }
  function Lj(e, t, n) {
    var a = e.current;
    a.lanes = t, Fo(e, t, n), Kn(e, n);
  }
  function kj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (We & gn) !== Xt
    );
  }
  function Kn(e, t) {
    var n = e.callbackNode;
    _S(e, t);
    var a = Tu(e, e === Fn ? Jt : K);
    if (a === K) {
      n !== null && bN(n), e.callbackNode = null, e.callbackPriority = rn;
      return;
    }
    var r = Oi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Ua.current !== null && n !== dh)) {
      n == null && i !== Ae && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && bN(n);
    var l;
    if (r === Ae)
      e.tag === Wr ? (Ua.isBatchingLegacy !== null && (Ua.didScheduleLegacyUpdate = !0), cD(lN.bind(null, e))) : ny(lN.bind(null, e)), Ua.current !== null ? Ua.current.push(Kr) : mC(function() {
        (We & (gn | ha)) === Xt && Kr();
      }), l = null;
    else {
      var s;
      switch (Iv(a)) {
        case Zn:
          s = Su;
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
      l = ph(s, rN.bind(null, e));
    }
    e.callbackPriority = r, e.callbackNode = l;
  }
  function rN(e, t) {
    if (eT(), Ys = mt, lf = K, (We & (gn | ha)) !== Xt)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = wr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Tu(e, e === Fn ? Jt : K);
    if (r === K)
      return null;
    var i = !ju(e, r) && !LS(e, r) && !t, l = i ? qj(e, r) : uf(e, r);
    if (l !== Dr) {
      if (l === qi) {
        var s = Rd(e);
        s !== K && (r = s, l = lh(e, s));
      }
      if (l === Us) {
        var c = zs;
        throw Wi(e, K), li(e, r), Kn(e, nn()), c;
      }
      if (l === Jm)
        li(e, r);
      else {
        var h = !ju(e, r), v = e.current.alternate;
        if (h && !Fj(v)) {
          if (l = uf(e, r), l === qi) {
            var D = Rd(e);
            D !== K && (r = D, l = lh(e, D));
          }
          if (l === Us) {
            var C = zs;
            throw Wi(e, K), li(e, r), Kn(e, nn()), C;
          }
        }
        e.finishedWork = v, e.finishedLanes = r, Uj(e, l, r);
      }
    }
    return Kn(e, nn()), e.callbackNode === n ? rN.bind(null, e) : null;
  }
  function lh(e, t) {
    var n = Hs;
    if (Ou(e)) {
      var a = Wi(e, t);
      a.flags |= pr, aD(e.containerInfo);
    }
    var r = uf(e, t);
    if (r !== qi) {
      var i = Wn;
      Wn = n, i !== null && iN(i);
    }
    return r;
  }
  function iN(e) {
    Wn === null ? Wn = e : Wn.push.apply(Wn, e);
  }
  function Uj(e, t, n) {
    switch (t) {
      case Dr:
      case Us:
        throw new Error("Root did not complete. This is a bug in React.");
      case qi: {
        Ki(e, Wn, Tr);
        break;
      }
      case Zc: {
        if (li(e, n), kv(n) && // do not delay if we're inside an act() scope
        !NN()) {
          var a = eh + eN - nn();
          if (a > 10) {
            var r = Tu(e, K);
            if (r !== K)
              break;
            var i = e.suspendedLanes;
            if (!El(i, n)) {
              zn(), Pv(e, i);
              break;
            }
            e.timeoutHandle = ap(Ki.bind(null, e, Wn, Tr), a);
            break;
          }
        }
        Ki(e, Wn, Tr);
        break;
      }
      case Fs: {
        if (li(e, n), AS(n))
          break;
        if (!NN()) {
          var l = jS(e, n), s = l, c = nn() - s, h = a1(c) - c;
          if (h > 10) {
            e.timeoutHandle = ap(Ki.bind(null, e, Wn, Tr), h);
            break;
          }
        }
        Ki(e, Wn, Tr);
        break;
      }
      case Zb: {
        Ki(e, Wn, Tr);
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
                if (!ta(l(), s))
                  return !1;
              } catch {
                return !1;
              }
            }
        }
      }
      var c = t.child;
      if (t.subtreeFlags & Wf && c !== null) {
        c.return = t, t = c;
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
    t = wu(t, tf), t = wu(t, Ps), FS(e, t);
  }
  function lN(e) {
    if (tT(), (We & (gn | ha)) !== Xt)
      throw new Error("Should not already be working.");
    wr();
    var t = Tu(e, K);
    if (!Jn(t, Ae))
      return Kn(e, nn()), null;
    var n = uf(e, t);
    if (e.tag !== Wr && n === qi) {
      var a = Rd(e);
      a !== K && (t = a, n = lh(e, a));
    }
    if (n === Us) {
      var r = zs;
      throw Wi(e, K), li(e, t), Kn(e, nn()), r;
    }
    if (n === Jm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Ki(e, Wn, Tr), Kn(e, nn()), null;
  }
  function zj(e, t) {
    t !== K && (jd(e, Pe(t, Ae)), Kn(e, nn()), (We & (gn | ha)) === Xt && (Bs(), Kr()));
  }
  function oh(e, t) {
    var n = We;
    We |= Jb;
    try {
      return e(t);
    } finally {
      We = n, We === Xt && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Ua.isBatchingLegacy && (Bs(), ay());
    }
  }
  function Pj(e, t, n, a, r) {
    var i = Da(), l = vn.transition;
    try {
      return vn.transition = null, ln(Zn), e(t, n, a, r);
    } finally {
      ln(i), vn.transition = l, We === Xt && Bs();
    }
  }
  function jr(e) {
    ri !== null && ri.tag === Wr && (We & (gn | ha)) === Xt && wr();
    var t = We;
    We |= Jb;
    var n = vn.transition, a = Da();
    try {
      return vn.transition = null, ln(Zn), e ? e() : void 0;
    } finally {
      ln(a), vn.transition = n, We = t, (We & (gn | ha)) === Xt && Kr();
    }
  }
  function oN() {
    return (We & (gn | ha)) !== Xt;
  }
  function sf(e, t) {
    Cn(Zm, nr, e), nr = Pe(nr, t);
  }
  function sh(e) {
    nr = Zm.current, Rn(Zm, e);
  }
  function Wi(e, t) {
    e.finishedWork = null, e.finishedLanes = K;
    var n = e.timeoutHandle;
    if (n !== rp && (e.timeoutHandle = rp, pC(n)), Ct !== null)
      for (var a = Ct.return; a !== null; ) {
        var r = a.alternate;
        kb(r, a), a = a.return;
      }
    Fn = e;
    var i = Qi(e.current, null);
    return Ct = i, Jt = nr = t, Zt = Dr, zs = null, ef = K, Ps = K, tf = K, Hs = null, Wn = null, LD(), wa.discardPendingWarnings(), i;
  }
  function sN(e, t) {
    do {
      var n = Ct;
      try {
        if (gc(), My(), tn(), Xm.current = null, n === null || n.return === null) {
          Zt = Us, zs = t, Ct = null;
          return;
        }
        if (Mt && n.mode & it && qc(n, !0), zt)
          if (gl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            vS(n, a, Jt);
          } else
            hS(n, t, Jt);
        cT(e, n.return, n, t, Jt), dN(n);
      } catch (r) {
        t = r, Ct === n && n !== null ? (n = n.return, Ct = n) : n = Ct;
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
    eh = nn();
  }
  function qs(e) {
    ef = Pe(e, ef);
  }
  function Bj() {
    Zt === Dr && (Zt = Zc);
  }
  function uh() {
    (Zt === Dr || Zt === Zc || Zt === qi) && (Zt = Fs), Fn !== null && (Cd(ef) || Cd(Ps)) && li(Fn, Jt);
  }
  function $j(e) {
    Zt !== Fs && (Zt = qi), Hs === null ? Hs = [e] : Hs.push(e);
  }
  function Ij() {
    return Zt === Dr;
  }
  function uf(e, t) {
    var n = We;
    We |= gn;
    var a = uN();
    if (Fn !== e || Jt !== t) {
      if (Ca) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, Jt), r.clear()), Bv(e, t);
      }
      Tr = $v(), Wi(e, t);
    }
    Ov(t);
    do
      try {
        Yj();
        break;
      } catch (i) {
        sN(e, i);
      }
    while (!0);
    if (gc(), We = n, cN(a), Ct !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Mv(), Fn = null, Jt = K, Zt;
  }
  function Yj() {
    for (; Ct !== null; )
      fN(Ct);
  }
  function qj(e, t) {
    var n = We;
    We |= gn;
    var a = uN();
    if (Fn !== e || Jt !== t) {
      if (Ca) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, Jt), r.clear()), Bv(e, t);
      }
      Tr = $v(), Bs(), Wi(e, t);
    }
    Ov(t);
    do
      try {
        Gj();
        break;
      } catch (i) {
        sN(e, i);
      }
    while (!0);
    return gc(), cN(a), We = n, Ct !== null ? (ES(), Dr) : (Mv(), Fn = null, Jt = K, Zt);
  }
  function Gj() {
    for (; Ct !== null && !Kx(); )
      fN(Ct);
  }
  function fN(e) {
    var t = e.alternate;
    bt(e);
    var n;
    (e.mode & it) !== De ? (dm(e), n = ch(t, e, nr), qc(e, !0)) : n = ch(t, e, nr), tn(), e.memoizedProps = e.pendingProps, n === null ? dN(e) : Ct = n, Xm.current = null;
  }
  function dN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & xu) === we) {
        bt(t);
        var r = void 0;
        if ((t.mode & it) === De ? r = Lb(n, t, nr) : (dm(t), r = Lb(n, t, nr), qc(t, !1)), tn(), r !== null) {
          Ct = r;
          return;
        }
      } else {
        var i = BT(n, t);
        if (i !== null) {
          i.flags &= $x, Ct = i;
          return;
        }
        if ((t.mode & it) !== De) {
          qc(t, !1);
          for (var l = t.actualDuration, s = t.child; s !== null; )
            l += s.actualDuration, s = s.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= xu, a.subtreeFlags = we, a.deletions = null;
        else {
          Zt = Jm, Ct = null;
          return;
        }
      }
      var c = t.sibling;
      if (c !== null) {
        Ct = c;
        return;
      }
      t = a, Ct = t;
    } while (t !== null);
    Zt === Dr && (Zt = Zb);
  }
  function Ki(e, t, n) {
    var a = Da(), r = vn.transition;
    try {
      vn.transition = null, ln(Zn), Wj(e, t, n, a);
    } finally {
      vn.transition = r, ln(a);
    }
    return null;
  }
  function Wj(e, t, n, a) {
    do
      wr();
    while (ri !== null);
    if (i1(), (We & (gn | ha)) !== Xt)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (sS(i), r === null)
      return jv(), null;
    if (i === K && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = K, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = rn;
    var l = Pe(r.lanes, r.childLanes);
    zS(e, l), e === Fn && (Fn = null, Ct = null, Jt = K), ((r.subtreeFlags & hl) !== we || (r.flags & hl) !== we) && (Gi || (Gi = !0, ah = n, ph(ji, function() {
      return wr(), null;
    })));
    var s = (r.subtreeFlags & (Zf | ed | _o | hl)) !== we, c = (r.flags & (Zf | ed | _o | hl)) !== we;
    if (s || c) {
      var h = vn.transition;
      vn.transition = null;
      var v = Da();
      ln(Zn);
      var D = We;
      We |= ha, Xm.current = null, GT(e, r), ab(), oj(e, r, i), lC(e.containerInfo), e.current = r, gS(i), sj(r, e, i), yS(), Qx(), We = D, ln(v), vn.transition = h;
    } else
      e.current = r, ab();
    var C = Gi;
    if (Gi ? (Gi = !1, ri = e, $s = i) : (Xl = 0, rf = null), l = e.pendingLanes, l === K && (Ql = null), C || vN(e.current, !1), aS(r.stateNode, a), Ca && e.memoizedUpdaters.clear(), Tj(), Kn(e, nn()), t !== null)
      for (var M = e.onRecoverableError, A = 0; A < t.length; A++) {
        var z = t[A], de = z.stack, Re = z.digest;
        M(z.value, {
          componentStack: de,
          digest: Re
        });
      }
    if (nf) {
      nf = !1;
      var Ee = th;
      throw th = null, Ee;
    }
    return Jn($s, Ae) && e.tag !== Wr && wr(), l = e.pendingLanes, Jn(l, Ae) ? (ZD(), e === rh ? Is++ : (Is = 0, rh = e)) : Is = 0, Kr(), jv(), null;
  }
  function wr() {
    if (ri !== null) {
      var e = Iv($s), t = $S(yr, e), n = vn.transition, a = Da();
      try {
        return vn.transition = null, ln(t), Qj();
      } finally {
        ln(a), vn.transition = n;
      }
    }
    return !1;
  }
  function Kj(e) {
    nh.push(e), Gi || (Gi = !0, ph(ji, function() {
      return wr(), null;
    }));
  }
  function Qj() {
    if (ri === null)
      return !1;
    var e = ah;
    ah = null;
    var t = ri, n = $s;
    if (ri = null, $s = K, (We & (gn | ha)) !== Xt)
      throw new Error("Cannot flush passive effects while already rendering.");
    ih = !0, af = !1, bS(n);
    var a = We;
    We |= ha, hj(t.current), fj(t, t.current, n, e);
    {
      var r = nh;
      nh = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        XT(t, l);
      }
    }
    NS(), vN(t.current, !0), We = a, Kr(), af ? t === rf ? Xl++ : (Xl = 0, rf = t) : Xl = 0, ih = !1, af = !1, rS(t);
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
    nf || (nf = !0, th = e);
  }
  var Zj = Jj;
  function mN(e, t, n) {
    var a = Ii(n, t), r = fb(e, a, Ae), i = Xr(e, r, Ae), l = zn();
    i !== null && (Fo(i, Ae, l), Kn(i, l));
  }
  function ft(e, t, n) {
    if (IT(n), Ws(!1), e.tag === E) {
      mN(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === E) {
        mN(a, e, n);
        return;
      } else if (a.tag === T) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !pN(i)) {
          var l = Ii(n, e), s = _m(a, l, Ae), c = Xr(a, s, Ae), h = zn();
          c !== null && (Fo(c, Ae, h), Kn(c, h));
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
    var r = zn();
    Pv(e, n), u1(e), Fn === e && El(Jt, n) && (Zt === Fs || Zt === Zc && kv(Jt) && nn() - eh < eN ? Wi(e, K) : tf = Pe(tf, n)), Kn(e, r);
  }
  function hN(e, t) {
    t === rn && (t = Aj(e));
    var n = zn(), a = qn(e, t);
    a !== null && (Fo(a, t, n), Kn(a, n));
  }
  function t1(e) {
    var t = e.memoizedState, n = rn;
    t !== null && (n = t.retryLane), hN(e, n);
  }
  function n1(e, t) {
    var n = rn, a;
    switch (e.tag) {
      case le:
        a = e.stateNode;
        var r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case re:
        a = e.stateNode;
        break;
      default:
        throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
    }
    a !== null && a.delete(t), hN(e, n);
  }
  function a1(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : _j(e / 1960) * 1960;
  }
  function r1() {
    if (Is > Mj)
      throw Is = 0, rh = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Xl > Vj && (Xl = 0, rf = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function i1() {
    wa.flushLegacyContextWarning(), wa.flushPendingUnsafeLifecycleWarnings();
  }
  function vN(e, t) {
    bt(e), cf(e, zr, Rj), t && cf(e, Jf, Cj), cf(e, zr, xj), t && cf(e, Jf, Sj), tn();
  }
  function cf(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== we ? a = a.child : ((a.flags & t) !== we && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var ff = null;
  function gN(e) {
    {
      if ((We & gn) !== Xt || !(e.mode & Ge))
        return;
      var t = e.tag;
      if (t !== O && t !== E && t !== T && t !== R && t !== $ && t !== I && t !== H)
        return;
      var n = Fe(e) || "ReactComponent";
      if (ff !== null) {
        if (ff.has(n))
          return;
        ff.add(n);
      } else
        ff = /* @__PURE__ */ new Set([n]);
      var a = Vn;
      try {
        bt(e), f("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? bt(e) : tn();
      }
    }
  }
  var ch;
  {
    var l1 = null;
    ch = function(e, t, n) {
      var a = CN(l1, t);
      try {
        return _b(e, t, n);
      } catch (i) {
        if (yD() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (gc(), My(), kb(e, t), CN(t, a), t.mode & it && dm(t), qf(null, _b, null, e, t, n), Px()) {
          var r = Gf();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var yN = !1, fh;
  fh = /* @__PURE__ */ new Set();
  function o1(e) {
    if (bi && !QD())
      switch (e.tag) {
        case R:
        case $:
        case H: {
          var t = Ct && Fe(Ct) || "Unknown", n = t;
          if (!fh.has(n)) {
            fh.add(n);
            var a = Fe(e) || "Unknown";
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
    if (Ca) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        Hv(e, a, t);
      });
    }
  }
  var dh = {};
  function ph(e, t) {
    {
      var n = Ua.current;
      return n !== null ? (n.push(t), dh) : Tv(e, t);
    }
  }
  function bN(e) {
    if (e !== dh)
      return Wx(e);
  }
  function NN() {
    return Ua.current !== null;
  }
  function s1(e) {
    {
      if (e.mode & Ge) {
        if (!Xb())
          return;
      } else if (!wj() || We !== Xt || e.tag !== R && e.tag !== $ && e.tag !== H)
        return;
      if (Ua.current === null) {
        var t = Vn;
        try {
          bt(e), f(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Fe(e));
        } finally {
          t ? bt(e) : tn();
        }
      }
    }
  }
  function u1(e) {
    e.tag !== Wr && Xb() && Ua.current === null && f(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

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
  var va = null, Jl = null, c1 = function(e) {
    va = e;
  };
  function Zl(e) {
    {
      if (va === null)
        return e;
      var t = va(e);
      return t === void 0 ? e : t.current;
    }
  }
  function mh(e) {
    return Zl(e);
  }
  function hh(e) {
    {
      if (va === null)
        return e;
      var t = va(e);
      if (t === void 0) {
        if (e != null && typeof e.render == "function") {
          var n = Zl(e.render);
          if (e.render !== n) {
            var a = {
              $$typeof: Se,
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
      if (va === null)
        return !1;
      var n = e.elementType, a = t.type, r = !1, i = typeof a == "object" && a !== null ? a.$$typeof : null;
      switch (e.tag) {
        case T: {
          typeof a == "function" && (r = !0);
          break;
        }
        case R: {
          (typeof a == "function" || i === Ce) && (r = !0);
          break;
        }
        case $: {
          (i === Se || i === Ce) && (r = !0);
          break;
        }
        case I:
        case H: {
          (i === ze || i === Ce) && (r = !0);
          break;
        }
        default:
          return !1;
      }
      if (r) {
        var l = va(n);
        if (l !== void 0 && l === va(a))
          return !0;
      }
      return !1;
    }
  }
  function xN(e) {
    {
      if (va === null || typeof WeakSet != "function")
        return;
      Jl === null && (Jl = /* @__PURE__ */ new WeakSet()), Jl.add(e);
    }
  }
  var f1 = function(e, t) {
    {
      if (va === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      wr(), jr(function() {
        vh(e.current, a, n);
      });
    }
  }, d1 = function(e, t) {
    {
      if (e.context !== na)
        return;
      wr(), jr(function() {
        Ks(t, e, null, null);
      });
    }
  };
  function vh(e, t, n) {
    {
      var a = e.alternate, r = e.child, i = e.sibling, l = e.tag, s = e.type, c = null;
      switch (l) {
        case R:
        case H:
        case T:
          c = s;
          break;
        case $:
          c = s.render;
          break;
      }
      if (va === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var h = !1, v = !1;
      if (c !== null) {
        var D = va(c);
        D !== void 0 && (n.has(D) ? v = !0 : t.has(D) && (l === T ? v = !0 : h = !0));
      }
      if (Jl !== null && (Jl.has(e) || a !== null && Jl.has(a)) && (v = !0), v && (e._debugNeedsRemount = !0), v || h) {
        var C = qn(e, Ae);
        C !== null && en(C, e, Ae, mt);
      }
      r !== null && !v && vh(r, t, n), i !== null && vh(i, t, n);
    }
  }
  var p1 = function(e, t) {
    {
      var n = /* @__PURE__ */ new Set(), a = new Set(t.map(function(r) {
        return r.current;
      }));
      return gh(e.current, a, n), n;
    }
  };
  function gh(e, t, n) {
    {
      var a = e.child, r = e.sibling, i = e.tag, l = e.type, s = null;
      switch (i) {
        case R:
        case H:
        case T:
          s = l;
          break;
        case $:
          s = l.render;
          break;
      }
      var c = !1;
      s !== null && t.has(s) && (c = !0), c ? m1(e, n) : a !== null && gh(a, t, n), r !== null && gh(r, t, n);
    }
  }
  function m1(e, t) {
    {
      var n = h1(e, t);
      if (n)
        return;
      for (var a = e; ; ) {
        switch (a.tag) {
          case U:
            t.add(a.stateNode);
            return;
          case L:
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
  function h1(e, t) {
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
  var yh;
  {
    yh = !1;
    try {
      var SN = Object.preventExtensions({});
    } catch {
      yh = !0;
    }
  }
  function v1(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = we, this.subtreeFlags = we, this.deletions = null, this.lanes = K, this.childLanes = K, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !yh && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var aa = function(e, t, n, a) {
    return new v1(e, t, n, a);
  };
  function bh(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function g1(e) {
    return typeof e == "function" && !bh(e) && e.defaultProps === void 0;
  }
  function y1(e) {
    if (typeof e == "function")
      return bh(e) ? T : R;
    if (e != null) {
      var t = e.$$typeof;
      if (t === Se)
        return $;
      if (t === ze)
        return I;
    }
    return O;
  }
  function Qi(e, t) {
    var n = e.alternate;
    n === null ? (n = aa(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = we, n.subtreeFlags = we, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & hr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case O:
      case R:
      case H:
        n.type = Zl(e.type);
        break;
      case T:
        n.type = mh(e.type);
        break;
      case $:
        n.type = hh(e.type);
        break;
    }
    return n;
  }
  function b1(e, t) {
    e.flags &= hr | Ut;
    var n = e.alternate;
    if (n === null)
      e.childLanes = K, e.lanes = t, e.child = null, e.subtreeFlags = we, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
    else {
      e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = we, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type;
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
    return e === oc ? (a = Ge, t === !0 && (a |= jt, a |= qa)) : a = De, Ca && (a |= it), aa(E, null, null, a);
  }
  function Nh(e, t, n, a, r, i) {
    var l = O, s = e;
    if (typeof e == "function")
      bh(e) ? (l = T, s = mh(s)) : s = Zl(s);
    else if (typeof e == "string")
      l = U;
    else
      e: switch (e) {
        case Ba:
          return oi(n.children, r, i, t);
        case pi:
          l = ie, r |= jt, (r & Ge) !== De && (r |= qa);
          break;
        case x:
          return E1(n, r, i, t);
        case Ye:
          return x1(n, r, i, t);
        case Ve:
          return S1(n, r, i, t);
        case gt:
          return RN(n, r, i, t);
        case xn:
        case Yt:
        case $a:
        case xa:
        case vt:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case X:
                l = W;
                break e;
              case fe:
                l = oe;
                break e;
              case Se:
                l = $, s = hh(s);
                break e;
              case ze:
                l = I;
                break e;
              case Ce:
                l = ye, s = null;
                break e;
            }
          var c = "";
          {
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (c += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var h = a ? Fe(a) : null;
            h && (c += `

Check the render method of \`` + h + "`.");
          }
          throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + c));
        }
      }
    var v = aa(l, n, t, r);
    return v.elementType = e, v.type = s, v.lanes = i, v._debugOwner = a, v;
  }
  function Eh(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, s = Nh(r, i, l, a, t, n);
    return s._debugSource = e._source, s._debugOwner = e._owner, s;
  }
  function oi(e, t, n, a) {
    var r = aa(se, e, a, t);
    return r.lanes = n, r;
  }
  function E1(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = aa(G, e, a, t | it);
    return r.elementType = x, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function x1(e, t, n, a) {
    var r = aa(le, e, a, t);
    return r.elementType = Ye, r.lanes = n, r;
  }
  function S1(e, t, n, a) {
    var r = aa(re, e, a, t);
    return r.elementType = Ve, r.lanes = n, r;
  }
  function RN(e, t, n, a) {
    var r = aa(Y, e, a, t);
    r.elementType = gt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function xh(e, t, n) {
    var a = aa(B, e, null, t);
    return a.lanes = n, a;
  }
  function R1() {
    var e = aa(U, null, null, De);
    return e.elementType = "DELETED", e;
  }
  function C1(e) {
    var t = aa(Q, null, null, De);
    return t.stateNode = e, t;
  }
  function Sh(e, t, n) {
    var a = e.children !== null ? e.children : [], r = aa(L, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function CN(e, t) {
    return e === null && (e = aa(O, null, null, De)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function D1(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = rp, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = rn, this.eventTimes = Td(K), this.expirationTimes = Td(mt), this.pendingLanes = K, this.suspendedLanes = K, this.pingedLanes = K, this.expiredLanes = K, this.mutableReadLanes = K, this.finishedLanes = K, this.entangledLanes = K, this.entanglements = Td(K), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
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
  function DN(e, t, n, a, r, i, l, s, c, h) {
    var v = new D1(e, t, n, s, c), D = N1(t, i);
    v.current = D, D.stateNode = v;
    {
      var C = {
        element: a,
        isDehydrated: n,
        cache: null,
        // not enabled yet
        transitions: null,
        pendingSuspenseBoundaries: null
      };
      D.memoizedState = C;
    }
    return kp(D), v;
  }
  var Rh = "18.3.1";
  function T1(e, t, n) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    return wn(a), {
      // This tag allow us to uniquely identify this as a React Portal
      $$typeof: Qn,
      key: a == null ? null : "" + a,
      children: e,
      containerInfo: t,
      implementation: n
    };
  }
  var Ch, Dh;
  Ch = !1, Dh = {};
  function TN(e) {
    if (!e)
      return na;
    var t = dl(e), n = uD(t);
    if (t.tag === T) {
      var a = t.type;
      if (Ka(a))
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
      var r = Rv(n);
      if (r === null)
        return null;
      if (r.mode & jt) {
        var i = Fe(n) || "Component";
        if (!Dh[i]) {
          Dh[i] = !0;
          var l = Vn;
          try {
            bt(r), n.mode & jt ? f("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : f("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            l ? bt(l) : tn();
          }
        }
      }
      return r.stateNode;
    }
  }
  function jN(e, t, n, a, r, i, l, s) {
    var c = !1, h = null;
    return DN(e, t, c, h, n, a, r, i, l);
  }
  function wN(e, t, n, a, r, i, l, s, c, h) {
    var v = !0, D = DN(n, a, v, e, r, i, l, s, c);
    D.context = TN(null);
    var C = D.current, M = zn(), A = ii(C), z = Rr(M, A);
    return z.callback = t ?? null, Xr(C, z, A), Lj(D, A, M), D;
  }
  function Ks(e, t, n, a) {
    nS(t, e);
    var r = t.current, i = zn(), l = ii(r);
    xS(l);
    var s = TN(n);
    t.context === null ? t.context = s : t.pendingContext = s, bi && Vn !== null && !Ch && (Ch = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Fe(Vn) || "Unknown"));
    var c = Rr(i, l);
    c.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), c.callback = a);
    var h = Xr(r, c, l);
    return h !== null && (en(h, r, l, i), xc(h, r, l)), l;
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
      case E: {
        var t = e.stateNode;
        if (Ou(t)) {
          var n = OS(t);
          zj(t, n);
        }
        break;
      }
      case le: {
        jr(function() {
          var r = qn(e, Ae);
          if (r !== null) {
            var i = zn();
            en(r, e, Ae, i);
          }
        });
        var a = Ae;
        Th(e, a);
        break;
      }
    }
  }
  function _N(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = US(n.retryLane, t));
  }
  function Th(e, t) {
    _N(e, t);
    var n = e.alternate;
    n && _N(n, t);
  }
  function _1(e) {
    if (e.tag === le) {
      var t = Ao, n = qn(e, t);
      if (n !== null) {
        var a = zn();
        en(n, e, t, a);
      }
      Th(e, t);
    }
  }
  function O1(e) {
    if (e.tag === le) {
      var t = ii(e), n = qn(e, t);
      if (n !== null) {
        var a = zn();
        en(n, e, t, a);
      }
      Th(e, t);
    }
  }
  function ON(e) {
    var t = Gx(e);
    return t === null ? null : t.stateNode;
  }
  var MN = function(e) {
    return null;
  };
  function M1(e) {
    return MN(e);
  }
  var VN = function(e) {
    return !1;
  };
  function V1(e) {
    return VN(e);
  }
  var AN = null, LN = null, kN = null, UN = null, FN = null, zN = null, PN = null, HN = null, BN = null;
  {
    var $N = function(e, t, n) {
      var a = t[n], r = $e(e) ? e.slice() : Be({}, e);
      return n + 1 === t.length ? ($e(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = $N(e[a], t, n + 1), r);
    }, IN = function(e, t) {
      return $N(e, t, 0);
    }, YN = function(e, t, n, a) {
      var r = t[a], i = $e(e) ? e.slice() : Be({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], $e(i) ? i.splice(r, 1) : delete i[r];
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
      var r = t[n], i = $e(e) ? e.slice() : Be({}, e);
      return i[r] = GN(e[r], t, n + 1, a), i;
    }, WN = function(e, t, n) {
      return GN(e, t, 0, n);
    }, jh = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    AN = function(e, t, n, a) {
      var r = jh(e, t);
      if (r !== null) {
        var i = WN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Be({}, e.memoizedProps);
        var l = qn(e, Ae);
        l !== null && en(l, e, Ae, mt);
      }
    }, LN = function(e, t, n) {
      var a = jh(e, t);
      if (a !== null) {
        var r = IN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = Be({}, e.memoizedProps);
        var i = qn(e, Ae);
        i !== null && en(i, e, Ae, mt);
      }
    }, kN = function(e, t, n, a) {
      var r = jh(e, t);
      if (r !== null) {
        var i = qN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Be({}, e.memoizedProps);
        var l = qn(e, Ae);
        l !== null && en(l, e, Ae, mt);
      }
    }, UN = function(e, t, n) {
      e.pendingProps = WN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = qn(e, Ae);
      a !== null && en(a, e, Ae, mt);
    }, FN = function(e, t) {
      e.pendingProps = IN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = qn(e, Ae);
      n !== null && en(n, e, Ae, mt);
    }, zN = function(e, t, n) {
      e.pendingProps = qN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = qn(e, Ae);
      a !== null && en(a, e, Ae, mt);
    }, PN = function(e) {
      var t = qn(e, Ae);
      t !== null && en(t, e, Ae, mt);
    }, HN = function(e) {
      MN = e;
    }, BN = function(e) {
      VN = e;
    };
  }
  function A1(e) {
    var t = Rv(e);
    return t === null ? null : t.stateNode;
  }
  function L1(e) {
    return null;
  }
  function k1() {
    return Vn;
  }
  function U1(e) {
    var t = e.findFiberByHostInstance, n = m.ReactCurrentDispatcher;
    return tS({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: AN,
      overrideHookStateDeletePath: LN,
      overrideHookStateRenamePath: kN,
      overrideProps: UN,
      overridePropsDeletePath: FN,
      overridePropsRenamePath: zN,
      setErrorHandler: HN,
      setSuspenseHandler: BN,
      scheduleUpdate: PN,
      currentDispatcherRef: n,
      findHostInstanceByFiber: A1,
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
      reconcilerVersion: Rh
    });
  }
  var KN = typeof reportError == "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : function(e) {
    console.error(e);
  };
  function wh(e) {
    this._internalRoot = e;
  }
  pf.prototype.render = wh.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw new Error("Cannot update an unmounted root.");
    {
      typeof arguments[1] == "function" ? f("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : mf(arguments[1]) ? f("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && f("You passed a second argument to root.render(...) but it only accepts one argument.");
      var n = t.containerInfo;
      if (n.nodeType !== kt) {
        var a = ON(t.current);
        a && a.parentNode !== n && f("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
      }
    }
    Ks(e, t, null, null);
  }, pf.prototype.unmount = wh.prototype.unmount = function() {
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
    t != null && (t.hydrate ? S("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === sa && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = jN(e, oc, null, n, a, r, i);
    ec(l.current, e);
    var s = e.nodeType === kt ? e.parentNode : e;
    return ts(s), new wh(l);
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
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, s = "", c = KN;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onRecoverableError !== void 0 && (c = n.onRecoverableError));
    var h = wN(t, null, e, oc, a, i, l, s, c);
    if (ec(h.current, e), ts(e), r)
      for (var v = 0; v < r.length; v++) {
        var D = r[v];
        ID(h, D);
      }
    return new pf(h);
  }
  function mf(e) {
    return !!(e && (e.nodeType === In || e.nodeType === dr || e.nodeType === Lf));
  }
  function Qs(e) {
    return !!(e && (e.nodeType === In || e.nodeType === dr || e.nodeType === Lf || e.nodeType === kt && e.nodeValue === " react-mount-point-unstable "));
  }
  function QN(e) {
    e.nodeType === In && e.tagName && e.tagName.toUpperCase() === "BODY" && f("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), ds(e) && (e._reactRootContainer ? f("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : f("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var H1 = m.ReactCurrentOwner, XN;
  XN = function(e) {
    if (e._reactRootContainer && e.nodeType !== kt) {
      var t = ON(e._reactRootContainer.current);
      t && t.parentNode !== e && f("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = _h(e), r = !!(a && qr(a));
    r && !n && f("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === In && e.tagName && e.tagName.toUpperCase() === "BODY" && f("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function _h(e) {
    return e ? e.nodeType === dr ? e.documentElement : e.firstChild : null;
  }
  function JN() {
  }
  function B1(e, t, n, a, r) {
    if (r) {
      if (typeof a == "function") {
        var i = a;
        a = function() {
          var C = df(l);
          i.call(C);
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
      var s = e.nodeType === kt ? e.parentNode : e;
      return ts(s), jr(), l;
    } else {
      for (var c; c = e.lastChild; )
        e.removeChild(c);
      if (typeof a == "function") {
        var h = a;
        a = function() {
          var C = df(v);
          h.call(C);
        };
      }
      var v = jN(
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
      e._reactRootContainer = v, ec(v.current, e);
      var D = e.nodeType === kt ? e.parentNode : e;
      return ts(D), jr(function() {
        Ks(t, v, n, a);
      }), v;
    }
  }
  function $1(e, t) {
    e !== null && typeof e != "function" && f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function hf(e, t, n, a, r) {
    XN(n), $1(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = B1(n, t, e, r, a);
    else {
      if (l = i, typeof r == "function") {
        var s = r;
        r = function() {
          var c = df(l);
          s.call(c);
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
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ze(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === In ? e : j1(e, "findDOMNode");
  }
  function Y1(e, t, n) {
    if (f("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = ds(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return hf(null, e, t, !0, n);
  }
  function q1(e, t, n) {
    if (f("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = ds(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return hf(null, e, t, !1, n);
  }
  function G1(e, t, n, a) {
    if (f("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !Hx(e))
      throw new Error("parentComponent must be a valid React Component");
    return hf(e, t, n, !1, a);
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
        var n = _h(e), a = n && !qr(n);
        a && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
      }
      return jr(function() {
        hf(null, null, e, !1, function() {
          e._reactRootContainer = null, Kg(e);
        });
      }), !0;
    } else {
      {
        var r = _h(e), i = !!(r && qr(r)), l = e.nodeType === In && Qs(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  IS(w1), qS(_1), GS(O1), WS(Da), KS(HS), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), _x(QR), Vx(oh, Pj, jr);
  function K1(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!mf(t))
      throw new Error("Target container is not a DOM element.");
    return T1(e, t, null, n);
  }
  function Q1(e, t, n, a) {
    return G1(e, t, n, a);
  }
  var Oh = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [qr, _l, tc, fv, dv, oh]
  };
  function X1(e, t) {
    return Oh.usingClientEntryPoint || f('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), F1(e, t);
  }
  function J1(e, t, n) {
    return Oh.usingClientEntryPoint || f('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), P1(e, t, n);
  }
  function Z1(e) {
    return oN() && f("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), jr(e);
  }
  var ew = U1({
    findFiberByHostInstance: Li,
    bundleType: 1,
    version: Rh,
    rendererPackageName: "react-dom"
  });
  if (!ew && $t && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var tE = window.location.protocol;
    /^(https?|file):$/.test(tE) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (tE === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  ia.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Oh, ia.createPortal = K1, ia.createRoot = X1, ia.findDOMNode = I1, ia.flushSync = Z1, ia.hydrate = Y1, ia.hydrateRoot = J1, ia.render = q1, ia.unmountComponentAtNode = W1, ia.unstable_batchedUpdates = oh, ia.unstable_renderSubtreeIntoContainer = Q1, ia.version = Rh, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
bE.exports = ia;
var uw = bE.exports, xE, nE = uw;
{
  var aE = nE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  xE = function(o, d) {
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
function Js() {
  return Js = Object.assign ? Object.assign.bind() : function(o) {
    for (var d = 1; d < arguments.length; d++) {
      var m = arguments[d];
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
  function d(g, y) {
    let {
      pathname: S,
      search: f,
      hash: _
    } = g.location;
    return Lh(
      "",
      {
        pathname: S,
        search: f,
        hash: _
      },
      // state defaults to `null` because `window.history.state` does
      y.state && y.state.usr || null,
      y.state && y.state.key || "default"
    );
  }
  function m(g, y) {
    return typeof y == "string" ? y : Zs(y);
  }
  return dw(d, m, null, o);
}
function Et(o, d) {
  if (o === !1 || o === null || typeof o > "u")
    throw new Error(d);
}
function Fa(o, d) {
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
function Lh(o, d, m, g) {
  return m === void 0 && (m = null), Js({
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
function Zs(o) {
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
    v5Compat: S = !1
  } = g, f = y.history, _ = si.Pop, R = null, T = O();
  T == null && (T = 0, f.replaceState(Js({}, f.state, {
    idx: T
  }), ""));
  function O() {
    return (f.state || {
      idx: null
    }).idx;
  }
  function E() {
    _ = si.Pop;
    let ie = O(), oe = ie == null ? null : ie - T;
    T = ie, R && R({
      action: _,
      location: se.location,
      delta: oe
    });
  }
  function L(ie, oe) {
    _ = si.Push;
    let W = Lh(se.location, ie, oe);
    T = O() + 1;
    let $ = iE(W, T), G = se.createHref(W);
    try {
      f.pushState($, "", G);
    } catch (le) {
      if (le instanceof DOMException && le.name === "DataCloneError")
        throw le;
      y.location.assign(G);
    }
    S && R && R({
      action: _,
      location: se.location,
      delta: 1
    });
  }
  function U(ie, oe) {
    _ = si.Replace;
    let W = Lh(se.location, ie, oe);
    T = O();
    let $ = iE(W, T), G = se.createHref(W);
    f.replaceState($, "", G), S && R && R({
      action: _,
      location: se.location,
      delta: 0
    });
  }
  function B(ie) {
    let oe = y.location.origin !== "null" ? y.location.origin : y.location.href, W = typeof ie == "string" ? ie : Zs(ie);
    return W = W.replace(/ $/, "%20"), Et(oe, "No window.location.(origin|href) available to create URL for href: " + W), new URL(W, oe);
  }
  let se = {
    get action() {
      return _;
    },
    get location() {
      return o(y, f);
    },
    listen(ie) {
      if (R)
        throw new Error("A history only accepts one active listener");
      return y.addEventListener(rE, E), R = ie, () => {
        y.removeEventListener(rE, E), R = null;
      };
    },
    createHref(ie) {
      return d(y, ie);
    },
    createURL: B,
    encodeLocation(ie) {
      let oe = B(ie);
      return {
        pathname: oe.pathname,
        search: oe.search,
        hash: oe.hash
      };
    },
    push: L,
    replace: U,
    go(ie) {
      return f.go(ie);
    }
  };
  return se;
}
var lE;
(function(o) {
  o.data = "data", o.deferred = "deferred", o.redirect = "redirect", o.error = "error";
})(lE || (lE = {}));
function pw(o, d, m) {
  return m === void 0 && (m = "/"), mw(o, d, m);
}
function mw(o, d, m, g) {
  let y = typeof d == "string" ? ao(d) : d, S = ci(y.pathname || "/", m);
  if (S == null)
    return null;
  let f = SE(o);
  hw(f);
  let _ = null;
  for (let R = 0; _ == null && R < f.length; ++R) {
    let T = Dw(S);
    _ = Rw(f[R], T);
  }
  return _;
}
function SE(o, d, m, g) {
  d === void 0 && (d = []), m === void 0 && (m = []), g === void 0 && (g = "");
  let y = (S, f, _) => {
    let R = {
      relativePath: _ === void 0 ? S.path || "" : _,
      caseSensitive: S.caseSensitive === !0,
      childrenIndex: f,
      route: S
    };
    R.relativePath.startsWith("/") && (Et(R.relativePath.startsWith(g), 'Absolute route path "' + R.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), R.relativePath = R.relativePath.slice(g.length));
    let T = Mr([g, R.relativePath]), O = m.concat(R);
    S.children && S.children.length > 0 && (Et(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      S.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + T + '".')
    ), SE(S.children, d, O, T)), !(S.path == null && !S.index) && d.push({
      path: T,
      score: xw(T, S.index),
      routesMeta: O
    });
  };
  return o.forEach((S, f) => {
    var _;
    if (S.path === "" || !((_ = S.path) != null && _.includes("?")))
      y(S, f);
    else
      for (let R of RE(S.path))
        y(S, f, R);
  }), d;
}
function RE(o) {
  let d = o.split("/");
  if (d.length === 0) return [];
  let [m, ...g] = d, y = m.endsWith("?"), S = m.replace(/\?$/, "");
  if (g.length === 0)
    return y ? [S, ""] : [S];
  let f = RE(g.join("/")), _ = [];
  return _.push(...f.map((R) => R === "" ? S : [S, R].join("/"))), y && _.push(...f), _.map((R) => o.startsWith("/") && R === "" ? "/" : R);
}
function hw(o) {
  o.sort((d, m) => d.score !== m.score ? m.score - d.score : Sw(d.routesMeta.map((g) => g.childrenIndex), m.routesMeta.map((g) => g.childrenIndex)));
}
const vw = /^:[\w-]+$/, gw = 3, yw = 2, bw = 1, Nw = 10, Ew = -2, oE = (o) => o === "*";
function xw(o, d) {
  let m = o.split("/"), g = m.length;
  return m.some(oE) && (g += Ew), d && (g += yw), m.filter((y) => !oE(y)).reduce((y, S) => y + (vw.test(S) ? gw : S === "" ? bw : Nw), g);
}
function Sw(o, d) {
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
  } = o, y = {}, S = "/", f = [];
  for (let _ = 0; _ < g.length; ++_) {
    let R = g[_], T = _ === g.length - 1, O = S === "/" ? d : d.slice(S.length) || "/", E = kh({
      path: R.relativePath,
      caseSensitive: R.caseSensitive,
      end: T
    }, O), L = R.route;
    if (!E)
      return null;
    Object.assign(y, E.params), f.push({
      // TODO: Can this as be avoided?
      params: y,
      pathname: Mr([S, E.pathname]),
      pathnameBase: _w(Mr([S, E.pathnameBase])),
      route: L
    }), E.pathnameBase !== "/" && (S = Mr([S, E.pathnameBase]));
  }
  return f;
}
function kh(o, d) {
  typeof o == "string" && (o = {
    path: o,
    caseSensitive: !1,
    end: !0
  });
  let [m, g] = Cw(o.path, o.caseSensitive, o.end), y = d.match(m);
  if (!y) return null;
  let S = y[0], f = S.replace(/(.)\/+$/, "$1"), _ = y.slice(1);
  return {
    params: g.reduce((T, O, E) => {
      let {
        paramName: L,
        isOptional: U
      } = O;
      if (L === "*") {
        let se = _[E] || "";
        f = S.slice(0, S.length - se.length).replace(/(.)\/+$/, "$1");
      }
      const B = _[E];
      return U && !B ? T[L] = void 0 : T[L] = (B || "").replace(/%2F/g, "/"), T;
    }, {}),
    pathname: S,
    pathnameBase: f,
    pattern: o
  };
}
function Cw(o, d, m) {
  d === void 0 && (d = !1), m === void 0 && (m = !0), Fa(o === "*" || !o.endsWith("*") || o.endsWith("/*"), 'Route path "' + o + '" will be treated as if it were ' + ('"' + o.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + o.replace(/\*$/, "/*") + '".'));
  let g = [], y = "^" + o.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, _, R) => (g.push({
    paramName: _,
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
    return Fa(!1, 'The URL path "' + o + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + d + ").")), o;
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
    hash: Mw(y)
  };
}
function jw(o, d) {
  let m = d.replace(/\/+$/, "").split("/");
  return o.split("/").forEach((y) => {
    y === ".." ? m.length > 1 && m.pop() : y !== "." && m.push(y);
  }), m.length > 1 ? m.join("/") : "/";
}
function Mh(o, d, m, g) {
  return "Cannot include a '" + o + "' character in a manually specified " + ("`to." + d + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + m + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function ww(o) {
  return o.filter((d, m) => m === 0 || d.route.path && d.route.path.length > 0);
}
function Ph(o, d) {
  let m = ww(o);
  return d ? m.map((g, y) => y === m.length - 1 ? g.pathname : g.pathnameBase) : m.map((g) => g.pathnameBase);
}
function Hh(o, d, m, g) {
  g === void 0 && (g = !1);
  let y;
  typeof o == "string" ? y = ao(o) : (y = Js({}, o), Et(!y.pathname || !y.pathname.includes("?"), Mh("?", "pathname", "search", y)), Et(!y.pathname || !y.pathname.includes("#"), Mh("#", "pathname", "hash", y)), Et(!y.search || !y.search.includes("#"), Mh("#", "search", "hash", y)));
  let S = o === "" || y.pathname === "", f = S ? "/" : y.pathname, _;
  if (f == null)
    _ = m;
  else {
    let E = d.length - 1;
    if (!g && f.startsWith("..")) {
      let L = f.split("/");
      for (; L[0] === ".."; )
        L.shift(), E -= 1;
      y.pathname = L.join("/");
    }
    _ = E >= 0 ? d[E] : "/";
  }
  let R = Tw(y, _), T = f && f !== "/" && f.endsWith("/"), O = (S || f === ".") && m.endsWith("/");
  return !R.pathname.endsWith("/") && (T || O) && (R.pathname += "/"), R;
}
const Mr = (o) => o.join("/").replace(/\/\/+/g, "/"), _w = (o) => o.replace(/\/+$/, "").replace(/^\/*/, "/"), Ow = (o) => !o || o === "?" ? "" : o.startsWith("?") ? o : "?" + o, Mw = (o) => !o || o === "#" ? "" : o.startsWith("#") ? o : "#" + o;
function Vw(o) {
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
function eu() {
  return eu = Object.assign ? Object.assign.bind() : function(o) {
    for (var d = 1; d < arguments.length; d++) {
      var m = arguments[d];
      for (var g in m)
        Object.prototype.hasOwnProperty.call(m, g) && (o[g] = m[g]);
    }
    return o;
  }, eu.apply(this, arguments);
}
const nu = /* @__PURE__ */ N.createContext(null);
nu.displayName = "DataRouter";
const Bh = /* @__PURE__ */ N.createContext(null);
Bh.displayName = "DataRouterState";
const Lw = /* @__PURE__ */ N.createContext(null);
Lw.displayName = "Await";
const ya = /* @__PURE__ */ N.createContext(null);
ya.displayName = "Navigation";
const au = /* @__PURE__ */ N.createContext(null);
au.displayName = "Location";
const Pa = /* @__PURE__ */ N.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Pa.displayName = "Route";
const $h = /* @__PURE__ */ N.createContext(null);
$h.displayName = "RouteError";
function kw(o, d) {
  let {
    relative: m
  } = d === void 0 ? {} : d;
  ro() || Et(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename: g,
    navigator: y
  } = N.useContext(ya), {
    hash: S,
    pathname: f,
    search: _
  } = ru(o, {
    relative: m
  }), R = f;
  return g !== "/" && (R = f === "/" ? g : Mr([g, f])), y.createHref({
    pathname: R,
    search: _,
    hash: S
  });
}
function ro() {
  return N.useContext(au) != null;
}
function Xi() {
  return ro() || Et(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), N.useContext(au).location;
}
const DE = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function TE(o) {
  N.useContext(ya).static || N.useLayoutEffect(o);
}
function Ih() {
  let {
    isDataRoute: o
  } = N.useContext(Pa);
  return o ? Xw() : Uw();
}
function Uw() {
  ro() || Et(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let o = N.useContext(nu), {
    basename: d,
    future: m,
    navigator: g
  } = N.useContext(ya), {
    matches: y
  } = N.useContext(Pa), {
    pathname: S
  } = Xi(), f = JSON.stringify(Ph(y, m.v7_relativeSplatPath)), _ = N.useRef(!1);
  return TE(() => {
    _.current = !0;
  }), N.useCallback(function(T, O) {
    if (O === void 0 && (O = {}), Fa(_.current, DE), !_.current) return;
    if (typeof T == "number") {
      g.go(T);
      return;
    }
    let E = Hh(T, JSON.parse(f), S, O.relative === "path");
    o == null && d !== "/" && (E.pathname = E.pathname === "/" ? d : Mr([d, E.pathname])), (O.replace ? g.replace : g.push)(E, O.state, O);
  }, [d, g, f, S, o]);
}
function Fw() {
  let {
    matches: o
  } = N.useContext(Pa), d = o[o.length - 1];
  return d ? d.params : {};
}
function ru(o, d) {
  let {
    relative: m
  } = d === void 0 ? {} : d, {
    future: g
  } = N.useContext(ya), {
    matches: y
  } = N.useContext(Pa), {
    pathname: S
  } = Xi(), f = JSON.stringify(Ph(y, g.v7_relativeSplatPath));
  return N.useMemo(() => Hh(o, JSON.parse(f), S, m === "path"), [o, f, S, m]);
}
function zw(o, d) {
  return Pw(o, d);
}
function Pw(o, d, m, g) {
  ro() || Et(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: y
  } = N.useContext(ya), {
    matches: S
  } = N.useContext(Pa), f = S[S.length - 1], _ = f ? f.params : {}, R = f ? f.pathname : "/", T = f ? f.pathnameBase : "/", O = f && f.route;
  {
    let W = O && O.path || "";
    wE(R, !O || W.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + R + '" (under <Route path="' + W + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + W + '"> to <Route ') + ('path="' + (W === "/" ? "*" : W + "/*") + '">.'));
  }
  let E = Xi(), L;
  if (d) {
    var U;
    let W = typeof d == "string" ? ao(d) : d;
    T === "/" || (U = W.pathname) != null && U.startsWith(T) || Et(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + T + '" ') + ('but pathname "' + W.pathname + '" was given in the `location` prop.')), L = W;
  } else
    L = E;
  let B = L.pathname || "/", se = B;
  if (T !== "/") {
    let W = T.replace(/^\//, "").split("/");
    se = "/" + B.replace(/^\//, "").split("/").slice(W.length).join("/");
  }
  let ie = pw(o, {
    pathname: se
  });
  Fa(O || ie != null, 'No routes matched location "' + L.pathname + L.search + L.hash + '" '), Fa(ie == null || ie[ie.length - 1].route.element !== void 0 || ie[ie.length - 1].route.Component !== void 0 || ie[ie.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + L.pathname + L.search + L.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let oe = Yw(ie && ie.map((W) => Object.assign({}, W, {
    params: Object.assign({}, _, W.params),
    pathname: Mr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(W.pathname).pathname : W.pathname
    ]),
    pathnameBase: W.pathnameBase === "/" ? T : Mr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(W.pathnameBase).pathname : W.pathnameBase
    ])
  })), S, m, g);
  return d && oe ? /* @__PURE__ */ N.createElement(au.Provider, {
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
  }, oe) : oe;
}
function Hw() {
  let o = Qw(), d = Vw(o) ? o.status + " " + o.statusText : o instanceof Error ? o.message : JSON.stringify(o), m = o instanceof Error ? o.stack : null, g = "rgba(200,200,200, 0.5)", y = {
    padding: "0.5rem",
    backgroundColor: g
  }, S = {
    padding: "2px 4px",
    backgroundColor: g
  }, f = null;
  return console.error("Error handled by React Router default ErrorBoundary:", o), f = /* @__PURE__ */ N.createElement(N.Fragment, null, /* @__PURE__ */ N.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ N.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ N.createElement("code", {
    style: S
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ N.createElement("code", {
    style: S
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ N.createElement(N.Fragment, null, /* @__PURE__ */ N.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ N.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, d), m ? /* @__PURE__ */ N.createElement("pre", {
    style: y
  }, m) : null, f);
}
const Bw = /* @__PURE__ */ N.createElement(Hw, null);
class $w extends N.Component {
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
    return this.state.error !== void 0 ? /* @__PURE__ */ N.createElement(Pa.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ N.createElement($h.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function Iw(o) {
  let {
    routeContext: d,
    match: m,
    children: g
  } = o, y = N.useContext(nu);
  return y && y.static && y.staticContext && (m.route.errorElement || m.route.ErrorBoundary) && (y.staticContext._deepestRenderedBoundaryId = m.route.id), /* @__PURE__ */ N.createElement(Pa.Provider, {
    value: d
  }, g);
}
function Yw(o, d, m, g) {
  var y;
  if (d === void 0 && (d = []), m === void 0 && (m = null), g === void 0 && (g = null), o == null) {
    var S;
    if (!m)
      return null;
    if (m.errors)
      o = m.matches;
    else if ((S = g) != null && S.v7_partialHydration && d.length === 0 && !m.initialized && m.matches.length > 0)
      o = m.matches;
    else
      return null;
  }
  let f = o, _ = (y = m) == null ? void 0 : y.errors;
  if (_ != null) {
    let O = f.findIndex((E) => E.route.id && (_ == null ? void 0 : _[E.route.id]) !== void 0);
    O >= 0 || Et(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(_).join(",")), f = f.slice(0, Math.min(f.length, O + 1));
  }
  let R = !1, T = -1;
  if (m && g && g.v7_partialHydration)
    for (let O = 0; O < f.length; O++) {
      let E = f[O];
      if ((E.route.HydrateFallback || E.route.hydrateFallbackElement) && (T = O), E.route.id) {
        let {
          loaderData: L,
          errors: U
        } = m, B = E.route.loader && L[E.route.id] === void 0 && (!U || U[E.route.id] === void 0);
        if (E.route.lazy || B) {
          R = !0, T >= 0 ? f = f.slice(0, T + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((O, E, L) => {
    let U, B = !1, se = null, ie = null;
    m && (U = _ && E.route.id ? _[E.route.id] : void 0, se = E.route.errorElement || Bw, R && (T < 0 && L === 0 ? (wE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), B = !0, ie = null) : T === L && (B = !0, ie = E.route.hydrateFallbackElement || null)));
    let oe = d.concat(f.slice(0, L + 1)), W = () => {
      let $;
      return U ? $ = se : B ? $ = ie : E.route.Component ? $ = /* @__PURE__ */ N.createElement(E.route.Component, null) : E.route.element ? $ = E.route.element : $ = O, /* @__PURE__ */ N.createElement(Iw, {
        match: E,
        routeContext: {
          outlet: O,
          matches: oe,
          isDataRoute: m != null
        },
        children: $
      });
    };
    return m && (E.route.ErrorBoundary || E.route.errorElement || L === 0) ? /* @__PURE__ */ N.createElement($w, {
      location: m.location,
      revalidation: m.revalidation,
      component: se,
      error: U,
      children: W(),
      routeContext: {
        outlet: null,
        matches: oe,
        isDataRoute: !0
      }
    }) : W();
  }, null);
}
var jE = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o;
}(jE || {}), tu = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseLoaderData = "useLoaderData", o.UseActionData = "useActionData", o.UseRouteError = "useRouteError", o.UseNavigation = "useNavigation", o.UseRouteLoaderData = "useRouteLoaderData", o.UseMatches = "useMatches", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o.UseRouteId = "useRouteId", o;
}(tu || {});
function Yh(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function qw(o) {
  let d = N.useContext(nu);
  return d || Et(!1, Yh(o)), d;
}
function Gw(o) {
  let d = N.useContext(Bh);
  return d || Et(!1, Yh(o)), d;
}
function Ww(o) {
  let d = N.useContext(Pa);
  return d || Et(!1, Yh(o)), d;
}
function qh(o) {
  let d = Ww(o), m = d.matches[d.matches.length - 1];
  return m.route.id || Et(!1, o + ' can only be used on routes that contain a unique "id"'), m.route.id;
}
function Kw() {
  return qh(tu.UseRouteId);
}
function Qw() {
  var o;
  let d = N.useContext($h), m = Gw(tu.UseRouteError), g = qh(tu.UseRouteError);
  return d !== void 0 ? d : (o = m.errors) == null ? void 0 : o[g];
}
function Xw() {
  let {
    router: o
  } = qw(jE.UseNavigateStable), d = qh(tu.UseNavigateStable), m = N.useRef(!1);
  return TE(() => {
    m.current = !0;
  }), N.useCallback(function(y, S) {
    S === void 0 && (S = {}), Fa(m.current, DE), m.current && (typeof y == "number" ? o.navigate(y) : o.navigate(y, eu({
      fromRouteId: d
    }, S)));
  }, [o, d]);
}
const sE = {};
function wE(o, d, m) {
  !d && !sE[o] && (sE[o] = !0, Fa(!1, m));
}
const uE = {};
function Jw(o, d) {
  uE[d] || (uE[d] = !0, console.warn(d));
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
  ro() || Et(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let {
    future: S,
    static: f
  } = N.useContext(ya);
  Fa(!f, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: _
  } = N.useContext(Pa), {
    pathname: R
  } = Xi(), T = Ih(), O = Hh(d, Ph(_, S.v7_relativeSplatPath), R, y === "path"), E = JSON.stringify(O);
  return N.useEffect(() => T(JSON.parse(E), {
    replace: m,
    state: g,
    relative: y
  }), [T, E, y, m, g]), null;
}
function rr(o) {
  Et(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function t_(o) {
  let {
    basename: d = "/",
    children: m = null,
    location: g,
    navigationType: y = si.Pop,
    navigator: S,
    static: f = !1,
    future: _
  } = o;
  ro() && Et(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let R = d.replace(/^\/*/, "/"), T = N.useMemo(() => ({
    basename: R,
    navigator: S,
    static: f,
    future: eu({
      v7_relativeSplatPath: !1
    }, _)
  }), [R, _, S, f]);
  typeof g == "string" && (g = ao(g));
  let {
    pathname: O = "/",
    search: E = "",
    hash: L = "",
    state: U = null,
    key: B = "default"
  } = g, se = N.useMemo(() => {
    let ie = ci(O, R);
    return ie == null ? null : {
      location: {
        pathname: ie,
        search: E,
        hash: L,
        state: U,
        key: B
      },
      navigationType: y
    };
  }, [R, O, E, L, U, B, y]);
  return Fa(se != null, '<Router basename="' + R + '"> is not able to match the URL ' + ('"' + O + E + L + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), se == null ? null : /* @__PURE__ */ N.createElement(ya.Provider, {
    value: T
  }, /* @__PURE__ */ N.createElement(au.Provider, {
    children: m,
    value: se
  }));
}
function n_(o) {
  let {
    children: d,
    location: m
  } = o;
  return zw(Uh(d), m);
}
new Promise(() => {
});
function Uh(o, d) {
  d === void 0 && (d = []);
  let m = [];
  return N.Children.forEach(o, (g, y) => {
    if (!/* @__PURE__ */ N.isValidElement(g))
      return;
    let S = [...d, y];
    if (g.type === N.Fragment) {
      m.push.apply(m, Uh(g.props.children, S));
      return;
    }
    g.type !== rr && Et(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || Et(!1, "An index route cannot have child routes.");
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
    g.props.children && (f.children = Uh(g.props.children, S)), m.push(f);
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
function Gh(o, d) {
  if (o == null) return {};
  var m = {}, g = Object.keys(o), y, S;
  for (S = 0; S < g.length; S++)
    y = g[S], !(d.indexOf(y) >= 0) && (m[y] = o[y]);
  return m;
}
const gf = "get", yf = "application/x-www-form-urlencoded";
function Sf(o) {
  return o != null && typeof o.tagName == "string";
}
function a_(o) {
  return Sf(o) && o.tagName.toLowerCase() === "button";
}
function r_(o) {
  return Sf(o) && o.tagName.toLowerCase() === "form";
}
function i_(o) {
  return Sf(o) && o.tagName.toLowerCase() === "input";
}
function l_(o) {
  return !!(o.metaKey || o.altKey || o.ctrlKey || o.shiftKey);
}
function o_(o, d) {
  return o.button === 0 && // Ignore everything but left clicks
  (!d || d === "_self") && // Let browser handle "target=_blank" etc.
  !l_(o);
}
let vf = null;
function s_() {
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
const u_ = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Vh(o) {
  return o != null && !u_.has(o) ? (Fa(!1, '"' + o + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + yf + '"')), null) : o;
}
function c_(o, d) {
  let m, g, y, S, f;
  if (r_(o)) {
    let _ = o.getAttribute("action");
    g = _ ? ci(_, d) : null, m = o.getAttribute("method") || gf, y = Vh(o.getAttribute("enctype")) || yf, S = new FormData(o);
  } else if (a_(o) || i_(o) && (o.type === "submit" || o.type === "image")) {
    let _ = o.form;
    if (_ == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let R = o.getAttribute("formaction") || _.getAttribute("action");
    if (g = R ? ci(R, d) : null, m = o.getAttribute("formmethod") || _.getAttribute("method") || gf, y = Vh(o.getAttribute("formenctype")) || Vh(_.getAttribute("enctype")) || yf, S = new FormData(_, o), !s_()) {
      let {
        name: T,
        type: O,
        value: E
      } = o;
      if (O === "image") {
        let L = T ? T + "." : "";
        S.append(L + "x", "0"), S.append(L + "y", "0");
      } else T && S.append(T, E);
    }
  } else {
    if (Sf(o))
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
const _E = /* @__PURE__ */ N.createContext({
  isTransitioning: !1
});
_E.displayName = "ViewTransition";
const h_ = /* @__PURE__ */ N.createContext(/* @__PURE__ */ new Map());
h_.displayName = "Fetchers";
const v_ = "startTransition", fE = ow[v_];
function g_(o) {
  let {
    basename: d,
    children: m,
    future: g,
    window: y
  } = o, S = N.useRef();
  S.current == null && (S.current = cw({
    window: y,
    v5Compat: !0
  }));
  let f = S.current, [_, R] = N.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: T
  } = g || {}, O = N.useCallback((E) => {
    T && fE ? fE(() => R(E)) : R(E);
  }, [R, T]);
  return N.useLayoutEffect(() => f.listen(O), [f, O]), N.useEffect(() => Zw(g), [g]), /* @__PURE__ */ N.createElement(t_, {
    basename: d,
    children: m,
    location: _.location,
    navigationType: _.action,
    navigator: f,
    future: g
  });
}
const y_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", b_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, to = /* @__PURE__ */ N.forwardRef(function(d, m) {
  let {
    onClick: g,
    relative: y,
    reloadDocument: S,
    replace: f,
    state: _,
    target: R,
    to: T,
    preventScrollReset: O,
    viewTransition: E
  } = d, L = Gh(d, f_), {
    basename: U
  } = N.useContext(ya), B, se = !1;
  if (typeof T == "string" && b_.test(T) && (B = T, y_))
    try {
      let $ = new URL(window.location.href), G = T.startsWith("//") ? new URL($.protocol + T) : new URL(T), le = ci(G.pathname, U);
      G.origin === $.origin && le != null ? T = le + G.search + G.hash : se = !0;
    } catch {
      Fa(!1, '<Link to="' + T + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let ie = kw(T, {
    relative: y
  }), oe = S_(T, {
    replace: f,
    state: _,
    target: R,
    preventScrollReset: O,
    relative: y,
    viewTransition: E
  });
  function W($) {
    g && g($), $.defaultPrevented || oe($);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ N.createElement("a", no({}, L, {
      href: B || ie,
      onClick: se || S ? g : W,
      ref: m,
      target: R
    }))
  );
});
to.displayName = "Link";
const N_ = /* @__PURE__ */ N.forwardRef(function(d, m) {
  let {
    "aria-current": g = "page",
    caseSensitive: y = !1,
    className: S = "",
    end: f = !1,
    style: _,
    to: R,
    viewTransition: T,
    children: O
  } = d, E = Gh(d, d_), L = ru(R, {
    relative: E.relative
  }), U = Xi(), B = N.useContext(Bh), {
    navigator: se,
    basename: ie
  } = N.useContext(ya), oe = B != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  w_(L) && T === !0, W = se.encodeLocation ? se.encodeLocation(L).pathname : L.pathname, $ = U.pathname, G = B && B.navigation && B.navigation.location ? B.navigation.location.pathname : null;
  y || ($ = $.toLowerCase(), G = G ? G.toLowerCase() : null, W = W.toLowerCase()), G && ie && (G = ci(G, ie) || G);
  const le = W !== "/" && W.endsWith("/") ? W.length - 1 : W.length;
  let I = $ === W || !f && $.startsWith(W) && $.charAt(le) === "/", H = G != null && (G === W || !f && G.startsWith(W) && G.charAt(W.length) === "/"), ye = {
    isActive: I,
    isPending: H,
    isTransitioning: oe
  }, ee = I ? g : void 0, Q;
  typeof S == "function" ? Q = S(ye) : Q = [S, I ? "active" : null, H ? "pending" : null, oe ? "transitioning" : null].filter(Boolean).join(" ");
  let re = typeof _ == "function" ? _(ye) : _;
  return /* @__PURE__ */ N.createElement(to, no({}, E, {
    "aria-current": ee,
    className: Q,
    ref: m,
    style: re,
    to: R,
    viewTransition: T
  }), typeof O == "function" ? O(ye) : O);
});
N_.displayName = "NavLink";
const E_ = /* @__PURE__ */ N.forwardRef((o, d) => {
  let {
    fetcherKey: m,
    navigate: g,
    reloadDocument: y,
    replace: S,
    state: f,
    method: _ = gf,
    action: R,
    onSubmit: T,
    relative: O,
    preventScrollReset: E,
    viewTransition: L
  } = o, U = Gh(o, p_), B = T_(), se = j_(R, {
    relative: O
  }), ie = _.toLowerCase() === "get" ? "get" : "post", oe = (W) => {
    if (T && T(W), W.defaultPrevented) return;
    W.preventDefault();
    let $ = W.nativeEvent.submitter, G = ($ == null ? void 0 : $.getAttribute("formmethod")) || _;
    B($ || W.currentTarget, {
      fetcherKey: m,
      method: G,
      navigate: g,
      replace: S,
      state: f,
      relative: O,
      preventScrollReset: E,
      viewTransition: L
    });
  };
  return /* @__PURE__ */ N.createElement("form", no({
    ref: d,
    method: ie,
    action: se,
    onSubmit: y ? T : oe
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
function x_(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function OE(o) {
  let d = N.useContext(nu);
  return d || Et(!1, x_(o)), d;
}
function S_(o, d) {
  let {
    target: m,
    replace: g,
    state: y,
    preventScrollReset: S,
    relative: f,
    viewTransition: _
  } = d === void 0 ? {} : d, R = Ih(), T = Xi(), O = ru(o, {
    relative: f
  });
  return N.useCallback((E) => {
    if (o_(E, m)) {
      E.preventDefault();
      let L = g !== void 0 ? g : Zs(T) === Zs(O);
      R(o, {
        replace: L,
        state: y,
        preventScrollReset: S,
        relative: f,
        viewTransition: _
      });
    }
  }, [T, R, O, g, y, m, o, S, f, _]);
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
  } = N.useContext(ya), m = Kw();
  return N.useCallback(function(g, y) {
    y === void 0 && (y = {}), R_();
    let {
      action: S,
      method: f,
      encType: _,
      formData: R,
      body: T
    } = c_(g, d);
    if (y.navigate === !1) {
      let O = y.fetcherKey || D_();
      o.fetch(O, m, y.action || S, {
        preventScrollReset: y.preventScrollReset,
        formData: R,
        body: T,
        formMethod: y.method || f,
        formEncType: y.encType || _,
        flushSync: y.flushSync
      });
    } else
      o.navigate(y.action || S, {
        preventScrollReset: y.preventScrollReset,
        formData: R,
        body: T,
        formMethod: y.method || f,
        formEncType: y.encType || _,
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
  } = N.useContext(ya), y = N.useContext(Pa);
  y || Et(!1, "useFormAction must be used inside a RouteContext");
  let [S] = y.matches.slice(-1), f = no({}, ru(o || ".", {
    relative: m
  })), _ = Xi();
  if (o == null) {
    f.search = _.search;
    let R = new URLSearchParams(f.search), T = R.getAll("index");
    if (T.some((E) => E === "")) {
      R.delete("index"), T.filter((L) => L).forEach((L) => R.append("index", L));
      let E = R.toString();
      f.search = E ? "?" + E : "";
    }
  }
  return (!o || o === ".") && S.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (f.pathname = f.pathname === "/" ? g : Mr([g, f.pathname])), Zs(f);
}
function w_(o, d) {
  d === void 0 && (d = {});
  let m = N.useContext(_E);
  m == null && Et(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = OE(Nf.useViewTransitionState), y = ru(o, {
    relative: d.relative
  });
  if (!m.isTransitioning)
    return !1;
  let S = ci(m.currentLocation.pathname, g) || m.currentLocation.pathname, f = ci(m.nextLocation.pathname, g) || m.nextLocation.pathname;
  return kh(y.pathname, f) != null || kh(y.pathname, S) != null;
}
function __() {
  const [o, d] = N.useState(null), [m, g] = N.useState(""), [y, S] = N.useState(""), [f, _] = N.useState(!0), [R, T] = N.useState(""), [O, E] = N.useState(""), [L, U] = N.useState(!1), [B, se] = N.useState(!1);
  N.useEffect(() => {
    const $ = typeof window < "u" ? window : void 0, G = $ && $.__FIREBASE__ ? $.__FIREBASE__ : null;
    d({
      apiKey: G && G.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: G && G.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: G && G.projectId || void 0 || "fresh-basket-a8933",
      appId: G && G.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: G && G.messagingSenderId || void 0 || "163656027399",
      measurementId: G && G.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function ie($) {
    const G = ($ == null ? void 0 : $.code) || "", le = ($ == null ? void 0 : $.message) || "";
    return G.includes("invalid-email") ? "Please enter a valid email address." : G.includes("user-not-found") ? "No account found with that email." : G.includes("wrong-password") || G.includes("invalid-credential") || le.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : G.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : G.includes("network-request-failed") ? "Network error. Check your connection and try again." : le || "Something went wrong.";
  }
  async function oe($) {
    $.preventDefault(), T(""), E(""), U(!0);
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const G = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), le = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: I, setPersistence: H, browserLocalPersistence: ye, browserSessionPersistence: ee, signInWithEmailAndPassword: Q } = le, re = I();
      await H(re, f ? ye : ee);
      const Y = await (await Q(re, m.trim(), y)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Y }) })).ok) throw new Error("Session creation failed");
      E("Signed in successfully."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (G) {
      T(ie(G));
    } finally {
      U(!1);
    }
  }
  async function W() {
    T(""), E("");
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const $ = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: G, sendPasswordResetEmail: le } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), I = G();
      await le(I, m.trim()), E("If an account exists for that email, a reset link has been sent.");
    } catch ($) {
      T(ie($));
    }
  }
  return /* @__PURE__ */ u.jsxDEV("section", { className: "auth-layout", children: [
    /* @__PURE__ */ u.jsxDEV("div", { className: "auth-hero", children: [
      /* @__PURE__ */ u.jsxDEV("img", { className: "hero-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=96", alt: "FreshBasket logo" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ u.jsxDEV("h2", { className: "hero-heading", children: "Welcome back" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ u.jsxDEV("p", { className: "hero-sub", children: "Sign in to manage orders, riders and deliveries." }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ u.jsxDEV("ul", { className: "hero-points", children: [
        /* @__PURE__ */ u.jsxDEV("li", { children: "Secure account access" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 76,
          columnNumber: 37
        }, this),
        /* @__PURE__ */ u.jsxDEV("li", { children: "Real-time dashboards" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 76,
          columnNumber: 67
        }, this),
        /* @__PURE__ */ u.jsxDEV("li", { children: "Faster operations" }, void 0, !1, {
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
    /* @__PURE__ */ u.jsxDEV("div", { className: "auth-panel auth-panel-card", children: [
      /* @__PURE__ */ u.jsxDEV("h2", { className: "auth-title", children: "Sign in to FreshBasket" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      R && /* @__PURE__ */ u.jsxDEV("div", { className: "auth-error", children: R }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 81,
        columnNumber: 19
      }, this),
      O && /* @__PURE__ */ u.jsxDEV("div", { className: "auth-success", children: O }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 82,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ u.jsxDEV("form", { className: "auth-form", onSubmit: oe, children: [
        /* @__PURE__ */ u.jsxDEV("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ u.jsxDEV("input", { className: "auth-input", type: "email", value: m, onChange: ($) => g($.target.value), required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 85,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 84,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ u.jsxDEV("label", { className: "auth-label", children: [
          "Password",
          /* @__PURE__ */ u.jsxDEV("span", { className: "password-field", children: [
            /* @__PURE__ */ u.jsxDEV("input", { className: "auth-input", type: B ? "text" : "password", value: y, onChange: ($) => S($.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ u.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": B ? "Hide password" : "Show password", onClick: () => se(($) => !$), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ u.jsxDEV("div", { className: "auth-actions", children: [
          /* @__PURE__ */ u.jsxDEV("label", { className: "remember", children: [
            /* @__PURE__ */ u.jsxDEV("input", { type: "checkbox", checked: f, onChange: ($) => _($.target.checked) }, void 0, !1, {
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
          /* @__PURE__ */ u.jsxDEV("button", { className: "link-button", type: "button", onClick: W, children: "Forgot password?" }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 95,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 93,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ u.jsxDEV("button", { className: "auth-button auth-button-wide", disabled: L, type: "submit", children: L ? "Signing in…" : "Sign in" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 97,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ u.jsxDEV("p", { className: "auth-alt", children: [
        "No account? ",
        /* @__PURE__ */ u.jsxDEV("a", { href: "/auth/register", children: "Register" }, void 0, !1, {
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
  const [o, d] = N.useState(null), [m, g] = N.useState(""), [y, S] = N.useState(""), [f, _] = N.useState(""), [R, T] = N.useState(""), [O, E] = N.useState(""), [L, U] = N.useState(""), [B, se] = N.useState(""), [ie, oe] = N.useState(!1), [W, $] = N.useState(!1), [G, le] = N.useState(!1), [I, H] = N.useState(!1);
  N.useEffect(() => {
    const Q = typeof window < "u" ? window : void 0, re = Q && Q.__FIREBASE__ ? Q.__FIREBASE__ : null;
    d({
      apiKey: re && re.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: re && re.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: re && re.projectId || void 0 || "fresh-basket-a8933",
      appId: re && re.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: re && re.messagingSenderId || void 0 || "163656027399",
      measurementId: re && re.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function ye(Q) {
    const re = (Q == null ? void 0 : Q.code) || "";
    return re.includes("email-already-in-use") ? "An account with this email already exists." : re.includes("weak-password") ? "Password should be at least 6 characters." : re.includes("invalid-email") ? "Please enter a valid email address." : re.includes("network-request-failed") ? "Network error. Check your connection and try again." : (Q == null ? void 0 : Q.message) || "Something went wrong.";
  }
  async function ee(Q) {
    Q.preventDefault(), U(""), se(""), oe(!0);
    try {
      const re = String(m).trim(), je = String(y).trim(), Y = je.replace(/\D+/g, ""), k = { fn: !re, cn: !je };
      if (le(k.fn), H(k.cn || Y.length < 7), k.fn || k.cn) {
        U("Please fill in required fields");
        return;
      }
      if (Y.length < 7) {
        U("Please enter a valid mobile number");
        return;
      }
      if (R !== O) throw new Error("Passwords do not match");
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const Z = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: pe, createUserWithEmailAndPassword: te } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), _e = pe(), ne = await (await te(_e, f.trim(), R)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: ne, profile: { fullName: re, contactNumber: je } }) })).ok) throw new Error("Session creation failed");
      se("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (re) {
      U(ye(re));
    } finally {
      oe(!1);
    }
  }
  return /* @__PURE__ */ u.jsxDEV("section", { className: "auth-panel", style: { maxWidth: 520, margin: "40px auto" }, children: [
    /* @__PURE__ */ u.jsxDEV("h2", { className: "auth-title", children: "Register" }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 67,
      columnNumber: 7
    }, this),
    L && /* @__PURE__ */ u.jsxDEV("div", { className: "auth-error", children: L }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 68,
      columnNumber: 17
    }, this),
    B && /* @__PURE__ */ u.jsxDEV("div", { className: "auth-success", children: B }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 69,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ u.jsxDEV("form", { className: "auth-form", onSubmit: ee, children: [
      /* @__PURE__ */ u.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ u.jsxDEV("input", { className: "auth-input" + (G && !String(m).trim() ? " input-error" : ""), value: m, onChange: (Q) => {
          g(Q.target.value), G && le(!String(Q.target.value).trim());
        }, onBlur: () => le(!String(m).trim()), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 72,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ u.jsxDEV("label", { className: "auth-label", children: [
        "Contact number",
        /* @__PURE__ */ u.jsxDEV("input", { className: "auth-input" + (I ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: y, onChange: (Q) => {
          if (S(Q.target.value), I) {
            const re = String(Q.target.value).trim().replace(/\D+/g, "");
            H(!(re.length >= 7));
          }
        }, onBlur: () => {
          const Q = String(y).trim().replace(/\D+/g, "");
          H(!(Q.length >= 7));
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
      /* @__PURE__ */ u.jsxDEV("label", { className: "auth-label", children: [
        "Email",
        /* @__PURE__ */ u.jsxDEV("input", { className: "auth-input", type: "email", value: f, onChange: (Q) => _(Q.target.value), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 77,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ u.jsxDEV("label", { className: "auth-label", children: [
        "Password",
        /* @__PURE__ */ u.jsxDEV("span", { className: "password-field", children: [
          /* @__PURE__ */ u.jsxDEV("input", { className: "auth-input", type: W ? "text" : "password", value: R, onChange: (Q) => T(Q.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ u.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": W ? "Hide password" : "Show password", onClick: () => $((Q) => !Q), children: "👁️" }, void 0, !1, {
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
      /* @__PURE__ */ u.jsxDEV("label", { className: "auth-label", children: [
        "Confirm Password",
        /* @__PURE__ */ u.jsxDEV("input", { className: "auth-input", type: "password", value: O, onChange: (Q) => E(Q.target.value), minLength: 6, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 87,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ u.jsxDEV("button", { className: "auth-button", disabled: ie, type: "submit", children: ie ? "Creating account…" : "Create account" }, void 0, !1, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 89,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ u.jsxDEV("p", { className: "auth-alt", children: [
      "Have an account? ",
      /* @__PURE__ */ u.jsxDEV("a", { href: "/auth/login", children: "Login" }, void 0, !1, {
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
function M_() {
  const [o, d] = N.useState([]);
  return N.useEffect(() => {
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
      const S = String(Date.now()) + Math.random().toString(36).slice(2, 8), f = { id: S, message: String(g || ""), type: y.type || "success", ttl: typeof y.ttl == "number" ? y.ttl : 4e3 };
      return d((_) => [f, ..._]), S;
    }, window.hideToast = function(g) {
      d((y) => y.filter((S) => S.id !== g));
    }, () => {
      try {
        window && typeof window.showToast == "function" && delete window.showToast, window && typeof window.hideToast == "function" && delete window.hideToast;
      } catch {
      }
    };
  }, []), N.useEffect(() => {
    if (!o.length) return;
    const m = o.map((g) => setTimeout(() => {
      d((y) => y.filter((S) => S.id !== g.id));
    }, g.ttl));
    return () => {
      m.forEach(clearTimeout);
    };
  }, [o]), o.length ? /* @__PURE__ */ u.jsxDEV("div", { className: "toaster-container", "aria-live": "polite", "aria-atomic": "true", children: o.map((m) => /* @__PURE__ */ u.jsxDEV("div", { className: `toast ${m.type === "success" ? "toast-success" : "toast-info"}`, role: "status", children: [
    /* @__PURE__ */ u.jsxDEV("div", { className: "toast-message", children: m.message }, void 0, !1, {
      fileName: "/app/code/client/components/Toaster.jsx",
      lineNumber: 46,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ u.jsxDEV("button", { className: "toast-close", onClick: () => d((g) => g.filter((y) => y.id !== m.id)), "aria-label": "Dismiss", children: "✕" }, void 0, !1, {
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
  N.useEffect(() => {
    typeof window > "u" || (window.__pendingToasts = window.__pendingToasts || [], typeof window.showToast != "function" && (window.showToast = function(m, g) {
      return window.__pendingToasts.push({ message: m, opts: g || {} }), null;
    }), typeof window.hideToast != "function" && (window.hideToast = function(m) {
      try {
        window.__pendingToasts && (window.__pendingToasts = window.__pendingToasts.filter((g) => g.id !== m));
      } catch {
      }
    }));
  }, []);
  const d = Ih();
  return N.useEffect(() => {
    const m = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), y = document.getElementById("profileBtn"), S = document.getElementById("profileMenu");
    function f(E, L, U) {
      E && (E.classList.toggle("hidden", !U), E.setAttribute("aria-hidden", U ? "false" : "true"), L && L.setAttribute("aria-expanded", U ? "true" : "false"));
    }
    function _() {
      f(g, m, !1), f(S, y, !1);
    }
    function R(E) {
      const L = (U) => U && (U === E.target || U.contains(E.target));
      !L(g) && !L(m) && !L(S) && !L(y) && _();
    }
    function T(E) {
      E.key === "Escape" && _();
    }
    function O(E) {
      E && E.querySelectorAll(".dropdown-item").forEach((L) => {
        L.addEventListener("click", () => _());
      });
    }
    return m && g && (m.addEventListener("click", (E) => {
      E.stopPropagation(), f(S, y, !1), f(g, m, g.classList.contains("hidden"));
    }), O(g)), y && S && (y.addEventListener("click", (E) => {
      E.stopPropagation(), f(g, m, !1), f(S, y, S.classList.contains("hidden"));
    }), O(S)), document.addEventListener("click", R), document.addEventListener("keydown", T), () => {
      document.removeEventListener("click", R), document.removeEventListener("keydown", T);
    };
  }, []), /* @__PURE__ */ u.jsxDEV(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxDEV("header", { className: "site-header", children: [
      /* @__PURE__ */ u.jsxDEV("h1", { className: "site-title", children: /* @__PURE__ */ u.jsxDEV("span", { className: "brand", children: [
        /* @__PURE__ */ u.jsxDEV("img", { className: "brand-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=64", alt: "FreshBasket logo" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 75,
          columnNumber: 60
        }, this),
        /* @__PURE__ */ u.jsxDEV("span", { className: "brand-name", children: "FreshBasket" }, void 0, !1, {
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
      /* @__PURE__ */ u.jsxDEV("nav", { className: "site-nav", children: [
        /* @__PURE__ */ u.jsxDEV(to, { to: "/dashboard", onClick: (m) => {
          m.preventDefault(), d("/dashboard");
        }, children: "Dashboard" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 77,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ u.jsxDEV(to, { to: "/orders", onClick: (m) => {
          m.preventDefault(), d("/orders");
        }, children: "Orders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ u.jsxDEV(to, { to: "/riders", onClick: (m) => {
          m.preventDefault(), d("/riders");
        }, children: "Riders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 79,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ u.jsxDEV("span", { className: "site-nav-spacer" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 80,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ u.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ u.jsxDEV("button", { id: "notifBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "notifMenu", "aria-label": "Notifications", title: "Notifications", children: /* @__PURE__ */ u.jsxDEV("svg", { className: "bell-icon", width: "29", height: "29", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: [
            /* @__PURE__ */ u.jsxDEV("defs", { children: /* @__PURE__ */ u.jsxDEV("linearGradient", { id: "bellGold", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ u.jsxDEV("stop", { offset: "0%", stopColor: "#C08B3E" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 86,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ u.jsxDEV("stop", { offset: "50%", stopColor: "#D4AF37" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 87,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ u.jsxDEV("stop", { offset: "100%", stopColor: "#FFD700" }, void 0, !1, {
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
            /* @__PURE__ */ u.jsxDEV("path", { fill: "url(#bellGold)", d: "M12 22a2 2 0 0 0 1.995-1.85L14 20h-4a2 2 0 0 0 1.85 1.995L12 22Zm8-5h-1a1 1 0 0 1-.707-.293l-.147-.147A3.99 3.99 0 0 1 17 14.172V11a5 5 0 1 0-10 0v3.172a3.99 3.99 0 0 1-1.146 2.388l-.147.147A1 1 0 0 1 5 17H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2Z" }, void 0, !1, {
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
          /* @__PURE__ */ u.jsxDEV("div", { id: "notifMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "notifBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ u.jsxDEV("div", { className: "dropdown-header", children: "Notifications" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 95,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ u.jsxDEV("div", { className: "dropdown-item", children: "No new notifications" }, void 0, !1, {
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
        /* @__PURE__ */ u.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ u.jsxDEV("button", { id: "profileBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "profileMenu", title: "Profile", children: /* @__PURE__ */ u.jsxDEV("svg", { className: "avatar", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ u.jsxDEV("circle", { cx: "12", cy: "7.5", r: "3.5", stroke: "currentColor", strokeWidth: "1.5" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 102,
              columnNumber: 129
            }, this),
            /* @__PURE__ */ u.jsxDEV("path", { d: "M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }, void 0, !1, {
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
          /* @__PURE__ */ u.jsxDEV("div", { id: "profileMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "profileBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ u.jsxDEV("div", { className: "dropdown-header", children: "Signed in" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 105,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ u.jsxDEV(to, { className: "dropdown-item", to: "/settings", onClick: (m) => {
              m.preventDefault(), d("/settings");
            }, children: "Settings" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 106,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ u.jsxDEV("form", { method: "POST", action: "/auth/logout", children: /* @__PURE__ */ u.jsxDEV("button", { className: "dropdown-item", type: "submit", children: "Logout" }, void 0, !1, {
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
    /* @__PURE__ */ u.jsxDEV("main", { className: "content", children: o }, void 0, !1, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 113,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ u.jsxDEV("footer", { className: "site-footer", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " FreshBasket"
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 114,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ u.jsxDEV(M_, {}, void 0, !1, {
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
function V_({ onClose: o, onCreated: d }) {
  const [m, g] = N.useState(""), [y, S] = N.useState(""), [f, _] = N.useState(""), [R, T] = N.useState(!1), [O, E] = N.useState(""), [L, U] = N.useState(""), [B, se] = N.useState(!1), [ie, oe] = N.useState(!1), [W, $] = N.useState(!1), [G, le] = N.useState(!1), I = "+92";
  function H(ee) {
    const Q = String(ee || "").replace(/\D+/g, "");
    return Q.length === 0 ? "" : Q.startsWith("92") ? I + Q.slice(2) : I + Q;
  }
  H(f);
  async function ye() {
    E(""), U(""), le(!0);
    const ee = String(m), Q = String(y).trim(), re = String(f).trim(), je = re.replace(/\D+/g, ""), Y = { fn: !Q, cn: !re, pw: !ee };
    if (se(Y.fn), oe(Y.cn || je.length < 7), $(Y.pw), Y.fn || Y.cn || Y.pw) {
      E("Full name, mobile and password are required");
      return;
    }
    if (je.length !== 10) {
      E("numbers should be 10 digit"), oe(!0);
      return;
    }
    if (ee.length < 6) {
      $(!0), E("Password must be at least 6 characters");
      return;
    }
    T(!0);
    try {
      const k = H(re), Z = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: ee, fullName: Q, contactNumber: k })
      }), pe = await Z.json().catch(() => null);
      if (!Z.ok) {
        const te = String(pe && (pe.error || pe.message) || ""), _e = te.toUpperCase();
        /MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(te) || /MISSING\s*PASSWORD/i.test(te) ? (E("Full name, mobile and password are required"), se(!Q), oe(!re || je.length !== 10), $(!ee)) : _e.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(te) ? ($(!0), E("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(te) ? (oe(!0), E("numbers should be 10 digit")) : /FIREBASE NOT CONFIGURED/i.test(te) ? E("Service temporarily unavailable. Please try again later.") : E(te || "Failed to create rider");
        return;
      }
      U("Rider created successfully"), d && d(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (k) {
      const Z = String((k == null ? void 0 : k.message) || "");
      /Missing\s*(fullName\/contactNumber|password)/i.test(Z) ? E("Full name, mobile and password are required") : /WEAK_PASSWORD/i.test(Z) || /AT LEAST 6 CHARACTERS/i.test(Z) ? ($(!0), E("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(Z) ? (oe(!0), E("numbers should be 10 digit")) : E(Z || "Failed to create rider");
    } finally {
      T(!1);
    }
  }
  return /* @__PURE__ */ u.jsxDEV("div", { className: "create-rider-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ u.jsxDEV("div", { className: "create-rider-modal", children: [
    /* @__PURE__ */ u.jsxDEV("header", { className: "create-rider-header", children: [
      /* @__PURE__ */ u.jsxDEV("h3", { className: "create-rider-title", children: "Create Rider" }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 100,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("button", { className: "create-rider-close", onClick: o, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 101,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreateRiderModal.jsx",
      lineNumber: 99,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV("div", { className: "create-rider-body", children: [
      L && /* @__PURE__ */ u.jsxDEV("div", { className: "auth-success", children: L }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 104,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ u.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ u.jsxDEV("input", { className: "field-input" + (G && !String(y).trim() ? " input-error" : ""), value: y, onChange: (ee) => {
          S(ee.target.value), G && se(!String(ee.target.value).trim());
        }, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 106,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 105,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("label", { className: "field-label", children: [
        "Password",
        /* @__PURE__ */ u.jsxDEV("input", { className: "field-input" + (G && !String(m) ? " input-error" : ""), type: "password", value: m, onChange: (ee) => {
          g(ee.target.value), G && $(!String(ee.target.value));
        }, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 109,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 108,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("label", { className: "field-label", children: [
        "Contact number",
        /* @__PURE__ */ u.jsxDEV("div", { className: "phone-input-wrapper", children: [
          /* @__PURE__ */ u.jsxDEV("span", { className: "phone-prefix", children: "+92" }, void 0, !1, {
            fileName: "/app/code/client/components/CreateRiderModal.jsx",
            lineNumber: 113,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u.jsxDEV(
            "input",
            {
              className: "field-input phone-input-field" + (G && String(f).trim().replace(/\D+/g, "").length !== 10 ? " input-error" : ""),
              type: "tel",
              inputMode: "tel",
              pattern: "[0-9]{10}",
              placeholder: "3001234567",
              value: f,
              onChange: (ee) => {
                const Q = ee.target.value.replace(/\D+/g, "").slice(0, 10);
                _(Q), G && oe(Q.length !== 10);
              },
              required: !0
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/components/CreateRiderModal.jsx",
              lineNumber: 114,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 112,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 111,
        columnNumber: 11
      }, this),
      O && /* @__PURE__ */ u.jsxDEV("div", { className: "auth-error", children: O }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 132,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ u.jsxDEV("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ u.jsxDEV("button", { className: "btn-secondary", onClick: o, disabled: R, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 134,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u.jsxDEV("button", { className: "btn-primary", onClick: ye, disabled: R, children: R ? "Creating…" : "Create" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 135,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 133,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreateRiderModal.jsx",
      lineNumber: 103,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/CreateRiderModal.jsx",
    lineNumber: 98,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/CreateRiderModal.jsx",
    lineNumber: 97,
    columnNumber: 5
  }, this);
}
const Ef = "app.settings.fares", ga = {
  baseFare: 0,
  farePerKm: 2
};
function ME() {
  if (typeof window > "u" || !window.localStorage)
    return { ...ga };
  try {
    const o = window.localStorage.getItem(Ef);
    if (!o)
      return { ...ga };
    const d = JSON.parse(o), m = Number(d == null ? void 0 : d.baseFare), g = Number(d == null ? void 0 : d.farePerKm);
    return {
      baseFare: Number.isFinite(m) ? m : ga.baseFare,
      farePerKm: Number.isFinite(g) ? g : ga.farePerKm
    };
  } catch {
    return { ...ga };
  }
}
const VE = "riderPerformancePct";
function AE() {
  if (typeof window > "u") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}
function LE() {
  const o = AE();
  if (!o) return {};
  try {
    const d = o.getItem(VE);
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
  const d = LE(), m = String(o);
  return d[m];
}
function L_(o) {
  if (!o || typeof o != "object") return;
  const d = AE();
  if (!d) return;
  const m = Object.entries(o);
  if (m.length === 0) return;
  const g = LE();
  let y = !1;
  const S = { ...g };
  for (const [f, _] of m) {
    const R = String(f);
    let T;
    if (typeof _ == "number")
      T = _;
    else if (typeof _ == "string")
      T = Number(_);
    else
      continue;
    Number.isFinite(T) && S[R] !== T && (S[R] = T, y = !0);
  }
  if (y)
    try {
      d.setItem(VE, JSON.stringify(S));
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
function P_(o, d) {
  if (!Array.isArray(o) || !d) return 0;
  let m = 0;
  for (const g of o)
    z_(g) === d && (m += 1);
  return m;
}
function H_() {
  const o = () => {
    const k = /* @__PURE__ */ new Date(), Z = new Date(k.getFullYear(), k.getMonth(), 1), pe = `${Z.getFullYear()}-${String(Z.getMonth() + 1).padStart(2, "0")}-${String(Z.getDate()).padStart(2, "0")}`, te = `${k.getFullYear()}-${String(k.getMonth() + 1).padStart(2, "0")}-${String(k.getDate()).padStart(2, "0")}`;
    return { from: pe, to: te };
  }, d = N.useMemo(() => o(), []), [m, g] = N.useState([]), [y, S] = N.useState(""), [f, _] = N.useState(!0), [R, T] = N.useState(""), [O, E] = N.useState(1), [L, U] = N.useState(20), [B, se] = N.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [ie, oe] = N.useState(!1), [W, $] = N.useState(ga), [G, le] = N.useState(d.from), [I, H] = N.useState(d.to), [ye, ee] = N.useState(/* @__PURE__ */ new Map());
  N.useEffect(() => {
    function k() {
      $(ME());
    }
    k();
    function Z(pe) {
      pe.key === Ef && k();
    }
    return typeof window < "u" && (window.addEventListener("storage", Z), window.addEventListener("fare-settings-changed", k)), () => {
      typeof window < "u" && (window.removeEventListener("storage", Z), window.removeEventListener("fare-settings-changed", k));
    };
  }, []), N.useEffect(() => {
    let k = !0;
    return (async () => {
      var Z, pe, te, _e;
      _(!0), T("");
      try {
        const Qe = new URLSearchParams();
        y && Qe.set("q", y), Qe.set("page", String(O)), Qe.set("limit", String(L));
        const ne = await fetch(`/api/riders?${Qe.toString()}`, { credentials: "include" });
        if (ne.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ne.ok) throw new Error("Failed to load riders");
        const Me = await ne.json();
        k && (g(Array.isArray(Me.riders) ? Me.riders : []), se({ total: ((Z = Me.meta) == null ? void 0 : Z.total) || 0, page: ((pe = Me.meta) == null ? void 0 : pe.page) || 1, limit: ((te = Me.meta) == null ? void 0 : te.limit) || L, pages: ((_e = Me.meta) == null ? void 0 : _e.pages) || 1 }));
      } catch (Qe) {
        k && T(Qe.message || "Failed to load riders");
      } finally {
        k && _(!1);
      }
    })(), () => {
      k = !1;
    };
  }, [y, O, L]), N.useEffect(() => {
    if (!G || !I || !m.length) return;
    let k = !0;
    return (async () => {
      const Z = /* @__PURE__ */ new Map();
      for (const pe of m) {
        const te = `${pe.id}:${G}:${I}`;
        try {
          const _e = await fetch(`/api/riders/${pe.id}/km-in-range?fromDate=${G}&toDate=${I}`, { credentials: "include" });
          if (_e.status === 401) {
            window.location.href = "/auth/login";
            return;
          }
          if (_e.ok) {
            const Qe = await _e.json();
            k && (Z.set(te, {
              km: Qe.totalKm || 0,
              rideCount: Qe.rideCount || 0,
              performancePct: Qe.performancePct || 0
            }), console.log(`km-in-range for ${pe.id}:`, Qe));
          } else {
            const Qe = await _e.text();
            console.error(`km-in-range error for ${pe.id}:`, _e.status, Qe);
          }
        } catch (_e) {
          console.error(`km-in-range fetch error for ${pe.id}:`, _e);
        }
      }
      k && ee(Z);
    })(), () => {
      k = !1;
    };
  }, [G, I, m]);
  const Q = N.useMemo(() => m.filter((k) => {
    if (y && !String(k.name || "").toLowerCase().includes(y.toLowerCase().trim())) return !1;
    if (G || I) {
      const Z = Number(k.lastActiveDays ?? 0), pe = G ? new Date(G) : null, te = I ? new Date(I) : null;
      if (pe && te) {
        const _e = Math.floor((Date.now() - pe.getTime()) / 864e5), Qe = Math.floor((Date.now() - te.getTime()) / (1e3 * 60 * 60 * 24));
        if (Z < Qe || Z > _e) return !1;
      } else if (pe) {
        const _e = Math.floor((Date.now() - pe.getTime()) / 864e5);
        if (Z > _e) return !1;
      } else if (te) {
        const _e = Math.floor((Date.now() - te.getTime()) / 864e5);
        if (Z < _e) return !1;
      }
    }
    return !0;
  }), [m, y, G, I]), re = N.useMemo(() => {
    const k = Number(W.farePerKm);
    return Number.isFinite(k) ? k : ga.farePerKm;
  }, [W]), je = N.useMemo(() => {
    const k = Number(W.baseFare);
    return Number.isFinite(k) ? k : ga.baseFare;
  }, [W]);
  N.useEffect(() => {
    if (!Array.isArray(m) || m.length === 0) return;
    const k = {};
    for (const Z of m) {
      if (!Z || Z.id === void 0 || Z.id === null) continue;
      const pe = Number(Z.performancePct);
      Number.isFinite(pe) && (k[Z.id] = Math.round(pe));
    }
    Object.keys(k).length !== 0 && L_(k);
  }, [m]);
  const Y = N.useMemo(() => {
    const k = /* @__PURE__ */ new Date(), Z = [], pe = [];
    for (let te = 2; te >= 0; te--) {
      const _e = new Date(k.getFullYear(), k.getMonth() - te, 1), Qe = `${_e.getFullYear()}-${String(_e.getMonth() + 1).padStart(2, "0")}`, ne = _e.toLocaleString(void 0, { month: "short", year: "numeric" });
      Z.push(Qe), pe.push(ne);
    }
    return { keys: Z, labels: pe };
  }, []);
  return /* @__PURE__ */ u.jsxDEV(Or, { children: /* @__PURE__ */ u.jsxDEV("section", { className: "rider-management", children: [
    /* @__PURE__ */ u.jsxDEV("header", { className: "rc-header riders-header", children: [
      /* @__PURE__ */ u.jsxDEV("div", { className: "riders-header-left", children: [
        /* @__PURE__ */ u.jsxDEV("h2", { className: "rc-title", children: "Rider Management" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 236,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u.jsxDEV("p", { className: "rc-subtitle", children: "View and manage riders based on performance." }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 237,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 235,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ u.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => oe(!0), children: "Create Rider" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 240,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 239,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 234,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ u.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ u.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 246,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: y, onChange: (k) => {
          S(k.target.value), E(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 247,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 245,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("div", { className: "rc-filters", children: /* @__PURE__ */ u.jsxDEV("div", { className: "date-range-filter", children: [
        /* @__PURE__ */ u.jsxDEV("input", { type: "date", className: "date-range-input", value: G, onChange: (k) => {
          le(k.target.value), E(1);
        }, placeholder: "From", title: "Filter from date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 251,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ u.jsxDEV("span", { className: "date-range-separator", children: "to" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 252,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ u.jsxDEV("input", { type: "date", className: "date-range-input", value: I, onChange: (k) => {
          H(k.target.value), E(1);
        }, placeholder: "To", title: "Filter to date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 253,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 250,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 249,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 244,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV("div", { className: "rc-table-wrapper", children: [
      ie && /* @__PURE__ */ u.jsxDEV(V_, { onClose: () => oe(!1), onCreated: () => {
        window.location.reload();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 260,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ u.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ u.jsxDEV("thead", { children: /* @__PURE__ */ u.jsxDEV("tr", { children: [
          /* @__PURE__ */ u.jsxDEV("th", { className: "col-name", children: "Rider Name" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 265,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ u.jsxDEV("th", { className: "col-month", children: "Range" }, Y.keys[Y.keys.length - 1], !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 266,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ u.jsxDEV("th", { className: "col-earnings", children: (() => {
            const k = Y.keys[Y.keys.length - 2], Z = String(k).split("-"), pe = parseInt(Z[0], 10), te = parseInt(Z[1], 10);
            return `Earnings (${new Date(Number.isFinite(pe) ? pe : (/* @__PURE__ */ new Date()).getFullYear(), Number.isFinite(te) ? te - 1 : (/* @__PURE__ */ new Date()).getMonth() - 1, 1).toLocaleString(void 0, { month: "short" })}, Rs)`;
          })() }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 267,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ u.jsxDEV("th", { className: "col-perf", children: "Performance" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 268,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ u.jsxDEV("th", { className: "col-total", children: "Total" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 269,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 264,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 263,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u.jsxDEV("tbody", { children: [
          f && /* @__PURE__ */ u.jsxDEV("tr", { children: /* @__PURE__ */ u.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 274,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 274,
            columnNumber: 17
          }, this),
          !f && R && /* @__PURE__ */ u.jsxDEV("tr", { children: /* @__PURE__ */ u.jsxDEV("td", { colSpan: 7, className: "auth-error", children: R }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 277,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 277,
            columnNumber: 17
          }, this),
          !f && !R && Q.map((k) => /* @__PURE__ */ u.jsxDEV("tr", { "data-rider-id": k.id, "data-status": k.status, "data-last-days": k.lastActiveDays, children: [
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ u.jsxDEV("a", { className: "rider-name-link", href: `/riders/${k.id}`, children: k.name }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 281,
              columnNumber: 47
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 281,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-month", children: (() => {
              var Z;
              if (G && I) {
                const pe = `${k.id}:${G}:${I}`, te = ye.get(pe), _e = (te == null ? void 0 : te.km) ?? 0;
                return `${Number(_e).toFixed(2)} km`;
              }
              return `${Number(((Z = k.monthlyCounts) == null ? void 0 : Z[Y.keys[Y.keys.length - 1]]) || 0).toFixed(2)} km`;
            })() }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 282,
              columnNumber: 19
            }, this),
            (() => {
              var _e, Qe;
              let Z = 0, pe = 0;
              if (G && I) {
                const ne = `${k.id}:${G}:${I}`, Me = ye.get(ne);
                Z = (Me == null ? void 0 : Me.km) ?? 0, pe = (Me == null ? void 0 : Me.rideCount) ?? 0;
              } else {
                const ne = Y.keys[Y.keys.length - 2];
                Z = Number(((_e = k.monthlyCounts) == null ? void 0 : _e[ne]) || 0);
                const Me = Array.isArray(k.orders) ? k.orders : [];
                pe = Number(((Qe = k.monthlyRideCounts) == null ? void 0 : Qe[ne]) ?? P_(Me, ne) ?? 0);
              }
              const te = Z * re + pe * je;
              return /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-earnings", children: Number.isFinite(te) ? `${te.toFixed(2)} Rs.` : "0 Rs." }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 308,
                columnNumber: 29
              }, this);
            })(),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-performance", children: (() => {
              if (G && I) {
                const Z = `${k.id}:${G}:${I}`, pe = ye.get(Z), te = (pe == null ? void 0 : pe.performancePct) ?? 0;
                return `${Number(te)}%`;
              }
              return Number.isFinite(Number(k.performancePct)) ? `${Math.round(Number(k.performancePct))}%` : "0%";
            })() }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 310,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-total", children: [
              Number(k.totalKm || 0).toFixed(2),
              " km"
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 319,
              columnNumber: 19
            }, this)
          ] }, k.id, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 280,
            columnNumber: 17
          }, this)),
          !f && !R && Q.length === 0 && /* @__PURE__ */ u.jsxDEV("tr", { children: /* @__PURE__ */ u.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No riders found." }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 323,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 323,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 272,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 262,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 258,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ u.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ u.jsxDEV("button", { className: "rc-select rc-chip", disabled: B.page <= 1 || f, onClick: () => E((k) => Math.max(1, k - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 331,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ u.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        B.page,
        " of ",
        B.pages,
        " • ",
        B.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 332,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ u.jsxDEV("button", { className: "rc-select rc-chip", disabled: B.page >= B.pages || f, onClick: () => E((k) => Math.min(B.pages, k + 1)), children: "Next" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 333,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 330,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 329,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 233,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 232,
    columnNumber: 5
  }, this);
}
const Fh = /^(-?\d+(?:\.\d+)?)\s*(m|min|mins|minutes)$/i, pE = /^(-?\d+(?:\.\d+)?)\s*(s|sec|secs|seconds)$/i;
function za(o) {
  return o !== null && typeof o == "object";
}
function ui(o) {
  if (o == null) return null;
  if (o instanceof Date) return o;
  if (typeof (o == null ? void 0 : o.toDate) == "function")
    try {
      const d = o.toDate();
      if (d instanceof Date && !Number.isNaN(d.getTime())) return d;
    } catch {
      return null;
    }
  if (za(o) && o.seconds !== void 0) {
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
  if (za(o)) {
    if (o.at) return ui(o.at);
    if (o.value && o.value !== o) return ui(o.value);
    if (o.expectedAt) return ui(o.expectedAt);
  }
  return null;
}
function xf(o) {
  if (o == null || o === "") return null;
  if (typeof o == "number")
    return Number.isFinite(o) ? o : null;
  if (o instanceof Date) return null;
  if (typeof o == "string") {
    const d = o.trim();
    if (!d) return null;
    if (Fh.test(d)) return parseFloat(d.replace(Fh, "$1"));
    if (pE.test(d)) return parseFloat(d.replace(pE, "$1")) / 60;
    const m = Number(d);
    return Number.isFinite(m) ? m : null;
  }
  if (za(o)) {
    if (Number.isFinite(o.minutes)) return Number(o.minutes);
    if (Number.isFinite(o.expectedMinutes)) return Number(o.expectedMinutes);
    if (Number.isFinite(o.seconds)) return Number(o.seconds) / 60;
    if (o.duration !== void 0 && o.duration !== o) {
      const d = xf(o.duration);
      if (d !== null) return d;
    }
    if (o.value !== void 0 && o.value !== o) {
      const d = xf(o.value);
      if (d !== null) return d;
    }
  }
  return null;
}
function B_(o) {
  var m, g, y, S, f, _;
  if (!za(o)) return null;
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
    (S = o.orders) == null ? void 0 : S.duration_minutes,
    (f = o.orders) == null ? void 0 : f.actualDuration,
    (_ = o.orders) == null ? void 0 : _.actualDurationMinutes
  ];
  for (const R of d) {
    const T = xf(R);
    if (T !== null) return T;
  }
  return null;
}
function $_(o) {
  var m, g, y, S;
  if (!za(o)) return null;
  const d = [
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
  for (const f of d)
    if (f != null) return f;
  return null;
}
function kE(o) {
  var m, g, y, S, f, _;
  if (!za(o)) return null;
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
    (S = o.orders) == null ? void 0 : S.startTime,
    (f = o.orders) == null ? void 0 : f.started_at,
    (_ = o.orders) == null ? void 0 : _.startedAt
  ];
  for (const R of d)
    if (R != null) return R;
  return null;
}
function I_(o) {
  if (!za(o)) return null;
  const d = kE(o);
  return d ?? null;
}
function UE(o) {
  if (!za(o)) return null;
  const d = B_(o);
  if (Number.isFinite(d)) return d;
  const m = ui($_(o)), g = ui(kE(o));
  if (m instanceof Date && g instanceof Date) {
    const y = m.getTime() - g.getTime();
    if (y >= 0)
      return Math.round(y / 6e4);
  }
  return null;
}
function FE(o) {
  const d = ui(o);
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) return "-";
  try {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "-";
  }
}
function zE(o) {
  if (o == null) return "-";
  if (za(o) && o.minutes !== void 0) {
    const m = Number(o.minutes);
    if (Number.isFinite(m)) return `${m} min`;
  }
  const d = ui(o);
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
    const g = m.match(Fh);
    return g ? `${g[1].replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1")} min` : m;
  }
  if (za(o) && o.expectedMinutes !== void 0) {
    const m = Number(o.expectedMinutes);
    if (Number.isFinite(m)) return `${m} min`;
  }
  return String(o);
}
function PE(o) {
  var g, y, S, f, _, R, T, O;
  if (!za(o)) return null;
  const d = [
    o.expected_delivery_time,
    o.expectedDeliveryTime,
    (g = o.order) == null ? void 0 : g.expected_delivery_time,
    (y = o.order) == null ? void 0 : y.expectedDeliveryTime,
    (S = o.orders) == null ? void 0 : S.expected_delivery_time,
    (f = o.orders) == null ? void 0 : f.expectedDeliveryTime,
    (_ = o.delivery) == null ? void 0 : _.expected_delivery_time,
    (R = o.delivery) == null ? void 0 : R.expectedDeliveryTime,
    (T = o.expected_delivery) == null ? void 0 : T.time,
    (O = o.expected_delivery) == null ? void 0 : O.minutes,
    o.expected_time,
    o.expectedTime,
    o.expectedMinutes
  ];
  for (const E of d)
    if (E != null && !(typeof E == "string" && !E.trim()))
      return E;
  const m = o.delivery_events || o.deliveryEvents || o.events || null;
  if (Array.isArray(m))
    for (let E = m.length - 1; E >= 0; E -= 1) {
      const L = m[E];
      if (!L) continue;
      const U = typeof L.type == "string" ? L.type.toLowerCase().trim() : "";
      if (!(U !== "eta" && U !== "expected")) {
        if (L.expectedMinutes !== void 0 && L.expectedMinutes !== null) return { minutes: L.expectedMinutes };
        if (L.minutes !== void 0 && L.minutes !== null) return { minutes: L.minutes };
        if (L.expectedAt) return L.expectedAt;
      }
    }
  return null;
}
function HE(o) {
  const d = xf(o);
  if (d === null || !Number.isFinite(d)) return "-";
  const m = Math.round(d);
  if (m < 60) return `${m} min`;
  const g = Math.floor(m / 60), y = m % 60;
  return `${g}h ${y}m`;
}
function Y_() {
  var U;
  const { id: o } = Fw(), [d, m] = N.useState(null), [g, y] = N.useState(!0), [S, f] = N.useState(""), [_, R] = N.useState(null);
  if (N.useEffect(() => {
    const B = A_(o);
    if (typeof B == "number" && Number.isFinite(B))
      R(B);
    else if (typeof B == "string") {
      const se = Number(B);
      Number.isFinite(se) ? R(se) : R(null);
    } else
      R(null);
  }, [o]), N.useEffect(() => {
    let B = !0;
    return (async () => {
      y(!0), f("");
      try {
        const se = await fetch(`/api/riders/${o}`, { credentials: "include" });
        if (se.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!se.ok) throw new Error("Failed to load rider");
        const ie = await se.json();
        B && m(ie);
      } catch (se) {
        B && f(se.message || "Failed to load rider");
      } finally {
        B && y(!1);
      }
    })(), () => {
      B = !1;
    };
  }, [o]), g)
    return /* @__PURE__ */ u.jsxDEV(Or, { children: /* @__PURE__ */ u.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ u.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
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
    return /* @__PURE__ */ u.jsxDEV(Or, { children: /* @__PURE__ */ u.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ u.jsxDEV("div", { className: "auth-error", children: S }, void 0, !1, {
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
    return /* @__PURE__ */ u.jsxDEV(Or, { children: /* @__PURE__ */ u.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ u.jsxDEV("div", { className: "section-note", children: "Not found" }, void 0, !1, {
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
  const { rider: T, metrics: O, history: E } = d, L = _ ?? (Number.isFinite(Number(O == null ? void 0 : O.onTimeRate)) ? Math.round(Number(O.onTimeRate)) : 0);
  return /* @__PURE__ */ u.jsxDEV(Or, { children: /* @__PURE__ */ u.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ u.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ u.jsxDEV("h2", { className: "rc-title", children: "Rider Profile" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 63,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("p", { className: "rc-subtitle", children: "View detailed performance metrics for individual riders." }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 64,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 62,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV("div", { className: "rc-table-wrapper rp-card", children: /* @__PURE__ */ u.jsxDEV("div", { className: "rp-details", children: [
      /* @__PURE__ */ u.jsxDEV("img", { src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2Ff54e0df2f0fb4bff9c894340e2efe67a?format=webp&width=72", alt: "avatar", className: "rp-avatar" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 69,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ u.jsxDEV("div", { children: [
        /* @__PURE__ */ u.jsxDEV("h3", { className: "rp-name", children: T.name }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 71,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ u.jsxDEV("div", { className: "section-note", children: [
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
    /* @__PURE__ */ u.jsxDEV("div", { className: "rc-toolbar rp-stats", children: /* @__PURE__ */ u.jsxDEV("div", { className: "rc-filters rp-stats-wrap", children: [
      /* @__PURE__ */ u.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Total Deliveries ",
        /* @__PURE__ */ u.jsxDEV("strong", { children: Array.isArray(T.orders) ? T.orders.length : 0 }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 79,
          columnNumber: 70
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 79,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ u.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "On-Time Rate ",
        /* @__PURE__ */ u.jsxDEV("strong", { children: [
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
      /* @__PURE__ */ u.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Total KM Traveled ",
        /* @__PURE__ */ u.jsxDEV("strong", { children: [
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
    /* @__PURE__ */ u.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ u.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ u.jsxDEV("thead", { children: /* @__PURE__ */ u.jsxDEV("tr", { children: [
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-name order-heading", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 89,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-km date-heading", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-start-time start-heading", children: "Start" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 91,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-expected expected-heading", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 92,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-actual actual-heading", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 93,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-comm distance-heading", children: "Distance (KM)" }, void 0, !1, {
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
      /* @__PURE__ */ u.jsxDEV("tbody", { children: [
        (d.riderOrders || []).map((B, se) => {
          const ie = B.name || B.orderId, oe = ui(B.created_at), W = oe instanceof Date && !Number.isNaN(oe.getTime()) ? oe.toISOString().slice(0, 10) : "-", $ = FE(B.deliveryStartTime), G = PE(B), le = zE(G), I = UE(B), H = HE(I), ye = Number(B.distance_km), ee = Number.isFinite(ye) ? `${ye.toFixed(2)} km` : typeof B.distance_km == "string" && B.distance_km.trim() ? B.distance_km : "-";
          return /* @__PURE__ */ u.jsxDEV("tr", { children: [
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-name order-cell", children: ie }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 113,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-km date-cell", children: W }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 114,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-start-time start-cell", children: $ }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 115,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-expected expected-cell", children: le }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 116,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: H }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 117,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-commission distance-cell", children: ee }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 118,
              columnNumber: 21
            }, this)
          ] }, B.orderId || se, !0, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 112,
            columnNumber: 19
          }, this);
        }),
        !((U = d.riderOrders) != null && U.length) && (E || []).map((B, se) => /* @__PURE__ */ u.jsxDEV("tr", { children: [
          /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-name order-cell", children: B.date }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 124,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-km date-cell", children: B.deliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 125,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-start-time start-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 126,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-expected expected-cell", children: B.avgTime ? `${B.avgTime} min` : "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 127,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 128,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-commission distance-cell", children: Number.isFinite(Number(B.distanceKm)) ? `${Number(B.distanceKm).toFixed(2)} km` : B.distanceKm || "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 129,
            columnNumber: 19
          }, this)
        ] }, `h-${se}`, !0, {
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
  const [g, y] = N.useState([]), [S, f] = N.useState([]), [_, R] = N.useState(""), [T, O] = N.useState(""), [E, L] = N.useState(""), [U, B] = N.useState(""), [se, ie] = N.useState(!0), [oe, W] = N.useState(!0), [$, G] = N.useState(""), [le, I] = N.useState(""), [H, ye] = N.useState(!1);
  N.useEffect(() => {
    let Y = !0;
    return (async () => {
      ie(!0), G("");
      try {
        const k = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (k.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!k.ok) throw new Error("Failed to load riders");
        const Z = await k.json();
        Y && y(Array.isArray(Z.riders) ? Z.riders : []);
      } catch (k) {
        Y && G(k.message || "Failed to load riders");
      } finally {
        Y && ie(!1);
      }
    })(), () => {
      Y = !1;
    };
  }, []), N.useEffect(() => {
    let Y = !0;
    return (async () => {
      W(!0), I("");
      try {
        const k = await fetch("/api/packers?limit=200", { credentials: "include" });
        if (k.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!k.ok) throw new Error("Failed to load packers");
        const Z = await k.json();
        Y && f(Array.isArray(Z.packers) ? Z.packers : []);
      } catch (k) {
        Y && I(k.message || "Failed to load packers");
      } finally {
        Y && W(!1);
      }
    })(), () => {
      Y = !1;
    };
  }, []);
  async function ee() {
    if (!_ || !T) {
      alert("Please select both a rider and a packer");
      return;
    }
    if (!E.trim()) {
      alert("Please enter a payment method");
      return;
    }
    if (!U.trim()) {
      alert("Please enter an amount");
      return;
    }
    ye(!0);
    try {
      const Y = await fetch(`/api/orders/${encodeURIComponent(o)}/assign`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ riderId: _, paymentMethod: E.trim(), amount: U.trim() })
      });
      if (Y.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const k = await Y.json().catch(() => null);
      if (!Y.ok) throw new Error(k && k.error ? k.error : "Assign failed");
      const Z = await fetch(`/api/orders/${encodeURIComponent(o)}/assign-packer`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packerId: T, paymentMethod: E.trim(), amount: U.trim() })
      });
      if (Z.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const pe = await Z.json().catch(() => null);
      if (!Z.ok) throw new Error(pe && pe.error ? pe.error : "Assign failed");
      m && m({ orderId: o, riderId: _, packerId: T, paymentMethod: E.trim(), amount: U.trim() });
      try {
        window && typeof window.showToast == "function" && window.showToast("Order assigned successfully", { type: "success" });
      } catch {
      }
      d();
    } catch (Y) {
      alert(Y.message || "Failed to assign");
    } finally {
      ye(!1);
    }
  }
  const Q = $ || "", re = le || "", je = se || oe;
  return /* @__PURE__ */ u.jsxDEV("div", { className: "assign-modal-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ u.jsxDEV("div", { className: "assign-modal", children: [
    /* @__PURE__ */ u.jsxDEV("header", { className: "assign-modal-header", children: [
      /* @__PURE__ */ u.jsxDEV("h3", { className: "assign-modal-title", children: "Assign Rider & Packer" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 101,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("button", { className: "assign-modal-close", onClick: d, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 102,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 100,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV("div", { className: "assign-modal-body", children: je ? /* @__PURE__ */ u.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 106,
      columnNumber: 13
    }, this) : /* @__PURE__ */ u.jsxDEV(u.Fragment, { children: [
      /* @__PURE__ */ u.jsxDEV("div", { className: "assign-form", children: [
        /* @__PURE__ */ u.jsxDEV("div", { className: "form-group", children: [
          /* @__PURE__ */ u.jsxDEV("label", { className: "field-label", children: [
            "Select Rider",
            /* @__PURE__ */ u.jsxDEV(
              "select",
              {
                className: "field-input assign-dropdown",
                value: _,
                onChange: (Y) => R(Y.target.value),
                disabled: H,
                children: [
                  /* @__PURE__ */ u.jsxDEV("option", { value: "", children: "-- Choose a rider --" }, void 0, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 118,
                    columnNumber: 23
                  }, this),
                  [...g].sort((Y, k) => Y.name.localeCompare(k.name)).map((Y) => /* @__PURE__ */ u.jsxDEV("option", { value: Y.id, children: Y.name }, Y.id, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 120,
                    columnNumber: 25
                  }, this))
                ]
              },
              void 0,
              !0,
              {
                fileName: "/app/code/client/components/AssignModal.jsx",
                lineNumber: 112,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 111,
            columnNumber: 19
          }, this),
          Q && /* @__PURE__ */ u.jsxDEV("div", { className: "auth-error", children: Q }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 124,
            columnNumber: 34
          }, this),
          g.length === 0 && !Q && /* @__PURE__ */ u.jsxDEV("div", { className: "section-note", children: "No riders available" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 125,
            columnNumber: 58
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 110,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("div", { className: "form-group", children: [
          /* @__PURE__ */ u.jsxDEV("label", { className: "field-label", children: [
            "Select Packer",
            /* @__PURE__ */ u.jsxDEV(
              "select",
              {
                className: "field-input assign-dropdown",
                value: T,
                onChange: (Y) => O(Y.target.value),
                disabled: H,
                children: [
                  /* @__PURE__ */ u.jsxDEV("option", { value: "", children: "-- Choose a packer --" }, void 0, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 136,
                    columnNumber: 23
                  }, this),
                  [...S].sort((Y, k) => Y.name.localeCompare(k.name)).map((Y) => /* @__PURE__ */ u.jsxDEV("option", { value: Y.id, children: Y.name }, Y.id, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 138,
                    columnNumber: 25
                  }, this))
                ]
              },
              void 0,
              !0,
              {
                fileName: "/app/code/client/components/AssignModal.jsx",
                lineNumber: 130,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 129,
            columnNumber: 19
          }, this),
          re && /* @__PURE__ */ u.jsxDEV("div", { className: "auth-error", children: re }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 142,
            columnNumber: 35
          }, this),
          S.length === 0 && !re && /* @__PURE__ */ u.jsxDEV("div", { className: "section-note", children: "No packers available" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 143,
            columnNumber: 60
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 128,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("div", { className: "form-group", children: /* @__PURE__ */ u.jsxDEV("label", { className: "field-label", children: [
          "Payment Method",
          /* @__PURE__ */ u.jsxDEV(
            "input",
            {
              type: "text",
              className: "field-input assign-dropdown",
              placeholder: "e.g., Cash, Card, Online",
              value: E,
              onChange: (Y) => L(Y.target.value),
              disabled: H
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 148,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 147,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 146,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("div", { className: "form-group", children: /* @__PURE__ */ u.jsxDEV("label", { className: "field-label", children: [
          "Amount",
          /* @__PURE__ */ u.jsxDEV(
            "input",
            {
              type: "text",
              className: "field-input assign-dropdown",
              placeholder: "e.g., 500",
              value: U,
              onChange: (Y) => B(Y.target.value),
              disabled: H
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 161,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 160,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 159,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 109,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ u.jsxDEV("div", { className: "assign-modal-actions", children: [
        /* @__PURE__ */ u.jsxDEV("button", { className: "btn-secondary", onClick: d, disabled: H, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 174,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("button", { className: "btn-primary", onClick: ee, disabled: H || !_ || !T, children: H ? "Assigning…" : "Assign" }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 175,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 173,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 108,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 104,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/AssignModal.jsx",
    lineNumber: 99,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/AssignModal.jsx",
    lineNumber: 98,
    columnNumber: 5
  }, this);
}
function q_({ order: o, onClose: d, onUpdated: m }) {
  const [g, y] = N.useState([]), [S, f] = N.useState([]), [_, R] = N.useState(""), [T, O] = N.useState(""), [E, L] = N.useState(""), [U, B] = N.useState(""), [se, ie] = N.useState(!0), [oe, W] = N.useState(""), [$, G] = N.useState(!1);
  N.useEffect(() => {
    let I = !0;
    return (async () => {
      var H;
      ie(!0), W("");
      try {
        const ye = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (ye.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ye.ok) throw new Error("Failed to load riders");
        const ee = await ye.json();
        if (I) {
          y(Array.isArray(ee.riders) ? ee.riders : []);
          const Q = ((H = o.assignment) == null ? void 0 : H.riderId) || o.riderId || o.rider_id || "";
          R(String(Q));
        }
      } catch (ye) {
        I && W(ye.message || "Failed to load riders");
      } finally {
        I && ie(!1);
      }
    })(), () => {
      I = !1;
    };
  }, [o]), N.useEffect(() => {
    let I = !0;
    return (async () => {
      var H;
      try {
        const ye = await fetch("/api/packers?limit=200", { credentials: "include" });
        if (ye.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ye.ok) throw new Error("Failed to load packers");
        const ee = await ye.json();
        if (I) {
          f(Array.isArray(ee.packers) ? ee.packers : []);
          const Q = ((H = o.assignment) == null ? void 0 : H.packerId) || o.packed_by || o.packer_id || "";
          O(String(Q));
        }
      } catch (ye) {
        I && W(ye.message || "Failed to load packers");
      }
    })(), () => {
      I = !1;
    };
  }, [o]), N.useEffect(() => {
    var ye, ee;
    const I = ((ye = o.assignment) == null ? void 0 : ye.paymentMethod) || o.paymentMethod || "", H = ((ee = o.assignment) == null ? void 0 : ee.amount) || o.amount || "";
    L(String(I)), B(String(H));
  }, [o]);
  async function le() {
    if (!_ || !T) {
      alert("Please select both a rider and a packer");
      return;
    }
    if (!E.trim()) {
      alert("Please enter a payment method");
      return;
    }
    if (!U.trim()) {
      alert("Please enter an amount");
      return;
    }
    G(!0);
    try {
      const I = o.name || o.order_number || o.id, H = await fetch(`/api/orders/${encodeURIComponent(I)}/assign`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ riderId: _, paymentMethod: E.trim(), amount: U.trim() })
      });
      if (H.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const ye = await H.json().catch(() => null);
      if (!H.ok) throw new Error(ye && ye.error ? ye.error : "Update failed");
      const ee = await fetch(`/api/orders/${encodeURIComponent(I)}/assign-packer`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packerId: T, paymentMethod: E.trim(), amount: U.trim() })
      });
      if (ee.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const Q = await ee.json().catch(() => null);
      if (!ee.ok) throw new Error(Q && Q.error ? Q.error : "Update failed");
      try {
        window && typeof window.showToast == "function" && window.showToast("Order updated successfully", { type: "success" });
      } catch {
      }
      m && m(), d();
    } catch (I) {
      alert(I.message || "Failed to update order");
    } finally {
      G(!1);
    }
  }
  return /* @__PURE__ */ u.jsxDEV("div", { className: "edit-modal-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ u.jsxDEV("div", { className: "edit-modal", children: [
    /* @__PURE__ */ u.jsxDEV("header", { className: "edit-modal-header", children: [
      /* @__PURE__ */ u.jsxDEV("h3", { className: "edit-modal-title", children: "Edit Order Assignment" }, void 0, !1, {
        fileName: "/app/code/client/components/EditOrderModal.jsx",
        lineNumber: 108,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("button", { className: "edit-modal-close", onClick: d, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/EditOrderModal.jsx",
        lineNumber: 109,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/EditOrderModal.jsx",
      lineNumber: 107,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV("div", { className: "edit-modal-body", children: se ? /* @__PURE__ */ u.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
      fileName: "/app/code/client/components/EditOrderModal.jsx",
      lineNumber: 113,
      columnNumber: 13
    }, this) : /* @__PURE__ */ u.jsxDEV(u.Fragment, { children: [
      oe && /* @__PURE__ */ u.jsxDEV("div", { className: "auth-error", children: oe }, void 0, !1, {
        fileName: "/app/code/client/components/EditOrderModal.jsx",
        lineNumber: 116,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ u.jsxDEV("div", { className: "edit-form", children: [
        /* @__PURE__ */ u.jsxDEV("div", { className: "form-group", children: [
          /* @__PURE__ */ u.jsxDEV("label", { className: "field-label", children: [
            "Select Rider",
            /* @__PURE__ */ u.jsxDEV(
              "select",
              {
                className: "field-input edit-dropdown",
                value: _,
                onChange: (I) => R(I.target.value),
                disabled: $,
                children: [
                  /* @__PURE__ */ u.jsxDEV("option", { value: "", children: "-- Choose a rider --" }, void 0, !1, {
                    fileName: "/app/code/client/components/EditOrderModal.jsx",
                    lineNumber: 126,
                    columnNumber: 23
                  }, this),
                  [...g].sort((I, H) => I.name.localeCompare(H.name)).map((I) => /* @__PURE__ */ u.jsxDEV("option", { value: I.id, children: I.name }, I.id, !1, {
                    fileName: "/app/code/client/components/EditOrderModal.jsx",
                    lineNumber: 128,
                    columnNumber: 25
                  }, this))
                ]
              },
              void 0,
              !0,
              {
                fileName: "/app/code/client/components/EditOrderModal.jsx",
                lineNumber: 120,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/EditOrderModal.jsx",
            lineNumber: 119,
            columnNumber: 19
          }, this),
          g.length === 0 && !oe && /* @__PURE__ */ u.jsxDEV("div", { className: "section-note", children: "No riders available" }, void 0, !1, {
            fileName: "/app/code/client/components/EditOrderModal.jsx",
            lineNumber: 132,
            columnNumber: 53
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 118,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("div", { className: "form-group", children: [
          /* @__PURE__ */ u.jsxDEV("label", { className: "field-label", children: [
            "Select Packer",
            /* @__PURE__ */ u.jsxDEV(
              "select",
              {
                className: "field-input edit-dropdown",
                value: T,
                onChange: (I) => O(I.target.value),
                disabled: $,
                children: [
                  /* @__PURE__ */ u.jsxDEV("option", { value: "", children: "-- Choose a packer --" }, void 0, !1, {
                    fileName: "/app/code/client/components/EditOrderModal.jsx",
                    lineNumber: 143,
                    columnNumber: 23
                  }, this),
                  [...S].sort((I, H) => I.name.localeCompare(H.name)).map((I) => /* @__PURE__ */ u.jsxDEV("option", { value: I.id, children: I.name }, I.id, !1, {
                    fileName: "/app/code/client/components/EditOrderModal.jsx",
                    lineNumber: 145,
                    columnNumber: 25
                  }, this))
                ]
              },
              void 0,
              !0,
              {
                fileName: "/app/code/client/components/EditOrderModal.jsx",
                lineNumber: 137,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/EditOrderModal.jsx",
            lineNumber: 136,
            columnNumber: 19
          }, this),
          S.length === 0 && !oe && /* @__PURE__ */ u.jsxDEV("div", { className: "section-note", children: "No packers available" }, void 0, !1, {
            fileName: "/app/code/client/components/EditOrderModal.jsx",
            lineNumber: 149,
            columnNumber: 54
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 135,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("div", { className: "form-group", children: /* @__PURE__ */ u.jsxDEV("label", { className: "field-label", children: [
          "Payment Method",
          /* @__PURE__ */ u.jsxDEV(
            "input",
            {
              type: "text",
              className: "field-input edit-dropdown",
              placeholder: "e.g., Cash, Card, Online",
              value: E,
              onChange: (I) => L(I.target.value),
              disabled: $
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/components/EditOrderModal.jsx",
              lineNumber: 154,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 153,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 152,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("div", { className: "form-group", children: /* @__PURE__ */ u.jsxDEV("label", { className: "field-label", children: [
          "Amount",
          /* @__PURE__ */ u.jsxDEV(
            "input",
            {
              type: "text",
              className: "field-input edit-dropdown",
              placeholder: "e.g., 500",
              value: U,
              onChange: (I) => B(I.target.value),
              disabled: $
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/components/EditOrderModal.jsx",
              lineNumber: 167,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 166,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 165,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/EditOrderModal.jsx",
        lineNumber: 117,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ u.jsxDEV("div", { className: "edit-modal-actions", children: [
        /* @__PURE__ */ u.jsxDEV("button", { className: "btn-secondary", onClick: d, disabled: $, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 180,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("button", { className: "btn-primary", onClick: le, disabled: $ || !_ || !T, children: $ ? "Updating…" : "Update" }, void 0, !1, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 181,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/EditOrderModal.jsx",
        lineNumber: 179,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/EditOrderModal.jsx",
      lineNumber: 115,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/components/EditOrderModal.jsx",
      lineNumber: 111,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/EditOrderModal.jsx",
    lineNumber: 106,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/EditOrderModal.jsx",
    lineNumber: 105,
    columnNumber: 5
  }, this);
}
function zh(o) {
  if (typeof o != "string") return "";
  const d = o.toLowerCase().trim().replace(/[\s-]+/g, "_");
  return d === "in_transit" ? "in_progress" : d;
}
function $E(o) {
  return o && typeof o.current_status == "string" ? o.current_status : "";
}
function mE(o) {
  return zh($E(o));
}
const G_ = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "assigned", label: "Assigned" },
  { key: "pending", label: "Pending" },
  { key: "in-progress", label: "In-Progress" },
  { key: "completed", label: "delivered" }
], hE = {
  completed: "delivered",
  "in-progress": "in_progress",
  "in-transit": "in_progress"
};
function W_() {
  const [o, d] = N.useState([]), [m, g] = N.useState(""), [y, S] = N.useState("all"), [f, _] = N.useState(1), [R, T] = N.useState(20), [O, E] = N.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [L, U] = N.useState(!0), [B, se] = N.useState(""), [ie, oe] = N.useState(""), [W, $] = N.useState(!0), [G, le] = N.useState(0), [I, H] = N.useState(!1), [ye, ee] = N.useState(null), [Q, re] = N.useState(!1), [je, Y] = N.useState(null);
  N.useEffect(() => {
    let ne = !0;
    return (async () => {
      var Me, ut, zt, Mt;
      U(!0), se(""), oe("");
      try {
        const xt = new URLSearchParams();
        if (m && xt.set("q", m), y && y !== "all") {
          const on = hE[y] || y;
          xt.set("status", zh(on));
        }
        xt.set("page", String(f)), xt.set("limit", String(R));
        const Pt = await fetch(`/api/orders?${xt.toString()}`, { credentials: "include" });
        if (Pt.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Pt.ok) throw new Error("Failed to load orders");
        const st = await Pt.json();
        ne && (d(Array.isArray(st.orders) ? st.orders : []), oe(st.shopifyError || ""), $(!!st.shopifyConfigured), E({ total: ((Me = st.meta) == null ? void 0 : Me.total) || 0, page: ((ut = st.meta) == null ? void 0 : ut.page) || 1, limit: ((zt = st.meta) == null ? void 0 : zt.limit) || R, pages: ((Mt = st.meta) == null ? void 0 : Mt.pages) || 1 }));
      } catch (xt) {
        ne && se(xt.message || "Failed to load orders");
      } finally {
        ne && U(!1);
      }
    })(), () => {
      ne = !1;
    };
  }, [m, y, f, R, G]), N.useMemo(() => o, [o]);
  const k = N.useMemo(() => {
    if (!Array.isArray(o)) return [];
    if (y === "all") return o.slice();
    const ne = zh(hE[y] || y);
    return o.filter((Me) => mE(Me) === ne);
  }, [o, y]);
  function Z() {
    ee(null), H(!1);
  }
  function pe(ne) {
    Y(ne), re(!0);
  }
  function te() {
    Y(null), re(!1);
  }
  function _e(ne) {
    try {
      const { orderId: Me } = ne || {};
      if (!Me) return;
      const ut = String(Me).replace(/^#+/, "");
      _(1);
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${Me}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  async function Qe(ne) {
    if (ne)
      try {
        const Me = await fetch(`/api/orders/${encodeURIComponent(ne)}/unassign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });
        if (Me.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Me.ok) throw new Error("Failed to unassign order");
        try {
          window && typeof window.showToast == "function" && window.showToast(`Order unassigned: ${ne}`, { type: "success" });
        } catch {
        }
        _(1), le((ut) => ut + 1);
      } catch (Me) {
        try {
          window && typeof window.showToast == "function" && window.showToast(Me.message || "Failed to unassign order", { type: "error" });
        } catch {
        }
      }
  }
  return /* @__PURE__ */ u.jsxDEV(Or, { children: /* @__PURE__ */ u.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ u.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ u.jsxDEV("h2", { className: "rc-title", children: "Order Management" }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 127,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 128,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 126,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ u.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ u.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 133,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: m, onChange: (ne) => {
          g(ne.target.value), _(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 134,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 132,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("div", { className: "rc-filters", children: G_.map(({ key: ne, label: Me }) => /* @__PURE__ */ u.jsxDEV("button", { className: `rc-select rc-chip${y === ne ? " active" : ""}`, onClick: () => {
        S(ne), _(1);
      }, "data-filter": ne, children: Me }, ne, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 138,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 136,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 131,
      columnNumber: 9
    }, this),
    !W && /* @__PURE__ */ u.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 146,
      columnNumber: 11
    }, this),
    ie && /* @__PURE__ */ u.jsxDEV("div", { className: "auth-error", children: ie }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 148,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ u.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ u.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ u.jsxDEV("thead", { children: /* @__PURE__ */ u.jsxDEV("tr", { children: [
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-name order-id-heading", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 154,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-km customer-heading", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 155,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-perf address-heading", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 156,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-rider rider-heading", children: "Rider" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 157,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-start-time start-heading", children: "Start" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 158,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-expected expected-heading", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 159,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-actual actual-heading", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 160,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-amount amount-heading", children: "Amount" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 161,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-payment payment-heading", children: "Payment Method" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 162,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-status status-heading", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 163,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-actions actions-heading", children: "Actions" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 164,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 153,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 152,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ u.jsxDEV("tbody", { children: [
        L && /* @__PURE__ */ u.jsxDEV("tr", { children: /* @__PURE__ */ u.jsxDEV("td", { colSpan: 11, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 169,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 169,
          columnNumber: 17
        }, this),
        !L && B && /* @__PURE__ */ u.jsxDEV("tr", { children: /* @__PURE__ */ u.jsxDEV("td", { colSpan: 11, className: "auth-error", children: B }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 172,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 172,
          columnNumber: 17
        }, this),
        !L && !B && k.map((ne, Me) => {
          var _t, wn, la;
          const ut = $E(ne), zt = mE(ne), Mt = ne.full_name || (ne.customer && ne.customer.full_name ? ne.customer.full_name : "");
          let xt = "-";
          typeof ne.shipping_address == "string" && String(ne.shipping_address).trim() ? xt = String(ne.shipping_address).trim() : ne.shipping_address && typeof ne.shipping_address == "object" ? xt = [ne.shipping_address.address1 || "", ne.shipping_address.city || "", ne.shipping_address.province || "", ne.shipping_address.country || ""].map((_n) => String(_n || "").trim()).filter(Boolean).join(", ") || "-" : typeof ne.billing_address == "string" && String(ne.billing_address).trim() ? xt = String(ne.billing_address).trim() : ne.billing_address && typeof ne.billing_address == "object" && (xt = [ne.billing_address.address1 || "", ne.billing_address.city || "", ne.billing_address.province || "", ne.billing_address.country || ""].map((_n) => String(_n || "").trim()).filter(Boolean).join(", ") || "-");
          const Pt = ne.name || ne.order_number || ne.id, st = Pt != null ? String(Pt).replace(/^#+/, "").trim() : "", on = st || "-", Ht = I_(ne), Bt = FE(Ht), $t = PE(ne), bn = zE($t), Vt = UE(ne), sn = HE(Vt), At = ne.rider ? String(ne.rider) : (_t = ne.assignment) != null && _t.riderId ? String(ne.assignment.riderId) : "Unassigned";
          return /* @__PURE__ */ u.jsxDEV("tr", { "data-status": zt, children: [
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-name order-id-cell", children: on }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 203,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-km customer-cell", children: Mt || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 204,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-perf address-cell", children: xt }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 205,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-rider rider-cell", children: At }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 206,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-start-time start-cell", children: Bt }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 207,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-expected expected-cell", children: bn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 208,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: sn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 209,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-amount amount-cell", children: ((wn = ne.assignment) == null ? void 0 : wn.amount) || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 210,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-payment payment-cell", children: ((la = ne.assignment) == null ? void 0 : la.paymentMethod) || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 211,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-status status-cell", children: /* @__PURE__ */ u.jsxDEV("span", { className: `status-chip status-${zt}`, children: ut }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 213,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 212,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-actions actions-cell", children: /* @__PURE__ */ u.jsxDEV("div", { className: "actions-container", children: [
              zt === "assigned" && /* @__PURE__ */ u.jsxDEV(
                "button",
                {
                  className: "status-unassign-btn",
                  onClick: () => Qe(st),
                  "aria-label": "Unassign order",
                  title: "Unassign order",
                  children: "✕"
                },
                void 0,
                !1,
                {
                  fileName: "/app/code/client/pages/Orders.jsx",
                  lineNumber: 218,
                  columnNumber: 27
                },
                this
              ),
              /* @__PURE__ */ u.jsxDEV(
                "button",
                {
                  className: "status-photo-btn",
                  "aria-label": "View photo",
                  title: "View photo",
                  disabled: !0,
                  children: "📷"
                },
                void 0,
                !1,
                {
                  fileName: "/app/code/client/pages/Orders.jsx",
                  lineNumber: 227,
                  columnNumber: 25
                },
                this
              ),
              /* @__PURE__ */ u.jsxDEV(
                "button",
                {
                  className: "status-edit-btn",
                  onClick: () => pe(ne),
                  "aria-label": "Edit order",
                  title: "Edit order",
                  children: "⋯"
                },
                void 0,
                !1,
                {
                  fileName: "/app/code/client/pages/Orders.jsx",
                  lineNumber: 235,
                  columnNumber: 25
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 216,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 215,
              columnNumber: 21
            }, this)
          ] }, Pt || Me, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 202,
            columnNumber: 19
          }, this);
        }),
        !L && !B && k.length === 0 && /* @__PURE__ */ u.jsxDEV("tr", { children: /* @__PURE__ */ u.jsxDEV("td", { colSpan: 11, className: "section-note", children: "No orders to display." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 249,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 249,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 167,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 151,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 150,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: [
      I && ye && /* @__PURE__ */ u.jsxDEV(BE, { orderId: ye, onClose: Z, onAssigned: _e }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 256,
        columnNumber: 11
      }, this),
      Q && je && /* @__PURE__ */ u.jsxDEV(q_, { order: je, onClose: te, onUpdated: () => {
        le((ne) => ne + 1), te();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 259,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ u.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page <= 1 || L, onClick: () => _((ne) => Math.max(1, ne - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 262,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u.jsxDEV("span", { className: "section-note", children: [
          "Page ",
          O.page,
          " of ",
          O.pages,
          " • ",
          O.total,
          " total"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 263,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page >= O.pages || L, onClick: () => _((ne) => Math.min(O.pages, ne + 1)), children: "Next" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 264,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 261,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 254,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 125,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 124,
    columnNumber: 5
  }, this);
}
function K_() {
  const [o, d] = N.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [m, g] = N.useState([]), [y, S] = N.useState(!1), [f, _] = N.useState(!0), [R, T] = N.useState("");
  return N.useEffect(() => {
    let O = !0;
    return (async () => {
      _(!0), T("");
      try {
        const E = await fetch("/api/reports", { credentials: "include" });
        if (E.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!E.ok) throw new Error("Failed to load reports");
        const L = await E.json();
        O && (d(L.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), g(Array.isArray(L.deliveries) ? L.deliveries : []));
      } catch (E) {
        O && T(E.message || "Failed to load reports");
      } finally {
        O && _(!1);
      }
    })(), () => {
      O = !1;
    };
  }, []), /* @__PURE__ */ u.jsxDEV(Or, { children: /* @__PURE__ */ u.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ u.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ u.jsxDEV("h2", { className: "rc-title", children: "Reporting & Analytics" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 34,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("p", { className: "rc-subtitle", children: "Gain insights into your delivery operations with detailed reports and visualizations." }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 35,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 33,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV("div", { className: "rc-toolbar", children: /* @__PURE__ */ u.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ u.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "overview", children: "Overview" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 40,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ u.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "performance", children: "Performance" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 41,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ u.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "custom", children: "Custom Reports" }, void 0, !1, {
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
    /* @__PURE__ */ u.jsxDEV("div", { id: "tab-overview", children: [
      /* @__PURE__ */ u.jsxDEV("div", { className: "rc-table-wrapper reports-overview", children: [
        /* @__PURE__ */ u.jsxDEV("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ u.jsxDEV("div", { className: "section-title reports-stat-title", children: "Total Deliveries" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 49,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u.jsxDEV("div", { className: "reports-stat-value", children: o.totalDeliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 50,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 48,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u.jsxDEV("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ u.jsxDEV("div", { className: "section-title reports-stat-title", children: "Average Delivery Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 53,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u.jsxDEV("div", { className: "reports-stat-value", children: [
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
      /* @__PURE__ */ u.jsxDEV("div", { className: "rc-toolbar reports-toolbar-center", children: [
        /* @__PURE__ */ u.jsxDEV("div", { className: "section-title reports-stat-title", children: "Delivery Data" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 59,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u.jsxDEV("label", { className: "rc-select rc-chip toggle-data-label", children: [
          /* @__PURE__ */ u.jsxDEV("input", { type: "checkbox", checked: y, onChange: (O) => S(O.target.checked) }, void 0, !1, {
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
      y && /* @__PURE__ */ u.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ u.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ u.jsxDEV("thead", { children: /* @__PURE__ */ u.jsxDEV("tr", { children: [
          /* @__PURE__ */ u.jsxDEV("th", { className: "col-name", children: "Order Number" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 70,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ u.jsxDEV("th", { className: "col-km", children: "Rider Assigned" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 71,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ u.jsxDEV("th", { className: "col-perf", children: "Expected Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 72,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ u.jsxDEV("th", { className: "col-perf", children: "Actual Delivery Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 73,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ u.jsxDEV("th", { className: "col-perf", children: "Distance Traveled" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 74,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ u.jsxDEV("th", { className: "col-comm", children: "Status" }, void 0, !1, {
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
        /* @__PURE__ */ u.jsxDEV("tbody", { children: [
          !f && !R && m.map((O, E) => /* @__PURE__ */ u.jsxDEV("tr", { children: [
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              O.orderNumber || O.orderId
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 81,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-km", children: O.riderId || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 82,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-perf", children: O.expectedMinutes != null ? `${O.expectedMinutes} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 83,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-perf", children: O.durationMins != null ? `${O.durationMins} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 84,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-perf", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 85,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-commission", children: O.status || "new" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 86,
              columnNumber: 23
            }, this)
          ] }, O.orderId || E, !0, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 80,
            columnNumber: 21
          }, this)),
          !f && !R && m.length === 0 && /* @__PURE__ */ u.jsxDEV("tr", { children: /* @__PURE__ */ u.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No data." }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 90,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 90,
            columnNumber: 21
          }, this),
          f && /* @__PURE__ */ u.jsxDEV("tr", { children: /* @__PURE__ */ u.jsxDEV("td", { colSpan: 6, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 93,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 93,
            columnNumber: 21
          }, this),
          R && /* @__PURE__ */ u.jsxDEV("tr", { children: /* @__PURE__ */ u.jsxDEV("td", { colSpan: 6, className: "auth-error", children: R }, void 0, !1, {
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
function Q_({ onClose: o, onCreated: d }) {
  const [m, g] = N.useState(""), [y, S] = N.useState(""), [f, _] = N.useState(""), [R, T] = N.useState(!1), [O, E] = N.useState(""), [L, U] = N.useState(""), [B, se] = N.useState(!1), [ie, oe] = N.useState(!1), [W, $] = N.useState(!1), [G, le] = N.useState(!1), I = "+92";
  function H(ee) {
    const Q = String(ee || "").replace(/\D+/g, "");
    return Q.length === 0 ? "" : Q.startsWith("92") ? I + Q.slice(2) : I + Q;
  }
  async function ye() {
    E(""), U(""), le(!0);
    const ee = String(m), Q = String(y).trim(), re = String(f).trim(), je = re.replace(/\D+/g, ""), Y = { fn: !Q, cn: !re, pw: !ee };
    if (se(Y.fn), oe(Y.cn || je.length !== 10), $(Y.pw), Y.fn || Y.cn || Y.pw) {
      E("Full name, mobile and password are required");
      return;
    }
    if (je.length !== 10) {
      E("numbers should be 10 digit"), oe(!0);
      return;
    }
    if (ee.length < 6) {
      $(!0), E("Password must be at least 6 characters");
      return;
    }
    T(!0);
    try {
      const k = H(re), Z = await fetch("/api/packers", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: ee, fullName: Q, contactNumber: k })
      }), pe = await Z.json().catch(() => null);
      if (!Z.ok) {
        const te = String(pe && (pe.error || pe.message) || ""), _e = te.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(te) || /MISSING\s*PASSWORD/i.test(te))
          E("Full name, mobile and password are required"), se(!Q), oe(!re || je.length !== 10), $(!ee);
        else if (_e.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(te))
          $(!0), E("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(te))
          oe(!0), E("numbers should be 10 digit");
        else if (/FIREBASE NOT CONFIGURED/i.test(te))
          E("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(te || "Failed to create packer");
        return;
      }
      U("Packer created successfully"), d && d(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (k) {
      const Z = String((k == null ? void 0 : k.message) || "");
      /Missing\s*(fullName\/contactNumber|password)/i.test(Z) ? E("Full name, mobile and password are required") : /WEAK_PASSWORD/i.test(Z) || /AT LEAST 6 CHARACTERS/i.test(Z) ? ($(!0), E("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(Z) ? (oe(!0), E("numbers should be 10 digit")) : E(Z || "Failed to create packer");
    } finally {
      T(!1);
    }
  }
  return /* @__PURE__ */ u.jsxDEV("div", { className: "create-rider-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ u.jsxDEV("div", { className: "create-rider-modal", children: [
    /* @__PURE__ */ u.jsxDEV("header", { className: "create-rider-header", children: [
      /* @__PURE__ */ u.jsxDEV("h3", { className: "create-rider-title", children: "Create Packer" }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 95,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("button", { className: "create-rider-close", onClick: o, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 96,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreatePackerModal.jsx",
      lineNumber: 94,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV("div", { className: "create-rider-body", children: [
      L && /* @__PURE__ */ u.jsxDEV("div", { className: "auth-success", children: L }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 99,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ u.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ u.jsxDEV("input", { className: "field-input" + (G && !String(y).trim() ? " input-error" : ""), value: y, onChange: (ee) => {
          S(ee.target.value), G && se(!String(ee.target.value).trim());
        }, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 101,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 100,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("label", { className: "field-label", children: [
        "Password",
        /* @__PURE__ */ u.jsxDEV("input", { className: "field-input" + (G && !String(m) ? " input-error" : ""), type: "password", value: m, onChange: (ee) => {
          g(ee.target.value), G && $(!String(ee.target.value));
        }, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 104,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 103,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("label", { className: "field-label", children: [
        "Contact number",
        /* @__PURE__ */ u.jsxDEV("div", { className: "phone-input-wrapper", children: [
          /* @__PURE__ */ u.jsxDEV("span", { className: "phone-prefix", children: "+92" }, void 0, !1, {
            fileName: "/app/code/client/components/CreatePackerModal.jsx",
            lineNumber: 108,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u.jsxDEV(
            "input",
            {
              className: "field-input phone-input-field" + (G && String(f).trim().replace(/\D+/g, "").length !== 10 ? " input-error" : ""),
              type: "tel",
              inputMode: "tel",
              pattern: "[0-9]{10}",
              placeholder: "3001234567",
              value: f,
              onChange: (ee) => {
                const Q = ee.target.value.replace(/\D+/g, "").slice(0, 10);
                _(Q), G && oe(Q.length !== 10);
              },
              required: !0
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/components/CreatePackerModal.jsx",
              lineNumber: 109,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 107,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 106,
        columnNumber: 11
      }, this),
      O && /* @__PURE__ */ u.jsxDEV("div", { className: "auth-error", children: O }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 127,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ u.jsxDEV("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ u.jsxDEV("button", { className: "btn-secondary", onClick: o, disabled: R, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 129,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u.jsxDEV("button", { className: "btn-primary", onClick: ye, disabled: R, children: R ? "Creating…" : "Create" }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 130,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 128,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreatePackerModal.jsx",
      lineNumber: 98,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/CreatePackerModal.jsx",
    lineNumber: 93,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/CreatePackerModal.jsx",
    lineNumber: 92,
    columnNumber: 5
  }, this);
}
function X_() {
  const [o, d] = N.useState([]), [m, g] = N.useState(!0), [y, S] = N.useState(""), [f, _] = N.useState(1), [R, T] = N.useState(25), [O, E] = N.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  N.useEffect(() => {
    let I = !0;
    return (async () => {
      var H, ye, ee, Q;
      g(!0), S("");
      try {
        const re = new URLSearchParams();
        re.set("limit", String(R)), re.set("page", String(f)), re.set("status", "new");
        const je = await fetch(`/api/orders?${re.toString()}`, { credentials: "include" });
        if (je.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!je.ok) throw new Error("Failed to load orders");
        const Y = await je.json();
        I && (d(Array.isArray(Y.orders) ? Y.orders : []), E({ total: ((H = Y.meta) == null ? void 0 : H.total) || 0, page: ((ye = Y.meta) == null ? void 0 : ye.page) || f, limit: ((ee = Y.meta) == null ? void 0 : ee.limit) || R, pages: ((Q = Y.meta) == null ? void 0 : Q.pages) || 1 }));
      } catch (re) {
        I && S(re.message || "Failed to load orders");
      } finally {
        I && g(!1);
      }
    })(), () => {
      I = !1;
    };
  }, [f]);
  function L(I) {
    return !I || typeof I != "object" ? "new" : typeof I.current_status == "string" && String(I.current_status).trim() ? String(I.current_status).toLowerCase().trim() : "new";
  }
  const [U, B] = N.useState(!1), [se, ie] = N.useState(null), [oe, W] = N.useState(!1);
  function $(I) {
    ie(I), B(!0);
  }
  function G() {
    ie(null), B(!1);
  }
  function le(I) {
    try {
      const { orderId: H } = I || {};
      if (!H) return;
      const ye = String(H).replace(/^#+/, "");
      d((ee) => ee.filter((Q, re) => {
        const je = String(Q.id || Q.name || Q.order_number || re).replace(/^#+/, "");
        return String(je) !== String(ye);
      })), E((ee) => ({ ...ee || {}, total: Math.max(0, ((ee == null ? void 0 : ee.total) || 0) - 1) }));
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${H}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  return /* @__PURE__ */ u.jsxDEV(Or, { children: /* @__PURE__ */ u.jsxDEV("section", { className: "dashboard-orders", children: [
    /* @__PURE__ */ u.jsxDEV("header", { className: "rc-header dashboard-header", children: [
      /* @__PURE__ */ u.jsxDEV("div", { className: "dashboard-header-left", children: [
        /* @__PURE__ */ u.jsxDEV("h2", { className: "rc-title", children: "Recent Orders" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 73,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u.jsxDEV("p", { className: "rc-subtitle", children: "Latest orders synced from Shopify." }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 74,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 72,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("div", { className: "dashboard-header-right", children: [
        /* @__PURE__ */ u.jsxDEV("div", { className: "stat-card", children: [
          /* @__PURE__ */ u.jsxDEV("div", { className: "stat-value", children: m ? "…" : O.total || o.length }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 78,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u.jsxDEV("div", { className: "stat-label", children: "Orders" }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 79,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 77,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u.jsxDEV("button", { className: "btn-secondary btn-create-packer", onClick: () => W(!0), children: "Create Packer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 81,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u.jsxDEV("button", { className: "btn-primary", onClick: () => window.location.reload(), children: "Refresh" }, void 0, !1, {
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
    /* @__PURE__ */ u.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ u.jsxDEV("table", { className: "rc-table dashboard-table", children: [
      /* @__PURE__ */ u.jsxDEV("thead", { children: /* @__PURE__ */ u.jsxDEV("tr", { children: [
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-order", children: "Order #" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-customer", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 91,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-address", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 92,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-status", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 93,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-date", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 94,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-time", children: "Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 95,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ u.jsxDEV("th", { className: "col-action", children: "Action" }, void 0, !1, {
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
      /* @__PURE__ */ u.jsxDEV("tbody", { children: [
        m && /* @__PURE__ */ u.jsxDEV("tr", { children: /* @__PURE__ */ u.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 100,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 100,
          columnNumber: 28
        }, this),
        !m && y && /* @__PURE__ */ u.jsxDEV("tr", { children: /* @__PURE__ */ u.jsxDEV("td", { colSpan: 7, className: "auth-error", children: y }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 101,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 101,
          columnNumber: 28
        }, this),
        !m && !y && (Array.isArray(o) ? o.filter((H) => L(H) === "new") : []).map((H, ye) => {
          const ee = L(H), Q = H.full_name || (H.customer && H.customer.full_name ? H.customer.full_name : "");
          let re = "-";
          typeof H.shipping_address == "string" && String(H.shipping_address).trim() ? re = String(H.shipping_address).trim() : H.shipping_address && typeof H.shipping_address == "object" ? re = [H.shipping_address.address1 || "", H.shipping_address.city || "", H.shipping_address.province || "", H.shipping_address.country || ""].map((te) => String(te || "").trim()).filter(Boolean).join(", ") || "-" : typeof H.billing_address == "string" && String(H.billing_address).trim() ? re = String(H.billing_address).trim() : H.billing_address && typeof H.billing_address == "object" && (re = [H.billing_address.address1 || "", H.billing_address.city || "", H.billing_address.province || "", H.billing_address.country || ""].map((te) => String(te || "").trim()).filter(Boolean).join(", ") || "-");
          const je = H.name || H.order_number || H.id || ye, Y = String(H.id || H.name || H.order_number || ye).replace(/^#+/, ""), k = H.created_at ? new Date(H.created_at) : null, Z = k ? k.toLocaleDateString() : "-", pe = k ? k.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ u.jsxDEV("tr", { "data-status": ee, children: [
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-order", children: je }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 126,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-customer", children: Q || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 127,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-address", children: re }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 128,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ u.jsxDEV("span", { className: `status-chip status-${ee}`, children: ee.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 129,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 129,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-date", children: Z }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 130,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-time", children: pe }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 131,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ u.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ u.jsxDEV("button", { className: "order-action btn-manage", onClick: () => $(String(H.id || H.name || H.order_number || ye)), children: "Assign" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 132,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 132,
              columnNumber: 23
            }, this)
          ] }, Y, !0, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 125,
            columnNumber: 21
          }, this);
        }),
        !m && !y && o.length === 0 && /* @__PURE__ */ u.jsxDEV("tr", { children: /* @__PURE__ */ u.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
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
    /* @__PURE__ */ u.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ u.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ u.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page <= 1 || m, onClick: () => _((I) => Math.max(1, I - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 144,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ u.jsxDEV("span", { className: "section-note", children: [
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
      /* @__PURE__ */ u.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page >= O.pages || m, onClick: () => _((I) => Math.min(O.pages, I + 1)), children: "Next" }, void 0, !1, {
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
    U && se && /* @__PURE__ */ u.jsxDEV(BE, { orderId: se, onClose: G, onAssigned: le }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 151,
      columnNumber: 11
    }, this),
    oe && /* @__PURE__ */ u.jsxDEV(Q_, { onClose: () => W(!1), onCreated: () => {
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
function J_() {
  const [o, d] = N.useState(ga.baseFare), [m, g] = N.useState(ga.farePerKm), [y, S] = N.useState(!1);
  N.useEffect(() => {
    const R = ME();
    d(R.baseFare), g(R.farePerKm);
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
  function _() {
    d(ga.baseFare), g(ga.farePerKm);
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
  return /* @__PURE__ */ u.jsxDEV(Or, { children: /* @__PURE__ */ u.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ u.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ u.jsxDEV("h2", { className: "rc-title", children: "Settings" }, void 0, !1, {
        fileName: "/app/code/client/pages/Settings.jsx",
        lineNumber: 43,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u.jsxDEV("p", { className: "rc-subtitle", children: "Manage fares for earnings calculations." }, void 0, !1, {
        fileName: "/app/code/client/pages/Settings.jsx",
        lineNumber: 44,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Settings.jsx",
      lineNumber: 42,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV("div", { className: "fare-settings-card", children: [
      /* @__PURE__ */ u.jsxDEV("div", { className: "fare-fields", children: [
        /* @__PURE__ */ u.jsxDEV("label", { className: "fare-field", children: [
          /* @__PURE__ */ u.jsxDEV("span", { className: "fare-field-label", children: "Base Fare" }, void 0, !1, {
            fileName: "/app/code/client/pages/Settings.jsx",
            lineNumber: 50,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u.jsxDEV(
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
        /* @__PURE__ */ u.jsxDEV("label", { className: "fare-field", children: [
          /* @__PURE__ */ u.jsxDEV("span", { className: "fare-field-label", children: "Fare per Km" }, void 0, !1, {
            fileName: "/app/code/client/pages/Settings.jsx",
            lineNumber: 62,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u.jsxDEV(
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
      /* @__PURE__ */ u.jsxDEV("div", { className: "fare-actions", children: [
        /* @__PURE__ */ u.jsxDEV("button", { className: "btn-primary", onClick: f, disabled: y, children: "Save" }, void 0, !1, {
          fileName: "/app/code/client/pages/Settings.jsx",
          lineNumber: 75,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u.jsxDEV("button", { className: "btn-secondary", onClick: _, disabled: y, children: "Reset" }, void 0, !1, {
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
function Z_() {
  return /* @__PURE__ */ u.jsxDEV(g_, { children: /* @__PURE__ */ u.jsxDEV(n_, { children: [
    /* @__PURE__ */ u.jsxDEV(rr, { path: "/auth/login", element: /* @__PURE__ */ u.jsxDEV(__, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV(rr, { path: "/auth/register", element: /* @__PURE__ */ u.jsxDEV(O_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV(rr, { path: "/riders", element: /* @__PURE__ */ u.jsxDEV(H_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV(rr, { path: "/riders/:id", element: /* @__PURE__ */ u.jsxDEV(Y_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV(rr, { path: "/orders", element: /* @__PURE__ */ u.jsxDEV(W_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV(rr, { path: "/reports", element: /* @__PURE__ */ u.jsxDEV(K_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 41
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV(rr, { path: "/dashboard", element: /* @__PURE__ */ u.jsxDEV(X_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV(rr, { path: "/settings", element: /* @__PURE__ */ u.jsxDEV(J_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 23,
      columnNumber: 42
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 23,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u.jsxDEV(rr, { path: "*", element: /* @__PURE__ */ u.jsxDEV(e_, { to: "/auth/login", replace: !0 }, void 0, !1, {
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
function vE() {
  const o = document.getElementById("react-root");
  if (!o) return;
  xE(o).render(/* @__PURE__ */ u.jsxDEV(Z_, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", vE) : vE();
