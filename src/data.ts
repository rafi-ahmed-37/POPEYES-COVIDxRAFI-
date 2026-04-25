export const LOCATIONS = [
  { id: 1, name: "Popeyes - Times Square", address: "1500 Broadway, New York, NY 10036", phone: "(212) 221-3800", lat: 40.7580, lng: -73.9855, hours: "Mon–Sun: 7:00 AM – 12:00 AM", startHour: 7, endHour: 24, dineIn: true, driveThru: false, delivery: true },
  { id: 2, name: "Popeyes - Downtown Brooklyn", address: "490 Fulton St, Brooklyn, NY 11201", phone: "(718) 624-9100", lat: 40.6915, lng: -73.9851, hours: "Mon–Sun: 8:00 AM – 11:00 PM", startHour: 8, endHour: 23, dineIn: true, driveThru: false, delivery: true },
  { id: 3, name: "Popeyes - Chicago Loop", address: "175 W Jackson Blvd, Chicago, IL 60604", phone: "(312) 427-2222", lat: 41.8779, lng: -87.6337, hours: "Mon–Fri: 7:00 AM – 10:00 PM", startHour: 7, endHour: 22, dineIn: true, driveThru: false, delivery: true },
  { id: 4, name: "Popeyes - Atlanta Midtown", address: "860 Peachtree St NE, Atlanta, GA 30308", phone: "(404) 888-1900", lat: 33.7793, lng: -84.3831, hours: "Mon–Sun: 10:00 AM – 11:00 PM", startHour: 10, endHour: 23, dineIn: true, driveThru: true, delivery: true },
  { id: 5, name: "Popeyes - Houston Galleria", address: "5015 Westheimer Rd, Houston, TX 77056", phone: "(713) 621-6100", lat: 29.7391, lng: -95.4677, hours: "Mon–Sun: 10:00 AM – 12:00 AM", startHour: 10, endHour: 24, dineIn: true, driveThru: true, delivery: true },
  { id: 6, name: "Popeyes - Los Angeles Hollywood", address: "6801 Hollywood Blvd, Los Angeles, CA 90028", phone: "(323) 463-7000", lat: 34.1022, lng: -118.3401, hours: "Mon–Sun: 9:00 AM – 1:00 AM", startHour: 9, endHour: 25, dineIn: true, driveThru: false, delivery: true },
  { id: 7, name: "Popeyes - Miami South Beach", address: "1234 Washington Ave, Miami Beach, FL 33139", phone: "(305) 672-5100", lat: 25.7825, lng: -80.1320, hours: "Mon–Sun: 10:00 AM – 2:00 AM", startHour: 10, endHour: 26, dineIn: true, driveThru: false, delivery: true },
  { id: 8, name: "Popeyes - Dallas Uptown", address: "3100 McKinney Ave, Dallas, TX 75204", phone: "(214) 521-3800", lat: 32.8021, lng: -96.8014, hours: "Mon–Sun: 10:00 AM – 11:00 PM", startHour: 10, endHour: 23, dineIn: true, driveThru: true, delivery: true },
  { id: 9, name: "Popeyes - New Orleans French Quarter", address: "251 N Peters St, New Orleans, LA 70130", phone: "(504) 522-1931", lat: 29.9584, lng: -90.0644, hours: "Mon–Sun: 9:00 AM – 12:00 AM", startHour: 9, endHour: 24, dineIn: true, driveThru: false, delivery: true },
  { id: 10, name: "Popeyes - Washington DC Penn Quarter", address: "700 7th St NW, Washington, DC 20001", phone: "(202) 393-1900", lat: 38.8951, lng: -77.0219, hours: "Mon–Sun: 10:00 AM – 11:00 PM", startHour: 10, endHour: 23, dineIn: true, driveThru: false, delivery: true }
];

export const MENU_ITEMS = [
  { id: "c1", name: "Classic Leg & Thigh", price: 4.99, category: "Chicken", description: "Battered in our famous Louisiana seasoning.", image: "🍗" },
  { id: "c2", name: "Spicy Chicken Breast", price: 5.49, category: "Chicken", description: "Kick it up with our bold spicy marinade.", image: "🍗" },
  { id: "c3", name: "Blackened Chicken", price: 5.99, category: "Chicken", description: "Fried without the breading for a distinct flavor.", image: "✨" },
  { id: "c4", name: "Tenders (3pc)", price: 6.99, category: "Chicken", description: "Mild or spicy, served with your choice of sauce.", image: "🥢" },
  { id: "s1", name: "Classic Chicken Sandwich", price: 4.99, category: "Sandwiches", description: "The one that started it all. Dressed with pickles.", image: "🥪" },
  { id: "s2", name: "Spicy Chicken Sandwich", price: 5.49, category: "Sandwiches", description: "Spicy mayo and pickles on a toasted brioche bun.", image: "🌶️" },
  { id: "s3", name: "Deluxe Sandwich", price: 6.49, category: "Sandwiches", description: "Lettuce, tomato, and pickles for the extra crunch.", image: "🥬" },
  { id: "s4", name: "Ghost Pepper Sandwich", price: 6.99, category: "Sandwiches", description: "Extreme heat for the true spice lovers.", image: "🔥" },
  { id: "sd1", name: "Cajun Fries", price: 2.99, category: "Sides", description: "Crispy fries dusted with our unique Cajun blend.", image: "🍟" },
  { id: "sd2", name: "Red Beans & Rice", price: 2.49, category: "Sides", description: "Hearty and authentic Louisiana classic.", image: "🫘" },
  { id: "sd3", name: "Coleslaw", price: 1.99, category: "Sides", description: "Fresh, cool, and crisp side to balance the spice.", image: "🥗" },
  { id: "sd4", name: "Mashed Potatoes & Gravy", price: 2.49, category: "Sides", description: "Smooth potatoes with our signature cajun gravy.", image: "🥔" },
  { id: "d1", name: "Lemonade", price: 2.49, category: "Drinks", description: "Cold and refreshing classic lemonade.", image: "🍋" },
  { id: "d2", name: "Sweet Tea", price: 1.99, category: "Drinks", description: "Traditional southern style brewed sweet tea.", image: "🥤" },
  { id: "d3", name: "Frozen Lemonade", price: 3.49, category: "Drinks", description: "The ultimate brain freeze with bold lemon flavor.", image: "❄️" },
  { id: "de1", name: "Cinnamon Apple Pie", price: 1.99, category: "Desserts", description: "Warm, flaky crust with cinnamon apple filling.", image: "🥧" },
];

export const DEALS = [
  { id: "d1", name: "2-Can Dine for $12.99", description: "2 sandwiches + 2 sides + 2 drinks", price: 12.99, expiresHours: 48 },
  { id: "d2", name: "Free Spicy Sandwich", description: "Free with any $15 order", price: 0, expiresHours: 24 },
  { id: "d3", name: "Family Feast $29.99", description: "8pc chicken + 4 large sides + 4 biscuits", price: 29.99, expiresHours: 72 },
];

export const REVIEWS = [
  { name: "Marcus T.", city: "Atlanta, GA", text: "Best chicken sandwich I've ever had. The spicy one changed my life.", rating: 5 },
  { name: "Diane R.", city: "New Orleans, LA", text: "Popeyes in New Orleans felt like home cooking. Incredible.", rating: 5 },
  { name: "Jordan K.", city: "Houston, TX", text: "The tenders and Cajun fries combo is undefeated. Period.", rating: 5 },
  { name: "Samantha B.", city: "Chicago, IL", text: "I drove 20 minutes just for Popeyes. Worth every mile.", rating: 5 },
  { name: "Carlos M.", city: "Miami, FL", text: "Ghost pepper sandwich is not for the weak. I loved every bite.", rating: 5 },
];
