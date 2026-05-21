"use server";

import type {
  PaginatedResponse,
  Product,
  ProductListParams,
} from "@spree/sdk";
import { cacheLife, cacheTag } from "next/cache";
import { getAccessToken, getClient, getLocaleOptions } from "@/lib/spree";
import {
  FALLBACK_FILTERS,
  FALLBACK_PRODUCTS,
  getFallbackProduct,
} from "./fixtures";

/**
 * Build a paginated response over a product list so the storefront stays
 * fully populated. The demo dataset (`fixtures.ts`) is appended to any real
 * products the store returns so the catalog always looks rich. Remove the
 * fixture merge once the backend has enough real products.
 */
function paginate(
  all: Product[],
  params: ProductListParams | undefined,
): PaginatedResponse<Product> {
  const limit = params?.limit ?? 25;
  const page = params?.page ?? 1;
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  const count = all.length;
  const pages = Math.max(1, Math.ceil(count / limit));
  return {
    data,
    meta: {
      page,
      limit,
      count,
      pages,
      from: count === 0 ? 0 : start + 1,
      to: Math.min(start + limit, count),
      in: data.length,
      previous: page > 1 ? page - 1 : null,
      next: page < pages ? page + 1 : null,
    },
  };
}

/** Real products first, then demo products that don't collide by slug/id. */
function mergeWithFallback(real: Product[]): Product[] {
  const seen = new Set(real.flatMap((p) => [p.slug, p.id]));
  const extras = FALLBACK_PRODUCTS.filter(
    (p) => !seen.has(p.slug) && !seen.has(p.id),
  );
  return [...real, ...extras];
}

/**
 * Cached product list fetch. Cache key is derived from all function
 * arguments by Next.js "use cache":
 *
 * - locale/country: determines language and market-specific pricing
 * - userToken: per-user cache segmentation (separate arg, NOT passed to
 *   SDK). Authenticated users may see different prices (B2B, loyalty).
 *   Each user's JWT is unique so the cache is segmented per user.
 *   Guest users pass undefined.
 */
export async function cachedListProducts(
  params: ProductListParams | undefined,
  options: { locale?: string; country?: string },
  _userToken?: string,
) {
  "use cache: remote";
  cacheLife("tenMinutes");
  cacheTag("products");
  let real: Product[] = [];
  try {
    // Fetch a wide page of real products so we can merge + re-paginate with
    // the demo dataset. The store is small, so one large fetch is fine.
    const response = await getClient().products.list(
      { ...params, page: 1, limit: 100 },
      options,
    );
    real = response.data ?? [];
  } catch {
    real = [];
  }
  return paginate(mergeWithFallback(real), params);
}

export async function getProducts(params?: ProductListParams) {
  const options = await getLocaleOptions();
  const userToken = await getAccessToken();
  return cachedListProducts(params, options, userToken);
}

/**
 * Persistent cached product detail fetch. Cache key is derived from:
 *
 * - slugOrId, expand: identify the product and response shape
 * - locale/country: determines language and market-specific pricing
 * - userToken: per-user cache segmentation (separate arg, NOT passed to
 *   SDK). Authenticated users may see different prices (B2B, loyalty).
 *   Guest users pass undefined, so all guests share one entry.
 */
export async function cachedGetProduct(
  slugOrId: string,
  expand: string[],
  options: { locale?: string; country?: string },
  _userToken?: string,
) {
  "use cache: remote";
  cacheLife("tenMinutes");
  cacheTag("products", `product:${slugOrId}`);
  try {
    return await getClient().products.get(slugOrId, { expand }, options);
  } catch (error) {
    const fallback = getFallbackProduct(slugOrId);
    if (fallback) return fallback;
    throw error;
  }
}

export async function getProduct(
  slugOrId: string,
  params?: { expand?: string[] },
) {
  const options = await getLocaleOptions();
  const userToken = await getAccessToken();
  return cachedGetProduct(slugOrId, params?.expand ?? [], options, userToken);
}

async function cachedGetProductFilters(
  params: Record<string, unknown> | undefined,
  options: { locale?: string; country?: string },
  _userToken?: string,
) {
  "use cache: remote";
  cacheLife("tenMinutes");
  cacheTag("product-filters");
  try {
    const response = await getClient().products.filters(params, options);
    if (!response.filters || response.filters.length === 0) {
      return FALLBACK_FILTERS;
    }
    return response;
  } catch {
    return FALLBACK_FILTERS;
  }
}

export async function getProductFilters(params?: Record<string, unknown>) {
  const options = await getLocaleOptions();
  const userToken = await getAccessToken();
  return cachedGetProductFilters(params, options, userToken);
}
