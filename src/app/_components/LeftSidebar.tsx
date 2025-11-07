'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
}

const LeftSidebar = () => {
  // 控制导航栏的显示/隐藏状态
  const [isCollapsed, setIsCollapsed] = useState(true);
  // 导航项目分组数据
  const navGroups = [
    {
      title: '基础平台',
      items: [
        {
          id: 'code',
          title: 'Code平台',
          icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          ),
          href: "http://code.xdreamdev.com"
        },
        {
          id: 'file',
          title: '文件服务平台',
          icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          ),
          href: "http://file.xdreamdev.com"
        },
        {
          id: 'wiki',
          title: '研发Wiki',
          icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          ),
          href: "http://wiki.xdreamdev.com"
        },
        {
          id: 'project',
          title: '项目管理平台',
          icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          ),
          href: "http://project.xdreamdev.com"
        },
        {
          id: 'test',
          title: '测试平台',
          icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          ),
          href: "http://test.xdreamdev.com"
        }
      ]
    },
    {
      title: '业务平台',
      items: [
        {
          id: 'cicd',
          title: 'CI/CD平台',
          icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          ),
          href: "http://cicd.xdreamdev.com"
        },
        {
          id: 'monitor',
          title: '监控平台',
          icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          ),
          href: "http://monitor.xdreamdev.com"
        },
        {
          id: 'feature',
          title: '特征管理平台',
          icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          ),
          href: "#"
        },
        {
          id: 'strategy',
          title: '策略管理平台',
          icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          ),
          href: "#"
        },
        {
          id: 'more',
          title: '更多...',
          icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
          ),
          href: "#"
        }
      ]
    }
  ];

  return (
    <div className="flex">
      {/* 主导航区域 */}
      <aside 
        className={`sticky top-24 h-[calc(100vh-120px)] overflow-y-auto rounded-lg border border-[var(--color-primary)]/20 bg-[var(--color-bg-dark)]/80 transition-all duration-300 ${isCollapsed ? 'w-16 p-2' : 'w-64 p-4'}`}
      >
        {!isCollapsed && navGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <h3 className="mb-3 border-b border-[var(--color-primary)]/20 pb-2 font-semibold text-[var(--color-primary)]">
              {group.title}
            </h3>
            <nav>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-3 rounded-md p-2 transition-all hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-primary)]/20">
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ))}
        
        {/* 折叠状态下只显示图标 */}
        {isCollapsed && (
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navGroups.flatMap(group => group.items).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/20"
                title={item.title}
              >
                {item.icon}
                {/* 悬停时显示提示 */}
                <span className="absolute left-full ml-2 whitespace-nowrap rounded bg-[var(--color-bg-dark)] px-2 py-1 text-xs font-medium text-[var(--color-text)] opacity-0 transition-opacity group-hover:opacity-100">
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>
        )}

      {/* 分隔线和折叠控制 */}
      <div className="border-t border-[var(--color-primary)]/20 pt-4">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex w-full items-center justify-center space-x-2 rounded-md p-2 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
        >
          <svg className="h-4 w-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isCollapsed ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
            />
          </svg>
          <span>{isCollapsed ? '展开导航' : '收起导航'}</span>
        </button>
      </div>
      </aside>
    </div>
  );
};

export default LeftSidebar;