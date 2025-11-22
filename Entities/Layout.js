import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, Map, Users, User, Crown, Settings, Menu, X, Camera, BookOpen, HomeIcon, Info } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: Home, path: createPageUrl('Home'), description: 'Return to home' },
    { name: 'Tour', icon: Map, path: createPageUrl('Tour'), description: 'Start virtual tour' },
    { name: 'Scan', icon: Camera, path: createPageUrl('Scan'), description: 'Scan artifacts' },
    { name: 'House', icon: HomeIcon, path: createPageUrl('House'), description: 'My collection house' },
    { name: 'Collection', icon: BookOpen, path: createPageUrl('Collection'), description: 'Artifact collection' },
    { name: 'Community', icon: Users, path: createPageUrl('Community'), description: 'Share experiences' },
    { name: 'Profile', icon: User, path: createPageUrl('Profile'), description: 'Your profile' },
    { name: 'Membership', icon: Crown, path: createPageUrl('Profile'), query: '?upgrade=true', description: 'Upgrade to premium' },
    { name: 'Settings', icon: Settings, path: createPageUrl('AccountSettings'), description: 'App settings' }
  ];

  const hideMenuOn = ['Welcome', 'MuseumSelect'];
  const currentPage = location.pathname.split('/').pop();
  const showMenu = !hideMenuOn.includes(currentPage);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Menu Button - Fixed Top Left */}
      {showMenu && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-6 left-6 z-40 w-12 h-12 backdrop-blur-2xl bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-center text-white hover:bg-white/[0.04] hover:border-amber-400/30 transition-all shadow-xl"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#0f0f0f]/80 backdrop-blur-sm z-50 animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-80 backdrop-blur-2xl bg-gradient-to-b from-[#1a1a1a]/95 to-[#0f0f0f]/95 border-r border-amber-400/10 z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-amber-400/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-400/30">
                <span className="text-black font-bold text-lg">T</span>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">TimeLens</h2>
                <p className="text-gray-400 text-xs">Museum Explorer</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-2 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path + (item.query || '')}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400/20 to-amber-500/10 border border-amber-400/30 shadow-lg shadow-amber-400/10'
                    : 'hover:bg-white/[0.05] hover:translate-y-[-2px]'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg shadow-amber-400/30'
                      : 'bg-white/[0.05] group-hover:bg-white/[0.1]'
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-amber-400'}`}
                  />
                </div>
                <div className="flex-1">
                  <p
                    className={`font-semibold ${
                      isActive ? 'text-amber-400' : 'text-white group-hover:text-amber-400'
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="text-gray-400 text-xs">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-amber-400/10">
          <Link
            to={createPageUrl('AccountSettings')}
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
          >
            <Info className="w-4 h-4" />
            <span className="text-sm">About TimeLens</span>
          </Link>
        </div>
      </div>

      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
}
