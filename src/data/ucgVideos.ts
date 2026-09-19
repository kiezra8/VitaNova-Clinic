export interface UCGVideoItem {
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
  levelOfCare: string;
  ucgChapter: string;
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

export const UCG_DISEASE_VIDEOS: UCGVideoItem[] = [
  // 1. MALARIA
  {
    id: 'ucg_malaria_01',
    title: 'Severe & Uncomplicated Malaria: IV Artesunate vs AL Protocol | UCG 2023',
    diseaseName: 'Malaria (Uncomplicated & Severe)',
    category: 'Infectious Diseases',
    summary: 'Official Uganda Clinical Guidelines 2023 algorithm: RDT/Microscopy diagnosis, Artemether-Lumefantrine 6-dose regimen, and IV Artesunate dosing for severe complicated malaria.',
    videoDuration: '14:35',
    durationSeconds: 875,
    views: '184K',
    publishedDate: '1 week ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Ronald Mukasa',
    speakerRole: 'Senior Consultant Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC II – National Referral Hospital',
    ucgChapter: 'UCG Chapter 2: Infectious Diseases',
    clinicalGuideline: {
      caseDefinition: 'Fever (axillary temp ≥ 37.5°C or history of fever in last 48h) with positive parasitological confirmation (mRDT or blood smear microscopy).',
      diagnosticCriteria: [
        'Mandatory parasitological test (mRDT or Giemsa blood smear) before initiating antimalarials',
        'Severe malaria criteria: Impaired consciousness (GCS < 11), repeated convulsions, respiratory distress/acidosis, severe anaemia (Hb < 7 g/dL), shock (capillary refill > 2s)',
        'Check blood glucose to rule out hypoglycemia (< 2.2 mmol/L in children, < 3.0 mmol/L in adults)'
      ],
      investigations: [
        'Rapid Diagnostic Test (mRDT - HRP2/pLDH)',
        'Thick and thin Giemsa-stained blood smear',
        'Random Blood Glucose (RBG)',
        'Complete Blood Count (CBC) and Hemoglobin',
        'Renal function (Creatinine, Urea) and Urinalysis'
      ],
      firstLineMedicines: [
        'Uncomplicated: Artemether-Lumefantrine (AL) 20/120mg tablets taken with fatty meal',
        'Severe Malaria: IV/IM Artesunate 2.4 mg/kg body weight at 0h, 12h, 24h, then once daily until oral switch',
        'Children < 20 kg: IV Artesunate 3.0 mg/kg at 0, 12, 24 hours',
        'Pre-referral (HC II/III): Single dose rectal Artesunate capsule (10 mg/kg) for children < 6 years'
      ],
      treatmentProtocol: [
        'Uncomplicated: AL 6-dose regimen over 3 days (Dose 1 at diagnosis, Dose 2 at 8 hours, then morning and evening on Days 2 & 3)',
        'Give Paracetamol 1g TDS (10-15 mg/kg for children) for fever > 38.5°C',
        'Severe: Reconstitute Artesunate powder with 5% sodium bicarbonate, dilute with 0.9% Normal Saline or 5% Dextrose, inject slow IV over 2-3 minutes',
        'Switch to full 3-day oral AL once patient can retain oral medications'
      ],
      dangerSigns: [
        'Inability to drink or breastfeed',
        'Repeated vomiting and severe jaundice (yellow eyes)',
        'Convulsions, abnormal posturing, or coma',
        'Severe pale palms/conjunctiva (life-threatening anaemia)',
        'Deep breathing/acidotic breathing (Kussmaul breathing)'
      ],
      referralProtocol: 'Immediate referral to HC IV or District Hospital after pre-referral rectal/IM Artesunate and IV fluid stabilization.',
      preventionCounseling: [
        'Sleep under Long-Lasting Insecticidal Nets (LLINs) every night',
        'Indoor Residual Spraying (IRS) in endemic districts',
        'Intermittent Preventive Treatment in Pregnancy (IPTp-SP) starting from second trimester at every ANC contact',
        'Clear stagnant water around household compounds'
      ]
    },
    videoSlides: [
      {
        title: 'Parasitological Confirmation & Triage',
        timing: '00:00 - 03:20',
        keyPoints: [
          'Never treat malaria without confirming via mRDT or blood slide',
          'Evaluate for severe danger signs before categorizing as uncomplicated',
          'Check blood sugar immediately to treat malaria-induced hypoglycemia'
        ],
        badge: 'Diagnostic Standard'
      },
      {
        title: 'Uncomplicated AL 6-Dose Administration',
        timing: '03:21 - 07:15',
        keyPoints: [
          'Patient must take Artemether-Lumefantrine with milk or fatty food for absorption',
          'Exact weight-based tablet allocation (5-14kg: 1 tab, 15-24kg: 2 tabs, 25-34kg: 3 tabs, ≥35kg: 4 tabs)',
          'Repeat full dose if vomited within 30 minutes of swallowing'
        ],
        badge: 'Outpatient Treatment'
      },
      {
        title: 'Severe Malaria: IV Artesunate Formulation',
        timing: '07:16 - 11:40',
        keyPoints: [
          'Dosage: 2.4 mg/kg body weight (3.0 mg/kg if weight < 20 kg)',
          'Dosing intervals: Hour 0, Hour 12, Hour 24, then once daily (OD)',
          'Reconstitution: Dissolve in 5% NaHCO3 first, then add Normal Saline'
        ],
        badge: 'Hospital Protocol'
      },
      {
        title: 'Monitoring, Recovery & Pre-Referral Care',
        timing: '11:41 - 14:35',
        keyPoints: [
          'Rectal Artesunate suppository pre-referral dose at lower health centres',
          'Maintain IV fluid balance carefully to prevent acute pulmonary edema',
          'Complete oral AL full course once patient tolerates feeds'
        ],
        badge: 'Referral & Safety'
      }
    ]
  },

  // 2. HYPERTENSION
  {
    id: 'ucg_htn_02',
    title: 'Essential Hypertension: Step-by-Step Drug Titration & Targets | UCG 2023',
    diseaseName: 'Hypertension & Hypertensive Urgency',
    category: 'Cardiovascular',
    summary: 'Clinical diagnosis of BP ≥ 140/90 mmHg, lifestyle interventions, Calcium Channel Blocker (Amlodipine) first-line therapy, and dual combination protocols per Uganda Clinical Guidelines 2023.',
    videoDuration: '12:18',
    durationSeconds: 738,
    views: '142K',
    publishedDate: '2 weeks ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Ronald Mukasa',
    speakerRole: 'Senior Consultant Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC III – Hospital',
    ucgChapter: 'UCG Chapter 4: Cardiovascular Diseases',
    clinicalGuideline: {
      caseDefinition: 'Persistent elevated resting blood pressure ≥ 140 mmHg systolic and/or ≥ 90 mmHg diastolic recorded on at least 2 separate clinic visits.',
      diagnosticCriteria: [
        'Stage 1: BP 140–159 / 90–99 mmHg',
        'Stage 2: BP ≥ 160 / ≥ 100 mmHg',
        'Hypertensive Crisis/Urgency: SBP ≥ 180 and/or DBP ≥ 110 mmHg without acute end-organ damage',
        'Hypertensive Emergency: Severe BP elevation WITH acute organ damage (encephalopathy, acute heart failure, aortic dissection, acute renal injury)'
      ],
      investigations: [
        'Urinalysis (dipstick for protein, microalbuminuria, glycosuria)',
        'Fasting Lipid Profile (Total cholesterol, Triglycerides, HDL, LDL)',
        'Fasting Blood Glucose / HbA1c',
        'Serum Creatinine, Blood Urea Nitrogen, and eGFR',
        '12-Lead Electrocardiogram (ECG) for LVH (Sokolow-Lyon index)'
      ],
      firstLineMedicines: [
        'Calcium Channel Blocker (CCB): Amlodipine 5 mg OD (increase to 10 mg OD if needed)',
        'ACE-Inhibitor (ACE-I): Enalapril 5–20 mg OD or Lisinopril 10–20 mg OD',
        'Angiotensin Receptor Blocker (ARB): Losartan 50–100 mg OD or Telmisartan 40–80 mg OD',
        'Thiazide-like Diuretic: Hydrochlorothiazide (HCTZ) 12.5–25 mg OD'
      ],
      treatmentProtocol: [
        'Black African ancestry first-line standard: CCB (Amlodipine 5mg) OR Thiazide diuretic',
        'If BP not controlled in 4 weeks: Step 2 dual combination CCB + ACE-I / ARB (e.g. Amlodipine 5mg + Enalapril 10mg)',
        'Step 3 triple combination: CCB + ACE-I/ARB + Thiazide Diuretic',
        'Target BP: < 140/90 mmHg for general adult population; < 130/80 mmHg in patients with Diabetes or Chronic Kidney Disease'
      ],
      dangerSigns: [
        'Acute crushing retrosternal chest pain (acute coronary syndrome)',
        'Sudden severe "thunderclap" headache, confusion, or visual loss',
        'Focal neurological deficit, facial asymmetry, hemiparesis (stroke)',
        'Acute shortness of breath with pink frothy sputum (pulmonary edema)'
      ],
      referralProtocol: 'Refer to District Hospital or Regional Referral Hospital if BP remains uncontrolled on 3 classes at maximum doses (resistant hypertension) or suspicion of secondary cause.',
      preventionCounseling: [
        'Sodium restriction: Less than 5g of salt (1 level teaspoon) per day; avoid stock cubes (Royco)',
        'Dietary Approaches to Stop Hypertension (DASH diet): Increase local greens (dodo, nakati), steamed beans, and fresh fruits',
        'At least 150 minutes of moderate aerobic exercise per week (brisk walking, cycling)',
        'Weight reduction to maintain BMI between 18.5 and 24.9 kg/m²',
        'Complete cessation of tobacco smoking and reduction of alcohol intake'
      ]
    },
    videoSlides: [
      {
        title: 'Diagnostic Staging & Blood Pressure Targets',
        timing: '00:00 - 02:45',
        keyPoints: [
          'Confirm with proper cuff size: arm supported at heart level after 5 min rest',
          'Target < 140/90 mmHg generally; < 130/80 mmHg for diabetic & renal patients',
          'Identify hypertensive crisis (> 180/110) immediately'
        ],
        badge: 'Diagnostic Protocol'
      },
      {
        title: 'First-Line Monotherapy & Dual Combination',
        timing: '02:46 - 06:10',
        keyPoints: [
          'Amlodipine 5mg once daily is preferred initial agent in Ugandan patients',
          'Combine with Enalapril 10mg or Losartan 50mg if targets not met in 4 weeks',
          'Never combine ACE-inhibitors directly with ARBs due to hyperkalemia risk'
        ],
        badge: 'Pharmacological Step-up'
      },
      {
        title: 'Laboratory Monitoring & Renal Protection',
        timing: '06:11 - 09:20',
        keyPoints: [
          'Check baseline serum creatinine and potassium before starting ACE-I/ARB',
          'Urine dipstick checks for early proteinuria / nephropathy',
          'Dose adjustments required if eGFR < 30 mL/min'
        ],
        badge: 'Organ Protection'
      },
      {
        title: 'Emergency Signs & Non-Pharmacological Diet',
        timing: '09:21 - 12:18',
        keyPoints: [
          'Severe headaches and chest tightness require urgent hospital triage',
          'Eliminate hidden cooking salts and MSG cubes from traditional dishes',
          'Daily home BP diary logged into VitaNova EMR'
        ],
        badge: 'Counseling'
      }
    ]
  },

  // 3. DIABETES MELLITUS
  {
    id: 'ucg_diabetes_03',
    title: 'Type 2 Diabetes & DKA: Glycemic Targets, Metformin & Insulin | UCG 2023',
    diseaseName: 'Type 2 Diabetes Mellitus',
    category: 'Endocrine & Diabetes',
    summary: 'Uganda Clinical Guidelines 2023 management: Fasting blood glucose thresholds, Metformin titration, Sulfonylureas, Insulin regimens, foot examinations, and emergency DKA resuscitation.',
    videoDuration: '15:10',
    durationSeconds: 910,
    views: '119K',
    publishedDate: '3 weeks ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Ronald Mukasa',
    speakerRole: 'Senior Consultant Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC III – Hospital',
    ucgChapter: 'UCG Chapter 8: Endocrine and Metabolic Diseases',
    clinicalGuideline: {
      caseDefinition: 'Chronic metabolic disorder characterized by persistent hyperglycemia due to defects in insulin secretion, action, or both.',
      diagnosticCriteria: [
        'Fasting Plasma Glucose (FPG) ≥ 7.0 mmol/L (126 mg/dL) after 8h overnight fast',
        'Random Blood Glucose (RBG) ≥ 11.1 mmol/L (200 mg/dL) in presence of classic osmotic symptoms',
        'HbA1c ≥ 6.5% (48 mmol/mol) measured in a standardized clinical laboratory',
        'Classic symptoms: Polyuria (excess urination), Polydipsia (excess thirst), Polyphagia, and Unexplained weight loss'
      ],
      investigations: [
        'Fasting Blood Glucose & Random Glucose profiles',
        'Glycated Hemoglobin (HbA1c) every 3–6 months',
        'Urinalysis for protein, microalbuminuria, and ketones',
        'Serum Creatinine, eGFR, and Lipid profile annually',
        'Visual acuity and dilated retinal examination annually'
      ],
      firstLineMedicines: [
        'Metformin 500 mg OD or BD with meals, titrating up to maximum 1,000 mg BD (2,000 mg/day)',
        'Second-line oral: Glibenclamide 5 mg OD (max 15 mg/day) or Gliclazide 40–80 mg daily',
        'Insulin therapy: Human Mixtard (30/70) subcutaneous injection 0.2–0.5 units/kg/day split 2/3 morning and 1/3 evening',
        'Soluble (Regular) Insulin for Diabetic Ketoacidosis (DKA) management'
      ],
      treatmentProtocol: [
        'Initiate Metformin 500mg with breakfast or evening meal; increase by 500mg every 1-2 weeks to avoid gastrointestinal upset',
        'Add Sulfonylurea (Gliclazide or Glibenclamide) if HbA1c remains > 7.0% after 3 months of optimal Metformin and lifestyle',
        'DKA Resuscitation: IV Normal Saline 0.9% 1L in 1st hour, followed by slow IV Soluble Insulin 0.1 units/kg/hour + Potassium replacement (20-40 mmol/L fluid)',
        'Glycemic targets: Fasting glucose 4.4–7.0 mmol/L; Post-prandial < 10.0 mmol/L; HbA1c < 7.0%'
      ],
      dangerSigns: [
        'Hypoglycemia (blood sugar < 3.9 mmol/L): Trembling, sweating, confusion, palpitations (treat with 15g fast-acting sugar immediately)',
        'Diabetic Ketoacidosis: Vomiting, deep rapid Kussmaul respiration, fruity acetone breath odor, altered mental status',
        'Diabetic foot ulcer: Redness, foul-smelling wound, blackened toe tissue (gangrene)'
      ],
      referralProtocol: 'Refer immediately to HC IV / Hospital if patient presents with DKA, severe foot infection / gangrene, or deteriorating renal function (eGFR < 30 mL/min).',
      preventionCounseling: [
        'Dietary modification: Replace refined white posho, white bread, and sugary sodas with whole millet, brown rice, and legumes',
        'Foot care daily inspection: Check between toes for cuts or blisters, never walk barefoot, wear soft fitted closed shoes',
        'Annual eye screening to catch early diabetic retinopathy before blindness occurs'
      ]
    },
    videoSlides: [
      {
        title: 'Diagnostic Criteria & Osmotic Symptoms',
        timing: '00:00 - 03:40',
        keyPoints: [
          'Fasting Plasma Glucose ≥ 7.0 mmol/L confirms diabetes',
          'Recognize classic 4 Ts: Thirst, Toilet (frequent urine), Tiredness, Thinner (weight loss)',
          'Distinguish between Type 1 (absolute insulin deficiency) and Type 2 (insulin resistance)'
        ],
        badge: 'Diagnosis'
      },
      {
        title: 'Oral Antidiabetic Titration (Metformin & Sulfonylureas)',
        timing: '03:41 - 07:30',
        keyPoints: [
          'Metformin is first-line; always take with food to minimize nausea/diarrhea',
          'Add Gliclazide or Glibenclamide if targets not met in 3 months',
          'Watch for hypoglycemia risk with sulfonylureas in elderly patients'
        ],
        badge: 'Medication Regimen'
      },
      {
        title: 'Insulin Administration & Cold Chain',
        timing: '07:31 - 11:15',
        keyPoints: [
          'Mixtard 30/70 split: 2/3 dose 30 mins before breakfast, 1/3 before dinner',
          'Rotate subcutaneous injection sites (abdomen, outer thigh, upper arm)',
          'Store unopened insulin in clay pot with wet sand if refrigerator is unavailable'
        ],
        badge: 'Insulin Protocol'
      },
      {
        title: 'Diabetic Ketoacidosis (DKA) & Foot Care',
        timing: '11:16 - 15:10',
        keyPoints: [
          'DKA protocol: Fluid resuscitation is priority #1, then low-dose regular insulin',
          'Daily foot self-inspection prevents amputation',
          'Emergency sugar rules for acute hypoglycemia (< 3.9 mmol/L)'
        ],
        badge: 'Emergency & Complications'
      }
    ]
  },

  // 4. PNEUMONIA
  {
    id: 'ucg_pneumonia_04',
    title: 'Pneumonia: Outpatient Amoxicillin to Severe Inpatient Ceftriaxone | UCG 2023',
    diseaseName: 'Community-Acquired & Severe Pneumonia',
    category: 'Respiratory',
    summary: 'Standardized diagnosis using respiratory rates, chest indrawing, high-dose Amoxicillin for mild-moderate cases, and IV Ceftriaxone + Oxygen protocols for severe inpatient hospital care.',
    videoDuration: '11:45',
    durationSeconds: 705,
    views: '96K',
    publishedDate: '1 month ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Sister Florence Nabatanzi',
    speakerRole: 'Senior Community Health Nurse & Clinical Officer',
    speakerAvatar: 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC II – Hospital',
    ucgChapter: 'UCG Chapter 5: Respiratory Diseases',
    clinicalGuideline: {
      caseDefinition: 'Acute infection of the lung parenchyma presenting with cough, fever, fast breathing, and difficulty breathing.',
      diagnosticCriteria: [
        'Fast breathing thresholds (IMNCI): Age 2–11 months: ≥ 50 breaths/min; Age 12–59 months: ≥ 40 breaths/min; Adults: ≥ 30 breaths/min',
        'Severe Pneumonia signs: Lower chest wall indrawing, stridor in calm child, cyanosis (blue lips/tongue), inability to feed, grunting',
        'Auscultation: Coarse crackles (crepitations), bronchial breath sounds, dullness on percussion'
      ],
      investigations: [
        'Pulse Oximetry (SpO2 target ≥ 94% on room air; < 90% indicates immediate oxygen therapy)',
        'Chest X-ray (posteroanterior) showing lobar consolidation or bronchopneumonia',
        'Full Blood Count (leukocytosis > 12.0 × 10⁹/L with neutrophil predominance)',
        'Sputum Gram stain and culture (adults)'
      ],
      firstLineMedicines: [
        'Non-severe outpatient child: Oral Amoxicillin dispersible tablets 40–50 mg/kg/dose BD for 5 days',
        'Non-severe outpatient adult: Oral Amoxicillin 1 g TDS or Amoxicillin/Clavulanate 625 mg BD for 5–7 days',
        'Severe Inpatient: IV Ampicillin 50 mg/kg 6-hourly PLUS IV Gentamicin 7.5 mg/kg once daily',
        'Alternative Severe Inpatient: IV Ceftriaxone 1–2 g once daily (50–80 mg/kg once daily in children)'
      ],
      treatmentProtocol: [
        'Start oxygen immediately via nasal prongs at 1–2 L/min (children) or 4–6 L/min (adults) if SpO2 < 90%',
        'Administer first antibiotic dose within 1 hour of hospital admission',
        'Provide gentle suctioning if nasal secretions obstruct airway',
        'Maintain oral/IV maintenance fluids; avoid fluid overload which can precipitate heart failure',
        'Review at 48 hours for clinical improvement (decreasing respiratory rate, resolution of fever)'
      ],
      dangerSigns: [
        'Oxygen saturation SpO2 falling below 90%',
        'Central cyanosis (bluish coloration around lips, mouth, and tongue)',
        'Lethargy, convulsions, or unconsciousness',
        'Septic shock with cold extremities and prolonged capillary refill > 3 seconds'
      ],
      referralProtocol: 'Emergency referral to HC IV or District Hospital with oxygen supply en route for any child with chest indrawing or adult with SpO2 < 90%.',
      preventionCounseling: [
        'Ensure full childhood immunizations: Pneumococcal Conjugate Vaccine (PCV) at 6, 10, and 14 weeks',
        'Avoid indoor cooking with unventilated charcoal stoves (sigiri) in enclosed sleeping areas',
        'Exclusive breastfeeding for the first 6 months of life'
      ]
    },
    videoSlides: [
      {
        title: 'Respiratory Rate Count & IMNCI Staging',
        timing: '00:00 - 02:50',
        keyPoints: [
          'Count breaths for 1 full minute when child is calm',
          'Age thresholds: 2-11mo ≥ 50/min, 12-59mo ≥ 40/min',
          'Distinguish non-severe fast breathing from severe chest indrawing'
        ],
        badge: 'Clinical Assessment'
      },
      {
        title: 'Oral Amoxicillin Dispersible Dosing',
        timing: '02:51 - 05:40',
        keyPoints: [
          'High dose Amoxicillin: 40-50 mg/kg twice daily for 5 days',
          'Dissolve tablet in 5mL clean water or breastmilk',
          'Instruct mother to return immediately if breathing worsens or vomiting persists'
        ],
        badge: 'Outpatient Protocol'
      },
      {
        title: 'Severe Inpatient Ceftriaxone & Oxygen',
        timing: '05:41 - 08:35',
        keyPoints: [
          'Administer oxygen immediately if SpO2 < 90% on pulse oximetry',
          'IV Ceftriaxone 1-2g OD or Ampicillin + Gentamicin combination',
          'Do not overhydrate children: maintain strict fluid balance'
        ],
        badge: 'Inpatient Hospital'
      },
      {
        title: 'Complications & Vaccination Shields',
        timing: '08:36 - 11:45',
        keyPoints: [
          'Check for pleural effusion / empyema if fever persists past 48 hours',
          'Ensure PCV vaccination complete at 6, 10, and 14 weeks',
          'Eliminate indoor firewood and charcoal smoke in living quarters'
        ],
        badge: 'Prevention'
      }
    ]
  },

  // 5. TUBERCULOSIS (TB)
  {
    id: 'ucg_tb_05',
    title: 'Pulmonary Tuberculosis (PTB): GeneXpert Testing & 2RHZE/4RH Regimen | UCG 2023',
    diseaseName: 'Tuberculosis (Pulmonary & Extra-pulmonary)',
    category: 'Infectious Diseases',
    summary: 'National TB control guidelines: GeneXpert molecular testing, 2RHZE intensive phase, 4RH continuation phase, Rifampicin resistance screening, and household contact management.',
    videoDuration: '13:50',
    durationSeconds: 830,
    views: '88K',
    publishedDate: '1 month ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Ronald Mukasa',
    speakerRole: 'Senior Consultant Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC III – Hospital (TB Unit)',
    ucgChapter: 'UCG Chapter 2: Infectious Diseases',
    clinicalGuideline: {
      caseDefinition: 'Infectious disease caused by Mycobacterium tuberculosis, primarily affecting lungs (PTB) but can spread to other organs (EPTB).',
      diagnosticCriteria: [
        'Presumptive TB: Persistent cough for ≥ 2 weeks, unexplained fever, night sweats, significant weight loss',
        'GeneXpert MTB/RIF test is the primary first-line diagnostic investigation across all public health facilities in Uganda',
        'Smear microscopy (Ziehl-Neelsen or Auramine-O LED fluorescence) where GeneXpert is unavailable'
      ],
      investigations: [
        'GeneXpert MTB/RIF (detects M. tuberculosis and rifampicin resistance mutation)',
        'Chest X-Ray (apical infiltrates, cavitation, pleural effusion, or miliary pattern)',
        'Routine HIV screening for all presumptive and diagnosed TB patients',
        'Baseline liver function tests (ALT, AST, Bilirubin) and Serum Creatinine'
      ],
      firstLineMedicines: [
        'Intensive Phase (2 months): Fixed-Dose Combination (FDC) 2RHZE (Rifampicin + Isoniazid + Pyrazinamide + Ethambutol)',
        'Continuation Phase (4 months): 4RH (Rifampicin + Isoniazid)',
        'Pyridoxine (Vitamin B6) 25–50 mg daily to prevent Isoniazid-induced peripheral neuropathy',
        'TB Preventive Treatment (TPT): 3HP (once-weekly Isoniazid + Rifapentine for 12 weeks) for contacts and HIV patients'
      ],
      treatmentProtocol: [
        'Adult weight-band dosing (FDC tabs daily): 30–39 kg: 2 tabs; 40–54 kg: 3 tabs; 55–70 kg: 4 tabs; > 70 kg: 5 tabs',
        'Directly Observed Therapy (DOTS): Patient takes daily medications under supervision of health worker or treatment supporter',
        'Follow-up sputum smear microscopy at end of month 2, month 5, and month 6 to document cure',
        'If GeneXpert detects Rifampicin Resistance (RR-TB): refer immediately to Regional Multidrug-Resistant (MDR) TB Centre'
      ],
      dangerSigns: [
        'Massive hemoptysis (coughing up large volumes of fresh blood > 200 mL)',
        'Severe acute breathlessness from tension pneumothorax or massive pleural effusion',
        'Jaundice (yellow eyes) indicating drug-induced liver injury from RHZE',
        'Severe cutaneous reaction (Stevens-Johnson syndrome)'
      ],
      referralProtocol: 'Refer to District or Regional Referral Hospital for massive hemoptysis, severe drug-induced hepatitis, or confirmed Multidrug-Resistant TB.',
      preventionCounseling: [
        'Cough hygiene: Cover mouth with flexed elbow or cloth when coughing',
        'Adequate natural household ventilation: Keep windows and doors open to clear infectious droplet nuclei',
        'Screen all household contacts, especially young children under 5 years, for immediate TPT'
      ]
    },
    videoSlides: [
      {
        title: 'Presumptive Screening & GeneXpert MTB/RIF',
        timing: '00:00 - 03:10',
        keyPoints: [
          'Any cough ≥ 2 weeks requires immediate sputum GeneXpert test',
          'GeneXpert simultaneously identifies TB and checks Rifampicin resistance',
          'Mandatory HIV test for every presumptive TB client'
        ],
        badge: 'Diagnostic Standard'
      },
      {
        title: 'Weight-Based 2RHZE & 4RH Regimens',
        timing: '03:11 - 06:45',
        keyPoints: [
          '2 months intensive 4-drug FDC (Rifampicin, Isoniazid, Pyrazinamide, Ethambutol)',
          '4 months continuation 2-drug FDC (Rifampicin, Isoniazid)',
          'Always prescribe Pyridoxine 25-50mg daily to protect peripheral nerves'
        ],
        badge: 'Treatment Regimen'
      },
      {
        title: 'Adherence Support & Sputum Conversion',
        timing: '06:46 - 10:15',
        keyPoints: [
          'Never skip doses: missed doses breed drug resistance',
          'Check sputum smear at months 2, 5, and 6',
          'Red-orange urine is normal discoloration from Rifampicin; reassure patient'
        ],
        badge: 'Adherence Monitoring'
      },
      {
        title: 'Household Contact TPT & Infection Control',
        timing: '10:16 - 13:50',
        keyPoints: [
          'Provide 3HP Preventive Treatment to all children < 5 years in household',
          'Natural cross-ventilation in homes prevents transmission',
          'Stop RHZE and check LFTs immediately if patient develops yellow eyes (jaundice)'
        ],
        badge: 'Prevention & Safety'
      }
    ]
  },

  // 6. ASTHMA
  {
    id: 'ucg_asthma_06',
    title: 'Bronchial Asthma: Stepwise Inhaler Control & Acute Attack Nebulization | UCG 2023',
    diseaseName: 'Bronchial Asthma & Acute Attacks',
    category: 'Respiratory',
    summary: 'Inhaled Corticosteroids (Beclomethasone/Budesonide), Salbutamol reliever protocols, spacer device technique, and emergency acute severe asthma management with nebulizers and steroids.',
    videoDuration: '10:45',
    durationSeconds: 645,
    views: '73K',
    publishedDate: '1 month ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Ronald Mukasa',
    speakerRole: 'Senior Consultant Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC III – Hospital',
    ucgChapter: 'UCG Chapter 5: Respiratory Diseases',
    clinicalGuideline: {
      caseDefinition: 'Chronic inflammatory airway disorder with reversible airway obstruction, presenting with episodic wheezing, breathlessness, chest tightness, and cough.',
      diagnosticCriteria: [
        'Episodic, recurrent symptoms typically worse at night or early morning',
        'Symptoms triggered by exercise, dust, cold air, viral infections, or strong odors',
        'Expiratory wheeze heard on chest auscultation',
        'Peak Expiratory Flow (PEF) variability > 20% or FEV1 improvement > 12% after 200mcg inhaled salbutamol'
      ],
      investigations: [
        'Peak Expiratory Flow Rate (PEFR) measurement using handheld peak flow meter',
        'Spirometry (FEV1/FVC ratio < 0.70 confirming obstruction)',
        'Chest X-Ray (hyperinflation, rule out pneumothorax or infection)'
      ],
      firstLineMedicines: [
        'Reliever: Inhaled Salbutamol (100 mcg/puff) 1–2 puffs PRN (max 8 puffs/day)',
        'Controller (First-Line): Inhaled Beclomethasone (100–200 mcg/dose BD) or Budesonide',
        'Acute Severe Attack: Nebulized Salbutamol 2.5–5 mg in 3 mL Normal Saline every 20 minutes for 1 hour',
        'Systemic Steroids for Acute Attack: Oral Prednisolone 40–50 mg daily for 5–7 days, or IV Hydrocortisone 100–200 mg'
      ],
      treatmentProtocol: [
        'Step 1 (Mild intermittent): Inhaled Salbutamol PRN for quick relief',
        'Step 2 (Persistent): Low-dose Inhaled Corticosteroid (Beclomethasone 100-200 mcg BD) + Salbutamol PRN',
        'Step 3: Medium-dose Inhaled Corticosteroid or add Long-Acting Beta Agonist (LABA: Formoterol / Salmeterol)',
        'Acute Severe Protocol: High flow oxygen to keep SpO2 93–95% + Nebulized Salbutamol (or 10 puffs via spacer) + Oral Prednisolone 40mg immediately',
        'Teach correct inhaler technique with spacer chamber to ensure lung deposition'
      ],
      dangerSigns: [
        'Silent chest (no wheeze due to extreme airflow obstruction and exhaustion)',
        'Inability to complete sentences in one breath, cyanosis, altered mental state',
        'Peak Flow < 33% of personal best or predicted',
        'Pulsus paradoxus, exhaustion, and confusion'
      ],
      referralProtocol: 'Emergency hospital admission with continuous oxygen and intensive nebulization for any life-threatening or severe refractory asthma attack.',
      preventionCounseling: [
        'Identify and avoid known triggers: house dust mites, cat/dog fur, cockroach droppings, strong perfumes',
        'Rinse mouth with clean water and spit after using corticosteroid inhalers to prevent oral thrush',
        'Always carry a blue Salbutamol rescue inhaler when traveling or exercising'
      ]
    },
    videoSlides: [
      {
        title: 'Stepwise Asthma Diagnosis & PEFR',
        timing: '00:00 - 02:40',
        keyPoints: [
          'Recognize classic nocturnal and early morning cough and wheezing',
          'Use Peak Expiratory Flow Meter to measure airway variability',
          'Differentiate asthma from COPD in older smokers'
        ],
        badge: 'Clinical Assessment'
      },
      {
        title: 'Reliever vs Controller Inhaler Therapy',
        timing: '02:41 - 05:30',
        keyPoints: [
          'Blue inhaler (Salbutamol) is reliever for quick rescue only',
          'Brown/red inhaler (Beclomethasone) is daily controller to prevent inflammation',
          'Over-reliance on Salbutamol without steroid controller increases mortality risk'
        ],
        badge: 'Pharmacology'
      },
      {
        title: 'Correct Spacer Technique & Mouth Rinsing',
        timing: '05:31 - 07:50',
        keyPoints: [
          'Spacer devices deliver 3x more medicine into lower airways',
          'Take 5 normal breaths per single puff into spacer',
          'Rinse mouth after steroid inhaler to prevent Candida oral thrush'
        ],
        badge: 'Device Technique'
      },
      {
        title: 'Acute Attack Resuscitation: Oxygen & Nebulizers',
        timing: '07:51 - 10:45',
        keyPoints: [
          'High flow oxygen + back-to-back Salbutamol nebulization (or 10 puffs via spacer)',
          'Oral Prednisolone 40mg immediately: do not wait for attack to worsen',
          'Silent chest is an extreme medical emergency requiring ICU escalation'
        ],
        badge: 'Emergency Action'
      }
    ]
  },

  // 7. SICKLE CELL DISEASE
  {
    id: 'ucg_sickle_07',
    title: 'Sickle Cell Disease: Vaso-occlusive Crisis Analgesia & Hydroxyurea | UCG 2023',
    diseaseName: 'Sickle Cell Disease (HbSS)',
    category: 'Blood & Sickle Cell',
    summary: 'Clinical protocols from Uganda Guidelines: Rapid pain crisis relief, aggressive oral/IV hydration, Hydroxyurea dosing, Folic Acid prophylaxis, and acute splenic sequestration management.',
    videoDuration: '12:55',
    durationSeconds: 775,
    views: '65K',
    publishedDate: '1 month ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Sister Florence Nabatanzi',
    speakerRole: 'Senior Community Health Nurse & Clinical Officer',
    speakerAvatar: 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC III – Hospital (Sickle Cell Clinic)',
    ucgChapter: 'UCG Chapter 11: Blood Diseases and Blood Transfusion Guidelines',
    clinicalGuideline: {
      caseDefinition: 'Autosomal recessive hemoglobinopathy (HbSS) causing sickling of red blood cells under low oxygen tension, resulting in chronic hemolytic anemia and microvascular occlusion.',
      diagnosticCriteria: [
        'Hemoglobin Electrophoresis or High-Performance Liquid Chromatography (HPLC) confirming HbSS band',
        'Vaso-occlusive crisis (VOC): Severe acute bone/joint pain, dactylitis (painful swelling of hands/feet in infants)',
        'Chronic pallor, jaundice (scleral icterus), splenomegaly in young children, cardiomegaly'
      ],
      investigations: [
        'Complete Blood Count (CBC) with baseline Hemoglobin (usually 6–8 g/dL) and Reticulocyte count',
        'Sickling test & Hemoglobin Electrophoresis',
        'Blood Grouping and Cross-matching',
        'Malaria RDT/Blood slide (malaria is #1 trigger of crises in Uganda)'
      ],
      firstLineMedicines: [
        'Daily Prophylaxis: Folic Acid 5 mg OD (1–2.5 mg for infants)',
        'Penicillin V (Phenoxymethylpenicillin) 125–250 mg BD up to age 5 years for pneumococcal prophylaxis',
        'Disease Modifying: Hydroxyurea 15–20 mg/kg/day (increase by 5 mg/kg every 8 weeks, max 35 mg/kg/day)',
        'Pain Ladder: Mild: Paracetamol 15 mg/kg + Ibuprofen 10 mg/kg; Moderate: Tramadol 1–2 mg/kg; Severe: Morphine 0.1 mg/kg IV/SC'
      ],
      treatmentProtocol: [
        'VOC Hydration: Generous oral fluids or IV 5% Dextrose in Normal Saline at 1.5 times maintenance',
        'Prompt analgesia within 30 minutes of presentation; assess pain score frequently',
        'Investigate and treat infection aggressively (broad-spectrum IV Ceftriaxone for fever ≥ 38.5°C)',
        'Blood transfusion indications: Acute chest syndrome, stroke, sudden splenic sequestration with Hb drop > 2 g/dL below baseline, severe symptomatic anemia (Hb < 5 g/dL)'
      ],
      dangerSigns: [
        'Acute Chest Syndrome: Fever, cough, tachypnea, chest pain, new pulmonary infiltrate on chest X-ray',
        'Acute Splenic Sequestration: Rapidly enlarging painful spleen, severe pallor, shock',
        'Stroke / TIA: Sudden limb weakness, speech difficulty, facial drooping',
        'Priapism: Painful prolonged penile erection lasting > 2 hours'
      ],
      referralProtocol: 'Urgent referral to District or Regional Referral Hospital for acute chest syndrome, acute stroke, priapism, or severe splenic sequestration requiring transfusion.',
      preventionCounseling: [
        'High fluid intake: 3–4 liters daily for adults, 100–150 mL/kg for children to prevent sickling',
        'Strict adherence to Hydroxyurea dramatically reduces crises, hospitalizations, and organ damage',
        'Avoid extremes of temperature, dehydration, overexertion, and high altitudes'
      ]
    },
    videoSlides: [
      {
        title: 'Pathophysiology & Vaso-Occlusive Pain Triggers',
        timing: '00:00 - 03:15',
        keyPoints: [
          'Dehydration, malaria, cold exposure, and infections trigger cell sickling',
          'Sickled erythrocytes plug microcirculation causing severe tissue ischemia and bone pain',
          'Infant dactylitis (swollen hands and feet) is early clinical hallmark'
        ],
        badge: 'Pathology'
      },
      {
        title: 'WHO Pain Ladder & Aggressive Rehydration',
        timing: '03:16 - 06:40',
        keyPoints: [
          'Give analgesia within 30 minutes; do not leave sickle cell patients in agony',
          'Combine Paracetamol with weak opioids (Tramadol) or Morphine for severe crisis',
          'Hydrate at 1.5x maintenance with oral water or IV fluids to restore micro-perfusion'
        ],
        badge: 'Crisis Relief'
      },
      {
        title: 'Hydroxyurea: Dosing & Monitoring',
        timing: '06:41 - 09:50',
        keyPoints: [
          'Hydroxyurea increases fetal hemoglobin (HbF) and prevents cell sickling',
          'Start at 15-20 mg/kg/day; monitor CBC monthly for myelosuppression',
          'Folic Acid 5mg daily supports bone marrow erythropoiesis'
        ],
        badge: 'Disease Modification'
      },
      {
        title: 'Emergency Red Flags: Chest Syndrome & Sequestration',
        timing: '09:51 - 12:55',
        keyPoints: [
          'Acute Chest Syndrome is leading cause of mortality; requires oxygen and urgent transfusion',
          'Rapidly enlarging tender spleen in toddler indicates acute splenic pooling',
          'Never transfuse above Hb 10 g/dL to avoid dangerous hyperviscosity'
        ],
        badge: 'Emergency Triage'
      }
    ]
  },

  // 8. PRE-ECLAMPSIA & ECLAMPSIA
  {
    id: 'ucg_preeclampsia_08',
    title: 'Pre-Eclampsia & Eclampsia: Magnesium Sulphate Protocol & Delivery | UCG 2023',
    diseaseName: 'Pre-Eclampsia & Eclampsia',
    category: 'Obstetrics & Maternal',
    summary: 'Emergency obstetric care: Blood pressure thresholds, proteinuria, Magnesium Sulphate Pritchard/Zuspan loading & maintenance protocols, IV Hydralazine, and urgent delivery guidelines.',
    videoDuration: '14:05',
    durationSeconds: 845,
    views: '92K',
    publishedDate: '2 weeks ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Sister Florence Nabatanzi',
    speakerRole: 'Registered Midwife & Senior Community Nurse',
    speakerAvatar: 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC III (Pre-referral) – Hospital (Definitive)',
    ucgChapter: 'UCG Chapter 16: Obstetric Conditions',
    clinicalGuideline: {
      caseDefinition: 'New onset hypertension (BP ≥ 140/90 mmHg) occurring after 20 weeks of gestation accompanied by proteinuria and/or maternal organ dysfunction. Eclampsia is the occurrence of generalized seizures in pre-eclampsia.',
      diagnosticCriteria: [
        'Pre-eclampsia: BP ≥ 140/90 mmHg on 2 occasions 4h apart + Proteinuria (≥ 2+ on dipstick or ≥ 300 mg/24h)',
        'Severe Features: BP ≥ 160/110 mmHg, severe intractable frontal headache, visual disturbances (scotoma, blurring), epigastric/RUQ pain, thrombocytopenia (< 100 × 10⁹/L), pulmonary edema',
        'Eclampsia: Tonic-clonic convulsions in a pregnant or recently postpartum woman'
      ],
      investigations: [
        'Urine dipstick for proteinuria',
        'Full Blood Count (Platelet count < 100 × 10⁹/L indicates HELLP syndrome risk)',
        'Liver Function Tests (ALT/AST elevated > 2x normal)',
        'Serum Creatinine (> 90 µmol/L) and Uric acid',
        'Obstetric Ultrasound for fetal growth, amniotic fluid volume, and Doppler'
      ],
      firstLineMedicines: [
        'Anticonvulsant: Magnesium Sulphate (MgSO4) 50% formulation is drug of choice',
        'Antihypertensive for SBP ≥ 160 or DBP ≥ 110: Hydralazine 5 mg slow IV over 5 mins (repeat 5–10 mg every 20 mins, max 20 mg)',
        'Oral Antihypertensive: Labetalol 200 mg orally or Nifedipine 10–20 mg orally (slow release)',
        'Calcium Gluconate 10% (10 mL slow IV over 10 minutes) must be kept at bedside as antidote for Magnesium toxicity'
      ],
      treatmentProtocol: [
        'Loading Dose MgSO4 (Pritchard regimen): 4 g IV (20% solution: 8 mL of 50% MgSO4 + 12 mL sterile water) over 15–20 minutes PLUS 10 g IM (5 g of 50% solution with 1 mL 2% Lignocaine deep into each buttock)',
        'Maintenance Dose: 5 g IM into alternate buttocks every 4 hours for 24 hours after delivery or last seizure',
        'Monitor before each MgSO4 dose: Patellar (knee-jerk) reflex must be present, Respiratory rate ≥ 16/min, Urine output ≥ 30 mL/hour over past 4h',
        'Definitive Cure: Delivery of fetus and placenta within 12–24 hours for severe pre-eclampsia, or within 6–12 hours for eclampsia'
      ],
      dangerSigns: [
        'Convulsions or coma (Eclampsia)',
        'Epigastric or right upper quadrant abdominal pain (subcapsular liver hematoma)',
        'Sudden pulmonary edema with severe breathlessness and crackles',
        'Loss of patellar reflexes or respiratory rate < 16/min (Magnesium toxicity)'
      ],
      referralProtocol: 'Administer full loading dose of Magnesium Sulphate and antihypertensive before emergency referral from HC II/III to HC IV or Hospital theatre.',
      preventionCounseling: [
        'Low-dose Aspirin 75–150 mg daily starting from 12–16 weeks until 36 weeks for women at high risk of pre-eclampsia',
        'Calcium carbonate supplementation 1.5–2.0 g daily in areas with low dietary calcium intake',
        'Attend all recommended 8 Antenatal Care (ANC) contacts for blood pressure and urine screening'
      ]
    },
    videoSlides: [
      {
        title: 'Diagnostic Thresholds & Severe Features',
        timing: '00:00 - 03:15',
        keyPoints: [
          'BP ≥ 140/90 after 20 weeks gestation with 2+ proteinuria confirms pre-eclampsia',
          'Severe warning signs: Persistent headache, blurry vision, epigastric pain',
          'Urgent treatment required when BP reaches ≥ 160/110 mmHg to prevent stroke'
        ],
        badge: 'Diagnostic Staging'
      },
      {
        title: 'Magnesium Sulphate Pritchard Loading Dose',
        timing: '03:16 - 07:30',
        keyPoints: [
          '4g IV over 15-20 minutes PLUS 5g deep IM in each buttock with Lignocaine',
          'Maintenance: 5g IM alternate buttocks every 4 hours for 24 hours',
          'Always have Calcium Gluconate 10% ready as antidote'
        ],
        badge: 'Emergency Seizure Control'
      },
      {
        title: 'Toxicity Monitoring & Antihypertensive Titration',
        timing: '07:31 - 10:45',
        keyPoints: [
          'Verify knee-jerk reflex, respiratory rate > 16, and urine output > 30mL/hr before each dose',
          'Lower BP smoothly with IV Hydralazine or oral Nifedipine; avoid sudden maternal hypotension',
          'Fetal heart monitoring during hypertensive crisis'
        ],
        badge: 'Safety Checks'
      },
      {
        title: 'Timing of Delivery & Low-Dose Aspirin Prophylaxis',
        timing: '10:46 - 14:05',
        keyPoints: [
          'Delivery of placenta is the only definitive cure for pre-eclampsia',
          'Deliver within 12-24 hours for severe pre-eclampsia; 6-12 hours for eclampsia',
          'Low-dose Aspirin 75-150mg daily from week 12 prevents recurrence'
        ],
        badge: 'Definitive Management'
      }
    ]
  },

  // 9. GASTROENTERITIS & DEHYDRATION
  {
    id: 'ucg_dehydration_09',
    title: 'Acute Diarrhea & Dehydration: Plan A, B, C & Zinc Therapy | UCG 2023',
    diseaseName: 'Gastroenteritis & Dehydration',
    category: 'Childhood Illness & SAM',
    summary: 'IMNCI and Uganda Clinical Guidelines: Skin pinch and lethargy assessment, Plan A home fluids, Plan B Oral Rehydration Salts (ORS) calculation, Plan C IV Ringer’s Lactate, and 14-day Zinc therapy.',
    videoDuration: '11:15',
    durationSeconds: 675,
    views: '83K',
    publishedDate: '3 weeks ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Sister Florence Nabatanzi',
    speakerRole: 'Senior Community Health Nurse & Clinical Officer',
    speakerAvatar: 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC II – Hospital',
    ucgChapter: 'UCG Chapter 1 (Emergencies) & Chapter 17 (Childhood Illness)',
    clinicalGuideline: {
      caseDefinition: 'Passage of 3 or more loose or watery stools per day, leading to water and electrolyte depletion classified as No Dehydration, Some Dehydration, or Severe Dehydration.',
      diagnosticCriteria: [
        'No Dehydration: Alert, normal eyes, drinks normally, skin pinch goes back immediately',
        'Some Dehydration: Restless/irritable, sunken eyes, drinks eagerly/thirsty, skin pinch goes back slowly (< 2 seconds)',
        'Severe Dehydration: Lethargic or unconscious, very sunken eyes, unable to drink or drinking poorly, skin pinch goes back very slowly (> 2 seconds)'
      ],
      investigations: [
        'Clinical hydration assessment (skin pinch on abdomen, radial pulse, fontanelle in infants)',
        'Stool microscopy (rule out Amoebiasis, Giardiasis, or Cholera vibrios if rice-water stool)',
        'Serum electrolytes (Sodium, Potassium, Chloride) in severe dehydration',
        'Blood Glucose to identify secondary hypoglycemia'
      ],
      firstLineMedicines: [
        'Low-Osmolarity Oral Rehydration Salts (ORS): 1 sachet dissolved in exactly 1 Liter of clean drinking water',
        'Zinc Sulfate: Children < 6 months: 10 mg once daily for 10–14 days; Children ≥ 6 months: 20 mg once daily for 10–14 days',
        'Severe Dehydration IV Fluid: Ringer’s Lactate (or Normal Saline 0.9% if RL unavailable)',
        'Antibiotics ONLY indicated for bloody diarrhea / Dysentery (Ciprofloxacin) or suspected Cholera (Doxycycline or Azithromycin)'
      ],
      treatmentProtocol: [
        'Plan A (Home Treatment): Give extra fluids (ORS, clean water, soup), continue frequent breastfeeding/feeding, give Zinc for 14 days',
        'Plan B (Some Dehydration): Give 75 mL/kg ORS over 4 hours in clinic; reassess after 4 hours and classify hydration status',
        'Plan C (Severe Dehydration IV): Total 100 mL/kg Ringer\'s Lactate. Age < 12 months: 30 mL/kg in 1 hour, then 70 mL/kg in 5 hours (total 6 hours). Age ≥ 12 months: 30 mL/kg in 30 minutes, then 70 mL/kg in 2.5 hours (total 3 hours)',
        'Give ORS (5 mL/kg/hour) as soon as patient can drink, even while IV infusion continues'
      ],
      dangerSigns: [
        'Lethargy, floppiness, or convulsions',
        'Inability to drink or retain any fluids due to persistent vomiting',
        'Severe sunken eyes and depressed anterior fontanelle',
        'Bloody stools accompanied by high fever (bacillary dysentery)'
      ],
      referralProtocol: 'Immediate referral to HC III/IV if unable to set up IV line in severe dehydration, or if severe dehydration occurs in child with Severe Acute Malnutrition (SAM).',
      preventionCounseling: [
        'Rotavirus vaccination at 6 and 10 weeks of age',
        'Wash hands with clean running water and soap before preparing food and after using latrines',
        'Boil all household drinking water and store in narrow-neck containers'
      ]
    },
    videoSlides: [
      {
        title: 'Skin Pinch & IMNCI Hydration Classification',
        timing: '00:00 - 02:45',
        keyPoints: [
          'Perform skin pinch on abdomen halfway between umbilicus and side',
          'Classify accurately: No, Some, or Severe Dehydration',
          'Sunken eyes and extreme thirst signal Some Dehydration'
        ],
        badge: 'Triage & Staging'
      },
      {
        title: 'Plan A (Home Fluids) & 14-Day Zinc Course',
        timing: '02:46 - 05:20',
        keyPoints: [
          'Mix 1 ORS sachet into exactly 1 liter clean water',
          'Give Zinc for full 10-14 days: repairs intestinal villi and prevents relapses for 3 months',
          'Never give antidiarrheal antimotility drugs (e.g. Loperamide) to children'
        ],
        badge: 'Plan A & Zinc'
      },
      {
        title: 'Plan B: 75 mL/kg ORS Calculation in Clinic',
        timing: '05:21 - 07:50',
        keyPoints: [
          'Calculate: Child weight (kg) × 75 mL given in small sips over 4 hours',
          'If child vomits, wait 10 minutes then continue giving ORS more slowly',
          'Reassess hydration status completely at the 4-hour mark'
        ],
        badge: 'Plan B Protocol'
      },
      {
        title: 'Plan C: IV Ringer’s Lactate Resuscitation',
        timing: '07:51 - 11:15',
        keyPoints: [
          'Infuse 100 mL/kg Ringer\'s Lactate (rapid 30mL/kg bolus then maintenance)',
          'Check pulse and hydration status every 15-30 minutes',
          'Special caution in SAM children: use ReSoMal orally instead of standard IV fluids'
        ],
        badge: 'Plan C Emergency'
      }
    ]
  },

  // 10. SEVERE ACUTE MALNUTRITION (SAM)
  {
    id: 'ucg_sam_10',
    title: 'Severe Acute Malnutrition (SAM): F-75, F-100 & ReSoMal Protocols | UCG 2023',
    diseaseName: 'Severe Acute Malnutrition (SAM)',
    category: 'Childhood Illness & SAM',
    summary: 'Uganda Clinical Guidelines 10-step protocol: Bilateral pitting edema assessment, MUAC < 11.5 cm, appetite test, hypoglycemia/hypothermia prevention, F-75 stabilization, and RUTF transition.',
    videoDuration: '13:20',
    durationSeconds: 800,
    views: '61K',
    publishedDate: '1 month ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Sister Florence Nabatanzi',
    speakerRole: 'Senior Community Health Nurse & Clinical Officer',
    speakerAvatar: 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC III – Hospital (Nutrition Unit)',
    ucgChapter: 'UCG Chapter 19: Nutrition',
    clinicalGuideline: {
      caseDefinition: 'Severe wasting (weight-for-height Z-score < -3 SD or Mid-Upper Arm Circumference MUAC < 11.5 cm) and/or nutritional bilateral pitting edema (Kwashiorkor, Marasmus, or Marasmic-Kwashiorkor).',
      diagnosticCriteria: [
        'Bilateral pitting edema of feet/legs (Grade +: feet; Grade ++: feet and lower legs; Grade +++: generalized including face)',
        'MUAC < 11.5 cm in children aged 6–59 months (red zone on tri-color tape)',
        'Weight-for-Height Z-score < -3 SD (WHO Growth Standards chart)',
        'Appetite Test: Child fails to eat prescribed quantity of Ready-to-Use Therapeutic Food (RUTF) in a calm setting'
      ],
      investigations: [
        'Blood Glucose test immediately (hypoglycemia < 3.0 mmol/L is common cause of death)',
        'Axillary temperature (hypothermia < 35.5°C)',
        'Hemoglobin / hematocrit check (severe anemia Hb < 4 g/dL)',
        'Malaria RDT and HIV rapid antibody test'
      ],
      firstLineMedicines: [
        'Hypoglycemia treatment: 10% Dextrose 5 mL/kg IV or orally/nasogastric tube',
        'Broad-spectrum antibiotic for all inpatient SAM: Oral Amoxicillin 40 mg/kg BD for 5 days (or IV Ampicillin + Gentamicin if complicated)',
        'Vitamin A single high dose on Day 1 (if no edema and no dose in last 1 month)',
        'Folic Acid 5 mg on Day 1, then 1 mg daily',
        'Deworming with Albendazole (single dose 200mg for 12–23mo, 400mg for ≥ 24mo) on Day 7'
      ],
      treatmentProtocol: [
        'Stabilization Phase (Days 1–7): Feed with F-75 formula (75 kcal & 0.9g protein per 100 mL) 130 mL/kg/day split into 2-hourly feeds (8–12 feeds/24h)',
        'Never use standard IV fluids or high protein foods in stabilization: precipitates acute heart failure',
        'For dehydration: Use ReSoMal (Rehydration Solution for Malnutrition) 5 mL/kg every 30 minutes for first 2 hours, then 5–10 mL/kg/hour alternate hours with F-75',
        'Transition & Catch-up Phase: Once appetite returns and edema subsides, transition to F-100 or RUTF (Plumpy’Nut)'
      ],
      dangerSigns: [
        'Hypothermia: Body temperature falling < 35.5°C (keep child warm using Kangaroo Mother Care)',
        'Severe lethargy, floppiness, or sudden collapse',
        'Signs of heart failure: Rapid breathing > 50/min, engorged neck veins, gallop rhythm (stop fluids/feeds immediately)'
      ],
      referralProtocol: 'Admit directly to Inpatient Nutrition Rehabilitation Unit (TFC) at HC IV or Hospital for any SAM child with bilateral edema +++ or failed appetite test.',
      preventionCounseling: [
        'Promote exclusive breastfeeding for first 6 months, continuing up to 2 years and beyond',
        'Enriched complementary feeding starting at 6 months: Porridge fortified with groundnut paste (odii), mashed beans, avocado, and eggs',
        'Routine growth monitoring and Vitamin A supplementation every 6 months'
      ]
    },
    videoSlides: [
      {
        title: 'Bilateral Edema & Red-Zone MUAC Screening',
        timing: '00:00 - 03:10',
        keyPoints: [
          'Press both thumbs on tops of feet for 3 seconds: pitting confirms Kwashiorkor',
          'MUAC < 11.5 cm on red tape confirms severe wasting',
          'Conduct standardized RUTF appetite test in quiet room'
        ],
        badge: 'Screening Standards'
      },
      {
        title: 'Treat Hypoglycemia & Prevent Hypothermia',
        timing: '03:11 - 06:20',
        keyPoints: [
          'Hypoglycemia (< 3.0 mmol/L) kills quickly: give 10% Dextrose immediately',
          'Keep child warm: wrap in warm clothes and practice skin-to-skin Kangaroo care',
          'Routine broad-spectrum antibiotic for all SAM children even without fever'
        ],
        badge: 'Life-Saving Triage'
      },
      {
        title: 'F-75 Stabilization Dosing & ReSoMal Rules',
        timing: '06:21 - 09:45',
        keyPoints: [
          'F-75 formula provides low protein/sodium (130 mL/kg/day across 8-12 feeds)',
          'Never give standard IV fluids; use ReSoMal orally for dehydration',
          'Monitor respiratory rate: increasing tachypnea signals fluid overload and heart failure'
        ],
        badge: 'Stabilization Protocol'
      },
      {
        title: 'RUTF Transition & Community Growth Monitoring',
        timing: '09:46 - 13:20',
        keyPoints: [
          'Transition to RUTF (Plumpy\'Nut) once edema resolves and appetite returns',
          'Fortify home porridge with peanut paste (odii), eggs, and milk',
          'Deworming and Vitamin A catch-up'
        ],
        badge: 'Recovery & Nutrition'
      }
    ]
  },

  // 11. HEART FAILURE
  {
    id: 'ucg_hf_11',
    title: 'Heart Failure & Pulmonary Edema: Furosemide, ACE-I & Beta Blockers | UCG 2023',
    diseaseName: 'Heart Failure & Acute Congestion',
    category: 'Cardiovascular',
    summary: 'Uganda Clinical Guidelines protocol: Framingham diagnostic criteria, IV Furosemide for acute pulmonary congestion, Enalapril and Carvedilol titration, and strict fluid-salt restriction.',
    videoDuration: '12:30',
    durationSeconds: 750,
    views: '58K',
    publishedDate: '1 month ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Ronald Mukasa',
    speakerRole: 'Senior Consultant Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC IV – Hospital',
    ucgChapter: 'UCG Chapter 4: Cardiovascular Diseases',
    clinicalGuideline: {
      caseDefinition: 'Clinical syndrome caused by structural or functional cardiac abnormality, resulting in elevated intracardiac pressures or reduced cardiac output.',
      diagnosticCriteria: [
        'Major Criteria: Paroxysmal nocturnal dyspnea, orthopnea, elevated jugular venous pressure (JVP), pulmonary rales/crackles, cardiomegaly on chest X-ray',
        'Minor Criteria: Bilateral ankle edema, nocturnal cough, dyspnea on ordinary exertion, hepatomegaly, tachycardia (> 120 bpm)'
      ],
      investigations: [
        'Echocardiography (essential to determine ejection fraction, valve abnormalities, or pericardial effusion)',
        'Chest X-Ray (cardiothoracic ratio > 50%, upper lobe diversion, Kerley B lines)',
        'Electrocardiogram (ECG) to assess rhythm, ischemia, or hypertrophy',
        'Serum Creatinine, Urea, and Electrolytes'
      ],
      firstLineMedicines: [
        'Loop Diuretic for Congestion: Furosemide 40–80 mg IV bolus in acute pulmonary edema; 40–80 mg oral daily maintenance',
        'ACE-Inhibitor (Core Survival Drug): Enalapril 2.5 mg BD, titrating up to 10–20 mg BD',
        'Beta-Blocker (Start only when stable/euvolimic): Carvedilol 3.125 mg BD (double every 2 weeks to target 25 mg BD) or Bisoprolol 1.25–10 mg OD',
        'Mineralocorticoid Receptor Antagonist (MRA): Spironolactone 25 mg OD'
      ],
      treatmentProtocol: [
        'Acute Pulmonary Edema: Sit patient upright with legs dangling + High-flow oxygen + IV Furosemide 40–80 mg + Sublingual Nitroglycerin spray',
        'Chronic Maintenance Triple Therapy: ACE-Inhibitor (Enalapril) + Beta-Blocker (Carvedilol) + Spironolactone + Furosemide titrated to lowest dose that maintains dry weight',
        'Strict salt restriction (< 2 g/day) and daily morning weight tracking in VitaNova app'
      ],
      dangerSigns: [
        'Severe acute dyspnea and orthopnea with pink frothy sputum (flash pulmonary edema)',
        'Syncope, ventricular tachycardia, or extreme bradycardia (< 40 bpm)',
        'Hypotension (SBP < 90 mmHg) with cold clammy extremities (cardiogenic shock)'
      ],
      referralProtocol: 'Urgent referral to Regional Referral Hospital / Uganda Heart Institute for Echocardiography and specialist cardiology evaluation.',
      preventionCounseling: [
        'Strict medication adherence; never stop beta-blockers or ACE-inhibitors abruptly',
        'Daily morning weight monitoring: a gain of > 2 kg in 3 days indicates fluid accumulation requiring increased diuretic dose'
      ]
    },
    videoSlides: [
      {
        title: 'Framingham Diagnostic Criteria & JVP',
        timing: '00:00 - 03:00',
        keyPoints: [
          'Assess JVP at 45 degrees; check for bilateral ankle pitting edema and lung crackles',
          'Evaluate orthopnea (how many pillows does patient sleep on?)',
          'Distinguish heart failure from primary lung disease'
        ],
        badge: 'Clinical Assessment'
      },
      {
        title: 'Acute Pulmonary Edema Resuscitation',
        timing: '03:01 - 06:15',
        keyPoints: [
          'Sit patient fully upright; legs hanging down reduces venous return',
          'IV Furosemide 40-80mg slow bolus initiates rapid venodilation and diuresis',
          'High-flow oxygen via non-rebreather mask'
        ],
        badge: 'Emergency Action'
      },
      {
        title: 'The 3 Pillar Drugs for Long-Term Survival',
        timing: '06:16 - 09:30',
        keyPoints: [
          'ACE-Inhibitor (Enalapril) reduces afterload and cardiac remodeling',
          'Carvedilol beta-blocker improves ejection fraction (start low and go slow)',
          'Spironolactone 25mg blocks aldosterone-induced cardiac fibrosis'
        ],
        badge: 'Pharmacology'
      },
      {
        title: 'Salt Restriction & Fluid Intake Rules',
        timing: '09:31 - 12:30',
        keyPoints: [
          'Strict salt restriction: zero added table salt',
          'Weight log: 2kg weight gain in 48 hours means fluid retention',
          'Refer to Uganda Heart Institute for echo and surgical evaluation'
        ],
        badge: 'Self-Care'
      }
    ]
  },

  // 12. ANAPHYLACTIC SHOCK
  {
    id: 'ucg_anaphylaxis_12',
    title: 'Anaphylaxis & Acute Allergic Shock: Adrenaline 1:1,000 Algorithm | UCG 2023',
    diseaseName: 'Anaphylactic Shock & Severe Allergy',
    category: 'Emergencies & Trauma',
    summary: 'Emergency resuscitation protocol: Immediate IM Adrenaline 1:1,000 mid-outer thigh injection, airway maintenance, IV fluid expansion, and secondary corticosteroids per UCG 2023.',
    videoDuration: '09:50',
    durationSeconds: 590,
    views: '77K',
    publishedDate: '2 months ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Ronald Mukasa',
    speakerRole: 'Senior Consultant Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC II – Hospital (Emergency Kit)',
    ucgChapter: 'UCG Chapter 1: Emergencies and Trauma',
    clinicalGuideline: {
      caseDefinition: 'Severe, life-threatening, generalized or systemic hypersensitivity reaction with rapid onset of airway compromise, breathing difficulty, or circulatory collapse.',
      diagnosticCriteria: [
        'Acute onset (minutes to hours) of skin/mucosal changes (hives, itching, flushed skin, swollen lips/tongue/uvula) PLUS at least one of: Respiratory compromise (stridor, wheeze, hypoxemia) OR Reduced BP / shock',
        'Common triggers: Injectable antibiotics (penicillins), insect stings (wasps, bees), vaccines, or foods (peanuts, eggs)'
      ],
      investigations: [
        'Clinical diagnosis: NEVER delay adrenaline injection for any laboratory investigation',
        'Continuous pulse oximetry, blood pressure, and ECG monitoring'
      ],
      firstLineMedicines: [
        'FIRST-LINE DRUG: Intramuscular Adrenaline (Epinephrine) 1:1,000 (1 mg/mL) injected into anterolateral thigh',
        'Adrenaline Dose Adult: 0.5 mL (0.5 mg) IM; Child 6–12 years: 0.3 mL (0.3 mg) IM; Child < 6 years: 0.15 mL (0.15 mg) IM',
        'Repeat Adrenaline every 5–15 minutes if no clinical improvement',
        'IV Fluids: Rapid crystalloid bolus (Normal Saline 0.9% 1–2 Liters in adults; 20 mL/kg in children)'
      ],
      treatmentProtocol: [
        'Remove trigger immediately (e.g. stop IV infusion, remove bee stinger without squeezing)',
        'Position patient supine with legs elevated (unless airway distress requires sitting up; do not stand the patient up suddenly)',
        'Inject Adrenaline 1:1,000 IM immediately into mid-anterolateral thigh',
        'High-flow 100% oxygen via face mask with reservoir bag at 10–15 L/min',
        'Secondary medications (after adrenaline and fluids): IV Hydrocortisone 200 mg (children 4 mg/kg) + IV Chlorpheniramine 10 mg (children 2.5–5 mg)'
      ],
      dangerSigns: [
        'Stridor and laryngeal edema (complete upper airway obstruction requiring urgent surgical cricothyroidotomy)',
        'Unresponsive hypotension and cardiac arrest',
        'Biphasic reaction (recurrence of anaphylaxis 4–8 hours after initial resolution)'
      ],
      referralProtocol: 'Transfer by emergency ambulance to nearest hospital intensive care unit after administering adrenaline and running IV fluids.',
      preventionCounseling: [
        'Document and label penicillin/drug allergies prominently on medical records and patient health cards',
        'Prescribe auto-injector (EpiPen) for patients with history of severe insect venom or food anaphylaxis'
      ]
    },
    videoSlides: [
      {
        title: 'Rapid Recognition & Trigger Removal',
        timing: '00:00 - 02:15',
        keyPoints: [
          'Recognize rapid onset: urticaria, lip/tongue swelling, stridor, and collapse',
          'Stop offending IV medication or remove sting immediately',
          'Lay patient flat and elevate legs; never allow patient to stand'
        ],
        badge: 'Emergency Triage'
      },
      {
        title: 'Intramuscular Adrenaline 1:1,000 Dosing',
        timing: '02:16 - 05:00',
        keyPoints: [
          'Adult dose: 0.5mg (0.5 mL) IM mid-outer thigh (vastus lateralis)',
          'Child dose: 0.15 - 0.3mg based on age/weight',
          'Repeat every 5 to 15 minutes if symptoms persist'
        ],
        badge: 'Life-Saving Drug'
      },
      {
        title: 'IV Fluid Resuscitation & High-Flow Oxygen',
        timing: '05:01 - 07:20',
        keyPoints: [
          'Give 1-2 Liters Normal Saline bolus to counter massive vasodilatory shock',
          'High flow oxygen (10-15 L/min) via non-rebreather mask',
          'Prepare for definitive airway (endotracheal tube or cricothyroidotomy) if stridor worsens'
        ],
        badge: 'Shock Reversal'
      },
      {
        title: 'Secondary Medications & Biphasic Monitoring',
        timing: '07:21 - 09:50',
        keyPoints: [
          'IV Hydrocortisone 200mg and Chlorpheniramine 10mg prevent biphasic recurrence',
          'Observe all anaphylaxis patients in hospital for at least 8 to 24 hours',
          'Label patient EMR record with Critical Allergy Alert'
        ],
        badge: 'Observation'
      }
    ]
  },
  // 13. POST-PARTUM HEMORRHAGE (PPH)
  {
    id: 'ucg_pph_13',
    title: 'Post-Partum Hemorrhage (PPH): AMTSL, Oxytocin & Tranexamic Acid | UCG 2023',
    diseaseName: 'Post-Partum Hemorrhage (PPH)',
    category: 'Obstetrics & Maternal',
    summary: 'Active Management of the Third Stage of Labour (AMTSL): Prophylactic Oxytocin 10 IU IM, uterine massage, Tranexamic Acid 1g IV, Misoprostol, and bimanual compression per UCG 2023.',
    videoDuration: '13:40',
    durationSeconds: 820,
    views: '89K',
    publishedDate: '3 weeks ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Sister Florence Nabatanzi',
    speakerRole: 'Registered Midwife & Senior Community Nurse',
    speakerAvatar: 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC II – Hospital Theatre',
    ucgChapter: 'UCG Chapter 16: Obstetric Conditions',
    clinicalGuideline: {
      caseDefinition: 'Blood loss >= 500 mL following vaginal delivery or >= 1,000 mL following caesarean section, or any blood loss sufficient to cause hemodynamic instability.',
      diagnosticCriteria: [
        'Primary PPH: Occurs within 24 hours of childbirth (most common causes: 4 Ts - Tone 70%, Trauma 20%, Tissue 10%, Thrombin 1%)',
        'Tachycardia (pulse > 100 bpm), hypotension (systolic BP < 90 mmHg), pallor, sweating, altered consciousness',
        'Bimanual uterine palpation: Soft, boggy, non-contracted uterus indicates uterine atony'
      ],
      investigations: [
        'Hemoglobin / hematocrit and urgent Blood Grouping & Cross-matching (at least 2 units of whole blood / packed red cells)',
        'Bedside clotting test (failure of whole blood to clot in dry glass tube in 7 minutes indicates coagulopathy)',
        'Inspection of cervix, vagina, and perineum under good lighting to rule out genital tract lacerations'
      ],
      firstLineMedicines: [
        'Oxytocin 10 IU IM immediately with delivery of anterior shoulder or within 1 minute of infant delivery (AMTSL)',
        'First-line PPH Treatment: Oxytocin 20–40 IU in 1 Liter Normal Saline or Ringer\'s Lactate at 60 drops/min',
        'Tranexamic Acid (TXA): 1 g IV slow over 10 minutes given within 3 hours of birth',
        'Misoprostol: 800 mcg sublingually or rectally if Oxytocin is unavailable or bleeding continues'
      ],
      treatmentProtocol: [
        'Call for help immediately and massage the uterine fundus continuously until firm',
        'Insert two large-bore IV cannulae (14G or 16G) and infuse 1 Liter crystalloids rapidly',
        'Administer Oxytocin infusion + Tranexamic Acid 1g IV within 3 hours',
        'Catheterize bladder with Foley catheter to keep bladder empty',
        'Perform external/internal bimanual uterine compression or uterine balloon tamponade (condom catheter) while preparing theatre'
      ],
      dangerSigns: [
        'Unresponsive hypovolemic shock (systolic BP < 70 mmHg, unrecordable pulse)',
        'Disseminated Intravascular Coagulation (uncontrolled bleeding from puncture sites and surgical wounds)',
        'Loss of consciousness and respiratory arrest'
      ],
      referralProtocol: 'Emergency surgical referral to HC IV or Hospital theatre with two wide-bore IV lines running and a compression balloon in situ if bleeding persists after medical uterotonics.',
      preventionCounseling: [
        'Strict routine Active Management of the Third Stage of Labour (AMTSL) for EVERY delivery across all health units in Uganda',
        'Antenatal screening and correction of maternal anemia (aim for Hb >= 11 g/dL at term)'
      ]
    },
    videoSlides: [
      {
        title: 'The 4 Ts of PPH & Atony Recognition',
        timing: '00:00 - 03:20',
        keyPoints: [
          '70% of PPH is due to uterine atony (Tone)',
          'Check for genital lacerations (Trauma) and retained cotyledons (Tissue)',
          'Assess hemodynamic shock early before blood pressure crashes'
        ],
        badge: 'Etiology & Triage'
      },
      {
        title: 'Uterotonic Protocol: Oxytocin, TXA & Misoprostol',
        timing: '03:21 - 06:45',
        keyPoints: [
          'High-dose Oxytocin 20-40 IU in 1 Liter crystalloids',
          'Give Tranexamic Acid 1g IV within 3 hours of delivery',
          'Sublingual Misoprostol 800mcg if temperature storage compromised'
        ],
        badge: 'Pharmacology'
      },
      {
        title: 'Bimanual Compression & Uterine Balloon Tamponade',
        timing: '06:46 - 10:15',
        keyPoints: [
          'Continuous bimanual uterine compression controls hemorrhage mechanically',
          'Condom balloon tamponade inflated with 300-500mL sterile saline',
          'Catheterize bladder with Foley catheter'
        ],
        badge: 'Mechanical Hemostasis'
      },
      {
        title: 'Emergency Blood Transfusion & Theater Escalation',
        timing: '10:16 - 13:40',
        keyPoints: [
          'Cross-match and transfuse whole blood early in severe shock',
          'Surgical interventions: B-Lynch brace suture or subtotal hysterectomy',
          'AMTSL prevention saves maternal lives'
        ],
        badge: 'Surgical Referral'
      }
    ]
  },

  // 14. URINARY TRACT INFECTIONS (UTI)
  {
    id: 'ucg_uti_14',
    title: 'Urinary Tract Infections (UTI): Cystitis to Acute Pyelonephritis | UCG 2023',
    diseaseName: 'Urinary Tract Infections (UTI)',
    category: 'Renal & Urinary',
    summary: 'Uganda Clinical Guidelines: Urine dipstick leukocyte/nitrite interpretation, Nitrofurantoin and Ciprofloxacin first-line oral regimens, and IV Ceftriaxone for inpatient pyelonephritis.',
    videoDuration: '10:55',
    durationSeconds: 655,
    views: '67K',
    publishedDate: '1 month ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Peter Kigozi',
    speakerRole: 'Consultant Clinical Pathologist & Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC II – Hospital',
    ucgChapter: 'UCG Chapter 7: Renal and Urinary Diseases',
    clinicalGuideline: {
      caseDefinition: 'Bacterial infection of the urinary tract (bladder: cystitis; kidneys: pyelonephritis), predominantly caused by uropathogenic Escherichia coli.',
      diagnosticCriteria: [
        'Uncomplicated Cystitis: Dysuria (painful urination), frequency, urgency, suprapubic pain, cloudy foul-smelling urine',
        'Acute Pyelonephritis: High fever (>= 38.5°C), rigors, nausea/vomiting, and costovertebral angle (loin) tenderness',
        'Asymptomatic Bacteriuria: Significant bacterial growth in pregnancy without symptoms (must be treated to prevent preterm labour)'
      ],
      investigations: [
        'Urine Dipstick: Positive leukocyte esterase and positive nitrites strongly predictive of bacterial UTI',
        'Urine Microscopy: Pus cells (pyuria > 10 WBC/hpf) and bacteria on midstream clean-catch sample',
        'Urine Culture and Antibiotic Sensitivity (for recurrent UTI, pregnancy, or pyelonephritis)',
        'Renal ultrasound for recurrent infections to rule out nephrolithiasis or anatomical obstruction'
      ],
      firstLineMedicines: [
        'Uncomplicated Lower UTI (Adults): Nitrofurantoin 100 mg BD for 5 days (safe in pregnancy except at term 36+ weeks)',
        'Alternative Lower UTI: Ciprofloxacin 500 mg BD for 3 days or Amoxicillin/Clavulanic Acid 625 mg BD for 5 days',
        'Acute Pyelonephritis (Outpatient): Ciprofloxacin 500 mg BD for 10–14 days',
        'Acute Pyelonephritis (Severe Inpatient): IV Ceftriaxone 1–2 g once daily for 7–14 days'
      ],
      treatmentProtocol: [
        'Ensure proper mid-stream clean catch collection before starting antibiotics',
        'Encourage high oral fluid intake (at least 2.5–3 Liters of clean drinking water daily) to flush urinary bladder',
        'Provide urinary analgesia: Paracetamol 1g TDS for dysuria relief',
        'In pregnancy, always perform repeat test of cure 1 week after completing antibiotic treatment'
      ],
      dangerSigns: [
        'Severe flank/loin pain with high spiking fever and rigors (acute pyelonephritis)',
        'Septic shock: Hypotension, tachycardia, altered mental state',
        'Complete urinary retention or acute anuria (< 400 mL urine in 24 hours)'
      ],
      referralProtocol: 'Admit to HC IV or District Hospital for pregnant women with pyelonephritis, patients unable to retain oral medications, or suspected urosepsis.',
      preventionCounseling: [
        'Wipe perineum from front to back after defecation to avoid introducing coliform bacteria into urethra',
        'Urinate promptly after sexual intercourse and avoid postponing voiding when bladder is full',
        'Avoid perfumed intimate washes, bubble baths, and harsh soaps in genital area'
      ]
    },
    videoSlides: [
      {
        title: 'Dipstick Screening: Leukocyte & Nitrite Tests',
        timing: '00:00 - 02:40',
        keyPoints: [
          'Collect clean-catch midstream urine in sterile container',
          'Nitrite positive indicates Gram-negative enteric bacteria (E. coli)',
          'Distinguish lower urinary cystitis from upper tract pyelonephritis'
        ],
        badge: 'Diagnostic Lab'
      },
      {
        title: 'Nitrofurantoin vs Ciprofloxacin Regimens',
        timing: '02:41 - 05:30',
        keyPoints: [
          'Nitrofurantoin 100mg BD for 5 days has minimal collateral resistance',
          'Avoid Ciprofloxacin in pregnancy; use Nitrofurantoin or Amox/Clav',
          'Complete full 5-day course to prevent recurrent bacterial relapse'
        ],
        badge: 'Antibiotic Selection'
      },
      {
        title: 'Acute Pyelonephritis Inpatient Management',
        timing: '05:31 - 08:15',
        keyPoints: [
          'High fever and flank tenderness require IV Ceftriaxone 1-2g OD',
          'Hydrate generously with IV Normal Saline',
          'Switch to oral therapy once patient is afebrile for 48 hours'
        ],
        badge: 'Inpatient Care'
      },
      {
        title: 'Asymptomatic Bacteriuria in Pregnancy & Hygiene',
        timing: '08:16 - 10:55',
        keyPoints: [
          'Treat asymptomatic bacteriuria in pregnant women to prevent preterm labor',
          'Drink 2.5 to 3 Liters clean water daily',
          'Front-to-back wiping hygiene education'
        ],
        badge: 'Maternal Safety'
      }
    ]
  },

  // 15. PEPTIC ULCER DISEASE
  {
    id: 'ucg_pud_15',
    title: 'Peptic Ulcer Disease & H. Pylori: 14-Day Triple Therapy Protocol | UCG 2023',
    diseaseName: 'Peptic Ulcer Disease & Dyspepsia',
    category: 'Gastrointestinal & Hepatic',
    summary: 'Uganda Clinical Guidelines: Epigastric burning pain, NSAID ulceration, H. pylori eradication with Omeprazole + Amoxicillin + Clarithromycin, and upper GI bleed triage.',
    videoDuration: '11:30',
    durationSeconds: 690,
    views: '78K',
    publishedDate: '1 month ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Ronald Mukasa',
    speakerRole: 'Senior Consultant Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC III – Hospital',
    ucgChapter: 'UCG Chapter 6: Gastrointestinal and Hepatic Diseases',
    clinicalGuideline: {
      caseDefinition: 'Breach in mucosal lining of stomach (gastric ulcer) or first part of small intestine (duodenal ulcer), largely attributable to Helicobacter pylori infection or chronic NSAID use.',
      diagnosticCriteria: [
        'Epigastric gnawing, burning pain related to meals (duodenal ulcer pain relieved by food, gastric ulcer pain aggravated by food)',
        'Dyspepsia: Bloating, early satiety, post-prandial fullness, belching, and nausea',
        'History of long-term self-medication with NSAIDs (Ibuprofen, Diclofenac, Aspirin)'
      ],
      investigations: [
        'H. pylori Stool Antigen Test (HpSA) or 13C-Urea Breath Test',
        'Upper Gastrointestinal Endoscopy (OGD) with mucosal biopsy for alarm symptoms or patients aged >= 45 years',
        'Complete Blood Count to detect iron deficiency anemia from chronic occult bleeding',
        'Erect abdominal X-ray to check for free air under diaphragm in suspected ulcer perforation'
      ],
      firstLineMedicines: [
        '14-Day H. Pylori Triple Therapy: Proton Pump Inhibitor (Omeprazole 20 mg BD or Esomeprazole 20 mg BD) PLUS Amoxicillin 1 g BD PLUS Clarithromycin 500 mg BD for 14 days',
        'Penicillin-Allergic Triple Therapy: Omeprazole 20 mg BD + Clarithromycin 500 mg BD + Metronidazole 400 mg BD for 14 days',
        'Severe Upper GI Bleeding: IV Omeprazole 80 mg bolus, followed by continuous infusion 8 mg/hour for 72 hours',
        'Maintenance: Omeprazole 20 mg once daily for 4–8 weeks after eradication'
      ],
      treatmentProtocol: [
        'Emphasize strict compliance with 14-day antibiotic triple therapy to prevent resistant H. pylori strains',
        'Immediately stop all NSAIDs, aspirin, and non-prescription herbal mixtures',
        'Upper GI Bleeding Resuscitation: Two wide-bore IV lines + IV crystalloids + IV Omeprazole + urgent cross-matching of blood',
        'Confirm H. pylori eradication with stool antigen test at least 4 weeks after finishing antibiotics and 2 weeks off PPI'
      ],
      dangerSigns: [
        'Hematemesis: Vomiting fresh red blood or dark "coffee-ground" material',
        'Melena: Passage of black, tarry, foul-smelling stools',
        'Acute Perforation: Sudden severe generalized peritonitis with "board-like" abdominal rigidity',
        'Gastric Outlet Obstruction: Intractable recurrent vomiting of undigested food eaten hours earlier'
      ],
      referralProtocol: 'Emergency referral to Hospital with surgical and endoscopic capabilities for active upper GI bleeding, suspected perforation, or gastric outlet obstruction.',
      preventionCounseling: [
        'Avoid self-prescription of Diclofenac and Ibuprofen for chronic body aches; use Paracetamol instead',
        'Avoid smoking, raw spirits/alcohol, and highly acidic concentrated drinks which erode protective gastric mucus',
        'Eat small, regular meals rather than starving all day and bingeing at night'
      ]
    },
    videoSlides: [
      {
        title: 'Gastric vs Duodenal Ulcer Presentation',
        timing: '00:00 - 02:50',
        keyPoints: [
          'Duodenal ulcers hunger pain relieved by eating food or antacids',
          'Gastric ulcer pain worsens after meals; causes appetite avoidance and weight loss',
          'Role of Helicobacter pylori bacterium in disrupting mucus barrier'
        ],
        badge: 'Clinical Assessment'
      },
      {
        title: '14-Day H. Pylori Triple Therapy Regimen',
        timing: '02:51 - 06:15',
        keyPoints: [
          'Omeprazole 20mg BD + Amoxicillin 1g BD + Clarithromycin 500mg BD',
          'Full 14 days required for > 85% cure rates in Uganda',
          'Metronidazole substitution for penicillin-allergic individuals'
        ],
        badge: 'Eradication Protocol'
      },
      {
        title: 'Managing NSAID-Induced Gastropathy',
        timing: '06:16 - 08:45',
        keyPoints: [
          'Stop chronic Diclofenac and Ibuprofen immediately',
          'Prescribe PPI co-therapy if antiplatelet aspirin is strictly necessary',
          'Healing confirmed after 4-8 weeks on maintenance Omeprazole'
        ],
        badge: 'Medication Safety'
      },
      {
        title: 'Alarm Features: Melena, Coffee-Ground Vomit & Perforation',
        timing: '08:46 - 11:30',
        keyPoints: [
          'Black tarry stools (melena) and coffee-ground vomit indicate active bleeding',
          'Sudden board-like abdomen is surgical emergency (perforated ulcer)',
          'High dose IV Omeprazole stabilizes mucosal clot'
        ],
        badge: 'Emergency Triage'
      }
    ]
  },

  // 16. HIV/AIDS & TLD REGIMEN
  {
    id: 'ucg_hiv_16',
    title: 'HIV/AIDS: First-Line TLD Regimen, Viral Load Suppression & OIs | UCG 2023',
    diseaseName: 'HIV/AIDS & Opportunistic Infections',
    category: 'Infectious Diseases',
    summary: 'Consolidated National HIV Guidelines: Same-day ART initiation with TLD (Tenofovir + Lamivudine + Dolutegravir), Cotrimoxazole (Septrin) prophylaxis, viral load monitoring, and Cryptococcal screening.',
    videoDuration: '14:25',
    durationSeconds: 865,
    views: '105K',
    publishedDate: '2 weeks ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Ronald Mukasa',
    speakerRole: 'Senior Consultant Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC II – Hospital (ART Clinic)',
    ucgChapter: 'UCG Chapter 2: Infectious Diseases',
    clinicalGuideline: {
      caseDefinition: 'Infection with Human Immunodeficiency Virus causing progressive CD4 T-lymphocyte depletion and susceptibility to opportunistic infections (OIs) and malignancies.',
      diagnosticCriteria: [
        'National Rapid HIV Testing Algorithm: Screening Test (Determine HIV-1/2) -> Confirmatory Test (Stat-Pak) -> Tie-breaker (SD Bioline)',
        'Positive result on two different rapid diagnostic test kits confirms diagnosis',
        'WHO Clinical Staging: Stage 1 (asymptomatic), Stage 2 (minor mucocutaneous), Stage 3 (oral candidiasis, pulmonary TB, >10% weight loss), Stage 4 (Cryptococcal meningitis, Pneumocystis pneumonia, Kaposi sarcoma)'
      ],
      investigations: [
        'Baseline Viral Load and CD4 cell count',
        'Serum Creatinine & eGFR (Tenofovir safety assessment)',
        'Serum Cryptococcal Antigen (CrAg) screening for all patients with CD4 < 200 cells/µL',
        'GeneXpert sputum test to rule out active TB prior to ART start',
        'Hepatitis B Surface Antigen (HBsAg) screening'
      ],
      firstLineMedicines: [
        'Preferred First-Line Regimen: TLD (Tenofovir Disoproxil Fumarate 300 mg + Lamivudine 300 mg + Dolutegravir 50 mg) 1 tablet once daily at bedtime',
        'Cotrimoxazole (Septrin) Preventive Therapy (CPT): 960 mg OD for all newly diagnosed HIV patients',
        'TB Preventive Treatment (TPT): 3HP (once weekly Rifapentine + Isoniazid for 12 weeks) once active TB is ruled out',
        'Opportunistic Infection Treatment: Fluconazole for oral/esophageal thrush; IV Amphotericin B + Flucytosine for Cryptococcal meningitis'
      ],
      treatmentProtocol: [
        'Treat-All Policy: Initiate ART on the same day as diagnosis, provided patient is clinically stable and ready (Test and Treat)',
        'If active Cryptococcal Meningitis or TB is present: delay ART for 2–4 weeks while treating infection to prevent fatal Immune Reconstitution Inflammatory Syndrome (IRIS)',
        'Viral Load Monitoring: First viral load at 6 months after starting ART, then at 12 months, and annually thereafter if suppressed (< 50 copies/mL)',
        'Undetectable = Untransmittable (U=U): Viral load < 200 copies/mL prevents sexual transmission'
      ],
      dangerSigns: [
        'Severe progressive headache, neck stiffness, and photophobia (Cryptococcal or TB meningitis)',
        'Severe breathlessness on exertion with dry cough (Pneumocystis jirovecii pneumonia)',
        'Severe extensive purple/brown skin plaques or oral nodules (Kaposi sarcoma)',
        'Jaundice or oliguria (acute drug toxicity)'
      ],
      referralProtocol: 'Refer to District or Regional Referral Hospital for unsuppressed viral load (> 1,000 copies/mL on 2 tests), suspected Cryptococcal meningitis, or severe drug toxicity.',
      preventionCounseling: [
        'Pre-Exposure Prophylaxis (PrEP) with oral TDF/FTC daily for HIV-negative individuals at ongoing substantial risk',
        'Post-Exposure Prophylaxis (PEP) within 72 hours of occupational or sexual exposure for 28 days',
        'Prevention of Mother-to-Child Transmission (PMTCT): Continuous lifelong ART for all HIV-positive pregnant women'
      ]
    },
    videoSlides: [
      {
        title: 'National HIV Algorithm & Test-and-Treat Policy',
        timing: '00:00 - 03:30',
        keyPoints: [
          'Confirmatory testing with Determine and Stat-Pak rapid tests',
          'Same-day ART initiation for ready, asymptomatic clients',
          'Screen for TB and Cryptococcal infection before initiating ART'
        ],
        badge: 'Diagnostic Policy'
      },
      {
        title: 'TLD (Tenofovir/Lamivudine/Dolutegravir) Protocol',
        timing: '03:31 - 07:15',
        keyPoints: [
          'TLD single daily tablet is potent, well-tolerated, with high barrier to resistance',
          'Cotrimoxazole (Septrin) 960mg daily prevents pneumonia and toxoplasmosis',
          '3HP preventive treatment eliminates latent TB'
        ],
        badge: 'First-Line ART'
      },
      {
        title: 'Viral Load Suppression & Undetectable = Untransmittable',
        timing: '07:16 - 10:45',
        keyPoints: [
          'Check viral load at 6 months, 12 months, then annually',
          'Viral load < 50 copies/mL represents optimal viral suppression',
          'U=U counseling: virally suppressed individuals cannot transmit HIV sexually'
        ],
        badge: 'Viral Suppression'
      },
      {
        title: 'Recognizing Severe OIs: Meningitis & PCP',
        timing: '10:46 - 14:25',
        keyPoints: [
          'Severe headaches in CD4 < 200 indicate Cryptococcal meningitis',
          'Amphotericin B + Flucytosine is gold-standard induction therapy',
          'Prevent IRIS by deferring ART until induction is underway'
        ],
        badge: 'Opportunistic Care'
      }
    ]
  },

  // 17. BACTERIAL MENINGITIS
  {
    id: 'ucg_meningitis_17',
    title: 'Acute Bacterial Meningitis: Lumbar Puncture, Ceftriaxone & Steroids | UCG 2023',
    diseaseName: 'Acute Bacterial Meningitis',
    category: 'Infectious Diseases',
    summary: 'Emergency central nervous system infection: Neck stiffness, Kernig/Brudzinski signs, CSF analysis, high-dose IV Ceftriaxone, and Dexamethasone timing to prevent deafness.',
    videoDuration: '12:10',
    durationSeconds: 730,
    views: '54K',
    publishedDate: '1 month ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Ronald Mukasa',
    speakerRole: 'Senior Consultant Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC IV – Hospital',
    ucgChapter: 'UCG Chapter 2: Infectious Diseases',
    clinicalGuideline: {
      caseDefinition: 'Life-threatening acute bacterial infection of the leptomeninges surrounding the brain and spinal cord, commonly caused by Streptococcus pneumoniae, Neisseria meningitidis, or Haemophilus influenzae.',
      diagnosticCriteria: [
        'Classic Triad: High fever, severe headache, and neck stiffness (nuchal rigidity)',
        'Positive Kernig\'s sign and Brudzinski\'s sign confirming meningeal irritation',
        'Altered mental status: Confusion, lethargy, delirium, stupor, or coma',
        'In infants: Bulging non-pulsatile fontanelle, high-pitched crying, irritability, floppiness, poor feeding'
      ],
      investigations: [
        'Lumbar Puncture (LP) and Cerebrospinal Fluid (CSF) analysis: Turbid/cloudy CSF, high neutrophils (> 100/µL), high protein (> 1 g/L), and low CSF glucose (< 50% of blood glucose)',
        'CSF Gram stain and culture',
        'Blood cultures (prior to starting antibiotics if available)',
        'Malaria RDT and Blood Glucose'
      ],
      firstLineMedicines: [
        'Empirical Antibiotic Adult: IV Ceftriaxone 2 g 12-hourly (total 4 g/day) for 10–14 days',
        'Empirical Antibiotic Child: IV Ceftriaxone 100 mg/kg once daily (or 50 mg/kg 12-hourly) for 10–14 days',
        'Alternative Inpatient: IV Chloramphenicol 25 mg/kg 6-hourly (100 mg/kg/day, max 4 g/day)',
        'Adjunctive Corticosteroid: IV Dexamethasone 10 mg (children 0.15 mg/kg) given 15–20 minutes BEFORE or WITH first antibiotic dose, continuing 6-hourly for 4 days'
      ],
      treatmentProtocol: [
        'NEVER delay empirical antibiotic therapy if Lumbar Puncture is delayed or contraindicated',
        'Give Dexamethasone prior to antibiotics to suppress brain inflammation and prevent permanent sensorineural hearing loss',
        'Maintain airway, provide oxygen, and treat convulsions promptly with IV Diazepam 0.2–0.3 mg/kg',
        'Strict droplet isolation for first 24 hours of effective antibiotic treatment in meningococcal cases',
        'Chemoprophylaxis for close household contacts (Meningococcal): Oral Ciprofloxacin 500 mg single dose (adults) or Rifampicin'
      ],
      dangerSigns: [
        'Signs of raised intracranial pressure / impending brain herniation: Bradycardia with hypertension (Cushing\'s triad), sluggish dilated pupils, papilledema',
        'Rapidly spreading petechial or purpuric rash (Meningococcemia with adrenal hemorrhage)',
        'Deep coma (Glasgow Coma Scale < 8)'
      ],
      referralProtocol: 'Emergency referral to District or Regional Referral Hospital with ICU capability while administering first dose of IV Ceftriaxone immediately before ambulance departure.',
      preventionCounseling: [
        'Ensure complete childhood vaccination with Pentavalent vaccine (Hib) and Pneumococcal Conjugate Vaccine (PCV)',
        'Meningococcal conjugate vaccination in high-risk districts (West Nile, Karamoja belt)'
      ]
    },
    videoSlides: [
      {
        title: 'Meningeal Signs & Infant Bulging Fontanelle',
        timing: '00:00 - 02:45',
        keyPoints: [
          'Kernig\'s and Brudzinski\'s signs confirm meningeal irritation',
          'In infants, check for tense bulging fontanelle and high-pitched cry',
          'Rule out raised ICP before attempting Lumbar Puncture'
        ],
        badge: 'Clinical Signs'
      },
      {
        title: 'CSF Interpretation & Turbid Fluid Flags',
        timing: '02:46 - 05:30',
        keyPoints: [
          'Turbid purulent CSF with neutrophil predominance indicates bacterial cause',
          'Low CSF-to-blood glucose ratio (< 0.4) is diagnostic hallmark',
          'Never withhold antibiotics to wait for lab test results'
        ],
        badge: 'Laboratory Diagnostics'
      },
      {
        title: 'IV Ceftriaxone & Dexamethasone Dosing',
        timing: '05:31 - 08:50',
        keyPoints: [
          'IV Ceftriaxone 2g every 12 hours crosses blood-brain barrier effectively',
          'Dexamethasone 10mg IV must be given before or with first antibiotic dose',
          'Steroids prevent bacterial toxin-mediated inner ear damage and deafness'
        ],
        badge: 'Critical Pharmacology'
      },
      {
        title: 'Meningococcemia & Contact Chemoprophylaxis',
        timing: '08:51 - 12:10',
        keyPoints: [
          'Petechial purpuric rash signals fulminant meningococcemia',
          'Single-dose Ciprofloxacin 500mg protects close household contacts',
          'Droplet isolation for initial 24 hours of therapy'
        ],
        badge: 'Infection Control'
      }
    ]
  },

  // 18. VIRAL HEPATITIS B
  {
    id: 'ucg_hepb_18',
    title: 'Hepatitis B Virus (HBV): HBsAg Screening, Tenofovir & Birth Dose | UCG 2023',
    diseaseName: 'Viral Hepatitis B Infection',
    category: 'Gastrointestinal & Hepatic',
    summary: 'Uganda National Hepatitis B program: HBsAg rapid screening, viral load quantification, Tenofovir Disoproxil Fumarate (TDF) therapy, and universal birth-dose vaccination within 24 hours.',
    videoDuration: '11:40',
    durationSeconds: 700,
    views: '62K',
    publishedDate: '1 month ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Peter Kigozi',
    speakerRole: 'Consultant Clinical Pathologist & Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC III – Hospital (HepB Clinic)',
    ucgChapter: 'UCG Chapter 6: Gastrointestinal and Hepatic Diseases',
    clinicalGuideline: {
      caseDefinition: 'Viral liver infection caused by Hepatitis B virus (HBV), transmitted perinatally, horizontally in early childhood, or through infected blood and unprotected sex, leading to chronic hepatitis, cirrhosis, and hepatocellular carcinoma.',
      diagnosticCriteria: [
        'Acute HBV: Jaundice, dark amber urine, pale clay stools, right upper quadrant pain, anorexia, malaise, marked ALT/AST elevation (> 1,000 U/L)',
        'Chronic HBV: Persistent Hepatitis B Surface Antigen (HBsAg) positive for >= 6 months',
        'Evaluate for liver fibrosis (APRI score > 1.5 indicates significant fibrosis/cirrhosis)'
      ],
      investigations: [
        'HBsAg rapid screening test',
        'Hepatitis B Viral Load (HBV DNA quantification by PCR)',
        'Liver Function Tests: Serum Alanine Aminotransferase (ALT), Aspartate Aminotransferase (AST), Total Bilirubin, Albumin',
        'Complete Blood Count (Platelet count < 150 × 10⁹/L indicates portal hypertension and advanced fibrosis)',
        'Abdominal Ultrasound for liver surface nodularity, splenomegaly, and ascites'
      ],
      firstLineMedicines: [
        'First-Line Antiviral: Tenofovir Disoproxil Fumarate (TDF) 300 mg once daily orally (lifelong treatment)',
        'Infant Prophylaxis: Monovalent Hepatitis B vaccine birth-dose (0.5 mL IM in anterolateral thigh) administered within 24 hours of delivery',
        'Routine EPI Vaccination: Pentavalent vaccine (DPT-HepB-Hib) at 6, 10, and 14 weeks of age'
      ],
      treatmentProtocol: [
        'Indications for starting TDF antiviral therapy in Chronic HBV: Cirrhosis (clinical or APRI > 1.5) regardless of ALT or viral load; OR HBV DNA > 20,000 IU/mL with elevated ALT (> 30 U/L for men, > 19 U/L for women) on 2 visits 3 months apart; OR Family history of Hepatocellular Carcinoma',
        'Tenofovir is well tolerated with very low rates of viral resistance',
        'Screen every 6 months with abdominal ultrasound and Serum Alpha-Fetoprotein (AFP) to detect early liver cancer (HCC)'
      ],
      dangerSigns: [
        'Hepatic Encephalopathy: Reversal of sleep-wake cycle, flapping tremor (asterixis), confusion, drowsiness, coma',
        'Massive Ascites and spontaneous bacterial peritonitis (fever and tender swollen abdomen)',
        'Upper GI Bleeding from ruptured esophageal varices (hematemesis and melena)'
      ],
      referralProtocol: 'Refer to Gastroenterology / Hepatology specialist at National Referral Hospital (Mulago) for decompensated cirrhosis, suspected liver cancer, or renal impairment on TDF.',
      preventionCounseling: [
        'Universal birth dose vaccination: Every newborn must receive Hepatitis B vaccine within 24 hours of delivery',
        'Screen and vaccinate all household and sexual contacts of HBsAg-positive individuals (3-dose schedule: Months 0, 1, and 6)',
        'Avoid all alcohol consumption completely; alcohol dramatically accelerates cirrhosis and cancer development'
      ]
    },
    videoSlides: [
      {
        title: 'HBsAg Rapid Screening & Chronic Carrier Definition',
        timing: '00:00 - 02:40',
        keyPoints: [
          'HBsAg positive for >= 6 months confirms chronic HBV infection',
          'Calculate APRI score from AST and platelet count to assess fibrosis',
          'Uganda has hyperendemic regions (Northern and Eastern Uganda > 10% prevalence)'
        ],
        badge: 'Diagnostic Screening'
      },
      {
        title: 'Tenofovir (TDF 300mg) Initiation Criteria',
        timing: '02:41 - 05:50',
        keyPoints: [
          'Start TDF immediately for all patients with clinical cirrhosis',
          'Start for non-cirrhotic patients if HBV DNA > 20,000 IU/mL with elevated ALT',
          'TDF is once-daily lifelong tablet with zero drug resistance'
        ],
        badge: 'Antiviral Protocol'
      },
      {
        title: 'Universal Birth Dose: The 24-Hour Golden Window',
        timing: '05:51 - 08:30',
        keyPoints: [
          'Administer monovalent Hepatitis B vaccine within 24 hours of birth',
          'Blocks mother-to-child transmission with 95% efficacy',
          'Follow up with routine Pentavalent doses at 6, 10, and 14 weeks'
        ],
        badge: 'Neonatal Prevention'
      },
      {
        title: 'Ultrasound & Alpha-Fetoprotein HCC Surveillance',
        timing: '08:31 - 11:40',
        keyPoints: [
          'Perform liver ultrasound every 6 months to detect early curable hepatoma',
          'Strict zero-alcohol rule for all HBV carriers',
          'Test and vaccinate sexual partners and children'
        ],
        badge: 'Cancer Surveillance'
      }
    ]
  },

  // 19. STROKE (CEREBROVASCULAR ACCIDENT)
  {
    id: 'ucg_stroke_19',
    title: 'Acute Stroke (CVA): FAST Triage, CT Differentiation & Aspirin | UCG 2023',
    diseaseName: 'Stroke (Cerebrovascular Accident)',
    category: 'Cardiovascular',
    summary: 'Uganda Clinical Guidelines acute stroke management: FAST pre-hospital triage, non-contrast CT brain differentiation, blood pressure control thresholds, Aspirin 300mg, and early rehabilitation.',
    videoDuration: '13:00',
    durationSeconds: 780,
    views: '71K',
    publishedDate: '1 month ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Ronald Mukasa',
    speakerRole: 'Senior Consultant Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC IV – Hospital',
    ucgChapter: 'UCG Chapter 4: Cardiovascular Diseases',
    clinicalGuideline: {
      caseDefinition: 'Rapidly developing clinical signs of focal or global disturbance of cerebral function lasting > 24 hours or leading to death, with no apparent cause other than vascular origin (85% Ischemic, 15% Hemorrhagic).',
      diagnosticCriteria: [
        'FAST Assessment: F - Face drooping, A - Arm weakness/drift, S - Speech difficulty (slurred or aphasic), T - Time to reach hospital immediately',
        'Sudden onset of hemiplegia, hemiparesis, sensory loss, hemi-inattention, or ataxia',
        'Distinguish Ischemic Stroke from Intracerebral Hemorrhage using non-contrast Head CT scan'
      ],
      investigations: [
        'Emergency non-contrast Head CT scan (indispensable to rule out intracranial hemorrhage before giving antiplatelets)',
        'Random Blood Glucose immediately (rule out and treat hypoglycemia which mimics stroke)',
        'Electrocardiogram (ECG) to identify Atrial Fibrillation or acute MI',
        'Complete Blood Count, INR/PT, Serum Creatinine, and Lipid Profile'
      ],
      firstLineMedicines: [
        'Ischemic Stroke Antiplatelet: Oral Aspirin 300 mg daily for 14 days, followed by Aspirin 75–150 mg daily maintenance (ONLY after CT confirms NO hemorrhage)',
        'Statin: Atorvastatin 40–80 mg once daily at bedtime for plaque stabilization',
        'Antihypertensives: Labetalol IV or oral Amlodipine (DO NOT lower BP aggressively in acute ischemic stroke unless SBP > 220 mmHg or DBP > 120 mmHg)',
        'Deep Vein Thrombosis Prophylaxis: Low-dose subcutaneous Enoxaparin 40 mg daily (or Heparin 5,000 IU BD) once hemorrhage ruled out'
      ],
      treatmentProtocol: [
        'Airway, Breathing, Circulation: Elevate head of bed 30 degrees to reduce intracranial pressure and prevent aspiration',
        'Maintain normoglycemia (4.4–10.0 mmol/L) and normothermia (treat fever aggressively with Paracetamol)',
        'Allow permissive hypertension (up to 220/120 mmHg) in acute ischemic stroke to maintain cerebral collateral perfusion',
        'Swallowing assessment: Patient must remain Nil By Mouth (NBM) until formal water swallow test is passed; insert nasogastric tube if dysphagic',
        'Early mobilization and multidisciplinary physiotherapy starting at 24–48 hours'
      ],
      dangerSigns: [
        'Coma or rapid deterioration in Glasgow Coma Scale (GCS < 8) indicating massive hemispheric stroke with cerebral edema',
        'Loss of protective airway reflexes leading to aspiration pneumonia',
        'Severe acute hypertension > 220/130 mmHg with hypertensive encephalopathy'
      ],
      referralProtocol: 'Emergency transfer to Regional Referral Hospital or National Referral Hospital (Mulago) with neuro-imaging, stroke unit, and intensive neuro-rehabilitation.',
      preventionCounseling: [
        'Strict long-term blood pressure control (< 130/80 mmHg) reduces secondary stroke recurrence by over 50%',
        'Oral anticoagulation (Warfarin or Direct Oral Anticoagulant) for all patients with stroke secondary to Atrial Fibrillation',
        'Smoking cessation, daily physical exercise, and a low-salt Mediterranean/DASH diet'
      ]
    },
    videoSlides: [
      {
        title: 'FAST Screening & Stroke Code Activation',
        timing: '00:00 - 02:50',
        keyPoints: [
          'Face, Arm, Speech, Time: Every minute counts to preserve penumbra',
          'Check blood glucose immediately: Hypoglycemia is prime stroke mimic',
          'Keep patient Nil By Mouth until bedside swallow screen is passed'
        ],
        badge: 'FAST Triage'
      },
      {
        title: 'Non-Contrast CT: Ischemic vs Hemorrhagic',
        timing: '02:51 - 06:15',
        keyPoints: [
          'CT must rule out hemorrhage before administering Aspirin',
          'Ischemic stroke shows early loss of insular ribbon or hyperdense MCA sign',
          'Hemorrhagic stroke appears hyperdense (bright white)'
        ],
        badge: 'Neuro-Imaging'
      },
      {
        title: 'Permissive Hypertension Rules in Ischemic Stroke',
        timing: '06:16 - 09:20',
        keyPoints: [
          'Do NOT rapidly lower blood pressure: High BP maintains perfusion through collaterals',
          'Only treat if BP exceeds 220/120 mmHg or patient has acute heart failure / aortic dissection',
          'Target gradual 15% reduction over first 24 hours if treating'
        ],
        badge: 'Hemodynamic Control'
      },
      {
        title: 'Aspirin 300mg, Atorvastatin & Early Rehab',
        timing: '09:21 - 13:00',
        keyPoints: [
          'Give Aspirin 300mg once daily for 14 days then 75mg maintenance',
          'High intensity Atorvastatin 40-80mg stabilizes carotid plaques',
          'Begin bedside passive limb physiotherapy within 24-48 hours'
        ],
        badge: 'Secondary Prevention'
      }
    ]
  },

  // 20. OSTEOARTHRITIS & CHRONIC JOINT PAIN
  {
    id: 'ucg_oa_20',
    title: 'Osteoarthritis: Knee & Hip Pain, Paracetamol Ladder & Exercise | UCG 2023',
    diseaseName: 'Osteoarthritis & Degenerative Joint Disease',
    category: 'Musculoskeletal',
    summary: 'Clinical diagnosis of degenerative joint disease: Morning stiffness < 30 mins, crepitus, Paracetamol first-line, topical NSAIDs, weight loss counseling, and joint preservation.',
    videoDuration: '10:20',
    durationSeconds: 620,
    views: '49K',
    publishedDate: '2 months ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Peter Kigozi',
    speakerRole: 'Consultant Clinical Pathologist & Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC II – Hospital',
    ucgChapter: 'UCG Chapter 10: Musculoskeletal and Joint Diseases',
    clinicalGuideline: {
      caseDefinition: 'Chronic non-inflammatory degenerative disorder of movable joints (especially knees, hips, and spine), characterized by cartilage loss, subchondral bone remodeling, and osteophyte formation.',
      diagnosticCriteria: [
        'Joint pain exacerbated by weight-bearing and activity, relieved by rest',
        'Brief morning or inactivity stiffness lasting < 30 minutes (distinguishes from Rheumatoid Arthritis which has stiffness > 1 hour)',
        'Physical exam: Bony enlargement of joints, coarse crepitus on passive movement, restricted range of motion, Heberden\'s nodes (DIP joints), Bouchard\'s nodes (PIP joints)'
      ],
      investigations: [
        'Plain X-Ray of affected joint (standing weight-bearing for knees): Joint space narrowing, subchondral sclerosis, osteophytes, and subchondral cysts',
        'Erythrocyte Sedimentation Rate (ESR) and C-Reactive Protein (CRP) usually normal',
        'Uric acid level to rule out chronic tophaceous gout'
      ],
      firstLineMedicines: [
        'Step 1 (First-Line): Oral Paracetamol 1 g TDS or QDS (max 4 g/day) on regular schedule',
        'Step 2 (Topical): Topical Diclofenac gel 1% or Methyl Salicylate liniment rubbed over joint TDS',
        'Step 3 (Short-Course Oral NSAID): Oral Ibuprofen 400 mg TDS or Meloxicam 7.5–15 mg OD with food PLUS Omeprazole 20 mg daily for gastric protection',
        'Intra-articular Injection: Triamcinolone acetonide 40 mg for acute painful knee effusion (max 3–4 injections per year)'
      ],
      treatmentProtocol: [
        'Core non-pharmacological management is FIRST and continuous for all patients: Weight loss if overweight, low-impact quadriceps strengthening exercises (swimming, cycling, walking on flat ground)',
        'Avoid prolonged standing, carrying heavy jerrycans/crops on head, and squatting on low stools',
        'Provide walking cane/stick used on the CONTRALATERAL (opposite) side of the affected knee/hip',
        'Wear shock-absorbing cushioned footwear'
      ],
      dangerSigns: [
        'Hot, red, acutely swollen joint with severe fever (suspect acute septic arthritis requiring urgent joint aspiration)',
        'Rapidly progressive deformity and complete inability to bear weight',
        'Melena or hematemesis from long-term self-medication with oral NSAIDs'
      ],
      referralProtocol: 'Refer to Orthopaedic Surgeon at Regional Referral Hospital for severe refractory pain and disability requiring total joint arthroplasty (knee or hip replacement).',
      preventionCounseling: [
        'Maintain healthy body weight (every 1 kg weight loss reduces knee joint load by 4 kg during walking)',
        'Do daily seated straight-leg raises to build quadriceps muscle strength and stabilize the knee joint'
      ]
    },
    videoSlides: [
      {
        title: 'Clinical Diagnosis: Knee Crepitus & Morning Stiffness',
        timing: '00:00 - 02:30',
        keyPoints: [
          'Activity-related joint pain that improves with rest',
          'Morning stiffness lasts less than 30 minutes',
          'Palpable coarse crepitus and osteophyte enlargement'
        ],
        badge: 'Clinical Assessment'
      },
      {
        title: 'Analgesia Ladder: Paracetamol & Topical NSAIDs',
        timing: '02:31 - 05:15',
        keyPoints: [
          'Paracetamol 1g up to four times daily is safe first-line agent',
          'Topical Diclofenac gel avoids systemic stomach and kidney toxicity',
          'Always add Omeprazole if short-course oral NSAIDs are required'
        ],
        badge: 'Medication Safety'
      },
      {
        title: 'Quadriceps Strengthening & Contralateral Cane',
        timing: '05:16 - 07:45',
        keyPoints: [
          'Strengthening thigh muscles takes 40% of shock off knee cartilage',
          'Hold walking stick in hand OPPOSITE to painful knee',
          'Avoid deep squatting and carrying heavy head-loads'
        ],
        badge: 'Physical Therapy'
      },
      {
        title: 'Weight Loss Impact & Joint Replacement Surgery',
        timing: '07:46 - 10:20',
        keyPoints: [
          'Weight reduction is the single most effective intervention to slow progression',
          'Rule out red, hot septic arthritis which is a medical emergency',
          'Orthopaedic referral for severe bone-on-bone joint replacement'
        ],
        badge: 'Surgical Referral'
      }
    ]
  },

  // 21. ACUTE BURNS & RESUSCITATION
  {
    id: 'ucg_burns_21',
    title: 'Burns & Scalds: Rule of 9s, Parkland IV Formula & Silver Sulfadiazine | UCG 2023',
    diseaseName: 'Acute Severe Burns & Scalds',
    category: 'Emergencies & Trauma',
    summary: 'Uganda Clinical Guidelines emergency burn care: Wallace Rule of Nines, Parkland formula fluid resuscitation with Ringer\'s Lactate, Silver Sulfadiazine dressing, and contracture prevention.',
    videoDuration: '11:50',
    durationSeconds: 710,
    views: '51K',
    publishedDate: '2 months ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Ronald Mukasa',
    speakerRole: 'Senior Consultant Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC III – Hospital (Burns Unit)',
    ucgChapter: 'UCG Chapter 1: Emergencies and Trauma',
    clinicalGuideline: {
      caseDefinition: 'Tissue damage caused by heat (open flame, hot liquids/scalds, hot objects), electricity, lightning, chemicals, or radiation, causing systemic fluid loss, hypermetabolism, and sepsis risk.',
      diagnosticCriteria: [
        'First Degree (Superficial): Erythematous, dry, painful, no blisters (e.g. sunburn)',
        'Second Degree (Partial Thickness): Blisters, moist, red, intensely painful, blanching',
        'Third Degree (Full Thickness): Leathery, dry, waxy white or charred black, painless/insensate to pinprick',
        'Estimate Total Body Surface Area (TBSA) using Wallace Rule of Nines: Head 9%, Each Arm 9%, Anterior Trunk 18%, Posterior Trunk 18%, Each Leg 18%, Perineum 1% (patient\'s palm = 1% TBSA)'
      ],
      investigations: [
        'Complete Blood Count and baseline Hematocrit (hemoconcentration)',
        'Serum Urea, Creatinine, and Electrolytes (monitor for acute tubular necrosis and hyperkalemia)',
        'Urinalysis and hourly urine output monitoring via Foley catheter'
      ],
      firstLineMedicines: [
        'Parkland Fluid Resuscitation: Total 24-hour Ringer\'s Lactate = 4 mL × Weight in kg × % TBSA burned (for second and third-degree burns >= 15% TBSA in adults, >= 10% in children)',
        'Infuse half (50%) of total calculated volume in first 8 hours (from time of burn injury), and remaining half over next 16 hours',
        'Tetanus Prophylaxis: Tetanus Toxoid 0.5 mL IM + Tetanus Immunoglobulin (TIG) 250–500 IU IM for dirty burns',
        'Topical Antimicrobial: Silver Sulfadiazine 1% cream applied 1–2 mm thick over cleaned burn wounds (avoid on face and in infants < 2 months; use Chlorhexidine/Vaseline instead)'
      ],
      treatmentProtocol: [
        'First Aid: Cool the burn immediately with clean running room-temperature tap water for 20 minutes (NEVER apply ice, mud, cow dung, eggs, or motor oil)',
        'Keep patient warm after cooling to prevent hypothermia',
        'Adequate analgesia: IV Morphine 0.1 mg/kg or Tramadol (severe burns are excruciatingly painful)',
        'Insert Foley catheter immediately for burns >= 15% TBSA: Titrate IV fluids to maintain urine output of 0.5–1.0 mL/kg/hour in adults (1.0–1.5 mL/kg/hour in children)',
        'Elevate burned extremities to reduce edema'
      ],
      dangerSigns: [
        'Inhalation injury: Singed facial hair, soot in mouth/nostrils, hoarseness, stridor (requires immediate endotracheal intubation before laryngeal edema closes airway)',
        'Circumferential chest burns restricting ventilation, or circumferential limb burns causing compartment syndrome (requires urgent surgical escharotomy)',
        'Oliguria (< 0.5 mL/kg/hr) indicating under-resuscitation and acute renal failure'
      ],
      referralProtocol: 'Refer to National Referral Hospital (Mulago Burns Unit) for burns >= 20% TBSA, burns of face, hands, feet, genitalia, or major joints, electrical burns, and chemical burns.',
      preventionCounseling: [
        'Keep cooking pots on raised platforms away from toddler reach',
        'Do not leave hot water basins on the floor in bathing areas',
        'Educate families against applying harmful traditional substances (ashes, battery acid) onto burn wounds'
      ]
    },
    videoSlides: [
      {
        title: 'Rule of Nines & Burn Depth Staging',
        timing: '00:00 - 02:45',
        keyPoints: [
          'Calculate % TBSA accurately: Patient palm including fingers = 1% TBSA',
          'Only count second and third-degree burns in resuscitation formulas',
          'Distinguish partial thickness (painful) from full thickness (insensate/charred)'
        ],
        badge: 'TBSA Assessment'
      },
      {
        title: 'Parkland Resuscitation Formula (4 mL × kg × %)',
        timing: '02:46 - 06:15',
        keyPoints: [
          '4 mL Ringer\'s Lactate × weight (kg) × % TBSA in first 24 hours',
          'Give 50% in first 8 hours from time of burn, remaining 50% in next 16 hours',
          'Titrate fluid rate against hourly catheter urine output (0.5-1 mL/kg/hr)'
        ],
        badge: 'IV Fluid Resuscitation'
      },
      {
        title: 'Immediate First Aid & Silver Sulfadiazine Dressing',
        timing: '06:16 - 08:50',
        keyPoints: [
          'Cool burn with clean running water for 20 minutes; avoid ice and oils',
          'Silver Sulfadiazine 1% cream prevents Pseudomonas sepsis',
          'Administer Tetanus Toxoid booster for all open burns'
        ],
        badge: 'Wound Care'
      },
      {
        title: 'Inhalation Injury Stridor & Escharotomy',
        timing: '08:51 - 11:50',
        keyPoints: [
          'Soot in nose and stridor indicate lethal airway burns: intubate early',
          'Circumferential limb burns require escharotomy to save fingers/toes',
          'Mulago Burns Unit referral criteria'
        ],
        badge: 'Emergency Surgery'
      }
    ]
  },

  // 22. SNAKE BITE ENVENOMATION
  {
    id: 'ucg_snakebite_22',
    title: 'Snake Bite Envenomation: Polyvalent Antivenom & Tourniquet Dangers | UCG 2023',
    diseaseName: 'Snake Bite Envenomation',
    category: 'Emergencies & Trauma',
    summary: 'Emergency toxicological management: 20-minute whole blood clotting test (20WBCT), neurotoxic vs hemotoxic envenomation, polyvalent antivenom reconstitution, and wound splinting per UCG 2023.',
    videoDuration: '11:10',
    durationSeconds: 670,
    views: '68K',
    publishedDate: '2 months ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Dr. Ronald Mukasa',
    speakerRole: 'Senior Consultant Physician',
    speakerAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC III – Hospital',
    ucgChapter: 'UCG Chapter 1: Emergencies and Trauma',
    clinicalGuideline: {
      caseDefinition: 'Inoculation of snake venom through fangs into human tissue, categorized into cytotoxic (puff adders), neurotoxic (mambas, cobras), and hemotoxic (boomslang, vipers) syndromes.',
      diagnosticCriteria: [
        'Fang puncture marks with acute severe local swelling, blistering, and tissue necrosis (Cytotoxic - Viperidae)',
        'Progressive bilateral ptosis (drooping eyelids), ophthalmoplegia, dysarthria, dysphagia, and respiratory paralysis (Neurotoxic - Elapidae)',
        'Spontaneous systemic bleeding from gums, venipuncture sites, hematuria, or persistent incoagulable blood (Hemotoxic - Colubridae/Vipers)'
      ],
      investigations: [
        '20-Minute Whole Blood Clotting Test (20WBCT): Place 2 mL fresh venous blood in clean dry glass tube; leave undisturbed for 20 minutes; tip tube gently; if blood is still liquid and flows, envenomation is confirmed (incoagulable blood)',
        'Repeat 20WBCT every 30 minutes for 3 hours, then 2-hourly to monitor response to antivenom',
        'Complete Blood Count and Platelet count',
        'Renal function tests (urea, creatinine) to detect acute tubular necrosis'
      ],
      firstLineMedicines: [
        'Polyvalent Snake Antivenom (African Polyvalent Equine Antivenom): 2–4 vials reconstituted in 200–500 mL Normal Saline infused slow IV over 1 hour',
        'Pre-medication for Antivenom Anaphylaxis: Subcutaneous Adrenaline 0.25 mg (or 0.5 mL 1:1,000 kept drawn up at bedside ready for immediate injection)',
        'Neurotoxic Anticholinesterase Trial: IV Neostigmine 0.5–2 mg PLUS IV Atropine 0.6 mg (for post-synaptic neurotoxic cobra bites)',
        'Tetanus Toxoid 0.5 mL IM + Broad-spectrum antibiotic (Amoxicillin/Clavulanate) for contaminated bites'
      ],
      treatmentProtocol: [
        'First Aid: Reassure patient, immobilize bitten limb with a splint and keep below heart level, transport immediately to clinic',
        'HARMFUL PRACTICES TO AVOID: NEVER apply tight arterial tourniquets, never cut or suck the wound, never apply black snake stones (Ekirobyo) or caustic herbal pastes',
        'Indications for Antivenom: Incoagulable blood on 20WBCT, systemic bleeding, neurotoxicity (ptosis, respiratory depression), or rapid swelling extending > halfway up bitten limb within 48 hours',
        'Repeat full antivenom dose after 6 hours if blood remains incoagulable on 20WBCT'
      ],
      dangerSigns: [
        'Respiratory muscle paralysis and asphyxia from neurotoxic venom (requires bag-valve-mask ventilation and intubation)',
        'Massive internal hemorrhage, intracranial bleeding, or hemorrhagic shock',
        'Compartment syndrome with cold pulseless distal extremity requiring urgent fasciotomy'
      ],
      referralProtocol: 'Emergency transfer to District or Regional Referral Hospital with ICU ventilator support and antivenom stock.',
      preventionCounseling: [
        'Clear bush, brushwood, and rock piles within 10 meters of homesteads',
        'Always use a flashlight/torch when walking outdoors after dusk',
        'Wear thick gumboots and long trousers when clearing bushes, weeding, or farming'
      ]
    },
    videoSlides: [
      {
        title: 'Venom Syndromes: Neurotoxic vs Hemotoxic',
        timing: '00:00 - 02:30',
        keyPoints: [
          'Neurotoxic cobras/mambas cause ptosis and respiratory muscle paralysis',
          'Vipers cause severe limb swelling, tissue necrosis, and coagulopathy',
          'Dry bites occur in up to 20% of cases (puncture without venom)'
        ],
        badge: 'Syndrome Recognition'
      },
      {
        title: 'The 20-Minute Whole Blood Clotting Test (20WBCT)',
        timing: '02:31 - 05:10',
        keyPoints: [
          'Place 2 mL venous blood in dry glass tube for 20 minutes',
          'If blood fails to clot and pours out, severe hemotoxicity is proven',
          'Repeat test at 6 hours post-antivenom to confirm clot recovery'
        ],
        badge: 'Bedside Diagnostic'
      },
      {
        title: 'Polyvalent Antivenom Infusion Protocol',
        timing: '05:11 - 08:15',
        keyPoints: [
          'Dilute 2-4 vials in Normal Saline; infuse slowly under close monitoring',
          'Always have Adrenaline 1:1,000 drawn in syringe ready for allergic reactions',
          'Neostigmine + Atropine trial for neurotoxic cobra envenomation'
        ],
        badge: 'Antivenom Administration'
      },
      {
        title: 'First Aid Myths vs Splinting & Farm Safety',
        timing: '08:16 - 11:10',
        keyPoints: [
          'Never use tight tourniquets, incisions, or snake stones (causes gangrene)',
          'Immobilize limb with rigid splint and keep patient still',
          'Wear rubber gumboots and use flashlights at night'
        ],
        badge: 'First Aid Truths'
      }
    ]
  },

  // 23. NEONATAL SEPSIS
  {
    id: 'ucg_neosepsis_23',
    title: 'Neonatal Sepsis: Danger Signs, Ampicillin + Gentamicin & Warmth | UCG 2023',
    diseaseName: 'Neonatal Sepsis & Serious Bacterial Infection',
    category: 'Childhood Illness & SAM',
    summary: 'Uganda Clinical Guidelines neonatal emergency: Hypothermia, grunting, poor feeding, Ampicillin + Gentamicin dosing, and immediate thermal stabilization for newborns under 28 days.',
    videoDuration: '12:00',
    durationSeconds: 720,
    views: '74K',
    publishedDate: '1 month ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Sister Florence Nabatanzi',
    speakerRole: 'Registered Midwife & Senior Community Nurse',
    speakerAvatar: 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC III – Hospital (SCBU/NICU)',
    ucgChapter: 'UCG Chapter 17: Childhood Illness',
    clinicalGuideline: {
      caseDefinition: 'Systemic bacterial infection in newborns within first 28 days of life, categorized into Early-Onset (< 72 hours, usually vertically transmitted from maternal genital tract) and Late-Onset (>= 72 hours, usually community/hospital acquired).',
      diagnosticCriteria: [
        'Any ONE of the Young Infant Danger Signs: Inability to feed or suck, Convulsions, Fast breathing (>= 60 breaths/min), Severe chest indrawing, High fever (>= 37.5°C) or Hypothermia (< 35.5°C), Movement only when stimulated or no movement at all',
        'Other signs: Umbilical flare (redness spreading to abdominal wall), skin pustules, abdominal distension, severe jaundice in first 24h'
      ],
      investigations: [
        'Blood Glucose immediately (neonatal hypoglycemia < 2.5 mmol/L causes brain damage)',
        'Full Blood Count (Total WBC < 5.0 × 10⁹/L or > 25.0 × 10⁹/L with high band count)',
        'Blood culture and CSF analysis via lumbar puncture before starting antibiotics where feasible',
        'Serum Bilirubin and CRP'
      ],
      firstLineMedicines: [
        'First-Line Antibiotic Combination: IV/IM Ampicillin 50 mg/kg 12-hourly PLUS IV/IM Gentamicin 5 mg/kg once daily for 7–10 days',
        'Second-Line for Hospital-Acquired / Severe Sepsis: IV Ceftriaxone 50 mg/kg once daily (avoid with Calcium solutions or severe jaundice) OR Cefotaxime 50 mg/kg 12-hourly',
        'Hypoglycemia Treatment: 10% Dextrose 2 mL/kg slow IV bolus, followed by maintenance infusion',
        'Convulsion Control: IV Phenobarbital 20 mg/kg loading dose slow over 10–15 minutes'
      ],
      treatmentProtocol: [
        'Thermal Care: Ensure infant is kept warm (36.5–37.5°C) using Kangaroo Mother Care or radiant warmer',
        'Start first dose of Ampicillin and Gentamicin immediately after drawing blood culture',
        'Provide respiratory support with nasal CPAP or low-flow oxygen (0.5 L/min) if grunting or SpO2 < 90%',
        'Feeding: Support expression of breastmilk and feed via nasogastric tube or cup if infant too weak to breastfeed'
      ],
      dangerSigns: [
        'Sclerema neonatorum (hardening of skin and subcutaneous fat in hypothermia and septic shock)',
        'Apneic spells (cessation of breathing lasting > 20 seconds accompanied by bradycardia and cyanosis)',
        'Petechiae, purpura, or oozing from umbilical stump (disseminated intravascular coagulation)'
      ],
      referralProtocol: 'Emergency referral to Special Care Baby Unit (SCBU) or NICU at District/Regional Hospital with incubator and CPAP capabilities.',
      preventionCounseling: [
        'Clean delivery practices: Clean hands, clean surface, clean cord tie, clean blade (The 6 Cleans)',
        'Apply 7.1% Chlorhexidine gel to umbilical cord stump daily for first 7 days to prevent omphalitis and tetanus',
        'Immediate and exclusive breastfeeding within the first hour of birth'
      ]
    },
    videoSlides: [
      {
        title: 'The 6 Young Infant Danger Signs',
        timing: '00:00 - 03:00',
        keyPoints: [
          'Inability to suck and chest indrawing are early red flags',
          'Hypothermia (< 35.5°C) is more common and dangerous than fever in newborns',
          'Look for red umbilical flare spreading into skin (omphalitis)'
        ],
        badge: 'Neonatal Triage'
      },
      {
        title: 'Ampicillin + Gentamicin Weight-Based Dosing',
        timing: '03:01 - 06:15',
        keyPoints: [
          'Ampicillin 50 mg/kg 12-hourly covers Listeria and Group B Strep',
          'Gentamicin 5 mg/kg once daily covers Gram-negative rods (E. coli, Klebsiella)',
          'Check aminoglycoside dose carefully to avoid nephrotoxicity and ototoxicity'
        ],
        badge: 'Antibiotic Therapy'
      },
      {
        title: 'Thermal Protection & 10% Dextrose Glucose Rescue',
        timing: '06:16 - 09:10',
        keyPoints: [
          'Hypothermia doubles mortality: skin-to-skin Kangaroo care maintains warmth',
          'Check heel-prick glucose immediately: 10% Dextrose 2 mL/kg for < 2.5 mmol/L',
          'Expressed breastmilk via nasogastric tube'
        ],
        badge: 'Stabilization'
      },
      {
        title: '7.1% Chlorhexidine Cord Care & SCBU Referral',
        timing: '09:11 - 12:00',
        keyPoints: [
          'Apply 7.1% Chlorhexidine digluconate gel to cord stump daily for 7 days',
          'Never apply cow dung, ash, or cooking oil to umbilical stump',
          'Transfer to Special Care Baby Unit for CPAP and phototherapy'
        ],
        badge: 'Prevention & SCBU'
      }
    ]
  },

  // 24. CERVICAL CANCER & HPV
  {
    id: 'ucg_cervical_24',
    title: 'Cervical Cancer: HPV Vaccination, VIA Visual Inspection & Cryotherapy | UCG 2023',
    diseaseName: 'Cervical Cancer Screening & Prevention',
    category: 'Obstetrics & Maternal',
    summary: 'Uganda National Cervical Cancer Control Strategy: HPV vaccination for adolescent girls, Visual Inspection with Acetic Acid (VIA), HPV-DNA self-collection, and immediate See-and-Treat Thermal Ablation.',
    videoDuration: '11:00',
    durationSeconds: 660,
    views: '57K',
    publishedDate: '1 month ago',
    channelName: 'Ministry of Health Uganda • Clinical Guidelines',
    speakerName: 'Sister Florence Nabatanzi',
    speakerRole: 'Registered Midwife & Senior Community Nurse',
    speakerAvatar: 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    levelOfCare: 'HC III – Hospital (Gyn / Oncology)',
    ucgChapter: 'UCG Chapter 12 (Oncology) & Chapter 14 (Gynecology)',
    clinicalGuideline: {
      caseDefinition: 'Malignant neoplasm of the uterine cervix, overwhelmingly caused by persistent high-risk Human Papillomavirus (HPV types 16 and 18) infection; the leading cause of cancer deaths among women in Uganda.',
      diagnosticCriteria: [
        'Screening (Asymptomatic): Visual Inspection with 3–5% Acetic Acid (VIA) showing well-demarcated dense opaque acetowhite lesions near the squamocolumnar junction (transformation zone)',
        'Molecular Screening: High-risk HPV-DNA test positive',
        'Invasive Cancer Symptoms: Abnormal vaginal bleeding (post-coital, intermenstrual, or post-menopausal), persistent foul-smelling watery or blood-stained discharge, deep pelvic pain'
      ],
      investigations: [
        'Visual Inspection with Acetic Acid (VIA) using speculum and bright halogen light',
        'HPV-DNA PCR test (clinician collected or vaginal self-sampling kit)',
        'Cervical punch biopsy of suspicious ulcerated or exophytic cauliflower-like lesions for histopathology',
        'Staging investigations: Pelvic examination, chest X-ray, abdominopelvic ultrasound, renal function'
      ],
      firstLineMedicines: [
        'Primary Prevention Vaccine: Human Papillomavirus (HPV) bivalent/quadrivalent vaccine single-dose (0.5 mL IM) given to adolescent girls aged 9–14 years',
        'Precancerous Lesion Treatment: Thermal Ablation (Thermo-coagulation at 100°C for 20–30 seconds) or Cryotherapy (nitrous oxide / CO2 freeze for 3 minutes, 5-minute thaw, 3-minute freeze) in See-and-Treat clinics',
        'Large / Endocervical Lesions: Loop Electrosurgical Excision Procedure (LEEP) under local anesthesia',
        'Invasive Cancer: Chemoradiotherapy (external beam radiation + brachytherapy + weekly Cisplatin 40 mg/m²)'
      ],
      treatmentProtocol: [
        'Screen all women aged 25–49 years every 3–5 years (HIV-positive women screened every 2 years starting from age 21 or sexual debut)',
        'Single Visit Approach (See and Treat): If VIA is positive and lesion covers < 75% of cervix and does not extend into canal: treat immediately with Thermal Ablation in the same sitting',
        'Provide analgesia: Oral Ibuprofen 400 mg 30 minutes before ablation procedure',
        'Post-treatment counseling: Abstain from sexual intercourse or use condoms for 4 weeks; return if bleeding or foul discharge occurs'
      ],
      dangerSigns: [
        'Massive vaginal hemorrhage requiring emergency vaginal packing',
        'Fistula formation (involuntary leakage of urine or feces from vagina into vesicovaginal or rectovaginal fistula)',
        'Bilateral ureteric obstruction causing hydronephrosis, uremia, and acute renal failure'
      ],
      referralProtocol: 'Refer women with invasive visible cervical masses or suspect biopsies to Uganda Cancer Institute (UCI - Mulago) for oncological staging and radiotherapy.',
      preventionCounseling: [
        'Ensure all 9–14 year-old schoolgirls and out-of-school girls receive the HPV vaccine',
        'Screening every 3 years saves lives: early precancerous changes are completely curable in 15 minutes at health centre level',
        'Male circumcision and consistent condom use reduce HPV transmission rates'
      ]
    },
    videoSlides: [
      {
        title: 'HPV 16 & 18 Carcinogenesis & 9-14yr Vaccine',
        timing: '00:00 - 02:40',
        keyPoints: [
          'High-risk HPV causes > 99% of cervical cancers in Uganda',
          'Single-dose HPV vaccine for 9-14 year-old girls provides durable protection',
          'Vaccinate before sexual debut for maximum preventive efficacy'
        ],
        badge: 'Primary Prevention'
      },
      {
        title: 'VIA (Visual Inspection with Acetic Acid) Technique',
        timing: '02:41 - 05:30',
        keyPoints: [
          'Apply 3-5% dilute acetic acid to cervix for 1 full minute',
          'Dense opaque acetowhite lesion near transformation zone is VIA positive',
          'Rule out polyps, ectropion, and active cervicitis'
        ],
        badge: 'Screening Method'
      },
      {
        title: 'See-and-Treat Thermal Ablation in 15 Minutes',
        timing: '05:31 - 08:15',
        keyPoints: [
          'Thermal ablation heated tip destroys precancerous epithelium at 100°C',
          'Completed in outpatient clinic setting without electricity grid (battery operated)',
          'No sex for 4 weeks following procedure to allow epithelial regeneration'
        ],
        badge: 'Thermal Ablation'
      },
      {
        title: 'Alarm Signs: Post-Coital Bleeding & UCI Referral',
        timing: '08:16 - 11:00',
        keyPoints: [
          'Post-coital bleeding and foul watery discharge indicate invasive disease',
          'Biopsy suspicious exophytic lesions: do not ablate visible tumors',
          'Uganda Cancer Institute (UCI Mulago) radiotherapy referral'
        ],
        badge: 'Oncology Referral'
      }
    ]
  }
];
