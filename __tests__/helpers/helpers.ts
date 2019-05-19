const mockRequest = (data: any) => {
    const req: any = { };
    req.body = data;
    return req;
};

const mockResponse = () => {
    const res = {
        json() {
            return this;
          },
          status() {
            return this;
          },
    };
    return res;
};

export {mockRequest, mockResponse };
