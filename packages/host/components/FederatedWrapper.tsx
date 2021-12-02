import FederatedErrorBoundary from "./FederatedErrorBoundary";

interface IFederatedWrapperProps {
  error?: Error | null;
}

const FederatedWrapper =
  <T extends Record<any, any>>(FederatedComponent: React.ComponentType<T>) =>
  ({ error, ...restProps }: IFederatedWrapperProps) =>
    (
      <FederatedErrorBoundary error={error}>
        <FederatedComponent {...(restProps as T)} />
      </FederatedErrorBoundary>
    );

export default FederatedWrapper;
