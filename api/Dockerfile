# Usa un'immagine base di Python
FROM python:3.9

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file del backend nella directory di lavoro
COPY . .

# Installa le dipendenze
RUN pip install --no-cache-dir -r requirements.txt

# Esponi la porta su cui gira Flask
EXPOSE 5000

# Comando per avviare l'app Flask
CMD ["python", "main.py"]
