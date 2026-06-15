(function () {
  const i = document.createElement('link').relList;
  if (i && i.supports && i.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const c of o)
      if (c.type === 'childList')
        for (const u of c.addedNodes)
          u.tagName === 'LINK' && u.rel === 'modulepreload' && r(u);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(o) {
    const c = {};
    return (
      o.integrity && (c.integrity = o.integrity),
      o.referrerPolicy && (c.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === 'use-credentials'
        ? (c.credentials = 'include')
        : o.crossOrigin === 'anonymous'
          ? (c.credentials = 'omit')
          : (c.credentials = 'same-origin'),
      c
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const c = l(o);
    fetch(o.href, c);
  }
})();
function wh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
var ef = { exports: {} },
  ir = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var my;
function jT() {
  if (my) return ir;
  my = 1;
  var e = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.fragment');
  function l(r, o, c) {
    var u = null;
    if (
      (c !== void 0 && (u = '' + c),
      o.key !== void 0 && (u = '' + o.key),
      'key' in o)
    ) {
      c = {};
      for (var h in o) h !== 'key' && (c[h] = o[h]);
    } else c = o;
    return (
      (o = c.ref),
      { $$typeof: e, type: r, key: u, ref: o !== void 0 ? o : null, props: c }
    );
  }
  return (ir.Fragment = i), (ir.jsx = l), (ir.jsxs = l), ir;
}
var gy;
function BT() {
  return gy || ((gy = 1), (ef.exports = jT())), ef.exports;
}
var H = BT(),
  nf = { exports: {} },
  xt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yy;
function VT() {
  if (yy) return xt;
  yy = 1;
  var e = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.portal'),
    l = Symbol.for('react.fragment'),
    r = Symbol.for('react.strict_mode'),
    o = Symbol.for('react.profiler'),
    c = Symbol.for('react.consumer'),
    u = Symbol.for('react.context'),
    h = Symbol.for('react.forward_ref'),
    m = Symbol.for('react.suspense'),
    p = Symbol.for('react.memo'),
    g = Symbol.for('react.lazy'),
    y = Symbol.for('react.activity'),
    x = Symbol.iterator;
  function b(C) {
    return C === null || typeof C != 'object'
      ? null
      : ((C = (x && C[x]) || C['@@iterator']),
        typeof C == 'function' ? C : null);
  }
  var T = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    M = Object.assign,
    D = {};
  function E(C, G, A) {
    (this.props = C),
      (this.context = G),
      (this.refs = D),
      (this.updater = A || T);
  }
  (E.prototype.isReactComponent = {}),
    (E.prototype.setState = function (C, G) {
      if (typeof C != 'object' && typeof C != 'function' && C != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.',
        );
      this.updater.enqueueSetState(this, C, G, 'setState');
    }),
    (E.prototype.forceUpdate = function (C) {
      this.updater.enqueueForceUpdate(this, C, 'forceUpdate');
    });
  function L() {}
  L.prototype = E.prototype;
  function R(C, G, A) {
    (this.props = C),
      (this.context = G),
      (this.refs = D),
      (this.updater = A || T);
  }
  var Y = (R.prototype = new L());
  (Y.constructor = R), M(Y, E.prototype), (Y.isPureReactComponent = !0);
  var Q = Array.isArray;
  function V() {}
  var K = { H: null, A: null, T: null, S: null },
    $ = Object.prototype.hasOwnProperty;
  function it(C, G, A) {
    var at = A.ref;
    return {
      $$typeof: e,
      type: C,
      key: G,
      ref: at !== void 0 ? at : null,
      props: A,
    };
  }
  function O(C, G) {
    return it(C.type, G, C.props);
  }
  function J(C) {
    return typeof C == 'object' && C !== null && C.$$typeof === e;
  }
  function et(C) {
    var G = { '=': '=0', ':': '=2' };
    return (
      '$' +
      C.replace(/[=:]/g, function (A) {
        return G[A];
      })
    );
  }
  var vt = /\/+/g;
  function st(C, G) {
    return typeof C == 'object' && C !== null && C.key != null
      ? et('' + C.key)
      : G.toString(36);
  }
  function W(C) {
    switch (C.status) {
      case 'fulfilled':
        return C.value;
      case 'rejected':
        throw C.reason;
      default:
        switch (
          (typeof C.status == 'string'
            ? C.then(V, V)
            : ((C.status = 'pending'),
              C.then(
                function (G) {
                  C.status === 'pending' &&
                    ((C.status = 'fulfilled'), (C.value = G));
                },
                function (G) {
                  C.status === 'pending' &&
                    ((C.status = 'rejected'), (C.reason = G));
                },
              )),
          C.status)
        ) {
          case 'fulfilled':
            return C.value;
          case 'rejected':
            throw C.reason;
        }
    }
    throw C;
  }
  function N(C, G, A, at, gt) {
    var ft = typeof C;
    (ft === 'undefined' || ft === 'boolean') && (C = null);
    var Ct = !1;
    if (C === null) Ct = !0;
    else
      switch (ft) {
        case 'bigint':
        case 'string':
        case 'number':
          Ct = !0;
          break;
        case 'object':
          switch (C.$$typeof) {
            case e:
            case i:
              Ct = !0;
              break;
            case g:
              return (Ct = C._init), N(Ct(C._payload), G, A, at, gt);
          }
      }
    if (Ct)
      return (
        (gt = gt(C)),
        (Ct = at === '' ? '.' + st(C, 0) : at),
        Q(gt)
          ? ((A = ''),
            Ct != null && (A = Ct.replace(vt, '$&/') + '/'),
            N(gt, G, A, '', function ($e) {
              return $e;
            }))
          : gt != null &&
            (J(gt) &&
              (gt = O(
                gt,
                A +
                  (gt.key == null || (C && C.key === gt.key)
                    ? ''
                    : ('' + gt.key).replace(vt, '$&/') + '/') +
                  Ct,
              )),
            G.push(gt)),
        1
      );
    Ct = 0;
    var Zt = at === '' ? '.' : at + ':';
    if (Q(C))
      for (var Vt = 0; Vt < C.length; Vt++)
        (at = C[Vt]), (ft = Zt + st(at, Vt)), (Ct += N(at, G, A, ft, gt));
    else if (((Vt = b(C)), typeof Vt == 'function'))
      for (C = Vt.call(C), Vt = 0; !(at = C.next()).done; )
        (at = at.value), (ft = Zt + st(at, Vt++)), (Ct += N(at, G, A, ft, gt));
    else if (ft === 'object') {
      if (typeof C.then == 'function') return N(W(C), G, A, at, gt);
      throw (
        ((G = String(C)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (G === '[object Object]'
              ? 'object with keys {' + Object.keys(C).join(', ') + '}'
              : G) +
            '). If you meant to render a collection of children, use an array instead.',
        ))
      );
    }
    return Ct;
  }
  function Z(C, G, A) {
    if (C == null) return C;
    var at = [],
      gt = 0;
    return (
      N(C, at, '', '', function (ft) {
        return G.call(A, ft, gt++);
      }),
      at
    );
  }
  function lt(C) {
    if (C._status === -1) {
      var G = C._result;
      (G = G()),
        G.then(
          function (A) {
            (C._status === 0 || C._status === -1) &&
              ((C._status = 1), (C._result = A));
          },
          function (A) {
            (C._status === 0 || C._status === -1) &&
              ((C._status = 2), (C._result = A));
          },
        ),
        C._status === -1 && ((C._status = 0), (C._result = G));
    }
    if (C._status === 1) return C._result.default;
    throw C._result;
  }
  var pt =
      typeof reportError == 'function'
        ? reportError
        : function (C) {
            if (
              typeof window == 'object' &&
              typeof window.ErrorEvent == 'function'
            ) {
              var G = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof C == 'object' &&
                  C !== null &&
                  typeof C.message == 'string'
                    ? String(C.message)
                    : String(C),
                error: C,
              });
              if (!window.dispatchEvent(G)) return;
            } else if (
              typeof process == 'object' &&
              typeof process.emit == 'function'
            ) {
              process.emit('uncaughtException', C);
              return;
            }
            console.error(C);
          },
    w = {
      map: Z,
      forEach: function (C, G, A) {
        Z(
          C,
          function () {
            G.apply(this, arguments);
          },
          A,
        );
      },
      count: function (C) {
        var G = 0;
        return (
          Z(C, function () {
            G++;
          }),
          G
        );
      },
      toArray: function (C) {
        return (
          Z(C, function (G) {
            return G;
          }) || []
        );
      },
      only: function (C) {
        if (!J(C))
          throw Error(
            'React.Children.only expected to receive a single React element child.',
          );
        return C;
      },
    };
  return (
    (xt.Activity = y),
    (xt.Children = w),
    (xt.Component = E),
    (xt.Fragment = l),
    (xt.Profiler = o),
    (xt.PureComponent = R),
    (xt.StrictMode = r),
    (xt.Suspense = m),
    (xt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K),
    (xt.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (C) {
        return K.H.useMemoCache(C);
      },
    }),
    (xt.cache = function (C) {
      return function () {
        return C.apply(null, arguments);
      };
    }),
    (xt.cacheSignal = function () {
      return null;
    }),
    (xt.cloneElement = function (C, G, A) {
      if (C == null)
        throw Error(
          'The argument must be a React element, but you passed ' + C + '.',
        );
      var at = M({}, C.props),
        gt = C.key;
      if (G != null)
        for (ft in (G.key !== void 0 && (gt = '' + G.key), G))
          !$.call(G, ft) ||
            ft === 'key' ||
            ft === '__self' ||
            ft === '__source' ||
            (ft === 'ref' && G.ref === void 0) ||
            (at[ft] = G[ft]);
      var ft = arguments.length - 2;
      if (ft === 1) at.children = A;
      else if (1 < ft) {
        for (var Ct = Array(ft), Zt = 0; Zt < ft; Zt++)
          Ct[Zt] = arguments[Zt + 2];
        at.children = Ct;
      }
      return it(C.type, gt, at);
    }),
    (xt.createContext = function (C) {
      return (
        (C = {
          $$typeof: u,
          _currentValue: C,
          _currentValue2: C,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (C.Provider = C),
        (C.Consumer = { $$typeof: c, _context: C }),
        C
      );
    }),
    (xt.createElement = function (C, G, A) {
      var at,
        gt = {},
        ft = null;
      if (G != null)
        for (at in (G.key !== void 0 && (ft = '' + G.key), G))
          $.call(G, at) &&
            at !== 'key' &&
            at !== '__self' &&
            at !== '__source' &&
            (gt[at] = G[at]);
      var Ct = arguments.length - 2;
      if (Ct === 1) gt.children = A;
      else if (1 < Ct) {
        for (var Zt = Array(Ct), Vt = 0; Vt < Ct; Vt++)
          Zt[Vt] = arguments[Vt + 2];
        gt.children = Zt;
      }
      if (C && C.defaultProps)
        for (at in ((Ct = C.defaultProps), Ct))
          gt[at] === void 0 && (gt[at] = Ct[at]);
      return it(C, ft, gt);
    }),
    (xt.createRef = function () {
      return { current: null };
    }),
    (xt.forwardRef = function (C) {
      return { $$typeof: h, render: C };
    }),
    (xt.isValidElement = J),
    (xt.lazy = function (C) {
      return { $$typeof: g, _payload: { _status: -1, _result: C }, _init: lt };
    }),
    (xt.memo = function (C, G) {
      return { $$typeof: p, type: C, compare: G === void 0 ? null : G };
    }),
    (xt.startTransition = function (C) {
      var G = K.T,
        A = {};
      K.T = A;
      try {
        var at = C(),
          gt = K.S;
        gt !== null && gt(A, at),
          typeof at == 'object' &&
            at !== null &&
            typeof at.then == 'function' &&
            at.then(V, pt);
      } catch (ft) {
        pt(ft);
      } finally {
        G !== null && A.types !== null && (G.types = A.types), (K.T = G);
      }
    }),
    (xt.unstable_useCacheRefresh = function () {
      return K.H.useCacheRefresh();
    }),
    (xt.use = function (C) {
      return K.H.use(C);
    }),
    (xt.useActionState = function (C, G, A) {
      return K.H.useActionState(C, G, A);
    }),
    (xt.useCallback = function (C, G) {
      return K.H.useCallback(C, G);
    }),
    (xt.useContext = function (C) {
      return K.H.useContext(C);
    }),
    (xt.useDebugValue = function () {}),
    (xt.useDeferredValue = function (C, G) {
      return K.H.useDeferredValue(C, G);
    }),
    (xt.useEffect = function (C, G) {
      return K.H.useEffect(C, G);
    }),
    (xt.useEffectEvent = function (C) {
      return K.H.useEffectEvent(C);
    }),
    (xt.useId = function () {
      return K.H.useId();
    }),
    (xt.useImperativeHandle = function (C, G, A) {
      return K.H.useImperativeHandle(C, G, A);
    }),
    (xt.useInsertionEffect = function (C, G) {
      return K.H.useInsertionEffect(C, G);
    }),
    (xt.useLayoutEffect = function (C, G) {
      return K.H.useLayoutEffect(C, G);
    }),
    (xt.useMemo = function (C, G) {
      return K.H.useMemo(C, G);
    }),
    (xt.useOptimistic = function (C, G) {
      return K.H.useOptimistic(C, G);
    }),
    (xt.useReducer = function (C, G, A) {
      return K.H.useReducer(C, G, A);
    }),
    (xt.useRef = function (C) {
      return K.H.useRef(C);
    }),
    (xt.useState = function (C) {
      return K.H.useState(C);
    }),
    (xt.useSyncExternalStore = function (C, G, A) {
      return K.H.useSyncExternalStore(C, G, A);
    }),
    (xt.useTransition = function () {
      return K.H.useTransition();
    }),
    (xt.version = '19.2.6'),
    xt
  );
}
var vy;
function Eh() {
  return vy || ((vy = 1), (nf.exports = VT())), nf.exports;
}
var rt = Eh();
const xr = wh(rt);
var lf = { exports: {} },
  lr = {},
  af = { exports: {} },
  rf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var xy;
function UT() {
  return (
    xy ||
      ((xy = 1),
      (function (e) {
        function i(N, Z) {
          var lt = N.length;
          N.push(Z);
          t: for (; 0 < lt; ) {
            var pt = (lt - 1) >>> 1,
              w = N[pt];
            if (0 < o(w, Z)) (N[pt] = Z), (N[lt] = w), (lt = pt);
            else break t;
          }
        }
        function l(N) {
          return N.length === 0 ? null : N[0];
        }
        function r(N) {
          if (N.length === 0) return null;
          var Z = N[0],
            lt = N.pop();
          if (lt !== Z) {
            N[0] = lt;
            t: for (var pt = 0, w = N.length, C = w >>> 1; pt < C; ) {
              var G = 2 * (pt + 1) - 1,
                A = N[G],
                at = G + 1,
                gt = N[at];
              if (0 > o(A, lt))
                at < w && 0 > o(gt, A)
                  ? ((N[pt] = gt), (N[at] = lt), (pt = at))
                  : ((N[pt] = A), (N[G] = lt), (pt = G));
              else if (at < w && 0 > o(gt, lt))
                (N[pt] = gt), (N[at] = lt), (pt = at);
              else break t;
            }
          }
          return Z;
        }
        function o(N, Z) {
          var lt = N.sortIndex - Z.sortIndex;
          return lt !== 0 ? lt : N.id - Z.id;
        }
        if (
          ((e.unstable_now = void 0),
          typeof performance == 'object' &&
            typeof performance.now == 'function')
        ) {
          var c = performance;
          e.unstable_now = function () {
            return c.now();
          };
        } else {
          var u = Date,
            h = u.now();
          e.unstable_now = function () {
            return u.now() - h;
          };
        }
        var m = [],
          p = [],
          g = 1,
          y = null,
          x = 3,
          b = !1,
          T = !1,
          M = !1,
          D = !1,
          E = typeof setTimeout == 'function' ? setTimeout : null,
          L = typeof clearTimeout == 'function' ? clearTimeout : null,
          R = typeof setImmediate < 'u' ? setImmediate : null;
        function Y(N) {
          for (var Z = l(p); Z !== null; ) {
            if (Z.callback === null) r(p);
            else if (Z.startTime <= N)
              r(p), (Z.sortIndex = Z.expirationTime), i(m, Z);
            else break;
            Z = l(p);
          }
        }
        function Q(N) {
          if (((M = !1), Y(N), !T))
            if (l(m) !== null) (T = !0), V || ((V = !0), et());
            else {
              var Z = l(p);
              Z !== null && W(Q, Z.startTime - N);
            }
        }
        var V = !1,
          K = -1,
          $ = 5,
          it = -1;
        function O() {
          return D ? !0 : !(e.unstable_now() - it < $);
        }
        function J() {
          if (((D = !1), V)) {
            var N = e.unstable_now();
            it = N;
            var Z = !0;
            try {
              t: {
                (T = !1), M && ((M = !1), L(K), (K = -1)), (b = !0);
                var lt = x;
                try {
                  e: {
                    for (
                      Y(N), y = l(m);
                      y !== null && !(y.expirationTime > N && O());

                    ) {
                      var pt = y.callback;
                      if (typeof pt == 'function') {
                        (y.callback = null), (x = y.priorityLevel);
                        var w = pt(y.expirationTime <= N);
                        if (((N = e.unstable_now()), typeof w == 'function')) {
                          (y.callback = w), Y(N), (Z = !0);
                          break e;
                        }
                        y === l(m) && r(m), Y(N);
                      } else r(m);
                      y = l(m);
                    }
                    if (y !== null) Z = !0;
                    else {
                      var C = l(p);
                      C !== null && W(Q, C.startTime - N), (Z = !1);
                    }
                  }
                  break t;
                } finally {
                  (y = null), (x = lt), (b = !1);
                }
                Z = void 0;
              }
            } finally {
              Z ? et() : (V = !1);
            }
          }
        }
        var et;
        if (typeof R == 'function')
          et = function () {
            R(J);
          };
        else if (typeof MessageChannel < 'u') {
          var vt = new MessageChannel(),
            st = vt.port2;
          (vt.port1.onmessage = J),
            (et = function () {
              st.postMessage(null);
            });
        } else
          et = function () {
            E(J, 0);
          };
        function W(N, Z) {
          K = E(function () {
            N(e.unstable_now());
          }, Z);
        }
        (e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (N) {
            N.callback = null;
          }),
          (e.unstable_forceFrameRate = function (N) {
            0 > N || 125 < N
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
                )
              : ($ = 0 < N ? Math.floor(1e3 / N) : 5);
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return x;
          }),
          (e.unstable_next = function (N) {
            switch (x) {
              case 1:
              case 2:
              case 3:
                var Z = 3;
                break;
              default:
                Z = x;
            }
            var lt = x;
            x = Z;
            try {
              return N();
            } finally {
              x = lt;
            }
          }),
          (e.unstable_requestPaint = function () {
            D = !0;
          }),
          (e.unstable_runWithPriority = function (N, Z) {
            switch (N) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                N = 3;
            }
            var lt = x;
            x = N;
            try {
              return Z();
            } finally {
              x = lt;
            }
          }),
          (e.unstable_scheduleCallback = function (N, Z, lt) {
            var pt = e.unstable_now();
            switch (
              (typeof lt == 'object' && lt !== null
                ? ((lt = lt.delay),
                  (lt = typeof lt == 'number' && 0 < lt ? pt + lt : pt))
                : (lt = pt),
              N)
            ) {
              case 1:
                var w = -1;
                break;
              case 2:
                w = 250;
                break;
              case 5:
                w = 1073741823;
                break;
              case 4:
                w = 1e4;
                break;
              default:
                w = 5e3;
            }
            return (
              (w = lt + w),
              (N = {
                id: g++,
                callback: Z,
                priorityLevel: N,
                startTime: lt,
                expirationTime: w,
                sortIndex: -1,
              }),
              lt > pt
                ? ((N.sortIndex = lt),
                  i(p, N),
                  l(m) === null &&
                    N === l(p) &&
                    (M ? (L(K), (K = -1)) : (M = !0), W(Q, lt - pt)))
                : ((N.sortIndex = w),
                  i(m, N),
                  T || b || ((T = !0), V || ((V = !0), et()))),
              N
            );
          }),
          (e.unstable_shouldYield = O),
          (e.unstable_wrapCallback = function (N) {
            var Z = x;
            return function () {
              var lt = x;
              x = Z;
              try {
                return N.apply(this, arguments);
              } finally {
                x = lt;
              }
            };
          });
      })(rf)),
    rf
  );
}
var by;
function HT() {
  return by || ((by = 1), (af.exports = UT())), af.exports;
}
var sf = { exports: {} },
  Te = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Sy;
function qT() {
  if (Sy) return Te;
  Sy = 1;
  var e = Eh();
  function i(m) {
    var p = 'https://react.dev/errors/' + m;
    if (1 < arguments.length) {
      p += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        p += '&args[]=' + encodeURIComponent(arguments[g]);
    }
    return (
      'Minified React error #' +
      m +
      '; visit ' +
      p +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function l() {}
  var r = {
      d: {
        f: l,
        r: function () {
          throw Error(i(522));
        },
        D: l,
        C: l,
        L: l,
        m: l,
        X: l,
        S: l,
        M: l,
      },
      p: 0,
      findDOMNode: null,
    },
    o = Symbol.for('react.portal');
  function c(m, p, g) {
    var y =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: y == null ? null : '' + y,
      children: m,
      containerInfo: p,
      implementation: g,
    };
  }
  var u = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(m, p) {
    if (m === 'font') return '';
    if (typeof p == 'string') return p === 'use-credentials' ? p : '';
  }
  return (
    (Te.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (Te.createPortal = function (m, p) {
      var g =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!p || (p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11))
        throw Error(i(299));
      return c(m, p, null, g);
    }),
    (Te.flushSync = function (m) {
      var p = u.T,
        g = r.p;
      try {
        if (((u.T = null), (r.p = 2), m)) return m();
      } finally {
        (u.T = p), (r.p = g), r.d.f();
      }
    }),
    (Te.preconnect = function (m, p) {
      typeof m == 'string' &&
        (p
          ? ((p = p.crossOrigin),
            (p =
              typeof p == 'string'
                ? p === 'use-credentials'
                  ? p
                  : ''
                : void 0))
          : (p = null),
        r.d.C(m, p));
    }),
    (Te.prefetchDNS = function (m) {
      typeof m == 'string' && r.d.D(m);
    }),
    (Te.preinit = function (m, p) {
      if (typeof m == 'string' && p && typeof p.as == 'string') {
        var g = p.as,
          y = h(g, p.crossOrigin),
          x = typeof p.integrity == 'string' ? p.integrity : void 0,
          b = typeof p.fetchPriority == 'string' ? p.fetchPriority : void 0;
        g === 'style'
          ? r.d.S(m, typeof p.precedence == 'string' ? p.precedence : void 0, {
              crossOrigin: y,
              integrity: x,
              fetchPriority: b,
            })
          : g === 'script' &&
            r.d.X(m, {
              crossOrigin: y,
              integrity: x,
              fetchPriority: b,
              nonce: typeof p.nonce == 'string' ? p.nonce : void 0,
            });
      }
    }),
    (Te.preinitModule = function (m, p) {
      if (typeof m == 'string')
        if (typeof p == 'object' && p !== null) {
          if (p.as == null || p.as === 'script') {
            var g = h(p.as, p.crossOrigin);
            r.d.M(m, {
              crossOrigin: g,
              integrity: typeof p.integrity == 'string' ? p.integrity : void 0,
              nonce: typeof p.nonce == 'string' ? p.nonce : void 0,
            });
          }
        } else p == null && r.d.M(m);
    }),
    (Te.preload = function (m, p) {
      if (
        typeof m == 'string' &&
        typeof p == 'object' &&
        p !== null &&
        typeof p.as == 'string'
      ) {
        var g = p.as,
          y = h(g, p.crossOrigin);
        r.d.L(m, g, {
          crossOrigin: y,
          integrity: typeof p.integrity == 'string' ? p.integrity : void 0,
          nonce: typeof p.nonce == 'string' ? p.nonce : void 0,
          type: typeof p.type == 'string' ? p.type : void 0,
          fetchPriority:
            typeof p.fetchPriority == 'string' ? p.fetchPriority : void 0,
          referrerPolicy:
            typeof p.referrerPolicy == 'string' ? p.referrerPolicy : void 0,
          imageSrcSet:
            typeof p.imageSrcSet == 'string' ? p.imageSrcSet : void 0,
          imageSizes: typeof p.imageSizes == 'string' ? p.imageSizes : void 0,
          media: typeof p.media == 'string' ? p.media : void 0,
        });
      }
    }),
    (Te.preloadModule = function (m, p) {
      if (typeof m == 'string')
        if (p) {
          var g = h(p.as, p.crossOrigin);
          r.d.m(m, {
            as: typeof p.as == 'string' && p.as !== 'script' ? p.as : void 0,
            crossOrigin: g,
            integrity: typeof p.integrity == 'string' ? p.integrity : void 0,
          });
        } else r.d.m(m);
    }),
    (Te.requestFormReset = function (m) {
      r.d.r(m);
    }),
    (Te.unstable_batchedUpdates = function (m, p) {
      return m(p);
    }),
    (Te.useFormState = function (m, p, g) {
      return u.H.useFormState(m, p, g);
    }),
    (Te.useFormStatus = function () {
      return u.H.useHostTransitionStatus();
    }),
    (Te.version = '19.2.6'),
    Te
  );
}
var Ty;
function PT() {
  if (Ty) return sf.exports;
  Ty = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (i) {
        console.error(i);
      }
  }
  return e(), (sf.exports = qT()), sf.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ay;
function GT() {
  if (Ay) return lr;
  Ay = 1;
  var e = HT(),
    i = Eh(),
    l = PT();
  function r(t) {
    var n = 'https://react.dev/errors/' + t;
    if (1 < arguments.length) {
      n += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        n += '&args[]=' + encodeURIComponent(arguments[a]);
    }
    return (
      'Minified React error #' +
      t +
      '; visit ' +
      n +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function o(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function c(t) {
    var n = t,
      a = t;
    if (t.alternate) for (; n.return; ) n = n.return;
    else {
      t = n;
      do (n = t), (n.flags & 4098) !== 0 && (a = n.return), (t = n.return);
      while (t);
    }
    return n.tag === 3 ? a : null;
  }
  function u(t) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        (n === null && ((t = t.alternate), t !== null && (n = t.memoizedState)),
        n !== null)
      )
        return n.dehydrated;
    }
    return null;
  }
  function h(t) {
    if (t.tag === 31) {
      var n = t.memoizedState;
      if (
        (n === null && ((t = t.alternate), t !== null && (n = t.memoizedState)),
        n !== null)
      )
        return n.dehydrated;
    }
    return null;
  }
  function m(t) {
    if (c(t) !== t) throw Error(r(188));
  }
  function p(t) {
    var n = t.alternate;
    if (!n) {
      if (((n = c(t)), n === null)) throw Error(r(188));
      return n !== t ? null : t;
    }
    for (var a = t, s = n; ; ) {
      var f = a.return;
      if (f === null) break;
      var d = f.alternate;
      if (d === null) {
        if (((s = f.return), s !== null)) {
          a = s;
          continue;
        }
        break;
      }
      if (f.child === d.child) {
        for (d = f.child; d; ) {
          if (d === a) return m(f), t;
          if (d === s) return m(f), n;
          d = d.sibling;
        }
        throw Error(r(188));
      }
      if (a.return !== s.return) (a = f), (s = d);
      else {
        for (var v = !1, S = f.child; S; ) {
          if (S === a) {
            (v = !0), (a = f), (s = d);
            break;
          }
          if (S === s) {
            (v = !0), (s = f), (a = d);
            break;
          }
          S = S.sibling;
        }
        if (!v) {
          for (S = d.child; S; ) {
            if (S === a) {
              (v = !0), (a = d), (s = f);
              break;
            }
            if (S === s) {
              (v = !0), (s = d), (a = f);
              break;
            }
            S = S.sibling;
          }
          if (!v) throw Error(r(189));
        }
      }
      if (a.alternate !== s) throw Error(r(190));
    }
    if (a.tag !== 3) throw Error(r(188));
    return a.stateNode.current === a ? t : n;
  }
  function g(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((n = g(t)), n !== null)) return n;
      t = t.sibling;
    }
    return null;
  }
  var y = Object.assign,
    x = Symbol.for('react.element'),
    b = Symbol.for('react.transitional.element'),
    T = Symbol.for('react.portal'),
    M = Symbol.for('react.fragment'),
    D = Symbol.for('react.strict_mode'),
    E = Symbol.for('react.profiler'),
    L = Symbol.for('react.consumer'),
    R = Symbol.for('react.context'),
    Y = Symbol.for('react.forward_ref'),
    Q = Symbol.for('react.suspense'),
    V = Symbol.for('react.suspense_list'),
    K = Symbol.for('react.memo'),
    $ = Symbol.for('react.lazy'),
    it = Symbol.for('react.activity'),
    O = Symbol.for('react.memo_cache_sentinel'),
    J = Symbol.iterator;
  function et(t) {
    return t === null || typeof t != 'object'
      ? null
      : ((t = (J && t[J]) || t['@@iterator']),
        typeof t == 'function' ? t : null);
  }
  var vt = Symbol.for('react.client.reference');
  function st(t) {
    if (t == null) return null;
    if (typeof t == 'function')
      return t.$$typeof === vt ? null : t.displayName || t.name || null;
    if (typeof t == 'string') return t;
    switch (t) {
      case M:
        return 'Fragment';
      case E:
        return 'Profiler';
      case D:
        return 'StrictMode';
      case Q:
        return 'Suspense';
      case V:
        return 'SuspenseList';
      case it:
        return 'Activity';
    }
    if (typeof t == 'object')
      switch (t.$$typeof) {
        case T:
          return 'Portal';
        case R:
          return t.displayName || 'Context';
        case L:
          return (t._context.displayName || 'Context') + '.Consumer';
        case Y:
          var n = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = n.displayName || n.name || ''),
              (t = t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')),
            t
          );
        case K:
          return (
            (n = t.displayName || null), n !== null ? n : st(t.type) || 'Memo'
          );
        case $:
          (n = t._payload), (t = t._init);
          try {
            return st(t(n));
          } catch {}
      }
    return null;
  }
  var W = Array.isArray,
    N = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Z = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    lt = { pending: !1, data: null, method: null, action: null },
    pt = [],
    w = -1;
  function C(t) {
    return { current: t };
  }
  function G(t) {
    0 > w || ((t.current = pt[w]), (pt[w] = null), w--);
  }
  function A(t, n) {
    w++, (pt[w] = t.current), (t.current = n);
  }
  var at = C(null),
    gt = C(null),
    ft = C(null),
    Ct = C(null);
  function Zt(t, n) {
    switch ((A(ft, n), A(gt, t), A(at, null), n.nodeType)) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? Vg(t) : 0;
        break;
      default:
        if (((t = n.tagName), (n = n.namespaceURI)))
          (n = Vg(n)), (t = Ug(n, t));
        else
          switch (t) {
            case 'svg':
              t = 1;
              break;
            case 'math':
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    G(at), A(at, t);
  }
  function Vt() {
    G(at), G(gt), G(ft);
  }
  function $e(t) {
    t.memoizedState !== null && A(Ct, t);
    var n = at.current,
      a = Ug(n, t.type);
    n !== a && (A(gt, t), A(at, a));
  }
  function On(t) {
    gt.current === t && (G(at), G(gt)),
      Ct.current === t && (G(Ct), (Wa._currentValue = lt));
  }
  var ca, _r;
  function Rn(t) {
    if (ca === void 0)
      try {
        throw Error();
      } catch (a) {
        var n = a.stack.trim().match(/\n( *(at )?)/);
        (ca = (n && n[1]) || ''),
          (_r =
            -1 <
            a.stack.indexOf(`
    at`)
              ? ' (<anonymous>)'
              : -1 < a.stack.indexOf('@')
                ? '@unknown:0:0'
                : '');
      }
    return (
      `
` +
      ca +
      t +
      _r
    );
  }
  var al = !1;
  function rl(t, n) {
    if (!t || al) return '';
    al = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var s = {
        DetermineComponentFrameRoot: function () {
          try {
            if (n) {
              var X = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(X.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(X, []);
                } catch (q) {
                  var U = q;
                }
                Reflect.construct(t, [], X);
              } else {
                try {
                  X.call();
                } catch (q) {
                  U = q;
                }
                t.call(X.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (q) {
                U = q;
              }
              (X = t()) &&
                typeof X.catch == 'function' &&
                X.catch(function () {});
            }
          } catch (q) {
            if (q && U && typeof q.stack == 'string') return [q.stack, U.stack];
          }
          return [null, null];
        },
      };
      s.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var f = Object.getOwnPropertyDescriptor(
        s.DetermineComponentFrameRoot,
        'name',
      );
      f &&
        f.configurable &&
        Object.defineProperty(s.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var d = s.DetermineComponentFrameRoot(),
        v = d[0],
        S = d[1];
      if (v && S) {
        var k = v.split(`
`),
          B = S.split(`
`);
        for (
          f = s = 0;
          s < k.length && !k[s].includes('DetermineComponentFrameRoot');

        )
          s++;
        for (; f < B.length && !B[f].includes('DetermineComponentFrameRoot'); )
          f++;
        if (s === k.length || f === B.length)
          for (
            s = k.length - 1, f = B.length - 1;
            1 <= s && 0 <= f && k[s] !== B[f];

          )
            f--;
        for (; 1 <= s && 0 <= f; s--, f--)
          if (k[s] !== B[f]) {
            if (s !== 1 || f !== 1)
              do
                if ((s--, f--, 0 > f || k[s] !== B[f])) {
                  var P =
                    `
` + k[s].replace(' at new ', ' at ');
                  return (
                    t.displayName &&
                      P.includes('<anonymous>') &&
                      (P = P.replace('<anonymous>', t.displayName)),
                    P
                  );
                }
              while (1 <= s && 0 <= f);
            break;
          }
      }
    } finally {
      (al = !1), (Error.prepareStackTrace = a);
    }
    return (a = t ? t.displayName || t.name : '') ? Rn(a) : '';
  }
  function Nr(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Rn(t.type);
      case 16:
        return Rn('Lazy');
      case 13:
        return t.child !== n && n !== null
          ? Rn('Suspense Fallback')
          : Rn('Suspense');
      case 19:
        return Rn('SuspenseList');
      case 0:
      case 15:
        return rl(t.type, !1);
      case 11:
        return rl(t.type.render, !1);
      case 1:
        return rl(t.type, !0);
      case 31:
        return Rn('Activity');
      default:
        return '';
    }
  }
  function Lr(t) {
    try {
      var n = '',
        a = null;
      do (n += Nr(t, a)), (a = t), (t = t.return);
      while (t);
      return n;
    } catch (s) {
      return (
        `
Error generating stack: ` +
        s.message +
        `
` +
        s.stack
      );
    }
  }
  var sl = Object.prototype.hasOwnProperty,
    ol = e.unstable_scheduleCallback,
    fa = e.unstable_cancelCallback,
    Ho = e.unstable_shouldYield,
    qo = e.unstable_requestPaint,
    Ee = e.unstable_now,
    Po = e.unstable_getCurrentPriorityLevel,
    F = e.unstable_ImmediatePriority,
    nt = e.unstable_UserBlockingPriority,
    yt = e.unstable_NormalPriority,
    At = e.unstable_LowPriority,
    Lt = e.unstable_IdlePriority,
    qe = e.log,
    _n = e.unstable_setDisableYieldValue,
    ke = null,
    ce = null;
  function Oe(t) {
    if (
      (typeof qe == 'function' && _n(t),
      ce && typeof ce.setStrictMode == 'function')
    )
      try {
        ce.setStrictMode(ke, t);
      } catch {}
  }
  var Pt = Math.clz32 ? Math.clz32 : Tb,
    Wn = Math.log,
    dn = Math.LN2;
  function Tb(t) {
    return (t >>>= 0), t === 0 ? 32 : (31 - ((Wn(t) / dn) | 0)) | 0;
  }
  var jr = 256,
    Br = 262144,
    Vr = 4194304;
  function Ri(t) {
    var n = t & 42;
    if (n !== 0) return n;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Ur(t, n, a) {
    var s = t.pendingLanes;
    if (s === 0) return 0;
    var f = 0,
      d = t.suspendedLanes,
      v = t.pingedLanes;
    t = t.warmLanes;
    var S = s & 134217727;
    return (
      S !== 0
        ? ((s = S & ~d),
          s !== 0
            ? (f = Ri(s))
            : ((v &= S),
              v !== 0
                ? (f = Ri(v))
                : a || ((a = S & ~t), a !== 0 && (f = Ri(a)))))
        : ((S = s & ~d),
          S !== 0
            ? (f = Ri(S))
            : v !== 0
              ? (f = Ri(v))
              : a || ((a = s & ~t), a !== 0 && (f = Ri(a)))),
      f === 0
        ? 0
        : n !== 0 &&
            n !== f &&
            (n & d) === 0 &&
            ((d = f & -f),
            (a = n & -n),
            d >= a || (d === 32 && (a & 4194048) !== 0))
          ? n
          : f
    );
  }
  function ha(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function Ab(t, n) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function xd() {
    var t = Vr;
    return (Vr <<= 1), (Vr & 62914560) === 0 && (Vr = 4194304), t;
  }
  function Go(t) {
    for (var n = [], a = 0; 31 > a; a++) n.push(t);
    return n;
  }
  function da(t, n) {
    (t.pendingLanes |= n),
      n !== 268435456 &&
        ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0));
  }
  function wb(t, n, a, s, f, d) {
    var v = t.pendingLanes;
    (t.pendingLanes = a),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= a),
      (t.entangledLanes &= a),
      (t.errorRecoveryDisabledLanes &= a),
      (t.shellSuspendCounter = 0);
    var S = t.entanglements,
      k = t.expirationTimes,
      B = t.hiddenUpdates;
    for (a = v & ~a; 0 < a; ) {
      var P = 31 - Pt(a),
        X = 1 << P;
      (S[P] = 0), (k[P] = -1);
      var U = B[P];
      if (U !== null)
        for (B[P] = null, P = 0; P < U.length; P++) {
          var q = U[P];
          q !== null && (q.lane &= -536870913);
        }
      a &= ~X;
    }
    s !== 0 && bd(t, s, 0),
      d !== 0 && f === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(v & ~n));
  }
  function bd(t, n, a) {
    (t.pendingLanes |= n), (t.suspendedLanes &= ~n);
    var s = 31 - Pt(n);
    (t.entangledLanes |= n),
      (t.entanglements[s] = t.entanglements[s] | 1073741824 | (a & 261930));
  }
  function Sd(t, n) {
    var a = (t.entangledLanes |= n);
    for (t = t.entanglements; a; ) {
      var s = 31 - Pt(a),
        f = 1 << s;
      (f & n) | (t[s] & n) && (t[s] |= n), (a &= ~f);
    }
  }
  function Td(t, n) {
    var a = n & -n;
    return (
      (a = (a & 42) !== 0 ? 1 : Yo(a)),
      (a & (t.suspendedLanes | n)) !== 0 ? 0 : a
    );
  }
  function Yo(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Fo(t) {
    return (
      (t &= -t),
      2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Ad() {
    var t = Z.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : oy(t.type));
  }
  function wd(t, n) {
    var a = Z.p;
    try {
      return (Z.p = t), n();
    } finally {
      Z.p = a;
    }
  }
  var ti = Math.random().toString(36).slice(2),
    me = '__reactFiber$' + ti,
    Re = '__reactProps$' + ti,
    ul = '__reactContainer$' + ti,
    Io = '__reactEvents$' + ti,
    Eb = '__reactListeners$' + ti,
    kb = '__reactHandles$' + ti,
    Ed = '__reactResources$' + ti,
    pa = '__reactMarker$' + ti;
  function Xo(t) {
    delete t[me], delete t[Re], delete t[Io], delete t[Eb], delete t[kb];
  }
  function cl(t) {
    var n = t[me];
    if (n) return n;
    for (var a = t.parentNode; a; ) {
      if ((n = a[ul] || a[me])) {
        if (
          ((a = n.alternate),
          n.child !== null || (a !== null && a.child !== null))
        )
          for (t = Ig(t); t !== null; ) {
            if ((a = t[me])) return a;
            t = Ig(t);
          }
        return n;
      }
      (t = a), (a = t.parentNode);
    }
    return null;
  }
  function fl(t) {
    if ((t = t[me] || t[ul])) {
      var n = t.tag;
      if (
        n === 5 ||
        n === 6 ||
        n === 13 ||
        n === 31 ||
        n === 26 ||
        n === 27 ||
        n === 3
      )
        return t;
    }
    return null;
  }
  function ma(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(r(33));
  }
  function hl(t) {
    var n = t[Ed];
    return (
      n ||
        (n = t[Ed] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      n
    );
  }
  function de(t) {
    t[pa] = !0;
  }
  var kd = new Set(),
    Cd = {};
  function _i(t, n) {
    dl(t, n), dl(t + 'Capture', n);
  }
  function dl(t, n) {
    for (Cd[t] = n, t = 0; t < n.length; t++) kd.add(n[t]);
  }
  var Cb = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$',
    ),
    Md = {},
    Dd = {};
  function Mb(t) {
    return sl.call(Dd, t)
      ? !0
      : sl.call(Md, t)
        ? !1
        : Cb.test(t)
          ? (Dd[t] = !0)
          : ((Md[t] = !0), !1);
  }
  function Hr(t, n, a) {
    if (Mb(n))
      if (a === null) t.removeAttribute(n);
      else {
        switch (typeof a) {
          case 'undefined':
          case 'function':
          case 'symbol':
            t.removeAttribute(n);
            return;
          case 'boolean':
            var s = n.toLowerCase().slice(0, 5);
            if (s !== 'data-' && s !== 'aria-') {
              t.removeAttribute(n);
              return;
            }
        }
        t.setAttribute(n, '' + a);
      }
  }
  function qr(t, n, a) {
    if (a === null) t.removeAttribute(n);
    else {
      switch (typeof a) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          t.removeAttribute(n);
          return;
      }
      t.setAttribute(n, '' + a);
    }
  }
  function Nn(t, n, a, s) {
    if (s === null) t.removeAttribute(a);
    else {
      switch (typeof s) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          t.removeAttribute(a);
          return;
      }
      t.setAttributeNS(n, a, '' + s);
    }
  }
  function We(t) {
    switch (typeof t) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return t;
      case 'object':
        return t;
      default:
        return '';
    }
  }
  function zd(t) {
    var n = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === 'input' &&
      (n === 'checkbox' || n === 'radio')
    );
  }
  function Db(t, n, a) {
    var s = Object.getOwnPropertyDescriptor(t.constructor.prototype, n);
    if (
      !t.hasOwnProperty(n) &&
      typeof s < 'u' &&
      typeof s.get == 'function' &&
      typeof s.set == 'function'
    ) {
      var f = s.get,
        d = s.set;
      return (
        Object.defineProperty(t, n, {
          configurable: !0,
          get: function () {
            return f.call(this);
          },
          set: function (v) {
            (a = '' + v), d.call(this, v);
          },
        }),
        Object.defineProperty(t, n, { enumerable: s.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (v) {
            a = '' + v;
          },
          stopTracking: function () {
            (t._valueTracker = null), delete t[n];
          },
        }
      );
    }
  }
  function Qo(t) {
    if (!t._valueTracker) {
      var n = zd(t) ? 'checked' : 'value';
      t._valueTracker = Db(t, n, '' + t[n]);
    }
  }
  function Od(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var a = n.getValue(),
      s = '';
    return (
      t && (s = zd(t) ? (t.checked ? 'true' : 'false') : t.value),
      (t = s),
      t !== a ? (n.setValue(t), !0) : !1
    );
  }
  function Pr(t) {
    if (
      ((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u')
    )
      return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var zb = /[\n"\\]/g;
  function tn(t) {
    return t.replace(zb, function (n) {
      return '\\' + n.charCodeAt(0).toString(16) + ' ';
    });
  }
  function Ko(t, n, a, s, f, d, v, S) {
    (t.name = ''),
      v != null &&
      typeof v != 'function' &&
      typeof v != 'symbol' &&
      typeof v != 'boolean'
        ? (t.type = v)
        : t.removeAttribute('type'),
      n != null
        ? v === 'number'
          ? ((n === 0 && t.value === '') || t.value != n) &&
            (t.value = '' + We(n))
          : t.value !== '' + We(n) && (t.value = '' + We(n))
        : (v !== 'submit' && v !== 'reset') || t.removeAttribute('value'),
      n != null
        ? Zo(t, v, We(n))
        : a != null
          ? Zo(t, v, We(a))
          : s != null && t.removeAttribute('value'),
      f == null && d != null && (t.defaultChecked = !!d),
      f != null &&
        (t.checked = f && typeof f != 'function' && typeof f != 'symbol'),
      S != null &&
      typeof S != 'function' &&
      typeof S != 'symbol' &&
      typeof S != 'boolean'
        ? (t.name = '' + We(S))
        : t.removeAttribute('name');
  }
  function Rd(t, n, a, s, f, d, v, S) {
    if (
      (d != null &&
        typeof d != 'function' &&
        typeof d != 'symbol' &&
        typeof d != 'boolean' &&
        (t.type = d),
      n != null || a != null)
    ) {
      if (!((d !== 'submit' && d !== 'reset') || n != null)) {
        Qo(t);
        return;
      }
      (a = a != null ? '' + We(a) : ''),
        (n = n != null ? '' + We(n) : a),
        S || n === t.value || (t.value = n),
        (t.defaultValue = n);
    }
    (s = s ?? f),
      (s = typeof s != 'function' && typeof s != 'symbol' && !!s),
      (t.checked = S ? t.checked : !!s),
      (t.defaultChecked = !!s),
      v != null &&
        typeof v != 'function' &&
        typeof v != 'symbol' &&
        typeof v != 'boolean' &&
        (t.name = v),
      Qo(t);
  }
  function Zo(t, n, a) {
    (n === 'number' && Pr(t.ownerDocument) === t) ||
      t.defaultValue === '' + a ||
      (t.defaultValue = '' + a);
  }
  function pl(t, n, a, s) {
    if (((t = t.options), n)) {
      n = {};
      for (var f = 0; f < a.length; f++) n['$' + a[f]] = !0;
      for (a = 0; a < t.length; a++)
        (f = n.hasOwnProperty('$' + t[a].value)),
          t[a].selected !== f && (t[a].selected = f),
          f && s && (t[a].defaultSelected = !0);
    } else {
      for (a = '' + We(a), n = null, f = 0; f < t.length; f++) {
        if (t[f].value === a) {
          (t[f].selected = !0), s && (t[f].defaultSelected = !0);
          return;
        }
        n !== null || t[f].disabled || (n = t[f]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function _d(t, n, a) {
    if (
      n != null &&
      ((n = '' + We(n)), n !== t.value && (t.value = n), a == null)
    ) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = a != null ? '' + We(a) : '';
  }
  function Nd(t, n, a, s) {
    if (n == null) {
      if (s != null) {
        if (a != null) throw Error(r(92));
        if (W(s)) {
          if (1 < s.length) throw Error(r(93));
          s = s[0];
        }
        a = s;
      }
      a == null && (a = ''), (n = a);
    }
    (a = We(n)),
      (t.defaultValue = a),
      (s = t.textContent),
      s === a && s !== '' && s !== null && (t.value = s),
      Qo(t);
  }
  function ml(t, n) {
    if (n) {
      var a = t.firstChild;
      if (a && a === t.lastChild && a.nodeType === 3) {
        a.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var Ob = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' ',
    ),
  );
  function Ld(t, n, a) {
    var s = n.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? s
        ? t.setProperty(n, '')
        : n === 'float'
          ? (t.cssFloat = '')
          : (t[n] = '')
      : s
        ? t.setProperty(n, a)
        : typeof a != 'number' || a === 0 || Ob.has(n)
          ? n === 'float'
            ? (t.cssFloat = a)
            : (t[n] = ('' + a).trim())
          : (t[n] = a + 'px');
  }
  function jd(t, n, a) {
    if (n != null && typeof n != 'object') throw Error(r(62));
    if (((t = t.style), a != null)) {
      for (var s in a)
        !a.hasOwnProperty(s) ||
          (n != null && n.hasOwnProperty(s)) ||
          (s.indexOf('--') === 0
            ? t.setProperty(s, '')
            : s === 'float'
              ? (t.cssFloat = '')
              : (t[s] = ''));
      for (var f in n)
        (s = n[f]), n.hasOwnProperty(f) && a[f] !== s && Ld(t, f, s);
    } else for (var d in n) n.hasOwnProperty(d) && Ld(t, d, n[d]);
  }
  function Jo(t) {
    if (t.indexOf('-') === -1) return !1;
    switch (t) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1;
      default:
        return !0;
    }
  }
  var Rb = new Map([
      ['acceptCharset', 'accept-charset'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
      ['crossOrigin', 'crossorigin'],
      ['accentHeight', 'accent-height'],
      ['alignmentBaseline', 'alignment-baseline'],
      ['arabicForm', 'arabic-form'],
      ['baselineShift', 'baseline-shift'],
      ['capHeight', 'cap-height'],
      ['clipPath', 'clip-path'],
      ['clipRule', 'clip-rule'],
      ['colorInterpolation', 'color-interpolation'],
      ['colorInterpolationFilters', 'color-interpolation-filters'],
      ['colorProfile', 'color-profile'],
      ['colorRendering', 'color-rendering'],
      ['dominantBaseline', 'dominant-baseline'],
      ['enableBackground', 'enable-background'],
      ['fillOpacity', 'fill-opacity'],
      ['fillRule', 'fill-rule'],
      ['floodColor', 'flood-color'],
      ['floodOpacity', 'flood-opacity'],
      ['fontFamily', 'font-family'],
      ['fontSize', 'font-size'],
      ['fontSizeAdjust', 'font-size-adjust'],
      ['fontStretch', 'font-stretch'],
      ['fontStyle', 'font-style'],
      ['fontVariant', 'font-variant'],
      ['fontWeight', 'font-weight'],
      ['glyphName', 'glyph-name'],
      ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
      ['glyphOrientationVertical', 'glyph-orientation-vertical'],
      ['horizAdvX', 'horiz-adv-x'],
      ['horizOriginX', 'horiz-origin-x'],
      ['imageRendering', 'image-rendering'],
      ['letterSpacing', 'letter-spacing'],
      ['lightingColor', 'lighting-color'],
      ['markerEnd', 'marker-end'],
      ['markerMid', 'marker-mid'],
      ['markerStart', 'marker-start'],
      ['overlinePosition', 'overline-position'],
      ['overlineThickness', 'overline-thickness'],
      ['paintOrder', 'paint-order'],
      ['panose-1', 'panose-1'],
      ['pointerEvents', 'pointer-events'],
      ['renderingIntent', 'rendering-intent'],
      ['shapeRendering', 'shape-rendering'],
      ['stopColor', 'stop-color'],
      ['stopOpacity', 'stop-opacity'],
      ['strikethroughPosition', 'strikethrough-position'],
      ['strikethroughThickness', 'strikethrough-thickness'],
      ['strokeDasharray', 'stroke-dasharray'],
      ['strokeDashoffset', 'stroke-dashoffset'],
      ['strokeLinecap', 'stroke-linecap'],
      ['strokeLinejoin', 'stroke-linejoin'],
      ['strokeMiterlimit', 'stroke-miterlimit'],
      ['strokeOpacity', 'stroke-opacity'],
      ['strokeWidth', 'stroke-width'],
      ['textAnchor', 'text-anchor'],
      ['textDecoration', 'text-decoration'],
      ['textRendering', 'text-rendering'],
      ['transformOrigin', 'transform-origin'],
      ['underlinePosition', 'underline-position'],
      ['underlineThickness', 'underline-thickness'],
      ['unicodeBidi', 'unicode-bidi'],
      ['unicodeRange', 'unicode-range'],
      ['unitsPerEm', 'units-per-em'],
      ['vAlphabetic', 'v-alphabetic'],
      ['vHanging', 'v-hanging'],
      ['vIdeographic', 'v-ideographic'],
      ['vMathematical', 'v-mathematical'],
      ['vectorEffect', 'vector-effect'],
      ['vertAdvY', 'vert-adv-y'],
      ['vertOriginX', 'vert-origin-x'],
      ['vertOriginY', 'vert-origin-y'],
      ['wordSpacing', 'word-spacing'],
      ['writingMode', 'writing-mode'],
      ['xmlnsXlink', 'xmlns:xlink'],
      ['xHeight', 'x-height'],
    ]),
    _b =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Gr(t) {
    return _b.test('' + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function Ln() {}
  var $o = null;
  function Wo(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var gl = null,
    yl = null;
  function Bd(t) {
    var n = fl(t);
    if (n && (t = n.stateNode)) {
      var a = t[Re] || null;
      t: switch (((t = n.stateNode), n.type)) {
        case 'input':
          if (
            (Ko(
              t,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name,
            ),
            (n = a.name),
            a.type === 'radio' && n != null)
          ) {
            for (a = t; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                'input[name="' + tn('' + n) + '"][type="radio"]',
              ),
                n = 0;
              n < a.length;
              n++
            ) {
              var s = a[n];
              if (s !== t && s.form === t.form) {
                var f = s[Re] || null;
                if (!f) throw Error(r(90));
                Ko(
                  s,
                  f.value,
                  f.defaultValue,
                  f.defaultValue,
                  f.checked,
                  f.defaultChecked,
                  f.type,
                  f.name,
                );
              }
            }
            for (n = 0; n < a.length; n++)
              (s = a[n]), s.form === t.form && Od(s);
          }
          break t;
        case 'textarea':
          _d(t, a.value, a.defaultValue);
          break t;
        case 'select':
          (n = a.value), n != null && pl(t, !!a.multiple, n, !1);
      }
    }
  }
  var tu = !1;
  function Vd(t, n, a) {
    if (tu) return t(n, a);
    tu = !0;
    try {
      var s = t(n);
      return s;
    } finally {
      if (
        ((tu = !1),
        (gl !== null || yl !== null) &&
          (zs(), gl && ((n = gl), (t = yl), (yl = gl = null), Bd(n), t)))
      )
        for (n = 0; n < t.length; n++) Bd(t[n]);
    }
  }
  function ga(t, n) {
    var a = t.stateNode;
    if (a === null) return null;
    var s = a[Re] || null;
    if (s === null) return null;
    a = s[n];
    t: switch (n) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        (s = !s.disabled) ||
          ((t = t.type),
          (s = !(
            t === 'button' ||
            t === 'input' ||
            t === 'select' ||
            t === 'textarea'
          ))),
          (t = !s);
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (a && typeof a != 'function') throw Error(r(231, n, typeof a));
    return a;
  }
  var jn = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    eu = !1;
  if (jn)
    try {
      var ya = {};
      Object.defineProperty(ya, 'passive', {
        get: function () {
          eu = !0;
        },
      }),
        window.addEventListener('test', ya, ya),
        window.removeEventListener('test', ya, ya);
    } catch {
      eu = !1;
    }
  var ei = null,
    nu = null,
    Yr = null;
  function Ud() {
    if (Yr) return Yr;
    var t,
      n = nu,
      a = n.length,
      s,
      f = 'value' in ei ? ei.value : ei.textContent,
      d = f.length;
    for (t = 0; t < a && n[t] === f[t]; t++);
    var v = a - t;
    for (s = 1; s <= v && n[a - s] === f[d - s]; s++);
    return (Yr = f.slice(t, 1 < s ? 1 - s : void 0));
  }
  function Fr(t) {
    var n = t.keyCode;
    return (
      'charCode' in t
        ? ((t = t.charCode), t === 0 && n === 13 && (t = 13))
        : (t = n),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Ir() {
    return !0;
  }
  function Hd() {
    return !1;
  }
  function _e(t) {
    function n(a, s, f, d, v) {
      (this._reactName = a),
        (this._targetInst = f),
        (this.type = s),
        (this.nativeEvent = d),
        (this.target = v),
        (this.currentTarget = null);
      for (var S in t)
        t.hasOwnProperty(S) && ((a = t[S]), (this[S] = a ? a(d) : d[S]));
      return (
        (this.isDefaultPrevented = (
          d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1
        )
          ? Ir
          : Hd),
        (this.isPropagationStopped = Hd),
        this
      );
    }
    return (
      y(n.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != 'unknown' && (a.returnValue = !1),
            (this.isDefaultPrevented = Ir));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = Ir));
        },
        persist: function () {},
        isPersistent: Ir,
      }),
      n
    );
  }
  var Ni = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Xr = _e(Ni),
    va = y({}, Ni, { view: 0, detail: 0 }),
    Nb = _e(va),
    iu,
    lu,
    xa,
    Qr = y({}, va, {
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
      getModifierState: ru,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return 'movementX' in t
          ? t.movementX
          : (t !== xa &&
              (xa && t.type === 'mousemove'
                ? ((iu = t.screenX - xa.screenX), (lu = t.screenY - xa.screenY))
                : (lu = iu = 0),
              (xa = t)),
            iu);
      },
      movementY: function (t) {
        return 'movementY' in t ? t.movementY : lu;
      },
    }),
    qd = _e(Qr),
    Lb = y({}, Qr, { dataTransfer: 0 }),
    jb = _e(Lb),
    Bb = y({}, va, { relatedTarget: 0 }),
    au = _e(Bb),
    Vb = y({}, Ni, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ub = _e(Vb),
    Hb = y({}, Ni, {
      clipboardData: function (t) {
        return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
      },
    }),
    qb = _e(Hb),
    Pb = y({}, Ni, { data: 0 }),
    Pd = _e(Pb),
    Gb = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    Yb = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    Fb = {
      Alt: 'altKey',
      Control: 'ctrlKey',
      Meta: 'metaKey',
      Shift: 'shiftKey',
    };
  function Ib(t) {
    var n = this.nativeEvent;
    return n.getModifierState
      ? n.getModifierState(t)
      : (t = Fb[t])
        ? !!n[t]
        : !1;
  }
  function ru() {
    return Ib;
  }
  var Xb = y({}, va, {
      key: function (t) {
        if (t.key) {
          var n = Gb[t.key] || t.key;
          if (n !== 'Unidentified') return n;
        }
        return t.type === 'keypress'
          ? ((t = Fr(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
          : t.type === 'keydown' || t.type === 'keyup'
            ? Yb[t.keyCode] || 'Unidentified'
            : '';
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: ru,
      charCode: function (t) {
        return t.type === 'keypress' ? Fr(t) : 0;
      },
      keyCode: function (t) {
        return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === 'keypress'
          ? Fr(t)
          : t.type === 'keydown' || t.type === 'keyup'
            ? t.keyCode
            : 0;
      },
    }),
    Qb = _e(Xb),
    Kb = y({}, Qr, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Gd = _e(Kb),
    Zb = y({}, va, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: ru,
    }),
    Jb = _e(Zb),
    $b = y({}, Ni, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Wb = _e($b),
    tS = y({}, Qr, {
      deltaX: function (t) {
        return 'deltaX' in t
          ? t.deltaX
          : 'wheelDeltaX' in t
            ? -t.wheelDeltaX
            : 0;
      },
      deltaY: function (t) {
        return 'deltaY' in t
          ? t.deltaY
          : 'wheelDeltaY' in t
            ? -t.wheelDeltaY
            : 'wheelDelta' in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    eS = _e(tS),
    nS = y({}, Ni, { newState: 0, oldState: 0 }),
    iS = _e(nS),
    lS = [9, 13, 27, 32],
    su = jn && 'CompositionEvent' in window,
    ba = null;
  jn && 'documentMode' in document && (ba = document.documentMode);
  var aS = jn && 'TextEvent' in window && !ba,
    Yd = jn && (!su || (ba && 8 < ba && 11 >= ba)),
    Fd = ' ',
    Id = !1;
  function Xd(t, n) {
    switch (t) {
      case 'keyup':
        return lS.indexOf(n.keyCode) !== -1;
      case 'keydown':
        return n.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function Qd(t) {
    return (t = t.detail), typeof t == 'object' && 'data' in t ? t.data : null;
  }
  var vl = !1;
  function rS(t, n) {
    switch (t) {
      case 'compositionend':
        return Qd(n);
      case 'keypress':
        return n.which !== 32 ? null : ((Id = !0), Fd);
      case 'textInput':
        return (t = n.data), t === Fd && Id ? null : t;
      default:
        return null;
    }
  }
  function sS(t, n) {
    if (vl)
      return t === 'compositionend' || (!su && Xd(t, n))
        ? ((t = Ud()), (Yr = nu = ei = null), (vl = !1), t)
        : null;
    switch (t) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(n.ctrlKey || n.altKey || n.metaKey) || (n.ctrlKey && n.altKey)) {
          if (n.char && 1 < n.char.length) return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case 'compositionend':
        return Yd && n.locale !== 'ko' ? null : n.data;
      default:
        return null;
    }
  }
  var oS = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
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
    week: !0,
  };
  function Kd(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === 'input' ? !!oS[t.type] : n === 'textarea';
  }
  function Zd(t, n, a, s) {
    gl ? (yl ? yl.push(s) : (yl = [s])) : (gl = s),
      (n = Bs(n, 'onChange')),
      0 < n.length &&
        ((a = new Xr('onChange', 'change', null, a, s)),
        t.push({ event: a, listeners: n }));
  }
  var Sa = null,
    Ta = null;
  function uS(t) {
    Rg(t, 0);
  }
  function Kr(t) {
    var n = ma(t);
    if (Od(n)) return t;
  }
  function Jd(t, n) {
    if (t === 'change') return n;
  }
  var $d = !1;
  if (jn) {
    var ou;
    if (jn) {
      var uu = 'oninput' in document;
      if (!uu) {
        var Wd = document.createElement('div');
        Wd.setAttribute('oninput', 'return;'),
          (uu = typeof Wd.oninput == 'function');
      }
      ou = uu;
    } else ou = !1;
    $d = ou && (!document.documentMode || 9 < document.documentMode);
  }
  function tp() {
    Sa && (Sa.detachEvent('onpropertychange', ep), (Ta = Sa = null));
  }
  function ep(t) {
    if (t.propertyName === 'value' && Kr(Ta)) {
      var n = [];
      Zd(n, Ta, t, Wo(t)), Vd(uS, n);
    }
  }
  function cS(t, n, a) {
    t === 'focusin'
      ? (tp(), (Sa = n), (Ta = a), Sa.attachEvent('onpropertychange', ep))
      : t === 'focusout' && tp();
  }
  function fS(t) {
    if (t === 'selectionchange' || t === 'keyup' || t === 'keydown')
      return Kr(Ta);
  }
  function hS(t, n) {
    if (t === 'click') return Kr(n);
  }
  function dS(t, n) {
    if (t === 'input' || t === 'change') return Kr(n);
  }
  function pS(t, n) {
    return (t === n && (t !== 0 || 1 / t === 1 / n)) || (t !== t && n !== n);
  }
  var Pe = typeof Object.is == 'function' ? Object.is : pS;
  function Aa(t, n) {
    if (Pe(t, n)) return !0;
    if (
      typeof t != 'object' ||
      t === null ||
      typeof n != 'object' ||
      n === null
    )
      return !1;
    var a = Object.keys(t),
      s = Object.keys(n);
    if (a.length !== s.length) return !1;
    for (s = 0; s < a.length; s++) {
      var f = a[s];
      if (!sl.call(n, f) || !Pe(t[f], n[f])) return !1;
    }
    return !0;
  }
  function np(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function ip(t, n) {
    var a = np(t);
    t = 0;
    for (var s; a; ) {
      if (a.nodeType === 3) {
        if (((s = t + a.textContent.length), t <= n && s >= n))
          return { node: a, offset: n - t };
        t = s;
      }
      t: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break t;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = np(a);
    }
  }
  function lp(t, n) {
    return t && n
      ? t === n
        ? !0
        : t && t.nodeType === 3
          ? !1
          : n && n.nodeType === 3
            ? lp(t, n.parentNode)
            : 'contains' in t
              ? t.contains(n)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(n) & 16)
                : !1
      : !1;
  }
  function ap(t) {
    t =
      t != null &&
      t.ownerDocument != null &&
      t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var n = Pr(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof n.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) t = n.contentWindow;
      else break;
      n = Pr(t.document);
    }
    return n;
  }
  function cu(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      n &&
      ((n === 'input' &&
        (t.type === 'text' ||
          t.type === 'search' ||
          t.type === 'tel' ||
          t.type === 'url' ||
          t.type === 'password')) ||
        n === 'textarea' ||
        t.contentEditable === 'true')
    );
  }
  var mS = jn && 'documentMode' in document && 11 >= document.documentMode,
    xl = null,
    fu = null,
    wa = null,
    hu = !1;
  function rp(t, n, a) {
    var s =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    hu ||
      xl == null ||
      xl !== Pr(s) ||
      ((s = xl),
      'selectionStart' in s && cu(s)
        ? (s = { start: s.selectionStart, end: s.selectionEnd })
        : ((s = (
            (s.ownerDocument && s.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (s = {
            anchorNode: s.anchorNode,
            anchorOffset: s.anchorOffset,
            focusNode: s.focusNode,
            focusOffset: s.focusOffset,
          })),
      (wa && Aa(wa, s)) ||
        ((wa = s),
        (s = Bs(fu, 'onSelect')),
        0 < s.length &&
          ((n = new Xr('onSelect', 'select', null, n, a)),
          t.push({ event: n, listeners: s }),
          (n.target = xl))));
  }
  function Li(t, n) {
    var a = {};
    return (
      (a[t.toLowerCase()] = n.toLowerCase()),
      (a['Webkit' + t] = 'webkit' + n),
      (a['Moz' + t] = 'moz' + n),
      a
    );
  }
  var bl = {
      animationend: Li('Animation', 'AnimationEnd'),
      animationiteration: Li('Animation', 'AnimationIteration'),
      animationstart: Li('Animation', 'AnimationStart'),
      transitionrun: Li('Transition', 'TransitionRun'),
      transitionstart: Li('Transition', 'TransitionStart'),
      transitioncancel: Li('Transition', 'TransitionCancel'),
      transitionend: Li('Transition', 'TransitionEnd'),
    },
    du = {},
    sp = {};
  jn &&
    ((sp = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete bl.animationend.animation,
      delete bl.animationiteration.animation,
      delete bl.animationstart.animation),
    'TransitionEvent' in window || delete bl.transitionend.transition);
  function ji(t) {
    if (du[t]) return du[t];
    if (!bl[t]) return t;
    var n = bl[t],
      a;
    for (a in n) if (n.hasOwnProperty(a) && a in sp) return (du[t] = n[a]);
    return t;
  }
  var op = ji('animationend'),
    up = ji('animationiteration'),
    cp = ji('animationstart'),
    gS = ji('transitionrun'),
    yS = ji('transitionstart'),
    vS = ji('transitioncancel'),
    fp = ji('transitionend'),
    hp = new Map(),
    pu =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' ',
      );
  pu.push('scrollEnd');
  function pn(t, n) {
    hp.set(t, n), _i(n, [t]);
  }
  var Zr =
      typeof reportError == 'function'
        ? reportError
        : function (t) {
            if (
              typeof window == 'object' &&
              typeof window.ErrorEvent == 'function'
            ) {
              var n = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == 'object' &&
                  t !== null &&
                  typeof t.message == 'string'
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(n)) return;
            } else if (
              typeof process == 'object' &&
              typeof process.emit == 'function'
            ) {
              process.emit('uncaughtException', t);
              return;
            }
            console.error(t);
          },
    en = [],
    Sl = 0,
    mu = 0;
  function Jr() {
    for (var t = Sl, n = (mu = Sl = 0); n < t; ) {
      var a = en[n];
      en[n++] = null;
      var s = en[n];
      en[n++] = null;
      var f = en[n];
      en[n++] = null;
      var d = en[n];
      if (((en[n++] = null), s !== null && f !== null)) {
        var v = s.pending;
        v === null ? (f.next = f) : ((f.next = v.next), (v.next = f)),
          (s.pending = f);
      }
      d !== 0 && dp(a, f, d);
    }
  }
  function $r(t, n, a, s) {
    (en[Sl++] = t),
      (en[Sl++] = n),
      (en[Sl++] = a),
      (en[Sl++] = s),
      (mu |= s),
      (t.lanes |= s),
      (t = t.alternate),
      t !== null && (t.lanes |= s);
  }
  function gu(t, n, a, s) {
    return $r(t, n, a, s), Wr(t);
  }
  function Bi(t, n) {
    return $r(t, null, null, n), Wr(t);
  }
  function dp(t, n, a) {
    t.lanes |= a;
    var s = t.alternate;
    s !== null && (s.lanes |= a);
    for (var f = !1, d = t.return; d !== null; )
      (d.childLanes |= a),
        (s = d.alternate),
        s !== null && (s.childLanes |= a),
        d.tag === 22 &&
          ((t = d.stateNode), t === null || t._visibility & 1 || (f = !0)),
        (t = d),
        (d = d.return);
    return t.tag === 3
      ? ((d = t.stateNode),
        f &&
          n !== null &&
          ((f = 31 - Pt(a)),
          (t = d.hiddenUpdates),
          (s = t[f]),
          s === null ? (t[f] = [n]) : s.push(n),
          (n.lane = a | 536870912)),
        d)
      : null;
  }
  function Wr(t) {
    if (50 < Ia) throw ((Ia = 0), (Ec = null), Error(r(185)));
    for (var n = t.return; n !== null; ) (t = n), (n = t.return);
    return t.tag === 3 ? t.stateNode : null;
  }
  var Tl = {};
  function xS(t, n, a, s) {
    (this.tag = t),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = n),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = s),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function Ge(t, n, a, s) {
    return new xS(t, n, a, s);
  }
  function yu(t) {
    return (t = t.prototype), !(!t || !t.isReactComponent);
  }
  function Bn(t, n) {
    var a = t.alternate;
    return (
      a === null
        ? ((a = Ge(t.tag, n, t.key, t.mode)),
          (a.elementType = t.elementType),
          (a.type = t.type),
          (a.stateNode = t.stateNode),
          (a.alternate = t),
          (t.alternate = a))
        : ((a.pendingProps = n),
          (a.type = t.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = t.flags & 65011712),
      (a.childLanes = t.childLanes),
      (a.lanes = t.lanes),
      (a.child = t.child),
      (a.memoizedProps = t.memoizedProps),
      (a.memoizedState = t.memoizedState),
      (a.updateQueue = t.updateQueue),
      (n = t.dependencies),
      (a.dependencies =
        n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }),
      (a.sibling = t.sibling),
      (a.index = t.index),
      (a.ref = t.ref),
      (a.refCleanup = t.refCleanup),
      a
    );
  }
  function pp(t, n) {
    t.flags &= 65011714;
    var a = t.alternate;
    return (
      a === null
        ? ((t.childLanes = 0),
          (t.lanes = n),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = a.childLanes),
          (t.lanes = a.lanes),
          (t.child = a.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = a.memoizedProps),
          (t.memoizedState = a.memoizedState),
          (t.updateQueue = a.updateQueue),
          (t.type = a.type),
          (n = a.dependencies),
          (t.dependencies =
            n === null
              ? null
              : { lanes: n.lanes, firstContext: n.firstContext })),
      t
    );
  }
  function ts(t, n, a, s, f, d) {
    var v = 0;
    if (((s = t), typeof t == 'function')) yu(t) && (v = 1);
    else if (typeof t == 'string')
      v = wT(t, a, at.current)
        ? 26
        : t === 'html' || t === 'head' || t === 'body'
          ? 27
          : 5;
    else
      t: switch (t) {
        case it:
          return (t = Ge(31, a, n, f)), (t.elementType = it), (t.lanes = d), t;
        case M:
          return Vi(a.children, f, d, n);
        case D:
          (v = 8), (f |= 24);
          break;
        case E:
          return (
            (t = Ge(12, a, n, f | 2)), (t.elementType = E), (t.lanes = d), t
          );
        case Q:
          return (t = Ge(13, a, n, f)), (t.elementType = Q), (t.lanes = d), t;
        case V:
          return (t = Ge(19, a, n, f)), (t.elementType = V), (t.lanes = d), t;
        default:
          if (typeof t == 'object' && t !== null)
            switch (t.$$typeof) {
              case R:
                v = 10;
                break t;
              case L:
                v = 9;
                break t;
              case Y:
                v = 11;
                break t;
              case K:
                v = 14;
                break t;
              case $:
                (v = 16), (s = null);
                break t;
            }
          (v = 29),
            (a = Error(r(130, t === null ? 'null' : typeof t, ''))),
            (s = null);
      }
    return (
      (n = Ge(v, a, n, f)), (n.elementType = t), (n.type = s), (n.lanes = d), n
    );
  }
  function Vi(t, n, a, s) {
    return (t = Ge(7, t, s, n)), (t.lanes = a), t;
  }
  function vu(t, n, a) {
    return (t = Ge(6, t, null, n)), (t.lanes = a), t;
  }
  function mp(t) {
    var n = Ge(18, null, null, 0);
    return (n.stateNode = t), n;
  }
  function xu(t, n, a) {
    return (
      (n = Ge(4, t.children !== null ? t.children : [], t.key, n)),
      (n.lanes = a),
      (n.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      n
    );
  }
  var gp = new WeakMap();
  function nn(t, n) {
    if (typeof t == 'object' && t !== null) {
      var a = gp.get(t);
      return a !== void 0
        ? a
        : ((n = { value: t, source: n, stack: Lr(n) }), gp.set(t, n), n);
    }
    return { value: t, source: n, stack: Lr(n) };
  }
  var Al = [],
    wl = 0,
    es = null,
    Ea = 0,
    ln = [],
    an = 0,
    ni = null,
    Sn = 1,
    Tn = '';
  function Vn(t, n) {
    (Al[wl++] = Ea), (Al[wl++] = es), (es = t), (Ea = n);
  }
  function yp(t, n, a) {
    (ln[an++] = Sn), (ln[an++] = Tn), (ln[an++] = ni), (ni = t);
    var s = Sn;
    t = Tn;
    var f = 32 - Pt(s) - 1;
    (s &= ~(1 << f)), (a += 1);
    var d = 32 - Pt(n) + f;
    if (30 < d) {
      var v = f - (f % 5);
      (d = (s & ((1 << v) - 1)).toString(32)),
        (s >>= v),
        (f -= v),
        (Sn = (1 << (32 - Pt(n) + f)) | (a << f) | s),
        (Tn = d + t);
    } else (Sn = (1 << d) | (a << f) | s), (Tn = t);
  }
  function bu(t) {
    t.return !== null && (Vn(t, 1), yp(t, 1, 0));
  }
  function Su(t) {
    for (; t === es; )
      (es = Al[--wl]), (Al[wl] = null), (Ea = Al[--wl]), (Al[wl] = null);
    for (; t === ni; )
      (ni = ln[--an]),
        (ln[an] = null),
        (Tn = ln[--an]),
        (ln[an] = null),
        (Sn = ln[--an]),
        (ln[an] = null);
  }
  function vp(t, n) {
    (ln[an++] = Sn),
      (ln[an++] = Tn),
      (ln[an++] = ni),
      (Sn = n.id),
      (Tn = n.overflow),
      (ni = t);
  }
  var ge = null,
    Xt = null,
    zt = !1,
    ii = null,
    rn = !1,
    Tu = Error(r(519));
  function li(t) {
    var n = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? 'text'
          : 'HTML',
        '',
      ),
    );
    throw (ka(nn(n, t)), Tu);
  }
  function xp(t) {
    var n = t.stateNode,
      a = t.type,
      s = t.memoizedProps;
    switch (((n[me] = t), (n[Re] = s), a)) {
      case 'dialog':
        Et('cancel', n), Et('close', n);
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        Et('load', n);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < Qa.length; a++) Et(Qa[a], n);
        break;
      case 'source':
        Et('error', n);
        break;
      case 'img':
      case 'image':
      case 'link':
        Et('error', n), Et('load', n);
        break;
      case 'details':
        Et('toggle', n);
        break;
      case 'input':
        Et('invalid', n),
          Rd(
            n,
            s.value,
            s.defaultValue,
            s.checked,
            s.defaultChecked,
            s.type,
            s.name,
            !0,
          );
        break;
      case 'select':
        Et('invalid', n);
        break;
      case 'textarea':
        Et('invalid', n), Nd(n, s.value, s.defaultValue, s.children);
    }
    (a = s.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      n.textContent === '' + a ||
      s.suppressHydrationWarning === !0 ||
      jg(n.textContent, a)
        ? (s.popover != null && (Et('beforetoggle', n), Et('toggle', n)),
          s.onScroll != null && Et('scroll', n),
          s.onScrollEnd != null && Et('scrollend', n),
          s.onClick != null && (n.onclick = Ln),
          (n = !0))
        : (n = !1),
      n || li(t, !0);
  }
  function bp(t) {
    for (ge = t.return; ge; )
      switch (ge.tag) {
        case 5:
        case 31:
        case 13:
          rn = !1;
          return;
        case 27:
        case 3:
          rn = !0;
          return;
        default:
          ge = ge.return;
      }
  }
  function El(t) {
    if (t !== ge) return !1;
    if (!zt) return bp(t), (zt = !0), !1;
    var n = t.tag,
      a;
    if (
      ((a = n !== 3 && n !== 27) &&
        ((a = n === 5) &&
          ((a = t.type),
          (a =
            !(a !== 'form' && a !== 'button') || Hc(t.type, t.memoizedProps))),
        (a = !a)),
      a && Xt && li(t),
      bp(t),
      n === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(r(317));
      Xt = Fg(t);
    } else if (n === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(r(317));
      Xt = Fg(t);
    } else
      n === 27
        ? ((n = Xt), vi(t.type) ? ((t = Fc), (Fc = null), (Xt = t)) : (Xt = n))
        : (Xt = ge ? on(t.stateNode.nextSibling) : null);
    return !0;
  }
  function Ui() {
    (Xt = ge = null), (zt = !1);
  }
  function Au() {
    var t = ii;
    return (
      t !== null &&
        (Be === null ? (Be = t) : Be.push.apply(Be, t), (ii = null)),
      t
    );
  }
  function ka(t) {
    ii === null ? (ii = [t]) : ii.push(t);
  }
  var wu = C(null),
    Hi = null,
    Un = null;
  function ai(t, n, a) {
    A(wu, n._currentValue), (n._currentValue = a);
  }
  function Hn(t) {
    (t._currentValue = wu.current), G(wu);
  }
  function Eu(t, n, a) {
    for (; t !== null; ) {
      var s = t.alternate;
      if (
        ((t.childLanes & n) !== n
          ? ((t.childLanes |= n), s !== null && (s.childLanes |= n))
          : s !== null && (s.childLanes & n) !== n && (s.childLanes |= n),
        t === a)
      )
        break;
      t = t.return;
    }
  }
  function ku(t, n, a, s) {
    var f = t.child;
    for (f !== null && (f.return = t); f !== null; ) {
      var d = f.dependencies;
      if (d !== null) {
        var v = f.child;
        d = d.firstContext;
        t: for (; d !== null; ) {
          var S = d;
          d = f;
          for (var k = 0; k < n.length; k++)
            if (S.context === n[k]) {
              (d.lanes |= a),
                (S = d.alternate),
                S !== null && (S.lanes |= a),
                Eu(d.return, a, t),
                s || (v = null);
              break t;
            }
          d = S.next;
        }
      } else if (f.tag === 18) {
        if (((v = f.return), v === null)) throw Error(r(341));
        (v.lanes |= a),
          (d = v.alternate),
          d !== null && (d.lanes |= a),
          Eu(v, a, t),
          (v = null);
      } else v = f.child;
      if (v !== null) v.return = f;
      else
        for (v = f; v !== null; ) {
          if (v === t) {
            v = null;
            break;
          }
          if (((f = v.sibling), f !== null)) {
            (f.return = v.return), (v = f);
            break;
          }
          v = v.return;
        }
      f = v;
    }
  }
  function kl(t, n, a, s) {
    t = null;
    for (var f = n, d = !1; f !== null; ) {
      if (!d) {
        if ((f.flags & 524288) !== 0) d = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var v = f.alternate;
        if (v === null) throw Error(r(387));
        if (((v = v.memoizedProps), v !== null)) {
          var S = f.type;
          Pe(f.pendingProps.value, v.value) ||
            (t !== null ? t.push(S) : (t = [S]));
        }
      } else if (f === Ct.current) {
        if (((v = f.alternate), v === null)) throw Error(r(387));
        v.memoizedState.memoizedState !== f.memoizedState.memoizedState &&
          (t !== null ? t.push(Wa) : (t = [Wa]));
      }
      f = f.return;
    }
    t !== null && ku(n, t, a, s), (n.flags |= 262144);
  }
  function ns(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Pe(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function qi(t) {
    (Hi = t),
      (Un = null),
      (t = t.dependencies),
      t !== null && (t.firstContext = null);
  }
  function ye(t) {
    return Sp(Hi, t);
  }
  function is(t, n) {
    return Hi === null && qi(t), Sp(t, n);
  }
  function Sp(t, n) {
    var a = n._currentValue;
    if (((n = { context: n, memoizedValue: a, next: null }), Un === null)) {
      if (t === null) throw Error(r(308));
      (Un = n),
        (t.dependencies = { lanes: 0, firstContext: n }),
        (t.flags |= 524288);
    } else Un = Un.next = n;
    return a;
  }
  var bS =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var t = [],
              n = (this.signal = {
                aborted: !1,
                addEventListener: function (a, s) {
                  t.push(s);
                },
              });
            this.abort = function () {
              (n.aborted = !0),
                t.forEach(function (a) {
                  return a();
                });
            };
          },
    SS = e.unstable_scheduleCallback,
    TS = e.unstable_NormalPriority,
    le = {
      $$typeof: R,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Cu() {
    return { controller: new bS(), data: new Map(), refCount: 0 };
  }
  function Ca(t) {
    t.refCount--,
      t.refCount === 0 &&
        SS(TS, function () {
          t.controller.abort();
        });
  }
  var Ma = null,
    Mu = 0,
    Cl = 0,
    Ml = null;
  function AS(t, n) {
    if (Ma === null) {
      var a = (Ma = []);
      (Mu = 0),
        (Cl = Oc()),
        (Ml = {
          status: 'pending',
          value: void 0,
          then: function (s) {
            a.push(s);
          },
        });
    }
    return Mu++, n.then(Tp, Tp), n;
  }
  function Tp() {
    if (--Mu === 0 && Ma !== null) {
      Ml !== null && (Ml.status = 'fulfilled');
      var t = Ma;
      (Ma = null), (Cl = 0), (Ml = null);
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function wS(t, n) {
    var a = [],
      s = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (f) {
          a.push(f);
        },
      };
    return (
      t.then(
        function () {
          (s.status = 'fulfilled'), (s.value = n);
          for (var f = 0; f < a.length; f++) (0, a[f])(n);
        },
        function (f) {
          for (s.status = 'rejected', s.reason = f, f = 0; f < a.length; f++)
            (0, a[f])(void 0);
        },
      ),
      s
    );
  }
  var Ap = N.S;
  N.S = function (t, n) {
    (rg = Ee()),
      typeof n == 'object' &&
        n !== null &&
        typeof n.then == 'function' &&
        AS(t, n),
      Ap !== null && Ap(t, n);
  };
  var Pi = C(null);
  function Du() {
    var t = Pi.current;
    return t !== null ? t : Gt.pooledCache;
  }
  function ls(t, n) {
    n === null ? A(Pi, Pi.current) : A(Pi, n.pool);
  }
  function wp() {
    var t = Du();
    return t === null ? null : { parent: le._currentValue, pool: t };
  }
  var Dl = Error(r(460)),
    zu = Error(r(474)),
    as = Error(r(542)),
    rs = { then: function () {} };
  function Ep(t) {
    return (t = t.status), t === 'fulfilled' || t === 'rejected';
  }
  function kp(t, n, a) {
    switch (
      ((a = t[a]),
      a === void 0 ? t.push(n) : a !== n && (n.then(Ln, Ln), (n = a)),
      n.status)
    ) {
      case 'fulfilled':
        return n.value;
      case 'rejected':
        throw ((t = n.reason), Mp(t), t);
      default:
        if (typeof n.status == 'string') n.then(Ln, Ln);
        else {
          if (((t = Gt), t !== null && 100 < t.shellSuspendCounter))
            throw Error(r(482));
          (t = n),
            (t.status = 'pending'),
            t.then(
              function (s) {
                if (n.status === 'pending') {
                  var f = n;
                  (f.status = 'fulfilled'), (f.value = s);
                }
              },
              function (s) {
                if (n.status === 'pending') {
                  var f = n;
                  (f.status = 'rejected'), (f.reason = s);
                }
              },
            );
        }
        switch (n.status) {
          case 'fulfilled':
            return n.value;
          case 'rejected':
            throw ((t = n.reason), Mp(t), t);
        }
        throw ((Yi = n), Dl);
    }
  }
  function Gi(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function'
        ? ((Yi = a), Dl)
        : a;
    }
  }
  var Yi = null;
  function Cp() {
    if (Yi === null) throw Error(r(459));
    var t = Yi;
    return (Yi = null), t;
  }
  function Mp(t) {
    if (t === Dl || t === as) throw Error(r(483));
  }
  var zl = null,
    Da = 0;
  function ss(t) {
    var n = Da;
    return (Da += 1), zl === null && (zl = []), kp(zl, t, n);
  }
  function za(t, n) {
    (n = n.props.ref), (t.ref = n !== void 0 ? n : null);
  }
  function os(t, n) {
    throw n.$$typeof === x
      ? Error(r(525))
      : ((t = Object.prototype.toString.call(n)),
        Error(
          r(
            31,
            t === '[object Object]'
              ? 'object with keys {' + Object.keys(n).join(', ') + '}'
              : t,
          ),
        ));
  }
  function Dp(t) {
    function n(_, z) {
      if (t) {
        var j = _.deletions;
        j === null ? ((_.deletions = [z]), (_.flags |= 16)) : j.push(z);
      }
    }
    function a(_, z) {
      if (!t) return null;
      for (; z !== null; ) n(_, z), (z = z.sibling);
      return null;
    }
    function s(_) {
      for (var z = new Map(); _ !== null; )
        _.key !== null ? z.set(_.key, _) : z.set(_.index, _), (_ = _.sibling);
      return z;
    }
    function f(_, z) {
      return (_ = Bn(_, z)), (_.index = 0), (_.sibling = null), _;
    }
    function d(_, z, j) {
      return (
        (_.index = j),
        t
          ? ((j = _.alternate),
            j !== null
              ? ((j = j.index), j < z ? ((_.flags |= 67108866), z) : j)
              : ((_.flags |= 67108866), z))
          : ((_.flags |= 1048576), z)
      );
    }
    function v(_) {
      return t && _.alternate === null && (_.flags |= 67108866), _;
    }
    function S(_, z, j, I) {
      return z === null || z.tag !== 6
        ? ((z = vu(j, _.mode, I)), (z.return = _), z)
        : ((z = f(z, j)), (z.return = _), z);
    }
    function k(_, z, j, I) {
      var ht = j.type;
      return ht === M
        ? P(_, z, j.props.children, I, j.key)
        : z !== null &&
            (z.elementType === ht ||
              (typeof ht == 'object' &&
                ht !== null &&
                ht.$$typeof === $ &&
                Gi(ht) === z.type))
          ? ((z = f(z, j.props)), za(z, j), (z.return = _), z)
          : ((z = ts(j.type, j.key, j.props, null, _.mode, I)),
            za(z, j),
            (z.return = _),
            z);
    }
    function B(_, z, j, I) {
      return z === null ||
        z.tag !== 4 ||
        z.stateNode.containerInfo !== j.containerInfo ||
        z.stateNode.implementation !== j.implementation
        ? ((z = xu(j, _.mode, I)), (z.return = _), z)
        : ((z = f(z, j.children || [])), (z.return = _), z);
    }
    function P(_, z, j, I, ht) {
      return z === null || z.tag !== 7
        ? ((z = Vi(j, _.mode, I, ht)), (z.return = _), z)
        : ((z = f(z, j)), (z.return = _), z);
    }
    function X(_, z, j) {
      if (
        (typeof z == 'string' && z !== '') ||
        typeof z == 'number' ||
        typeof z == 'bigint'
      )
        return (z = vu('' + z, _.mode, j)), (z.return = _), z;
      if (typeof z == 'object' && z !== null) {
        switch (z.$$typeof) {
          case b:
            return (
              (j = ts(z.type, z.key, z.props, null, _.mode, j)),
              za(j, z),
              (j.return = _),
              j
            );
          case T:
            return (z = xu(z, _.mode, j)), (z.return = _), z;
          case $:
            return (z = Gi(z)), X(_, z, j);
        }
        if (W(z) || et(z))
          return (z = Vi(z, _.mode, j, null)), (z.return = _), z;
        if (typeof z.then == 'function') return X(_, ss(z), j);
        if (z.$$typeof === R) return X(_, is(_, z), j);
        os(_, z);
      }
      return null;
    }
    function U(_, z, j, I) {
      var ht = z !== null ? z.key : null;
      if (
        (typeof j == 'string' && j !== '') ||
        typeof j == 'number' ||
        typeof j == 'bigint'
      )
        return ht !== null ? null : S(_, z, '' + j, I);
      if (typeof j == 'object' && j !== null) {
        switch (j.$$typeof) {
          case b:
            return j.key === ht ? k(_, z, j, I) : null;
          case T:
            return j.key === ht ? B(_, z, j, I) : null;
          case $:
            return (j = Gi(j)), U(_, z, j, I);
        }
        if (W(j) || et(j)) return ht !== null ? null : P(_, z, j, I, null);
        if (typeof j.then == 'function') return U(_, z, ss(j), I);
        if (j.$$typeof === R) return U(_, z, is(_, j), I);
        os(_, j);
      }
      return null;
    }
    function q(_, z, j, I, ht) {
      if (
        (typeof I == 'string' && I !== '') ||
        typeof I == 'number' ||
        typeof I == 'bigint'
      )
        return (_ = _.get(j) || null), S(z, _, '' + I, ht);
      if (typeof I == 'object' && I !== null) {
        switch (I.$$typeof) {
          case b:
            return (
              (_ = _.get(I.key === null ? j : I.key) || null), k(z, _, I, ht)
            );
          case T:
            return (
              (_ = _.get(I.key === null ? j : I.key) || null), B(z, _, I, ht)
            );
          case $:
            return (I = Gi(I)), q(_, z, j, I, ht);
        }
        if (W(I) || et(I)) return (_ = _.get(j) || null), P(z, _, I, ht, null);
        if (typeof I.then == 'function') return q(_, z, j, ss(I), ht);
        if (I.$$typeof === R) return q(_, z, j, is(z, I), ht);
        os(z, I);
      }
      return null;
    }
    function ot(_, z, j, I) {
      for (
        var ht = null, Rt = null, ct = z, St = (z = 0), Dt = null;
        ct !== null && St < j.length;
        St++
      ) {
        ct.index > St ? ((Dt = ct), (ct = null)) : (Dt = ct.sibling);
        var _t = U(_, ct, j[St], I);
        if (_t === null) {
          ct === null && (ct = Dt);
          break;
        }
        t && ct && _t.alternate === null && n(_, ct),
          (z = d(_t, z, St)),
          Rt === null ? (ht = _t) : (Rt.sibling = _t),
          (Rt = _t),
          (ct = Dt);
      }
      if (St === j.length) return a(_, ct), zt && Vn(_, St), ht;
      if (ct === null) {
        for (; St < j.length; St++)
          (ct = X(_, j[St], I)),
            ct !== null &&
              ((z = d(ct, z, St)),
              Rt === null ? (ht = ct) : (Rt.sibling = ct),
              (Rt = ct));
        return zt && Vn(_, St), ht;
      }
      for (ct = s(ct); St < j.length; St++)
        (Dt = q(ct, _, St, j[St], I)),
          Dt !== null &&
            (t &&
              Dt.alternate !== null &&
              ct.delete(Dt.key === null ? St : Dt.key),
            (z = d(Dt, z, St)),
            Rt === null ? (ht = Dt) : (Rt.sibling = Dt),
            (Rt = Dt));
      return (
        t &&
          ct.forEach(function (Ai) {
            return n(_, Ai);
          }),
        zt && Vn(_, St),
        ht
      );
    }
    function mt(_, z, j, I) {
      if (j == null) throw Error(r(151));
      for (
        var ht = null,
          Rt = null,
          ct = z,
          St = (z = 0),
          Dt = null,
          _t = j.next();
        ct !== null && !_t.done;
        St++, _t = j.next()
      ) {
        ct.index > St ? ((Dt = ct), (ct = null)) : (Dt = ct.sibling);
        var Ai = U(_, ct, _t.value, I);
        if (Ai === null) {
          ct === null && (ct = Dt);
          break;
        }
        t && ct && Ai.alternate === null && n(_, ct),
          (z = d(Ai, z, St)),
          Rt === null ? (ht = Ai) : (Rt.sibling = Ai),
          (Rt = Ai),
          (ct = Dt);
      }
      if (_t.done) return a(_, ct), zt && Vn(_, St), ht;
      if (ct === null) {
        for (; !_t.done; St++, _t = j.next())
          (_t = X(_, _t.value, I)),
            _t !== null &&
              ((z = d(_t, z, St)),
              Rt === null ? (ht = _t) : (Rt.sibling = _t),
              (Rt = _t));
        return zt && Vn(_, St), ht;
      }
      for (ct = s(ct); !_t.done; St++, _t = j.next())
        (_t = q(ct, _, St, _t.value, I)),
          _t !== null &&
            (t &&
              _t.alternate !== null &&
              ct.delete(_t.key === null ? St : _t.key),
            (z = d(_t, z, St)),
            Rt === null ? (ht = _t) : (Rt.sibling = _t),
            (Rt = _t));
      return (
        t &&
          ct.forEach(function (LT) {
            return n(_, LT);
          }),
        zt && Vn(_, St),
        ht
      );
    }
    function qt(_, z, j, I) {
      if (
        (typeof j == 'object' &&
          j !== null &&
          j.type === M &&
          j.key === null &&
          (j = j.props.children),
        typeof j == 'object' && j !== null)
      ) {
        switch (j.$$typeof) {
          case b:
            t: {
              for (var ht = j.key; z !== null; ) {
                if (z.key === ht) {
                  if (((ht = j.type), ht === M)) {
                    if (z.tag === 7) {
                      a(_, z.sibling),
                        (I = f(z, j.props.children)),
                        (I.return = _),
                        (_ = I);
                      break t;
                    }
                  } else if (
                    z.elementType === ht ||
                    (typeof ht == 'object' &&
                      ht !== null &&
                      ht.$$typeof === $ &&
                      Gi(ht) === z.type)
                  ) {
                    a(_, z.sibling),
                      (I = f(z, j.props)),
                      za(I, j),
                      (I.return = _),
                      (_ = I);
                    break t;
                  }
                  a(_, z);
                  break;
                } else n(_, z);
                z = z.sibling;
              }
              j.type === M
                ? ((I = Vi(j.props.children, _.mode, I, j.key)),
                  (I.return = _),
                  (_ = I))
                : ((I = ts(j.type, j.key, j.props, null, _.mode, I)),
                  za(I, j),
                  (I.return = _),
                  (_ = I));
            }
            return v(_);
          case T:
            t: {
              for (ht = j.key; z !== null; ) {
                if (z.key === ht)
                  if (
                    z.tag === 4 &&
                    z.stateNode.containerInfo === j.containerInfo &&
                    z.stateNode.implementation === j.implementation
                  ) {
                    a(_, z.sibling),
                      (I = f(z, j.children || [])),
                      (I.return = _),
                      (_ = I);
                    break t;
                  } else {
                    a(_, z);
                    break;
                  }
                else n(_, z);
                z = z.sibling;
              }
              (I = xu(j, _.mode, I)), (I.return = _), (_ = I);
            }
            return v(_);
          case $:
            return (j = Gi(j)), qt(_, z, j, I);
        }
        if (W(j)) return ot(_, z, j, I);
        if (et(j)) {
          if (((ht = et(j)), typeof ht != 'function')) throw Error(r(150));
          return (j = ht.call(j)), mt(_, z, j, I);
        }
        if (typeof j.then == 'function') return qt(_, z, ss(j), I);
        if (j.$$typeof === R) return qt(_, z, is(_, j), I);
        os(_, j);
      }
      return (typeof j == 'string' && j !== '') ||
        typeof j == 'number' ||
        typeof j == 'bigint'
        ? ((j = '' + j),
          z !== null && z.tag === 6
            ? (a(_, z.sibling), (I = f(z, j)), (I.return = _), (_ = I))
            : (a(_, z), (I = vu(j, _.mode, I)), (I.return = _), (_ = I)),
          v(_))
        : a(_, z);
    }
    return function (_, z, j, I) {
      try {
        Da = 0;
        var ht = qt(_, z, j, I);
        return (zl = null), ht;
      } catch (ct) {
        if (ct === Dl || ct === as) throw ct;
        var Rt = Ge(29, ct, null, _.mode);
        return (Rt.lanes = I), (Rt.return = _), Rt;
      } finally {
      }
    };
  }
  var Fi = Dp(!0),
    zp = Dp(!1),
    ri = !1;
  function Ou(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Ru(t, n) {
    (t = t.updateQueue),
      n.updateQueue === t &&
        (n.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        });
  }
  function si(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function oi(t, n, a) {
    var s = t.updateQueue;
    if (s === null) return null;
    if (((s = s.shared), (Nt & 2) !== 0)) {
      var f = s.pending;
      return (
        f === null ? (n.next = n) : ((n.next = f.next), (f.next = n)),
        (s.pending = n),
        (n = Wr(t)),
        dp(t, null, a),
        n
      );
    }
    return $r(t, s, n, a), Wr(t);
  }
  function Oa(t, n, a) {
    if (
      ((n = n.updateQueue), n !== null && ((n = n.shared), (a & 4194048) !== 0))
    ) {
      var s = n.lanes;
      (s &= t.pendingLanes), (a |= s), (n.lanes = a), Sd(t, a);
    }
  }
  function _u(t, n) {
    var a = t.updateQueue,
      s = t.alternate;
    if (s !== null && ((s = s.updateQueue), a === s)) {
      var f = null,
        d = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var v = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null,
          };
          d === null ? (f = d = v) : (d = d.next = v), (a = a.next);
        } while (a !== null);
        d === null ? (f = d = n) : (d = d.next = n);
      } else f = d = n;
      (a = {
        baseState: s.baseState,
        firstBaseUpdate: f,
        lastBaseUpdate: d,
        shared: s.shared,
        callbacks: s.callbacks,
      }),
        (t.updateQueue = a);
      return;
    }
    (t = a.lastBaseUpdate),
      t === null ? (a.firstBaseUpdate = n) : (t.next = n),
      (a.lastBaseUpdate = n);
  }
  var Nu = !1;
  function Ra() {
    if (Nu) {
      var t = Ml;
      if (t !== null) throw t;
    }
  }
  function _a(t, n, a, s) {
    Nu = !1;
    var f = t.updateQueue;
    ri = !1;
    var d = f.firstBaseUpdate,
      v = f.lastBaseUpdate,
      S = f.shared.pending;
    if (S !== null) {
      f.shared.pending = null;
      var k = S,
        B = k.next;
      (k.next = null), v === null ? (d = B) : (v.next = B), (v = k);
      var P = t.alternate;
      P !== null &&
        ((P = P.updateQueue),
        (S = P.lastBaseUpdate),
        S !== v &&
          (S === null ? (P.firstBaseUpdate = B) : (S.next = B),
          (P.lastBaseUpdate = k)));
    }
    if (d !== null) {
      var X = f.baseState;
      (v = 0), (P = B = k = null), (S = d);
      do {
        var U = S.lane & -536870913,
          q = U !== S.lane;
        if (q ? (Mt & U) === U : (s & U) === U) {
          U !== 0 && U === Cl && (Nu = !0),
            P !== null &&
              (P = P.next =
                {
                  lane: 0,
                  tag: S.tag,
                  payload: S.payload,
                  callback: null,
                  next: null,
                });
          t: {
            var ot = t,
              mt = S;
            U = n;
            var qt = a;
            switch (mt.tag) {
              case 1:
                if (((ot = mt.payload), typeof ot == 'function')) {
                  X = ot.call(qt, X, U);
                  break t;
                }
                X = ot;
                break t;
              case 3:
                ot.flags = (ot.flags & -65537) | 128;
              case 0:
                if (
                  ((ot = mt.payload),
                  (U = typeof ot == 'function' ? ot.call(qt, X, U) : ot),
                  U == null)
                )
                  break t;
                X = y({}, X, U);
                break t;
              case 2:
                ri = !0;
            }
          }
          (U = S.callback),
            U !== null &&
              ((t.flags |= 64),
              q && (t.flags |= 8192),
              (q = f.callbacks),
              q === null ? (f.callbacks = [U]) : q.push(U));
        } else
          (q = {
            lane: U,
            tag: S.tag,
            payload: S.payload,
            callback: S.callback,
            next: null,
          }),
            P === null ? ((B = P = q), (k = X)) : (P = P.next = q),
            (v |= U);
        if (((S = S.next), S === null)) {
          if (((S = f.shared.pending), S === null)) break;
          (q = S),
            (S = q.next),
            (q.next = null),
            (f.lastBaseUpdate = q),
            (f.shared.pending = null);
        }
      } while (!0);
      P === null && (k = X),
        (f.baseState = k),
        (f.firstBaseUpdate = B),
        (f.lastBaseUpdate = P),
        d === null && (f.shared.lanes = 0),
        (di |= v),
        (t.lanes = v),
        (t.memoizedState = X);
    }
  }
  function Op(t, n) {
    if (typeof t != 'function') throw Error(r(191, t));
    t.call(n);
  }
  function Rp(t, n) {
    var a = t.callbacks;
    if (a !== null)
      for (t.callbacks = null, t = 0; t < a.length; t++) Op(a[t], n);
  }
  var Ol = C(null),
    us = C(0);
  function _p(t, n) {
    (t = Kn), A(us, t), A(Ol, n), (Kn = t | n.baseLanes);
  }
  function Lu() {
    A(us, Kn), A(Ol, Ol.current);
  }
  function ju() {
    (Kn = us.current), G(Ol), G(us);
  }
  var Ye = C(null),
    sn = null;
  function ui(t) {
    var n = t.alternate;
    A(ee, ee.current & 1),
      A(Ye, t),
      sn === null &&
        (n === null || Ol.current !== null || n.memoizedState !== null) &&
        (sn = t);
  }
  function Bu(t) {
    A(ee, ee.current), A(Ye, t), sn === null && (sn = t);
  }
  function Np(t) {
    t.tag === 22
      ? (A(ee, ee.current), A(Ye, t), sn === null && (sn = t))
      : ci();
  }
  function ci() {
    A(ee, ee.current), A(Ye, Ye.current);
  }
  function Fe(t) {
    G(Ye), sn === t && (sn = null), G(ee);
  }
  var ee = C(0);
  function cs(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var a = n.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || Gc(a) || Yc(a)))
          return n;
      } else if (
        n.tag === 19 &&
        (n.memoizedProps.revealOrder === 'forwards' ||
          n.memoizedProps.revealOrder === 'backwards' ||
          n.memoizedProps.revealOrder === 'unstable_legacy-backwards' ||
          n.memoizedProps.revealOrder === 'together')
      ) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        (n.child.return = n), (n = n.child);
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return null;
        n = n.return;
      }
      (n.sibling.return = n.return), (n = n.sibling);
    }
    return null;
  }
  var qn = 0,
    bt = null,
    Ut = null,
    ae = null,
    fs = !1,
    Rl = !1,
    Ii = !1,
    hs = 0,
    Na = 0,
    _l = null,
    ES = 0;
  function $t() {
    throw Error(r(321));
  }
  function Vu(t, n) {
    if (n === null) return !1;
    for (var a = 0; a < n.length && a < t.length; a++)
      if (!Pe(t[a], n[a])) return !1;
    return !0;
  }
  function Uu(t, n, a, s, f, d) {
    return (
      (qn = d),
      (bt = n),
      (n.memoizedState = null),
      (n.updateQueue = null),
      (n.lanes = 0),
      (N.H = t === null || t.memoizedState === null ? ym : tc),
      (Ii = !1),
      (d = a(s, f)),
      (Ii = !1),
      Rl && (d = jp(n, a, s, f)),
      Lp(t),
      d
    );
  }
  function Lp(t) {
    N.H = Ba;
    var n = Ut !== null && Ut.next !== null;
    if (((qn = 0), (ae = Ut = bt = null), (fs = !1), (Na = 0), (_l = null), n))
      throw Error(r(300));
    t === null ||
      re ||
      ((t = t.dependencies), t !== null && ns(t) && (re = !0));
  }
  function jp(t, n, a, s) {
    bt = t;
    var f = 0;
    do {
      if ((Rl && (_l = null), (Na = 0), (Rl = !1), 25 <= f))
        throw Error(r(301));
      if (((f += 1), (ae = Ut = null), t.updateQueue != null)) {
        var d = t.updateQueue;
        (d.lastEffect = null),
          (d.events = null),
          (d.stores = null),
          d.memoCache != null && (d.memoCache.index = 0);
      }
      (N.H = vm), (d = n(a, s));
    } while (Rl);
    return d;
  }
  function kS() {
    var t = N.H,
      n = t.useState()[0];
    return (
      (n = typeof n.then == 'function' ? La(n) : n),
      (t = t.useState()[0]),
      (Ut !== null ? Ut.memoizedState : null) !== t && (bt.flags |= 1024),
      n
    );
  }
  function Hu() {
    var t = hs !== 0;
    return (hs = 0), t;
  }
  function qu(t, n, a) {
    (n.updateQueue = t.updateQueue), (n.flags &= -2053), (t.lanes &= ~a);
  }
  function Pu(t) {
    if (fs) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), (t = t.next);
      }
      fs = !1;
    }
    (qn = 0), (ae = Ut = bt = null), (Rl = !1), (Na = hs = 0), (_l = null);
  }
  function Ce() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return ae === null ? (bt.memoizedState = ae = t) : (ae = ae.next = t), ae;
  }
  function ne() {
    if (Ut === null) {
      var t = bt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Ut.next;
    var n = ae === null ? bt.memoizedState : ae.next;
    if (n !== null) (ae = n), (Ut = t);
    else {
      if (t === null)
        throw bt.alternate === null ? Error(r(467)) : Error(r(310));
      (Ut = t),
        (t = {
          memoizedState: Ut.memoizedState,
          baseState: Ut.baseState,
          baseQueue: Ut.baseQueue,
          queue: Ut.queue,
          next: null,
        }),
        ae === null ? (bt.memoizedState = ae = t) : (ae = ae.next = t);
    }
    return ae;
  }
  function ds() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function La(t) {
    var n = Na;
    return (
      (Na += 1),
      _l === null && (_l = []),
      (t = kp(_l, t, n)),
      (n = bt),
      (ae === null ? n.memoizedState : ae.next) === null &&
        ((n = n.alternate),
        (N.H = n === null || n.memoizedState === null ? ym : tc)),
      t
    );
  }
  function ps(t) {
    if (t !== null && typeof t == 'object') {
      if (typeof t.then == 'function') return La(t);
      if (t.$$typeof === R) return ye(t);
    }
    throw Error(r(438, String(t)));
  }
  function Gu(t) {
    var n = null,
      a = bt.updateQueue;
    if ((a !== null && (n = a.memoCache), n == null)) {
      var s = bt.alternate;
      s !== null &&
        ((s = s.updateQueue),
        s !== null &&
          ((s = s.memoCache),
          s != null &&
            (n = {
              data: s.data.map(function (f) {
                return f.slice();
              }),
              index: 0,
            })));
    }
    if (
      (n == null && (n = { data: [], index: 0 }),
      a === null && ((a = ds()), (bt.updateQueue = a)),
      (a.memoCache = n),
      (a = n.data[n.index]),
      a === void 0)
    )
      for (a = n.data[n.index] = Array(t), s = 0; s < t; s++) a[s] = O;
    return n.index++, a;
  }
  function Pn(t, n) {
    return typeof n == 'function' ? n(t) : n;
  }
  function ms(t) {
    var n = ne();
    return Yu(n, Ut, t);
  }
  function Yu(t, n, a) {
    var s = t.queue;
    if (s === null) throw Error(r(311));
    s.lastRenderedReducer = a;
    var f = t.baseQueue,
      d = s.pending;
    if (d !== null) {
      if (f !== null) {
        var v = f.next;
        (f.next = d.next), (d.next = v);
      }
      (n.baseQueue = f = d), (s.pending = null);
    }
    if (((d = t.baseState), f === null)) t.memoizedState = d;
    else {
      n = f.next;
      var S = (v = null),
        k = null,
        B = n,
        P = !1;
      do {
        var X = B.lane & -536870913;
        if (X !== B.lane ? (Mt & X) === X : (qn & X) === X) {
          var U = B.revertLane;
          if (U === 0)
            k !== null &&
              (k = k.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: B.action,
                  hasEagerState: B.hasEagerState,
                  eagerState: B.eagerState,
                  next: null,
                }),
              X === Cl && (P = !0);
          else if ((qn & U) === U) {
            (B = B.next), U === Cl && (P = !0);
            continue;
          } else
            (X = {
              lane: 0,
              revertLane: B.revertLane,
              gesture: null,
              action: B.action,
              hasEagerState: B.hasEagerState,
              eagerState: B.eagerState,
              next: null,
            }),
              k === null ? ((S = k = X), (v = d)) : (k = k.next = X),
              (bt.lanes |= U),
              (di |= U);
          (X = B.action),
            Ii && a(d, X),
            (d = B.hasEagerState ? B.eagerState : a(d, X));
        } else
          (U = {
            lane: X,
            revertLane: B.revertLane,
            gesture: B.gesture,
            action: B.action,
            hasEagerState: B.hasEagerState,
            eagerState: B.eagerState,
            next: null,
          }),
            k === null ? ((S = k = U), (v = d)) : (k = k.next = U),
            (bt.lanes |= X),
            (di |= X);
        B = B.next;
      } while (B !== null && B !== n);
      if (
        (k === null ? (v = d) : (k.next = S),
        !Pe(d, t.memoizedState) && ((re = !0), P && ((a = Ml), a !== null)))
      )
        throw a;
      (t.memoizedState = d),
        (t.baseState = v),
        (t.baseQueue = k),
        (s.lastRenderedState = d);
    }
    return f === null && (s.lanes = 0), [t.memoizedState, s.dispatch];
  }
  function Fu(t) {
    var n = ne(),
      a = n.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = t;
    var s = a.dispatch,
      f = a.pending,
      d = n.memoizedState;
    if (f !== null) {
      a.pending = null;
      var v = (f = f.next);
      do (d = t(d, v.action)), (v = v.next);
      while (v !== f);
      Pe(d, n.memoizedState) || (re = !0),
        (n.memoizedState = d),
        n.baseQueue === null && (n.baseState = d),
        (a.lastRenderedState = d);
    }
    return [d, s];
  }
  function Bp(t, n, a) {
    var s = bt,
      f = ne(),
      d = zt;
    if (d) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else a = n();
    var v = !Pe((Ut || f).memoizedState, a);
    if (
      (v && ((f.memoizedState = a), (re = !0)),
      (f = f.queue),
      Qu(Hp.bind(null, s, f, t), [t]),
      f.getSnapshot !== n || v || (ae !== null && ae.memoizedState.tag & 1))
    ) {
      if (
        ((s.flags |= 2048),
        Nl(9, { destroy: void 0 }, Up.bind(null, s, f, a, n), null),
        Gt === null)
      )
        throw Error(r(349));
      d || (qn & 127) !== 0 || Vp(s, n, a);
    }
    return a;
  }
  function Vp(t, n, a) {
    (t.flags |= 16384),
      (t = { getSnapshot: n, value: a }),
      (n = bt.updateQueue),
      n === null
        ? ((n = ds()), (bt.updateQueue = n), (n.stores = [t]))
        : ((a = n.stores), a === null ? (n.stores = [t]) : a.push(t));
  }
  function Up(t, n, a, s) {
    (n.value = a), (n.getSnapshot = s), qp(n) && Pp(t);
  }
  function Hp(t, n, a) {
    return a(function () {
      qp(n) && Pp(t);
    });
  }
  function qp(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var a = n();
      return !Pe(t, a);
    } catch {
      return !0;
    }
  }
  function Pp(t) {
    var n = Bi(t, 2);
    n !== null && Ve(n, t, 2);
  }
  function Iu(t) {
    var n = Ce();
    if (typeof t == 'function') {
      var a = t;
      if (((t = a()), Ii)) {
        Oe(!0);
        try {
          a();
        } finally {
          Oe(!1);
        }
      }
    }
    return (
      (n.memoizedState = n.baseState = t),
      (n.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Pn,
        lastRenderedState: t,
      }),
      n
    );
  }
  function Gp(t, n, a, s) {
    return (t.baseState = a), Yu(t, Ut, typeof s == 'function' ? s : Pn);
  }
  function CS(t, n, a, s, f) {
    if (vs(t)) throw Error(r(485));
    if (((t = n.action), t !== null)) {
      var d = {
        payload: f,
        action: t,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (v) {
          d.listeners.push(v);
        },
      };
      N.T !== null ? a(!0) : (d.isTransition = !1),
        s(d),
        (a = n.pending),
        a === null
          ? ((d.next = n.pending = d), Yp(n, d))
          : ((d.next = a.next), (n.pending = a.next = d));
    }
  }
  function Yp(t, n) {
    var a = n.action,
      s = n.payload,
      f = t.state;
    if (n.isTransition) {
      var d = N.T,
        v = {};
      N.T = v;
      try {
        var S = a(f, s),
          k = N.S;
        k !== null && k(v, S), Fp(t, n, S);
      } catch (B) {
        Xu(t, n, B);
      } finally {
        d !== null && v.types !== null && (d.types = v.types), (N.T = d);
      }
    } else
      try {
        (d = a(f, s)), Fp(t, n, d);
      } catch (B) {
        Xu(t, n, B);
      }
  }
  function Fp(t, n, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (s) {
            Ip(t, n, s);
          },
          function (s) {
            return Xu(t, n, s);
          },
        )
      : Ip(t, n, a);
  }
  function Ip(t, n, a) {
    (n.status = 'fulfilled'),
      (n.value = a),
      Xp(n),
      (t.state = a),
      (n = t.pending),
      n !== null &&
        ((a = n.next),
        a === n ? (t.pending = null) : ((a = a.next), (n.next = a), Yp(t, a)));
  }
  function Xu(t, n, a) {
    var s = t.pending;
    if (((t.pending = null), s !== null)) {
      s = s.next;
      do (n.status = 'rejected'), (n.reason = a), Xp(n), (n = n.next);
      while (n !== s);
    }
    t.action = null;
  }
  function Xp(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function Qp(t, n) {
    return n;
  }
  function Kp(t, n) {
    if (zt) {
      var a = Gt.formState;
      if (a !== null) {
        t: {
          var s = bt;
          if (zt) {
            if (Xt) {
              e: {
                for (var f = Xt, d = rn; f.nodeType !== 8; ) {
                  if (!d) {
                    f = null;
                    break e;
                  }
                  if (((f = on(f.nextSibling)), f === null)) {
                    f = null;
                    break e;
                  }
                }
                (d = f.data), (f = d === 'F!' || d === 'F' ? f : null);
              }
              if (f) {
                (Xt = on(f.nextSibling)), (s = f.data === 'F!');
                break t;
              }
            }
            li(s);
          }
          s = !1;
        }
        s && (n = a[0]);
      }
    }
    return (
      (a = Ce()),
      (a.memoizedState = a.baseState = n),
      (s = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qp,
        lastRenderedState: n,
      }),
      (a.queue = s),
      (a = pm.bind(null, bt, s)),
      (s.dispatch = a),
      (s = Iu(!1)),
      (d = Wu.bind(null, bt, !1, s.queue)),
      (s = Ce()),
      (f = { state: n, dispatch: null, action: t, pending: null }),
      (s.queue = f),
      (a = CS.bind(null, bt, f, d, a)),
      (f.dispatch = a),
      (s.memoizedState = t),
      [n, a, !1]
    );
  }
  function Zp(t) {
    var n = ne();
    return Jp(n, Ut, t);
  }
  function Jp(t, n, a) {
    if (
      ((n = Yu(t, n, Qp)[0]),
      (t = ms(Pn)[0]),
      typeof n == 'object' && n !== null && typeof n.then == 'function')
    )
      try {
        var s = La(n);
      } catch (v) {
        throw v === Dl ? as : v;
      }
    else s = n;
    n = ne();
    var f = n.queue,
      d = f.dispatch;
    return (
      a !== n.memoizedState &&
        ((bt.flags |= 2048),
        Nl(9, { destroy: void 0 }, MS.bind(null, f, a), null)),
      [s, d, t]
    );
  }
  function MS(t, n) {
    t.action = n;
  }
  function $p(t) {
    var n = ne(),
      a = Ut;
    if (a !== null) return Jp(n, a, t);
    ne(), (n = n.memoizedState), (a = ne());
    var s = a.queue.dispatch;
    return (a.memoizedState = t), [n, s, !1];
  }
  function Nl(t, n, a, s) {
    return (
      (t = { tag: t, create: a, deps: s, inst: n, next: null }),
      (n = bt.updateQueue),
      n === null && ((n = ds()), (bt.updateQueue = n)),
      (a = n.lastEffect),
      a === null
        ? (n.lastEffect = t.next = t)
        : ((s = a.next), (a.next = t), (t.next = s), (n.lastEffect = t)),
      t
    );
  }
  function Wp() {
    return ne().memoizedState;
  }
  function gs(t, n, a, s) {
    var f = Ce();
    (bt.flags |= t),
      (f.memoizedState = Nl(
        1 | n,
        { destroy: void 0 },
        a,
        s === void 0 ? null : s,
      ));
  }
  function ys(t, n, a, s) {
    var f = ne();
    s = s === void 0 ? null : s;
    var d = f.memoizedState.inst;
    Ut !== null && s !== null && Vu(s, Ut.memoizedState.deps)
      ? (f.memoizedState = Nl(n, d, a, s))
      : ((bt.flags |= t), (f.memoizedState = Nl(1 | n, d, a, s)));
  }
  function tm(t, n) {
    gs(8390656, 8, t, n);
  }
  function Qu(t, n) {
    ys(2048, 8, t, n);
  }
  function DS(t) {
    bt.flags |= 4;
    var n = bt.updateQueue;
    if (n === null) (n = ds()), (bt.updateQueue = n), (n.events = [t]);
    else {
      var a = n.events;
      a === null ? (n.events = [t]) : a.push(t);
    }
  }
  function em(t) {
    var n = ne().memoizedState;
    return (
      DS({ ref: n, nextImpl: t }),
      function () {
        if ((Nt & 2) !== 0) throw Error(r(440));
        return n.impl.apply(void 0, arguments);
      }
    );
  }
  function nm(t, n) {
    return ys(4, 2, t, n);
  }
  function im(t, n) {
    return ys(4, 4, t, n);
  }
  function lm(t, n) {
    if (typeof n == 'function') {
      t = t();
      var a = n(t);
      return function () {
        typeof a == 'function' ? a() : n(null);
      };
    }
    if (n != null)
      return (
        (t = t()),
        (n.current = t),
        function () {
          n.current = null;
        }
      );
  }
  function am(t, n, a) {
    (a = a != null ? a.concat([t]) : null), ys(4, 4, lm.bind(null, n, t), a);
  }
  function Ku() {}
  function rm(t, n) {
    var a = ne();
    n = n === void 0 ? null : n;
    var s = a.memoizedState;
    return n !== null && Vu(n, s[1]) ? s[0] : ((a.memoizedState = [t, n]), t);
  }
  function sm(t, n) {
    var a = ne();
    n = n === void 0 ? null : n;
    var s = a.memoizedState;
    if (n !== null && Vu(n, s[1])) return s[0];
    if (((s = t()), Ii)) {
      Oe(!0);
      try {
        t();
      } finally {
        Oe(!1);
      }
    }
    return (a.memoizedState = [s, n]), s;
  }
  function Zu(t, n, a) {
    return a === void 0 || ((qn & 1073741824) !== 0 && (Mt & 261930) === 0)
      ? (t.memoizedState = n)
      : ((t.memoizedState = a), (t = og()), (bt.lanes |= t), (di |= t), a);
  }
  function om(t, n, a, s) {
    return Pe(a, n)
      ? a
      : Ol.current !== null
        ? ((t = Zu(t, a, s)), Pe(t, n) || (re = !0), t)
        : (qn & 42) === 0 || ((qn & 1073741824) !== 0 && (Mt & 261930) === 0)
          ? ((re = !0), (t.memoizedState = a))
          : ((t = og()), (bt.lanes |= t), (di |= t), n);
  }
  function um(t, n, a, s, f) {
    var d = Z.p;
    Z.p = d !== 0 && 8 > d ? d : 8;
    var v = N.T,
      S = {};
    (N.T = S), Wu(t, !1, n, a);
    try {
      var k = f(),
        B = N.S;
      if (
        (B !== null && B(S, k),
        k !== null && typeof k == 'object' && typeof k.then == 'function')
      ) {
        var P = wS(k, s);
        ja(t, n, P, Qe(t));
      } else ja(t, n, s, Qe(t));
    } catch (X) {
      ja(t, n, { then: function () {}, status: 'rejected', reason: X }, Qe());
    } finally {
      (Z.p = d),
        v !== null && S.types !== null && (v.types = S.types),
        (N.T = v);
    }
  }
  function zS() {}
  function Ju(t, n, a, s) {
    if (t.tag !== 5) throw Error(r(476));
    var f = cm(t).queue;
    um(
      t,
      f,
      n,
      lt,
      a === null
        ? zS
        : function () {
            return fm(t), a(s);
          },
    );
  }
  function cm(t) {
    var n = t.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: lt,
      baseState: lt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Pn,
        lastRenderedState: lt,
      },
      next: null,
    };
    var a = {};
    return (
      (n.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Pn,
          lastRenderedState: a,
        },
        next: null,
      }),
      (t.memoizedState = n),
      (t = t.alternate),
      t !== null && (t.memoizedState = n),
      n
    );
  }
  function fm(t) {
    var n = cm(t);
    n.next === null && (n = t.alternate.memoizedState),
      ja(t, n.next.queue, {}, Qe());
  }
  function $u() {
    return ye(Wa);
  }
  function hm() {
    return ne().memoizedState;
  }
  function dm() {
    return ne().memoizedState;
  }
  function OS(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var a = Qe();
          t = si(a);
          var s = oi(n, t, a);
          s !== null && (Ve(s, n, a), Oa(s, n, a)),
            (n = { cache: Cu() }),
            (t.payload = n);
          return;
      }
      n = n.return;
    }
  }
  function RS(t, n, a) {
    var s = Qe();
    (a = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      vs(t)
        ? mm(n, a)
        : ((a = gu(t, n, a, s)), a !== null && (Ve(a, t, s), gm(a, n, s)));
  }
  function pm(t, n, a) {
    var s = Qe();
    ja(t, n, a, s);
  }
  function ja(t, n, a, s) {
    var f = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (vs(t)) mm(n, f);
    else {
      var d = t.alternate;
      if (
        t.lanes === 0 &&
        (d === null || d.lanes === 0) &&
        ((d = n.lastRenderedReducer), d !== null)
      )
        try {
          var v = n.lastRenderedState,
            S = d(v, a);
          if (((f.hasEagerState = !0), (f.eagerState = S), Pe(S, v)))
            return $r(t, n, f, 0), Gt === null && Jr(), !1;
        } catch {
        } finally {
        }
      if (((a = gu(t, n, f, s)), a !== null))
        return Ve(a, t, s), gm(a, n, s), !0;
    }
    return !1;
  }
  function Wu(t, n, a, s) {
    if (
      ((s = {
        lane: 2,
        revertLane: Oc(),
        gesture: null,
        action: s,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      vs(t))
    ) {
      if (n) throw Error(r(479));
    } else (n = gu(t, a, s, 2)), n !== null && Ve(n, t, 2);
  }
  function vs(t) {
    var n = t.alternate;
    return t === bt || (n !== null && n === bt);
  }
  function mm(t, n) {
    Rl = fs = !0;
    var a = t.pending;
    a === null ? (n.next = n) : ((n.next = a.next), (a.next = n)),
      (t.pending = n);
  }
  function gm(t, n, a) {
    if ((a & 4194048) !== 0) {
      var s = n.lanes;
      (s &= t.pendingLanes), (a |= s), (n.lanes = a), Sd(t, a);
    }
  }
  var Ba = {
    readContext: ye,
    use: ps,
    useCallback: $t,
    useContext: $t,
    useEffect: $t,
    useImperativeHandle: $t,
    useLayoutEffect: $t,
    useInsertionEffect: $t,
    useMemo: $t,
    useReducer: $t,
    useRef: $t,
    useState: $t,
    useDebugValue: $t,
    useDeferredValue: $t,
    useTransition: $t,
    useSyncExternalStore: $t,
    useId: $t,
    useHostTransitionStatus: $t,
    useFormState: $t,
    useActionState: $t,
    useOptimistic: $t,
    useMemoCache: $t,
    useCacheRefresh: $t,
  };
  Ba.useEffectEvent = $t;
  var ym = {
      readContext: ye,
      use: ps,
      useCallback: function (t, n) {
        return (Ce().memoizedState = [t, n === void 0 ? null : n]), t;
      },
      useContext: ye,
      useEffect: tm,
      useImperativeHandle: function (t, n, a) {
        (a = a != null ? a.concat([t]) : null),
          gs(4194308, 4, lm.bind(null, n, t), a);
      },
      useLayoutEffect: function (t, n) {
        return gs(4194308, 4, t, n);
      },
      useInsertionEffect: function (t, n) {
        gs(4, 2, t, n);
      },
      useMemo: function (t, n) {
        var a = Ce();
        n = n === void 0 ? null : n;
        var s = t();
        if (Ii) {
          Oe(!0);
          try {
            t();
          } finally {
            Oe(!1);
          }
        }
        return (a.memoizedState = [s, n]), s;
      },
      useReducer: function (t, n, a) {
        var s = Ce();
        if (a !== void 0) {
          var f = a(n);
          if (Ii) {
            Oe(!0);
            try {
              a(n);
            } finally {
              Oe(!1);
            }
          }
        } else f = n;
        return (
          (s.memoizedState = s.baseState = f),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: f,
          }),
          (s.queue = t),
          (t = t.dispatch = RS.bind(null, bt, t)),
          [s.memoizedState, t]
        );
      },
      useRef: function (t) {
        var n = Ce();
        return (t = { current: t }), (n.memoizedState = t);
      },
      useState: function (t) {
        t = Iu(t);
        var n = t.queue,
          a = pm.bind(null, bt, n);
        return (n.dispatch = a), [t.memoizedState, a];
      },
      useDebugValue: Ku,
      useDeferredValue: function (t, n) {
        var a = Ce();
        return Zu(a, t, n);
      },
      useTransition: function () {
        var t = Iu(!1);
        return (
          (t = um.bind(null, bt, t.queue, !0, !1)),
          (Ce().memoizedState = t),
          [!1, t]
        );
      },
      useSyncExternalStore: function (t, n, a) {
        var s = bt,
          f = Ce();
        if (zt) {
          if (a === void 0) throw Error(r(407));
          a = a();
        } else {
          if (((a = n()), Gt === null)) throw Error(r(349));
          (Mt & 127) !== 0 || Vp(s, n, a);
        }
        f.memoizedState = a;
        var d = { value: a, getSnapshot: n };
        return (
          (f.queue = d),
          tm(Hp.bind(null, s, d, t), [t]),
          (s.flags |= 2048),
          Nl(9, { destroy: void 0 }, Up.bind(null, s, d, a, n), null),
          a
        );
      },
      useId: function () {
        var t = Ce(),
          n = Gt.identifierPrefix;
        if (zt) {
          var a = Tn,
            s = Sn;
          (a = (s & ~(1 << (32 - Pt(s) - 1))).toString(32) + a),
            (n = '_' + n + 'R_' + a),
            (a = hs++),
            0 < a && (n += 'H' + a.toString(32)),
            (n += '_');
        } else (a = ES++), (n = '_' + n + 'r_' + a.toString(32) + '_');
        return (t.memoizedState = n);
      },
      useHostTransitionStatus: $u,
      useFormState: Kp,
      useActionState: Kp,
      useOptimistic: function (t) {
        var n = Ce();
        n.memoizedState = n.baseState = t;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (n.queue = a),
          (n = Wu.bind(null, bt, !0, a)),
          (a.dispatch = n),
          [t, n]
        );
      },
      useMemoCache: Gu,
      useCacheRefresh: function () {
        return (Ce().memoizedState = OS.bind(null, bt));
      },
      useEffectEvent: function (t) {
        var n = Ce(),
          a = { impl: t };
        return (
          (n.memoizedState = a),
          function () {
            if ((Nt & 2) !== 0) throw Error(r(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    tc = {
      readContext: ye,
      use: ps,
      useCallback: rm,
      useContext: ye,
      useEffect: Qu,
      useImperativeHandle: am,
      useInsertionEffect: nm,
      useLayoutEffect: im,
      useMemo: sm,
      useReducer: ms,
      useRef: Wp,
      useState: function () {
        return ms(Pn);
      },
      useDebugValue: Ku,
      useDeferredValue: function (t, n) {
        var a = ne();
        return om(a, Ut.memoizedState, t, n);
      },
      useTransition: function () {
        var t = ms(Pn)[0],
          n = ne().memoizedState;
        return [typeof t == 'boolean' ? t : La(t), n];
      },
      useSyncExternalStore: Bp,
      useId: hm,
      useHostTransitionStatus: $u,
      useFormState: Zp,
      useActionState: Zp,
      useOptimistic: function (t, n) {
        var a = ne();
        return Gp(a, Ut, t, n);
      },
      useMemoCache: Gu,
      useCacheRefresh: dm,
    };
  tc.useEffectEvent = em;
  var vm = {
    readContext: ye,
    use: ps,
    useCallback: rm,
    useContext: ye,
    useEffect: Qu,
    useImperativeHandle: am,
    useInsertionEffect: nm,
    useLayoutEffect: im,
    useMemo: sm,
    useReducer: Fu,
    useRef: Wp,
    useState: function () {
      return Fu(Pn);
    },
    useDebugValue: Ku,
    useDeferredValue: function (t, n) {
      var a = ne();
      return Ut === null ? Zu(a, t, n) : om(a, Ut.memoizedState, t, n);
    },
    useTransition: function () {
      var t = Fu(Pn)[0],
        n = ne().memoizedState;
      return [typeof t == 'boolean' ? t : La(t), n];
    },
    useSyncExternalStore: Bp,
    useId: hm,
    useHostTransitionStatus: $u,
    useFormState: $p,
    useActionState: $p,
    useOptimistic: function (t, n) {
      var a = ne();
      return Ut !== null
        ? Gp(a, Ut, t, n)
        : ((a.baseState = t), [t, a.queue.dispatch]);
    },
    useMemoCache: Gu,
    useCacheRefresh: dm,
  };
  vm.useEffectEvent = em;
  function ec(t, n, a, s) {
    (n = t.memoizedState),
      (a = a(s, n)),
      (a = a == null ? n : y({}, n, a)),
      (t.memoizedState = a),
      t.lanes === 0 && (t.updateQueue.baseState = a);
  }
  var nc = {
    enqueueSetState: function (t, n, a) {
      t = t._reactInternals;
      var s = Qe(),
        f = si(s);
      (f.payload = n),
        a != null && (f.callback = a),
        (n = oi(t, f, s)),
        n !== null && (Ve(n, t, s), Oa(n, t, s));
    },
    enqueueReplaceState: function (t, n, a) {
      t = t._reactInternals;
      var s = Qe(),
        f = si(s);
      (f.tag = 1),
        (f.payload = n),
        a != null && (f.callback = a),
        (n = oi(t, f, s)),
        n !== null && (Ve(n, t, s), Oa(n, t, s));
    },
    enqueueForceUpdate: function (t, n) {
      t = t._reactInternals;
      var a = Qe(),
        s = si(a);
      (s.tag = 2),
        n != null && (s.callback = n),
        (n = oi(t, s, a)),
        n !== null && (Ve(n, t, a), Oa(n, t, a));
    },
  };
  function xm(t, n, a, s, f, d, v) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == 'function'
        ? t.shouldComponentUpdate(s, d, v)
        : n.prototype && n.prototype.isPureReactComponent
          ? !Aa(a, s) || !Aa(f, d)
          : !0
    );
  }
  function bm(t, n, a, s) {
    (t = n.state),
      typeof n.componentWillReceiveProps == 'function' &&
        n.componentWillReceiveProps(a, s),
      typeof n.UNSAFE_componentWillReceiveProps == 'function' &&
        n.UNSAFE_componentWillReceiveProps(a, s),
      n.state !== t && nc.enqueueReplaceState(n, n.state, null);
  }
  function Xi(t, n) {
    var a = n;
    if ('ref' in n) {
      a = {};
      for (var s in n) s !== 'ref' && (a[s] = n[s]);
    }
    if ((t = t.defaultProps)) {
      a === n && (a = y({}, a));
      for (var f in t) a[f] === void 0 && (a[f] = t[f]);
    }
    return a;
  }
  function Sm(t) {
    Zr(t);
  }
  function Tm(t) {
    console.error(t);
  }
  function Am(t) {
    Zr(t);
  }
  function xs(t, n) {
    try {
      var a = t.onUncaughtError;
      a(n.value, { componentStack: n.stack });
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  function wm(t, n, a) {
    try {
      var s = t.onCaughtError;
      s(a.value, {
        componentStack: a.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null,
      });
    } catch (f) {
      setTimeout(function () {
        throw f;
      });
    }
  }
  function ic(t, n, a) {
    return (
      (a = si(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        xs(t, n);
      }),
      a
    );
  }
  function Em(t) {
    return (t = si(t)), (t.tag = 3), t;
  }
  function km(t, n, a, s) {
    var f = a.type.getDerivedStateFromError;
    if (typeof f == 'function') {
      var d = s.value;
      (t.payload = function () {
        return f(d);
      }),
        (t.callback = function () {
          wm(n, a, s);
        });
    }
    var v = a.stateNode;
    v !== null &&
      typeof v.componentDidCatch == 'function' &&
      (t.callback = function () {
        wm(n, a, s),
          typeof f != 'function' &&
            (pi === null ? (pi = new Set([this])) : pi.add(this));
        var S = s.stack;
        this.componentDidCatch(s.value, {
          componentStack: S !== null ? S : '',
        });
      });
  }
  function _S(t, n, a, s, f) {
    if (
      ((a.flags |= 32768),
      s !== null && typeof s == 'object' && typeof s.then == 'function')
    ) {
      if (
        ((n = a.alternate),
        n !== null && kl(n, a, f, !0),
        (a = Ye.current),
        a !== null)
      ) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              sn === null ? Os() : a.alternate === null && Wt === 0 && (Wt = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = f),
              s === rs
                ? (a.flags |= 16384)
                : ((n = a.updateQueue),
                  n === null ? (a.updateQueue = new Set([s])) : n.add(s),
                  Mc(t, s, f)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              s === rs
                ? (a.flags |= 16384)
                : ((n = a.updateQueue),
                  n === null
                    ? ((n = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([s]),
                      }),
                      (a.updateQueue = n))
                    : ((a = n.retryQueue),
                      a === null ? (n.retryQueue = new Set([s])) : a.add(s)),
                  Mc(t, s, f)),
              !1
            );
        }
        throw Error(r(435, a.tag));
      }
      return Mc(t, s, f), Os(), !1;
    }
    if (zt)
      return (
        (n = Ye.current),
        n !== null
          ? ((n.flags & 65536) === 0 && (n.flags |= 256),
            (n.flags |= 65536),
            (n.lanes = f),
            s !== Tu && ((t = Error(r(422), { cause: s })), ka(nn(t, a))))
          : (s !== Tu && ((n = Error(r(423), { cause: s })), ka(nn(n, a))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (f &= -f),
            (t.lanes |= f),
            (s = nn(s, a)),
            (f = ic(t.stateNode, s, f)),
            _u(t, f),
            Wt !== 4 && (Wt = 2)),
        !1
      );
    var d = Error(r(520), { cause: s });
    if (
      ((d = nn(d, a)),
      Fa === null ? (Fa = [d]) : Fa.push(d),
      Wt !== 4 && (Wt = 2),
      n === null)
    )
      return !0;
    (s = nn(s, a)), (a = n);
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (t = f & -f),
            (a.lanes |= t),
            (t = ic(a.stateNode, s, t)),
            _u(a, t),
            !1
          );
        case 1:
          if (
            ((n = a.type),
            (d = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof n.getDerivedStateFromError == 'function' ||
                (d !== null &&
                  typeof d.componentDidCatch == 'function' &&
                  (pi === null || !pi.has(d)))))
          )
            return (
              (a.flags |= 65536),
              (f &= -f),
              (a.lanes |= f),
              (f = Em(f)),
              km(f, t, a, s),
              _u(a, f),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var lc = Error(r(461)),
    re = !1;
  function ve(t, n, a, s) {
    n.child = t === null ? zp(n, null, a, s) : Fi(n, t.child, a, s);
  }
  function Cm(t, n, a, s, f) {
    a = a.render;
    var d = n.ref;
    if ('ref' in s) {
      var v = {};
      for (var S in s) S !== 'ref' && (v[S] = s[S]);
    } else v = s;
    return (
      qi(n),
      (s = Uu(t, n, a, v, d, f)),
      (S = Hu()),
      t !== null && !re
        ? (qu(t, n, f), Gn(t, n, f))
        : (zt && S && bu(n), (n.flags |= 1), ve(t, n, s, f), n.child)
    );
  }
  function Mm(t, n, a, s, f) {
    if (t === null) {
      var d = a.type;
      return typeof d == 'function' &&
        !yu(d) &&
        d.defaultProps === void 0 &&
        a.compare === null
        ? ((n.tag = 15), (n.type = d), Dm(t, n, d, s, f))
        : ((t = ts(a.type, null, s, n, n.mode, f)),
          (t.ref = n.ref),
          (t.return = n),
          (n.child = t));
    }
    if (((d = t.child), !hc(t, f))) {
      var v = d.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : Aa), a(v, s) && t.ref === n.ref)
      )
        return Gn(t, n, f);
    }
    return (
      (n.flags |= 1),
      (t = Bn(d, s)),
      (t.ref = n.ref),
      (t.return = n),
      (n.child = t)
    );
  }
  function Dm(t, n, a, s, f) {
    if (t !== null) {
      var d = t.memoizedProps;
      if (Aa(d, s) && t.ref === n.ref)
        if (((re = !1), (n.pendingProps = s = d), hc(t, f)))
          (t.flags & 131072) !== 0 && (re = !0);
        else return (n.lanes = t.lanes), Gn(t, n, f);
    }
    return ac(t, n, a, s, f);
  }
  function zm(t, n, a, s) {
    var f = s.children,
      d = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        n.stateNode === null &&
        (n.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      s.mode === 'hidden')
    ) {
      if ((n.flags & 128) !== 0) {
        if (((d = d !== null ? d.baseLanes | a : a), t !== null)) {
          for (s = n.child = t.child, f = 0; s !== null; )
            (f = f | s.lanes | s.childLanes), (s = s.sibling);
          s = f & ~d;
        } else (s = 0), (n.child = null);
        return Om(t, n, d, a, s);
      }
      if ((a & 536870912) !== 0)
        (n.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && ls(n, d !== null ? d.cachePool : null),
          d !== null ? _p(n, d) : Lu(),
          Np(n);
      else
        return (
          (s = n.lanes = 536870912),
          Om(t, n, d !== null ? d.baseLanes | a : a, a, s)
        );
    } else
      d !== null
        ? (ls(n, d.cachePool), _p(n, d), ci(), (n.memoizedState = null))
        : (t !== null && ls(n, null), Lu(), ci());
    return ve(t, n, f, a), n.child;
  }
  function Va(t, n) {
    return (
      (t !== null && t.tag === 22) ||
        n.stateNode !== null ||
        (n.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      n.sibling
    );
  }
  function Om(t, n, a, s, f) {
    var d = Du();
    return (
      (d = d === null ? null : { parent: le._currentValue, pool: d }),
      (n.memoizedState = { baseLanes: a, cachePool: d }),
      t !== null && ls(n, null),
      Lu(),
      Np(n),
      t !== null && kl(t, n, s, !0),
      (n.childLanes = f),
      null
    );
  }
  function bs(t, n) {
    return (
      (n = Ts({ mode: n.mode, children: n.children }, t.mode)),
      (n.ref = t.ref),
      (t.child = n),
      (n.return = t),
      n
    );
  }
  function Rm(t, n, a) {
    return (
      Fi(n, t.child, null, a),
      (t = bs(n, n.pendingProps)),
      (t.flags |= 2),
      Fe(n),
      (n.memoizedState = null),
      t
    );
  }
  function NS(t, n, a) {
    var s = n.pendingProps,
      f = (n.flags & 128) !== 0;
    if (((n.flags &= -129), t === null)) {
      if (zt) {
        if (s.mode === 'hidden')
          return (t = bs(n, s)), (n.lanes = 536870912), Va(null, t);
        if (
          (Bu(n),
          (t = Xt)
            ? ((t = Yg(t, rn)),
              (t = t !== null && t.data === '&' ? t : null),
              t !== null &&
                ((n.memoizedState = {
                  dehydrated: t,
                  treeContext: ni !== null ? { id: Sn, overflow: Tn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = mp(t)),
                (a.return = n),
                (n.child = a),
                (ge = n),
                (Xt = null)))
            : (t = null),
          t === null)
        )
          throw li(n);
        return (n.lanes = 536870912), null;
      }
      return bs(n, s);
    }
    var d = t.memoizedState;
    if (d !== null) {
      var v = d.dehydrated;
      if ((Bu(n), f))
        if (n.flags & 256) (n.flags &= -257), (n = Rm(t, n, a));
        else if (n.memoizedState !== null)
          (n.child = t.child), (n.flags |= 128), (n = null);
        else throw Error(r(558));
      else if (
        (re || kl(t, n, a, !1), (f = (a & t.childLanes) !== 0), re || f)
      ) {
        if (
          ((s = Gt),
          s !== null && ((v = Td(s, a)), v !== 0 && v !== d.retryLane))
        )
          throw ((d.retryLane = v), Bi(t, v), Ve(s, t, v), lc);
        Os(), (n = Rm(t, n, a));
      } else
        (t = d.treeContext),
          (Xt = on(v.nextSibling)),
          (ge = n),
          (zt = !0),
          (ii = null),
          (rn = !1),
          t !== null && vp(n, t),
          (n = bs(n, s)),
          (n.flags |= 4096);
      return n;
    }
    return (
      (t = Bn(t.child, { mode: s.mode, children: s.children })),
      (t.ref = n.ref),
      (n.child = t),
      (t.return = n),
      t
    );
  }
  function Ss(t, n) {
    var a = n.ref;
    if (a === null) t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(r(284));
      (t === null || t.ref !== a) && (n.flags |= 4194816);
    }
  }
  function ac(t, n, a, s, f) {
    return (
      qi(n),
      (a = Uu(t, n, a, s, void 0, f)),
      (s = Hu()),
      t !== null && !re
        ? (qu(t, n, f), Gn(t, n, f))
        : (zt && s && bu(n), (n.flags |= 1), ve(t, n, a, f), n.child)
    );
  }
  function _m(t, n, a, s, f, d) {
    return (
      qi(n),
      (n.updateQueue = null),
      (a = jp(n, s, a, f)),
      Lp(t),
      (s = Hu()),
      t !== null && !re
        ? (qu(t, n, d), Gn(t, n, d))
        : (zt && s && bu(n), (n.flags |= 1), ve(t, n, a, d), n.child)
    );
  }
  function Nm(t, n, a, s, f) {
    if ((qi(n), n.stateNode === null)) {
      var d = Tl,
        v = a.contextType;
      typeof v == 'object' && v !== null && (d = ye(v)),
        (d = new a(s, d)),
        (n.memoizedState =
          d.state !== null && d.state !== void 0 ? d.state : null),
        (d.updater = nc),
        (n.stateNode = d),
        (d._reactInternals = n),
        (d = n.stateNode),
        (d.props = s),
        (d.state = n.memoizedState),
        (d.refs = {}),
        Ou(n),
        (v = a.contextType),
        (d.context = typeof v == 'object' && v !== null ? ye(v) : Tl),
        (d.state = n.memoizedState),
        (v = a.getDerivedStateFromProps),
        typeof v == 'function' && (ec(n, a, v, s), (d.state = n.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof d.getSnapshotBeforeUpdate == 'function' ||
          (typeof d.UNSAFE_componentWillMount != 'function' &&
            typeof d.componentWillMount != 'function') ||
          ((v = d.state),
          typeof d.componentWillMount == 'function' && d.componentWillMount(),
          typeof d.UNSAFE_componentWillMount == 'function' &&
            d.UNSAFE_componentWillMount(),
          v !== d.state && nc.enqueueReplaceState(d, d.state, null),
          _a(n, s, d, f),
          Ra(),
          (d.state = n.memoizedState)),
        typeof d.componentDidMount == 'function' && (n.flags |= 4194308),
        (s = !0);
    } else if (t === null) {
      d = n.stateNode;
      var S = n.memoizedProps,
        k = Xi(a, S);
      d.props = k;
      var B = d.context,
        P = a.contextType;
      (v = Tl), typeof P == 'object' && P !== null && (v = ye(P));
      var X = a.getDerivedStateFromProps;
      (P =
        typeof X == 'function' ||
        typeof d.getSnapshotBeforeUpdate == 'function'),
        (S = n.pendingProps !== S),
        P ||
          (typeof d.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof d.componentWillReceiveProps != 'function') ||
          ((S || B !== v) && bm(n, d, s, v)),
        (ri = !1);
      var U = n.memoizedState;
      (d.state = U),
        _a(n, s, d, f),
        Ra(),
        (B = n.memoizedState),
        S || U !== B || ri
          ? (typeof X == 'function' && (ec(n, a, X, s), (B = n.memoizedState)),
            (k = ri || xm(n, a, k, s, U, B, v))
              ? (P ||
                  (typeof d.UNSAFE_componentWillMount != 'function' &&
                    typeof d.componentWillMount != 'function') ||
                  (typeof d.componentWillMount == 'function' &&
                    d.componentWillMount(),
                  typeof d.UNSAFE_componentWillMount == 'function' &&
                    d.UNSAFE_componentWillMount()),
                typeof d.componentDidMount == 'function' &&
                  (n.flags |= 4194308))
              : (typeof d.componentDidMount == 'function' &&
                  (n.flags |= 4194308),
                (n.memoizedProps = s),
                (n.memoizedState = B)),
            (d.props = s),
            (d.state = B),
            (d.context = v),
            (s = k))
          : (typeof d.componentDidMount == 'function' && (n.flags |= 4194308),
            (s = !1));
    } else {
      (d = n.stateNode),
        Ru(t, n),
        (v = n.memoizedProps),
        (P = Xi(a, v)),
        (d.props = P),
        (X = n.pendingProps),
        (U = d.context),
        (B = a.contextType),
        (k = Tl),
        typeof B == 'object' && B !== null && (k = ye(B)),
        (S = a.getDerivedStateFromProps),
        (B =
          typeof S == 'function' ||
          typeof d.getSnapshotBeforeUpdate == 'function') ||
          (typeof d.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof d.componentWillReceiveProps != 'function') ||
          ((v !== X || U !== k) && bm(n, d, s, k)),
        (ri = !1),
        (U = n.memoizedState),
        (d.state = U),
        _a(n, s, d, f),
        Ra();
      var q = n.memoizedState;
      v !== X ||
      U !== q ||
      ri ||
      (t !== null && t.dependencies !== null && ns(t.dependencies))
        ? (typeof S == 'function' && (ec(n, a, S, s), (q = n.memoizedState)),
          (P =
            ri ||
            xm(n, a, P, s, U, q, k) ||
            (t !== null && t.dependencies !== null && ns(t.dependencies)))
            ? (B ||
                (typeof d.UNSAFE_componentWillUpdate != 'function' &&
                  typeof d.componentWillUpdate != 'function') ||
                (typeof d.componentWillUpdate == 'function' &&
                  d.componentWillUpdate(s, q, k),
                typeof d.UNSAFE_componentWillUpdate == 'function' &&
                  d.UNSAFE_componentWillUpdate(s, q, k)),
              typeof d.componentDidUpdate == 'function' && (n.flags |= 4),
              typeof d.getSnapshotBeforeUpdate == 'function' &&
                (n.flags |= 1024))
            : (typeof d.componentDidUpdate != 'function' ||
                (v === t.memoizedProps && U === t.memoizedState) ||
                (n.flags |= 4),
              typeof d.getSnapshotBeforeUpdate != 'function' ||
                (v === t.memoizedProps && U === t.memoizedState) ||
                (n.flags |= 1024),
              (n.memoizedProps = s),
              (n.memoizedState = q)),
          (d.props = s),
          (d.state = q),
          (d.context = k),
          (s = P))
        : (typeof d.componentDidUpdate != 'function' ||
            (v === t.memoizedProps && U === t.memoizedState) ||
            (n.flags |= 4),
          typeof d.getSnapshotBeforeUpdate != 'function' ||
            (v === t.memoizedProps && U === t.memoizedState) ||
            (n.flags |= 1024),
          (s = !1));
    }
    return (
      (d = s),
      Ss(t, n),
      (s = (n.flags & 128) !== 0),
      d || s
        ? ((d = n.stateNode),
          (a =
            s && typeof a.getDerivedStateFromError != 'function'
              ? null
              : d.render()),
          (n.flags |= 1),
          t !== null && s
            ? ((n.child = Fi(n, t.child, null, f)),
              (n.child = Fi(n, null, a, f)))
            : ve(t, n, a, f),
          (n.memoizedState = d.state),
          (t = n.child))
        : (t = Gn(t, n, f)),
      t
    );
  }
  function Lm(t, n, a, s) {
    return Ui(), (n.flags |= 256), ve(t, n, a, s), n.child;
  }
  var rc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function sc(t) {
    return { baseLanes: t, cachePool: wp() };
  }
  function oc(t, n, a) {
    return (t = t !== null ? t.childLanes & ~a : 0), n && (t |= Xe), t;
  }
  function jm(t, n, a) {
    var s = n.pendingProps,
      f = !1,
      d = (n.flags & 128) !== 0,
      v;
    if (
      ((v = d) ||
        (v =
          t !== null && t.memoizedState === null ? !1 : (ee.current & 2) !== 0),
      v && ((f = !0), (n.flags &= -129)),
      (v = (n.flags & 32) !== 0),
      (n.flags &= -33),
      t === null)
    ) {
      if (zt) {
        if (
          (f ? ui(n) : ci(),
          (t = Xt)
            ? ((t = Yg(t, rn)),
              (t = t !== null && t.data !== '&' ? t : null),
              t !== null &&
                ((n.memoizedState = {
                  dehydrated: t,
                  treeContext: ni !== null ? { id: Sn, overflow: Tn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = mp(t)),
                (a.return = n),
                (n.child = a),
                (ge = n),
                (Xt = null)))
            : (t = null),
          t === null)
        )
          throw li(n);
        return Yc(t) ? (n.lanes = 32) : (n.lanes = 536870912), null;
      }
      var S = s.children;
      return (
        (s = s.fallback),
        f
          ? (ci(),
            (f = n.mode),
            (S = Ts({ mode: 'hidden', children: S }, f)),
            (s = Vi(s, f, a, null)),
            (S.return = n),
            (s.return = n),
            (S.sibling = s),
            (n.child = S),
            (s = n.child),
            (s.memoizedState = sc(a)),
            (s.childLanes = oc(t, v, a)),
            (n.memoizedState = rc),
            Va(null, s))
          : (ui(n), uc(n, S))
      );
    }
    var k = t.memoizedState;
    if (k !== null && ((S = k.dehydrated), S !== null)) {
      if (d)
        n.flags & 256
          ? (ui(n), (n.flags &= -257), (n = cc(t, n, a)))
          : n.memoizedState !== null
            ? (ci(), (n.child = t.child), (n.flags |= 128), (n = null))
            : (ci(),
              (S = s.fallback),
              (f = n.mode),
              (s = Ts({ mode: 'visible', children: s.children }, f)),
              (S = Vi(S, f, a, null)),
              (S.flags |= 2),
              (s.return = n),
              (S.return = n),
              (s.sibling = S),
              (n.child = s),
              Fi(n, t.child, null, a),
              (s = n.child),
              (s.memoizedState = sc(a)),
              (s.childLanes = oc(t, v, a)),
              (n.memoizedState = rc),
              (n = Va(null, s)));
      else if ((ui(n), Yc(S))) {
        if (((v = S.nextSibling && S.nextSibling.dataset), v)) var B = v.dgst;
        (v = B),
          (s = Error(r(419))),
          (s.stack = ''),
          (s.digest = v),
          ka({ value: s, source: null, stack: null }),
          (n = cc(t, n, a));
      } else if (
        (re || kl(t, n, a, !1), (v = (a & t.childLanes) !== 0), re || v)
      ) {
        if (
          ((v = Gt),
          v !== null && ((s = Td(v, a)), s !== 0 && s !== k.retryLane))
        )
          throw ((k.retryLane = s), Bi(t, s), Ve(v, t, s), lc);
        Gc(S) || Os(), (n = cc(t, n, a));
      } else
        Gc(S)
          ? ((n.flags |= 192), (n.child = t.child), (n = null))
          : ((t = k.treeContext),
            (Xt = on(S.nextSibling)),
            (ge = n),
            (zt = !0),
            (ii = null),
            (rn = !1),
            t !== null && vp(n, t),
            (n = uc(n, s.children)),
            (n.flags |= 4096));
      return n;
    }
    return f
      ? (ci(),
        (S = s.fallback),
        (f = n.mode),
        (k = t.child),
        (B = k.sibling),
        (s = Bn(k, { mode: 'hidden', children: s.children })),
        (s.subtreeFlags = k.subtreeFlags & 65011712),
        B !== null ? (S = Bn(B, S)) : ((S = Vi(S, f, a, null)), (S.flags |= 2)),
        (S.return = n),
        (s.return = n),
        (s.sibling = S),
        (n.child = s),
        Va(null, s),
        (s = n.child),
        (S = t.child.memoizedState),
        S === null
          ? (S = sc(a))
          : ((f = S.cachePool),
            f !== null
              ? ((k = le._currentValue),
                (f = f.parent !== k ? { parent: k, pool: k } : f))
              : (f = wp()),
            (S = { baseLanes: S.baseLanes | a, cachePool: f })),
        (s.memoizedState = S),
        (s.childLanes = oc(t, v, a)),
        (n.memoizedState = rc),
        Va(t.child, s))
      : (ui(n),
        (a = t.child),
        (t = a.sibling),
        (a = Bn(a, { mode: 'visible', children: s.children })),
        (a.return = n),
        (a.sibling = null),
        t !== null &&
          ((v = n.deletions),
          v === null ? ((n.deletions = [t]), (n.flags |= 16)) : v.push(t)),
        (n.child = a),
        (n.memoizedState = null),
        a);
  }
  function uc(t, n) {
    return (
      (n = Ts({ mode: 'visible', children: n }, t.mode)),
      (n.return = t),
      (t.child = n)
    );
  }
  function Ts(t, n) {
    return (t = Ge(22, t, null, n)), (t.lanes = 0), t;
  }
  function cc(t, n, a) {
    return (
      Fi(n, t.child, null, a),
      (t = uc(n, n.pendingProps.children)),
      (t.flags |= 2),
      (n.memoizedState = null),
      t
    );
  }
  function Bm(t, n, a) {
    t.lanes |= n;
    var s = t.alternate;
    s !== null && (s.lanes |= n), Eu(t.return, n, a);
  }
  function fc(t, n, a, s, f, d) {
    var v = t.memoizedState;
    v === null
      ? (t.memoizedState = {
          isBackwards: n,
          rendering: null,
          renderingStartTime: 0,
          last: s,
          tail: a,
          tailMode: f,
          treeForkCount: d,
        })
      : ((v.isBackwards = n),
        (v.rendering = null),
        (v.renderingStartTime = 0),
        (v.last = s),
        (v.tail = a),
        (v.tailMode = f),
        (v.treeForkCount = d));
  }
  function Vm(t, n, a) {
    var s = n.pendingProps,
      f = s.revealOrder,
      d = s.tail;
    s = s.children;
    var v = ee.current,
      S = (v & 2) !== 0;
    if (
      (S ? ((v = (v & 1) | 2), (n.flags |= 128)) : (v &= 1),
      A(ee, v),
      ve(t, n, s, a),
      (s = zt ? Ea : 0),
      !S && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = n.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && Bm(t, a, n);
        else if (t.tag === 19) Bm(t, a, n);
        else if (t.child !== null) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === n) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === n) break t;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    switch (f) {
      case 'forwards':
        for (a = n.child, f = null; a !== null; )
          (t = a.alternate),
            t !== null && cs(t) === null && (f = a),
            (a = a.sibling);
        (a = f),
          a === null
            ? ((f = n.child), (n.child = null))
            : ((f = a.sibling), (a.sibling = null)),
          fc(n, !1, f, a, d, s);
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, f = n.child, n.child = null; f !== null; ) {
          if (((t = f.alternate), t !== null && cs(t) === null)) {
            n.child = f;
            break;
          }
          (t = f.sibling), (f.sibling = a), (a = f), (f = t);
        }
        fc(n, !0, a, null, d, s);
        break;
      case 'together':
        fc(n, !1, null, null, void 0, s);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Gn(t, n, a) {
    if (
      (t !== null && (n.dependencies = t.dependencies),
      (di |= n.lanes),
      (a & n.childLanes) === 0)
    )
      if (t !== null) {
        if ((kl(t, n, a, !1), (a & n.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && n.child !== t.child) throw Error(r(153));
    if (n.child !== null) {
      for (
        t = n.child, a = Bn(t, t.pendingProps), n.child = a, a.return = n;
        t.sibling !== null;

      )
        (t = t.sibling),
          (a = a.sibling = Bn(t, t.pendingProps)),
          (a.return = n);
      a.sibling = null;
    }
    return n.child;
  }
  function hc(t, n) {
    return (t.lanes & n) !== 0
      ? !0
      : ((t = t.dependencies), !!(t !== null && ns(t)));
  }
  function LS(t, n, a) {
    switch (n.tag) {
      case 3:
        Zt(n, n.stateNode.containerInfo),
          ai(n, le, t.memoizedState.cache),
          Ui();
        break;
      case 27:
      case 5:
        $e(n);
        break;
      case 4:
        Zt(n, n.stateNode.containerInfo);
        break;
      case 10:
        ai(n, n.type, n.memoizedProps.value);
        break;
      case 31:
        if (n.memoizedState !== null) return (n.flags |= 128), Bu(n), null;
        break;
      case 13:
        var s = n.memoizedState;
        if (s !== null)
          return s.dehydrated !== null
            ? (ui(n), (n.flags |= 128), null)
            : (a & n.child.childLanes) !== 0
              ? jm(t, n, a)
              : (ui(n), (t = Gn(t, n, a)), t !== null ? t.sibling : null);
        ui(n);
        break;
      case 19:
        var f = (t.flags & 128) !== 0;
        if (
          ((s = (a & n.childLanes) !== 0),
          s || (kl(t, n, a, !1), (s = (a & n.childLanes) !== 0)),
          f)
        ) {
          if (s) return Vm(t, n, a);
          n.flags |= 128;
        }
        if (
          ((f = n.memoizedState),
          f !== null &&
            ((f.rendering = null), (f.tail = null), (f.lastEffect = null)),
          A(ee, ee.current),
          s)
        )
          break;
        return null;
      case 22:
        return (n.lanes = 0), zm(t, n, a, n.pendingProps);
      case 24:
        ai(n, le, t.memoizedState.cache);
    }
    return Gn(t, n, a);
  }
  function Um(t, n, a) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps) re = !0;
      else {
        if (!hc(t, a) && (n.flags & 128) === 0) return (re = !1), LS(t, n, a);
        re = (t.flags & 131072) !== 0;
      }
    else (re = !1), zt && (n.flags & 1048576) !== 0 && yp(n, Ea, n.index);
    switch (((n.lanes = 0), n.tag)) {
      case 16:
        t: {
          var s = n.pendingProps;
          if (((t = Gi(n.elementType)), (n.type = t), typeof t == 'function'))
            yu(t)
              ? ((s = Xi(t, s)), (n.tag = 1), (n = Nm(null, n, t, s, a)))
              : ((n.tag = 0), (n = ac(null, n, t, s, a)));
          else {
            if (t != null) {
              var f = t.$$typeof;
              if (f === Y) {
                (n.tag = 11), (n = Cm(null, n, t, s, a));
                break t;
              } else if (f === K) {
                (n.tag = 14), (n = Mm(null, n, t, s, a));
                break t;
              }
            }
            throw ((n = st(t) || t), Error(r(306, n, '')));
          }
        }
        return n;
      case 0:
        return ac(t, n, n.type, n.pendingProps, a);
      case 1:
        return (s = n.type), (f = Xi(s, n.pendingProps)), Nm(t, n, s, f, a);
      case 3:
        t: {
          if ((Zt(n, n.stateNode.containerInfo), t === null))
            throw Error(r(387));
          s = n.pendingProps;
          var d = n.memoizedState;
          (f = d.element), Ru(t, n), _a(n, s, null, a);
          var v = n.memoizedState;
          if (
            ((s = v.cache),
            ai(n, le, s),
            s !== d.cache && ku(n, [le], a, !0),
            Ra(),
            (s = v.element),
            d.isDehydrated)
          )
            if (
              ((d = { element: s, isDehydrated: !1, cache: v.cache }),
              (n.updateQueue.baseState = d),
              (n.memoizedState = d),
              n.flags & 256)
            ) {
              n = Lm(t, n, s, a);
              break t;
            } else if (s !== f) {
              (f = nn(Error(r(424)), n)), ka(f), (n = Lm(t, n, s, a));
              break t;
            } else {
              switch (((t = n.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === 'HTML' ? t.ownerDocument.body : t;
              }
              for (
                Xt = on(t.firstChild),
                  ge = n,
                  zt = !0,
                  ii = null,
                  rn = !0,
                  a = zp(n, null, s, a),
                  n.child = a;
                a;

              )
                (a.flags = (a.flags & -3) | 4096), (a = a.sibling);
            }
          else {
            if ((Ui(), s === f)) {
              n = Gn(t, n, a);
              break t;
            }
            ve(t, n, s, a);
          }
          n = n.child;
        }
        return n;
      case 26:
        return (
          Ss(t, n),
          t === null
            ? (a = Zg(n.type, null, n.pendingProps, null))
              ? (n.memoizedState = a)
              : zt ||
                ((a = n.type),
                (t = n.pendingProps),
                (s = Vs(ft.current).createElement(a)),
                (s[me] = n),
                (s[Re] = t),
                xe(s, a, t),
                de(s),
                (n.stateNode = s))
            : (n.memoizedState = Zg(
                n.type,
                t.memoizedProps,
                n.pendingProps,
                t.memoizedState,
              )),
          null
        );
      case 27:
        return (
          $e(n),
          t === null &&
            zt &&
            ((s = n.stateNode = Xg(n.type, n.pendingProps, ft.current)),
            (ge = n),
            (rn = !0),
            (f = Xt),
            vi(n.type) ? ((Fc = f), (Xt = on(s.firstChild))) : (Xt = f)),
          ve(t, n, n.pendingProps.children, a),
          Ss(t, n),
          t === null && (n.flags |= 4194304),
          n.child
        );
      case 5:
        return (
          t === null &&
            zt &&
            ((f = s = Xt) &&
              ((s = fT(s, n.type, n.pendingProps, rn)),
              s !== null
                ? ((n.stateNode = s),
                  (ge = n),
                  (Xt = on(s.firstChild)),
                  (rn = !1),
                  (f = !0))
                : (f = !1)),
            f || li(n)),
          $e(n),
          (f = n.type),
          (d = n.pendingProps),
          (v = t !== null ? t.memoizedProps : null),
          (s = d.children),
          Hc(f, d) ? (s = null) : v !== null && Hc(f, v) && (n.flags |= 32),
          n.memoizedState !== null &&
            ((f = Uu(t, n, kS, null, null, a)), (Wa._currentValue = f)),
          Ss(t, n),
          ve(t, n, s, a),
          n.child
        );
      case 6:
        return (
          t === null &&
            zt &&
            ((t = a = Xt) &&
              ((a = hT(a, n.pendingProps, rn)),
              a !== null
                ? ((n.stateNode = a), (ge = n), (Xt = null), (t = !0))
                : (t = !1)),
            t || li(n)),
          null
        );
      case 13:
        return jm(t, n, a);
      case 4:
        return (
          Zt(n, n.stateNode.containerInfo),
          (s = n.pendingProps),
          t === null ? (n.child = Fi(n, null, s, a)) : ve(t, n, s, a),
          n.child
        );
      case 11:
        return Cm(t, n, n.type, n.pendingProps, a);
      case 7:
        return ve(t, n, n.pendingProps, a), n.child;
      case 8:
        return ve(t, n, n.pendingProps.children, a), n.child;
      case 12:
        return ve(t, n, n.pendingProps.children, a), n.child;
      case 10:
        return (
          (s = n.pendingProps),
          ai(n, n.type, s.value),
          ve(t, n, s.children, a),
          n.child
        );
      case 9:
        return (
          (f = n.type._context),
          (s = n.pendingProps.children),
          qi(n),
          (f = ye(f)),
          (s = s(f)),
          (n.flags |= 1),
          ve(t, n, s, a),
          n.child
        );
      case 14:
        return Mm(t, n, n.type, n.pendingProps, a);
      case 15:
        return Dm(t, n, n.type, n.pendingProps, a);
      case 19:
        return Vm(t, n, a);
      case 31:
        return NS(t, n, a);
      case 22:
        return zm(t, n, a, n.pendingProps);
      case 24:
        return (
          qi(n),
          (s = ye(le)),
          t === null
            ? ((f = Du()),
              f === null &&
                ((f = Gt),
                (d = Cu()),
                (f.pooledCache = d),
                d.refCount++,
                d !== null && (f.pooledCacheLanes |= a),
                (f = d)),
              (n.memoizedState = { parent: s, cache: f }),
              Ou(n),
              ai(n, le, f))
            : ((t.lanes & a) !== 0 && (Ru(t, n), _a(n, null, null, a), Ra()),
              (f = t.memoizedState),
              (d = n.memoizedState),
              f.parent !== s
                ? ((f = { parent: s, cache: s }),
                  (n.memoizedState = f),
                  n.lanes === 0 &&
                    (n.memoizedState = n.updateQueue.baseState = f),
                  ai(n, le, s))
                : ((s = d.cache),
                  ai(n, le, s),
                  s !== f.cache && ku(n, [le], a, !0))),
          ve(t, n, n.pendingProps.children, a),
          n.child
        );
      case 29:
        throw n.pendingProps;
    }
    throw Error(r(156, n.tag));
  }
  function Yn(t) {
    t.flags |= 4;
  }
  function dc(t, n, a, s, f) {
    if (((n = (t.mode & 32) !== 0) && (n = !1), n)) {
      if (((t.flags |= 16777216), (f & 335544128) === f))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (hg()) t.flags |= 8192;
        else throw ((Yi = rs), zu);
    } else t.flags &= -16777217;
  }
  function Hm(t, n) {
    if (n.type !== 'stylesheet' || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (((t.flags |= 16777216), !ey(n)))
      if (hg()) t.flags |= 8192;
      else throw ((Yi = rs), zu);
  }
  function As(t, n) {
    n !== null && (t.flags |= 4),
      t.flags & 16384 &&
        ((n = t.tag !== 22 ? xd() : 536870912), (t.lanes |= n), (Vl |= n));
  }
  function Ua(t, n) {
    if (!zt)
      switch (t.tailMode) {
        case 'hidden':
          n = t.tail;
          for (var a = null; n !== null; )
            n.alternate !== null && (a = n), (n = n.sibling);
          a === null ? (t.tail = null) : (a.sibling = null);
          break;
        case 'collapsed':
          a = t.tail;
          for (var s = null; a !== null; )
            a.alternate !== null && (s = a), (a = a.sibling);
          s === null
            ? n || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (s.sibling = null);
      }
  }
  function Qt(t) {
    var n = t.alternate !== null && t.alternate.child === t.child,
      a = 0,
      s = 0;
    if (n)
      for (var f = t.child; f !== null; )
        (a |= f.lanes | f.childLanes),
          (s |= f.subtreeFlags & 65011712),
          (s |= f.flags & 65011712),
          (f.return = t),
          (f = f.sibling);
    else
      for (f = t.child; f !== null; )
        (a |= f.lanes | f.childLanes),
          (s |= f.subtreeFlags),
          (s |= f.flags),
          (f.return = t),
          (f = f.sibling);
    return (t.subtreeFlags |= s), (t.childLanes = a), n;
  }
  function jS(t, n, a) {
    var s = n.pendingProps;
    switch ((Su(n), n.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Qt(n), null;
      case 1:
        return Qt(n), null;
      case 3:
        return (
          (a = n.stateNode),
          (s = null),
          t !== null && (s = t.memoizedState.cache),
          n.memoizedState.cache !== s && (n.flags |= 2048),
          Hn(le),
          Vt(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (t === null || t.child === null) &&
            (El(n)
              ? Yn(n)
              : t === null ||
                (t.memoizedState.isDehydrated && (n.flags & 256) === 0) ||
                ((n.flags |= 1024), Au())),
          Qt(n),
          null
        );
      case 26:
        var f = n.type,
          d = n.memoizedState;
        return (
          t === null
            ? (Yn(n),
              d !== null ? (Qt(n), Hm(n, d)) : (Qt(n), dc(n, f, null, s, a)))
            : d
              ? d !== t.memoizedState
                ? (Yn(n), Qt(n), Hm(n, d))
                : (Qt(n), (n.flags &= -16777217))
              : ((t = t.memoizedProps),
                t !== s && Yn(n),
                Qt(n),
                dc(n, f, t, s, a)),
          null
        );
      case 27:
        if (
          (On(n),
          (a = ft.current),
          (f = n.type),
          t !== null && n.stateNode != null)
        )
          t.memoizedProps !== s && Yn(n);
        else {
          if (!s) {
            if (n.stateNode === null) throw Error(r(166));
            return Qt(n), null;
          }
          (t = at.current),
            El(n) ? xp(n) : ((t = Xg(f, s, a)), (n.stateNode = t), Yn(n));
        }
        return Qt(n), null;
      case 5:
        if ((On(n), (f = n.type), t !== null && n.stateNode != null))
          t.memoizedProps !== s && Yn(n);
        else {
          if (!s) {
            if (n.stateNode === null) throw Error(r(166));
            return Qt(n), null;
          }
          if (((d = at.current), El(n))) xp(n);
          else {
            var v = Vs(ft.current);
            switch (d) {
              case 1:
                d = v.createElementNS('http://www.w3.org/2000/svg', f);
                break;
              case 2:
                d = v.createElementNS('http://www.w3.org/1998/Math/MathML', f);
                break;
              default:
                switch (f) {
                  case 'svg':
                    d = v.createElementNS('http://www.w3.org/2000/svg', f);
                    break;
                  case 'math':
                    d = v.createElementNS(
                      'http://www.w3.org/1998/Math/MathML',
                      f,
                    );
                    break;
                  case 'script':
                    (d = v.createElement('div')),
                      (d.innerHTML = '<script><\/script>'),
                      (d = d.removeChild(d.firstChild));
                    break;
                  case 'select':
                    (d =
                      typeof s.is == 'string'
                        ? v.createElement('select', { is: s.is })
                        : v.createElement('select')),
                      s.multiple
                        ? (d.multiple = !0)
                        : s.size && (d.size = s.size);
                    break;
                  default:
                    d =
                      typeof s.is == 'string'
                        ? v.createElement(f, { is: s.is })
                        : v.createElement(f);
                }
            }
            (d[me] = n), (d[Re] = s);
            t: for (v = n.child; v !== null; ) {
              if (v.tag === 5 || v.tag === 6) d.appendChild(v.stateNode);
              else if (v.tag !== 4 && v.tag !== 27 && v.child !== null) {
                (v.child.return = v), (v = v.child);
                continue;
              }
              if (v === n) break t;
              for (; v.sibling === null; ) {
                if (v.return === null || v.return === n) break t;
                v = v.return;
              }
              (v.sibling.return = v.return), (v = v.sibling);
            }
            n.stateNode = d;
            t: switch ((xe(d, f, s), f)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                s = !!s.autoFocus;
                break t;
              case 'img':
                s = !0;
                break t;
              default:
                s = !1;
            }
            s && Yn(n);
          }
        }
        return (
          Qt(n),
          dc(n, n.type, t === null ? null : t.memoizedProps, n.pendingProps, a),
          null
        );
      case 6:
        if (t && n.stateNode != null) t.memoizedProps !== s && Yn(n);
        else {
          if (typeof s != 'string' && n.stateNode === null) throw Error(r(166));
          if (((t = ft.current), El(n))) {
            if (
              ((t = n.stateNode),
              (a = n.memoizedProps),
              (s = null),
              (f = ge),
              f !== null)
            )
              switch (f.tag) {
                case 27:
                case 5:
                  s = f.memoizedProps;
              }
            (t[me] = n),
              (t = !!(
                t.nodeValue === a ||
                (s !== null && s.suppressHydrationWarning === !0) ||
                jg(t.nodeValue, a)
              )),
              t || li(n, !0);
          } else (t = Vs(t).createTextNode(s)), (t[me] = n), (n.stateNode = t);
        }
        return Qt(n), null;
      case 31:
        if (((a = n.memoizedState), t === null || t.memoizedState !== null)) {
          if (((s = El(n)), a !== null)) {
            if (t === null) {
              if (!s) throw Error(r(318));
              if (
                ((t = n.memoizedState),
                (t = t !== null ? t.dehydrated : null),
                !t)
              )
                throw Error(r(557));
              t[me] = n;
            } else
              Ui(),
                (n.flags & 128) === 0 && (n.memoizedState = null),
                (n.flags |= 4);
            Qt(n), (t = !1);
          } else
            (a = Au()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = a),
              (t = !0);
          if (!t) return n.flags & 256 ? (Fe(n), n) : (Fe(n), null);
          if ((n.flags & 128) !== 0) throw Error(r(558));
        }
        return Qt(n), null;
      case 13:
        if (
          ((s = n.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((f = El(n)), s !== null && s.dehydrated !== null)) {
            if (t === null) {
              if (!f) throw Error(r(318));
              if (
                ((f = n.memoizedState),
                (f = f !== null ? f.dehydrated : null),
                !f)
              )
                throw Error(r(317));
              f[me] = n;
            } else
              Ui(),
                (n.flags & 128) === 0 && (n.memoizedState = null),
                (n.flags |= 4);
            Qt(n), (f = !1);
          } else
            (f = Au()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = f),
              (f = !0);
          if (!f) return n.flags & 256 ? (Fe(n), n) : (Fe(n), null);
        }
        return (
          Fe(n),
          (n.flags & 128) !== 0
            ? ((n.lanes = a), n)
            : ((a = s !== null),
              (t = t !== null && t.memoizedState !== null),
              a &&
                ((s = n.child),
                (f = null),
                s.alternate !== null &&
                  s.alternate.memoizedState !== null &&
                  s.alternate.memoizedState.cachePool !== null &&
                  (f = s.alternate.memoizedState.cachePool.pool),
                (d = null),
                s.memoizedState !== null &&
                  s.memoizedState.cachePool !== null &&
                  (d = s.memoizedState.cachePool.pool),
                d !== f && (s.flags |= 2048)),
              a !== t && a && (n.child.flags |= 8192),
              As(n, n.updateQueue),
              Qt(n),
              null)
        );
      case 4:
        return Vt(), t === null && Lc(n.stateNode.containerInfo), Qt(n), null;
      case 10:
        return Hn(n.type), Qt(n), null;
      case 19:
        if ((G(ee), (s = n.memoizedState), s === null)) return Qt(n), null;
        if (((f = (n.flags & 128) !== 0), (d = s.rendering), d === null))
          if (f) Ua(s, !1);
          else {
            if (Wt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = n.child; t !== null; ) {
                if (((d = cs(t)), d !== null)) {
                  for (
                    n.flags |= 128,
                      Ua(s, !1),
                      t = d.updateQueue,
                      n.updateQueue = t,
                      As(n, t),
                      n.subtreeFlags = 0,
                      t = a,
                      a = n.child;
                    a !== null;

                  )
                    pp(a, t), (a = a.sibling);
                  return (
                    A(ee, (ee.current & 1) | 2),
                    zt && Vn(n, s.treeForkCount),
                    n.child
                  );
                }
                t = t.sibling;
              }
            s.tail !== null &&
              Ee() > Ms &&
              ((n.flags |= 128), (f = !0), Ua(s, !1), (n.lanes = 4194304));
          }
        else {
          if (!f)
            if (((t = cs(d)), t !== null)) {
              if (
                ((n.flags |= 128),
                (f = !0),
                (t = t.updateQueue),
                (n.updateQueue = t),
                As(n, t),
                Ua(s, !0),
                s.tail === null &&
                  s.tailMode === 'hidden' &&
                  !d.alternate &&
                  !zt)
              )
                return Qt(n), null;
            } else
              2 * Ee() - s.renderingStartTime > Ms &&
                a !== 536870912 &&
                ((n.flags |= 128), (f = !0), Ua(s, !1), (n.lanes = 4194304));
          s.isBackwards
            ? ((d.sibling = n.child), (n.child = d))
            : ((t = s.last),
              t !== null ? (t.sibling = d) : (n.child = d),
              (s.last = d));
        }
        return s.tail !== null
          ? ((t = s.tail),
            (s.rendering = t),
            (s.tail = t.sibling),
            (s.renderingStartTime = Ee()),
            (t.sibling = null),
            (a = ee.current),
            A(ee, f ? (a & 1) | 2 : a & 1),
            zt && Vn(n, s.treeForkCount),
            t)
          : (Qt(n), null);
      case 22:
      case 23:
        return (
          Fe(n),
          ju(),
          (s = n.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== s && (n.flags |= 8192)
            : s && (n.flags |= 8192),
          s
            ? (a & 536870912) !== 0 &&
              (n.flags & 128) === 0 &&
              (Qt(n), n.subtreeFlags & 6 && (n.flags |= 8192))
            : Qt(n),
          (a = n.updateQueue),
          a !== null && As(n, a.retryQueue),
          (a = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          (s = null),
          n.memoizedState !== null &&
            n.memoizedState.cachePool !== null &&
            (s = n.memoizedState.cachePool.pool),
          s !== a && (n.flags |= 2048),
          t !== null && G(Pi),
          null
        );
      case 24:
        return (
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          n.memoizedState.cache !== a && (n.flags |= 2048),
          Hn(le),
          Qt(n),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, n.tag));
  }
  function BS(t, n) {
    switch ((Su(n), n.tag)) {
      case 1:
        return (
          (t = n.flags), t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 3:
        return (
          Hn(le),
          Vt(),
          (t = n.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((n.flags = (t & -65537) | 128), n)
            : null
        );
      case 26:
      case 27:
      case 5:
        return On(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if ((Fe(n), n.alternate === null)) throw Error(r(340));
          Ui();
        }
        return (
          (t = n.flags), t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 13:
        if (
          (Fe(n), (t = n.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (n.alternate === null) throw Error(r(340));
          Ui();
        }
        return (
          (t = n.flags), t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 19:
        return G(ee), null;
      case 4:
        return Vt(), null;
      case 10:
        return Hn(n.type), null;
      case 22:
      case 23:
        return (
          Fe(n),
          ju(),
          t !== null && G(Pi),
          (t = n.flags),
          t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 24:
        return Hn(le), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function qm(t, n) {
    switch ((Su(n), n.tag)) {
      case 3:
        Hn(le), Vt();
        break;
      case 26:
      case 27:
      case 5:
        On(n);
        break;
      case 4:
        Vt();
        break;
      case 31:
        n.memoizedState !== null && Fe(n);
        break;
      case 13:
        Fe(n);
        break;
      case 19:
        G(ee);
        break;
      case 10:
        Hn(n.type);
        break;
      case 22:
      case 23:
        Fe(n), ju(), t !== null && G(Pi);
        break;
      case 24:
        Hn(le);
    }
  }
  function Ha(t, n) {
    try {
      var a = n.updateQueue,
        s = a !== null ? a.lastEffect : null;
      if (s !== null) {
        var f = s.next;
        a = f;
        do {
          if ((a.tag & t) === t) {
            s = void 0;
            var d = a.create,
              v = a.inst;
            (s = d()), (v.destroy = s);
          }
          a = a.next;
        } while (a !== f);
      }
    } catch (S) {
      Bt(n, n.return, S);
    }
  }
  function fi(t, n, a) {
    try {
      var s = n.updateQueue,
        f = s !== null ? s.lastEffect : null;
      if (f !== null) {
        var d = f.next;
        s = d;
        do {
          if ((s.tag & t) === t) {
            var v = s.inst,
              S = v.destroy;
            if (S !== void 0) {
              (v.destroy = void 0), (f = n);
              var k = a,
                B = S;
              try {
                B();
              } catch (P) {
                Bt(f, k, P);
              }
            }
          }
          s = s.next;
        } while (s !== d);
      }
    } catch (P) {
      Bt(n, n.return, P);
    }
  }
  function Pm(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var a = t.stateNode;
      try {
        Rp(n, a);
      } catch (s) {
        Bt(t, t.return, s);
      }
    }
  }
  function Gm(t, n, a) {
    (a.props = Xi(t.type, t.memoizedProps)), (a.state = t.memoizedState);
    try {
      a.componentWillUnmount();
    } catch (s) {
      Bt(t, n, s);
    }
  }
  function qa(t, n) {
    try {
      var a = t.ref;
      if (a !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var s = t.stateNode;
            break;
          case 30:
            s = t.stateNode;
            break;
          default:
            s = t.stateNode;
        }
        typeof a == 'function' ? (t.refCleanup = a(s)) : (a.current = s);
      }
    } catch (f) {
      Bt(t, n, f);
    }
  }
  function An(t, n) {
    var a = t.ref,
      s = t.refCleanup;
    if (a !== null)
      if (typeof s == 'function')
        try {
          s();
        } catch (f) {
          Bt(t, n, f);
        } finally {
          (t.refCleanup = null),
            (t = t.alternate),
            t != null && (t.refCleanup = null);
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (f) {
          Bt(t, n, f);
        }
      else a.current = null;
  }
  function Ym(t) {
    var n = t.type,
      a = t.memoizedProps,
      s = t.stateNode;
    try {
      t: switch (n) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          a.autoFocus && s.focus();
          break t;
        case 'img':
          a.src ? (s.src = a.src) : a.srcSet && (s.srcset = a.srcSet);
      }
    } catch (f) {
      Bt(t, t.return, f);
    }
  }
  function pc(t, n, a) {
    try {
      var s = t.stateNode;
      aT(s, t.type, a, n), (s[Re] = n);
    } catch (f) {
      Bt(t, t.return, f);
    }
  }
  function Fm(t) {
    return (
      t.tag === 5 ||
      t.tag === 3 ||
      t.tag === 26 ||
      (t.tag === 27 && vi(t.type)) ||
      t.tag === 4
    );
  }
  function mc(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Fm(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;

      ) {
        if (
          (t.tag === 27 && vi(t.type)) ||
          t.flags & 2 ||
          t.child === null ||
          t.tag === 4
        )
          continue t;
        (t.child.return = t), (t = t.child);
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function gc(t, n, a) {
    var s = t.tag;
    if (s === 5 || s === 6)
      (t = t.stateNode),
        n
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === 'HTML'
                ? a.ownerDocument.body
                : a
            ).insertBefore(t, n)
          : ((n =
              a.nodeType === 9
                ? a.body
                : a.nodeName === 'HTML'
                  ? a.ownerDocument.body
                  : a),
            n.appendChild(t),
            (a = a._reactRootContainer),
            a != null || n.onclick !== null || (n.onclick = Ln));
    else if (
      s !== 4 &&
      (s === 27 && vi(t.type) && ((a = t.stateNode), (n = null)),
      (t = t.child),
      t !== null)
    )
      for (gc(t, n, a), t = t.sibling; t !== null; )
        gc(t, n, a), (t = t.sibling);
  }
  function ws(t, n, a) {
    var s = t.tag;
    if (s === 5 || s === 6)
      (t = t.stateNode), n ? a.insertBefore(t, n) : a.appendChild(t);
    else if (
      s !== 4 &&
      (s === 27 && vi(t.type) && (a = t.stateNode), (t = t.child), t !== null)
    )
      for (ws(t, n, a), t = t.sibling; t !== null; )
        ws(t, n, a), (t = t.sibling);
  }
  function Im(t) {
    var n = t.stateNode,
      a = t.memoizedProps;
    try {
      for (var s = t.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      xe(n, s, a), (n[me] = t), (n[Re] = a);
    } catch (d) {
      Bt(t, t.return, d);
    }
  }
  var Fn = !1,
    se = !1,
    yc = !1,
    Xm = typeof WeakSet == 'function' ? WeakSet : Set,
    pe = null;
  function VS(t, n) {
    if (((t = t.containerInfo), (Vc = Fs), (t = ap(t)), cu(t))) {
      if ('selectionStart' in t)
        var a = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          a = ((a = t.ownerDocument) && a.defaultView) || window;
          var s = a.getSelection && a.getSelection();
          if (s && s.rangeCount !== 0) {
            a = s.anchorNode;
            var f = s.anchorOffset,
              d = s.focusNode;
            s = s.focusOffset;
            try {
              a.nodeType, d.nodeType;
            } catch {
              a = null;
              break t;
            }
            var v = 0,
              S = -1,
              k = -1,
              B = 0,
              P = 0,
              X = t,
              U = null;
            e: for (;;) {
              for (
                var q;
                X !== a || (f !== 0 && X.nodeType !== 3) || (S = v + f),
                  X !== d || (s !== 0 && X.nodeType !== 3) || (k = v + s),
                  X.nodeType === 3 && (v += X.nodeValue.length),
                  (q = X.firstChild) !== null;

              )
                (U = X), (X = q);
              for (;;) {
                if (X === t) break e;
                if (
                  (U === a && ++B === f && (S = v),
                  U === d && ++P === s && (k = v),
                  (q = X.nextSibling) !== null)
                )
                  break;
                (X = U), (U = X.parentNode);
              }
              X = q;
            }
            a = S === -1 || k === -1 ? null : { start: S, end: k };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      Uc = { focusedElem: t, selectionRange: a }, Fs = !1, pe = n;
      pe !== null;

    )
      if (
        ((n = pe), (t = n.child), (n.subtreeFlags & 1028) !== 0 && t !== null)
      )
        (t.return = n), (pe = t);
      else
        for (; pe !== null; ) {
          switch (((n = pe), (d = n.alternate), (t = n.flags), n.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = n.updateQueue),
                (t = t !== null ? t.events : null),
                t !== null)
              )
                for (a = 0; a < t.length; a++)
                  (f = t[a]), (f.ref.impl = f.nextImpl);
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && d !== null) {
                (t = void 0),
                  (a = n),
                  (f = d.memoizedProps),
                  (d = d.memoizedState),
                  (s = a.stateNode);
                try {
                  var ot = Xi(a.type, f);
                  (t = s.getSnapshotBeforeUpdate(ot, d)),
                    (s.__reactInternalSnapshotBeforeUpdate = t);
                } catch (mt) {
                  Bt(a, a.return, mt);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (
                  ((t = n.stateNode.containerInfo), (a = t.nodeType), a === 9)
                )
                  Pc(t);
                else if (a === 1)
                  switch (t.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Pc(t);
                      break;
                    default:
                      t.textContent = '';
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(r(163));
          }
          if (((t = n.sibling), t !== null)) {
            (t.return = n.return), (pe = t);
            break;
          }
          pe = n.return;
        }
  }
  function Qm(t, n, a) {
    var s = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Xn(t, a), s & 4 && Ha(5, a);
        break;
      case 1:
        if ((Xn(t, a), s & 4))
          if (((t = a.stateNode), n === null))
            try {
              t.componentDidMount();
            } catch (v) {
              Bt(a, a.return, v);
            }
          else {
            var f = Xi(a.type, n.memoizedProps);
            n = n.memoizedState;
            try {
              t.componentDidUpdate(f, n, t.__reactInternalSnapshotBeforeUpdate);
            } catch (v) {
              Bt(a, a.return, v);
            }
          }
        s & 64 && Pm(a), s & 512 && qa(a, a.return);
        break;
      case 3:
        if ((Xn(t, a), s & 64 && ((t = a.updateQueue), t !== null))) {
          if (((n = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                n = a.child.stateNode;
                break;
              case 1:
                n = a.child.stateNode;
            }
          try {
            Rp(t, n);
          } catch (v) {
            Bt(a, a.return, v);
          }
        }
        break;
      case 27:
        n === null && s & 4 && Im(a);
      case 26:
      case 5:
        Xn(t, a), n === null && s & 4 && Ym(a), s & 512 && qa(a, a.return);
        break;
      case 12:
        Xn(t, a);
        break;
      case 31:
        Xn(t, a), s & 4 && Jm(t, a);
        break;
      case 13:
        Xn(t, a),
          s & 4 && $m(t, a),
          s & 64 &&
            ((t = a.memoizedState),
            t !== null &&
              ((t = t.dehydrated),
              t !== null && ((a = XS.bind(null, a)), dT(t, a))));
        break;
      case 22:
        if (((s = a.memoizedState !== null || Fn), !s)) {
          (n = (n !== null && n.memoizedState !== null) || se), (f = Fn);
          var d = se;
          (Fn = s),
            (se = n) && !d ? Qn(t, a, (a.subtreeFlags & 8772) !== 0) : Xn(t, a),
            (Fn = f),
            (se = d);
        }
        break;
      case 30:
        break;
      default:
        Xn(t, a);
    }
  }
  function Km(t) {
    var n = t.alternate;
    n !== null && ((t.alternate = null), Km(n)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((n = t.stateNode), n !== null && Xo(n)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null);
  }
  var Jt = null,
    Ne = !1;
  function In(t, n, a) {
    for (a = a.child; a !== null; ) Zm(t, n, a), (a = a.sibling);
  }
  function Zm(t, n, a) {
    if (ce && typeof ce.onCommitFiberUnmount == 'function')
      try {
        ce.onCommitFiberUnmount(ke, a);
      } catch {}
    switch (a.tag) {
      case 26:
        se || An(a, n),
          In(t, n, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a));
        break;
      case 27:
        se || An(a, n);
        var s = Jt,
          f = Ne;
        vi(a.type) && ((Jt = a.stateNode), (Ne = !1)),
          In(t, n, a),
          Za(a.stateNode),
          (Jt = s),
          (Ne = f);
        break;
      case 5:
        se || An(a, n);
      case 6:
        if (
          ((s = Jt),
          (f = Ne),
          (Jt = null),
          In(t, n, a),
          (Jt = s),
          (Ne = f),
          Jt !== null)
        )
          if (Ne)
            try {
              (Jt.nodeType === 9
                ? Jt.body
                : Jt.nodeName === 'HTML'
                  ? Jt.ownerDocument.body
                  : Jt
              ).removeChild(a.stateNode);
            } catch (d) {
              Bt(a, n, d);
            }
          else
            try {
              Jt.removeChild(a.stateNode);
            } catch (d) {
              Bt(a, n, d);
            }
        break;
      case 18:
        Jt !== null &&
          (Ne
            ? ((t = Jt),
              Pg(
                t.nodeType === 9
                  ? t.body
                  : t.nodeName === 'HTML'
                    ? t.ownerDocument.body
                    : t,
                a.stateNode,
              ),
              Il(t))
            : Pg(Jt, a.stateNode));
        break;
      case 4:
        (s = Jt),
          (f = Ne),
          (Jt = a.stateNode.containerInfo),
          (Ne = !0),
          In(t, n, a),
          (Jt = s),
          (Ne = f);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        fi(2, a, n), se || fi(4, a, n), In(t, n, a);
        break;
      case 1:
        se ||
          (An(a, n),
          (s = a.stateNode),
          typeof s.componentWillUnmount == 'function' && Gm(a, n, s)),
          In(t, n, a);
        break;
      case 21:
        In(t, n, a);
        break;
      case 22:
        (se = (s = se) || a.memoizedState !== null), In(t, n, a), (se = s);
        break;
      default:
        In(t, n, a);
    }
  }
  function Jm(t, n) {
    if (
      n.memoizedState === null &&
      ((t = n.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        Il(t);
      } catch (a) {
        Bt(n, n.return, a);
      }
    }
  }
  function $m(t, n) {
    if (
      n.memoizedState === null &&
      ((t = n.alternate),
      t !== null &&
        ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        Il(t);
      } catch (a) {
        Bt(n, n.return, a);
      }
  }
  function US(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new Xm()), n;
      case 22:
        return (
          (t = t.stateNode),
          (n = t._retryCache),
          n === null && (n = t._retryCache = new Xm()),
          n
        );
      default:
        throw Error(r(435, t.tag));
    }
  }
  function Es(t, n) {
    var a = US(t);
    n.forEach(function (s) {
      if (!a.has(s)) {
        a.add(s);
        var f = QS.bind(null, t, s);
        s.then(f, f);
      }
    });
  }
  function Le(t, n) {
    var a = n.deletions;
    if (a !== null)
      for (var s = 0; s < a.length; s++) {
        var f = a[s],
          d = t,
          v = n,
          S = v;
        t: for (; S !== null; ) {
          switch (S.tag) {
            case 27:
              if (vi(S.type)) {
                (Jt = S.stateNode), (Ne = !1);
                break t;
              }
              break;
            case 5:
              (Jt = S.stateNode), (Ne = !1);
              break t;
            case 3:
            case 4:
              (Jt = S.stateNode.containerInfo), (Ne = !0);
              break t;
          }
          S = S.return;
        }
        if (Jt === null) throw Error(r(160));
        Zm(d, v, f),
          (Jt = null),
          (Ne = !1),
          (d = f.alternate),
          d !== null && (d.return = null),
          (f.return = null);
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; ) Wm(n, t), (n = n.sibling);
  }
  var mn = null;
  function Wm(t, n) {
    var a = t.alternate,
      s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Le(n, t),
          je(t),
          s & 4 && (fi(3, t, t.return), Ha(3, t), fi(5, t, t.return));
        break;
      case 1:
        Le(n, t),
          je(t),
          s & 512 && (se || a === null || An(a, a.return)),
          s & 64 &&
            Fn &&
            ((t = t.updateQueue),
            t !== null &&
              ((s = t.callbacks),
              s !== null &&
                ((a = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = a === null ? s : a.concat(s)))));
        break;
      case 26:
        var f = mn;
        if (
          (Le(n, t),
          je(t),
          s & 512 && (se || a === null || An(a, a.return)),
          s & 4)
        ) {
          var d = a !== null ? a.memoizedState : null;
          if (((s = t.memoizedState), a === null))
            if (s === null)
              if (t.stateNode === null) {
                t: {
                  (s = t.type),
                    (a = t.memoizedProps),
                    (f = f.ownerDocument || f);
                  e: switch (s) {
                    case 'title':
                      (d = f.getElementsByTagName('title')[0]),
                        (!d ||
                          d[pa] ||
                          d[me] ||
                          d.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          d.hasAttribute('itemprop')) &&
                          ((d = f.createElement(s)),
                          f.head.insertBefore(
                            d,
                            f.querySelector('head > title'),
                          )),
                        xe(d, s, a),
                        (d[me] = t),
                        de(d),
                        (s = d);
                      break t;
                    case 'link':
                      var v = Wg('link', 'href', f).get(s + (a.href || ''));
                      if (v) {
                        for (var S = 0; S < v.length; S++)
                          if (
                            ((d = v[S]),
                            d.getAttribute('href') ===
                              (a.href == null || a.href === ''
                                ? null
                                : a.href) &&
                              d.getAttribute('rel') ===
                                (a.rel == null ? null : a.rel) &&
                              d.getAttribute('title') ===
                                (a.title == null ? null : a.title) &&
                              d.getAttribute('crossorigin') ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            v.splice(S, 1);
                            break e;
                          }
                      }
                      (d = f.createElement(s)),
                        xe(d, s, a),
                        f.head.appendChild(d);
                      break;
                    case 'meta':
                      if (
                        (v = Wg('meta', 'content', f).get(
                          s + (a.content || ''),
                        ))
                      ) {
                        for (S = 0; S < v.length; S++)
                          if (
                            ((d = v[S]),
                            d.getAttribute('content') ===
                              (a.content == null ? null : '' + a.content) &&
                              d.getAttribute('name') ===
                                (a.name == null ? null : a.name) &&
                              d.getAttribute('property') ===
                                (a.property == null ? null : a.property) &&
                              d.getAttribute('http-equiv') ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              d.getAttribute('charset') ===
                                (a.charSet == null ? null : a.charSet))
                          ) {
                            v.splice(S, 1);
                            break e;
                          }
                      }
                      (d = f.createElement(s)),
                        xe(d, s, a),
                        f.head.appendChild(d);
                      break;
                    default:
                      throw Error(r(468, s));
                  }
                  (d[me] = t), de(d), (s = d);
                }
                t.stateNode = s;
              } else ty(f, t.type, t.stateNode);
            else t.stateNode = $g(f, s, t.memoizedProps);
          else
            d !== s
              ? (d === null
                  ? a.stateNode !== null &&
                    ((a = a.stateNode), a.parentNode.removeChild(a))
                  : d.count--,
                s === null
                  ? ty(f, t.type, t.stateNode)
                  : $g(f, s, t.memoizedProps))
              : s === null &&
                t.stateNode !== null &&
                pc(t, t.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        Le(n, t),
          je(t),
          s & 512 && (se || a === null || An(a, a.return)),
          a !== null && s & 4 && pc(t, t.memoizedProps, a.memoizedProps);
        break;
      case 5:
        if (
          (Le(n, t),
          je(t),
          s & 512 && (se || a === null || An(a, a.return)),
          t.flags & 32)
        ) {
          f = t.stateNode;
          try {
            ml(f, '');
          } catch (ot) {
            Bt(t, t.return, ot);
          }
        }
        s & 4 &&
          t.stateNode != null &&
          ((f = t.memoizedProps), pc(t, f, a !== null ? a.memoizedProps : f)),
          s & 1024 && (yc = !0);
        break;
      case 6:
        if ((Le(n, t), je(t), s & 4)) {
          if (t.stateNode === null) throw Error(r(162));
          (s = t.memoizedProps), (a = t.stateNode);
          try {
            a.nodeValue = s;
          } catch (ot) {
            Bt(t, t.return, ot);
          }
        }
        break;
      case 3:
        if (
          ((qs = null),
          (f = mn),
          (mn = Us(n.containerInfo)),
          Le(n, t),
          (mn = f),
          je(t),
          s & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Il(n.containerInfo);
          } catch (ot) {
            Bt(t, t.return, ot);
          }
        yc && ((yc = !1), tg(t));
        break;
      case 4:
        (s = mn),
          (mn = Us(t.stateNode.containerInfo)),
          Le(n, t),
          je(t),
          (mn = s);
        break;
      case 12:
        Le(n, t), je(t);
        break;
      case 31:
        Le(n, t),
          je(t),
          s & 4 &&
            ((s = t.updateQueue),
            s !== null && ((t.updateQueue = null), Es(t, s)));
        break;
      case 13:
        Le(n, t),
          je(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) !=
              (a !== null && a.memoizedState !== null) &&
            (Cs = Ee()),
          s & 4 &&
            ((s = t.updateQueue),
            s !== null && ((t.updateQueue = null), Es(t, s)));
        break;
      case 22:
        f = t.memoizedState !== null;
        var k = a !== null && a.memoizedState !== null,
          B = Fn,
          P = se;
        if (
          ((Fn = B || f),
          (se = P || k),
          Le(n, t),
          (se = P),
          (Fn = B),
          je(t),
          s & 8192)
        )
          t: for (
            n = t.stateNode,
              n._visibility = f ? n._visibility & -2 : n._visibility | 1,
              f && (a === null || k || Fn || se || Qi(t)),
              a = null,
              n = t;
            ;

          ) {
            if (n.tag === 5 || n.tag === 26) {
              if (a === null) {
                k = a = n;
                try {
                  if (((d = k.stateNode), f))
                    (v = d.style),
                      typeof v.setProperty == 'function'
                        ? v.setProperty('display', 'none', 'important')
                        : (v.display = 'none');
                  else {
                    S = k.stateNode;
                    var X = k.memoizedProps.style,
                      U =
                        X != null && X.hasOwnProperty('display')
                          ? X.display
                          : null;
                    S.style.display =
                      U == null || typeof U == 'boolean' ? '' : ('' + U).trim();
                  }
                } catch (ot) {
                  Bt(k, k.return, ot);
                }
              }
            } else if (n.tag === 6) {
              if (a === null) {
                k = n;
                try {
                  k.stateNode.nodeValue = f ? '' : k.memoizedProps;
                } catch (ot) {
                  Bt(k, k.return, ot);
                }
              }
            } else if (n.tag === 18) {
              if (a === null) {
                k = n;
                try {
                  var q = k.stateNode;
                  f ? Gg(q, !0) : Gg(k.stateNode, !1);
                } catch (ot) {
                  Bt(k, k.return, ot);
                }
              }
            } else if (
              ((n.tag !== 22 && n.tag !== 23) ||
                n.memoizedState === null ||
                n === t) &&
              n.child !== null
            ) {
              (n.child.return = n), (n = n.child);
              continue;
            }
            if (n === t) break t;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === t) break t;
              a === n && (a = null), (n = n.return);
            }
            a === n && (a = null),
              (n.sibling.return = n.return),
              (n = n.sibling);
          }
        s & 4 &&
          ((s = t.updateQueue),
          s !== null &&
            ((a = s.retryQueue),
            a !== null && ((s.retryQueue = null), Es(t, a))));
        break;
      case 19:
        Le(n, t),
          je(t),
          s & 4 &&
            ((s = t.updateQueue),
            s !== null && ((t.updateQueue = null), Es(t, s)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Le(n, t), je(t);
    }
  }
  function je(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var a, s = t.return; s !== null; ) {
          if (Fm(s)) {
            a = s;
            break;
          }
          s = s.return;
        }
        if (a == null) throw Error(r(160));
        switch (a.tag) {
          case 27:
            var f = a.stateNode,
              d = mc(t);
            ws(t, d, f);
            break;
          case 5:
            var v = a.stateNode;
            a.flags & 32 && (ml(v, ''), (a.flags &= -33));
            var S = mc(t);
            ws(t, S, v);
            break;
          case 3:
          case 4:
            var k = a.stateNode.containerInfo,
              B = mc(t);
            gc(t, B, k);
            break;
          default:
            throw Error(r(161));
        }
      } catch (P) {
        Bt(t, t.return, P);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function tg(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        tg(n),
          n.tag === 5 && n.flags & 1024 && n.stateNode.reset(),
          (t = t.sibling);
      }
  }
  function Xn(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; ) Qm(t, n.alternate, n), (n = n.sibling);
  }
  function Qi(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          fi(4, n, n.return), Qi(n);
          break;
        case 1:
          An(n, n.return);
          var a = n.stateNode;
          typeof a.componentWillUnmount == 'function' && Gm(n, n.return, a),
            Qi(n);
          break;
        case 27:
          Za(n.stateNode);
        case 26:
        case 5:
          An(n, n.return), Qi(n);
          break;
        case 22:
          n.memoizedState === null && Qi(n);
          break;
        case 30:
          Qi(n);
          break;
        default:
          Qi(n);
      }
      t = t.sibling;
    }
  }
  function Qn(t, n, a) {
    for (a = a && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var s = n.alternate,
        f = t,
        d = n,
        v = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Qn(f, d, a), Ha(4, d);
          break;
        case 1:
          if (
            (Qn(f, d, a),
            (s = d),
            (f = s.stateNode),
            typeof f.componentDidMount == 'function')
          )
            try {
              f.componentDidMount();
            } catch (B) {
              Bt(s, s.return, B);
            }
          if (((s = d), (f = s.updateQueue), f !== null)) {
            var S = s.stateNode;
            try {
              var k = f.shared.hiddenCallbacks;
              if (k !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < k.length; f++)
                  Op(k[f], S);
            } catch (B) {
              Bt(s, s.return, B);
            }
          }
          a && v & 64 && Pm(d), qa(d, d.return);
          break;
        case 27:
          Im(d);
        case 26:
        case 5:
          Qn(f, d, a), a && s === null && v & 4 && Ym(d), qa(d, d.return);
          break;
        case 12:
          Qn(f, d, a);
          break;
        case 31:
          Qn(f, d, a), a && v & 4 && Jm(f, d);
          break;
        case 13:
          Qn(f, d, a), a && v & 4 && $m(f, d);
          break;
        case 22:
          d.memoizedState === null && Qn(f, d, a), qa(d, d.return);
          break;
        case 30:
          break;
        default:
          Qn(f, d, a);
      }
      n = n.sibling;
    }
  }
  function vc(t, n) {
    var a = null;
    t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (a = t.memoizedState.cachePool.pool),
      (t = null),
      n.memoizedState !== null &&
        n.memoizedState.cachePool !== null &&
        (t = n.memoizedState.cachePool.pool),
      t !== a && (t != null && t.refCount++, a != null && Ca(a));
  }
  function xc(t, n) {
    (t = null),
      n.alternate !== null && (t = n.alternate.memoizedState.cache),
      (n = n.memoizedState.cache),
      n !== t && (n.refCount++, t != null && Ca(t));
  }
  function gn(t, n, a, s) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) eg(t, n, a, s), (n = n.sibling);
  }
  function eg(t, n, a, s) {
    var f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        gn(t, n, a, s), f & 2048 && Ha(9, n);
        break;
      case 1:
        gn(t, n, a, s);
        break;
      case 3:
        gn(t, n, a, s),
          f & 2048 &&
            ((t = null),
            n.alternate !== null && (t = n.alternate.memoizedState.cache),
            (n = n.memoizedState.cache),
            n !== t && (n.refCount++, t != null && Ca(t)));
        break;
      case 12:
        if (f & 2048) {
          gn(t, n, a, s), (t = n.stateNode);
          try {
            var d = n.memoizedProps,
              v = d.id,
              S = d.onPostCommit;
            typeof S == 'function' &&
              S(
                v,
                n.alternate === null ? 'mount' : 'update',
                t.passiveEffectDuration,
                -0,
              );
          } catch (k) {
            Bt(n, n.return, k);
          }
        } else gn(t, n, a, s);
        break;
      case 31:
        gn(t, n, a, s);
        break;
      case 13:
        gn(t, n, a, s);
        break;
      case 23:
        break;
      case 22:
        (d = n.stateNode),
          (v = n.alternate),
          n.memoizedState !== null
            ? d._visibility & 2
              ? gn(t, n, a, s)
              : Pa(t, n)
            : d._visibility & 2
              ? gn(t, n, a, s)
              : ((d._visibility |= 2),
                Ll(t, n, a, s, (n.subtreeFlags & 10256) !== 0 || !1)),
          f & 2048 && vc(v, n);
        break;
      case 24:
        gn(t, n, a, s), f & 2048 && xc(n.alternate, n);
        break;
      default:
        gn(t, n, a, s);
    }
  }
  function Ll(t, n, a, s, f) {
    for (
      f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child;
      n !== null;

    ) {
      var d = t,
        v = n,
        S = a,
        k = s,
        B = v.flags;
      switch (v.tag) {
        case 0:
        case 11:
        case 15:
          Ll(d, v, S, k, f), Ha(8, v);
          break;
        case 23:
          break;
        case 22:
          var P = v.stateNode;
          v.memoizedState !== null
            ? P._visibility & 2
              ? Ll(d, v, S, k, f)
              : Pa(d, v)
            : ((P._visibility |= 2), Ll(d, v, S, k, f)),
            f && B & 2048 && vc(v.alternate, v);
          break;
        case 24:
          Ll(d, v, S, k, f), f && B & 2048 && xc(v.alternate, v);
          break;
        default:
          Ll(d, v, S, k, f);
      }
      n = n.sibling;
    }
  }
  function Pa(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var a = t,
          s = n,
          f = s.flags;
        switch (s.tag) {
          case 22:
            Pa(a, s), f & 2048 && vc(s.alternate, s);
            break;
          case 24:
            Pa(a, s), f & 2048 && xc(s.alternate, s);
            break;
          default:
            Pa(a, s);
        }
        n = n.sibling;
      }
  }
  var Ga = 8192;
  function jl(t, n, a) {
    if (t.subtreeFlags & Ga)
      for (t = t.child; t !== null; ) ng(t, n, a), (t = t.sibling);
  }
  function ng(t, n, a) {
    switch (t.tag) {
      case 26:
        jl(t, n, a),
          t.flags & Ga &&
            t.memoizedState !== null &&
            ET(a, mn, t.memoizedState, t.memoizedProps);
        break;
      case 5:
        jl(t, n, a);
        break;
      case 3:
      case 4:
        var s = mn;
        (mn = Us(t.stateNode.containerInfo)), jl(t, n, a), (mn = s);
        break;
      case 22:
        t.memoizedState === null &&
          ((s = t.alternate),
          s !== null && s.memoizedState !== null
            ? ((s = Ga), (Ga = 16777216), jl(t, n, a), (Ga = s))
            : jl(t, n, a));
        break;
      default:
        jl(t, n, a);
    }
  }
  function ig(t) {
    var n = t.alternate;
    if (n !== null && ((t = n.child), t !== null)) {
      n.child = null;
      do (n = t.sibling), (t.sibling = null), (t = n);
      while (t !== null);
    }
  }
  function Ya(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var a = 0; a < n.length; a++) {
          var s = n[a];
          (pe = s), ag(s, t);
        }
      ig(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) lg(t), (t = t.sibling);
  }
  function lg(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ya(t), t.flags & 2048 && fi(9, t, t.return);
        break;
      case 3:
        Ya(t);
        break;
      case 12:
        Ya(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null &&
        n._visibility & 2 &&
        (t.return === null || t.return.tag !== 13)
          ? ((n._visibility &= -3), ks(t))
          : Ya(t);
        break;
      default:
        Ya(t);
    }
  }
  function ks(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var a = 0; a < n.length; a++) {
          var s = n[a];
          (pe = s), ag(s, t);
        }
      ig(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((n = t), n.tag)) {
        case 0:
        case 11:
        case 15:
          fi(8, n, n.return), ks(n);
          break;
        case 22:
          (a = n.stateNode),
            a._visibility & 2 && ((a._visibility &= -3), ks(n));
          break;
        default:
          ks(n);
      }
      t = t.sibling;
    }
  }
  function ag(t, n) {
    for (; pe !== null; ) {
      var a = pe;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          fi(8, a, n);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var s = a.memoizedState.cachePool.pool;
            s != null && s.refCount++;
          }
          break;
        case 24:
          Ca(a.memoizedState.cache);
      }
      if (((s = a.child), s !== null)) (s.return = a), (pe = s);
      else
        t: for (a = t; pe !== null; ) {
          s = pe;
          var f = s.sibling,
            d = s.return;
          if ((Km(s), s === a)) {
            pe = null;
            break t;
          }
          if (f !== null) {
            (f.return = d), (pe = f);
            break t;
          }
          pe = d;
        }
    }
  }
  var HS = {
      getCacheForType: function (t) {
        var n = ye(le),
          a = n.data.get(t);
        return a === void 0 && ((a = t()), n.data.set(t, a)), a;
      },
      cacheSignal: function () {
        return ye(le).controller.signal;
      },
    },
    qS = typeof WeakMap == 'function' ? WeakMap : Map,
    Nt = 0,
    Gt = null,
    wt = null,
    Mt = 0,
    jt = 0,
    Ie = null,
    hi = !1,
    Bl = !1,
    bc = !1,
    Kn = 0,
    Wt = 0,
    di = 0,
    Ki = 0,
    Sc = 0,
    Xe = 0,
    Vl = 0,
    Fa = null,
    Be = null,
    Tc = !1,
    Cs = 0,
    rg = 0,
    Ms = 1 / 0,
    Ds = null,
    pi = null,
    fe = 0,
    mi = null,
    Ul = null,
    Zn = 0,
    Ac = 0,
    wc = null,
    sg = null,
    Ia = 0,
    Ec = null;
  function Qe() {
    return (Nt & 2) !== 0 && Mt !== 0 ? Mt & -Mt : N.T !== null ? Oc() : Ad();
  }
  function og() {
    if (Xe === 0)
      if ((Mt & 536870912) === 0 || zt) {
        var t = Br;
        (Br <<= 1), (Br & 3932160) === 0 && (Br = 262144), (Xe = t);
      } else Xe = 536870912;
    return (t = Ye.current), t !== null && (t.flags |= 32), Xe;
  }
  function Ve(t, n, a) {
    ((t === Gt && (jt === 2 || jt === 9)) || t.cancelPendingCommit !== null) &&
      (Hl(t, 0), gi(t, Mt, Xe, !1)),
      da(t, a),
      ((Nt & 2) === 0 || t !== Gt) &&
        (t === Gt &&
          ((Nt & 2) === 0 && (Ki |= a), Wt === 4 && gi(t, Mt, Xe, !1)),
        wn(t));
  }
  function ug(t, n, a) {
    if ((Nt & 6) !== 0) throw Error(r(327));
    var s = (!a && (n & 127) === 0 && (n & t.expiredLanes) === 0) || ha(t, n),
      f = s ? YS(t, n) : Cc(t, n, !0),
      d = s;
    do {
      if (f === 0) {
        Bl && !s && gi(t, n, 0, !1);
        break;
      } else {
        if (((a = t.current.alternate), d && !PS(a))) {
          (f = Cc(t, n, !1)), (d = !1);
          continue;
        }
        if (f === 2) {
          if (((d = n), t.errorRecoveryDisabledLanes & d)) var v = 0;
          else
            (v = t.pendingLanes & -536870913),
              (v = v !== 0 ? v : v & 536870912 ? 536870912 : 0);
          if (v !== 0) {
            n = v;
            t: {
              var S = t;
              f = Fa;
              var k = S.current.memoizedState.isDehydrated;
              if ((k && (Hl(S, v).flags |= 256), (v = Cc(S, v, !1)), v !== 2)) {
                if (bc && !k) {
                  (S.errorRecoveryDisabledLanes |= d), (Ki |= d), (f = 4);
                  break t;
                }
                (d = Be),
                  (Be = f),
                  d !== null && (Be === null ? (Be = d) : Be.push.apply(Be, d));
              }
              f = v;
            }
            if (((d = !1), f !== 2)) continue;
          }
        }
        if (f === 1) {
          Hl(t, 0), gi(t, n, 0, !0);
          break;
        }
        t: {
          switch (((s = t), (d = f), d)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              gi(s, n, Xe, !hi);
              break t;
            case 2:
              Be = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((n & 62914560) === n && ((f = Cs + 300 - Ee()), 10 < f)) {
            if ((gi(s, n, Xe, !hi), Ur(s, 0, !0) !== 0)) break t;
            (Zn = n),
              (s.timeoutHandle = Hg(
                cg.bind(
                  null,
                  s,
                  a,
                  Be,
                  Ds,
                  Tc,
                  n,
                  Xe,
                  Ki,
                  Vl,
                  hi,
                  d,
                  'Throttled',
                  -0,
                  0,
                ),
                f,
              ));
            break t;
          }
          cg(s, a, Be, Ds, Tc, n, Xe, Ki, Vl, hi, d, null, -0, 0);
        }
      }
      break;
    } while (!0);
    wn(t);
  }
  function cg(t, n, a, s, f, d, v, S, k, B, P, X, U, q) {
    if (
      ((t.timeoutHandle = -1),
      (X = n.subtreeFlags),
      X & 8192 || (X & 16785408) === 16785408)
    ) {
      (X = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ln,
      }),
        ng(n, d, X);
      var ot =
        (d & 62914560) === d ? Cs - Ee() : (d & 4194048) === d ? rg - Ee() : 0;
      if (((ot = kT(X, ot)), ot !== null)) {
        (Zn = d),
          (t.cancelPendingCommit = ot(
            vg.bind(null, t, n, d, a, s, f, v, S, k, P, X, null, U, q),
          )),
          gi(t, d, v, !B);
        return;
      }
    }
    vg(t, n, d, a, s, f, v, S, k);
  }
  function PS(t) {
    for (var n = t; ; ) {
      var a = n.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        n.flags & 16384 &&
        ((a = n.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var s = 0; s < a.length; s++) {
          var f = a[s],
            d = f.getSnapshot;
          f = f.value;
          try {
            if (!Pe(d(), f)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = n.child), n.subtreeFlags & 16384 && a !== null))
        (a.return = n), (n = a);
      else {
        if (n === t) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === t) return !0;
          n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
      }
    }
    return !0;
  }
  function gi(t, n, a, s) {
    (n &= ~Sc),
      (n &= ~Ki),
      (t.suspendedLanes |= n),
      (t.pingedLanes &= ~n),
      s && (t.warmLanes |= n),
      (s = t.expirationTimes);
    for (var f = n; 0 < f; ) {
      var d = 31 - Pt(f),
        v = 1 << d;
      (s[d] = -1), (f &= ~v);
    }
    a !== 0 && bd(t, a, n);
  }
  function zs() {
    return (Nt & 6) === 0 ? (Xa(0), !1) : !0;
  }
  function kc() {
    if (wt !== null) {
      if (jt === 0) var t = wt.return;
      else (t = wt), (Un = Hi = null), Pu(t), (zl = null), (Da = 0), (t = wt);
      for (; t !== null; ) qm(t.alternate, t), (t = t.return);
      wt = null;
    }
  }
  function Hl(t, n) {
    var a = t.timeoutHandle;
    a !== -1 && ((t.timeoutHandle = -1), oT(a)),
      (a = t.cancelPendingCommit),
      a !== null && ((t.cancelPendingCommit = null), a()),
      (Zn = 0),
      kc(),
      (Gt = t),
      (wt = a = Bn(t.current, null)),
      (Mt = n),
      (jt = 0),
      (Ie = null),
      (hi = !1),
      (Bl = ha(t, n)),
      (bc = !1),
      (Vl = Xe = Sc = Ki = di = Wt = 0),
      (Be = Fa = null),
      (Tc = !1),
      (n & 8) !== 0 && (n |= n & 32);
    var s = t.entangledLanes;
    if (s !== 0)
      for (t = t.entanglements, s &= n; 0 < s; ) {
        var f = 31 - Pt(s),
          d = 1 << f;
        (n |= t[f]), (s &= ~d);
      }
    return (Kn = n), Jr(), a;
  }
  function fg(t, n) {
    (bt = null),
      (N.H = Ba),
      n === Dl || n === as
        ? ((n = Cp()), (jt = 3))
        : n === zu
          ? ((n = Cp()), (jt = 4))
          : (jt =
              n === lc
                ? 8
                : n !== null &&
                    typeof n == 'object' &&
                    typeof n.then == 'function'
                  ? 6
                  : 1),
      (Ie = n),
      wt === null && ((Wt = 1), xs(t, nn(n, t.current)));
  }
  function hg() {
    var t = Ye.current;
    return t === null
      ? !0
      : (Mt & 4194048) === Mt
        ? sn === null
        : (Mt & 62914560) === Mt || (Mt & 536870912) !== 0
          ? t === sn
          : !1;
  }
  function dg() {
    var t = N.H;
    return (N.H = Ba), t === null ? Ba : t;
  }
  function pg() {
    var t = N.A;
    return (N.A = HS), t;
  }
  function Os() {
    (Wt = 4),
      hi || ((Mt & 4194048) !== Mt && Ye.current !== null) || (Bl = !0),
      ((di & 134217727) === 0 && (Ki & 134217727) === 0) ||
        Gt === null ||
        gi(Gt, Mt, Xe, !1);
  }
  function Cc(t, n, a) {
    var s = Nt;
    Nt |= 2;
    var f = dg(),
      d = pg();
    (Gt !== t || Mt !== n) && ((Ds = null), Hl(t, n)), (n = !1);
    var v = Wt;
    t: do
      try {
        if (jt !== 0 && wt !== null) {
          var S = wt,
            k = Ie;
          switch (jt) {
            case 8:
              kc(), (v = 6);
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ye.current === null && (n = !0);
              var B = jt;
              if (((jt = 0), (Ie = null), ql(t, S, k, B), a && Bl)) {
                v = 0;
                break t;
              }
              break;
            default:
              (B = jt), (jt = 0), (Ie = null), ql(t, S, k, B);
          }
        }
        GS(), (v = Wt);
        break;
      } catch (P) {
        fg(t, P);
      }
    while (!0);
    return (
      n && t.shellSuspendCounter++,
      (Un = Hi = null),
      (Nt = s),
      (N.H = f),
      (N.A = d),
      wt === null && ((Gt = null), (Mt = 0), Jr()),
      v
    );
  }
  function GS() {
    for (; wt !== null; ) mg(wt);
  }
  function YS(t, n) {
    var a = Nt;
    Nt |= 2;
    var s = dg(),
      f = pg();
    Gt !== t || Mt !== n
      ? ((Ds = null), (Ms = Ee() + 500), Hl(t, n))
      : (Bl = ha(t, n));
    t: do
      try {
        if (jt !== 0 && wt !== null) {
          n = wt;
          var d = Ie;
          e: switch (jt) {
            case 1:
              (jt = 0), (Ie = null), ql(t, n, d, 1);
              break;
            case 2:
            case 9:
              if (Ep(d)) {
                (jt = 0), (Ie = null), gg(n);
                break;
              }
              (n = function () {
                (jt !== 2 && jt !== 9) || Gt !== t || (jt = 7), wn(t);
              }),
                d.then(n, n);
              break t;
            case 3:
              jt = 7;
              break t;
            case 4:
              jt = 5;
              break t;
            case 7:
              Ep(d)
                ? ((jt = 0), (Ie = null), gg(n))
                : ((jt = 0), (Ie = null), ql(t, n, d, 7));
              break;
            case 5:
              var v = null;
              switch (wt.tag) {
                case 26:
                  v = wt.memoizedState;
                case 5:
                case 27:
                  var S = wt;
                  if (v ? ey(v) : S.stateNode.complete) {
                    (jt = 0), (Ie = null);
                    var k = S.sibling;
                    if (k !== null) wt = k;
                    else {
                      var B = S.return;
                      B !== null ? ((wt = B), Rs(B)) : (wt = null);
                    }
                    break e;
                  }
              }
              (jt = 0), (Ie = null), ql(t, n, d, 5);
              break;
            case 6:
              (jt = 0), (Ie = null), ql(t, n, d, 6);
              break;
            case 8:
              kc(), (Wt = 6);
              break t;
            default:
              throw Error(r(462));
          }
        }
        FS();
        break;
      } catch (P) {
        fg(t, P);
      }
    while (!0);
    return (
      (Un = Hi = null),
      (N.H = s),
      (N.A = f),
      (Nt = a),
      wt !== null ? 0 : ((Gt = null), (Mt = 0), Jr(), Wt)
    );
  }
  function FS() {
    for (; wt !== null && !Ho(); ) mg(wt);
  }
  function mg(t) {
    var n = Um(t.alternate, t, Kn);
    (t.memoizedProps = t.pendingProps), n === null ? Rs(t) : (wt = n);
  }
  function gg(t) {
    var n = t,
      a = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = _m(a, n, n.pendingProps, n.type, void 0, Mt);
        break;
      case 11:
        n = _m(a, n, n.pendingProps, n.type.render, n.ref, Mt);
        break;
      case 5:
        Pu(n);
      default:
        qm(a, n), (n = wt = pp(n, Kn)), (n = Um(a, n, Kn));
    }
    (t.memoizedProps = t.pendingProps), n === null ? Rs(t) : (wt = n);
  }
  function ql(t, n, a, s) {
    (Un = Hi = null), Pu(n), (zl = null), (Da = 0);
    var f = n.return;
    try {
      if (_S(t, f, n, a, Mt)) {
        (Wt = 1), xs(t, nn(a, t.current)), (wt = null);
        return;
      }
    } catch (d) {
      if (f !== null) throw ((wt = f), d);
      (Wt = 1), xs(t, nn(a, t.current)), (wt = null);
      return;
    }
    n.flags & 32768
      ? (zt || s === 1
          ? (t = !0)
          : Bl || (Mt & 536870912) !== 0
            ? (t = !1)
            : ((hi = t = !0),
              (s === 2 || s === 9 || s === 3 || s === 6) &&
                ((s = Ye.current),
                s !== null && s.tag === 13 && (s.flags |= 16384))),
        yg(n, t))
      : Rs(n);
  }
  function Rs(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        yg(n, hi);
        return;
      }
      t = n.return;
      var a = jS(n.alternate, n, Kn);
      if (a !== null) {
        wt = a;
        return;
      }
      if (((n = n.sibling), n !== null)) {
        wt = n;
        return;
      }
      wt = n = t;
    } while (n !== null);
    Wt === 0 && (Wt = 5);
  }
  function yg(t, n) {
    do {
      var a = BS(t.alternate, t);
      if (a !== null) {
        (a.flags &= 32767), (wt = a);
        return;
      }
      if (
        ((a = t.return),
        a !== null &&
          ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !n && ((t = t.sibling), t !== null))
      ) {
        wt = t;
        return;
      }
      wt = t = a;
    } while (t !== null);
    (Wt = 6), (wt = null);
  }
  function vg(t, n, a, s, f, d, v, S, k) {
    t.cancelPendingCommit = null;
    do _s();
    while (fe !== 0);
    if ((Nt & 6) !== 0) throw Error(r(327));
    if (n !== null) {
      if (n === t.current) throw Error(r(177));
      if (
        ((d = n.lanes | n.childLanes),
        (d |= mu),
        wb(t, a, d, v, S, k),
        t === Gt && ((wt = Gt = null), (Mt = 0)),
        (Ul = n),
        (mi = t),
        (Zn = a),
        (Ac = d),
        (wc = f),
        (sg = s),
        (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            KS(yt, function () {
              return Ag(), null;
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (s = (n.flags & 13878) !== 0),
        (n.subtreeFlags & 13878) !== 0 || s)
      ) {
        (s = N.T), (N.T = null), (f = Z.p), (Z.p = 2), (v = Nt), (Nt |= 4);
        try {
          VS(t, n, a);
        } finally {
          (Nt = v), (Z.p = f), (N.T = s);
        }
      }
      (fe = 1), xg(), bg(), Sg();
    }
  }
  function xg() {
    if (fe === 1) {
      fe = 0;
      var t = mi,
        n = Ul,
        a = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || a) {
        (a = N.T), (N.T = null);
        var s = Z.p;
        Z.p = 2;
        var f = Nt;
        Nt |= 4;
        try {
          Wm(n, t);
          var d = Uc,
            v = ap(t.containerInfo),
            S = d.focusedElem,
            k = d.selectionRange;
          if (
            v !== S &&
            S &&
            S.ownerDocument &&
            lp(S.ownerDocument.documentElement, S)
          ) {
            if (k !== null && cu(S)) {
              var B = k.start,
                P = k.end;
              if ((P === void 0 && (P = B), 'selectionStart' in S))
                (S.selectionStart = B),
                  (S.selectionEnd = Math.min(P, S.value.length));
              else {
                var X = S.ownerDocument || document,
                  U = (X && X.defaultView) || window;
                if (U.getSelection) {
                  var q = U.getSelection(),
                    ot = S.textContent.length,
                    mt = Math.min(k.start, ot),
                    qt = k.end === void 0 ? mt : Math.min(k.end, ot);
                  !q.extend && mt > qt && ((v = qt), (qt = mt), (mt = v));
                  var _ = ip(S, mt),
                    z = ip(S, qt);
                  if (
                    _ &&
                    z &&
                    (q.rangeCount !== 1 ||
                      q.anchorNode !== _.node ||
                      q.anchorOffset !== _.offset ||
                      q.focusNode !== z.node ||
                      q.focusOffset !== z.offset)
                  ) {
                    var j = X.createRange();
                    j.setStart(_.node, _.offset),
                      q.removeAllRanges(),
                      mt > qt
                        ? (q.addRange(j), q.extend(z.node, z.offset))
                        : (j.setEnd(z.node, z.offset), q.addRange(j));
                  }
                }
              }
            }
            for (X = [], q = S; (q = q.parentNode); )
              q.nodeType === 1 &&
                X.push({ element: q, left: q.scrollLeft, top: q.scrollTop });
            for (
              typeof S.focus == 'function' && S.focus(), S = 0;
              S < X.length;
              S++
            ) {
              var I = X[S];
              (I.element.scrollLeft = I.left), (I.element.scrollTop = I.top);
            }
          }
          (Fs = !!Vc), (Uc = Vc = null);
        } finally {
          (Nt = f), (Z.p = s), (N.T = a);
        }
      }
      (t.current = n), (fe = 2);
    }
  }
  function bg() {
    if (fe === 2) {
      fe = 0;
      var t = mi,
        n = Ul,
        a = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || a) {
        (a = N.T), (N.T = null);
        var s = Z.p;
        Z.p = 2;
        var f = Nt;
        Nt |= 4;
        try {
          Qm(t, n.alternate, n);
        } finally {
          (Nt = f), (Z.p = s), (N.T = a);
        }
      }
      fe = 3;
    }
  }
  function Sg() {
    if (fe === 4 || fe === 3) {
      (fe = 0), qo();
      var t = mi,
        n = Ul,
        a = Zn,
        s = sg;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
        ? (fe = 5)
        : ((fe = 0), (Ul = mi = null), Tg(t, t.pendingLanes));
      var f = t.pendingLanes;
      if (
        (f === 0 && (pi = null),
        Fo(a),
        (n = n.stateNode),
        ce && typeof ce.onCommitFiberRoot == 'function')
      )
        try {
          ce.onCommitFiberRoot(ke, n, void 0, (n.current.flags & 128) === 128);
        } catch {}
      if (s !== null) {
        (n = N.T), (f = Z.p), (Z.p = 2), (N.T = null);
        try {
          for (var d = t.onRecoverableError, v = 0; v < s.length; v++) {
            var S = s[v];
            d(S.value, { componentStack: S.stack });
          }
        } finally {
          (N.T = n), (Z.p = f);
        }
      }
      (Zn & 3) !== 0 && _s(),
        wn(t),
        (f = t.pendingLanes),
        (a & 261930) !== 0 && (f & 42) !== 0
          ? t === Ec
            ? Ia++
            : ((Ia = 0), (Ec = t))
          : (Ia = 0),
        Xa(0);
    }
  }
  function Tg(t, n) {
    (t.pooledCacheLanes &= n) === 0 &&
      ((n = t.pooledCache), n != null && ((t.pooledCache = null), Ca(n)));
  }
  function _s() {
    return xg(), bg(), Sg(), Ag();
  }
  function Ag() {
    if (fe !== 5) return !1;
    var t = mi,
      n = Ac;
    Ac = 0;
    var a = Fo(Zn),
      s = N.T,
      f = Z.p;
    try {
      (Z.p = 32 > a ? 32 : a), (N.T = null), (a = wc), (wc = null);
      var d = mi,
        v = Zn;
      if (((fe = 0), (Ul = mi = null), (Zn = 0), (Nt & 6) !== 0))
        throw Error(r(331));
      var S = Nt;
      if (
        ((Nt |= 4),
        lg(d.current),
        eg(d, d.current, v, a),
        (Nt = S),
        Xa(0, !1),
        ce && typeof ce.onPostCommitFiberRoot == 'function')
      )
        try {
          ce.onPostCommitFiberRoot(ke, d);
        } catch {}
      return !0;
    } finally {
      (Z.p = f), (N.T = s), Tg(t, n);
    }
  }
  function wg(t, n, a) {
    (n = nn(a, n)),
      (n = ic(t.stateNode, n, 2)),
      (t = oi(t, n, 2)),
      t !== null && (da(t, 2), wn(t));
  }
  function Bt(t, n, a) {
    if (t.tag === 3) wg(t, t, a);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          wg(n, t, a);
          break;
        } else if (n.tag === 1) {
          var s = n.stateNode;
          if (
            typeof n.type.getDerivedStateFromError == 'function' ||
            (typeof s.componentDidCatch == 'function' &&
              (pi === null || !pi.has(s)))
          ) {
            (t = nn(a, t)),
              (a = Em(2)),
              (s = oi(n, a, 2)),
              s !== null && (km(a, s, n, t), da(s, 2), wn(s));
            break;
          }
        }
        n = n.return;
      }
  }
  function Mc(t, n, a) {
    var s = t.pingCache;
    if (s === null) {
      s = t.pingCache = new qS();
      var f = new Set();
      s.set(n, f);
    } else (f = s.get(n)), f === void 0 && ((f = new Set()), s.set(n, f));
    f.has(a) ||
      ((bc = !0), f.add(a), (t = IS.bind(null, t, n, a)), n.then(t, t));
  }
  function IS(t, n, a) {
    var s = t.pingCache;
    s !== null && s.delete(n),
      (t.pingedLanes |= t.suspendedLanes & a),
      (t.warmLanes &= ~a),
      Gt === t &&
        (Mt & a) === a &&
        (Wt === 4 || (Wt === 3 && (Mt & 62914560) === Mt && 300 > Ee() - Cs)
          ? (Nt & 2) === 0 && Hl(t, 0)
          : (Sc |= a),
        Vl === Mt && (Vl = 0)),
      wn(t);
  }
  function Eg(t, n) {
    n === 0 && (n = xd()), (t = Bi(t, n)), t !== null && (da(t, n), wn(t));
  }
  function XS(t) {
    var n = t.memoizedState,
      a = 0;
    n !== null && (a = n.retryLane), Eg(t, a);
  }
  function QS(t, n) {
    var a = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var s = t.stateNode,
          f = t.memoizedState;
        f !== null && (a = f.retryLane);
        break;
      case 19:
        s = t.stateNode;
        break;
      case 22:
        s = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    s !== null && s.delete(n), Eg(t, a);
  }
  function KS(t, n) {
    return ol(t, n);
  }
  var Ns = null,
    Pl = null,
    Dc = !1,
    Ls = !1,
    zc = !1,
    yi = 0;
  function wn(t) {
    t !== Pl &&
      t.next === null &&
      (Pl === null ? (Ns = Pl = t) : (Pl = Pl.next = t)),
      (Ls = !0),
      Dc || ((Dc = !0), JS());
  }
  function Xa(t, n) {
    if (!zc && Ls) {
      zc = !0;
      do
        for (var a = !1, s = Ns; s !== null; ) {
          if (t !== 0) {
            var f = s.pendingLanes;
            if (f === 0) var d = 0;
            else {
              var v = s.suspendedLanes,
                S = s.pingedLanes;
              (d = (1 << (31 - Pt(42 | t) + 1)) - 1),
                (d &= f & ~(v & ~S)),
                (d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0);
            }
            d !== 0 && ((a = !0), Dg(s, d));
          } else
            (d = Mt),
              (d = Ur(
                s,
                s === Gt ? d : 0,
                s.cancelPendingCommit !== null || s.timeoutHandle !== -1,
              )),
              (d & 3) === 0 || ha(s, d) || ((a = !0), Dg(s, d));
          s = s.next;
        }
      while (a);
      zc = !1;
    }
  }
  function ZS() {
    kg();
  }
  function kg() {
    Ls = Dc = !1;
    var t = 0;
    yi !== 0 && sT() && (t = yi);
    for (var n = Ee(), a = null, s = Ns; s !== null; ) {
      var f = s.next,
        d = Cg(s, n);
      d === 0
        ? ((s.next = null),
          a === null ? (Ns = f) : (a.next = f),
          f === null && (Pl = a))
        : ((a = s), (t !== 0 || (d & 3) !== 0) && (Ls = !0)),
        (s = f);
    }
    (fe !== 0 && fe !== 5) || Xa(t), yi !== 0 && (yi = 0);
  }
  function Cg(t, n) {
    for (
      var a = t.suspendedLanes,
        s = t.pingedLanes,
        f = t.expirationTimes,
        d = t.pendingLanes & -62914561;
      0 < d;

    ) {
      var v = 31 - Pt(d),
        S = 1 << v,
        k = f[v];
      k === -1
        ? ((S & a) === 0 || (S & s) !== 0) && (f[v] = Ab(S, n))
        : k <= n && (t.expiredLanes |= S),
        (d &= ~S);
    }
    if (
      ((n = Gt),
      (a = Mt),
      (a = Ur(
        t,
        t === n ? a : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      (s = t.callbackNode),
      a === 0 ||
        (t === n && (jt === 2 || jt === 9)) ||
        t.cancelPendingCommit !== null)
    )
      return (
        s !== null && s !== null && fa(s),
        (t.callbackNode = null),
        (t.callbackPriority = 0)
      );
    if ((a & 3) === 0 || ha(t, a)) {
      if (((n = a & -a), n === t.callbackPriority)) return n;
      switch ((s !== null && fa(s), Fo(a))) {
        case 2:
        case 8:
          a = nt;
          break;
        case 32:
          a = yt;
          break;
        case 268435456:
          a = Lt;
          break;
        default:
          a = yt;
      }
      return (
        (s = Mg.bind(null, t)),
        (a = ol(a, s)),
        (t.callbackPriority = n),
        (t.callbackNode = a),
        n
      );
    }
    return (
      s !== null && s !== null && fa(s),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function Mg(t, n) {
    if (fe !== 0 && fe !== 5)
      return (t.callbackNode = null), (t.callbackPriority = 0), null;
    var a = t.callbackNode;
    if (_s() && t.callbackNode !== a) return null;
    var s = Mt;
    return (
      (s = Ur(
        t,
        t === Gt ? s : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      s === 0
        ? null
        : (ug(t, s, n),
          Cg(t, Ee()),
          t.callbackNode != null && t.callbackNode === a
            ? Mg.bind(null, t)
            : null)
    );
  }
  function Dg(t, n) {
    if (_s()) return null;
    ug(t, n, !0);
  }
  function JS() {
    uT(function () {
      (Nt & 6) !== 0 ? ol(F, ZS) : kg();
    });
  }
  function Oc() {
    if (yi === 0) {
      var t = Cl;
      t === 0 && ((t = jr), (jr <<= 1), (jr & 261888) === 0 && (jr = 256)),
        (yi = t);
    }
    return yi;
  }
  function zg(t) {
    return t == null || typeof t == 'symbol' || typeof t == 'boolean'
      ? null
      : typeof t == 'function'
        ? t
        : Gr('' + t);
  }
  function Og(t, n) {
    var a = n.ownerDocument.createElement('input');
    return (
      (a.name = n.name),
      (a.value = n.value),
      t.id && a.setAttribute('form', t.id),
      n.parentNode.insertBefore(a, n),
      (t = new FormData(t)),
      a.parentNode.removeChild(a),
      t
    );
  }
  function $S(t, n, a, s, f) {
    if (n === 'submit' && a && a.stateNode === f) {
      var d = zg((f[Re] || null).action),
        v = s.submitter;
      v &&
        ((n = (n = v[Re] || null)
          ? zg(n.formAction)
          : v.getAttribute('formAction')),
        n !== null && ((d = n), (v = null)));
      var S = new Xr('action', 'action', null, s, f);
      t.push({
        event: S,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (s.defaultPrevented) {
                if (yi !== 0) {
                  var k = v ? Og(f, v) : new FormData(f);
                  Ju(
                    a,
                    { pending: !0, data: k, method: f.method, action: d },
                    null,
                    k,
                  );
                }
              } else
                typeof d == 'function' &&
                  (S.preventDefault(),
                  (k = v ? Og(f, v) : new FormData(f)),
                  Ju(
                    a,
                    { pending: !0, data: k, method: f.method, action: d },
                    d,
                    k,
                  ));
            },
            currentTarget: f,
          },
        ],
      });
    }
  }
  for (var Rc = 0; Rc < pu.length; Rc++) {
    var _c = pu[Rc],
      WS = _c.toLowerCase(),
      tT = _c[0].toUpperCase() + _c.slice(1);
    pn(WS, 'on' + tT);
  }
  pn(op, 'onAnimationEnd'),
    pn(up, 'onAnimationIteration'),
    pn(cp, 'onAnimationStart'),
    pn('dblclick', 'onDoubleClick'),
    pn('focusin', 'onFocus'),
    pn('focusout', 'onBlur'),
    pn(gS, 'onTransitionRun'),
    pn(yS, 'onTransitionStart'),
    pn(vS, 'onTransitionCancel'),
    pn(fp, 'onTransitionEnd'),
    dl('onMouseEnter', ['mouseout', 'mouseover']),
    dl('onMouseLeave', ['mouseout', 'mouseover']),
    dl('onPointerEnter', ['pointerout', 'pointerover']),
    dl('onPointerLeave', ['pointerout', 'pointerover']),
    _i(
      'onChange',
      'change click focusin focusout input keydown keyup selectionchange'.split(
        ' ',
      ),
    ),
    _i(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' ',
      ),
    ),
    _i('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    _i(
      'onCompositionEnd',
      'compositionend focusout keydown keypress keyup mousedown'.split(' '),
    ),
    _i(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' '),
    ),
    _i(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' '),
    );
  var Qa =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' ',
      ),
    eT = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'
        .split(' ')
        .concat(Qa),
    );
  function Rg(t, n) {
    n = (n & 4) !== 0;
    for (var a = 0; a < t.length; a++) {
      var s = t[a],
        f = s.event;
      s = s.listeners;
      t: {
        var d = void 0;
        if (n)
          for (var v = s.length - 1; 0 <= v; v--) {
            var S = s[v],
              k = S.instance,
              B = S.currentTarget;
            if (((S = S.listener), k !== d && f.isPropagationStopped()))
              break t;
            (d = S), (f.currentTarget = B);
            try {
              d(f);
            } catch (P) {
              Zr(P);
            }
            (f.currentTarget = null), (d = k);
          }
        else
          for (v = 0; v < s.length; v++) {
            if (
              ((S = s[v]),
              (k = S.instance),
              (B = S.currentTarget),
              (S = S.listener),
              k !== d && f.isPropagationStopped())
            )
              break t;
            (d = S), (f.currentTarget = B);
            try {
              d(f);
            } catch (P) {
              Zr(P);
            }
            (f.currentTarget = null), (d = k);
          }
      }
    }
  }
  function Et(t, n) {
    var a = n[Io];
    a === void 0 && (a = n[Io] = new Set());
    var s = t + '__bubble';
    a.has(s) || (_g(n, t, 2, !1), a.add(s));
  }
  function Nc(t, n, a) {
    var s = 0;
    n && (s |= 4), _g(a, t, s, n);
  }
  var js = '_reactListening' + Math.random().toString(36).slice(2);
  function Lc(t) {
    if (!t[js]) {
      (t[js] = !0),
        kd.forEach(function (a) {
          a !== 'selectionchange' && (eT.has(a) || Nc(a, !1, t), Nc(a, !0, t));
        });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[js] || ((n[js] = !0), Nc('selectionchange', !1, n));
    }
  }
  function _g(t, n, a, s) {
    switch (oy(n)) {
      case 2:
        var f = DT;
        break;
      case 8:
        f = zT;
        break;
      default:
        f = Zc;
    }
    (a = f.bind(null, n, a, t)),
      (f = void 0),
      !eu ||
        (n !== 'touchstart' && n !== 'touchmove' && n !== 'wheel') ||
        (f = !0),
      s
        ? f !== void 0
          ? t.addEventListener(n, a, { capture: !0, passive: f })
          : t.addEventListener(n, a, !0)
        : f !== void 0
          ? t.addEventListener(n, a, { passive: f })
          : t.addEventListener(n, a, !1);
  }
  function jc(t, n, a, s, f) {
    var d = s;
    if ((n & 1) === 0 && (n & 2) === 0 && s !== null)
      t: for (;;) {
        if (s === null) return;
        var v = s.tag;
        if (v === 3 || v === 4) {
          var S = s.stateNode.containerInfo;
          if (S === f) break;
          if (v === 4)
            for (v = s.return; v !== null; ) {
              var k = v.tag;
              if ((k === 3 || k === 4) && v.stateNode.containerInfo === f)
                return;
              v = v.return;
            }
          for (; S !== null; ) {
            if (((v = cl(S)), v === null)) return;
            if (((k = v.tag), k === 5 || k === 6 || k === 26 || k === 27)) {
              s = d = v;
              continue t;
            }
            S = S.parentNode;
          }
        }
        s = s.return;
      }
    Vd(function () {
      var B = d,
        P = Wo(a),
        X = [];
      t: {
        var U = hp.get(t);
        if (U !== void 0) {
          var q = Xr,
            ot = t;
          switch (t) {
            case 'keypress':
              if (Fr(a) === 0) break t;
            case 'keydown':
            case 'keyup':
              q = Qb;
              break;
            case 'focusin':
              (ot = 'focus'), (q = au);
              break;
            case 'focusout':
              (ot = 'blur'), (q = au);
              break;
            case 'beforeblur':
            case 'afterblur':
              q = au;
              break;
            case 'click':
              if (a.button === 2) break t;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              q = qd;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              q = jb;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              q = Jb;
              break;
            case op:
            case up:
            case cp:
              q = Ub;
              break;
            case fp:
              q = Wb;
              break;
            case 'scroll':
            case 'scrollend':
              q = Nb;
              break;
            case 'wheel':
              q = eS;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              q = qb;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              q = Gd;
              break;
            case 'toggle':
            case 'beforetoggle':
              q = iS;
          }
          var mt = (n & 4) !== 0,
            qt = !mt && (t === 'scroll' || t === 'scrollend'),
            _ = mt ? (U !== null ? U + 'Capture' : null) : U;
          mt = [];
          for (var z = B, j; z !== null; ) {
            var I = z;
            if (
              ((j = I.stateNode),
              (I = I.tag),
              (I !== 5 && I !== 26 && I !== 27) ||
                j === null ||
                _ === null ||
                ((I = ga(z, _)), I != null && mt.push(Ka(z, I, j))),
              qt)
            )
              break;
            z = z.return;
          }
          0 < mt.length &&
            ((U = new q(U, ot, null, a, P)),
            X.push({ event: U, listeners: mt }));
        }
      }
      if ((n & 7) === 0) {
        t: {
          if (
            ((U = t === 'mouseover' || t === 'pointerover'),
            (q = t === 'mouseout' || t === 'pointerout'),
            U &&
              a !== $o &&
              (ot = a.relatedTarget || a.fromElement) &&
              (cl(ot) || ot[ul]))
          )
            break t;
          if (
            (q || U) &&
            ((U =
              P.window === P
                ? P
                : (U = P.ownerDocument)
                  ? U.defaultView || U.parentWindow
                  : window),
            q
              ? ((ot = a.relatedTarget || a.toElement),
                (q = B),
                (ot = ot ? cl(ot) : null),
                ot !== null &&
                  ((qt = c(ot)),
                  (mt = ot.tag),
                  ot !== qt || (mt !== 5 && mt !== 27 && mt !== 6)) &&
                  (ot = null))
              : ((q = null), (ot = B)),
            q !== ot)
          ) {
            if (
              ((mt = qd),
              (I = 'onMouseLeave'),
              (_ = 'onMouseEnter'),
              (z = 'mouse'),
              (t === 'pointerout' || t === 'pointerover') &&
                ((mt = Gd),
                (I = 'onPointerLeave'),
                (_ = 'onPointerEnter'),
                (z = 'pointer')),
              (qt = q == null ? U : ma(q)),
              (j = ot == null ? U : ma(ot)),
              (U = new mt(I, z + 'leave', q, a, P)),
              (U.target = qt),
              (U.relatedTarget = j),
              (I = null),
              cl(P) === B &&
                ((mt = new mt(_, z + 'enter', ot, a, P)),
                (mt.target = j),
                (mt.relatedTarget = qt),
                (I = mt)),
              (qt = I),
              q && ot)
            )
              e: {
                for (mt = nT, _ = q, z = ot, j = 0, I = _; I; I = mt(I)) j++;
                I = 0;
                for (var ht = z; ht; ht = mt(ht)) I++;
                for (; 0 < j - I; ) (_ = mt(_)), j--;
                for (; 0 < I - j; ) (z = mt(z)), I--;
                for (; j--; ) {
                  if (_ === z || (z !== null && _ === z.alternate)) {
                    mt = _;
                    break e;
                  }
                  (_ = mt(_)), (z = mt(z));
                }
                mt = null;
              }
            else mt = null;
            q !== null && Ng(X, U, q, mt, !1),
              ot !== null && qt !== null && Ng(X, qt, ot, mt, !0);
          }
        }
        t: {
          if (
            ((U = B ? ma(B) : window),
            (q = U.nodeName && U.nodeName.toLowerCase()),
            q === 'select' || (q === 'input' && U.type === 'file'))
          )
            var Rt = Jd;
          else if (Kd(U))
            if ($d) Rt = dS;
            else {
              Rt = fS;
              var ct = cS;
            }
          else
            (q = U.nodeName),
              !q ||
              q.toLowerCase() !== 'input' ||
              (U.type !== 'checkbox' && U.type !== 'radio')
                ? B && Jo(B.elementType) && (Rt = Jd)
                : (Rt = hS);
          if (Rt && (Rt = Rt(t, B))) {
            Zd(X, Rt, a, P);
            break t;
          }
          ct && ct(t, U, B),
            t === 'focusout' &&
              B &&
              U.type === 'number' &&
              B.memoizedProps.value != null &&
              Zo(U, 'number', U.value);
        }
        switch (((ct = B ? ma(B) : window), t)) {
          case 'focusin':
            (Kd(ct) || ct.contentEditable === 'true') &&
              ((xl = ct), (fu = B), (wa = null));
            break;
          case 'focusout':
            wa = fu = xl = null;
            break;
          case 'mousedown':
            hu = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            (hu = !1), rp(X, a, P);
            break;
          case 'selectionchange':
            if (mS) break;
          case 'keydown':
          case 'keyup':
            rp(X, a, P);
        }
        var St;
        if (su)
          t: {
            switch (t) {
              case 'compositionstart':
                var Dt = 'onCompositionStart';
                break t;
              case 'compositionend':
                Dt = 'onCompositionEnd';
                break t;
              case 'compositionupdate':
                Dt = 'onCompositionUpdate';
                break t;
            }
            Dt = void 0;
          }
        else
          vl
            ? Xd(t, a) && (Dt = 'onCompositionEnd')
            : t === 'keydown' &&
              a.keyCode === 229 &&
              (Dt = 'onCompositionStart');
        Dt &&
          (Yd &&
            a.locale !== 'ko' &&
            (vl || Dt !== 'onCompositionStart'
              ? Dt === 'onCompositionEnd' && vl && (St = Ud())
              : ((ei = P),
                (nu = 'value' in ei ? ei.value : ei.textContent),
                (vl = !0))),
          (ct = Bs(B, Dt)),
          0 < ct.length &&
            ((Dt = new Pd(Dt, t, null, a, P)),
            X.push({ event: Dt, listeners: ct }),
            St
              ? (Dt.data = St)
              : ((St = Qd(a)), St !== null && (Dt.data = St)))),
          (St = aS ? rS(t, a) : sS(t, a)) &&
            ((Dt = Bs(B, 'onBeforeInput')),
            0 < Dt.length &&
              ((ct = new Pd('onBeforeInput', 'beforeinput', null, a, P)),
              X.push({ event: ct, listeners: Dt }),
              (ct.data = St))),
          $S(X, t, B, a, P);
      }
      Rg(X, n);
    });
  }
  function Ka(t, n, a) {
    return { instance: t, listener: n, currentTarget: a };
  }
  function Bs(t, n) {
    for (var a = n + 'Capture', s = []; t !== null; ) {
      var f = t,
        d = f.stateNode;
      if (
        ((f = f.tag),
        (f !== 5 && f !== 26 && f !== 27) ||
          d === null ||
          ((f = ga(t, a)),
          f != null && s.unshift(Ka(t, f, d)),
          (f = ga(t, n)),
          f != null && s.push(Ka(t, f, d))),
        t.tag === 3)
      )
        return s;
      t = t.return;
    }
    return [];
  }
  function nT(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Ng(t, n, a, s, f) {
    for (var d = n._reactName, v = []; a !== null && a !== s; ) {
      var S = a,
        k = S.alternate,
        B = S.stateNode;
      if (((S = S.tag), k !== null && k === s)) break;
      (S !== 5 && S !== 26 && S !== 27) ||
        B === null ||
        ((k = B),
        f
          ? ((B = ga(a, d)), B != null && v.unshift(Ka(a, B, k)))
          : f || ((B = ga(a, d)), B != null && v.push(Ka(a, B, k)))),
        (a = a.return);
    }
    v.length !== 0 && t.push({ event: n, listeners: v });
  }
  var iT = /\r\n?/g,
    lT = /\u0000|\uFFFD/g;
  function Lg(t) {
    return (typeof t == 'string' ? t : '' + t)
      .replace(
        iT,
        `
`,
      )
      .replace(lT, '');
  }
  function jg(t, n) {
    return (n = Lg(n)), Lg(t) === n;
  }
  function Ht(t, n, a, s, f, d) {
    switch (a) {
      case 'children':
        typeof s == 'string'
          ? n === 'body' || (n === 'textarea' && s === '') || ml(t, s)
          : (typeof s == 'number' || typeof s == 'bigint') &&
            n !== 'body' &&
            ml(t, '' + s);
        break;
      case 'className':
        qr(t, 'class', s);
        break;
      case 'tabIndex':
        qr(t, 'tabindex', s);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        qr(t, a, s);
        break;
      case 'style':
        jd(t, s, d);
        break;
      case 'data':
        if (n !== 'object') {
          qr(t, 'data', s);
          break;
        }
      case 'src':
      case 'href':
        if (s === '' && (n !== 'a' || a !== 'href')) {
          t.removeAttribute(a);
          break;
        }
        if (
          s == null ||
          typeof s == 'function' ||
          typeof s == 'symbol' ||
          typeof s == 'boolean'
        ) {
          t.removeAttribute(a);
          break;
        }
        (s = Gr('' + s)), t.setAttribute(a, s);
        break;
      case 'action':
      case 'formAction':
        if (typeof s == 'function') {
          t.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof d == 'function' &&
            (a === 'formAction'
              ? (n !== 'input' && Ht(t, n, 'name', f.name, f, null),
                Ht(t, n, 'formEncType', f.formEncType, f, null),
                Ht(t, n, 'formMethod', f.formMethod, f, null),
                Ht(t, n, 'formTarget', f.formTarget, f, null))
              : (Ht(t, n, 'encType', f.encType, f, null),
                Ht(t, n, 'method', f.method, f, null),
                Ht(t, n, 'target', f.target, f, null)));
        if (s == null || typeof s == 'symbol' || typeof s == 'boolean') {
          t.removeAttribute(a);
          break;
        }
        (s = Gr('' + s)), t.setAttribute(a, s);
        break;
      case 'onClick':
        s != null && (t.onclick = Ln);
        break;
      case 'onScroll':
        s != null && Et('scroll', t);
        break;
      case 'onScrollEnd':
        s != null && Et('scrollend', t);
        break;
      case 'dangerouslySetInnerHTML':
        if (s != null) {
          if (typeof s != 'object' || !('__html' in s)) throw Error(r(61));
          if (((a = s.__html), a != null)) {
            if (f.children != null) throw Error(r(60));
            t.innerHTML = a;
          }
        }
        break;
      case 'multiple':
        t.multiple = s && typeof s != 'function' && typeof s != 'symbol';
        break;
      case 'muted':
        t.muted = s && typeof s != 'function' && typeof s != 'symbol';
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'defaultValue':
      case 'defaultChecked':
      case 'innerHTML':
      case 'ref':
        break;
      case 'autoFocus':
        break;
      case 'xlinkHref':
        if (
          s == null ||
          typeof s == 'function' ||
          typeof s == 'boolean' ||
          typeof s == 'symbol'
        ) {
          t.removeAttribute('xlink:href');
          break;
        }
        (a = Gr('' + s)),
          t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a);
        break;
      case 'contentEditable':
      case 'spellCheck':
      case 'draggable':
      case 'value':
      case 'autoReverse':
      case 'externalResourcesRequired':
      case 'focusable':
      case 'preserveAlpha':
        s != null && typeof s != 'function' && typeof s != 'symbol'
          ? t.setAttribute(a, '' + s)
          : t.removeAttribute(a);
        break;
      case 'inert':
      case 'allowFullScreen':
      case 'async':
      case 'autoPlay':
      case 'controls':
      case 'default':
      case 'defer':
      case 'disabled':
      case 'disablePictureInPicture':
      case 'disableRemotePlayback':
      case 'formNoValidate':
      case 'hidden':
      case 'loop':
      case 'noModule':
      case 'noValidate':
      case 'open':
      case 'playsInline':
      case 'readOnly':
      case 'required':
      case 'reversed':
      case 'scoped':
      case 'seamless':
      case 'itemScope':
        s && typeof s != 'function' && typeof s != 'symbol'
          ? t.setAttribute(a, '')
          : t.removeAttribute(a);
        break;
      case 'capture':
      case 'download':
        s === !0
          ? t.setAttribute(a, '')
          : s !== !1 &&
              s != null &&
              typeof s != 'function' &&
              typeof s != 'symbol'
            ? t.setAttribute(a, s)
            : t.removeAttribute(a);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        s != null &&
        typeof s != 'function' &&
        typeof s != 'symbol' &&
        !isNaN(s) &&
        1 <= s
          ? t.setAttribute(a, s)
          : t.removeAttribute(a);
        break;
      case 'rowSpan':
      case 'start':
        s == null || typeof s == 'function' || typeof s == 'symbol' || isNaN(s)
          ? t.removeAttribute(a)
          : t.setAttribute(a, s);
        break;
      case 'popover':
        Et('beforetoggle', t), Et('toggle', t), Hr(t, 'popover', s);
        break;
      case 'xlinkActuate':
        Nn(t, 'http://www.w3.org/1999/xlink', 'xlink:actuate', s);
        break;
      case 'xlinkArcrole':
        Nn(t, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', s);
        break;
      case 'xlinkRole':
        Nn(t, 'http://www.w3.org/1999/xlink', 'xlink:role', s);
        break;
      case 'xlinkShow':
        Nn(t, 'http://www.w3.org/1999/xlink', 'xlink:show', s);
        break;
      case 'xlinkTitle':
        Nn(t, 'http://www.w3.org/1999/xlink', 'xlink:title', s);
        break;
      case 'xlinkType':
        Nn(t, 'http://www.w3.org/1999/xlink', 'xlink:type', s);
        break;
      case 'xmlBase':
        Nn(t, 'http://www.w3.org/XML/1998/namespace', 'xml:base', s);
        break;
      case 'xmlLang':
        Nn(t, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', s);
        break;
      case 'xmlSpace':
        Nn(t, 'http://www.w3.org/XML/1998/namespace', 'xml:space', s);
        break;
      case 'is':
        Hr(t, 'is', s);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) ||
          (a[0] !== 'o' && a[0] !== 'O') ||
          (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = Rb.get(a) || a), Hr(t, a, s));
    }
  }
  function Bc(t, n, a, s, f, d) {
    switch (a) {
      case 'style':
        jd(t, s, d);
        break;
      case 'dangerouslySetInnerHTML':
        if (s != null) {
          if (typeof s != 'object' || !('__html' in s)) throw Error(r(61));
          if (((a = s.__html), a != null)) {
            if (f.children != null) throw Error(r(60));
            t.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof s == 'string'
          ? ml(t, s)
          : (typeof s == 'number' || typeof s == 'bigint') && ml(t, '' + s);
        break;
      case 'onScroll':
        s != null && Et('scroll', t);
        break;
      case 'onScrollEnd':
        s != null && Et('scrollend', t);
        break;
      case 'onClick':
        s != null && (t.onclick = Ln);
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'innerHTML':
      case 'ref':
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        if (!Cd.hasOwnProperty(a))
          t: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((f = a.endsWith('Capture')),
              (n = a.slice(2, f ? a.length - 7 : void 0)),
              (d = t[Re] || null),
              (d = d != null ? d[a] : null),
              typeof d == 'function' && t.removeEventListener(n, d, f),
              typeof s == 'function')
            ) {
              typeof d != 'function' &&
                d !== null &&
                (a in t
                  ? (t[a] = null)
                  : t.hasAttribute(a) && t.removeAttribute(a)),
                t.addEventListener(n, s, f);
              break t;
            }
            a in t
              ? (t[a] = s)
              : s === !0
                ? t.setAttribute(a, '')
                : Hr(t, a, s);
          }
    }
  }
  function xe(t, n, a) {
    switch (n) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'img':
        Et('error', t), Et('load', t);
        var s = !1,
          f = !1,
          d;
        for (d in a)
          if (a.hasOwnProperty(d)) {
            var v = a[d];
            if (v != null)
              switch (d) {
                case 'src':
                  s = !0;
                  break;
                case 'srcSet':
                  f = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(r(137, n));
                default:
                  Ht(t, n, d, v, a, null);
              }
          }
        f && Ht(t, n, 'srcSet', a.srcSet, a, null),
          s && Ht(t, n, 'src', a.src, a, null);
        return;
      case 'input':
        Et('invalid', t);
        var S = (d = v = f = null),
          k = null,
          B = null;
        for (s in a)
          if (a.hasOwnProperty(s)) {
            var P = a[s];
            if (P != null)
              switch (s) {
                case 'name':
                  f = P;
                  break;
                case 'type':
                  v = P;
                  break;
                case 'checked':
                  k = P;
                  break;
                case 'defaultChecked':
                  B = P;
                  break;
                case 'value':
                  d = P;
                  break;
                case 'defaultValue':
                  S = P;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (P != null) throw Error(r(137, n));
                  break;
                default:
                  Ht(t, n, s, P, a, null);
              }
          }
        Rd(t, d, S, k, B, v, f, !1);
        return;
      case 'select':
        Et('invalid', t), (s = v = d = null);
        for (f in a)
          if (a.hasOwnProperty(f) && ((S = a[f]), S != null))
            switch (f) {
              case 'value':
                d = S;
                break;
              case 'defaultValue':
                v = S;
                break;
              case 'multiple':
                s = S;
              default:
                Ht(t, n, f, S, a, null);
            }
        (n = d),
          (a = v),
          (t.multiple = !!s),
          n != null ? pl(t, !!s, n, !1) : a != null && pl(t, !!s, a, !0);
        return;
      case 'textarea':
        Et('invalid', t), (d = f = s = null);
        for (v in a)
          if (a.hasOwnProperty(v) && ((S = a[v]), S != null))
            switch (v) {
              case 'value':
                s = S;
                break;
              case 'defaultValue':
                f = S;
                break;
              case 'children':
                d = S;
                break;
              case 'dangerouslySetInnerHTML':
                if (S != null) throw Error(r(91));
                break;
              default:
                Ht(t, n, v, S, a, null);
            }
        Nd(t, s, f, d);
        return;
      case 'option':
        for (k in a)
          if (a.hasOwnProperty(k) && ((s = a[k]), s != null))
            switch (k) {
              case 'selected':
                t.selected =
                  s && typeof s != 'function' && typeof s != 'symbol';
                break;
              default:
                Ht(t, n, k, s, a, null);
            }
        return;
      case 'dialog':
        Et('beforetoggle', t), Et('toggle', t), Et('cancel', t), Et('close', t);
        break;
      case 'iframe':
      case 'object':
        Et('load', t);
        break;
      case 'video':
      case 'audio':
        for (s = 0; s < Qa.length; s++) Et(Qa[s], t);
        break;
      case 'image':
        Et('error', t), Et('load', t);
        break;
      case 'details':
        Et('toggle', t);
        break;
      case 'embed':
      case 'source':
      case 'link':
        Et('error', t), Et('load', t);
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (B in a)
          if (a.hasOwnProperty(B) && ((s = a[B]), s != null))
            switch (B) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(r(137, n));
              default:
                Ht(t, n, B, s, a, null);
            }
        return;
      default:
        if (Jo(n)) {
          for (P in a)
            a.hasOwnProperty(P) &&
              ((s = a[P]), s !== void 0 && Bc(t, n, P, s, a, void 0));
          return;
        }
    }
    for (S in a)
      a.hasOwnProperty(S) && ((s = a[S]), s != null && Ht(t, n, S, s, a, null));
  }
  function aT(t, n, a, s) {
    switch (n) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'input':
        var f = null,
          d = null,
          v = null,
          S = null,
          k = null,
          B = null,
          P = null;
        for (q in a) {
          var X = a[q];
          if (a.hasOwnProperty(q) && X != null)
            switch (q) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                k = X;
              default:
                s.hasOwnProperty(q) || Ht(t, n, q, null, s, X);
            }
        }
        for (var U in s) {
          var q = s[U];
          if (((X = a[U]), s.hasOwnProperty(U) && (q != null || X != null)))
            switch (U) {
              case 'type':
                d = q;
                break;
              case 'name':
                f = q;
                break;
              case 'checked':
                B = q;
                break;
              case 'defaultChecked':
                P = q;
                break;
              case 'value':
                v = q;
                break;
              case 'defaultValue':
                S = q;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (q != null) throw Error(r(137, n));
                break;
              default:
                q !== X && Ht(t, n, U, q, s, X);
            }
        }
        Ko(t, v, S, k, B, P, d, f);
        return;
      case 'select':
        q = v = S = U = null;
        for (d in a)
          if (((k = a[d]), a.hasOwnProperty(d) && k != null))
            switch (d) {
              case 'value':
                break;
              case 'multiple':
                q = k;
              default:
                s.hasOwnProperty(d) || Ht(t, n, d, null, s, k);
            }
        for (f in s)
          if (
            ((d = s[f]),
            (k = a[f]),
            s.hasOwnProperty(f) && (d != null || k != null))
          )
            switch (f) {
              case 'value':
                U = d;
                break;
              case 'defaultValue':
                S = d;
                break;
              case 'multiple':
                v = d;
              default:
                d !== k && Ht(t, n, f, d, s, k);
            }
        (n = S),
          (a = v),
          (s = q),
          U != null
            ? pl(t, !!a, U, !1)
            : !!s != !!a &&
              (n != null ? pl(t, !!a, n, !0) : pl(t, !!a, a ? [] : '', !1));
        return;
      case 'textarea':
        q = U = null;
        for (S in a)
          if (
            ((f = a[S]),
            a.hasOwnProperty(S) && f != null && !s.hasOwnProperty(S))
          )
            switch (S) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                Ht(t, n, S, null, s, f);
            }
        for (v in s)
          if (
            ((f = s[v]),
            (d = a[v]),
            s.hasOwnProperty(v) && (f != null || d != null))
          )
            switch (v) {
              case 'value':
                U = f;
                break;
              case 'defaultValue':
                q = f;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (f != null) throw Error(r(91));
                break;
              default:
                f !== d && Ht(t, n, v, f, s, d);
            }
        _d(t, U, q);
        return;
      case 'option':
        for (var ot in a)
          if (
            ((U = a[ot]),
            a.hasOwnProperty(ot) && U != null && !s.hasOwnProperty(ot))
          )
            switch (ot) {
              case 'selected':
                t.selected = !1;
                break;
              default:
                Ht(t, n, ot, null, s, U);
            }
        for (k in s)
          if (
            ((U = s[k]),
            (q = a[k]),
            s.hasOwnProperty(k) && U !== q && (U != null || q != null))
          )
            switch (k) {
              case 'selected':
                t.selected =
                  U && typeof U != 'function' && typeof U != 'symbol';
                break;
              default:
                Ht(t, n, k, U, s, q);
            }
        return;
      case 'img':
      case 'link':
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'embed':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'source':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (var mt in a)
          (U = a[mt]),
            a.hasOwnProperty(mt) &&
              U != null &&
              !s.hasOwnProperty(mt) &&
              Ht(t, n, mt, null, s, U);
        for (B in s)
          if (
            ((U = s[B]),
            (q = a[B]),
            s.hasOwnProperty(B) && U !== q && (U != null || q != null))
          )
            switch (B) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (U != null) throw Error(r(137, n));
                break;
              default:
                Ht(t, n, B, U, s, q);
            }
        return;
      default:
        if (Jo(n)) {
          for (var qt in a)
            (U = a[qt]),
              a.hasOwnProperty(qt) &&
                U !== void 0 &&
                !s.hasOwnProperty(qt) &&
                Bc(t, n, qt, void 0, s, U);
          for (P in s)
            (U = s[P]),
              (q = a[P]),
              !s.hasOwnProperty(P) ||
                U === q ||
                (U === void 0 && q === void 0) ||
                Bc(t, n, P, U, s, q);
          return;
        }
    }
    for (var _ in a)
      (U = a[_]),
        a.hasOwnProperty(_) &&
          U != null &&
          !s.hasOwnProperty(_) &&
          Ht(t, n, _, null, s, U);
    for (X in s)
      (U = s[X]),
        (q = a[X]),
        !s.hasOwnProperty(X) ||
          U === q ||
          (U == null && q == null) ||
          Ht(t, n, X, U, s, q);
  }
  function Bg(t) {
    switch (t) {
      case 'css':
      case 'script':
      case 'font':
      case 'img':
      case 'image':
      case 'input':
      case 'link':
        return !0;
      default:
        return !1;
    }
  }
  function rT() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var t = 0, n = 0, a = performance.getEntriesByType('resource'), s = 0;
        s < a.length;
        s++
      ) {
        var f = a[s],
          d = f.transferSize,
          v = f.initiatorType,
          S = f.duration;
        if (d && S && Bg(v)) {
          for (v = 0, S = f.responseEnd, s += 1; s < a.length; s++) {
            var k = a[s],
              B = k.startTime;
            if (B > S) break;
            var P = k.transferSize,
              X = k.initiatorType;
            P &&
              Bg(X) &&
              ((k = k.responseEnd), (v += P * (k < S ? 1 : (S - B) / (k - B))));
          }
          if ((--s, (n += (8 * (d + v)) / (f.duration / 1e3)), t++, 10 < t))
            break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection &&
      ((t = navigator.connection.downlink), typeof t == 'number')
      ? t
      : 5;
  }
  var Vc = null,
    Uc = null;
  function Vs(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Vg(t) {
    switch (t) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Ug(t, n) {
    if (t === 0)
      switch (n) {
        case 'svg':
          return 1;
        case 'math':
          return 2;
        default:
          return 0;
      }
    return t === 1 && n === 'foreignObject' ? 0 : t;
  }
  function Hc(t, n) {
    return (
      t === 'textarea' ||
      t === 'noscript' ||
      typeof n.children == 'string' ||
      typeof n.children == 'number' ||
      typeof n.children == 'bigint' ||
      (typeof n.dangerouslySetInnerHTML == 'object' &&
        n.dangerouslySetInnerHTML !== null &&
        n.dangerouslySetInnerHTML.__html != null)
    );
  }
  var qc = null;
  function sT() {
    var t = window.event;
    return t && t.type === 'popstate'
      ? t === qc
        ? !1
        : ((qc = t), !0)
      : ((qc = null), !1);
  }
  var Hg = typeof setTimeout == 'function' ? setTimeout : void 0,
    oT = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    qg = typeof Promise == 'function' ? Promise : void 0,
    uT =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof qg < 'u'
          ? function (t) {
              return qg.resolve(null).then(t).catch(cT);
            }
          : Hg;
  function cT(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function vi(t) {
    return t === 'head';
  }
  function Pg(t, n) {
    var a = n,
      s = 0;
    do {
      var f = a.nextSibling;
      if ((t.removeChild(a), f && f.nodeType === 8))
        if (((a = f.data), a === '/$' || a === '/&')) {
          if (s === 0) {
            t.removeChild(f), Il(n);
            return;
          }
          s--;
        } else if (
          a === '$' ||
          a === '$?' ||
          a === '$~' ||
          a === '$!' ||
          a === '&'
        )
          s++;
        else if (a === 'html') Za(t.ownerDocument.documentElement);
        else if (a === 'head') {
          (a = t.ownerDocument.head), Za(a);
          for (var d = a.firstChild; d; ) {
            var v = d.nextSibling,
              S = d.nodeName;
            d[pa] ||
              S === 'SCRIPT' ||
              S === 'STYLE' ||
              (S === 'LINK' && d.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(d),
              (d = v);
          }
        } else a === 'body' && Za(t.ownerDocument.body);
      a = f;
    } while (a);
    Il(n);
  }
  function Gg(t, n) {
    var a = t;
    t = 0;
    do {
      var s = a.nextSibling;
      if (
        (a.nodeType === 1
          ? n
            ? ((a._stashedDisplay = a.style.display),
              (a.style.display = 'none'))
            : ((a.style.display = a._stashedDisplay || ''),
              a.getAttribute('style') === '' && a.removeAttribute('style'))
          : a.nodeType === 3 &&
            (n
              ? ((a._stashedText = a.nodeValue), (a.nodeValue = ''))
              : (a.nodeValue = a._stashedText || '')),
        s && s.nodeType === 8)
      )
        if (((a = s.data), a === '/$')) {
          if (t === 0) break;
          t--;
        } else (a !== '$' && a !== '$?' && a !== '$~' && a !== '$!') || t++;
      a = s;
    } while (a);
  }
  function Pc(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var a = n;
      switch (((n = n.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          Pc(a), Xo(a);
          continue;
        case 'SCRIPT':
        case 'STYLE':
          continue;
        case 'LINK':
          if (a.rel.toLowerCase() === 'stylesheet') continue;
      }
      t.removeChild(a);
    }
  }
  function fT(t, n, a, s) {
    for (; t.nodeType === 1; ) {
      var f = a;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!s && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break;
      } else if (s) {
        if (!t[pa])
          switch (n) {
            case 'meta':
              if (!t.hasAttribute('itemprop')) break;
              return t;
            case 'link':
              if (
                ((d = t.getAttribute('rel')),
                d === 'stylesheet' && t.hasAttribute('data-precedence'))
              )
                break;
              if (
                d !== f.rel ||
                t.getAttribute('href') !==
                  (f.href == null || f.href === '' ? null : f.href) ||
                t.getAttribute('crossorigin') !==
                  (f.crossOrigin == null ? null : f.crossOrigin) ||
                t.getAttribute('title') !== (f.title == null ? null : f.title)
              )
                break;
              return t;
            case 'style':
              if (t.hasAttribute('data-precedence')) break;
              return t;
            case 'script':
              if (
                ((d = t.getAttribute('src')),
                (d !== (f.src == null ? null : f.src) ||
                  t.getAttribute('type') !== (f.type == null ? null : f.type) ||
                  t.getAttribute('crossorigin') !==
                    (f.crossOrigin == null ? null : f.crossOrigin)) &&
                  d &&
                  t.hasAttribute('async') &&
                  !t.hasAttribute('itemprop'))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (n === 'input' && t.type === 'hidden') {
        var d = f.name == null ? null : '' + f.name;
        if (f.type === 'hidden' && t.getAttribute('name') === d) return t;
      } else return t;
      if (((t = on(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function hT(t, n, a) {
    if (n === '') return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') &&
          !a) ||
        ((t = on(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Yg(t, n) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') &&
          !n) ||
        ((t = on(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Gc(t) {
    return t.data === '$?' || t.data === '$~';
  }
  function Yc(t) {
    return (
      t.data === '$!' ||
      (t.data === '$?' && t.ownerDocument.readyState !== 'loading')
    );
  }
  function dT(t, n) {
    var a = t.ownerDocument;
    if (t.data === '$~') t._reactRetry = n;
    else if (t.data !== '$?' || a.readyState !== 'loading') n();
    else {
      var s = function () {
        n(), a.removeEventListener('DOMContentLoaded', s);
      };
      a.addEventListener('DOMContentLoaded', s), (t._reactRetry = s);
    }
  }
  function on(t) {
    for (; t != null; t = t.nextSibling) {
      var n = t.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (
          ((n = t.data),
          n === '$' ||
            n === '$!' ||
            n === '$?' ||
            n === '$~' ||
            n === '&' ||
            n === 'F!' ||
            n === 'F')
        )
          break;
        if (n === '/$' || n === '/&') return null;
      }
    }
    return t;
  }
  var Fc = null;
  function Fg(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === '/$' || a === '/&') {
          if (n === 0) return on(t.nextSibling);
          n--;
        } else
          (a !== '$' && a !== '$!' && a !== '$?' && a !== '$~' && a !== '&') ||
            n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Ig(t) {
    t = t.previousSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === '$' || a === '$!' || a === '$?' || a === '$~' || a === '&') {
          if (n === 0) return t;
          n--;
        } else (a !== '/$' && a !== '/&') || n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Xg(t, n, a) {
    switch (((n = Vs(a)), t)) {
      case 'html':
        if (((t = n.documentElement), !t)) throw Error(r(452));
        return t;
      case 'head':
        if (((t = n.head), !t)) throw Error(r(453));
        return t;
      case 'body':
        if (((t = n.body), !t)) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function Za(t) {
    for (var n = t.attributes; n.length; ) t.removeAttributeNode(n[0]);
    Xo(t);
  }
  var un = new Map(),
    Qg = new Set();
  function Us(t) {
    return typeof t.getRootNode == 'function'
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var Jn = Z.d;
  Z.d = { f: pT, r: mT, D: gT, C: yT, L: vT, m: xT, X: ST, S: bT, M: TT };
  function pT() {
    var t = Jn.f(),
      n = zs();
    return t || n;
  }
  function mT(t) {
    var n = fl(t);
    n !== null && n.tag === 5 && n.type === 'form' ? fm(n) : Jn.r(t);
  }
  var Gl = typeof document > 'u' ? null : document;
  function Kg(t, n, a) {
    var s = Gl;
    if (s && typeof n == 'string' && n) {
      var f = tn(n);
      (f = 'link[rel="' + t + '"][href="' + f + '"]'),
        typeof a == 'string' && (f += '[crossorigin="' + a + '"]'),
        Qg.has(f) ||
          (Qg.add(f),
          (t = { rel: t, crossOrigin: a, href: n }),
          s.querySelector(f) === null &&
            ((n = s.createElement('link')),
            xe(n, 'link', t),
            de(n),
            s.head.appendChild(n)));
    }
  }
  function gT(t) {
    Jn.D(t), Kg('dns-prefetch', t, null);
  }
  function yT(t, n) {
    Jn.C(t, n), Kg('preconnect', t, n);
  }
  function vT(t, n, a) {
    Jn.L(t, n, a);
    var s = Gl;
    if (s && t && n) {
      var f = 'link[rel="preload"][as="' + tn(n) + '"]';
      n === 'image' && a && a.imageSrcSet
        ? ((f += '[imagesrcset="' + tn(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' &&
            (f += '[imagesizes="' + tn(a.imageSizes) + '"]'))
        : (f += '[href="' + tn(t) + '"]');
      var d = f;
      switch (n) {
        case 'style':
          d = Yl(t);
          break;
        case 'script':
          d = Fl(t);
      }
      un.has(d) ||
        ((t = y(
          {
            rel: 'preload',
            href: n === 'image' && a && a.imageSrcSet ? void 0 : t,
            as: n,
          },
          a,
        )),
        un.set(d, t),
        s.querySelector(f) !== null ||
          (n === 'style' && s.querySelector(Ja(d))) ||
          (n === 'script' && s.querySelector($a(d))) ||
          ((n = s.createElement('link')),
          xe(n, 'link', t),
          de(n),
          s.head.appendChild(n)));
    }
  }
  function xT(t, n) {
    Jn.m(t, n);
    var a = Gl;
    if (a && t) {
      var s = n && typeof n.as == 'string' ? n.as : 'script',
        f =
          'link[rel="modulepreload"][as="' + tn(s) + '"][href="' + tn(t) + '"]',
        d = f;
      switch (s) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          d = Fl(t);
      }
      if (
        !un.has(d) &&
        ((t = y({ rel: 'modulepreload', href: t }, n)),
        un.set(d, t),
        a.querySelector(f) === null)
      ) {
        switch (s) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector($a(d))) return;
        }
        (s = a.createElement('link')),
          xe(s, 'link', t),
          de(s),
          a.head.appendChild(s);
      }
    }
  }
  function bT(t, n, a) {
    Jn.S(t, n, a);
    var s = Gl;
    if (s && t) {
      var f = hl(s).hoistableStyles,
        d = Yl(t);
      n = n || 'default';
      var v = f.get(d);
      if (!v) {
        var S = { loading: 0, preload: null };
        if ((v = s.querySelector(Ja(d)))) S.loading = 5;
        else {
          (t = y({ rel: 'stylesheet', href: t, 'data-precedence': n }, a)),
            (a = un.get(d)) && Ic(t, a);
          var k = (v = s.createElement('link'));
          de(k),
            xe(k, 'link', t),
            (k._p = new Promise(function (B, P) {
              (k.onload = B), (k.onerror = P);
            })),
            k.addEventListener('load', function () {
              S.loading |= 1;
            }),
            k.addEventListener('error', function () {
              S.loading |= 2;
            }),
            (S.loading |= 4),
            Hs(v, n, s);
        }
        (v = { type: 'stylesheet', instance: v, count: 1, state: S }),
          f.set(d, v);
      }
    }
  }
  function ST(t, n) {
    Jn.X(t, n);
    var a = Gl;
    if (a && t) {
      var s = hl(a).hoistableScripts,
        f = Fl(t),
        d = s.get(f);
      d ||
        ((d = a.querySelector($a(f))),
        d ||
          ((t = y({ src: t, async: !0 }, n)),
          (n = un.get(f)) && Xc(t, n),
          (d = a.createElement('script')),
          de(d),
          xe(d, 'link', t),
          a.head.appendChild(d)),
        (d = { type: 'script', instance: d, count: 1, state: null }),
        s.set(f, d));
    }
  }
  function TT(t, n) {
    Jn.M(t, n);
    var a = Gl;
    if (a && t) {
      var s = hl(a).hoistableScripts,
        f = Fl(t),
        d = s.get(f);
      d ||
        ((d = a.querySelector($a(f))),
        d ||
          ((t = y({ src: t, async: !0, type: 'module' }, n)),
          (n = un.get(f)) && Xc(t, n),
          (d = a.createElement('script')),
          de(d),
          xe(d, 'link', t),
          a.head.appendChild(d)),
        (d = { type: 'script', instance: d, count: 1, state: null }),
        s.set(f, d));
    }
  }
  function Zg(t, n, a, s) {
    var f = (f = ft.current) ? Us(f) : null;
    if (!f) throw Error(r(446));
    switch (t) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((n = Yl(a.href)),
            (a = hl(f).hoistableStyles),
            (s = a.get(n)),
            s ||
              ((s = { type: 'style', instance: null, count: 0, state: null }),
              a.set(n, s)),
            s)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          a.rel === 'stylesheet' &&
          typeof a.href == 'string' &&
          typeof a.precedence == 'string'
        ) {
          t = Yl(a.href);
          var d = hl(f).hoistableStyles,
            v = d.get(t);
          if (
            (v ||
              ((f = f.ownerDocument || f),
              (v = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              d.set(t, v),
              (d = f.querySelector(Ja(t))) &&
                !d._p &&
                ((v.instance = d), (v.state.loading = 5)),
              un.has(t) ||
                ((a = {
                  rel: 'preload',
                  as: 'style',
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                un.set(t, a),
                d || AT(f, t, a, v.state))),
            n && s === null)
          )
            throw Error(r(528, ''));
          return v;
        }
        if (n && s !== null) throw Error(r(529, ''));
        return null;
      case 'script':
        return (
          (n = a.async),
          (a = a.src),
          typeof a == 'string' &&
          n &&
          typeof n != 'function' &&
          typeof n != 'symbol'
            ? ((n = Fl(a)),
              (a = hl(f).hoistableScripts),
              (s = a.get(n)),
              s ||
                ((s = {
                  type: 'script',
                  instance: null,
                  count: 0,
                  state: null,
                }),
                a.set(n, s)),
              s)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, t));
    }
  }
  function Yl(t) {
    return 'href="' + tn(t) + '"';
  }
  function Ja(t) {
    return 'link[rel="stylesheet"][' + t + ']';
  }
  function Jg(t) {
    return y({}, t, { 'data-precedence': t.precedence, precedence: null });
  }
  function AT(t, n, a, s) {
    t.querySelector('link[rel="preload"][as="style"][' + n + ']')
      ? (s.loading = 1)
      : ((n = t.createElement('link')),
        (s.preload = n),
        n.addEventListener('load', function () {
          return (s.loading |= 1);
        }),
        n.addEventListener('error', function () {
          return (s.loading |= 2);
        }),
        xe(n, 'link', a),
        de(n),
        t.head.appendChild(n));
  }
  function Fl(t) {
    return '[src="' + tn(t) + '"]';
  }
  function $a(t) {
    return 'script[async]' + t;
  }
  function $g(t, n, a) {
    if ((n.count++, n.instance === null))
      switch (n.type) {
        case 'style':
          var s = t.querySelector('style[data-href~="' + tn(a.href) + '"]');
          if (s) return (n.instance = s), de(s), s;
          var f = y({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (s = (t.ownerDocument || t).createElement('style')),
            de(s),
            xe(s, 'style', f),
            Hs(s, a.precedence, t),
            (n.instance = s)
          );
        case 'stylesheet':
          f = Yl(a.href);
          var d = t.querySelector(Ja(f));
          if (d) return (n.state.loading |= 4), (n.instance = d), de(d), d;
          (s = Jg(a)),
            (f = un.get(f)) && Ic(s, f),
            (d = (t.ownerDocument || t).createElement('link')),
            de(d);
          var v = d;
          return (
            (v._p = new Promise(function (S, k) {
              (v.onload = S), (v.onerror = k);
            })),
            xe(d, 'link', s),
            (n.state.loading |= 4),
            Hs(d, a.precedence, t),
            (n.instance = d)
          );
        case 'script':
          return (
            (d = Fl(a.src)),
            (f = t.querySelector($a(d)))
              ? ((n.instance = f), de(f), f)
              : ((s = a),
                (f = un.get(d)) && ((s = y({}, a)), Xc(s, f)),
                (t = t.ownerDocument || t),
                (f = t.createElement('script')),
                de(f),
                xe(f, 'link', s),
                t.head.appendChild(f),
                (n.instance = f))
          );
        case 'void':
          return null;
        default:
          throw Error(r(443, n.type));
      }
    else
      n.type === 'stylesheet' &&
        (n.state.loading & 4) === 0 &&
        ((s = n.instance), (n.state.loading |= 4), Hs(s, a.precedence, t));
    return n.instance;
  }
  function Hs(t, n, a) {
    for (
      var s = a.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        f = s.length ? s[s.length - 1] : null,
        d = f,
        v = 0;
      v < s.length;
      v++
    ) {
      var S = s[v];
      if (S.dataset.precedence === n) d = S;
      else if (d !== f) break;
    }
    d
      ? d.parentNode.insertBefore(t, d.nextSibling)
      : ((n = a.nodeType === 9 ? a.head : a), n.insertBefore(t, n.firstChild));
  }
  function Ic(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy),
      t.title == null && (t.title = n.title);
  }
  function Xc(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy),
      t.integrity == null && (t.integrity = n.integrity);
  }
  var qs = null;
  function Wg(t, n, a) {
    if (qs === null) {
      var s = new Map(),
        f = (qs = new Map());
      f.set(a, s);
    } else (f = qs), (s = f.get(a)), s || ((s = new Map()), f.set(a, s));
    if (s.has(t)) return s;
    for (
      s.set(t, null), a = a.getElementsByTagName(t), f = 0;
      f < a.length;
      f++
    ) {
      var d = a[f];
      if (
        !(
          d[pa] ||
          d[me] ||
          (t === 'link' && d.getAttribute('rel') === 'stylesheet')
        ) &&
        d.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var v = d.getAttribute(n) || '';
        v = t + v;
        var S = s.get(v);
        S ? S.push(d) : s.set(v, [d]);
      }
    }
    return s;
  }
  function ty(t, n, a) {
    (t = t.ownerDocument || t),
      t.head.insertBefore(
        a,
        n === 'title' ? t.querySelector('head > title') : null,
      );
  }
  function wT(t, n, a) {
    if (a === 1 || n.itemProp != null) return !1;
    switch (t) {
      case 'meta':
      case 'title':
        return !0;
      case 'style':
        if (
          typeof n.precedence != 'string' ||
          typeof n.href != 'string' ||
          n.href === ''
        )
          break;
        return !0;
      case 'link':
        if (
          typeof n.rel != 'string' ||
          typeof n.href != 'string' ||
          n.href === '' ||
          n.onLoad ||
          n.onError
        )
          break;
        switch (n.rel) {
          case 'stylesheet':
            return (
              (t = n.disabled), typeof n.precedence == 'string' && t == null
            );
          default:
            return !0;
        }
      case 'script':
        if (
          n.async &&
          typeof n.async != 'function' &&
          typeof n.async != 'symbol' &&
          !n.onLoad &&
          !n.onError &&
          n.src &&
          typeof n.src == 'string'
        )
          return !0;
    }
    return !1;
  }
  function ey(t) {
    return !(t.type === 'stylesheet' && (t.state.loading & 3) === 0);
  }
  function ET(t, n, a, s) {
    if (
      a.type === 'stylesheet' &&
      (typeof s.media != 'string' || matchMedia(s.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var f = Yl(s.href),
          d = n.querySelector(Ja(f));
        if (d) {
          (n = d._p),
            n !== null &&
              typeof n == 'object' &&
              typeof n.then == 'function' &&
              (t.count++, (t = Ps.bind(t)), n.then(t, t)),
            (a.state.loading |= 4),
            (a.instance = d),
            de(d);
          return;
        }
        (d = n.ownerDocument || n),
          (s = Jg(s)),
          (f = un.get(f)) && Ic(s, f),
          (d = d.createElement('link')),
          de(d);
        var v = d;
        (v._p = new Promise(function (S, k) {
          (v.onload = S), (v.onerror = k);
        })),
          xe(d, 'link', s),
          (a.instance = d);
      }
      t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(a, n),
        (n = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (t.count++,
          (a = Ps.bind(t)),
          n.addEventListener('load', a),
          n.addEventListener('error', a));
    }
  }
  var Qc = 0;
  function kT(t, n) {
    return (
      t.stylesheets && t.count === 0 && Ys(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (a) {
            var s = setTimeout(function () {
              if ((t.stylesheets && Ys(t, t.stylesheets), t.unsuspend)) {
                var d = t.unsuspend;
                (t.unsuspend = null), d();
              }
            }, 6e4 + n);
            0 < t.imgBytes && Qc === 0 && (Qc = 62500 * rT());
            var f = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 &&
                    (t.stylesheets && Ys(t, t.stylesheets), t.unsuspend))
                ) {
                  var d = t.unsuspend;
                  (t.unsuspend = null), d();
                }
              },
              (t.imgBytes > Qc ? 50 : 800) + n,
            );
            return (
              (t.unsuspend = a),
              function () {
                (t.unsuspend = null), clearTimeout(s), clearTimeout(f);
              }
            );
          }
        : null
    );
  }
  function Ps() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) Ys(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        (this.unsuspend = null), t();
      }
    }
  }
  var Gs = null;
  function Ys(t, n) {
    (t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++,
        (Gs = new Map()),
        n.forEach(CT, t),
        (Gs = null),
        Ps.call(t));
  }
  function CT(t, n) {
    if (!(n.state.loading & 4)) {
      var a = Gs.get(t);
      if (a) var s = a.get(null);
      else {
        (a = new Map()), Gs.set(t, a);
        for (
          var f = t.querySelectorAll(
              'link[data-precedence],style[data-precedence]',
            ),
            d = 0;
          d < f.length;
          d++
        ) {
          var v = f[d];
          (v.nodeName === 'LINK' || v.getAttribute('media') !== 'not all') &&
            (a.set(v.dataset.precedence, v), (s = v));
        }
        s && a.set(null, s);
      }
      (f = n.instance),
        (v = f.getAttribute('data-precedence')),
        (d = a.get(v) || s),
        d === s && a.set(null, f),
        a.set(v, f),
        this.count++,
        (s = Ps.bind(this)),
        f.addEventListener('load', s),
        f.addEventListener('error', s),
        d
          ? d.parentNode.insertBefore(f, d.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t),
            t.insertBefore(f, t.firstChild)),
        (n.state.loading |= 4);
    }
  }
  var Wa = {
    $$typeof: R,
    Provider: null,
    Consumer: null,
    _currentValue: lt,
    _currentValue2: lt,
    _threadCount: 0,
  };
  function MT(t, n, a, s, f, d, v, S, k) {
    (this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Go(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Go(0)),
      (this.hiddenUpdates = Go(null)),
      (this.identifierPrefix = s),
      (this.onUncaughtError = f),
      (this.onCaughtError = d),
      (this.onRecoverableError = v),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = k),
      (this.incompleteTransitions = new Map());
  }
  function ny(t, n, a, s, f, d, v, S, k, B, P, X) {
    return (
      (t = new MT(t, n, a, v, k, B, P, X, S)),
      (n = 1),
      d === !0 && (n |= 24),
      (d = Ge(3, null, null, n)),
      (t.current = d),
      (d.stateNode = t),
      (n = Cu()),
      n.refCount++,
      (t.pooledCache = n),
      n.refCount++,
      (d.memoizedState = { element: s, isDehydrated: a, cache: n }),
      Ou(d),
      t
    );
  }
  function iy(t) {
    return t ? ((t = Tl), t) : Tl;
  }
  function ly(t, n, a, s, f, d) {
    (f = iy(f)),
      s.context === null ? (s.context = f) : (s.pendingContext = f),
      (s = si(n)),
      (s.payload = { element: a }),
      (d = d === void 0 ? null : d),
      d !== null && (s.callback = d),
      (a = oi(t, s, n)),
      a !== null && (Ve(a, t, n), Oa(a, t, n));
  }
  function ay(t, n) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < n ? a : n;
    }
  }
  function Kc(t, n) {
    ay(t, n), (t = t.alternate) && ay(t, n);
  }
  function ry(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Bi(t, 67108864);
      n !== null && Ve(n, t, 67108864), Kc(t, 67108864);
    }
  }
  function sy(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Qe();
      n = Yo(n);
      var a = Bi(t, n);
      a !== null && Ve(a, t, n), Kc(t, n);
    }
  }
  var Fs = !0;
  function DT(t, n, a, s) {
    var f = N.T;
    N.T = null;
    var d = Z.p;
    try {
      (Z.p = 2), Zc(t, n, a, s);
    } finally {
      (Z.p = d), (N.T = f);
    }
  }
  function zT(t, n, a, s) {
    var f = N.T;
    N.T = null;
    var d = Z.p;
    try {
      (Z.p = 8), Zc(t, n, a, s);
    } finally {
      (Z.p = d), (N.T = f);
    }
  }
  function Zc(t, n, a, s) {
    if (Fs) {
      var f = Jc(s);
      if (f === null) jc(t, n, s, Is, a), uy(t, s);
      else if (RT(f, t, n, a, s)) s.stopPropagation();
      else if ((uy(t, s), n & 4 && -1 < OT.indexOf(t))) {
        for (; f !== null; ) {
          var d = fl(f);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
                  var v = Ri(d.pendingLanes);
                  if (v !== 0) {
                    var S = d;
                    for (S.pendingLanes |= 2, S.entangledLanes |= 2; v; ) {
                      var k = 1 << (31 - Pt(v));
                      (S.entanglements[1] |= k), (v &= ~k);
                    }
                    wn(d), (Nt & 6) === 0 && ((Ms = Ee() + 500), Xa(0));
                  }
                }
                break;
              case 31:
              case 13:
                (S = Bi(d, 2)), S !== null && Ve(S, d, 2), zs(), Kc(d, 2);
            }
          if (((d = Jc(s)), d === null && jc(t, n, s, Is, a), d === f)) break;
          f = d;
        }
        f !== null && s.stopPropagation();
      } else jc(t, n, s, null, a);
    }
  }
  function Jc(t) {
    return (t = Wo(t)), $c(t);
  }
  var Is = null;
  function $c(t) {
    if (((Is = null), (t = cl(t)), t !== null)) {
      var n = c(t);
      if (n === null) t = null;
      else {
        var a = n.tag;
        if (a === 13) {
          if (((t = u(n)), t !== null)) return t;
          t = null;
        } else if (a === 31) {
          if (((t = h(n)), t !== null)) return t;
          t = null;
        } else if (a === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          t = null;
        } else n !== t && (t = null);
      }
    }
    return (Is = t), null;
  }
  function oy(t) {
    switch (t) {
      case 'beforetoggle':
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'toggle':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 2;
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 8;
      case 'message':
        switch (Po()) {
          case F:
            return 2;
          case nt:
            return 8;
          case yt:
          case At:
            return 32;
          case Lt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Wc = !1,
    xi = null,
    bi = null,
    Si = null,
    tr = new Map(),
    er = new Map(),
    Ti = [],
    OT =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' ',
      );
  function uy(t, n) {
    switch (t) {
      case 'focusin':
      case 'focusout':
        xi = null;
        break;
      case 'dragenter':
      case 'dragleave':
        bi = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Si = null;
        break;
      case 'pointerover':
      case 'pointerout':
        tr.delete(n.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        er.delete(n.pointerId);
    }
  }
  function nr(t, n, a, s, f, d) {
    return t === null || t.nativeEvent !== d
      ? ((t = {
          blockedOn: n,
          domEventName: a,
          eventSystemFlags: s,
          nativeEvent: d,
          targetContainers: [f],
        }),
        n !== null && ((n = fl(n)), n !== null && ry(n)),
        t)
      : ((t.eventSystemFlags |= s),
        (n = t.targetContainers),
        f !== null && n.indexOf(f) === -1 && n.push(f),
        t);
  }
  function RT(t, n, a, s, f) {
    switch (n) {
      case 'focusin':
        return (xi = nr(xi, t, n, a, s, f)), !0;
      case 'dragenter':
        return (bi = nr(bi, t, n, a, s, f)), !0;
      case 'mouseover':
        return (Si = nr(Si, t, n, a, s, f)), !0;
      case 'pointerover':
        var d = f.pointerId;
        return tr.set(d, nr(tr.get(d) || null, t, n, a, s, f)), !0;
      case 'gotpointercapture':
        return (
          (d = f.pointerId), er.set(d, nr(er.get(d) || null, t, n, a, s, f)), !0
        );
    }
    return !1;
  }
  function cy(t) {
    var n = cl(t.target);
    if (n !== null) {
      var a = c(n);
      if (a !== null) {
        if (((n = a.tag), n === 13)) {
          if (((n = u(a)), n !== null)) {
            (t.blockedOn = n),
              wd(t.priority, function () {
                sy(a);
              });
            return;
          }
        } else if (n === 31) {
          if (((n = h(a)), n !== null)) {
            (t.blockedOn = n),
              wd(t.priority, function () {
                sy(a);
              });
            return;
          }
        } else if (n === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Xs(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var a = Jc(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var s = new a.constructor(a.type, a);
        ($o = s), a.target.dispatchEvent(s), ($o = null);
      } else return (n = fl(a)), n !== null && ry(n), (t.blockedOn = a), !1;
      n.shift();
    }
    return !0;
  }
  function fy(t, n, a) {
    Xs(t) && a.delete(n);
  }
  function _T() {
    (Wc = !1),
      xi !== null && Xs(xi) && (xi = null),
      bi !== null && Xs(bi) && (bi = null),
      Si !== null && Xs(Si) && (Si = null),
      tr.forEach(fy),
      er.forEach(fy);
  }
  function Qs(t, n) {
    t.blockedOn === n &&
      ((t.blockedOn = null),
      Wc ||
        ((Wc = !0),
        e.unstable_scheduleCallback(e.unstable_NormalPriority, _T)));
  }
  var Ks = null;
  function hy(t) {
    Ks !== t &&
      ((Ks = t),
      e.unstable_scheduleCallback(e.unstable_NormalPriority, function () {
        Ks === t && (Ks = null);
        for (var n = 0; n < t.length; n += 3) {
          var a = t[n],
            s = t[n + 1],
            f = t[n + 2];
          if (typeof s != 'function') {
            if ($c(s || a) === null) continue;
            break;
          }
          var d = fl(a);
          d !== null &&
            (t.splice(n, 3),
            (n -= 3),
            Ju(d, { pending: !0, data: f, method: a.method, action: s }, s, f));
        }
      }));
  }
  function Il(t) {
    function n(k) {
      return Qs(k, t);
    }
    xi !== null && Qs(xi, t),
      bi !== null && Qs(bi, t),
      Si !== null && Qs(Si, t),
      tr.forEach(n),
      er.forEach(n);
    for (var a = 0; a < Ti.length; a++) {
      var s = Ti[a];
      s.blockedOn === t && (s.blockedOn = null);
    }
    for (; 0 < Ti.length && ((a = Ti[0]), a.blockedOn === null); )
      cy(a), a.blockedOn === null && Ti.shift();
    if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
      for (s = 0; s < a.length; s += 3) {
        var f = a[s],
          d = a[s + 1],
          v = f[Re] || null;
        if (typeof d == 'function') v || hy(a);
        else if (v) {
          var S = null;
          if (d && d.hasAttribute('formAction')) {
            if (((f = d), (v = d[Re] || null))) S = v.formAction;
            else if ($c(f) !== null) continue;
          } else S = v.action;
          typeof S == 'function' ? (a[s + 1] = S) : (a.splice(s, 3), (s -= 3)),
            hy(a);
        }
      }
  }
  function dy() {
    function t(d) {
      d.canIntercept &&
        d.info === 'react-transition' &&
        d.intercept({
          handler: function () {
            return new Promise(function (v) {
              return (f = v);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function n() {
      f !== null && (f(), (f = null)), s || setTimeout(a, 20);
    }
    function a() {
      if (!s && !navigation.transition) {
        var d = navigation.currentEntry;
        d &&
          d.url != null &&
          navigation.navigate(d.url, {
            state: d.getState(),
            info: 'react-transition',
            history: 'replace',
          });
      }
    }
    if (typeof navigation == 'object') {
      var s = !1,
        f = null;
      return (
        navigation.addEventListener('navigate', t),
        navigation.addEventListener('navigatesuccess', n),
        navigation.addEventListener('navigateerror', n),
        setTimeout(a, 100),
        function () {
          (s = !0),
            navigation.removeEventListener('navigate', t),
            navigation.removeEventListener('navigatesuccess', n),
            navigation.removeEventListener('navigateerror', n),
            f !== null && (f(), (f = null));
        }
      );
    }
  }
  function tf(t) {
    this._internalRoot = t;
  }
  (Zs.prototype.render = tf.prototype.render =
    function (t) {
      var n = this._internalRoot;
      if (n === null) throw Error(r(409));
      var a = n.current,
        s = Qe();
      ly(a, s, t, n, null, null);
    }),
    (Zs.prototype.unmount = tf.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var n = t.containerInfo;
          ly(t.current, 2, null, t, null, null), zs(), (n[ul] = null);
        }
      });
  function Zs(t) {
    this._internalRoot = t;
  }
  Zs.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var n = Ad();
      t = { blockedOn: null, target: t, priority: n };
      for (var a = 0; a < Ti.length && n !== 0 && n < Ti[a].priority; a++);
      Ti.splice(a, 0, t), a === 0 && cy(t);
    }
  };
  var py = i.version;
  if (py !== '19.2.6') throw Error(r(527, py, '19.2.6'));
  Z.findDOMNode = function (t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == 'function'
        ? Error(r(188))
        : ((t = Object.keys(t).join(',')), Error(r(268, t)));
    return (
      (t = p(n)),
      (t = t !== null ? g(t) : null),
      (t = t === null ? null : t.stateNode),
      t
    );
  };
  var NT = {
    bundleType: 0,
    version: '19.2.6',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: N,
    reconcilerVersion: '19.2.6',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Js = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Js.isDisabled && Js.supportsFiber)
      try {
        (ke = Js.inject(NT)), (ce = Js);
      } catch {}
  }
  return (
    (lr.createRoot = function (t, n) {
      if (!o(t)) throw Error(r(299));
      var a = !1,
        s = '',
        f = Sm,
        d = Tm,
        v = Am;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (a = !0),
          n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (f = n.onUncaughtError),
          n.onCaughtError !== void 0 && (d = n.onCaughtError),
          n.onRecoverableError !== void 0 && (v = n.onRecoverableError)),
        (n = ny(t, 1, !1, null, null, a, s, null, f, d, v, dy)),
        (t[ul] = n.current),
        Lc(t),
        new tf(n)
      );
    }),
    (lr.hydrateRoot = function (t, n, a) {
      if (!o(t)) throw Error(r(299));
      var s = !1,
        f = '',
        d = Sm,
        v = Tm,
        S = Am,
        k = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (s = !0),
          a.identifierPrefix !== void 0 && (f = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (d = a.onUncaughtError),
          a.onCaughtError !== void 0 && (v = a.onCaughtError),
          a.onRecoverableError !== void 0 && (S = a.onRecoverableError),
          a.formState !== void 0 && (k = a.formState)),
        (n = ny(t, 1, !0, n, a ?? null, s, f, k, d, v, S, dy)),
        (n.context = iy(null)),
        (a = n.current),
        (s = Qe()),
        (s = Yo(s)),
        (f = si(s)),
        (f.callback = null),
        oi(a, f, s),
        (a = s),
        (n.current.lanes = a),
        da(n, a),
        wn(n),
        (t[ul] = n.current),
        Lc(t),
        new Zs(n)
      );
    }),
    (lr.version = '19.2.6'),
    lr
  );
}
var wy;
function YT() {
  if (wy) return lf.exports;
  wy = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (i) {
        console.error(i);
      }
  }
  return e(), (lf.exports = GT()), lf.exports;
}
var FT = YT();
function IT(e, i) {
  const l = {};
  return (e[e.length - 1] === '' ? [...e, ''] : e)
    .join((l.padRight ? ' ' : '') + ',' + (l.padLeft === !1 ? '' : ' '))
    .trim();
}
const XT = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
  QT = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
  KT = {};
function Ey(e, i) {
  return (KT.jsx ? QT : XT).test(e);
}
const ZT = /[ \t\n\f\r]/g;
function JT(e) {
  return typeof e == 'object' ? (e.type === 'text' ? ky(e.value) : !1) : ky(e);
}
function ky(e) {
  return e.replace(ZT, '') === '';
}
class kr {
  constructor(i, l, r) {
    (this.normal = l), (this.property = i), r && (this.space = r);
  }
}
kr.prototype.normal = {};
kr.prototype.property = {};
kr.prototype.space = void 0;
function O1(e, i) {
  const l = {},
    r = {};
  for (const o of e) Object.assign(l, o.property), Object.assign(r, o.normal);
  return new kr(l, r, i);
}
function qf(e) {
  return e.toLowerCase();
}
let He = class {
  constructor(i, l) {
    (this.attribute = l), (this.property = i);
  }
};
He.prototype.attribute = '';
He.prototype.booleanish = !1;
He.prototype.boolean = !1;
He.prototype.commaOrSpaceSeparated = !1;
He.prototype.commaSeparated = !1;
He.prototype.defined = !1;
He.prototype.mustUseProperty = !1;
He.prototype.number = !1;
He.prototype.overloadedBoolean = !1;
He.prototype.property = '';
He.prototype.spaceSeparated = !1;
He.prototype.space = void 0;
let $T = 0;
const Tt = ll(),
  oe = ll(),
  Pf = ll(),
  tt = ll(),
  It = ll(),
  ea = ll(),
  Ke = ll();
function ll() {
  return 2 ** ++$T;
}
const Gf = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        boolean: Tt,
        booleanish: oe,
        commaOrSpaceSeparated: Ke,
        commaSeparated: ea,
        number: tt,
        overloadedBoolean: Pf,
        spaceSeparated: It,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  of = Object.keys(Gf);
class kh extends He {
  constructor(i, l, r, o) {
    let c = -1;
    if ((super(i, l), Cy(this, 'space', o), typeof r == 'number'))
      for (; ++c < of.length; ) {
        const u = of[c];
        Cy(this, of[c], (r & Gf[u]) === Gf[u]);
      }
  }
}
kh.prototype.defined = !0;
function Cy(e, i, l) {
  l && (e[i] = l);
}
function aa(e) {
  const i = {},
    l = {};
  for (const [r, o] of Object.entries(e.properties)) {
    const c = new kh(r, e.transform(e.attributes || {}, r), o, e.space);
    e.mustUseProperty &&
      e.mustUseProperty.includes(r) &&
      (c.mustUseProperty = !0),
      (i[r] = c),
      (l[qf(r)] = r),
      (l[qf(c.attribute)] = r);
  }
  return new kr(i, l, e.space);
}
const R1 = aa({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: oe,
    ariaAutoComplete: null,
    ariaBusy: oe,
    ariaChecked: oe,
    ariaColCount: tt,
    ariaColIndex: tt,
    ariaColSpan: tt,
    ariaControls: It,
    ariaCurrent: null,
    ariaDescribedBy: It,
    ariaDetails: null,
    ariaDisabled: oe,
    ariaDropEffect: It,
    ariaErrorMessage: null,
    ariaExpanded: oe,
    ariaFlowTo: It,
    ariaGrabbed: oe,
    ariaHasPopup: null,
    ariaHidden: oe,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: It,
    ariaLevel: tt,
    ariaLive: null,
    ariaModal: oe,
    ariaMultiLine: oe,
    ariaMultiSelectable: oe,
    ariaOrientation: null,
    ariaOwns: It,
    ariaPlaceholder: null,
    ariaPosInSet: tt,
    ariaPressed: oe,
    ariaReadOnly: oe,
    ariaRelevant: null,
    ariaRequired: oe,
    ariaRoleDescription: It,
    ariaRowCount: tt,
    ariaRowIndex: tt,
    ariaRowSpan: tt,
    ariaSelected: oe,
    ariaSetSize: tt,
    ariaSort: null,
    ariaValueMax: tt,
    ariaValueMin: tt,
    ariaValueNow: tt,
    ariaValueText: null,
    role: null,
  },
  transform(e, i) {
    return i === 'role' ? i : 'aria-' + i.slice(4).toLowerCase();
  },
});
function _1(e, i) {
  return i in e ? e[i] : i;
}
function N1(e, i) {
  return _1(e, i.toLowerCase());
}
const WT = aa({
    attributes: {
      acceptcharset: 'accept-charset',
      classname: 'class',
      htmlfor: 'for',
      httpequiv: 'http-equiv',
    },
    mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
    properties: {
      abbr: null,
      accept: ea,
      acceptCharset: It,
      accessKey: It,
      action: null,
      allow: null,
      allowFullScreen: Tt,
      allowPaymentRequest: Tt,
      allowUserMedia: Tt,
      alt: null,
      as: null,
      async: Tt,
      autoCapitalize: null,
      autoComplete: It,
      autoFocus: Tt,
      autoPlay: Tt,
      blocking: It,
      capture: null,
      charSet: null,
      checked: Tt,
      cite: null,
      className: It,
      cols: tt,
      colSpan: null,
      content: null,
      contentEditable: oe,
      controls: Tt,
      controlsList: It,
      coords: tt | ea,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: Tt,
      defer: Tt,
      dir: null,
      dirName: null,
      disabled: Tt,
      download: Pf,
      draggable: oe,
      encType: null,
      enterKeyHint: null,
      fetchPriority: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: Tt,
      formTarget: null,
      headers: It,
      height: tt,
      hidden: Pf,
      high: tt,
      href: null,
      hrefLang: null,
      htmlFor: It,
      httpEquiv: It,
      id: null,
      imageSizes: null,
      imageSrcSet: null,
      inert: Tt,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: Tt,
      itemId: null,
      itemProp: It,
      itemRef: It,
      itemScope: Tt,
      itemType: It,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: Tt,
      low: tt,
      manifest: null,
      max: null,
      maxLength: tt,
      media: null,
      method: null,
      min: null,
      minLength: tt,
      multiple: Tt,
      muted: Tt,
      name: null,
      nonce: null,
      noModule: Tt,
      noValidate: Tt,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforeMatch: null,
      onBeforePrint: null,
      onBeforeToggle: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextLost: null,
      onContextMenu: null,
      onContextRestored: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onScrollEnd: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: Tt,
      optimum: tt,
      pattern: null,
      ping: It,
      placeholder: null,
      playsInline: Tt,
      popover: null,
      popoverTarget: null,
      popoverTargetAction: null,
      poster: null,
      preload: null,
      readOnly: Tt,
      referrerPolicy: null,
      rel: It,
      required: Tt,
      reversed: Tt,
      rows: tt,
      rowSpan: tt,
      sandbox: It,
      scope: null,
      scoped: Tt,
      seamless: Tt,
      selected: Tt,
      shadowRootClonable: Tt,
      shadowRootDelegatesFocus: Tt,
      shadowRootMode: null,
      shape: null,
      size: tt,
      sizes: null,
      slot: null,
      span: tt,
      spellCheck: oe,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: null,
      start: tt,
      step: null,
      style: null,
      tabIndex: tt,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: Tt,
      useMap: null,
      value: oe,
      width: tt,
      wrap: null,
      writingSuggestions: null,
      align: null,
      aLink: null,
      archive: It,
      axis: null,
      background: null,
      bgColor: null,
      border: tt,
      borderColor: null,
      bottomMargin: tt,
      cellPadding: null,
      cellSpacing: null,
      char: null,
      charOff: null,
      classId: null,
      clear: null,
      code: null,
      codeBase: null,
      codeType: null,
      color: null,
      compact: Tt,
      declare: Tt,
      event: null,
      face: null,
      frame: null,
      frameBorder: null,
      hSpace: tt,
      leftMargin: tt,
      link: null,
      longDesc: null,
      lowSrc: null,
      marginHeight: tt,
      marginWidth: tt,
      noResize: Tt,
      noHref: Tt,
      noShade: Tt,
      noWrap: Tt,
      object: null,
      profile: null,
      prompt: null,
      rev: null,
      rightMargin: tt,
      rules: null,
      scheme: null,
      scrolling: oe,
      standby: null,
      summary: null,
      text: null,
      topMargin: tt,
      valueType: null,
      version: null,
      vAlign: null,
      vLink: null,
      vSpace: tt,
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: Tt,
      disableRemotePlayback: Tt,
      prefix: null,
      property: null,
      results: tt,
      security: null,
      unselectable: null,
    },
    space: 'html',
    transform: N1,
  }),
  t2 = aa({
    attributes: {
      accentHeight: 'accent-height',
      alignmentBaseline: 'alignment-baseline',
      arabicForm: 'arabic-form',
      baselineShift: 'baseline-shift',
      capHeight: 'cap-height',
      className: 'class',
      clipPath: 'clip-path',
      clipRule: 'clip-rule',
      colorInterpolation: 'color-interpolation',
      colorInterpolationFilters: 'color-interpolation-filters',
      colorProfile: 'color-profile',
      colorRendering: 'color-rendering',
      crossOrigin: 'crossorigin',
      dataType: 'datatype',
      dominantBaseline: 'dominant-baseline',
      enableBackground: 'enable-background',
      fillOpacity: 'fill-opacity',
      fillRule: 'fill-rule',
      floodColor: 'flood-color',
      floodOpacity: 'flood-opacity',
      fontFamily: 'font-family',
      fontSize: 'font-size',
      fontSizeAdjust: 'font-size-adjust',
      fontStretch: 'font-stretch',
      fontStyle: 'font-style',
      fontVariant: 'font-variant',
      fontWeight: 'font-weight',
      glyphName: 'glyph-name',
      glyphOrientationHorizontal: 'glyph-orientation-horizontal',
      glyphOrientationVertical: 'glyph-orientation-vertical',
      hrefLang: 'hreflang',
      horizAdvX: 'horiz-adv-x',
      horizOriginX: 'horiz-origin-x',
      horizOriginY: 'horiz-origin-y',
      imageRendering: 'image-rendering',
      letterSpacing: 'letter-spacing',
      lightingColor: 'lighting-color',
      markerEnd: 'marker-end',
      markerMid: 'marker-mid',
      markerStart: 'marker-start',
      navDown: 'nav-down',
      navDownLeft: 'nav-down-left',
      navDownRight: 'nav-down-right',
      navLeft: 'nav-left',
      navNext: 'nav-next',
      navPrev: 'nav-prev',
      navRight: 'nav-right',
      navUp: 'nav-up',
      navUpLeft: 'nav-up-left',
      navUpRight: 'nav-up-right',
      onAbort: 'onabort',
      onActivate: 'onactivate',
      onAfterPrint: 'onafterprint',
      onBeforePrint: 'onbeforeprint',
      onBegin: 'onbegin',
      onCancel: 'oncancel',
      onCanPlay: 'oncanplay',
      onCanPlayThrough: 'oncanplaythrough',
      onChange: 'onchange',
      onClick: 'onclick',
      onClose: 'onclose',
      onCopy: 'oncopy',
      onCueChange: 'oncuechange',
      onCut: 'oncut',
      onDblClick: 'ondblclick',
      onDrag: 'ondrag',
      onDragEnd: 'ondragend',
      onDragEnter: 'ondragenter',
      onDragExit: 'ondragexit',
      onDragLeave: 'ondragleave',
      onDragOver: 'ondragover',
      onDragStart: 'ondragstart',
      onDrop: 'ondrop',
      onDurationChange: 'ondurationchange',
      onEmptied: 'onemptied',
      onEnd: 'onend',
      onEnded: 'onended',
      onError: 'onerror',
      onFocus: 'onfocus',
      onFocusIn: 'onfocusin',
      onFocusOut: 'onfocusout',
      onHashChange: 'onhashchange',
      onInput: 'oninput',
      onInvalid: 'oninvalid',
      onKeyDown: 'onkeydown',
      onKeyPress: 'onkeypress',
      onKeyUp: 'onkeyup',
      onLoad: 'onload',
      onLoadedData: 'onloadeddata',
      onLoadedMetadata: 'onloadedmetadata',
      onLoadStart: 'onloadstart',
      onMessage: 'onmessage',
      onMouseDown: 'onmousedown',
      onMouseEnter: 'onmouseenter',
      onMouseLeave: 'onmouseleave',
      onMouseMove: 'onmousemove',
      onMouseOut: 'onmouseout',
      onMouseOver: 'onmouseover',
      onMouseUp: 'onmouseup',
      onMouseWheel: 'onmousewheel',
      onOffline: 'onoffline',
      onOnline: 'ononline',
      onPageHide: 'onpagehide',
      onPageShow: 'onpageshow',
      onPaste: 'onpaste',
      onPause: 'onpause',
      onPlay: 'onplay',
      onPlaying: 'onplaying',
      onPopState: 'onpopstate',
      onProgress: 'onprogress',
      onRateChange: 'onratechange',
      onRepeat: 'onrepeat',
      onReset: 'onreset',
      onResize: 'onresize',
      onScroll: 'onscroll',
      onSeeked: 'onseeked',
      onSeeking: 'onseeking',
      onSelect: 'onselect',
      onShow: 'onshow',
      onStalled: 'onstalled',
      onStorage: 'onstorage',
      onSubmit: 'onsubmit',
      onSuspend: 'onsuspend',
      onTimeUpdate: 'ontimeupdate',
      onToggle: 'ontoggle',
      onUnload: 'onunload',
      onVolumeChange: 'onvolumechange',
      onWaiting: 'onwaiting',
      onZoom: 'onzoom',
      overlinePosition: 'overline-position',
      overlineThickness: 'overline-thickness',
      paintOrder: 'paint-order',
      panose1: 'panose-1',
      pointerEvents: 'pointer-events',
      referrerPolicy: 'referrerpolicy',
      renderingIntent: 'rendering-intent',
      shapeRendering: 'shape-rendering',
      stopColor: 'stop-color',
      stopOpacity: 'stop-opacity',
      strikethroughPosition: 'strikethrough-position',
      strikethroughThickness: 'strikethrough-thickness',
      strokeDashArray: 'stroke-dasharray',
      strokeDashOffset: 'stroke-dashoffset',
      strokeLineCap: 'stroke-linecap',
      strokeLineJoin: 'stroke-linejoin',
      strokeMiterLimit: 'stroke-miterlimit',
      strokeOpacity: 'stroke-opacity',
      strokeWidth: 'stroke-width',
      tabIndex: 'tabindex',
      textAnchor: 'text-anchor',
      textDecoration: 'text-decoration',
      textRendering: 'text-rendering',
      transformOrigin: 'transform-origin',
      typeOf: 'typeof',
      underlinePosition: 'underline-position',
      underlineThickness: 'underline-thickness',
      unicodeBidi: 'unicode-bidi',
      unicodeRange: 'unicode-range',
      unitsPerEm: 'units-per-em',
      vAlphabetic: 'v-alphabetic',
      vHanging: 'v-hanging',
      vIdeographic: 'v-ideographic',
      vMathematical: 'v-mathematical',
      vectorEffect: 'vector-effect',
      vertAdvY: 'vert-adv-y',
      vertOriginX: 'vert-origin-x',
      vertOriginY: 'vert-origin-y',
      wordSpacing: 'word-spacing',
      writingMode: 'writing-mode',
      xHeight: 'x-height',
      playbackOrder: 'playbackorder',
      timelineBegin: 'timelinebegin',
    },
    properties: {
      about: Ke,
      accentHeight: tt,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: tt,
      amplitude: tt,
      arabicForm: null,
      ascent: tt,
      attributeName: null,
      attributeType: null,
      azimuth: tt,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: tt,
      by: null,
      calcMode: null,
      capHeight: tt,
      className: It,
      clip: null,
      clipPath: null,
      clipPathUnits: null,
      clipRule: null,
      color: null,
      colorInterpolation: null,
      colorInterpolationFilters: null,
      colorProfile: null,
      colorRendering: null,
      content: null,
      contentScriptType: null,
      contentStyleType: null,
      crossOrigin: null,
      cursor: null,
      cx: null,
      cy: null,
      d: null,
      dataType: null,
      defaultAction: null,
      descent: tt,
      diffuseConstant: tt,
      direction: null,
      display: null,
      dur: null,
      divisor: tt,
      dominantBaseline: null,
      download: Tt,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: tt,
      enableBackground: null,
      end: null,
      event: null,
      exponent: tt,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: tt,
      fillRule: null,
      filter: null,
      filterRes: null,
      filterUnits: null,
      floodColor: null,
      floodOpacity: null,
      focusable: null,
      focusHighlight: null,
      fontFamily: null,
      fontSize: null,
      fontSizeAdjust: null,
      fontStretch: null,
      fontStyle: null,
      fontVariant: null,
      fontWeight: null,
      format: null,
      fr: null,
      from: null,
      fx: null,
      fy: null,
      g1: ea,
      g2: ea,
      glyphName: ea,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: tt,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: tt,
      horizOriginX: tt,
      horizOriginY: tt,
      id: null,
      ideographic: tt,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: tt,
      k: tt,
      k1: tt,
      k2: tt,
      k3: tt,
      k4: tt,
      kernelMatrix: Ke,
      kernelUnitLength: null,
      keyPoints: null,
      keySplines: null,
      keyTimes: null,
      kerning: null,
      lang: null,
      lengthAdjust: null,
      letterSpacing: null,
      lightingColor: null,
      limitingConeAngle: tt,
      local: null,
      markerEnd: null,
      markerMid: null,
      markerStart: null,
      markerHeight: null,
      markerUnits: null,
      markerWidth: null,
      mask: null,
      maskContentUnits: null,
      maskUnits: null,
      mathematical: null,
      max: null,
      media: null,
      mediaCharacterEncoding: null,
      mediaContentEncodings: null,
      mediaSize: tt,
      mediaTime: null,
      method: null,
      min: null,
      mode: null,
      name: null,
      navDown: null,
      navDownLeft: null,
      navDownRight: null,
      navLeft: null,
      navNext: null,
      navPrev: null,
      navRight: null,
      navUp: null,
      navUpLeft: null,
      navUpRight: null,
      numOctaves: null,
      observer: null,
      offset: null,
      onAbort: null,
      onActivate: null,
      onAfterPrint: null,
      onBeforePrint: null,
      onBegin: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnd: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFocusIn: null,
      onFocusOut: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadStart: null,
      onMessage: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onMouseWheel: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRepeat: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onShow: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onZoom: null,
      opacity: null,
      operator: null,
      order: null,
      orient: null,
      orientation: null,
      origin: null,
      overflow: null,
      overlay: null,
      overlinePosition: tt,
      overlineThickness: tt,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: tt,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: It,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: tt,
      pointsAtY: tt,
      pointsAtZ: tt,
      preserveAlpha: null,
      preserveAspectRatio: null,
      primitiveUnits: null,
      propagate: null,
      property: Ke,
      r: null,
      radius: null,
      referrerPolicy: null,
      refX: null,
      refY: null,
      rel: Ke,
      rev: Ke,
      renderingIntent: null,
      repeatCount: null,
      repeatDur: null,
      requiredExtensions: Ke,
      requiredFeatures: Ke,
      requiredFonts: Ke,
      requiredFormats: Ke,
      resource: null,
      restart: null,
      result: null,
      rotate: null,
      rx: null,
      ry: null,
      scale: null,
      seed: null,
      shapeRendering: null,
      side: null,
      slope: null,
      snapshotTime: null,
      specularConstant: tt,
      specularExponent: tt,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: tt,
      strikethroughThickness: tt,
      string: null,
      stroke: null,
      strokeDashArray: Ke,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: tt,
      strokeOpacity: tt,
      strokeWidth: null,
      style: null,
      surfaceScale: tt,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: Ke,
      tabIndex: tt,
      tableValues: null,
      target: null,
      targetX: tt,
      targetY: tt,
      textAnchor: null,
      textDecoration: null,
      textRendering: null,
      textLength: null,
      timelineBegin: null,
      title: null,
      transformBehavior: null,
      type: null,
      typeOf: Ke,
      to: null,
      transform: null,
      transformOrigin: null,
      u1: null,
      u2: null,
      underlinePosition: tt,
      underlineThickness: tt,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: tt,
      values: null,
      vAlphabetic: tt,
      vMathematical: tt,
      vectorEffect: null,
      vHanging: tt,
      vIdeographic: tt,
      version: null,
      vertAdvY: tt,
      vertOriginX: tt,
      vertOriginY: tt,
      viewBox: null,
      viewTarget: null,
      visibility: null,
      width: null,
      widths: null,
      wordSpacing: null,
      writingMode: null,
      x: null,
      x1: null,
      x2: null,
      xChannelSelector: null,
      xHeight: tt,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null,
    },
    space: 'svg',
    transform: _1,
  }),
  L1 = aa({
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null,
    },
    space: 'xlink',
    transform(e, i) {
      return 'xlink:' + i.slice(5).toLowerCase();
    },
  }),
  j1 = aa({
    attributes: { xmlnsxlink: 'xmlns:xlink' },
    properties: { xmlnsXLink: null, xmlns: null },
    space: 'xmlns',
    transform: N1,
  }),
  B1 = aa({
    properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
    space: 'xml',
    transform(e, i) {
      return 'xml:' + i.slice(3).toLowerCase();
    },
  }),
  e2 = {
    classId: 'classID',
    dataType: 'datatype',
    itemId: 'itemID',
    strokeDashArray: 'strokeDasharray',
    strokeDashOffset: 'strokeDashoffset',
    strokeLineCap: 'strokeLinecap',
    strokeLineJoin: 'strokeLinejoin',
    strokeMiterLimit: 'strokeMiterlimit',
    typeOf: 'typeof',
    xLinkActuate: 'xlinkActuate',
    xLinkArcRole: 'xlinkArcrole',
    xLinkHref: 'xlinkHref',
    xLinkRole: 'xlinkRole',
    xLinkShow: 'xlinkShow',
    xLinkTitle: 'xlinkTitle',
    xLinkType: 'xlinkType',
    xmlnsXLink: 'xmlnsXlink',
  },
  n2 = /[A-Z]/g,
  My = /-[a-z]/g,
  i2 = /^data[-\w.:]+$/i;
function l2(e, i) {
  const l = qf(i);
  let r = i,
    o = He;
  if (l in e.normal) return e.property[e.normal[l]];
  if (l.length > 4 && l.slice(0, 4) === 'data' && i2.test(i)) {
    if (i.charAt(4) === '-') {
      const c = i.slice(5).replace(My, r2);
      r = 'data' + c.charAt(0).toUpperCase() + c.slice(1);
    } else {
      const c = i.slice(4);
      if (!My.test(c)) {
        let u = c.replace(n2, a2);
        u.charAt(0) !== '-' && (u = '-' + u), (i = 'data' + u);
      }
    }
    o = kh;
  }
  return new o(r, i);
}
function a2(e) {
  return '-' + e.toLowerCase();
}
function r2(e) {
  return e.charAt(1).toUpperCase();
}
const s2 = O1([R1, WT, L1, j1, B1], 'html'),
  Ch = O1([R1, t2, L1, j1, B1], 'svg');
function o2(e) {
  return e.join(' ').trim();
}
var Xl = {},
  uf,
  Dy;
function u2() {
  if (Dy) return uf;
  Dy = 1;
  var e = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
    i = /\n/g,
    l = /^\s*/,
    r = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
    o = /^:\s*/,
    c = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
    u = /^[;\s]*/,
    h = /^\s+|\s+$/g,
    m = `
`,
    p = '/',
    g = '*',
    y = '',
    x = 'comment',
    b = 'declaration';
  function T(D, E) {
    if (typeof D != 'string')
      throw new TypeError('First argument must be a string');
    if (!D) return [];
    E = E || {};
    var L = 1,
      R = 1;
    function Y(st) {
      var W = st.match(i);
      W && (L += W.length);
      var N = st.lastIndexOf(m);
      R = ~N ? st.length - N : R + st.length;
    }
    function Q() {
      var st = { line: L, column: R };
      return function (W) {
        return (W.position = new V(st)), it(), W;
      };
    }
    function V(st) {
      (this.start = st),
        (this.end = { line: L, column: R }),
        (this.source = E.source);
    }
    V.prototype.content = D;
    function K(st) {
      var W = new Error(E.source + ':' + L + ':' + R + ': ' + st);
      if (
        ((W.reason = st),
        (W.filename = E.source),
        (W.line = L),
        (W.column = R),
        (W.source = D),
        !E.silent)
      )
        throw W;
    }
    function $(st) {
      var W = st.exec(D);
      if (W) {
        var N = W[0];
        return Y(N), (D = D.slice(N.length)), W;
      }
    }
    function it() {
      $(l);
    }
    function O(st) {
      var W;
      for (st = st || []; (W = J()); ) W !== !1 && st.push(W);
      return st;
    }
    function J() {
      var st = Q();
      if (!(p != D.charAt(0) || g != D.charAt(1))) {
        for (
          var W = 2;
          y != D.charAt(W) && (g != D.charAt(W) || p != D.charAt(W + 1));

        )
          ++W;
        if (((W += 2), y === D.charAt(W - 1)))
          return K('End of comment missing');
        var N = D.slice(2, W - 2);
        return (
          (R += 2),
          Y(N),
          (D = D.slice(W)),
          (R += 2),
          st({ type: x, comment: N })
        );
      }
    }
    function et() {
      var st = Q(),
        W = $(r);
      if (W) {
        if ((J(), !$(o))) return K("property missing ':'");
        var N = $(c),
          Z = st({
            type: b,
            property: M(W[0].replace(e, y)),
            value: N ? M(N[0].replace(e, y)) : y,
          });
        return $(u), Z;
      }
    }
    function vt() {
      var st = [];
      O(st);
      for (var W; (W = et()); ) W !== !1 && (st.push(W), O(st));
      return st;
    }
    return it(), vt();
  }
  function M(D) {
    return D ? D.replace(h, y) : y;
  }
  return (uf = T), uf;
}
var zy;
function c2() {
  if (zy) return Xl;
  zy = 1;
  var e =
    (Xl && Xl.__importDefault) ||
    function (r) {
      return r && r.__esModule ? r : { default: r };
    };
  Object.defineProperty(Xl, '__esModule', { value: !0 }), (Xl.default = l);
  const i = e(u2());
  function l(r, o) {
    let c = null;
    if (!r || typeof r != 'string') return c;
    const u = (0, i.default)(r),
      h = typeof o == 'function';
    return (
      u.forEach((m) => {
        if (m.type !== 'declaration') return;
        const { property: p, value: g } = m;
        h ? o(p, g, m) : g && ((c = c || {}), (c[p] = g));
      }),
      c
    );
  }
  return Xl;
}
var ar = {},
  Oy;
function f2() {
  if (Oy) return ar;
  (Oy = 1),
    Object.defineProperty(ar, '__esModule', { value: !0 }),
    (ar.camelCase = void 0);
  var e = /^--[a-zA-Z0-9_-]+$/,
    i = /-([a-z])/g,
    l = /^[^-]+$/,
    r = /^-(webkit|moz|ms|o|khtml)-/,
    o = /^-(ms)-/,
    c = function (p) {
      return !p || l.test(p) || e.test(p);
    },
    u = function (p, g) {
      return g.toUpperCase();
    },
    h = function (p, g) {
      return ''.concat(g, '-');
    },
    m = function (p, g) {
      return (
        g === void 0 && (g = {}),
        c(p)
          ? p
          : ((p = p.toLowerCase()),
            g.reactCompat ? (p = p.replace(o, h)) : (p = p.replace(r, h)),
            p.replace(i, u))
      );
    };
  return (ar.camelCase = m), ar;
}
var rr, Ry;
function h2() {
  if (Ry) return rr;
  Ry = 1;
  var e =
      (rr && rr.__importDefault) ||
      function (o) {
        return o && o.__esModule ? o : { default: o };
      },
    i = e(c2()),
    l = f2();
  function r(o, c) {
    var u = {};
    return (
      !o ||
        typeof o != 'string' ||
        (0, i.default)(o, function (h, m) {
          h && m && (u[(0, l.camelCase)(h, c)] = m);
        }),
      u
    );
  }
  return (r.default = r), (rr = r), rr;
}
var d2 = h2();
const p2 = wh(d2),
  V1 = U1('end'),
  Mh = U1('start');
function U1(e) {
  return i;
  function i(l) {
    const r = (l && l.position && l.position[e]) || {};
    if (
      typeof r.line == 'number' &&
      r.line > 0 &&
      typeof r.column == 'number' &&
      r.column > 0
    )
      return {
        line: r.line,
        column: r.column,
        offset:
          typeof r.offset == 'number' && r.offset > -1 ? r.offset : void 0,
      };
  }
}
function m2(e) {
  const i = Mh(e),
    l = V1(e);
  if (i && l) return { start: i, end: l };
}
function fr(e) {
  return !e || typeof e != 'object'
    ? ''
    : 'position' in e || 'type' in e
      ? _y(e.position)
      : 'start' in e || 'end' in e
        ? _y(e)
        : 'line' in e || 'column' in e
          ? Yf(e)
          : '';
}
function Yf(e) {
  return Ny(e && e.line) + ':' + Ny(e && e.column);
}
function _y(e) {
  return Yf(e && e.start) + '-' + Yf(e && e.end);
}
function Ny(e) {
  return e && typeof e == 'number' ? e : 1;
}
class we extends Error {
  constructor(i, l, r) {
    super(), typeof l == 'string' && ((r = l), (l = void 0));
    let o = '',
      c = {},
      u = !1;
    if (
      (l &&
        ('line' in l && 'column' in l
          ? (c = { place: l })
          : 'start' in l && 'end' in l
            ? (c = { place: l })
            : 'type' in l
              ? (c = { ancestors: [l], place: l.position })
              : (c = { ...l })),
      typeof i == 'string'
        ? (o = i)
        : !c.cause && i && ((u = !0), (o = i.message), (c.cause = i)),
      !c.ruleId && !c.source && typeof r == 'string')
    ) {
      const m = r.indexOf(':');
      m === -1
        ? (c.ruleId = r)
        : ((c.source = r.slice(0, m)), (c.ruleId = r.slice(m + 1)));
    }
    if (!c.place && c.ancestors && c.ancestors) {
      const m = c.ancestors[c.ancestors.length - 1];
      m && (c.place = m.position);
    }
    const h = c.place && 'start' in c.place ? c.place.start : c.place;
    (this.ancestors = c.ancestors || void 0),
      (this.cause = c.cause || void 0),
      (this.column = h ? h.column : void 0),
      (this.fatal = void 0),
      (this.file = ''),
      (this.message = o),
      (this.line = h ? h.line : void 0),
      (this.name = fr(c.place) || '1:1'),
      (this.place = c.place || void 0),
      (this.reason = this.message),
      (this.ruleId = c.ruleId || void 0),
      (this.source = c.source || void 0),
      (this.stack =
        u && c.cause && typeof c.cause.stack == 'string' ? c.cause.stack : ''),
      (this.actual = void 0),
      (this.expected = void 0),
      (this.note = void 0),
      (this.url = void 0);
  }
}
we.prototype.file = '';
we.prototype.name = '';
we.prototype.reason = '';
we.prototype.message = '';
we.prototype.stack = '';
we.prototype.column = void 0;
we.prototype.line = void 0;
we.prototype.ancestors = void 0;
we.prototype.cause = void 0;
we.prototype.fatal = void 0;
we.prototype.place = void 0;
we.prototype.ruleId = void 0;
we.prototype.source = void 0;
const Dh = {}.hasOwnProperty,
  g2 = new Map(),
  y2 = /[A-Z]/g,
  v2 = new Set(['table', 'tbody', 'thead', 'tfoot', 'tr']),
  x2 = new Set(['td', 'th']),
  H1 = 'https://github.com/syntax-tree/hast-util-to-jsx-runtime';
function b2(e, i) {
  if (!i || i.Fragment === void 0)
    throw new TypeError('Expected `Fragment` in options');
  const l = i.filePath || void 0;
  let r;
  if (i.development) {
    if (typeof i.jsxDEV != 'function')
      throw new TypeError(
        'Expected `jsxDEV` in options when `development: true`',
      );
    r = M2(l, i.jsxDEV);
  } else {
    if (typeof i.jsx != 'function')
      throw new TypeError('Expected `jsx` in production options');
    if (typeof i.jsxs != 'function')
      throw new TypeError('Expected `jsxs` in production options');
    r = C2(l, i.jsx, i.jsxs);
  }
  const o = {
      Fragment: i.Fragment,
      ancestors: [],
      components: i.components || {},
      create: r,
      elementAttributeNameCase: i.elementAttributeNameCase || 'react',
      evaluater: i.createEvaluater ? i.createEvaluater() : void 0,
      filePath: l,
      ignoreInvalidStyle: i.ignoreInvalidStyle || !1,
      passKeys: i.passKeys !== !1,
      passNode: i.passNode || !1,
      schema: i.space === 'svg' ? Ch : s2,
      stylePropertyNameCase: i.stylePropertyNameCase || 'dom',
      tableCellAlignToStyle: i.tableCellAlignToStyle !== !1,
    },
    c = q1(o, e, void 0);
  return c && typeof c != 'string'
    ? c
    : o.create(e, o.Fragment, { children: c || void 0 }, void 0);
}
function q1(e, i, l) {
  if (i.type === 'element') return S2(e, i, l);
  if (i.type === 'mdxFlowExpression' || i.type === 'mdxTextExpression')
    return T2(e, i);
  if (i.type === 'mdxJsxFlowElement' || i.type === 'mdxJsxTextElement')
    return w2(e, i, l);
  if (i.type === 'mdxjsEsm') return A2(e, i);
  if (i.type === 'root') return E2(e, i, l);
  if (i.type === 'text') return k2(e, i);
}
function S2(e, i, l) {
  const r = e.schema;
  let o = r;
  i.tagName.toLowerCase() === 'svg' &&
    r.space === 'html' &&
    ((o = Ch), (e.schema = o)),
    e.ancestors.push(i);
  const c = G1(e, i.tagName, !1),
    u = D2(e, i);
  let h = Oh(e, i);
  return (
    v2.has(i.tagName) &&
      (h = h.filter(function (m) {
        return typeof m == 'string' ? !JT(m) : !0;
      })),
    P1(e, u, c, i),
    zh(u, h),
    e.ancestors.pop(),
    (e.schema = r),
    e.create(i, c, u, l)
  );
}
function T2(e, i) {
  if (i.data && i.data.estree && e.evaluater) {
    const r = i.data.estree.body[0];
    return r.type, e.evaluater.evaluateExpression(r.expression);
  }
  br(e, i.position);
}
function A2(e, i) {
  if (i.data && i.data.estree && e.evaluater)
    return e.evaluater.evaluateProgram(i.data.estree);
  br(e, i.position);
}
function w2(e, i, l) {
  const r = e.schema;
  let o = r;
  i.name === 'svg' && r.space === 'html' && ((o = Ch), (e.schema = o)),
    e.ancestors.push(i);
  const c = i.name === null ? e.Fragment : G1(e, i.name, !0),
    u = z2(e, i),
    h = Oh(e, i);
  return (
    P1(e, u, c, i),
    zh(u, h),
    e.ancestors.pop(),
    (e.schema = r),
    e.create(i, c, u, l)
  );
}
function E2(e, i, l) {
  const r = {};
  return zh(r, Oh(e, i)), e.create(i, e.Fragment, r, l);
}
function k2(e, i) {
  return i.value;
}
function P1(e, i, l, r) {
  typeof l != 'string' && l !== e.Fragment && e.passNode && (i.node = r);
}
function zh(e, i) {
  if (i.length > 0) {
    const l = i.length > 1 ? i : i[0];
    l && (e.children = l);
  }
}
function C2(e, i, l) {
  return r;
  function r(o, c, u, h) {
    const p = Array.isArray(u.children) ? l : i;
    return h ? p(c, u, h) : p(c, u);
  }
}
function M2(e, i) {
  return l;
  function l(r, o, c, u) {
    const h = Array.isArray(c.children),
      m = Mh(r);
    return i(
      o,
      c,
      u,
      h,
      {
        columnNumber: m ? m.column - 1 : void 0,
        fileName: e,
        lineNumber: m ? m.line : void 0,
      },
      void 0,
    );
  }
}
function D2(e, i) {
  const l = {};
  let r, o;
  for (o in i.properties)
    if (o !== 'children' && Dh.call(i.properties, o)) {
      const c = O2(e, o, i.properties[o]);
      if (c) {
        const [u, h] = c;
        e.tableCellAlignToStyle &&
        u === 'align' &&
        typeof h == 'string' &&
        x2.has(i.tagName)
          ? (r = h)
          : (l[u] = h);
      }
    }
  if (r) {
    const c = l.style || (l.style = {});
    c[e.stylePropertyNameCase === 'css' ? 'text-align' : 'textAlign'] = r;
  }
  return l;
}
function z2(e, i) {
  const l = {};
  for (const r of i.attributes)
    if (r.type === 'mdxJsxExpressionAttribute')
      if (r.data && r.data.estree && e.evaluater) {
        const c = r.data.estree.body[0];
        c.type;
        const u = c.expression;
        u.type;
        const h = u.properties[0];
        h.type, Object.assign(l, e.evaluater.evaluateExpression(h.argument));
      } else br(e, i.position);
    else {
      const o = r.name;
      let c;
      if (r.value && typeof r.value == 'object')
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const h = r.value.data.estree.body[0];
          h.type, (c = e.evaluater.evaluateExpression(h.expression));
        } else br(e, i.position);
      else c = r.value === null ? !0 : r.value;
      l[o] = c;
    }
  return l;
}
function Oh(e, i) {
  const l = [];
  let r = -1;
  const o = e.passKeys ? new Map() : g2;
  for (; ++r < i.children.length; ) {
    const c = i.children[r];
    let u;
    if (e.passKeys) {
      const m =
        c.type === 'element'
          ? c.tagName
          : c.type === 'mdxJsxFlowElement' || c.type === 'mdxJsxTextElement'
            ? c.name
            : void 0;
      if (m) {
        const p = o.get(m) || 0;
        (u = m + '-' + p), o.set(m, p + 1);
      }
    }
    const h = q1(e, c, u);
    h !== void 0 && l.push(h);
  }
  return l;
}
function O2(e, i, l) {
  const r = l2(e.schema, i);
  if (!(l == null || (typeof l == 'number' && Number.isNaN(l)))) {
    if (
      (Array.isArray(l) && (l = r.commaSeparated ? IT(l) : o2(l)),
      r.property === 'style')
    ) {
      let o = typeof l == 'object' ? l : R2(e, String(l));
      return e.stylePropertyNameCase === 'css' && (o = _2(o)), ['style', o];
    }
    return [
      e.elementAttributeNameCase === 'react' && r.space
        ? e2[r.property] || r.property
        : r.attribute,
      l,
    ];
  }
}
function R2(e, i) {
  try {
    return p2(i, { reactCompat: !0 });
  } catch (l) {
    if (e.ignoreInvalidStyle) return {};
    const r = l,
      o = new we('Cannot parse `style` attribute', {
        ancestors: e.ancestors,
        cause: r,
        ruleId: 'style',
        source: 'hast-util-to-jsx-runtime',
      });
    throw (
      ((o.file = e.filePath || void 0),
      (o.url = H1 + '#cannot-parse-style-attribute'),
      o)
    );
  }
}
function G1(e, i, l) {
  let r;
  if (!l) r = { type: 'Literal', value: i };
  else if (i.includes('.')) {
    const o = i.split('.');
    let c = -1,
      u;
    for (; ++c < o.length; ) {
      const h = Ey(o[c])
        ? { type: 'Identifier', name: o[c] }
        : { type: 'Literal', value: o[c] };
      u = u
        ? {
            type: 'MemberExpression',
            object: u,
            property: h,
            computed: !!(c && h.type === 'Literal'),
            optional: !1,
          }
        : h;
    }
    r = u;
  } else
    r =
      Ey(i) && !/^[a-z]/.test(i)
        ? { type: 'Identifier', name: i }
        : { type: 'Literal', value: i };
  if (r.type === 'Literal') {
    const o = r.value;
    return Dh.call(e.components, o) ? e.components[o] : o;
  }
  if (e.evaluater) return e.evaluater.evaluateExpression(r);
  br(e);
}
function br(e, i) {
  const l = new we('Cannot handle MDX estrees without `createEvaluater`', {
    ancestors: e.ancestors,
    place: i,
    ruleId: 'mdx-estree',
    source: 'hast-util-to-jsx-runtime',
  });
  throw (
    ((l.file = e.filePath || void 0),
    (l.url = H1 + '#cannot-handle-mdx-estrees-without-createevaluater'),
    l)
  );
}
function _2(e) {
  const i = {};
  let l;
  for (l in e) Dh.call(e, l) && (i[N2(l)] = e[l]);
  return i;
}
function N2(e) {
  let i = e.replace(y2, L2);
  return i.slice(0, 3) === 'ms-' && (i = '-' + i), i;
}
function L2(e) {
  return '-' + e.toLowerCase();
}
const cf = {
    action: ['form'],
    cite: ['blockquote', 'del', 'ins', 'q'],
    data: ['object'],
    formAction: ['button', 'input'],
    href: ['a', 'area', 'base', 'link'],
    icon: ['menuitem'],
    itemId: null,
    manifest: ['html'],
    ping: ['a', 'area'],
    poster: ['video'],
    src: [
      'audio',
      'embed',
      'iframe',
      'img',
      'input',
      'script',
      'source',
      'track',
      'video',
    ],
  },
  j2 = {};
function Rh(e, i) {
  const l = j2,
    r = typeof l.includeImageAlt == 'boolean' ? l.includeImageAlt : !0,
    o = typeof l.includeHtml == 'boolean' ? l.includeHtml : !0;
  return Y1(e, r, o);
}
function Y1(e, i, l) {
  if (B2(e)) {
    if ('value' in e) return e.type === 'html' && !l ? '' : e.value;
    if (i && 'alt' in e && e.alt) return e.alt;
    if ('children' in e) return Ly(e.children, i, l);
  }
  return Array.isArray(e) ? Ly(e, i, l) : '';
}
function Ly(e, i, l) {
  const r = [];
  let o = -1;
  for (; ++o < e.length; ) r[o] = Y1(e[o], i, l);
  return r.join('');
}
function B2(e) {
  return !!(e && typeof e == 'object');
}
const jy = document.createElement('i');
function _h(e) {
  const i = '&' + e + ';';
  jy.innerHTML = i;
  const l = jy.textContent;
  return (l.charCodeAt(l.length - 1) === 59 && e !== 'semi') || l === i
    ? !1
    : l;
}
function Ze(e, i, l, r) {
  const o = e.length;
  let c = 0,
    u;
  if (
    (i < 0 ? (i = -i > o ? 0 : o + i) : (i = i > o ? o : i),
    (l = l > 0 ? l : 0),
    r.length < 1e4)
  )
    (u = Array.from(r)), u.unshift(i, l), e.splice(...u);
  else
    for (l && e.splice(i, l); c < r.length; )
      (u = r.slice(c, c + 1e4)),
        u.unshift(i, 0),
        e.splice(...u),
        (c += 1e4),
        (i += 1e4);
}
function cn(e, i) {
  return e.length > 0 ? (Ze(e, e.length, 0, i), e) : i;
}
const By = {}.hasOwnProperty;
function F1(e) {
  const i = {};
  let l = -1;
  for (; ++l < e.length; ) V2(i, e[l]);
  return i;
}
function V2(e, i) {
  let l;
  for (l in i) {
    const o = (By.call(e, l) ? e[l] : void 0) || (e[l] = {}),
      c = i[l];
    let u;
    if (c)
      for (u in c) {
        By.call(o, u) || (o[u] = []);
        const h = c[u];
        U2(o[u], Array.isArray(h) ? h : h ? [h] : []);
      }
  }
}
function U2(e, i) {
  let l = -1;
  const r = [];
  for (; ++l < i.length; ) (i[l].add === 'after' ? e : r).push(i[l]);
  Ze(e, 0, 0, r);
}
function I1(e, i) {
  const l = Number.parseInt(e, i);
  return l < 9 ||
    l === 11 ||
    (l > 13 && l < 32) ||
    (l > 126 && l < 160) ||
    (l > 55295 && l < 57344) ||
    (l > 64975 && l < 65008) ||
    (l & 65535) === 65535 ||
    (l & 65535) === 65534 ||
    l > 1114111
    ? '�'
    : String.fromCodePoint(l);
}
function xn(e) {
  return e
    .replace(/[\t\n\r ]+/g, ' ')
    .replace(/^ | $/g, '')
    .toLowerCase()
    .toUpperCase();
}
const Me = zi(/[A-Za-z]/),
  Ae = zi(/[\dA-Za-z]/),
  H2 = zi(/[#-'*+\--9=?A-Z^-~]/);
function yo(e) {
  return e !== null && (e < 32 || e === 127);
}
const Ff = zi(/\d/),
  q2 = zi(/[\dA-Fa-f]/),
  P2 = zi(/[!-/:-@[-`{-~]/);
function dt(e) {
  return e !== null && e < -2;
}
function Ft(e) {
  return e !== null && (e < 0 || e === 32);
}
function kt(e) {
  return e === -2 || e === -1 || e === 32;
}
const zo = zi(new RegExp('\\p{P}|\\p{S}', 'u')),
  il = zi(/\s/);
function zi(e) {
  return i;
  function i(l) {
    return l !== null && l > -1 && e.test(String.fromCharCode(l));
  }
}
function ra(e) {
  const i = [];
  let l = -1,
    r = 0,
    o = 0;
  for (; ++l < e.length; ) {
    const c = e.charCodeAt(l);
    let u = '';
    if (c === 37 && Ae(e.charCodeAt(l + 1)) && Ae(e.charCodeAt(l + 2))) o = 2;
    else if (c < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(c)) ||
        (u = String.fromCharCode(c));
    else if (c > 55295 && c < 57344) {
      const h = e.charCodeAt(l + 1);
      c < 56320 && h > 56319 && h < 57344
        ? ((u = String.fromCharCode(c, h)), (o = 1))
        : (u = '�');
    } else u = String.fromCharCode(c);
    u &&
      (i.push(e.slice(r, l), encodeURIComponent(u)), (r = l + o + 1), (u = '')),
      o && ((l += o), (o = 0));
  }
  return i.join('') + e.slice(r);
}
function Ot(e, i, l, r) {
  const o = r ? r - 1 : Number.POSITIVE_INFINITY;
  let c = 0;
  return u;
  function u(m) {
    return kt(m) ? (e.enter(l), h(m)) : i(m);
  }
  function h(m) {
    return kt(m) && c++ < o ? (e.consume(m), h) : (e.exit(l), i(m));
  }
}
const G2 = { tokenize: Y2 };
function Y2(e) {
  const i = e.attempt(this.parser.constructs.contentInitial, r, o);
  let l;
  return i;
  function r(h) {
    if (h === null) {
      e.consume(h);
      return;
    }
    return (
      e.enter('lineEnding'),
      e.consume(h),
      e.exit('lineEnding'),
      Ot(e, i, 'linePrefix')
    );
  }
  function o(h) {
    return e.enter('paragraph'), c(h);
  }
  function c(h) {
    const m = e.enter('chunkText', { contentType: 'text', previous: l });
    return l && (l.next = m), (l = m), u(h);
  }
  function u(h) {
    if (h === null) {
      e.exit('chunkText'), e.exit('paragraph'), e.consume(h);
      return;
    }
    return dt(h) ? (e.consume(h), e.exit('chunkText'), c) : (e.consume(h), u);
  }
}
const F2 = { tokenize: I2 },
  Vy = { tokenize: X2 };
function I2(e) {
  const i = this,
    l = [];
  let r = 0,
    o,
    c,
    u;
  return h;
  function h(R) {
    if (r < l.length) {
      const Y = l[r];
      return (i.containerState = Y[1]), e.attempt(Y[0].continuation, m, p)(R);
    }
    return p(R);
  }
  function m(R) {
    if ((r++, i.containerState._closeFlow)) {
      (i.containerState._closeFlow = void 0), o && L();
      const Y = i.events.length;
      let Q = Y,
        V;
      for (; Q--; )
        if (i.events[Q][0] === 'exit' && i.events[Q][1].type === 'chunkFlow') {
          V = i.events[Q][1].end;
          break;
        }
      E(r);
      let K = Y;
      for (; K < i.events.length; ) (i.events[K][1].end = { ...V }), K++;
      return (
        Ze(i.events, Q + 1, 0, i.events.slice(Y)), (i.events.length = K), p(R)
      );
    }
    return h(R);
  }
  function p(R) {
    if (r === l.length) {
      if (!o) return x(R);
      if (o.currentConstruct && o.currentConstruct.concrete) return T(R);
      i.interrupt = !!(o.currentConstruct && !o._gfmTableDynamicInterruptHack);
    }
    return (i.containerState = {}), e.check(Vy, g, y)(R);
  }
  function g(R) {
    return o && L(), E(r), x(R);
  }
  function y(R) {
    return (
      (i.parser.lazy[i.now().line] = r !== l.length), (u = i.now().offset), T(R)
    );
  }
  function x(R) {
    return (i.containerState = {}), e.attempt(Vy, b, T)(R);
  }
  function b(R) {
    return r++, l.push([i.currentConstruct, i.containerState]), x(R);
  }
  function T(R) {
    if (R === null) {
      o && L(), E(0), e.consume(R);
      return;
    }
    return (
      (o = o || i.parser.flow(i.now())),
      e.enter('chunkFlow', { _tokenizer: o, contentType: 'flow', previous: c }),
      M(R)
    );
  }
  function M(R) {
    if (R === null) {
      D(e.exit('chunkFlow'), !0), E(0), e.consume(R);
      return;
    }
    return dt(R)
      ? (e.consume(R),
        D(e.exit('chunkFlow')),
        (r = 0),
        (i.interrupt = void 0),
        h)
      : (e.consume(R), M);
  }
  function D(R, Y) {
    const Q = i.sliceStream(R);
    if (
      (Y && Q.push(null),
      (R.previous = c),
      c && (c.next = R),
      (c = R),
      o.defineSkip(R.start),
      o.write(Q),
      i.parser.lazy[R.start.line])
    ) {
      let V = o.events.length;
      for (; V--; )
        if (
          o.events[V][1].start.offset < u &&
          (!o.events[V][1].end || o.events[V][1].end.offset > u)
        )
          return;
      const K = i.events.length;
      let $ = K,
        it,
        O;
      for (; $--; )
        if (i.events[$][0] === 'exit' && i.events[$][1].type === 'chunkFlow') {
          if (it) {
            O = i.events[$][1].end;
            break;
          }
          it = !0;
        }
      for (E(r), V = K; V < i.events.length; )
        (i.events[V][1].end = { ...O }), V++;
      Ze(i.events, $ + 1, 0, i.events.slice(K)), (i.events.length = V);
    }
  }
  function E(R) {
    let Y = l.length;
    for (; Y-- > R; ) {
      const Q = l[Y];
      (i.containerState = Q[1]), Q[0].exit.call(i, e);
    }
    l.length = R;
  }
  function L() {
    o.write([null]),
      (c = void 0),
      (o = void 0),
      (i.containerState._closeFlow = void 0);
  }
}
function X2(e, i, l) {
  return Ot(
    e,
    e.attempt(this.parser.constructs.document, i, l),
    'linePrefix',
    this.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4,
  );
}
function na(e) {
  if (e === null || Ft(e) || il(e)) return 1;
  if (zo(e)) return 2;
}
function Oo(e, i, l) {
  const r = [];
  let o = -1;
  for (; ++o < e.length; ) {
    const c = e[o].resolveAll;
    c && !r.includes(c) && ((i = c(i, l)), r.push(c));
  }
  return i;
}
const If = { name: 'attention', resolveAll: Q2, tokenize: K2 };
function Q2(e, i) {
  let l = -1,
    r,
    o,
    c,
    u,
    h,
    m,
    p,
    g;
  for (; ++l < e.length; )
    if (
      e[l][0] === 'enter' &&
      e[l][1].type === 'attentionSequence' &&
      e[l][1]._close
    ) {
      for (r = l; r--; )
        if (
          e[r][0] === 'exit' &&
          e[r][1].type === 'attentionSequence' &&
          e[r][1]._open &&
          i.sliceSerialize(e[r][1]).charCodeAt(0) ===
            i.sliceSerialize(e[l][1]).charCodeAt(0)
        ) {
          if (
            (e[r][1]._close || e[l][1]._open) &&
            (e[l][1].end.offset - e[l][1].start.offset) % 3 &&
            !(
              (e[r][1].end.offset -
                e[r][1].start.offset +
                e[l][1].end.offset -
                e[l][1].start.offset) %
              3
            )
          )
            continue;
          m =
            e[r][1].end.offset - e[r][1].start.offset > 1 &&
            e[l][1].end.offset - e[l][1].start.offset > 1
              ? 2
              : 1;
          const y = { ...e[r][1].end },
            x = { ...e[l][1].start };
          Uy(y, -m),
            Uy(x, m),
            (u = {
              type: m > 1 ? 'strongSequence' : 'emphasisSequence',
              start: y,
              end: { ...e[r][1].end },
            }),
            (h = {
              type: m > 1 ? 'strongSequence' : 'emphasisSequence',
              start: { ...e[l][1].start },
              end: x,
            }),
            (c = {
              type: m > 1 ? 'strongText' : 'emphasisText',
              start: { ...e[r][1].end },
              end: { ...e[l][1].start },
            }),
            (o = {
              type: m > 1 ? 'strong' : 'emphasis',
              start: { ...u.start },
              end: { ...h.end },
            }),
            (e[r][1].end = { ...u.start }),
            (e[l][1].start = { ...h.end }),
            (p = []),
            e[r][1].end.offset - e[r][1].start.offset &&
              (p = cn(p, [
                ['enter', e[r][1], i],
                ['exit', e[r][1], i],
              ])),
            (p = cn(p, [
              ['enter', o, i],
              ['enter', u, i],
              ['exit', u, i],
              ['enter', c, i],
            ])),
            (p = cn(
              p,
              Oo(i.parser.constructs.insideSpan.null, e.slice(r + 1, l), i),
            )),
            (p = cn(p, [
              ['exit', c, i],
              ['enter', h, i],
              ['exit', h, i],
              ['exit', o, i],
            ])),
            e[l][1].end.offset - e[l][1].start.offset
              ? ((g = 2),
                (p = cn(p, [
                  ['enter', e[l][1], i],
                  ['exit', e[l][1], i],
                ])))
              : (g = 0),
            Ze(e, r - 1, l - r + 3, p),
            (l = r + p.length - g - 2);
          break;
        }
    }
  for (l = -1; ++l < e.length; )
    e[l][1].type === 'attentionSequence' && (e[l][1].type = 'data');
  return e;
}
function K2(e, i) {
  const l = this.parser.constructs.attentionMarkers.null,
    r = this.previous,
    o = na(r);
  let c;
  return u;
  function u(m) {
    return (c = m), e.enter('attentionSequence'), h(m);
  }
  function h(m) {
    if (m === c) return e.consume(m), h;
    const p = e.exit('attentionSequence'),
      g = na(m),
      y = !g || (g === 2 && o) || l.includes(m),
      x = !o || (o === 2 && g) || l.includes(r);
    return (
      (p._open = !!(c === 42 ? y : y && (o || !x))),
      (p._close = !!(c === 42 ? x : x && (g || !y))),
      i(m)
    );
  }
}
function Uy(e, i) {
  (e.column += i), (e.offset += i), (e._bufferIndex += i);
}
const Z2 = { name: 'autolink', tokenize: J2 };
function J2(e, i, l) {
  let r = 0;
  return o;
  function o(b) {
    return (
      e.enter('autolink'),
      e.enter('autolinkMarker'),
      e.consume(b),
      e.exit('autolinkMarker'),
      e.enter('autolinkProtocol'),
      c
    );
  }
  function c(b) {
    return Me(b) ? (e.consume(b), u) : b === 64 ? l(b) : p(b);
  }
  function u(b) {
    return b === 43 || b === 45 || b === 46 || Ae(b) ? ((r = 1), h(b)) : p(b);
  }
  function h(b) {
    return b === 58
      ? (e.consume(b), (r = 0), m)
      : (b === 43 || b === 45 || b === 46 || Ae(b)) && r++ < 32
        ? (e.consume(b), h)
        : ((r = 0), p(b));
  }
  function m(b) {
    return b === 62
      ? (e.exit('autolinkProtocol'),
        e.enter('autolinkMarker'),
        e.consume(b),
        e.exit('autolinkMarker'),
        e.exit('autolink'),
        i)
      : b === null || b === 32 || b === 60 || yo(b)
        ? l(b)
        : (e.consume(b), m);
  }
  function p(b) {
    return b === 64 ? (e.consume(b), g) : H2(b) ? (e.consume(b), p) : l(b);
  }
  function g(b) {
    return Ae(b) ? y(b) : l(b);
  }
  function y(b) {
    return b === 46
      ? (e.consume(b), (r = 0), g)
      : b === 62
        ? ((e.exit('autolinkProtocol').type = 'autolinkEmail'),
          e.enter('autolinkMarker'),
          e.consume(b),
          e.exit('autolinkMarker'),
          e.exit('autolink'),
          i)
        : x(b);
  }
  function x(b) {
    if ((b === 45 || Ae(b)) && r++ < 63) {
      const T = b === 45 ? x : y;
      return e.consume(b), T;
    }
    return l(b);
  }
}
const Cr = { partial: !0, tokenize: $2 };
function $2(e, i, l) {
  return r;
  function r(c) {
    return kt(c) ? Ot(e, o, 'linePrefix')(c) : o(c);
  }
  function o(c) {
    return c === null || dt(c) ? i(c) : l(c);
  }
}
const X1 = {
  continuation: { tokenize: tA },
  exit: eA,
  name: 'blockQuote',
  tokenize: W2,
};
function W2(e, i, l) {
  const r = this;
  return o;
  function o(u) {
    if (u === 62) {
      const h = r.containerState;
      return (
        h.open || (e.enter('blockQuote', { _container: !0 }), (h.open = !0)),
        e.enter('blockQuotePrefix'),
        e.enter('blockQuoteMarker'),
        e.consume(u),
        e.exit('blockQuoteMarker'),
        c
      );
    }
    return l(u);
  }
  function c(u) {
    return kt(u)
      ? (e.enter('blockQuotePrefixWhitespace'),
        e.consume(u),
        e.exit('blockQuotePrefixWhitespace'),
        e.exit('blockQuotePrefix'),
        i)
      : (e.exit('blockQuotePrefix'), i(u));
  }
}
function tA(e, i, l) {
  const r = this;
  return o;
  function o(u) {
    return kt(u)
      ? Ot(
          e,
          c,
          'linePrefix',
          r.parser.constructs.disable.null.includes('codeIndented')
            ? void 0
            : 4,
        )(u)
      : c(u);
  }
  function c(u) {
    return e.attempt(X1, i, l)(u);
  }
}
function eA(e) {
  e.exit('blockQuote');
}
const Q1 = { name: 'characterEscape', tokenize: nA };
function nA(e, i, l) {
  return r;
  function r(c) {
    return (
      e.enter('characterEscape'),
      e.enter('escapeMarker'),
      e.consume(c),
      e.exit('escapeMarker'),
      o
    );
  }
  function o(c) {
    return P2(c)
      ? (e.enter('characterEscapeValue'),
        e.consume(c),
        e.exit('characterEscapeValue'),
        e.exit('characterEscape'),
        i)
      : l(c);
  }
}
const K1 = { name: 'characterReference', tokenize: iA };
function iA(e, i, l) {
  const r = this;
  let o = 0,
    c,
    u;
  return h;
  function h(y) {
    return (
      e.enter('characterReference'),
      e.enter('characterReferenceMarker'),
      e.consume(y),
      e.exit('characterReferenceMarker'),
      m
    );
  }
  function m(y) {
    return y === 35
      ? (e.enter('characterReferenceMarkerNumeric'),
        e.consume(y),
        e.exit('characterReferenceMarkerNumeric'),
        p)
      : (e.enter('characterReferenceValue'), (c = 31), (u = Ae), g(y));
  }
  function p(y) {
    return y === 88 || y === 120
      ? (e.enter('characterReferenceMarkerHexadecimal'),
        e.consume(y),
        e.exit('characterReferenceMarkerHexadecimal'),
        e.enter('characterReferenceValue'),
        (c = 6),
        (u = q2),
        g)
      : (e.enter('characterReferenceValue'), (c = 7), (u = Ff), g(y));
  }
  function g(y) {
    if (y === 59 && o) {
      const x = e.exit('characterReferenceValue');
      return u === Ae && !_h(r.sliceSerialize(x))
        ? l(y)
        : (e.enter('characterReferenceMarker'),
          e.consume(y),
          e.exit('characterReferenceMarker'),
          e.exit('characterReference'),
          i);
    }
    return u(y) && o++ < c ? (e.consume(y), g) : l(y);
  }
}
const Hy = { partial: !0, tokenize: aA },
  qy = { concrete: !0, name: 'codeFenced', tokenize: lA };
function lA(e, i, l) {
  const r = this,
    o = { partial: !0, tokenize: Q };
  let c = 0,
    u = 0,
    h;
  return m;
  function m(V) {
    return p(V);
  }
  function p(V) {
    const K = r.events[r.events.length - 1];
    return (
      (c =
        K && K[1].type === 'linePrefix'
          ? K[2].sliceSerialize(K[1], !0).length
          : 0),
      (h = V),
      e.enter('codeFenced'),
      e.enter('codeFencedFence'),
      e.enter('codeFencedFenceSequence'),
      g(V)
    );
  }
  function g(V) {
    return V === h
      ? (u++, e.consume(V), g)
      : u < 3
        ? l(V)
        : (e.exit('codeFencedFenceSequence'),
          kt(V) ? Ot(e, y, 'whitespace')(V) : y(V));
  }
  function y(V) {
    return V === null || dt(V)
      ? (e.exit('codeFencedFence'), r.interrupt ? i(V) : e.check(Hy, M, Y)(V))
      : (e.enter('codeFencedFenceInfo'),
        e.enter('chunkString', { contentType: 'string' }),
        x(V));
  }
  function x(V) {
    return V === null || dt(V)
      ? (e.exit('chunkString'), e.exit('codeFencedFenceInfo'), y(V))
      : kt(V)
        ? (e.exit('chunkString'),
          e.exit('codeFencedFenceInfo'),
          Ot(e, b, 'whitespace')(V))
        : V === 96 && V === h
          ? l(V)
          : (e.consume(V), x);
  }
  function b(V) {
    return V === null || dt(V)
      ? y(V)
      : (e.enter('codeFencedFenceMeta'),
        e.enter('chunkString', { contentType: 'string' }),
        T(V));
  }
  function T(V) {
    return V === null || dt(V)
      ? (e.exit('chunkString'), e.exit('codeFencedFenceMeta'), y(V))
      : V === 96 && V === h
        ? l(V)
        : (e.consume(V), T);
  }
  function M(V) {
    return e.attempt(o, Y, D)(V);
  }
  function D(V) {
    return e.enter('lineEnding'), e.consume(V), e.exit('lineEnding'), E;
  }
  function E(V) {
    return c > 0 && kt(V) ? Ot(e, L, 'linePrefix', c + 1)(V) : L(V);
  }
  function L(V) {
    return V === null || dt(V)
      ? e.check(Hy, M, Y)(V)
      : (e.enter('codeFlowValue'), R(V));
  }
  function R(V) {
    return V === null || dt(V)
      ? (e.exit('codeFlowValue'), L(V))
      : (e.consume(V), R);
  }
  function Y(V) {
    return e.exit('codeFenced'), i(V);
  }
  function Q(V, K, $) {
    let it = 0;
    return O;
    function O(W) {
      return V.enter('lineEnding'), V.consume(W), V.exit('lineEnding'), J;
    }
    function J(W) {
      return (
        V.enter('codeFencedFence'),
        kt(W)
          ? Ot(
              V,
              et,
              'linePrefix',
              r.parser.constructs.disable.null.includes('codeIndented')
                ? void 0
                : 4,
            )(W)
          : et(W)
      );
    }
    function et(W) {
      return W === h ? (V.enter('codeFencedFenceSequence'), vt(W)) : $(W);
    }
    function vt(W) {
      return W === h
        ? (it++, V.consume(W), vt)
        : it >= u
          ? (V.exit('codeFencedFenceSequence'),
            kt(W) ? Ot(V, st, 'whitespace')(W) : st(W))
          : $(W);
    }
    function st(W) {
      return W === null || dt(W) ? (V.exit('codeFencedFence'), K(W)) : $(W);
    }
  }
}
function aA(e, i, l) {
  const r = this;
  return o;
  function o(u) {
    return u === null
      ? l(u)
      : (e.enter('lineEnding'), e.consume(u), e.exit('lineEnding'), c);
  }
  function c(u) {
    return r.parser.lazy[r.now().line] ? l(u) : i(u);
  }
}
const ff = { name: 'codeIndented', tokenize: sA },
  rA = { partial: !0, tokenize: oA };
function sA(e, i, l) {
  const r = this;
  return o;
  function o(p) {
    return e.enter('codeIndented'), Ot(e, c, 'linePrefix', 5)(p);
  }
  function c(p) {
    const g = r.events[r.events.length - 1];
    return g &&
      g[1].type === 'linePrefix' &&
      g[2].sliceSerialize(g[1], !0).length >= 4
      ? u(p)
      : l(p);
  }
  function u(p) {
    return p === null
      ? m(p)
      : dt(p)
        ? e.attempt(rA, u, m)(p)
        : (e.enter('codeFlowValue'), h(p));
  }
  function h(p) {
    return p === null || dt(p)
      ? (e.exit('codeFlowValue'), u(p))
      : (e.consume(p), h);
  }
  function m(p) {
    return e.exit('codeIndented'), i(p);
  }
}
function oA(e, i, l) {
  const r = this;
  return o;
  function o(u) {
    return r.parser.lazy[r.now().line]
      ? l(u)
      : dt(u)
        ? (e.enter('lineEnding'), e.consume(u), e.exit('lineEnding'), o)
        : Ot(e, c, 'linePrefix', 5)(u);
  }
  function c(u) {
    const h = r.events[r.events.length - 1];
    return h &&
      h[1].type === 'linePrefix' &&
      h[2].sliceSerialize(h[1], !0).length >= 4
      ? i(u)
      : dt(u)
        ? o(u)
        : l(u);
  }
}
const uA = { name: 'codeText', previous: fA, resolve: cA, tokenize: hA };
function cA(e) {
  let i = e.length - 4,
    l = 3,
    r,
    o;
  if (
    (e[l][1].type === 'lineEnding' || e[l][1].type === 'space') &&
    (e[i][1].type === 'lineEnding' || e[i][1].type === 'space')
  ) {
    for (r = l; ++r < i; )
      if (e[r][1].type === 'codeTextData') {
        (e[l][1].type = 'codeTextPadding'),
          (e[i][1].type = 'codeTextPadding'),
          (l += 2),
          (i -= 2);
        break;
      }
  }
  for (r = l - 1, i++; ++r <= i; )
    o === void 0
      ? r !== i && e[r][1].type !== 'lineEnding' && (o = r)
      : (r === i || e[r][1].type === 'lineEnding') &&
        ((e[o][1].type = 'codeTextData'),
        r !== o + 2 &&
          ((e[o][1].end = e[r - 1][1].end),
          e.splice(o + 2, r - o - 2),
          (i -= r - o - 2),
          (r = o + 2)),
        (o = void 0));
  return e;
}
function fA(e) {
  return (
    e !== 96 ||
    this.events[this.events.length - 1][1].type === 'characterEscape'
  );
}
function hA(e, i, l) {
  let r = 0,
    o,
    c;
  return u;
  function u(y) {
    return e.enter('codeText'), e.enter('codeTextSequence'), h(y);
  }
  function h(y) {
    return y === 96
      ? (e.consume(y), r++, h)
      : (e.exit('codeTextSequence'), m(y));
  }
  function m(y) {
    return y === null
      ? l(y)
      : y === 32
        ? (e.enter('space'), e.consume(y), e.exit('space'), m)
        : y === 96
          ? ((c = e.enter('codeTextSequence')), (o = 0), g(y))
          : dt(y)
            ? (e.enter('lineEnding'), e.consume(y), e.exit('lineEnding'), m)
            : (e.enter('codeTextData'), p(y));
  }
  function p(y) {
    return y === null || y === 32 || y === 96 || dt(y)
      ? (e.exit('codeTextData'), m(y))
      : (e.consume(y), p);
  }
  function g(y) {
    return y === 96
      ? (e.consume(y), o++, g)
      : o === r
        ? (e.exit('codeTextSequence'), e.exit('codeText'), i(y))
        : ((c.type = 'codeTextData'), p(y));
  }
}
class dA {
  constructor(i) {
    (this.left = i ? [...i] : []), (this.right = []);
  }
  get(i) {
    if (i < 0 || i >= this.left.length + this.right.length)
      throw new RangeError(
        'Cannot access index `' +
          i +
          '` in a splice buffer of size `' +
          (this.left.length + this.right.length) +
          '`',
      );
    return i < this.left.length
      ? this.left[i]
      : this.right[this.right.length - i + this.left.length - 1];
  }
  get length() {
    return this.left.length + this.right.length;
  }
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  slice(i, l) {
    const r = l ?? Number.POSITIVE_INFINITY;
    return r < this.left.length
      ? this.left.slice(i, r)
      : i > this.left.length
        ? this.right
            .slice(
              this.right.length - r + this.left.length,
              this.right.length - i + this.left.length,
            )
            .reverse()
        : this.left
            .slice(i)
            .concat(
              this.right
                .slice(this.right.length - r + this.left.length)
                .reverse(),
            );
  }
  splice(i, l, r) {
    const o = l || 0;
    this.setCursor(Math.trunc(i));
    const c = this.right.splice(
      this.right.length - o,
      Number.POSITIVE_INFINITY,
    );
    return r && sr(this.left, r), c.reverse();
  }
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  push(i) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(i);
  }
  pushMany(i) {
    this.setCursor(Number.POSITIVE_INFINITY), sr(this.left, i);
  }
  unshift(i) {
    this.setCursor(0), this.right.push(i);
  }
  unshiftMany(i) {
    this.setCursor(0), sr(this.right, i.reverse());
  }
  setCursor(i) {
    if (
      !(
        i === this.left.length ||
        (i > this.left.length && this.right.length === 0) ||
        (i < 0 && this.left.length === 0)
      )
    )
      if (i < this.left.length) {
        const l = this.left.splice(i, Number.POSITIVE_INFINITY);
        sr(this.right, l.reverse());
      } else {
        const l = this.right.splice(
          this.left.length + this.right.length - i,
          Number.POSITIVE_INFINITY,
        );
        sr(this.left, l.reverse());
      }
  }
}
function sr(e, i) {
  let l = 0;
  if (i.length < 1e4) e.push(...i);
  else for (; l < i.length; ) e.push(...i.slice(l, l + 1e4)), (l += 1e4);
}
function Z1(e) {
  const i = {};
  let l = -1,
    r,
    o,
    c,
    u,
    h,
    m,
    p;
  const g = new dA(e);
  for (; ++l < g.length; ) {
    for (; l in i; ) l = i[l];
    if (
      ((r = g.get(l)),
      l &&
        r[1].type === 'chunkFlow' &&
        g.get(l - 1)[1].type === 'listItemPrefix' &&
        ((m = r[1]._tokenizer.events),
        (c = 0),
        c < m.length && m[c][1].type === 'lineEndingBlank' && (c += 2),
        c < m.length && m[c][1].type === 'content'))
    )
      for (; ++c < m.length && m[c][1].type !== 'content'; )
        m[c][1].type === 'chunkText' &&
          ((m[c][1]._isInFirstContentOfListItem = !0), c++);
    if (r[0] === 'enter')
      r[1].contentType && (Object.assign(i, pA(g, l)), (l = i[l]), (p = !0));
    else if (r[1]._container) {
      for (c = l, o = void 0; c--; )
        if (
          ((u = g.get(c)),
          u[1].type === 'lineEnding' || u[1].type === 'lineEndingBlank')
        )
          u[0] === 'enter' &&
            (o && (g.get(o)[1].type = 'lineEndingBlank'),
            (u[1].type = 'lineEnding'),
            (o = c));
        else if (
          !(u[1].type === 'linePrefix' || u[1].type === 'listItemIndent')
        )
          break;
      o &&
        ((r[1].end = { ...g.get(o)[1].start }),
        (h = g.slice(o, l)),
        h.unshift(r),
        g.splice(o, l - o + 1, h));
    }
  }
  return Ze(e, 0, Number.POSITIVE_INFINITY, g.slice(0)), !p;
}
function pA(e, i) {
  const l = e.get(i)[1],
    r = e.get(i)[2];
  let o = i - 1;
  const c = [];
  let u = l._tokenizer;
  u ||
    ((u = r.parser[l.contentType](l.start)),
    l._contentTypeTextTrailing && (u._contentTypeTextTrailing = !0));
  const h = u.events,
    m = [],
    p = {};
  let g,
    y,
    x = -1,
    b = l,
    T = 0,
    M = 0;
  const D = [M];
  for (; b; ) {
    for (; e.get(++o)[1] !== b; );
    c.push(o),
      b._tokenizer ||
        ((g = r.sliceStream(b)),
        b.next || g.push(null),
        y && u.defineSkip(b.start),
        b._isInFirstContentOfListItem &&
          (u._gfmTasklistFirstContentOfListItem = !0),
        u.write(g),
        b._isInFirstContentOfListItem &&
          (u._gfmTasklistFirstContentOfListItem = void 0)),
      (y = b),
      (b = b.next);
  }
  for (b = l; ++x < h.length; )
    h[x][0] === 'exit' &&
      h[x - 1][0] === 'enter' &&
      h[x][1].type === h[x - 1][1].type &&
      h[x][1].start.line !== h[x][1].end.line &&
      ((M = x + 1),
      D.push(M),
      (b._tokenizer = void 0),
      (b.previous = void 0),
      (b = b.next));
  for (
    u.events = [],
      b ? ((b._tokenizer = void 0), (b.previous = void 0)) : D.pop(),
      x = D.length;
    x--;

  ) {
    const E = h.slice(D[x], D[x + 1]),
      L = c.pop();
    m.push([L, L + E.length - 1]), e.splice(L, 2, E);
  }
  for (m.reverse(), x = -1; ++x < m.length; )
    (p[T + m[x][0]] = T + m[x][1]), (T += m[x][1] - m[x][0] - 1);
  return p;
}
const mA = { resolve: yA, tokenize: vA },
  gA = { partial: !0, tokenize: xA };
function yA(e) {
  return Z1(e), e;
}
function vA(e, i) {
  let l;
  return r;
  function r(h) {
    return (
      e.enter('content'),
      (l = e.enter('chunkContent', { contentType: 'content' })),
      o(h)
    );
  }
  function o(h) {
    return h === null ? c(h) : dt(h) ? e.check(gA, u, c)(h) : (e.consume(h), o);
  }
  function c(h) {
    return e.exit('chunkContent'), e.exit('content'), i(h);
  }
  function u(h) {
    return (
      e.consume(h),
      e.exit('chunkContent'),
      (l.next = e.enter('chunkContent', {
        contentType: 'content',
        previous: l,
      })),
      (l = l.next),
      o
    );
  }
}
function xA(e, i, l) {
  const r = this;
  return o;
  function o(u) {
    return (
      e.exit('chunkContent'),
      e.enter('lineEnding'),
      e.consume(u),
      e.exit('lineEnding'),
      Ot(e, c, 'linePrefix')
    );
  }
  function c(u) {
    if (u === null || dt(u)) return l(u);
    const h = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes('codeIndented') &&
      h &&
      h[1].type === 'linePrefix' &&
      h[2].sliceSerialize(h[1], !0).length >= 4
      ? i(u)
      : e.interrupt(r.parser.constructs.flow, l, i)(u);
  }
}
function J1(e, i, l, r, o, c, u, h, m) {
  const p = m || Number.POSITIVE_INFINITY;
  let g = 0;
  return y;
  function y(E) {
    return E === 60
      ? (e.enter(r), e.enter(o), e.enter(c), e.consume(E), e.exit(c), x)
      : E === null || E === 32 || E === 41 || yo(E)
        ? l(E)
        : (e.enter(r),
          e.enter(u),
          e.enter(h),
          e.enter('chunkString', { contentType: 'string' }),
          M(E));
  }
  function x(E) {
    return E === 62
      ? (e.enter(c), e.consume(E), e.exit(c), e.exit(o), e.exit(r), i)
      : (e.enter(h), e.enter('chunkString', { contentType: 'string' }), b(E));
  }
  function b(E) {
    return E === 62
      ? (e.exit('chunkString'), e.exit(h), x(E))
      : E === null || E === 60 || dt(E)
        ? l(E)
        : (e.consume(E), E === 92 ? T : b);
  }
  function T(E) {
    return E === 60 || E === 62 || E === 92 ? (e.consume(E), b) : b(E);
  }
  function M(E) {
    return !g && (E === null || E === 41 || Ft(E))
      ? (e.exit('chunkString'), e.exit(h), e.exit(u), e.exit(r), i(E))
      : g < p && E === 40
        ? (e.consume(E), g++, M)
        : E === 41
          ? (e.consume(E), g--, M)
          : E === null || E === 32 || E === 40 || yo(E)
            ? l(E)
            : (e.consume(E), E === 92 ? D : M);
  }
  function D(E) {
    return E === 40 || E === 41 || E === 92 ? (e.consume(E), M) : M(E);
  }
}
function $1(e, i, l, r, o, c) {
  const u = this;
  let h = 0,
    m;
  return p;
  function p(b) {
    return e.enter(r), e.enter(o), e.consume(b), e.exit(o), e.enter(c), g;
  }
  function g(b) {
    return h > 999 ||
      b === null ||
      b === 91 ||
      (b === 93 && !m) ||
      (b === 94 && !h && '_hiddenFootnoteSupport' in u.parser.constructs)
      ? l(b)
      : b === 93
        ? (e.exit(c), e.enter(o), e.consume(b), e.exit(o), e.exit(r), i)
        : dt(b)
          ? (e.enter('lineEnding'), e.consume(b), e.exit('lineEnding'), g)
          : (e.enter('chunkString', { contentType: 'string' }), y(b));
  }
  function y(b) {
    return b === null || b === 91 || b === 93 || dt(b) || h++ > 999
      ? (e.exit('chunkString'), g(b))
      : (e.consume(b), m || (m = !kt(b)), b === 92 ? x : y);
  }
  function x(b) {
    return b === 91 || b === 92 || b === 93 ? (e.consume(b), h++, y) : y(b);
  }
}
function W1(e, i, l, r, o, c) {
  let u;
  return h;
  function h(x) {
    return x === 34 || x === 39 || x === 40
      ? (e.enter(r),
        e.enter(o),
        e.consume(x),
        e.exit(o),
        (u = x === 40 ? 41 : x),
        m)
      : l(x);
  }
  function m(x) {
    return x === u
      ? (e.enter(o), e.consume(x), e.exit(o), e.exit(r), i)
      : (e.enter(c), p(x));
  }
  function p(x) {
    return x === u
      ? (e.exit(c), m(u))
      : x === null
        ? l(x)
        : dt(x)
          ? (e.enter('lineEnding'),
            e.consume(x),
            e.exit('lineEnding'),
            Ot(e, p, 'linePrefix'))
          : (e.enter('chunkString', { contentType: 'string' }), g(x));
  }
  function g(x) {
    return x === u || x === null || dt(x)
      ? (e.exit('chunkString'), p(x))
      : (e.consume(x), x === 92 ? y : g);
  }
  function y(x) {
    return x === u || x === 92 ? (e.consume(x), g) : g(x);
  }
}
function hr(e, i) {
  let l;
  return r;
  function r(o) {
    return dt(o)
      ? (e.enter('lineEnding'), e.consume(o), e.exit('lineEnding'), (l = !0), r)
      : kt(o)
        ? Ot(e, r, l ? 'linePrefix' : 'lineSuffix')(o)
        : i(o);
  }
}
const bA = { name: 'definition', tokenize: TA },
  SA = { partial: !0, tokenize: AA };
function TA(e, i, l) {
  const r = this;
  let o;
  return c;
  function c(b) {
    return e.enter('definition'), u(b);
  }
  function u(b) {
    return $1.call(
      r,
      e,
      h,
      l,
      'definitionLabel',
      'definitionLabelMarker',
      'definitionLabelString',
    )(b);
  }
  function h(b) {
    return (
      (o = xn(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))),
      b === 58
        ? (e.enter('definitionMarker'),
          e.consume(b),
          e.exit('definitionMarker'),
          m)
        : l(b)
    );
  }
  function m(b) {
    return Ft(b) ? hr(e, p)(b) : p(b);
  }
  function p(b) {
    return J1(
      e,
      g,
      l,
      'definitionDestination',
      'definitionDestinationLiteral',
      'definitionDestinationLiteralMarker',
      'definitionDestinationRaw',
      'definitionDestinationString',
    )(b);
  }
  function g(b) {
    return e.attempt(SA, y, y)(b);
  }
  function y(b) {
    return kt(b) ? Ot(e, x, 'whitespace')(b) : x(b);
  }
  function x(b) {
    return b === null || dt(b)
      ? (e.exit('definition'), r.parser.defined.push(o), i(b))
      : l(b);
  }
}
function AA(e, i, l) {
  return r;
  function r(h) {
    return Ft(h) ? hr(e, o)(h) : l(h);
  }
  function o(h) {
    return W1(
      e,
      c,
      l,
      'definitionTitle',
      'definitionTitleMarker',
      'definitionTitleString',
    )(h);
  }
  function c(h) {
    return kt(h) ? Ot(e, u, 'whitespace')(h) : u(h);
  }
  function u(h) {
    return h === null || dt(h) ? i(h) : l(h);
  }
}
const wA = { name: 'hardBreakEscape', tokenize: EA };
function EA(e, i, l) {
  return r;
  function r(c) {
    return e.enter('hardBreakEscape'), e.consume(c), o;
  }
  function o(c) {
    return dt(c) ? (e.exit('hardBreakEscape'), i(c)) : l(c);
  }
}
const kA = { name: 'headingAtx', resolve: CA, tokenize: MA };
function CA(e, i) {
  let l = e.length - 2,
    r = 3,
    o,
    c;
  return (
    e[r][1].type === 'whitespace' && (r += 2),
    l - 2 > r && e[l][1].type === 'whitespace' && (l -= 2),
    e[l][1].type === 'atxHeadingSequence' &&
      (r === l - 1 || (l - 4 > r && e[l - 2][1].type === 'whitespace')) &&
      (l -= r + 1 === l ? 2 : 4),
    l > r &&
      ((o = { type: 'atxHeadingText', start: e[r][1].start, end: e[l][1].end }),
      (c = {
        type: 'chunkText',
        start: e[r][1].start,
        end: e[l][1].end,
        contentType: 'text',
      }),
      Ze(e, r, l - r + 1, [
        ['enter', o, i],
        ['enter', c, i],
        ['exit', c, i],
        ['exit', o, i],
      ])),
    e
  );
}
function MA(e, i, l) {
  let r = 0;
  return o;
  function o(g) {
    return e.enter('atxHeading'), c(g);
  }
  function c(g) {
    return e.enter('atxHeadingSequence'), u(g);
  }
  function u(g) {
    return g === 35 && r++ < 6
      ? (e.consume(g), u)
      : g === null || Ft(g)
        ? (e.exit('atxHeadingSequence'), h(g))
        : l(g);
  }
  function h(g) {
    return g === 35
      ? (e.enter('atxHeadingSequence'), m(g))
      : g === null || dt(g)
        ? (e.exit('atxHeading'), i(g))
        : kt(g)
          ? Ot(e, h, 'whitespace')(g)
          : (e.enter('atxHeadingText'), p(g));
  }
  function m(g) {
    return g === 35 ? (e.consume(g), m) : (e.exit('atxHeadingSequence'), h(g));
  }
  function p(g) {
    return g === null || g === 35 || Ft(g)
      ? (e.exit('atxHeadingText'), h(g))
      : (e.consume(g), p);
  }
}
const DA = [
    'address',
    'article',
    'aside',
    'base',
    'basefont',
    'blockquote',
    'body',
    'caption',
    'center',
    'col',
    'colgroup',
    'dd',
    'details',
    'dialog',
    'dir',
    'div',
    'dl',
    'dt',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'frame',
    'frameset',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hr',
    'html',
    'iframe',
    'legend',
    'li',
    'link',
    'main',
    'menu',
    'menuitem',
    'nav',
    'noframes',
    'ol',
    'optgroup',
    'option',
    'p',
    'param',
    'search',
    'section',
    'summary',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'title',
    'tr',
    'track',
    'ul',
  ],
  Py = ['pre', 'script', 'style', 'textarea'],
  zA = { concrete: !0, name: 'htmlFlow', resolveTo: _A, tokenize: NA },
  OA = { partial: !0, tokenize: jA },
  RA = { partial: !0, tokenize: LA };
function _A(e) {
  let i = e.length;
  for (; i-- && !(e[i][0] === 'enter' && e[i][1].type === 'htmlFlow'); );
  return (
    i > 1 &&
      e[i - 2][1].type === 'linePrefix' &&
      ((e[i][1].start = e[i - 2][1].start),
      (e[i + 1][1].start = e[i - 2][1].start),
      e.splice(i - 2, 2)),
    e
  );
}
function NA(e, i, l) {
  const r = this;
  let o, c, u, h, m;
  return p;
  function p(A) {
    return g(A);
  }
  function g(A) {
    return e.enter('htmlFlow'), e.enter('htmlFlowData'), e.consume(A), y;
  }
  function y(A) {
    return A === 33
      ? (e.consume(A), x)
      : A === 47
        ? (e.consume(A), (c = !0), M)
        : A === 63
          ? (e.consume(A), (o = 3), r.interrupt ? i : w)
          : Me(A)
            ? (e.consume(A), (u = String.fromCharCode(A)), D)
            : l(A);
  }
  function x(A) {
    return A === 45
      ? (e.consume(A), (o = 2), b)
      : A === 91
        ? (e.consume(A), (o = 5), (h = 0), T)
        : Me(A)
          ? (e.consume(A), (o = 4), r.interrupt ? i : w)
          : l(A);
  }
  function b(A) {
    return A === 45 ? (e.consume(A), r.interrupt ? i : w) : l(A);
  }
  function T(A) {
    const at = 'CDATA[';
    return A === at.charCodeAt(h++)
      ? (e.consume(A), h === at.length ? (r.interrupt ? i : et) : T)
      : l(A);
  }
  function M(A) {
    return Me(A) ? (e.consume(A), (u = String.fromCharCode(A)), D) : l(A);
  }
  function D(A) {
    if (A === null || A === 47 || A === 62 || Ft(A)) {
      const at = A === 47,
        gt = u.toLowerCase();
      return !at && !c && Py.includes(gt)
        ? ((o = 1), r.interrupt ? i(A) : et(A))
        : DA.includes(u.toLowerCase())
          ? ((o = 6), at ? (e.consume(A), E) : r.interrupt ? i(A) : et(A))
          : ((o = 7),
            r.interrupt && !r.parser.lazy[r.now().line]
              ? l(A)
              : c
                ? L(A)
                : R(A));
    }
    return A === 45 || Ae(A)
      ? (e.consume(A), (u += String.fromCharCode(A)), D)
      : l(A);
  }
  function E(A) {
    return A === 62 ? (e.consume(A), r.interrupt ? i : et) : l(A);
  }
  function L(A) {
    return kt(A) ? (e.consume(A), L) : O(A);
  }
  function R(A) {
    return A === 47
      ? (e.consume(A), O)
      : A === 58 || A === 95 || Me(A)
        ? (e.consume(A), Y)
        : kt(A)
          ? (e.consume(A), R)
          : O(A);
  }
  function Y(A) {
    return A === 45 || A === 46 || A === 58 || A === 95 || Ae(A)
      ? (e.consume(A), Y)
      : Q(A);
  }
  function Q(A) {
    return A === 61 ? (e.consume(A), V) : kt(A) ? (e.consume(A), Q) : R(A);
  }
  function V(A) {
    return A === null || A === 60 || A === 61 || A === 62 || A === 96
      ? l(A)
      : A === 34 || A === 39
        ? (e.consume(A), (m = A), K)
        : kt(A)
          ? (e.consume(A), V)
          : $(A);
  }
  function K(A) {
    return A === m
      ? (e.consume(A), (m = null), it)
      : A === null || dt(A)
        ? l(A)
        : (e.consume(A), K);
  }
  function $(A) {
    return A === null ||
      A === 34 ||
      A === 39 ||
      A === 47 ||
      A === 60 ||
      A === 61 ||
      A === 62 ||
      A === 96 ||
      Ft(A)
      ? Q(A)
      : (e.consume(A), $);
  }
  function it(A) {
    return A === 47 || A === 62 || kt(A) ? R(A) : l(A);
  }
  function O(A) {
    return A === 62 ? (e.consume(A), J) : l(A);
  }
  function J(A) {
    return A === null || dt(A) ? et(A) : kt(A) ? (e.consume(A), J) : l(A);
  }
  function et(A) {
    return A === 45 && o === 2
      ? (e.consume(A), N)
      : A === 60 && o === 1
        ? (e.consume(A), Z)
        : A === 62 && o === 4
          ? (e.consume(A), C)
          : A === 63 && o === 3
            ? (e.consume(A), w)
            : A === 93 && o === 5
              ? (e.consume(A), pt)
              : dt(A) && (o === 6 || o === 7)
                ? (e.exit('htmlFlowData'), e.check(OA, G, vt)(A))
                : A === null || dt(A)
                  ? (e.exit('htmlFlowData'), vt(A))
                  : (e.consume(A), et);
  }
  function vt(A) {
    return e.check(RA, st, G)(A);
  }
  function st(A) {
    return e.enter('lineEnding'), e.consume(A), e.exit('lineEnding'), W;
  }
  function W(A) {
    return A === null || dt(A) ? vt(A) : (e.enter('htmlFlowData'), et(A));
  }
  function N(A) {
    return A === 45 ? (e.consume(A), w) : et(A);
  }
  function Z(A) {
    return A === 47 ? (e.consume(A), (u = ''), lt) : et(A);
  }
  function lt(A) {
    if (A === 62) {
      const at = u.toLowerCase();
      return Py.includes(at) ? (e.consume(A), C) : et(A);
    }
    return Me(A) && u.length < 8
      ? (e.consume(A), (u += String.fromCharCode(A)), lt)
      : et(A);
  }
  function pt(A) {
    return A === 93 ? (e.consume(A), w) : et(A);
  }
  function w(A) {
    return A === 62
      ? (e.consume(A), C)
      : A === 45 && o === 2
        ? (e.consume(A), w)
        : et(A);
  }
  function C(A) {
    return A === null || dt(A)
      ? (e.exit('htmlFlowData'), G(A))
      : (e.consume(A), C);
  }
  function G(A) {
    return e.exit('htmlFlow'), i(A);
  }
}
function LA(e, i, l) {
  const r = this;
  return o;
  function o(u) {
    return dt(u)
      ? (e.enter('lineEnding'), e.consume(u), e.exit('lineEnding'), c)
      : l(u);
  }
  function c(u) {
    return r.parser.lazy[r.now().line] ? l(u) : i(u);
  }
}
function jA(e, i, l) {
  return r;
  function r(o) {
    return (
      e.enter('lineEnding'),
      e.consume(o),
      e.exit('lineEnding'),
      e.attempt(Cr, i, l)
    );
  }
}
const BA = { name: 'htmlText', tokenize: VA };
function VA(e, i, l) {
  const r = this;
  let o, c, u;
  return h;
  function h(w) {
    return e.enter('htmlText'), e.enter('htmlTextData'), e.consume(w), m;
  }
  function m(w) {
    return w === 33
      ? (e.consume(w), p)
      : w === 47
        ? (e.consume(w), Q)
        : w === 63
          ? (e.consume(w), R)
          : Me(w)
            ? (e.consume(w), $)
            : l(w);
  }
  function p(w) {
    return w === 45
      ? (e.consume(w), g)
      : w === 91
        ? (e.consume(w), (c = 0), T)
        : Me(w)
          ? (e.consume(w), L)
          : l(w);
  }
  function g(w) {
    return w === 45 ? (e.consume(w), b) : l(w);
  }
  function y(w) {
    return w === null
      ? l(w)
      : w === 45
        ? (e.consume(w), x)
        : dt(w)
          ? ((u = y), Z(w))
          : (e.consume(w), y);
  }
  function x(w) {
    return w === 45 ? (e.consume(w), b) : y(w);
  }
  function b(w) {
    return w === 62 ? N(w) : w === 45 ? x(w) : y(w);
  }
  function T(w) {
    const C = 'CDATA[';
    return w === C.charCodeAt(c++)
      ? (e.consume(w), c === C.length ? M : T)
      : l(w);
  }
  function M(w) {
    return w === null
      ? l(w)
      : w === 93
        ? (e.consume(w), D)
        : dt(w)
          ? ((u = M), Z(w))
          : (e.consume(w), M);
  }
  function D(w) {
    return w === 93 ? (e.consume(w), E) : M(w);
  }
  function E(w) {
    return w === 62 ? N(w) : w === 93 ? (e.consume(w), E) : M(w);
  }
  function L(w) {
    return w === null || w === 62
      ? N(w)
      : dt(w)
        ? ((u = L), Z(w))
        : (e.consume(w), L);
  }
  function R(w) {
    return w === null
      ? l(w)
      : w === 63
        ? (e.consume(w), Y)
        : dt(w)
          ? ((u = R), Z(w))
          : (e.consume(w), R);
  }
  function Y(w) {
    return w === 62 ? N(w) : R(w);
  }
  function Q(w) {
    return Me(w) ? (e.consume(w), V) : l(w);
  }
  function V(w) {
    return w === 45 || Ae(w) ? (e.consume(w), V) : K(w);
  }
  function K(w) {
    return dt(w) ? ((u = K), Z(w)) : kt(w) ? (e.consume(w), K) : N(w);
  }
  function $(w) {
    return w === 45 || Ae(w)
      ? (e.consume(w), $)
      : w === 47 || w === 62 || Ft(w)
        ? it(w)
        : l(w);
  }
  function it(w) {
    return w === 47
      ? (e.consume(w), N)
      : w === 58 || w === 95 || Me(w)
        ? (e.consume(w), O)
        : dt(w)
          ? ((u = it), Z(w))
          : kt(w)
            ? (e.consume(w), it)
            : N(w);
  }
  function O(w) {
    return w === 45 || w === 46 || w === 58 || w === 95 || Ae(w)
      ? (e.consume(w), O)
      : J(w);
  }
  function J(w) {
    return w === 61
      ? (e.consume(w), et)
      : dt(w)
        ? ((u = J), Z(w))
        : kt(w)
          ? (e.consume(w), J)
          : it(w);
  }
  function et(w) {
    return w === null || w === 60 || w === 61 || w === 62 || w === 96
      ? l(w)
      : w === 34 || w === 39
        ? (e.consume(w), (o = w), vt)
        : dt(w)
          ? ((u = et), Z(w))
          : kt(w)
            ? (e.consume(w), et)
            : (e.consume(w), st);
  }
  function vt(w) {
    return w === o
      ? (e.consume(w), (o = void 0), W)
      : w === null
        ? l(w)
        : dt(w)
          ? ((u = vt), Z(w))
          : (e.consume(w), vt);
  }
  function st(w) {
    return w === null ||
      w === 34 ||
      w === 39 ||
      w === 60 ||
      w === 61 ||
      w === 96
      ? l(w)
      : w === 47 || w === 62 || Ft(w)
        ? it(w)
        : (e.consume(w), st);
  }
  function W(w) {
    return w === 47 || w === 62 || Ft(w) ? it(w) : l(w);
  }
  function N(w) {
    return w === 62
      ? (e.consume(w), e.exit('htmlTextData'), e.exit('htmlText'), i)
      : l(w);
  }
  function Z(w) {
    return (
      e.exit('htmlTextData'),
      e.enter('lineEnding'),
      e.consume(w),
      e.exit('lineEnding'),
      lt
    );
  }
  function lt(w) {
    return kt(w)
      ? Ot(
          e,
          pt,
          'linePrefix',
          r.parser.constructs.disable.null.includes('codeIndented')
            ? void 0
            : 4,
        )(w)
      : pt(w);
  }
  function pt(w) {
    return e.enter('htmlTextData'), u(w);
  }
}
const Nh = { name: 'labelEnd', resolveAll: PA, resolveTo: GA, tokenize: YA },
  UA = { tokenize: FA },
  HA = { tokenize: IA },
  qA = { tokenize: XA };
function PA(e) {
  let i = -1;
  const l = [];
  for (; ++i < e.length; ) {
    const r = e[i][1];
    if (
      (l.push(e[i]),
      r.type === 'labelImage' ||
        r.type === 'labelLink' ||
        r.type === 'labelEnd')
    ) {
      const o = r.type === 'labelImage' ? 4 : 2;
      (r.type = 'data'), (i += o);
    }
  }
  return e.length !== l.length && Ze(e, 0, e.length, l), e;
}
function GA(e, i) {
  let l = e.length,
    r = 0,
    o,
    c,
    u,
    h;
  for (; l--; )
    if (((o = e[l][1]), c)) {
      if (o.type === 'link' || (o.type === 'labelLink' && o._inactive)) break;
      e[l][0] === 'enter' && o.type === 'labelLink' && (o._inactive = !0);
    } else if (u) {
      if (
        e[l][0] === 'enter' &&
        (o.type === 'labelImage' || o.type === 'labelLink') &&
        !o._balanced &&
        ((c = l), o.type !== 'labelLink')
      ) {
        r = 2;
        break;
      }
    } else o.type === 'labelEnd' && (u = l);
  const m = {
      type: e[c][1].type === 'labelLink' ? 'link' : 'image',
      start: { ...e[c][1].start },
      end: { ...e[e.length - 1][1].end },
    },
    p = { type: 'label', start: { ...e[c][1].start }, end: { ...e[u][1].end } },
    g = {
      type: 'labelText',
      start: { ...e[c + r + 2][1].end },
      end: { ...e[u - 2][1].start },
    };
  return (
    (h = [
      ['enter', m, i],
      ['enter', p, i],
    ]),
    (h = cn(h, e.slice(c + 1, c + r + 3))),
    (h = cn(h, [['enter', g, i]])),
    (h = cn(
      h,
      Oo(i.parser.constructs.insideSpan.null, e.slice(c + r + 4, u - 3), i),
    )),
    (h = cn(h, [['exit', g, i], e[u - 2], e[u - 1], ['exit', p, i]])),
    (h = cn(h, e.slice(u + 1))),
    (h = cn(h, [['exit', m, i]])),
    Ze(e, c, e.length, h),
    e
  );
}
function YA(e, i, l) {
  const r = this;
  let o = r.events.length,
    c,
    u;
  for (; o--; )
    if (
      (r.events[o][1].type === 'labelImage' ||
        r.events[o][1].type === 'labelLink') &&
      !r.events[o][1]._balanced
    ) {
      c = r.events[o][1];
      break;
    }
  return h;
  function h(x) {
    return c
      ? c._inactive
        ? y(x)
        : ((u = r.parser.defined.includes(
            xn(r.sliceSerialize({ start: c.end, end: r.now() })),
          )),
          e.enter('labelEnd'),
          e.enter('labelMarker'),
          e.consume(x),
          e.exit('labelMarker'),
          e.exit('labelEnd'),
          m)
      : l(x);
  }
  function m(x) {
    return x === 40
      ? e.attempt(UA, g, u ? g : y)(x)
      : x === 91
        ? e.attempt(HA, g, u ? p : y)(x)
        : u
          ? g(x)
          : y(x);
  }
  function p(x) {
    return e.attempt(qA, g, y)(x);
  }
  function g(x) {
    return i(x);
  }
  function y(x) {
    return (c._balanced = !0), l(x);
  }
}
function FA(e, i, l) {
  return r;
  function r(y) {
    return (
      e.enter('resource'),
      e.enter('resourceMarker'),
      e.consume(y),
      e.exit('resourceMarker'),
      o
    );
  }
  function o(y) {
    return Ft(y) ? hr(e, c)(y) : c(y);
  }
  function c(y) {
    return y === 41
      ? g(y)
      : J1(
          e,
          u,
          h,
          'resourceDestination',
          'resourceDestinationLiteral',
          'resourceDestinationLiteralMarker',
          'resourceDestinationRaw',
          'resourceDestinationString',
          32,
        )(y);
  }
  function u(y) {
    return Ft(y) ? hr(e, m)(y) : g(y);
  }
  function h(y) {
    return l(y);
  }
  function m(y) {
    return y === 34 || y === 39 || y === 40
      ? W1(
          e,
          p,
          l,
          'resourceTitle',
          'resourceTitleMarker',
          'resourceTitleString',
        )(y)
      : g(y);
  }
  function p(y) {
    return Ft(y) ? hr(e, g)(y) : g(y);
  }
  function g(y) {
    return y === 41
      ? (e.enter('resourceMarker'),
        e.consume(y),
        e.exit('resourceMarker'),
        e.exit('resource'),
        i)
      : l(y);
  }
}
function IA(e, i, l) {
  const r = this;
  return o;
  function o(h) {
    return $1.call(
      r,
      e,
      c,
      u,
      'reference',
      'referenceMarker',
      'referenceString',
    )(h);
  }
  function c(h) {
    return r.parser.defined.includes(
      xn(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)),
    )
      ? i(h)
      : l(h);
  }
  function u(h) {
    return l(h);
  }
}
function XA(e, i, l) {
  return r;
  function r(c) {
    return (
      e.enter('reference'),
      e.enter('referenceMarker'),
      e.consume(c),
      e.exit('referenceMarker'),
      o
    );
  }
  function o(c) {
    return c === 93
      ? (e.enter('referenceMarker'),
        e.consume(c),
        e.exit('referenceMarker'),
        e.exit('reference'),
        i)
      : l(c);
  }
}
const QA = { name: 'labelStartImage', resolveAll: Nh.resolveAll, tokenize: KA };
function KA(e, i, l) {
  const r = this;
  return o;
  function o(h) {
    return (
      e.enter('labelImage'),
      e.enter('labelImageMarker'),
      e.consume(h),
      e.exit('labelImageMarker'),
      c
    );
  }
  function c(h) {
    return h === 91
      ? (e.enter('labelMarker'),
        e.consume(h),
        e.exit('labelMarker'),
        e.exit('labelImage'),
        u)
      : l(h);
  }
  function u(h) {
    return h === 94 && '_hiddenFootnoteSupport' in r.parser.constructs
      ? l(h)
      : i(h);
  }
}
const ZA = { name: 'labelStartLink', resolveAll: Nh.resolveAll, tokenize: JA };
function JA(e, i, l) {
  const r = this;
  return o;
  function o(u) {
    return (
      e.enter('labelLink'),
      e.enter('labelMarker'),
      e.consume(u),
      e.exit('labelMarker'),
      e.exit('labelLink'),
      c
    );
  }
  function c(u) {
    return u === 94 && '_hiddenFootnoteSupport' in r.parser.constructs
      ? l(u)
      : i(u);
  }
}
const hf = { name: 'lineEnding', tokenize: $A };
function $A(e, i) {
  return l;
  function l(r) {
    return (
      e.enter('lineEnding'),
      e.consume(r),
      e.exit('lineEnding'),
      Ot(e, i, 'linePrefix')
    );
  }
}
const so = { name: 'thematicBreak', tokenize: WA };
function WA(e, i, l) {
  let r = 0,
    o;
  return c;
  function c(p) {
    return e.enter('thematicBreak'), u(p);
  }
  function u(p) {
    return (o = p), h(p);
  }
  function h(p) {
    return p === o
      ? (e.enter('thematicBreakSequence'), m(p))
      : r >= 3 && (p === null || dt(p))
        ? (e.exit('thematicBreak'), i(p))
        : l(p);
  }
  function m(p) {
    return p === o
      ? (e.consume(p), r++, m)
      : (e.exit('thematicBreakSequence'),
        kt(p) ? Ot(e, h, 'whitespace')(p) : h(p));
  }
}
const Ue = {
    continuation: { tokenize: iw },
    exit: aw,
    name: 'list',
    tokenize: nw,
  },
  tw = { partial: !0, tokenize: rw },
  ew = { partial: !0, tokenize: lw };
function nw(e, i, l) {
  const r = this,
    o = r.events[r.events.length - 1];
  let c =
      o && o[1].type === 'linePrefix'
        ? o[2].sliceSerialize(o[1], !0).length
        : 0,
    u = 0;
  return h;
  function h(b) {
    const T =
      r.containerState.type ||
      (b === 42 || b === 43 || b === 45 ? 'listUnordered' : 'listOrdered');
    if (
      T === 'listUnordered'
        ? !r.containerState.marker || b === r.containerState.marker
        : Ff(b)
    ) {
      if (
        (r.containerState.type ||
          ((r.containerState.type = T), e.enter(T, { _container: !0 })),
        T === 'listUnordered')
      )
        return (
          e.enter('listItemPrefix'),
          b === 42 || b === 45 ? e.check(so, l, p)(b) : p(b)
        );
      if (!r.interrupt || b === 49)
        return e.enter('listItemPrefix'), e.enter('listItemValue'), m(b);
    }
    return l(b);
  }
  function m(b) {
    return Ff(b) && ++u < 10
      ? (e.consume(b), m)
      : (!r.interrupt || u < 2) &&
          (r.containerState.marker
            ? b === r.containerState.marker
            : b === 41 || b === 46)
        ? (e.exit('listItemValue'), p(b))
        : l(b);
  }
  function p(b) {
    return (
      e.enter('listItemMarker'),
      e.consume(b),
      e.exit('listItemMarker'),
      (r.containerState.marker = r.containerState.marker || b),
      e.check(Cr, r.interrupt ? l : g, e.attempt(tw, x, y))
    );
  }
  function g(b) {
    return (r.containerState.initialBlankLine = !0), c++, x(b);
  }
  function y(b) {
    return kt(b)
      ? (e.enter('listItemPrefixWhitespace'),
        e.consume(b),
        e.exit('listItemPrefixWhitespace'),
        x)
      : l(b);
  }
  function x(b) {
    return (
      (r.containerState.size =
        c + r.sliceSerialize(e.exit('listItemPrefix'), !0).length),
      i(b)
    );
  }
}
function iw(e, i, l) {
  const r = this;
  return (r.containerState._closeFlow = void 0), e.check(Cr, o, c);
  function o(h) {
    return (
      (r.containerState.furtherBlankLines =
        r.containerState.furtherBlankLines ||
        r.containerState.initialBlankLine),
      Ot(e, i, 'listItemIndent', r.containerState.size + 1)(h)
    );
  }
  function c(h) {
    return r.containerState.furtherBlankLines || !kt(h)
      ? ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        u(h))
      : ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        e.attempt(ew, i, u)(h));
  }
  function u(h) {
    return (
      (r.containerState._closeFlow = !0),
      (r.interrupt = void 0),
      Ot(
        e,
        e.attempt(Ue, i, l),
        'linePrefix',
        r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4,
      )(h)
    );
  }
}
function lw(e, i, l) {
  const r = this;
  return Ot(e, o, 'listItemIndent', r.containerState.size + 1);
  function o(c) {
    const u = r.events[r.events.length - 1];
    return u &&
      u[1].type === 'listItemIndent' &&
      u[2].sliceSerialize(u[1], !0).length === r.containerState.size
      ? i(c)
      : l(c);
  }
}
function aw(e) {
  e.exit(this.containerState.type);
}
function rw(e, i, l) {
  const r = this;
  return Ot(
    e,
    o,
    'listItemPrefixWhitespace',
    r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 5,
  );
  function o(c) {
    const u = r.events[r.events.length - 1];
    return !kt(c) && u && u[1].type === 'listItemPrefixWhitespace'
      ? i(c)
      : l(c);
  }
}
const Gy = { name: 'setextUnderline', resolveTo: sw, tokenize: ow };
function sw(e, i) {
  let l = e.length,
    r,
    o,
    c;
  for (; l--; )
    if (e[l][0] === 'enter') {
      if (e[l][1].type === 'content') {
        r = l;
        break;
      }
      e[l][1].type === 'paragraph' && (o = l);
    } else
      e[l][1].type === 'content' && e.splice(l, 1),
        !c && e[l][1].type === 'definition' && (c = l);
  const u = {
    type: 'setextHeading',
    start: { ...e[r][1].start },
    end: { ...e[e.length - 1][1].end },
  };
  return (
    (e[o][1].type = 'setextHeadingText'),
    c
      ? (e.splice(o, 0, ['enter', u, i]),
        e.splice(c + 1, 0, ['exit', e[r][1], i]),
        (e[r][1].end = { ...e[c][1].end }))
      : (e[r][1] = u),
    e.push(['exit', u, i]),
    e
  );
}
function ow(e, i, l) {
  const r = this;
  let o;
  return c;
  function c(p) {
    let g = r.events.length,
      y;
    for (; g--; )
      if (
        r.events[g][1].type !== 'lineEnding' &&
        r.events[g][1].type !== 'linePrefix' &&
        r.events[g][1].type !== 'content'
      ) {
        y = r.events[g][1].type === 'paragraph';
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || y)
      ? (e.enter('setextHeadingLine'), (o = p), u(p))
      : l(p);
  }
  function u(p) {
    return e.enter('setextHeadingLineSequence'), h(p);
  }
  function h(p) {
    return p === o
      ? (e.consume(p), h)
      : (e.exit('setextHeadingLineSequence'),
        kt(p) ? Ot(e, m, 'lineSuffix')(p) : m(p));
  }
  function m(p) {
    return p === null || dt(p) ? (e.exit('setextHeadingLine'), i(p)) : l(p);
  }
}
const uw = { tokenize: cw };
function cw(e) {
  const i = this,
    l = e.attempt(
      Cr,
      r,
      e.attempt(
        this.parser.constructs.flowInitial,
        o,
        Ot(
          e,
          e.attempt(this.parser.constructs.flow, o, e.attempt(mA, o)),
          'linePrefix',
        ),
      ),
    );
  return l;
  function r(c) {
    if (c === null) {
      e.consume(c);
      return;
    }
    return (
      e.enter('lineEndingBlank'),
      e.consume(c),
      e.exit('lineEndingBlank'),
      (i.currentConstruct = void 0),
      l
    );
  }
  function o(c) {
    if (c === null) {
      e.consume(c);
      return;
    }
    return (
      e.enter('lineEnding'),
      e.consume(c),
      e.exit('lineEnding'),
      (i.currentConstruct = void 0),
      l
    );
  }
}
const fw = { resolveAll: ev() },
  hw = tv('string'),
  dw = tv('text');
function tv(e) {
  return { resolveAll: ev(e === 'text' ? pw : void 0), tokenize: i };
  function i(l) {
    const r = this,
      o = this.parser.constructs[e],
      c = l.attempt(o, u, h);
    return u;
    function u(g) {
      return p(g) ? c(g) : h(g);
    }
    function h(g) {
      if (g === null) {
        l.consume(g);
        return;
      }
      return l.enter('data'), l.consume(g), m;
    }
    function m(g) {
      return p(g) ? (l.exit('data'), c(g)) : (l.consume(g), m);
    }
    function p(g) {
      if (g === null) return !0;
      const y = o[g];
      let x = -1;
      if (y)
        for (; ++x < y.length; ) {
          const b = y[x];
          if (!b.previous || b.previous.call(r, r.previous)) return !0;
        }
      return !1;
    }
  }
}
function ev(e) {
  return i;
  function i(l, r) {
    let o = -1,
      c;
    for (; ++o <= l.length; )
      c === void 0
        ? l[o] && l[o][1].type === 'data' && ((c = o), o++)
        : (!l[o] || l[o][1].type !== 'data') &&
          (o !== c + 2 &&
            ((l[c][1].end = l[o - 1][1].end),
            l.splice(c + 2, o - c - 2),
            (o = c + 2)),
          (c = void 0));
    return e ? e(l, r) : l;
  }
}
function pw(e, i) {
  let l = 0;
  for (; ++l <= e.length; )
    if (
      (l === e.length || e[l][1].type === 'lineEnding') &&
      e[l - 1][1].type === 'data'
    ) {
      const r = e[l - 1][1],
        o = i.sliceStream(r);
      let c = o.length,
        u = -1,
        h = 0,
        m;
      for (; c--; ) {
        const p = o[c];
        if (typeof p == 'string') {
          for (u = p.length; p.charCodeAt(u - 1) === 32; ) h++, u--;
          if (u) break;
          u = -1;
        } else if (p === -2) (m = !0), h++;
        else if (p !== -1) {
          c++;
          break;
        }
      }
      if ((i._contentTypeTextTrailing && l === e.length && (h = 0), h)) {
        const p = {
          type:
            l === e.length || m || h < 2 ? 'lineSuffix' : 'hardBreakTrailing',
          start: {
            _bufferIndex: c ? u : r.start._bufferIndex + u,
            _index: r.start._index + c,
            line: r.end.line,
            column: r.end.column - h,
            offset: r.end.offset - h,
          },
          end: { ...r.end },
        };
        (r.end = { ...p.start }),
          r.start.offset === r.end.offset
            ? Object.assign(r, p)
            : (e.splice(l, 0, ['enter', p, i], ['exit', p, i]), (l += 2));
      }
      l++;
    }
  return e;
}
const mw = {
    42: Ue,
    43: Ue,
    45: Ue,
    48: Ue,
    49: Ue,
    50: Ue,
    51: Ue,
    52: Ue,
    53: Ue,
    54: Ue,
    55: Ue,
    56: Ue,
    57: Ue,
    62: X1,
  },
  gw = { 91: bA },
  yw = { [-2]: ff, [-1]: ff, 32: ff },
  vw = {
    35: kA,
    42: so,
    45: [Gy, so],
    60: zA,
    61: Gy,
    95: so,
    96: qy,
    126: qy,
  },
  xw = { 38: K1, 92: Q1 },
  bw = {
    [-5]: hf,
    [-4]: hf,
    [-3]: hf,
    33: QA,
    38: K1,
    42: If,
    60: [Z2, BA],
    91: ZA,
    92: [wA, Q1],
    93: Nh,
    95: If,
    96: uA,
  },
  Sw = { null: [If, fw] },
  Tw = { null: [42, 95] },
  Aw = { null: [] },
  ww = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        attentionMarkers: Tw,
        contentInitial: gw,
        disable: Aw,
        document: mw,
        flow: vw,
        flowInitial: yw,
        insideSpan: Sw,
        string: xw,
        text: bw,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  );
function Ew(e, i, l) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: (l && l.line) || 1,
    column: (l && l.column) || 1,
    offset: (l && l.offset) || 0,
  };
  const o = {},
    c = [];
  let u = [],
    h = [];
  const m = {
      attempt: K(Q),
      check: K(V),
      consume: L,
      enter: R,
      exit: Y,
      interrupt: K(V, { interrupt: !0 }),
    },
    p = {
      code: null,
      containerState: {},
      defineSkip: M,
      events: [],
      now: T,
      parser: e,
      previous: null,
      sliceSerialize: x,
      sliceStream: b,
      write: y,
    };
  let g = i.tokenize.call(p, m);
  return i.resolveAll && c.push(i), p;
  function y(J) {
    return (
      (u = cn(u, J)),
      D(),
      u[u.length - 1] !== null
        ? []
        : ($(i, 0), (p.events = Oo(c, p.events, p)), p.events)
    );
  }
  function x(J, et) {
    return Cw(b(J), et);
  }
  function b(J) {
    return kw(u, J);
  }
  function T() {
    const { _bufferIndex: J, _index: et, line: vt, column: st, offset: W } = r;
    return { _bufferIndex: J, _index: et, line: vt, column: st, offset: W };
  }
  function M(J) {
    (o[J.line] = J.column), O();
  }
  function D() {
    let J;
    for (; r._index < u.length; ) {
      const et = u[r._index];
      if (typeof et == 'string')
        for (
          J = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0);
          r._index === J && r._bufferIndex < et.length;

        )
          E(et.charCodeAt(r._bufferIndex));
      else E(et);
    }
  }
  function E(J) {
    g = g(J);
  }
  function L(J) {
    dt(J)
      ? (r.line++, (r.column = 1), (r.offset += J === -3 ? 2 : 1), O())
      : J !== -1 && (r.column++, r.offset++),
      r._bufferIndex < 0
        ? r._index++
        : (r._bufferIndex++,
          r._bufferIndex === u[r._index].length &&
            ((r._bufferIndex = -1), r._index++)),
      (p.previous = J);
  }
  function R(J, et) {
    const vt = et || {};
    return (
      (vt.type = J),
      (vt.start = T()),
      p.events.push(['enter', vt, p]),
      h.push(vt),
      vt
    );
  }
  function Y(J) {
    const et = h.pop();
    return (et.end = T()), p.events.push(['exit', et, p]), et;
  }
  function Q(J, et) {
    $(J, et.from);
  }
  function V(J, et) {
    et.restore();
  }
  function K(J, et) {
    return vt;
    function vt(st, W, N) {
      let Z, lt, pt, w;
      return Array.isArray(st) ? G(st) : 'tokenize' in st ? G([st]) : C(st);
      function C(ft) {
        return Ct;
        function Ct(Zt) {
          const Vt = Zt !== null && ft[Zt],
            $e = Zt !== null && ft.null,
            On = [
              ...(Array.isArray(Vt) ? Vt : Vt ? [Vt] : []),
              ...(Array.isArray($e) ? $e : $e ? [$e] : []),
            ];
          return G(On)(Zt);
        }
      }
      function G(ft) {
        return (Z = ft), (lt = 0), ft.length === 0 ? N : A(ft[lt]);
      }
      function A(ft) {
        return Ct;
        function Ct(Zt) {
          return (
            (w = it()),
            (pt = ft),
            ft.partial || (p.currentConstruct = ft),
            ft.name && p.parser.constructs.disable.null.includes(ft.name)
              ? gt()
              : ft.tokenize.call(
                  et ? Object.assign(Object.create(p), et) : p,
                  m,
                  at,
                  gt,
                )(Zt)
          );
        }
      }
      function at(ft) {
        return J(pt, w), W;
      }
      function gt(ft) {
        return w.restore(), ++lt < Z.length ? A(Z[lt]) : N;
      }
    }
  }
  function $(J, et) {
    J.resolveAll && !c.includes(J) && c.push(J),
      J.resolve &&
        Ze(
          p.events,
          et,
          p.events.length - et,
          J.resolve(p.events.slice(et), p),
        ),
      J.resolveTo && (p.events = J.resolveTo(p.events, p));
  }
  function it() {
    const J = T(),
      et = p.previous,
      vt = p.currentConstruct,
      st = p.events.length,
      W = Array.from(h);
    return { from: st, restore: N };
    function N() {
      (r = J),
        (p.previous = et),
        (p.currentConstruct = vt),
        (p.events.length = st),
        (h = W),
        O();
    }
  }
  function O() {
    r.line in o &&
      r.column < 2 &&
      ((r.column = o[r.line]), (r.offset += o[r.line] - 1));
  }
}
function kw(e, i) {
  const l = i.start._index,
    r = i.start._bufferIndex,
    o = i.end._index,
    c = i.end._bufferIndex;
  let u;
  if (l === o) u = [e[l].slice(r, c)];
  else {
    if (((u = e.slice(l, o)), r > -1)) {
      const h = u[0];
      typeof h == 'string' ? (u[0] = h.slice(r)) : u.shift();
    }
    c > 0 && u.push(e[o].slice(0, c));
  }
  return u;
}
function Cw(e, i) {
  let l = -1;
  const r = [];
  let o;
  for (; ++l < e.length; ) {
    const c = e[l];
    let u;
    if (typeof c == 'string') u = c;
    else
      switch (c) {
        case -5: {
          u = '\r';
          break;
        }
        case -4: {
          u = `
`;
          break;
        }
        case -3: {
          u = `\r
`;
          break;
        }
        case -2: {
          u = i ? ' ' : '	';
          break;
        }
        case -1: {
          if (!i && o) continue;
          u = ' ';
          break;
        }
        default:
          u = String.fromCharCode(c);
      }
    (o = c === -2), r.push(u);
  }
  return r.join('');
}
function Mw(e) {
  const r = {
    constructs: F1([ww, ...((e || {}).extensions || [])]),
    content: o(G2),
    defined: [],
    document: o(F2),
    flow: o(uw),
    lazy: {},
    string: o(hw),
    text: o(dw),
  };
  return r;
  function o(c) {
    return u;
    function u(h) {
      return Ew(r, c, h);
    }
  }
}
function Dw(e) {
  for (; !Z1(e); );
  return e;
}
const Yy = /[\0\t\n\r]/g;
function zw() {
  let e = 1,
    i = '',
    l = !0,
    r;
  return o;
  function o(c, u, h) {
    const m = [];
    let p, g, y, x, b;
    for (
      c =
        i +
        (typeof c == 'string'
          ? c.toString()
          : new TextDecoder(u || void 0).decode(c)),
        y = 0,
        i = '',
        l && (c.charCodeAt(0) === 65279 && y++, (l = void 0));
      y < c.length;

    ) {
      if (
        ((Yy.lastIndex = y),
        (p = Yy.exec(c)),
        (x = p && p.index !== void 0 ? p.index : c.length),
        (b = c.charCodeAt(x)),
        !p)
      ) {
        i = c.slice(y);
        break;
      }
      if (b === 10 && y === x && r) m.push(-3), (r = void 0);
      else
        switch (
          (r && (m.push(-5), (r = void 0)),
          y < x && (m.push(c.slice(y, x)), (e += x - y)),
          b)
        ) {
          case 0: {
            m.push(65533), e++;
            break;
          }
          case 9: {
            for (g = Math.ceil(e / 4) * 4, m.push(-2); e++ < g; ) m.push(-1);
            break;
          }
          case 10: {
            m.push(-4), (e = 1);
            break;
          }
          default:
            (r = !0), (e = 1);
        }
      y = x + 1;
    }
    return h && (r && m.push(-5), i && m.push(i), m.push(null)), m;
  }
}
const Ow = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Rw(e) {
  return e.replace(Ow, _w);
}
function _w(e, i, l) {
  if (i) return i;
  if (l.charCodeAt(0) === 35) {
    const o = l.charCodeAt(1),
      c = o === 120 || o === 88;
    return I1(l.slice(c ? 2 : 1), c ? 16 : 10);
  }
  return _h(l) || e;
}
const nv = {}.hasOwnProperty;
function Nw(e, i, l) {
  return (
    i && typeof i == 'object' && ((l = i), (i = void 0)),
    Lw(l)(
      Dw(
        Mw(l)
          .document()
          .write(zw()(e, i, !0)),
      ),
    )
  );
}
function Lw(e) {
  const i = {
    transforms: [],
    canContainEols: ['emphasis', 'fragment', 'heading', 'paragraph', 'strong'],
    enter: {
      autolink: c(sl),
      autolinkProtocol: it,
      autolinkEmail: it,
      atxHeading: c(al),
      blockQuote: c($e),
      characterEscape: it,
      characterReference: it,
      codeFenced: c(On),
      codeFencedFenceInfo: u,
      codeFencedFenceMeta: u,
      codeIndented: c(On, u),
      codeText: c(ca, u),
      codeTextData: it,
      data: it,
      codeFlowValue: it,
      definition: c(_r),
      definitionDestinationString: u,
      definitionLabelString: u,
      definitionTitleString: u,
      emphasis: c(Rn),
      hardBreakEscape: c(rl),
      hardBreakTrailing: c(rl),
      htmlFlow: c(Nr, u),
      htmlFlowData: it,
      htmlText: c(Nr, u),
      htmlTextData: it,
      image: c(Lr),
      label: u,
      link: c(sl),
      listItem: c(fa),
      listItemValue: x,
      listOrdered: c(ol, y),
      listUnordered: c(ol),
      paragraph: c(Ho),
      reference: A,
      referenceString: u,
      resourceDestinationString: u,
      resourceTitleString: u,
      setextHeading: c(al),
      strong: c(qo),
      thematicBreak: c(Po),
    },
    exit: {
      atxHeading: m(),
      atxHeadingSequence: Q,
      autolink: m(),
      autolinkEmail: Vt,
      autolinkProtocol: Zt,
      blockQuote: m(),
      characterEscapeValue: O,
      characterReferenceMarkerHexadecimal: gt,
      characterReferenceMarkerNumeric: gt,
      characterReferenceValue: ft,
      characterReference: Ct,
      codeFenced: m(D),
      codeFencedFence: M,
      codeFencedFenceInfo: b,
      codeFencedFenceMeta: T,
      codeFlowValue: O,
      codeIndented: m(E),
      codeText: m(W),
      codeTextData: O,
      data: O,
      definition: m(),
      definitionDestinationString: Y,
      definitionLabelString: L,
      definitionTitleString: R,
      emphasis: m(),
      hardBreakEscape: m(et),
      hardBreakTrailing: m(et),
      htmlFlow: m(vt),
      htmlFlowData: O,
      htmlText: m(st),
      htmlTextData: O,
      image: m(Z),
      label: pt,
      labelText: lt,
      lineEnding: J,
      link: m(N),
      listItem: m(),
      listOrdered: m(),
      listUnordered: m(),
      paragraph: m(),
      referenceString: at,
      resourceDestinationString: w,
      resourceTitleString: C,
      resource: G,
      setextHeading: m($),
      setextHeadingLineSequence: K,
      setextHeadingText: V,
      strong: m(),
      thematicBreak: m(),
    },
  };
  iv(i, (e || {}).mdastExtensions || []);
  const l = {};
  return r;
  function r(F) {
    let nt = { type: 'root', children: [] };
    const yt = {
        stack: [nt],
        tokenStack: [],
        config: i,
        enter: h,
        exit: p,
        buffer: u,
        resume: g,
        data: l,
      },
      At = [];
    let Lt = -1;
    for (; ++Lt < F.length; )
      if (F[Lt][1].type === 'listOrdered' || F[Lt][1].type === 'listUnordered')
        if (F[Lt][0] === 'enter') At.push(Lt);
        else {
          const qe = At.pop();
          Lt = o(F, qe, Lt);
        }
    for (Lt = -1; ++Lt < F.length; ) {
      const qe = i[F[Lt][0]];
      nv.call(qe, F[Lt][1].type) &&
        qe[F[Lt][1].type].call(
          Object.assign({ sliceSerialize: F[Lt][2].sliceSerialize }, yt),
          F[Lt][1],
        );
    }
    if (yt.tokenStack.length > 0) {
      const qe = yt.tokenStack[yt.tokenStack.length - 1];
      (qe[1] || Fy).call(yt, void 0, qe[0]);
    }
    for (
      nt.position = {
        start: wi(
          F.length > 0 ? F[0][1].start : { line: 1, column: 1, offset: 0 },
        ),
        end: wi(
          F.length > 0
            ? F[F.length - 2][1].end
            : { line: 1, column: 1, offset: 0 },
        ),
      },
        Lt = -1;
      ++Lt < i.transforms.length;

    )
      nt = i.transforms[Lt](nt) || nt;
    return nt;
  }
  function o(F, nt, yt) {
    let At = nt - 1,
      Lt = -1,
      qe = !1,
      _n,
      ke,
      ce,
      Oe;
    for (; ++At <= yt; ) {
      const Pt = F[At];
      switch (Pt[1].type) {
        case 'listUnordered':
        case 'listOrdered':
        case 'blockQuote': {
          Pt[0] === 'enter' ? Lt++ : Lt--, (Oe = void 0);
          break;
        }
        case 'lineEndingBlank': {
          Pt[0] === 'enter' &&
            (_n && !Oe && !Lt && !ce && (ce = At), (Oe = void 0));
          break;
        }
        case 'linePrefix':
        case 'listItemValue':
        case 'listItemMarker':
        case 'listItemPrefix':
        case 'listItemPrefixWhitespace':
          break;
        default:
          Oe = void 0;
      }
      if (
        (!Lt && Pt[0] === 'enter' && Pt[1].type === 'listItemPrefix') ||
        (Lt === -1 &&
          Pt[0] === 'exit' &&
          (Pt[1].type === 'listUnordered' || Pt[1].type === 'listOrdered'))
      ) {
        if (_n) {
          let Wn = At;
          for (ke = void 0; Wn--; ) {
            const dn = F[Wn];
            if (
              dn[1].type === 'lineEnding' ||
              dn[1].type === 'lineEndingBlank'
            ) {
              if (dn[0] === 'exit') continue;
              ke && ((F[ke][1].type = 'lineEndingBlank'), (qe = !0)),
                (dn[1].type = 'lineEnding'),
                (ke = Wn);
            } else if (
              !(
                dn[1].type === 'linePrefix' ||
                dn[1].type === 'blockQuotePrefix' ||
                dn[1].type === 'blockQuotePrefixWhitespace' ||
                dn[1].type === 'blockQuoteMarker' ||
                dn[1].type === 'listItemIndent'
              )
            )
              break;
          }
          ce && (!ke || ce < ke) && (_n._spread = !0),
            (_n.end = Object.assign({}, ke ? F[ke][1].start : Pt[1].end)),
            F.splice(ke || At, 0, ['exit', _n, Pt[2]]),
            At++,
            yt++;
        }
        if (Pt[1].type === 'listItemPrefix') {
          const Wn = {
            type: 'listItem',
            _spread: !1,
            start: Object.assign({}, Pt[1].start),
            end: void 0,
          };
          (_n = Wn),
            F.splice(At, 0, ['enter', Wn, Pt[2]]),
            At++,
            yt++,
            (ce = void 0),
            (Oe = !0);
        }
      }
    }
    return (F[nt][1]._spread = qe), yt;
  }
  function c(F, nt) {
    return yt;
    function yt(At) {
      h.call(this, F(At), At), nt && nt.call(this, At);
    }
  }
  function u() {
    this.stack.push({ type: 'fragment', children: [] });
  }
  function h(F, nt, yt) {
    this.stack[this.stack.length - 1].children.push(F),
      this.stack.push(F),
      this.tokenStack.push([nt, yt || void 0]),
      (F.position = { start: wi(nt.start), end: void 0 });
  }
  function m(F) {
    return nt;
    function nt(yt) {
      F && F.call(this, yt), p.call(this, yt);
    }
  }
  function p(F, nt) {
    const yt = this.stack.pop(),
      At = this.tokenStack.pop();
    if (At)
      At[0].type !== F.type &&
        (nt ? nt.call(this, F, At[0]) : (At[1] || Fy).call(this, F, At[0]));
    else
      throw new Error(
        'Cannot close `' +
          F.type +
          '` (' +
          fr({ start: F.start, end: F.end }) +
          '): it’s not open',
      );
    yt.position.end = wi(F.end);
  }
  function g() {
    return Rh(this.stack.pop());
  }
  function y() {
    this.data.expectingFirstListItemValue = !0;
  }
  function x(F) {
    if (this.data.expectingFirstListItemValue) {
      const nt = this.stack[this.stack.length - 2];
      (nt.start = Number.parseInt(this.sliceSerialize(F), 10)),
        (this.data.expectingFirstListItemValue = void 0);
    }
  }
  function b() {
    const F = this.resume(),
      nt = this.stack[this.stack.length - 1];
    nt.lang = F;
  }
  function T() {
    const F = this.resume(),
      nt = this.stack[this.stack.length - 1];
    nt.meta = F;
  }
  function M() {
    this.data.flowCodeInside ||
      (this.buffer(), (this.data.flowCodeInside = !0));
  }
  function D() {
    const F = this.resume(),
      nt = this.stack[this.stack.length - 1];
    (nt.value = F.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '')),
      (this.data.flowCodeInside = void 0);
  }
  function E() {
    const F = this.resume(),
      nt = this.stack[this.stack.length - 1];
    nt.value = F.replace(/(\r?\n|\r)$/g, '');
  }
  function L(F) {
    const nt = this.resume(),
      yt = this.stack[this.stack.length - 1];
    (yt.label = nt), (yt.identifier = xn(this.sliceSerialize(F)).toLowerCase());
  }
  function R() {
    const F = this.resume(),
      nt = this.stack[this.stack.length - 1];
    nt.title = F;
  }
  function Y() {
    const F = this.resume(),
      nt = this.stack[this.stack.length - 1];
    nt.url = F;
  }
  function Q(F) {
    const nt = this.stack[this.stack.length - 1];
    if (!nt.depth) {
      const yt = this.sliceSerialize(F).length;
      nt.depth = yt;
    }
  }
  function V() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function K(F) {
    const nt = this.stack[this.stack.length - 1];
    nt.depth = this.sliceSerialize(F).codePointAt(0) === 61 ? 1 : 2;
  }
  function $() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function it(F) {
    const yt = this.stack[this.stack.length - 1].children;
    let At = yt[yt.length - 1];
    (!At || At.type !== 'text') &&
      ((At = Ee()),
      (At.position = { start: wi(F.start), end: void 0 }),
      yt.push(At)),
      this.stack.push(At);
  }
  function O(F) {
    const nt = this.stack.pop();
    (nt.value += this.sliceSerialize(F)), (nt.position.end = wi(F.end));
  }
  function J(F) {
    const nt = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const yt = nt.children[nt.children.length - 1];
      (yt.position.end = wi(F.end)), (this.data.atHardBreak = void 0);
      return;
    }
    !this.data.setextHeadingSlurpLineEnding &&
      i.canContainEols.includes(nt.type) &&
      (it.call(this, F), O.call(this, F));
  }
  function et() {
    this.data.atHardBreak = !0;
  }
  function vt() {
    const F = this.resume(),
      nt = this.stack[this.stack.length - 1];
    nt.value = F;
  }
  function st() {
    const F = this.resume(),
      nt = this.stack[this.stack.length - 1];
    nt.value = F;
  }
  function W() {
    const F = this.resume(),
      nt = this.stack[this.stack.length - 1];
    nt.value = F;
  }
  function N() {
    const F = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const nt = this.data.referenceType || 'shortcut';
      (F.type += 'Reference'),
        (F.referenceType = nt),
        delete F.url,
        delete F.title;
    } else delete F.identifier, delete F.label;
    this.data.referenceType = void 0;
  }
  function Z() {
    const F = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const nt = this.data.referenceType || 'shortcut';
      (F.type += 'Reference'),
        (F.referenceType = nt),
        delete F.url,
        delete F.title;
    } else delete F.identifier, delete F.label;
    this.data.referenceType = void 0;
  }
  function lt(F) {
    const nt = this.sliceSerialize(F),
      yt = this.stack[this.stack.length - 2];
    (yt.label = Rw(nt)), (yt.identifier = xn(nt).toLowerCase());
  }
  function pt() {
    const F = this.stack[this.stack.length - 1],
      nt = this.resume(),
      yt = this.stack[this.stack.length - 1];
    if (((this.data.inReference = !0), yt.type === 'link')) {
      const At = F.children;
      yt.children = At;
    } else yt.alt = nt;
  }
  function w() {
    const F = this.resume(),
      nt = this.stack[this.stack.length - 1];
    nt.url = F;
  }
  function C() {
    const F = this.resume(),
      nt = this.stack[this.stack.length - 1];
    nt.title = F;
  }
  function G() {
    this.data.inReference = void 0;
  }
  function A() {
    this.data.referenceType = 'collapsed';
  }
  function at(F) {
    const nt = this.resume(),
      yt = this.stack[this.stack.length - 1];
    (yt.label = nt),
      (yt.identifier = xn(this.sliceSerialize(F)).toLowerCase()),
      (this.data.referenceType = 'full');
  }
  function gt(F) {
    this.data.characterReferenceType = F.type;
  }
  function ft(F) {
    const nt = this.sliceSerialize(F),
      yt = this.data.characterReferenceType;
    let At;
    yt
      ? ((At = I1(nt, yt === 'characterReferenceMarkerNumeric' ? 10 : 16)),
        (this.data.characterReferenceType = void 0))
      : (At = _h(nt));
    const Lt = this.stack[this.stack.length - 1];
    Lt.value += At;
  }
  function Ct(F) {
    const nt = this.stack.pop();
    nt.position.end = wi(F.end);
  }
  function Zt(F) {
    O.call(this, F);
    const nt = this.stack[this.stack.length - 1];
    nt.url = this.sliceSerialize(F);
  }
  function Vt(F) {
    O.call(this, F);
    const nt = this.stack[this.stack.length - 1];
    nt.url = 'mailto:' + this.sliceSerialize(F);
  }
  function $e() {
    return { type: 'blockquote', children: [] };
  }
  function On() {
    return { type: 'code', lang: null, meta: null, value: '' };
  }
  function ca() {
    return { type: 'inlineCode', value: '' };
  }
  function _r() {
    return {
      type: 'definition',
      identifier: '',
      label: null,
      title: null,
      url: '',
    };
  }
  function Rn() {
    return { type: 'emphasis', children: [] };
  }
  function al() {
    return { type: 'heading', depth: 0, children: [] };
  }
  function rl() {
    return { type: 'break' };
  }
  function Nr() {
    return { type: 'html', value: '' };
  }
  function Lr() {
    return { type: 'image', title: null, url: '', alt: null };
  }
  function sl() {
    return { type: 'link', title: null, url: '', children: [] };
  }
  function ol(F) {
    return {
      type: 'list',
      ordered: F.type === 'listOrdered',
      start: null,
      spread: F._spread,
      children: [],
    };
  }
  function fa(F) {
    return { type: 'listItem', spread: F._spread, checked: null, children: [] };
  }
  function Ho() {
    return { type: 'paragraph', children: [] };
  }
  function qo() {
    return { type: 'strong', children: [] };
  }
  function Ee() {
    return { type: 'text', value: '' };
  }
  function Po() {
    return { type: 'thematicBreak' };
  }
}
function wi(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function iv(e, i) {
  let l = -1;
  for (; ++l < i.length; ) {
    const r = i[l];
    Array.isArray(r) ? iv(e, r) : jw(e, r);
  }
}
function jw(e, i) {
  let l;
  for (l in i)
    if (nv.call(i, l))
      switch (l) {
        case 'canContainEols': {
          const r = i[l];
          r && e[l].push(...r);
          break;
        }
        case 'transforms': {
          const r = i[l];
          r && e[l].push(...r);
          break;
        }
        case 'enter':
        case 'exit': {
          const r = i[l];
          r && Object.assign(e[l], r);
          break;
        }
      }
}
function Fy(e, i) {
  throw e
    ? new Error(
        'Cannot close `' +
          e.type +
          '` (' +
          fr({ start: e.start, end: e.end }) +
          '): a different token (`' +
          i.type +
          '`, ' +
          fr({ start: i.start, end: i.end }) +
          ') is open',
      )
    : new Error(
        'Cannot close document, a token (`' +
          i.type +
          '`, ' +
          fr({ start: i.start, end: i.end }) +
          ') is still open',
      );
}
function Bw(e) {
  const i = this;
  i.parser = l;
  function l(r) {
    return Nw(r, {
      ...i.data('settings'),
      ...e,
      extensions: i.data('micromarkExtensions') || [],
      mdastExtensions: i.data('fromMarkdownExtensions') || [],
    });
  }
}
function Vw(e, i) {
  const l = {
    type: 'element',
    tagName: 'blockquote',
    properties: {},
    children: e.wrap(e.all(i), !0),
  };
  return e.patch(i, l), e.applyData(i, l);
}
function Uw(e, i) {
  const l = { type: 'element', tagName: 'br', properties: {}, children: [] };
  return (
    e.patch(i, l),
    [
      e.applyData(i, l),
      {
        type: 'text',
        value: `
`,
      },
    ]
  );
}
function Hw(e, i) {
  const l = i.value
      ? i.value +
        `
`
      : '',
    r = {},
    o = i.lang ? i.lang.split(/\s+/) : [];
  o.length > 0 && (r.className = ['language-' + o[0]]);
  let c = {
    type: 'element',
    tagName: 'code',
    properties: r,
    children: [{ type: 'text', value: l }],
  };
  return (
    i.meta && (c.data = { meta: i.meta }),
    e.patch(i, c),
    (c = e.applyData(i, c)),
    (c = { type: 'element', tagName: 'pre', properties: {}, children: [c] }),
    e.patch(i, c),
    c
  );
}
function qw(e, i) {
  const l = {
    type: 'element',
    tagName: 'del',
    properties: {},
    children: e.all(i),
  };
  return e.patch(i, l), e.applyData(i, l);
}
function Pw(e, i) {
  const l = {
    type: 'element',
    tagName: 'em',
    properties: {},
    children: e.all(i),
  };
  return e.patch(i, l), e.applyData(i, l);
}
function Gw(e, i) {
  const l =
      typeof e.options.clobberPrefix == 'string'
        ? e.options.clobberPrefix
        : 'user-content-',
    r = String(i.identifier).toUpperCase(),
    o = ra(r.toLowerCase()),
    c = e.footnoteOrder.indexOf(r);
  let u,
    h = e.footnoteCounts.get(r);
  h === void 0
    ? ((h = 0), e.footnoteOrder.push(r), (u = e.footnoteOrder.length))
    : (u = c + 1),
    (h += 1),
    e.footnoteCounts.set(r, h);
  const m = {
    type: 'element',
    tagName: 'a',
    properties: {
      href: '#' + l + 'fn-' + o,
      id: l + 'fnref-' + o + (h > 1 ? '-' + h : ''),
      dataFootnoteRef: !0,
      ariaDescribedBy: ['footnote-label'],
    },
    children: [{ type: 'text', value: String(u) }],
  };
  e.patch(i, m);
  const p = { type: 'element', tagName: 'sup', properties: {}, children: [m] };
  return e.patch(i, p), e.applyData(i, p);
}
function Yw(e, i) {
  const l = {
    type: 'element',
    tagName: 'h' + i.depth,
    properties: {},
    children: e.all(i),
  };
  return e.patch(i, l), e.applyData(i, l);
}
function Fw(e, i) {
  if (e.options.allowDangerousHtml) {
    const l = { type: 'raw', value: i.value };
    return e.patch(i, l), e.applyData(i, l);
  }
}
function lv(e, i) {
  const l = i.referenceType;
  let r = ']';
  if (
    (l === 'collapsed'
      ? (r += '[]')
      : l === 'full' && (r += '[' + (i.label || i.identifier) + ']'),
    i.type === 'imageReference')
  )
    return [{ type: 'text', value: '![' + i.alt + r }];
  const o = e.all(i),
    c = o[0];
  c && c.type === 'text'
    ? (c.value = '[' + c.value)
    : o.unshift({ type: 'text', value: '[' });
  const u = o[o.length - 1];
  return (
    u && u.type === 'text'
      ? (u.value += r)
      : o.push({ type: 'text', value: r }),
    o
  );
}
function Iw(e, i) {
  const l = String(i.identifier).toUpperCase(),
    r = e.definitionById.get(l);
  if (!r) return lv(e, i);
  const o = { src: ra(r.url || ''), alt: i.alt };
  r.title !== null && r.title !== void 0 && (o.title = r.title);
  const c = { type: 'element', tagName: 'img', properties: o, children: [] };
  return e.patch(i, c), e.applyData(i, c);
}
function Xw(e, i) {
  const l = { src: ra(i.url) };
  i.alt !== null && i.alt !== void 0 && (l.alt = i.alt),
    i.title !== null && i.title !== void 0 && (l.title = i.title);
  const r = { type: 'element', tagName: 'img', properties: l, children: [] };
  return e.patch(i, r), e.applyData(i, r);
}
function Qw(e, i) {
  const l = { type: 'text', value: i.value.replace(/\r?\n|\r/g, ' ') };
  e.patch(i, l);
  const r = { type: 'element', tagName: 'code', properties: {}, children: [l] };
  return e.patch(i, r), e.applyData(i, r);
}
function Kw(e, i) {
  const l = String(i.identifier).toUpperCase(),
    r = e.definitionById.get(l);
  if (!r) return lv(e, i);
  const o = { href: ra(r.url || '') };
  r.title !== null && r.title !== void 0 && (o.title = r.title);
  const c = {
    type: 'element',
    tagName: 'a',
    properties: o,
    children: e.all(i),
  };
  return e.patch(i, c), e.applyData(i, c);
}
function Zw(e, i) {
  const l = { href: ra(i.url) };
  i.title !== null && i.title !== void 0 && (l.title = i.title);
  const r = {
    type: 'element',
    tagName: 'a',
    properties: l,
    children: e.all(i),
  };
  return e.patch(i, r), e.applyData(i, r);
}
function Jw(e, i, l) {
  const r = e.all(i),
    o = l ? $w(l) : av(i),
    c = {},
    u = [];
  if (typeof i.checked == 'boolean') {
    const g = r[0];
    let y;
    g && g.type === 'element' && g.tagName === 'p'
      ? (y = g)
      : ((y = { type: 'element', tagName: 'p', properties: {}, children: [] }),
        r.unshift(y)),
      y.children.length > 0 && y.children.unshift({ type: 'text', value: ' ' }),
      y.children.unshift({
        type: 'element',
        tagName: 'input',
        properties: { type: 'checkbox', checked: i.checked, disabled: !0 },
        children: [],
      }),
      (c.className = ['task-list-item']);
  }
  let h = -1;
  for (; ++h < r.length; ) {
    const g = r[h];
    (o || h !== 0 || g.type !== 'element' || g.tagName !== 'p') &&
      u.push({
        type: 'text',
        value: `
`,
      }),
      g.type === 'element' && g.tagName === 'p' && !o
        ? u.push(...g.children)
        : u.push(g);
  }
  const m = r[r.length - 1];
  m &&
    (o || m.type !== 'element' || m.tagName !== 'p') &&
    u.push({
      type: 'text',
      value: `
`,
    });
  const p = { type: 'element', tagName: 'li', properties: c, children: u };
  return e.patch(i, p), e.applyData(i, p);
}
function $w(e) {
  let i = !1;
  if (e.type === 'list') {
    i = e.spread || !1;
    const l = e.children;
    let r = -1;
    for (; !i && ++r < l.length; ) i = av(l[r]);
  }
  return i;
}
function av(e) {
  const i = e.spread;
  return i ?? e.children.length > 1;
}
function Ww(e, i) {
  const l = {},
    r = e.all(i);
  let o = -1;
  for (
    typeof i.start == 'number' && i.start !== 1 && (l.start = i.start);
    ++o < r.length;

  ) {
    const u = r[o];
    if (
      u.type === 'element' &&
      u.tagName === 'li' &&
      u.properties &&
      Array.isArray(u.properties.className) &&
      u.properties.className.includes('task-list-item')
    ) {
      l.className = ['contains-task-list'];
      break;
    }
  }
  const c = {
    type: 'element',
    tagName: i.ordered ? 'ol' : 'ul',
    properties: l,
    children: e.wrap(r, !0),
  };
  return e.patch(i, c), e.applyData(i, c);
}
function tE(e, i) {
  const l = {
    type: 'element',
    tagName: 'p',
    properties: {},
    children: e.all(i),
  };
  return e.patch(i, l), e.applyData(i, l);
}
function eE(e, i) {
  const l = { type: 'root', children: e.wrap(e.all(i)) };
  return e.patch(i, l), e.applyData(i, l);
}
function nE(e, i) {
  const l = {
    type: 'element',
    tagName: 'strong',
    properties: {},
    children: e.all(i),
  };
  return e.patch(i, l), e.applyData(i, l);
}
function iE(e, i) {
  const l = e.all(i),
    r = l.shift(),
    o = [];
  if (r) {
    const u = {
      type: 'element',
      tagName: 'thead',
      properties: {},
      children: e.wrap([r], !0),
    };
    e.patch(i.children[0], u), o.push(u);
  }
  if (l.length > 0) {
    const u = {
        type: 'element',
        tagName: 'tbody',
        properties: {},
        children: e.wrap(l, !0),
      },
      h = Mh(i.children[1]),
      m = V1(i.children[i.children.length - 1]);
    h && m && (u.position = { start: h, end: m }), o.push(u);
  }
  const c = {
    type: 'element',
    tagName: 'table',
    properties: {},
    children: e.wrap(o, !0),
  };
  return e.patch(i, c), e.applyData(i, c);
}
function lE(e, i, l) {
  const r = l ? l.children : void 0,
    c = (r ? r.indexOf(i) : 1) === 0 ? 'th' : 'td',
    u = l && l.type === 'table' ? l.align : void 0,
    h = u ? u.length : i.children.length;
  let m = -1;
  const p = [];
  for (; ++m < h; ) {
    const y = i.children[m],
      x = {},
      b = u ? u[m] : void 0;
    b && (x.align = b);
    let T = { type: 'element', tagName: c, properties: x, children: [] };
    y && ((T.children = e.all(y)), e.patch(y, T), (T = e.applyData(y, T))),
      p.push(T);
  }
  const g = {
    type: 'element',
    tagName: 'tr',
    properties: {},
    children: e.wrap(p, !0),
  };
  return e.patch(i, g), e.applyData(i, g);
}
function aE(e, i) {
  const l = {
    type: 'element',
    tagName: 'td',
    properties: {},
    children: e.all(i),
  };
  return e.patch(i, l), e.applyData(i, l);
}
const Iy = 9,
  Xy = 32;
function rE(e) {
  const i = String(e),
    l = /\r?\n|\r/g;
  let r = l.exec(i),
    o = 0;
  const c = [];
  for (; r; )
    c.push(Qy(i.slice(o, r.index), o > 0, !0), r[0]),
      (o = r.index + r[0].length),
      (r = l.exec(i));
  return c.push(Qy(i.slice(o), o > 0, !1)), c.join('');
}
function Qy(e, i, l) {
  let r = 0,
    o = e.length;
  if (i) {
    let c = e.codePointAt(r);
    for (; c === Iy || c === Xy; ) r++, (c = e.codePointAt(r));
  }
  if (l) {
    let c = e.codePointAt(o - 1);
    for (; c === Iy || c === Xy; ) o--, (c = e.codePointAt(o - 1));
  }
  return o > r ? e.slice(r, o) : '';
}
function sE(e, i) {
  const l = { type: 'text', value: rE(String(i.value)) };
  return e.patch(i, l), e.applyData(i, l);
}
function oE(e, i) {
  const l = { type: 'element', tagName: 'hr', properties: {}, children: [] };
  return e.patch(i, l), e.applyData(i, l);
}
const uE = {
  blockquote: Vw,
  break: Uw,
  code: Hw,
  delete: qw,
  emphasis: Pw,
  footnoteReference: Gw,
  heading: Yw,
  html: Fw,
  imageReference: Iw,
  image: Xw,
  inlineCode: Qw,
  linkReference: Kw,
  link: Zw,
  listItem: Jw,
  list: Ww,
  paragraph: tE,
  root: eE,
  strong: nE,
  table: iE,
  tableCell: aE,
  tableRow: lE,
  text: sE,
  thematicBreak: oE,
  toml: $s,
  yaml: $s,
  definition: $s,
  footnoteDefinition: $s,
};
function $s() {}
const rv = -1,
  Ro = 0,
  dr = 1,
  vo = 2,
  Lh = 3,
  jh = 4,
  Bh = 5,
  Vh = 6,
  sv = 7,
  ov = 8,
  cE = typeof self == 'object' ? self : globalThis,
  Ky = (e, i) => {
    switch (e) {
      case 'Function':
      case 'SharedWorker':
      case 'Worker':
      case 'eval':
      case 'setInterval':
      case 'setTimeout':
        throw new TypeError('unable to deserialize ' + e);
    }
    return new cE[e](i);
  },
  fE = (e, i) => {
    const l = (o, c) => (e.set(c, o), o),
      r = (o) => {
        if (e.has(o)) return e.get(o);
        const [c, u] = i[o];
        switch (c) {
          case Ro:
          case rv:
            return l(u, o);
          case dr: {
            const h = l([], o);
            for (const m of u) h.push(r(m));
            return h;
          }
          case vo: {
            const h = l({}, o);
            for (const [m, p] of u) h[r(m)] = r(p);
            return h;
          }
          case Lh:
            return l(new Date(u), o);
          case jh: {
            const { source: h, flags: m } = u;
            return l(new RegExp(h, m), o);
          }
          case Bh: {
            const h = l(new Map(), o);
            for (const [m, p] of u) h.set(r(m), r(p));
            return h;
          }
          case Vh: {
            const h = l(new Set(), o);
            for (const m of u) h.add(r(m));
            return h;
          }
          case sv: {
            const { name: h, message: m } = u;
            return l(Ky(h, m), o);
          }
          case ov:
            return l(BigInt(u), o);
          case 'BigInt':
            return l(Object(BigInt(u)), o);
          case 'ArrayBuffer':
            return l(new Uint8Array(u).buffer, u);
          case 'DataView': {
            const { buffer: h } = new Uint8Array(u);
            return l(new DataView(h), u);
          }
        }
        return l(Ky(c, u), o);
      };
    return r;
  },
  Zy = (e) => fE(new Map(), e)(0),
  Ql = '',
  { toString: hE } = {},
  { keys: dE } = Object,
  or = (e) => {
    const i = typeof e;
    if (i !== 'object' || !e) return [Ro, i];
    const l = hE.call(e).slice(8, -1);
    switch (l) {
      case 'Array':
        return [dr, Ql];
      case 'Object':
        return [vo, Ql];
      case 'Date':
        return [Lh, Ql];
      case 'RegExp':
        return [jh, Ql];
      case 'Map':
        return [Bh, Ql];
      case 'Set':
        return [Vh, Ql];
      case 'DataView':
        return [dr, l];
    }
    return l.includes('Array')
      ? [dr, l]
      : l.includes('Error')
        ? [sv, l]
        : [vo, l];
  },
  Ws = ([e, i]) => e === Ro && (i === 'function' || i === 'symbol'),
  pE = (e, i, l, r) => {
    const o = (u, h) => {
        const m = r.push(u) - 1;
        return l.set(h, m), m;
      },
      c = (u) => {
        if (l.has(u)) return l.get(u);
        let [h, m] = or(u);
        switch (h) {
          case Ro: {
            let g = u;
            switch (m) {
              case 'bigint':
                (h = ov), (g = u.toString());
                break;
              case 'function':
              case 'symbol':
                if (e) throw new TypeError('unable to serialize ' + m);
                g = null;
                break;
              case 'undefined':
                return o([rv], u);
            }
            return o([h, g], u);
          }
          case dr: {
            if (m) {
              let x = u;
              return (
                m === 'DataView'
                  ? (x = new Uint8Array(u.buffer))
                  : m === 'ArrayBuffer' && (x = new Uint8Array(u)),
                o([m, [...x]], u)
              );
            }
            const g = [],
              y = o([h, g], u);
            for (const x of u) g.push(c(x));
            return y;
          }
          case vo: {
            if (m)
              switch (m) {
                case 'BigInt':
                  return o([m, u.toString()], u);
                case 'Boolean':
                case 'Number':
                case 'String':
                  return o([m, u.valueOf()], u);
              }
            if (i && 'toJSON' in u) return c(u.toJSON());
            const g = [],
              y = o([h, g], u);
            for (const x of dE(u))
              (e || !Ws(or(u[x]))) && g.push([c(x), c(u[x])]);
            return y;
          }
          case Lh:
            return o([h, u.toISOString()], u);
          case jh: {
            const { source: g, flags: y } = u;
            return o([h, { source: g, flags: y }], u);
          }
          case Bh: {
            const g = [],
              y = o([h, g], u);
            for (const [x, b] of u)
              (e || !(Ws(or(x)) || Ws(or(b)))) && g.push([c(x), c(b)]);
            return y;
          }
          case Vh: {
            const g = [],
              y = o([h, g], u);
            for (const x of u) (e || !Ws(or(x))) && g.push(c(x));
            return y;
          }
        }
        const { message: p } = u;
        return o([h, { name: m, message: p }], u);
      };
    return c;
  },
  Jy = (e, { json: i, lossy: l } = {}) => {
    const r = [];
    return pE(!(i || l), !!i, new Map(), r)(e), r;
  },
  xo =
    typeof structuredClone == 'function'
      ? (e, i) =>
          i && ('json' in i || 'lossy' in i) ? Zy(Jy(e, i)) : structuredClone(e)
      : (e, i) => Zy(Jy(e, i));
function mE(e, i) {
  const l = [{ type: 'text', value: '↩' }];
  return (
    i > 1 &&
      l.push({
        type: 'element',
        tagName: 'sup',
        properties: {},
        children: [{ type: 'text', value: String(i) }],
      }),
    l
  );
}
function gE(e, i) {
  return 'Back to reference ' + (e + 1) + (i > 1 ? '-' + i : '');
}
function yE(e) {
  const i =
      typeof e.options.clobberPrefix == 'string'
        ? e.options.clobberPrefix
        : 'user-content-',
    l = e.options.footnoteBackContent || mE,
    r = e.options.footnoteBackLabel || gE,
    o = e.options.footnoteLabel || 'Footnotes',
    c = e.options.footnoteLabelTagName || 'h2',
    u = e.options.footnoteLabelProperties || { className: ['sr-only'] },
    h = [];
  let m = -1;
  for (; ++m < e.footnoteOrder.length; ) {
    const p = e.footnoteById.get(e.footnoteOrder[m]);
    if (!p) continue;
    const g = e.all(p),
      y = String(p.identifier).toUpperCase(),
      x = ra(y.toLowerCase());
    let b = 0;
    const T = [],
      M = e.footnoteCounts.get(y);
    for (; M !== void 0 && ++b <= M; ) {
      T.length > 0 && T.push({ type: 'text', value: ' ' });
      let L = typeof l == 'string' ? l : l(m, b);
      typeof L == 'string' && (L = { type: 'text', value: L }),
        T.push({
          type: 'element',
          tagName: 'a',
          properties: {
            href: '#' + i + 'fnref-' + x + (b > 1 ? '-' + b : ''),
            dataFootnoteBackref: '',
            ariaLabel: typeof r == 'string' ? r : r(m, b),
            className: ['data-footnote-backref'],
          },
          children: Array.isArray(L) ? L : [L],
        });
    }
    const D = g[g.length - 1];
    if (D && D.type === 'element' && D.tagName === 'p') {
      const L = D.children[D.children.length - 1];
      L && L.type === 'text'
        ? (L.value += ' ')
        : D.children.push({ type: 'text', value: ' ' }),
        D.children.push(...T);
    } else g.push(...T);
    const E = {
      type: 'element',
      tagName: 'li',
      properties: { id: i + 'fn-' + x },
      children: e.wrap(g, !0),
    };
    e.patch(p, E), h.push(E);
  }
  if (h.length !== 0)
    return {
      type: 'element',
      tagName: 'section',
      properties: { dataFootnotes: !0, className: ['footnotes'] },
      children: [
        {
          type: 'element',
          tagName: c,
          properties: { ...xo(u), id: 'footnote-label' },
          children: [{ type: 'text', value: o }],
        },
        {
          type: 'text',
          value: `
`,
        },
        {
          type: 'element',
          tagName: 'ol',
          properties: {},
          children: e.wrap(h, !0),
        },
        {
          type: 'text',
          value: `
`,
        },
      ],
    };
}
const _o = function (e) {
  if (e == null) return SE;
  if (typeof e == 'function') return No(e);
  if (typeof e == 'object') return Array.isArray(e) ? vE(e) : xE(e);
  if (typeof e == 'string') return bE(e);
  throw new Error('Expected function, string, or object as test');
};
function vE(e) {
  const i = [];
  let l = -1;
  for (; ++l < e.length; ) i[l] = _o(e[l]);
  return No(r);
  function r(...o) {
    let c = -1;
    for (; ++c < i.length; ) if (i[c].apply(this, o)) return !0;
    return !1;
  }
}
function xE(e) {
  const i = e;
  return No(l);
  function l(r) {
    const o = r;
    let c;
    for (c in e) if (o[c] !== i[c]) return !1;
    return !0;
  }
}
function bE(e) {
  return No(i);
  function i(l) {
    return l && l.type === e;
  }
}
function No(e) {
  return i;
  function i(l, r, o) {
    return !!(
      TE(l) && e.call(this, l, typeof r == 'number' ? r : void 0, o || void 0)
    );
  }
}
function SE() {
  return !0;
}
function TE(e) {
  return e !== null && typeof e == 'object' && 'type' in e;
}
const uv = [],
  AE = !0,
  Xf = !1,
  wE = 'skip';
function cv(e, i, l, r) {
  let o;
  typeof i == 'function' && typeof l != 'function'
    ? ((r = l), (l = i))
    : (o = i);
  const c = _o(o),
    u = r ? -1 : 1;
  h(e, void 0, [])();
  function h(m, p, g) {
    const y = m && typeof m == 'object' ? m : {};
    if (typeof y.type == 'string') {
      const b =
        typeof y.tagName == 'string'
          ? y.tagName
          : typeof y.name == 'string'
            ? y.name
            : void 0;
      Object.defineProperty(x, 'name', {
        value: 'node (' + (m.type + (b ? '<' + b + '>' : '')) + ')',
      });
    }
    return x;
    function x() {
      let b = uv,
        T,
        M,
        D;
      if (
        (!i || c(m, p, g[g.length - 1] || void 0)) &&
        ((b = EE(l(m, g))), b[0] === Xf)
      )
        return b;
      if ('children' in m && m.children) {
        const E = m;
        if (E.children && b[0] !== wE)
          for (
            M = (r ? E.children.length : -1) + u, D = g.concat(E);
            M > -1 && M < E.children.length;

          ) {
            const L = E.children[M];
            if (((T = h(L, M, D)()), T[0] === Xf)) return T;
            M = typeof T[1] == 'number' ? T[1] : M + u;
          }
      }
      return b;
    }
  }
}
function EE(e) {
  return Array.isArray(e)
    ? e
    : typeof e == 'number'
      ? [AE, e]
      : e == null
        ? uv
        : [e];
}
function Uh(e, i, l, r) {
  let o, c, u;
  typeof i == 'function' && typeof l != 'function'
    ? ((c = void 0), (u = i), (o = l))
    : ((c = i), (u = l), (o = r)),
    cv(e, c, h, o);
  function h(m, p) {
    const g = p[p.length - 1],
      y = g ? g.children.indexOf(m) : void 0;
    return u(m, y, g);
  }
}
const Qf = {}.hasOwnProperty,
  kE = {};
function CE(e, i) {
  const l = i || kE,
    r = new Map(),
    o = new Map(),
    c = new Map(),
    u = { ...uE, ...l.handlers },
    h = {
      all: p,
      applyData: DE,
      definitionById: r,
      footnoteById: o,
      footnoteCounts: c,
      footnoteOrder: [],
      handlers: u,
      one: m,
      options: l,
      patch: ME,
      wrap: OE,
    };
  return (
    Uh(e, function (g) {
      if (g.type === 'definition' || g.type === 'footnoteDefinition') {
        const y = g.type === 'definition' ? r : o,
          x = String(g.identifier).toUpperCase();
        y.has(x) || y.set(x, g);
      }
    }),
    h
  );
  function m(g, y) {
    const x = g.type,
      b = h.handlers[x];
    if (Qf.call(h.handlers, x) && b) return b(h, g, y);
    if (h.options.passThrough && h.options.passThrough.includes(x)) {
      if ('children' in g) {
        const { children: M, ...D } = g,
          E = xo(D);
        return (E.children = h.all(g)), E;
      }
      return xo(g);
    }
    return (h.options.unknownHandler || zE)(h, g, y);
  }
  function p(g) {
    const y = [];
    if ('children' in g) {
      const x = g.children;
      let b = -1;
      for (; ++b < x.length; ) {
        const T = h.one(x[b], g);
        if (T) {
          if (
            b &&
            x[b - 1].type === 'break' &&
            (!Array.isArray(T) && T.type === 'text' && (T.value = $y(T.value)),
            !Array.isArray(T) && T.type === 'element')
          ) {
            const M = T.children[0];
            M && M.type === 'text' && (M.value = $y(M.value));
          }
          Array.isArray(T) ? y.push(...T) : y.push(T);
        }
      }
    }
    return y;
  }
}
function ME(e, i) {
  e.position && (i.position = m2(e));
}
function DE(e, i) {
  let l = i;
  if (e && e.data) {
    const r = e.data.hName,
      o = e.data.hChildren,
      c = e.data.hProperties;
    if (typeof r == 'string')
      if (l.type === 'element') l.tagName = r;
      else {
        const u = 'children' in l ? l.children : [l];
        l = { type: 'element', tagName: r, properties: {}, children: u };
      }
    l.type === 'element' && c && Object.assign(l.properties, xo(c)),
      'children' in l &&
        l.children &&
        o !== null &&
        o !== void 0 &&
        (l.children = o);
  }
  return l;
}
function zE(e, i) {
  const l = i.data || {},
    r =
      'value' in i && !(Qf.call(l, 'hProperties') || Qf.call(l, 'hChildren'))
        ? { type: 'text', value: i.value }
        : {
            type: 'element',
            tagName: 'div',
            properties: {},
            children: e.all(i),
          };
  return e.patch(i, r), e.applyData(i, r);
}
function OE(e, i) {
  const l = [];
  let r = -1;
  for (
    i &&
    l.push({
      type: 'text',
      value: `
`,
    });
    ++r < e.length;

  )
    r &&
      l.push({
        type: 'text',
        value: `
`,
      }),
      l.push(e[r]);
  return (
    i &&
      e.length > 0 &&
      l.push({
        type: 'text',
        value: `
`,
      }),
    l
  );
}
function $y(e) {
  let i = 0,
    l = e.charCodeAt(i);
  for (; l === 9 || l === 32; ) i++, (l = e.charCodeAt(i));
  return e.slice(i);
}
function Wy(e, i) {
  const l = CE(e, i),
    r = l.one(e, void 0),
    o = yE(l),
    c = Array.isArray(r)
      ? { type: 'root', children: r }
      : r || { type: 'root', children: [] };
  return (
    o &&
      c.children.push(
        {
          type: 'text',
          value: `
`,
        },
        o,
      ),
    c
  );
}
function RE(e, i) {
  return e && 'run' in e
    ? async function (l, r) {
        const o = Wy(l, { file: r, ...i });
        await e.run(o, r);
      }
    : function (l, r) {
        return Wy(l, { file: r, ...(e || i) });
      };
}
function t0(e) {
  if (e) throw e;
}
var df, e0;
function _E() {
  if (e0) return df;
  e0 = 1;
  var e = Object.prototype.hasOwnProperty,
    i = Object.prototype.toString,
    l = Object.defineProperty,
    r = Object.getOwnPropertyDescriptor,
    o = function (p) {
      return typeof Array.isArray == 'function'
        ? Array.isArray(p)
        : i.call(p) === '[object Array]';
    },
    c = function (p) {
      if (!p || i.call(p) !== '[object Object]') return !1;
      var g = e.call(p, 'constructor'),
        y =
          p.constructor &&
          p.constructor.prototype &&
          e.call(p.constructor.prototype, 'isPrototypeOf');
      if (p.constructor && !g && !y) return !1;
      var x;
      for (x in p);
      return typeof x > 'u' || e.call(p, x);
    },
    u = function (p, g) {
      l && g.name === '__proto__'
        ? l(p, g.name, {
            enumerable: !0,
            configurable: !0,
            value: g.newValue,
            writable: !0,
          })
        : (p[g.name] = g.newValue);
    },
    h = function (p, g) {
      if (g === '__proto__')
        if (e.call(p, g)) {
          if (r) return r(p, g).value;
        } else return;
      return p[g];
    };
  return (
    (df = function m() {
      var p,
        g,
        y,
        x,
        b,
        T,
        M = arguments[0],
        D = 1,
        E = arguments.length,
        L = !1;
      for (
        typeof M == 'boolean' && ((L = M), (M = arguments[1] || {}), (D = 2)),
          (M == null || (typeof M != 'object' && typeof M != 'function')) &&
            (M = {});
        D < E;
        ++D
      )
        if (((p = arguments[D]), p != null))
          for (g in p)
            (y = h(M, g)),
              (x = h(p, g)),
              M !== x &&
                (L && x && (c(x) || (b = o(x)))
                  ? (b
                      ? ((b = !1), (T = y && o(y) ? y : []))
                      : (T = y && c(y) ? y : {}),
                    u(M, { name: g, newValue: m(L, T, x) }))
                  : typeof x < 'u' && u(M, { name: g, newValue: x }));
      return M;
    }),
    df
  );
}
var NE = _E();
const pf = wh(NE);
function Kf(e) {
  if (typeof e != 'object' || e === null) return !1;
  const i = Object.getPrototypeOf(e);
  return (
    (i === null ||
      i === Object.prototype ||
      Object.getPrototypeOf(i) === null) &&
    !(Symbol.toStringTag in e) &&
    !(Symbol.iterator in e)
  );
}
function LE() {
  const e = [],
    i = { run: l, use: r };
  return i;
  function l(...o) {
    let c = -1;
    const u = o.pop();
    if (typeof u != 'function')
      throw new TypeError('Expected function as last argument, not ' + u);
    h(null, ...o);
    function h(m, ...p) {
      const g = e[++c];
      let y = -1;
      if (m) {
        u(m);
        return;
      }
      for (; ++y < o.length; )
        (p[y] === null || p[y] === void 0) && (p[y] = o[y]);
      (o = p), g ? jE(g, h)(...p) : u(null, ...p);
    }
  }
  function r(o) {
    if (typeof o != 'function')
      throw new TypeError('Expected `middelware` to be a function, not ' + o);
    return e.push(o), i;
  }
}
function jE(e, i) {
  let l;
  return r;
  function r(...u) {
    const h = e.length > u.length;
    let m;
    h && u.push(o);
    try {
      m = e.apply(this, u);
    } catch (p) {
      const g = p;
      if (h && l) throw g;
      return o(g);
    }
    h ||
      (m && m.then && typeof m.then == 'function'
        ? m.then(c, o)
        : m instanceof Error
          ? o(m)
          : c(m));
  }
  function o(u, ...h) {
    l || ((l = !0), i(u, ...h));
  }
  function c(u) {
    o(null, u);
  }
}
const En = { basename: BE, dirname: VE, extname: UE, join: HE, sep: '/' };
function BE(e, i) {
  if (i !== void 0 && typeof i != 'string')
    throw new TypeError('"ext" argument must be a string');
  Mr(e);
  let l = 0,
    r = -1,
    o = e.length,
    c;
  if (i === void 0 || i.length === 0 || i.length > e.length) {
    for (; o--; )
      if (e.codePointAt(o) === 47) {
        if (c) {
          l = o + 1;
          break;
        }
      } else r < 0 && ((c = !0), (r = o + 1));
    return r < 0 ? '' : e.slice(l, r);
  }
  if (i === e) return '';
  let u = -1,
    h = i.length - 1;
  for (; o--; )
    if (e.codePointAt(o) === 47) {
      if (c) {
        l = o + 1;
        break;
      }
    } else
      u < 0 && ((c = !0), (u = o + 1)),
        h > -1 &&
          (e.codePointAt(o) === i.codePointAt(h--)
            ? h < 0 && (r = o)
            : ((h = -1), (r = u)));
  return l === r ? (r = u) : r < 0 && (r = e.length), e.slice(l, r);
}
function VE(e) {
  if ((Mr(e), e.length === 0)) return '.';
  let i = -1,
    l = e.length,
    r;
  for (; --l; )
    if (e.codePointAt(l) === 47) {
      if (r) {
        i = l;
        break;
      }
    } else r || (r = !0);
  return i < 0
    ? e.codePointAt(0) === 47
      ? '/'
      : '.'
    : i === 1 && e.codePointAt(0) === 47
      ? '//'
      : e.slice(0, i);
}
function UE(e) {
  Mr(e);
  let i = e.length,
    l = -1,
    r = 0,
    o = -1,
    c = 0,
    u;
  for (; i--; ) {
    const h = e.codePointAt(i);
    if (h === 47) {
      if (u) {
        r = i + 1;
        break;
      }
      continue;
    }
    l < 0 && ((u = !0), (l = i + 1)),
      h === 46 ? (o < 0 ? (o = i) : c !== 1 && (c = 1)) : o > -1 && (c = -1);
  }
  return o < 0 || l < 0 || c === 0 || (c === 1 && o === l - 1 && o === r + 1)
    ? ''
    : e.slice(o, l);
}
function HE(...e) {
  let i = -1,
    l;
  for (; ++i < e.length; )
    Mr(e[i]), e[i] && (l = l === void 0 ? e[i] : l + '/' + e[i]);
  return l === void 0 ? '.' : qE(l);
}
function qE(e) {
  Mr(e);
  const i = e.codePointAt(0) === 47;
  let l = PE(e, !i);
  return (
    l.length === 0 && !i && (l = '.'),
    l.length > 0 && e.codePointAt(e.length - 1) === 47 && (l += '/'),
    i ? '/' + l : l
  );
}
function PE(e, i) {
  let l = '',
    r = 0,
    o = -1,
    c = 0,
    u = -1,
    h,
    m;
  for (; ++u <= e.length; ) {
    if (u < e.length) h = e.codePointAt(u);
    else {
      if (h === 47) break;
      h = 47;
    }
    if (h === 47) {
      if (!(o === u - 1 || c === 1))
        if (o !== u - 1 && c === 2) {
          if (
            l.length < 2 ||
            r !== 2 ||
            l.codePointAt(l.length - 1) !== 46 ||
            l.codePointAt(l.length - 2) !== 46
          ) {
            if (l.length > 2) {
              if (((m = l.lastIndexOf('/')), m !== l.length - 1)) {
                m < 0
                  ? ((l = ''), (r = 0))
                  : ((l = l.slice(0, m)),
                    (r = l.length - 1 - l.lastIndexOf('/'))),
                  (o = u),
                  (c = 0);
                continue;
              }
            } else if (l.length > 0) {
              (l = ''), (r = 0), (o = u), (c = 0);
              continue;
            }
          }
          i && ((l = l.length > 0 ? l + '/..' : '..'), (r = 2));
        } else
          l.length > 0
            ? (l += '/' + e.slice(o + 1, u))
            : (l = e.slice(o + 1, u)),
            (r = u - o - 1);
      (o = u), (c = 0);
    } else h === 46 && c > -1 ? c++ : (c = -1);
  }
  return l;
}
function Mr(e) {
  if (typeof e != 'string')
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(e));
}
const GE = { cwd: YE };
function YE() {
  return '/';
}
function Zf(e) {
  return !!(
    e !== null &&
    typeof e == 'object' &&
    'href' in e &&
    e.href &&
    'protocol' in e &&
    e.protocol &&
    e.auth === void 0
  );
}
function FE(e) {
  if (typeof e == 'string') e = new URL(e);
  else if (!Zf(e)) {
    const i = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' +
        e +
        '`',
    );
    throw ((i.code = 'ERR_INVALID_ARG_TYPE'), i);
  }
  if (e.protocol !== 'file:') {
    const i = new TypeError('The URL must be of scheme file');
    throw ((i.code = 'ERR_INVALID_URL_SCHEME'), i);
  }
  return IE(e);
}
function IE(e) {
  if (e.hostname !== '') {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin',
    );
    throw ((r.code = 'ERR_INVALID_FILE_URL_HOST'), r);
  }
  const i = e.pathname;
  let l = -1;
  for (; ++l < i.length; )
    if (i.codePointAt(l) === 37 && i.codePointAt(l + 1) === 50) {
      const r = i.codePointAt(l + 2);
      if (r === 70 || r === 102) {
        const o = new TypeError(
          'File URL path must not include encoded / characters',
        );
        throw ((o.code = 'ERR_INVALID_FILE_URL_PATH'), o);
      }
    }
  return decodeURIComponent(i);
}
const mf = ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];
class fv {
  constructor(i) {
    let l;
    i
      ? Zf(i)
        ? (l = { path: i })
        : typeof i == 'string' || XE(i)
          ? (l = { value: i })
          : (l = i)
      : (l = {}),
      (this.cwd = 'cwd' in l ? '' : GE.cwd()),
      (this.data = {}),
      (this.history = []),
      (this.messages = []),
      this.value,
      this.map,
      this.result,
      this.stored;
    let r = -1;
    for (; ++r < mf.length; ) {
      const c = mf[r];
      c in l &&
        l[c] !== void 0 &&
        l[c] !== null &&
        (this[c] = c === 'history' ? [...l[c]] : l[c]);
    }
    let o;
    for (o in l) mf.includes(o) || (this[o] = l[o]);
  }
  get basename() {
    return typeof this.path == 'string' ? En.basename(this.path) : void 0;
  }
  set basename(i) {
    yf(i, 'basename'),
      gf(i, 'basename'),
      (this.path = En.join(this.dirname || '', i));
  }
  get dirname() {
    return typeof this.path == 'string' ? En.dirname(this.path) : void 0;
  }
  set dirname(i) {
    n0(this.basename, 'dirname'), (this.path = En.join(i || '', this.basename));
  }
  get extname() {
    return typeof this.path == 'string' ? En.extname(this.path) : void 0;
  }
  set extname(i) {
    if ((gf(i, 'extname'), n0(this.dirname, 'extname'), i)) {
      if (i.codePointAt(0) !== 46)
        throw new Error('`extname` must start with `.`');
      if (i.includes('.', 1))
        throw new Error('`extname` cannot contain multiple dots');
    }
    this.path = En.join(this.dirname, this.stem + (i || ''));
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(i) {
    Zf(i) && (i = FE(i)),
      yf(i, 'path'),
      this.path !== i && this.history.push(i);
  }
  get stem() {
    return typeof this.path == 'string'
      ? En.basename(this.path, this.extname)
      : void 0;
  }
  set stem(i) {
    yf(i, 'stem'),
      gf(i, 'stem'),
      (this.path = En.join(this.dirname || '', i + (this.extname || '')));
  }
  fail(i, l, r) {
    const o = this.message(i, l, r);
    throw ((o.fatal = !0), o);
  }
  info(i, l, r) {
    const o = this.message(i, l, r);
    return (o.fatal = void 0), o;
  }
  message(i, l, r) {
    const o = new we(i, l, r);
    return (
      this.path && ((o.name = this.path + ':' + o.name), (o.file = this.path)),
      (o.fatal = !1),
      this.messages.push(o),
      o
    );
  }
  toString(i) {
    return this.value === void 0
      ? ''
      : typeof this.value == 'string'
        ? this.value
        : new TextDecoder(i || void 0).decode(this.value);
  }
}
function gf(e, i) {
  if (e && e.includes(En.sep))
    throw new Error(
      '`' + i + '` cannot be a path: did not expect `' + En.sep + '`',
    );
}
function yf(e, i) {
  if (!e) throw new Error('`' + i + '` cannot be empty');
}
function n0(e, i) {
  if (!e) throw new Error('Setting `' + i + '` requires `path` to be set too');
}
function XE(e) {
  return !!(
    e &&
    typeof e == 'object' &&
    'byteLength' in e &&
    'byteOffset' in e
  );
}
const QE = function (e) {
    const r = this.constructor.prototype,
      o = r[e],
      c = function () {
        return o.apply(c, arguments);
      };
    return Object.setPrototypeOf(c, r), c;
  },
  KE = {}.hasOwnProperty;
class Hh extends QE {
  constructor() {
    super('copy'),
      (this.Compiler = void 0),
      (this.Parser = void 0),
      (this.attachers = []),
      (this.compiler = void 0),
      (this.freezeIndex = -1),
      (this.frozen = void 0),
      (this.namespace = {}),
      (this.parser = void 0),
      (this.transformers = LE());
  }
  copy() {
    const i = new Hh();
    let l = -1;
    for (; ++l < this.attachers.length; ) {
      const r = this.attachers[l];
      i.use(...r);
    }
    return i.data(pf(!0, {}, this.namespace)), i;
  }
  data(i, l) {
    return typeof i == 'string'
      ? arguments.length === 2
        ? (bf('data', this.frozen), (this.namespace[i] = l), this)
        : (KE.call(this.namespace, i) && this.namespace[i]) || void 0
      : i
        ? (bf('data', this.frozen), (this.namespace = i), this)
        : this.namespace;
  }
  freeze() {
    if (this.frozen) return this;
    const i = this;
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [l, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1) continue;
      r[0] === !0 && (r[0] = void 0);
      const o = l.call(i, ...r);
      typeof o == 'function' && this.transformers.use(o);
    }
    return (
      (this.frozen = !0), (this.freezeIndex = Number.POSITIVE_INFINITY), this
    );
  }
  parse(i) {
    this.freeze();
    const l = to(i),
      r = this.parser || this.Parser;
    return vf('parse', r), r(String(l), l);
  }
  process(i, l) {
    const r = this;
    return (
      this.freeze(),
      vf('process', this.parser || this.Parser),
      xf('process', this.compiler || this.Compiler),
      l ? o(void 0, l) : new Promise(o)
    );
    function o(c, u) {
      const h = to(i),
        m = r.parse(h);
      r.run(m, h, function (g, y, x) {
        if (g || !y || !x) return p(g);
        const b = y,
          T = r.stringify(b, x);
        $E(T) ? (x.value = T) : (x.result = T), p(g, x);
      });
      function p(g, y) {
        g || !y ? u(g) : c ? c(y) : l(void 0, y);
      }
    }
  }
  processSync(i) {
    let l = !1,
      r;
    return (
      this.freeze(),
      vf('processSync', this.parser || this.Parser),
      xf('processSync', this.compiler || this.Compiler),
      this.process(i, o),
      l0('processSync', 'process', l),
      r
    );
    function o(c, u) {
      (l = !0), t0(c), (r = u);
    }
  }
  run(i, l, r) {
    i0(i), this.freeze();
    const o = this.transformers;
    return (
      !r && typeof l == 'function' && ((r = l), (l = void 0)),
      r ? c(void 0, r) : new Promise(c)
    );
    function c(u, h) {
      const m = to(l);
      o.run(i, m, p);
      function p(g, y, x) {
        const b = y || i;
        g ? h(g) : u ? u(b) : r(void 0, b, x);
      }
    }
  }
  runSync(i, l) {
    let r = !1,
      o;
    return this.run(i, l, c), l0('runSync', 'run', r), o;
    function c(u, h) {
      t0(u), (o = h), (r = !0);
    }
  }
  stringify(i, l) {
    this.freeze();
    const r = to(l),
      o = this.compiler || this.Compiler;
    return xf('stringify', o), i0(i), o(i, r);
  }
  use(i, ...l) {
    const r = this.attachers,
      o = this.namespace;
    if ((bf('use', this.frozen), i != null))
      if (typeof i == 'function') m(i, l);
      else if (typeof i == 'object') Array.isArray(i) ? h(i) : u(i);
      else throw new TypeError('Expected usable value, not `' + i + '`');
    return this;
    function c(p) {
      if (typeof p == 'function') m(p, []);
      else if (typeof p == 'object')
        if (Array.isArray(p)) {
          const [g, ...y] = p;
          m(g, y);
        } else u(p);
      else throw new TypeError('Expected usable value, not `' + p + '`');
    }
    function u(p) {
      if (!('plugins' in p) && !('settings' in p))
        throw new Error(
          'Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither',
        );
      h(p.plugins), p.settings && (o.settings = pf(!0, o.settings, p.settings));
    }
    function h(p) {
      let g = -1;
      if (p != null)
        if (Array.isArray(p))
          for (; ++g < p.length; ) {
            const y = p[g];
            c(y);
          }
        else throw new TypeError('Expected a list of plugins, not `' + p + '`');
    }
    function m(p, g) {
      let y = -1,
        x = -1;
      for (; ++y < r.length; )
        if (r[y][0] === p) {
          x = y;
          break;
        }
      if (x === -1) r.push([p, ...g]);
      else if (g.length > 0) {
        let [b, ...T] = g;
        const M = r[x][1];
        Kf(M) && Kf(b) && (b = pf(!0, M, b)), (r[x] = [p, b, ...T]);
      }
    }
  }
}
const ZE = new Hh().freeze();
function vf(e, i) {
  if (typeof i != 'function')
    throw new TypeError('Cannot `' + e + '` without `parser`');
}
function xf(e, i) {
  if (typeof i != 'function')
    throw new TypeError('Cannot `' + e + '` without `compiler`');
}
function bf(e, i) {
  if (i)
    throw new Error(
      'Cannot call `' +
        e +
        '` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.',
    );
}
function i0(e) {
  if (!Kf(e) || typeof e.type != 'string')
    throw new TypeError('Expected node, got `' + e + '`');
}
function l0(e, i, l) {
  if (!l)
    throw new Error('`' + e + '` finished async. Use `' + i + '` instead');
}
function to(e) {
  return JE(e) ? e : new fv(e);
}
function JE(e) {
  return !!(e && typeof e == 'object' && 'message' in e && 'messages' in e);
}
function $E(e) {
  return typeof e == 'string' || WE(e);
}
function WE(e) {
  return !!(
    e &&
    typeof e == 'object' &&
    'byteLength' in e &&
    'byteOffset' in e
  );
}
const tk = 'https://github.com/remarkjs/react-markdown/blob/main/changelog.md',
  a0 = [],
  r0 = { allowDangerousHtml: !0 },
  ek = /^(https?|ircs?|mailto|xmpp)$/i,
  nk = [
    { from: 'astPlugins', id: 'remove-buggy-html-in-markdown-parser' },
    { from: 'allowDangerousHtml', id: 'remove-buggy-html-in-markdown-parser' },
    {
      from: 'allowNode',
      id: 'replace-allownode-allowedtypes-and-disallowedtypes',
      to: 'allowElement',
    },
    {
      from: 'allowedTypes',
      id: 'replace-allownode-allowedtypes-and-disallowedtypes',
      to: 'allowedElements',
    },
    { from: 'className', id: 'remove-classname' },
    {
      from: 'disallowedTypes',
      id: 'replace-allownode-allowedtypes-and-disallowedtypes',
      to: 'disallowedElements',
    },
    { from: 'escapeHtml', id: 'remove-buggy-html-in-markdown-parser' },
    { from: 'includeElementIndex', id: '#remove-includeelementindex' },
    {
      from: 'includeNodeIndex',
      id: 'change-includenodeindex-to-includeelementindex',
    },
    { from: 'linkTarget', id: 'remove-linktarget' },
    {
      from: 'plugins',
      id: 'change-plugins-to-remarkplugins',
      to: 'remarkPlugins',
    },
    { from: 'rawSourcePos', id: '#remove-rawsourcepos' },
    {
      from: 'renderers',
      id: 'change-renderers-to-components',
      to: 'components',
    },
    { from: 'source', id: 'change-source-to-children', to: 'children' },
    { from: 'sourcePos', id: '#remove-sourcepos' },
    { from: 'transformImageUri', id: '#add-urltransform', to: 'urlTransform' },
    { from: 'transformLinkUri', id: '#add-urltransform', to: 'urlTransform' },
  ];
function ik(e) {
  const i = lk(e),
    l = ak(e);
  return rk(i.runSync(i.parse(l), l), e);
}
function lk(e) {
  const i = e.rehypePlugins || a0,
    l = e.remarkPlugins || a0,
    r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...r0 } : r0;
  return ZE().use(Bw).use(l).use(RE, r).use(i);
}
function ak(e) {
  const i = e.children || '',
    l = new fv();
  return typeof i == 'string' && (l.value = i), l;
}
function rk(e, i) {
  const l = i.allowedElements,
    r = i.allowElement,
    o = i.components,
    c = i.disallowedElements,
    u = i.skipHtml,
    h = i.unwrapDisallowed,
    m = i.urlTransform || sk;
  for (const g of nk)
    Object.hasOwn(i, g.from) &&
      ('' +
        g.from +
        (g.to ? 'use `' + g.to + '` instead' : 'remove it') +
        tk +
        g.id,
      void 0);
  return (
    Uh(e, p),
    b2(e, {
      Fragment: H.Fragment,
      components: o,
      ignoreInvalidStyle: !0,
      jsx: H.jsx,
      jsxs: H.jsxs,
      passKeys: !0,
      passNode: !0,
    })
  );
  function p(g, y, x) {
    if (g.type === 'raw' && x && typeof y == 'number')
      return (
        u
          ? x.children.splice(y, 1)
          : (x.children[y] = { type: 'text', value: g.value }),
        y
      );
    if (g.type === 'element') {
      let b;
      for (b in cf)
        if (Object.hasOwn(cf, b) && Object.hasOwn(g.properties, b)) {
          const T = g.properties[b],
            M = cf[b];
          (M === null || M.includes(g.tagName)) &&
            (g.properties[b] = m(String(T || ''), b, g));
        }
    }
    if (g.type === 'element') {
      let b = l ? !l.includes(g.tagName) : c ? c.includes(g.tagName) : !1;
      if (
        (!b && r && typeof y == 'number' && (b = !r(g, y, x)),
        b && x && typeof y == 'number')
      )
        return (
          h && g.children
            ? x.children.splice(y, 1, ...g.children)
            : x.children.splice(y, 1),
          y
        );
    }
  }
}
function sk(e) {
  const i = e.indexOf(':'),
    l = e.indexOf('?'),
    r = e.indexOf('#'),
    o = e.indexOf('/');
  return i === -1 ||
    (o !== -1 && i > o) ||
    (l !== -1 && i > l) ||
    (r !== -1 && i > r) ||
    ek.test(e.slice(0, i))
    ? e
    : '';
}
function s0(e, i) {
  const l = String(e);
  if (typeof i != 'string') throw new TypeError('Expected character');
  let r = 0,
    o = l.indexOf(i);
  for (; o !== -1; ) r++, (o = l.indexOf(i, o + i.length));
  return r;
}
function ok(e) {
  if (typeof e != 'string') throw new TypeError('Expected a string');
  return e.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}
function uk(e, i, l) {
  const o = _o((l || {}).ignore || []),
    c = ck(i);
  let u = -1;
  for (; ++u < c.length; ) cv(e, 'text', h);
  function h(p, g) {
    let y = -1,
      x;
    for (; ++y < g.length; ) {
      const b = g[y],
        T = x ? x.children : void 0;
      if (o(b, T ? T.indexOf(b) : void 0, x)) return;
      x = b;
    }
    if (x) return m(p, g);
  }
  function m(p, g) {
    const y = g[g.length - 1],
      x = c[u][0],
      b = c[u][1];
    let T = 0;
    const D = y.children.indexOf(p);
    let E = !1,
      L = [];
    x.lastIndex = 0;
    let R = x.exec(p.value);
    for (; R; ) {
      const Y = R.index,
        Q = { index: R.index, input: R.input, stack: [...g, p] };
      let V = b(...R, Q);
      if (
        (typeof V == 'string' &&
          (V = V.length > 0 ? { type: 'text', value: V } : void 0),
        V === !1
          ? (x.lastIndex = Y + 1)
          : (T !== Y && L.push({ type: 'text', value: p.value.slice(T, Y) }),
            Array.isArray(V) ? L.push(...V) : V && L.push(V),
            (T = Y + R[0].length),
            (E = !0)),
        !x.global)
      )
        break;
      R = x.exec(p.value);
    }
    return (
      E
        ? (T < p.value.length &&
            L.push({ type: 'text', value: p.value.slice(T) }),
          y.children.splice(D, 1, ...L))
        : (L = [p]),
      D + L.length
    );
  }
}
function ck(e) {
  const i = [];
  if (!Array.isArray(e))
    throw new TypeError('Expected find and replace tuple or list of tuples');
  const l = !e[0] || Array.isArray(e[0]) ? e : [e];
  let r = -1;
  for (; ++r < l.length; ) {
    const o = l[r];
    i.push([fk(o[0]), hk(o[1])]);
  }
  return i;
}
function fk(e) {
  return typeof e == 'string' ? new RegExp(ok(e), 'g') : e;
}
function hk(e) {
  return typeof e == 'function'
    ? e
    : function () {
        return e;
      };
}
const Sf = 'phrasing',
  Tf = ['autolink', 'link', 'image', 'label'];
function dk() {
  return {
    transforms: [bk],
    enter: {
      literalAutolink: mk,
      literalAutolinkEmail: Af,
      literalAutolinkHttp: Af,
      literalAutolinkWww: Af,
    },
    exit: {
      literalAutolink: xk,
      literalAutolinkEmail: vk,
      literalAutolinkHttp: gk,
      literalAutolinkWww: yk,
    },
  };
}
function pk() {
  return {
    unsafe: [
      {
        character: '@',
        before: '[+\\-.\\w]',
        after: '[\\-.\\w]',
        inConstruct: Sf,
        notInConstruct: Tf,
      },
      {
        character: '.',
        before: '[Ww]',
        after: '[\\-.\\w]',
        inConstruct: Sf,
        notInConstruct: Tf,
      },
      {
        character: ':',
        before: '[ps]',
        after: '\\/',
        inConstruct: Sf,
        notInConstruct: Tf,
      },
    ],
  };
}
function mk(e) {
  this.enter({ type: 'link', title: null, url: '', children: [] }, e);
}
function Af(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function gk(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function yk(e) {
  this.config.exit.data.call(this, e);
  const i = this.stack[this.stack.length - 1];
  i.type, (i.url = 'http://' + this.sliceSerialize(e));
}
function vk(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function xk(e) {
  this.exit(e);
}
function bk(e) {
  uk(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Sk],
      [
        new RegExp(
          '(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)',
          'gu',
        ),
        Tk,
      ],
    ],
    { ignore: ['link', 'linkReference'] },
  );
}
function Sk(e, i, l, r, o) {
  let c = '';
  if (
    !hv(o) ||
    (/^w/i.test(i) && ((l = i + l), (i = ''), (c = 'http://')), !Ak(l))
  )
    return !1;
  const u = wk(l + r);
  if (!u[0]) return !1;
  const h = {
    type: 'link',
    title: null,
    url: c + i + u[0],
    children: [{ type: 'text', value: i + u[0] }],
  };
  return u[1] ? [h, { type: 'text', value: u[1] }] : h;
}
function Tk(e, i, l, r) {
  return !hv(r, !0) || /[-\d_]$/.test(l)
    ? !1
    : {
        type: 'link',
        title: null,
        url: 'mailto:' + i + '@' + l,
        children: [{ type: 'text', value: i + '@' + l }],
      };
}
function Ak(e) {
  const i = e.split('.');
  return !(
    i.length < 2 ||
    (i[i.length - 1] &&
      (/_/.test(i[i.length - 1]) || !/[a-zA-Z\d]/.test(i[i.length - 1]))) ||
    (i[i.length - 2] &&
      (/_/.test(i[i.length - 2]) || !/[a-zA-Z\d]/.test(i[i.length - 2])))
  );
}
function wk(e) {
  const i = /[!"&'),.:;<>?\]}]+$/.exec(e);
  if (!i) return [e, void 0];
  e = e.slice(0, i.index);
  let l = i[0],
    r = l.indexOf(')');
  const o = s0(e, '(');
  let c = s0(e, ')');
  for (; r !== -1 && o > c; )
    (e += l.slice(0, r + 1)), (l = l.slice(r + 1)), (r = l.indexOf(')')), c++;
  return [e, l];
}
function hv(e, i) {
  const l = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || il(l) || zo(l)) && (!i || l !== 47);
}
dv.peek = _k;
function Ek() {
  this.buffer();
}
function kk(e) {
  this.enter({ type: 'footnoteReference', identifier: '', label: '' }, e);
}
function Ck() {
  this.buffer();
}
function Mk(e) {
  this.enter(
    { type: 'footnoteDefinition', identifier: '', label: '', children: [] },
    e,
  );
}
function Dk(e) {
  const i = this.resume(),
    l = this.stack[this.stack.length - 1];
  l.type,
    (l.identifier = xn(this.sliceSerialize(e)).toLowerCase()),
    (l.label = i);
}
function zk(e) {
  this.exit(e);
}
function Ok(e) {
  const i = this.resume(),
    l = this.stack[this.stack.length - 1];
  l.type,
    (l.identifier = xn(this.sliceSerialize(e)).toLowerCase()),
    (l.label = i);
}
function Rk(e) {
  this.exit(e);
}
function _k() {
  return '[';
}
function dv(e, i, l, r) {
  const o = l.createTracker(r);
  let c = o.move('[^');
  const u = l.enter('footnoteReference'),
    h = l.enter('reference');
  return (
    (c += o.move(l.safe(l.associationId(e), { after: ']', before: c }))),
    h(),
    u(),
    (c += o.move(']')),
    c
  );
}
function Nk() {
  return {
    enter: {
      gfmFootnoteCallString: Ek,
      gfmFootnoteCall: kk,
      gfmFootnoteDefinitionLabelString: Ck,
      gfmFootnoteDefinition: Mk,
    },
    exit: {
      gfmFootnoteCallString: Dk,
      gfmFootnoteCall: zk,
      gfmFootnoteDefinitionLabelString: Ok,
      gfmFootnoteDefinition: Rk,
    },
  };
}
function Lk(e) {
  let i = !1;
  return (
    e && e.firstLineBlank && (i = !0),
    {
      handlers: { footnoteDefinition: l, footnoteReference: dv },
      unsafe: [
        { character: '[', inConstruct: ['label', 'phrasing', 'reference'] },
      ],
    }
  );
  function l(r, o, c, u) {
    const h = c.createTracker(u);
    let m = h.move('[^');
    const p = c.enter('footnoteDefinition'),
      g = c.enter('label');
    return (
      (m += h.move(c.safe(c.associationId(r), { before: m, after: ']' }))),
      g(),
      (m += h.move(']:')),
      r.children &&
        r.children.length > 0 &&
        (h.shift(4),
        (m += h.move(
          (i
            ? `
`
            : ' ') +
            c.indentLines(c.containerFlow(r, h.current()), i ? pv : jk),
        ))),
      p(),
      m
    );
  }
}
function jk(e, i, l) {
  return i === 0 ? e : pv(e, i, l);
}
function pv(e, i, l) {
  return (l ? '' : '    ') + e;
}
const Bk = [
  'autolink',
  'destinationLiteral',
  'destinationRaw',
  'reference',
  'titleQuote',
  'titleApostrophe',
];
mv.peek = Pk;
function Vk() {
  return {
    canContainEols: ['delete'],
    enter: { strikethrough: Hk },
    exit: { strikethrough: qk },
  };
}
function Uk() {
  return {
    unsafe: [{ character: '~', inConstruct: 'phrasing', notInConstruct: Bk }],
    handlers: { delete: mv },
  };
}
function Hk(e) {
  this.enter({ type: 'delete', children: [] }, e);
}
function qk(e) {
  this.exit(e);
}
function mv(e, i, l, r) {
  const o = l.createTracker(r),
    c = l.enter('strikethrough');
  let u = o.move('~~');
  return (
    (u += l.containerPhrasing(e, { ...o.current(), before: u, after: '~' })),
    (u += o.move('~~')),
    c(),
    u
  );
}
function Pk() {
  return '~';
}
function Gk(e) {
  return e.length;
}
function Yk(e, i) {
  const l = i || {},
    r = (l.align || []).concat(),
    o = l.stringLength || Gk,
    c = [],
    u = [],
    h = [],
    m = [];
  let p = 0,
    g = -1;
  for (; ++g < e.length; ) {
    const M = [],
      D = [];
    let E = -1;
    for (e[g].length > p && (p = e[g].length); ++E < e[g].length; ) {
      const L = Fk(e[g][E]);
      if (l.alignDelimiters !== !1) {
        const R = o(L);
        (D[E] = R), (m[E] === void 0 || R > m[E]) && (m[E] = R);
      }
      M.push(L);
    }
    (u[g] = M), (h[g] = D);
  }
  let y = -1;
  if (typeof r == 'object' && 'length' in r) for (; ++y < p; ) c[y] = o0(r[y]);
  else {
    const M = o0(r);
    for (; ++y < p; ) c[y] = M;
  }
  y = -1;
  const x = [],
    b = [];
  for (; ++y < p; ) {
    const M = c[y];
    let D = '',
      E = '';
    M === 99
      ? ((D = ':'), (E = ':'))
      : M === 108
        ? (D = ':')
        : M === 114 && (E = ':');
    let L =
      l.alignDelimiters === !1 ? 1 : Math.max(1, m[y] - D.length - E.length);
    const R = D + '-'.repeat(L) + E;
    l.alignDelimiters !== !1 &&
      ((L = D.length + L + E.length), L > m[y] && (m[y] = L), (b[y] = L)),
      (x[y] = R);
  }
  u.splice(1, 0, x), h.splice(1, 0, b), (g = -1);
  const T = [];
  for (; ++g < u.length; ) {
    const M = u[g],
      D = h[g];
    y = -1;
    const E = [];
    for (; ++y < p; ) {
      const L = M[y] || '';
      let R = '',
        Y = '';
      if (l.alignDelimiters !== !1) {
        const Q = m[y] - (D[y] || 0),
          V = c[y];
        V === 114
          ? (R = ' '.repeat(Q))
          : V === 99
            ? Q % 2
              ? ((R = ' '.repeat(Q / 2 + 0.5)), (Y = ' '.repeat(Q / 2 - 0.5)))
              : ((R = ' '.repeat(Q / 2)), (Y = R))
            : (Y = ' '.repeat(Q));
      }
      l.delimiterStart !== !1 && !y && E.push('|'),
        l.padding !== !1 &&
          !(l.alignDelimiters === !1 && L === '') &&
          (l.delimiterStart !== !1 || y) &&
          E.push(' '),
        l.alignDelimiters !== !1 && E.push(R),
        E.push(L),
        l.alignDelimiters !== !1 && E.push(Y),
        l.padding !== !1 && E.push(' '),
        (l.delimiterEnd !== !1 || y !== p - 1) && E.push('|');
    }
    T.push(l.delimiterEnd === !1 ? E.join('').replace(/ +$/, '') : E.join(''));
  }
  return T.join(`
`);
}
function Fk(e) {
  return e == null ? '' : String(e);
}
function o0(e) {
  const i = typeof e == 'string' ? e.codePointAt(0) : 0;
  return i === 67 || i === 99
    ? 99
    : i === 76 || i === 108
      ? 108
      : i === 82 || i === 114
        ? 114
        : 0;
}
function Ik(e, i, l, r) {
  const o = l.enter('blockquote'),
    c = l.createTracker(r);
  c.move('> '), c.shift(2);
  const u = l.indentLines(l.containerFlow(e, c.current()), Xk);
  return o(), u;
}
function Xk(e, i, l) {
  return '>' + (l ? '' : ' ') + e;
}
function Qk(e, i) {
  return u0(e, i.inConstruct, !0) && !u0(e, i.notInConstruct, !1);
}
function u0(e, i, l) {
  if ((typeof i == 'string' && (i = [i]), !i || i.length === 0)) return l;
  let r = -1;
  for (; ++r < i.length; ) if (e.includes(i[r])) return !0;
  return !1;
}
function c0(e, i, l, r) {
  let o = -1;
  for (; ++o < l.unsafe.length; )
    if (
      l.unsafe[o].character ===
        `
` &&
      Qk(l.stack, l.unsafe[o])
    )
      return /[ \t]/.test(r.before) ? '' : ' ';
  return `\\
`;
}
function Kk(e, i) {
  const l = String(e);
  let r = l.indexOf(i),
    o = r,
    c = 0,
    u = 0;
  if (typeof i != 'string') throw new TypeError('Expected substring');
  for (; r !== -1; )
    r === o ? ++c > u && (u = c) : (c = 1),
      (o = r + i.length),
      (r = l.indexOf(i, o));
  return u;
}
function Zk(e, i) {
  return !!(
    i.options.fences === !1 &&
    e.value &&
    !e.lang &&
    /[^ \r\n]/.test(e.value) &&
    !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value)
  );
}
function Jk(e) {
  const i = e.options.fence || '`';
  if (i !== '`' && i !== '~')
    throw new Error(
      'Cannot serialize code with `' +
        i +
        '` for `options.fence`, expected `` ` `` or `~`',
    );
  return i;
}
function $k(e, i, l, r) {
  const o = Jk(l),
    c = e.value || '',
    u = o === '`' ? 'GraveAccent' : 'Tilde';
  if (Zk(e, l)) {
    const y = l.enter('codeIndented'),
      x = l.indentLines(c, Wk);
    return y(), x;
  }
  const h = l.createTracker(r),
    m = o.repeat(Math.max(Kk(c, o) + 1, 3)),
    p = l.enter('codeFenced');
  let g = h.move(m);
  if (e.lang) {
    const y = l.enter(`codeFencedLang${u}`);
    (g += h.move(
      l.safe(e.lang, { before: g, after: ' ', encode: ['`'], ...h.current() }),
    )),
      y();
  }
  if (e.lang && e.meta) {
    const y = l.enter(`codeFencedMeta${u}`);
    (g += h.move(' ')),
      (g += h.move(
        l.safe(e.meta, {
          before: g,
          after: `
`,
          encode: ['`'],
          ...h.current(),
        }),
      )),
      y();
  }
  return (
    (g += h.move(`
`)),
    c &&
      (g += h.move(
        c +
          `
`,
      )),
    (g += h.move(m)),
    p(),
    g
  );
}
function Wk(e, i, l) {
  return (l ? '' : '    ') + e;
}
function qh(e) {
  const i = e.options.quote || '"';
  if (i !== '"' && i !== "'")
    throw new Error(
      'Cannot serialize title with `' +
        i +
        '` for `options.quote`, expected `"`, or `\'`',
    );
  return i;
}
function tC(e, i, l, r) {
  const o = qh(l),
    c = o === '"' ? 'Quote' : 'Apostrophe',
    u = l.enter('definition');
  let h = l.enter('label');
  const m = l.createTracker(r);
  let p = m.move('[');
  return (
    (p += m.move(
      l.safe(l.associationId(e), { before: p, after: ']', ...m.current() }),
    )),
    (p += m.move(']: ')),
    h(),
    !e.url || /[\0- \u007F]/.test(e.url)
      ? ((h = l.enter('destinationLiteral')),
        (p += m.move('<')),
        (p += m.move(l.safe(e.url, { before: p, after: '>', ...m.current() }))),
        (p += m.move('>')))
      : ((h = l.enter('destinationRaw')),
        (p += m.move(
          l.safe(e.url, {
            before: p,
            after: e.title
              ? ' '
              : `
`,
            ...m.current(),
          }),
        ))),
    h(),
    e.title &&
      ((h = l.enter(`title${c}`)),
      (p += m.move(' ' + o)),
      (p += m.move(l.safe(e.title, { before: p, after: o, ...m.current() }))),
      (p += m.move(o)),
      h()),
    u(),
    p
  );
}
function eC(e) {
  const i = e.options.emphasis || '*';
  if (i !== '*' && i !== '_')
    throw new Error(
      'Cannot serialize emphasis with `' +
        i +
        '` for `options.emphasis`, expected `*`, or `_`',
    );
  return i;
}
function Sr(e) {
  return '&#x' + e.toString(16).toUpperCase() + ';';
}
function bo(e, i, l) {
  const r = na(e),
    o = na(i);
  return r === void 0
    ? o === void 0
      ? l === '_'
        ? { inside: !0, outside: !0 }
        : { inside: !1, outside: !1 }
      : o === 1
        ? { inside: !0, outside: !0 }
        : { inside: !1, outside: !0 }
    : r === 1
      ? o === void 0
        ? { inside: !1, outside: !1 }
        : o === 1
          ? { inside: !0, outside: !0 }
          : { inside: !1, outside: !1 }
      : o === void 0
        ? { inside: !1, outside: !1 }
        : o === 1
          ? { inside: !0, outside: !1 }
          : { inside: !1, outside: !1 };
}
gv.peek = nC;
function gv(e, i, l, r) {
  const o = eC(l),
    c = l.enter('emphasis'),
    u = l.createTracker(r),
    h = u.move(o);
  let m = u.move(
    l.containerPhrasing(e, { after: o, before: h, ...u.current() }),
  );
  const p = m.charCodeAt(0),
    g = bo(r.before.charCodeAt(r.before.length - 1), p, o);
  g.inside && (m = Sr(p) + m.slice(1));
  const y = m.charCodeAt(m.length - 1),
    x = bo(r.after.charCodeAt(0), y, o);
  x.inside && (m = m.slice(0, -1) + Sr(y));
  const b = u.move(o);
  return (
    c(),
    (l.attentionEncodeSurroundingInfo = {
      after: x.outside,
      before: g.outside,
    }),
    h + m + b
  );
}
function nC(e, i, l) {
  return l.options.emphasis || '*';
}
function iC(e, i) {
  let l = !1;
  return (
    Uh(e, function (r) {
      if (('value' in r && /\r?\n|\r/.test(r.value)) || r.type === 'break')
        return (l = !0), Xf;
    }),
    !!((!e.depth || e.depth < 3) && Rh(e) && (i.options.setext || l))
  );
}
function lC(e, i, l, r) {
  const o = Math.max(Math.min(6, e.depth || 1), 1),
    c = l.createTracker(r);
  if (iC(e, l)) {
    const g = l.enter('headingSetext'),
      y = l.enter('phrasing'),
      x = l.containerPhrasing(e, {
        ...c.current(),
        before: `
`,
        after: `
`,
      });
    return (
      y(),
      g(),
      x +
        `
` +
        (o === 1 ? '=' : '-').repeat(
          x.length -
            (Math.max(
              x.lastIndexOf('\r'),
              x.lastIndexOf(`
`),
            ) +
              1),
        )
    );
  }
  const u = '#'.repeat(o),
    h = l.enter('headingAtx'),
    m = l.enter('phrasing');
  c.move(u + ' ');
  let p = l.containerPhrasing(e, {
    before: '# ',
    after: `
`,
    ...c.current(),
  });
  return (
    /^[\t ]/.test(p) && (p = Sr(p.charCodeAt(0)) + p.slice(1)),
    (p = p ? u + ' ' + p : u),
    l.options.closeAtx && (p += ' ' + u),
    m(),
    h(),
    p
  );
}
yv.peek = aC;
function yv(e) {
  return e.value || '';
}
function aC() {
  return '<';
}
vv.peek = rC;
function vv(e, i, l, r) {
  const o = qh(l),
    c = o === '"' ? 'Quote' : 'Apostrophe',
    u = l.enter('image');
  let h = l.enter('label');
  const m = l.createTracker(r);
  let p = m.move('![');
  return (
    (p += m.move(l.safe(e.alt, { before: p, after: ']', ...m.current() }))),
    (p += m.move('](')),
    h(),
    (!e.url && e.title) || /[\0- \u007F]/.test(e.url)
      ? ((h = l.enter('destinationLiteral')),
        (p += m.move('<')),
        (p += m.move(l.safe(e.url, { before: p, after: '>', ...m.current() }))),
        (p += m.move('>')))
      : ((h = l.enter('destinationRaw')),
        (p += m.move(
          l.safe(e.url, {
            before: p,
            after: e.title ? ' ' : ')',
            ...m.current(),
          }),
        ))),
    h(),
    e.title &&
      ((h = l.enter(`title${c}`)),
      (p += m.move(' ' + o)),
      (p += m.move(l.safe(e.title, { before: p, after: o, ...m.current() }))),
      (p += m.move(o)),
      h()),
    (p += m.move(')')),
    u(),
    p
  );
}
function rC() {
  return '!';
}
xv.peek = sC;
function xv(e, i, l, r) {
  const o = e.referenceType,
    c = l.enter('imageReference');
  let u = l.enter('label');
  const h = l.createTracker(r);
  let m = h.move('![');
  const p = l.safe(e.alt, { before: m, after: ']', ...h.current() });
  (m += h.move(p + '][')), u();
  const g = l.stack;
  (l.stack = []), (u = l.enter('reference'));
  const y = l.safe(l.associationId(e), {
    before: m,
    after: ']',
    ...h.current(),
  });
  return (
    u(),
    (l.stack = g),
    c(),
    o === 'full' || !p || p !== y
      ? (m += h.move(y + ']'))
      : o === 'shortcut'
        ? (m = m.slice(0, -1))
        : (m += h.move(']')),
    m
  );
}
function sC() {
  return '!';
}
bv.peek = oC;
function bv(e, i, l) {
  let r = e.value || '',
    o = '`',
    c = -1;
  for (; new RegExp('(^|[^`])' + o + '([^`]|$)').test(r); ) o += '`';
  for (
    /[^ \r\n]/.test(r) &&
    ((/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r)) || /^`|`$/.test(r)) &&
    (r = ' ' + r + ' ');
    ++c < l.unsafe.length;

  ) {
    const u = l.unsafe[c],
      h = l.compilePattern(u);
    let m;
    if (u.atBreak)
      for (; (m = h.exec(r)); ) {
        let p = m.index;
        r.charCodeAt(p) === 10 && r.charCodeAt(p - 1) === 13 && p--,
          (r = r.slice(0, p) + ' ' + r.slice(m.index + 1));
      }
  }
  return o + r + o;
}
function oC() {
  return '`';
}
function Sv(e, i) {
  const l = Rh(e);
  return !!(
    !i.options.resourceLink &&
    e.url &&
    !e.title &&
    e.children &&
    e.children.length === 1 &&
    e.children[0].type === 'text' &&
    (l === e.url || 'mailto:' + l === e.url) &&
    /^[a-z][a-z+.-]+:/i.test(e.url) &&
    !/[\0- <>\u007F]/.test(e.url)
  );
}
Tv.peek = uC;
function Tv(e, i, l, r) {
  const o = qh(l),
    c = o === '"' ? 'Quote' : 'Apostrophe',
    u = l.createTracker(r);
  let h, m;
  if (Sv(e, l)) {
    const g = l.stack;
    (l.stack = []), (h = l.enter('autolink'));
    let y = u.move('<');
    return (
      (y += u.move(
        l.containerPhrasing(e, { before: y, after: '>', ...u.current() }),
      )),
      (y += u.move('>')),
      h(),
      (l.stack = g),
      y
    );
  }
  (h = l.enter('link')), (m = l.enter('label'));
  let p = u.move('[');
  return (
    (p += u.move(
      l.containerPhrasing(e, { before: p, after: '](', ...u.current() }),
    )),
    (p += u.move('](')),
    m(),
    (!e.url && e.title) || /[\0- \u007F]/.test(e.url)
      ? ((m = l.enter('destinationLiteral')),
        (p += u.move('<')),
        (p += u.move(l.safe(e.url, { before: p, after: '>', ...u.current() }))),
        (p += u.move('>')))
      : ((m = l.enter('destinationRaw')),
        (p += u.move(
          l.safe(e.url, {
            before: p,
            after: e.title ? ' ' : ')',
            ...u.current(),
          }),
        ))),
    m(),
    e.title &&
      ((m = l.enter(`title${c}`)),
      (p += u.move(' ' + o)),
      (p += u.move(l.safe(e.title, { before: p, after: o, ...u.current() }))),
      (p += u.move(o)),
      m()),
    (p += u.move(')')),
    h(),
    p
  );
}
function uC(e, i, l) {
  return Sv(e, l) ? '<' : '[';
}
Av.peek = cC;
function Av(e, i, l, r) {
  const o = e.referenceType,
    c = l.enter('linkReference');
  let u = l.enter('label');
  const h = l.createTracker(r);
  let m = h.move('[');
  const p = l.containerPhrasing(e, { before: m, after: ']', ...h.current() });
  (m += h.move(p + '][')), u();
  const g = l.stack;
  (l.stack = []), (u = l.enter('reference'));
  const y = l.safe(l.associationId(e), {
    before: m,
    after: ']',
    ...h.current(),
  });
  return (
    u(),
    (l.stack = g),
    c(),
    o === 'full' || !p || p !== y
      ? (m += h.move(y + ']'))
      : o === 'shortcut'
        ? (m = m.slice(0, -1))
        : (m += h.move(']')),
    m
  );
}
function cC() {
  return '[';
}
function Ph(e) {
  const i = e.options.bullet || '*';
  if (i !== '*' && i !== '+' && i !== '-')
    throw new Error(
      'Cannot serialize items with `' +
        i +
        '` for `options.bullet`, expected `*`, `+`, or `-`',
    );
  return i;
}
function fC(e) {
  const i = Ph(e),
    l = e.options.bulletOther;
  if (!l) return i === '*' ? '-' : '*';
  if (l !== '*' && l !== '+' && l !== '-')
    throw new Error(
      'Cannot serialize items with `' +
        l +
        '` for `options.bulletOther`, expected `*`, `+`, or `-`',
    );
  if (l === i)
    throw new Error(
      'Expected `bullet` (`' +
        i +
        '`) and `bulletOther` (`' +
        l +
        '`) to be different',
    );
  return l;
}
function hC(e) {
  const i = e.options.bulletOrdered || '.';
  if (i !== '.' && i !== ')')
    throw new Error(
      'Cannot serialize items with `' +
        i +
        '` for `options.bulletOrdered`, expected `.` or `)`',
    );
  return i;
}
function wv(e) {
  const i = e.options.rule || '*';
  if (i !== '*' && i !== '-' && i !== '_')
    throw new Error(
      'Cannot serialize rules with `' +
        i +
        '` for `options.rule`, expected `*`, `-`, or `_`',
    );
  return i;
}
function dC(e, i, l, r) {
  const o = l.enter('list'),
    c = l.bulletCurrent;
  let u = e.ordered ? hC(l) : Ph(l);
  const h = e.ordered ? (u === '.' ? ')' : '.') : fC(l);
  let m = i && l.bulletLastUsed ? u === l.bulletLastUsed : !1;
  if (!e.ordered) {
    const g = e.children ? e.children[0] : void 0;
    if (
      ((u === '*' || u === '-') &&
        g &&
        (!g.children || !g.children[0]) &&
        l.stack[l.stack.length - 1] === 'list' &&
        l.stack[l.stack.length - 2] === 'listItem' &&
        l.stack[l.stack.length - 3] === 'list' &&
        l.stack[l.stack.length - 4] === 'listItem' &&
        l.indexStack[l.indexStack.length - 1] === 0 &&
        l.indexStack[l.indexStack.length - 2] === 0 &&
        l.indexStack[l.indexStack.length - 3] === 0 &&
        (m = !0),
      wv(l) === u && g)
    ) {
      let y = -1;
      for (; ++y < e.children.length; ) {
        const x = e.children[y];
        if (
          x &&
          x.type === 'listItem' &&
          x.children &&
          x.children[0] &&
          x.children[0].type === 'thematicBreak'
        ) {
          m = !0;
          break;
        }
      }
    }
  }
  m && (u = h), (l.bulletCurrent = u);
  const p = l.containerFlow(e, r);
  return (l.bulletLastUsed = u), (l.bulletCurrent = c), o(), p;
}
function pC(e) {
  const i = e.options.listItemIndent || 'one';
  if (i !== 'tab' && i !== 'one' && i !== 'mixed')
    throw new Error(
      'Cannot serialize items with `' +
        i +
        '` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`',
    );
  return i;
}
function mC(e, i, l, r) {
  const o = pC(l);
  let c = l.bulletCurrent || Ph(l);
  i &&
    i.type === 'list' &&
    i.ordered &&
    (c =
      (typeof i.start == 'number' && i.start > -1 ? i.start : 1) +
      (l.options.incrementListMarker === !1 ? 0 : i.children.indexOf(e)) +
      c);
  let u = c.length + 1;
  (o === 'tab' ||
    (o === 'mixed' && ((i && i.type === 'list' && i.spread) || e.spread))) &&
    (u = Math.ceil(u / 4) * 4);
  const h = l.createTracker(r);
  h.move(c + ' '.repeat(u - c.length)), h.shift(u);
  const m = l.enter('listItem'),
    p = l.indentLines(l.containerFlow(e, h.current()), g);
  return m(), p;
  function g(y, x, b) {
    return x
      ? (b ? '' : ' '.repeat(u)) + y
      : (b ? c : c + ' '.repeat(u - c.length)) + y;
  }
}
function gC(e, i, l, r) {
  const o = l.enter('paragraph'),
    c = l.enter('phrasing'),
    u = l.containerPhrasing(e, r);
  return c(), o(), u;
}
const yC = _o([
  'break',
  'delete',
  'emphasis',
  'footnote',
  'footnoteReference',
  'image',
  'imageReference',
  'inlineCode',
  'inlineMath',
  'link',
  'linkReference',
  'mdxJsxTextElement',
  'mdxTextExpression',
  'strong',
  'text',
  'textDirective',
]);
function vC(e, i, l, r) {
  return (
    e.children.some(function (u) {
      return yC(u);
    })
      ? l.containerPhrasing
      : l.containerFlow
  ).call(l, e, r);
}
function xC(e) {
  const i = e.options.strong || '*';
  if (i !== '*' && i !== '_')
    throw new Error(
      'Cannot serialize strong with `' +
        i +
        '` for `options.strong`, expected `*`, or `_`',
    );
  return i;
}
Ev.peek = bC;
function Ev(e, i, l, r) {
  const o = xC(l),
    c = l.enter('strong'),
    u = l.createTracker(r),
    h = u.move(o + o);
  let m = u.move(
    l.containerPhrasing(e, { after: o, before: h, ...u.current() }),
  );
  const p = m.charCodeAt(0),
    g = bo(r.before.charCodeAt(r.before.length - 1), p, o);
  g.inside && (m = Sr(p) + m.slice(1));
  const y = m.charCodeAt(m.length - 1),
    x = bo(r.after.charCodeAt(0), y, o);
  x.inside && (m = m.slice(0, -1) + Sr(y));
  const b = u.move(o + o);
  return (
    c(),
    (l.attentionEncodeSurroundingInfo = {
      after: x.outside,
      before: g.outside,
    }),
    h + m + b
  );
}
function bC(e, i, l) {
  return l.options.strong || '*';
}
function SC(e, i, l, r) {
  return l.safe(e.value, r);
}
function TC(e) {
  const i = e.options.ruleRepetition || 3;
  if (i < 3)
    throw new Error(
      'Cannot serialize rules with repetition `' +
        i +
        '` for `options.ruleRepetition`, expected `3` or more',
    );
  return i;
}
function AC(e, i, l) {
  const r = (wv(l) + (l.options.ruleSpaces ? ' ' : '')).repeat(TC(l));
  return l.options.ruleSpaces ? r.slice(0, -1) : r;
}
const kv = {
  blockquote: Ik,
  break: c0,
  code: $k,
  definition: tC,
  emphasis: gv,
  hardBreak: c0,
  heading: lC,
  html: yv,
  image: vv,
  imageReference: xv,
  inlineCode: bv,
  link: Tv,
  linkReference: Av,
  list: dC,
  listItem: mC,
  paragraph: gC,
  root: vC,
  strong: Ev,
  text: SC,
  thematicBreak: AC,
};
function wC() {
  return {
    enter: { table: EC, tableData: f0, tableHeader: f0, tableRow: CC },
    exit: {
      codeText: MC,
      table: kC,
      tableData: wf,
      tableHeader: wf,
      tableRow: wf,
    },
  };
}
function EC(e) {
  const i = e._align;
  this.enter(
    {
      type: 'table',
      align: i.map(function (l) {
        return l === 'none' ? null : l;
      }),
      children: [],
    },
    e,
  ),
    (this.data.inTable = !0);
}
function kC(e) {
  this.exit(e), (this.data.inTable = void 0);
}
function CC(e) {
  this.enter({ type: 'tableRow', children: [] }, e);
}
function wf(e) {
  this.exit(e);
}
function f0(e) {
  this.enter({ type: 'tableCell', children: [] }, e);
}
function MC(e) {
  let i = this.resume();
  this.data.inTable && (i = i.replace(/\\([\\|])/g, DC));
  const l = this.stack[this.stack.length - 1];
  l.type, (l.value = i), this.exit(e);
}
function DC(e, i) {
  return i === '|' ? i : e;
}
function zC(e) {
  const i = e || {},
    l = i.tableCellPadding,
    r = i.tablePipeAlign,
    o = i.stringLength,
    c = l ? ' ' : '|';
  return {
    unsafe: [
      { character: '\r', inConstruct: 'tableCell' },
      {
        character: `
`,
        inConstruct: 'tableCell',
      },
      { atBreak: !0, character: '|', after: '[	 :-]' },
      { character: '|', inConstruct: 'tableCell' },
      { atBreak: !0, character: ':', after: '-' },
      { atBreak: !0, character: '-', after: '[:|-]' },
    ],
    handlers: { inlineCode: x, table: u, tableCell: m, tableRow: h },
  };
  function u(b, T, M, D) {
    return p(g(b, M, D), b.align);
  }
  function h(b, T, M, D) {
    const E = y(b, M, D),
      L = p([E]);
    return L.slice(
      0,
      L.indexOf(`
`),
    );
  }
  function m(b, T, M, D) {
    const E = M.enter('tableCell'),
      L = M.enter('phrasing'),
      R = M.containerPhrasing(b, { ...D, before: c, after: c });
    return L(), E(), R;
  }
  function p(b, T) {
    return Yk(b, { align: T, alignDelimiters: r, padding: l, stringLength: o });
  }
  function g(b, T, M) {
    const D = b.children;
    let E = -1;
    const L = [],
      R = T.enter('table');
    for (; ++E < D.length; ) L[E] = y(D[E], T, M);
    return R(), L;
  }
  function y(b, T, M) {
    const D = b.children;
    let E = -1;
    const L = [],
      R = T.enter('tableRow');
    for (; ++E < D.length; ) L[E] = m(D[E], b, T, M);
    return R(), L;
  }
  function x(b, T, M) {
    let D = kv.inlineCode(b, T, M);
    return M.stack.includes('tableCell') && (D = D.replace(/\|/g, '\\$&')), D;
  }
}
function OC() {
  return {
    exit: {
      taskListCheckValueChecked: h0,
      taskListCheckValueUnchecked: h0,
      paragraph: _C,
    },
  };
}
function RC() {
  return {
    unsafe: [{ atBreak: !0, character: '-', after: '[:|-]' }],
    handlers: { listItem: NC },
  };
}
function h0(e) {
  const i = this.stack[this.stack.length - 2];
  i.type, (i.checked = e.type === 'taskListCheckValueChecked');
}
function _C(e) {
  const i = this.stack[this.stack.length - 2];
  if (i && i.type === 'listItem' && typeof i.checked == 'boolean') {
    const l = this.stack[this.stack.length - 1];
    l.type;
    const r = l.children[0];
    if (r && r.type === 'text') {
      const o = i.children;
      let c = -1,
        u;
      for (; ++c < o.length; ) {
        const h = o[c];
        if (h.type === 'paragraph') {
          u = h;
          break;
        }
      }
      u === l &&
        ((r.value = r.value.slice(1)),
        r.value.length === 0
          ? l.children.shift()
          : l.position &&
            r.position &&
            typeof r.position.start.offset == 'number' &&
            (r.position.start.column++,
            r.position.start.offset++,
            (l.position.start = Object.assign({}, r.position.start))));
    }
  }
  this.exit(e);
}
function NC(e, i, l, r) {
  const o = e.children[0],
    c = typeof e.checked == 'boolean' && o && o.type === 'paragraph',
    u = '[' + (e.checked ? 'x' : ' ') + '] ',
    h = l.createTracker(r);
  c && h.move(u);
  let m = kv.listItem(e, i, l, { ...r, ...h.current() });
  return c && (m = m.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, p)), m;
  function p(g) {
    return g + u;
  }
}
function LC() {
  return [dk(), Nk(), Vk(), wC(), OC()];
}
function jC(e) {
  return { extensions: [pk(), Lk(e), Uk(), zC(e), RC()] };
}
const BC = { tokenize: GC, partial: !0 },
  Cv = { tokenize: YC, partial: !0 },
  Mv = { tokenize: FC, partial: !0 },
  Dv = { tokenize: IC, partial: !0 },
  VC = { tokenize: XC, partial: !0 },
  zv = { name: 'wwwAutolink', tokenize: qC, previous: Rv },
  Ov = { name: 'protocolAutolink', tokenize: PC, previous: _v },
  $n = { name: 'emailAutolink', tokenize: HC, previous: Nv },
  zn = {};
function UC() {
  return { text: zn };
}
let Zi = 48;
for (; Zi < 123; )
  (zn[Zi] = $n), Zi++, Zi === 58 ? (Zi = 65) : Zi === 91 && (Zi = 97);
zn[43] = $n;
zn[45] = $n;
zn[46] = $n;
zn[95] = $n;
zn[72] = [$n, Ov];
zn[104] = [$n, Ov];
zn[87] = [$n, zv];
zn[119] = [$n, zv];
function HC(e, i, l) {
  const r = this;
  let o, c;
  return u;
  function u(y) {
    return !Jf(y) || !Nv.call(r, r.previous) || Gh(r.events)
      ? l(y)
      : (e.enter('literalAutolink'), e.enter('literalAutolinkEmail'), h(y));
  }
  function h(y) {
    return Jf(y) ? (e.consume(y), h) : y === 64 ? (e.consume(y), m) : l(y);
  }
  function m(y) {
    return y === 46
      ? e.check(VC, g, p)(y)
      : y === 45 || y === 95 || Ae(y)
        ? ((c = !0), e.consume(y), m)
        : g(y);
  }
  function p(y) {
    return e.consume(y), (o = !0), m;
  }
  function g(y) {
    return c && o && Me(r.previous)
      ? (e.exit('literalAutolinkEmail'), e.exit('literalAutolink'), i(y))
      : l(y);
  }
}
function qC(e, i, l) {
  const r = this;
  return o;
  function o(u) {
    return (u !== 87 && u !== 119) || !Rv.call(r, r.previous) || Gh(r.events)
      ? l(u)
      : (e.enter('literalAutolink'),
        e.enter('literalAutolinkWww'),
        e.check(BC, e.attempt(Cv, e.attempt(Mv, c), l), l)(u));
  }
  function c(u) {
    return e.exit('literalAutolinkWww'), e.exit('literalAutolink'), i(u);
  }
}
function PC(e, i, l) {
  const r = this;
  let o = '',
    c = !1;
  return u;
  function u(y) {
    return (y === 72 || y === 104) && _v.call(r, r.previous) && !Gh(r.events)
      ? (e.enter('literalAutolink'),
        e.enter('literalAutolinkHttp'),
        (o += String.fromCodePoint(y)),
        e.consume(y),
        h)
      : l(y);
  }
  function h(y) {
    if (Me(y) && o.length < 5)
      return (o += String.fromCodePoint(y)), e.consume(y), h;
    if (y === 58) {
      const x = o.toLowerCase();
      if (x === 'http' || x === 'https') return e.consume(y), m;
    }
    return l(y);
  }
  function m(y) {
    return y === 47 ? (e.consume(y), c ? p : ((c = !0), m)) : l(y);
  }
  function p(y) {
    return y === null || yo(y) || Ft(y) || il(y) || zo(y)
      ? l(y)
      : e.attempt(Cv, e.attempt(Mv, g), l)(y);
  }
  function g(y) {
    return e.exit('literalAutolinkHttp'), e.exit('literalAutolink'), i(y);
  }
}
function GC(e, i, l) {
  let r = 0;
  return o;
  function o(u) {
    return (u === 87 || u === 119) && r < 3
      ? (r++, e.consume(u), o)
      : u === 46 && r === 3
        ? (e.consume(u), c)
        : l(u);
  }
  function c(u) {
    return u === null ? l(u) : i(u);
  }
}
function YC(e, i, l) {
  let r, o, c;
  return u;
  function u(p) {
    return p === 46 || p === 95
      ? e.check(Dv, m, h)(p)
      : p === null || Ft(p) || il(p) || (p !== 45 && zo(p))
        ? m(p)
        : ((c = !0), e.consume(p), u);
  }
  function h(p) {
    return p === 95 ? (r = !0) : ((o = r), (r = void 0)), e.consume(p), u;
  }
  function m(p) {
    return o || r || !c ? l(p) : i(p);
  }
}
function FC(e, i) {
  let l = 0,
    r = 0;
  return o;
  function o(u) {
    return u === 40
      ? (l++, e.consume(u), o)
      : u === 41 && r < l
        ? c(u)
        : u === 33 ||
            u === 34 ||
            u === 38 ||
            u === 39 ||
            u === 41 ||
            u === 42 ||
            u === 44 ||
            u === 46 ||
            u === 58 ||
            u === 59 ||
            u === 60 ||
            u === 63 ||
            u === 93 ||
            u === 95 ||
            u === 126
          ? e.check(Dv, i, c)(u)
          : u === null || Ft(u) || il(u)
            ? i(u)
            : (e.consume(u), o);
  }
  function c(u) {
    return u === 41 && r++, e.consume(u), o;
  }
}
function IC(e, i, l) {
  return r;
  function r(h) {
    return h === 33 ||
      h === 34 ||
      h === 39 ||
      h === 41 ||
      h === 42 ||
      h === 44 ||
      h === 46 ||
      h === 58 ||
      h === 59 ||
      h === 63 ||
      h === 95 ||
      h === 126
      ? (e.consume(h), r)
      : h === 38
        ? (e.consume(h), c)
        : h === 93
          ? (e.consume(h), o)
          : h === 60 || h === null || Ft(h) || il(h)
            ? i(h)
            : l(h);
  }
  function o(h) {
    return h === null || h === 40 || h === 91 || Ft(h) || il(h) ? i(h) : r(h);
  }
  function c(h) {
    return Me(h) ? u(h) : l(h);
  }
  function u(h) {
    return h === 59 ? (e.consume(h), r) : Me(h) ? (e.consume(h), u) : l(h);
  }
}
function XC(e, i, l) {
  return r;
  function r(c) {
    return e.consume(c), o;
  }
  function o(c) {
    return Ae(c) ? l(c) : i(c);
  }
}
function Rv(e) {
  return (
    e === null ||
    e === 40 ||
    e === 42 ||
    e === 95 ||
    e === 91 ||
    e === 93 ||
    e === 126 ||
    Ft(e)
  );
}
function _v(e) {
  return !Me(e);
}
function Nv(e) {
  return !(e === 47 || Jf(e));
}
function Jf(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || Ae(e);
}
function Gh(e) {
  let i = e.length,
    l = !1;
  for (; i--; ) {
    const r = e[i][1];
    if ((r.type === 'labelLink' || r.type === 'labelImage') && !r._balanced) {
      l = !0;
      break;
    }
    if (r._gfmAutolinkLiteralWalkedInto) {
      l = !1;
      break;
    }
  }
  return (
    e.length > 0 &&
      !l &&
      (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0),
    l
  );
}
const QC = { tokenize: nM, partial: !0 };
function KC() {
  return {
    document: {
      91: {
        name: 'gfmFootnoteDefinition',
        tokenize: WC,
        continuation: { tokenize: tM },
        exit: eM,
      },
    },
    text: {
      91: { name: 'gfmFootnoteCall', tokenize: $C },
      93: {
        name: 'gfmPotentialFootnoteCall',
        add: 'after',
        tokenize: ZC,
        resolveTo: JC,
      },
    },
  };
}
function ZC(e, i, l) {
  const r = this;
  let o = r.events.length;
  const c = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let u;
  for (; o--; ) {
    const m = r.events[o][1];
    if (m.type === 'labelImage') {
      u = m;
      break;
    }
    if (
      m.type === 'gfmFootnoteCall' ||
      m.type === 'labelLink' ||
      m.type === 'label' ||
      m.type === 'image' ||
      m.type === 'link'
    )
      break;
  }
  return h;
  function h(m) {
    if (!u || !u._balanced) return l(m);
    const p = xn(r.sliceSerialize({ start: u.end, end: r.now() }));
    return p.codePointAt(0) !== 94 || !c.includes(p.slice(1))
      ? l(m)
      : (e.enter('gfmFootnoteCallLabelMarker'),
        e.consume(m),
        e.exit('gfmFootnoteCallLabelMarker'),
        i(m));
  }
}
function JC(e, i) {
  let l = e.length;
  for (; l--; )
    if (e[l][1].type === 'labelImage' && e[l][0] === 'enter') {
      e[l][1];
      break;
    }
  (e[l + 1][1].type = 'data'),
    (e[l + 3][1].type = 'gfmFootnoteCallLabelMarker');
  const r = {
      type: 'gfmFootnoteCall',
      start: Object.assign({}, e[l + 3][1].start),
      end: Object.assign({}, e[e.length - 1][1].end),
    },
    o = {
      type: 'gfmFootnoteCallMarker',
      start: Object.assign({}, e[l + 3][1].end),
      end: Object.assign({}, e[l + 3][1].end),
    };
  o.end.column++, o.end.offset++, o.end._bufferIndex++;
  const c = {
      type: 'gfmFootnoteCallString',
      start: Object.assign({}, o.end),
      end: Object.assign({}, e[e.length - 1][1].start),
    },
    u = {
      type: 'chunkString',
      contentType: 'string',
      start: Object.assign({}, c.start),
      end: Object.assign({}, c.end),
    },
    h = [
      e[l + 1],
      e[l + 2],
      ['enter', r, i],
      e[l + 3],
      e[l + 4],
      ['enter', o, i],
      ['exit', o, i],
      ['enter', c, i],
      ['enter', u, i],
      ['exit', u, i],
      ['exit', c, i],
      e[e.length - 2],
      e[e.length - 1],
      ['exit', r, i],
    ];
  return e.splice(l, e.length - l + 1, ...h), e;
}
function $C(e, i, l) {
  const r = this,
    o = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let c = 0,
    u;
  return h;
  function h(y) {
    return (
      e.enter('gfmFootnoteCall'),
      e.enter('gfmFootnoteCallLabelMarker'),
      e.consume(y),
      e.exit('gfmFootnoteCallLabelMarker'),
      m
    );
  }
  function m(y) {
    return y !== 94
      ? l(y)
      : (e.enter('gfmFootnoteCallMarker'),
        e.consume(y),
        e.exit('gfmFootnoteCallMarker'),
        e.enter('gfmFootnoteCallString'),
        (e.enter('chunkString').contentType = 'string'),
        p);
  }
  function p(y) {
    if (c > 999 || (y === 93 && !u) || y === null || y === 91 || Ft(y))
      return l(y);
    if (y === 93) {
      e.exit('chunkString');
      const x = e.exit('gfmFootnoteCallString');
      return o.includes(xn(r.sliceSerialize(x)))
        ? (e.enter('gfmFootnoteCallLabelMarker'),
          e.consume(y),
          e.exit('gfmFootnoteCallLabelMarker'),
          e.exit('gfmFootnoteCall'),
          i)
        : l(y);
    }
    return Ft(y) || (u = !0), c++, e.consume(y), y === 92 ? g : p;
  }
  function g(y) {
    return y === 91 || y === 92 || y === 93 ? (e.consume(y), c++, p) : p(y);
  }
}
function WC(e, i, l) {
  const r = this,
    o = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let c,
    u = 0,
    h;
  return m;
  function m(T) {
    return (
      (e.enter('gfmFootnoteDefinition')._container = !0),
      e.enter('gfmFootnoteDefinitionLabel'),
      e.enter('gfmFootnoteDefinitionLabelMarker'),
      e.consume(T),
      e.exit('gfmFootnoteDefinitionLabelMarker'),
      p
    );
  }
  function p(T) {
    return T === 94
      ? (e.enter('gfmFootnoteDefinitionMarker'),
        e.consume(T),
        e.exit('gfmFootnoteDefinitionMarker'),
        e.enter('gfmFootnoteDefinitionLabelString'),
        (e.enter('chunkString').contentType = 'string'),
        g)
      : l(T);
  }
  function g(T) {
    if (u > 999 || (T === 93 && !h) || T === null || T === 91 || Ft(T))
      return l(T);
    if (T === 93) {
      e.exit('chunkString');
      const M = e.exit('gfmFootnoteDefinitionLabelString');
      return (
        (c = xn(r.sliceSerialize(M))),
        e.enter('gfmFootnoteDefinitionLabelMarker'),
        e.consume(T),
        e.exit('gfmFootnoteDefinitionLabelMarker'),
        e.exit('gfmFootnoteDefinitionLabel'),
        x
      );
    }
    return Ft(T) || (h = !0), u++, e.consume(T), T === 92 ? y : g;
  }
  function y(T) {
    return T === 91 || T === 92 || T === 93 ? (e.consume(T), u++, g) : g(T);
  }
  function x(T) {
    return T === 58
      ? (e.enter('definitionMarker'),
        e.consume(T),
        e.exit('definitionMarker'),
        o.includes(c) || o.push(c),
        Ot(e, b, 'gfmFootnoteDefinitionWhitespace'))
      : l(T);
  }
  function b(T) {
    return i(T);
  }
}
function tM(e, i, l) {
  return e.check(Cr, i, e.attempt(QC, i, l));
}
function eM(e) {
  e.exit('gfmFootnoteDefinition');
}
function nM(e, i, l) {
  const r = this;
  return Ot(e, o, 'gfmFootnoteDefinitionIndent', 5);
  function o(c) {
    const u = r.events[r.events.length - 1];
    return u &&
      u[1].type === 'gfmFootnoteDefinitionIndent' &&
      u[2].sliceSerialize(u[1], !0).length === 4
      ? i(c)
      : l(c);
  }
}
function iM(e) {
  let l = (e || {}).singleTilde;
  const r = { name: 'strikethrough', tokenize: c, resolveAll: o };
  return (
    l == null && (l = !0),
    {
      text: { 126: r },
      insideSpan: { null: [r] },
      attentionMarkers: { null: [126] },
    }
  );
  function o(u, h) {
    let m = -1;
    for (; ++m < u.length; )
      if (
        u[m][0] === 'enter' &&
        u[m][1].type === 'strikethroughSequenceTemporary' &&
        u[m][1]._close
      ) {
        let p = m;
        for (; p--; )
          if (
            u[p][0] === 'exit' &&
            u[p][1].type === 'strikethroughSequenceTemporary' &&
            u[p][1]._open &&
            u[m][1].end.offset - u[m][1].start.offset ===
              u[p][1].end.offset - u[p][1].start.offset
          ) {
            (u[m][1].type = 'strikethroughSequence'),
              (u[p][1].type = 'strikethroughSequence');
            const g = {
                type: 'strikethrough',
                start: Object.assign({}, u[p][1].start),
                end: Object.assign({}, u[m][1].end),
              },
              y = {
                type: 'strikethroughText',
                start: Object.assign({}, u[p][1].end),
                end: Object.assign({}, u[m][1].start),
              },
              x = [
                ['enter', g, h],
                ['enter', u[p][1], h],
                ['exit', u[p][1], h],
                ['enter', y, h],
              ],
              b = h.parser.constructs.insideSpan.null;
            b && Ze(x, x.length, 0, Oo(b, u.slice(p + 1, m), h)),
              Ze(x, x.length, 0, [
                ['exit', y, h],
                ['enter', u[m][1], h],
                ['exit', u[m][1], h],
                ['exit', g, h],
              ]),
              Ze(u, p - 1, m - p + 3, x),
              (m = p + x.length - 2);
            break;
          }
      }
    for (m = -1; ++m < u.length; )
      u[m][1].type === 'strikethroughSequenceTemporary' &&
        (u[m][1].type = 'data');
    return u;
  }
  function c(u, h, m) {
    const p = this.previous,
      g = this.events;
    let y = 0;
    return x;
    function x(T) {
      return p === 126 && g[g.length - 1][1].type !== 'characterEscape'
        ? m(T)
        : (u.enter('strikethroughSequenceTemporary'), b(T));
    }
    function b(T) {
      const M = na(p);
      if (T === 126) return y > 1 ? m(T) : (u.consume(T), y++, b);
      if (y < 2 && !l) return m(T);
      const D = u.exit('strikethroughSequenceTemporary'),
        E = na(T);
      return (
        (D._open = !E || (E === 2 && !!M)),
        (D._close = !M || (M === 2 && !!E)),
        h(T)
      );
    }
  }
}
class lM {
  constructor() {
    this.map = [];
  }
  add(i, l, r) {
    aM(this, i, l, r);
  }
  consume(i) {
    if (
      (this.map.sort(function (c, u) {
        return c[0] - u[0];
      }),
      this.map.length === 0)
    )
      return;
    let l = this.map.length;
    const r = [];
    for (; l > 0; )
      (l -= 1),
        r.push(i.slice(this.map[l][0] + this.map[l][1]), this.map[l][2]),
        (i.length = this.map[l][0]);
    r.push(i.slice()), (i.length = 0);
    let o = r.pop();
    for (; o; ) {
      for (const c of o) i.push(c);
      o = r.pop();
    }
    this.map.length = 0;
  }
}
function aM(e, i, l, r) {
  let o = 0;
  if (!(l === 0 && r.length === 0)) {
    for (; o < e.map.length; ) {
      if (e.map[o][0] === i) {
        (e.map[o][1] += l), e.map[o][2].push(...r);
        return;
      }
      o += 1;
    }
    e.map.push([i, l, r]);
  }
}
function rM(e, i) {
  let l = !1;
  const r = [];
  for (; i < e.length; ) {
    const o = e[i];
    if (l) {
      if (o[0] === 'enter')
        o[1].type === 'tableContent' &&
          r.push(e[i + 1][1].type === 'tableDelimiterMarker' ? 'left' : 'none');
      else if (o[1].type === 'tableContent') {
        if (e[i - 1][1].type === 'tableDelimiterMarker') {
          const c = r.length - 1;
          r[c] = r[c] === 'left' ? 'center' : 'right';
        }
      } else if (o[1].type === 'tableDelimiterRow') break;
    } else o[0] === 'enter' && o[1].type === 'tableDelimiterRow' && (l = !0);
    i += 1;
  }
  return r;
}
function sM() {
  return { flow: { null: { name: 'table', tokenize: oM, resolveAll: uM } } };
}
function oM(e, i, l) {
  const r = this;
  let o = 0,
    c = 0,
    u;
  return h;
  function h(O) {
    let J = r.events.length - 1;
    for (; J > -1; ) {
      const st = r.events[J][1].type;
      if (st === 'lineEnding' || st === 'linePrefix') J--;
      else break;
    }
    const et = J > -1 ? r.events[J][1].type : null,
      vt = et === 'tableHead' || et === 'tableRow' ? V : m;
    return vt === V && r.parser.lazy[r.now().line] ? l(O) : vt(O);
  }
  function m(O) {
    return e.enter('tableHead'), e.enter('tableRow'), p(O);
  }
  function p(O) {
    return O === 124 || ((u = !0), (c += 1)), g(O);
  }
  function g(O) {
    return O === null
      ? l(O)
      : dt(O)
        ? c > 1
          ? ((c = 0),
            (r.interrupt = !0),
            e.exit('tableRow'),
            e.enter('lineEnding'),
            e.consume(O),
            e.exit('lineEnding'),
            b)
          : l(O)
        : kt(O)
          ? Ot(e, g, 'whitespace')(O)
          : ((c += 1),
            u && ((u = !1), (o += 1)),
            O === 124
              ? (e.enter('tableCellDivider'),
                e.consume(O),
                e.exit('tableCellDivider'),
                (u = !0),
                g)
              : (e.enter('data'), y(O)));
  }
  function y(O) {
    return O === null || O === 124 || Ft(O)
      ? (e.exit('data'), g(O))
      : (e.consume(O), O === 92 ? x : y);
  }
  function x(O) {
    return O === 92 || O === 124 ? (e.consume(O), y) : y(O);
  }
  function b(O) {
    return (
      (r.interrupt = !1),
      r.parser.lazy[r.now().line]
        ? l(O)
        : (e.enter('tableDelimiterRow'),
          (u = !1),
          kt(O)
            ? Ot(
                e,
                T,
                'linePrefix',
                r.parser.constructs.disable.null.includes('codeIndented')
                  ? void 0
                  : 4,
              )(O)
            : T(O))
    );
  }
  function T(O) {
    return O === 45 || O === 58
      ? D(O)
      : O === 124
        ? ((u = !0),
          e.enter('tableCellDivider'),
          e.consume(O),
          e.exit('tableCellDivider'),
          M)
        : Q(O);
  }
  function M(O) {
    return kt(O) ? Ot(e, D, 'whitespace')(O) : D(O);
  }
  function D(O) {
    return O === 58
      ? ((c += 1),
        (u = !0),
        e.enter('tableDelimiterMarker'),
        e.consume(O),
        e.exit('tableDelimiterMarker'),
        E)
      : O === 45
        ? ((c += 1), E(O))
        : O === null || dt(O)
          ? Y(O)
          : Q(O);
  }
  function E(O) {
    return O === 45 ? (e.enter('tableDelimiterFiller'), L(O)) : Q(O);
  }
  function L(O) {
    return O === 45
      ? (e.consume(O), L)
      : O === 58
        ? ((u = !0),
          e.exit('tableDelimiterFiller'),
          e.enter('tableDelimiterMarker'),
          e.consume(O),
          e.exit('tableDelimiterMarker'),
          R)
        : (e.exit('tableDelimiterFiller'), R(O));
  }
  function R(O) {
    return kt(O) ? Ot(e, Y, 'whitespace')(O) : Y(O);
  }
  function Y(O) {
    return O === 124
      ? T(O)
      : O === null || dt(O)
        ? !u || o !== c
          ? Q(O)
          : (e.exit('tableDelimiterRow'), e.exit('tableHead'), i(O))
        : Q(O);
  }
  function Q(O) {
    return l(O);
  }
  function V(O) {
    return e.enter('tableRow'), K(O);
  }
  function K(O) {
    return O === 124
      ? (e.enter('tableCellDivider'),
        e.consume(O),
        e.exit('tableCellDivider'),
        K)
      : O === null || dt(O)
        ? (e.exit('tableRow'), i(O))
        : kt(O)
          ? Ot(e, K, 'whitespace')(O)
          : (e.enter('data'), $(O));
  }
  function $(O) {
    return O === null || O === 124 || Ft(O)
      ? (e.exit('data'), K(O))
      : (e.consume(O), O === 92 ? it : $);
  }
  function it(O) {
    return O === 92 || O === 124 ? (e.consume(O), $) : $(O);
  }
}
function uM(e, i) {
  let l = -1,
    r = !0,
    o = 0,
    c = [0, 0, 0, 0],
    u = [0, 0, 0, 0],
    h = !1,
    m = 0,
    p,
    g,
    y;
  const x = new lM();
  for (; ++l < e.length; ) {
    const b = e[l],
      T = b[1];
    b[0] === 'enter'
      ? T.type === 'tableHead'
        ? ((h = !1),
          m !== 0 && (d0(x, i, m, p, g), (g = void 0), (m = 0)),
          (p = {
            type: 'table',
            start: Object.assign({}, T.start),
            end: Object.assign({}, T.end),
          }),
          x.add(l, 0, [['enter', p, i]]))
        : T.type === 'tableRow' || T.type === 'tableDelimiterRow'
          ? ((r = !0),
            (y = void 0),
            (c = [0, 0, 0, 0]),
            (u = [0, l + 1, 0, 0]),
            h &&
              ((h = !1),
              (g = {
                type: 'tableBody',
                start: Object.assign({}, T.start),
                end: Object.assign({}, T.end),
              }),
              x.add(l, 0, [['enter', g, i]])),
            (o = T.type === 'tableDelimiterRow' ? 2 : g ? 3 : 1))
          : o &&
              (T.type === 'data' ||
                T.type === 'tableDelimiterMarker' ||
                T.type === 'tableDelimiterFiller')
            ? ((r = !1),
              u[2] === 0 &&
                (c[1] !== 0 &&
                  ((u[0] = u[1]),
                  (y = eo(x, i, c, o, void 0, y)),
                  (c = [0, 0, 0, 0])),
                (u[2] = l)))
            : T.type === 'tableCellDivider' &&
              (r
                ? (r = !1)
                : (c[1] !== 0 &&
                    ((u[0] = u[1]), (y = eo(x, i, c, o, void 0, y))),
                  (c = u),
                  (u = [c[1], l, 0, 0])))
      : T.type === 'tableHead'
        ? ((h = !0), (m = l))
        : T.type === 'tableRow' || T.type === 'tableDelimiterRow'
          ? ((m = l),
            c[1] !== 0
              ? ((u[0] = u[1]), (y = eo(x, i, c, o, l, y)))
              : u[1] !== 0 && (y = eo(x, i, u, o, l, y)),
            (o = 0))
          : o &&
            (T.type === 'data' ||
              T.type === 'tableDelimiterMarker' ||
              T.type === 'tableDelimiterFiller') &&
            (u[3] = l);
  }
  for (
    m !== 0 && d0(x, i, m, p, g), x.consume(i.events), l = -1;
    ++l < i.events.length;

  ) {
    const b = i.events[l];
    b[0] === 'enter' &&
      b[1].type === 'table' &&
      (b[1]._align = rM(i.events, l));
  }
  return e;
}
function eo(e, i, l, r, o, c) {
  const u = r === 1 ? 'tableHeader' : r === 2 ? 'tableDelimiter' : 'tableData',
    h = 'tableContent';
  l[0] !== 0 &&
    ((c.end = Object.assign({}, Zl(i.events, l[0]))),
    e.add(l[0], 0, [['exit', c, i]]));
  const m = Zl(i.events, l[1]);
  if (
    ((c = { type: u, start: Object.assign({}, m), end: Object.assign({}, m) }),
    e.add(l[1], 0, [['enter', c, i]]),
    l[2] !== 0)
  ) {
    const p = Zl(i.events, l[2]),
      g = Zl(i.events, l[3]),
      y = { type: h, start: Object.assign({}, p), end: Object.assign({}, g) };
    if ((e.add(l[2], 0, [['enter', y, i]]), r !== 2)) {
      const x = i.events[l[2]],
        b = i.events[l[3]];
      if (
        ((x[1].end = Object.assign({}, b[1].end)),
        (x[1].type = 'chunkText'),
        (x[1].contentType = 'text'),
        l[3] > l[2] + 1)
      ) {
        const T = l[2] + 1,
          M = l[3] - l[2] - 1;
        e.add(T, M, []);
      }
    }
    e.add(l[3] + 1, 0, [['exit', y, i]]);
  }
  return (
    o !== void 0 &&
      ((c.end = Object.assign({}, Zl(i.events, o))),
      e.add(o, 0, [['exit', c, i]]),
      (c = void 0)),
    c
  );
}
function d0(e, i, l, r, o) {
  const c = [],
    u = Zl(i.events, l);
  o && ((o.end = Object.assign({}, u)), c.push(['exit', o, i])),
    (r.end = Object.assign({}, u)),
    c.push(['exit', r, i]),
    e.add(l + 1, 0, c);
}
function Zl(e, i) {
  const l = e[i],
    r = l[0] === 'enter' ? 'start' : 'end';
  return l[1][r];
}
const cM = { name: 'tasklistCheck', tokenize: hM };
function fM() {
  return { text: { 91: cM } };
}
function hM(e, i, l) {
  const r = this;
  return o;
  function o(m) {
    return r.previous !== null || !r._gfmTasklistFirstContentOfListItem
      ? l(m)
      : (e.enter('taskListCheck'),
        e.enter('taskListCheckMarker'),
        e.consume(m),
        e.exit('taskListCheckMarker'),
        c);
  }
  function c(m) {
    return Ft(m)
      ? (e.enter('taskListCheckValueUnchecked'),
        e.consume(m),
        e.exit('taskListCheckValueUnchecked'),
        u)
      : m === 88 || m === 120
        ? (e.enter('taskListCheckValueChecked'),
          e.consume(m),
          e.exit('taskListCheckValueChecked'),
          u)
        : l(m);
  }
  function u(m) {
    return m === 93
      ? (e.enter('taskListCheckMarker'),
        e.consume(m),
        e.exit('taskListCheckMarker'),
        e.exit('taskListCheck'),
        h)
      : l(m);
  }
  function h(m) {
    return dt(m) ? i(m) : kt(m) ? e.check({ tokenize: dM }, i, l)(m) : l(m);
  }
}
function dM(e, i, l) {
  return Ot(e, r, 'whitespace');
  function r(o) {
    return o === null ? l(o) : i(o);
  }
}
function pM(e) {
  return F1([UC(), KC(), iM(e), sM(), fM()]);
}
const mM = {};
function gM(e) {
  const i = this,
    l = e || mM,
    r = i.data(),
    o = r.micromarkExtensions || (r.micromarkExtensions = []),
    c = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []),
    u = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  o.push(pM(l)), c.push(LC()), u.push(jC(l));
}
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const yM = (e) => e.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  vM = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (i, l, r) =>
      r ? r.toUpperCase() : l.toLowerCase(),
    ),
  p0 = (e) => {
    const i = vM(e);
    return i.charAt(0).toUpperCase() + i.slice(1);
  },
  Lv = (...e) =>
    e
      .filter((i, l, r) => !!i && i.trim() !== '' && r.indexOf(i) === l)
      .join(' ')
      .trim(),
  xM = (e) => {
    for (const i in e)
      if (i.startsWith('aria-') || i === 'role' || i === 'title') return !0;
  };
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var bM = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const SM = rt.forwardRef(
  (
    {
      color: e = 'currentColor',
      size: i = 24,
      strokeWidth: l = 2,
      absoluteStrokeWidth: r,
      className: o = '',
      children: c,
      iconNode: u,
      ...h
    },
    m,
  ) =>
    rt.createElement(
      'svg',
      {
        ref: m,
        ...bM,
        width: i,
        height: i,
        stroke: e,
        strokeWidth: r ? (Number(l) * 24) / Number(i) : l,
        className: Lv('lucide', o),
        ...(!c && !xM(h) && { 'aria-hidden': 'true' }),
        ...h,
      },
      [
        ...u.map(([p, g]) => rt.createElement(p, g)),
        ...(Array.isArray(c) ? c : [c]),
      ],
    ),
);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ie = (e, i) => {
  const l = rt.forwardRef(({ className: r, ...o }, c) =>
    rt.createElement(SM, {
      ref: c,
      iconNode: i,
      className: Lv(`lucide-${yM(p0(e))}`, `lucide-${e}`, r),
      ...o,
    }),
  );
  return (l.displayName = p0(e)), l;
};
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const TM = [
    [
      'path',
      {
        d: 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z',
        key: 'hh9hay',
      },
    ],
    ['path', { d: 'm3.3 7 8.7 5 8.7-5', key: 'g66t2b' }],
    ['path', { d: 'M12 22V12', key: 'd0xqtd' }],
  ],
  AM = ie('box', TM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const wM = [
    ['path', { d: 'M12 18V5', key: 'adv99a' }],
    [
      'path',
      { d: 'M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4', key: '1e3is1' },
    ],
    [
      'path',
      { d: 'M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5', key: '1gqd8o' },
    ],
    ['path', { d: 'M17.997 5.125a4 4 0 0 1 2.526 5.77', key: 'iwvgf7' }],
    ['path', { d: 'M18 18a4 4 0 0 0 2-7.464', key: 'efp6ie' }],
    [
      'path',
      {
        d: 'M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517',
        key: '1gq6am',
      },
    ],
    ['path', { d: 'M6 18a4 4 0 0 1-2-7.464', key: 'k1g0md' }],
    ['path', { d: 'M6.003 5.125a4 4 0 0 0-2.526 5.77', key: 'q97ue3' }],
  ],
  EM = ie('brain', wM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const kM = [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]],
  CM = ie('check', kM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const MM = [['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }]],
  $f = ie('chevron-down', MM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const DM = [['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }]],
  Wf = ie('chevron-right', DM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const zM = [
    [
      'rect',
      {
        width: '14',
        height: '14',
        x: '8',
        y: '8',
        rx: '2',
        ry: '2',
        key: '17jyea',
      },
    ],
    [
      'path',
      {
        d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2',
        key: 'zix9uf',
      },
    ],
  ],
  OM = ie('copy', zM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const RM = [
    ['path', { d: 'M12 20v2', key: '1lh1kg' }],
    ['path', { d: 'M12 2v2', key: 'tus03m' }],
    ['path', { d: 'M17 20v2', key: '1rnc9c' }],
    ['path', { d: 'M17 2v2', key: '11trls' }],
    ['path', { d: 'M2 12h2', key: '1t8f8n' }],
    ['path', { d: 'M2 17h2', key: '7oei6x' }],
    ['path', { d: 'M2 7h2', key: 'asdhe0' }],
    ['path', { d: 'M20 12h2', key: '1q8mjw' }],
    ['path', { d: 'M20 17h2', key: '1fpfkl' }],
    ['path', { d: 'M20 7h2', key: '1o8tra' }],
    ['path', { d: 'M7 20v2', key: '4gnj0m' }],
    ['path', { d: 'M7 2v2', key: '1i4yhu' }],
    [
      'rect',
      { x: '4', y: '4', width: '16', height: '16', rx: '2', key: '1vbyd7' },
    ],
    [
      'rect',
      { x: '8', y: '8', width: '8', height: '8', rx: '1', key: 'z9xiuo' },
    ],
  ],
  _M = ie('cpu', RM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const NM = [
    [
      'rect',
      { width: '20', height: '14', x: '2', y: '5', rx: '2', key: 'ynyp8z' },
    ],
    ['line', { x1: '2', x2: '22', y1: '10', y2: '10', key: '1b3vmo' }],
  ],
  LM = ie('credit-card', NM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const jM = [
    ['path', { d: 'M15 3h6v6', key: '1q9fwt' }],
    ['path', { d: 'M10 14 21 3', key: 'gplh6r' }],
    [
      'path',
      {
        d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
        key: 'a6xqqp',
      },
    ],
  ],
  BM = ie('external-link', jM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const VM = [
    [
      'rect',
      { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' },
    ],
    ['path', { d: 'M3 9h18', key: '1pudct' }],
    ['path', { d: 'M3 15h18', key: '5xshup' }],
    ['path', { d: 'M9 3v18', key: 'fh3hqa' }],
    ['path', { d: 'M15 3v18', key: '14nvp0' }],
  ],
  UM = ie('grid-3x3', VM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const HM = [
    ['path', { d: 'M3 7V5c0-1.1.9-2 2-2h2', key: 'adw53z' }],
    ['path', { d: 'M17 3h2c1.1 0 2 .9 2 2v2', key: 'an4l38' }],
    ['path', { d: 'M21 17v2c0 1.1-.9 2-2 2h-2', key: '144t0e' }],
    ['path', { d: 'M7 21H5c-1.1 0-2-.9-2-2v-2', key: 'rtnfgi' }],
    [
      'rect',
      { width: '7', height: '5', x: '7', y: '7', rx: '1', key: '1eyiv7' },
    ],
    [
      'rect',
      { width: '7', height: '5', x: '10', y: '12', rx: '1', key: '1qlmkx' },
    ],
  ],
  qM = ie('group', HM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const PM = [
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
    ['path', { d: 'M12 16v-4', key: '1dtifu' }],
    ['path', { d: 'M12 8h.01', key: 'e9boi3' }],
  ],
  GM = ie('info', PM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const YM = [
    [
      'path',
      {
        d: 'm15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4',
        key: 'g0fldk',
      },
    ],
    ['path', { d: 'm21 2-9.6 9.6', key: '1j0ho8' }],
    ['circle', { cx: '7.5', cy: '15.5', r: '5.5', key: 'yqb3hr' }],
  ],
  FM = ie('key', YM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const IM = [
    [
      'path',
      {
        d: 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z',
        key: 'zw3jo',
      },
    ],
    [
      'path',
      {
        d: 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12',
        key: '1wduqc',
      },
    ],
    [
      'path',
      {
        d: 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17',
        key: 'kqbvx6',
      },
    ],
  ],
  XM = ie('layers', IM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const QM = [
    ['path', { d: 'm10 17 5-5-5-5', key: '1bsop3' }],
    ['path', { d: 'M15 12H3', key: '6jk70r' }],
    ['path', { d: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4', key: 'u53s6r' }],
  ],
  KM = ie('log-in', QM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ZM = [
    [
      'path',
      {
        d: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z',
        key: 'm3kijz',
      },
    ],
    [
      'path',
      {
        d: 'm12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z',
        key: '1fmvmk',
      },
    ],
    ['path', { d: 'M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0', key: '1f8sc4' }],
    ['path', { d: 'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5', key: 'qeys4' }],
  ],
  JM = ie('rocket', ZM);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $M = [
    [
      'path',
      {
        d: 'M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915',
        key: '1i5ecw',
      },
    ],
    ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
  ],
  WM = ie('settings', $M);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const tD = [
    [
      'path',
      {
        d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
        key: 'oel41y',
      },
    ],
    ['path', { d: 'm9 12 2 2 4-4', key: 'dzmm74' }],
  ],
  eD = ie('shield-check', tD);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const nD = [
    ['path', { d: 'M12 19h8', key: 'baeox8' }],
    ['path', { d: 'm4 17 6-6-6-6', key: '1yngyt' }],
  ],
  iD = ie('terminal', nD);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const lD = [
    ['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' }],
    ['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
    ['line', { x1: '19', x2: '19', y1: '8', y2: '14', key: '1bvyxn' }],
    ['line', { x1: '22', x2: '16', y1: '11', y2: '11', key: '1shjgl' }],
  ],
  aD = ie('user-plus', lD);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const rD = [
    [
      'path',
      {
        d: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z',
        key: '1xq2db',
      },
    ],
  ],
  sD = ie('zap', rD),
  oD = [
    {
      id: 'quick-start',
      label: '快速开始',
      icon: JM,
      items: [
        { id: 'register', label: '注册账号', icon: aD },
        { id: 'login', label: '登录账号', icon: KM },
        { id: 'buy-credits', label: '购买额度', icon: LM },
        { id: 'create-api-key', label: '创建 API 令牌', icon: FM },
        { id: 'env-check', label: '环境检查', icon: eD },
        { id: 'cli-config', label: '配置 CLI 工具', icon: iD },
      ],
    },
    {
      id: 'model-group',
      label: '模型分组介绍',
      icon: XM,
      items: [
        { id: 'model-square', label: '模型广场', icon: UM },
        { id: 'group-intro', label: '分组介绍', icon: GM },
      ],
    },
    {
      id: 'config-guide',
      label: '配置教程',
      icon: WM,
      items: [
        { id: 'claude-code', label: 'Claude Code配置', icon: _M },
        { id: 'codex', label: 'Codex配置', icon: EM },
        { id: 'gemini', label: 'Gemini配置', icon: sD },
        { id: 'openclaw', label: 'OpenClaw配置', icon: AM },
      ],
    },
  ],
  uD = ({ activePage: e, onPageChange: i }) => {
    const [l, r] = xr.useState(['quick-start', 'model-group', 'config-guide']),
      o = (c) => {
        r((u) => (u.includes(c) ? u.filter((h) => h !== c) : [...u, c]));
      };
    return H.jsxs('div', {
      className:
        'w-72 border-r border-gray-800 h-screen bg-[#111827] text-gray-300 flex flex-col sticky top-0 shadow-2xl',
      children: [
        H.jsxs('div', {
          className: 'p-6 border-b border-gray-800',
          children: [
            H.jsxs('div', {
              className: 'flex flex-col items-center gap-3 mb-2 text-center',
              children: [
                H.jsx('img', {
                  src: '/logo.png?v=202605151008',
                  alt: 'Bay API',
                  className:
                    'w-14 h-14 rounded-full object-cover bg-white p-1 shadow-sm',
                }),
                H.jsx('h1', {
                  className:
                    'text-xl font-black text-white tracking-tighter uppercase italic leading-none',
                  children: 'Bay API',
                }),
              ],
            }),
            H.jsx('p', {
              className:
                'text-[10px] text-gray-500 font-mono mt-1 tracking-widest uppercase',
              children: 'v2.4.0-stable',
            }),
          ],
        }),
        H.jsx('div', {
          className: 'flex-1 overflow-y-auto py-8 px-4 space-y-8',
          children: oD.map((c) =>
            H.jsxs(
              'div',
              {
                className: 'space-y-3',
                children: [
                  H.jsxs('button', {
                    onClick: () => o(c.id),
                    className:
                      'w-full flex items-center justify-between px-2 text-gray-500 hover:text-gray-300 transition-colors group',
                    children: [
                      H.jsx('div', {
                        className: 'flex items-center gap-2',
                        children: H.jsx('span', {
                          className:
                            'text-[11px] font-black uppercase tracking-widest leading-none',
                          children: c.label,
                        }),
                      }),
                      H.jsx('div', {
                        className: 'opacity-50',
                        children: l.includes(c.id)
                          ? H.jsx($f, { size: 12 })
                          : H.jsx(Wf, { size: 12 }),
                      }),
                    ],
                  }),
                  l.includes(c.id) &&
                    H.jsx('div', {
                      className: 'space-y-1 ml-1',
                      children: c.items.map((u) =>
                        H.jsx(
                          'button',
                          {
                            onClick: () => i(u.id),
                            className: `
                      w-full flex items-center gap-3 px-3 py-2 text-xs font-bold transition-all relative
                      ${e === u.id ? 'text-white bg-white/5 rounded border-l-2 border-orange-500' : 'text-gray-400 hover:text-white hover:bg-white/5 rounded'}
                    `,
                            children: u.label,
                          },
                          u.id,
                        ),
                      ),
                    }),
                ],
              },
              c.id,
            ),
          ),
        }),
        H.jsxs('div', {
          className:
            'p-4 bg-gray-900/50 text-[10px] space-y-1 border-t border-gray-800/50',
          children: [
            H.jsxs('div', {
              className: 'flex justify-between',
              children: [
                H.jsx('span', {
                  className: 'text-gray-500',
                  children: 'API Endpoint',
                }),
                H.jsx('span', {
                  className: 'text-green-500 font-bold',
                  children: 'Online',
                }),
              ],
            }),
            H.jsx('div', {
              className: 'text-gray-400 truncate italic',
              children: 'https://www.aiflowbay.com/v1',
            }),
          ],
        }),
      ],
    });
  },
  Yh = rt.createContext({});
function Fh(e) {
  const i = rt.useRef(null);
  return i.current === null && (i.current = e()), i.current;
}
const cD = typeof window < 'u',
  jv = cD ? rt.useLayoutEffect : rt.useEffect,
  Lo = rt.createContext(null);
function Ih(e, i) {
  e.indexOf(i) === -1 && e.push(i);
}
function So(e, i) {
  const l = e.indexOf(i);
  l > -1 && e.splice(l, 1);
}
const Dn = (e, i, l) => (l > i ? i : l < e ? e : l);
let Xh = () => {};
const Mi = {},
  Bv = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function Vv(e) {
  return typeof e == 'object' && e !== null;
}
const Uv = (e) => /^0[^.\s]+$/u.test(e);
function Hv(e) {
  let i;
  return () => (i === void 0 && (i = e()), i);
}
const hn = (e) => e,
  fD = (e, i) => (l) => i(e(l)),
  Dr = (...e) => e.reduce(fD),
  Tr = (e, i, l) => {
    const r = i - e;
    return r === 0 ? 1 : (l - e) / r;
  };
class Qh {
  constructor() {
    this.subscriptions = [];
  }
  add(i) {
    return Ih(this.subscriptions, i), () => So(this.subscriptions, i);
  }
  notify(i, l, r) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1) this.subscriptions[0](i, l, r);
      else
        for (let c = 0; c < o; c++) {
          const u = this.subscriptions[c];
          u && u(i, l, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Je = (e) => e * 1e3,
  fn = (e) => e / 1e3;
function qv(e, i) {
  return i ? e * (1e3 / i) : 0;
}
const Pv = (e, i, l) =>
    (((1 - 3 * l + 3 * i) * e + (3 * l - 6 * i)) * e + 3 * i) * e,
  hD = 1e-7,
  dD = 12;
function pD(e, i, l, r, o) {
  let c,
    u,
    h = 0;
  do (u = i + (l - i) / 2), (c = Pv(u, r, o) - e), c > 0 ? (l = u) : (i = u);
  while (Math.abs(c) > hD && ++h < dD);
  return u;
}
function zr(e, i, l, r) {
  if (e === i && l === r) return hn;
  const o = (c) => pD(c, 0, 1, e, l);
  return (c) => (c === 0 || c === 1 ? c : Pv(o(c), i, r));
}
const Gv = (e) => (i) => (i <= 0.5 ? e(2 * i) / 2 : (2 - e(2 * (1 - i))) / 2),
  Yv = (e) => (i) => 1 - e(1 - i),
  Fv = zr(0.33, 1.53, 0.69, 0.99),
  Kh = Yv(Fv),
  Iv = Gv(Kh),
  Xv = (e) =>
    e >= 1
      ? 1
      : (e *= 2) < 1
        ? 0.5 * Kh(e)
        : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
  Zh = (e) => 1 - Math.sin(Math.acos(e)),
  Qv = Yv(Zh),
  Kv = Gv(Zh),
  mD = zr(0.42, 0, 1, 1),
  gD = zr(0, 0, 0.58, 1),
  Zv = zr(0.42, 0, 0.58, 1),
  yD = (e) => Array.isArray(e) && typeof e[0] != 'number',
  Jv = (e) => Array.isArray(e) && typeof e[0] == 'number',
  vD = {
    linear: hn,
    easeIn: mD,
    easeInOut: Zv,
    easeOut: gD,
    circIn: Zh,
    circInOut: Kv,
    circOut: Qv,
    backIn: Kh,
    backInOut: Iv,
    backOut: Fv,
    anticipate: Xv,
  },
  xD = (e) => typeof e == 'string',
  m0 = (e) => {
    if (Jv(e)) {
      Xh(e.length === 4);
      const [i, l, r, o] = e;
      return zr(i, l, r, o);
    } else if (xD(e)) return vD[e];
    return e;
  },
  no = [
    'setup',
    'read',
    'resolveKeyframes',
    'preUpdate',
    'update',
    'preRender',
    'render',
    'postRender',
  ];
function bD(e, i) {
  let l = new Set(),
    r = new Set(),
    o = !1,
    c = !1;
  const u = new WeakSet();
  let h = { delta: 0, timestamp: 0, isProcessing: !1 };
  function m(g) {
    u.has(g) && (p.schedule(g), e()), g(h);
  }
  const p = {
    schedule: (g, y = !1, x = !1) => {
      const T = x && o ? l : r;
      return y && u.add(g), T.add(g), g;
    },
    cancel: (g) => {
      r.delete(g), u.delete(g);
    },
    process: (g) => {
      if (((h = g), o)) {
        c = !0;
        return;
      }
      o = !0;
      const y = l;
      (l = r),
        (r = y),
        l.forEach(m),
        l.clear(),
        (o = !1),
        c && ((c = !1), p.process(g));
    },
  };
  return p;
}
const SD = 40;
function $v(e, i) {
  let l = !1,
    r = !0;
  const o = { delta: 0, timestamp: 0, isProcessing: !1 },
    c = () => (l = !0),
    u = no.reduce((R, Y) => ((R[Y] = bD(c)), R), {}),
    {
      setup: h,
      read: m,
      resolveKeyframes: p,
      preUpdate: g,
      update: y,
      preRender: x,
      render: b,
      postRender: T,
    } = u,
    M = () => {
      const R = Mi.useManualTiming,
        Y = R ? o.timestamp : performance.now();
      (l = !1),
        R ||
          (o.delta = r ? 1e3 / 60 : Math.max(Math.min(Y - o.timestamp, SD), 1)),
        (o.timestamp = Y),
        (o.isProcessing = !0),
        h.process(o),
        m.process(o),
        p.process(o),
        g.process(o),
        y.process(o),
        x.process(o),
        b.process(o),
        T.process(o),
        (o.isProcessing = !1),
        l && i && ((r = !1), e(M));
    },
    D = () => {
      (l = !0), (r = !0), o.isProcessing || e(M);
    };
  return {
    schedule: no.reduce((R, Y) => {
      const Q = u[Y];
      return (R[Y] = (V, K = !1, $ = !1) => (l || D(), Q.schedule(V, K, $))), R;
    }, {}),
    cancel: (R) => {
      for (let Y = 0; Y < no.length; Y++) u[no[Y]].cancel(R);
    },
    state: o,
    steps: u,
  };
}
const {
  schedule: Yt,
  cancel: Di,
  state: be,
  steps: Ef,
} = $v(typeof requestAnimationFrame < 'u' ? requestAnimationFrame : hn, !0);
let oo;
function TD() {
  oo = void 0;
}
const De = {
    now: () => (
      oo === void 0 &&
        De.set(
          be.isProcessing || Mi.useManualTiming
            ? be.timestamp
            : performance.now(),
        ),
      oo
    ),
    set: (e) => {
      (oo = e), queueMicrotask(TD);
    },
  },
  Wv = (e) => (i) => typeof i == 'string' && i.startsWith(e),
  tx = Wv('--'),
  AD = Wv('var(--'),
  Jh = (e) => (AD(e) ? wD.test(e.split('/*')[0].trim()) : !1),
  wD =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function g0(e) {
  return typeof e != 'string' ? !1 : e.split('/*')[0].includes('var(--');
}
const sa = {
    test: (e) => typeof e == 'number',
    parse: parseFloat,
    transform: (e) => e,
  },
  Ar = { ...sa, transform: (e) => Dn(0, 1, e) },
  io = { ...sa, default: 1 },
  pr = (e) => Math.round(e * 1e5) / 1e5,
  $h = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function ED(e) {
  return e == null;
}
const kD =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  Wh = (e, i) => (l) =>
    !!(
      (typeof l == 'string' && kD.test(l) && l.startsWith(e)) ||
      (i && !ED(l) && Object.prototype.hasOwnProperty.call(l, i))
    ),
  ex = (e, i, l) => (r) => {
    if (typeof r != 'string') return r;
    const [o, c, u, h] = r.match($h);
    return {
      [e]: parseFloat(o),
      [i]: parseFloat(c),
      [l]: parseFloat(u),
      alpha: h !== void 0 ? parseFloat(h) : 1,
    };
  },
  CD = (e) => Dn(0, 255, e),
  kf = { ...sa, transform: (e) => Math.round(CD(e)) },
  Wi = {
    test: Wh('rgb', 'red'),
    parse: ex('red', 'green', 'blue'),
    transform: ({ red: e, green: i, blue: l, alpha: r = 1 }) =>
      'rgba(' +
      kf.transform(e) +
      ', ' +
      kf.transform(i) +
      ', ' +
      kf.transform(l) +
      ', ' +
      pr(Ar.transform(r)) +
      ')',
  };
function MD(e) {
  let i = '',
    l = '',
    r = '',
    o = '';
  return (
    e.length > 5
      ? ((i = e.substring(1, 3)),
        (l = e.substring(3, 5)),
        (r = e.substring(5, 7)),
        (o = e.substring(7, 9)))
      : ((i = e.substring(1, 2)),
        (l = e.substring(2, 3)),
        (r = e.substring(3, 4)),
        (o = e.substring(4, 5)),
        (i += i),
        (l += l),
        (r += r),
        (o += o)),
    {
      red: parseInt(i, 16),
      green: parseInt(l, 16),
      blue: parseInt(r, 16),
      alpha: o ? parseInt(o, 16) / 255 : 1,
    }
  );
}
const th = { test: Wh('#'), parse: MD, transform: Wi.transform },
  Or = (e) => ({
    test: (i) =>
      typeof i == 'string' && i.endsWith(e) && i.split(' ').length === 1,
    parse: parseFloat,
    transform: (i) => `${i}${e}`,
  }),
  Ei = Or('deg'),
  Mn = Or('%'),
  ut = Or('px'),
  DD = Or('vh'),
  zD = Or('vw'),
  y0 = {
    ...Mn,
    parse: (e) => Mn.parse(e) / 100,
    transform: (e) => Mn.transform(e * 100),
  },
  $l = {
    test: Wh('hsl', 'hue'),
    parse: ex('hue', 'saturation', 'lightness'),
    transform: ({ hue: e, saturation: i, lightness: l, alpha: r = 1 }) =>
      'hsla(' +
      Math.round(e) +
      ', ' +
      Mn.transform(pr(i)) +
      ', ' +
      Mn.transform(pr(l)) +
      ', ' +
      pr(Ar.transform(r)) +
      ')',
  },
  ue = {
    test: (e) => Wi.test(e) || th.test(e) || $l.test(e),
    parse: (e) =>
      Wi.test(e) ? Wi.parse(e) : $l.test(e) ? $l.parse(e) : th.parse(e),
    transform: (e) =>
      typeof e == 'string'
        ? e
        : e.hasOwnProperty('red')
          ? Wi.transform(e)
          : $l.transform(e),
    getAnimatableNone: (e) => {
      const i = ue.parse(e);
      return (i.alpha = 0), ue.transform(i);
    },
  },
  OD =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function RD(e) {
  var i, l;
  return (
    isNaN(e) &&
    typeof e == 'string' &&
    (((i = e.match($h)) == null ? void 0 : i.length) || 0) +
      (((l = e.match(OD)) == null ? void 0 : l.length) || 0) >
      0
  );
}
const nx = 'number',
  ix = 'color',
  _D = 'var',
  ND = 'var(',
  v0 = '${}',
  LD =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ia(e) {
  const i = e.toString(),
    l = [],
    r = { color: [], number: [], var: [] },
    o = [];
  let c = 0;
  const h = i
    .replace(
      LD,
      (m) => (
        ue.test(m)
          ? (r.color.push(c), o.push(ix), l.push(ue.parse(m)))
          : m.startsWith(ND)
            ? (r.var.push(c), o.push(_D), l.push(m))
            : (r.number.push(c), o.push(nx), l.push(parseFloat(m))),
        ++c,
        v0
      ),
    )
    .split(v0);
  return { values: l, split: h, indexes: r, types: o };
}
function jD(e) {
  return ia(e).values;
}
function lx({ split: e, types: i }) {
  const l = e.length;
  return (r) => {
    let o = '';
    for (let c = 0; c < l; c++)
      if (((o += e[c]), r[c] !== void 0)) {
        const u = i[c];
        u === nx
          ? (o += pr(r[c]))
          : u === ix
            ? (o += ue.transform(r[c]))
            : (o += r[c]);
      }
    return o;
  };
}
function BD(e) {
  return lx(ia(e));
}
const VD = (e) =>
    typeof e == 'number' ? 0 : ue.test(e) ? ue.getAnimatableNone(e) : e,
  UD = (e, i) =>
    typeof e == 'number'
      ? i != null && i.trim().endsWith('/')
        ? e
        : 0
      : VD(e);
function HD(e) {
  const i = ia(e);
  return lx(i)(i.values.map((r, o) => UD(r, i.split[o])));
}
const bn = {
  test: RD,
  parse: jD,
  createTransformer: BD,
  getAnimatableNone: HD,
};
function Cf(e, i, l) {
  return (
    l < 0 && (l += 1),
    l > 1 && (l -= 1),
    l < 1 / 6
      ? e + (i - e) * 6 * l
      : l < 1 / 2
        ? i
        : l < 2 / 3
          ? e + (i - e) * (2 / 3 - l) * 6
          : e
  );
}
function qD({ hue: e, saturation: i, lightness: l, alpha: r }) {
  (e /= 360), (i /= 100), (l /= 100);
  let o = 0,
    c = 0,
    u = 0;
  if (!i) o = c = u = l;
  else {
    const h = l < 0.5 ? l * (1 + i) : l + i - l * i,
      m = 2 * l - h;
    (o = Cf(m, h, e + 1 / 3)), (c = Cf(m, h, e)), (u = Cf(m, h, e - 1 / 3));
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(c * 255),
    blue: Math.round(u * 255),
    alpha: r,
  };
}
function To(e, i) {
  return (l) => (l > 0 ? i : e);
}
const Kt = (e, i, l) => e + (i - e) * l,
  Mf = (e, i, l) => {
    const r = e * e,
      o = l * (i * i - r) + r;
    return o < 0 ? 0 : Math.sqrt(o);
  },
  PD = [th, Wi, $l],
  GD = (e) => PD.find((i) => i.test(e));
function x0(e) {
  const i = GD(e);
  if (!i) return !1;
  let l = i.parse(e);
  return i === $l && (l = qD(l)), l;
}
const b0 = (e, i) => {
    const l = x0(e),
      r = x0(i);
    if (!l || !r) return To(e, i);
    const o = { ...l };
    return (c) => (
      (o.red = Mf(l.red, r.red, c)),
      (o.green = Mf(l.green, r.green, c)),
      (o.blue = Mf(l.blue, r.blue, c)),
      (o.alpha = Kt(l.alpha, r.alpha, c)),
      Wi.transform(o)
    );
  },
  eh = new Set(['none', 'hidden']);
function YD(e, i) {
  return eh.has(e) ? (l) => (l <= 0 ? e : i) : (l) => (l >= 1 ? i : e);
}
function FD(e, i) {
  return (l) => Kt(e, i, l);
}
function td(e) {
  return typeof e == 'number'
    ? FD
    : typeof e == 'string'
      ? Jh(e)
        ? To
        : ue.test(e)
          ? b0
          : QD
      : Array.isArray(e)
        ? ax
        : typeof e == 'object'
          ? ue.test(e)
            ? b0
            : ID
          : To;
}
function ax(e, i) {
  const l = [...e],
    r = l.length,
    o = e.map((c, u) => td(c)(c, i[u]));
  return (c) => {
    for (let u = 0; u < r; u++) l[u] = o[u](c);
    return l;
  };
}
function ID(e, i) {
  const l = { ...e, ...i },
    r = {};
  for (const o in l)
    e[o] !== void 0 && i[o] !== void 0 && (r[o] = td(e[o])(e[o], i[o]));
  return (o) => {
    for (const c in r) l[c] = r[c](o);
    return l;
  };
}
function XD(e, i) {
  const l = [],
    r = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < i.values.length; o++) {
    const c = i.types[o],
      u = e.indexes[c][r[c]],
      h = e.values[u] ?? 0;
    (l[o] = h), r[c]++;
  }
  return l;
}
const QD = (e, i) => {
  const l = bn.createTransformer(i),
    r = ia(e),
    o = ia(i);
  return r.indexes.var.length === o.indexes.var.length &&
    r.indexes.color.length === o.indexes.color.length &&
    r.indexes.number.length >= o.indexes.number.length
    ? (eh.has(e) && !o.values.length) || (eh.has(i) && !r.values.length)
      ? YD(e, i)
      : Dr(ax(XD(r, o), o.values), l)
    : To(e, i);
};
function rx(e, i, l) {
  return typeof e == 'number' && typeof i == 'number' && typeof l == 'number'
    ? Kt(e, i, l)
    : td(e)(e, i);
}
const KD = (e) => {
    const i = ({ timestamp: l }) => e(l);
    return {
      start: (l = !0) => Yt.update(i, l),
      stop: () => Di(i),
      now: () => (be.isProcessing ? be.timestamp : De.now()),
    };
  },
  sx = (e, i, l = 10) => {
    let r = '';
    const o = Math.max(Math.round(i / l), 2);
    for (let c = 0; c < o; c++)
      r += Math.round(e(c / (o - 1)) * 1e4) / 1e4 + ', ';
    return `linear(${r.substring(0, r.length - 2)})`;
  },
  Ao = 2e4;
function ed(e) {
  let i = 0;
  const l = 50;
  let r = e.next(i);
  for (; !r.done && i < Ao; ) (i += l), (r = e.next(i));
  return i >= Ao ? 1 / 0 : i;
}
function ZD(e, i = 100, l) {
  const r = l({ ...e, keyframes: [0, i] }),
    o = Math.min(ed(r), Ao);
  return {
    type: 'keyframes',
    ease: (c) => r.next(o * c).value / i,
    duration: fn(o),
  };
}
const te = {
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  duration: 800,
  bounce: 0.3,
  visualDuration: 0.3,
  restSpeed: { granular: 0.01, default: 2 },
  restDelta: { granular: 0.005, default: 0.5 },
  minDuration: 0.01,
  maxDuration: 10,
  minDamping: 0.05,
  maxDamping: 1,
};
function nh(e, i) {
  return e * Math.sqrt(1 - i * i);
}
const JD = 12;
function $D(e, i, l) {
  let r = l;
  for (let o = 1; o < JD; o++) r = r - e(r) / i(r);
  return r;
}
const Df = 0.001;
function WD({
  duration: e = te.duration,
  bounce: i = te.bounce,
  velocity: l = te.velocity,
  mass: r = te.mass,
}) {
  let o,
    c,
    u = 1 - i;
  (u = Dn(te.minDamping, te.maxDamping, u)),
    (e = Dn(te.minDuration, te.maxDuration, fn(e))),
    u < 1
      ? ((o = (p) => {
          const g = p * u,
            y = g * e,
            x = g - l,
            b = nh(p, u),
            T = Math.exp(-y);
          return Df - (x / b) * T;
        }),
        (c = (p) => {
          const y = p * u * e,
            x = y * l + l,
            b = Math.pow(u, 2) * Math.pow(p, 2) * e,
            T = Math.exp(-y),
            M = nh(Math.pow(p, 2), u);
          return ((-o(p) + Df > 0 ? -1 : 1) * ((x - b) * T)) / M;
        }))
      : ((o = (p) => {
          const g = Math.exp(-p * e),
            y = (p - l) * e + 1;
          return -Df + g * y;
        }),
        (c = (p) => {
          const g = Math.exp(-p * e),
            y = (l - p) * (e * e);
          return g * y;
        }));
  const h = 5 / e,
    m = $D(o, c, h);
  if (((e = Je(e)), isNaN(m)))
    return { stiffness: te.stiffness, damping: te.damping, duration: e };
  {
    const p = Math.pow(m, 2) * r;
    return { stiffness: p, damping: u * 2 * Math.sqrt(r * p), duration: e };
  }
}
const t3 = ['duration', 'bounce'],
  e3 = ['stiffness', 'damping', 'mass'];
function S0(e, i) {
  return i.some((l) => e[l] !== void 0);
}
function n3(e) {
  let i = {
    velocity: te.velocity,
    stiffness: te.stiffness,
    damping: te.damping,
    mass: te.mass,
    isResolvedFromDuration: !1,
    ...e,
  };
  if (!S0(e, e3) && S0(e, t3))
    if (((i.velocity = 0), e.visualDuration)) {
      const l = e.visualDuration,
        r = (2 * Math.PI) / (l * 1.2),
        o = r * r,
        c = 2 * Dn(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(o);
      i = { ...i, mass: te.mass, stiffness: o, damping: c };
    } else {
      const l = WD({ ...e, velocity: 0 });
      (i = { ...i, ...l, mass: te.mass }), (i.isResolvedFromDuration = !0);
    }
  return i;
}
function wo(e = te.visualDuration, i = te.bounce) {
  const l =
    typeof e != 'object'
      ? { visualDuration: e, keyframes: [0, 1], bounce: i }
      : e;
  let { restSpeed: r, restDelta: o } = l;
  const c = l.keyframes[0],
    u = l.keyframes[l.keyframes.length - 1],
    h = { done: !1, value: c },
    {
      stiffness: m,
      damping: p,
      mass: g,
      duration: y,
      velocity: x,
      isResolvedFromDuration: b,
    } = n3({ ...l, velocity: -fn(l.velocity || 0) }),
    T = x || 0,
    M = p / (2 * Math.sqrt(m * g)),
    D = u - c,
    E = fn(Math.sqrt(m / g)),
    L = Math.abs(D) < 5;
  r || (r = L ? te.restSpeed.granular : te.restSpeed.default),
    o || (o = L ? te.restDelta.granular : te.restDelta.default);
  let R, Y, Q, V, K, $;
  if (M < 1)
    (Q = nh(E, M)),
      (V = (T + M * E * D) / Q),
      (R = (O) => {
        const J = Math.exp(-M * E * O);
        return u - J * (V * Math.sin(Q * O) + D * Math.cos(Q * O));
      }),
      (K = M * E * V + D * Q),
      ($ = M * E * D - V * Q),
      (Y = (O) =>
        Math.exp(-M * E * O) * (K * Math.sin(Q * O) + $ * Math.cos(Q * O)));
  else if (M === 1) {
    R = (J) => u - Math.exp(-E * J) * (D + (T + E * D) * J);
    const O = T + E * D;
    Y = (J) => Math.exp(-E * J) * (E * O * J - T);
  } else {
    const O = E * Math.sqrt(M * M - 1);
    R = (st) => {
      const W = Math.exp(-M * E * st),
        N = Math.min(O * st, 300);
      return (
        u - (W * ((T + M * E * D) * Math.sinh(N) + O * D * Math.cosh(N))) / O
      );
    };
    const J = (T + M * E * D) / O,
      et = M * E * J - D * O,
      vt = M * E * D - J * O;
    Y = (st) => {
      const W = Math.exp(-M * E * st),
        N = Math.min(O * st, 300);
      return W * (et * Math.sinh(N) + vt * Math.cosh(N));
    };
  }
  const it = {
    calculatedDuration: (b && y) || null,
    velocity: (O) => Je(Y(O)),
    next: (O) => {
      if (!b && M < 1) {
        const et = Math.exp(-M * E * O),
          vt = Math.sin(Q * O),
          st = Math.cos(Q * O),
          W = u - et * (V * vt + D * st),
          N = Je(et * (K * vt + $ * st));
        return (
          (h.done = Math.abs(N) <= r && Math.abs(u - W) <= o),
          (h.value = h.done ? u : W),
          h
        );
      }
      const J = R(O);
      if (b) h.done = O >= y;
      else {
        const et = Je(Y(O));
        h.done = Math.abs(et) <= r && Math.abs(u - J) <= o;
      }
      return (h.value = h.done ? u : J), h;
    },
    toString: () => {
      const O = Math.min(ed(it), Ao),
        J = sx((et) => it.next(O * et).value, O, 30);
      return O + 'ms ' + J;
    },
    toTransition: () => {},
  };
  return it;
}
wo.applyToOptions = (e) => {
  const i = ZD(e, 100, wo);
  return (
    (e.ease = i.ease), (e.duration = Je(i.duration)), (e.type = 'keyframes'), e
  );
};
const i3 = 5;
function ox(e, i, l) {
  const r = Math.max(i - i3, 0);
  return qv(l - e(r), i - r);
}
function ih({
  keyframes: e,
  velocity: i = 0,
  power: l = 0.8,
  timeConstant: r = 325,
  bounceDamping: o = 10,
  bounceStiffness: c = 500,
  modifyTarget: u,
  min: h,
  max: m,
  restDelta: p = 0.5,
  restSpeed: g,
}) {
  const y = e[0],
    x = { done: !1, value: y },
    b = ($) => (h !== void 0 && $ < h) || (m !== void 0 && $ > m),
    T = ($) =>
      h === void 0
        ? m
        : m === void 0 || Math.abs(h - $) < Math.abs(m - $)
          ? h
          : m;
  let M = l * i;
  const D = y + M,
    E = u === void 0 ? D : u(D);
  E !== D && (M = E - y);
  const L = ($) => -M * Math.exp(-$ / r),
    R = ($) => E + L($),
    Y = ($) => {
      const it = L($),
        O = R($);
      (x.done = Math.abs(it) <= p), (x.value = x.done ? E : O);
    };
  let Q, V;
  const K = ($) => {
    b(x.value) &&
      ((Q = $),
      (V = wo({
        keyframes: [x.value, T(x.value)],
        velocity: ox(R, $, x.value),
        damping: o,
        stiffness: c,
        restDelta: p,
        restSpeed: g,
      })));
  };
  return (
    K(0),
    {
      calculatedDuration: null,
      next: ($) => {
        let it = !1;
        return (
          !V && Q === void 0 && ((it = !0), Y($), K($)),
          Q !== void 0 && $ >= Q ? V.next($ - Q) : (!it && Y($), x)
        );
      },
    }
  );
}
function l3(e, i, l) {
  const r = [],
    o = l || Mi.mix || rx,
    c = e.length - 1;
  for (let u = 0; u < c; u++) {
    let h = o(e[u], e[u + 1]);
    if (i) {
      const m = Array.isArray(i) ? i[u] || hn : i;
      h = Dr(m, h);
    }
    r.push(h);
  }
  return r;
}
function a3(e, i, { clamp: l = !0, ease: r, mixer: o } = {}) {
  const c = e.length;
  if ((Xh(c === i.length), c === 1)) return () => i[0];
  if (c === 2 && i[0] === i[1]) return () => i[1];
  const u = e[0] === e[1];
  e[0] > e[c - 1] && ((e = [...e].reverse()), (i = [...i].reverse()));
  const h = l3(i, r, o),
    m = h.length,
    p = (g) => {
      if (u && g < e[0]) return i[0];
      let y = 0;
      if (m > 1) for (; y < e.length - 2 && !(g < e[y + 1]); y++);
      const x = Tr(e[y], e[y + 1], g);
      return h[y](x);
    };
  return l ? (g) => p(Dn(e[0], e[c - 1], g)) : p;
}
function r3(e, i) {
  const l = e[e.length - 1];
  for (let r = 1; r <= i; r++) {
    const o = Tr(0, i, r);
    e.push(Kt(l, 1, o));
  }
}
function s3(e) {
  const i = [0];
  return r3(i, e.length - 1), i;
}
function o3(e, i) {
  return e.map((l) => l * i);
}
function u3(e, i) {
  return e.map(() => i || Zv).splice(0, e.length - 1);
}
function mr({
  duration: e = 300,
  keyframes: i,
  times: l,
  ease: r = 'easeInOut',
}) {
  const o = yD(r) ? r.map(m0) : m0(r),
    c = { done: !1, value: i[0] },
    u = o3(l && l.length === i.length ? l : s3(i), e),
    h = a3(u, i, { ease: Array.isArray(o) ? o : u3(i, o) });
  return {
    calculatedDuration: e,
    next: (m) => ((c.value = h(m)), (c.done = m >= e), c),
  };
}
const c3 = (e) => e !== null;
function jo(e, { repeat: i, repeatType: l = 'loop' }, r, o = 1) {
  const c = e.filter(c3),
    h = o < 0 || (i && l !== 'loop' && i % 2 === 1) ? 0 : c.length - 1;
  return !h || r === void 0 ? c[h] : r;
}
const f3 = { decay: ih, inertia: ih, tween: mr, keyframes: mr, spring: wo };
function ux(e) {
  typeof e.type == 'string' && (e.type = f3[e.type]);
}
class nd {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((i) => {
      this.resolve = i;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  then(i, l) {
    return this.finished.then(i, l);
  }
}
const h3 = (e) => e / 100;
class Eo extends nd {
  constructor(i) {
    super(),
      (this.state = 'idle'),
      (this.startTime = null),
      (this.isStopped = !1),
      (this.currentTime = 0),
      (this.holdTime = null),
      (this.playbackSpeed = 1),
      (this.delayState = { done: !1, value: void 0 }),
      (this.stop = () => {
        var r, o;
        const { motionValue: l } = this.options;
        l && l.updatedAt !== De.now() && this.tick(De.now()),
          (this.isStopped = !0),
          this.state !== 'idle' &&
            (this.teardown(),
            (o = (r = this.options).onStop) == null || o.call(r));
      }),
      (this.options = i),
      this.initAnimation(),
      this.play(),
      i.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: i } = this;
    ux(i);
    const {
      type: l = mr,
      repeat: r = 0,
      repeatDelay: o = 0,
      repeatType: c,
      velocity: u = 0,
    } = i;
    let { keyframes: h } = i;
    const m = l || mr;
    m !== mr &&
      typeof h[0] != 'number' &&
      ((this.mixKeyframes = Dr(h3, rx(h[0], h[1]))), (h = [0, 100]));
    const p = m({ ...i, keyframes: h });
    c === 'mirror' &&
      (this.mirroredGenerator = m({
        ...i,
        keyframes: [...h].reverse(),
        velocity: -u,
      })),
      p.calculatedDuration === null && (p.calculatedDuration = ed(p));
    const { calculatedDuration: g } = p;
    (this.calculatedDuration = g),
      (this.resolvedDuration = g + o),
      (this.totalDuration = this.resolvedDuration * (r + 1) - o),
      (this.generator = p);
  }
  updateTime(i) {
    const l = Math.round(i - this.startTime) * this.playbackSpeed;
    this.holdTime !== null
      ? (this.currentTime = this.holdTime)
      : (this.currentTime = l);
  }
  tick(i, l = !1) {
    const {
      generator: r,
      totalDuration: o,
      mixKeyframes: c,
      mirroredGenerator: u,
      resolvedDuration: h,
      calculatedDuration: m,
    } = this;
    if (this.startTime === null) return r.next(0);
    const {
      delay: p = 0,
      keyframes: g,
      repeat: y,
      repeatType: x,
      repeatDelay: b,
      type: T,
      onUpdate: M,
      finalKeyframe: D,
    } = this.options;
    this.speed > 0
      ? (this.startTime = Math.min(this.startTime, i))
      : this.speed < 0 &&
        (this.startTime = Math.min(i - o / this.speed, this.startTime)),
      l ? (this.currentTime = i) : this.updateTime(i);
    const E = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1),
      L = this.playbackSpeed >= 0 ? E < 0 : E > o;
    (this.currentTime = Math.max(E, 0)),
      this.state === 'finished' &&
        this.holdTime === null &&
        (this.currentTime = o);
    let R = this.currentTime,
      Y = r;
    if (y) {
      const $ = Math.min(this.currentTime, o) / h;
      let it = Math.floor($),
        O = $ % 1;
      !O && $ >= 1 && (O = 1),
        O === 1 && it--,
        (it = Math.min(it, y + 1)),
        !!(it % 2) &&
          (x === 'reverse'
            ? ((O = 1 - O), b && (O -= b / h))
            : x === 'mirror' && (Y = u)),
        (R = Dn(0, 1, O) * h);
    }
    let Q;
    L
      ? ((this.delayState.value = g[0]), (Q = this.delayState))
      : (Q = Y.next(R)),
      c && !L && (Q.value = c(Q.value));
    let { done: V } = Q;
    !L &&
      m !== null &&
      (V =
        this.playbackSpeed >= 0
          ? this.currentTime >= o
          : this.currentTime <= 0);
    const K =
      this.holdTime === null &&
      (this.state === 'finished' || (this.state === 'running' && V));
    return (
      K && T !== ih && (Q.value = jo(g, this.options, D, this.speed)),
      M && M(Q.value),
      K && this.finish(),
      Q
    );
  }
  then(i, l) {
    return this.finished.then(i, l);
  }
  get duration() {
    return fn(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: i = 0 } = this.options || {};
    return this.duration + fn(i);
  }
  get time() {
    return fn(this.currentTime);
  }
  set time(i) {
    (i = Je(i)),
      (this.currentTime = i),
      this.startTime === null ||
      this.holdTime !== null ||
      this.playbackSpeed === 0
        ? (this.holdTime = i)
        : this.driver &&
          (this.startTime = this.driver.now() - i / this.playbackSpeed),
      this.driver
        ? this.driver.start(!1)
        : ((this.startTime = 0),
          (this.state = 'paused'),
          (this.holdTime = i),
          this.tick(i));
  }
  getGeneratorVelocity() {
    const i = this.currentTime;
    if (i <= 0) return this.options.velocity || 0;
    if (this.generator.velocity) return this.generator.velocity(i);
    const l = this.generator.next(i).value;
    return ox((r) => this.generator.next(r).value, i, l);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(i) {
    const l = this.playbackSpeed !== i;
    l && this.driver && this.updateTime(De.now()),
      (this.playbackSpeed = i),
      l && this.driver && (this.time = fn(this.currentTime));
  }
  play() {
    var o, c;
    if (this.isStopped) return;
    const { driver: i = KD, startTime: l } = this.options;
    this.driver || (this.driver = i((u) => this.tick(u))),
      (c = (o = this.options).onPlay) == null || c.call(o);
    const r = this.driver.now();
    this.state === 'finished'
      ? (this.updateFinished(), (this.startTime = r))
      : this.holdTime !== null
        ? (this.startTime = r - this.holdTime)
        : this.startTime || (this.startTime = l ?? r),
      this.state === 'finished' &&
        this.speed < 0 &&
        (this.startTime += this.calculatedDuration),
      (this.holdTime = null),
      (this.state = 'running'),
      this.driver.start();
  }
  pause() {
    (this.state = 'paused'),
      this.updateTime(De.now()),
      (this.holdTime = this.currentTime);
  }
  complete() {
    this.state !== 'running' && this.play(),
      (this.state = 'finished'),
      (this.holdTime = null);
  }
  finish() {
    var i, l;
    this.notifyFinished(),
      this.teardown(),
      (this.state = 'finished'),
      (l = (i = this.options).onComplete) == null || l.call(i);
  }
  cancel() {
    var i, l;
    (this.holdTime = null),
      (this.startTime = 0),
      this.tick(0),
      this.teardown(),
      (l = (i = this.options).onCancel) == null || l.call(i);
  }
  teardown() {
    (this.state = 'idle'),
      this.stopDriver(),
      (this.startTime = this.holdTime = null);
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(i) {
    return (this.startTime = 0), this.tick(i, !0);
  }
  attachTimeline(i) {
    var l;
    return (
      this.options.allowFlatten &&
        ((this.options.type = 'keyframes'),
        (this.options.ease = 'linear'),
        this.initAnimation()),
      (l = this.driver) == null || l.stop(),
      i.observe(this)
    );
  }
}
function d3(e) {
  for (let i = 1; i < e.length; i++) e[i] ?? (e[i] = e[i - 1]);
}
const tl = (e) => (e * 180) / Math.PI,
  lh = (e) => {
    const i = tl(Math.atan2(e[1], e[0]));
    return ah(i);
  },
  p3 = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
    rotate: lh,
    rotateZ: lh,
    skewX: (e) => tl(Math.atan(e[1])),
    skewY: (e) => tl(Math.atan(e[2])),
    skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2,
  },
  ah = (e) => ((e = e % 360), e < 0 && (e += 360), e),
  T0 = lh,
  A0 = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]),
  w0 = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]),
  m3 = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: A0,
    scaleY: w0,
    scale: (e) => (A0(e) + w0(e)) / 2,
    rotateX: (e) => ah(tl(Math.atan2(e[6], e[5]))),
    rotateY: (e) => ah(tl(Math.atan2(-e[2], e[0]))),
    rotateZ: T0,
    rotate: T0,
    skewX: (e) => tl(Math.atan(e[4])),
    skewY: (e) => tl(Math.atan(e[1])),
    skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2,
  };
function rh(e) {
  return e.includes('scale') ? 1 : 0;
}
function sh(e, i) {
  if (!e || e === 'none') return rh(i);
  const l = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let r, o;
  if (l) (r = m3), (o = l);
  else {
    const h = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    (r = p3), (o = h);
  }
  if (!o) return rh(i);
  const c = r[i],
    u = o[1].split(',').map(y3);
  return typeof c == 'function' ? c(u) : u[c];
}
const g3 = (e, i) => {
  const { transform: l = 'none' } = getComputedStyle(e);
  return sh(l, i);
};
function y3(e) {
  return parseFloat(e.trim());
}
const oa = [
    'transformPerspective',
    'x',
    'y',
    'z',
    'translateX',
    'translateY',
    'translateZ',
    'scale',
    'scaleX',
    'scaleY',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skew',
    'skewX',
    'skewY',
  ],
  ua = new Set(oa),
  E0 = (e) => e === sa || e === ut,
  v3 = new Set(['x', 'y', 'z']),
  x3 = oa.filter((e) => !v3.has(e));
function b3(e) {
  const i = [];
  return (
    x3.forEach((l) => {
      const r = e.getValue(l);
      r !== void 0 &&
        (i.push([l, r.get()]), r.set(l.startsWith('scale') ? 1 : 0));
    }),
    i
  );
}
const Ci = {
  width: (
    { x: e },
    { paddingLeft: i = '0', paddingRight: l = '0', boxSizing: r },
  ) => {
    const o = e.max - e.min;
    return r === 'border-box' ? o : o - parseFloat(i) - parseFloat(l);
  },
  height: (
    { y: e },
    { paddingTop: i = '0', paddingBottom: l = '0', boxSizing: r },
  ) => {
    const o = e.max - e.min;
    return r === 'border-box' ? o : o - parseFloat(i) - parseFloat(l);
  },
  top: (e, { top: i }) => parseFloat(i),
  left: (e, { left: i }) => parseFloat(i),
  bottom: ({ y: e }, { top: i }) => parseFloat(i) + (e.max - e.min),
  right: ({ x: e }, { left: i }) => parseFloat(i) + (e.max - e.min),
  x: (e, { transform: i }) => sh(i, 'x'),
  y: (e, { transform: i }) => sh(i, 'y'),
};
Ci.translateX = Ci.x;
Ci.translateY = Ci.y;
const el = new Set();
let oh = !1,
  uh = !1,
  ch = !1;
function cx() {
  if (uh) {
    const e = Array.from(el).filter((r) => r.needsMeasurement),
      i = new Set(e.map((r) => r.element)),
      l = new Map();
    i.forEach((r) => {
      const o = b3(r);
      o.length && (l.set(r, o), r.render());
    }),
      e.forEach((r) => r.measureInitialState()),
      i.forEach((r) => {
        r.render();
        const o = l.get(r);
        o &&
          o.forEach(([c, u]) => {
            var h;
            (h = r.getValue(c)) == null || h.set(u);
          });
      }),
      e.forEach((r) => r.measureEndState()),
      e.forEach((r) => {
        r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
      });
  }
  (uh = !1), (oh = !1), el.forEach((e) => e.complete(ch)), el.clear();
}
function fx() {
  el.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (uh = !0);
  });
}
function S3() {
  (ch = !0), fx(), cx(), (ch = !1);
}
class id {
  constructor(i, l, r, o, c, u = !1) {
    (this.state = 'pending'),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.unresolvedKeyframes = [...i]),
      (this.onComplete = l),
      (this.name = r),
      (this.motionValue = o),
      (this.element = c),
      (this.isAsync = u);
  }
  scheduleResolve() {
    (this.state = 'scheduled'),
      this.isAsync
        ? (el.add(this),
          oh || ((oh = !0), Yt.read(fx), Yt.resolveKeyframes(cx)))
        : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: i,
      name: l,
      element: r,
      motionValue: o,
    } = this;
    if (i[0] === null) {
      const c = o == null ? void 0 : o.get(),
        u = i[i.length - 1];
      if (c !== void 0) i[0] = c;
      else if (r && l) {
        const h = r.readValue(l, u);
        h != null && (i[0] = h);
      }
      i[0] === void 0 && (i[0] = u), o && c === void 0 && o.set(i[0]);
    }
    d3(i);
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete(i = !1) {
    (this.state = 'complete'),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, i),
      el.delete(this);
  }
  cancel() {
    this.state === 'scheduled' && (el.delete(this), (this.state = 'pending'));
  }
  resume() {
    this.state === 'pending' && this.scheduleResolve();
  }
}
const T3 = (e) => e.startsWith('--');
function hx(e, i, l) {
  T3(i) ? e.style.setProperty(i, l) : (e.style[i] = l);
}
const A3 = {};
function dx(e, i) {
  const l = Hv(e);
  return () => A3[i] ?? l();
}
const w3 = dx(() => window.ScrollTimeline !== void 0, 'scrollTimeline'),
  px = dx(() => {
    try {
      document
        .createElement('div')
        .animate({ opacity: 0 }, { easing: 'linear(0, 1)' });
    } catch {
      return !1;
    }
    return !0;
  }, 'linearEasing'),
  cr = ([e, i, l, r]) => `cubic-bezier(${e}, ${i}, ${l}, ${r})`,
  k0 = {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    circIn: cr([0, 0.65, 0.55, 1]),
    circOut: cr([0.55, 0, 1, 0.45]),
    backIn: cr([0.31, 0.01, 0.66, -0.59]),
    backOut: cr([0.33, 1.53, 0.69, 0.99]),
  };
function mx(e, i) {
  if (e)
    return typeof e == 'function'
      ? px()
        ? sx(e, i)
        : 'ease-out'
      : Jv(e)
        ? cr(e)
        : Array.isArray(e)
          ? e.map((l) => mx(l, i) || k0.easeOut)
          : k0[e];
}
function E3(
  e,
  i,
  l,
  {
    delay: r = 0,
    duration: o = 300,
    repeat: c = 0,
    repeatType: u = 'loop',
    ease: h = 'easeOut',
    times: m,
  } = {},
  p = void 0,
) {
  const g = { [i]: l };
  m && (g.offset = m);
  const y = mx(h, o);
  Array.isArray(y) && (g.easing = y);
  const x = {
    delay: r,
    duration: o,
    easing: Array.isArray(y) ? 'linear' : y,
    fill: 'both',
    iterations: c + 1,
    direction: u === 'reverse' ? 'alternate' : 'normal',
  };
  return p && (x.pseudoElement = p), e.animate(g, x);
}
function gx(e) {
  return typeof e == 'function' && 'applyToOptions' in e;
}
function k3({ type: e, ...i }) {
  return gx(e) && px()
    ? e.applyToOptions(i)
    : (i.duration ?? (i.duration = 300), i.ease ?? (i.ease = 'easeOut'), i);
}
class yx extends nd {
  constructor(i) {
    if (
      (super(),
      (this.finishedTime = null),
      (this.isStopped = !1),
      (this.manualStartTime = null),
      !i)
    )
      return;
    const {
      element: l,
      name: r,
      keyframes: o,
      pseudoElement: c,
      allowFlatten: u = !1,
      finalKeyframe: h,
      onComplete: m,
    } = i;
    (this.isPseudoElement = !!c),
      (this.allowFlatten = u),
      (this.options = i),
      Xh(typeof i.type != 'string');
    const p = k3(i);
    (this.animation = E3(l, r, o, p, c)),
      p.autoplay === !1 && this.animation.pause(),
      (this.animation.onfinish = () => {
        if (((this.finishedTime = this.time), !c)) {
          const g = jo(o, this.options, h, this.speed);
          this.updateMotionValue && this.updateMotionValue(g),
            hx(l, r, g),
            this.animation.cancel();
        }
        m == null || m(), this.notifyFinished();
      });
  }
  play() {
    this.isStopped ||
      ((this.manualStartTime = null),
      this.animation.play(),
      this.state === 'finished' && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var i, l;
    (l = (i = this.animation).finish) == null || l.call(i);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {}
  }
  stop() {
    if (this.isStopped) return;
    this.isStopped = !0;
    const { state: i } = this;
    i === 'idle' ||
      i === 'finished' ||
      (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
      this.isPseudoElement || this.cancel());
  }
  commitStyles() {
    var l, r, o;
    const i = (l = this.options) == null ? void 0 : l.element;
    !this.isPseudoElement &&
      i != null &&
      i.isConnected &&
      ((o = (r = this.animation).commitStyles) == null || o.call(r));
  }
  get duration() {
    var l, r;
    const i =
      ((r =
        (l = this.animation.effect) == null ? void 0 : l.getComputedTiming) ==
      null
        ? void 0
        : r.call(l).duration) || 0;
    return fn(Number(i));
  }
  get iterationDuration() {
    const { delay: i = 0 } = this.options || {};
    return this.duration + fn(i);
  }
  get time() {
    return fn(Number(this.animation.currentTime) || 0);
  }
  set time(i) {
    const l = this.finishedTime !== null;
    (this.manualStartTime = null),
      (this.finishedTime = null),
      (this.animation.currentTime = Je(i)),
      l && this.animation.pause();
  }
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(i) {
    i < 0 && (this.finishedTime = null), (this.animation.playbackRate = i);
  }
  get state() {
    return this.finishedTime !== null ? 'finished' : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(i) {
    this.manualStartTime = this.animation.startTime = i;
  }
  attachTimeline({ timeline: i, rangeStart: l, rangeEnd: r, observe: o }) {
    var c;
    return (
      this.allowFlatten &&
        ((c = this.animation.effect) == null ||
          c.updateTiming({ easing: 'linear' })),
      (this.animation.onfinish = null),
      i && w3()
        ? ((this.animation.timeline = i),
          l && (this.animation.rangeStart = l),
          r && (this.animation.rangeEnd = r),
          hn)
        : o(this)
    );
  }
}
const vx = { anticipate: Xv, backInOut: Iv, circInOut: Kv };
function C3(e) {
  return e in vx;
}
function M3(e) {
  typeof e.ease == 'string' && C3(e.ease) && (e.ease = vx[e.ease]);
}
const zf = 10;
class D3 extends yx {
  constructor(i) {
    M3(i),
      ux(i),
      super(i),
      i.startTime !== void 0 &&
        i.autoplay !== !1 &&
        (this.startTime = i.startTime),
      (this.options = i);
  }
  updateMotionValue(i) {
    const {
      motionValue: l,
      onUpdate: r,
      onComplete: o,
      element: c,
      ...u
    } = this.options;
    if (!l) return;
    if (i !== void 0) {
      l.set(i);
      return;
    }
    const h = new Eo({ ...u, autoplay: !1 }),
      m = Math.max(zf, De.now() - this.startTime),
      p = Dn(0, zf, m - zf),
      g = h.sample(m).value,
      { name: y } = this.options;
    c && y && hx(c, y, g),
      l.setWithVelocity(h.sample(Math.max(0, m - p)).value, g, p),
      h.stop();
  }
}
const C0 = (e, i) =>
  i === 'zIndex'
    ? !1
    : !!(
        typeof e == 'number' ||
        Array.isArray(e) ||
        (typeof e == 'string' &&
          (bn.test(e) || e === '0') &&
          !e.startsWith('url('))
      );
function z3(e) {
  const i = e[0];
  if (e.length === 1) return !0;
  for (let l = 0; l < e.length; l++) if (e[l] !== i) return !0;
}
function O3(e, i, l, r) {
  const o = e[0];
  if (o === null) return !1;
  if (i === 'display' || i === 'visibility') return !0;
  const c = e[e.length - 1],
    u = C0(o, i),
    h = C0(c, i);
  return !u || !h ? !1 : z3(e) || ((l === 'spring' || gx(l)) && r);
}
function fh(e) {
  (e.duration = 0), (e.type = 'keyframes');
}
const xx = new Set(['opacity', 'clipPath', 'filter', 'transform']),
  R3 = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function _3(e) {
  for (let i = 0; i < e.length; i++)
    if (typeof e[i] == 'string' && R3.test(e[i])) return !0;
  return !1;
}
const N3 = new Set([
    'color',
    'backgroundColor',
    'outlineColor',
    'fill',
    'stroke',
    'borderColor',
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',
  ]),
  L3 = Hv(() => Object.hasOwnProperty.call(Element.prototype, 'animate'));
function j3(e) {
  var y;
  const {
    motionValue: i,
    name: l,
    repeatDelay: r,
    repeatType: o,
    damping: c,
    type: u,
    keyframes: h,
  } = e;
  if (
    !(
      ((y = i == null ? void 0 : i.owner) == null
        ? void 0
        : y.current) instanceof HTMLElement
    )
  )
    return !1;
  const { onUpdate: p, transformTemplate: g } = i.owner.getProps();
  return (
    L3() &&
    l &&
    (xx.has(l) || (N3.has(l) && _3(h))) &&
    (l !== 'transform' || !g) &&
    !p &&
    !r &&
    o !== 'mirror' &&
    c !== 0 &&
    u !== 'inertia'
  );
}
const B3 = 40;
class V3 extends nd {
  constructor({
    autoplay: i = !0,
    delay: l = 0,
    type: r = 'keyframes',
    repeat: o = 0,
    repeatDelay: c = 0,
    repeatType: u = 'loop',
    keyframes: h,
    name: m,
    motionValue: p,
    element: g,
    ...y
  }) {
    var T;
    super(),
      (this.stop = () => {
        var M, D;
        this._animation &&
          (this._animation.stop(),
          (M = this.stopTimeline) == null || M.call(this)),
          (D = this.keyframeResolver) == null || D.cancel();
      }),
      (this.createdAt = De.now());
    const x = {
        autoplay: i,
        delay: l,
        type: r,
        repeat: o,
        repeatDelay: c,
        repeatType: u,
        name: m,
        motionValue: p,
        element: g,
        ...y,
      },
      b = (g == null ? void 0 : g.KeyframeResolver) || id;
    (this.keyframeResolver = new b(
      h,
      (M, D, E) => this.onKeyframesResolved(M, D, x, !E),
      m,
      p,
      g,
    )),
      (T = this.keyframeResolver) == null || T.scheduleResolve();
  }
  onKeyframesResolved(i, l, r, o) {
    var E, L;
    this.keyframeResolver = void 0;
    const {
      name: c,
      type: u,
      velocity: h,
      delay: m,
      isHandoff: p,
      onUpdate: g,
    } = r;
    this.resolvedAt = De.now();
    let y = !0;
    O3(i, c, u, h) ||
      ((y = !1),
      (Mi.instantAnimations || !m) && (g == null || g(jo(i, r, l))),
      (i[0] = i[i.length - 1]),
      fh(r),
      (r.repeat = 0));
    const b = {
        startTime: o
          ? this.resolvedAt
            ? this.resolvedAt - this.createdAt > B3
              ? this.resolvedAt
              : this.createdAt
            : this.createdAt
          : void 0,
        finalKeyframe: l,
        ...r,
        keyframes: i,
      },
      T = y && !p && j3(b),
      M =
        (L = (E = b.motionValue) == null ? void 0 : E.owner) == null
          ? void 0
          : L.current;
    let D;
    if (T)
      try {
        D = new D3({ ...b, element: M });
      } catch {
        D = new Eo(b);
      }
    else D = new Eo(b);
    D.finished
      .then(() => {
        this.notifyFinished();
      })
      .catch(hn),
      this.pendingTimeline &&
        ((this.stopTimeline = D.attachTimeline(this.pendingTimeline)),
        (this.pendingTimeline = void 0)),
      (this._animation = D);
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(i, l) {
    return this.finished.finally(i).then(() => {});
  }
  get animation() {
    var i;
    return (
      this._animation ||
        ((i = this.keyframeResolver) == null || i.resume(), S3()),
      this._animation
    );
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(i) {
    this.animation.time = i;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(i) {
    this.animation.speed = i;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(i) {
    return (
      this._animation
        ? (this.stopTimeline = this.animation.attachTimeline(i))
        : (this.pendingTimeline = i),
      () => this.stop()
    );
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var i;
    this._animation && this.animation.cancel(),
      (i = this.keyframeResolver) == null || i.cancel();
  }
}
function bx(e, i, l, r = 0, o = 1) {
  const c = Array.from(e)
      .sort((p, g) => p.sortNodePosition(g))
      .indexOf(i),
    u = e.size,
    h = (u - 1) * r;
  return typeof l == 'function' ? l(c, u) : o === 1 ? c * r : h - c * r;
}
const U3 = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function H3(e) {
  const i = U3.exec(e);
  if (!i) return [,];
  const [, l, r, o] = i;
  return [`--${l ?? r}`, o];
}
function Sx(e, i, l = 1) {
  const [r, o] = H3(e);
  if (!r) return;
  const c = window.getComputedStyle(i).getPropertyValue(r);
  if (c) {
    const u = c.trim();
    return Bv(u) ? parseFloat(u) : u;
  }
  return Jh(o) ? Sx(o, i, l + 1) : o;
}
const q3 = { type: 'spring', stiffness: 500, damping: 25, restSpeed: 10 },
  P3 = (e) => ({
    type: 'spring',
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  G3 = { type: 'keyframes', duration: 0.8 },
  Y3 = { type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  F3 = (e, { keyframes: i }) =>
    i.length > 2
      ? G3
      : ua.has(e)
        ? e.startsWith('scale')
          ? P3(i[1])
          : q3
        : Y3;
function Tx(e, i) {
  if (e != null && e.inherit && i) {
    const { inherit: l, ...r } = e;
    return { ...i, ...r };
  }
  return e;
}
function ld(e, i) {
  const l =
    (e == null ? void 0 : e[i]) ?? (e == null ? void 0 : e.default) ?? e;
  return l !== e ? Tx(l, e) : l;
}
const I3 = new Set([
  'when',
  'delay',
  'delayChildren',
  'staggerChildren',
  'staggerDirection',
  'repeat',
  'repeatType',
  'repeatDelay',
  'from',
  'elapsed',
]);
function X3(e) {
  for (const i in e) if (!I3.has(i)) return !0;
  return !1;
}
const ad =
  (e, i, l, r = {}, o, c) =>
  (u) => {
    const h = ld(r, e) || {},
      m = h.delay || r.delay || 0;
    let { elapsed: p = 0 } = r;
    p = p - Je(m);
    const g = {
      keyframes: Array.isArray(l) ? l : [null, l],
      ease: 'easeOut',
      velocity: i.getVelocity(),
      ...h,
      delay: -p,
      onUpdate: (x) => {
        i.set(x), h.onUpdate && h.onUpdate(x);
      },
      onComplete: () => {
        u(), h.onComplete && h.onComplete();
      },
      name: e,
      motionValue: i,
      element: c ? void 0 : o,
    };
    X3(h) || Object.assign(g, F3(e, g)),
      g.duration && (g.duration = Je(g.duration)),
      g.repeatDelay && (g.repeatDelay = Je(g.repeatDelay)),
      g.from !== void 0 && (g.keyframes[0] = g.from);
    let y = !1;
    if (
      ((g.type === !1 || (g.duration === 0 && !g.repeatDelay)) &&
        (fh(g), g.delay === 0 && (y = !0)),
      (Mi.instantAnimations ||
        Mi.skipAnimations ||
        (o != null && o.shouldSkipAnimations)) &&
        ((y = !0), fh(g), (g.delay = 0)),
      (g.allowFlatten = !h.type && !h.ease),
      y && !c && i.get() !== void 0)
    ) {
      const x = jo(g.keyframes, h);
      if (x !== void 0) {
        Yt.update(() => {
          g.onUpdate(x), g.onComplete();
        });
        return;
      }
    }
    return h.isSync ? new Eo(g) : new V3(g);
  };
function M0(e) {
  const i = [{}, {}];
  return (
    e == null ||
      e.values.forEach((l, r) => {
        (i[0][r] = l.get()), (i[1][r] = l.getVelocity());
      }),
    i
  );
}
function rd(e, i, l, r) {
  if (typeof i == 'function') {
    const [o, c] = M0(r);
    i = i(l !== void 0 ? l : e.custom, o, c);
  }
  if (
    (typeof i == 'string' && (i = e.variants && e.variants[i]),
    typeof i == 'function')
  ) {
    const [o, c] = M0(r);
    i = i(l !== void 0 ? l : e.custom, o, c);
  }
  return i;
}
function nl(e, i, l) {
  const r = e.getProps();
  return rd(r, i, l !== void 0 ? l : r.custom, e);
}
const Ax = new Set([
    'width',
    'height',
    'top',
    'left',
    'right',
    'bottom',
    ...oa,
  ]),
  D0 = 30,
  Q3 = (e) => !isNaN(parseFloat(e));
class K3 {
  constructor(i, l = {}) {
    (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (r) => {
        var c;
        const o = De.now();
        if (
          (this.updatedAt !== o && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(r),
          this.current !== this.prev &&
            ((c = this.events.change) == null || c.notify(this.current),
            this.dependents))
        )
          for (const u of this.dependents) u.dirty();
      }),
      (this.hasAnimated = !1),
      this.setCurrent(i),
      (this.owner = l.owner);
  }
  setCurrent(i) {
    (this.current = i),
      (this.updatedAt = De.now()),
      this.canTrackVelocity === null &&
        i !== void 0 &&
        (this.canTrackVelocity = Q3(this.current));
  }
  setPrevFrameValue(i = this.current) {
    (this.prevFrameValue = i), (this.prevUpdatedAt = this.updatedAt);
  }
  onChange(i) {
    return this.on('change', i);
  }
  on(i, l) {
    this.events[i] || (this.events[i] = new Qh());
    const r = this.events[i].add(l);
    return i === 'change'
      ? () => {
          r(),
            Yt.read(() => {
              this.events.change.getSize() || this.stop();
            });
        }
      : r;
  }
  clearListeners() {
    for (const i in this.events) this.events[i].clear();
  }
  attach(i, l) {
    (this.passiveEffect = i), (this.stopPassiveEffect = l);
  }
  set(i) {
    this.passiveEffect
      ? this.passiveEffect(i, this.updateAndNotify)
      : this.updateAndNotify(i);
  }
  setWithVelocity(i, l, r) {
    this.set(l),
      (this.prev = void 0),
      (this.prevFrameValue = i),
      (this.prevUpdatedAt = this.updatedAt - r);
  }
  jump(i, l = !0) {
    this.updateAndNotify(i),
      (this.prev = i),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      l && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var i;
    (i = this.events.change) == null || i.notify(this.current);
  }
  addDependent(i) {
    this.dependents || (this.dependents = new Set()), this.dependents.add(i);
  }
  removeDependent(i) {
    this.dependents && this.dependents.delete(i);
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const i = De.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      i - this.updatedAt > D0
    )
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, D0);
    return qv(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
  }
  start(i) {
    return (
      this.stop(),
      new Promise((l) => {
        (this.hasAnimated = !0),
          (this.animation = i(l)),
          this.events.animationStart && this.events.animationStart.notify();
      }).then(() => {
        this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation();
      })
    );
  }
  stop() {
    this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    var i, l;
    (i = this.dependents) == null || i.clear(),
      (l = this.events.destroy) == null || l.notify(),
      this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function la(e, i) {
  return new K3(e, i);
}
const hh = (e) => Array.isArray(e);
function Z3(e, i, l) {
  e.hasValue(i) ? e.getValue(i).set(l) : e.addValue(i, la(l));
}
function J3(e) {
  return hh(e) ? e[e.length - 1] || 0 : e;
}
function $3(e, i) {
  const l = nl(e, i);
  let { transitionEnd: r = {}, transition: o = {}, ...c } = l || {};
  c = { ...c, ...r };
  for (const u in c) {
    const h = J3(c[u]);
    Z3(e, u, h);
  }
}
const Se = (e) => !!(e && e.getVelocity);
function W3(e) {
  return !!(Se(e) && e.add);
}
function dh(e, i) {
  const l = e.getValue('willChange');
  if (W3(l)) return l.add(i);
  if (!l && Mi.WillChange) {
    const r = new Mi.WillChange('auto');
    e.addValue('willChange', r), r.add(i);
  }
}
function sd(e) {
  return e.replace(/([A-Z])/g, (i) => `-${i.toLowerCase()}`);
}
const tz = 'framerAppearId',
  wx = 'data-' + sd(tz);
function Ex(e) {
  return e.props[wx];
}
function ez({ protectedKeys: e, needsAnimating: i }, l) {
  const r = e.hasOwnProperty(l) && i[l] !== !0;
  return (i[l] = !1), r;
}
function kx(e, i, { delay: l = 0, transitionOverride: r, type: o } = {}) {
  let { transition: c, transitionEnd: u, ...h } = i;
  const m = e.getDefaultTransition();
  c = c ? Tx(c, m) : m;
  const p = c == null ? void 0 : c.reduceMotion;
  r && (c = r);
  const g = [],
    y = o && e.animationState && e.animationState.getState()[o];
  for (const x in h) {
    const b = e.getValue(x, e.latestValues[x] ?? null),
      T = h[x];
    if (T === void 0 || (y && ez(y, x))) continue;
    const M = { delay: l, ...ld(c || {}, x) },
      D = b.get();
    if (
      D !== void 0 &&
      !b.isAnimating() &&
      !Array.isArray(T) &&
      T === D &&
      !M.velocity
    ) {
      Yt.update(() => b.set(T));
      continue;
    }
    let E = !1;
    if (window.MotionHandoffAnimation) {
      const Y = Ex(e);
      if (Y) {
        const Q = window.MotionHandoffAnimation(Y, x, Yt);
        Q !== null && ((M.startTime = Q), (E = !0));
      }
    }
    dh(e, x);
    const L = p ?? e.shouldReduceMotion;
    b.start(ad(x, b, T, L && Ax.has(x) ? { type: !1 } : M, e, E));
    const R = b.animation;
    R && g.push(R);
  }
  if (u) {
    const x = () =>
      Yt.update(() => {
        u && $3(e, u);
      });
    g.length ? Promise.all(g).then(x) : x();
  }
  return g;
}
function ph(e, i, l = {}) {
  var m;
  const r = nl(
    e,
    i,
    l.type === 'exit'
      ? (m = e.presenceContext) == null
        ? void 0
        : m.custom
      : void 0,
  );
  let { transition: o = e.getDefaultTransition() || {} } = r || {};
  l.transitionOverride && (o = l.transitionOverride);
  const c = r ? () => Promise.all(kx(e, r, l)) : () => Promise.resolve(),
    u =
      e.variantChildren && e.variantChildren.size
        ? (p = 0) => {
            const {
              delayChildren: g = 0,
              staggerChildren: y,
              staggerDirection: x,
            } = o;
            return nz(e, i, p, g, y, x, l);
          }
        : () => Promise.resolve(),
    { when: h } = o;
  if (h) {
    const [p, g] = h === 'beforeChildren' ? [c, u] : [u, c];
    return p().then(() => g());
  } else return Promise.all([c(), u(l.delay)]);
}
function nz(e, i, l = 0, r = 0, o = 0, c = 1, u) {
  const h = [];
  for (const m of e.variantChildren)
    m.notify('AnimationStart', i),
      h.push(
        ph(m, i, {
          ...u,
          delay:
            l +
            (typeof r == 'function' ? 0 : r) +
            bx(e.variantChildren, m, r, o, c),
        }).then(() => m.notify('AnimationComplete', i)),
      );
  return Promise.all(h);
}
function iz(e, i, l = {}) {
  e.notify('AnimationStart', i);
  let r;
  if (Array.isArray(i)) {
    const o = i.map((c) => ph(e, c, l));
    r = Promise.all(o);
  } else if (typeof i == 'string') r = ph(e, i, l);
  else {
    const o = typeof i == 'function' ? nl(e, i, l.custom) : i;
    r = Promise.all(kx(e, o, l));
  }
  return r.then(() => {
    e.notify('AnimationComplete', i);
  });
}
const lz = { test: (e) => e === 'auto', parse: (e) => e },
  Cx = (e) => (i) => i.test(e),
  Mx = [sa, ut, Mn, Ei, zD, DD, lz],
  z0 = (e) => Mx.find(Cx(e));
function az(e) {
  return typeof e == 'number'
    ? e === 0
    : e !== null
      ? e === 'none' || e === '0' || Uv(e)
      : !0;
}
const rz = new Set(['brightness', 'contrast', 'saturate', 'opacity']);
function sz(e) {
  const [i, l] = e.slice(0, -1).split('(');
  if (i === 'drop-shadow') return e;
  const [r] = l.match($h) || [];
  if (!r) return e;
  const o = l.replace(r, '');
  let c = rz.has(i) ? 1 : 0;
  return r !== l && (c *= 100), i + '(' + c + o + ')';
}
const oz = /\b([a-z-]*)\(.*?\)/gu,
  mh = {
    ...bn,
    getAnimatableNone: (e) => {
      const i = e.match(oz);
      return i ? i.map(sz).join(' ') : e;
    },
  },
  gh = {
    ...bn,
    getAnimatableNone: (e) => {
      const i = bn.parse(e);
      return bn.createTransformer(e)(
        i.map((r) =>
          typeof r == 'number'
            ? 0
            : typeof r == 'object'
              ? { ...r, alpha: 1 }
              : r,
        ),
      );
    },
  },
  O0 = { ...sa, transform: Math.round },
  uz = {
    rotate: Ei,
    rotateX: Ei,
    rotateY: Ei,
    rotateZ: Ei,
    scale: io,
    scaleX: io,
    scaleY: io,
    scaleZ: io,
    skew: Ei,
    skewX: Ei,
    skewY: Ei,
    distance: ut,
    translateX: ut,
    translateY: ut,
    translateZ: ut,
    x: ut,
    y: ut,
    z: ut,
    perspective: ut,
    transformPerspective: ut,
    opacity: Ar,
    originX: y0,
    originY: y0,
    originZ: ut,
  },
  od = {
    borderWidth: ut,
    borderTopWidth: ut,
    borderRightWidth: ut,
    borderBottomWidth: ut,
    borderLeftWidth: ut,
    borderRadius: ut,
    borderTopLeftRadius: ut,
    borderTopRightRadius: ut,
    borderBottomRightRadius: ut,
    borderBottomLeftRadius: ut,
    width: ut,
    maxWidth: ut,
    height: ut,
    maxHeight: ut,
    top: ut,
    right: ut,
    bottom: ut,
    left: ut,
    inset: ut,
    insetBlock: ut,
    insetBlockStart: ut,
    insetBlockEnd: ut,
    insetInline: ut,
    insetInlineStart: ut,
    insetInlineEnd: ut,
    padding: ut,
    paddingTop: ut,
    paddingRight: ut,
    paddingBottom: ut,
    paddingLeft: ut,
    paddingBlock: ut,
    paddingBlockStart: ut,
    paddingBlockEnd: ut,
    paddingInline: ut,
    paddingInlineStart: ut,
    paddingInlineEnd: ut,
    margin: ut,
    marginTop: ut,
    marginRight: ut,
    marginBottom: ut,
    marginLeft: ut,
    marginBlock: ut,
    marginBlockStart: ut,
    marginBlockEnd: ut,
    marginInline: ut,
    marginInlineStart: ut,
    marginInlineEnd: ut,
    fontSize: ut,
    backgroundPositionX: ut,
    backgroundPositionY: ut,
    ...uz,
    zIndex: O0,
    fillOpacity: Ar,
    strokeOpacity: Ar,
    numOctaves: O0,
  },
  cz = {
    ...od,
    color: ue,
    backgroundColor: ue,
    outlineColor: ue,
    fill: ue,
    stroke: ue,
    borderColor: ue,
    borderTopColor: ue,
    borderRightColor: ue,
    borderBottomColor: ue,
    borderLeftColor: ue,
    filter: mh,
    WebkitFilter: mh,
    mask: gh,
    WebkitMask: gh,
  },
  Dx = (e) => cz[e],
  fz = new Set([mh, gh]);
function zx(e, i) {
  let l = Dx(e);
  return (
    fz.has(l) || (l = bn), l.getAnimatableNone ? l.getAnimatableNone(i) : void 0
  );
}
const hz = new Set(['auto', 'none', '0']);
function dz(e, i, l) {
  let r = 0,
    o;
  for (; r < e.length && !o; ) {
    const c = e[r];
    typeof c == 'string' && !hz.has(c) && ia(c).values.length && (o = e[r]),
      r++;
  }
  if (o && l) for (const c of i) e[c] = zx(l, o);
}
class pz extends id {
  constructor(i, l, r, o, c) {
    super(i, l, r, o, c, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: i, element: l, name: r } = this;
    if (!l || !l.current) return;
    super.readKeyframes();
    for (let g = 0; g < i.length; g++) {
      let y = i[g];
      if (typeof y == 'string' && ((y = y.trim()), Jh(y))) {
        const x = Sx(y, l.current);
        x !== void 0 && (i[g] = x),
          g === i.length - 1 && (this.finalKeyframe = y);
      }
    }
    if ((this.resolveNoneKeyframes(), !Ax.has(r) || i.length !== 2)) return;
    const [o, c] = i,
      u = z0(o),
      h = z0(c),
      m = g0(o),
      p = g0(c);
    if (m !== p && Ci[r]) {
      this.needsMeasurement = !0;
      return;
    }
    if (u !== h)
      if (E0(u) && E0(h))
        for (let g = 0; g < i.length; g++) {
          const y = i[g];
          typeof y == 'string' && (i[g] = parseFloat(y));
        }
      else Ci[r] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: i, name: l } = this,
      r = [];
    for (let o = 0; o < i.length; o++) (i[o] === null || az(i[o])) && r.push(o);
    r.length && dz(i, r, l);
  }
  measureInitialState() {
    const { element: i, unresolvedKeyframes: l, name: r } = this;
    if (!i || !i.current) return;
    r === 'height' && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = Ci[r](
        i.measureViewportBox(),
        window.getComputedStyle(i.current),
      )),
      (l[0] = this.measuredOrigin);
    const o = l[l.length - 1];
    o !== void 0 && i.getValue(r, o).jump(o, !1);
  }
  measureEndState() {
    var h;
    const { element: i, name: l, unresolvedKeyframes: r } = this;
    if (!i || !i.current) return;
    const o = i.getValue(l);
    o && o.jump(this.measuredOrigin, !1);
    const c = r.length - 1,
      u = r[c];
    (r[c] = Ci[l](i.measureViewportBox(), window.getComputedStyle(i.current))),
      u !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = u),
      (h = this.removedTransforms) != null &&
        h.length &&
        this.removedTransforms.forEach(([m, p]) => {
          i.getValue(m).set(p);
        }),
      this.resolveNoneKeyframes();
  }
}
function Ox(e, i, l) {
  if (e == null) return [];
  if (e instanceof EventTarget) return [e];
  if (typeof e == 'string') {
    let r = document;
    const o = (l == null ? void 0 : l[e]) ?? r.querySelectorAll(e);
    return o ? Array.from(o) : [];
  }
  return Array.from(e).filter((r) => r != null);
}
const Rx = (e, i) => (i && typeof e == 'number' ? i.transform(e) : e);
function uo(e) {
  return Vv(e) && 'offsetHeight' in e && !('ownerSVGElement' in e);
}
const { schedule: ud } = $v(queueMicrotask, !1),
  vn = { x: !1, y: !1 };
function _x() {
  return vn.x || vn.y;
}
function mz(e) {
  return e === 'x' || e === 'y'
    ? vn[e]
      ? null
      : ((vn[e] = !0),
        () => {
          vn[e] = !1;
        })
    : vn.x || vn.y
      ? null
      : ((vn.x = vn.y = !0),
        () => {
          vn.x = vn.y = !1;
        });
}
function Nx(e, i) {
  const l = Ox(e),
    r = new AbortController(),
    o = { passive: !0, ...i, signal: r.signal };
  return [l, o, () => r.abort()];
}
function gz(e) {
  return !(e.pointerType === 'touch' || _x());
}
function yz(e, i, l = {}) {
  const [r, o, c] = Nx(e, l);
  return (
    r.forEach((u) => {
      let h = !1,
        m = !1,
        p;
      const g = () => {
          u.removeEventListener('pointerleave', T);
        },
        y = (D) => {
          p && (p(D), (p = void 0)), g();
        },
        x = (D) => {
          (h = !1),
            window.removeEventListener('pointerup', x),
            window.removeEventListener('pointercancel', x),
            m && ((m = !1), y(D));
        },
        b = () => {
          (h = !0),
            window.addEventListener('pointerup', x, o),
            window.addEventListener('pointercancel', x, o);
        },
        T = (D) => {
          if (D.pointerType !== 'touch') {
            if (h) {
              m = !0;
              return;
            }
            y(D);
          }
        },
        M = (D) => {
          if (!gz(D)) return;
          m = !1;
          const E = i(u, D);
          typeof E == 'function' &&
            ((p = E), u.addEventListener('pointerleave', T, o));
        };
      u.addEventListener('pointerenter', M, o),
        u.addEventListener('pointerdown', b, o);
    }),
    c
  );
}
const Lx = (e, i) => (i ? (e === i ? !0 : Lx(e, i.parentElement)) : !1),
  cd = (e) =>
    e.pointerType === 'mouse'
      ? typeof e.button != 'number' || e.button <= 0
      : e.isPrimary !== !1,
  vz = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A']);
function xz(e) {
  return vz.has(e.tagName) || e.isContentEditable === !0;
}
const bz = new Set(['INPUT', 'SELECT', 'TEXTAREA']);
function Sz(e) {
  return bz.has(e.tagName) || e.isContentEditable === !0;
}
const co = new WeakSet();
function R0(e) {
  return (i) => {
    i.key === 'Enter' && e(i);
  };
}
function Of(e, i) {
  e.dispatchEvent(
    new PointerEvent('pointer' + i, { isPrimary: !0, bubbles: !0 }),
  );
}
const Tz = (e, i) => {
  const l = e.currentTarget;
  if (!l) return;
  const r = R0(() => {
    if (co.has(l)) return;
    Of(l, 'down');
    const o = R0(() => {
        Of(l, 'up');
      }),
      c = () => Of(l, 'cancel');
    l.addEventListener('keyup', o, i), l.addEventListener('blur', c, i);
  });
  l.addEventListener('keydown', r, i),
    l.addEventListener('blur', () => l.removeEventListener('keydown', r), i);
};
function _0(e) {
  return cd(e) && !_x();
}
const N0 = new WeakSet();
function Az(e, i, l = {}) {
  const [r, o, c] = Nx(e, l),
    u = (h) => {
      const m = h.currentTarget;
      if (!_0(h) || N0.has(h)) return;
      co.add(m), l.stopPropagation && N0.add(h);
      const p = i(m, h),
        g = (b, T) => {
          window.removeEventListener('pointerup', y),
            window.removeEventListener('pointercancel', x),
            co.has(m) && co.delete(m),
            _0(b) && typeof p == 'function' && p(b, { success: T });
        },
        y = (b) => {
          g(
            b,
            m === window ||
              m === document ||
              l.useGlobalTarget ||
              Lx(m, b.target),
          );
        },
        x = (b) => {
          g(b, !1);
        };
      window.addEventListener('pointerup', y, o),
        window.addEventListener('pointercancel', x, o);
    };
  return (
    r.forEach((h) => {
      (l.useGlobalTarget ? window : h).addEventListener('pointerdown', u, o),
        uo(h) &&
          (h.addEventListener('focus', (p) => Tz(p, o)),
          !xz(h) && !h.hasAttribute('tabindex') && (h.tabIndex = 0));
    }),
    c
  );
}
function fd(e) {
  return Vv(e) && 'ownerSVGElement' in e;
}
const fo = new WeakMap();
let ki;
const jx = (e, i, l) => (r, o) =>
    o && o[0]
      ? o[0][e + 'Size']
      : fd(r) && 'getBBox' in r
        ? r.getBBox()[i]
        : r[l],
  wz = jx('inline', 'width', 'offsetWidth'),
  Ez = jx('block', 'height', 'offsetHeight');
function kz({ target: e, borderBoxSize: i }) {
  var l;
  (l = fo.get(e)) == null ||
    l.forEach((r) => {
      r(e, {
        get width() {
          return wz(e, i);
        },
        get height() {
          return Ez(e, i);
        },
      });
    });
}
function Cz(e) {
  e.forEach(kz);
}
function Mz() {
  typeof ResizeObserver > 'u' || (ki = new ResizeObserver(Cz));
}
function Dz(e, i) {
  ki || Mz();
  const l = Ox(e);
  return (
    l.forEach((r) => {
      let o = fo.get(r);
      o || ((o = new Set()), fo.set(r, o)),
        o.add(i),
        ki == null || ki.observe(r);
    }),
    () => {
      l.forEach((r) => {
        const o = fo.get(r);
        o == null || o.delete(i),
          (o != null && o.size) || ki == null || ki.unobserve(r);
      });
    }
  );
}
const ho = new Set();
let Wl;
function zz() {
  (Wl = () => {
    const e = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      },
    };
    ho.forEach((i) => i(e));
  }),
    window.addEventListener('resize', Wl);
}
function Oz(e) {
  return (
    ho.add(e),
    Wl || zz(),
    () => {
      ho.delete(e),
        !ho.size &&
          typeof Wl == 'function' &&
          (window.removeEventListener('resize', Wl), (Wl = void 0));
    }
  );
}
function L0(e, i) {
  return typeof e == 'function' ? Oz(e) : Dz(e, i);
}
function Rz(e) {
  return fd(e) && e.tagName === 'svg';
}
const _z = [...Mx, ue, bn],
  Nz = (e) => _z.find(Cx(e)),
  j0 = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  ta = () => ({ x: j0(), y: j0() }),
  B0 = () => ({ min: 0, max: 0 }),
  he = () => ({ x: B0(), y: B0() }),
  Lz = new WeakMap();
function Bo(e) {
  return e !== null && typeof e == 'object' && typeof e.start == 'function';
}
function wr(e) {
  return typeof e == 'string' || Array.isArray(e);
}
const hd = [
    'animate',
    'whileInView',
    'whileFocus',
    'whileHover',
    'whileTap',
    'whileDrag',
    'exit',
  ],
  dd = ['initial', ...hd];
function Vo(e) {
  return Bo(e.animate) || dd.some((i) => wr(e[i]));
}
function Bx(e) {
  return !!(Vo(e) || e.variants);
}
function jz(e, i, l) {
  for (const r in i) {
    const o = i[r],
      c = l[r];
    if (Se(o)) e.addValue(r, o);
    else if (Se(c)) e.addValue(r, la(o, { owner: e }));
    else if (c !== o)
      if (e.hasValue(r)) {
        const u = e.getValue(r);
        u.liveStyle === !0 ? u.jump(o) : u.hasAnimated || u.set(o);
      } else {
        const u = e.getStaticValue(r);
        e.addValue(r, la(u !== void 0 ? u : o, { owner: e }));
      }
  }
  for (const r in l) i[r] === void 0 && e.removeValue(r);
  return i;
}
const yh = { current: null },
  Vx = { current: !1 },
  Bz = typeof window < 'u';
function Vz() {
  if (((Vx.current = !0), !!Bz))
    if (window.matchMedia) {
      const e = window.matchMedia('(prefers-reduced-motion)'),
        i = () => (yh.current = e.matches);
      e.addEventListener('change', i), i();
    } else yh.current = !1;
}
const V0 = [
  'AnimationStart',
  'AnimationComplete',
  'Update',
  'BeforeLayoutMeasure',
  'LayoutMeasure',
  'LayoutAnimationStart',
  'LayoutAnimationComplete',
];
let ko = {};
function Ux(e) {
  ko = e;
}
function Uz() {
  return ko;
}
class Hz {
  scrapeMotionValuesFromProps(i, l, r) {
    return {};
  }
  constructor(
    {
      parent: i,
      props: l,
      presenceContext: r,
      reducedMotionConfig: o,
      skipAnimations: c,
      blockInitialAnimation: u,
      visualState: h,
    },
    m = {},
  ) {
    (this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.shouldSkipAnimations = !1),
      (this.values = new Map()),
      (this.KeyframeResolver = id),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.hasBeenMounted = !1),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify('Update', this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection,
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const b = De.now();
        this.renderScheduledAt < b &&
          ((this.renderScheduledAt = b), Yt.render(this.render, !1, !0));
      });
    const { latestValues: p, renderState: g } = h;
    (this.latestValues = p),
      (this.baseTarget = { ...p }),
      (this.initialValues = l.initial ? { ...p } : {}),
      (this.renderState = g),
      (this.parent = i),
      (this.props = l),
      (this.presenceContext = r),
      (this.depth = i ? i.depth + 1 : 0),
      (this.reducedMotionConfig = o),
      (this.skipAnimationsConfig = c),
      (this.options = m),
      (this.blockInitialAnimation = !!u),
      (this.isControllingVariants = Vo(l)),
      (this.isVariantNode = Bx(l)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(i && i.current));
    const { willChange: y, ...x } = this.scrapeMotionValuesFromProps(
      l,
      {},
      this,
    );
    for (const b in x) {
      const T = x[b];
      p[b] !== void 0 && Se(T) && T.set(p[b]);
    }
  }
  mount(i) {
    var l, r;
    if (this.hasBeenMounted)
      for (const o in this.initialValues)
        (l = this.values.get(o)) == null || l.jump(this.initialValues[o]),
          (this.latestValues[o] = this.initialValues[o]);
    (this.current = i),
      Lz.set(i, this),
      this.projection && !this.projection.instance && this.projection.mount(i),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((o, c) => this.bindToMotionValue(c, o)),
      this.reducedMotionConfig === 'never'
        ? (this.shouldReduceMotion = !1)
        : this.reducedMotionConfig === 'always'
          ? (this.shouldReduceMotion = !0)
          : (Vx.current || Vz(), (this.shouldReduceMotion = yh.current)),
      (this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1),
      (r = this.parent) == null || r.addChild(this),
      this.update(this.props, this.presenceContext),
      (this.hasBeenMounted = !0);
  }
  unmount() {
    var i;
    this.projection && this.projection.unmount(),
      Di(this.notifyUpdate),
      Di(this.render),
      this.valueSubscriptions.forEach((l) => l()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      (i = this.parent) == null || i.removeChild(this);
    for (const l in this.events) this.events[l].clear();
    for (const l in this.features) {
      const r = this.features[l];
      r && (r.unmount(), (r.isMounted = !1));
    }
    this.current = null;
  }
  addChild(i) {
    this.children.add(i),
      this.enteringChildren ?? (this.enteringChildren = new Set()),
      this.enteringChildren.add(i);
  }
  removeChild(i) {
    this.children.delete(i),
      this.enteringChildren && this.enteringChildren.delete(i);
  }
  bindToMotionValue(i, l) {
    if (
      (this.valueSubscriptions.has(i) && this.valueSubscriptions.get(i)(),
      l.accelerate && xx.has(i) && this.current instanceof HTMLElement)
    ) {
      const {
          factory: u,
          keyframes: h,
          times: m,
          ease: p,
          duration: g,
        } = l.accelerate,
        y = new yx({
          element: this.current,
          name: i,
          keyframes: h,
          times: m,
          ease: p,
          duration: Je(g),
        }),
        x = u(y);
      this.valueSubscriptions.set(i, () => {
        x(), y.cancel();
      });
      return;
    }
    const r = ua.has(i);
    r && this.onBindTransform && this.onBindTransform();
    const o = l.on('change', (u) => {
      (this.latestValues[i] = u),
        this.props.onUpdate && Yt.preRender(this.notifyUpdate),
        r && this.projection && (this.projection.isTransformDirty = !0),
        this.scheduleRender();
    });
    let c;
    typeof window < 'u' &&
      window.MotionCheckAppearSync &&
      (c = window.MotionCheckAppearSync(this, i, l)),
      this.valueSubscriptions.set(i, () => {
        o(), c && c(), l.owner && l.stop();
      });
  }
  sortNodePosition(i) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== i.type
      ? 0
      : this.sortInstanceNodePosition(this.current, i.current);
  }
  updateFeatures() {
    let i = 'animation';
    for (i in ko) {
      const l = ko[i];
      if (!l) continue;
      const { isEnabled: r, Feature: o } = l;
      if (
        (!this.features[i] &&
          o &&
          r(this.props) &&
          (this.features[i] = new o(this)),
        this.features[i])
      ) {
        const c = this.features[i];
        c.isMounted ? c.update() : (c.mount(), (c.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : he();
  }
  getStaticValue(i) {
    return this.latestValues[i];
  }
  setStaticValue(i, l) {
    this.latestValues[i] = l;
  }
  update(i, l) {
    (i.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = i),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = l);
    for (let r = 0; r < V0.length; r++) {
      const o = V0[r];
      this.propEventSubscriptions[o] &&
        (this.propEventSubscriptions[o](),
        delete this.propEventSubscriptions[o]);
      const c = 'on' + o,
        u = i[c];
      u && (this.propEventSubscriptions[o] = this.on(o, u));
    }
    (this.prevMotionValues = jz(
      this,
      this.scrapeMotionValuesFromProps(i, this.prevProps || {}, this),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  getVariant(i) {
    return this.props.variants ? this.props.variants[i] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
        ? this.parent.getClosestVariantNode()
        : void 0;
  }
  addVariantChild(i) {
    const l = this.getClosestVariantNode();
    if (l)
      return (
        l.variantChildren && l.variantChildren.add(i),
        () => l.variantChildren.delete(i)
      );
  }
  addValue(i, l) {
    const r = this.values.get(i);
    l !== r &&
      (r && this.removeValue(i),
      this.bindToMotionValue(i, l),
      this.values.set(i, l),
      (this.latestValues[i] = l.get()));
  }
  removeValue(i) {
    this.values.delete(i);
    const l = this.valueSubscriptions.get(i);
    l && (l(), this.valueSubscriptions.delete(i)),
      delete this.latestValues[i],
      this.removeValueFromRenderState(i, this.renderState);
  }
  hasValue(i) {
    return this.values.has(i);
  }
  getValue(i, l) {
    if (this.props.values && this.props.values[i]) return this.props.values[i];
    let r = this.values.get(i);
    return (
      r === void 0 &&
        l !== void 0 &&
        ((r = la(l === null ? void 0 : l, { owner: this })),
        this.addValue(i, r)),
      r
    );
  }
  readValue(i, l) {
    let r =
      this.latestValues[i] !== void 0 || !this.current
        ? this.latestValues[i]
        : (this.getBaseTargetFromProps(this.props, i) ??
          this.readValueFromInstance(this.current, i, this.options));
    return (
      r != null &&
        (typeof r == 'string' && (Bv(r) || Uv(r))
          ? (r = parseFloat(r))
          : !Nz(r) && bn.test(l) && (r = zx(i, l)),
        this.setBaseTarget(i, Se(r) ? r.get() : r)),
      Se(r) ? r.get() : r
    );
  }
  setBaseTarget(i, l) {
    this.baseTarget[i] = l;
  }
  getBaseTarget(i) {
    var c;
    const { initial: l } = this.props;
    let r;
    if (typeof l == 'string' || typeof l == 'object') {
      const u = rd(
        this.props,
        l,
        (c = this.presenceContext) == null ? void 0 : c.custom,
      );
      u && (r = u[i]);
    }
    if (l && r !== void 0) return r;
    const o = this.getBaseTargetFromProps(this.props, i);
    return o !== void 0 && !Se(o)
      ? o
      : this.initialValues[i] !== void 0 && r === void 0
        ? void 0
        : this.baseTarget[i];
  }
  on(i, l) {
    return this.events[i] || (this.events[i] = new Qh()), this.events[i].add(l);
  }
  notify(i, ...l) {
    this.events[i] && this.events[i].notify(...l);
  }
  scheduleRenderMicrotask() {
    ud.render(this.render);
  }
}
class Hx extends Hz {
  constructor() {
    super(...arguments), (this.KeyframeResolver = pz);
  }
  sortInstanceNodePosition(i, l) {
    return i.compareDocumentPosition(l) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(i, l) {
    const r = i.style;
    return r ? r[l] : void 0;
  }
  removeValueFromRenderState(i, { vars: l, style: r }) {
    delete l[i], delete r[i];
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: i } = this.props;
    Se(i) &&
      (this.childSubscription = i.on('change', (l) => {
        this.current && (this.current.textContent = `${l}`);
      }));
  }
}
class Oi {
  constructor(i) {
    (this.isMounted = !1), (this.node = i);
  }
  update() {}
}
function qx({ top: e, left: i, right: l, bottom: r }) {
  return { x: { min: i, max: l }, y: { min: e, max: r } };
}
function qz({ x: e, y: i }) {
  return { top: i.min, right: e.max, bottom: i.max, left: e.min };
}
function Pz(e, i) {
  if (!i) return e;
  const l = i({ x: e.left, y: e.top }),
    r = i({ x: e.right, y: e.bottom });
  return { top: l.y, left: l.x, bottom: r.y, right: r.x };
}
function Rf(e) {
  return e === void 0 || e === 1;
}
function vh({ scale: e, scaleX: i, scaleY: l }) {
  return !Rf(e) || !Rf(i) || !Rf(l);
}
function $i(e) {
  return (
    vh(e) ||
    Px(e) ||
    e.z ||
    e.rotate ||
    e.rotateX ||
    e.rotateY ||
    e.skewX ||
    e.skewY
  );
}
function Px(e) {
  return U0(e.x) || U0(e.y);
}
function U0(e) {
  return e && e !== '0%';
}
function Co(e, i, l) {
  const r = e - l,
    o = i * r;
  return l + o;
}
function H0(e, i, l, r, o) {
  return o !== void 0 && (e = Co(e, o, r)), Co(e, l, r) + i;
}
function xh(e, i = 0, l = 1, r, o) {
  (e.min = H0(e.min, i, l, r, o)), (e.max = H0(e.max, i, l, r, o));
}
function Gx(e, { x: i, y: l }) {
  xh(e.x, i.translate, i.scale, i.originPoint),
    xh(e.y, l.translate, l.scale, l.originPoint);
}
const q0 = 0.999999999999,
  P0 = 1.0000000000001;
function Gz(e, i, l, r = !1) {
  var h;
  const o = l.length;
  if (!o) return;
  i.x = i.y = 1;
  let c, u;
  for (let m = 0; m < o; m++) {
    (c = l[m]), (u = c.projectionDelta);
    const { visualElement: p } = c.options;
    (p && p.props.style && p.props.style.display === 'contents') ||
      (r &&
        c.options.layoutScroll &&
        c.scroll &&
        c !== c.root &&
        (Cn(e.x, -c.scroll.offset.x), Cn(e.y, -c.scroll.offset.y)),
      u && ((i.x *= u.x.scale), (i.y *= u.y.scale), Gx(e, u)),
      r &&
        $i(c.latestValues) &&
        po(e, c.latestValues, (h = c.layout) == null ? void 0 : h.layoutBox));
  }
  i.x < P0 && i.x > q0 && (i.x = 1), i.y < P0 && i.y > q0 && (i.y = 1);
}
function Cn(e, i) {
  (e.min += i), (e.max += i);
}
function G0(e, i, l, r, o = 0.5) {
  const c = Kt(e.min, e.max, o);
  xh(e, i, l, c, r);
}
function Y0(e, i) {
  return typeof e == 'string' ? (parseFloat(e) / 100) * (i.max - i.min) : e;
}
function po(e, i, l) {
  const r = l ?? e;
  G0(e.x, Y0(i.x, r.x), i.scaleX, i.scale, i.originX),
    G0(e.y, Y0(i.y, r.y), i.scaleY, i.scale, i.originY);
}
function Yx(e, i) {
  return qx(Pz(e.getBoundingClientRect(), i));
}
function Yz(e, i, l) {
  const r = Yx(e, l),
    { scroll: o } = i;
  return o && (Cn(r.x, o.offset.x), Cn(r.y, o.offset.y)), r;
}
const Fz = {
    x: 'translateX',
    y: 'translateY',
    z: 'translateZ',
    transformPerspective: 'perspective',
  },
  Iz = oa.length;
function Xz(e, i, l) {
  let r = '',
    o = !0;
  for (let c = 0; c < Iz; c++) {
    const u = oa[c],
      h = e[u];
    if (h === void 0) continue;
    let m = !0;
    if (typeof h == 'number') m = h === (u.startsWith('scale') ? 1 : 0);
    else {
      const p = parseFloat(h);
      m = u.startsWith('scale') ? p === 1 : p === 0;
    }
    if (!m || l) {
      const p = Rx(h, od[u]);
      if (!m) {
        o = !1;
        const g = Fz[u] || u;
        r += `${g}(${p}) `;
      }
      l && (i[u] = p);
    }
  }
  return (r = r.trim()), l ? (r = l(i, o ? '' : r)) : o && (r = 'none'), r;
}
function pd(e, i, l) {
  const { style: r, vars: o, transformOrigin: c } = e;
  let u = !1,
    h = !1;
  for (const m in i) {
    const p = i[m];
    if (ua.has(m)) {
      u = !0;
      continue;
    } else if (tx(m)) {
      o[m] = p;
      continue;
    } else {
      const g = Rx(p, od[m]);
      m.startsWith('origin') ? ((h = !0), (c[m] = g)) : (r[m] = g);
    }
  }
  if (
    (i.transform ||
      (u || l
        ? (r.transform = Xz(i, e.transform, l))
        : r.transform && (r.transform = 'none')),
    h)
  ) {
    const { originX: m = '50%', originY: p = '50%', originZ: g = 0 } = c;
    r.transformOrigin = `${m} ${p} ${g}`;
  }
}
function Fx(e, { style: i, vars: l }, r, o) {
  const c = e.style;
  let u;
  for (u in i) c[u] = i[u];
  o == null || o.applyProjectionStyles(c, r);
  for (u in l) c.setProperty(u, l[u]);
}
function F0(e, i) {
  return i.max === i.min ? 0 : (e / (i.max - i.min)) * 100;
}
const ur = {
    correct: (e, i) => {
      if (!i.target) return e;
      if (typeof e == 'string')
        if (ut.test(e)) e = parseFloat(e);
        else return e;
      const l = F0(e, i.target.x),
        r = F0(e, i.target.y);
      return `${l}% ${r}%`;
    },
  },
  Qz = {
    correct: (e, { treeScale: i, projectionDelta: l }) => {
      const r = e,
        o = bn.parse(e);
      if (o.length > 5) return r;
      const c = bn.createTransformer(e),
        u = typeof o[0] != 'number' ? 1 : 0,
        h = l.x.scale * i.x,
        m = l.y.scale * i.y;
      (o[0 + u] /= h), (o[1 + u] /= m);
      const p = Kt(h, m, 0.5);
      return (
        typeof o[2 + u] == 'number' && (o[2 + u] /= p),
        typeof o[3 + u] == 'number' && (o[3 + u] /= p),
        c(o)
      );
    },
  },
  bh = {
    borderRadius: {
      ...ur,
      applyTo: [
        'borderTopLeftRadius',
        'borderTopRightRadius',
        'borderBottomLeftRadius',
        'borderBottomRightRadius',
      ],
    },
    borderTopLeftRadius: ur,
    borderTopRightRadius: ur,
    borderBottomLeftRadius: ur,
    borderBottomRightRadius: ur,
    boxShadow: Qz,
  };
function Ix(e, { layout: i, layoutId: l }) {
  return (
    ua.has(e) ||
    e.startsWith('origin') ||
    ((i || l !== void 0) && (!!bh[e] || e === 'opacity'))
  );
}
function md(e, i, l) {
  var u;
  const r = e.style,
    o = i == null ? void 0 : i.style,
    c = {};
  if (!r) return c;
  for (const h in r)
    (Se(r[h]) ||
      (o && Se(o[h])) ||
      Ix(h, e) ||
      ((u = l == null ? void 0 : l.getValue(h)) == null
        ? void 0
        : u.liveStyle) !== void 0) &&
      (c[h] = r[h]);
  return c;
}
function Kz(e) {
  return window.getComputedStyle(e);
}
class Zz extends Hx {
  constructor() {
    super(...arguments), (this.type = 'html'), (this.renderInstance = Fx);
  }
  readValueFromInstance(i, l) {
    var r;
    if (ua.has(l))
      return (r = this.projection) != null && r.isProjecting ? rh(l) : g3(i, l);
    {
      const o = Kz(i),
        c = (tx(l) ? o.getPropertyValue(l) : o[l]) || 0;
      return typeof c == 'string' ? c.trim() : c;
    }
  }
  measureInstanceViewportBox(i, { transformPagePoint: l }) {
    return Yx(i, l);
  }
  build(i, l, r) {
    pd(i, l, r.transformTemplate);
  }
  scrapeMotionValuesFromProps(i, l, r) {
    return md(i, l, r);
  }
}
const Jz = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
  $z = { offset: 'strokeDashoffset', array: 'strokeDasharray' };
function Wz(e, i, l = 1, r = 0, o = !0) {
  e.pathLength = 1;
  const c = o ? Jz : $z;
  (e[c.offset] = `${-r}`), (e[c.array] = `${i} ${l}`);
}
const t4 = ['offsetDistance', 'offsetPath', 'offsetRotate', 'offsetAnchor'];
function Xx(
  e,
  {
    attrX: i,
    attrY: l,
    attrScale: r,
    pathLength: o,
    pathSpacing: c = 1,
    pathOffset: u = 0,
    ...h
  },
  m,
  p,
  g,
) {
  if ((pd(e, h, p), m)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  (e.attrs = e.style), (e.style = {});
  const { attrs: y, style: x } = e;
  y.transform && ((x.transform = y.transform), delete y.transform),
    (x.transform || y.transformOrigin) &&
      ((x.transformOrigin = y.transformOrigin ?? '50% 50%'),
      delete y.transformOrigin),
    x.transform &&
      ((x.transformBox = (g == null ? void 0 : g.transformBox) ?? 'fill-box'),
      delete y.transformBox);
  for (const b of t4) y[b] !== void 0 && ((x[b] = y[b]), delete y[b]);
  i !== void 0 && (y.x = i),
    l !== void 0 && (y.y = l),
    r !== void 0 && (y.scale = r),
    o !== void 0 && Wz(y, o, c, u, !1);
}
const Qx = new Set([
    'baseFrequency',
    'diffuseConstant',
    'kernelMatrix',
    'kernelUnitLength',
    'keySplines',
    'keyTimes',
    'limitingConeAngle',
    'markerHeight',
    'markerWidth',
    'numOctaves',
    'targetX',
    'targetY',
    'surfaceScale',
    'specularConstant',
    'specularExponent',
    'stdDeviation',
    'tableValues',
    'viewBox',
    'gradientTransform',
    'pathLength',
    'startOffset',
    'textLength',
    'lengthAdjust',
  ]),
  Kx = (e) => typeof e == 'string' && e.toLowerCase() === 'svg';
function e4(e, i, l, r) {
  Fx(e, i, void 0, r);
  for (const o in i.attrs) e.setAttribute(Qx.has(o) ? o : sd(o), i.attrs[o]);
}
function Zx(e, i, l) {
  const r = md(e, i, l);
  for (const o in e)
    if (Se(e[o]) || Se(i[o])) {
      const c =
        oa.indexOf(o) !== -1
          ? 'attr' + o.charAt(0).toUpperCase() + o.substring(1)
          : o;
      r[c] = e[o];
    }
  return r;
}
class n4 extends Hx {
  constructor() {
    super(...arguments),
      (this.type = 'svg'),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = he);
  }
  getBaseTargetFromProps(i, l) {
    return i[l];
  }
  readValueFromInstance(i, l) {
    if (ua.has(l)) {
      const r = Dx(l);
      return (r && r.default) || 0;
    }
    return (l = Qx.has(l) ? l : sd(l)), i.getAttribute(l);
  }
  scrapeMotionValuesFromProps(i, l, r) {
    return Zx(i, l, r);
  }
  build(i, l, r) {
    Xx(i, l, this.isSVGTag, r.transformTemplate, r.style);
  }
  renderInstance(i, l, r, o) {
    e4(i, l, r, o);
  }
  mount(i) {
    (this.isSVGTag = Kx(i.tagName)), super.mount(i);
  }
}
const i4 = dd.length;
function Jx(e) {
  if (!e) return;
  if (!e.isControllingVariants) {
    const l = e.parent ? Jx(e.parent) || {} : {};
    return e.props.initial !== void 0 && (l.initial = e.props.initial), l;
  }
  const i = {};
  for (let l = 0; l < i4; l++) {
    const r = dd[l],
      o = e.props[r];
    (wr(o) || o === !1) && (i[r] = o);
  }
  return i;
}
function $x(e, i) {
  if (!Array.isArray(i)) return !1;
  const l = i.length;
  if (l !== e.length) return !1;
  for (let r = 0; r < l; r++) if (i[r] !== e[r]) return !1;
  return !0;
}
const l4 = [...hd].reverse(),
  a4 = hd.length;
function r4(e) {
  return (i) =>
    Promise.all(i.map(({ animation: l, options: r }) => iz(e, l, r)));
}
function s4(e) {
  let i = r4(e),
    l = I0(),
    r = !0,
    o = !1;
  const c = (p) => (g, y) => {
    var b;
    const x = nl(
      e,
      y,
      p === 'exit'
        ? (b = e.presenceContext) == null
          ? void 0
          : b.custom
        : void 0,
    );
    if (x) {
      const { transition: T, transitionEnd: M, ...D } = x;
      g = { ...g, ...D, ...M };
    }
    return g;
  };
  function u(p) {
    i = p(e);
  }
  function h(p) {
    const { props: g } = e,
      y = Jx(e.parent) || {},
      x = [],
      b = new Set();
    let T = {},
      M = 1 / 0;
    for (let E = 0; E < a4; E++) {
      const L = l4[E],
        R = l[L],
        Y = g[L] !== void 0 ? g[L] : y[L],
        Q = wr(Y),
        V = L === p ? R.isActive : null;
      V === !1 && (M = E);
      let K = Y === y[L] && Y !== g[L] && Q;
      if (
        (K && (r || o) && e.manuallyAnimateOnMount && (K = !1),
        (R.protectedKeys = { ...T }),
        (!R.isActive && V === null) ||
          (!Y && !R.prevProp) ||
          Bo(Y) ||
          typeof Y == 'boolean')
      )
        continue;
      if (L === 'exit' && R.isActive && V !== !0) {
        R.prevResolvedValues && (T = { ...T, ...R.prevResolvedValues });
        continue;
      }
      const $ = o4(R.prevProp, Y);
      let it = $ || (L === p && R.isActive && !K && Q) || (E > M && Q),
        O = !1;
      const J = Array.isArray(Y) ? Y : [Y];
      let et = J.reduce(c(L), {});
      V === !1 && (et = {});
      const { prevResolvedValues: vt = {} } = R,
        st = { ...vt, ...et },
        W = (lt) => {
          (it = !0),
            b.has(lt) && ((O = !0), b.delete(lt)),
            (R.needsAnimating[lt] = !0);
          const pt = e.getValue(lt);
          pt && (pt.liveStyle = !1);
        };
      for (const lt in st) {
        const pt = et[lt],
          w = vt[lt];
        if (T.hasOwnProperty(lt)) continue;
        let C = !1;
        hh(pt) && hh(w) ? (C = !$x(pt, w)) : (C = pt !== w),
          C
            ? pt != null
              ? W(lt)
              : b.add(lt)
            : pt !== void 0 && b.has(lt)
              ? W(lt)
              : (R.protectedKeys[lt] = !0);
      }
      (R.prevProp = Y),
        (R.prevResolvedValues = et),
        R.isActive && (T = { ...T, ...et }),
        (r || o) && e.blockInitialAnimation && (it = !1);
      const N = K && $;
      it &&
        (!N || O) &&
        x.push(
          ...J.map((lt) => {
            const pt = { type: L };
            if (
              typeof lt == 'string' &&
              (r || o) &&
              !N &&
              e.manuallyAnimateOnMount &&
              e.parent
            ) {
              const { parent: w } = e,
                C = nl(w, lt);
              if (w.enteringChildren && C) {
                const { delayChildren: G } = C.transition || {};
                pt.delay = bx(w.enteringChildren, e, G);
              }
            }
            return { animation: lt, options: pt };
          }),
        );
    }
    if (b.size) {
      const E = {};
      if (typeof g.initial != 'boolean') {
        const L = nl(e, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        L && L.transition && (E.transition = L.transition);
      }
      b.forEach((L) => {
        const R = e.getBaseTarget(L),
          Y = e.getValue(L);
        Y && (Y.liveStyle = !0), (E[L] = R ?? null);
      }),
        x.push({ animation: E });
    }
    let D = !!x.length;
    return (
      r &&
        (g.initial === !1 || g.initial === g.animate) &&
        !e.manuallyAnimateOnMount &&
        (D = !1),
      (r = !1),
      (o = !1),
      D ? i(x) : Promise.resolve()
    );
  }
  function m(p, g) {
    var x;
    if (l[p].isActive === g) return Promise.resolve();
    (x = e.variantChildren) == null ||
      x.forEach((b) => {
        var T;
        return (T = b.animationState) == null ? void 0 : T.setActive(p, g);
      }),
      (l[p].isActive = g);
    const y = h(p);
    for (const b in l) l[b].protectedKeys = {};
    return y;
  }
  return {
    animateChanges: h,
    setActive: m,
    setAnimateFunction: u,
    getState: () => l,
    reset: () => {
      (l = I0()), (o = !0);
    },
  };
}
function o4(e, i) {
  return typeof i == 'string' ? i !== e : Array.isArray(i) ? !$x(i, e) : !1;
}
function Ji(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function I0() {
  return {
    animate: Ji(!0),
    whileInView: Ji(),
    whileHover: Ji(),
    whileTap: Ji(),
    whileDrag: Ji(),
    whileFocus: Ji(),
    exit: Ji(),
  };
}
function Sh(e, i) {
  (e.min = i.min), (e.max = i.max);
}
function yn(e, i) {
  Sh(e.x, i.x), Sh(e.y, i.y);
}
function X0(e, i) {
  (e.translate = i.translate),
    (e.scale = i.scale),
    (e.originPoint = i.originPoint),
    (e.origin = i.origin);
}
const Wx = 1e-4,
  u4 = 1 - Wx,
  c4 = 1 + Wx,
  tb = 0.01,
  f4 = 0 - tb,
  h4 = 0 + tb;
function ze(e) {
  return e.max - e.min;
}
function d4(e, i, l) {
  return Math.abs(e - i) <= l;
}
function Q0(e, i, l, r = 0.5) {
  (e.origin = r),
    (e.originPoint = Kt(i.min, i.max, e.origin)),
    (e.scale = ze(l) / ze(i)),
    (e.translate = Kt(l.min, l.max, e.origin) - e.originPoint),
    ((e.scale >= u4 && e.scale <= c4) || isNaN(e.scale)) && (e.scale = 1),
    ((e.translate >= f4 && e.translate <= h4) || isNaN(e.translate)) &&
      (e.translate = 0);
}
function gr(e, i, l, r) {
  Q0(e.x, i.x, l.x, r ? r.originX : void 0),
    Q0(e.y, i.y, l.y, r ? r.originY : void 0);
}
function K0(e, i, l, r = 0) {
  const o = r ? Kt(l.min, l.max, r) : l.min;
  (e.min = o + i.min), (e.max = e.min + ze(i));
}
function p4(e, i, l, r) {
  K0(e.x, i.x, l.x, r == null ? void 0 : r.x),
    K0(e.y, i.y, l.y, r == null ? void 0 : r.y);
}
function Z0(e, i, l, r = 0) {
  const o = r ? Kt(l.min, l.max, r) : l.min;
  (e.min = i.min - o), (e.max = e.min + ze(i));
}
function Mo(e, i, l, r) {
  Z0(e.x, i.x, l.x, r == null ? void 0 : r.x),
    Z0(e.y, i.y, l.y, r == null ? void 0 : r.y);
}
function J0(e, i, l, r, o) {
  return (
    (e -= i), (e = Co(e, 1 / l, r)), o !== void 0 && (e = Co(e, 1 / o, r)), e
  );
}
function m4(e, i = 0, l = 1, r = 0.5, o, c = e, u = e) {
  if (
    (Mn.test(i) &&
      ((i = parseFloat(i)), (i = Kt(u.min, u.max, i / 100) - u.min)),
    typeof i != 'number')
  )
    return;
  let h = Kt(c.min, c.max, r);
  e === c && (h -= i),
    (e.min = J0(e.min, i, l, h, o)),
    (e.max = J0(e.max, i, l, h, o));
}
function $0(e, i, [l, r, o], c, u) {
  m4(e, i[l], i[r], i[o], i.scale, c, u);
}
const g4 = ['x', 'scaleX', 'originX'],
  y4 = ['y', 'scaleY', 'originY'];
function W0(e, i, l, r) {
  $0(e.x, i, g4, l ? l.x : void 0, r ? r.x : void 0),
    $0(e.y, i, y4, l ? l.y : void 0, r ? r.y : void 0);
}
function t1(e) {
  return e.translate === 0 && e.scale === 1;
}
function eb(e) {
  return t1(e.x) && t1(e.y);
}
function e1(e, i) {
  return e.min === i.min && e.max === i.max;
}
function v4(e, i) {
  return e1(e.x, i.x) && e1(e.y, i.y);
}
function n1(e, i) {
  return (
    Math.round(e.min) === Math.round(i.min) &&
    Math.round(e.max) === Math.round(i.max)
  );
}
function nb(e, i) {
  return n1(e.x, i.x) && n1(e.y, i.y);
}
function i1(e) {
  return ze(e.x) / ze(e.y);
}
function l1(e, i) {
  return (
    e.translate === i.translate &&
    e.scale === i.scale &&
    e.originPoint === i.originPoint
  );
}
function kn(e) {
  return [e('x'), e('y')];
}
function x4(e, i, l) {
  let r = '';
  const o = e.x.translate / i.x,
    c = e.y.translate / i.y,
    u = (l == null ? void 0 : l.z) || 0;
  if (
    ((o || c || u) && (r = `translate3d(${o}px, ${c}px, ${u}px) `),
    (i.x !== 1 || i.y !== 1) && (r += `scale(${1 / i.x}, ${1 / i.y}) `),
    l)
  ) {
    const {
      transformPerspective: p,
      rotate: g,
      rotateX: y,
      rotateY: x,
      skewX: b,
      skewY: T,
    } = l;
    p && (r = `perspective(${p}px) ${r}`),
      g && (r += `rotate(${g}deg) `),
      y && (r += `rotateX(${y}deg) `),
      x && (r += `rotateY(${x}deg) `),
      b && (r += `skewX(${b}deg) `),
      T && (r += `skewY(${T}deg) `);
  }
  const h = e.x.scale * i.x,
    m = e.y.scale * i.y;
  return (h !== 1 || m !== 1) && (r += `scale(${h}, ${m})`), r || 'none';
}
const ib = [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
  ],
  b4 = ib.length,
  a1 = (e) => (typeof e == 'string' ? parseFloat(e) : e),
  r1 = (e) => typeof e == 'number' || ut.test(e);
function S4(e, i, l, r, o, c) {
  o
    ? ((e.opacity = Kt(0, l.opacity ?? 1, T4(r))),
      (e.opacityExit = Kt(i.opacity ?? 1, 0, A4(r))))
    : c && (e.opacity = Kt(i.opacity ?? 1, l.opacity ?? 1, r));
  for (let u = 0; u < b4; u++) {
    const h = ib[u];
    let m = s1(i, h),
      p = s1(l, h);
    if (m === void 0 && p === void 0) continue;
    m || (m = 0),
      p || (p = 0),
      m === 0 || p === 0 || r1(m) === r1(p)
        ? ((e[h] = Math.max(Kt(a1(m), a1(p), r), 0)),
          (Mn.test(p) || Mn.test(m)) && (e[h] += '%'))
        : (e[h] = p);
  }
  (i.rotate || l.rotate) && (e.rotate = Kt(i.rotate || 0, l.rotate || 0, r));
}
function s1(e, i) {
  return e[i] !== void 0 ? e[i] : e.borderRadius;
}
const T4 = lb(0, 0.5, Qv),
  A4 = lb(0.5, 0.95, hn);
function lb(e, i, l) {
  return (r) => (r < e ? 0 : r > i ? 1 : l(Tr(e, i, r)));
}
function w4(e, i, l) {
  const r = Se(e) ? e : la(e);
  return r.start(ad('', r, i, l)), r.animation;
}
function Er(e, i, l, r = { passive: !0 }) {
  return e.addEventListener(i, l, r), () => e.removeEventListener(i, l);
}
const E4 = (e, i) => e.depth - i.depth;
class k4 {
  constructor() {
    (this.children = []), (this.isDirty = !1);
  }
  add(i) {
    Ih(this.children, i), (this.isDirty = !0);
  }
  remove(i) {
    So(this.children, i), (this.isDirty = !0);
  }
  forEach(i) {
    this.isDirty && this.children.sort(E4),
      (this.isDirty = !1),
      this.children.forEach(i);
  }
}
function C4(e, i) {
  const l = De.now(),
    r = ({ timestamp: o }) => {
      const c = o - l;
      c >= i && (Di(r), e(c - i));
    };
  return Yt.setup(r, !0), () => Di(r);
}
function mo(e) {
  return Se(e) ? e.get() : e;
}
class M4 {
  constructor() {
    this.members = [];
  }
  add(i) {
    Ih(this.members, i);
    for (let l = this.members.length - 1; l >= 0; l--) {
      const r = this.members[l];
      if (r === i || r === this.lead || r === this.prevLead) continue;
      const o = r.instance;
      (!o || o.isConnected === !1) &&
        !r.snapshot &&
        (So(this.members, r), r.unmount());
    }
    i.scheduleRender();
  }
  remove(i) {
    if (
      (So(this.members, i),
      i === this.prevLead && (this.prevLead = void 0),
      i === this.lead)
    ) {
      const l = this.members[this.members.length - 1];
      l && this.promote(l);
    }
  }
  relegate(i) {
    var l;
    for (let r = this.members.indexOf(i) - 1; r >= 0; r--) {
      const o = this.members[r];
      if (
        o.isPresent !== !1 &&
        ((l = o.instance) == null ? void 0 : l.isConnected) !== !1
      )
        return this.promote(o), !0;
    }
    return !1;
  }
  promote(i, l) {
    var o;
    const r = this.lead;
    if (i !== r && ((this.prevLead = r), (this.lead = i), i.show(), r)) {
      r.updateSnapshot(), i.scheduleRender();
      const { layoutDependency: c } = r.options,
        { layoutDependency: u } = i.options;
      (c === void 0 || c !== u) &&
        ((i.resumeFrom = r),
        l && (r.preserveOpacity = !0),
        r.snapshot &&
          ((i.snapshot = r.snapshot),
          (i.snapshot.latestValues = r.animationValues || r.latestValues)),
        (o = i.root) != null && o.isUpdating && (i.isLayoutDirty = !0)),
        i.options.crossfade === !1 && r.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((i) => {
      var l, r, o, c, u;
      (r = (l = i.options).onExitComplete) == null || r.call(l),
        (u =
          (o = i.resumingFrom) == null
            ? void 0
            : (c = o.options).onExitComplete) == null || u.call(c);
    });
  }
  scheduleRender() {
    this.members.forEach((i) => i.instance && i.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    var i;
    (i = this.lead) != null && i.snapshot && (this.lead.snapshot = void 0);
  }
}
const go = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 },
  _f = ['', 'X', 'Y', 'Z'],
  D4 = 1e3;
let z4 = 0;
function Nf(e, i, l, r) {
  const { latestValues: o } = i;
  o[e] && ((l[e] = o[e]), i.setStaticValue(e, 0), r && (r[e] = 0));
}
function ab(e) {
  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
  const { visualElement: i } = e.options;
  if (!i) return;
  const l = Ex(i);
  if (window.MotionHasOptimisedAnimation(l, 'transform')) {
    const { layout: o, layoutId: c } = e.options;
    window.MotionCancelOptimisedAnimation(l, 'transform', Yt, !(o || c));
  }
  const { parent: r } = e;
  r && !r.hasCheckedOptimisedAppear && ab(r);
}
function rb({
  attachResizeListener: e,
  defaultParent: i,
  measureScroll: l,
  checkIsScrollRoot: r,
  resetTransform: o,
}) {
  return class {
    constructor(u = {}, h = i == null ? void 0 : i()) {
      (this.id = z4++),
        (this.animationId = 0),
        (this.animationCommitId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.layoutVersion = 0),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          (this.projectionUpdateScheduled = !1),
            this.nodes.forEach(_4),
            this.nodes.forEach(U4),
            this.nodes.forEach(H4),
            this.nodes.forEach(N4);
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.linkedParentVersion = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = u),
        (this.root = h ? h.root || h : this),
        (this.path = h ? [...h.path, h] : []),
        (this.parent = h),
        (this.depth = h ? h.depth + 1 : 0);
      for (let m = 0; m < this.path.length; m++)
        this.path[m].shouldResetTransform = !0;
      this.root === this && (this.nodes = new k4());
    }
    addEventListener(u, h) {
      return (
        this.eventHandlers.has(u) || this.eventHandlers.set(u, new Qh()),
        this.eventHandlers.get(u).add(h)
      );
    }
    notifyListeners(u, ...h) {
      const m = this.eventHandlers.get(u);
      m && m.notify(...h);
    }
    hasListeners(u) {
      return this.eventHandlers.has(u);
    }
    mount(u) {
      if (this.instance) return;
      (this.isSVG = fd(u) && !Rz(u)), (this.instance = u);
      const { layoutId: h, layout: m, visualElement: p } = this.options;
      if (
        (p && !p.current && p.mount(u),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        this.root.hasTreeAnimated && (m || h) && (this.isLayoutDirty = !0),
        e)
      ) {
        let g,
          y = 0;
        const x = () => (this.root.updateBlockedByResize = !1);
        Yt.read(() => {
          y = window.innerWidth;
        }),
          e(u, () => {
            const b = window.innerWidth;
            b !== y &&
              ((y = b),
              (this.root.updateBlockedByResize = !0),
              g && g(),
              (g = C4(x, 250)),
              go.hasAnimatedSinceResize &&
                ((go.hasAnimatedSinceResize = !1), this.nodes.forEach(c1)));
          });
      }
      h && this.root.registerSharedNode(h, this),
        this.options.animate !== !1 &&
          p &&
          (h || m) &&
          this.addEventListener(
            'didUpdate',
            ({
              delta: g,
              hasLayoutChanged: y,
              hasRelativeLayoutChanged: x,
              layout: b,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                (this.target = void 0), (this.relativeTarget = void 0);
                return;
              }
              const T =
                  this.options.transition || p.getDefaultTransition() || F4,
                { onLayoutAnimationStart: M, onLayoutAnimationComplete: D } =
                  p.getProps(),
                E = !this.targetLayout || !nb(this.targetLayout, b),
                L = !y && x;
              if (
                this.options.layoutRoot ||
                this.resumeFrom ||
                L ||
                (y && (E || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0));
                const R = { ...ld(T, 'layout'), onPlay: M, onComplete: D };
                (p.shouldReduceMotion || this.options.layoutRoot) &&
                  ((R.delay = 0), (R.type = !1)),
                  this.startAnimation(R),
                  this.setAnimationOrigin(g, L);
              } else
                y || c1(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete();
              this.targetLayout = b;
            },
          );
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const u = this.getStack();
      u && u.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        this.eventHandlers.clear(),
        Di(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(q4),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: u } = this.options;
      return u && u.getProps().transformTemplate;
    }
    willUpdate(u = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          ab(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let g = 0; g < this.path.length; g++) {
        const y = this.path[g];
        (y.shouldResetTransform = !0),
          (typeof y.latestValues.x == 'string' ||
            typeof y.latestValues.y == 'string') &&
            (y.isLayoutDirty = !0),
          y.updateScroll('snapshot'),
          y.options.layoutRoot && y.willUpdate(!1);
      }
      const { layoutId: h, layout: m } = this.options;
      if (h === void 0 && !m) return;
      const p = this.getTransformTemplate();
      (this.prevTransformTemplateValue = p ? p(this.latestValues, '') : void 0),
        this.updateSnapshot(),
        u && this.notifyListeners('willUpdate');
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        const m = this.updateBlockedByResize;
        this.unblockUpdate(),
          (this.updateBlockedByResize = !1),
          this.clearAllSnapshots(),
          m && this.nodes.forEach(j4),
          this.nodes.forEach(o1);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(u1);
        return;
      }
      (this.animationCommitId = this.animationId),
        this.isUpdating
          ? ((this.isUpdating = !1),
            this.nodes.forEach(B4),
            this.nodes.forEach(V4),
            this.nodes.forEach(O4),
            this.nodes.forEach(R4))
          : this.nodes.forEach(u1),
        this.clearAllSnapshots();
      const h = De.now();
      (be.delta = Dn(0, 1e3 / 60, h - be.timestamp)),
        (be.timestamp = h),
        (be.isProcessing = !0),
        Ef.update.process(be),
        Ef.preRender.process(be),
        Ef.render.process(be),
        (be.isProcessing = !1);
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), ud.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(L4), this.sharedNodes.forEach(P4);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        Yt.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Yt.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot ||
        !this.instance ||
        ((this.snapshot = this.measure()),
        this.snapshot &&
          !ze(this.snapshot.measuredBox.x) &&
          !ze(this.snapshot.measuredBox.y) &&
          (this.snapshot = void 0));
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let m = 0; m < this.path.length; m++) this.path[m].updateScroll();
      const u = this.layout;
      (this.layout = this.measure(!1)),
        this.layoutVersion++,
        this.layoutCorrected || (this.layoutCorrected = he()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners('measure', this.layout.layoutBox);
      const { visualElement: h } = this.options;
      h &&
        h.notify(
          'LayoutMeasure',
          this.layout.layoutBox,
          u ? u.layoutBox : void 0,
        );
    }
    updateScroll(u = 'measure') {
      let h = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === u &&
          (h = !1),
        h && this.instance)
      ) {
        const m = r(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: u,
          isRoot: m,
          offset: l(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : m,
        };
      }
    }
    resetTransform() {
      if (!o) return;
      const u =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        h = this.projectionDelta && !eb(this.projectionDelta),
        m = this.getTransformTemplate(),
        p = m ? m(this.latestValues, '') : void 0,
        g = p !== this.prevTransformTemplateValue;
      u &&
        this.instance &&
        (h || $i(this.latestValues) || g) &&
        (o(this.instance, p),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(u = !0) {
      const h = this.measurePageBox();
      let m = this.removeElementScroll(h);
      return (
        u && (m = this.removeTransform(m)),
        I4(m),
        {
          animationId: this.root.animationId,
          measuredBox: h,
          layoutBox: m,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var p;
      const { visualElement: u } = this.options;
      if (!u) return he();
      const h = u.measureViewportBox();
      if (
        !(
          ((p = this.scroll) == null ? void 0 : p.wasRoot) || this.path.some(X4)
        )
      ) {
        const { scroll: g } = this.root;
        g && (Cn(h.x, g.offset.x), Cn(h.y, g.offset.y));
      }
      return h;
    }
    removeElementScroll(u) {
      var m;
      const h = he();
      if ((yn(h, u), (m = this.scroll) != null && m.wasRoot)) return h;
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p],
          { scroll: y, options: x } = g;
        g !== this.root &&
          y &&
          x.layoutScroll &&
          (y.wasRoot && yn(h, u), Cn(h.x, y.offset.x), Cn(h.y, y.offset.y));
      }
      return h;
    }
    applyTransform(u, h = !1, m) {
      var g, y;
      const p = m || he();
      yn(p, u);
      for (let x = 0; x < this.path.length; x++) {
        const b = this.path[x];
        !h &&
          b.options.layoutScroll &&
          b.scroll &&
          b !== b.root &&
          (Cn(p.x, -b.scroll.offset.x), Cn(p.y, -b.scroll.offset.y)),
          $i(b.latestValues) &&
            po(
              p,
              b.latestValues,
              (g = b.layout) == null ? void 0 : g.layoutBox,
            );
      }
      return (
        $i(this.latestValues) &&
          po(
            p,
            this.latestValues,
            (y = this.layout) == null ? void 0 : y.layoutBox,
          ),
        p
      );
    }
    removeTransform(u) {
      var m;
      const h = he();
      yn(h, u);
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p];
        if (!$i(g.latestValues)) continue;
        let y;
        g.instance &&
          (vh(g.latestValues) && g.updateSnapshot(),
          (y = he()),
          yn(y, g.measurePageBox())),
          W0(
            h,
            g.latestValues,
            (m = g.snapshot) == null ? void 0 : m.layoutBox,
            y,
          );
      }
      return $i(this.latestValues) && W0(h, this.latestValues), h;
    }
    setTargetDelta(u) {
      (this.targetDelta = u),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0);
    }
    setOptions(u) {
      this.options = {
        ...this.options,
        ...u,
        crossfade: u.crossfade !== void 0 ? u.crossfade : !0,
      };
    }
    clearMeasurements() {
      (this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1);
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== be.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(u = !1) {
      var b;
      const h = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = h.isSharedProjectionDirty);
      const m = !!this.resumingFrom || this !== h;
      if (
        !(
          u ||
          (m && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          ((b = this.parent) != null && b.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: g, layoutId: y } = this.options;
      if (!this.layout || !(g || y)) return;
      this.resolvedRelativeTargetAt = be.timestamp;
      const x = this.getClosestProjectingParent();
      x &&
        this.linkedParentVersion !== x.layoutVersion &&
        !x.options.layoutRoot &&
        this.removeRelativeTarget(),
        !this.targetDelta &&
          !this.relativeTarget &&
          (this.options.layoutAnchor !== !1 && x && x.layout
            ? this.createRelativeTarget(
                x,
                this.layout.layoutBox,
                x.layout.layoutBox,
              )
            : this.removeRelativeTarget()),
        !(!this.relativeTarget && !this.targetDelta) &&
          (this.target ||
            ((this.target = he()), (this.targetWithTransforms = he())),
          this.relativeTarget &&
          this.relativeTargetOrigin &&
          this.relativeParent &&
          this.relativeParent.target
            ? (this.forceRelativeParentToResolveTarget(),
              p4(
                this.target,
                this.relativeTarget,
                this.relativeParent.target,
                this.options.layoutAnchor || void 0,
              ))
            : this.targetDelta
              ? (this.resumingFrom
                  ? this.applyTransform(this.layout.layoutBox, !1, this.target)
                  : yn(this.target, this.layout.layoutBox),
                Gx(this.target, this.targetDelta))
              : yn(this.target, this.layout.layoutBox),
          this.attemptToResolveRelativeTarget &&
            ((this.attemptToResolveRelativeTarget = !1),
            this.options.layoutAnchor !== !1 &&
            x &&
            !!x.resumingFrom == !!this.resumingFrom &&
            !x.options.layoutScroll &&
            x.target &&
            this.animationProgress !== 1
              ? this.createRelativeTarget(x, this.target, x.target)
              : (this.relativeParent = this.relativeTarget = void 0)));
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          vh(this.parent.latestValues) ||
          Px(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    createRelativeTarget(u, h, m) {
      (this.relativeParent = u),
        (this.linkedParentVersion = u.layoutVersion),
        this.forceRelativeParentToResolveTarget(),
        (this.relativeTarget = he()),
        (this.relativeTargetOrigin = he()),
        Mo(
          this.relativeTargetOrigin,
          h,
          m,
          this.options.layoutAnchor || void 0,
        ),
        yn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      var T;
      const u = this.getLead(),
        h = !!this.resumingFrom || this !== u;
      let m = !0;
      if (
        ((this.isProjectionDirty ||
          ((T = this.parent) != null && T.isProjectionDirty)) &&
          (m = !1),
        h &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (m = !1),
        this.resolvedRelativeTargetAt === be.timestamp && (m = !1),
        m)
      )
        return;
      const { layout: p, layoutId: g } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(p || g))
      )
        return;
      yn(this.layoutCorrected, this.layout.layoutBox);
      const y = this.treeScale.x,
        x = this.treeScale.y;
      Gz(this.layoutCorrected, this.treeScale, this.path, h),
        u.layout &&
          !u.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((u.target = u.layout.layoutBox), (u.targetWithTransforms = he()));
      const { target: b } = u;
      if (!b) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (X0(this.prevProjectionDelta.x, this.projectionDelta.x),
          X0(this.prevProjectionDelta.y, this.projectionDelta.y)),
        gr(this.projectionDelta, this.layoutCorrected, b, this.latestValues),
        (this.treeScale.x !== y ||
          this.treeScale.y !== x ||
          !l1(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !l1(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners('projectionUpdate', b));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(u = !0) {
      var h;
      if (((h = this.options.visualElement) == null || h.scheduleRender(), u)) {
        const m = this.getStack();
        m && m.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      (this.prevProjectionDelta = ta()),
        (this.projectionDelta = ta()),
        (this.projectionDeltaWithTransform = ta());
    }
    setAnimationOrigin(u, h = !1) {
      const m = this.snapshot,
        p = m ? m.latestValues : {},
        g = { ...this.latestValues },
        y = ta();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !h);
      const x = he(),
        b = m ? m.source : void 0,
        T = this.layout ? this.layout.source : void 0,
        M = b !== T,
        D = this.getStack(),
        E = !D || D.members.length <= 1,
        L = !!(M && !E && this.options.crossfade === !0 && !this.path.some(Y4));
      this.animationProgress = 0;
      let R;
      (this.mixTargetDelta = (Y) => {
        const Q = Y / 1e3;
        f1(y.x, u.x, Q),
          f1(y.y, u.y, Q),
          this.setTargetDelta(y),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (Mo(
              x,
              this.layout.layoutBox,
              this.relativeParent.layout.layoutBox,
              this.options.layoutAnchor || void 0,
            ),
            G4(this.relativeTarget, this.relativeTargetOrigin, x, Q),
            R && v4(this.relativeTarget, R) && (this.isProjectionDirty = !1),
            R || (R = he()),
            yn(R, this.relativeTarget)),
          M &&
            ((this.animationValues = g), S4(g, p, this.latestValues, Q, L, E)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = Q);
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(u) {
      var h, m, p;
      this.notifyListeners('animationStart'),
        (h = this.currentAnimation) == null || h.stop(),
        (p = (m = this.resumingFrom) == null ? void 0 : m.currentAnimation) ==
          null || p.stop(),
        this.pendingAnimation &&
          (Di(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = Yt.update(() => {
          (go.hasAnimatedSinceResize = !0),
            this.motionValue || (this.motionValue = la(0)),
            this.motionValue.jump(0, !1),
            (this.currentAnimation = w4(this.motionValue, [0, 1e3], {
              ...u,
              velocity: 0,
              isSync: !0,
              onUpdate: (g) => {
                this.mixTargetDelta(g), u.onUpdate && u.onUpdate(g);
              },
              onStop: () => {},
              onComplete: () => {
                u.onComplete && u.onComplete(), this.completeAnimation();
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0);
        }));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const u = this.getStack();
      u && u.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners('animationComplete');
    }
    finishAnimation() {
      this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(D4),
        this.currentAnimation.stop()),
        this.completeAnimation();
    }
    applyTransformsToTarget() {
      const u = this.getLead();
      let {
        targetWithTransforms: h,
        target: m,
        layout: p,
        latestValues: g,
      } = u;
      if (!(!h || !m || !p)) {
        if (
          this !== u &&
          this.layout &&
          p &&
          sb(this.options.animationType, this.layout.layoutBox, p.layoutBox)
        ) {
          m = this.target || he();
          const y = ze(this.layout.layoutBox.x);
          (m.x.min = u.target.x.min), (m.x.max = m.x.min + y);
          const x = ze(this.layout.layoutBox.y);
          (m.y.min = u.target.y.min), (m.y.max = m.y.min + x);
        }
        yn(h, m),
          po(h, g),
          gr(this.projectionDeltaWithTransform, this.layoutCorrected, h, g);
      }
    }
    registerSharedNode(u, h) {
      this.sharedNodes.has(u) || this.sharedNodes.set(u, new M4()),
        this.sharedNodes.get(u).add(h);
      const p = h.options.initialPromotionConfig;
      h.promote({
        transition: p ? p.transition : void 0,
        preserveFollowOpacity:
          p && p.shouldPreserveFollowOpacity
            ? p.shouldPreserveFollowOpacity(h)
            : void 0,
      });
    }
    isLead() {
      const u = this.getStack();
      return u ? u.lead === this : !0;
    }
    getLead() {
      var h;
      const { layoutId: u } = this.options;
      return u
        ? ((h = this.getStack()) == null ? void 0 : h.lead) || this
        : this;
    }
    getPrevLead() {
      var h;
      const { layoutId: u } = this.options;
      return u ? ((h = this.getStack()) == null ? void 0 : h.prevLead) : void 0;
    }
    getStack() {
      const { layoutId: u } = this.options;
      if (u) return this.root.sharedNodes.get(u);
    }
    promote({ needsReset: u, transition: h, preserveFollowOpacity: m } = {}) {
      const p = this.getStack();
      p && p.promote(this, m),
        u && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        h && this.setOptions({ transition: h });
    }
    relegate() {
      const u = this.getStack();
      return u ? u.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: u } = this.options;
      if (!u) return;
      let h = !1;
      const { latestValues: m } = u;
      if (
        ((m.z ||
          m.rotate ||
          m.rotateX ||
          m.rotateY ||
          m.rotateZ ||
          m.skewX ||
          m.skewY) &&
          (h = !0),
        !h)
      )
        return;
      const p = {};
      m.z && Nf('z', u, p, this.animationValues);
      for (let g = 0; g < _f.length; g++)
        Nf(`rotate${_f[g]}`, u, p, this.animationValues),
          Nf(`skew${_f[g]}`, u, p, this.animationValues);
      u.render();
      for (const g in p)
        u.setStaticValue(g, p[g]),
          this.animationValues && (this.animationValues[g] = p[g]);
      u.scheduleRender();
    }
    applyProjectionStyles(u, h) {
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) {
        u.visibility = 'hidden';
        return;
      }
      const m = this.getTransformTemplate();
      if (this.needsReset) {
        (this.needsReset = !1),
          (u.visibility = ''),
          (u.opacity = ''),
          (u.pointerEvents = mo(h == null ? void 0 : h.pointerEvents) || ''),
          (u.transform = m ? m(this.latestValues, '') : 'none');
        return;
      }
      const p = this.getLead();
      if (!this.projectionDelta || !this.layout || !p.target) {
        this.options.layoutId &&
          ((u.opacity =
            this.latestValues.opacity !== void 0
              ? this.latestValues.opacity
              : 1),
          (u.pointerEvents = mo(h == null ? void 0 : h.pointerEvents) || '')),
          this.hasProjected &&
            !$i(this.latestValues) &&
            ((u.transform = m ? m({}, '') : 'none'), (this.hasProjected = !1));
        return;
      }
      u.visibility = '';
      const g = p.animationValues || p.latestValues;
      this.applyTransformsToTarget();
      let y = x4(this.projectionDeltaWithTransform, this.treeScale, g);
      m && (y = m(g, y)), (u.transform = y);
      const { x, y: b } = this.projectionDelta;
      (u.transformOrigin = `${x.origin * 100}% ${b.origin * 100}% 0`),
        p.animationValues
          ? (u.opacity =
              p === this
                ? (g.opacity ?? this.latestValues.opacity ?? 1)
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : g.opacityExit)
          : (u.opacity =
              p === this
                ? g.opacity !== void 0
                  ? g.opacity
                  : ''
                : g.opacityExit !== void 0
                  ? g.opacityExit
                  : 0);
      for (const T in bh) {
        if (g[T] === void 0) continue;
        const { correct: M, applyTo: D, isCSSVariable: E } = bh[T],
          L = y === 'none' ? g[T] : M(g[T], p);
        if (D) {
          const R = D.length;
          for (let Y = 0; Y < R; Y++) u[D[Y]] = L;
        } else
          E ? (this.options.visualElement.renderState.vars[T] = L) : (u[T] = L);
      }
      this.options.layoutId &&
        (u.pointerEvents =
          p === this ? mo(h == null ? void 0 : h.pointerEvents) || '' : 'none');
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((u) => {
        var h;
        return (h = u.currentAnimation) == null ? void 0 : h.stop();
      }),
        this.root.nodes.forEach(o1),
        this.root.sharedNodes.clear();
    }
  };
}
function O4(e) {
  e.updateLayout();
}
function R4(e) {
  var l;
  const i = ((l = e.resumeFrom) == null ? void 0 : l.snapshot) || e.snapshot;
  if (e.isLead() && e.layout && i && e.hasListeners('didUpdate')) {
    const { layoutBox: r, measuredBox: o } = e.layout,
      { animationType: c } = e.options,
      u = i.source !== e.layout.source;
    if (c === 'size')
      kn((y) => {
        const x = u ? i.measuredBox[y] : i.layoutBox[y],
          b = ze(x);
        (x.min = r[y].min), (x.max = x.min + b);
      });
    else if (c === 'x' || c === 'y') {
      const y = c === 'x' ? 'y' : 'x';
      Sh(u ? i.measuredBox[y] : i.layoutBox[y], r[y]);
    } else
      sb(c, i.layoutBox, r) &&
        kn((y) => {
          const x = u ? i.measuredBox[y] : i.layoutBox[y],
            b = ze(r[y]);
          (x.max = x.min + b),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0),
              (e.relativeTarget[y].max = e.relativeTarget[y].min + b));
        });
    const h = ta();
    gr(h, r, i.layoutBox);
    const m = ta();
    u ? gr(m, e.applyTransform(o, !0), i.measuredBox) : gr(m, r, i.layoutBox);
    const p = !eb(h);
    let g = !1;
    if (!e.resumeFrom) {
      const y = e.getClosestProjectingParent();
      if (y && !y.resumeFrom) {
        const { snapshot: x, layout: b } = y;
        if (x && b) {
          const T = e.options.layoutAnchor || void 0,
            M = he();
          Mo(M, i.layoutBox, x.layoutBox, T);
          const D = he();
          Mo(D, r, b.layoutBox, T),
            nb(M, D) || (g = !0),
            y.options.layoutRoot &&
              ((e.relativeTarget = D),
              (e.relativeTargetOrigin = M),
              (e.relativeParent = y));
        }
      }
    }
    e.notifyListeners('didUpdate', {
      layout: r,
      snapshot: i,
      delta: m,
      layoutDelta: h,
      hasLayoutChanged: p,
      hasRelativeLayoutChanged: g,
    });
  } else if (e.isLead()) {
    const { onExitComplete: r } = e.options;
    r && r();
  }
  e.options.transition = void 0;
}
function _4(e) {
  e.parent &&
    (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
    e.isSharedProjectionDirty ||
      (e.isSharedProjectionDirty = !!(
        e.isProjectionDirty ||
        e.parent.isProjectionDirty ||
        e.parent.isSharedProjectionDirty
      )),
    e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function N4(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function L4(e) {
  e.clearSnapshot();
}
function o1(e) {
  e.clearMeasurements();
}
function j4(e) {
  (e.isLayoutDirty = !0), e.updateLayout();
}
function u1(e) {
  e.isLayoutDirty = !1;
}
function B4(e) {
  e.isAnimationBlocked &&
    e.layout &&
    !e.isLayoutDirty &&
    ((e.snapshot = e.layout), (e.isLayoutDirty = !0));
}
function V4(e) {
  const { visualElement: i } = e.options;
  i && i.getProps().onBeforeLayoutMeasure && i.notify('BeforeLayoutMeasure'),
    e.resetTransform();
}
function c1(e) {
  e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0);
}
function U4(e) {
  e.resolveTargetDelta();
}
function H4(e) {
  e.calcProjection();
}
function q4(e) {
  e.resetSkewAndRotation();
}
function P4(e) {
  e.removeLeadSnapshot();
}
function f1(e, i, l) {
  (e.translate = Kt(i.translate, 0, l)),
    (e.scale = Kt(i.scale, 1, l)),
    (e.origin = i.origin),
    (e.originPoint = i.originPoint);
}
function h1(e, i, l, r) {
  (e.min = Kt(i.min, l.min, r)), (e.max = Kt(i.max, l.max, r));
}
function G4(e, i, l, r) {
  h1(e.x, i.x, l.x, r), h1(e.y, i.y, l.y, r);
}
function Y4(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const F4 = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  d1 = (e) =>
    typeof navigator < 'u' &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(e),
  p1 = d1('applewebkit/') && !d1('chrome/') ? Math.round : hn;
function m1(e) {
  (e.min = p1(e.min)), (e.max = p1(e.max));
}
function I4(e) {
  m1(e.x), m1(e.y);
}
function sb(e, i, l) {
  return (
    e === 'position' || (e === 'preserve-aspect' && !d4(i1(i), i1(l), 0.2))
  );
}
function X4(e) {
  var i;
  return e !== e.root && ((i = e.scroll) == null ? void 0 : i.wasRoot);
}
const Q4 = rb({
    attachResizeListener: (e, i) => Er(e, 'resize', i),
    measureScroll: () => {
      var e, i;
      return {
        x:
          document.documentElement.scrollLeft ||
          ((e = document.body) == null ? void 0 : e.scrollLeft) ||
          0,
        y:
          document.documentElement.scrollTop ||
          ((i = document.body) == null ? void 0 : i.scrollTop) ||
          0,
      };
    },
    checkIsScrollRoot: () => !0,
  }),
  Lf = { current: void 0 },
  ob = rb({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!Lf.current) {
        const e = new Q4({});
        e.mount(window), e.setOptions({ layoutScroll: !0 }), (Lf.current = e);
      }
      return Lf.current;
    },
    resetTransform: (e, i) => {
      e.style.transform = i !== void 0 ? i : 'none';
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === 'fixed',
  }),
  gd = rt.createContext({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: 'never',
  });
function g1(e, i) {
  if (typeof e == 'function') return e(i);
  e != null && (e.current = i);
}
function K4(...e) {
  return (i) => {
    let l = !1;
    const r = e.map((o) => {
      const c = g1(o, i);
      return !l && typeof c == 'function' && (l = !0), c;
    });
    if (l)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const c = r[o];
          typeof c == 'function' ? c() : g1(e[o], null);
        }
      };
  };
}
function Z4(...e) {
  return rt.useCallback(K4(...e), e);
}
class J4 extends rt.Component {
  getSnapshotBeforeUpdate(i) {
    const l = this.props.childRef.current;
    if (
      uo(l) &&
      i.isPresent &&
      !this.props.isPresent &&
      this.props.pop !== !1
    ) {
      const r = l.offsetParent,
        o = (uo(r) && r.offsetWidth) || 0,
        c = (uo(r) && r.offsetHeight) || 0,
        u = getComputedStyle(l),
        h = this.props.sizeRef.current;
      (h.height = parseFloat(u.height)),
        (h.width = parseFloat(u.width)),
        (h.top = l.offsetTop),
        (h.left = l.offsetLeft),
        (h.right = o - h.width - h.left),
        (h.bottom = c - h.height - h.top);
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
function $4({
  children: e,
  isPresent: i,
  anchorX: l,
  anchorY: r,
  root: o,
  pop: c,
}) {
  var x;
  const u = rt.useId(),
    h = rt.useRef(null),
    m = rt.useRef({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }),
    { nonce: p } = rt.useContext(gd),
    g =
      ((x = e.props) == null ? void 0 : x.ref) ?? (e == null ? void 0 : e.ref),
    y = Z4(h, g);
  return (
    rt.useInsertionEffect(() => {
      const {
        width: b,
        height: T,
        top: M,
        left: D,
        right: E,
        bottom: L,
      } = m.current;
      if (i || c === !1 || !h.current || !b || !T) return;
      const R = l === 'left' ? `left: ${D}` : `right: ${E}`,
        Y = r === 'bottom' ? `bottom: ${L}` : `top: ${M}`;
      h.current.dataset.motionPopId = u;
      const Q = document.createElement('style');
      p && (Q.nonce = p);
      const V = o ?? document.head;
      return (
        V.appendChild(Q),
        Q.sheet &&
          Q.sheet.insertRule(`
          [data-motion-pop-id="${u}"] {
            position: absolute !important;
            width: ${b}px !important;
            height: ${T}px !important;
            ${R}px !important;
            ${Y}px !important;
          }
        `),
        () => {
          var K;
          (K = h.current) == null || K.removeAttribute('data-motion-pop-id'),
            V.contains(Q) && V.removeChild(Q);
        }
      );
    }, [i]),
    H.jsx(J4, {
      isPresent: i,
      childRef: h,
      sizeRef: m,
      pop: c,
      children: c === !1 ? e : rt.cloneElement(e, { ref: y }),
    })
  );
}
const W4 = ({
  children: e,
  initial: i,
  isPresent: l,
  onExitComplete: r,
  custom: o,
  presenceAffectsLayout: c,
  mode: u,
  anchorX: h,
  anchorY: m,
  root: p,
}) => {
  const g = Fh(tO),
    y = rt.useId();
  let x = !0,
    b = rt.useMemo(
      () => (
        (x = !1),
        {
          id: y,
          initial: i,
          isPresent: l,
          custom: o,
          onExitComplete: (T) => {
            g.set(T, !0);
            for (const M of g.values()) if (!M) return;
            r && r();
          },
          register: (T) => (g.set(T, !1), () => g.delete(T)),
        }
      ),
      [l, g, r],
    );
  return (
    c && x && (b = { ...b }),
    rt.useMemo(() => {
      g.forEach((T, M) => g.set(M, !1));
    }, [l]),
    rt.useEffect(() => {
      !l && !g.size && r && r();
    }, [l]),
    (e = H.jsx($4, {
      pop: u === 'popLayout',
      isPresent: l,
      anchorX: h,
      anchorY: m,
      root: p,
      children: e,
    })),
    H.jsx(Lo.Provider, { value: b, children: e })
  );
};
function tO() {
  return new Map();
}
function ub(e = !0) {
  const i = rt.useContext(Lo);
  if (i === null) return [!0, null];
  const { isPresent: l, onExitComplete: r, register: o } = i,
    c = rt.useId();
  rt.useEffect(() => {
    if (e) return o(c);
  }, [e]);
  const u = rt.useCallback(() => e && r && r(c), [c, r, e]);
  return !l && r ? [!1, u] : [!0];
}
const lo = (e) => e.key || '';
function y1(e) {
  const i = [];
  return (
    rt.Children.forEach(e, (l) => {
      rt.isValidElement(l) && i.push(l);
    }),
    i
  );
}
const eO = ({
    children: e,
    custom: i,
    initial: l = !0,
    onExitComplete: r,
    presenceAffectsLayout: o = !0,
    mode: c = 'sync',
    propagate: u = !1,
    anchorX: h = 'left',
    anchorY: m = 'top',
    root: p,
  }) => {
    const [g, y] = ub(u),
      x = rt.useMemo(() => y1(e), [e]),
      b = u && !g ? [] : x.map(lo),
      T = rt.useRef(!0),
      M = rt.useRef(x),
      D = Fh(() => new Map()),
      E = rt.useRef(new Set()),
      [L, R] = rt.useState(x),
      [Y, Q] = rt.useState(x);
    jv(() => {
      (T.current = !1), (M.current = x);
      for (let $ = 0; $ < Y.length; $++) {
        const it = lo(Y[$]);
        b.includes(it)
          ? (D.delete(it), E.current.delete(it))
          : D.get(it) !== !0 && D.set(it, !1);
      }
    }, [Y, b.length, b.join('-')]);
    const V = [];
    if (x !== L) {
      let $ = [...x];
      for (let it = 0; it < Y.length; it++) {
        const O = Y[it],
          J = lo(O);
        b.includes(J) || ($.splice(it, 0, O), V.push(O));
      }
      return c === 'wait' && V.length && ($ = V), Q(y1($)), R(x), null;
    }
    const { forceRender: K } = rt.useContext(Yh);
    return H.jsx(H.Fragment, {
      children: Y.map(($) => {
        const it = lo($),
          O = u && !g ? !1 : x === Y || b.includes(it),
          J = () => {
            if (E.current.has(it)) return;
            if (D.has(it)) E.current.add(it), D.set(it, !0);
            else return;
            let et = !0;
            D.forEach((vt) => {
              vt || (et = !1);
            }),
              et &&
                (K == null || K(),
                Q(M.current),
                u && (y == null || y()),
                r && r());
          };
        return H.jsx(
          W4,
          {
            isPresent: O,
            initial: !T.current || l ? void 0 : !1,
            custom: i,
            presenceAffectsLayout: o,
            mode: c,
            root: p,
            onExitComplete: O ? void 0 : J,
            anchorX: h,
            anchorY: m,
            children: $,
          },
          it,
        );
      }),
    });
  },
  cb = rt.createContext({ strict: !1 }),
  v1 = {
    animation: [
      'animate',
      'variants',
      'whileHover',
      'whileTap',
      'exit',
      'whileInView',
      'whileFocus',
      'whileDrag',
    ],
    exit: ['exit'],
    drag: ['drag', 'dragControls'],
    focus: ['whileFocus'],
    hover: ['whileHover', 'onHoverStart', 'onHoverEnd'],
    tap: ['whileTap', 'onTap', 'onTapStart', 'onTapCancel'],
    pan: ['onPan', 'onPanStart', 'onPanSessionStart', 'onPanEnd'],
    inView: ['whileInView', 'onViewportEnter', 'onViewportLeave'],
    layout: ['layout', 'layoutId'],
  };
let x1 = !1;
function nO() {
  if (x1) return;
  const e = {};
  for (const i in v1) e[i] = { isEnabled: (l) => v1[i].some((r) => !!l[r]) };
  Ux(e), (x1 = !0);
}
function fb() {
  return nO(), Uz();
}
function iO(e) {
  const i = fb();
  for (const l in e) i[l] = { ...i[l], ...e[l] };
  Ux(i);
}
const lO = new Set([
  'animate',
  'exit',
  'variants',
  'initial',
  'style',
  'values',
  'variants',
  'transition',
  'transformTemplate',
  'custom',
  'inherit',
  'onBeforeLayoutMeasure',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'onDragStart',
  'onDrag',
  'onDragEnd',
  'onMeasureDragConstraints',
  'onDirectionLock',
  'onDragTransitionEnd',
  '_dragX',
  '_dragY',
  'onHoverStart',
  'onHoverEnd',
  'onViewportEnter',
  'onViewportLeave',
  'globalTapTarget',
  'propagate',
  'ignoreStrict',
  'viewport',
]);
function Do(e) {
  return (
    e.startsWith('while') ||
    (e.startsWith('drag') && e !== 'draggable') ||
    e.startsWith('layout') ||
    e.startsWith('onTap') ||
    e.startsWith('onPan') ||
    e.startsWith('onLayout') ||
    lO.has(e)
  );
}
let hb = (e) => !Do(e);
function aO(e) {
  typeof e == 'function' && (hb = (i) => (i.startsWith('on') ? !Do(i) : e(i)));
}
try {
  aO(require('@emotion/is-prop-valid').default);
} catch {}
function rO(e, i, l) {
  const r = {};
  for (const o in e)
    (o === 'values' && typeof e.values == 'object') ||
      Se(e[o]) ||
      ((hb(o) ||
        (l === !0 && Do(o)) ||
        (!i && !Do(o)) ||
        (e.draggable && o.startsWith('onDrag'))) &&
        (r[o] = e[o]));
  return r;
}
const Uo = rt.createContext({});
function sO(e, i) {
  if (Vo(e)) {
    const { initial: l, animate: r } = e;
    return {
      initial: l === !1 || wr(l) ? l : void 0,
      animate: wr(r) ? r : void 0,
    };
  }
  return e.inherit !== !1 ? i : {};
}
function oO(e) {
  const { initial: i, animate: l } = sO(e, rt.useContext(Uo));
  return rt.useMemo(() => ({ initial: i, animate: l }), [b1(i), b1(l)]);
}
function b1(e) {
  return Array.isArray(e) ? e.join(' ') : e;
}
const yd = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function db(e, i, l) {
  for (const r in i) !Se(i[r]) && !Ix(r, l) && (e[r] = i[r]);
}
function uO({ transformTemplate: e }, i) {
  return rt.useMemo(() => {
    const l = yd();
    return pd(l, i, e), Object.assign({}, l.vars, l.style);
  }, [i]);
}
function cO(e, i) {
  const l = e.style || {},
    r = {};
  return db(r, l, e), Object.assign(r, uO(e, i)), r;
}
function fO(e, i) {
  const l = {},
    r = cO(e, i);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((l.draggable = !1),
      (r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = 'none'),
      (r.touchAction =
        e.drag === !0 ? 'none' : `pan-${e.drag === 'x' ? 'y' : 'x'}`)),
    e.tabIndex === void 0 &&
      (e.onTap || e.onTapStart || e.whileTap) &&
      (l.tabIndex = 0),
    (l.style = r),
    l
  );
}
const pb = () => ({ ...yd(), attrs: {} });
function hO(e, i, l, r) {
  const o = rt.useMemo(() => {
    const c = pb();
    return (
      Xx(c, i, Kx(r), e.transformTemplate, e.style),
      { ...c.attrs, style: { ...c.style } }
    );
  }, [i]);
  if (e.style) {
    const c = {};
    db(c, e.style, e), (o.style = { ...c, ...o.style });
  }
  return o;
}
const dO = [
  'animate',
  'circle',
  'defs',
  'desc',
  'ellipse',
  'g',
  'image',
  'line',
  'filter',
  'marker',
  'mask',
  'metadata',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'rect',
  'stop',
  'switch',
  'symbol',
  'svg',
  'text',
  'tspan',
  'use',
  'view',
];
function vd(e) {
  return typeof e != 'string' || e.includes('-')
    ? !1
    : !!(dO.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
function pO(e, i, l, { latestValues: r }, o, c = !1, u) {
  const m = ((u ?? vd(e)) ? hO : fO)(i, r, o, e),
    p = rO(i, typeof e == 'string', c),
    g = e !== rt.Fragment ? { ...p, ...m, ref: l } : {},
    { children: y } = i,
    x = rt.useMemo(() => (Se(y) ? y.get() : y), [y]);
  return rt.createElement(e, { ...g, children: x });
}
function mO({ scrapeMotionValuesFromProps: e, createRenderState: i }, l, r, o) {
  return { latestValues: gO(l, r, o, e), renderState: i() };
}
function gO(e, i, l, r) {
  const o = {},
    c = r(e, {});
  for (const x in c) o[x] = mo(c[x]);
  let { initial: u, animate: h } = e;
  const m = Vo(e),
    p = Bx(e);
  i &&
    p &&
    !m &&
    e.inherit !== !1 &&
    (u === void 0 && (u = i.initial), h === void 0 && (h = i.animate));
  let g = l ? l.initial === !1 : !1;
  g = g || u === !1;
  const y = g ? h : u;
  if (y && typeof y != 'boolean' && !Bo(y)) {
    const x = Array.isArray(y) ? y : [y];
    for (let b = 0; b < x.length; b++) {
      const T = rd(e, x[b]);
      if (T) {
        const { transitionEnd: M, transition: D, ...E } = T;
        for (const L in E) {
          let R = E[L];
          if (Array.isArray(R)) {
            const Y = g ? R.length - 1 : 0;
            R = R[Y];
          }
          R !== null && (o[L] = R);
        }
        for (const L in M) o[L] = M[L];
      }
    }
  }
  return o;
}
const mb = (e) => (i, l) => {
    const r = rt.useContext(Uo),
      o = rt.useContext(Lo),
      c = () => mO(e, i, r, o);
    return l ? c() : Fh(c);
  },
  yO = mb({ scrapeMotionValuesFromProps: md, createRenderState: yd }),
  vO = mb({ scrapeMotionValuesFromProps: Zx, createRenderState: pb }),
  xO = Symbol.for('motionComponentSymbol');
function bO(e, i, l) {
  const r = rt.useRef(l);
  rt.useInsertionEffect(() => {
    r.current = l;
  });
  const o = rt.useRef(null);
  return rt.useCallback(
    (c) => {
      var h;
      c && ((h = e.onMount) == null || h.call(e, c));
      const u = r.current;
      if (typeof u == 'function')
        if (c) {
          const m = u(c);
          typeof m == 'function' && (o.current = m);
        } else o.current ? (o.current(), (o.current = null)) : u(c);
      else u && (u.current = c);
      i && (c ? i.mount(c) : i.unmount());
    },
    [i],
  );
}
const gb = rt.createContext({});
function Jl(e) {
  return (
    e &&
    typeof e == 'object' &&
    Object.prototype.hasOwnProperty.call(e, 'current')
  );
}
function SO(e, i, l, r, o, c) {
  var R, Y;
  const { visualElement: u } = rt.useContext(Uo),
    h = rt.useContext(cb),
    m = rt.useContext(Lo),
    p = rt.useContext(gd),
    g = p.reducedMotion,
    y = p.skipAnimations,
    x = rt.useRef(null),
    b = rt.useRef(!1);
  (r = r || h.renderer),
    !x.current &&
      r &&
      ((x.current = r(e, {
        visualState: i,
        parent: u,
        props: l,
        presenceContext: m,
        blockInitialAnimation: m ? m.initial === !1 : !1,
        reducedMotionConfig: g,
        skipAnimations: y,
        isSVG: c,
      })),
      b.current && x.current && (x.current.manuallyAnimateOnMount = !0));
  const T = x.current,
    M = rt.useContext(gb);
  T &&
    !T.projection &&
    o &&
    (T.type === 'html' || T.type === 'svg') &&
    TO(x.current, l, o, M);
  const D = rt.useRef(!1);
  rt.useInsertionEffect(() => {
    T && D.current && T.update(l, m);
  });
  const E = l[wx],
    L = rt.useRef(
      !!E &&
        typeof window < 'u' &&
        !((R = window.MotionHandoffIsComplete) != null && R.call(window, E)) &&
        ((Y = window.MotionHasOptimisedAnimation) == null
          ? void 0
          : Y.call(window, E)),
    );
  return (
    jv(() => {
      (b.current = !0),
        T &&
          ((D.current = !0),
          (window.MotionIsMounted = !0),
          T.updateFeatures(),
          T.scheduleRenderMicrotask(),
          L.current && T.animationState && T.animationState.animateChanges());
    }),
    rt.useEffect(() => {
      T &&
        (!L.current && T.animationState && T.animationState.animateChanges(),
        L.current &&
          (queueMicrotask(() => {
            var Q;
            (Q = window.MotionHandoffMarkAsComplete) == null ||
              Q.call(window, E);
          }),
          (L.current = !1)),
        (T.enteringChildren = void 0));
    }),
    T
  );
}
function TO(e, i, l, r) {
  const {
    layoutId: o,
    layout: c,
    drag: u,
    dragConstraints: h,
    layoutScroll: m,
    layoutRoot: p,
    layoutAnchor: g,
    layoutCrossfade: y,
  } = i;
  (e.projection = new l(
    e.latestValues,
    i['data-framer-portal-id'] ? void 0 : yb(e.parent),
  )),
    e.projection.setOptions({
      layoutId: o,
      layout: c,
      alwaysMeasureLayout: !!u || (h && Jl(h)),
      visualElement: e,
      animationType: typeof c == 'string' ? c : 'both',
      initialPromotionConfig: r,
      crossfade: y,
      layoutScroll: m,
      layoutRoot: p,
      layoutAnchor: g,
    });
}
function yb(e) {
  if (e) return e.options.allowProjection !== !1 ? e.projection : yb(e.parent);
}
function jf(e, { forwardMotionProps: i = !1, type: l } = {}, r, o) {
  r && iO(r);
  const c = l ? l === 'svg' : vd(e),
    u = c ? vO : yO;
  function h(p, g) {
    let y;
    const x = { ...rt.useContext(gd), ...p, layoutId: AO(p) },
      { isStatic: b } = x,
      T = oO(p),
      M = u(p, b);
    if (!b && typeof window < 'u') {
      wO();
      const D = EO(x);
      (y = D.MeasureLayout),
        (T.visualElement = SO(e, M, x, o, D.ProjectionNode, c));
    }
    return H.jsxs(Uo.Provider, {
      value: T,
      children: [
        y && T.visualElement
          ? H.jsx(y, { visualElement: T.visualElement, ...x })
          : null,
        pO(e, p, bO(M, T.visualElement, g), M, b, i, c),
      ],
    });
  }
  h.displayName = `motion.${typeof e == 'string' ? e : `create(${e.displayName ?? e.name ?? ''})`}`;
  const m = rt.forwardRef(h);
  return (m[xO] = e), m;
}
function AO({ layoutId: e }) {
  const i = rt.useContext(Yh).id;
  return i && e !== void 0 ? i + '-' + e : e;
}
function wO(e, i) {
  rt.useContext(cb).strict;
}
function EO(e) {
  const i = fb(),
    { drag: l, layout: r } = i;
  if (!l && !r) return {};
  const o = { ...l, ...r };
  return {
    MeasureLayout:
      (l != null && l.isEnabled(e)) || (r != null && r.isEnabled(e))
        ? o.MeasureLayout
        : void 0,
    ProjectionNode: o.ProjectionNode,
  };
}
function kO(e, i) {
  if (typeof Proxy > 'u') return jf;
  const l = new Map(),
    r = (c, u) => jf(c, u, e, i),
    o = (c, u) => r(c, u);
  return new Proxy(o, {
    get: (c, u) =>
      u === 'create'
        ? r
        : (l.has(u) || l.set(u, jf(u, void 0, e, i)), l.get(u)),
  });
}
const CO = (e, i) =>
  (i.isSVG ?? vd(e))
    ? new n4(i)
    : new Zz(i, { allowProjection: e !== rt.Fragment });
class MO extends Oi {
  constructor(i) {
    super(i), i.animationState || (i.animationState = s4(i));
  }
  updateAnimationControlsSubscription() {
    const { animate: i } = this.node.getProps();
    Bo(i) && (this.unmountControls = i.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: i } = this.node.getProps(),
      { animate: l } = this.node.prevProps || {};
    i !== l && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var i;
    this.node.animationState.reset(),
      (i = this.unmountControls) == null || i.call(this);
  }
}
let DO = 0;
class zO extends Oi {
  constructor() {
    super(...arguments), (this.id = DO++), (this.isExitComplete = !1);
  }
  update() {
    var c;
    if (!this.node.presenceContext) return;
    const { isPresent: i, onExitComplete: l } = this.node.presenceContext,
      { isPresent: r } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || i === r) return;
    if (i && r === !1) {
      if (this.isExitComplete) {
        const { initial: u, custom: h } = this.node.getProps();
        if (typeof u == 'string') {
          const m = nl(this.node, u, h);
          if (m) {
            const { transition: p, transitionEnd: g, ...y } = m;
            for (const x in y)
              (c = this.node.getValue(x)) == null || c.jump(y[x]);
          }
        }
        this.node.animationState.reset(),
          this.node.animationState.animateChanges();
      } else this.node.animationState.setActive('exit', !1);
      this.isExitComplete = !1;
      return;
    }
    const o = this.node.animationState.setActive('exit', !i);
    l &&
      !i &&
      o.then(() => {
        (this.isExitComplete = !0), l(this.id);
      });
  }
  mount() {
    const { register: i, onExitComplete: l } = this.node.presenceContext || {};
    l && l(this.id), i && (this.unmount = i(this.id));
  }
  unmount() {}
}
const OO = { animation: { Feature: MO }, exit: { Feature: zO } };
function Rr(e) {
  return { point: { x: e.pageX, y: e.pageY } };
}
const RO = (e) => (i) => cd(i) && e(i, Rr(i));
function yr(e, i, l, r) {
  return Er(e, i, RO(l), r);
}
const vb = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  S1 = (e, i) => Math.abs(e - i);
function _O(e, i) {
  const l = S1(e.x, i.x),
    r = S1(e.y, i.y);
  return Math.sqrt(l ** 2 + r ** 2);
}
const T1 = new Set(['auto', 'scroll']);
class xb {
  constructor(
    i,
    l,
    {
      transformPagePoint: r,
      contextWindow: o = window,
      dragSnapToOrigin: c = !1,
      distanceThreshold: u = 3,
      element: h,
    } = {},
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.lastRawMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.scrollPositions = new Map()),
      (this.removeScrollListeners = null),
      (this.onElementScroll = (b) => {
        this.handleScroll(b.target);
      }),
      (this.onWindowScroll = () => {
        this.handleScroll(window);
      }),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        this.lastRawMoveEventInfo &&
          (this.lastMoveEventInfo = ao(
            this.lastRawMoveEventInfo,
            this.transformPagePoint,
          ));
        const b = Bf(this.lastMoveEventInfo, this.history),
          T = this.startEvent !== null,
          M = _O(b.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
        if (!T && !M) return;
        const { point: D } = b,
          { timestamp: E } = be;
        this.history.push({ ...D, timestamp: E });
        const { onStart: L, onMove: R } = this.handlers;
        T ||
          (L && L(this.lastMoveEvent, b),
          (this.startEvent = this.lastMoveEvent)),
          R && R(this.lastMoveEvent, b);
      }),
      (this.handlePointerMove = (b, T) => {
        (this.lastMoveEvent = b),
          (this.lastRawMoveEventInfo = T),
          (this.lastMoveEventInfo = ao(T, this.transformPagePoint)),
          Yt.update(this.updatePoint, !0);
      }),
      (this.handlePointerUp = (b, T) => {
        this.end();
        const { onEnd: M, onSessionEnd: D, resumeAnimation: E } = this.handlers;
        if (
          ((this.dragSnapToOrigin || !this.startEvent) && E && E(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const L = Bf(
          b.type === 'pointercancel'
            ? this.lastMoveEventInfo
            : ao(T, this.transformPagePoint),
          this.history,
        );
        this.startEvent && M && M(b, L), D && D(b, L);
      }),
      !cd(i))
    )
      return;
    (this.dragSnapToOrigin = c),
      (this.handlers = l),
      (this.transformPagePoint = r),
      (this.distanceThreshold = u),
      (this.contextWindow = o || window);
    const m = Rr(i),
      p = ao(m, this.transformPagePoint),
      { point: g } = p,
      { timestamp: y } = be;
    this.history = [{ ...g, timestamp: y }];
    const { onSessionStart: x } = l;
    x && x(i, Bf(p, this.history)),
      (this.removeListeners = Dr(
        yr(this.contextWindow, 'pointermove', this.handlePointerMove),
        yr(this.contextWindow, 'pointerup', this.handlePointerUp),
        yr(this.contextWindow, 'pointercancel', this.handlePointerUp),
      )),
      h && this.startScrollTracking(h);
  }
  startScrollTracking(i) {
    let l = i.parentElement;
    for (; l; ) {
      const r = getComputedStyle(l);
      (T1.has(r.overflowX) || T1.has(r.overflowY)) &&
        this.scrollPositions.set(l, { x: l.scrollLeft, y: l.scrollTop }),
        (l = l.parentElement);
    }
    this.scrollPositions.set(window, { x: window.scrollX, y: window.scrollY }),
      window.addEventListener('scroll', this.onElementScroll, { capture: !0 }),
      window.addEventListener('scroll', this.onWindowScroll),
      (this.removeScrollListeners = () => {
        window.removeEventListener('scroll', this.onElementScroll, {
          capture: !0,
        }),
          window.removeEventListener('scroll', this.onWindowScroll);
      });
  }
  handleScroll(i) {
    const l = this.scrollPositions.get(i);
    if (!l) return;
    const r = i === window,
      o = r
        ? { x: window.scrollX, y: window.scrollY }
        : { x: i.scrollLeft, y: i.scrollTop },
      c = { x: o.x - l.x, y: o.y - l.y };
    (c.x === 0 && c.y === 0) ||
      (r
        ? this.lastMoveEventInfo &&
          ((this.lastMoveEventInfo.point.x += c.x),
          (this.lastMoveEventInfo.point.y += c.y))
        : this.history.length > 0 &&
          ((this.history[0].x -= c.x), (this.history[0].y -= c.y)),
      this.scrollPositions.set(i, o),
      Yt.update(this.updatePoint, !0));
  }
  updateHandlers(i) {
    this.handlers = i;
  }
  end() {
    this.removeListeners && this.removeListeners(),
      this.removeScrollListeners && this.removeScrollListeners(),
      this.scrollPositions.clear(),
      Di(this.updatePoint);
  }
}
function ao(e, i) {
  return i ? { point: i(e.point) } : e;
}
function A1(e, i) {
  return { x: e.x - i.x, y: e.y - i.y };
}
function Bf({ point: e }, i) {
  return {
    point: e,
    delta: A1(e, bb(i)),
    offset: A1(e, NO(i)),
    velocity: LO(i, 0.1),
  };
}
function NO(e) {
  return e[0];
}
function bb(e) {
  return e[e.length - 1];
}
function LO(e, i) {
  if (e.length < 2) return { x: 0, y: 0 };
  let l = e.length - 1,
    r = null;
  const o = bb(e);
  for (; l >= 0 && ((r = e[l]), !(o.timestamp - r.timestamp > Je(i))); ) l--;
  if (!r) return { x: 0, y: 0 };
  r === e[0] &&
    e.length > 2 &&
    o.timestamp - r.timestamp > Je(i) * 2 &&
    (r = e[1]);
  const c = fn(o.timestamp - r.timestamp);
  if (c === 0) return { x: 0, y: 0 };
  const u = { x: (o.x - r.x) / c, y: (o.y - r.y) / c };
  return u.x === 1 / 0 && (u.x = 0), u.y === 1 / 0 && (u.y = 0), u;
}
function jO(e, { min: i, max: l }, r) {
  return (
    i !== void 0 && e < i
      ? (e = r ? Kt(i, e, r.min) : Math.max(e, i))
      : l !== void 0 && e > l && (e = r ? Kt(l, e, r.max) : Math.min(e, l)),
    e
  );
}
function w1(e, i, l) {
  return {
    min: i !== void 0 ? e.min + i : void 0,
    max: l !== void 0 ? e.max + l - (e.max - e.min) : void 0,
  };
}
function BO(e, { top: i, left: l, bottom: r, right: o }) {
  return { x: w1(e.x, l, o), y: w1(e.y, i, r) };
}
function E1(e, i) {
  let l = i.min - e.min,
    r = i.max - e.max;
  return i.max - i.min < e.max - e.min && ([l, r] = [r, l]), { min: l, max: r };
}
function VO(e, i) {
  return { x: E1(e.x, i.x), y: E1(e.y, i.y) };
}
function UO(e, i) {
  let l = 0.5;
  const r = ze(e),
    o = ze(i);
  return (
    o > r
      ? (l = Tr(i.min, i.max - r, e.min))
      : r > o && (l = Tr(e.min, e.max - o, i.min)),
    Dn(0, 1, l)
  );
}
function HO(e, i) {
  const l = {};
  return (
    i.min !== void 0 && (l.min = i.min - e.min),
    i.max !== void 0 && (l.max = i.max - e.min),
    l
  );
}
const Th = 0.35;
function qO(e = Th) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = Th),
    { x: k1(e, 'left', 'right'), y: k1(e, 'top', 'bottom') }
  );
}
function k1(e, i, l) {
  return { min: C1(e, i), max: C1(e, l) };
}
function C1(e, i) {
  return typeof e == 'number' ? e : e[i] || 0;
}
const PO = new WeakMap();
class GO {
  constructor(i) {
    (this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = he()),
      (this.latestPointerEvent = null),
      (this.latestPanInfo = null),
      (this.visualElement = i);
  }
  start(i, { snapToCursor: l = !1, distanceThreshold: r } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1) return;
    const c = (y) => {
        l && this.snapToCursor(Rr(y).point), this.stopAnimation();
      },
      u = (y, x) => {
        const { drag: b, dragPropagation: T, onDragStart: M } = this.getProps();
        if (
          b &&
          !T &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = mz(b)),
          !this.openDragLock)
        )
          return;
        (this.latestPointerEvent = y),
          (this.latestPanInfo = x),
          (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          kn((E) => {
            let L = this.getAxisMotionValue(E).get() || 0;
            if (Mn.test(L)) {
              const { projection: R } = this.visualElement;
              if (R && R.layout) {
                const Y = R.layout.layoutBox[E];
                Y && (L = ze(Y) * (parseFloat(L) / 100));
              }
            }
            this.originPoint[E] = L;
          }),
          M && Yt.update(() => M(y, x), !1, !0),
          dh(this.visualElement, 'transform');
        const { animationState: D } = this.visualElement;
        D && D.setActive('whileDrag', !0);
      },
      h = (y, x) => {
        (this.latestPointerEvent = y), (this.latestPanInfo = x);
        const {
          dragPropagation: b,
          dragDirectionLock: T,
          onDirectionLock: M,
          onDrag: D,
        } = this.getProps();
        if (!b && !this.openDragLock) return;
        const { offset: E } = x;
        if (T && this.currentDirection === null) {
          (this.currentDirection = FO(E)),
            this.currentDirection !== null && M && M(this.currentDirection);
          return;
        }
        this.updateAxis('x', x.point, E),
          this.updateAxis('y', x.point, E),
          this.visualElement.render(),
          D && Yt.update(() => D(y, x), !1, !0);
      },
      m = (y, x) => {
        (this.latestPointerEvent = y),
          (this.latestPanInfo = x),
          this.stop(y, x),
          (this.latestPointerEvent = null),
          (this.latestPanInfo = null);
      },
      p = () => {
        const { dragSnapToOrigin: y } = this.getProps();
        (y || this.constraints) && this.startAnimation({ x: 0, y: 0 });
      },
      { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new xb(
      i,
      {
        onSessionStart: c,
        onStart: u,
        onMove: h,
        onSessionEnd: m,
        resumeAnimation: p,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: g,
        distanceThreshold: r,
        contextWindow: vb(this.visualElement),
        element: this.visualElement.current,
      },
    );
  }
  stop(i, l) {
    const r = i || this.latestPointerEvent,
      o = l || this.latestPanInfo,
      c = this.isDragging;
    if ((this.cancel(), !c || !o || !r)) return;
    const { velocity: u } = o;
    this.startAnimation(u);
    const { onDragEnd: h } = this.getProps();
    h && Yt.postRender(() => h(r, o));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: i, animationState: l } = this.visualElement;
    i && (i.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: r } = this.getProps();
    !r &&
      this.openDragLock &&
      (this.openDragLock(), (this.openDragLock = null)),
      l && l.setActive('whileDrag', !1);
  }
  endPanSession() {
    this.panSession && this.panSession.end(), (this.panSession = void 0);
  }
  updateAxis(i, l, r) {
    const { drag: o } = this.getProps();
    if (!r || !ro(i, o, this.currentDirection)) return;
    const c = this.getAxisMotionValue(i);
    let u = this.originPoint[i] + r[i];
    this.constraints &&
      this.constraints[i] &&
      (u = jO(u, this.constraints[i], this.elastic[i])),
      c.set(u);
  }
  resolveConstraints() {
    var c;
    const { dragConstraints: i, dragElastic: l } = this.getProps(),
      r =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (c = this.visualElement.projection) == null
            ? void 0
            : c.layout,
      o = this.constraints;
    i && Jl(i)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : i && r
        ? (this.constraints = BO(r.layoutBox, i))
        : (this.constraints = !1),
      (this.elastic = qO(l)),
      o !== this.constraints &&
        !Jl(i) &&
        r &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        kn((u) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(u) &&
            (this.constraints[u] = HO(r.layoutBox[u], this.constraints[u]));
        });
  }
  resolveRefConstraints() {
    const { dragConstraints: i, onMeasureDragConstraints: l } = this.getProps();
    if (!i || !Jl(i)) return !1;
    const r = i.current,
      { projection: o } = this.visualElement;
    if (!o || !o.layout) return !1;
    const c = Yz(r, o.root, this.visualElement.getTransformPagePoint());
    let u = VO(o.layout.layoutBox, c);
    if (l) {
      const h = l(qz(u));
      (this.hasMutatedConstraints = !!h), h && (u = qx(h));
    }
    return u;
  }
  startAnimation(i) {
    const {
        drag: l,
        dragMomentum: r,
        dragElastic: o,
        dragTransition: c,
        dragSnapToOrigin: u,
        onDragTransitionEnd: h,
      } = this.getProps(),
      m = this.constraints || {},
      p = kn((g) => {
        if (!ro(g, l, this.currentDirection)) return;
        let y = (m && m[g]) || {};
        (u === !0 || u === g) && (y = { min: 0, max: 0 });
        const x = o ? 200 : 1e6,
          b = o ? 40 : 1e7,
          T = {
            type: 'inertia',
            velocity: r ? i[g] : 0,
            bounceStiffness: x,
            bounceDamping: b,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...c,
            ...y,
          };
        return this.startAxisValueAnimation(g, T);
      });
    return Promise.all(p).then(h);
  }
  startAxisValueAnimation(i, l) {
    const r = this.getAxisMotionValue(i);
    return (
      dh(this.visualElement, i), r.start(ad(i, r, 0, l, this.visualElement, !1))
    );
  }
  stopAnimation() {
    kn((i) => this.getAxisMotionValue(i).stop());
  }
  getAxisMotionValue(i) {
    const l = `_drag${i.toUpperCase()}`,
      r = this.visualElement.getProps(),
      o = r[l];
    return (
      o ||
      this.visualElement.getValue(i, (r.initial ? r.initial[i] : void 0) || 0)
    );
  }
  snapToCursor(i) {
    kn((l) => {
      const { drag: r } = this.getProps();
      if (!ro(l, r, this.currentDirection)) return;
      const { projection: o } = this.visualElement,
        c = this.getAxisMotionValue(l);
      if (o && o.layout) {
        const { min: u, max: h } = o.layout.layoutBox[l],
          m = c.get() || 0;
        c.set(i[l] - Kt(u, h, 0.5) + m);
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: i, dragConstraints: l } = this.getProps(),
      { projection: r } = this.visualElement;
    if (!Jl(l) || !r || !this.constraints) return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    kn((u) => {
      const h = this.getAxisMotionValue(u);
      if (h && this.constraints !== !1) {
        const m = h.get();
        o[u] = UO({ min: m, max: m }, this.constraints[u]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    (this.visualElement.current.style.transform = c ? c({}, '') : 'none'),
      r.root && r.root.updateScroll(),
      r.updateLayout(),
      (this.constraints = !1),
      this.resolveConstraints(),
      kn((u) => {
        if (!ro(u, i, null)) return;
        const h = this.getAxisMotionValue(u),
          { min: m, max: p } = this.constraints[u];
        h.set(Kt(m, p, o[u]));
      }),
      this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current) return;
    PO.set(this.visualElement, this);
    const i = this.visualElement.current,
      l = yr(i, 'pointerdown', (p) => {
        const { drag: g, dragListener: y = !0 } = this.getProps(),
          x = p.target,
          b = x !== i && Sz(x);
        g && y && !b && this.start(p);
      });
    let r;
    const o = () => {
        const { dragConstraints: p } = this.getProps();
        Jl(p) &&
          p.current &&
          ((this.constraints = this.resolveRefConstraints()),
          r ||
            (r = YO(i, p.current, () =>
              this.scalePositionWithinConstraints(),
            )));
      },
      { projection: c } = this.visualElement,
      u = c.addEventListener('measure', o);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()),
      Yt.read(o);
    const h = Er(window, 'resize', () => this.scalePositionWithinConstraints()),
      m = c.addEventListener(
        'didUpdate',
        ({ delta: p, hasLayoutChanged: g }) => {
          this.isDragging &&
            g &&
            (kn((y) => {
              const x = this.getAxisMotionValue(y);
              x &&
                ((this.originPoint[y] += p[y].translate),
                x.set(x.get() + p[y].translate));
            }),
            this.visualElement.render());
        },
      );
    return () => {
      h(), l(), u(), m && m(), r && r();
    };
  }
  getProps() {
    const i = this.visualElement.getProps(),
      {
        drag: l = !1,
        dragDirectionLock: r = !1,
        dragPropagation: o = !1,
        dragConstraints: c = !1,
        dragElastic: u = Th,
        dragMomentum: h = !0,
      } = i;
    return {
      ...i,
      drag: l,
      dragDirectionLock: r,
      dragPropagation: o,
      dragConstraints: c,
      dragElastic: u,
      dragMomentum: h,
    };
  }
}
function M1(e) {
  let i = !0;
  return () => {
    if (i) {
      i = !1;
      return;
    }
    e();
  };
}
function YO(e, i, l) {
  const r = L0(e, M1(l)),
    o = L0(i, M1(l));
  return () => {
    r(), o();
  };
}
function ro(e, i, l) {
  return (i === !0 || i === e) && (l === null || l === e);
}
function FO(e, i = 10) {
  let l = null;
  return Math.abs(e.y) > i ? (l = 'y') : Math.abs(e.x) > i && (l = 'x'), l;
}
class IO extends Oi {
  constructor(i) {
    super(i),
      (this.removeGroupControls = hn),
      (this.removeListeners = hn),
      (this.controls = new GO(i));
  }
  mount() {
    const { dragControls: i } = this.node.getProps();
    i && (this.removeGroupControls = i.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || hn);
  }
  update() {
    const { dragControls: i } = this.node.getProps(),
      { dragControls: l } = this.node.prevProps || {};
    i !== l &&
      (this.removeGroupControls(),
      i && (this.removeGroupControls = i.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(),
      this.removeListeners(),
      this.controls.isDragging || this.controls.endPanSession();
  }
}
const Vf = (e) => (i, l) => {
  e && Yt.update(() => e(i, l), !1, !0);
};
class XO extends Oi {
  constructor() {
    super(...arguments), (this.removePointerDownListener = hn);
  }
  onPointerDown(i) {
    this.session = new xb(i, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: vb(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: i,
      onPanStart: l,
      onPan: r,
      onPanEnd: o,
    } = this.node.getProps();
    return {
      onSessionStart: Vf(i),
      onStart: Vf(l),
      onMove: Vf(r),
      onEnd: (c, u) => {
        delete this.session, o && Yt.postRender(() => o(c, u));
      },
    };
  }
  mount() {
    this.removePointerDownListener = yr(this.node.current, 'pointerdown', (i) =>
      this.onPointerDown(i),
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let Uf = !1;
class QO extends rt.Component {
  componentDidMount() {
    const {
        visualElement: i,
        layoutGroup: l,
        switchLayoutGroup: r,
        layoutId: o,
      } = this.props,
      { projection: c } = i;
    c &&
      (l.group && l.group.add(c),
      r && r.register && o && r.register(c),
      Uf && c.root.didUpdate(),
      c.addEventListener('animationComplete', () => {
        this.safeToRemove();
      }),
      c.setOptions({
        ...c.options,
        layoutDependency: this.props.layoutDependency,
        onExitComplete: () => this.safeToRemove(),
      })),
      (go.hasEverUpdated = !0);
  }
  getSnapshotBeforeUpdate(i) {
    const {
        layoutDependency: l,
        visualElement: r,
        drag: o,
        isPresent: c,
      } = this.props,
      { projection: u } = r;
    return (
      u &&
        ((u.isPresent = c),
        i.layoutDependency !== l &&
          u.setOptions({ ...u.options, layoutDependency: l }),
        (Uf = !0),
        o || i.layoutDependency !== l || l === void 0 || i.isPresent !== c
          ? u.willUpdate()
          : this.safeToRemove(),
        i.isPresent !== c &&
          (c
            ? u.promote()
            : u.relegate() ||
              Yt.postRender(() => {
                const h = u.getStack();
                (!h || !h.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { visualElement: i, layoutAnchor: l } = this.props,
      { projection: r } = i;
    r &&
      ((r.options.layoutAnchor = l),
      r.root.didUpdate(),
      ud.postRender(() => {
        !r.currentAnimation && r.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: i,
        layoutGroup: l,
        switchLayoutGroup: r,
      } = this.props,
      { projection: o } = i;
    (Uf = !0),
      o &&
        (o.scheduleCheckAfterUnmount(),
        l && l.group && l.group.remove(o),
        r && r.deregister && r.deregister(o));
  }
  safeToRemove() {
    const { safeToRemove: i } = this.props;
    i && i();
  }
  render() {
    return null;
  }
}
function Sb(e) {
  const [i, l] = ub(),
    r = rt.useContext(Yh);
  return H.jsx(QO, {
    ...e,
    layoutGroup: r,
    switchLayoutGroup: rt.useContext(gb),
    isPresent: i,
    safeToRemove: l,
  });
}
const KO = {
  pan: { Feature: XO },
  drag: { Feature: IO, ProjectionNode: ob, MeasureLayout: Sb },
};
function D1(e, i, l) {
  const { props: r } = e;
  e.animationState &&
    r.whileHover &&
    e.animationState.setActive('whileHover', l === 'Start');
  const o = 'onHover' + l,
    c = r[o];
  c && Yt.postRender(() => c(i, Rr(i)));
}
class ZO extends Oi {
  mount() {
    const { current: i } = this.node;
    i &&
      (this.unmount = yz(
        i,
        (l, r) => (D1(this.node, r, 'Start'), (o) => D1(this.node, o, 'End')),
      ));
  }
  unmount() {}
}
class JO extends Oi {
  constructor() {
    super(...arguments), (this.isActive = !1);
  }
  onFocus() {
    let i = !1;
    try {
      i = this.node.current.matches(':focus-visible');
    } catch {
      i = !0;
    }
    !i ||
      !this.node.animationState ||
      (this.node.animationState.setActive('whileFocus', !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive('whileFocus', !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = Dr(
      Er(this.node.current, 'focus', () => this.onFocus()),
      Er(this.node.current, 'blur', () => this.onBlur()),
    );
  }
  unmount() {}
}
function z1(e, i, l) {
  const { props: r } = e;
  if (e.current instanceof HTMLButtonElement && e.current.disabled) return;
  e.animationState &&
    r.whileTap &&
    e.animationState.setActive('whileTap', l === 'Start');
  const o = 'onTap' + (l === 'End' ? '' : l),
    c = r[o];
  c && Yt.postRender(() => c(i, Rr(i)));
}
class $O extends Oi {
  mount() {
    const { current: i } = this.node;
    if (!i) return;
    const { globalTapTarget: l, propagate: r } = this.node.props;
    this.unmount = Az(
      i,
      (o, c) => (
        z1(this.node, c, 'Start'),
        (u, { success: h }) => z1(this.node, u, h ? 'End' : 'Cancel')
      ),
      {
        useGlobalTarget: l,
        stopPropagation: (r == null ? void 0 : r.tap) === !1,
      },
    );
  }
  unmount() {}
}
const Ah = new WeakMap(),
  Hf = new WeakMap(),
  WO = (e) => {
    const i = Ah.get(e.target);
    i && i(e);
  },
  tR = (e) => {
    e.forEach(WO);
  };
function eR({ root: e, ...i }) {
  const l = e || document;
  Hf.has(l) || Hf.set(l, {});
  const r = Hf.get(l),
    o = JSON.stringify(i);
  return r[o] || (r[o] = new IntersectionObserver(tR, { root: e, ...i })), r[o];
}
function nR(e, i, l) {
  const r = eR(i);
  return (
    Ah.set(e, l),
    r.observe(e),
    () => {
      Ah.delete(e), r.unobserve(e);
    }
  );
}
const iR = { some: 0, all: 1 };
class lR extends Oi {
  constructor() {
    super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
  }
  startObserver() {
    var m;
    (m = this.stopObserver) == null || m.call(this);
    const { viewport: i = {} } = this.node.getProps(),
      { root: l, margin: r, amount: o = 'some', once: c } = i,
      u = {
        root: l ? l.current : void 0,
        rootMargin: r,
        threshold: typeof o == 'number' ? o : iR[o],
      },
      h = (p) => {
        const { isIntersecting: g } = p;
        if (
          this.isInView === g ||
          ((this.isInView = g), c && !g && this.hasEnteredView)
        )
          return;
        g && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive('whileInView', g);
        const { onViewportEnter: y, onViewportLeave: x } = this.node.getProps(),
          b = g ? y : x;
        b && b(p);
      };
    this.stopObserver = nR(this.node.current, u, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > 'u') return;
    const { props: i, prevProps: l } = this.node;
    ['amount', 'margin', 'root'].some(aR(i, l)) && this.startObserver();
  }
  unmount() {
    var i;
    (i = this.stopObserver) == null || i.call(this),
      (this.hasEnteredView = !1),
      (this.isInView = !1);
  }
}
function aR({ viewport: e = {} }, { viewport: i = {} } = {}) {
  return (l) => e[l] !== i[l];
}
const rR = {
    inView: { Feature: lR },
    tap: { Feature: $O },
    focus: { Feature: JO },
    hover: { Feature: ZO },
  },
  sR = { layout: { ProjectionNode: ob, MeasureLayout: Sb } },
  oR = { ...OO, ...rR, ...KO, ...sR },
  vr = kO(oR, CO),
  Kl = ({ name: e, provider: i, price: l, multiplier: r }) =>
    H.jsxs('div', {
      className:
        'flex items-center justify-between py-3 border-b border-zinc-100 hover:bg-zinc-50 px-4 transition-colors',
      children: [
        H.jsxs('div', {
          className: 'flex items-center gap-3',
          children: [
            H.jsx('div', {
              className: 'w-2 h-2 rounded-full bg-green-500 animate-pulse',
            }),
            H.jsx('span', {
              className: 'font-mono text-sm text-zinc-800',
              children: e,
            }),
          ],
        }),
        H.jsxs('div', {
          className: 'flex items-center gap-6',
          children: [
            H.jsx('span', {
              className:
                'px-2 py-0.5 bg-zinc-100 text-zinc-500 text-[10px] font-bold rounded uppercase tracking-wider border border-zinc-200',
              children: i,
            }),
            H.jsxs('div', {
              className: 'flex flex-col items-end min-w-[80px]',
              children: [
                H.jsx('span', {
                  className: 'text-[10px] text-zinc-400 uppercase font-medium',
                  children: '模型单价',
                }),
                H.jsx('span', {
                  className: 'text-sm font-mono text-zinc-600',
                  children: l,
                }),
              ],
            }),
            H.jsxs('div', {
              className: 'flex flex-col items-end min-w-[80px]',
              children: [
                H.jsx('span', {
                  className: 'text-[10px] text-zinc-400 uppercase font-medium',
                  children: '分组倍率',
                }),
                H.jsx('span', {
                  className: 'text-sm font-mono text-zinc-600',
                  children: r,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  uR = () => {
    const e = [
        {
          name: '聚合官Key',
          badge: '综合聚合',
          ratio: '6.12x',
          summary:
            '覆盖面最广的综合分组，汇聚 OpenAI、Google、Anthropic、阿里、Mistral、DeepSeek、MiniMax、Kimi 等多家供应商。',
          fit: '希望一个令牌覆盖多供应商、多端点、多模态能力的用户。',
          note:
            '该分组模型数量最多，包含文本、视觉、embedding、生图、生视频等能力；计费跨度也最大，调用前建议在模型广场确认价格。',
          examples: ['GPT 系列', 'Gemini 系列', 'Claude 系列', 'Qwen / DeepSeek / Kimi'],
        },
        {
          name: 'GPT Pro',
          badge: 'OpenAI 高阶',
          ratio: '2x',
          summary:
            '面向 OpenAI 高阶能力的分组，主要承载 GPT 系列的强推理、代码、长上下文与多模态模型。',
          fit: '复杂推理、代码生成、Agent 工作流、需要稳定 OpenAI 兼容体验的场景。',
          note:
            '适合对模型能力要求更高的任务；如果只是连通性测试或轻量任务，优先使用基础分组验证。',
          examples: ['gpt-5.4-mini', 'gpt-5.4', 'gpt-5.5'],
        },
        {
          name: 'CC Max',
          badge: 'Claude 高阶',
          ratio: '3x',
          summary:
            '面向 Claude Code 和高强度 Claude 调用的高级分组，覆盖 Sonnet、Opus、Haiku 等 Claude 能力。',
          fit: 'Claude Code、长上下文代码库分析、复杂文档处理、智能体任务。',
          note:
            '该分组倍率高于基础分组，建议给明确需要 Claude 高阶能力的令牌使用。',
          examples: ['claude-sonnet-4.6', 'claude-opus-4.6', 'claude-haiku-4.5'],
        },
        {
          name: 'Gemini Ultra',
          badge: 'Google 高阶',
          ratio: '2x',
          summary:
            '面向 Gemini 高阶模型的分组，重点覆盖长上下文、多模态理解、音视频理解和轻量快速响应。',
          fit: 'Gemini CLI、多模态分析、长文本处理、需要 Google 模型能力的项目。',
          note:
            'Gemini 相关客户端可能使用 Gemini 原生端点或 OpenAI 兼容端点，配置时要和教程中的 Base URL 保持一致。',
          examples: ['gemini-3-flash-preview', 'gemini-3.1-pro-preview', 'gemini-2.5-flash'],
        },
        {
          name: 'Image-2',
          badge: '图像生成',
          ratio: '1.5x',
          summary:
            '专门用于 GPT-Image-2 等图像生成模型的分组，计费会结合模型基础价格、图片 size、quality 和数量。',
          fit: '文生图、图像编辑、不同分辨率和质量档位的图片生成测试。',
          note:
            '图片模型会按媒体计费规则处理；请求 size 或 quality 不在配置范围时，会按后台缺省策略处理。',
          examples: ['gpt-image-2'],
        },
      ],
      l = (s) =>
        H.jsx('span', {
          className:
            'inline-flex items-center rounded-md bg-gray-50 border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-700',
          children: s,
        }),
      r = (s, a) =>
        H.jsxs('article', {
          className:
            'rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300 transition-colors',
          children: [
            H.jsxs('div', {
              className: 'flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between',
              children: [
                H.jsxs('div', {
                  className: 'min-w-0',
                  children: [
                    H.jsxs('div', {
                      className: 'flex flex-wrap items-center gap-3',
                      children: [
                        H.jsx('span', {
                          className:
                            'inline-flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-xs font-black text-gray-500',
                          children: String(a + 1).padStart(2, '0'),
                        }),
                        H.jsx('h3', {
                          className: 'text-2xl font-black text-gray-950 tracking-tight',
                          children: s.name,
                        }),
                        H.jsx('span', {
                          className:
                            'rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-bold text-gray-600',
                          children: s.badge,
                        }),
                      ],
                    }),
                    H.jsx('p', {
                      className: 'mt-4 max-w-3xl text-sm leading-7 font-medium text-gray-650',
                      children: s.summary,
                    }),
                  ],
                }),
                H.jsxs('div', {
                  className:
                    'shrink-0 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-left lg:text-right',
                  children: [
                    H.jsx('p', {
                      className: 'text-[10px] uppercase tracking-widest font-black text-gray-400',
                      children: '倍率',
                    }),
                    H.jsx('p', {
                      className: 'mt-1 text-xl font-black text-gray-950 font-mono',
                      children: s.ratio,
                    }),
                  ],
                }),
              ],
            }),
            H.jsx('div', {
              className: 'my-5 h-px bg-gray-100',
            }),
            H.jsxs('div', {
              className: 'grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr]',
              children: [
                H.jsxs('div', {
                  children: [
                    H.jsx('p', {
                      className: 'text-[11px] font-black uppercase tracking-widest text-gray-400',
                      children: '适合场景',
                    }),
                    H.jsx('p', {
                      className: 'mt-2 text-sm leading-6 font-semibold text-gray-800',
                      children: s.fit,
                    }),
                  ],
                }),
                H.jsxs('div', {
                  children: [
                    H.jsx('p', {
                      className: 'text-[11px] font-black uppercase tracking-widest text-gray-400',
                      children: '使用提醒',
                    }),
                    H.jsx('p', {
                      className: 'mt-2 text-sm leading-6 font-semibold text-gray-800',
                      children: s.note,
                    }),
                  ],
                }),
              ],
            }),
            H.jsx('div', {
              className: 'mt-5 flex flex-wrap gap-2',
              children: s.examples.map((n) => l(n)),
            }),
          ],
        }),
      o = (s, a, t) =>
        H.jsxs('div', {
          className:
            'rounded-xl border border-gray-200 bg-white p-5 shadow-sm',
          children: [
            H.jsx('p', {
              className: 'text-[11px] font-black uppercase tracking-widest text-gray-400',
              children: s,
            }),
            H.jsx('p', {
              className: 'mt-2 text-sm leading-6 font-bold text-gray-800',
              children: a,
            }),
            t &&
              H.jsx('p', {
                className: 'mt-3 text-xs leading-5 font-medium text-gray-500',
                children: t,
              }),
          ],
        });
    return H.jsxs('div', {
      className: 'max-w-6xl mx-auto py-14 px-8',
      children: [
        H.jsxs('div', {
          className: 'mb-10',
          children: [
            H.jsx('h1', {
              className:
                'text-5xl font-black text-gray-950 mb-4 tracking-tight leading-none',
              children: '分组介绍',
            }),
            H.jsx('p', {
              className: 'text-base text-gray-600 font-medium max-w-3xl leading-7',
              children:
                '令牌分组决定一个 API 令牌可以调用哪些资源池，也会影响展示倍率和最终扣费。这里按用途介绍主要分组，不展开全部模型清单，具体模型以模型广场实时展示为准。',
            }),
          ],
        }),
        H.jsxs('section', {
          className:
            'rounded-2xl border border-gray-200 bg-gray-50/60 p-5 md:p-6 mb-8',
          children: [
            H.jsxs('div', {
              className: 'mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between',
              children: [
                H.jsxs('div', {
                  children: [
                    H.jsx('h2', {
                      className: 'text-xl font-black text-gray-950 tracking-tight',
                      children: '主要可选分组',
                    }),
                    H.jsx('p', {
                      className: 'mt-1 text-sm font-medium text-gray-500',
                      children: '按用途选择分组，再在模型广场确认具体模型与价格。',
                    }),
                  ],
                }),
                H.jsx('span', {
                  className:
                    'inline-flex w-fit rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-500',
                  children: 'GROUPS',
                }),
              ],
            }),
            H.jsx('div', {
              className: 'grid grid-cols-1 gap-4',
              children: e.map((s, a) => r(s, a)),
            }),
          ],
        }),
        H.jsxs('section', {
          className: 'grid grid-cols-1 md:grid-cols-3 gap-4',
          children: [
            o(
              '选择规则',
              '先按客户端选择分组，再按模型能力选择具体模型。Claude Code、Gemini CLI、图片生成等场景不要混用分组。',
            ),
            o(
              '计费提醒',
              '最终扣费会同时受模型价格、分组倍率、补全倍率、缓存倍率以及媒体分辨率规则影响。',
            ),
            o(
              '查看模型',
              '完整模型、价格、折扣和端点支持范围，请在模型广场按分组筛选查看实时数据。',
            ),
          ],
        }),
      ],
    });
  },
  cR = {
    'claude-code': `
# Claude Code 配置

## 入门
在进行配置之前，请完成以下两个先决条件。

### 步骤 1：安装 Claude Code
选择适合您操作系统的安装方式：

#### macOS / Linux / WSL：
\`\`\`bash
curl -fsSL https://claude.ai/install.sh | bash
\`\`\`

#### Windows PowerShell：
\`\`\`powershell
irm https://claude.ai/install.ps1 | iex
\`\`\`

#### npm（需要 Node.js 18+）：
\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

### 步骤二：获取 FlowBay API
1. 登录 FlowBay API 聊天平台
2. 导航至 API 密钥管理页面
3. 点击创建新的 API 密钥
**注意：** 请妥善保管您的 API 密钥——您将在下面的配置步骤中用到它。

---

## 配置 FlowBay API
两个先决条件都满足后，请选择以下任一选项来配置 FlowBay API。

### 选项 1：settings.json（推荐）
这种方法通过 Claude Code 自身的设置文件进行配置，而无需修改系统环境变量。

1. 在 Claude Code 安装目录中找到 \`settings.json\` 文件。如果该文件不存在，请创建一个新文件。
2. 添加以下内容：
\`\`\`json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "Your-Pan-API-Key",
    "ANTHROPIC_BASE_URL": "https://www.aiflowbay.com",
    "ANTHROPIC_MODEL": "claude-sonnet-4-6",
    "API_TIMEOUT_MS": "3000000"
  }
}
\`\`\`
**提示：** 您可以将该值替换为“可用型号” \`ANTHROPIC_MODEL\` 列表中的任何型号。

3. 保存文件并重启终端。
4. 验证配置：
\`\`\`bash
claude --version
claude
\`\`\`

### 选项二：环境变量
当您需要配置全局生效时，这种方法是合适的。

#### Bash（Linux / macOS）
编辑 \`~/.bashrc\`（或 \`~/.bash_profile\`）：
\`\`\`bash
# Claude Code - FlowBay API Provider Configuration
export ANTHROPIC_BASE_URL="https://www.aiflowbay.com"
export ANTHROPIC_AUTH_TOKEN="your-api-key-here"
export ANTHROPIC_MODEL="claude-sonnet-4-6"
# End of FlowBay API Provider Configuration
\`\`\`
应用更改：
\`\`\`bash
source ~/.bashrc
\`\`\`

#### Zsh（Linux / macOS）
编辑 \`~/.zshrc\`：
\`\`\`bash
# Claude Code - FlowBay API Provider Configuration
export ANTHROPIC_BASE_URL="https://www.aiflowbay.com"
export ANTHROPIC_AUTH_TOKEN="your-api-key-here"
export ANTHROPIC_MODEL="claude-sonnet-4-6"
# End of FlowBay API Provider Configuration
\`\`\`
应用更改：
\`\`\`bash
source ~/.zshrc
\`\`\`

#### PowerShell（Windows）
编辑您的 \`$PROFILE\` 文件：
\`\`\`powershell
# Claude Code - FlowBay API Provider Configuration
$env:ANTHROPIC_BASE_URL = "https://www.aiflowbay.com"
$env:ANTHROPIC_AUTH_TOKEN = "your-api-key-here"
$env:ANTHROPIC_MODEL = "claude-sonnet-4-6"
# End of FlowBay API Provider Configuration
\`\`\`
应用更改：
\`\`\`powershell
. $PROFILE
\`\`\`

| 操作系统 | Shell | 配置文件 |
| :--- | :--- | :--- |
| Linux | Bash | \`~/.bashrc\` |
| Linux | Zsh | \`~/.zshrc\` |
| macOS | Bash | \`~/.bashrc\` 或 \`~/.bash_profile\` |
| macOS | Zsh | \`~/.zshrc\` |
| Windows | PowerShell | \`$PROFILE\` |

---

## 切换模型
### 临时切换（仅限当前会话）
**Linux / macOS：**
\`\`\`bash
ANTHROPIC_MODEL=claude-opus-4-6 claude
\`\`\`

**Windows PowerShell：**
\`\`\`powershell
$env:ANTHROPIC_MODEL="claude-opus-4-6"; claude
\`\`\`

---

## 可选模型列表
| 型号名称 | 提供者 |
| :--- | :--- |
| \`claude-opus-4-7\` | Anthropic |
| \`claude-opus-4-6\` | Anthropic |
| \`claude-opus-4-5\` | Anthropic |
| \`claude-sonnet-4-6\` | Anthropic |
| \`claude-sonnet-4-5\` | Anthropic |
| \`claude-haiku-4-5\` | Anthropic |
| \`gpt-5.2\` | OpenAI |
| \`gpt-5-mini\` | OpenAI |
| \`gpt-5-nano\` | OpenAI |
| \`gemini-3.1-pro\` | Google |
| \`gemini-3-flash\` | Google |
| \`kimi-k2.5\` | Moonshot |
| \`glm-5\` | Zhipu AI |
| \`minimax-m2.5\` | MiniMax |
`,
    codex: `
# Codex 配置

## 配置 Config.toml
将以下内容保存到 \`config.toml\`：

\`\`\`toml
model_provider = "my_codex"
model = "gpt-5-mini"
model_reasoning_effort = "high"
disable_response_storage = true

[model_providers.my_codex]
name = "my_codex"
base_url = "https://www.aiflowbay.com/v1"
wire_api = "responses"
requires_openai_auth = true
\`\`\`

## 配置 ApiKey
将以下配置文本复制到你的 \`auth.json\` 文件中：

\`\`\`json
{
  "OPENAI_API_KEY": "xxx"
}
\`\`\`
`,
    gemini: `
# Gemini 配置

若目录中没有 \`.env\` 文件，创建并写入以下内容。
\`.env\`：Gemini CLI的配置文件，主要设置自定义端点、ApiKey跟所用模型。

\`\`\`env
GOOGLE_GEMINI_BASE_URL=https://www.aiflowbay.com
GEMINI_API_KEY=xxx
GEMINI_MODEL=gemini-2.5-pro
\`\`\`
`,
    openclaw: `
# Open Claw 配置

## 入门
在进行配置之前，请完成以下两个先决条件。

### 步骤 1：安装 Claude
选择适合您操作系统的安装方式：

#### macOS / Linux / WSL：
\`\`\`bash
curl -fsSL https://claude.ai/install.sh | bash
\`\`\`

#### Windows PowerShell：
\`\`\`powershell
irm https://claude.ai/install.ps1 | iex
\`\`\`

#### npm（需要 Node.js 18+）：
\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

### 步骤二：获取 FlowBay API
1. 登录 FlowBay API 聊天平台
2. 导航至 API 密钥管理页面
3. 点击创建新的 API 密钥
**注意：** 请妥善保管您的 API 密钥。

---

## 选项 1：settings.json (推荐)
\`\`\`json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "Your-Pan-API-Key",
    "ANTHROPIC_BASE_URL": "https://www.aiflowbay.com",
    "ANTHROPIC_MODEL": "claude-sonnet-4-6",
    "API_TIMEOUT_MS": "3000000"
  }
}
\`\`\`

---

## 选项 2：环境变量
编辑配置文件并应用更改。

| 操作系统 | Shell | 配置文件 |
| :--- | :--- | :--- |
| Linux | Bash | \`~/.bashrc\` |
| macOS | Zsh | \`~/.zshrc\` |
| Windows | PowerShell | \`$PROFILE\` |

\`\`\`bash
export ANTHROPIC_BASE_URL="https://www.aiflowbay.com"
export ANTHROPIC_AUTH_TOKEN="your-api-key-here"
export ANTHROPIC_MODEL="claude-sonnet-4-6"
\`\`\`
`,
    'model-square': `
# 模型广场

模型广场汇聚了来自各大家主流厂商的最先进语言模型，为您提供一站式的模型调用与管理服务。

![模型广场](/docs/bay-api/images/model-square.png)

目前我们支持的模型家族包括：
- **Claude 系列**: 提供卓越的逻辑推理与长文本处理能力。
- **GPT 系列**: 业界公认的多才多艺，适用于各种通用场景。
- **Gemini 系列**: 充分利用 Google 强大的生态系统。
- **国产精品**: 包括 Kimi, GLM (智谱), MiniMax 等，更懂中文语境，性能突飞猛进。

通过 Aiflowbay LLM 服务，您可以轻松在不同模型间切换，灵活应对多变的业务需求。
`,
    register: `
# 注册账号

## 给阅读者的忠告

01. 使用前建议先查看 **模型分组介绍** 与 **常见问题**，先理解分组、端点和令牌的关系。
02. 配置不是单纯复制，理解每个字段的含义，后续排查会更快。
03. 如果遇到模型不可用、接口不通、登录异常，优先回查这些基础说明。

## 注册入口

- 注册入口：<https://www.aiflowbay.com/register>

![注册账号](/docs/bay-api/images/register-account.png)

打开注册入口后，点击页面右上角的“注册”。如果已经在登录页，也可以点击底部“没有账户？注册”进入注册流程。

## 方式一：使用 Google 账号注册

1. 点击“使用 Google 继续”。
2. 在弹窗中选择要绑定的 Google 账号并完成授权。
3. 授权成功后，系统会自动创建账号并登录。

使用 Google 注册无需额外设置密码，后续登录时继续选择同一个 Google 账号即可。

## 方式二：使用邮箱注册

1. 点击“使用用户名注册”。
2. 填写邮箱、用户名和密码。
3. 按页面提示提交，完成注册。

> 注意：邮箱会用于接收验证与通知；密码建议使用字母、数字和特殊字符组合。请妥善保管登录凭证，避免账号被盗用。
`,
    login: `
# 登录账号

## 登录入口

- 登录入口：<https://www.aiflowbay.com/login>

![登录账号](/docs/bay-api/images/login-account.png)

## 使用 Google 账号登录

1. 点击“使用 Google 继续”。
2. 选择注册时绑定的 Google 账号。
3. 授权成功后即可自动登录。

## 使用邮箱或用户名登录

1. 输入邮箱地址或用户名。
2. 输入账号密码。
3. 点击“继续”完成登录。

> 设备登录说明：浏览器会保持登录状态；在新设备、新浏览器或清理浏览器数据后，需要重新登录。

## OIDC 获取 Token 失败

如果点击“使用 Google 继续”后出现“错误：OIDC 获取 Token 失败，请检查设置！”，通常是浏览器缓存或 Cookie 状态异常导致。

可以先清空浏览器缓存后重试：

- Windows / Linux Chrome：按 \`Ctrl + Shift + Delete\` 打开清除浏览数据页面。
- macOS Chrome：按 \`Command + Shift + Delete\` 打开清除浏览数据页面。

如果清理缓存后仍然无效，请手动删除站点相关 Cookie：

1. 在登录页按 \`F12\` 打开开发者工具。
2. 进入“应用”面板。
3. 在左侧依次选择“存储” -> “Cookie” -> 当前站点。
4. 删除 \`session\`、\`TDC_itoken\` 等站点 Cookie。
5. 刷新页面后重新登录。
`,
    'buy-credits': `
# 购买额度

登录控制台后，进入左侧“钱包管理”页面购买额度。额度到账后，令牌调用模型会从账户余额中扣费。

![钱包管理](/docs/bay-api/images/wallet-topup.png)

## 购买流程

1. 在“选择充值额度”中选择固定额度，或在“自定义额度”中输入要充值的金额。
2. 确认页面下方的“实付金额”。
3. 点击“立即支付”。

## 支付说明

充值比例以平台当前控制台展示为准。来源文档说明为 \`1:1\`，即 **1 元人民币等同于 1 美元额度**。如果使用支付宝或微信支付时没有弹出支付页面，请先关闭代理后重试。

## 临时公告：开票服务调整

为配合近期结算与服务流程调整，开票服务会按支付主体与订单时间做阶段性调整：

- 个人支付订单当前仅支持开具海外 Invoice。
- 5 月已完成支付的订单，所有用户仍可在 6 月申请补开大陆发票；其中海外 Invoice 订单需完成补税后申请，申请截止至 6 月 15 日。
- 自 6 月起，新购个人支付订单不再支持开具大陆发票；后续大陆发票仅支持企业对公支付订单。
`,
    'create-api-key': `
# 创建 API 令牌

API 令牌是 CLI、SDK 或第三方客户端调用接口时使用的凭证。创建时务必选择正确分组。

## 进入令牌管理

登录后进入控制台面板，左侧选择“令牌管理”。

![创建 API 令牌](/docs/bay-api/images/create-api-token.png)

1. 在左侧菜单点击“令牌管理”。
2. 点击页面上方的“添加令牌”。

## 创建新令牌

在弹窗中填写令牌信息：

- 令牌名称：用于区分不同用途，例如 \`Claude Code\`、\`Codex\`、\`Gemini\`。
- 令牌分组：必须选择，分组决定这个令牌可以使用哪些模型。
- 过期时间：默认“永不过期”，也可以按需要设置有效期。
- 新建数量：一般保持 \`1\` 即可。
- 额度设置：开启“无限额度”时，令牌实际可用额度仍受账户余额限制。
- 访问限制：不熟悉时建议先保持默认，不要开启模型限制或 IP 白名单。

> 令牌分组一定要选对：令牌分组会直接影响可用模型。比如 Claude Code、Codex、Gemini CLI 需要选择对应分组；如果分组选错，后续配置 CLI 时很容易出现“模型不存在”或无法调用的问题。

填写完成后，点击右下角“提交”完成创建。

## 查看分组可用模型

你可以在“模型广场”查看每个令牌分组下支持哪些模型。

![模型广场](/docs/bay-api/images/model-square.png)

1. 点击页面右上角“模型广场”。
2. 在左侧“可用令牌分组”中选择分组。
3. 右侧模型卡片会显示该分组可用的模型、价格和折扣倍率。

如果想了解折扣含义，可以点击模型广场右上方的“折扣说明”。
`,
    'env-check': `
# 环境检查

在配置 Claude Code、Codex 或 Gemini CLI 之前，请先确认本机已经正确安装 Node.js。

## 检查命令

在 Windows、macOS 或 Linux 终端中执行：

\`\`\`bash
npm list -g --depth-0
\`\`\`

如果命令可以正常执行，说明 Node.js 与 npm 已经可用。即使输出中没有安装任何全局包，也不影响后续配置。

如果提示“命令未找到”或类似错误，说明当前环境还没有安装 Node.js，或安装后没有正确加入系统环境变量。请先完成 Node.js 安装，再重新执行上面的命令确认。

> 必须先完成环境检查：CLI 工具依赖 Node.js 和 npm。环境没有准备好时，后续安装 Claude Code、Codex、Gemini CLI 都可能失败。
`,
    'cli-config': `
# 配置 CLI 工具

Bay API 支持在命令行中使用 Claude Code、Codex、Gemini CLI。配置前先完成环境检查、安装对应 CLI，并准备好正确分组的 API 令牌。

## 基础条件

开始配置 CLI 前，请先完成以下步骤：

1. 完成环境检查，确保 Node.js 和 npm 可以正常使用。
2. 完成 CLI 安装，安装 Claude Code、Codex、Gemini CLI。
3. 创建 API 令牌，并确认令牌分组与目标工具匹配。

## API 端点说明

登录控制台后，点击左侧“数据看板”，在页面右侧的“API 信息”卡片中查看当前可用的 API Endpoint。

![数据看板右侧 API Endpoint 显示区域](/docs/bay-api/images/dashboard-endpoint.png?v=2026061501)

- 主站 Endpoint：\`https://www.aiflowbay.com\`，稳定可靠，适合生产环境。
- 优化线路 Endpoint：如果控制台提供优化线路，可用于对延迟敏感的场景。

> OpenAI 兼容端点需要添加 \`/v1\`
>
> 如果使用的是 OpenAI 兼容格式的客户端或工具，例如 Codex、OpenAI SDK、Cherry Studio 的 OpenAI 兼容配置，请在 API 地址后添加 \`/v1\`：

\`\`\`bash
https://www.aiflowbay.com/v1
\`\`\`

如果使用的是 Claude Code、Gemini CLI 等专用配置，请以对应教程中的示例为准。

## 推荐配置

为了让配置过程更轻便，建议使用 CC-Switch 统一配置 Claude Code、Codex、Gemini。熟悉 CLI 的用户也可以参考手动配置教程；无论选择哪种方式，都要先完成基础条件。

## CLI 手动配置教程传送门

不管使用哪个 CLI，请一定先完成上方基础条件，确保 Node.js、npm 和对应 CLI 都可以正常使用。

- Claude Code 配置教程
- Codex 配置教程
- Gemini 配置教程
`,
  };
function fR() {
  const [e, i] = xr.useState('register'),
    [l, r] = xr.useState(null),
    o = (u) => {
      navigator.clipboard.writeText(u), r(u), setTimeout(() => r(null), 2e3);
    },
    c = () => {
      var h, m, p, g;
      const u = cR[e];
      return e === 'group-intro'
        ? H.jsx(uR, {})
        : typeof u == 'object' && 'title' in u
          ? H.jsx('div', {
              className: 'max-w-5xl mx-auto py-16 px-8',
              children: H.jsxs(
                vr.div,
                {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  className: 'grid grid-cols-1 lg:grid-cols-3 gap-12',
                  children: [
                    H.jsxs('div', {
                      className: 'lg:col-span-2 space-y-8',
                      children: [
                        H.jsxs('div', {
                          className: 'space-y-4',
                          children: [
                            H.jsx('div', {
                              className: 'flex items-center gap-2',
                              children: H.jsx('span', {
                                className:
                                  'px-2 py-0.5 bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider rounded',
                                children: 'STEP GUIDE',
                              }),
                            }),
                            H.jsx('h1', {
                              className:
                                'text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none',
                              children: u.title,
                            }),
                            H.jsx('p', {
                              className:
                                'text-xl text-gray-600 leading-relaxed font-medium',
                              children: u.content,
                            }),
                          ],
                        }),
                        H.jsxs('div', {
                          className: 'grid grid-cols-1 md:grid-cols-2 gap-4',
                          children: [
                            H.jsxs('div', {
                              className:
                                'p-6 bg-white border-l-4 border-black shadow-sm group hover:shadow-md transition-shadow',
                              children: [
                                H.jsx('span', {
                                  className:
                                    'text-[10px] font-black text-gray-400 uppercase tracking-widest',
                                  children: 'Requirement',
                                }),
                                H.jsx('p', {
                                  className:
                                    'font-bold text-gray-900 mt-1 italic',
                                  children:
                                    ((h = u.requirement) == null
                                      ? void 0
                                      : h.title) || '环境检查与网络连接',
                                }),
                                H.jsx('p', {
                                  className: 'text-xs text-gray-500 mt-2',
                                  children:
                                    ((m = u.requirement) == null
                                      ? void 0
                                      : m.desc) ||
                                    '确保您的终端环境已连接至互联网',
                                }),
                              ],
                            }),
                            H.jsxs('div', {
                              className:
                                'p-6 bg-white border-l-4 border-orange-500 shadow-sm group hover:shadow-md transition-shadow',
                              children: [
                                H.jsx('span', {
                                  className:
                                    'text-[10px] font-black text-gray-400 uppercase tracking-widest',
                                  children: 'Action',
                                }),
                                H.jsx('p', {
                                  className:
                                    'font-bold text-gray-900 mt-1 italic',
                                  children:
                                    ((p = u.action) == null
                                      ? void 0
                                      : p.title) || '执行操作',
                                }),
                                H.jsx('p', {
                                  className: 'text-xs text-gray-500 mt-2',
                                  children:
                                    ((g = u.action) == null
                                      ? void 0
                                      : g.desc) ||
                                    '点击“创建新的 API 密钥”以获取凭据',
                                }),
                              ],
                            }),
                          ],
                        }),
                        H.jsx('div', {
                          className:
                            'relative group rounded-2xl overflow-hidden border-4 border-white shadow-2xl shadow-black/10',
                          children: H.jsx('img', {
                            src: u.image,
                            alt: u.title,
                            className:
                              'w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105',
                            referrerPolicy: 'no-referrer',
                          }),
                        }),
                      ],
                    }),
                    H.jsxs('div', {
                      className: 'space-y-6',
                      children: [
                        H.jsxs('div', {
                          className:
                            'bg-orange-50 p-8 rounded-2xl border border-orange-100 flex flex-col justify-center items-center text-center',
                          children: [
                            H.jsx('div', {
                              className:
                                'w-16 h-16 bg-orange-500 rounded-full mb-6 flex items-center justify-center shadow-lg shadow-orange-500/30',
                              children: H.jsx(BM, {
                                size: 32,
                                className: 'text-white',
                              }),
                            }),
                            H.jsx('h3', {
                              className:
                                'text-lg font-black text-orange-900 uppercase tracking-tight',
                              children: '极速链接',
                            }),
                            H.jsx('p', {
                              className:
                                'text-sm text-orange-700/80 mt-2 font-medium',
                              children: '所有新一代 LLM 模型已完成逻辑映射',
                            }),
                            H.jsx('a', {
                              href: '/console',
                              className:
                                'mt-8 w-full py-3 bg-orange-600 text-white text-xs font-black uppercase tracking-widest rounded-lg hover:bg-orange-700 transition-colors block',
                              children: '前往控制台',
                            }),
                          ],
                        }),
                        H.jsxs('div', {
                          className:
                            'bg-gray-900 p-6 rounded-2xl text-white space-y-4',
                          children: [
                            H.jsx('h4', {
                              className:
                                'text-[10px] font-black uppercase tracking-widest text-gray-500',
                              children: 'Quick Config',
                            }),
                            H.jsx('div', {
                              className:
                                'font-mono text-xs text-orange-400 bg-black/40 p-4 rounded-lg border border-white/5',
                              children: '$ export BAY_API_KEY="..."',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                },
                e,
              ),
            })
          : typeof u == 'string'
            ? H.jsx('div', {
                className: 'max-w-5xl mx-auto py-16 px-8',
                children: H.jsx(eO, {
                  mode: 'wait',
                  children: H.jsx(
                    vr.div,
                    {
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -10 },
                      className: `markdown-body prose prose-zinc max-w-none 
                prose-headings:tracking-tighter prose-headings:font-black prose-headings:uppercase
                prose-h1:text-6xl prose-h1:mb-12
                prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b-4 prose-h2:border-black prose-h2:pb-2 prose-h2:inline-block
                prose-p:text-gray-600 prose-p:text-lg prose-p:leading-relaxed
                prose-pre:bg-zinc-100 prose-pre:border prose-pre:border-zinc-200 prose-pre:rounded-xl prose-pre:shadow-sm
                prose-code:text-orange-500 prose-code:bg-orange-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-code:font-bold prose-code:italic
                prose-table:border-collapse prose-th:bg-gray-900 prose-th:text-white prose-th:font-black prose-th:uppercase prose-th:text-[10px] prose-th:tracking-widest prose-th:p-4
                prose-td:p-4 prose-td:text-sm prose-td:font-medium prose-td:border-b prose-td:border-gray-200`,
                      children: H.jsx(ik, {
                        remarkPlugins: [gM],
                        components: {
                          code({
                            node: y,
                            inline: x,
                            className: b,
                            children: T,
                            ...M
                          }) {
                            const D = /language-(\w+)/.exec(b || ''),
                              E = String(T).replace(/\n$/, '');
                            return !x && D
                              ? H.jsxs('div', {
                                  className: 'relative group my-8',
                                  children: [
                                    H.jsxs('div', {
                                      className:
                                        'absolute left-6 -top-3 px-3 py-1 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest rounded z-10 shadow-lg shadow-black/20',
                                      children: [D[1], ' CONFIG'],
                                    }),
                                    H.jsx('div', {
                                      className:
                                        'absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0',
                                      children: H.jsx('button', {
                                        onClick: () => o(E),
                                        className:
                                          'p-2 bg-white hover:bg-zinc-50 text-zinc-400 hover:text-zinc-900 rounded-lg border border-zinc-200 transition-colors shadow-sm',
                                        children:
                                          l === E
                                            ? H.jsx(CM, { size: 14 })
                                            : H.jsx(OM, { size: 14 }),
                                      }),
                                    }),
                                    H.jsx('pre', {
                                      className: `${b} !mt-0 !pt-10 !px-6`,
                                      ...M,
                                      children: H.jsx('code', {
                                        className: '!text-zinc-800',
                                        children: String(T).trim(),
                                      }),
                                    }),
                                  ],
                                })
                              : H.jsx('code', {
                                  className: b,
                                  ...M,
                                  children: T,
                                });
                          },
                        },
                        children: u,
                      }),
                    },
                    e,
                  ),
                }),
              })
            : null;
    };
  return H.jsxs('div', {
    className:
      'min-h-screen bg-[#F8F9FA] flex selection:bg-orange-500 selection:text-white',
    children: [
      H.jsx(uD, { activePage: e, onPageChange: i }),
      H.jsxs('main', {
        className: 'flex-1 overflow-y-auto flex flex-col',
        children: [
          H.jsxs('header', {
            className:
              'h-16 border-b border-gray-200 bg-white sticky top-0 z-10 flex items-center justify-between px-8',
            children: [
              H.jsxs('div', {
                className: 'flex items-center space-x-2 text-sm font-medium',
                children: [
                  H.jsx('span', {
                    className: 'text-gray-400 capitalize',
                    children: e.split('-')[0],
                  }),
                  H.jsx('span', { className: 'text-gray-300', children: '/' }),
                  H.jsx('span', {
                    className:
                      'text-gray-900 capitalize tracking-tight font-bold',
                    children: e.replace(/-/g, ' '),
                  }),
                ],
              }),
              H.jsx('div', {
                className: 'flex items-center gap-4',
                children: H.jsx('a', {
                  href: '/console/token',
                  className:
                    'px-4 py-1.5 bg-black text-white text-xs font-black rounded uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg shadow-black/10',
                  children: '获取 API KEY',
                }),
              }),
            ],
          }),
          H.jsxs('div', {
            className: 'flex-1',
            children: [
              c(),
              H.jsx('footer', {
                className:
                  'max-w-4xl mx-auto py-16 px-8 border-t border-gray-200 mt-20',
                children: H.jsxs('div', {
                  className:
                    'flex flex-col md:flex-row items-center justify-between gap-6',
                  children: [
                    H.jsxs('div', {
                      className: 'space-y-1',
                      children: [
                        H.jsx('p', {
                          className:
                            'text-[10px] font-black uppercase tracking-[0.2em] text-gray-900',
                          children: 'Bay API Services',
                        }),
                        H.jsx('p', {
                          className: 'text-[10px] text-gray-400',
                          children:
                            '© 2026 OFFICIAL DOCUMENTATION. ALL RIGHTS RESERVED.',
                        }),
                      ],
                    }),
                    H.jsxs('div', {
                      className: 'flex gap-8',
                      children: [
                        H.jsx('a', {
                          href: '#',
                          className:
                            'text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors',
                          children: 'Privacy',
                        }),
                        H.jsx('a', {
                          href: '#',
                          className:
                            'text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors',
                          children: 'Terms',
                        }),
                        H.jsx('a', {
                          href: '#',
                          className:
                            'text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors',
                          children: 'Contact',
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
FT.createRoot(document.getElementById('root')).render(
  H.jsx(rt.StrictMode, { children: H.jsx(fR, {}) }),
);
