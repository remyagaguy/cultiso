// On mock partiellement le client supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {},
    from: jest.fn(),
  })),
}));

describe('Supabase Client', () => {
  const originalEnv = process.env;
  let createClient: typeof import('./client').createClient;

  beforeEach(async () => {
    jest.resetModules(); // Pour réinitialiser le singleton entre les tests
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    
    const clientModule = await import('./client');
    createClient = clientModule.createClient;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('devrait initialiser le client avec des variables valides', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://mock.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'mock-anon-key';

    const client = createClient();
    expect(client).toBeDefined();

    // Test du comportement Singleton
    const client2 = createClient();
    expect(client).toBe(client2);
  });

  it('devrait retourner un client placeholder et afficher un warning si les variables sont manquantes', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const client = createClient();
    expect(client).toBeDefined();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Variables d\'environnement Supabase manquantes'));

    consoleSpy.mockRestore();
  });
});
