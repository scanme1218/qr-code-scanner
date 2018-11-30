!(function(e) {
  var t = {};
  function n(o) {
    if (t[o]) return t[o].exports;
    var a = (t[o] = { i: o, l: !1, exports: {} });
    return e[o].call(a.exports, a, a.exports, n), (a.l = !0), a.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
    }),
    (n.r = function(e) {
      'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if ((n.r(o), Object.defineProperty(o, 'default', { enumerable: !0, value: e }), 2 & t && 'string' != typeof e))
        for (var a in e)
          n.d(
            o,
            a,
            function(t) {
              return e[t];
            }.bind(null, a)
          );
      return o;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    n((n.s = 2));
})([
  function(e, t) {
    var n = {},
      o = document.querySelector('.app__snackbar'),
      a = null;
    (n.show = (e, t = 4e3) => {
      e &&
        (a && a.remove(),
        ((a = document.createElement('div')).className = 'app__snackbar-msg'),
        (a.textContent = e),
        o.appendChild(a),
        setTimeout(() => {
          a.remove();
        }, t));
    }),
      (t.snackbar = n);
  },
  function(e, t) {
    e.exports = function(e) {
      if ('string' != typeof e) return !1;
      var t = e.match(n);
      if (!t) return !1;
      var r = t[1];
      if (!r) return !1;
      if (o.test(r) || a.test(r)) return !0;
      return !1;
    };
    var n = /^(?:\w+:)?\/\/(\S+)$/,
      o = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/,
      a = /^[^\s\.]+\.\S{2,}$/;
  },
  function(e, t, n) {
    'use strict';
    n.r(t);
    var o = n(0),
      a = {};
    function r(e) {
      !e && window.isMediaStreamAPISupported ? (a.webcam = document.querySelector('video')) : (a.webcam = document.querySelector('img'));
    }
    (a.active = !1),
      (a.webcam = null),
      (a.canvas = null),
      (a.ctx = null),
      (a.decoder = null),
      (a.setCanvas = () => {
        (a.canvas = document.createElement('canvas')), (a.ctx = a.canvas.getContext('2d'));
      }),
      (a.init = () => {
        var e = !1;
        function t() {
          (a.canvas.width = window.innerWidth), (a.canvas.height = window.innerHeight);
        }
        function n(e) {
          navigator.mediaDevices
            .getUserMedia(e)
            .then(function(e) {
              (a.webcam.srcObject = e),
                a.webcam.setAttribute('playsinline', !0),
                a.webcam.setAttribute('controls', !0),
                setTimeout(() => {
                  document.querySelector('video').removeAttribute('controls');
                });
            })
            .catch(function(e) {
              console.log('Error occurred ', e), i();
            });
        }
        function i() {
          (window.noCameraPermission = !0),
            (document.querySelector('.custom-scanner').style.display = 'none'),
            o.snackbar.show('Unable to access the camera', 1e4);
        }
        r(),
          a.setCanvas(),
          (a.decoder = new Worker('decoder.js')),
          window.isMediaStreamAPISupported
            ? a.webcam.addEventListener(
                'play',
                function(n) {
                  e || (t(), (e = !0));
                },
                !1
              )
            : t(),
          window.isMediaStreamAPISupported &&
            navigator.mediaDevices
              .enumerateDevices()
              .then(function(e) {
                var t,
                  o = e.filter(function(e) {
                    e.label.split(',')[1];
                    if ('videoinput' == e.kind) return e;
                  });
                o.length > 1
                  ? ((t = { video: { mandatory: { sourceId: o[1].deviceId ? o[1].deviceId : null } }, audio: !1 }),
                    window.iOS && (t.video.facingMode = 'environment'),
                    n(t))
                  : o.length
                  ? ((t = { video: { mandatory: { sourceId: o[0].deviceId ? o[0].deviceId : null } }, audio: !1 }),
                    window.iOS && (t.video.facingMode = 'environment'),
                    n(t))
                  : n({ video: !0 });
              })
              .catch(function(e) {
                i(), console.error('Error occurred : ', e);
              });
      }),
      (a.scan = function(e, t) {
        function n() {
          if (a.active)
            try {
              a.ctx.drawImage(a.webcam, 0, 0, a.canvas.width, a.canvas.height);
              var e = a.ctx.getImageData(0, 0, a.canvas.width, a.canvas.height);
              e.data && a.decoder.postMessage(e);
            } catch (e) {
              'NS_ERROR_NOT_AVAILABLE' == e.name && setTimeout(n, 0);
            }
        }
        (a.active = !0),
          a.setCanvas(),
          (a.decoder.onmessage = function(t) {
            if (t.data.length > 0) {
              var o = t.data[0][2];
              (a.active = !1), e(o);
            }
            setTimeout(n, 0);
          }),
          setTimeout(() => {
            r(t);
          }),
          n();
      });
    var i = a,
      c = (n(3), n(1)),
      d = n.n(c);
    'serviceWorker' in navigator &&
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(e => {
            console.log('SW registered: ', e),
              localStorage.getItem('offline') ||
                (localStorage.setItem('offline', !0), o.snackbar.show('App is ready for offline usage.', 5e3));
          })
          .catch(e => {
            console.log('SW registration failed: ', e);
          });
      }),
      window.addEventListener('DOMContentLoaded', () => {
        (window.iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0),
          (window.isMediaStreamAPISupported = navigator && navigator.mediaDevices && 'enumerateDevices' in navigator.mediaDevices),
          (window.noCameraPermission = !1);
        var e = null,
          t = null,
          n = document.querySelector('.app__select-photos'),
          o = document.querySelector('.app__dialog'),
          a = document.querySelector('.app__dialog-overlay'),
          r = document.querySelector('.app__dialog-open'),
          c = document.querySelector('.app__dialog-close'),
          l = document.querySelector('.custom-scanner'),
          s = document.querySelector('#result');
        document.querySelector('.app__help-text'), document.querySelector('.app__header-icon svg'), document.querySelector('video');
        function u(t = !1) {
          window.isMediaStreamAPISupported && !window.noCameraPermission && (l.style.display = 'block'),
            t && (l.style.display = 'block'),
            i.scan(t => {
              (e = t),
                (s.value = t),
                s.select(),
                (l.style.display = 'none'),
                d()(t) && (r.style.display = 'inline-block'),
                o.classList.remove('app__dialog--hide'),
                a.classList.remove('app__dialog--hide');
              document.querySelector('#frame');
            }, t);
        }
        function p() {
          (e = null),
            (s.value = ''),
            window.isMediaStreamAPISupported || ((t.src = ''), (t.className = '')),
            o.classList.add('app__dialog--hide'),
            a.classList.add('app__dialog--hide'),
            u();
        }
        (window.appOverlay = document.querySelector('.app__overlay')),
          window.addEventListener('load', e => {
            i.init(),
              setTimeout(() => {
                (window.appOverlay.style.borderStyle = 'solid'), window.isMediaStreamAPISupported && u();
              }, 1e3),
              (function() {
                var e = document.createElement('input');
                e.setAttribute('type', 'file'),
                  e.setAttribute('capture', 'camera'),
                  (e.id = 'camera'),
                  (window.appOverlay.style.borderStyle = ''),
                  (n.style.display = 'block'),
                  ((t = document.createElement('img')).src = ''),
                  (t.id = 'frame');
                var o = document.querySelector('.app__layout-content');
                o.appendChild(e),
                  o.appendChild(t),
                  n.addEventListener('click', () => {
                    (l.style.display = 'none'), document.querySelector('#camera').click();
                  }),
                  e.addEventListener('change', e => {
                    e.target &&
                      e.target.files.length > 0 &&
                      ((t.className = 'app__overlay'),
                      (t.src = URL.createObjectURL(e.target.files[0])),
                      window.noCameraPermission || (l.style.display = 'block'),
                      (window.appOverlay.style.borderColor = 'rgb(62, 78, 184)'),
                      u(!0));
                  });
              })();
          }),
          c.addEventListener('click', p, !1),
          r.addEventListener(
            'click',
            function() {
              console.log('Result: ', e), window.open(e, '_blank', 'toolbar=0,location=0,menubar=0'), (e = null), p();
            },
            !1
          );
      });
  },
  function(e, t) {}
]);
