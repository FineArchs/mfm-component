import { h as I } from "vue";
var j = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, S = {}, $ = {}, P = {}, B = {}, Q = {};
(function(u) {
  Object.defineProperty(u, "__esModule", { value: !0 }), u.createLanguage = u.lazy = u.lineEnd = u.lineBegin = u.char = u.newline = u.crlf = u.lf = u.cr = u.notMatch = u.alt = u.seq = u.regexp = u.str = u.Parser = u.failure = u.success = void 0;
  function m(n, a) {
    return {
      success: !0,
      value: a,
      index: n
    };
  }
  u.success = m;
  function l() {
    return { success: !1 };
  }
  u.failure = l;
  class g {
    constructor(a, o) {
      this.handler = (e, c, f) => {
        if (f.trace && this.name != null) {
          const t = `${c}`;
          console.log(`${t.padEnd(6, " ")}enter ${this.name}`);
          const p = a(e, c, f);
          if (p.success) {
            const s = `${c}:${p.index}`;
            console.log(`${s.padEnd(6, " ")}match ${this.name}`);
          } else {
            const s = `${c}`;
            console.log(`${s.padEnd(6, " ")}fail ${this.name}`);
          }
          return p;
        }
        return a(e, c, f);
      }, this.name = o;
    }
    map(a) {
      return new g((o, e, c) => {
        const f = this.handler(o, e, c);
        return f.success ? m(f.index, a(f.value)) : f;
      });
    }
    text() {
      return new g((a, o, e) => {
        const c = this.handler(a, o, e);
        if (!c.success)
          return c;
        const f = a.slice(o, c.index);
        return m(c.index, f);
      });
    }
    many(a) {
      return new g((o, e, c) => {
        let f, t = e;
        const p = [];
        for (; t < o.length && (f = this.handler(o, t, c), !!f.success); )
          t = f.index, p.push(f.value);
        return p.length < a ? l() : m(t, p);
      });
    }
    sep(a, o) {
      if (o < 1)
        throw new Error('"min" must be a value greater than or equal to 1.');
      return h([
        this,
        h([
          a,
          this
        ], 1).many(o - 1)
      ]).map((e) => [e[0], ...e[1]]);
    }
    option() {
      return _([
        this,
        T(null)
      ]);
    }
  }
  u.Parser = g;
  function b(n) {
    return new g((a, o, e) => a.length - o < n.length || a.substr(o, n.length) !== n ? l() : m(o + n.length, n));
  }
  u.str = b;
  function d(n) {
    const a = RegExp(`^(?:${n.source})`, n.flags);
    return new g((o, e, c) => {
      const f = o.slice(e), t = a.exec(f);
      return t == null ? l() : m(e + t[0].length, t[0]);
    });
  }
  u.regexp = d;
  function h(n, a) {
    return new g((o, e, c) => {
      let f, t = e;
      const p = [];
      for (let s = 0; s < n.length; s++) {
        if (f = n[s].handler(o, t, c), !f.success)
          return f;
        t = f.index, p.push(f.value);
      }
      return m(t, a != null ? p[a] : p);
    });
  }
  u.seq = h;
  function _(n) {
    return new g((a, o, e) => {
      let c;
      for (let f = 0; f < n.length; f++)
        if (c = n[f].handler(a, o, e), c.success)
          return c;
      return l();
    });
  }
  u.alt = _;
  function T(n) {
    return new g((a, o, e) => m(o, n));
  }
  function v(n) {
    return new g((a, o, e) => n.handler(a, o, e).success ? l() : m(o, null));
  }
  u.notMatch = v, u.cr = b("\r"), u.lf = b(`
`), u.crlf = b(`\r
`), u.newline = _([u.crlf, u.cr, u.lf]), u.char = new g((n, a, o) => {
    if (n.length - a < 1)
      return l();
    const e = n.charAt(a);
    return m(a + 1, e);
  }), u.lineBegin = new g((n, a, o) => a === 0 || u.cr.handler(n, a - 1, o).success || u.lf.handler(n, a - 1, o).success ? m(a, null) : l()), u.lineEnd = new g((n, a, o) => a === n.length || u.cr.handler(n, a, o).success || u.lf.handler(n, a, o).success ? m(a, null) : l());
  function r(n) {
    const a = new g((o, e, c) => (a.handler = n().handler, a.handler(o, e, c)));
    return a;
  }
  u.lazy = r;
  function O(n) {
    const a = {};
    for (const o of Object.keys(n))
      a[o] = r(() => {
        const e = n[o](a);
        if (e == null)
          throw new Error("syntax must return a parser.");
        return e.name = o, e;
      });
    return a;
  }
  u.createLanguage = O;
})(Q);
var A = {}, H = {};
(function(u) {
  Object.defineProperty(u, "__esModule", { value: !0 }), u.TEXT = u.PLAIN = u.FN = u.LINK = u.N_URL = u.HASHTAG = u.MENTION = u.MATH_INLINE = u.INLINE_CODE = u.STRIKE = u.ITALIC = u.SMALL = u.BOLD = u.EMOJI_CODE = u.UNI_EMOJI = u.CENTER = u.MATH_BLOCK = u.CODE_BLOCK = u.SEARCH = u.QUOTE = u.isMfmBlock = void 0;
  const m = ["quote", "search", "blockCode", "mathBlock", "center"];
  function l(i) {
    return m.includes(i.type);
  }
  u.isMfmBlock = l;
  const g = (i) => ({ type: "quote", children: i });
  u.QUOTE = g;
  const b = (i, L) => ({ type: "search", props: { query: i, content: L } });
  u.SEARCH = b;
  const d = (i, L) => ({ type: "blockCode", props: { code: i, lang: L } });
  u.CODE_BLOCK = d;
  const h = (i) => ({ type: "mathBlock", props: { formula: i } });
  u.MATH_BLOCK = h;
  const _ = (i) => ({ type: "center", children: i });
  u.CENTER = _;
  const T = (i) => ({ type: "unicodeEmoji", props: { emoji: i } });
  u.UNI_EMOJI = T;
  const v = (i) => ({ type: "emojiCode", props: { name: i } });
  u.EMOJI_CODE = v;
  const r = (i) => ({ type: "bold", children: i });
  u.BOLD = r;
  const O = (i) => ({ type: "small", children: i });
  u.SMALL = O;
  const n = (i) => ({ type: "italic", children: i });
  u.ITALIC = n;
  const a = (i) => ({ type: "strike", children: i });
  u.STRIKE = a;
  const o = (i) => ({ type: "inlineCode", props: { code: i } });
  u.INLINE_CODE = o;
  const e = (i) => ({ type: "mathInline", props: { formula: i } });
  u.MATH_INLINE = e;
  const c = (i, L, M) => ({ type: "mention", props: { username: i, host: L, acct: M } });
  u.MENTION = c;
  const f = (i) => ({ type: "hashtag", props: { hashtag: i } });
  u.HASHTAG = f;
  const t = (i, L) => {
    const M = { type: "url", props: { url: i } };
    return L && (M.props.brackets = L), M;
  };
  u.N_URL = t;
  const p = (i, L, M) => ({ type: "link", props: { silent: i, url: L }, children: M });
  u.LINK = p;
  const s = (i, L, M) => ({ type: "fn", props: { name: i, args: L }, children: M });
  u.FN = s;
  const y = (i) => ({ type: "plain", children: [(0, u.TEXT)(i)] });
  u.PLAIN = y;
  const E = (i) => ({ type: "text", props: { text: i } });
  u.TEXT = E;
})(H);
Object.defineProperty(A, "__esModule", { value: !0 });
A.inspectOne = A.stringifyTree = A.stringifyNode = A.mergeText = void 0;
const D = H;
function V(u) {
  const m = [], l = [];
  function g() {
    l.length > 0 && (m.push((0, D.TEXT)(l.join(""))), l.length = 0);
  }
  const b = u.flat(1);
  for (const d of b)
    typeof d == "string" ? l.push(d) : !Array.isArray(d) && d.type === "text" ? l.push(d.props.text) : (g(), m.push(d));
  return g(), m;
}
A.mergeText = V;
function Y(u) {
  var m;
  switch (u.type) {
    case "quote":
      return C(u.children).split(`
`).map((l) => `> ${l}`).join(`
`);
    case "search":
      return u.props.content;
    case "blockCode":
      return `\`\`\`${(m = u.props.lang) !== null && m !== void 0 ? m : ""}
${u.props.code}
\`\`\``;
    case "mathBlock":
      return `\\[
${u.props.formula}
\\]`;
    case "center":
      return `<center>
${C(u.children)}
</center>`;
    case "emojiCode":
      return `:${u.props.name}:`;
    case "unicodeEmoji":
      return u.props.emoji;
    case "bold":
      return `**${C(u.children)}**`;
    case "small":
      return `<small>${C(u.children)}</small>`;
    case "italic":
      return `<i>${C(u.children)}</i>`;
    case "strike":
      return `~~${C(u.children)}~~`;
    case "inlineCode":
      return `\`${u.props.code}\``;
    case "mathInline":
      return `\\(${u.props.formula}\\)`;
    case "mention":
      return u.props.acct;
    case "hashtag":
      return `#${u.props.hashtag}`;
    case "url":
      return u.props.brackets ? `<${u.props.url}>` : u.props.url;
    case "link":
      return `${u.props.silent ? "?" : ""}[${C(u.children)}](${u.props.url})`;
    case "fn": {
      const l = Object.keys(u.props.args).map((b) => {
        const d = u.props.args[b];
        return d === !0 ? b : `${b}=${d}`;
      }), g = l.length > 0 ? "." + l.join(",") : "";
      return `$[${u.props.name}${g} ${C(u.children)}]`;
    }
    case "plain":
      return `<plain>
${C(u.children)}
</plain>`;
    case "text":
      return u.props.text;
  }
  throw new Error("unknown mfm node");
}
A.stringifyNode = Y;
var q;
(function(u) {
  u[u.none = 0] = "none", u[u.inline = 1] = "inline", u[u.block = 2] = "block";
})(q || (q = {}));
function C(u) {
  const m = [];
  let l = q.none;
  for (const g of u) {
    let b = !0;
    (0, D.isMfmBlock)(g) ? (l === q.none && (b = !1), l = q.block) : ((l === q.none || l === q.inline) && (b = !1), l = q.inline), b && m.push((0, D.TEXT)(`
`)), m.push(g);
  }
  return m.map((g) => Y(g)).join("");
}
A.stringifyTree = C;
function W(u, m) {
  if (m(u), u.children != null)
    for (const l of u.children)
      W(l, m);
}
A.inspectOne = W;
var R = {};
Object.defineProperty(R, "__esModule", {
  value: !0
});
R.default = /(?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c[\udffc-\udfff]|\ud83e\udef1\ud83c\udffc\u200d\ud83e\udef2\ud83c[\udffb\udffd-\udfff]|\ud83e\udef1\ud83c\udffd\u200d\ud83e\udef2\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\udef1\ud83c\udffe\u200d\ud83e\udef2\ud83c[\udffb-\udffd\udfff]|\ud83e\udef1\ud83c\udfff\u200d\ud83e\udef2\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83e\udd1d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc8f\udc91]|\ud83e\udd1d)|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b|\ud83d\udc26\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|\ud83e\udef0|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd\udec3-\udec5\udef1-\udef8]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udedc-\udedf\udeeb\udeec\udef4-\udefc\udfe0-\udfeb\udff0]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78-\uddb4\uddb7\uddba\uddbc-\uddcc\uddd0\uddde-\uddff\ude70-\ude7c\ude80-\ude88\ude90-\udebd\udebf-\udec2\udece-\udedb\udee0-\udee8]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g;
var U;
function Z() {
  if (U)
    return B;
  U = 1;
  var u = j && j.__createBinding || (Object.create ? function(e, c, f, t) {
    t === void 0 && (t = f);
    var p = Object.getOwnPropertyDescriptor(c, f);
    (!p || ("get" in p ? !c.__esModule : p.writable || p.configurable)) && (p = { enumerable: !0, get: function() {
      return c[f];
    } }), Object.defineProperty(e, t, p);
  } : function(e, c, f, t) {
    t === void 0 && (t = f), e[t] = c[f];
  }), m = j && j.__setModuleDefault || (Object.create ? function(e, c) {
    Object.defineProperty(e, "default", { enumerable: !0, value: c });
  } : function(e, c) {
    e.default = c;
  }), l = j && j.__importStar || function(e) {
    if (e && e.__esModule)
      return e;
    var c = {};
    if (e != null)
      for (var f in e)
        f !== "default" && Object.prototype.hasOwnProperty.call(e, f) && u(c, e, f);
    return m(c, e), c;
  }, g = j && j.__importDefault || function(e) {
    return e && e.__esModule ? e : { default: e };
  };
  Object.defineProperty(B, "__esModule", { value: !0 }), B.language = void 0;
  const b = l(k()), d = l(Q), h = A, _ = g(R), T = d.regexp(/[\u0020\u3000\t]/), v = d.regexp(/[a-z0-9]/i), r = d.alt([d.crlf, d.cr, d.lf]);
  function O(e) {
    return new d.Parser((c, f, t) => {
      const p = [];
      let s = f;
      for (let y = 0; y < e.length; y++) {
        const E = e[y].handler(c, s, t);
        if (!E.success)
          return s === f ? d.failure() : d.success(s, c.slice(f, s));
        p.push(E.value), s = E.index;
      }
      return d.success(s, p);
    });
  }
  const n = new d.Parser((e, c, f) => f.linkLabel ? d.failure() : d.success(c, null)), a = new d.Parser((e, c, f) => f.depth < f.nestLimit ? d.success(c, null) : d.failure());
  function o(e, c) {
    const f = d.alt([
      d.seq([a, e], 1),
      c ?? d.char
    ]);
    return new d.Parser((t, p, s) => {
      s.depth++;
      const y = f.handler(t, p, s);
      return s.depth--, y;
    });
  }
  return B.language = d.createLanguage({
    fullParser: (e) => e.full.many(0),
    simpleParser: (e) => e.simple.many(0),
    full: (e) => d.alt([
      e.unicodeEmoji,
      e.centerTag,
      e.smallTag,
      e.plainTag,
      e.boldTag,
      e.italicTag,
      e.strikeTag,
      e.urlAlt,
      e.big,
      e.boldAsta,
      e.italicAsta,
      e.boldUnder,
      e.italicUnder,
      e.codeBlock,
      e.inlineCode,
      e.quote,
      e.mathBlock,
      e.mathInline,
      e.strikeWave,
      e.fn,
      e.mention,
      e.hashtag,
      e.emojiCode,
      e.link,
      e.url,
      e.search,
      e.text
    ]),
    simple: (e) => d.alt([
      e.unicodeEmoji,
      e.emojiCode,
      e.text
    ]),
    inline: (e) => d.alt([
      e.unicodeEmoji,
      e.smallTag,
      e.plainTag,
      e.boldTag,
      e.italicTag,
      e.strikeTag,
      e.urlAlt,
      e.big,
      e.boldAsta,
      e.italicAsta,
      e.boldUnder,
      e.italicUnder,
      e.inlineCode,
      e.mathInline,
      e.strikeWave,
      e.fn,
      e.mention,
      e.hashtag,
      e.emojiCode,
      e.link,
      e.url,
      e.text
    ]),
    quote: (e) => {
      const c = d.seq([
        d.str(">"),
        T.option(),
        d.seq([d.notMatch(r), d.char], 1).many(0).text()
      ], 2).sep(r, 1), f = d.seq([
        r.option(),
        r.option(),
        d.lineBegin,
        c,
        r.option(),
        r.option()
      ], 3);
      return new d.Parser((t, p, s) => {
        let y;
        if (y = f.handler(t, p, s), !y.success)
          return y;
        const E = y.value, i = y.index;
        return E.length === 1 && E[0].length === 0 ? d.failure() : (y = o(e.fullParser).many(0).handler(E.join(`
`), 0, s), y.success ? d.success(i, b.QUOTE((0, h.mergeText)(y.value))) : y);
      });
    },
    codeBlock: (e) => {
      const c = d.str("```");
      return d.seq([
        r.option(),
        d.lineBegin,
        c,
        d.seq([d.notMatch(r), d.char], 1).many(0),
        r,
        d.seq([d.notMatch(d.seq([r, c, d.lineEnd])), d.char], 1).many(1),
        r,
        c,
        d.lineEnd,
        r.option()
      ]).map((f) => {
        const t = f[3].join("").trim(), p = f[5].join("");
        return b.CODE_BLOCK(p, t.length > 0 ? t : null);
      });
    },
    mathBlock: (e) => {
      const c = d.str("\\["), f = d.str("\\]");
      return d.seq([
        r.option(),
        d.lineBegin,
        c,
        r.option(),
        d.seq([d.notMatch(d.seq([r.option(), f])), d.char], 1).many(1),
        r.option(),
        f,
        d.lineEnd,
        r.option()
      ]).map((t) => {
        const p = t[4].join("");
        return b.MATH_BLOCK(p);
      });
    },
    centerTag: (e) => {
      const c = d.str("<center>"), f = d.str("</center>");
      return d.seq([
        r.option(),
        d.lineBegin,
        c,
        r.option(),
        d.seq([d.notMatch(d.seq([r.option(), f])), o(e.inline)], 1).many(1),
        r.option(),
        f,
        d.lineEnd,
        r.option()
      ]).map((t) => b.CENTER((0, h.mergeText)(t[4])));
    },
    big: (e) => {
      const c = d.str("***");
      return O([
        c,
        d.seq([d.notMatch(c), o(e.inline)], 1).many(1),
        c
      ]).map((f) => typeof f == "string" ? f : b.FN("tada", {}, (0, h.mergeText)(f[1])));
    },
    boldAsta: (e) => {
      const c = d.str("**");
      return O([
        c,
        d.seq([d.notMatch(c), o(e.inline)], 1).many(1),
        c
      ]).map((f) => typeof f == "string" ? f : b.BOLD((0, h.mergeText)(f[1])));
    },
    boldTag: (e) => {
      const c = d.str("<b>"), f = d.str("</b>");
      return O([
        c,
        d.seq([d.notMatch(f), o(e.inline)], 1).many(1),
        f
      ]).map((t) => typeof t == "string" ? t : b.BOLD((0, h.mergeText)(t[1])));
    },
    boldUnder: (e) => {
      const c = d.str("__");
      return d.seq([
        c,
        d.alt([v, T]).many(1),
        c
      ]).map((f) => b.BOLD((0, h.mergeText)(f[1])));
    },
    smallTag: (e) => {
      const c = d.str("<small>"), f = d.str("</small>");
      return O([
        c,
        d.seq([d.notMatch(f), o(e.inline)], 1).many(1),
        f
      ]).map((t) => typeof t == "string" ? t : b.SMALL((0, h.mergeText)(t[1])));
    },
    italicTag: (e) => {
      const c = d.str("<i>"), f = d.str("</i>");
      return O([
        c,
        d.seq([d.notMatch(f), o(e.inline)], 1).many(1),
        f
      ]).map((t) => typeof t == "string" ? t : b.ITALIC((0, h.mergeText)(t[1])));
    },
    italicAsta: (e) => {
      const c = d.str("*"), f = d.seq([
        c,
        d.alt([v, T]).many(1),
        c
      ]);
      return new d.Parser((t, p, s) => {
        const y = f.handler(t, p, s);
        if (!y.success)
          return d.failure();
        const E = t.slice(0, p);
        return /[a-z0-9]$/i.test(E) ? d.failure() : d.success(y.index, b.ITALIC((0, h.mergeText)(y.value[1])));
      });
    },
    italicUnder: (e) => {
      const c = d.str("_"), f = d.seq([
        c,
        d.alt([v, T]).many(1),
        c
      ]);
      return new d.Parser((t, p, s) => {
        const y = f.handler(t, p, s);
        if (!y.success)
          return d.failure();
        const E = t.slice(0, p);
        return /[a-z0-9]$/i.test(E) ? d.failure() : d.success(y.index, b.ITALIC((0, h.mergeText)(y.value[1])));
      });
    },
    strikeTag: (e) => {
      const c = d.str("<s>"), f = d.str("</s>");
      return O([
        c,
        d.seq([d.notMatch(f), o(e.inline)], 1).many(1),
        f
      ]).map((t) => typeof t == "string" ? t : b.STRIKE((0, h.mergeText)(t[1])));
    },
    strikeWave: (e) => {
      const c = d.str("~~");
      return O([
        c,
        d.seq([d.notMatch(d.alt([c, r])), o(e.inline)], 1).many(1),
        c
      ]).map((f) => typeof f == "string" ? f : b.STRIKE((0, h.mergeText)(f[1])));
    },
    unicodeEmoji: (e) => {
      const c = RegExp(_.default.source);
      return d.regexp(c).map((f) => b.UNI_EMOJI(f));
    },
    plainTag: (e) => {
      const c = d.str("<plain>"), f = d.str("</plain>");
      return d.seq([
        c,
        r.option(),
        d.seq([
          d.notMatch(d.seq([r.option(), f])),
          d.char
        ], 1).many(1).text(),
        r.option(),
        f
      ], 2).map((t) => b.PLAIN(t));
    },
    fn: (e) => {
      const c = new d.Parser((s, y, E) => {
        const i = d.regexp(/[a-z0-9_]+/i).handler(s, y, E);
        return i.success ? d.success(i.index, i.value) : i;
      }), f = d.seq([
        d.regexp(/[a-z0-9_]+/i),
        d.seq([
          d.str("="),
          d.regexp(/[a-z0-9_.-]+/i)
        ], 1).option()
      ]).map((s) => ({
        k: s[0],
        v: s[1] != null ? s[1] : !0
      })), t = d.seq([
        d.str("."),
        f.sep(d.str(","), 1)
      ], 1).map((s) => {
        const y = {};
        for (const E of s)
          y[E.k] = E.v;
        return y;
      }), p = d.str("]");
      return O([
        d.str("$["),
        c,
        t.option(),
        d.str(" "),
        d.seq([d.notMatch(p), o(e.inline)], 1).many(1),
        p
      ]).map((s) => {
        if (typeof s == "string")
          return s;
        const y = s[1], E = s[2] || {}, i = s[4];
        return b.FN(y, E, (0, h.mergeText)(i));
      });
    },
    inlineCode: (e) => {
      const c = d.str("`");
      return d.seq([
        c,
        d.seq([
          d.notMatch(d.alt([c, d.str("´"), r])),
          d.char
        ], 1).many(1),
        c
      ]).map((f) => b.INLINE_CODE(f[1].join("")));
    },
    mathInline: (e) => {
      const c = d.str("\\("), f = d.str("\\)");
      return d.seq([
        c,
        d.seq([
          d.notMatch(d.alt([f, r])),
          d.char
        ], 1).many(1),
        f
      ]).map((t) => b.MATH_INLINE(t[1].join("")));
    },
    mention: (e) => {
      const c = d.seq([
        n,
        d.str("@"),
        d.regexp(/[a-z0-9_-]+/i),
        d.seq([
          d.str("@"),
          d.regexp(/[a-z0-9_.-]+/i)
        ], 1).option()
      ]);
      return new d.Parser((f, t, p) => {
        let s;
        if (s = c.handler(f, t, p), !s.success)
          return d.failure();
        const y = f.slice(0, t);
        if (/[a-z0-9]$/i.test(y))
          return d.failure();
        let E = !1;
        const i = s.index, L = s.value[2], M = s.value[3];
        let N = M;
        M != null && (s = /[.-]+$/.exec(M), s != null && (N = M.slice(0, -1 * s[0].length), N.length === 0 && (E = !0, N = null)));
        let w = L;
        if (s = /-+$/.exec(L), s != null && (N == null ? w = L.slice(0, -1 * s[0].length) : E = !0), (w.length === 0 || w[0] === "-") && (E = !0), N != null && /^[.-]/.test(N) && (E = !0), E)
          return d.success(i, f.slice(t, i));
        const K = N != null ? `@${w}@${N}` : `@${w}`;
        return d.success(t + K.length, b.MENTION(w, N, K));
      });
    },
    hashtag: (e) => {
      const c = d.str("#"), f = d.seq([
        d.notMatch(d.alt([d.regexp(/[ \u3000\t.,!?'"#:/[\]【】()「」（）<>]/), T, r])),
        d.char
      ], 1), t = d.lazy(() => d.alt([
        d.seq([
          d.str("("),
          o(t, f).many(0),
          d.str(")")
        ]),
        d.seq([
          d.str("["),
          o(t, f).many(0),
          d.str("]")
        ]),
        d.seq([
          d.str("「"),
          o(t, f).many(0),
          d.str("」")
        ]),
        d.seq([
          d.str("（"),
          o(t, f).many(0),
          d.str("）")
        ]),
        f
      ])), p = d.seq([
        n,
        c,
        t.many(1).text()
      ], 2);
      return new d.Parser((s, y, E) => {
        const i = p.handler(s, y, E);
        if (!i.success)
          return d.failure();
        const L = s.slice(0, y);
        if (/[a-z0-9]$/i.test(L))
          return d.failure();
        const M = i.index, N = i.value;
        return /^[0-9]+$/.test(N) ? d.failure() : d.success(M, b.HASHTAG(N));
      });
    },
    emojiCode: (e) => {
      const c = d.notMatch(d.regexp(/[a-z0-9]/i)), f = d.str(":");
      return d.seq([
        d.alt([d.lineBegin, c]),
        f,
        d.regexp(/[a-z0-9_+-]+/i),
        f,
        d.alt([d.lineEnd, c])
      ], 2).map((t) => b.EMOJI_CODE(t));
    },
    link: (e) => {
      const c = new d.Parser((t, p, s) => {
        s.linkLabel = !0;
        const y = e.inline.handler(t, p, s);
        return s.linkLabel = !1, y;
      }), f = d.str("]");
      return d.seq([
        n,
        d.alt([d.str("?["), d.str("[")]),
        d.seq([
          d.notMatch(d.alt([f, r])),
          o(c)
        ], 1).many(1),
        f,
        d.str("("),
        d.alt([e.urlAlt, e.url]),
        d.str(")")
      ]).map((t) => {
        const p = t[1] === "?[", s = t[2], y = t[5];
        return b.LINK(p, y.props.url, (0, h.mergeText)(s));
      });
    },
    url: (e) => {
      const c = d.regexp(/[.,a-z0-9_/:%#@$&?!~=+-]/i), f = d.lazy(() => d.alt([
        d.seq([
          d.str("("),
          o(f, c).many(0),
          d.str(")")
        ]),
        d.seq([
          d.str("["),
          o(f, c).many(0),
          d.str("]")
        ]),
        c
      ])), t = d.seq([
        n,
        d.regexp(/https?:\/\//),
        f.many(1).text()
      ]);
      return new d.Parser((p, s, y) => {
        let E;
        if (E = t.handler(p, s, y), !E.success)
          return d.failure();
        const i = E.index;
        let L = i;
        const M = E.value[1];
        let N = E.value[2];
        return E = /[.,]+$/.exec(N), E != null && (L -= E[0].length, N = N.slice(0, -1 * E[0].length), N.length === 0) ? d.success(i, p.slice(s, i)) : d.success(L, b.N_URL(M + N, !1));
      });
    },
    urlAlt: (e) => {
      const c = d.str("<"), f = d.str(">"), t = d.seq([
        n,
        c,
        d.regexp(/https?:\/\//),
        d.seq([d.notMatch(d.alt([f, T])), d.char], 1).many(1),
        f
      ]).text();
      return new d.Parser((p, s, y) => {
        const E = t.handler(p, s, y);
        if (!E.success)
          return d.failure();
        const i = E.value.slice(1, E.value.length - 1);
        return d.success(E.index, b.N_URL(i, !0));
      });
    },
    search: (e) => {
      const c = d.alt([
        d.regexp(/\[(検索|search)\]/i),
        d.regexp(/(検索|search)/i)
      ]);
      return d.seq([
        r.option(),
        d.lineBegin,
        d.seq([
          d.notMatch(d.alt([
            r,
            d.seq([T, c, d.lineEnd])
          ])),
          d.char
        ], 1).many(1),
        T,
        c,
        d.lineEnd,
        r.option()
      ]).map((f) => {
        const t = f[2].join("");
        return b.SEARCH(t, `${t}${f[3]}${f[4]}`);
      });
    },
    text: (e) => d.char
  }), B;
}
var z;
function x() {
  if (z)
    return P;
  z = 1, Object.defineProperty(P, "__esModule", { value: !0 }), P.simpleParser = P.fullParser = void 0;
  const u = Z(), m = A;
  function l(b, d) {
    const h = u.language.fullParser.handler(b, 0, {
      nestLimit: d.nestLimit != null ? d.nestLimit : 20,
      depth: 0,
      linkLabel: !1,
      trace: !1
    });
    return (0, m.mergeText)(h.value);
  }
  P.fullParser = l;
  function g(b) {
    const d = u.language.simpleParser.handler(b, 0, {});
    return (0, m.mergeText)(d.value);
  }
  return P.simpleParser = g, P;
}
var F;
function dd() {
  if (F)
    return $;
  F = 1, Object.defineProperty($, "__esModule", { value: !0 }), $.extract = $.inspect = $.toString = $.parseSimple = $.parse = void 0;
  const u = x(), m = A;
  function l(_, T = {}) {
    return (0, u.fullParser)(_, {
      nestLimit: T.nestLimit
    });
  }
  $.parse = l;
  function g(_) {
    return (0, u.simpleParser)(_);
  }
  $.parseSimple = g;
  function b(_) {
    return Array.isArray(_) ? (0, m.stringifyTree)(_) : (0, m.stringifyNode)(_);
  }
  $.toString = b;
  function d(_, T) {
    if (Array.isArray(_))
      for (const v of _)
        (0, m.inspectOne)(v, T);
    else
      (0, m.inspectOne)(_, T);
  }
  $.inspect = d;
  function h(_, T) {
    const v = [];
    return d(_, (r) => {
      T(r) && v.push(r);
    }), v;
  }
  return $.extract = h, $;
}
var J;
function k() {
  return J || (J = 1, function(u) {
    Object.defineProperty(u, "__esModule", { value: !0 }), u.TEXT = u.PLAIN = u.FN = u.LINK = u.N_URL = u.HASHTAG = u.MENTION = u.MATH_INLINE = u.INLINE_CODE = u.STRIKE = u.ITALIC = u.SMALL = u.BOLD = u.EMOJI_CODE = u.UNI_EMOJI = u.CENTER = u.MATH_BLOCK = u.CODE_BLOCK = u.SEARCH = u.QUOTE = u.extract = u.inspect = u.toString = u.parseSimple = u.parse = void 0;
    var m = dd();
    Object.defineProperty(u, "parse", { enumerable: !0, get: function() {
      return m.parse;
    } }), Object.defineProperty(u, "parseSimple", { enumerable: !0, get: function() {
      return m.parseSimple;
    } }), Object.defineProperty(u, "toString", { enumerable: !0, get: function() {
      return m.toString;
    } }), Object.defineProperty(u, "inspect", { enumerable: !0, get: function() {
      return m.inspect;
    } }), Object.defineProperty(u, "extract", { enumerable: !0, get: function() {
      return m.extract;
    } });
    var l = H;
    Object.defineProperty(u, "QUOTE", { enumerable: !0, get: function() {
      return l.QUOTE;
    } }), Object.defineProperty(u, "SEARCH", { enumerable: !0, get: function() {
      return l.SEARCH;
    } }), Object.defineProperty(u, "CODE_BLOCK", { enumerable: !0, get: function() {
      return l.CODE_BLOCK;
    } }), Object.defineProperty(u, "MATH_BLOCK", { enumerable: !0, get: function() {
      return l.MATH_BLOCK;
    } }), Object.defineProperty(u, "CENTER", { enumerable: !0, get: function() {
      return l.CENTER;
    } }), Object.defineProperty(u, "UNI_EMOJI", { enumerable: !0, get: function() {
      return l.UNI_EMOJI;
    } }), Object.defineProperty(u, "EMOJI_CODE", { enumerable: !0, get: function() {
      return l.EMOJI_CODE;
    } }), Object.defineProperty(u, "BOLD", { enumerable: !0, get: function() {
      return l.BOLD;
    } }), Object.defineProperty(u, "SMALL", { enumerable: !0, get: function() {
      return l.SMALL;
    } }), Object.defineProperty(u, "ITALIC", { enumerable: !0, get: function() {
      return l.ITALIC;
    } }), Object.defineProperty(u, "STRIKE", { enumerable: !0, get: function() {
      return l.STRIKE;
    } }), Object.defineProperty(u, "INLINE_CODE", { enumerable: !0, get: function() {
      return l.INLINE_CODE;
    } }), Object.defineProperty(u, "MATH_INLINE", { enumerable: !0, get: function() {
      return l.MATH_INLINE;
    } }), Object.defineProperty(u, "MENTION", { enumerable: !0, get: function() {
      return l.MENTION;
    } }), Object.defineProperty(u, "HASHTAG", { enumerable: !0, get: function() {
      return l.HASHTAG;
    } }), Object.defineProperty(u, "N_URL", { enumerable: !0, get: function() {
      return l.N_URL;
    } }), Object.defineProperty(u, "LINK", { enumerable: !0, get: function() {
      return l.LINK;
    } }), Object.defineProperty(u, "FN", { enumerable: !0, get: function() {
      return l.FN;
    } }), Object.defineProperty(u, "PLAIN", { enumerable: !0, get: function() {
      return l.PLAIN;
    } }), Object.defineProperty(u, "TEXT", { enumerable: !0, get: function() {
      return l.TEXT;
    } });
  }(S)), S;
}
var X = k();
const G = `
display: block;
margin: 8px;
padding: 6px 0 6px 12px;
color: var(--fg);
border-left: solid 3px var(--fg);
opacity: 0.7;
`.split(`
`).join(" ");
function ed(u, m) {
  if (u.isNote, u.text == null || u.text === "")
    return;
  const l = u.parsedNodes ?? (u.plain ? X.parseSimple : X.parse)(u.text), g = (_) => typeof _ != "string" ? null : _.match(/^[0-9.]+s$/) ? _ : null, b = (_) => typeof _ == "string" ? _ : null, d = !!u.useAnim, h = (_, T, v = !1) => _.map((r) => {
    switch (r.type) {
      case "text": {
        let O = r.props.text.replace(/(\r\n|\n|\r)/g, `
`);
        if (u.plain)
          return [O.replace(/\n/g, " ")];
        {
          const n = [];
          for (const a of O.split(`
`))
            n.push(I("br")), n.push(a);
          return n.shift(), n;
        }
      }
      case "bold":
        return [I("b", h(r.children, T))];
      case "strike":
        return [I("del", h(r.children, T))];
      case "italic":
        return I("i", {
          style: "font-style: oblique;"
        }, h(r.children, T));
      case "fn": {
        let O;
        switch (r.props.name) {
          case "tada": {
            const n = g(r.props.args.speed) ?? "1s", a = g(r.props.args.delay) ?? "0s";
            O = "font-size: 150%;" + (d ? `animation: tada ${n} linear infinite both; animation-delay: ${a};` : "");
            break;
          }
          case "jelly": {
            const n = g(r.props.args.speed) ?? "1s", a = g(r.props.args.delay) ?? "0s";
            O = d ? `animation: mfm-rubberBand ${n} linear infinite both; animation-delay: ${a};` : "";
            break;
          }
          case "twitch": {
            const n = g(r.props.args.speed) ?? "0.5s", a = g(r.props.args.delay) ?? "0s";
            O = d ? `animation: mfm-twitch ${n} ease infinite; animation-delay: ${a};` : "";
            break;
          }
          case "shake": {
            const n = g(r.props.args.speed) ?? "0.5s", a = g(r.props.args.delay) ?? "0s";
            O = d ? `animation: mfm-shake ${n} ease infinite; animation-delay: ${a};` : "";
            break;
          }
          case "spin": {
            const n = r.props.args.left ? "reverse" : r.props.args.alternate ? "alternate" : "normal", a = r.props.args.x ? "mfm-spinX" : r.props.args.y ? "mfm-spinY" : "mfm-spin", o = g(r.props.args.speed) ?? "1.5s", e = g(r.props.args.delay) ?? "0s";
            O = d ? `animation: ${a} ${o} linear infinite; animation-direction: ${n}; animation-delay: ${e};` : "";
            break;
          }
          case "jump": {
            const n = g(r.props.args.speed) ?? "0.75s", a = g(r.props.args.delay) ?? "0s";
            O = d ? `animation: mfm-jump ${n} linear infinite; animation-delay: ${a};` : "";
            break;
          }
          case "bounce": {
            const n = g(r.props.args.speed) ?? "0.75s", a = g(r.props.args.delay) ?? "0s";
            O = d ? `animation: mfm-bounce ${n} linear infinite; transform-origin: center bottom; animation-delay: ${a};` : "";
            break;
          }
          case "flip": {
            O = `transform: ${r.props.args.h && r.props.args.v ? "scale(-1, -1)" : r.props.args.v ? "scaleY(-1)" : "scaleX(-1)"};`;
            break;
          }
          case "x2":
            return I("span", {
              // class: defaultStore.state.advancedMfm ? 'mfm-x2' : '',
              class: "mfm-x2"
            }, h(r.children, T * 2));
          case "x3":
            return I("span", {
              // class: defaultStore.state.advancedMfm ? 'mfm-x3' : '',
              class: "mfm-x3"
            }, h(r.children, T * 3));
          case "x4":
            return I("span", {
              // class: defaultStore.state.advancedMfm ? 'mfm-x4' : '',
              class: "mfm-x4"
            }, h(r.children, T * 4));
          case "font": {
            const n = r.props.args.serif ? "serif" : r.props.args.monospace ? "monospace" : r.props.args.cursive ? "cursive" : r.props.args.fantasy ? "fantasy" : r.props.args.emoji ? "emoji" : r.props.args.math ? "math" : null;
            n && (O = `font-family: ${n};`);
            break;
          }
          case "blur":
            return I("span", {
              class: "_mfm_blur_"
            }, h(r.children, T));
          case "rainbow": {
            if (!d)
              return I("span", {
                class: "_mfm_rainbow_fallback_"
              }, h(r.children, T));
            const n = g(r.props.args.speed) ?? "1s", a = g(r.props.args.delay) ?? "0s";
            O = `animation: mfm-rainbow ${n} linear infinite; animation-delay: ${a};`;
            break;
          }
          case "sparkle": {
            if (!d)
              return h(r.children, T);
            break;
          }
          case "rotate": {
            O = `transform: rotate(${parseFloat(b(r.props.args.deg) ?? "90")}deg); transform-origin: center center;`;
            break;
          }
          case "position": {
            const n = parseFloat(b(r.props.args.x) ?? "0"), a = parseFloat(b(r.props.args.y) ?? "0");
            O = `transform: translateX(${n}em) translateY(${a}em);`;
            break;
          }
          case "scale": {
            const n = Math.min(parseFloat(b(r.props.args.x) ?? "1"), 5), a = Math.min(parseFloat(b(r.props.args.y) ?? "1"), 5);
            O = `transform: scale(${n}, ${a});`, T = T * Math.max(n, a);
            break;
          }
          case "fg": {
            let n = b(r.props.args.color);
            (!n || !/^[0-9a-f]{3,6}$/i.test(n)) && (n = "f00"), O = `color: #${n};`;
            break;
          }
          case "bg": {
            let n = b(r.props.args.color);
            (!n || !/^[0-9a-f]{3,6}$/i.test(n)) && (n = "f00"), O = `background-color: #${n};`;
            break;
          }
          case "ruby":
            if (r.children.length === 1) {
              const n = r.children[0];
              let a = n.type === "text" ? n.props.text : "";
              return I("ruby", {}, [a.split(" ")[0], I("rt", a.split(" ")[1])]);
            } else {
              const n = r.children.at(-1);
              let a = n.type === "text" ? n.props.text : "";
              return I("ruby", {}, [...h(r.children.slice(0, r.children.length - 1), T), I("rt", a.trim())]);
            }
          case "unixtime": {
            const n = r.children[0];
            return parseInt(n.type === "text" ? n.props.text : ""), I("span", {
              style: "display: inline-block; font-size: 90%; border: solid 1px var(--divider); border-radius: 999px; padding: 4px 10px 4px 6px;"
            }, [
              I("i", {
                class: "ti ti-clock",
                style: "margin-right: 0.25em;"
              })
              /*
              h(MkTime, {
              	key: Math.random(),
              	time: unixtime * 1000,
              	mode: 'detail',
              }),
                     */
            ]);
          }
          case "clickable":
            return I("span", { onClick(n) {
              n.stopPropagation(), n.preventDefault(), m.emit("clickEv", b(r.props.args.ev) ?? "");
            } }, h(r.children, T));
        }
        return O === void 0 ? I("span", {}, ["$[", r.props.name, " ", ...h(r.children, T), "]"]) : I("span", {
          style: "display: inline-block; " + O
        }, h(r.children, T));
      }
      case "small":
        return [I("small", {
          style: "opacity: 0.7;"
        }, h(r.children, T))];
      case "center":
        return [I("div", {
          style: "text-align:center;"
        }, h(r.children, T))];
      case "url":
        return [r.props.url];
      case "link":
        return h(r.children, T, !0);
      case "mention":
        return [r.props.username];
      case "hashtag":
        return [`#${r.props.hashtag}`];
      case "blockCode":
        return [r.props.code];
      case "inlineCode":
        return [r.props.code];
      case "quote":
        return u.nowrap ? [I("span", {
          style: G
        }, h(r.children, T, !0))] : [I("div", {
          style: G
        }, h(r.children, T, !0))];
      case "emojiCode":
        return [`:${r.props.name}:`];
      case "unicodeEmoji":
        return [r.props.emoji];
      case "mathInline":
        return [I("code", r.props.formula)];
      case "mathBlock":
        return [I("code", r.props.formula)];
      case "search":
        return [r.props.query];
      case "plain":
        return [I("span", h(r.children, T, !0))];
      default:
        return console.error("unrecognized ast type:", r.type), [];
    }
  }).flat(1 / 0);
  return I("span", {
    // https://codeday.me/jp/qa/20190424/690106.html
    style: u.nowrap ? "white-space: pre; word-wrap: normal; overflow: hidden; text-overflow: ellipsis;" : "white-space: pre-wrap;"
  }, h(l, u.rootScale ?? 1));
}
export {
  ed as Mfm
};
