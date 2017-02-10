export class EurekaService {
    name: string;
    instance: EurekaServiceInstance[];
}

export class EurekaServiceInstance {
    instanceId: string;
    hostName: string;
    app: string;
    ipAddr: string;
    status: string;
    overriddenstatus: string;
    port: EurekaServicePort;
    securePort: EurekaServicePort;
    countryId: number;
    dataCenterInfo: EurekaServiceDataCenterInfo;
    leaseInfo: EurekaServiceLeaseInfo;
    metadata: EurekaServiceMetadata;
    homePageUrl: string;
    statusPageUrl: string;
    healthCheckUrl: string;
    vipAddress: string;
    secureVipAddress: string;
    isCoordinatingDiscoveryServer: string;
    lastUpdatedTimestamp: string;
    lastDirtyTimestamp: string;
    actionType: string;
}

export class EurekaServicePort {
    $: string;
    enabled: string;
}
export class EurekaServiceDataCenterInfo {
    class: string;
    name: string;
}
export class EurekaServiceLeaseInfo {
    renewalIntervalInSecs: number;
    durationInSecs: number;
    registrationTimestamp: number;
    lastRenewalTimestamp: number;
    evictionTimestamp: number;
    serviceUpTimestamp: number;
}
export class EurekaServiceMetadata {
    class: string;
}
