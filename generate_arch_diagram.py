from PIL import Image, ImageDraw, ImageFont
import os

width = 1200
height = 680
img = Image.new('RGB', (width, height), color='#FFFFFF')
draw = ImageDraw.Draw(img)

# Background subtle grid / frame
draw.rectangle([(20, 20), (width - 20, height - 20)], fill='#F8FAFC', outline='#CBD5E1', width=2)

try:
    font_title = ImageFont.truetype("arial.ttf", 26)
    font_box_title = ImageFont.truetype("arial.ttf", 18)
    font_desc = ImageFont.truetype("arial.ttf", 14)
    font_tag = ImageFont.truetype("arial.ttf", 12)
except Exception:
    font_title = ImageFont.load_default()
    font_box_title = ImageFont.load_default()
    font_desc = ImageFont.load_default()
    font_tag = ImageFont.load_default()

# Header
draw.text((60, 45), "Chronos Ultra — Component Architecture & State Flow", fill='#1E3A8A', font=font_title)
draw.line([(60, 85), (1140, 85)], fill='#3B82F6', width=3)

def draw_card(x, y, w, h, title, subtitle, border='#6366F1', bg='#FFFFFF', header_bg='#EEF2FF'):
    draw.rounded_rectangle([(x, y), (x + w, y + h)], radius=12, fill=bg, outline=border, width=2)
    draw.rounded_rectangle([(x, y), (x + w, y + 36)], radius=12, fill=header_bg)
    draw.text((x + 16, y + 8), title, fill='#1E293B', font=font_box_title)
    if subtitle:
        draw.text((x + 16, y + 44), subtitle, fill='#64748B', font=font_desc)

# Root Component (App.jsx)
draw_card(460, 110, 280, 75, "App.jsx (Root)", "ErrorBoundary + TimerProvider", border='#2563EB', header_bg='#DBEAFE')

# Context & State Layer
draw_card(60, 220, 320, 120, "TimerContext.jsx", "Global State Management\n• Multi-Timer Tick (1000ms)\n• LocalStorage Sync\n• Audio Event Dispatcher", border='#7C3AED', header_bg='#EDE9FE')

# Custom Hooks Layer
draw_card(440, 220, 320, 120, "Custom Hooks Suite", "• useCountdown (Precision Logic)\n• useLocalStorage (Data Persistence)\n• useAudioAlert (Web Audio Synth)\n• useWorldTime (API & Timezones)", border='#059669', header_bg='#D1FAE5')

# Services / Audio & API
draw_card(820, 220, 320, 120, "Services & External I/O", "• soundEngine.js (AudioContext)\n• timeApi.js (WorldTimeAPI)\n• Intl.DateTimeFormat Fallback\n• Web Notifications API", border='#D97706', header_bg='#FEF3C7')

# Connecting Lines
draw.line([(600, 185), (600, 220)], fill='#94A3B8', width=2)
draw.line([(220, 185), (980, 185)], fill='#94A3B8', width=2)
draw.line([(220, 185), (220, 220)], fill='#94A3B8', width=2)
draw.line([(980, 185), (980, 220)], fill='#94A3B8', width=2)

# Navigation / Views
draw.text((60, 375), "Client-Side Routing Layer (React Router DOM v7)", fill='#1E3A8A', font=font_box_title)
draw.line([(60, 405), (1140, 405)], fill='#CBD5E1', width=1)

views = [
    ("DashboardPage (/)", "Multi-timer grid & Presets", 60),
    ("EventsPage (/events)", "Target date milestones", 245),
    ("PomodoroPage (/pomodoro)", "25m focus & interval suite", 430),
    ("WorldTimePage (/world-clock)", "Live REST API clocks", 615),
    ("AnalyticsPage (/analytics)", "Focus metrics & CSV export", 800),
    ("AboutPage (/about)", "PCCOE FA-2 Matrix & PRN", 985)
]

for title, sub, x in views:
    draw_card(x, 420, 155, 110, title.split(" ")[0], f"{title.split(' ')[1] if len(title.split(' ')) > 1 else ''}\n{sub}", border='#3B82F6', header_bg='#EFF6FF')
    draw.line([(x + 77, 340), (x + 77, 420)], fill='#CBD5E1', width=2)

# UI Component Layer
draw_card(60, 560, 1080, 80, "Reusable UI Components & Engineering", "• TimerCard (Hardware SVG Circular Progress)    • EventCountdownCard (Flipped Digital Units)    • TimerModal (Validation Engine)\n• ErrorBoundary (Crash Resilience)    • ToastContainer (Non-blocking Alerts)    • SoundPicker (Audio Preview)", border='#475569', header_bg='#F1F5F9')

output_path = os.path.join("d:\\AWT FA2", "assets", "architecture_diagram.png")
img.save(output_path, "PNG", dpi=(150, 150))
print(f"Architecture diagram created: {output_path}")
