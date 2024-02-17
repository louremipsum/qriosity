let cache: Map<string, any> | null = null;

export function getCache(): Map<string, any> {
  if (!cache) {
    cache = new Map();
  }
  return cache;
}
