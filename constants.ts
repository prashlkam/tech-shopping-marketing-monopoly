
import { Property, Card, PropertyType, SpecialSquareType, CardAction } from './types';

export const AVATARS = [
  { name: 'Top Hat', icon: '🎩' },
  { name: 'Racecar', icon: '🏎️' },
  { name: 'Battleship', icon: '🚢' },
  { name: 'Scottie Dog', icon: '🐕' },
  { name: 'Boot', icon: '👢' },
  { name: 'Cat', icon: '🐈' },
];

export const INITIAL_CASH = 2500;
export const PASS_GO_SALARY = 200;
export const JAIL_POSITION = 10;
export const GO_TO_JAIL_POSITION = 30;

// Raw data for cards, manually inserted to avoid fetch/import issues in browser environments
const CARD_DATA = {
  "BFSI": [
    "Digital Account Opening: Streamlining and simplifying the online and mobile account opening process.",
    "Legacy System Modernization: Migrating from outdated core banking platforms to more agile, cloud-based systems.",
    "Cybersecurity Threats: Protecting against increasingly sophisticated cyberattacks, including ransomware and data breaches.",
    "Regulatory Compliance: Keeping up with ever-changing regulations like AML (Anti-Money Laundering) and KYC (Know Your Customer).",
    "Personalized Customer Experience: Requests for AI-driven tools to offer tailored product recommendations and financial advice.",
    "24/7 Customer Support: Implementing chatbots and AI for round-the-clock customer service to handle common queries."
  ],
  "Manufacturing": [
    "Supply Chain Visibility & Resilience: Gaining end-to-end visibility into the supply chain to better manage disruptions.",
    "Smart Factory / Industry 4.0 Implementation: Integrating IoT, AI, and automation to create more efficient and connected factories.",
    "Predictive Maintenance: Using sensor data and AI to predict equipment failure and schedule maintenance proactively.",
    "Labor Shortage: Addressing the challenge of finding and retaining skilled workers."
  ],
  "Consumer Business": [
    "E-commerce Platform Development: Building and enhancing online stores to provide a seamless shopping experience.",
    "Omnichannel Fulfillment: Implementing strategies like 'buy online, pick up in-store' (BOPIS) and ship-from-store.",
    "Inflationary Pressures: Concerns about rising costs of goods and labor impacting profitability."
  ],
  "Healthcare & Life Sciences": [
    "Electronic Health Record (EHR) Optimization: Improving the usability and interoperability of EHR systems.",
    "Telehealth & Virtual Care Platforms: Developing and scaling telehealth solutions for remote patient consultations.",
    "Cybersecurity & HIPAA Compliance: Protecting sensitive patient data from breaches and ensuring compliance with regulations.",
    "Interoperability Challenges: Difficulty in sharing patient data across different healthcare systems and providers."
  ],
  "Hi-Tech & Services": [
    "Product Engineering & Innovation: The need for continuous innovation and shorter product development cycles.",
    "Supply Chain Instability: Managing disruptions and ensuring a resilient supply chain for hardware components.",
    "Talent Shortages: Difficulty in recruiting and retaining top tech talent in areas like AI and cloud computing."
  ],
  "Energy & Utilities": [
    "Grid Modernization & Smart Grids: Implementing smart meters and sensors to create a more efficient and resilient grid.",
    "Renewable Energy Integration: Integrating solar, wind, and other renewable energy sources into the grid.",
    "Cybersecurity for Critical Infrastructure: Protecting the grid and other critical infrastructure from cyber threats.",
    "Aging Infrastructure: The need to modernize and replace aging infrastructure to improve reliability and safety."
  ]
};


const generateInitialCards = (): { cookies: Card[], messages: Card[] } => {
  const cookies: Card[] = [];
  const messages: Card[] = [];

  const NEGATIVE_KEYWORDS = ['threats', 'breach', 'compliance', 'shortage', 'instability', 'disruptions', 'challenges', 'lack', 'poor', 'high fees', 'dissatisfaction', 'difficulties', 'resistance', 'burnout', 'costs', 'inadequate', 'downtime', 'fine', 'lose', 'disjointed', 'aging', 'failure', 'pressures'];
  const POSITIVE_KEYWORDS = ['streamlining', 'modernization', 'personalized', 'implementing', 'automation', 'solutions', 'enhancing', 'building', 'improving', 'optimizing', 'accelerating', 'enablement', 'bonus', 'collect', 'success', 'funding', 'won', 'viral', 'generation', 'development', 'integration'];

  const AMOUNTS = [50, 75, 100, 150];

  const allItems: string[] = Object.values(CARD_DATA).flat();

  allItems.forEach(text => {
    const lowerCaseText = text.toLowerCase();
    
    const isNegative = NEGATIVE_KEYWORDS.some(keyword => lowerCaseText.includes(keyword));
    const randomAmount = AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)];

    if (isNegative) {
      cookies.push({ text: `${text} Pay $${randomAmount}.`, action: CardAction.PAY, amount: randomAmount });
    } else {
      messages.push({ text: `${text} You win the project! Collect $${randomAmount}.`, action: CardAction.COLLECT, amount: randomAmount });
    }
  });

  // Add essential gameplay cards for balance and core mechanics
  cookies.push({ text: "Go to Jail. Do not pass Go, do not collect $200.", action: CardAction.GO_TO_JAIL });
  cookies.push({ text: "Get Out of Jail Free. This card may be kept until needed.", action: CardAction.GET_OUT_OF_JAIL });
  cookies.push({ text: "Data Breach Fine: Pay $150.", action: CardAction.PAY, amount: 150 });

  messages.push({ text: "Advance to Go. Collect $200.", action: CardAction.MOVE_TO, moveTo: 0 });
  messages.push({ text: "Venture Capital Funding: Collect $200.", action: CardAction.COLLECT, amount: 200 });
  messages.push({ text: "IPO Success: Collect $150.", action: CardAction.COLLECT, amount: 150 });

  return { cookies, messages };
};

export const CARDS = generateInitialCards();


export const PROPERTIES: Property[] = [
  { id: 0, name: 'GO', type: PropertyType.SPECIAL, specialType: SpecialSquareType.GO, image: 'Assets/special/go.png' },
  { id: 1, name: 'Banking', type: PropertyType.INDUSTRY, price: 60, maintenanceFee: 10, color: '#955436', image: 'Assets/properties/banking.png' },
  { id: 2, name: 'Message Chest', type: PropertyType.SPECIAL, specialType: SpecialSquareType.MESSAGE_CHEST, image: 'Assets/special/message.png' },
  { id: 3, name: 'Insurance', type: PropertyType.INDUSTRY, price: 60, maintenanceFee: 10, color: '#955436', image: 'Assets/properties/insurance.png' },
  { id: 4, name: 'Web3 Domain', type: PropertyType.DOMAIN, price: 200, maintenanceFee: 25, image: 'Assets/properties/domain.png' },
  { id: 5, name: 'Retail', type: PropertyType.INDUSTRY, price: 100, maintenanceFee: 15, color: '#aee2fb', image: 'Assets/properties/retail.png' },
  { id: 6, name: 'AI Domain', type: PropertyType.DOMAIN, price: 200, maintenanceFee: 25, image: 'Assets/properties/domain.png' },
  { id: 7, name: 'CPG', type: PropertyType.INDUSTRY, price: 100, maintenanceFee: 15, color: '#aee2fb', image: 'Assets/properties/cpg.png' },
  { id: 8, name: 'Fintech', type: PropertyType.INDUSTRY, price: 120, maintenanceFee: 20, color: '#aee2fb', image: 'Assets/properties/fintech.png' },
  { id: 9, name: 'Cookie Chest', type: PropertyType.SPECIAL, specialType: SpecialSquareType.COOKIE_CHEST, image: 'Assets/special/cookie.png' },
  { id: 10, name: 'Just Visiting / In Jail', type: PropertyType.SPECIAL, specialType: SpecialSquareType.JAIL, image: 'Assets/special/jail.png' },
  { id: 11, name: 'Automotive', type: PropertyType.INDUSTRY, price: 140, maintenanceFee: 25, color: '#d93a96', image: 'Assets/properties/automotive.png' },
  { id: 12, name: 'Gaming Domain', type: PropertyType.DOMAIN, price: 200, maintenanceFee: 25, image: 'Assets/properties/domain.png' },
  { id: 13, name: 'Aerospace', type: PropertyType.INDUSTRY, price: 140, maintenanceFee: 25, color: '#d93a96', image: 'Assets/properties/aerospace.png' },
  { id: 14, name: 'Industrial Mfg.', type: PropertyType.INDUSTRY, price: 160, maintenanceFee: 30, color: '#d93a96', image: 'Assets/properties/industrial.png' },
  { id: 15, name: 'Process Mfg.', type: PropertyType.INDUSTRY, price: 180, maintenanceFee: 35, color: '#f89422', image: 'Assets/properties/process.png' },
  { id: 16, name: 'Message Chest', type: PropertyType.SPECIAL, specialType: SpecialSquareType.MESSAGE_CHEST, image: 'Assets/special/message.png' },
  { id: 17, name: 'EPC', type: PropertyType.INDUSTRY, price: 180, maintenanceFee: 35, color: '#f89422', image: 'Assets/properties/epc.png' },
  { id: 18, name: 'Semiconductors', type: PropertyType.INDUSTRY, price: 200, maintenanceFee: 40, color: '#f89422', image: 'Assets/properties/semiconductor.png' },
  { id: 19, name: 'Metaverse Domain', type: PropertyType.DOMAIN, price: 200, maintenanceFee: 25, image: 'Assets/properties/domain.png' },
  { id: 20, name: 'Free Parking', type: PropertyType.SPECIAL, specialType: SpecialSquareType.FREE_PARKING, image: 'Assets/special/parking.png' },
  { id: 21, name: 'Software', type: PropertyType.INDUSTRY, price: 220, maintenanceFee: 45, color: '#ee1d23', image: 'Assets/properties/software.png' },
  { id: 22, name: 'Cookie Chest', type: PropertyType.SPECIAL, specialType: SpecialSquareType.COOKIE_CHEST, image: 'Assets/special/cookie.png' },
  { id: 23, name: 'Platforms', type: PropertyType.INDUSTRY, price: 220, maintenanceFee: 45, color: '#ee1d23', image: 'Assets/properties/platforms.png' },
  { id: 24, name: 'Hardware/OEMs', type: PropertyType.INDUSTRY, price: 240, maintenanceFee: 50, color: '#ee1d23', image: 'Assets/properties/hardware.png' },
  { id: 25, name: 'Dev Domain', type: PropertyType.DOMAIN, price: 200, maintenanceFee: 25, image: 'Assets/properties/domain.png' },
  { id: 26, name: 'Payers', type: PropertyType.INDUSTRY, price: 260, maintenanceFee: 55, color: '#ffed20', image: 'Assets/properties/payers.png' },
  { id: 27, name: 'Providers', type: PropertyType.INDUSTRY, price: 260, maintenanceFee: 55, color: '#ffed20', image: 'Assets/properties/providers.png' },
  { id: 28, name: 'Data Domain', type: PropertyType.DOMAIN, price: 200, maintenanceFee: 25, image: 'Assets/properties/domain.png' },
  { id: 29, name: 'PBM', type: PropertyType.INDUSTRY, price: 280, maintenanceFee: 60, color: '#ffed20', image: 'Assets/properties/pbm.png' },
  { id: 30, name: 'Go To Jail', type: PropertyType.SPECIAL, specialType: SpecialSquareType.GO_TO_JAIL, image: 'Assets/special/go-to-jail.png' },
  { id: 31, name: 'Health Tech', type: PropertyType.INDUSTRY, price: 300, maintenanceFee: 65, color: '#1fb25a', image: 'Assets/properties/health-tech.png' },
  { id: 32, 'name': 'Oil & Gas', type: PropertyType.INDUSTRY, price: 300, maintenanceFee: 65, color: '#1fb25a', image: 'Assets/properties/oil-gas.png' },
  { id: 33, name: 'Message Chest', type: PropertyType.SPECIAL, specialType: SpecialSquareType.MESSAGE_CHEST, image: 'Assets/special/message.png' },
  { id: 34, 'name': 'Utilities', type: PropertyType.INDUSTRY, price: 320, maintenanceFee: 70, color: '#1fb25a', image: 'Assets/properties/utilities.png' },
  { id: 35, 'name': 'Tech Domain', type: PropertyType.DOMAIN, price: 200, maintenanceFee: 25, image: 'Assets/properties/domain.png' },
  { id: 36, 'name': 'Cookie Chest', type: PropertyType.SPECIAL, specialType: SpecialSquareType.COOKIE_CHEST, image: 'Assets/special/cookie.png' },
  { id: 37, 'name': 'Capital Markets', type: PropertyType.INDUSTRY, price: 350, maintenanceFee: 75, color: '#0072bb', image: 'Assets/properties/capital-markets.png' },
  { id: 38, 'name': 'App Domain', type: PropertyType.DOMAIN, price: 200, maintenanceFee: 25, image: 'Assets/properties/domain.png' },
  { id: 39, 'name': 'Professional Svcs', type: PropertyType.INDUSTRY, price: 400, maintenanceFee: 100, color: '#0072bb', image: 'Assets/properties/professional-services.png' },
];