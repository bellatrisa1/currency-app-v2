import React from "react";
import AppHeader from "./components/AppHeader";
import ConverterForm from "./components/ConverterForm";
import ResultCard from "./components/ResultCard";

function App() {
  return (
    <div className="app">
      <AppHeader />
      <ConverterForm />
      <ResultCard />
    </div>
  );
}

export default App;
