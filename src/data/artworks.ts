export interface ArtworkQuestionOption {
  id: string
  text: string
}

export interface ArtworkQuestion {
  prompt: string
  options: readonly [
    ArtworkQuestionOption,
    ArtworkQuestionOption,
    ArtworkQuestionOption,
    ArtworkQuestionOption
  ]
  correctOptionId: string
}

export type ArtworkCategory =
  | 'Portrætter'
  | 'Skulpturer og statuer'
  | 'Landskaber og steder'
  | 'Dyr'

export interface Artwork {
  id: string
  objectNumber: string
  title: string
  artist: string
  productionPeriod: string
  category: ArtworkCategory
  clue: string
  imageUrl: string
  imageAlt: string
  artworkSourceUrl: string
  metadataSourceUrl: string
  imageSourceUrl: string
  imageRights: {
    label: string
    url: string
    attribution: string
  }
  question: ArtworkQuestion
}

const publicDomainRights = {
  label: 'Public Domain Mark 1.0',
  url: 'https://creativecommons.org/publicdomain/mark/1.0/',
  attribution: 'SMK – Statens Museum for Kunst'
}

export const artworks = [
  {
    id: 'KKSgb16521',
    objectNumber: 'KKSgb16521',
    title: 'En sommerfugl',
    artist: 'Pieter Holsteyn (I)',
    productionPeriod: '1600–1700',
    category: 'Dyr',
    clue: 'SMK beskriver værket som både en akvarel og en tegning.',
    imageUrl: '/images/kksgb16521.jpg',
    imageAlt: 'En sommerfugl af Pieter Holsteyn (I)',
    artworkSourceUrl: 'https://open.smk.dk/artwork/image/KKSgb16521',
    metadataSourceUrl: 'https://api.smk.dk/api/v1/art?object_number=KKSgb16521',
    imageSourceUrl:
      'https://iip-thumb.smk.dk/iiif/jp2/h415pg326_kksgb16521.tif.jp2/full/!1024,/0/default.jpg',
    imageRights: publicDomainRights,
    question: {
      prompt: 'Hvem er angivet som kunstner på værket?',
      options: [
        { id: 'pieter-holsteyn', text: 'Pieter Holsteyn (I)' },
        { id: 'andre-derain', text: 'André Derain' },
        { id: 'ps-kroyer', text: 'P.S. Krøyer' },
        { id: 'martinus-rorbye', text: 'Martinus Rørbye' }
      ],
      correctOptionId: 'pieter-holsteyn'
    }
  },
  {
    id: 'KMSr14',
    objectNumber: 'KMSr14',
    title: 'Kvinde i chemise',
    artist: 'André Derain',
    productionPeriod: '1906',
    category: 'Portrætter',
    clue: 'SMK fremhæver værket som et hovedværk fra Derains fauvistiske periode.',
    imageUrl: '/images/kmsr14.jpg',
    imageAlt: 'Kvinde i chemise af André Derain',
    artworkSourceUrl: 'https://open.smk.dk/artwork/image/KMSr14',
    metadataSourceUrl: 'https://api.smk.dk/api/v1/art?object_number=KMSr14',
    imageSourceUrl:
      'https://iip-thumb.smk.dk/iiif/jp2/cj82kb35p_KMSr14.tif.reconstructed.tif.jp2/full/!1024,/0/default.jpg',
    imageRights: publicDomainRights,
    question: {
      prompt: 'Hvilket år er værket dateret til?',
      options: [
        { id: '1904', text: '1904' },
        { id: '1906', text: '1906' },
        { id: '1908', text: '1908' },
        { id: '1910', text: '1910' }
      ],
      correctOptionId: '1906'
    }
  },
  {
    id: 'KMS3605',
    objectNumber: 'KMS3605',
    title: 'Fra Burmeister & Wains jernstøberi',
    artist: 'P.S. Krøyer',
    productionPeriod: '1885',
    category: 'Landskaber og steder',
    clue: 'Titlen nævner det jernstøberi, som værket skildrer.',
    imageUrl: '/images/kms3605.jpg',
    imageAlt: 'Fra Burmeister & Wains jernstøberi af P.S. Krøyer',
    artworkSourceUrl: 'https://open.smk.dk/artwork/image/KMS3605',
    metadataSourceUrl: 'https://api.smk.dk/api/v1/art?object_number=KMS3605',
    imageSourceUrl:
      'https://iip-thumb.smk.dk/iiif/jp2/jq085p34x_KMS3605.tif.reconstructed.tif.jp2/full/!1024,/0/default.jpg',
    imageRights: publicDomainRights,
    question: {
      prompt: 'Hvilket sted er nævnt i værkets titel?',
      options: [
        { id: 'akropolis', text: 'Athenatemplet på Akropolis' },
        { id: 'palazzo-corsini', text: 'Palazzo Corsini' },
        {
          id: 'burmeister-wain',
          text: 'Burmeister & Wains jernstøberi'
        },
        { id: 'le-rat-mort', text: 'Le Rat Mort' }
      ],
      correctOptionId: 'burmeister-wain'
    }
  },
  {
    id: 'KMS3769',
    objectNumber: 'KMS3769',
    title: 'Udsigt fra Athenatemplet på Akropolis',
    artist: 'Martinus Rørbye',
    productionPeriod: '1844',
    category: 'Landskaber og steder',
    clue: 'Titlen nævner Athen og Akropolis.',
    imageUrl: '/images/kms3769.jpg',
    imageAlt: 'Udsigt fra Athenatemplet på Akropolis af Martinus Rørbye',
    artworkSourceUrl: 'https://open.smk.dk/artwork/image/KMS3769',
    metadataSourceUrl: 'https://api.smk.dk/api/v1/art?object_number=KMS3769',
    imageSourceUrl:
      'https://iip-thumb.smk.dk/iiif/jp2/w0892f396_KMSKMS3769-cropped.tif.jp2/full/!1024,/0/default.jpg',
    imageRights: publicDomainRights,
    question: {
      prompt: 'Hvilket år er værket dateret til?',
      options: [
        { id: '1834', text: '1834' },
        { id: '1840', text: '1840' },
        { id: '1844', text: '1844' },
        { id: '1848', text: '1848' }
      ],
      correctOptionId: '1844'
    }
  },
  {
    id: 'KMS7961',
    objectNumber: 'KMS7961',
    title: 'Dronning Kristina i Palazzo Corsini',
    artist: 'Kristian Zahrtmann',
    productionPeriod: '1908',
    category: 'Portrætter',
    clue: 'SMK beskriver motivet som den svenske, abdicerede dronning Christina.',
    imageUrl: '/images/kms7961.jpg',
    imageAlt: 'Dronning Kristina i Palazzo Corsini af Kristian Zahrtmann',
    artworkSourceUrl: 'https://open.smk.dk/artwork/image/KMS7961',
    metadataSourceUrl: 'https://api.smk.dk/api/v1/art?object_number=KMS7961',
    imageSourceUrl:
      'https://api.smk.dk/api/v1/thumbnail/36f8be03-6328-4078-8469-f5f0b4bb6769.jpg',
    imageRights: publicDomainRights,
    question: {
      prompt: 'Hvilket år er værket dateret til?',
      options: [
        { id: '1844', text: '1844' },
        { id: '1885', text: '1885' },
        { id: '1906', text: '1906' },
        { id: '1908', text: '1908' }
      ],
      correctOptionId: '1908'
    }
  },
  {
    id: 'DEP44',
    objectNumber: 'DEP44',
    title: 'Buste af Camilla Barbadori (død 1609). Moder til Pave Urban VIII Barberini',
    artist: 'Giovanni Lorenzo Bernini',
    productionPeriod: '1619',
    category: 'Skulpturer og statuer',
    clue: 'SMK beskriver værket som en portrætbuste af Camilla Barbadori.',
    imageUrl: '/images/dep44.jpg',
    imageAlt: 'Buste af Camilla Barbadori af Giovanni Lorenzo Bernini',
    artworkSourceUrl: 'https://open.smk.dk/artwork/image/DEP44',
    metadataSourceUrl: 'https://api.smk.dk/api/v1/art?object_number=DEP44',
    imageSourceUrl:
      'https://iip-thumb.smk.dk/iiif/jp2/gx41mn78t_dep44.tif.jp2/full/!1024,/0/default.jpg',
    imageRights: publicDomainRights,
    question: {
      prompt: 'Hvem skabte busten af Camilla Barbadori?',
      options: [
        { id: 'bernin', text: 'Giovanni Lorenzo Bernini' },
        { id: 'thorvaldsen', text: 'Bertel Thorvaldsen' },
        { id: 'tegner', text: 'Rudolph Tegner' },
        { id: 'carl-nielsen', text: 'Anne Marie Carl Nielsen' }
      ],
      correctOptionId: 'bernin'
    }
  },
  {
    id: 'KMS5781',
    objectNumber: 'KMS5781',
    title: 'Havfrue',
    artist: 'Anne Marie Carl Nielsen',
    productionPeriod: '1921',
    category: 'Skulpturer og statuer',
    clue: 'SMK registrerer værket som en statue udført i bronze.',
    imageUrl: '/images/kms5781.jpg',
    imageAlt: 'Bronzestatue af en havfrue af Anne Marie Carl Nielsen',
    artworkSourceUrl: 'https://open.smk.dk/artwork/image/KMS5781',
    metadataSourceUrl: 'https://api.smk.dk/api/v1/art?object_number=KMS5781',
    imageSourceUrl:
      'https://iip-thumb.smk.dk/iiif/jp2/0v838389c_KMS5781_-_.tif.reconstructed.tif.jp2/full/!1024,/0/default.jpg',
    imageRights: publicDomainRights,
    question: {
      prompt: 'Hvilket materiale er SMK’s statue registreret som udført i?',
      options: [
        { id: 'bronze', text: 'Bronze' },
        { id: 'marmor', text: 'Marmor' },
        { id: 'gips', text: 'Gips' },
        { id: 'trae', text: 'Træ' }
      ],
      correctOptionId: 'bronze'
    }
  },
  {
    id: 'KMS5680',
    objectNumber: 'KMS5680',
    title: 'Den lyrespillende Amor',
    artist: 'Bertel Thorvaldsen',
    productionPeriod: '1817–1821',
    category: 'Skulpturer og statuer',
    clue: 'Værkets titel fortæller, hvilket instrument Amor spiller på.',
    imageUrl: '/images/kms5680.jpg',
    imageAlt: 'Den lyrespillende Amor af Bertel Thorvaldsen',
    artworkSourceUrl: 'https://open.smk.dk/artwork/image/KMS5680',
    metadataSourceUrl: 'https://api.smk.dk/api/v1/art?object_number=KMS5680',
    imageSourceUrl:
      'https://iip-thumb.smk.dk/iiif/jp2/76537586d_KMS5680.tif.jp2/full/!1024,/0/default.jpg',
    imageRights: publicDomainRights,
    question: {
      prompt: 'Hvilket instrument spiller Amor ifølge titlen?',
      options: [
        { id: 'lyre', text: 'Lyre' },
        { id: 'harpe', text: 'Harpe' },
        { id: 'flojte', text: 'Fløjte' },
        { id: 'luth', text: 'Lut' }
      ],
      correctOptionId: 'lyre'
    }
  },
  {
    id: 'KMS5415',
    objectNumber: 'KMS5415',
    title: 'Gravmæle over kunstnerens moder, Signe Tegner. Stående sørgende kvinde set fra ryggen',
    artist: 'Rudolph Tegner',
    productionPeriod: '1899',
    category: 'Skulpturer og statuer',
    clue: 'SMK beskriver værket som et gravmæle over kunstnerens mor.',
    imageUrl: '/images/kms5415.jpg',
    imageAlt: 'Stående sørgende kvinde, relief af Rudolph Tegner',
    artworkSourceUrl: 'https://open.smk.dk/artwork/image/KMS5415',
    metadataSourceUrl: 'https://api.smk.dk/api/v1/art?object_number=KMS5415',
    imageSourceUrl:
      'https://iip-thumb.smk.dk/iiif/jp2/6m311s46f_KMS5415-1.TIF.reconstructed.tif.jp2/full/!1024,/0/default.jpg',
    imageRights: publicDomainRights,
    question: {
      prompt: 'Hvem er gravmælet tilegnet?',
      options: [
        { id: 'signe-tegner', text: 'Signe Tegner' },
        { id: 'camilla-barbadori', text: 'Camilla Barbadori' },
        { id: 'christian-ii', text: 'Christian II' },
        { id: 'camilla-nielsen', text: 'Anne Marie Carl Nielsen' }
      ],
      correctOptionId: 'signe-tegner'
    }
  },
  {
    id: 'KMSsp146',
    objectNumber: 'KMSsp146',
    title: 'Mandsportræt',
    artist: 'El Greco',
    productionPeriod: '1570–1575',
    category: 'Portrætter',
    clue: 'SMK’s titel beskriver motivet som et portræt af en mand.',
    imageUrl: '/images/kmssp146.jpg',
    imageAlt: 'Mandsportræt, maleri tilskrevet El Greco',
    artworkSourceUrl: 'https://open.smk.dk/artwork/image/KMSsp146',
    metadataSourceUrl: 'https://api.smk.dk/api/v1/art?object_number=KMSsp146',
    imageSourceUrl:
      'https://iip-thumb.smk.dk/iiif/jp2/6t053k067_KMSKMSsp146.tif.reconstructed.tif.jp2/full/!1024,/0/default.jpg',
    imageRights: publicDomainRights,
    question: {
      prompt: 'Hvad beskriver SMK’s titel som motivet?',
      options: [
        { id: 'mandsportraet', text: 'Et mandsportræt' },
        { id: 'havfrue', text: 'En havfrue' },
        { id: 'landskab', text: 'Et landskab' },
        { id: 'hestekobbel', text: 'Et kobbel heste' }
      ],
      correctOptionId: 'mandsportraet'
    }
  },
  {
    id: 'KMSsp789',
    objectNumber: 'KMSsp789',
    title: 'Portræt af Christian II (1481-1559)',
    artist: 'Michiel Sittow',
    productionPeriod: '1514–1515',
    category: 'Portrætter',
    clue: 'SMK’s titel navngiver den portrætterede danske konge.',
    imageUrl: '/images/kmssp789.jpg',
    imageAlt: 'Portræt af Christian II af Michiel Sittow',
    artworkSourceUrl: 'https://open.smk.dk/artwork/image/KMSsp789',
    metadataSourceUrl: 'https://api.smk.dk/api/v1/art?object_number=KMSsp789',
    imageSourceUrl:
      'https://iip-thumb.smk.dk/iiif/jp2/6108vf877_KMSsp789.tif.reconstructed.tif.jp2/full/!1024,/0/default.jpg',
    imageRights: publicDomainRights,
    question: {
      prompt: 'Hvem er portrætteret i værket?',
      options: [
        { id: 'christian-ii', text: 'Christian II' },
        { id: 'urban-viii', text: 'Urban VIII' },
        { id: 'andrea-palladio', text: 'Andrea Palladio' },
        { id: 'el-greco', text: 'El Greco' }
      ],
      correctOptionId: 'christian-ii'
    }
  },
  {
    id: 'KMS445',
    objectNumber: 'KMS445',
    title: 'Motiv fra Capri, kort efter solens opgang',
    artist: 'Christen Købke',
    productionPeriod: '1841–1843',
    category: 'Landskaber og steder',
    clue: 'Titlen angiver, at motivet er fra en italiensk ø.',
    imageUrl: '/images/kms445.jpg',
    imageAlt: 'Landskab på Capri af Christen Købke',
    artworkSourceUrl: 'https://open.smk.dk/artwork/image/KMS445',
    metadataSourceUrl: 'https://api.smk.dk/api/v1/art?object_number=KMS445',
    imageSourceUrl:
      'https://iip-thumb.smk.dk/iiif/jp2/cj82kb687_kms445.tif.jp2/full/!1024,/0/default.jpg',
    imageRights: publicDomainRights,
    question: {
      prompt: 'Hvilket sted er nævnt i værkets titel?',
      options: [
        { id: 'capri', text: 'Capri' },
        { id: 'norrebro', text: 'Nørrebro' },
        { id: 'vejby', text: 'Vejby' },
        { id: 'akropolis', text: 'Akropolis' }
      ],
      correctOptionId: 'capri'
    }
  },
  {
    id: 'KMS7385',
    objectNumber: 'KMS7385',
    title: 'Udsigt fra Dosseringen ved Sortedamssøen mod Nørrebro. Studie',
    artist: 'Christen Købke',
    productionPeriod: '1836–1840',
    category: 'Landskaber og steder',
    clue: 'Titlen angiver, at udsigten går mod Nørrebro.',
    imageUrl: '/images/kms7385.jpg',
    imageAlt: 'Studie af udsigt ved Sortedamssøen mod Nørrebro af Christen Købke',
    artworkSourceUrl: 'https://open.smk.dk/artwork/image/KMS7385',
    metadataSourceUrl: 'https://api.smk.dk/api/v1/art?object_number=KMS7385',
    imageSourceUrl:
      'https://iip-thumb.smk.dk/iiif/jp2/1831cn901_KMS7385.tif.reconstructed.tif.jp2/full/!1024,/0/default.jpg',
    imageRights: publicDomainRights,
    question: {
      prompt: 'Hvilken bydel nævner titlen, at udsigten vender mod?',
      options: [
        { id: 'norrebro', text: 'Nørrebro' },
        { id: 'vejby', text: 'Vejby' },
        { id: 'capri', text: 'Capri' },
        { id: 'athen', text: 'Athen' }
      ],
      correctOptionId: 'norrebro'
    }
  },
  {
    id: 'DEP565',
    objectNumber: 'DEP565',
    title: 'Et kobbel heste uden for en kro',
    artist: 'Otto Bache',
    productionPeriod: '1878',
    category: 'Dyr',
    clue: 'Titlen fortæller, hvilke dyr der står uden for kroen.',
    imageUrl: '/images/dep565.jpg',
    imageAlt: 'Et kobbel heste uden for en kro af Otto Bache',
    artworkSourceUrl: 'https://open.smk.dk/artwork/image/DEP565',
    metadataSourceUrl: 'https://api.smk.dk/api/v1/art?object_number=DEP565',
    imageSourceUrl:
      'https://iip-thumb.smk.dk/iiif/jp2/j098zf666_DEP565.tif.jp2/full/!1024,/0/default.jpg',
    imageRights: publicDomainRights,
    question: {
      prompt: 'Hvilke dyr nævner titlen?',
      options: [
        { id: 'heste', text: 'Heste' },
        { id: 'sommerfugle', text: 'Sommerfugle' },
        { id: 'kvaeg', text: 'Køer' },
        { id: 'hunde', text: 'Hunde' }
      ],
      correctOptionId: 'heste'
    }
  },
  {
    id: 'KMS446',
    objectNumber: 'KMS446',
    title: 'En kostald i en bondegård. Vejby',
    artist: 'Johan Thomas Lundbye',
    productionPeriod: '1844',
    category: 'Dyr',
    clue: 'SMK’s værkbeskrivelse viser køer i en kostald.',
    imageUrl: '/images/kms446.jpg',
    imageAlt: 'Køer i en kostald i Vejby af Johan Thomas Lundbye',
    artworkSourceUrl: 'https://open.smk.dk/artwork/image/KMS446',
    metadataSourceUrl: 'https://api.smk.dk/api/v1/art?object_number=KMS446',
    imageSourceUrl:
      'https://iip-thumb.smk.dk/iiif/jp2/4m90dz59v_KMS446.tif.reconstructed.tif.jp2/full/!1024,/0/default.jpg',
    imageRights: publicDomainRights,
    question: {
      prompt: 'Hvilke dyr ses i kostalden?',
      options: [
        { id: 'koeer', text: 'Køer' },
        { id: 'heste', text: 'Heste' },
        { id: 'faar', text: 'Får' },
        { id: 'geder', text: 'Geder' }
      ],
      correctOptionId: 'koeer'
    }
  }
] satisfies readonly Artwork[]
