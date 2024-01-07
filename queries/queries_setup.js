const setupQuery = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    version INTEGER DEFAULT 1,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    steps TEXT,
    owner_id INTEGER REFERENCES users(id)
);

INSERT INTO users (email, password) 
VALUES 
    ('alex@hapgood.me', 'password123'),
    ('garrett@moore.me', 'password456');
`;

module.exports = setupQuery;
