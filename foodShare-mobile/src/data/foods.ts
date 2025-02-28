import { CardItem } from "@/@types/cardItem";

export const foodsData: CardItem[] = [
  {
    id: 1,
    name: "Cesta Básica",
    description: "Uma cesta básica completa para uma família.",
    expiration_time: new Date("2025-03-01"),
    quantity: 10,
    donor_id: 101,
    image: "https://m.media-amazon.com/images/I/71rBEHnIkXL.jpg",
  },
  {
    id: 2,
    name: "Pacote de Arroz",
    description: "Pacote de arroz de 5kg.",
    expiration_time: new Date("2025-04-15"),
    quantity: 20,
    donor_id: 102,
    image: "https://m.media-amazon.com/images/I/71rBEHnIkXL.jpg",
  },
  {
    id: 3,
    name: "Caixa de Leite",
    description: "Caixa de leite integral com 12 unidades.",
    expiration_time: new Date("2025-02-28"),
    quantity: 15,
    donor_id: 103,
    image: "https://m.media-amazon.com/images/I/71rBEHnIkXL.jpg",
  },
  {
    id: 4,
    name: "Pacote de Feijão",
    description: "Pacote de feijão preto de 1kg.",
    expiration_time: new Date("2025-05-10"),
    quantity: 25,
    donor_id: 104,
    image: "https://m.media-amazon.com/images/I/71rBEHnIkXL.jpg",
  },
  {
    id: 5,
    name: "Óleo de Cozinha",
    description: "Garrafa de óleo de cozinha de 900ml.",
    expiration_time: new Date("2025-06-20"),
    quantity: 30,
    donor_id: 105,
    image: "https://m.media-amazon.com/images/I/71rBEHnIkXL.jpg",
  },
];
