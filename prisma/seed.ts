import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clean all tables in reverse dependency order
  await prisma.acquisition.deleteMany();
  await prisma.license.deleteMany();
  await prisma.work.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.developerProfile.deleteMany();
  await prisma.artistProfile.deleteMany();
  await prisma.user.deleteMany();

  // ─── Users (8) ───────────────────────────────────────────────────────────────
  const user1 = await prisma.user.create({
    data: {
      slug: "user-1",
      email: "viewer@artli.dev",
      password: "password",
      displayName: "Demo Viewer",
      avatarUrl: "https://picsum.photos/seed/user1/200/200",
    },
  });
  const user2 = await prisma.user.create({
    data: {
      slug: "user-2",
      email: "artist@artli.dev",
      password: "password",
      displayName: "Yuki Tanaka",
      avatarUrl: "https://picsum.photos/seed/user2/200/200",
    },
  });
  const user3 = await prisma.user.create({
    data: {
      slug: "user-3",
      email: "dev@artli.dev",
      password: "password",
      displayName: "Dev Studio",
      avatarUrl: "https://picsum.photos/seed/user3/200/200",
    },
  });
  const user4 = await prisma.user.create({
    data: {
      slug: "user-4",
      email: "hybrid@artli.dev",
      password: "password",
      displayName: "Sakura Ito",
      avatarUrl: "https://picsum.photos/seed/user4/200/200",
    },
  });
  const user5 = await prisma.user.create({
    data: {
      slug: "user-5",
      email: "haruto@artli.dev",
      password: "password",
      displayName: "Haruto Sato",
      avatarUrl: "https://picsum.photos/seed/user5/200/200",
    },
  });
  const user6 = await prisma.user.create({
    data: {
      slug: "user-6",
      email: "mio@artli.dev",
      password: "password",
      displayName: "Mio Hayashi",
      avatarUrl: "https://picsum.photos/seed/user6/200/200",
    },
  });
  const user7 = await prisma.user.create({
    data: {
      slug: "user-7",
      email: "ren@artli.dev",
      password: "password",
      displayName: "Ren Kimura",
      avatarUrl: "https://picsum.photos/seed/user7/200/200",
    },
  });
  const user8 = await prisma.user.create({
    data: {
      slug: "user-8",
      email: "kaito@artli.dev",
      password: "password",
      displayName: "Kaito Yamamoto",
      avatarUrl: "https://picsum.photos/seed/user8/200/200",
    },
  });

  // ─── Artist Profiles (6) ─────────────────────────────────────────────────────
  const artist1 = await prisma.artistProfile.create({
    data: {
      slug: "artist-1",
      userId: user2.id,
      displayName: "Yuki Tanaka",
      bio: "東京を拠点に活動するイラストレーター。幻想的な風景とキャラクターデザインを得意としています。",
      iconUrl: "https://picsum.photos/seed/artist1/200/200",
      links: ["https://twitter.com/yukitanaka", "https://yukitanaka.artstation.com"],
      styleTags: ["Fantasy", "Landscape", "Character"],
      policySummary: "商用利用は応相談。軽量学習のみ許可。",
    },
  });
  const artist2 = await prisma.artistProfile.create({
    data: {
      slug: "artist-2",
      userId: user5.id,
      displayName: "Haruto Sato",
      bio: "コンセプトアーティスト。SFとメカデザインを中心に制作。ゲーム業界での経験多数。",
      iconUrl: "https://picsum.photos/seed/artist2/200/200",
      links: ["https://twitter.com/harutosato"],
      styleTags: ["Sci-Fi", "Mecha", "Concept Art"],
      policySummary: "商用利用可。学習利用はスタンダードまで許可。再配布は不可。",
    },
  });
  const artist3 = await prisma.artistProfile.create({
    data: {
      slug: "artist-3",
      userId: user6.id,
      displayName: "Mio Hayashi",
      bio: "水彩タッチのデジタルアートを制作。自然や動物をモチーフにした作品が多い。",
      iconUrl: "https://picsum.photos/seed/artist3/200/200",
      links: ["https://mio-hayashi.com", "https://instagram.com/miohayashi"],
      styleTags: ["Watercolor", "Nature", "Animals"],
      policySummary: "商用利用可。成人向け不可。学習は軽量のみ。",
    },
  });
  const artist4 = await prisma.artistProfile.create({
    data: {
      slug: "artist-4",
      userId: user7.id,
      displayName: "Ren Kimura",
      bio: "ストリートアートとグラフィティに影響を受けたデジタルアーティスト。大胆な色使いが特徴。",
      iconUrl: "https://picsum.photos/seed/artist4/200/200",
      links: ["https://twitter.com/renkimura"],
      styleTags: ["Street Art", "Pop Art", "Bold Colors"],
      policySummary: "全利用応相談。作品ごとに条件が異なります。",
    },
  });
  const artist5 = await prisma.artistProfile.create({
    data: {
      slug: "artist-5",
      userId: user4.id,
      displayName: "Sakura Ito",
      bio: "アニメスタイルのイラストレーター。キャラクターデザインと同人活動を中心に活動中。",
      iconUrl: "https://picsum.photos/seed/artist5/200/200",
      links: ["https://pixiv.net/users/sakuraito", "https://twitter.com/sakura_ito"],
      styleTags: ["Anime", "Character Design", "Manga"],
      policySummary: "商用利用可。成人向け許可。学習はストロングまで許可。再配布可。",
    },
  });
  const artist6 = await prisma.artistProfile.create({
    data: {
      slug: "artist-6",
      userId: user8.id,
      displayName: "Kaito Yamamoto",
      bio: "抽象画とジェネラティブアートを融合させた作品を制作。プログラミングとアートの境界を探求。",
      iconUrl: "https://picsum.photos/seed/artist6/200/200",
      links: ["https://kaito-art.dev"],
      styleTags: ["Abstract", "Generative", "Digital"],
      policySummary: "商用利用不可。学習利用不可。個人鑑賞のみ。",
    },
  });

  // ─── Developer Profiles (2) ──────────────────────────────────────────────────
  const devProfile1 = await prisma.developerProfile.create({
    data: {
      userId: user3.id,
      displayName: "Dev Studio",
      companyName: "Dev Studio Inc.",
      purpose: "ゲーム開発におけるコンセプトアートの素材取得",
    },
  });
  const devProfile2 = await prisma.developerProfile.create({
    data: {
      userId: user4.id,
      displayName: "Sakura Creative",
      companyName: "Sakura Creative LLC",
      purpose: "個人プロジェクトおよびクライアントワークでの素材利用",
    },
  });

  // ─── Tags ────────────────────────────────────────────────────────────────────
  const allTagNames = [
    "Fantasy", "Castle", "Sunrise", "Clouds",
    "Spirit", "Forest", "Mystical",
    "Sci-Fi", "Cyberpunk", "City", "Neon",
    "Mecha", "Robot", "Concept Art", "Military",
    "Watercolor", "Nature", "Spring", "Cherry Blossom",
    "Animals", "Deer", "Cute",
    "Street Art", "Graffiti", "Urban", "Bold",
    "Pop Art", "Colorful", "Dynamic",
    "Anime", "Character", "Magical Girl", "Original",
    "School", "Romance", "Sunset",
    "Abstract", "Generative", "Fractal", "Digital",
    "Entropy", "Waves",
    "Landscape", "Character Design", "Manga",
  ];

  const uniqueTagNames = [...new Set(allTagNames)];
  const tagMap: Record<string, string> = {};

  for (const name of uniqueTagNames) {
    const tag = await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    tagMap[name] = tag.id;
  }

  // Helper to connect tags by name
  function connectTags(names: string[]) {
    return names.map((n) => ({ id: tagMap[n] }));
  }

  // ─── Works (12 public from mock.ts) ──────────────────────────────────────────
  const art1 = await prisma.work.create({
    data: {
      slug: "art-1",
      title: "夜明けの浮遊城",
      description: "雲海に浮かぶ古城を幻想的に描いた作品。朝日が城壁を黄金に染め上げる瞬間を捉えています。",
      coverImageUrl: "https://picsum.photos/seed/art1/800/600",
      status: "public",
      likesCount: 234,
      commentsCount: 12,
      artistProfileId: artist1.id,
      license: {
        create: {
          commercial: "consult",
          adult: "denied",
          trainingType: "light",
          redistribution: "denied",
          priceJpy: 3000,
        },
      },
      tags: { connect: connectTags(["Fantasy", "Castle", "Sunrise", "Clouds"]) },
    },
  });

  const art2 = await prisma.work.create({
    data: {
      slug: "art-2",
      title: "森の精霊",
      description: "深い森の中に佇む精霊を描いた作品。光と影のコントラストが神秘的な雰囲気を演出。",
      coverImageUrl: "https://picsum.photos/seed/art2/800/600",
      status: "public",
      likesCount: 187,
      commentsCount: 8,
      artistProfileId: artist1.id,
      license: {
        create: {
          commercial: "consult",
          adult: "denied",
          trainingType: "light",
          redistribution: "consult",
          priceJpy: 2500,
        },
      },
      tags: { connect: connectTags(["Fantasy", "Spirit", "Forest", "Mystical"]) },
    },
  });

  const art3 = await prisma.work.create({
    data: {
      slug: "art-3",
      title: "ネオン都市2087",
      description: "サイバーパンクな未来都市を描いたコンセプトアート。ネオンサインが夜の街を照らす。",
      coverImageUrl: "https://picsum.photos/seed/art3/800/600",
      status: "public",
      likesCount: 456,
      commentsCount: 23,
      artistProfileId: artist2.id,
      license: {
        create: {
          commercial: "allowed",
          adult: "denied",
          trainingType: "standard",
          redistribution: "denied",
          priceJpy: 5000,
        },
      },
      tags: { connect: connectTags(["Sci-Fi", "Cyberpunk", "City", "Neon"]) },
    },
  });

  const art4 = await prisma.work.create({
    data: {
      slug: "art-4",
      title: "戦闘メカ・ゼロ",
      description: "オリジナルメカデザイン。流線型のボディと重武装が特徴的な次世代戦闘ロボット。",
      coverImageUrl: "https://picsum.photos/seed/art4/800/600",
      status: "public",
      likesCount: 312,
      commentsCount: 15,
      artistProfileId: artist2.id,
      license: {
        create: {
          commercial: "allowed",
          adult: "denied",
          trainingType: "standard",
          redistribution: "denied",
          priceJpy: 4500,
        },
      },
      tags: { connect: connectTags(["Mecha", "Robot", "Concept Art", "Military"]) },
    },
  });

  const art5 = await prisma.work.create({
    data: {
      slug: "art-5",
      title: "春の小川",
      description: "桜が咲き誇る小川のほとりを水彩タッチで表現。穏やかな春の一日を感じられる作品。",
      coverImageUrl: "https://picsum.photos/seed/art5/800/600",
      status: "public",
      likesCount: 389,
      commentsCount: 19,
      artistProfileId: artist3.id,
      license: {
        create: {
          commercial: "allowed",
          adult: "denied",
          trainingType: "light",
          redistribution: "allowed",
          priceJpy: 2000,
        },
      },
      tags: { connect: connectTags(["Watercolor", "Nature", "Spring", "Cherry Blossom"]) },
    },
  });

  const art6 = await prisma.work.create({
    data: {
      slug: "art-6",
      title: "眠る子鹿",
      description: "森の中で眠る子鹿を柔らかいタッチで描いた作品。温かみのある色合いが特徴。",
      coverImageUrl: "https://picsum.photos/seed/art6/800/600",
      status: "public",
      likesCount: 278,
      commentsCount: 14,
      artistProfileId: artist3.id,
      license: {
        create: {
          commercial: "allowed",
          adult: "denied",
          trainingType: "light",
          redistribution: "allowed",
          priceJpy: 1800,
        },
      },
      tags: { connect: connectTags(["Animals", "Deer", "Watercolor", "Cute"]) },
    },
  });

  const art7 = await prisma.work.create({
    data: {
      slug: "art-7",
      title: "URBAN PULSE",
      description: "都市のエネルギーをグラフィティスタイルで表現。ビビッドなカラーパレットが目を引く。",
      coverImageUrl: "https://picsum.photos/seed/art7/800/600",
      status: "public",
      likesCount: 156,
      commentsCount: 7,
      artistProfileId: artist4.id,
      license: {
        create: {
          commercial: "consult",
          adult: "consult",
          trainingType: "standard",
          redistribution: "consult",
          priceJpy: 3500,
        },
      },
      tags: { connect: connectTags(["Street Art", "Graffiti", "Urban", "Bold"]) },
    },
  });

  const art8 = await prisma.work.create({
    data: {
      slug: "art-8",
      title: "POP EXPLOSION",
      description: "ポップアートとストリートカルチャーの融合。鮮やかな色彩とダイナミックな構図。",
      coverImageUrl: "https://picsum.photos/seed/art8/800/600",
      status: "public",
      likesCount: 203,
      commentsCount: 11,
      artistProfileId: artist4.id,
      license: {
        create: {
          commercial: "consult",
          adult: "allowed",
          trainingType: "light",
          redistribution: "consult",
          priceJpy: 4000,
        },
      },
      tags: { connect: connectTags(["Pop Art", "Street Art", "Colorful", "Dynamic"]) },
    },
  });

  const art9 = await prisma.work.create({
    data: {
      slug: "art-9",
      title: "魔法少女ルナ",
      description: "オリジナルキャラクター「ルナ」の全身イラスト。月をモチーフにした魔法少女デザイン。",
      coverImageUrl: "https://picsum.photos/seed/art9/800/600",
      status: "public",
      likesCount: 498,
      commentsCount: 27,
      artistProfileId: artist5.id,
      license: {
        create: {
          commercial: "allowed",
          adult: "allowed",
          trainingType: "strong",
          redistribution: "allowed",
          priceJpy: 2800,
        },
      },
      tags: { connect: connectTags(["Anime", "Character", "Magical Girl", "Original"]) },
    },
  });

  const art10 = await prisma.work.create({
    data: {
      slug: "art-10",
      title: "放課後の約束",
      description: "学園ラブコメ風の一枚絵。夕焼けの屋上で交わされる約束のシーン。",
      coverImageUrl: "https://picsum.photos/seed/art10/800/600",
      status: "public",
      likesCount: 345,
      commentsCount: 18,
      artistProfileId: artist5.id,
      license: {
        create: {
          commercial: "allowed",
          adult: "allowed",
          trainingType: "strong",
          redistribution: "allowed",
          priceJpy: 2200,
        },
      },
      tags: { connect: connectTags(["Anime", "School", "Romance", "Sunset"]) },
    },
  });

  const art11 = await prisma.work.create({
    data: {
      slug: "art-11",
      title: "Fractal Bloom",
      description: "フラクタル幾何学を用いたジェネラティブアート。有機的なパターンが花のように広がる。",
      coverImageUrl: "https://picsum.photos/seed/art11/800/600",
      status: "public",
      likesCount: 89,
      commentsCount: 3,
      artistProfileId: artist6.id,
      license: {
        create: {
          commercial: "denied",
          adult: "denied",
          trainingType: "light",
          redistribution: "denied",
          priceJpy: 6000,
        },
      },
      tags: { connect: connectTags(["Abstract", "Generative", "Fractal", "Digital"]) },
    },
  });

  const art12 = await prisma.work.create({
    data: {
      slug: "art-12",
      title: "Entropy Wave",
      description: "エントロピーの概念を視覚化した抽象作品。秩序と混沌の境界を表現。",
      coverImageUrl: "https://picsum.photos/seed/art12/800/600",
      status: "public",
      likesCount: 134,
      commentsCount: 5,
      artistProfileId: artist6.id,
      license: {
        create: {
          commercial: "denied",
          adult: "denied",
          trainingType: "light",
          redistribution: "denied",
          priceJpy: 5500,
        },
      },
      tags: { connect: connectTags(["Abstract", "Generative", "Entropy", "Waves"]) },
    },
  });

  // ─── Dashboard extra works (9, art-13 to art-21) ─────────────────────────────
  const art13 = await prisma.work.create({
    data: {
      slug: "art-13",
      title: "月光の庭園",
      description: "月の光に照らされた神秘的な庭園。静寂と美しさが共存する幻想的な風景。",
      coverImageUrl: "https://picsum.photos/seed/dw3/800/600",
      status: "private",
      likesCount: 0,
      commentsCount: 0,
      artistProfileId: artist1.id,
      license: {
        create: {
          commercial: "denied",
          adult: "denied",
          trainingType: "light",
          redistribution: "denied",
          priceJpy: 3000,
        },
      },
      tags: { connect: connectTags(["Fantasy", "Landscape"]) },
    },
  });

  const art14 = await prisma.work.create({
    data: {
      slug: "art-14",
      title: "星降る夜の街",
      description: "夜空から降り注ぐ星々が街を包む幻想的な都市風景。",
      coverImageUrl: "https://picsum.photos/seed/dw4/800/600",
      status: "draft",
      likesCount: 0,
      commentsCount: 0,
      artistProfileId: artist1.id,
      license: {
        create: {
          commercial: "consult",
          adult: "denied",
          trainingType: "standard",
          redistribution: "consult",
          priceJpy: 3500,
        },
      },
      tags: { connect: connectTags(["Fantasy", "City"]) },
    },
  });

  const art15 = await prisma.work.create({
    data: {
      slug: "art-15",
      title: "天空の渡り鳥",
      description: "広大な空を渡る鳥たちの群れ。自由と旅立ちをテーマにした壮大な風景画。",
      coverImageUrl: "https://picsum.photos/seed/dw5/800/600",
      status: "public",
      likesCount: 156,
      commentsCount: 5,
      artistProfileId: artist1.id,
      license: {
        create: {
          commercial: "allowed",
          adult: "denied",
          trainingType: "light",
          redistribution: "allowed",
          priceJpy: 2500,
        },
      },
      tags: { connect: connectTags(["Nature", "Landscape"]) },
    },
  });

  const art16 = await prisma.work.create({
    data: {
      slug: "art-16",
      title: "古代遺跡の守護者",
      description: "古代遺跡を守る巨大な石像。時の流れを超えた壮大なスケール感。",
      coverImageUrl: "https://picsum.photos/seed/dw6/800/600",
      status: "public",
      likesCount: 98,
      commentsCount: 3,
      artistProfileId: artist1.id,
      license: {
        create: {
          commercial: "consult",
          adult: "denied",
          trainingType: "light",
          redistribution: "denied",
          priceJpy: 4000,
        },
      },
      tags: { connect: connectTags(["Fantasy", "Character"]) },
    },
  });

  const art17 = await prisma.work.create({
    data: {
      slug: "art-17",
      title: "水底の神殿（WIP）",
      description: "水中に沈んだ神殿の制作途中作品。完成時には壮大な水中世界が広がる予定。",
      coverImageUrl: "https://picsum.photos/seed/dw7/800/600",
      status: "draft",
      likesCount: 0,
      commentsCount: 0,
      artistProfileId: artist1.id,
      license: {
        create: {
          commercial: "consult",
          adult: "denied",
          trainingType: "light",
          redistribution: "denied",
          priceJpy: 3000,
        },
      },
      tags: { connect: connectTags(["Fantasy"]) },
    },
  });

  const art18 = await prisma.work.create({
    data: {
      slug: "art-18",
      title: "夏祭りの夜",
      description: "夏祭りの賑やかな夜を描いたイラスト。提灯の明かりと花火が夜空を彩る。",
      coverImageUrl: "https://picsum.photos/seed/dw10/800/600",
      status: "public",
      likesCount: 267,
      commentsCount: 10,
      artistProfileId: artist5.id,
      license: {
        create: {
          commercial: "allowed",
          adult: "denied",
          trainingType: "standard",
          redistribution: "allowed",
          priceJpy: 2500,
        },
      },
      tags: { connect: connectTags(["Anime", "Original"]) },
    },
  });

  const art19 = await prisma.work.create({
    data: {
      slug: "art-19",
      title: "新キャラ設定画",
      description: "新しいオリジナルキャラクターの設定画。表情差分やポーズバリエーションを含む。",
      coverImageUrl: "https://picsum.photos/seed/dw11/800/600",
      status: "draft",
      likesCount: 0,
      commentsCount: 0,
      artistProfileId: artist5.id,
      license: {
        create: {
          commercial: "allowed",
          adult: "allowed",
          trainingType: "strong",
          redistribution: "allowed",
          priceJpy: 3000,
        },
      },
      tags: { connect: connectTags(["Anime", "Character Design"]) },
    },
  });

  const art20 = await prisma.work.create({
    data: {
      slug: "art-20",
      title: "冬のイルミネーション",
      description: "冬の夜を彩るイルミネーションの風景。温かい光が寒い夜を包む。",
      coverImageUrl: "https://picsum.photos/seed/dw12/800/600",
      status: "private",
      likesCount: 0,
      commentsCount: 0,
      artistProfileId: artist5.id,
      license: {
        create: {
          commercial: "consult",
          adult: "denied",
          trainingType: "light",
          redistribution: "denied",
          priceJpy: 2000,
        },
      },
      tags: { connect: connectTags(["Anime", "Landscape"]) },
    },
  });

  const art21 = await prisma.work.create({
    data: {
      slug: "art-21",
      title: "桜並木の散歩道",
      description: "桜並木が続く散歩道を描いたイラスト。春の穏やかな空気感を表現。",
      coverImageUrl: "https://picsum.photos/seed/dw13/800/600",
      status: "public",
      likesCount: 189,
      commentsCount: 7,
      artistProfileId: artist5.id,
      license: {
        create: {
          commercial: "allowed",
          adult: "denied",
          trainingType: "standard",
          redistribution: "allowed",
          priceJpy: 2200,
        },
      },
      tags: { connect: connectTags(["Anime", "Cherry Blossom", "Nature"]) },
    },
  });

  // ─── Acquisitions (9) ────────────────────────────────────────────────────────
  // Helper to get license snapshot from a work
  async function getLicenseSnapshot(workId: string) {
    const license = await prisma.license.findUnique({ where: { workId } });
    if (!license) return {};
    return {
      commercial: license.commercial,
      adult: license.adult,
      trainingType: license.trainingType,
      redistribution: license.redistribution,
    };
  }

  // user-3 (Dev Studio) acquisitions: acq-1 to acq-4
  await prisma.acquisition.create({
    data: {
      developerProfileId: devProfile1.id,
      workId: art3.id,
      priceJpy: 5000,
      licenseSnapshot: await getLicenseSnapshot(art3.id),
      acquiredAt: new Date("2025-11-15"),
    },
  });
  await prisma.acquisition.create({
    data: {
      developerProfileId: devProfile1.id,
      workId: art5.id,
      priceJpy: 2000,
      licenseSnapshot: await getLicenseSnapshot(art5.id),
      acquiredAt: new Date("2025-11-20"),
    },
  });
  await prisma.acquisition.create({
    data: {
      developerProfileId: devProfile1.id,
      workId: art7.id,
      priceJpy: 3500,
      licenseSnapshot: await getLicenseSnapshot(art7.id),
      acquiredAt: new Date("2025-12-01"),
    },
  });
  await prisma.acquisition.create({
    data: {
      developerProfileId: devProfile1.id,
      workId: art9.id,
      priceJpy: 2800,
      licenseSnapshot: await getLicenseSnapshot(art9.id),
      acquiredAt: new Date("2025-12-10"),
    },
  });

  // user-4 (Sakura Ito / Sakura Creative) acquisitions: acq-5 to acq-9
  await prisma.acquisition.create({
    data: {
      developerProfileId: devProfile2.id,
      workId: art4.id,
      priceJpy: 4500,
      licenseSnapshot: await getLicenseSnapshot(art4.id),
      acquiredAt: new Date("2025-10-05"),
    },
  });
  await prisma.acquisition.create({
    data: {
      developerProfileId: devProfile2.id,
      workId: art6.id,
      priceJpy: 1800,
      licenseSnapshot: await getLicenseSnapshot(art6.id),
      acquiredAt: new Date("2025-10-20"),
    },
  });
  await prisma.acquisition.create({
    data: {
      developerProfileId: devProfile2.id,
      workId: art11.id,
      priceJpy: 6000,
      licenseSnapshot: await getLicenseSnapshot(art11.id),
      acquiredAt: new Date("2025-11-10"),
    },
  });
  await prisma.acquisition.create({
    data: {
      developerProfileId: devProfile2.id,
      workId: art1.id,
      priceJpy: 3000,
      licenseSnapshot: await getLicenseSnapshot(art1.id),
      acquiredAt: new Date("2025-12-05"),
    },
  });
  await prisma.acquisition.create({
    data: {
      developerProfileId: devProfile2.id,
      workId: art8.id,
      priceJpy: 4000,
      licenseSnapshot: await getLicenseSnapshot(art8.id),
      acquiredAt: new Date("2025-12-15"),
    },
  });

  // Suppress unused variable warnings
  void user1;
  void art2;
  void art10;
  void art12;
  void art13;
  void art14;
  void art15;
  void art16;
  void art17;
  void art18;
  void art19;
  void art20;
  void art21;

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
