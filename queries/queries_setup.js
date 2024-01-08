const setupQuery = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
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
-- seed db with test data
INSERT INTO users (email, password) 
    VALUES 
        ('alex@hapgood.me', 'password123'),
        ('garrett@moore.me', 'password456');
INSERT INTO recipes (name, description, steps, owner_id)
    VALUES
        ('test recipe 1!', 'this is a test recipe entry #1!', '1. grind beans. 2. make coffee. 3. Drink coffee', 1),
        ('test recipe 2!', 'this is a test recipe entry #2!', '1. grind beans BETTER. 2. make coffee BETTER. 3. Drink coffee MORE', 2);
`;

module.exports = setupQuery;