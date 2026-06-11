import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card" style={{ margin: '24px', padding: '24px', textAlign: 'center' }}>
          <h2>Something went wrong</h2>
          <p className="muted">Please refresh the page or contact support.</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '12px' }}>
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
