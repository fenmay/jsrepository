export const responseMapper = (collection, dynamicKey) => Object.keys(collection)
    .map(key => ({ ...collection[key], [dynamicKey]: key }))