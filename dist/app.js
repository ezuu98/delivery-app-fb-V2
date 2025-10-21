function a1(o, p) {
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
function r1(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var gS = { exports: {} }, Lv = {}, yS = { exports: {} }, bf = { exports: {} };
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
    var m = "18.3.1", g = Symbol.for("react.element"), y = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), T = Symbol.for("react.context"), A = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), U = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), H = Symbol.for("react.lazy"), ue = Symbol.for("react.offscreen"), ie = Symbol.iterator, he = "@@iterator";
    function Y(d) {
      if (d === null || typeof d != "object")
        return null;
      var b = ie && d[ie] || d[he];
      return typeof b == "function" ? b : null;
    }
    var B = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, W = {
      transition: null
    }, ne = {
      current: null,
      // Used to reproduce behavior of `batchedUpdates` in legacy mode.
      isBatchingLegacy: !1,
      didScheduleLegacyUpdate: !1
    }, ee = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, q = {}, Le = null;
    function I(d) {
      Le = d;
    }
    q.setExtraStackFrame = function(d) {
      Le = d;
    }, q.getCurrentStack = null, q.getStackAddendum = function() {
      var d = "";
      Le && (d += Le);
      var b = q.getCurrentStack;
      return b && (d += b() || ""), d;
    };
    var X = !1, re = !1, Re = !1, oe = !1, j = !1, Q = {
      ReactCurrentDispatcher: B,
      ReactCurrentBatchConfig: W,
      ReactCurrentOwner: ee
    };
    Q.ReactDebugCurrentFrame = q, Q.ReactCurrentActQueue = ne;
    function te(d) {
      {
        for (var b = arguments.length, V = new Array(b > 1 ? b - 1 : 0), F = 1; F < b; F++)
          V[F - 1] = arguments[F];
        Ne("warn", d, V);
      }
    }
    function J(d) {
      {
        for (var b = arguments.length, V = new Array(b > 1 ? b - 1 : 0), F = 1; F < b; F++)
          V[F - 1] = arguments[F];
        Ne("error", d, V);
      }
    }
    function Ne(d, b, V) {
      {
        var F = Q.ReactDebugCurrentFrame, ae = F.getStackAddendum();
        ae !== "" && (b += "%s", V = V.concat([ae]));
        var Te = V.map(function(ye) {
          return String(ye);
        });
        Te.unshift("Warning: " + b), Function.prototype.apply.call(console[d], console, Te);
      }
    }
    var _e = {};
    function Qe(d, b) {
      {
        var V = d.constructor, F = V && (V.displayName || V.name) || "ReactClass", ae = F + "." + b;
        if (_e[ae])
          return;
        J("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", b, F), _e[ae] = !0;
      }
    }
    var Pe = {
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
      enqueueForceUpdate: function(d, b, V) {
        Qe(d, "forceUpdate");
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
      enqueueReplaceState: function(d, b, V, F) {
        Qe(d, "replaceState");
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
      enqueueSetState: function(d, b, V, F) {
        Qe(d, "setState");
      }
    }, xt = Object.assign, Yn = {};
    Object.freeze(Yn);
    function nn(d, b, V) {
      this.props = d, this.context = b, this.refs = Yn, this.updater = V || Pe;
    }
    nn.prototype.isReactComponent = {}, nn.prototype.setState = function(d, b) {
      if (typeof d != "object" && typeof d != "function" && d != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, d, b, "setState");
    }, nn.prototype.forceUpdate = function(d) {
      this.updater.enqueueForceUpdate(this, d, "forceUpdate");
    };
    {
      var ha = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, na = function(d, b) {
        Object.defineProperty(nn.prototype, d, {
          get: function() {
            te("%s(...) is deprecated in plain JavaScript React classes. %s", b[0], b[1]);
          }
        });
      };
      for (var Vt in ha)
        ha.hasOwnProperty(Vt) && na(Vt, ha[Vt]);
    }
    function xn() {
    }
    xn.prototype = nn.prototype;
    function kt(d, b, V) {
      this.props = d, this.context = b, this.refs = Yn, this.updater = V || Pe;
    }
    var _t = kt.prototype = new xn();
    _t.constructor = kt, xt(_t, nn.prototype), _t.isPureReactComponent = !0;
    function jt() {
      var d = {
        current: null
      };
      return Object.seal(d), d;
    }
    var kn = Array.isArray;
    function Wt(d) {
      return kn(d);
    }
    function Rn(d) {
      {
        var b = typeof Symbol == "function" && Symbol.toStringTag, V = b && d[Symbol.toStringTag] || d.constructor.name || "Object";
        return V;
      }
    }
    function Kt(d) {
      try {
        return Qt(d), !1;
      } catch {
        return !0;
      }
    }
    function Qt(d) {
      return "" + d;
    }
    function aa(d) {
      if (Kt(d))
        return J("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Rn(d)), Qt(d);
    }
    function rr(d, b, V) {
      var F = d.displayName;
      if (F)
        return F;
      var ae = b.displayName || b.name || "";
      return ae !== "" ? V + "(" + ae + ")" : V;
    }
    function ga(d) {
      return d.displayName || "Context";
    }
    function Un(d) {
      if (d == null)
        return null;
      if (typeof d.tag == "number" && J("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof d == "function")
        return d.displayName || d.name || null;
      if (typeof d == "string")
        return d;
      switch (d) {
        case E:
          return "Fragment";
        case y:
          return "Portal";
        case O:
          return "Profiler";
        case f:
          return "StrictMode";
        case D:
          return "Suspense";
        case U:
          return "SuspenseList";
      }
      if (typeof d == "object")
        switch (d.$$typeof) {
          case T:
            var b = d;
            return ga(b) + ".Consumer";
          case R:
            var V = d;
            return ga(V._context) + ".Provider";
          case A:
            return rr(d, d.render, "ForwardRef");
          case L:
            var F = d.displayName || null;
            return F !== null ? F : Un(d.type) || "Memo";
          case H: {
            var ae = d, Te = ae._payload, ye = ae._init;
            try {
              return Un(ye(Te));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var mn = Object.prototype.hasOwnProperty, an = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Cn, Pa, Ut;
    Ut = {};
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
    function Ar(d, b) {
      var V = function() {
        Cn || (Cn = !0, J("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      V.isReactWarning = !0, Object.defineProperty(d, "key", {
        get: V,
        configurable: !0
      });
    }
    function ir(d, b) {
      var V = function() {
        Pa || (Pa = !0, J("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      V.isReactWarning = !0, Object.defineProperty(d, "ref", {
        get: V,
        configurable: !0
      });
    }
    function se(d) {
      if (typeof d.ref == "string" && ee.current && d.__self && ee.current.stateNode !== d.__self) {
        var b = Un(ee.current.type);
        Ut[b] || (J('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', b, d.ref), Ut[b] = !0);
      }
    }
    var Se = function(d, b, V, F, ae, Te, ye) {
      var Ve = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: d,
        key: b,
        ref: V,
        props: ye,
        // Record the component responsible for creating this element.
        _owner: Te
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
        value: ae
      }), Object.freeze && (Object.freeze(Ve.props), Object.freeze(Ve)), Ve;
    };
    function He(d, b, V) {
      var F, ae = {}, Te = null, ye = null, Ve = null, qe = null;
      if (b != null) {
        Dn(b) && (ye = b.ref, se(b)), Fn(b) && (aa(b.key), Te = "" + b.key), Ve = b.__self === void 0 ? null : b.__self, qe = b.__source === void 0 ? null : b.__source;
        for (F in b)
          mn.call(b, F) && !an.hasOwnProperty(F) && (ae[F] = b[F]);
      }
      var rt = arguments.length - 2;
      if (rt === 1)
        ae.children = V;
      else if (rt > 1) {
        for (var ct = Array(rt), ft = 0; ft < rt; ft++)
          ct[ft] = arguments[ft + 2];
        Object.freeze && Object.freeze(ct), ae.children = ct;
      }
      if (d && d.defaultProps) {
        var $e = d.defaultProps;
        for (F in $e)
          ae[F] === void 0 && (ae[F] = $e[F]);
      }
      if (Te || ye) {
        var yt = typeof d == "function" ? d.displayName || d.name || "Unknown" : d;
        Te && Ar(ae, yt), ye && ir(ae, yt);
      }
      return Se(d, Te, ye, Ve, qe, ee.current, ae);
    }
    function at(d, b) {
      var V = Se(d.type, b, d.ref, d._self, d._source, d._owner, d.props);
      return V;
    }
    function pt(d, b, V) {
      if (d == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + d + ".");
      var F, ae = xt({}, d.props), Te = d.key, ye = d.ref, Ve = d._self, qe = d._source, rt = d._owner;
      if (b != null) {
        Dn(b) && (ye = b.ref, rt = ee.current), Fn(b) && (aa(b.key), Te = "" + b.key);
        var ct;
        d.type && d.type.defaultProps && (ct = d.type.defaultProps);
        for (F in b)
          mn.call(b, F) && !an.hasOwnProperty(F) && (b[F] === void 0 && ct !== void 0 ? ae[F] = ct[F] : ae[F] = b[F]);
      }
      var ft = arguments.length - 2;
      if (ft === 1)
        ae.children = V;
      else if (ft > 1) {
        for (var $e = Array(ft), yt = 0; yt < ft; yt++)
          $e[yt] = arguments[yt + 2];
        ae.children = $e;
      }
      return Se(d.type, Te, ye, Ve, qe, rt, ae);
    }
    function Nt(d) {
      return typeof d == "object" && d !== null && d.$$typeof === g;
    }
    var St = ".", vn = ":";
    function Rt(d) {
      var b = /[=:]/g, V = {
        "=": "=0",
        ":": "=2"
      }, F = d.replace(b, function(ae) {
        return V[ae];
      });
      return "$" + F;
    }
    var st = !1, Ct = /\/+/g;
    function ya(d) {
      return d.replace(Ct, "$&/");
    }
    function ba(d, b) {
      return typeof d == "object" && d !== null && d.key != null ? (aa(d.key), Rt("" + d.key)) : b.toString(36);
    }
    function ra(d, b, V, F, ae) {
      var Te = typeof d;
      (Te === "undefined" || Te === "boolean") && (d = null);
      var ye = !1;
      if (d === null)
        ye = !0;
      else
        switch (Te) {
          case "string":
          case "number":
            ye = !0;
            break;
          case "object":
            switch (d.$$typeof) {
              case g:
              case y:
                ye = !0;
            }
        }
      if (ye) {
        var Ve = d, qe = ae(Ve), rt = F === "" ? St + ba(Ve, 0) : F;
        if (Wt(qe)) {
          var ct = "";
          rt != null && (ct = ya(rt) + "/"), ra(qe, b, ct, "", function(_f) {
            return _f;
          });
        } else qe != null && (Nt(qe) && (qe.key && (!Ve || Ve.key !== qe.key) && aa(qe.key), qe = at(
          qe,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          V + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          (qe.key && (!Ve || Ve.key !== qe.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            ya("" + qe.key) + "/"
          ) : "") + rt
        )), b.push(qe));
        return 1;
      }
      var ft, $e, yt = 0, Ot = F === "" ? St : F + vn;
      if (Wt(d))
        for (var Si = 0; Si < d.length; Si++)
          ft = d[Si], $e = Ot + ba(ft, Si), yt += ra(ft, b, V, $e, ae);
      else {
        var So = Y(d);
        if (typeof So == "function") {
          var ur = d;
          So === ur.entries && (st || te("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), st = !0);
          for (var Eo = So.call(ur), xo, wf = 0; !(xo = Eo.next()).done; )
            ft = xo.value, $e = Ot + ba(ft, wf++), yt += ra(ft, b, V, $e, ae);
        } else if (Te === "object") {
          var hu = String(d);
          throw new Error("Objects are not valid as a React child (found: " + (hu === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : hu) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return yt;
    }
    function lr(d, b, V) {
      if (d == null)
        return d;
      var F = [], ae = 0;
      return ra(d, F, "", "", function(Te) {
        return b.call(V, Te, ae++);
      }), F;
    }
    function io(d) {
      var b = 0;
      return lr(d, function() {
        b++;
      }), b;
    }
    function fi(d, b, V) {
      lr(d, function() {
        b.apply(this, arguments);
      }, V);
    }
    function Ji(d) {
      return lr(d, function(b) {
        return b;
      }) || [];
    }
    function Zi(d) {
      if (!Nt(d))
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
      var V = !1, F = !1, ae = !1;
      {
        var Te = {
          $$typeof: T,
          _context: b
        };
        Object.defineProperties(Te, {
          Provider: {
            get: function() {
              return F || (F = !0, J("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), b.Provider;
            },
            set: function(ye) {
              b.Provider = ye;
            }
          },
          _currentValue: {
            get: function() {
              return b._currentValue;
            },
            set: function(ye) {
              b._currentValue = ye;
            }
          },
          _currentValue2: {
            get: function() {
              return b._currentValue2;
            },
            set: function(ye) {
              b._currentValue2 = ye;
            }
          },
          _threadCount: {
            get: function() {
              return b._threadCount;
            },
            set: function(ye) {
              b._threadCount = ye;
            }
          },
          Consumer: {
            get: function() {
              return V || (V = !0, J("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), b.Consumer;
            }
          },
          displayName: {
            get: function() {
              return b.displayName;
            },
            set: function(ye) {
              ae || (te("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", ye), ae = !0);
            }
          }
        }), b.Consumer = Te;
      }
      return b._currentRenderer = null, b._currentRenderer2 = null, b;
    }
    var Na = -1, ia = 0, qn = 1, Ha = 2;
    function pi(d) {
      if (d._status === Na) {
        var b = d._result, V = b();
        if (V.then(function(Te) {
          if (d._status === ia || d._status === Na) {
            var ye = d;
            ye._status = qn, ye._result = Te;
          }
        }, function(Te) {
          if (d._status === ia || d._status === Na) {
            var ye = d;
            ye._status = Ha, ye._result = Te;
          }
        }), d._status === Na) {
          var F = d;
          F._status = ia, F._result = V;
        }
      }
      if (d._status === qn) {
        var ae = d._result;
        return ae === void 0 && J(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, ae), "default" in ae || J(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, ae), ae.default;
      } else
        throw d._result;
    }
    function N(d) {
      var b = {
        // We use these fields to store the result.
        _status: Na,
        _result: d
      }, V = {
        $$typeof: H,
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
              J("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), F = Te, Object.defineProperty(V, "defaultProps", {
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
              J("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), ae = Te, Object.defineProperty(V, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return V;
    }
    function K(d) {
      d != null && d.$$typeof === L ? J("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof d != "function" ? J("forwardRef requires a render function but was given %s.", d === null ? "null" : typeof d) : d.length !== 0 && d.length !== 2 && J("forwardRef render functions accept exactly two parameters: props and ref. %s", d.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), d != null && (d.defaultProps != null || d.propTypes != null) && J("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var b = {
        $$typeof: A,
        render: d
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
            V = F, !d.name && !d.displayName && (d.displayName = F);
          }
        });
      }
      return b;
    }
    var ce;
    ce = Symbol.for("react.module.reference");
    function Ee(d) {
      return !!(typeof d == "string" || typeof d == "function" || d === E || d === O || j || d === f || d === D || d === U || oe || d === ue || X || re || Re || typeof d == "object" && d !== null && (d.$$typeof === H || d.$$typeof === L || d.$$typeof === R || d.$$typeof === T || d.$$typeof === A || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      d.$$typeof === ce || d.getModuleId !== void 0));
    }
    function Ye(d, b) {
      Ee(d) || J("memo: The first argument must be a component. Instead received: %s", d === null ? "null" : typeof d);
      var V = {
        $$typeof: L,
        type: d,
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
            F = ae, !d.name && !d.displayName && (d.displayName = ae);
          }
        });
      }
      return V;
    }
    function Oe() {
      var d = B.current;
      return d === null && J(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), d;
    }
    function Fe(d) {
      var b = Oe();
      if (d._context !== void 0) {
        var V = d._context;
        V.Consumer === d ? J("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : V.Provider === d && J("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return b.useContext(d);
    }
    function Ce(d) {
      var b = Oe();
      return b.useState(d);
    }
    function Ft(d, b, V) {
      var F = Oe();
      return F.useReducer(d, b, V);
    }
    function mt(d) {
      var b = Oe();
      return b.useRef(d);
    }
    function vt(d, b) {
      var V = Oe();
      return V.useEffect(d, b);
    }
    function hn(d, b) {
      var V = Oe();
      return V.useInsertionEffect(d, b);
    }
    function Ba(d, b) {
      var V = Oe();
      return V.useLayoutEffect(d, b);
    }
    function Sa(d, b) {
      var V = Oe();
      return V.useCallback(d, b);
    }
    function zt(d, b) {
      var V = Oe();
      return V.useMemo(d, b);
    }
    function mi(d, b, V) {
      var F = Oe();
      return F.useImperativeHandle(d, b, V);
    }
    function Ea(d, b) {
      {
        var V = Oe();
        return V.useDebugValue(d, b);
      }
    }
    function Be() {
      var d = Oe();
      return d.useTransition();
    }
    function vi(d) {
      var b = Oe();
      return b.useDeferredValue(d);
    }
    function iu() {
      var d = Oe();
      return d.useId();
    }
    function lu(d, b, V) {
      var F = Oe();
      return F.useSyncExternalStore(d, b, V);
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
            log: xt({}, d, {
              value: lo
            }),
            info: xt({}, d, {
              value: oo
            }),
            warn: xt({}, d, {
              value: so
            }),
            error: xt({}, d, {
              value: uo
            }),
            group: xt({}, d, {
              value: co
            }),
            groupCollapsed: xt({}, d, {
              value: ou
            }),
            groupEnd: xt({}, d, {
              value: su
            })
          });
        }
        Lr < 0 && J("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var hi = Q.ReactCurrentDispatcher, Vr;
    function tl(d, b, V) {
      {
        if (Vr === void 0)
          try {
            throw Error();
          } catch (ae) {
            var F = ae.stack.trim().match(/\n( *(at )?)/);
            Vr = F && F[1] || "";
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
        var V = nl.get(d);
        if (V !== void 0)
          return V;
      }
      var F;
      gi = !0;
      var ae = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Te;
      Te = hi.current, hi.current = null, fo();
      try {
        if (b) {
          var ye = function() {
            throw Error();
          };
          if (Object.defineProperty(ye.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ye, []);
            } catch (Ot) {
              F = Ot;
            }
            Reflect.construct(d, [], ye);
          } else {
            try {
              ye.call();
            } catch (Ot) {
              F = Ot;
            }
            d.call(ye.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ot) {
            F = Ot;
          }
          d();
        }
      } catch (Ot) {
        if (Ot && F && typeof Ot.stack == "string") {
          for (var Ve = Ot.stack.split(`
`), qe = F.stack.split(`
`), rt = Ve.length - 1, ct = qe.length - 1; rt >= 1 && ct >= 0 && Ve[rt] !== qe[ct]; )
            ct--;
          for (; rt >= 1 && ct >= 0; rt--, ct--)
            if (Ve[rt] !== qe[ct]) {
              if (rt !== 1 || ct !== 1)
                do
                  if (rt--, ct--, ct < 0 || Ve[rt] !== qe[ct]) {
                    var ft = `
` + Ve[rt].replace(" at new ", " at ");
                    return d.displayName && ft.includes("<anonymous>") && (ft = ft.replace("<anonymous>", d.displayName)), typeof d == "function" && nl.set(d, ft), ft;
                  }
                while (rt >= 1 && ct >= 0);
              break;
            }
        }
      } finally {
        gi = !1, hi.current = Te, $a(), Error.prepareStackTrace = ae;
      }
      var $e = d ? d.displayName || d.name : "", yt = $e ? tl($e) : "";
      return typeof d == "function" && nl.set(d, yt), yt;
    }
    function mo(d, b, V) {
      return uu(d, !1);
    }
    function Rf(d) {
      var b = d.prototype;
      return !!(b && b.isReactComponent);
    }
    function yi(d, b, V) {
      if (d == null)
        return "";
      if (typeof d == "function")
        return uu(d, Rf(d));
      if (typeof d == "string")
        return tl(d);
      switch (d) {
        case D:
          return tl("Suspense");
        case U:
          return tl("SuspenseList");
      }
      if (typeof d == "object")
        switch (d.$$typeof) {
          case A:
            return mo(d.render);
          case L:
            return yi(d.type, b, V);
          case H: {
            var F = d, ae = F._payload, Te = F._init;
            try {
              return yi(Te(ae), b, V);
            } catch {
            }
          }
        }
      return "";
    }
    var cu = {}, vo = Q.ReactDebugCurrentFrame;
    function Ze(d) {
      if (d) {
        var b = d._owner, V = yi(d.type, d._source, b ? b.type : null);
        vo.setExtraStackFrame(V);
      } else
        vo.setExtraStackFrame(null);
    }
    function Cf(d, b, V, F, ae) {
      {
        var Te = Function.call.bind(mn);
        for (var ye in d)
          if (Te(d, ye)) {
            var Ve = void 0;
            try {
              if (typeof d[ye] != "function") {
                var qe = Error((F || "React class") + ": " + V + " type `" + ye + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof d[ye] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw qe.name = "Invariant Violation", qe;
              }
              Ve = d[ye](b, ye, F, V, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (rt) {
              Ve = rt;
            }
            Ve && !(Ve instanceof Error) && (Ze(ae), J("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", F || "React class", V, ye, typeof Ve), Ze(null)), Ve instanceof Error && !(Ve.message in cu) && (cu[Ve.message] = !0, Ze(ae), J("Failed %s type: %s", V, Ve.message), Ze(null));
          }
      }
    }
    function or(d) {
      if (d) {
        var b = d._owner, V = yi(d.type, d._source, b ? b.type : null);
        I(V);
      } else
        I(null);
    }
    var Ue;
    Ue = !1;
    function ho() {
      if (ee.current) {
        var d = Un(ee.current.type);
        if (d)
          return `

Check the render method of \`` + d + "`.";
      }
      return "";
    }
    function Tn(d) {
      if (d !== void 0) {
        var b = d.fileName.replace(/^.*[\\\/]/, ""), V = d.lineNumber;
        return `

Check your code at ` + b + ":" + V + ".";
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
        var V = typeof d == "string" ? d : d.displayName || d.name;
        V && (b = `

Check the top-level render call using <` + V + ">.");
      }
      return b;
    }
    function Xt(d, b) {
      if (!(!d._store || d._store.validated || d.key != null)) {
        d._store.validated = !0;
        var V = Df(b);
        if (!kr[V]) {
          kr[V] = !0;
          var F = "";
          d && d._owner && d._owner !== ee.current && (F = " It was passed a child from " + Un(d._owner.type) + "."), or(d), J('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', V, F), or(null);
        }
      }
    }
    function gt(d, b) {
      if (typeof d == "object") {
        if (Wt(d))
          for (var V = 0; V < d.length; V++) {
            var F = d[V];
            Nt(F) && Xt(F, b);
          }
        else if (Nt(d))
          d._store && (d._store.validated = !0);
        else if (d) {
          var ae = Y(d);
          if (typeof ae == "function" && ae !== d.entries)
            for (var Te = ae.call(d), ye; !(ye = Te.next()).done; )
              Nt(ye.value) && Xt(ye.value, b);
        }
      }
    }
    function fu(d) {
      {
        var b = d.type;
        if (b == null || typeof b == "string")
          return;
        var V;
        if (typeof b == "function")
          V = b.propTypes;
        else if (typeof b == "object" && (b.$$typeof === A || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        b.$$typeof === L))
          V = b.propTypes;
        else
          return;
        if (V) {
          var F = Un(b);
          Cf(V, d.props, "prop", F, d);
        } else if (b.PropTypes !== void 0 && !Ue) {
          Ue = !0;
          var ae = Un(b);
          J("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ae || "Unknown");
        }
        typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && J("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function la(d) {
      {
        for (var b = Object.keys(d.props), V = 0; V < b.length; V++) {
          var F = b[V];
          if (F !== "children" && F !== "key") {
            or(d), J("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", F), or(null);
            break;
          }
        }
        d.ref !== null && (or(d), J("Invalid attribute `ref` supplied to `React.Fragment`."), or(null));
      }
    }
    function jn(d, b, V) {
      var F = Ee(d);
      if (!F) {
        var ae = "";
        (d === void 0 || typeof d == "object" && d !== null && Object.keys(d).length === 0) && (ae += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Te = bi(b);
        Te ? ae += Te : ae += ho();
        var ye;
        d === null ? ye = "null" : Wt(d) ? ye = "array" : d !== void 0 && d.$$typeof === g ? (ye = "<" + (Un(d.type) || "Unknown") + " />", ae = " Did you accidentally export a JSX literal instead of a component?") : ye = typeof d, J("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ye, ae);
      }
      var Ve = He.apply(this, arguments);
      if (Ve == null)
        return Ve;
      if (F)
        for (var qe = 2; qe < arguments.length; qe++)
          gt(arguments[qe], d);
      return d === E ? la(Ve) : fu(Ve), Ve;
    }
    var xa = !1;
    function Tf(d) {
      var b = jn.bind(null, d);
      return b.type = d, xa || (xa = !0, te("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(b, "type", {
        enumerable: !1,
        get: function() {
          return te("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: d
          }), d;
        }
      }), b;
    }
    function go(d, b, V) {
      for (var F = pt.apply(this, arguments), ae = 2; ae < arguments.length; ae++)
        gt(arguments[ae], F.type);
      return fu(F), F;
    }
    function du(d, b) {
      var V = W.transition;
      W.transition = {};
      var F = W.transition;
      W.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        d();
      } finally {
        if (W.transition = V, V === null && F._updatedFibers) {
          var ae = F._updatedFibers.size;
          ae > 10 && te("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), F._updatedFibers.clear();
        }
      }
    }
    var yo = !1, al = null;
    function jf(d) {
      if (al === null)
        try {
          var b = ("require" + Math.random()).slice(0, 7), V = o && o[b];
          al = V.call(o, "timers").setImmediate;
        } catch {
          al = function(ae) {
            yo === !1 && (yo = !0, typeof MessageChannel > "u" && J("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var Te = new MessageChannel();
            Te.port1.onmessage = ae, Te.port2.postMessage(void 0);
          };
        }
      return al(d);
    }
    var Ur = 0, Ni = !1;
    function bo(d) {
      {
        var b = Ur;
        Ur++, ne.current === null && (ne.current = []);
        var V = ne.isBatchingLegacy, F;
        try {
          if (ne.isBatchingLegacy = !0, F = d(), !V && ne.didScheduleLegacyUpdate) {
            var ae = ne.current;
            ae !== null && (ne.didScheduleLegacyUpdate = !1, ll(ae));
          }
        } catch ($e) {
          throw sr(b), $e;
        } finally {
          ne.isBatchingLegacy = V;
        }
        if (F !== null && typeof F == "object" && typeof F.then == "function") {
          var Te = F, ye = !1, Ve = {
            then: function($e, yt) {
              ye = !0, Te.then(function(Ot) {
                sr(b), Ur === 0 ? rl(Ot, $e, yt) : $e(Ot);
              }, function(Ot) {
                sr(b), yt(Ot);
              });
            }
          };
          return !Ni && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            ye || (Ni = !0, J("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Ve;
        } else {
          var qe = F;
          if (sr(b), Ur === 0) {
            var rt = ne.current;
            rt !== null && (ll(rt), ne.current = null);
            var ct = {
              then: function($e, yt) {
                ne.current === null ? (ne.current = [], rl(qe, $e, yt)) : $e(qe);
              }
            };
            return ct;
          } else {
            var ft = {
              then: function($e, yt) {
                $e(qe);
              }
            };
            return ft;
          }
        }
      }
    }
    function sr(d) {
      d !== Ur - 1 && J("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ur = d;
    }
    function rl(d, b, V) {
      {
        var F = ne.current;
        if (F !== null)
          try {
            ll(F), jf(function() {
              F.length === 0 ? (ne.current = null, b(d)) : rl(d, b, V);
            });
          } catch (ae) {
            V(ae);
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
            var V = d[b];
            do
              V = V(!0);
            while (V !== null);
          }
          d.length = 0;
        } catch (F) {
          throw d = d.slice(b + 1), F;
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
    p.Children = vu, p.Component = nn, p.Fragment = E, p.Profiler = O, p.PureComponent = kt, p.StrictMode = f, p.Suspense = D, p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Q, p.act = bo, p.cloneElement = mu, p.createContext = di, p.createElement = pu, p.createFactory = No, p.createRef = jt, p.forwardRef = K, p.isValidElement = Nt, p.lazy = N, p.memo = Ye, p.startTransition = du, p.unstable_act = bo, p.useCallback = Sa, p.useContext = Fe, p.useDebugValue = Ea, p.useDeferredValue = vi, p.useEffect = vt, p.useId = iu, p.useImperativeHandle = mi, p.useInsertionEffect = hn, p.useLayoutEffect = Ba, p.useMemo = zt, p.useReducer = Ft, p.useRef = mt, p.useState = Ce, p.useSyncExternalStore = lu, p.useTransition = Be, p.version = m, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(bf, bf.exports);
var i1 = bf.exports;
yS.exports = i1;
var S = yS.exports;
const l1 = /* @__PURE__ */ r1(S), o1 = /* @__PURE__ */ a1({
  __proto__: null,
  default: l1
}, [S]);
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
  var o = S, p = Symbol.for("react.element"), m = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), E = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), O = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), A = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), L = Symbol.for("react.offscreen"), H = Symbol.iterator, ue = "@@iterator";
  function ie(N) {
    if (N === null || typeof N != "object")
      return null;
    var K = H && N[H] || N[ue];
    return typeof K == "function" ? K : null;
  }
  var he = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function Y(N) {
    {
      for (var K = arguments.length, ce = new Array(K > 1 ? K - 1 : 0), Ee = 1; Ee < K; Ee++)
        ce[Ee - 1] = arguments[Ee];
      B("error", N, ce);
    }
  }
  function B(N, K, ce) {
    {
      var Ee = he.ReactDebugCurrentFrame, Ye = Ee.getStackAddendum();
      Ye !== "" && (K += "%s", ce = ce.concat([Ye]));
      var Oe = ce.map(function(Fe) {
        return String(Fe);
      });
      Oe.unshift("Warning: " + K), Function.prototype.apply.call(console[N], console, Oe);
    }
  }
  var W = !1, ne = !1, ee = !1, q = !1, Le = !1, I;
  I = Symbol.for("react.module.reference");
  function X(N) {
    return !!(typeof N == "string" || typeof N == "function" || N === g || N === E || Le || N === y || N === T || N === A || q || N === L || W || ne || ee || typeof N == "object" && N !== null && (N.$$typeof === U || N.$$typeof === D || N.$$typeof === f || N.$$typeof === O || N.$$typeof === R || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    N.$$typeof === I || N.getModuleId !== void 0));
  }
  function re(N, K, ce) {
    var Ee = N.displayName;
    if (Ee)
      return Ee;
    var Ye = K.displayName || K.name || "";
    return Ye !== "" ? ce + "(" + Ye + ")" : ce;
  }
  function Re(N) {
    return N.displayName || "Context";
  }
  function oe(N) {
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
      case E:
        return "Profiler";
      case y:
        return "StrictMode";
      case T:
        return "Suspense";
      case A:
        return "SuspenseList";
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case O:
          var K = N;
          return Re(K) + ".Consumer";
        case f:
          var ce = N;
          return Re(ce._context) + ".Provider";
        case R:
          return re(N, N.render, "ForwardRef");
        case D:
          var Ee = N.displayName || null;
          return Ee !== null ? Ee : oe(N.type) || "Memo";
        case U: {
          var Ye = N, Oe = Ye._payload, Fe = Ye._init;
          try {
            return oe(Fe(Oe));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var j = Object.assign, Q = 0, te, J, Ne, _e, Qe, Pe, xt;
  function Yn() {
  }
  Yn.__reactDisabledLog = !0;
  function nn() {
    {
      if (Q === 0) {
        te = console.log, J = console.info, Ne = console.warn, _e = console.error, Qe = console.group, Pe = console.groupCollapsed, xt = console.groupEnd;
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
      Q++;
    }
  }
  function ha() {
    {
      if (Q--, Q === 0) {
        var N = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: j({}, N, {
            value: te
          }),
          info: j({}, N, {
            value: J
          }),
          warn: j({}, N, {
            value: Ne
          }),
          error: j({}, N, {
            value: _e
          }),
          group: j({}, N, {
            value: Qe
          }),
          groupCollapsed: j({}, N, {
            value: Pe
          }),
          groupEnd: j({}, N, {
            value: xt
          })
        });
      }
      Q < 0 && Y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var na = he.ReactCurrentDispatcher, Vt;
  function xn(N, K, ce) {
    {
      if (Vt === void 0)
        try {
          throw Error();
        } catch (Ye) {
          var Ee = Ye.stack.trim().match(/\n( *(at )?)/);
          Vt = Ee && Ee[1] || "";
        }
      return `
` + Vt + N;
    }
  }
  var kt = !1, _t;
  {
    var jt = typeof WeakMap == "function" ? WeakMap : Map;
    _t = new jt();
  }
  function kn(N, K) {
    if (!N || kt)
      return "";
    {
      var ce = _t.get(N);
      if (ce !== void 0)
        return ce;
    }
    var Ee;
    kt = !0;
    var Ye = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var Oe;
    Oe = na.current, na.current = null, nn();
    try {
      if (K) {
        var Fe = function() {
          throw Error();
        };
        if (Object.defineProperty(Fe.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(Fe, []);
          } catch (zt) {
            Ee = zt;
          }
          Reflect.construct(N, [], Fe);
        } else {
          try {
            Fe.call();
          } catch (zt) {
            Ee = zt;
          }
          N.call(Fe.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (zt) {
          Ee = zt;
        }
        N();
      }
    } catch (zt) {
      if (zt && Ee && typeof zt.stack == "string") {
        for (var Ce = zt.stack.split(`
`), Ft = Ee.stack.split(`
`), mt = Ce.length - 1, vt = Ft.length - 1; mt >= 1 && vt >= 0 && Ce[mt] !== Ft[vt]; )
          vt--;
        for (; mt >= 1 && vt >= 0; mt--, vt--)
          if (Ce[mt] !== Ft[vt]) {
            if (mt !== 1 || vt !== 1)
              do
                if (mt--, vt--, vt < 0 || Ce[mt] !== Ft[vt]) {
                  var hn = `
` + Ce[mt].replace(" at new ", " at ");
                  return N.displayName && hn.includes("<anonymous>") && (hn = hn.replace("<anonymous>", N.displayName)), typeof N == "function" && _t.set(N, hn), hn;
                }
              while (mt >= 1 && vt >= 0);
            break;
          }
      }
    } finally {
      kt = !1, na.current = Oe, ha(), Error.prepareStackTrace = Ye;
    }
    var Ba = N ? N.displayName || N.name : "", Sa = Ba ? xn(Ba) : "";
    return typeof N == "function" && _t.set(N, Sa), Sa;
  }
  function Wt(N, K, ce) {
    return kn(N, !1);
  }
  function Rn(N) {
    var K = N.prototype;
    return !!(K && K.isReactComponent);
  }
  function Kt(N, K, ce) {
    if (N == null)
      return "";
    if (typeof N == "function")
      return kn(N, Rn(N));
    if (typeof N == "string")
      return xn(N);
    switch (N) {
      case T:
        return xn("Suspense");
      case A:
        return xn("SuspenseList");
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case R:
          return Wt(N.render);
        case D:
          return Kt(N.type, K, ce);
        case U: {
          var Ee = N, Ye = Ee._payload, Oe = Ee._init;
          try {
            return Kt(Oe(Ye), K, ce);
          } catch {
          }
        }
      }
    return "";
  }
  var Qt = Object.prototype.hasOwnProperty, aa = {}, rr = he.ReactDebugCurrentFrame;
  function ga(N) {
    if (N) {
      var K = N._owner, ce = Kt(N.type, N._source, K ? K.type : null);
      rr.setExtraStackFrame(ce);
    } else
      rr.setExtraStackFrame(null);
  }
  function Un(N, K, ce, Ee, Ye) {
    {
      var Oe = Function.call.bind(Qt);
      for (var Fe in N)
        if (Oe(N, Fe)) {
          var Ce = void 0;
          try {
            if (typeof N[Fe] != "function") {
              var Ft = Error((Ee || "React class") + ": " + ce + " type `" + Fe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof N[Fe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw Ft.name = "Invariant Violation", Ft;
            }
            Ce = N[Fe](K, Fe, Ee, ce, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (mt) {
            Ce = mt;
          }
          Ce && !(Ce instanceof Error) && (ga(Ye), Y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Ee || "React class", ce, Fe, typeof Ce), ga(null)), Ce instanceof Error && !(Ce.message in aa) && (aa[Ce.message] = !0, ga(Ye), Y("Failed %s type: %s", ce, Ce.message), ga(null));
        }
    }
  }
  var mn = Array.isArray;
  function an(N) {
    return mn(N);
  }
  function Cn(N) {
    {
      var K = typeof Symbol == "function" && Symbol.toStringTag, ce = K && N[Symbol.toStringTag] || N.constructor.name || "Object";
      return ce;
    }
  }
  function Pa(N) {
    try {
      return Ut(N), !1;
    } catch {
      return !0;
    }
  }
  function Ut(N) {
    return "" + N;
  }
  function Dn(N) {
    if (Pa(N))
      return Y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Cn(N)), Ut(N);
  }
  var Fn = he.ReactCurrentOwner, Ar = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, ir, se, Se;
  Se = {};
  function He(N) {
    if (Qt.call(N, "ref")) {
      var K = Object.getOwnPropertyDescriptor(N, "ref").get;
      if (K && K.isReactWarning)
        return !1;
    }
    return N.ref !== void 0;
  }
  function at(N) {
    if (Qt.call(N, "key")) {
      var K = Object.getOwnPropertyDescriptor(N, "key").get;
      if (K && K.isReactWarning)
        return !1;
    }
    return N.key !== void 0;
  }
  function pt(N, K) {
    if (typeof N.ref == "string" && Fn.current && K && Fn.current.stateNode !== K) {
      var ce = oe(Fn.current.type);
      Se[ce] || (Y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', oe(Fn.current.type), N.ref), Se[ce] = !0);
    }
  }
  function Nt(N, K) {
    {
      var ce = function() {
        ir || (ir = !0, Y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", K));
      };
      ce.isReactWarning = !0, Object.defineProperty(N, "key", {
        get: ce,
        configurable: !0
      });
    }
  }
  function St(N, K) {
    {
      var ce = function() {
        se || (se = !0, Y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", K));
      };
      ce.isReactWarning = !0, Object.defineProperty(N, "ref", {
        get: ce,
        configurable: !0
      });
    }
  }
  var vn = function(N, K, ce, Ee, Ye, Oe, Fe) {
    var Ce = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: p,
      // Built-in properties that belong on the element
      type: N,
      key: K,
      ref: ce,
      props: Fe,
      // Record the component responsible for creating this element.
      _owner: Oe
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
      value: Ee
    }), Object.defineProperty(Ce, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Ye
    }), Object.freeze && (Object.freeze(Ce.props), Object.freeze(Ce)), Ce;
  };
  function Rt(N, K, ce, Ee, Ye) {
    {
      var Oe, Fe = {}, Ce = null, Ft = null;
      ce !== void 0 && (Dn(ce), Ce = "" + ce), at(K) && (Dn(K.key), Ce = "" + K.key), He(K) && (Ft = K.ref, pt(K, Ye));
      for (Oe in K)
        Qt.call(K, Oe) && !Ar.hasOwnProperty(Oe) && (Fe[Oe] = K[Oe]);
      if (N && N.defaultProps) {
        var mt = N.defaultProps;
        for (Oe in mt)
          Fe[Oe] === void 0 && (Fe[Oe] = mt[Oe]);
      }
      if (Ce || Ft) {
        var vt = typeof N == "function" ? N.displayName || N.name || "Unknown" : N;
        Ce && Nt(Fe, vt), Ft && St(Fe, vt);
      }
      return vn(N, Ce, Ft, Ye, Ee, Fn.current, Fe);
    }
  }
  var st = he.ReactCurrentOwner, Ct = he.ReactDebugCurrentFrame;
  function ya(N) {
    if (N) {
      var K = N._owner, ce = Kt(N.type, N._source, K ? K.type : null);
      Ct.setExtraStackFrame(ce);
    } else
      Ct.setExtraStackFrame(null);
  }
  var ba;
  ba = !1;
  function ra(N) {
    return typeof N == "object" && N !== null && N.$$typeof === p;
  }
  function lr() {
    {
      if (st.current) {
        var N = oe(st.current.type);
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
        var K = N.fileName.replace(/^.*[\\\/]/, ""), ce = N.lineNumber;
        return `

Check your code at ` + K + ":" + ce + ".";
      }
      return "";
    }
  }
  var fi = {};
  function Ji(N) {
    {
      var K = lr();
      if (!K) {
        var ce = typeof N == "string" ? N : N.displayName || N.name;
        ce && (K = `

Check the top-level render call using <` + ce + ">.");
      }
      return K;
    }
  }
  function Zi(N, K) {
    {
      if (!N._store || N._store.validated || N.key != null)
        return;
      N._store.validated = !0;
      var ce = Ji(K);
      if (fi[ce])
        return;
      fi[ce] = !0;
      var Ee = "";
      N && N._owner && N._owner !== st.current && (Ee = " It was passed a child from " + oe(N._owner.type) + "."), ya(N), Y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ce, Ee), ya(null);
    }
  }
  function di(N, K) {
    {
      if (typeof N != "object")
        return;
      if (an(N))
        for (var ce = 0; ce < N.length; ce++) {
          var Ee = N[ce];
          ra(Ee) && Zi(Ee, K);
        }
      else if (ra(N))
        N._store && (N._store.validated = !0);
      else if (N) {
        var Ye = ie(N);
        if (typeof Ye == "function" && Ye !== N.entries)
          for (var Oe = Ye.call(N), Fe; !(Fe = Oe.next()).done; )
            ra(Fe.value) && Zi(Fe.value, K);
      }
    }
  }
  function Na(N) {
    {
      var K = N.type;
      if (K == null || typeof K == "string")
        return;
      var ce;
      if (typeof K == "function")
        ce = K.propTypes;
      else if (typeof K == "object" && (K.$$typeof === R || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      K.$$typeof === D))
        ce = K.propTypes;
      else
        return;
      if (ce) {
        var Ee = oe(K);
        Un(ce, N.props, "prop", Ee, N);
      } else if (K.PropTypes !== void 0 && !ba) {
        ba = !0;
        var Ye = oe(K);
        Y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ye || "Unknown");
      }
      typeof K.getDefaultProps == "function" && !K.getDefaultProps.isReactClassApproved && Y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function ia(N) {
    {
      for (var K = Object.keys(N.props), ce = 0; ce < K.length; ce++) {
        var Ee = K[ce];
        if (Ee !== "children" && Ee !== "key") {
          ya(N), Y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Ee), ya(null);
          break;
        }
      }
      N.ref !== null && (ya(N), Y("Invalid attribute `ref` supplied to `React.Fragment`."), ya(null));
    }
  }
  var qn = {};
  function Ha(N, K, ce, Ee, Ye, Oe) {
    {
      var Fe = X(N);
      if (!Fe) {
        var Ce = "";
        (N === void 0 || typeof N == "object" && N !== null && Object.keys(N).length === 0) && (Ce += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Ft = io(Ye);
        Ft ? Ce += Ft : Ce += lr();
        var mt;
        N === null ? mt = "null" : an(N) ? mt = "array" : N !== void 0 && N.$$typeof === p ? (mt = "<" + (oe(N.type) || "Unknown") + " />", Ce = " Did you accidentally export a JSX literal instead of a component?") : mt = typeof N, Y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", mt, Ce);
      }
      var vt = Rt(N, K, ce, Ye, Oe);
      if (vt == null)
        return vt;
      if (Fe) {
        var hn = K.children;
        if (hn !== void 0)
          if (Ee)
            if (an(hn)) {
              for (var Ba = 0; Ba < hn.length; Ba++)
                di(hn[Ba], N);
              Object.freeze && Object.freeze(hn);
            } else
              Y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            di(hn, N);
      }
      if (Qt.call(K, "key")) {
        var Sa = oe(N), zt = Object.keys(K).filter(function(Be) {
          return Be !== "key";
        }), mi = zt.length > 0 ? "{key: someKey, " + zt.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!qn[Sa + mi]) {
          var Ea = zt.length > 0 ? "{" + zt.join(": ..., ") + ": ...}" : "{}";
          Y(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, mi, Sa, Ea, Sa), qn[Sa + mi] = !0;
        }
      }
      return N === g ? ia(vt) : Na(vt), vt;
    }
  }
  var pi = Ha;
  Lv.Fragment = g, Lv.jsxDEV = pi;
})();
gS.exports = Lv;
var c = gS.exports, bS = { exports: {} }, ta = {}, NS = { exports: {} }, SS = {};
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
    function g(se, Se) {
      var He = se.length;
      se.push(Se), f(se, Se, He);
    }
    function y(se) {
      return se.length === 0 ? null : se[0];
    }
    function E(se) {
      if (se.length === 0)
        return null;
      var Se = se[0], He = se.pop();
      return He !== Se && (se[0] = He, O(se, He, 0)), Se;
    }
    function f(se, Se, He) {
      for (var at = He; at > 0; ) {
        var pt = at - 1 >>> 1, Nt = se[pt];
        if (R(Nt, Se) > 0)
          se[pt] = Se, se[at] = Nt, at = pt;
        else
          return;
      }
    }
    function O(se, Se, He) {
      for (var at = He, pt = se.length, Nt = pt >>> 1; at < Nt; ) {
        var St = (at + 1) * 2 - 1, vn = se[St], Rt = St + 1, st = se[Rt];
        if (R(vn, Se) < 0)
          Rt < pt && R(st, vn) < 0 ? (se[at] = st, se[Rt] = Se, at = Rt) : (se[at] = vn, se[St] = Se, at = St);
        else if (Rt < pt && R(st, Se) < 0)
          se[at] = st, se[Rt] = Se, at = Rt;
        else
          return;
      }
    }
    function R(se, Se) {
      var He = se.sortIndex - Se.sortIndex;
      return He !== 0 ? He : se.id - Se.id;
    }
    var T = 1, A = 2, D = 3, U = 4, L = 5;
    function H(se, Se) {
    }
    var ue = typeof performance == "object" && typeof performance.now == "function";
    if (ue) {
      var ie = performance;
      o.unstable_now = function() {
        return ie.now();
      };
    } else {
      var he = Date, Y = he.now();
      o.unstable_now = function() {
        return he.now() - Y;
      };
    }
    var B = 1073741823, W = -1, ne = 250, ee = 5e3, q = 1e4, Le = B, I = [], X = [], re = 1, Re = null, oe = D, j = !1, Q = !1, te = !1, J = typeof setTimeout == "function" ? setTimeout : null, Ne = typeof clearTimeout == "function" ? clearTimeout : null, _e = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Qe(se) {
      for (var Se = y(X); Se !== null; ) {
        if (Se.callback === null)
          E(X);
        else if (Se.startTime <= se)
          E(X), Se.sortIndex = Se.expirationTime, g(I, Se);
        else
          return;
        Se = y(X);
      }
    }
    function Pe(se) {
      if (te = !1, Qe(se), !Q)
        if (y(I) !== null)
          Q = !0, Ut(xt);
        else {
          var Se = y(X);
          Se !== null && Dn(Pe, Se.startTime - se);
        }
    }
    function xt(se, Se) {
      Q = !1, te && (te = !1, Fn()), j = !0;
      var He = oe;
      try {
        var at;
        if (!p) return Yn(se, Se);
      } finally {
        Re = null, oe = He, j = !1;
      }
    }
    function Yn(se, Se) {
      var He = Se;
      for (Qe(He), Re = y(I); Re !== null && !(Re.expirationTime > He && (!se || rr())); ) {
        var at = Re.callback;
        if (typeof at == "function") {
          Re.callback = null, oe = Re.priorityLevel;
          var pt = Re.expirationTime <= He, Nt = at(pt);
          He = o.unstable_now(), typeof Nt == "function" ? Re.callback = Nt : Re === y(I) && E(I), Qe(He);
        } else
          E(I);
        Re = y(I);
      }
      if (Re !== null)
        return !0;
      var St = y(X);
      return St !== null && Dn(Pe, St.startTime - He), !1;
    }
    function nn(se, Se) {
      switch (se) {
        case T:
        case A:
        case D:
        case U:
        case L:
          break;
        default:
          se = D;
      }
      var He = oe;
      oe = se;
      try {
        return Se();
      } finally {
        oe = He;
      }
    }
    function ha(se) {
      var Se;
      switch (oe) {
        case T:
        case A:
        case D:
          Se = D;
          break;
        default:
          Se = oe;
          break;
      }
      var He = oe;
      oe = Se;
      try {
        return se();
      } finally {
        oe = He;
      }
    }
    function na(se) {
      var Se = oe;
      return function() {
        var He = oe;
        oe = Se;
        try {
          return se.apply(this, arguments);
        } finally {
          oe = He;
        }
      };
    }
    function Vt(se, Se, He) {
      var at = o.unstable_now(), pt;
      if (typeof He == "object" && He !== null) {
        var Nt = He.delay;
        typeof Nt == "number" && Nt > 0 ? pt = at + Nt : pt = at;
      } else
        pt = at;
      var St;
      switch (se) {
        case T:
          St = W;
          break;
        case A:
          St = ne;
          break;
        case L:
          St = Le;
          break;
        case U:
          St = q;
          break;
        case D:
        default:
          St = ee;
          break;
      }
      var vn = pt + St, Rt = {
        id: re++,
        callback: Se,
        priorityLevel: se,
        startTime: pt,
        expirationTime: vn,
        sortIndex: -1
      };
      return pt > at ? (Rt.sortIndex = pt, g(X, Rt), y(I) === null && Rt === y(X) && (te ? Fn() : te = !0, Dn(Pe, pt - at))) : (Rt.sortIndex = vn, g(I, Rt), !Q && !j && (Q = !0, Ut(xt))), Rt;
    }
    function xn() {
    }
    function kt() {
      !Q && !j && (Q = !0, Ut(xt));
    }
    function _t() {
      return y(I);
    }
    function jt(se) {
      se.callback = null;
    }
    function kn() {
      return oe;
    }
    var Wt = !1, Rn = null, Kt = -1, Qt = m, aa = -1;
    function rr() {
      var se = o.unstable_now() - aa;
      return !(se < Qt);
    }
    function ga() {
    }
    function Un(se) {
      if (se < 0 || se > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      se > 0 ? Qt = Math.floor(1e3 / se) : Qt = m;
    }
    var mn = function() {
      if (Rn !== null) {
        var se = o.unstable_now();
        aa = se;
        var Se = !0, He = !0;
        try {
          He = Rn(Se, se);
        } finally {
          He ? an() : (Wt = !1, Rn = null);
        }
      } else
        Wt = !1;
    }, an;
    if (typeof _e == "function")
      an = function() {
        _e(mn);
      };
    else if (typeof MessageChannel < "u") {
      var Cn = new MessageChannel(), Pa = Cn.port2;
      Cn.port1.onmessage = mn, an = function() {
        Pa.postMessage(null);
      };
    } else
      an = function() {
        J(mn, 0);
      };
    function Ut(se) {
      Rn = se, Wt || (Wt = !0, an());
    }
    function Dn(se, Se) {
      Kt = J(function() {
        se(o.unstable_now());
      }, Se);
    }
    function Fn() {
      Ne(Kt), Kt = -1;
    }
    var Ar = ga, ir = null;
    o.unstable_IdlePriority = L, o.unstable_ImmediatePriority = T, o.unstable_LowPriority = U, o.unstable_NormalPriority = D, o.unstable_Profiling = ir, o.unstable_UserBlockingPriority = A, o.unstable_cancelCallback = jt, o.unstable_continueExecution = kt, o.unstable_forceFrameRate = Un, o.unstable_getCurrentPriorityLevel = kn, o.unstable_getFirstCallbackNode = _t, o.unstable_next = ha, o.unstable_pauseExecution = xn, o.unstable_requestPaint = Ar, o.unstable_runWithPriority = nn, o.unstable_scheduleCallback = Vt, o.unstable_shouldYield = rr, o.unstable_wrapCallback = na, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(SS);
NS.exports = SS;
var s1 = NS.exports;
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
  var o = S, p = s1, m = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
  function y(e) {
    g = e;
  }
  function E(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      O("warn", e, n);
    }
  }
  function f(e) {
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
  var R = 0, T = 1, A = 2, D = 3, U = 4, L = 5, H = 6, ue = 7, ie = 8, he = 9, Y = 10, B = 11, W = 12, ne = 13, ee = 14, q = 15, Le = 16, I = 17, X = 18, re = 19, Re = 21, oe = 22, j = 23, Q = 24, te = 25, J = !0, Ne = !1, _e = !1, Qe = !1, Pe = !1, xt = !0, Yn = !0, nn = !0, ha = !0, na = /* @__PURE__ */ new Set(), Vt = {}, xn = {};
  function kt(e, t) {
    _t(e, t), _t(e + "Capture", t);
  }
  function _t(e, t) {
    Vt[e] && f("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Vt[e] = t;
    {
      var n = e.toLowerCase();
      xn[n] = e, e === "onDoubleClick" && (xn.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      na.add(t[a]);
  }
  var jt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", kn = Object.prototype.hasOwnProperty;
  function Wt(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function Rn(e) {
    try {
      return Kt(e), !1;
    } catch {
      return !0;
    }
  }
  function Kt(e) {
    return "" + e;
  }
  function Qt(e, t) {
    if (Rn(e))
      return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Wt(e)), Kt(e);
  }
  function aa(e) {
    if (Rn(e))
      return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Wt(e)), Kt(e);
  }
  function rr(e, t) {
    if (Rn(e))
      return f("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Wt(e)), Kt(e);
  }
  function ga(e, t) {
    if (Rn(e))
      return f("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Wt(e)), Kt(e);
  }
  function Un(e) {
    if (Rn(e))
      return f("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Wt(e)), Kt(e);
  }
  function mn(e) {
    if (Rn(e))
      return f("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Wt(e)), Kt(e);
  }
  var an = 0, Cn = 1, Pa = 2, Ut = 3, Dn = 4, Fn = 5, Ar = 6, ir = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", se = ir + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Se = new RegExp("^[" + ir + "][" + se + "]*$"), He = {}, at = {};
  function pt(e) {
    return kn.call(at, e) ? !0 : kn.call(He, e) ? !1 : Se.test(e) ? (at[e] = !0, !0) : (He[e] = !0, f("Invalid attribute name: `%s`", e), !1);
  }
  function Nt(e, t, n) {
    return t !== null ? t.type === an : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function St(e, t, n, a) {
    if (n !== null && n.type === an)
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
    if (t === null || typeof t > "u" || St(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case Ut:
          return !t;
        case Dn:
          return t === !1;
        case Fn:
          return isNaN(t);
        case Ar:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function Rt(e) {
    return Ct.hasOwnProperty(e) ? Ct[e] : null;
  }
  function st(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === Pa || t === Ut || t === Dn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var Ct = {}, ya = [
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
    Ct[e] = new st(
      e,
      an,
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
    Ct[t] = new st(
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
    Ct[e] = new st(
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
    Ct[e] = new st(
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
    Ct[e] = new st(
      e,
      Ut,
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
    Ct[e] = new st(
      e,
      Ut,
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
    Ct[e] = new st(
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
    Ct[e] = new st(
      e,
      Ar,
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
    Ct[e] = new st(
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
    Ct[t] = new st(
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
    Ct[t] = new st(
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
    Ct[t] = new st(
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
    Ct[e] = new st(
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
  Ct[lr] = new st(
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
    Ct[e] = new st(
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
      Qt(n, t), a.sanitizeURL && Ji("" + n);
      var i = a.attributeName, l = null;
      if (a.type === Dn) {
        if (e.hasAttribute(i)) {
          var s = e.getAttribute(i);
          return s === "" ? !0 : vn(t, n, a, !1) ? s : s === "" + n ? n : s;
        }
      } else if (e.hasAttribute(i)) {
        if (vn(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === Ut)
          return n;
        l = e.getAttribute(i);
      }
      return vn(t, n, a, !1) ? l === null ? n : l : l === "" + n ? n : l;
    }
  }
  function di(e, t, n, a) {
    {
      if (!pt(t))
        return;
      if (!e.hasAttribute(t))
        return n === void 0 ? void 0 : null;
      var r = e.getAttribute(t);
      return Qt(n, t), r === "" + n ? n : r;
    }
  }
  function Na(e, t, n, a) {
    var r = Rt(t);
    if (!Nt(t, r, a)) {
      if (vn(t, n, r, a) && (n = null), a || r === null) {
        if (pt(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : (Qt(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var l = r.mustUseProperty;
      if (l) {
        var s = r.propertyName;
        if (n === null) {
          var u = r.type;
          e[s] = u === Ut ? !1 : "";
        } else
          e[s] = n;
        return;
      }
      var v = r.attributeName, h = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(v);
      else {
        var C = r.type, x;
        C === Ut || C === Dn && n === !0 ? x = "" : (Qt(n, v), x = "" + n, r.sanitizeURL && Ji(x.toString())), h ? e.setAttributeNS(h, v, x) : e.setAttribute(v, x);
      }
    }
  }
  var ia = Symbol.for("react.element"), qn = Symbol.for("react.portal"), Ha = Symbol.for("react.fragment"), pi = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), K = Symbol.for("react.provider"), ce = Symbol.for("react.context"), Ee = Symbol.for("react.forward_ref"), Ye = Symbol.for("react.suspense"), Oe = Symbol.for("react.suspense_list"), Fe = Symbol.for("react.memo"), Ce = Symbol.for("react.lazy"), Ft = Symbol.for("react.scope"), mt = Symbol.for("react.debug_trace_mode"), vt = Symbol.for("react.offscreen"), hn = Symbol.for("react.legacy_hidden"), Ba = Symbol.for("react.cache"), Sa = Symbol.for("react.tracing_marker"), zt = Symbol.iterator, mi = "@@iterator";
  function Ea(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = zt && e[zt] || e[mi];
    return typeof t == "function" ? t : null;
  }
  var Be = Object.assign, vi = 0, iu, lu, Lr, lo, oo, so, uo;
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
          log: Be({}, e, {
            value: iu
          }),
          info: Be({}, e, {
            value: lu
          }),
          warn: Be({}, e, {
            value: Lr
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
          } catch (k) {
            a = k;
          }
          Reflect.construct(e, [], l);
        } else {
          try {
            l.call();
          } catch (k) {
            a = k;
          }
          e.call(l.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (k) {
          a = k;
        }
        e();
      }
    } catch (k) {
      if (k && a && typeof k.stack == "string") {
        for (var s = k.stack.split(`
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
                  return e.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", e.displayName)), typeof e == "function" && Vr.set(e, C), C;
                }
              while (v >= 1 && h >= 0);
            break;
          }
      }
    } finally {
      hi = !1, el.current = i, su(), Error.prepareStackTrace = r;
    }
    var x = e ? e.displayName || e.name : "", M = x ? $a(x) : "";
    return typeof e == "function" && Vr.set(e, M), M;
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
      case Ye:
        return $a("Suspense");
      case Oe:
        return $a("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ee:
          return po(e.render);
        case Fe:
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
      case L:
        return $a(e.type);
      case Le:
        return $a("Lazy");
      case ne:
        return $a("Suspense");
      case re:
        return $a("SuspenseList");
      case R:
      case A:
      case q:
        return po(e.type);
      case B:
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
  function Ze(e) {
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
      case Ye:
        return "Suspense";
      case Oe:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ce:
          var t = e;
          return vo(t) + ".Consumer";
        case K:
          var n = e;
          return vo(n._context) + ".Provider";
        case Ee:
          return cu(e, e.render, "ForwardRef");
        case Fe:
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
  function Ue(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case Q:
        return "Cache";
      case he:
        var a = n;
        return or(a) + ".Consumer";
      case Y:
        var r = n;
        return or(r._context) + ".Provider";
      case X:
        return "DehydratedFragment";
      case B:
        return Cf(n, n.render, "ForwardRef");
      case ue:
        return "Fragment";
      case L:
        return n;
      case U:
        return "Portal";
      case D:
        return "Root";
      case H:
        return "Text";
      case Le:
        return Ze(n);
      case ie:
        return n === pi ? "StrictMode" : "Mode";
      case oe:
        return "Offscreen";
      case W:
        return "Profiler";
      case Re:
        return "Scope";
      case ne:
        return "Suspense";
      case re:
        return "SuspenseList";
      case te:
        return "TracingMarker";
      case T:
      case R:
      case I:
      case A:
      case ee:
      case q:
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
        return Ue(e);
    }
    return null;
  }
  function Df() {
    return Tn === null ? "" : yi(Tn);
  }
  function Xt() {
    ho.getCurrentStack = null, Tn = null, bi = !1;
  }
  function gt(e) {
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
    var n = e, a = t.checked, r = Be({}, t, {
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
    t.hasOwnProperty("value") ? Te(n, t.type, r) : t.hasOwnProperty("defaultValue") && Te(n, t.type, xa(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
  }
  function V(e, t, n) {
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
  function F(e, t) {
    var n = e;
    b(n, t), ae(n, t);
  }
  function ae(e, t) {
    var n = t.name;
    if (t.type === "radio" && n != null) {
      for (var a = e; a.parentNode; )
        a = a.parentNode;
      Qt(n, "name");
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
    (t !== "number" || sr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = jn(e._wrapperState.initialValue) : e.defaultValue !== jn(n) && (e.defaultValue = jn(n)));
  }
  var ye = !1, Ve = !1, qe = !1;
  function rt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? o.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Ve || (Ve = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (qe || (qe = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !ye && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), ye = !0);
  }
  function ct(e, t) {
    t.value != null && e.setAttribute("value", jn(xa(t.value)));
  }
  var ft = Array.isArray;
  function $e(e) {
    return ft(e);
  }
  var yt;
  yt = !1;
  function Ot() {
    var e = kr();
    return e ? `

Check the render method of \`` + e + "`." : "";
  }
  var Si = ["value", "defaultValue"];
  function So(e) {
    {
      go("select", e);
      for (var t = 0; t < Si.length; t++) {
        var n = Si[t];
        if (e[n] != null) {
          var a = $e(e[n]);
          e.multiple && !a ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Ot()) : !e.multiple && a && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Ot());
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
  function Eo(e, t) {
    return Be({}, t, {
      value: void 0
    });
  }
  function xo(e, t) {
    var n = e;
    So(t), n._wrapperState = {
      wasMultiple: !!t.multiple
    }, t.value !== void 0 && t.defaultValue !== void 0 && !yt && (f("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), yt = !0);
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
    var a = Be({}, t, {
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
  function IS(e, t) {
    Qv(e, t);
  }
  var cr = "http://www.w3.org/1999/xhtml", YS = "http://www.w3.org/1998/Math/MathML", Mf = "http://www.w3.org/2000/svg";
  function Af(e) {
    switch (e) {
      case "svg":
        return Mf;
      case "math":
        return YS;
      default:
        return cr;
    }
  }
  function Lf(e, t) {
    return e == null || e === cr ? Af(t) : e === Mf && t === "foreignObject" ? cr : e;
  }
  var qS = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, gu, Jv = qS(function(e, t) {
    if (e.namespaceURI === Mf && !("innerHTML" in e)) {
      gu = gu || document.createElement("div"), gu.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = gu.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), zn = 1, fr = 3, Mt = 8, dr = 9, Vf = 11, yu = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === fr) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }, GS = {
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
  function WS(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var KS = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ro).forEach(function(e) {
    KS.forEach(function(t) {
      Ro[WS(t, e)] = Ro[e];
    });
  });
  function kf(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(Ro.hasOwnProperty(e) && Ro[e]) ? t + "px" : (ga(t, e), ("" + t).trim());
  }
  var QS = /([A-Z])/g, XS = /^ms-/;
  function JS(e) {
    return e.replace(QS, "-$1").toLowerCase().replace(XS, "-ms-");
  }
  var Zv = function() {
  };
  {
    var ZS = /^(?:webkit|moz|o)[A-Z]/, eE = /^-ms-/, tE = /-(.)/g, eh = /;\s*$/, ol = {}, Uf = {}, th = !1, nh = !1, nE = function(e) {
      return e.replace(tE, function(t, n) {
        return n.toUpperCase();
      });
    }, aE = function(e) {
      ol.hasOwnProperty(e) && ol[e] || (ol[e] = !0, f(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        nE(e.replace(eE, "ms-"))
      ));
    }, rE = function(e) {
      ol.hasOwnProperty(e) && ol[e] || (ol[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, iE = function(e, t) {
      Uf.hasOwnProperty(t) && Uf[t] || (Uf[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(eh, "")));
    }, lE = function(e, t) {
      th || (th = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
    }, oE = function(e, t) {
      nh || (nh = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Zv = function(e, t) {
      e.indexOf("-") > -1 ? aE(e) : ZS.test(e) ? rE(e) : eh.test(t) && iE(e, t), typeof t == "number" && (isNaN(t) ? lE(e, t) : isFinite(t) || oE(e, t));
    };
  }
  var sE = Zv;
  function uE(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : JS(a)) + ":", t += kf(a, r, i), n = ";";
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
        r || sE(a, t[a]);
        var i = kf(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function cE(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function rh(e) {
    var t = {};
    for (var n in e)
      for (var a = GS[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function fE(e, t) {
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
          r[u] = !0, f("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", cE(e[l]) ? "Removing" : "Updating", l, s);
        }
      }
    }
  }
  var dE = {
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
  }, pE = Be({
    menuitem: !0
  }, dE), mE = "__html";
  function Ff(e, t) {
    if (t) {
      if (pE[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(mE in t.dangerouslySetInnerHTML))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
      }
      if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && f("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
        throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
    }
  }
  function Ei(e, t) {
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
  }, sl = {}, vE = new RegExp("^(aria)-[" + se + "]*$"), hE = new RegExp("^(aria)[A-Z][" + se + "]*$");
  function gE(e, t) {
    {
      if (kn.call(sl, t) && sl[t])
        return !0;
      if (hE.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = ih.hasOwnProperty(n) ? n : null;
        if (a == null)
          return f("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), sl[t] = !0, !0;
        if (t !== a)
          return f("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), sl[t] = !0, !0;
      }
      if (vE.test(t)) {
        var r = t.toLowerCase(), i = ih.hasOwnProperty(r) ? r : null;
        if (i == null)
          return sl[t] = !0, !1;
        if (t !== i)
          return f("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), sl[t] = !0, !0;
      }
    }
    return !0;
  }
  function yE(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = gE(e, a);
        r || n.push(a);
      }
      var i = n.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      n.length === 1 ? f("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && f("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function bE(e, t) {
    Ei(e, t) || yE(e, t);
  }
  var lh = !1;
  function NE(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !lh && (lh = !0, e === "select" && t.multiple ? f("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : f("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var oh = function() {
  };
  {
    var wn = {}, sh = /^on./, SE = /^on[^A-Z]/, EE = new RegExp("^(aria)-[" + se + "]*$"), xE = new RegExp("^(aria)[A-Z][" + se + "]*$");
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
        return SE.test(t) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), wn[t] = !0, !0;
      if (EE.test(t) || xE.test(t))
        return !0;
      if (r === "innerhtml")
        return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), wn[t] = !0, !0;
      if (r === "aria")
        return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), wn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), wn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), wn[t] = !0, !0;
      var u = Rt(t), v = u !== null && u.type === an;
      if (bu.hasOwnProperty(r)) {
        var h = bu[r];
        if (h !== t)
          return f("Invalid DOM property `%s`. Did you mean `%s`?", t, h), wn[t] = !0, !0;
      } else if (!v && t !== r)
        return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), wn[t] = !0, !0;
      return typeof n == "boolean" && St(t, n, u, !1) ? (n ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), wn[t] = !0, !0) : v ? !0 : St(t, n, u, !1) ? (wn[t] = !0, !1) : ((n === "false" || n === "true") && u !== null && u.type === Ut && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), wn[t] = !0), !0);
    };
  }
  var RE = function(e, t, n) {
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
  function CE(e, t, n) {
    Ei(e, t) || RE(e, t, n);
  }
  var uh = 1, zf = 2, Co = 4, DE = uh | zf | Co, Do = null;
  function TE(e) {
    Do !== null && f("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Do = e;
  }
  function jE() {
    Do === null && f("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Do = null;
  }
  function wE(e) {
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
  function _E(e) {
    Hf = e;
  }
  function fh(e) {
    ul ? cl ? cl.push(e) : cl = [e] : ul = e;
  }
  function OE() {
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
  function ME() {
    var e = OE();
    e && (mh(), dh());
  }
  function vh(e, t, n) {
    if (Bf)
      return e(t, n);
    Bf = !0;
    try {
      return ph(e, t, n);
    } finally {
      Bf = !1, ME();
    }
  }
  function AE(e, t, n) {
    ph = e, mh = n;
  }
  function LE(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function VE(e, t, n) {
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
        return !!(n.disabled && LE(t));
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
    if (VE(t, e.type, a))
      return null;
    if (r && typeof r != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
    return r;
  }
  var $f = !1;
  if (jt)
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
      var h = document.createEvent("Event"), C = !1, x = !0, M = window.event, k = Object.getOwnPropertyDescriptor(window, "event");
      function z() {
        If.removeEventListener(P, xe, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = M);
      }
      var fe = Array.prototype.slice.call(arguments, 3);
      function xe() {
        C = !0, z(), n.apply(a, fe), x = !1;
      }
      var be, Ke = !1, Ie = !1;
      function w(_) {
        if (be = _.error, Ke = !0, be === null && _.colno === 0 && _.lineno === 0 && (Ie = !0), _.defaultPrevented && be != null && typeof be == "object")
          try {
            be._suppressLogging = !0;
          } catch {
          }
      }
      var P = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", w), If.addEventListener(P, xe, !1), h.initEvent(P, !1, !1), If.dispatchEvent(h), k && Object.defineProperty(window, "event", k), C && x && (Ke ? Ie && (be = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : be = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(be)), window.removeEventListener("error", w), !C)
        return z(), hh.apply(this, arguments);
    };
  }
  var kE = gh, fl = !1, Nu = null, Su = !1, Yf = null, UE = {
    onError: function(e) {
      fl = !0, Nu = e;
    }
  };
  function qf(e, t, n, a, r, i, l, s, u) {
    fl = !1, Nu = null, kE.apply(UE, arguments);
  }
  function FE(e, t, n, a, r, i, l, s, u) {
    if (qf.apply(this, arguments), fl) {
      var v = Gf();
      Su || (Su = !0, Yf = v);
    }
  }
  function zE() {
    if (Su) {
      var e = Yf;
      throw Su = !1, Yf = null, e;
    }
  }
  function PE() {
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
  function HE(e) {
    return e._reactInternals !== void 0;
  }
  function BE(e, t) {
    e._reactInternals = t;
  }
  var je = (
    /*                      */
    0
  ), pl = (
    /*                */
    1
  ), At = (
    /*                    */
    2
  ), et = (
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
  ), $E = (
    /*               */
    32767
  ), Eu = (
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
    et | ml | 0
  ), ed = At | et | xi | wo | Ri | mr | Ci, _o = et | yh | Ri | Ci, vl = Fr | xi, vr = Di | Xf | Qf, IE = m.ReactCurrentOwner;
  function Ti(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (At | mr)) !== je && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === D ? n : null;
  }
  function Nh(e) {
    if (e.tag === ne) {
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
  function Sh(e) {
    return e.tag === D ? e.stateNode.containerInfo : null;
  }
  function YE(e) {
    return Ti(e) === e;
  }
  function qE(e) {
    {
      var t = IE.current;
      if (t !== null && t.tag === T) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || f("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ue(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = dl(e);
    return r ? Ti(r) === r : !1;
  }
  function Eh(e) {
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
            return Eh(i), e;
          if (u === r)
            return Eh(i), t;
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
    if (e.tag === L || e.tag === H)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = Ch(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function GE(e) {
    var t = xh(e);
    return t !== null ? Dh(t) : null;
  }
  function Dh(e) {
    if (e.tag === L || e.tag === H)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== U) {
        var n = Dh(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Th = p.unstable_scheduleCallback, WE = p.unstable_cancelCallback, KE = p.unstable_shouldYield, QE = p.unstable_requestPaint, Jt = p.unstable_now, XE = p.unstable_getCurrentPriorityLevel, xu = p.unstable_ImmediatePriority, td = p.unstable_UserBlockingPriority, ji = p.unstable_NormalPriority, JE = p.unstable_LowPriority, nd = p.unstable_IdlePriority, ZE = p.unstable_yieldValue, ex = p.unstable_setDisableYieldValue, hl = null, gn = null, pe = null, Ia = !1, Ra = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function tx(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      Yn && (e = Be({}, e, {
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
        var n = (e.current.flags & tt) === tt;
        if (nn) {
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
  function Zt(e) {
    if (typeof ZE == "function" && (ex(e), y(e)), gn && typeof gn.setStrictMode == "function")
      try {
        gn.setStrictMode(hl, e);
      } catch (t) {
        Ia || (Ia = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function lx(e) {
    pe = e;
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
    pe !== null && typeof pe.markCommitStarted == "function" && pe.markCommitStarted(e);
  }
  function jh() {
    pe !== null && typeof pe.markCommitStopped == "function" && pe.markCommitStopped();
  }
  function Oo(e) {
    pe !== null && typeof pe.markComponentRenderStarted == "function" && pe.markComponentRenderStarted(e);
  }
  function gl() {
    pe !== null && typeof pe.markComponentRenderStopped == "function" && pe.markComponentRenderStopped();
  }
  function ux(e) {
    pe !== null && typeof pe.markComponentPassiveEffectMountStarted == "function" && pe.markComponentPassiveEffectMountStarted(e);
  }
  function cx() {
    pe !== null && typeof pe.markComponentPassiveEffectMountStopped == "function" && pe.markComponentPassiveEffectMountStopped();
  }
  function fx(e) {
    pe !== null && typeof pe.markComponentPassiveEffectUnmountStarted == "function" && pe.markComponentPassiveEffectUnmountStarted(e);
  }
  function dx() {
    pe !== null && typeof pe.markComponentPassiveEffectUnmountStopped == "function" && pe.markComponentPassiveEffectUnmountStopped();
  }
  function px(e) {
    pe !== null && typeof pe.markComponentLayoutEffectMountStarted == "function" && pe.markComponentLayoutEffectMountStarted(e);
  }
  function mx() {
    pe !== null && typeof pe.markComponentLayoutEffectMountStopped == "function" && pe.markComponentLayoutEffectMountStopped();
  }
  function wh(e) {
    pe !== null && typeof pe.markComponentLayoutEffectUnmountStarted == "function" && pe.markComponentLayoutEffectUnmountStarted(e);
  }
  function _h() {
    pe !== null && typeof pe.markComponentLayoutEffectUnmountStopped == "function" && pe.markComponentLayoutEffectUnmountStopped();
  }
  function vx(e, t, n) {
    pe !== null && typeof pe.markComponentErrored == "function" && pe.markComponentErrored(e, t, n);
  }
  function hx(e, t, n) {
    pe !== null && typeof pe.markComponentSuspended == "function" && pe.markComponentSuspended(e, t, n);
  }
  function gx(e) {
    pe !== null && typeof pe.markLayoutEffectsStarted == "function" && pe.markLayoutEffectsStarted(e);
  }
  function yx() {
    pe !== null && typeof pe.markLayoutEffectsStopped == "function" && pe.markLayoutEffectsStopped();
  }
  function bx(e) {
    pe !== null && typeof pe.markPassiveEffectsStarted == "function" && pe.markPassiveEffectsStarted(e);
  }
  function Nx() {
    pe !== null && typeof pe.markPassiveEffectsStopped == "function" && pe.markPassiveEffectsStopped();
  }
  function Oh(e) {
    pe !== null && typeof pe.markRenderStarted == "function" && pe.markRenderStarted(e);
  }
  function Sx() {
    pe !== null && typeof pe.markRenderYielded == "function" && pe.markRenderYielded();
  }
  function Mh() {
    pe !== null && typeof pe.markRenderStopped == "function" && pe.markRenderStopped();
  }
  function Ex(e) {
    pe !== null && typeof pe.markRenderScheduled == "function" && pe.markRenderScheduled(e);
  }
  function xx(e, t) {
    pe !== null && typeof pe.markForceUpdateScheduled == "function" && pe.markForceUpdateScheduled(e, t);
  }
  function ad(e, t) {
    pe !== null && typeof pe.markStateUpdateScheduled == "function" && pe.markStateUpdateScheduled(e, t);
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
  ), Dt = (
    /*               */
    8
  ), Ya = (
    /*              */
    16
  ), Ah = Math.clz32 ? Math.clz32 : Dx, Rx = Math.log, Cx = Math.LN2;
  function Dx(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (Rx(t) / Cx | 0) | 0;
  }
  var rd = 31, G = (
    /*                        */
    0
  ), en = (
    /*                          */
    0
  ), Me = (
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
  ), Mo = (
    /*                */
    32
  ), bl = (
    /*                       */
    4194240
  ), Ao = (
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
  ), Sd = (
    /*                             */
    16777216
  ), Ed = (
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
      if (e & Me)
        return "Sync";
      if (e & yl)
        return "InputContinuousHydration";
      if (e & hr)
        return "InputContinuous";
      if (e & wi)
        return "DefaultHydration";
      if (e & qa)
        return "Default";
      if (e & Mo)
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
  var dt = -1, Cu = Ao, Du = Nl;
  function ko(e) {
    switch (Oi(e)) {
      case Me:
        return Me;
      case yl:
        return yl;
      case hr:
        return hr;
      case wi:
        return wi;
      case qa:
        return qa;
      case Mo:
        return Mo;
      case Ao:
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
      case Sd:
      case Ed:
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
    if (n === G)
      return G;
    var a = G, r = e.suspendedLanes, i = e.pingedLanes, l = n & Vh;
    if (l !== G) {
      var s = l & ~r;
      if (s !== G)
        a = ko(s);
      else {
        var u = l & i;
        u !== G && (a = ko(u));
      }
    } else {
      var v = n & ~r;
      v !== G ? a = ko(v) : i !== G && (a = ko(i));
    }
    if (a === G)
      return G;
    if (t !== G && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === G) {
      var h = Oi(a), C = Oi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        h >= C || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        h === qa && (C & bl) !== G
      )
        return t;
    }
    (a & hr) !== G && (a |= n & qa);
    var x = e.entangledLanes;
    if (x !== G)
      for (var M = e.entanglements, k = a & x; k > 0; ) {
        var z = Mi(k), fe = 1 << z;
        a |= M[z], k &= ~fe;
      }
    return a;
  }
  function jx(e, t) {
    for (var n = e.eventTimes, a = dt; t > 0; ) {
      var r = Mi(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function wx(e, t) {
    switch (e) {
      case Me:
      case yl:
      case hr:
        return t + 250;
      case wi:
      case qa:
      case Mo:
      case Ao:
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
      case Sd:
      case Ed:
      case xd:
        return dt;
      case Lo:
      case Vo:
      case _i:
      case Gn:
        return dt;
      default:
        return f("Should have found matching lanes. This is a bug in React."), dt;
    }
  }
  function _x(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var s = Mi(l), u = 1 << s, v = i[s];
      v === dt ? ((u & a) === G || (u & r) !== G) && (i[s] = wx(u, t)) : v <= t && (e.expiredLanes |= u), l &= ~u;
    }
  }
  function Ox(e) {
    return ko(e.pendingLanes);
  }
  function Rd(e) {
    var t = e.pendingLanes & ~Gn;
    return t !== G ? t : t & Gn ? Gn : G;
  }
  function Mx(e) {
    return (e & Me) !== G;
  }
  function Cd(e) {
    return (e & Vh) !== G;
  }
  function kh(e) {
    return (e & Ru) === e;
  }
  function Ax(e) {
    var t = Me | hr | qa;
    return (e & t) === G;
  }
  function Lx(e) {
    return (e & bl) === e;
  }
  function ju(e, t) {
    var n = yl | hr | wi | qa;
    return (t & n) !== G;
  }
  function Vx(e, t) {
    return (t & e.expiredLanes) !== G;
  }
  function Uh(e) {
    return (e & bl) !== G;
  }
  function Fh() {
    var e = Cu;
    return Cu <<= 1, (Cu & bl) === G && (Cu = Ao), e;
  }
  function kx() {
    var e = Du;
    return Du <<= 1, (Du & Ru) === G && (Du = Nl), e;
  }
  function Oi(e) {
    return e & -e;
  }
  function Uo(e) {
    return Oi(e);
  }
  function Mi(e) {
    return 31 - Ah(e);
  }
  function Dd(e) {
    return Mi(e);
  }
  function Wn(e, t) {
    return (e & t) !== G;
  }
  function Sl(e, t) {
    return (e & t) === t;
  }
  function ze(e, t) {
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
    return e !== en && e < t ? e : t;
  }
  function Td(e) {
    for (var t = [], n = 0; n < rd; n++)
      t.push(e);
    return t;
  }
  function Fo(e, t, n) {
    e.pendingLanes |= t, t !== _i && (e.suspendedLanes = G, e.pingedLanes = G);
    var a = e.eventTimes, r = Dd(t);
    a[r] = n;
  }
  function Fx(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = Mi(a), i = 1 << r;
      n[r] = dt, a &= ~i;
    }
  }
  function Ph(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function zx(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = G, e.pingedLanes = G, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var s = Mi(l), u = 1 << s;
      a[s] = G, r[s] = dt, i[s] = dt, l &= ~u;
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
  function Px(e, t) {
    var n = Oi(t), a;
    switch (n) {
      case hr:
        a = yl;
        break;
      case qa:
        a = wi;
        break;
      case Ao:
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
      case Sd:
      case Ed:
      case xd:
        a = Mo;
        break;
      case _i:
        a = Vo;
        break;
      default:
        a = en;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== en ? en : a;
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
  var Kn = Me, gr = hr, yr = qa, _u = _i, zo = en;
  function Ca() {
    return zo;
  }
  function tn(e) {
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
  var Od = !1, Mu = [], Pr = null, Hr = null, Br = null, Po = /* @__PURE__ */ new Map(), Ho = /* @__PURE__ */ new Map(), $r = [], Qx = [
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
    var t = Vi(e.target);
    if (t !== null) {
      var n = Ti(t);
      if (n !== null) {
        var a = n.tag;
        if (a === ne) {
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
            e.blockedOn = Sh(n);
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
  function Au(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = Ld(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
      if (a === null) {
        var r = e.nativeEvent, i = new r.constructor(r.type, r);
        TE(i), r.target.dispatchEvent(i), jE();
      } else {
        var l = qr(a);
        return l !== null && _d(l), e.blockedOn = a, !1;
      }
      t.shift();
    }
    return !0;
  }
  function Xh(e, t, n) {
    Au(e) && n.delete(t);
  }
  function tR() {
    Od = !1, Pr !== null && Au(Pr) && (Pr = null), Hr !== null && Au(Hr) && (Hr = null), Br !== null && Au(Br) && (Br = null), Po.forEach(Xh), Ho.forEach(Xh);
  }
  function $o(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Od || (Od = !0, p.unstable_scheduleCallback(p.unstable_NormalPriority, tR)));
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
      Qh(l), l.blockedOn === null && $r.shift();
    }
  }
  var El = m.ReactCurrentBatchConfig, Md = !0;
  function Jh(e) {
    Md = !!e;
  }
  function nR() {
    return Md;
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
        r = Ad;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function rR(e, t, n, a) {
    var r = Ca(), i = El.transition;
    El.transition = null;
    try {
      tn(Kn), Ad(e, t, n, a);
    } finally {
      tn(r), El.transition = i;
    }
  }
  function iR(e, t, n, a) {
    var r = Ca(), i = El.transition;
    El.transition = null;
    try {
      tn(gr), Ad(e, t, n, a);
    } finally {
      tn(r), El.transition = i;
    }
  }
  function Ad(e, t, n, a) {
    Md && lR(e, t, n, a);
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
        i !== null && Yx(i);
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
    var r = Pf(a), i = Vi(r);
    if (i !== null) {
      var l = Ti(i);
      if (l === null)
        i = null;
      else {
        var s = l.tag;
        if (s === ne) {
          var u = Nh(l);
          if (u !== null)
            return u;
          i = null;
        } else if (s === D) {
          var v = l.stateNode;
          if (Ou(v))
            return Sh(l);
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
        var t = XE();
        switch (t) {
          case xu:
            return Kn;
          case td:
            return gr;
          case ji:
          case JE:
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
  var Yo = null, Vd = null, qo = null;
  function fR(e) {
    return Yo = e, Vd = tg(), !0;
  }
  function dR() {
    Yo = null, Vd = null, qo = null;
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
    return "value" in Yo ? Yo.value : Yo.textContent;
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
  var xl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, kd = Qn(xl), Go = Be({}, xl, {
    view: 0,
    detail: 0
  }), pR = Qn(Go), Ud, Fd, Wo;
  function mR(e) {
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
      return "movementX" in e ? e.movementX : (mR(e), Ud);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Fd;
    }
  }), ag = Qn(Uu), vR = Be({}, Uu, {
    dataTransfer: 0
  }), hR = Qn(vR), gR = Be({}, Go, {
    relatedTarget: 0
  }), zd = Qn(gR), yR = Be({}, xl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), bR = Qn(yR), NR = Be({}, xl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), SR = Qn(NR), ER = Be({}, xl, {
    data: 0
  }), rg = Qn(ER), xR = rg, RR = {
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
  function Pd(e) {
    return jR;
  }
  var wR = Be({}, Go, {
    key: DR,
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
      return e.type === "keypress" ? Vu(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Vu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), _R = Qn(wR), OR = Be({}, Uu, {
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
  }), ig = Qn(OR), MR = Be({}, Go, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Pd
  }), AR = Qn(MR), LR = Be({}, xl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), VR = Qn(LR), kR = Be({}, Uu, {
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
  }), UR = Qn(kR), FR = [9, 13, 27, 32], lg = 229, Hd = jt && "CompositionEvent" in window, Ko = null;
  jt && "documentMode" in document && (Ko = document.documentMode);
  var zR = jt && "TextEvent" in window && !Ko, og = jt && (!Hd || Ko && Ko > 8 && Ko <= 11), sg = 32, ug = String.fromCharCode(sg);
  function PR() {
    kt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), kt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), kt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), kt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var cg = !1;
  function HR(e) {
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
  function IR(e, t, n, a, r) {
    var i, l;
    if (Hd ? i = BR(t) : Rl ? fg(t, a) && (i = "onCompositionEnd") : $R(t, a) && (i = "onCompositionStart"), !i)
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
  function YR(e, t) {
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
      if (e === "compositionend" || !Hd && fg(e, t)) {
        var n = eg();
        return dR(), Rl = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!HR(t)) {
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
    if (zR ? i = YR(t, a) : i = qR(t, a), !i)
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
    IR(e, t, n, a, r), GR(e, t, n, a, r);
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
    if (!jt)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function XR() {
    kt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
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
    vg(t, Xo, e, Pf(e)), vh(e0, t);
  }
  function e0(e) {
    Ag(e, 0);
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
  jt && (hg = QR("input") && (!document.documentMode || document.documentMode > 9));
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
    !t || !t.controlled || e.type !== "number" || Te(e, "number", e.value);
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
    _t("onMouseEnter", ["mouseout", "mouseover"]), _t("onMouseLeave", ["mouseout", "mouseover"]), _t("onPointerEnter", ["pointerout", "pointerover"]), _t("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function f0(e, t, n, a, r, i, l) {
    var s = t === "mouseover" || t === "pointerover", u = t === "mouseout" || t === "pointerout";
    if (s && !wE(a)) {
      var v = a.relatedTarget || a.fromElement;
      if (v && (Vi(v) || ds(v)))
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
        var k = a.relatedTarget || a.toElement;
        if (x = n, M = k ? Vi(k) : null, M !== null) {
          var z = Ti(M);
          (M !== z || M.tag !== L && M.tag !== H) && (M = null);
        }
      } else
        x = null, M = n;
      if (x !== M) {
        var fe = ag, xe = "onMouseLeave", be = "onMouseEnter", Ke = "mouse";
        (t === "pointerout" || t === "pointerover") && (fe = ig, xe = "onPointerLeave", be = "onPointerEnter", Ke = "pointer");
        var Ie = x == null ? h : _l(x), w = M == null ? h : _l(M), P = new fe(xe, Ke + "leave", x, a, r);
        P.target = Ie, P.relatedTarget = w;
        var _ = null, Z = Vi(r);
        if (Z === n) {
          var ve = new fe(be, Ke + "enter", M, a, r);
          ve.target = w, ve.relatedTarget = Ie, _ = ve;
        }
        V0(e, P, _, x, M);
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
        var C = n.createRange();
        C.setStart(v.node, v.offset), r.removeAllRanges(), l > s ? (r.addRange(C), r.extend(h.node, h.offset)) : (C.setEnd(h.node, h.offset), r.addRange(C));
      }
    }
  }
  function Sg(e) {
    return e && e.nodeType === fr;
  }
  function Eg(e, t) {
    return !e || !t ? !1 : e === t ? !0 : Sg(e) ? !1 : Sg(t) ? Eg(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function g0(e) {
    return e && e.ownerDocument && Eg(e.ownerDocument.documentElement, e);
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
      selectionRange: Bd(e) ? S0(e) : null
    };
  }
  function N0(e) {
    var t = xg(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && g0(n)) {
      a !== null && Bd(n) && E0(n, a);
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
  function S0(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = m0(e), t || {
      start: 0,
      end: 0
    };
  }
  function E0(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : h0(e, t);
  }
  var x0 = jt && "documentMode" in document && document.documentMode <= 11;
  function R0() {
    kt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var Cl = null, $d = null, Zo = null, Id = !1;
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
    if (!(Id || Cl == null || Cl !== sr(a))) {
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
        Id = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        Id = !1, Rg(e, a, r);
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
  }, Yd = {}, Cg = {};
  jt && (Cg = document.createElement("div").style, "AnimationEvent" in window || (delete Dl.animationend.animation, delete Dl.animationiteration.animation, delete Dl.animationstart.animation), "TransitionEvent" in window || delete Dl.transitionend.transition);
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
    _g.set(e, t), kt(t, [e]);
  }
  function j0() {
    for (var e = 0; e < Og.length; e++) {
      var t = Og[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Ir(n, "on" + a);
    }
    Ir(Dg, "onAnimationEnd"), Ir(Tg, "onAnimationIteration"), Ir(jg, "onAnimationStart"), Ir("dblclick", "onDoubleClick"), Ir("focusin", "onFocus"), Ir("focusout", "onBlur"), Ir(wg, "onTransitionEnd");
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
          u = AR;
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
          u = SR;
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
        t === "scroll", x = A0(n, s, a.type, h, C);
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
  j0(), c0(), XR(), R0(), PR();
  function _0(e, t, n, a, r, i, l) {
    w0(e, t, n, a, r, i);
    var s = (i & DE) === 0;
    s && (f0(e, t, n, a, r), u0(e, t, n, a, r), T0(e, t, n, a, r), WR(e, t, n, a, r));
  }
  var es = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], qd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(es));
  function Mg(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, FE(a, t, void 0, e), e.currentTarget = null;
  }
  function O0(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, s = i.currentTarget, u = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        Mg(e, u, s), a = l;
      }
    else
      for (var v = 0; v < t.length; v++) {
        var h = t[v], C = h.instance, x = h.currentTarget, M = h.listener;
        if (C !== a && e.isPropagationStopped())
          return;
        Mg(e, M, x), a = C;
      }
  }
  function Ag(e, t) {
    for (var n = (t & Co) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      O0(i, l, n);
    }
    zE();
  }
  function M0(e, t, n, a, r) {
    var i = Pf(n), l = [];
    _0(l, e, a, n, i, t), Ag(l, t);
  }
  function ht(e, t) {
    qd.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = sD(t), r = k0(e);
    a.has(r) || (Lg(t, e, zf, n), a.add(r));
  }
  function Gd(e, t, n) {
    qd.has(e) && !t && f('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= Co), Lg(n, e, a, t);
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
  function Lg(e, t, n, a, r) {
    var i = aR(e, t, n), l = void 0;
    $f && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? uR(e, t, i, l) : sR(e, t, i) : l !== void 0 ? cR(e, t, i, l) : oR(e, t, i);
  }
  function Vg(e, t) {
    return e === t || e.nodeType === Mt && e.parentNode === t;
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
          if (u === D || u === U) {
            var v = s.stateNode.containerInfo;
            if (Vg(v, l))
              break;
            if (u === U)
              for (var h = s.return; h !== null; ) {
                var C = h.tag;
                if (C === D || C === U) {
                  var x = h.stateNode.containerInfo;
                  if (Vg(x, l))
                    return;
                }
                h = h.return;
              }
            for (; v !== null; ) {
              var M = Vi(v);
              if (M === null)
                return;
              var k = M.tag;
              if (k === L || k === H) {
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
      return M0(e, t, n, i);
    });
  }
  function ns(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function A0(e, t, n, a, r, i) {
    for (var l = t !== null ? t + "Capture" : null, s = a ? l : t, u = [], v = e, h = null; v !== null; ) {
      var C = v, x = C.stateNode, M = C.tag;
      if (M === L && x !== null && (h = x, s !== null)) {
        var k = To(v, s);
        k != null && u.push(ns(v, k, h));
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
      if (s === L && l !== null) {
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
    while (e && e.tag !== L);
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
      var u = s, v = u.alternate, h = u.stateNode, C = u.tag;
      if (v !== null && v === a)
        break;
      if (C === L && h !== null) {
        var x = h;
        if (r) {
          var M = To(s, i);
          M != null && l.unshift(ns(s, M, x));
        } else if (!r) {
          var k = To(s, i);
          k != null && l.push(ns(s, k, x));
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
  var Pn = !1, as = "dangerouslySetInnerHTML", $u = "suppressContentEditableWarning", Yr = "suppressHydrationWarning", Ug = "autoFocus", Ai = "children", Li = "style", Iu = "__html", Kd, Yu, rs, Fg, qu, zg, Pg;
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
    bE(e, t), NE(e, t), CE(e, t, {
      registrationNameDependencies: Vt,
      possibleRegistrationNames: xn
    });
  }, zg = jt && !document.documentMode, rs = function(e, t, n) {
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
  var U0 = /\r\n?/g, F0 = /\u0000|\uFFFD/g;
  function Gu(e) {
    Un(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(U0, `
`).replace(F0, "");
  }
  function Wu(e, t, n, a) {
    var r = Gu(t), i = Gu(e);
    if (i !== r && (a && (Pn || (Pn = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && J))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Hg(e) {
    return e.nodeType === dr ? e : e.ownerDocument;
  }
  function z0() {
  }
  function Ku(e) {
    e.onclick = z0;
  }
  function P0(e, t, n, a, r) {
    for (var i in a)
      if (a.hasOwnProperty(i)) {
        var l = a[i];
        if (i === Li)
          l && Object.freeze(l), ah(t, l);
        else if (i === as) {
          var s = l ? l[Iu] : void 0;
          s != null && Jv(t, s);
        } else if (i === Ai)
          if (typeof l == "string") {
            var u = e !== "textarea" || l !== "";
            u && yu(t, l);
          } else typeof l == "number" && yu(t, "" + l);
        else i === $u || i === Yr || i === Ug || (Vt.hasOwnProperty(i) ? l != null && (typeof l != "function" && qu(i, l), i === "onScroll" && ht("scroll", t)) : l != null && Na(t, i, l, r));
      }
  }
  function H0(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Li ? ah(e, l) : i === as ? Jv(e, l) : i === Ai ? yu(e, l) : Na(e, i, l, a);
    }
  }
  function B0(e, t, n, a) {
    var r, i = Hg(n), l, s = a;
    if (s === cr && (s = Af(e)), s === cr) {
      if (r = Ei(e, t), !r && e !== e.toLowerCase() && f("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
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
    return Hg(t).createTextNode(e);
  }
  function I0(e, t, n, a) {
    var r = Ei(t, n);
    Yu(t, n);
    var i;
    switch (t) {
      case "dialog":
        ht("cancel", e), ht("close", e), i = n;
        break;
      case "iframe":
      case "object":
      case "embed":
        ht("load", e), i = n;
        break;
      case "video":
      case "audio":
        for (var l = 0; l < es.length; l++)
          ht(es[l], e);
        i = n;
        break;
      case "source":
        ht("error", e), i = n;
        break;
      case "img":
      case "image":
      case "link":
        ht("error", e), ht("load", e), i = n;
        break;
      case "details":
        ht("toggle", e), i = n;
        break;
      case "input":
        vu(e, n), i = No(e, n), ht("invalid", e);
        break;
      case "option":
        rt(e, n), i = n;
        break;
      case "select":
        xo(e, n), i = Eo(e, n), ht("invalid", e);
        break;
      case "textarea":
        Kv(e, n), i = Of(e, n), ht("invalid", e);
        break;
      default:
        i = n;
    }
    switch (Ff(t, i), P0(t, e, a, i, r), t) {
      case "input":
        Ni(e), V(e, n, !1);
        break;
      case "textarea":
        Ni(e), Xv(e);
        break;
      case "option":
        ct(e, n);
        break;
      case "select":
        wf(e, n);
        break;
      default:
        typeof i.onClick == "function" && Ku(e);
        break;
    }
  }
  function Y0(e, t, n, a, r) {
    Yu(t, a);
    var i = null, l, s;
    switch (t) {
      case "input":
        l = No(e, n), s = No(e, a), i = [];
        break;
      case "select":
        l = Eo(e, n), s = Eo(e, a), i = [];
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
          var C = l[u];
          for (v in C)
            C.hasOwnProperty(v) && (h || (h = {}), h[v] = "");
        } else u === as || u === Ai || u === $u || u === Yr || u === Ug || (Vt.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in s) {
      var x = s[u], M = l != null ? l[u] : void 0;
      if (!(!s.hasOwnProperty(u) || x === M || x == null && M == null))
        if (u === Li)
          if (x && Object.freeze(x), M) {
            for (v in M)
              M.hasOwnProperty(v) && (!x || !x.hasOwnProperty(v)) && (h || (h = {}), h[v] = "");
            for (v in x)
              x.hasOwnProperty(v) && M[v] !== x[v] && (h || (h = {}), h[v] = x[v]);
          } else
            h || (i || (i = []), i.push(u, h)), h = x;
        else if (u === as) {
          var k = x ? x[Iu] : void 0, z = M ? M[Iu] : void 0;
          k != null && z !== k && (i = i || []).push(u, k);
        } else u === Ai ? (typeof x == "string" || typeof x == "number") && (i = i || []).push(u, "" + x) : u === $u || u === Yr || (Vt.hasOwnProperty(u) ? (x != null && (typeof x != "function" && qu(u, x), u === "onScroll" && ht("scroll", e)), !i && M !== x && (i = [])) : (i = i || []).push(u, x));
    }
    return h && (fE(h, s[Li]), (i = i || []).push(Li, h)), i;
  }
  function q0(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && d(e, r);
    var i = Ei(n, a), l = Ei(n, r);
    switch (H0(e, t, i, l), n) {
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
    switch (s = Ei(t, n), Yu(t, n), t) {
      case "dialog":
        ht("cancel", e), ht("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        ht("load", e);
        break;
      case "video":
      case "audio":
        for (var v = 0; v < es.length; v++)
          ht(es[v], e);
        break;
      case "source":
        ht("error", e);
        break;
      case "img":
      case "image":
      case "link":
        ht("error", e), ht("load", e);
        break;
      case "details":
        ht("toggle", e);
        break;
      case "input":
        vu(e, n), ht("invalid", e);
        break;
      case "option":
        rt(e, n);
        break;
      case "select":
        xo(e, n), ht("invalid", e);
        break;
      case "textarea":
        Kv(e, n), ht("invalid", e);
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
    for (var k in n)
      if (n.hasOwnProperty(k)) {
        var z = n[k];
        if (k === Ai)
          typeof z == "string" ? e.textContent !== z && (n[Yr] !== !0 && Wu(e.textContent, z, i, l), M = [Ai, z]) : typeof z == "number" && e.textContent !== "" + z && (n[Yr] !== !0 && Wu(e.textContent, z, i, l), M = [Ai, "" + z]);
        else if (Vt.hasOwnProperty(k))
          z != null && (typeof z != "function" && qu(k, z), k === "onScroll" && ht("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof s == "boolean") {
          var fe = void 0, xe = Rt(k);
          if (n[Yr] !== !0) {
            if (!(k === $u || k === Yr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            k === "value" || k === "checked" || k === "selected")) {
              if (k === as) {
                var be = e.innerHTML, Ke = z ? z[Iu] : void 0;
                if (Ke != null) {
                  var Ie = Pg(e, Ke);
                  Ie !== be && rs(k, be, Ie);
                }
              } else if (k === Li) {
                if (u.delete(k), zg) {
                  var w = uE(z);
                  fe = e.getAttribute("style"), w !== fe && rs(k, fe, w);
                }
              } else if (s && !Pe)
                u.delete(k.toLowerCase()), fe = di(e, k, z), z !== fe && rs(k, fe, z);
              else if (!Nt(k, xe, s) && !vn(k, z, xe, s)) {
                var P = !1;
                if (xe !== null)
                  u.delete(xe.attributeName), fe = Zi(e, k, z, xe);
                else {
                  var _ = a;
                  if (_ === cr && (_ = Af(t)), _ === cr)
                    u.delete(k.toLowerCase());
                  else {
                    var Z = G0(k);
                    Z !== null && Z !== k && (P = !0, u.delete(Z)), u.delete(k);
                  }
                  fe = di(e, k, z);
                }
                var ve = Pe;
                !ve && z !== fe && !P && rs(k, fe, z);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    u.size > 0 && n[Yr] !== !0 && Fg(u), t) {
      case "input":
        Ni(e), V(e, n, !0);
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
  function K0(e, t, n) {
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
  function Q0(e, t, n) {
    switch (t) {
      case "input":
        F(e, n);
        return;
      case "textarea":
        IS(e, n);
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
      var n = Be({}, e || $g), a = {
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
      case Vf: {
        t = a === dr ? "#document" : "#fragment";
        var r = e.documentElement;
        n = r ? r.namespaceURI : Lf(null, "");
        break;
      }
      default: {
        var i = a === Mt ? e.parentNode : e, l = i.namespaceURI || null;
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
  function eO(e) {
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
    switch (I0(e, t, n, a), t) {
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
    return Y0(e, t, n, a);
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
    e.nodeType === Mt ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && Ku(n);
  }
  function SC(e, t, n) {
    e.insertBefore(t, n);
  }
  function EC(e, t, n) {
    e.nodeType === Mt ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function xC(e, t) {
    e.removeChild(t);
  }
  function RC(e, t) {
    e.nodeType === Mt ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function ip(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === Mt) {
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
    e.nodeType === Mt ? ip(e.parentNode, t) : e.nodeType === zn && ip(e, t), Io(e);
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
  function MC(e, t) {
    return t === "" || e.nodeType !== fr ? null : e;
  }
  function AC(e) {
    return e.nodeType !== Mt ? null : e;
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
      if (t === Mt) {
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
    var v = (i.mode & Ge) !== De;
    return W0(e, t, n, s, a, v, l);
  }
  function PC(e, t, n, a) {
    return fs(n, e), n.mode & Ge, K0(e, t);
  }
  function HC(e, t) {
    fs(t, e);
  }
  function BC(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === Mt) {
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
      if (t.nodeType === Mt) {
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
    t.nodeType === zn ? Qd(e, t) : t.nodeType === Mt || Xd(e, t);
  }
  function KC(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === zn ? Qd(n, t) : t.nodeType === Mt || Xd(n, t));
    }
  }
  function QC(e, t, n, a, r) {
    (r || t[Qu] !== !0) && (a.nodeType === zn ? Qd(n, a) : a.nodeType === Mt || Xd(n, a));
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
    return t && (t.tag === L || t.tag === H || t.tag === ne || t.tag === D) ? t : null;
  }
  function _l(e) {
    if (e.tag === L || e.tag === H)
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
  function Ml(e, t) {
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
        var s = Ue(e) || "Unknown";
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
          var i = Ue(e) || "Unknown";
          fp[i] || (fp[i] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var s in l)
        if (!(s in r))
          throw new Error((Ue(e) || "Unknown") + '.getChildContext(): key "' + s + '" is not defined in childContextTypes.');
      {
        var u = Ue(e) || "Unknown";
        Da(r, l, "child context", u);
      }
      return Be({}, n, l);
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
      if (!YE(e) || e.tag !== T)
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
  var Wr = 0, oc = 1, Sr = null, mp = !1, vp = !1;
  function ny(e) {
    Sr === null ? Sr = [e] : Sr.push(e);
  }
  function cD(e) {
    mp = !0, ny(e);
  }
  function ay() {
    mp && Kr();
  }
  function Kr() {
    if (!vp && Sr !== null) {
      vp = !0;
      var e = 0, t = Ca();
      try {
        var n = !0, a = Sr;
        for (tn(Kn); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        Sr = null, mp = !1;
      } catch (i) {
        throw Sr !== null && (Sr = Sr.slice(e + 1)), Th(xu, Kr), i;
      } finally {
        tn(t), vp = !1;
      }
    }
    return null;
  }
  var Al = [], Ll = 0, sc = null, uc = 0, oa = [], sa = 0, ki = null, Er = 1, xr = "";
  function fD(e) {
    return Fi(), (e.flags & bh) !== je;
  }
  function dD(e) {
    return Fi(), uc;
  }
  function pD() {
    var e = xr, t = Er, n = t & ~mD(t);
    return n.toString(32) + e;
  }
  function Ui(e, t) {
    Fi(), Al[Ll++] = uc, Al[Ll++] = sc, sc = e, uc = t;
  }
  function ry(e, t, n) {
    Fi(), oa[sa++] = Er, oa[sa++] = xr, oa[sa++] = ki, ki = e;
    var a = Er, r = xr, i = cc(a) - 1, l = a & ~(1 << i), s = n + 1, u = cc(t) + i;
    if (u > 30) {
      var v = i - i % 5, h = (1 << v) - 1, C = (l & h).toString(32), x = l >> v, M = i - v, k = cc(t) + M, z = s << M, fe = z | x, xe = C + r;
      Er = 1 << k | fe, xr = xe;
    } else {
      var be = s << i, Ke = be | l, Ie = r;
      Er = 1 << u | Ke, xr = Ie;
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
    return 32 - Ah(e);
  }
  function mD(e) {
    return 1 << cc(e) - 1;
  }
  function gp(e) {
    for (; e === sc; )
      sc = Al[--Ll], Al[Ll] = null, uc = Al[--Ll], Al[Ll] = null;
    for (; e === ki; )
      ki = oa[--sa], oa[sa] = null, xr = oa[--sa], oa[sa] = null, Er = oa[--sa], oa[sa] = null;
  }
  function vD() {
    return Fi(), ki !== null ? {
      id: Er,
      overflow: xr
    } : null;
  }
  function hD(e, t) {
    Fi(), oa[sa++] = Er, oa[sa++] = xr, oa[sa++] = ki, Er = t.id, xr = t.overflow, ki = e;
  }
  function Fi() {
    ln() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var rn = null, ua = null, Ta = !1, zi = !1, Qr = null;
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
    return ua = UC(t), rn = e, Ta = !0, Qr = null, zi = !1, !0;
  }
  function ND(e, t, n) {
    return ua = FC(t), rn = e, Ta = !0, Qr = null, zi = !1, n !== null && hD(e, n), !0;
  }
  function ly(e, t) {
    switch (e.tag) {
      case D: {
        WC(e.stateNode.containerInfo, t);
        break;
      }
      case L: {
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
      case ne: {
        var a = e.memoizedState;
        a.dehydrated !== null && KC(a.dehydrated, t);
        break;
      }
    }
  }
  function oy(e, t) {
    ly(e, t);
    var n = Rw();
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
            case L:
              var a = t.type;
              t.pendingProps, XC(n, a);
              break;
            case H:
              var r = t.pendingProps;
              JC(n, r);
              break;
          }
          break;
        }
        case L: {
          var i = e.type, l = e.memoizedProps, s = e.stateNode;
          switch (t.tag) {
            case L: {
              var u = t.type, v = t.pendingProps, h = (e.mode & Ge) !== De;
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
            case H: {
              var C = t.pendingProps, x = (e.mode & Ge) !== De;
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
        case ne: {
          var M = e.memoizedState, k = M.dehydrated;
          if (k !== null) switch (t.tag) {
            case L:
              var z = t.type;
              t.pendingProps, ZC(k, z);
              break;
            case H:
              var fe = t.pendingProps;
              eD(k, fe);
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
    t.flags = t.flags & ~mr | At, yp(e, t);
  }
  function uy(e, t) {
    switch (e.tag) {
      case L: {
        var n = e.type;
        e.pendingProps;
        var a = OC(t, n);
        return a !== null ? (e.stateNode = a, rn = e, ua = kC(a), !0) : !1;
      }
      case H: {
        var r = e.pendingProps, i = MC(t, r);
        return i !== null ? (e.stateNode = i, rn = e, ua = null, !0) : !1;
      }
      case ne: {
        var l = AC(t);
        if (l !== null) {
          var s = {
            dehydrated: l,
            treeContext: vD(),
            retryLane: Gn
          };
          e.memoizedState = s;
          var u = Cw(l);
          return u.return = e, e.child = u, rn = e, ua = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function bp(e) {
    return (e.mode & Ge) !== De && (e.flags & tt) === je;
  }
  function Np(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function Sp(e) {
    if (Ta) {
      var t = ua;
      if (!t) {
        bp(e) && (yp(rn, e), Np()), sy(rn, e), Ta = !1, rn = e;
        return;
      }
      var n = t;
      if (!uy(e, t)) {
        bp(e) && (yp(rn, e), Np()), t = us(n);
        var a = rn;
        if (!t || !uy(e, t)) {
          sy(rn, e), Ta = !1, rn = e;
          return;
        }
        oy(a, n);
      }
    }
  }
  function SD(e, t, n) {
    var a = e.stateNode, r = !zi, i = zC(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function ED(e) {
    var t = e.stateNode, n = e.memoizedProps, a = PC(t, n, e);
    if (a) {
      var r = rn;
      if (r !== null)
        switch (r.tag) {
          case D: {
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
          case L: {
            var s = r.type, u = r.memoizedProps, v = r.stateNode, h = (r.mode & Ge) !== De;
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
    for (var t = e.return; t !== null && t.tag !== L && t.tag !== D && t.tag !== ne; )
      t = t.return;
    rn = t;
  }
  function fc(e) {
    if (e !== rn)
      return !1;
    if (!Ta)
      return cy(e), Ta = !0, !1;
    if (e.tag !== D && (e.tag !== L || YC(e.type) && !np(e.type, e.memoizedProps))) {
      var t = ua;
      if (t)
        if (bp(e))
          fy(e), Np();
        else
          for (; t; )
            oy(e, t), t = us(t);
    }
    return cy(e), e.tag === ne ? ua = RD(e) : ua = rn ? us(e.stateNode) : null, !0;
  }
  function CD() {
    return Ta && ua !== null;
  }
  function fy(e) {
    for (var t = ua; t; )
      ly(e, t), t = us(t);
  }
  function Vl() {
    rn = null, ua = null, Ta = !1, zi = !1;
  }
  function dy() {
    Qr !== null && (iN(Qr), Qr = null);
  }
  function ln() {
    return Ta;
  }
  function Ep(e) {
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
        n.mode & Dt && (t = n), n = n.return;
      return t;
    }, Pi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, ps = [], ms = [], vs = [], hs = [], gs = [], ys = [], Hi = /* @__PURE__ */ new Set();
    ja.recordUnsafeLifecycleWarnings = function(e, t) {
      Hi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && ps.push(e), e.mode & Dt && typeof t.UNSAFE_componentWillMount == "function" && ms.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && vs.push(e), e.mode & Dt && typeof t.UNSAFE_componentWillReceiveProps == "function" && hs.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && gs.push(e), e.mode & Dt && typeof t.UNSAFE_componentWillUpdate == "function" && ys.push(e));
    }, ja.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      ps.length > 0 && (ps.forEach(function(x) {
        e.add(Ue(x) || "Component"), Hi.add(x.type);
      }), ps = []);
      var t = /* @__PURE__ */ new Set();
      ms.length > 0 && (ms.forEach(function(x) {
        t.add(Ue(x) || "Component"), Hi.add(x.type);
      }), ms = []);
      var n = /* @__PURE__ */ new Set();
      vs.length > 0 && (vs.forEach(function(x) {
        n.add(Ue(x) || "Component"), Hi.add(x.type);
      }), vs = []);
      var a = /* @__PURE__ */ new Set();
      hs.length > 0 && (hs.forEach(function(x) {
        a.add(Ue(x) || "Component"), Hi.add(x.type);
      }), hs = []);
      var r = /* @__PURE__ */ new Set();
      gs.length > 0 && (gs.forEach(function(x) {
        r.add(Ue(x) || "Component"), Hi.add(x.type);
      }), gs = []);
      var i = /* @__PURE__ */ new Set();
      if (ys.length > 0 && (ys.forEach(function(x) {
        i.add(Ue(x) || "Component"), Hi.add(x.type);
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
        E(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, v);
      }
      if (n.size > 0) {
        var h = Pi(n);
        E(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, h);
      }
      if (r.size > 0) {
        var C = Pi(r);
        E(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

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
            a.add(Ue(i) || "Component"), py.add(i.type);
          });
          var r = Pi(a);
          try {
            gt(n), f(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r);
          } finally {
            Xt();
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
      var n = Ue(t) || "Component";
      Dp[n] || (Dp[n] = !0, f('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function _D(e) {
    return e.prototype && e.prototype.isReactComponent;
  }
  function bs(e, t, n) {
    var a = n.ref;
    if (a !== null && typeof a != "function" && typeof a != "object") {
      if ((e.mode & Dt || xt) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(n._owner && n._self && n._owner.stateNode !== n._self) && // Will already throw with "Function components cannot have string refs"
      !(n._owner && n._owner.tag !== T) && // Will already warn with "Function components cannot be given refs"
      !(typeof n.type == "function" && !_D(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = Ue(e) || "Component";
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
      var t = Ue(e) || "Component";
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
    function t(w, P) {
      if (e) {
        var _ = w.deletions;
        _ === null ? (w.deletions = [P], w.flags |= xi) : _.push(P);
      }
    }
    function n(w, P) {
      if (!e)
        return null;
      for (var _ = P; _ !== null; )
        t(w, _), _ = _.sibling;
      return null;
    }
    function a(w, P) {
      for (var _ = /* @__PURE__ */ new Map(), Z = P; Z !== null; )
        Z.key !== null ? _.set(Z.key, Z) : _.set(Z.index, Z), Z = Z.sibling;
      return _;
    }
    function r(w, P) {
      var _ = Qi(w, P);
      return _.index = 0, _.sibling = null, _;
    }
    function i(w, P, _) {
      if (w.index = _, !e)
        return w.flags |= bh, P;
      var Z = w.alternate;
      if (Z !== null) {
        var ve = Z.index;
        return ve < P ? (w.flags |= At, P) : ve;
      } else
        return w.flags |= At, P;
    }
    function l(w) {
      return e && w.alternate === null && (w.flags |= At), w;
    }
    function s(w, P, _, Z) {
      if (P === null || P.tag !== H) {
        var ve = Ev(_, w.mode, Z);
        return ve.return = w, ve;
      } else {
        var de = r(P, _);
        return de.return = w, de;
      }
    }
    function u(w, P, _, Z) {
      var ve = _.type;
      if (ve === Ha)
        return h(w, P, _.props.children, Z, _.key);
      if (P !== null && (P.elementType === ve || // Keep this check inline so it only runs on the false path:
      SN(P, _) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof ve == "object" && ve !== null && ve.$$typeof === Ce && vy(ve) === P.type)) {
        var de = r(P, _.props);
        return de.ref = bs(w, P, _), de.return = w, de._debugSource = _._source, de._debugOwner = _._owner, de;
      }
      var we = Sv(_, w.mode, Z);
      return we.ref = bs(w, P, _), we.return = w, we;
    }
    function v(w, P, _, Z) {
      if (P === null || P.tag !== U || P.stateNode.containerInfo !== _.containerInfo || P.stateNode.implementation !== _.implementation) {
        var ve = xv(_, w.mode, Z);
        return ve.return = w, ve;
      } else {
        var de = r(P, _.children || []);
        return de.return = w, de;
      }
    }
    function h(w, P, _, Z, ve) {
      if (P === null || P.tag !== ue) {
        var de = oi(_, w.mode, Z, ve);
        return de.return = w, de;
      } else {
        var we = r(P, _);
        return we.return = w, we;
      }
    }
    function C(w, P, _) {
      if (typeof P == "string" && P !== "" || typeof P == "number") {
        var Z = Ev("" + P, w.mode, _);
        return Z.return = w, Z;
      }
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case ia: {
            var ve = Sv(P, w.mode, _);
            return ve.ref = bs(w, null, P), ve.return = w, ve;
          }
          case qn: {
            var de = xv(P, w.mode, _);
            return de.return = w, de;
          }
          case Ce: {
            var we = P._payload, ke = P._init;
            return C(w, ke(we), _);
          }
        }
        if ($e(P) || Ea(P)) {
          var ot = oi(P, w.mode, _, null);
          return ot.return = w, ot;
        }
        pc(w, P);
      }
      return typeof P == "function" && mc(w), null;
    }
    function x(w, P, _, Z) {
      var ve = P !== null ? P.key : null;
      if (typeof _ == "string" && _ !== "" || typeof _ == "number")
        return ve !== null ? null : s(w, P, "" + _, Z);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case ia:
            return _.key === ve ? u(w, P, _, Z) : null;
          case qn:
            return _.key === ve ? v(w, P, _, Z) : null;
          case Ce: {
            var de = _._payload, we = _._init;
            return x(w, P, we(de), Z);
          }
        }
        if ($e(_) || Ea(_))
          return ve !== null ? null : h(w, P, _, Z, null);
        pc(w, _);
      }
      return typeof _ == "function" && mc(w), null;
    }
    function M(w, P, _, Z, ve) {
      if (typeof Z == "string" && Z !== "" || typeof Z == "number") {
        var de = w.get(_) || null;
        return s(P, de, "" + Z, ve);
      }
      if (typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case ia: {
            var we = w.get(Z.key === null ? _ : Z.key) || null;
            return u(P, we, Z, ve);
          }
          case qn: {
            var ke = w.get(Z.key === null ? _ : Z.key) || null;
            return v(P, ke, Z, ve);
          }
          case Ce:
            var ot = Z._payload, Xe = Z._init;
            return M(w, P, _, Xe(ot), ve);
        }
        if ($e(Z) || Ea(Z)) {
          var wt = w.get(_) || null;
          return h(P, wt, Z, ve, null);
        }
        pc(P, Z);
      }
      return typeof Z == "function" && mc(P), null;
    }
    function k(w, P, _) {
      {
        if (typeof w != "object" || w === null)
          return P;
        switch (w.$$typeof) {
          case ia:
          case qn:
            my(w, _);
            var Z = w.key;
            if (typeof Z != "string")
              break;
            if (P === null) {
              P = /* @__PURE__ */ new Set(), P.add(Z);
              break;
            }
            if (!P.has(Z)) {
              P.add(Z);
              break;
            }
            f("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", Z);
            break;
          case Ce:
            var ve = w._payload, de = w._init;
            k(de(ve), P, _);
            break;
        }
      }
      return P;
    }
    function z(w, P, _, Z) {
      for (var ve = null, de = 0; de < _.length; de++) {
        var we = _[de];
        ve = k(we, ve, w);
      }
      for (var ke = null, ot = null, Xe = P, wt = 0, Je = 0, Tt = null; Xe !== null && Je < _.length; Je++) {
        Xe.index > Je ? (Tt = Xe, Xe = null) : Tt = Xe.sibling;
        var Sn = x(w, Xe, _[Je], Z);
        if (Sn === null) {
          Xe === null && (Xe = Tt);
          break;
        }
        e && Xe && Sn.alternate === null && t(w, Xe), wt = i(Sn, wt, Je), ot === null ? ke = Sn : ot.sibling = Sn, ot = Sn, Xe = Tt;
      }
      if (Je === _.length) {
        if (n(w, Xe), ln()) {
          var pn = Je;
          Ui(w, pn);
        }
        return ke;
      }
      if (Xe === null) {
        for (; Je < _.length; Je++) {
          var ea = C(w, _[Je], Z);
          ea !== null && (wt = i(ea, wt, Je), ot === null ? ke = ea : ot.sibling = ea, ot = ea);
        }
        if (ln()) {
          var Ln = Je;
          Ui(w, Ln);
        }
        return ke;
      }
      for (var Vn = a(w, Xe); Je < _.length; Je++) {
        var En = M(Vn, w, Je, _[Je], Z);
        En !== null && (e && En.alternate !== null && Vn.delete(En.key === null ? Je : En.key), wt = i(En, wt, Je), ot === null ? ke = En : ot.sibling = En, ot = En);
      }
      if (e && Vn.forEach(function(eo) {
        return t(w, eo);
      }), ln()) {
        var _r = Je;
        Ui(w, _r);
      }
      return ke;
    }
    function fe(w, P, _, Z) {
      var ve = Ea(_);
      if (typeof ve != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        _[Symbol.toStringTag] === "Generator" && (Rp || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Rp = !0), _.entries === ve && (xp || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), xp = !0);
        var de = ve.call(_);
        if (de)
          for (var we = null, ke = de.next(); !ke.done; ke = de.next()) {
            var ot = ke.value;
            we = k(ot, we, w);
          }
      }
      var Xe = ve.call(_);
      if (Xe == null)
        throw new Error("An iterable object provided no iterator.");
      for (var wt = null, Je = null, Tt = P, Sn = 0, pn = 0, ea = null, Ln = Xe.next(); Tt !== null && !Ln.done; pn++, Ln = Xe.next()) {
        Tt.index > pn ? (ea = Tt, Tt = null) : ea = Tt.sibling;
        var Vn = x(w, Tt, Ln.value, Z);
        if (Vn === null) {
          Tt === null && (Tt = ea);
          break;
        }
        e && Tt && Vn.alternate === null && t(w, Tt), Sn = i(Vn, Sn, pn), Je === null ? wt = Vn : Je.sibling = Vn, Je = Vn, Tt = ea;
      }
      if (Ln.done) {
        if (n(w, Tt), ln()) {
          var En = pn;
          Ui(w, En);
        }
        return wt;
      }
      if (Tt === null) {
        for (; !Ln.done; pn++, Ln = Xe.next()) {
          var _r = C(w, Ln.value, Z);
          _r !== null && (Sn = i(_r, Sn, pn), Je === null ? wt = _r : Je.sibling = _r, Je = _r);
        }
        if (ln()) {
          var eo = pn;
          Ui(w, eo);
        }
        return wt;
      }
      for (var Xs = a(w, Tt); !Ln.done; pn++, Ln = Xe.next()) {
        var nr = M(Xs, w, pn, Ln.value, Z);
        nr !== null && (e && nr.alternate !== null && Xs.delete(nr.key === null ? pn : nr.key), Sn = i(nr, Sn, pn), Je === null ? wt = nr : Je.sibling = nr, Je = nr);
      }
      if (e && Xs.forEach(function(n1) {
        return t(w, n1);
      }), ln()) {
        var t1 = pn;
        Ui(w, t1);
      }
      return wt;
    }
    function xe(w, P, _, Z) {
      if (P !== null && P.tag === H) {
        n(w, P.sibling);
        var ve = r(P, _);
        return ve.return = w, ve;
      }
      n(w, P);
      var de = Ev(_, w.mode, Z);
      return de.return = w, de;
    }
    function be(w, P, _, Z) {
      for (var ve = _.key, de = P; de !== null; ) {
        if (de.key === ve) {
          var we = _.type;
          if (we === Ha) {
            if (de.tag === ue) {
              n(w, de.sibling);
              var ke = r(de, _.props.children);
              return ke.return = w, ke._debugSource = _._source, ke._debugOwner = _._owner, ke;
            }
          } else if (de.elementType === we || // Keep this check inline so it only runs on the false path:
          SN(de, _) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof we == "object" && we !== null && we.$$typeof === Ce && vy(we) === de.type) {
            n(w, de.sibling);
            var ot = r(de, _.props);
            return ot.ref = bs(w, de, _), ot.return = w, ot._debugSource = _._source, ot._debugOwner = _._owner, ot;
          }
          n(w, de);
          break;
        } else
          t(w, de);
        de = de.sibling;
      }
      if (_.type === Ha) {
        var Xe = oi(_.props.children, w.mode, Z, _.key);
        return Xe.return = w, Xe;
      } else {
        var wt = Sv(_, w.mode, Z);
        return wt.ref = bs(w, P, _), wt.return = w, wt;
      }
    }
    function Ke(w, P, _, Z) {
      for (var ve = _.key, de = P; de !== null; ) {
        if (de.key === ve)
          if (de.tag === U && de.stateNode.containerInfo === _.containerInfo && de.stateNode.implementation === _.implementation) {
            n(w, de.sibling);
            var we = r(de, _.children || []);
            return we.return = w, we;
          } else {
            n(w, de);
            break;
          }
        else
          t(w, de);
        de = de.sibling;
      }
      var ke = xv(_, w.mode, Z);
      return ke.return = w, ke;
    }
    function Ie(w, P, _, Z) {
      var ve = typeof _ == "object" && _ !== null && _.type === Ha && _.key === null;
      if (ve && (_ = _.props.children), typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case ia:
            return l(be(w, P, _, Z));
          case qn:
            return l(Ke(w, P, _, Z));
          case Ce:
            var de = _._payload, we = _._init;
            return Ie(w, P, we(de), Z);
        }
        if ($e(_))
          return z(w, P, _, Z);
        if (Ea(_))
          return fe(w, P, _, Z);
        pc(w, _);
      }
      return typeof _ == "string" && _ !== "" || typeof _ == "number" ? l(xe(w, P, "" + _, Z)) : (typeof _ == "function" && mc(w), n(w, P));
    }
    return Ie;
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
  function MD(e, t) {
    for (var n = e.child; n !== null; )
      bw(n, t), n = n.sibling;
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
  function Mp(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (Sl(a.childLanes, t) ? r !== null && !Sl(r.childLanes, t) && (r.childLanes = ze(r.childLanes, t)) : (a.childLanes = ze(a.childLanes, t), r !== null && (r.childLanes = ze(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && f("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function AD(e, t, n) {
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
              var s = Uo(n), u = Rr(dt, s);
              u.tag = bc;
              var v = a.updateQueue;
              if (v !== null) {
                var h = v.shared, C = h.pending;
                C === null ? u.next = u : (u.next = C.next, C.next = u), h.pending = u;
              }
            }
            a.lanes = ze(a.lanes, n);
            var x = a.alternate;
            x !== null && (x.lanes = ze(x.lanes, n)), Mp(a.return, n, e), i.lanes = ze(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === Y)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === X) {
        var M = a.return;
        if (M === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        M.lanes = ze(M.lanes, n);
        var k = M.alternate;
        k !== null && (k.lanes = ze(k.lanes, n)), Mp(M, n, e), r = a.sibling;
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
    vc = e, Ul = null, _p = null;
    var n = e.dependencies;
    if (n !== null) {
      var a = n.firstContext;
      a !== null && (Wn(n.lanes, t) && Ls(), n.firstContext = null);
    }
  }
  function Lt(e) {
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
          lanes: G,
          firstContext: n
        };
      } else
        Ul = Ul.next = n;
    }
    return t;
  }
  var Bi = null;
  function Ap(e) {
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
  function Sy(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Ap(t)) : (n.next = r.next, r.next = n), t.interleaved = n, yc(e, a);
  }
  function kD(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, Ap(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function UD(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Ap(t)) : (n.next = r.next, r.next = n), t.interleaved = n, yc(e, a);
  }
  function Hn(e, t) {
    return yc(e, t);
  }
  var FD = yc;
  function yc(e, t) {
    e.lanes = ze(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = ze(n.lanes, t)), n === null && (e.flags & (At | mr)) !== je && gN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = ze(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = ze(n.childLanes, t) : (r.flags & (At | mr)) !== je && gN(e), a = r, r = r.return;
    if (a.tag === D) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var Ey = 0, xy = 1, bc = 2, Lp = 3, Nc = !1, Vp, Sc;
  Vp = !1, Sc = null;
  function kp(e) {
    var t = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        interleaved: null,
        lanes: G
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
      tag: Ey,
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
    if (Sc === r && !Vp && (f("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Vp = !0), kj()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, FD(e, n);
    } else
      return UD(e, r, t, n);
  }
  function Ec(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (Uh(n)) {
        var i = r.lanes;
        i = zh(i, e.pendingLanes);
        var l = ze(i, n);
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
            if (e.mode & Dt) {
              Zt(!0);
              try {
                l.call(i, a, r);
              } finally {
                Zt(!1);
              }
            }
            by();
          }
          return s;
        }
        return l;
      }
      case Lp:
        e.flags = e.flags & ~_n | tt;
      case Ey: {
        var u = n.payload, v;
        if (typeof u == "function") {
          yy(), v = u.call(i, a, r);
          {
            if (e.mode & Dt) {
              Zt(!0);
              try {
                u.call(i, a, r);
              } finally {
                Zt(!1);
              }
            }
            by();
          }
        } else
          v = u;
        return v == null ? a : Be({}, a, v);
      }
      case bc:
        return Nc = !0, a;
    }
    return a;
  }
  function xc(e, t, n, a) {
    var r = e.updateQueue;
    Nc = !1, Sc = r.shared;
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
      var M = r.baseState, k = G, z = null, fe = null, xe = null, be = i;
      do {
        var Ke = be.lane, Ie = be.eventTime;
        if (Sl(a, Ke)) {
          if (xe !== null) {
            var P = {
              eventTime: Ie,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: en,
              tag: be.tag,
              payload: be.payload,
              callback: be.callback,
              next: null
            };
            xe = xe.next = P;
          }
          M = zD(e, r, be, M, t, n);
          var _ = be.callback;
          if (_ !== null && // If the update was already committed, we should not queue its
          // callback again.
          be.lane !== en) {
            e.flags |= yh;
            var Z = r.effects;
            Z === null ? r.effects = [be] : Z.push(be);
          }
        } else {
          var w = {
            eventTime: Ie,
            lane: Ke,
            tag: be.tag,
            payload: be.payload,
            callback: be.callback,
            next: null
          };
          xe === null ? (fe = xe = w, z = M) : xe = xe.next = w, k = ze(k, Ke);
        }
        if (be = be.next, be === null) {
          if (s = r.shared.pending, s === null)
            break;
          var ve = s, de = ve.next;
          ve.next = null, be = de, r.lastBaseUpdate = ve, r.shared.pending = null;
        }
      } while (!0);
      xe === null && (z = M), r.baseState = z, r.firstBaseUpdate = fe, r.lastBaseUpdate = xe;
      var we = r.shared.interleaved;
      if (we !== null) {
        var ke = we;
        do
          k = ze(k, ke.lane), ke = ke.next;
        while (ke !== we);
      } else i === null && (r.shared.lanes = G);
      qs(k), e.lanes = k, e.memoizedState = M;
    }
    Sc = null;
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
  var Ns = {}, Jr = Gr(Ns), Ss = Gr(Ns), Cc = Gr(Ns);
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
    bn(Cc, t, e), bn(Ss, e, e), bn(Jr, Ns, e);
    var n = aC(t);
    yn(Jr, e), bn(Jr, n, e);
  }
  function zl(e) {
    yn(Jr, e), yn(Ss, e), yn(Cc, e);
  }
  function zp() {
    var e = Dc(Jr.current);
    return e;
  }
  function jy(e) {
    Dc(Cc.current);
    var t = Dc(Jr.current), n = rC(t, e.type);
    t !== n && (bn(Ss, e, e), bn(Jr, n, e));
  }
  function Pp(e) {
    Ss.current === e && (yn(Jr, e), yn(Ss, e));
  }
  var HD = 0, wy = 1, _y = 1, Es = 2, wa = Gr(HD);
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
      if (t.tag === ne) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || Gg(a) || lp(a))
            return t;
        }
      } else if (t.tag === re && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & tt) !== je;
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
  ), Pt = (
    /* */
    1
  ), Ka = (
    /*  */
    2
  ), Ht = (
    /*    */
    4
  ), on = (
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
  var me = m.ReactCurrentDispatcher, xs = m.ReactCurrentBatchConfig, Yp, Bl;
  Yp = /* @__PURE__ */ new Set();
  var $i = G, lt = null, Bt = null, $t = null, jc = !1, Rs = !1, Cs = 0, YD = 0, qD = 25, $ = null, ca = null, ei = -1, qp = !1;
  function nt() {
    {
      var e = $;
      ca === null ? ca = [e] : ca.push(e);
    }
  }
  function le() {
    {
      var e = $;
      ca !== null && (ei++, ca[ei] !== e && GD(e));
    }
  }
  function $l(e) {
    e != null && !$e(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", $, typeof e);
  }
  function GD(e) {
    {
      var t = Ue(lt);
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
    $i = i, lt = t, ca = e !== null ? e._debugHookTypes : null, ei = -1, qp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = G, e !== null && e.memoizedState !== null ? me.current = Jy : ca !== null ? me.current = Xy : me.current = Qy;
    var l = n(a, r);
    if (Rs) {
      var s = 0;
      do {
        if (Rs = !1, Cs = 0, s >= qD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        s += 1, qp = !1, Bt = null, $t = null, t.updateQueue = null, ei = -1, me.current = Zy, l = n(a, r);
      } while (Rs);
    }
    me.current = Hc, t._debugHookTypes = ca;
    var u = Bt !== null && Bt.next !== null;
    if ($i = G, lt = null, Bt = null, $t = null, $ = null, ca = null, ei = -1, e !== null && (e.flags & vr) !== (t.flags & vr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Ge) !== De && f("Internal React error: Expected static flag was missing. Please notify the React team."), jc = !1, u)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function Yl() {
    var e = Cs !== 0;
    return Cs = 0, e;
  }
  function Oy(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Ya) !== De ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = wu(e.lanes, n);
  }
  function My() {
    if (me.current = Hc, jc) {
      for (var e = lt.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      jc = !1;
    }
    $i = G, lt = null, Bt = null, $t = null, ca = null, ei = -1, $ = null, Yy = !1, Rs = !1, Cs = 0;
  }
  function Qa() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return $t === null ? lt.memoizedState = $t = e : $t = $t.next = e, $t;
  }
  function fa() {
    var e;
    if (Bt === null) {
      var t = lt.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = Bt.next;
    var n;
    if ($t === null ? n = lt.memoizedState : n = $t.next, n !== null)
      $t = n, n = $t.next, Bt = e;
    else {
      if (e === null)
        throw new Error("Rendered more hooks than during the previous render.");
      Bt = e;
      var a = {
        memoizedState: Bt.memoizedState,
        baseState: Bt.baseState,
        baseQueue: Bt.baseQueue,
        queue: Bt.queue,
        next: null
      };
      $t === null ? lt.memoizedState = $t = a : $t = $t.next = a;
    }
    return $t;
  }
  function Ay() {
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
      lanes: G,
      dispatch: null,
      lastRenderedReducer: e,
      lastRenderedState: r
    };
    a.queue = i;
    var l = i.dispatch = XD.bind(null, lt, i);
    return [a.memoizedState, l];
  }
  function Qp(e, t, n) {
    var a = fa(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = Bt, l = i.baseQueue, s = r.pending;
    if (s !== null) {
      if (l !== null) {
        var u = l.next, v = s.next;
        l.next = v, s.next = u;
      }
      i.baseQueue !== l && f("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), i.baseQueue = l = s, r.pending = null;
    }
    if (l !== null) {
      var h = l.next, C = i.baseState, x = null, M = null, k = null, z = h;
      do {
        var fe = z.lane;
        if (Sl($i, fe)) {
          if (k !== null) {
            var be = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: en,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            };
            k = k.next = be;
          }
          if (z.hasEagerState)
            C = z.eagerState;
          else {
            var Ke = z.action;
            C = e(C, Ke);
          }
        } else {
          var xe = {
            lane: fe,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          };
          k === null ? (M = k = xe, x = C) : k = k.next = xe, lt.lanes = ze(lt.lanes, fe), qs(fe);
        }
        z = z.next;
      } while (z !== null && z !== h);
      k === null ? x = C : k.next = M, Xn(C, a.memoizedState) || Ls(), a.memoizedState = C, a.baseState = x, a.baseQueue = k, r.lastRenderedState = C;
    }
    var Ie = r.interleaved;
    if (Ie !== null) {
      var w = Ie;
      do {
        var P = w.lane;
        lt.lanes = ze(lt.lanes, P), qs(P), w = w.next;
      } while (w !== Ie);
    } else l === null && (r.lanes = G);
    var _ = r.dispatch;
    return [a.memoizedState, _];
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
  function tO(e, t, n) {
  }
  function nO(e, t, n) {
  }
  function Jp(e, t, n) {
    var a = lt, r = Qa(), i, l = ln();
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
    return r.queue = v, Ac(ky.bind(null, a, v, e), [e]), a.flags |= Fr, Ds(Pt | on, Vy.bind(null, a, v, i, t), void 0, null), i;
  }
  function wc(e, t, n) {
    var a = lt, r = fa(), i = t();
    if (!Bl) {
      var l = t();
      Xn(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Bl = !0);
    }
    var s = r.memoizedState, u = !Xn(s, i);
    u && (r.memoizedState = i, Ls());
    var v = r.queue;
    if (js(ky.bind(null, a, v, e), [e]), v.getSnapshot !== t || u || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    $t !== null && $t.memoizedState.tag & Pt) {
      a.flags |= Fr, Ds(Pt | on, Vy.bind(null, a, v, i, t), void 0, null);
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
    }, r = lt.updateQueue;
    if (r === null)
      r = Ay(), lt.updateQueue = r, r.stores = [a];
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
    var t = Hn(e, Me);
    t !== null && Gt(t, e, Me, dt);
  }
  function _c(e) {
    var t = Qa();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: G,
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
      i = Ay(), lt.updateQueue = i, i.lastEffect = r.next = r;
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
    lt.flags |= e, r.memoizedState = Ds(Pt | t, n, void 0, i);
  }
  function Mc(e, t, n, a) {
    var r = fa(), i = a === void 0 ? null : a, l = void 0;
    if (Bt !== null) {
      var s = Bt.memoizedState;
      if (l = s.destroy, i !== null) {
        var u = s.deps;
        if (Gp(i, u)) {
          r.memoizedState = Ds(t, n, l, i);
          return;
        }
      }
    }
    lt.flags |= e, r.memoizedState = Ds(Pt | t, n, l, i);
  }
  function Ac(e, t) {
    return (lt.mode & Ya) !== De ? Ts(Jf | Fr | Xf, on, e, t) : Ts(Fr | Xf, on, e, t);
  }
  function js(e, t) {
    return Mc(Fr, on, e, t);
  }
  function nm(e, t) {
    return Ts(et, Ka, e, t);
  }
  function Lc(e, t) {
    return Mc(et, Ka, e, t);
  }
  function am(e, t) {
    var n = et;
    return n |= Di, (lt.mode & Ya) !== De && (n |= zr), Ts(n, Ht, e, t);
  }
  function Vc(e, t) {
    return Mc(et, Ht, e, t);
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
    return r |= Di, (lt.mode & Ya) !== De && (r |= zr), Ts(r, Ht, zy.bind(null, t, e), a);
  }
  function kc(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return Mc(et, Ht, zy.bind(null, t, e), a);
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
    var t = fa(), n = Bt, a = n.memoizedState;
    return By(t, a, e);
  }
  function Hy(e) {
    var t = fa();
    if (Bt === null)
      return t.memoizedState = e, e;
    var n = Bt.memoizedState;
    return By(t, n, e);
  }
  function By(e, t, n) {
    var a = !Ax($i);
    if (a) {
      if (!Xn(n, t)) {
        var r = Fh();
        lt.lanes = ze(lt.lanes, r), qs(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Ls()), e.memoizedState = n, n;
  }
  function KD(e, t, n) {
    var a = Ca();
    tn(Bx(a, gr)), e(!0);
    var r = xs.transition;
    xs.transition = {};
    var i = xs.transition;
    xs.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (tn(a), xs.transition = r, r === null && i._updatedFibers) {
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
    if (ln()) {
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
      var i = Sy(e, t, r, a);
      if (i !== null) {
        var l = An();
        Gt(i, e, a, l), Wy(i, t, a);
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
      if (e.lanes === G && (i === null || i.lanes === G)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var s;
          s = me.current, me.current = _a;
          try {
            var u = t.lastRenderedState, v = l(u, n);
            if (r.hasEagerState = !0, r.eagerState = v, Xn(v, u)) {
              kD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            me.current = s;
          }
        }
      }
      var h = Sy(e, t, r, a);
      if (h !== null) {
        var C = An();
        Gt(h, e, a, C), Wy(h, t, a);
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
    if (Uh(n)) {
      var a = t.lanes;
      a = zh(a, e.pendingLanes);
      var r = ze(a, n);
      t.lanes = r, jd(e, r);
    }
  }
  function Ky(e, t, n) {
    ad(e, t);
  }
  var Hc = {
    readContext: Lt,
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
    unstable_isNewReconciler: Ne
  }, Qy = null, Xy = null, Jy = null, Zy = null, Xa = null, _a = null, Bc = null;
  {
    var cm = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, Ae = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Qy = {
      readContext: function(e) {
        return Lt(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", nt(), $l(t), im(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", nt(), Lt(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", nt(), $l(t), Ac(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", nt(), $l(n), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", nt(), $l(t), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", nt(), $l(t), am(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", nt(), $l(t);
        var n = me.current;
        me.current = Xa;
        try {
          return lm(e, t);
        } finally {
          me.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", nt();
        var a = me.current;
        me.current = Xa;
        try {
          return Kp(e, t, n);
        } finally {
          me.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", nt(), tm(e);
      },
      useState: function(e) {
        $ = "useState", nt();
        var t = me.current;
        me.current = Xa;
        try {
          return _c(e);
        } finally {
          me.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", nt(), void 0;
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", nt(), om(e);
      },
      useTransition: function() {
        return $ = "useTransition", nt(), sm();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", nt(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", nt(), Jp(e, t, n);
      },
      useId: function() {
        return $ = "useId", nt(), um();
      },
      unstable_isNewReconciler: Ne
    }, Xy = {
      readContext: function(e) {
        return Lt(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", le(), im(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", le(), Lt(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", le(), Ac(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", le(), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", le(), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", le(), am(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", le();
        var n = me.current;
        me.current = Xa;
        try {
          return lm(e, t);
        } finally {
          me.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", le();
        var a = me.current;
        me.current = Xa;
        try {
          return Kp(e, t, n);
        } finally {
          me.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", le(), tm(e);
      },
      useState: function(e) {
        $ = "useState", le();
        var t = me.current;
        me.current = Xa;
        try {
          return _c(e);
        } finally {
          me.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", le(), void 0;
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", le(), om(e);
      },
      useTransition: function() {
        return $ = "useTransition", le(), sm();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", le(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", le(), Jp(e, t, n);
      },
      useId: function() {
        return $ = "useId", le(), um();
      },
      unstable_isNewReconciler: Ne
    }, Jy = {
      readContext: function(e) {
        return Lt(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", le(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", le(), Lt(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", le(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", le(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", le(), Lc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", le(), Vc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", le();
        var n = me.current;
        me.current = _a;
        try {
          return zc(e, t);
        } finally {
          me.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", le();
        var a = me.current;
        me.current = _a;
        try {
          return Qp(e, t, n);
        } finally {
          me.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", le(), Oc();
      },
      useState: function(e) {
        $ = "useState", le();
        var t = me.current;
        me.current = _a;
        try {
          return Zp(e);
        } finally {
          me.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", le(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", le(), Py(e);
      },
      useTransition: function() {
        return $ = "useTransition", le(), $y();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", le(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", le(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", le(), Pc();
      },
      unstable_isNewReconciler: Ne
    }, Zy = {
      readContext: function(e) {
        return Lt(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", le(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", le(), Lt(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", le(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", le(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", le(), Lc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", le(), Vc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", le();
        var n = me.current;
        me.current = Bc;
        try {
          return zc(e, t);
        } finally {
          me.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", le();
        var a = me.current;
        me.current = Bc;
        try {
          return Xp(e, t, n);
        } finally {
          me.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", le(), Oc();
      },
      useState: function(e) {
        $ = "useState", le();
        var t = me.current;
        me.current = Bc;
        try {
          return em(e);
        } finally {
          me.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", le(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", le(), Hy(e);
      },
      useTransition: function() {
        return $ = "useTransition", le(), Iy();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", le(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", le(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", le(), Pc();
      },
      unstable_isNewReconciler: Ne
    }, Xa = {
      readContext: function(e) {
        return cm(), Lt(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", Ae(), nt(), im(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", Ae(), nt(), Lt(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", Ae(), nt(), Ac(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", Ae(), nt(), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", Ae(), nt(), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", Ae(), nt(), am(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", Ae(), nt();
        var n = me.current;
        me.current = Xa;
        try {
          return lm(e, t);
        } finally {
          me.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", Ae(), nt();
        var a = me.current;
        me.current = Xa;
        try {
          return Kp(e, t, n);
        } finally {
          me.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", Ae(), nt(), tm(e);
      },
      useState: function(e) {
        $ = "useState", Ae(), nt();
        var t = me.current;
        me.current = Xa;
        try {
          return _c(e);
        } finally {
          me.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", Ae(), nt(), void 0;
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", Ae(), nt(), om(e);
      },
      useTransition: function() {
        return $ = "useTransition", Ae(), nt(), sm();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", Ae(), nt(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", Ae(), nt(), Jp(e, t, n);
      },
      useId: function() {
        return $ = "useId", Ae(), nt(), um();
      },
      unstable_isNewReconciler: Ne
    }, _a = {
      readContext: function(e) {
        return cm(), Lt(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", Ae(), le(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", Ae(), le(), Lt(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", Ae(), le(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", Ae(), le(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", Ae(), le(), Lc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", Ae(), le(), Vc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", Ae(), le();
        var n = me.current;
        me.current = _a;
        try {
          return zc(e, t);
        } finally {
          me.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", Ae(), le();
        var a = me.current;
        me.current = _a;
        try {
          return Qp(e, t, n);
        } finally {
          me.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", Ae(), le(), Oc();
      },
      useState: function(e) {
        $ = "useState", Ae(), le();
        var t = me.current;
        me.current = _a;
        try {
          return Zp(e);
        } finally {
          me.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", Ae(), le(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", Ae(), le(), Py(e);
      },
      useTransition: function() {
        return $ = "useTransition", Ae(), le(), $y();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", Ae(), le(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", Ae(), le(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", Ae(), le(), Pc();
      },
      unstable_isNewReconciler: Ne
    }, Bc = {
      readContext: function(e) {
        return cm(), Lt(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", Ae(), le(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", Ae(), le(), Lt(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", Ae(), le(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", Ae(), le(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", Ae(), le(), Lc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", Ae(), le(), Vc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", Ae(), le();
        var n = me.current;
        me.current = _a;
        try {
          return zc(e, t);
        } finally {
          me.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", Ae(), le();
        var a = me.current;
        me.current = _a;
        try {
          return Xp(e, t, n);
        } finally {
          me.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", Ae(), le(), Oc();
      },
      useState: function(e) {
        $ = "useState", Ae(), le();
        var t = me.current;
        me.current = _a;
        try {
          return em(e);
        } finally {
          me.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", Ae(), le(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", Ae(), le(), Hy(e);
      },
      useTransition: function() {
        return $ = "useTransition", Ae(), le(), Iy();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", Ae(), le(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", Ae(), le(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", Ae(), le(), Pc();
      },
      unstable_isNewReconciler: Ne
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
          case W:
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
          case W:
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
      var n = Be({}, t), a = e.defaultProps;
      for (var r in a)
        n[r] === void 0 && (n[r] = a[r]);
      return n;
    }
    return t;
  }
  var hm = {}, gm, ym, bm, Nm, Sm, ib, Gc, Em, xm, Rm, _s;
  {
    gm = /* @__PURE__ */ new Set(), ym = /* @__PURE__ */ new Set(), bm = /* @__PURE__ */ new Set(), Nm = /* @__PURE__ */ new Set(), Em = /* @__PURE__ */ new Set(), Sm = /* @__PURE__ */ new Set(), xm = /* @__PURE__ */ new Set(), Rm = /* @__PURE__ */ new Set(), _s = /* @__PURE__ */ new Set();
    var lb = /* @__PURE__ */ new Set();
    Gc = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        lb.has(n) || (lb.add(n), f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, ib = function(e, t) {
      if (t === void 0) {
        var n = Ze(e) || "Component";
        Sm.has(n) || (Sm.add(n), f("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", n));
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
      if (e.mode & Dt) {
        Zt(!0);
        try {
          i = n(a, r);
        } finally {
          Zt(!1);
        }
      }
      ib(t, i);
    }
    var l = i == null ? r : Be({}, r, i);
    if (e.memoizedState = l, e.lanes === G) {
      var s = e.updateQueue;
      s.baseState = l;
    }
  }
  var Dm = {
    isMounted: qE,
    enqueueSetState: function(e, t, n) {
      var a = dl(e), r = An(), i = ii(a), l = Rr(r, i);
      l.payload = t, n != null && (Gc(n, "setState"), l.callback = n);
      var s = Xr(a, l, i);
      s !== null && (Gt(s, a, i, r), Ec(s, a, i)), ad(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = dl(e), r = An(), i = ii(a), l = Rr(r, i);
      l.tag = xy, l.payload = t, n != null && (Gc(n, "replaceState"), l.callback = n);
      var s = Xr(a, l, i);
      s !== null && (Gt(s, a, i, r), Ec(s, a, i)), ad(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = dl(e), a = An(), r = ii(n), i = Rr(a, r);
      i.tag = bc, t != null && (Gc(t, "forceUpdate"), i.callback = t);
      var l = Xr(n, i, r);
      l !== null && (Gt(l, n, r, a), Ec(l, n, r)), xx(n, r);
    }
  };
  function ob(e, t, n, a, r, i, l) {
    var s = e.stateNode;
    if (typeof s.shouldComponentUpdate == "function") {
      var u = s.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & Dt) {
          Zt(!0);
          try {
            u = s.shouldComponentUpdate(a, i, l);
          } finally {
            Zt(!1);
          }
        }
        u === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Ze(t) || "Component");
      }
      return u;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Jo(n, a) || !Jo(r, i) : !0;
  }
  function nT(e, t, n) {
    var a = e.stateNode;
    {
      var r = Ze(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Dt) === De && (_s.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Dt) === De && (_s.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !xm.has(t) && (xm.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Ze(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !bm.has(t) && (bm.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Ze(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var s = a.state;
      s && (typeof s != "object" || $e(s)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function sb(e, t) {
    t.updater = Dm, e.stateNode = t, BE(t, e), t._reactInternalInstance = hm;
  }
  function ub(e, t, n) {
    var a = !1, r = Jn, i = Jn, l = t.contextType;
    if ("contextType" in t) {
      var s = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === ce && l._context === void 0
      );
      if (!s && !Rm.has(t)) {
        Rm.add(t);
        var u = "";
        l === void 0 ? u = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? u = " However, it is set to a " + typeof l + "." : l.$$typeof === K ? u = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? u = " Did you accidentally pass the Context.Consumer instead?" : u = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Ze(t) || "Component", u);
      }
    }
    if (typeof l == "object" && l !== null)
      i = Lt(l);
    else {
      r = Ol(e, t, !0);
      var v = t.contextTypes;
      a = v != null, i = a ? Ml(e, r) : Jn;
    }
    var h = new t(n, i);
    if (e.mode & Dt) {
      Zt(!0);
      try {
        h = new t(n, i);
      } finally {
        Zt(!1);
      }
    }
    var C = e.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null;
    sb(e, h);
    {
      if (typeof t.getDerivedStateFromProps == "function" && C === null) {
        var x = Ze(t) || "Component";
        ym.has(x) || (ym.add(x), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", x, h.state === null ? "null" : "undefined", x));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function") {
        var M = null, k = null, z = null;
        if (typeof h.componentWillMount == "function" && h.componentWillMount.__suppressDeprecationWarning !== !0 ? M = "componentWillMount" : typeof h.UNSAFE_componentWillMount == "function" && (M = "UNSAFE_componentWillMount"), typeof h.componentWillReceiveProps == "function" && h.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? k = "componentWillReceiveProps" : typeof h.UNSAFE_componentWillReceiveProps == "function" && (k = "UNSAFE_componentWillReceiveProps"), typeof h.componentWillUpdate == "function" && h.componentWillUpdate.__suppressDeprecationWarning !== !0 ? z = "componentWillUpdate" : typeof h.UNSAFE_componentWillUpdate == "function" && (z = "UNSAFE_componentWillUpdate"), M !== null || k !== null || z !== null) {
          var fe = Ze(t) || "Component", xe = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          Nm.has(fe) || (Nm.add(fe), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, fe, xe, M !== null ? `
  ` + M : "", k !== null ? `
  ` + k : "", z !== null ? `
  ` + z : ""));
        }
      }
    }
    return a && Jg(e, r, i), h;
  }
  function aT(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Ue(e) || "Component"), Dm.enqueueReplaceState(t, t.state, null));
  }
  function cb(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = Ue(e) || "Component";
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
      r.context = Lt(i);
    else {
      var l = Ol(e, t, !0);
      r.context = Ml(e, l);
    }
    {
      if (r.state === n) {
        var s = Ze(t) || "Component";
        Em.has(s) || (Em.add(s), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", s));
      }
      e.mode & Dt && ja.recordLegacyContextWarning(e, r), ja.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var u = t.getDerivedStateFromProps;
    if (typeof u == "function" && (Cm(e, t, u, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (aT(e, r), xc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var v = et;
      v |= Di, (e.mode & Ya) !== De && (v |= zr), e.flags |= v;
    }
  }
  function rT(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, s = t.contextType, u = Jn;
    if (typeof s == "object" && s !== null)
      u = Lt(s);
    else {
      var v = Ol(e, t, !0);
      u = Ml(e, v);
    }
    var h = t.getDerivedStateFromProps, C = typeof h == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !C && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== u) && cb(e, r, n, u), Cy();
    var x = e.memoizedState, M = r.state = x;
    if (xc(e, n, r, a), M = e.memoizedState, i === n && x === M && !rc() && !Rc()) {
      if (typeof r.componentDidMount == "function") {
        var k = et;
        k |= Di, (e.mode & Ya) !== De && (k |= zr), e.flags |= k;
      }
      return !1;
    }
    typeof h == "function" && (Cm(e, t, h, n), M = e.memoizedState);
    var z = Rc() || ob(e, t, i, n, x, M, u);
    if (z) {
      if (!C && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var fe = et;
        fe |= Di, (e.mode & Ya) !== De && (fe |= zr), e.flags |= fe;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var xe = et;
        xe |= Di, (e.mode & Ya) !== De && (xe |= zr), e.flags |= xe;
      }
      e.memoizedProps = n, e.memoizedState = M;
    }
    return r.props = n, r.state = M, r.context = u, z;
  }
  function iT(e, t, n, a, r) {
    var i = t.stateNode;
    Ry(e, t);
    var l = t.memoizedProps, s = t.type === t.elementType ? l : Oa(t.type, l);
    i.props = s;
    var u = t.pendingProps, v = i.context, h = n.contextType, C = Jn;
    if (typeof h == "object" && h !== null)
      C = Lt(h);
    else {
      var x = Ol(t, n, !0);
      C = Ml(t, x);
    }
    var M = n.getDerivedStateFromProps, k = typeof M == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !k && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== u || v !== C) && cb(t, i, a, C), Cy();
    var z = t.memoizedState, fe = i.state = z;
    if (xc(t, a, i, r), fe = t.memoizedState, l === u && z === fe && !rc() && !Rc() && !_e)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= et), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= ml), !1;
    typeof M == "function" && (Cm(t, n, M, a), fe = t.memoizedState);
    var xe = Rc() || ob(t, n, s, a, z, fe, C) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    _e;
    return xe ? (!k && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, fe, C), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, fe, C)), typeof i.componentDidUpdate == "function" && (t.flags |= et), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= ml)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= et), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= ml), t.memoizedProps = a, t.memoizedState = fe), i.props = a, i.state = fe, i.context = C, xe;
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
      var s = r ? Ue(r) : null, u = s ? "The above error occurred in the <" + s + "> component:" : "The above error occurred in one of your React components:", v;
      if (e.tag === D)
        v = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var h = Ue(e) || "Anonymous";
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
    var a = Rr(dt, n);
    a.tag = Lp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Zj(r), wm(e, t);
    }, a;
  }
  function _m(e, t, n) {
    var a = Rr(dt, n);
    a.tag = Lp;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      a.payload = function() {
        return r(i);
      }, a.callback = function() {
        EN(e), wm(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (a.callback = function() {
      EN(e), wm(e, t), typeof r != "function" && Xj(this);
      var u = t.value, v = t.stack;
      this.componentDidCatch(u, {
        componentStack: v !== null ? v : ""
      }), typeof r != "function" && (Wn(e.lanes, Me) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Ue(e) || "Unknown"));
    }), a;
  }
  function db(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new oT(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = ew.bind(null, e, t, n);
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
    if ((e.mode & Ge) === De && (n === R || n === B || n === q)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function pb(e) {
    var t = e;
    do {
      if (t.tag === ne && $D(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function mb(e, t, n, a, r) {
    if ((e.mode & Ge) === De) {
      if (e === t)
        e.flags |= _n;
      else {
        if (e.flags |= tt, n.flags |= Kf, n.flags &= -52805, n.tag === T) {
          var i = n.alternate;
          if (i === null)
            n.tag = I;
          else {
            var l = Rr(dt, Me);
            l.tag = bc, Xr(n, l, Me);
          }
        }
        n.lanes = ze(n.lanes, Me);
      }
      return e;
    }
    return e.flags |= _n, e.lanes = r, e;
  }
  function cT(e, t, n, a, r) {
    if (n.flags |= Eu, Ra && Gs(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      uT(n), ln() && n.mode & Ge && iy();
      var l = pb(t);
      if (l !== null) {
        l.flags &= ~pr, mb(l, t, n, e, r), l.mode & Ge && db(e, i, r), sT(l, e, i);
        return;
      } else {
        if (!Mx(r)) {
          db(e, i, r), uv();
          return;
        }
        var s = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = s;
      }
    } else if (ln() && n.mode & Ge) {
      iy();
      var u = pb(t);
      if (u !== null) {
        (u.flags & _n) === je && (u.flags |= pr), mb(u, t, n, e, r), Ep(Ii(a, n));
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
          v.lanes = ze(v.lanes, C);
          var x = fb(v, h, C);
          Up(v, x);
          return;
        }
        case T:
          var M = a, k = v.type, z = v.stateNode;
          if ((v.flags & tt) === je && (typeof k.getDerivedStateFromError == "function" || z !== null && typeof z.componentDidCatch == "function" && !pN(z))) {
            v.flags |= _n;
            var fe = Uo(r);
            v.lanes = ze(v.lanes, fe);
            var xe = _m(v, M, fe);
            Up(v, xe);
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
  var Os = m.ReactCurrentOwner, Ma = !1, Om, Ms, Mm, Am, Lm, Yi, Vm, Wc, As;
  Om = {}, Ms = {}, Mm = {}, Am = {}, Lm = {}, Yi = !1, Vm = {}, Wc = {}, As = {};
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
        Ze(n)
      );
    }
    var l = n.render, s = t.ref, u, v;
    Fl(t, r), Oo(t);
    {
      if (Os.current = t, la(!0), u = Il(e, t, l, a, s, r), v = Yl(), t.mode & Dt) {
        Zt(!0);
        try {
          u = Il(e, t, l, a, s, r), v = Yl();
        } finally {
          Zt(!1);
        }
      }
      la(!1);
    }
    return gl(), e !== null && !Ma ? (Oy(e, t, r), Cr(e, t, r)) : (ln() && v && hp(t), t.flags |= pl, On(e, t, u, r), t.child);
  }
  function hb(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (gw(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Zl(i), t.tag = q, t.type = l, Fm(t, i), gb(e, t, l, a, r);
      }
      {
        var s = i.propTypes;
        if (s && Da(
          s,
          a,
          // Resolved props
          "prop",
          Ze(i)
        ), n.defaultProps !== void 0) {
          var u = Ze(i) || "Unknown";
          As[u] || (f("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", u), As[u] = !0);
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
        Ze(h)
      );
    }
    var x = e.child, M = Im(e, r);
    if (!M) {
      var k = x.memoizedProps, z = n.compare;
      if (z = z !== null ? z : Jo, z(k, a) && e.ref === t.ref)
        return Cr(e, t, r);
    }
    t.flags |= pl;
    var fe = Qi(x, a);
    return fe.ref = t.ref, fe.return = t, t.child = fe, fe;
  }
  function gb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === Ce) {
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
          Ze(i)
        );
      }
    }
    if (e !== null) {
      var h = e.memoizedProps;
      if (Jo(h, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (Ma = !1, t.pendingProps = a = h, Im(e, r))
          (e.flags & Kf) !== je && (Ma = !0);
        else return t.lanes = e.lanes, Cr(e, t, r);
    }
    return km(e, t, n, a, r);
  }
  function yb(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Qe)
      if ((t.mode & Ge) === De) {
        var l = {
          baseLanes: G,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, sf(t, n);
      } else if (Wn(n, Gn)) {
        var C = {
          baseLanes: G,
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
          u = ze(v, n);
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
      i !== null ? (M = ze(i.baseLanes, n), t.memoizedState = null) : M = n, sf(t, M);
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
      t.flags |= et;
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
        Ze(n)
      );
    }
    var l;
    {
      var s = Ol(t, n, !0);
      l = Ml(t, s);
    }
    var u, v;
    Fl(t, r), Oo(t);
    {
      if (Os.current = t, la(!0), u = Il(e, t, n, a, l, r), v = Yl(), t.mode & Dt) {
        Zt(!0);
        try {
          u = Il(e, t, n, a, l, r), v = Yl();
        } finally {
          Zt(!1);
        }
      }
      la(!1);
    }
    return gl(), e !== null && !Ma ? (Oy(e, t, r), Cr(e, t, r)) : (ln() && v && hp(t), t.flags |= pl, On(e, t, u, r), t.child);
  }
  function Nb(e, t, n, a, r) {
    {
      switch (Mw(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, s = new l(t.memoizedProps, i.context), u = s.state;
          i.updater.enqueueSetState(i, u, null);
          break;
        }
        case !0: {
          t.flags |= tt, t.flags |= _n;
          var v = new Error("Simulated error coming from DevTools"), h = Uo(r);
          t.lanes = ze(t.lanes, h);
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
          Ze(n)
        );
      }
    }
    var M;
    Wa(n) ? (M = !0, lc(t)) : M = !1, Fl(t, r);
    var k = t.stateNode, z;
    k === null ? (Qc(e, t), ub(t, n, a), Tm(t, n, a, r), z = !0) : e === null ? z = rT(t, n, a, r) : z = iT(e, t, n, a, r);
    var fe = Um(e, t, n, z, M, r);
    {
      var xe = t.stateNode;
      z && xe.props !== a && (Yi || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Ue(t) || "a component"), Yi = !0);
    }
    return fe;
  }
  function Um(e, t, n, a, r, i) {
    bb(e, t);
    var l = (t.flags & tt) !== je;
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
        if (la(!0), u = s.render(), t.mode & Dt) {
          Zt(!0);
          try {
            s.render();
          } finally {
            Zt(!1);
          }
        }
        la(!1);
      }
      gl();
    }
    return t.flags |= pl, e !== null && l ? dT(e, t, u, i) : On(e, t, u, i), t.memoizedState = s.state, r && ty(t, n, !0), t.child;
  }
  function Sb(e) {
    var t = e.stateNode;
    t.pendingContext ? Zg(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Zg(e, t.context, !1), Fp(e, t.containerInfo);
  }
  function hT(e, t, n) {
    if (Sb(t), e === null)
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
        return Eb(e, t, s, n, h);
      } else if (s !== i) {
        var C = Ii(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return Eb(e, t, s, n, C);
      } else {
        bD(t);
        var x = gy(t, null, s, n);
        t.child = x;
        for (var M = x; M; )
          M.flags = M.flags & ~At | mr, M = M.sibling;
      }
    } else {
      if (Vl(), s === i)
        return Cr(e, t, n);
      On(e, t, s, n);
    }
    return t.child;
  }
  function Eb(e, t, n, a, r) {
    return Vl(), Ep(r), t.flags |= pr, On(e, t, n, a), t.child;
  }
  function gT(e, t, n) {
    jy(t), e === null && Sp(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, s = np(a, r);
    return s ? l = null : i !== null && np(a, i) && (t.flags |= wo), bb(e, t), On(e, t, l, n), t.child;
  }
  function yT(e, t) {
    return e === null && Sp(t), null;
  }
  function bT(e, t, n, a) {
    Qc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, s = i._init, u = s(l);
    t.type = u;
    var v = t.tag = yw(u), h = Oa(u, r), C;
    switch (v) {
      case R:
        return Fm(t, u), t.type = u = Zl(u), C = km(null, t, u, h, a), C;
      case T:
        return t.type = u = mv(u), C = Nb(null, t, u, h, a), C;
      case B:
        return t.type = u = vv(u), C = vb(null, t, u, h, a), C;
      case ee: {
        if (t.type !== t.elementType) {
          var x = u.propTypes;
          x && Da(
            x,
            h,
            // Resolved for outer only
            "prop",
            Ze(u)
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
    throw u !== null && typeof u == "object" && u.$$typeof === Ce && (M = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + u + ". " + ("Lazy element type must resolve to a class or function." + M));
  }
  function NT(e, t, n, a, r) {
    Qc(e, t), t.tag = T;
    var i;
    return Wa(n) ? (i = !0, lc(t)) : i = !1, Fl(t, r), ub(t, n, a), Tm(t, n, a, r), Um(null, t, n, !0, i, r);
  }
  function ST(e, t, n, a) {
    Qc(e, t);
    var r = t.pendingProps, i;
    {
      var l = Ol(t, n, !1);
      i = Ml(t, l);
    }
    Fl(t, a);
    var s, u;
    Oo(t);
    {
      if (n.prototype && typeof n.prototype.render == "function") {
        var v = Ze(n) || "Unknown";
        Om[v] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", v, v), Om[v] = !0);
      }
      t.mode & Dt && ja.recordLegacyContextWarning(t, null), la(!0), Os.current = t, s = Il(null, t, n, r, i, a), u = Yl(), la(!1);
    }
    if (gl(), t.flags |= pl, typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0) {
      var h = Ze(n) || "Unknown";
      Ms[h] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", h, h, h), Ms[h] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0
    ) {
      {
        var C = Ze(n) || "Unknown";
        Ms[C] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", C, C, C), Ms[C] = !0);
      }
      t.tag = T, t.memoizedState = null, t.updateQueue = null;
      var x = !1;
      return Wa(n) ? (x = !0, lc(t)) : x = !1, t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, kp(t), sb(t, s), Tm(t, n, r, a), Um(null, t, n, !0, x, a);
    } else {
      if (t.tag = R, t.mode & Dt) {
        Zt(!0);
        try {
          s = Il(null, t, n, r, i, a), u = Yl();
        } finally {
          Zt(!1);
        }
      }
      return ln() && u && hp(t), On(null, t, s, a), Fm(t, n), t.child;
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
        var l = Ze(t) || "Unknown";
        As[l] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), As[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var s = Ze(t) || "Unknown";
        Am[s] || (f("%s: Function components do not support getDerivedStateFromProps.", s), Am[s] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var u = Ze(t) || "Unknown";
        Mm[u] || (f("%s: Function components do not support contextType.", u), Mm[u] = !0);
      }
    }
  }
  var zm = {
    dehydrated: null,
    treeContext: null,
    retryLane: en
  };
  function Pm(e) {
    return {
      baseLanes: e,
      cachePool: fT(),
      transitions: null
    };
  }
  function ET(e, t) {
    var n = null;
    return {
      baseLanes: ze(e.baseLanes, t),
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
    return Hp(e, Es);
  }
  function RT(e, t) {
    return wu(e.childLanes, t);
  }
  function xb(e, t, n) {
    var a = t.pendingProps;
    Aw(t) && (t.flags |= tt);
    var r = wa.current, i = !1, l = (t.flags & tt) !== je;
    if (l || xT(r, e) ? (i = !0, t.flags &= ~tt) : (e === null || e.memoizedState !== null) && (r = BD(r, _y)), r = Pl(r), Zr(t, r), e === null) {
      Sp(t);
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
        var k = M.dehydrated;
        if (k !== null)
          return _T(e, t, l, a, k, M, n);
      }
      if (i) {
        var z = a.fallback, fe = a.children, xe = TT(e, t, fe, z, n), be = t.child, Ke = e.child.memoizedState;
        return be.memoizedState = Ke === null ? Pm(n) : ET(Ke, n), be.childLanes = RT(e, n), t.memoizedState = zm, xe;
      } else {
        var Ie = a.children, w = DT(e, t, Ie, n);
        return t.memoizedState = null, w;
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
    return (r & Ge) === De && i !== null ? (s = i, s.childLanes = G, s.pendingProps = l, e.mode & it && (s.actualDuration = 0, s.actualStartTime = -1, s.selfBaseDuration = 0, s.treeBaseDuration = 0), u = oi(n, r, a, null)) : (s = Bm(l, r), u = oi(n, r, a, null)), s.return = e, u.return = e, s.sibling = u, e.child = s, u;
  }
  function Bm(e, t, n) {
    return RN(e, t, G, null);
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
      (i & Ge) === De && // Make sure we're on the second pass, i.e. the primary child fragment was
      // already cloned. In legacy mode, the only case where this isn't true is
      // when DevTools forces us to display a fallback; we skip the first render
      // pass entirely and go straight to rendering the fallback. (In Concurrent
      // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
      // only codepath.)
      t.child !== l
    ) {
      var h = t.child;
      v = h, v.childLanes = G, v.pendingProps = u, t.mode & it && (v.actualDuration = 0, v.actualStartTime = -1, v.selfBaseDuration = l.selfBaseDuration, v.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      v = Rb(l, u), v.subtreeFlags = l.subtreeFlags & vr;
    var C;
    return s !== null ? C = Qi(s, a) : (C = oi(a, i, r, null), C.flags |= At), C.return = t, v.return = t, v.sibling = C, t.child = v, C;
  }
  function Kc(e, t, n, a) {
    a !== null && Ep(a), kl(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = Hm(t, i);
    return l.flags |= At, t.memoizedState = null, l;
  }
  function jT(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, s = Bm(l, i), u = oi(a, i, r, null);
    return u.flags |= At, s.return = t, u.return = t, s.sibling = u, t.child = s, (t.mode & Ge) !== De && kl(t, e.child, null, r), u;
  }
  function wT(e, t, n) {
    return (e.mode & Ge) === De ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Me) : lp(t) ? e.lanes = wi : e.lanes = Gn, null;
  }
  function _T(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & pr) {
        t.flags &= ~pr;
        var w = jm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return Kc(e, t, l, w);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= tt, null;
        var P = a.children, _ = a.fallback, Z = jT(e, t, P, _, l), ve = t.child;
        return ve.memoizedState = Pm(l), t.memoizedState = zm, Z;
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
        var s, u, v;
        {
          var h = LC(r);
          s = h.digest, u = h.message, v = h.stack;
        }
        var C;
        u ? C = new Error(u) : C = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var x = jm(C, s, v);
        return Kc(e, t, l, x);
      }
      var M = Wn(l, e.childLanes);
      if (Ma || M) {
        var k = of();
        if (k !== null) {
          var z = Px(k, l);
          if (z !== en && z !== i.retryLane) {
            i.retryLane = z;
            var fe = dt;
            Hn(e, z), Gt(k, e, z, fe);
          }
        }
        uv();
        var xe = jm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Kc(e, t, l, xe);
      } else if (Gg(r)) {
        t.flags |= tt, t.child = e.child;
        var be = tw.bind(null, e);
        return VC(r, be), null;
      } else {
        ND(t, r, i.treeContext);
        var Ke = a.children, Ie = Hm(t, Ke);
        return Ie.flags |= mr, Ie;
      }
    }
  }
  function Cb(e, t, n) {
    e.lanes = ze(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = ze(a.lanes, t)), Mp(e.return, t, n);
  }
  function OT(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === ne) {
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
  function AT(e) {
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
      var n = $e(e), a = !n && typeof Ea(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function VT(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if ($e(e)) {
        for (var n = 0; n < e.length; n++)
          if (!Db(e[n], n))
            return;
      } else {
        var a = Ea(e);
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
    AT(r), LT(i, r), VT(l, r), On(e, t, l, n);
    var s = wa.current, u = Hp(s, Es);
    if (u)
      s = Bp(s, Es), t.flags |= tt;
    else {
      var v = e !== null && (e.flags & tt) !== je;
      v && OT(t, t.child, n), s = Pl(s);
    }
    if (Zr(t, s), (t.mode & Ge) === De)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var h = MT(t.child), C;
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
            var k = M.alternate;
            if (k !== null && Tc(k) === null) {
              t.child = M;
              break;
            }
            var z = M.sibling;
            M.sibling = x, x = M, M = z;
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
        AD(t, r, n);
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
    var l = Lt(a);
    Oo(t);
    var s;
    return Os.current = t, la(!0), s = i(l), la(!1), gl(), t.flags |= pl, On(e, t, s, n), t.child;
  }
  function Ls() {
    Ma = !0;
  }
  function Qc(e, t) {
    (t.mode & Ge) === De && e !== null && (e.alternate = null, t.alternate = null, t.flags |= At);
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
      return i === null ? (a.deletions = [e], a.flags |= xi) : i.push(e), n.flags |= At, n;
    }
  }
  function Im(e, t) {
    var n = e.lanes;
    return !!Wn(n, t);
  }
  function PT(e, t, n) {
    switch (t.tag) {
      case D:
        Sb(t), t.stateNode, Vl();
        break;
      case L:
        jy(t);
        break;
      case T: {
        var a = t.type;
        Wa(a) && lc(t);
        break;
      }
      case U:
        Fp(t, t.stateNode.containerInfo);
        break;
      case Y: {
        var r = t.memoizedProps.value, i = t.type._context;
        Ny(t, i, r);
        break;
      }
      case W:
        {
          var l = Wn(n, t.childLanes);
          l && (t.flags |= et);
          {
            var s = t.stateNode;
            s.effectDuration = 0, s.passiveEffectDuration = 0;
          }
        }
        break;
      case ne: {
        var u = t.memoizedState;
        if (u !== null) {
          if (u.dehydrated !== null)
            return Zr(t, Pl(wa.current)), t.flags |= tt, null;
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
      case re: {
        var x = (e.flags & tt) !== je, M = Wn(n, t.childLanes);
        if (x) {
          if (M)
            return Tb(e, t, n);
          t.flags |= tt;
        }
        var k = t.memoizedState;
        if (k !== null && (k.rendering = null, k.tail = null, k.lastEffect = null), Zr(t, wa.current), M)
          break;
        return null;
      }
      case oe:
      case j:
        return t.lanes = G, yb(e, t, n);
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
        Ma = !0;
      else {
        var i = Im(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & tt) === je)
          return Ma = !1, PT(e, t, n);
        (e.flags & Kf) !== je ? Ma = !0 : Ma = !1;
      }
    } else if (Ma = !1, ln() && fD(t)) {
      var l = t.index, s = dD();
      ry(t, s, l);
    }
    switch (t.lanes = G, t.tag) {
      case A:
        return ST(e, t, t.type, n);
      case Le: {
        var u = t.elementType;
        return bT(e, t, u, n);
      }
      case R: {
        var v = t.type, h = t.pendingProps, C = t.elementType === v ? h : Oa(v, h);
        return km(e, t, v, C, n);
      }
      case T: {
        var x = t.type, M = t.pendingProps, k = t.elementType === x ? M : Oa(x, M);
        return Nb(e, t, x, k, n);
      }
      case D:
        return hT(e, t, n);
      case L:
        return gT(e, t, n);
      case H:
        return yT(e, t);
      case ne:
        return xb(e, t, n);
      case U:
        return kT(e, t, n);
      case B: {
        var z = t.type, fe = t.pendingProps, xe = t.elementType === z ? fe : Oa(z, fe);
        return vb(e, t, z, xe, n);
      }
      case ue:
        return pT(e, t, n);
      case ie:
        return mT(e, t, n);
      case W:
        return vT(e, t, n);
      case Y:
        return UT(e, t, n);
      case he:
        return FT(e, t, n);
      case ee: {
        var be = t.type, Ke = t.pendingProps, Ie = Oa(be, Ke);
        if (t.type !== t.elementType) {
          var w = be.propTypes;
          w && Da(
            w,
            Ie,
            // Resolved for outer only
            "prop",
            Ze(be)
          );
        }
        return Ie = Oa(be.type, Ie), hb(e, t, be, Ie, n);
      }
      case q:
        return gb(e, t, t.type, t.pendingProps, n);
      case I: {
        var P = t.type, _ = t.pendingProps, Z = t.elementType === P ? _ : Oa(P, _);
        return NT(e, t, P, Z, n);
      }
      case re:
        return Tb(e, t, n);
      case Re:
        break;
      case oe:
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
  var Mb, Ym, Ab, Lb;
  Mb = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === L || r.tag === H)
        sC(e, r.stateNode);
      else if (r.tag !== U) {
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
  }, Ab = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, s = zp(), u = cC(l, n, i, a, r, s);
      t.updateQueue = u, u && ql(t);
    }
  }, Lb = function(e, t, n, a) {
    n !== a && ql(t);
  };
  function Vs(e, t) {
    if (!ln())
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
  function sn(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = G, a = je;
    if (t) {
      if ((e.mode & it) !== De) {
        for (var u = e.selfBaseDuration, v = e.child; v !== null; )
          n = ze(n, ze(v.lanes, v.childLanes)), a |= v.subtreeFlags & vr, a |= v.flags & vr, u += v.treeBaseDuration, v = v.sibling;
        e.treeBaseDuration = u;
      } else
        for (var h = e.child; h !== null; )
          n = ze(n, ze(h.lanes, h.childLanes)), a |= h.subtreeFlags & vr, a |= h.flags & vr, h.return = e, h = h.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & it) !== De) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, l = e.child; l !== null; )
          n = ze(n, ze(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, r += l.actualDuration, i += l.treeBaseDuration, l = l.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var s = e.child; s !== null; )
          n = ze(n, ze(s.lanes, s.childLanes)), a |= s.subtreeFlags, a |= s.flags, s.return = e, s = s.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function HT(e, t, n) {
    if (CD() && (t.mode & Ge) !== De && (t.flags & tt) === je)
      return fy(t), Vl(), t.flags |= pr | Eu | _n, !1;
    var a = fc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (xD(t), sn(t), (t.mode & it) !== De) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Vl(), (t.flags & tt) === je && (t.memoizedState = null), t.flags |= et, sn(t), (t.mode & it) !== De) {
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
      case A:
      case Le:
      case q:
      case R:
      case B:
      case ue:
      case ie:
      case W:
      case he:
      case ee:
        return sn(t), null;
      case T: {
        var r = t.type;
        return Wa(r) && ic(t), sn(t), null;
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
            (t.flags & pr) !== je) && (t.flags |= ml, dy());
          }
        }
        return Ym(e, t), sn(t), null;
      }
      case L: {
        Pp(t);
        var u = Ty(), v = t.type;
        if (e !== null && t.stateNode != null)
          Ab(e, t, v, a, u), e.ref !== t.ref && Ob(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return sn(t), null;
          }
          var h = zp(), C = fc(t);
          if (C)
            SD(t, u, h) && ql(t);
          else {
            var x = oC(v, a, u, h, t);
            Mb(x, t, !1, !1), t.stateNode = x, uC(x, v, a, u) && ql(t);
          }
          t.ref !== null && Ob(t);
        }
        return sn(t), null;
      }
      case H: {
        var M = a;
        if (e && t.stateNode != null) {
          var k = e.memoizedProps;
          Lb(e, t, k, M);
        } else {
          if (typeof M != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var z = Ty(), fe = zp(), xe = fc(t);
          xe ? ED(t) && ql(t) : t.stateNode = fC(M, z, fe, t);
        }
        return sn(t), null;
      }
      case ne: {
        Hl(t);
        var be = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var Ke = HT(e, t, be);
          if (!Ke)
            return t.flags & _n ? t : null;
        }
        if ((t.flags & tt) !== je)
          return t.lanes = n, (t.mode & it) !== De && vm(t), t;
        var Ie = be !== null, w = e !== null && e.memoizedState !== null;
        if (Ie !== w && Ie) {
          var P = t.child;
          if (P.flags |= Ci, (t.mode & Ge) !== De) {
            var _ = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            _ || Hp(wa.current, _y) ? Bj() : uv();
          }
        }
        var Z = t.updateQueue;
        if (Z !== null && (t.flags |= et), sn(t), (t.mode & it) !== De && Ie) {
          var ve = t.child;
          ve !== null && (t.treeBaseDuration -= ve.treeBaseDuration);
        }
        return null;
      }
      case U:
        return zl(t), Ym(e, t), e === null && rD(t.stateNode.containerInfo), sn(t), null;
      case Y:
        var de = t.type._context;
        return Op(de, t), sn(t), null;
      case I: {
        var we = t.type;
        return Wa(we) && ic(t), sn(t), null;
      }
      case re: {
        Hl(t);
        var ke = t.memoizedState;
        if (ke === null)
          return sn(t), null;
        var ot = (t.flags & tt) !== je, Xe = ke.rendering;
        if (Xe === null)
          if (ot)
            Vs(ke, !1);
          else {
            var wt = Ij() && (e === null || (e.flags & tt) === je);
            if (!wt)
              for (var Je = t.child; Je !== null; ) {
                var Tt = Tc(Je);
                if (Tt !== null) {
                  ot = !0, t.flags |= tt, Vs(ke, !1);
                  var Sn = Tt.updateQueue;
                  return Sn !== null && (t.updateQueue = Sn, t.flags |= et), t.subtreeFlags = je, MD(t, n), Zr(t, Bp(wa.current, Es)), t.child;
                }
                Je = Je.sibling;
              }
            ke.tail !== null && Jt() > nN() && (t.flags |= tt, ot = !0, Vs(ke, !1), t.lanes = Lh);
          }
        else {
          if (!ot) {
            var pn = Tc(Xe);
            if (pn !== null) {
              t.flags |= tt, ot = !0;
              var ea = pn.updateQueue;
              if (ea !== null && (t.updateQueue = ea, t.flags |= et), Vs(ke, !0), ke.tail === null && ke.tailMode === "hidden" && !Xe.alternate && !ln())
                return sn(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            Jt() * 2 - ke.renderingStartTime > nN() && n !== Gn && (t.flags |= tt, ot = !0, Vs(ke, !1), t.lanes = Lh);
          }
          if (ke.isBackwards)
            Xe.sibling = t.child, t.child = Xe;
          else {
            var Ln = ke.last;
            Ln !== null ? Ln.sibling = Xe : t.child = Xe, ke.last = Xe;
          }
        }
        if (ke.tail !== null) {
          var Vn = ke.tail;
          ke.rendering = Vn, ke.tail = Vn.sibling, ke.renderingStartTime = Jt(), Vn.sibling = null;
          var En = wa.current;
          return ot ? En = Bp(En, Es) : En = Pl(En), Zr(t, En), Vn;
        }
        return sn(t), null;
      }
      case Re:
        break;
      case oe:
      case j: {
        sv(t);
        var _r = t.memoizedState, eo = _r !== null;
        if (e !== null) {
          var Xs = e.memoizedState, nr = Xs !== null;
          nr !== eo && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Qe && (t.flags |= Ci);
        }
        return !eo || (t.mode & Ge) === De ? sn(t) : Wn(tr, Gn) && (sn(t), t.subtreeFlags & (At | et) && (t.flags |= Ci)), null;
      }
      case Q:
        return null;
      case te:
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
        return r & _n ? (t.flags = r & ~_n | tt, (t.mode & it) !== De && vm(t), t) : null;
      }
      case D: {
        t.stateNode, zl(t), pp(t), Ip();
        var i = t.flags;
        return (i & _n) !== je && (i & tt) === je ? (t.flags = i & ~_n | tt, t) : null;
      }
      case L:
        return Pp(t), null;
      case ne: {
        Hl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Vl();
        }
        var s = t.flags;
        return s & _n ? (t.flags = s & ~_n | tt, (t.mode & it) !== De && vm(t), t) : null;
      }
      case re:
        return Hl(t), null;
      case U:
        return zl(t), null;
      case Y:
        var u = t.type._context;
        return Op(u, t), null;
      case oe:
      case j:
        return sv(t), null;
      case Q:
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
      case L: {
        Pp(t);
        break;
      }
      case U:
        zl(t);
        break;
      case ne:
        Hl(t);
        break;
      case re:
        Hl(t);
        break;
      case Y:
        var r = t.type._context;
        Op(r, t);
        break;
      case oe:
      case j:
        sv(t);
        break;
    }
  }
  var Ub = null;
  Ub = /* @__PURE__ */ new Set();
  var Xc = !1, un = !1, $T = typeof WeakSet == "function" ? WeakSet : Set, ge = null, Gl = null, Wl = null;
  function IT(e) {
    qf(null, function() {
      throw e;
    }), Gf();
  }
  var YT = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & it)
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
      ni(Ht, e);
    } catch (n) {
      ut(e, t, n);
    }
  }
  function qm(e, t, n) {
    try {
      YT(e, n);
    } catch (a) {
      ut(e, t, a);
    }
  }
  function qT(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      ut(e, t, a);
    }
  }
  function zb(e, t) {
    try {
      Hb(e);
    } catch (n) {
      ut(e, t, n);
    }
  }
  function Kl(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function") {
        var a;
        try {
          if (nn && ha && e.mode & it)
            try {
              Za(), a = n(null);
            } finally {
              Ja(e);
            }
          else
            a = n(null);
        } catch (r) {
          ut(e, t, r);
        }
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ue(e));
      } else
        n.current = null;
  }
  function Jc(e, t, n) {
    try {
      n();
    } catch (a) {
      ut(e, t, a);
    }
  }
  var Pb = !1;
  function GT(e, t) {
    iC(e.containerInfo), ge = t, WT();
    var n = Pb;
    return Pb = !1, n;
  }
  function WT() {
    for (; ge !== null; ) {
      var e = ge, t = e.child;
      (e.subtreeFlags & Zf) !== je && t !== null ? (t.return = e, ge = t) : KT();
    }
  }
  function KT() {
    for (; ge !== null; ) {
      var e = ge;
      gt(e);
      try {
        QT(e);
      } catch (n) {
        ut(e, e.return, n);
      }
      Xt();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, ge = t;
        return;
      }
      ge = e.return;
    }
  }
  function QT(e) {
    var t = e.alternate, n = e.flags;
    if ((n & ml) !== je) {
      switch (gt(e), e.tag) {
        case R:
        case B:
        case q:
          break;
        case T: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !Yi && (i.props !== e.memoizedProps && f("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ue(e) || "instance"), i.state !== e.memoizedState && f("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ue(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : Oa(e.type, a), r);
            {
              var s = Ub;
              l === void 0 && !s.has(e.type) && (s.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Ue(e)));
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
        case L:
        case H:
        case U:
        case I:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      Xt();
    }
  }
  function Aa(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, l = i;
      do {
        if ((l.tag & e) === e) {
          var s = l.destroy;
          l.destroy = void 0, s !== void 0 && ((e & on) !== Bn ? fx(t) : (e & Ht) !== Bn && wh(t), (e & Ka) !== Bn && Ws(!0), Jc(t, n, s), (e & Ka) !== Bn && Ws(!1), (e & on) !== Bn ? dx() : (e & Ht) !== Bn && _h());
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
          (e & on) !== Bn ? ux(t) : (e & Ht) !== Bn && px(t);
          var l = i.create;
          (e & Ka) !== Bn && Ws(!0), i.destroy = l(), (e & Ka) !== Bn && Ws(!1), (e & on) !== Bn ? cx() : (e & Ht) !== Bn && mx();
          {
            var s = i.destroy;
            if (s !== void 0 && typeof s != "function") {
              var u = void 0;
              (i.tag & Ht) !== je ? u = "useLayoutEffect" : (i.tag & Ka) !== je ? u = "useInsertionEffect" : u = "useEffect";
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
    if ((t.flags & et) !== je)
      switch (t.tag) {
        case W: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = nb(), s = t.alternate === null ? "mount" : "update";
          tb() && (s = "nested-update"), typeof i == "function" && i(r, s, n, l);
          var u = t.return;
          e: for (; u !== null; ) {
            switch (u.tag) {
              case D:
                var v = u.stateNode;
                v.passiveEffectDuration += n;
                break e;
              case W:
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
    if ((n.flags & _o) !== je)
      switch (n.tag) {
        case R:
        case B:
        case q: {
          if (!un)
            if (n.mode & it)
              try {
                Za(), ni(Ht | Pt, n);
              } finally {
                Ja(n);
              }
            else
              ni(Ht | Pt, n);
          break;
        }
        case T: {
          var r = n.stateNode;
          if (n.flags & et && !un)
            if (t === null)
              if (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ue(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ue(n) || "instance")), n.mode & it)
                try {
                  Za(), r.componentDidMount();
                } finally {
                  Ja(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : Oa(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ue(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ue(n) || "instance")), n.mode & it)
                try {
                  Za(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Ja(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var s = n.updateQueue;
          s !== null && (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ue(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ue(n) || "instance")), Dy(n, s, r));
          break;
        }
        case D: {
          var u = n.updateQueue;
          if (u !== null) {
            var v = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case L:
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
        case L: {
          var h = n.stateNode;
          if (t === null && n.flags & et) {
            var C = n.type, x = n.memoizedProps;
            hC(h, C, x);
          }
          break;
        }
        case H:
          break;
        case U:
          break;
        case W: {
          {
            var M = n.memoizedProps, k = M.onCommit, z = M.onRender, fe = n.stateNode.effectDuration, xe = nb(), be = t === null ? "mount" : "update";
            tb() && (be = "nested-update"), typeof z == "function" && z(n.memoizedProps.id, be, n.actualDuration, n.treeBaseDuration, n.actualStartTime, xe);
            {
              typeof k == "function" && k(n.memoizedProps.id, be, fe, xe), Kj(n);
              var Ke = n.return;
              e: for (; Ke !== null; ) {
                switch (Ke.tag) {
                  case D:
                    var Ie = Ke.stateNode;
                    Ie.effectDuration += fe;
                    break e;
                  case W:
                    var w = Ke.stateNode;
                    w.effectDuration += fe;
                    break e;
                }
                Ke = Ke.return;
              }
            }
          }
          break;
        }
        case ne: {
          lj(e, n);
          break;
        }
        case re:
        case I:
        case Re:
        case oe:
        case j:
        case te:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    un || n.flags & Ri && Hb(n);
  }
  function ZT(e) {
    switch (e.tag) {
      case R:
      case B:
      case q: {
        if (e.mode & it)
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
      case L: {
        zb(e, e.return);
        break;
      }
    }
  }
  function ej(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === L) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? DC(r) : jC(a.stateNode, a.memoizedProps);
          } catch (l) {
            ut(e, e.return, l);
          }
        }
      } else if (a.tag === H) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? TC(i) : wC(i, a.memoizedProps);
          } catch (l) {
            ut(e, e.return, l);
          }
      } else if (!((a.tag === oe || a.tag === j) && a.memoizedState !== null && a !== e)) {
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
        case L:
          a = n;
          break;
        default:
          a = n;
      }
      if (typeof t == "function") {
        var r;
        if (e.mode & it)
          try {
            Za(), r = t(a);
          } finally {
            Ja(e);
          }
        else
          r = t(a);
        typeof r == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ue(e));
      } else
        t.hasOwnProperty("current") || f("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Ue(e)), t.current = a;
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
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === L) {
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
    return e.tag === L || e.tag === D || e.tag === U;
  }
  function Ib(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || $b(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== L && t.tag !== H && t.tag !== X; ) {
        if (t.flags & At || t.child === null || t.tag === U)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & At))
        return t.stateNode;
    }
  }
  function aj(e) {
    var t = nj(e);
    switch (t.tag) {
      case L: {
        var n = t.stateNode;
        t.flags & wo && (qg(n), t.flags &= ~wo);
        var a = Ib(e);
        Wm(e, a, n);
        break;
      }
      case D:
      case U: {
        var r = t.stateNode.containerInfo, i = Ib(e);
        Gm(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Gm(e, t, n) {
    var a = e.tag, r = a === L || a === H;
    if (r) {
      var i = e.stateNode;
      t ? EC(n, i, t) : NC(n, i);
    } else if (a !== U) {
      var l = e.child;
      if (l !== null) {
        Gm(l, t, n);
        for (var s = l.sibling; s !== null; )
          Gm(s, t, n), s = s.sibling;
      }
    }
  }
  function Wm(e, t, n) {
    var a = e.tag, r = a === L || a === H;
    if (r) {
      var i = e.stateNode;
      t ? SC(n, i, t) : bC(n, i);
    } else if (a !== U) {
      var l = e.child;
      if (l !== null) {
        Wm(l, t, n);
        for (var s = l.sibling; s !== null; )
          Wm(s, t, n), s = s.sibling;
      }
    }
  }
  var cn = null, La = !1;
  function rj(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case L: {
            cn = a.stateNode, La = !1;
            break e;
          }
          case D: {
            cn = a.stateNode.containerInfo, La = !0;
            break e;
          }
          case U: {
            cn = a.stateNode.containerInfo, La = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (cn === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      Yb(e, t, n), cn = null, La = !1;
    }
    tj(n);
  }
  function ai(e, t, n) {
    for (var a = n.child; a !== null; )
      Yb(e, t, a), a = a.sibling;
  }
  function Yb(e, t, n) {
    switch (ix(n), n.tag) {
      case L:
        un || Kl(n, t);
      case H: {
        {
          var a = cn, r = La;
          cn = null, ai(e, t, n), cn = a, La = r, cn !== null && (La ? RC(cn, n.stateNode) : xC(cn, n.stateNode));
        }
        return;
      }
      case X: {
        cn !== null && (La ? CC(cn, n.stateNode) : ip(cn, n.stateNode));
        return;
      }
      case U: {
        {
          var i = cn, l = La;
          cn = n.stateNode.containerInfo, La = !0, ai(e, t, n), cn = i, La = l;
        }
        return;
      }
      case R:
      case B:
      case ee:
      case q: {
        if (!un) {
          var s = n.updateQueue;
          if (s !== null) {
            var u = s.lastEffect;
            if (u !== null) {
              var v = u.next, h = v;
              do {
                var C = h, x = C.destroy, M = C.tag;
                x !== void 0 && ((M & Ka) !== Bn ? Jc(n, t, x) : (M & Ht) !== Bn && (wh(n), n.mode & it ? (Za(), Jc(n, t, x), Ja(n)) : Jc(n, t, x), _h())), h = h.next;
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
          var k = n.stateNode;
          typeof k.componentWillUnmount == "function" && qm(n, t, k);
        }
        ai(e, t, n);
        return;
      }
      case Re: {
        ai(e, t, n);
        return;
      }
      case oe: {
        if (
          // TODO: Remove this dead flag
          n.mode & Ge
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
        var r = nw.bind(null, e, a);
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
    Gl = n, Wl = e, gt(t), Gb(t, e), gt(t), Gl = null, Wl = null;
  }
  function Va(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          rj(e, t, i);
        } catch (u) {
          ut(i, t, u);
        }
      }
    var l = fu();
    if (t.subtreeFlags & ed)
      for (var s = t.child; s !== null; )
        gt(s), Gb(s, e), s = s.sibling;
    gt(l);
  }
  function Gb(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case R:
      case B:
      case ee:
      case q: {
        if (Va(t, e), er(e), r & et) {
          try {
            Aa(Ka | Pt, e, e.return), ni(Ka | Pt, e);
          } catch (we) {
            ut(e, e.return, we);
          }
          if (e.mode & it) {
            try {
              Za(), Aa(Ht | Pt, e, e.return);
            } catch (we) {
              ut(e, e.return, we);
            }
            Ja(e);
          } else
            try {
              Aa(Ht | Pt, e, e.return);
            } catch (we) {
              ut(e, e.return, we);
            }
        }
        return;
      }
      case T: {
        Va(t, e), er(e), r & Ri && a !== null && Kl(a, a.return);
        return;
      }
      case L: {
        Va(t, e), er(e), r & Ri && a !== null && Kl(a, a.return);
        {
          if (e.flags & wo) {
            var i = e.stateNode;
            try {
              qg(i);
            } catch (we) {
              ut(e, e.return, we);
            }
          }
          if (r & et) {
            var l = e.stateNode;
            if (l != null) {
              var s = e.memoizedProps, u = a !== null ? a.memoizedProps : s, v = e.type, h = e.updateQueue;
              if (e.updateQueue = null, h !== null)
                try {
                  gC(l, h, v, u, s, e);
                } catch (we) {
                  ut(e, e.return, we);
                }
            }
          }
        }
        return;
      }
      case H: {
        if (Va(t, e), er(e), r & et) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var C = e.stateNode, x = e.memoizedProps, M = a !== null ? a.memoizedProps : x;
          try {
            yC(C, M, x);
          } catch (we) {
            ut(e, e.return, we);
          }
        }
        return;
      }
      case D: {
        if (Va(t, e), er(e), r & et && a !== null) {
          var k = a.memoizedState;
          if (k.isDehydrated)
            try {
              $C(t.containerInfo);
            } catch (we) {
              ut(e, e.return, we);
            }
        }
        return;
      }
      case U: {
        Va(t, e), er(e);
        return;
      }
      case ne: {
        Va(t, e), er(e);
        var z = e.child;
        if (z.flags & Ci) {
          var fe = z.stateNode, xe = z.memoizedState, be = xe !== null;
          if (fe.isHidden = be, be) {
            var Ke = z.alternate !== null && z.alternate.memoizedState !== null;
            Ke || Hj();
          }
        }
        if (r & et) {
          try {
            ij(e);
          } catch (we) {
            ut(e, e.return, we);
          }
          qb(e);
        }
        return;
      }
      case oe: {
        var Ie = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Ge
        ) {
          var w = un;
          un = w || Ie, Va(t, e), un = w;
        } else
          Va(t, e);
        if (er(e), r & Ci) {
          var P = e.stateNode, _ = e.memoizedState, Z = _ !== null, ve = e;
          if (P.isHidden = Z, Z && !Ie && (ve.mode & Ge) !== De) {
            ge = ve;
            for (var de = ve.child; de !== null; )
              ge = de, uj(de), de = de.sibling;
          }
          ej(ve, Z);
        }
        return;
      }
      case re: {
        Va(t, e), er(e), r & et && qb(e);
        return;
      }
      case Re:
        return;
      default: {
        Va(t, e), er(e);
        return;
      }
    }
  }
  function er(e) {
    var t = e.flags;
    if (t & At) {
      try {
        aj(e);
      } catch (n) {
        ut(e, e.return, n);
      }
      e.flags &= ~At;
    }
    t & mr && (e.flags &= ~mr);
  }
  function sj(e, t, n) {
    Gl = n, Wl = t, ge = e, Wb(e, t, n), Gl = null, Wl = null;
  }
  function Wb(e, t, n) {
    for (var a = (e.mode & Ge) !== De; ge !== null; ) {
      var r = ge, i = r.child;
      if (r.tag === oe && a) {
        var l = r.memoizedState !== null, s = l || Xc;
        if (s) {
          Km(e, t, n);
          continue;
        } else {
          var u = r.alternate, v = u !== null && u.memoizedState !== null, h = v || un, C = Xc, x = un;
          Xc = s, un = h, un && !x && (ge = r, cj(r));
          for (var M = i; M !== null; )
            ge = M, Wb(
              M,
              // New root; bubble back up to here and stop.
              t,
              n
            ), M = M.sibling;
          ge = r, Xc = C, un = x, Km(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & _o) !== je && i !== null ? (i.return = r, ge = i) : Km(e, t, n);
    }
  }
  function Km(e, t, n) {
    for (; ge !== null; ) {
      var a = ge;
      if ((a.flags & _o) !== je) {
        var r = a.alternate;
        gt(a);
        try {
          JT(t, r, a, n);
        } catch (l) {
          ut(a, a.return, l);
        }
        Xt();
      }
      if (a === e) {
        ge = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, ge = i;
        return;
      }
      ge = a.return;
    }
  }
  function uj(e) {
    for (; ge !== null; ) {
      var t = ge, n = t.child;
      switch (t.tag) {
        case R:
        case B:
        case ee:
        case q: {
          if (t.mode & it)
            try {
              Za(), Aa(Ht, t, t.return);
            } finally {
              Ja(t);
            }
          else
            Aa(Ht, t, t.return);
          break;
        }
        case T: {
          Kl(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && qm(t, t.return, a);
          break;
        }
        case L: {
          Kl(t, t.return);
          break;
        }
        case oe: {
          var r = t.memoizedState !== null;
          if (r) {
            Kb(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, ge = n) : Kb(e);
    }
  }
  function Kb(e) {
    for (; ge !== null; ) {
      var t = ge;
      if (t === e) {
        ge = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, ge = n;
        return;
      }
      ge = t.return;
    }
  }
  function cj(e) {
    for (; ge !== null; ) {
      var t = ge, n = t.child;
      if (t.tag === oe) {
        var a = t.memoizedState !== null;
        if (a) {
          Qb(e);
          continue;
        }
      }
      n !== null ? (n.return = t, ge = n) : Qb(e);
    }
  }
  function Qb(e) {
    for (; ge !== null; ) {
      var t = ge;
      gt(t);
      try {
        ZT(t);
      } catch (a) {
        ut(t, t.return, a);
      }
      if (Xt(), t === e) {
        ge = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, ge = n;
        return;
      }
      ge = t.return;
    }
  }
  function fj(e, t, n, a) {
    ge = t, dj(t, e, n, a);
  }
  function dj(e, t, n, a) {
    for (; ge !== null; ) {
      var r = ge, i = r.child;
      (r.subtreeFlags & vl) !== je && i !== null ? (i.return = r, ge = i) : pj(e, t, n, a);
    }
  }
  function pj(e, t, n, a) {
    for (; ge !== null; ) {
      var r = ge;
      if ((r.flags & Fr) !== je) {
        gt(r);
        try {
          mj(t, r, n, a);
        } catch (l) {
          ut(r, r.return, l);
        }
        Xt();
      }
      if (r === e) {
        ge = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, ge = i;
        return;
      }
      ge = r.return;
    }
  }
  function mj(e, t, n, a) {
    switch (t.tag) {
      case R:
      case B:
      case q: {
        if (t.mode & it) {
          mm();
          try {
            ni(on | Pt, t);
          } finally {
            pm(t);
          }
        } else
          ni(on | Pt, t);
        break;
      }
    }
  }
  function vj(e) {
    ge = e, hj();
  }
  function hj() {
    for (; ge !== null; ) {
      var e = ge, t = e.child;
      if ((ge.flags & xi) !== je) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            ge = r, bj(r, e);
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
          ge = e;
        }
      }
      (e.subtreeFlags & vl) !== je && t !== null ? (t.return = e, ge = t) : gj();
    }
  }
  function gj() {
    for (; ge !== null; ) {
      var e = ge;
      (e.flags & Fr) !== je && (gt(e), yj(e), Xt());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, ge = t;
        return;
      }
      ge = e.return;
    }
  }
  function yj(e) {
    switch (e.tag) {
      case R:
      case B:
      case q: {
        e.mode & it ? (mm(), Aa(on | Pt, e, e.return), pm(e)) : Aa(on | Pt, e, e.return);
        break;
      }
    }
  }
  function bj(e, t) {
    for (; ge !== null; ) {
      var n = ge;
      gt(n), Sj(n, t), Xt();
      var a = n.child;
      a !== null ? (a.return = n, ge = a) : Nj(e);
    }
  }
  function Nj(e) {
    for (; ge !== null; ) {
      var t = ge, n = t.sibling, a = t.return;
      if (Bb(t), t === e) {
        ge = null;
        return;
      }
      if (n !== null) {
        n.return = a, ge = n;
        return;
      }
      ge = a;
    }
  }
  function Sj(e, t) {
    switch (e.tag) {
      case R:
      case B:
      case q: {
        e.mode & it ? (mm(), Aa(on, e, t), pm(e)) : Aa(on, e, t);
        break;
      }
    }
  }
  function Ej(e) {
    switch (e.tag) {
      case R:
      case B:
      case q: {
        try {
          ni(Ht | Pt, e);
        } catch (n) {
          ut(e, e.return, n);
        }
        break;
      }
      case T: {
        var t = e.stateNode;
        try {
          t.componentDidMount();
        } catch (n) {
          ut(e, e.return, n);
        }
        break;
      }
    }
  }
  function xj(e) {
    switch (e.tag) {
      case R:
      case B:
      case q: {
        try {
          ni(on | Pt, e);
        } catch (t) {
          ut(e, e.return, t);
        }
        break;
      }
    }
  }
  function Rj(e) {
    switch (e.tag) {
      case R:
      case B:
      case q: {
        try {
          Aa(Ht | Pt, e, e.return);
        } catch (n) {
          ut(e, e.return, n);
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
      case B:
      case q:
        try {
          Aa(on | Pt, e, e.return);
        } catch (t) {
          ut(e, e.return, t);
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
  var _j = Math.ceil, Qm = m.ReactCurrentDispatcher, Xm = m.ReactCurrentOwner, fn = m.ReactCurrentBatchConfig, ka = m.ReactCurrentActQueue, It = (
    /*             */
    0
  ), Jb = (
    /*               */
    1
  ), dn = (
    /*                */
    2
  ), da = (
    /*                */
    4
  ), Dr = 0, Us = 1, qi = 2, Zc = 3, Fs = 4, Zb = 5, Jm = 6, We = It, Mn = null, Et = null, Yt = G, tr = G, Zm = Gr(G), qt = Dr, zs = null, ef = G, Ps = G, tf = G, Hs = null, $n = null, ev = 0, eN = 500, tN = 1 / 0, Oj = 500, Tr = null;
  function Bs() {
    tN = Jt() + Oj;
  }
  function nN() {
    return tN;
  }
  var nf = !1, tv = null, Ql = null, Gi = !1, ri = null, $s = G, nv = [], av = null, Mj = 50, Is = 0, rv = null, iv = !1, af = !1, Aj = 50, Xl = 0, rf = null, Ys = dt, lf = G, aN = !1;
  function of() {
    return Mn;
  }
  function An() {
    return (We & (dn | da)) !== It ? Jt() : (Ys !== dt || (Ys = Jt()), Ys);
  }
  function ii(e) {
    var t = e.mode;
    if ((t & Ge) === De)
      return Me;
    if ((We & dn) !== It && Yt !== G)
      return Uo(Yt);
    var n = jD() !== TD;
    if (n) {
      if (fn.transition !== null) {
        var a = fn.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return lf === en && (lf = Fh()), lf;
    }
    var r = Ca();
    if (r !== en)
      return r;
    var i = dC();
    return i;
  }
  function Lj(e) {
    var t = e.mode;
    return (t & Ge) === De ? Me : kx();
  }
  function Gt(e, t, n, a) {
    rw(), aN && f("useInsertionEffect must not schedule updates."), iv && (af = !0), Fo(e, n, a), (We & dn) !== G && e === Mn ? ow(t) : (Ra && Hh(e, t, n), sw(t), e === Mn && ((We & dn) === It && (Ps = ze(Ps, n)), qt === Fs && li(e, Yt)), In(e, a), n === Me && We === It && (t.mode & Ge) === De && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !ka.isBatchingLegacy && (Bs(), ay()));
  }
  function Vj(e, t, n) {
    var a = e.current;
    a.lanes = t, Fo(e, t, n), In(e, n);
  }
  function kj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (We & dn) !== It
    );
  }
  function In(e, t) {
    var n = e.callbackNode;
    _x(e, t);
    var a = Tu(e, e === Mn ? Yt : G);
    if (a === G) {
      n !== null && bN(n), e.callbackNode = null, e.callbackPriority = en;
      return;
    }
    var r = Oi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(ka.current !== null && n !== dv)) {
      n == null && i !== Me && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && bN(n);
    var l;
    if (r === Me)
      e.tag === Wr ? (ka.isBatchingLegacy !== null && (ka.didScheduleLegacyUpdate = !0), cD(lN.bind(null, e))) : ny(lN.bind(null, e)), ka.current !== null ? ka.current.push(Kr) : mC(function() {
        (We & (dn | da)) === It && Kr();
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
    if (eT(), Ys = dt, lf = G, (We & (dn | da)) !== It)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = wr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Tu(e, e === Mn ? Yt : G);
    if (r === G)
      return null;
    var i = !ju(e, r) && !Vx(e, r) && !t, l = i ? qj(e, r) : uf(e, r);
    if (l !== Dr) {
      if (l === qi) {
        var s = Rd(e);
        s !== G && (r = s, l = lv(e, s));
      }
      if (l === Us) {
        var u = zs;
        throw Wi(e, G), li(e, r), In(e, Jt()), u;
      }
      if (l === Jm)
        li(e, r);
      else {
        var v = !ju(e, r), h = e.current.alternate;
        if (v && !Fj(h)) {
          if (l = uf(e, r), l === qi) {
            var C = Rd(e);
            C !== G && (r = C, l = lv(e, C));
          }
          if (l === Us) {
            var x = zs;
            throw Wi(e, G), li(e, r), In(e, Jt()), x;
          }
        }
        e.finishedWork = h, e.finishedLanes = r, Uj(e, l, r);
      }
    }
    return In(e, Jt()), e.callbackNode === n ? rN.bind(null, e) : null;
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
          var a = ev + eN - Jt();
          if (a > 10) {
            var r = Tu(e, G);
            if (r !== G)
              break;
            var i = e.suspendedLanes;
            if (!Sl(i, n)) {
              An(), Ph(e, i);
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
          var l = jx(e, n), s = l, u = Jt() - s, v = aw(u) - u;
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
    if (tT(), (We & (dn | da)) !== It)
      throw new Error("Should not already be working.");
    wr();
    var t = Tu(e, G);
    if (!Wn(t, Me))
      return In(e, Jt()), null;
    var n = uf(e, t);
    if (e.tag !== Wr && n === qi) {
      var a = Rd(e);
      a !== G && (t = a, n = lv(e, a));
    }
    if (n === Us) {
      var r = zs;
      throw Wi(e, G), li(e, t), In(e, Jt()), r;
    }
    if (n === Jm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Ki(e, $n, Tr), In(e, Jt()), null;
  }
  function zj(e, t) {
    t !== G && (jd(e, ze(t, Me)), In(e, Jt()), (We & (dn | da)) === It && (Bs(), Kr()));
  }
  function ov(e, t) {
    var n = We;
    We |= Jb;
    try {
      return e(t);
    } finally {
      We = n, We === It && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !ka.isBatchingLegacy && (Bs(), ay());
    }
  }
  function Pj(e, t, n, a, r) {
    var i = Ca(), l = fn.transition;
    try {
      return fn.transition = null, tn(Kn), e(t, n, a, r);
    } finally {
      tn(i), fn.transition = l, We === It && Bs();
    }
  }
  function jr(e) {
    ri !== null && ri.tag === Wr && (We & (dn | da)) === It && wr();
    var t = We;
    We |= Jb;
    var n = fn.transition, a = Ca();
    try {
      return fn.transition = null, tn(Kn), e ? e() : void 0;
    } finally {
      tn(a), fn.transition = n, We = t, (We & (dn | da)) === It && Kr();
    }
  }
  function oN() {
    return (We & (dn | da)) !== It;
  }
  function sf(e, t) {
    bn(Zm, tr, e), tr = ze(tr, t);
  }
  function sv(e) {
    tr = Zm.current, yn(Zm, e);
  }
  function Wi(e, t) {
    e.finishedWork = null, e.finishedLanes = G;
    var n = e.timeoutHandle;
    if (n !== rp && (e.timeoutHandle = rp, pC(n)), Et !== null)
      for (var a = Et.return; a !== null; ) {
        var r = a.alternate;
        kb(r, a), a = a.return;
      }
    Mn = e;
    var i = Qi(e.current, null);
    return Et = i, Yt = tr = t, qt = Dr, zs = null, ef = G, Ps = G, tf = G, Hs = null, $n = null, VD(), ja.discardPendingWarnings(), i;
  }
  function sN(e, t) {
    do {
      var n = Et;
      try {
        if (gc(), My(), Xt(), Xm.current = null, n === null || n.return === null) {
          qt = Us, zs = t, Et = null;
          return;
        }
        if (nn && n.mode & it && qc(n, !0), Yn)
          if (gl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            hx(n, a, Yt);
          } else
            vx(n, t, Yt);
        cT(e, n.return, n, t, Yt), dN(n);
      } catch (r) {
        t = r, Et === n && n !== null ? (n = n.return, Et = n) : n = Et;
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
    ev = Jt();
  }
  function qs(e) {
    ef = ze(e, ef);
  }
  function Bj() {
    qt === Dr && (qt = Zc);
  }
  function uv() {
    (qt === Dr || qt === Zc || qt === qi) && (qt = Fs), Mn !== null && (Cd(ef) || Cd(Ps)) && li(Mn, Yt);
  }
  function $j(e) {
    qt !== Fs && (qt = qi), Hs === null ? Hs = [e] : Hs.push(e);
  }
  function Ij() {
    return qt === Dr;
  }
  function uf(e, t) {
    var n = We;
    We |= dn;
    var a = uN();
    if (Mn !== e || Yt !== t) {
      if (Ra) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, Yt), r.clear()), Bh(e, t);
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
    if (gc(), We = n, cN(a), Et !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Mh(), Mn = null, Yt = G, qt;
  }
  function Yj() {
    for (; Et !== null; )
      fN(Et);
  }
  function qj(e, t) {
    var n = We;
    We |= dn;
    var a = uN();
    if (Mn !== e || Yt !== t) {
      if (Ra) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, Yt), r.clear()), Bh(e, t);
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
    return gc(), cN(a), We = n, Et !== null ? (Sx(), Dr) : (Mh(), Mn = null, Yt = G, qt);
  }
  function Gj() {
    for (; Et !== null && !KE(); )
      fN(Et);
  }
  function fN(e) {
    var t = e.alternate;
    gt(e);
    var n;
    (e.mode & it) !== De ? (dm(e), n = cv(t, e, tr), qc(e, !0)) : n = cv(t, e, tr), Xt(), e.memoizedProps = e.pendingProps, n === null ? dN(e) : Et = n, Xm.current = null;
  }
  function dN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & Eu) === je) {
        gt(t);
        var r = void 0;
        if ((t.mode & it) === De ? r = Vb(n, t, tr) : (dm(t), r = Vb(n, t, tr), qc(t, !1)), Xt(), r !== null) {
          Et = r;
          return;
        }
      } else {
        var i = BT(n, t);
        if (i !== null) {
          i.flags &= $E, Et = i;
          return;
        }
        if ((t.mode & it) !== De) {
          qc(t, !1);
          for (var l = t.actualDuration, s = t.child; s !== null; )
            l += s.actualDuration, s = s.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= Eu, a.subtreeFlags = je, a.deletions = null;
        else {
          qt = Jm, Et = null;
          return;
        }
      }
      var u = t.sibling;
      if (u !== null) {
        Et = u;
        return;
      }
      t = a, Et = t;
    } while (t !== null);
    qt === Dr && (qt = Zb);
  }
  function Ki(e, t, n) {
    var a = Ca(), r = fn.transition;
    try {
      fn.transition = null, tn(Kn), Wj(e, t, n, a);
    } finally {
      fn.transition = r, tn(a);
    }
    return null;
  }
  function Wj(e, t, n, a) {
    do
      wr();
    while (ri !== null);
    if (iw(), (We & (dn | da)) !== It)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (sx(i), r === null)
      return jh(), null;
    if (i === G && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = G, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = en;
    var l = ze(r.lanes, r.childLanes);
    zx(e, l), e === Mn && (Mn = null, Et = null, Yt = G), ((r.subtreeFlags & vl) !== je || (r.flags & vl) !== je) && (Gi || (Gi = !0, av = n, pv(ji, function() {
      return wr(), null;
    })));
    var s = (r.subtreeFlags & (Zf | ed | _o | vl)) !== je, u = (r.flags & (Zf | ed | _o | vl)) !== je;
    if (s || u) {
      var v = fn.transition;
      fn.transition = null;
      var h = Ca();
      tn(Kn);
      var C = We;
      We |= da, Xm.current = null, GT(e, r), ab(), oj(e, r, i), lC(e.containerInfo), e.current = r, gx(i), sj(r, e, i), yx(), QE(), We = C, tn(h), fn.transition = v;
    } else
      e.current = r, ab();
    var x = Gi;
    if (Gi ? (Gi = !1, ri = e, $s = i) : (Xl = 0, rf = null), l = e.pendingLanes, l === G && (Ql = null), x || hN(e.current, !1), ax(r.stateNode, a), Ra && e.memoizedUpdaters.clear(), Tj(), In(e, Jt()), t !== null)
      for (var M = e.onRecoverableError, k = 0; k < t.length; k++) {
        var z = t[k], fe = z.stack, xe = z.digest;
        M(z.value, {
          componentStack: fe,
          digest: xe
        });
      }
    if (nf) {
      nf = !1;
      var be = tv;
      throw tv = null, be;
    }
    return Wn($s, Me) && e.tag !== Wr && wr(), l = e.pendingLanes, Wn(l, Me) ? (ZD(), e === rv ? Is++ : (Is = 0, rv = e)) : Is = 0, Kr(), jh(), null;
  }
  function wr() {
    if (ri !== null) {
      var e = Ih($s), t = $x(yr, e), n = fn.transition, a = Ca();
      try {
        return fn.transition = null, tn(t), Qj();
      } finally {
        tn(a), fn.transition = n;
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
    if (ri = null, $s = G, (We & (dn | da)) !== It)
      throw new Error("Cannot flush passive effects while already rendering.");
    iv = !0, af = !1, bx(n);
    var a = We;
    We |= da, vj(t.current), fj(t, t.current, n, e);
    {
      var r = nv;
      nv = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        XT(t, l);
      }
    }
    Nx(), hN(t.current, !0), We = a, Kr(), af ? t === rf ? Xl++ : (Xl = 0, rf = t) : Xl = 0, iv = !1, af = !1, rx(t);
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
    var a = Ii(n, t), r = fb(e, a, Me), i = Xr(e, r, Me), l = An();
    i !== null && (Fo(i, Me, l), In(i, l));
  }
  function ut(e, t, n) {
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
          var l = Ii(n, e), s = _m(a, l, Me), u = Xr(a, s, Me), v = An();
          u !== null && (Fo(u, Me, v), In(u, v));
          return;
        }
      }
      a = a.return;
    }
    f(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function ew(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = An();
    Ph(e, n), uw(e), Mn === e && Sl(Yt, n) && (qt === Fs || qt === Zc && kh(Yt) && Jt() - ev < eN ? Wi(e, G) : tf = ze(tf, n)), In(e, r);
  }
  function vN(e, t) {
    t === en && (t = Lj(e));
    var n = An(), a = Hn(e, t);
    a !== null && (Fo(a, t, n), In(a, n));
  }
  function tw(e) {
    var t = e.memoizedState, n = en;
    t !== null && (n = t.retryLane), vN(e, n);
  }
  function nw(e, t) {
    var n = en, a;
    switch (e.tag) {
      case ne:
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
    a !== null && a.delete(t), vN(e, n);
  }
  function aw(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : _j(e / 1960) * 1960;
  }
  function rw() {
    if (Is > Mj)
      throw Is = 0, rv = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Xl > Aj && (Xl = 0, rf = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function iw() {
    ja.flushLegacyContextWarning(), ja.flushPendingUnsafeLifecycleWarnings();
  }
  function hN(e, t) {
    gt(e), cf(e, zr, Rj), t && cf(e, Jf, Cj), cf(e, zr, Ej), t && cf(e, Jf, xj), Xt();
  }
  function cf(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== je ? a = a.child : ((a.flags & t) !== je && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var ff = null;
  function gN(e) {
    {
      if ((We & dn) !== It || !(e.mode & Ge))
        return;
      var t = e.tag;
      if (t !== A && t !== D && t !== T && t !== R && t !== B && t !== ee && t !== q)
        return;
      var n = Ue(e) || "ReactComponent";
      if (ff !== null) {
        if (ff.has(n))
          return;
        ff.add(n);
      } else
        ff = /* @__PURE__ */ new Set([n]);
      var a = Tn;
      try {
        gt(e), f("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? gt(e) : Xt();
      }
    }
  }
  var cv;
  {
    var lw = null;
    cv = function(e, t, n) {
      var a = CN(lw, t);
      try {
        return _b(e, t, n);
      } catch (i) {
        if (yD() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (gc(), My(), kb(e, t), CN(t, a), t.mode & it && dm(t), qf(null, _b, null, e, t, n), PE()) {
          var r = Gf();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var yN = !1, fv;
  fv = /* @__PURE__ */ new Set();
  function ow(e) {
    if (bi && !QD())
      switch (e.tag) {
        case R:
        case B:
        case q: {
          var t = Et && Ue(Et) || "Unknown", n = t;
          if (!fv.has(n)) {
            fv.add(n);
            var a = Ue(e) || "Unknown";
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
      return WE(e);
  }
  function NN() {
    return ka.current !== null;
  }
  function sw(e) {
    {
      if (e.mode & Ge) {
        if (!Xb())
          return;
      } else if (!wj() || We !== It || e.tag !== R && e.tag !== B && e.tag !== q)
        return;
      if (ka.current === null) {
        var t = Tn;
        try {
          gt(e), f(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Ue(e));
        } finally {
          t ? gt(e) : Xt();
        }
      }
    }
  }
  function uw(e) {
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
  var pa = null, Jl = null, cw = function(e) {
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
  function SN(e, t) {
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
          (typeof a == "function" || i === Ce) && (r = !0);
          break;
        }
        case B: {
          (i === Ee || i === Ce) && (r = !0);
          break;
        }
        case ee:
        case q: {
          (i === Fe || i === Ce) && (r = !0);
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
  function EN(e) {
    {
      if (pa === null || typeof WeakSet != "function")
        return;
      Jl === null && (Jl = /* @__PURE__ */ new WeakSet()), Jl.add(e);
    }
  }
  var fw = function(e, t) {
    {
      if (pa === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      wr(), jr(function() {
        hv(e.current, a, n);
      });
    }
  }, dw = function(e, t) {
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
        case q:
        case T:
          u = s;
          break;
        case B:
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
        var x = Hn(e, Me);
        x !== null && Gt(x, e, Me, dt);
      }
      r !== null && !h && hv(r, t, n), i !== null && hv(i, t, n);
    }
  }
  var pw = function(e, t) {
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
        case q:
        case T:
          s = l;
          break;
        case B:
          s = l.render;
          break;
      }
      var u = !1;
      s !== null && t.has(s) && (u = !0), u ? mw(e, n) : a !== null && gv(a, t, n), r !== null && gv(r, t, n);
    }
  }
  function mw(e, t) {
    {
      var n = vw(e, t);
      if (n)
        return;
      for (var a = e; ; ) {
        switch (a.tag) {
          case L:
            t.add(a.stateNode);
            return;
          case U:
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
  function vw(e, t) {
    for (var n = e, a = !1; ; ) {
      if (n.tag === L)
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
  function hw(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = je, this.subtreeFlags = je, this.deletions = null, this.lanes = G, this.childLanes = G, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !yv && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var Zn = function(e, t, n, a) {
    return new hw(e, t, n, a);
  };
  function bv(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function gw(e) {
    return typeof e == "function" && !bv(e) && e.defaultProps === void 0;
  }
  function yw(e) {
    if (typeof e == "function")
      return bv(e) ? T : R;
    if (e != null) {
      var t = e.$$typeof;
      if (t === Ee)
        return B;
      if (t === Fe)
        return ee;
    }
    return A;
  }
  function Qi(e, t) {
    var n = e.alternate;
    n === null ? (n = Zn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = je, n.subtreeFlags = je, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & vr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case A:
      case R:
      case q:
        n.type = Zl(e.type);
        break;
      case T:
        n.type = mv(e.type);
        break;
      case B:
        n.type = vv(e.type);
        break;
    }
    return n;
  }
  function bw(e, t) {
    e.flags &= vr | At;
    var n = e.alternate;
    if (n === null)
      e.childLanes = G, e.lanes = t, e.child = null, e.subtreeFlags = je, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
    else {
      e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = je, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type;
      var a = n.dependencies;
      e.dependencies = a === null ? null : {
        lanes: a.lanes,
        firstContext: a.firstContext
      }, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration;
    }
    return e;
  }
  function Nw(e, t, n) {
    var a;
    return e === oc ? (a = Ge, t === !0 && (a |= Dt, a |= Ya)) : a = De, Ra && (a |= it), Zn(D, null, null, a);
  }
  function Nv(e, t, n, a, r, i) {
    var l = A, s = e;
    if (typeof e == "function")
      bv(e) ? (l = T, s = mv(s)) : s = Zl(s);
    else if (typeof e == "string")
      l = L;
    else
      e: switch (e) {
        case Ha:
          return oi(n.children, r, i, t);
        case pi:
          l = ie, r |= Dt, (r & Ge) !== De && (r |= Ya);
          break;
        case N:
          return Sw(n, r, i, t);
        case Ye:
          return Ew(n, r, i, t);
        case Oe:
          return xw(n, r, i, t);
        case vt:
          return RN(n, r, i, t);
        case hn:
        case Ft:
        case Ba:
        case Sa:
        case mt:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case K:
                l = Y;
                break e;
              case ce:
                l = he;
                break e;
              case Ee:
                l = B, s = vv(s);
                break e;
              case Fe:
                l = ee;
                break e;
              case Ce:
                l = Le, s = null;
                break e;
            }
          var u = "";
          {
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var v = a ? Ue(a) : null;
            v && (u += `

Check the render method of \`` + v + "`.");
          }
          throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + u));
        }
      }
    var h = Zn(l, n, t, r);
    return h.elementType = e, h.type = s, h.lanes = i, h._debugOwner = a, h;
  }
  function Sv(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, s = Nv(r, i, l, a, t, n);
    return s._debugSource = e._source, s._debugOwner = e._owner, s;
  }
  function oi(e, t, n, a) {
    var r = Zn(ue, e, a, t);
    return r.lanes = n, r;
  }
  function Sw(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Zn(W, e, a, t | it);
    return r.elementType = N, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function Ew(e, t, n, a) {
    var r = Zn(ne, e, a, t);
    return r.elementType = Ye, r.lanes = n, r;
  }
  function xw(e, t, n, a) {
    var r = Zn(re, e, a, t);
    return r.elementType = Oe, r.lanes = n, r;
  }
  function RN(e, t, n, a) {
    var r = Zn(oe, e, a, t);
    r.elementType = vt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function Ev(e, t, n) {
    var a = Zn(H, e, null, t);
    return a.lanes = n, a;
  }
  function Rw() {
    var e = Zn(L, null, null, De);
    return e.elementType = "DELETED", e;
  }
  function Cw(e) {
    var t = Zn(X, null, null, De);
    return t.stateNode = e, t;
  }
  function xv(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Zn(U, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function CN(e, t) {
    return e === null && (e = Zn(A, null, null, De)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function Dw(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = rp, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = en, this.eventTimes = Td(G), this.expirationTimes = Td(dt), this.pendingLanes = G, this.suspendedLanes = G, this.pingedLanes = G, this.expiredLanes = G, this.mutableReadLanes = G, this.finishedLanes = G, this.entangledLanes = G, this.entanglements = Td(G), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
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
    var h = new Dw(e, t, n, s, u), C = Nw(t, i);
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
  function Tw(e, t, n) {
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
  function jw(e, t) {
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
      if (r.mode & Dt) {
        var i = Ue(n) || "Component";
        if (!Dv[i]) {
          Dv[i] = !0;
          var l = Tn;
          try {
            gt(r), n.mode & Dt ? f("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : f("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            l ? gt(l) : Xt();
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
    var x = C.current, M = An(), k = ii(x), z = Rr(M, k);
    return z.callback = t ?? null, Xr(x, z, k), Vj(C, k, M), C;
  }
  function Ks(e, t, n, a) {
    nx(t, e);
    var r = t.current, i = An(), l = ii(r);
    Ex(l);
    var s = TN(n);
    t.context === null ? t.context = s : t.pendingContext = s, bi && Tn !== null && !Cv && (Cv = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Ue(Tn) || "Unknown"));
    var u = Rr(i, l);
    u.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), u.callback = a);
    var v = Xr(r, u, l);
    return v !== null && (Gt(v, r, l, i), Ec(v, r, l)), l;
  }
  function df(e) {
    var t = e.current;
    if (!t.child)
      return null;
    switch (t.child.tag) {
      case L:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function ww(e) {
    switch (e.tag) {
      case D: {
        var t = e.stateNode;
        if (Ou(t)) {
          var n = Ox(t);
          zj(t, n);
        }
        break;
      }
      case ne: {
        jr(function() {
          var r = Hn(e, Me);
          if (r !== null) {
            var i = An();
            Gt(r, e, Me, i);
          }
        });
        var a = Me;
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
  function _w(e) {
    if (e.tag === ne) {
      var t = Lo, n = Hn(e, t);
      if (n !== null) {
        var a = An();
        Gt(n, e, t, a);
      }
      Tv(e, t);
    }
  }
  function Ow(e) {
    if (e.tag === ne) {
      var t = ii(e), n = Hn(e, t);
      if (n !== null) {
        var a = An();
        Gt(n, e, t, a);
      }
      Tv(e, t);
    }
  }
  function ON(e) {
    var t = GE(e);
    return t === null ? null : t.stateNode;
  }
  var MN = function(e) {
    return null;
  };
  function Mw(e) {
    return MN(e);
  }
  var AN = function(e) {
    return !1;
  };
  function Aw(e) {
    return AN(e);
  }
  var LN = null, VN = null, kN = null, UN = null, FN = null, zN = null, PN = null, HN = null, BN = null;
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
        E("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            E("copyWithRename() expects paths to be the same except for the deepest key");
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
    }, jv = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    LN = function(e, t, n, a) {
      var r = jv(e, t);
      if (r !== null) {
        var i = WN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Be({}, e.memoizedProps);
        var l = Hn(e, Me);
        l !== null && Gt(l, e, Me, dt);
      }
    }, VN = function(e, t, n) {
      var a = jv(e, t);
      if (a !== null) {
        var r = IN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = Be({}, e.memoizedProps);
        var i = Hn(e, Me);
        i !== null && Gt(i, e, Me, dt);
      }
    }, kN = function(e, t, n, a) {
      var r = jv(e, t);
      if (r !== null) {
        var i = qN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Be({}, e.memoizedProps);
        var l = Hn(e, Me);
        l !== null && Gt(l, e, Me, dt);
      }
    }, UN = function(e, t, n) {
      e.pendingProps = WN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Hn(e, Me);
      a !== null && Gt(a, e, Me, dt);
    }, FN = function(e, t) {
      e.pendingProps = IN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Hn(e, Me);
      n !== null && Gt(n, e, Me, dt);
    }, zN = function(e, t, n) {
      e.pendingProps = qN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Hn(e, Me);
      a !== null && Gt(a, e, Me, dt);
    }, PN = function(e) {
      var t = Hn(e, Me);
      t !== null && Gt(t, e, Me, dt);
    }, HN = function(e) {
      MN = e;
    }, BN = function(e) {
      AN = e;
    };
  }
  function Lw(e) {
    var t = Rh(e);
    return t === null ? null : t.stateNode;
  }
  function Vw(e) {
    return null;
  }
  function kw() {
    return Tn;
  }
  function Uw(e) {
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
      setErrorHandler: HN,
      setSuspenseHandler: BN,
      scheduleUpdate: PN,
      currentDispatcherRef: n,
      findHostInstanceByFiber: Lw,
      findFiberByHostInstance: t || Vw,
      // React Refresh
      findHostInstancesForRefresh: pw,
      scheduleRefresh: fw,
      scheduleRoot: dw,
      setRefreshHandler: cw,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: kw,
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
      if (n.nodeType !== Mt) {
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
  function Fw(e, t) {
    if (!mf(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    QN(e);
    var n = !1, a = !1, r = "", i = KN;
    t != null && (t.hydrate ? E("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ia && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = jN(e, oc, null, n, a, r, i);
    ec(l.current, e);
    var s = e.nodeType === Mt ? e.parentNode : e;
    return ts(s), new wv(l);
  }
  function pf(e) {
    this._internalRoot = e;
  }
  function zw(e) {
    e && eR(e);
  }
  pf.prototype.unstable_scheduleHydration = zw;
  function Pw(e, t, n) {
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
    return !!(e && (e.nodeType === zn || e.nodeType === dr || e.nodeType === Vf));
  }
  function Qs(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === dr || e.nodeType === Vf || e.nodeType === Mt && e.nodeValue === " react-mount-point-unstable "));
  }
  function QN(e) {
    e.nodeType === zn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), ds(e) && (e._reactRootContainer ? f("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : f("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var Hw = m.ReactCurrentOwner, XN;
  XN = function(e) {
    if (e._reactRootContainer && e.nodeType !== Mt) {
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
  function Bw(e, t, n, a, r) {
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
      var s = e.nodeType === Mt ? e.parentNode : e;
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
      var C = e.nodeType === Mt ? e.parentNode : e;
      return ts(C), jr(function() {
        Ks(t, h, n, a);
      }), h;
    }
  }
  function $w(e, t) {
    e !== null && typeof e != "function" && f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function vf(e, t, n, a, r) {
    XN(n), $w(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = Bw(n, t, e, r, a);
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
  function Iw(e) {
    {
      ZN || (ZN = !0, f("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = Hw.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ze(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === zn ? e : jw(e, "findDOMNode");
  }
  function Yw(e, t, n) {
    if (f("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = ds(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return vf(null, e, t, !0, n);
  }
  function qw(e, t, n) {
    if (f("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = ds(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return vf(null, e, t, !1, n);
  }
  function Gw(e, t, n, a) {
    if (f("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !HE(e))
      throw new Error("parentComponent must be a valid React Component");
    return vf(e, t, n, !1, a);
  }
  var eS = !1;
  function Ww(e) {
    if (eS || (eS = !0, f("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Qs(e))
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
  Ix(ww), qx(_w), Gx(Ow), Wx(Ca), Kx(Hx), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), _E(Q0), AE(ov, Pj, jr);
  function Kw(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!mf(t))
      throw new Error("Target container is not a DOM element.");
    return Tw(e, t, null, n);
  }
  function Qw(e, t, n, a) {
    return Gw(e, t, n, a);
  }
  var Ov = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [qr, _l, tc, fh, dh, ov]
  };
  function Xw(e, t) {
    return Ov.usingClientEntryPoint || f('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), Fw(e, t);
  }
  function Jw(e, t, n) {
    return Ov.usingClientEntryPoint || f('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), Pw(e, t, n);
  }
  function Zw(e) {
    return oN() && f("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), jr(e);
  }
  var e1 = Uw({
    findFiberByHostInstance: Vi,
    bundleType: 1,
    version: Rv,
    rendererPackageName: "react-dom"
  });
  if (!e1 && jt && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var tS = window.location.protocol;
    /^(https?|file):$/.test(tS) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (tS === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  ta.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ov, ta.createPortal = Kw, ta.createRoot = Xw, ta.findDOMNode = Iw, ta.flushSync = Zw, ta.hydrate = Yw, ta.hydrateRoot = Jw, ta.render = qw, ta.unmountComponentAtNode = Ww, ta.unstable_batchedUpdates = ov, ta.unstable_renderSubtreeIntoContainer = Qw, ta.version = Rv, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
bS.exports = ta;
var u1 = bS.exports, ES, nS = u1;
{
  var aS = nS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  ES = function(o, p) {
    aS.usingClientEntryPoint = !0;
    try {
      return nS.createRoot(o, p);
    } finally {
      aS.usingClientEntryPoint = !1;
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
const rS = "popstate";
function c1(o) {
  o === void 0 && (o = {});
  function p(g, y) {
    let {
      pathname: E,
      search: f,
      hash: O
    } = g.location;
    return Vv(
      "",
      {
        pathname: E,
        search: f,
        hash: O
      },
      // state defaults to `null` because `window.history.state` does
      y.state && y.state.usr || null,
      y.state && y.state.key || "default"
    );
  }
  function m(g, y) {
    return typeof y == "string" ? y : Zs(y);
  }
  return d1(p, m, null, o);
}
function bt(o, p) {
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
function f1() {
  return Math.random().toString(36).substr(2, 8);
}
function iS(o, p) {
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
    key: p && p.key || g || f1()
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
function d1(o, p, m, g) {
  g === void 0 && (g = {});
  let {
    window: y = document.defaultView,
    v5Compat: E = !1
  } = g, f = y.history, O = si.Pop, R = null, T = A();
  T == null && (T = 0, f.replaceState(Js({}, f.state, {
    idx: T
  }), ""));
  function A() {
    return (f.state || {
      idx: null
    }).idx;
  }
  function D() {
    O = si.Pop;
    let ie = A(), he = ie == null ? null : ie - T;
    T = ie, R && R({
      action: O,
      location: ue.location,
      delta: he
    });
  }
  function U(ie, he) {
    O = si.Push;
    let Y = Vv(ue.location, ie, he);
    T = A() + 1;
    let B = iS(Y, T), W = ue.createHref(Y);
    try {
      f.pushState(B, "", W);
    } catch (ne) {
      if (ne instanceof DOMException && ne.name === "DataCloneError")
        throw ne;
      y.location.assign(W);
    }
    E && R && R({
      action: O,
      location: ue.location,
      delta: 1
    });
  }
  function L(ie, he) {
    O = si.Replace;
    let Y = Vv(ue.location, ie, he);
    T = A();
    let B = iS(Y, T), W = ue.createHref(Y);
    f.replaceState(B, "", W), E && R && R({
      action: O,
      location: ue.location,
      delta: 0
    });
  }
  function H(ie) {
    let he = y.location.origin !== "null" ? y.location.origin : y.location.href, Y = typeof ie == "string" ? ie : Zs(ie);
    return Y = Y.replace(/ $/, "%20"), bt(he, "No window.location.(origin|href) available to create URL for href: " + Y), new URL(Y, he);
  }
  let ue = {
    get action() {
      return O;
    },
    get location() {
      return o(y, f);
    },
    listen(ie) {
      if (R)
        throw new Error("A history only accepts one active listener");
      return y.addEventListener(rS, D), R = ie, () => {
        y.removeEventListener(rS, D), R = null;
      };
    },
    createHref(ie) {
      return p(y, ie);
    },
    createURL: H,
    encodeLocation(ie) {
      let he = H(ie);
      return {
        pathname: he.pathname,
        search: he.search,
        hash: he.hash
      };
    },
    push: U,
    replace: L,
    go(ie) {
      return f.go(ie);
    }
  };
  return ue;
}
var lS;
(function(o) {
  o.data = "data", o.deferred = "deferred", o.redirect = "redirect", o.error = "error";
})(lS || (lS = {}));
function p1(o, p, m) {
  return m === void 0 && (m = "/"), m1(o, p, m);
}
function m1(o, p, m, g) {
  let y = typeof p == "string" ? ao(p) : p, E = ci(y.pathname || "/", m);
  if (E == null)
    return null;
  let f = xS(o);
  v1(f);
  let O = null;
  for (let R = 0; O == null && R < f.length; ++R) {
    let T = D1(E);
    O = R1(f[R], T);
  }
  return O;
}
function xS(o, p, m, g) {
  p === void 0 && (p = []), m === void 0 && (m = []), g === void 0 && (g = "");
  let y = (E, f, O) => {
    let R = {
      relativePath: O === void 0 ? E.path || "" : O,
      caseSensitive: E.caseSensitive === !0,
      childrenIndex: f,
      route: E
    };
    R.relativePath.startsWith("/") && (bt(R.relativePath.startsWith(g), 'Absolute route path "' + R.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), R.relativePath = R.relativePath.slice(g.length));
    let T = Mr([g, R.relativePath]), A = m.concat(R);
    E.children && E.children.length > 0 && (bt(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      E.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + T + '".')
    ), xS(E.children, p, A, T)), !(E.path == null && !E.index) && p.push({
      path: T,
      score: E1(T, E.index),
      routesMeta: A
    });
  };
  return o.forEach((E, f) => {
    var O;
    if (E.path === "" || !((O = E.path) != null && O.includes("?")))
      y(E, f);
    else
      for (let R of RS(E.path))
        y(E, f, R);
  }), p;
}
function RS(o) {
  let p = o.split("/");
  if (p.length === 0) return [];
  let [m, ...g] = p, y = m.endsWith("?"), E = m.replace(/\?$/, "");
  if (g.length === 0)
    return y ? [E, ""] : [E];
  let f = RS(g.join("/")), O = [];
  return O.push(...f.map((R) => R === "" ? E : [E, R].join("/"))), y && O.push(...f), O.map((R) => o.startsWith("/") && R === "" ? "/" : R);
}
function v1(o) {
  o.sort((p, m) => p.score !== m.score ? m.score - p.score : x1(p.routesMeta.map((g) => g.childrenIndex), m.routesMeta.map((g) => g.childrenIndex)));
}
const h1 = /^:[\w-]+$/, g1 = 3, y1 = 2, b1 = 1, N1 = 10, S1 = -2, oS = (o) => o === "*";
function E1(o, p) {
  let m = o.split("/"), g = m.length;
  return m.some(oS) && (g += S1), p && (g += y1), m.filter((y) => !oS(y)).reduce((y, E) => y + (h1.test(E) ? g1 : E === "" ? b1 : N1), g);
}
function x1(o, p) {
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
function R1(o, p, m) {
  let {
    routesMeta: g
  } = o, y = {}, E = "/", f = [];
  for (let O = 0; O < g.length; ++O) {
    let R = g[O], T = O === g.length - 1, A = E === "/" ? p : p.slice(E.length) || "/", D = kv({
      path: R.relativePath,
      caseSensitive: R.caseSensitive,
      end: T
    }, A), U = R.route;
    if (!D)
      return null;
    Object.assign(y, D.params), f.push({
      // TODO: Can this as be avoided?
      params: y,
      pathname: Mr([E, D.pathname]),
      pathnameBase: _1(Mr([E, D.pathnameBase])),
      route: U
    }), D.pathnameBase !== "/" && (E = Mr([E, D.pathnameBase]));
  }
  return f;
}
function kv(o, p) {
  typeof o == "string" && (o = {
    path: o,
    caseSensitive: !1,
    end: !0
  });
  let [m, g] = C1(o.path, o.caseSensitive, o.end), y = p.match(m);
  if (!y) return null;
  let E = y[0], f = E.replace(/(.)\/+$/, "$1"), O = y.slice(1);
  return {
    params: g.reduce((T, A, D) => {
      let {
        paramName: U,
        isOptional: L
      } = A;
      if (U === "*") {
        let ue = O[D] || "";
        f = E.slice(0, E.length - ue.length).replace(/(.)\/+$/, "$1");
      }
      const H = O[D];
      return L && !H ? T[U] = void 0 : T[U] = (H || "").replace(/%2F/g, "/"), T;
    }, {}),
    pathname: E,
    pathnameBase: f,
    pattern: o
  };
}
function C1(o, p, m) {
  p === void 0 && (p = !1), m === void 0 && (m = !0), Ua(o === "*" || !o.endsWith("*") || o.endsWith("/*"), 'Route path "' + o + '" will be treated as if it were ' + ('"' + o.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + o.replace(/\*$/, "/*") + '".'));
  let g = [], y = "^" + o.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, O, R) => (g.push({
    paramName: O,
    isOptional: R != null
  }), R ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return o.endsWith("*") ? (g.push({
    paramName: "*"
  }), y += o === "*" || o === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : m ? y += "\\/*$" : o !== "" && o !== "/" && (y += "(?:(?=\\/|$))"), [new RegExp(y, p ? void 0 : "i"), g];
}
function D1(o) {
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
function T1(o, p) {
  p === void 0 && (p = "/");
  let {
    pathname: m,
    search: g = "",
    hash: y = ""
  } = typeof o == "string" ? ao(o) : o;
  return {
    pathname: m ? m.startsWith("/") ? m : j1(m, p) : p,
    search: O1(g),
    hash: M1(y)
  };
}
function j1(o, p) {
  let m = p.replace(/\/+$/, "").split("/");
  return o.split("/").forEach((y) => {
    y === ".." ? m.length > 1 && m.pop() : y !== "." && m.push(y);
  }), m.length > 1 ? m.join("/") : "/";
}
function Mv(o, p, m, g) {
  return "Cannot include a '" + o + "' character in a manually specified " + ("`to." + p + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + m + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function w1(o) {
  return o.filter((p, m) => m === 0 || p.route.path && p.route.path.length > 0);
}
function Pv(o, p) {
  let m = w1(o);
  return p ? m.map((g, y) => y === m.length - 1 ? g.pathname : g.pathnameBase) : m.map((g) => g.pathnameBase);
}
function Hv(o, p, m, g) {
  g === void 0 && (g = !1);
  let y;
  typeof o == "string" ? y = ao(o) : (y = Js({}, o), bt(!y.pathname || !y.pathname.includes("?"), Mv("?", "pathname", "search", y)), bt(!y.pathname || !y.pathname.includes("#"), Mv("#", "pathname", "hash", y)), bt(!y.search || !y.search.includes("#"), Mv("#", "search", "hash", y)));
  let E = o === "" || y.pathname === "", f = E ? "/" : y.pathname, O;
  if (f == null)
    O = m;
  else {
    let D = p.length - 1;
    if (!g && f.startsWith("..")) {
      let U = f.split("/");
      for (; U[0] === ".."; )
        U.shift(), D -= 1;
      y.pathname = U.join("/");
    }
    O = D >= 0 ? p[D] : "/";
  }
  let R = T1(y, O), T = f && f !== "/" && f.endsWith("/"), A = (E || f === ".") && m.endsWith("/");
  return !R.pathname.endsWith("/") && (T || A) && (R.pathname += "/"), R;
}
const Mr = (o) => o.join("/").replace(/\/\/+/g, "/"), _1 = (o) => o.replace(/\/+$/, "").replace(/^\/*/, "/"), O1 = (o) => !o || o === "?" ? "" : o.startsWith("?") ? o : "?" + o, M1 = (o) => !o || o === "#" ? "" : o.startsWith("#") ? o : "#" + o;
function A1(o) {
  return o != null && typeof o.status == "number" && typeof o.statusText == "string" && typeof o.internal == "boolean" && "data" in o;
}
const CS = ["post", "put", "patch", "delete"];
new Set(CS);
const L1 = ["get", ...CS];
new Set(L1);
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
const nu = /* @__PURE__ */ S.createContext(null);
nu.displayName = "DataRouter";
const Bv = /* @__PURE__ */ S.createContext(null);
Bv.displayName = "DataRouterState";
const V1 = /* @__PURE__ */ S.createContext(null);
V1.displayName = "Await";
const va = /* @__PURE__ */ S.createContext(null);
va.displayName = "Navigation";
const au = /* @__PURE__ */ S.createContext(null);
au.displayName = "Location";
const za = /* @__PURE__ */ S.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
za.displayName = "Route";
const $v = /* @__PURE__ */ S.createContext(null);
$v.displayName = "RouteError";
function k1(o, p) {
  let {
    relative: m
  } = p === void 0 ? {} : p;
  ro() || bt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename: g,
    navigator: y
  } = S.useContext(va), {
    hash: E,
    pathname: f,
    search: O
  } = ru(o, {
    relative: m
  }), R = f;
  return g !== "/" && (R = f === "/" ? g : Mr([g, f])), y.createHref({
    pathname: R,
    search: O,
    hash: E
  });
}
function ro() {
  return S.useContext(au) != null;
}
function Xi() {
  return ro() || bt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), S.useContext(au).location;
}
const DS = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function TS(o) {
  S.useContext(va).static || S.useLayoutEffect(o);
}
function Iv() {
  let {
    isDataRoute: o
  } = S.useContext(za);
  return o ? X1() : U1();
}
function U1() {
  ro() || bt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let o = S.useContext(nu), {
    basename: p,
    future: m,
    navigator: g
  } = S.useContext(va), {
    matches: y
  } = S.useContext(za), {
    pathname: E
  } = Xi(), f = JSON.stringify(Pv(y, m.v7_relativeSplatPath)), O = S.useRef(!1);
  return TS(() => {
    O.current = !0;
  }), S.useCallback(function(T, A) {
    if (A === void 0 && (A = {}), Ua(O.current, DS), !O.current) return;
    if (typeof T == "number") {
      g.go(T);
      return;
    }
    let D = Hv(T, JSON.parse(f), E, A.relative === "path");
    o == null && p !== "/" && (D.pathname = D.pathname === "/" ? p : Mr([p, D.pathname])), (A.replace ? g.replace : g.push)(D, A.state, A);
  }, [p, g, f, E, o]);
}
function F1() {
  let {
    matches: o
  } = S.useContext(za), p = o[o.length - 1];
  return p ? p.params : {};
}
function ru(o, p) {
  let {
    relative: m
  } = p === void 0 ? {} : p, {
    future: g
  } = S.useContext(va), {
    matches: y
  } = S.useContext(za), {
    pathname: E
  } = Xi(), f = JSON.stringify(Pv(y, g.v7_relativeSplatPath));
  return S.useMemo(() => Hv(o, JSON.parse(f), E, m === "path"), [o, f, E, m]);
}
function z1(o, p) {
  return P1(o, p);
}
function P1(o, p, m, g) {
  ro() || bt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: y
  } = S.useContext(va), {
    matches: E
  } = S.useContext(za), f = E[E.length - 1], O = f ? f.params : {}, R = f ? f.pathname : "/", T = f ? f.pathnameBase : "/", A = f && f.route;
  {
    let Y = A && A.path || "";
    wS(R, !A || Y.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + R + '" (under <Route path="' + Y + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + Y + '"> to <Route ') + ('path="' + (Y === "/" ? "*" : Y + "/*") + '">.'));
  }
  let D = Xi(), U;
  if (p) {
    var L;
    let Y = typeof p == "string" ? ao(p) : p;
    T === "/" || (L = Y.pathname) != null && L.startsWith(T) || bt(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + T + '" ') + ('but pathname "' + Y.pathname + '" was given in the `location` prop.')), U = Y;
  } else
    U = D;
  let H = U.pathname || "/", ue = H;
  if (T !== "/") {
    let Y = T.replace(/^\//, "").split("/");
    ue = "/" + H.replace(/^\//, "").split("/").slice(Y.length).join("/");
  }
  let ie = p1(o, {
    pathname: ue
  });
  Ua(A || ie != null, 'No routes matched location "' + U.pathname + U.search + U.hash + '" '), Ua(ie == null || ie[ie.length - 1].route.element !== void 0 || ie[ie.length - 1].route.Component !== void 0 || ie[ie.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + U.pathname + U.search + U.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let he = Y1(ie && ie.map((Y) => Object.assign({}, Y, {
    params: Object.assign({}, O, Y.params),
    pathname: Mr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(Y.pathname).pathname : Y.pathname
    ]),
    pathnameBase: Y.pathnameBase === "/" ? T : Mr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(Y.pathnameBase).pathname : Y.pathnameBase
    ])
  })), E, m, g);
  return p && he ? /* @__PURE__ */ S.createElement(au.Provider, {
    value: {
      location: eu({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, U),
      navigationType: si.Pop
    }
  }, he) : he;
}
function H1() {
  let o = Q1(), p = A1(o) ? o.status + " " + o.statusText : o instanceof Error ? o.message : JSON.stringify(o), m = o instanceof Error ? o.stack : null, g = "rgba(200,200,200, 0.5)", y = {
    padding: "0.5rem",
    backgroundColor: g
  }, E = {
    padding: "2px 4px",
    backgroundColor: g
  }, f = null;
  return console.error("Error handled by React Router default ErrorBoundary:", o), f = /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ S.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ S.createElement("code", {
    style: E
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ S.createElement("code", {
    style: E
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ S.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, p), m ? /* @__PURE__ */ S.createElement("pre", {
    style: y
  }, m) : null, f);
}
const B1 = /* @__PURE__ */ S.createElement(H1, null);
class $1 extends S.Component {
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
    return this.state.error !== void 0 ? /* @__PURE__ */ S.createElement(za.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ S.createElement($v.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function I1(o) {
  let {
    routeContext: p,
    match: m,
    children: g
  } = o, y = S.useContext(nu);
  return y && y.static && y.staticContext && (m.route.errorElement || m.route.ErrorBoundary) && (y.staticContext._deepestRenderedBoundaryId = m.route.id), /* @__PURE__ */ S.createElement(za.Provider, {
    value: p
  }, g);
}
function Y1(o, p, m, g) {
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
  let f = o, O = (y = m) == null ? void 0 : y.errors;
  if (O != null) {
    let A = f.findIndex((D) => D.route.id && (O == null ? void 0 : O[D.route.id]) !== void 0);
    A >= 0 || bt(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(O).join(",")), f = f.slice(0, Math.min(f.length, A + 1));
  }
  let R = !1, T = -1;
  if (m && g && g.v7_partialHydration)
    for (let A = 0; A < f.length; A++) {
      let D = f[A];
      if ((D.route.HydrateFallback || D.route.hydrateFallbackElement) && (T = A), D.route.id) {
        let {
          loaderData: U,
          errors: L
        } = m, H = D.route.loader && U[D.route.id] === void 0 && (!L || L[D.route.id] === void 0);
        if (D.route.lazy || H) {
          R = !0, T >= 0 ? f = f.slice(0, T + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((A, D, U) => {
    let L, H = !1, ue = null, ie = null;
    m && (L = O && D.route.id ? O[D.route.id] : void 0, ue = D.route.errorElement || B1, R && (T < 0 && U === 0 ? (wS("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), H = !0, ie = null) : T === U && (H = !0, ie = D.route.hydrateFallbackElement || null)));
    let he = p.concat(f.slice(0, U + 1)), Y = () => {
      let B;
      return L ? B = ue : H ? B = ie : D.route.Component ? B = /* @__PURE__ */ S.createElement(D.route.Component, null) : D.route.element ? B = D.route.element : B = A, /* @__PURE__ */ S.createElement(I1, {
        match: D,
        routeContext: {
          outlet: A,
          matches: he,
          isDataRoute: m != null
        },
        children: B
      });
    };
    return m && (D.route.ErrorBoundary || D.route.errorElement || U === 0) ? /* @__PURE__ */ S.createElement($1, {
      location: m.location,
      revalidation: m.revalidation,
      component: ue,
      error: L,
      children: Y(),
      routeContext: {
        outlet: null,
        matches: he,
        isDataRoute: !0
      }
    }) : Y();
  }, null);
}
var jS = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o;
}(jS || {}), tu = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseLoaderData = "useLoaderData", o.UseActionData = "useActionData", o.UseRouteError = "useRouteError", o.UseNavigation = "useNavigation", o.UseRouteLoaderData = "useRouteLoaderData", o.UseMatches = "useMatches", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o.UseRouteId = "useRouteId", o;
}(tu || {});
function Yv(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function q1(o) {
  let p = S.useContext(nu);
  return p || bt(!1, Yv(o)), p;
}
function G1(o) {
  let p = S.useContext(Bv);
  return p || bt(!1, Yv(o)), p;
}
function W1(o) {
  let p = S.useContext(za);
  return p || bt(!1, Yv(o)), p;
}
function qv(o) {
  let p = W1(o), m = p.matches[p.matches.length - 1];
  return m.route.id || bt(!1, o + ' can only be used on routes that contain a unique "id"'), m.route.id;
}
function K1() {
  return qv(tu.UseRouteId);
}
function Q1() {
  var o;
  let p = S.useContext($v), m = G1(tu.UseRouteError), g = qv(tu.UseRouteError);
  return p !== void 0 ? p : (o = m.errors) == null ? void 0 : o[g];
}
function X1() {
  let {
    router: o
  } = q1(jS.UseNavigateStable), p = qv(tu.UseNavigateStable), m = S.useRef(!1);
  return TS(() => {
    m.current = !0;
  }), S.useCallback(function(y, E) {
    E === void 0 && (E = {}), Ua(m.current, DS), m.current && (typeof y == "number" ? o.navigate(y) : o.navigate(y, eu({
      fromRouteId: p
    }, E)));
  }, [o, p]);
}
const sS = {};
function wS(o, p, m) {
  !p && !sS[o] && (sS[o] = !0, Ua(!1, m));
}
const uS = {};
function J1(o, p) {
  uS[p] || (uS[p] = !0, console.warn(p));
}
const cS = (o, p, m) => J1(o, "⚠️ React Router Future Flag Warning: " + p + ". " + ("You can use the `" + o + "` future flag to opt-in early. ") + ("For more information, see " + m + "."));
function Z1(o, p) {
  (o == null ? void 0 : o.v7_startTransition) === void 0 && cS("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (o == null ? void 0 : o.v7_relativeSplatPath) === void 0 && cS("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function e_(o) {
  let {
    to: p,
    replace: m,
    state: g,
    relative: y
  } = o;
  ro() || bt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let {
    future: E,
    static: f
  } = S.useContext(va);
  Ua(!f, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: O
  } = S.useContext(za), {
    pathname: R
  } = Xi(), T = Iv(), A = Hv(p, Pv(O, E.v7_relativeSplatPath), R, y === "path"), D = JSON.stringify(A);
  return S.useEffect(() => T(JSON.parse(D), {
    replace: m,
    state: g,
    relative: y
  }), [T, D, y, m, g]), null;
}
function ar(o) {
  bt(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function t_(o) {
  let {
    basename: p = "/",
    children: m = null,
    location: g,
    navigationType: y = si.Pop,
    navigator: E,
    static: f = !1,
    future: O
  } = o;
  ro() && bt(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let R = p.replace(/^\/*/, "/"), T = S.useMemo(() => ({
    basename: R,
    navigator: E,
    static: f,
    future: eu({
      v7_relativeSplatPath: !1
    }, O)
  }), [R, O, E, f]);
  typeof g == "string" && (g = ao(g));
  let {
    pathname: A = "/",
    search: D = "",
    hash: U = "",
    state: L = null,
    key: H = "default"
  } = g, ue = S.useMemo(() => {
    let ie = ci(A, R);
    return ie == null ? null : {
      location: {
        pathname: ie,
        search: D,
        hash: U,
        state: L,
        key: H
      },
      navigationType: y
    };
  }, [R, A, D, U, L, H, y]);
  return Ua(ue != null, '<Router basename="' + R + '"> is not able to match the URL ' + ('"' + A + D + U + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), ue == null ? null : /* @__PURE__ */ S.createElement(va.Provider, {
    value: T
  }, /* @__PURE__ */ S.createElement(au.Provider, {
    children: m,
    value: ue
  }));
}
function n_(o) {
  let {
    children: p,
    location: m
  } = o;
  return z1(Uv(p), m);
}
new Promise(() => {
});
function Uv(o, p) {
  p === void 0 && (p = []);
  let m = [];
  return S.Children.forEach(o, (g, y) => {
    if (!/* @__PURE__ */ S.isValidElement(g))
      return;
    let E = [...p, y];
    if (g.type === S.Fragment) {
      m.push.apply(m, Uv(g.props.children, E));
      return;
    }
    g.type !== ar && bt(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || bt(!1, "An index route cannot have child routes.");
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
function Av(o) {
  return o != null && !u_.has(o) ? (Ua(!1, '"' + o + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + yf + '"')), null) : o;
}
function c_(o, p) {
  let m, g, y, E, f;
  if (r_(o)) {
    let O = o.getAttribute("action");
    g = O ? ci(O, p) : null, m = o.getAttribute("method") || gf, y = Av(o.getAttribute("enctype")) || yf, E = new FormData(o);
  } else if (a_(o) || i_(o) && (o.type === "submit" || o.type === "image")) {
    let O = o.form;
    if (O == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let R = o.getAttribute("formaction") || O.getAttribute("action");
    if (g = R ? ci(R, p) : null, m = o.getAttribute("formmethod") || O.getAttribute("method") || gf, y = Av(o.getAttribute("formenctype")) || Av(O.getAttribute("enctype")) || yf, E = new FormData(O, o), !s_()) {
      let {
        name: T,
        type: A,
        value: D
      } = o;
      if (A === "image") {
        let U = T ? T + "." : "";
        E.append(U + "x", "0"), E.append(U + "y", "0");
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
const _S = /* @__PURE__ */ S.createContext({
  isTransitioning: !1
});
_S.displayName = "ViewTransition";
const v_ = /* @__PURE__ */ S.createContext(/* @__PURE__ */ new Map());
v_.displayName = "Fetchers";
const h_ = "startTransition", fS = o1[h_];
function g_(o) {
  let {
    basename: p,
    children: m,
    future: g,
    window: y
  } = o, E = S.useRef();
  E.current == null && (E.current = c1({
    window: y,
    v5Compat: !0
  }));
  let f = E.current, [O, R] = S.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: T
  } = g || {}, A = S.useCallback((D) => {
    T && fS ? fS(() => R(D)) : R(D);
  }, [R, T]);
  return S.useLayoutEffect(() => f.listen(A), [f, A]), S.useEffect(() => Z1(g), [g]), /* @__PURE__ */ S.createElement(t_, {
    basename: p,
    children: m,
    location: O.location,
    navigationType: O.action,
    navigator: f,
    future: g
  });
}
const y_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", b_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, to = /* @__PURE__ */ S.forwardRef(function(p, m) {
  let {
    onClick: g,
    relative: y,
    reloadDocument: E,
    replace: f,
    state: O,
    target: R,
    to: T,
    preventScrollReset: A,
    viewTransition: D
  } = p, U = Gv(p, f_), {
    basename: L
  } = S.useContext(va), H, ue = !1;
  if (typeof T == "string" && b_.test(T) && (H = T, y_))
    try {
      let B = new URL(window.location.href), W = T.startsWith("//") ? new URL(B.protocol + T) : new URL(T), ne = ci(W.pathname, L);
      W.origin === B.origin && ne != null ? T = ne + W.search + W.hash : ue = !0;
    } catch {
      Ua(!1, '<Link to="' + T + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let ie = k1(T, {
    relative: y
  }), he = x_(T, {
    replace: f,
    state: O,
    target: R,
    preventScrollReset: A,
    relative: y,
    viewTransition: D
  });
  function Y(B) {
    g && g(B), B.defaultPrevented || he(B);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ S.createElement("a", no({}, U, {
      href: H || ie,
      onClick: ue || E ? g : Y,
      ref: m,
      target: R
    }))
  );
});
to.displayName = "Link";
const N_ = /* @__PURE__ */ S.forwardRef(function(p, m) {
  let {
    "aria-current": g = "page",
    caseSensitive: y = !1,
    className: E = "",
    end: f = !1,
    style: O,
    to: R,
    viewTransition: T,
    children: A
  } = p, D = Gv(p, d_), U = ru(R, {
    relative: D.relative
  }), L = Xi(), H = S.useContext(Bv), {
    navigator: ue,
    basename: ie
  } = S.useContext(va), he = H != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  w_(U) && T === !0, Y = ue.encodeLocation ? ue.encodeLocation(U).pathname : U.pathname, B = L.pathname, W = H && H.navigation && H.navigation.location ? H.navigation.location.pathname : null;
  y || (B = B.toLowerCase(), W = W ? W.toLowerCase() : null, Y = Y.toLowerCase()), W && ie && (W = ci(W, ie) || W);
  const ne = Y !== "/" && Y.endsWith("/") ? Y.length - 1 : Y.length;
  let ee = B === Y || !f && B.startsWith(Y) && B.charAt(ne) === "/", q = W != null && (W === Y || !f && W.startsWith(Y) && W.charAt(Y.length) === "/"), Le = {
    isActive: ee,
    isPending: q,
    isTransitioning: he
  }, I = ee ? g : void 0, X;
  typeof E == "function" ? X = E(Le) : X = [E, ee ? "active" : null, q ? "pending" : null, he ? "transitioning" : null].filter(Boolean).join(" ");
  let re = typeof O == "function" ? O(Le) : O;
  return /* @__PURE__ */ S.createElement(to, no({}, D, {
    "aria-current": I,
    className: X,
    ref: m,
    style: re,
    to: R,
    viewTransition: T
  }), typeof A == "function" ? A(Le) : A);
});
N_.displayName = "NavLink";
const S_ = /* @__PURE__ */ S.forwardRef((o, p) => {
  let {
    fetcherKey: m,
    navigate: g,
    reloadDocument: y,
    replace: E,
    state: f,
    method: O = gf,
    action: R,
    onSubmit: T,
    relative: A,
    preventScrollReset: D,
    viewTransition: U
  } = o, L = Gv(o, p_), H = T_(), ue = j_(R, {
    relative: A
  }), ie = O.toLowerCase() === "get" ? "get" : "post", he = (Y) => {
    if (T && T(Y), Y.defaultPrevented) return;
    Y.preventDefault();
    let B = Y.nativeEvent.submitter, W = (B == null ? void 0 : B.getAttribute("formmethod")) || O;
    H(B || Y.currentTarget, {
      fetcherKey: m,
      method: W,
      navigate: g,
      replace: E,
      state: f,
      relative: A,
      preventScrollReset: D,
      viewTransition: U
    });
  };
  return /* @__PURE__ */ S.createElement("form", no({
    ref: p,
    method: ie,
    action: ue,
    onSubmit: y ? T : he
  }, L));
});
S_.displayName = "Form";
var Nf;
(function(o) {
  o.UseScrollRestoration = "useScrollRestoration", o.UseSubmit = "useSubmit", o.UseSubmitFetcher = "useSubmitFetcher", o.UseFetcher = "useFetcher", o.useViewTransitionState = "useViewTransitionState";
})(Nf || (Nf = {}));
var dS;
(function(o) {
  o.UseFetcher = "useFetcher", o.UseFetchers = "useFetchers", o.UseScrollRestoration = "useScrollRestoration";
})(dS || (dS = {}));
function E_(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function OS(o) {
  let p = S.useContext(nu);
  return p || bt(!1, E_(o)), p;
}
function x_(o, p) {
  let {
    target: m,
    replace: g,
    state: y,
    preventScrollReset: E,
    relative: f,
    viewTransition: O
  } = p === void 0 ? {} : p, R = Iv(), T = Xi(), A = ru(o, {
    relative: f
  });
  return S.useCallback((D) => {
    if (o_(D, m)) {
      D.preventDefault();
      let U = g !== void 0 ? g : Zs(T) === Zs(A);
      R(o, {
        replace: U,
        state: y,
        preventScrollReset: E,
        relative: f,
        viewTransition: O
      });
    }
  }, [T, R, A, g, y, m, o, E, f, O]);
}
function R_() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let C_ = 0, D_ = () => "__" + String(++C_) + "__";
function T_() {
  let {
    router: o
  } = OS(Nf.UseSubmit), {
    basename: p
  } = S.useContext(va), m = K1();
  return S.useCallback(function(g, y) {
    y === void 0 && (y = {}), R_();
    let {
      action: E,
      method: f,
      encType: O,
      formData: R,
      body: T
    } = c_(g, p);
    if (y.navigate === !1) {
      let A = y.fetcherKey || D_();
      o.fetch(A, m, y.action || E, {
        preventScrollReset: y.preventScrollReset,
        formData: R,
        body: T,
        formMethod: y.method || f,
        formEncType: y.encType || O,
        flushSync: y.flushSync
      });
    } else
      o.navigate(y.action || E, {
        preventScrollReset: y.preventScrollReset,
        formData: R,
        body: T,
        formMethod: y.method || f,
        formEncType: y.encType || O,
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
  } = S.useContext(va), y = S.useContext(za);
  y || bt(!1, "useFormAction must be used inside a RouteContext");
  let [E] = y.matches.slice(-1), f = no({}, ru(o || ".", {
    relative: m
  })), O = Xi();
  if (o == null) {
    f.search = O.search;
    let R = new URLSearchParams(f.search), T = R.getAll("index");
    if (T.some((D) => D === "")) {
      R.delete("index"), T.filter((U) => U).forEach((U) => R.append("index", U));
      let D = R.toString();
      f.search = D ? "?" + D : "";
    }
  }
  return (!o || o === ".") && E.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (f.pathname = f.pathname === "/" ? g : Mr([g, f.pathname])), Zs(f);
}
function w_(o, p) {
  p === void 0 && (p = {});
  let m = S.useContext(_S);
  m == null && bt(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = OS(Nf.useViewTransitionState), y = ru(o, {
    relative: p.relative
  });
  if (!m.isTransitioning)
    return !1;
  let E = ci(m.currentLocation.pathname, g) || m.currentLocation.pathname, f = ci(m.nextLocation.pathname, g) || m.nextLocation.pathname;
  return kv(y.pathname, f) != null || kv(y.pathname, E) != null;
}
function __() {
  const [o, p] = S.useState(null), [m, g] = S.useState(""), [y, E] = S.useState(""), [f, O] = S.useState(!0), [R, T] = S.useState(""), [A, D] = S.useState(""), [U, L] = S.useState(!1), [H, ue] = S.useState(!1);
  S.useEffect(() => {
    const B = typeof window < "u" ? window : void 0, W = B && B.__FIREBASE__ ? B.__FIREBASE__ : null;
    p({
      apiKey: W && W.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: W && W.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: W && W.projectId || void 0 || "fresh-basket-a8933",
      appId: W && W.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: W && W.messagingSenderId || void 0 || "163656027399",
      measurementId: W && W.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function ie(B) {
    const W = (B == null ? void 0 : B.code) || "", ne = (B == null ? void 0 : B.message) || "";
    return W.includes("invalid-email") ? "Please enter a valid email address." : W.includes("user-not-found") ? "No account found with that email." : W.includes("wrong-password") || W.includes("invalid-credential") || ne.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : W.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : W.includes("network-request-failed") ? "Network error. Check your connection and try again." : ne || "Something went wrong.";
  }
  async function he(B) {
    B.preventDefault(), T(""), D(""), L(!0);
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const W = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), ne = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: ee, setPersistence: q, browserLocalPersistence: Le, browserSessionPersistence: I, signInWithEmailAndPassword: X } = ne, re = ee();
      await q(re, f ? Le : I);
      const oe = await (await X(re, m.trim(), y)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: oe }) })).ok) throw new Error("Session creation failed");
      D("Signed in successfully."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (W) {
      T(ie(W));
    } finally {
      L(!1);
    }
  }
  async function Y() {
    T(""), D("");
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const B = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: W, sendPasswordResetEmail: ne } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), ee = W();
      await ne(ee, m.trim()), D("If an account exists for that email, a reset link has been sent.");
    } catch (B) {
      T(ie(B));
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
      A && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-success", children: A }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 82,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ c.jsxDEV("form", { className: "auth-form", onSubmit: he, children: [
        /* @__PURE__ */ c.jsxDEV("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: "email", value: m, onChange: (B) => g(B.target.value), required: !0 }, void 0, !1, {
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
            /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: H ? "text" : "password", value: y, onChange: (B) => E(B.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ c.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": H ? "Hide password" : "Show password", onClick: () => ue((B) => !B), children: "👁️" }, void 0, !1, {
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
            /* @__PURE__ */ c.jsxDEV("input", { type: "checkbox", checked: f, onChange: (B) => O(B.target.checked) }, void 0, !1, {
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
          /* @__PURE__ */ c.jsxDEV("button", { className: "link-button", type: "button", onClick: Y, children: "Forgot password?" }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 95,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 93,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "auth-button auth-button-wide", disabled: U, type: "submit", children: U ? "Signing in…" : "Sign in" }, void 0, !1, {
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
  const [o, p] = S.useState(null), [m, g] = S.useState(""), [y, E] = S.useState(""), [f, O] = S.useState(""), [R, T] = S.useState(""), [A, D] = S.useState(""), [U, L] = S.useState(""), [H, ue] = S.useState(""), [ie, he] = S.useState(!1), [Y, B] = S.useState(!1), [W, ne] = S.useState(!1), [ee, q] = S.useState(!1);
  S.useEffect(() => {
    const X = typeof window < "u" ? window : void 0, re = X && X.__FIREBASE__ ? X.__FIREBASE__ : null;
    p({
      apiKey: re && re.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: re && re.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: re && re.projectId || void 0 || "fresh-basket-a8933",
      appId: re && re.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: re && re.messagingSenderId || void 0 || "163656027399",
      measurementId: re && re.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function Le(X) {
    const re = (X == null ? void 0 : X.code) || "";
    return re.includes("email-already-in-use") ? "An account with this email already exists." : re.includes("weak-password") ? "Password should be at least 6 characters." : re.includes("invalid-email") ? "Please enter a valid email address." : re.includes("network-request-failed") ? "Network error. Check your connection and try again." : (X == null ? void 0 : X.message) || "Something went wrong.";
  }
  async function I(X) {
    X.preventDefault(), L(""), ue(""), he(!0);
    try {
      const re = String(m).trim(), Re = String(y).trim(), oe = Re.replace(/\D+/g, ""), j = { fn: !re, cn: !Re };
      if (ne(j.fn), q(j.cn || oe.length < 7), j.fn || j.cn) {
        L("Please fill in required fields");
        return;
      }
      if (oe.length < 7) {
        L("Please enter a valid mobile number");
        return;
      }
      if (R !== A) throw new Error("Passwords do not match");
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const Q = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: te, createUserWithEmailAndPassword: J } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Ne = te(), Qe = await (await J(Ne, f.trim(), R)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Qe, profile: { fullName: re, contactNumber: Re } }) })).ok) throw new Error("Session creation failed");
      ue("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (re) {
      L(Le(re));
    } finally {
      he(!1);
    }
  }
  return /* @__PURE__ */ c.jsxDEV("section", { className: "auth-panel", style: { maxWidth: 520, margin: "40px auto" }, children: [
    /* @__PURE__ */ c.jsxDEV("h2", { className: "auth-title", children: "Register" }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 67,
      columnNumber: 7
    }, this),
    U && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: U }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 68,
      columnNumber: 17
    }, this),
    H && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-success", children: H }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 69,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ c.jsxDEV("form", { className: "auth-form", onSubmit: I, children: [
      /* @__PURE__ */ c.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input" + (W && !String(m).trim() ? " input-error" : ""), value: m, onChange: (X) => {
          g(X.target.value), W && ne(!String(X.target.value).trim());
        }, onBlur: () => ne(!String(m).trim()), required: !0 }, void 0, !1, {
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input" + (ee ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: y, onChange: (X) => {
          if (E(X.target.value), ee) {
            const re = String(X.target.value).trim().replace(/\D+/g, "");
            q(!(re.length >= 7));
          }
        }, onBlur: () => {
          const X = String(y).trim().replace(/\D+/g, "");
          q(!(X.length >= 7));
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: "email", value: f, onChange: (X) => O(X.target.value), required: !0 }, void 0, !1, {
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
          /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: Y ? "text" : "password", value: R, onChange: (X) => T(X.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ c.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": Y ? "Hide password" : "Show password", onClick: () => B((X) => !X), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: "password", value: A, onChange: (X) => D(X.target.value), minLength: 6, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 87,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "auth-button", disabled: ie, type: "submit", children: ie ? "Creating account…" : "Create account" }, void 0, !1, {
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
function M_() {
  const [o, p] = S.useState([]);
  return S.useEffect(() => {
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
      return p((O) => [f, ...O]), E;
    }, window.hideToast = function(g) {
      p((y) => y.filter((E) => E.id !== g));
    }, () => {
      try {
        window && typeof window.showToast == "function" && delete window.showToast, window && typeof window.hideToast == "function" && delete window.hideToast;
      } catch {
      }
    };
  }, []), S.useEffect(() => {
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
  S.useEffect(() => {
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
  return S.useEffect(() => {
    const m = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), y = document.getElementById("profileBtn"), E = document.getElementById("profileMenu");
    function f(D, U, L) {
      D && (D.classList.toggle("hidden", !L), D.setAttribute("aria-hidden", L ? "false" : "true"), U && U.setAttribute("aria-expanded", L ? "true" : "false"));
    }
    function O() {
      f(g, m, !1), f(E, y, !1);
    }
    function R(D) {
      const U = (L) => L && (L === D.target || L.contains(D.target));
      !U(g) && !U(m) && !U(E) && !U(y) && O();
    }
    function T(D) {
      D.key === "Escape" && O();
    }
    function A(D) {
      D && D.querySelectorAll(".dropdown-item").forEach((U) => {
        U.addEventListener("click", () => O());
      });
    }
    return m && g && (m.addEventListener("click", (D) => {
      D.stopPropagation(), f(E, y, !1), f(g, m, g.classList.contains("hidden"));
    }), A(g)), y && E && (y.addEventListener("click", (D) => {
      D.stopPropagation(), f(g, m, !1), f(E, y, E.classList.contains("hidden"));
    }), A(E)), document.addEventListener("click", R), document.addEventListener("keydown", T), () => {
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
    /* @__PURE__ */ c.jsxDEV(M_, {}, void 0, !1, {
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
function A_({ onClose: o, onCreated: p }) {
  const [m, g] = S.useState(""), [y, E] = S.useState(""), [f, O] = S.useState(""), [R, T] = S.useState(""), [A, D] = S.useState(!1), [U, L] = S.useState(""), [H, ue] = S.useState(""), [ie, he] = S.useState(!1), [Y, B] = S.useState(!1), [W, ne] = S.useState(!1), [ee, q] = S.useState(!1);
  async function Le() {
    L(""), ue(""), q(!0);
    const I = String(m).trim(), X = String(y), re = String(f).trim(), Re = String(R).trim(), oe = Re.replace(/\D+/g, ""), j = { fn: !re, cn: !Re, pw: !X };
    if (he(j.fn), B(j.cn || oe.length < 7), ne(j.pw), j.fn || j.cn || j.pw) {
      L("Full name, mobile and password are required");
      return;
    }
    if (oe.length < 7) {
      L("Please enter a valid mobile number"), B(!0);
      return;
    }
    if (I && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(I)) {
      L("Please enter a valid email");
      return;
    }
    if (X.length < 6) {
      ne(!0), L("Password must be at least 6 characters");
      return;
    }
    D(!0);
    try {
      const Q = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: I, password: X, fullName: re, contactNumber: Re })
      }), te = await Q.json().catch(() => null);
      if (!Q.ok) {
        const J = String(te && (te.error || te.message) || ""), Ne = J.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(J) || /MISSING\s*EMAIL\/PASSWORD/i.test(J))
          L("Full name, mobile and password are required"), he(!re), B(!Re || oe.length < 7), ne(!X);
        else if (Ne.includes("EMAIL_EXISTS"))
          L("An account with this email already exists. Use a different email or leave email blank.");
        else if (Ne.includes("INVALID_EMAIL"))
          L("Please enter a valid email");
        else if (Ne.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(J))
          ne(!0), L("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER/i.test(J))
          B(!0), L("Please enter a valid mobile number");
        else if (/FIREBASE NOT CONFIGURED/i.test(J))
          L("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(J || "Failed to create rider");
        return;
      }
      ue("Rider created successfully"), p && p(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (Q) {
      const te = String((Q == null ? void 0 : Q.message) || "");
      /Missing\s*(fullName\/contactNumber|email\/password)/i.test(te) ? L("Full name, mobile and password are required") : /EMAIL_EXISTS/i.test(te) ? L("An account with this email already exists. Use a different email or leave email blank.") : /INVALID_EMAIL/i.test(te) ? L("Please enter a valid email") : /WEAK_PASSWORD/i.test(te) || /AT LEAST 6 CHARACTERS/i.test(te) ? (ne(!0), L("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER/i.test(te) ? (B(!0), L("Please enter a valid mobile number")) : L(te || "Failed to create rider");
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
      H && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-success", children: H }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 97,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ c.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (ee && !String(f).trim() ? " input-error" : ""), value: f, onChange: (I) => {
          O(I.target.value), ee && he(!String(I.target.value).trim());
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input", type: "email", value: m, onChange: (I) => {
          g(I.target.value);
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (ee && !String(y) ? " input-error" : ""), type: "password", value: y, onChange: (I) => {
          E(I.target.value), ee && ne(!String(I.target.value));
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (ee && String(R).trim().replace(/\D+/g, "").length < 7 ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: R, onChange: (I) => {
          if (T(I.target.value), ee) {
            const X = String(I.target.value).trim().replace(/\D+/g, "");
            B(!(X.length >= 7));
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
      U && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: U }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 110,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary", onClick: o, disabled: A, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 112,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-primary", onClick: Le, disabled: A, children: A ? "Creating…" : "Create" }, void 0, !1, {
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
const Sf = "app.settings.fares", ma = {
  baseFare: 0,
  farePerKm: 2
};
function MS() {
  if (typeof window > "u" || !window.localStorage)
    return { ...ma };
  try {
    const o = window.localStorage.getItem(Sf);
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
const AS = "riderPerformancePct";
function LS() {
  if (typeof window > "u") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}
function VS() {
  const o = LS();
  if (!o) return {};
  try {
    const p = o.getItem(AS);
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
  const p = VS(), m = String(o);
  return p[m];
}
function V_(o) {
  if (!o || typeof o != "object") return;
  const p = LS();
  if (!p) return;
  const m = Object.entries(o);
  if (m.length === 0) return;
  const g = VS();
  let y = !1;
  const E = { ...g };
  for (const [f, O] of m) {
    const R = String(f);
    let T;
    if (typeof O == "number")
      T = O;
    else if (typeof O == "string")
      T = Number(O);
    else
      continue;
    Number.isFinite(T) && E[R] !== T && (E[R] = T, y = !0);
  }
  if (y)
    try {
      p.setItem(AS, JSON.stringify(E));
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
  const o = () => {
    const j = /* @__PURE__ */ new Date(), Q = new Date(j.getFullYear(), j.getMonth(), 1), te = `${Q.getFullYear()}-${String(Q.getMonth() + 1).padStart(2, "0")}-${String(Q.getDate()).padStart(2, "0")}`, J = `${j.getFullYear()}-${String(j.getMonth() + 1).padStart(2, "0")}-${String(j.getDate()).padStart(2, "0")}`;
    return { from: te, to: J };
  }, p = S.useMemo(() => o(), []), [m, g] = S.useState([]), [y, E] = S.useState(""), [f, O] = S.useState(!0), [R, T] = S.useState(""), [A, D] = S.useState(1), [U, L] = S.useState(20), [H, ue] = S.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [ie, he] = S.useState(!1), [Y, B] = S.useState(ma), [W, ne] = S.useState(p.from), [ee, q] = S.useState(p.to), [Le, I] = S.useState(/* @__PURE__ */ new Map());
  S.useEffect(() => {
    function j() {
      B(MS());
    }
    j();
    function Q(te) {
      te.key === Sf && j();
    }
    return typeof window < "u" && (window.addEventListener("storage", Q), window.addEventListener("fare-settings-changed", j)), () => {
      typeof window < "u" && (window.removeEventListener("storage", Q), window.removeEventListener("fare-settings-changed", j));
    };
  }, []), S.useEffect(() => {
    let j = !0;
    return (async () => {
      var Q, te, J, Ne;
      O(!0), T("");
      try {
        const _e = new URLSearchParams();
        y && _e.set("q", y), _e.set("page", String(A)), _e.set("limit", String(U));
        const Qe = await fetch(`/api/riders?${_e.toString()}`, { credentials: "include" });
        if (Qe.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Qe.ok) throw new Error("Failed to load riders");
        const Pe = await Qe.json();
        j && (g(Array.isArray(Pe.riders) ? Pe.riders : []), ue({ total: ((Q = Pe.meta) == null ? void 0 : Q.total) || 0, page: ((te = Pe.meta) == null ? void 0 : te.page) || 1, limit: ((J = Pe.meta) == null ? void 0 : J.limit) || U, pages: ((Ne = Pe.meta) == null ? void 0 : Ne.pages) || 1 }));
      } catch (_e) {
        j && T(_e.message || "Failed to load riders");
      } finally {
        j && O(!1);
      }
    })(), () => {
      j = !1;
    };
  }, [y, A, U]), S.useEffect(() => {
    if (!W || !ee || !m.length) return;
    let j = !0;
    return (async () => {
      const Q = /* @__PURE__ */ new Map();
      for (const te of m) {
        const J = `${te.id}:${W}:${ee}`;
        try {
          const Ne = await fetch(`/api/riders/${te.id}/km-in-range?fromDate=${W}&toDate=${ee}`, { credentials: "include" });
          if (Ne.status === 401) {
            window.location.href = "/auth/login";
            return;
          }
          if (Ne.ok) {
            const _e = await Ne.json();
            j && (Q.set(J, {
              km: _e.totalKm || 0,
              rideCount: _e.rideCount || 0,
              performancePct: _e.performancePct || 0
            }), console.log(`km-in-range for ${te.id}:`, _e));
          } else {
            const _e = await Ne.text();
            console.error(`km-in-range error for ${te.id}:`, Ne.status, _e);
          }
        } catch (Ne) {
          console.error(`km-in-range fetch error for ${te.id}:`, Ne);
        }
      }
      j && I(Q);
    })(), () => {
      j = !1;
    };
  }, [W, ee, m]);
  const X = S.useMemo(() => m.filter((j) => {
    if (y && !String(j.name || "").toLowerCase().includes(y.toLowerCase().trim())) return !1;
    if (W || ee) {
      const Q = Number(j.lastActiveDays ?? 0), te = W ? new Date(W) : null, J = ee ? new Date(ee) : null;
      if (te && J) {
        const Ne = Math.floor((Date.now() - te.getTime()) / 864e5), _e = Math.floor((Date.now() - J.getTime()) / (1e3 * 60 * 60 * 24));
        if (Q < _e || Q > Ne) return !1;
      } else if (te) {
        const Ne = Math.floor((Date.now() - te.getTime()) / 864e5);
        if (Q > Ne) return !1;
      } else if (J) {
        const Ne = Math.floor((Date.now() - J.getTime()) / 864e5);
        if (Q < Ne) return !1;
      }
    }
    return !0;
  }), [m, y, W, ee]), re = S.useMemo(() => {
    const j = Number(Y.farePerKm);
    return Number.isFinite(j) ? j : ma.farePerKm;
  }, [Y]), Re = S.useMemo(() => {
    const j = Number(Y.baseFare);
    return Number.isFinite(j) ? j : ma.baseFare;
  }, [Y]);
  S.useEffect(() => {
    if (!Array.isArray(m) || m.length === 0) return;
    const j = {};
    for (const Q of m) {
      if (!Q || Q.id === void 0 || Q.id === null) continue;
      const te = Number(Q.performancePct);
      Number.isFinite(te) && (j[Q.id] = Math.round(te));
    }
    Object.keys(j).length !== 0 && V_(j);
  }, [m]);
  const oe = S.useMemo(() => {
    const j = /* @__PURE__ */ new Date(), Q = [], te = [];
    for (let J = 2; J >= 0; J--) {
      const Ne = new Date(j.getFullYear(), j.getMonth() - J, 1), _e = `${Ne.getFullYear()}-${String(Ne.getMonth() + 1).padStart(2, "0")}`, Qe = Ne.toLocaleString(void 0, { month: "short", year: "numeric" });
      Q.push(_e), te.push(Qe);
    }
    return { keys: Q, labels: te };
  }, []);
  return /* @__PURE__ */ c.jsxDEV(Or, { children: /* @__PURE__ */ c.jsxDEV("section", { className: "rider-management", children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "rc-header riders-header", children: [
      /* @__PURE__ */ c.jsxDEV("div", { className: "riders-header-left", children: [
        /* @__PURE__ */ c.jsxDEV("h2", { className: "rc-title", children: "Rider Management" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 236,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("p", { className: "rc-subtitle", children: "View and manage riders based on performance." }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 237,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 235,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => he(!0), children: "Create Rider" }, void 0, !1, {
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
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ c.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 246,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: y, onChange: (j) => {
          E(j.target.value), D(1);
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
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters", children: /* @__PURE__ */ c.jsxDEV("div", { className: "date-range-filter", children: [
        /* @__PURE__ */ c.jsxDEV("input", { type: "date", className: "date-range-input", value: W, onChange: (j) => {
          ne(j.target.value), D(1);
        }, placeholder: "From", title: "Filter from date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 251,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ c.jsxDEV("span", { className: "date-range-separator", children: "to" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 252,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ c.jsxDEV("input", { type: "date", className: "date-range-input", value: ee, onChange: (j) => {
          q(j.target.value), D(1);
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
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-table-wrapper", children: [
      ie && /* @__PURE__ */ c.jsxDEV(A_, { onClose: () => he(!1), onCreated: () => {
        window.location.reload();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 260,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ c.jsxDEV("thead", { children: /* @__PURE__ */ c.jsxDEV("tr", { children: [
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-name", children: "Rider Name" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 265,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-month", children: "Range" }, oe.keys[oe.keys.length - 1], !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 266,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-earnings", children: (() => {
            const j = oe.keys[oe.keys.length - 2], Q = String(j).split("-"), te = parseInt(Q[0], 10), J = parseInt(Q[1], 10);
            return `Earnings (${new Date(Number.isFinite(te) ? te : (/* @__PURE__ */ new Date()).getFullYear(), Number.isFinite(J) ? J - 1 : (/* @__PURE__ */ new Date()).getMonth() - 1, 1).toLocaleString(void 0, { month: "short" })}, Rs)`;
          })() }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 267,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-perf", children: "Performance" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 268,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-total", children: "Total" }, void 0, !1, {
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
        /* @__PURE__ */ c.jsxDEV("tbody", { children: [
          f && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 274,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 274,
            columnNumber: 17
          }, this),
          !f && R && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "auth-error", children: R }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 277,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 277,
            columnNumber: 17
          }, this),
          !f && !R && X.map((j) => /* @__PURE__ */ c.jsxDEV("tr", { "data-rider-id": j.id, "data-status": j.status, "data-last-days": j.lastActiveDays, children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ c.jsxDEV("a", { className: "rider-name-link", href: `/riders/${j.id}`, children: j.name }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 281,
              columnNumber: 47
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 281,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-month", children: (() => {
              var Q;
              if (W && ee) {
                const te = `${j.id}:${W}:${ee}`, J = Le.get(te), Ne = (J == null ? void 0 : J.km) ?? 0;
                return `${Number(Ne).toFixed(2)} km`;
              }
              return `${Number(((Q = j.monthlyCounts) == null ? void 0 : Q[oe.keys[oe.keys.length - 1]]) || 0).toFixed(2)} km`;
            })() }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 282,
              columnNumber: 19
            }, this),
            (() => {
              var Ne, _e;
              let Q = 0, te = 0;
              if (W && ee) {
                const Qe = `${j.id}:${W}:${ee}`, Pe = Le.get(Qe);
                Q = (Pe == null ? void 0 : Pe.km) ?? 0, te = (Pe == null ? void 0 : Pe.rideCount) ?? 0;
              } else {
                const Qe = oe.keys[oe.keys.length - 2];
                Q = Number(((Ne = j.monthlyCounts) == null ? void 0 : Ne[Qe]) || 0);
                const Pe = Array.isArray(j.orders) ? j.orders : [];
                te = Number(((_e = j.monthlyRideCounts) == null ? void 0 : _e[Qe]) ?? P_(Pe, Qe) ?? 0);
              }
              const J = Q * re + te * Re;
              return /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-earnings", children: Number.isFinite(J) ? `${J.toFixed(2)} Rs.` : "0 Rs." }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 308,
                columnNumber: 29
              }, this);
            })(),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-performance", children: (() => {
              if (W && ee) {
                const Q = `${j.id}:${W}:${ee}`, te = Le.get(Q), J = (te == null ? void 0 : te.performancePct) ?? 0;
                return `${Number(J)}%`;
              }
              return Number.isFinite(Number(j.performancePct)) ? `${Math.round(Number(j.performancePct))}%` : "0%";
            })() }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 310,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-total", children: [
              Number(j.totalKm || 0).toFixed(2),
              " km"
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 319,
              columnNumber: 19
            }, this)
          ] }, j.id, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 280,
            columnNumber: 17
          }, this)),
          !f && !R && X.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No riders found." }, void 0, !1, {
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
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: H.page <= 1 || f, onClick: () => D((j) => Math.max(1, j - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 331,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        H.page,
        " of ",
        H.pages,
        " • ",
        H.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 332,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: H.page >= H.pages || f, onClick: () => D((j) => Math.min(H.pages, j + 1)), children: "Next" }, void 0, !1, {
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
const Fv = /^(-?\d+(?:\.\d+)?)\s*(m|min|mins|minutes)$/i, pS = /^(-?\d+(?:\.\d+)?)\s*(s|sec|secs|seconds)$/i;
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
function Ef(o) {
  if (o == null || o === "") return null;
  if (typeof o == "number")
    return Number.isFinite(o) ? o : null;
  if (o instanceof Date) return null;
  if (typeof o == "string") {
    const p = o.trim();
    if (!p) return null;
    if (Fv.test(p)) return parseFloat(p.replace(Fv, "$1"));
    if (pS.test(p)) return parseFloat(p.replace(pS, "$1")) / 60;
    const m = Number(p);
    return Number.isFinite(m) ? m : null;
  }
  if (Fa(o)) {
    if (Number.isFinite(o.minutes)) return Number(o.minutes);
    if (Number.isFinite(o.expectedMinutes)) return Number(o.expectedMinutes);
    if (Number.isFinite(o.seconds)) return Number(o.seconds) / 60;
    if (o.duration !== void 0 && o.duration !== o) {
      const p = Ef(o.duration);
      if (p !== null) return p;
    }
    if (o.value !== void 0 && o.value !== o) {
      const p = Ef(o.value);
      if (p !== null) return p;
    }
  }
  return null;
}
function B_(o) {
  var m, g, y, E, f, O;
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
    (O = o.orders) == null ? void 0 : O.actualDurationMinutes
  ];
  for (const R of p) {
    const T = Ef(R);
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
function kS(o) {
  var m, g, y, E, f, O;
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
    (O = o.orders) == null ? void 0 : O.startedAt
  ];
  for (const R of p)
    if (R != null) return R;
  return null;
}
function I_(o) {
  if (!Fa(o)) return null;
  const p = kS(o);
  return p ?? null;
}
function US(o) {
  if (!Fa(o)) return null;
  const p = B_(o);
  if (Number.isFinite(p)) return p;
  const m = ui($_(o)), g = ui(kS(o));
  if (m instanceof Date && g instanceof Date) {
    const y = m.getTime() - g.getTime();
    if (y >= 0)
      return Math.round(y / 6e4);
  }
  return null;
}
function FS(o) {
  const p = ui(o);
  if (!(p instanceof Date) || Number.isNaN(p.getTime())) return "-";
  try {
    return p.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "-";
  }
}
function zS(o) {
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
function PS(o) {
  var g, y, E, f, O, R, T, A;
  if (!Fa(o)) return null;
  const p = [
    o.expected_delivery_time,
    o.expectedDeliveryTime,
    (g = o.order) == null ? void 0 : g.expected_delivery_time,
    (y = o.order) == null ? void 0 : y.expectedDeliveryTime,
    (E = o.orders) == null ? void 0 : E.expected_delivery_time,
    (f = o.orders) == null ? void 0 : f.expectedDeliveryTime,
    (O = o.delivery) == null ? void 0 : O.expected_delivery_time,
    (R = o.delivery) == null ? void 0 : R.expectedDeliveryTime,
    (T = o.expected_delivery) == null ? void 0 : T.time,
    (A = o.expected_delivery) == null ? void 0 : A.minutes,
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
      const U = m[D];
      if (!U) continue;
      const L = typeof U.type == "string" ? U.type.toLowerCase().trim() : "";
      if (!(L !== "eta" && L !== "expected")) {
        if (U.expectedMinutes !== void 0 && U.expectedMinutes !== null) return { minutes: U.expectedMinutes };
        if (U.minutes !== void 0 && U.minutes !== null) return { minutes: U.minutes };
        if (U.expectedAt) return U.expectedAt;
      }
    }
  return null;
}
function HS(o) {
  const p = Ef(o);
  if (p === null || !Number.isFinite(p)) return "-";
  const m = Math.round(p);
  if (m < 60) return `${m} min`;
  const g = Math.floor(m / 60), y = m % 60;
  return `${g}h ${y}m`;
}
function Y_() {
  var L;
  const { id: o } = F1(), [p, m] = S.useState(null), [g, y] = S.useState(!0), [E, f] = S.useState(""), [O, R] = S.useState(null);
  if (S.useEffect(() => {
    const H = L_(o);
    if (typeof H == "number" && Number.isFinite(H))
      R(H);
    else if (typeof H == "string") {
      const ue = Number(H);
      Number.isFinite(ue) ? R(ue) : R(null);
    } else
      R(null);
  }, [o]), S.useEffect(() => {
    let H = !0;
    return (async () => {
      y(!0), f("");
      try {
        const ue = await fetch(`/api/riders/${o}`, { credentials: "include" });
        if (ue.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ue.ok) throw new Error("Failed to load rider");
        const ie = await ue.json();
        H && m(ie);
      } catch (ue) {
        H && f(ue.message || "Failed to load rider");
      } finally {
        H && y(!1);
      }
    })(), () => {
      H = !1;
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
  const { rider: T, metrics: A, history: D } = p, U = O ?? (Number.isFinite(Number(A == null ? void 0 : A.onTimeRate)) ? Math.round(Number(A.onTimeRate)) : 0);
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
          U,
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
        (p.riderOrders || []).map((H, ue) => {
          const ie = H.name || H.orderId, he = ui(H.created_at), Y = he instanceof Date && !Number.isNaN(he.getTime()) ? he.toISOString().slice(0, 10) : "-", B = FS(H.deliveryStartTime), W = PS(H), ne = zS(W), ee = US(H), q = HS(ee), Le = Number(H.distance_km), I = Number.isFinite(Le) ? `${Le.toFixed(2)} km` : typeof H.distance_km == "string" && H.distance_km.trim() ? H.distance_km : "-";
          return /* @__PURE__ */ c.jsxDEV("tr", { children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name order-cell", children: ie }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 113,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-km date-cell", children: Y }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 114,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-start-time start-cell", children: B }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 115,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-expected expected-cell", children: ne }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 116,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: q }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 117,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-commission distance-cell", children: I }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 118,
              columnNumber: 21
            }, this)
          ] }, H.orderId || ue, !0, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 112,
            columnNumber: 19
          }, this);
        }),
        !((L = p.riderOrders) != null && L.length) && (D || []).map((H, ue) => /* @__PURE__ */ c.jsxDEV("tr", { children: [
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name order-cell", children: H.date }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 124,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-km date-cell", children: H.deliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 125,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-start-time start-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 126,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-expected expected-cell", children: H.avgTime ? `${H.avgTime} min` : "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 127,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 128,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-commission distance-cell", children: Number.isFinite(Number(H.distanceKm)) ? `${Number(H.distanceKm).toFixed(2)} km` : H.distanceKm || "-" }, void 0, !1, {
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
function BS({ orderId: o, onClose: p, onAssigned: m }) {
  const [g, y] = S.useState([]), [E, f] = S.useState([]), [O, R] = S.useState(""), [T, A] = S.useState(""), [D, U] = S.useState(!0), [L, H] = S.useState(!0), [ue, ie] = S.useState(""), [he, Y] = S.useState(""), [B, W] = S.useState(!1);
  S.useEffect(() => {
    let I = !0;
    return (async () => {
      U(!0), ie("");
      try {
        const X = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (X.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!X.ok) throw new Error("Failed to load riders");
        const re = await X.json();
        I && y(Array.isArray(re.riders) ? re.riders : []);
      } catch (X) {
        I && ie(X.message || "Failed to load riders");
      } finally {
        I && U(!1);
      }
    })(), () => {
      I = !1;
    };
  }, []), S.useEffect(() => {
    let I = !0;
    return (async () => {
      H(!0), Y("");
      try {
        const X = await fetch("/api/packers?limit=200", { credentials: "include" });
        if (X.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!X.ok) throw new Error("Failed to load packers");
        const re = await X.json();
        I && f(Array.isArray(re.packers) ? re.packers : []);
      } catch (X) {
        I && Y(X.message || "Failed to load packers");
      } finally {
        I && H(!1);
      }
    })(), () => {
      I = !1;
    };
  }, []);
  async function ne() {
    if (!O || !T) {
      alert("Please select both a rider and a packer");
      return;
    }
    W(!0);
    try {
      const I = await fetch(`/api/orders/${encodeURIComponent(o)}/assign`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ riderId: O })
      });
      if (I.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const X = await I.json().catch(() => null);
      if (!I.ok) throw new Error(X && X.error ? X.error : "Assign failed");
      const re = await fetch(`/api/orders/${encodeURIComponent(o)}/assign-packer`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packerId: T })
      });
      if (re.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const Re = await re.json().catch(() => null);
      if (!re.ok) throw new Error(Re && Re.error ? Re.error : "Assign failed");
      m && m({ orderId: o, riderId: O, packerId: T });
      try {
        window && typeof window.showToast == "function" && window.showToast("Order assigned successfully", { type: "success" });
      } catch {
      }
      p();
    } catch (I) {
      alert(I.message || "Failed to assign");
    } finally {
      W(!1);
    }
  }
  const ee = ue || "", q = he || "", Le = D || L;
  return /* @__PURE__ */ c.jsxDEV("div", { className: "assign-modal-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ c.jsxDEV("div", { className: "assign-modal", children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "assign-modal-header", children: [
      /* @__PURE__ */ c.jsxDEV("h3", { className: "assign-modal-title", children: "Assign Rider & Packer" }, void 0, !1, {
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
    /* @__PURE__ */ c.jsxDEV("div", { className: "assign-modal-body", children: Le ? /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 96,
      columnNumber: 13
    }, this) : /* @__PURE__ */ c.jsxDEV(c.Fragment, { children: [
      /* @__PURE__ */ c.jsxDEV("div", { className: "assign-form", children: [
        /* @__PURE__ */ c.jsxDEV("div", { className: "form-group", children: [
          /* @__PURE__ */ c.jsxDEV("label", { className: "field-label", children: [
            "Select Rider",
            /* @__PURE__ */ c.jsxDEV(
              "select",
              {
                className: "field-input assign-dropdown",
                value: O,
                onChange: (I) => R(I.target.value),
                disabled: B,
                children: [
                  /* @__PURE__ */ c.jsxDEV("option", { value: "", children: "-- Choose a rider --" }, void 0, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 108,
                    columnNumber: 23
                  }, this),
                  g.map((I) => /* @__PURE__ */ c.jsxDEV("option", { value: I.id, children: I.name }, I.id, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 110,
                    columnNumber: 25
                  }, this))
                ]
              },
              void 0,
              !0,
              {
                fileName: "/app/code/client/components/AssignModal.jsx",
                lineNumber: 102,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 101,
            columnNumber: 19
          }, this),
          ee && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: ee }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 114,
            columnNumber: 34
          }, this),
          g.length === 0 && !ee && /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: "No riders available" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 115,
            columnNumber: 58
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 100,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("div", { className: "form-group", children: [
          /* @__PURE__ */ c.jsxDEV("label", { className: "field-label", children: [
            "Select Packer",
            /* @__PURE__ */ c.jsxDEV(
              "select",
              {
                className: "field-input assign-dropdown",
                value: T,
                onChange: (I) => A(I.target.value),
                disabled: B,
                children: [
                  /* @__PURE__ */ c.jsxDEV("option", { value: "", children: "-- Choose a packer --" }, void 0, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 126,
                    columnNumber: 23
                  }, this),
                  E.map((I) => /* @__PURE__ */ c.jsxDEV("option", { value: I.id, children: I.name }, I.id, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 128,
                    columnNumber: 25
                  }, this))
                ]
              },
              void 0,
              !0,
              {
                fileName: "/app/code/client/components/AssignModal.jsx",
                lineNumber: 120,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 119,
            columnNumber: 19
          }, this),
          q && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: q }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 132,
            columnNumber: 35
          }, this),
          E.length === 0 && !q && /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: "No packers available" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 133,
            columnNumber: 60
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 118,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 99,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "assign-modal-actions", children: [
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary", onClick: p, disabled: B, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 138,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-primary", onClick: ne, disabled: B || !O || !T, children: B ? "Assigning…" : "Assign" }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 139,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 137,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 98,
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
function $S(o) {
  return o && typeof o.current_status == "string" ? o.current_status : "";
}
function mS(o) {
  return zv($S(o));
}
const q_ = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "assigned", label: "Assigned" },
  { key: "pending", label: "Pending" },
  { key: "in-progress", label: "In-Progress" },
  { key: "completed", label: "delivered" }
], vS = {
  completed: "delivered",
  "in-progress": "in_progress",
  "in-transit": "in_progress"
};
function G_() {
  const [o, p] = S.useState([]), [m, g] = S.useState(""), [y, E] = S.useState("all"), [f, O] = S.useState(1), [R, T] = S.useState(20), [A, D] = S.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [U, L] = S.useState(!0), [H, ue] = S.useState(""), [ie, he] = S.useState(""), [Y, B] = S.useState(!0), [W, ne] = S.useState(0), [ee, q] = S.useState(!1), [Le, I] = S.useState(null);
  S.useEffect(() => {
    let j = !0;
    return (async () => {
      var Q, te, J, Ne;
      L(!0), ue(""), he("");
      try {
        const _e = new URLSearchParams();
        if (m && _e.set("q", m), y && y !== "all") {
          const xt = vS[y] || y;
          _e.set("status", zv(xt));
        }
        _e.set("page", String(f)), _e.set("limit", String(R));
        const Qe = await fetch(`/api/orders?${_e.toString()}`, { credentials: "include" });
        if (Qe.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Qe.ok) throw new Error("Failed to load orders");
        const Pe = await Qe.json();
        j && (p(Array.isArray(Pe.orders) ? Pe.orders : []), he(Pe.shopifyError || ""), B(!!Pe.shopifyConfigured), D({ total: ((Q = Pe.meta) == null ? void 0 : Q.total) || 0, page: ((te = Pe.meta) == null ? void 0 : te.page) || 1, limit: ((J = Pe.meta) == null ? void 0 : J.limit) || R, pages: ((Ne = Pe.meta) == null ? void 0 : Ne.pages) || 1 }));
      } catch (_e) {
        j && ue(_e.message || "Failed to load orders");
      } finally {
        j && L(!1);
      }
    })(), () => {
      j = !1;
    };
  }, [m, y, f, R, W]), S.useMemo(() => o, [o]);
  const X = S.useMemo(() => {
    if (!Array.isArray(o)) return [];
    if (y === "all") return o.slice();
    const j = zv(vS[y] || y);
    return o.filter((Q) => mS(Q) === j);
  }, [o, y]);
  function re() {
    I(null), q(!1);
  }
  function Re(j) {
    try {
      const { orderId: Q } = j || {};
      if (!Q) return;
      const te = String(Q).replace(/^#+/, "");
      O(1);
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${Q}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  async function oe(j) {
    if (j)
      try {
        const Q = await fetch(`/api/orders/${encodeURIComponent(j)}/unassign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });
        if (Q.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Q.ok) throw new Error("Failed to unassign order");
        try {
          window && typeof window.showToast == "function" && window.showToast(`Order unassigned: ${j}`, { type: "success" });
        } catch {
        }
        O(1), ne((te) => te + 1);
      } catch (Q) {
        try {
          window && typeof window.showToast == "function" && window.showToast(Q.message || "Failed to unassign order", { type: "error" });
        } catch {
        }
      }
  }
  return /* @__PURE__ */ c.jsxDEV(Or, { children: /* @__PURE__ */ c.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ c.jsxDEV("h2", { className: "rc-title", children: "Order Management" }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 122,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 123,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 121,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ c.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 128,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: m, onChange: (j) => {
          g(j.target.value), O(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 129,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 127,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters", children: q_.map(({ key: j, label: Q }) => /* @__PURE__ */ c.jsxDEV("button", { className: `rc-select rc-chip${y === j ? " active" : ""}`, onClick: () => {
        E(j), O(1);
      }, "data-filter": j, children: Q }, j, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 133,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 131,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 126,
      columnNumber: 9
    }, this),
    !Y && /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 141,
      columnNumber: 11
    }, this),
    ie && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: ie }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 143,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ c.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ c.jsxDEV("thead", { children: /* @__PURE__ */ c.jsxDEV("tr", { children: [
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-name order-id-heading", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 149,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-km customer-heading", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 150,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-perf address-heading", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 151,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-rider rider-heading", children: "Rider" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 152,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-start-time start-heading", children: "Start" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 153,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-expected expected-heading", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 154,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-actual actual-heading", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 155,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-status status-heading", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 156,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 148,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 147,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("tbody", { children: [
        U && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 8, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 161,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 161,
          columnNumber: 17
        }, this),
        !U && H && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 8, className: "auth-error", children: H }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 164,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 164,
          columnNumber: 17
        }, this),
        !U && !H && X.map((j, Q) => {
          var _t;
          const te = $S(j), J = mS(j), Ne = j.full_name || (j.customer && j.customer.full_name ? j.customer.full_name : "");
          let _e = "-";
          typeof j.shipping_address == "string" && String(j.shipping_address).trim() ? _e = String(j.shipping_address).trim() : j.shipping_address && typeof j.shipping_address == "object" ? _e = [j.shipping_address.address1 || "", j.shipping_address.city || "", j.shipping_address.province || "", j.shipping_address.country || ""].map((jt) => String(jt || "").trim()).filter(Boolean).join(", ") || "-" : typeof j.billing_address == "string" && String(j.billing_address).trim() ? _e = String(j.billing_address).trim() : j.billing_address && typeof j.billing_address == "object" && (_e = [j.billing_address.address1 || "", j.billing_address.city || "", j.billing_address.province || "", j.billing_address.country || ""].map((jt) => String(jt || "").trim()).filter(Boolean).join(", ") || "-");
          const Qe = j.name || j.order_number || j.id, Pe = Qe != null ? String(Qe).replace(/^#+/, "").trim() : "", xt = Pe || "-", Yn = I_(j), nn = FS(Yn), ha = PS(j), na = zS(ha), Vt = US(j), xn = HS(Vt), kt = j.rider ? String(j.rider) : (_t = j.assignment) != null && _t.riderId ? String(j.assignment.riderId) : "Unassigned";
          return /* @__PURE__ */ c.jsxDEV("tr", { "data-status": J, children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name order-id-cell", children: xt }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 195,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-km customer-cell", children: Ne || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 196,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-perf address-cell", children: _e }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 197,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-rider rider-cell", children: kt }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 198,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-start-time start-cell", children: nn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 199,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-expected expected-cell", children: na }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 200,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: xn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 201,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-status status-cell", children: /* @__PURE__ */ c.jsxDEV("div", { className: "status-container", children: [
              /* @__PURE__ */ c.jsxDEV("span", { className: `status-chip status-${J}`, children: te }, void 0, !1, {
                fileName: "/app/code/client/pages/Orders.jsx",
                lineNumber: 204,
                columnNumber: 25
              }, this),
              J === "assigned" && /* @__PURE__ */ c.jsxDEV(
                "button",
                {
                  className: "status-unassign-btn",
                  onClick: () => oe(Pe),
                  "aria-label": "Unassign order",
                  title: "Unassign order",
                  children: "✕"
                },
                void 0,
                !1,
                {
                  fileName: "/app/code/client/pages/Orders.jsx",
                  lineNumber: 206,
                  columnNumber: 27
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 203,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 202,
              columnNumber: 21
            }, this)
          ] }, Qe || Q, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 194,
            columnNumber: 19
          }, this);
        }),
        !U && !H && X.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 8, className: "section-note", children: "No orders to display." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 221,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 221,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 159,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 146,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 145,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: [
      ee && Le && /* @__PURE__ */ c.jsxDEV(BS, { orderId: Le, onClose: re, onAssigned: Re }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 228,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: A.page <= 1 || U, onClick: () => O((j) => Math.max(1, j - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 232,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("span", { className: "section-note", children: [
          "Page ",
          A.page,
          " of ",
          A.pages,
          " • ",
          A.total,
          " total"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 233,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: A.page >= A.pages || U, onClick: () => O((j) => Math.min(A.pages, j + 1)), children: "Next" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 234,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 231,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 226,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 120,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 119,
    columnNumber: 5
  }, this);
}
function W_() {
  const [o, p] = S.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [m, g] = S.useState([]), [y, E] = S.useState(!1), [f, O] = S.useState(!0), [R, T] = S.useState("");
  return S.useEffect(() => {
    let A = !0;
    return (async () => {
      O(!0), T("");
      try {
        const D = await fetch("/api/reports", { credentials: "include" });
        if (D.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!D.ok) throw new Error("Failed to load reports");
        const U = await D.json();
        A && (p(U.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), g(Array.isArray(U.deliveries) ? U.deliveries : []));
      } catch (D) {
        A && T(D.message || "Failed to load reports");
      } finally {
        A && O(!1);
      }
    })(), () => {
      A = !1;
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
          /* @__PURE__ */ c.jsxDEV("input", { type: "checkbox", checked: y, onChange: (A) => E(A.target.checked) }, void 0, !1, {
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
          !f && !R && m.map((A, D) => /* @__PURE__ */ c.jsxDEV("tr", { children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              A.orderNumber || A.orderId
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 81,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-km", children: A.riderId || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 82,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-perf", children: A.expectedMinutes != null ? `${A.expectedMinutes} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 83,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-perf", children: A.durationMins != null ? `${A.durationMins} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 84,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-perf", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 85,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-commission", children: A.status || "new" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 86,
              columnNumber: 23
            }, this)
          ] }, A.orderId || D, !0, {
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
  const [m, g] = S.useState(""), [y, E] = S.useState(""), [f, O] = S.useState(""), [R, T] = S.useState(""), [A, D] = S.useState(!1), [U, L] = S.useState(""), [H, ue] = S.useState(""), [ie, he] = S.useState(!1), [Y, B] = S.useState(!1), [W, ne] = S.useState(!1), [ee, q] = S.useState(!1);
  async function Le() {
    L(""), ue(""), q(!0);
    const I = String(m).trim(), X = String(y), re = String(f).trim(), Re = String(R).trim(), oe = Re.replace(/\D+/g, ""), j = { fn: !re, cn: !Re, pw: !X };
    if (he(j.fn), B(j.cn || oe.length < 7), ne(j.pw), j.fn || j.cn || j.pw) {
      L("Full name, mobile and password are required");
      return;
    }
    if (oe.length < 7) {
      L("Please enter a valid mobile number"), B(!0);
      return;
    }
    if (I && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(I)) {
      L("Please enter a valid email");
      return;
    }
    if (X.length < 6) {
      ne(!0), L("Password must be at least 6 characters");
      return;
    }
    D(!0);
    try {
      const Q = await fetch("/api/packers", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: I, password: X, fullName: re, contactNumber: Re })
      }), te = await Q.json().catch(() => null);
      if (!Q.ok) {
        const J = String(te && (te.error || te.message) || ""), Ne = J.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(J) || /MISSING\s*EMAIL\/PASSWORD/i.test(J))
          L("Full name, mobile and password are required"), he(!re), B(!Re || oe.length < 7), ne(!X);
        else if (Ne.includes("EMAIL_EXISTS"))
          L("An account with this email already exists. Use a different email or leave email blank.");
        else if (Ne.includes("INVALID_EMAIL"))
          L("Please enter a valid email");
        else if (Ne.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(J))
          ne(!0), L("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER/i.test(J))
          B(!0), L("Please enter a valid mobile number");
        else if (/FIREBASE NOT CONFIGURED/i.test(J))
          L("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(J || "Failed to create packer");
        return;
      }
      ue("Packer created successfully"), p && p(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (Q) {
      const te = String((Q == null ? void 0 : Q.message) || "");
      /Missing\s*(fullName\/contactNumber|email\/password)/i.test(te) ? L("Full name, mobile and password are required") : /EMAIL_EXISTS/i.test(te) ? L("An account with this email already exists. Use a different email or leave email blank.") : /INVALID_EMAIL/i.test(te) ? L("Please enter a valid email") : /WEAK_PASSWORD/i.test(te) || /AT LEAST 6 CHARACTERS/i.test(te) ? (ne(!0), L("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER/i.test(te) ? (B(!0), L("Please enter a valid mobile number")) : L(te || "Failed to create packer");
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
      H && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-success", children: H }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 98,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ c.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (ee && !String(f).trim() ? " input-error" : ""), value: f, onChange: (I) => {
          O(I.target.value), ee && he(!String(I.target.value).trim());
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input", type: "email", value: m, onChange: (I) => {
          g(I.target.value);
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (ee && !String(y) ? " input-error" : ""), type: "password", value: y, onChange: (I) => {
          E(I.target.value), ee && ne(!String(I.target.value));
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (ee && String(R).trim().replace(/\D+/g, "").length < 7 ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: R, onChange: (I) => {
          if (T(I.target.value), ee) {
            const X = String(I.target.value).trim().replace(/\D+/g, "");
            B(!(X.length >= 7));
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
      U && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: U }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 111,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary", onClick: o, disabled: A, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 113,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-primary", onClick: Le, disabled: A, children: A ? "Creating…" : "Create" }, void 0, !1, {
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
  const [o, p] = S.useState([]), [m, g] = S.useState(!0), [y, E] = S.useState(""), [f, O] = S.useState(1), [R, T] = S.useState(25), [A, D] = S.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  S.useEffect(() => {
    let ee = !0;
    return (async () => {
      var q, Le, I, X;
      g(!0), E("");
      try {
        const re = new URLSearchParams();
        re.set("limit", String(R)), re.set("page", String(f)), re.set("status", "new");
        const Re = await fetch(`/api/orders?${re.toString()}`, { credentials: "include" });
        if (Re.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Re.ok) throw new Error("Failed to load orders");
        const oe = await Re.json();
        ee && (p(Array.isArray(oe.orders) ? oe.orders : []), D({ total: ((q = oe.meta) == null ? void 0 : q.total) || 0, page: ((Le = oe.meta) == null ? void 0 : Le.page) || f, limit: ((I = oe.meta) == null ? void 0 : I.limit) || R, pages: ((X = oe.meta) == null ? void 0 : X.pages) || 1 }));
      } catch (re) {
        ee && E(re.message || "Failed to load orders");
      } finally {
        ee && g(!1);
      }
    })(), () => {
      ee = !1;
    };
  }, [f]);
  function U(ee) {
    return !ee || typeof ee != "object" ? "new" : typeof ee.current_status == "string" && String(ee.current_status).trim() ? String(ee.current_status).toLowerCase().trim() : "new";
  }
  const [L, H] = S.useState(!1), [ue, ie] = S.useState(null), [he, Y] = S.useState(!1);
  function B(ee) {
    ie(ee), H(!0);
  }
  function W() {
    ie(null), H(!1);
  }
  function ne(ee) {
    try {
      const { orderId: q } = ee || {};
      if (!q) return;
      const Le = String(q).replace(/^#+/, "");
      p((I) => I.filter((X, re) => {
        const Re = String(X.id || X.name || X.order_number || re).replace(/^#+/, "");
        return String(Re) !== String(Le);
      })), D((I) => ({ ...I || {}, total: Math.max(0, ((I == null ? void 0 : I.total) || 0) - 1) }));
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${q}`, { type: "success" });
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
          /* @__PURE__ */ c.jsxDEV("div", { className: "stat-value", children: m ? "…" : A.total || o.length }, void 0, !1, {
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
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary btn-create-packer", onClick: () => Y(!0), children: "Create Packer" }, void 0, !1, {
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
        !m && !y && (Array.isArray(o) ? o.filter((q) => U(q) === "new") : []).map((q, Le) => {
          const I = U(q), X = q.full_name || (q.customer && q.customer.full_name ? q.customer.full_name : "");
          let re = "-";
          typeof q.shipping_address == "string" && String(q.shipping_address).trim() ? re = String(q.shipping_address).trim() : q.shipping_address && typeof q.shipping_address == "object" ? re = [q.shipping_address.address1 || "", q.shipping_address.city || "", q.shipping_address.province || "", q.shipping_address.country || ""].map((J) => String(J || "").trim()).filter(Boolean).join(", ") || "-" : typeof q.billing_address == "string" && String(q.billing_address).trim() ? re = String(q.billing_address).trim() : q.billing_address && typeof q.billing_address == "object" && (re = [q.billing_address.address1 || "", q.billing_address.city || "", q.billing_address.province || "", q.billing_address.country || ""].map((J) => String(J || "").trim()).filter(Boolean).join(", ") || "-");
          const Re = q.name || q.order_number || q.id || Le, oe = String(q.id || q.name || q.order_number || Le).replace(/^#+/, ""), j = q.created_at ? new Date(q.created_at) : null, Q = j ? j.toLocaleDateString() : "-", te = j ? j.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ c.jsxDEV("tr", { "data-status": I, children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-order", children: Re }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 126,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-customer", children: X || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 127,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-address", children: re }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 128,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ c.jsxDEV("span", { className: `status-chip status-${I}`, children: I.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 129,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 129,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-date", children: Q }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 130,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-time", children: te }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 131,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ c.jsxDEV("button", { className: "order-action btn-manage", onClick: () => B(String(q.id || q.name || q.order_number || Le)), children: "Assign" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 132,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 132,
              columnNumber: 23
            }, this)
          ] }, oe, !0, {
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
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: A.page <= 1 || m, onClick: () => O((ee) => Math.max(1, ee - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 144,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        A.page,
        " of ",
        A.pages,
        " • ",
        A.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 145,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: A.page >= A.pages || m, onClick: () => O((ee) => Math.min(A.pages, ee + 1)), children: "Next" }, void 0, !1, {
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
    L && ue && /* @__PURE__ */ c.jsxDEV(BS, { orderId: ue, onClose: W, onAssigned: ne }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 151,
      columnNumber: 11
    }, this),
    he && /* @__PURE__ */ c.jsxDEV(K_, { onClose: () => Y(!1), onCreated: () => {
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
  const [o, p] = S.useState(ma.baseFare), [m, g] = S.useState(ma.farePerKm), [y, E] = S.useState(!1);
  S.useEffect(() => {
    const R = MS();
    p(R.baseFare), g(R.farePerKm);
  }, []);
  function f() {
    E(!0);
    try {
      const R = { baseFare: Number(o) || 0, farePerKm: Number(m) || 0 };
      if (typeof window < "u" && window.localStorage) {
        window.localStorage.setItem(Sf, JSON.stringify(R));
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
  function O() {
    p(ma.baseFare), g(ma.farePerKm);
    try {
      if (typeof window < "u" && window.localStorage) {
        window.localStorage.removeItem(Sf);
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
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary", onClick: O, disabled: y, children: "Reset" }, void 0, !1, {
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
function hS() {
  const o = document.getElementById("react-root");
  if (!o) return;
  ES(o).render(/* @__PURE__ */ c.jsxDEV(J_, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", hS) : hS();
