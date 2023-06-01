/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import React from "react";
import { SubTitle } from "../layout/sub-title";

/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

interface PrometheusDetailsProps  {
  providerName: string;
  path: string;
}
export const PrometheusDetails = ({ providerName, path }: PrometheusDetailsProps) => (
  <section>
    <SubTitle title="Auto detected Prometheus details" />
    <div className="flex gaps">
      <div>
        Provider:
      </div>
      <div>
        {providerName}
      </div>
    </div>
    <div className="flex gaps">
      <div>
        Path:
      </div>
      <div>
        {path}
      </div>
    </div>
  </section>
);
