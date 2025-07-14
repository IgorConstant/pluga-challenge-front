import '@testing-library/jest-dom';
import { fetchApps } from '../api-query';

describe('api service', () => {
  it('lança erro se NEXT_PUBLIC_API_URL não estiver definida', async () => {
    delete process.env.NEXT_PUBLIC_API_URL;
    await expect(fetchApps()).rejects.toThrow('NEXT_PUBLIC_API_URL não definida!');
  });

  it('faz chamada se NEXT_PUBLIC_API_URL estiver definida', async () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://pluga.co/ferramentas_search.json';
    
    jest.mock('axios', () => ({
      get: jest.fn().mockResolvedValue({ data: [] })
    }));
    const { fetchApps } = await import('../api-query');
    const result = await fetchApps();
    expect(Array.isArray(result)).toBe(true);
  });
});