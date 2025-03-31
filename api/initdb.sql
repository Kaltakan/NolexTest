CREATE TABLE ambulatori (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE parti_del_corpo (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE esami (
    id SERIAL PRIMARY KEY,
    codice_ministeriale VARCHAR(10),
    codice_interno VARCHAR(10),
    descrizione VARCHAR(100) NOT NULL,
    parte_del_corpo_id INT REFERENCES parti_del_corpo(id) ON DELETE CASCADE
);

CREATE TABLE esami_ambulatori (
    esame_id INT REFERENCES esami(id) ON DELETE CASCADE,
    ambulatorio_id INT REFERENCES ambulatori(id) ON DELETE CASCADE,
    PRIMARY KEY (esame_id, ambulatorio_id)
);

-- Dati di test
INSERT INTO ambulatori (nome) VALUES 
    ('Radiologia'), ('Tac1'), ('Tac2'), ('Risonanza'), 
    ('EcografiaPrivitera'), ('EcografiaMassimino'), ('EcografiaDoppler');

INSERT INTO parti_del_corpo (nome) VALUES 
    ('Testa'), ('Arti superiori'), ('Addome'), ('Torace');

INSERT INTO esami (codice_ministeriale, codice_interno, descrizione, parte_del_corpo_id) VALUES 
    ('RX123', 'INT001', 'RX mano Dx', 2),
    ('RMN456', 'INT002', 'RMN cranio', 1),
    ('ECO789', 'INT003', 'Eco Addome', 3);

INSERT INTO esami_ambulatori (esame_id, ambulatorio_id) VALUES 
    (1, 1), (2, 4), (3, 5), (3, 6);
