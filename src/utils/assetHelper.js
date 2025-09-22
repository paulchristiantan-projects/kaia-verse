export const getAssetPath = (path) => {
  return process.env.NODE_ENV === 'production' 
    ? path.replace('%PUBLIC_URL%', process.env.PUBLIC_URL || '')
    : path.replace('%PUBLIC_URL%', '');
};