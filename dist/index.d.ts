import { ChaingateItem } from './types';
export declare class CHainGate {
    apiKey: string;
    rootElement: string;
    chaingateEndpoint: string;
    constructor(apiKey: string, rootElement: string, chaingateEndpoint: string);
    render(): void;
    pay(data: ChaingateItem, signature: string): void;
}
export declare function loadCHainGate(apiKey: string, rootElement: string, chaingateEndpoint: string): CHainGate;
