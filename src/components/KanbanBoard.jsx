import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MoreVertical, Calendar, ArrowRight } from 'lucide-react';
import { STAGES } from '../data';

const KanbanBoard = ({ data, onCardClick, onDragEnd }) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div
                className="kanban-container"
                style={{
                    display: 'flex',
                    gap: '1.5rem',
                    height: '100%',
                    overflowX: 'auto',
                    paddingBottom: '1rem',
                    flex: 1
                }}
            >
                {STAGES.map((stage) => (
                    <div key={stage.id} className="kanban-column" style={{
                        minWidth: '320px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        height: '100%'
                    }}>
                        <div className="column-header" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0 0.5rem'
                        }}>
                            <h3 className="mono" style={{ color: stage.color, fontSize: '0.8rem' }}>
                                {stage.label} / {data.filter(d => d.status === stage.id).length}
                            </h3>
                            <div style={{ width: '100%', height: '2px', background: stage.color, opacity: 0.2, margin: '0 1rem' }} />
                        </div>

                        <Droppable droppableId={stage.id}>
                            {(provided, snapshot) => (
                                <div
                                    className="column-content"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem',
                                        overflowY: 'auto',
                                        padding: '0.5rem',
                                        background: snapshot.isDraggingOver ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                                        borderRadius: '12px',
                                        transition: 'background 0.2s ease',
                                        minHeight: '100px'
                                    }}
                                >
                                    {data.filter(d => d.status === stage.id).map((job, index) => (
                                        <Draggable key={job.id} draggableId={job.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    onClick={() => onCardClick(job)}
                                                    className="glass card"
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        padding: '1.25rem',
                                                        cursor: 'pointer',
                                                        border: snapshot.isDragging ? '1px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                                                        zIndex: snapshot.isDragging ? 1000 : 1,
                                                        // Ensure background is solid enough for visibility
                                                        backgroundColor: snapshot.isDragging ? 'var(--bg-elevated)' : 'var(--glass-bg)',
                                                        opacity: 1
                                                    }}
                                                >
                                                    <div style={{
                                                        transform: snapshot.isDragging ? 'rotate(3deg)' : 'none',
                                                        transition: 'transform 0.1s ease',
                                                        height: '100%',
                                                        width: '100%',
                                                        pointerEvents: 'none' // Sub-elements shouldn't interfere with pick-up
                                                    }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                                            <span className="mono" style={{ color: 'var(--text-dim)', fontSize: '0.65rem' }}>{job.date}</span>
                                                            <MoreVertical size={16} color="var(--text-dim)" />
                                                        </div>
                                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{job.company}</h4>
                                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{job.role}</p>

                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                                            <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-dim)' }}>
                                                                <Calendar size={14} />
                                                                <span className="mono" style={{ fontSize: '0.7rem' }}>NEXT_STEP</span>
                                                            </div>
                                                            <ArrowRight size={14} color="var(--accent-cyan)" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;
