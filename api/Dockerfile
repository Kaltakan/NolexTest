FROM python:3.10

# Imposta la directory di lavoro nel container
WORKDIR /app

# Copia i file di configurazione e i file necessari
COPY requirements.txt .
COPY main.py .
COPY config.ini .

# Installa le dipendenze
RUN pip install --no-cache-dir -r requirements.txt

# Espone la porta dell'app Flask
EXPOSE 5000

# Comando di avvio
CMD ["python", "main.py"]