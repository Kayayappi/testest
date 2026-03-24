import { prisma } from "@/lib/prisma";
import type {
  WorkForCard,
  ArtistForCard,
  ArtistWithWorks,
  LicenseValue,
  TrainingType,
  SidebarData,
} from "@/lib/types";

// ─── Slug Generation ─────────────────────────────────────────────────────────

async function generateSlug(title: string): Promise<string> {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40) || "work";

  const suffix = Math.random().toString(36).slice(2, 8);
  const slug = `${base}-${suffix}`;

  const existing = await prisma.work.findUnique({ where: { slug } });
  if (existing) {
    return `${base}-${Math.random().toString(36).slice(2, 10)}`;
  }
  return slug;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function toWorkForCard(
  w: {
    id: string;
    slug: string;
    title: string;
    description: string;
    coverImageUrl: string;
    status: string;
    likesCount: number;
    commentsCount: number;
    artistProfile: {
      slug: string;
      displayName: string;
      iconUrl: string;
    };
    license: {
      commercial: string;
      adult: string;
      trainingType: string;
      redistribution: string;
      priceJpy: number;
    } | null;
    tags: { name: string }[];
  },
): WorkForCard {
  return {
    id: w.id,
    slug: w.slug,
    title: w.title,
    description: w.description,
    coverImageUrl: w.coverImageUrl,
    status: w.status,
    likesCount: w.likesCount,
    commentsCount: w.commentsCount,
    artistProfile: {
      slug: w.artistProfile.slug,
      displayName: w.artistProfile.displayName,
      iconUrl: w.artistProfile.iconUrl,
    },
    license: w.license
      ? {
          commercial: w.license.commercial as LicenseValue,
          adult: w.license.adult as LicenseValue,
          trainingType: w.license.trainingType as TrainingType,
          redistribution: w.license.redistribution as LicenseValue,
          priceJpy: w.license.priceJpy,
        }
      : null,
    tags: w.tags.map((t) => ({ name: t.name })),
  };
}

const workInclude = {
  artistProfile: {
    select: { slug: true, displayName: true, iconUrl: true },
  },
  license: {
    select: {
      commercial: true,
      adult: true,
      trainingType: true,
      redistribution: true,
      priceJpy: true,
    },
  },
  tags: { select: { name: true } },
} as const;

// ─── Public Queries ─────────────────────────────────────────────────────────

export async function getPublicWorks(): Promise<WorkForCard[]> {
  const works = await prisma.work.findMany({
    where: { status: "public" },
    include: workInclude,
    orderBy: { createdAt: "desc" },
  });
  return works.map(toWorkForCard);
}

export async function getFeaturedWorks(count: number): Promise<WorkForCard[]> {
  const works = await prisma.work.findMany({
    where: { status: "public" },
    include: workInclude,
    orderBy: { likesCount: "desc" },
    take: count,
  });
  return works.map(toWorkForCard);
}

export async function getWorkBySlug(slug: string): Promise<WorkForCard | null> {
  const w = await prisma.work.findFirst({
    where: { slug, status: "public" },
    include: workInclude,
  });
  if (!w) return null;
  return toWorkForCard(w);
}

export async function getWorksByArtistSlug(
  artistSlug: string,
  options?: { publicOnly?: boolean },
): Promise<WorkForCard[]> {
  const works = await prisma.work.findMany({
    where: {
      artistProfile: { slug: artistSlug },
      ...(options?.publicOnly ? { status: "public" } : {}),
    },
    include: workInclude,
    orderBy: { createdAt: "desc" },
  });
  return works.map(toWorkForCard);
}

export async function getAllArtists(): Promise<ArtistForCard[]> {
  const artists = await prisma.artistProfile.findMany({
    include: {
      works: {
        where: { status: "public" },
        select: { coverImageUrl: true },
        take: 1,
      },
      _count: {
        select: { works: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return artists.map((a) => ({
    id: a.id,
    slug: a.slug,
    displayName: a.displayName,
    bio: a.bio,
    iconUrl: a.iconUrl,
    links: a.links as string[],
    styleTags: a.styleTags as string[],
    policySummary: a.policySummary,
    worksCount: a._count.works,
    previewImageUrl: a.works[0]?.coverImageUrl ?? null,
  }));
}

export async function getFeaturedArtists(count: number): Promise<ArtistForCard[]> {
  const all = await getAllArtists();
  return all.slice(0, count);
}

export async function getArtistBySlug(slug: string): Promise<ArtistWithWorks | null> {
  const artist = await prisma.artistProfile.findUnique({
    where: { slug },
    include: {
      works: {
        where: { status: "public" },
        include: workInclude,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!artist) return null;

  return {
    id: artist.id,
    slug: artist.slug,
    displayName: artist.displayName,
    bio: artist.bio,
    iconUrl: artist.iconUrl,
    links: artist.links as string[],
    styleTags: artist.styleTags as string[],
    policySummary: artist.policySummary,
    works: artist.works.map(toWorkForCard),
  };
}

// ─── Dashboard Queries ──────────────────────────────────────────────────────

export async function getDashboardWorksByUserSlug(userSlug: string) {
  const user = await prisma.user.findUnique({
    where: { slug: userSlug },
    include: {
      artistProfile: {
        include: {
          works: {
            include: {
              license: true,
              _count: { select: { acquisitions: true } },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  if (!user?.artistProfile) return [];

  return user.artistProfile.works.map((w) => ({
    id: w.id,
    slug: w.slug,
    title: w.title,
    imageUrl: w.coverImageUrl,
    status: w.status,
    likes: w.likesCount,
    acquisitions: w._count.acquisitions,
    createdAt: w.createdAt.toISOString().slice(0, 10),
    updatedAt: w.updatedAt.toISOString().slice(0, 10),
    licenseTerms: w.license
      ? {
          commercial: w.license.commercial,
          adult: w.license.adult,
          trainingType: w.license.trainingType,
          redistribution: w.license.redistribution,
        }
      : null,
  }));
}

// ─── Work CRUD ───────────────────────────────────────────────────────────────

export async function createWork(data: {
  userSlug: string;
  title: string;
  description: string;
  coverImageUrl: string;
  tags: string[];
  license: {
    commercial: string;
    adult: string;
    trainingType: string;
    redistribution: string;
    priceJpy: number;
  };
}): Promise<{ id: string; slug: string }> {
  const user = await prisma.user.findUnique({
    where: { slug: data.userSlug },
    include: { artistProfile: true },
  });
  if (!user?.artistProfile) throw new Error("Artist profile not found");

  const slug = await generateSlug(data.title);

  const work = await prisma.work.create({
    data: {
      slug,
      title: data.title,
      description: data.description,
      coverImageUrl: data.coverImageUrl,
      status: "draft",
      artistProfileId: user.artistProfile.id,
      license: {
        create: {
          commercial: data.license.commercial,
          adult: data.license.adult,
          trainingType: data.license.trainingType,
          redistribution: data.license.redistribution,
          priceJpy: data.license.priceJpy,
        },
      },
      tags: {
        connectOrCreate: data.tags
          .filter((t) => t.trim() !== "")
          .map((name) => ({
            where: { name: name.trim() },
            create: { name: name.trim() },
          })),
      },
    },
  });

  return { id: work.id, slug: work.slug };
}

export async function updateWork(data: {
  workId: string;
  userSlug: string;
  title: string;
  description: string;
  coverImageUrl: string;
  tags: string[];
  status: string;
  license: {
    commercial: string;
    adult: string;
    trainingType: string;
    redistribution: string;
    priceJpy: number;
  };
}): Promise<{ id: string; slug: string }> {
  const user = await prisma.user.findUnique({
    where: { slug: data.userSlug },
    include: { artistProfile: true },
  });
  if (!user?.artistProfile) throw new Error("Artist profile not found");

  const work = await prisma.work.findUnique({
    where: { id: data.workId },
  });
  if (!work || work.artistProfileId !== user.artistProfile.id) {
    throw new Error("Work not found or not owned by this artist");
  }

  const updated = await prisma.work.update({
    where: { id: data.workId },
    data: {
      title: data.title,
      description: data.description,
      coverImageUrl: data.coverImageUrl,
      status: data.status,
      tags: {
        set: [],
        connectOrCreate: data.tags
          .filter((t) => t.trim() !== "")
          .map((name) => ({
            where: { name: name.trim() },
            create: { name: name.trim() },
          })),
      },
      license: {
        upsert: {
          create: {
            commercial: data.license.commercial,
            adult: data.license.adult,
            trainingType: data.license.trainingType,
            redistribution: data.license.redistribution,
            priceJpy: data.license.priceJpy,
          },
          update: {
            commercial: data.license.commercial,
            adult: data.license.adult,
            trainingType: data.license.trainingType,
            redistribution: data.license.redistribution,
            priceJpy: data.license.priceJpy,
          },
        },
      },
    },
  });

  return { id: updated.id, slug: updated.slug };
}

export async function getWorkForEdit(workId: string, userSlug: string) {
  const user = await prisma.user.findUnique({
    where: { slug: userSlug },
    include: { artistProfile: true },
  });
  if (!user?.artistProfile) return null;

  const work = await prisma.work.findUnique({
    where: { id: workId },
    include: {
      license: true,
      tags: { select: { name: true } },
    },
  });

  if (!work || work.artistProfileId !== user.artistProfile.id) return null;

  return {
    id: work.id,
    slug: work.slug,
    title: work.title,
    description: work.description,
    coverImageUrl: work.coverImageUrl,
    status: work.status,
    tags: work.tags.map((t) => t.name),
    license: work.license
      ? {
          commercial: work.license.commercial,
          adult: work.license.adult,
          trainingType: work.license.trainingType,
          redistribution: work.license.redistribution,
          priceJpy: work.license.priceJpy,
        }
      : null,
  };
}

export async function getArtistProfileByUserSlug(userSlug: string) {
  const user = await prisma.user.findUnique({
    where: { slug: userSlug },
    include: { artistProfile: true },
  });
  if (!user?.artistProfile) return null;
  return {
    displayName: user.artistProfile.displayName,
    bio: user.artistProfile.bio,
    styleTags: user.artistProfile.styleTags as string[],
    policySummary: user.artistProfile.policySummary,
  };
}

export async function getAcquisitionsByUserSlug(userSlug: string) {
  const user = await prisma.user.findUnique({
    where: { slug: userSlug },
    include: {
      developerProfile: {
        include: {
          acquisitions: {
            include: {
              work: {
                include: {
                  artistProfile: { select: { slug: true, displayName: true } },
                },
              },
            },
            orderBy: { acquiredAt: "desc" },
          },
        },
      },
    },
  });

  if (!user?.developerProfile) return [];

  return user.developerProfile.acquisitions.map((a) => ({
    id: a.id,
    workId: a.work.slug,
    workTitle: a.work.title,
    workImageUrl: a.work.coverImageUrl,
    artistName: a.work.artistProfile.displayName,
    artistId: a.work.artistProfile.slug,
    acquiredAt: a.acquiredAt.toISOString().slice(0, 10),
    licenseSummary: formatLicenseSummary(a.licenseSnapshot),
    commercialAllowed: isCommercialAllowed(a.licenseSnapshot),
    priceJpy: a.priceJpy,
  }));
}

export async function getDeveloperProfileByUserSlug(userSlug: string) {
  const user = await prisma.user.findUnique({
    where: { slug: userSlug },
    include: { developerProfile: true },
  });
  if (!user?.developerProfile) return null;
  return {
    companyName: user.developerProfile.companyName,
    purpose: user.developerProfile.purpose,
  };
}

// ─── License Summary Helpers ────────────────────────────────────────────────

function formatLicenseSummary(snapshot: unknown): string {
  try {
    const raw = typeof snapshot === "string" ? JSON.parse(snapshot) : snapshot;
    const s = raw as {
      commercial: string;
      adult: string;
      trainingType: string;
      redistribution: string;
    };
    const parts: string[] = [];
    if (s.commercial === "allowed") parts.push("商用利用可");
    else if (s.commercial === "consult") parts.push("商用利用応相談");
    else parts.push("商用利用不可");
    if (s.redistribution === "allowed") parts.push("再配布可");
    else if (s.redistribution === "denied") parts.push("再配布不可");
    if (s.trainingType === "light") parts.push("学習ライト");
    else if (s.trainingType === "standard") parts.push("学習スタンダード");
    else if (s.trainingType === "strong") parts.push("学習ストロング");
    if (s.adult === "allowed") parts.push("成人向け許可");
    return parts.join("・") || "条件未設定";
  } catch {
    return "条件未設定";
  }
}

function isCommercialAllowed(snapshot: unknown): boolean {
  try {
    const raw = typeof snapshot === "string" ? JSON.parse(snapshot) : snapshot;
    const s = raw as { commercial: string };
    return s.commercial === "allowed";
  } catch {
    return false;
  }
}

// ─── Sidebar Query ──────────────────────────────────────────────────────────

export async function getSidebarData(): Promise<SidebarData> {
  const [tags, artists, works] = await Promise.all([
    prisma.tag.findMany({
      include: { _count: { select: { works: true } } },
      orderBy: { works: { _count: "desc" } },
      take: 10,
    }),
    prisma.artistProfile.findMany({
      select: { slug: true, displayName: true, iconUrl: true },
      take: 3,
      orderBy: { createdAt: "asc" },
    }),
    prisma.work.findMany({
      where: { status: "public" },
      select: { slug: true, title: true, coverImageUrl: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  return {
    trendingTags: tags.map((t) => ({ name: t.name, count: t._count.works })),
    featuredArtists: artists.map((a) => ({
      slug: a.slug,
      displayName: a.displayName,
      iconUrl: a.iconUrl,
    })),
    newWorks: works.map((w) => ({
      slug: w.slug,
      title: w.title,
      coverImageUrl: w.coverImageUrl,
    })),
  };
}
