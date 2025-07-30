import React, { useState } from 'react';
import { 
  FiEdit3, 
  FiImage, 
  FiCopy, 
  FiDownload, 
  FiInstagram, 
  FiFacebook,
  FiRefreshCw,
  FiEye,
  FiHash,
  FiType,
  FiSave
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { contentService } from '../services/contentService';
import ContentLibrary from '../components/ContentLibrary';
import './Creator.css';
import '../components/ContentLibrary.css';

const Creator = () => {
  const [contentType, setContentType] = useState('post');
  const [platform, setPlatform] = useState('instagram');
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Topic suggestions for quick selection
  const topicSuggestions = [
    'Classroom Management',
    'STEM Activities', 
    'Teacher Self-Care',
    'Student Engagement',
    'Lesson Planning',
    'Back to School',
    'Summer Teaching Prep',
    'Technology in Education',
    'Differentiated Learning',
    'Assessment Strategies'
  ];

  // Content generation using the service
  const generateContent = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic for content generation');
      return;
    }

    setIsGenerating(true);
    
    try {
      const content = await contentService.generateContent(topic, platform, contentType);
      setGeneratedContent(content);
      toast.success('Content generated successfully!');
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const exportContent = () => {
    if (!generatedContent) return;
    
    const content = `CAPTION:\n${generatedContent.caption}\n\nHASHTAGS:\n${generatedContent.hashtags.join(' ')}\n\nIMAGE PROMPT:\n${generatedContent.imagePrompt}\n\nPLATFORM: ${generatedContent.platform}\nTYPE: ${generatedContent.contentType}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '_')}_content.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Content exported successfully!');
  };

  const saveToLibrary = () => {
    if (!generatedContent) return;
    
    // Save to localStorage (in production, this would be a database)
    const savedContent = JSON.parse(localStorage.getItem('socialMediaContent') || '[]');
    const newContent = {
      ...generatedContent,
      id: Date.now(),
      savedAt: new Date().toISOString(),
      topic: topic
    };
    
    const updated = [newContent, ...savedContent];
    localStorage.setItem('socialMediaContent', JSON.stringify(updated));
    
    toast.success('Content saved to library!');
  };

  const editContent = (content) => {
    setTopic(content.topic || '');
    setPlatform(content.platform);
    setContentType(content.contentType);
    setGeneratedContent(content);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.info('Content loaded for editing');
  };

  const ContentPreview = ({ content }) => (
    <div className="content-preview">
      <h3><FiEye /> Content Preview</h3>
      <div className="preview-card">
        <div className="preview-header">
          {platform === 'instagram' ? <FiInstagram /> : <FiFacebook />}
          <span>{platform.charAt(0).toUpperCase() + platform.slice(1)} {contentType}</span>
        </div>
        
        <div className="preview-image-placeholder">
          <FiImage size={48} />
          <p>Generated Image Would Appear Here</p>
          <small>{content.imagePrompt}</small>
        </div>
        
        <div className="preview-caption">
          <pre>{content.caption}</pre>
        </div>
        
        <div className="preview-hashtags">
          <FiHash />
          <span>{content.hashtags.join(' ')}</span>
        </div>
        
        <div className="preview-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => copyToClipboard(content.caption)}
          >
            <FiCopy /> Copy Caption
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => copyToClipboard(content.hashtags.join(' '))}
          >
            <FiHash /> Copy Hashtags
          </button>
          <button 
            className="btn btn-success"
            onClick={saveToLibrary}
          >
            <FiSave /> Save to Library
          </button>
          <button 
            className="btn btn-primary"
            onClick={exportContent}
          >
            <FiDownload /> Export All
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="creator-container">
      <div className="creator-header">
        <h1><FiEdit3 /> Content Creator</h1>
        <p>Generate AI-powered content for your social media platforms</p>
      </div>

      <div className="creator-form">
        <div className="form-row">
          <div className="form-group">
            <label>Platform</label>
            <select 
              value={platform} 
              onChange={(e) => setPlatform(e.target.value)}
              className="form-control"
            >
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Content Type</label>
            <select 
              value={contentType} 
              onChange={(e) => setContentType(e.target.value)}
              className="form-control"
            >
              <option value="post">Regular Post</option>
              <option value="story">Story</option>
              <option value="reel">Reel/Video</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Topic/Theme</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Classroom Management, STEM Activities, Teacher Self-Care..."
            className="form-control"
          />
          
          <div className="topic-suggestions">
            <small>Quick suggestions:</small>
            <div className="suggestion-pills">
              {topicSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="suggestion-pill"
                  onClick={() => setTopic(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button 
          className="btn btn-primary btn-generate"
          onClick={generateContent}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <FiRefreshCw className="spinning" /> Generating...
            </>
          ) : (
            <>
              <FiType /> Generate Content
            </>
          )}
        </button>
      </div>

      {generatedContent && <ContentPreview content={generatedContent} />}

      <ContentLibrary onEditContent={editContent} />
    </div>
  );
};

export default Creator;
