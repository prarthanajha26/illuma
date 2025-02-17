const capitalizeNames = fullName => {
  if (!fullName) return '';

  return fullName
    .split(' ')
    .map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
    .join(' ');
};

export default capitalizeNames;
