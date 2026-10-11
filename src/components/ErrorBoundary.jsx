import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '3rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
          <div className="glass-card" style={{ maxWidth: '560px', padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(244, 63, 94, 0.15)', borderRadius: '50%', marginBottom: '1.25rem' }}>
              <AlertTriangle size={48} color="#f43f5e" />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 700 }}>
              Something went wrong in the component tree
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              An unexpected application error occurred. You can safely recover by resetting the state.
            </p>
            {this.state.error && (
              <pre style={{
                background: '#090d16',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'left',
                overflowX: 'auto',
                fontSize: '0.8rem',
                color: '#f87171',
                marginBottom: '1.5rem',
                border: '1px solid rgba(244, 63, 94, 0.2)'
              }}>
                {this.state.error.toString()}
              </pre>
            )}
            <button className="btn btn-primary" onClick={this.handleReload}>
              <RefreshCw size={18} /> Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
