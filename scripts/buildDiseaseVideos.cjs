const fs = require('fs');
const path = require('path');

const diseaseCategories = [
  {
    category: 'Infectious Diseases',
    diseases: [
      'Malaria', 'Tuberculosis', 'HIV/AIDS', 'Cholera', 'Typhoid Fever', 'Influenza', 'COVID-19',
      'Measles', 'Mumps', 'Rubella', 'Chickenpox', 'Smallpox', 'Polio', 'Rabies', 'Ebola',
      'Marburg Virus Disease', 'Dengue Fever', 'Yellow Fever', 'Zika Virus', 'Hepatitis A',
      'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Meningitis', 'Pneumonia',
      'Bronchitis', 'Whooping Cough', 'Diphtheria', 'Tetanus', 'Leprosy', 'Plague', 'Anthrax',
      'Lyme Disease', 'Syphilis', 'Gonorrhea', 'Chlamydia', 'Herpes Simplex', 'HPV',
      'Schistosomiasis', 'Trypanosomiasis', 'Leishmaniasis', 'Onchocerciasis', 'Lymphatic Filariasis',
      'Chikungunya', 'West Nile Virus', 'MERS', 'SARS', 'Norovirus', 'Rotavirus',
      'Toxoplasmosis', 'Giardiasis', 'Amoebiasis', 'Trichinosis', 'Scabies', 'Ringworm',
      "Athlete's Foot", 'Candidiasis', 'Aspergillosis', 'Cryptococcosis', 'Histoplasmosis'
    ]
  },
  {
    category: 'Cardiovascular Diseases',
    diseases: [
      'Hypertension', 'Coronary Artery Disease', 'Heart Failure', 'Arrhythmia', 'Atrial Fibrillation',
      'Myocardial Infarction', 'Stroke', 'Atherosclerosis', 'Peripheral Artery Disease', 'Cardiomyopathy',
      'Rheumatic Heart Disease', 'Congenital Heart Defects', 'Deep Vein Thrombosis', 'Pulmonary Embolism', 'Aneurysm'
    ]
  },
  {
    category: 'Respiratory Diseases',
    diseases: [
      'Asthma', 'Chronic Obstructive Pulmonary Disease', 'Emphysema', 'Pulmonary Fibrosis',
      'Sleep Apnea', 'Cystic Fibrosis', 'Sarcoidosis', 'Pleurisy', 'Silicosis', 'Pneumothorax'
    ]
  },
  {
    category: 'Endocrine and Metabolic Diseases',
    diseases: [
      'Type 1 Diabetes', 'Type 2 Diabetes', 'Hypothyroidism', 'Hyperthyroidism', "Cushing's Syndrome",
      "Addison's Disease", 'Polycystic Ovary Syndrome', 'Obesity', 'Metabolic Syndrome', 'Gout',
      'Osteoporosis', 'Rickets', 'Hyperlipidemia'
    ]
  },
  {
    category: 'Cancers',
    diseases: [
      'Lung Cancer', 'Breast Cancer', 'Prostate Cancer', 'Colorectal Cancer', 'Cervical Cancer',
      'Liver Cancer', 'Stomach Cancer', 'Pancreatic Cancer', 'Ovarian Cancer', 'Leukemia',
      "Hodgkin's Lymphoma", "Non-Hodgkin's Lymphoma", 'Melanoma', 'Skin Cancer', 'Brain Tumors',
      'Kidney Cancer', 'Bladder Cancer', 'Esophageal Cancer', 'Thyroid Cancer', 'Multiple Myeloma', 'Sarcoma'
    ]
  },
  {
    category: 'Neurological Diseases',
    diseases: [
      "Alzheimer's Disease", "Parkinson's Disease", 'Epilepsy', 'Multiple Sclerosis', 'Migraine',
      'ALS', "Huntington's Disease", "Bell's Palsy", 'Cerebral Palsy', 'Guillain-Barre Syndrome',
      'Neuropathy', 'Meningoencephalitis', 'Dementia'
    ]
  },
  {
    category: 'Mental Health Conditions',
    diseases: [
      'Depression', 'Anxiety Disorders', 'Bipolar Disorder', 'Schizophrenia',
      'Obsessive-Compulsive Disorder', 'Post-Traumatic Stress Disorder', 'Eating Disorders',
      'Autism Spectrum Disorder', 'ADHD', 'Personality Disorders'
    ]
  },
  {
    category: 'Gastrointestinal Diseases',
    diseases: [
      'Peptic Ulcer Disease', 'Gastroesophageal Reflux Disease', 'Irritable Bowel Syndrome',
      "Crohn's Disease", 'Ulcerative Colitis', 'Celiac Disease', 'Cirrhosis', 'Fatty Liver Disease',
      'Pancreatitis', 'Gallstones', 'Appendicitis', 'Hemorrhoids', 'Diverticulitis'
    ]
  },
  {
    category: 'Musculoskeletal Diseases',
    diseases: [
      'Osteoarthritis', 'Rheumatoid Arthritis', 'Lupus', 'Fibromyalgia', 'Ankylosing Spondylitis',
      'Muscular Dystrophy', 'Scoliosis', 'Sciatica', 'Tendinitis', 'Bursitis'
    ]
  },
  {
    category: 'Renal and Urinary Diseases',
    diseases: [
      'Chronic Kidney Disease', 'Kidney Stones', 'Urinary Tract Infection', 'Nephrotic Syndrome',
      'Polycystic Kidney Disease', 'Glomerulonephritis', 'Bladder Infections', 'Prostatitis'
    ]
  },
  {
    category: 'Genetic and Congenital Disorders',
    diseases: [
      'Down Syndrome', 'Sickle Cell Disease', 'Thalassemia', 'Hemophilia', 'Marfan Syndrome',
      'Fragile X Syndrome', 'Tay-Sachs Disease', 'Phenylketonuria', 'Turner Syndrome', 'Klinefelter Syndrome'
    ]
  },
  {
    category: 'Skin Diseases',
    diseases: [
      'Eczema', 'Psoriasis', 'Acne', 'Vitiligo', 'Rosacea', 'Dermatitis', 'Urticaria', 'Albinism', 'Lichen Planus'
    ]
  },
  {
    category: 'Eye and Ear Diseases',
    diseases: [
      'Cataracts', 'Glaucoma', 'Macular Degeneration', 'Conjunctivitis', 'Retinitis Pigmentosa',
      'Otitis Media', 'Tinnitus', "Meniere's Disease"
    ]
  },
  {
    category: 'Autoimmune Diseases',
    diseases: [
      "Hashimoto's Thyroiditis", "Graves' Disease", "Sjogren's Syndrome", 'Myasthenia Gravis'
    ]
  },
  {
    category: 'Nutritional Deficiency Diseases',
    diseases: [
      'Scurvy', 'Kwashiorkor', 'Marasmus', 'Beriberi', 'Pellagra', 'Anemia', 'Goiter', 'Night Blindness'
    ]
  }
];

function generateSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_+|_+$)/g, '');
}

function getRandomViews(i) {
  const base = 45 + ((i * 17) % 210);
  return `${base}K`;
}

function getRandomPublished(i) {
  const times = ['2 days ago', '4 days ago', '1 week ago', '2 weeks ago', '3 weeks ago', '1 month ago'];
  return times[i % times.length];
}

const allVideos = [];
let globalIndex = 0;

diseaseCategories.forEach((catObj) => {
  catObj.diseases.forEach((disease) => {
    globalIndex++;
    const slug = generateSlug(disease);
    const id = `dis_${slug}_${globalIndex}`;
    
    allVideos.push({
      id,
      title: `${disease}: Genesis & Comprehensive Medical Overview | K.I Ezra`,
      diseaseName: disease,
      category: catObj.category,
      summary: `Comprehensive medical masterclass and clinical presentation on ${disease}. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.`,
      videoDuration: '1:16',
      durationSeconds: 76,
      views: getRandomViews(globalIndex),
      publishedDate: getRandomPublished(globalIndex),
      channelName: 'VitaNova HealthTube • K.I Ezra',
      speakerName: 'K.I Ezra',
      speakerRole: 'Lead Health Visionary & Narrator',
      speakerAvatar: '/genesis_thumb.jpg',
      videoThumbnail: '/genesis_thumb.jpg',
      videoUrl: '/genesis_video.mp4',
      audioUrl: '/genesis_audio.mp3',
      levelOfCare: 'Primary to Tertiary Care',
      diseaseClass: catObj.category,
      clinicalGuideline: {
        caseDefinition: `Clinical presentation of ${disease} characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.`,
        diagnosticCriteria: [
          `Primary clinical evaluation and confirmation of ${disease} symptomatology`,
          `Pathological and physiological biomarker assessment`,
          `Risk stratification and early identification of complications`
        ],
        investigations: [
          `Targeted diagnostic blood tests and biochemical panels`,
          `Diagnostic imaging and physiological function testing`,
          `Specialized laboratory screening for ${disease}`
        ],
        firstLineMedicines: [
          `Evidence-based first-line pharmacological regimen for ${disease}`,
          `Symptomatic relief and maintenance stabilization therapy`,
          `Essential supportive care and electrolyte balance`
        ],
        treatmentProtocol: [
          `Immediate stabilization and acute intervention protocol`,
          `Structured pharmacological titration and patient monitoring`,
          `Ongoing clinical review and long-term care management`
        ],
        dangerSigns: [
          `Acute worsening of symptoms or hemodynamic instability`,
          `Severe organ dysfunction or compromised vital parameters`,
          `Failure to respond to initial therapeutic management`
        ],
        referralProtocol: `Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.`,
        preventionCounseling: [
          `Adherence to prescribed lifestyle modifications and therapy`,
          `Routine health check-ups and early biomarker screening`,
          `Patient and family education regarding warning signs`
        ]
      },
      videoSlides: [
        {
          title: `Introduction & Pathophysiology of ${disease}`,
          timing: '00:00 - 00:20',
          keyPoints: [
            `Core definition, biological mechanisms, and etiology of ${disease}`,
            `Understanding cellular, organ, and systemic manifestations`,
            `Global epidemiology and clinical risk factors`
          ],
          badge: 'Etiology & Basics'
        },
        {
          title: `Diagnostic Criteria & Clinical Signs`,
          timing: '00:21 - 00:40',
          keyPoints: [
            `Key hallmarks, presenting complaints, and physical findings`,
            `Confirmatory diagnostic testing and laboratory biomarkers`,
            `Differential diagnosis and secondary complications`
          ],
          badge: 'Clinical Assessment'
        },
        {
          title: `Management Protocol & First-Line Therapy`,
          timing: '00:41 - 00:58',
          keyPoints: [
            `Standard first-line pharmacotherapy and clinical interventions`,
            `Acute stabilization and maintenance regimens`,
            `Monitoring therapeutic response and adverse effects`
          ],
          badge: 'Treatment & Care'
        },
        {
          title: `Prevention, Red Flags & Referral Guidelines`,
          timing: '00:59 - 01:16',
          keyPoints: [
            `Crucial red flag danger signs requiring immediate referral`,
            `Preventive measures, lifestyle counseling, and patient support`,
            `Long-term prognosis and follow-up clinical strategy`
          ],
          badge: 'Safety & Follow-up'
        }
      ]
    });
  });
});

const tsContent = `export interface DiseaseVideoItem {
  id: string;
  title: string;
  diseaseName: string;
  category: string;
  summary: string;
  videoDuration: string;
  durationSeconds: number;
  views: string;
  publishedDate: string;
  channelName: string;
  speakerName: string;
  speakerRole: string;
  speakerAvatar: string;
  videoThumbnail: string;
  videoUrl: string;
  audioUrl: string;
  levelOfCare: string;
  diseaseClass: string;
  isDownloaded?: boolean;
  clinicalGuideline: {
    caseDefinition: string;
    diagnosticCriteria: string[];
    investigations: string[];
    firstLineMedicines: string[];
    treatmentProtocol: string[];
    dangerSigns: string[];
    referralProtocol: string;
    preventionCounseling: string[];
  };
  videoSlides: {
    title: string;
    timing: string;
    keyPoints: string[];
    badge: string;
  }[];
}

export const DISEASE_VIDEOS: DiseaseVideoItem[] = ${JSON.stringify(allVideos, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/diseaseVideos.ts'), tsContent, 'utf-8');
console.log(`Generated ${allVideos.length} disease videos in src/data/diseaseVideos.ts`);
