function a1(o, p) {
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
function r1(o) {
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
    var m = "18.3.1", g = Symbol.for("react.element"), y = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), T = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), C = Symbol.for("react.suspense"), k = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), se = Symbol.for("react.offscreen"), ie = Symbol.iterator, ve = "@@iterator";
    function q(d) {
      if (d === null || typeof d != "object")
        return null;
      var b = ie && d[ie] || d[ve];
      return typeof b == "function" ? b : null;
    }
    var Y = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, J = {
      transition: null
    }, Z = {
      current: null,
      // Used to reproduce behavior of `batchedUpdates` in legacy mode.
      isBatchingLegacy: !1,
      didScheduleLegacyUpdate: !1
    }, re = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, U = {}, be = null;
    function K(d) {
      be = d;
    }
    U.setExtraStackFrame = function(d) {
      be = d;
    }, U.getCurrentStack = null, U.getStackAddendum = function() {
      var d = "";
      be && (d += be);
      var b = U.getCurrentStack;
      return b && (d += b() || ""), d;
    };
    var ee = !1, ne = !1, I = !1, Q = !1, F = !1, oe = {
      ReactCurrentDispatcher: Y,
      ReactCurrentBatchConfig: J,
      ReactCurrentOwner: re
    };
    oe.ReactDebugCurrentFrame = U, oe.ReactCurrentActQueue = Z;
    function pe(d) {
      {
        for (var b = arguments.length, V = new Array(b > 1 ? b - 1 : 0), z = 1; z < b; z++)
          V[z - 1] = arguments[z];
        ze("warn", d, V);
      }
    }
    function ae(d) {
      {
        for (var b = arguments.length, V = new Array(b > 1 ? b - 1 : 0), z = 1; z < b; z++)
          V[z - 1] = arguments[z];
        ze("error", d, V);
      }
    }
    function ze(d, b, V) {
      {
        var z = oe.ReactDebugCurrentFrame, te = z.getStackAddendum();
        te !== "" && (b += "%s", V = V.concat([te]));
        var Te = V.map(function(Ne) {
          return String(Ne);
        });
        Te.unshift("Warning: " + b), Function.prototype.apply.call(console[d], console, Te);
      }
    }
    var We = {};
    function lt(d, b) {
      {
        var V = d.constructor, z = V && (V.displayName || V.name) || "ReactClass", te = z + "." + b;
        if (We[te])
          return;
        ae("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", b, z), We[te] = !0;
      }
    }
    var dt = {
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
        lt(d, "forceUpdate");
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
      enqueueReplaceState: function(d, b, V, z) {
        lt(d, "replaceState");
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
      enqueueSetState: function(d, b, V, z) {
        lt(d, "setState");
      }
    }, xt = Object.assign, In = {};
    Object.freeze(In);
    function nn(d, b, V) {
      this.props = d, this.context = b, this.refs = In, this.updater = V || dt;
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
            pe("%s(...) is deprecated in plain JavaScript React classes. %s", b[0], b[1]);
          }
        });
      };
      for (var Lt in ha)
        ha.hasOwnProperty(Lt) && na(Lt, ha[Lt]);
    }
    function xn() {
    }
    xn.prototype = nn.prototype;
    function kt(d, b, V) {
      this.props = d, this.context = b, this.refs = In, this.updater = V || dt;
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
        return ae("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Rn(d)), Qt(d);
    }
    function rr(d, b, V) {
      var z = d.displayName;
      if (z)
        return z;
      var te = b.displayName || b.name || "";
      return te !== "" ? V + "(" + te + ")" : V;
    }
    function ga(d) {
      return d.displayName || "Context";
    }
    function Un(d) {
      if (d == null)
        return null;
      if (typeof d.tag == "number" && ae("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof d == "function")
        return d.displayName || d.name || null;
      if (typeof d == "string")
        return d;
      switch (d) {
        case S:
          return "Fragment";
        case y:
          return "Portal";
        case A:
          return "Profiler";
        case f:
          return "StrictMode";
        case C:
          return "Suspense";
        case k:
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
          case _:
            return rr(d, d.render, "ForwardRef");
          case O:
            var z = d.displayName || null;
            return z !== null ? z : Un(d.type) || "Memo";
          case B: {
            var te = d, Te = te._payload, Ne = te._init;
            try {
              return Un(Ne(Te));
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
        Cn || (Cn = !0, ae("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      V.isReactWarning = !0, Object.defineProperty(d, "key", {
        get: V,
        configurable: !0
      });
    }
    function ir(d, b) {
      var V = function() {
        Pa || (Pa = !0, ae("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      V.isReactWarning = !0, Object.defineProperty(d, "ref", {
        get: V,
        configurable: !0
      });
    }
    function ue(d) {
      if (typeof d.ref == "string" && re.current && d.__self && re.current.stateNode !== d.__self) {
        var b = Un(re.current.type);
        Ut[b] || (ae('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', b, d.ref), Ut[b] = !0);
      }
    }
    var Se = function(d, b, V, z, te, Te, Ne) {
      var Ae = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: d,
        key: b,
        ref: V,
        props: Ne,
        // Record the component responsible for creating this element.
        _owner: Te
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
        value: z
      }), Object.defineProperty(Ae, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: te
      }), Object.freeze && (Object.freeze(Ae.props), Object.freeze(Ae)), Ae;
    };
    function Fe(d, b, V) {
      var z, te = {}, Te = null, Ne = null, Ae = null, Ye = null;
      if (b != null) {
        Dn(b) && (Ne = b.ref, ue(b)), Fn(b) && (aa(b.key), Te = "" + b.key), Ae = b.__self === void 0 ? null : b.__self, Ye = b.__source === void 0 ? null : b.__source;
        for (z in b)
          mn.call(b, z) && !an.hasOwnProperty(z) && (te[z] = b[z]);
      }
      var nt = arguments.length - 2;
      if (nt === 1)
        te.children = V;
      else if (nt > 1) {
        for (var ut = Array(nt), ct = 0; ct < nt; ct++)
          ut[ct] = arguments[ct + 2];
        Object.freeze && Object.freeze(ut), te.children = ut;
      }
      if (d && d.defaultProps) {
        var He = d.defaultProps;
        for (z in He)
          te[z] === void 0 && (te[z] = He[z]);
      }
      if (Te || Ne) {
        var yt = typeof d == "function" ? d.displayName || d.name || "Unknown" : d;
        Te && Ar(te, yt), Ne && ir(te, yt);
      }
      return Se(d, Te, Ne, Ae, Ye, re.current, te);
    }
    function tt(d, b) {
      var V = Se(d.type, b, d.ref, d._self, d._source, d._owner, d.props);
      return V;
    }
    function pt(d, b, V) {
      if (d == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + d + ".");
      var z, te = xt({}, d.props), Te = d.key, Ne = d.ref, Ae = d._self, Ye = d._source, nt = d._owner;
      if (b != null) {
        Dn(b) && (Ne = b.ref, nt = re.current), Fn(b) && (aa(b.key), Te = "" + b.key);
        var ut;
        d.type && d.type.defaultProps && (ut = d.type.defaultProps);
        for (z in b)
          mn.call(b, z) && !an.hasOwnProperty(z) && (b[z] === void 0 && ut !== void 0 ? te[z] = ut[z] : te[z] = b[z]);
      }
      var ct = arguments.length - 2;
      if (ct === 1)
        te.children = V;
      else if (ct > 1) {
        for (var He = Array(ct), yt = 0; yt < ct; yt++)
          He[yt] = arguments[yt + 2];
        te.children = He;
      }
      return Se(d.type, Te, Ne, Ae, Ye, nt, te);
    }
    function Nt(d) {
      return typeof d == "object" && d !== null && d.$$typeof === g;
    }
    var Et = ".", vn = ":";
    function Rt(d) {
      var b = /[=:]/g, V = {
        "=": "=0",
        ":": "=2"
      }, z = d.replace(b, function(te) {
        return V[te];
      });
      return "$" + z;
    }
    var ot = !1, Ct = /\/+/g;
    function ya(d) {
      return d.replace(Ct, "$&/");
    }
    function ba(d, b) {
      return typeof d == "object" && d !== null && d.key != null ? (aa(d.key), Rt("" + d.key)) : b.toString(36);
    }
    function ra(d, b, V, z, te) {
      var Te = typeof d;
      (Te === "undefined" || Te === "boolean") && (d = null);
      var Ne = !1;
      if (d === null)
        Ne = !0;
      else
        switch (Te) {
          case "string":
          case "number":
            Ne = !0;
            break;
          case "object":
            switch (d.$$typeof) {
              case g:
              case y:
                Ne = !0;
            }
        }
      if (Ne) {
        var Ae = d, Ye = te(Ae), nt = z === "" ? Et + ba(Ae, 0) : z;
        if (Wt(Ye)) {
          var ut = "";
          nt != null && (ut = ya(nt) + "/"), ra(Ye, b, ut, "", function(_f) {
            return _f;
          });
        } else Ye != null && (Nt(Ye) && (Ye.key && (!Ae || Ae.key !== Ye.key) && aa(Ye.key), Ye = tt(
          Ye,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          V + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          (Ye.key && (!Ae || Ae.key !== Ye.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            ya("" + Ye.key) + "/"
          ) : "") + nt
        )), b.push(Ye));
        return 1;
      }
      var ct, He, yt = 0, Ot = z === "" ? Et : z + vn;
      if (Wt(d))
        for (var Ei = 0; Ei < d.length; Ei++)
          ct = d[Ei], He = Ot + ba(ct, Ei), yt += ra(ct, b, V, He, te);
      else {
        var Eo = q(d);
        if (typeof Eo == "function") {
          var ur = d;
          Eo === ur.entries && (ot || pe("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), ot = !0);
          for (var So = Eo.call(ur), xo, wf = 0; !(xo = So.next()).done; )
            ct = xo.value, He = Ot + ba(ct, wf++), yt += ra(ct, b, V, He, te);
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
      var z = [], te = 0;
      return ra(d, z, "", "", function(Te) {
        return b.call(V, Te, te++);
      }), z;
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
      var V = !1, z = !1, te = !1;
      {
        var Te = {
          $$typeof: T,
          _context: b
        };
        Object.defineProperties(Te, {
          Provider: {
            get: function() {
              return z || (z = !0, ae("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), b.Provider;
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
              return V || (V = !0, ae("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), b.Consumer;
            }
          },
          displayName: {
            get: function() {
              return b.displayName;
            },
            set: function(Ne) {
              te || (pe("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", Ne), te = !0);
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
            var Ne = d;
            Ne._status = qn, Ne._result = Te;
          }
        }, function(Te) {
          if (d._status === ia || d._status === Na) {
            var Ne = d;
            Ne._status = Ha, Ne._result = Te;
          }
        }), d._status === Na) {
          var z = d;
          z._status = ia, z._result = V;
        }
      }
      if (d._status === qn) {
        var te = d._result;
        return te === void 0 && ae(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, te), "default" in te || ae(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, te), te.default;
      } else
        throw d._result;
    }
    function N(d) {
      var b = {
        // We use these fields to store the result.
        _status: Na,
        _result: d
      }, V = {
        $$typeof: B,
        _payload: b,
        _init: pi
      };
      {
        var z, te;
        Object.defineProperties(V, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return z;
            },
            set: function(Te) {
              ae("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), z = Te, Object.defineProperty(V, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return te;
            },
            set: function(Te) {
              ae("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), te = Te, Object.defineProperty(V, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return V;
    }
    function W(d) {
      d != null && d.$$typeof === O ? ae("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof d != "function" ? ae("forwardRef requires a render function but was given %s.", d === null ? "null" : typeof d) : d.length !== 0 && d.length !== 2 && ae("forwardRef render functions accept exactly two parameters: props and ref. %s", d.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), d != null && (d.defaultProps != null || d.propTypes != null) && ae("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var b = {
        $$typeof: _,
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
          set: function(z) {
            V = z, !d.name && !d.displayName && (d.displayName = z);
          }
        });
      }
      return b;
    }
    var ce;
    ce = Symbol.for("react.module.reference");
    function xe(d) {
      return !!(typeof d == "string" || typeof d == "function" || d === S || d === A || F || d === f || d === C || d === k || Q || d === se || ee || ne || I || typeof d == "object" && d !== null && (d.$$typeof === B || d.$$typeof === O || d.$$typeof === R || d.$$typeof === T || d.$$typeof === _ || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      d.$$typeof === ce || d.getModuleId !== void 0));
    }
    function $e(d, b) {
      xe(d) || ae("memo: The first argument must be a component. Instead received: %s", d === null ? "null" : typeof d);
      var V = {
        $$typeof: O,
        type: d,
        compare: b === void 0 ? null : b
      };
      {
        var z;
        Object.defineProperty(V, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return z;
          },
          set: function(te) {
            z = te, !d.name && !d.displayName && (d.displayName = te);
          }
        });
      }
      return V;
    }
    function _e() {
      var d = Y.current;
      return d === null && ae(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), d;
    }
    function ke(d) {
      var b = _e();
      if (d._context !== void 0) {
        var V = d._context;
        V.Consumer === d ? ae("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : V.Provider === d && ae("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return b.useContext(d);
    }
    function Ce(d) {
      var b = _e();
      return b.useState(d);
    }
    function Ft(d, b, V) {
      var z = _e();
      return z.useReducer(d, b, V);
    }
    function mt(d) {
      var b = _e();
      return b.useRef(d);
    }
    function vt(d, b) {
      var V = _e();
      return V.useEffect(d, b);
    }
    function hn(d, b) {
      var V = _e();
      return V.useInsertionEffect(d, b);
    }
    function Ba(d, b) {
      var V = _e();
      return V.useLayoutEffect(d, b);
    }
    function Ea(d, b) {
      var V = _e();
      return V.useCallback(d, b);
    }
    function zt(d, b) {
      var V = _e();
      return V.useMemo(d, b);
    }
    function mi(d, b, V) {
      var z = _e();
      return z.useImperativeHandle(d, b, V);
    }
    function Sa(d, b) {
      {
        var V = _e();
        return V.useDebugValue(d, b);
      }
    }
    function Pe() {
      var d = _e();
      return d.useTransition();
    }
    function vi(d) {
      var b = _e();
      return b.useDeferredValue(d);
    }
    function iu() {
      var d = _e();
      return d.useId();
    }
    function lu(d, b, V) {
      var z = _e();
      return z.useSyncExternalStore(d, b, V);
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
        Vr < 0 && ae("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var hi = oe.ReactCurrentDispatcher, Lr;
    function tl(d, b, V) {
      {
        if (Lr === void 0)
          try {
            throw Error();
          } catch (te) {
            var z = te.stack.trim().match(/\n( *(at )?)/);
            Lr = z && z[1] || "";
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
        var V = nl.get(d);
        if (V !== void 0)
          return V;
      }
      var z;
      gi = !0;
      var te = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Te;
      Te = hi.current, hi.current = null, fo();
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
            } catch (Ot) {
              z = Ot;
            }
            Reflect.construct(d, [], Ne);
          } else {
            try {
              Ne.call();
            } catch (Ot) {
              z = Ot;
            }
            d.call(Ne.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ot) {
            z = Ot;
          }
          d();
        }
      } catch (Ot) {
        if (Ot && z && typeof Ot.stack == "string") {
          for (var Ae = Ot.stack.split(`
`), Ye = z.stack.split(`
`), nt = Ae.length - 1, ut = Ye.length - 1; nt >= 1 && ut >= 0 && Ae[nt] !== Ye[ut]; )
            ut--;
          for (; nt >= 1 && ut >= 0; nt--, ut--)
            if (Ae[nt] !== Ye[ut]) {
              if (nt !== 1 || ut !== 1)
                do
                  if (nt--, ut--, ut < 0 || Ae[nt] !== Ye[ut]) {
                    var ct = `
` + Ae[nt].replace(" at new ", " at ");
                    return d.displayName && ct.includes("<anonymous>") && (ct = ct.replace("<anonymous>", d.displayName)), typeof d == "function" && nl.set(d, ct), ct;
                  }
                while (nt >= 1 && ut >= 0);
              break;
            }
        }
      } finally {
        gi = !1, hi.current = Te, $a(), Error.prepareStackTrace = te;
      }
      var He = d ? d.displayName || d.name : "", yt = He ? tl(He) : "";
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
        case C:
          return tl("Suspense");
        case k:
          return tl("SuspenseList");
      }
      if (typeof d == "object")
        switch (d.$$typeof) {
          case _:
            return mo(d.render);
          case O:
            return yi(d.type, b, V);
          case B: {
            var z = d, te = z._payload, Te = z._init;
            try {
              return yi(Te(te), b, V);
            } catch {
            }
          }
        }
      return "";
    }
    var cu = {}, vo = oe.ReactDebugCurrentFrame;
    function Xe(d) {
      if (d) {
        var b = d._owner, V = yi(d.type, d._source, b ? b.type : null);
        vo.setExtraStackFrame(V);
      } else
        vo.setExtraStackFrame(null);
    }
    function Cf(d, b, V, z, te) {
      {
        var Te = Function.call.bind(mn);
        for (var Ne in d)
          if (Te(d, Ne)) {
            var Ae = void 0;
            try {
              if (typeof d[Ne] != "function") {
                var Ye = Error((z || "React class") + ": " + V + " type `" + Ne + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof d[Ne] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Ye.name = "Invariant Violation", Ye;
              }
              Ae = d[Ne](b, Ne, z, V, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (nt) {
              Ae = nt;
            }
            Ae && !(Ae instanceof Error) && (Xe(te), ae("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", z || "React class", V, Ne, typeof Ae), Xe(null)), Ae instanceof Error && !(Ae.message in cu) && (cu[Ae.message] = !0, Xe(te), ae("Failed %s type: %s", V, Ae.message), Xe(null));
          }
      }
    }
    function or(d) {
      if (d) {
        var b = d._owner, V = yi(d.type, d._source, b ? b.type : null);
        K(V);
      } else
        K(null);
    }
    var Le;
    Le = !1;
    function ho() {
      if (re.current) {
        var d = Un(re.current.type);
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
          var z = "";
          d && d._owner && d._owner !== re.current && (z = " It was passed a child from " + Un(d._owner.type) + "."), or(d), ae('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', V, z), or(null);
        }
      }
    }
    function gt(d, b) {
      if (typeof d == "object") {
        if (Wt(d))
          for (var V = 0; V < d.length; V++) {
            var z = d[V];
            Nt(z) && Xt(z, b);
          }
        else if (Nt(d))
          d._store && (d._store.validated = !0);
        else if (d) {
          var te = q(d);
          if (typeof te == "function" && te !== d.entries)
            for (var Te = te.call(d), Ne; !(Ne = Te.next()).done; )
              Nt(Ne.value) && Xt(Ne.value, b);
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
        else if (typeof b == "object" && (b.$$typeof === _ || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        b.$$typeof === O))
          V = b.propTypes;
        else
          return;
        if (V) {
          var z = Un(b);
          Cf(V, d.props, "prop", z, d);
        } else if (b.PropTypes !== void 0 && !Le) {
          Le = !0;
          var te = Un(b);
          ae("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", te || "Unknown");
        }
        typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && ae("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function la(d) {
      {
        for (var b = Object.keys(d.props), V = 0; V < b.length; V++) {
          var z = b[V];
          if (z !== "children" && z !== "key") {
            or(d), ae("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", z), or(null);
            break;
          }
        }
        d.ref !== null && (or(d), ae("Invalid attribute `ref` supplied to `React.Fragment`."), or(null));
      }
    }
    function jn(d, b, V) {
      var z = xe(d);
      if (!z) {
        var te = "";
        (d === void 0 || typeof d == "object" && d !== null && Object.keys(d).length === 0) && (te += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Te = bi(b);
        Te ? te += Te : te += ho();
        var Ne;
        d === null ? Ne = "null" : Wt(d) ? Ne = "array" : d !== void 0 && d.$$typeof === g ? (Ne = "<" + (Un(d.type) || "Unknown") + " />", te = " Did you accidentally export a JSX literal instead of a component?") : Ne = typeof d, ae("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Ne, te);
      }
      var Ae = Fe.apply(this, arguments);
      if (Ae == null)
        return Ae;
      if (z)
        for (var Ye = 2; Ye < arguments.length; Ye++)
          gt(arguments[Ye], d);
      return d === S ? la(Ae) : fu(Ae), Ae;
    }
    var xa = !1;
    function Tf(d) {
      var b = jn.bind(null, d);
      return b.type = d, xa || (xa = !0, pe("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(b, "type", {
        enumerable: !1,
        get: function() {
          return pe("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: d
          }), d;
        }
      }), b;
    }
    function go(d, b, V) {
      for (var z = pt.apply(this, arguments), te = 2; te < arguments.length; te++)
        gt(arguments[te], z.type);
      return fu(z), z;
    }
    function du(d, b) {
      var V = J.transition;
      J.transition = {};
      var z = J.transition;
      J.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        d();
      } finally {
        if (J.transition = V, V === null && z._updatedFibers) {
          var te = z._updatedFibers.size;
          te > 10 && pe("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), z._updatedFibers.clear();
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
          al = function(te) {
            yo === !1 && (yo = !0, typeof MessageChannel > "u" && ae("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var Te = new MessageChannel();
            Te.port1.onmessage = te, Te.port2.postMessage(void 0);
          };
        }
      return al(d);
    }
    var Ur = 0, Ni = !1;
    function bo(d) {
      {
        var b = Ur;
        Ur++, Z.current === null && (Z.current = []);
        var V = Z.isBatchingLegacy, z;
        try {
          if (Z.isBatchingLegacy = !0, z = d(), !V && Z.didScheduleLegacyUpdate) {
            var te = Z.current;
            te !== null && (Z.didScheduleLegacyUpdate = !1, ll(te));
          }
        } catch (He) {
          throw sr(b), He;
        } finally {
          Z.isBatchingLegacy = V;
        }
        if (z !== null && typeof z == "object" && typeof z.then == "function") {
          var Te = z, Ne = !1, Ae = {
            then: function(He, yt) {
              Ne = !0, Te.then(function(Ot) {
                sr(b), Ur === 0 ? rl(Ot, He, yt) : He(Ot);
              }, function(Ot) {
                sr(b), yt(Ot);
              });
            }
          };
          return !Ni && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            Ne || (Ni = !0, ae("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Ae;
        } else {
          var Ye = z;
          if (sr(b), Ur === 0) {
            var nt = Z.current;
            nt !== null && (ll(nt), Z.current = null);
            var ut = {
              then: function(He, yt) {
                Z.current === null ? (Z.current = [], rl(Ye, He, yt)) : He(Ye);
              }
            };
            return ut;
          } else {
            var ct = {
              then: function(He, yt) {
                He(Ye);
              }
            };
            return ct;
          }
        }
      }
    }
    function sr(d) {
      d !== Ur - 1 && ae("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ur = d;
    }
    function rl(d, b, V) {
      {
        var z = Z.current;
        if (z !== null)
          try {
            ll(z), jf(function() {
              z.length === 0 ? (Z.current = null, b(d)) : rl(d, b, V);
            });
          } catch (te) {
            V(te);
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
    p.Children = vu, p.Component = nn, p.Fragment = S, p.Profiler = A, p.PureComponent = kt, p.StrictMode = f, p.Suspense = C, p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = oe, p.act = bo, p.cloneElement = mu, p.createContext = di, p.createElement = pu, p.createFactory = No, p.createRef = jt, p.forwardRef = W, p.isValidElement = Nt, p.lazy = N, p.memo = $e, p.startTransition = du, p.unstable_act = bo, p.useCallback = Ea, p.useContext = ke, p.useDebugValue = Sa, p.useDeferredValue = vi, p.useEffect = vt, p.useId = iu, p.useImperativeHandle = mi, p.useInsertionEffect = hn, p.useLayoutEffect = Ba, p.useMemo = zt, p.useReducer = Ft, p.useRef = mt, p.useState = Ce, p.useSyncExternalStore = lu, p.useTransition = Pe, p.version = m, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(bf, bf.exports);
var i1 = bf.exports;
yE.exports = i1;
var E = yE.exports;
const l1 = /* @__PURE__ */ r1(E), o1 = /* @__PURE__ */ a1({
  __proto__: null,
  default: l1
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
  var o = E, p = Symbol.for("react.element"), m = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), A = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), O = Symbol.for("react.offscreen"), B = Symbol.iterator, se = "@@iterator";
  function ie(N) {
    if (N === null || typeof N != "object")
      return null;
    var W = B && N[B] || N[se];
    return typeof W == "function" ? W : null;
  }
  var ve = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function q(N) {
    {
      for (var W = arguments.length, ce = new Array(W > 1 ? W - 1 : 0), xe = 1; xe < W; xe++)
        ce[xe - 1] = arguments[xe];
      Y("error", N, ce);
    }
  }
  function Y(N, W, ce) {
    {
      var xe = ve.ReactDebugCurrentFrame, $e = xe.getStackAddendum();
      $e !== "" && (W += "%s", ce = ce.concat([$e]));
      var _e = ce.map(function(ke) {
        return String(ke);
      });
      _e.unshift("Warning: " + W), Function.prototype.apply.call(console[N], console, _e);
    }
  }
  var J = !1, Z = !1, re = !1, U = !1, be = !1, K;
  K = Symbol.for("react.module.reference");
  function ee(N) {
    return !!(typeof N == "string" || typeof N == "function" || N === g || N === S || be || N === y || N === T || N === _ || U || N === O || J || Z || re || typeof N == "object" && N !== null && (N.$$typeof === k || N.$$typeof === C || N.$$typeof === f || N.$$typeof === A || N.$$typeof === R || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    N.$$typeof === K || N.getModuleId !== void 0));
  }
  function ne(N, W, ce) {
    var xe = N.displayName;
    if (xe)
      return xe;
    var $e = W.displayName || W.name || "";
    return $e !== "" ? ce + "(" + $e + ")" : ce;
  }
  function I(N) {
    return N.displayName || "Context";
  }
  function Q(N) {
    if (N == null)
      return null;
    if (typeof N.tag == "number" && q("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof N == "function")
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
      case _:
        return "SuspenseList";
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case A:
          var W = N;
          return I(W) + ".Consumer";
        case f:
          var ce = N;
          return I(ce._context) + ".Provider";
        case R:
          return ne(N, N.render, "ForwardRef");
        case C:
          var xe = N.displayName || null;
          return xe !== null ? xe : Q(N.type) || "Memo";
        case k: {
          var $e = N, _e = $e._payload, ke = $e._init;
          try {
            return Q(ke(_e));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var F = Object.assign, oe = 0, pe, ae, ze, We, lt, dt, xt;
  function In() {
  }
  In.__reactDisabledLog = !0;
  function nn() {
    {
      if (oe === 0) {
        pe = console.log, ae = console.info, ze = console.warn, We = console.error, lt = console.group, dt = console.groupCollapsed, xt = console.groupEnd;
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
      oe++;
    }
  }
  function ha() {
    {
      if (oe--, oe === 0) {
        var N = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: F({}, N, {
            value: pe
          }),
          info: F({}, N, {
            value: ae
          }),
          warn: F({}, N, {
            value: ze
          }),
          error: F({}, N, {
            value: We
          }),
          group: F({}, N, {
            value: lt
          }),
          groupCollapsed: F({}, N, {
            value: dt
          }),
          groupEnd: F({}, N, {
            value: xt
          })
        });
      }
      oe < 0 && q("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var na = ve.ReactCurrentDispatcher, Lt;
  function xn(N, W, ce) {
    {
      if (Lt === void 0)
        try {
          throw Error();
        } catch ($e) {
          var xe = $e.stack.trim().match(/\n( *(at )?)/);
          Lt = xe && xe[1] || "";
        }
      return `
` + Lt + N;
    }
  }
  var kt = !1, _t;
  {
    var jt = typeof WeakMap == "function" ? WeakMap : Map;
    _t = new jt();
  }
  function kn(N, W) {
    if (!N || kt)
      return "";
    {
      var ce = _t.get(N);
      if (ce !== void 0)
        return ce;
    }
    var xe;
    kt = !0;
    var $e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var _e;
    _e = na.current, na.current = null, nn();
    try {
      if (W) {
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
          } catch (zt) {
            xe = zt;
          }
          Reflect.construct(N, [], ke);
        } else {
          try {
            ke.call();
          } catch (zt) {
            xe = zt;
          }
          N.call(ke.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (zt) {
          xe = zt;
        }
        N();
      }
    } catch (zt) {
      if (zt && xe && typeof zt.stack == "string") {
        for (var Ce = zt.stack.split(`
`), Ft = xe.stack.split(`
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
      kt = !1, na.current = _e, ha(), Error.prepareStackTrace = $e;
    }
    var Ba = N ? N.displayName || N.name : "", Ea = Ba ? xn(Ba) : "";
    return typeof N == "function" && _t.set(N, Ea), Ea;
  }
  function Wt(N, W, ce) {
    return kn(N, !1);
  }
  function Rn(N) {
    var W = N.prototype;
    return !!(W && W.isReactComponent);
  }
  function Kt(N, W, ce) {
    if (N == null)
      return "";
    if (typeof N == "function")
      return kn(N, Rn(N));
    if (typeof N == "string")
      return xn(N);
    switch (N) {
      case T:
        return xn("Suspense");
      case _:
        return xn("SuspenseList");
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case R:
          return Wt(N.render);
        case C:
          return Kt(N.type, W, ce);
        case k: {
          var xe = N, $e = xe._payload, _e = xe._init;
          try {
            return Kt(_e($e), W, ce);
          } catch {
          }
        }
      }
    return "";
  }
  var Qt = Object.prototype.hasOwnProperty, aa = {}, rr = ve.ReactDebugCurrentFrame;
  function ga(N) {
    if (N) {
      var W = N._owner, ce = Kt(N.type, N._source, W ? W.type : null);
      rr.setExtraStackFrame(ce);
    } else
      rr.setExtraStackFrame(null);
  }
  function Un(N, W, ce, xe, $e) {
    {
      var _e = Function.call.bind(Qt);
      for (var ke in N)
        if (_e(N, ke)) {
          var Ce = void 0;
          try {
            if (typeof N[ke] != "function") {
              var Ft = Error((xe || "React class") + ": " + ce + " type `" + ke + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof N[ke] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw Ft.name = "Invariant Violation", Ft;
            }
            Ce = N[ke](W, ke, xe, ce, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (mt) {
            Ce = mt;
          }
          Ce && !(Ce instanceof Error) && (ga($e), q("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", xe || "React class", ce, ke, typeof Ce), ga(null)), Ce instanceof Error && !(Ce.message in aa) && (aa[Ce.message] = !0, ga($e), q("Failed %s type: %s", ce, Ce.message), ga(null));
        }
    }
  }
  var mn = Array.isArray;
  function an(N) {
    return mn(N);
  }
  function Cn(N) {
    {
      var W = typeof Symbol == "function" && Symbol.toStringTag, ce = W && N[Symbol.toStringTag] || N.constructor.name || "Object";
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
      return q("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Cn(N)), Ut(N);
  }
  var Fn = ve.ReactCurrentOwner, Ar = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, ir, ue, Se;
  Se = {};
  function Fe(N) {
    if (Qt.call(N, "ref")) {
      var W = Object.getOwnPropertyDescriptor(N, "ref").get;
      if (W && W.isReactWarning)
        return !1;
    }
    return N.ref !== void 0;
  }
  function tt(N) {
    if (Qt.call(N, "key")) {
      var W = Object.getOwnPropertyDescriptor(N, "key").get;
      if (W && W.isReactWarning)
        return !1;
    }
    return N.key !== void 0;
  }
  function pt(N, W) {
    if (typeof N.ref == "string" && Fn.current && W && Fn.current.stateNode !== W) {
      var ce = Q(Fn.current.type);
      Se[ce] || (q('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Q(Fn.current.type), N.ref), Se[ce] = !0);
    }
  }
  function Nt(N, W) {
    {
      var ce = function() {
        ir || (ir = !0, q("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", W));
      };
      ce.isReactWarning = !0, Object.defineProperty(N, "key", {
        get: ce,
        configurable: !0
      });
    }
  }
  function Et(N, W) {
    {
      var ce = function() {
        ue || (ue = !0, q("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", W));
      };
      ce.isReactWarning = !0, Object.defineProperty(N, "ref", {
        get: ce,
        configurable: !0
      });
    }
  }
  var vn = function(N, W, ce, xe, $e, _e, ke) {
    var Ce = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: p,
      // Built-in properties that belong on the element
      type: N,
      key: W,
      ref: ce,
      props: ke,
      // Record the component responsible for creating this element.
      _owner: _e
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
      value: xe
    }), Object.defineProperty(Ce, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: $e
    }), Object.freeze && (Object.freeze(Ce.props), Object.freeze(Ce)), Ce;
  };
  function Rt(N, W, ce, xe, $e) {
    {
      var _e, ke = {}, Ce = null, Ft = null;
      ce !== void 0 && (Dn(ce), Ce = "" + ce), tt(W) && (Dn(W.key), Ce = "" + W.key), Fe(W) && (Ft = W.ref, pt(W, $e));
      for (_e in W)
        Qt.call(W, _e) && !Ar.hasOwnProperty(_e) && (ke[_e] = W[_e]);
      if (N && N.defaultProps) {
        var mt = N.defaultProps;
        for (_e in mt)
          ke[_e] === void 0 && (ke[_e] = mt[_e]);
      }
      if (Ce || Ft) {
        var vt = typeof N == "function" ? N.displayName || N.name || "Unknown" : N;
        Ce && Nt(ke, vt), Ft && Et(ke, vt);
      }
      return vn(N, Ce, Ft, $e, xe, Fn.current, ke);
    }
  }
  var ot = ve.ReactCurrentOwner, Ct = ve.ReactDebugCurrentFrame;
  function ya(N) {
    if (N) {
      var W = N._owner, ce = Kt(N.type, N._source, W ? W.type : null);
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
      if (ot.current) {
        var N = Q(ot.current.type);
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
        var W = N.fileName.replace(/^.*[\\\/]/, ""), ce = N.lineNumber;
        return `

Check your code at ` + W + ":" + ce + ".";
      }
      return "";
    }
  }
  var fi = {};
  function Ji(N) {
    {
      var W = lr();
      if (!W) {
        var ce = typeof N == "string" ? N : N.displayName || N.name;
        ce && (W = `

Check the top-level render call using <` + ce + ">.");
      }
      return W;
    }
  }
  function Zi(N, W) {
    {
      if (!N._store || N._store.validated || N.key != null)
        return;
      N._store.validated = !0;
      var ce = Ji(W);
      if (fi[ce])
        return;
      fi[ce] = !0;
      var xe = "";
      N && N._owner && N._owner !== ot.current && (xe = " It was passed a child from " + Q(N._owner.type) + "."), ya(N), q('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ce, xe), ya(null);
    }
  }
  function di(N, W) {
    {
      if (typeof N != "object")
        return;
      if (an(N))
        for (var ce = 0; ce < N.length; ce++) {
          var xe = N[ce];
          ra(xe) && Zi(xe, W);
        }
      else if (ra(N))
        N._store && (N._store.validated = !0);
      else if (N) {
        var $e = ie(N);
        if (typeof $e == "function" && $e !== N.entries)
          for (var _e = $e.call(N), ke; !(ke = _e.next()).done; )
            ra(ke.value) && Zi(ke.value, W);
      }
    }
  }
  function Na(N) {
    {
      var W = N.type;
      if (W == null || typeof W == "string")
        return;
      var ce;
      if (typeof W == "function")
        ce = W.propTypes;
      else if (typeof W == "object" && (W.$$typeof === R || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      W.$$typeof === C))
        ce = W.propTypes;
      else
        return;
      if (ce) {
        var xe = Q(W);
        Un(ce, N.props, "prop", xe, N);
      } else if (W.PropTypes !== void 0 && !ba) {
        ba = !0;
        var $e = Q(W);
        q("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", $e || "Unknown");
      }
      typeof W.getDefaultProps == "function" && !W.getDefaultProps.isReactClassApproved && q("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function ia(N) {
    {
      for (var W = Object.keys(N.props), ce = 0; ce < W.length; ce++) {
        var xe = W[ce];
        if (xe !== "children" && xe !== "key") {
          ya(N), q("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", xe), ya(null);
          break;
        }
      }
      N.ref !== null && (ya(N), q("Invalid attribute `ref` supplied to `React.Fragment`."), ya(null));
    }
  }
  var qn = {};
  function Ha(N, W, ce, xe, $e, _e) {
    {
      var ke = ee(N);
      if (!ke) {
        var Ce = "";
        (N === void 0 || typeof N == "object" && N !== null && Object.keys(N).length === 0) && (Ce += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Ft = io($e);
        Ft ? Ce += Ft : Ce += lr();
        var mt;
        N === null ? mt = "null" : an(N) ? mt = "array" : N !== void 0 && N.$$typeof === p ? (mt = "<" + (Q(N.type) || "Unknown") + " />", Ce = " Did you accidentally export a JSX literal instead of a component?") : mt = typeof N, q("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", mt, Ce);
      }
      var vt = Rt(N, W, ce, $e, _e);
      if (vt == null)
        return vt;
      if (ke) {
        var hn = W.children;
        if (hn !== void 0)
          if (xe)
            if (an(hn)) {
              for (var Ba = 0; Ba < hn.length; Ba++)
                di(hn[Ba], N);
              Object.freeze && Object.freeze(hn);
            } else
              q("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            di(hn, N);
      }
      if (Qt.call(W, "key")) {
        var Ea = Q(N), zt = Object.keys(W).filter(function(Pe) {
          return Pe !== "key";
        }), mi = zt.length > 0 ? "{key: someKey, " + zt.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!qn[Ea + mi]) {
          var Sa = zt.length > 0 ? "{" + zt.join(": ..., ") + ": ...}" : "{}";
          q(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, mi, Ea, Sa, Ea), qn[Ea + mi] = !0;
        }
      }
      return N === g ? ia(vt) : Na(vt), vt;
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
    function g(ue, Se) {
      var Fe = ue.length;
      ue.push(Se), f(ue, Se, Fe);
    }
    function y(ue) {
      return ue.length === 0 ? null : ue[0];
    }
    function S(ue) {
      if (ue.length === 0)
        return null;
      var Se = ue[0], Fe = ue.pop();
      return Fe !== Se && (ue[0] = Fe, A(ue, Fe, 0)), Se;
    }
    function f(ue, Se, Fe) {
      for (var tt = Fe; tt > 0; ) {
        var pt = tt - 1 >>> 1, Nt = ue[pt];
        if (R(Nt, Se) > 0)
          ue[pt] = Se, ue[tt] = Nt, tt = pt;
        else
          return;
      }
    }
    function A(ue, Se, Fe) {
      for (var tt = Fe, pt = ue.length, Nt = pt >>> 1; tt < Nt; ) {
        var Et = (tt + 1) * 2 - 1, vn = ue[Et], Rt = Et + 1, ot = ue[Rt];
        if (R(vn, Se) < 0)
          Rt < pt && R(ot, vn) < 0 ? (ue[tt] = ot, ue[Rt] = Se, tt = Rt) : (ue[tt] = vn, ue[Et] = Se, tt = Et);
        else if (Rt < pt && R(ot, Se) < 0)
          ue[tt] = ot, ue[Rt] = Se, tt = Rt;
        else
          return;
      }
    }
    function R(ue, Se) {
      var Fe = ue.sortIndex - Se.sortIndex;
      return Fe !== 0 ? Fe : ue.id - Se.id;
    }
    var T = 1, _ = 2, C = 3, k = 4, O = 5;
    function B(ue, Se) {
    }
    var se = typeof performance == "object" && typeof performance.now == "function";
    if (se) {
      var ie = performance;
      o.unstable_now = function() {
        return ie.now();
      };
    } else {
      var ve = Date, q = ve.now();
      o.unstable_now = function() {
        return ve.now() - q;
      };
    }
    var Y = 1073741823, J = -1, Z = 250, re = 5e3, U = 1e4, be = Y, K = [], ee = [], ne = 1, I = null, Q = C, F = !1, oe = !1, pe = !1, ae = typeof setTimeout == "function" ? setTimeout : null, ze = typeof clearTimeout == "function" ? clearTimeout : null, We = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function lt(ue) {
      for (var Se = y(ee); Se !== null; ) {
        if (Se.callback === null)
          S(ee);
        else if (Se.startTime <= ue)
          S(ee), Se.sortIndex = Se.expirationTime, g(K, Se);
        else
          return;
        Se = y(ee);
      }
    }
    function dt(ue) {
      if (pe = !1, lt(ue), !oe)
        if (y(K) !== null)
          oe = !0, Ut(xt);
        else {
          var Se = y(ee);
          Se !== null && Dn(dt, Se.startTime - ue);
        }
    }
    function xt(ue, Se) {
      oe = !1, pe && (pe = !1, Fn()), F = !0;
      var Fe = Q;
      try {
        var tt;
        if (!p) return In(ue, Se);
      } finally {
        I = null, Q = Fe, F = !1;
      }
    }
    function In(ue, Se) {
      var Fe = Se;
      for (lt(Fe), I = y(K); I !== null && !(I.expirationTime > Fe && (!ue || rr())); ) {
        var tt = I.callback;
        if (typeof tt == "function") {
          I.callback = null, Q = I.priorityLevel;
          var pt = I.expirationTime <= Fe, Nt = tt(pt);
          Fe = o.unstable_now(), typeof Nt == "function" ? I.callback = Nt : I === y(K) && S(K), lt(Fe);
        } else
          S(K);
        I = y(K);
      }
      if (I !== null)
        return !0;
      var Et = y(ee);
      return Et !== null && Dn(dt, Et.startTime - Fe), !1;
    }
    function nn(ue, Se) {
      switch (ue) {
        case T:
        case _:
        case C:
        case k:
        case O:
          break;
        default:
          ue = C;
      }
      var Fe = Q;
      Q = ue;
      try {
        return Se();
      } finally {
        Q = Fe;
      }
    }
    function ha(ue) {
      var Se;
      switch (Q) {
        case T:
        case _:
        case C:
          Se = C;
          break;
        default:
          Se = Q;
          break;
      }
      var Fe = Q;
      Q = Se;
      try {
        return ue();
      } finally {
        Q = Fe;
      }
    }
    function na(ue) {
      var Se = Q;
      return function() {
        var Fe = Q;
        Q = Se;
        try {
          return ue.apply(this, arguments);
        } finally {
          Q = Fe;
        }
      };
    }
    function Lt(ue, Se, Fe) {
      var tt = o.unstable_now(), pt;
      if (typeof Fe == "object" && Fe !== null) {
        var Nt = Fe.delay;
        typeof Nt == "number" && Nt > 0 ? pt = tt + Nt : pt = tt;
      } else
        pt = tt;
      var Et;
      switch (ue) {
        case T:
          Et = J;
          break;
        case _:
          Et = Z;
          break;
        case O:
          Et = be;
          break;
        case k:
          Et = U;
          break;
        case C:
        default:
          Et = re;
          break;
      }
      var vn = pt + Et, Rt = {
        id: ne++,
        callback: Se,
        priorityLevel: ue,
        startTime: pt,
        expirationTime: vn,
        sortIndex: -1
      };
      return pt > tt ? (Rt.sortIndex = pt, g(ee, Rt), y(K) === null && Rt === y(ee) && (pe ? Fn() : pe = !0, Dn(dt, pt - tt))) : (Rt.sortIndex = vn, g(K, Rt), !oe && !F && (oe = !0, Ut(xt))), Rt;
    }
    function xn() {
    }
    function kt() {
      !oe && !F && (oe = !0, Ut(xt));
    }
    function _t() {
      return y(K);
    }
    function jt(ue) {
      ue.callback = null;
    }
    function kn() {
      return Q;
    }
    var Wt = !1, Rn = null, Kt = -1, Qt = m, aa = -1;
    function rr() {
      var ue = o.unstable_now() - aa;
      return !(ue < Qt);
    }
    function ga() {
    }
    function Un(ue) {
      if (ue < 0 || ue > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      ue > 0 ? Qt = Math.floor(1e3 / ue) : Qt = m;
    }
    var mn = function() {
      if (Rn !== null) {
        var ue = o.unstable_now();
        aa = ue;
        var Se = !0, Fe = !0;
        try {
          Fe = Rn(Se, ue);
        } finally {
          Fe ? an() : (Wt = !1, Rn = null);
        }
      } else
        Wt = !1;
    }, an;
    if (typeof We == "function")
      an = function() {
        We(mn);
      };
    else if (typeof MessageChannel < "u") {
      var Cn = new MessageChannel(), Pa = Cn.port2;
      Cn.port1.onmessage = mn, an = function() {
        Pa.postMessage(null);
      };
    } else
      an = function() {
        ae(mn, 0);
      };
    function Ut(ue) {
      Rn = ue, Wt || (Wt = !0, an());
    }
    function Dn(ue, Se) {
      Kt = ae(function() {
        ue(o.unstable_now());
      }, Se);
    }
    function Fn() {
      ze(Kt), Kt = -1;
    }
    var Ar = ga, ir = null;
    o.unstable_IdlePriority = O, o.unstable_ImmediatePriority = T, o.unstable_LowPriority = k, o.unstable_NormalPriority = C, o.unstable_Profiling = ir, o.unstable_UserBlockingPriority = _, o.unstable_cancelCallback = jt, o.unstable_continueExecution = kt, o.unstable_forceFrameRate = Un, o.unstable_getCurrentPriorityLevel = kn, o.unstable_getFirstCallbackNode = _t, o.unstable_next = ha, o.unstable_pauseExecution = xn, o.unstable_requestPaint = Ar, o.unstable_runWithPriority = nn, o.unstable_scheduleCallback = Lt, o.unstable_shouldYield = rr, o.unstable_wrapCallback = na, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(EE);
NE.exports = EE;
var s1 = NE.exports;
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
  var o = E, p = s1, m = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
  function y(e) {
    g = e;
  }
  function S(e) {
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
  var R = 0, T = 1, _ = 2, C = 3, k = 4, O = 5, B = 6, se = 7, ie = 8, ve = 9, q = 10, Y = 11, J = 12, Z = 13, re = 14, U = 15, be = 16, K = 17, ee = 18, ne = 19, I = 21, Q = 22, F = 23, oe = 24, pe = 25, ae = !0, ze = !1, We = !1, lt = !1, dt = !1, xt = !0, In = !0, nn = !0, ha = !0, na = /* @__PURE__ */ new Set(), Lt = {}, xn = {};
  function kt(e, t) {
    _t(e, t), _t(e + "Capture", t);
  }
  function _t(e, t) {
    Lt[e] && f("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Lt[e] = t;
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
  var an = 0, Cn = 1, Pa = 2, Ut = 3, Dn = 4, Fn = 5, Ar = 6, ir = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ue = ir + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Se = new RegExp("^[" + ir + "][" + ue + "]*$"), Fe = {}, tt = {};
  function pt(e) {
    return kn.call(tt, e) ? !0 : kn.call(Fe, e) ? !1 : Se.test(e) ? (tt[e] = !0, !0) : (Fe[e] = !0, f("Invalid attribute name: `%s`", e), !1);
  }
  function Nt(e, t, n) {
    return t !== null ? t.type === an : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function Et(e, t, n, a) {
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
    if (t === null || typeof t > "u" || Et(e, t, n, a))
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
  function ot(e, t, n, a, r, i, l) {
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
    Ct[e] = new ot(
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
    Ct[t] = new ot(
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
    Ct[e] = new ot(
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
    Ct[e] = new ot(
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
    Ct[e] = new ot(
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
    Ct[e] = new ot(
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
    Ct[e] = new ot(
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
    Ct[e] = new ot(
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
    Ct[e] = new ot(
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
    Ct[t] = new ot(
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
    Ct[t] = new ot(
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
    Ct[t] = new ot(
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
    Ct[e] = new ot(
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
  Ct[lr] = new ot(
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
    Ct[e] = new ot(
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
        var D = r.type, x;
        D === Ut || D === Dn && n === !0 ? x = "" : (Qt(n, v), x = "" + n, r.sanitizeURL && Ji(x.toString())), h ? e.setAttributeNS(h, v, x) : e.setAttribute(v, x);
      }
    }
  }
  var ia = Symbol.for("react.element"), qn = Symbol.for("react.portal"), Ha = Symbol.for("react.fragment"), pi = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), W = Symbol.for("react.provider"), ce = Symbol.for("react.context"), xe = Symbol.for("react.forward_ref"), $e = Symbol.for("react.suspense"), _e = Symbol.for("react.suspense_list"), ke = Symbol.for("react.memo"), Ce = Symbol.for("react.lazy"), Ft = Symbol.for("react.scope"), mt = Symbol.for("react.debug_trace_mode"), vt = Symbol.for("react.offscreen"), hn = Symbol.for("react.legacy_hidden"), Ba = Symbol.for("react.cache"), Ea = Symbol.for("react.tracing_marker"), zt = Symbol.iterator, mi = "@@iterator";
  function Sa(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = zt && e[zt] || e[mi];
    return typeof t == "function" ? t : null;
  }
  var Pe = Object.assign, vi = 0, iu, lu, Vr, lo, oo, so, uo;
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
          log: Pe({}, e, {
            value: iu
          }),
          info: Pe({}, e, {
            value: lu
          }),
          warn: Pe({}, e, {
            value: Vr
          }),
          error: Pe({}, e, {
            value: lo
          }),
          group: Pe({}, e, {
            value: oo
          }),
          groupCollapsed: Pe({}, e, {
            value: so
          }),
          groupEnd: Pe({}, e, {
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
                  var D = `
` + s[v].replace(" at new ", " at ");
                  return e.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", e.displayName)), typeof e == "function" && Lr.set(e, D), D;
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
      case $e:
        return $a("Suspense");
      case _e:
        return $a("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case xe:
          return po(e.render);
        case ke:
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
      case O:
        return $a(e.type);
      case be:
        return $a("Lazy");
      case Z:
        return $a("Suspense");
      case ne:
        return $a("SuspenseList");
      case R:
      case _:
      case U:
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
  function Xe(e) {
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
      case $e:
        return "Suspense";
      case _e:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ce:
          var t = e;
          return vo(t) + ".Consumer";
        case W:
          var n = e;
          return vo(n._context) + ".Provider";
        case xe:
          return cu(e, e.render, "ForwardRef");
        case ke:
          var a = e.displayName || null;
          return a !== null ? a : Xe(e.type) || "Memo";
        case Ce: {
          var r = e, i = r._payload, l = r._init;
          try {
            return Xe(l(i));
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
      case oe:
        return "Cache";
      case ve:
        var a = n;
        return or(a) + ".Consumer";
      case q:
        var r = n;
        return or(r._context) + ".Provider";
      case ee:
        return "DehydratedFragment";
      case Y:
        return Cf(n, n.render, "ForwardRef");
      case se:
        return "Fragment";
      case O:
        return n;
      case k:
        return "Portal";
      case C:
        return "Root";
      case B:
        return "Text";
      case be:
        return Xe(n);
      case ie:
        return n === pi ? "StrictMode" : "Mode";
      case Q:
        return "Offscreen";
      case J:
        return "Profiler";
      case I:
        return "Scope";
      case Z:
        return "Suspense";
      case ne:
        return "SuspenseList";
      case pe:
        return "TracingMarker";
      case T:
      case R:
      case K:
      case _:
      case re:
      case U:
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
    var n = e, a = t.checked, r = Pe({}, t, {
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
  function z(e, t) {
    var n = e;
    b(n, t), te(n, t);
  }
  function te(e, t) {
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
  var Ne = !1, Ae = !1, Ye = !1;
  function nt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? o.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Ae || (Ae = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (Ye || (Ye = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Ne && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Ne = !0);
  }
  function ut(e, t) {
    t.value != null && e.setAttribute("value", jn(xa(t.value)));
  }
  var ct = Array.isArray;
  function He(e) {
    return ct(e);
  }
  var yt;
  yt = !1;
  function Ot() {
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
      for (var h = jn(xa(n)), D = null, x = 0; x < r.length; x++) {
        if (r[x].value === h) {
          r[x].selected = !0, a && (r[x].defaultSelected = !0);
          return;
        }
        D === null && !r[x].disabled && (D = r[x]);
      }
      D !== null && (D.selected = !0);
    }
  }
  function So(e, t) {
    return Pe({}, t, {
      value: void 0
    });
  }
  function xo(e, t) {
    var n = e;
    Eo(t), n._wrapperState = {
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
    var a = Pe({}, t, {
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
  var cr = "http://www.w3.org/1999/xhtml", IE = "http://www.w3.org/1998/Math/MathML", Mf = "http://www.w3.org/2000/svg";
  function Af(e) {
    switch (e) {
      case "svg":
        return Mf;
      case "math":
        return IE;
      default:
        return cr;
    }
  }
  function Vf(e, t) {
    return e == null || e === cr ? Af(t) : e === Mf && t === "foreignObject" ? cr : e;
  }
  var qE = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, gu, Jv = qE(function(e, t) {
    if (e.namespaceURI === Mf && !("innerHTML" in e)) {
      gu = gu || document.createElement("div"), gu.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = gu.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), zn = 1, fr = 3, Mt = 8, dr = 9, Lf = 11, yu = function(e, t) {
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
  }, pS = Pe({
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
  }, sl = {}, vS = new RegExp("^(aria)-[" + ue + "]*$"), hS = new RegExp("^(aria)[A-Z][" + ue + "]*$");
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
    var wn = {}, sh = /^on./, ES = /^on[^A-Z]/, SS = new RegExp("^(aria)-[" + ue + "]*$"), xS = new RegExp("^(aria)[A-Z][" + ue + "]*$");
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
      var u = Rt(t), v = u !== null && u.type === an;
      if (bu.hasOwnProperty(r)) {
        var h = bu[r];
        if (h !== t)
          return f("Invalid DOM property `%s`. Did you mean `%s`?", t, h), wn[t] = !0, !0;
      } else if (!v && t !== r)
        return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), wn[t] = !0, !0;
      return typeof n == "boolean" && Et(t, n, u, !1) ? (n ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), wn[t] = !0, !0) : v ? !0 : Et(t, n, u, !1) ? (wn[t] = !0, !1) : ((n === "false" || n === "true") && u !== null && u.type === Ut && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), wn[t] = !0), !0);
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
  function MS() {
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
      Bf = !1, MS();
    }
  }
  function AS(e, t, n) {
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
    var Yf = document.createElement("react");
    gh = function(t, n, a, r, i, l, s, u, v) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var h = document.createEvent("Event"), D = !1, x = !0, M = window.event, L = Object.getOwnPropertyDescriptor(window, "event");
      function P() {
        Yf.removeEventListener(H, Re, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = M);
      }
      var fe = Array.prototype.slice.call(arguments, 3);
      function Re() {
        D = !0, P(), n.apply(a, fe), x = !1;
      }
      var Ee, Ge = !1, Be = !1;
      function j(w) {
        if (Ee = w.error, Ge = !0, Ee === null && w.colno === 0 && w.lineno === 0 && (Be = !0), w.defaultPrevented && Ee != null && typeof Ee == "object")
          try {
            Ee._suppressLogging = !0;
          } catch {
          }
      }
      var H = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", j), Yf.addEventListener(H, Re, !1), h.initEvent(H, !1, !1), Yf.dispatchEvent(h), L && Object.defineProperty(window, "event", L), D && x && (Ge ? Be && (Ee = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Ee = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Ee)), window.removeEventListener("error", j), !D)
        return P(), hh.apply(this, arguments);
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
  var je = (
    /*                      */
    0
  ), pl = (
    /*                */
    1
  ), At = (
    /*                    */
    2
  ), Je = (
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
  ), Ze = (
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
    Je | ml | 0
  ), ed = At | Je | xi | wo | Ri | mr | Ci, _o = Je | yh | Ri | Ci, vl = Fr | xi, vr = Di | Xf | Qf, YS = m.ReactCurrentOwner;
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
    return t.tag === C ? n : null;
  }
  function Nh(e) {
    if (e.tag === Z) {
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
    return e.tag === C ? e.stateNode.containerInfo : null;
  }
  function IS(e) {
    return Ti(e) === e;
  }
  function qS(e) {
    {
      var t = YS.current;
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
    if (a.tag !== C)
      throw new Error("Unable to find node on an unmounted component.");
    return a.stateNode.current === a ? e : t;
  }
  function Rh(e) {
    var t = xh(e);
    return t !== null ? Ch(t) : null;
  }
  function Ch(e) {
    if (e.tag === O || e.tag === B)
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
    if (e.tag === O || e.tag === B)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== k) {
        var n = Dh(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Th = p.unstable_scheduleCallback, WS = p.unstable_cancelCallback, KS = p.unstable_shouldYield, QS = p.unstable_requestPaint, Jt = p.unstable_now, XS = p.unstable_getCurrentPriorityLevel, xu = p.unstable_ImmediatePriority, td = p.unstable_UserBlockingPriority, ji = p.unstable_NormalPriority, JS = p.unstable_LowPriority, nd = p.unstable_IdlePriority, ZS = p.unstable_yieldValue, ex = p.unstable_setDisableYieldValue, hl = null, gn = null, me = null, Ya = !1, Ra = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function tx(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      In && (e = Pe({}, e, {
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
        var n = (e.current.flags & Ze) === Ze;
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
  function Zt(e) {
    if (typeof ZS == "function" && (ex(e), y(e)), gn && typeof gn.setStrictMode == "function")
      try {
        gn.setStrictMode(hl, e);
      } catch (t) {
        Ya || (Ya = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function lx(e) {
    me = e;
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
    me !== null && typeof me.markCommitStarted == "function" && me.markCommitStarted(e);
  }
  function jh() {
    me !== null && typeof me.markCommitStopped == "function" && me.markCommitStopped();
  }
  function Oo(e) {
    me !== null && typeof me.markComponentRenderStarted == "function" && me.markComponentRenderStarted(e);
  }
  function gl() {
    me !== null && typeof me.markComponentRenderStopped == "function" && me.markComponentRenderStopped();
  }
  function ux(e) {
    me !== null && typeof me.markComponentPassiveEffectMountStarted == "function" && me.markComponentPassiveEffectMountStarted(e);
  }
  function cx() {
    me !== null && typeof me.markComponentPassiveEffectMountStopped == "function" && me.markComponentPassiveEffectMountStopped();
  }
  function fx(e) {
    me !== null && typeof me.markComponentPassiveEffectUnmountStarted == "function" && me.markComponentPassiveEffectUnmountStarted(e);
  }
  function dx() {
    me !== null && typeof me.markComponentPassiveEffectUnmountStopped == "function" && me.markComponentPassiveEffectUnmountStopped();
  }
  function px(e) {
    me !== null && typeof me.markComponentLayoutEffectMountStarted == "function" && me.markComponentLayoutEffectMountStarted(e);
  }
  function mx() {
    me !== null && typeof me.markComponentLayoutEffectMountStopped == "function" && me.markComponentLayoutEffectMountStopped();
  }
  function wh(e) {
    me !== null && typeof me.markComponentLayoutEffectUnmountStarted == "function" && me.markComponentLayoutEffectUnmountStarted(e);
  }
  function _h() {
    me !== null && typeof me.markComponentLayoutEffectUnmountStopped == "function" && me.markComponentLayoutEffectUnmountStopped();
  }
  function vx(e, t, n) {
    me !== null && typeof me.markComponentErrored == "function" && me.markComponentErrored(e, t, n);
  }
  function hx(e, t, n) {
    me !== null && typeof me.markComponentSuspended == "function" && me.markComponentSuspended(e, t, n);
  }
  function gx(e) {
    me !== null && typeof me.markLayoutEffectsStarted == "function" && me.markLayoutEffectsStarted(e);
  }
  function yx() {
    me !== null && typeof me.markLayoutEffectsStopped == "function" && me.markLayoutEffectsStopped();
  }
  function bx(e) {
    me !== null && typeof me.markPassiveEffectsStarted == "function" && me.markPassiveEffectsStarted(e);
  }
  function Nx() {
    me !== null && typeof me.markPassiveEffectsStopped == "function" && me.markPassiveEffectsStopped();
  }
  function Oh(e) {
    me !== null && typeof me.markRenderStarted == "function" && me.markRenderStarted(e);
  }
  function Ex() {
    me !== null && typeof me.markRenderYielded == "function" && me.markRenderYielded();
  }
  function Mh() {
    me !== null && typeof me.markRenderStopped == "function" && me.markRenderStopped();
  }
  function Sx(e) {
    me !== null && typeof me.markRenderScheduled == "function" && me.markRenderScheduled(e);
  }
  function xx(e, t) {
    me !== null && typeof me.markForceUpdateScheduled == "function" && me.markForceUpdateScheduled(e, t);
  }
  function ad(e, t) {
    me !== null && typeof me.markStateUpdateScheduled == "function" && me.markStateUpdateScheduled(e, t);
  }
  var De = (
    /*                         */
    0
  ), Ie = (
    /*                 */
    1
  ), at = (
    /*                    */
    2
  ), Dt = (
    /*               */
    8
  ), Ia = (
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
  ), Oe = (
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
      if (e & Oe)
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
  var ft = -1, Cu = Ao, Du = Nl;
  function ko(e) {
    switch (Oi(e)) {
      case Oe:
        return Oe;
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
    if (n === G)
      return G;
    var a = G, r = e.suspendedLanes, i = e.pingedLanes, l = n & Lh;
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
      var h = Oi(a), D = Oi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        h >= D || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        h === qa && (D & bl) !== G
      )
        return t;
    }
    (a & hr) !== G && (a |= n & qa);
    var x = e.entangledLanes;
    if (x !== G)
      for (var M = e.entanglements, L = a & x; L > 0; ) {
        var P = Mi(L), fe = 1 << P;
        a |= M[P], L &= ~fe;
      }
    return a;
  }
  function jx(e, t) {
    for (var n = e.eventTimes, a = ft; t > 0; ) {
      var r = Mi(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function wx(e, t) {
    switch (e) {
      case Oe:
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
      case Ed:
      case Sd:
      case xd:
        return ft;
      case Vo:
      case Lo:
      case _i:
      case Gn:
        return ft;
      default:
        return f("Should have found matching lanes. This is a bug in React."), ft;
    }
  }
  function _x(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var s = Mi(l), u = 1 << s, v = i[s];
      v === ft ? ((u & a) === G || (u & r) !== G) && (i[s] = wx(u, t)) : v <= t && (e.expiredLanes |= u), l &= ~u;
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
    return (e & Oe) !== G;
  }
  function Cd(e) {
    return (e & Lh) !== G;
  }
  function kh(e) {
    return (e & Ru) === e;
  }
  function Ax(e) {
    var t = Oe | hr | qa;
    return (e & t) === G;
  }
  function Vx(e) {
    return (e & bl) === e;
  }
  function ju(e, t) {
    var n = yl | hr | wi | qa;
    return (t & n) !== G;
  }
  function Lx(e, t) {
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
      n[r] = ft, a &= ~i;
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
      a[s] = G, r[s] = ft, i[s] = ft, l &= ~u;
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
      case Ed:
      case Sd:
      case xd:
        a = Mo;
        break;
      case _i:
        a = Lo;
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
  var Kn = Oe, gr = hr, yr = qa, _u = _i, zo = en;
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
        var h = r, D = h.pointerId;
        return Ho.set(D, Bo(Ho.get(D) || null, e, t, n, a, h)), !0;
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
        if (a === Z) {
          var r = Nh(n);
          if (r !== null) {
            e.blockedOn = r, Wh(e.priority, function() {
              qh(n);
            });
            return;
          }
        } else if (a === C) {
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
  function Au(e) {
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
    Au(e) && n.delete(t);
  }
  function tR() {
    Od = !1, Pr !== null && Au(Pr) && (Pr = null), Hr !== null && Au(Hr) && (Hr = null), Br !== null && Au(Br) && (Br = null), Po.forEach(Xh), Ho.forEach(Xh);
  }
  function $o(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Od || (Od = !0, p.unstable_scheduleCallback(p.unstable_NormalPriority, tR)));
  }
  function Yo(e) {
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
  var Sl = m.ReactCurrentBatchConfig, Md = !0;
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
    var r = Ca(), i = Sl.transition;
    Sl.transition = null;
    try {
      tn(Kn), Ad(e, t, n, a);
    } finally {
      tn(r), Sl.transition = i;
    }
  }
  function iR(e, t, n, a) {
    var r = Ca(), i = Sl.transition;
    Sl.transition = null;
    try {
      tn(gr), Ad(e, t, n, a);
    } finally {
      tn(r), Sl.transition = i;
    }
  }
  function Ad(e, t, n, a) {
    Md && lR(e, t, n, a);
  }
  function lR(e, t, n, a) {
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
        i !== null && Ix(i);
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
        if (s === Z) {
          var u = Nh(l);
          if (u !== null)
            return u;
          i = null;
        } else if (s === C) {
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
  var Io = null, Ld = null, qo = null;
  function fR(e) {
    return Io = e, Ld = tg(), !0;
  }
  function dR() {
    Io = null, Ld = null, qo = null;
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
    return "value" in Io ? Io.value : Io.textContent;
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
    return Pe(t.prototype, {
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
  }, kd = Qn(xl), Go = Pe({}, xl, {
    view: 0,
    detail: 0
  }), pR = Qn(Go), Ud, Fd, Wo;
  function mR(e) {
    e !== Wo && (Wo && e.type === "mousemove" ? (Ud = e.screenX - Wo.screenX, Fd = e.screenY - Wo.screenY) : (Ud = 0, Fd = 0), Wo = e);
  }
  var Uu = Pe({}, Go, {
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
  }), ag = Qn(Uu), vR = Pe({}, Uu, {
    dataTransfer: 0
  }), hR = Qn(vR), gR = Pe({}, Go, {
    relatedTarget: 0
  }), zd = Qn(gR), yR = Pe({}, xl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), bR = Qn(yR), NR = Pe({}, xl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), ER = Qn(NR), SR = Pe({}, xl, {
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
      var n = Lu(e);
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
  var wR = Pe({}, Go, {
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
      return e.type === "keypress" ? Lu(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Lu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), _R = Qn(wR), OR = Pe({}, Uu, {
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
  }), ig = Qn(OR), MR = Pe({}, Go, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Pd
  }), AR = Qn(MR), VR = Pe({}, xl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), LR = Qn(VR), kR = Pe({}, Uu, {
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
  function YR(e, t, n, a, r) {
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
        var D = r.ownerDocument;
        D ? h = D.defaultView || D.parentWindow : h = window;
      }
      var x, M;
      if (u) {
        var L = a.relatedTarget || a.toElement;
        if (x = n, M = L ? Li(L) : null, M !== null) {
          var P = Ti(M);
          (M !== P || M.tag !== O && M.tag !== B) && (M = null);
        }
      } else
        x = null, M = n;
      if (x !== M) {
        var fe = ag, Re = "onMouseLeave", Ee = "onMouseEnter", Ge = "mouse";
        (t === "pointerout" || t === "pointerover") && (fe = ig, Re = "onPointerLeave", Ee = "onPointerEnter", Ge = "pointer");
        var Be = x == null ? h : _l(x), j = M == null ? h : _l(M), H = new fe(Re, Ge + "leave", x, a, r);
        H.target = Be, H.relatedTarget = j;
        var w = null, X = Li(r);
        if (X === n) {
          var ge = new fe(Ee, Ge + "enter", M, a, r);
          ge.target = j, ge.relatedTarget = Be, w = ge;
        }
        L0(e, H, w, x, M);
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
    var i = 0, l = -1, s = -1, u = 0, v = 0, h = e, D = null;
    e: for (; ; ) {
      for (var x = null; h === t && (n === 0 || h.nodeType === fr) && (l = i + n), h === a && (r === 0 || h.nodeType === fr) && (s = i + r), h.nodeType === fr && (i += h.nodeValue.length), (x = h.firstChild) !== null; )
        D = h, h = x;
      for (; ; ) {
        if (h === e)
          break e;
        if (D === t && ++u === n && (l = i), D === a && ++v === r && (s = i), (x = h.nextSibling) !== null)
          break;
        h = D, D = h.parentNode;
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
        var D = n.createRange();
        D.setStart(v.node, v.offset), r.removeAllRanges(), l > s ? (r.addRange(D), r.extend(h.node, h.offset)) : (D.setEnd(h.node, h.offset), r.addRange(D));
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
  var x0 = jt && "documentMode" in document && document.documentMode <= 11;
  function R0() {
    kt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
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
  jt && (Cg = document.createElement("div").style, "AnimationEvent" in window || (delete Dl.animationend.animation, delete Dl.animationiteration.animation, delete Dl.animationstart.animation), "TransitionEvent" in window || delete Dl.transitionend.transition);
  function Pu(e) {
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
  var Dg = Pu("animationend"), Tg = Pu("animationiteration"), jg = Pu("animationstart"), wg = Pu("transitionend"), _g = /* @__PURE__ */ new Map(), Og = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function Yr(e, t) {
    _g.set(e, t), kt(t, [e]);
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
          if (Lu(a) === 0)
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
          u = LR;
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
        var D = !h && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", x = A0(n, s, a.type, h, D);
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
    var s = (i & DS) === 0;
    s && (f0(e, t, n, a, r), u0(e, t, n, a, r), T0(e, t, n, a, r), WR(e, t, n, a, r));
  }
  var es = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], qd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(es));
  function Mg(e, t, n) {
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
        Mg(e, u, s), a = l;
      }
    else
      for (var v = 0; v < t.length; v++) {
        var h = t[v], D = h.instance, x = h.currentTarget, M = h.listener;
        if (D !== a && e.isPropagationStopped())
          return;
        Mg(e, M, x), a = D;
      }
  }
  function Ag(e, t) {
    for (var n = (t & Co) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      O0(i, l, n);
    }
    zS();
  }
  function M0(e, t, n, a, r) {
    var i = Pf(n), l = [];
    _0(l, e, a, n, i, t), Ag(l, t);
  }
  function ht(e, t) {
    qd.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = sD(t), r = k0(e);
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
    var i = aR(e, t, n), l = void 0;
    $f && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? uR(e, t, i, l) : sR(e, t, i) : l !== void 0 ? cR(e, t, i, l) : oR(e, t, i);
  }
  function Lg(e, t) {
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
          if (u === C || u === k) {
            var v = s.stateNode.containerInfo;
            if (Lg(v, l))
              break;
            if (u === k)
              for (var h = s.return; h !== null; ) {
                var D = h.tag;
                if (D === C || D === k) {
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
              var L = M.tag;
              if (L === O || L === B) {
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
      var D = v, x = D.stateNode, M = D.tag;
      if (M === O && x !== null && (h = x, s !== null)) {
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
      if (s === O && l !== null) {
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
    while (e && e.tag !== O);
    return e || null;
  }
  function V0(e, t) {
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
      var u = s, v = u.alternate, h = u.stateNode, D = u.tag;
      if (v !== null && v === a)
        break;
      if (D === O && h !== null) {
        var x = h;
        if (r) {
          var M = To(s, i);
          M != null && l.unshift(ns(s, M, x));
        } else if (!r) {
          var L = To(s, i);
          L != null && l.push(ns(s, L, x));
        }
      }
      s = s.return;
    }
    l.length !== 0 && e.push({
      event: t,
      listeners: l
    });
  }
  function L0(e, t, n, a, r) {
    var i = a && r ? V0(a, r) : null;
    a !== null && kg(e, t, a, i, !1), r !== null && n !== null && kg(e, n, r, i, !0);
  }
  function k0(e, t) {
    return e + "__bubble";
  }
  var Pn = !1, as = "dangerouslySetInnerHTML", $u = "suppressContentEditableWarning", Ir = "suppressHydrationWarning", Ug = "autoFocus", Ai = "children", Vi = "style", Yu = "__html", Kd, Iu, rs, Fg, qu, zg, Pg;
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
      registrationNameDependencies: Lt,
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
    if (i !== r && (a && (Pn || (Pn = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && ae))
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
        if (i === Vi)
          l && Object.freeze(l), ah(t, l);
        else if (i === as) {
          var s = l ? l[Yu] : void 0;
          s != null && Jv(t, s);
        } else if (i === Ai)
          if (typeof l == "string") {
            var u = e !== "textarea" || l !== "";
            u && yu(t, l);
          } else typeof l == "number" && yu(t, "" + l);
        else i === $u || i === Ir || i === Ug || (Lt.hasOwnProperty(i) ? l != null && (typeof l != "function" && qu(i, l), i === "onScroll" && ht("scroll", t)) : l != null && Na(t, i, l, r));
      }
  }
  function H0(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Vi ? ah(e, l) : i === as ? Jv(e, l) : i === Ai ? yu(e, l) : Na(e, i, l, a);
    }
  }
  function B0(e, t, n, a) {
    var r, i = Hg(n), l, s = a;
    if (s === cr && (s = Af(e)), s === cr) {
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
    return Hg(t).createTextNode(e);
  }
  function Y0(e, t, n, a) {
    var r = Si(t, n);
    Iu(t, n);
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
        nt(e, n), i = n;
        break;
      case "select":
        xo(e, n), i = So(e, n), ht("invalid", e);
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
        ut(e, n);
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
        if (u === Vi) {
          var D = l[u];
          for (v in D)
            D.hasOwnProperty(v) && (h || (h = {}), h[v] = "");
        } else u === as || u === Ai || u === $u || u === Ir || u === Ug || (Lt.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
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
          var L = x ? x[Yu] : void 0, P = M ? M[Yu] : void 0;
          L != null && P !== L && (i = i || []).push(u, L);
        } else u === Ai ? (typeof x == "string" || typeof x == "number") && (i = i || []).push(u, "" + x) : u === $u || u === Ir || (Lt.hasOwnProperty(u) ? (x != null && (typeof x != "function" && qu(u, x), u === "onScroll" && ht("scroll", e)), !i && M !== x && (i = [])) : (i = i || []).push(u, x));
    }
    return h && (fS(h, s[Vi]), (i = i || []).push(Vi, h)), i;
  }
  function q0(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && d(e, r);
    var i = Si(n, a), l = Si(n, r);
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
    switch (s = Si(t, n), Iu(t, n), t) {
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
        nt(e, n);
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
      for (var h = e.attributes, D = 0; D < h.length; D++) {
        var x = h[D].name.toLowerCase();
        switch (x) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            u.add(h[D].name);
        }
      }
    }
    var M = null;
    for (var L in n)
      if (n.hasOwnProperty(L)) {
        var P = n[L];
        if (L === Ai)
          typeof P == "string" ? e.textContent !== P && (n[Ir] !== !0 && Wu(e.textContent, P, i, l), M = [Ai, P]) : typeof P == "number" && e.textContent !== "" + P && (n[Ir] !== !0 && Wu(e.textContent, P, i, l), M = [Ai, "" + P]);
        else if (Lt.hasOwnProperty(L))
          P != null && (typeof P != "function" && qu(L, P), L === "onScroll" && ht("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof s == "boolean") {
          var fe = void 0, Re = Rt(L);
          if (n[Ir] !== !0) {
            if (!(L === $u || L === Ir || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            L === "value" || L === "checked" || L === "selected")) {
              if (L === as) {
                var Ee = e.innerHTML, Ge = P ? P[Yu] : void 0;
                if (Ge != null) {
                  var Be = Pg(e, Ge);
                  Be !== Ee && rs(L, Ee, Be);
                }
              } else if (L === Vi) {
                if (u.delete(L), zg) {
                  var j = uS(P);
                  fe = e.getAttribute("style"), j !== fe && rs(L, fe, j);
                }
              } else if (s && !dt)
                u.delete(L.toLowerCase()), fe = di(e, L, P), P !== fe && rs(L, fe, P);
              else if (!Nt(L, Re, s) && !vn(L, P, Re, s)) {
                var H = !1;
                if (Re !== null)
                  u.delete(Re.attributeName), fe = Zi(e, L, P, Re);
                else {
                  var w = a;
                  if (w === cr && (w = Af(t)), w === cr)
                    u.delete(L.toLowerCase());
                  else {
                    var X = G0(L);
                    X !== null && X !== L && (H = !0, u.delete(X)), u.delete(L);
                  }
                  fe = di(e, L, P);
                }
                var ge = dt;
                !ge && P !== fe && !H && rs(L, fe, P);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    u.size > 0 && n[Ir] !== !0 && Fg(u), t) {
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
      var n = Pe({}, e || $g), a = {
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
          var h = e, D = "";
          if (e === "#text" ? /\S/.test(t) ? h = "Text nodes" : (h = "Whitespace text nodes", D = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : h = "<" + e + ">", i) {
            var x = "";
            u === "table" && e === "tr" && (x += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), f("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", h, u, D, x);
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
        var i = a === Mt ? e.parentNode : e, l = i.namespaceURI || null;
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
    e.nodeType === Mt ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && Ku(n);
  }
  function EC(e, t, n) {
    e.insertBefore(t, n);
  }
  function SC(e, t, n) {
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
    e.nodeType === Mt ? ip(e.parentNode, t) : e.nodeType === zn && ip(e, t), Yo(e);
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
    var v = (i.mode & Ie) !== De;
    return W0(e, t, n, s, a, v, l);
  }
  function PC(e, t, n, a) {
    return fs(n, e), n.mode & Ie, K0(e, t);
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
    return t && (t.tag === O || t.tag === B || t.tag === Z || t.tag === C) ? t : null;
  }
  function _l(e) {
    if (e.tag === O || e.tag === B)
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
      return Pe({}, n, l);
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
          case C:
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
        for (tn(Kn); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        Er = null, mp = !1;
      } catch (i) {
        throw Er !== null && (Er = Er.slice(e + 1)), Th(xu, Kr), i;
      } finally {
        tn(t), vp = !1;
      }
    }
    return null;
  }
  var Al = [], Vl = 0, sc = null, uc = 0, oa = [], sa = 0, ki = null, Sr = 1, xr = "";
  function fD(e) {
    return Fi(), (e.flags & bh) !== je;
  }
  function dD(e) {
    return Fi(), uc;
  }
  function pD() {
    var e = xr, t = Sr, n = t & ~mD(t);
    return n.toString(32) + e;
  }
  function Ui(e, t) {
    Fi(), Al[Vl++] = uc, Al[Vl++] = sc, sc = e, uc = t;
  }
  function ry(e, t, n) {
    Fi(), oa[sa++] = Sr, oa[sa++] = xr, oa[sa++] = ki, ki = e;
    var a = Sr, r = xr, i = cc(a) - 1, l = a & ~(1 << i), s = n + 1, u = cc(t) + i;
    if (u > 30) {
      var v = i - i % 5, h = (1 << v) - 1, D = (l & h).toString(32), x = l >> v, M = i - v, L = cc(t) + M, P = s << M, fe = P | x, Re = D + r;
      Sr = 1 << L | fe, xr = Re;
    } else {
      var Ee = s << i, Ge = Ee | l, Be = r;
      Sr = 1 << u | Ge, xr = Be;
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
      sc = Al[--Vl], Al[Vl] = null, uc = Al[--Vl], Al[Vl] = null;
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
      case C: {
        WC(e.stateNode.containerInfo, t);
        break;
      }
      case O: {
        var n = (e.mode & Ie) !== De;
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
      case Z: {
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
        case C: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case O:
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
        case O: {
          var i = e.type, l = e.memoizedProps, s = e.stateNode;
          switch (t.tag) {
            case O: {
              var u = t.type, v = t.pendingProps, h = (e.mode & Ie) !== De;
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
            case B: {
              var D = t.pendingProps, x = (e.mode & Ie) !== De;
              nD(
                i,
                l,
                s,
                D,
                // TODO: Delete this argument when we remove the legacy root API.
                x
              );
              break;
            }
          }
          break;
        }
        case Z: {
          var M = e.memoizedState, L = M.dehydrated;
          if (L !== null) switch (t.tag) {
            case O:
              var P = t.type;
              t.pendingProps, ZC(L, P);
              break;
            case B:
              var fe = t.pendingProps;
              eD(L, fe);
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
      case O: {
        var n = e.type;
        e.pendingProps;
        var a = OC(t, n);
        return a !== null ? (e.stateNode = a, rn = e, ua = kC(a), !0) : !1;
      }
      case B: {
        var r = e.pendingProps, i = MC(t, r);
        return i !== null ? (e.stateNode = i, rn = e, ua = null, !0) : !1;
      }
      case Z: {
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
    return (e.mode & Ie) !== De && (e.flags & Ze) === je;
  }
  function Np(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function Ep(e) {
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
  function ED(e, t, n) {
    var a = e.stateNode, r = !zi, i = zC(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function SD(e) {
    var t = e.stateNode, n = e.memoizedProps, a = PC(t, n, e);
    if (a) {
      var r = rn;
      if (r !== null)
        switch (r.tag) {
          case C: {
            var i = r.stateNode.containerInfo, l = (r.mode & Ie) !== De;
            qC(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case O: {
            var s = r.type, u = r.memoizedProps, v = r.stateNode, h = (r.mode & Ie) !== De;
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
    for (var t = e.return; t !== null && t.tag !== O && t.tag !== C && t.tag !== Z; )
      t = t.return;
    rn = t;
  }
  function fc(e) {
    if (e !== rn)
      return !1;
    if (!Ta)
      return cy(e), Ta = !0, !1;
    if (e.tag !== C && (e.tag !== O || IC(e.type) && !np(e.type, e.memoizedProps))) {
      var t = ua;
      if (t)
        if (bp(e))
          fy(e), Np();
        else
          for (; t; )
            oy(e, t), t = us(t);
    }
    return cy(e), e.tag === Z ? ua = RD(e) : ua = rn ? us(e.stateNode) : null, !0;
  }
  function CD() {
    return Ta && ua !== null;
  }
  function fy(e) {
    for (var t = ua; t; )
      ly(e, t), t = us(t);
  }
  function Ll() {
    rn = null, ua = null, Ta = !1, zi = !1;
  }
  function dy() {
    Qr !== null && (iN(Qr), Qr = null);
  }
  function ln() {
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
        var D = Pi(r);
        S(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, D);
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
      if ((e.mode & Dt || xt) && // We warn in ReactElement.js if owner and self are equal for string refs
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
        var h = function(D) {
          var x = u.refs;
          D === null ? delete x[v] : x[v] = D;
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
    function t(j, H) {
      if (e) {
        var w = j.deletions;
        w === null ? (j.deletions = [H], j.flags |= xi) : w.push(H);
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
      for (var w = /* @__PURE__ */ new Map(), X = H; X !== null; )
        X.key !== null ? w.set(X.key, X) : w.set(X.index, X), X = X.sibling;
      return w;
    }
    function r(j, H) {
      var w = Qi(j, H);
      return w.index = 0, w.sibling = null, w;
    }
    function i(j, H, w) {
      if (j.index = w, !e)
        return j.flags |= bh, H;
      var X = j.alternate;
      if (X !== null) {
        var ge = X.index;
        return ge < H ? (j.flags |= At, H) : ge;
      } else
        return j.flags |= At, H;
    }
    function l(j) {
      return e && j.alternate === null && (j.flags |= At), j;
    }
    function s(j, H, w, X) {
      if (H === null || H.tag !== B) {
        var ge = Sv(w, j.mode, X);
        return ge.return = j, ge;
      } else {
        var de = r(H, w);
        return de.return = j, de;
      }
    }
    function u(j, H, w, X) {
      var ge = w.type;
      if (ge === Ha)
        return h(j, H, w.props.children, X, w.key);
      if (H !== null && (H.elementType === ge || // Keep this check inline so it only runs on the false path:
      EN(H, w) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof ge == "object" && ge !== null && ge.$$typeof === Ce && vy(ge) === H.type)) {
        var de = r(H, w.props);
        return de.ref = bs(j, H, w), de.return = j, de._debugSource = w._source, de._debugOwner = w._owner, de;
      }
      var we = Ev(w, j.mode, X);
      return we.ref = bs(j, H, w), we.return = j, we;
    }
    function v(j, H, w, X) {
      if (H === null || H.tag !== k || H.stateNode.containerInfo !== w.containerInfo || H.stateNode.implementation !== w.implementation) {
        var ge = xv(w, j.mode, X);
        return ge.return = j, ge;
      } else {
        var de = r(H, w.children || []);
        return de.return = j, de;
      }
    }
    function h(j, H, w, X, ge) {
      if (H === null || H.tag !== se) {
        var de = oi(w, j.mode, X, ge);
        return de.return = j, de;
      } else {
        var we = r(H, w);
        return we.return = j, we;
      }
    }
    function D(j, H, w) {
      if (typeof H == "string" && H !== "" || typeof H == "number") {
        var X = Sv("" + H, j.mode, w);
        return X.return = j, X;
      }
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case ia: {
            var ge = Ev(H, j.mode, w);
            return ge.ref = bs(j, null, H), ge.return = j, ge;
          }
          case qn: {
            var de = xv(H, j.mode, w);
            return de.return = j, de;
          }
          case Ce: {
            var we = H._payload, Ve = H._init;
            return D(j, Ve(we), w);
          }
        }
        if (He(H) || Sa(H)) {
          var it = oi(H, j.mode, w, null);
          return it.return = j, it;
        }
        pc(j, H);
      }
      return typeof H == "function" && mc(j), null;
    }
    function x(j, H, w, X) {
      var ge = H !== null ? H.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number")
        return ge !== null ? null : s(j, H, "" + w, X);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case ia:
            return w.key === ge ? u(j, H, w, X) : null;
          case qn:
            return w.key === ge ? v(j, H, w, X) : null;
          case Ce: {
            var de = w._payload, we = w._init;
            return x(j, H, we(de), X);
          }
        }
        if (He(w) || Sa(w))
          return ge !== null ? null : h(j, H, w, X, null);
        pc(j, w);
      }
      return typeof w == "function" && mc(j), null;
    }
    function M(j, H, w, X, ge) {
      if (typeof X == "string" && X !== "" || typeof X == "number") {
        var de = j.get(w) || null;
        return s(H, de, "" + X, ge);
      }
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case ia: {
            var we = j.get(X.key === null ? w : X.key) || null;
            return u(H, we, X, ge);
          }
          case qn: {
            var Ve = j.get(X.key === null ? w : X.key) || null;
            return v(H, Ve, X, ge);
          }
          case Ce:
            var it = X._payload, Ke = X._init;
            return M(j, H, w, Ke(it), ge);
        }
        if (He(X) || Sa(X)) {
          var wt = j.get(w) || null;
          return h(H, wt, X, ge, null);
        }
        pc(H, X);
      }
      return typeof X == "function" && mc(H), null;
    }
    function L(j, H, w) {
      {
        if (typeof j != "object" || j === null)
          return H;
        switch (j.$$typeof) {
          case ia:
          case qn:
            my(j, w);
            var X = j.key;
            if (typeof X != "string")
              break;
            if (H === null) {
              H = /* @__PURE__ */ new Set(), H.add(X);
              break;
            }
            if (!H.has(X)) {
              H.add(X);
              break;
            }
            f("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", X);
            break;
          case Ce:
            var ge = j._payload, de = j._init;
            L(de(ge), H, w);
            break;
        }
      }
      return H;
    }
    function P(j, H, w, X) {
      for (var ge = null, de = 0; de < w.length; de++) {
        var we = w[de];
        ge = L(we, ge, j);
      }
      for (var Ve = null, it = null, Ke = H, wt = 0, Qe = 0, Tt = null; Ke !== null && Qe < w.length; Qe++) {
        Ke.index > Qe ? (Tt = Ke, Ke = null) : Tt = Ke.sibling;
        var En = x(j, Ke, w[Qe], X);
        if (En === null) {
          Ke === null && (Ke = Tt);
          break;
        }
        e && Ke && En.alternate === null && t(j, Ke), wt = i(En, wt, Qe), it === null ? Ve = En : it.sibling = En, it = En, Ke = Tt;
      }
      if (Qe === w.length) {
        if (n(j, Ke), ln()) {
          var pn = Qe;
          Ui(j, pn);
        }
        return Ve;
      }
      if (Ke === null) {
        for (; Qe < w.length; Qe++) {
          var ea = D(j, w[Qe], X);
          ea !== null && (wt = i(ea, wt, Qe), it === null ? Ve = ea : it.sibling = ea, it = ea);
        }
        if (ln()) {
          var Vn = Qe;
          Ui(j, Vn);
        }
        return Ve;
      }
      for (var Ln = a(j, Ke); Qe < w.length; Qe++) {
        var Sn = M(Ln, j, Qe, w[Qe], X);
        Sn !== null && (e && Sn.alternate !== null && Ln.delete(Sn.key === null ? Qe : Sn.key), wt = i(Sn, wt, Qe), it === null ? Ve = Sn : it.sibling = Sn, it = Sn);
      }
      if (e && Ln.forEach(function(eo) {
        return t(j, eo);
      }), ln()) {
        var _r = Qe;
        Ui(j, _r);
      }
      return Ve;
    }
    function fe(j, H, w, X) {
      var ge = Sa(w);
      if (typeof ge != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        w[Symbol.toStringTag] === "Generator" && (Rp || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Rp = !0), w.entries === ge && (xp || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), xp = !0);
        var de = ge.call(w);
        if (de)
          for (var we = null, Ve = de.next(); !Ve.done; Ve = de.next()) {
            var it = Ve.value;
            we = L(it, we, j);
          }
      }
      var Ke = ge.call(w);
      if (Ke == null)
        throw new Error("An iterable object provided no iterator.");
      for (var wt = null, Qe = null, Tt = H, En = 0, pn = 0, ea = null, Vn = Ke.next(); Tt !== null && !Vn.done; pn++, Vn = Ke.next()) {
        Tt.index > pn ? (ea = Tt, Tt = null) : ea = Tt.sibling;
        var Ln = x(j, Tt, Vn.value, X);
        if (Ln === null) {
          Tt === null && (Tt = ea);
          break;
        }
        e && Tt && Ln.alternate === null && t(j, Tt), En = i(Ln, En, pn), Qe === null ? wt = Ln : Qe.sibling = Ln, Qe = Ln, Tt = ea;
      }
      if (Vn.done) {
        if (n(j, Tt), ln()) {
          var Sn = pn;
          Ui(j, Sn);
        }
        return wt;
      }
      if (Tt === null) {
        for (; !Vn.done; pn++, Vn = Ke.next()) {
          var _r = D(j, Vn.value, X);
          _r !== null && (En = i(_r, En, pn), Qe === null ? wt = _r : Qe.sibling = _r, Qe = _r);
        }
        if (ln()) {
          var eo = pn;
          Ui(j, eo);
        }
        return wt;
      }
      for (var Xs = a(j, Tt); !Vn.done; pn++, Vn = Ke.next()) {
        var nr = M(Xs, j, pn, Vn.value, X);
        nr !== null && (e && nr.alternate !== null && Xs.delete(nr.key === null ? pn : nr.key), En = i(nr, En, pn), Qe === null ? wt = nr : Qe.sibling = nr, Qe = nr);
      }
      if (e && Xs.forEach(function(n1) {
        return t(j, n1);
      }), ln()) {
        var t1 = pn;
        Ui(j, t1);
      }
      return wt;
    }
    function Re(j, H, w, X) {
      if (H !== null && H.tag === B) {
        n(j, H.sibling);
        var ge = r(H, w);
        return ge.return = j, ge;
      }
      n(j, H);
      var de = Sv(w, j.mode, X);
      return de.return = j, de;
    }
    function Ee(j, H, w, X) {
      for (var ge = w.key, de = H; de !== null; ) {
        if (de.key === ge) {
          var we = w.type;
          if (we === Ha) {
            if (de.tag === se) {
              n(j, de.sibling);
              var Ve = r(de, w.props.children);
              return Ve.return = j, Ve._debugSource = w._source, Ve._debugOwner = w._owner, Ve;
            }
          } else if (de.elementType === we || // Keep this check inline so it only runs on the false path:
          EN(de, w) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof we == "object" && we !== null && we.$$typeof === Ce && vy(we) === de.type) {
            n(j, de.sibling);
            var it = r(de, w.props);
            return it.ref = bs(j, de, w), it.return = j, it._debugSource = w._source, it._debugOwner = w._owner, it;
          }
          n(j, de);
          break;
        } else
          t(j, de);
        de = de.sibling;
      }
      if (w.type === Ha) {
        var Ke = oi(w.props.children, j.mode, X, w.key);
        return Ke.return = j, Ke;
      } else {
        var wt = Ev(w, j.mode, X);
        return wt.ref = bs(j, H, w), wt.return = j, wt;
      }
    }
    function Ge(j, H, w, X) {
      for (var ge = w.key, de = H; de !== null; ) {
        if (de.key === ge)
          if (de.tag === k && de.stateNode.containerInfo === w.containerInfo && de.stateNode.implementation === w.implementation) {
            n(j, de.sibling);
            var we = r(de, w.children || []);
            return we.return = j, we;
          } else {
            n(j, de);
            break;
          }
        else
          t(j, de);
        de = de.sibling;
      }
      var Ve = xv(w, j.mode, X);
      return Ve.return = j, Ve;
    }
    function Be(j, H, w, X) {
      var ge = typeof w == "object" && w !== null && w.type === Ha && w.key === null;
      if (ge && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case ia:
            return l(Ee(j, H, w, X));
          case qn:
            return l(Ge(j, H, w, X));
          case Ce:
            var de = w._payload, we = w._init;
            return Be(j, H, we(de), X);
        }
        if (He(w))
          return P(j, H, w, X);
        if (Sa(w))
          return fe(j, H, w, X);
        pc(j, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" ? l(Re(j, H, "" + w, X)) : (typeof w == "function" && mc(j), n(j, H));
    }
    return Be;
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
      if (El(a.childLanes, t) ? r !== null && !El(r.childLanes, t) && (r.childLanes = Ue(r.childLanes, t)) : (a.childLanes = Ue(a.childLanes, t), r !== null && (r.childLanes = Ue(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && f("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function AD(e, t, n) {
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
              var s = Uo(n), u = Rr(ft, s);
              u.tag = bc;
              var v = a.updateQueue;
              if (v !== null) {
                var h = v.shared, D = h.pending;
                D === null ? u.next = u : (u.next = D.next, D.next = u), h.pending = u;
              }
            }
            a.lanes = Ue(a.lanes, n);
            var x = a.alternate;
            x !== null && (x.lanes = Ue(x.lanes, n)), Mp(a.return, n, e), i.lanes = Ue(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === q)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === ee) {
        var M = a.return;
        if (M === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        M.lanes = Ue(M.lanes, n);
        var L = M.alternate;
        L !== null && (L.lanes = Ue(L.lanes, n)), Mp(M, n, e), r = a.sibling;
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
          var P = r.sibling;
          if (P !== null) {
            P.return = r.return, r = P;
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
  function Vt(e) {
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
    e.lanes = Ue(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Ue(n.lanes, t)), n === null && (e.flags & (At | mr)) !== je && gN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Ue(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Ue(n.childLanes, t) : (r.flags & (At | mr)) !== je && gN(e), a = r, r = r.return;
    if (a.tag === C) {
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
      case Vp:
        e.flags = e.flags & ~_n | Ze;
      case Sy: {
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
        return v == null ? a : Pe({}, a, v);
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
        var D = h.updateQueue, x = D.lastBaseUpdate;
        x !== l && (x === null ? D.firstBaseUpdate = v : x.next = v, D.lastBaseUpdate = u);
      }
    }
    if (i !== null) {
      var M = r.baseState, L = G, P = null, fe = null, Re = null, Ee = i;
      do {
        var Ge = Ee.lane, Be = Ee.eventTime;
        if (El(a, Ge)) {
          if (Re !== null) {
            var H = {
              eventTime: Be,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: en,
              tag: Ee.tag,
              payload: Ee.payload,
              callback: Ee.callback,
              next: null
            };
            Re = Re.next = H;
          }
          M = zD(e, r, Ee, M, t, n);
          var w = Ee.callback;
          if (w !== null && // If the update was already committed, we should not queue its
          // callback again.
          Ee.lane !== en) {
            e.flags |= yh;
            var X = r.effects;
            X === null ? r.effects = [Ee] : X.push(Ee);
          }
        } else {
          var j = {
            eventTime: Be,
            lane: Ge,
            tag: Ee.tag,
            payload: Ee.payload,
            callback: Ee.callback,
            next: null
          };
          Re === null ? (fe = Re = j, P = M) : Re = Re.next = j, L = Ue(L, Ge);
        }
        if (Ee = Ee.next, Ee === null) {
          if (s = r.shared.pending, s === null)
            break;
          var ge = s, de = ge.next;
          ge.next = null, Ee = de, r.lastBaseUpdate = ge, r.shared.pending = null;
        }
      } while (!0);
      Re === null && (P = M), r.baseState = P, r.firstBaseUpdate = fe, r.lastBaseUpdate = Re;
      var we = r.shared.interleaved;
      if (we !== null) {
        var Ve = we;
        do
          L = Ue(L, Ve.lane), Ve = Ve.next;
        while (Ve !== we);
      } else i === null && (r.shared.lanes = G);
      qs(L), e.lanes = L, e.memoizedState = M;
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
      if (t.tag === Z) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || Gg(a) || lp(a))
            return t;
        }
      } else if (t.tag === ne && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & Ze) !== je;
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
  var he = m.ReactCurrentDispatcher, xs = m.ReactCurrentBatchConfig, Ip, Bl;
  Ip = /* @__PURE__ */ new Set();
  var $i = G, rt = null, Bt = null, $t = null, jc = !1, Rs = !1, Cs = 0, ID = 0, qD = 25, $ = null, ca = null, ei = -1, qp = !1;
  function et() {
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
    e != null && !He(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", $, typeof e);
  }
  function GD(e) {
    {
      var t = Le(rt);
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
    $i = i, rt = t, ca = e !== null ? e._debugHookTypes : null, ei = -1, qp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = G, e !== null && e.memoizedState !== null ? he.current = Jy : ca !== null ? he.current = Xy : he.current = Qy;
    var l = n(a, r);
    if (Rs) {
      var s = 0;
      do {
        if (Rs = !1, Cs = 0, s >= qD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        s += 1, qp = !1, Bt = null, $t = null, t.updateQueue = null, ei = -1, he.current = Zy, l = n(a, r);
      } while (Rs);
    }
    he.current = Hc, t._debugHookTypes = ca;
    var u = Bt !== null && Bt.next !== null;
    if ($i = G, rt = null, Bt = null, $t = null, $ = null, ca = null, ei = -1, e !== null && (e.flags & vr) !== (t.flags & vr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Ie) !== De && f("Internal React error: Expected static flag was missing. Please notify the React team."), jc = !1, u)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function Il() {
    var e = Cs !== 0;
    return Cs = 0, e;
  }
  function Oy(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Ia) !== De ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = wu(e.lanes, n);
  }
  function My() {
    if (he.current = Hc, jc) {
      for (var e = rt.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      jc = !1;
    }
    $i = G, rt = null, Bt = null, $t = null, ca = null, ei = -1, $ = null, Iy = !1, Rs = !1, Cs = 0;
  }
  function Qa() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return $t === null ? rt.memoizedState = $t = e : $t = $t.next = e, $t;
  }
  function fa() {
    var e;
    if (Bt === null) {
      var t = rt.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = Bt.next;
    var n;
    if ($t === null ? n = rt.memoizedState : n = $t.next, n !== null)
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
      $t === null ? rt.memoizedState = $t = a : $t = $t.next = a;
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
    var l = i.dispatch = XD.bind(null, rt, i);
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
      var h = l.next, D = i.baseState, x = null, M = null, L = null, P = h;
      do {
        var fe = P.lane;
        if (El($i, fe)) {
          if (L !== null) {
            var Ee = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: en,
              action: P.action,
              hasEagerState: P.hasEagerState,
              eagerState: P.eagerState,
              next: null
            };
            L = L.next = Ee;
          }
          if (P.hasEagerState)
            D = P.eagerState;
          else {
            var Ge = P.action;
            D = e(D, Ge);
          }
        } else {
          var Re = {
            lane: fe,
            action: P.action,
            hasEagerState: P.hasEagerState,
            eagerState: P.eagerState,
            next: null
          };
          L === null ? (M = L = Re, x = D) : L = L.next = Re, rt.lanes = Ue(rt.lanes, fe), qs(fe);
        }
        P = P.next;
      } while (P !== null && P !== h);
      L === null ? x = D : L.next = M, Xn(D, a.memoizedState) || Vs(), a.memoizedState = D, a.baseState = x, a.baseQueue = L, r.lastRenderedState = D;
    }
    var Be = r.interleaved;
    if (Be !== null) {
      var j = Be;
      do {
        var H = j.lane;
        rt.lanes = Ue(rt.lanes, H), qs(H), j = j.next;
      } while (j !== Be);
    } else l === null && (r.lanes = G);
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
    var a = rt, r = Qa(), i, l = ln();
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
    return r.queue = v, Ac(ky.bind(null, a, v, e), [e]), a.flags |= Fr, Ds(Pt | on, Ly.bind(null, a, v, i, t), void 0, null), i;
  }
  function wc(e, t, n) {
    var a = rt, r = fa(), i = t();
    if (!Bl) {
      var l = t();
      Xn(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Bl = !0);
    }
    var s = r.memoizedState, u = !Xn(s, i);
    u && (r.memoizedState = i, Vs());
    var v = r.queue;
    if (js(ky.bind(null, a, v, e), [e]), v.getSnapshot !== t || u || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    $t !== null && $t.memoizedState.tag & Pt) {
      a.flags |= Fr, Ds(Pt | on, Ly.bind(null, a, v, i, t), void 0, null);
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
    }, r = rt.updateQueue;
    if (r === null)
      r = Ay(), rt.updateQueue = r, r.stores = [a];
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
    var t = Hn(e, Oe);
    t !== null && Gt(t, e, Oe, ft);
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
    var a = n.dispatch = JD.bind(null, rt, n);
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
    }, i = rt.updateQueue;
    if (i === null)
      i = Ay(), rt.updateQueue = i, i.lastEffect = r.next = r;
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
    rt.flags |= e, r.memoizedState = Ds(Pt | t, n, void 0, i);
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
    rt.flags |= e, r.memoizedState = Ds(Pt | t, n, l, i);
  }
  function Ac(e, t) {
    return (rt.mode & Ia) !== De ? Ts(Jf | Fr | Xf, on, e, t) : Ts(Fr | Xf, on, e, t);
  }
  function js(e, t) {
    return Mc(Fr, on, e, t);
  }
  function nm(e, t) {
    return Ts(Je, Ka, e, t);
  }
  function Vc(e, t) {
    return Mc(Je, Ka, e, t);
  }
  function am(e, t) {
    var n = Je;
    return n |= Di, (rt.mode & Ia) !== De && (n |= zr), Ts(n, Ht, e, t);
  }
  function Lc(e, t) {
    return Mc(Je, Ht, e, t);
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
    var a = n != null ? n.concat([e]) : null, r = Je;
    return r |= Di, (rt.mode & Ia) !== De && (r |= zr), Ts(r, Ht, zy.bind(null, t, e), a);
  }
  function kc(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return Mc(Je, Ht, zy.bind(null, t, e), a);
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
        rt.lanes = Ue(rt.lanes, r), qs(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Vs()), e.memoizedState = n, n;
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
    if (ln()) {
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
          s = he.current, he.current = _a;
          try {
            var u = t.lastRenderedState, v = l(u, n);
            if (r.hasEagerState = !0, r.eagerState = v, Xn(v, u)) {
              kD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            he.current = s;
          }
        }
      }
      var h = Ey(e, t, r, a);
      if (h !== null) {
        var D = An();
        Gt(h, e, a, D), Wy(h, t, a);
      }
    }
    Ky(e, a);
  }
  function qy(e) {
    var t = e.alternate;
    return e === rt || t !== null && t === rt;
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
    readContext: Vt,
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
    unstable_isNewReconciler: ze
  }, Qy = null, Xy = null, Jy = null, Zy = null, Xa = null, _a = null, Bc = null;
  {
    var cm = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, Me = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Qy = {
      readContext: function(e) {
        return Vt(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", et(), $l(t), im(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", et(), Vt(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", et(), $l(t), Ac(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", et(), $l(n), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", et(), $l(t), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", et(), $l(t), am(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", et(), $l(t);
        var n = he.current;
        he.current = Xa;
        try {
          return lm(e, t);
        } finally {
          he.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", et();
        var a = he.current;
        he.current = Xa;
        try {
          return Kp(e, t, n);
        } finally {
          he.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", et(), tm(e);
      },
      useState: function(e) {
        $ = "useState", et();
        var t = he.current;
        he.current = Xa;
        try {
          return _c(e);
        } finally {
          he.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", et(), void 0;
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", et(), om(e);
      },
      useTransition: function() {
        return $ = "useTransition", et(), sm();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", et(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", et(), Jp(e, t, n);
      },
      useId: function() {
        return $ = "useId", et(), um();
      },
      unstable_isNewReconciler: ze
    }, Xy = {
      readContext: function(e) {
        return Vt(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", le(), im(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", le(), Vt(e);
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
        var n = he.current;
        he.current = Xa;
        try {
          return lm(e, t);
        } finally {
          he.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", le();
        var a = he.current;
        he.current = Xa;
        try {
          return Kp(e, t, n);
        } finally {
          he.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", le(), tm(e);
      },
      useState: function(e) {
        $ = "useState", le();
        var t = he.current;
        he.current = Xa;
        try {
          return _c(e);
        } finally {
          he.current = t;
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
      unstable_isNewReconciler: ze
    }, Jy = {
      readContext: function(e) {
        return Vt(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", le(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", le(), Vt(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", le(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", le(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", le(), Vc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", le(), Lc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", le();
        var n = he.current;
        he.current = _a;
        try {
          return zc(e, t);
        } finally {
          he.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", le();
        var a = he.current;
        he.current = _a;
        try {
          return Qp(e, t, n);
        } finally {
          he.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", le(), Oc();
      },
      useState: function(e) {
        $ = "useState", le();
        var t = he.current;
        he.current = _a;
        try {
          return Zp(e);
        } finally {
          he.current = t;
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
      unstable_isNewReconciler: ze
    }, Zy = {
      readContext: function(e) {
        return Vt(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", le(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", le(), Vt(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", le(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", le(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", le(), Vc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", le(), Lc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", le();
        var n = he.current;
        he.current = Bc;
        try {
          return zc(e, t);
        } finally {
          he.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", le();
        var a = he.current;
        he.current = Bc;
        try {
          return Xp(e, t, n);
        } finally {
          he.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", le(), Oc();
      },
      useState: function(e) {
        $ = "useState", le();
        var t = he.current;
        he.current = Bc;
        try {
          return em(e);
        } finally {
          he.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", le(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", le(), Hy(e);
      },
      useTransition: function() {
        return $ = "useTransition", le(), Yy();
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
      unstable_isNewReconciler: ze
    }, Xa = {
      readContext: function(e) {
        return cm(), Vt(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", Me(), et(), im(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", Me(), et(), Vt(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", Me(), et(), Ac(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", Me(), et(), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", Me(), et(), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", Me(), et(), am(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", Me(), et();
        var n = he.current;
        he.current = Xa;
        try {
          return lm(e, t);
        } finally {
          he.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", Me(), et();
        var a = he.current;
        he.current = Xa;
        try {
          return Kp(e, t, n);
        } finally {
          he.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", Me(), et(), tm(e);
      },
      useState: function(e) {
        $ = "useState", Me(), et();
        var t = he.current;
        he.current = Xa;
        try {
          return _c(e);
        } finally {
          he.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", Me(), et(), void 0;
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", Me(), et(), om(e);
      },
      useTransition: function() {
        return $ = "useTransition", Me(), et(), sm();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", Me(), et(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", Me(), et(), Jp(e, t, n);
      },
      useId: function() {
        return $ = "useId", Me(), et(), um();
      },
      unstable_isNewReconciler: ze
    }, _a = {
      readContext: function(e) {
        return cm(), Vt(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", Me(), le(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", Me(), le(), Vt(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", Me(), le(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", Me(), le(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", Me(), le(), Vc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", Me(), le(), Lc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", Me(), le();
        var n = he.current;
        he.current = _a;
        try {
          return zc(e, t);
        } finally {
          he.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", Me(), le();
        var a = he.current;
        he.current = _a;
        try {
          return Qp(e, t, n);
        } finally {
          he.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", Me(), le(), Oc();
      },
      useState: function(e) {
        $ = "useState", Me(), le();
        var t = he.current;
        he.current = _a;
        try {
          return Zp(e);
        } finally {
          he.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", Me(), le(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", Me(), le(), Py(e);
      },
      useTransition: function() {
        return $ = "useTransition", Me(), le(), $y();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", Me(), le(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", Me(), le(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", Me(), le(), Pc();
      },
      unstable_isNewReconciler: ze
    }, Bc = {
      readContext: function(e) {
        return cm(), Vt(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", Me(), le(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", Me(), le(), Vt(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", Me(), le(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", Me(), le(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", Me(), le(), Vc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", Me(), le(), Lc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", Me(), le();
        var n = he.current;
        he.current = _a;
        try {
          return zc(e, t);
        } finally {
          he.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", Me(), le();
        var a = he.current;
        he.current = _a;
        try {
          return Xp(e, t, n);
        } finally {
          he.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", Me(), le(), Oc();
      },
      useState: function(e) {
        $ = "useState", Me(), le();
        var t = he.current;
        he.current = _a;
        try {
          return em(e);
        } finally {
          he.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", Me(), le(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", Me(), le(), Hy(e);
      },
      useTransition: function() {
        return $ = "useTransition", Me(), le(), Yy();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", Me(), le(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", Me(), le(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", Me(), le(), Pc();
      },
      unstable_isNewReconciler: ze
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
          case C:
            var a = n.stateNode;
            a.effectDuration += t;
            return;
          case J:
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
          case C:
            var a = n.stateNode;
            a !== null && (a.passiveEffectDuration += t);
            return;
          case J:
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
      var n = Pe({}, t), a = e.defaultProps;
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
        var n = Xe(e) || "Component";
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
    var l = i == null ? r : Pe({}, r, i);
    if (e.memoizedState = l, e.lanes === G) {
      var s = e.updateQueue;
      s.baseState = l;
    }
  }
  var Dm = {
    isMounted: qS,
    enqueueSetState: function(e, t, n) {
      var a = dl(e), r = An(), i = ii(a), l = Rr(r, i);
      l.payload = t, n != null && (Gc(n, "setState"), l.callback = n);
      var s = Xr(a, l, i);
      s !== null && (Gt(s, a, i, r), Sc(s, a, i)), ad(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = dl(e), r = An(), i = ii(a), l = Rr(r, i);
      l.tag = xy, l.payload = t, n != null && (Gc(n, "replaceState"), l.callback = n);
      var s = Xr(a, l, i);
      s !== null && (Gt(s, a, i, r), Sc(s, a, i)), ad(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = dl(e), a = An(), r = ii(n), i = Rr(a, r);
      i.tag = bc, t != null && (Gc(t, "forceUpdate"), i.callback = t);
      var l = Xr(n, i, r);
      l !== null && (Gt(l, n, r, a), Sc(l, n, r)), xx(n, r);
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
        u === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Xe(t) || "Component");
      }
      return u;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Jo(n, a) || !Jo(r, i) : !0;
  }
  function nT(e, t, n) {
    var a = e.stateNode;
    {
      var r = Xe(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Dt) === De && (_s.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Dt) === De && (_s.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !xm.has(t) && (xm.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Xe(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !bm.has(t) && (bm.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Xe(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
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
        l === null || l !== void 0 && l.$$typeof === ce && l._context === void 0
      );
      if (!s && !Rm.has(t)) {
        Rm.add(t);
        var u = "";
        l === void 0 ? u = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? u = " However, it is set to a " + typeof l + "." : l.$$typeof === W ? u = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? u = " Did you accidentally pass the Context.Consumer instead?" : u = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Xe(t) || "Component", u);
      }
    }
    if (typeof l == "object" && l !== null)
      i = Vt(l);
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
    var D = e.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null;
    sb(e, h);
    {
      if (typeof t.getDerivedStateFromProps == "function" && D === null) {
        var x = Xe(t) || "Component";
        ym.has(x) || (ym.add(x), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", x, h.state === null ? "null" : "undefined", x));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function") {
        var M = null, L = null, P = null;
        if (typeof h.componentWillMount == "function" && h.componentWillMount.__suppressDeprecationWarning !== !0 ? M = "componentWillMount" : typeof h.UNSAFE_componentWillMount == "function" && (M = "UNSAFE_componentWillMount"), typeof h.componentWillReceiveProps == "function" && h.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? L = "componentWillReceiveProps" : typeof h.UNSAFE_componentWillReceiveProps == "function" && (L = "UNSAFE_componentWillReceiveProps"), typeof h.componentWillUpdate == "function" && h.componentWillUpdate.__suppressDeprecationWarning !== !0 ? P = "componentWillUpdate" : typeof h.UNSAFE_componentWillUpdate == "function" && (P = "UNSAFE_componentWillUpdate"), M !== null || L !== null || P !== null) {
          var fe = Xe(t) || "Component", Re = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          Nm.has(fe) || (Nm.add(fe), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, fe, Re, M !== null ? `
  ` + M : "", L !== null ? `
  ` + L : "", P !== null ? `
  ` + P : ""));
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
      r.context = Vt(i);
    else {
      var l = Ol(e, t, !0);
      r.context = Ml(e, l);
    }
    {
      if (r.state === n) {
        var s = Xe(t) || "Component";
        Sm.has(s) || (Sm.add(s), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", s));
      }
      e.mode & Dt && ja.recordLegacyContextWarning(e, r), ja.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var u = t.getDerivedStateFromProps;
    if (typeof u == "function" && (Cm(e, t, u, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (aT(e, r), xc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var v = Je;
      v |= Di, (e.mode & Ia) !== De && (v |= zr), e.flags |= v;
    }
  }
  function rT(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, s = t.contextType, u = Jn;
    if (typeof s == "object" && s !== null)
      u = Vt(s);
    else {
      var v = Ol(e, t, !0);
      u = Ml(e, v);
    }
    var h = t.getDerivedStateFromProps, D = typeof h == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !D && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== u) && cb(e, r, n, u), Cy();
    var x = e.memoizedState, M = r.state = x;
    if (xc(e, n, r, a), M = e.memoizedState, i === n && x === M && !rc() && !Rc()) {
      if (typeof r.componentDidMount == "function") {
        var L = Je;
        L |= Di, (e.mode & Ia) !== De && (L |= zr), e.flags |= L;
      }
      return !1;
    }
    typeof h == "function" && (Cm(e, t, h, n), M = e.memoizedState);
    var P = Rc() || ob(e, t, i, n, x, M, u);
    if (P) {
      if (!D && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var fe = Je;
        fe |= Di, (e.mode & Ia) !== De && (fe |= zr), e.flags |= fe;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var Re = Je;
        Re |= Di, (e.mode & Ia) !== De && (Re |= zr), e.flags |= Re;
      }
      e.memoizedProps = n, e.memoizedState = M;
    }
    return r.props = n, r.state = M, r.context = u, P;
  }
  function iT(e, t, n, a, r) {
    var i = t.stateNode;
    Ry(e, t);
    var l = t.memoizedProps, s = t.type === t.elementType ? l : Oa(t.type, l);
    i.props = s;
    var u = t.pendingProps, v = i.context, h = n.contextType, D = Jn;
    if (typeof h == "object" && h !== null)
      D = Vt(h);
    else {
      var x = Ol(t, n, !0);
      D = Ml(t, x);
    }
    var M = n.getDerivedStateFromProps, L = typeof M == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !L && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== u || v !== D) && cb(t, i, a, D), Cy();
    var P = t.memoizedState, fe = i.state = P;
    if (xc(t, a, i, r), fe = t.memoizedState, l === u && P === fe && !rc() && !Rc() && !We)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || P !== e.memoizedState) && (t.flags |= Je), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || P !== e.memoizedState) && (t.flags |= ml), !1;
    typeof M == "function" && (Cm(t, n, M, a), fe = t.memoizedState);
    var Re = Rc() || ob(t, n, s, a, P, fe, D) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    We;
    return Re ? (!L && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, fe, D), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, fe, D)), typeof i.componentDidUpdate == "function" && (t.flags |= Je), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= ml)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || P !== e.memoizedState) && (t.flags |= Je), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || P !== e.memoizedState) && (t.flags |= ml), t.memoizedProps = a, t.memoizedState = fe), i.props = a, i.state = fe, i.context = D, Re;
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
      var s = r ? Le(r) : null, u = s ? "The above error occurred in the <" + s + "> component:" : "The above error occurred in one of your React components:", v;
      if (e.tag === C)
        v = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var h = Le(e) || "Anonymous";
        v = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + h + ".");
      }
      var D = u + `
` + l + `

` + ("" + v);
      console.error(D);
    } catch (x) {
      setTimeout(function() {
        throw x;
      });
    }
  }
  var oT = typeof WeakMap == "function" ? WeakMap : Map;
  function fb(e, t, n) {
    var a = Rr(ft, n);
    a.tag = Vp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Zj(r), wm(e, t);
    }, a;
  }
  function _m(e, t, n) {
    var a = Rr(ft, n);
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
      }), typeof r != "function" && (Wn(e.lanes, Oe) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Le(e) || "Unknown"));
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
    if ((e.mode & Ie) === De && (n === R || n === Y || n === U)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function pb(e) {
    var t = e;
    do {
      if (t.tag === Z && $D(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function mb(e, t, n, a, r) {
    if ((e.mode & Ie) === De) {
      if (e === t)
        e.flags |= _n;
      else {
        if (e.flags |= Ze, n.flags |= Kf, n.flags &= -52805, n.tag === T) {
          var i = n.alternate;
          if (i === null)
            n.tag = K;
          else {
            var l = Rr(ft, Oe);
            l.tag = bc, Xr(n, l, Oe);
          }
        }
        n.lanes = Ue(n.lanes, Oe);
      }
      return e;
    }
    return e.flags |= _n, e.lanes = r, e;
  }
  function cT(e, t, n, a, r) {
    if (n.flags |= Su, Ra && Gs(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      uT(n), ln() && n.mode & Ie && iy();
      var l = pb(t);
      if (l !== null) {
        l.flags &= ~pr, mb(l, t, n, e, r), l.mode & Ie && db(e, i, r), sT(l, e, i);
        return;
      } else {
        if (!Mx(r)) {
          db(e, i, r), uv();
          return;
        }
        var s = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = s;
      }
    } else if (ln() && n.mode & Ie) {
      iy();
      var u = pb(t);
      if (u !== null) {
        (u.flags & _n) === je && (u.flags |= pr), mb(u, t, n, e, r), Sp(Yi(a, n));
        return;
      }
    }
    a = Yi(a, n), $j(a);
    var v = t;
    do {
      switch (v.tag) {
        case C: {
          var h = a;
          v.flags |= _n;
          var D = Uo(r);
          v.lanes = Ue(v.lanes, D);
          var x = fb(v, h, D);
          Up(v, x);
          return;
        }
        case T:
          var M = a, L = v.type, P = v.stateNode;
          if ((v.flags & Ze) === je && (typeof L.getDerivedStateFromError == "function" || P !== null && typeof P.componentDidCatch == "function" && !pN(P))) {
            v.flags |= _n;
            var fe = Uo(r);
            v.lanes = Ue(v.lanes, fe);
            var Re = _m(v, M, fe);
            Up(v, Re);
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
  var Os = m.ReactCurrentOwner, Ma = !1, Om, Ms, Mm, Am, Vm, Ii, Lm, Wc, As;
  Om = {}, Ms = {}, Mm = {}, Am = {}, Vm = {}, Ii = !1, Lm = {}, Wc = {}, As = {};
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
        Xe(n)
      );
    }
    var l = n.render, s = t.ref, u, v;
    Fl(t, r), Oo(t);
    {
      if (Os.current = t, la(!0), u = Yl(e, t, l, a, s, r), v = Il(), t.mode & Dt) {
        Zt(!0);
        try {
          u = Yl(e, t, l, a, s, r), v = Il();
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
        return l = Zl(i), t.tag = U, t.type = l, Fm(t, i), gb(e, t, l, a, r);
      }
      {
        var s = i.propTypes;
        if (s && Da(
          s,
          a,
          // Resolved props
          "prop",
          Xe(i)
        ), n.defaultProps !== void 0) {
          var u = Xe(i) || "Unknown";
          As[u] || (f("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", u), As[u] = !0);
        }
      }
      var v = Nv(n.type, null, a, t, t.mode, r);
      return v.ref = t.ref, v.return = t, t.child = v, v;
    }
    {
      var h = n.type, D = h.propTypes;
      D && Da(
        D,
        a,
        // Resolved props
        "prop",
        Xe(h)
      );
    }
    var x = e.child, M = Ym(e, r);
    if (!M) {
      var L = x.memoizedProps, P = n.compare;
      if (P = P !== null ? P : Jo, P(L, a) && e.ref === t.ref)
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
          Xe(i)
        );
      }
    }
    if (e !== null) {
      var h = e.memoizedProps;
      if (Jo(h, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (Ma = !1, t.pendingProps = a = h, Ym(e, r))
          (e.flags & Kf) !== je && (Ma = !0);
        else return t.lanes = e.lanes, Cr(e, t, r);
    }
    return km(e, t, n, a, r);
  }
  function yb(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || lt)
      if ((t.mode & Ie) === De) {
        var l = {
          baseLanes: G,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, sf(t, n);
      } else if (Wn(n, Gn)) {
        var D = {
          baseLanes: G,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = D;
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
      t.flags |= Je;
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
        Xe(n)
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
      if (Os.current = t, la(!0), u = Yl(e, t, n, a, l, r), v = Il(), t.mode & Dt) {
        Zt(!0);
        try {
          u = Yl(e, t, n, a, l, r), v = Il();
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
          t.flags |= Ze, t.flags |= _n;
          var v = new Error("Simulated error coming from DevTools"), h = Uo(r);
          t.lanes = Ue(t.lanes, h);
          var D = _m(t, Yi(v, t), h);
          Up(t, D);
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
          Xe(n)
        );
      }
    }
    var M;
    Wa(n) ? (M = !0, lc(t)) : M = !1, Fl(t, r);
    var L = t.stateNode, P;
    L === null ? (Qc(e, t), ub(t, n, a), Tm(t, n, a, r), P = !0) : e === null ? P = rT(t, n, a, r) : P = iT(e, t, n, a, r);
    var fe = Um(e, t, n, P, M, r);
    {
      var Re = t.stateNode;
      P && Re.props !== a && (Ii || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Le(t) || "a component"), Ii = !0);
    }
    return fe;
  }
  function Um(e, t, n, a, r, i) {
    bb(e, t);
    var l = (t.flags & Ze) !== je;
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
        var D = Yi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return Sb(e, t, s, n, D);
      } else {
        bD(t);
        var x = gy(t, null, s, n);
        t.child = x;
        for (var M = x; M; )
          M.flags = M.flags & ~At | mr, M = M.sibling;
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
    var v = t.tag = yw(u), h = Oa(u, r), D;
    switch (v) {
      case R:
        return Fm(t, u), t.type = u = Zl(u), D = km(null, t, u, h, a), D;
      case T:
        return t.type = u = mv(u), D = Nb(null, t, u, h, a), D;
      case Y:
        return t.type = u = vv(u), D = vb(null, t, u, h, a), D;
      case re: {
        if (t.type !== t.elementType) {
          var x = u.propTypes;
          x && Da(
            x,
            h,
            // Resolved for outer only
            "prop",
            Xe(u)
          );
        }
        return D = hb(
          null,
          t,
          u,
          Oa(u.type, h),
          // The inner type can have defaults too
          a
        ), D;
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
  function ET(e, t, n, a) {
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
        var v = Xe(n) || "Unknown";
        Om[v] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", v, v), Om[v] = !0);
      }
      t.mode & Dt && ja.recordLegacyContextWarning(t, null), la(!0), Os.current = t, s = Yl(null, t, n, r, i, a), u = Il(), la(!1);
    }
    if (gl(), t.flags |= pl, typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0) {
      var h = Xe(n) || "Unknown";
      Ms[h] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", h, h, h), Ms[h] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0
    ) {
      {
        var D = Xe(n) || "Unknown";
        Ms[D] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", D, D, D), Ms[D] = !0);
      }
      t.tag = T, t.memoizedState = null, t.updateQueue = null;
      var x = !1;
      return Wa(n) ? (x = !0, lc(t)) : x = !1, t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, kp(t), sb(t, s), Tm(t, n, r, a), Um(null, t, n, !0, x, a);
    } else {
      if (t.tag = R, t.mode & Dt) {
        Zt(!0);
        try {
          s = Yl(null, t, n, r, i, a), u = Il();
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
        i && (r = i.fileName + ":" + i.lineNumber), Vm[r] || (Vm[r] = !0, f("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = Xe(t) || "Unknown";
        As[l] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), As[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var s = Xe(t) || "Unknown";
        Am[s] || (f("%s: Function components do not support getDerivedStateFromProps.", s), Am[s] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var u = Xe(t) || "Unknown";
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
    Aw(t) && (t.flags |= Ze);
    var r = wa.current, i = !1, l = (t.flags & Ze) !== je;
    if (l || xT(r, e) ? (i = !0, t.flags &= ~Ze) : (e === null || e.memoizedState !== null) && (r = BD(r, _y)), r = Pl(r), Zr(t, r), e === null) {
      Ep(t);
      var s = t.memoizedState;
      if (s !== null) {
        var u = s.dehydrated;
        if (u !== null)
          return wT(t, u);
      }
      var v = a.children, h = a.fallback;
      if (i) {
        var D = CT(t, v, h, n), x = t.child;
        return x.memoizedState = Pm(n), t.memoizedState = zm, D;
      } else
        return Hm(t, v);
    } else {
      var M = e.memoizedState;
      if (M !== null) {
        var L = M.dehydrated;
        if (L !== null)
          return _T(e, t, l, a, L, M, n);
      }
      if (i) {
        var P = a.fallback, fe = a.children, Re = TT(e, t, fe, P, n), Ee = t.child, Ge = e.child.memoizedState;
        return Ee.memoizedState = Ge === null ? Pm(n) : ST(Ge, n), Ee.childLanes = RT(e, n), t.memoizedState = zm, Re;
      } else {
        var Be = a.children, j = DT(e, t, Be, n);
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
    return (r & Ie) === De && i !== null ? (s = i, s.childLanes = G, s.pendingProps = l, e.mode & at && (s.actualDuration = 0, s.actualStartTime = -1, s.selfBaseDuration = 0, s.treeBaseDuration = 0), u = oi(n, r, a, null)) : (s = Bm(l, r), u = oi(n, r, a, null)), s.return = e, u.return = e, s.sibling = u, e.child = s, u;
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
    if ((t.mode & Ie) === De && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
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
      (i & Ie) === De && // Make sure we're on the second pass, i.e. the primary child fragment was
      // already cloned. In legacy mode, the only case where this isn't true is
      // when DevTools forces us to display a fallback; we skip the first render
      // pass entirely and go straight to rendering the fallback. (In Concurrent
      // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
      // only codepath.)
      t.child !== l
    ) {
      var h = t.child;
      v = h, v.childLanes = G, v.pendingProps = u, t.mode & at && (v.actualDuration = 0, v.actualStartTime = -1, v.selfBaseDuration = l.selfBaseDuration, v.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      v = Rb(l, u), v.subtreeFlags = l.subtreeFlags & vr;
    var D;
    return s !== null ? D = Qi(s, a) : (D = oi(a, i, r, null), D.flags |= At), D.return = t, v.return = t, v.sibling = D, t.child = v, D;
  }
  function Kc(e, t, n, a) {
    a !== null && Sp(a), kl(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = Hm(t, i);
    return l.flags |= At, t.memoizedState = null, l;
  }
  function jT(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, s = Bm(l, i), u = oi(a, i, r, null);
    return u.flags |= At, s.return = t, u.return = t, s.sibling = u, t.child = s, (t.mode & Ie) !== De && kl(t, e.child, null, r), u;
  }
  function wT(e, t, n) {
    return (e.mode & Ie) === De ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Oe) : lp(t) ? e.lanes = wi : e.lanes = Gn, null;
  }
  function _T(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & pr) {
        t.flags &= ~pr;
        var j = jm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return Kc(e, t, l, j);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= Ze, null;
        var H = a.children, w = a.fallback, X = jT(e, t, H, w, l), ge = t.child;
        return ge.memoizedState = Pm(l), t.memoizedState = zm, X;
      }
    else {
      if (gD(), (t.mode & Ie) === De)
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
        var D;
        u ? D = new Error(u) : D = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var x = jm(D, s, v);
        return Kc(e, t, l, x);
      }
      var M = Wn(l, e.childLanes);
      if (Ma || M) {
        var L = of();
        if (L !== null) {
          var P = Px(L, l);
          if (P !== en && P !== i.retryLane) {
            i.retryLane = P;
            var fe = ft;
            Hn(e, P), Gt(L, e, P, fe);
          }
        }
        uv();
        var Re = jm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Kc(e, t, l, Re);
      } else if (Gg(r)) {
        t.flags |= Ze, t.child = e.child;
        var Ee = tw.bind(null, e);
        return LC(r, Ee), null;
      } else {
        ND(t, r, i.treeContext);
        var Ge = a.children, Be = Hm(t, Ge);
        return Be.flags |= mr, Be;
      }
    }
  }
  function Cb(e, t, n) {
    e.lanes = Ue(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Ue(a.lanes, t)), Mp(e.return, t, n);
  }
  function OT(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === Z) {
        var r = a.memoizedState;
        r !== null && Cb(a, n, e);
      } else if (a.tag === ne)
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
      var n = He(e), a = !n && typeof Sa(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function LT(e, t) {
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
    AT(r), VT(i, r), LT(l, r), On(e, t, l, n);
    var s = wa.current, u = Hp(s, Ss);
    if (u)
      s = Bp(s, Ss), t.flags |= Ze;
    else {
      var v = e !== null && (e.flags & Ze) !== je;
      v && OT(t, t.child, n), s = Pl(s);
    }
    if (Zr(t, s), (t.mode & Ie) === De)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var h = MT(t.child), D;
          h === null ? (D = t.child, t.child = null) : (D = h.sibling, h.sibling = null), $m(
            t,
            !1,
            // isBackwards
            D,
            h,
            i
          );
          break;
        }
        case "backwards": {
          var x = null, M = t.child;
          for (t.child = null; M !== null; ) {
            var L = M.alternate;
            if (L !== null && Tc(L) === null) {
              t.child = M;
              break;
            }
            var P = M.sibling;
            M.sibling = x, x = M, M = P;
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
    var l = Vt(a);
    Oo(t);
    var s;
    return Os.current = t, la(!0), s = i(l), la(!1), gl(), t.flags |= pl, On(e, t, s, n), t.child;
  }
  function Vs() {
    Ma = !0;
  }
  function Qc(e, t) {
    (t.mode & Ie) === De && e !== null && (e.alternate = null, t.alternate = null, t.flags |= At);
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
  function Ym(e, t) {
    var n = e.lanes;
    return !!Wn(n, t);
  }
  function PT(e, t, n) {
    switch (t.tag) {
      case C:
        Eb(t), t.stateNode, Ll();
        break;
      case O:
        jy(t);
        break;
      case T: {
        var a = t.type;
        Wa(a) && lc(t);
        break;
      }
      case k:
        Fp(t, t.stateNode.containerInfo);
        break;
      case q: {
        var r = t.memoizedProps.value, i = t.type._context;
        Ny(t, i, r);
        break;
      }
      case J:
        {
          var l = Wn(n, t.childLanes);
          l && (t.flags |= Je);
          {
            var s = t.stateNode;
            s.effectDuration = 0, s.passiveEffectDuration = 0;
          }
        }
        break;
      case Z: {
        var u = t.memoizedState;
        if (u !== null) {
          if (u.dehydrated !== null)
            return Zr(t, Pl(wa.current)), t.flags |= Ze, null;
          var v = t.child, h = v.childLanes;
          if (Wn(n, h))
            return xb(e, t, n);
          Zr(t, Pl(wa.current));
          var D = Cr(e, t, n);
          return D !== null ? D.sibling : null;
        } else
          Zr(t, Pl(wa.current));
        break;
      }
      case ne: {
        var x = (e.flags & Ze) !== je, M = Wn(n, t.childLanes);
        if (x) {
          if (M)
            return Tb(e, t, n);
          t.flags |= Ze;
        }
        var L = t.memoizedState;
        if (L !== null && (L.rendering = null, L.tail = null, L.lastEffect = null), Zr(t, wa.current), M)
          break;
        return null;
      }
      case Q:
      case F:
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
        var i = Ym(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & Ze) === je)
          return Ma = !1, PT(e, t, n);
        (e.flags & Kf) !== je ? Ma = !0 : Ma = !1;
      }
    } else if (Ma = !1, ln() && fD(t)) {
      var l = t.index, s = dD();
      ry(t, s, l);
    }
    switch (t.lanes = G, t.tag) {
      case _:
        return ET(e, t, t.type, n);
      case be: {
        var u = t.elementType;
        return bT(e, t, u, n);
      }
      case R: {
        var v = t.type, h = t.pendingProps, D = t.elementType === v ? h : Oa(v, h);
        return km(e, t, v, D, n);
      }
      case T: {
        var x = t.type, M = t.pendingProps, L = t.elementType === x ? M : Oa(x, M);
        return Nb(e, t, x, L, n);
      }
      case C:
        return hT(e, t, n);
      case O:
        return gT(e, t, n);
      case B:
        return yT(e, t);
      case Z:
        return xb(e, t, n);
      case k:
        return kT(e, t, n);
      case Y: {
        var P = t.type, fe = t.pendingProps, Re = t.elementType === P ? fe : Oa(P, fe);
        return vb(e, t, P, Re, n);
      }
      case se:
        return pT(e, t, n);
      case ie:
        return mT(e, t, n);
      case J:
        return vT(e, t, n);
      case q:
        return UT(e, t, n);
      case ve:
        return FT(e, t, n);
      case re: {
        var Ee = t.type, Ge = t.pendingProps, Be = Oa(Ee, Ge);
        if (t.type !== t.elementType) {
          var j = Ee.propTypes;
          j && Da(
            j,
            Be,
            // Resolved for outer only
            "prop",
            Xe(Ee)
          );
        }
        return Be = Oa(Ee.type, Be), hb(e, t, Ee, Be, n);
      }
      case U:
        return gb(e, t, t.type, t.pendingProps, n);
      case K: {
        var H = t.type, w = t.pendingProps, X = t.elementType === H ? w : Oa(H, w);
        return NT(e, t, H, X, n);
      }
      case ne:
        return Tb(e, t, n);
      case I:
        break;
      case Q:
        return yb(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function ql(e) {
    e.flags |= Je;
  }
  function Ob(e) {
    e.flags |= Ri, e.flags |= Qf;
  }
  var Mb, Im, Ab, Vb;
  Mb = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === O || r.tag === B)
        sC(e, r.stateNode);
      else if (r.tag !== k) {
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
  }, Ab = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, s = zp(), u = cC(l, n, i, a, r, s);
      t.updateQueue = u, u && ql(t);
    }
  }, Vb = function(e, t, n, a) {
    n !== a && ql(t);
  };
  function Ls(e, t) {
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
      if ((e.mode & at) !== De) {
        for (var u = e.selfBaseDuration, v = e.child; v !== null; )
          n = Ue(n, Ue(v.lanes, v.childLanes)), a |= v.subtreeFlags & vr, a |= v.flags & vr, u += v.treeBaseDuration, v = v.sibling;
        e.treeBaseDuration = u;
      } else
        for (var h = e.child; h !== null; )
          n = Ue(n, Ue(h.lanes, h.childLanes)), a |= h.subtreeFlags & vr, a |= h.flags & vr, h.return = e, h = h.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & at) !== De) {
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
    if (CD() && (t.mode & Ie) !== De && (t.flags & Ze) === je)
      return fy(t), Ll(), t.flags |= pr | Su | _n, !1;
    var a = fc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (xD(t), sn(t), (t.mode & at) !== De) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Ll(), (t.flags & Ze) === je && (t.memoizedState = null), t.flags |= Je, sn(t), (t.mode & at) !== De) {
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
      case _:
      case be:
      case U:
      case R:
      case Y:
      case se:
      case ie:
      case J:
      case ve:
      case re:
        return sn(t), null;
      case T: {
        var r = t.type;
        return Wa(r) && ic(t), sn(t), null;
      }
      case C: {
        var i = t.stateNode;
        if (zl(t), pp(t), Yp(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
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
        return Im(e, t), sn(t), null;
      }
      case O: {
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
          var h = zp(), D = fc(t);
          if (D)
            ED(t, u, h) && ql(t);
          else {
            var x = oC(v, a, u, h, t);
            Mb(x, t, !1, !1), t.stateNode = x, uC(x, v, a, u) && ql(t);
          }
          t.ref !== null && Ob(t);
        }
        return sn(t), null;
      }
      case B: {
        var M = a;
        if (e && t.stateNode != null) {
          var L = e.memoizedProps;
          Vb(e, t, L, M);
        } else {
          if (typeof M != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var P = Ty(), fe = zp(), Re = fc(t);
          Re ? SD(t) && ql(t) : t.stateNode = fC(M, P, fe, t);
        }
        return sn(t), null;
      }
      case Z: {
        Hl(t);
        var Ee = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var Ge = HT(e, t, Ee);
          if (!Ge)
            return t.flags & _n ? t : null;
        }
        if ((t.flags & Ze) !== je)
          return t.lanes = n, (t.mode & at) !== De && vm(t), t;
        var Be = Ee !== null, j = e !== null && e.memoizedState !== null;
        if (Be !== j && Be) {
          var H = t.child;
          if (H.flags |= Ci, (t.mode & Ie) !== De) {
            var w = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            w || Hp(wa.current, _y) ? Bj() : uv();
          }
        }
        var X = t.updateQueue;
        if (X !== null && (t.flags |= Je), sn(t), (t.mode & at) !== De && Be) {
          var ge = t.child;
          ge !== null && (t.treeBaseDuration -= ge.treeBaseDuration);
        }
        return null;
      }
      case k:
        return zl(t), Im(e, t), e === null && rD(t.stateNode.containerInfo), sn(t), null;
      case q:
        var de = t.type._context;
        return Op(de, t), sn(t), null;
      case K: {
        var we = t.type;
        return Wa(we) && ic(t), sn(t), null;
      }
      case ne: {
        Hl(t);
        var Ve = t.memoizedState;
        if (Ve === null)
          return sn(t), null;
        var it = (t.flags & Ze) !== je, Ke = Ve.rendering;
        if (Ke === null)
          if (it)
            Ls(Ve, !1);
          else {
            var wt = Yj() && (e === null || (e.flags & Ze) === je);
            if (!wt)
              for (var Qe = t.child; Qe !== null; ) {
                var Tt = Tc(Qe);
                if (Tt !== null) {
                  it = !0, t.flags |= Ze, Ls(Ve, !1);
                  var En = Tt.updateQueue;
                  return En !== null && (t.updateQueue = En, t.flags |= Je), t.subtreeFlags = je, MD(t, n), Zr(t, Bp(wa.current, Ss)), t.child;
                }
                Qe = Qe.sibling;
              }
            Ve.tail !== null && Jt() > nN() && (t.flags |= Ze, it = !0, Ls(Ve, !1), t.lanes = Vh);
          }
        else {
          if (!it) {
            var pn = Tc(Ke);
            if (pn !== null) {
              t.flags |= Ze, it = !0;
              var ea = pn.updateQueue;
              if (ea !== null && (t.updateQueue = ea, t.flags |= Je), Ls(Ve, !0), Ve.tail === null && Ve.tailMode === "hidden" && !Ke.alternate && !ln())
                return sn(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            Jt() * 2 - Ve.renderingStartTime > nN() && n !== Gn && (t.flags |= Ze, it = !0, Ls(Ve, !1), t.lanes = Vh);
          }
          if (Ve.isBackwards)
            Ke.sibling = t.child, t.child = Ke;
          else {
            var Vn = Ve.last;
            Vn !== null ? Vn.sibling = Ke : t.child = Ke, Ve.last = Ke;
          }
        }
        if (Ve.tail !== null) {
          var Ln = Ve.tail;
          Ve.rendering = Ln, Ve.tail = Ln.sibling, Ve.renderingStartTime = Jt(), Ln.sibling = null;
          var Sn = wa.current;
          return it ? Sn = Bp(Sn, Ss) : Sn = Pl(Sn), Zr(t, Sn), Ln;
        }
        return sn(t), null;
      }
      case I:
        break;
      case Q:
      case F: {
        sv(t);
        var _r = t.memoizedState, eo = _r !== null;
        if (e !== null) {
          var Xs = e.memoizedState, nr = Xs !== null;
          nr !== eo && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !lt && (t.flags |= Ci);
        }
        return !eo || (t.mode & Ie) === De ? sn(t) : Wn(tr, Gn) && (sn(t), t.subtreeFlags & (At | Je) && (t.flags |= Ci)), null;
      }
      case oe:
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
        Wa(a) && ic(t);
        var r = t.flags;
        return r & _n ? (t.flags = r & ~_n | Ze, (t.mode & at) !== De && vm(t), t) : null;
      }
      case C: {
        t.stateNode, zl(t), pp(t), Yp();
        var i = t.flags;
        return (i & _n) !== je && (i & Ze) === je ? (t.flags = i & ~_n | Ze, t) : null;
      }
      case O:
        return Pp(t), null;
      case Z: {
        Hl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Ll();
        }
        var s = t.flags;
        return s & _n ? (t.flags = s & ~_n | Ze, (t.mode & at) !== De && vm(t), t) : null;
      }
      case ne:
        return Hl(t), null;
      case k:
        return zl(t), null;
      case q:
        var u = t.type._context;
        return Op(u, t), null;
      case Q:
      case F:
        return sv(t), null;
      case oe:
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
      case C: {
        t.stateNode, zl(t), pp(t), Yp();
        break;
      }
      case O: {
        Pp(t);
        break;
      }
      case k:
        zl(t);
        break;
      case Z:
        Hl(t);
        break;
      case ne:
        Hl(t);
        break;
      case q:
        var r = t.type._context;
        Op(r, t);
        break;
      case Q:
      case F:
        sv(t);
        break;
    }
  }
  var Ub = null;
  Ub = /* @__PURE__ */ new Set();
  var Xc = !1, un = !1, $T = typeof WeakSet == "function" ? WeakSet : Set, ye = null, Gl = null, Wl = null;
  function YT(e) {
    qf(null, function() {
      throw e;
    }), Gf();
  }
  var IT = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & at)
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
      st(e, t, n);
    }
  }
  function qm(e, t, n) {
    try {
      IT(e, n);
    } catch (a) {
      st(e, t, a);
    }
  }
  function qT(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      st(e, t, a);
    }
  }
  function zb(e, t) {
    try {
      Hb(e);
    } catch (n) {
      st(e, t, n);
    }
  }
  function Kl(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function") {
        var a;
        try {
          if (nn && ha && e.mode & at)
            try {
              Za(), a = n(null);
            } finally {
              Ja(e);
            }
          else
            a = n(null);
        } catch (r) {
          st(e, t, r);
        }
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Le(e));
      } else
        n.current = null;
  }
  function Jc(e, t, n) {
    try {
      n();
    } catch (a) {
      st(e, t, a);
    }
  }
  var Pb = !1;
  function GT(e, t) {
    iC(e.containerInfo), ye = t, WT();
    var n = Pb;
    return Pb = !1, n;
  }
  function WT() {
    for (; ye !== null; ) {
      var e = ye, t = e.child;
      (e.subtreeFlags & Zf) !== je && t !== null ? (t.return = e, ye = t) : KT();
    }
  }
  function KT() {
    for (; ye !== null; ) {
      var e = ye;
      gt(e);
      try {
        QT(e);
      } catch (n) {
        st(e, e.return, n);
      }
      Xt();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, ye = t;
        return;
      }
      ye = e.return;
    }
  }
  function QT(e) {
    var t = e.alternate, n = e.flags;
    if ((n & ml) !== je) {
      switch (gt(e), e.tag) {
        case R:
        case Y:
        case U:
          break;
        case T: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !Ii && (i.props !== e.memoizedProps && f("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Le(e) || "instance"), i.state !== e.memoizedState && f("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Le(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : Oa(e.type, a), r);
            {
              var s = Ub;
              l === void 0 && !s.has(e.type) && (s.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Le(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case C: {
          {
            var u = e.stateNode;
            _C(u.containerInfo);
          }
          break;
        }
        case O:
        case B:
        case k:
        case K:
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
    if ((t.flags & Je) !== je)
      switch (t.tag) {
        case J: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = nb(), s = t.alternate === null ? "mount" : "update";
          tb() && (s = "nested-update"), typeof i == "function" && i(r, s, n, l);
          var u = t.return;
          e: for (; u !== null; ) {
            switch (u.tag) {
              case C:
                var v = u.stateNode;
                v.passiveEffectDuration += n;
                break e;
              case J:
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
        case Y:
        case U: {
          if (!un)
            if (n.mode & at)
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
          if (n.flags & Je && !un)
            if (t === null)
              if (n.type === n.elementType && !Ii && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Le(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Le(n) || "instance")), n.mode & at)
                try {
                  Za(), r.componentDidMount();
                } finally {
                  Ja(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : Oa(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !Ii && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Le(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Le(n) || "instance")), n.mode & at)
                try {
                  Za(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Ja(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var s = n.updateQueue;
          s !== null && (n.type === n.elementType && !Ii && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Le(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Le(n) || "instance")), Dy(n, s, r));
          break;
        }
        case C: {
          var u = n.updateQueue;
          if (u !== null) {
            var v = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case O:
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
        case O: {
          var h = n.stateNode;
          if (t === null && n.flags & Je) {
            var D = n.type, x = n.memoizedProps;
            hC(h, D, x);
          }
          break;
        }
        case B:
          break;
        case k:
          break;
        case J: {
          {
            var M = n.memoizedProps, L = M.onCommit, P = M.onRender, fe = n.stateNode.effectDuration, Re = nb(), Ee = t === null ? "mount" : "update";
            tb() && (Ee = "nested-update"), typeof P == "function" && P(n.memoizedProps.id, Ee, n.actualDuration, n.treeBaseDuration, n.actualStartTime, Re);
            {
              typeof L == "function" && L(n.memoizedProps.id, Ee, fe, Re), Kj(n);
              var Ge = n.return;
              e: for (; Ge !== null; ) {
                switch (Ge.tag) {
                  case C:
                    var Be = Ge.stateNode;
                    Be.effectDuration += fe;
                    break e;
                  case J:
                    var j = Ge.stateNode;
                    j.effectDuration += fe;
                    break e;
                }
                Ge = Ge.return;
              }
            }
          }
          break;
        }
        case Z: {
          lj(e, n);
          break;
        }
        case ne:
        case K:
        case I:
        case Q:
        case F:
        case pe:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    un || n.flags & Ri && Hb(n);
  }
  function ZT(e) {
    switch (e.tag) {
      case R:
      case Y:
      case U: {
        if (e.mode & at)
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
      case O: {
        zb(e, e.return);
        break;
      }
    }
  }
  function ej(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === O) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? DC(r) : jC(a.stateNode, a.memoizedProps);
          } catch (l) {
            st(e, e.return, l);
          }
        }
      } else if (a.tag === B) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? TC(i) : wC(i, a.memoizedProps);
          } catch (l) {
            st(e, e.return, l);
          }
      } else if (!((a.tag === Q || a.tag === F) && a.memoizedState !== null && a !== e)) {
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
        case O:
          a = n;
          break;
        default:
          a = n;
      }
      if (typeof t == "function") {
        var r;
        if (e.mode & at)
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
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === O) {
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
    return e.tag === O || e.tag === C || e.tag === k;
  }
  function Yb(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || $b(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== O && t.tag !== B && t.tag !== ee; ) {
        if (t.flags & At || t.child === null || t.tag === k)
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
      case O: {
        var n = t.stateNode;
        t.flags & wo && (qg(n), t.flags &= ~wo);
        var a = Yb(e);
        Wm(e, a, n);
        break;
      }
      case C:
      case k: {
        var r = t.stateNode.containerInfo, i = Yb(e);
        Gm(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Gm(e, t, n) {
    var a = e.tag, r = a === O || a === B;
    if (r) {
      var i = e.stateNode;
      t ? SC(n, i, t) : NC(n, i);
    } else if (a !== k) {
      var l = e.child;
      if (l !== null) {
        Gm(l, t, n);
        for (var s = l.sibling; s !== null; )
          Gm(s, t, n), s = s.sibling;
      }
    }
  }
  function Wm(e, t, n) {
    var a = e.tag, r = a === O || a === B;
    if (r) {
      var i = e.stateNode;
      t ? EC(n, i, t) : bC(n, i);
    } else if (a !== k) {
      var l = e.child;
      if (l !== null) {
        Wm(l, t, n);
        for (var s = l.sibling; s !== null; )
          Wm(s, t, n), s = s.sibling;
      }
    }
  }
  var cn = null, Va = !1;
  function rj(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case O: {
            cn = a.stateNode, Va = !1;
            break e;
          }
          case C: {
            cn = a.stateNode.containerInfo, Va = !0;
            break e;
          }
          case k: {
            cn = a.stateNode.containerInfo, Va = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (cn === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      Ib(e, t, n), cn = null, Va = !1;
    }
    tj(n);
  }
  function ai(e, t, n) {
    for (var a = n.child; a !== null; )
      Ib(e, t, a), a = a.sibling;
  }
  function Ib(e, t, n) {
    switch (ix(n), n.tag) {
      case O:
        un || Kl(n, t);
      case B: {
        {
          var a = cn, r = Va;
          cn = null, ai(e, t, n), cn = a, Va = r, cn !== null && (Va ? RC(cn, n.stateNode) : xC(cn, n.stateNode));
        }
        return;
      }
      case ee: {
        cn !== null && (Va ? CC(cn, n.stateNode) : ip(cn, n.stateNode));
        return;
      }
      case k: {
        {
          var i = cn, l = Va;
          cn = n.stateNode.containerInfo, Va = !0, ai(e, t, n), cn = i, Va = l;
        }
        return;
      }
      case R:
      case Y:
      case re:
      case U: {
        if (!un) {
          var s = n.updateQueue;
          if (s !== null) {
            var u = s.lastEffect;
            if (u !== null) {
              var v = u.next, h = v;
              do {
                var D = h, x = D.destroy, M = D.tag;
                x !== void 0 && ((M & Ka) !== Bn ? Jc(n, t, x) : (M & Ht) !== Bn && (wh(n), n.mode & at ? (Za(), Jc(n, t, x), Ja(n)) : Jc(n, t, x), _h())), h = h.next;
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
          var L = n.stateNode;
          typeof L.componentWillUnmount == "function" && qm(n, t, L);
        }
        ai(e, t, n);
        return;
      }
      case I: {
        ai(e, t, n);
        return;
      }
      case Q: {
        if (
          // TODO: Remove this dead flag
          n.mode & Ie
        ) {
          var P = un;
          un = P || n.memoizedState !== null, ai(e, t, n), un = P;
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
  function La(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          rj(e, t, i);
        } catch (u) {
          st(i, t, u);
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
      case Y:
      case re:
      case U: {
        if (La(t, e), er(e), r & Je) {
          try {
            Aa(Ka | Pt, e, e.return), ni(Ka | Pt, e);
          } catch (we) {
            st(e, e.return, we);
          }
          if (e.mode & at) {
            try {
              Za(), Aa(Ht | Pt, e, e.return);
            } catch (we) {
              st(e, e.return, we);
            }
            Ja(e);
          } else
            try {
              Aa(Ht | Pt, e, e.return);
            } catch (we) {
              st(e, e.return, we);
            }
        }
        return;
      }
      case T: {
        La(t, e), er(e), r & Ri && a !== null && Kl(a, a.return);
        return;
      }
      case O: {
        La(t, e), er(e), r & Ri && a !== null && Kl(a, a.return);
        {
          if (e.flags & wo) {
            var i = e.stateNode;
            try {
              qg(i);
            } catch (we) {
              st(e, e.return, we);
            }
          }
          if (r & Je) {
            var l = e.stateNode;
            if (l != null) {
              var s = e.memoizedProps, u = a !== null ? a.memoizedProps : s, v = e.type, h = e.updateQueue;
              if (e.updateQueue = null, h !== null)
                try {
                  gC(l, h, v, u, s, e);
                } catch (we) {
                  st(e, e.return, we);
                }
            }
          }
        }
        return;
      }
      case B: {
        if (La(t, e), er(e), r & Je) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var D = e.stateNode, x = e.memoizedProps, M = a !== null ? a.memoizedProps : x;
          try {
            yC(D, M, x);
          } catch (we) {
            st(e, e.return, we);
          }
        }
        return;
      }
      case C: {
        if (La(t, e), er(e), r & Je && a !== null) {
          var L = a.memoizedState;
          if (L.isDehydrated)
            try {
              $C(t.containerInfo);
            } catch (we) {
              st(e, e.return, we);
            }
        }
        return;
      }
      case k: {
        La(t, e), er(e);
        return;
      }
      case Z: {
        La(t, e), er(e);
        var P = e.child;
        if (P.flags & Ci) {
          var fe = P.stateNode, Re = P.memoizedState, Ee = Re !== null;
          if (fe.isHidden = Ee, Ee) {
            var Ge = P.alternate !== null && P.alternate.memoizedState !== null;
            Ge || Hj();
          }
        }
        if (r & Je) {
          try {
            ij(e);
          } catch (we) {
            st(e, e.return, we);
          }
          qb(e);
        }
        return;
      }
      case Q: {
        var Be = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Ie
        ) {
          var j = un;
          un = j || Be, La(t, e), un = j;
        } else
          La(t, e);
        if (er(e), r & Ci) {
          var H = e.stateNode, w = e.memoizedState, X = w !== null, ge = e;
          if (H.isHidden = X, X && !Be && (ge.mode & Ie) !== De) {
            ye = ge;
            for (var de = ge.child; de !== null; )
              ye = de, uj(de), de = de.sibling;
          }
          ej(ge, X);
        }
        return;
      }
      case ne: {
        La(t, e), er(e), r & Je && qb(e);
        return;
      }
      case I:
        return;
      default: {
        La(t, e), er(e);
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
        st(e, e.return, n);
      }
      e.flags &= ~At;
    }
    t & mr && (e.flags &= ~mr);
  }
  function sj(e, t, n) {
    Gl = n, Wl = t, ye = e, Wb(e, t, n), Gl = null, Wl = null;
  }
  function Wb(e, t, n) {
    for (var a = (e.mode & Ie) !== De; ye !== null; ) {
      var r = ye, i = r.child;
      if (r.tag === Q && a) {
        var l = r.memoizedState !== null, s = l || Xc;
        if (s) {
          Km(e, t, n);
          continue;
        } else {
          var u = r.alternate, v = u !== null && u.memoizedState !== null, h = v || un, D = Xc, x = un;
          Xc = s, un = h, un && !x && (ye = r, cj(r));
          for (var M = i; M !== null; )
            ye = M, Wb(
              M,
              // New root; bubble back up to here and stop.
              t,
              n
            ), M = M.sibling;
          ye = r, Xc = D, un = x, Km(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & _o) !== je && i !== null ? (i.return = r, ye = i) : Km(e, t, n);
    }
  }
  function Km(e, t, n) {
    for (; ye !== null; ) {
      var a = ye;
      if ((a.flags & _o) !== je) {
        var r = a.alternate;
        gt(a);
        try {
          JT(t, r, a, n);
        } catch (l) {
          st(a, a.return, l);
        }
        Xt();
      }
      if (a === e) {
        ye = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, ye = i;
        return;
      }
      ye = a.return;
    }
  }
  function uj(e) {
    for (; ye !== null; ) {
      var t = ye, n = t.child;
      switch (t.tag) {
        case R:
        case Y:
        case re:
        case U: {
          if (t.mode & at)
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
        case O: {
          Kl(t, t.return);
          break;
        }
        case Q: {
          var r = t.memoizedState !== null;
          if (r) {
            Kb(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, ye = n) : Kb(e);
    }
  }
  function Kb(e) {
    for (; ye !== null; ) {
      var t = ye;
      if (t === e) {
        ye = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, ye = n;
        return;
      }
      ye = t.return;
    }
  }
  function cj(e) {
    for (; ye !== null; ) {
      var t = ye, n = t.child;
      if (t.tag === Q) {
        var a = t.memoizedState !== null;
        if (a) {
          Qb(e);
          continue;
        }
      }
      n !== null ? (n.return = t, ye = n) : Qb(e);
    }
  }
  function Qb(e) {
    for (; ye !== null; ) {
      var t = ye;
      gt(t);
      try {
        ZT(t);
      } catch (a) {
        st(t, t.return, a);
      }
      if (Xt(), t === e) {
        ye = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, ye = n;
        return;
      }
      ye = t.return;
    }
  }
  function fj(e, t, n, a) {
    ye = t, dj(t, e, n, a);
  }
  function dj(e, t, n, a) {
    for (; ye !== null; ) {
      var r = ye, i = r.child;
      (r.subtreeFlags & vl) !== je && i !== null ? (i.return = r, ye = i) : pj(e, t, n, a);
    }
  }
  function pj(e, t, n, a) {
    for (; ye !== null; ) {
      var r = ye;
      if ((r.flags & Fr) !== je) {
        gt(r);
        try {
          mj(t, r, n, a);
        } catch (l) {
          st(r, r.return, l);
        }
        Xt();
      }
      if (r === e) {
        ye = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, ye = i;
        return;
      }
      ye = r.return;
    }
  }
  function mj(e, t, n, a) {
    switch (t.tag) {
      case R:
      case Y:
      case U: {
        if (t.mode & at) {
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
    ye = e, hj();
  }
  function hj() {
    for (; ye !== null; ) {
      var e = ye, t = e.child;
      if ((ye.flags & xi) !== je) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            ye = r, bj(r, e);
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
          ye = e;
        }
      }
      (e.subtreeFlags & vl) !== je && t !== null ? (t.return = e, ye = t) : gj();
    }
  }
  function gj() {
    for (; ye !== null; ) {
      var e = ye;
      (e.flags & Fr) !== je && (gt(e), yj(e), Xt());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, ye = t;
        return;
      }
      ye = e.return;
    }
  }
  function yj(e) {
    switch (e.tag) {
      case R:
      case Y:
      case U: {
        e.mode & at ? (mm(), Aa(on | Pt, e, e.return), pm(e)) : Aa(on | Pt, e, e.return);
        break;
      }
    }
  }
  function bj(e, t) {
    for (; ye !== null; ) {
      var n = ye;
      gt(n), Ej(n, t), Xt();
      var a = n.child;
      a !== null ? (a.return = n, ye = a) : Nj(e);
    }
  }
  function Nj(e) {
    for (; ye !== null; ) {
      var t = ye, n = t.sibling, a = t.return;
      if (Bb(t), t === e) {
        ye = null;
        return;
      }
      if (n !== null) {
        n.return = a, ye = n;
        return;
      }
      ye = a;
    }
  }
  function Ej(e, t) {
    switch (e.tag) {
      case R:
      case Y:
      case U: {
        e.mode & at ? (mm(), Aa(on, e, t), pm(e)) : Aa(on, e, t);
        break;
      }
    }
  }
  function Sj(e) {
    switch (e.tag) {
      case R:
      case Y:
      case U: {
        try {
          ni(Ht | Pt, e);
        } catch (n) {
          st(e, e.return, n);
        }
        break;
      }
      case T: {
        var t = e.stateNode;
        try {
          t.componentDidMount();
        } catch (n) {
          st(e, e.return, n);
        }
        break;
      }
    }
  }
  function xj(e) {
    switch (e.tag) {
      case R:
      case Y:
      case U: {
        try {
          ni(on | Pt, e);
        } catch (t) {
          st(e, e.return, t);
        }
        break;
      }
    }
  }
  function Rj(e) {
    switch (e.tag) {
      case R:
      case Y:
      case U: {
        try {
          Aa(Ht | Pt, e, e.return);
        } catch (n) {
          st(e, e.return, n);
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
      case U:
        try {
          Aa(on | Pt, e, e.return);
        } catch (t) {
          st(e, e.return, t);
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
  var _j = Math.ceil, Qm = m.ReactCurrentDispatcher, Xm = m.ReactCurrentOwner, fn = m.ReactCurrentBatchConfig, ka = m.ReactCurrentActQueue, Yt = (
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
  ), Dr = 0, Us = 1, qi = 2, Zc = 3, Fs = 4, Zb = 5, Jm = 6, qe = Yt, Mn = null, St = null, It = G, tr = G, Zm = Gr(G), qt = Dr, zs = null, ef = G, Ps = G, tf = G, Hs = null, $n = null, ev = 0, eN = 500, tN = 1 / 0, Oj = 500, Tr = null;
  function Bs() {
    tN = Jt() + Oj;
  }
  function nN() {
    return tN;
  }
  var nf = !1, tv = null, Ql = null, Gi = !1, ri = null, $s = G, nv = [], av = null, Mj = 50, Ys = 0, rv = null, iv = !1, af = !1, Aj = 50, Xl = 0, rf = null, Is = ft, lf = G, aN = !1;
  function of() {
    return Mn;
  }
  function An() {
    return (qe & (dn | da)) !== Yt ? Jt() : (Is !== ft || (Is = Jt()), Is);
  }
  function ii(e) {
    var t = e.mode;
    if ((t & Ie) === De)
      return Oe;
    if ((qe & dn) !== Yt && It !== G)
      return Uo(It);
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
  function Vj(e) {
    var t = e.mode;
    return (t & Ie) === De ? Oe : kx();
  }
  function Gt(e, t, n, a) {
    rw(), aN && f("useInsertionEffect must not schedule updates."), iv && (af = !0), Fo(e, n, a), (qe & dn) !== G && e === Mn ? ow(t) : (Ra && Hh(e, t, n), sw(t), e === Mn && ((qe & dn) === Yt && (Ps = Ue(Ps, n)), qt === Fs && li(e, It)), Yn(e, a), n === Oe && qe === Yt && (t.mode & Ie) === De && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !ka.isBatchingLegacy && (Bs(), ay()));
  }
  function Lj(e, t, n) {
    var a = e.current;
    a.lanes = t, Fo(e, t, n), Yn(e, n);
  }
  function kj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (qe & dn) !== Yt
    );
  }
  function Yn(e, t) {
    var n = e.callbackNode;
    _x(e, t);
    var a = Tu(e, e === Mn ? It : G);
    if (a === G) {
      n !== null && bN(n), e.callbackNode = null, e.callbackPriority = en;
      return;
    }
    var r = Oi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(ka.current !== null && n !== dv)) {
      n == null && i !== Oe && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && bN(n);
    var l;
    if (r === Oe)
      e.tag === Wr ? (ka.isBatchingLegacy !== null && (ka.didScheduleLegacyUpdate = !0), cD(lN.bind(null, e))) : ny(lN.bind(null, e)), ka.current !== null ? ka.current.push(Kr) : mC(function() {
        (qe & (dn | da)) === Yt && Kr();
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
    if (eT(), Is = ft, lf = G, (qe & (dn | da)) !== Yt)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = wr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Tu(e, e === Mn ? It : G);
    if (r === G)
      return null;
    var i = !ju(e, r) && !Lx(e, r) && !t, l = i ? qj(e, r) : uf(e, r);
    if (l !== Dr) {
      if (l === qi) {
        var s = Rd(e);
        s !== G && (r = s, l = lv(e, s));
      }
      if (l === Us) {
        var u = zs;
        throw Wi(e, G), li(e, r), Yn(e, Jt()), u;
      }
      if (l === Jm)
        li(e, r);
      else {
        var v = !ju(e, r), h = e.current.alternate;
        if (v && !Fj(h)) {
          if (l = uf(e, r), l === qi) {
            var D = Rd(e);
            D !== G && (r = D, l = lv(e, D));
          }
          if (l === Us) {
            var x = zs;
            throw Wi(e, G), li(e, r), Yn(e, Jt()), x;
          }
        }
        e.finishedWork = h, e.finishedLanes = r, Uj(e, l, r);
      }
    }
    return Yn(e, Jt()), e.callbackNode === n ? rN.bind(null, e) : null;
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
            if (!El(i, n)) {
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
        if (li(e, n), Vx(n))
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
    if (tT(), (qe & (dn | da)) !== Yt)
      throw new Error("Should not already be working.");
    wr();
    var t = Tu(e, G);
    if (!Wn(t, Oe))
      return Yn(e, Jt()), null;
    var n = uf(e, t);
    if (e.tag !== Wr && n === qi) {
      var a = Rd(e);
      a !== G && (t = a, n = lv(e, a));
    }
    if (n === Us) {
      var r = zs;
      throw Wi(e, G), li(e, t), Yn(e, Jt()), r;
    }
    if (n === Jm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Ki(e, $n, Tr), Yn(e, Jt()), null;
  }
  function zj(e, t) {
    t !== G && (jd(e, Ue(t, Oe)), Yn(e, Jt()), (qe & (dn | da)) === Yt && (Bs(), Kr()));
  }
  function ov(e, t) {
    var n = qe;
    qe |= Jb;
    try {
      return e(t);
    } finally {
      qe = n, qe === Yt && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !ka.isBatchingLegacy && (Bs(), ay());
    }
  }
  function Pj(e, t, n, a, r) {
    var i = Ca(), l = fn.transition;
    try {
      return fn.transition = null, tn(Kn), e(t, n, a, r);
    } finally {
      tn(i), fn.transition = l, qe === Yt && Bs();
    }
  }
  function jr(e) {
    ri !== null && ri.tag === Wr && (qe & (dn | da)) === Yt && wr();
    var t = qe;
    qe |= Jb;
    var n = fn.transition, a = Ca();
    try {
      return fn.transition = null, tn(Kn), e ? e() : void 0;
    } finally {
      tn(a), fn.transition = n, qe = t, (qe & (dn | da)) === Yt && Kr();
    }
  }
  function oN() {
    return (qe & (dn | da)) !== Yt;
  }
  function sf(e, t) {
    bn(Zm, tr, e), tr = Ue(tr, t);
  }
  function sv(e) {
    tr = Zm.current, yn(Zm, e);
  }
  function Wi(e, t) {
    e.finishedWork = null, e.finishedLanes = G;
    var n = e.timeoutHandle;
    if (n !== rp && (e.timeoutHandle = rp, pC(n)), St !== null)
      for (var a = St.return; a !== null; ) {
        var r = a.alternate;
        kb(r, a), a = a.return;
      }
    Mn = e;
    var i = Qi(e.current, null);
    return St = i, It = tr = t, qt = Dr, zs = null, ef = G, Ps = G, tf = G, Hs = null, $n = null, LD(), ja.discardPendingWarnings(), i;
  }
  function sN(e, t) {
    do {
      var n = St;
      try {
        if (gc(), My(), Xt(), Xm.current = null, n === null || n.return === null) {
          qt = Us, zs = t, St = null;
          return;
        }
        if (nn && n.mode & at && qc(n, !0), In)
          if (gl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            hx(n, a, It);
          } else
            vx(n, t, It);
        cT(e, n.return, n, t, It), dN(n);
      } catch (r) {
        t = r, St === n && n !== null ? (n = n.return, St = n) : n = St;
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
    ef = Ue(e, ef);
  }
  function Bj() {
    qt === Dr && (qt = Zc);
  }
  function uv() {
    (qt === Dr || qt === Zc || qt === qi) && (qt = Fs), Mn !== null && (Cd(ef) || Cd(Ps)) && li(Mn, It);
  }
  function $j(e) {
    qt !== Fs && (qt = qi), Hs === null ? Hs = [e] : Hs.push(e);
  }
  function Yj() {
    return qt === Dr;
  }
  function uf(e, t) {
    var n = qe;
    qe |= dn;
    var a = uN();
    if (Mn !== e || It !== t) {
      if (Ra) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, It), r.clear()), Bh(e, t);
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
    if (gc(), qe = n, cN(a), St !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Mh(), Mn = null, It = G, qt;
  }
  function Ij() {
    for (; St !== null; )
      fN(St);
  }
  function qj(e, t) {
    var n = qe;
    qe |= dn;
    var a = uN();
    if (Mn !== e || It !== t) {
      if (Ra) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, It), r.clear()), Bh(e, t);
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
    return gc(), cN(a), qe = n, St !== null ? (Ex(), Dr) : (Mh(), Mn = null, It = G, qt);
  }
  function Gj() {
    for (; St !== null && !KS(); )
      fN(St);
  }
  function fN(e) {
    var t = e.alternate;
    gt(e);
    var n;
    (e.mode & at) !== De ? (dm(e), n = cv(t, e, tr), qc(e, !0)) : n = cv(t, e, tr), Xt(), e.memoizedProps = e.pendingProps, n === null ? dN(e) : St = n, Xm.current = null;
  }
  function dN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & Su) === je) {
        gt(t);
        var r = void 0;
        if ((t.mode & at) === De ? r = Lb(n, t, tr) : (dm(t), r = Lb(n, t, tr), qc(t, !1)), Xt(), r !== null) {
          St = r;
          return;
        }
      } else {
        var i = BT(n, t);
        if (i !== null) {
          i.flags &= $S, St = i;
          return;
        }
        if ((t.mode & at) !== De) {
          qc(t, !1);
          for (var l = t.actualDuration, s = t.child; s !== null; )
            l += s.actualDuration, s = s.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= Su, a.subtreeFlags = je, a.deletions = null;
        else {
          qt = Jm, St = null;
          return;
        }
      }
      var u = t.sibling;
      if (u !== null) {
        St = u;
        return;
      }
      t = a, St = t;
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
    if (iw(), (qe & (dn | da)) !== Yt)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (sx(i), r === null)
      return jh(), null;
    if (i === G && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = G, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = en;
    var l = Ue(r.lanes, r.childLanes);
    zx(e, l), e === Mn && (Mn = null, St = null, It = G), ((r.subtreeFlags & vl) !== je || (r.flags & vl) !== je) && (Gi || (Gi = !0, av = n, pv(ji, function() {
      return wr(), null;
    })));
    var s = (r.subtreeFlags & (Zf | ed | _o | vl)) !== je, u = (r.flags & (Zf | ed | _o | vl)) !== je;
    if (s || u) {
      var v = fn.transition;
      fn.transition = null;
      var h = Ca();
      tn(Kn);
      var D = qe;
      qe |= da, Xm.current = null, GT(e, r), ab(), oj(e, r, i), lC(e.containerInfo), e.current = r, gx(i), sj(r, e, i), yx(), QS(), qe = D, tn(h), fn.transition = v;
    } else
      e.current = r, ab();
    var x = Gi;
    if (Gi ? (Gi = !1, ri = e, $s = i) : (Xl = 0, rf = null), l = e.pendingLanes, l === G && (Ql = null), x || hN(e.current, !1), ax(r.stateNode, a), Ra && e.memoizedUpdaters.clear(), Tj(), Yn(e, Jt()), t !== null)
      for (var M = e.onRecoverableError, L = 0; L < t.length; L++) {
        var P = t[L], fe = P.stack, Re = P.digest;
        M(P.value, {
          componentStack: fe,
          digest: Re
        });
      }
    if (nf) {
      nf = !1;
      var Ee = tv;
      throw tv = null, Ee;
    }
    return Wn($s, Oe) && e.tag !== Wr && wr(), l = e.pendingLanes, Wn(l, Oe) ? (ZD(), e === rv ? Ys++ : (Ys = 0, rv = e)) : Ys = 0, Kr(), jh(), null;
  }
  function wr() {
    if (ri !== null) {
      var e = Yh($s), t = $x(yr, e), n = fn.transition, a = Ca();
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
    if (ri = null, $s = G, (qe & (dn | da)) !== Yt)
      throw new Error("Cannot flush passive effects while already rendering.");
    iv = !0, af = !1, bx(n);
    var a = qe;
    qe |= da, vj(t.current), fj(t, t.current, n, e);
    {
      var r = nv;
      nv = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        XT(t, l);
      }
    }
    Nx(), hN(t.current, !0), qe = a, Kr(), af ? t === rf ? Xl++ : (Xl = 0, rf = t) : Xl = 0, iv = !1, af = !1, rx(t);
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
    var a = Yi(n, t), r = fb(e, a, Oe), i = Xr(e, r, Oe), l = An();
    i !== null && (Fo(i, Oe, l), Yn(i, l));
  }
  function st(e, t, n) {
    if (YT(n), Ws(!1), e.tag === C) {
      mN(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === C) {
        mN(a, e, n);
        return;
      } else if (a.tag === T) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !pN(i)) {
          var l = Yi(n, e), s = _m(a, l, Oe), u = Xr(a, s, Oe), v = An();
          u !== null && (Fo(u, Oe, v), Yn(u, v));
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
    Ph(e, n), uw(e), Mn === e && El(It, n) && (qt === Fs || qt === Zc && kh(It) && Jt() - ev < eN ? Wi(e, G) : tf = Ue(tf, n)), Yn(e, r);
  }
  function vN(e, t) {
    t === en && (t = Vj(e));
    var n = An(), a = Hn(e, t);
    a !== null && (Fo(a, t, n), Yn(a, n));
  }
  function tw(e) {
    var t = e.memoizedState, n = en;
    t !== null && (n = t.retryLane), vN(e, n);
  }
  function nw(e, t) {
    var n = en, a;
    switch (e.tag) {
      case Z:
        a = e.stateNode;
        var r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case ne:
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
    if (Ys > Mj)
      throw Ys = 0, rv = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Xl > Aj && (Xl = 0, rf = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function iw() {
    ja.flushLegacyContextWarning(), ja.flushPendingUnsafeLifecycleWarnings();
  }
  function hN(e, t) {
    gt(e), cf(e, zr, Rj), t && cf(e, Jf, Cj), cf(e, zr, Sj), t && cf(e, Jf, xj), Xt();
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
      if ((qe & dn) !== Yt || !(e.mode & Ie))
        return;
      var t = e.tag;
      if (t !== _ && t !== C && t !== T && t !== R && t !== Y && t !== re && t !== U)
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
        if (gc(), My(), kb(e, t), CN(t, a), t.mode & at && dm(t), qf(null, _b, null, e, t, n), PS()) {
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
        case Y:
        case U: {
          var t = St && Le(St) || "Unknown", n = t;
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
  function sw(e) {
    {
      if (e.mode & Ie) {
        if (!Xb())
          return;
      } else if (!wj() || qe !== Yt || e.tag !== R && e.tag !== Y && e.tag !== U)
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

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Le(e));
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
              $$typeof: xe,
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
          (typeof a == "function" || i === Ce) && (r = !0);
          break;
        }
        case Y: {
          (i === xe || i === Ce) && (r = !0);
          break;
        }
        case re:
        case U: {
          (i === ke || i === Ce) && (r = !0);
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
        case U:
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
        var D = pa(u);
        D !== void 0 && (n.has(D) ? h = !0 : t.has(D) && (l === T ? h = !0 : v = !0));
      }
      if (Jl !== null && (Jl.has(e) || a !== null && Jl.has(a)) && (h = !0), h && (e._debugNeedsRemount = !0), h || v) {
        var x = Hn(e, Oe);
        x !== null && Gt(x, e, Oe, ft);
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
        case U:
        case T:
          s = l;
          break;
        case Y:
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
          case O:
            t.add(a.stateNode);
            return;
          case k:
            t.add(a.stateNode.containerInfo);
            return;
          case C:
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
      if (n.tag === O)
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
      if (t === xe)
        return Y;
      if (t === ke)
        return re;
    }
    return _;
  }
  function Qi(e, t) {
    var n = e.alternate;
    n === null ? (n = Zn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = je, n.subtreeFlags = je, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & vr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case _:
      case R:
      case U:
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
    return e === oc ? (a = Ie, t === !0 && (a |= Dt, a |= Ia)) : a = De, Ra && (a |= at), Zn(C, null, null, a);
  }
  function Nv(e, t, n, a, r, i) {
    var l = _, s = e;
    if (typeof e == "function")
      bv(e) ? (l = T, s = mv(s)) : s = Zl(s);
    else if (typeof e == "string")
      l = O;
    else
      e: switch (e) {
        case Ha:
          return oi(n.children, r, i, t);
        case pi:
          l = ie, r |= Dt, (r & Ie) !== De && (r |= Ia);
          break;
        case N:
          return Ew(n, r, i, t);
        case $e:
          return Sw(n, r, i, t);
        case _e:
          return xw(n, r, i, t);
        case vt:
          return RN(n, r, i, t);
        case hn:
        case Ft:
        case Ba:
        case Ea:
        case mt:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case W:
                l = q;
                break e;
              case ce:
                l = ve;
                break e;
              case xe:
                l = Y, s = vv(s);
                break e;
              case ke:
                l = re;
                break e;
              case Ce:
                l = be, s = null;
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
    var r = Zn(se, e, a, t);
    return r.lanes = n, r;
  }
  function Ew(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Zn(J, e, a, t | at);
    return r.elementType = N, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function Sw(e, t, n, a) {
    var r = Zn(Z, e, a, t);
    return r.elementType = $e, r.lanes = n, r;
  }
  function xw(e, t, n, a) {
    var r = Zn(ne, e, a, t);
    return r.elementType = _e, r.lanes = n, r;
  }
  function RN(e, t, n, a) {
    var r = Zn(Q, e, a, t);
    r.elementType = vt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function Sv(e, t, n) {
    var a = Zn(B, e, null, t);
    return a.lanes = n, a;
  }
  function Rw() {
    var e = Zn(O, null, null, De);
    return e.elementType = "DELETED", e;
  }
  function Cw(e) {
    var t = Zn(ee, null, null, De);
    return t.stateNode = e, t;
  }
  function xv(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Zn(k, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function CN(e, t) {
    return e === null && (e = Zn(_, null, null, De)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function Dw(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = rp, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = en, this.eventTimes = Td(G), this.expirationTimes = Td(ft), this.pendingLanes = G, this.suspendedLanes = G, this.pingedLanes = G, this.expiredLanes = G, this.mutableReadLanes = G, this.finishedLanes = G, this.entangledLanes = G, this.entanglements = Td(G), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
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
    var h = new Dw(e, t, n, s, u), D = Nw(t, i);
    h.current = D, D.stateNode = h;
    {
      var x = {
        element: a,
        isDehydrated: n,
        cache: null,
        // not enabled yet
        transitions: null,
        pendingSuspenseBoundaries: null
      };
      D.memoizedState = x;
    }
    return kp(D), h;
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
        var i = Le(n) || "Component";
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
    var h = !0, D = DN(n, a, h, e, r, i, l, s, u);
    D.context = TN(null);
    var x = D.current, M = An(), L = ii(x), P = Rr(M, L);
    return P.callback = t ?? null, Xr(x, P, L), Lj(D, L, M), D;
  }
  function Ks(e, t, n, a) {
    nx(t, e);
    var r = t.current, i = An(), l = ii(r);
    Sx(l);
    var s = TN(n);
    t.context === null ? t.context = s : t.pendingContext = s, bi && Tn !== null && !Cv && (Cv = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Le(Tn) || "Unknown"));
    var u = Rr(i, l);
    u.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), u.callback = a);
    var v = Xr(r, u, l);
    return v !== null && (Gt(v, r, l, i), Sc(v, r, l)), l;
  }
  function df(e) {
    var t = e.current;
    if (!t.child)
      return null;
    switch (t.child.tag) {
      case O:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function ww(e) {
    switch (e.tag) {
      case C: {
        var t = e.stateNode;
        if (Ou(t)) {
          var n = Ox(t);
          zj(t, n);
        }
        break;
      }
      case Z: {
        jr(function() {
          var r = Hn(e, Oe);
          if (r !== null) {
            var i = An();
            Gt(r, e, Oe, i);
          }
        });
        var a = Oe;
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
    if (e.tag === Z) {
      var t = Vo, n = Hn(e, t);
      if (n !== null) {
        var a = An();
        Gt(n, e, t, a);
      }
      Tv(e, t);
    }
  }
  function Ow(e) {
    if (e.tag === Z) {
      var t = ii(e), n = Hn(e, t);
      if (n !== null) {
        var a = An();
        Gt(n, e, t, a);
      }
      Tv(e, t);
    }
  }
  function ON(e) {
    var t = GS(e);
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
  var VN = null, LN = null, kN = null, UN = null, FN = null, zN = null, PN = null, HN = null, BN = null;
  {
    var $N = function(e, t, n) {
      var a = t[n], r = He(e) ? e.slice() : Pe({}, e);
      return n + 1 === t.length ? (He(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = $N(e[a], t, n + 1), r);
    }, YN = function(e, t) {
      return $N(e, t, 0);
    }, IN = function(e, t, n, a) {
      var r = t[a], i = He(e) ? e.slice() : Pe({}, e);
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
        S("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            S("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return IN(e, t, n, 0);
    }, GN = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = He(e) ? e.slice() : Pe({}, e);
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
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Pe({}, e.memoizedProps);
        var l = Hn(e, Oe);
        l !== null && Gt(l, e, Oe, ft);
      }
    }, LN = function(e, t, n) {
      var a = jv(e, t);
      if (a !== null) {
        var r = YN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = Pe({}, e.memoizedProps);
        var i = Hn(e, Oe);
        i !== null && Gt(i, e, Oe, ft);
      }
    }, kN = function(e, t, n, a) {
      var r = jv(e, t);
      if (r !== null) {
        var i = qN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Pe({}, e.memoizedProps);
        var l = Hn(e, Oe);
        l !== null && Gt(l, e, Oe, ft);
      }
    }, UN = function(e, t, n) {
      e.pendingProps = WN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Hn(e, Oe);
      a !== null && Gt(a, e, Oe, ft);
    }, FN = function(e, t) {
      e.pendingProps = YN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Hn(e, Oe);
      n !== null && Gt(n, e, Oe, ft);
    }, zN = function(e, t, n) {
      e.pendingProps = qN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Hn(e, Oe);
      a !== null && Gt(a, e, Oe, ft);
    }, PN = function(e) {
      var t = Hn(e, Oe);
      t !== null && Gt(t, e, Oe, ft);
    }, HN = function(e) {
      MN = e;
    }, BN = function(e) {
      AN = e;
    };
  }
  function Vw(e) {
    var t = Rh(e);
    return t === null ? null : t.stateNode;
  }
  function Lw(e) {
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
      findHostInstanceByFiber: Vw,
      findFiberByHostInstance: t || Lw,
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
    t != null && (t.hydrate ? S("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ia && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

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
        var D = r[h];
        YD(v, D);
      }
    return new pf(v);
  }
  function mf(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === dr || e.nodeType === Lf));
  }
  function Qs(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === dr || e.nodeType === Lf || e.nodeType === Mt && e.nodeValue === " react-mount-point-unstable "));
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
      var D = e.nodeType === Mt ? e.parentNode : e;
      return ts(D), jr(function() {
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
  function Yw(e) {
    {
      ZN || (ZN = !0, f("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = Hw.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Xe(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === zn ? e : jw(e, "findDOMNode");
  }
  function Iw(e, t, n) {
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
    if (e == null || !HS(e))
      throw new Error("parentComponent must be a valid React Component");
    return vf(e, t, n, !1, a);
  }
  var eE = !1;
  function Ww(e) {
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
  Yx(ww), qx(_w), Gx(Ow), Wx(Ca), Kx(Hx), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), _S(Q0), AS(ov, Pj, jr);
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
    findFiberByHostInstance: Li,
    bundleType: 1,
    version: Rv,
    rendererPackageName: "react-dom"
  });
  if (!e1 && jt && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var tE = window.location.protocol;
    /^(https?|file):$/.test(tE) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (tE === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  ta.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ov, ta.createPortal = Kw, ta.createRoot = Xw, ta.findDOMNode = Yw, ta.flushSync = Zw, ta.hydrate = Iw, ta.hydrateRoot = Jw, ta.render = qw, ta.unmountComponentAtNode = Ww, ta.unstable_batchedUpdates = ov, ta.unstable_renderSubtreeIntoContainer = Qw, ta.version = Rv, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
bE.exports = ta;
var u1 = bE.exports, SE, nE = u1;
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
function c1(o) {
  o === void 0 && (o = {});
  function p(g, y) {
    let {
      pathname: S,
      search: f,
      hash: A
    } = g.location;
    return Lv(
      "",
      {
        pathname: S,
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
    v5Compat: S = !1
  } = g, f = y.history, A = si.Pop, R = null, T = _();
  T == null && (T = 0, f.replaceState(Js({}, f.state, {
    idx: T
  }), ""));
  function _() {
    return (f.state || {
      idx: null
    }).idx;
  }
  function C() {
    A = si.Pop;
    let ie = _(), ve = ie == null ? null : ie - T;
    T = ie, R && R({
      action: A,
      location: se.location,
      delta: ve
    });
  }
  function k(ie, ve) {
    A = si.Push;
    let q = Lv(se.location, ie, ve);
    T = _() + 1;
    let Y = iE(q, T), J = se.createHref(q);
    try {
      f.pushState(Y, "", J);
    } catch (Z) {
      if (Z instanceof DOMException && Z.name === "DataCloneError")
        throw Z;
      y.location.assign(J);
    }
    S && R && R({
      action: A,
      location: se.location,
      delta: 1
    });
  }
  function O(ie, ve) {
    A = si.Replace;
    let q = Lv(se.location, ie, ve);
    T = _();
    let Y = iE(q, T), J = se.createHref(q);
    f.replaceState(Y, "", J), S && R && R({
      action: A,
      location: se.location,
      delta: 0
    });
  }
  function B(ie) {
    let ve = y.location.origin !== "null" ? y.location.origin : y.location.href, q = typeof ie == "string" ? ie : Zs(ie);
    return q = q.replace(/ $/, "%20"), bt(ve, "No window.location.(origin|href) available to create URL for href: " + q), new URL(q, ve);
  }
  let se = {
    get action() {
      return A;
    },
    get location() {
      return o(y, f);
    },
    listen(ie) {
      if (R)
        throw new Error("A history only accepts one active listener");
      return y.addEventListener(rE, C), R = ie, () => {
        y.removeEventListener(rE, C), R = null;
      };
    },
    createHref(ie) {
      return p(y, ie);
    },
    createURL: B,
    encodeLocation(ie) {
      let ve = B(ie);
      return {
        pathname: ve.pathname,
        search: ve.search,
        hash: ve.hash
      };
    },
    push: k,
    replace: O,
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
function p1(o, p, m) {
  return m === void 0 && (m = "/"), m1(o, p, m);
}
function m1(o, p, m, g) {
  let y = typeof p == "string" ? ao(p) : p, S = ci(y.pathname || "/", m);
  if (S == null)
    return null;
  let f = xE(o);
  v1(f);
  let A = null;
  for (let R = 0; A == null && R < f.length; ++R) {
    let T = D1(S);
    A = R1(f[R], T);
  }
  return A;
}
function xE(o, p, m, g) {
  p === void 0 && (p = []), m === void 0 && (m = []), g === void 0 && (g = "");
  let y = (S, f, A) => {
    let R = {
      relativePath: A === void 0 ? S.path || "" : A,
      caseSensitive: S.caseSensitive === !0,
      childrenIndex: f,
      route: S
    };
    R.relativePath.startsWith("/") && (bt(R.relativePath.startsWith(g), 'Absolute route path "' + R.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), R.relativePath = R.relativePath.slice(g.length));
    let T = Mr([g, R.relativePath]), _ = m.concat(R);
    S.children && S.children.length > 0 && (bt(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      S.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + T + '".')
    ), xE(S.children, p, _, T)), !(S.path == null && !S.index) && p.push({
      path: T,
      score: S1(T, S.index),
      routesMeta: _
    });
  };
  return o.forEach((S, f) => {
    var A;
    if (S.path === "" || !((A = S.path) != null && A.includes("?")))
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
  let f = RE(g.join("/")), A = [];
  return A.push(...f.map((R) => R === "" ? S : [S, R].join("/"))), y && A.push(...f), A.map((R) => o.startsWith("/") && R === "" ? "/" : R);
}
function v1(o) {
  o.sort((p, m) => p.score !== m.score ? m.score - p.score : x1(p.routesMeta.map((g) => g.childrenIndex), m.routesMeta.map((g) => g.childrenIndex)));
}
const h1 = /^:[\w-]+$/, g1 = 3, y1 = 2, b1 = 1, N1 = 10, E1 = -2, oE = (o) => o === "*";
function S1(o, p) {
  let m = o.split("/"), g = m.length;
  return m.some(oE) && (g += E1), p && (g += y1), m.filter((y) => !oE(y)).reduce((y, S) => y + (h1.test(S) ? g1 : S === "" ? b1 : N1), g);
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
  } = o, y = {}, S = "/", f = [];
  for (let A = 0; A < g.length; ++A) {
    let R = g[A], T = A === g.length - 1, _ = S === "/" ? p : p.slice(S.length) || "/", C = kv({
      path: R.relativePath,
      caseSensitive: R.caseSensitive,
      end: T
    }, _), k = R.route;
    if (!C)
      return null;
    Object.assign(y, C.params), f.push({
      // TODO: Can this as be avoided?
      params: y,
      pathname: Mr([S, C.pathname]),
      pathnameBase: _1(Mr([S, C.pathnameBase])),
      route: k
    }), C.pathnameBase !== "/" && (S = Mr([S, C.pathnameBase]));
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
  let S = y[0], f = S.replace(/(.)\/+$/, "$1"), A = y.slice(1);
  return {
    params: g.reduce((T, _, C) => {
      let {
        paramName: k,
        isOptional: O
      } = _;
      if (k === "*") {
        let se = A[C] || "";
        f = S.slice(0, S.length - se.length).replace(/(.)\/+$/, "$1");
      }
      const B = A[C];
      return O && !B ? T[k] = void 0 : T[k] = (B || "").replace(/%2F/g, "/"), T;
    }, {}),
    pathname: S,
    pathnameBase: f,
    pattern: o
  };
}
function C1(o, p, m) {
  p === void 0 && (p = !1), m === void 0 && (m = !0), Ua(o === "*" || !o.endsWith("*") || o.endsWith("/*"), 'Route path "' + o + '" will be treated as if it were ' + ('"' + o.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + o.replace(/\*$/, "/*") + '".'));
  let g = [], y = "^" + o.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, A, R) => (g.push({
    paramName: A,
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
  let S = o === "" || y.pathname === "", f = S ? "/" : y.pathname, A;
  if (f == null)
    A = m;
  else {
    let C = p.length - 1;
    if (!g && f.startsWith("..")) {
      let k = f.split("/");
      for (; k[0] === ".."; )
        k.shift(), C -= 1;
      y.pathname = k.join("/");
    }
    A = C >= 0 ? p[C] : "/";
  }
  let R = T1(y, A), T = f && f !== "/" && f.endsWith("/"), _ = (S || f === ".") && m.endsWith("/");
  return !R.pathname.endsWith("/") && (T || _) && (R.pathname += "/"), R;
}
const Mr = (o) => o.join("/").replace(/\/\/+/g, "/"), _1 = (o) => o.replace(/\/+$/, "").replace(/^\/*/, "/"), O1 = (o) => !o || o === "?" ? "" : o.startsWith("?") ? o : "?" + o, M1 = (o) => !o || o === "#" ? "" : o.startsWith("#") ? o : "#" + o;
function A1(o) {
  return o != null && typeof o.status == "number" && typeof o.statusText == "string" && typeof o.internal == "boolean" && "data" in o;
}
const CE = ["post", "put", "patch", "delete"];
new Set(CE);
const V1 = ["get", ...CE];
new Set(V1);
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
const L1 = /* @__PURE__ */ E.createContext(null);
L1.displayName = "Await";
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
  } = E.useContext(va), {
    hash: S,
    pathname: f,
    search: A
  } = ru(o, {
    relative: m
  }), R = f;
  return g !== "/" && (R = f === "/" ? g : Mr([g, f])), y.createHref({
    pathname: R,
    search: A,
    hash: S
  });
}
function ro() {
  return E.useContext(au) != null;
}
function Xi() {
  return ro() || bt(
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
function Yv() {
  let {
    isDataRoute: o
  } = E.useContext(za);
  return o ? X1() : U1();
}
function U1() {
  ro() || bt(
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
  } = Xi(), f = JSON.stringify(Pv(y, m.v7_relativeSplatPath)), A = E.useRef(!1);
  return TE(() => {
    A.current = !0;
  }), E.useCallback(function(T, _) {
    if (_ === void 0 && (_ = {}), Ua(A.current, DE), !A.current) return;
    if (typeof T == "number") {
      g.go(T);
      return;
    }
    let C = Hv(T, JSON.parse(f), S, _.relative === "path");
    o == null && p !== "/" && (C.pathname = C.pathname === "/" ? p : Mr([p, C.pathname])), (_.replace ? g.replace : g.push)(C, _.state, _);
  }, [p, g, f, S, o]);
}
function F1() {
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
  } = E.useContext(va), {
    matches: S
  } = E.useContext(za), f = S[S.length - 1], A = f ? f.params : {}, R = f ? f.pathname : "/", T = f ? f.pathnameBase : "/", _ = f && f.route;
  {
    let q = _ && _.path || "";
    wE(R, !_ || q.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + R + '" (under <Route path="' + q + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + q + '"> to <Route ') + ('path="' + (q === "/" ? "*" : q + "/*") + '">.'));
  }
  let C = Xi(), k;
  if (p) {
    var O;
    let q = typeof p == "string" ? ao(p) : p;
    T === "/" || (O = q.pathname) != null && O.startsWith(T) || bt(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + T + '" ') + ('but pathname "' + q.pathname + '" was given in the `location` prop.')), k = q;
  } else
    k = C;
  let B = k.pathname || "/", se = B;
  if (T !== "/") {
    let q = T.replace(/^\//, "").split("/");
    se = "/" + B.replace(/^\//, "").split("/").slice(q.length).join("/");
  }
  let ie = p1(o, {
    pathname: se
  });
  Ua(_ || ie != null, 'No routes matched location "' + k.pathname + k.search + k.hash + '" '), Ua(ie == null || ie[ie.length - 1].route.element !== void 0 || ie[ie.length - 1].route.Component !== void 0 || ie[ie.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + k.pathname + k.search + k.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let ve = I1(ie && ie.map((q) => Object.assign({}, q, {
    params: Object.assign({}, A, q.params),
    pathname: Mr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(q.pathname).pathname : q.pathname
    ]),
    pathnameBase: q.pathnameBase === "/" ? T : Mr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(q.pathnameBase).pathname : q.pathnameBase
    ])
  })), S, m, g);
  return p && ve ? /* @__PURE__ */ E.createElement(au.Provider, {
    value: {
      location: eu({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, k),
      navigationType: si.Pop
    }
  }, ve) : ve;
}
function H1() {
  let o = Q1(), p = A1(o) ? o.status + " " + o.statusText : o instanceof Error ? o.message : JSON.stringify(o), m = o instanceof Error ? o.stack : null, g = "rgba(200,200,200, 0.5)", y = {
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
const B1 = /* @__PURE__ */ E.createElement(H1, null);
class $1 extends E.Component {
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
function Y1(o) {
  let {
    routeContext: p,
    match: m,
    children: g
  } = o, y = E.useContext(nu);
  return y && y.static && y.staticContext && (m.route.errorElement || m.route.ErrorBoundary) && (y.staticContext._deepestRenderedBoundaryId = m.route.id), /* @__PURE__ */ E.createElement(za.Provider, {
    value: p
  }, g);
}
function I1(o, p, m, g) {
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
  let f = o, A = (y = m) == null ? void 0 : y.errors;
  if (A != null) {
    let _ = f.findIndex((C) => C.route.id && (A == null ? void 0 : A[C.route.id]) !== void 0);
    _ >= 0 || bt(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(A).join(",")), f = f.slice(0, Math.min(f.length, _ + 1));
  }
  let R = !1, T = -1;
  if (m && g && g.v7_partialHydration)
    for (let _ = 0; _ < f.length; _++) {
      let C = f[_];
      if ((C.route.HydrateFallback || C.route.hydrateFallbackElement) && (T = _), C.route.id) {
        let {
          loaderData: k,
          errors: O
        } = m, B = C.route.loader && k[C.route.id] === void 0 && (!O || O[C.route.id] === void 0);
        if (C.route.lazy || B) {
          R = !0, T >= 0 ? f = f.slice(0, T + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((_, C, k) => {
    let O, B = !1, se = null, ie = null;
    m && (O = A && C.route.id ? A[C.route.id] : void 0, se = C.route.errorElement || B1, R && (T < 0 && k === 0 ? (wE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), B = !0, ie = null) : T === k && (B = !0, ie = C.route.hydrateFallbackElement || null)));
    let ve = p.concat(f.slice(0, k + 1)), q = () => {
      let Y;
      return O ? Y = se : B ? Y = ie : C.route.Component ? Y = /* @__PURE__ */ E.createElement(C.route.Component, null) : C.route.element ? Y = C.route.element : Y = _, /* @__PURE__ */ E.createElement(Y1, {
        match: C,
        routeContext: {
          outlet: _,
          matches: ve,
          isDataRoute: m != null
        },
        children: Y
      });
    };
    return m && (C.route.ErrorBoundary || C.route.errorElement || k === 0) ? /* @__PURE__ */ E.createElement($1, {
      location: m.location,
      revalidation: m.revalidation,
      component: se,
      error: O,
      children: q(),
      routeContext: {
        outlet: null,
        matches: ve,
        isDataRoute: !0
      }
    }) : q();
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
function q1(o) {
  let p = E.useContext(nu);
  return p || bt(!1, Iv(o)), p;
}
function G1(o) {
  let p = E.useContext(Bv);
  return p || bt(!1, Iv(o)), p;
}
function W1(o) {
  let p = E.useContext(za);
  return p || bt(!1, Iv(o)), p;
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
  let p = E.useContext($v), m = G1(tu.UseRouteError), g = qv(tu.UseRouteError);
  return p !== void 0 ? p : (o = m.errors) == null ? void 0 : o[g];
}
function X1() {
  let {
    router: o
  } = q1(jE.UseNavigateStable), p = qv(tu.UseNavigateStable), m = E.useRef(!1);
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
function J1(o, p) {
  uE[p] || (uE[p] = !0, console.warn(p));
}
const cE = (o, p, m) => J1(o, "⚠️ React Router Future Flag Warning: " + p + ". " + ("You can use the `" + o + "` future flag to opt-in early. ") + ("For more information, see " + m + "."));
function Z1(o, p) {
  (o == null ? void 0 : o.v7_startTransition) === void 0 && cE("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (o == null ? void 0 : o.v7_relativeSplatPath) === void 0 && cE("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
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
    future: S,
    static: f
  } = E.useContext(va);
  Ua(!f, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: A
  } = E.useContext(za), {
    pathname: R
  } = Xi(), T = Yv(), _ = Hv(p, Pv(A, S.v7_relativeSplatPath), R, y === "path"), C = JSON.stringify(_);
  return E.useEffect(() => T(JSON.parse(C), {
    replace: m,
    state: g,
    relative: y
  }), [T, C, y, m, g]), null;
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
    navigator: S,
    static: f = !1,
    future: A
  } = o;
  ro() && bt(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let R = p.replace(/^\/*/, "/"), T = E.useMemo(() => ({
    basename: R,
    navigator: S,
    static: f,
    future: eu({
      v7_relativeSplatPath: !1
    }, A)
  }), [R, A, S, f]);
  typeof g == "string" && (g = ao(g));
  let {
    pathname: _ = "/",
    search: C = "",
    hash: k = "",
    state: O = null,
    key: B = "default"
  } = g, se = E.useMemo(() => {
    let ie = ci(_, R);
    return ie == null ? null : {
      location: {
        pathname: ie,
        search: C,
        hash: k,
        state: O,
        key: B
      },
      navigationType: y
    };
  }, [R, _, C, k, O, B, y]);
  return Ua(se != null, '<Router basename="' + R + '"> is not able to match the URL ' + ('"' + _ + C + k + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), se == null ? null : /* @__PURE__ */ E.createElement(va.Provider, {
    value: T
  }, /* @__PURE__ */ E.createElement(au.Provider, {
    children: m,
    value: se
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
  return E.Children.forEach(o, (g, y) => {
    if (!/* @__PURE__ */ E.isValidElement(g))
      return;
    let S = [...p, y];
    if (g.type === E.Fragment) {
      m.push.apply(m, Uv(g.props.children, S));
      return;
    }
    g.type !== ar && bt(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || bt(!1, "An index route cannot have child routes.");
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
function Av(o) {
  return o != null && !u_.has(o) ? (Ua(!1, '"' + o + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + yf + '"')), null) : o;
}
function c_(o, p) {
  let m, g, y, S, f;
  if (r_(o)) {
    let A = o.getAttribute("action");
    g = A ? ci(A, p) : null, m = o.getAttribute("method") || gf, y = Av(o.getAttribute("enctype")) || yf, S = new FormData(o);
  } else if (a_(o) || i_(o) && (o.type === "submit" || o.type === "image")) {
    let A = o.form;
    if (A == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let R = o.getAttribute("formaction") || A.getAttribute("action");
    if (g = R ? ci(R, p) : null, m = o.getAttribute("formmethod") || A.getAttribute("method") || gf, y = Av(o.getAttribute("formenctype")) || Av(A.getAttribute("enctype")) || yf, S = new FormData(A, o), !s_()) {
      let {
        name: T,
        type: _,
        value: C
      } = o;
      if (_ === "image") {
        let k = T ? T + "." : "";
        S.append(k + "x", "0"), S.append(k + "y", "0");
      } else T && S.append(T, C);
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
const h_ = "startTransition", fE = o1[h_];
function g_(o) {
  let {
    basename: p,
    children: m,
    future: g,
    window: y
  } = o, S = E.useRef();
  S.current == null && (S.current = c1({
    window: y,
    v5Compat: !0
  }));
  let f = S.current, [A, R] = E.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: T
  } = g || {}, _ = E.useCallback((C) => {
    T && fE ? fE(() => R(C)) : R(C);
  }, [R, T]);
  return E.useLayoutEffect(() => f.listen(_), [f, _]), E.useEffect(() => Z1(g), [g]), /* @__PURE__ */ E.createElement(t_, {
    basename: p,
    children: m,
    location: A.location,
    navigationType: A.action,
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
    state: A,
    target: R,
    to: T,
    preventScrollReset: _,
    viewTransition: C
  } = p, k = Gv(p, f_), {
    basename: O
  } = E.useContext(va), B, se = !1;
  if (typeof T == "string" && b_.test(T) && (B = T, y_))
    try {
      let Y = new URL(window.location.href), J = T.startsWith("//") ? new URL(Y.protocol + T) : new URL(T), Z = ci(J.pathname, O);
      J.origin === Y.origin && Z != null ? T = Z + J.search + J.hash : se = !0;
    } catch {
      Ua(!1, '<Link to="' + T + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let ie = k1(T, {
    relative: y
  }), ve = x_(T, {
    replace: f,
    state: A,
    target: R,
    preventScrollReset: _,
    relative: y,
    viewTransition: C
  });
  function q(Y) {
    g && g(Y), Y.defaultPrevented || ve(Y);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ E.createElement("a", no({}, k, {
      href: B || ie,
      onClick: se || S ? g : q,
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
    style: A,
    to: R,
    viewTransition: T,
    children: _
  } = p, C = Gv(p, d_), k = ru(R, {
    relative: C.relative
  }), O = Xi(), B = E.useContext(Bv), {
    navigator: se,
    basename: ie
  } = E.useContext(va), ve = B != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  w_(k) && T === !0, q = se.encodeLocation ? se.encodeLocation(k).pathname : k.pathname, Y = O.pathname, J = B && B.navigation && B.navigation.location ? B.navigation.location.pathname : null;
  y || (Y = Y.toLowerCase(), J = J ? J.toLowerCase() : null, q = q.toLowerCase()), J && ie && (J = ci(J, ie) || J);
  const Z = q !== "/" && q.endsWith("/") ? q.length - 1 : q.length;
  let re = Y === q || !f && Y.startsWith(q) && Y.charAt(Z) === "/", U = J != null && (J === q || !f && J.startsWith(q) && J.charAt(q.length) === "/"), be = {
    isActive: re,
    isPending: U,
    isTransitioning: ve
  }, K = re ? g : void 0, ee;
  typeof S == "function" ? ee = S(be) : ee = [S, re ? "active" : null, U ? "pending" : null, ve ? "transitioning" : null].filter(Boolean).join(" ");
  let ne = typeof A == "function" ? A(be) : A;
  return /* @__PURE__ */ E.createElement(to, no({}, C, {
    "aria-current": K,
    className: ee,
    ref: m,
    style: ne,
    to: R,
    viewTransition: T
  }), typeof _ == "function" ? _(be) : _);
});
N_.displayName = "NavLink";
const E_ = /* @__PURE__ */ E.forwardRef((o, p) => {
  let {
    fetcherKey: m,
    navigate: g,
    reloadDocument: y,
    replace: S,
    state: f,
    method: A = gf,
    action: R,
    onSubmit: T,
    relative: _,
    preventScrollReset: C,
    viewTransition: k
  } = o, O = Gv(o, p_), B = T_(), se = j_(R, {
    relative: _
  }), ie = A.toLowerCase() === "get" ? "get" : "post", ve = (q) => {
    if (T && T(q), q.defaultPrevented) return;
    q.preventDefault();
    let Y = q.nativeEvent.submitter, J = (Y == null ? void 0 : Y.getAttribute("formmethod")) || A;
    B(Y || q.currentTarget, {
      fetcherKey: m,
      method: J,
      navigate: g,
      replace: S,
      state: f,
      relative: _,
      preventScrollReset: C,
      viewTransition: k
    });
  };
  return /* @__PURE__ */ E.createElement("form", no({
    ref: p,
    method: ie,
    action: se,
    onSubmit: y ? T : ve
  }, O));
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
  return p || bt(!1, S_(o)), p;
}
function x_(o, p) {
  let {
    target: m,
    replace: g,
    state: y,
    preventScrollReset: S,
    relative: f,
    viewTransition: A
  } = p === void 0 ? {} : p, R = Yv(), T = Xi(), _ = ru(o, {
    relative: f
  });
  return E.useCallback((C) => {
    if (o_(C, m)) {
      C.preventDefault();
      let k = g !== void 0 ? g : Zs(T) === Zs(_);
      R(o, {
        replace: k,
        state: y,
        preventScrollReset: S,
        relative: f,
        viewTransition: A
      });
    }
  }, [T, R, _, g, y, m, o, S, f, A]);
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
  } = E.useContext(va), m = K1();
  return E.useCallback(function(g, y) {
    y === void 0 && (y = {}), R_();
    let {
      action: S,
      method: f,
      encType: A,
      formData: R,
      body: T
    } = c_(g, p);
    if (y.navigate === !1) {
      let _ = y.fetcherKey || D_();
      o.fetch(_, m, y.action || S, {
        preventScrollReset: y.preventScrollReset,
        formData: R,
        body: T,
        formMethod: y.method || f,
        formEncType: y.encType || A,
        flushSync: y.flushSync
      });
    } else
      o.navigate(y.action || S, {
        preventScrollReset: y.preventScrollReset,
        formData: R,
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
  } = E.useContext(va), y = E.useContext(za);
  y || bt(!1, "useFormAction must be used inside a RouteContext");
  let [S] = y.matches.slice(-1), f = no({}, ru(o || ".", {
    relative: m
  })), A = Xi();
  if (o == null) {
    f.search = A.search;
    let R = new URLSearchParams(f.search), T = R.getAll("index");
    if (T.some((C) => C === "")) {
      R.delete("index"), T.filter((k) => k).forEach((k) => R.append("index", k));
      let C = R.toString();
      f.search = C ? "?" + C : "";
    }
  }
  return (!o || o === ".") && S.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (f.pathname = f.pathname === "/" ? g : Mr([g, f.pathname])), Zs(f);
}
function w_(o, p) {
  p === void 0 && (p = {});
  let m = E.useContext(_E);
  m == null && bt(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
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
  const [o, p] = E.useState(null), [m, g] = E.useState(""), [y, S] = E.useState(""), [f, A] = E.useState(!0), [R, T] = E.useState(""), [_, C] = E.useState(""), [k, O] = E.useState(!1), [B, se] = E.useState(!1);
  E.useEffect(() => {
    const Y = typeof window < "u" ? window : void 0, J = Y && Y.__FIREBASE__ ? Y.__FIREBASE__ : null;
    p({
      apiKey: J && J.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: J && J.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: J && J.projectId || void 0 || "fresh-basket-a8933",
      appId: J && J.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: J && J.messagingSenderId || void 0 || "163656027399",
      measurementId: J && J.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function ie(Y) {
    const J = (Y == null ? void 0 : Y.code) || "", Z = (Y == null ? void 0 : Y.message) || "";
    return J.includes("invalid-email") ? "Please enter a valid email address." : J.includes("user-not-found") ? "No account found with that email." : J.includes("wrong-password") || J.includes("invalid-credential") || Z.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : J.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : J.includes("network-request-failed") ? "Network error. Check your connection and try again." : Z || "Something went wrong.";
  }
  async function ve(Y) {
    Y.preventDefault(), T(""), C(""), O(!0);
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const J = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), Z = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: re, setPersistence: U, browserLocalPersistence: be, browserSessionPersistence: K, signInWithEmailAndPassword: ee } = Z, ne = re();
      await U(ne, f ? be : K);
      const Q = await (await ee(ne, m.trim(), y)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Q }) })).ok) throw new Error("Session creation failed");
      C("Signed in successfully."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (J) {
      T(ie(J));
    } finally {
      O(!1);
    }
  }
  async function q() {
    T(""), C("");
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const Y = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: J, sendPasswordResetEmail: Z } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), re = J();
      await Z(re, m.trim()), C("If an account exists for that email, a reset link has been sent.");
    } catch (Y) {
      T(ie(Y));
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
      _ && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-success", children: _ }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 82,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ c.jsxDEV("form", { className: "auth-form", onSubmit: ve, children: [
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
            /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: B ? "text" : "password", value: y, onChange: (Y) => S(Y.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ c.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": B ? "Hide password" : "Show password", onClick: () => se((Y) => !Y), children: "👁️" }, void 0, !1, {
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
            /* @__PURE__ */ c.jsxDEV("input", { type: "checkbox", checked: f, onChange: (Y) => A(Y.target.checked) }, void 0, !1, {
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
          /* @__PURE__ */ c.jsxDEV("button", { className: "link-button", type: "button", onClick: q, children: "Forgot password?" }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 95,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 93,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "auth-button auth-button-wide", disabled: k, type: "submit", children: k ? "Signing in…" : "Sign in" }, void 0, !1, {
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
  const [o, p] = E.useState(null), [m, g] = E.useState(""), [y, S] = E.useState(""), [f, A] = E.useState(""), [R, T] = E.useState(""), [_, C] = E.useState(""), [k, O] = E.useState(""), [B, se] = E.useState(""), [ie, ve] = E.useState(!1), [q, Y] = E.useState(!1), [J, Z] = E.useState(!1), [re, U] = E.useState(!1);
  E.useEffect(() => {
    const ee = typeof window < "u" ? window : void 0, ne = ee && ee.__FIREBASE__ ? ee.__FIREBASE__ : null;
    p({
      apiKey: ne && ne.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: ne && ne.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: ne && ne.projectId || void 0 || "fresh-basket-a8933",
      appId: ne && ne.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: ne && ne.messagingSenderId || void 0 || "163656027399",
      measurementId: ne && ne.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function be(ee) {
    const ne = (ee == null ? void 0 : ee.code) || "";
    return ne.includes("email-already-in-use") ? "An account with this email already exists." : ne.includes("weak-password") ? "Password should be at least 6 characters." : ne.includes("invalid-email") ? "Please enter a valid email address." : ne.includes("network-request-failed") ? "Network error. Check your connection and try again." : (ee == null ? void 0 : ee.message) || "Something went wrong.";
  }
  async function K(ee) {
    ee.preventDefault(), O(""), se(""), ve(!0);
    try {
      const ne = String(m).trim(), I = String(y).trim(), Q = I.replace(/\D+/g, ""), F = { fn: !ne, cn: !I };
      if (Z(F.fn), U(F.cn || Q.length < 7), F.fn || F.cn) {
        O("Please fill in required fields");
        return;
      }
      if (Q.length < 7) {
        O("Please enter a valid mobile number");
        return;
      }
      if (R !== _) throw new Error("Passwords do not match");
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const oe = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: pe, createUserWithEmailAndPassword: ae } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), ze = pe(), lt = await (await ae(ze, f.trim(), R)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: lt, profile: { fullName: ne, contactNumber: I } }) })).ok) throw new Error("Session creation failed");
      se("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (ne) {
      O(be(ne));
    } finally {
      ve(!1);
    }
  }
  return /* @__PURE__ */ c.jsxDEV("section", { className: "auth-panel", style: { maxWidth: 520, margin: "40px auto" }, children: [
    /* @__PURE__ */ c.jsxDEV("h2", { className: "auth-title", children: "Register" }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 67,
      columnNumber: 7
    }, this),
    k && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: k }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 68,
      columnNumber: 17
    }, this),
    B && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-success", children: B }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 69,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ c.jsxDEV("form", { className: "auth-form", onSubmit: K, children: [
      /* @__PURE__ */ c.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input" + (J && !String(m).trim() ? " input-error" : ""), value: m, onChange: (ee) => {
          g(ee.target.value), J && Z(!String(ee.target.value).trim());
        }, onBlur: () => Z(!String(m).trim()), required: !0 }, void 0, !1, {
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input" + (re ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: y, onChange: (ee) => {
          if (S(ee.target.value), re) {
            const ne = String(ee.target.value).trim().replace(/\D+/g, "");
            U(!(ne.length >= 7));
          }
        }, onBlur: () => {
          const ee = String(y).trim().replace(/\D+/g, "");
          U(!(ee.length >= 7));
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: "email", value: f, onChange: (ee) => A(ee.target.value), required: !0 }, void 0, !1, {
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
          /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: q ? "text" : "password", value: R, onChange: (ee) => T(ee.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ c.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": q ? "Hide password" : "Show password", onClick: () => Y((ee) => !ee), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: "password", value: _, onChange: (ee) => C(ee.target.value), minLength: 6, required: !0 }, void 0, !1, {
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
      return p((A) => [f, ...A]), S;
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
  const p = Yv();
  return E.useEffect(() => {
    const m = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), y = document.getElementById("profileBtn"), S = document.getElementById("profileMenu");
    function f(C, k, O) {
      C && (C.classList.toggle("hidden", !O), C.setAttribute("aria-hidden", O ? "false" : "true"), k && k.setAttribute("aria-expanded", O ? "true" : "false"));
    }
    function A() {
      f(g, m, !1), f(S, y, !1);
    }
    function R(C) {
      const k = (O) => O && (O === C.target || O.contains(C.target));
      !k(g) && !k(m) && !k(S) && !k(y) && A();
    }
    function T(C) {
      C.key === "Escape" && A();
    }
    function _(C) {
      C && C.querySelectorAll(".dropdown-item").forEach((k) => {
        k.addEventListener("click", () => A());
      });
    }
    return m && g && (m.addEventListener("click", (C) => {
      C.stopPropagation(), f(S, y, !1), f(g, m, g.classList.contains("hidden"));
    }), _(g)), y && S && (y.addEventListener("click", (C) => {
      C.stopPropagation(), f(g, m, !1), f(S, y, S.classList.contains("hidden"));
    }), _(S)), document.addEventListener("click", R), document.addEventListener("keydown", T), () => {
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
  const [m, g] = E.useState(""), [y, S] = E.useState(""), [f, A] = E.useState(""), [R, T] = E.useState(""), [_, C] = E.useState(!1), [k, O] = E.useState(""), [B, se] = E.useState(""), [ie, ve] = E.useState(!1), [q, Y] = E.useState(!1), [J, Z] = E.useState(!1), [re, U] = E.useState(!1);
  async function be() {
    O(""), se(""), U(!0);
    const K = String(m).trim(), ee = String(y), ne = String(f).trim(), I = String(R).trim(), Q = I.replace(/\D+/g, ""), F = { fn: !ne, cn: !I, pw: !ee };
    if (ve(F.fn), Y(F.cn || Q.length < 7), Z(F.pw), F.fn || F.cn || F.pw) {
      O("Full name, mobile and password are required");
      return;
    }
    if (Q.length < 7) {
      O("Please enter a valid mobile number"), Y(!0);
      return;
    }
    if (K && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(K)) {
      O("Please enter a valid email");
      return;
    }
    if (ee.length < 6) {
      Z(!0), O("Password must be at least 6 characters");
      return;
    }
    C(!0);
    try {
      const oe = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: K, password: ee, fullName: ne, contactNumber: I })
      }), pe = await oe.json().catch(() => null);
      if (!oe.ok) {
        const ae = String(pe && (pe.error || pe.message) || ""), ze = ae.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(ae) || /MISSING\s*EMAIL\/PASSWORD/i.test(ae))
          O("Full name, mobile and password are required"), ve(!ne), Y(!I || Q.length < 7), Z(!ee);
        else if (ze.includes("EMAIL_EXISTS"))
          O("An account with this email already exists. Use a different email or leave email blank.");
        else if (ze.includes("INVALID_EMAIL"))
          O("Please enter a valid email");
        else if (ze.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(ae))
          Z(!0), O("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER/i.test(ae))
          Y(!0), O("Please enter a valid mobile number");
        else if (/FIREBASE NOT CONFIGURED/i.test(ae))
          O("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(ae || "Failed to create rider");
        return;
      }
      se("Rider created successfully"), p && p(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (oe) {
      const pe = String((oe == null ? void 0 : oe.message) || "");
      /Missing\s*(fullName\/contactNumber|email\/password)/i.test(pe) ? O("Full name, mobile and password are required") : /EMAIL_EXISTS/i.test(pe) ? O("An account with this email already exists. Use a different email or leave email blank.") : /INVALID_EMAIL/i.test(pe) ? O("Please enter a valid email") : /WEAK_PASSWORD/i.test(pe) || /AT LEAST 6 CHARACTERS/i.test(pe) ? (Z(!0), O("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER/i.test(pe) ? (Y(!0), O("Please enter a valid mobile number")) : O(pe || "Failed to create rider");
    } finally {
      C(!1);
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
      B && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-success", children: B }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 97,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ c.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (re && !String(f).trim() ? " input-error" : ""), value: f, onChange: (K) => {
          A(K.target.value), re && ve(!String(K.target.value).trim());
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input", type: "email", value: m, onChange: (K) => {
          g(K.target.value);
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (re && !String(y) ? " input-error" : ""), type: "password", value: y, onChange: (K) => {
          S(K.target.value), re && Z(!String(K.target.value));
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (re && String(R).trim().replace(/\D+/g, "").length < 7 ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: R, onChange: (K) => {
          if (T(K.target.value), re) {
            const ee = String(K.target.value).trim().replace(/\D+/g, "");
            Y(!(ee.length >= 7));
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
      k && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: k }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 110,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary", onClick: o, disabled: _, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 112,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-primary", onClick: be, disabled: _, children: _ ? "Creating…" : "Create" }, void 0, !1, {
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
function ME() {
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
const AE = "riderPerformancePct";
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
    const p = o.getItem(AE);
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
  for (const [f, A] of m) {
    const R = String(f);
    let T;
    if (typeof A == "number")
      T = A;
    else if (typeof A == "string")
      T = Number(A);
    else
      continue;
    Number.isFinite(T) && S[R] !== T && (S[R] = T, y = !0);
  }
  if (y)
    try {
      p.setItem(AE, JSON.stringify(S));
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
    const I = /* @__PURE__ */ new Date(), Q = new Date(I.getFullYear(), I.getMonth(), 1), F = `${Q.getFullYear()}-${String(Q.getMonth() + 1).padStart(2, "0")}-${String(Q.getDate()).padStart(2, "0")}`, oe = `${I.getFullYear()}-${String(I.getMonth() + 1).padStart(2, "0")}-${String(I.getDate()).padStart(2, "0")}`;
    return { from: F, to: oe };
  }, p = E.useMemo(() => o(), []), [m, g] = E.useState([]), [y, S] = E.useState(""), [f, A] = E.useState(!0), [R, T] = E.useState(""), [_, C] = E.useState(1), [k, O] = E.useState(20), [B, se] = E.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [ie, ve] = E.useState(!1), [q, Y] = E.useState(ma), [J, Z] = E.useState(p.from), [re, U] = E.useState(p.to);
  E.useEffect(() => {
    function I() {
      Y(ME());
    }
    I();
    function Q(F) {
      F.key === Ef && I();
    }
    return typeof window < "u" && (window.addEventListener("storage", Q), window.addEventListener("fare-settings-changed", I)), () => {
      typeof window < "u" && (window.removeEventListener("storage", Q), window.removeEventListener("fare-settings-changed", I));
    };
  }, []), E.useEffect(() => {
    let I = !0;
    return (async () => {
      var Q, F, oe, pe;
      A(!0), T("");
      try {
        const ae = new URLSearchParams();
        y && ae.set("q", y), ae.set("page", String(_)), ae.set("limit", String(k));
        const ze = await fetch(`/api/riders?${ae.toString()}`, { credentials: "include" });
        if (ze.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ze.ok) throw new Error("Failed to load riders");
        const We = await ze.json();
        I && (g(Array.isArray(We.riders) ? We.riders : []), se({ total: ((Q = We.meta) == null ? void 0 : Q.total) || 0, page: ((F = We.meta) == null ? void 0 : F.page) || 1, limit: ((oe = We.meta) == null ? void 0 : oe.limit) || k, pages: ((pe = We.meta) == null ? void 0 : pe.pages) || 1 }));
      } catch (ae) {
        I && T(ae.message || "Failed to load riders");
      } finally {
        I && A(!1);
      }
    })(), () => {
      I = !1;
    };
  }, [y, _, k]);
  const be = E.useMemo(() => m.filter((I) => {
    if (y && !String(I.name || "").toLowerCase().includes(y.toLowerCase().trim())) return !1;
    if (J || re) {
      const Q = Number(I.lastActiveDays ?? 0), F = J ? new Date(J) : null, oe = re ? new Date(re) : null;
      if (F && oe) {
        const pe = Math.floor((Date.now() - F.getTime()) / 864e5), ae = Math.floor((Date.now() - oe.getTime()) / (1e3 * 60 * 60 * 24));
        if (Q < ae || Q > pe) return !1;
      } else if (F) {
        const pe = Math.floor((Date.now() - F.getTime()) / 864e5);
        if (Q > pe) return !1;
      } else if (oe) {
        const pe = Math.floor((Date.now() - oe.getTime()) / 864e5);
        if (Q < pe) return !1;
      }
    }
    return !0;
  }), [m, y, J, re]), K = E.useMemo(() => {
    const I = Number(q.farePerKm);
    return Number.isFinite(I) ? I : ma.farePerKm;
  }, [q]), ee = E.useMemo(() => {
    const I = Number(q.baseFare);
    return Number.isFinite(I) ? I : ma.baseFare;
  }, [q]);
  E.useEffect(() => {
    if (!Array.isArray(m) || m.length === 0) return;
    const I = {};
    for (const Q of m) {
      if (!Q || Q.id === void 0 || Q.id === null) continue;
      const F = Number(Q.performancePct);
      Number.isFinite(F) && (I[Q.id] = Math.round(F));
    }
    Object.keys(I).length !== 0 && L_(I);
  }, [m]);
  const ne = E.useMemo(() => {
    const I = /* @__PURE__ */ new Date(), Q = [], F = [];
    for (let oe = 2; oe >= 0; oe--) {
      const pe = new Date(I.getFullYear(), I.getMonth() - oe, 1), ae = `${pe.getFullYear()}-${String(pe.getMonth() + 1).padStart(2, "0")}`, ze = pe.toLocaleString(void 0, { month: "short", year: "numeric" });
      Q.push(ae), F.push(ze);
    }
    return { keys: Q, labels: F };
  }, []);
  return /* @__PURE__ */ c.jsxDEV(Or, { children: /* @__PURE__ */ c.jsxDEV("section", { className: "rider-management", children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "rc-header riders-header", children: [
      /* @__PURE__ */ c.jsxDEV("div", { className: "riders-header-left", children: [
        /* @__PURE__ */ c.jsxDEV("h2", { className: "rc-title", children: "Rider Management" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 200,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("p", { className: "rc-subtitle", children: "View and manage riders based on performance." }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 201,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 199,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => ve(!0), children: "Create Rider" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 204,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 203,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 198,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ c.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 210,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: y, onChange: (I) => {
          S(I.target.value), C(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 211,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 209,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters", children: /* @__PURE__ */ c.jsxDEV("div", { className: "date-range-filter", children: [
        /* @__PURE__ */ c.jsxDEV("input", { type: "date", className: "date-range-input", value: J, onChange: (I) => {
          Z(I.target.value), C(1);
        }, placeholder: "From", title: "Filter from date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 215,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ c.jsxDEV("span", { className: "date-range-separator", children: "to" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 216,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ c.jsxDEV("input", { type: "date", className: "date-range-input", value: re, onChange: (I) => {
          U(I.target.value), C(1);
        }, placeholder: "To", title: "Filter to date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 217,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 214,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 213,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 208,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-table-wrapper", children: [
      ie && /* @__PURE__ */ c.jsxDEV(A_, { onClose: () => ve(!1), onCreated: () => {
        window.location.reload();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 224,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ c.jsxDEV("thead", { children: /* @__PURE__ */ c.jsxDEV("tr", { children: [
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-name", children: "Rider Name" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 229,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-month", children: "Range" }, ne.keys[ne.keys.length - 1], !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 230,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-earnings", children: (() => {
            const I = ne.keys[ne.keys.length - 2], Q = String(I).split("-"), F = parseInt(Q[0], 10), oe = parseInt(Q[1], 10);
            return `Earnings (${new Date(Number.isFinite(F) ? F : (/* @__PURE__ */ new Date()).getFullYear(), Number.isFinite(oe) ? oe - 1 : (/* @__PURE__ */ new Date()).getMonth() - 1, 1).toLocaleString(void 0, { month: "short" })}, Rs)`;
          })() }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 231,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-perf", children: "Performance" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 232,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-total", children: "Total" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 233,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 228,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 227,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("tbody", { children: [
          f && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 238,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 238,
            columnNumber: 17
          }, this),
          !f && R && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "auth-error", children: R }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 241,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 241,
            columnNumber: 17
          }, this),
          !f && !R && be.map((I) => {
            var Q;
            return /* @__PURE__ */ c.jsxDEV("tr", { "data-rider-id": I.id, "data-status": I.status, "data-last-days": I.lastActiveDays, children: [
              /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ c.jsxDEV("a", { className: "rider-name-link", href: `/riders/${I.id}`, children: I.name }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 245,
                columnNumber: 47
              }, this) }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 245,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-month", children: [
                Number(((Q = I.monthlyCounts) == null ? void 0 : Q[ne.keys[ne.keys.length - 1]]) || 0).toFixed(2),
                " km"
              ] }, void 0, !0, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 246,
                columnNumber: 19
              }, this),
              (() => {
                var We, lt;
                const F = ne.keys[ne.keys.length - 2], oe = Number(((We = I.monthlyCounts) == null ? void 0 : We[F]) || 0), pe = Array.isArray(I.orders) ? I.orders : [], ae = Number(((lt = I.monthlyRideCounts) == null ? void 0 : lt[F]) ?? P_(pe, F) ?? 0), ze = oe * K + ae * ee;
                return /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-earnings", children: Number.isFinite(ze) ? `${ze.toFixed(2)} Rs.` : "0 Rs." }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 253,
                  columnNumber: 29
                }, this);
              })(),
              /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-performance", children: Number.isFinite(Number(I.performancePct)) ? `${Math.round(Number(I.performancePct))}%` : "0%" }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 255,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-total", children: [
                Number(I.totalKm || 0).toFixed(2),
                " km"
              ] }, void 0, !0, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 256,
                columnNumber: 19
              }, this)
            ] }, I.id, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 244,
              columnNumber: 17
            }, this);
          }),
          !f && !R && be.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No riders found." }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 260,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 260,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 236,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 226,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 222,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: B.page <= 1 || f, onClick: () => C((I) => Math.max(1, I - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 268,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        B.page,
        " of ",
        B.pages,
        " • ",
        B.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 269,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: B.page >= B.pages || f, onClick: () => C((I) => Math.min(B.pages, I + 1)), children: "Next" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 270,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 267,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 266,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 197,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 196,
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
  var m, g, y, S, f, A;
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
    (A = o.orders) == null ? void 0 : A.actualDurationMinutes
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
  var m, g, y, S, f, A;
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
    (A = o.orders) == null ? void 0 : A.startedAt
  ];
  for (const R of p)
    if (R != null) return R;
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
function PE(o) {
  var g, y, S, f, A, R, T, _;
  if (!Fa(o)) return null;
  const p = [
    o.expected_delivery_time,
    o.expectedDeliveryTime,
    (g = o.order) == null ? void 0 : g.expected_delivery_time,
    (y = o.order) == null ? void 0 : y.expectedDeliveryTime,
    (S = o.orders) == null ? void 0 : S.expected_delivery_time,
    (f = o.orders) == null ? void 0 : f.expectedDeliveryTime,
    (A = o.delivery) == null ? void 0 : A.expected_delivery_time,
    (R = o.delivery) == null ? void 0 : R.expectedDeliveryTime,
    (T = o.expected_delivery) == null ? void 0 : T.time,
    (_ = o.expected_delivery) == null ? void 0 : _.minutes,
    o.expected_time,
    o.expectedTime,
    o.expectedMinutes
  ];
  for (const C of p)
    if (C != null && !(typeof C == "string" && !C.trim()))
      return C;
  const m = o.delivery_events || o.deliveryEvents || o.events || null;
  if (Array.isArray(m))
    for (let C = m.length - 1; C >= 0; C -= 1) {
      const k = m[C];
      if (!k) continue;
      const O = typeof k.type == "string" ? k.type.toLowerCase().trim() : "";
      if (!(O !== "eta" && O !== "expected")) {
        if (k.expectedMinutes !== void 0 && k.expectedMinutes !== null) return { minutes: k.expectedMinutes };
        if (k.minutes !== void 0 && k.minutes !== null) return { minutes: k.minutes };
        if (k.expectedAt) return k.expectedAt;
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
function I_() {
  var O;
  const { id: o } = F1(), [p, m] = E.useState(null), [g, y] = E.useState(!0), [S, f] = E.useState(""), [A, R] = E.useState(null);
  if (E.useEffect(() => {
    const B = V_(o);
    if (typeof B == "number" && Number.isFinite(B))
      R(B);
    else if (typeof B == "string") {
      const se = Number(B);
      Number.isFinite(se) ? R(se) : R(null);
    } else
      R(null);
  }, [o]), E.useEffect(() => {
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
  const { rider: T, metrics: _, history: C } = p, k = A ?? (Number.isFinite(Number(_ == null ? void 0 : _.onTimeRate)) ? Math.round(Number(_.onTimeRate)) : 0);
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
          k,
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
        (p.riderOrders || []).map((B, se) => {
          const ie = B.name || B.orderId, ve = ui(B.created_at), q = ve instanceof Date && !Number.isNaN(ve.getTime()) ? ve.toISOString().slice(0, 10) : "-", Y = FE(B.deliveryStartTime), J = PE(B), Z = zE(J), re = UE(B), U = HE(re), be = Number(B.distance_km), K = Number.isFinite(be) ? `${be.toFixed(2)} km` : typeof B.distance_km == "string" && B.distance_km.trim() ? B.distance_km : "-";
          return /* @__PURE__ */ c.jsxDEV("tr", { children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name order-cell", children: ie }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 113,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-km date-cell", children: q }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 114,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-start-time start-cell", children: Y }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 115,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-expected expected-cell", children: Z }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 116,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: U }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 117,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-commission distance-cell", children: K }, void 0, !1, {
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
        !((O = p.riderOrders) != null && O.length) && (C || []).map((B, se) => /* @__PURE__ */ c.jsxDEV("tr", { children: [
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name order-cell", children: B.date }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 124,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-km date-cell", children: B.deliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 125,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-start-time start-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 126,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-expected expected-cell", children: B.avgTime ? `${B.avgTime} min` : "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 127,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 128,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-commission distance-cell", children: Number.isFinite(Number(B.distanceKm)) ? `${Number(B.distanceKm).toFixed(2)} km` : B.distanceKm || "-" }, void 0, !1, {
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
function BE({ orderId: o, onClose: p, onAssigned: m }) {
  const [g, y] = E.useState([]), [S, f] = E.useState(!0), [A, R] = E.useState(""), [T, _] = E.useState(null), [C, k] = E.useState("rider"), [O, B] = E.useState([]), [se, ie] = E.useState(!1), [ve, q] = E.useState(""), [Y, J] = E.useState(null);
  E.useEffect(() => {
    let U = !0;
    return (async () => {
      f(!0), R("");
      try {
        const be = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (be.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!be.ok) throw new Error("Failed to load riders");
        const K = await be.json();
        U && y(Array.isArray(K.riders) ? K.riders : K.riders || []);
      } catch (be) {
        U && R(be.message || "Failed to load riders");
      } finally {
        U && f(!1);
      }
    })(), () => {
      U = !1;
    };
  }, []), E.useEffect(() => {
    if (C !== "packer") return;
    let U = !0;
    return (async () => {
      ie(!0), q("");
      try {
        const be = await fetch("/api/packers?limit=200", { credentials: "include" });
        if (be.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!be.ok) throw new Error("Failed to load packers");
        const K = await be.json();
        U && B(Array.isArray(K.packers) ? K.packers : K.packers || []);
      } catch (be) {
        U && q(be.message || "Failed to load packers");
      } finally {
        U && ie(!1);
      }
    })(), () => {
      U = !1;
    };
  }, [C]);
  async function Z(U) {
    if (!(!o || !U)) {
      _(U);
      try {
        const be = await fetch(`/api/orders/${encodeURIComponent(o)}/assign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riderId: U })
        });
        if (be.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const K = await be.json().catch(() => null);
        if (!be.ok) throw new Error(K && K.error ? K.error : "Assign failed");
        m && m({ orderId: o, riderId: U }), k("packer");
      } catch (be) {
        alert(be.message || "Failed to assign rider");
      } finally {
        _(null);
      }
    }
  }
  async function re(U) {
    var be;
    if (!(!o || !U)) {
      J(U);
      try {
        const K = await fetch(`/api/orders/${encodeURIComponent(o)}/assign-packer`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ packerId: U })
        });
        if (K.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const ee = await K.json().catch(() => null);
        if (!K.ok) throw new Error(ee && ee.error ? ee.error : "Assign failed");
        const ne = ee && ee.data && ee.data.packerName ? ee.data.packerName : ((be = O.find((I) => I.id === U)) == null ? void 0 : be.name) || U;
        try {
          window && typeof window.showToast == "function" && window.showToast(`Packer assigned: ${ne}`, { type: "success" });
        } catch {
        }
        p();
      } catch (K) {
        alert(K.message || "Failed to assign packer");
      } finally {
        J(null);
      }
    }
  }
  return /* @__PURE__ */ c.jsxDEV("div", { className: "assign-modal-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ c.jsxDEV("div", { className: "assign-modal", children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "assign-modal-header", children: [
      /* @__PURE__ */ c.jsxDEV("h3", { className: "assign-modal-title", children: C === "packer" ? "Assign Packers" : "Assign Rider" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 90,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "assign-modal-close", onClick: p, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 91,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 89,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "assign-modal-body", children: C !== "packer" ? /* @__PURE__ */ c.jsxDEV(c.Fragment, { children: [
      S && /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: "Loading riders…" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 96,
        columnNumber: 27
      }, this),
      A && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: A }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 97,
        columnNumber: 25
      }, this),
      !S && !A && /* @__PURE__ */ c.jsxDEV("table", { className: "assign-table", children: [
        /* @__PURE__ */ c.jsxDEV("thead", { children: /* @__PURE__ */ c.jsxDEV("tr", { children: [
          /* @__PURE__ */ c.jsxDEV("th", { children: "Name" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 101,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { children: "Last Active (days)" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 101,
            columnNumber: 38
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { children: "Action" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 101,
            columnNumber: 65
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 101,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 100,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ c.jsxDEV("tbody", { children: [
          g.map((U) => /* @__PURE__ */ c.jsxDEV("tr", { children: [
            /* @__PURE__ */ c.jsxDEV("td", { children: U.name }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 106,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { children: U.lastActiveDays ?? "-" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 107,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { children: /* @__PURE__ */ c.jsxDEV("button", { className: "btn-assign", onClick: () => Z(U.id), disabled: T && T !== U.id, children: T === U.id ? "Assigning…" : "Assign" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 109,
              columnNumber: 27
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 108,
              columnNumber: 25
            }, this)
          ] }, U.id, !0, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 105,
            columnNumber: 23
          }, this)),
          g.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 3, className: "section-note", children: "No riders found." }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 115,
            columnNumber: 50
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 115,
            columnNumber: 46
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 103,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 99,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 95,
      columnNumber: 13
    }, this) : /* @__PURE__ */ c.jsxDEV(c.Fragment, { children: [
      se && /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: "Loading packers…" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 122,
        columnNumber: 34
      }, this),
      ve && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: ve }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 123,
        columnNumber: 32
      }, this),
      !se && !ve && /* @__PURE__ */ c.jsxDEV("table", { className: "assign-table", children: [
        /* @__PURE__ */ c.jsxDEV("thead", { children: /* @__PURE__ */ c.jsxDEV("tr", { children: [
          /* @__PURE__ */ c.jsxDEV("th", { children: "Name" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 127,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { children: "Last Active (days)" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 127,
            columnNumber: 38
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { children: "Action" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 127,
            columnNumber: 65
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 127,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 126,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ c.jsxDEV("tbody", { children: [
          O.map((U) => /* @__PURE__ */ c.jsxDEV("tr", { children: [
            /* @__PURE__ */ c.jsxDEV("td", { children: U.name }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 132,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { children: U.lastActiveDays ?? "-" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 133,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { children: /* @__PURE__ */ c.jsxDEV("button", { className: "btn-assign", onClick: () => re(U.id), disabled: Y && Y !== U.id, children: Y === U.id ? "Assigning…" : "Assign" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 135,
              columnNumber: 27
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 134,
              columnNumber: 25
            }, this)
          ] }, U.id, !0, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 131,
            columnNumber: 23
          }, this)),
          O.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 3, className: "section-note", children: "No packers found." }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 141,
            columnNumber: 51
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 141,
            columnNumber: 47
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 129,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 125,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 121,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 93,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/AssignModal.jsx",
    lineNumber: 88,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/AssignModal.jsx",
    lineNumber: 87,
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
  const [o, p] = E.useState([]), [m, g] = E.useState(""), [y, S] = E.useState("all"), [f, A] = E.useState(1), [R, T] = E.useState(20), [_, C] = E.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [k, O] = E.useState(!0), [B, se] = E.useState(""), [ie, ve] = E.useState(""), [q, Y] = E.useState(!0), [J, Z] = E.useState(0), [re, U] = E.useState(!1), [be, K] = E.useState(null);
  E.useEffect(() => {
    let F = !0;
    return (async () => {
      var oe, pe, ae, ze;
      O(!0), se(""), ve("");
      try {
        const We = new URLSearchParams();
        if (m && We.set("q", m), y && y !== "all") {
          const xt = vE[y] || y;
          We.set("status", zv(xt));
        }
        We.set("page", String(f)), We.set("limit", String(R));
        const lt = await fetch(`/api/orders?${We.toString()}`, { credentials: "include" });
        if (lt.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!lt.ok) throw new Error("Failed to load orders");
        const dt = await lt.json();
        F && (p(Array.isArray(dt.orders) ? dt.orders : []), ve(dt.shopifyError || ""), Y(!!dt.shopifyConfigured), C({ total: ((oe = dt.meta) == null ? void 0 : oe.total) || 0, page: ((pe = dt.meta) == null ? void 0 : pe.page) || 1, limit: ((ae = dt.meta) == null ? void 0 : ae.limit) || R, pages: ((ze = dt.meta) == null ? void 0 : ze.pages) || 1 }));
      } catch (We) {
        F && se(We.message || "Failed to load orders");
      } finally {
        F && O(!1);
      }
    })(), () => {
      F = !1;
    };
  }, [m, y, f, R, J]), E.useMemo(() => o, [o]);
  const ee = E.useMemo(() => {
    if (!Array.isArray(o)) return [];
    if (y === "all") return o.slice();
    const F = zv(vE[y] || y);
    return o.filter((oe) => mE(oe) === F);
  }, [o, y]);
  function ne() {
    K(null), U(!1);
  }
  function I(F) {
    try {
      const { orderId: oe } = F || {};
      if (!oe) return;
      const pe = String(oe).replace(/^#+/, "");
      A(1);
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${oe}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  async function Q(F) {
    if (F)
      try {
        const oe = await fetch(`/api/orders/${encodeURIComponent(F)}/unassign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });
        if (oe.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!oe.ok) throw new Error("Failed to unassign order");
        try {
          window && typeof window.showToast == "function" && window.showToast(`Order unassigned: ${F}`, { type: "success" });
        } catch {
        }
        A(1), Z((pe) => pe + 1);
      } catch (oe) {
        try {
          window && typeof window.showToast == "function" && window.showToast(oe.message || "Failed to unassign order", { type: "error" });
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: m, onChange: (F) => {
          g(F.target.value), A(1);
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
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters", children: q_.map(({ key: F, label: oe }) => /* @__PURE__ */ c.jsxDEV("button", { className: `rc-select rc-chip${y === F ? " active" : ""}`, onClick: () => {
        S(F), A(1);
      }, "data-filter": F, children: oe }, F, !1, {
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
    !q && /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
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
        k && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 8, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 161,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 161,
          columnNumber: 17
        }, this),
        !k && B && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 8, className: "auth-error", children: B }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 164,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 164,
          columnNumber: 17
        }, this),
        !k && !B && ee.map((F, oe) => {
          var _t;
          const pe = $E(F), ae = mE(F), ze = F.full_name || (F.customer && F.customer.full_name ? F.customer.full_name : "");
          let We = "-";
          typeof F.shipping_address == "string" && String(F.shipping_address).trim() ? We = String(F.shipping_address).trim() : F.shipping_address && typeof F.shipping_address == "object" ? We = [F.shipping_address.address1 || "", F.shipping_address.city || "", F.shipping_address.province || "", F.shipping_address.country || ""].map((jt) => String(jt || "").trim()).filter(Boolean).join(", ") || "-" : typeof F.billing_address == "string" && String(F.billing_address).trim() ? We = String(F.billing_address).trim() : F.billing_address && typeof F.billing_address == "object" && (We = [F.billing_address.address1 || "", F.billing_address.city || "", F.billing_address.province || "", F.billing_address.country || ""].map((jt) => String(jt || "").trim()).filter(Boolean).join(", ") || "-");
          const lt = F.name || F.order_number || F.id, dt = lt != null ? String(lt).replace(/^#+/, "").trim() : "", xt = dt || "-", In = Y_(F), nn = FE(In), ha = PE(F), na = zE(ha), Lt = UE(F), xn = HE(Lt), kt = F.rider ? String(F.rider) : (_t = F.assignment) != null && _t.riderId ? String(F.assignment.riderId) : "Unassigned";
          return /* @__PURE__ */ c.jsxDEV("tr", { "data-status": ae, children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name order-id-cell", children: xt }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 195,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-km customer-cell", children: ze || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 196,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-perf address-cell", children: We }, void 0, !1, {
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
              /* @__PURE__ */ c.jsxDEV("span", { className: `status-chip status-${ae}`, children: pe }, void 0, !1, {
                fileName: "/app/code/client/pages/Orders.jsx",
                lineNumber: 204,
                columnNumber: 25
              }, this),
              ae === "assigned" && /* @__PURE__ */ c.jsxDEV(
                "button",
                {
                  className: "status-unassign-btn",
                  onClick: () => Q(dt),
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
          ] }, lt || oe, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 194,
            columnNumber: 19
          }, this);
        }),
        !k && !B && ee.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 8, className: "section-note", children: "No orders to display." }, void 0, !1, {
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
      re && be && /* @__PURE__ */ c.jsxDEV(BE, { orderId: be, onClose: ne, onAssigned: I }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 228,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page <= 1 || k, onClick: () => A((F) => Math.max(1, F - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 232,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("span", { className: "section-note", children: [
          "Page ",
          _.page,
          " of ",
          _.pages,
          " • ",
          _.total,
          " total"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 233,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page >= _.pages || k, onClick: () => A((F) => Math.min(_.pages, F + 1)), children: "Next" }, void 0, !1, {
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
  const [o, p] = E.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [m, g] = E.useState([]), [y, S] = E.useState(!1), [f, A] = E.useState(!0), [R, T] = E.useState("");
  return E.useEffect(() => {
    let _ = !0;
    return (async () => {
      A(!0), T("");
      try {
        const C = await fetch("/api/reports", { credentials: "include" });
        if (C.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!C.ok) throw new Error("Failed to load reports");
        const k = await C.json();
        _ && (p(k.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), g(Array.isArray(k.deliveries) ? k.deliveries : []));
      } catch (C) {
        _ && T(C.message || "Failed to load reports");
      } finally {
        _ && A(!1);
      }
    })(), () => {
      _ = !1;
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
          /* @__PURE__ */ c.jsxDEV("input", { type: "checkbox", checked: y, onChange: (_) => S(_.target.checked) }, void 0, !1, {
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
          !f && !R && m.map((_, C) => /* @__PURE__ */ c.jsxDEV("tr", { children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              _.orderNumber || _.orderId
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 81,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-km", children: _.riderId || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 82,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-perf", children: _.expectedMinutes != null ? `${_.expectedMinutes} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 83,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-perf", children: _.durationMins != null ? `${_.durationMins} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 84,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-perf", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 85,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-commission", children: _.status || "new" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 86,
              columnNumber: 23
            }, this)
          ] }, _.orderId || C, !0, {
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
  const [m, g] = E.useState(""), [y, S] = E.useState(""), [f, A] = E.useState(""), [R, T] = E.useState(""), [_, C] = E.useState(!1), [k, O] = E.useState(""), [B, se] = E.useState(""), [ie, ve] = E.useState(!1), [q, Y] = E.useState(!1), [J, Z] = E.useState(!1), [re, U] = E.useState(!1);
  async function be() {
    O(""), se(""), U(!0);
    const K = String(m).trim(), ee = String(y), ne = String(f).trim(), I = String(R).trim(), Q = I.replace(/\D+/g, ""), F = { fn: !ne, cn: !I, pw: !ee };
    if (ve(F.fn), Y(F.cn || Q.length < 7), Z(F.pw), F.fn || F.cn || F.pw) {
      O("Full name, mobile and password are required");
      return;
    }
    if (Q.length < 7) {
      O("Please enter a valid mobile number"), Y(!0);
      return;
    }
    if (K && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(K)) {
      O("Please enter a valid email");
      return;
    }
    if (ee.length < 6) {
      Z(!0), O("Password must be at least 6 characters");
      return;
    }
    C(!0);
    try {
      const oe = await fetch("/api/packers", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: K, password: ee, fullName: ne, contactNumber: I })
      }), pe = await oe.json().catch(() => null);
      if (!oe.ok) {
        const ae = String(pe && (pe.error || pe.message) || ""), ze = ae.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(ae) || /MISSING\s*EMAIL\/PASSWORD/i.test(ae))
          O("Full name, mobile and password are required"), ve(!ne), Y(!I || Q.length < 7), Z(!ee);
        else if (ze.includes("EMAIL_EXISTS"))
          O("An account with this email already exists. Use a different email or leave email blank.");
        else if (ze.includes("INVALID_EMAIL"))
          O("Please enter a valid email");
        else if (ze.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(ae))
          Z(!0), O("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER/i.test(ae))
          Y(!0), O("Please enter a valid mobile number");
        else if (/FIREBASE NOT CONFIGURED/i.test(ae))
          O("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(ae || "Failed to create packer");
        return;
      }
      se("Packer created successfully"), p && p(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (oe) {
      const pe = String((oe == null ? void 0 : oe.message) || "");
      /Missing\s*(fullName\/contactNumber|email\/password)/i.test(pe) ? O("Full name, mobile and password are required") : /EMAIL_EXISTS/i.test(pe) ? O("An account with this email already exists. Use a different email or leave email blank.") : /INVALID_EMAIL/i.test(pe) ? O("Please enter a valid email") : /WEAK_PASSWORD/i.test(pe) || /AT LEAST 6 CHARACTERS/i.test(pe) ? (Z(!0), O("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER/i.test(pe) ? (Y(!0), O("Please enter a valid mobile number")) : O(pe || "Failed to create packer");
    } finally {
      C(!1);
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
      B && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-success", children: B }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 98,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ c.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (re && !String(f).trim() ? " input-error" : ""), value: f, onChange: (K) => {
          A(K.target.value), re && ve(!String(K.target.value).trim());
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input", type: "email", value: m, onChange: (K) => {
          g(K.target.value);
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (re && !String(y) ? " input-error" : ""), type: "password", value: y, onChange: (K) => {
          S(K.target.value), re && Z(!String(K.target.value));
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (re && String(R).trim().replace(/\D+/g, "").length < 7 ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: R, onChange: (K) => {
          if (T(K.target.value), re) {
            const ee = String(K.target.value).trim().replace(/\D+/g, "");
            Y(!(ee.length >= 7));
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
      k && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: k }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 111,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary", onClick: o, disabled: _, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 113,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-primary", onClick: be, disabled: _, children: _ ? "Creating…" : "Create" }, void 0, !1, {
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
  const [o, p] = E.useState([]), [m, g] = E.useState(!0), [y, S] = E.useState(""), [f, A] = E.useState(1), [R, T] = E.useState(25), [_, C] = E.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  E.useEffect(() => {
    let re = !0;
    return (async () => {
      var U, be, K, ee;
      g(!0), S("");
      try {
        const ne = new URLSearchParams();
        ne.set("limit", String(R)), ne.set("page", String(f)), ne.set("status", "new");
        const I = await fetch(`/api/orders?${ne.toString()}`, { credentials: "include" });
        if (I.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!I.ok) throw new Error("Failed to load orders");
        const Q = await I.json();
        re && (p(Array.isArray(Q.orders) ? Q.orders : []), C({ total: ((U = Q.meta) == null ? void 0 : U.total) || 0, page: ((be = Q.meta) == null ? void 0 : be.page) || f, limit: ((K = Q.meta) == null ? void 0 : K.limit) || R, pages: ((ee = Q.meta) == null ? void 0 : ee.pages) || 1 }));
      } catch (ne) {
        re && S(ne.message || "Failed to load orders");
      } finally {
        re && g(!1);
      }
    })(), () => {
      re = !1;
    };
  }, [f]);
  function k(re) {
    return !re || typeof re != "object" ? "new" : typeof re.current_status == "string" && String(re.current_status).trim() ? String(re.current_status).toLowerCase().trim() : "new";
  }
  const [O, B] = E.useState(!1), [se, ie] = E.useState(null), [ve, q] = E.useState(!1);
  function Y(re) {
    ie(re), B(!0);
  }
  function J() {
    ie(null), B(!1);
  }
  function Z(re) {
    try {
      const { orderId: U } = re || {};
      if (!U) return;
      const be = String(U).replace(/^#+/, "");
      p((K) => K.filter((ee, ne) => {
        const I = String(ee.id || ee.name || ee.order_number || ne).replace(/^#+/, "");
        return String(I) !== String(be);
      })), C((K) => ({ ...K || {}, total: Math.max(0, ((K == null ? void 0 : K.total) || 0) - 1) }));
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${U}`, { type: "success" });
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
          /* @__PURE__ */ c.jsxDEV("div", { className: "stat-value", children: m ? "…" : _.total || o.length }, void 0, !1, {
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
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary btn-create-packer", onClick: () => q(!0), children: "Create Packer" }, void 0, !1, {
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
        !m && !y && (Array.isArray(o) ? o.filter((U) => k(U) === "new") : []).map((U, be) => {
          const K = k(U), ee = U.full_name || (U.customer && U.customer.full_name ? U.customer.full_name : "");
          let ne = "-";
          typeof U.shipping_address == "string" && String(U.shipping_address).trim() ? ne = String(U.shipping_address).trim() : U.shipping_address && typeof U.shipping_address == "object" ? ne = [U.shipping_address.address1 || "", U.shipping_address.city || "", U.shipping_address.province || "", U.shipping_address.country || ""].map((ae) => String(ae || "").trim()).filter(Boolean).join(", ") || "-" : typeof U.billing_address == "string" && String(U.billing_address).trim() ? ne = String(U.billing_address).trim() : U.billing_address && typeof U.billing_address == "object" && (ne = [U.billing_address.address1 || "", U.billing_address.city || "", U.billing_address.province || "", U.billing_address.country || ""].map((ae) => String(ae || "").trim()).filter(Boolean).join(", ") || "-");
          const I = U.name || U.order_number || U.id || be, Q = String(U.id || U.name || U.order_number || be).replace(/^#+/, ""), F = U.created_at ? new Date(U.created_at) : null, oe = F ? F.toLocaleDateString() : "-", pe = F ? F.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ c.jsxDEV("tr", { "data-status": K, children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-order", children: I }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 126,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-customer", children: ee || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 127,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-address", children: ne }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 128,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ c.jsxDEV("span", { className: `status-chip status-${K}`, children: K.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 129,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 129,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-date", children: oe }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 130,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-time", children: pe }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 131,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ c.jsxDEV("button", { className: "order-action btn-manage", onClick: () => Y(String(U.id || U.name || U.order_number || be)), children: "Assign" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 132,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 132,
              columnNumber: 23
            }, this)
          ] }, Q, !0, {
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
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page <= 1 || m, onClick: () => A((re) => Math.max(1, re - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 144,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        _.page,
        " of ",
        _.pages,
        " • ",
        _.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 145,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page >= _.pages || m, onClick: () => A((re) => Math.min(_.pages, re + 1)), children: "Next" }, void 0, !1, {
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
    O && se && /* @__PURE__ */ c.jsxDEV(BE, { orderId: se, onClose: J, onAssigned: Z }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 151,
      columnNumber: 11
    }, this),
    ve && /* @__PURE__ */ c.jsxDEV(K_, { onClose: () => q(!1), onCreated: () => {
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
    const R = ME();
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
