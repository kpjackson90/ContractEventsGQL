CREATE TABLE event (
    id BIGSERIAL,
    log_index INTEGER,
    transaction_index INTEGER,
    transaction_hash TEXT,
    block_hash TEXT,
    block_number INTEGER,
    address TEXT,
    transaction_id TEXT,
    return_value_from TEXT,
    return_value_to TEXT,
    return_value_token_id TEXT,
    event_type TEXT,
    signature TEXT,
    read BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW()
);
