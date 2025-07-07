export const kenyanCounties = [
  'Nairobi',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Eldoret',
  'Thika',
  'Malindi',
  'Kitale',
  'Garissa',
  'Kakamega',
  'Machakos',
  'Meru',
  'Nyeri',
  'Kericho',
  'Embu',
  'Migori',
  'Homa Bay',
  'Turkana',
  'West Pokot',
  'Samburu',
  'Trans Nzoia',
  'Uasin Gishu',
  'Elgeyo-Marakwet',
  'Nandi',
  'Baringo',
  'Laikipia',
  'Nakuru',
  'Narok',
  'Kajiado',
  'Kericho',
  'Bomet',
  'Kakamega',
  'Vihiga',
  'Bungoma',
  'Busia',
  'Siaya',
  'Kisumu',
  'Homa Bay',
  'Migori',
  'Kisii',
  'Nyamira',
  'Nairobi',
  'Kiambu',
  'Murang\'a',
  'Kirinyaga',
  'Nyeri',
  'Nyandarua',
  'Meru',
  'Tharaka-Nithi',
  'Embu',
  'Kitui',
  'Machakos',
  'Makueni'
];

export const eventCategories = [
  'Technology & Innovation',
  'Business & Entrepreneurship',
  'Music & Entertainment',
  'Sports & Fitness',
  'Education & Training',
  'Arts & Culture',
  'Food & Drinks',
  'Health & Wellness',
  'Fashion & Beauty',
  'Agriculture',
  'Tourism & Travel',
  'Community & Social',
  'Religious & Spiritual',
  'Politics & Governance'
];

export const popularVenues = {
  'Nairobi': [
    'KICC - Kenyatta International Convention Centre',
    'Sarit Centre',
    'Village Market',
    'Two Rivers Mall',
    'Carnivore Restaurant',
    'Uhuru Park',
    'Nyayo National Stadium',
    'University of Nairobi',
    'Strathmore University',
    'Karen Country Club'
  ],
  'Mombasa': [
    'Mombasa Sports Club',
    'Nyali Beach',
    'Fort Jesus',
    'Bamburi Beach',
    'Mombasa Golf Club',
    'Technical University of Mombasa'
  ],
  'Kisumu': [
    'Kisumu Sports Club',
    'Dunga Beach',
    'Maseno University',
    'Kisumu Museum'
  ],
  'Nakuru': [
    'Nakuru Athletic Club',
    'Lake Nakuru National Park',
    'Egerton University'
  ]
};

export const formatKenyanCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatKenyanPhoneNumber = (phone: string): string => {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Handle different formats
  if (cleaned.startsWith('254')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+254${cleaned.substring(1)}`;
  } else if (cleaned.length === 9) {
    return `+254${cleaned}`;
  }
  
  return phone;
};