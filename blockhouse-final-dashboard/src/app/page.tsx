import React from 'react';
import Dashboard from './components/Dashboard';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <main className="py-20">
        <h1 className="text-4xl font-bold mb-10 text-center">Dashboard</h1>
        <Dashboard />
      </main>
    </div>
  );
}