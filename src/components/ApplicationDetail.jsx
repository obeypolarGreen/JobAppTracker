import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, ExternalLink, Edit3, Trash2, Check, Save } from 'lucide-react';

const ApplicationDetail = ({ job, isOpen, onClose, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        if (job) {
            setEditData(job);
            setIsEditing(false);
        }
    }, [job]);

    if (!job || !editData) return null;

    const handleSave = () => {
        onUpdate(editData);
        setIsEditing(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.8)',
                            zIndex: 100,
                            backdropFilter: 'blur(4px)'
                        }}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="glass"
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '500px',
                            zIndex: 101,
                            padding: '3rem',
                            borderRadius: '24px 0 0 24px',
                            borderLeft: '1px solid var(--accent-cyan)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                            <div className="mono" style={{ color: 'var(--accent-cyan)' }}>ENTRY_ID: {job.id}</div>
                            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </header>

                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            <section style={{ marginBottom: '3rem' }}>
                                {isEditing ? (
                                    <input
                                        className="glass mono"
                                        style={{ fontSize: '2rem', padding: '0.5rem', width: '100%', marginBottom: '0.5rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-primary)' }}
                                        value={editData.company}
                                        onChange={e => setEditData({ ...editData, company: e.target.value })}
                                    />
                                ) : (
                                    <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{job.company}</h2>
                                )}

                                {isEditing ? (
                                    <input
                                        className="glass mono"
                                        style={{ color: 'var(--accent-cyan)', fontSize: '1.2rem', padding: '0.5rem', width: '100%', background: 'rgba(255,255,255,0.05)', border: 'none' }}
                                        value={editData.role}
                                        onChange={e => setEditData({ ...editData, role: e.target.value })}
                                    />
                                ) : (
                                    <p style={{ color: 'var(--accent-cyan)', fontSize: '1.2rem', fontWeight: '600' }}>{job.role}</p>
                                )}

                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                    <span className="glass mono" style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem' }}>{job.status.toUpperCase()}</span>
                                    <span className="glass mono" style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem' }}>{job.salary}</span>
                                </div>
                            </section>

                            <section style={{ marginBottom: '3rem' }}>
                                <div className="mono" style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '1rem' }}>INTEL_LOG</div>
                                {isEditing ? (
                                    <textarea
                                        className="glass mono"
                                        style={{ padding: '1.5rem', width: '100%', height: '150px', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-primary)', resize: 'none' }}
                                        value={editData.notes}
                                        onChange={e => setEditData({ ...editData, notes: e.target.value })}
                                    />
                                ) : (
                                    <div className="glass" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)' }}>
                                        {job.notes}
                                    </div>
                                )}

                                <div style={{ marginTop: '1.5rem', color: 'var(--accent-magenta)' }}>
                                    <span className="mono" style={{ fontSize: '0.7rem' }}>NEXT_OBJECTIVE:</span>
                                    {isEditing ? (
                                        <input
                                            className="glass mono"
                                            style={{ padding: '0.5rem', width: '100%', marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-primary)' }}
                                            value={editData.nextStep}
                                            onChange={e => setEditData({ ...editData, nextStep: e.target.value })}
                                        />
                                    ) : (
                                        <p style={{ fontWeight: '600' }}>{job.nextStep}</p>
                                    )}
                                </div>
                            </section>

                            <section style={{ marginBottom: '3rem' }}>
                                <div className="mono" style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '1rem' }}>CONTACT_NETWORK</div>
                                {job.contacts.length > 0 ? job.contacts.map((c, i) => (
                                    <div key={i} className="glass" style={{ padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{c.name}</div>
                                            <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{c.role}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <Mail size={16} color="var(--text-dim)" />
                                            <Phone size={16} color="var(--text-dim)" />
                                        </div>
                                    </div>
                                )) : <div style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>No contacts linked.</div>}
                            </section>
                        </div>

                        <footer style={{ marginTop: 'auto', display: 'flex', gap: '1rem', paddingTop: '1rem' }}>
                            {isEditing ? (
                                <button
                                    className="glass"
                                    onClick={handleSave}
                                    style={{ flex: 1, padding: '1rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}
                                >
                                    <Save size={18} /> SAVE
                                </button>
                            ) : (
                                <button
                                    className="glass"
                                    onClick={() => setIsEditing(true)}
                                    style={{ flex: 1, padding: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}
                                >
                                    <Edit3 size={18} /> EDIT
                                </button>
                            )}
                            <button
                                className="glass"
                                onClick={() => onDelete(job.id)}
                                style={{ padding: '1rem', color: 'var(--accent-rejected)', cursor: 'pointer' }}
                            >
                                <Trash2 size={18} />
                            </button>
                        </footer>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ApplicationDetail;
