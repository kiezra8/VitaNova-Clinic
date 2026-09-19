export interface DiseaseVideoItem {
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

export const DISEASE_VIDEOS: DiseaseVideoItem[] = [
  {
    "id": "dis_malaria_1",
    "title": "Malaria: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Malaria",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Malaria. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "62K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Malaria characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Malaria symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Malaria"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Malaria",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Malaria",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Malaria",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_tuberculosis_2",
    "title": "Tuberculosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Tuberculosis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Tuberculosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "79K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Tuberculosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Tuberculosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Tuberculosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Tuberculosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Tuberculosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Tuberculosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_hiv_aids_3",
    "title": "HIV/AIDS: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "HIV/AIDS",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on HIV/AIDS. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "96K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of HIV/AIDS characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of HIV/AIDS symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for HIV/AIDS"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for HIV/AIDS",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of HIV/AIDS",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of HIV/AIDS",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_cholera_4",
    "title": "Cholera: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Cholera",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Cholera. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "113K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Cholera characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Cholera symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Cholera"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Cholera",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Cholera",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Cholera",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_typhoid_fever_5",
    "title": "Typhoid Fever: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Typhoid Fever",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Typhoid Fever. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "130K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Typhoid Fever characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Typhoid Fever symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Typhoid Fever"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Typhoid Fever",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Typhoid Fever",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Typhoid Fever",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_influenza_6",
    "title": "Influenza: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Influenza",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Influenza. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "147K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Influenza characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Influenza symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Influenza"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Influenza",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Influenza",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Influenza",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_covid_19_7",
    "title": "COVID-19: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "COVID-19",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on COVID-19. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "164K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of COVID-19 characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of COVID-19 symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for COVID-19"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for COVID-19",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of COVID-19",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of COVID-19",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_measles_8",
    "title": "Measles: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Measles",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Measles. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "181K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Measles characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Measles symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Measles"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Measles",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Measles",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Measles",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_mumps_9",
    "title": "Mumps: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Mumps",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Mumps. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "198K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Mumps characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Mumps symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Mumps"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Mumps",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Mumps",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Mumps",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_rubella_10",
    "title": "Rubella: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Rubella",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Rubella. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "215K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Rubella characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Rubella symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Rubella"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Rubella",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Rubella",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Rubella",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_chickenpox_11",
    "title": "Chickenpox: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Chickenpox",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Chickenpox. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "232K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Chickenpox characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Chickenpox symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Chickenpox"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Chickenpox",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Chickenpox",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Chickenpox",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_smallpox_12",
    "title": "Smallpox: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Smallpox",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Smallpox. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "249K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Smallpox characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Smallpox symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Smallpox"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Smallpox",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Smallpox",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Smallpox",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_polio_13",
    "title": "Polio: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Polio",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Polio. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "56K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Polio characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Polio symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Polio"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Polio",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Polio",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Polio",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_rabies_14",
    "title": "Rabies: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Rabies",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Rabies. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "73K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Rabies characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Rabies symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Rabies"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Rabies",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Rabies",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Rabies",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_ebola_15",
    "title": "Ebola: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Ebola",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Ebola. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "90K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Ebola characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Ebola symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Ebola"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Ebola",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Ebola",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Ebola",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_marburg_virus_disease_16",
    "title": "Marburg Virus Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Marburg Virus Disease",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Marburg Virus Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "107K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Marburg Virus Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Marburg Virus Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Marburg Virus Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Marburg Virus Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Marburg Virus Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Marburg Virus Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_dengue_fever_17",
    "title": "Dengue Fever: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Dengue Fever",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Dengue Fever. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "124K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Dengue Fever characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Dengue Fever symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Dengue Fever"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Dengue Fever",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Dengue Fever",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Dengue Fever",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_yellow_fever_18",
    "title": "Yellow Fever: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Yellow Fever",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Yellow Fever. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "141K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Yellow Fever characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Yellow Fever symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Yellow Fever"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Yellow Fever",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Yellow Fever",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Yellow Fever",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_zika_virus_19",
    "title": "Zika Virus: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Zika Virus",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Zika Virus. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "158K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Zika Virus characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Zika Virus symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Zika Virus"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Zika Virus",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Zika Virus",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Zika Virus",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_hepatitis_a_20",
    "title": "Hepatitis A: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Hepatitis A",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Hepatitis A. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "175K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Hepatitis A characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Hepatitis A symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Hepatitis A"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Hepatitis A",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Hepatitis A",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Hepatitis A",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_hepatitis_b_21",
    "title": "Hepatitis B: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Hepatitis B",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Hepatitis B. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "192K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Hepatitis B characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Hepatitis B symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Hepatitis B"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Hepatitis B",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Hepatitis B",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Hepatitis B",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_hepatitis_c_22",
    "title": "Hepatitis C: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Hepatitis C",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Hepatitis C. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "209K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Hepatitis C characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Hepatitis C symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Hepatitis C"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Hepatitis C",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Hepatitis C",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Hepatitis C",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_hepatitis_d_23",
    "title": "Hepatitis D: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Hepatitis D",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Hepatitis D. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "226K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Hepatitis D characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Hepatitis D symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Hepatitis D"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Hepatitis D",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Hepatitis D",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Hepatitis D",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_hepatitis_e_24",
    "title": "Hepatitis E: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Hepatitis E",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Hepatitis E. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "243K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Hepatitis E characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Hepatitis E symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Hepatitis E"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Hepatitis E",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Hepatitis E",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Hepatitis E",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_meningitis_25",
    "title": "Meningitis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Meningitis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Meningitis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "50K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Meningitis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Meningitis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Meningitis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Meningitis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Meningitis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Meningitis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_pneumonia_26",
    "title": "Pneumonia: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Pneumonia",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Pneumonia. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "67K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Pneumonia characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Pneumonia symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Pneumonia"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Pneumonia",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Pneumonia",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Pneumonia",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_bronchitis_27",
    "title": "Bronchitis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Bronchitis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Bronchitis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "84K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Bronchitis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Bronchitis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Bronchitis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Bronchitis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Bronchitis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Bronchitis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_whooping_cough_28",
    "title": "Whooping Cough: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Whooping Cough",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Whooping Cough. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "101K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Whooping Cough characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Whooping Cough symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Whooping Cough"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Whooping Cough",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Whooping Cough",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Whooping Cough",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_diphtheria_29",
    "title": "Diphtheria: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Diphtheria",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Diphtheria. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "118K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Diphtheria characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Diphtheria symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Diphtheria"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Diphtheria",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Diphtheria",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Diphtheria",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_tetanus_30",
    "title": "Tetanus: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Tetanus",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Tetanus. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "135K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Tetanus characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Tetanus symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Tetanus"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Tetanus",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Tetanus",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Tetanus",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_leprosy_31",
    "title": "Leprosy: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Leprosy",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Leprosy. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "152K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Leprosy characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Leprosy symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Leprosy"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Leprosy",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Leprosy",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Leprosy",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_plague_32",
    "title": "Plague: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Plague",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Plague. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "169K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Plague characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Plague symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Plague"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Plague",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Plague",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Plague",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_anthrax_33",
    "title": "Anthrax: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Anthrax",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Anthrax. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "186K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Anthrax characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Anthrax symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Anthrax"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Anthrax",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Anthrax",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Anthrax",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_lyme_disease_34",
    "title": "Lyme Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Lyme Disease",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Lyme Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "203K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Lyme Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Lyme Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Lyme Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Lyme Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Lyme Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Lyme Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_syphilis_35",
    "title": "Syphilis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Syphilis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Syphilis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "220K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Syphilis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Syphilis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Syphilis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Syphilis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Syphilis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Syphilis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_gonorrhea_36",
    "title": "Gonorrhea: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Gonorrhea",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Gonorrhea. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "237K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Gonorrhea characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Gonorrhea symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Gonorrhea"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Gonorrhea",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Gonorrhea",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Gonorrhea",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_chlamydia_37",
    "title": "Chlamydia: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Chlamydia",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Chlamydia. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "254K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Chlamydia characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Chlamydia symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Chlamydia"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Chlamydia",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Chlamydia",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Chlamydia",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_herpes_simplex_38",
    "title": "Herpes Simplex: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Herpes Simplex",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Herpes Simplex. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "61K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Herpes Simplex characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Herpes Simplex symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Herpes Simplex"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Herpes Simplex",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Herpes Simplex",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Herpes Simplex",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_hpv_39",
    "title": "HPV: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "HPV",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on HPV. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "78K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of HPV characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of HPV symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for HPV"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for HPV",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of HPV",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of HPV",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_schistosomiasis_40",
    "title": "Schistosomiasis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Schistosomiasis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Schistosomiasis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "95K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Schistosomiasis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Schistosomiasis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Schistosomiasis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Schistosomiasis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Schistosomiasis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Schistosomiasis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_trypanosomiasis_41",
    "title": "Trypanosomiasis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Trypanosomiasis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Trypanosomiasis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "112K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Trypanosomiasis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Trypanosomiasis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Trypanosomiasis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Trypanosomiasis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Trypanosomiasis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Trypanosomiasis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_leishmaniasis_42",
    "title": "Leishmaniasis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Leishmaniasis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Leishmaniasis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "129K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Leishmaniasis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Leishmaniasis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Leishmaniasis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Leishmaniasis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Leishmaniasis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Leishmaniasis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_onchocerciasis_43",
    "title": "Onchocerciasis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Onchocerciasis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Onchocerciasis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "146K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Onchocerciasis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Onchocerciasis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Onchocerciasis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Onchocerciasis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Onchocerciasis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Onchocerciasis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_lymphatic_filariasis_44",
    "title": "Lymphatic Filariasis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Lymphatic Filariasis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Lymphatic Filariasis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "163K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Lymphatic Filariasis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Lymphatic Filariasis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Lymphatic Filariasis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Lymphatic Filariasis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Lymphatic Filariasis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Lymphatic Filariasis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_chikungunya_45",
    "title": "Chikungunya: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Chikungunya",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Chikungunya. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "180K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Chikungunya characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Chikungunya symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Chikungunya"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Chikungunya",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Chikungunya",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Chikungunya",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_west_nile_virus_46",
    "title": "West Nile Virus: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "West Nile Virus",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on West Nile Virus. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "197K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of West Nile Virus characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of West Nile Virus symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for West Nile Virus"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for West Nile Virus",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of West Nile Virus",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of West Nile Virus",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_mers_47",
    "title": "MERS: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "MERS",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on MERS. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "214K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of MERS characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of MERS symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for MERS"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for MERS",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of MERS",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of MERS",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_sars_48",
    "title": "SARS: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "SARS",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on SARS. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "231K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of SARS characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of SARS symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for SARS"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for SARS",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of SARS",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of SARS",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_norovirus_49",
    "title": "Norovirus: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Norovirus",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Norovirus. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "248K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Norovirus characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Norovirus symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Norovirus"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Norovirus",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Norovirus",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Norovirus",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_rotavirus_50",
    "title": "Rotavirus: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Rotavirus",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Rotavirus. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "55K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Rotavirus characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Rotavirus symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Rotavirus"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Rotavirus",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Rotavirus",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Rotavirus",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_toxoplasmosis_51",
    "title": "Toxoplasmosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Toxoplasmosis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Toxoplasmosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "72K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Toxoplasmosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Toxoplasmosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Toxoplasmosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Toxoplasmosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Toxoplasmosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Toxoplasmosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_giardiasis_52",
    "title": "Giardiasis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Giardiasis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Giardiasis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "89K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Giardiasis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Giardiasis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Giardiasis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Giardiasis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Giardiasis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Giardiasis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_amoebiasis_53",
    "title": "Amoebiasis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Amoebiasis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Amoebiasis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "106K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Amoebiasis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Amoebiasis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Amoebiasis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Amoebiasis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Amoebiasis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Amoebiasis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_trichinosis_54",
    "title": "Trichinosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Trichinosis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Trichinosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "123K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Trichinosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Trichinosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Trichinosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Trichinosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Trichinosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Trichinosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_scabies_55",
    "title": "Scabies: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Scabies",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Scabies. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "140K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Scabies characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Scabies symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Scabies"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Scabies",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Scabies",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Scabies",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_ringworm_56",
    "title": "Ringworm: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Ringworm",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Ringworm. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "157K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Ringworm characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Ringworm symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Ringworm"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Ringworm",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Ringworm",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Ringworm",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_athlete_s_foot_57",
    "title": "Athlete's Foot: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Athlete's Foot",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Athlete's Foot. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "174K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Athlete's Foot characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Athlete's Foot symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Athlete's Foot"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Athlete's Foot",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Athlete's Foot",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Athlete's Foot",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_candidiasis_58",
    "title": "Candidiasis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Candidiasis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Candidiasis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "191K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Candidiasis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Candidiasis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Candidiasis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Candidiasis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Candidiasis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Candidiasis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_aspergillosis_59",
    "title": "Aspergillosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Aspergillosis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Aspergillosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "208K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Aspergillosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Aspergillosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Aspergillosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Aspergillosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Aspergillosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Aspergillosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_cryptococcosis_60",
    "title": "Cryptococcosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Cryptococcosis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Cryptococcosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "225K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Cryptococcosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Cryptococcosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Cryptococcosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Cryptococcosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Cryptococcosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Cryptococcosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_histoplasmosis_61",
    "title": "Histoplasmosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Histoplasmosis",
    "category": "Infectious Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Histoplasmosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "242K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Infectious Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Histoplasmosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Histoplasmosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Histoplasmosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Histoplasmosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Histoplasmosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Histoplasmosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_hypertension_62",
    "title": "Hypertension: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Hypertension",
    "category": "Cardiovascular Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Hypertension. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "49K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cardiovascular Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Hypertension characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Hypertension symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Hypertension"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Hypertension",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Hypertension",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Hypertension",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_coronary_artery_disease_63",
    "title": "Coronary Artery Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Coronary Artery Disease",
    "category": "Cardiovascular Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Coronary Artery Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "66K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cardiovascular Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Coronary Artery Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Coronary Artery Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Coronary Artery Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Coronary Artery Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Coronary Artery Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Coronary Artery Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_heart_failure_64",
    "title": "Heart Failure: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Heart Failure",
    "category": "Cardiovascular Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Heart Failure. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "83K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cardiovascular Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Heart Failure characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Heart Failure symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Heart Failure"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Heart Failure",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Heart Failure",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Heart Failure",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_arrhythmia_65",
    "title": "Arrhythmia: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Arrhythmia",
    "category": "Cardiovascular Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Arrhythmia. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "100K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cardiovascular Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Arrhythmia characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Arrhythmia symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Arrhythmia"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Arrhythmia",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Arrhythmia",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Arrhythmia",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_atrial_fibrillation_66",
    "title": "Atrial Fibrillation: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Atrial Fibrillation",
    "category": "Cardiovascular Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Atrial Fibrillation. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "117K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cardiovascular Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Atrial Fibrillation characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Atrial Fibrillation symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Atrial Fibrillation"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Atrial Fibrillation",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Atrial Fibrillation",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Atrial Fibrillation",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_myocardial_infarction_67",
    "title": "Myocardial Infarction: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Myocardial Infarction",
    "category": "Cardiovascular Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Myocardial Infarction. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "134K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cardiovascular Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Myocardial Infarction characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Myocardial Infarction symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Myocardial Infarction"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Myocardial Infarction",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Myocardial Infarction",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Myocardial Infarction",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_stroke_68",
    "title": "Stroke: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Stroke",
    "category": "Cardiovascular Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Stroke. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "151K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cardiovascular Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Stroke characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Stroke symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Stroke"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Stroke",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Stroke",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Stroke",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_atherosclerosis_69",
    "title": "Atherosclerosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Atherosclerosis",
    "category": "Cardiovascular Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Atherosclerosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "168K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cardiovascular Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Atherosclerosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Atherosclerosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Atherosclerosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Atherosclerosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Atherosclerosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Atherosclerosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_peripheral_artery_disease_70",
    "title": "Peripheral Artery Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Peripheral Artery Disease",
    "category": "Cardiovascular Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Peripheral Artery Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "185K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cardiovascular Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Peripheral Artery Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Peripheral Artery Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Peripheral Artery Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Peripheral Artery Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Peripheral Artery Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Peripheral Artery Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_cardiomyopathy_71",
    "title": "Cardiomyopathy: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Cardiomyopathy",
    "category": "Cardiovascular Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Cardiomyopathy. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "202K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cardiovascular Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Cardiomyopathy characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Cardiomyopathy symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Cardiomyopathy"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Cardiomyopathy",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Cardiomyopathy",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Cardiomyopathy",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_rheumatic_heart_disease_72",
    "title": "Rheumatic Heart Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Rheumatic Heart Disease",
    "category": "Cardiovascular Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Rheumatic Heart Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "219K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cardiovascular Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Rheumatic Heart Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Rheumatic Heart Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Rheumatic Heart Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Rheumatic Heart Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Rheumatic Heart Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Rheumatic Heart Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_congenital_heart_defects_73",
    "title": "Congenital Heart Defects: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Congenital Heart Defects",
    "category": "Cardiovascular Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Congenital Heart Defects. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "236K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cardiovascular Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Congenital Heart Defects characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Congenital Heart Defects symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Congenital Heart Defects"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Congenital Heart Defects",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Congenital Heart Defects",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Congenital Heart Defects",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_deep_vein_thrombosis_74",
    "title": "Deep Vein Thrombosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Deep Vein Thrombosis",
    "category": "Cardiovascular Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Deep Vein Thrombosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "253K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cardiovascular Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Deep Vein Thrombosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Deep Vein Thrombosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Deep Vein Thrombosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Deep Vein Thrombosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Deep Vein Thrombosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Deep Vein Thrombosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_pulmonary_embolism_75",
    "title": "Pulmonary Embolism: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Pulmonary Embolism",
    "category": "Cardiovascular Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Pulmonary Embolism. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "60K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cardiovascular Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Pulmonary Embolism characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Pulmonary Embolism symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Pulmonary Embolism"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Pulmonary Embolism",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Pulmonary Embolism",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Pulmonary Embolism",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_aneurysm_76",
    "title": "Aneurysm: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Aneurysm",
    "category": "Cardiovascular Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Aneurysm. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "77K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cardiovascular Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Aneurysm characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Aneurysm symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Aneurysm"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Aneurysm",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Aneurysm",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Aneurysm",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_asthma_77",
    "title": "Asthma: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Asthma",
    "category": "Respiratory Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Asthma. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "94K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Respiratory Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Asthma characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Asthma symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Asthma"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Asthma",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Asthma",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Asthma",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_chronic_obstructive_pulmonary_disease_78",
    "title": "Chronic Obstructive Pulmonary Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Chronic Obstructive Pulmonary Disease",
    "category": "Respiratory Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Chronic Obstructive Pulmonary Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "111K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Respiratory Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Chronic Obstructive Pulmonary Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Chronic Obstructive Pulmonary Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Chronic Obstructive Pulmonary Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Chronic Obstructive Pulmonary Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Chronic Obstructive Pulmonary Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Chronic Obstructive Pulmonary Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_emphysema_79",
    "title": "Emphysema: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Emphysema",
    "category": "Respiratory Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Emphysema. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "128K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Respiratory Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Emphysema characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Emphysema symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Emphysema"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Emphysema",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Emphysema",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Emphysema",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_pulmonary_fibrosis_80",
    "title": "Pulmonary Fibrosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Pulmonary Fibrosis",
    "category": "Respiratory Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Pulmonary Fibrosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "145K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Respiratory Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Pulmonary Fibrosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Pulmonary Fibrosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Pulmonary Fibrosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Pulmonary Fibrosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Pulmonary Fibrosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Pulmonary Fibrosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_sleep_apnea_81",
    "title": "Sleep Apnea: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Sleep Apnea",
    "category": "Respiratory Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Sleep Apnea. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "162K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Respiratory Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Sleep Apnea characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Sleep Apnea symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Sleep Apnea"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Sleep Apnea",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Sleep Apnea",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Sleep Apnea",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_cystic_fibrosis_82",
    "title": "Cystic Fibrosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Cystic Fibrosis",
    "category": "Respiratory Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Cystic Fibrosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "179K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Respiratory Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Cystic Fibrosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Cystic Fibrosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Cystic Fibrosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Cystic Fibrosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Cystic Fibrosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Cystic Fibrosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_sarcoidosis_83",
    "title": "Sarcoidosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Sarcoidosis",
    "category": "Respiratory Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Sarcoidosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "196K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Respiratory Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Sarcoidosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Sarcoidosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Sarcoidosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Sarcoidosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Sarcoidosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Sarcoidosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_pleurisy_84",
    "title": "Pleurisy: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Pleurisy",
    "category": "Respiratory Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Pleurisy. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "213K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Respiratory Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Pleurisy characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Pleurisy symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Pleurisy"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Pleurisy",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Pleurisy",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Pleurisy",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_silicosis_85",
    "title": "Silicosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Silicosis",
    "category": "Respiratory Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Silicosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "230K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Respiratory Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Silicosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Silicosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Silicosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Silicosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Silicosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Silicosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_pneumothorax_86",
    "title": "Pneumothorax: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Pneumothorax",
    "category": "Respiratory Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Pneumothorax. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "247K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Respiratory Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Pneumothorax characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Pneumothorax symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Pneumothorax"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Pneumothorax",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Pneumothorax",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Pneumothorax",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_type_1_diabetes_87",
    "title": "Type 1 Diabetes: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Type 1 Diabetes",
    "category": "Endocrine and Metabolic Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Type 1 Diabetes. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "54K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Endocrine and Metabolic Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Type 1 Diabetes characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Type 1 Diabetes symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Type 1 Diabetes"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Type 1 Diabetes",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Type 1 Diabetes",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Type 1 Diabetes",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_type_2_diabetes_88",
    "title": "Type 2 Diabetes: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Type 2 Diabetes",
    "category": "Endocrine and Metabolic Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Type 2 Diabetes. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "71K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Endocrine and Metabolic Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Type 2 Diabetes characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Type 2 Diabetes symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Type 2 Diabetes"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Type 2 Diabetes",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Type 2 Diabetes",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Type 2 Diabetes",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_hypothyroidism_89",
    "title": "Hypothyroidism: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Hypothyroidism",
    "category": "Endocrine and Metabolic Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Hypothyroidism. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "88K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Endocrine and Metabolic Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Hypothyroidism characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Hypothyroidism symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Hypothyroidism"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Hypothyroidism",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Hypothyroidism",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Hypothyroidism",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_hyperthyroidism_90",
    "title": "Hyperthyroidism: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Hyperthyroidism",
    "category": "Endocrine and Metabolic Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Hyperthyroidism. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "105K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Endocrine and Metabolic Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Hyperthyroidism characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Hyperthyroidism symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Hyperthyroidism"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Hyperthyroidism",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Hyperthyroidism",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Hyperthyroidism",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_cushing_s_syndrome_91",
    "title": "Cushing's Syndrome: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Cushing's Syndrome",
    "category": "Endocrine and Metabolic Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Cushing's Syndrome. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "122K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Endocrine and Metabolic Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Cushing's Syndrome characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Cushing's Syndrome symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Cushing's Syndrome"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Cushing's Syndrome",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Cushing's Syndrome",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Cushing's Syndrome",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_addison_s_disease_92",
    "title": "Addison's Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Addison's Disease",
    "category": "Endocrine and Metabolic Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Addison's Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "139K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Endocrine and Metabolic Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Addison's Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Addison's Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Addison's Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Addison's Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Addison's Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Addison's Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_polycystic_ovary_syndrome_93",
    "title": "Polycystic Ovary Syndrome: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Polycystic Ovary Syndrome",
    "category": "Endocrine and Metabolic Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Polycystic Ovary Syndrome. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "156K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Endocrine and Metabolic Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Polycystic Ovary Syndrome characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Polycystic Ovary Syndrome symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Polycystic Ovary Syndrome"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Polycystic Ovary Syndrome",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Polycystic Ovary Syndrome",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Polycystic Ovary Syndrome",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_obesity_94",
    "title": "Obesity: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Obesity",
    "category": "Endocrine and Metabolic Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Obesity. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "173K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Endocrine and Metabolic Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Obesity characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Obesity symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Obesity"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Obesity",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Obesity",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Obesity",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_metabolic_syndrome_95",
    "title": "Metabolic Syndrome: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Metabolic Syndrome",
    "category": "Endocrine and Metabolic Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Metabolic Syndrome. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "190K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Endocrine and Metabolic Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Metabolic Syndrome characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Metabolic Syndrome symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Metabolic Syndrome"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Metabolic Syndrome",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Metabolic Syndrome",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Metabolic Syndrome",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_gout_96",
    "title": "Gout: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Gout",
    "category": "Endocrine and Metabolic Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Gout. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "207K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Endocrine and Metabolic Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Gout characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Gout symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Gout"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Gout",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Gout",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Gout",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_osteoporosis_97",
    "title": "Osteoporosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Osteoporosis",
    "category": "Endocrine and Metabolic Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Osteoporosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "224K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Endocrine and Metabolic Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Osteoporosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Osteoporosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Osteoporosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Osteoporosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Osteoporosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Osteoporosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_rickets_98",
    "title": "Rickets: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Rickets",
    "category": "Endocrine and Metabolic Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Rickets. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "241K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Endocrine and Metabolic Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Rickets characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Rickets symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Rickets"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Rickets",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Rickets",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Rickets",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_hyperlipidemia_99",
    "title": "Hyperlipidemia: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Hyperlipidemia",
    "category": "Endocrine and Metabolic Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Hyperlipidemia. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "48K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Endocrine and Metabolic Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Hyperlipidemia characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Hyperlipidemia symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Hyperlipidemia"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Hyperlipidemia",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Hyperlipidemia",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Hyperlipidemia",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_lung_cancer_100",
    "title": "Lung Cancer: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Lung Cancer",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Lung Cancer. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "65K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Lung Cancer characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Lung Cancer symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Lung Cancer"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Lung Cancer",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Lung Cancer",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Lung Cancer",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_breast_cancer_101",
    "title": "Breast Cancer: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Breast Cancer",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Breast Cancer. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "82K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Breast Cancer characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Breast Cancer symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Breast Cancer"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Breast Cancer",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Breast Cancer",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Breast Cancer",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_prostate_cancer_102",
    "title": "Prostate Cancer: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Prostate Cancer",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Prostate Cancer. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "99K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Prostate Cancer characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Prostate Cancer symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Prostate Cancer"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Prostate Cancer",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Prostate Cancer",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Prostate Cancer",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_colorectal_cancer_103",
    "title": "Colorectal Cancer: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Colorectal Cancer",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Colorectal Cancer. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "116K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Colorectal Cancer characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Colorectal Cancer symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Colorectal Cancer"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Colorectal Cancer",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Colorectal Cancer",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Colorectal Cancer",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_cervical_cancer_104",
    "title": "Cervical Cancer: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Cervical Cancer",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Cervical Cancer. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "133K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Cervical Cancer characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Cervical Cancer symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Cervical Cancer"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Cervical Cancer",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Cervical Cancer",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Cervical Cancer",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_liver_cancer_105",
    "title": "Liver Cancer: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Liver Cancer",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Liver Cancer. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "150K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Liver Cancer characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Liver Cancer symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Liver Cancer"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Liver Cancer",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Liver Cancer",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Liver Cancer",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_stomach_cancer_106",
    "title": "Stomach Cancer: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Stomach Cancer",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Stomach Cancer. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "167K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Stomach Cancer characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Stomach Cancer symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Stomach Cancer"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Stomach Cancer",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Stomach Cancer",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Stomach Cancer",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_pancreatic_cancer_107",
    "title": "Pancreatic Cancer: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Pancreatic Cancer",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Pancreatic Cancer. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "184K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Pancreatic Cancer characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Pancreatic Cancer symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Pancreatic Cancer"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Pancreatic Cancer",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Pancreatic Cancer",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Pancreatic Cancer",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_ovarian_cancer_108",
    "title": "Ovarian Cancer: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Ovarian Cancer",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Ovarian Cancer. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "201K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Ovarian Cancer characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Ovarian Cancer symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Ovarian Cancer"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Ovarian Cancer",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Ovarian Cancer",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Ovarian Cancer",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_leukemia_109",
    "title": "Leukemia: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Leukemia",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Leukemia. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "218K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Leukemia characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Leukemia symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Leukemia"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Leukemia",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Leukemia",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Leukemia",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_hodgkin_s_lymphoma_110",
    "title": "Hodgkin's Lymphoma: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Hodgkin's Lymphoma",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Hodgkin's Lymphoma. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "235K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Hodgkin's Lymphoma characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Hodgkin's Lymphoma symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Hodgkin's Lymphoma"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Hodgkin's Lymphoma",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Hodgkin's Lymphoma",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Hodgkin's Lymphoma",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_non_hodgkin_s_lymphoma_111",
    "title": "Non-Hodgkin's Lymphoma: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Non-Hodgkin's Lymphoma",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Non-Hodgkin's Lymphoma. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "252K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Non-Hodgkin's Lymphoma characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Non-Hodgkin's Lymphoma symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Non-Hodgkin's Lymphoma"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Non-Hodgkin's Lymphoma",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Non-Hodgkin's Lymphoma",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Non-Hodgkin's Lymphoma",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_melanoma_112",
    "title": "Melanoma: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Melanoma",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Melanoma. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "59K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Melanoma characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Melanoma symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Melanoma"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Melanoma",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Melanoma",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Melanoma",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_skin_cancer_113",
    "title": "Skin Cancer: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Skin Cancer",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Skin Cancer. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "76K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Skin Cancer characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Skin Cancer symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Skin Cancer"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Skin Cancer",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Skin Cancer",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Skin Cancer",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_brain_tumors_114",
    "title": "Brain Tumors: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Brain Tumors",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Brain Tumors. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "93K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Brain Tumors characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Brain Tumors symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Brain Tumors"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Brain Tumors",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Brain Tumors",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Brain Tumors",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_kidney_cancer_115",
    "title": "Kidney Cancer: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Kidney Cancer",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Kidney Cancer. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "110K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Kidney Cancer characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Kidney Cancer symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Kidney Cancer"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Kidney Cancer",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Kidney Cancer",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Kidney Cancer",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_bladder_cancer_116",
    "title": "Bladder Cancer: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Bladder Cancer",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Bladder Cancer. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "127K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Bladder Cancer characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Bladder Cancer symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Bladder Cancer"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Bladder Cancer",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Bladder Cancer",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Bladder Cancer",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_esophageal_cancer_117",
    "title": "Esophageal Cancer: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Esophageal Cancer",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Esophageal Cancer. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "144K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Esophageal Cancer characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Esophageal Cancer symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Esophageal Cancer"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Esophageal Cancer",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Esophageal Cancer",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Esophageal Cancer",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_thyroid_cancer_118",
    "title": "Thyroid Cancer: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Thyroid Cancer",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Thyroid Cancer. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "161K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Thyroid Cancer characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Thyroid Cancer symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Thyroid Cancer"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Thyroid Cancer",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Thyroid Cancer",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Thyroid Cancer",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_multiple_myeloma_119",
    "title": "Multiple Myeloma: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Multiple Myeloma",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Multiple Myeloma. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "178K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Multiple Myeloma characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Multiple Myeloma symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Multiple Myeloma"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Multiple Myeloma",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Multiple Myeloma",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Multiple Myeloma",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_sarcoma_120",
    "title": "Sarcoma: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Sarcoma",
    "category": "Cancers",
    "summary": "Comprehensive medical masterclass and clinical presentation on Sarcoma. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "195K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Cancers",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Sarcoma characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Sarcoma symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Sarcoma"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Sarcoma",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Sarcoma",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Sarcoma",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_alzheimer_s_disease_121",
    "title": "Alzheimer's Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Alzheimer's Disease",
    "category": "Neurological Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Alzheimer's Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "212K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Neurological Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Alzheimer's Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Alzheimer's Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Alzheimer's Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Alzheimer's Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Alzheimer's Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Alzheimer's Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_parkinson_s_disease_122",
    "title": "Parkinson's Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Parkinson's Disease",
    "category": "Neurological Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Parkinson's Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "229K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Neurological Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Parkinson's Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Parkinson's Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Parkinson's Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Parkinson's Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Parkinson's Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Parkinson's Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_epilepsy_123",
    "title": "Epilepsy: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Epilepsy",
    "category": "Neurological Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Epilepsy. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "246K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Neurological Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Epilepsy characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Epilepsy symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Epilepsy"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Epilepsy",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Epilepsy",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Epilepsy",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_multiple_sclerosis_124",
    "title": "Multiple Sclerosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Multiple Sclerosis",
    "category": "Neurological Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Multiple Sclerosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "53K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Neurological Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Multiple Sclerosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Multiple Sclerosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Multiple Sclerosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Multiple Sclerosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Multiple Sclerosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Multiple Sclerosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_migraine_125",
    "title": "Migraine: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Migraine",
    "category": "Neurological Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Migraine. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "70K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Neurological Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Migraine characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Migraine symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Migraine"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Migraine",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Migraine",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Migraine",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_als_126",
    "title": "ALS: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "ALS",
    "category": "Neurological Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on ALS. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "87K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Neurological Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of ALS characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of ALS symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for ALS"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for ALS",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of ALS",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of ALS",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_huntington_s_disease_127",
    "title": "Huntington's Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Huntington's Disease",
    "category": "Neurological Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Huntington's Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "104K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Neurological Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Huntington's Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Huntington's Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Huntington's Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Huntington's Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Huntington's Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Huntington's Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_bell_s_palsy_128",
    "title": "Bell's Palsy: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Bell's Palsy",
    "category": "Neurological Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Bell's Palsy. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "121K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Neurological Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Bell's Palsy characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Bell's Palsy symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Bell's Palsy"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Bell's Palsy",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Bell's Palsy",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Bell's Palsy",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_cerebral_palsy_129",
    "title": "Cerebral Palsy: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Cerebral Palsy",
    "category": "Neurological Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Cerebral Palsy. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "138K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Neurological Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Cerebral Palsy characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Cerebral Palsy symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Cerebral Palsy"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Cerebral Palsy",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Cerebral Palsy",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Cerebral Palsy",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_guillain_barre_syndrome_130",
    "title": "Guillain-Barre Syndrome: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Guillain-Barre Syndrome",
    "category": "Neurological Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Guillain-Barre Syndrome. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "155K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Neurological Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Guillain-Barre Syndrome characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Guillain-Barre Syndrome symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Guillain-Barre Syndrome"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Guillain-Barre Syndrome",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Guillain-Barre Syndrome",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Guillain-Barre Syndrome",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_neuropathy_131",
    "title": "Neuropathy: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Neuropathy",
    "category": "Neurological Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Neuropathy. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "172K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Neurological Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Neuropathy characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Neuropathy symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Neuropathy"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Neuropathy",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Neuropathy",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Neuropathy",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_meningoencephalitis_132",
    "title": "Meningoencephalitis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Meningoencephalitis",
    "category": "Neurological Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Meningoencephalitis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "189K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Neurological Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Meningoencephalitis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Meningoencephalitis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Meningoencephalitis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Meningoencephalitis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Meningoencephalitis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Meningoencephalitis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_dementia_133",
    "title": "Dementia: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Dementia",
    "category": "Neurological Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Dementia. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "206K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Neurological Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Dementia characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Dementia symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Dementia"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Dementia",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Dementia",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Dementia",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_depression_134",
    "title": "Depression: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Depression",
    "category": "Mental Health Conditions",
    "summary": "Comprehensive medical masterclass and clinical presentation on Depression. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "223K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Mental Health Conditions",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Depression characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Depression symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Depression"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Depression",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Depression",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Depression",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_anxiety_disorders_135",
    "title": "Anxiety Disorders: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Anxiety Disorders",
    "category": "Mental Health Conditions",
    "summary": "Comprehensive medical masterclass and clinical presentation on Anxiety Disorders. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "240K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Mental Health Conditions",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Anxiety Disorders characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Anxiety Disorders symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Anxiety Disorders"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Anxiety Disorders",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Anxiety Disorders",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Anxiety Disorders",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_bipolar_disorder_136",
    "title": "Bipolar Disorder: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Bipolar Disorder",
    "category": "Mental Health Conditions",
    "summary": "Comprehensive medical masterclass and clinical presentation on Bipolar Disorder. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "47K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Mental Health Conditions",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Bipolar Disorder characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Bipolar Disorder symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Bipolar Disorder"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Bipolar Disorder",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Bipolar Disorder",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Bipolar Disorder",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_schizophrenia_137",
    "title": "Schizophrenia: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Schizophrenia",
    "category": "Mental Health Conditions",
    "summary": "Comprehensive medical masterclass and clinical presentation on Schizophrenia. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "64K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Mental Health Conditions",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Schizophrenia characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Schizophrenia symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Schizophrenia"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Schizophrenia",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Schizophrenia",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Schizophrenia",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_obsessive_compulsive_disorder_138",
    "title": "Obsessive-Compulsive Disorder: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Obsessive-Compulsive Disorder",
    "category": "Mental Health Conditions",
    "summary": "Comprehensive medical masterclass and clinical presentation on Obsessive-Compulsive Disorder. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "81K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Mental Health Conditions",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Obsessive-Compulsive Disorder characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Obsessive-Compulsive Disorder symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Obsessive-Compulsive Disorder"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Obsessive-Compulsive Disorder",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Obsessive-Compulsive Disorder",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Obsessive-Compulsive Disorder",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_post_traumatic_stress_disorder_139",
    "title": "Post-Traumatic Stress Disorder: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Post-Traumatic Stress Disorder",
    "category": "Mental Health Conditions",
    "summary": "Comprehensive medical masterclass and clinical presentation on Post-Traumatic Stress Disorder. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "98K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Mental Health Conditions",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Post-Traumatic Stress Disorder characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Post-Traumatic Stress Disorder symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Post-Traumatic Stress Disorder"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Post-Traumatic Stress Disorder",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Post-Traumatic Stress Disorder",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Post-Traumatic Stress Disorder",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_eating_disorders_140",
    "title": "Eating Disorders: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Eating Disorders",
    "category": "Mental Health Conditions",
    "summary": "Comprehensive medical masterclass and clinical presentation on Eating Disorders. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "115K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Mental Health Conditions",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Eating Disorders characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Eating Disorders symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Eating Disorders"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Eating Disorders",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Eating Disorders",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Eating Disorders",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_autism_spectrum_disorder_141",
    "title": "Autism Spectrum Disorder: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Autism Spectrum Disorder",
    "category": "Mental Health Conditions",
    "summary": "Comprehensive medical masterclass and clinical presentation on Autism Spectrum Disorder. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "132K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Mental Health Conditions",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Autism Spectrum Disorder characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Autism Spectrum Disorder symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Autism Spectrum Disorder"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Autism Spectrum Disorder",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Autism Spectrum Disorder",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Autism Spectrum Disorder",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_adhd_142",
    "title": "ADHD: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "ADHD",
    "category": "Mental Health Conditions",
    "summary": "Comprehensive medical masterclass and clinical presentation on ADHD. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "149K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Mental Health Conditions",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of ADHD characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of ADHD symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for ADHD"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for ADHD",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of ADHD",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of ADHD",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_personality_disorders_143",
    "title": "Personality Disorders: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Personality Disorders",
    "category": "Mental Health Conditions",
    "summary": "Comprehensive medical masterclass and clinical presentation on Personality Disorders. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "166K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Mental Health Conditions",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Personality Disorders characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Personality Disorders symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Personality Disorders"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Personality Disorders",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Personality Disorders",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Personality Disorders",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_peptic_ulcer_disease_144",
    "title": "Peptic Ulcer Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Peptic Ulcer Disease",
    "category": "Gastrointestinal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Peptic Ulcer Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "183K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Gastrointestinal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Peptic Ulcer Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Peptic Ulcer Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Peptic Ulcer Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Peptic Ulcer Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Peptic Ulcer Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Peptic Ulcer Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_gastroesophageal_reflux_disease_145",
    "title": "Gastroesophageal Reflux Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Gastroesophageal Reflux Disease",
    "category": "Gastrointestinal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Gastroesophageal Reflux Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "200K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Gastrointestinal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Gastroesophageal Reflux Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Gastroesophageal Reflux Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Gastroesophageal Reflux Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Gastroesophageal Reflux Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Gastroesophageal Reflux Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Gastroesophageal Reflux Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_irritable_bowel_syndrome_146",
    "title": "Irritable Bowel Syndrome: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Irritable Bowel Syndrome",
    "category": "Gastrointestinal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Irritable Bowel Syndrome. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "217K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Gastrointestinal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Irritable Bowel Syndrome characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Irritable Bowel Syndrome symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Irritable Bowel Syndrome"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Irritable Bowel Syndrome",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Irritable Bowel Syndrome",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Irritable Bowel Syndrome",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_crohn_s_disease_147",
    "title": "Crohn's Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Crohn's Disease",
    "category": "Gastrointestinal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Crohn's Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "234K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Gastrointestinal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Crohn's Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Crohn's Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Crohn's Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Crohn's Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Crohn's Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Crohn's Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_ulcerative_colitis_148",
    "title": "Ulcerative Colitis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Ulcerative Colitis",
    "category": "Gastrointestinal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Ulcerative Colitis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "251K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Gastrointestinal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Ulcerative Colitis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Ulcerative Colitis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Ulcerative Colitis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Ulcerative Colitis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Ulcerative Colitis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Ulcerative Colitis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_celiac_disease_149",
    "title": "Celiac Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Celiac Disease",
    "category": "Gastrointestinal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Celiac Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "58K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Gastrointestinal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Celiac Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Celiac Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Celiac Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Celiac Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Celiac Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Celiac Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_cirrhosis_150",
    "title": "Cirrhosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Cirrhosis",
    "category": "Gastrointestinal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Cirrhosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "75K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Gastrointestinal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Cirrhosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Cirrhosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Cirrhosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Cirrhosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Cirrhosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Cirrhosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_fatty_liver_disease_151",
    "title": "Fatty Liver Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Fatty Liver Disease",
    "category": "Gastrointestinal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Fatty Liver Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "92K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Gastrointestinal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Fatty Liver Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Fatty Liver Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Fatty Liver Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Fatty Liver Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Fatty Liver Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Fatty Liver Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_pancreatitis_152",
    "title": "Pancreatitis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Pancreatitis",
    "category": "Gastrointestinal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Pancreatitis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "109K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Gastrointestinal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Pancreatitis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Pancreatitis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Pancreatitis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Pancreatitis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Pancreatitis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Pancreatitis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_gallstones_153",
    "title": "Gallstones: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Gallstones",
    "category": "Gastrointestinal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Gallstones. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "126K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Gastrointestinal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Gallstones characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Gallstones symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Gallstones"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Gallstones",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Gallstones",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Gallstones",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_appendicitis_154",
    "title": "Appendicitis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Appendicitis",
    "category": "Gastrointestinal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Appendicitis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "143K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Gastrointestinal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Appendicitis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Appendicitis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Appendicitis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Appendicitis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Appendicitis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Appendicitis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_hemorrhoids_155",
    "title": "Hemorrhoids: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Hemorrhoids",
    "category": "Gastrointestinal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Hemorrhoids. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "160K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Gastrointestinal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Hemorrhoids characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Hemorrhoids symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Hemorrhoids"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Hemorrhoids",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Hemorrhoids",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Hemorrhoids",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_diverticulitis_156",
    "title": "Diverticulitis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Diverticulitis",
    "category": "Gastrointestinal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Diverticulitis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "177K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Gastrointestinal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Diverticulitis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Diverticulitis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Diverticulitis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Diverticulitis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Diverticulitis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Diverticulitis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_osteoarthritis_157",
    "title": "Osteoarthritis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Osteoarthritis",
    "category": "Musculoskeletal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Osteoarthritis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "194K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Musculoskeletal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Osteoarthritis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Osteoarthritis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Osteoarthritis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Osteoarthritis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Osteoarthritis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Osteoarthritis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_rheumatoid_arthritis_158",
    "title": "Rheumatoid Arthritis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Rheumatoid Arthritis",
    "category": "Musculoskeletal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Rheumatoid Arthritis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "211K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Musculoskeletal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Rheumatoid Arthritis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Rheumatoid Arthritis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Rheumatoid Arthritis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Rheumatoid Arthritis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Rheumatoid Arthritis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Rheumatoid Arthritis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_lupus_159",
    "title": "Lupus: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Lupus",
    "category": "Musculoskeletal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Lupus. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "228K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Musculoskeletal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Lupus characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Lupus symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Lupus"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Lupus",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Lupus",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Lupus",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_fibromyalgia_160",
    "title": "Fibromyalgia: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Fibromyalgia",
    "category": "Musculoskeletal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Fibromyalgia. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "245K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Musculoskeletal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Fibromyalgia characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Fibromyalgia symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Fibromyalgia"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Fibromyalgia",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Fibromyalgia",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Fibromyalgia",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_ankylosing_spondylitis_161",
    "title": "Ankylosing Spondylitis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Ankylosing Spondylitis",
    "category": "Musculoskeletal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Ankylosing Spondylitis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "52K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Musculoskeletal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Ankylosing Spondylitis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Ankylosing Spondylitis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Ankylosing Spondylitis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Ankylosing Spondylitis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Ankylosing Spondylitis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Ankylosing Spondylitis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_muscular_dystrophy_162",
    "title": "Muscular Dystrophy: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Muscular Dystrophy",
    "category": "Musculoskeletal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Muscular Dystrophy. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "69K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Musculoskeletal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Muscular Dystrophy characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Muscular Dystrophy symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Muscular Dystrophy"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Muscular Dystrophy",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Muscular Dystrophy",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Muscular Dystrophy",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_scoliosis_163",
    "title": "Scoliosis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Scoliosis",
    "category": "Musculoskeletal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Scoliosis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "86K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Musculoskeletal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Scoliosis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Scoliosis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Scoliosis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Scoliosis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Scoliosis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Scoliosis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_sciatica_164",
    "title": "Sciatica: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Sciatica",
    "category": "Musculoskeletal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Sciatica. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "103K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Musculoskeletal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Sciatica characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Sciatica symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Sciatica"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Sciatica",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Sciatica",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Sciatica",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_tendinitis_165",
    "title": "Tendinitis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Tendinitis",
    "category": "Musculoskeletal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Tendinitis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "120K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Musculoskeletal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Tendinitis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Tendinitis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Tendinitis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Tendinitis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Tendinitis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Tendinitis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_bursitis_166",
    "title": "Bursitis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Bursitis",
    "category": "Musculoskeletal Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Bursitis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "137K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Musculoskeletal Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Bursitis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Bursitis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Bursitis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Bursitis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Bursitis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Bursitis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_chronic_kidney_disease_167",
    "title": "Chronic Kidney Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Chronic Kidney Disease",
    "category": "Renal and Urinary Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Chronic Kidney Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "154K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Renal and Urinary Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Chronic Kidney Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Chronic Kidney Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Chronic Kidney Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Chronic Kidney Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Chronic Kidney Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Chronic Kidney Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_kidney_stones_168",
    "title": "Kidney Stones: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Kidney Stones",
    "category": "Renal and Urinary Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Kidney Stones. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "171K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Renal and Urinary Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Kidney Stones characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Kidney Stones symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Kidney Stones"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Kidney Stones",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Kidney Stones",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Kidney Stones",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_urinary_tract_infection_169",
    "title": "Urinary Tract Infection: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Urinary Tract Infection",
    "category": "Renal and Urinary Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Urinary Tract Infection. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "188K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Renal and Urinary Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Urinary Tract Infection characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Urinary Tract Infection symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Urinary Tract Infection"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Urinary Tract Infection",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Urinary Tract Infection",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Urinary Tract Infection",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_nephrotic_syndrome_170",
    "title": "Nephrotic Syndrome: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Nephrotic Syndrome",
    "category": "Renal and Urinary Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Nephrotic Syndrome. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "205K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Renal and Urinary Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Nephrotic Syndrome characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Nephrotic Syndrome symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Nephrotic Syndrome"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Nephrotic Syndrome",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Nephrotic Syndrome",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Nephrotic Syndrome",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_polycystic_kidney_disease_171",
    "title": "Polycystic Kidney Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Polycystic Kidney Disease",
    "category": "Renal and Urinary Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Polycystic Kidney Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "222K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Renal and Urinary Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Polycystic Kidney Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Polycystic Kidney Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Polycystic Kidney Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Polycystic Kidney Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Polycystic Kidney Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Polycystic Kidney Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_glomerulonephritis_172",
    "title": "Glomerulonephritis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Glomerulonephritis",
    "category": "Renal and Urinary Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Glomerulonephritis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "239K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Renal and Urinary Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Glomerulonephritis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Glomerulonephritis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Glomerulonephritis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Glomerulonephritis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Glomerulonephritis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Glomerulonephritis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_bladder_infections_173",
    "title": "Bladder Infections: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Bladder Infections",
    "category": "Renal and Urinary Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Bladder Infections. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "46K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Renal and Urinary Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Bladder Infections characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Bladder Infections symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Bladder Infections"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Bladder Infections",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Bladder Infections",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Bladder Infections",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_prostatitis_174",
    "title": "Prostatitis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Prostatitis",
    "category": "Renal and Urinary Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Prostatitis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "63K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Renal and Urinary Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Prostatitis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Prostatitis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Prostatitis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Prostatitis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Prostatitis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Prostatitis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_down_syndrome_175",
    "title": "Down Syndrome: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Down Syndrome",
    "category": "Genetic and Congenital Disorders",
    "summary": "Comprehensive medical masterclass and clinical presentation on Down Syndrome. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "80K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Genetic and Congenital Disorders",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Down Syndrome characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Down Syndrome symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Down Syndrome"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Down Syndrome",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Down Syndrome",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Down Syndrome",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_sickle_cell_disease_176",
    "title": "Sickle Cell Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Sickle Cell Disease",
    "category": "Genetic and Congenital Disorders",
    "summary": "Comprehensive medical masterclass and clinical presentation on Sickle Cell Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "97K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Genetic and Congenital Disorders",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Sickle Cell Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Sickle Cell Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Sickle Cell Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Sickle Cell Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Sickle Cell Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Sickle Cell Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_thalassemia_177",
    "title": "Thalassemia: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Thalassemia",
    "category": "Genetic and Congenital Disorders",
    "summary": "Comprehensive medical masterclass and clinical presentation on Thalassemia. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "114K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Genetic and Congenital Disorders",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Thalassemia characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Thalassemia symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Thalassemia"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Thalassemia",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Thalassemia",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Thalassemia",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_hemophilia_178",
    "title": "Hemophilia: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Hemophilia",
    "category": "Genetic and Congenital Disorders",
    "summary": "Comprehensive medical masterclass and clinical presentation on Hemophilia. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "131K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Genetic and Congenital Disorders",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Hemophilia characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Hemophilia symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Hemophilia"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Hemophilia",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Hemophilia",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Hemophilia",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_marfan_syndrome_179",
    "title": "Marfan Syndrome: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Marfan Syndrome",
    "category": "Genetic and Congenital Disorders",
    "summary": "Comprehensive medical masterclass and clinical presentation on Marfan Syndrome. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "148K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Genetic and Congenital Disorders",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Marfan Syndrome characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Marfan Syndrome symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Marfan Syndrome"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Marfan Syndrome",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Marfan Syndrome",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Marfan Syndrome",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_fragile_x_syndrome_180",
    "title": "Fragile X Syndrome: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Fragile X Syndrome",
    "category": "Genetic and Congenital Disorders",
    "summary": "Comprehensive medical masterclass and clinical presentation on Fragile X Syndrome. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "165K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Genetic and Congenital Disorders",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Fragile X Syndrome characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Fragile X Syndrome symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Fragile X Syndrome"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Fragile X Syndrome",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Fragile X Syndrome",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Fragile X Syndrome",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_tay_sachs_disease_181",
    "title": "Tay-Sachs Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Tay-Sachs Disease",
    "category": "Genetic and Congenital Disorders",
    "summary": "Comprehensive medical masterclass and clinical presentation on Tay-Sachs Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "182K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Genetic and Congenital Disorders",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Tay-Sachs Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Tay-Sachs Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Tay-Sachs Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Tay-Sachs Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Tay-Sachs Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Tay-Sachs Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_phenylketonuria_182",
    "title": "Phenylketonuria: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Phenylketonuria",
    "category": "Genetic and Congenital Disorders",
    "summary": "Comprehensive medical masterclass and clinical presentation on Phenylketonuria. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "199K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Genetic and Congenital Disorders",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Phenylketonuria characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Phenylketonuria symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Phenylketonuria"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Phenylketonuria",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Phenylketonuria",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Phenylketonuria",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_turner_syndrome_183",
    "title": "Turner Syndrome: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Turner Syndrome",
    "category": "Genetic and Congenital Disorders",
    "summary": "Comprehensive medical masterclass and clinical presentation on Turner Syndrome. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "216K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Genetic and Congenital Disorders",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Turner Syndrome characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Turner Syndrome symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Turner Syndrome"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Turner Syndrome",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Turner Syndrome",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Turner Syndrome",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_klinefelter_syndrome_184",
    "title": "Klinefelter Syndrome: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Klinefelter Syndrome",
    "category": "Genetic and Congenital Disorders",
    "summary": "Comprehensive medical masterclass and clinical presentation on Klinefelter Syndrome. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "233K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Genetic and Congenital Disorders",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Klinefelter Syndrome characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Klinefelter Syndrome symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Klinefelter Syndrome"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Klinefelter Syndrome",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Klinefelter Syndrome",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Klinefelter Syndrome",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_eczema_185",
    "title": "Eczema: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Eczema",
    "category": "Skin Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Eczema. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "250K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Skin Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Eczema characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Eczema symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Eczema"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Eczema",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Eczema",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Eczema",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_psoriasis_186",
    "title": "Psoriasis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Psoriasis",
    "category": "Skin Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Psoriasis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "57K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Skin Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Psoriasis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Psoriasis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Psoriasis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Psoriasis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Psoriasis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Psoriasis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_acne_187",
    "title": "Acne: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Acne",
    "category": "Skin Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Acne. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "74K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Skin Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Acne characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Acne symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Acne"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Acne",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Acne",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Acne",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_vitiligo_188",
    "title": "Vitiligo: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Vitiligo",
    "category": "Skin Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Vitiligo. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "91K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Skin Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Vitiligo characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Vitiligo symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Vitiligo"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Vitiligo",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Vitiligo",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Vitiligo",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_rosacea_189",
    "title": "Rosacea: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Rosacea",
    "category": "Skin Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Rosacea. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "108K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Skin Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Rosacea characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Rosacea symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Rosacea"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Rosacea",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Rosacea",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Rosacea",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_dermatitis_190",
    "title": "Dermatitis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Dermatitis",
    "category": "Skin Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Dermatitis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "125K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Skin Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Dermatitis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Dermatitis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Dermatitis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Dermatitis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Dermatitis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Dermatitis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_urticaria_191",
    "title": "Urticaria: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Urticaria",
    "category": "Skin Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Urticaria. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "142K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Skin Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Urticaria characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Urticaria symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Urticaria"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Urticaria",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Urticaria",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Urticaria",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_albinism_192",
    "title": "Albinism: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Albinism",
    "category": "Skin Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Albinism. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "159K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Skin Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Albinism characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Albinism symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Albinism"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Albinism",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Albinism",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Albinism",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_lichen_planus_193",
    "title": "Lichen Planus: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Lichen Planus",
    "category": "Skin Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Lichen Planus. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "176K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Skin Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Lichen Planus characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Lichen Planus symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Lichen Planus"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Lichen Planus",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Lichen Planus",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Lichen Planus",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_cataracts_194",
    "title": "Cataracts: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Cataracts",
    "category": "Eye and Ear Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Cataracts. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "193K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Eye and Ear Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Cataracts characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Cataracts symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Cataracts"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Cataracts",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Cataracts",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Cataracts",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_glaucoma_195",
    "title": "Glaucoma: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Glaucoma",
    "category": "Eye and Ear Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Glaucoma. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "210K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Eye and Ear Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Glaucoma characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Glaucoma symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Glaucoma"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Glaucoma",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Glaucoma",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Glaucoma",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_macular_degeneration_196",
    "title": "Macular Degeneration: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Macular Degeneration",
    "category": "Eye and Ear Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Macular Degeneration. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "227K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Eye and Ear Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Macular Degeneration characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Macular Degeneration symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Macular Degeneration"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Macular Degeneration",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Macular Degeneration",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Macular Degeneration",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_conjunctivitis_197",
    "title": "Conjunctivitis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Conjunctivitis",
    "category": "Eye and Ear Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Conjunctivitis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "244K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Eye and Ear Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Conjunctivitis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Conjunctivitis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Conjunctivitis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Conjunctivitis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Conjunctivitis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Conjunctivitis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_retinitis_pigmentosa_198",
    "title": "Retinitis Pigmentosa: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Retinitis Pigmentosa",
    "category": "Eye and Ear Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Retinitis Pigmentosa. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "51K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Eye and Ear Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Retinitis Pigmentosa characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Retinitis Pigmentosa symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Retinitis Pigmentosa"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Retinitis Pigmentosa",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Retinitis Pigmentosa",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Retinitis Pigmentosa",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_otitis_media_199",
    "title": "Otitis Media: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Otitis Media",
    "category": "Eye and Ear Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Otitis Media. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "68K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Eye and Ear Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Otitis Media characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Otitis Media symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Otitis Media"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Otitis Media",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Otitis Media",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Otitis Media",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_tinnitus_200",
    "title": "Tinnitus: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Tinnitus",
    "category": "Eye and Ear Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Tinnitus. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "85K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Eye and Ear Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Tinnitus characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Tinnitus symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Tinnitus"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Tinnitus",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Tinnitus",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Tinnitus",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_meniere_s_disease_201",
    "title": "Meniere's Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Meniere's Disease",
    "category": "Eye and Ear Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Meniere's Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "102K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Eye and Ear Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Meniere's Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Meniere's Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Meniere's Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Meniere's Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Meniere's Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Meniere's Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_hashimoto_s_thyroiditis_202",
    "title": "Hashimoto's Thyroiditis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Hashimoto's Thyroiditis",
    "category": "Autoimmune Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Hashimoto's Thyroiditis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "119K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Autoimmune Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Hashimoto's Thyroiditis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Hashimoto's Thyroiditis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Hashimoto's Thyroiditis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Hashimoto's Thyroiditis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Hashimoto's Thyroiditis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Hashimoto's Thyroiditis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_graves_disease_203",
    "title": "Graves' Disease: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Graves' Disease",
    "category": "Autoimmune Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Graves' Disease. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "136K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Autoimmune Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Graves' Disease characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Graves' Disease symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Graves' Disease"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Graves' Disease",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Graves' Disease",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Graves' Disease",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_sjogren_s_syndrome_204",
    "title": "Sjogren's Syndrome: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Sjogren's Syndrome",
    "category": "Autoimmune Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Sjogren's Syndrome. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "153K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Autoimmune Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Sjogren's Syndrome characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Sjogren's Syndrome symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Sjogren's Syndrome"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Sjogren's Syndrome",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Sjogren's Syndrome",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Sjogren's Syndrome",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_myasthenia_gravis_205",
    "title": "Myasthenia Gravis: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Myasthenia Gravis",
    "category": "Autoimmune Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Myasthenia Gravis. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "170K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Autoimmune Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Myasthenia Gravis characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Myasthenia Gravis symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Myasthenia Gravis"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Myasthenia Gravis",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Myasthenia Gravis",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Myasthenia Gravis",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_scurvy_206",
    "title": "Scurvy: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Scurvy",
    "category": "Nutritional Deficiency Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Scurvy. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "187K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Nutritional Deficiency Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Scurvy characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Scurvy symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Scurvy"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Scurvy",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Scurvy",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Scurvy",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_kwashiorkor_207",
    "title": "Kwashiorkor: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Kwashiorkor",
    "category": "Nutritional Deficiency Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Kwashiorkor. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "204K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Nutritional Deficiency Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Kwashiorkor characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Kwashiorkor symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Kwashiorkor"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Kwashiorkor",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Kwashiorkor",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Kwashiorkor",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_marasmus_208",
    "title": "Marasmus: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Marasmus",
    "category": "Nutritional Deficiency Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Marasmus. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "221K",
    "publishedDate": "3 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Nutritional Deficiency Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Marasmus characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Marasmus symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Marasmus"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Marasmus",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Marasmus",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Marasmus",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_beriberi_209",
    "title": "Beriberi: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Beriberi",
    "category": "Nutritional Deficiency Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Beriberi. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "238K",
    "publishedDate": "1 month ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Nutritional Deficiency Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Beriberi characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Beriberi symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Beriberi"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Beriberi",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Beriberi",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Beriberi",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_pellagra_210",
    "title": "Pellagra: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Pellagra",
    "category": "Nutritional Deficiency Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Pellagra. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "45K",
    "publishedDate": "2 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Nutritional Deficiency Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Pellagra characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Pellagra symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Pellagra"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Pellagra",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Pellagra",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Pellagra",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_anemia_211",
    "title": "Anemia: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Anemia",
    "category": "Nutritional Deficiency Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Anemia. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "62K",
    "publishedDate": "4 days ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Nutritional Deficiency Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Anemia characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Anemia symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Anemia"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Anemia",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Anemia",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Anemia",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_goiter_212",
    "title": "Goiter: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Goiter",
    "category": "Nutritional Deficiency Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Goiter. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "79K",
    "publishedDate": "1 week ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Nutritional Deficiency Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Goiter characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Goiter symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Goiter"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Goiter",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Goiter",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Goiter",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  },
  {
    "id": "dis_night_blindness_213",
    "title": "Night Blindness: Genesis & Comprehensive Medical Overview | K.I Ezra",
    "diseaseName": "Night Blindness",
    "category": "Nutritional Deficiency Diseases",
    "summary": "Comprehensive medical masterclass and clinical presentation on Night Blindness. Featuring clinical diagnosis, pathology, evidence-based management protocols, and lifestyle counseling narrated by K.I Ezra from Genesis of our journey.",
    "videoDuration": "1:16",
    "durationSeconds": 76,
    "views": "96K",
    "publishedDate": "2 weeks ago",
    "channelName": "VitaNova HealthTube • K.I Ezra",
    "speakerName": "K.I Ezra",
    "speakerRole": "Lead Health Visionary & Narrator",
    "speakerAvatar": "/genesis_thumb.jpg",
    "videoThumbnail": "/genesis_thumb.jpg",
    "videoUrl": "/genesis_video.mp4",
    "audioUrl": "/genesis_audio.mp3",
    "levelOfCare": "Primary to Tertiary Care",
    "diseaseClass": "Nutritional Deficiency Diseases",
    "clinicalGuideline": {
      "caseDefinition": "Clinical presentation of Night Blindness characterized by distinct pathophysiological markers, systemic symptoms, and clinical indicators.",
      "diagnosticCriteria": [
        "Primary clinical evaluation and confirmation of Night Blindness symptomatology",
        "Pathological and physiological biomarker assessment",
        "Risk stratification and early identification of complications"
      ],
      "investigations": [
        "Targeted diagnostic blood tests and biochemical panels",
        "Diagnostic imaging and physiological function testing",
        "Specialized laboratory screening for Night Blindness"
      ],
      "firstLineMedicines": [
        "Evidence-based first-line pharmacological regimen for Night Blindness",
        "Symptomatic relief and maintenance stabilization therapy",
        "Essential supportive care and electrolyte balance"
      ],
      "treatmentProtocol": [
        "Immediate stabilization and acute intervention protocol",
        "Structured pharmacological titration and patient monitoring",
        "Ongoing clinical review and long-term care management"
      ],
      "dangerSigns": [
        "Acute worsening of symptoms or hemodynamic instability",
        "Severe organ dysfunction or compromised vital parameters",
        "Failure to respond to initial therapeutic management"
      ],
      "referralProtocol": "Immediate referral to specialist center if danger signs manifest or advanced medical intervention is indicated.",
      "preventionCounseling": [
        "Adherence to prescribed lifestyle modifications and therapy",
        "Routine health check-ups and early biomarker screening",
        "Patient and family education regarding warning signs"
      ]
    },
    "videoSlides": [
      {
        "title": "Introduction & Pathophysiology of Night Blindness",
        "timing": "00:00 - 00:20",
        "keyPoints": [
          "Core definition, biological mechanisms, and etiology of Night Blindness",
          "Understanding cellular, organ, and systemic manifestations",
          "Global epidemiology and clinical risk factors"
        ],
        "badge": "Etiology & Basics"
      },
      {
        "title": "Diagnostic Criteria & Clinical Signs",
        "timing": "00:21 - 00:40",
        "keyPoints": [
          "Key hallmarks, presenting complaints, and physical findings",
          "Confirmatory diagnostic testing and laboratory biomarkers",
          "Differential diagnosis and secondary complications"
        ],
        "badge": "Clinical Assessment"
      },
      {
        "title": "Management Protocol & First-Line Therapy",
        "timing": "00:41 - 00:58",
        "keyPoints": [
          "Standard first-line pharmacotherapy and clinical interventions",
          "Acute stabilization and maintenance regimens",
          "Monitoring therapeutic response and adverse effects"
        ],
        "badge": "Treatment & Care"
      },
      {
        "title": "Prevention, Red Flags & Referral Guidelines",
        "timing": "00:59 - 01:16",
        "keyPoints": [
          "Crucial red flag danger signs requiring immediate referral",
          "Preventive measures, lifestyle counseling, and patient support",
          "Long-term prognosis and follow-up clinical strategy"
        ],
        "badge": "Safety & Follow-up"
      }
    ]
  }
];
