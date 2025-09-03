function Uj(c, p) {
  for (var h = 0; h < p.length; h++) {
    const b = p[h];
    if (typeof b != "string" && !Array.isArray(b)) {
      for (const E in b)
        if (E !== "default" && !(E in c)) {
          const D = Object.getOwnPropertyDescriptor(b, E);
          D && Object.defineProperty(c, E, D.get ? D : {
            enumerable: !0,
            get: () => b[E]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(c, Symbol.toStringTag, { value: "Module" }));
}
function kj(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var lS = { exports: {} }, wm = {}, oS = { exports: {} }, mf = { exports: {} };
mf.exports;
(function(c, p) {
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
    var h = "18.3.1", b = Symbol.for("react.element"), E = Symbol.for("react.portal"), D = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), z = Symbol.for("react.profiler"), w = Symbol.for("react.provider"), x = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), R = Symbol.for("react.suspense"), H = Symbol.for("react.suspense_list"), Y = Symbol.for("react.memo"), Z = Symbol.for("react.lazy"), F = Symbol.for("react.offscreen"), G = Symbol.iterator, le = "@@iterator";
    function q(s) {
      if (s === null || typeof s != "object")
        return null;
      var y = G && s[G] || s[le];
      return typeof y == "function" ? y : null;
    }
    var I = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, ie = {
      transition: null
    }, te = {
      current: null,
      // Used to reproduce behavior of `batchedUpdates` in legacy mode.
      isBatchingLegacy: !1,
      didScheduleLegacyUpdate: !1
    }, oe = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, ce = {}, Pe = null;
    function Fe(s) {
      Pe = s;
    }
    ce.setExtraStackFrame = function(s) {
      Pe = s;
    }, ce.getCurrentStack = null, ce.getStackAddendum = function() {
      var s = "";
      Pe && (s += Pe);
      var y = ce.getCurrentStack;
      return y && (s += y() || ""), s;
    };
    var Ge = !1, Ze = !1, et = !1, xe = !1, yt = !1, ct = {
      ReactCurrentDispatcher: I,
      ReactCurrentBatchConfig: ie,
      ReactCurrentOwner: oe
    };
    ct.ReactDebugCurrentFrame = ce, ct.ReactCurrentActQueue = te;
    function Dt(s) {
      {
        for (var y = arguments.length, _ = new Array(y > 1 ? y - 1 : 0), A = 1; A < y; A++)
          _[A - 1] = arguments[A];
        sn("warn", s, _);
      }
    }
    function _e(s) {
      {
        for (var y = arguments.length, _ = new Array(y > 1 ? y - 1 : 0), A = 1; A < y; A++)
          _[A - 1] = arguments[A];
        sn("error", s, _);
      }
    }
    function sn(s, y, _) {
      {
        var A = ct.ReactDebugCurrentFrame, W = A.getStackAddendum();
        W !== "" && (y += "%s", _ = _.concat([W]));
        var ye = _.map(function(se) {
          return String(se);
        });
        ye.unshift("Warning: " + y), Function.prototype.apply.call(console[s], console, ye);
      }
    }
    var da = {};
    function Bn(s, y) {
      {
        var _ = s.constructor, A = _ && (_.displayName || _.name) || "ReactClass", W = A + "." + y;
        if (da[W])
          return;
        _e("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", y, A), da[W] = !0;
      }
    }
    var Zn = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function(s) {
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
      enqueueForceUpdate: function(s, y, _) {
        Bn(s, "forceUpdate");
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
      enqueueReplaceState: function(s, y, _, A) {
        Bn(s, "replaceState");
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
      enqueueSetState: function(s, y, _, A) {
        Bn(s, "setState");
      }
    }, Ft = Object.assign, pa = {};
    Object.freeze(pa);
    function bn(s, y, _) {
      this.props = s, this.context = y, this.refs = pa, this.updater = _ || Zn;
    }
    bn.prototype.isReactComponent = {}, bn.prototype.setState = function(s, y) {
      if (typeof s != "object" && typeof s != "function" && s != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, s, y, "setState");
    }, bn.prototype.forceUpdate = function(s) {
      this.updater.enqueueForceUpdate(this, s, "forceUpdate");
    };
    {
      var er = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, Ua = function(s, y) {
        Object.defineProperty(bn.prototype, s, {
          get: function() {
            Dt("%s(...) is deprecated in plain JavaScript React classes. %s", y[0], y[1]);
          }
        });
      };
      for (var Wt in er)
        er.hasOwnProperty(Wt) && Ua(Wt, er[Wt]);
    }
    function Pn() {
    }
    Pn.prototype = bn.prototype;
    function Qt(s, y, _) {
      this.props = s, this.context = y, this.refs = pa, this.updater = _ || Zn;
    }
    var Kt = Qt.prototype = new Pn();
    Kt.constructor = Qt, Ft(Kt, bn.prototype), Kt.isPureReactComponent = !0;
    function Xt() {
      var s = {
        current: null
      };
      return Object.seal(s), s;
    }
    var Ln = Array.isArray;
    function Ht(s) {
      return Ln(s);
    }
    function En(s) {
      {
        var y = typeof Symbol == "function" && Symbol.toStringTag, _ = y && s[Symbol.toStringTag] || s.constructor.name || "Object";
        return _;
      }
    }
    function Bt(s) {
      try {
        return Pt(s), !1;
      } catch {
        return !0;
      }
    }
    function Pt(s) {
      return "" + s;
    }
    function ea(s) {
      if (Bt(s))
        return _e("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", En(s)), Pt(s);
    }
    function tr(s, y, _) {
      var A = s.displayName;
      if (A)
        return A;
      var W = y.displayName || y.name || "";
      return W !== "" ? _ + "(" + W + ")" : _;
    }
    function va(s) {
      return s.displayName || "Context";
    }
    function Mn(s) {
      if (s == null)
        return null;
      if (typeof s.tag == "number" && _e("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof s == "function")
        return s.displayName || s.name || null;
      if (typeof s == "string")
        return s;
      switch (s) {
        case D:
          return "Fragment";
        case E:
          return "Portal";
        case z:
          return "Profiler";
        case f:
          return "StrictMode";
        case R:
          return "Suspense";
        case H:
          return "SuspenseList";
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case x:
            var y = s;
            return va(y) + ".Consumer";
          case w:
            var _ = s;
            return va(_._context) + ".Provider";
          case M:
            return tr(s, s.render, "ForwardRef");
          case Y:
            var A = s.displayName || null;
            return A !== null ? A : Mn(s.type) || "Memo";
          case Z: {
            var W = s, ye = W._payload, se = W._init;
            try {
              return Mn(se(ye));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var cn = Object.prototype.hasOwnProperty, Jt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Sn, ka, wt;
    wt = {};
    function Nn(s) {
      if (cn.call(s, "ref")) {
        var y = Object.getOwnPropertyDescriptor(s, "ref").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return s.ref !== void 0;
    }
    function An(s) {
      if (cn.call(s, "key")) {
        var y = Object.getOwnPropertyDescriptor(s, "key").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return s.key !== void 0;
    }
    function jr(s, y) {
      var _ = function() {
        Sn || (Sn = !0, _e("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
      };
      _.isReactWarning = !0, Object.defineProperty(s, "key", {
        get: _,
        configurable: !0
      });
    }
    function nr(s, y) {
      var _ = function() {
        ka || (ka = !0, _e("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
      };
      _.isReactWarning = !0, Object.defineProperty(s, "ref", {
        get: _,
        configurable: !0
      });
    }
    function K(s) {
      if (typeof s.ref == "string" && oe.current && s.__self && oe.current.stateNode !== s.__self) {
        var y = Mn(oe.current.type);
        wt[y] || (_e('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', y, s.ref), wt[y] = !0);
      }
    }
    var de = function(s, y, _, A, W, ye, se) {
      var Re = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: b,
        // Built-in properties that belong on the element
        type: s,
        key: y,
        ref: _,
        props: se,
        // Record the component responsible for creating this element.
        _owner: ye
      };
      return Re._store = {}, Object.defineProperty(Re._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Re, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: A
      }), Object.defineProperty(Re, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: W
      }), Object.freeze && (Object.freeze(Re.props), Object.freeze(Re)), Re;
    };
    function je(s, y, _) {
      var A, W = {}, ye = null, se = null, Re = null, Ve = null;
      if (y != null) {
        Nn(y) && (se = y.ref, K(y)), An(y) && (ea(y.key), ye = "" + y.key), Re = y.__self === void 0 ? null : y.__self, Ve = y.__source === void 0 ? null : y.__source;
        for (A in y)
          cn.call(y, A) && !Jt.hasOwnProperty(A) && (W[A] = y[A]);
      }
      var Qe = arguments.length - 2;
      if (Qe === 1)
        W.children = _;
      else if (Qe > 1) {
        for (var at = Array(Qe), rt = 0; rt < Qe; rt++)
          at[rt] = arguments[rt + 2];
        Object.freeze && Object.freeze(at), W.children = at;
      }
      if (s && s.defaultProps) {
        var Le = s.defaultProps;
        for (A in Le)
          W[A] === void 0 && (W[A] = Le[A]);
      }
      if (ye || se) {
        var dt = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
        ye && jr(W, dt), se && nr(W, dt);
      }
      return de(s, ye, se, Re, Ve, oe.current, W);
    }
    function We(s, y) {
      var _ = de(s.type, y, s.ref, s._self, s._source, s._owner, s.props);
      return _;
    }
    function lt(s, y, _) {
      if (s == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + s + ".");
      var A, W = Ft({}, s.props), ye = s.key, se = s.ref, Re = s._self, Ve = s._source, Qe = s._owner;
      if (y != null) {
        Nn(y) && (se = y.ref, Qe = oe.current), An(y) && (ea(y.key), ye = "" + y.key);
        var at;
        s.type && s.type.defaultProps && (at = s.type.defaultProps);
        for (A in y)
          cn.call(y, A) && !Jt.hasOwnProperty(A) && (y[A] === void 0 && at !== void 0 ? W[A] = at[A] : W[A] = y[A]);
      }
      var rt = arguments.length - 2;
      if (rt === 1)
        W.children = _;
      else if (rt > 1) {
        for (var Le = Array(rt), dt = 0; dt < rt; dt++)
          Le[dt] = arguments[dt + 2];
        W.children = Le;
      }
      return de(s.type, ye, se, Re, Ve, Qe, W);
    }
    function vt(s) {
      return typeof s == "object" && s !== null && s.$$typeof === b;
    }
    var mt = ".", fn = ":";
    function gt(s) {
      var y = /[=:]/g, _ = {
        "=": "=0",
        ":": "=2"
      }, A = s.replace(y, function(W) {
        return _[W];
      });
      return "$" + A;
    }
    var tt = !1, bt = /\/+/g;
    function ma(s) {
      return s.replace(bt, "$&/");
    }
    function ha(s, y) {
      return typeof s == "object" && s !== null && s.key != null ? (ea(s.key), gt("" + s.key)) : y.toString(36);
    }
    function ta(s, y, _, A, W) {
      var ye = typeof s;
      (ye === "undefined" || ye === "boolean") && (s = null);
      var se = !1;
      if (s === null)
        se = !0;
      else
        switch (ye) {
          case "string":
          case "number":
            se = !0;
            break;
          case "object":
            switch (s.$$typeof) {
              case b:
              case E:
                se = !0;
            }
        }
      if (se) {
        var Re = s, Ve = W(Re), Qe = A === "" ? mt + ha(Re, 0) : A;
        if (Ht(Ve)) {
          var at = "";
          Qe != null && (at = ma(Qe) + "/"), ta(Ve, y, at, "", function(Rf) {
            return Rf;
          });
        } else Ve != null && (vt(Ve) && (Ve.key && (!Re || Re.key !== Ve.key) && ea(Ve.key), Ve = We(
          Ve,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          _ + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          (Ve.key && (!Re || Re.key !== Ve.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            ma("" + Ve.key) + "/"
          ) : "") + Qe
        )), y.push(Ve));
        return 1;
      }
      var rt, Le, dt = 0, xt = A === "" ? mt : A + fn;
      if (Ht(s))
        for (var yi = 0; yi < s.length; yi++)
          rt = s[yi], Le = xt + ha(rt, yi), dt += ta(rt, y, _, Le, W);
      else {
        var yo = q(s);
        if (typeof yo == "function") {
          var lr = s;
          yo === lr.entries && (tt || Dt("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), tt = !0);
          for (var go = yo.call(lr), bo, xf = 0; !(bo = go.next()).done; )
            rt = bo.value, Le = xt + ha(rt, xf++), dt += ta(rt, y, _, Le, W);
        } else if (ye === "object") {
          var ds = String(s);
          throw new Error("Objects are not valid as a React child (found: " + (ds === "[object Object]" ? "object with keys {" + Object.keys(s).join(", ") + "}" : ds) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return dt;
    }
    function ar(s, y, _) {
      if (s == null)
        return s;
      var A = [], W = 0;
      return ta(s, A, "", "", function(ye) {
        return y.call(_, ye, W++);
      }), A;
    }
    function to(s) {
      var y = 0;
      return ar(s, function() {
        y++;
      }), y;
    }
    function oi(s, y, _) {
      ar(s, function() {
        y.apply(this, arguments);
      }, _);
    }
    function Qi(s) {
      return ar(s, function(y) {
        return y;
      }) || [];
    }
    function Ki(s) {
      if (!vt(s))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return s;
    }
    function ui(s) {
      var y = {
        $$typeof: x,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: s,
        _currentValue2: s,
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
      y.Provider = {
        $$typeof: w,
        _context: y
      };
      var _ = !1, A = !1, W = !1;
      {
        var ye = {
          $$typeof: x,
          _context: y
        };
        Object.defineProperties(ye, {
          Provider: {
            get: function() {
              return A || (A = !0, _e("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), y.Provider;
            },
            set: function(se) {
              y.Provider = se;
            }
          },
          _currentValue: {
            get: function() {
              return y._currentValue;
            },
            set: function(se) {
              y._currentValue = se;
            }
          },
          _currentValue2: {
            get: function() {
              return y._currentValue2;
            },
            set: function(se) {
              y._currentValue2 = se;
            }
          },
          _threadCount: {
            get: function() {
              return y._threadCount;
            },
            set: function(se) {
              y._threadCount = se;
            }
          },
          Consumer: {
            get: function() {
              return _ || (_ = !0, _e("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), y.Consumer;
            }
          },
          displayName: {
            get: function() {
              return y.displayName;
            },
            set: function(se) {
              W || (Dt("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", se), W = !0);
            }
          }
        }), y.Consumer = ye;
      }
      return y._currentRenderer = null, y._currentRenderer2 = null, y;
    }
    var ya = -1, na = 0, $n = 1, za = 2;
    function si(s) {
      if (s._status === ya) {
        var y = s._result, _ = y();
        if (_.then(function(ye) {
          if (s._status === na || s._status === ya) {
            var se = s;
            se._status = $n, se._result = ye;
          }
        }, function(ye) {
          if (s._status === na || s._status === ya) {
            var se = s;
            se._status = za, se._result = ye;
          }
        }), s._status === ya) {
          var A = s;
          A._status = na, A._result = _;
        }
      }
      if (s._status === $n) {
        var W = s._result;
        return W === void 0 && _e(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, W), "default" in W || _e(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, W), W.default;
      } else
        throw s._result;
    }
    function g(s) {
      var y = {
        // We use these fields to store the result.
        _status: ya,
        _result: s
      }, _ = {
        $$typeof: Z,
        _payload: y,
        _init: si
      };
      {
        var A, W;
        Object.defineProperties(_, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return A;
            },
            set: function(ye) {
              _e("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), A = ye, Object.defineProperty(_, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return W;
            },
            set: function(ye) {
              _e("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), W = ye, Object.defineProperty(_, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return _;
    }
    function P(s) {
      s != null && s.$$typeof === Y ? _e("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof s != "function" ? _e("forwardRef requires a render function but was given %s.", s === null ? "null" : typeof s) : s.length !== 0 && s.length !== 2 && _e("forwardRef render functions accept exactly two parameters: props and ref. %s", s.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), s != null && (s.defaultProps != null || s.propTypes != null) && _e("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var y = {
        $$typeof: M,
        render: s
      };
      {
        var _;
        Object.defineProperty(y, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return _;
          },
          set: function(A) {
            _ = A, !s.name && !s.displayName && (s.displayName = A);
          }
        });
      }
      return y;
    }
    var X;
    X = Symbol.for("react.module.reference");
    function pe(s) {
      return !!(typeof s == "string" || typeof s == "function" || s === D || s === z || yt || s === f || s === R || s === H || xe || s === F || Ge || Ze || et || typeof s == "object" && s !== null && (s.$$typeof === Z || s.$$typeof === Y || s.$$typeof === w || s.$$typeof === x || s.$$typeof === M || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      s.$$typeof === X || s.getModuleId !== void 0));
    }
    function Ae(s, y) {
      pe(s) || _e("memo: The first argument must be a component. Instead received: %s", s === null ? "null" : typeof s);
      var _ = {
        $$typeof: Y,
        type: s,
        compare: y === void 0 ? null : y
      };
      {
        var A;
        Object.defineProperty(_, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return A;
          },
          set: function(W) {
            A = W, !s.name && !s.displayName && (s.displayName = W);
          }
        });
      }
      return _;
    }
    function Ee() {
      var s = I.current;
      return s === null && _e(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), s;
    }
    function De(s) {
      var y = Ee();
      if (s._context !== void 0) {
        var _ = s._context;
        _.Consumer === s ? _e("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : _.Provider === s && _e("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return y.useContext(s);
    }
    function me(s) {
      var y = Ee();
      return y.useState(s);
    }
    function jt(s, y, _) {
      var A = Ee();
      return A.useReducer(s, y, _);
    }
    function ot(s) {
      var y = Ee();
      return y.useRef(s);
    }
    function ut(s, y) {
      var _ = Ee();
      return _.useEffect(s, y);
    }
    function dn(s, y) {
      var _ = Ee();
      return _.useInsertionEffect(s, y);
    }
    function Fa(s, y) {
      var _ = Ee();
      return _.useLayoutEffect(s, y);
    }
    function ga(s, y) {
      var _ = Ee();
      return _.useCallback(s, y);
    }
    function _t(s, y) {
      var _ = Ee();
      return _.useMemo(s, y);
    }
    function ci(s, y, _) {
      var A = Ee();
      return A.useImperativeHandle(s, y, _);
    }
    function ba(s, y) {
      {
        var _ = Ee();
        return _.useDebugValue(s, y);
      }
    }
    function Oe() {
      var s = Ee();
      return s.useTransition();
    }
    function fi(s) {
      var y = Ee();
      return y.useDeferredValue(s);
    }
    function ts() {
      var s = Ee();
      return s.useId();
    }
    function ns(s, y, _) {
      var A = Ee();
      return A.useSyncExternalStore(s, y, _);
    }
    var _r = 0, no, ao, ro, io, lo, as, rs;
    function Xi() {
    }
    Xi.__reactDisabledLog = !0;
    function oo() {
      {
        if (_r === 0) {
          no = console.log, ao = console.info, ro = console.warn, io = console.error, lo = console.group, as = console.groupCollapsed, rs = console.groupEnd;
          var s = {
            configurable: !0,
            enumerable: !0,
            value: Xi,
            writable: !0
          };
          Object.defineProperties(console, {
            info: s,
            log: s,
            warn: s,
            error: s,
            group: s,
            groupCollapsed: s,
            groupEnd: s
          });
        }
        _r++;
      }
    }
    function Ha() {
      {
        if (_r--, _r === 0) {
          var s = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ft({}, s, {
              value: no
            }),
            info: Ft({}, s, {
              value: ao
            }),
            warn: Ft({}, s, {
              value: ro
            }),
            error: Ft({}, s, {
              value: io
            }),
            group: Ft({}, s, {
              value: lo
            }),
            groupCollapsed: Ft({}, s, {
              value: as
            }),
            groupEnd: Ft({}, s, {
              value: rs
            })
          });
        }
        _r < 0 && _e("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var di = ct.ReactCurrentDispatcher, Or;
    function Ji(s, y, _) {
      {
        if (Or === void 0)
          try {
            throw Error();
          } catch (W) {
            var A = W.stack.trim().match(/\n( *(at )?)/);
            Or = A && A[1] || "";
          }
        return `
` + Or + s;
      }
    }
    var pi = !1, Zi;
    {
      var uo = typeof WeakMap == "function" ? WeakMap : Map;
      Zi = new uo();
    }
    function is(s, y) {
      if (!s || pi)
        return "";
      {
        var _ = Zi.get(s);
        if (_ !== void 0)
          return _;
      }
      var A;
      pi = !0;
      var W = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ye;
      ye = di.current, di.current = null, oo();
      try {
        if (y) {
          var se = function() {
            throw Error();
          };
          if (Object.defineProperty(se.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(se, []);
            } catch (xt) {
              A = xt;
            }
            Reflect.construct(s, [], se);
          } else {
            try {
              se.call();
            } catch (xt) {
              A = xt;
            }
            s.call(se.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (xt) {
            A = xt;
          }
          s();
        }
      } catch (xt) {
        if (xt && A && typeof xt.stack == "string") {
          for (var Re = xt.stack.split(`
`), Ve = A.stack.split(`
`), Qe = Re.length - 1, at = Ve.length - 1; Qe >= 1 && at >= 0 && Re[Qe] !== Ve[at]; )
            at--;
          for (; Qe >= 1 && at >= 0; Qe--, at--)
            if (Re[Qe] !== Ve[at]) {
              if (Qe !== 1 || at !== 1)
                do
                  if (Qe--, at--, at < 0 || Re[Qe] !== Ve[at]) {
                    var rt = `
` + Re[Qe].replace(" at new ", " at ");
                    return s.displayName && rt.includes("<anonymous>") && (rt = rt.replace("<anonymous>", s.displayName)), typeof s == "function" && Zi.set(s, rt), rt;
                  }
                while (Qe >= 1 && at >= 0);
              break;
            }
        }
      } finally {
        pi = !1, di.current = ye, Ha(), Error.prepareStackTrace = W;
      }
      var Le = s ? s.displayName || s.name : "", dt = Le ? Ji(Le) : "";
      return typeof s == "function" && Zi.set(s, dt), dt;
    }
    function so(s, y, _) {
      return is(s, !1);
    }
    function gf(s) {
      var y = s.prototype;
      return !!(y && y.isReactComponent);
    }
    function vi(s, y, _) {
      if (s == null)
        return "";
      if (typeof s == "function")
        return is(s, gf(s));
      if (typeof s == "string")
        return Ji(s);
      switch (s) {
        case R:
          return Ji("Suspense");
        case H:
          return Ji("SuspenseList");
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case M:
            return so(s.render);
          case Y:
            return vi(s.type, y, _);
          case Z: {
            var A = s, W = A._payload, ye = A._init;
            try {
              return vi(ye(W), y, _);
            } catch {
            }
          }
        }
      return "";
    }
    var ls = {}, co = ct.ReactDebugCurrentFrame;
    function $e(s) {
      if (s) {
        var y = s._owner, _ = vi(s.type, s._source, y ? y.type : null);
        co.setExtraStackFrame(_);
      } else
        co.setExtraStackFrame(null);
    }
    function bf(s, y, _, A, W) {
      {
        var ye = Function.call.bind(cn);
        for (var se in s)
          if (ye(s, se)) {
            var Re = void 0;
            try {
              if (typeof s[se] != "function") {
                var Ve = Error((A || "React class") + ": " + _ + " type `" + se + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[se] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Ve.name = "Invariant Violation", Ve;
              }
              Re = s[se](y, se, A, _, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Qe) {
              Re = Qe;
            }
            Re && !(Re instanceof Error) && ($e(W), _e("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", A || "React class", _, se, typeof Re), $e(null)), Re instanceof Error && !(Re.message in ls) && (ls[Re.message] = !0, $e(W), _e("Failed %s type: %s", _, Re.message), $e(null));
          }
      }
    }
    function rr(s) {
      if (s) {
        var y = s._owner, _ = vi(s.type, s._source, y ? y.type : null);
        Fe(_);
      } else
        Fe(null);
    }
    var Te;
    Te = !1;
    function fo() {
      if (oe.current) {
        var s = Mn(oe.current.type);
        if (s)
          return `

Check the render method of \`` + s + "`.";
      }
      return "";
    }
    function xn(s) {
      if (s !== void 0) {
        var y = s.fileName.replace(/^.*[\\\/]/, ""), _ = s.lineNumber;
        return `

Check your code at ` + y + ":" + _ + ".";
      }
      return "";
    }
    function mi(s) {
      return s != null ? xn(s.__source) : "";
    }
    var Lr = {};
    function Ef(s) {
      var y = fo();
      if (!y) {
        var _ = typeof s == "string" ? s : s.displayName || s.name;
        _ && (y = `

Check the top-level render call using <` + _ + ">.");
      }
      return y;
    }
    function $t(s, y) {
      if (!(!s._store || s._store.validated || s.key != null)) {
        s._store.validated = !0;
        var _ = Ef(y);
        if (!Lr[_]) {
          Lr[_] = !0;
          var A = "";
          s && s._owner && s._owner !== oe.current && (A = " It was passed a child from " + Mn(s._owner.type) + "."), rr(s), _e('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', _, A), rr(null);
        }
      }
    }
    function ft(s, y) {
      if (typeof s == "object") {
        if (Ht(s))
          for (var _ = 0; _ < s.length; _++) {
            var A = s[_];
            vt(A) && $t(A, y);
          }
        else if (vt(s))
          s._store && (s._store.validated = !0);
        else if (s) {
          var W = q(s);
          if (typeof W == "function" && W !== s.entries)
            for (var ye = W.call(s), se; !(se = ye.next()).done; )
              vt(se.value) && $t(se.value, y);
        }
      }
    }
    function os(s) {
      {
        var y = s.type;
        if (y == null || typeof y == "string")
          return;
        var _;
        if (typeof y == "function")
          _ = y.propTypes;
        else if (typeof y == "object" && (y.$$typeof === M || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        y.$$typeof === Y))
          _ = y.propTypes;
        else
          return;
        if (_) {
          var A = Mn(y);
          bf(_, s.props, "prop", A, s);
        } else if (y.PropTypes !== void 0 && !Te) {
          Te = !0;
          var W = Mn(y);
          _e("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", W || "Unknown");
        }
        typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && _e("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function aa(s) {
      {
        for (var y = Object.keys(s.props), _ = 0; _ < y.length; _++) {
          var A = y[_];
          if (A !== "children" && A !== "key") {
            rr(s), _e("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", A), rr(null);
            break;
          }
        }
        s.ref !== null && (rr(s), _e("Invalid attribute `ref` supplied to `React.Fragment`."), rr(null));
      }
    }
    function Rn(s, y, _) {
      var A = pe(s);
      if (!A) {
        var W = "";
        (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (W += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var ye = mi(y);
        ye ? W += ye : W += fo();
        var se;
        s === null ? se = "null" : Ht(s) ? se = "array" : s !== void 0 && s.$$typeof === b ? (se = "<" + (Mn(s.type) || "Unknown") + " />", W = " Did you accidentally export a JSX literal instead of a component?") : se = typeof s, _e("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", se, W);
      }
      var Re = je.apply(this, arguments);
      if (Re == null)
        return Re;
      if (A)
        for (var Ve = 2; Ve < arguments.length; Ve++)
          ft(arguments[Ve], s);
      return s === D ? aa(Re) : os(Re), Re;
    }
    var Ea = !1;
    function Sf(s) {
      var y = Rn.bind(null, s);
      return y.type = s, Ea || (Ea = !0, Dt("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(y, "type", {
        enumerable: !1,
        get: function() {
          return Dt("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: s
          }), s;
        }
      }), y;
    }
    function po(s, y, _) {
      for (var A = lt.apply(this, arguments), W = 2; W < arguments.length; W++)
        ft(arguments[W], A.type);
      return os(A), A;
    }
    function us(s, y) {
      var _ = ie.transition;
      ie.transition = {};
      var A = ie.transition;
      ie.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        s();
      } finally {
        if (ie.transition = _, _ === null && A._updatedFibers) {
          var W = A._updatedFibers.size;
          W > 10 && Dt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), A._updatedFibers.clear();
        }
      }
    }
    var vo = !1, el = null;
    function Nf(s) {
      if (el === null)
        try {
          var y = ("require" + Math.random()).slice(0, 7), _ = c && c[y];
          el = _.call(c, "timers").setImmediate;
        } catch {
          el = function(W) {
            vo === !1 && (vo = !0, typeof MessageChannel > "u" && _e("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var ye = new MessageChannel();
            ye.port1.onmessage = W, ye.port2.postMessage(void 0);
          };
        }
      return el(s);
    }
    var Mr = 0, hi = !1;
    function mo(s) {
      {
        var y = Mr;
        Mr++, te.current === null && (te.current = []);
        var _ = te.isBatchingLegacy, A;
        try {
          if (te.isBatchingLegacy = !0, A = s(), !_ && te.didScheduleLegacyUpdate) {
            var W = te.current;
            W !== null && (te.didScheduleLegacyUpdate = !1, al(W));
          }
        } catch (Le) {
          throw ir(y), Le;
        } finally {
          te.isBatchingLegacy = _;
        }
        if (A !== null && typeof A == "object" && typeof A.then == "function") {
          var ye = A, se = !1, Re = {
            then: function(Le, dt) {
              se = !0, ye.then(function(xt) {
                ir(y), Mr === 0 ? tl(xt, Le, dt) : Le(xt);
              }, function(xt) {
                ir(y), dt(xt);
              });
            }
          };
          return !hi && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            se || (hi = !0, _e("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Re;
        } else {
          var Ve = A;
          if (ir(y), Mr === 0) {
            var Qe = te.current;
            Qe !== null && (al(Qe), te.current = null);
            var at = {
              then: function(Le, dt) {
                te.current === null ? (te.current = [], tl(Ve, Le, dt)) : Le(Ve);
              }
            };
            return at;
          } else {
            var rt = {
              then: function(Le, dt) {
                Le(Ve);
              }
            };
            return rt;
          }
        }
      }
    }
    function ir(s) {
      s !== Mr - 1 && _e("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Mr = s;
    }
    function tl(s, y, _) {
      {
        var A = te.current;
        if (A !== null)
          try {
            al(A), Nf(function() {
              A.length === 0 ? (te.current = null, y(s)) : tl(s, y, _);
            });
          } catch (W) {
            _(W);
          }
        else
          y(s);
      }
    }
    var nl = !1;
    function al(s) {
      if (!nl) {
        nl = !0;
        var y = 0;
        try {
          for (; y < s.length; y++) {
            var _ = s[y];
            do
              _ = _(!0);
            while (_ !== null);
          }
          s.length = 0;
        } catch (A) {
          throw s = s.slice(y + 1), A;
        } finally {
          nl = !1;
        }
      }
    }
    var ss = Rn, cs = po, ho = Sf, fs = {
      map: ar,
      forEach: oi,
      count: to,
      toArray: Qi,
      only: Ki
    };
    p.Children = fs, p.Component = bn, p.Fragment = D, p.Profiler = z, p.PureComponent = Qt, p.StrictMode = f, p.Suspense = R, p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ct, p.act = mo, p.cloneElement = cs, p.createContext = ui, p.createElement = ss, p.createFactory = ho, p.createRef = Xt, p.forwardRef = P, p.isValidElement = vt, p.lazy = g, p.memo = Ae, p.startTransition = us, p.unstable_act = mo, p.useCallback = ga, p.useContext = De, p.useDebugValue = ba, p.useDeferredValue = fi, p.useEffect = ut, p.useId = ts, p.useImperativeHandle = ci, p.useInsertionEffect = dn, p.useLayoutEffect = Fa, p.useMemo = _t, p.useReducer = jt, p.useRef = ot, p.useState = me, p.useSyncExternalStore = ns, p.useTransition = Oe, p.version = h, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(mf, mf.exports);
var zj = mf.exports;
oS.exports = zj;
var L = oS.exports;
const Fj = /* @__PURE__ */ kj(L), Hj = /* @__PURE__ */ Uj({
  __proto__: null,
  default: Fj
}, [L]);
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
  var c = L, p = Symbol.for("react.element"), h = Symbol.for("react.portal"), b = Symbol.for("react.fragment"), E = Symbol.for("react.strict_mode"), D = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), z = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), M = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), H = Symbol.for("react.lazy"), Y = Symbol.for("react.offscreen"), Z = Symbol.iterator, F = "@@iterator";
  function G(g) {
    if (g === null || typeof g != "object")
      return null;
    var P = Z && g[Z] || g[F];
    return typeof P == "function" ? P : null;
  }
  var le = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function q(g) {
    {
      for (var P = arguments.length, X = new Array(P > 1 ? P - 1 : 0), pe = 1; pe < P; pe++)
        X[pe - 1] = arguments[pe];
      I("error", g, X);
    }
  }
  function I(g, P, X) {
    {
      var pe = le.ReactDebugCurrentFrame, Ae = pe.getStackAddendum();
      Ae !== "" && (P += "%s", X = X.concat([Ae]));
      var Ee = X.map(function(De) {
        return String(De);
      });
      Ee.unshift("Warning: " + P), Function.prototype.apply.call(console[g], console, Ee);
    }
  }
  var ie = !1, te = !1, oe = !1, ce = !1, Pe = !1, Fe;
  Fe = Symbol.for("react.module.reference");
  function Ge(g) {
    return !!(typeof g == "string" || typeof g == "function" || g === b || g === D || Pe || g === E || g === x || g === M || ce || g === Y || ie || te || oe || typeof g == "object" && g !== null && (g.$$typeof === H || g.$$typeof === R || g.$$typeof === f || g.$$typeof === z || g.$$typeof === w || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    g.$$typeof === Fe || g.getModuleId !== void 0));
  }
  function Ze(g, P, X) {
    var pe = g.displayName;
    if (pe)
      return pe;
    var Ae = P.displayName || P.name || "";
    return Ae !== "" ? X + "(" + Ae + ")" : X;
  }
  function et(g) {
    return g.displayName || "Context";
  }
  function xe(g) {
    if (g == null)
      return null;
    if (typeof g.tag == "number" && q("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof g == "function")
      return g.displayName || g.name || null;
    if (typeof g == "string")
      return g;
    switch (g) {
      case b:
        return "Fragment";
      case h:
        return "Portal";
      case D:
        return "Profiler";
      case E:
        return "StrictMode";
      case x:
        return "Suspense";
      case M:
        return "SuspenseList";
    }
    if (typeof g == "object")
      switch (g.$$typeof) {
        case z:
          var P = g;
          return et(P) + ".Consumer";
        case f:
          var X = g;
          return et(X._context) + ".Provider";
        case w:
          return Ze(g, g.render, "ForwardRef");
        case R:
          var pe = g.displayName || null;
          return pe !== null ? pe : xe(g.type) || "Memo";
        case H: {
          var Ae = g, Ee = Ae._payload, De = Ae._init;
          try {
            return xe(De(Ee));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var yt = Object.assign, ct = 0, Dt, _e, sn, da, Bn, Zn, Ft;
  function pa() {
  }
  pa.__reactDisabledLog = !0;
  function bn() {
    {
      if (ct === 0) {
        Dt = console.log, _e = console.info, sn = console.warn, da = console.error, Bn = console.group, Zn = console.groupCollapsed, Ft = console.groupEnd;
        var g = {
          configurable: !0,
          enumerable: !0,
          value: pa,
          writable: !0
        };
        Object.defineProperties(console, {
          info: g,
          log: g,
          warn: g,
          error: g,
          group: g,
          groupCollapsed: g,
          groupEnd: g
        });
      }
      ct++;
    }
  }
  function er() {
    {
      if (ct--, ct === 0) {
        var g = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: yt({}, g, {
            value: Dt
          }),
          info: yt({}, g, {
            value: _e
          }),
          warn: yt({}, g, {
            value: sn
          }),
          error: yt({}, g, {
            value: da
          }),
          group: yt({}, g, {
            value: Bn
          }),
          groupCollapsed: yt({}, g, {
            value: Zn
          }),
          groupEnd: yt({}, g, {
            value: Ft
          })
        });
      }
      ct < 0 && q("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var Ua = le.ReactCurrentDispatcher, Wt;
  function Pn(g, P, X) {
    {
      if (Wt === void 0)
        try {
          throw Error();
        } catch (Ae) {
          var pe = Ae.stack.trim().match(/\n( *(at )?)/);
          Wt = pe && pe[1] || "";
        }
      return `
` + Wt + g;
    }
  }
  var Qt = !1, Kt;
  {
    var Xt = typeof WeakMap == "function" ? WeakMap : Map;
    Kt = new Xt();
  }
  function Ln(g, P) {
    if (!g || Qt)
      return "";
    {
      var X = Kt.get(g);
      if (X !== void 0)
        return X;
    }
    var pe;
    Qt = !0;
    var Ae = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var Ee;
    Ee = Ua.current, Ua.current = null, bn();
    try {
      if (P) {
        var De = function() {
          throw Error();
        };
        if (Object.defineProperty(De.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(De, []);
          } catch (_t) {
            pe = _t;
          }
          Reflect.construct(g, [], De);
        } else {
          try {
            De.call();
          } catch (_t) {
            pe = _t;
          }
          g.call(De.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (_t) {
          pe = _t;
        }
        g();
      }
    } catch (_t) {
      if (_t && pe && typeof _t.stack == "string") {
        for (var me = _t.stack.split(`
`), jt = pe.stack.split(`
`), ot = me.length - 1, ut = jt.length - 1; ot >= 1 && ut >= 0 && me[ot] !== jt[ut]; )
          ut--;
        for (; ot >= 1 && ut >= 0; ot--, ut--)
          if (me[ot] !== jt[ut]) {
            if (ot !== 1 || ut !== 1)
              do
                if (ot--, ut--, ut < 0 || me[ot] !== jt[ut]) {
                  var dn = `
` + me[ot].replace(" at new ", " at ");
                  return g.displayName && dn.includes("<anonymous>") && (dn = dn.replace("<anonymous>", g.displayName)), typeof g == "function" && Kt.set(g, dn), dn;
                }
              while (ot >= 1 && ut >= 0);
            break;
          }
      }
    } finally {
      Qt = !1, Ua.current = Ee, er(), Error.prepareStackTrace = Ae;
    }
    var Fa = g ? g.displayName || g.name : "", ga = Fa ? Pn(Fa) : "";
    return typeof g == "function" && Kt.set(g, ga), ga;
  }
  function Ht(g, P, X) {
    return Ln(g, !1);
  }
  function En(g) {
    var P = g.prototype;
    return !!(P && P.isReactComponent);
  }
  function Bt(g, P, X) {
    if (g == null)
      return "";
    if (typeof g == "function")
      return Ln(g, En(g));
    if (typeof g == "string")
      return Pn(g);
    switch (g) {
      case x:
        return Pn("Suspense");
      case M:
        return Pn("SuspenseList");
    }
    if (typeof g == "object")
      switch (g.$$typeof) {
        case w:
          return Ht(g.render);
        case R:
          return Bt(g.type, P, X);
        case H: {
          var pe = g, Ae = pe._payload, Ee = pe._init;
          try {
            return Bt(Ee(Ae), P, X);
          } catch {
          }
        }
      }
    return "";
  }
  var Pt = Object.prototype.hasOwnProperty, ea = {}, tr = le.ReactDebugCurrentFrame;
  function va(g) {
    if (g) {
      var P = g._owner, X = Bt(g.type, g._source, P ? P.type : null);
      tr.setExtraStackFrame(X);
    } else
      tr.setExtraStackFrame(null);
  }
  function Mn(g, P, X, pe, Ae) {
    {
      var Ee = Function.call.bind(Pt);
      for (var De in g)
        if (Ee(g, De)) {
          var me = void 0;
          try {
            if (typeof g[De] != "function") {
              var jt = Error((pe || "React class") + ": " + X + " type `" + De + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof g[De] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw jt.name = "Invariant Violation", jt;
            }
            me = g[De](P, De, pe, X, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (ot) {
            me = ot;
          }
          me && !(me instanceof Error) && (va(Ae), q("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", pe || "React class", X, De, typeof me), va(null)), me instanceof Error && !(me.message in ea) && (ea[me.message] = !0, va(Ae), q("Failed %s type: %s", X, me.message), va(null));
        }
    }
  }
  var cn = Array.isArray;
  function Jt(g) {
    return cn(g);
  }
  function Sn(g) {
    {
      var P = typeof Symbol == "function" && Symbol.toStringTag, X = P && g[Symbol.toStringTag] || g.constructor.name || "Object";
      return X;
    }
  }
  function ka(g) {
    try {
      return wt(g), !1;
    } catch {
      return !0;
    }
  }
  function wt(g) {
    return "" + g;
  }
  function Nn(g) {
    if (ka(g))
      return q("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Sn(g)), wt(g);
  }
  var An = le.ReactCurrentOwner, jr = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, nr, K, de;
  de = {};
  function je(g) {
    if (Pt.call(g, "ref")) {
      var P = Object.getOwnPropertyDescriptor(g, "ref").get;
      if (P && P.isReactWarning)
        return !1;
    }
    return g.ref !== void 0;
  }
  function We(g) {
    if (Pt.call(g, "key")) {
      var P = Object.getOwnPropertyDescriptor(g, "key").get;
      if (P && P.isReactWarning)
        return !1;
    }
    return g.key !== void 0;
  }
  function lt(g, P) {
    if (typeof g.ref == "string" && An.current && P && An.current.stateNode !== P) {
      var X = xe(An.current.type);
      de[X] || (q('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', xe(An.current.type), g.ref), de[X] = !0);
    }
  }
  function vt(g, P) {
    {
      var X = function() {
        nr || (nr = !0, q("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", P));
      };
      X.isReactWarning = !0, Object.defineProperty(g, "key", {
        get: X,
        configurable: !0
      });
    }
  }
  function mt(g, P) {
    {
      var X = function() {
        K || (K = !0, q("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", P));
      };
      X.isReactWarning = !0, Object.defineProperty(g, "ref", {
        get: X,
        configurable: !0
      });
    }
  }
  var fn = function(g, P, X, pe, Ae, Ee, De) {
    var me = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: p,
      // Built-in properties that belong on the element
      type: g,
      key: P,
      ref: X,
      props: De,
      // Record the component responsible for creating this element.
      _owner: Ee
    };
    return me._store = {}, Object.defineProperty(me._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(me, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: pe
    }), Object.defineProperty(me, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Ae
    }), Object.freeze && (Object.freeze(me.props), Object.freeze(me)), me;
  };
  function gt(g, P, X, pe, Ae) {
    {
      var Ee, De = {}, me = null, jt = null;
      X !== void 0 && (Nn(X), me = "" + X), We(P) && (Nn(P.key), me = "" + P.key), je(P) && (jt = P.ref, lt(P, Ae));
      for (Ee in P)
        Pt.call(P, Ee) && !jr.hasOwnProperty(Ee) && (De[Ee] = P[Ee]);
      if (g && g.defaultProps) {
        var ot = g.defaultProps;
        for (Ee in ot)
          De[Ee] === void 0 && (De[Ee] = ot[Ee]);
      }
      if (me || jt) {
        var ut = typeof g == "function" ? g.displayName || g.name || "Unknown" : g;
        me && vt(De, ut), jt && mt(De, ut);
      }
      return fn(g, me, jt, Ae, pe, An.current, De);
    }
  }
  var tt = le.ReactCurrentOwner, bt = le.ReactDebugCurrentFrame;
  function ma(g) {
    if (g) {
      var P = g._owner, X = Bt(g.type, g._source, P ? P.type : null);
      bt.setExtraStackFrame(X);
    } else
      bt.setExtraStackFrame(null);
  }
  var ha;
  ha = !1;
  function ta(g) {
    return typeof g == "object" && g !== null && g.$$typeof === p;
  }
  function ar() {
    {
      if (tt.current) {
        var g = xe(tt.current.type);
        if (g)
          return `

Check the render method of \`` + g + "`.";
      }
      return "";
    }
  }
  function to(g) {
    {
      if (g !== void 0) {
        var P = g.fileName.replace(/^.*[\\\/]/, ""), X = g.lineNumber;
        return `

Check your code at ` + P + ":" + X + ".";
      }
      return "";
    }
  }
  var oi = {};
  function Qi(g) {
    {
      var P = ar();
      if (!P) {
        var X = typeof g == "string" ? g : g.displayName || g.name;
        X && (P = `

Check the top-level render call using <` + X + ">.");
      }
      return P;
    }
  }
  function Ki(g, P) {
    {
      if (!g._store || g._store.validated || g.key != null)
        return;
      g._store.validated = !0;
      var X = Qi(P);
      if (oi[X])
        return;
      oi[X] = !0;
      var pe = "";
      g && g._owner && g._owner !== tt.current && (pe = " It was passed a child from " + xe(g._owner.type) + "."), ma(g), q('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', X, pe), ma(null);
    }
  }
  function ui(g, P) {
    {
      if (typeof g != "object")
        return;
      if (Jt(g))
        for (var X = 0; X < g.length; X++) {
          var pe = g[X];
          ta(pe) && Ki(pe, P);
        }
      else if (ta(g))
        g._store && (g._store.validated = !0);
      else if (g) {
        var Ae = G(g);
        if (typeof Ae == "function" && Ae !== g.entries)
          for (var Ee = Ae.call(g), De; !(De = Ee.next()).done; )
            ta(De.value) && Ki(De.value, P);
      }
    }
  }
  function ya(g) {
    {
      var P = g.type;
      if (P == null || typeof P == "string")
        return;
      var X;
      if (typeof P == "function")
        X = P.propTypes;
      else if (typeof P == "object" && (P.$$typeof === w || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      P.$$typeof === R))
        X = P.propTypes;
      else
        return;
      if (X) {
        var pe = xe(P);
        Mn(X, g.props, "prop", pe, g);
      } else if (P.PropTypes !== void 0 && !ha) {
        ha = !0;
        var Ae = xe(P);
        q("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ae || "Unknown");
      }
      typeof P.getDefaultProps == "function" && !P.getDefaultProps.isReactClassApproved && q("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function na(g) {
    {
      for (var P = Object.keys(g.props), X = 0; X < P.length; X++) {
        var pe = P[X];
        if (pe !== "children" && pe !== "key") {
          ma(g), q("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", pe), ma(null);
          break;
        }
      }
      g.ref !== null && (ma(g), q("Invalid attribute `ref` supplied to `React.Fragment`."), ma(null));
    }
  }
  var $n = {};
  function za(g, P, X, pe, Ae, Ee) {
    {
      var De = Ge(g);
      if (!De) {
        var me = "";
        (g === void 0 || typeof g == "object" && g !== null && Object.keys(g).length === 0) && (me += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var jt = to(Ae);
        jt ? me += jt : me += ar();
        var ot;
        g === null ? ot = "null" : Jt(g) ? ot = "array" : g !== void 0 && g.$$typeof === p ? (ot = "<" + (xe(g.type) || "Unknown") + " />", me = " Did you accidentally export a JSX literal instead of a component?") : ot = typeof g, q("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ot, me);
      }
      var ut = gt(g, P, X, Ae, Ee);
      if (ut == null)
        return ut;
      if (De) {
        var dn = P.children;
        if (dn !== void 0)
          if (pe)
            if (Jt(dn)) {
              for (var Fa = 0; Fa < dn.length; Fa++)
                ui(dn[Fa], g);
              Object.freeze && Object.freeze(dn);
            } else
              q("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            ui(dn, g);
      }
      if (Pt.call(P, "key")) {
        var ga = xe(g), _t = Object.keys(P).filter(function(Oe) {
          return Oe !== "key";
        }), ci = _t.length > 0 ? "{key: someKey, " + _t.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!$n[ga + ci]) {
          var ba = _t.length > 0 ? "{" + _t.join(": ..., ") + ": ...}" : "{}";
          q(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ci, ga, ba, ga), $n[ga + ci] = !0;
        }
      }
      return g === b ? na(ut) : ya(ut), ut;
    }
  }
  var si = za;
  wm.Fragment = b, wm.jsxDEV = si;
})();
lS.exports = wm;
var m = lS.exports, uS = { exports: {} }, Jn = {}, sS = { exports: {} }, cS = {};
(function(c) {
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
    var p = !1, h = 5;
    function b(K, de) {
      var je = K.length;
      K.push(de), f(K, de, je);
    }
    function E(K) {
      return K.length === 0 ? null : K[0];
    }
    function D(K) {
      if (K.length === 0)
        return null;
      var de = K[0], je = K.pop();
      return je !== de && (K[0] = je, z(K, je, 0)), de;
    }
    function f(K, de, je) {
      for (var We = je; We > 0; ) {
        var lt = We - 1 >>> 1, vt = K[lt];
        if (w(vt, de) > 0)
          K[lt] = de, K[We] = vt, We = lt;
        else
          return;
      }
    }
    function z(K, de, je) {
      for (var We = je, lt = K.length, vt = lt >>> 1; We < vt; ) {
        var mt = (We + 1) * 2 - 1, fn = K[mt], gt = mt + 1, tt = K[gt];
        if (w(fn, de) < 0)
          gt < lt && w(tt, fn) < 0 ? (K[We] = tt, K[gt] = de, We = gt) : (K[We] = fn, K[mt] = de, We = mt);
        else if (gt < lt && w(tt, de) < 0)
          K[We] = tt, K[gt] = de, We = gt;
        else
          return;
      }
    }
    function w(K, de) {
      var je = K.sortIndex - de.sortIndex;
      return je !== 0 ? je : K.id - de.id;
    }
    var x = 1, M = 2, R = 3, H = 4, Y = 5;
    function Z(K, de) {
    }
    var F = typeof performance == "object" && typeof performance.now == "function";
    if (F) {
      var G = performance;
      c.unstable_now = function() {
        return G.now();
      };
    } else {
      var le = Date, q = le.now();
      c.unstable_now = function() {
        return le.now() - q;
      };
    }
    var I = 1073741823, ie = -1, te = 250, oe = 5e3, ce = 1e4, Pe = I, Fe = [], Ge = [], Ze = 1, et = null, xe = R, yt = !1, ct = !1, Dt = !1, _e = typeof setTimeout == "function" ? setTimeout : null, sn = typeof clearTimeout == "function" ? clearTimeout : null, da = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Bn(K) {
      for (var de = E(Ge); de !== null; ) {
        if (de.callback === null)
          D(Ge);
        else if (de.startTime <= K)
          D(Ge), de.sortIndex = de.expirationTime, b(Fe, de);
        else
          return;
        de = E(Ge);
      }
    }
    function Zn(K) {
      if (Dt = !1, Bn(K), !ct)
        if (E(Fe) !== null)
          ct = !0, wt(Ft);
        else {
          var de = E(Ge);
          de !== null && Nn(Zn, de.startTime - K);
        }
    }
    function Ft(K, de) {
      ct = !1, Dt && (Dt = !1, An()), yt = !0;
      var je = xe;
      try {
        var We;
        if (!p) return pa(K, de);
      } finally {
        et = null, xe = je, yt = !1;
      }
    }
    function pa(K, de) {
      var je = de;
      for (Bn(je), et = E(Fe); et !== null && !(et.expirationTime > je && (!K || tr())); ) {
        var We = et.callback;
        if (typeof We == "function") {
          et.callback = null, xe = et.priorityLevel;
          var lt = et.expirationTime <= je, vt = We(lt);
          je = c.unstable_now(), typeof vt == "function" ? et.callback = vt : et === E(Fe) && D(Fe), Bn(je);
        } else
          D(Fe);
        et = E(Fe);
      }
      if (et !== null)
        return !0;
      var mt = E(Ge);
      return mt !== null && Nn(Zn, mt.startTime - je), !1;
    }
    function bn(K, de) {
      switch (K) {
        case x:
        case M:
        case R:
        case H:
        case Y:
          break;
        default:
          K = R;
      }
      var je = xe;
      xe = K;
      try {
        return de();
      } finally {
        xe = je;
      }
    }
    function er(K) {
      var de;
      switch (xe) {
        case x:
        case M:
        case R:
          de = R;
          break;
        default:
          de = xe;
          break;
      }
      var je = xe;
      xe = de;
      try {
        return K();
      } finally {
        xe = je;
      }
    }
    function Ua(K) {
      var de = xe;
      return function() {
        var je = xe;
        xe = de;
        try {
          return K.apply(this, arguments);
        } finally {
          xe = je;
        }
      };
    }
    function Wt(K, de, je) {
      var We = c.unstable_now(), lt;
      if (typeof je == "object" && je !== null) {
        var vt = je.delay;
        typeof vt == "number" && vt > 0 ? lt = We + vt : lt = We;
      } else
        lt = We;
      var mt;
      switch (K) {
        case x:
          mt = ie;
          break;
        case M:
          mt = te;
          break;
        case Y:
          mt = Pe;
          break;
        case H:
          mt = ce;
          break;
        case R:
        default:
          mt = oe;
          break;
      }
      var fn = lt + mt, gt = {
        id: Ze++,
        callback: de,
        priorityLevel: K,
        startTime: lt,
        expirationTime: fn,
        sortIndex: -1
      };
      return lt > We ? (gt.sortIndex = lt, b(Ge, gt), E(Fe) === null && gt === E(Ge) && (Dt ? An() : Dt = !0, Nn(Zn, lt - We))) : (gt.sortIndex = fn, b(Fe, gt), !ct && !yt && (ct = !0, wt(Ft))), gt;
    }
    function Pn() {
    }
    function Qt() {
      !ct && !yt && (ct = !0, wt(Ft));
    }
    function Kt() {
      return E(Fe);
    }
    function Xt(K) {
      K.callback = null;
    }
    function Ln() {
      return xe;
    }
    var Ht = !1, En = null, Bt = -1, Pt = h, ea = -1;
    function tr() {
      var K = c.unstable_now() - ea;
      return !(K < Pt);
    }
    function va() {
    }
    function Mn(K) {
      if (K < 0 || K > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      K > 0 ? Pt = Math.floor(1e3 / K) : Pt = h;
    }
    var cn = function() {
      if (En !== null) {
        var K = c.unstable_now();
        ea = K;
        var de = !0, je = !0;
        try {
          je = En(de, K);
        } finally {
          je ? Jt() : (Ht = !1, En = null);
        }
      } else
        Ht = !1;
    }, Jt;
    if (typeof da == "function")
      Jt = function() {
        da(cn);
      };
    else if (typeof MessageChannel < "u") {
      var Sn = new MessageChannel(), ka = Sn.port2;
      Sn.port1.onmessage = cn, Jt = function() {
        ka.postMessage(null);
      };
    } else
      Jt = function() {
        _e(cn, 0);
      };
    function wt(K) {
      En = K, Ht || (Ht = !0, Jt());
    }
    function Nn(K, de) {
      Bt = _e(function() {
        K(c.unstable_now());
      }, de);
    }
    function An() {
      sn(Bt), Bt = -1;
    }
    var jr = va, nr = null;
    c.unstable_IdlePriority = Y, c.unstable_ImmediatePriority = x, c.unstable_LowPriority = H, c.unstable_NormalPriority = R, c.unstable_Profiling = nr, c.unstable_UserBlockingPriority = M, c.unstable_cancelCallback = Xt, c.unstable_continueExecution = Qt, c.unstable_forceFrameRate = Mn, c.unstable_getCurrentPriorityLevel = Ln, c.unstable_getFirstCallbackNode = Kt, c.unstable_next = er, c.unstable_pauseExecution = Pn, c.unstable_requestPaint = jr, c.unstable_runWithPriority = bn, c.unstable_scheduleCallback = Wt, c.unstable_shouldYield = tr, c.unstable_wrapCallback = Ua, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(cS);
sS.exports = cS;
var Bj = sS.exports;
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
  var c = L, p = Bj, h = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, b = !1;
  function E(e) {
    b = e;
  }
  function D(e) {
    if (!b) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      z("warn", e, n);
    }
  }
  function f(e) {
    if (!b) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      z("error", e, n);
    }
  }
  function z(e, t, n) {
    {
      var a = h.ReactDebugCurrentFrame, r = a.getStackAddendum();
      r !== "" && (t += "%s", n = n.concat([r]));
      var i = n.map(function(l) {
        return String(l);
      });
      i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
    }
  }
  var w = 0, x = 1, M = 2, R = 3, H = 4, Y = 5, Z = 6, F = 7, G = 8, le = 9, q = 10, I = 11, ie = 12, te = 13, oe = 14, ce = 15, Pe = 16, Fe = 17, Ge = 18, Ze = 19, et = 21, xe = 22, yt = 23, ct = 24, Dt = 25, _e = !0, sn = !1, da = !1, Bn = !1, Zn = !1, Ft = !0, pa = !0, bn = !0, er = !0, Ua = /* @__PURE__ */ new Set(), Wt = {}, Pn = {};
  function Qt(e, t) {
    Kt(e, t), Kt(e + "Capture", t);
  }
  function Kt(e, t) {
    Wt[e] && f("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Wt[e] = t;
    {
      var n = e.toLowerCase();
      Pn[n] = e, e === "onDoubleClick" && (Pn.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      Ua.add(t[a]);
  }
  var Xt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Ln = Object.prototype.hasOwnProperty;
  function Ht(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function En(e) {
    try {
      return Bt(e), !1;
    } catch {
      return !0;
    }
  }
  function Bt(e) {
    return "" + e;
  }
  function Pt(e, t) {
    if (En(e))
      return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Ht(e)), Bt(e);
  }
  function ea(e) {
    if (En(e))
      return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ht(e)), Bt(e);
  }
  function tr(e, t) {
    if (En(e))
      return f("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Ht(e)), Bt(e);
  }
  function va(e, t) {
    if (En(e))
      return f("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Ht(e)), Bt(e);
  }
  function Mn(e) {
    if (En(e))
      return f("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Ht(e)), Bt(e);
  }
  function cn(e) {
    if (En(e))
      return f("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Ht(e)), Bt(e);
  }
  var Jt = 0, Sn = 1, ka = 2, wt = 3, Nn = 4, An = 5, jr = 6, nr = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", K = nr + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", de = new RegExp("^[" + nr + "][" + K + "]*$"), je = {}, We = {};
  function lt(e) {
    return Ln.call(We, e) ? !0 : Ln.call(je, e) ? !1 : de.test(e) ? (We[e] = !0, !0) : (je[e] = !0, f("Invalid attribute name: `%s`", e), !1);
  }
  function vt(e, t, n) {
    return t !== null ? t.type === Jt : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function mt(e, t, n, a) {
    if (n !== null && n.type === Jt)
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
  function fn(e, t, n, a) {
    if (t === null || typeof t > "u" || mt(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case wt:
          return !t;
        case Nn:
          return t === !1;
        case An:
          return isNaN(t);
        case jr:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function gt(e) {
    return bt.hasOwnProperty(e) ? bt[e] : null;
  }
  function tt(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === ka || t === wt || t === Nn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var bt = {}, ma = [
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
  ma.forEach(function(e) {
    bt[e] = new tt(
      e,
      Jt,
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
    bt[t] = new tt(
      t,
      Sn,
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
    bt[e] = new tt(
      e,
      ka,
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
    bt[e] = new tt(
      e,
      ka,
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
    bt[e] = new tt(
      e,
      wt,
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
    bt[e] = new tt(
      e,
      wt,
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
    bt[e] = new tt(
      e,
      Nn,
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
    bt[e] = new tt(
      e,
      jr,
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
    bt[e] = new tt(
      e,
      An,
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
  var ha = /[\-\:]([a-z])/g, ta = function(e) {
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
    var t = e.replace(ha, ta);
    bt[t] = new tt(
      t,
      Sn,
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
    var t = e.replace(ha, ta);
    bt[t] = new tt(
      t,
      Sn,
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
    var t = e.replace(ha, ta);
    bt[t] = new tt(
      t,
      Sn,
      !1,
      // mustUseProperty
      e,
      "http://www.w3.org/XML/1998/namespace",
      !1,
      // sanitizeURL
      !1
    );
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    bt[e] = new tt(
      e,
      Sn,
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
  bt[ar] = new tt(
    "xlinkHref",
    Sn,
    !1,
    // mustUseProperty
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    // sanitizeURL
    !1
  ), ["src", "href", "action", "formAction"].forEach(function(e) {
    bt[e] = new tt(
      e,
      Sn,
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
  var to = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, oi = !1;
  function Qi(e) {
    !oi && to.test(e) && (oi = !0, f("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
  }
  function Ki(e, t, n, a) {
    if (a.mustUseProperty) {
      var r = a.propertyName;
      return e[r];
    } else {
      Pt(n, t), a.sanitizeURL && Qi("" + n);
      var i = a.attributeName, l = null;
      if (a.type === Nn) {
        if (e.hasAttribute(i)) {
          var o = e.getAttribute(i);
          return o === "" ? !0 : fn(t, n, a, !1) ? o : o === "" + n ? n : o;
        }
      } else if (e.hasAttribute(i)) {
        if (fn(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === wt)
          return n;
        l = e.getAttribute(i);
      }
      return fn(t, n, a, !1) ? l === null ? n : l : l === "" + n ? n : l;
    }
  }
  function ui(e, t, n, a) {
    {
      if (!lt(t))
        return;
      if (!e.hasAttribute(t))
        return n === void 0 ? void 0 : null;
      var r = e.getAttribute(t);
      return Pt(n, t), r === "" + n ? n : r;
    }
  }
  function ya(e, t, n, a) {
    var r = gt(t);
    if (!vt(t, r, a)) {
      if (fn(t, n, r, a) && (n = null), a || r === null) {
        if (lt(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : (Pt(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var l = r.mustUseProperty;
      if (l) {
        var o = r.propertyName;
        if (n === null) {
          var u = r.type;
          e[o] = u === wt ? !1 : "";
        } else
          e[o] = n;
        return;
      }
      var d = r.attributeName, v = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(d);
      else {
        var N = r.type, S;
        N === wt || N === Nn && n === !0 ? S = "" : (Pt(n, d), S = "" + n, r.sanitizeURL && Qi(S.toString())), v ? e.setAttributeNS(v, d, S) : e.setAttribute(d, S);
      }
    }
  }
  var na = Symbol.for("react.element"), $n = Symbol.for("react.portal"), za = Symbol.for("react.fragment"), si = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), P = Symbol.for("react.provider"), X = Symbol.for("react.context"), pe = Symbol.for("react.forward_ref"), Ae = Symbol.for("react.suspense"), Ee = Symbol.for("react.suspense_list"), De = Symbol.for("react.memo"), me = Symbol.for("react.lazy"), jt = Symbol.for("react.scope"), ot = Symbol.for("react.debug_trace_mode"), ut = Symbol.for("react.offscreen"), dn = Symbol.for("react.legacy_hidden"), Fa = Symbol.for("react.cache"), ga = Symbol.for("react.tracing_marker"), _t = Symbol.iterator, ci = "@@iterator";
  function ba(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = _t && e[_t] || e[ci];
    return typeof t == "function" ? t : null;
  }
  var Oe = Object.assign, fi = 0, ts, ns, _r, no, ao, ro, io;
  function lo() {
  }
  lo.__reactDisabledLog = !0;
  function as() {
    {
      if (fi === 0) {
        ts = console.log, ns = console.info, _r = console.warn, no = console.error, ao = console.group, ro = console.groupCollapsed, io = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: lo,
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
      fi++;
    }
  }
  function rs() {
    {
      if (fi--, fi === 0) {
        var e = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: Oe({}, e, {
            value: ts
          }),
          info: Oe({}, e, {
            value: ns
          }),
          warn: Oe({}, e, {
            value: _r
          }),
          error: Oe({}, e, {
            value: no
          }),
          group: Oe({}, e, {
            value: ao
          }),
          groupCollapsed: Oe({}, e, {
            value: ro
          }),
          groupEnd: Oe({}, e, {
            value: io
          })
        });
      }
      fi < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var Xi = h.ReactCurrentDispatcher, oo;
  function Ha(e, t, n) {
    {
      if (oo === void 0)
        try {
          throw Error();
        } catch (r) {
          var a = r.stack.trim().match(/\n( *(at )?)/);
          oo = a && a[1] || "";
        }
      return `
` + oo + e;
    }
  }
  var di = !1, Or;
  {
    var Ji = typeof WeakMap == "function" ? WeakMap : Map;
    Or = new Ji();
  }
  function pi(e, t) {
    if (!e || di)
      return "";
    {
      var n = Or.get(e);
      if (n !== void 0)
        return n;
    }
    var a;
    di = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var i;
    i = Xi.current, Xi.current = null, as();
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
          } catch (O) {
            a = O;
          }
          Reflect.construct(e, [], l);
        } else {
          try {
            l.call();
          } catch (O) {
            a = O;
          }
          e.call(l.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (O) {
          a = O;
        }
        e();
      }
    } catch (O) {
      if (O && a && typeof O.stack == "string") {
        for (var o = O.stack.split(`
`), u = a.stack.split(`
`), d = o.length - 1, v = u.length - 1; d >= 1 && v >= 0 && o[d] !== u[v]; )
          v--;
        for (; d >= 1 && v >= 0; d--, v--)
          if (o[d] !== u[v]) {
            if (d !== 1 || v !== 1)
              do
                if (d--, v--, v < 0 || o[d] !== u[v]) {
                  var N = `
` + o[d].replace(" at new ", " at ");
                  return e.displayName && N.includes("<anonymous>") && (N = N.replace("<anonymous>", e.displayName)), typeof e == "function" && Or.set(e, N), N;
                }
              while (d >= 1 && v >= 0);
            break;
          }
      }
    } finally {
      di = !1, Xi.current = i, rs(), Error.prepareStackTrace = r;
    }
    var S = e ? e.displayName || e.name : "", j = S ? Ha(S) : "";
    return typeof e == "function" && Or.set(e, j), j;
  }
  function Zi(e, t, n) {
    return pi(e, !0);
  }
  function uo(e, t, n) {
    return pi(e, !1);
  }
  function is(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function so(e, t, n) {
    if (e == null)
      return "";
    if (typeof e == "function")
      return pi(e, is(e));
    if (typeof e == "string")
      return Ha(e);
    switch (e) {
      case Ae:
        return Ha("Suspense");
      case Ee:
        return Ha("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case pe:
          return uo(e.render);
        case De:
          return so(e.type, t, n);
        case me: {
          var a = e, r = a._payload, i = a._init;
          try {
            return so(i(r), t, n);
          } catch {
          }
        }
      }
    return "";
  }
  function gf(e) {
    switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
      case Y:
        return Ha(e.type);
      case Pe:
        return Ha("Lazy");
      case te:
        return Ha("Suspense");
      case Ze:
        return Ha("SuspenseList");
      case w:
      case M:
      case ce:
        return uo(e.type);
      case I:
        return uo(e.type.render);
      case x:
        return Zi(e.type);
      default:
        return "";
    }
  }
  function vi(e) {
    try {
      var t = "", n = e;
      do
        t += gf(n), n = n.return;
      while (n);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  function ls(e, t, n) {
    var a = e.displayName;
    if (a)
      return a;
    var r = t.displayName || t.name || "";
    return r !== "" ? n + "(" + r + ")" : n;
  }
  function co(e) {
    return e.displayName || "Context";
  }
  function $e(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case za:
        return "Fragment";
      case $n:
        return "Portal";
      case g:
        return "Profiler";
      case si:
        return "StrictMode";
      case Ae:
        return "Suspense";
      case Ee:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case X:
          var t = e;
          return co(t) + ".Consumer";
        case P:
          var n = e;
          return co(n._context) + ".Provider";
        case pe:
          return ls(e, e.render, "ForwardRef");
        case De:
          var a = e.displayName || null;
          return a !== null ? a : $e(e.type) || "Memo";
        case me: {
          var r = e, i = r._payload, l = r._init;
          try {
            return $e(l(i));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  function bf(e, t, n) {
    var a = t.displayName || t.name || "";
    return e.displayName || (a !== "" ? n + "(" + a + ")" : n);
  }
  function rr(e) {
    return e.displayName || "Context";
  }
  function Te(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case ct:
        return "Cache";
      case le:
        var a = n;
        return rr(a) + ".Consumer";
      case q:
        var r = n;
        return rr(r._context) + ".Provider";
      case Ge:
        return "DehydratedFragment";
      case I:
        return bf(n, n.render, "ForwardRef");
      case F:
        return "Fragment";
      case Y:
        return n;
      case H:
        return "Portal";
      case R:
        return "Root";
      case Z:
        return "Text";
      case Pe:
        return $e(n);
      case G:
        return n === si ? "StrictMode" : "Mode";
      case xe:
        return "Offscreen";
      case ie:
        return "Profiler";
      case et:
        return "Scope";
      case te:
        return "Suspense";
      case Ze:
        return "SuspenseList";
      case Dt:
        return "TracingMarker";
      case x:
      case w:
      case Fe:
      case M:
      case oe:
      case ce:
        if (typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        break;
    }
    return null;
  }
  var fo = h.ReactDebugCurrentFrame, xn = null, mi = !1;
  function Lr() {
    {
      if (xn === null)
        return null;
      var e = xn._debugOwner;
      if (e !== null && typeof e < "u")
        return Te(e);
    }
    return null;
  }
  function Ef() {
    return xn === null ? "" : vi(xn);
  }
  function $t() {
    fo.getCurrentStack = null, xn = null, mi = !1;
  }
  function ft(e) {
    fo.getCurrentStack = e === null ? null : Ef, xn = e, mi = !1;
  }
  function os() {
    return xn;
  }
  function aa(e) {
    mi = e;
  }
  function Rn(e) {
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
        return cn(e), e;
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
  function po(e, t) {
    Sf[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || f("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || f("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
  }
  function us(e) {
    var t = e.type, n = e.nodeName;
    return n && n.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function vo(e) {
    return e._valueTracker;
  }
  function el(e) {
    e._valueTracker = null;
  }
  function Nf(e) {
    var t = "";
    return e && (us(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
  }
  function Mr(e) {
    var t = us(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    cn(e[t]);
    var a = "" + e[t];
    if (!(e.hasOwnProperty(t) || typeof n > "u" || typeof n.get != "function" || typeof n.set != "function")) {
      var r = n.get, i = n.set;
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(o) {
          cn(o), a = "" + o, i.call(this, o);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      });
      var l = {
        getValue: function() {
          return a;
        },
        setValue: function(o) {
          cn(o), a = "" + o;
        },
        stopTracking: function() {
          el(e), delete e[t];
        }
      };
      return l;
    }
  }
  function hi(e) {
    vo(e) || (e._valueTracker = Mr(e));
  }
  function mo(e) {
    if (!e)
      return !1;
    var t = vo(e);
    if (!t)
      return !0;
    var n = t.getValue(), a = Nf(e);
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
  var tl = !1, nl = !1, al = !1, ss = !1;
  function cs(e) {
    var t = e.type === "checkbox" || e.type === "radio";
    return t ? e.checked != null : e.value != null;
  }
  function ho(e, t) {
    var n = e, a = t.checked, r = Oe({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? n._wrapperState.initialChecked
    });
    return r;
  }
  function fs(e, t) {
    po("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !nl && (f("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Lr() || "A component", t.type), nl = !0), t.value !== void 0 && t.defaultValue !== void 0 && !tl && (f("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Lr() || "A component", t.type), tl = !0);
    var n = e, a = t.defaultValue == null ? "" : t.defaultValue;
    n._wrapperState = {
      initialChecked: t.checked != null ? t.checked : t.defaultChecked,
      initialValue: Ea(t.value != null ? t.value : a),
      controlled: cs(t)
    };
  }
  function s(e, t) {
    var n = e, a = t.checked;
    a != null && ya(n, "checked", a, !1);
  }
  function y(e, t) {
    var n = e;
    {
      var a = cs(t);
      !n._wrapperState.controlled && a && !ss && (f("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ss = !0), n._wrapperState.controlled && !a && !al && (f("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), al = !0);
    }
    s(e, t);
    var r = Ea(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = Rn(r)) : n.value !== Rn(r) && (n.value = Rn(r));
    else if (i === "submit" || i === "reset") {
      n.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? ye(n, t.type, r) : t.hasOwnProperty("defaultValue") && ye(n, t.type, Ea(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
  }
  function _(e, t, n) {
    var a = e;
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type, i = r === "submit" || r === "reset";
      if (i && (t.value === void 0 || t.value === null))
        return;
      var l = Rn(a._wrapperState.initialValue);
      n || l !== a.value && (a.value = l), a.defaultValue = l;
    }
    var o = a.name;
    o !== "" && (a.name = ""), a.defaultChecked = !a.defaultChecked, a.defaultChecked = !!a._wrapperState.initialChecked, o !== "" && (a.name = o);
  }
  function A(e, t) {
    var n = e;
    y(n, t), W(n, t);
  }
  function W(e, t) {
    var n = t.name;
    if (t.type === "radio" && n != null) {
      for (var a = e; a.parentNode; )
        a = a.parentNode;
      Pt(n, "name");
      for (var r = a.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), i = 0; i < r.length; i++) {
        var l = r[i];
        if (!(l === e || l.form !== e.form)) {
          var o = Xs(l);
          if (!o)
            throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
          mo(l), y(l, o);
        }
      }
    }
  }
  function ye(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || ir(e.ownerDocument) !== e) && (n == null ? e.defaultValue = Rn(e._wrapperState.initialValue) : e.defaultValue !== Rn(n) && (e.defaultValue = Rn(n)));
  }
  var se = !1, Re = !1, Ve = !1;
  function Qe(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? c.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Re || (Re = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (Ve || (Ve = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !se && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), se = !0);
  }
  function at(e, t) {
    t.value != null && e.setAttribute("value", Rn(Ea(t.value)));
  }
  var rt = Array.isArray;
  function Le(e) {
    return rt(e);
  }
  var dt;
  dt = !1;
  function xt() {
    var e = Lr();
    return e ? `

Check the render method of \`` + e + "`." : "";
  }
  var yi = ["value", "defaultValue"];
  function yo(e) {
    {
      po("select", e);
      for (var t = 0; t < yi.length; t++) {
        var n = yi[t];
        if (e[n] != null) {
          var a = Le(e[n]);
          e.multiple && !a ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, xt()) : !e.multiple && a && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, xt());
        }
      }
    }
  }
  function lr(e, t, n, a) {
    var r = e.options;
    if (t) {
      for (var i = n, l = {}, o = 0; o < i.length; o++)
        l["$" + i[o]] = !0;
      for (var u = 0; u < r.length; u++) {
        var d = l.hasOwnProperty("$" + r[u].value);
        r[u].selected !== d && (r[u].selected = d), d && a && (r[u].defaultSelected = !0);
      }
    } else {
      for (var v = Rn(Ea(n)), N = null, S = 0; S < r.length; S++) {
        if (r[S].value === v) {
          r[S].selected = !0, a && (r[S].defaultSelected = !0);
          return;
        }
        N === null && !r[S].disabled && (N = r[S]);
      }
      N !== null && (N.selected = !0);
    }
  }
  function go(e, t) {
    return Oe({}, t, {
      value: void 0
    });
  }
  function bo(e, t) {
    var n = e;
    yo(t), n._wrapperState = {
      wasMultiple: !!t.multiple
    }, t.value !== void 0 && t.defaultValue !== void 0 && !dt && (f("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), dt = !0);
  }
  function xf(e, t) {
    var n = e;
    n.multiple = !!t.multiple;
    var a = t.value;
    a != null ? lr(n, !!t.multiple, a, !1) : t.defaultValue != null && lr(n, !!t.multiple, t.defaultValue, !0);
  }
  function ds(e, t) {
    var n = e, a = n._wrapperState.wasMultiple;
    n._wrapperState.wasMultiple = !!t.multiple;
    var r = t.value;
    r != null ? lr(n, !!t.multiple, r, !1) : a !== !!t.multiple && (t.defaultValue != null ? lr(n, !!t.multiple, t.defaultValue, !0) : lr(n, !!t.multiple, t.multiple ? [] : "", !1));
  }
  function Rf(e, t) {
    var n = e, a = t.value;
    a != null && lr(n, !!t.multiple, a, !1);
  }
  var Fm = !1;
  function Cf(e, t) {
    var n = e;
    if (t.dangerouslySetInnerHTML != null)
      throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
    var a = Oe({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: Rn(n._wrapperState.initialValue)
    });
    return a;
  }
  function Hm(e, t) {
    var n = e;
    po("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Fm && (f("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Lr() || "A component"), Fm = !0);
    var a = t.value;
    if (a == null) {
      var r = t.children, i = t.defaultValue;
      if (r != null) {
        f("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
        {
          if (i != null)
            throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (Le(r)) {
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
  function Bm(e, t) {
    var n = e, a = Ea(t.value), r = Ea(t.defaultValue);
    if (a != null) {
      var i = Rn(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = Rn(r));
  }
  function Pm(e, t) {
    var n = e, a = n.textContent;
    a === n._wrapperState.initialValue && a !== "" && a !== null && (n.value = a);
  }
  function xS(e, t) {
    Bm(e, t);
  }
  var or = "http://www.w3.org/1999/xhtml", RS = "http://www.w3.org/1998/Math/MathML", Tf = "http://www.w3.org/2000/svg";
  function Df(e) {
    switch (e) {
      case "svg":
        return Tf;
      case "math":
        return RS;
      default:
        return or;
    }
  }
  function wf(e, t) {
    return e == null || e === or ? Df(t) : e === Tf && t === "foreignObject" ? or : e;
  }
  var CS = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, ps, $m = CS(function(e, t) {
    if (e.namespaceURI === Tf && !("innerHTML" in e)) {
      ps = ps || document.createElement("div"), ps.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = ps.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), Vn = 1, ur = 3, Rt = 8, sr = 9, jf = 11, vs = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === ur) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }, TS = {
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
  function DS(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var wS = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Eo).forEach(function(e) {
    wS.forEach(function(t) {
      Eo[DS(t, e)] = Eo[e];
    });
  });
  function _f(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(Eo.hasOwnProperty(e) && Eo[e]) ? t + "px" : (va(t, e), ("" + t).trim());
  }
  var jS = /([A-Z])/g, _S = /^ms-/;
  function OS(e) {
    return e.replace(jS, "-$1").toLowerCase().replace(_S, "-ms-");
  }
  var Ym = function() {
  };
  {
    var LS = /^(?:webkit|moz|o)[A-Z]/, MS = /^-ms-/, AS = /-(.)/g, Im = /;\s*$/, rl = {}, Of = {}, qm = !1, Gm = !1, VS = function(e) {
      return e.replace(AS, function(t, n) {
        return n.toUpperCase();
      });
    }, US = function(e) {
      rl.hasOwnProperty(e) && rl[e] || (rl[e] = !0, f(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        VS(e.replace(MS, "ms-"))
      ));
    }, kS = function(e) {
      rl.hasOwnProperty(e) && rl[e] || (rl[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, zS = function(e, t) {
      Of.hasOwnProperty(t) && Of[t] || (Of[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Im, "")));
    }, FS = function(e, t) {
      qm || (qm = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
    }, HS = function(e, t) {
      Gm || (Gm = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Ym = function(e, t) {
      e.indexOf("-") > -1 ? US(e) : LS.test(e) ? kS(e) : Im.test(t) && zS(e, t), typeof t == "number" && (isNaN(t) ? FS(e, t) : isFinite(t) || HS(e, t));
    };
  }
  var BS = Ym;
  function PS(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : OS(a)) + ":", t += _f(a, r, i), n = ";";
          }
        }
      return t || null;
    }
  }
  function Wm(e, t) {
    var n = e.style;
    for (var a in t)
      if (t.hasOwnProperty(a)) {
        var r = a.indexOf("--") === 0;
        r || BS(a, t[a]);
        var i = _f(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function $S(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function Qm(e) {
    var t = {};
    for (var n in e)
      for (var a = TS[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function YS(e, t) {
    {
      if (!t)
        return;
      var n = Qm(e), a = Qm(t), r = {};
      for (var i in n) {
        var l = n[i], o = a[i];
        if (o && l !== o) {
          var u = l + "," + o;
          if (r[u])
            continue;
          r[u] = !0, f("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", $S(e[l]) ? "Removing" : "Updating", l, o);
        }
      }
    }
  }
  var IS = {
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
  }, qS = Oe({
    menuitem: !0
  }, IS), GS = "__html";
  function Lf(e, t) {
    if (t) {
      if (qS[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(GS in t.dangerouslySetInnerHTML))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
      }
      if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && f("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
        throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
    }
  }
  function gi(e, t) {
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
  var ms = {
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
  }, Km = {
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
  }, il = {}, WS = new RegExp("^(aria)-[" + K + "]*$"), QS = new RegExp("^(aria)[A-Z][" + K + "]*$");
  function KS(e, t) {
    {
      if (Ln.call(il, t) && il[t])
        return !0;
      if (QS.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = Km.hasOwnProperty(n) ? n : null;
        if (a == null)
          return f("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), il[t] = !0, !0;
        if (t !== a)
          return f("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), il[t] = !0, !0;
      }
      if (WS.test(t)) {
        var r = t.toLowerCase(), i = Km.hasOwnProperty(r) ? r : null;
        if (i == null)
          return il[t] = !0, !1;
        if (t !== i)
          return f("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), il[t] = !0, !0;
      }
    }
    return !0;
  }
  function XS(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = KS(e, a);
        r || n.push(a);
      }
      var i = n.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      n.length === 1 ? f("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && f("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function JS(e, t) {
    gi(e, t) || XS(e, t);
  }
  var Xm = !1;
  function ZS(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !Xm && (Xm = !0, e === "select" && t.multiple ? f("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : f("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var Jm = function() {
  };
  {
    var Cn = {}, Zm = /^on./, eN = /^on[^A-Z]/, tN = new RegExp("^(aria)-[" + K + "]*$"), nN = new RegExp("^(aria)[A-Z][" + K + "]*$");
    Jm = function(e, t, n, a) {
      if (Ln.call(Cn, t) && Cn[t])
        return !0;
      var r = t.toLowerCase();
      if (r === "onfocusin" || r === "onfocusout")
        return f("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Cn[t] = !0, !0;
      if (a != null) {
        var i = a.registrationNameDependencies, l = a.possibleRegistrationNames;
        if (i.hasOwnProperty(t))
          return !0;
        var o = l.hasOwnProperty(r) ? l[r] : null;
        if (o != null)
          return f("Invalid event handler property `%s`. Did you mean `%s`?", t, o), Cn[t] = !0, !0;
        if (Zm.test(t))
          return f("Unknown event handler property `%s`. It will be ignored.", t), Cn[t] = !0, !0;
      } else if (Zm.test(t))
        return eN.test(t) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Cn[t] = !0, !0;
      if (tN.test(t) || nN.test(t))
        return !0;
      if (r === "innerhtml")
        return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Cn[t] = !0, !0;
      if (r === "aria")
        return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Cn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Cn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Cn[t] = !0, !0;
      var u = gt(t), d = u !== null && u.type === Jt;
      if (ms.hasOwnProperty(r)) {
        var v = ms[r];
        if (v !== t)
          return f("Invalid DOM property `%s`. Did you mean `%s`?", t, v), Cn[t] = !0, !0;
      } else if (!d && t !== r)
        return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), Cn[t] = !0, !0;
      return typeof n == "boolean" && mt(t, n, u, !1) ? (n ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), Cn[t] = !0, !0) : d ? !0 : mt(t, n, u, !1) ? (Cn[t] = !0, !1) : ((n === "false" || n === "true") && u !== null && u.type === wt && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), Cn[t] = !0), !0);
    };
  }
  var aN = function(e, t, n) {
    {
      var a = [];
      for (var r in t) {
        var i = Jm(e, r, t[r], n);
        i || a.push(r);
      }
      var l = a.map(function(o) {
        return "`" + o + "`";
      }).join(", ");
      a.length === 1 ? f("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e) : a.length > 1 && f("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e);
    }
  };
  function rN(e, t, n) {
    gi(e, t) || aN(e, t, n);
  }
  var eh = 1, Mf = 2, So = 4, iN = eh | Mf | So, No = null;
  function lN(e) {
    No !== null && f("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), No = e;
  }
  function oN() {
    No === null && f("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), No = null;
  }
  function uN(e) {
    return e === No;
  }
  function Af(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === ur ? t.parentNode : t;
  }
  var Vf = null, ll = null, ol = null;
  function th(e) {
    var t = Pr(e);
    if (t) {
      if (typeof Vf != "function")
        throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
      var n = t.stateNode;
      if (n) {
        var a = Xs(n);
        Vf(t.stateNode, t.type, a);
      }
    }
  }
  function sN(e) {
    Vf = e;
  }
  function nh(e) {
    ll ? ol ? ol.push(e) : ol = [e] : ll = e;
  }
  function cN() {
    return ll !== null || ol !== null;
  }
  function ah() {
    if (ll) {
      var e = ll, t = ol;
      if (ll = null, ol = null, th(e), t)
        for (var n = 0; n < t.length; n++)
          th(t[n]);
    }
  }
  var rh = function(e, t) {
    return e(t);
  }, ih = function() {
  }, Uf = !1;
  function fN() {
    var e = cN();
    e && (ih(), ah());
  }
  function lh(e, t, n) {
    if (Uf)
      return e(t, n);
    Uf = !0;
    try {
      return rh(e, t, n);
    } finally {
      Uf = !1, fN();
    }
  }
  function dN(e, t, n) {
    rh = e, ih = n;
  }
  function pN(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function vN(e, t, n) {
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
        return !!(n.disabled && pN(t));
      default:
        return !1;
    }
  }
  function xo(e, t) {
    var n = e.stateNode;
    if (n === null)
      return null;
    var a = Xs(n);
    if (a === null)
      return null;
    var r = a[t];
    if (vN(t, e.type, a))
      return null;
    if (r && typeof r != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
    return r;
  }
  var kf = !1;
  if (Xt)
    try {
      var Ro = {};
      Object.defineProperty(Ro, "passive", {
        get: function() {
          kf = !0;
        }
      }), window.addEventListener("test", Ro, Ro), window.removeEventListener("test", Ro, Ro);
    } catch {
      kf = !1;
    }
  function oh(e, t, n, a, r, i, l, o, u) {
    var d = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, d);
    } catch (v) {
      this.onError(v);
    }
  }
  var uh = oh;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var zf = document.createElement("react");
    uh = function(t, n, a, r, i, l, o, u, d) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var v = document.createEvent("Event"), N = !1, S = !0, j = window.event, O = Object.getOwnPropertyDescriptor(window, "event");
      function V() {
        zf.removeEventListener(U, ve, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = j);
      }
      var J = Array.prototype.slice.call(arguments, 3);
      function ve() {
        N = !0, V(), n.apply(a, J), S = !1;
      }
      var fe, ze = !1, Me = !1;
      function C(T) {
        if (fe = T.error, ze = !0, fe === null && T.colno === 0 && T.lineno === 0 && (Me = !0), T.defaultPrevented && fe != null && typeof fe == "object")
          try {
            fe._suppressLogging = !0;
          } catch {
          }
      }
      var U = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", C), zf.addEventListener(U, ve, !1), v.initEvent(U, !1, !1), zf.dispatchEvent(v), O && Object.defineProperty(window, "event", O), N && S && (ze ? Me && (fe = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : fe = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(fe)), window.removeEventListener("error", C), !N)
        return V(), oh.apply(this, arguments);
    };
  }
  var mN = uh, ul = !1, hs = null, ys = !1, Ff = null, hN = {
    onError: function(e) {
      ul = !0, hs = e;
    }
  };
  function Hf(e, t, n, a, r, i, l, o, u) {
    ul = !1, hs = null, mN.apply(hN, arguments);
  }
  function yN(e, t, n, a, r, i, l, o, u) {
    if (Hf.apply(this, arguments), ul) {
      var d = Bf();
      ys || (ys = !0, Ff = d);
    }
  }
  function gN() {
    if (ys) {
      var e = Ff;
      throw ys = !1, Ff = null, e;
    }
  }
  function bN() {
    return ul;
  }
  function Bf() {
    if (ul) {
      var e = hs;
      return ul = !1, hs = null, e;
    } else
      throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
  }
  function sl(e) {
    return e._reactInternals;
  }
  function EN(e) {
    return e._reactInternals !== void 0;
  }
  function SN(e, t) {
    e._reactInternals = t;
  }
  var ge = (
    /*                      */
    0
  ), cl = (
    /*                */
    1
  ), Ct = (
    /*                    */
    2
  ), Ye = (
    /*                       */
    4
  ), bi = (
    /*                */
    16
  ), Co = (
    /*                 */
    32
  ), sh = (
    /*                     */
    64
  ), Ie = (
    /*                   */
    128
  ), cr = (
    /*            */
    256
  ), Ei = (
    /*                          */
    512
  ), fl = (
    /*                     */
    1024
  ), Ar = (
    /*                      */
    2048
  ), fr = (
    /*                    */
    4096
  ), Si = (
    /*                   */
    8192
  ), Pf = (
    /*             */
    16384
  ), NN = (
    /*               */
    32767
  ), gs = (
    /*                   */
    32768
  ), Tn = (
    /*                */
    65536
  ), $f = (
    /* */
    131072
  ), ch = (
    /*                       */
    1048576
  ), Yf = (
    /*                    */
    2097152
  ), Ni = (
    /*                 */
    4194304
  ), If = (
    /*                */
    8388608
  ), Vr = (
    /*               */
    16777216
  ), qf = (
    /*              */
    33554432
  ), Gf = (
    // TODO: Remove Update flag from before mutation phase by re-landing Visibility
    // flag logic (see #20043)
    Ye | fl | 0
  ), Wf = Ct | Ye | bi | Co | Ei | fr | Si, To = Ye | sh | Ei | Si, dl = Ar | bi, dr = Ni | If | Yf, xN = h.ReactCurrentOwner;
  function xi(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (Ct | fr)) !== ge && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === R ? n : null;
  }
  function fh(e) {
    if (e.tag === te) {
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
  function dh(e) {
    return e.tag === R ? e.stateNode.containerInfo : null;
  }
  function RN(e) {
    return xi(e) === e;
  }
  function CN(e) {
    {
      var t = xN.current;
      if (t !== null && t.tag === x) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || f("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Te(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = sl(e);
    return r ? xi(r) === r : !1;
  }
  function ph(e) {
    if (xi(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function vh(e) {
    var t = e.alternate;
    if (!t) {
      var n = xi(e);
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
        for (var u = i.child; u; ) {
          if (u === a)
            return ph(i), e;
          if (u === r)
            return ph(i), t;
          u = u.sibling;
        }
        throw new Error("Unable to find node on an unmounted component.");
      }
      if (a.return !== r.return)
        a = i, r = l;
      else {
        for (var d = !1, v = i.child; v; ) {
          if (v === a) {
            d = !0, a = i, r = l;
            break;
          }
          if (v === r) {
            d = !0, r = i, a = l;
            break;
          }
          v = v.sibling;
        }
        if (!d) {
          for (v = l.child; v; ) {
            if (v === a) {
              d = !0, a = l, r = i;
              break;
            }
            if (v === r) {
              d = !0, r = l, a = i;
              break;
            }
            v = v.sibling;
          }
          if (!d)
            throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
        }
      }
      if (a.alternate !== r)
        throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
    }
    if (a.tag !== R)
      throw new Error("Unable to find node on an unmounted component.");
    return a.stateNode.current === a ? e : t;
  }
  function mh(e) {
    var t = vh(e);
    return t !== null ? hh(t) : null;
  }
  function hh(e) {
    if (e.tag === Y || e.tag === Z)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = hh(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function TN(e) {
    var t = vh(e);
    return t !== null ? yh(t) : null;
  }
  function yh(e) {
    if (e.tag === Y || e.tag === Z)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== H) {
        var n = yh(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var gh = p.unstable_scheduleCallback, DN = p.unstable_cancelCallback, wN = p.unstable_shouldYield, jN = p.unstable_requestPaint, Yt = p.unstable_now, _N = p.unstable_getCurrentPriorityLevel, bs = p.unstable_ImmediatePriority, Qf = p.unstable_UserBlockingPriority, Ri = p.unstable_NormalPriority, ON = p.unstable_LowPriority, Kf = p.unstable_IdlePriority, LN = p.unstable_yieldValue, MN = p.unstable_setDisableYieldValue, pl = null, pn = null, ne = null, Ba = !1, Sa = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function AN(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      pa && (e = Oe({}, e, {
        getLaneLabelMap: HN,
        injectProfilingHooks: FN
      })), pl = t.inject(e), pn = t;
    } catch (n) {
      f("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function VN(e, t) {
    if (pn && typeof pn.onScheduleFiberRoot == "function")
      try {
        pn.onScheduleFiberRoot(pl, e, t);
      } catch (n) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", n));
      }
  }
  function UN(e, t) {
    if (pn && typeof pn.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & Ie) === Ie;
        if (bn) {
          var a;
          switch (t) {
            case qn:
              a = bs;
              break;
            case vr:
              a = Qf;
              break;
            case mr:
              a = Ri;
              break;
            case Ts:
              a = Kf;
              break;
            default:
              a = Ri;
              break;
          }
          pn.onCommitFiberRoot(pl, e, a, n);
        }
      } catch (r) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", r));
      }
  }
  function kN(e) {
    if (pn && typeof pn.onPostCommitFiberRoot == "function")
      try {
        pn.onPostCommitFiberRoot(pl, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function zN(e) {
    if (pn && typeof pn.onCommitFiberUnmount == "function")
      try {
        pn.onCommitFiberUnmount(pl, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function It(e) {
    if (typeof LN == "function" && (MN(e), E(e)), pn && typeof pn.setStrictMode == "function")
      try {
        pn.setStrictMode(pl, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function FN(e) {
    ne = e;
  }
  function HN() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < Jf; n++) {
        var a = lx(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function BN(e) {
    ne !== null && typeof ne.markCommitStarted == "function" && ne.markCommitStarted(e);
  }
  function bh() {
    ne !== null && typeof ne.markCommitStopped == "function" && ne.markCommitStopped();
  }
  function Do(e) {
    ne !== null && typeof ne.markComponentRenderStarted == "function" && ne.markComponentRenderStarted(e);
  }
  function vl() {
    ne !== null && typeof ne.markComponentRenderStopped == "function" && ne.markComponentRenderStopped();
  }
  function PN(e) {
    ne !== null && typeof ne.markComponentPassiveEffectMountStarted == "function" && ne.markComponentPassiveEffectMountStarted(e);
  }
  function $N() {
    ne !== null && typeof ne.markComponentPassiveEffectMountStopped == "function" && ne.markComponentPassiveEffectMountStopped();
  }
  function YN(e) {
    ne !== null && typeof ne.markComponentPassiveEffectUnmountStarted == "function" && ne.markComponentPassiveEffectUnmountStarted(e);
  }
  function IN() {
    ne !== null && typeof ne.markComponentPassiveEffectUnmountStopped == "function" && ne.markComponentPassiveEffectUnmountStopped();
  }
  function qN(e) {
    ne !== null && typeof ne.markComponentLayoutEffectMountStarted == "function" && ne.markComponentLayoutEffectMountStarted(e);
  }
  function GN() {
    ne !== null && typeof ne.markComponentLayoutEffectMountStopped == "function" && ne.markComponentLayoutEffectMountStopped();
  }
  function Eh(e) {
    ne !== null && typeof ne.markComponentLayoutEffectUnmountStarted == "function" && ne.markComponentLayoutEffectUnmountStarted(e);
  }
  function Sh() {
    ne !== null && typeof ne.markComponentLayoutEffectUnmountStopped == "function" && ne.markComponentLayoutEffectUnmountStopped();
  }
  function WN(e, t, n) {
    ne !== null && typeof ne.markComponentErrored == "function" && ne.markComponentErrored(e, t, n);
  }
  function QN(e, t, n) {
    ne !== null && typeof ne.markComponentSuspended == "function" && ne.markComponentSuspended(e, t, n);
  }
  function KN(e) {
    ne !== null && typeof ne.markLayoutEffectsStarted == "function" && ne.markLayoutEffectsStarted(e);
  }
  function XN() {
    ne !== null && typeof ne.markLayoutEffectsStopped == "function" && ne.markLayoutEffectsStopped();
  }
  function JN(e) {
    ne !== null && typeof ne.markPassiveEffectsStarted == "function" && ne.markPassiveEffectsStarted(e);
  }
  function ZN() {
    ne !== null && typeof ne.markPassiveEffectsStopped == "function" && ne.markPassiveEffectsStopped();
  }
  function Nh(e) {
    ne !== null && typeof ne.markRenderStarted == "function" && ne.markRenderStarted(e);
  }
  function ex() {
    ne !== null && typeof ne.markRenderYielded == "function" && ne.markRenderYielded();
  }
  function xh() {
    ne !== null && typeof ne.markRenderStopped == "function" && ne.markRenderStopped();
  }
  function tx(e) {
    ne !== null && typeof ne.markRenderScheduled == "function" && ne.markRenderScheduled(e);
  }
  function nx(e, t) {
    ne !== null && typeof ne.markForceUpdateScheduled == "function" && ne.markForceUpdateScheduled(e, t);
  }
  function Xf(e, t) {
    ne !== null && typeof ne.markStateUpdateScheduled == "function" && ne.markStateUpdateScheduled(e, t);
  }
  var he = (
    /*                         */
    0
  ), Ue = (
    /*                 */
    1
  ), Ke = (
    /*                    */
    2
  ), Et = (
    /*               */
    8
  ), Pa = (
    /*              */
    16
  ), Rh = Math.clz32 ? Math.clz32 : ix, ax = Math.log, rx = Math.LN2;
  function ix(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (ax(t) / rx | 0) | 0;
  }
  var Jf = 31, B = (
    /*                        */
    0
  ), qt = (
    /*                          */
    0
  ), Se = (
    /*                        */
    1
  ), ml = (
    /*    */
    2
  ), pr = (
    /*             */
    4
  ), Ci = (
    /*            */
    8
  ), $a = (
    /*                     */
    16
  ), wo = (
    /*                */
    32
  ), hl = (
    /*                       */
    4194240
  ), jo = (
    /*                        */
    64
  ), Zf = (
    /*                        */
    128
  ), ed = (
    /*                        */
    256
  ), td = (
    /*                        */
    512
  ), nd = (
    /*                        */
    1024
  ), ad = (
    /*                        */
    2048
  ), rd = (
    /*                        */
    4096
  ), id = (
    /*                        */
    8192
  ), ld = (
    /*                        */
    16384
  ), od = (
    /*                       */
    32768
  ), ud = (
    /*                       */
    65536
  ), sd = (
    /*                       */
    131072
  ), cd = (
    /*                       */
    262144
  ), fd = (
    /*                       */
    524288
  ), dd = (
    /*                       */
    1048576
  ), pd = (
    /*                       */
    2097152
  ), Es = (
    /*                            */
    130023424
  ), yl = (
    /*                             */
    4194304
  ), vd = (
    /*                             */
    8388608
  ), md = (
    /*                             */
    16777216
  ), hd = (
    /*                             */
    33554432
  ), yd = (
    /*                             */
    67108864
  ), Ch = yl, _o = (
    /*          */
    134217728
  ), Th = (
    /*                          */
    268435455
  ), Oo = (
    /*               */
    268435456
  ), Ti = (
    /*                        */
    536870912
  ), Yn = (
    /*                   */
    1073741824
  );
  function lx(e) {
    {
      if (e & Se)
        return "Sync";
      if (e & ml)
        return "InputContinuousHydration";
      if (e & pr)
        return "InputContinuous";
      if (e & Ci)
        return "DefaultHydration";
      if (e & $a)
        return "Default";
      if (e & wo)
        return "TransitionHydration";
      if (e & hl)
        return "Transition";
      if (e & Es)
        return "Retry";
      if (e & _o)
        return "SelectiveHydration";
      if (e & Oo)
        return "IdleHydration";
      if (e & Ti)
        return "Idle";
      if (e & Yn)
        return "Offscreen";
    }
  }
  var it = -1, Ss = jo, Ns = yl;
  function Lo(e) {
    switch (Di(e)) {
      case Se:
        return Se;
      case ml:
        return ml;
      case pr:
        return pr;
      case Ci:
        return Ci;
      case $a:
        return $a;
      case wo:
        return wo;
      case jo:
      case Zf:
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
        return e & hl;
      case yl:
      case vd:
      case md:
      case hd:
      case yd:
        return e & Es;
      case _o:
        return _o;
      case Oo:
        return Oo;
      case Ti:
        return Ti;
      case Yn:
        return Yn;
      default:
        return f("Should have found matching lanes. This is a bug in React."), e;
    }
  }
  function xs(e, t) {
    var n = e.pendingLanes;
    if (n === B)
      return B;
    var a = B, r = e.suspendedLanes, i = e.pingedLanes, l = n & Th;
    if (l !== B) {
      var o = l & ~r;
      if (o !== B)
        a = Lo(o);
      else {
        var u = l & i;
        u !== B && (a = Lo(u));
      }
    } else {
      var d = n & ~r;
      d !== B ? a = Lo(d) : i !== B && (a = Lo(i));
    }
    if (a === B)
      return B;
    if (t !== B && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === B) {
      var v = Di(a), N = Di(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        v >= N || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        v === $a && (N & hl) !== B
      )
        return t;
    }
    (a & pr) !== B && (a |= n & $a);
    var S = e.entangledLanes;
    if (S !== B)
      for (var j = e.entanglements, O = a & S; O > 0; ) {
        var V = wi(O), J = 1 << V;
        a |= j[V], O &= ~J;
      }
    return a;
  }
  function ox(e, t) {
    for (var n = e.eventTimes, a = it; t > 0; ) {
      var r = wi(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function ux(e, t) {
    switch (e) {
      case Se:
      case ml:
      case pr:
        return t + 250;
      case Ci:
      case $a:
      case wo:
      case jo:
      case Zf:
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
        return t + 5e3;
      case yl:
      case vd:
      case md:
      case hd:
      case yd:
        return it;
      case _o:
      case Oo:
      case Ti:
      case Yn:
        return it;
      default:
        return f("Should have found matching lanes. This is a bug in React."), it;
    }
  }
  function sx(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = wi(l), u = 1 << o, d = i[o];
      d === it ? ((u & a) === B || (u & r) !== B) && (i[o] = ux(u, t)) : d <= t && (e.expiredLanes |= u), l &= ~u;
    }
  }
  function cx(e) {
    return Lo(e.pendingLanes);
  }
  function gd(e) {
    var t = e.pendingLanes & ~Yn;
    return t !== B ? t : t & Yn ? Yn : B;
  }
  function fx(e) {
    return (e & Se) !== B;
  }
  function bd(e) {
    return (e & Th) !== B;
  }
  function Dh(e) {
    return (e & Es) === e;
  }
  function dx(e) {
    var t = Se | pr | $a;
    return (e & t) === B;
  }
  function px(e) {
    return (e & hl) === e;
  }
  function Rs(e, t) {
    var n = ml | pr | Ci | $a;
    return (t & n) !== B;
  }
  function vx(e, t) {
    return (t & e.expiredLanes) !== B;
  }
  function wh(e) {
    return (e & hl) !== B;
  }
  function jh() {
    var e = Ss;
    return Ss <<= 1, (Ss & hl) === B && (Ss = jo), e;
  }
  function mx() {
    var e = Ns;
    return Ns <<= 1, (Ns & Es) === B && (Ns = yl), e;
  }
  function Di(e) {
    return e & -e;
  }
  function Mo(e) {
    return Di(e);
  }
  function wi(e) {
    return 31 - Rh(e);
  }
  function Ed(e) {
    return wi(e);
  }
  function In(e, t) {
    return (e & t) !== B;
  }
  function gl(e, t) {
    return (e & t) === t;
  }
  function we(e, t) {
    return e | t;
  }
  function Cs(e, t) {
    return e & ~t;
  }
  function _h(e, t) {
    return e & t;
  }
  function h1(e) {
    return e;
  }
  function hx(e, t) {
    return e !== qt && e < t ? e : t;
  }
  function Sd(e) {
    for (var t = [], n = 0; n < Jf; n++)
      t.push(e);
    return t;
  }
  function Ao(e, t, n) {
    e.pendingLanes |= t, t !== Ti && (e.suspendedLanes = B, e.pingedLanes = B);
    var a = e.eventTimes, r = Ed(t);
    a[r] = n;
  }
  function yx(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = wi(a), i = 1 << r;
      n[r] = it, a &= ~i;
    }
  }
  function Oh(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function gx(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = B, e.pingedLanes = B, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = wi(l), u = 1 << o;
      a[o] = B, r[o] = it, i[o] = it, l &= ~u;
    }
  }
  function Nd(e, t) {
    for (var n = e.entangledLanes |= t, a = e.entanglements, r = n; r; ) {
      var i = wi(r), l = 1 << i;
      // Is this one of the newly entangled lanes?
      l & t | // Is this lane transitively entangled with the newly entangled lanes?
      a[i] & t && (a[i] |= t), r &= ~l;
    }
  }
  function bx(e, t) {
    var n = Di(t), a;
    switch (n) {
      case pr:
        a = ml;
        break;
      case $a:
        a = Ci;
        break;
      case jo:
      case Zf:
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
      case yl:
      case vd:
      case md:
      case hd:
      case yd:
        a = wo;
        break;
      case Ti:
        a = Oo;
        break;
      default:
        a = qt;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== qt ? qt : a;
  }
  function Lh(e, t, n) {
    if (Sa)
      for (var a = e.pendingUpdatersLaneMap; n > 0; ) {
        var r = Ed(n), i = 1 << r, l = a[r];
        l.add(t), n &= ~i;
      }
  }
  function Mh(e, t) {
    if (Sa)
      for (var n = e.pendingUpdatersLaneMap, a = e.memoizedUpdaters; t > 0; ) {
        var r = Ed(t), i = 1 << r, l = n[r];
        l.size > 0 && (l.forEach(function(o) {
          var u = o.alternate;
          (u === null || !a.has(u)) && a.add(o);
        }), l.clear()), t &= ~i;
      }
  }
  function Ah(e, t) {
    return null;
  }
  var qn = Se, vr = pr, mr = $a, Ts = Ti, Vo = qt;
  function Na() {
    return Vo;
  }
  function Gt(e) {
    Vo = e;
  }
  function Ex(e, t) {
    var n = Vo;
    try {
      return Vo = e, t();
    } finally {
      Vo = n;
    }
  }
  function Sx(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function Nx(e, t) {
    return e > t ? e : t;
  }
  function xd(e, t) {
    return e !== 0 && e < t;
  }
  function Vh(e) {
    var t = Di(e);
    return xd(qn, t) ? xd(vr, t) ? bd(t) ? mr : Ts : vr : qn;
  }
  function Ds(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var Uh;
  function xx(e) {
    Uh = e;
  }
  function Rx(e) {
    Uh(e);
  }
  var Rd;
  function Cx(e) {
    Rd = e;
  }
  var kh;
  function Tx(e) {
    kh = e;
  }
  var zh;
  function Dx(e) {
    zh = e;
  }
  var Fh;
  function wx(e) {
    Fh = e;
  }
  var Cd = !1, ws = [], Ur = null, kr = null, zr = null, Uo = /* @__PURE__ */ new Map(), ko = /* @__PURE__ */ new Map(), Fr = [], jx = [
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
  function _x(e) {
    return jx.indexOf(e) > -1;
  }
  function Ox(e, t, n, a, r) {
    return {
      blockedOn: e,
      domEventName: t,
      eventSystemFlags: n,
      nativeEvent: r,
      targetContainers: [a]
    };
  }
  function Hh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ur = null;
        break;
      case "dragenter":
      case "dragleave":
        kr = null;
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
        ko.delete(a);
        break;
      }
    }
  }
  function zo(e, t, n, a, r, i) {
    if (e === null || e.nativeEvent !== i) {
      var l = Ox(t, n, a, r, i);
      if (t !== null) {
        var o = Pr(t);
        o !== null && Rd(o);
      }
      return l;
    }
    e.eventSystemFlags |= a;
    var u = e.targetContainers;
    return r !== null && u.indexOf(r) === -1 && u.push(r), e;
  }
  function Lx(e, t, n, a, r) {
    switch (t) {
      case "focusin": {
        var i = r;
        return Ur = zo(Ur, e, t, n, a, i), !0;
      }
      case "dragenter": {
        var l = r;
        return kr = zo(kr, e, t, n, a, l), !0;
      }
      case "mouseover": {
        var o = r;
        return zr = zo(zr, e, t, n, a, o), !0;
      }
      case "pointerover": {
        var u = r, d = u.pointerId;
        return Uo.set(d, zo(Uo.get(d) || null, e, t, n, a, u)), !0;
      }
      case "gotpointercapture": {
        var v = r, N = v.pointerId;
        return ko.set(N, zo(ko.get(N) || null, e, t, n, a, v)), !0;
      }
    }
    return !1;
  }
  function Bh(e) {
    var t = Oi(e.target);
    if (t !== null) {
      var n = xi(t);
      if (n !== null) {
        var a = n.tag;
        if (a === te) {
          var r = fh(n);
          if (r !== null) {
            e.blockedOn = r, Fh(e.priority, function() {
              kh(n);
            });
            return;
          }
        } else if (a === R) {
          var i = n.stateNode;
          if (Ds(i)) {
            e.blockedOn = dh(n);
            return;
          }
        }
      }
    }
    e.blockedOn = null;
  }
  function Mx(e) {
    for (var t = zh(), n = {
      blockedOn: null,
      target: e,
      priority: t
    }, a = 0; a < Fr.length && xd(t, Fr[a].priority); a++)
      ;
    Fr.splice(a, 0, n), a === 0 && Bh(n);
  }
  function js(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = wd(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
      if (a === null) {
        var r = e.nativeEvent, i = new r.constructor(r.type, r);
        lN(i), r.target.dispatchEvent(i), oN();
      } else {
        var l = Pr(a);
        return l !== null && Rd(l), e.blockedOn = a, !1;
      }
      t.shift();
    }
    return !0;
  }
  function Ph(e, t, n) {
    js(e) && n.delete(t);
  }
  function Ax() {
    Cd = !1, Ur !== null && js(Ur) && (Ur = null), kr !== null && js(kr) && (kr = null), zr !== null && js(zr) && (zr = null), Uo.forEach(Ph), ko.forEach(Ph);
  }
  function Fo(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Cd || (Cd = !0, p.unstable_scheduleCallback(p.unstable_NormalPriority, Ax)));
  }
  function Ho(e) {
    if (ws.length > 0) {
      Fo(ws[0], e);
      for (var t = 1; t < ws.length; t++) {
        var n = ws[t];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    Ur !== null && Fo(Ur, e), kr !== null && Fo(kr, e), zr !== null && Fo(zr, e);
    var a = function(o) {
      return Fo(o, e);
    };
    Uo.forEach(a), ko.forEach(a);
    for (var r = 0; r < Fr.length; r++) {
      var i = Fr[r];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; Fr.length > 0; ) {
      var l = Fr[0];
      if (l.blockedOn !== null)
        break;
      Bh(l), l.blockedOn === null && Fr.shift();
    }
  }
  var bl = h.ReactCurrentBatchConfig, Td = !0;
  function $h(e) {
    Td = !!e;
  }
  function Vx() {
    return Td;
  }
  function Ux(e, t, n) {
    var a = Yh(t), r;
    switch (a) {
      case qn:
        r = kx;
        break;
      case vr:
        r = zx;
        break;
      case mr:
      default:
        r = Dd;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function kx(e, t, n, a) {
    var r = Na(), i = bl.transition;
    bl.transition = null;
    try {
      Gt(qn), Dd(e, t, n, a);
    } finally {
      Gt(r), bl.transition = i;
    }
  }
  function zx(e, t, n, a) {
    var r = Na(), i = bl.transition;
    bl.transition = null;
    try {
      Gt(vr), Dd(e, t, n, a);
    } finally {
      Gt(r), bl.transition = i;
    }
  }
  function Dd(e, t, n, a) {
    Td && Fx(e, t, n, a);
  }
  function Fx(e, t, n, a) {
    var r = wd(e, t, n, a);
    if (r === null) {
      Pd(e, t, a, _s, n), Hh(e, a);
      return;
    }
    if (Lx(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if (Hh(e, a), t & So && _x(e)) {
      for (; r !== null; ) {
        var i = Pr(r);
        i !== null && Rx(i);
        var l = wd(e, t, n, a);
        if (l === null && Pd(e, t, a, _s, n), l === r)
          break;
        r = l;
      }
      r !== null && a.stopPropagation();
      return;
    }
    Pd(e, t, a, null, n);
  }
  var _s = null;
  function wd(e, t, n, a) {
    _s = null;
    var r = Af(a), i = Oi(r);
    if (i !== null) {
      var l = xi(i);
      if (l === null)
        i = null;
      else {
        var o = l.tag;
        if (o === te) {
          var u = fh(l);
          if (u !== null)
            return u;
          i = null;
        } else if (o === R) {
          var d = l.stateNode;
          if (Ds(d))
            return dh(l);
          i = null;
        } else l !== i && (i = null);
      }
    }
    return _s = i, null;
  }
  function Yh(e) {
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
        return qn;
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
        var t = _N();
        switch (t) {
          case bs:
            return qn;
          case Qf:
            return vr;
          case Ri:
          case ON:
            return mr;
          case Kf:
            return Ts;
          default:
            return mr;
        }
      }
      default:
        return mr;
    }
  }
  function Hx(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function Bx(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function Px(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function $x(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Bo = null, jd = null, Po = null;
  function Yx(e) {
    return Bo = e, jd = qh(), !0;
  }
  function Ix() {
    Bo = null, jd = null, Po = null;
  }
  function Ih() {
    if (Po)
      return Po;
    var e, t = jd, n = t.length, a, r = qh(), i = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++)
      ;
    var l = n - e;
    for (a = 1; a <= l && t[n - a] === r[i - a]; a++)
      ;
    var o = a > 1 ? 1 - a : void 0;
    return Po = r.slice(e, o), Po;
  }
  function qh() {
    return "value" in Bo ? Bo.value : Bo.textContent;
  }
  function Os(e) {
    var t, n = e.keyCode;
    return "charCode" in e ? (t = e.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
  }
  function Ls() {
    return !0;
  }
  function Gh() {
    return !1;
  }
  function Gn(e) {
    function t(n, a, r, i, l) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = i, this.target = l, this.currentTarget = null;
      for (var o in e)
        if (e.hasOwnProperty(o)) {
          var u = e[o];
          u ? this[o] = u(i) : this[o] = i[o];
        }
      var d = i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1;
      return d ? this.isDefaultPrevented = Ls : this.isDefaultPrevented = Gh, this.isPropagationStopped = Gh, this;
    }
    return Oe(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ls);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ls);
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
      isPersistent: Ls
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
  }, _d = Gn(El), $o = Oe({}, El, {
    view: 0,
    detail: 0
  }), qx = Gn($o), Od, Ld, Yo;
  function Gx(e) {
    e !== Yo && (Yo && e.type === "mousemove" ? (Od = e.screenX - Yo.screenX, Ld = e.screenY - Yo.screenY) : (Od = 0, Ld = 0), Yo = e);
  }
  var Ms = Oe({}, $o, {
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
    getModifierState: Ad,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (Gx(e), Od);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Ld;
    }
  }), Wh = Gn(Ms), Wx = Oe({}, Ms, {
    dataTransfer: 0
  }), Qx = Gn(Wx), Kx = Oe({}, $o, {
    relatedTarget: 0
  }), Md = Gn(Kx), Xx = Oe({}, El, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Jx = Gn(Xx), Zx = Oe({}, El, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), eR = Gn(Zx), tR = Oe({}, El, {
    data: 0
  }), Qh = Gn(tR), nR = Qh, aR = {
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
  }, rR = {
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
  function iR(e) {
    if (e.key) {
      var t = aR[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var n = Os(e);
      return n === 13 ? "Enter" : String.fromCharCode(n);
    }
    return e.type === "keydown" || e.type === "keyup" ? rR[e.keyCode] || "Unidentified" : "";
  }
  var lR = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function oR(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState)
      return n.getModifierState(e);
    var a = lR[e];
    return a ? !!n[a] : !1;
  }
  function Ad(e) {
    return oR;
  }
  var uR = Oe({}, $o, {
    key: iR,
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ad,
    // Legacy Interface
    charCode: function(e) {
      return e.type === "keypress" ? Os(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Os(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), sR = Gn(uR), cR = Oe({}, Ms, {
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
  }), Kh = Gn(cR), fR = Oe({}, $o, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ad
  }), dR = Gn(fR), pR = Oe({}, El, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), vR = Gn(pR), mR = Oe({}, Ms, {
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
  }), hR = Gn(mR), yR = [9, 13, 27, 32], Xh = 229, Vd = Xt && "CompositionEvent" in window, Io = null;
  Xt && "documentMode" in document && (Io = document.documentMode);
  var gR = Xt && "TextEvent" in window && !Io, Jh = Xt && (!Vd || Io && Io > 8 && Io <= 11), Zh = 32, ey = String.fromCharCode(Zh);
  function bR() {
    Qt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Qt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Qt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Qt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var ty = !1;
  function ER(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(e.ctrlKey && e.altKey);
  }
  function SR(e) {
    switch (e) {
      case "compositionstart":
        return "onCompositionStart";
      case "compositionend":
        return "onCompositionEnd";
      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  function NR(e, t) {
    return e === "keydown" && t.keyCode === Xh;
  }
  function ny(e, t) {
    switch (e) {
      case "keyup":
        return yR.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== Xh;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ay(e) {
    var t = e.detail;
    return typeof t == "object" && "data" in t ? t.data : null;
  }
  function ry(e) {
    return e.locale === "ko";
  }
  var Sl = !1;
  function xR(e, t, n, a, r) {
    var i, l;
    if (Vd ? i = SR(t) : Sl ? ny(t, a) && (i = "onCompositionEnd") : NR(t, a) && (i = "onCompositionStart"), !i)
      return null;
    Jh && !ry(a) && (!Sl && i === "onCompositionStart" ? Sl = Yx(r) : i === "onCompositionEnd" && Sl && (l = Ih()));
    var o = zs(n, i);
    if (o.length > 0) {
      var u = new Qh(i, t, null, a, r);
      if (e.push({
        event: u,
        listeners: o
      }), l)
        u.data = l;
      else {
        var d = ay(a);
        d !== null && (u.data = d);
      }
    }
  }
  function RR(e, t) {
    switch (e) {
      case "compositionend":
        return ay(t);
      case "keypress":
        var n = t.which;
        return n !== Zh ? null : (ty = !0, ey);
      case "textInput":
        var a = t.data;
        return a === ey && ty ? null : a;
      default:
        return null;
    }
  }
  function CR(e, t) {
    if (Sl) {
      if (e === "compositionend" || !Vd && ny(e, t)) {
        var n = Ih();
        return Ix(), Sl = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!ER(t)) {
          if (t.char && t.char.length > 1)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Jh && !ry(t) ? null : t.data;
      default:
        return null;
    }
  }
  function TR(e, t, n, a, r) {
    var i;
    if (gR ? i = RR(t, a) : i = CR(t, a), !i)
      return null;
    var l = zs(n, "onBeforeInput");
    if (l.length > 0) {
      var o = new nR("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: o,
        listeners: l
      }), o.data = i;
    }
  }
  function DR(e, t, n, a, r, i, l) {
    xR(e, t, n, a, r), TR(e, t, n, a, r);
  }
  var wR = {
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
  function iy(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!wR[e.type] : t === "textarea";
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
  function jR(e) {
    if (!Xt)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function _R() {
    Qt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function ly(e, t, n, a) {
    nh(a);
    var r = zs(t, "onChange");
    if (r.length > 0) {
      var i = new _d("onChange", "change", null, n, a);
      e.push({
        event: i,
        listeners: r
      });
    }
  }
  var qo = null, Go = null;
  function OR(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function LR(e) {
    var t = [];
    ly(t, Go, e, Af(e)), lh(MR, t);
  }
  function MR(e) {
    Ry(e, 0);
  }
  function As(e) {
    var t = Dl(e);
    if (mo(t))
      return e;
  }
  function AR(e, t) {
    if (e === "change")
      return t;
  }
  var oy = !1;
  Xt && (oy = jR("input") && (!document.documentMode || document.documentMode > 9));
  function VR(e, t) {
    qo = e, Go = t, qo.attachEvent("onpropertychange", sy);
  }
  function uy() {
    qo && (qo.detachEvent("onpropertychange", sy), qo = null, Go = null);
  }
  function sy(e) {
    e.propertyName === "value" && As(Go) && LR(e);
  }
  function UR(e, t, n) {
    e === "focusin" ? (uy(), VR(t, n)) : e === "focusout" && uy();
  }
  function kR(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return As(Go);
  }
  function zR(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function FR(e, t) {
    if (e === "click")
      return As(t);
  }
  function HR(e, t) {
    if (e === "input" || e === "change")
      return As(t);
  }
  function BR(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || ye(e, "number", e.value);
  }
  function PR(e, t, n, a, r, i, l) {
    var o = n ? Dl(n) : window, u, d;
    if (OR(o) ? u = AR : iy(o) ? oy ? u = HR : (u = kR, d = UR) : zR(o) && (u = FR), u) {
      var v = u(t, n);
      if (v) {
        ly(e, v, a, r);
        return;
      }
    }
    d && d(t, o, n), t === "focusout" && BR(o);
  }
  function $R() {
    Kt("onMouseEnter", ["mouseout", "mouseover"]), Kt("onMouseLeave", ["mouseout", "mouseover"]), Kt("onPointerEnter", ["pointerout", "pointerover"]), Kt("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function YR(e, t, n, a, r, i, l) {
    var o = t === "mouseover" || t === "pointerover", u = t === "mouseout" || t === "pointerout";
    if (o && !uN(a)) {
      var d = a.relatedTarget || a.fromElement;
      if (d && (Oi(d) || uu(d)))
        return;
    }
    if (!(!u && !o)) {
      var v;
      if (r.window === r)
        v = r;
      else {
        var N = r.ownerDocument;
        N ? v = N.defaultView || N.parentWindow : v = window;
      }
      var S, j;
      if (u) {
        var O = a.relatedTarget || a.toElement;
        if (S = n, j = O ? Oi(O) : null, j !== null) {
          var V = xi(j);
          (j !== V || j.tag !== Y && j.tag !== Z) && (j = null);
        }
      } else
        S = null, j = n;
      if (S !== j) {
        var J = Wh, ve = "onMouseLeave", fe = "onMouseEnter", ze = "mouse";
        (t === "pointerout" || t === "pointerover") && (J = Kh, ve = "onPointerLeave", fe = "onPointerEnter", ze = "pointer");
        var Me = S == null ? v : Dl(S), C = j == null ? v : Dl(j), U = new J(ve, ze + "leave", S, a, r);
        U.target = Me, U.relatedTarget = C;
        var T = null, $ = Oi(r);
        if ($ === n) {
          var re = new J(fe, ze + "enter", j, a, r);
          re.target = C, re.relatedTarget = Me, T = re;
        }
        vC(e, U, T, S, j);
      }
    }
  }
  function IR(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Wn = typeof Object.is == "function" ? Object.is : IR;
  function Wo(e, t) {
    if (Wn(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length)
      return !1;
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      if (!Ln.call(t, i) || !Wn(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function cy(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function qR(e) {
    for (; e; ) {
      if (e.nextSibling)
        return e.nextSibling;
      e = e.parentNode;
    }
  }
  function fy(e, t) {
    for (var n = cy(e), a = 0, r = 0; n; ) {
      if (n.nodeType === ur) {
        if (r = a + n.textContent.length, a <= t && r >= t)
          return {
            node: n,
            offset: t - a
          };
        a = r;
      }
      n = cy(qR(n));
    }
  }
  function GR(e) {
    var t = e.ownerDocument, n = t && t.defaultView || window, a = n.getSelection && n.getSelection();
    if (!a || a.rangeCount === 0)
      return null;
    var r = a.anchorNode, i = a.anchorOffset, l = a.focusNode, o = a.focusOffset;
    try {
      r.nodeType, l.nodeType;
    } catch {
      return null;
    }
    return WR(e, r, i, l, o);
  }
  function WR(e, t, n, a, r) {
    var i = 0, l = -1, o = -1, u = 0, d = 0, v = e, N = null;
    e: for (; ; ) {
      for (var S = null; v === t && (n === 0 || v.nodeType === ur) && (l = i + n), v === a && (r === 0 || v.nodeType === ur) && (o = i + r), v.nodeType === ur && (i += v.nodeValue.length), (S = v.firstChild) !== null; )
        N = v, v = S;
      for (; ; ) {
        if (v === e)
          break e;
        if (N === t && ++u === n && (l = i), N === a && ++d === r && (o = i), (S = v.nextSibling) !== null)
          break;
        v = N, N = v.parentNode;
      }
      v = S;
    }
    return l === -1 || o === -1 ? null : {
      start: l,
      end: o
    };
  }
  function QR(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, l = Math.min(t.start, i), o = t.end === void 0 ? l : Math.min(t.end, i);
      if (!r.extend && l > o) {
        var u = o;
        o = l, l = u;
      }
      var d = fy(e, l), v = fy(e, o);
      if (d && v) {
        if (r.rangeCount === 1 && r.anchorNode === d.node && r.anchorOffset === d.offset && r.focusNode === v.node && r.focusOffset === v.offset)
          return;
        var N = n.createRange();
        N.setStart(d.node, d.offset), r.removeAllRanges(), l > o ? (r.addRange(N), r.extend(v.node, v.offset)) : (N.setEnd(v.node, v.offset), r.addRange(N));
      }
    }
  }
  function dy(e) {
    return e && e.nodeType === ur;
  }
  function py(e, t) {
    return !e || !t ? !1 : e === t ? !0 : dy(e) ? !1 : dy(t) ? py(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function KR(e) {
    return e && e.ownerDocument && py(e.ownerDocument.documentElement, e);
  }
  function XR(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function vy() {
    for (var e = window, t = ir(); t instanceof e.HTMLIFrameElement; ) {
      if (XR(t))
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
  function JR() {
    var e = vy();
    return {
      focusedElem: e,
      selectionRange: Ud(e) ? eC(e) : null
    };
  }
  function ZR(e) {
    var t = vy(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && KR(n)) {
      a !== null && Ud(n) && tC(n, a);
      for (var r = [], i = n; i = i.parentNode; )
        i.nodeType === Vn && r.push({
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
  function eC(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = GR(e), t || {
      start: 0,
      end: 0
    };
  }
  function tC(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : QR(e, t);
  }
  var nC = Xt && "documentMode" in document && document.documentMode <= 11;
  function aC() {
    Qt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var Nl = null, kd = null, Qo = null, zd = !1;
  function rC(e) {
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
  function iC(e) {
    return e.window === e ? e.document : e.nodeType === sr ? e : e.ownerDocument;
  }
  function my(e, t, n) {
    var a = iC(n);
    if (!(zd || Nl == null || Nl !== ir(a))) {
      var r = rC(Nl);
      if (!Qo || !Wo(Qo, r)) {
        Qo = r;
        var i = zs(kd, "onSelect");
        if (i.length > 0) {
          var l = new _d("onSelect", "select", null, t, n);
          e.push({
            event: l,
            listeners: i
          }), l.target = Nl;
        }
      }
    }
  }
  function lC(e, t, n, a, r, i, l) {
    var o = n ? Dl(n) : window;
    switch (t) {
      case "focusin":
        (iy(o) || o.contentEditable === "true") && (Nl = o, kd = n, Qo = null);
        break;
      case "focusout":
        Nl = null, kd = null, Qo = null;
        break;
      case "mousedown":
        zd = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        zd = !1, my(e, a, r);
        break;
      case "selectionchange":
        if (nC)
          break;
      case "keydown":
      case "keyup":
        my(e, a, r);
    }
  }
  function Vs(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var xl = {
    animationend: Vs("Animation", "AnimationEnd"),
    animationiteration: Vs("Animation", "AnimationIteration"),
    animationstart: Vs("Animation", "AnimationStart"),
    transitionend: Vs("Transition", "TransitionEnd")
  }, Fd = {}, hy = {};
  Xt && (hy = document.createElement("div").style, "AnimationEvent" in window || (delete xl.animationend.animation, delete xl.animationiteration.animation, delete xl.animationstart.animation), "TransitionEvent" in window || delete xl.transitionend.transition);
  function Us(e) {
    if (Fd[e])
      return Fd[e];
    if (!xl[e])
      return e;
    var t = xl[e];
    for (var n in t)
      if (t.hasOwnProperty(n) && n in hy)
        return Fd[e] = t[n];
    return e;
  }
  var yy = Us("animationend"), gy = Us("animationiteration"), by = Us("animationstart"), Ey = Us("transitionend"), Sy = /* @__PURE__ */ new Map(), Ny = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function Hr(e, t) {
    Sy.set(e, t), Qt(t, [e]);
  }
  function oC() {
    for (var e = 0; e < Ny.length; e++) {
      var t = Ny[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Hr(n, "on" + a);
    }
    Hr(yy, "onAnimationEnd"), Hr(gy, "onAnimationIteration"), Hr(by, "onAnimationStart"), Hr("dblclick", "onDoubleClick"), Hr("focusin", "onFocus"), Hr("focusout", "onBlur"), Hr(Ey, "onTransitionEnd");
  }
  function uC(e, t, n, a, r, i, l) {
    var o = Sy.get(t);
    if (o !== void 0) {
      var u = _d, d = t;
      switch (t) {
        case "keypress":
          if (Os(a) === 0)
            return;
        case "keydown":
        case "keyup":
          u = sR;
          break;
        case "focusin":
          d = "focus", u = Md;
          break;
        case "focusout":
          d = "blur", u = Md;
          break;
        case "beforeblur":
        case "afterblur":
          u = Md;
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
          u = Wh;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          u = Qx;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          u = dR;
          break;
        case yy:
        case gy:
        case by:
          u = Jx;
          break;
        case Ey:
          u = vR;
          break;
        case "scroll":
          u = qx;
          break;
        case "wheel":
          u = hR;
          break;
        case "copy":
        case "cut":
        case "paste":
          u = eR;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          u = Kh;
          break;
      }
      var v = (i & So) !== 0;
      {
        var N = !v && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", S = dC(n, o, a.type, v, N);
        if (S.length > 0) {
          var j = new u(o, d, null, a, r);
          e.push({
            event: j,
            listeners: S
          });
        }
      }
    }
  }
  oC(), $R(), _R(), aC(), bR();
  function sC(e, t, n, a, r, i, l) {
    uC(e, t, n, a, r, i);
    var o = (i & iN) === 0;
    o && (YR(e, t, n, a, r), PR(e, t, n, a, r), lC(e, t, n, a, r), DR(e, t, n, a, r));
  }
  var Ko = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Hd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Ko));
  function xy(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, yN(a, t, void 0, e), e.currentTarget = null;
  }
  function cC(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, o = i.currentTarget, u = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        xy(e, u, o), a = l;
      }
    else
      for (var d = 0; d < t.length; d++) {
        var v = t[d], N = v.instance, S = v.currentTarget, j = v.listener;
        if (N !== a && e.isPropagationStopped())
          return;
        xy(e, j, S), a = N;
      }
  }
  function Ry(e, t) {
    for (var n = (t & So) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      cC(i, l, n);
    }
    gN();
  }
  function fC(e, t, n, a, r) {
    var i = Af(n), l = [];
    sC(l, e, a, n, i, t), Ry(l, t);
  }
  function st(e, t) {
    Hd.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = B0(t), r = mC(e);
    a.has(r) || (Cy(t, e, Mf, n), a.add(r));
  }
  function Bd(e, t, n) {
    Hd.has(e) && !t && f('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= So), Cy(n, e, a, t);
  }
  var ks = "_reactListening" + Math.random().toString(36).slice(2);
  function Xo(e) {
    if (!e[ks]) {
      e[ks] = !0, Ua.forEach(function(n) {
        n !== "selectionchange" && (Hd.has(n) || Bd(n, !1, e), Bd(n, !0, e));
      });
      var t = e.nodeType === sr ? e : e.ownerDocument;
      t !== null && (t[ks] || (t[ks] = !0, Bd("selectionchange", !1, t)));
    }
  }
  function Cy(e, t, n, a, r) {
    var i = Ux(e, t, n), l = void 0;
    kf && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? Px(e, t, i, l) : Bx(e, t, i) : l !== void 0 ? $x(e, t, i, l) : Hx(e, t, i);
  }
  function Ty(e, t) {
    return e === t || e.nodeType === Rt && e.parentNode === t;
  }
  function Pd(e, t, n, a, r) {
    var i = a;
    if (!(t & eh) && !(t & Mf)) {
      var l = r;
      if (a !== null) {
        var o = a;
        e: for (; ; ) {
          if (o === null)
            return;
          var u = o.tag;
          if (u === R || u === H) {
            var d = o.stateNode.containerInfo;
            if (Ty(d, l))
              break;
            if (u === H)
              for (var v = o.return; v !== null; ) {
                var N = v.tag;
                if (N === R || N === H) {
                  var S = v.stateNode.containerInfo;
                  if (Ty(S, l))
                    return;
                }
                v = v.return;
              }
            for (; d !== null; ) {
              var j = Oi(d);
              if (j === null)
                return;
              var O = j.tag;
              if (O === Y || O === Z) {
                o = i = j;
                continue e;
              }
              d = d.parentNode;
            }
          }
          o = o.return;
        }
      }
    }
    lh(function() {
      return fC(e, t, n, i);
    });
  }
  function Jo(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function dC(e, t, n, a, r, i) {
    for (var l = t !== null ? t + "Capture" : null, o = a ? l : t, u = [], d = e, v = null; d !== null; ) {
      var N = d, S = N.stateNode, j = N.tag;
      if (j === Y && S !== null && (v = S, o !== null)) {
        var O = xo(d, o);
        O != null && u.push(Jo(d, O, v));
      }
      if (r)
        break;
      d = d.return;
    }
    return u;
  }
  function zs(e, t) {
    for (var n = t + "Capture", a = [], r = e; r !== null; ) {
      var i = r, l = i.stateNode, o = i.tag;
      if (o === Y && l !== null) {
        var u = l, d = xo(r, n);
        d != null && a.unshift(Jo(r, d, u));
        var v = xo(r, t);
        v != null && a.push(Jo(r, v, u));
      }
      r = r.return;
    }
    return a;
  }
  function Rl(e) {
    if (e === null)
      return null;
    do
      e = e.return;
    while (e && e.tag !== Y);
    return e || null;
  }
  function pC(e, t) {
    for (var n = e, a = t, r = 0, i = n; i; i = Rl(i))
      r++;
    for (var l = 0, o = a; o; o = Rl(o))
      l++;
    for (; r - l > 0; )
      n = Rl(n), r--;
    for (; l - r > 0; )
      a = Rl(a), l--;
    for (var u = r; u--; ) {
      if (n === a || a !== null && n === a.alternate)
        return n;
      n = Rl(n), a = Rl(a);
    }
    return null;
  }
  function Dy(e, t, n, a, r) {
    for (var i = t._reactName, l = [], o = n; o !== null && o !== a; ) {
      var u = o, d = u.alternate, v = u.stateNode, N = u.tag;
      if (d !== null && d === a)
        break;
      if (N === Y && v !== null) {
        var S = v;
        if (r) {
          var j = xo(o, i);
          j != null && l.unshift(Jo(o, j, S));
        } else if (!r) {
          var O = xo(o, i);
          O != null && l.push(Jo(o, O, S));
        }
      }
      o = o.return;
    }
    l.length !== 0 && e.push({
      event: t,
      listeners: l
    });
  }
  function vC(e, t, n, a, r) {
    var i = a && r ? pC(a, r) : null;
    a !== null && Dy(e, t, a, i, !1), r !== null && n !== null && Dy(e, n, r, i, !0);
  }
  function mC(e, t) {
    return e + "__bubble";
  }
  var Un = !1, Zo = "dangerouslySetInnerHTML", Fs = "suppressContentEditableWarning", Br = "suppressHydrationWarning", wy = "autoFocus", ji = "children", _i = "style", Hs = "__html", $d, Bs, eu, jy, Ps, _y, Oy;
  $d = {
    // There are working polyfills for <dialog>. Let people use it.
    dialog: !0,
    // Electron ships a custom <webview> tag to display external web content in
    // an isolated frame and process.
    // This tag is not present in non Electron environments such as JSDom which
    // is often used for testing purposes.
    // @see https://electronjs.org/docs/api/webview-tag
    webview: !0
  }, Bs = function(e, t) {
    JS(e, t), ZS(e, t), rN(e, t, {
      registrationNameDependencies: Wt,
      possibleRegistrationNames: Pn
    });
  }, _y = Xt && !document.documentMode, eu = function(e, t, n) {
    if (!Un) {
      var a = $s(n), r = $s(t);
      r !== a && (Un = !0, f("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, jy = function(e) {
    if (!Un) {
      Un = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), f("Extra attributes from the server: %s", t);
    }
  }, Ps = function(e, t) {
    t === !1 ? f("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : f("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, Oy = function(e, t) {
    var n = e.namespaceURI === or ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return n.innerHTML = t, n.innerHTML;
  };
  var hC = /\r\n?/g, yC = /\u0000|\uFFFD/g;
  function $s(e) {
    Mn(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(hC, `
`).replace(yC, "");
  }
  function Ys(e, t, n, a) {
    var r = $s(t), i = $s(e);
    if (i !== r && (a && (Un || (Un = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && _e))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Ly(e) {
    return e.nodeType === sr ? e : e.ownerDocument;
  }
  function gC() {
  }
  function Is(e) {
    e.onclick = gC;
  }
  function bC(e, t, n, a, r) {
    for (var i in a)
      if (a.hasOwnProperty(i)) {
        var l = a[i];
        if (i === _i)
          l && Object.freeze(l), Wm(t, l);
        else if (i === Zo) {
          var o = l ? l[Hs] : void 0;
          o != null && $m(t, o);
        } else if (i === ji)
          if (typeof l == "string") {
            var u = e !== "textarea" || l !== "";
            u && vs(t, l);
          } else typeof l == "number" && vs(t, "" + l);
        else i === Fs || i === Br || i === wy || (Wt.hasOwnProperty(i) ? l != null && (typeof l != "function" && Ps(i, l), i === "onScroll" && st("scroll", t)) : l != null && ya(t, i, l, r));
      }
  }
  function EC(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === _i ? Wm(e, l) : i === Zo ? $m(e, l) : i === ji ? vs(e, l) : ya(e, i, l, a);
    }
  }
  function SC(e, t, n, a) {
    var r, i = Ly(n), l, o = a;
    if (o === or && (o = Df(e)), o === or) {
      if (r = gi(e, t), !r && e !== e.toLowerCase() && f("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
        var u = i.createElement("div");
        u.innerHTML = "<script><\/script>";
        var d = u.firstChild;
        l = u.removeChild(d);
      } else if (typeof t.is == "string")
        l = i.createElement(e, {
          is: t.is
        });
      else if (l = i.createElement(e), e === "select") {
        var v = l;
        t.multiple ? v.multiple = !0 : t.size && (v.size = t.size);
      }
    } else
      l = i.createElementNS(o, e);
    return o === or && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !Ln.call($d, e) && ($d[e] = !0, f("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function NC(e, t) {
    return Ly(t).createTextNode(e);
  }
  function xC(e, t, n, a) {
    var r = gi(t, n);
    Bs(t, n);
    var i;
    switch (t) {
      case "dialog":
        st("cancel", e), st("close", e), i = n;
        break;
      case "iframe":
      case "object":
      case "embed":
        st("load", e), i = n;
        break;
      case "video":
      case "audio":
        for (var l = 0; l < Ko.length; l++)
          st(Ko[l], e);
        i = n;
        break;
      case "source":
        st("error", e), i = n;
        break;
      case "img":
      case "image":
      case "link":
        st("error", e), st("load", e), i = n;
        break;
      case "details":
        st("toggle", e), i = n;
        break;
      case "input":
        fs(e, n), i = ho(e, n), st("invalid", e);
        break;
      case "option":
        Qe(e, n), i = n;
        break;
      case "select":
        bo(e, n), i = go(e, n), st("invalid", e);
        break;
      case "textarea":
        Hm(e, n), i = Cf(e, n), st("invalid", e);
        break;
      default:
        i = n;
    }
    switch (Lf(t, i), bC(t, e, a, i, r), t) {
      case "input":
        hi(e), _(e, n, !1);
        break;
      case "textarea":
        hi(e), Pm(e);
        break;
      case "option":
        at(e, n);
        break;
      case "select":
        xf(e, n);
        break;
      default:
        typeof i.onClick == "function" && Is(e);
        break;
    }
  }
  function RC(e, t, n, a, r) {
    Bs(t, a);
    var i = null, l, o;
    switch (t) {
      case "input":
        l = ho(e, n), o = ho(e, a), i = [];
        break;
      case "select":
        l = go(e, n), o = go(e, a), i = [];
        break;
      case "textarea":
        l = Cf(e, n), o = Cf(e, a), i = [];
        break;
      default:
        l = n, o = a, typeof l.onClick != "function" && typeof o.onClick == "function" && Is(e);
        break;
    }
    Lf(t, o);
    var u, d, v = null;
    for (u in l)
      if (!(o.hasOwnProperty(u) || !l.hasOwnProperty(u) || l[u] == null))
        if (u === _i) {
          var N = l[u];
          for (d in N)
            N.hasOwnProperty(d) && (v || (v = {}), v[d] = "");
        } else u === Zo || u === ji || u === Fs || u === Br || u === wy || (Wt.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in o) {
      var S = o[u], j = l != null ? l[u] : void 0;
      if (!(!o.hasOwnProperty(u) || S === j || S == null && j == null))
        if (u === _i)
          if (S && Object.freeze(S), j) {
            for (d in j)
              j.hasOwnProperty(d) && (!S || !S.hasOwnProperty(d)) && (v || (v = {}), v[d] = "");
            for (d in S)
              S.hasOwnProperty(d) && j[d] !== S[d] && (v || (v = {}), v[d] = S[d]);
          } else
            v || (i || (i = []), i.push(u, v)), v = S;
        else if (u === Zo) {
          var O = S ? S[Hs] : void 0, V = j ? j[Hs] : void 0;
          O != null && V !== O && (i = i || []).push(u, O);
        } else u === ji ? (typeof S == "string" || typeof S == "number") && (i = i || []).push(u, "" + S) : u === Fs || u === Br || (Wt.hasOwnProperty(u) ? (S != null && (typeof S != "function" && Ps(u, S), u === "onScroll" && st("scroll", e)), !i && j !== S && (i = [])) : (i = i || []).push(u, S));
    }
    return v && (YS(v, o[_i]), (i = i || []).push(_i, v)), i;
  }
  function CC(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && s(e, r);
    var i = gi(n, a), l = gi(n, r);
    switch (EC(e, t, i, l), n) {
      case "input":
        y(e, r);
        break;
      case "textarea":
        Bm(e, r);
        break;
      case "select":
        ds(e, r);
        break;
    }
  }
  function TC(e) {
    {
      var t = e.toLowerCase();
      return ms.hasOwnProperty(t) && ms[t] || null;
    }
  }
  function DC(e, t, n, a, r, i, l) {
    var o, u;
    switch (o = gi(t, n), Bs(t, n), t) {
      case "dialog":
        st("cancel", e), st("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        st("load", e);
        break;
      case "video":
      case "audio":
        for (var d = 0; d < Ko.length; d++)
          st(Ko[d], e);
        break;
      case "source":
        st("error", e);
        break;
      case "img":
      case "image":
      case "link":
        st("error", e), st("load", e);
        break;
      case "details":
        st("toggle", e);
        break;
      case "input":
        fs(e, n), st("invalid", e);
        break;
      case "option":
        Qe(e, n);
        break;
      case "select":
        bo(e, n), st("invalid", e);
        break;
      case "textarea":
        Hm(e, n), st("invalid", e);
        break;
    }
    Lf(t, n);
    {
      u = /* @__PURE__ */ new Set();
      for (var v = e.attributes, N = 0; N < v.length; N++) {
        var S = v[N].name.toLowerCase();
        switch (S) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            u.add(v[N].name);
        }
      }
    }
    var j = null;
    for (var O in n)
      if (n.hasOwnProperty(O)) {
        var V = n[O];
        if (O === ji)
          typeof V == "string" ? e.textContent !== V && (n[Br] !== !0 && Ys(e.textContent, V, i, l), j = [ji, V]) : typeof V == "number" && e.textContent !== "" + V && (n[Br] !== !0 && Ys(e.textContent, V, i, l), j = [ji, "" + V]);
        else if (Wt.hasOwnProperty(O))
          V != null && (typeof V != "function" && Ps(O, V), O === "onScroll" && st("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof o == "boolean") {
          var J = void 0, ve = gt(O);
          if (n[Br] !== !0) {
            if (!(O === Fs || O === Br || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            O === "value" || O === "checked" || O === "selected")) {
              if (O === Zo) {
                var fe = e.innerHTML, ze = V ? V[Hs] : void 0;
                if (ze != null) {
                  var Me = Oy(e, ze);
                  Me !== fe && eu(O, fe, Me);
                }
              } else if (O === _i) {
                if (u.delete(O), _y) {
                  var C = PS(V);
                  J = e.getAttribute("style"), C !== J && eu(O, J, C);
                }
              } else if (o && !Zn)
                u.delete(O.toLowerCase()), J = ui(e, O, V), V !== J && eu(O, J, V);
              else if (!vt(O, ve, o) && !fn(O, V, ve, o)) {
                var U = !1;
                if (ve !== null)
                  u.delete(ve.attributeName), J = Ki(e, O, V, ve);
                else {
                  var T = a;
                  if (T === or && (T = Df(t)), T === or)
                    u.delete(O.toLowerCase());
                  else {
                    var $ = TC(O);
                    $ !== null && $ !== O && (U = !0, u.delete($)), u.delete(O);
                  }
                  J = ui(e, O, V);
                }
                var re = Zn;
                !re && V !== J && !U && eu(O, J, V);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    u.size > 0 && n[Br] !== !0 && jy(u), t) {
      case "input":
        hi(e), _(e, n, !0);
        break;
      case "textarea":
        hi(e), Pm(e);
        break;
      case "select":
      case "option":
        break;
      default:
        typeof n.onClick == "function" && Is(e);
        break;
    }
    return j;
  }
  function wC(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function Yd(e, t) {
    {
      if (Un)
        return;
      Un = !0, f("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function Id(e, t) {
    {
      if (Un)
        return;
      Un = !0, f('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function qd(e, t, n) {
    {
      if (Un)
        return;
      Un = !0, f("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Gd(e, t) {
    {
      if (t === "" || Un)
        return;
      Un = !0, f('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function jC(e, t, n) {
    switch (t) {
      case "input":
        A(e, n);
        return;
      case "textarea":
        xS(e, n);
        return;
      case "select":
        Rf(e, n);
        return;
    }
  }
  var tu = function() {
  }, nu = function() {
  };
  {
    var _C = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], My = [
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
    ], OC = My.concat(["button"]), LC = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], Ay = {
      current: null,
      formTag: null,
      aTagInScope: null,
      buttonTagInScope: null,
      nobrTagInScope: null,
      pTagInButtonScope: null,
      listItemTagAutoclosing: null,
      dlItemTagAutoclosing: null
    };
    nu = function(e, t) {
      var n = Oe({}, e || Ay), a = {
        tag: t
      };
      return My.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), OC.indexOf(t) !== -1 && (n.pTagInButtonScope = null), _C.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
    };
    var MC = function(e, t) {
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
          return LC.indexOf(t) === -1;
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
    }, AC = function(e, t) {
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
    }, Vy = {};
    tu = function(e, t, n) {
      n = n || Ay;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && f("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = MC(e, r) ? null : a, l = i ? null : AC(e, n), o = i || l;
      if (o) {
        var u = o.tag, d = !!i + "|" + e + "|" + u;
        if (!Vy[d]) {
          Vy[d] = !0;
          var v = e, N = "";
          if (e === "#text" ? /\S/.test(t) ? v = "Text nodes" : (v = "Whitespace text nodes", N = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : v = "<" + e + ">", i) {
            var S = "";
            u === "table" && e === "tr" && (S += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), f("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", v, u, N, S);
          } else
            f("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", v, u);
        }
      }
    };
  }
  var qs = "suppressHydrationWarning", Gs = "$", Ws = "/$", au = "$?", ru = "$!", VC = "style", Wd = null, Qd = null;
  function UC(e) {
    var t, n, a = e.nodeType;
    switch (a) {
      case sr:
      case jf: {
        t = a === sr ? "#document" : "#fragment";
        var r = e.documentElement;
        n = r ? r.namespaceURI : wf(null, "");
        break;
      }
      default: {
        var i = a === Rt ? e.parentNode : e, l = i.namespaceURI || null;
        t = i.tagName, n = wf(l, t);
        break;
      }
    }
    {
      var o = t.toLowerCase(), u = nu(null, o);
      return {
        namespace: n,
        ancestorInfo: u
      };
    }
  }
  function kC(e, t, n) {
    {
      var a = e, r = wf(a.namespace, t), i = nu(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function y1(e) {
    return e;
  }
  function zC(e) {
    Wd = Vx(), Qd = JR();
    var t = null;
    return $h(!1), t;
  }
  function FC(e) {
    ZR(Qd), $h(Wd), Wd = null, Qd = null;
  }
  function HC(e, t, n, a, r) {
    var i;
    {
      var l = a;
      if (tu(e, null, l.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var o = "" + t.children, u = nu(l.ancestorInfo, e);
        tu(null, o, u);
      }
      i = l.namespace;
    }
    var d = SC(e, t, n, i);
    return ou(r, d), ap(d, t), d;
  }
  function BC(e, t) {
    e.appendChild(t);
  }
  function PC(e, t, n, a, r) {
    switch (xC(e, t, n, a), t) {
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
  function $C(e, t, n, a, r, i) {
    {
      var l = i;
      if (typeof a.children != typeof n.children && (typeof a.children == "string" || typeof a.children == "number")) {
        var o = "" + a.children, u = nu(l.ancestorInfo, t);
        tu(null, o, u);
      }
    }
    return RC(e, t, n, a);
  }
  function Kd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function YC(e, t, n, a) {
    {
      var r = n;
      tu(null, e, r.ancestorInfo);
    }
    var i = NC(e, t);
    return ou(a, i), i;
  }
  function IC() {
    var e = window.event;
    return e === void 0 ? mr : Yh(e.type);
  }
  var Xd = typeof setTimeout == "function" ? setTimeout : void 0, qC = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = -1, Uy = typeof Promise == "function" ? Promise : void 0, GC = typeof queueMicrotask == "function" ? queueMicrotask : typeof Uy < "u" ? function(e) {
    return Uy.resolve(null).then(e).catch(WC);
  } : Xd;
  function WC(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function QC(e, t, n, a) {
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
  function KC(e, t, n, a, r, i) {
    CC(e, t, n, a, r), ap(e, r);
  }
  function ky(e) {
    vs(e, "");
  }
  function XC(e, t, n) {
    e.nodeValue = n;
  }
  function JC(e, t) {
    e.appendChild(t);
  }
  function ZC(e, t) {
    var n;
    e.nodeType === Rt ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && Is(n);
  }
  function e0(e, t, n) {
    e.insertBefore(t, n);
  }
  function t0(e, t, n) {
    e.nodeType === Rt ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function n0(e, t) {
    e.removeChild(t);
  }
  function a0(e, t) {
    e.nodeType === Rt ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function Zd(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === Rt) {
        var i = r.data;
        if (i === Ws)
          if (a === 0) {
            e.removeChild(r), Ho(t);
            return;
          } else
            a--;
        else (i === Gs || i === au || i === ru) && a++;
      }
      n = r;
    } while (n);
    Ho(t);
  }
  function r0(e, t) {
    e.nodeType === Rt ? Zd(e.parentNode, t) : e.nodeType === Vn && Zd(e, t), Ho(e);
  }
  function i0(e) {
    e = e;
    var t = e.style;
    typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
  }
  function l0(e) {
    e.nodeValue = "";
  }
  function o0(e, t) {
    e = e;
    var n = t[VC], a = n != null && n.hasOwnProperty("display") ? n.display : null;
    e.style.display = _f("display", a);
  }
  function u0(e, t) {
    e.nodeValue = t;
  }
  function s0(e) {
    e.nodeType === Vn ? e.textContent = "" : e.nodeType === sr && e.documentElement && e.removeChild(e.documentElement);
  }
  function c0(e, t, n) {
    return e.nodeType !== Vn || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function f0(e, t) {
    return t === "" || e.nodeType !== ur ? null : e;
  }
  function d0(e) {
    return e.nodeType !== Rt ? null : e;
  }
  function zy(e) {
    return e.data === au;
  }
  function ep(e) {
    return e.data === ru;
  }
  function p0(e) {
    var t = e.nextSibling && e.nextSibling.dataset, n, a, r;
    return t && (n = t.dgst, a = t.msg, r = t.stck), {
      message: a,
      digest: n,
      stack: r
    };
  }
  function v0(e, t) {
    e._reactRetry = t;
  }
  function Qs(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === Vn || t === ur)
        break;
      if (t === Rt) {
        var n = e.data;
        if (n === Gs || n === ru || n === au)
          break;
        if (n === Ws)
          return null;
      }
    }
    return e;
  }
  function iu(e) {
    return Qs(e.nextSibling);
  }
  function m0(e) {
    return Qs(e.firstChild);
  }
  function h0(e) {
    return Qs(e.firstChild);
  }
  function y0(e) {
    return Qs(e.nextSibling);
  }
  function g0(e, t, n, a, r, i, l) {
    ou(i, e), ap(e, n);
    var o;
    {
      var u = r;
      o = u.namespace;
    }
    var d = (i.mode & Ue) !== he;
    return DC(e, t, n, o, a, d, l);
  }
  function b0(e, t, n, a) {
    return ou(n, e), n.mode & Ue, wC(e, t);
  }
  function E0(e, t) {
    ou(t, e);
  }
  function S0(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === Rt) {
        var a = t.data;
        if (a === Ws) {
          if (n === 0)
            return iu(t);
          n--;
        } else (a === Gs || a === ru || a === au) && n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Fy(e) {
    for (var t = e.previousSibling, n = 0; t; ) {
      if (t.nodeType === Rt) {
        var a = t.data;
        if (a === Gs || a === ru || a === au) {
          if (n === 0)
            return t;
          n--;
        } else a === Ws && n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function N0(e) {
    Ho(e);
  }
  function x0(e) {
    Ho(e);
  }
  function R0(e) {
    return e !== "head" && e !== "body";
  }
  function C0(e, t, n, a) {
    var r = !0;
    Ys(t.nodeValue, n, a, r);
  }
  function T0(e, t, n, a, r, i) {
    if (t[qs] !== !0) {
      var l = !0;
      Ys(a.nodeValue, r, i, l);
    }
  }
  function D0(e, t) {
    t.nodeType === Vn ? Yd(e, t) : t.nodeType === Rt || Id(e, t);
  }
  function w0(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === Vn ? Yd(n, t) : t.nodeType === Rt || Id(n, t));
    }
  }
  function j0(e, t, n, a, r) {
    (r || t[qs] !== !0) && (a.nodeType === Vn ? Yd(n, a) : a.nodeType === Rt || Id(n, a));
  }
  function _0(e, t, n) {
    qd(e, t);
  }
  function O0(e, t) {
    Gd(e, t);
  }
  function L0(e, t, n) {
    {
      var a = e.parentNode;
      a !== null && qd(a, t);
    }
  }
  function M0(e, t) {
    {
      var n = e.parentNode;
      n !== null && Gd(n, t);
    }
  }
  function A0(e, t, n, a, r, i) {
    (i || t[qs] !== !0) && qd(n, a);
  }
  function V0(e, t, n, a, r) {
    (r || t[qs] !== !0) && Gd(n, a);
  }
  function U0(e) {
    f("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function k0(e) {
    Xo(e);
  }
  var Cl = Math.random().toString(36).slice(2), Tl = "__reactFiber$" + Cl, tp = "__reactProps$" + Cl, lu = "__reactContainer$" + Cl, np = "__reactEvents$" + Cl, z0 = "__reactListeners$" + Cl, F0 = "__reactHandles$" + Cl;
  function H0(e) {
    delete e[Tl], delete e[tp], delete e[np], delete e[z0], delete e[F0];
  }
  function ou(e, t) {
    t[Tl] = e;
  }
  function Ks(e, t) {
    t[lu] = e;
  }
  function Hy(e) {
    e[lu] = null;
  }
  function uu(e) {
    return !!e[lu];
  }
  function Oi(e) {
    var t = e[Tl];
    if (t)
      return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[lu] || n[Tl], t) {
        var a = t.alternate;
        if (t.child !== null || a !== null && a.child !== null)
          for (var r = Fy(e); r !== null; ) {
            var i = r[Tl];
            if (i)
              return i;
            r = Fy(r);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Pr(e) {
    var t = e[Tl] || e[lu];
    return t && (t.tag === Y || t.tag === Z || t.tag === te || t.tag === R) ? t : null;
  }
  function Dl(e) {
    if (e.tag === Y || e.tag === Z)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function Xs(e) {
    return e[tp] || null;
  }
  function ap(e, t) {
    e[tp] = t;
  }
  function B0(e) {
    var t = e[np];
    return t === void 0 && (t = e[np] = /* @__PURE__ */ new Set()), t;
  }
  var By = {}, Py = h.ReactDebugCurrentFrame;
  function Js(e) {
    if (e) {
      var t = e._owner, n = so(e.type, e._source, t ? t.type : null);
      Py.setExtraStackFrame(n);
    } else
      Py.setExtraStackFrame(null);
  }
  function xa(e, t, n, a, r) {
    {
      var i = Function.call.bind(Ln);
      for (var l in e)
        if (i(e, l)) {
          var o = void 0;
          try {
            if (typeof e[l] != "function") {
              var u = Error((a || "React class") + ": " + n + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw u.name = "Invariant Violation", u;
            }
            o = e[l](t, l, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (d) {
            o = d;
          }
          o && !(o instanceof Error) && (Js(r), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, l, typeof o), Js(null)), o instanceof Error && !(o.message in By) && (By[o.message] = !0, Js(r), f("Failed %s type: %s", n, o.message), Js(null));
        }
    }
  }
  var rp = [], Zs;
  Zs = [];
  var hr = -1;
  function $r(e) {
    return {
      current: e
    };
  }
  function vn(e, t) {
    if (hr < 0) {
      f("Unexpected pop.");
      return;
    }
    t !== Zs[hr] && f("Unexpected Fiber popped."), e.current = rp[hr], rp[hr] = null, Zs[hr] = null, hr--;
  }
  function mn(e, t, n) {
    hr++, rp[hr] = e.current, Zs[hr] = n, e.current = t;
  }
  var ip;
  ip = {};
  var Qn = {};
  Object.freeze(Qn);
  var yr = $r(Qn), Ya = $r(!1), lp = Qn;
  function wl(e, t, n) {
    return n && Ia(t) ? lp : yr.current;
  }
  function $y(e, t, n) {
    {
      var a = e.stateNode;
      a.__reactInternalMemoizedUnmaskedChildContext = t, a.__reactInternalMemoizedMaskedChildContext = n;
    }
  }
  function jl(e, t) {
    {
      var n = e.type, a = n.contextTypes;
      if (!a)
        return Qn;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {};
      for (var l in a)
        i[l] = t[l];
      {
        var o = Te(e) || "Unknown";
        xa(a, i, "context", o);
      }
      return r && $y(e, t, i), i;
    }
  }
  function ec() {
    return Ya.current;
  }
  function Ia(e) {
    {
      var t = e.childContextTypes;
      return t != null;
    }
  }
  function tc(e) {
    vn(Ya, e), vn(yr, e);
  }
  function op(e) {
    vn(Ya, e), vn(yr, e);
  }
  function Yy(e, t, n) {
    {
      if (yr.current !== Qn)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      mn(yr, t, e), mn(Ya, n, e);
    }
  }
  function Iy(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = Te(e) || "Unknown";
          ip[i] || (ip[i] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var o in l)
        if (!(o in r))
          throw new Error((Te(e) || "Unknown") + '.getChildContext(): key "' + o + '" is not defined in childContextTypes.');
      {
        var u = Te(e) || "Unknown";
        xa(r, l, "child context", u);
      }
      return Oe({}, n, l);
    }
  }
  function nc(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || Qn;
      return lp = yr.current, mn(yr, n, e), mn(Ya, Ya.current, e), !0;
    }
  }
  function qy(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = Iy(e, t, lp);
        a.__reactInternalMemoizedMergedChildContext = r, vn(Ya, e), vn(yr, e), mn(yr, r, e), mn(Ya, n, e);
      } else
        vn(Ya, e), mn(Ya, n, e);
    }
  }
  function P0(e) {
    {
      if (!RN(e) || e.tag !== x)
        throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
      var t = e;
      do {
        switch (t.tag) {
          case R:
            return t.stateNode.context;
          case x: {
            var n = t.type;
            if (Ia(n))
              return t.stateNode.__reactInternalMemoizedMergedChildContext;
            break;
          }
        }
        t = t.return;
      } while (t !== null);
      throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  var Yr = 0, ac = 1, gr = null, up = !1, sp = !1;
  function Gy(e) {
    gr === null ? gr = [e] : gr.push(e);
  }
  function $0(e) {
    up = !0, Gy(e);
  }
  function Wy() {
    up && Ir();
  }
  function Ir() {
    if (!sp && gr !== null) {
      sp = !0;
      var e = 0, t = Na();
      try {
        var n = !0, a = gr;
        for (Gt(qn); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        gr = null, up = !1;
      } catch (i) {
        throw gr !== null && (gr = gr.slice(e + 1)), gh(bs, Ir), i;
      } finally {
        Gt(t), sp = !1;
      }
    }
    return null;
  }
  var _l = [], Ol = 0, rc = null, ic = 0, ra = [], ia = 0, Li = null, br = 1, Er = "";
  function Y0(e) {
    return Ai(), (e.flags & ch) !== ge;
  }
  function I0(e) {
    return Ai(), ic;
  }
  function q0() {
    var e = Er, t = br, n = t & ~G0(t);
    return n.toString(32) + e;
  }
  function Mi(e, t) {
    Ai(), _l[Ol++] = ic, _l[Ol++] = rc, rc = e, ic = t;
  }
  function Qy(e, t, n) {
    Ai(), ra[ia++] = br, ra[ia++] = Er, ra[ia++] = Li, Li = e;
    var a = br, r = Er, i = lc(a) - 1, l = a & ~(1 << i), o = n + 1, u = lc(t) + i;
    if (u > 30) {
      var d = i - i % 5, v = (1 << d) - 1, N = (l & v).toString(32), S = l >> d, j = i - d, O = lc(t) + j, V = o << j, J = V | S, ve = N + r;
      br = 1 << O | J, Er = ve;
    } else {
      var fe = o << i, ze = fe | l, Me = r;
      br = 1 << u | ze, Er = Me;
    }
  }
  function cp(e) {
    Ai();
    var t = e.return;
    if (t !== null) {
      var n = 1, a = 0;
      Mi(e, n), Qy(e, n, a);
    }
  }
  function lc(e) {
    return 32 - Rh(e);
  }
  function G0(e) {
    return 1 << lc(e) - 1;
  }
  function fp(e) {
    for (; e === rc; )
      rc = _l[--Ol], _l[Ol] = null, ic = _l[--Ol], _l[Ol] = null;
    for (; e === Li; )
      Li = ra[--ia], ra[ia] = null, Er = ra[--ia], ra[ia] = null, br = ra[--ia], ra[ia] = null;
  }
  function W0() {
    return Ai(), Li !== null ? {
      id: br,
      overflow: Er
    } : null;
  }
  function Q0(e, t) {
    Ai(), ra[ia++] = br, ra[ia++] = Er, ra[ia++] = Li, br = t.id, Er = t.overflow, Li = e;
  }
  function Ai() {
    en() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var Zt = null, la = null, Ra = !1, Vi = !1, qr = null;
  function K0() {
    Ra && f("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function Ky() {
    Vi = !0;
  }
  function X0() {
    return Vi;
  }
  function J0(e) {
    var t = e.stateNode.containerInfo;
    return la = h0(t), Zt = e, Ra = !0, qr = null, Vi = !1, !0;
  }
  function Z0(e, t, n) {
    return la = y0(t), Zt = e, Ra = !0, qr = null, Vi = !1, n !== null && Q0(e, n), !0;
  }
  function Xy(e, t) {
    switch (e.tag) {
      case R: {
        D0(e.stateNode.containerInfo, t);
        break;
      }
      case Y: {
        var n = (e.mode & Ue) !== he;
        j0(
          e.type,
          e.memoizedProps,
          e.stateNode,
          t,
          // TODO: Delete this argument when we remove the legacy root API.
          n
        );
        break;
      }
      case te: {
        var a = e.memoizedState;
        a.dehydrated !== null && w0(a.dehydrated, t);
        break;
      }
    }
  }
  function Jy(e, t) {
    Xy(e, t);
    var n = aj();
    n.stateNode = t, n.return = e;
    var a = e.deletions;
    a === null ? (e.deletions = [n], e.flags |= bi) : a.push(n);
  }
  function dp(e, t) {
    {
      if (Vi)
        return;
      switch (e.tag) {
        case R: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case Y:
              var a = t.type;
              t.pendingProps, _0(n, a);
              break;
            case Z:
              var r = t.pendingProps;
              O0(n, r);
              break;
          }
          break;
        }
        case Y: {
          var i = e.type, l = e.memoizedProps, o = e.stateNode;
          switch (t.tag) {
            case Y: {
              var u = t.type, d = t.pendingProps, v = (e.mode & Ue) !== he;
              A0(
                i,
                l,
                o,
                u,
                d,
                // TODO: Delete this argument when we remove the legacy root API.
                v
              );
              break;
            }
            case Z: {
              var N = t.pendingProps, S = (e.mode & Ue) !== he;
              V0(
                i,
                l,
                o,
                N,
                // TODO: Delete this argument when we remove the legacy root API.
                S
              );
              break;
            }
          }
          break;
        }
        case te: {
          var j = e.memoizedState, O = j.dehydrated;
          if (O !== null) switch (t.tag) {
            case Y:
              var V = t.type;
              t.pendingProps, L0(O, V);
              break;
            case Z:
              var J = t.pendingProps;
              M0(O, J);
              break;
          }
          break;
        }
        default:
          return;
      }
    }
  }
  function Zy(e, t) {
    t.flags = t.flags & ~fr | Ct, dp(e, t);
  }
  function eg(e, t) {
    switch (e.tag) {
      case Y: {
        var n = e.type;
        e.pendingProps;
        var a = c0(t, n);
        return a !== null ? (e.stateNode = a, Zt = e, la = m0(a), !0) : !1;
      }
      case Z: {
        var r = e.pendingProps, i = f0(t, r);
        return i !== null ? (e.stateNode = i, Zt = e, la = null, !0) : !1;
      }
      case te: {
        var l = d0(t);
        if (l !== null) {
          var o = {
            dehydrated: l,
            treeContext: W0(),
            retryLane: Yn
          };
          e.memoizedState = o;
          var u = rj(l);
          return u.return = e, e.child = u, Zt = e, la = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function pp(e) {
    return (e.mode & Ue) !== he && (e.flags & Ie) === ge;
  }
  function vp(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function mp(e) {
    if (Ra) {
      var t = la;
      if (!t) {
        pp(e) && (dp(Zt, e), vp()), Zy(Zt, e), Ra = !1, Zt = e;
        return;
      }
      var n = t;
      if (!eg(e, t)) {
        pp(e) && (dp(Zt, e), vp()), t = iu(n);
        var a = Zt;
        if (!t || !eg(e, t)) {
          Zy(Zt, e), Ra = !1, Zt = e;
          return;
        }
        Jy(a, n);
      }
    }
  }
  function eT(e, t, n) {
    var a = e.stateNode, r = !Vi, i = g0(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function tT(e) {
    var t = e.stateNode, n = e.memoizedProps, a = b0(t, n, e);
    if (a) {
      var r = Zt;
      if (r !== null)
        switch (r.tag) {
          case R: {
            var i = r.stateNode.containerInfo, l = (r.mode & Ue) !== he;
            C0(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case Y: {
            var o = r.type, u = r.memoizedProps, d = r.stateNode, v = (r.mode & Ue) !== he;
            T0(
              o,
              u,
              d,
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
  function nT(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    E0(n, e);
  }
  function aT(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return S0(n);
  }
  function tg(e) {
    for (var t = e.return; t !== null && t.tag !== Y && t.tag !== R && t.tag !== te; )
      t = t.return;
    Zt = t;
  }
  function oc(e) {
    if (e !== Zt)
      return !1;
    if (!Ra)
      return tg(e), Ra = !0, !1;
    if (e.tag !== R && (e.tag !== Y || R0(e.type) && !Kd(e.type, e.memoizedProps))) {
      var t = la;
      if (t)
        if (pp(e))
          ng(e), vp();
        else
          for (; t; )
            Jy(e, t), t = iu(t);
    }
    return tg(e), e.tag === te ? la = aT(e) : la = Zt ? iu(e.stateNode) : null, !0;
  }
  function rT() {
    return Ra && la !== null;
  }
  function ng(e) {
    for (var t = la; t; )
      Xy(e, t), t = iu(t);
  }
  function Ll() {
    Zt = null, la = null, Ra = !1, Vi = !1;
  }
  function ag() {
    qr !== null && (Kb(qr), qr = null);
  }
  function en() {
    return Ra;
  }
  function hp(e) {
    qr === null ? qr = [e] : qr.push(e);
  }
  var iT = h.ReactCurrentBatchConfig, lT = null;
  function oT() {
    return iT.transition;
  }
  var Ca = {
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
    var uT = function(e) {
      for (var t = null, n = e; n !== null; )
        n.mode & Et && (t = n), n = n.return;
      return t;
    }, Ui = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, su = [], cu = [], fu = [], du = [], pu = [], vu = [], ki = /* @__PURE__ */ new Set();
    Ca.recordUnsafeLifecycleWarnings = function(e, t) {
      ki.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && su.push(e), e.mode & Et && typeof t.UNSAFE_componentWillMount == "function" && cu.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && fu.push(e), e.mode & Et && typeof t.UNSAFE_componentWillReceiveProps == "function" && du.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && pu.push(e), e.mode & Et && typeof t.UNSAFE_componentWillUpdate == "function" && vu.push(e));
    }, Ca.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      su.length > 0 && (su.forEach(function(S) {
        e.add(Te(S) || "Component"), ki.add(S.type);
      }), su = []);
      var t = /* @__PURE__ */ new Set();
      cu.length > 0 && (cu.forEach(function(S) {
        t.add(Te(S) || "Component"), ki.add(S.type);
      }), cu = []);
      var n = /* @__PURE__ */ new Set();
      fu.length > 0 && (fu.forEach(function(S) {
        n.add(Te(S) || "Component"), ki.add(S.type);
      }), fu = []);
      var a = /* @__PURE__ */ new Set();
      du.length > 0 && (du.forEach(function(S) {
        a.add(Te(S) || "Component"), ki.add(S.type);
      }), du = []);
      var r = /* @__PURE__ */ new Set();
      pu.length > 0 && (pu.forEach(function(S) {
        r.add(Te(S) || "Component"), ki.add(S.type);
      }), pu = []);
      var i = /* @__PURE__ */ new Set();
      if (vu.length > 0 && (vu.forEach(function(S) {
        i.add(Te(S) || "Component"), ki.add(S.type);
      }), vu = []), t.size > 0) {
        var l = Ui(t);
        f(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, l);
      }
      if (a.size > 0) {
        var o = Ui(a);
        f(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, o);
      }
      if (i.size > 0) {
        var u = Ui(i);
        f(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, u);
      }
      if (e.size > 0) {
        var d = Ui(e);
        D(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, d);
      }
      if (n.size > 0) {
        var v = Ui(n);
        D(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, v);
      }
      if (r.size > 0) {
        var N = Ui(r);
        D(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, N);
      }
    };
    var uc = /* @__PURE__ */ new Map(), rg = /* @__PURE__ */ new Set();
    Ca.recordLegacyContextWarning = function(e, t) {
      var n = uT(e);
      if (n === null) {
        f("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!rg.has(e.type)) {
        var a = uc.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], uc.set(n, a)), a.push(e));
      }
    }, Ca.flushLegacyContextWarning = function() {
      uc.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add(Te(i) || "Component"), rg.add(i.type);
          });
          var r = Ui(a);
          try {
            ft(n), f(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r);
          } finally {
            $t();
          }
        }
      });
    }, Ca.discardPendingWarnings = function() {
      su = [], cu = [], fu = [], du = [], pu = [], vu = [], uc = /* @__PURE__ */ new Map();
    };
  }
  var yp, gp, bp, Ep, Sp, ig = function(e, t) {
  };
  yp = !1, gp = !1, bp = {}, Ep = {}, Sp = {}, ig = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = Te(t) || "Component";
      Ep[n] || (Ep[n] = !0, f('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function sT(e) {
    return e.prototype && e.prototype.isReactComponent;
  }
  function mu(e, t, n) {
    var a = n.ref;
    if (a !== null && typeof a != "function" && typeof a != "object") {
      if ((e.mode & Et || Ft) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(n._owner && n._self && n._owner.stateNode !== n._self) && // Will already throw with "Function components cannot have string refs"
      !(n._owner && n._owner.tag !== x) && // Will already warn with "Function components cannot be given refs"
      !(typeof n.type == "function" && !sT(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = Te(e) || "Component";
        bp[r] || (f('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, a), bp[r] = !0);
      }
      if (n._owner) {
        var i = n._owner, l;
        if (i) {
          var o = i;
          if (o.tag !== x)
            throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
          l = o.stateNode;
        }
        if (!l)
          throw new Error("Missing owner for string ref " + a + ". This error is likely caused by a bug in React. Please file an issue.");
        var u = l;
        tr(a, "ref");
        var d = "" + a;
        if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === d)
          return t.ref;
        var v = function(N) {
          var S = u.refs;
          N === null ? delete S[d] : S[d] = N;
        };
        return v._stringRef = d, v;
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
  function sc(e, t) {
    var n = Object.prototype.toString.call(t);
    throw new Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  }
  function cc(e) {
    {
      var t = Te(e) || "Component";
      if (Sp[t])
        return;
      Sp[t] = !0, f("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function lg(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function og(e) {
    function t(C, U) {
      if (e) {
        var T = C.deletions;
        T === null ? (C.deletions = [U], C.flags |= bi) : T.push(U);
      }
    }
    function n(C, U) {
      if (!e)
        return null;
      for (var T = U; T !== null; )
        t(C, T), T = T.sibling;
      return null;
    }
    function a(C, U) {
      for (var T = /* @__PURE__ */ new Map(), $ = U; $ !== null; )
        $.key !== null ? T.set($.key, $) : T.set($.index, $), $ = $.sibling;
      return T;
    }
    function r(C, U) {
      var T = qi(C, U);
      return T.index = 0, T.sibling = null, T;
    }
    function i(C, U, T) {
      if (C.index = T, !e)
        return C.flags |= ch, U;
      var $ = C.alternate;
      if ($ !== null) {
        var re = $.index;
        return re < U ? (C.flags |= Ct, U) : re;
      } else
        return C.flags |= Ct, U;
    }
    function l(C) {
      return e && C.alternate === null && (C.flags |= Ct), C;
    }
    function o(C, U, T, $) {
      if (U === null || U.tag !== Z) {
        var re = hm(T, C.mode, $);
        return re.return = C, re;
      } else {
        var ee = r(U, T);
        return ee.return = C, ee;
      }
    }
    function u(C, U, T, $) {
      var re = T.type;
      if (re === za)
        return v(C, U, T.props.children, $, T.key);
      if (U !== null && (U.elementType === re || // Keep this check inline so it only runs on the false path:
      dE(U, T) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof re == "object" && re !== null && re.$$typeof === me && lg(re) === U.type)) {
        var ee = r(U, T.props);
        return ee.ref = mu(C, U, T), ee.return = C, ee._debugSource = T._source, ee._debugOwner = T._owner, ee;
      }
      var be = mm(T, C.mode, $);
      return be.ref = mu(C, U, T), be.return = C, be;
    }
    function d(C, U, T, $) {
      if (U === null || U.tag !== H || U.stateNode.containerInfo !== T.containerInfo || U.stateNode.implementation !== T.implementation) {
        var re = ym(T, C.mode, $);
        return re.return = C, re;
      } else {
        var ee = r(U, T.children || []);
        return ee.return = C, ee;
      }
    }
    function v(C, U, T, $, re) {
      if (U === null || U.tag !== F) {
        var ee = ai(T, C.mode, $, re);
        return ee.return = C, ee;
      } else {
        var be = r(U, T);
        return be.return = C, be;
      }
    }
    function N(C, U, T) {
      if (typeof U == "string" && U !== "" || typeof U == "number") {
        var $ = hm("" + U, C.mode, T);
        return $.return = C, $;
      }
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case na: {
            var re = mm(U, C.mode, T);
            return re.ref = mu(C, null, U), re.return = C, re;
          }
          case $n: {
            var ee = ym(U, C.mode, T);
            return ee.return = C, ee;
          }
          case me: {
            var be = U._payload, Ce = U._init;
            return N(C, Ce(be), T);
          }
        }
        if (Le(U) || ba(U)) {
          var Je = ai(U, C.mode, T, null);
          return Je.return = C, Je;
        }
        sc(C, U);
      }
      return typeof U == "function" && cc(C), null;
    }
    function S(C, U, T, $) {
      var re = U !== null ? U.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number")
        return re !== null ? null : o(C, U, "" + T, $);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case na:
            return T.key === re ? u(C, U, T, $) : null;
          case $n:
            return T.key === re ? d(C, U, T, $) : null;
          case me: {
            var ee = T._payload, be = T._init;
            return S(C, U, be(ee), $);
          }
        }
        if (Le(T) || ba(T))
          return re !== null ? null : v(C, U, T, $, null);
        sc(C, T);
      }
      return typeof T == "function" && cc(C), null;
    }
    function j(C, U, T, $, re) {
      if (typeof $ == "string" && $ !== "" || typeof $ == "number") {
        var ee = C.get(T) || null;
        return o(U, ee, "" + $, re);
      }
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case na: {
            var be = C.get($.key === null ? T : $.key) || null;
            return u(U, be, $, re);
          }
          case $n: {
            var Ce = C.get($.key === null ? T : $.key) || null;
            return d(U, Ce, $, re);
          }
          case me:
            var Je = $._payload, He = $._init;
            return j(C, U, T, He(Je), re);
        }
        if (Le($) || ba($)) {
          var Nt = C.get(T) || null;
          return v(U, Nt, $, re, null);
        }
        sc(U, $);
      }
      return typeof $ == "function" && cc(U), null;
    }
    function O(C, U, T) {
      {
        if (typeof C != "object" || C === null)
          return U;
        switch (C.$$typeof) {
          case na:
          case $n:
            ig(C, T);
            var $ = C.key;
            if (typeof $ != "string")
              break;
            if (U === null) {
              U = /* @__PURE__ */ new Set(), U.add($);
              break;
            }
            if (!U.has($)) {
              U.add($);
              break;
            }
            f("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", $);
            break;
          case me:
            var re = C._payload, ee = C._init;
            O(ee(re), U, T);
            break;
        }
      }
      return U;
    }
    function V(C, U, T, $) {
      for (var re = null, ee = 0; ee < T.length; ee++) {
        var be = T[ee];
        re = O(be, re, C);
      }
      for (var Ce = null, Je = null, He = U, Nt = 0, Be = 0, St = null; He !== null && Be < T.length; Be++) {
        He.index > Be ? (St = He, He = null) : St = He.sibling;
        var yn = S(C, He, T[Be], $);
        if (yn === null) {
          He === null && (He = St);
          break;
        }
        e && He && yn.alternate === null && t(C, He), Nt = i(yn, Nt, Be), Je === null ? Ce = yn : Je.sibling = yn, Je = yn, He = St;
      }
      if (Be === T.length) {
        if (n(C, He), en()) {
          var un = Be;
          Mi(C, un);
        }
        return Ce;
      }
      if (He === null) {
        for (; Be < T.length; Be++) {
          var Xn = N(C, T[Be], $);
          Xn !== null && (Nt = i(Xn, Nt, Be), Je === null ? Ce = Xn : Je.sibling = Xn, Je = Xn);
        }
        if (en()) {
          var _n = Be;
          Mi(C, _n);
        }
        return Ce;
      }
      for (var On = a(C, He); Be < T.length; Be++) {
        var gn = j(On, C, Be, T[Be], $);
        gn !== null && (e && gn.alternate !== null && On.delete(gn.key === null ? Be : gn.key), Nt = i(gn, Nt, Be), Je === null ? Ce = gn : Je.sibling = gn, Je = gn);
      }
      if (e && On.forEach(function(Xl) {
        return t(C, Xl);
      }), en()) {
        var Dr = Be;
        Mi(C, Dr);
      }
      return Ce;
    }
    function J(C, U, T, $) {
      var re = ba(T);
      if (typeof re != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        T[Symbol.toStringTag] === "Generator" && (gp || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), gp = !0), T.entries === re && (yp || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), yp = !0);
        var ee = re.call(T);
        if (ee)
          for (var be = null, Ce = ee.next(); !Ce.done; Ce = ee.next()) {
            var Je = Ce.value;
            be = O(Je, be, C);
          }
      }
      var He = re.call(T);
      if (He == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Nt = null, Be = null, St = U, yn = 0, un = 0, Xn = null, _n = He.next(); St !== null && !_n.done; un++, _n = He.next()) {
        St.index > un ? (Xn = St, St = null) : Xn = St.sibling;
        var On = S(C, St, _n.value, $);
        if (On === null) {
          St === null && (St = Xn);
          break;
        }
        e && St && On.alternate === null && t(C, St), yn = i(On, yn, un), Be === null ? Nt = On : Be.sibling = On, Be = On, St = Xn;
      }
      if (_n.done) {
        if (n(C, St), en()) {
          var gn = un;
          Mi(C, gn);
        }
        return Nt;
      }
      if (St === null) {
        for (; !_n.done; un++, _n = He.next()) {
          var Dr = N(C, _n.value, $);
          Dr !== null && (yn = i(Dr, yn, un), Be === null ? Nt = Dr : Be.sibling = Dr, Be = Dr);
        }
        if (en()) {
          var Xl = un;
          Mi(C, Xl);
        }
        return Nt;
      }
      for (var Gu = a(C, St); !_n.done; un++, _n = He.next()) {
        var Za = j(Gu, C, un, _n.value, $);
        Za !== null && (e && Za.alternate !== null && Gu.delete(Za.key === null ? un : Za.key), yn = i(Za, yn, un), Be === null ? Nt = Za : Be.sibling = Za, Be = Za);
      }
      if (e && Gu.forEach(function(Vj) {
        return t(C, Vj);
      }), en()) {
        var Aj = un;
        Mi(C, Aj);
      }
      return Nt;
    }
    function ve(C, U, T, $) {
      if (U !== null && U.tag === Z) {
        n(C, U.sibling);
        var re = r(U, T);
        return re.return = C, re;
      }
      n(C, U);
      var ee = hm(T, C.mode, $);
      return ee.return = C, ee;
    }
    function fe(C, U, T, $) {
      for (var re = T.key, ee = U; ee !== null; ) {
        if (ee.key === re) {
          var be = T.type;
          if (be === za) {
            if (ee.tag === F) {
              n(C, ee.sibling);
              var Ce = r(ee, T.props.children);
              return Ce.return = C, Ce._debugSource = T._source, Ce._debugOwner = T._owner, Ce;
            }
          } else if (ee.elementType === be || // Keep this check inline so it only runs on the false path:
          dE(ee, T) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof be == "object" && be !== null && be.$$typeof === me && lg(be) === ee.type) {
            n(C, ee.sibling);
            var Je = r(ee, T.props);
            return Je.ref = mu(C, ee, T), Je.return = C, Je._debugSource = T._source, Je._debugOwner = T._owner, Je;
          }
          n(C, ee);
          break;
        } else
          t(C, ee);
        ee = ee.sibling;
      }
      if (T.type === za) {
        var He = ai(T.props.children, C.mode, $, T.key);
        return He.return = C, He;
      } else {
        var Nt = mm(T, C.mode, $);
        return Nt.ref = mu(C, U, T), Nt.return = C, Nt;
      }
    }
    function ze(C, U, T, $) {
      for (var re = T.key, ee = U; ee !== null; ) {
        if (ee.key === re)
          if (ee.tag === H && ee.stateNode.containerInfo === T.containerInfo && ee.stateNode.implementation === T.implementation) {
            n(C, ee.sibling);
            var be = r(ee, T.children || []);
            return be.return = C, be;
          } else {
            n(C, ee);
            break;
          }
        else
          t(C, ee);
        ee = ee.sibling;
      }
      var Ce = ym(T, C.mode, $);
      return Ce.return = C, Ce;
    }
    function Me(C, U, T, $) {
      var re = typeof T == "object" && T !== null && T.type === za && T.key === null;
      if (re && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case na:
            return l(fe(C, U, T, $));
          case $n:
            return l(ze(C, U, T, $));
          case me:
            var ee = T._payload, be = T._init;
            return Me(C, U, be(ee), $);
        }
        if (Le(T))
          return V(C, U, T, $);
        if (ba(T))
          return J(C, U, T, $);
        sc(C, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" ? l(ve(C, U, "" + T, $)) : (typeof T == "function" && cc(C), n(C, U));
    }
    return Me;
  }
  var Ml = og(!0), ug = og(!1);
  function cT(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var n = t.child, a = qi(n, n.pendingProps);
      for (t.child = a, a.return = t; n.sibling !== null; )
        n = n.sibling, a = a.sibling = qi(n, n.pendingProps), a.return = t;
      a.sibling = null;
    }
  }
  function fT(e, t) {
    for (var n = e.child; n !== null; )
      Jw(n, t), n = n.sibling;
  }
  var Np = $r(null), xp;
  xp = {};
  var fc = null, Al = null, Rp = null, dc = !1;
  function pc() {
    fc = null, Al = null, Rp = null, dc = !1;
  }
  function sg() {
    dc = !0;
  }
  function cg() {
    dc = !1;
  }
  function fg(e, t, n) {
    mn(Np, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== xp && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = xp;
  }
  function Cp(e, t) {
    var n = Np.current;
    vn(Np, t), e._currentValue = n;
  }
  function Tp(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (gl(a.childLanes, t) ? r !== null && !gl(r.childLanes, t) && (r.childLanes = we(r.childLanes, t)) : (a.childLanes = we(a.childLanes, t), r !== null && (r.childLanes = we(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && f("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function dT(e, t, n) {
    pT(e, t, n);
  }
  function pT(e, t, n) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = void 0, i = a.dependencies;
      if (i !== null) {
        r = a.child;
        for (var l = i.firstContext; l !== null; ) {
          if (l.context === t) {
            if (a.tag === x) {
              var o = Mo(n), u = Sr(it, o);
              u.tag = mc;
              var d = a.updateQueue;
              if (d !== null) {
                var v = d.shared, N = v.pending;
                N === null ? u.next = u : (u.next = N.next, N.next = u), v.pending = u;
              }
            }
            a.lanes = we(a.lanes, n);
            var S = a.alternate;
            S !== null && (S.lanes = we(S.lanes, n)), Tp(a.return, n, e), i.lanes = we(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === q)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === Ge) {
        var j = a.return;
        if (j === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        j.lanes = we(j.lanes, n);
        var O = j.alternate;
        O !== null && (O.lanes = we(O.lanes, n)), Tp(j, n, e), r = a.sibling;
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
          var V = r.sibling;
          if (V !== null) {
            V.return = r.return, r = V;
            break;
          }
          r = r.return;
        }
      a = r;
    }
  }
  function Vl(e, t) {
    fc = e, Al = null, Rp = null;
    var n = e.dependencies;
    if (n !== null) {
      var a = n.firstContext;
      a !== null && (In(n.lanes, t) && _u(), n.firstContext = null);
    }
  }
  function Tt(e) {
    dc && f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    var t = e._currentValue;
    if (Rp !== e) {
      var n = {
        context: e,
        memoizedValue: t,
        next: null
      };
      if (Al === null) {
        if (fc === null)
          throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        Al = n, fc.dependencies = {
          lanes: B,
          firstContext: n
        };
      } else
        Al = Al.next = n;
    }
    return t;
  }
  var zi = null;
  function Dp(e) {
    zi === null ? zi = [e] : zi.push(e);
  }
  function vT() {
    if (zi !== null) {
      for (var e = 0; e < zi.length; e++) {
        var t = zi[e], n = t.interleaved;
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
      zi = null;
    }
  }
  function dg(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Dp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, vc(e, a);
  }
  function mT(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, Dp(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function hT(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Dp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, vc(e, a);
  }
  function kn(e, t) {
    return vc(e, t);
  }
  var yT = vc;
  function vc(e, t) {
    e.lanes = we(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = we(n.lanes, t)), n === null && (e.flags & (Ct | fr)) !== ge && uE(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = we(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = we(n.childLanes, t) : (r.flags & (Ct | fr)) !== ge && uE(e), a = r, r = r.return;
    if (a.tag === R) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var pg = 0, vg = 1, mc = 2, wp = 3, hc = !1, jp, yc;
  jp = !1, yc = null;
  function _p(e) {
    var t = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        interleaved: null,
        lanes: B
      },
      effects: null
    };
    e.updateQueue = t;
  }
  function mg(e, t) {
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
      tag: pg,
      payload: null,
      callback: null,
      next: null
    };
    return n;
  }
  function Gr(e, t, n) {
    var a = e.updateQueue;
    if (a === null)
      return null;
    var r = a.shared;
    if (yc === r && !jp && (f("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), jp = !0), mw()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, yT(e, n);
    } else
      return hT(e, r, t, n);
  }
  function gc(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (wh(n)) {
        var i = r.lanes;
        i = _h(i, e.pendingLanes);
        var l = we(i, n);
        r.lanes = l, Nd(e, l);
      }
    }
  }
  function Op(e, t) {
    var n = e.updateQueue, a = e.alternate;
    if (a !== null) {
      var r = a.updateQueue;
      if (n === r) {
        var i = null, l = null, o = n.firstBaseUpdate;
        if (o !== null) {
          var u = o;
          do {
            var d = {
              eventTime: u.eventTime,
              lane: u.lane,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null
            };
            l === null ? i = l = d : (l.next = d, l = d), u = u.next;
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
    var v = n.lastBaseUpdate;
    v === null ? n.firstBaseUpdate = t : v.next = t, n.lastBaseUpdate = t;
  }
  function gT(e, t, n, a, r, i) {
    switch (n.tag) {
      case vg: {
        var l = n.payload;
        if (typeof l == "function") {
          sg();
          var o = l.call(i, a, r);
          {
            if (e.mode & Et) {
              It(!0);
              try {
                l.call(i, a, r);
              } finally {
                It(!1);
              }
            }
            cg();
          }
          return o;
        }
        return l;
      }
      case wp:
        e.flags = e.flags & ~Tn | Ie;
      case pg: {
        var u = n.payload, d;
        if (typeof u == "function") {
          sg(), d = u.call(i, a, r);
          {
            if (e.mode & Et) {
              It(!0);
              try {
                u.call(i, a, r);
              } finally {
                It(!1);
              }
            }
            cg();
          }
        } else
          d = u;
        return d == null ? a : Oe({}, a, d);
      }
      case mc:
        return hc = !0, a;
    }
    return a;
  }
  function bc(e, t, n, a) {
    var r = e.updateQueue;
    hc = !1, yc = r.shared;
    var i = r.firstBaseUpdate, l = r.lastBaseUpdate, o = r.shared.pending;
    if (o !== null) {
      r.shared.pending = null;
      var u = o, d = u.next;
      u.next = null, l === null ? i = d : l.next = d, l = u;
      var v = e.alternate;
      if (v !== null) {
        var N = v.updateQueue, S = N.lastBaseUpdate;
        S !== l && (S === null ? N.firstBaseUpdate = d : S.next = d, N.lastBaseUpdate = u);
      }
    }
    if (i !== null) {
      var j = r.baseState, O = B, V = null, J = null, ve = null, fe = i;
      do {
        var ze = fe.lane, Me = fe.eventTime;
        if (gl(a, ze)) {
          if (ve !== null) {
            var U = {
              eventTime: Me,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: qt,
              tag: fe.tag,
              payload: fe.payload,
              callback: fe.callback,
              next: null
            };
            ve = ve.next = U;
          }
          j = gT(e, r, fe, j, t, n);
          var T = fe.callback;
          if (T !== null && // If the update was already committed, we should not queue its
          // callback again.
          fe.lane !== qt) {
            e.flags |= sh;
            var $ = r.effects;
            $ === null ? r.effects = [fe] : $.push(fe);
          }
        } else {
          var C = {
            eventTime: Me,
            lane: ze,
            tag: fe.tag,
            payload: fe.payload,
            callback: fe.callback,
            next: null
          };
          ve === null ? (J = ve = C, V = j) : ve = ve.next = C, O = we(O, ze);
        }
        if (fe = fe.next, fe === null) {
          if (o = r.shared.pending, o === null)
            break;
          var re = o, ee = re.next;
          re.next = null, fe = ee, r.lastBaseUpdate = re, r.shared.pending = null;
        }
      } while (!0);
      ve === null && (V = j), r.baseState = V, r.firstBaseUpdate = J, r.lastBaseUpdate = ve;
      var be = r.shared.interleaved;
      if (be !== null) {
        var Ce = be;
        do
          O = we(O, Ce.lane), Ce = Ce.next;
        while (Ce !== be);
      } else i === null && (r.shared.lanes = B);
      Pu(O), e.lanes = O, e.memoizedState = j;
    }
    yc = null;
  }
  function bT(e, t) {
    if (typeof e != "function")
      throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
    e.call(t);
  }
  function hg() {
    hc = !1;
  }
  function Ec() {
    return hc;
  }
  function yg(e, t, n) {
    var a = t.effects;
    if (t.effects = null, a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r], l = i.callback;
        l !== null && (i.callback = null, bT(l, n));
      }
  }
  var hu = {}, Wr = $r(hu), yu = $r(hu), Sc = $r(hu);
  function Nc(e) {
    if (e === hu)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function gg() {
    var e = Nc(Sc.current);
    return e;
  }
  function Lp(e, t) {
    mn(Sc, t, e), mn(yu, e, e), mn(Wr, hu, e);
    var n = UC(t);
    vn(Wr, e), mn(Wr, n, e);
  }
  function Ul(e) {
    vn(Wr, e), vn(yu, e), vn(Sc, e);
  }
  function Mp() {
    var e = Nc(Wr.current);
    return e;
  }
  function bg(e) {
    Nc(Sc.current);
    var t = Nc(Wr.current), n = kC(t, e.type);
    t !== n && (mn(yu, e, e), mn(Wr, n, e));
  }
  function Ap(e) {
    yu.current === e && (vn(Wr, e), vn(yu, e));
  }
  var ET = 0, Eg = 1, Sg = 1, gu = 2, Ta = $r(ET);
  function Vp(e, t) {
    return (e & t) !== 0;
  }
  function kl(e) {
    return e & Eg;
  }
  function Up(e, t) {
    return e & Eg | t;
  }
  function ST(e, t) {
    return e | t;
  }
  function Qr(e, t) {
    mn(Ta, t, e);
  }
  function zl(e) {
    vn(Ta, e);
  }
  function NT(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function xc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === te) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || zy(a) || ep(a))
            return t;
        }
      } else if (t.tag === Ze && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & Ie) !== ge;
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
  var zn = (
    /*   */
    0
  ), Ot = (
    /* */
    1
  ), qa = (
    /*  */
    2
  ), Lt = (
    /*    */
    4
  ), tn = (
    /*   */
    8
  ), kp = [];
  function zp() {
    for (var e = 0; e < kp.length; e++) {
      var t = kp[e];
      t._workInProgressVersionPrimary = null;
    }
    kp.length = 0;
  }
  function xT(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var ae = h.ReactCurrentDispatcher, bu = h.ReactCurrentBatchConfig, Fp, Fl;
  Fp = /* @__PURE__ */ new Set();
  var Fi = B, Xe = null, Mt = null, At = null, Rc = !1, Eu = !1, Su = 0, RT = 0, CT = 25, k = null, oa = null, Kr = -1, Hp = !1;
  function qe() {
    {
      var e = k;
      oa === null ? oa = [e] : oa.push(e);
    }
  }
  function Q() {
    {
      var e = k;
      oa !== null && (Kr++, oa[Kr] !== e && TT(e));
    }
  }
  function Hl(e) {
    e != null && !Le(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", k, typeof e);
  }
  function TT(e) {
    {
      var t = Te(Xe);
      if (!Fp.has(t) && (Fp.add(t), oa !== null)) {
        for (var n = "", a = 30, r = 0; r <= Kr; r++) {
          for (var i = oa[r], l = r === Kr ? e : i, o = r + 1 + ". " + i; o.length < a; )
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
  function hn() {
    throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
  }
  function Bp(e, t) {
    if (Hp)
      return !1;
    if (t === null)
      return f("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", k), !1;
    e.length !== t.length && f(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, k, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Wn(e[n], t[n]))
        return !1;
    return !0;
  }
  function Bl(e, t, n, a, r, i) {
    Fi = i, Xe = t, oa = e !== null ? e._debugHookTypes : null, Kr = -1, Hp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = B, e !== null && e.memoizedState !== null ? ae.current = $g : oa !== null ? ae.current = Pg : ae.current = Bg;
    var l = n(a, r);
    if (Eu) {
      var o = 0;
      do {
        if (Eu = !1, Su = 0, o >= CT)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        o += 1, Hp = !1, Mt = null, At = null, t.updateQueue = null, Kr = -1, ae.current = Yg, l = n(a, r);
      } while (Eu);
    }
    ae.current = kc, t._debugHookTypes = oa;
    var u = Mt !== null && Mt.next !== null;
    if (Fi = B, Xe = null, Mt = null, At = null, k = null, oa = null, Kr = -1, e !== null && (e.flags & dr) !== (t.flags & dr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Ue) !== he && f("Internal React error: Expected static flag was missing. Please notify the React team."), Rc = !1, u)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function Pl() {
    var e = Su !== 0;
    return Su = 0, e;
  }
  function Ng(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Pa) !== he ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Cs(e.lanes, n);
  }
  function xg() {
    if (ae.current = kc, Rc) {
      for (var e = Xe.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Rc = !1;
    }
    Fi = B, Xe = null, Mt = null, At = null, oa = null, Kr = -1, k = null, Ug = !1, Eu = !1, Su = 0;
  }
  function Ga() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return At === null ? Xe.memoizedState = At = e : At = At.next = e, At;
  }
  function ua() {
    var e;
    if (Mt === null) {
      var t = Xe.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = Mt.next;
    var n;
    if (At === null ? n = Xe.memoizedState : n = At.next, n !== null)
      At = n, n = At.next, Mt = e;
    else {
      if (e === null)
        throw new Error("Rendered more hooks than during the previous render.");
      Mt = e;
      var a = {
        memoizedState: Mt.memoizedState,
        baseState: Mt.baseState,
        baseQueue: Mt.baseQueue,
        queue: Mt.queue,
        next: null
      };
      At === null ? Xe.memoizedState = At = a : At = At.next = a;
    }
    return At;
  }
  function Rg() {
    return {
      lastEffect: null,
      stores: null
    };
  }
  function Pp(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function $p(e, t, n) {
    var a = Ga(), r;
    n !== void 0 ? r = n(t) : r = t, a.memoizedState = a.baseState = r;
    var i = {
      pending: null,
      interleaved: null,
      lanes: B,
      dispatch: null,
      lastRenderedReducer: e,
      lastRenderedState: r
    };
    a.queue = i;
    var l = i.dispatch = _T.bind(null, Xe, i);
    return [a.memoizedState, l];
  }
  function Yp(e, t, n) {
    var a = ua(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = Mt, l = i.baseQueue, o = r.pending;
    if (o !== null) {
      if (l !== null) {
        var u = l.next, d = o.next;
        l.next = d, o.next = u;
      }
      i.baseQueue !== l && f("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), i.baseQueue = l = o, r.pending = null;
    }
    if (l !== null) {
      var v = l.next, N = i.baseState, S = null, j = null, O = null, V = v;
      do {
        var J = V.lane;
        if (gl(Fi, J)) {
          if (O !== null) {
            var fe = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: qt,
              action: V.action,
              hasEagerState: V.hasEagerState,
              eagerState: V.eagerState,
              next: null
            };
            O = O.next = fe;
          }
          if (V.hasEagerState)
            N = V.eagerState;
          else {
            var ze = V.action;
            N = e(N, ze);
          }
        } else {
          var ve = {
            lane: J,
            action: V.action,
            hasEagerState: V.hasEagerState,
            eagerState: V.eagerState,
            next: null
          };
          O === null ? (j = O = ve, S = N) : O = O.next = ve, Xe.lanes = we(Xe.lanes, J), Pu(J);
        }
        V = V.next;
      } while (V !== null && V !== v);
      O === null ? S = N : O.next = j, Wn(N, a.memoizedState) || _u(), a.memoizedState = N, a.baseState = S, a.baseQueue = O, r.lastRenderedState = N;
    }
    var Me = r.interleaved;
    if (Me !== null) {
      var C = Me;
      do {
        var U = C.lane;
        Xe.lanes = we(Xe.lanes, U), Pu(U), C = C.next;
      } while (C !== Me);
    } else l === null && (r.lanes = B);
    var T = r.dispatch;
    return [a.memoizedState, T];
  }
  function Ip(e, t, n) {
    var a = ua(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = r.dispatch, l = r.pending, o = a.memoizedState;
    if (l !== null) {
      r.pending = null;
      var u = l.next, d = u;
      do {
        var v = d.action;
        o = e(o, v), d = d.next;
      } while (d !== u);
      Wn(o, a.memoizedState) || _u(), a.memoizedState = o, a.baseQueue === null && (a.baseState = o), r.lastRenderedState = o;
    }
    return [o, i];
  }
  function g1(e, t, n) {
  }
  function b1(e, t, n) {
  }
  function qp(e, t, n) {
    var a = Xe, r = Ga(), i, l = en();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), Fl || i !== n() && (f("The result of getServerSnapshot should be cached to avoid an infinite loop"), Fl = !0);
    } else {
      if (i = t(), !Fl) {
        var o = t();
        Wn(i, o) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Fl = !0);
      }
      var u = nf();
      if (u === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Rs(u, Fi) || Cg(a, t, i);
    }
    r.memoizedState = i;
    var d = {
      value: i,
      getSnapshot: t
    };
    return r.queue = d, jc(Dg.bind(null, a, d, e), [e]), a.flags |= Ar, Nu(Ot | tn, Tg.bind(null, a, d, i, t), void 0, null), i;
  }
  function Cc(e, t, n) {
    var a = Xe, r = ua(), i = t();
    if (!Fl) {
      var l = t();
      Wn(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Fl = !0);
    }
    var o = r.memoizedState, u = !Wn(o, i);
    u && (r.memoizedState = i, _u());
    var d = r.queue;
    if (Ru(Dg.bind(null, a, d, e), [e]), d.getSnapshot !== t || u || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    At !== null && At.memoizedState.tag & Ot) {
      a.flags |= Ar, Nu(Ot | tn, Tg.bind(null, a, d, i, t), void 0, null);
      var v = nf();
      if (v === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Rs(v, Fi) || Cg(a, t, i);
    }
    return i;
  }
  function Cg(e, t, n) {
    e.flags |= Pf;
    var a = {
      getSnapshot: t,
      value: n
    }, r = Xe.updateQueue;
    if (r === null)
      r = Rg(), Xe.updateQueue = r, r.stores = [a];
    else {
      var i = r.stores;
      i === null ? r.stores = [a] : i.push(a);
    }
  }
  function Tg(e, t, n, a) {
    t.value = n, t.getSnapshot = a, wg(t) && jg(e);
  }
  function Dg(e, t, n) {
    var a = function() {
      wg(t) && jg(e);
    };
    return n(a);
  }
  function wg(e) {
    var t = e.getSnapshot, n = e.value;
    try {
      var a = t();
      return !Wn(n, a);
    } catch {
      return !0;
    }
  }
  function jg(e) {
    var t = kn(e, Se);
    t !== null && zt(t, e, Se, it);
  }
  function Tc(e) {
    var t = Ga();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: B,
      dispatch: null,
      lastRenderedReducer: Pp,
      lastRenderedState: e
    };
    t.queue = n;
    var a = n.dispatch = OT.bind(null, Xe, n);
    return [t.memoizedState, a];
  }
  function Gp(e) {
    return Yp(Pp);
  }
  function Wp(e) {
    return Ip(Pp);
  }
  function Nu(e, t, n, a) {
    var r = {
      tag: e,
      create: t,
      destroy: n,
      deps: a,
      // Circular
      next: null
    }, i = Xe.updateQueue;
    if (i === null)
      i = Rg(), Xe.updateQueue = i, i.lastEffect = r.next = r;
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
  function Qp(e) {
    var t = Ga();
    {
      var n = {
        current: e
      };
      return t.memoizedState = n, n;
    }
  }
  function Dc(e) {
    var t = ua();
    return t.memoizedState;
  }
  function xu(e, t, n, a) {
    var r = Ga(), i = a === void 0 ? null : a;
    Xe.flags |= e, r.memoizedState = Nu(Ot | t, n, void 0, i);
  }
  function wc(e, t, n, a) {
    var r = ua(), i = a === void 0 ? null : a, l = void 0;
    if (Mt !== null) {
      var o = Mt.memoizedState;
      if (l = o.destroy, i !== null) {
        var u = o.deps;
        if (Bp(i, u)) {
          r.memoizedState = Nu(t, n, l, i);
          return;
        }
      }
    }
    Xe.flags |= e, r.memoizedState = Nu(Ot | t, n, l, i);
  }
  function jc(e, t) {
    return (Xe.mode & Pa) !== he ? xu(qf | Ar | If, tn, e, t) : xu(Ar | If, tn, e, t);
  }
  function Ru(e, t) {
    return wc(Ar, tn, e, t);
  }
  function Kp(e, t) {
    return xu(Ye, qa, e, t);
  }
  function _c(e, t) {
    return wc(Ye, qa, e, t);
  }
  function Xp(e, t) {
    var n = Ye;
    return n |= Ni, (Xe.mode & Pa) !== he && (n |= Vr), xu(n, Lt, e, t);
  }
  function Oc(e, t) {
    return wc(Ye, Lt, e, t);
  }
  function _g(e, t) {
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
  function Jp(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null, r = Ye;
    return r |= Ni, (Xe.mode & Pa) !== he && (r |= Vr), xu(r, Lt, _g.bind(null, t, e), a);
  }
  function Lc(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return wc(Ye, Lt, _g.bind(null, t, e), a);
  }
  function DT(e, t) {
  }
  var Mc = DT;
  function Zp(e, t) {
    var n = Ga(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function Ac(e, t) {
    var n = ua(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Bp(a, i))
        return r[0];
    }
    return n.memoizedState = [e, a], e;
  }
  function ev(e, t) {
    var n = Ga(), a = t === void 0 ? null : t, r = e();
    return n.memoizedState = [r, a], r;
  }
  function Vc(e, t) {
    var n = ua(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Bp(a, i))
        return r[0];
    }
    var l = e();
    return n.memoizedState = [l, a], l;
  }
  function tv(e) {
    var t = Ga();
    return t.memoizedState = e, e;
  }
  function Og(e) {
    var t = ua(), n = Mt, a = n.memoizedState;
    return Mg(t, a, e);
  }
  function Lg(e) {
    var t = ua();
    if (Mt === null)
      return t.memoizedState = e, e;
    var n = Mt.memoizedState;
    return Mg(t, n, e);
  }
  function Mg(e, t, n) {
    var a = !dx(Fi);
    if (a) {
      if (!Wn(n, t)) {
        var r = jh();
        Xe.lanes = we(Xe.lanes, r), Pu(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, _u()), e.memoizedState = n, n;
  }
  function wT(e, t, n) {
    var a = Na();
    Gt(Sx(a, vr)), e(!0);
    var r = bu.transition;
    bu.transition = {};
    var i = bu.transition;
    bu.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (Gt(a), bu.transition = r, r === null && i._updatedFibers) {
        var l = i._updatedFibers.size;
        l > 10 && D("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function nv() {
    var e = Tc(!1), t = e[0], n = e[1], a = wT.bind(null, n), r = Ga();
    return r.memoizedState = a, [t, a];
  }
  function Ag() {
    var e = Gp(), t = e[0], n = ua(), a = n.memoizedState;
    return [t, a];
  }
  function Vg() {
    var e = Wp(), t = e[0], n = ua(), a = n.memoizedState;
    return [t, a];
  }
  var Ug = !1;
  function jT() {
    return Ug;
  }
  function av() {
    var e = Ga(), t = nf(), n = t.identifierPrefix, a;
    if (en()) {
      var r = q0();
      a = ":" + n + "R" + r;
      var i = Su++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var l = RT++;
      a = ":" + n + "r" + l.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function Uc() {
    var e = ua(), t = e.memoizedState;
    return t;
  }
  function _T(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ti(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (kg(e))
      zg(t, r);
    else {
      var i = dg(e, t, r, a);
      if (i !== null) {
        var l = jn();
        zt(i, e, a, l), Fg(i, t, a);
      }
    }
    Hg(e, a);
  }
  function OT(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ti(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (kg(e))
      zg(t, r);
    else {
      var i = e.alternate;
      if (e.lanes === B && (i === null || i.lanes === B)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var o;
          o = ae.current, ae.current = Da;
          try {
            var u = t.lastRenderedState, d = l(u, n);
            if (r.hasEagerState = !0, r.eagerState = d, Wn(d, u)) {
              mT(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            ae.current = o;
          }
        }
      }
      var v = dg(e, t, r, a);
      if (v !== null) {
        var N = jn();
        zt(v, e, a, N), Fg(v, t, a);
      }
    }
    Hg(e, a);
  }
  function kg(e) {
    var t = e.alternate;
    return e === Xe || t !== null && t === Xe;
  }
  function zg(e, t) {
    Eu = Rc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Fg(e, t, n) {
    if (wh(n)) {
      var a = t.lanes;
      a = _h(a, e.pendingLanes);
      var r = we(a, n);
      t.lanes = r, Nd(e, r);
    }
  }
  function Hg(e, t, n) {
    Xf(e, t);
  }
  var kc = {
    readContext: Tt,
    useCallback: hn,
    useContext: hn,
    useEffect: hn,
    useImperativeHandle: hn,
    useInsertionEffect: hn,
    useLayoutEffect: hn,
    useMemo: hn,
    useReducer: hn,
    useRef: hn,
    useState: hn,
    useDebugValue: hn,
    useDeferredValue: hn,
    useTransition: hn,
    useMutableSource: hn,
    useSyncExternalStore: hn,
    useId: hn,
    unstable_isNewReconciler: sn
  }, Bg = null, Pg = null, $g = null, Yg = null, Wa = null, Da = null, zc = null;
  {
    var rv = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, Ne = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Bg = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return k = "useCallback", qe(), Hl(t), Zp(e, t);
      },
      useContext: function(e) {
        return k = "useContext", qe(), Tt(e);
      },
      useEffect: function(e, t) {
        return k = "useEffect", qe(), Hl(t), jc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return k = "useImperativeHandle", qe(), Hl(n), Jp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return k = "useInsertionEffect", qe(), Hl(t), Kp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return k = "useLayoutEffect", qe(), Hl(t), Xp(e, t);
      },
      useMemo: function(e, t) {
        k = "useMemo", qe(), Hl(t);
        var n = ae.current;
        ae.current = Wa;
        try {
          return ev(e, t);
        } finally {
          ae.current = n;
        }
      },
      useReducer: function(e, t, n) {
        k = "useReducer", qe();
        var a = ae.current;
        ae.current = Wa;
        try {
          return $p(e, t, n);
        } finally {
          ae.current = a;
        }
      },
      useRef: function(e) {
        return k = "useRef", qe(), Qp(e);
      },
      useState: function(e) {
        k = "useState", qe();
        var t = ae.current;
        ae.current = Wa;
        try {
          return Tc(e);
        } finally {
          ae.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return k = "useDebugValue", qe(), void 0;
      },
      useDeferredValue: function(e) {
        return k = "useDeferredValue", qe(), tv(e);
      },
      useTransition: function() {
        return k = "useTransition", qe(), nv();
      },
      useMutableSource: function(e, t, n) {
        return k = "useMutableSource", qe(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return k = "useSyncExternalStore", qe(), qp(e, t, n);
      },
      useId: function() {
        return k = "useId", qe(), av();
      },
      unstable_isNewReconciler: sn
    }, Pg = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return k = "useCallback", Q(), Zp(e, t);
      },
      useContext: function(e) {
        return k = "useContext", Q(), Tt(e);
      },
      useEffect: function(e, t) {
        return k = "useEffect", Q(), jc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return k = "useImperativeHandle", Q(), Jp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return k = "useInsertionEffect", Q(), Kp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return k = "useLayoutEffect", Q(), Xp(e, t);
      },
      useMemo: function(e, t) {
        k = "useMemo", Q();
        var n = ae.current;
        ae.current = Wa;
        try {
          return ev(e, t);
        } finally {
          ae.current = n;
        }
      },
      useReducer: function(e, t, n) {
        k = "useReducer", Q();
        var a = ae.current;
        ae.current = Wa;
        try {
          return $p(e, t, n);
        } finally {
          ae.current = a;
        }
      },
      useRef: function(e) {
        return k = "useRef", Q(), Qp(e);
      },
      useState: function(e) {
        k = "useState", Q();
        var t = ae.current;
        ae.current = Wa;
        try {
          return Tc(e);
        } finally {
          ae.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return k = "useDebugValue", Q(), void 0;
      },
      useDeferredValue: function(e) {
        return k = "useDeferredValue", Q(), tv(e);
      },
      useTransition: function() {
        return k = "useTransition", Q(), nv();
      },
      useMutableSource: function(e, t, n) {
        return k = "useMutableSource", Q(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return k = "useSyncExternalStore", Q(), qp(e, t, n);
      },
      useId: function() {
        return k = "useId", Q(), av();
      },
      unstable_isNewReconciler: sn
    }, $g = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return k = "useCallback", Q(), Ac(e, t);
      },
      useContext: function(e) {
        return k = "useContext", Q(), Tt(e);
      },
      useEffect: function(e, t) {
        return k = "useEffect", Q(), Ru(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return k = "useImperativeHandle", Q(), Lc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return k = "useInsertionEffect", Q(), _c(e, t);
      },
      useLayoutEffect: function(e, t) {
        return k = "useLayoutEffect", Q(), Oc(e, t);
      },
      useMemo: function(e, t) {
        k = "useMemo", Q();
        var n = ae.current;
        ae.current = Da;
        try {
          return Vc(e, t);
        } finally {
          ae.current = n;
        }
      },
      useReducer: function(e, t, n) {
        k = "useReducer", Q();
        var a = ae.current;
        ae.current = Da;
        try {
          return Yp(e, t, n);
        } finally {
          ae.current = a;
        }
      },
      useRef: function(e) {
        return k = "useRef", Q(), Dc();
      },
      useState: function(e) {
        k = "useState", Q();
        var t = ae.current;
        ae.current = Da;
        try {
          return Gp(e);
        } finally {
          ae.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return k = "useDebugValue", Q(), Mc();
      },
      useDeferredValue: function(e) {
        return k = "useDeferredValue", Q(), Og(e);
      },
      useTransition: function() {
        return k = "useTransition", Q(), Ag();
      },
      useMutableSource: function(e, t, n) {
        return k = "useMutableSource", Q(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return k = "useSyncExternalStore", Q(), Cc(e, t);
      },
      useId: function() {
        return k = "useId", Q(), Uc();
      },
      unstable_isNewReconciler: sn
    }, Yg = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return k = "useCallback", Q(), Ac(e, t);
      },
      useContext: function(e) {
        return k = "useContext", Q(), Tt(e);
      },
      useEffect: function(e, t) {
        return k = "useEffect", Q(), Ru(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return k = "useImperativeHandle", Q(), Lc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return k = "useInsertionEffect", Q(), _c(e, t);
      },
      useLayoutEffect: function(e, t) {
        return k = "useLayoutEffect", Q(), Oc(e, t);
      },
      useMemo: function(e, t) {
        k = "useMemo", Q();
        var n = ae.current;
        ae.current = zc;
        try {
          return Vc(e, t);
        } finally {
          ae.current = n;
        }
      },
      useReducer: function(e, t, n) {
        k = "useReducer", Q();
        var a = ae.current;
        ae.current = zc;
        try {
          return Ip(e, t, n);
        } finally {
          ae.current = a;
        }
      },
      useRef: function(e) {
        return k = "useRef", Q(), Dc();
      },
      useState: function(e) {
        k = "useState", Q();
        var t = ae.current;
        ae.current = zc;
        try {
          return Wp(e);
        } finally {
          ae.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return k = "useDebugValue", Q(), Mc();
      },
      useDeferredValue: function(e) {
        return k = "useDeferredValue", Q(), Lg(e);
      },
      useTransition: function() {
        return k = "useTransition", Q(), Vg();
      },
      useMutableSource: function(e, t, n) {
        return k = "useMutableSource", Q(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return k = "useSyncExternalStore", Q(), Cc(e, t);
      },
      useId: function() {
        return k = "useId", Q(), Uc();
      },
      unstable_isNewReconciler: sn
    }, Wa = {
      readContext: function(e) {
        return rv(), Tt(e);
      },
      useCallback: function(e, t) {
        return k = "useCallback", Ne(), qe(), Zp(e, t);
      },
      useContext: function(e) {
        return k = "useContext", Ne(), qe(), Tt(e);
      },
      useEffect: function(e, t) {
        return k = "useEffect", Ne(), qe(), jc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return k = "useImperativeHandle", Ne(), qe(), Jp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return k = "useInsertionEffect", Ne(), qe(), Kp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return k = "useLayoutEffect", Ne(), qe(), Xp(e, t);
      },
      useMemo: function(e, t) {
        k = "useMemo", Ne(), qe();
        var n = ae.current;
        ae.current = Wa;
        try {
          return ev(e, t);
        } finally {
          ae.current = n;
        }
      },
      useReducer: function(e, t, n) {
        k = "useReducer", Ne(), qe();
        var a = ae.current;
        ae.current = Wa;
        try {
          return $p(e, t, n);
        } finally {
          ae.current = a;
        }
      },
      useRef: function(e) {
        return k = "useRef", Ne(), qe(), Qp(e);
      },
      useState: function(e) {
        k = "useState", Ne(), qe();
        var t = ae.current;
        ae.current = Wa;
        try {
          return Tc(e);
        } finally {
          ae.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return k = "useDebugValue", Ne(), qe(), void 0;
      },
      useDeferredValue: function(e) {
        return k = "useDeferredValue", Ne(), qe(), tv(e);
      },
      useTransition: function() {
        return k = "useTransition", Ne(), qe(), nv();
      },
      useMutableSource: function(e, t, n) {
        return k = "useMutableSource", Ne(), qe(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return k = "useSyncExternalStore", Ne(), qe(), qp(e, t, n);
      },
      useId: function() {
        return k = "useId", Ne(), qe(), av();
      },
      unstable_isNewReconciler: sn
    }, Da = {
      readContext: function(e) {
        return rv(), Tt(e);
      },
      useCallback: function(e, t) {
        return k = "useCallback", Ne(), Q(), Ac(e, t);
      },
      useContext: function(e) {
        return k = "useContext", Ne(), Q(), Tt(e);
      },
      useEffect: function(e, t) {
        return k = "useEffect", Ne(), Q(), Ru(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return k = "useImperativeHandle", Ne(), Q(), Lc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return k = "useInsertionEffect", Ne(), Q(), _c(e, t);
      },
      useLayoutEffect: function(e, t) {
        return k = "useLayoutEffect", Ne(), Q(), Oc(e, t);
      },
      useMemo: function(e, t) {
        k = "useMemo", Ne(), Q();
        var n = ae.current;
        ae.current = Da;
        try {
          return Vc(e, t);
        } finally {
          ae.current = n;
        }
      },
      useReducer: function(e, t, n) {
        k = "useReducer", Ne(), Q();
        var a = ae.current;
        ae.current = Da;
        try {
          return Yp(e, t, n);
        } finally {
          ae.current = a;
        }
      },
      useRef: function(e) {
        return k = "useRef", Ne(), Q(), Dc();
      },
      useState: function(e) {
        k = "useState", Ne(), Q();
        var t = ae.current;
        ae.current = Da;
        try {
          return Gp(e);
        } finally {
          ae.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return k = "useDebugValue", Ne(), Q(), Mc();
      },
      useDeferredValue: function(e) {
        return k = "useDeferredValue", Ne(), Q(), Og(e);
      },
      useTransition: function() {
        return k = "useTransition", Ne(), Q(), Ag();
      },
      useMutableSource: function(e, t, n) {
        return k = "useMutableSource", Ne(), Q(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return k = "useSyncExternalStore", Ne(), Q(), Cc(e, t);
      },
      useId: function() {
        return k = "useId", Ne(), Q(), Uc();
      },
      unstable_isNewReconciler: sn
    }, zc = {
      readContext: function(e) {
        return rv(), Tt(e);
      },
      useCallback: function(e, t) {
        return k = "useCallback", Ne(), Q(), Ac(e, t);
      },
      useContext: function(e) {
        return k = "useContext", Ne(), Q(), Tt(e);
      },
      useEffect: function(e, t) {
        return k = "useEffect", Ne(), Q(), Ru(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return k = "useImperativeHandle", Ne(), Q(), Lc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return k = "useInsertionEffect", Ne(), Q(), _c(e, t);
      },
      useLayoutEffect: function(e, t) {
        return k = "useLayoutEffect", Ne(), Q(), Oc(e, t);
      },
      useMemo: function(e, t) {
        k = "useMemo", Ne(), Q();
        var n = ae.current;
        ae.current = Da;
        try {
          return Vc(e, t);
        } finally {
          ae.current = n;
        }
      },
      useReducer: function(e, t, n) {
        k = "useReducer", Ne(), Q();
        var a = ae.current;
        ae.current = Da;
        try {
          return Ip(e, t, n);
        } finally {
          ae.current = a;
        }
      },
      useRef: function(e) {
        return k = "useRef", Ne(), Q(), Dc();
      },
      useState: function(e) {
        k = "useState", Ne(), Q();
        var t = ae.current;
        ae.current = Da;
        try {
          return Wp(e);
        } finally {
          ae.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return k = "useDebugValue", Ne(), Q(), Mc();
      },
      useDeferredValue: function(e) {
        return k = "useDeferredValue", Ne(), Q(), Lg(e);
      },
      useTransition: function() {
        return k = "useTransition", Ne(), Q(), Vg();
      },
      useMutableSource: function(e, t, n) {
        return k = "useMutableSource", Ne(), Q(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return k = "useSyncExternalStore", Ne(), Q(), Cc(e, t);
      },
      useId: function() {
        return k = "useId", Ne(), Q(), Uc();
      },
      unstable_isNewReconciler: sn
    };
  }
  var Xr = p.unstable_now, Ig = 0, Fc = -1, Cu = -1, Hc = -1, iv = !1, Bc = !1;
  function qg() {
    return iv;
  }
  function LT() {
    Bc = !0;
  }
  function MT() {
    iv = !1, Bc = !1;
  }
  function AT() {
    iv = Bc, Bc = !1;
  }
  function Gg() {
    return Ig;
  }
  function Wg() {
    Ig = Xr();
  }
  function lv(e) {
    Cu = Xr(), e.actualStartTime < 0 && (e.actualStartTime = Xr());
  }
  function Qg(e) {
    Cu = -1;
  }
  function Pc(e, t) {
    if (Cu >= 0) {
      var n = Xr() - Cu;
      e.actualDuration += n, t && (e.selfBaseDuration = n), Cu = -1;
    }
  }
  function Qa(e) {
    if (Fc >= 0) {
      var t = Xr() - Fc;
      Fc = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case R:
            var a = n.stateNode;
            a.effectDuration += t;
            return;
          case ie:
            var r = n.stateNode;
            r.effectDuration += t;
            return;
        }
        n = n.return;
      }
    }
  }
  function ov(e) {
    if (Hc >= 0) {
      var t = Xr() - Hc;
      Hc = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case R:
            var a = n.stateNode;
            a !== null && (a.passiveEffectDuration += t);
            return;
          case ie:
            var r = n.stateNode;
            r !== null && (r.passiveEffectDuration += t);
            return;
        }
        n = n.return;
      }
    }
  }
  function Ka() {
    Fc = Xr();
  }
  function uv() {
    Hc = Xr();
  }
  function sv(e) {
    for (var t = e.child; t; )
      e.actualDuration += t.actualDuration, t = t.sibling;
  }
  function wa(e, t) {
    if (e && e.defaultProps) {
      var n = Oe({}, t), a = e.defaultProps;
      for (var r in a)
        n[r] === void 0 && (n[r] = a[r]);
      return n;
    }
    return t;
  }
  var cv = {}, fv, dv, pv, vv, mv, Kg, $c, hv, yv, gv, Tu;
  {
    fv = /* @__PURE__ */ new Set(), dv = /* @__PURE__ */ new Set(), pv = /* @__PURE__ */ new Set(), vv = /* @__PURE__ */ new Set(), hv = /* @__PURE__ */ new Set(), mv = /* @__PURE__ */ new Set(), yv = /* @__PURE__ */ new Set(), gv = /* @__PURE__ */ new Set(), Tu = /* @__PURE__ */ new Set();
    var Xg = /* @__PURE__ */ new Set();
    $c = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        Xg.has(n) || (Xg.add(n), f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, Kg = function(e, t) {
      if (t === void 0) {
        var n = $e(e) || "Component";
        mv.has(n) || (mv.add(n), f("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", n));
      }
    }, Object.defineProperty(cv, "_processChildContext", {
      enumerable: !1,
      value: function() {
        throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
      }
    }), Object.freeze(cv);
  }
  function bv(e, t, n, a) {
    var r = e.memoizedState, i = n(a, r);
    {
      if (e.mode & Et) {
        It(!0);
        try {
          i = n(a, r);
        } finally {
          It(!1);
        }
      }
      Kg(t, i);
    }
    var l = i == null ? r : Oe({}, r, i);
    if (e.memoizedState = l, e.lanes === B) {
      var o = e.updateQueue;
      o.baseState = l;
    }
  }
  var Ev = {
    isMounted: CN,
    enqueueSetState: function(e, t, n) {
      var a = sl(e), r = jn(), i = ti(a), l = Sr(r, i);
      l.payload = t, n != null && ($c(n, "setState"), l.callback = n);
      var o = Gr(a, l, i);
      o !== null && (zt(o, a, i, r), gc(o, a, i)), Xf(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = sl(e), r = jn(), i = ti(a), l = Sr(r, i);
      l.tag = vg, l.payload = t, n != null && ($c(n, "replaceState"), l.callback = n);
      var o = Gr(a, l, i);
      o !== null && (zt(o, a, i, r), gc(o, a, i)), Xf(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = sl(e), a = jn(), r = ti(n), i = Sr(a, r);
      i.tag = mc, t != null && ($c(t, "forceUpdate"), i.callback = t);
      var l = Gr(n, i, r);
      l !== null && (zt(l, n, r, a), gc(l, n, r)), nx(n, r);
    }
  };
  function Jg(e, t, n, a, r, i, l) {
    var o = e.stateNode;
    if (typeof o.shouldComponentUpdate == "function") {
      var u = o.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & Et) {
          It(!0);
          try {
            u = o.shouldComponentUpdate(a, i, l);
          } finally {
            It(!1);
          }
        }
        u === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", $e(t) || "Component");
      }
      return u;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Wo(n, a) || !Wo(r, i) : !0;
  }
  function VT(e, t, n) {
    var a = e.stateNode;
    {
      var r = $e(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Et) === he && (Tu.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Et) === he && (Tu.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !yv.has(t) && (yv.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", $e(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !pv.has(t) && (pv.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", $e(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var o = a.state;
      o && (typeof o != "object" || Le(o)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function Zg(e, t) {
    t.updater = Ev, e.stateNode = t, SN(t, e), t._reactInternalInstance = cv;
  }
  function eb(e, t, n) {
    var a = !1, r = Qn, i = Qn, l = t.contextType;
    if ("contextType" in t) {
      var o = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === X && l._context === void 0
      );
      if (!o && !gv.has(t)) {
        gv.add(t);
        var u = "";
        l === void 0 ? u = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? u = " However, it is set to a " + typeof l + "." : l.$$typeof === P ? u = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? u = " Did you accidentally pass the Context.Consumer instead?" : u = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", $e(t) || "Component", u);
      }
    }
    if (typeof l == "object" && l !== null)
      i = Tt(l);
    else {
      r = wl(e, t, !0);
      var d = t.contextTypes;
      a = d != null, i = a ? jl(e, r) : Qn;
    }
    var v = new t(n, i);
    if (e.mode & Et) {
      It(!0);
      try {
        v = new t(n, i);
      } finally {
        It(!1);
      }
    }
    var N = e.memoizedState = v.state !== null && v.state !== void 0 ? v.state : null;
    Zg(e, v);
    {
      if (typeof t.getDerivedStateFromProps == "function" && N === null) {
        var S = $e(t) || "Component";
        dv.has(S) || (dv.add(S), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", S, v.state === null ? "null" : "undefined", S));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof v.getSnapshotBeforeUpdate == "function") {
        var j = null, O = null, V = null;
        if (typeof v.componentWillMount == "function" && v.componentWillMount.__suppressDeprecationWarning !== !0 ? j = "componentWillMount" : typeof v.UNSAFE_componentWillMount == "function" && (j = "UNSAFE_componentWillMount"), typeof v.componentWillReceiveProps == "function" && v.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? O = "componentWillReceiveProps" : typeof v.UNSAFE_componentWillReceiveProps == "function" && (O = "UNSAFE_componentWillReceiveProps"), typeof v.componentWillUpdate == "function" && v.componentWillUpdate.__suppressDeprecationWarning !== !0 ? V = "componentWillUpdate" : typeof v.UNSAFE_componentWillUpdate == "function" && (V = "UNSAFE_componentWillUpdate"), j !== null || O !== null || V !== null) {
          var J = $e(t) || "Component", ve = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          vv.has(J) || (vv.add(J), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, J, ve, j !== null ? `
  ` + j : "", O !== null ? `
  ` + O : "", V !== null ? `
  ` + V : ""));
        }
      }
    }
    return a && $y(e, r, i), v;
  }
  function UT(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Te(e) || "Component"), Ev.enqueueReplaceState(t, t.state, null));
  }
  function tb(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = Te(e) || "Component";
        fv.has(i) || (fv.add(i), f("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      Ev.enqueueReplaceState(t, t.state, null);
    }
  }
  function Sv(e, t, n, a) {
    VT(e, t, n);
    var r = e.stateNode;
    r.props = n, r.state = e.memoizedState, r.refs = {}, _p(e);
    var i = t.contextType;
    if (typeof i == "object" && i !== null)
      r.context = Tt(i);
    else {
      var l = wl(e, t, !0);
      r.context = jl(e, l);
    }
    {
      if (r.state === n) {
        var o = $e(t) || "Component";
        hv.has(o) || (hv.add(o), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o));
      }
      e.mode & Et && Ca.recordLegacyContextWarning(e, r), Ca.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var u = t.getDerivedStateFromProps;
    if (typeof u == "function" && (bv(e, t, u, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (UT(e, r), bc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var d = Ye;
      d |= Ni, (e.mode & Pa) !== he && (d |= Vr), e.flags |= d;
    }
  }
  function kT(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, o = t.contextType, u = Qn;
    if (typeof o == "object" && o !== null)
      u = Tt(o);
    else {
      var d = wl(e, t, !0);
      u = jl(e, d);
    }
    var v = t.getDerivedStateFromProps, N = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !N && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== u) && tb(e, r, n, u), hg();
    var S = e.memoizedState, j = r.state = S;
    if (bc(e, n, r, a), j = e.memoizedState, i === n && S === j && !ec() && !Ec()) {
      if (typeof r.componentDidMount == "function") {
        var O = Ye;
        O |= Ni, (e.mode & Pa) !== he && (O |= Vr), e.flags |= O;
      }
      return !1;
    }
    typeof v == "function" && (bv(e, t, v, n), j = e.memoizedState);
    var V = Ec() || Jg(e, t, i, n, S, j, u);
    if (V) {
      if (!N && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var J = Ye;
        J |= Ni, (e.mode & Pa) !== he && (J |= Vr), e.flags |= J;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var ve = Ye;
        ve |= Ni, (e.mode & Pa) !== he && (ve |= Vr), e.flags |= ve;
      }
      e.memoizedProps = n, e.memoizedState = j;
    }
    return r.props = n, r.state = j, r.context = u, V;
  }
  function zT(e, t, n, a, r) {
    var i = t.stateNode;
    mg(e, t);
    var l = t.memoizedProps, o = t.type === t.elementType ? l : wa(t.type, l);
    i.props = o;
    var u = t.pendingProps, d = i.context, v = n.contextType, N = Qn;
    if (typeof v == "object" && v !== null)
      N = Tt(v);
    else {
      var S = wl(t, n, !0);
      N = jl(t, S);
    }
    var j = n.getDerivedStateFromProps, O = typeof j == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !O && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== u || d !== N) && tb(t, i, a, N), hg();
    var V = t.memoizedState, J = i.state = V;
    if (bc(t, a, i, r), J = t.memoizedState, l === u && V === J && !ec() && !Ec() && !da)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || V !== e.memoizedState) && (t.flags |= Ye), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || V !== e.memoizedState) && (t.flags |= fl), !1;
    typeof j == "function" && (bv(t, n, j, a), J = t.memoizedState);
    var ve = Ec() || Jg(t, n, o, a, V, J, N) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    da;
    return ve ? (!O && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, J, N), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, J, N)), typeof i.componentDidUpdate == "function" && (t.flags |= Ye), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= fl)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || V !== e.memoizedState) && (t.flags |= Ye), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || V !== e.memoizedState) && (t.flags |= fl), t.memoizedProps = a, t.memoizedState = J), i.props = a, i.state = J, i.context = N, ve;
  }
  function Hi(e, t) {
    return {
      value: e,
      source: t,
      stack: vi(t),
      digest: null
    };
  }
  function Nv(e, t, n) {
    return {
      value: e,
      source: null,
      stack: n ?? null,
      digest: t ?? null
    };
  }
  function FT(e, t) {
    return !0;
  }
  function xv(e, t) {
    try {
      var n = FT(e, t);
      if (n === !1)
        return;
      var a = t.value, r = t.source, i = t.stack, l = i !== null ? i : "";
      if (a != null && a._suppressLogging) {
        if (e.tag === x)
          return;
        console.error(a);
      }
      var o = r ? Te(r) : null, u = o ? "The above error occurred in the <" + o + "> component:" : "The above error occurred in one of your React components:", d;
      if (e.tag === R)
        d = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var v = Te(e) || "Anonymous";
        d = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + v + ".");
      }
      var N = u + `
` + l + `

` + ("" + d);
      console.error(N);
    } catch (S) {
      setTimeout(function() {
        throw S;
      });
    }
  }
  var HT = typeof WeakMap == "function" ? WeakMap : Map;
  function nb(e, t, n) {
    var a = Sr(it, n);
    a.tag = wp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Lw(r), xv(e, t);
    }, a;
  }
  function Rv(e, t, n) {
    var a = Sr(it, n);
    a.tag = wp;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      a.payload = function() {
        return r(i);
      }, a.callback = function() {
        pE(e), xv(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (a.callback = function() {
      pE(e), xv(e, t), typeof r != "function" && _w(this);
      var u = t.value, d = t.stack;
      this.componentDidCatch(u, {
        componentStack: d !== null ? d : ""
      }), typeof r != "function" && (In(e.lanes, Se) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Te(e) || "Unknown"));
    }), a;
  }
  function ab(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new HT(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = Mw.bind(null, e, t, n);
      Sa && $u(e, n), t.then(i, i);
    }
  }
  function BT(e, t, n, a) {
    var r = e.updateQueue;
    if (r === null) {
      var i = /* @__PURE__ */ new Set();
      i.add(n), e.updateQueue = i;
    } else
      r.add(n);
  }
  function PT(e, t) {
    var n = e.tag;
    if ((e.mode & Ue) === he && (n === w || n === I || n === ce)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function rb(e) {
    var t = e;
    do {
      if (t.tag === te && NT(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function ib(e, t, n, a, r) {
    if ((e.mode & Ue) === he) {
      if (e === t)
        e.flags |= Tn;
      else {
        if (e.flags |= Ie, n.flags |= $f, n.flags &= -52805, n.tag === x) {
          var i = n.alternate;
          if (i === null)
            n.tag = Fe;
          else {
            var l = Sr(it, Se);
            l.tag = mc, Gr(n, l, Se);
          }
        }
        n.lanes = we(n.lanes, Se);
      }
      return e;
    }
    return e.flags |= Tn, e.lanes = r, e;
  }
  function $T(e, t, n, a, r) {
    if (n.flags |= gs, Sa && $u(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      PT(n), en() && n.mode & Ue && Ky();
      var l = rb(t);
      if (l !== null) {
        l.flags &= ~cr, ib(l, t, n, e, r), l.mode & Ue && ab(e, i, r), BT(l, e, i);
        return;
      } else {
        if (!fx(r)) {
          ab(e, i, r), am();
          return;
        }
        var o = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = o;
      }
    } else if (en() && n.mode & Ue) {
      Ky();
      var u = rb(t);
      if (u !== null) {
        (u.flags & Tn) === ge && (u.flags |= cr), ib(u, t, n, e, r), hp(Hi(a, n));
        return;
      }
    }
    a = Hi(a, n), Nw(a);
    var d = t;
    do {
      switch (d.tag) {
        case R: {
          var v = a;
          d.flags |= Tn;
          var N = Mo(r);
          d.lanes = we(d.lanes, N);
          var S = nb(d, v, N);
          Op(d, S);
          return;
        }
        case x:
          var j = a, O = d.type, V = d.stateNode;
          if ((d.flags & Ie) === ge && (typeof O.getDerivedStateFromError == "function" || V !== null && typeof V.componentDidCatch == "function" && !rE(V))) {
            d.flags |= Tn;
            var J = Mo(r);
            d.lanes = we(d.lanes, J);
            var ve = Rv(d, j, J);
            Op(d, ve);
            return;
          }
          break;
      }
      d = d.return;
    } while (d !== null);
  }
  function YT() {
    return null;
  }
  var Du = h.ReactCurrentOwner, ja = !1, Cv, wu, Tv, Dv, wv, Bi, jv, Yc, ju;
  Cv = {}, wu = {}, Tv = {}, Dv = {}, wv = {}, Bi = !1, jv = {}, Yc = {}, ju = {};
  function Dn(e, t, n, a) {
    e === null ? t.child = ug(t, null, n, a) : t.child = Ml(t, e.child, n, a);
  }
  function IT(e, t, n, a) {
    t.child = Ml(t, e.child, null, a), t.child = Ml(t, null, n, a);
  }
  function lb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && xa(
        i,
        a,
        // Resolved props
        "prop",
        $e(n)
      );
    }
    var l = n.render, o = t.ref, u, d;
    Vl(t, r), Do(t);
    {
      if (Du.current = t, aa(!0), u = Bl(e, t, l, a, o, r), d = Pl(), t.mode & Et) {
        It(!0);
        try {
          u = Bl(e, t, l, a, o, r), d = Pl();
        } finally {
          It(!1);
        }
      }
      aa(!1);
    }
    return vl(), e !== null && !ja ? (Ng(e, t, r), Nr(e, t, r)) : (en() && d && cp(t), t.flags |= cl, Dn(e, t, u, r), t.child);
  }
  function ob(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (Kw(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Kl(i), t.tag = ce, t.type = l, Lv(t, i), ub(e, t, l, a, r);
      }
      {
        var o = i.propTypes;
        if (o && xa(
          o,
          a,
          // Resolved props
          "prop",
          $e(i)
        ), n.defaultProps !== void 0) {
          var u = $e(i) || "Unknown";
          ju[u] || (f("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", u), ju[u] = !0);
        }
      }
      var d = vm(n.type, null, a, t, t.mode, r);
      return d.ref = t.ref, d.return = t, t.child = d, d;
    }
    {
      var v = n.type, N = v.propTypes;
      N && xa(
        N,
        a,
        // Resolved props
        "prop",
        $e(v)
      );
    }
    var S = e.child, j = zv(e, r);
    if (!j) {
      var O = S.memoizedProps, V = n.compare;
      if (V = V !== null ? V : Wo, V(O, a) && e.ref === t.ref)
        return Nr(e, t, r);
    }
    t.flags |= cl;
    var J = qi(S, a);
    return J.ref = t.ref, J.return = t, t.child = J, J;
  }
  function ub(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === me) {
        var l = i, o = l._payload, u = l._init;
        try {
          i = u(o);
        } catch {
          i = null;
        }
        var d = i && i.propTypes;
        d && xa(
          d,
          a,
          // Resolved (SimpleMemoComponent has no defaultProps)
          "prop",
          $e(i)
        );
      }
    }
    if (e !== null) {
      var v = e.memoizedProps;
      if (Wo(v, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (ja = !1, t.pendingProps = a = v, zv(e, r))
          (e.flags & $f) !== ge && (ja = !0);
        else return t.lanes = e.lanes, Nr(e, t, r);
    }
    return _v(e, t, n, a, r);
  }
  function sb(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Bn)
      if ((t.mode & Ue) === he) {
        var l = {
          baseLanes: B,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, af(t, n);
      } else if (In(n, Yn)) {
        var N = {
          baseLanes: B,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = N;
        var S = i !== null ? i.baseLanes : n;
        af(t, S);
      } else {
        var o = null, u;
        if (i !== null) {
          var d = i.baseLanes;
          u = we(d, n);
        } else
          u = n;
        t.lanes = t.childLanes = Yn;
        var v = {
          baseLanes: u,
          cachePool: o,
          transitions: null
        };
        return t.memoizedState = v, t.updateQueue = null, af(t, u), null;
      }
    else {
      var j;
      i !== null ? (j = we(i.baseLanes, n), t.memoizedState = null) : j = n, af(t, j);
    }
    return Dn(e, t, r, n), t.child;
  }
  function qT(e, t, n) {
    var a = t.pendingProps;
    return Dn(e, t, a, n), t.child;
  }
  function GT(e, t, n) {
    var a = t.pendingProps.children;
    return Dn(e, t, a, n), t.child;
  }
  function WT(e, t, n) {
    {
      t.flags |= Ye;
      {
        var a = t.stateNode;
        a.effectDuration = 0, a.passiveEffectDuration = 0;
      }
    }
    var r = t.pendingProps, i = r.children;
    return Dn(e, t, i, n), t.child;
  }
  function cb(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= Ei, t.flags |= Yf);
  }
  function _v(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && xa(
        i,
        a,
        // Resolved props
        "prop",
        $e(n)
      );
    }
    var l;
    {
      var o = wl(t, n, !0);
      l = jl(t, o);
    }
    var u, d;
    Vl(t, r), Do(t);
    {
      if (Du.current = t, aa(!0), u = Bl(e, t, n, a, l, r), d = Pl(), t.mode & Et) {
        It(!0);
        try {
          u = Bl(e, t, n, a, l, r), d = Pl();
        } finally {
          It(!1);
        }
      }
      aa(!1);
    }
    return vl(), e !== null && !ja ? (Ng(e, t, r), Nr(e, t, r)) : (en() && d && cp(t), t.flags |= cl, Dn(e, t, u, r), t.child);
  }
  function fb(e, t, n, a, r) {
    {
      switch (fj(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, o = new l(t.memoizedProps, i.context), u = o.state;
          i.updater.enqueueSetState(i, u, null);
          break;
        }
        case !0: {
          t.flags |= Ie, t.flags |= Tn;
          var d = new Error("Simulated error coming from DevTools"), v = Mo(r);
          t.lanes = we(t.lanes, v);
          var N = Rv(t, Hi(d, t), v);
          Op(t, N);
          break;
        }
      }
      if (t.type !== t.elementType) {
        var S = n.propTypes;
        S && xa(
          S,
          a,
          // Resolved props
          "prop",
          $e(n)
        );
      }
    }
    var j;
    Ia(n) ? (j = !0, nc(t)) : j = !1, Vl(t, r);
    var O = t.stateNode, V;
    O === null ? (qc(e, t), eb(t, n, a), Sv(t, n, a, r), V = !0) : e === null ? V = kT(t, n, a, r) : V = zT(e, t, n, a, r);
    var J = Ov(e, t, n, V, j, r);
    {
      var ve = t.stateNode;
      V && ve.props !== a && (Bi || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Te(t) || "a component"), Bi = !0);
    }
    return J;
  }
  function Ov(e, t, n, a, r, i) {
    cb(e, t);
    var l = (t.flags & Ie) !== ge;
    if (!a && !l)
      return r && qy(t, n, !1), Nr(e, t, i);
    var o = t.stateNode;
    Du.current = t;
    var u;
    if (l && typeof n.getDerivedStateFromError != "function")
      u = null, Qg();
    else {
      Do(t);
      {
        if (aa(!0), u = o.render(), t.mode & Et) {
          It(!0);
          try {
            o.render();
          } finally {
            It(!1);
          }
        }
        aa(!1);
      }
      vl();
    }
    return t.flags |= cl, e !== null && l ? IT(e, t, u, i) : Dn(e, t, u, i), t.memoizedState = o.state, r && qy(t, n, !0), t.child;
  }
  function db(e) {
    var t = e.stateNode;
    t.pendingContext ? Yy(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Yy(e, t.context, !1), Lp(e, t.containerInfo);
  }
  function QT(e, t, n) {
    if (db(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    mg(e, t), bc(t, a, null, n);
    var l = t.memoizedState;
    t.stateNode;
    var o = l.element;
    if (r.isDehydrated) {
      var u = {
        element: o,
        isDehydrated: !1,
        cache: l.cache,
        pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
        transitions: l.transitions
      }, d = t.updateQueue;
      if (d.baseState = u, t.memoizedState = u, t.flags & cr) {
        var v = Hi(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return pb(e, t, o, n, v);
      } else if (o !== i) {
        var N = Hi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return pb(e, t, o, n, N);
      } else {
        J0(t);
        var S = ug(t, null, o, n);
        t.child = S;
        for (var j = S; j; )
          j.flags = j.flags & ~Ct | fr, j = j.sibling;
      }
    } else {
      if (Ll(), o === i)
        return Nr(e, t, n);
      Dn(e, t, o, n);
    }
    return t.child;
  }
  function pb(e, t, n, a, r) {
    return Ll(), hp(r), t.flags |= cr, Dn(e, t, n, a), t.child;
  }
  function KT(e, t, n) {
    bg(t), e === null && mp(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, o = Kd(a, r);
    return o ? l = null : i !== null && Kd(a, i) && (t.flags |= Co), cb(e, t), Dn(e, t, l, n), t.child;
  }
  function XT(e, t) {
    return e === null && mp(t), null;
  }
  function JT(e, t, n, a) {
    qc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, o = i._init, u = o(l);
    t.type = u;
    var d = t.tag = Xw(u), v = wa(u, r), N;
    switch (d) {
      case w:
        return Lv(t, u), t.type = u = Kl(u), N = _v(null, t, u, v, a), N;
      case x:
        return t.type = u = um(u), N = fb(null, t, u, v, a), N;
      case I:
        return t.type = u = sm(u), N = lb(null, t, u, v, a), N;
      case oe: {
        if (t.type !== t.elementType) {
          var S = u.propTypes;
          S && xa(
            S,
            v,
            // Resolved for outer only
            "prop",
            $e(u)
          );
        }
        return N = ob(
          null,
          t,
          u,
          wa(u.type, v),
          // The inner type can have defaults too
          a
        ), N;
      }
    }
    var j = "";
    throw u !== null && typeof u == "object" && u.$$typeof === me && (j = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + u + ". " + ("Lazy element type must resolve to a class or function." + j));
  }
  function ZT(e, t, n, a, r) {
    qc(e, t), t.tag = x;
    var i;
    return Ia(n) ? (i = !0, nc(t)) : i = !1, Vl(t, r), eb(t, n, a), Sv(t, n, a, r), Ov(null, t, n, !0, i, r);
  }
  function eD(e, t, n, a) {
    qc(e, t);
    var r = t.pendingProps, i;
    {
      var l = wl(t, n, !1);
      i = jl(t, l);
    }
    Vl(t, a);
    var o, u;
    Do(t);
    {
      if (n.prototype && typeof n.prototype.render == "function") {
        var d = $e(n) || "Unknown";
        Cv[d] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", d, d), Cv[d] = !0);
      }
      t.mode & Et && Ca.recordLegacyContextWarning(t, null), aa(!0), Du.current = t, o = Bl(null, t, n, r, i, a), u = Pl(), aa(!1);
    }
    if (vl(), t.flags |= cl, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0) {
      var v = $e(n) || "Unknown";
      wu[v] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", v, v, v), wu[v] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0
    ) {
      {
        var N = $e(n) || "Unknown";
        wu[N] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", N, N, N), wu[N] = !0);
      }
      t.tag = x, t.memoizedState = null, t.updateQueue = null;
      var S = !1;
      return Ia(n) ? (S = !0, nc(t)) : S = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, _p(t), Zg(t, o), Sv(t, n, r, a), Ov(null, t, n, !0, S, a);
    } else {
      if (t.tag = w, t.mode & Et) {
        It(!0);
        try {
          o = Bl(null, t, n, r, i, a), u = Pl();
        } finally {
          It(!1);
        }
      }
      return en() && u && cp(t), Dn(null, t, o, a), Lv(t, n), t.child;
    }
  }
  function Lv(e, t) {
    {
      if (t && t.childContextTypes && f("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var n = "", a = Lr();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), wv[r] || (wv[r] = !0, f("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = $e(t) || "Unknown";
        ju[l] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), ju[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var o = $e(t) || "Unknown";
        Dv[o] || (f("%s: Function components do not support getDerivedStateFromProps.", o), Dv[o] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var u = $e(t) || "Unknown";
        Tv[u] || (f("%s: Function components do not support contextType.", u), Tv[u] = !0);
      }
    }
  }
  var Mv = {
    dehydrated: null,
    treeContext: null,
    retryLane: qt
  };
  function Av(e) {
    return {
      baseLanes: e,
      cachePool: YT(),
      transitions: null
    };
  }
  function tD(e, t) {
    var n = null;
    return {
      baseLanes: we(e.baseLanes, t),
      cachePool: n,
      transitions: e.transitions
    };
  }
  function nD(e, t, n, a) {
    if (t !== null) {
      var r = t.memoizedState;
      if (r === null)
        return !1;
    }
    return Vp(e, gu);
  }
  function aD(e, t) {
    return Cs(e.childLanes, t);
  }
  function vb(e, t, n) {
    var a = t.pendingProps;
    dj(t) && (t.flags |= Ie);
    var r = Ta.current, i = !1, l = (t.flags & Ie) !== ge;
    if (l || nD(r, e) ? (i = !0, t.flags &= ~Ie) : (e === null || e.memoizedState !== null) && (r = ST(r, Sg)), r = kl(r), Qr(t, r), e === null) {
      mp(t);
      var o = t.memoizedState;
      if (o !== null) {
        var u = o.dehydrated;
        if (u !== null)
          return uD(t, u);
      }
      var d = a.children, v = a.fallback;
      if (i) {
        var N = rD(t, d, v, n), S = t.child;
        return S.memoizedState = Av(n), t.memoizedState = Mv, N;
      } else
        return Vv(t, d);
    } else {
      var j = e.memoizedState;
      if (j !== null) {
        var O = j.dehydrated;
        if (O !== null)
          return sD(e, t, l, a, O, j, n);
      }
      if (i) {
        var V = a.fallback, J = a.children, ve = lD(e, t, J, V, n), fe = t.child, ze = e.child.memoizedState;
        return fe.memoizedState = ze === null ? Av(n) : tD(ze, n), fe.childLanes = aD(e, n), t.memoizedState = Mv, ve;
      } else {
        var Me = a.children, C = iD(e, t, Me, n);
        return t.memoizedState = null, C;
      }
    }
  }
  function Vv(e, t, n) {
    var a = e.mode, r = {
      mode: "visible",
      children: t
    }, i = Uv(r, a);
    return i.return = e, e.child = i, i;
  }
  function rD(e, t, n, a) {
    var r = e.mode, i = e.child, l = {
      mode: "hidden",
      children: t
    }, o, u;
    return (r & Ue) === he && i !== null ? (o = i, o.childLanes = B, o.pendingProps = l, e.mode & Ke && (o.actualDuration = 0, o.actualStartTime = -1, o.selfBaseDuration = 0, o.treeBaseDuration = 0), u = ai(n, r, a, null)) : (o = Uv(l, r), u = ai(n, r, a, null)), o.return = e, u.return = e, o.sibling = u, e.child = o, u;
  }
  function Uv(e, t, n) {
    return mE(e, t, B, null);
  }
  function mb(e, t) {
    return qi(e, t);
  }
  function iD(e, t, n, a) {
    var r = e.child, i = r.sibling, l = mb(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & Ue) === he && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
      var o = t.deletions;
      o === null ? (t.deletions = [i], t.flags |= bi) : o.push(i);
    }
    return t.child = l, l;
  }
  function lD(e, t, n, a, r) {
    var i = t.mode, l = e.child, o = l.sibling, u = {
      mode: "hidden",
      children: n
    }, d;
    if (
      // In legacy mode, we commit the primary tree as if it successfully
      // completed, even though it's in an inconsistent state.
      (i & Ue) === he && // Make sure we're on the second pass, i.e. the primary child fragment was
      // already cloned. In legacy mode, the only case where this isn't true is
      // when DevTools forces us to display a fallback; we skip the first render
      // pass entirely and go straight to rendering the fallback. (In Concurrent
      // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
      // only codepath.)
      t.child !== l
    ) {
      var v = t.child;
      d = v, d.childLanes = B, d.pendingProps = u, t.mode & Ke && (d.actualDuration = 0, d.actualStartTime = -1, d.selfBaseDuration = l.selfBaseDuration, d.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      d = mb(l, u), d.subtreeFlags = l.subtreeFlags & dr;
    var N;
    return o !== null ? N = qi(o, a) : (N = ai(a, i, r, null), N.flags |= Ct), N.return = t, d.return = t, d.sibling = N, t.child = d, N;
  }
  function Ic(e, t, n, a) {
    a !== null && hp(a), Ml(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = Vv(t, i);
    return l.flags |= Ct, t.memoizedState = null, l;
  }
  function oD(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, o = Uv(l, i), u = ai(a, i, r, null);
    return u.flags |= Ct, o.return = t, u.return = t, o.sibling = u, t.child = o, (t.mode & Ue) !== he && Ml(t, e.child, null, r), u;
  }
  function uD(e, t, n) {
    return (e.mode & Ue) === he ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Se) : ep(t) ? e.lanes = Ci : e.lanes = Yn, null;
  }
  function sD(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & cr) {
        t.flags &= ~cr;
        var C = Nv(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return Ic(e, t, l, C);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= Ie, null;
        var U = a.children, T = a.fallback, $ = oD(e, t, U, T, l), re = t.child;
        return re.memoizedState = Av(l), t.memoizedState = Mv, $;
      }
    else {
      if (K0(), (t.mode & Ue) === he)
        return Ic(
          e,
          t,
          l,
          // TODO: When we delete legacy mode, we should make this error argument
          // required — every concurrent mode path that causes hydration to
          // de-opt to client rendering should have an error message.
          null
        );
      if (ep(r)) {
        var o, u, d;
        {
          var v = p0(r);
          o = v.digest, u = v.message, d = v.stack;
        }
        var N;
        u ? N = new Error(u) : N = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var S = Nv(N, o, d);
        return Ic(e, t, l, S);
      }
      var j = In(l, e.childLanes);
      if (ja || j) {
        var O = nf();
        if (O !== null) {
          var V = bx(O, l);
          if (V !== qt && V !== i.retryLane) {
            i.retryLane = V;
            var J = it;
            kn(e, V), zt(O, e, V, J);
          }
        }
        am();
        var ve = Nv(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Ic(e, t, l, ve);
      } else if (zy(r)) {
        t.flags |= Ie, t.child = e.child;
        var fe = Aw.bind(null, e);
        return v0(r, fe), null;
      } else {
        Z0(t, r, i.treeContext);
        var ze = a.children, Me = Vv(t, ze);
        return Me.flags |= fr, Me;
      }
    }
  }
  function hb(e, t, n) {
    e.lanes = we(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = we(a.lanes, t)), Tp(e.return, t, n);
  }
  function cD(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === te) {
        var r = a.memoizedState;
        r !== null && hb(a, n, e);
      } else if (a.tag === Ze)
        hb(a, n, e);
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
  function fD(e) {
    for (var t = e, n = null; t !== null; ) {
      var a = t.alternate;
      a !== null && xc(a) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function dD(e) {
    if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !jv[e])
      if (jv[e] = !0, typeof e == "string")
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
  function pD(e, t) {
    e !== void 0 && !Yc[e] && (e !== "collapsed" && e !== "hidden" ? (Yc[e] = !0, f('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Yc[e] = !0, f('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function yb(e, t) {
    {
      var n = Le(e), a = !n && typeof ba(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function vD(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (Le(e)) {
        for (var n = 0; n < e.length; n++)
          if (!yb(e[n], n))
            return;
      } else {
        var a = ba(e);
        if (typeof a == "function") {
          var r = a.call(e);
          if (r)
            for (var i = r.next(), l = 0; !i.done; i = r.next()) {
              if (!yb(i.value, l))
                return;
              l++;
            }
        } else
          f('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
      }
  }
  function kv(e, t, n, a, r) {
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
  function gb(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, i = a.tail, l = a.children;
    dD(r), pD(i, r), vD(l, r), Dn(e, t, l, n);
    var o = Ta.current, u = Vp(o, gu);
    if (u)
      o = Up(o, gu), t.flags |= Ie;
    else {
      var d = e !== null && (e.flags & Ie) !== ge;
      d && cD(t, t.child, n), o = kl(o);
    }
    if (Qr(t, o), (t.mode & Ue) === he)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var v = fD(t.child), N;
          v === null ? (N = t.child, t.child = null) : (N = v.sibling, v.sibling = null), kv(
            t,
            !1,
            // isBackwards
            N,
            v,
            i
          );
          break;
        }
        case "backwards": {
          var S = null, j = t.child;
          for (t.child = null; j !== null; ) {
            var O = j.alternate;
            if (O !== null && xc(O) === null) {
              t.child = j;
              break;
            }
            var V = j.sibling;
            j.sibling = S, S = j, j = V;
          }
          kv(
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
          kv(
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
  function mD(e, t, n) {
    Lp(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = Ml(t, null, a, n) : Dn(e, t, a, n), t.child;
  }
  var bb = !1;
  function hD(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, o = i.value;
    {
      "value" in i || bb || (bb = !0, f("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var u = t.type.propTypes;
      u && xa(u, i, "prop", "Context.Provider");
    }
    if (fg(t, r, o), l !== null) {
      var d = l.value;
      if (Wn(d, o)) {
        if (l.children === i.children && !ec())
          return Nr(e, t, n);
      } else
        dT(t, r, n);
    }
    var v = i.children;
    return Dn(e, t, v, n), t.child;
  }
  var Eb = !1;
  function yD(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (Eb || (Eb = !0, f("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && f("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Vl(t, n);
    var l = Tt(a);
    Do(t);
    var o;
    return Du.current = t, aa(!0), o = i(l), aa(!1), vl(), t.flags |= cl, Dn(e, t, o, n), t.child;
  }
  function _u() {
    ja = !0;
  }
  function qc(e, t) {
    (t.mode & Ue) === he && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Ct);
  }
  function Nr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), Qg(), Pu(t.lanes), In(n, t.childLanes) ? (cT(e, t), t.child) : null;
  }
  function gD(e, t, n) {
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
      return i === null ? (a.deletions = [e], a.flags |= bi) : i.push(e), n.flags |= Ct, n;
    }
  }
  function zv(e, t) {
    var n = e.lanes;
    return !!In(n, t);
  }
  function bD(e, t, n) {
    switch (t.tag) {
      case R:
        db(t), t.stateNode, Ll();
        break;
      case Y:
        bg(t);
        break;
      case x: {
        var a = t.type;
        Ia(a) && nc(t);
        break;
      }
      case H:
        Lp(t, t.stateNode.containerInfo);
        break;
      case q: {
        var r = t.memoizedProps.value, i = t.type._context;
        fg(t, i, r);
        break;
      }
      case ie:
        {
          var l = In(n, t.childLanes);
          l && (t.flags |= Ye);
          {
            var o = t.stateNode;
            o.effectDuration = 0, o.passiveEffectDuration = 0;
          }
        }
        break;
      case te: {
        var u = t.memoizedState;
        if (u !== null) {
          if (u.dehydrated !== null)
            return Qr(t, kl(Ta.current)), t.flags |= Ie, null;
          var d = t.child, v = d.childLanes;
          if (In(n, v))
            return vb(e, t, n);
          Qr(t, kl(Ta.current));
          var N = Nr(e, t, n);
          return N !== null ? N.sibling : null;
        } else
          Qr(t, kl(Ta.current));
        break;
      }
      case Ze: {
        var S = (e.flags & Ie) !== ge, j = In(n, t.childLanes);
        if (S) {
          if (j)
            return gb(e, t, n);
          t.flags |= Ie;
        }
        var O = t.memoizedState;
        if (O !== null && (O.rendering = null, O.tail = null, O.lastEffect = null), Qr(t, Ta.current), j)
          break;
        return null;
      }
      case xe:
      case yt:
        return t.lanes = B, sb(e, t, n);
    }
    return Nr(e, t, n);
  }
  function Sb(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return gD(e, t, vm(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || ec() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        ja = !0;
      else {
        var i = zv(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & Ie) === ge)
          return ja = !1, bD(e, t, n);
        (e.flags & $f) !== ge ? ja = !0 : ja = !1;
      }
    } else if (ja = !1, en() && Y0(t)) {
      var l = t.index, o = I0();
      Qy(t, o, l);
    }
    switch (t.lanes = B, t.tag) {
      case M:
        return eD(e, t, t.type, n);
      case Pe: {
        var u = t.elementType;
        return JT(e, t, u, n);
      }
      case w: {
        var d = t.type, v = t.pendingProps, N = t.elementType === d ? v : wa(d, v);
        return _v(e, t, d, N, n);
      }
      case x: {
        var S = t.type, j = t.pendingProps, O = t.elementType === S ? j : wa(S, j);
        return fb(e, t, S, O, n);
      }
      case R:
        return QT(e, t, n);
      case Y:
        return KT(e, t, n);
      case Z:
        return XT(e, t);
      case te:
        return vb(e, t, n);
      case H:
        return mD(e, t, n);
      case I: {
        var V = t.type, J = t.pendingProps, ve = t.elementType === V ? J : wa(V, J);
        return lb(e, t, V, ve, n);
      }
      case F:
        return qT(e, t, n);
      case G:
        return GT(e, t, n);
      case ie:
        return WT(e, t, n);
      case q:
        return hD(e, t, n);
      case le:
        return yD(e, t, n);
      case oe: {
        var fe = t.type, ze = t.pendingProps, Me = wa(fe, ze);
        if (t.type !== t.elementType) {
          var C = fe.propTypes;
          C && xa(
            C,
            Me,
            // Resolved for outer only
            "prop",
            $e(fe)
          );
        }
        return Me = wa(fe.type, Me), ob(e, t, fe, Me, n);
      }
      case ce:
        return ub(e, t, t.type, t.pendingProps, n);
      case Fe: {
        var U = t.type, T = t.pendingProps, $ = t.elementType === U ? T : wa(U, T);
        return ZT(e, t, U, $, n);
      }
      case Ze:
        return gb(e, t, n);
      case et:
        break;
      case xe:
        return sb(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function $l(e) {
    e.flags |= Ye;
  }
  function Nb(e) {
    e.flags |= Ei, e.flags |= Yf;
  }
  var xb, Fv, Rb, Cb;
  xb = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === Y || r.tag === Z)
        BC(e, r.stateNode);
      else if (r.tag !== H) {
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
  }, Fv = function(e, t) {
  }, Rb = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, o = Mp(), u = $C(l, n, i, a, r, o);
      t.updateQueue = u, u && $l(t);
    }
  }, Cb = function(e, t, n, a) {
    n !== a && $l(t);
  };
  function Ou(e, t) {
    if (!en())
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
  function nn(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = B, a = ge;
    if (t) {
      if ((e.mode & Ke) !== he) {
        for (var u = e.selfBaseDuration, d = e.child; d !== null; )
          n = we(n, we(d.lanes, d.childLanes)), a |= d.subtreeFlags & dr, a |= d.flags & dr, u += d.treeBaseDuration, d = d.sibling;
        e.treeBaseDuration = u;
      } else
        for (var v = e.child; v !== null; )
          n = we(n, we(v.lanes, v.childLanes)), a |= v.subtreeFlags & dr, a |= v.flags & dr, v.return = e, v = v.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & Ke) !== he) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, l = e.child; l !== null; )
          n = we(n, we(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, r += l.actualDuration, i += l.treeBaseDuration, l = l.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var o = e.child; o !== null; )
          n = we(n, we(o.lanes, o.childLanes)), a |= o.subtreeFlags, a |= o.flags, o.return = e, o = o.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function ED(e, t, n) {
    if (rT() && (t.mode & Ue) !== he && (t.flags & Ie) === ge)
      return ng(t), Ll(), t.flags |= cr | gs | Tn, !1;
    var a = oc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (nT(t), nn(t), (t.mode & Ke) !== he) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Ll(), (t.flags & Ie) === ge && (t.memoizedState = null), t.flags |= Ye, nn(t), (t.mode & Ke) !== he) {
          var l = n !== null;
          if (l) {
            var o = t.child;
            o !== null && (t.treeBaseDuration -= o.treeBaseDuration);
          }
        }
        return !1;
      }
    else
      return ag(), !0;
  }
  function Tb(e, t, n) {
    var a = t.pendingProps;
    switch (fp(t), t.tag) {
      case M:
      case Pe:
      case ce:
      case w:
      case I:
      case F:
      case G:
      case ie:
      case le:
      case oe:
        return nn(t), null;
      case x: {
        var r = t.type;
        return Ia(r) && tc(t), nn(t), null;
      }
      case R: {
        var i = t.stateNode;
        if (Ul(t), op(t), zp(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = oc(t);
          if (l)
            $l(t);
          else if (e !== null) {
            var o = e.memoizedState;
            // Check if this is a client root
            (!o.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & cr) !== ge) && (t.flags |= fl, ag());
          }
        }
        return Fv(e, t), nn(t), null;
      }
      case Y: {
        Ap(t);
        var u = gg(), d = t.type;
        if (e !== null && t.stateNode != null)
          Rb(e, t, d, a, u), e.ref !== t.ref && Nb(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return nn(t), null;
          }
          var v = Mp(), N = oc(t);
          if (N)
            eT(t, u, v) && $l(t);
          else {
            var S = HC(d, a, u, v, t);
            xb(S, t, !1, !1), t.stateNode = S, PC(S, d, a, u) && $l(t);
          }
          t.ref !== null && Nb(t);
        }
        return nn(t), null;
      }
      case Z: {
        var j = a;
        if (e && t.stateNode != null) {
          var O = e.memoizedProps;
          Cb(e, t, O, j);
        } else {
          if (typeof j != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var V = gg(), J = Mp(), ve = oc(t);
          ve ? tT(t) && $l(t) : t.stateNode = YC(j, V, J, t);
        }
        return nn(t), null;
      }
      case te: {
        zl(t);
        var fe = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var ze = ED(e, t, fe);
          if (!ze)
            return t.flags & Tn ? t : null;
        }
        if ((t.flags & Ie) !== ge)
          return t.lanes = n, (t.mode & Ke) !== he && sv(t), t;
        var Me = fe !== null, C = e !== null && e.memoizedState !== null;
        if (Me !== C && Me) {
          var U = t.child;
          if (U.flags |= Si, (t.mode & Ue) !== he) {
            var T = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            T || Vp(Ta.current, Sg) ? Sw() : am();
          }
        }
        var $ = t.updateQueue;
        if ($ !== null && (t.flags |= Ye), nn(t), (t.mode & Ke) !== he && Me) {
          var re = t.child;
          re !== null && (t.treeBaseDuration -= re.treeBaseDuration);
        }
        return null;
      }
      case H:
        return Ul(t), Fv(e, t), e === null && k0(t.stateNode.containerInfo), nn(t), null;
      case q:
        var ee = t.type._context;
        return Cp(ee, t), nn(t), null;
      case Fe: {
        var be = t.type;
        return Ia(be) && tc(t), nn(t), null;
      }
      case Ze: {
        zl(t);
        var Ce = t.memoizedState;
        if (Ce === null)
          return nn(t), null;
        var Je = (t.flags & Ie) !== ge, He = Ce.rendering;
        if (He === null)
          if (Je)
            Ou(Ce, !1);
          else {
            var Nt = xw() && (e === null || (e.flags & Ie) === ge);
            if (!Nt)
              for (var Be = t.child; Be !== null; ) {
                var St = xc(Be);
                if (St !== null) {
                  Je = !0, t.flags |= Ie, Ou(Ce, !1);
                  var yn = St.updateQueue;
                  return yn !== null && (t.updateQueue = yn, t.flags |= Ye), t.subtreeFlags = ge, fT(t, n), Qr(t, Up(Ta.current, gu)), t.child;
                }
                Be = Be.sibling;
              }
            Ce.tail !== null && Yt() > Gb() && (t.flags |= Ie, Je = !0, Ou(Ce, !1), t.lanes = Ch);
          }
        else {
          if (!Je) {
            var un = xc(He);
            if (un !== null) {
              t.flags |= Ie, Je = !0;
              var Xn = un.updateQueue;
              if (Xn !== null && (t.updateQueue = Xn, t.flags |= Ye), Ou(Ce, !0), Ce.tail === null && Ce.tailMode === "hidden" && !He.alternate && !en())
                return nn(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            Yt() * 2 - Ce.renderingStartTime > Gb() && n !== Yn && (t.flags |= Ie, Je = !0, Ou(Ce, !1), t.lanes = Ch);
          }
          if (Ce.isBackwards)
            He.sibling = t.child, t.child = He;
          else {
            var _n = Ce.last;
            _n !== null ? _n.sibling = He : t.child = He, Ce.last = He;
          }
        }
        if (Ce.tail !== null) {
          var On = Ce.tail;
          Ce.rendering = On, Ce.tail = On.sibling, Ce.renderingStartTime = Yt(), On.sibling = null;
          var gn = Ta.current;
          return Je ? gn = Up(gn, gu) : gn = kl(gn), Qr(t, gn), On;
        }
        return nn(t), null;
      }
      case et:
        break;
      case xe:
      case yt: {
        nm(t);
        var Dr = t.memoizedState, Xl = Dr !== null;
        if (e !== null) {
          var Gu = e.memoizedState, Za = Gu !== null;
          Za !== Xl && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Bn && (t.flags |= Si);
        }
        return !Xl || (t.mode & Ue) === he ? nn(t) : In(Ja, Yn) && (nn(t), t.subtreeFlags & (Ct | Ye) && (t.flags |= Si)), null;
      }
      case ct:
        return null;
      case Dt:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function SD(e, t, n) {
    switch (fp(t), t.tag) {
      case x: {
        var a = t.type;
        Ia(a) && tc(t);
        var r = t.flags;
        return r & Tn ? (t.flags = r & ~Tn | Ie, (t.mode & Ke) !== he && sv(t), t) : null;
      }
      case R: {
        t.stateNode, Ul(t), op(t), zp();
        var i = t.flags;
        return (i & Tn) !== ge && (i & Ie) === ge ? (t.flags = i & ~Tn | Ie, t) : null;
      }
      case Y:
        return Ap(t), null;
      case te: {
        zl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Ll();
        }
        var o = t.flags;
        return o & Tn ? (t.flags = o & ~Tn | Ie, (t.mode & Ke) !== he && sv(t), t) : null;
      }
      case Ze:
        return zl(t), null;
      case H:
        return Ul(t), null;
      case q:
        var u = t.type._context;
        return Cp(u, t), null;
      case xe:
      case yt:
        return nm(t), null;
      case ct:
        return null;
      default:
        return null;
    }
  }
  function Db(e, t, n) {
    switch (fp(t), t.tag) {
      case x: {
        var a = t.type.childContextTypes;
        a != null && tc(t);
        break;
      }
      case R: {
        t.stateNode, Ul(t), op(t), zp();
        break;
      }
      case Y: {
        Ap(t);
        break;
      }
      case H:
        Ul(t);
        break;
      case te:
        zl(t);
        break;
      case Ze:
        zl(t);
        break;
      case q:
        var r = t.type._context;
        Cp(r, t);
        break;
      case xe:
      case yt:
        nm(t);
        break;
    }
  }
  var wb = null;
  wb = /* @__PURE__ */ new Set();
  var Gc = !1, an = !1, ND = typeof WeakSet == "function" ? WeakSet : Set, ue = null, Yl = null, Il = null;
  function xD(e) {
    Hf(null, function() {
      throw e;
    }), Bf();
  }
  var RD = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Ke)
      try {
        Ka(), t.componentWillUnmount();
      } finally {
        Qa(e);
      }
    else
      t.componentWillUnmount();
  };
  function jb(e, t) {
    try {
      Jr(Lt, e);
    } catch (n) {
      nt(e, t, n);
    }
  }
  function Hv(e, t, n) {
    try {
      RD(e, n);
    } catch (a) {
      nt(e, t, a);
    }
  }
  function CD(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      nt(e, t, a);
    }
  }
  function _b(e, t) {
    try {
      Lb(e);
    } catch (n) {
      nt(e, t, n);
    }
  }
  function ql(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function") {
        var a;
        try {
          if (bn && er && e.mode & Ke)
            try {
              Ka(), a = n(null);
            } finally {
              Qa(e);
            }
          else
            a = n(null);
        } catch (r) {
          nt(e, t, r);
        }
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Te(e));
      } else
        n.current = null;
  }
  function Wc(e, t, n) {
    try {
      n();
    } catch (a) {
      nt(e, t, a);
    }
  }
  var Ob = !1;
  function TD(e, t) {
    zC(e.containerInfo), ue = t, DD();
    var n = Ob;
    return Ob = !1, n;
  }
  function DD() {
    for (; ue !== null; ) {
      var e = ue, t = e.child;
      (e.subtreeFlags & Gf) !== ge && t !== null ? (t.return = e, ue = t) : wD();
    }
  }
  function wD() {
    for (; ue !== null; ) {
      var e = ue;
      ft(e);
      try {
        jD(e);
      } catch (n) {
        nt(e, e.return, n);
      }
      $t();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, ue = t;
        return;
      }
      ue = e.return;
    }
  }
  function jD(e) {
    var t = e.alternate, n = e.flags;
    if ((n & fl) !== ge) {
      switch (ft(e), e.tag) {
        case w:
        case I:
        case ce:
          break;
        case x: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !Bi && (i.props !== e.memoizedProps && f("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Te(e) || "instance"), i.state !== e.memoizedState && f("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Te(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : wa(e.type, a), r);
            {
              var o = wb;
              l === void 0 && !o.has(e.type) && (o.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Te(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case R: {
          {
            var u = e.stateNode;
            s0(u.containerInfo);
          }
          break;
        }
        case Y:
        case Z:
        case H:
        case Fe:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      $t();
    }
  }
  function _a(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, l = i;
      do {
        if ((l.tag & e) === e) {
          var o = l.destroy;
          l.destroy = void 0, o !== void 0 && ((e & tn) !== zn ? YN(t) : (e & Lt) !== zn && Eh(t), (e & qa) !== zn && Yu(!0), Wc(t, n, o), (e & qa) !== zn && Yu(!1), (e & tn) !== zn ? IN() : (e & Lt) !== zn && Sh());
        }
        l = l.next;
      } while (l !== i);
    }
  }
  function Jr(e, t) {
    var n = t.updateQueue, a = n !== null ? n.lastEffect : null;
    if (a !== null) {
      var r = a.next, i = r;
      do {
        if ((i.tag & e) === e) {
          (e & tn) !== zn ? PN(t) : (e & Lt) !== zn && qN(t);
          var l = i.create;
          (e & qa) !== zn && Yu(!0), i.destroy = l(), (e & qa) !== zn && Yu(!1), (e & tn) !== zn ? $N() : (e & Lt) !== zn && GN();
          {
            var o = i.destroy;
            if (o !== void 0 && typeof o != "function") {
              var u = void 0;
              (i.tag & Lt) !== ge ? u = "useLayoutEffect" : (i.tag & qa) !== ge ? u = "useInsertionEffect" : u = "useEffect";
              var d = void 0;
              o === null ? d = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof o.then == "function" ? d = `

It looks like you wrote ` + u + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + u + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : d = " You returned: " + o, f("%s must not return anything besides a function, which is used for clean-up.%s", u, d);
            }
          }
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function _D(e, t) {
    if ((t.flags & Ye) !== ge)
      switch (t.tag) {
        case ie: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = Gg(), o = t.alternate === null ? "mount" : "update";
          qg() && (o = "nested-update"), typeof i == "function" && i(r, o, n, l);
          var u = t.return;
          e: for (; u !== null; ) {
            switch (u.tag) {
              case R:
                var d = u.stateNode;
                d.passiveEffectDuration += n;
                break e;
              case ie:
                var v = u.stateNode;
                v.passiveEffectDuration += n;
                break e;
            }
            u = u.return;
          }
          break;
        }
      }
  }
  function OD(e, t, n, a) {
    if ((n.flags & To) !== ge)
      switch (n.tag) {
        case w:
        case I:
        case ce: {
          if (!an)
            if (n.mode & Ke)
              try {
                Ka(), Jr(Lt | Ot, n);
              } finally {
                Qa(n);
              }
            else
              Jr(Lt | Ot, n);
          break;
        }
        case x: {
          var r = n.stateNode;
          if (n.flags & Ye && !an)
            if (t === null)
              if (n.type === n.elementType && !Bi && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Te(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Te(n) || "instance")), n.mode & Ke)
                try {
                  Ka(), r.componentDidMount();
                } finally {
                  Qa(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : wa(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !Bi && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Te(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Te(n) || "instance")), n.mode & Ke)
                try {
                  Ka(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Qa(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var o = n.updateQueue;
          o !== null && (n.type === n.elementType && !Bi && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Te(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Te(n) || "instance")), yg(n, o, r));
          break;
        }
        case R: {
          var u = n.updateQueue;
          if (u !== null) {
            var d = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case Y:
                  d = n.child.stateNode;
                  break;
                case x:
                  d = n.child.stateNode;
                  break;
              }
            yg(n, u, d);
          }
          break;
        }
        case Y: {
          var v = n.stateNode;
          if (t === null && n.flags & Ye) {
            var N = n.type, S = n.memoizedProps;
            QC(v, N, S);
          }
          break;
        }
        case Z:
          break;
        case H:
          break;
        case ie: {
          {
            var j = n.memoizedProps, O = j.onCommit, V = j.onRender, J = n.stateNode.effectDuration, ve = Gg(), fe = t === null ? "mount" : "update";
            qg() && (fe = "nested-update"), typeof V == "function" && V(n.memoizedProps.id, fe, n.actualDuration, n.treeBaseDuration, n.actualStartTime, ve);
            {
              typeof O == "function" && O(n.memoizedProps.id, fe, J, ve), ww(n);
              var ze = n.return;
              e: for (; ze !== null; ) {
                switch (ze.tag) {
                  case R:
                    var Me = ze.stateNode;
                    Me.effectDuration += J;
                    break e;
                  case ie:
                    var C = ze.stateNode;
                    C.effectDuration += J;
                    break e;
                }
                ze = ze.return;
              }
            }
          }
          break;
        }
        case te: {
          FD(e, n);
          break;
        }
        case Ze:
        case Fe:
        case et:
        case xe:
        case yt:
        case Dt:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    an || n.flags & Ei && Lb(n);
  }
  function LD(e) {
    switch (e.tag) {
      case w:
      case I:
      case ce: {
        if (e.mode & Ke)
          try {
            Ka(), jb(e, e.return);
          } finally {
            Qa(e);
          }
        else
          jb(e, e.return);
        break;
      }
      case x: {
        var t = e.stateNode;
        typeof t.componentDidMount == "function" && CD(e, e.return, t), _b(e, e.return);
        break;
      }
      case Y: {
        _b(e, e.return);
        break;
      }
    }
  }
  function MD(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === Y) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? i0(r) : o0(a.stateNode, a.memoizedProps);
          } catch (l) {
            nt(e, e.return, l);
          }
        }
      } else if (a.tag === Z) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? l0(i) : u0(i, a.memoizedProps);
          } catch (l) {
            nt(e, e.return, l);
          }
      } else if (!((a.tag === xe || a.tag === yt) && a.memoizedState !== null && a !== e)) {
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
  function Lb(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode, a;
      switch (e.tag) {
        case Y:
          a = n;
          break;
        default:
          a = n;
      }
      if (typeof t == "function") {
        var r;
        if (e.mode & Ke)
          try {
            Ka(), r = t(a);
          } finally {
            Qa(e);
          }
        else
          r = t(a);
        typeof r == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Te(e));
      } else
        t.hasOwnProperty("current") || f("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Te(e)), t.current = a;
    }
  }
  function AD(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function Mb(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Mb(t));
    {
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === Y) {
        var n = e.stateNode;
        n !== null && H0(n);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function VD(e) {
    for (var t = e.return; t !== null; ) {
      if (Ab(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function Ab(e) {
    return e.tag === Y || e.tag === R || e.tag === H;
  }
  function Vb(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Ab(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== Y && t.tag !== Z && t.tag !== Ge; ) {
        if (t.flags & Ct || t.child === null || t.tag === H)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & Ct))
        return t.stateNode;
    }
  }
  function UD(e) {
    var t = VD(e);
    switch (t.tag) {
      case Y: {
        var n = t.stateNode;
        t.flags & Co && (ky(n), t.flags &= ~Co);
        var a = Vb(e);
        Pv(e, a, n);
        break;
      }
      case R:
      case H: {
        var r = t.stateNode.containerInfo, i = Vb(e);
        Bv(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Bv(e, t, n) {
    var a = e.tag, r = a === Y || a === Z;
    if (r) {
      var i = e.stateNode;
      t ? t0(n, i, t) : ZC(n, i);
    } else if (a !== H) {
      var l = e.child;
      if (l !== null) {
        Bv(l, t, n);
        for (var o = l.sibling; o !== null; )
          Bv(o, t, n), o = o.sibling;
      }
    }
  }
  function Pv(e, t, n) {
    var a = e.tag, r = a === Y || a === Z;
    if (r) {
      var i = e.stateNode;
      t ? e0(n, i, t) : JC(n, i);
    } else if (a !== H) {
      var l = e.child;
      if (l !== null) {
        Pv(l, t, n);
        for (var o = l.sibling; o !== null; )
          Pv(o, t, n), o = o.sibling;
      }
    }
  }
  var rn = null, Oa = !1;
  function kD(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case Y: {
            rn = a.stateNode, Oa = !1;
            break e;
          }
          case R: {
            rn = a.stateNode.containerInfo, Oa = !0;
            break e;
          }
          case H: {
            rn = a.stateNode.containerInfo, Oa = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (rn === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      Ub(e, t, n), rn = null, Oa = !1;
    }
    AD(n);
  }
  function Zr(e, t, n) {
    for (var a = n.child; a !== null; )
      Ub(e, t, a), a = a.sibling;
  }
  function Ub(e, t, n) {
    switch (zN(n), n.tag) {
      case Y:
        an || ql(n, t);
      case Z: {
        {
          var a = rn, r = Oa;
          rn = null, Zr(e, t, n), rn = a, Oa = r, rn !== null && (Oa ? a0(rn, n.stateNode) : n0(rn, n.stateNode));
        }
        return;
      }
      case Ge: {
        rn !== null && (Oa ? r0(rn, n.stateNode) : Zd(rn, n.stateNode));
        return;
      }
      case H: {
        {
          var i = rn, l = Oa;
          rn = n.stateNode.containerInfo, Oa = !0, Zr(e, t, n), rn = i, Oa = l;
        }
        return;
      }
      case w:
      case I:
      case oe:
      case ce: {
        if (!an) {
          var o = n.updateQueue;
          if (o !== null) {
            var u = o.lastEffect;
            if (u !== null) {
              var d = u.next, v = d;
              do {
                var N = v, S = N.destroy, j = N.tag;
                S !== void 0 && ((j & qa) !== zn ? Wc(n, t, S) : (j & Lt) !== zn && (Eh(n), n.mode & Ke ? (Ka(), Wc(n, t, S), Qa(n)) : Wc(n, t, S), Sh())), v = v.next;
              } while (v !== d);
            }
          }
        }
        Zr(e, t, n);
        return;
      }
      case x: {
        if (!an) {
          ql(n, t);
          var O = n.stateNode;
          typeof O.componentWillUnmount == "function" && Hv(n, t, O);
        }
        Zr(e, t, n);
        return;
      }
      case et: {
        Zr(e, t, n);
        return;
      }
      case xe: {
        if (
          // TODO: Remove this dead flag
          n.mode & Ue
        ) {
          var V = an;
          an = V || n.memoizedState !== null, Zr(e, t, n), an = V;
        } else
          Zr(e, t, n);
        break;
      }
      default: {
        Zr(e, t, n);
        return;
      }
    }
  }
  function zD(e) {
    e.memoizedState;
  }
  function FD(e, t) {
    var n = t.memoizedState;
    if (n === null) {
      var a = t.alternate;
      if (a !== null) {
        var r = a.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          i !== null && x0(i);
        }
      }
    }
  }
  function kb(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new ND()), t.forEach(function(a) {
        var r = Vw.bind(null, e, a);
        if (!n.has(a)) {
          if (n.add(a), Sa)
            if (Yl !== null && Il !== null)
              $u(Il, Yl);
            else
              throw Error("Expected finished root and lanes to be set. This is a bug in React.");
          a.then(r, r);
        }
      });
    }
  }
  function HD(e, t, n) {
    Yl = n, Il = e, ft(t), zb(t, e), ft(t), Yl = null, Il = null;
  }
  function La(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          kD(e, t, i);
        } catch (u) {
          nt(i, t, u);
        }
      }
    var l = os();
    if (t.subtreeFlags & Wf)
      for (var o = t.child; o !== null; )
        ft(o), zb(o, e), o = o.sibling;
    ft(l);
  }
  function zb(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case w:
      case I:
      case oe:
      case ce: {
        if (La(t, e), Xa(e), r & Ye) {
          try {
            _a(qa | Ot, e, e.return), Jr(qa | Ot, e);
          } catch (be) {
            nt(e, e.return, be);
          }
          if (e.mode & Ke) {
            try {
              Ka(), _a(Lt | Ot, e, e.return);
            } catch (be) {
              nt(e, e.return, be);
            }
            Qa(e);
          } else
            try {
              _a(Lt | Ot, e, e.return);
            } catch (be) {
              nt(e, e.return, be);
            }
        }
        return;
      }
      case x: {
        La(t, e), Xa(e), r & Ei && a !== null && ql(a, a.return);
        return;
      }
      case Y: {
        La(t, e), Xa(e), r & Ei && a !== null && ql(a, a.return);
        {
          if (e.flags & Co) {
            var i = e.stateNode;
            try {
              ky(i);
            } catch (be) {
              nt(e, e.return, be);
            }
          }
          if (r & Ye) {
            var l = e.stateNode;
            if (l != null) {
              var o = e.memoizedProps, u = a !== null ? a.memoizedProps : o, d = e.type, v = e.updateQueue;
              if (e.updateQueue = null, v !== null)
                try {
                  KC(l, v, d, u, o, e);
                } catch (be) {
                  nt(e, e.return, be);
                }
            }
          }
        }
        return;
      }
      case Z: {
        if (La(t, e), Xa(e), r & Ye) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var N = e.stateNode, S = e.memoizedProps, j = a !== null ? a.memoizedProps : S;
          try {
            XC(N, j, S);
          } catch (be) {
            nt(e, e.return, be);
          }
        }
        return;
      }
      case R: {
        if (La(t, e), Xa(e), r & Ye && a !== null) {
          var O = a.memoizedState;
          if (O.isDehydrated)
            try {
              N0(t.containerInfo);
            } catch (be) {
              nt(e, e.return, be);
            }
        }
        return;
      }
      case H: {
        La(t, e), Xa(e);
        return;
      }
      case te: {
        La(t, e), Xa(e);
        var V = e.child;
        if (V.flags & Si) {
          var J = V.stateNode, ve = V.memoizedState, fe = ve !== null;
          if (J.isHidden = fe, fe) {
            var ze = V.alternate !== null && V.alternate.memoizedState !== null;
            ze || Ew();
          }
        }
        if (r & Ye) {
          try {
            zD(e);
          } catch (be) {
            nt(e, e.return, be);
          }
          kb(e);
        }
        return;
      }
      case xe: {
        var Me = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Ue
        ) {
          var C = an;
          an = C || Me, La(t, e), an = C;
        } else
          La(t, e);
        if (Xa(e), r & Si) {
          var U = e.stateNode, T = e.memoizedState, $ = T !== null, re = e;
          if (U.isHidden = $, $ && !Me && (re.mode & Ue) !== he) {
            ue = re;
            for (var ee = re.child; ee !== null; )
              ue = ee, PD(ee), ee = ee.sibling;
          }
          MD(re, $);
        }
        return;
      }
      case Ze: {
        La(t, e), Xa(e), r & Ye && kb(e);
        return;
      }
      case et:
        return;
      default: {
        La(t, e), Xa(e);
        return;
      }
    }
  }
  function Xa(e) {
    var t = e.flags;
    if (t & Ct) {
      try {
        UD(e);
      } catch (n) {
        nt(e, e.return, n);
      }
      e.flags &= ~Ct;
    }
    t & fr && (e.flags &= ~fr);
  }
  function BD(e, t, n) {
    Yl = n, Il = t, ue = e, Fb(e, t, n), Yl = null, Il = null;
  }
  function Fb(e, t, n) {
    for (var a = (e.mode & Ue) !== he; ue !== null; ) {
      var r = ue, i = r.child;
      if (r.tag === xe && a) {
        var l = r.memoizedState !== null, o = l || Gc;
        if (o) {
          $v(e, t, n);
          continue;
        } else {
          var u = r.alternate, d = u !== null && u.memoizedState !== null, v = d || an, N = Gc, S = an;
          Gc = o, an = v, an && !S && (ue = r, $D(r));
          for (var j = i; j !== null; )
            ue = j, Fb(
              j,
              // New root; bubble back up to here and stop.
              t,
              n
            ), j = j.sibling;
          ue = r, Gc = N, an = S, $v(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & To) !== ge && i !== null ? (i.return = r, ue = i) : $v(e, t, n);
    }
  }
  function $v(e, t, n) {
    for (; ue !== null; ) {
      var a = ue;
      if ((a.flags & To) !== ge) {
        var r = a.alternate;
        ft(a);
        try {
          OD(t, r, a, n);
        } catch (l) {
          nt(a, a.return, l);
        }
        $t();
      }
      if (a === e) {
        ue = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, ue = i;
        return;
      }
      ue = a.return;
    }
  }
  function PD(e) {
    for (; ue !== null; ) {
      var t = ue, n = t.child;
      switch (t.tag) {
        case w:
        case I:
        case oe:
        case ce: {
          if (t.mode & Ke)
            try {
              Ka(), _a(Lt, t, t.return);
            } finally {
              Qa(t);
            }
          else
            _a(Lt, t, t.return);
          break;
        }
        case x: {
          ql(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Hv(t, t.return, a);
          break;
        }
        case Y: {
          ql(t, t.return);
          break;
        }
        case xe: {
          var r = t.memoizedState !== null;
          if (r) {
            Hb(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, ue = n) : Hb(e);
    }
  }
  function Hb(e) {
    for (; ue !== null; ) {
      var t = ue;
      if (t === e) {
        ue = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, ue = n;
        return;
      }
      ue = t.return;
    }
  }
  function $D(e) {
    for (; ue !== null; ) {
      var t = ue, n = t.child;
      if (t.tag === xe) {
        var a = t.memoizedState !== null;
        if (a) {
          Bb(e);
          continue;
        }
      }
      n !== null ? (n.return = t, ue = n) : Bb(e);
    }
  }
  function Bb(e) {
    for (; ue !== null; ) {
      var t = ue;
      ft(t);
      try {
        LD(t);
      } catch (a) {
        nt(t, t.return, a);
      }
      if ($t(), t === e) {
        ue = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, ue = n;
        return;
      }
      ue = t.return;
    }
  }
  function YD(e, t, n, a) {
    ue = t, ID(t, e, n, a);
  }
  function ID(e, t, n, a) {
    for (; ue !== null; ) {
      var r = ue, i = r.child;
      (r.subtreeFlags & dl) !== ge && i !== null ? (i.return = r, ue = i) : qD(e, t, n, a);
    }
  }
  function qD(e, t, n, a) {
    for (; ue !== null; ) {
      var r = ue;
      if ((r.flags & Ar) !== ge) {
        ft(r);
        try {
          GD(t, r, n, a);
        } catch (l) {
          nt(r, r.return, l);
        }
        $t();
      }
      if (r === e) {
        ue = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, ue = i;
        return;
      }
      ue = r.return;
    }
  }
  function GD(e, t, n, a) {
    switch (t.tag) {
      case w:
      case I:
      case ce: {
        if (t.mode & Ke) {
          uv();
          try {
            Jr(tn | Ot, t);
          } finally {
            ov(t);
          }
        } else
          Jr(tn | Ot, t);
        break;
      }
    }
  }
  function WD(e) {
    ue = e, QD();
  }
  function QD() {
    for (; ue !== null; ) {
      var e = ue, t = e.child;
      if ((ue.flags & bi) !== ge) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            ue = r, JD(r, e);
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
          ue = e;
        }
      }
      (e.subtreeFlags & dl) !== ge && t !== null ? (t.return = e, ue = t) : KD();
    }
  }
  function KD() {
    for (; ue !== null; ) {
      var e = ue;
      (e.flags & Ar) !== ge && (ft(e), XD(e), $t());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, ue = t;
        return;
      }
      ue = e.return;
    }
  }
  function XD(e) {
    switch (e.tag) {
      case w:
      case I:
      case ce: {
        e.mode & Ke ? (uv(), _a(tn | Ot, e, e.return), ov(e)) : _a(tn | Ot, e, e.return);
        break;
      }
    }
  }
  function JD(e, t) {
    for (; ue !== null; ) {
      var n = ue;
      ft(n), ew(n, t), $t();
      var a = n.child;
      a !== null ? (a.return = n, ue = a) : ZD(e);
    }
  }
  function ZD(e) {
    for (; ue !== null; ) {
      var t = ue, n = t.sibling, a = t.return;
      if (Mb(t), t === e) {
        ue = null;
        return;
      }
      if (n !== null) {
        n.return = a, ue = n;
        return;
      }
      ue = a;
    }
  }
  function ew(e, t) {
    switch (e.tag) {
      case w:
      case I:
      case ce: {
        e.mode & Ke ? (uv(), _a(tn, e, t), ov(e)) : _a(tn, e, t);
        break;
      }
    }
  }
  function tw(e) {
    switch (e.tag) {
      case w:
      case I:
      case ce: {
        try {
          Jr(Lt | Ot, e);
        } catch (n) {
          nt(e, e.return, n);
        }
        break;
      }
      case x: {
        var t = e.stateNode;
        try {
          t.componentDidMount();
        } catch (n) {
          nt(e, e.return, n);
        }
        break;
      }
    }
  }
  function nw(e) {
    switch (e.tag) {
      case w:
      case I:
      case ce: {
        try {
          Jr(tn | Ot, e);
        } catch (t) {
          nt(e, e.return, t);
        }
        break;
      }
    }
  }
  function aw(e) {
    switch (e.tag) {
      case w:
      case I:
      case ce: {
        try {
          _a(Lt | Ot, e, e.return);
        } catch (n) {
          nt(e, e.return, n);
        }
        break;
      }
      case x: {
        var t = e.stateNode;
        typeof t.componentWillUnmount == "function" && Hv(e, e.return, t);
        break;
      }
    }
  }
  function rw(e) {
    switch (e.tag) {
      case w:
      case I:
      case ce:
        try {
          _a(tn | Ot, e, e.return);
        } catch (t) {
          nt(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var Lu = Symbol.for;
    Lu("selector.component"), Lu("selector.has_pseudo_class"), Lu("selector.role"), Lu("selector.test_id"), Lu("selector.text");
  }
  var iw = [];
  function lw() {
    iw.forEach(function(e) {
      return e();
    });
  }
  var ow = h.ReactCurrentActQueue;
  function uw(e) {
    {
      var t = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      ), n = typeof jest < "u";
      return n && t !== !1;
    }
  }
  function Pb() {
    {
      var e = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      );
      return !e && ow.current !== null && f("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var sw = Math.ceil, Yv = h.ReactCurrentDispatcher, Iv = h.ReactCurrentOwner, ln = h.ReactCurrentBatchConfig, Ma = h.ReactCurrentActQueue, Vt = (
    /*             */
    0
  ), $b = (
    /*               */
    1
  ), on = (
    /*                */
    2
  ), sa = (
    /*                */
    4
  ), xr = 0, Mu = 1, Pi = 2, Qc = 3, Au = 4, Yb = 5, qv = 6, ke = Vt, wn = null, ht = null, Ut = B, Ja = B, Gv = $r(B), kt = xr, Vu = null, Kc = B, Uu = B, Xc = B, ku = null, Fn = null, Wv = 0, Ib = 500, qb = 1 / 0, cw = 500, Rr = null;
  function zu() {
    qb = Yt() + cw;
  }
  function Gb() {
    return qb;
  }
  var Jc = !1, Qv = null, Gl = null, $i = !1, ei = null, Fu = B, Kv = [], Xv = null, fw = 50, Hu = 0, Jv = null, Zv = !1, Zc = !1, dw = 50, Wl = 0, ef = null, Bu = it, tf = B, Wb = !1;
  function nf() {
    return wn;
  }
  function jn() {
    return (ke & (on | sa)) !== Vt ? Yt() : (Bu !== it || (Bu = Yt()), Bu);
  }
  function ti(e) {
    var t = e.mode;
    if ((t & Ue) === he)
      return Se;
    if ((ke & on) !== Vt && Ut !== B)
      return Mo(Ut);
    var n = oT() !== lT;
    if (n) {
      if (ln.transition !== null) {
        var a = ln.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return tf === qt && (tf = jh()), tf;
    }
    var r = Na();
    if (r !== qt)
      return r;
    var i = IC();
    return i;
  }
  function pw(e) {
    var t = e.mode;
    return (t & Ue) === he ? Se : mx();
  }
  function zt(e, t, n, a) {
    kw(), Wb && f("useInsertionEffect must not schedule updates."), Zv && (Zc = !0), Ao(e, n, a), (ke & on) !== B && e === wn ? Hw(t) : (Sa && Lh(e, t, n), Bw(t), e === wn && ((ke & on) === Vt && (Uu = we(Uu, n)), kt === Au && ni(e, Ut)), Hn(e, a), n === Se && ke === Vt && (t.mode & Ue) === he && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Ma.isBatchingLegacy && (zu(), Wy()));
  }
  function vw(e, t, n) {
    var a = e.current;
    a.lanes = t, Ao(e, t, n), Hn(e, n);
  }
  function mw(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (ke & on) !== Vt
    );
  }
  function Hn(e, t) {
    var n = e.callbackNode;
    sx(e, t);
    var a = xs(e, e === wn ? Ut : B);
    if (a === B) {
      n !== null && cE(n), e.callbackNode = null, e.callbackPriority = qt;
      return;
    }
    var r = Di(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Ma.current !== null && n !== lm)) {
      n == null && i !== Se && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && cE(n);
    var l;
    if (r === Se)
      e.tag === Yr ? (Ma.isBatchingLegacy !== null && (Ma.didScheduleLegacyUpdate = !0), $0(Xb.bind(null, e))) : Gy(Xb.bind(null, e)), Ma.current !== null ? Ma.current.push(Ir) : GC(function() {
        (ke & (on | sa)) === Vt && Ir();
      }), l = null;
    else {
      var o;
      switch (Vh(a)) {
        case qn:
          o = bs;
          break;
        case vr:
          o = Qf;
          break;
        case mr:
          o = Ri;
          break;
        case Ts:
          o = Kf;
          break;
        default:
          o = Ri;
          break;
      }
      l = om(o, Qb.bind(null, e));
    }
    e.callbackPriority = r, e.callbackNode = l;
  }
  function Qb(e, t) {
    if (MT(), Bu = it, tf = B, (ke & (on | sa)) !== Vt)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = Tr();
    if (a && e.callbackNode !== n)
      return null;
    var r = xs(e, e === wn ? Ut : B);
    if (r === B)
      return null;
    var i = !Rs(e, r) && !vx(e, r) && !t, l = i ? Cw(e, r) : rf(e, r);
    if (l !== xr) {
      if (l === Pi) {
        var o = gd(e);
        o !== B && (r = o, l = em(e, o));
      }
      if (l === Mu) {
        var u = Vu;
        throw Yi(e, B), ni(e, r), Hn(e, Yt()), u;
      }
      if (l === qv)
        ni(e, r);
      else {
        var d = !Rs(e, r), v = e.current.alternate;
        if (d && !yw(v)) {
          if (l = rf(e, r), l === Pi) {
            var N = gd(e);
            N !== B && (r = N, l = em(e, N));
          }
          if (l === Mu) {
            var S = Vu;
            throw Yi(e, B), ni(e, r), Hn(e, Yt()), S;
          }
        }
        e.finishedWork = v, e.finishedLanes = r, hw(e, l, r);
      }
    }
    return Hn(e, Yt()), e.callbackNode === n ? Qb.bind(null, e) : null;
  }
  function em(e, t) {
    var n = ku;
    if (Ds(e)) {
      var a = Yi(e, t);
      a.flags |= cr, U0(e.containerInfo);
    }
    var r = rf(e, t);
    if (r !== Pi) {
      var i = Fn;
      Fn = n, i !== null && Kb(i);
    }
    return r;
  }
  function Kb(e) {
    Fn === null ? Fn = e : Fn.push.apply(Fn, e);
  }
  function hw(e, t, n) {
    switch (t) {
      case xr:
      case Mu:
        throw new Error("Root did not complete. This is a bug in React.");
      case Pi: {
        Ii(e, Fn, Rr);
        break;
      }
      case Qc: {
        if (ni(e, n), Dh(n) && // do not delay if we're inside an act() scope
        !fE()) {
          var a = Wv + Ib - Yt();
          if (a > 10) {
            var r = xs(e, B);
            if (r !== B)
              break;
            var i = e.suspendedLanes;
            if (!gl(i, n)) {
              jn(), Oh(e, i);
              break;
            }
            e.timeoutHandle = Xd(Ii.bind(null, e, Fn, Rr), a);
            break;
          }
        }
        Ii(e, Fn, Rr);
        break;
      }
      case Au: {
        if (ni(e, n), px(n))
          break;
        if (!fE()) {
          var l = ox(e, n), o = l, u = Yt() - o, d = Uw(u) - u;
          if (d > 10) {
            e.timeoutHandle = Xd(Ii.bind(null, e, Fn, Rr), d);
            break;
          }
        }
        Ii(e, Fn, Rr);
        break;
      }
      case Yb: {
        Ii(e, Fn, Rr);
        break;
      }
      default:
        throw new Error("Unknown root exit status.");
    }
  }
  function yw(e) {
    for (var t = e; ; ) {
      if (t.flags & Pf) {
        var n = t.updateQueue;
        if (n !== null) {
          var a = n.stores;
          if (a !== null)
            for (var r = 0; r < a.length; r++) {
              var i = a[r], l = i.getSnapshot, o = i.value;
              try {
                if (!Wn(l(), o))
                  return !1;
              } catch {
                return !1;
              }
            }
        }
      }
      var u = t.child;
      if (t.subtreeFlags & Pf && u !== null) {
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
  function ni(e, t) {
    t = Cs(t, Xc), t = Cs(t, Uu), yx(e, t);
  }
  function Xb(e) {
    if (AT(), (ke & (on | sa)) !== Vt)
      throw new Error("Should not already be working.");
    Tr();
    var t = xs(e, B);
    if (!In(t, Se))
      return Hn(e, Yt()), null;
    var n = rf(e, t);
    if (e.tag !== Yr && n === Pi) {
      var a = gd(e);
      a !== B && (t = a, n = em(e, a));
    }
    if (n === Mu) {
      var r = Vu;
      throw Yi(e, B), ni(e, t), Hn(e, Yt()), r;
    }
    if (n === qv)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Ii(e, Fn, Rr), Hn(e, Yt()), null;
  }
  function gw(e, t) {
    t !== B && (Nd(e, we(t, Se)), Hn(e, Yt()), (ke & (on | sa)) === Vt && (zu(), Ir()));
  }
  function tm(e, t) {
    var n = ke;
    ke |= $b;
    try {
      return e(t);
    } finally {
      ke = n, ke === Vt && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Ma.isBatchingLegacy && (zu(), Wy());
    }
  }
  function bw(e, t, n, a, r) {
    var i = Na(), l = ln.transition;
    try {
      return ln.transition = null, Gt(qn), e(t, n, a, r);
    } finally {
      Gt(i), ln.transition = l, ke === Vt && zu();
    }
  }
  function Cr(e) {
    ei !== null && ei.tag === Yr && (ke & (on | sa)) === Vt && Tr();
    var t = ke;
    ke |= $b;
    var n = ln.transition, a = Na();
    try {
      return ln.transition = null, Gt(qn), e ? e() : void 0;
    } finally {
      Gt(a), ln.transition = n, ke = t, (ke & (on | sa)) === Vt && Ir();
    }
  }
  function Jb() {
    return (ke & (on | sa)) !== Vt;
  }
  function af(e, t) {
    mn(Gv, Ja, e), Ja = we(Ja, t);
  }
  function nm(e) {
    Ja = Gv.current, vn(Gv, e);
  }
  function Yi(e, t) {
    e.finishedWork = null, e.finishedLanes = B;
    var n = e.timeoutHandle;
    if (n !== Jd && (e.timeoutHandle = Jd, qC(n)), ht !== null)
      for (var a = ht.return; a !== null; ) {
        var r = a.alternate;
        Db(r, a), a = a.return;
      }
    wn = e;
    var i = qi(e.current, null);
    return ht = i, Ut = Ja = t, kt = xr, Vu = null, Kc = B, Uu = B, Xc = B, ku = null, Fn = null, vT(), Ca.discardPendingWarnings(), i;
  }
  function Zb(e, t) {
    do {
      var n = ht;
      try {
        if (pc(), xg(), $t(), Iv.current = null, n === null || n.return === null) {
          kt = Mu, Vu = t, ht = null;
          return;
        }
        if (bn && n.mode & Ke && Pc(n, !0), pa)
          if (vl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            QN(n, a, Ut);
          } else
            WN(n, t, Ut);
        $T(e, n.return, n, t, Ut), aE(n);
      } catch (r) {
        t = r, ht === n && n !== null ? (n = n.return, ht = n) : n = ht;
        continue;
      }
      return;
    } while (!0);
  }
  function eE() {
    var e = Yv.current;
    return Yv.current = kc, e === null ? kc : e;
  }
  function tE(e) {
    Yv.current = e;
  }
  function Ew() {
    Wv = Yt();
  }
  function Pu(e) {
    Kc = we(e, Kc);
  }
  function Sw() {
    kt === xr && (kt = Qc);
  }
  function am() {
    (kt === xr || kt === Qc || kt === Pi) && (kt = Au), wn !== null && (bd(Kc) || bd(Uu)) && ni(wn, Ut);
  }
  function Nw(e) {
    kt !== Au && (kt = Pi), ku === null ? ku = [e] : ku.push(e);
  }
  function xw() {
    return kt === xr;
  }
  function rf(e, t) {
    var n = ke;
    ke |= on;
    var a = eE();
    if (wn !== e || Ut !== t) {
      if (Sa) {
        var r = e.memoizedUpdaters;
        r.size > 0 && ($u(e, Ut), r.clear()), Mh(e, t);
      }
      Rr = Ah(), Yi(e, t);
    }
    Nh(t);
    do
      try {
        Rw();
        break;
      } catch (i) {
        Zb(e, i);
      }
    while (!0);
    if (pc(), ke = n, tE(a), ht !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return xh(), wn = null, Ut = B, kt;
  }
  function Rw() {
    for (; ht !== null; )
      nE(ht);
  }
  function Cw(e, t) {
    var n = ke;
    ke |= on;
    var a = eE();
    if (wn !== e || Ut !== t) {
      if (Sa) {
        var r = e.memoizedUpdaters;
        r.size > 0 && ($u(e, Ut), r.clear()), Mh(e, t);
      }
      Rr = Ah(), zu(), Yi(e, t);
    }
    Nh(t);
    do
      try {
        Tw();
        break;
      } catch (i) {
        Zb(e, i);
      }
    while (!0);
    return pc(), tE(a), ke = n, ht !== null ? (ex(), xr) : (xh(), wn = null, Ut = B, kt);
  }
  function Tw() {
    for (; ht !== null && !wN(); )
      nE(ht);
  }
  function nE(e) {
    var t = e.alternate;
    ft(e);
    var n;
    (e.mode & Ke) !== he ? (lv(e), n = rm(t, e, Ja), Pc(e, !0)) : n = rm(t, e, Ja), $t(), e.memoizedProps = e.pendingProps, n === null ? aE(e) : ht = n, Iv.current = null;
  }
  function aE(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & gs) === ge) {
        ft(t);
        var r = void 0;
        if ((t.mode & Ke) === he ? r = Tb(n, t, Ja) : (lv(t), r = Tb(n, t, Ja), Pc(t, !1)), $t(), r !== null) {
          ht = r;
          return;
        }
      } else {
        var i = SD(n, t);
        if (i !== null) {
          i.flags &= NN, ht = i;
          return;
        }
        if ((t.mode & Ke) !== he) {
          Pc(t, !1);
          for (var l = t.actualDuration, o = t.child; o !== null; )
            l += o.actualDuration, o = o.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= gs, a.subtreeFlags = ge, a.deletions = null;
        else {
          kt = qv, ht = null;
          return;
        }
      }
      var u = t.sibling;
      if (u !== null) {
        ht = u;
        return;
      }
      t = a, ht = t;
    } while (t !== null);
    kt === xr && (kt = Yb);
  }
  function Ii(e, t, n) {
    var a = Na(), r = ln.transition;
    try {
      ln.transition = null, Gt(qn), Dw(e, t, n, a);
    } finally {
      ln.transition = r, Gt(a);
    }
    return null;
  }
  function Dw(e, t, n, a) {
    do
      Tr();
    while (ei !== null);
    if (zw(), (ke & (on | sa)) !== Vt)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (BN(i), r === null)
      return bh(), null;
    if (i === B && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = B, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = qt;
    var l = we(r.lanes, r.childLanes);
    gx(e, l), e === wn && (wn = null, ht = null, Ut = B), ((r.subtreeFlags & dl) !== ge || (r.flags & dl) !== ge) && ($i || ($i = !0, Xv = n, om(Ri, function() {
      return Tr(), null;
    })));
    var o = (r.subtreeFlags & (Gf | Wf | To | dl)) !== ge, u = (r.flags & (Gf | Wf | To | dl)) !== ge;
    if (o || u) {
      var d = ln.transition;
      ln.transition = null;
      var v = Na();
      Gt(qn);
      var N = ke;
      ke |= sa, Iv.current = null, TD(e, r), Wg(), HD(e, r, i), FC(e.containerInfo), e.current = r, KN(i), BD(r, e, i), XN(), jN(), ke = N, Gt(v), ln.transition = d;
    } else
      e.current = r, Wg();
    var S = $i;
    if ($i ? ($i = !1, ei = e, Fu = i) : (Wl = 0, ef = null), l = e.pendingLanes, l === B && (Gl = null), S || oE(e.current, !1), UN(r.stateNode, a), Sa && e.memoizedUpdaters.clear(), lw(), Hn(e, Yt()), t !== null)
      for (var j = e.onRecoverableError, O = 0; O < t.length; O++) {
        var V = t[O], J = V.stack, ve = V.digest;
        j(V.value, {
          componentStack: J,
          digest: ve
        });
      }
    if (Jc) {
      Jc = !1;
      var fe = Qv;
      throw Qv = null, fe;
    }
    return In(Fu, Se) && e.tag !== Yr && Tr(), l = e.pendingLanes, In(l, Se) ? (LT(), e === Jv ? Hu++ : (Hu = 0, Jv = e)) : Hu = 0, Ir(), bh(), null;
  }
  function Tr() {
    if (ei !== null) {
      var e = Vh(Fu), t = Nx(mr, e), n = ln.transition, a = Na();
      try {
        return ln.transition = null, Gt(t), jw();
      } finally {
        Gt(a), ln.transition = n;
      }
    }
    return !1;
  }
  function ww(e) {
    Kv.push(e), $i || ($i = !0, om(Ri, function() {
      return Tr(), null;
    }));
  }
  function jw() {
    if (ei === null)
      return !1;
    var e = Xv;
    Xv = null;
    var t = ei, n = Fu;
    if (ei = null, Fu = B, (ke & (on | sa)) !== Vt)
      throw new Error("Cannot flush passive effects while already rendering.");
    Zv = !0, Zc = !1, JN(n);
    var a = ke;
    ke |= sa, WD(t.current), YD(t, t.current, n, e);
    {
      var r = Kv;
      Kv = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        _D(t, l);
      }
    }
    ZN(), oE(t.current, !0), ke = a, Ir(), Zc ? t === ef ? Wl++ : (Wl = 0, ef = t) : Wl = 0, Zv = !1, Zc = !1, kN(t);
    {
      var o = t.current.stateNode;
      o.effectDuration = 0, o.passiveEffectDuration = 0;
    }
    return !0;
  }
  function rE(e) {
    return Gl !== null && Gl.has(e);
  }
  function _w(e) {
    Gl === null ? Gl = /* @__PURE__ */ new Set([e]) : Gl.add(e);
  }
  function Ow(e) {
    Jc || (Jc = !0, Qv = e);
  }
  var Lw = Ow;
  function iE(e, t, n) {
    var a = Hi(n, t), r = nb(e, a, Se), i = Gr(e, r, Se), l = jn();
    i !== null && (Ao(i, Se, l), Hn(i, l));
  }
  function nt(e, t, n) {
    if (xD(n), Yu(!1), e.tag === R) {
      iE(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === R) {
        iE(a, e, n);
        return;
      } else if (a.tag === x) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !rE(i)) {
          var l = Hi(n, e), o = Rv(a, l, Se), u = Gr(a, o, Se), d = jn();
          u !== null && (Ao(u, Se, d), Hn(u, d));
          return;
        }
      }
      a = a.return;
    }
    f(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function Mw(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = jn();
    Oh(e, n), Pw(e), wn === e && gl(Ut, n) && (kt === Au || kt === Qc && Dh(Ut) && Yt() - Wv < Ib ? Yi(e, B) : Xc = we(Xc, n)), Hn(e, r);
  }
  function lE(e, t) {
    t === qt && (t = pw(e));
    var n = jn(), a = kn(e, t);
    a !== null && (Ao(a, t, n), Hn(a, n));
  }
  function Aw(e) {
    var t = e.memoizedState, n = qt;
    t !== null && (n = t.retryLane), lE(e, n);
  }
  function Vw(e, t) {
    var n = qt, a;
    switch (e.tag) {
      case te:
        a = e.stateNode;
        var r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case Ze:
        a = e.stateNode;
        break;
      default:
        throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
    }
    a !== null && a.delete(t), lE(e, n);
  }
  function Uw(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : sw(e / 1960) * 1960;
  }
  function kw() {
    if (Hu > fw)
      throw Hu = 0, Jv = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Wl > dw && (Wl = 0, ef = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function zw() {
    Ca.flushLegacyContextWarning(), Ca.flushPendingUnsafeLifecycleWarnings();
  }
  function oE(e, t) {
    ft(e), lf(e, Vr, aw), t && lf(e, qf, rw), lf(e, Vr, tw), t && lf(e, qf, nw), $t();
  }
  function lf(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== ge ? a = a.child : ((a.flags & t) !== ge && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var of = null;
  function uE(e) {
    {
      if ((ke & on) !== Vt || !(e.mode & Ue))
        return;
      var t = e.tag;
      if (t !== M && t !== R && t !== x && t !== w && t !== I && t !== oe && t !== ce)
        return;
      var n = Te(e) || "ReactComponent";
      if (of !== null) {
        if (of.has(n))
          return;
        of.add(n);
      } else
        of = /* @__PURE__ */ new Set([n]);
      var a = xn;
      try {
        ft(e), f("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? ft(e) : $t();
      }
    }
  }
  var rm;
  {
    var Fw = null;
    rm = function(e, t, n) {
      var a = hE(Fw, t);
      try {
        return Sb(e, t, n);
      } catch (i) {
        if (X0() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (pc(), xg(), Db(e, t), hE(t, a), t.mode & Ke && lv(t), Hf(null, Sb, null, e, t, n), bN()) {
          var r = Bf();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var sE = !1, im;
  im = /* @__PURE__ */ new Set();
  function Hw(e) {
    if (mi && !jT())
      switch (e.tag) {
        case w:
        case I:
        case ce: {
          var t = ht && Te(ht) || "Unknown", n = t;
          if (!im.has(n)) {
            im.add(n);
            var a = Te(e) || "Unknown";
            f("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", a, t, t);
          }
          break;
        }
        case x: {
          sE || (f("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), sE = !0);
          break;
        }
      }
  }
  function $u(e, t) {
    if (Sa) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        Lh(e, a, t);
      });
    }
  }
  var lm = {};
  function om(e, t) {
    {
      var n = Ma.current;
      return n !== null ? (n.push(t), lm) : gh(e, t);
    }
  }
  function cE(e) {
    if (e !== lm)
      return DN(e);
  }
  function fE() {
    return Ma.current !== null;
  }
  function Bw(e) {
    {
      if (e.mode & Ue) {
        if (!Pb())
          return;
      } else if (!uw() || ke !== Vt || e.tag !== w && e.tag !== I && e.tag !== ce)
        return;
      if (Ma.current === null) {
        var t = xn;
        try {
          ft(e), f(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Te(e));
        } finally {
          t ? ft(e) : $t();
        }
      }
    }
  }
  function Pw(e) {
    e.tag !== Yr && Pb() && Ma.current === null && f(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
  }
  function Yu(e) {
    Wb = e;
  }
  var ca = null, Ql = null, $w = function(e) {
    ca = e;
  };
  function Kl(e) {
    {
      if (ca === null)
        return e;
      var t = ca(e);
      return t === void 0 ? e : t.current;
    }
  }
  function um(e) {
    return Kl(e);
  }
  function sm(e) {
    {
      if (ca === null)
        return e;
      var t = ca(e);
      if (t === void 0) {
        if (e != null && typeof e.render == "function") {
          var n = Kl(e.render);
          if (e.render !== n) {
            var a = {
              $$typeof: pe,
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
  function dE(e, t) {
    {
      if (ca === null)
        return !1;
      var n = e.elementType, a = t.type, r = !1, i = typeof a == "object" && a !== null ? a.$$typeof : null;
      switch (e.tag) {
        case x: {
          typeof a == "function" && (r = !0);
          break;
        }
        case w: {
          (typeof a == "function" || i === me) && (r = !0);
          break;
        }
        case I: {
          (i === pe || i === me) && (r = !0);
          break;
        }
        case oe:
        case ce: {
          (i === De || i === me) && (r = !0);
          break;
        }
        default:
          return !1;
      }
      if (r) {
        var l = ca(n);
        if (l !== void 0 && l === ca(a))
          return !0;
      }
      return !1;
    }
  }
  function pE(e) {
    {
      if (ca === null || typeof WeakSet != "function")
        return;
      Ql === null && (Ql = /* @__PURE__ */ new WeakSet()), Ql.add(e);
    }
  }
  var Yw = function(e, t) {
    {
      if (ca === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      Tr(), Cr(function() {
        cm(e.current, a, n);
      });
    }
  }, Iw = function(e, t) {
    {
      if (e.context !== Qn)
        return;
      Tr(), Cr(function() {
        Iu(t, e, null, null);
      });
    }
  };
  function cm(e, t, n) {
    {
      var a = e.alternate, r = e.child, i = e.sibling, l = e.tag, o = e.type, u = null;
      switch (l) {
        case w:
        case ce:
        case x:
          u = o;
          break;
        case I:
          u = o.render;
          break;
      }
      if (ca === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var d = !1, v = !1;
      if (u !== null) {
        var N = ca(u);
        N !== void 0 && (n.has(N) ? v = !0 : t.has(N) && (l === x ? v = !0 : d = !0));
      }
      if (Ql !== null && (Ql.has(e) || a !== null && Ql.has(a)) && (v = !0), v && (e._debugNeedsRemount = !0), v || d) {
        var S = kn(e, Se);
        S !== null && zt(S, e, Se, it);
      }
      r !== null && !v && cm(r, t, n), i !== null && cm(i, t, n);
    }
  }
  var qw = function(e, t) {
    {
      var n = /* @__PURE__ */ new Set(), a = new Set(t.map(function(r) {
        return r.current;
      }));
      return fm(e.current, a, n), n;
    }
  };
  function fm(e, t, n) {
    {
      var a = e.child, r = e.sibling, i = e.tag, l = e.type, o = null;
      switch (i) {
        case w:
        case ce:
        case x:
          o = l;
          break;
        case I:
          o = l.render;
          break;
      }
      var u = !1;
      o !== null && t.has(o) && (u = !0), u ? Gw(e, n) : a !== null && fm(a, t, n), r !== null && fm(r, t, n);
    }
  }
  function Gw(e, t) {
    {
      var n = Ww(e, t);
      if (n)
        return;
      for (var a = e; ; ) {
        switch (a.tag) {
          case Y:
            t.add(a.stateNode);
            return;
          case H:
            t.add(a.stateNode.containerInfo);
            return;
          case R:
            t.add(a.stateNode.containerInfo);
            return;
        }
        if (a.return === null)
          throw new Error("Expected to reach root first.");
        a = a.return;
      }
    }
  }
  function Ww(e, t) {
    for (var n = e, a = !1; ; ) {
      if (n.tag === Y)
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
  var dm;
  {
    dm = !1;
    try {
      var vE = Object.preventExtensions({});
    } catch {
      dm = !0;
    }
  }
  function Qw(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = ge, this.subtreeFlags = ge, this.deletions = null, this.lanes = B, this.childLanes = B, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !dm && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var Kn = function(e, t, n, a) {
    return new Qw(e, t, n, a);
  };
  function pm(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function Kw(e) {
    return typeof e == "function" && !pm(e) && e.defaultProps === void 0;
  }
  function Xw(e) {
    if (typeof e == "function")
      return pm(e) ? x : w;
    if (e != null) {
      var t = e.$$typeof;
      if (t === pe)
        return I;
      if (t === De)
        return oe;
    }
    return M;
  }
  function qi(e, t) {
    var n = e.alternate;
    n === null ? (n = Kn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = ge, n.subtreeFlags = ge, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & dr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case M:
      case w:
      case ce:
        n.type = Kl(e.type);
        break;
      case x:
        n.type = um(e.type);
        break;
      case I:
        n.type = sm(e.type);
        break;
    }
    return n;
  }
  function Jw(e, t) {
    e.flags &= dr | Ct;
    var n = e.alternate;
    if (n === null)
      e.childLanes = B, e.lanes = t, e.child = null, e.subtreeFlags = ge, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
    else {
      e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = ge, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type;
      var a = n.dependencies;
      e.dependencies = a === null ? null : {
        lanes: a.lanes,
        firstContext: a.firstContext
      }, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration;
    }
    return e;
  }
  function Zw(e, t, n) {
    var a;
    return e === ac ? (a = Ue, t === !0 && (a |= Et, a |= Pa)) : a = he, Sa && (a |= Ke), Kn(R, null, null, a);
  }
  function vm(e, t, n, a, r, i) {
    var l = M, o = e;
    if (typeof e == "function")
      pm(e) ? (l = x, o = um(o)) : o = Kl(o);
    else if (typeof e == "string")
      l = Y;
    else
      e: switch (e) {
        case za:
          return ai(n.children, r, i, t);
        case si:
          l = G, r |= Et, (r & Ue) !== he && (r |= Pa);
          break;
        case g:
          return ej(n, r, i, t);
        case Ae:
          return tj(n, r, i, t);
        case Ee:
          return nj(n, r, i, t);
        case ut:
          return mE(n, r, i, t);
        case dn:
        case jt:
        case Fa:
        case ga:
        case ot:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case P:
                l = q;
                break e;
              case X:
                l = le;
                break e;
              case pe:
                l = I, o = sm(o);
                break e;
              case De:
                l = oe;
                break e;
              case me:
                l = Pe, o = null;
                break e;
            }
          var u = "";
          {
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var d = a ? Te(a) : null;
            d && (u += `

Check the render method of \`` + d + "`.");
          }
          throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + u));
        }
      }
    var v = Kn(l, n, t, r);
    return v.elementType = e, v.type = o, v.lanes = i, v._debugOwner = a, v;
  }
  function mm(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, o = vm(r, i, l, a, t, n);
    return o._debugSource = e._source, o._debugOwner = e._owner, o;
  }
  function ai(e, t, n, a) {
    var r = Kn(F, e, a, t);
    return r.lanes = n, r;
  }
  function ej(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Kn(ie, e, a, t | Ke);
    return r.elementType = g, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function tj(e, t, n, a) {
    var r = Kn(te, e, a, t);
    return r.elementType = Ae, r.lanes = n, r;
  }
  function nj(e, t, n, a) {
    var r = Kn(Ze, e, a, t);
    return r.elementType = Ee, r.lanes = n, r;
  }
  function mE(e, t, n, a) {
    var r = Kn(xe, e, a, t);
    r.elementType = ut, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function hm(e, t, n) {
    var a = Kn(Z, e, null, t);
    return a.lanes = n, a;
  }
  function aj() {
    var e = Kn(Y, null, null, he);
    return e.elementType = "DELETED", e;
  }
  function rj(e) {
    var t = Kn(Ge, null, null, he);
    return t.stateNode = e, t;
  }
  function ym(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Kn(H, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function hE(e, t) {
    return e === null && (e = Kn(M, null, null, he)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function ij(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Jd, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = qt, this.eventTimes = Sd(B), this.expirationTimes = Sd(it), this.pendingLanes = B, this.suspendedLanes = B, this.pingedLanes = B, this.expiredLanes = B, this.mutableReadLanes = B, this.finishedLanes = B, this.entangledLanes = B, this.entanglements = Sd(B), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
    {
      this.memoizedUpdaters = /* @__PURE__ */ new Set();
      for (var i = this.pendingUpdatersLaneMap = [], l = 0; l < Jf; l++)
        i.push(/* @__PURE__ */ new Set());
    }
    switch (t) {
      case ac:
        this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
        break;
      case Yr:
        this._debugRootType = n ? "hydrate()" : "render()";
        break;
    }
  }
  function yE(e, t, n, a, r, i, l, o, u, d) {
    var v = new ij(e, t, n, o, u), N = Zw(t, i);
    v.current = N, N.stateNode = v;
    {
      var S = {
        element: a,
        isDehydrated: n,
        cache: null,
        // not enabled yet
        transitions: null,
        pendingSuspenseBoundaries: null
      };
      N.memoizedState = S;
    }
    return _p(N), v;
  }
  var gm = "18.3.1";
  function lj(e, t, n) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    return ea(a), {
      // This tag allow us to uniquely identify this as a React Portal
      $$typeof: $n,
      key: a == null ? null : "" + a,
      children: e,
      containerInfo: t,
      implementation: n
    };
  }
  var bm, Em;
  bm = !1, Em = {};
  function gE(e) {
    if (!e)
      return Qn;
    var t = sl(e), n = P0(t);
    if (t.tag === x) {
      var a = t.type;
      if (Ia(a))
        return Iy(t, a, n);
    }
    return n;
  }
  function oj(e, t) {
    {
      var n = sl(e);
      if (n === void 0) {
        if (typeof e.render == "function")
          throw new Error("Unable to find node on an unmounted component.");
        var a = Object.keys(e).join(",");
        throw new Error("Argument appears to not be a ReactComponent. Keys: " + a);
      }
      var r = mh(n);
      if (r === null)
        return null;
      if (r.mode & Et) {
        var i = Te(n) || "Component";
        if (!Em[i]) {
          Em[i] = !0;
          var l = xn;
          try {
            ft(r), n.mode & Et ? f("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : f("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            l ? ft(l) : $t();
          }
        }
      }
      return r.stateNode;
    }
  }
  function bE(e, t, n, a, r, i, l, o) {
    var u = !1, d = null;
    return yE(e, t, u, d, n, a, r, i, l);
  }
  function EE(e, t, n, a, r, i, l, o, u, d) {
    var v = !0, N = yE(n, a, v, e, r, i, l, o, u);
    N.context = gE(null);
    var S = N.current, j = jn(), O = ti(S), V = Sr(j, O);
    return V.callback = t ?? null, Gr(S, V, O), vw(N, O, j), N;
  }
  function Iu(e, t, n, a) {
    VN(t, e);
    var r = t.current, i = jn(), l = ti(r);
    tx(l);
    var o = gE(n);
    t.context === null ? t.context = o : t.pendingContext = o, mi && xn !== null && !bm && (bm = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Te(xn) || "Unknown"));
    var u = Sr(i, l);
    u.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), u.callback = a);
    var d = Gr(r, u, l);
    return d !== null && (zt(d, r, l, i), gc(d, r, l)), l;
  }
  function uf(e) {
    var t = e.current;
    if (!t.child)
      return null;
    switch (t.child.tag) {
      case Y:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function uj(e) {
    switch (e.tag) {
      case R: {
        var t = e.stateNode;
        if (Ds(t)) {
          var n = cx(t);
          gw(t, n);
        }
        break;
      }
      case te: {
        Cr(function() {
          var r = kn(e, Se);
          if (r !== null) {
            var i = jn();
            zt(r, e, Se, i);
          }
        });
        var a = Se;
        Sm(e, a);
        break;
      }
    }
  }
  function SE(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = hx(n.retryLane, t));
  }
  function Sm(e, t) {
    SE(e, t);
    var n = e.alternate;
    n && SE(n, t);
  }
  function sj(e) {
    if (e.tag === te) {
      var t = _o, n = kn(e, t);
      if (n !== null) {
        var a = jn();
        zt(n, e, t, a);
      }
      Sm(e, t);
    }
  }
  function cj(e) {
    if (e.tag === te) {
      var t = ti(e), n = kn(e, t);
      if (n !== null) {
        var a = jn();
        zt(n, e, t, a);
      }
      Sm(e, t);
    }
  }
  function NE(e) {
    var t = TN(e);
    return t === null ? null : t.stateNode;
  }
  var xE = function(e) {
    return null;
  };
  function fj(e) {
    return xE(e);
  }
  var RE = function(e) {
    return !1;
  };
  function dj(e) {
    return RE(e);
  }
  var CE = null, TE = null, DE = null, wE = null, jE = null, _E = null, OE = null, LE = null, ME = null;
  {
    var AE = function(e, t, n) {
      var a = t[n], r = Le(e) ? e.slice() : Oe({}, e);
      return n + 1 === t.length ? (Le(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = AE(e[a], t, n + 1), r);
    }, VE = function(e, t) {
      return AE(e, t, 0);
    }, UE = function(e, t, n, a) {
      var r = t[a], i = Le(e) ? e.slice() : Oe({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], Le(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = UE(
          // $FlowFixMe number or string is fine here
          e[r],
          t,
          n,
          a + 1
        );
      return i;
    }, kE = function(e, t, n) {
      if (t.length !== n.length) {
        D("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            D("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return UE(e, t, n, 0);
    }, zE = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = Le(e) ? e.slice() : Oe({}, e);
      return i[r] = zE(e[r], t, n + 1, a), i;
    }, FE = function(e, t, n) {
      return zE(e, t, 0, n);
    }, Nm = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    CE = function(e, t, n, a) {
      var r = Nm(e, t);
      if (r !== null) {
        var i = FE(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Oe({}, e.memoizedProps);
        var l = kn(e, Se);
        l !== null && zt(l, e, Se, it);
      }
    }, TE = function(e, t, n) {
      var a = Nm(e, t);
      if (a !== null) {
        var r = VE(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = Oe({}, e.memoizedProps);
        var i = kn(e, Se);
        i !== null && zt(i, e, Se, it);
      }
    }, DE = function(e, t, n, a) {
      var r = Nm(e, t);
      if (r !== null) {
        var i = kE(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Oe({}, e.memoizedProps);
        var l = kn(e, Se);
        l !== null && zt(l, e, Se, it);
      }
    }, wE = function(e, t, n) {
      e.pendingProps = FE(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = kn(e, Se);
      a !== null && zt(a, e, Se, it);
    }, jE = function(e, t) {
      e.pendingProps = VE(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = kn(e, Se);
      n !== null && zt(n, e, Se, it);
    }, _E = function(e, t, n) {
      e.pendingProps = kE(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = kn(e, Se);
      a !== null && zt(a, e, Se, it);
    }, OE = function(e) {
      var t = kn(e, Se);
      t !== null && zt(t, e, Se, it);
    }, LE = function(e) {
      xE = e;
    }, ME = function(e) {
      RE = e;
    };
  }
  function pj(e) {
    var t = mh(e);
    return t === null ? null : t.stateNode;
  }
  function vj(e) {
    return null;
  }
  function mj() {
    return xn;
  }
  function hj(e) {
    var t = e.findFiberByHostInstance, n = h.ReactCurrentDispatcher;
    return AN({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: CE,
      overrideHookStateDeletePath: TE,
      overrideHookStateRenamePath: DE,
      overrideProps: wE,
      overridePropsDeletePath: jE,
      overridePropsRenamePath: _E,
      setErrorHandler: LE,
      setSuspenseHandler: ME,
      scheduleUpdate: OE,
      currentDispatcherRef: n,
      findHostInstanceByFiber: pj,
      findFiberByHostInstance: t || vj,
      // React Refresh
      findHostInstancesForRefresh: qw,
      scheduleRefresh: Yw,
      scheduleRoot: Iw,
      setRefreshHandler: $w,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: mj,
      // Enables DevTools to detect reconciler version rather than renderer version
      // which may not match for third party renderers.
      reconcilerVersion: gm
    });
  }
  var HE = typeof reportError == "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : function(e) {
    console.error(e);
  };
  function xm(e) {
    this._internalRoot = e;
  }
  sf.prototype.render = xm.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw new Error("Cannot update an unmounted root.");
    {
      typeof arguments[1] == "function" ? f("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : cf(arguments[1]) ? f("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && f("You passed a second argument to root.render(...) but it only accepts one argument.");
      var n = t.containerInfo;
      if (n.nodeType !== Rt) {
        var a = NE(t.current);
        a && a.parentNode !== n && f("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
      }
    }
    Iu(e, t, null, null);
  }, sf.prototype.unmount = xm.prototype.unmount = function() {
    typeof arguments[0] == "function" && f("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Jb() && f("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Cr(function() {
        Iu(null, e, null, null);
      }), Hy(t);
    }
  };
  function yj(e, t) {
    if (!cf(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    BE(e);
    var n = !1, a = !1, r = "", i = HE;
    t != null && (t.hydrate ? D("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === na && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = bE(e, ac, null, n, a, r, i);
    Ks(l.current, e);
    var o = e.nodeType === Rt ? e.parentNode : e;
    return Xo(o), new xm(l);
  }
  function sf(e) {
    this._internalRoot = e;
  }
  function gj(e) {
    e && Mx(e);
  }
  sf.prototype.unstable_scheduleHydration = gj;
  function bj(e, t, n) {
    if (!cf(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    BE(e), t === void 0 && f("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, o = "", u = HE;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (u = n.onRecoverableError));
    var d = EE(t, null, e, ac, a, i, l, o, u);
    if (Ks(d.current, e), Xo(e), r)
      for (var v = 0; v < r.length; v++) {
        var N = r[v];
        xT(d, N);
      }
    return new sf(d);
  }
  function cf(e) {
    return !!(e && (e.nodeType === Vn || e.nodeType === sr || e.nodeType === jf));
  }
  function qu(e) {
    return !!(e && (e.nodeType === Vn || e.nodeType === sr || e.nodeType === jf || e.nodeType === Rt && e.nodeValue === " react-mount-point-unstable "));
  }
  function BE(e) {
    e.nodeType === Vn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), uu(e) && (e._reactRootContainer ? f("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : f("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var Ej = h.ReactCurrentOwner, PE;
  PE = function(e) {
    if (e._reactRootContainer && e.nodeType !== Rt) {
      var t = NE(e._reactRootContainer.current);
      t && t.parentNode !== e && f("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = Rm(e), r = !!(a && Pr(a));
    r && !n && f("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Vn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function Rm(e) {
    return e ? e.nodeType === sr ? e.documentElement : e.firstChild : null;
  }
  function $E() {
  }
  function Sj(e, t, n, a, r) {
    if (r) {
      if (typeof a == "function") {
        var i = a;
        a = function() {
          var S = uf(l);
          i.call(S);
        };
      }
      var l = EE(
        t,
        a,
        e,
        Yr,
        null,
        // hydrationCallbacks
        !1,
        // isStrictMode
        !1,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        $E
      );
      e._reactRootContainer = l, Ks(l.current, e);
      var o = e.nodeType === Rt ? e.parentNode : e;
      return Xo(o), Cr(), l;
    } else {
      for (var u; u = e.lastChild; )
        e.removeChild(u);
      if (typeof a == "function") {
        var d = a;
        a = function() {
          var S = uf(v);
          d.call(S);
        };
      }
      var v = bE(
        e,
        Yr,
        null,
        // hydrationCallbacks
        !1,
        // isStrictMode
        !1,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        $E
      );
      e._reactRootContainer = v, Ks(v.current, e);
      var N = e.nodeType === Rt ? e.parentNode : e;
      return Xo(N), Cr(function() {
        Iu(t, v, n, a);
      }), v;
    }
  }
  function Nj(e, t) {
    e !== null && typeof e != "function" && f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function ff(e, t, n, a, r) {
    PE(n), Nj(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = Sj(n, t, e, r, a);
    else {
      if (l = i, typeof r == "function") {
        var o = r;
        r = function() {
          var u = uf(l);
          o.call(u);
        };
      }
      Iu(t, l, e, r);
    }
    return uf(l);
  }
  var YE = !1;
  function xj(e) {
    {
      YE || (YE = !0, f("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = Ej.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", $e(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === Vn ? e : oj(e, "findDOMNode");
  }
  function Rj(e, t, n) {
    if (f("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !qu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = uu(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return ff(null, e, t, !0, n);
  }
  function Cj(e, t, n) {
    if (f("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !qu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = uu(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return ff(null, e, t, !1, n);
  }
  function Tj(e, t, n, a) {
    if (f("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !qu(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !EN(e))
      throw new Error("parentComponent must be a valid React Component");
    return ff(e, t, n, !1, a);
  }
  var IE = !1;
  function Dj(e) {
    if (IE || (IE = !0, f("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !qu(e))
      throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
    {
      var t = uu(e) && e._reactRootContainer === void 0;
      t && f("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
    }
    if (e._reactRootContainer) {
      {
        var n = Rm(e), a = n && !Pr(n);
        a && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
      }
      return Cr(function() {
        ff(null, null, e, !1, function() {
          e._reactRootContainer = null, Hy(e);
        });
      }), !0;
    } else {
      {
        var r = Rm(e), i = !!(r && Pr(r)), l = e.nodeType === Vn && qu(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  xx(uj), Cx(sj), Tx(cj), Dx(Na), wx(Ex), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), sN(jC), dN(tm, bw, Cr);
  function wj(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!cf(t))
      throw new Error("Target container is not a DOM element.");
    return lj(e, t, null, n);
  }
  function jj(e, t, n, a) {
    return Tj(e, t, n, a);
  }
  var Cm = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [Pr, Dl, Xs, nh, ah, tm]
  };
  function _j(e, t) {
    return Cm.usingClientEntryPoint || f('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), yj(e, t);
  }
  function Oj(e, t, n) {
    return Cm.usingClientEntryPoint || f('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), bj(e, t, n);
  }
  function Lj(e) {
    return Jb() && f("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Cr(e);
  }
  var Mj = hj({
    findFiberByHostInstance: Oi,
    bundleType: 1,
    version: gm,
    rendererPackageName: "react-dom"
  });
  if (!Mj && Xt && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var qE = window.location.protocol;
    /^(https?|file):$/.test(qE) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (qE === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  Jn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Cm, Jn.createPortal = wj, Jn.createRoot = _j, Jn.findDOMNode = xj, Jn.flushSync = Lj, Jn.hydrate = Rj, Jn.hydrateRoot = Oj, Jn.render = Cj, Jn.unmountComponentAtNode = Dj, Jn.unstable_batchedUpdates = tm, Jn.unstable_renderSubtreeIntoContainer = jj, Jn.version = gm, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
uS.exports = Jn;
var Pj = uS.exports, fS, GE = Pj;
{
  var WE = GE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  fS = function(c, p) {
    WE.usingClientEntryPoint = !0;
    try {
      return GE.createRoot(c, p);
    } finally {
      WE.usingClientEntryPoint = !1;
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
function Wu() {
  return Wu = Object.assign ? Object.assign.bind() : function(c) {
    for (var p = 1; p < arguments.length; p++) {
      var h = arguments[p];
      for (var b in h)
        Object.prototype.hasOwnProperty.call(h, b) && (c[b] = h[b]);
    }
    return c;
  }, Wu.apply(this, arguments);
}
var ii;
(function(c) {
  c.Pop = "POP", c.Push = "PUSH", c.Replace = "REPLACE";
})(ii || (ii = {}));
const QE = "popstate";
function $j(c) {
  c === void 0 && (c = {});
  function p(b, E) {
    let {
      pathname: D,
      search: f,
      hash: z
    } = b.location;
    return jm(
      "",
      {
        pathname: D,
        search: f,
        hash: z
      },
      // state defaults to `null` because `window.history.state` does
      E.state && E.state.usr || null,
      E.state && E.state.key || "default"
    );
  }
  function h(b, E) {
    return typeof E == "string" ? E : Qu(E);
  }
  return Ij(p, h, null, c);
}
function pt(c, p) {
  if (c === !1 || c === null || typeof c > "u")
    throw new Error(p);
}
function Aa(c, p) {
  if (!c) {
    typeof console < "u" && console.warn(p);
    try {
      throw new Error(p);
    } catch {
    }
  }
}
function Yj() {
  return Math.random().toString(36).substr(2, 8);
}
function KE(c, p) {
  return {
    usr: c.state,
    key: c.key,
    idx: p
  };
}
function jm(c, p, h, b) {
  return h === void 0 && (h = null), Wu({
    pathname: typeof c == "string" ? c : c.pathname,
    search: "",
    hash: ""
  }, typeof p == "string" ? Zl(p) : p, {
    state: h,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: p && p.key || b || Yj()
  });
}
function Qu(c) {
  let {
    pathname: p = "/",
    search: h = "",
    hash: b = ""
  } = c;
  return h && h !== "?" && (p += h.charAt(0) === "?" ? h : "?" + h), b && b !== "#" && (p += b.charAt(0) === "#" ? b : "#" + b), p;
}
function Zl(c) {
  let p = {};
  if (c) {
    let h = c.indexOf("#");
    h >= 0 && (p.hash = c.substr(h), c = c.substr(0, h));
    let b = c.indexOf("?");
    b >= 0 && (p.search = c.substr(b), c = c.substr(0, b)), c && (p.pathname = c);
  }
  return p;
}
function Ij(c, p, h, b) {
  b === void 0 && (b = {});
  let {
    window: E = document.defaultView,
    v5Compat: D = !1
  } = b, f = E.history, z = ii.Pop, w = null, x = M();
  x == null && (x = 0, f.replaceState(Wu({}, f.state, {
    idx: x
  }), ""));
  function M() {
    return (f.state || {
      idx: null
    }).idx;
  }
  function R() {
    z = ii.Pop;
    let G = M(), le = G == null ? null : G - x;
    x = G, w && w({
      action: z,
      location: F.location,
      delta: le
    });
  }
  function H(G, le) {
    z = ii.Push;
    let q = jm(F.location, G, le);
    x = M() + 1;
    let I = KE(q, x), ie = F.createHref(q);
    try {
      f.pushState(I, "", ie);
    } catch (te) {
      if (te instanceof DOMException && te.name === "DataCloneError")
        throw te;
      E.location.assign(ie);
    }
    D && w && w({
      action: z,
      location: F.location,
      delta: 1
    });
  }
  function Y(G, le) {
    z = ii.Replace;
    let q = jm(F.location, G, le);
    x = M();
    let I = KE(q, x), ie = F.createHref(q);
    f.replaceState(I, "", ie), D && w && w({
      action: z,
      location: F.location,
      delta: 0
    });
  }
  function Z(G) {
    let le = E.location.origin !== "null" ? E.location.origin : E.location.href, q = typeof G == "string" ? G : Qu(G);
    return q = q.replace(/ $/, "%20"), pt(le, "No window.location.(origin|href) available to create URL for href: " + q), new URL(q, le);
  }
  let F = {
    get action() {
      return z;
    },
    get location() {
      return c(E, f);
    },
    listen(G) {
      if (w)
        throw new Error("A history only accepts one active listener");
      return E.addEventListener(QE, R), w = G, () => {
        E.removeEventListener(QE, R), w = null;
      };
    },
    createHref(G) {
      return p(E, G);
    },
    createURL: Z,
    encodeLocation(G) {
      let le = Z(G);
      return {
        pathname: le.pathname,
        search: le.search,
        hash: le.hash
      };
    },
    push: H,
    replace: Y,
    go(G) {
      return f.go(G);
    }
  };
  return F;
}
var XE;
(function(c) {
  c.data = "data", c.deferred = "deferred", c.redirect = "redirect", c.error = "error";
})(XE || (XE = {}));
function qj(c, p, h) {
  return h === void 0 && (h = "/"), Gj(c, p, h);
}
function Gj(c, p, h, b) {
  let E = typeof p == "string" ? Zl(p) : p, D = li(E.pathname || "/", h);
  if (D == null)
    return null;
  let f = dS(c);
  Wj(f);
  let z = null;
  for (let w = 0; z == null && w < f.length; ++w) {
    let x = i_(D);
    z = a_(f[w], x);
  }
  return z;
}
function dS(c, p, h, b) {
  p === void 0 && (p = []), h === void 0 && (h = []), b === void 0 && (b = "");
  let E = (D, f, z) => {
    let w = {
      relativePath: z === void 0 ? D.path || "" : z,
      caseSensitive: D.caseSensitive === !0,
      childrenIndex: f,
      route: D
    };
    w.relativePath.startsWith("/") && (pt(w.relativePath.startsWith(b), 'Absolute route path "' + w.relativePath + '" nested under path ' + ('"' + b + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), w.relativePath = w.relativePath.slice(b.length));
    let x = wr([b, w.relativePath]), M = h.concat(w);
    D.children && D.children.length > 0 && (pt(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      D.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + x + '".')
    ), dS(D.children, p, M, x)), !(D.path == null && !D.index) && p.push({
      path: x,
      score: t_(x, D.index),
      routesMeta: M
    });
  };
  return c.forEach((D, f) => {
    var z;
    if (D.path === "" || !((z = D.path) != null && z.includes("?")))
      E(D, f);
    else
      for (let w of pS(D.path))
        E(D, f, w);
  }), p;
}
function pS(c) {
  let p = c.split("/");
  if (p.length === 0) return [];
  let [h, ...b] = p, E = h.endsWith("?"), D = h.replace(/\?$/, "");
  if (b.length === 0)
    return E ? [D, ""] : [D];
  let f = pS(b.join("/")), z = [];
  return z.push(...f.map((w) => w === "" ? D : [D, w].join("/"))), E && z.push(...f), z.map((w) => c.startsWith("/") && w === "" ? "/" : w);
}
function Wj(c) {
  c.sort((p, h) => p.score !== h.score ? h.score - p.score : n_(p.routesMeta.map((b) => b.childrenIndex), h.routesMeta.map((b) => b.childrenIndex)));
}
const Qj = /^:[\w-]+$/, Kj = 3, Xj = 2, Jj = 1, Zj = 10, e_ = -2, JE = (c) => c === "*";
function t_(c, p) {
  let h = c.split("/"), b = h.length;
  return h.some(JE) && (b += e_), p && (b += Xj), h.filter((E) => !JE(E)).reduce((E, D) => E + (Qj.test(D) ? Kj : D === "" ? Jj : Zj), b);
}
function n_(c, p) {
  return c.length === p.length && c.slice(0, -1).every((b, E) => b === p[E]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    c[c.length - 1] - p[p.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function a_(c, p, h) {
  let {
    routesMeta: b
  } = c, E = {}, D = "/", f = [];
  for (let z = 0; z < b.length; ++z) {
    let w = b[z], x = z === b.length - 1, M = D === "/" ? p : p.slice(D.length) || "/", R = _m({
      path: w.relativePath,
      caseSensitive: w.caseSensitive,
      end: x
    }, M), H = w.route;
    if (!R)
      return null;
    Object.assign(E, R.params), f.push({
      // TODO: Can this as be avoided?
      params: E,
      pathname: wr([D, R.pathname]),
      pathnameBase: s_(wr([D, R.pathnameBase])),
      route: H
    }), R.pathnameBase !== "/" && (D = wr([D, R.pathnameBase]));
  }
  return f;
}
function _m(c, p) {
  typeof c == "string" && (c = {
    path: c,
    caseSensitive: !1,
    end: !0
  });
  let [h, b] = r_(c.path, c.caseSensitive, c.end), E = p.match(h);
  if (!E) return null;
  let D = E[0], f = D.replace(/(.)\/+$/, "$1"), z = E.slice(1);
  return {
    params: b.reduce((x, M, R) => {
      let {
        paramName: H,
        isOptional: Y
      } = M;
      if (H === "*") {
        let F = z[R] || "";
        f = D.slice(0, D.length - F.length).replace(/(.)\/+$/, "$1");
      }
      const Z = z[R];
      return Y && !Z ? x[H] = void 0 : x[H] = (Z || "").replace(/%2F/g, "/"), x;
    }, {}),
    pathname: D,
    pathnameBase: f,
    pattern: c
  };
}
function r_(c, p, h) {
  p === void 0 && (p = !1), h === void 0 && (h = !0), Aa(c === "*" || !c.endsWith("*") || c.endsWith("/*"), 'Route path "' + c + '" will be treated as if it were ' + ('"' + c.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + c.replace(/\*$/, "/*") + '".'));
  let b = [], E = "^" + c.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, z, w) => (b.push({
    paramName: z,
    isOptional: w != null
  }), w ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return c.endsWith("*") ? (b.push({
    paramName: "*"
  }), E += c === "*" || c === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : h ? E += "\\/*$" : c !== "" && c !== "/" && (E += "(?:(?=\\/|$))"), [new RegExp(E, p ? void 0 : "i"), b];
}
function i_(c) {
  try {
    return c.split("/").map((p) => decodeURIComponent(p).replace(/\//g, "%2F")).join("/");
  } catch (p) {
    return Aa(!1, 'The URL path "' + c + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + p + ").")), c;
  }
}
function li(c, p) {
  if (p === "/") return c;
  if (!c.toLowerCase().startsWith(p.toLowerCase()))
    return null;
  let h = p.endsWith("/") ? p.length - 1 : p.length, b = c.charAt(h);
  return b && b !== "/" ? null : c.slice(h) || "/";
}
function l_(c, p) {
  p === void 0 && (p = "/");
  let {
    pathname: h,
    search: b = "",
    hash: E = ""
  } = typeof c == "string" ? Zl(c) : c;
  return {
    pathname: h ? h.startsWith("/") ? h : o_(h, p) : p,
    search: c_(b),
    hash: f_(E)
  };
}
function o_(c, p) {
  let h = p.replace(/\/+$/, "").split("/");
  return c.split("/").forEach((E) => {
    E === ".." ? h.length > 1 && h.pop() : E !== "." && h.push(E);
  }), h.length > 1 ? h.join("/") : "/";
}
function Tm(c, p, h, b) {
  return "Cannot include a '" + c + "' character in a manually specified " + ("`to." + p + "` field [" + JSON.stringify(b) + "].  Please separate it out to the ") + ("`to." + h + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function u_(c) {
  return c.filter((p, h) => h === 0 || p.route.path && p.route.path.length > 0);
}
function Lm(c, p) {
  let h = u_(c);
  return p ? h.map((b, E) => E === h.length - 1 ? b.pathname : b.pathnameBase) : h.map((b) => b.pathnameBase);
}
function Mm(c, p, h, b) {
  b === void 0 && (b = !1);
  let E;
  typeof c == "string" ? E = Zl(c) : (E = Wu({}, c), pt(!E.pathname || !E.pathname.includes("?"), Tm("?", "pathname", "search", E)), pt(!E.pathname || !E.pathname.includes("#"), Tm("#", "pathname", "hash", E)), pt(!E.search || !E.search.includes("#"), Tm("#", "search", "hash", E)));
  let D = c === "" || E.pathname === "", f = D ? "/" : E.pathname, z;
  if (f == null)
    z = h;
  else {
    let R = p.length - 1;
    if (!b && f.startsWith("..")) {
      let H = f.split("/");
      for (; H[0] === ".."; )
        H.shift(), R -= 1;
      E.pathname = H.join("/");
    }
    z = R >= 0 ? p[R] : "/";
  }
  let w = l_(E, z), x = f && f !== "/" && f.endsWith("/"), M = (D || f === ".") && h.endsWith("/");
  return !w.pathname.endsWith("/") && (x || M) && (w.pathname += "/"), w;
}
const wr = (c) => c.join("/").replace(/\/\/+/g, "/"), s_ = (c) => c.replace(/\/+$/, "").replace(/^\/*/, "/"), c_ = (c) => !c || c === "?" ? "" : c.startsWith("?") ? c : "?" + c, f_ = (c) => !c || c === "#" ? "" : c.startsWith("#") ? c : "#" + c;
function d_(c) {
  return c != null && typeof c.status == "number" && typeof c.statusText == "string" && typeof c.internal == "boolean" && "data" in c;
}
const vS = ["post", "put", "patch", "delete"];
new Set(vS);
const p_ = ["get", ...vS];
new Set(p_);
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
function Ku() {
  return Ku = Object.assign ? Object.assign.bind() : function(c) {
    for (var p = 1; p < arguments.length; p++) {
      var h = arguments[p];
      for (var b in h)
        Object.prototype.hasOwnProperty.call(h, b) && (c[b] = h[b]);
    }
    return c;
  }, Ku.apply(this, arguments);
}
const Ju = /* @__PURE__ */ L.createContext(null);
Ju.displayName = "DataRouter";
const Am = /* @__PURE__ */ L.createContext(null);
Am.displayName = "DataRouterState";
const v_ = /* @__PURE__ */ L.createContext(null);
v_.displayName = "Await";
const fa = /* @__PURE__ */ L.createContext(null);
fa.displayName = "Navigation";
const Zu = /* @__PURE__ */ L.createContext(null);
Zu.displayName = "Location";
const Va = /* @__PURE__ */ L.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Va.displayName = "Route";
const Vm = /* @__PURE__ */ L.createContext(null);
Vm.displayName = "RouteError";
function m_(c, p) {
  let {
    relative: h
  } = p === void 0 ? {} : p;
  eo() || pt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename: b,
    navigator: E
  } = L.useContext(fa), {
    hash: D,
    pathname: f,
    search: z
  } = es(c, {
    relative: h
  }), w = f;
  return b !== "/" && (w = f === "/" ? b : wr([b, f])), E.createHref({
    pathname: w,
    search: z,
    hash: D
  });
}
function eo() {
  return L.useContext(Zu) != null;
}
function Wi() {
  return eo() || pt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), L.useContext(Zu).location;
}
const mS = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function hS(c) {
  L.useContext(fa).static || L.useLayoutEffect(c);
}
function yS() {
  let {
    isDataRoute: c
  } = L.useContext(Va);
  return c ? __() : h_();
}
function h_() {
  eo() || pt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let c = L.useContext(Ju), {
    basename: p,
    future: h,
    navigator: b
  } = L.useContext(fa), {
    matches: E
  } = L.useContext(Va), {
    pathname: D
  } = Wi(), f = JSON.stringify(Lm(E, h.v7_relativeSplatPath)), z = L.useRef(!1);
  return hS(() => {
    z.current = !0;
  }), L.useCallback(function(x, M) {
    if (M === void 0 && (M = {}), Aa(z.current, mS), !z.current) return;
    if (typeof x == "number") {
      b.go(x);
      return;
    }
    let R = Mm(x, JSON.parse(f), D, M.relative === "path");
    c == null && p !== "/" && (R.pathname = R.pathname === "/" ? p : wr([p, R.pathname])), (M.replace ? b.replace : b.push)(R, M.state, M);
  }, [p, b, f, D, c]);
}
function y_() {
  let {
    matches: c
  } = L.useContext(Va), p = c[c.length - 1];
  return p ? p.params : {};
}
function es(c, p) {
  let {
    relative: h
  } = p === void 0 ? {} : p, {
    future: b
  } = L.useContext(fa), {
    matches: E
  } = L.useContext(Va), {
    pathname: D
  } = Wi(), f = JSON.stringify(Lm(E, b.v7_relativeSplatPath));
  return L.useMemo(() => Mm(c, JSON.parse(f), D, h === "path"), [c, f, D, h]);
}
function g_(c, p) {
  return b_(c, p);
}
function b_(c, p, h, b) {
  eo() || pt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: E
  } = L.useContext(fa), {
    matches: D
  } = L.useContext(Va), f = D[D.length - 1], z = f ? f.params : {}, w = f ? f.pathname : "/", x = f ? f.pathnameBase : "/", M = f && f.route;
  {
    let q = M && M.path || "";
    bS(w, !M || q.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + w + '" (under <Route path="' + q + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + q + '"> to <Route ') + ('path="' + (q === "/" ? "*" : q + "/*") + '">.'));
  }
  let R = Wi(), H;
  if (p) {
    var Y;
    let q = typeof p == "string" ? Zl(p) : p;
    x === "/" || (Y = q.pathname) != null && Y.startsWith(x) || pt(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + x + '" ') + ('but pathname "' + q.pathname + '" was given in the `location` prop.')), H = q;
  } else
    H = R;
  let Z = H.pathname || "/", F = Z;
  if (x !== "/") {
    let q = x.replace(/^\//, "").split("/");
    F = "/" + Z.replace(/^\//, "").split("/").slice(q.length).join("/");
  }
  let G = qj(c, {
    pathname: F
  });
  Aa(M || G != null, 'No routes matched location "' + H.pathname + H.search + H.hash + '" '), Aa(G == null || G[G.length - 1].route.element !== void 0 || G[G.length - 1].route.Component !== void 0 || G[G.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + H.pathname + H.search + H.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let le = R_(G && G.map((q) => Object.assign({}, q, {
    params: Object.assign({}, z, q.params),
    pathname: wr([
      x,
      // Re-encode pathnames that were decoded inside matchRoutes
      E.encodeLocation ? E.encodeLocation(q.pathname).pathname : q.pathname
    ]),
    pathnameBase: q.pathnameBase === "/" ? x : wr([
      x,
      // Re-encode pathnames that were decoded inside matchRoutes
      E.encodeLocation ? E.encodeLocation(q.pathnameBase).pathname : q.pathnameBase
    ])
  })), D, h, b);
  return p && le ? /* @__PURE__ */ L.createElement(Zu.Provider, {
    value: {
      location: Ku({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, H),
      navigationType: ii.Pop
    }
  }, le) : le;
}
function E_() {
  let c = j_(), p = d_(c) ? c.status + " " + c.statusText : c instanceof Error ? c.message : JSON.stringify(c), h = c instanceof Error ? c.stack : null, b = "rgba(200,200,200, 0.5)", E = {
    padding: "0.5rem",
    backgroundColor: b
  }, D = {
    padding: "2px 4px",
    backgroundColor: b
  }, f = null;
  return console.error("Error handled by React Router default ErrorBoundary:", c), f = /* @__PURE__ */ L.createElement(L.Fragment, null, /* @__PURE__ */ L.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ L.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ L.createElement("code", {
    style: D
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ L.createElement("code", {
    style: D
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ L.createElement(L.Fragment, null, /* @__PURE__ */ L.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ L.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, p), h ? /* @__PURE__ */ L.createElement("pre", {
    style: E
  }, h) : null, f);
}
const S_ = /* @__PURE__ */ L.createElement(E_, null);
class N_ extends L.Component {
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
  static getDerivedStateFromProps(p, h) {
    return h.location !== p.location || h.revalidation !== "idle" && p.revalidation === "idle" ? {
      error: p.error,
      location: p.location,
      revalidation: p.revalidation
    } : {
      error: p.error !== void 0 ? p.error : h.error,
      location: h.location,
      revalidation: p.revalidation || h.revalidation
    };
  }
  componentDidCatch(p, h) {
    console.error("React Router caught the following error during render", p, h);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ L.createElement(Va.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ L.createElement(Vm.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function x_(c) {
  let {
    routeContext: p,
    match: h,
    children: b
  } = c, E = L.useContext(Ju);
  return E && E.static && E.staticContext && (h.route.errorElement || h.route.ErrorBoundary) && (E.staticContext._deepestRenderedBoundaryId = h.route.id), /* @__PURE__ */ L.createElement(Va.Provider, {
    value: p
  }, b);
}
function R_(c, p, h, b) {
  var E;
  if (p === void 0 && (p = []), h === void 0 && (h = null), b === void 0 && (b = null), c == null) {
    var D;
    if (!h)
      return null;
    if (h.errors)
      c = h.matches;
    else if ((D = b) != null && D.v7_partialHydration && p.length === 0 && !h.initialized && h.matches.length > 0)
      c = h.matches;
    else
      return null;
  }
  let f = c, z = (E = h) == null ? void 0 : E.errors;
  if (z != null) {
    let M = f.findIndex((R) => R.route.id && (z == null ? void 0 : z[R.route.id]) !== void 0);
    M >= 0 || pt(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(z).join(",")), f = f.slice(0, Math.min(f.length, M + 1));
  }
  let w = !1, x = -1;
  if (h && b && b.v7_partialHydration)
    for (let M = 0; M < f.length; M++) {
      let R = f[M];
      if ((R.route.HydrateFallback || R.route.hydrateFallbackElement) && (x = M), R.route.id) {
        let {
          loaderData: H,
          errors: Y
        } = h, Z = R.route.loader && H[R.route.id] === void 0 && (!Y || Y[R.route.id] === void 0);
        if (R.route.lazy || Z) {
          w = !0, x >= 0 ? f = f.slice(0, x + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((M, R, H) => {
    let Y, Z = !1, F = null, G = null;
    h && (Y = z && R.route.id ? z[R.route.id] : void 0, F = R.route.errorElement || S_, w && (x < 0 && H === 0 ? (bS("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), Z = !0, G = null) : x === H && (Z = !0, G = R.route.hydrateFallbackElement || null)));
    let le = p.concat(f.slice(0, H + 1)), q = () => {
      let I;
      return Y ? I = F : Z ? I = G : R.route.Component ? I = /* @__PURE__ */ L.createElement(R.route.Component, null) : R.route.element ? I = R.route.element : I = M, /* @__PURE__ */ L.createElement(x_, {
        match: R,
        routeContext: {
          outlet: M,
          matches: le,
          isDataRoute: h != null
        },
        children: I
      });
    };
    return h && (R.route.ErrorBoundary || R.route.errorElement || H === 0) ? /* @__PURE__ */ L.createElement(N_, {
      location: h.location,
      revalidation: h.revalidation,
      component: F,
      error: Y,
      children: q(),
      routeContext: {
        outlet: null,
        matches: le,
        isDataRoute: !0
      }
    }) : q();
  }, null);
}
var gS = /* @__PURE__ */ function(c) {
  return c.UseBlocker = "useBlocker", c.UseRevalidator = "useRevalidator", c.UseNavigateStable = "useNavigate", c;
}(gS || {}), Xu = /* @__PURE__ */ function(c) {
  return c.UseBlocker = "useBlocker", c.UseLoaderData = "useLoaderData", c.UseActionData = "useActionData", c.UseRouteError = "useRouteError", c.UseNavigation = "useNavigation", c.UseRouteLoaderData = "useRouteLoaderData", c.UseMatches = "useMatches", c.UseRevalidator = "useRevalidator", c.UseNavigateStable = "useNavigate", c.UseRouteId = "useRouteId", c;
}(Xu || {});
function Um(c) {
  return c + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function C_(c) {
  let p = L.useContext(Ju);
  return p || pt(!1, Um(c)), p;
}
function T_(c) {
  let p = L.useContext(Am);
  return p || pt(!1, Um(c)), p;
}
function D_(c) {
  let p = L.useContext(Va);
  return p || pt(!1, Um(c)), p;
}
function km(c) {
  let p = D_(c), h = p.matches[p.matches.length - 1];
  return h.route.id || pt(!1, c + ' can only be used on routes that contain a unique "id"'), h.route.id;
}
function w_() {
  return km(Xu.UseRouteId);
}
function j_() {
  var c;
  let p = L.useContext(Vm), h = T_(Xu.UseRouteError), b = km(Xu.UseRouteError);
  return p !== void 0 ? p : (c = h.errors) == null ? void 0 : c[b];
}
function __() {
  let {
    router: c
  } = C_(gS.UseNavigateStable), p = km(Xu.UseNavigateStable), h = L.useRef(!1);
  return hS(() => {
    h.current = !0;
  }), L.useCallback(function(E, D) {
    D === void 0 && (D = {}), Aa(h.current, mS), h.current && (typeof E == "number" ? c.navigate(E) : c.navigate(E, Ku({
      fromRouteId: p
    }, D)));
  }, [c, p]);
}
const ZE = {};
function bS(c, p, h) {
  !p && !ZE[c] && (ZE[c] = !0, Aa(!1, h));
}
const eS = {};
function O_(c, p) {
  eS[p] || (eS[p] = !0, console.warn(p));
}
const tS = (c, p, h) => O_(c, "⚠️ React Router Future Flag Warning: " + p + ". " + ("You can use the `" + c + "` future flag to opt-in early. ") + ("For more information, see " + h + "."));
function L_(c, p) {
  (c == null ? void 0 : c.v7_startTransition) === void 0 && tS("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (c == null ? void 0 : c.v7_relativeSplatPath) === void 0 && tS("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function M_(c) {
  let {
    to: p,
    replace: h,
    state: b,
    relative: E
  } = c;
  eo() || pt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let {
    future: D,
    static: f
  } = L.useContext(fa);
  Aa(!f, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: z
  } = L.useContext(Va), {
    pathname: w
  } = Wi(), x = yS(), M = Mm(p, Lm(z, D.v7_relativeSplatPath), w, E === "path"), R = JSON.stringify(M);
  return L.useEffect(() => x(JSON.parse(R), {
    replace: h,
    state: b,
    relative: E
  }), [x, R, E, h, b]), null;
}
function ri(c) {
  pt(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function A_(c) {
  let {
    basename: p = "/",
    children: h = null,
    location: b,
    navigationType: E = ii.Pop,
    navigator: D,
    static: f = !1,
    future: z
  } = c;
  eo() && pt(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let w = p.replace(/^\/*/, "/"), x = L.useMemo(() => ({
    basename: w,
    navigator: D,
    static: f,
    future: Ku({
      v7_relativeSplatPath: !1
    }, z)
  }), [w, z, D, f]);
  typeof b == "string" && (b = Zl(b));
  let {
    pathname: M = "/",
    search: R = "",
    hash: H = "",
    state: Y = null,
    key: Z = "default"
  } = b, F = L.useMemo(() => {
    let G = li(M, w);
    return G == null ? null : {
      location: {
        pathname: G,
        search: R,
        hash: H,
        state: Y,
        key: Z
      },
      navigationType: E
    };
  }, [w, M, R, H, Y, Z, E]);
  return Aa(F != null, '<Router basename="' + w + '"> is not able to match the URL ' + ('"' + M + R + H + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), F == null ? null : /* @__PURE__ */ L.createElement(fa.Provider, {
    value: x
  }, /* @__PURE__ */ L.createElement(Zu.Provider, {
    children: h,
    value: F
  }));
}
function V_(c) {
  let {
    children: p,
    location: h
  } = c;
  return g_(Om(p), h);
}
new Promise(() => {
});
function Om(c, p) {
  p === void 0 && (p = []);
  let h = [];
  return L.Children.forEach(c, (b, E) => {
    if (!/* @__PURE__ */ L.isValidElement(b))
      return;
    let D = [...p, E];
    if (b.type === L.Fragment) {
      h.push.apply(h, Om(b.props.children, D));
      return;
    }
    b.type !== ri && pt(!1, "[" + (typeof b.type == "string" ? b.type : b.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !b.props.index || !b.props.children || pt(!1, "An index route cannot have child routes.");
    let f = {
      id: b.props.id || D.join("-"),
      caseSensitive: b.props.caseSensitive,
      element: b.props.element,
      Component: b.props.Component,
      index: b.props.index,
      path: b.props.path,
      loader: b.props.loader,
      action: b.props.action,
      errorElement: b.props.errorElement,
      ErrorBoundary: b.props.ErrorBoundary,
      hasErrorBoundary: b.props.ErrorBoundary != null || b.props.errorElement != null,
      shouldRevalidate: b.props.shouldRevalidate,
      handle: b.props.handle,
      lazy: b.props.lazy
    };
    b.props.children && (f.children = Om(b.props.children, D)), h.push(f);
  }), h;
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
function Jl() {
  return Jl = Object.assign ? Object.assign.bind() : function(c) {
    for (var p = 1; p < arguments.length; p++) {
      var h = arguments[p];
      for (var b in h)
        Object.prototype.hasOwnProperty.call(h, b) && (c[b] = h[b]);
    }
    return c;
  }, Jl.apply(this, arguments);
}
function zm(c, p) {
  if (c == null) return {};
  var h = {}, b = Object.keys(c), E, D;
  for (D = 0; D < b.length; D++)
    E = b[D], !(p.indexOf(E) >= 0) && (h[E] = c[E]);
  return h;
}
const pf = "get", vf = "application/x-www-form-urlencoded";
function yf(c) {
  return c != null && typeof c.tagName == "string";
}
function U_(c) {
  return yf(c) && c.tagName.toLowerCase() === "button";
}
function k_(c) {
  return yf(c) && c.tagName.toLowerCase() === "form";
}
function z_(c) {
  return yf(c) && c.tagName.toLowerCase() === "input";
}
function F_(c) {
  return !!(c.metaKey || c.altKey || c.ctrlKey || c.shiftKey);
}
function H_(c, p) {
  return c.button === 0 && // Ignore everything but left clicks
  (!p || p === "_self") && // Let browser handle "target=_blank" etc.
  !F_(c);
}
let df = null;
function B_() {
  if (df === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), df = !1;
    } catch {
      df = !0;
    }
  return df;
}
const P_ = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Dm(c) {
  return c != null && !P_.has(c) ? (Aa(!1, '"' + c + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + vf + '"')), null) : c;
}
function $_(c, p) {
  let h, b, E, D, f;
  if (k_(c)) {
    let z = c.getAttribute("action");
    b = z ? li(z, p) : null, h = c.getAttribute("method") || pf, E = Dm(c.getAttribute("enctype")) || vf, D = new FormData(c);
  } else if (U_(c) || z_(c) && (c.type === "submit" || c.type === "image")) {
    let z = c.form;
    if (z == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let w = c.getAttribute("formaction") || z.getAttribute("action");
    if (b = w ? li(w, p) : null, h = c.getAttribute("formmethod") || z.getAttribute("method") || pf, E = Dm(c.getAttribute("formenctype")) || Dm(z.getAttribute("enctype")) || vf, D = new FormData(z, c), !B_()) {
      let {
        name: x,
        type: M,
        value: R
      } = c;
      if (M === "image") {
        let H = x ? x + "." : "";
        D.append(H + "x", "0"), D.append(H + "y", "0");
      } else x && D.append(x, R);
    }
  } else {
    if (yf(c))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    h = pf, b = null, E = vf, f = c;
  }
  return D && E === "text/plain" && (f = D, D = void 0), {
    action: b,
    method: h.toLowerCase(),
    encType: E,
    formData: D,
    body: f
  };
}
const Y_ = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], I_ = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], q_ = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], G_ = "6";
try {
  window.__reactRouterVersion = G_;
} catch {
}
const ES = /* @__PURE__ */ L.createContext({
  isTransitioning: !1
});
ES.displayName = "ViewTransition";
const W_ = /* @__PURE__ */ L.createContext(/* @__PURE__ */ new Map());
W_.displayName = "Fetchers";
const Q_ = "startTransition", nS = Hj[Q_];
function K_(c) {
  let {
    basename: p,
    children: h,
    future: b,
    window: E
  } = c, D = L.useRef();
  D.current == null && (D.current = $j({
    window: E,
    v5Compat: !0
  }));
  let f = D.current, [z, w] = L.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: x
  } = b || {}, M = L.useCallback((R) => {
    x && nS ? nS(() => w(R)) : w(R);
  }, [w, x]);
  return L.useLayoutEffect(() => f.listen(M), [f, M]), L.useEffect(() => L_(b), [b]), /* @__PURE__ */ L.createElement(A_, {
    basename: p,
    children: h,
    location: z.location,
    navigationType: z.action,
    navigator: f,
    future: b
  });
}
const X_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", J_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, SS = /* @__PURE__ */ L.forwardRef(function(p, h) {
  let {
    onClick: b,
    relative: E,
    reloadDocument: D,
    replace: f,
    state: z,
    target: w,
    to: x,
    preventScrollReset: M,
    viewTransition: R
  } = p, H = zm(p, Y_), {
    basename: Y
  } = L.useContext(fa), Z, F = !1;
  if (typeof x == "string" && J_.test(x) && (Z = x, X_))
    try {
      let I = new URL(window.location.href), ie = x.startsWith("//") ? new URL(I.protocol + x) : new URL(x), te = li(ie.pathname, Y);
      ie.origin === I.origin && te != null ? x = te + ie.search + ie.hash : F = !0;
    } catch {
      Aa(!1, '<Link to="' + x + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let G = m_(x, {
    relative: E
  }), le = n1(x, {
    replace: f,
    state: z,
    target: w,
    preventScrollReset: M,
    relative: E,
    viewTransition: R
  });
  function q(I) {
    b && b(I), I.defaultPrevented || le(I);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ L.createElement("a", Jl({}, H, {
      href: Z || G,
      onClick: F || D ? b : q,
      ref: h,
      target: w
    }))
  );
});
SS.displayName = "Link";
const Z_ = /* @__PURE__ */ L.forwardRef(function(p, h) {
  let {
    "aria-current": b = "page",
    caseSensitive: E = !1,
    className: D = "",
    end: f = !1,
    style: z,
    to: w,
    viewTransition: x,
    children: M
  } = p, R = zm(p, I_), H = es(w, {
    relative: R.relative
  }), Y = Wi(), Z = L.useContext(Am), {
    navigator: F,
    basename: G
  } = L.useContext(fa), le = Z != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  u1(H) && x === !0, q = F.encodeLocation ? F.encodeLocation(H).pathname : H.pathname, I = Y.pathname, ie = Z && Z.navigation && Z.navigation.location ? Z.navigation.location.pathname : null;
  E || (I = I.toLowerCase(), ie = ie ? ie.toLowerCase() : null, q = q.toLowerCase()), ie && G && (ie = li(ie, G) || ie);
  const te = q !== "/" && q.endsWith("/") ? q.length - 1 : q.length;
  let oe = I === q || !f && I.startsWith(q) && I.charAt(te) === "/", ce = ie != null && (ie === q || !f && ie.startsWith(q) && ie.charAt(q.length) === "/"), Pe = {
    isActive: oe,
    isPending: ce,
    isTransitioning: le
  }, Fe = oe ? b : void 0, Ge;
  typeof D == "function" ? Ge = D(Pe) : Ge = [D, oe ? "active" : null, ce ? "pending" : null, le ? "transitioning" : null].filter(Boolean).join(" ");
  let Ze = typeof z == "function" ? z(Pe) : z;
  return /* @__PURE__ */ L.createElement(SS, Jl({}, R, {
    "aria-current": Fe,
    className: Ge,
    ref: h,
    style: Ze,
    to: w,
    viewTransition: x
  }), typeof M == "function" ? M(Pe) : M);
});
Z_.displayName = "NavLink";
const e1 = /* @__PURE__ */ L.forwardRef((c, p) => {
  let {
    fetcherKey: h,
    navigate: b,
    reloadDocument: E,
    replace: D,
    state: f,
    method: z = pf,
    action: w,
    onSubmit: x,
    relative: M,
    preventScrollReset: R,
    viewTransition: H
  } = c, Y = zm(c, q_), Z = l1(), F = o1(w, {
    relative: M
  }), G = z.toLowerCase() === "get" ? "get" : "post", le = (q) => {
    if (x && x(q), q.defaultPrevented) return;
    q.preventDefault();
    let I = q.nativeEvent.submitter, ie = (I == null ? void 0 : I.getAttribute("formmethod")) || z;
    Z(I || q.currentTarget, {
      fetcherKey: h,
      method: ie,
      navigate: b,
      replace: D,
      state: f,
      relative: M,
      preventScrollReset: R,
      viewTransition: H
    });
  };
  return /* @__PURE__ */ L.createElement("form", Jl({
    ref: p,
    method: G,
    action: F,
    onSubmit: E ? x : le
  }, Y));
});
e1.displayName = "Form";
var hf;
(function(c) {
  c.UseScrollRestoration = "useScrollRestoration", c.UseSubmit = "useSubmit", c.UseSubmitFetcher = "useSubmitFetcher", c.UseFetcher = "useFetcher", c.useViewTransitionState = "useViewTransitionState";
})(hf || (hf = {}));
var aS;
(function(c) {
  c.UseFetcher = "useFetcher", c.UseFetchers = "useFetchers", c.UseScrollRestoration = "useScrollRestoration";
})(aS || (aS = {}));
function t1(c) {
  return c + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function NS(c) {
  let p = L.useContext(Ju);
  return p || pt(!1, t1(c)), p;
}
function n1(c, p) {
  let {
    target: h,
    replace: b,
    state: E,
    preventScrollReset: D,
    relative: f,
    viewTransition: z
  } = p === void 0 ? {} : p, w = yS(), x = Wi(), M = es(c, {
    relative: f
  });
  return L.useCallback((R) => {
    if (H_(R, h)) {
      R.preventDefault();
      let H = b !== void 0 ? b : Qu(x) === Qu(M);
      w(c, {
        replace: H,
        state: E,
        preventScrollReset: D,
        relative: f,
        viewTransition: z
      });
    }
  }, [x, w, M, b, E, h, c, D, f, z]);
}
function a1() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let r1 = 0, i1 = () => "__" + String(++r1) + "__";
function l1() {
  let {
    router: c
  } = NS(hf.UseSubmit), {
    basename: p
  } = L.useContext(fa), h = w_();
  return L.useCallback(function(b, E) {
    E === void 0 && (E = {}), a1();
    let {
      action: D,
      method: f,
      encType: z,
      formData: w,
      body: x
    } = $_(b, p);
    if (E.navigate === !1) {
      let M = E.fetcherKey || i1();
      c.fetch(M, h, E.action || D, {
        preventScrollReset: E.preventScrollReset,
        formData: w,
        body: x,
        formMethod: E.method || f,
        formEncType: E.encType || z,
        flushSync: E.flushSync
      });
    } else
      c.navigate(E.action || D, {
        preventScrollReset: E.preventScrollReset,
        formData: w,
        body: x,
        formMethod: E.method || f,
        formEncType: E.encType || z,
        replace: E.replace,
        state: E.state,
        fromRouteId: h,
        flushSync: E.flushSync,
        viewTransition: E.viewTransition
      });
  }, [c, p, h]);
}
function o1(c, p) {
  let {
    relative: h
  } = p === void 0 ? {} : p, {
    basename: b
  } = L.useContext(fa), E = L.useContext(Va);
  E || pt(!1, "useFormAction must be used inside a RouteContext");
  let [D] = E.matches.slice(-1), f = Jl({}, es(c || ".", {
    relative: h
  })), z = Wi();
  if (c == null) {
    f.search = z.search;
    let w = new URLSearchParams(f.search), x = w.getAll("index");
    if (x.some((R) => R === "")) {
      w.delete("index"), x.filter((H) => H).forEach((H) => w.append("index", H));
      let R = w.toString();
      f.search = R ? "?" + R : "";
    }
  }
  return (!c || c === ".") && D.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), b !== "/" && (f.pathname = f.pathname === "/" ? b : wr([b, f.pathname])), Qu(f);
}
function u1(c, p) {
  p === void 0 && (p = {});
  let h = L.useContext(ES);
  h == null && pt(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: b
  } = NS(hf.useViewTransitionState), E = es(c, {
    relative: p.relative
  });
  if (!h.isTransitioning)
    return !1;
  let D = li(h.currentLocation.pathname, b) || h.currentLocation.pathname, f = li(h.nextLocation.pathname, b) || h.nextLocation.pathname;
  return _m(E.pathname, f) != null || _m(E.pathname, D) != null;
}
function s1() {
  const [c, p] = L.useState(null), [h, b] = L.useState(""), [E, D] = L.useState(""), [f, z] = L.useState(!0), [w, x] = L.useState(""), [M, R] = L.useState(""), [H, Y] = L.useState(!1), [Z, F] = L.useState(!1);
  L.useEffect(() => {
    var I, ie, te, oe, ce, Pe;
    p({
      apiKey: (I = window.__FIREBASE__) == null ? void 0 : I.apiKey,
      authDomain: (ie = window.__FIREBASE__) == null ? void 0 : ie.authDomain,
      projectId: (te = window.__FIREBASE__) == null ? void 0 : te.projectId,
      appId: (oe = window.__FIREBASE__) == null ? void 0 : oe.appId,
      messagingSenderId: (ce = window.__FIREBASE__) == null ? void 0 : ce.messagingSenderId,
      measurementId: (Pe = window.__FIREBASE__) == null ? void 0 : Pe.measurementId
    });
  }, []);
  function G(I) {
    const ie = (I == null ? void 0 : I.code) || "", te = (I == null ? void 0 : I.message) || "";
    return ie.includes("invalid-email") ? "Please enter a valid email address." : ie.includes("user-not-found") ? "No account found with that email." : ie.includes("wrong-password") || ie.includes("invalid-credential") || te.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : ie.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : ie.includes("network-request-failed") ? "Network error. Check your connection and try again." : te || "Something went wrong.";
  }
  async function le(I) {
    I.preventDefault(), x(""), R(""), Y(!0);
    try {
      if (!(c != null && c.apiKey)) throw new Error("Firebase not configured");
      const ie = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(c), te = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: oe, setPersistence: ce, browserLocalPersistence: Pe, browserSessionPersistence: Fe, signInWithEmailAndPassword: Ge } = te, Ze = oe();
      await ce(Ze, f ? Pe : Fe);
      const xe = await (await Ge(Ze, h.trim(), E)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: xe }) })).ok) throw new Error("Session creation failed");
      R("Signed in successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 600);
    } catch (ie) {
      x(G(ie));
    } finally {
      Y(!1);
    }
  }
  async function q() {
    x(""), R("");
    try {
      if (!(c != null && c.apiKey)) throw new Error("Firebase not configured");
      const I = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(c), { getAuth: ie, sendPasswordResetEmail: te } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), oe = ie();
      await te(oe, h.trim()), R("If an account exists for that email, a reset link has been sent.");
    } catch (I) {
      x(G(I));
    }
  }
  return /* @__PURE__ */ m.jsxDEV("section", { className: "auth-layout", children: [
    /* @__PURE__ */ m.jsxDEV("div", { className: "auth-hero", children: [
      /* @__PURE__ */ m.jsxDEV("img", { className: "hero-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=96", alt: "FreshBasket logo" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m.jsxDEV("h2", { className: "hero-heading", children: "Welcome back" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 72,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m.jsxDEV("p", { className: "hero-sub", children: "Sign in to manage orders, riders and deliveries." }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m.jsxDEV("ul", { className: "hero-points", children: [
        /* @__PURE__ */ m.jsxDEV("li", { children: "Secure account access" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 74,
          columnNumber: 37
        }, this),
        /* @__PURE__ */ m.jsxDEV("li", { children: "Real-time dashboards" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 74,
          columnNumber: 67
        }, this),
        /* @__PURE__ */ m.jsxDEV("li", { children: "Faster operations" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 74,
          columnNumber: 96
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 74,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Login.jsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m.jsxDEV("div", { className: "auth-panel auth-panel-card", children: [
      /* @__PURE__ */ m.jsxDEV("h2", { className: "auth-title", children: "Sign in to FreshBasket" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 78,
        columnNumber: 9
      }, this),
      w && /* @__PURE__ */ m.jsxDEV("div", { className: "auth-error", children: w }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 79,
        columnNumber: 19
      }, this),
      M && /* @__PURE__ */ m.jsxDEV("div", { className: "auth-success", children: M }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 80,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ m.jsxDEV("form", { className: "auth-form", onSubmit: le, children: [
        /* @__PURE__ */ m.jsxDEV("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ m.jsxDEV("input", { className: "auth-input", type: "email", value: h, onChange: (I) => b(I.target.value), required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 83,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 82,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m.jsxDEV("label", { className: "auth-label", children: [
          "Password",
          /* @__PURE__ */ m.jsxDEV("span", { className: "password-field", children: [
            /* @__PURE__ */ m.jsxDEV("input", { className: "auth-input", type: Z ? "text" : "password", value: E, onChange: (I) => D(I.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 87,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ m.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": Z ? "Hide password" : "Show password", onClick: () => F((I) => !I), children: "👁️" }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 88,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 86,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 85,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m.jsxDEV("div", { className: "auth-actions", children: [
          /* @__PURE__ */ m.jsxDEV("label", { className: "remember", children: [
            /* @__PURE__ */ m.jsxDEV("input", { type: "checkbox", checked: f, onChange: (I) => z(I.target.checked) }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 92,
              columnNumber: 41
            }, this),
            " Remember me"
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 92,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ m.jsxDEV("button", { className: "link-button", type: "button", onClick: q, children: "Forgot password?" }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 93,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 91,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m.jsxDEV("button", { className: "auth-button auth-button-wide", disabled: H, type: "submit", children: H ? "Signing in…" : "Sign in" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 95,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 81,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m.jsxDEV("p", { className: "auth-alt", children: [
        "No account? ",
        /* @__PURE__ */ m.jsxDEV("a", { href: "/auth/register", children: "Register" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 97,
          columnNumber: 45
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 97,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Login.jsx",
      lineNumber: 77,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Login.jsx",
    lineNumber: 69,
    columnNumber: 5
  }, this);
}
function c1() {
  const [c, p] = L.useState(null), [h, b] = L.useState(""), [E, D] = L.useState(""), [f, z] = L.useState(""), [w, x] = L.useState(""), [M, R] = L.useState(""), [H, Y] = L.useState(""), [Z, F] = L.useState(""), [G, le] = L.useState(!1), [q, I] = L.useState(!1);
  L.useEffect(() => {
    var oe, ce, Pe, Fe, Ge, Ze;
    p({
      apiKey: (oe = window.__FIREBASE__) == null ? void 0 : oe.apiKey,
      authDomain: (ce = window.__FIREBASE__) == null ? void 0 : ce.authDomain,
      projectId: (Pe = window.__FIREBASE__) == null ? void 0 : Pe.projectId,
      appId: (Fe = window.__FIREBASE__) == null ? void 0 : Fe.appId,
      messagingSenderId: (Ge = window.__FIREBASE__) == null ? void 0 : Ge.messagingSenderId,
      measurementId: (Ze = window.__FIREBASE__) == null ? void 0 : Ze.measurementId
    });
  }, []);
  function ie(oe) {
    const ce = (oe == null ? void 0 : oe.code) || "";
    return ce.includes("email-already-in-use") ? "An account with this email already exists." : ce.includes("weak-password") ? "Password should be at least 6 characters." : ce.includes("invalid-email") ? "Please enter a valid email address." : ce.includes("network-request-failed") ? "Network error. Check your connection and try again." : (oe == null ? void 0 : oe.message) || "Something went wrong.";
  }
  async function te(oe) {
    oe.preventDefault(), Y(""), F(""), le(!0);
    try {
      if (w !== M) throw new Error("Passwords do not match");
      if (!(c != null && c.apiKey)) throw new Error("Firebase not configured");
      const ce = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(c), { getAuth: Pe, createUserWithEmailAndPassword: Fe } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Ge = Pe(), et = await (await Fe(Ge, f.trim(), w)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: et, profile: { fullName: h, contactNumber: E } }) })).ok) throw new Error("Session creation failed");
      F("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (ce) {
      Y(ie(ce));
    } finally {
      le(!1);
    }
  }
  return /* @__PURE__ */ m.jsxDEV("section", { className: "auth-panel", style: { maxWidth: 520, margin: "40px auto" }, children: [
    /* @__PURE__ */ m.jsxDEV("h2", { className: "auth-title", children: "Register" }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    H && /* @__PURE__ */ m.jsxDEV("div", { className: "auth-error", children: H }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 56,
      columnNumber: 17
    }, this),
    Z && /* @__PURE__ */ m.jsxDEV("div", { className: "auth-success", children: Z }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 57,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ m.jsxDEV("form", { className: "auth-form", onSubmit: te, children: [
      /* @__PURE__ */ m.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ m.jsxDEV("input", { className: "auth-input", value: h, onChange: (oe) => b(oe.target.value), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 60,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m.jsxDEV("label", { className: "auth-label", children: [
        "Contact number",
        /* @__PURE__ */ m.jsxDEV("input", { className: "auth-input", value: E, onChange: (oe) => D(oe.target.value), inputMode: "tel", placeholder: "e.g. +1 555 123 4567" }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 63,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 62,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m.jsxDEV("label", { className: "auth-label", children: [
        "Email",
        /* @__PURE__ */ m.jsxDEV("input", { className: "auth-input", type: "email", value: f, onChange: (oe) => z(oe.target.value), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 66,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 65,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m.jsxDEV("label", { className: "auth-label", children: [
        "Password",
        /* @__PURE__ */ m.jsxDEV("span", { className: "password-field", children: [
          /* @__PURE__ */ m.jsxDEV("input", { className: "auth-input", type: q ? "text" : "password", value: w, onChange: (oe) => x(oe.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 70,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ m.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": q ? "Hide password" : "Show password", onClick: () => I((oe) => !oe), children: "👁️" }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 71,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 69,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 68,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m.jsxDEV("label", { className: "auth-label", children: [
        "Confirm Password",
        /* @__PURE__ */ m.jsxDEV("input", { className: "auth-input", type: "password", value: M, onChange: (oe) => R(oe.target.value), minLength: 6, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 75,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m.jsxDEV("button", { className: "auth-button", disabled: G, type: "submit", children: G ? "Creating account…" : "Create account" }, void 0, !1, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 77,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m.jsxDEV("p", { className: "auth-alt", children: [
      "Have an account? ",
      /* @__PURE__ */ m.jsxDEV("a", { href: "/auth/login", children: "Login" }, void 0, !1, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 79,
        columnNumber: 48
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 79,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Register.jsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
function Gi({ children: c }) {
  return L.useEffect(() => {
    const p = document.getElementById("notifBtn"), h = document.getElementById("notifMenu"), b = document.getElementById("profileBtn"), E = document.getElementById("profileMenu");
    function D(x, M) {
      if (!x) return;
      x.classList.toggle("hidden");
      const R = !x.classList.contains("hidden");
      M && M.setAttribute("aria-expanded", R ? "true" : "false");
    }
    function f() {
      [h, E].forEach((x) => {
        x && !x.classList.contains("hidden") && x.classList.add("hidden");
      }), [p, b].forEach((x) => {
        x && x.setAttribute("aria-expanded", "false");
      });
    }
    function z(x) {
      const M = (R) => R && (R === x.target || R.contains(x.target));
      !M(h) && !M(p) && !M(E) && !M(b) && f();
    }
    function w(x) {
      x.key === "Escape" && f();
    }
    return p && h && p.addEventListener("click", (x) => {
      x.stopPropagation(), D(h, p), E && E.classList.add("hidden");
    }), b && E && b.addEventListener("click", (x) => {
      x.stopPropagation(), D(E, b), h && h.classList.add("hidden");
    }), document.addEventListener("click", z), document.addEventListener("keydown", w), () => {
      document.removeEventListener("click", z), document.removeEventListener("keydown", w);
    };
  }, []), /* @__PURE__ */ m.jsxDEV(m.Fragment, { children: [
    /* @__PURE__ */ m.jsxDEV("header", { className: "site-header", children: [
      /* @__PURE__ */ m.jsxDEV("h1", { className: "site-title", children: /* @__PURE__ */ m.jsxDEV("span", { className: "brand", children: [
        /* @__PURE__ */ m.jsxDEV("img", { className: "brand-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=64", alt: "FreshBasket logo" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 41,
          columnNumber: 60
        }, this),
        /* @__PURE__ */ m.jsxDEV("span", { className: "brand-name", children: "FreshBasket" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 41,
          columnNumber: 253
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/SiteLayout.jsx",
        lineNumber: 41,
        columnNumber: 36
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/components/SiteLayout.jsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m.jsxDEV("nav", { className: "site-nav", children: [
        /* @__PURE__ */ m.jsxDEV("a", { href: "/dashboard", children: "Dashboard" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 43,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m.jsxDEV("a", { href: "/orders", children: "Orders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 44,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m.jsxDEV("a", { href: "/riders", children: "Riders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 45,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m.jsxDEV("a", { href: "/customers", children: "Customers" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 46,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m.jsxDEV("a", { href: "/reports", children: "Reports" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 47,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m.jsxDEV("span", { className: "site-nav-spacer" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 48,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ m.jsxDEV("button", { id: "notifBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "notifMenu", "aria-label": "Notifications", title: "Notifications", children: /* @__PURE__ */ m.jsxDEV("svg", { className: "bell-icon", width: "29", height: "29", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: [
            /* @__PURE__ */ m.jsxDEV("defs", { children: /* @__PURE__ */ m.jsxDEV("linearGradient", { id: "bellGold", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ m.jsxDEV("stop", { offset: "0%", stopColor: "#C08B3E" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 54,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ m.jsxDEV("stop", { offset: "50%", stopColor: "#D4AF37" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 55,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ m.jsxDEV("stop", { offset: "100%", stopColor: "#FFD700" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 56,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 53,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 52,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ m.jsxDEV("path", { fill: "url(#bellGold)", d: "M12 22a2 2 0 0 0 1.995-1.85L14 20h-4a2 2 0 0 0 1.85 1.995L12 22Zm8-5h-1a1 1 0 0 1-.707-.293l-.147-.147A3.99 3.99 0 0 1 17 14.172V11a5 5 0 1 0-10 0v3.172a3.99 3.99 0 0 1-1.146 2.388l-.147.147A1 1 0 0 1 5 17H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2Z" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 59,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 51,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 50,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ m.jsxDEV("div", { id: "notifMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "notifBtn", children: [
            /* @__PURE__ */ m.jsxDEV("div", { className: "dropdown-header", children: "Notifications" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 63,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ m.jsxDEV("div", { className: "dropdown-item", children: "No new notifications" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 64,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 62,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 49,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ m.jsxDEV("button", { id: "profileBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "profileMenu", title: "Profile", children: /* @__PURE__ */ m.jsxDEV("svg", { className: "avatar", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ m.jsxDEV("circle", { cx: "12", cy: "7.5", r: "3.5", stroke: "currentColor", strokeWidth: "1.5" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 70,
              columnNumber: 129
            }, this),
            /* @__PURE__ */ m.jsxDEV("path", { d: "M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 70,
              columnNumber: 203
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 70,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 69,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ m.jsxDEV("div", { id: "profileMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "profileBtn", children: [
            /* @__PURE__ */ m.jsxDEV("div", { className: "dropdown-header", children: "Signed in" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 73,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ m.jsxDEV("a", { className: "dropdown-item", href: "/riders", children: "Riders" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 74,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ m.jsxDEV("a", { className: "dropdown-item", href: "/orders", children: "Orders" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 75,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ m.jsxDEV("form", { method: "POST", action: "/auth/logout", children: /* @__PURE__ */ m.jsxDEV("button", { className: "dropdown-item", type: "submit", children: "Logout" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 76,
              columnNumber: 57
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 76,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 72,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 68,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/SiteLayout.jsx",
        lineNumber: 42,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m.jsxDEV("main", { className: "content", children: c }, void 0, !1, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 82,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m.jsxDEV("footer", { className: "site-footer", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " FreshBasket"
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 83,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/SiteLayout.jsx",
    lineNumber: 39,
    columnNumber: 5
  }, this);
}
function f1() {
  const [c, p] = L.useState([]), [h, b] = L.useState(""), [E, D] = L.useState("all"), [f, z] = L.useState("all"), [w, x] = L.useState("all"), [M, R] = L.useState(!0), [H, Y] = L.useState("");
  L.useEffect(() => {
    let F = !0;
    return (async () => {
      R(!0), Y("");
      try {
        const G = await fetch("/api/riders", { credentials: "include" });
        if (G.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!G.ok) throw new Error("Failed to load riders");
        const le = await G.json();
        F && p(Array.isArray(le.riders) ? le.riders : []);
      } catch (G) {
        F && Y(G.message || "Failed to load riders");
      } finally {
        F && R(!1);
      }
    })(), () => {
      F = !1;
    };
  }, []);
  const Z = L.useMemo(() => c.filter((F) => {
    if (h && !F.name.toLowerCase().includes(h.toLowerCase().trim()) || w !== "all" && F.status !== w || f !== "all" && String(F.id) !== String(f)) return !1;
    if (E !== "all") {
      const G = parseInt(F.lastActiveDays, 10) || 9999, le = parseInt(E, 10);
      if (!(G <= le)) return !1;
    }
    return !0;
  }), [c, h, w, f, E]);
  return /* @__PURE__ */ m.jsxDEV(Gi, { children: /* @__PURE__ */ m.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ m.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ m.jsxDEV("h2", { className: "rc-title", children: "Rider Commissions" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 47,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m.jsxDEV("p", { className: "rc-subtitle", children: "View and manage rider commissions based on performance and distance traveled." }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 48,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 46,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ m.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ m.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 53,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: h, onChange: (F) => b(F.target.value) }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 54,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 52,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ m.jsxDEV("select", { className: "rc-select rc-chip", value: E, onChange: (F) => D(F.target.value), children: [
          /* @__PURE__ */ m.jsxDEV("option", { value: "all", children: "Date Range" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 58,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m.jsxDEV("option", { value: "7", children: "Last 7 days" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 59,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m.jsxDEV("option", { value: "30", children: "Last 30 days" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 60,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 57,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m.jsxDEV("select", { className: "rc-select rc-chip", value: f, onChange: (F) => z(F.target.value), children: [
          /* @__PURE__ */ m.jsxDEV("option", { value: "all", children: "Rider" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 63,
            columnNumber: 15
          }, this),
          c.map((F) => /* @__PURE__ */ m.jsxDEV("option", { value: F.id, children: F.name }, F.id, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 64,
            columnNumber: 33
          }, this))
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 62,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m.jsxDEV("select", { className: "rc-select rc-chip", value: w, onChange: (F) => x(F.target.value), children: [
          /* @__PURE__ */ m.jsxDEV("option", { value: "all", children: "Status" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 67,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m.jsxDEV("option", { value: "Active", children: "Active" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 68,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m.jsxDEV("option", { value: "Inactive", children: "Inactive" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 69,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 66,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 56,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 51,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ m.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ m.jsxDEV("thead", { children: /* @__PURE__ */ m.jsxDEV("tr", { children: [
        /* @__PURE__ */ m.jsxDEV("th", { className: "col-name", children: "Rider Name" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 78,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ m.jsxDEV("th", { className: "col-km", children: "Total KM Traveled" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 79,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ m.jsxDEV("th", { className: "col-perf", children: "Delivery Performance" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 80,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ m.jsxDEV("th", { className: "col-comm", children: "Commission Earned" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 81,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 77,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 76,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ m.jsxDEV("tbody", { children: [
        M && /* @__PURE__ */ m.jsxDEV("tr", { children: /* @__PURE__ */ m.jsxDEV("td", { colSpan: 4, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 86,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 86,
          columnNumber: 17
        }, this),
        !M && H && /* @__PURE__ */ m.jsxDEV("tr", { children: /* @__PURE__ */ m.jsxDEV("td", { colSpan: 4, className: "auth-error", children: H }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 89,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 89,
          columnNumber: 17
        }, this),
        !M && !H && Z.map((F) => /* @__PURE__ */ m.jsxDEV("tr", { "data-rider-id": F.id, "data-status": F.status, "data-last-days": F.lastActiveDays, children: [
          /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ m.jsxDEV("a", { href: `/riders/${F.id}`, children: F.name }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 93,
            columnNumber: 47
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 93,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-km", children: [
            F.totalKm,
            " ",
            /* @__PURE__ */ m.jsxDEV("span", { className: "rc-km-unit", children: "km" }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 94,
              columnNumber: 57
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 94,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-perf", children: /* @__PURE__ */ m.jsxDEV("div", { className: "rc-progress", children: [
            /* @__PURE__ */ m.jsxDEV("progress", { max: "100", value: F.performance, className: "rc-progress-bar" }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 97,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ m.jsxDEV("span", { className: "rc-progress-value", children: F.performance }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 98,
              columnNumber: 23
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 96,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 95,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-commission", children: [
            "$",
            F.commissionUsd
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 101,
            columnNumber: 19
          }, this)
        ] }, F.id, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 92,
          columnNumber: 17
        }, this)),
        !M && !H && Z.length === 0 && /* @__PURE__ */ m.jsxDEV("tr", { children: /* @__PURE__ */ m.jsxDEV("td", { colSpan: 4, className: "section-note", children: "No riders found." }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 105,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 105,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 84,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 75,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 74,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 45,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 44,
    columnNumber: 5
  }, this);
}
function d1() {
  const { id: c } = y_(), [p, h] = L.useState(null), [b, E] = L.useState(!0), [D, f] = L.useState("");
  if (L.useEffect(() => {
    let M = !0;
    return (async () => {
      E(!0), f("");
      try {
        const R = await fetch(`/api/riders/${c}`, { credentials: "include" });
        if (R.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!R.ok) throw new Error("Failed to load rider");
        const H = await R.json();
        M && h(H);
      } catch (R) {
        M && f(R.message || "Failed to load rider");
      } finally {
        M && E(!1);
      }
    })(), () => {
      M = !1;
    };
  }, [c]), b)
    return /* @__PURE__ */ m.jsxDEV(Gi, { children: /* @__PURE__ */ m.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ m.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
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
  if (D)
    return /* @__PURE__ */ m.jsxDEV(Gi, { children: /* @__PURE__ */ m.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ m.jsxDEV("div", { className: "auth-error", children: D }, void 0, !1, {
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
    return /* @__PURE__ */ m.jsxDEV(Gi, { children: /* @__PURE__ */ m.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ m.jsxDEV("div", { className: "section-note", children: "Not found" }, void 0, !1, {
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
  const { rider: z, metrics: w, history: x } = p;
  return /* @__PURE__ */ m.jsxDEV(Gi, { children: /* @__PURE__ */ m.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ m.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ m.jsxDEV("h2", { className: "rc-title", children: "Rider Profile" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 43,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m.jsxDEV("p", { className: "rc-subtitle", children: "View detailed performance metrics for individual riders." }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 44,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 42,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m.jsxDEV("div", { className: "rc-table-wrapper rp-card", children: /* @__PURE__ */ m.jsxDEV("div", { className: "rp-details", children: [
      /* @__PURE__ */ m.jsxDEV("img", { src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2Ff54e0df2f0fb4bff9c894340e2efe67a?format=webp&width=72", alt: "avatar", className: "rp-avatar" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 49,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ m.jsxDEV("div", { children: [
        /* @__PURE__ */ m.jsxDEV("h3", { className: "rp-name", children: z.name }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 51,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ m.jsxDEV("div", { className: "section-note", children: [
          "Rider ID: ",
          z.id
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
    /* @__PURE__ */ m.jsxDEV("div", { className: "rc-toolbar rp-stats", children: /* @__PURE__ */ m.jsxDEV("div", { className: "rc-filters rp-stats-wrap", children: [
      /* @__PURE__ */ m.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Total Deliveries ",
        /* @__PURE__ */ m.jsxDEV("strong", { children: w.totalDeliveries }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 59,
          columnNumber: 70
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 59,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ m.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Avg. Delivery Time ",
        /* @__PURE__ */ m.jsxDEV("strong", { children: [
          w.avgDeliveryMins,
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
      /* @__PURE__ */ m.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "On-Time Rate ",
        /* @__PURE__ */ m.jsxDEV("strong", { children: [
          w.onTimeRate,
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
      /* @__PURE__ */ m.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Total KM Traveled ",
        /* @__PURE__ */ m.jsxDEV("strong", { children: [
          w.totalKm,
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
    /* @__PURE__ */ m.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ m.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ m.jsxDEV("thead", { children: /* @__PURE__ */ m.jsxDEV("tr", { children: [
        /* @__PURE__ */ m.jsxDEV("th", { className: "col-name", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 70,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ m.jsxDEV("th", { className: "col-km", children: "Deliveries" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 71,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ m.jsxDEV("th", { className: "col-perf", children: "Avg. Delivery Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 72,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ m.jsxDEV("th", { className: "col-comm", children: "Distance (KM)" }, void 0, !1, {
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
      /* @__PURE__ */ m.jsxDEV("tbody", { children: (x || []).map((M, R) => /* @__PURE__ */ m.jsxDEV("tr", { children: [
        /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-name", children: M.date }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 79,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-km", children: M.deliveries }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 80,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-perf", children: [
          M.avgTime,
          " mins"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 81,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-commission", children: [
          M.distanceKm,
          " km"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 82,
          columnNumber: 19
        }, this)
      ] }, R, !0, {
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
function rS(c) {
  return (Array.isArray(c.tags) ? c.tags : typeof c.tags == "string" ? c.tags.split(",") : []).join(",").toLowerCase().includes("assigned") ? "assigned" : c.fulfillment_status === "fulfilled" ? "delivered" : c.fulfillment_status === "partial" ? "in-transit" : "new";
}
function p1() {
  const [c, p] = L.useState([]), [h, b] = L.useState(""), [E, D] = L.useState("all"), [f, z] = L.useState(!0), [w, x] = L.useState(""), [M, R] = L.useState(""), [H, Y] = L.useState(!0);
  L.useEffect(() => {
    let F = !0;
    return (async () => {
      z(!0), x(""), R("");
      try {
        const G = await fetch("/api/orders", { credentials: "include" });
        if (G.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!G.ok) throw new Error("Failed to load orders");
        const le = await G.json();
        F && (p(Array.isArray(le.orders) ? le.orders : []), R(le.shopifyError || ""), Y(!!le.shopifyConfigured));
      } catch (G) {
        F && x(G.message || "Failed to load orders");
      } finally {
        F && z(!1);
      }
    })(), () => {
      F = !1;
    };
  }, []);
  const Z = L.useMemo(() => {
    const F = h.toLowerCase().trim();
    return c.filter((G) => {
      var q, I, ie, te, oe, ce;
      const le = rS(G);
      if (E !== "all" && le !== E) return !1;
      if (F) {
        const Pe = String(G.name || G.order_number || G.id || "").toLowerCase(), Fe = [((q = G.customer) == null ? void 0 : q.first_name) || "", ((I = G.customer) == null ? void 0 : I.last_name) || ""].join(" ").toLowerCase(), Ge = [((ie = G.shipping_address) == null ? void 0 : ie.address1) || "", ((te = G.shipping_address) == null ? void 0 : te.city) || "", ((oe = G.shipping_address) == null ? void 0 : oe.province) || "", ((ce = G.shipping_address) == null ? void 0 : ce.country) || ""].join(" ").toLowerCase();
        if (!`${Pe} ${Fe} ${Ge}`.includes(F)) return !1;
      }
      return !0;
    });
  }, [c, h, E]);
  return /* @__PURE__ */ m.jsxDEV(Gi, { children: /* @__PURE__ */ m.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ m.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ m.jsxDEV("h2", { className: "rc-title", children: "Order Management" }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 62,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 63,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 61,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ m.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ m.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 68,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: h, onChange: (F) => b(F.target.value) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 69,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 67,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m.jsxDEV("div", { className: "rc-filters", children: ["all", "new", "assigned", "in-transit", "delivered"].map((F) => /* @__PURE__ */ m.jsxDEV("button", { className: `rc-select rc-chip${E === F ? " active" : ""}`, onClick: () => D(F), "data-filter": F, children: F === "all" ? "All" : F.replace("-", " ") }, F, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 73,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 71,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 66,
      columnNumber: 9
    }, this),
    !H && /* @__PURE__ */ m.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 81,
      columnNumber: 11
    }, this),
    M && /* @__PURE__ */ m.jsxDEV("div", { className: "auth-error", children: M }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 83,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ m.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ m.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ m.jsxDEV("thead", { children: /* @__PURE__ */ m.jsxDEV("tr", { children: [
        /* @__PURE__ */ m.jsxDEV("th", { className: "col-name", children: "Order #" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 89,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ m.jsxDEV("th", { className: "col-km", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ m.jsxDEV("th", { className: "col-perf", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 91,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ m.jsxDEV("th", { className: "col-comm", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 92,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ m.jsxDEV("th", { className: "col-comm", children: "Time Placed" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 93,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ m.jsxDEV("th", { className: "col-comm", children: "Action" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 94,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 88,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 87,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ m.jsxDEV("tbody", { children: [
        f && /* @__PURE__ */ m.jsxDEV("tr", { children: /* @__PURE__ */ m.jsxDEV("td", { colSpan: 6, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 99,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 99,
          columnNumber: 17
        }, this),
        !f && w && /* @__PURE__ */ m.jsxDEV("tr", { children: /* @__PURE__ */ m.jsxDEV("td", { colSpan: 6, className: "auth-error", children: w }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 102,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 102,
          columnNumber: 17
        }, this),
        !f && !w && Z.map((F, G) => {
          var ce, Pe;
          const le = rS(F), q = ((ce = F.customer) == null ? void 0 : ce.first_name) || "", I = ((Pe = F.customer) == null ? void 0 : Pe.last_name) || "", ie = F.shipping_address && `${F.shipping_address.address1 || ""} ${F.shipping_address.city || ""}${F.shipping_address.province ? `, ${F.shipping_address.province}` : ""}${F.shipping_address.country ? `, ${F.shipping_address.country}` : ""}` || "-", te = le === "new" ? "Assign" : le === "assigned" ? "View" : le === "in-transit" ? "Track" : "Details", oe = F.name || F.order_number || F.id;
          return /* @__PURE__ */ m.jsxDEV("tr", { "data-status": le, children: [
            /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              oe
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 113,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-km", children: [
              q,
              " ",
              I
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 114,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-perf", children: ie }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 115,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-commission", children: /* @__PURE__ */ m.jsxDEV("span", { className: `status-chip status-${le}`, children: le.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 116,
              columnNumber: 55
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 116,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-commission", children: F.created_at ? new Date(F.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 117,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-commission", children: /* @__PURE__ */ m.jsxDEV("a", { href: "#", className: "order-action", "data-action": te.toLowerCase(), children: te }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 118,
              columnNumber: 55
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 118,
              columnNumber: 21
            }, this)
          ] }, oe || G, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 112,
            columnNumber: 19
          }, this);
        }),
        !f && !w && Z.length === 0 && /* @__PURE__ */ m.jsxDEV("tr", { children: /* @__PURE__ */ m.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No orders to display." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 123,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 123,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 97,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 86,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 85,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 60,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 59,
    columnNumber: 5
  }, this);
}
function v1() {
  const [c, p] = L.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [h, b] = L.useState([]), [E, D] = L.useState(!1), [f, z] = L.useState(!0), [w, x] = L.useState("");
  return L.useEffect(() => {
    let M = !0;
    return (async () => {
      z(!0), x("");
      try {
        const R = await fetch("/api/reports", { credentials: "include" });
        if (R.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!R.ok) throw new Error("Failed to load reports");
        const H = await R.json();
        M && (p(H.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), b(Array.isArray(H.orders) ? H.orders : []));
      } catch (R) {
        M && x(R.message || "Failed to load reports");
      } finally {
        M && z(!1);
      }
    })(), () => {
      M = !1;
    };
  }, []), /* @__PURE__ */ m.jsxDEV(Gi, { children: /* @__PURE__ */ m.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ m.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ m.jsxDEV("h2", { className: "rc-title", children: "Reporting & Analytics" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 34,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m.jsxDEV("p", { className: "rc-subtitle", children: "Gain insights into your delivery operations with detailed reports and visualizations." }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 35,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 33,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m.jsxDEV("div", { className: "rc-toolbar", children: /* @__PURE__ */ m.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ m.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "overview", children: "Overview" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 40,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ m.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "performance", children: "Performance" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 41,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ m.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "custom", children: "Custom Reports" }, void 0, !1, {
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
    /* @__PURE__ */ m.jsxDEV("div", { id: "tab-overview", children: [
      /* @__PURE__ */ m.jsxDEV("div", { className: "rc-table-wrapper reports-overview", children: [
        /* @__PURE__ */ m.jsxDEV("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ m.jsxDEV("div", { className: "section-title reports-stat-title", children: "Total Deliveries" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 49,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m.jsxDEV("div", { className: "reports-stat-value", children: c.totalDeliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 50,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 48,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m.jsxDEV("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ m.jsxDEV("div", { className: "section-title reports-stat-title", children: "Average Delivery Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 53,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m.jsxDEV("div", { className: "reports-stat-value", children: [
            c.avgDeliveryMins,
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
      /* @__PURE__ */ m.jsxDEV("div", { className: "rc-toolbar reports-toolbar-center", children: [
        /* @__PURE__ */ m.jsxDEV("div", { className: "section-title reports-stat-title", children: "Delivery Data" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 59,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m.jsxDEV("label", { className: "rc-select rc-chip toggle-data-label", children: [
          /* @__PURE__ */ m.jsxDEV("input", { type: "checkbox", checked: E, onChange: (M) => D(M.target.checked) }, void 0, !1, {
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
      E && /* @__PURE__ */ m.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ m.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ m.jsxDEV("thead", { children: /* @__PURE__ */ m.jsxDEV("tr", { children: [
          /* @__PURE__ */ m.jsxDEV("th", { className: "col-name", children: "Order Number" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 70,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ m.jsxDEV("th", { className: "col-km", children: "Rider Assigned" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 71,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ m.jsxDEV("th", { className: "col-perf", children: "Expected Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 72,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ m.jsxDEV("th", { className: "col-perf", children: "Actual Delivery Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 73,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ m.jsxDEV("th", { className: "col-perf", children: "Distance Traveled" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 74,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ m.jsxDEV("th", { className: "col-comm", children: "Status" }, void 0, !1, {
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
        /* @__PURE__ */ m.jsxDEV("tbody", { children: [
          !f && !w && h.map((M, R) => /* @__PURE__ */ m.jsxDEV("tr", { children: [
            /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              M.name || M.order_number || M.id
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 81,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-km", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 82,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-perf", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 83,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-perf", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 84,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-perf", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 85,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ m.jsxDEV("td", { className: "rc-col-commission", children: M.fulfillment_status || "new" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 86,
              columnNumber: 23
            }, this)
          ] }, M.id || M.name || M.order_number || R, !0, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 80,
            columnNumber: 21
          }, this)),
          !f && !w && h.length === 0 && /* @__PURE__ */ m.jsxDEV("tr", { children: /* @__PURE__ */ m.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No data." }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 90,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 90,
            columnNumber: 21
          }, this),
          f && /* @__PURE__ */ m.jsxDEV("tr", { children: /* @__PURE__ */ m.jsxDEV("td", { colSpan: 6, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 93,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 93,
            columnNumber: 21
          }, this),
          w && /* @__PURE__ */ m.jsxDEV("tr", { children: /* @__PURE__ */ m.jsxDEV("td", { colSpan: 6, className: "auth-error", children: w }, void 0, !1, {
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
function m1() {
  return /* @__PURE__ */ m.jsxDEV(K_, { children: /* @__PURE__ */ m.jsxDEV(V_, { children: [
    /* @__PURE__ */ m.jsxDEV(ri, { path: "/auth/login", element: /* @__PURE__ */ m.jsxDEV(s1, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 14,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 14,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m.jsxDEV(ri, { path: "/auth/register", element: /* @__PURE__ */ m.jsxDEV(c1, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m.jsxDEV(ri, { path: "/riders", element: /* @__PURE__ */ m.jsxDEV(f1, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m.jsxDEV(ri, { path: "/riders/:id", element: /* @__PURE__ */ m.jsxDEV(d1, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m.jsxDEV(ri, { path: "/orders", element: /* @__PURE__ */ m.jsxDEV(p1, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m.jsxDEV(ri, { path: "/reports", element: /* @__PURE__ */ m.jsxDEV(v1, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 41
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m.jsxDEV(ri, { path: "*", element: /* @__PURE__ */ m.jsxDEV(M_, { to: "/auth/login", replace: !0 }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 34
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/App.jsx",
    lineNumber: 13,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/App.jsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}
function iS() {
  const c = document.getElementById("react-root");
  if (!c) return;
  fS(c).render(/* @__PURE__ */ m.jsxDEV(m1, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", iS) : iS();
