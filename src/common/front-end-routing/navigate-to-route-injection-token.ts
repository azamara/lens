/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectionToken } from "@ogre-tools/injectable";
import type { SetRequired } from "type-fest";
import type { Route } from "./front-end-route-injection-token";

type RequiredKeys<T> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? K : never;
  }[keyof T],
  undefined
>;

type ObjectContainingNoRequired<T> = T extends void
  ? never
  : RequiredKeys<T> extends []
  ? any
  : never;

type ObjectContainsNoRequired<T> = T extends ObjectContainingNoRequired<T>
  ? true
  : false;

// TODO: Missing types for:
// - Navigating to route without parameters, with parameters
// - Navigating to route with required parameters, without parameters
type Parameters<TParameters> = TParameters extends void
  ? { parameters?: never }
  : ObjectContainsNoRequired<TParameters> extends true
    ? { parameters?: TParameters }
    : { parameters: TParameters };

export type NavigateToRouteOptions<TParameter> = Parameters<TParameter> & {
  query?: Record<string, string>;
  fragment?: string;
  withoutAffectingBackButton?: boolean;
};

export type NavigateToRoute = <TRoute extends Route<object | void>>(
  route: TRoute,
  options?: NavigateToRouteOptions<SetRequired<TRoute, "parameterSignature">["parameterSignature"]>,
) => void;

export const navigateToRouteInjectionToken = getInjectionToken<NavigateToRoute>(
  { id: "navigate-to-route-injection-token" },
);
