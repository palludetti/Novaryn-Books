import React, { useState, useEffect } from 'react';
import { X, Download, Users, Trash2, Mail, Phone, Calendar, Search } from 'lucide-react';

export default function AdminLeadsModal({ isOpen, onClose }) {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      const storedLeads = JSON.parse(localStorage.getItem('maquina_lucro_leads') || '[]');
      setLeads(storedLeads);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    if (leads.length === 0) return alert('Nenhum lead registrado para exportar.');
    
    const headers = ['ID', 'Data', 'Nome', 'Email', 'WhatsApp', 'Faturamento Simulado', 'Lucro Extra Estimado'];
    const rows = leads.map(l => [
      l.id,
      `"${l.date}"`,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.phone || ''}"`,
      l.calculatorData ? `R$ ${l.calculatorData.revenue}` : 'N/A',
      l.calculatorData ? `R$ ${l.calculatorData.yearlyExtraProfit?.toFixed(2)}` : 'N/A'
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_maquina_de_lucro_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearLeads = () => {
    if (confirm('Tem certeza que deseja apagar os leads salvos no navegador?')) {
      localStorage.removeItem('maquina_lucro_leads');
      setLeads([]);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '900px' }} onClick={(e) => e.stopPropagation()}>
        
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
        >
          <X size={24} />
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
              <Users size={14} /> Painel Privado do Autor
            </span>
            <h2 className="font-display" style={{ fontSize: '1.8rem', color: '#ffffff' }}>
              Leads Capturados ({leads.length})
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-primary" onClick={exportToCSV} style={{ padding: '10px 18px', fontSize: '0.9rem' }}>
              <Download size={16} /> Exportar CSV (Excel)
            </button>
            {leads.length > 0 && (
              <button 
                onClick={clearLeads} 
                style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou e-mail..." 
            className="form-input" 
            style={{ paddingLeft: '44px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.03)' }}>
                <th style={{ padding: '14px' }}>Data</th>
                <th style={{ padding: '14px' }}>Nome</th>
                <th style={{ padding: '14px' }}>E-mail</th>
                <th style={{ padding: '14px' }}>WhatsApp</th>
                <th style={{ padding: '14px' }}>Potencial Extra</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: '#e2e8f0' }}>
                    <td style={{ padding: '14px', color: '#94a3b8', fontSize: '0.8rem' }}>{lead.date}</td>
                    <td style={{ padding: '14px', fontWeight: 600 }}>{lead.name}</td>
                    <td style={{ padding: '14px', color: '#38bdf8' }}>{lead.email}</td>
                    <td style={{ padding: '14px', color: '#94a3b8' }}>{lead.phone || '-'}</td>
                    <td style={{ padding: '14px', color: '#34d399', fontWeight: 700 }}>
                      {lead.calculatorData ? `+ R$ ${lead.calculatorData.yearlyExtraProfit?.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}/ano` : 'Capítulo'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                    Nenhum lead capturado ainda. Simule um cálculo na calculadora ou baixe o capítulo para testar!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
