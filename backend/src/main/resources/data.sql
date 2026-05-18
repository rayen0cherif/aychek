INSERT INTO companies (
    id,
    name,
    sector,
    country,
    description,
    founded_year,
    employee_count,
    created_at,
    updated_at
) VALUES 

(
    gen_random_uuid(),
    'Aycheek - عيشك',
    'InsurTech',
    'Tunisia',
    'Takaful insurance platform providing CRM and ERP solutions for insurance companies and brokers, including client management, payment automation, policy centralization, field team monitoring, and AI-powered reporting.',
    2025,
    50,
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'TakiAcademy',
    'EdTech',
    'Tunisia',
    'Online learning platform providing educational content, live classes, and recorded lessons for students from primary school to baccalaureate.',
    2013,
    350,
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Stripe',
    'FinTech',
    'USA',
    'Online payment infrastructure for the internet.',
    2010,
    8000,
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Airwallex',
    'FinTech',
    'Australia',
    'Global financial platform providing business accounts and borderless cards.',
    2015,
    1200,
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Mercado Libre',
    'E-commerce',
    'Argentina',
    'Online marketplace dedicated to e-commerce and online auctions.',
    1999,
    30000,
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'InstaDeep',
    'Artificial Intelligence',
    'Tunisia',
    'Delivers AI-powered decision-making systems for the Enterprise.',
    2014,
    250,
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Go1',
    'EdTech',
    'Australia',
    'Curated e-learning library and training provider for businesses.',
    2015,
    600,
    NOW(),
    NOW()
);