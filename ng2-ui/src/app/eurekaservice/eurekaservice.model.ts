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

export class EurekaApplication {
    name: string;
    instance: EurekaService[];
}

export class EurekaService {


    instanceId: string;
    hostName: string;
    app: string;
    ipAddr: string;

    status: string;
    overriddenstatus: string;
    
    // OBJECT
    port: EurekaServicePort;

//          "port": {
//            "$": 8082,
//            "@enabled": "true"
//          },

    // OBJECT
    securePort: EurekaServicePort;
//          "securePort": {
//            "$": 443,
//            "@enabled": "false"
//          },

    countryId: number;

    // OBJECT
    dataCenterInfo: EurekaServiceDataCenterInfo;
//          "dataCenterInfo": {
//            "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
//            "name": "MyOwn"
//          },

    // OBJECT
    leaseInfo: EurekaServiceLeaseInfo;
//          "leaseInfo": {
//            "renewalIntervalInSecs": 10,
//            "durationInSecs": 90,
//            "registrationTimestamp": 1485211444615,
//            "lastRenewalTimestamp": 1485212335110,
//            "evictionTimestamp": 0,
//            "serviceUpTimestamp": 1485211444615
//          },

    // OBJECT
    metadata: EurekaServiceMetadata;
//          "metadata": {
//            "@class": "java.util.Collections$EmptyMap"
//          },

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



