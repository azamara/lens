/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { getInjectionToken } from "@ogre-tools/injectable";

export const lensFetchBaseUrlInjectionToken = getInjectionToken<string>({
  id: "lens-fetch-base-url-token",
});
