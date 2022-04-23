import { ChaingateItem } from './types';

export class CHainGate {
  apiKey: string;
  rootElement: string;
  chaingateEndpoint: string;

  constructor(apiKey: string, rootElement: string, chaingateEndpoint: string) {
    this.apiKey = apiKey;
    this.rootElement = rootElement;
    this.chaingateEndpoint = chaingateEndpoint;
  }

  render() {
    let html = "<h1>works</h1>"
    let rootElement = document.querySelector(this.rootElement)
    if(rootElement) {
      rootElement.innerHTML = html
    }
  }

  pay(data: ChaingateItem, signature: string) {
    fetch(this.chaingateEndpoint, {body: JSON.stringify({data, signature})})
  }
}

export function loadCHainGate(apiKey: string, rootElement: string, chaingateEndpoint: string) {
  return new CHainGate(apiKey, rootElement, chaingateEndpoint)
}