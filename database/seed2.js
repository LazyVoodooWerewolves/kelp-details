const fs = require('fs');
const { exec } = require('child_process');
const faker = require('faker');

const morningHours = ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00'];
const eveningHours = ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
const attire = ['casual', 'dressy'];
const alcohol = ['full_bar', 'none', 'beer_and_wine'];
const noiseLevel = ['very_loud', 'average', 'quiet', 'loud'];
const wifi = ['no', 'free'];
const categories = ['3D Printing', 'Abruzzese', 'Absinthe Bars', 'Acai Bowls', 'Accessories', 'Accountants', 'Acne Treatment', 'Active Life', 'Acupuncture', 'Addiction Medicine', 'Adoption Services', 'Adult', 'Adult Education', 'Adult Entertainment', 'Advertising', 'Aerial Fitness', 'Aerial Tours', 'Aestheticians', 'Afghan', 'African', 'Afro-Brazilian', 'Agriturismi', 'Aircraft Dealers', 'Aircraft Repairs', 'Air Duct Cleaning', 'Airlines', 'Airport Shuttles', 'Airport Lounges', 'Airports', 'Airport Terminals', 'Airsoft', 'Alentejo', 'Algarve', 'Allergists', 'Alsatian', 'Alternative Medicine', 'Altoatesine', 'Amateur Sports Teams', 'Amusement Parks', 'Andalusian', 'Anesthesiologists', 'Animal Assisted Therapy', 'Holistic Animal Care', 'Animal Physical Therapy', 'Animal Shelters', 'Antiques', 'Apartment Agents', 'Apartments', 'Appliances', 'Appraisal Services', 'Apulian', 'Aquariums', 'Aquarium Services', 'Arabian', 'Arab Pizza', 'Arcades', 'Archery', 'Architects', 'Architectural Tours', 'Argentine', 'Armenian', 'Arroceria / Paella', 'Art Classes', 'Artificial Turf', 'Art Museums', 'Art Restoration', 'Arts & Entertainment', 'Arts & Crafts', 'Art Schools', 'Art Space Rentals', 'Art Supplies', 'Art Tours', 'Asian Fusion', 'Assisted Living Facilities', 'Astrologers', 'Asturian', 'Ateliers', 'Attraction Farms', 'ATV Rentals/Tours', 'Auction Houses', 'Audiologist', 'Audio/Visual Equipment Rental', 'Australian', 'Austrian', 'Authorized Postal Representative', 'Automotive', 'Auto Detailing', 'Auto Customization', 'Car Inspectors', 'Auto Electric Services', 'Auto Glass Services', 'Auto Insurance', 'Auto Loan Providers', 'Auto Parts & Supplies', 'Auto Repair', 'Auto Security', 'Auto Upholstery', 'Auvergnat', 'Aviation Services', 'Awnings', 'Axe Throwing', 'Ayurveda', 'Azores', 'Baby Gear & Furniture', 'Backflow Services', 'Backshop', 'Baden', 'Badminton', 'Bagels', 'Baguettes', 'Bail Bondsmen', 'Bakeries', 'Balloon Services', 'Bangladeshi', 'Bankruptcy Law', 'Banks & Credit Unions', 'Barbers', 'Bar Crawl', 'Barre Classes', 'Bars', 'Bartenders', 'Bartending Schools', 'Baseball Fields', 'Basketball Courts', 'Basque', 'Bathing Area', 'Battery Stores', 'Batting Cages', 'Bavarian', 'Barbeque', 'Beach Bars', 'Beach Equipment Rentals', 'Beaches', 'Beach Volleyball', 'Beauty & Spas', 'Bed & Breakfast', 'Beer,  Wine & Spirits', 'Beer Bar', 'Beer Garden', 'Beer Gardens', 'Beer Hall', 'Beer Tours', 'Behavior Analysts', 'Beira', 'Beisl', 'Belgian', 'Bento', 'Berrichon', 'Bespoke Clothing', 'Betting Centers', 'Beverage Store', 'Bicycle Paths', 'Bicycles', 'Bike Repair/Maintenance', 'Bike Associations', 'Bike Parking', 'Bike Rentals', 'Bike Repair', 'Bikes', 'Bike Sharing', 'Bike Shop', 'Bike tours', 'Billing Services', 'Bingo Halls', 'Bird Shops', 'Bistros', 'Black Sea', 'Shades & Blinds', 'Blood & Plasma Donation Centers', 'Blowfish', 'Blow Dry/Out Services', 'Boat Charters', 'Boat Dealers', 'Boating', 'Boat Parts & Supplies', 'Boat Repair', 'Boat Tours', 'Bobsledding', 'Bocce Ball', 'Body Contouring', 'Body Shops', 'Bookbinding', 'Bookkeepers', 'Bookstores', 'Boot Camps', 'Boudoir Photography', 'Bounce House Rentals', 'Bourguignon', 'Bowling', 'Boxing', 'Brasseries', 'Brazilian', 'Brazilian Empanadas', 'Brazilian Jiu-jitsu', 'Breakfast & Brunch', 'Breweries', 'Brewing Supplies', 'Brewpubs', 'Bridal', 'British', 'Bubble Soccer', 'Bubble Tea', 'Buddhist Temples', 'Buffets', 'Building Supplies', 'Bulgarian', 'Bulk Billing', 'Bungee Jumping', 'Burgers', 'Burmese', 'Buses', 'Business Consulting', 'Business Financing', 'Business Law', 'Bus Rental', 'Bus Stations', 'Bus Tours', 'Butcher', 'Counseling & Mental Health', 'Cabaret', 'Cabinetry', 'Cable Cars', 'Cafes', 'Cafeteria', 'Cajun/Creole', 'Patisserie/Cake Shop', 'Calabrian', 'Calligraphy', 'Cambodian', 'Campgrounds', 'Candle Stores', 'Candy Stores', 'Cannabis Clinics', 'Cannabis Collective', 'Cannabis Dispensaries', 'Medical Cannabis Referrals', 'Cannabis Tours', 'Canteen', 'Cantonese', 'Car Dealers', 'Car Auctions', 'Car Brokers', 'Car Buyers', 'Cardio Classes', 'Cardiologists', 'Career Counseling', 'Caribbean', 'Caricatures', 'Carousels', 'Carpenters', 'Carpet Cleaning', 'Carpet Dyeing', 'Carpeting', 'Carpet Installation', 'Car Rental', 'Car Share Services', 'Car Wash', 'Car Window Tinting', 'Casinos', 'Castles', 'Catalan', 'Caterers', 'Mobile Phone Accessories', 'Central Brazilian', 'Ceremonial Clothing', 'Challenge Courses', 'Champagne Bars', 'Chee Kufta', 'Cheerleading', 'Cheese Shops', 'Cheesesteaks', 'Cheese Tasting Classes', 'Chicken Wings', 'Chicken Shop', 'Childbirth Education', 'Child Care & Day Care', 'Children\'s Clothing', 'Childproofing', 'Children\'s Museums', 'Chilean', 'Chimney Cakes', 'Chimney Sweeps', 'Chinese', 'Chinese Bazaar', 'Chinese Martial Arts', 'Chiropractors', 'Chocolatiers & Shops', 'Choirs', 'Christmas Trees', 'Churches', 'Churros', 'Cideries', 'Cigar Bars', 'Circuit Training Gyms', 'Circus Schools', 'Civic Center', 'Climbing', 'Clock Repair', 'Clothing Rental', 'Clowns', 'Club Crawl', 'Cocktail Bars', 'Coffee & Tea', 'Coffee Roasteries', 'Coffeeshops', 'Coffee & Tea Supplies', 'College Counseling', 'Colleges & Universities', 'Colombian', 'Colonics', 'Comedy Clubs', 'Comfort Food', 'Comic Books', 'Commercial Real Estate', 'Commissioned Artists', 'Community Book Box', 'Community Centers', 'Community Gardens', 'Computers', 'Concept Shops', 'Concierge Medicine', 'Condominiums', 'Congee', 'Contract Law', 'Contractors', 'Convenience Stores', 'Conveyor Belt Sushi', 'Cooking Classes', 'Cooking Schools', 'Printing Services', 'Corsican', 'Cosmetic Dentists', 'Cosmetics & Beauty Supply', 'Cosmetic Surgeons', 'Cosmetology Schools', 'Costumes', 'Countertop Installation', 'Country Clubs', 'Country Dance Halls', 'Couriers & Delivery Services', 'Courthouses', 'Court Reporters', 'CPR Classes', 'Crane Services', 'Cremation Services', 'Creperies', 'Criminal Defense Law', 'Cryotherapy', 'CSA', 'Cuban', 'Cucina campana', 'Cultural Center', 'Cupcakes', 'Currency Exchange', 'Curry Sausage', 'Custom Cakes', 'Customized Merchandise', 'Customs Brokers', 'Cycling Classes', 'Cypriot', 'Czech', 'Czech/Slovakian', 'Dagashi', 'Damage Restoration', 'Dance Schools', 'Dance Clubs', 'Dance Restaurants', 'Dance Studios', 'Dance Wear', 'Danish', 'Data Recovery', 'Day Camps', 'Debt Relief Services', 'Decks & Railing', 'Delicatessen', 'Delis', 'Demolition Services', 'Storefront Clinics', 'Dental Hygienists', 'Mobile Clinics', 'Dentists', 'Departments of Motor Vehicles', 'Department Stores', 'Dermatologists', 'Desserts', 'Diagnostic Imaging', 'Diagnostic Services', 'Dialysis Clinics', 'Dietitians', 'Digitizing Services', 'Dim Sum', 'Diners', 'Dinner Theater', 'Disability Law', 'Disc Golf', 'Discount Store', 'Distilleries', 'Dive Bars', 'Dive Shops', 'Diving', 'Divorce & Family Law', 'DIY Auto Shop', 'Do-It-Yourself Food', 'DJs', 'Dog Parks', 'Dog Walkers', 'Dolmus Station', 'Dominican', 'Donairs', 'Donation Center', 'Donburi', 'Donuts', 'Door Sales/Installation', 'Doulas', 'Drama Schools', 'Dried Fruit', 'Drive-In Theater', 'Drive-Thru Bars', 'Driving Schools', 'Drones', 'Drugstores', 'Dry Cleaning', 'Drywall Installation & Repair', 'DUI Law', 'DUI Schools', 'Dumplings', 'Dumpster Rental', 'Duplication Services', 'Duty-Free Shops', 'Ear Nose & Throat', 'Eastern European', 'Eastern German', 'Eastern Mexican', 'Eatertainment', 'Editorial Services', 'Education', 'Educational Services', 'Egyptian', 'Elder Care Planning', 'Electricians', 'Electricity Suppliers', 'Electronics', 'Electronics Repair', 'Elementary Schools', 'Parent Cafes', 'Embassy', 'Embroidery & Crochet', 'Emergency Medicine', 'Emergency Pet Hospital', 'Emergency Rooms', 'Emilian', 'Empanadas', 'Employment Agencies', 'Employment Law', 'EMS Training', 'Endocrinologists', 'Endodontists', 'Engraving', 'Entertainment Law', 'Environmental Abatement', 'Environmental Testing', 'Erotic Massage', 'Escape Games', 'Estate Liquidation', 'Real Estate Photography', 'Estate Planning Law', 'Estheticians', 'Ethical Grocery', 'Ethiopian', 'EV Charging Stations', 'Event Photography', 'Party & Event Planning', 'Event Planning & Services', 'Excavation Services', 'Experiences', 'Eyebrow Services', 'Eyelash Service', 'Fabric Stores', 'Face Painting', 'Fado Houses', 'Falafel', 'Family Practice', 'Farm Equipment Repair', 'Farmers Market', 'Farming Equipment', 'Farms', 'Farriers', 'Fashion', 'Fasil Music', 'Fences & Gates', 'Fencing Clubs', 'Feng Shui', 'Ferries', 'Fertility', 'Festivals', 'Filipino', 'Financial Advising', 'Financial Services', 'Fingerprinting', 'Firearm Training', 'Fire Departments', 'Fireplace Services', 'Fire Protection Services', 'Firewood', 'Fireworks', 'First Aid Classes', 'Fischbroetchen', 'Fishing', 'Fishmonger', 'Fish & Chips', 'Fitness & Instruction', 'Fitness/Exercise Equipment', 'Flatbread', 'Flea Markets', 'Flemish', 'Flight Instruction', 'Float Spa', 'Flooring', 'Floral Designers', 'Florists', 'Flowers & Gifts', 'Flyboarding', 'Fondue', 'Food', 'Food Court', 'Food Banks', 'Food Delivery Services', 'Food Safety Training', 'Food Stands', 'Food Tours', 'Food Trucks', 'Soccer', 'Forestry', 'Formal Wear', 'Foundation Repair', 'Framing', 'Franconian', 'Free Diving', 'Freiduria', 'French', 'Friterie', 'Friulan', 'Frozen Food', 'Fuel Docks', 'Funeral Services & Cemeteries', 'Fun Fair', 'Fur Clothing', 'Furniture Stores', 'Furniture Assembly', 'Furniture Repair', 'Fuzhou', 'Galician', 'Art Galleries', 'Game Meat', 'Game Truck Rental', 'Garage Door Services', 'Gardeners', 'Nurseries & Gardening', 'Botanical Gardens', 'Gastroenterologist', 'Gastropubs', 'Gay Bars', 'Gelato', 'Gemstones & Minerals', 'General Litigation', 'General Dentistry', 'General Festivals', 'Generator Installation/Repair', 'Geneticists', 'Georgian', 'German', 'Gerontologists', 'Gestorias', 'Giblets', 'Gift Shops', 'Glass & Mirrors', 'Glass Blowing', 'Gliding', 'Mulled Wine', 'Gluten-Free', 'Go Karts', 'Gold Buyers', 'Golf', 'Golf Cart Dealers', 'Golf Cart Rentals', 'Golf Equipment', 'Golf Lessons', 'Specialty Food', 'Gozleme', 'Graphic Design', 'Greek', 'Grilling Equipment', 'Grocery', 'Pet Groomers', 'Grout Services', 'Guamanian', 'Guest Houses', 'Guitar Stores', 'Gun/Rifle Ranges', 'Guns & Ammo', 'Gunsmith', 'Gutter Services', 'Gymnastics', 'Gyms', 'Gyudon', 'Habilitative Services', 'Hainan', 'Hair Salons', 'Hair Extensions', 'Hair Loss Centers', 'Hair Removal', 'Hair Stylists', 'Haitian', 'Hakka', 'Halal', 'Halfway Houses', 'Halotherapy', 'Handball', 'Hand Rolls', 'Handyman', 'Hang Gliding', 'Hardware Stores', 'Hats', 'Haunted Houses', 'Hawaiian', 'Hawker Centre', 'Hazardous Waste Disposal', 'Head Shops', 'Health & Medical', 'Health Coach', 'Health Insurance Offices', 'Health Markets', 'Health Retreats', 'Trainers', 'Hearing Aids', 'Hearing Aid Providers', 'Henghwa', 'Henna Artists', 'Hepatologists', 'Herbal Shops', 'Herbs & Spices', 'Hessian', 'Heuriger', 'High Fidelity Audio Equipment', 'Middle Schools & High Schools', 'Hiking', 'Himalayan/Nepalese', 'Hindu Temples', 'Historical Tours', 'Hong Kong Style Cafe', 'Hobby Shops', 'Hockey Equipment', 'Hokkien', 'Holiday Decorations', 'Home Inspectors', 'Home Organization', 'Home & Garden', 'Appliances & Repair', 'Home Automation', 'Home Cleaning', 'Home Decor', 'Home Developers', 'Home Energy Auditors', 'Home Health Care', 'Home & Rental Insurance', 'Homeless Shelters', 'Homemade Food', 'Home Network Installation', 'Homeopathic', 'Homeowner Association', 'Home Services', 'Home Staging', 'Home Theatre Installation', 'Home Window Tinting', 'Honduran', 'Honey', 'Hookah Bars', 'Horse Boarding', 'Horseback Riding', 'Horse Equipment Shops', 'Horse Racing', 'Horumon', 'Hospice', 'Hospitalists', 'Hospitals', 'Hostels', 'Hot Air Balloons', 'Hot Dogs', 'Fast Food', 'Hotel bar', 'Hotels', 'Hotels & Travel', 'Hot Pot', 'Hot Springs', 'Hot Tub & Pool', 'House Sitters', 'Housing Cooperatives', 'Hunan', 'Hungarian', 'Hunting & Fishing Supplies', 'Heating & Air Conditioning/HVAC', 'Hybrid Car Repair', 'Hydro-jetting', 'Hydroponics', 'Hydrotherapy', 'Hypnosis/Hypnotherapy', 'Iberian', 'Ice Cream & Frozen Yogurt', 'Ice Delivery', 'Immigration Law', 'Immunodermatologists', 'Imported Food', 'Indonesian', 'Indoor Playcentre', 'Indoor Landscaping', 'Indian', 'Infectious Disease Specialists', 'Installment Loans', 'Insulation Installation', 'Insurance', 'Interior Design', 'Interlock Systems', 'Internal Medicine', 'International', 'Internet Booths & Calling Centers', 'Internet Cafes', 'Interval Training Gyms', 'International Grocery', 'Investing', 'IP & Internet Law', 'Irish', 'Irish Pub', 'Irrigation', 'Island Pub', 'Internet Service Providers', 'Israeli', 'Italian', 'IT Services & Computer Repair', 'IV Hydration', 'Izakaya', 'Jails & Prisons', 'Jaliscan', 'Japanese Curry', 'Japanese', 'Jazz & Blues', 'Jet Skis', 'Jewelry', 'Jewelry Repair', 'Jewish', 'Japanese Sweets', 'Juice Bars & Smoothies', 'Junk Removal & Hauling', 'Junkyards', 'Kaiseki', 'Karaoke', 'Karaoke Rental', 'Karate', 'Kebab', 'Kickboxing', 'Kids Activities', 'Kids Hair Salons', 'Kimonos', 'Kiosk', 'Kitchen & Bath', 'Kitchen Incubators', 'Kitchen Supplies', 'Kiteboarding', 'Knife Sharpening', 'Knitting Supplies', 'Kombucha', 'Kopitiam', 'Korean', 'Kosher', 'Kurdish', 'Kushikatsu', 'Laboratory Testing', 'Lactation Services', 'Lahmacun', 'Lakes', 'LAN Centers', 'Landmarks & Historical Buildings', 'Landscape Architects', 'Landscaping', 'Land Surveying', 'Language Schools', 'Laos', 'Laotian', 'Laser Hair Removal', 'Laser Eye Surgery/Lasik', 'Laser Tag', 'Latin American', 'Laundromat', 'Laundry Services', 'Lawn Bowling', 'Lawn Services', 'Lawyers', 'Leather Goods', 'Lebanese', 'Legal Services', 'Libraries', 'Lice Services', 'Life Coach', 'Life Insurance', 'Lighting Fixtures & Equipment', 'Lighting Stores', 'Ligurian', 'Limos', 'Linens', 'Lingerie', 'Livestock Feed & Supply', 'Local Fish Stores', 'Local Flavor', 'Local Services', 'Keys & Locksmiths', 'Lounges', 'Luggage', 'Luggage Storage', 'Lumbard', 'Lyonnais', 'Macarons', 'Machine & Tool Rental', 'Machine Shops', 'Madeira', 'Magicians', 'Newspapers & Magazines', 'Mah Jong Halls', 'Mailbox Centers', 'Makerspaces', 'Makeup Artists', 'Malaysian', 'Mamak', 'Marching Bands', 'Marinas', 'Marketing', 'Fruits & Veggies', 'Market Stalls', 'Martial Arts', 'Masonry/Concrete', 'Massage', 'Massage Schools', 'Massage Therapy', 'Mass Media', 'Matchmakers', 'Materiale elettrico', 'Maternity Wear', 'Mattresses', 'Mauritius', 'Meatballs', 'Meat Shops', 'Medical Centers', 'Books,  Mags,  Music & Video', 'Mediators', 'Medical Foot Care', 'Medical Law', 'Medical Spas', 'Medical Supplies', 'Medical Transportation', 'Meditation Centers', 'Mediterranean', 'Memory Care', 'Men\'s Clothing', 'Men\'s Hair Salons', 'Metal Detector Services', 'Metal Fabricators', 'Metro Stations', 'Mexican', 'Middle Eastern', 'Midwives', 'Military Surplus', 'Milk Bars', 'Milkshake Bars', 'Minho', 'Mini Golf', 'Misting System Services', 'Mobile Home Repair', 'Mobile Dent Repair', 'Mobile Home Dealers', 'Mobile Home Parks', 'Mobile Phone Repair', 'Mobile Phones', 'Mobility Equipment Sales & Services', 'Modern Australian', 'Modern European', 'Mohels', 'Mongolian', 'Montessori Schools', 'Moroccan', 'Mortgage Brokers', 'Mortgage Lenders', 'Mortuary Services', 'Mosques', 'Motorsport Vehicle Dealers', 'Motorcycle Rental', 'Motorcycle Dealers', 'Motorcycle Repair', 'Motorcycle Gear', 'Motorsport Vehicle Repairs', 'Mountain Biking', 'Mountain Huts', 'Movers', 'Cinema', 'Muay Thai', 'Municipality', 'Museums', 'Musical Instruments & Teachers', 'Musicians', 'Musical Instrument Services', 'Music Production Services', 'Music Venues', 'Music & DVDs', 'Mystics', 'Nail Technicians', 'Nanny Services', 'Napoletana', 'Nasi Lemak', 'Natural Gas Suppliers', 'Naturopathic/Holistic', 'Nephrologists', 'Neurologist', 'Neuropathologists', 'Neurotologists', 'American (New)', 'Canadian (New)', 'New Mexican Cuisine', 'New Zealand', 'Nicaraguan', 'Nicoise', 'Night Food', 'Nightlife', 'Nikkei', 'Community Service/Non-Profit', 'Noodles', 'Norcinerie', 'Northeastern Brazilian', 'Northern Brazilian', 'Northern German', 'Northern Mexican', 'Traditional Norwegian', 'Notaries', 'Nudist', 'Nurse Practitioner', 'Nursing Schools', 'Nutritionists', 'Nyonya', 'Oaxacan', 'Obstetricians & Gynecologists', 'Observatories', 'Occupational Therapy', 'Oden', 'Office Cleaning', 'Office Equipment', 'Officiants', 'Oil Change Stations', 'Okinawan', 'Okonomiyaki', 'Olive Oil', 'Oncologist', 'Onigiri', 'Open Sandwiches', 'Opera & Ballet', 'Ophthalmologists', 'Eyewear & Opticians', 'Optometrists', 'Oral Surgeons', 'Organ & Tissue Donor Services', 'Organic Stores', 'Oriental', 'Orthodontists', 'Orthopedists', 'Orthotics', 'Osteopathic Physicians', 'Osteopaths', 'Nail Salons', 'Otologists', 'Ottoman Cuisine', 'Outdoor Furniture Stores', 'Outdoor Gear', 'Outdoor Movies', 'Outlet Stores', 'Oxygen Bars', 'Oyakodon', 'Pachinko', 'Packing Services', 'Packing Supplies', 'Paddleboarding', 'Pain Management', 'Paint & Sip', 'Paintball', 'Painters', 'Paint Stores', 'Paint-Your-Own Pottery', 'Pakistani', 'Palatine', 'Pan Asian', 'Panzerotti', 'Parasailing', 'Parenting Classes', 'Parking', 'Parklets', 'Parks', 'Parma', 'Party Bike Rentals', 'Party Bus Rentals', 'Party Characters', 'Party Equipment Rentals', 'Party Supplies', 'Passport & Visa Services', 'Pasta Shops', 'Patent Law', 'Pathologists', 'Patio Coverings', 'Pawn Shops', 'Check Cashing/Pay-day Loans', 'Payroll Services', 'Pediatric Dentists', 'Pediatricians', 'Pedicabs', 'Pekinese', 'Pensions', 'Perfume', 'Periodontists', 'Permanent Makeup', 'Persian/Iranian', 'Personal Injury Law', 'Personal Shopping', 'Personal Assistants', 'Personal Care Services', 'Personal Chefs', 'Peruvian', 'Pest Control', 'Pet Sitting', 'Pet Training', 'Pet Adoption', 'Pet Boarding', 'Pet Breeders', 'Pet Cremation Services', 'Pet Hospice', 'Pet Insurance', 'Pet Photography', 'Pets', 'Pet Services', 'Pet Stores', 'Petting Zoos', 'Pet Transportation', 'Pet Waste Removal', 'PF/Comercial', 'Pharmacy', 'Phlebologists', 'Photo Booth Rentals', 'Photography Classes', 'Photographers', 'Photography Stores & Services', 'Physical Therapy', 'Doctors', 'Piadina', 'Piano Bars', 'Piano Services', 'Piano Stores', 'Pick Your Own Farms', 'Piemonte', 'Piercing', 'Pierogis', 'Pilates', 'Pita', 'Pizza', 'Placenta Encapsulations', 'Planetarium', 'Plastic Surgeons', 'Playgrounds', 'Playsets', 'Plumbing', 'Plus Size Fashion', 'Podiatrists', 'Poke', 'Pole Dancing Classes', 'Police Departments', 'Polish', 'Polynesian', 'Pool & Billiards', 'Pool Cleaners', 'Pool Halls', 'Pool & Hot Tub Service', 'Popcorn Shops', 'Pop-Up Restaurants', 'Pop-up Shops', 'Portuguese', 'Post Offices', 'Postpartum Care', 'Potatoes', 'Poutineries', 'Powder Coating', 'Prenatal/Perinatal Care', 'Preschools', 'Pressure Washers', 'Pretzels', 'Preventive Medicine', 'Print Media', 'Private Investigation', 'Private Jet Charter', 'Private Schools', 'Private Tutors', 'Process Servers', 'Proctologists', 'Product Design', 'Professional Services', 'Propane', 'Property Management', 'Props', 'Prosthetics', 'Prosthodontists', 'Provencal', 'Psychiatrists', 'Supernatural Readings', 'Psychic Mediums', 'Psychics', 'Psychoanalysts', 'Psychologists', 'Psychotechnical Tests', 'Psychotherapists', 'Pub Food', 'Public Adjusters', 'Public Art', 'Public Markets', 'Public Plazas', 'Public Relations', 'Public Services & Government', 'Public Transportation', 'Pubs', 'Pueblan', 'Puerto Rican', 'Pulmonologist', 'Pulquerias', 'Pumpkin Patches', 'Qi Gong', 'Races & Competitions', 'Race Tracks', 'Racing Experience', 'Radiologists', 'Radio Stations', 'Rafting/Kayaking', 'Ramen', 'Ranches', 'Live/Raw Food', 'Real Estate', 'Real Estate Agents', 'Real Estate Law', 'Real Estate Services', 'Record Labels', 'Recording & Rehearsal Studios', 'Recreation Centers', 'Recycling Center', 'Refinishing Services', 'Reflexology', 'Registration Services', 'Registry Office', 'Rehabilitation Center', 'Reiki', 'Religious Items', 'Religious Organizations', 'Religious Schools', 'Furniture Rental', 'Reptile Shops', 'Residences', 'Resorts', 'Restaurants', 'Rest Stops', 'Retina Specialists', 'Retirement Homes', 'Reunion', 'Furniture Reupholstery', 'Rheumatologists', 'Rhinelandian', 'Ribatejo', 'Rice', 'Roadside Assistance', 'Robatayaki', 'Rock Climbing', 'Rodeo', 'Rodizios', 'Roman', 'Romanian', 'Roofing', 'Roof Inspectors', 'Rotisserie Chicken', 'Rugs', 'Russian', 'RV Dealers', 'RV Parks', 'RV Rental', 'RV Repair', 'Ryokan', 'Safe Stores', 'Safety Equipment', 'Sailing', 'Sake Bars', 'Salad', 'Salumerie', 'Salvadoran', 'Samba Schools', 'Sandblasting', 'Sandwiches', 'Sardinian', 'Sauna Installation & Repair', 'Saunas', 'Scandinavian', 'Scandinavian Design', 'Scavenger Hunts', 'Schnitzel', 'Scooter Rentals', 'Scooter Tours', 'Scottish', 'Screen Printing/T-Shirt Printing', 'Screen Printing', 'Scuba Diving', 'Seafood', 'Seafood Markets', 'Holiday Decorating Services', 'Security Services', 'Security Systems', 'Self-defense Classes', 'Self Storage', 'Senegalese', 'Senior Centers', 'Septic Services', 'Serbo Croatian', 'Service Stations', 'Gas Stations', 'Session Photography', 'Sewing & Alterations', 'Sex Therapists', 'Shanghainese', 'Shared Office Spaces', 'Shared Taxis', 'Shaved Ice', 'Shaved Snow', 'Shipping Centers', 'Shoe Repair', 'Shoe Stores', 'Shoe Shine', 'Shopping', 'Shopping Centers', 'Shopping Passages', 'Shredding Services', 'Shrines', 'Shutters', 'Sicilian', 'Signature Cuisine', 'Signmaking', 'Sikh Temples', 'Silent Disco', 'Singaporean', 'Skate Parks', 'Skate Shops', 'Skating Rinks', 'Skiing', 'Skilled Nursing', 'Skin Care', 'Ski Resorts', 'Ski Schools', 'Ski & Snowboard Shops', 'Skydiving', 'Sledding', 'Sleep Specialists', 'Sleepwear', 'Slovakian', 'Smog Check Stations', 'Smokehouse', 'Smoking Areas', 'Snorkeling', 'Snow Removal', 'Snuggle Services', 'Soba', 'Social Clubs', 'Social Security Law', 'Software Development', 'Solar Installation', 'Solar Panel Cleaning', 'Sommelier Services', 'Sophrologists', 'Soul Food', 'Soup', 'South African', 'Southern', 'Souvenir Shops', 'Spanish', 'Day Spas', 'Speakeasies', 'Special Bikes', 'Special Education', 'Specialty Schools', 'Speech Therapists', 'Speech Training', 'Sperm Clinic', 'Spine Surgeons', 'Spiritism', 'Spiritual Shop', 'Sport Equipment Hire', 'Sporting Goods', 'Sports Clubs', 'Sports Bars', 'Sports Medicine', 'Sports Psychologists', 'Professional Sports Teams', 'Sports Wear', 'Spray Tanning', 'Squash', 'Sri Lankan', 'Stadiums & Arenas', 'Cards & Stationery', 'Steakhouses', 'Car Stereo Installation', 'Stockings', 'Street Art', 'Street Vendors', 'Strip Clubs', 'Striptease Dancers', 'Structural Engineers', 'Stucco Services', 'Studio Taping', 'French Southwest', 'Sugaring', 'Sugar Shacks', 'Sukiyaki', 'Summer Camps', 'Sunglasses', 'Supper Clubs', 'Restaurant Supplies', 'Surfing', 'Surf Lifesaving', 'Surf Schools', 'Surf Shop', 'Surgeons', 'Sushi Bars', 'Swabian', 'Swedish', 'Swimming Lessons/Schools', 'Swimming Pools', 'Swimwear', 'Swiss Food', 'Synagogues', 'Syrian', 'Szechuan', 'Tabac', 'Tabernas', 'Tablao Flamenco', 'Tabletop Games', 'Tableware', 'Tacos', 'Taekwondo', 'Tai Chi', 'Taiwanese', 'Taiyaki', 'Takoyaki', 'Talent Agencies', 'Tamales', 'Tanning', 'Tanning Beds', 'Taoist Temples', 'Tapas Bars', 'Tapas/Small Plates', 'Tasting Classes', 'Tattoo', 'Tattoo Removal', 'Tavola Calda', 'Taxidermy', 'Taxis', 'Tax Law', 'Tax Office', 'Tax Services', 'Traditional Chinese Medicine', 'Tea Rooms', 'Teacher Supplies', 'Team Building Activities', 'Teeth Whitening', 'Telecommunications', 'Television Service Providers', 'Television Stations', 'Tempura', 'Tenant and Eviction Law', 'Tennis', 'Teochew', 'Teppanyaki', 'Test Preparation', 'Tex-Mex', 'Thai', 'Performing Arts', 'Themed Cafes', 'Threading Services', 'Thrift Stores', 'Tickets', 'Ticket Sales', 'Tiki Bars', 'Tiling', 'Tires', 'Title Loans', 'Tobacco Shops', 'Tofu Shops', 'Tonkatsu', 'Torshi', 'Tortillas', 'Tours', 'Towing', 'Town Car Service', 'Town Hall', 'Toxicologists', 'Toy Stores', 'American (Traditional)', 'Traditional Clothing', 'Trade Fairs', 'Traditional Swedish', 'Traffic Schools', 'Traffic Ticketing Law', 'Trailer Dealers', 'Trailer Rental', 'Trailer Repair', 'Trains', 'Train Stations', 'Trampoline Parks', 'Translation Services', 'Transmission Repair', 'Transportation', 'Tras-os-Montes', 'Trattorie', 'Travel Agents', 'Travel Services', 'Tree Services', 'Trinidadian', 'Trivia Hosts', 'Trophy Shops', 'Tropical Medicine', 'Truck Rental', 'Commercial Truck Dealers', 'Commercial Truck Repair', 'Tubing', 'Tui Na', 'Turkish', 'Turkish Ravioli', 'Tuscan', 'Tutoring Centers', 'TV Mounting', 'Udon', 'Ukrainian', 'Ultrasound Imaging Centers', 'Unagi', 'Undersea/Hyperbaric Medicine', 'Uniforms', 'University Housing', 'Unofficial Yelp Events', 'Urgent Care', 'Urologists', 'Used Bookstore', 'Used Car Dealers', 'Utilities', 'Uzbek', 'Vacation Rentals', 'Vacation Rental Agents', 'Valet Services', 'Vape Shops', 'Vascular Medicine', 'Vegan', 'Vegetarian', 'Vehicle Shipping', 'Vehicle Wraps', 'Venetian', 'Venezuelan', 'Venison', 'Venues & Event Spaces', 'Vermouth Bars', 'Veterinarians', 'Veterans Organizations', 'Videos & Video Game Rental', 'Video/Film Production', 'Video Game Stores', 'Videographers', 'Vietnamese', 'Used,  Vintage & Consignment', 'Vinyl Records', 'Siding', 'Virtual Reality Centers', 'Visitor Centers', 'Vitamins & Supplements', 'Vocal Coach', 'Vocational & Technical School', 'Volleyball', 'Waffles', 'Waldorf Schools', 'Walk-in Clinics', 'Walking Tours', 'Wallpapering', 'Watch Repair', 'Watches', 'Water Delivery', 'Water Heater Installation/Repair', 'Water Parks', 'Waterproofing', 'Water Purification Services', 'Water Stores', 'Water Suppliers', 'Water Taxis', 'Waxing', 'Web Design', 'Wedding Planning', 'Wedding Chapels', 'Weight Loss Centers', 'Well Drilling', 'Western Style Japanese Food', 'Whale Watching Tours', 'Wheel & Rim Repair', 'Whiskey Bars', 'Wholesale Stores', 'Wholesalers', 'Wigs', 'Wildlife Control', 'Wildlife Hunting Ranges', 'Wills,  Trusts,  & Probates', 'Windows Installation', 'Window Washing', 'Windshield Installation & Repair', 'Wine Bars', 'Wineries', 'Wine Tasting Classes', 'Wine Tasting Room', 'Wine Tours', 'Wok', 'Women\'s Clothing', 'Workers Compensation Law', 'Wraps', 'Christmas Markets', 'Yakiniku', 'Yakitori', 'Yelp Events', 'Yoga', 'Youth Club', 'Yucatan', 'Yugoslav', 'Zapiekanka', 'Ziplining', 'Zoos', 'Zorbing'];


function seeder() {
  let batch = 1;
  for (let i = 2500001; i < 5000001; i += 1) {
    const restaurant = {
      attributes: {
        restaurantsPriceRange2: Math.floor(Math.random() * 4) + 1,
        goodForMeal: {
          dessert: Math.random() >= 0.5,
          latenight: Math.random() >= 0.5,
          lunch: Math.random() >= 0.5,
          dinner: Math.random() >= 0.5,
          breakfast: Math.random() >= 0.5,
          brunch: Math.random() >= 0.5,
        },
        ambience: {
          romantic: Math.random() >= 0.5,
          intimate: Math.random() >= 0.5,
          classy: Math.random() >= 0.5,
          hipster: Math.random() >= 0.5,
          divey: Math.random() >= 0.5,
          touristy: Math.random() >= 0.5,
          trendy: Math.random() >= 0.5,
          upscale: Math.random() >= 0.5,
          casual: Math.random() >= 0.5,
        },
        restaurantsTableService: Math.random() >= 0.5,
        restaurantsGoodForGroups: Math.random() >= 0.5,
        restaurantsReservations: Math.random() >= 0.5,
        restaurantsAttire: attire[Math.floor(Math.random() * attire.length)],
        restaurantsDelivery: Math.random() >= 0.5,
        restaurantsTakeOut: Math.random() >= 0.5,
        caters: Math.random() >= 0.5,
        alcohol: alcohol[Math.floor(Math.random() * alcohol.length)],
        hasTV: Math.random() >= 0.5,
        wiFi: wifi[Math.floor(Math.random() * wifi.length)],
        noiseLevel: noiseLevel[Math.floor(Math.random() * noiseLevel.length)],
        goodForKids: Math.random() >= 0.5,
        dogsAllowed: Math.random() >= 0.5,
        outdoorSeating: Math.random() >= 0.5,
        businessAcceptsCreditCards: Math.random() >= 0.5,
        wheelchairAccessible: Math.random() >= 0.5,
        bikeParking: Math.random() >= 0.5,
        businessParking: {
          garage: Math.random() >= 0.5,
          street: Math.random() >= 0.5,
          validated: Math.random() >= 0.5,
          lot: Math.random() >= 0.5,
          valet: Math.random() >= 0.5,
        },
      },
      id: i,
      name: `${faker.lorem.word()} ${faker.lorem.word()}`,
      neighborhood: faker.lorem.word(),
      address: `${faker.address.streetAddress()} ${faker.address.streetName()}`,
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      postalCode: faker.address.zipCode(),
      latitude: Number(faker.random.number({ max: 48.909958, min: 32.538349, precision: 0.0001 }).toFixed(4)),
      longitude: -Number(faker.random.number({ max: 117.123604, min: 81.492613, precision: 0.0001 }).toFixed(4)),
      stars: Math.floor(Math.random() * 5) + 1,
      reviewCount: Math.floor(Math.random() * 1000) + 1,
      isOpen: Math.floor(Math.random() * 1) + 1,
      categories: [],
      hours: {
        monday: `${morningHours[Math.floor(Math.random() * morningHours.length)]}-${eveningHours[Math.floor(Math.random() * eveningHours.length)]}`,
        tuesday: `${morningHours[Math.floor(Math.random() * morningHours.length)]}-${eveningHours[Math.floor(Math.random() * eveningHours.length)]}`,
        wednesday: `${morningHours[Math.floor(Math.random() * morningHours.length)]}-${eveningHours[Math.floor(Math.random() * eveningHours.length)]}`,
        thursday: `${morningHours[Math.floor(Math.random() * morningHours.length)]}-${eveningHours[Math.floor(Math.random() * eveningHours.length)]}`,
        friday: `${morningHours[Math.floor(Math.random() * morningHours.length)]}-${eveningHours[Math.floor(Math.random() * eveningHours.length)]}`,
        saturday: `${morningHours[Math.floor(Math.random() * morningHours.length)]}-${eveningHours[Math.floor(Math.random() * eveningHours.length)]}`,
        sunday: `${morningHours[Math.floor(Math.random() * morningHours.length)]}-${eveningHours[Math.floor(Math.random() * eveningHours.length)]}`,
      },
    };
    for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j += 1) {
      restaurant.categories.push(categories[Math.floor(Math.random() * categories.length)]);
    }

    fs.appendFileSync('restaurants2.json', `${JSON.stringify(restaurant)}\n`);

    const menu = {
      id: i,
      name: `${faker.lorem.word()} ${faker.lorem.word()}`,
      description: faker.lorem.sentence(),
      category: faker.lorem.word(),
      price: Math.floor(Math.random() * 29) + 1 + 0.99,
      reviewIds: [Math.floor(Math.random() * 10000000) + 1],
      photoUrls: [faker.image.food()],
    };
    fs.appendFileSync('menus2.json', `${JSON.stringify(menu)}\n`);

    if (i > 2500001 && i % 250000 === 0) {
      console.log(` completed write 2 batch ${batch} of 10`);
      batch += 1;
    }
  }
  console.log('write 2 complete');
}

seeder();

const insertRestaurants = 'mongoimport --db welp --collection restaurants --file restaurants2.json --numInsertionWorkers 2';
exec(insertRestaurants, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('insert restaurants2 complete');
});

const insertMenus = 'mongoimport --db welp --collection menus --file menus2.json --numInsertionWorkers 2';
exec(insertMenus, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('insert menus2 complete');
});

fs.unlinkSync('restaurants2.json');
fs.unlinkSync('menus2.json');
