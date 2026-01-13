import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getPosts, updatePost } from '../services/postService';
import toast from 'react-hot-toast';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const posts = await getPosts();
      const post = posts.find((p) => p.id === id);

      if (!post) {
        setError('Post not found');
        return;
      }

      setTitle(post.title);
      setContent(post.content);
      setError('');
    } catch (err) {
      setError('Failed to load post. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    setSaving(true);

    try {
      await updatePost(id, title, content);
      toast.success('Post updated successfully');
      navigate('/posts');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-medium">Retrieving your story...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb/Back link */}
      <Link to="/posts" className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold mb-6 inline-flex items-center gap-2 transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Posts
      </Link>

      <div className="mb-10 mt-4">
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">
          Edit Post
        </h1>
        <p className="text-slate-400">
          Make adjustments to your story. Changes will reflect immediately.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="group">
          <label htmlFor="title" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-indigo-400 transition">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-xl font-semibold"
            placeholder="Enter post title"
            maxLength={200}
            required
          />
        </div>

        <div className="group">
          <label htmlFor="content" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-indigo-400 transition">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full bg-slate-900 border border-slate-800 text-slate-200 px-5 py-4 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all leading-relaxed resize-none"
            placeholder="Write your post content here..."
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-500 text-white px-12 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/posts')}
            className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 text-slate-300 px-12 py-4 rounded-2xl font-bold transition-all active:scale-95 border border-slate-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;