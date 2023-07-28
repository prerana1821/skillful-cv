import { Component, ReactNode } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error to an error reporting service
    this.setState({
      hasError: true,
      message: error.message,
    });
  }

  componentDidUpdate(previousProps: ErrorBoundaryProps): void {
    if (previousProps.children !== this.props.children) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box>
          <Heading>Error</Heading>
          <Text>{this.state.message}</Text>
          <Text>
            Oops! Something went wrong. I apologize for the inconvenience.
            Refresh the page to go back to normal.
          </Text>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
