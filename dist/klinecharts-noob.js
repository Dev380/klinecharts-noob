var r5 = Object.defineProperty;
var a5 = (e, t, n) => t in e ? r5(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var k1 = (e, t, n) => (a5(e, typeof t != "symbol" ? t + "" : t, n), n);
import { utils as R, init as i5, FormatDateType as O1, DomPosition as O0, ActionType as s5, dispose as o5, TooltipIconPosition as E1, registerOverlay as l5 } from "klinecharts";
function M1(e, t, n) {
  const r = (e.x - t.x) * Math.cos(n) - (e.y - t.y) * Math.sin(n) + t.x, a = (e.x - t.x) * Math.sin(n) + (e.y - t.y) * Math.cos(n) + t.y;
  return { x: r, y: a };
}
function c0(e, t) {
  if (e.length > 1) {
    let n;
    return e[0].x === e[1].x && e[0].y !== e[1].y ? e[0].y < e[1].y ? n = {
      x: e[0].x,
      y: t.height
    } : n = {
      x: e[0].x,
      y: 0
    } : e[0].x > e[1].x ? n = {
      x: 0,
      y: R.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : n = {
      x: t.width,
      y: R.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], n] };
  }
  return [];
}
function v9(e, t) {
  const n = Math.abs(e.x - t.x), r = Math.abs(e.y - t.y);
  return Math.sqrt(n * n + r * r);
}
const c5 = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, n = R.getLinearSlopeIntercept(e[0], e[1]);
      let r;
      n ? r = Math.atan(n[0]) + Math.PI * t : e[1].y > e[0].y ? r = Math.PI / 2 : r = Math.PI / 2 * 3;
      const a = M1({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], r), s = M1({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], r);
      return [
        {
          type: "line",
          attrs: { coordinates: e }
        },
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: [a, e[1], s] }
        }
      ];
    }
    return [];
  }
}, u5 = {
  name: "circle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    circle: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = v9(e[0], e[1]);
      return {
        type: "circle",
        attrs: {
          ...e[0],
          r: t
        },
        styles: { style: "stroke_fill" }
      };
    }
    return [];
  }
}, C5 = {
  name: "rect",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    polygon: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e }) => e.length > 1 ? [
    {
      type: "polygon",
      attrs: {
        coordinates: [
          e[0],
          { x: e[1].x, y: e[0].y },
          e[1],
          { x: e[0].x, y: e[1].y }
        ]
      },
      styles: { style: "stroke_fill" }
    }
  ] : []
}, f5 = {
  name: "parallelogram",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    polygon: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e }) => {
    if (e.length === 2)
      return [
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: e }
        }
      ];
    if (e.length === 3) {
      const t = { x: e[0].x + (e[2].x - e[1].x), y: e[2].y };
      return [
        {
          type: "polygon",
          attrs: { coordinates: [e[0], e[1], e[2], t] },
          styles: { style: "stroke_fill" }
        }
      ];
    }
    return [];
  },
  performEventPressedMove: ({ points: e, performPointIndex: t, performPoint: n }) => {
    t < 2 && (e[0].price = n.price, e[1].price = n.price);
  },
  performEventMoveForDrawing: ({ currentStep: e, points: t, performPoint: n }) => {
    e === 2 && (t[0].price = n.price);
  }
}, y5 = {
  name: "triangle",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    polygon: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e }) => [
    {
      type: "polygon",
      attrs: { coordinates: e },
      styles: { style: "stroke_fill" }
    }
  ]
}, p5 = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), n = Math.abs(e[0].y - e[1].y), r = Math.sqrt(t * t + n * n), a = [0.236, 0.382, 0.5, 0.618, 0.786, 1], s = [], o = [];
      return a.forEach((i) => {
        const l = r * i;
        s.push(
          { ...e[0], r: l }
        ), o.push({
          x: e[0].x,
          y: e[0].y + l + 6,
          text: `${(i * 100).toFixed(1)}%`
        });
      }), [
        {
          type: "circle",
          attrs: s,
          styles: { style: "stroke" }
        },
        {
          type: "text",
          ignoreEvent: !0,
          attrs: o
        }
      ];
    }
    return [];
  }
}, g5 = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: n }) => {
    const r = [], a = [];
    if (e.length > 1) {
      const s = e[1].x > e[0].x ? e[0].x : e[1].x, o = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], i = e[0].y - e[1].y, l = t.points, C = l[0].value - l[1].value;
      o.forEach((f) => {
        const c = e[1].y + i * f, _ = (l[1].value + C * f).toFixed(n.price);
        r.push({ coordinates: [{ x: e[0].x, y: c }, { x: e[1].x, y: c }] }), a.push({
          x: s,
          y: c,
          text: `${_} (${(f * 100).toFixed(1)}%)`,
          baseline: "bottom"
        });
      });
    }
    return [
      {
        type: "line",
        attrs: r
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, m5 = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    if (e.length > 1) {
      const n = v9(e[0], e[1]) / Math.sqrt(24), r = e[1].x > e[0].x ? 0 : 1, a = R.getLinearSlopeIntercept(e[0], e[1]);
      let s;
      a ? s = Math.atan(a[0]) + Math.PI * r : e[1].y > e[0].y ? s = Math.PI / 2 : s = Math.PI / 2 * 3;
      const o = M1(
        { x: e[0].x - n, y: e[0].y },
        e[0],
        s
      ), i = M1(
        { x: e[0].x - n, y: e[0].y - n },
        e[0],
        s
      ), l = [{
        ...o,
        r: n,
        startAngle: s,
        endAngle: s + Math.PI / 2
      }, {
        ...i,
        r: n * 2,
        startAngle: s + Math.PI / 2,
        endAngle: s + Math.PI
      }];
      let C = e[0].x - n, f = e[0].y - n;
      for (let c = 2; c < 9; c++) {
        const _ = l[c - 2].r + l[c - 1].r;
        let L = 0;
        switch (c % 4) {
          case 0: {
            L = s, C -= l[c - 2].r;
            break;
          }
          case 1: {
            L = s + Math.PI / 2, f -= l[c - 2].r;
            break;
          }
          case 2: {
            L = s + Math.PI, C += l[c - 2].r;
            break;
          }
          case 3: {
            L = s + Math.PI / 2 * 3, f += l[c - 2].r;
            break;
          }
        }
        const A = L + Math.PI / 2, O = M1({ x: C, y: f }, e[0], s);
        l.push({
          ...O,
          r: _,
          startAngle: L,
          endAngle: A
        });
      }
      return [
        {
          type: "arc",
          attrs: l
        },
        {
          type: "line",
          attrs: c0(e, t)
        }
      ];
    }
    return [];
  }
}, h5 = {
  name: "fibonacciSpeedResistanceFan",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    const n = [];
    let r = [];
    const a = [];
    if (e.length > 1) {
      const s = e[1].x > e[0].x ? -38 : 4, o = e[1].y > e[0].y ? -2 : 20, i = e[1].x - e[0].x, l = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((f) => {
        const c = e[1].x - i * f, _ = e[1].y - l * f;
        n.push({ coordinates: [{ x: c, y: e[0].y }, { x: c, y: e[1].y }] }), n.push({ coordinates: [{ x: e[0].x, y: _ }, { x: e[1].x, y: _ }] }), r = r.concat(c0([e[0], { x: c, y: e[1].y }], t)), r = r.concat(c0([e[0], { x: e[1].x, y: _ }], t)), a.unshift({
          x: e[0].x + s,
          y: _ + 10,
          text: `${f.toFixed(3)}`
        }), a.unshift({
          x: c - 18,
          y: e[0].y + o,
          text: `${f.toFixed(3)}`
        });
      });
    }
    return [
      {
        type: "line",
        attrs: n
      },
      {
        type: "line",
        attrs: r
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, d5 = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: n }) => {
    const r = [], a = [];
    if (e.length > 2) {
      const s = t.points, o = s[1].value - s[0].value, i = e[1].y - e[0].y, l = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], C = e[2].x > e[1].x ? e[1].x : e[2].x;
      l.forEach((f) => {
        const c = e[2].y + i * f, _ = (s[2].value + o * f).toFixed(n.price);
        r.push({ coordinates: [{ x: e[1].x, y: c }, { x: e[2].x, y: c }] }), a.push({
          x: C,
          y: c,
          text: `${_} (${(f * 100).toFixed(1)}%)`,
          baseline: "bottom"
        });
      });
    }
    return [
      {
        type: "line",
        attrs: { coordinates: e },
        styles: { style: "dashed" }
      },
      {
        type: "line",
        attrs: r
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, v5 = {
  name: "gannBox",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    polygon: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = (e[1].y - e[0].y) / 4, n = e[1].x - e[0].x, r = [
        { coordinates: [e[0], { x: e[1].x, y: e[1].y - t }] },
        { coordinates: [e[0], { x: e[1].x, y: e[1].y - t * 2 }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + t }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + t * 2 }] },
        { coordinates: [{ ...e[0] }, { x: e[0].x + n * 0.236, y: e[1].y }] },
        { coordinates: [{ ...e[0] }, { x: e[0].x + n * 0.5, y: e[1].y }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + n * 0.236, y: e[0].y }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + n * 0.5, y: e[0].y }] }
      ], a = [
        { coordinates: [e[0], e[1]] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y }] }
      ];
      return [
        {
          type: "line",
          attrs: [
            { coordinates: [e[0], { x: e[1].x, y: e[0].y }] },
            { coordinates: [{ x: e[1].x, y: e[0].y }, e[1]] },
            { coordinates: [e[1], { x: e[0].x, y: e[1].y }] },
            { coordinates: [{ x: e[0].x, y: e[1].y }, e[0]] }
          ]
        },
        {
          type: "polygon",
          ignoreEvent: !0,
          attrs: {
            coordinates: [
              e[0],
              { x: e[1].x, y: e[0].y },
              e[1],
              { x: e[0].x, y: e[1].y }
            ]
          },
          styles: { style: "fill" }
        },
        {
          type: "line",
          attrs: r,
          styles: { style: "dashed" }
        },
        {
          type: "line",
          attrs: a
        }
      ];
    }
    return [];
  }
}, _5 = {
  name: "threeWaves",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
      text: `(${r})`,
      baseline: "bottom"
    }));
    return [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: t
      }
    ];
  }
}, L5 = {
  name: "fiveWaves",
  totalStep: 7,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
      text: `(${r})`,
      baseline: "bottom"
    }));
    return [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: t
      }
    ];
  }
}, $5 = {
  name: "eightWaves",
  totalStep: 10,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
      text: `(${r})`,
      baseline: "bottom"
    }));
    return [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: t
      }
    ];
  }
}, b5 = {
  name: "anyWaves",
  totalStep: Number.MAX_SAFE_INTEGER,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
      text: `(${r})`,
      baseline: "bottom"
    }));
    return [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: t
      }
    ];
  }
}, x5 = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], n = [];
    const r = ["A", "B", "C", "D"], a = e.map((s, o) => ({
      ...s,
      baseline: "bottom",
      text: `(${r[o]})`
    }));
    return e.length > 2 && (t = [e[0], e[2]], e.length > 3 && (n = [e[1], e[3]])), [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "line",
        attrs: [{ coordinates: t }, { coordinates: n }],
        styles: { style: "dashed" }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, k5 = {
  name: "xabcd",
  totalStep: 6,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    polygon: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e, overlay: t }) => {
    const n = [], r = [], a = ["X", "A", "B", "C", "D"], s = e.map((o, i) => ({
      ...o,
      baseline: "bottom",
      text: `(${a[i]})`
    }));
    return e.length > 2 && (n.push({ coordinates: [e[0], e[2]] }), r.push({ coordinates: [e[0], e[1], e[2]] }), e.length > 3 && (n.push({ coordinates: [e[1], e[3]] }), e.length > 4 && (n.push({ coordinates: [e[2], e[4]] }), r.push({ coordinates: [e[2], e[3], e[4]] })))), [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "line",
        attrs: n,
        styles: { style: "dashed" }
      },
      {
        type: "polygon",
        ignoreEvent: !0,
        attrs: r
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: s
      }
    ];
  }
}, w5 = [
  c5,
  u5,
  C5,
  y5,
  f5,
  p5,
  g5,
  m5,
  h5,
  d5,
  v5,
  _5,
  L5,
  $5,
  b5,
  x5,
  k5
];
class au {
  constructor(t) {
    k1(this, "_apiKey");
    k1(this, "_prevSymbolMarket");
    k1(this, "_ws");
    this._apiKey = t;
  }
  async getHistoryKLineData(t, n, r, a) {
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${t.ticker}/range/${n.multiplier}/${n.timespan}/${r}/${a}?apiKey=${this._apiKey}`)).json()).results || []).map((i) => ({
      timestamp: i.t,
      open: i.o,
      high: i.h,
      low: i.l,
      close: i.c,
      volume: i.v,
      turnover: i.vw
    }));
  }
  subscribe(t, n, r) {
    var a, s;
    this._prevSymbolMarket !== t.market ? ((a = this._ws) == null || a.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var o;
      (o = this._ws) == null || o.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (o) => {
      var l;
      const i = JSON.parse(o.data);
      i[0].ev === "status" ? i[0].status === "auth_success" && ((l = this._ws) == null || l.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in i && r({
        timestamp: i.s,
        open: i.o,
        high: i.h,
        low: i.l,
        close: i.c,
        volume: i.v,
        turnover: i.vw
      });
    }) : (s = this._ws) == null || s.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` })), this._prevSymbolMarket = t.market;
  }
  unsubscribe(t, n) {
  }
}
const M5 = !1, S5 = (e, t) => e === t, u0 = Symbol("solid-proxy"), A5 = typeof Proxy == "function", T5 = Symbol("solid-track"), Z1 = {
  equals: S5
};
let _9 = k9;
const e1 = 1, R1 = 2, L9 = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var D = null;
let i0 = null, I5 = null, I = null, N = null, G = null, G1 = 0;
function K1(e, t) {
  const n = I, r = D, a = e.length === 0, s = t === void 0 ? r : t, o = a ? L9 : {
    owned: null,
    cleanups: null,
    context: s ? s.context : null,
    owner: s
  }, i = a ? e : () => e(() => W(() => S1(o)));
  D = o, I = null;
  try {
    return C1(i, !0);
  } finally {
    I = n, D = r;
  }
}
function x(e, t) {
  t = t ? Object.assign({}, Z1, t) : Z1;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, r = (a) => (typeof a == "function" && (a = a(n.value)), x9(n, a));
  return [b9.bind(n), r];
}
function F(e, t, n) {
  const r = _0(e, t, !1, e1);
  A1(r);
}
function q(e, t, n) {
  _9 = E5;
  const r = _0(e, t, !1, e1);
  (!n || !n.render) && (r.user = !0), G ? G.push(r) : A1(r);
}
function J(e, t, n) {
  n = n ? Object.assign({}, Z1, n) : Z1;
  const r = _0(e, t, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, A1(r), b9.bind(r);
}
function W(e) {
  if (I === null)
    return e();
  const t = I;
  I = null;
  try {
    return e();
  } finally {
    I = t;
  }
}
function $9(e) {
  q(() => W(e));
}
function v0(e) {
  return D === null || (D.cleanups === null ? D.cleanups = [e] : D.cleanups.push(e)), e;
}
function P5(e) {
  const t = I, n = D;
  return Promise.resolve().then(() => {
    I = t, D = n;
    let r;
    return C1(e, !1), I = D = null, r ? r.done : void 0;
  });
}
function b9() {
  if (this.sources && this.state)
    if (this.state === e1)
      A1(this);
    else {
      const e = N;
      N = null, C1(() => U1(this), !1), N = e;
    }
  if (I) {
    const e = this.observers ? this.observers.length : 0;
    I.sources ? (I.sources.push(this), I.sourceSlots.push(e)) : (I.sources = [this], I.sourceSlots = [e]), this.observers ? (this.observers.push(I), this.observerSlots.push(I.sources.length - 1)) : (this.observers = [I], this.observerSlots = [I.sources.length - 1]);
  }
  return this.value;
}
function x9(e, t, n) {
  let r = e.value;
  return (!e.comparator || !e.comparator(r, t)) && (e.value = t, e.observers && e.observers.length && C1(() => {
    for (let a = 0; a < e.observers.length; a += 1) {
      const s = e.observers[a], o = i0 && i0.running;
      o && i0.disposed.has(s), (o ? !s.tState : !s.state) && (s.pure ? N.push(s) : G.push(s), s.observers && w9(s)), o || (s.state = e1);
    }
    if (N.length > 1e6)
      throw N = [], new Error();
  }, !1)), t;
}
function A1(e) {
  if (!e.fn)
    return;
  S1(e);
  const t = G1;
  D5(e, e.value, t);
}
function D5(e, t, n) {
  let r;
  const a = D, s = I;
  I = D = e;
  try {
    r = e.fn(t);
  } catch (o) {
    return e.pure && (e.state = e1, e.owned && e.owned.forEach(S1), e.owned = null), e.updatedAt = n + 1, M9(o);
  } finally {
    I = s, D = a;
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? x9(e, r) : e.value = r, e.updatedAt = n);
}
function _0(e, t, n, r = e1, a) {
  const s = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: D,
    context: D ? D.context : null,
    pure: n
  };
  return D === null || D !== L9 && (D.owned ? D.owned.push(s) : D.owned = [s]), s;
}
function Q1(e) {
  if (e.state === 0)
    return;
  if (e.state === R1)
    return U1(e);
  if (e.suspense && W(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < G1); )
    e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if (e = t[n], e.state === e1)
      A1(e);
    else if (e.state === R1) {
      const r = N;
      N = null, C1(() => U1(e, t[0]), !1), N = r;
    }
}
function C1(e, t) {
  if (N)
    return e();
  let n = !1;
  t || (N = []), G ? n = !0 : G = [], G1++;
  try {
    const r = e();
    return O5(n), r;
  } catch (r) {
    n || (G = null), N = null, M9(r);
  }
}
function O5(e) {
  if (N && (k9(N), N = null), e)
    return;
  const t = G;
  G = null, t.length && C1(() => _9(t), !1);
}
function k9(e) {
  for (let t = 0; t < e.length; t++)
    Q1(e[t]);
}
function E5(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? e[n++] = r : Q1(r);
  }
  for (t = 0; t < n; t++)
    Q1(e[t]);
}
function U1(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const r = e.sources[n];
    if (r.sources) {
      const a = r.state;
      a === e1 ? r !== t && (!r.updatedAt || r.updatedAt < G1) && Q1(r) : a === R1 && U1(r, t);
    }
  }
}
function w9(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state || (n.state = R1, n.pure ? N.push(n) : G.push(n), n.observers && w9(n));
  }
}
function S1(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(), r = e.sourceSlots.pop(), a = n.observers;
      if (a && a.length) {
        const s = a.pop(), o = n.observerSlots.pop();
        r < a.length && (s.sourceSlots[o] = r, a[r] = s, n.observerSlots[r] = o);
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--)
      S1(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--)
      S1(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function F5(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
    cause: e
  });
}
function M9(e, t = D) {
  throw F5(e);
}
const B5 = Symbol("fallback");
function E0(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function N5(e, t, n = {}) {
  let r = [], a = [], s = [], o = 0, i = t.length > 1 ? [] : null;
  return v0(() => E0(s)), () => {
    let l = e() || [], C = l.length, f, c;
    return l[T5], W(() => {
      let L, A, O, E, T, b, $, M, Y;
      if (C === 0)
        o !== 0 && (E0(s), s = [], r = [], a = [], o = 0, i && (i = [])), n.fallback && (r = [B5], a[0] = K1((s1) => (s[0] = s1, n.fallback())), o = 1);
      else if (o === 0) {
        for (a = new Array(C), c = 0; c < C; c++)
          r[c] = l[c], a[c] = K1(_);
        o = C;
      } else {
        for (O = new Array(C), E = new Array(C), i && (T = new Array(C)), b = 0, $ = Math.min(o, C); b < $ && r[b] === l[b]; b++)
          ;
        for ($ = o - 1, M = C - 1; $ >= b && M >= b && r[$] === l[M]; $--, M--)
          O[M] = a[$], E[M] = s[$], i && (T[M] = i[$]);
        for (L = /* @__PURE__ */ new Map(), A = new Array(M + 1), c = M; c >= b; c--)
          Y = l[c], f = L.get(Y), A[c] = f === void 0 ? -1 : f, L.set(Y, c);
        for (f = b; f <= $; f++)
          Y = r[f], c = L.get(Y), c !== void 0 && c !== -1 ? (O[c] = a[f], E[c] = s[f], i && (T[c] = i[f]), c = A[c], L.set(Y, c)) : s[f]();
        for (c = b; c < C; c++)
          c in O ? (a[c] = O[c], s[c] = E[c], i && (i[c] = T[c], i[c](c))) : a[c] = K1(_);
        a = a.slice(0, o = C), r = l.slice(0);
      }
      return a;
    });
    function _(L) {
      if (s[c] = L, i) {
        const [A, O] = x(c);
        return i[c] = O, t(l[c], A);
      }
      return t(l[c]);
    }
  };
}
function v(e, t) {
  return W(() => e(t || {}));
}
function F1() {
  return !0;
}
const K5 = {
  get(e, t, n) {
    return t === u0 ? n : e.get(t);
  },
  has(e, t) {
    return t === u0 ? !0 : e.has(t);
  },
  set: F1,
  deleteProperty: F1,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: F1,
      deleteProperty: F1
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function s0(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function j5() {
  for (let e = 0, t = this.length; e < t; ++e) {
    const n = this[e]();
    if (n !== void 0)
      return n;
  }
}
function S9(...e) {
  let t = !1;
  for (let o = 0; o < e.length; o++) {
    const i = e[o];
    t = t || !!i && u0 in i, e[o] = typeof i == "function" ? (t = !0, J(i)) : i;
  }
  if (A5 && t)
    return new Proxy({
      get(o) {
        for (let i = e.length - 1; i >= 0; i--) {
          const l = s0(e[i])[o];
          if (l !== void 0)
            return l;
        }
      },
      has(o) {
        for (let i = e.length - 1; i >= 0; i--)
          if (o in s0(e[i]))
            return !0;
        return !1;
      },
      keys() {
        const o = [];
        for (let i = 0; i < e.length; i++)
          o.push(...Object.keys(s0(e[i])));
        return [...new Set(o)];
      }
    }, K5);
  const n = {}, r = /* @__PURE__ */ Object.create(null);
  for (let o = e.length - 1; o >= 0; o--) {
    const i = e[o];
    if (!i)
      continue;
    const l = Object.getOwnPropertyNames(i);
    for (let C = l.length - 1; C >= 0; C--) {
      const f = l[C];
      if (f === "__proto__" || f === "constructor")
        continue;
      const c = Object.getOwnPropertyDescriptor(i, f);
      if (!r[f])
        r[f] = c.get ? {
          enumerable: !0,
          configurable: !0,
          get: j5.bind(n[f] = [c.get.bind(i)])
        } : c.value !== void 0 ? c : void 0;
      else {
        const _ = n[f];
        _ && (c.get ? _.push(c.get.bind(i)) : c.value !== void 0 && _.push(() => c.value));
      }
    }
  }
  const a = {}, s = Object.keys(r);
  for (let o = s.length - 1; o >= 0; o--) {
    const i = s[o], l = r[i];
    l && l.get ? Object.defineProperty(a, i, l) : a[i] = l ? l.value : void 0;
  }
  return a;
}
const Z5 = (e) => `Stale read from <${e}>.`;
function R5(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return J(N5(() => e.each, e.children, t || void 0));
}
function Z(e) {
  const t = e.keyed, n = J(() => e.when, void 0, void 0), r = t ? n : J(n, void 0, {
    equals: (a, s) => !a == !s
  });
  return J(() => {
    const a = r();
    if (a) {
      const s = e.children;
      return typeof s == "function" && s.length > 0 ? W(() => s(t ? a : () => {
        if (!W(r))
          throw Z5("Show");
        return n();
      })) : s;
    }
    return e.fallback;
  }, void 0, void 0);
}
const K = (e) => J(() => e());
function Q5(e, t, n) {
  let r = n.length, a = t.length, s = r, o = 0, i = 0, l = t[a - 1].nextSibling, C = null;
  for (; o < a || i < s; ) {
    if (t[o] === n[i]) {
      o++, i++;
      continue;
    }
    for (; t[a - 1] === n[s - 1]; )
      a--, s--;
    if (a === o) {
      const f = s < r ? i ? n[i - 1].nextSibling : n[s - i] : l;
      for (; i < s; )
        e.insertBefore(n[i++], f);
    } else if (s === i)
      for (; o < a; )
        (!C || !C.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === n[s - 1] && n[i] === t[a - 1]) {
      const f = t[--a].nextSibling;
      e.insertBefore(n[i++], t[o++].nextSibling), e.insertBefore(n[--s], f), t[a] = n[s];
    } else {
      if (!C) {
        C = /* @__PURE__ */ new Map();
        let c = i;
        for (; c < s; )
          C.set(n[c], c++);
      }
      const f = C.get(t[o]);
      if (f != null)
        if (i < f && f < s) {
          let c = o, _ = 1, L;
          for (; ++c < a && c < s && !((L = C.get(t[c])) == null || L !== f + _); )
            _++;
          if (_ > f - i) {
            const A = t[o];
            for (; i < f; )
              e.insertBefore(n[i++], A);
          } else
            e.replaceChild(n[i++], t[o++]);
        } else
          o++;
      else
        t[o++].remove();
    }
  }
}
const F0 = "_$DX_DELEGATE";
function U5(e, t, n, r = {}) {
  let a;
  return K1((s) => {
    a = s, t === document ? e() : d(t, e(), t.firstChild ? null : void 0, n);
  }, r.owner), () => {
    a(), t.textContent = "";
  };
}
function y(e, t, n, r) {
  let a;
  const s = () => {
    const i = r ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
    return i.innerHTML = e, n ? i.content.firstChild.firstChild : r ? i.firstChild : i.content.firstChild;
  }, o = t ? () => W(() => document.importNode(a || (a = s()), !0)) : () => (a || (a = s())).cloneNode(!0);
  return o.cloneNode = o, o;
}
function X(e, t = window.document) {
  const n = t[F0] || (t[F0] = /* @__PURE__ */ new Set());
  for (let r = 0, a = e.length; r < a; r++) {
    const s = e[r];
    n.has(s) || (n.add(s), t.addEventListener(s, Y5));
  }
}
function z(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function a1(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function u1(e, t, n, r) {
  if (r)
    Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
  else if (Array.isArray(n)) {
    const a = n[0];
    e.addEventListener(t, n[0] = (s) => a.call(e, n[1], s));
  } else
    e.addEventListener(t, n, typeof n != "function" && n);
}
function f1(e, t, n) {
  if (!t)
    return n ? z(e, "style") : t;
  const r = e.style;
  if (typeof t == "string")
    return r.cssText = t;
  typeof n == "string" && (r.cssText = n = void 0), n || (n = {}), t || (t = {});
  let a, s;
  for (s in n)
    t[s] == null && r.removeProperty(s), delete n[s];
  for (s in t)
    a = t[s], a !== n[s] && (r.setProperty(s, a), n[s] = a);
  return n;
}
function z5(e, t, n) {
  n != null ? e.style.setProperty(t, n) : e.style.removeProperty(t);
}
function L0(e, t, n) {
  return W(() => e(t, n));
}
function d(e, t, n, r) {
  if (n !== void 0 && !r && (r = []), typeof t != "function")
    return z1(e, t, r, n);
  F((a) => z1(e, t(), a, n), r);
}
function Y5(e) {
  let t = e.target;
  const n = `$$${e.type}`, r = e.target, a = e.currentTarget, s = (l) => Object.defineProperty(e, "target", {
    configurable: !0,
    value: l
  }), o = () => {
    const l = t[n];
    if (l && !t.disabled) {
      const C = t[`${n}Data`];
      if (C !== void 0 ? l.call(t, C, e) : l.call(t, e), e.cancelBubble)
        return;
    }
    return t.host && typeof t.host != "string" && !t.host._$host && t.contains(e.target) && s(t.host), !0;
  }, i = () => {
    for (; o() && (t = t._$host || t.parentNode || t.host); )
      ;
  };
  if (Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), e.composedPath) {
    const l = e.composedPath();
    s(l[0]);
    for (let C = 0; C < l.length - 2 && (t = l[C], !!o()); C++) {
      if (t._$host) {
        t = t._$host, i();
        break;
      }
      if (t.parentNode === a)
        break;
    }
  } else
    i();
  s(r);
}
function z1(e, t, n, r, a) {
  for (; typeof n == "function"; )
    n = n();
  if (t === n)
    return n;
  const s = typeof t, o = r !== void 0;
  if (e = o && n[0] && n[0].parentNode || e, s === "string" || s === "number") {
    if (s === "number" && (t = t.toString(), t === n))
      return n;
    if (o) {
      let i = n[0];
      i && i.nodeType === 3 ? i.data !== t && (i.data = t) : i = document.createTextNode(t), n = c1(e, n, r, i);
    } else
      n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
  } else if (t == null || s === "boolean")
    n = c1(e, n, r);
  else {
    if (s === "function")
      return F(() => {
        let i = t();
        for (; typeof i == "function"; )
          i = i();
        n = z1(e, i, n, r);
      }), () => n;
    if (Array.isArray(t)) {
      const i = [], l = n && Array.isArray(n);
      if (C0(i, t, n, a))
        return F(() => n = z1(e, i, n, r, !0)), () => n;
      if (i.length === 0) {
        if (n = c1(e, n, r), o)
          return n;
      } else
        l ? n.length === 0 ? B0(e, i, r) : Q5(e, n, i) : (n && c1(e), B0(e, i));
      n = i;
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (o)
          return n = c1(e, n, r, t);
        c1(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function C0(e, t, n, r) {
  let a = !1;
  for (let s = 0, o = t.length; s < o; s++) {
    let i = t[s], l = n && n[e.length], C;
    if (!(i == null || i === !0 || i === !1))
      if ((C = typeof i) == "object" && i.nodeType)
        e.push(i);
      else if (Array.isArray(i))
        a = C0(e, i, l) || a;
      else if (C === "function")
        if (r) {
          for (; typeof i == "function"; )
            i = i();
          a = C0(e, Array.isArray(i) ? i : [i], Array.isArray(l) ? l : [l]) || a;
        } else
          e.push(i), a = !0;
      else {
        const f = String(i);
        l && l.nodeType === 3 && l.data === f ? e.push(l) : e.push(document.createTextNode(f));
      }
  }
  return a;
}
function B0(e, t, n = null) {
  for (let r = 0, a = t.length; r < a; r++)
    e.insertBefore(t[r], n);
}
function c1(e, t, n, r) {
  if (n === void 0)
    return e.textContent = "";
  const a = r || document.createTextNode("");
  if (t.length) {
    let s = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const i = t[o];
      if (a !== i) {
        const l = i.parentNode === e;
        !s && !o ? l ? e.replaceChild(a, i) : e.insertBefore(a, n) : l && i.remove();
      } else
        s = !0;
    }
  } else
    e.insertBefore(a, n);
  return [a];
}
function V(e, t, n) {
  const r = {};
  return e.formatToParts(new Date(t)).forEach(({ type: a, value: s }) => {
    switch (a) {
      case "year": {
        r.YYYY = s;
        break;
      }
      case "month": {
        r.MM = s;
        break;
      }
      case "day": {
        r.DD = s;
        break;
      }
      case "hour": {
        r.HH = s === "24" ? "00" : s;
        break;
      }
      case "minute": {
        r.mm = s;
        break;
      }
      case "second": {
        r.ss = s;
        break;
      }
      case "dayPeriod":
        r.AP = " " + s.toLocaleUpperCase(e.resolvedOptions().locale).replaceAll(".", "");
    }
  }), n.replace(/YYYY|MM|DD|HH|mm|ss|AP/g, (a) => r[a]);
}
var B1 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function A9(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var V5 = typeof B1 == "object" && B1 && B1.Object === Object && B1, T9 = V5, H5 = T9, G5 = typeof self == "object" && self && self.Object === Object && self, W5 = H5 || G5 || Function("return this")(), H = W5, X5 = H, q5 = X5.Symbol, W1 = q5, N0 = W1, I9 = Object.prototype, J5 = I9.hasOwnProperty, e6 = I9.toString, w1 = N0 ? N0.toStringTag : void 0;
function t6(e) {
  var t = J5.call(e, w1), n = e[w1];
  try {
    e[w1] = void 0;
    var r = !0;
  } catch {
  }
  var a = e6.call(e);
  return r && (t ? e[w1] = n : delete e[w1]), a;
}
var n6 = t6, r6 = Object.prototype, a6 = r6.toString;
function i6(e) {
  return a6.call(e);
}
var s6 = i6, K0 = W1, o6 = n6, l6 = s6, c6 = "[object Null]", u6 = "[object Undefined]", j0 = K0 ? K0.toStringTag : void 0;
function C6(e) {
  return e == null ? e === void 0 ? u6 : c6 : j0 && j0 in Object(e) ? o6(e) : l6(e);
}
var T1 = C6;
function f6(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var y1 = f6, y6 = T1, p6 = y1, g6 = "[object AsyncFunction]", m6 = "[object Function]", h6 = "[object GeneratorFunction]", d6 = "[object Proxy]";
function v6(e) {
  if (!p6(e))
    return !1;
  var t = y6(e);
  return t == m6 || t == h6 || t == g6 || t == d6;
}
var P9 = v6, _6 = H, L6 = _6["__core-js_shared__"], $6 = L6, o0 = $6, Z0 = function() {
  var e = /[^.]+$/.exec(o0 && o0.keys && o0.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function b6(e) {
  return !!Z0 && Z0 in e;
}
var x6 = b6, k6 = Function.prototype, w6 = k6.toString;
function M6(e) {
  if (e != null) {
    try {
      return w6.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var D9 = M6, S6 = P9, A6 = x6, T6 = y1, I6 = D9, P6 = /[\\^$.*+?()[\]{}|]/g, D6 = /^\[object .+?Constructor\]$/, O6 = Function.prototype, E6 = Object.prototype, F6 = O6.toString, B6 = E6.hasOwnProperty, N6 = RegExp(
  "^" + F6.call(B6).replace(P6, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function K6(e) {
  if (!T6(e) || A6(e))
    return !1;
  var t = S6(e) ? N6 : D6;
  return t.test(I6(e));
}
var j6 = K6;
function Z6(e, t) {
  return e == null ? void 0 : e[t];
}
var R6 = Z6, Q6 = j6, U6 = R6;
function z6(e, t) {
  var n = U6(e, t);
  return Q6(n) ? n : void 0;
}
var i1 = z6, Y6 = i1, V6 = function() {
  try {
    var e = Y6(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), H6 = V6, R0 = H6;
function G6(e, t, n) {
  t == "__proto__" && R0 ? R0(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
var O9 = G6;
function W6(e, t) {
  return e === t || e !== e && t !== t;
}
var E9 = W6, X6 = O9, q6 = E9, J6 = Object.prototype, ee = J6.hasOwnProperty;
function te(e, t, n) {
  var r = e[t];
  (!(ee.call(e, t) && q6(r, n)) || n === void 0 && !(t in e)) && X6(e, t, n);
}
var $0 = te, ne = Array.isArray, p1 = ne;
function re(e) {
  return e != null && typeof e == "object";
}
var g1 = re, ae = T1, ie = g1, se = "[object Symbol]";
function oe(e) {
  return typeof e == "symbol" || ie(e) && ae(e) == se;
}
var b0 = oe, le = p1, ce = b0, ue = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ce = /^\w*$/;
function fe(e, t) {
  if (le(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || ce(e) ? !0 : Ce.test(e) || !ue.test(e) || t != null && e in Object(t);
}
var ye = fe, pe = i1, ge = pe(Object, "create"), X1 = ge, Q0 = X1;
function me() {
  this.__data__ = Q0 ? Q0(null) : {}, this.size = 0;
}
var he = me;
function de(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var ve = de, _e = X1, Le = "__lodash_hash_undefined__", $e = Object.prototype, be = $e.hasOwnProperty;
function xe(e) {
  var t = this.__data__;
  if (_e) {
    var n = t[e];
    return n === Le ? void 0 : n;
  }
  return be.call(t, e) ? t[e] : void 0;
}
var ke = xe, we = X1, Me = Object.prototype, Se = Me.hasOwnProperty;
function Ae(e) {
  var t = this.__data__;
  return we ? t[e] !== void 0 : Se.call(t, e);
}
var Te = Ae, Ie = X1, Pe = "__lodash_hash_undefined__";
function De(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = Ie && t === void 0 ? Pe : t, this;
}
var Oe = De, Ee = he, Fe = ve, Be = ke, Ne = Te, Ke = Oe;
function m1(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
m1.prototype.clear = Ee;
m1.prototype.delete = Fe;
m1.prototype.get = Be;
m1.prototype.has = Ne;
m1.prototype.set = Ke;
var je = m1;
function Ze() {
  this.__data__ = [], this.size = 0;
}
var Re = Ze, Qe = E9;
function Ue(e, t) {
  for (var n = e.length; n--; )
    if (Qe(e[n][0], t))
      return n;
  return -1;
}
var q1 = Ue, ze = q1, Ye = Array.prototype, Ve = Ye.splice;
function He(e) {
  var t = this.__data__, n = ze(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : Ve.call(t, n, 1), --this.size, !0;
}
var Ge = He, We = q1;
function Xe(e) {
  var t = this.__data__, n = We(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var qe = Xe, Je = q1;
function e2(e) {
  return Je(this.__data__, e) > -1;
}
var t2 = e2, n2 = q1;
function r2(e, t) {
  var n = this.__data__, r = n2(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
var a2 = r2, i2 = Re, s2 = Ge, o2 = qe, l2 = t2, c2 = a2;
function h1(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
h1.prototype.clear = i2;
h1.prototype.delete = s2;
h1.prototype.get = o2;
h1.prototype.has = l2;
h1.prototype.set = c2;
var J1 = h1, u2 = i1, C2 = H, f2 = u2(C2, "Map"), x0 = f2, U0 = je, y2 = J1, p2 = x0;
function g2() {
  this.size = 0, this.__data__ = {
    hash: new U0(),
    map: new (p2 || y2)(),
    string: new U0()
  };
}
var m2 = g2;
function h2(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var d2 = h2, v2 = d2;
function _2(e, t) {
  var n = e.__data__;
  return v2(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var e0 = _2, L2 = e0;
function $2(e) {
  var t = L2(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var b2 = $2, x2 = e0;
function k2(e) {
  return x2(this, e).get(e);
}
var w2 = k2, M2 = e0;
function S2(e) {
  return M2(this, e).has(e);
}
var A2 = S2, T2 = e0;
function I2(e, t) {
  var n = T2(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
var P2 = I2, D2 = m2, O2 = b2, E2 = w2, F2 = A2, B2 = P2;
function d1(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
d1.prototype.clear = D2;
d1.prototype.delete = O2;
d1.prototype.get = E2;
d1.prototype.has = F2;
d1.prototype.set = B2;
var F9 = d1, B9 = F9, N2 = "Expected a function";
function k0(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(N2);
  var n = function() {
    var r = arguments, a = t ? t.apply(this, r) : r[0], s = n.cache;
    if (s.has(a))
      return s.get(a);
    var o = e.apply(this, r);
    return n.cache = s.set(a, o) || s, o;
  };
  return n.cache = new (k0.Cache || B9)(), n;
}
k0.Cache = B9;
var K2 = k0, j2 = K2, Z2 = 500;
function R2(e) {
  var t = j2(e, function(r) {
    return n.size === Z2 && n.clear(), r;
  }), n = t.cache;
  return t;
}
var Q2 = R2, U2 = Q2, z2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Y2 = /\\(\\)?/g, V2 = U2(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(z2, function(n, r, a, s) {
    t.push(a ? s.replace(Y2, "$1") : r || n);
  }), t;
}), H2 = V2;
function G2(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = Array(r); ++n < r; )
    a[n] = t(e[n], n, e);
  return a;
}
var W2 = G2, z0 = W1, X2 = W2, q2 = p1, J2 = b0, e3 = 1 / 0, Y0 = z0 ? z0.prototype : void 0, V0 = Y0 ? Y0.toString : void 0;
function N9(e) {
  if (typeof e == "string")
    return e;
  if (q2(e))
    return X2(e, N9) + "";
  if (J2(e))
    return V0 ? V0.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -e3 ? "-0" : t;
}
var t3 = N9, n3 = t3;
function r3(e) {
  return e == null ? "" : n3(e);
}
var a3 = r3, i3 = p1, s3 = ye, o3 = H2, l3 = a3;
function c3(e, t) {
  return i3(e) ? e : s3(e, t) ? [e] : o3(l3(e));
}
var u3 = c3, C3 = 9007199254740991, f3 = /^(?:0|[1-9]\d*)$/;
function y3(e, t) {
  var n = typeof e;
  return t = t ?? C3, !!t && (n == "number" || n != "symbol" && f3.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var K9 = y3, p3 = b0, g3 = 1 / 0;
function m3(e) {
  if (typeof e == "string" || p3(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -g3 ? "-0" : t;
}
var h3 = m3, d3 = $0, v3 = u3, _3 = K9, H0 = y1, L3 = h3;
function $3(e, t, n, r) {
  if (!H0(e))
    return e;
  t = v3(t, e);
  for (var a = -1, s = t.length, o = s - 1, i = e; i != null && ++a < s; ) {
    var l = L3(t[a]), C = n;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return e;
    if (a != o) {
      var f = i[l];
      C = r ? r(f, l, i) : void 0, C === void 0 && (C = H0(f) ? f : _3(t[a + 1]) ? [] : {});
    }
    d3(i, l, C), i = i[l];
  }
  return e;
}
var b3 = $3, x3 = b3;
function k3(e, t, n) {
  return e == null ? e : x3(e, t, n);
}
var w3 = k3;
const f0 = /* @__PURE__ */ A9(w3);
var M3 = J1;
function S3() {
  this.__data__ = new M3(), this.size = 0;
}
var A3 = S3;
function T3(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var I3 = T3;
function P3(e) {
  return this.__data__.get(e);
}
var D3 = P3;
function O3(e) {
  return this.__data__.has(e);
}
var E3 = O3, F3 = J1, B3 = x0, N3 = F9, K3 = 200;
function j3(e, t) {
  var n = this.__data__;
  if (n instanceof F3) {
    var r = n.__data__;
    if (!B3 || r.length < K3 - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new N3(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
var Z3 = j3, R3 = J1, Q3 = A3, U3 = I3, z3 = D3, Y3 = E3, V3 = Z3;
function v1(e) {
  var t = this.__data__ = new R3(e);
  this.size = t.size;
}
v1.prototype.clear = Q3;
v1.prototype.delete = U3;
v1.prototype.get = z3;
v1.prototype.has = Y3;
v1.prototype.set = V3;
var H3 = v1;
function G3(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1; )
    ;
  return e;
}
var W3 = G3, X3 = $0, q3 = O9;
function J3(e, t, n, r) {
  var a = !n;
  n || (n = {});
  for (var s = -1, o = t.length; ++s < o; ) {
    var i = t[s], l = r ? r(n[i], e[i], i, n, e) : void 0;
    l === void 0 && (l = e[i]), a ? q3(n, i, l) : X3(n, i, l);
  }
  return n;
}
var t0 = J3;
function e8(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var t8 = e8, n8 = T1, r8 = g1, a8 = "[object Arguments]";
function i8(e) {
  return r8(e) && n8(e) == a8;
}
var s8 = i8, G0 = s8, o8 = g1, j9 = Object.prototype, l8 = j9.hasOwnProperty, c8 = j9.propertyIsEnumerable, u8 = G0(function() {
  return arguments;
}()) ? G0 : function(e) {
  return o8(e) && l8.call(e, "callee") && !c8.call(e, "callee");
}, C8 = u8, Y1 = { exports: {} };
function f8() {
  return !1;
}
var y8 = f8;
Y1.exports;
(function(e, t) {
  var n = H, r = y8, a = t && !t.nodeType && t, s = a && !0 && e && !e.nodeType && e, o = s && s.exports === a, i = o ? n.Buffer : void 0, l = i ? i.isBuffer : void 0, C = l || r;
  e.exports = C;
})(Y1, Y1.exports);
var Z9 = Y1.exports, p8 = 9007199254740991;
function g8(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= p8;
}
var R9 = g8, m8 = T1, h8 = R9, d8 = g1, v8 = "[object Arguments]", _8 = "[object Array]", L8 = "[object Boolean]", $8 = "[object Date]", b8 = "[object Error]", x8 = "[object Function]", k8 = "[object Map]", w8 = "[object Number]", M8 = "[object Object]", S8 = "[object RegExp]", A8 = "[object Set]", T8 = "[object String]", I8 = "[object WeakMap]", P8 = "[object ArrayBuffer]", D8 = "[object DataView]", O8 = "[object Float32Array]", E8 = "[object Float64Array]", F8 = "[object Int8Array]", B8 = "[object Int16Array]", N8 = "[object Int32Array]", K8 = "[object Uint8Array]", j8 = "[object Uint8ClampedArray]", Z8 = "[object Uint16Array]", R8 = "[object Uint32Array]", S = {};
S[O8] = S[E8] = S[F8] = S[B8] = S[N8] = S[K8] = S[j8] = S[Z8] = S[R8] = !0;
S[v8] = S[_8] = S[P8] = S[L8] = S[D8] = S[$8] = S[b8] = S[x8] = S[k8] = S[w8] = S[M8] = S[S8] = S[A8] = S[T8] = S[I8] = !1;
function Q8(e) {
  return d8(e) && h8(e.length) && !!S[m8(e)];
}
var U8 = Q8;
function z8(e) {
  return function(t) {
    return e(t);
  };
}
var w0 = z8, V1 = { exports: {} };
V1.exports;
(function(e, t) {
  var n = T9, r = t && !t.nodeType && t, a = r && !0 && e && !e.nodeType && e, s = a && a.exports === r, o = s && n.process, i = function() {
    try {
      var l = a && a.require && a.require("util").types;
      return l || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  e.exports = i;
})(V1, V1.exports);
var M0 = V1.exports, Y8 = U8, V8 = w0, W0 = M0, X0 = W0 && W0.isTypedArray, H8 = X0 ? V8(X0) : Y8, G8 = H8, W8 = t8, X8 = C8, q8 = p1, J8 = Z9, e7 = K9, t7 = G8, n7 = Object.prototype, r7 = n7.hasOwnProperty;
function a7(e, t) {
  var n = q8(e), r = !n && X8(e), a = !n && !r && J8(e), s = !n && !r && !a && t7(e), o = n || r || a || s, i = o ? W8(e.length, String) : [], l = i.length;
  for (var C in e)
    (t || r7.call(e, C)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (C == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (C == "offset" || C == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (C == "buffer" || C == "byteLength" || C == "byteOffset") || // Skip index properties.
    e7(C, l))) && i.push(C);
  return i;
}
var Q9 = a7, i7 = Object.prototype;
function s7(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || i7;
  return e === n;
}
var S0 = s7;
function o7(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var U9 = o7, l7 = U9, c7 = l7(Object.keys, Object), u7 = c7, C7 = S0, f7 = u7, y7 = Object.prototype, p7 = y7.hasOwnProperty;
function g7(e) {
  if (!C7(e))
    return f7(e);
  var t = [];
  for (var n in Object(e))
    p7.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var m7 = g7, h7 = P9, d7 = R9;
function v7(e) {
  return e != null && d7(e.length) && !h7(e);
}
var z9 = v7, _7 = Q9, L7 = m7, $7 = z9;
function b7(e) {
  return $7(e) ? _7(e) : L7(e);
}
var A0 = b7, x7 = t0, k7 = A0;
function w7(e, t) {
  return e && x7(t, k7(t), e);
}
var M7 = w7;
function S7(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var A7 = S7, T7 = y1, I7 = S0, P7 = A7, D7 = Object.prototype, O7 = D7.hasOwnProperty;
function E7(e) {
  if (!T7(e))
    return P7(e);
  var t = I7(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !O7.call(e, r)) || n.push(r);
  return n;
}
var F7 = E7, B7 = Q9, N7 = F7, K7 = z9;
function j7(e) {
  return K7(e) ? B7(e, !0) : N7(e);
}
var T0 = j7, Z7 = t0, R7 = T0;
function Q7(e, t) {
  return e && Z7(t, R7(t), e);
}
var U7 = Q7, H1 = { exports: {} };
H1.exports;
(function(e, t) {
  var n = H, r = t && !t.nodeType && t, a = r && !0 && e && !e.nodeType && e, s = a && a.exports === r, o = s ? n.Buffer : void 0, i = o ? o.allocUnsafe : void 0;
  function l(C, f) {
    if (f)
      return C.slice();
    var c = C.length, _ = i ? i(c) : new C.constructor(c);
    return C.copy(_), _;
  }
  e.exports = l;
})(H1, H1.exports);
var z7 = H1.exports;
function Y7(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var V7 = Y7;
function H7(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = 0, s = []; ++n < r; ) {
    var o = e[n];
    t(o, n, e) && (s[a++] = o);
  }
  return s;
}
var G7 = H7;
function W7() {
  return [];
}
var Y9 = W7, X7 = G7, q7 = Y9, J7 = Object.prototype, et = J7.propertyIsEnumerable, q0 = Object.getOwnPropertySymbols, tt = q0 ? function(e) {
  return e == null ? [] : (e = Object(e), X7(q0(e), function(t) {
    return et.call(e, t);
  }));
} : q7, I0 = tt, nt = t0, rt = I0;
function at(e, t) {
  return nt(e, rt(e), t);
}
var it = at;
function st(e, t) {
  for (var n = -1, r = t.length, a = e.length; ++n < r; )
    e[a + n] = t[n];
  return e;
}
var V9 = st, ot = U9, lt = ot(Object.getPrototypeOf, Object), H9 = lt, ct = V9, ut = H9, Ct = I0, ft = Y9, yt = Object.getOwnPropertySymbols, pt = yt ? function(e) {
  for (var t = []; e; )
    ct(t, Ct(e)), e = ut(e);
  return t;
} : ft, G9 = pt, gt = t0, mt = G9;
function ht(e, t) {
  return gt(e, mt(e), t);
}
var dt = ht, vt = V9, _t = p1;
function Lt(e, t, n) {
  var r = t(e);
  return _t(e) ? r : vt(r, n(e));
}
var W9 = Lt, $t = W9, bt = I0, xt = A0;
function kt(e) {
  return $t(e, xt, bt);
}
var wt = kt, Mt = W9, St = G9, At = T0;
function Tt(e) {
  return Mt(e, At, St);
}
var It = Tt, Pt = i1, Dt = H, Ot = Pt(Dt, "DataView"), Et = Ot, Ft = i1, Bt = H, Nt = Ft(Bt, "Promise"), Kt = Nt, jt = i1, Zt = H, Rt = jt(Zt, "Set"), Qt = Rt, Ut = i1, zt = H, Yt = Ut(zt, "WeakMap"), Vt = Yt, y0 = Et, p0 = x0, g0 = Kt, m0 = Qt, h0 = Vt, X9 = T1, _1 = D9, J0 = "[object Map]", Ht = "[object Object]", e9 = "[object Promise]", t9 = "[object Set]", n9 = "[object WeakMap]", r9 = "[object DataView]", Gt = _1(y0), Wt = _1(p0), Xt = _1(g0), qt = _1(m0), Jt = _1(h0), r1 = X9;
(y0 && r1(new y0(new ArrayBuffer(1))) != r9 || p0 && r1(new p0()) != J0 || g0 && r1(g0.resolve()) != e9 || m0 && r1(new m0()) != t9 || h0 && r1(new h0()) != n9) && (r1 = function(e) {
  var t = X9(e), n = t == Ht ? e.constructor : void 0, r = n ? _1(n) : "";
  if (r)
    switch (r) {
      case Gt:
        return r9;
      case Wt:
        return J0;
      case Xt:
        return e9;
      case qt:
        return t9;
      case Jt:
        return n9;
    }
  return t;
});
var P0 = r1, e4 = Object.prototype, t4 = e4.hasOwnProperty;
function n4(e) {
  var t = e.length, n = new e.constructor(t);
  return t && typeof e[0] == "string" && t4.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
var r4 = n4, a4 = H, i4 = a4.Uint8Array, s4 = i4, a9 = s4;
function o4(e) {
  var t = new e.constructor(e.byteLength);
  return new a9(t).set(new a9(e)), t;
}
var D0 = o4, l4 = D0;
function c4(e, t) {
  var n = t ? l4(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var u4 = c4, C4 = /\w*$/;
function f4(e) {
  var t = new e.constructor(e.source, C4.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var y4 = f4, i9 = W1, s9 = i9 ? i9.prototype : void 0, o9 = s9 ? s9.valueOf : void 0;
function p4(e) {
  return o9 ? Object(o9.call(e)) : {};
}
var g4 = p4, m4 = D0;
function h4(e, t) {
  var n = t ? m4(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var d4 = h4, v4 = D0, _4 = u4, L4 = y4, $4 = g4, b4 = d4, x4 = "[object Boolean]", k4 = "[object Date]", w4 = "[object Map]", M4 = "[object Number]", S4 = "[object RegExp]", A4 = "[object Set]", T4 = "[object String]", I4 = "[object Symbol]", P4 = "[object ArrayBuffer]", D4 = "[object DataView]", O4 = "[object Float32Array]", E4 = "[object Float64Array]", F4 = "[object Int8Array]", B4 = "[object Int16Array]", N4 = "[object Int32Array]", K4 = "[object Uint8Array]", j4 = "[object Uint8ClampedArray]", Z4 = "[object Uint16Array]", R4 = "[object Uint32Array]";
function Q4(e, t, n) {
  var r = e.constructor;
  switch (t) {
    case P4:
      return v4(e);
    case x4:
    case k4:
      return new r(+e);
    case D4:
      return _4(e, n);
    case O4:
    case E4:
    case F4:
    case B4:
    case N4:
    case K4:
    case j4:
    case Z4:
    case R4:
      return b4(e, n);
    case w4:
      return new r();
    case M4:
    case T4:
      return new r(e);
    case S4:
      return L4(e);
    case A4:
      return new r();
    case I4:
      return $4(e);
  }
}
var U4 = Q4, z4 = y1, l9 = Object.create, Y4 = function() {
  function e() {
  }
  return function(t) {
    if (!z4(t))
      return {};
    if (l9)
      return l9(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), V4 = Y4, H4 = V4, G4 = H9, W4 = S0;
function X4(e) {
  return typeof e.constructor == "function" && !W4(e) ? H4(G4(e)) : {};
}
var q4 = X4, J4 = P0, en = g1, tn = "[object Map]";
function nn(e) {
  return en(e) && J4(e) == tn;
}
var rn = nn, an = rn, sn = w0, c9 = M0, u9 = c9 && c9.isMap, on = u9 ? sn(u9) : an, ln = on, cn = P0, un = g1, Cn = "[object Set]";
function fn(e) {
  return un(e) && cn(e) == Cn;
}
var yn = fn, pn = yn, gn = w0, C9 = M0, f9 = C9 && C9.isSet, mn = f9 ? gn(f9) : pn, hn = mn, dn = H3, vn = W3, _n = $0, Ln = M7, $n = U7, bn = z7, xn = V7, kn = it, wn = dt, Mn = wt, Sn = It, An = P0, Tn = r4, In = U4, Pn = q4, Dn = p1, On = Z9, En = ln, Fn = y1, Bn = hn, Nn = A0, Kn = T0, jn = 1, Zn = 2, Rn = 4, q9 = "[object Arguments]", Qn = "[object Array]", Un = "[object Boolean]", zn = "[object Date]", Yn = "[object Error]", J9 = "[object Function]", Vn = "[object GeneratorFunction]", Hn = "[object Map]", Gn = "[object Number]", e5 = "[object Object]", Wn = "[object RegExp]", Xn = "[object Set]", qn = "[object String]", Jn = "[object Symbol]", er = "[object WeakMap]", tr = "[object ArrayBuffer]", nr = "[object DataView]", rr = "[object Float32Array]", ar = "[object Float64Array]", ir = "[object Int8Array]", sr = "[object Int16Array]", or = "[object Int32Array]", lr = "[object Uint8Array]", cr = "[object Uint8ClampedArray]", ur = "[object Uint16Array]", Cr = "[object Uint32Array]", w = {};
w[q9] = w[Qn] = w[tr] = w[nr] = w[Un] = w[zn] = w[rr] = w[ar] = w[ir] = w[sr] = w[or] = w[Hn] = w[Gn] = w[e5] = w[Wn] = w[Xn] = w[qn] = w[Jn] = w[lr] = w[cr] = w[ur] = w[Cr] = !0;
w[Yn] = w[J9] = w[er] = !1;
function j1(e, t, n, r, a, s) {
  var o, i = t & jn, l = t & Zn, C = t & Rn;
  if (n && (o = a ? n(e, r, a, s) : n(e)), o !== void 0)
    return o;
  if (!Fn(e))
    return e;
  var f = Dn(e);
  if (f) {
    if (o = Tn(e), !i)
      return xn(e, o);
  } else {
    var c = An(e), _ = c == J9 || c == Vn;
    if (On(e))
      return bn(e, i);
    if (c == e5 || c == q9 || _ && !a) {
      if (o = l || _ ? {} : Pn(e), !i)
        return l ? wn(e, $n(o, e)) : kn(e, Ln(o, e));
    } else {
      if (!w[c])
        return a ? e : {};
      o = In(e, c, i);
    }
  }
  s || (s = new dn());
  var L = s.get(e);
  if (L)
    return L;
  s.set(e, o), Bn(e) ? e.forEach(function(E) {
    o.add(j1(E, t, n, E, e, s));
  }) : En(e) && e.forEach(function(E, T) {
    o.set(T, j1(E, t, n, T, e, s));
  });
  var A = C ? l ? Sn : Mn : l ? Kn : Nn, O = f ? void 0 : A(e);
  return vn(O || e, function(E, T) {
    O && (T = E, E = e[T]), _n(o, T, j1(E, t, n, T, e, s));
  }), o;
}
var fr = j1, yr = fr, pr = 1, gr = 4;
function mr(e) {
  return yr(e, pr | gr);
}
var hr = mr;
const dr = /* @__PURE__ */ A9(hr);
var vr = /* @__PURE__ */ y("<button>");
const _r = (e) => (() => {
  var t = vr();
  return u1(t, "click", e.onClick, !0), d(t, () => e.children), F((n) => {
    var r = e.style, a = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return n.e = f1(t, r, n.e), a !== n.t && a1(t, n.t = a), n;
  }, {
    e: void 0,
    t: void 0
  }), t;
})();
X(["click"]);
var Lr = /* @__PURE__ */ y('<svg viewBox="0 0 1024 1024"class=icon><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z">'), $r = /* @__PURE__ */ y('<svg viewBox="0 0 1024 1024"class=icon><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z">'), br = /* @__PURE__ */ y("<div>"), xr = /* @__PURE__ */ y("<span class=label>");
const kr = () => Lr(), wr = () => $r(), y9 = (e) => {
  const [t, n] = x(e.checked ?? !1);
  return q(() => {
    "checked" in e && n(e.checked);
  }), (() => {
    var r = br();
    return r.$$click = (a) => {
      const s = !t();
      e.onChange && e.onChange(s), n(s);
    }, d(r, (() => {
      var a = K(() => !!t());
      return () => a() ? v(kr, {}) : v(wr, {});
    })(), null), d(r, (() => {
      var a = K(() => !!e.label);
      return () => a() && (() => {
        var s = xr();
        return d(s, () => e.label), s;
      })();
    })(), null), F((a) => {
      var s = e.style, o = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return a.e = f1(r, s, a.e), o !== a.t && a1(r, a.t = o), a;
    }, {
      e: void 0,
      t: void 0
    }), r;
  })();
};
X(["click"]);
var Mr = /* @__PURE__ */ y("<div class=klinecharts-pro-loading><i class=circle1></i><i class=circle2></i><i class=circle3>");
const t5 = () => Mr();
var Sr = /* @__PURE__ */ y('<div class=klinecharts-pro-empty><svg class=icon viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z">');
const Ar = () => Sr();
var Tr = /* @__PURE__ */ y("<ul>"), Ir = /* @__PURE__ */ y("<li>");
const d0 = (e) => (() => {
  var t = Tr();
  return d(t, v(Z, {
    get when() {
      return e.loading;
    },
    get children() {
      return v(t5, {});
    }
  }), null), d(t, v(Z, {
    get when() {
      var n;
      return K(() => !e.loading && !e.children)() && !((n = e.dataSource) != null && n.length);
    },
    get children() {
      return v(Ar, {});
    }
  }), null), d(t, v(Z, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), d(t, v(Z, {
    get when() {
      return !e.children;
    },
    get children() {
      var n;
      return (n = e.dataSource) == null ? void 0 : n.map((r) => {
        var a;
        return ((a = e.renderItem) == null ? void 0 : a.call(e, r)) ?? Ir();
      });
    }
  }), null), F((n) => {
    var r = e.style, a = `klinecharts-pro-list ${e.class ?? ""}`;
    return n.e = f1(t, r, n.e), a !== n.t && a1(t, n.t = a), n;
  }, {
    e: void 0,
    t: void 0
  }), t;
})();
var Pr = /* @__PURE__ */ y('<div class=klinecharts-pro-modal><div class=inner><div class=title-container><svg class=close-icon viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class=content-container>'), Dr = /* @__PURE__ */ y("<div class=button-container>");
const n0 = (e) => (() => {
  var t = Pr(), n = t.firstChild, r = n.firstChild, a = r.firstChild, s = r.nextSibling;
  return d(r, () => e.title, a), u1(a, "click", e.onClose, !0), d(s, () => e.children), d(n, (() => {
    var o = K(() => !!(e.buttons && e.buttons.length > 0));
    return () => o() && (() => {
      var i = Dr();
      return d(i, () => e.buttons.map((l) => v(_r, S9(l, {
        get children() {
          return l.children;
        }
      })))), i;
    })();
  })(), null), F((o) => z5(n, "width", `${e.width ?? 400}px`)), t;
})();
X(["click"]);
var Or = /* @__PURE__ */ y("<div tabindex=0><div class=selector-container><span class=value></span><i class=arrow>"), Er = /* @__PURE__ */ y("<div class=drop-down-container><ul>"), Fr = /* @__PURE__ */ y("<li>");
const Br = (e) => {
  const [t, n] = x(!1);
  return (() => {
    var r = Or(), a = r.firstChild, s = a.firstChild;
    return r.addEventListener("blur", (o) => {
      n(!1);
    }), r.$$click = (o) => {
      n((i) => !i);
    }, d(s, () => e.value), d(r, (() => {
      var o = K(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => o() && (() => {
        var i = Er(), l = i.firstChild;
        return d(l, () => e.dataSource.map((C) => {
          const c = C[e.valueKey ?? "text"] ?? C;
          return (() => {
            var _ = Fr();
            return _.$$click = (L) => {
              var A;
              L.stopPropagation(), e.value !== c && ((A = e.onSelected) == null || A.call(e, C)), n(!1);
            }, d(_, c), _;
          })();
        })), i;
      })();
    })(), null), F((o) => {
      var i = e.style, l = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return o.e = f1(r, i, o.e), l !== o.t && a1(r, o.t = l), o;
    }, {
      e: void 0,
      t: void 0
    }), r;
  })();
};
X(["click"]);
var Nr = /* @__PURE__ */ y("<span class=prefix>"), Kr = /* @__PURE__ */ y("<span class=suffix>"), jr = /* @__PURE__ */ y("<div><input class=value>");
const Zr = (e) => {
  const t = S9({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let n;
  const [r, a] = x("normal");
  return (() => {
    var s = jr(), o = s.firstChild;
    return s.$$click = () => {
      n == null || n.focus();
    }, d(s, v(Z, {
      get when() {
        return t.prefix;
      },
      get children() {
        var i = Nr();
        return d(i, () => t.prefix), i;
      }
    }), o), o.addEventListener("change", (i) => {
      var C, f;
      const l = i.target.value;
      if ("precision" in t) {
        let c;
        const _ = Math.max(0, Math.floor(t.precision));
        _ <= 0 ? c = new RegExp(/^[1-9]\d*$/) : c = new RegExp("^\\d+\\.?\\d{0," + _ + "}$"), (l === "" || c.test(l) && +l >= t.min && +l <= t.max) && ((C = t.onChange) == null || C.call(t, l === "" ? l : +l));
      } else
        (f = t.onChange) == null || f.call(t, l);
    }), o.addEventListener("blur", () => {
      a("normal");
    }), o.addEventListener("focus", () => {
      a("focus");
    }), L0((i) => {
      n = i;
    }, o), d(s, v(Z, {
      get when() {
        return t.suffix;
      },
      get children() {
        var i = Kr();
        return d(i, () => t.suffix), i;
      }
    }), null), F((i) => {
      var l = t.style, C = `klinecharts-pro-input ${t.class ?? ""}`, f = r(), c = t.placeholder ?? "";
      return i.e = f1(s, l, i.e), C !== i.t && a1(s, i.t = C), f !== i.a && z(s, "data-status", i.a = f), c !== i.o && z(o, "placeholder", i.o = c), i;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), F(() => o.value = t.value), s;
  })();
};
X(["click"]);
var Rr = /* @__PURE__ */ y("<div><i class=thumb>");
const Qr = (e) => (() => {
  var t = Rr();
  return t.$$click = (n) => {
    e.onChange && e.onChange();
  }, F((n) => {
    var r = e.style, a = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return n.e = f1(t, r, n.e), a !== n.t && a1(t, n.t = a), n;
  }, {
    e: void 0,
    t: void 0
  }), t;
})();
X(["click"]);
const Ur = "指标", zr = "主图指标", Yr = "副图指标", Vr = "设置", Hr = "时区", Gr = "截屏", Wr = "全屏", Xr = "退出全屏", qr = "保存", Jr = "确定", ea = "取消", ta = "MA(移动平均线)", na = "EMA(指数平滑移动平均线)", ra = "SMA", aa = "BOLL(布林线)", ia = "BBI(多空指数)", sa = "SAR(停损点指向指标)", oa = "VOL(成交量)", la = "MACD(指数平滑异同移动平均线)", ca = "KDJ(随机指标)", ua = "RSI(相对强弱指标)", Ca = "BIAS(乖离率)", fa = "BRAR(情绪指标)", ya = "CCI(顺势指标)", pa = "DMI(动向指标)", ga = "CR(能量指标)", ma = "PSY(心理线)", ha = "DMA(平行线差指标)", da = "TRIX(三重指数平滑平均线)", va = "OBV(能量潮指标)", _a = "VR(成交量变异率)", La = "WR(威廉指标)", $a = "MTM(动量指标)", ba = "EMV(简易波动指标)", xa = "ROC(变动率指标)", ka = "PVT(价量趋势指标)", wa = "AO(动量震荡指标)", Ma = "世界统一时间", Sa = "(UTC-10) 檀香山", Aa = "(UTC-8) 朱诺", Ta = "(UTC-7) 洛杉矶", Ia = "(UTC-5) 芝加哥", Pa = "(UTC-4) 多伦多", Da = "(UTC-3) 圣保罗", Oa = "(UTC+1) 伦敦", Ea = "(UTC+2) 柏林", Fa = "(UTC+3) 巴林", Ba = "(UTC+4) 迪拜", Na = "(UTC+5) 阿什哈巴德", Ka = "(UTC+6) 阿拉木图", ja = "(UTC+7) 曼谷", Za = "(UTC+8) 上海", Ra = "(UTC+9) 东京", Qa = "(UTC+10) 悉尼", Ua = "(UTC+12) 诺福克岛", za = "水平直线", Ya = "水平射线", Va = "水平线段", Ha = "垂直直线", Ga = "垂直射线", Wa = "垂直线段", Xa = "直线", qa = "射线", Ja = "线段", ei = "箭头", ti = "价格线", ni = "价格通道线", ri = "平行直线", ai = "斐波那契回调直线", ii = "斐波那契回调线段", si = "斐波那契圆环", oi = "斐波那契螺旋", li = "斐波那契速度阻力扇", ci = "斐波那契趋势扩展", ui = "江恩箱", Ci = "矩形", fi = "平行四边形", yi = "圆", pi = "三角形", gi = "三浪", mi = "五浪", hi = "八浪", di = "任意浪", vi = "ABCD形态", _i = "XABCD形态", Li = "弱磁模式", $i = "强磁模式", bi = "商品搜索", xi = "商品代码", ki = "参数1", wi = "参数2", Mi = "参数3", Si = "参数4", Ai = "参数5", Ti = "周期", Ii = "标准差", Pi = "蜡烛图类型", Di = "全实心", Oi = "全空心", Ei = "涨空心", Fi = "跌空心", Bi = "OHLC", Ni = "面积图", Ki = "最新价显示", ji = "最高价显示", Zi = "最低价显示", Ri = "指标最新值显示", Qi = "价格轴类型", Ui = "线性轴", zi = "百分比轴", Yi = "对数轴", Vi = "倒置坐标", Hi = "网格线显示", Gi = "恢复默认", Wi = {
  indicator: Ur,
  main_indicator: zr,
  sub_indicator: Yr,
  setting: Vr,
  timezone: Hr,
  screenshot: Gr,
  full_screen: Wr,
  exit_full_screen: Xr,
  save: qr,
  confirm: Jr,
  cancel: ea,
  ma: ta,
  ema: na,
  sma: ra,
  boll: aa,
  bbi: ia,
  sar: sa,
  vol: oa,
  macd: la,
  kdj: ca,
  rsi: ua,
  bias: Ca,
  brar: fa,
  cci: ya,
  dmi: pa,
  cr: ga,
  psy: ma,
  dma: ha,
  trix: da,
  obv: va,
  vr: _a,
  wr: La,
  mtm: $a,
  emv: ba,
  roc: xa,
  pvt: ka,
  ao: wa,
  utc: Ma,
  honolulu: Sa,
  juneau: Aa,
  los_angeles: Ta,
  chicago: Ia,
  toronto: Pa,
  sao_paulo: Da,
  london: Oa,
  berlin: Ea,
  bahrain: Fa,
  dubai: Ba,
  ashkhabad: Na,
  almaty: Ka,
  bangkok: ja,
  shanghai: Za,
  tokyo: Ra,
  sydney: Qa,
  norfolk: Ua,
  horizontal_straight_line: za,
  horizontal_ray_line: Ya,
  horizontal_segment: Va,
  vertical_straight_line: Ha,
  vertical_ray_line: Ga,
  vertical_segment: Wa,
  straight_line: Xa,
  ray_line: qa,
  segment: Ja,
  arrow: ei,
  price_line: ti,
  price_channel_line: ni,
  parallel_straight_line: ri,
  fibonacci_line: ai,
  fibonacci_segment: ii,
  fibonacci_circle: si,
  fibonacci_spiral: oi,
  fibonacci_speed_resistance_fan: li,
  fibonacci_extension: ci,
  gann_box: ui,
  rect: Ci,
  parallelogram: fi,
  circle: yi,
  triangle: pi,
  three_waves: gi,
  five_waves: mi,
  eight_waves: hi,
  any_waves: di,
  abcd: vi,
  xabcd: _i,
  weak_magnet: Li,
  strong_magnet: $i,
  symbol_search: bi,
  symbol_code: xi,
  params_1: ki,
  params_2: wi,
  params_3: Mi,
  params_4: Si,
  params_5: Ai,
  period: Ti,
  standard_deviation: Ii,
  candle_type: Pi,
  candle_solid: Di,
  candle_stroke: Oi,
  candle_up_stroke: Ei,
  candle_down_stroke: Fi,
  ohlc: Bi,
  area: Ni,
  last_price_show: Ki,
  high_price_show: ji,
  low_price_show: Zi,
  indicator_last_value_show: Ri,
  price_axis_type: Qi,
  normal: Ui,
  percentage: zi,
  log: Yi,
  reverse_coordinate: Vi,
  grid_show: Hi,
  restore_default: Gi
}, Xi = "Indicator", qi = "Main Indicator", Ji = "Sub Indicator", es = "Setting", ts = "Timezone", ns = "Screenshot", rs = "Full Screen", as = "Exit", is = "Save", ss = "Confirm", os = "Cancel", ls = "MA(Moving Average)", cs = "EMA(Exponential Moving Average)", us = "SMA", Cs = "BOLL(Bolinger Bands)", fs = "BBI(Bull And Bearlndex)", ys = "SAR(Stop and Reverse)", ps = "VOL(Volume)", gs = "MACD(Moving Average Convergence / Divergence)", ms = "KDJ(KDJ Index)", hs = "RSI(Relative Strength Index)", ds = "BIAS(Bias Ratio)", vs = "BRAR(情绪指标)", _s = "CCI(Commodity Channel Index)", Ls = "DMI(Directional Movement Index)", $s = "CR(能量指标)", bs = "PSY(Psychological Line)", xs = "DMA(Different of Moving Average)", ks = "TRIX(Triple Exponentially Smoothed Moving Average)", ws = "OBV(On Balance Volume)", Ms = "VR(Volatility Volume Ratio)", Ss = "WR(Williams %R)", As = "MTM(Momentum Index)", Ts = "EMV(Ease of Movement Value)", Is = "ROC(Price Rate of Change)", Ps = "PVT(Price and Volume Trend)", Ds = "AO(Awesome Oscillator)", Os = "UTC", Es = "(UTC-10) Honolulu", Fs = "(UTC-8) Juneau", Bs = "(UTC-7) Los Angeles", Ns = "(UTC-5) Chicago", Ks = "(UTC-4) Toronto", js = "(UTC-3) Sao Paulo", Zs = "(UTC+1) London", Rs = "(UTC+2) Berlin", Qs = "(UTC+3) Bahrain", Us = "(UTC+4) Dubai", zs = "(UTC+5) Ashkhabad", Ys = "(UTC+6) Almaty", Vs = "(UTC+7) Bangkok", Hs = "(UTC+8) Shanghai", Gs = "(UTC+9) Tokyo", Ws = "(UTC+10) Sydney", Xs = "(UTC+12) Norfolk", qs = "Horizontal Line", Js = "Horizontal Ray", eo = "Horizontal Segment", to = "Vertical Line", no = "Vertical Ray", ro = "Vertical Segment", ao = "Trend Line", io = "Ray", so = "Segment", oo = "Arrow", lo = "Price Line", co = "Price Channel Line", uo = "Parallel Line", Co = "Fibonacci Line", fo = "Fibonacci Segment", yo = "Fibonacci Circle", po = "Fibonacci Spiral", go = "Fibonacci Sector", mo = "Fibonacci Extension", ho = "Gann Box", vo = "Rect", _o = "Parallelogram", Lo = "Circle", $o = "Triangle", bo = "Three Waves", xo = "Five Waves", ko = "Eight Waves", wo = "Any Waves", Mo = "ABCD Pattern", So = "XABCD Pattern", Ao = "Weak Magnet", To = "Strong Magnet", Io = "Symbol Search", Po = "Symbol Code", Do = "Parameter 1", Oo = "Parameter 2", Eo = "Parameter 3", Fo = "Parameter 4", Bo = "Parameter 5", No = "Period", Ko = "Standard Deviation", jo = "Candle Type", Zo = "Candle Solid", Ro = "Candle Stroke", Qo = "Candle Up Stroke", Uo = "Candle Down Stroke", zo = "OHLC", Yo = "Area", Vo = "Show Last Price", Ho = "Show Highest Price", Go = "Show Lowest Price", Wo = "Show indicator's last value", Xo = "Price Axis Type", qo = "Normal", Jo = "Percentage", el = "Log", tl = "Reverse Coordinate", nl = "Show Grids", rl = "Restore Defaults", al = {
  indicator: Xi,
  main_indicator: qi,
  sub_indicator: Ji,
  setting: es,
  timezone: ts,
  screenshot: ns,
  full_screen: rs,
  exit_full_screen: as,
  save: is,
  confirm: ss,
  cancel: os,
  ma: ls,
  ema: cs,
  sma: us,
  boll: Cs,
  bbi: fs,
  sar: ys,
  vol: ps,
  macd: gs,
  kdj: ms,
  rsi: hs,
  bias: ds,
  brar: vs,
  cci: _s,
  dmi: Ls,
  cr: $s,
  psy: bs,
  dma: xs,
  trix: ks,
  obv: ws,
  vr: Ms,
  wr: Ss,
  mtm: As,
  emv: Ts,
  roc: Is,
  pvt: Ps,
  ao: Ds,
  utc: Os,
  honolulu: Es,
  juneau: Fs,
  los_angeles: Bs,
  chicago: Ns,
  toronto: Ks,
  sao_paulo: js,
  london: Zs,
  berlin: Rs,
  bahrain: Qs,
  dubai: Us,
  ashkhabad: zs,
  almaty: Ys,
  bangkok: Vs,
  shanghai: Hs,
  tokyo: Gs,
  sydney: Ws,
  norfolk: Xs,
  horizontal_straight_line: qs,
  horizontal_ray_line: Js,
  horizontal_segment: eo,
  vertical_straight_line: to,
  vertical_ray_line: no,
  vertical_segment: ro,
  straight_line: ao,
  ray_line: io,
  segment: so,
  arrow: oo,
  price_line: lo,
  price_channel_line: co,
  parallel_straight_line: uo,
  fibonacci_line: Co,
  fibonacci_segment: fo,
  fibonacci_circle: yo,
  fibonacci_spiral: po,
  fibonacci_speed_resistance_fan: go,
  fibonacci_extension: mo,
  gann_box: ho,
  rect: vo,
  parallelogram: _o,
  circle: Lo,
  triangle: $o,
  three_waves: bo,
  five_waves: xo,
  eight_waves: ko,
  any_waves: wo,
  abcd: Mo,
  xabcd: So,
  weak_magnet: Ao,
  strong_magnet: To,
  symbol_search: Io,
  symbol_code: Po,
  params_1: Do,
  params_2: Oo,
  params_3: Eo,
  params_4: Fo,
  params_5: Bo,
  period: No,
  standard_deviation: Ko,
  candle_type: jo,
  candle_solid: Zo,
  candle_stroke: Ro,
  candle_up_stroke: Qo,
  candle_down_stroke: Uo,
  ohlc: zo,
  area: Yo,
  last_price_show: Vo,
  high_price_show: Ho,
  low_price_show: Go,
  indicator_last_value_show: Wo,
  price_axis_type: Xo,
  normal: qo,
  percentage: Jo,
  log: el,
  reverse_coordinate: tl,
  grid_show: nl,
  restore_default: rl
}, n5 = {
  "zh-CN": Wi,
  "en-US": al
};
function iu(e, t) {
  n5[e] = t;
}
const g = (e, t) => {
  var n;
  return ((n = n5[t]) == null ? void 0 : n[e]) ?? e;
};
var il = /* @__PURE__ */ y("<img alt=symbol>"), sl = /* @__PURE__ */ y("<div class=symbol><span>"), ol = /* @__PURE__ */ y('<div class=klinecharts-pro-period-bar><div class=menu-container><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div class="item tools"><svg viewBox="0 0 20 20"><path d=M15.873,20L3.65079,20C1.5873,20,0,18.3871,0,16.2903L0,3.70968C-3.78442e-7,1.6129,1.5873,0,3.65079,0L15.873,0C17.9365,0,19.5238,1.6129,19.5238,3.70968C19.5238,4.35484,19.2063,4.51613,18.5714,4.51613C17.9365,4.51613,17.619,4.19355,17.619,3.70968C17.619,2.74194,16.8254,1.93548,15.873,1.93548L3.65079,1.93548C2.69841,1.93548,1.90476,2.74194,1.90476,3.70968L1.90476,16.2903C1.90476,17.2581,2.69841,18.0645,3.65079,18.0645L15.873,18.0645C16.8254,18.0645,17.619,17.2581,17.619,16.2903C17.619,15.8065,18.0952,15.3226,18.5714,15.3226C19.0476,15.3226,19.5238,15.8065,19.5238,16.2903C19.5238,18.2258,17.9365,20,15.873,20ZM14.9206,12.9032C14.7619,12.9032,14.4444,12.9032,14.2857,12.7419L11.2698,9.35484C10.9524,9.03226,10.9524,8.54839,11.2698,8.22581C11.5873,7.90323,12.0635,7.90323,12.381,8.22581L15.3968,11.6129C15.7143,11.9355,15.7143,12.4194,15.3968,12.7419C15.3968,12.9032,15.2381,12.9032,14.9206,12.9032ZM11.4286,13.2258C11.2698,13.2258,11.1111,13.2258,10.9524,13.0645C10.6349,12.7419,10.6349,12.4194,10.9524,12.0968L15.0794,7.74193C15.3968,7.41935,15.7143,7.41935,16.0317,7.74193C16.3492,8.06452,16.3492,8.3871,16.0317,8.70968L11.9048,13.0645C11.746,13.2258,11.5873,13.2258,11.4286,13.2258ZM10.3175,3.70968C10.6349,3.70968,11.4286,3.87097,11.4286,4.67742C11.4286,5.32258,10.4762,5.16129,10.1587,5.16129C8.73016,5.16129,8.25397,5.96774,8.09524,6.6129L7.77778,8.54839L9.36508,8.54839C9.68254,8.54839,10,8.87097,10,9.19355C10,9.51613,9.68254,9.83871,9.36508,9.83871L7.61905,9.83871L6.50794,14.8387Q6.34921,16.2903,5.39683,16.2903Q4.44444,16.2903,4.92064,14.8387L6.03175,10L4.60317,10C4.28571,10,3.96825,9.67742,3.96825,9.35484C3.96825,8.70968,4.28571,8.54839,4.60317,8.54839L6.34921,8.54839L6.8254,6.45161C7.14286,3.70968,9.52381,3.54839,10.3175,3.70968ZM18.4127,6.6129C18.5714,6.12903,18.8889,5.96774,19.3651,5.96774C19.8413,6.12903,20,6.45161,20,6.93548L18.4127,13.3871C18.254,13.871,17.9365,14.0323,17.4603,14.0323C16.9841,13.871,16.8254,13.5484,16.8254,13.0645L18.4127,6.6129Z></path></svg><span></span></div><div class="item tools"><svg viewBox="0 0 20 20"><path d=M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z></path></svg><span></span></div><div class="item tools"><svg viewBox="0 0 20 20"><path d=M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z></path></svg><span></span></div><div class="item tools">'), l0 = /* @__PURE__ */ y("<span>"), ll = /* @__PURE__ */ y('<svg viewBox="0 0 20 20"><path d=M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z>'), cl = /* @__PURE__ */ y('<svg viewBox="0 0 20 20"><path d=M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z>');
const ul = (e) => {
  let t;
  const [n, r] = x(!1), a = () => {
    r((s) => !s);
  };
  return $9(() => {
    document.addEventListener("fullscreenchange", a), document.addEventListener("mozfullscreenchange", a), document.addEventListener("webkitfullscreenchange", a), document.addEventListener("msfullscreenchange", a);
  }), v0(() => {
    document.removeEventListener("fullscreenchange", a), document.removeEventListener("mozfullscreenchange", a), document.removeEventListener("webkitfullscreenchange", a), document.removeEventListener("msfullscreenchange", a);
  }), (() => {
    var s = ol(), o = s.firstChild, i = o.firstChild, l = o.nextSibling, C = l.firstChild, f = C.nextSibling, c = l.nextSibling, _ = c.firstChild, L = _.nextSibling, A = c.nextSibling, O = A.firstChild, E = O.nextSibling, T = A.nextSibling;
    return L0((b) => {
      t = b;
    }, s), u1(i, "click", e.onMenuClick, !0), d(s, v(Z, {
      get when() {
        return e.symbol;
      },
      get children() {
        var b = sl(), $ = b.firstChild;
        return d(b, v(Z, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            var M = il();
            return F(() => z(M, "src", e.symbol.logo)), M;
          }
        }), $), d($, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), b;
      }
    }), l), d(s, () => e.periods.map((b) => (() => {
      var $ = l0();
      return $.$$click = () => {
        e.onPeriodChange(b);
      }, d($, () => b.text), F(() => a1($, `item period ${b.text === e.period.text ? "selected" : ""}`)), $;
    })()), l), u1(l, "click", e.onIndicatorClick, !0), d(f, () => g("indicator", e.locale)), u1(c, "click", e.onSettingClick, !0), d(L, () => g("setting", e.locale)), u1(A, "click", e.onScreenshotClick, !0), d(E, () => g("screenshot", e.locale)), T.$$click = () => {
      if (n())
        (document.exitFullscreen ?? document.msExitFullscreen ?? document.mozCancelFullScreen ?? document.webkitExitFullscreen).call(document);
      else {
        const b = t == null ? void 0 : t.parentElement;
        b && (b.requestFullscreen ?? b.webkitRequestFullscreen ?? b.mozRequestFullScreen ?? b.msRequestFullscreen).call(b);
      }
    }, d(T, (() => {
      var b = K(() => !!n());
      return () => b() ? [ll(), (() => {
        var $ = l0();
        return d($, () => g("exit_full_screen", e.locale)), $;
      })()] : [cl(), (() => {
        var $ = l0();
        return d($, () => g("full_screen", e.locale)), $;
      })()];
    })()), F(() => z(i, "class", e.spread ? "" : "rotate")), s;
  })();
};
X(["click"]);
var Cl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z stroke-opacity=0 stroke=none>');
const fl = () => Cl();
var yl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z stroke-opacity=0 stroke=none>');
const pl = () => yl();
var gl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z stroke-opacity=0 stroke=none>');
const ml = () => gl();
var hl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z stroke-opacity=0 stroke=none>');
const dl = () => hl();
var vl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z stroke-opacity=0 stroke=none>');
const _l = () => vl();
var Ll = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z stroke-opacity=0 fill-rule=evenodd fill-opacity=1>');
const $l = () => Ll();
var bl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z stroke-opacity=0 stroke=none>');
const xl = () => bl();
var kl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z stroke-opacity=0 stroke=none>');
const wl = () => kl();
var Ml = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z stroke-opacity=0 stroke=none>');
const Sl = () => Ml();
var Al = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z stroke-opacity=0 stroke=none>');
const Tl = () => Al();
var Il = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z stroke-opacity=0 stroke=none>');
const Pl = () => Il();
var Dl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z stroke-opacity=0 stroke=none>');
const Ol = () => Dl();
var El = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z stroke-opacity=0 stroke=none>');
const Fl = () => El();
var Bl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z stroke-opacity=0 stroke=none>');
const Nl = () => Bl();
var Kl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z stroke-opacity=0 stroke=none>');
const jl = () => Kl();
var Zl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><ellipse cx=10.5 cy=11.5 rx=1.5 ry=1.5 stroke-opacity=0 stroke=none></ellipse><ellipse cx=17.5 cy=11.5 rx=1.5 ry=1.5 stroke-opacity=0 stroke=none></ellipse><ellipse cx=10.5 cy=11.5 rx=7 ry=7 fill-opacity=0 stroke-opacity=1 fill=none stroke-width=1></ellipse><ellipse cx=10.5 cy=11.5 rx=5 ry=5 fill-opacity=0 stroke-opacity=1 fill=none stroke-width=1></ellipse><ellipse cx=10.5 cy=11.5 rx=3 ry=3 fill-opacity=0 stroke-opacity=1 fill=none stroke-width=1>');
const Rl = () => Zl();
var Ql = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z stroke-opacity=0 stroke=none>');
const Ul = () => Ql();
var zl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z stroke-opacity=0 fill-rule=evenodd fill-opacity=1>');
const Yl = () => zl();
var Vl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z stroke-opacity=0 stroke=none>');
const Hl = () => Vl();
var Gl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z stroke-opacity=0 fill-rule=evenodd fill-opacity=1>');
const Wl = () => Gl();
var Xl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><ellipse cx=10.5 cy=11.5 rx=1.5 ry=1.5 stroke-opacity=0 stroke=none></ellipse><ellipse cx=17.5 cy=11.5 rx=1.5 ry=1.5 stroke-opacity=0 stroke=none></ellipse><ellipse cx=10.5 cy=11.5 rx=7 ry=7 fill-opacity=0 fill=none stroke-opacity=1 stroke-width=1>');
const ql = () => Xl();
var Jl = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z stroke-opacity=0 fill-rule=evenodd fill-opacity=1>');
const ec = () => Jl();
var tc = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z stroke-opacity=0 fill-rule=evenodd fill-opacity=1>');
const nc = () => tc();
var rc = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z stroke-opacity=0 fill-rule=evenodd fill-opacity=1>');
const ac = () => rc();
var ic = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z stroke-opacity=0 stroke=none>');
const sc = () => ic();
var oc = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z stroke-opacity=0 stroke=none>');
const lc = () => oc();
var cc = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z stroke-opacity=0 stroke=none>');
const uc = () => cc();
var Cc = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z stroke-opacity=0 stroke=none>');
const fc = () => Cc();
var yc = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z stroke-opacity=0 stroke=none>');
const pc = () => yc();
var gc = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z stroke-opacity=0 fill-rule=evenodd fill-opacity=1>');
const mc = () => gc();
var hc = /* @__PURE__ */ y('<svg viewBox="0 0 22 22"><path d=M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z stroke-opacity=0 fill-rule=evenodd fill-opacity=1>');
const dc = (e) => (() => {
  var t = hc();
  return z(t, "class", `icon-overlay ${e ?? ""}`), t;
})();
var vc = /* @__PURE__ */ y('<svg viewBox="0 0 22 22"><defs><clipPath id=master_svg0_151_615><rect x=0 y=0 width=22 height=22 rx=0></rect></clipPath></defs><g clip-path=url(#master_svg0_151_615)><path d=M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z stroke-opacity=0 fill-rule=evenodd fill-opacity=1>');
const _c = (e) => (() => {
  var t = vc();
  return z(t, "class", `icon-overlay ${e ?? ""}`), t;
})();
var Lc = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z stroke-opacity=0 fill-opacity=1>');
const $c = () => Lc();
var bc = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z stroke-opacity=0 fill-rule=evenodd fill-opacity=1>');
const xc = () => bc();
var kc = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><defs><clipPath id=master_svg0_151_625><rect x=0 y=0 width=22 height=22 rx=0></rect></clipPath></defs><g clip-path=url(#master_svg0_151_625)><path d=M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z stroke-opacity=0 fill-rule=evenodd fill-opacity=1>');
const wc = () => kc();
var Mc = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><defs><clipPath id=master_svg0_151_620><rect x=0 y=0 width=22 height=22 rx=0></rect></clipPath></defs><g clip-path=url(#master_svg0_151_620)><path d=M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z stroke-opacity=0 fill-rule=evenodd fill-opacity=1>');
const Sc = () => Mc();
var Ac = /* @__PURE__ */ y('<svg class=icon-overlay viewBox="0 0 22 22"><path d=M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z stroke-opacity=0 fill-opacity=1>');
const Tc = () => Ac(), Ic = {
  horizontalStraightLine: fl,
  horizontalRayLine: pl,
  horizontalSegment: ml,
  verticalStraightLine: dl,
  verticalRayLine: _l,
  verticalSegment: $l,
  straightLine: xl,
  rayLine: wl,
  segment: Sl,
  arrow: Tl,
  priceLine: Pl,
  priceChannelLine: Ol,
  parallelStraightLine: Fl,
  fibonacciLine: Nl,
  fibonacciSegment: jl,
  fibonacciCircle: Rl,
  fibonacciSpiral: Ul,
  fibonacciSpeedResistanceFan: Yl,
  fibonacciExtension: Hl,
  gannBox: Wl,
  circle: ql,
  triangle: ec,
  rect: nc,
  parallelogram: ac,
  threeWaves: sc,
  fiveWaves: lc,
  eightWaves: uc,
  anyWaves: fc,
  abcd: pc,
  xabcd: mc,
  weak_magnet: dc,
  strong_magnet: _c,
  lock: wc,
  unlock: Sc,
  visible: $c,
  invisible: xc,
  remove: Tc
};
function Pc(e) {
  return [
    { key: "horizontalStraightLine", text: g("horizontal_straight_line", e) },
    { key: "horizontalRayLine", text: g("horizontal_ray_line", e) },
    { key: "horizontalSegment", text: g("horizontal_segment", e) },
    { key: "verticalStraightLine", text: g("vertical_straight_line", e) },
    { key: "verticalRayLine", text: g("vertical_ray_line", e) },
    { key: "verticalSegment", text: g("vertical_segment", e) },
    { key: "straightLine", text: g("straight_line", e) },
    { key: "rayLine", text: g("ray_line", e) },
    { key: "segment", text: g("segment", e) },
    { key: "arrow", text: g("arrow", e) },
    { key: "priceLine", text: g("price_line", e) }
  ];
}
function Dc(e) {
  return [
    { key: "priceChannelLine", text: g("price_channel_line", e) },
    { key: "parallelStraightLine", text: g("parallel_straight_line", e) }
  ];
}
function Oc(e) {
  return [
    { key: "circle", text: g("circle", e) },
    { key: "rect", text: g("rect", e) },
    { key: "parallelogram", text: g("parallelogram", e) },
    { key: "triangle", text: g("triangle", e) }
  ];
}
function Ec(e) {
  return [
    { key: "fibonacciLine", text: g("fibonacci_line", e) },
    { key: "fibonacciSegment", text: g("fibonacci_segment", e) },
    { key: "fibonacciCircle", text: g("fibonacci_circle", e) },
    { key: "fibonacciSpiral", text: g("fibonacci_spiral", e) },
    { key: "fibonacciSpeedResistanceFan", text: g("fibonacci_speed_resistance_fan", e) },
    { key: "fibonacciExtension", text: g("fibonacci_extension", e) },
    { key: "gannBox", text: g("gann_box", e) }
  ];
}
function Fc(e) {
  return [
    { key: "xabcd", text: g("xabcd", e) },
    { key: "abcd", text: g("abcd", e) },
    { key: "threeWaves", text: g("three_waves", e) },
    { key: "fiveWaves", text: g("five_waves", e) },
    { key: "eightWaves", text: g("eight_waves", e) },
    { key: "anyWaves", text: g("any_waves", e) }
  ];
}
function Bc(e) {
  return [
    { key: "weak_magnet", text: g("weak_magnet", e) },
    { key: "strong_magnet", text: g("strong_magnet", e) }
  ];
}
const U = (e) => Ic[e.name](e.class);
var Nc = /* @__PURE__ */ y('<div class=klinecharts-pro-drawing-bar><span class=split-line></span><div class=item tabindex=0><span style=width:32px;height:32px></span><div class=icon-arrow><svg viewBox="0 0 4 6"><path d=M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z stroke=none stroke-opacity=0></path></svg></div></div><div class=item><span style=width:32px;height:32px></span></div><div class=item><span style=width:32px;height:32px></span></div><span class=split-line></span><div class=item><span style=width:32px;height:32px>'), Kc = /* @__PURE__ */ y('<div class=item tabindex=0><span style=width:32px;height:32px></span><div class=icon-arrow><svg viewBox="0 0 4 6"><path d=M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z stroke=none stroke-opacity=0>'), p9 = /* @__PURE__ */ y("<li><span style=padding-left:8px>");
const g9 = "drawing_tools", jc = (e) => {
  const [t, n] = x("horizontalStraightLine"), [r, a] = x("priceChannelLine"), [s, o] = x("circle"), [i, l] = x("fibonacciLine"), [C, f] = x("xabcd"), [c, _] = x("weak_magnet"), [L, A] = x("normal"), [O, E] = x(!1), [T, b] = x(!0), [$, M] = x(""), Y = J(() => [{
    key: "singleLine",
    icon: t(),
    list: Pc(e.locale),
    setter: n
  }, {
    key: "moreLine",
    icon: r(),
    list: Dc(e.locale),
    setter: a
  }, {
    key: "polygon",
    icon: s(),
    list: Oc(e.locale),
    setter: o
  }, {
    key: "fibonacci",
    icon: i(),
    list: Ec(e.locale),
    setter: l
  }, {
    key: "wave",
    icon: C(),
    list: Fc(e.locale),
    setter: f
  }]), s1 = J(() => Bc(e.locale));
  return (() => {
    var L1 = Nc(), I1 = L1.firstChild, t1 = I1.nextSibling, o1 = t1.firstChild, n1 = o1.nextSibling, r0 = n1.firstChild, P1 = t1.nextSibling, $1 = P1.firstChild, l1 = P1.nextSibling, b1 = l1.firstChild, D1 = l1.nextSibling, x1 = D1.nextSibling, p = x1.firstChild;
    return d(L1, () => Y().map((u) => (() => {
      var m = Kc(), h = m.firstChild, k = h.nextSibling, Q = k.firstChild;
      return m.addEventListener("blur", () => {
        M("");
      }), h.$$click = () => {
        e.onDrawingItemClick({
          groupId: g9,
          name: u.icon,
          visible: T(),
          lock: O(),
          mode: L()
        });
      }, d(h, v(U, {
        get name() {
          return u.icon;
        }
      })), k.$$click = () => {
        u.key === $() ? M("") : M(u.key);
      }, d(m, (() => {
        var B = K(() => u.key === $());
        return () => B() && v(d0, {
          class: "list",
          get children() {
            return u.list.map((j) => (() => {
              var P = p9(), a0 = P.firstChild;
              return P.$$click = () => {
                u.setter(j.key), e.onDrawingItemClick({
                  name: j.key,
                  lock: O(),
                  mode: L()
                }), M("");
              }, d(P, v(U, {
                get name() {
                  return j.key;
                }
              }), a0), d(a0, () => j.text), P;
            })());
          }
        });
      })(), null), F(() => z(Q, "class", u.key === $() ? "rotate" : "")), m;
    })()), I1), t1.addEventListener("blur", () => {
      M("");
    }), o1.$$click = () => {
      let u = c();
      L() !== "normal" && (u = "normal"), A(u), e.onModeChange(u);
    }, d(o1, (() => {
      var u = K(() => c() === "weak_magnet");
      return () => u() ? K(() => L() === "weak_magnet")() ? v(U, {
        name: "weak_magnet",
        class: "selected"
      }) : v(U, {
        name: "weak_magnet"
      }) : K(() => L() === "strong_magnet")() ? v(U, {
        name: "strong_magnet",
        class: "selected"
      }) : v(U, {
        name: "strong_magnet"
      });
    })()), n1.$$click = () => {
      $() === "mode" ? M("") : M("mode");
    }, d(t1, (() => {
      var u = K(() => $() === "mode");
      return () => u() && v(d0, {
        class: "list",
        get children() {
          return s1().map((m) => (() => {
            var h = p9(), k = h.firstChild;
            return h.$$click = () => {
              _(m.key), A(m.key), e.onModeChange(m.key), M("");
            }, d(h, v(U, {
              get name() {
                return m.key;
              }
            }), k), d(k, () => m.text), h;
          })());
        }
      });
    })(), null), $1.$$click = () => {
      const u = !O();
      E(u), e.onLockChange(u);
    }, d($1, (() => {
      var u = K(() => !!O());
      return () => u() ? v(U, {
        name: "lock"
      }) : v(U, {
        name: "unlock"
      });
    })()), b1.$$click = () => {
      const u = !T();
      b(u), e.onVisibleChange(u);
    }, d(b1, (() => {
      var u = K(() => !!T());
      return () => u() ? v(U, {
        name: "visible"
      }) : v(U, {
        name: "invisible"
      });
    })()), p.$$click = () => {
      e.onRemoveClick(g9);
    }, d(p, v(U, {
      name: "remove"
    })), F(() => z(r0, "class", $() === "mode" ? "rotate" : "")), L1;
  })();
};
X(["click"]);
var m9 = /* @__PURE__ */ y("<li class=title>"), h9 = /* @__PURE__ */ y("<li class=row>");
const Zc = (e) => v(n0, {
  get title() {
    return g("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return v(d0, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          var t = m9();
          return d(t, () => g("main_indicator", e.locale)), t;
        })(), K(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const n = e.mainIndicators.includes(t);
          return (() => {
            var r = h9();
            return r.$$click = (a) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !n
              });
            }, d(r, v(y9, {
              checked: n,
              get label() {
                return g(t.toLowerCase(), e.locale);
              }
            })), r;
          })();
        })), (() => {
          var t = m9();
          return d(t, () => g("sub_indicator", e.locale)), t;
        })(), K(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const n = t in e.subIndicators;
          return (() => {
            var r = h9();
            return r.$$click = (a) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !n
              });
            }, d(r, v(y9, {
              checked: n,
              get label() {
                return g(t.toLowerCase(), e.locale);
              }
            })), r;
          })();
        }))];
      }
    });
  }
});
X(["click"]);
function d9(e) {
  return [
    {
      key: "candle.type",
      text: g("candle_type", e),
      component: "select",
      dataSource: [
        { key: "candle_solid", text: g("candle_solid", e) },
        { key: "candle_stroke", text: g("candle_stroke", e) },
        { key: "candle_up_stroke", text: g("candle_up_stroke", e) },
        { key: "candle_down_stroke", text: g("candle_down_stroke", e) },
        { key: "ohlc", text: g("ohlc", e) },
        { key: "area", text: g("area", e) }
      ]
    },
    {
      key: "candle.priceMark.last.show",
      text: g("last_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.high.show",
      text: g("high_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.low.show",
      text: g("low_price_show", e),
      component: "switch"
    },
    {
      key: "indicator.lastValueMark.show",
      text: g("indicator_last_value_show", e),
      component: "switch"
    },
    {
      key: "yAxis.type",
      text: g("price_axis_type", e),
      component: "select",
      dataSource: [
        { key: "normal", text: g("normal", e) },
        { key: "percentage", text: g("percentage", e) },
        { key: "log", text: g("log", e) }
      ]
    },
    {
      key: "yAxis.reverse",
      text: g("reverse_coordinate", e),
      component: "switch"
    },
    {
      key: "grid.show",
      text: g("grid_show", e),
      component: "switch"
    }
  ];
}
var Rc = /* @__PURE__ */ y("<div class=klinecharts-pro-setting-modal-content>"), Qc = /* @__PURE__ */ y("<span>");
const Uc = (e) => {
  const [t, n] = x(e.currentStyles), [r, a] = x(d9(e.locale));
  q(() => {
    a(d9(e.locale));
  });
  const s = (o, i) => {
    const l = {};
    f0(l, o.key, i);
    const C = R.clone(t());
    f0(C, o.key, i), n(C), a(r().map((f) => ({
      ...f
    }))), e.onChange(l);
  };
  return v(n0, {
    get title() {
      return g("setting", e.locale);
    },
    width: 560,
    get buttons() {
      return [{
        children: g("restore_default", e.locale),
        onClick: () => {
          e.onRestoreDefault(r()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      var o = Rc();
      return d(o, v(R5, {
        get each() {
          return r();
        },
        children: (i) => {
          let l;
          const C = R.formatValue(t(), i.key);
          switch (i.component) {
            case "select": {
              l = v(Br, {
                style: {
                  width: "120px"
                },
                get value() {
                  return g(C, e.locale);
                },
                get dataSource() {
                  return i.dataSource;
                },
                onSelected: (f) => {
                  const c = f.key;
                  s(i, c);
                }
              });
              break;
            }
            case "switch": {
              const f = !!C;
              l = v(Qr, {
                open: f,
                onChange: () => {
                  s(i, !f);
                }
              });
              break;
            }
          }
          return [(() => {
            var f = Qc();
            return d(f, () => i.text), f;
          })(), l];
        }
      })), o;
    }
  });
};
var zc = /* @__PURE__ */ y("<img style=width:500px;margin-top:20px>");
const Yc = (e) => v(n0, {
  get title() {
    return g("screenshot", e.locale);
  },
  width: 540,
  get buttons() {
    return [{
      type: "confirm",
      children: g("save", e.locale),
      onClick: () => {
        const t = document.createElement("a");
        t.download = "screenshot", t.href = e.url, document.body.appendChild(t), t.click(), t.remove();
      }
    }];
  },
  get onClose() {
    return e.onClose;
  },
  get children() {
    var t = zc();
    return F(() => z(t, "src", e.url)), t;
  }
}), Vc = {
  AO: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 5 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 34 }
  ],
  BIAS: [
    { paramNameKey: "BIAS1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "BIAS2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "BIAS3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "BIAS4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "BIAS5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ],
  BOLL: [
    { paramNameKey: "period", precision: 0, min: 1, default: 20 },
    { paramNameKey: "standard_deviation", precision: 2, min: 1, default: 2 }
  ],
  BRAR: [
    { paramNameKey: "period", precision: 0, min: 1, default: 26 }
  ],
  BBI: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 3 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 },
    { paramNameKey: "params_3", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_4", precision: 0, min: 1, default: 24 }
  ],
  CCI: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 20 }
  ],
  CR: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 26 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 10 },
    { paramNameKey: "params_3", precision: 0, min: 1, default: 20 },
    { paramNameKey: "params_4", precision: 0, min: 1, default: 40 },
    { paramNameKey: "params_5", precision: 0, min: 1, default: 60 }
  ],
  DMA: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 10 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 50 },
    { paramNameKey: "params_3", precision: 0, min: 1, default: 10 }
  ],
  DMI: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 14 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 }
  ],
  EMV: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 14 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 9 }
  ],
  EMA: [
    { paramNameKey: "EMA1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "EMA2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "EMA3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "EMA4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "EMA5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ],
  MTM: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 }
  ],
  MA: [
    { paramNameKey: "MA1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "MA2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "MA3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "MA4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "MA5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ],
  MACD: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 26 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 9 }
  ],
  OBV: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 30 }
  ],
  PVT: [],
  PSY: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 }
  ],
  ROC: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 }
  ],
  RSI: [
    { paramNameKey: "RSI1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "RSI2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "RSI3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "RSI4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "RSI5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ],
  SMA: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 2 }
  ],
  KDJ: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 9 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 3 },
    { paramNameKey: "params_3", precision: 0, min: 1, default: 3 }
  ],
  SAR: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 2 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 2 },
    { paramNameKey: "params_3", precision: 0, min: 1, default: 20 }
  ],
  TRIX: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 9 }
  ],
  VOL: [
    { paramNameKey: "MA1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "MA2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "MA3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "MA4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "MA5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ],
  VR: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 26 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 }
  ],
  WR: [
    { paramNameKey: "WR1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "WR2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "WR3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "WR4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "WR5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ]
};
var Hc = /* @__PURE__ */ y("<div class=klinecharts-pro-indicator-setting-modal-content>"), Gc = /* @__PURE__ */ y("<span>");
const Wc = (e) => {
  const [t, n] = x(R.clone(e.params.calcParams)), r = (a) => Vc[a];
  return v(n0, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: g("confirm", e.locale),
        onClick: () => {
          const a = r(e.params.indicatorName), s = [];
          R.clone(t()).forEach((o, i) => {
            !R.isValid(o) || o === "" ? "default" in a[i] && s.push(a[i].default) : s.push(o);
          }), e.onConfirm(s), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      var a = Hc();
      return d(a, () => r(e.params.indicatorName).map((s, o) => [(() => {
        var i = Gc();
        return d(i, () => g(s.paramNameKey, e.locale)), i;
      })(), v(Zr, {
        style: {
          width: "200px"
        },
        get value() {
          return t()[o] ?? "";
        },
        get precision() {
          return s.precision;
        },
        get min() {
          return s.min;
        },
        onChange: (i) => {
          const l = R.clone(t());
          l[o] = i, n(l);
        }
      })])), a;
    }
  });
};
var Xc = /* @__PURE__ */ y('<i class="icon-close klinecharts-pro-load-icon">'), qc = /* @__PURE__ */ y("<div class=klinecharts-pro-content><div class=klinecharts-pro-widget>");
function N1(e, t, n, r) {
  return t === "VOL" && (r = {
    gap: {
      bottom: 2
    },
    ...r
  }), (e == null ? void 0 : e.createIndicator({
    name: t,
    // @ts-expect-error
    createTooltipDataSource: ({
      indicator: a,
      defaultStyles: s
    }) => {
      const o = [];
      return a.visible ? (o.push(s.tooltip.icons[1]), o.push(s.tooltip.icons[2]), o.push(s.tooltip.icons[3])) : (o.push(s.tooltip.icons[0]), o.push(s.tooltip.icons[2]), o.push(s.tooltip.icons[3])), {
        icons: o
      };
    }
  }, n, r)) ?? null;
}
const Jc = (e) => {
  let t, n = null, r, a = !1;
  const [s, o] = x(e.theme), [i, l] = x(e.styles), [C, f] = x(e.locale), [c, _] = x(e.symbol), [L, A] = x(e.period), [O, E] = x(!1), [T, b] = x([...e.mainIndicators]), [$, M] = x({}), [Y, s1] = x(!1), [L1, I1] = x(), [t1, o1] = x(""), [n1, r0] = x(e.drawingBarVisible), [P1, $1] = x(!1), [l1, b1] = x({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  e.ref({
    setTheme: o,
    getTheme: () => s(),
    setStyles: l,
    getStyles: () => n.getStyles(),
    setLocale: f,
    getLocale: () => C(),
    setSymbol: _,
    getSymbol: () => c(),
    setPeriod: A,
    getPeriod: () => L(),
    resize: () => n == null ? void 0 : n.resize()
  });
  const D1 = () => {
    n == null || n.resize();
  }, x1 = (p, u, m) => {
    let h = u, k = h;
    switch (p.timespan) {
      case "minute": {
        h = h - h % (60 * 1e3), k = h - m * p.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        h = h - h % (60 * 60 * 1e3), k = h - m * p.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        h = h - h % (60 * 60 * 1e3), k = h - m * p.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const B = new Date(h).getDay(), j = B === 0 ? 6 : B - 1;
        h = h - j * 60 * 60 * 24;
        const P = new Date(h);
        h = (/* @__PURE__ */ new Date(`${P.getFullYear()}-${P.getMonth() + 1}-${P.getDate()}`)).getTime(), k = m * p.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const Q = new Date(h), B = Q.getFullYear(), j = Q.getMonth() + 1;
        h = (/* @__PURE__ */ new Date(`${B}-${j}-01`)).getTime(), k = m * p.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const P = new Date(k);
        k = (/* @__PURE__ */ new Date(`${P.getFullYear()}-${P.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const B = new Date(h).getFullYear();
        h = (/* @__PURE__ */ new Date(`${B}-01-01`)).getTime(), k = m * p.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const j = new Date(k);
        k = (/* @__PURE__ */ new Date(`${j.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [k, h];
  };
  return $9(() => {
    if (window.addEventListener("resize", D1), n = i5(t, {
      customApi: {
        formatDate: (u, m, h, k) => {
          const Q = Intl.DateTimeFormat().resolvedOptions().locale, B = new Intl.DateTimeFormat("en", {
            hour: "numeric"
          }).resolvedOptions().hourCycle, j = new Intl.DateTimeFormat("en", {
            hour: "numeric"
          }).resolvedOptions().hour12, P = new Intl.DateTimeFormat(Q, {
            ...u.resolvedOptions(),
            hour12: j,
            hourCycle: B
          });
          switch (L().timespan) {
            case "minute":
              return k === O1.XAxis ? V(P, m, "HH:mmAP") : V(P, m, "YYYY-MM-DD HH:mmAP");
            case "hour":
              return k === O1.XAxis ? V(P, m, "MM-DD HH:mmAP") : V(P, m, "YYYY-MM-DD HH:mmAP");
            case "day":
            case "week":
              return V(P, m, "YYYY-MM-DD");
            case "month":
              return k === O1.XAxis ? V(P, m, "YYYY-MM") : V(P, m, "YYYY-MM-DD");
            case "year":
              return k === O1.XAxis ? V(P, m, "YYYY") : V(P, m, "YYYY-MM-DD");
          }
          return V(P, m, "YYYY-MM-DD HH:mmAP");
        }
      }
    }), n) {
      const u = n.getDom("candle_pane", O0.Main);
      if (u) {
        let h = document.createElement("div");
        if (h.className = "klinecharts-pro-watermark", R.isString(e.watermark)) {
          const k = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          h.innerHTML = k;
        } else
          h.appendChild(e.watermark);
        u.appendChild(h);
      }
      const m = n.getDom("candle_pane", O0.YAxis);
      r = document.createElement("span"), r.className = "klinecharts-pro-price-unit", m == null || m.appendChild(r);
    }
    T().forEach((u) => {
      N1(n, u, !0, {
        id: "candle_pane"
      });
    });
    const p = {};
    e.subIndicators.forEach((u) => {
      const m = N1(n, u, !0);
      m && (p[u] = m);
    }), M(p), n == null || n.loadMore((u) => {
      a = !0, (async () => {
        const h = L(), [k] = x1(h, u, 1), [Q] = x1(h, k, 500), B = await e.datafeed.getHistoryKLineData(c(), h, Q, k);
        n == null || n.applyMoreData(B, B.length > 0), a = !1;
      })();
    }), n == null || n.subscribeAction(s5.OnTooltipIconClick, (u) => {
      if (u.indicatorName)
        switch (u.iconId) {
          case "visible": {
            n == null || n.overrideIndicator({
              name: u.indicatorName,
              visible: !0
            }, u.paneId);
            break;
          }
          case "invisible": {
            n == null || n.overrideIndicator({
              name: u.indicatorName,
              visible: !1
            }, u.paneId);
            break;
          }
          case "setting": {
            const m = n == null ? void 0 : n.getIndicatorByPaneId(u.paneId, u.indicatorName);
            b1({
              visible: !0,
              indicatorName: u.indicatorName,
              paneId: u.paneId,
              calcParams: m.calcParams
            });
            break;
          }
          case "close":
            if (u.paneId === "candle_pane") {
              const m = [...T()];
              n == null || n.removeIndicator("candle_pane", u.indicatorName), m.splice(m.indexOf(u.indicatorName), 1), b(m);
            } else {
              const m = {
                ...$()
              };
              n == null || n.removeIndicator(u.paneId, u.indicatorName), delete m[u.indicatorName], M(m);
            }
        }
    });
  }), v0(() => {
    window.removeEventListener("resize", D1), o5(t);
  }), q(() => {
    const p = c();
    p != null && p.priceCurrency ? (r.innerHTML = p == null ? void 0 : p.priceCurrency.toLocaleUpperCase(), r.style.display = "flex") : r.style.display = "none", n == null || n.setPriceVolumePrecision((p == null ? void 0 : p.pricePrecision) ?? 2, (p == null ? void 0 : p.volumePrecision) ?? 0);
  }), q((p) => {
    if (!a) {
      p && e.datafeed.unsubscribe(p.symbol, p.period);
      const u = c(), m = L();
      return a = !0, $1(!0), (async () => {
        const [k, Q] = x1(m, (/* @__PURE__ */ new Date()).getTime(), 500), B = await e.datafeed.getHistoryKLineData(u, m, k, Q);
        n == null || n.applyNewData(B, B.length > 0), e.datafeed.subscribe(u, m, (j) => {
          n == null || n.updateData(j);
        }), a = !1, $1(!1);
      })(), {
        symbol: u,
        period: m
      };
    }
    return p;
  }), q(() => {
    const p = s();
    n == null || n.setStyles(p);
    const u = p === "dark" ? "#929AA5" : "#76808F";
    n == null || n.setStyles({
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: E1.Middle,
            marginLeft: 8,
            marginTop: 7,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: 14,
            color: u,
            activeColor: u,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: E1.Middle,
            marginLeft: 8,
            marginTop: 7,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: 14,
            color: u,
            activeColor: u,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: E1.Middle,
            marginLeft: 6,
            marginTop: 7,
            marginBottom: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: 14,
            color: u,
            activeColor: u,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: E1.Middle,
            marginLeft: 6,
            marginTop: 7,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: 14,
            color: u,
            activeColor: u,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), q(() => {
    n == null || n.setLocale(C());
  }), q(() => {
    i() && (n == null || n.setStyles(i()), I1(dr(n.getStyles())));
  }), [Xc(), v(Z, {
    get when() {
      return O();
    },
    get children() {
      return v(Zc, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return T();
        },
        get subIndicators() {
          return $();
        },
        onClose: () => {
          E(!1);
        },
        onMainIndicatorChange: (p) => {
          const u = [...T()];
          p.added ? (N1(n, p.name, !0, {
            id: "candle_pane"
          }), u.push(p.name)) : (n == null || n.removeIndicator("candle_pane", p.name), u.splice(u.indexOf(p.name), 1)), b(u);
        },
        onSubIndicatorChange: (p) => {
          const u = {
            ...$()
          };
          if (p.added) {
            const m = N1(n, p.name);
            m && (u[p.name] = m);
          } else
            p.paneId && (n == null || n.removeIndicator(p.paneId, p.name), delete u[p.name]);
          M(u);
        }
      });
    }
  }), v(Z, {
    get when() {
      return Y();
    },
    get children() {
      return v(Uc, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return R.clone(n.getStyles());
        },
        onClose: () => {
          s1(!1);
        },
        onChange: (p) => {
          n == null || n.setStyles(p);
        },
        onRestoreDefault: (p) => {
          const u = {};
          p.forEach((m) => {
            const h = m.key;
            f0(u, h, R.formatValue(L1(), h));
          }), n == null || n.setStyles(u);
        }
      });
    }
  }), v(Z, {
    get when() {
      return t1().length > 0;
    },
    get children() {
      return v(Yc, {
        get locale() {
          return e.locale;
        },
        get url() {
          return t1();
        },
        onClose: () => {
          o1("");
        }
      });
    }
  }), v(Z, {
    get when() {
      return l1().visible;
    },
    get children() {
      return v(Wc, {
        get locale() {
          return e.locale;
        },
        get params() {
          return l1();
        },
        onClose: () => {
          b1({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (p) => {
          const u = l1();
          n == null || n.overrideIndicator({
            name: u.indicatorName,
            calcParams: p
          }, u.paneId);
        }
      });
    }
  }), v(ul, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return c();
    },
    get spread() {
      return n1();
    },
    get period() {
      return L();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await P5(() => r0(!n1())), n == null || n.resize();
      } catch {
      }
    },
    onPeriodChange: A,
    onIndicatorClick: () => {
      E((p) => !p);
    },
    onSettingClick: () => {
      s1((p) => !p);
    },
    onScreenshotClick: () => {
      if (n) {
        const p = n.getConvertPictureUrl(!0, "jpeg", e.theme === "dark" ? "#151517" : "#ffffff");
        o1(p);
      }
    }
  }), (() => {
    var p = qc(), u = p.firstChild;
    d(p, v(Z, {
      get when() {
        return P1();
      },
      get children() {
        return v(t5, {});
      }
    }), u), d(p, v(Z, {
      get when() {
        return n1();
      },
      get children() {
        return v(jc, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (h) => {
            n == null || n.createOverlay(h);
          },
          onModeChange: (h) => {
            n == null || n.overrideOverlay({
              mode: h
            });
          },
          onLockChange: (h) => {
            n == null || n.overrideOverlay({
              lock: h
            });
          },
          onVisibleChange: (h) => {
            n == null || n.overrideOverlay({
              visible: h
            });
          },
          onRemoveClick: (h) => {
            n == null || n.removeOverlay({
              groupId: h
            });
          }
        });
      }
    }), u);
    var m = t;
    return typeof m == "function" ? L0(m, u) : t = u, F(() => z(u, "data-drawing-bar-visible", n1())), p;
  })()];
};
var eu = /* @__PURE__ */ y('<svg class=logo viewBox="0 0 80 92"><path d=M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z></path><path d=M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z></path><path d=M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z>');
const tu = eu();
class su {
  constructor(t) {
    k1(this, "_chartApi", null);
    if (R.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light"), U5(() => {
      const n = this;
      return v(Jc, {
        ref: (r) => {
          n._chartApi = r;
        },
        get styles() {
          return t.styles ?? {};
        },
        get watermark() {
          return t.watermark ?? tu;
        },
        get theme() {
          return t.theme ?? "light";
        },
        get locale() {
          return t.locale ?? "zh-CN";
        },
        get drawingBarVisible() {
          return t.drawingBarVisible ?? !0;
        },
        get symbol() {
          return t.symbol;
        },
        get period() {
          return t.period;
        },
        get periods() {
          return t.periods ?? [{
            multiplier: 1,
            timespan: "minute",
            text: "1m"
          }, {
            multiplier: 5,
            timespan: "minute",
            text: "5m"
          }, {
            multiplier: 15,
            timespan: "minute",
            text: "15m"
          }, {
            multiplier: 1,
            timespan: "hour",
            text: "1H"
          }, {
            multiplier: 2,
            timespan: "hour",
            text: "2H"
          }, {
            multiplier: 4,
            timespan: "hour",
            text: "4H"
          }, {
            multiplier: 1,
            timespan: "day",
            text: "D"
          }, {
            multiplier: 1,
            timespan: "week",
            text: "W"
          }, {
            multiplier: 1,
            timespan: "month",
            text: "M"
          }, {
            multiplier: 1,
            timespan: "year",
            text: "Y"
          }];
        },
        get mainIndicators() {
          return t.mainIndicators ?? ["MA"];
        },
        get subIndicators() {
          return t.subIndicators ?? ["VOL"];
        },
        get datafeed() {
          return t.datafeed;
        }
      });
    }, this._container);
  }
  setTheme(t) {
    var n;
    (n = this._container) == null || n.setAttribute("data-theme", t), this._chartApi.setTheme(t);
  }
  getTheme() {
    return this._chartApi.getTheme();
  }
  setStyles(t) {
    this._chartApi.setStyles(t);
  }
  getStyles() {
    return this._chartApi.getStyles();
  }
  setLocale(t) {
    this._chartApi.setLocale(t);
  }
  getLocale() {
    return this._chartApi.getLocale();
  }
  setSymbol(t) {
    this._chartApi.setSymbol(t);
  }
  getSymbol() {
    return this._chartApi.getSymbol();
  }
  setPeriod(t) {
    this._chartApi.setPeriod(t);
  }
  getPeriod() {
    return this._chartApi.getPeriod();
  }
  resize() {
    this._chartApi.resize();
  }
}
w5.forEach((e) => {
  l5(e);
});
export {
  au as DefaultDatafeed,
  su as KLineChartPro,
  iu as loadLocales
};
//# sourceMappingURL=klinecharts-noob.js.map
