// ─── Serialized types for passing from Server Components to Client Components ───

export type LicenseValue = "allowed" | "denied" | "consult";
export type TrainingType = "light" | "standard" | "strong";

export interface LicenseTerms {
  commercial: LicenseValue;
  adult: LicenseValue;
  trainingType: TrainingType;
  redistribution: LicenseValue;
}

export interface WorkForCard {
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
    commercial: LicenseValue;
    adult: LicenseValue;
    trainingType: TrainingType;
    redistribution: LicenseValue;
    priceJpy: number;
  } | null;
  tags: { name: string }[];
}

export interface ArtistForCard {
  id: string;
  slug: string;
  displayName: string;
  bio: string;
  iconUrl: string;
  links: string[];
  styleTags: string[];
  policySummary: string;
  worksCount: number;
  previewImageUrl: string | null;
}

export interface ArtistWithWorks {
  id: string;
  slug: string;
  displayName: string;
  bio: string;
  iconUrl: string;
  links: string[];
  styleTags: string[];
  policySummary: string;
  works: WorkForCard[];
}

export interface DashboardWork {
  id: string;
  slug: string;
  title: string;
  coverImageUrl: string;
  status: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  acquisitionCount: number;
  license: {
    commercial: LicenseValue;
    adult: LicenseValue;
    trainingType: TrainingType;
    redistribution: LicenseValue;
    priceJpy: number;
  } | null;
}

export interface DashboardAcquisition {
  id: string;
  workSlug: string;
  workTitle: string;
  workImageUrl: string;
  artistName: string;
  artistSlug: string;
  acquiredAt: string;
  priceJpy: number;
  licenseSnapshot: LicenseTerms;
}
