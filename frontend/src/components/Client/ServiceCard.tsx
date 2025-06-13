export interface ServiceCard {
  name: string;
  description: string;
  image: string;
  price: string;
}
export default function ServiceCard({ cardData }: { cardData: ServiceCard }) {
  return (
    <div>
      <img src={cardData.image} alt={cardData.name} />
      <div>{cardData.name}</div>
      <div>{cardData.description}</div>
      <div>{cardData.price}</div>
    </div>
  );
}
