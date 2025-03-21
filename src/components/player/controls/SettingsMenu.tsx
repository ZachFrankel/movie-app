import { useState } from 'react';
import { Loading } from '../../layout/Loading';

interface SettingsMenuProps {
    onClose: () => void;
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SettingsMenu({ onClose }: SettingsMenuProps) {
  const [activeMenu, setActiveMenu] = useState<'main' | 'quality' | 'source'>('main');
  const [loading, ] = useState(false);
  const [, setSlideDirection] = useState<'forward' | 'backward'>('forward');

  const handleMenuChange = (menu: 'quality' | 'source') => {
    setSlideDirection('forward');
    setActiveMenu(menu);
  };

  const backToMainMenu = () => {
    setSlideDirection('backward');
    setActiveMenu('main');
  };

  if (loading) {
    return (
      <div className="bg-black text-[#8EA3B0] rounded-lg overflow-hidden shadow-lg w-[340px] h-[430px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-black text-[#8EA3B0] rounded-lg overflow-hidden shadow-lg w-[340px] h-[430px] flex flex-col border border-[rgba(255,255,255,0.1)]">
      {/* Settings Header */}
      <div className="flex-none">
        <h3 className="font-bold text-[#8EA3B0] pb-3 pt-5 border-b border-[rgba(255,255,255,0.1)] flex justify-between items-center px-4">
          <div className="flex items-center space-x-3">
            {activeMenu !== 'main' ? (
              <div className="flex items-center space-x-3">
                <button 
                  type="button"
                  onClick={backToMainMenu}
                  className="-ml-2 p-2 rounded tabbable hover:bg-video-context-hoverColor hover:bg-opacity-50"
                  aria-label="Back to settings"
                >
                  <span className="text-xl rtl:-scale-x-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </span>
                </button>
                <span className="line-clamp-1 break-all">Settings</span>
              </div>
            ) : (
              <span className="line-clamp-1 break-all">Settings</span>
            )}
          </div>
          <div>
            {activeMenu !== 'main' && activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
          </div>
        </h3>
      </div>

      {/* Menu Content - with fixed height and animations */}
      <div className="flex-1 overflow-hidden">
        <div 
          className="h-full relative"
          style={{ 
            perspective: '1000px'
          }}
        >
          {/* Main Menu */}
          <div 
            className={`absolute inset-0 transition-all duration-300 ease-in-out overflow-y-auto scrollbar scrollbar-thumb-[#252525] scrollbar-track-transparent transform ${
              activeMenu === 'main' 
                ? 'translate-x-0 opacity-100 z-10' 
                : 'translate-x-[-100%] opacity-0 z-0'
            }`}
          >
            <div className="pt-4 space-y-1 pb-6 px-4">
              <button
                type="button"
                className="flex py-2 px-3 rounded-lg w-full -ml-3 hover:bg-video-context-hoverColor hover:bg-opacity-50 cursor-pointer tabbable"
                style={{ width: 'calc(100% + 1.5rem)' }}
                onClick={() => handleMenuChange('quality')}
              >
                <div className="flex items-center flex-1">
                  <div className="flex-1 text-left">
                    <span className="font-medium text-left text-[#8EA3B0]">
                      Quality
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-white flex items-center font-medium">
                      <span className="text-white mr-1">1080p</span>
                      <span className="text-xl ml-1 -mr-1.5 rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
              </button>
              
              <button
                type="button"
                className="flex py-2 px-3 rounded-lg w-full -ml-3 hover:bg-video-context-hoverColor hover:bg-opacity-50 cursor-pointer tabbable"
                style={{ width: 'calc(100% + 1.5rem)' }}
                onClick={() => handleMenuChange('source')}
              >
                <div className="flex items-center flex-1">
                  <div className="flex-1 text-left">
                    <span className="font-medium text-left text-[#8EA3B0]">
                      Source
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-white flex items-center font-medium">
                      <span className="text-white mr-1">Server 1</span>
                      <span className="text-xl ml-1 -mr-1.5 rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Quality Menu (Placeholder) */}
          <div 
            className={`absolute inset-0 transition-all duration-300 ease-in-out overflow-y-auto scrollbar scrollbar-thumb-[#252525] scrollbar-track-transparent transform ${
              activeMenu === 'quality' 
                ? 'translate-x-0 opacity-100 z-10' 
                : 'translate-x-[100%] opacity-0 z-0'
            }`}
          >
            <div className="pt-4 pb-6 px-4 text-center flex items-center justify-center h-full">
              <Loading />
            </div>
          </div>

          {/* Source Menu (Placeholder) */}
          <div 
            className={`absolute inset-0 transition-all duration-300 ease-in-out overflow-y-auto scrollbar scrollbar-thumb-[#252525] scrollbar-track-transparent transform ${
              activeMenu === 'source' 
                ? 'translate-x-0 opacity-100 z-10' 
                : 'translate-x-[100%] opacity-0 z-0'
            }`}
          >
            <div className="pt-4 pb-6 px-4 text-center flex items-center justify-center h-full">
              <Loading />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}