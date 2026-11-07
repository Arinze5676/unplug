"""Build the unplug. pitch deck (16:9)."""
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# Brand palette
INK      = RGBColor(0x12, 0x20, 0x19)
FOREST   = RGBColor(0x17, 0x33, 0x2A)
FOREST2  = RGBColor(0x0E, 0x21, 0x1A)
PAPER    = RGBColor(0xF5, 0xF1, 0xE7)
CREAM    = RGBColor(0xFB, 0xF9, 0xF2)
CARD     = RGBColor(0xFF, 0xFD, 0xF7)
LIME     = RGBColor(0xD9, 0xF2, 0x73)
LIME2    = RGBColor(0xC4, 0xE8, 0x54)
CORAL    = RGBColor(0xF4, 0x70, 0x5A)
CORAL_D  = RGBColor(0xE6, 0x5A, 0x43)
MUTED    = RGBColor(0x66, 0x72, 0x6A)
MUTED_L  = RGBColor(0x8B, 0x93, 0x8C)
SKY      = RGBColor(0xA9, 0xC9, 0xF0)

BODY = "Segoe UI"
DISP = "Georgia"

SW, SH = Inches(13.333), Inches(7.5)

prs = Presentation()
prs.slide_width = SW
prs.slide_height = SH
BLANK = prs.slide_layouts[6]


def bg(slide, color):
    slide.background.fill.solid()
    slide.background.fill.fore_color.rgb = color


def box(slide, x, y, w, h):
    return slide.shapes.add_textbox(x, y, w, h)


def add_p(tf, runs, align=PP_ALIGN.LEFT, before=0, after=0, spacing=None, first=False):
    p = tf.paragraphs[0] if first else tf.add_paragraph()
    p.alignment = align
    p.space_before = Pt(before)
    p.space_after = Pt(after)
    if spacing is not None:
        p.line_spacing = spacing
    for (text, size, color, bold, font, italic) in runs:
        r = p.add_run()
        r.text = text
        r.font.size = Pt(size)
        r.font.color.rgb = color
        r.font.bold = bold
        r.font.name = font
        r.font.italic = italic
    return p


def text(slide, x, y, w, h, runs, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, wrap=True, spacing=None):
    b = box(slide, x, y, w, h)
    tf = b.text_frame
    tf.word_wrap = wrap
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    add_p(tf, runs, align=align, spacing=spacing, first=True)
    return b


def card(slide, x, y, w, h, fill, line=None, radius=None):
    shp = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h)
    shp.fill.solid()
    shp.fill.fore_color.rgb = fill
    if line is None:
        shp.line.fill.background()
    else:
        shp.line.color.rgb = line
        shp.line.width = Pt(1.25)
    if radius is not None:
        try:
            shp.adjustments[0] = radius
        except Exception:
            pass
    tf = shp.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(0.18)
    tf.margin_top = tf.margin_bottom = Inches(0.14)
    return shp


def kicker(slide, text_, color, x, y, w=Inches(6)):
    text(slide, x, y, w, Inches(0.4),
         [(text_.upper(), 13, color, True, BODY, False)])


def headline(slide, text_, color, x, y, w, size=40):
    text(slide, x, y, w, Inches(1.2), [(text_, size, color, True, DISP, False)])


def notes(slide, content):
    slide.notes_slide.notes_text_frame.text = content


# ---------------------------------------------------------------- Slide 1 — Title
s = prs.slides.add_slide(BLANK)
bg(s, FOREST2)
# big wordmark
text(s, Inches(0.9), Inches(2.15), Inches(11.5), Inches(1.5),
     [("unplug", 92, LIME, True, DISP, True), (".", 92, CORAL, True, DISP, True)])
text(s, Inches(0.92), Inches(3.6), Inches(11.5), Inches(0.7),
     [("Less bill. More life.", 30, CREAM, False, BODY, False)])
text(s, Inches(0.92), Inches(4.35), Inches(11.5), Inches(0.5),
     [("A 3-minute electricity checkup for student flats", 20, MUTED_L, False, BODY, False)])
text(s, Inches(0.92), Inches(6.6), Inches(11.5), Inches(0.4),
     [("3-minute pitch  ·  live demo included  ·  sources cited", 13, MUTED_L, False, BODY, False)])
notes(s, "HOOK (0:00-0:20): Every student flat has a villain — the heater, the boiler, standby electronics. Nobody can see it; you just get a bill. Play the unplugging intro animation.")

# ---------------------------------------------------------------- Slide 2 — Problem
s = prs.slides.add_slide(BLANK)
bg(s, PAPER)
kicker(s, "The problem", CORAL_D, Inches(0.9), Inches(0.7))
headline(s, "Your bill is a black box.", INK, Inches(0.9), Inches(1.25), Inches(11.5), 46)
text(s, Inches(0.9), Inches(2.15), Inches(10.5), Inches(0.6),
     [("Students overpay because they can't see what's using their electricity.", 18, MUTED, False, BODY, False)])

cards = [
    ("Invisible", "You can't tell which appliance is costing you money — the bill just shows one total."),
    ("Generic advice", "\u201cSave energy!\u201d — but no one says what to actually unplug in your flat."),
    ("Rising prices", "Volatile tariffs make guessing expensive, and students feel it first."),
]
x = Inches(0.9)
for i, (t, d) in enumerate(cards):
    c = card(s, x, Inches(3.15), Inches(3.75), Inches(2.9), CARD)
    add_p(c.text_frame, [(t, 24, INK, True, DISP, False)], first=True)
    add_p(c.text_frame, [(d, 15, MUTED, False, BODY, False)], before=8, spacing=1.1)
    x = x + Inches(3.75) + Inches(0.22)
notes(s, "PROBLEM (0:20-0:50): Black-box bills, generic advice, moving prices. ~30 seconds.")

# ---------------------------------------------------------------- Slide 3 — Solution
s = prs.slides.add_slide(BLANK)
bg(s, PAPER)
kicker(s, "The solution", CORAL_D, Inches(0.9), Inches(0.6))
headline(s, "Find the villain. Fix it.", INK, Inches(0.9), Inches(1.15), Inches(11.5), 44)

# Standard card
c = card(s, Inches(0.9), Inches(2.6), Inches(5.7), Inches(3.7), CARD)
add_p(c.text_frame, [("Standard", 26, INK, True, DISP, False), ("   ", 14, INK, False, BODY, False), ("0 kr / month", 16, MUTED, True, BODY, False)], first=True)
add_p(c.text_frame, [("See what's using your power.", 15, MUTED, False, BODY, False)], before=6)
for b in ["Monthly appliance breakdown", "Biggest-drain ranking", "Typical wattage library"]:
    add_p(c.text_frame, [("✓  ", 15, CORAL_D, True, BODY, False), (b, 15, INK, False, BODY, False)], before=6)

# Premium card (lime)
c = card(s, Inches(6.72), Inches(2.6), Inches(5.7), Inches(3.7), LIME)
add_p(c.text_frame, [("Premium", 26, INK, True, DISP, False), ("   ", 14, INK, False, BODY, False), ("65 kr / month", 16, INK, True, BODY, False)], first=True)
add_p(c.text_frame, [("We manage your energy from day one.", 15, INK, False, BODY, False)], before=6)
for b in ["Personal energy plan", "Action-by-action savings tracking", "Month-by-month savings history"]:
    add_p(c.text_frame, [("✓  ", 15, INK, True, BODY, False), (b, 15, INK, False, BODY, False)], before=6)

text(s, Inches(0.9), Inches(6.5), Inches(11.5), Inches(0.4),
     [("Demo runs live in the browser — join free; Premium upgrade is simulated (no real charge).", 13, MUTED_L, False, BODY, False)])
notes(s, "SOLUTION + DEMO (0:50-1:40): Show the live dashboard. Typical flat = 758 kr/month, heater = 45%. One thermostat change = 68 kr/month. Premium 65 kr manages from day one.")

# ---------------------------------------------------------------- Slide 4 — Impact (savings)
s = prs.slides.add_slide(BLANK)
bg(s, FOREST2)
kicker(s, "Expected impact", LIME, Inches(0.9), Inches(0.55))
headline(s, "Savings per student, per year", CREAM, Inches(0.9), Inches(1.05), Inches(11.5), 42)

stats = [
    ("≈ 400 kWh", "electricity saved", LIME),
    ("≈ 800 SEK", "money saved", CORAL),
    ("≈ 36 kg CO₂e", "emissions avoided", SKY),
]
x = Inches(0.9)
for num, lab, accent in stats:
    c = card(s, x, Inches(2.35), Inches(3.75), Inches(2.0), INK)
    c.line.color.rgb = accent
    c.line.width = Pt(1.5)
    add_p(c.text_frame, [(num, 44, accent, True, DISP, False)], align=PP_ALIGN.CENTER, first=True)
    add_p(c.text_frame, [(lab, 15, CREAM, False, BODY, False)], align=PP_ALIGN.CENTER, before=6)
    x = x + Inches(3.75) + Inches(0.22)

text(s, Inches(0.9), Inches(4.65), Inches(11.5), Inches(0.5),
     [("≈ 20% of a typical 1-room flat (2,000 kWh/yr)  ·  roughly 2× if electric heating is in the bill", 15, CREAM, False, BODY, False)])
text(s, Inches(0.9), Inches(5.2), Inches(11.5), Inches(0.5),
     [("If 10,000 students use it:  4 GWh  ·  8 M SEK  ·  360 t CO₂e", 16, LIME, True, BODY, False)])

# Sources footnote
src = ("Sources: Consumption — Energimyndigheten (1-room flat ≈ 1,500–2,500 kWh/yr). Price — SCB household electricity ≈ 2.0 SEK/kWh incl. grid & taxes. "
       "CO₂e — Swedish residual mix ≈ 90 g CO₂e/kWh (AIB 2024 / Ei). Saving % — behavioural feedback 10–30% (ScienceDirect). "
       "Assumptions: 2,000 kWh × 20% × 2.0 SEK/kWh × 0.090 kg/kWh.")
text(s, Inches(0.9), Inches(6.55), Inches(11.5), Inches(0.75), [(src, 10.5, MUTED_L, False, BODY, False)], spacing=1.05)
notes(s, "IMPACT (1:40-2:10): Expected saving per student/year ≈ 400 kWh, 800 SEK, 36 kg CO2e (~20% of a 2,000 kWh baseline). Doubles with electric heating. 10,000 students -> 4 GWh / 8 M SEK / 360 t CO2e. Sources on slide.")

# ---------------------------------------------------------------- Slide 5 — Business
s = prs.slides.add_slide(BLANK)
bg(s, PAPER)
kicker(s, "The model", CORAL_D, Inches(0.9), Inches(0.6))
headline(s, "Free to see. 65 kr to manage.", INK, Inches(0.9), Inches(1.15), Inches(11.5), 44)

cols = [
    ("Hook", "A free diagnostic gets students in the door — instant value, no card."),
    ("Convert", "65 kr/month Premium pays for itself, then keeps paying the student."),
    ("Scale", "One flat's data multiplies: shared flats, halls, and whole buildings."),
]
x = Inches(0.9)
for t, d in cols:
    c = card(s, x, Inches(2.55), Inches(3.75), Inches(2.5), CARD)
    add_p(c.text_frame, [("0%d" % (i + 1), 20, CORAL_D, True, DISP, False)], first=True)
    add_p(c.text_frame, [(t, 22, INK, True, DISP, False)], before=2)
    add_p(c.text_frame, [(d, 14.5, MUTED, False, BODY, False)], before=8, spacing=1.1)
    x = x + Inches(3.75) + Inches(0.22)

text(s, Inches(0.9), Inches(5.5), Inches(11.5), Inches(0.6),
     [("Why now:  ", 16, INK, True, BODY, False),
      ("volatile energy prices  ·  cost-conscious students  ·  climate focus at an all-time high", 16, MUTED, False, BODY, False)])
notes(s, "BUSINESS (2:10-2:50): Free diagnostic hooks; 65 kr Premium pays for itself; per-flat data scales. Why now: volatile prices, cost-conscious students, climate focus.")

# ---------------------------------------------------------------- Slide 6 — Close
s = prs.slides.add_slide(BLANK)
bg(s, FOREST2)
text(s, Inches(0.9), Inches(2.3), Inches(11.5), Inches(1.3),
     [("unplug", 84, LIME, True, DISP, True), (".", 84, CORAL, True, DISP, True)])
text(s, Inches(0.92), Inches(3.55), Inches(11.5), Inches(0.7),
     [("Less bill. More life.", 28, CREAM, False, BODY, False)])
text(s, Inches(0.92), Inches(4.4), Inches(11.5), Inches(0.5),
     [("Try the demo — it's live right now.", 20, MUTED_L, False, BODY, False)])
text(s, Inches(0.92), Inches(6.6), Inches(11.5), Inches(0.4),
     [("unplug. checkup  ·  github.com/…  ·  sources on the impact slide", 13, MUTED_L, False, BODY, False)])
notes(s, "CLOSE (2:50-3:00): unplug. — less bill, more life. Demo is running; come unplug something. Hard stop at 3:00.")

prs.save("pitch-deck.pptx")
print("saved pitch-deck.pptx")
