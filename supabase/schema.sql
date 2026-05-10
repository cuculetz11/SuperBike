-- ╔══════════════════════════════════════════════════════════════════╗
-- ║       SUPERBIKE FOCȘANI — Supabase Schema (Simplified)          ║
-- ║       Single table, visual catalog only, no e-commerce          ║
-- ╚══════════════════════════════════════════════════════════════════╝

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── MAIN TABLE ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bicycles (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

  -- Core display info
  name            TEXT NOT NULL,
  brand           TEXT NOT NULL,          -- 'Specialized', 'Cross', 'DHS', 'Devron', 'Haibike'
  category        TEXT,                   -- 'MTB', 'E-Bike', 'Road', 'City', 'Kids'
  tagline         TEXT,                   -- Short poetic line for gallery card
  description     TEXT,                   -- Paragraph description

  -- Media (Supabase Storage URLs from 'showroom-media' bucket)
  hero_image_url  TEXT,                   -- Main image shown in gallery
  image_urls      TEXT[],                 -- Additional images (detail views)
  video_url       TEXT,                   -- Optional product video

  -- Flexible specs (no rigid columns — add anything: suspension, motor, frame, etc.)
  features        JSONB DEFAULT '{}',
  -- Example: {"frame": "Carbon", "motor": "Bosch 85Nm", "battery": "750Wh", "gears": "Shimano XT 12s"}

  -- Display controls
  is_featured     BOOLEAN DEFAULT FALSE,  -- Show in hero section
  display_order   INTEGER DEFAULT 0,      -- Manual sort order
  is_published    BOOLEAN DEFAULT TRUE,

  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── AUTO-UPDATE TIMESTAMP ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bicycles_updated_at
  BEFORE UPDATE ON bicycles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── ROW LEVEL SECURITY (public read, no auth needed) ─────────────────────────
ALTER TABLE bicycles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published bikes"
  ON bicycles FOR SELECT
  USING (is_published = TRUE);

-- ─── SAMPLE INSERTS ──────────────────────────────────────────────────────────
-- Run these after uploading images to the 'showroom-media' Supabase bucket.
-- URL format: https://tyhkmczfmbvxrivetciq.supabase.co/storage/v1/object/public/showroom-media/YOUR_FILE

INSERT INTO bicycles (name, brand, category, tagline, description, display_order, is_featured) VALUES
  ('Specialized Status 160', 'Specialized', 'MTB',
   'Domină orice coborâre.',
   'Un enduro machine construit pentru cei care nu au limite. 160mm cursă față-spate.',
   1, TRUE),
  ('Specialized Stumpjumper', 'Specialized', 'MTB',
   'Legendă vie pe orice trail.',
   'Cel mai iconic full-suspension trail bike din lume.',
   2, TRUE),
  ('Cross GRX 9', 'Cross', 'MTB',
   'Gravel fără frontiere.',
   'Conceput pentru aventurieri. Cadru robust, geometrie relaxată.',
   3, FALSE),
  ('Haibike AllMtn CF 11', 'Haibike', 'E-Bike',
   'Muntele nu mai are secrete.',
   'E-MTB full carbon cu motor Bosch Performance CX.',
   4, TRUE),
  ('Specialized Tarmac SL8', 'Specialized', 'Road',
   'Cel mai ușor gând pe asfalt.',
   'Carbon ultralight, rigiditate perfectă, viteza pe care o meriți.',
   5, FALSE),
  ('Cross Fusion Pro', 'Cross', 'City',
   'Urban. Elegant. Rapid.',
   'Bicicleta perfectă pentru orașul modern.',
   6, FALSE);
