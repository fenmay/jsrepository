export const REGEX = {
    email: /^\w{4,}@\w{4,}\.\w{2,4}$/,
    upperCase: /[A-Z]/, 
    lowerCase: /[a-z]/, 
    character: /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/,
    number: /[0-9]/, 
    passwordLength: /^.{8,}$/
}