declare const $project: {
    app: string;
    domain: string;
    service: string;
    serviceDependencies: ServiceDependency[]
};

declare class ServiceDependency {
    service: string;
    version: string;
}

declare const $locales: any;
