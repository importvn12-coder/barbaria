export const whatsappNumber = "5511999999999";

export const galleryImages = [
  "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=800&q=80",
  "https://images.pexels.com/photos/7697399/pexels-photo-7697399.jpeg?auto=compress&cs=tinysrgb&w=800"
];

export const testimonials = [
  { name: "Lucas Andrade", text: "Atendimento pontual, ambiente impecável e o melhor degradê que já fiz.", rating: 5 },
  { name: "Marcos Silva", text: "A experiência de barba com toalha quente é outro nível. Recomendo muito.", rating: 5 },
  { name: "Henrique Costa", text: "Agendei pelo site em menos de um minuto e fui atendido no horário.", rating: 5 }
];

export const fallbackServices = [
  {
    _id: "s1",
    name: "Corte social",
    description: "Acabamento clássico, tesoura e máquina com finalização premium.",
    price: 55,
    duration: 40,
    featured: true,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80"
  },
  {
    _id: "s2",
    name: "Degradê",
    description: "Fade moderno com transições limpas e alinhamento preciso.",
    price: 65,
    duration: 50,
    featured: true,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80"
  },
  {
    _id: "s3",
    name: "Barba",
    description: "Toalha quente, desenho, navalha e hidratação da pele.",
    price: 45,
    duration: 35,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80"
  },
  {
    _id: "s4",
    name: "Sobrancelha",
    description: "Design discreto para realçar o olhar sem perder naturalidade.",
    price: 25,
    duration: 20,
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80"
  },
  {
    _id: "s5",
    name: "Pigmentação",
    description: "Correção de falhas na barba ou cabelo com resultado natural.",
    price: 80,
    duration: 55,
    image: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80"
  },
  {
    _id: "s6",
    name: "Combo corte + barba",
    description: "Experiência completa Royal com corte, barba e finalização.",
    price: 95,
    duration: 80,
    featured: true,
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80"
  }
];

export const fallbackBarbers = [
  {
    _id: "b1",
    name: "Rafael King",
    specialty: "Degradê e freestyle",
    photo: "https://images.pexels.com/photos/3998414/pexels-photo-3998414.jpeg?auto=compress&cs=tinysrgb&w=900",
    availableTimes: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "18:00"]
  },
  {
    _id: "b2",
    name: "Bruno Royal",
    specialty: "Barba clássica",
    photo: "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=900",
    availableTimes: ["08:30", "09:30", "10:30", "13:30", "14:30", "17:00", "19:00"]
  },
  {
    _id: "b3",
    name: "Diego Prime",
    specialty: "Corte social e visagismo",
    photo: "https://images.pexels.com/photos/7697376/pexels-photo-7697376.jpeg?auto=compress&cs=tinysrgb&w=900",
    availableTimes: ["09:00", "11:30", "13:00", "15:30", "16:30", "18:30"]
  }
];
