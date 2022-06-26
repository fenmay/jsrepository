export const responseMapper = (response: {[key: string]: any}, dynamicKey: string): any[] => Object.keys(response)
    .map(key => ({ ...response[key], [dynamicKey]: key }));
