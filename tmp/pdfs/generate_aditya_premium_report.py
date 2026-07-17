from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
    Flowable,
    KeepTogether,
    NextPageTemplate,
)
from reportlab.pdfbase.pdfmetrics import stringWidth
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
WEBROOT = Path(r"C:\Code\Aquamundi\custom_threejs_model")
OUT = ROOT / "output" / "pdf" / "Aditya_Singh_Internship_Final_Report_Premium.pdf"
ASSET_ROOT = WEBROOT if WEBROOT.exists() else ROOT
LOGO = ASSET_ROOT / "public" / "NahiaraLogo.png"
COVER_ART = ASSET_ROOT / "public" / "bg_image.png"
BOOK = ASSET_ROOT / "public" / "books" / "1.png"
CARD_BACK = ASSET_ROOT / "public" / "Digital cards - Vol 1" / "Back card.png"
FLOWER = ASSET_ROOT / "public" / "complete-flowers" / "Espana.png"
FLOWER_ALT = ASSET_ROOT / "public" / "complete-flowers" / "Tanzania.png"
GUARDIAN_WATER = ASSET_ROOT / "public" / "Digital cards - Vol 1" / "Guardians" / "Guardian_water.png"
GUARDIAN_EDU = ASSET_ROOT / "public" / "Digital cards - Vol 1" / "Guardians" / "Guardian_education.png"
NAHIARA_CARD = ASSET_ROOT / "public" / "Digital cards - Vol 1" / "Guardians" / "Nahiara_wildcard.png"
HUMMINGBIRD = ASSET_ROOT / "public" / "pollinators" / "hummingbird.jpg"
BUMBLEBEE = ASSET_ROOT / "public" / "pollinators" / "bumblebee.jpg"

PAGE_W, PAGE_H = A4


PALETTE = {
    "ink": colors.HexColor("#15211f"),
    "muted": colors.HexColor("#5f6f6a"),
    "line": colors.HexColor("#d7e2dd"),
    "paper": colors.HexColor("#fbfaf6"),
    "mint": colors.HexColor("#dfeee7"),
    "sage": colors.HexColor("#86a893"),
    "teal": colors.HexColor("#176a6c"),
    "gold": colors.HexColor("#c6923a"),
    "rose": colors.HexColor("#d86575"),
    "navy": colors.HexColor("#19324a"),
    "white": colors.white,
}


class Rule(Flowable):
    def __init__(self, color=PALETTE["line"], thickness=0.8, width=460):
        super().__init__()
        self.color = color
        self.thickness = thickness
        self.width = width
        self.height = 5

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        self.canv.line(0, 2, self.width, 2)


class StatusPill(Flowable):
    def __init__(self, text, width=72, fill=PALETTE["teal"]):
        super().__init__()
        self.text = text
        self.width = width
        self.height = 18
        self.fill = fill

    def draw(self):
        c = self.canv
        c.setFillColor(self.fill)
        c.roundRect(0, 0, self.width, self.height, 8, fill=1, stroke=0)
        c.setFillColor(colors.white)
        c.setFont("Helvetica-Bold", 7.4)
        c.drawCentredString(self.width / 2, 5.5, self.text)


class ProgressBar(Flowable):
    def __init__(self, progress, label, color):
        super().__init__()
        self.progress = progress
        self.label = label
        self.color = color
        self.width = 210
        self.height = 26

    def draw(self):
        c = self.canv
        c.setFillColor(colors.HexColor("#edf3ef"))
        c.roundRect(0, 7, self.width, 9, 4.5, fill=1, stroke=0)
        c.setFillColor(self.color)
        c.roundRect(0, 7, self.width * self.progress, 9, 4.5, fill=1, stroke=0)
        c.setFillColor(PALETTE["ink"])
        c.setFont("Helvetica-Bold", 7.6)
        c.drawString(0, 19, self.label)
        c.setFillColor(PALETTE["muted"])
        c.setFont("Helvetica", 7)
        c.drawRightString(self.width, 19, f"{int(self.progress * 100)}%")


class PipelineDiagram(Flowable):
    def __init__(self, labels, width=470):
        super().__init__()
        self.labels = labels
        self.width = width
        self.height = 54

    def draw(self):
        c = self.canv
        gap = 8
        box_w = (self.width - gap * (len(self.labels) - 1)) / len(self.labels)
        colors_seq = [PALETTE["teal"], PALETTE["sage"], PALETTE["gold"], PALETTE["rose"], PALETTE["navy"]]
        for i, label in enumerate(self.labels):
            x = i * (box_w + gap)
            c.setFillColor(colors_seq[i % len(colors_seq)])
            c.roundRect(x, 10, box_w, 30, 8, fill=1, stroke=0)
            c.setFillColor(colors.white)
            c.setFont("Helvetica-Bold", 6.8)
            words = label.split(" ")
            line = ""
            lines = []
            for word in words:
                test = f"{line} {word}".strip()
                if stringWidth(test, "Helvetica-Bold", 6.8) > box_w - 10 and line:
                    lines.append(line)
                    line = word
                else:
                    line = test
            lines.append(line)
            y = 28 if len(lines) == 1 else 31
            for line in lines[:2]:
                c.drawCentredString(x + box_w / 2, y, line)
                y -= 8
            if i < len(self.labels) - 1:
                c.setStrokeColor(PALETTE["muted"])
                c.setLineWidth(1)
                c.line(x + box_w + 1, 25, x + box_w + gap - 1, 25)


def style(name, **kwargs):
    base = {
        "fontName": "Helvetica",
        "fontSize": 9,
        "leading": 12,
        "textColor": PALETTE["ink"],
        "spaceAfter": 6,
    }
    base.update(kwargs)
    return ParagraphStyle(name, **base)


S = {
    "h1": style("h1", fontName="Helvetica-Bold", fontSize=29, leading=32, spaceAfter=10),
    "h2": style("h2", fontName="Helvetica-Bold", fontSize=17, leading=21, spaceBefore=4, spaceAfter=7),
    "h3": style("h3", fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=PALETTE["teal"], spaceAfter=4),
    "body": style("body", fontSize=9.2, leading=13.5, spaceAfter=7),
    "small": style("small", fontSize=7.6, leading=10, textColor=PALETTE["muted"], spaceAfter=4),
    "meta": style("meta", fontName="Helvetica-Bold", fontSize=7.2, leading=9, textColor=PALETTE["muted"], spaceAfter=2),
    "white": style("white", fontSize=9, leading=12, textColor=colors.white, spaceAfter=5),
    "white_h": style("white_h", fontName="Helvetica-Bold", fontSize=28, leading=31, textColor=colors.white, spaceAfter=8),
    "center": style("center", alignment=TA_CENTER, fontSize=9, leading=12),
    "right": style("right", alignment=TA_RIGHT, fontSize=8, leading=10, textColor=PALETTE["muted"]),
}


def p(txt, st="body"):
    return Paragraph(txt, S[st])


def bullets(items):
    return [p(f"<font color='#176a6c'>+</font> {item}") for item in items]


def card(content, width=230, fill=colors.white, stroke=PALETTE["line"], pad=11):
    t = Table([[content]], colWidths=[width])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), fill),
        ("BOX", (0, 0), (-1, -1), 0.7, stroke),
        ("LEFTPADDING", (0, 0), (-1, -1), pad),
        ("RIGHTPADDING", (0, 0), (-1, -1), pad),
        ("TOPPADDING", (0, 0), (-1, -1), pad),
        ("BOTTOMPADDING", (0, 0), (-1, -1), pad),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def image_cell(path, width_mm, height_mm):
    if path.exists():
        return Image(str(path), width=width_mm * mm, height=height_mm * mm)
    return Spacer(width_mm * mm, height_mm * mm)


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PALETTE["paper"])
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setStrokeColor(PALETTE["line"])
    canvas.setLineWidth(0.6)
    canvas.line(20 * mm, PAGE_H - 16 * mm, PAGE_W - 20 * mm, PAGE_H - 16 * mm)
    canvas.line(20 * mm, 14 * mm, PAGE_W - 20 * mm, 14 * mm)
    canvas.setFont("Helvetica-Bold", 7)
    canvas.setFillColor(PALETTE["teal"])
    canvas.drawString(20 * mm, PAGE_H - 11 * mm, "AQUAMUNDI.ORG / PROVENEYA & NAHIARA")
    canvas.setFillColor(PALETTE["muted"])
    canvas.drawRightString(PAGE_W - 20 * mm, PAGE_H - 11 * mm, "Internship Completion Report")
    canvas.setFont("Helvetica", 7)
    canvas.drawString(20 * mm, 8.5 * mm, "Asociacion Internacional en Defensa de las Flores | CIF: G72737570")
    canvas.drawRightString(PAGE_W - 20 * mm, 8.5 * mm, f"{doc.page:02d}")
    canvas.restoreState()


def cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PALETTE["ink"])
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    if COVER_ART.exists():
        canvas.drawImage(str(COVER_ART), 0, 0, width=PAGE_W, height=PAGE_H, preserveAspectRatio=False, mask="auto")
    canvas.setFillColor(colors.Color(0.04, 0.11, 0.10, alpha=0.73))
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(colors.Color(0.95, 0.84, 0.54, alpha=0.82))
    canvas.rect(0, PAGE_H - 19 * mm, PAGE_W, 2.5 * mm, fill=1, stroke=0)
    if LOGO.exists():
        canvas.drawImage(str(LOGO), 22 * mm, PAGE_H - 38 * mm, width=24 * mm, height=24 * mm, preserveAspectRatio=True, mask="auto")
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.drawString(52 * mm, PAGE_H - 26 * mm, "ASOCIACION INTERNACIONAL EN DEFENSA DE LAS FLORES")
    canvas.setFillColor(PALETTE["gold"])
    canvas.drawString(52 * mm, PAGE_H - 31 * mm, "PROVENEYA & NAHIARA")
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 34)
    canvas.drawString(22 * mm, PAGE_H - 86 * mm, "Internship")
    canvas.drawString(22 * mm, PAGE_H - 99 * mm, "Completion Report")
    canvas.setFont("Helvetica", 13)
    canvas.setFillColor(colors.HexColor("#e9f4ef"))
    canvas.drawString(22 * mm, PAGE_H - 112 * mm, "May - June 2026 / Full 2-Month Period")
    canvas.setFillColor(colors.Color(1, 1, 1, alpha=0.14))
    canvas.roundRect(22 * mm, 47 * mm, 166 * mm, 43 * mm, 12, fill=1, stroke=0)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 10)
    canvas.drawString(30 * mm, 76 * mm, "Intern")
    canvas.setFont("Helvetica", 11)
    canvas.drawString(30 * mm, 68 * mm, "Mr. Aditya Singh / Reg. No. 12306214")
    canvas.setFont("Helvetica-Bold", 10)
    canvas.drawString(30 * mm, 57 * mm, "Total stipend authorised for review")
    canvas.setFont("Helvetica-Bold", 21)
    canvas.setFillColor(PALETTE["gold"])
    canvas.drawString(117 * mm, 57 * mm, "USD 700")
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(22 * mm, 23 * mm, "Lovely Professional University, Punjab, India")
    canvas.drawRightString(PAGE_W - 22 * mm, 23 * mm, "Report date: 30 June 2026")
    canvas.restoreState()


def build():
    doc = BaseDocTemplate(
        str(OUT),
        pagesize=A4,
        rightMargin=20 * mm,
        leftMargin=20 * mm,
        topMargin=22 * mm,
        bottomMargin=18 * mm,
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[frame], onPage=cover),
        PageTemplate(id="body", frames=[frame], onPage=header_footer),
    ])

    story = [NextPageTemplate("body"), PageBreak()]
    story.append(p("Executive Portfolio", "h1"))
    story.append(p("A redesigned final delivery package for the completed two-month internship at AquaMundi.org, consolidating the objectives plan, Month 1 progress evidence, and final completion report into a premium supervisor-ready document."))
    story.append(Spacer(1, 5))
    metrics = [
        [p("2 months", "h2"), p("22 deliverables", "h2"), p("USD 700", "h2")],
        [p("1 May - 30 June 2026", "small"), p("All listed final objectives completed", "small"), p("Total stipend for review", "small")],
    ]
    tbl = Table(metrics, colWidths=[doc.width / 3 - 5] * 3)
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.white),
        ("BOX", (0, 0), (-1, -1), 0.7, PALETTE["line"]),
        ("INNERGRID", (0, 0), (-1, -1), 0.5, PALETTE["line"]),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(tbl)
    story.append(Spacer(1, 10))
    story.append(Rule(width=doc.width))
    story.append(Spacer(1, 7))
    story.append(p("Work was structured across two parallel blocks: Block 2 - Digital Chapter Sales System, representing immediate platform revenue infrastructure, and Block 3 - NahiaraOS, the AI interactive layer for the Nahiara universe. Month 1 delivered the core build and research foundation. Month 2 completed production optimisation, AI iteration, contextual integration, and final technical documentation."))
    story.append(Spacer(1, 8))
    story.append(Table([[
        card([p("Block 2 / Digital Chapter Sales System", "h3"), ProgressBar(1, "Revenue infrastructure delivered", PALETTE["teal"]), p("Sequential chapter unlock logic, international payment gateway, personal user library, audio player, encrypted offline download, production deployment, optimisation, and technical documentation.", "small")], width=235, fill=colors.HexColor("#ffffff")),
        card([p("Block 3 / NahiaraOS AI Layer", "h3"), ProgressBar(1, "AI interactive layer delivered", PALETTE["rose"]), p("Model research, Araihan prompt system, canonical boundaries, multilingual coherence testing, functional prototype, supervisor iteration, contextual reading integration, and NahiaraOS v0.2 documentation.", "small")], width=235, fill=colors.HexColor("#ffffff")),
    ]], colWidths=[240, 240], hAlign="LEFT"))

    story += [PageBreak(), p("Candidate & Programme Record", "h1")]
    info = [
        ["Intern", "Mr. Aditya Singh", "Registration", "12306214"],
        ["Academic institution", "Lovely Professional University, Punjab, India", "Period", "1 May - 30 June 2026"],
        ["Supervisor", "Matias Octavio Gonzalez Gonzalez", "Role", "Secretary & Project Director"],
        ["Organisation", "Asociacion Internacional en Defensa de las Flores", "Platform", "AquaMundi.org"],
        ["Stipend", "USD 350/month", "Final amount", "USD 700"],
    ]
    t = Table([[p(a, "meta"), p(b), p(c, "meta"), p(d)] for a, b, c, d in info], colWidths=[88, 190, 80, 122])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.45, PALETTE["line"]),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(t)
    story.append(Spacer(1, 11))
    story.append(p("Completion Narrative", "h2"))
    story.append(p("This final report records successful completion of the full two-month internship. The work met the planned distribution of 60% daily effort for Block 2 and 40% daily effort for Block 3. By the end of June 2026, both blocks were marked delivered in the final source report, with all 22 listed deliverables completed."))
    story.append(Spacer(1, 5))
    story.append(p("Source Documents Read", "h2"))
    source_rows = [
        ["1", "Internship Objectives Plan", "May - June 2026", "Plan baseline"],
        ["2", "Internship Progress Report", "Month 1 - May 2026", "Progress evidence"],
        ["3", "Internship Completion Report", "May - June 2026", "Final delivery evidence"],
        ["4", "Premium Completion Report", "May - June 2026", "Architecture, QA, impact, and video structure"],
    ]
    st = Table([[p(x, "small") for x in r] for r in source_rows], colWidths=[26, 205, 130, 119])
    st.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.45, PALETTE["line"]),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    story.append(st)

    story += [PageBreak(), p("AquaMundi Website Alignment", "h1")]
    story.append(p("The final report has been aligned to the live AquaMundi website codebase at C:\\Code\\Aquamundi\\custom_threejs_model. The delivery narrative now reflects the actual platform surface: interactive globe, shop, cart, digital downloads, currency detection, game flow, Araihan guide, multilingual localisation, and PWA-style asset handling."))
    visual_cells = [
        image_cell(GUARDIAN_WATER, 32, 44),
        image_cell(HUMMINGBIRD, 46, 32),
        image_cell(NAHIARA_CARD, 32, 44),
    ]
    visual_strip = Table([visual_cells], colWidths=[160, 160, 160], hAlign="CENTER")
    visual_strip.setStyle(TableStyle([
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(visual_strip)
    story.append(Spacer(1, 6))
    website_cards = [
        card([p("Commerce Surface", "h3"), p("The website includes a shop, cart, geolocation-based currency handling, physical products, and digital download purchase paths. This directly supports the Block 2 chapter-sales framing.", "small")], width=150),
        card([p("Interactive Universe", "h3"), p("The homepage and game flow include 3D globe, flower-country collections, pollinator/game mechanics, and immersive branded assets.", "small")], width=150),
        card([p("AI Character Layer", "h3"), p("The game flow references Araihan guide interactions, matching the NahiaraOS/Araihan character-system work described in Block 3.", "small")], width=150),
    ]
    story.append(Table([website_cards], colWidths=[160, 160, 160]))
    story.append(Spacer(1, 12))
    story.append(p("Platform Evidence Integrated", "h2"))
    story.extend(bullets([
        "Homepage uses lazy-loaded 3D globe, branded navigation, music toggle, gallery, and bento sections.",
        "Shop page includes Nahiara Collection positioning, digital download actions, secure payment messaging, add-to-cart tracking, and currency detection.",
        "Game page includes AraihanGuide, flower formation, country data, pollinator quiz, victory screen, game persistence, audio, and share flows.",
        "Global styling uses floral patterns, light theme, custom animations, and green botanical UI accents.",
    ]))

    story += [PageBreak(), p("Architecture & Quality Model", "h1")]
    story.append(p("The expanded source report frames the internship as a professional delivery package, not only a list of completed tasks. The strongest material added here is the system architecture, entitlement logic, testing model, and implementation-risk handling."))
    story.append(PipelineDiagram(["Reader Account", "Payment Gateway", "Entitlement Check", "Library Access", "PWA Delivery"], width=doc.width))
    story.append(Spacer(1, 8))
    story.append(Table([[
        card([p("Commerce Architecture", "h3"), p("Purchase records, chapter states, pricing options, payment references, and entitlement updates are treated as connected but distinct responsibilities. That separation reduces ambiguity after payment and protects user trust.", "small")], width=150),
        card([p("Access & Offline Control", "h3"), p("The reader journey moves from discovery to purchase, confirmation, chapter unlock, library ownership, audio playback, and encrypted offline PWA access instead of uncontrolled file exposure.", "small")], width=150),
        card([p("Quality Assurance", "h3"), p("Testing covers successful purchase, failed/cancelled payment states, sequential lock rules, audio availability, offline package behaviour, user-library consistency, and documentation handover.", "small")], width=150),
    ]], colWidths=[160, 160, 160]))
    story.append(Spacer(1, 12))
    story.append(p("Risk Handling Added From Source Material", "h2"))
    risk_rows = [
        ["Risk", "Why it matters", "Handling"],
        ["Incorrect paid access", "Affects revenue and user confidence", "Separate payment state from entitlement update"],
        ["Confusing unlock flow", "Readers must understand locked, owned, and bundled content", "Use clear sequential unlock and library status"],
        ["AI canon drift", "A generic chatbot can contradict the story universe", "Layer prompts by identity, Araihan voice, canon, scenarios, language, and safety"],
        ["Handover gap", "Supervisor and future maintainers need evidence", "Use reports, diagrams, deliverables matrix, QA notes, and walkthrough plan"],
    ]
    rt = Table([[p(x, "small" if i else "meta") for x in r] for i, r in enumerate(risk_rows)], colWidths=[112, 178, 190])
    rt.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PALETTE["mint"]),
        ("BACKGROUND", (0, 1), (-1, -1), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.4, PALETTE["line"]),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(rt)

    story += [PageBreak(), p("Impact, Learning & Walkthrough", "h1")]
    story.append(p("The additional premium report also strengthens the final package with value framing, professional learning outcomes, and a video walkthrough structure suitable for academic review."))
    impact_strip = Table([[
        image_cell(FLOWER_ALT, 36, 36),
        image_cell(GUARDIAN_EDU, 31, 43),
        image_cell(BUMBLEBEE, 43, 31),
    ]], colWidths=[155, 155, 155], hAlign="CENTER")
    impact_strip.setStyle(TableStyle([
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    story.append(impact_strip)
    story.append(Spacer(1, 8))
    story.append(Table([[
        card([p("Business Value", "h3"), p("Block 2 turns AquaMundi.org into a monetisable digital product through paid chapter access, library ownership, audio, and offline reading. Block 3 gives the platform a differentiated AI storytelling layer.", "small")], width=150),
        card([p("Professional Growth", "h3"), p("The work demonstrates full-stack product thinking, payment-oriented architecture, PWA experience design, AI model evaluation, prompt engineering, documentation discipline, and remote collaboration.", "small")], width=150),
        card([p("Walkthrough Plan", "h3"), p("A review video can follow: introduction, project context, Block 2 demo, Block 3 demo, implementation challenges, learning outcomes, and closing thanks.", "small")], width=150),
    ]], colWidths=[160, 160, 160]))
    story.append(Spacer(1, 12))
    story.append(p("Suggested Review Video Flow", "h2"))
    story.append(PipelineDiagram(["Intro", "Project Context", "Block 2 Demo", "Block 3 Demo", "Learning Close"], width=doc.width))
    story.append(Spacer(1, 7))
    story.extend(bullets([
        "Keep the video evidence-based: problem, implementation, result, and learning.",
        "Show the chapter-sales path as a commercial feature, not just a technical exercise.",
        "Explain NahiaraOS as a controlled Araihan character system with multilingual and canonical boundaries.",
        "Close by connecting the USD 700 stipend period to the final deliverables and handover package.",
    ]))

    story += [PageBreak(), p("Latest Website Git Changes", "h1")]
    story.append(p("Current uncommitted website changes from C:\\Code\\Aquamundi\\custom_threejs_model were reviewed and added as live platform context. These changes are not staged or altered by this PDF generator; they are included here as supporting evidence of the AquaMundi delivery surface."))
    git_rows = [
        ["Changed area", "Files", "Report relevance"],
        ["Hero CTA", "components/HeroSection.jsx", "Adds a visible Dia de Todos los Polinizadores link from the main hero, strengthening event discovery and public engagement."],
        ["S3 upload utility", "app/upload-file-to-s3/page.js; app/actions/upload.js", "Adds a hidden operational uploader for GLB models, images, documents, audio, and video with public URLs and GLB proxy snippets."],
        ["AWS SDK support", "package.json; package-lock.json", "Adds @aws-sdk/client-s3 and @aws-sdk/s3-request-presigner for presigned uploads."],
    ]
    gt = Table([[p(x, "small" if i else "meta") for x in r] for i, r in enumerate(git_rows)], colWidths=[105, 150, 225])
    gt.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PALETTE["ink"]),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("BACKGROUND", (0, 1), (-1, -1), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.45, PALETTE["line"]),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(gt)
    story.append(Spacer(1, 12))
    story.append(Table([[
        card([p("Pollinators Event CTA", "h3"), p("The hero now includes a rounded, animated external link to the pollinators countdown/event route, making the live event surface more discoverable from AquaMundi.org.", "small")], width=235),
        card([p("Operational Asset Pipeline", "h3"), p("The upload utility supports heavier runtime assets such as GLB models and media files in S3, reducing pressure on the Vercel public folder and supporting Three.js workflows.", "small")], width=235),
    ]], colWidths=[240, 240]))

    story += [PageBreak(), p("Delivery Timeline", "h1")]
    timeline = [
        ("Week 1", "1-9 May", "Architecture, pricing model, account integration, AI model research, and recommendation report."),
        ("Week 2", "10-16 May", "Payment gateway, personal library, Araihan base prompt system, and canonical boundary design."),
        ("Week 3", "17-23 May", "Audio player, encrypted PWA offline download, initial NahiaraOS chat prototype, and multilingual coherence tests."),
        ("Week 4", "24-31 May", "System testing, corrections, Month 1 technical report, supervisor prototype review, and NahiaraOS v0.1 architecture documentation."),
        ("June", "Month 2", "Production deployment, live monitoring, UX refinements, gateway optimisation, prompt expansion, contextual integration, and NahiaraOS v0.2 delivery."),
    ]
    for idx, (label, date, text) in enumerate(timeline, 1):
        row = Table([[
            StatusPill(label, width=58, fill=PALETTE["teal"] if idx < 5 else PALETTE["gold"]),
            [p(date, "h3"), p(text, "body")]
        ]], colWidths=[72, 398])
        row.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 11),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ]))
        story.append(row)

    story += [PageBreak(), p("Block 2 / Digital Chapter Sales System", "h1")]
    if BOOK.exists():
        block2_intro = Table([[Image(str(BOOK), width=40 * mm, height=57 * mm), [
            p("Final status: delivered", "h2"),
            p("The digital chapter sales system was developed as an immediate-impact revenue layer for AquaMundi.org. The final report confirms Month 1 core delivery and Month 2 production hardening, optimisation, and documentation."),
            *bullets([
                "Chapter purchase architecture: database schema, user flow, and sequential unlock logic.",
                "Pricing model covering individual chapter purchases, cumulative discounts, and full-access bundles.",
                "International payment gateway and personal user library with purchase history and access management.",
                "Integrated audio player, encrypted PWA offline download, production deployment, live monitoring, UX refinement, and complete technical documentation.",
            ])
        ]]], colWidths=[128, 352])
        block2_intro.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (0, 0), 18),
            ("LEFTPADDING", (1, 0), (1, 0), 6),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ]))
        story.append(block2_intro)
    story.append(Spacer(1, 7))
    b2 = [
        ["Area", "May core build", "June finalisation"],
        ["Commerce", "Architecture, pricing, payment module", "Gateway optimisation and edge-case resolution"],
        ["Access", "Sequential unlock and personal library", "Production monitoring and UX refinements"],
        ["Media/PWA", "Audio player and encrypted offline download", "Reliability and device compatibility improvements"],
        ["Documentation", "Month 1 technical report", "Complete architecture, API, and deployment package"],
    ]
    bt = Table([[p(x, "small" if i else "meta") for x in r] for i, r in enumerate(b2)], colWidths=[94, 190, 196])
    bt.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PALETTE["mint"]),
        ("BACKGROUND", (0, 1), (-1, -1), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.45, PALETTE["line"]),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    story.append(bt)

    story += [PageBreak(), p("Block 3 / NahiaraOS AI Interactive Layer", "h1")]
    story.append(p("NahiaraOS was the strategic AI layer of the internship, focused on a controlled interactive system for the AquaMundi.org platform and the Nahiara narrative universe. The final report confirms completion of the research foundation, prototype, multilingual testing, supervisor iteration, contextual chapter integration, and v0.2 documentation."))
    cols = [
        card([p("Research", "h3"), p("OpenAI, Google Gemini, and Anthropic Claude were compared for cost, multilingual capabilities, and narrative adaptability.", "small")], width=150),
        card([p("Character System", "h3"), p("A base prompt system defined Araihan's behaviour, communication style, permitted topics, and canonical boundaries.", "small")], width=150),
        card([p("Prototype", "h3"), p("A guided chat interface was built, evaluated with the supervisor, refined, and extended through NahiaraOS v0.2.", "small")], width=150),
    ]
    story.append(Table([cols], colWidths=[160, 160, 160]))
    story.append(Spacer(1, 13))
    story.append(p("Final AI Deliverables", "h2"))
    story.extend(bullets([
        "AI model comparative study and reasoned recommendation report.",
        "Base prompt system for Araihan and documented narrative/canonical limits.",
        "Initial functional prototype inside AquaMundi.org with guided, controlled responses.",
        "Multilingual coherence testing across Spanish, English, and German.",
        "Supervisor feedback iteration, expanded prompt scenarios, contextual AI access from the reading experience, and NahiaraOS v0.2 documentation.",
    ]))

    story += [PageBreak(), p("Complete Deliverables Matrix", "h1")]
    deliverables = [
        ("1", "Chapter sales architecture and database design", "Block 2", "May"),
        ("2", "Pricing model: individual, cumulative, full access", "Block 2", "May"),
        ("3", "International payment gateway module", "Block 2", "May"),
        ("4", "Personal user library: purchase history and access", "Block 2", "May"),
        ("5", "Integrated per-chapter audio player", "Block 2", "May"),
        ("6", "Encrypted offline download in PWA", "Block 2", "May"),
        ("7", "Full system testing and Month 1 technical report", "Block 2", "May"),
        ("8", "Production deployment and live monitoring", "Block 2", "June"),
        ("9", "UX refinements from production data", "Block 2", "June"),
        ("10", "System optimisation and edge case resolution", "Block 2", "June"),
        ("11", "Complete Block 2 technical documentation", "Block 2", "June"),
        ("12", "AI model comparative study", "Block 3", "May"),
        ("13", "AI solution recommendation report", "Block 3", "May"),
        ("14", "Base prompt system: Araihan", "Block 3", "May"),
        ("15", "Narrative and canonical boundary documentation", "Block 3", "May"),
        ("16", "NahiaraOS v0.1 functional prototype", "Block 3", "May"),
        ("17", "Multilingual coherence tests: ES / EN / DE", "Block 3", "May"),
        ("18", "NahiaraOS v0.1 architecture documentation", "Block 3", "May"),
        ("19", "Prototype iteration from supervisor feedback", "Block 3", "June"),
        ("20", "Expanded prompt system with new scenarios", "Block 3", "June"),
        ("21", "Block 2 + Block 3 contextual AI integration", "Block 3", "June"),
        ("22", "NahiaraOS v0.2 and complete technical documentation", "Block 3", "June"),
    ]
    rows = [[p("#", "meta"), p("Deliverable", "meta"), p("Block", "meta"), p("Month", "meta"), p("Status", "meta")]]
    rows += [[p(a, "small"), p(b, "small"), p(c, "small"), p(d, "small"), p("Completed", "small")] for a, b, c, d in deliverables]
    dt = Table(rows, colWidths=[24, 266, 72, 55, 63], repeatRows=1)
    dt.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PALETTE["ink"]),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("BACKGROUND", (0, 1), (-1, -1), colors.white),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f4f8f5")]),
        ("GRID", (0, 0), (-1, -1), 0.35, PALETTE["line"]),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(dt)

    story += [PageBreak(), p("Final Evaluation & Authorisation", "h1")]
    story.append(card([
        p("Supervisor Review Statement", "h2"),
        p("This final report is submitted to Mr. Matias Octavio Gonzalez Gonzalez for final review and evaluation covering the complete internship period from 1 May to 30 June 2026, in accordance with Section 5 of the Internship Objectives Plan signed on 29 April 2026."),
        p("All objectives across both blocks and both months are recorded as fully delivered in the final source report. Upon satisfactory evaluation, the total stipend of USD 700 is requested to be authorised, with the Month 2 payment of USD 350 pending release."),
    ], width=doc.width, fill=colors.white, pad=15))
    story.append(Spacer(1, 16))
    sig = Table([
        [p("For Asociacion Internacional en Defensa de las Flores", "meta"), p("Intern", "meta")],
        [Spacer(1, 30), Spacer(1, 30)],
        [Rule(width=205), Rule(width=205)],
        [p("Matias Octavio Gonzalez Gonzalez<br/>Secretary & Project Director", "small"), p("Mr. Aditya Singh<br/>Reg. No. 12306214", "small")],
    ], colWidths=[235, 235])
    sig.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 20),
    ]))
    story.append(sig)
    story.append(Spacer(1, 18))
    story.append(p("Document provenance: Internship Objectives Plan - DocuSign Envelope ID 28FE5BFA-4C96-87D7-8225-1A91FDF0BA23; Month 1 Progress Report dated 31 May 2026; Final Completion Report dated 30 June 2026.", "small"))

    doc.build(story)


if __name__ == "__main__":
    OUT.parent.mkdir(parents=True, exist_ok=True)
    build()
    print(OUT)
