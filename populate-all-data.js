const API_BASE = 'http://localhost:1337/api';

// Helper function to create content
async function createContent(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Created ${endpoint}:`, result.data?.attributes?.name || result.data?.attributes?.Client || 'Unknown');
      return result.data;
    } else {
      console.error(`❌ Failed to create ${endpoint}:`, await response.text());
    }
  } catch (error) {
    console.error(`❌ Error creating ${endpoint}:`, error.message);
  }
}

// Sample data for agencies
const agencies = [
  { name: "Sixteen", description: "Creative agency specializing in digital experiences" },
  { name: "Freelance", description: "Independent creative work" },
  { name: "Studio X", description: "Collaborative design studio" }
];

// Sample data for positions
const positions = [
  { name: "Creative Director", description: "Leading creative vision and strategy" },
  { name: "Art Director", description: "Visual design and creative direction" },
  { name: "Senior Designer", description: "Advanced design and concept development" },
  { name: "Motion Designer", description: "Animation and motion graphics" },
  { name: "3D Artist", description: "Three-dimensional design and visualization" }
];

// Sample data for services
const services = [
  { name: "Brand Identity", description: "Complete brand development and identity design" },
  { name: "Digital Design", description: "Web, mobile, and digital interface design" },
  { name: "Motion Graphics", description: "Animation and motion design" },
  { name: "3D Visualization", description: "Three-dimensional design and rendering" },
  { name: "Creative Direction", description: "Strategic creative leadership" }
];

// Sample data for works/projects
const works = [
  {
    Client: "Careem",
    Slug: "careem",
    Title: "Careem Brand Evolution",
    Subtitle: "Digital transformation and brand refresh",
    Year: "2024",
    Type: "Brand Identity",
    Overview: "Complete brand evolution for the leading ride-hailing platform in the Middle East",
    Industry: "Transportation",
    Awards: "Design Week Awards 2024",
    Confidential: false
  },
  {
    Client: "DAZN",
    Slug: "dazn",
    Title: "DAZN Sports Platform",
    Subtitle: "Digital sports streaming experience",
    Year: "2023",
    Type: "Digital Design",
    Overview: "Redesign of the global sports streaming platform interface",
    Industry: "Entertainment",
    Awards: "SXSW Interactive Awards",
    Confidential: false
  },
  {
    Client: "Forevermark",
    Slug: "forevermark",
    Title: "Forevermark Diamond Collection",
    Subtitle: "Luxury jewelry brand campaign",
    Year: "2023",
    Type: "Brand Campaign",
    Overview: "Complete brand campaign for the luxury diamond jewelry collection",
    Industry: "Luxury Retail",
    Awards: "Cannes Lions 2023",
    Confidential: false
  },
  {
    Client: "Trek",
    Slug: "trek",
    Title: "Trek Bicycles",
    Subtitle: "Cycling brand digital experience",
    Year: "2022",
    Type: "Digital Design",
    Overview: "Digital platform redesign for the premium cycling brand",
    Industry: "Sports & Recreation",
    Awards: "Webby Awards",
    Confidential: false
  },
  {
    Client: "Valmont",
    Slug: "valmont",
    Title: "Valmont Skincare",
    Subtitle: "Luxury skincare brand identity",
    Year: "2022",
    Type: "Brand Identity",
    Overview: "Complete brand identity for the luxury Swiss skincare brand",
    Industry: "Beauty & Wellness",
    Awards: "Pentawards 2022",
    Confidential: false
  },
  {
    Client: "Wacoal",
    Slug: "wacoal",
    Title: "Wacoal Intimates",
    Subtitle: "Intimate apparel brand campaign",
    Year: "2021",
    Type: "Brand Campaign",
    Overview: "Brand campaign for the premium intimate apparel collection",
    Industry: "Fashion",
    Awards: "D&AD Awards",
    Confidential: false
  }
];

// Main function to populate all data
async function populateAllData() {
  console.log('🚀 Starting to populate Strapi with sample data...\n');

  // Create agencies
  console.log('📋 Creating agencies...');
  const createdAgencies = [];
  for (const agency of agencies) {
    const result = await createContent('agencies', {
      ...agency,
      publishedAt: new Date().toISOString()
    });
    if (result) createdAgencies.push(result);
  }

  // Create positions
  console.log('\n👥 Creating positions...');
  const createdPositions = [];
  for (const position of positions) {
    const result = await createContent('positions', {
      ...position,
      publishedAt: new Date().toISOString()
    });
    if (result) createdPositions.push(result);
  }

  // Create services
  console.log('\n🛠️ Creating services...');
  const createdServices = [];
  for (const service of services) {
    const result = await createContent('services', {
      ...service,
      publishedAt: new Date().toISOString()
    });
    if (result) createdServices.push(result);
  }

  // Create works (projects)
  console.log('\n🎨 Creating works/projects...');
  for (const work of works) {
    await createContent('works', {
      ...work,
      publishedAt: new Date().toISOString()
    });
  }

  console.log('\n✅ Data population complete!');
  console.log(`📊 Created: ${createdAgencies.length} agencies, ${createdPositions.length} positions, ${createdServices.length} services, ${works.length} works`);
}

// Run the population
populateAllData(); 