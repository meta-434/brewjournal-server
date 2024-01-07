const setupQuery = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    picture_url VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    auth0_id VARCHAR(255) NOT NULL,
    sid VARCHAR(255),
    updated_at TIMESTAMP,
    is_verified BOOLEAN NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
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
`;

module.exports = setupQuery;
