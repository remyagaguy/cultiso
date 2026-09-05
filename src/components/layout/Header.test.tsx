import { render, screen } from '@testing-library/react';
import { Header } from './Header';

// Mock du composant next/link pour éviter les erreurs de test liées au routage
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe('Composant Header', () => {
  it('se rend correctement dans le DOM et affiche le logo CULTISO', () => {
    render(<Header />);
    // Le logo CULTISO est présent
    expect(screen.getByText('CULTISO')).toBeInTheDocument();
  });

  it('affiche le bouton principal "Simuler mon business"', () => {
    render(<Header />);
    // Recherche du bouton par son rôle et son texte approximatif
    const simulateButton = screen.getByRole('button', { name: /simuler mon business/i });
    expect(simulateButton).toBeInTheDocument();
  });

  it('affiche les liens de navigation Produits, Solutions et Blog', () => {
    render(<Header />);
    // Les menus principaux (utiliser getAllByText ou getByRole car il peut y avoir plusieurs occurrences)
    expect(screen.getByRole('button', { name: /Produits/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Solutions/i })).toBeInTheDocument();
    expect(screen.getByText(/Blog/i)).toBeInTheDocument();
  });
});
