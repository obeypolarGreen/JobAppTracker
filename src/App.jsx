import React, { useState } from 'react';
import {
  LayoutDashboard,
  Columns,
  Search,
  Plus,
  Settings,
  Bell,
  Briefcase,
  X,
  Shield,
  Zap,
  Cpu,
  Globe
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import KanbanBoard from './components/KanbanBoard';
import ApplicationDetail from './components/ApplicationDetail';
import { MOCK_DATA, STAGES } from './data';
import './index.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState(MOCK_DATA);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filtered jobs for display
  const filteredJobs = jobs.filter(job =>
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CRUD Handlers
  const addJob = (newJob) => {
    setJobs([...jobs, { ...newJob, id: Date.now().toString() }]);
    setIsAddModalOpen(false);
  };

  const updateJob = (updatedJob) => {
    setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
    setSelectedJob(updatedJob);
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
    setSelectedJob(null);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const updatedJobs = jobs.map(job => {
      if (job.id === draggableId) {
        return { ...job, status: destination.droppableId };
      }
      return job;
    });
    setJobs(updatedJobs);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard data={filteredJobs} />;
      case 'notifications':
        return <NotificationsView />;
      case 'parameters':
        return <ParametersView />;
      default:
        return (
          <KanbanBoard
            data={filteredJobs}
            onCardClick={setSelectedJob}
            onDragEnd={onDragEnd}
          />
        );
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'COMMAND_CENTER';
      case 'notifications': return 'INTEL_FEEDS';
      case 'parameters': return 'SYSTEM_PARAMETERS';
      default: return 'PIPELINE_STATUS';
    }
  };

  const getPageSub = () => {
    switch (activeTab) {
      case 'dashboard': return 'System vitals and performance metrics.';
      case 'notifications': return 'Real-time updates from your recruitment vector.';
      case 'parameters': return 'Configure your tactical interface and data hooks.';
      default: return 'Current tactical deployment of applications.';
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo-section">
          <h2 style={{ color: 'var(--accent-cyan)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={28} />
            <span style={{ letterSpacing: '-1px' }}>HUNT</span>
          </h2>
          <div className="mono" style={{ color: 'var(--text-dim)', fontSize: '0.7rem', marginBottom: '2rem' }}>
            OPERATIONAL_INTEL_V1.1
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          <div
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard />
            <span>Dashboard</span>
          </div>
          <div
            className={`nav-item ${activeTab === 'kanban' ? 'active' : ''}`}
            onClick={() => setActiveTab('kanban')}
          >
            <Columns />
            <span>Pipeline</span>
          </div>
          <div className="nav-item">
            <Search size={20} />
            <input
              type="text"
              placeholder="SEARCH..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mono"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                outline: 'none',
                width: '100%',
                fontSize: '0.7rem'
              }}
            />
          </div>
        </nav>

        <div className="bottom-nav">
          <div
            className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell />
            <span>Notifications</span>
          </div>
          <div
            className={`nav-item ${activeTab === 'parameters' ? 'active' : ''}`}
            onClick={() => setActiveTab('parameters')}
          >
            <Settings />
            <span>Parameters</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          <div>
            <h1 style={{ fontSize: '2.5rem' }}>{getPageTitle()}</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{getPageSub()}</p>
          </div>
          <button
            className="glass"
            style={{
              padding: '0.75rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--accent-cyan)',
              cursor: 'pointer',
              fontWeight: '600'
            }}
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={20} />
            ADD_NEW_ENTRY
          </button>
        </header>

        {renderContent()}

        <ApplicationDetail
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          onUpdate={updateJob}
          onDelete={deleteJob}
        />

        {/* Add Job Modal */}
        {isAddModalOpen && (
          <AddJobModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={addJob}
          />
        )}
      </main>
    </div>
  );
};

const NotificationsView = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', flex: 1 }}>
    <div className="glass" style={{ padding: '2rem', borderLeft: '4px solid var(--accent-magenta)' }}>
      <div className="mono" style={{ color: 'var(--accent-magenta)', marginBottom: '0.5rem' }}>NEW_UPDATE_DETECTED</div>
      <h3 style={{ marginBottom: '0.5rem' }}>Neuralink Application Response</h3>
      <p style={{ color: 'var(--text-secondary)' }}>System flagged a new email regarding your "Full Stack Engineer" application. Checking content...</p>
    </div>
    <div className="glass" style={{ padding: '2rem', borderLeft: '4px solid var(--accent-cyan)' }}>
      <div className="mono" style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>PIPELINE_STAGNATION_ALERT</div>
      <h3 style={{ marginBottom: '0.5rem' }}>OpenAI (3 Days Inactive)</h3>
      <p style={{ color: 'var(--text-secondary)' }}>No movement detected in the 'Phone Screen' stage. Recommended action: Follow up with Greg.</p>
    </div>
    <div className="glass" style={{ padding: '2rem', borderLeft: '4px solid var(--accent-green)' }}>
      <div className="mono" style={{ color: 'var(--accent-green)', marginBottom: '0.5rem' }}>SUCCESS_VECTOR_STRENGTHENED</div>
      <h3 style={{ marginBottom: '0.5rem' }}>New Offer Verified</h3>
      <p style={{ color: 'var(--text-secondary)' }}>Stripe offer package has been fully parsed. Salary vector: $210k + Equity.</p>
    </div>
  </div>
);

const ParametersView = () => (
  <div className="glass" style={{ padding: '3rem', overflowY: 'auto', flex: 1 }}>
    <h2 className="mono" style={{ color: 'var(--accent-cyan)', marginBottom: '3rem' }}>INTERFACE_CONFIGURATION</h2>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Zap size={18} color="var(--accent-cyan)" /> PERFORMANCE_MODE
          </h4>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Enable high-frequency UI updates and complex animations (Framer Motion Engine).</p>
          <div className="glass" style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', color: 'var(--accent-green)', textAlign: 'center', cursor: 'pointer' }}>ENABLED</div>
        </div>
        <div>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Cpu size={18} color="var(--accent-magenta)" /> DATA_HOOKS
          </h4>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Connect external sources like Gmail, LinkedIn, and Greenhouse for automated tracking.</p>
          <div className="glass" style={{ marginTop: '1rem', padding: '1rem', border: '1px dashed var(--border-strong)', textAlign: 'center', cursor: 'pointer' }}>LINK_NEW_SOURCE</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Globe size={18} color="var(--accent-green)" /> NEURAL_SYNC
          </h4>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Sync your application status with your private network for referral tracking.</p>
          <div className="glass" style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', textAlign: 'center' }}>OFFLINE</div>
        </div>
        <div>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Shield size={18} color="var(--accent-cyan)" /> ENCRYPTION_LEVEL
          </h4>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>All local data is AES-256 encrypted before local storage persistence.</p>
          <div className="glass" style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0, 242, 255, 0.1)', color: 'var(--accent-cyan)', textAlign: 'center' }}>MAX_SECURE</div>
        </div>
      </div>
    </div>
  </div>
);

const AddJobModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'applied',
    salary: '',
    nextStep: 'Awaiting Response',
    notes: '',
    date: new Date().toISOString().split('T')[0],
    contacts: []
  });

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)'
    }}>
      <div className="glass" style={{ width: '500px', padding: '2.5rem', border: '1px solid var(--accent-cyan)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h2 className="mono" style={{ color: 'var(--accent-cyan)' }}>INITIATE_NEW_ENTRY</h2>
          <X onClick={onClose} style={{ cursor: 'pointer', color: 'var(--text-dim)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>TARGET_COMPANY</label>
            <input
              type="text"
              className="glass mono"
              style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', border: 'none', color: 'var(--text-primary)', outline: 'none' }}
              value={formData.company}
              onChange={e => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. SpaceX"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>DESIGNATED_ROLE</label>
            <input
              type="text"
              className="glass mono"
              style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', border: 'none', color: 'var(--text-primary)', outline: 'none' }}
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Lead Dev"
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>STAGE</label>
              <select
                className="glass mono"
                style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', border: 'none', color: 'var(--text-primary)', outline: 'none' }}
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>COMPENSATION</label>
              <input
                type="text"
                className="glass mono"
                style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', border: 'none', color: 'var(--text-primary)', outline: 'none' }}
                value={formData.salary}
                onChange={e => setFormData({ ...formData, salary: e.target.value })}
                placeholder="$150k"
              />
            </div>
          </div>
        </div>

        <button
          className="glass mono"
          style={{ width: '100%', marginTop: '2.5rem', padding: '1rem', background: 'var(--accent-cyan)', color: '#000', fontWeight: '800', cursor: 'pointer' }}
          onClick={() => onSave(formData)}
        >
          CONFIRM_DEPLOYMENT
        </button>
      </div>
    </div>
  );
};

export default App;
