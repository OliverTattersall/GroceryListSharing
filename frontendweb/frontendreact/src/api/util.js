

// t is in ms
export const delay = async (t) => {
    return new Promise(resolve => setTimeout(resolve, t));
}