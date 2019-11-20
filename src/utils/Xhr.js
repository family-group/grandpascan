
class Xhr {
    static baseUrl = '';
    constructor(endpoint, options = {}) {
        this.body = options.body ? JSON.stringify(options.body) : null;
        this.xhr = new XMLHttpRequest();
        this.xhr.open(options.method ? options.method.toUpperCase() : 'GET', Xhr.baseUrl + endpoint);
        this.xhr.send(this.body)
        return this._result();
    }
    abort() {
        this.xhr.abort();
    }
    _result() {
        return new Promise((resolve, reject) => {
            this.xhr.onload = () => {
                if (this.xhr.status >= 200 && this.xhr.status <= 300) {
                    resolve(JSON.parse(this.xhr.response))
                } else {
                    reject(JSON.parse(this.xhr.response))
                }
            }
            this.xhr.onerror = () => {
                reject(JSON.parse(this.xhr.response))
            }
        })
    }
}
export default Xhr;