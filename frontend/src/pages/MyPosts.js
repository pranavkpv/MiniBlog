import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../services/postService';
import toast from 'react-hot-toast';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePost(postToDelete.id);
      setPosts(posts.filter(p => p.id !== postToDelete.id));
      setIsDeleteModalOpen(false);
      toast.success('Post deleted');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  if (loading) return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">My Stories</h1>
          <p className="mt-2 text-slate-400 max-w-md">Manage your published thoughts and drafts in one place.</p>
        </div>
        <Link to="/posts/create" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
          <span>+</span> Create New Post
        </Link>
      </div>

      {error && <div className="p-4 mb-8 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">{error}</div>}

      {posts.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/30">
          <p className="text-slate-400 mb-6 font-medium">Your story hasn't started yet.</p>
          <Link to="/posts/create" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4">Write your first post →</Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="group relative bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition line-clamp-2 leading-tight">{post.title}</h2>
                <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">{post.content}</p>
              </div>
              
              <div className="mt-auto pt-6 flex flex-col gap-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
                  Published {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Link to={`/posts/edit/${post.id}`} className="flex-1 text-center py-2 text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg transition">Edit</Link>
                  <button onClick={() => { setPostToDelete(post); setIsDeleteModalOpen(true); }} className="flex-1 py-2 text-xs font-bold bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition">Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setIsDeleteModalOpen(false)} />
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-white mb-2">Delete this post?</h3>
            <p className="text-slate-400 text-sm mb-8">This action is permanent. You are about to delete <span className="text-slate-200 font-semibold italic">"{postToDelete?.title}"</span>.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-3 text-sm font-bold bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition">Cancel</button>
              <button onClick={handleConfirmDelete} className="flex-1 py-3 text-sm font-bold bg-red-600 text-white rounded-xl hover:bg-red-500 transition shadow-lg shadow-red-600/20">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;