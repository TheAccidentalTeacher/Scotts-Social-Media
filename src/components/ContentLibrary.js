import React, { useState, useEffect } from 'react';
import { 
  FiFolder, 
  FiEdit3, 
  FiTrash2, 
  FiCopy, 
  FiDownload,
  FiInstagram,
  FiFacebook,
  FiClock,
  FiSearch
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const ContentLibrary = ({ onEditContent }) => {
  const [savedContent, setSavedContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');

  useEffect(() => {
    loadSavedContent();
  }, []);

  const loadSavedContent = () => {
    // Load from localStorage - in production, this would be from a database
    const saved = localStorage.getItem('socialMediaContent');
    if (saved) {
      setSavedContent(JSON.parse(saved));
    }
  };

  const deleteContent = (id) => {
    const updated = savedContent.filter(item => item.id !== id);
    setSavedContent(updated);
    localStorage.setItem('socialMediaContent', JSON.stringify(updated));
    toast.success('Content deleted from library');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const exportContent = (content) => {
    const exportData = `CAPTION:\n${content.caption}\n\nHASHTAGS:\n${content.hashtags.join(' ')}\n\nIMAGE PROMPT:\n${content.imagePrompt}\n\nPLATFORM: ${content.platform}\nTYPE: ${content.contentType}\nCREATED: ${new Date(content.generatedAt).toLocaleDateString()}`;
    
    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content_${content.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Content exported!');
  };

  const filteredContent = savedContent.filter(item => {
    const matchesSearch = item.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPlatform = filterPlatform === 'all' || item.platform === filterPlatform;
    return matchesSearch && matchesPlatform;
  });

  const getPlatformIcon = (platform) => {
    return platform === 'instagram' ? <FiInstagram /> : <FiFacebook />;
  };

  return (
    <div className="content-library">
      <div className="library-header">
        <h2><FiFolder /> Content Library</h2>
        <p>Manage your saved content and export for posting</p>
      </div>

      <div className="library-filters">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <select 
          value={filterPlatform}
          onChange={(e) => setFilterPlatform(e.target.value)}
          className="platform-filter"
        >
          <option value="all">All Platforms</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
        </select>
      </div>

      {filteredContent.length === 0 ? (
        <div className="empty-library">
          <FiFolder size={48} />
          <h3>No content found</h3>
          <p>Generate some content to see it here!</p>
        </div>
      ) : (
        <div className="content-grid">
          {filteredContent.map(content => (
            <div key={content.id} className="content-card">
              <div className="card-header">
                <div className="platform-info">
                  {getPlatformIcon(content.platform)}
                  <span>{content.platform} {content.contentType}</span>
                </div>
                <div className="card-actions">
                  <button
                    onClick={() => onEditContent && onEditContent(content)}
                    className="btn-icon"
                    title="Edit"
                  >
                    <FiEdit3 />
                  </button>
                  <button
                    onClick={() => deleteContent(content.id)}
                    className="btn-icon delete"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              <div className="card-content">
                <div className="caption-preview">
                  {content.caption.length > 150 
                    ? `${content.caption.substring(0, 150)}...` 
                    : content.caption
                  }
                </div>
                
                <div className="hashtags-preview">
                  {content.hashtags.slice(0, 5).join(' ')}
                  {content.hashtags.length > 5 && '...'}
                </div>
              </div>

              <div className="card-footer">
                <div className="timestamp">
                  <FiClock />
                  <span>{new Date(content.savedAt || content.generatedAt).toLocaleDateString()}</span>
                </div>
                
                <div className="footer-actions">
                  <button
                    onClick={() => copyToClipboard(content.caption)}
                    className="btn-small"
                    title="Copy Caption"
                  >
                    <FiCopy /> Copy
                  </button>
                  <button
                    onClick={() => exportContent(content)}
                    className="btn-small"
                    title="Export"
                  >
                    <FiDownload /> Export
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentLibrary;
