-- =========================================
-- EXTENSIONS
-- =========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================
-- GUESTS TABLE
-- One unified guest profile across channels
-- =========================================
CREATE TABLE
    guests (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        full_name TEXT NOT NULL,
        email TEXT,
        phone_number TEXT,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

-- =========================================
-- PROPERTIES TABLE
-- Stores villa/property information
-- =========================================
CREATE TABLE
    properties (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        property_code TEXT UNIQUE NOT NULL,
        property_name TEXT NOT NULL,
        location TEXT,
        bedrooms INTEGER,
        max_guests INTEGER,
        base_rate NUMERIC(10, 2),
        created_at TIMESTAMP DEFAULT NOW ()
    );

-- =========================================
-- RESERVATIONS TABLE
-- Booking information linked to guests
-- =========================================
CREATE TABLE
    reservations (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        booking_ref TEXT UNIQUE NOT NULL,
        guest_id UUID NOT NULL REFERENCES guests (id),
        property_id UUID NOT NULL REFERENCES properties (id),
        source_channel TEXT NOT NULL,
        check_in_date DATE,
        check_out_date DATE,
        guest_count INTEGER,
        reservation_status TEXT DEFAULT 'confirmed',
        created_at TIMESTAMP DEFAULT NOW ()
    );

-- =========================================
-- CONVERSATIONS TABLE
-- One conversation thread per guest/channel
-- =========================================
CREATE TABLE
    conversations (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        guest_id UUID NOT NULL REFERENCES guests (id),
        reservation_id UUID REFERENCES reservations (id),
        source_channel TEXT NOT NULL,
        conversation_status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT NOW ()
    );

-- =========================================
-- MESSAGES TABLE
-- Unified inbound/outbound messages
-- =========================================
CREATE TABLE
    messages (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        conversation_id UUID NOT NULL REFERENCES conversations (id),
        sender_type TEXT NOT NULL, -- guest / ai / agent
        message_direction TEXT NOT NULL, -- inbound / outbound
        source_channel TEXT NOT NULL,
        message_text TEXT NOT NULL,
        query_type TEXT,
        message_timestamp TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW ()
    );

-- =========================================
-- MESSAGE AI METADATA TABLE
-- Tracks AI drafting and review workflow
-- =========================================
CREATE TABLE
    message_ai_metadata (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        message_id UUID NOT NULL REFERENCES messages (id),
        ai_drafted_reply TEXT,
        confidence_score NUMERIC(3, 2),
        action_type TEXT,
        -- auto_send / agent_review / escalate
        was_auto_sent BOOLEAN DEFAULT FALSE,
        was_agent_edited BOOLEAN DEFAULT FALSE,
        agent_notes TEXT,
        created_at TIMESTAMP DEFAULT NOW ()
    );