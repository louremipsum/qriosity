let cache: Map<string, number> | false;

export function getCache(): Map<string, number> {
  if (!cache) {
    cache = new Map();
  }
  return cache;
}
