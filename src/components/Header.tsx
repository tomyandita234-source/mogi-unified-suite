import { useState } from 'react';
import { Menu, X, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('default');

  const navigation = [
    { name: 'App', href: '#app' },
    { name: 'Produk', href: '#produk' },
    { name: 'Solusi', href: '#solusi' },
    { name: 'Harga', href: '#harga' },
    { name: 'Dukungan', href: '#dukungan' },
    { name: 'Tentang', href: '#tentang' },
  ];

  const toggleTheme = () => {
    const newTheme = theme === 'default' ? 'bw' : 'default';
    setTheme(newTheme);
    
    if (newTheme === 'bw') {
      document.documentElement.classList.add('theme-bw');
    } else {
      document.documentElement.classList.remove('theme-bw');
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <nav className="container-width section-padding py-0 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-gradient">MogiApp</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-smooth px-3 py-2 text-sm font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 hover:bg-accent hover:text-accent-foreground transition-smooth"
            >
              <Palette className="h-5 w-5" />
            </Button>
            <Button className="btn-primary">
              Mulai Gratis
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="container-width px-4 py-4 space-y-2 bg-background">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary block px-4 py-3 text-base font-medium transition-smooth rounded-lg hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="p-3"
                >
                  <Palette className="h-5 w-5" />
                </Button>
                <Button className="btn-primary flex-1">
                  Mulai Gratis
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;