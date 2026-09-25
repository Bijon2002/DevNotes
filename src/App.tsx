import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Moon, 
  Sun, 
  Code2, 
  Layers, 
  Copy, 
  Check, 
  X, 
  Sparkles,
  Smartphone
} from 'lucide-react';
import { Category, TechNote } from './types';
import { INITIAL_NOTES } from './defaultNotes';

const CATEGORIES: ('All' | Category)[] = [
  'All',
  'React',
  'Node.js',
  'AI',
  'Docker',
  'GitHub',
  'Cloud'
];

export const App: React.FC = () => {
  const [notes, setNotes] = useState<TechNote[]>(() => {
    const saved = localStorage.getItem('techvault_notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse notes from storage', e);
      }
    }
    return INITIAL_NOTES;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('techvault_theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [viewingNote, setViewingNote] = useState<TechNote | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state for adding note
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('React');
  const [snippet, setSnippet] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    localStorage.setItem('techvault_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('techvault_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const newNote: TechNote = {
      id: Date.now().toString(),
      title: title.trim(),
      category,
      snippet: snippet.trim() || undefined,
      content: content.trim(),
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tags: tags.length > 0 ? tags : [category.toLowerCase()]
    };

    setNotes([newNote, ...notes]);
    // Reset form
    setTitle('');
    setCategory('React');
    setSnippet('');
    setContent('');
    setTagsInput('');
    setIsAddOpen(false);
  };

  const handleDeleteNote = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm('Delete this note?')) {
      setNotes(notes.filter(n => n.id !== id));
      if (viewingNote?.id === id) {
        setViewingNote(null);
      }
    }
  };

  const handleCopySnippet = (code: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredNotes = notes.filter(note => {
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    const matchesQuery = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.snippet && note.snippet.toLowerCase().includes(searchQuery.toLowerCase())) ||
      note.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="app-container">
      {/* Header */}
      <header>
        <div className="brand">
          <div className="brand-icon">
            <Layers size={22} />
          </div>
          <div className="brand-text">
            <h1>TechVault</h1>
            <span>My Tech Notes &amp; Pipeline</span>
          </div>
        </div>
        <div className="header-actions">
          <div className="pipeline-badge" title="Capacitor Android Pipeline Ready">
            <Smartphone size={12} />
            <span>Capacitor APK</span>
          </div>
          <button 
            className="icon-btn" 
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="search-bar">
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          placeholder="Search tech notes, commands, tags..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Filter Chips */}
      <div className="categories-bar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notes List */}
      <div className="notes-grid">
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <Sparkles size={36} />
            <p>No notes found in this category.</p>
            <button className="btn btn-primary" onClick={() => setIsAddOpen(true)}>
              Create First Note
            </button>
          </div>
        ) : (
          filteredNotes.map(note => (
            <div 
              key={note.id} 
              className="note-card"
              onClick={() => setViewingNote(note)}
            >
              <div className="note-header">
                <span className="note-badge">{note.category}</span>
                <button 
                  className="icon-btn" 
                  style={{ width: 28, height: 28 }}
                  onClick={(e) => handleDeleteNote(note.id, e)}
                  title="Delete Note"
                >
                  <Trash2 size={14} color="#ef4444" />
                </button>
              </div>

              <h3 className="note-title">{note.title}</h3>
              <p className="note-body">{note.content}</p>

              {note.snippet && (
                <div className="code-snippet">
                  <code>{note.snippet.split('\n')[0]}...</code>
                </div>
              )}

              <div className="note-footer">
                <span>{note.createdAt}</span>
                <span>{note.tags.map(t => `#${t}`).join(' ')}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Action Button (Add Note) */}
      <button 
        className="fab-add" 
        onClick={() => setIsAddOpen(true)}
        aria-label="Add Note"
      >
        <Plus size={26} />
      </button>

      {/* Add Note Modal */}
      {isAddOpen && (
        <div className="modal-overlay" onClick={() => setIsAddOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add Tech Note</h2>
              <button className="icon-btn" onClick={() => setIsAddOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddNote}>
              <div className="form-group">
                <label>Note Title *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. React 19 Actions or Docker Clean"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select 
                  value={category}
                  onChange={e => setCategory(e.target.value as Category)}
                >
                  {CATEGORIES.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Code Snippet / Command (Optional)</label>
                <textarea 
                  className="code-input"
                  placeholder="Enter code snippet or bash command..."
                  value={snippet}
                  onChange={e => setSnippet(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Notes &amp; Details *</label>
                <textarea 
                  required
                  placeholder="Explain the key concept, architecture or trick..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Tags (Comma separated)</label>
                <input 
                  type="text" 
                  placeholder="e.g. state, hooks, cli"
                  value={tagsInput}
                  onChange={e => setTagsInput(e.target.value)}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Note Modal */}
      {viewingNote && (
        <div className="modal-overlay" onClick={() => setViewingNote(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="note-badge">{viewingNote.category}</span>
              <button className="icon-btn" onClick={() => setViewingNote(null)}>
                <X size={18} />
              </button>
            </div>

            <h2 className="modal-title" style={{ marginBottom: 12 }}>{viewingNote.title}</h2>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
              {viewingNote.content}
            </p>

            {viewingNote.snippet && (
              <div style={{ position: 'relative', marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Code2 size={14} /> Snippet
                  </span>
                  <button 
                    className="icon-btn" 
                    style={{ width: 28, height: 28 }}
                    onClick={(e) => handleCopySnippet(viewingNote.snippet!, viewingNote.id, e)}
                    title="Copy Snippet"
                  >
                    {copiedId === viewingNote.id ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  </button>
                </div>
                <div className="code-snippet" style={{ maxHeight: 220 }}>
                  <code>{viewingNote.snippet}</code>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
              {viewingNote.tags.map(tag => (
                <span key={tag} style={{ fontSize: '0.75rem', background: 'var(--bg-card)', padding: '3px 8px', borderRadius: 4, color: 'var(--text-muted)' }}>
                  #{tag}
                </span>
              ))}
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="btn btn-danger"
                onClick={() => handleDeleteNote(viewingNote.id)}
              >
                Delete
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setViewingNote(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
