import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Create the _locales enum used by Payload's localization system
  await db.execute(sql`CREATE TYPE IF NOT EXISTS _locales AS ENUM ('en', 'de')`)

  // 2. Create locale tables for each localized collection
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS news_locales (
      id SERIAL PRIMARY KEY,
      title VARCHAR,
      description TEXT,
      content JSONB,
      _locale _locales NOT NULL,
      _parent_id INTEGER NOT NULL REFERENCES news(id) ON DELETE CASCADE,
      UNIQUE(_parent_id, _locale)
    )
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS faq_locales (
      id SERIAL PRIMARY KEY,
      question VARCHAR,
      answer JSONB,
      _locale _locales NOT NULL,
      _parent_id INTEGER NOT NULL REFERENCES faq(id) ON DELETE CASCADE,
      UNIQUE(_parent_id, _locale)
    )
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS integrations_locales (
      id SERIAL PRIMARY KEY,
      name VARCHAR,
      description TEXT,
      _locale _locales NOT NULL,
      _parent_id INTEGER NOT NULL REFERENCES integrations(id) ON DELETE CASCADE,
      UNIQUE(_parent_id, _locale)
    )
  `)

  // 3. Migrate existing data from _en/_de columns into locale rows
  await db.execute(sql`
    INSERT INTO news_locales (title, description, content, _locale, _parent_id)
    SELECT title_en, description_en, content_en, 'en', id FROM news
    ON CONFLICT (_parent_id, _locale) DO NOTHING
  `)
  await db.execute(sql`
    INSERT INTO news_locales (title, description, content, _locale, _parent_id)
    SELECT title_de, description_de, content_de, 'de', id FROM news
    ON CONFLICT (_parent_id, _locale) DO NOTHING
  `)

  await db.execute(sql`
    INSERT INTO faq_locales (question, answer, _locale, _parent_id)
    SELECT question_en, answer_en, 'en', id FROM faq
    ON CONFLICT (_parent_id, _locale) DO NOTHING
  `)
  await db.execute(sql`
    INSERT INTO faq_locales (question, answer, _locale, _parent_id)
    SELECT question_de, answer_de, 'de', id FROM faq
    ON CONFLICT (_parent_id, _locale) DO NOTHING
  `)

  await db.execute(sql`
    INSERT INTO integrations_locales (name, description, _locale, _parent_id)
    SELECT name_en, description_en, 'en', id FROM integrations
    ON CONFLICT (_parent_id, _locale) DO NOTHING
  `)
  await db.execute(sql`
    INSERT INTO integrations_locales (name, description, _locale, _parent_id)
    SELECT name_de, description_de, 'de', id FROM integrations
    ON CONFLICT (_parent_id, _locale) DO NOTHING
  `)

  // 4. Drop the old _en/_de columns
  await db.execute(sql`
    ALTER TABLE news
      DROP COLUMN IF EXISTS title_en,
      DROP COLUMN IF EXISTS description_en,
      DROP COLUMN IF EXISTS content_en,
      DROP COLUMN IF EXISTS title_de,
      DROP COLUMN IF EXISTS description_de,
      DROP COLUMN IF EXISTS content_de
  `)

  await db.execute(sql`
    ALTER TABLE faq
      DROP COLUMN IF EXISTS question_en,
      DROP COLUMN IF EXISTS answer_en,
      DROP COLUMN IF EXISTS question_de,
      DROP COLUMN IF EXISTS answer_de
  `)

  await db.execute(sql`
    ALTER TABLE integrations
      DROP COLUMN IF EXISTS name_en,
      DROP COLUMN IF EXISTS description_en,
      DROP COLUMN IF EXISTS name_de,
      DROP COLUMN IF EXISTS description_de
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Re-add _en/_de columns
  await db.execute(sql`
    ALTER TABLE news
      ADD COLUMN title_en VARCHAR,
      ADD COLUMN description_en TEXT,
      ADD COLUMN content_en JSONB,
      ADD COLUMN title_de VARCHAR,
      ADD COLUMN description_de TEXT,
      ADD COLUMN content_de JSONB
  `)

  await db.execute(sql`
    ALTER TABLE faq
      ADD COLUMN question_en VARCHAR,
      ADD COLUMN answer_en JSONB,
      ADD COLUMN question_de VARCHAR,
      ADD COLUMN answer_de JSONB
  `)

  await db.execute(sql`
    ALTER TABLE integrations
      ADD COLUMN name_en VARCHAR,
      ADD COLUMN description_en TEXT,
      ADD COLUMN name_de VARCHAR,
      ADD COLUMN description_de TEXT
  `)

  // Copy data back from locale tables
  await db.execute(sql`
    UPDATE news SET
      title_en = l.title,
      description_en = l.description,
      content_en = l.content
    FROM news_locales l
    WHERE l._parent_id = news.id AND l._locale = 'en'
  `)
  await db.execute(sql`
    UPDATE news SET
      title_de = l.title,
      description_de = l.description,
      content_de = l.content
    FROM news_locales l
    WHERE l._parent_id = news.id AND l._locale = 'de'
  `)

  await db.execute(sql`
    UPDATE faq SET
      question_en = l.question,
      answer_en = l.answer
    FROM faq_locales l
    WHERE l._parent_id = faq.id AND l._locale = 'en'
  `)
  await db.execute(sql`
    UPDATE faq SET
      question_de = l.question,
      answer_de = l.answer
    FROM faq_locales l
    WHERE l._parent_id = faq.id AND l._locale = 'de'
  `)

  await db.execute(sql`
    UPDATE integrations SET
      name_en = l.name,
      description_en = l.description
    FROM integrations_locales l
    WHERE l._parent_id = integrations.id AND l._locale = 'en'
  `)
  await db.execute(sql`
    UPDATE integrations SET
      name_de = l.name,
      description_de = l.description
    FROM integrations_locales l
    WHERE l._parent_id = integrations.id AND l._locale = 'de'
  `)

  // Drop locale tables
  await db.execute(sql`DROP TABLE IF EXISTS news_locales`)
  await db.execute(sql`DROP TABLE IF EXISTS faq_locales`)
  await db.execute(sql`DROP TABLE IF EXISTS integrations_locales`)

  await db.execute(sql`DROP TYPE IF EXISTS _locales`)
}
