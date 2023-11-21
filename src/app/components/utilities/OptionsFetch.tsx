export const optionsFetch = (method: string, body: Partial<{ [key in string]?: string | number }>) => {
    const options: {
        method: string;
        headers?: { 'Content-Type': 'application/json' };
        body?: BodyInit
    } = {
        method: method,
    };

    if (body) {
        options.headers = {
            'Content-Type': 'application/json',
        };
        options.body = JSON.stringify(body);
    }

    return options;
};
