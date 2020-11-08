export function getProperty<T, K extends keyof T>(object: T, property: K): T[K] {
    return object[property]
}
