/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomeScreen from './components/HomeScreen';
import IdentityScreen from './components/IdentityScreen';
import CatalogScreen from './components/CatalogScreen';
import BlogScreen from './components/BlogScreen';
import ContactScreen from './components/ContactScreen';
import ChatbotScreen from './components/ChatbotScreen';
import NewsScreen from './components/NewsScreen';
import { Screen } from './types';

export default function App() {
  const [currentScreen, setScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen key="home" />;
      case 'identity':
        return <IdentityScreen key="identity" />;
      case 'catalog':
        return <CatalogScreen key="catalog" />;
      case 'blog':
        return <BlogScreen key="blog" />;
      case 'contact':
        return <ContactScreen key="contact" />;
      case 'chatbot':
        return <ChatbotScreen key="chatbot" />;
      case 'news':
        return <NewsScreen key="news" />;
      default:
        return <HomeScreen key="home" />;
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-primary/10 selection:text-primary">
      <Header />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </main>

      <Navigation currentScreen={currentScreen} setScreen={setScreen} />
    </div>
  );
}
