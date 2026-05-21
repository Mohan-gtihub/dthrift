import type {
  Category,
  Media,
  Price,
  Product,
  ProductFiltersResponse,
  Variant,
} from "@spree/sdk";

/**
 * Demo dataset used as a fallback when the connected Spree store returns no
 * products (e.g. an unseeded backend). It lets the storefront render a
 * complete, professional homepage carousel, product listing, and product
 * detail pages without a populated catalog. Remove or stop falling back to
 * this once the backend has real products.
 */

interface FixtureSeed {
  slug: string;
  name: string;
  description: string;
  amount: number;
  compareAt?: number;
  image: string;
  gallery: string[];
  tags: string[];
  category: string;
}

const SEEDS: FixtureSeed[] = [
  {
    slug: "vintage-denim-jacket",
    name: "Vintage Washed Denim Jacket",
    description:
      "Reclaimed mid-weight denim with a lived-in wash and contrast stitching. One-of-a-kind piece, professionally restored.",
    amount: 89,
    compareAt: 120,
    image:
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=1200&q=80",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=1200&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80",
    ],
    tags: ["outerwear", "denim", "vintage"],
    category: "Outerwear",
  },
  {
    slug: "oversized-graphic-tee",
    name: "Oversized Graphic Tee",
    description:
      "Heavyweight cotton tee with a relaxed, boxy fit and screen-printed graphic. Pre-loved and gently worn.",
    amount: 32,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&q=80",
    ],
    tags: ["tops", "graphic", "cotton"],
    category: "Tops",
  },
  {
    slug: "retro-leather-sneakers",
    name: "Retro Leather Sneakers",
    description:
      "Classic low-top leather sneakers with gum sole. Cleaned, conditioned, and ready for the streets.",
    amount: 74,
    compareAt: 95,
    image:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1200&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80",
    ],
    tags: ["footwear", "sneakers", "leather"],
    category: "Footwear",
  },
  {
    slug: "wool-blend-overcoat",
    name: "Wool-Blend Tailored Overcoat",
    description:
      "Structured wool-blend overcoat with a timeless silhouette. Dry-cleaned and inspected for quality.",
    amount: 145,
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80",
    ],
    tags: ["outerwear", "wool", "tailored"],
    category: "Outerwear",
  },
  {
    slug: "high-rise-mom-jeans",
    name: "High-Rise Mom Jeans",
    description:
      "Authentic vintage high-rise jeans with a tapered leg and rigid denim. Sustainably sourced.",
    amount: 58,
    compareAt: 78,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=80",
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=1200&q=80",
    ],
    tags: ["bottoms", "denim", "vintage"],
    category: "Bottoms",
  },
  {
    slug: "knit-cardigan-sweater",
    name: "Chunky Knit Cardigan",
    description:
      "Cozy oversized cardigan in a chunky cable knit. Hand-checked for pilling and snags.",
    amount: 64,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=80",
    ],
    tags: ["knitwear", "sweater", "cozy"],
    category: "Knitwear",
  },
  {
    slug: "canvas-tote-bag",
    name: "Heavy Canvas Tote Bag",
    description:
      "Durable everyday tote in heavyweight canvas with reinforced straps. Pre-loved, plenty of life left.",
    amount: 28,
    image:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1200&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&q=80",
    ],
    tags: ["accessories", "bags", "canvas"],
    category: "Accessories",
  },
  {
    slug: "silk-print-scarf",
    name: "Vintage Silk Print Scarf",
    description:
      "Lightweight silk scarf with a bold retro print. Gently cleaned and ready to elevate any look.",
    amount: 22,
    compareAt: 35,
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1200&q=80",
      "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=1200&q=80",
    ],
    tags: ["accessories", "silk", "vintage"],
    category: "Accessories",
  },
];

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function makePrice(seed: FixtureSeed): Price {
  return {
    id: `price-${seed.slug}`,
    amount: seed.amount.toFixed(2),
    amount_in_cents: Math.round(seed.amount * 100),
    compare_at_amount: seed.compareAt ? seed.compareAt.toFixed(2) : null,
    compare_at_amount_in_cents: seed.compareAt
      ? Math.round(seed.compareAt * 100)
      : null,
    currency: "USD",
    display_amount: formatAmount(seed.amount),
    display_compare_at_amount: seed.compareAt
      ? formatAmount(seed.compareAt)
      : null,
    price_list_id: null,
  };
}

function makeOriginalPrice(seed: FixtureSeed): Price | null {
  if (!seed.compareAt) return null;
  return {
    id: `original-price-${seed.slug}`,
    amount: seed.compareAt.toFixed(2),
    amount_in_cents: Math.round(seed.compareAt * 100),
    compare_at_amount: null,
    compare_at_amount_in_cents: null,
    currency: "USD",
    display_amount: formatAmount(seed.compareAt),
    display_compare_at_amount: null,
    price_list_id: null,
  };
}

function makeMedia(seed: FixtureSeed): Media[] {
  return seed.gallery.map((url, index) => ({
    id: `media-${seed.slug}-${index}`,
    product_id: seed.slug,
    variant_ids: [],
    position: index + 1,
    alt: seed.name,
    media_type: "image",
    focal_point_x: null,
    focal_point_y: null,
    external_video_url: null,
    original_url: url,
    mini_url: url,
    small_url: url,
    medium_url: url,
    large_url: url,
    xlarge_url: url,
    og_image_url: url,
  }));
}

function makeCategory(seed: FixtureSeed): Category {
  const permalink = `categories/${seed.category.toLowerCase()}`;
  return {
    id: `category-${seed.category.toLowerCase()}`,
    name: seed.category,
    permalink,
    position: 1,
    depth: 1,
    meta_title: null,
    meta_description: null,
    meta_keywords: null,
    children_count: 0,
    parent_id: null,
    description: "",
    description_html: "",
    image_url: null,
    square_image_url: null,
    is_root: false,
    is_child: true,
    is_leaf: true,
  };
}

function makeVariant(seed: FixtureSeed): Variant {
  const price = makePrice(seed);
  const media = makeMedia(seed);
  return {
    id: `variant-${seed.slug}`,
    product_id: seed.slug,
    sku: `DT-${seed.slug.toUpperCase().slice(0, 8)}`,
    options_text: "One Size",
    track_inventory: true,
    media_count: media.length,
    thumbnail_url: seed.image,
    purchasable: true,
    in_stock: true,
    backorderable: false,
    weight: null,
    height: null,
    width: null,
    depth: null,
    price,
    original_price: makeOriginalPrice(seed),
    primary_media: media[0],
    media,
    option_values: [],
  };
}

function makeProduct(seed: FixtureSeed): Product {
  const variant = makeVariant(seed);
  const media = makeMedia(seed);
  return {
    id: seed.slug,
    name: seed.name,
    slug: seed.slug,
    meta_description: seed.description,
    meta_keywords: seed.tags.join(", "),
    variant_count: 1,
    available_on: new Date().toISOString(),
    purchasable: true,
    in_stock: true,
    backorderable: false,
    available: true,
    description: seed.description,
    description_html: `<p>${seed.description}</p>`,
    default_variant_id: variant.id,
    thumbnail_url: seed.image,
    tags: seed.tags,
    price: makePrice(seed),
    original_price: makeOriginalPrice(seed),
    primary_media: media[0],
    media,
    variants: [variant],
    default_variant: variant,
    option_types: [],
    categories: [makeCategory(seed)],
    custom_fields: [],
  };
}

export const FALLBACK_PRODUCTS: Product[] = SEEDS.map(makeProduct);

export function getFallbackProduct(slugOrId: string): Product | undefined {
  return FALLBACK_PRODUCTS.find(
    (product) => product.slug === slugOrId || product.id === slugOrId,
  );
}

const FIXTURE_CATEGORIES = [...new Set(SEEDS.map((seed) => seed.category))];

export const FALLBACK_FILTERS: ProductFiltersResponse = {
  filters: [
    {
      id: "categories",
      type: "category",
      options: FIXTURE_CATEGORIES.map((category) => ({
        id: `category-${category.toLowerCase()}`,
        name: category,
        permalink: `categories/${category.toLowerCase()}`,
        count: SEEDS.filter((seed) => seed.category === category).length,
      })),
    },
    {
      id: "price",
      type: "price_range",
      min: Math.min(...SEEDS.map((seed) => seed.amount)),
      max: Math.max(...SEEDS.map((seed) => seed.amount)),
      currency: "USD",
    },
    {
      id: "availability",
      type: "availability",
      options: [
        { id: "in_stock", count: SEEDS.length },
        { id: "out_of_stock", count: 0 },
      ],
    },
  ],
  sort_options: [
    { id: "newest" },
    { id: "price-asc" },
    { id: "price-desc" },
  ],
  default_sort: "newest",
  total_count: SEEDS.length,
};
