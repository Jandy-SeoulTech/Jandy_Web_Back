export const routerHanlder = (req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
};

export const logHandler = (err, req, res, next) => {
    console.error(`"[" + ${new Date()} + "]\n"` + err.stack);
    next(err);
};

export const errorHandler = (err, req, res, next) => {
    function jsonFriendlyErrorReplacer(key, value) {
        if (value instanceof Error) {
            return {
                // Pull all enumerable properties, supporting properties on custom Errors
                ...value,
                // Explicitly pull Error's non-enumerable properties
                name: value.name,
                message: value.message,
            };
        }

        return value;
    }

    res.status(err.status || 500);
    res.type("json").send(JSON.stringify(err, jsonFriendlyErrorReplacer));
};
