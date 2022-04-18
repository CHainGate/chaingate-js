export class CHainGate {
    constructor(apiKey, rootElement, chaingateEndpoint) {
        this.apiKey = apiKey;
        this.rootElement = rootElement;
        this.chaingateEndpoint = chaingateEndpoint;
    }
    render() {
        let html = "<h1>works</h1>";
        let rootElement = document.querySelector(this.rootElement);
        if (rootElement) {
            rootElement.innerHTML = html;
        }
    }
    pay(data, signature) {
        fetch(this.chaingateEndpoint, { body: JSON.stringify({ data, signature }) });
    }
}
export function loadCHainGate(apiKey, rootElement, chaingateEndpoint) {
    return new CHainGate(apiKey, rootElement, chaingateEndpoint);
}
