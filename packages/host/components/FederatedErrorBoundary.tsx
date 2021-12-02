import React, { ErrorInfo, Suspense } from "react";

const MISSING_ERROR = "Error was swallowed during propagation.";

interface IFederatedErrorBoundaryProps {
  error?: Error | null;
}

interface IFederatedErrorBoundaryState {
  error?: Error | null;
  hasError: boolean;
}

class FederatedErrorBoundary extends React.Component<
  IFederatedErrorBoundaryProps,
  IFederatedErrorBoundaryState
> {
  constructor(props: IFederatedErrorBoundaryProps) {
    super(props);
    this.state = { hasError: props.error instanceof Error, error: props.error };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error | null, info: ErrorInfo) {
    this.setState({ error: error || new Error(MISSING_ERROR) });
    this.logErrorToCloud(error, info);
  }

  logErrorToCloud = (error: Error | null, info: ErrorInfo) => {
    // TODO: send error report to service provider (ex. sentry)
  };

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;
    if (hasError) {
      console.error(error)
      return <div>Something went wrong.</div>;
    }

    return children;
  }
}

export default FederatedErrorBoundary;
