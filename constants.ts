import { type School, type Challenge, type CanteenItem } from './types';

export const SCHOOLS: School[] = [
  { id: 1, name: { en: "Cranleigh Abu Dhabi", ar: "كرانلي أبوظبي" }, points: 12500, logo: "🏫" },
  { id: 2, name: { en: "The British School Al Khubairat", ar: "المدرسة البريطانية الخبيرات" }, points: 11800, logo: "🏛️" },
  { id: 3, name: { en: "Raha International School", ar: "مدرسة الراحة الدولية" }, points: 11250, logo: "🎓" },
  { id: 4, name: { en: "American Community School of Abu Dhabi", ar: "مدرسة المجتمع الأمريكي أبوظبي" }, points: 10900, logo: "🌐" },
  { id: 5, name: { en: "Al Yasmina Academy", ar: "أكاديمية الياسمينا" }, points: 9800, logo: "🌟" },
];

export const CHALLENGES: Challenge[] = [
  { 
    id: 1, 
    title: { en: "Healthy Swap Week", ar: "أسبوع التبديل الصحي" },
    description: { en: "Replace an unhealthy snack with a healthy one for a week.", ar: "استبدل وجبة خفيفة غير صحية بأخرى صحية لمدة أسبوع." },
    points: 100,
    icon: "🔄"
  },
  {
    id: 2,
    title: { en: "Canteen Smoothie Creator", ar: "مبدع العصائر الصحية" },
    description: { en: "Make a healthy smoothie from contents in the school's canteen.", ar: "حضر عصيرًا صحيًا من مكونات متوفرة في مقصف المدرسة." },
    points: 75,
    icon: "🥤"
  },
  {
    id: 3,
    title: { en: "Rainbow Plate", ar: "طبق قوس قزح" },
    description: { en: "Eat a meal containing at least 4 different colors of fruits/vegetables.", ar: "تناول وجبة تحتوي على 4 ألوان مختلفة على الأقل من الفواكه/الخضروات." },
    points: 50,
    icon: "🌈"
  }
];

export const CANTEEN_MENU: CanteenItem[] = [
    { id: 1, name: { en: "Apple Slices", ar: "شرائح تفاح" }, icon: "🍎", isHealthy: true, points: 10, isSmoothieIngredient: true },
    { id: 2, name: { en: "Grilled Chicken Salad", ar: "سلطة دجاج مشوي" }, icon: "🥗", isHealthy: true, points: 10 },
    { id: 3, name: { en: "Vegetable Sticks & Hummus", ar: "خضروات مع حمص" }, icon: "🥕", isHealthy: true, points: 10 },
    { id: 4, name: { en: "Yogurt", ar: "زبادي" }, icon: "🍦", isHealthy: true, points: 10, isSmoothieIngredient: true },
    { id: 5, name: { en: "Pizza Slice", ar: "شريحة بيتزا" }, icon: "🍕", isHealthy: false, points: 0 },
    { id: 6, name: { en: "Fries", ar: "بطاطس مقلية" }, icon: "🍟", isHealthy: false, points: 0 },
    { id: 7, name: { en: "Chocolate Bar", ar: "لوح شوكولاتة" }, icon: "🍫", isHealthy: false, points: 0 },
    { id: 8, name: { en: "Banana", ar: "موز" }, icon: "🍌", isHealthy: true, points: 10, isSmoothieIngredient: true },
    { id: 9, name: { en: "Berries", ar: "توت" }, icon: "🍓", isHealthy: true, points: 10, isSmoothieIngredient: true },
    { id: 10, name: { en: "Spinach", ar: "سبانخ" }, icon: "🥬", isHealthy: true, points: 10, isSmoothieIngredient: true },
    { id: 11, name: { en: "Milk", ar: "حليب" }, icon: "🥛", isHealthy: true, points: 10, isSmoothieIngredient: true },
    { id: 12, name: { en: "Oats", ar: "شوفان" }, icon: "🥣", isHealthy: true, points: 10, isSmoothieIngredient: true },
    { id: 13, name: { en: "Honey", ar: "عسل" }, icon: "🍯", isHealthy: true, points: 10, isSmoothieIngredient: true },
];