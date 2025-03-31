CREATE TABLE ambulatorio (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE parte_del_corpo (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE esame (
    id SERIAL PRIMARY KEY,
    codice_ministeriale VARCHAR(10),
    codice_interno VARCHAR(10),
    descrizione VARCHAR(100) NOT NULL,
    parte_del_corpo_id INT REFERENCES parti_del_corpo(id) ON DELETE CASCADE
);

CREATE TABLE esame_ambulatorio (
    esame_id INT REFERENCES esame(id) ON DELETE CASCADE,
    ambulatorio_id INT REFERENCES ambulatorio(id) ON DELETE CASCADE,
    PRIMARY KEY (esame_id, ambulatorio_id)
);

-- Dati di test
INSERT INTO ambulatorio (nome) VALUES 
    ('Radiologia'), ('Tac1'), ('Tac2'), ('Risonanza'), 
    ('EcografiaPrivitera'), ('EcografiaMassimino'), ('EcografiaDoppler');

INSERT INTO parte_del_corpo (nome) VALUES 
    ('Testa'), ('Arti superiori'), ('Addome'), ('Torace');

INSERT INTO esame (codice_ministeriale, codice_interno, descrizione, parte_del_corpo_id) VALUES 
    ('RX123', 'INT001', 'RX mano Dx', 2),
    ('RMN456', 'INT002', 'RMN cranio', 1),
    ('ECO789', 'INT003', 'Eco Addome', 3);

INSERT INTO esame_ambulatorio (esame_id, ambulatorio_id) VALUES 
    (1, 1), (2, 4), (3, 5), (3, 6);
