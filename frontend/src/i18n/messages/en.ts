const en = {
  brand: {
    tagline: 'Where time becomes legacy',
  },
  nav: {
    collections: 'Collections',
    about: 'About',
    contact: 'Contact',
    inquire: 'Inquire',
    atelier: 'Atelier',
    signIn: 'Sign in',
    admin: 'Admin',
    toggleMenu: 'Toggle menu',
  },
  preferences: {
    themeLight: 'Light theme',
    themeDark: 'Dark theme',
    language: 'Language',
  },
  hero: {
    eyebrow: 'Maison of precision',
    title: 'Time, composed with cinematic restraint.',
    description:
      'An original atelier experience — sculptural cases, luminous dials, and movements tuned for generations.',
    exploreCollections: 'Explore collections',
    privateConsultation: 'Private consultation',
    scroll: 'Scroll',
  },
  collections: {
    eyebrow: 'Featured collections',
    title: 'Curated ensembles for luminous moments',
    description:
      'Each line expresses a distinct character — from nocturnal depth to heritage warmth.',
    discover: 'Discover →',
    pageEyebrow: 'Collections',
    pageTitle: 'Discover the full maison catalogue',
    pageDescription:
      'Each collection expresses a distinct narrative — explore compositions crafted for collectors of quiet confidence.',
  },
  story: {
    eyebrow: 'Brand story',
    title: 'Crafted in silence, revealed in light',
    description:
      'Founded on the belief that true luxury whispers, our maison unites contemporary engineering with atelier finishing — each piece designed to outlast trends and transcend generations.',
    point1: 'Sculptural minimalism with hand-finished surfaces',
    point2: 'Movements regulated for enduring accuracy',
    point3: 'Noble alloys, sapphire crystal, modern legacy',
    imageAlt: 'Watchmaking atelier',
  },
  signature: {
    eyebrow: 'Signature pieces',
    title: 'Compositions for collectors who value depth',
  },
  craft: {
    eyebrow: 'Craftsmanship',
    title: 'A quiet luxury of layered textures and engineered detail',
    movement: 'Movement',
    movementText:
      'Integrated calibers regulated for lasting accuracy and refined finishing.',
    materials: 'Materials',
    materialsText: 'Sapphire crystal, ceramic bezels, and satin-polished noble alloys.',
    finishing: 'Finishing',
    finishingText:
      'Anglage, perlage, and discreet contrast — visible only to the discerning eye.',
  },
  testimonials: {
    eyebrow: 'Testimonials',
    title: 'Impressions from the inner circle',
  },
  newsletter: {
    eyebrow: 'Private circle',
    title: 'Receive atelier invitations and unveilings',
    description: 'Subscribe for early access to limited compositions and maison stories.',
    email: 'Email',
    placeholder: 'you@domain.com',
    subscribe: 'Subscribe',
    subscribing: 'Subscribing…',
    success: 'Welcome to the private circle.',
    error: 'Unable to subscribe. Try again shortly.',
  },
  footer: {
    description:
      'An original maison devoted to cinematic minimalism — precision movements, noble materials, and quiet confidence.',
  },
  about: {
    eyebrow: 'About the maison',
    title: 'A contemporary atelier devoted to precision, poise, and enduring design',
    p1: 'Échelon Atelier was established as an independent maison — free from excess, focused on the intimate dialogue between form, light, and mechanics.',
    p2: 'Our watchmakers approach each composition as a cinematic frame: balanced negative space, deliberate contrast, and finishing that rewards proximity.',
    p3: 'We invite collectors into a bespoke journey — from private viewings to personalized consultations — honoring discretion as the ultimate luxury.',
    imageAlt: 'Atelier',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Visit the atelier, in person or by appointment',
    maison: 'Maison',
    appointment: 'By private appointment — Geneva & Paris salons',
    consultation: 'Consultation',
    consultationText: 'For acquisitions, bespoke commissions, or servicing enquiries.',
    startInquiry: 'Start an inquiry',
    browseCollections: 'Browse collections',
  },
  inquiry: {
    eyebrow: 'Private inquiry',
    title: 'Begin your atelier journey',
    description:
      'Share your interest — our concierge will arrange a discreet consultation tailored to your collection.',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    submit: 'Submit inquiry',
    sending: 'Sending…',
    success: 'Your inquiry has been received. We will respond shortly.',
    error: 'Unable to send. Please try again.',
  },
  product: {
    viewPiece: 'View piece',
    requestViewing: 'Request private viewing',
    allCollections: 'All collections',
    collectionLabel: 'Collection',
    notFound: 'Piece not found',
  },
  auth: {
    memberAccess: 'Member access',
    joinAtelier: 'Join the atelier',
    signInTitle: 'Sign in to your maison account',
    createTitle: 'Create your account',
    username: 'Username',
    email: 'Email',
    firstName: 'First name',
    lastName: 'Last name',
    password: 'Password',
    pleaseWait: 'Please wait…',
    signIn: 'Sign in',
    createAccount: 'Create account',
    newCollector: 'New collector?',
    register: 'Register',
    alreadyMember: 'Already a member?',
    authFailed: 'Authentication failed',
  },
};

export default en;

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Messages = DeepStringify<typeof en>;
