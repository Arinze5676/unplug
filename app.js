/* ============================================================
   unplug. — app logic (SEK, two tiers, demo accounts)
   Everything runs in the browser. No server, no real payments.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Icons ---------- */
  var ICONS = {
    fridge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M5 9h14"/><path d="M9 6.5h.01"/><path d="M9 14h.01"/></svg>',
    radiator: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 4v16"/><path d="M12 4v16"/><path d="M16 4v16"/></svg>',
    laptop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="14" height="9" rx="1.5"/><path d="M3 18h18"/></svg>',
    desktop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M9 19h6"/><path d="M12 15v4"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 15a5 5 0 1 1 6 0c-.7.6-1 1.5-1 2.5h-4c0-1-.3-1.9-1-2.5z"/><path d="M11 20h2"/></svg>',
    fan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 4v3"/><path d="M12 17v3"/><path d="M4 12h3"/><path d="M17 12h3"/><path d="M6.3 6.3l2.1 2.1"/><path d="M15.6 15.6l2.1 2.1"/><path d="M6.3 17.7l2.1-2.1"/><path d="M15.6 8.4l2.1-2.1"/></svg>',
    ac: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="9" rx="2"/><path d="M9 16h6"/><path d="M12 13v3"/><path d="M8 6.5h.01"/><path d="M8 9h.01"/></svg>',
    kettle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 11h10v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z"/><path d="M16 11l3 3v3"/><path d="M9 5V4"/><path d="M12 5V4"/></svg>',
    microwave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 11h18"/><path d="M15 15h3"/><path d="M6 8h.01"/><path d="M9 8h.01"/></svg>',
    iron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15h15a2 2 0 0 1 2 2v1H6z"/><path d="M6 15l1-7h9l1 7"/><path d="M8 6l1-2h6l1 2"/></svg>',
    washer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 8v.01"/><path d="M9.5 5.5h.01"/></svg>',
    tv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M8 21h8"/><path d="M12 18v3"/></svg>',
    gamepad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4z"/><path d="M8 11h.01"/><path d="M10 13h.01"/><path d="M14 13h2"/></svg>',
    router: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="12" width="18" height="6" rx="2"/><path d="M8 8V7"/><path d="M12 8V5"/><path d="M16 8V7"/><path d="M6 15h.01"/><path d="M9 15h.01"/></svg>',
    heater: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="16" height="12" rx="6"/><path d="M12 9v.01"/><path d="M10 21v-3"/><path d="M14 21v-3"/><path d="M9 12h6"/></svg>',
    blender: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h6l-2 7h-2z"/><rect x="8" y="11" width="8" height="8" rx="1.5"/><path d="M12 14v2"/></svg>',
    stove: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="12" r="2"/><circle cx="15.5" cy="12" r="2"/></svg>',
    vacuum: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="9" height="8" rx="2"/><path d="M13 12h4l2 3v3h-3"/><path d="M13 15h3"/><path d="M5 10V7"/></svg>',
    dryer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h8a4 4 0 0 1 0 8H8"/><path d="M4 10l2-5h8v13H9"/><path d="M12 5v3"/></svg>',
    printer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="12" width="12" height="8" rx="1.5"/><path d="M8 12V7h8v5"/><rect x="6" y="5" width="12" height="2" rx="0.5"/><path d="M8 17h8"/></svg>'
  };

  var COLORS = ["#b6dc43", "#f4705a", "#a9c9f0", "#f2c14e", "#b48cf2", "#6fc7b8", "#e89ac7", "#9aa29c"];

  /* ---------- Catalog ---------- */
  var CATALOG = [
    { id: "fridge", name: "Mini fridge", cat: "Kitchen", watts: 90, hours: 24, days: 7, icon: "fridge", blurb: "Runs all day, so every watt counts.", actions: [
      { id: "fridge-room", kind: "tweak", minutes: 15, upfront: 0, pct: 0.06, title: "Give the fridge some breathing room", detail: "Pull it 10 cm off the wall and vacuum the dusty coils behind. It sheds heat faster, so the compressor runs less." },
      { id: "fridge-temp", kind: "habit", minutes: 2, upfront: 0, pct: 0.05, title: "Set it to 4°C, not Arctic", detail: "The sweet spot is 3–5°C. Colder than that wastes power without keeping food any fresher." },
      { id: "fridge-swap", kind: "upgrade", minutes: 120, upfront: 5000, pct: 0.30, title: "Upgrade to an efficient A++ fridge", detail: "If yours is old, a modern efficient model can use a third less power — and pays itself back over time." }
    ]},
    { id: "radiator", name: "Electric heater / radiator", cat: "Heating", watts: 1500, hours: 3, days: 7, icon: "radiator", blurb: "The biggest bill-killer in a cold month.", actions: [
      { id: "radiator-thermo", kind: "habit", minutes: 2, upfront: 0, pct: 0.20, title: "Turn the thermostat down to 20°C", detail: "Every degree lower cuts roughly 5%. 20°C is comfortable — 23°C is expensive." },
      { id: "radiator-timer", kind: "tweak", minutes: 15, upfront: 0, pct: 0.10, title: "Put radiators on a schedule", detail: "No heat while you're out or asleep. Warmth exactly when you're home to feel it." },
      { id: "radiator-bleed", kind: "tweak", minutes: 20, upfront: 0, pct: 0.05, title: "Bleed and clean the radiators", detail: "Air pockets and dust make them work harder for the same warmth. A yearly bleed helps." }
    ]},
    { id: "laptop", name: "Laptop", cat: "Study", watts: 65, hours: 6, days: 5, icon: "laptop", blurb: "Your study buddy, usually gentle on the bill.", actions: [
      { id: "laptop-sleep", kind: "habit", minutes: 1, upfront: 0, pct: 0.10, title: "Let it sleep when you wander off", detail: "Set sleep after 5 minutes of inactivity. A dozing laptop draws a fraction of a working one." },
      { id: "laptop-unplug", kind: "habit", minutes: 1, upfront: 0, pct: 0.04, title: "Unplug the charger at night", detail: "Chargers keep sipping power even when the battery is full. Pull the block when it hits 100%." }
    ]},
    { id: "desktop", name: "Desktop PC", cat: "Study", watts: 250, hours: 4, days: 5, icon: "desktop", blurb: "A power-hungry workhorse if it runs all evening.", actions: [
      { id: "desktop-sleep", kind: "habit", minutes: 1, upfront: 0, pct: 0.15, title: "Sleep it instead of screensaver", detail: "A screen-saver still burns full power. Actual sleep mode drops it to near nothing." },
      { id: "desktop-strip", kind: "habit", minutes: 1, upfront: 0, pct: 0.08, title: "Kill the whole desk at night", detail: "PC, monitor, speakers and printer on one power strip — one switch, zero standby drain." }
    ]},
    { id: "phone", name: "Phone charger", cat: "Study", watts: 8, hours: 3, days: 7, icon: "phone", blurb: "Honestly? This one's cheap to run.", actions: [
      { id: "phone-unplug", kind: "habit", minutes: 1, upfront: 0, pct: 0.10, title: "Unplug when it hits 100%", detail: "Leaving the block in 24/7 wastes a little power every hour. It's tiny — but it's free to fix." }
    ]},
    { id: "ledbulb", name: "LED bulbs", cat: "Lighting", watts: 30, hours: 5, days: 7, icon: "bulb", blurb: "Already efficient — just switch them off.", actions: [
      { id: "led-off", kind: "habit", minutes: 1, upfront: 0, pct: 0.15, title: "Lights off when you leave", detail: "The oldest trick in the book, and with LEDs it still adds up across a year." }
    ]},
    { id: "incanbulb", name: "Incandescent bulbs", cat: "Lighting", watts: 60, hours: 4, days: 7, icon: "bulb", blurb: "These old bulbs burn ~6× the power of LEDs.", actions: [
      { id: "incan-swap", kind: "upgrade", minutes: 10, upfront: 150, pct: 0.80, title: "Swap them for LEDs", detail: "Same light, about a sixth of the power. The bulbs pay for themselves within months." },
      { id: "incan-off", kind: "habit", minutes: 1, upfront: 0, pct: 0.10, title: "At least switch them off", detail: "While you save for the LEDs, make sure they're never burning in an empty room." }
    ]},
    { id: "fan", name: "Standing fan", cat: "Cooling", watts: 55, hours: 8, days: 7, icon: "fan", blurb: "Your cheapest cooling ally.", actions: [
      { id: "fan-breeze", kind: "habit", minutes: 1, upfront: 0, pct: 0.20, title: "Fan + cross-breeze beats AC", detail: "Open two windows and aim the fan at your body. Moving air feels cool for a fraction of AC power." },
      { id: "fan-clean", kind: "tweak", minutes: 10, upfront: 0, pct: 0.05, title: "Clean the blades and grille", detail: "Dust makes the motor work harder for the same breeze. A quick wipe every few weeks helps." }
    ]},
    { id: "ac", name: "Air conditioner", cat: "Cooling", watts: 1200, hours: 5, days: 5, icon: "ac", blurb: "The single biggest bill killer in a hot month.", actions: [
      { id: "ac-26", kind: "habit", minutes: 1, upfront: 0, pct: 0.20, title: "Run it at 26°C, not 18°C", detail: "Every degree colder costs more. 26°C plus a fan is comfortable and dramatically cheaper." },
      { id: "ac-service", kind: "tweak", minutes: 30, upfront: 0, pct: 0.10, title: "Wash the filter monthly", detail: "A clogged filter makes the compressor labour. A clean one means colder air for less power." },
      { id: "ac-timer", kind: "habit", minutes: 1, upfront: 0, pct: 0.08, title: "Timer it off before dawn", detail: "Set it to switch off an hour before you wake. The room stays cool, the bill stops early." }
    ]},
    { id: "kettle", name: "Electric kettle", cat: "Kitchen", watts: 1500, hours: 0.25, days: 7, icon: "kettle", blurb: "Tiny, but it pulls serious power while it's on.", actions: [
      { id: "kettle-amount", kind: "habit", minutes: 1, upfront: 0, pct: 0.30, title: "Boil only what you'll use", detail: "Heating a full kettle for one mug wastes most of the energy. Fill to the line you actually need." },
      { id: "kettle-flask", kind: "upgrade", minutes: 5, upfront: 300, pct: 0.10, title: "Keep a flask for the extra", detail: "Boil once, fill a flask, and skip reheating the same water three times a day." }
    ]},
    { id: "microwave", name: "Microwave", cat: "Kitchen", watts: 800, hours: 0.3, days: 7, icon: "microwave", blurb: "Fast cooking, less heat than the stove.", actions: [
      { id: "micro-power", kind: "habit", minutes: 1, upfront: 0, pct: 0.15, title: "Match the power to the portion", detail: "Reheating one plate on full blast wastes energy. Lower power for longer is gentler and cheaper." },
      { id: "micro-idle", kind: "habit", minutes: 1, upfront: 0, pct: 0.04, title: "Unplug it between meals", detail: "Its clock and standby light draw a tiny trickle all day, every day." }
    ]},
    { id: "iron", name: "Electric iron", cat: "Laundry", watts: 1000, hours: 0.5, days: 3, icon: "iron", blurb: "High wattage, but only for a few minutes.", actions: [
      { id: "iron-batch", kind: "habit", minutes: 1, upfront: 0, pct: 0.25, title: "Iron in one weekly batch", detail: "Each heat-up costs more than the ironing itself. Do it all at once so it only warms up once." },
      { id: "iron-heat", kind: "habit", minutes: 1, upfront: 0, pct: 0.10, title: "Use the lowest workable heat", detail: "Cotton blends and shirts usually don't need the max setting. Less heat, same crease-free result." }
    ]},
    { id: "washer", name: "Washing machine", cat: "Laundry", watts: 500, hours: 1, days: 3, icon: "washer", blurb: "A few loads a week matter less than you'd think.", actions: [
      { id: "washer-full", kind: "habit", minutes: 1, upfront: 0, pct: 0.25, title: "Only run full loads", detail: "Two half-loads cost more than one full one. Wait a day and wash everything together." },
      { id: "washer-cold", kind: "habit", minutes: 1, upfront: 0, pct: 0.20, title: "Wash cold when you can", detail: "If your machine heats its own water, a cold cycle skips the most expensive part of the wash." }
    ]},
    { id: "tv", name: "TV", cat: "Entertainment", watts: 80, hours: 4, days: 7, icon: "tv", blurb: "Mostly fine — until it naps in standby.", actions: [
      { id: "tv-bright", kind: "habit", minutes: 1, upfront: 0, pct: 0.12, title: "Drop the brightness", detail: "Most TVs ship at max brightness. A few clicks down saves power and is easier on your eyes." },
      { id: "tv-wall", kind: "habit", minutes: 1, upfront: 0, pct: 0.06, title: "Switch it off at the wall", detail: "Standby still draws power. A switchable strip kills it completely overnight." }
    ]},
    { id: "console", name: "Games console", cat: "Entertainment", watts: 120, hours: 3, days: 5, icon: "gamepad", blurb: "Fun, but it sips power even when idle.", actions: [
      { id: "console-off", kind: "habit", minutes: 1, upfront: 0, pct: 0.15, title: "Turn on auto-shutdown", detail: "Most consoles can power off after an hour of idle. It stops the 'accidentally on all weekend' tax." },
      { id: "console-strip", kind: "habit", minutes: 1, upfront: 0, pct: 0.05, title: "Put the whole setup on one strip", detail: "Console, TV and soundbar on a single switch means one flick kills all the standby drain." }
    ]},
    { id: "router", name: "Wi-Fi router", cat: "Study", watts: 10, hours: 24, days: 7, icon: "router", blurb: "Always-on, but it barely costs anything.", actions: [
      { id: "router-timer", kind: "tweak", minutes: 15, upfront: 0, pct: 0.33, title: "Put it on an overnight timer", detail: "If nobody's online from 2am to 8am, a cheap timer switch shuts it down for a third of the day." }
    ]},
    { id: "heater", name: "Water heater", cat: "Bathroom", watts: 2000, hours: 1, days: 7, icon: "heater", blurb: "Electric heating is the priciest thing you can plug in.", actions: [
      { id: "heater-short", kind: "habit", minutes: 1, upfront: 0, pct: 0.25, title: "Shorten the shower", detail: "This is the biggest single lever in most bills. Five minutes instead of ten can cut this cost in half." },
      { id: "heater-temp", kind: "tweak", minutes: 10, upfront: 0, pct: 0.15, title: "Lower the thermostat to ~50°C", detail: "You're mixing it with cold water anyway. A lower setting means the element runs less." }
    ]},
    { id: "blender", name: "Blender", cat: "Kitchen", watts: 300, hours: 0.15, days: 4, icon: "blender", blurb: "Short bursts, small impact.", actions: [
      { id: "blender-batch", kind: "habit", minutes: 1, upfront: 0, pct: 0.10, title: "Blend everything at once", detail: "Make the smoothie or sauce in one go instead of pulsing it on and off repeatedly." }
    ]},
    { id: "stove", name: "Electric stove / hot plate", cat: "Kitchen", watts: 1500, hours: 0.75, days: 7, icon: "stove", blurb: "Big power while it's on.", actions: [
      { id: "stove-lid", kind: "habit", minutes: 1, upfront: 0, pct: 0.15, title: "Lid on, pan matched", detail: "A covered pot on the right-sized burner cooks faster and wastes far less heat into the room." },
      { id: "stove-batch", kind: "habit", minutes: 5, upfront: 0, pct: 0.10, title: "Cook once, eat twice", detail: "Batch-cooking doubles your meals for the same energy — and cuts the 'what's for dinner' scramble." }
    ]},
    { id: "vacuum", name: "Vacuum cleaner", cat: "Other", watts: 600, hours: 0.5, days: 2, icon: "vacuum", blurb: "A quick blast every few days.", actions: [
      { id: "vacuum-filter", kind: "tweak", minutes: 10, upfront: 0, pct: 0.10, title: "Clean the filter and bag", detail: "A full bag makes the motor strain. Emptying it regularly keeps suction up and power down." }
    ]},
    { id: "dryer", name: "Hair dryer", cat: "Other", watts: 1200, hours: 0.25, days: 4, icon: "dryer", blurb: "High wattage, brief use.", actions: [
      { id: "dryer-towel", kind: "habit", minutes: 1, upfront: 0, pct: 0.20, title: "Towel-dry first", detail: "Squeeze the water out before the dryer goes on. Less water means less time on high heat." }
    ]},
    { id: "printer", name: "Printer", cat: "Study", watts: 50, hours: 0.25, days: 3, icon: "printer", blurb: "Rarely used, cheap to keep.", actions: [
      { id: "printer-duplex", kind: "habit", minutes: 1, upfront: 0, pct: 0.25, title: "Print duplex and power off", detail: "Print both sides and switch it off (not standby) when you're done. Small, but free." }
    ]}
  ];

  var DEFAULT_ITEMS = [
    { id: "fridge", qty: 1, watts: 90, hours: 24, days: 7 },
    { id: "radiator", qty: 1, watts: 1500, hours: 3, days: 7 },
    { id: "heater", qty: 1, watts: 2000, hours: 1, days: 7 },
    { id: "washer", qty: 1, watts: 500, hours: 1, days: 3 },
    { id: "laptop", qty: 1, watts: 65, hours: 6, days: 5 },
    { id: "tv", qty: 1, watts: 80, hours: 4, days: 7 },
    { id: "kettle", qty: 1, watts: 1500, hours: 0.25, days: 7 },
    { id: "ledbulb", qty: 1, watts: 30, hours: 5, days: 7 }
  ];

  /* ---------- State ---------- */
  var STORAGE_KEY = "unplug-app-v2";
  var state = {
    rate: 2.5,
    account: null, // { name, plan: 'standard'|'premium', joinedAt }
    items: [],
    done: []
  };
  var activeFilter = "all";
  var showAll = false;
  var catFilter = "all";
  var catQuery = "";
  var clearArmed = false;
  var clearTimer = null;
  var joinMode = "standard";

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          state = Object.assign({}, state, parsed);
        }
      }
    } catch (e) { /* ignore */ }
    if (!Array.isArray(state.items) || state.items.length === 0) {
      state.items = DEFAULT_ITEMS.map(function (d) { return Object.assign({}, d); });
    }
    if (!Array.isArray(state.done)) state.done = [];
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  /* ---------- Helpers ---------- */
  function $(sel) { return document.querySelector(sel); }
  function $all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  function clamp(n, lo, hi) {
    n = Number(n);
    if (!isFinite(n)) return lo;
    return Math.min(hi, Math.max(lo, n));
  }

  function fmtKr(n) {
    try {
      return Math.round(n).toLocaleString("sv-SE") + " kr";
    } catch (e) {
      return Math.round(n) + " kr";
    }
  }

  function byCatalogId(id) {
    for (var i = 0; i < CATALOG.length; i++) if (CATALOG[i].id === id) return CATALOG[i];
    return null;
  }

  function isPremium() {
    return !!(state.account && state.account.plan === "premium");
  }

  /* ---------- Calculation ---------- */
  function compute() {
    var items = [];
    state.items.forEach(function (it) {
      var cat = byCatalogId(it.id);
      if (!cat) return;
      var watts = clamp(it.watts, 1, 6000);
      var hours = clamp(it.hours, 0, 24);
      var days = clamp(it.days, 0, 7);
      var qty = clamp(it.qty, 1, 50);
      var kwh = (watts / 1000) * hours * days * (52 / 12) * qty;
      var cost = kwh * state.rate;
      items.push(Object.assign({}, cat, { watts: watts, hours: hours, days: days, qty: qty, kwh: kwh, cost: cost }));
    });
    items.sort(function (a, b) { return b.cost - a.cost; });

    var totalKwh = items.reduce(function (s, it) { return s + it.kwh; }, 0);
    var bill = totalKwh * state.rate;

    var actions = [];
    items.forEach(function (it) {
      (it.actions || []).forEach(function (a) {
        var savings = it.cost * a.pct;
        if (savings >= 5) {
          actions.push(Object.assign({}, a, {
            applianceId: it.id, applianceName: it.name, icon: it.icon, savings: savings
          }));
        }
      });
    });
    actions.sort(function (a, b) { return b.savings - a.savings; });

    var potential = actions.reduce(function (s, a) { return s + a.savings; }, 0);
    var locked = actions.filter(function (a) { return state.done.indexOf(a.id) !== -1; })
      .reduce(function (s, a) { return s + a.savings; }, 0);

    return {
      items: items, top: items[0] || null,
      totalKwh: totalKwh, bill: bill, annual: bill * 12, co2: totalKwh * 0.045,
      actions: actions, potential: potential, locked: locked
    };
  }

  function premiumBase(c) {
    return Math.round(c.potential * 0.45);
  }

  function currentSaving(c) {
    return isPremium() ? (premiumBase(c) + Math.round(c.locked)) : 0;
  }

  /* ---------- Render: appliances ---------- */
  function renderAppliances(c) {
    var list = $("#appliance-list");
    var empty = $("#builder-empty");
    var count = $("#appliance-count");
    count.textContent = c.items.length + (c.items.length === 1 ? " item" : " items");
    empty.hidden = c.items.length !== 0;
    list.hidden = c.items.length === 0;

    list.innerHTML = c.items.map(function (it) {
      var share = c.bill > 0 ? Math.round((it.cost / c.bill) * 100) : 0;
      var cheapNote = it.cost < 30 ? '<span class="cheap-note">≈ ' + fmtKr(it.cost) + '/mo — not the culprit</span>' : "";
      return (
        '<div class="appl-item" data-id="' + it.id + '">' +
          '<div class="appl-icon" aria-hidden="true">' + (ICONS[it.icon] || ICONS.bulb) + '</div>' +
          '<div class="appl-main">' +
            '<div class="appl-name-row"><h4>' + it.name + '</h4><span class="appl-share">' + share + '%</span></div>' +
            '<p class="appl-blurb">' + it.blurb + ' ' + cheapNote + '</p>' +
            '<div class="appl-fields">' +
              '<label>W <input type="number" data-field="watts" data-id="' + it.id + '" value="' + it.watts + '" min="1" step="1" inputmode="numeric" aria-label="Wattage of ' + it.name + '"></label>' +
              '<label>h/day <input type="number" data-field="hours" data-id="' + it.id + '" value="' + it.hours + '" min="0" step="0.5" inputmode="decimal" aria-label="Hours per day for ' + it.name + '"></label>' +
              '<label>d/wk <input type="number" data-field="days" data-id="' + it.id + '" value="' + it.days + '" min="0" step="1" inputmode="numeric" aria-label="Days per week for ' + it.name + '"></label>' +
              '<span class="qty">Qty <button type="button" data-qty="-1" data-id="' + it.id + '" aria-label="Decrease quantity">−</button><b>' + it.qty + '</b><button type="button" data-qty="1" data-id="' + it.id + '" aria-label="Increase quantity">+</button></span>' +
            '</div>' +
          '</div>' +
          '<div class="appl-cost">' +
            '<button class="appl-remove" type="button" data-remove="' + it.id + '" aria-label="Remove ' + it.name + '">✕</button>' +
            '<div><strong>' + fmtKr(it.cost) + '</strong><span>' + it.kwh.toFixed(1) + ' kWh/mo</span></div>' +
          '</div>' +
        '</div>'
      );
    }).join("");
  }

  /* ---------- Render: summary ---------- */
  function donutGradient(items, total) {
    if (!items.length || total <= 0) return "var(--line)";
    var acc = 0, parts = [];
    items.slice(0, 5).forEach(function (it, i) {
      var p = it.cost / total;
      var start = acc * 360, end = (acc + p) * 360;
      parts.push(COLORS[i] + " " + start.toFixed(2) + "deg " + end.toFixed(2) + "deg");
      acc += p;
    });
    if (acc < 1) parts.push(COLORS[7] + " " + (acc * 360).toFixed(2) + "deg 360deg");
    return "conic-gradient(" + parts.join(", ") + ")";
  }

  function renderSummary(c) {
    $("#bill-total").textContent = fmtKr(c.bill);
    $("#bill-sub").textContent = "across " + c.items.length + (c.items.length === 1 ? " appliance" : " appliances");
    $("#bill-annual").textContent = fmtKr(c.annual);
    $("#bill-co2").textContent = Math.round(c.co2) + " kg CO₂/mo";

    $("#donut").style.background = donutGradient(c.items, c.bill);
    $("#donut-total").textContent = fmtKr(c.bill);

    var legend = $("#donut-legend");
    if (c.items.length === 0) {
      legend.innerHTML = '<li><span class="leg-name">Add appliances to see the split</span></li>';
    } else {
      var top = c.items.slice(0, 4);
      var html = top.map(function (it, i) {
        return '<li><span class="swatch" style="background:' + COLORS[i] + '"></span>' +
          '<span class="leg-name">' + it.name + '</span><span class="leg-val">' + fmtKr(it.cost) + '</span></li>';
      }).join("");
      if (c.items.length > 4) {
        var other = c.items.slice(4).reduce(function (s, it) { return s + it.cost; }, 0);
        html += '<li><span class="swatch" style="background:' + COLORS[7] + '"></span>' +
          '<span class="leg-name">Everything else</span><span class="leg-val">' + fmtKr(other) + '</span></li>';
      }
      legend.innerHTML = html;
    }
  }

  /* ---------- Render: hero (landing) ---------- */
  function updateHero(c) {
    $("#hero-total").textContent = fmtKr(c.bill);
    $("#hero-items").textContent = c.items.length === 0
      ? "add something to get started"
      : "for " + c.items.length + " things you plug in";

    var bar = $("#hero-bar");
    if (c.items.length === 0 || c.bill <= 0) {
      bar.innerHTML = "";
    } else {
      bar.innerHTML = c.items.slice(0, 3).map(function (it, i) {
        var w = (it.cost / c.bill) * 100;
        return '<span style="width:' + w.toFixed(2) + '%;background:' + COLORS[i] + '"></span>';
      }).join("");
    }

    if (c.top) {
      $("#hero-top-icon").innerHTML = ICONS[c.top.icon] || ICONS.bulb;
      $("#hero-top-name").textContent = c.top.name;
      $("#hero-top-share").textContent = Math.round((c.top.cost / c.bill) * 100) + "%";
    } else {
      $("#hero-top-icon").innerHTML = ICONS.bulb;
      $("#hero-top-name").textContent = "Nothing yet";
      $("#hero-top-share").textContent = "—";
    }

    $("#hero-save").textContent = c.potential > 0
      ? "save up to " + fmtKr(c.potential) + "/mo"
      : "no leaks found yet";
  }

  /* ---------- Render: plan ---------- */
  function effortLabel(a) {
    if (a.kind === "habit") return "No spend";
    if (a.kind === "tweak") return a.minutes + " min";
    return "From " + fmtKr(a.upfront);
  }
  function tagLabel(a) {
    if (a.kind === "habit") return "Free win";
    if (a.kind === "tweak") return "Quick fix";
    return "Worth investing";
  }

  function renderPlan(c) {
    var premium = isPremium();
    $("#plan-locked").hidden = premium;
    $all("#plan-section .plan-stats, #plan-section .plan-filters, #plan-section .tips-list, #plan-section #plan-empty, #plan-section #show-more")
      .forEach(function (el) { el.hidden = !premium; });

    if (premium) {
      $("#plan-heading").textContent = "Your energy plan";
      $("#plan-heading-sub").textContent = "Ranked by impact — tick them off as you go.";
      $("#plan-count").textContent = c.actions.length;
      $("#plan-potential").textContent = fmtKr(c.potential);
      $("#plan-yearly").textContent = fmtKr(c.potential * 12);

      $("#plan-empty").hidden = c.actions.length !== 0;

      var filtered = c.actions.filter(function (a) { return activeFilter === "all" || a.kind === activeFilter; });
      var visible = showAll ? filtered : filtered.slice(0, 6);
      var list = $("#plan-list");
      var moreBtn = $("#show-more");

      if (filtered.length === 0) {
        list.innerHTML = "";
        moreBtn.hidden = true;
        return;
      }

      var featuredId = c.actions[0] ? c.actions[0].id : null;
      list.innerHTML = visible.map(function (a) {
        var done = state.done.indexOf(a.id) !== -1;
        var featured = activeFilter === "all" && a.id === featuredId;
        var payback = a.upfront > 0 && a.savings > 0 ? '<span>≈ ' + Math.max(1, Math.round(a.upfront / a.savings)) + ' mo payback</span>' : "";
        return (
          '<article class="action' + (done ? " is-done" : "") + (featured ? " is-featured" : "") + '">' +
            '<label class="action-check">' +
              '<input type="checkbox" data-done="' + a.id + '"' + (done ? " checked" : "") + ' aria-label="Mark ' + a.title + ' as done">' +
              '<span class="box"></span>' +
            '</label>' +
            '<div class="action-body">' +
              '<div class="action-top"><span class="action-tag">' + tagLabel(a) + '</span><span class="action-impact">+' + fmtKr(a.savings) + '/mo</span></div>' +
              '<h4 class="action-title">' + a.title + '</h4>' +
              '<p class="action-detail">' + a.detail + '</p>' +
              '<div class="action-meta"><span>' + a.applianceName + '</span><span>' + effortLabel(a) + '</span>' + payback + '</div>' +
            '</div>' +
          '</article>'
        );
      }).join("");

      if (filtered.length > 6) {
        moreBtn.hidden = false;
        moreBtn.textContent = showAll ? "Show fewer tips" : "Show all " + filtered.length + " tips";
      } else {
        moreBtn.hidden = true;
      }
    } else {
      $("#plan-heading").textContent = "Your energy plan";
      $("#plan-heading-sub").textContent = "A Premium feature that starts managing your energy from day one.";
    }
  }

  /* ---------- Render: dashboard ---------- */
  function renderDashboard() {
    var c = compute();
    var premium = isPremium();

    $("#dash-greeting").textContent = state.account ? "Hej " + state.account.name + " 👋" : "Hej 👋";
    $("#dash-sub").textContent = premium
      ? "Your energy plan is running — here's this month."
      : "Here's what your electricity is doing this month.";

    // Tier chrome
    $("#topbar-tier").textContent = premium ? "Premium" : "Standard";
    $("#topbar-tier").classList.toggle("is-premium", premium);
    $("#upgrade-banner").hidden = premium;

    var name = state.account ? state.account.name : "You";
    $("#user-name").textContent = name;
    $("#user-tier").textContent = premium ? "Premium" : "Standard";
    $("#user-avatar").textContent = (name.charAt(0) || "U").toUpperCase();

    var tierCard = $("#sidebar-tier");
    if (premium) {
      tierCard.innerHTML = '<span class="tier-title">Premium active</span><span class="tier-sub">65 kr/month — we\'re on it.</span>';
    } else {
      tierCard.innerHTML = '<span class="tier-title">Standard</span><span class="tier-sub">Free — see what uses your power.</span>' +
        '<button class="btn btn-lime" type="button" data-upgrade>Upgrade — 65 kr/mo</button>';
    }

    // KPIs
    $("#kpi-bill").textContent = fmtKr(c.bill);
    $("#kpi-bill-sub").textContent = "across " + c.items.length + " appliances";
    if (c.top) {
      $("#kpi-drain").textContent = c.top.name;
      $("#kpi-drain-sub").textContent = Math.round((c.top.cost / c.bill) * 100) + "% of your bill";
    } else {
      $("#kpi-drain").textContent = "—";
      $("#kpi-drain-sub").textContent = "add appliances";
    }
    if (premium) {
      $("#kpi-save-label").textContent = "Monthly saving";
      $("#kpi-save").textContent = fmtKr(currentSaving(c));
      $("#kpi-save-sub").textContent = "day-one plan + your fixes";
    } else {
      $("#kpi-save-label").textContent = "Potential saving";
      $("#kpi-save").textContent = "up to " + fmtKr(c.potential);
      $("#kpi-save-sub").textContent = "unlock the plan with Premium";
    }

    renderAppliances(c);
    renderSummary(c);
    renderPlan(c);
  }

  /* ---------- Render: savings ---------- */
  function last12Labels() {
    var m = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
    var out = [];
    var now = new Date();
    for (var i = 11; i >= 0; i--) {
      var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      out.push(m[d.getMonth()]);
    }
    return out;
  }

  function monthlySavings() {
    var c = compute();
    var labels = last12Labels();
    if (!isPremium()) {
      return { labels: labels, amounts: labels.map(function () { return 0; }), month: 0, total: 0, year: c.potential * 12, potential: c.potential, premium: false };
    }
    var base = premiumBase(c);
    var current = base + Math.round(c.locked);
    var curve = [0.2, 0.3, 0.38, 0.47, 0.55, 0.62, 0.7, 0.78, 0.85, 0.92, 0.97, 1.0];
    var amounts = labels.map(function (l, i) { return Math.round(current * curve[i]); });
    var total = amounts.reduce(function (s, a) { return s + a; }, 0);
    return { labels: labels, amounts: amounts, month: current, total: total, year: current * 12, potential: c.potential, premium: true };
  }

  function renderSavings() {
    var s = monthlySavings();
    var premium = s.premium;

    $("#sav-upgrade").hidden = premium;
    $("#chart-card").hidden = !premium;

    if (premium) {
      $("#sav-month").textContent = fmtKr(s.month);
      $("#sav-total").textContent = fmtKr(s.total);
      $("#sav-year").textContent = fmtKr(s.year);
      $("#sav-note").textContent = "Estimated — demo data";
    } else {
      $("#sav-month").textContent = "0 kr";
      $("#sav-total").textContent = "0 kr";
      $("#sav-year").textContent = fmtKr(s.year);
    }

    if (premium) {
      var max = Math.max.apply(null, s.amounts.concat([1]));
      var chart = $("#savings-chart");
      chart.innerHTML = s.amounts.map(function (amt, i) {
        var h = amt > 0 ? Math.max((amt / max) * 100, 4) : 0;
        return '<div class="bar-col">' +
          '<span class="bar-val">' + (amt > 0 ? fmtKr(amt) : "") + '</span>' +
          '<div class="bar' + (amt === 0 ? " zero" : "") + '" style="height:' + h.toFixed(1) + '%"></div>' +
          '<span class="bar-label">' + s.labels[i] + '</span></div>';
      }).join("");

      var list = $("#savings-list");
      list.innerHTML = s.amounts.map(function (amt, i) {
        return '<li><span class="sav-month-label">' + s.labels[i] + '</span>' +
          '<span class="sav-amount' + (amt === 0 ? " zero" : "") + '">' + (amt > 0 ? fmtKr(amt) : "0 kr") + '</span></li>';
      }).join("");
    }
  }

  /* ---------- Render: community ---------- */
  function renderCommunity() {
    var premium = isPremium();
    $("#comm-cta-btn").hidden = premium;
    $("#comm-cta-text").textContent = premium
      ? "You're part of it — keep going. 💪"
      : "Start saving like they did.";
  }

  /* ---------- Render: catalog dialog ---------- */
  function renderCatalog() {
    var cats = ["all"];
    CATALOG.forEach(function (c) { if (cats.indexOf(c.cat) === -1) cats.push(c.cat); });

    $("#catalog-chips").innerHTML = cats.map(function (cat) {
      return '<button class="chip' + (catFilter === cat ? " is-active" : "") + '" data-cat="' + cat + '" type="button">' +
        (cat === "all" ? "All" : cat) + '</button>';
    }).join("");

    var q = catQuery.trim().toLowerCase();
    var rows = CATALOG.filter(function (c) {
      var inCat = catFilter === "all" || c.cat === catFilter;
      var inQ = !q || c.name.toLowerCase().indexOf(q) !== -1;
      return inCat && inQ;
    });

    var list = $("#catalog-list");
    if (rows.length === 0) {
      list.innerHTML = '<div class="cat-none">No appliances match “' + catQuery + '”. Try “heater” or “fridge”.</div>';
      return;
    }

    list.innerHTML = rows.map(function (c) {
      var added = state.items.some(function (it) { return it.id === c.id; });
      return (
        '<div class="cat-item">' +
          '<div class="cat-icon" aria-hidden="true">' + (ICONS[c.icon] || ICONS.bulb) + '</div>' +
          '<div class="cat-main"><b>' + c.name + '</b><span>' + c.watts + 'W · ' + c.cat + '</span></div>' +
          '<button class="cat-add' + (added ? " is-added" : "") + '" data-add="' + c.id + '" type="button">' + (added ? "Add another" : "Add") + '</button>' +
        '</div>'
      );
    }).join("");
  }

  /* ---------- Toast ---------- */
  var toastTimer = null;
  function showToast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-visible");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("is-visible"); }, 2400);
  }

  /* ---------- Routing ---------- */
  var VIEW_TITLES = { dashboard: "Dashboard", savings: "My savings", community: "Community" };

  function switchView(name) {
    ["dashboard", "savings", "community"].forEach(function (v) {
      $("#view-" + v).hidden = v !== name;
    });
    $all(".side-link").forEach(function (b) {
      b.classList.toggle("is-active", b.dataset.view === name);
    });
    $("#topbar-title").textContent = VIEW_TITLES[name] || "Dashboard";
    closeSidebar();
    if (name === "dashboard") renderDashboard();
    if (name === "savings") renderSavings();
    if (name === "community") renderCommunity();
  }

  function showApp() {
    $("#landing").hidden = true;
    $("#app-shell").hidden = false;
    switchView("dashboard");
  }

  function showLanding() {
    $("#app-shell").hidden = true;
    $("#landing").hidden = false;
    window.scrollTo(0, 0);
  }

  function openSidebar() {
    $("#sidebar").classList.add("is-open");
    $("#sidebar-backdrop").classList.add("is-visible");
  }
  function closeSidebar() {
    $("#sidebar").classList.remove("is-open");
    $("#sidebar-backdrop").classList.remove("is-visible");
  }

  /* ---------- Join flow ---------- */
  function selectedPlan() {
    var r = document.querySelector('input[name="join-plan"]:checked');
    return r ? r.value : "standard";
  }

  function setJoinStep(n) {
    [1, 2, 3].forEach(function (i) {
      var el = document.querySelector('.join-step[data-step="' + i + '"]');
      if (el) el.hidden = i !== n;
    });
  }

  function updateJoinPlanUI() {
    var plan = selectedPlan();
    $("#join-payment").hidden = plan !== "premium";
    var isUpgrade = !!state.account;
    var label = plan === "premium" ? (isUpgrade ? "Upgrade to Premium" : "Start Premium — 65 kr/mo") : "Start my account";
    $("#join-start").textContent = label;
  }

  function openJoin(plan) {
    joinMode = plan || "standard";
    var isUpgrade = !!state.account;
    $("#join-name").value = state.account ? state.account.name : "";
    $("#join-name-error").hidden = true;
    $("#pay-error").hidden = true;
    $('input[name="join-plan"][value="' + joinMode + '"]').checked = true;
    updateJoinPlanUI();
    setJoinStep(isUpgrade ? 2 : 1);
    var d = $("#join-dialog");
    if (typeof d.showModal === "function") d.showModal();
    else d.setAttribute("open", "");
  }

  function finishJoin() {
    var plan = selectedPlan();
    var name = state.account ? state.account.name : $("#join-name").value.trim();

    if (!state.account && !name) {
      $("#join-name-error").hidden = false;
      setJoinStep(1);
      return;
    }
    if (plan === "premium") {
      var card = $("#pay-card").value.trim();
      var exp = $("#pay-exp").value.trim();
      var cvc = $("#pay-cvc").value.trim();
      if (!card || !exp || !cvc) {
        $("#pay-error").hidden = false;
        return;
      }
    }

    if (state.account) {
      state.account.plan = plan;
    } else {
      state.account = { name: name, plan: plan, joinedAt: Date.now() };
    }
    saveState();

    setJoinStep(3);
    var title = plan === "premium" ? "Premium is on. 🎉" : "Welcome aboard!";
    var sub = plan === "premium"
      ? "Your energy plan starts working today."
      : "Your dashboard is ready.";
    $("#join-success-title").textContent = title;
    $("#join-success-sub").textContent = sub;

    setTimeout(function () {
      $("#join-dialog").close();
      showApp();
      showToast(plan === "premium" ? "Premium active — welcome!" : "Account created");
    }, 900);
  }

  /* ---------- Appliance actions ---------- */
  function addAppliance(id) {
    var existing = state.items.find(function (it) { return it.id === id; });
    if (existing) {
      existing.qty = clamp((existing.qty || 1) + 1, 1, 50);
      showToast(byCatalogId(id).name + " quantity +1");
    } else {
      var c = byCatalogId(id);
      state.items.push({ id: id, qty: 1, watts: c.watts, hours: c.hours, days: c.days });
      showToast(c.name + " added");
    }
    saveState();
    renderDashboard();
    renderCatalog();
  }

  function removeAppliance(id) {
    var cat = byCatalogId(id);
    state.items = state.items.filter(function (it) { return it.id !== id; });
    saveState();
    renderDashboard();
    renderCatalog();
    if (cat) showToast(cat.name + " removed");
  }

  /* ---------- Events ---------- */
  function bind() {
    // Landing + upgrade triggers (delegated)
    document.addEventListener("click", function (e) {
      var joinBtn = e.target.closest(".js-join");
      if (joinBtn) { openJoin(joinBtn.dataset.plan); return; }
      var upgradeBtn = e.target.closest("[data-upgrade]");
      if (upgradeBtn) { openJoin("premium"); return; }
    });

    // Sidebar navigation
    $all(".side-link").forEach(function (b) {
      b.addEventListener("click", function () { switchView(b.dataset.view); });
    });
    $("#menu-btn").addEventListener("click", openSidebar);
    $("#sidebar-close").addEventListener("click", closeSidebar);
    $("#sidebar-backdrop").addEventListener("click", closeSidebar);
    $("#sign-out").addEventListener("click", function () {
      state.account = null;
      saveState();
      showLanding();
      showToast("Signed out");
    });
    $("#side-brand").addEventListener("click", function (e) { e.preventDefault(); });

    // Appliance list
    $("#appliance-list").addEventListener("change", function (e) {
      var input = e.target.closest("input[data-field]");
      if (!input) return;
      var item = state.items.find(function (it) { return it.id === input.dataset.id; });
      if (!item) return;
      var field = input.dataset.field;
      var val = parseFloat(input.value);
      if (field === "watts") item.watts = clamp(val, 1, 6000);
      else if (field === "hours") item.hours = clamp(val, 0, 24);
      else if (field === "days") item.days = clamp(val, 0, 7);
      saveState();
      renderDashboard();
    });

    $("#appliance-list").addEventListener("click", function (e) {
      var qtyBtn = e.target.closest("[data-qty]");
      if (qtyBtn) {
        var item = state.items.find(function (it) { return it.id === qtyBtn.dataset.id; });
        if (item) {
          item.qty = clamp((item.qty || 1) + Number(qtyBtn.dataset.qty), 1, 50);
          saveState();
          renderDashboard();
        }
        return;
      }
      var rmBtn = e.target.closest("[data-remove]");
      if (rmBtn) removeAppliance(rmBtn.dataset.remove);
    });

    // Rate input (live, without rebuilding list)
    $("#rate-input").addEventListener("input", function () {
      var v = parseFloat(this.value);
      if (isFinite(v) && v > 0) state.rate = v;
      saveState();
      var c = compute();
      renderSummary(c);
      updateHero(c);
      renderDashboard();
    });

    // Plan checkboxes
    $("#plan-list").addEventListener("change", function (e) {
      var box = e.target.closest("input[data-done]");
      if (!box) return;
      var id = box.dataset.done;
      var idx = state.done.indexOf(id);
      if (box.checked && idx === -1) {
        state.done.push(id);
        var a = compute().actions.find(function (x) { return x.id === id; });
        showToast(a ? "+" + fmtKr(a.savings) + "/mo locked in" : "Locked in");
      } else if (!box.checked && idx !== -1) {
        state.done.splice(idx, 1);
      }
      saveState();
      renderDashboard();
      if (!$("#view-savings").hidden) renderSavings();
    });

    // Plan filters
    $("#plan-filters").addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      activeFilter = chip.dataset.filter;
      showAll = false;
      $all("#plan-filters .chip").forEach(function (c) { c.classList.toggle("is-active", c === chip); });
      renderPlan(compute());
    });

    // Show more
    $("#show-more").addEventListener("click", function () {
      showAll = !showAll;
      renderPlan(compute());
    });

    // Builder buttons
    $("#open-catalog").addEventListener("click", function () {
      catQuery = "";
      $("#catalog-search").value = "";
      catFilter = "all";
      renderCatalog();
      var d = $("#catalog-dialog");
      if (typeof d.showModal === "function") d.showModal();
      else d.setAttribute("open", "");
    });

    $("#load-sample").addEventListener("click", function () {
      state.items = DEFAULT_ITEMS.map(function (d) { return Object.assign({}, d); });
      saveState();
      renderDashboard();
      showToast("Typical flat loaded");
    });

    $("#clear-all").addEventListener("click", function () {
      if (!clearArmed) {
        clearArmed = true;
        this.textContent = "Sure — clear all?";
        this.classList.add("btn-danger");
        if (clearTimer) clearTimeout(clearTimer);
        clearTimer = setTimeout(function () { disarmClear(); }, 3000);
        return;
      }
      disarmClear();
      state.items = [];
      saveState();
      renderDashboard();
      showToast("Cleared — start fresh");
    });

    // Catalog dialog
    $("#catalog-close").addEventListener("click", function () { $("#catalog-dialog").close(); });
    $("#catalog-done").addEventListener("click", function () { $("#catalog-dialog").close(); });
    $("#catalog-search").addEventListener("input", function () { catQuery = this.value; renderCatalog(); });
    $("#catalog-chips").addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      catFilter = chip.dataset.cat;
      renderCatalog();
    });
    $("#catalog-list").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-add]");
      if (btn) addAppliance(btn.dataset.add);
    });
    $("#catalog-dialog").addEventListener("click", function (e) { if (e.target === this) this.close(); });

    // Join dialog
    $("#join-close").addEventListener("click", function () { $("#join-dialog").close(); });
    $("#join-dialog").addEventListener("click", function (e) { if (e.target === this) this.close(); });
    $("#join-next").addEventListener("click", function () {
      var name = $("#join-name").value.trim();
      if (!name) { $("#join-name-error").hidden = false; return; }
      $("#join-name-error").hidden = true;
      setJoinStep(2);
    });
    $("#join-back").addEventListener("click", function () { setJoinStep(1); });
    $("#join-start").addEventListener("click", finishJoin);
    $all('input[name="join-plan"]').forEach(function (r) {
      r.addEventListener("change", updateJoinPlanUI);
    });
  }

  function disarmClear() {
    clearArmed = false;
    var btn = $("#clear-all");
    btn.textContent = "Clear all";
    btn.classList.remove("btn-danger");
  }

  /* ---------- Init ---------- */
  function init() {
    loadState();
    $("#rate-input").value = state.rate;
    updateHero(compute());

    if (state.account) {
      showApp();
    } else {
      showLanding();
    }
    bind();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
