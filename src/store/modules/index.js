/*
const requireModule = require.context('.', false, /\.store\.js$/);
const modules = {};

requireModule.keys().forEach((filename) => {
	// create the module name from fileName
	// remove the store.js extension and lowercase
	const moduleName = filename.replace(/(\.\/|\.store\.js)/g, '').replace(/^\w/, (c) => c.toLowerCase());

	modules[`${moduleName}`] = requireModule(filename).default || requireModule(filename);
});

export default modules;
*/
// Automatically imports all the modules and exports as a single module object
const modules = {};

const moduleFiles = import.meta.glob('./*.store.js', { eager: true });

Object.keys(moduleFiles).forEach((path) => {
  // Create the module name from fileName
  // Remove the .store.js extension and make the first character lowercase
  const moduleName = path.replace(/(\.\/|\.store\.js$)/g, '').replace(/^\w/, (c) => c.toLowerCase());

  // Add the module to the modules object
  modules[moduleName] = moduleFiles[path].default;
});

export default modules;