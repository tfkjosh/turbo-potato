import dynamic from 'next/dynamic';

/**
 * The System Registry handles "Lazy Loading" of App Features.
 * This ensures the initial "Boot" is lightning fast.
 */
export const AppRegistry: Record<string, any> = {
  terminal: dynamic(() => import('@apps/terminal/Terminal'), { 
    ssr: false, // OS apps only exist on the client
    loading: () => null // We will handle loading via our own UI
  }),
  explorer: dynamic(() => import('@apps/explorer/FileExplorer'), { ssr: false }),
};