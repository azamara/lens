import get from "lodash/get";
import { IPodContainer, IPodMetrics } from "./pods.api";
import { IAffinity, WorkloadKubeObject } from "../workload-kube-object";
import { autobind } from "../../utils";
import { KubeApi } from "../kube-api";
import { metricsApi } from "./metrics.api";

@autobind()
export class DaemonSet extends WorkloadKubeObject {
  static kind = "DaemonSet";
  static namespaced = true;
  static apiBase = "/apis/apps/v1/daemonsets";

  spec: {
    selector: {
      matchLabels: {
        [name: string]: string;
      };
    };
    template: {
      metadata: {
        creationTimestamp?: string;
        labels: {
          name: string;
        };
      };
      spec: {
        containers: IPodContainer[];
        initContainers?: IPodContainer[];
        restartPolicy: string;
        terminationGracePeriodSeconds: number;
        dnsPolicy: string;
        hostPID: boolean;
        affinity?: IAffinity;
        nodeSelector?: {
          [selector: string]: string;
        };
        securityContext: {};
        schedulerName: string;
        tolerations: {
          key: string;
          operator: string;
          effect: string;
          tolerationSeconds: number;
        }[];
      };
    };
    updateStrategy: {
      type: string;
      rollingUpdate: {
        maxUnavailable: number;
      };
    };
    revisionHistoryLimit: number;
  };
  status: {
    currentNumberScheduled: number;
    numberMisscheduled: number;
    desiredNumberScheduled: number;
    numberReady: number;
    observedGeneration: number;
    updatedNumberScheduled: number;
    numberAvailable: number;
    numberUnavailable: number;
  };

  getImages() {
    const containers: IPodContainer[] = get(this, "spec.template.spec.containers", []);
    const initContainers: IPodContainer[] = get(this, "spec.template.spec.initContainers", []);

    return [...containers, ...initContainers].map(container => container.image);
  }
}


export class DaemonSetApi extends KubeApi<DaemonSet> {
  getMetrics(daemonsets: DaemonSet[], namespace: string, selector = ""): Promise<IPodMetrics> {
    const podSelector = daemonsets.map(daemonset => `${daemonset.getName()}-[[:alnum:]]{5}`).join("|");
    const opts = { category: "pods", pods: podSelector, namespace, selector };

    return metricsApi.getMetrics({
      cpuUsage: opts,
      memoryUsage: opts,
      fsUsage: opts,
      networkReceive: opts,
      networkTransmit: opts,
    }, {
      namespace,
    });
  }
}

export const daemonSetApi = new DaemonSetApi({
  objectConstructor: DaemonSet,
});
