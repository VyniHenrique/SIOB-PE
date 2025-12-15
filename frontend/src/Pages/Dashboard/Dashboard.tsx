import React, { useEffect, useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// URL ÚNICA (Só Python)
const PYTHON_API = "https://api-flask-yv1m.onrender.com/api";

export function Dashboard() {
  const [statsNatureza, setStatsNatureza] = useState<Record<string, number>>({});
  const [statsBairros, setStatsBairros] = useState<Record<string, number>>({});
  const [importancias, setImportancias] = useState<any[]>([]);
  
  const [formValues, setFormValues] = useState({
    municipio: 'Recife',
    bairro: '',
    hora: 12
  });
  const [previsaoResult, setPrevisaoResult] = useState<any>(null);
  const [loadingPrevisao, setLoadingPrevisao] = useState(false);

  useEffect(() => {
    carregarDadosDoPython();
  }, []);

  const carregarDadosDoPython = async () => {
    try {
      // 1. Busca os dados dos Gráficos (Rosca e Barras) no Python
      const resStats = await fetch(`${PYTHON_API}/dados/dashboard`);
      if (resStats.ok) {
        const data = await resStats.json();
        // Preenche os estados com a resposta do Python
        setStatsNatureza(data.natureza || {});
        setStatsBairros(data.bairros || {});
      } else {
        console.error("Erro ao buscar dados do dashboard:", resStats.statusText);
      }

      // 2. Busca a importância das features (Modelo)
      const resModel = await fetch(`${PYTHON_API}/modelo/importancia`);
      if (resModel.ok) {
        const data = await resModel.json();
        setImportancias(data);
      }
    } catch (error) {
      console.error("API Python indisponível:", error);
    }
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingPrevisao(true);
    setPrevisaoResult(null);

    try {
      const response = await fetch(`${PYTHON_API}/predizer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          municipio: formValues.municipio,
          bairro: formValues.bairro,
          hora: Number(formValues.hora)
        })
      });
      const data = await response.json();
      setPrevisaoResult(data);
    } catch (error) {
      alert("Erro na previsão.");
    } finally {
      setLoadingPrevisao(false);
    }
  };

  // --- Configuração dos Gráficos ---

  const dataRosca = useMemo(() => {
    const labels = Object.keys(statsNatureza);
    const valores = Object.values(statsNatureza);
    return {
      labels: labels.length > 0 ? labels : ['Sem dados'],
      datasets: [{
        data: valores.length > 0 ? valores : [1],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#C9CBCF'],
        hoverOffset: 4
      }]
    };
  }, [statsNatureza]);

  const dataBarra = useMemo(() => {
    const labels = Object.keys(statsBairros);
    const valores = Object.values(statsBairros);
    return {
      labels: labels.length > 0 ? labels : ['Sem dados'],
      datasets: [{
        label: 'Ocorrências',
        data: valores.length > 0 ? valores : [0],
        backgroundColor: '#36A2EB'
      }]
    };
  }, [statsBairros]);

  const dataModelImp = useMemo(() => {
    return {
      labels: importancias.map((i: any) => i.feature.replace('cat__', '').replace('num__', '')),
      datasets: [{
        label: 'Influência (%)',
        data: importancias.map((i: any) => i.score),
        backgroundColor: '#4BC0C0',
        indexAxis: 'y' as const
      }]
    };
  }, [importancias]);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard Operacional (Python Backend)</h2>

      <div className="charts-row">
        <div className="grafico-box">
          <h3>Ocorrências por Natureza</h3>
          <div className="chart-wrapper">
            <Doughnut data={dataRosca} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="grafico-box">
          <h3>Top 5 Bairros</h3>
          <div className="chart-wrapper">
            <Bar data={dataBarra} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="charts-row modelo-row">
        <div className="grafico-box wide">
          <h3>Fatores de Risco (IA)</h3>
          <div className="chart-wrapper">
            <Bar data={dataModelImp} options={{ indexAxis: 'y', responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="box-predicao">
          <h3>Simulador</h3>
          <form onSubmit={handlePredict}>
            <div className="form-group">
              <label>Município</label>
              <select value={formValues.municipio} onChange={e => setFormValues({...formValues, municipio: e.target.value})}>
                <option value="Recife">Recife</option>
                <option value="Olinda">Olinda</option>
                <option value="Jaboatão">Jaboatão</option>
                <option value="Paulista">Paulista</option>
              </select>
            </div>
            <div className="form-group">
              <label>Bairro</label>
              <input type="text" value={formValues.bairro} onChange={e => setFormValues({...formValues, bairro: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Hora (0-23)</label>
              <input type="number" min="0" max="23" value={formValues.hora} onChange={e => setFormValues({...formValues, hora: Number(e.target.value)})} required />
            </div>
            <button type="submit" className="btn-predict" disabled={loadingPrevisao}>
              {loadingPrevisao ? 'Calculando...' : 'Prever'}
            </button>
          </form>

          {previsaoResult && (
            <div className="resultado-card">
              <h4>{previsaoResult.previsao}</h4>
              {Object.entries(previsaoResult.confianca || {}).slice(0,3).map(([k,v]:any) => (
                 <div key={k} style={{display:'flex', justifyContent:'space-between', fontSize:'0.8em', margin:'5px 0'}}>
                    <span>{k}</span>
                    <span style={{fontWeight:'bold'}}>{(v*100).toFixed(1)}%</span>
                 </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}