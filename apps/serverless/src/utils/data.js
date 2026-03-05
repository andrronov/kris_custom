export const promiseResolver = async (promise) => {
    try {
        const data = await promise;
        return [data, null];
    }
    catch (throwable) {
        if (throwable instanceof Error) {
            return [null, throwable];
        }
        throw throwable;
    }
};
