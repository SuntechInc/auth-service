import { MicroservicesConfig } from './microservices.config';

export async function getAllCompanies() {
  const url = `${MicroservicesConfig.coreServiceUrl}/companies`;
  const response = await fetch(url, { method: 'GET' });
  if (!response.ok) {
    throw new Error(`Erro ao buscar companies: ${response.status} ${response.statusText}`);
  }
  return response.json(); // ajuste conforme o formato retornado pelo core-service
} 