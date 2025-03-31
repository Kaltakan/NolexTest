import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [ambulatori, setAmbulatori] = useState([]);
  const [partiDelCorpo, setPartiDelCorpo] = useState([]);
  const [esami, setEsami] = useState([]);
  const [selectedAmbulatorio, setSelectedAmbulatorio] = useState(null);
  const [selectedParteDelCorpo, setSelectedParteDelCorpo] = useState(null);
  const [selectedEsami, setSelectedEsami] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("descrizione");

  useEffect(() => {
    axios.get("http://localhost:5000/ambulatori").then((res) => {
      setAmbulatori(res.data);
      if (res.data.length > 0) setSelectedAmbulatorio(res.data[0].id);
    });
  }, []);

  useEffect(() => {
    if (selectedAmbulatorio) {
      axios.get(`http://localhost:5000/parti-del-corpo`).then((res) => {
        setPartiDelCorpo(res.data);
        if (res.data.length > 0) setSelectedParteDelCorpo(res.data[0].id);
      });
    }
  }, [selectedAmbulatorio]);

  useEffect(() => {
    if (selectedAmbulatorio && selectedParteDelCorpo) {
      axios
        .get(
          `http://localhost:5000/esami?ambulatorio_id=${selectedAmbulatorio}&parte_del_corpo_id=${selectedParteDelCorpo}`
        )
        .then((res) => {
          setEsami(res.data);
        });
    }
  }, [selectedAmbulatorio, selectedParteDelCorpo]);

  const handleSearch = () => {
    axios
      .get(`http://localhost:5000/esami/search?campo=${searchField}&filtro=${searchTerm}`)
      .then((res) => {
        setEsami(res.data);
      });
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100 min-vw-100 py-4">
      <div className="container bg-black text-white p-4 rounded">
        <div className="row">
          <div className="col-md-4">
            <h2>Ambulatori</h2>
            <select className="form-control" onChange={(e) => setSelectedAmbulatorio(e.target.value)}>
              {ambulatori.map((a) => (
                <option key={a.id} value={a.id}>{a.nome}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <h2>Parti del Corpo</h2>
            <select className="form-control" onChange={(e) => setSelectedParteDelCorpo(e.target.value)}>
              {partiDelCorpo.map((p) => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <h2>Ricerca Esami</h2>
            <input
              className="form-control mb-2"
              placeholder="Cerca esame"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select className="form-control mb-2" onChange={(e) => setSearchField(e.target.value)}>
              <option value="codice_ministeriale">Codice Ministeriale</option>
              <option value="codice_interno">Codice Interno</option>
              <option value="descrizione">Descrizione</option>
            </select>
            <button className="btn btn-primary me-2" onClick={handleSearch}>Cerca</button>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <h2>Esami</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Codice</th>
                  <th>Descrizione</th>
                  <th>Seleziona</th>
                </tr>
              </thead>
              <tbody>
                {esami.map((e) => (
                  <tr key={e.id}>
                    <td>{e.codice_ministeriale}</td>
                    <td>{e.descrizione}</td>
                    <td>
                      <button className="btn btn-success" onClick={() => setSelectedEsami([...selectedEsami, e])}>
                        Seleziona
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
