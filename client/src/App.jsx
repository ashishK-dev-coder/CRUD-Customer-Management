import CreateComponent from "./components/CreateComponent/CreateComponent";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong. Please try again later.</p>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <>
        <Navbar />
        <div>
          <CreateComponent />
        </div>
      </>
    </ErrorBoundary>
  );
}

export default App;
