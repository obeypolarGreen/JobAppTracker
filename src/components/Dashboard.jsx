import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Activity, Zap } from 'lucide-react';
import { STAGES } from '../data';

const StatCard = ({ title, value, sub, icon: Icon, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass"
        style={{ padding: '1.5rem', flex: 1, minWidth: '240px' }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div className="mono" style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>{title}</div>
            <Icon size={20} color={color} />
        </div>
        <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{value}</div>
        <div className="mono" style={{ color: color, fontSize: '0.7rem' }}>{sub}</div>
    </motion.div>
);

const Dashboard = ({ data }) => {
    const totalApps = data.length;
    const interviewing = data.filter(d => ['phone-screen', 'onsite'].includes(d.status)).length;
    const responseRate = totalApps > 0 ? ((data.filter(d => d.status !== 'applied').length / totalApps) * 100).toFixed(0) : 0;

    // Find the max count for scaling the chart
    const stageCounts = STAGES.map(s => data.filter(d => d.status === s.id).length);
    const maxCount = Math.max(...stageCounts, 1); // Avoid division by zero

    return (
        <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto', flex: 1 }}>
            <div className="stats-grid" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <StatCard
                    title="ACTIVE_ENGAGEMENTS"
                    value={totalApps}
                    sub="+12% FROM_PREV_WEEK"
                    icon={Activity}
                    color="var(--accent-cyan)"
                />
                <StatCard
                    title="INTERVIEW_PIPELINE"
                    value={interviewing}
                    sub={`${interviewing}_CRITICAL_NEXT_STEPS`}
                    icon={Target}
                    color="var(--accent-magenta)"
                />
                <StatCard
                    title="RESPONSE_EFFICIENCY"
                    value={`${responseRate}%`}
                    sub="OPTIMIZED_VECTOR"
                    icon={TrendingUp}
                    color="var(--accent-green)"
                />
                <StatCard
                    title="OFFERS_SECURED"
                    value={data.filter(d => d.status === 'offer').length}
                    sub="READY_FOR_EXTRACTION"
                    icon={Zap}
                    color="var(--accent-cyan)"
                />
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', height: '400px' }}>
                <div className="glass" style={{ flex: 2, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                    <h3 className="mono" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>PIPELINE_DISTRIBUTION</h3>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '2rem', padding: '1rem 0' }}>
                        {STAGES.map(s => {
                            const count = data.filter(d => d.status === s.id).length;
                            const heightPercentage = (count / maxCount) * 100;
                            return (
                                <div key={s.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', height: '100%', justifyContent: 'flex-end' }}>
                                    <div className="mono" style={{ fontSize: '0.8rem', color: s.color }}>{count}</div>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${heightPercentage}%` }}
                                        style={{
                                            width: '40px',
                                            background: `linear-gradient(to top, rgba(20,20,20,0.5), ${s.color})`,
                                            borderRadius: '4px 4px 0 0',
                                            opacity: 0.9,
                                            boxShadow: `0 0 15px ${s.color}33`,
                                            minHeight: count > 0 ? '4px' : '0'
                                        }}
                                    />
                                    <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{s.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="glass" style={{ flex: 1, padding: '2rem' }}>
                    <h3 className="mono" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>RECENT_INTEL</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {data.slice(-3).reverse().map(job => (
                            <div key={job.id} style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                                <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--accent-cyan)' }}>{job.status.toUpperCase()}</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{job.company}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{job.nextStep}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
