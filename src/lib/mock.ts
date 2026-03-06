// ─── Types ───────────────────────────────────────────────────────────────────

export type LicenseValue = "allowed" | "denied" | "consult";
export type TrainingType = "light" | "standard" | "strong";

export interface LicenseTerms {
  commercial: LicenseValue;
  adult: LicenseValue;
  trainingType: TrainingType;
  redistribution: LicenseValue;
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  artistId: string;
  artistName: string;
  priceJpy: number;
  licenseTerms: LicenseTerms;
  likes: number;
  comments: number;
}

export interface Artist {
  id: string;
  name: string;
  iconUrl: string;
  bio: string;
  links: string[];
  styleTags: string[];
  policySummary: string;
  featuredArtworkIds: string[];
}

// ─── Dummy Artists ───────────────────────────────────────────────────────────

export const artists: Artist[] = [
  {
    id: "artist-1",
    name: "Yuki Tanaka",
    iconUrl: "https://picsum.photos/seed/artist1/200/200",
    bio: "東京を拠点に活動するイラストレーター。幻想的な風景とキャラクターデザインを得意としています。",
    links: ["https://twitter.com/yukitanaka", "https://yukitanaka.artstation.com"],
    styleTags: ["Fantasy", "Landscape", "Character"],
    policySummary: "商用利用は応相談。軽量学習のみ許可。",
    featuredArtworkIds: ["art-1", "art-2"],
  },
  {
    id: "artist-2",
    name: "Haruto Sato",
    iconUrl: "https://picsum.photos/seed/artist2/200/200",
    bio: "コンセプトアーティスト。SFとメカデザインを中心に制作。ゲーム業界での経験多数。",
    links: ["https://twitter.com/harutosato"],
    styleTags: ["Sci-Fi", "Mecha", "Concept Art"],
    policySummary: "商用利用可。学習利用はスタンダードまで許可。再配布は不可。",
    featuredArtworkIds: ["art-3", "art-4"],
  },
  {
    id: "artist-3",
    name: "Mio Hayashi",
    iconUrl: "https://picsum.photos/seed/artist3/200/200",
    bio: "水彩タッチのデジタルアートを制作。自然や動物をモチーフにした作品が多い。",
    links: ["https://mio-hayashi.com", "https://instagram.com/miohayashi"],
    styleTags: ["Watercolor", "Nature", "Animals"],
    policySummary: "商用利用可。成人向け不可。学習は軽量のみ。",
    featuredArtworkIds: ["art-5", "art-6"],
  },
  {
    id: "artist-4",
    name: "Ren Kimura",
    iconUrl: "https://picsum.photos/seed/artist4/200/200",
    bio: "ストリートアートとグラフィティに影響を受けたデジタルアーティスト。大胆な色使いが特徴。",
    links: ["https://twitter.com/renkimura"],
    styleTags: ["Street Art", "Pop Art", "Bold Colors"],
    policySummary: "全利用応相談。作品ごとに条件が異なります。",
    featuredArtworkIds: ["art-7", "art-8"],
  },
  {
    id: "artist-5",
    name: "Sakura Ito",
    iconUrl: "https://picsum.photos/seed/artist5/200/200",
    bio: "アニメスタイルのイラストレーター。キャラクターデザインと同人活動を中心に活動中。",
    links: ["https://pixiv.net/users/sakuraito", "https://twitter.com/sakura_ito"],
    styleTags: ["Anime", "Character Design", "Manga"],
    policySummary: "商用利用可。成人向け許可。学習はストロングまで許可。再配布可。",
    featuredArtworkIds: ["art-9", "art-10"],
  },
  {
    id: "artist-6",
    name: "Kaito Yamamoto",
    iconUrl: "https://picsum.photos/seed/artist6/200/200",
    bio: "抽象画とジェネラティブアートを融合させた作品を制作。プログラミングとアートの境界を探求。",
    links: ["https://kaito-art.dev"],
    styleTags: ["Abstract", "Generative", "Digital"],
    policySummary: "商用利用不可。学習利用不可。個人鑑賞のみ。",
    featuredArtworkIds: ["art-11", "art-12"],
  },
];

// ─── Dummy Artworks ──────────────────────────────────────────────────────────

export const artworks: Artwork[] = [
  {
    id: "art-1",
    title: "夜明けの浮遊城",
    description: "雲海に浮かぶ古城を幻想的に描いた作品。朝日が城壁を黄金に染め上げる瞬間を捉えています。",
    imageUrl: "https://picsum.photos/seed/art1/800/600",
    tags: ["Fantasy", "Castle", "Sunrise", "Clouds"],
    artistId: "artist-1",
    artistName: "Yuki Tanaka",
    priceJpy: 3000,
    licenseTerms: {
      commercial: "consult",
      adult: "denied",
      trainingType: "light",
      redistribution: "denied",
    },
    likes: 234,
    comments: 12,
  },
  {
    id: "art-2",
    title: "森の精霊",
    description: "深い森の中に佇む精霊を描いた作品。光と影のコントラストが神秘的な雰囲気を演出。",
    imageUrl: "https://picsum.photos/seed/art2/800/600",
    tags: ["Fantasy", "Spirit", "Forest", "Mystical"],
    artistId: "artist-1",
    artistName: "Yuki Tanaka",
    priceJpy: 2500,
    licenseTerms: {
      commercial: "consult",
      adult: "denied",
      trainingType: "light",
      redistribution: "consult",
    },
    likes: 187,
    comments: 8,
  },
  {
    id: "art-3",
    title: "ネオン都市2087",
    description: "サイバーパンクな未来都市を描いたコンセプトアート。ネオンサインが夜の街を照らす。",
    imageUrl: "https://picsum.photos/seed/art3/800/600",
    tags: ["Sci-Fi", "Cyberpunk", "City", "Neon"],
    artistId: "artist-2",
    artistName: "Haruto Sato",
    priceJpy: 5000,
    licenseTerms: {
      commercial: "allowed",
      adult: "denied",
      trainingType: "standard",
      redistribution: "denied",
    },
    likes: 456,
    comments: 23,
  },
  {
    id: "art-4",
    title: "戦闘メカ・ゼロ",
    description: "オリジナルメカデザイン。流線型のボディと重武装が特徴的な次世代戦闘ロボット。",
    imageUrl: "https://picsum.photos/seed/art4/800/600",
    tags: ["Mecha", "Robot", "Concept Art", "Military"],
    artistId: "artist-2",
    artistName: "Haruto Sato",
    priceJpy: 4500,
    licenseTerms: {
      commercial: "allowed",
      adult: "denied",
      trainingType: "standard",
      redistribution: "denied",
    },
    likes: 312,
    comments: 15,
  },
  {
    id: "art-5",
    title: "春の小川",
    description: "桜が咲き誇る小川のほとりを水彩タッチで表現。穏やかな春の一日を感じられる作品。",
    imageUrl: "https://picsum.photos/seed/art5/800/600",
    tags: ["Watercolor", "Nature", "Spring", "Cherry Blossom"],
    artistId: "artist-3",
    artistName: "Mio Hayashi",
    priceJpy: 2000,
    licenseTerms: {
      commercial: "allowed",
      adult: "denied",
      trainingType: "light",
      redistribution: "allowed",
    },
    likes: 389,
    comments: 19,
  },
  {
    id: "art-6",
    title: "眠る子鹿",
    description: "森の中で眠る子鹿を柔らかいタッチで描いた作品。温かみのある色合いが特徴。",
    imageUrl: "https://picsum.photos/seed/art6/800/600",
    tags: ["Animals", "Deer", "Watercolor", "Cute"],
    artistId: "artist-3",
    artistName: "Mio Hayashi",
    priceJpy: 1800,
    licenseTerms: {
      commercial: "allowed",
      adult: "denied",
      trainingType: "light",
      redistribution: "allowed",
    },
    likes: 278,
    comments: 14,
  },
  {
    id: "art-7",
    title: "URBAN PULSE",
    description: "都市のエネルギーをグラフィティスタイルで表現。ビビッドなカラーパレットが目を引く。",
    imageUrl: "https://picsum.photos/seed/art7/800/600",
    tags: ["Street Art", "Graffiti", "Urban", "Bold"],
    artistId: "artist-4",
    artistName: "Ren Kimura",
    priceJpy: 3500,
    licenseTerms: {
      commercial: "consult",
      adult: "consult",
      trainingType: "standard",
      redistribution: "consult",
    },
    likes: 156,
    comments: 7,
  },
  {
    id: "art-8",
    title: "POP EXPLOSION",
    description: "ポップアートとストリートカルチャーの融合。鮮やかな色彩とダイナミックな構図。",
    imageUrl: "https://picsum.photos/seed/art8/800/600",
    tags: ["Pop Art", "Street Art", "Colorful", "Dynamic"],
    artistId: "artist-4",
    artistName: "Ren Kimura",
    priceJpy: 4000,
    licenseTerms: {
      commercial: "consult",
      adult: "allowed",
      trainingType: "light",
      redistribution: "consult",
    },
    likes: 203,
    comments: 11,
  },
  {
    id: "art-9",
    title: "魔法少女ルナ",
    description: "オリジナルキャラクター「ルナ」の全身イラスト。月をモチーフにした魔法少女デザイン。",
    imageUrl: "https://picsum.photos/seed/art9/800/600",
    tags: ["Anime", "Character", "Magical Girl", "Original"],
    artistId: "artist-5",
    artistName: "Sakura Ito",
    priceJpy: 2800,
    licenseTerms: {
      commercial: "allowed",
      adult: "allowed",
      trainingType: "strong",
      redistribution: "allowed",
    },
    likes: 498,
    comments: 27,
  },
  {
    id: "art-10",
    title: "放課後の約束",
    description: "学園ラブコメ風の一枚絵。夕焼けの屋上で交わされる約束のシーン。",
    imageUrl: "https://picsum.photos/seed/art10/800/600",
    tags: ["Anime", "School", "Romance", "Sunset"],
    artistId: "artist-5",
    artistName: "Sakura Ito",
    priceJpy: 2200,
    licenseTerms: {
      commercial: "allowed",
      adult: "allowed",
      trainingType: "strong",
      redistribution: "allowed",
    },
    likes: 345,
    comments: 18,
  },
  {
    id: "art-11",
    title: "Fractal Bloom",
    description: "フラクタル幾何学を用いたジェネラティブアート。有機的なパターンが花のように広がる。",
    imageUrl: "https://picsum.photos/seed/art11/800/600",
    tags: ["Abstract", "Generative", "Fractal", "Digital"],
    artistId: "artist-6",
    artistName: "Kaito Yamamoto",
    priceJpy: 6000,
    licenseTerms: {
      commercial: "denied",
      adult: "denied",
      trainingType: "light",
      redistribution: "denied",
    },
    likes: 89,
    comments: 3,
  },
  {
    id: "art-12",
    title: "Entropy Wave",
    description: "エントロピーの概念を視覚化した抽象作品。秩序と混沌の境界を表現。",
    imageUrl: "https://picsum.photos/seed/art12/800/600",
    tags: ["Abstract", "Generative", "Entropy", "Waves"],
    artistId: "artist-6",
    artistName: "Kaito Yamamoto",
    priceJpy: 5500,
    licenseTerms: {
      commercial: "denied",
      adult: "denied",
      trainingType: "light",
      redistribution: "denied",
    },
    likes: 134,
    comments: 5,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getArtworkById(id: string): Artwork | undefined {
  return artworks.find((a) => a.id === id);
}

export function getArtistById(id: string): Artist | undefined {
  return artists.find((a) => a.id === id);
}

export function getArtworksByArtistId(artistId: string): Artwork[] {
  return artworks.filter((a) => a.artistId === artistId);
}

export function getFeaturedArtworks(count: number = 6): Artwork[] {
  return artworks.slice(0, count);
}

export function getFeaturedArtists(count: number = 4): Artist[] {
  return artists.slice(0, count);
}
